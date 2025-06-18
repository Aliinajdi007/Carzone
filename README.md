# CarZone - Premium Car Dealership Website

A modern, responsive car dealership website built with React, TypeScript, and Supabase. This platform allows users to browse, search, and inquire about vehicles while providing administrators with tools to manage inventory and customer interactions.

## 🌟 Features

- **Modern UI/UX**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Design**: Fully responsive layout for all devices
- **Car Inventory Management**: Admin panel for managing vehicle listings
- **Advanced Search**: Filter cars by make, model, price, and more
- **Contact System**: Integrated contact form with email notifications
- **Real-time Updates**: Live inventory updates using Supabase
- **Authentication**: Secure user authentication system
- **Admin Dashboard**: Comprehensive admin interface for inventory management

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **React Router**: Client-side routing
- **React Query**: Data fetching and caching
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### Backend
- **Supabase**: Backend as a Service (BaaS)
  - Authentication
  - Real-time database
  - Storage
  - Edge Functions

### Development Tools
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing
- **SWC**: Fast TypeScript/JavaScript compiler

## 📁 Project Structure

```
carzone-web-project/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React context providers
│   ├── data/          # Static data and types
│   ├── hooks/         # Custom React hooks
│   ├── integrations/  # Third-party service integrations
│   ├── lib/           # Utility functions and configurations
│   ├── pages/         # Page components
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
├── supabase/          # Supabase configuration and migrations
└── [config files]     # Various configuration files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or pnpm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd carzone-web-project
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```



## 🏗️ Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The build output will be in the `dist` directory.

## 📝 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run build:dev`: Build for development
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Contact

**Ali Najdi**
- Location: Srifa, South Lebanon
- Phone: +961 71 862 750
- Email: alijihadnajdi14@gmail.com

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Supabase](https://supabase.com/) for the backend services
- [Vite](https://vitejs.dev/) for the build tooling
