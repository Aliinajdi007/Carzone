
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BasicInfoSection from '@/components/CarForm/BasicInfoSection';
import ImageUploadSection from '@/components/CarForm/ImageUploadSection';
import SpecificationsSection from '@/components/CarForm/SpecificationsSection';
import FeaturesSection from '@/components/CarForm/FeaturesSection';

const AddCar = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    condition: '',
    description: '',
    images: [''],
    specs: {
      engine: '',
      horsepower: '',
      mpg: '',
      drivetrain: '',
      seating: '',
      safety: '',
    },
    features: [''],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecChange = (spec: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specs: { ...prev.specs, [spec]: value }
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, images: newImages }));
    }
  };

  const handleImageUpload = async (file: File, index: number) => {
    setUploadingImages(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `car-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('car-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Failed to upload image",
        });
        return;
      }

      const { data } = supabase.storage
        .from('car-images')
        .getPublicUrl(filePath);

      handleImageChange(index, data.publicUrl);
      
      toast({
        title: "Image uploaded",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Failed to upload image",
      });
    } finally {
      setUploadingImages(false);
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeatureField = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeatureField = (index: number) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, features: newFeatures }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const carData = {
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        price: parseInt(formData.price),
        mileage: parseInt(formData.mileage),
        fuel_type: formData.fuelType,
        transmission: formData.transmission,
        condition: formData.condition,
        description: formData.description,
        images: formData.images.filter(img => img.trim() !== ''),
        specs: formData.specs,
        features: formData.features.filter(feature => feature.trim() !== ''),
      };

      const { error } = await supabase
        .from('cars')
        .insert([carData]);

      if (error) {
        console.error('Error adding car:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add car",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Car added successfully!",
      });
      
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error in handleSubmit:', error);
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

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-automotive-gray-warm">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-automotive-black">
              Add New Car
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <BasicInfoSection 
                formData={formData}
                onInputChange={handleInputChange}
              />

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />
              </div>

              <ImageUploadSection
                images={formData.images}
                uploadingImages={uploadingImages}
                onImageChange={handleImageChange}
                onImageUpload={handleImageUpload}
                onAddImageField={addImageField}
                onRemoveImageField={removeImageField}
              />

              <SpecificationsSection
                specs={formData.specs}
                onSpecChange={handleSpecChange}
              />

              <FeaturesSection
                features={formData.features}
                onFeatureChange={handleFeatureChange}
                onAddFeatureField={addFeatureField}
                onRemoveFeatureField={removeFeatureField}
              />

              <div className="flex space-x-4">
                <Button 
                  type="submit" 
                  className="bg-automotive-blue hover:bg-automotive-blue-light"
                  disabled={loading || uploadingImages}
                >
                  {loading ? 'Adding Car...' : uploadingImages ? 'Uploading Images...' : 'Add Car'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/admin/dashboard')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default AddCar;
