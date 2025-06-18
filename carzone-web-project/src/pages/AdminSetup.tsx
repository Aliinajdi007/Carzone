
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Navigate } from 'react-router-dom';

const AdminSetup = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const makeUserAdmin = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating role:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update role",
        });
        return;
      }

      toast({
        title: "Success",
        description: "You are now an admin! Redirecting to dashboard...",
      });

      // Refresh the page to update auth context
      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 2000);
    } catch (error) {
      console.error('Error in makeUserAdmin:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
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

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (profile?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-automotive-gray-warm">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-automotive-black">
              Admin Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <p className="text-gray-600 mb-4">
                Welcome to CarZone! You're currently signed in as: <strong>{profile?.email}</strong>
              </p>
              <p className="text-gray-600 mb-6">
                To manage the car inventory, you need admin privileges. Click the button below to become an admin.
              </p>
            </div>

            <Button 
              onClick={makeUserAdmin}
              className="bg-automotive-blue hover:bg-automotive-blue-light"
              disabled={loading}
              size="lg"
            >
              {loading ? 'Setting up admin access...' : 'Become Admin'}
            </Button>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-automotive-black mb-2">Admin Capabilities:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Add new cars to inventory</li>
                <li>• Edit car details and prices</li>
                <li>• Mark cars as sold</li>
                <li>• Delete cars from inventory</li>
                <li>• Manage dealership listings</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default AdminSetup;
