
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

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

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [makeFilter, setMakeFilter] = useState("all");
  const [fuelFilter, setFuelFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const { toast } = useToast();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching cars:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load cars",
        });
        return;
      }

      // Transform the data to match the expected format
      const transformedCars = (data || []).map(car => ({
        id: car.id,
        make: car.make,
        model: car.model,
        year: car.year,
        price: car.price,
        image: car.images?.[0] || '/placeholder.svg',
        images: car.images || ['/placeholder.svg'],
        mileage: car.mileage,
        fuel_type: car.fuel_type,
        transmission: car.transmission,
        condition: car.condition,
      }));

      setCars(transformedCars);
    } catch (error) {
      console.error('Error in fetchCars:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique values for filters
  const uniqueMakes = Array.from(new Set(cars.map(car => car.make))).sort();
  const uniqueFuelTypes = Array.from(new Set(cars.map(car => car.fuel_type))).sort();

  // Filter cars based on all criteria
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMake = makeFilter === "all" || car.make === makeFilter;
      const matchesFuel = fuelFilter === "all" || car.fuel_type === fuelFilter;
      const matchesCondition = conditionFilter === "all" || car.condition === conditionFilter;
      
      const matchesPrice = (!priceRange.min || car.price >= parseInt(priceRange.min)) &&
                          (!priceRange.max || car.price <= parseInt(priceRange.max));

      return matchesSearch && matchesMake && matchesFuel && matchesCondition && matchesPrice;
    });
  }, [cars, searchTerm, makeFilter, fuelFilter, conditionFilter, priceRange]);

  const clearFilters = () => {
    setSearchTerm("");
    setMakeFilter("all");
    setFuelFilter("all");
    setConditionFilter("all");
    setPriceRange({ min: "", max: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-automotive-gray-warm">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="text-xl">Loading cars...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-automotive-gray-warm">
      <Navbar />
      
      {/* Header */}
      <section className="bg-automotive-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Our Cars</h1>
          <p className="text-xl">Find your perfect vehicle from our extensive collection</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Search & Filters
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-automotive-blue border-automotive-blue hover:bg-automotive-blue hover:text-white"
                  >
                    Clear All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by make or model..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Make Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Make</label>
                  <Select value={makeFilter} onValueChange={setMakeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Makes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Makes</SelectItem>
                      {uniqueMakes.map(make => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Fuel Type Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Fuel Type</label>
                  <Select value={fuelFilter} onValueChange={setFuelFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Fuel Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Fuel Types</SelectItem>
                      {uniqueFuelTypes.map(fuel => (
                        <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Condition Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Condition</label>
                  <Select value={conditionFilter} onValueChange={setConditionFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Conditions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Conditions</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Used">Used</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Min Price"
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    />
                    <Input
                      placeholder="Max Price"
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cars Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-automotive-black">
                {filteredCars.length} Cars Found
              </h2>
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <CardContent>
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-xl font-bold mb-2">No Cars Found</h3>
                  <p className="text-gray-600 mb-4">
                    {cars.length === 0 
                      ? "No cars available yet. Check back soon!"
                      : "Try adjusting your search criteria or browse all vehicles"
                    }
                  </p>
                  {cars.length > 0 && (
                    <Button onClick={clearFilters} className="bg-automotive-blue hover:bg-automotive-blue-light">
                      View All Cars
                    </Button>
                  )}
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

export default Cars;
