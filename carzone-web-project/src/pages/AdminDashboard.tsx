
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link, Navigate } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  condition: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && isAdmin) {
      fetchCars();
    }
  }, [authLoading, isAdmin]);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('id, make, model, year, price, condition, created_at')
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

      setCars(data || []);
    } catch (error) {
      console.error('Error in fetchCars:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (carId: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return;

    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', carId);

      if (error) {
        console.error('Error deleting car:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete car",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Car deleted successfully",
      });
      
      fetchCars();
    } catch (error) {
      console.error('Error in deleteCar:', error);
    }
  };

  if (authLoading || loading) {
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

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-automotive-gray-warm">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-automotive-black">Admin Dashboard</h1>
          <Link to="/admin/add-car">
            <Button className="bg-automotive-blue hover:bg-automotive-blue-light">
              <Plus className="h-4 w-4 mr-2" />
              Add New Car
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Car Inventory ({cars.length} cars)</CardTitle>
          </CardHeader>
          <CardContent>
            {cars.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No cars in inventory yet.</p>
                <Link to="/admin/add-car">
                  <Button className="bg-automotive-blue hover:bg-automotive-blue-light">
                    Add Your First Car
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Car</th>
                      <th className="text-left py-3">Year</th>
                      <th className="text-left py-3">Price</th>
                      <th className="text-left py-3">Condition</th>
                      <th className="text-left py-3">Added</th>
                      <th className="text-left py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map((car) => (
                      <tr key={car.id} className="border-b">
                        <td className="py-3 font-medium">
                          {car.make} {car.model}
                        </td>
                        <td className="py-3">{car.year}</td>
                        <td className="py-3">${car.price.toLocaleString()}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-sm ${
                            car.condition === 'New' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {car.condition}
                          </span>
                        </td>
                        <td className="py-3">
                          {new Date(car.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <Link to={`/admin/edit-car/${car.id}`}>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => deleteCar(car.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
