
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Shield, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';

// Sample featured cars with fuel_type added
const featuredCars = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    price: 28000,
    mileage: 12000,
    fuel_type: 'Gasoline',
    transmission: 'Automatic',
    condition: 'Used' as const,
    description: 'Reliable and efficient sedan',
    images: ['/placeholder.svg'],
    specs: {},
    features: ['Backup Camera', 'Bluetooth', 'Lane Assist']
  },
  {
    id: '2',
    make: 'BMW',
    model: '3 Series',
    year: 2024,
    price: 45000,
    mileage: 5000,
    fuel_type: 'Gasoline',
    transmission: 'Automatic',
    condition: 'Used' as const,
    description: 'Luxury sedan with performance',
    images: ['/placeholder.svg'],
    specs: {},
    features: ['Leather Seats', 'Navigation', 'Sunroof']
  },
  {
    id: '3',
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    price: 52000,
    mileage: 8000,
    fuel_type: 'Electric',
    transmission: 'Automatic',
    condition: 'Used' as const,
    description: 'Electric luxury sedan',
    images: ['/placeholder.svg'],
    specs: {},
    features: ['Autopilot', 'Premium Audio', 'Glass Roof']
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-automotive-gray-warm">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-automotive-blue to-automotive-blue-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Car
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover quality vehicles with confidence. Our curated selection ensures you get the best value for your investment.
            </p>
            <div className="space-x-4">
              <Link to="/cars">
                <Button size="lg" className="bg-white text-automotive-blue hover:bg-gray-100">
                  Browse Cars
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-automotive-blue">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-automotive-black mb-4">
              Featured Vehicles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Check out our handpicked selection of premium vehicles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/cars">
              <Button size="lg" className="bg-automotive-blue hover:bg-automotive-blue-light">
                View All Cars
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-automotive-black mb-4">
              Why Choose AutoDealer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best car buying experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-automotive-blue mx-auto mb-4" />
                <CardTitle>Quality Assured</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Every vehicle undergoes thorough inspection</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-automotive-blue mx-auto mb-4" />
                <CardTitle>Warranty Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Comprehensive warranty on all vehicles</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-automotive-blue mx-auto mb-4" />
                <CardTitle>Expert Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Professional team to guide your purchase</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-automotive-blue mx-auto mb-4" />
                <CardTitle>Best Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Competitive pricing and financing options</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
