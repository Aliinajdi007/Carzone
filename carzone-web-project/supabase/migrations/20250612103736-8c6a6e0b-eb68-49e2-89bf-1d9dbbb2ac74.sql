
-- Create profiles table for user management
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  role text default 'user' check (role in ('admin', 'user')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  primary key (id)
);

-- Create cars table for the dealership inventory
create table public.cars (
  id uuid default gen_random_uuid() primary key,
  make text not null,
  model text not null,
  year integer not null,
  price integer not null,
  mileage integer not null,
  fuel_type text not null,
  transmission text not null,
  condition text not null check (condition in ('New', 'Used')),
  description text,
  images text[] default '{}',
  specs jsonb default '{}',
  features text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references auth.users(id) on delete cascade
);

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'user'
  );
  return new;
end;
$$;

-- Trigger to create profile when user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Enable RLS on tables
alter table public.profiles enable row level security;
alter table public.cars enable row level security;

-- RLS policies for profiles
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- RLS policies for cars
create policy "Anyone can view cars" on public.cars
  for select using (true);

create policy "Only admins can insert cars" on public.cars
  for insert with check (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Only admins can update cars" on public.cars
  for update using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Only admins can delete cars" on public.cars
  for delete using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );
