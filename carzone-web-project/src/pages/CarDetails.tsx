import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  condition: string;
  description: string;
  images: string[];
  specs: {
    engine?: string;
    horsepower?: string;
    mpg?: string;
    drivetrain?: string;
    seating?: string;
    safety?: string;
  };
  features: string[];
}

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchCar();
    }
  }, [id]);

  const fetchCar = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching car:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load car details",
        });
        return;
      }

      if (!data) {
        toast({
          variant: "destructive",
          title: "Car not found",
          description: "The car you're looking for doesn't exist",
        });
        return;
      }

      // Transform the data to match our Car interface
      const transformedCar: Car = {
        id: data.id,
        make: data.make,
        model: data.model,
        year: data.year,
        price: data.price,
        mileage: data.mileage,
        fuel_type: data.fuel_type,
        transmission: data.transmission,
        condition: data.condition,
        description: data.description || '',
        images: data.images || [],
        specs: typeof data.specs === 'object' && data.specs !== null && !Array.isArray(data.specs) 
          ? data.specs as Car['specs']
          : {},
        features: data.features || []
      };

      setCar(transformedCar);
    } catch (error) {
      console.error('Error in fetchCar:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-automotive-gray-warm">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="text-xl">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-automotive-gray-warm">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-automotive-black mb-4">Car Not Found</h1>
          <p className="text-gray-600">The car you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const specs = car.specs;

  return (
    <div className="min-h-screen bg-automotive-gray-warm">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            {car.images && car.images.length > 0 ? (
              <div className="space-y-4">
                <img 
                  src={car.images[0]} 
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-96 object-cover rounded-lg"
                />
                {car.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {car.images.slice(1, 5).map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`${car.make} ${car.model} ${index + 2}`}
                        className="w-full h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-automotive-black">
                {car.year} {car.make} {car.model}
              </h1>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant={car.condition === 'New' ? 'default' : 'secondary'}>
                  {car.condition}
                </Badge>
                <span className="text-2xl font-bold text-automotive-blue">
                  ${car.price.toLocaleString()}
                </span>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Mileage</p>
                  <p className="text-gray-600">{car.mileage.toLocaleString()} miles</p>
                </div>
                <div>
                  <p className="font-medium">Fuel Type</p>
                  <p className="text-gray-600">{car.fuel_type}</p>
                </div>
                <div>
                  <p className="font-medium">Transmission</p>
                  <p className="text-gray-600">{car.transmission}</p>
                </div>
                <div>
                  <p className="font-medium">Year</p>
                  <p className="text-gray-600">{car.year}</p>
                </div>
              </CardContent>
            </Card>

            {specs && Object.keys(specs).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3">
                  {specs.engine && (
                    <div>
                      <p className="font-medium">Engine</p>
                      <p className="text-gray-600">{specs.engine}</p>
                    </div>
                  )}
                  {specs.horsepower && (
                    <div>
                      <p className="font-medium">Horsepower</p>
                      <p className="text-gray-600">{specs.horsepower}</p>
                    </div>
                  )}
                  {specs.mpg && (
                    <div>
                      <p className="font-medium">MPG</p>
                      <p className="text-gray-600">{specs.mpg}</p>
                    </div>
                  )}
                  {specs.drivetrain && (
                    <div>
                      <p className="font-medium">Drivetrain</p>
                      <p className="text-gray-600">{specs.drivetrain}</p>
                    </div>
                  )}
                  {specs.seating && (
                    <div>
                      <p className="font-medium">Seating</p>
                      <p className="text-gray-600">{specs.seating}</p>
                    </div>
                  )}
                  {specs.safety && (
                    <div>
                      <p className="font-medium">Safety Rating</p>
                      <p className="text-gray-600">{specs.safety}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {car.features && car.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {car.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{car.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarDetails;
