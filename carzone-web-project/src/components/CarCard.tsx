
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image?: string;
  images?: string[];
  mileage: number;
  fuel_type: string;
  transmission: string;
  condition: string;
}

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  // Use the first image from images array, or fallback to image prop, or placeholder
  const carImage = car.images?.[0] || car.image || '/placeholder.svg';

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-200">
      <div className="relative overflow-hidden">
        <img
          src={carImage}
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <Badge 
          className={`absolute top-4 left-4 ${
            car.condition === 'New' 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-automotive-blue hover:bg-automotive-blue-light'
          }`}
        >
          {car.condition}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-2">
          <h3 className="text-xl font-bold text-automotive-black mb-1">
            {car.year} {car.make} {car.model}
          </h3>
          <p className="text-2xl font-bold text-automotive-orange">
            ${car.price.toLocaleString()}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Mileage:</span>
            <br />
            {car.mileage.toLocaleString()} mi
          </div>
          <div>
            <span className="font-medium">Fuel:</span>
            <br />
            {car.fuel_type}
          </div>
          <div>
            <span className="font-medium">Transmission:</span>
            <br />
            {car.transmission}
          </div>
          <div>
            <span className="font-medium">Condition:</span>
            <br />
            {car.condition}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <div className="flex space-x-2 w-full">
          <Link to={`/cars/${car.id}`} className="flex-1">
            <Button variant="outline" className="w-full border-automotive-blue text-automotive-blue hover:bg-automotive-blue hover:text-white">
              View Details
            </Button>
          </Link>
          <Button className="flex-1 bg-automotive-orange hover:bg-automotive-orange-light">
            Contact Dealer
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
