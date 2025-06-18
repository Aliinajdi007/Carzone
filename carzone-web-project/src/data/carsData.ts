
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  images: string[];
  mileage: number;
  fuelType: string;
  transmission: string;
  condition: string;
  description: string;
  features: string[];
  specs: {
    engine: string;
    horsepower: string;
    mpg: string;
    drivetrain: string;
    seating: string;
    safety: string;
  };
}

export const carsData: Car[] = [
  {
    id: "1",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 48990,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    mileage: 5000,
    fuelType: "Electric",
    transmission: "Automatic",
    condition: "New",
    description: "Experience the future of driving with this stunning Tesla Model 3. Featuring cutting-edge technology, exceptional performance, and zero emissions.",
    features: [
      "Autopilot Enabled",
      "Premium Sound System",
      "Glass Roof",
      "Wireless Phone Charging",
      "Over-the-Air Updates",
      "Supercharger Access"
    ],
    specs: {
      engine: "Dual Motor All-Wheel Drive",
      horsepower: "358 HP",
      mpg: "120 MPGe",
      drivetrain: "AWD",
      seating: "5 Passengers",
      safety: "5-Star Overall"
    }
  },
  {
    id: "2",
    make: "BMW",
    model: "X5",
    year: 2022,
    price: 62900,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    mileage: 15000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    condition: "Used",
    description: "Luxury meets performance in this BMW X5. Perfect for families who demand both comfort and capability.",
    features: [
      "Panoramic Sunroof",
      "Leather Seats",
      "Navigation System",
      "Heated Seats",
      "Parking Assist",
      "Premium Audio"
    ],
    specs: {
      engine: "3.0L Twin-Turbo I6",
      horsepower: "335 HP",
      mpg: "23 City / 29 Hwy",
      drivetrain: "AWD",
      seating: "7 Passengers",
      safety: "5-Star Overall"
    }
  },
  {
    id: "3",
    make: "Audi",
    model: "A4",
    year: 2023,
    price: 39900,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
    ],
    mileage: 8000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    condition: "Used",
    description: "Refined luxury and cutting-edge technology come together in this Audi A4. Experience German engineering at its finest.",
    features: [
      "Virtual Cockpit",
      "MMI Touch",
      "LED Headlights",
      "Quattro AWD",
      "Bang & Olufsen Audio",
      "Smartphone Integration"
    ],
    specs: {
      engine: "2.0L TFSI Turbo",
      horsepower: "261 HP",
      mpg: "27 City / 34 Hwy",
      drivetrain: "AWD",
      seating: "5 Passengers",
      safety: "Top Safety Pick+"
    }
  },
  {
    id: "4",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2023,
    price: 43550,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2083&q=80"
    ],
    mileage: 12000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    condition: "Used",
    description: "Sophistication and performance define this Mercedes-Benz C-Class. Every detail crafted for the ultimate driving experience.",
    features: [
      "MBUX Infotainment",
      "Voice Control",
      "Ambient Lighting",
      "Active Brake Assist",
      "Wireless Charging",
      "Burmester Audio"
    ],
    specs: {
      engine: "2.0L Turbo I4",
      horsepower: "255 HP",
      mpg: "25 City / 35 Hwy",
      drivetrain: "RWD",
      seating: "5 Passengers",
      safety: "5-Star Overall"
    }
  },
  {
    id: "5",
    make: "Toyota",
    model: "Camry",
    year: 2023,
    price: 28855,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    mileage: 5500,
    fuelType: "Hybrid",
    transmission: "CVT",
    condition: "New",
    description: "The reliable and efficient Toyota Camry Hybrid offers the perfect balance of performance, comfort, and fuel economy.",
    features: [
      "Toyota Safety Sense 2.0",
      "Hybrid Powertrain",
      "Apple CarPlay",
      "Adaptive Cruise Control",
      "Lane Keeping Assist",
      "JBL Premium Audio"
    ],
    specs: {
      engine: "2.5L Hybrid I4",
      horsepower: "208 HP",
      mpg: "51 City / 53 Hwy",
      drivetrain: "FWD",
      seating: "5 Passengers",
      safety: "5-Star Overall"
    }
  },
  {
    id: "6",
    make: "Honda",
    model: "Accord",
    year: 2022,
    price: 26820,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    mileage: 22000,
    fuelType: "Gasoline",
    transmission: "CVT",
    condition: "Used",
    description: "Discover the perfect blend of performance and practicality with this Honda Accord. Known for reliability and comfort.",
    features: [
      "Honda Sensing Suite",
      "Remote Start",
      "Heated Seats",
      "Dual-Zone Climate",
      "LED Headlights",
      "8-inch Display"
    ],
    specs: {
      engine: "1.5L Turbo I4",
      horsepower: "192 HP",
      mpg: "32 City / 42 Hwy",
      drivetrain: "FWD",
      seating: "5 Passengers",
      safety: "5-Star Overall"
    }
  }
];
