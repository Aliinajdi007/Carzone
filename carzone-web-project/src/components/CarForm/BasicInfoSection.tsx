
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BasicInfoSectionProps {
  formData: {
    make: string;
    model: string;
    year: string;
    price: string;
    mileage: string;
    condition: string;
    fuelType: string;
    transmission: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const BasicInfoSection = ({ formData, onInputChange }: BasicInfoSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="make">Make</Label>
        <Input
          id="make"
          value={formData.make}
          onChange={(e) => onInputChange('make', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="model">Model</Label>
        <Input
          id="model"
          value={formData.model}
          onChange={(e) => onInputChange('model', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          type="number"
          value={formData.year}
          onChange={(e) => onInputChange('year', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Price ($)</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => onInputChange('price', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="mileage">Mileage</Label>
        <Input
          id="mileage"
          type="number"
          value={formData.mileage}
          onChange={(e) => onInputChange('mileage', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="condition">Condition</Label>
        <Select value={formData.condition} onValueChange={(value) => onInputChange('condition', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Used">Used</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="fuelType">Fuel Type</Label>
        <Input
          id="fuelType"
          value={formData.fuelType}
          onChange={(e) => onInputChange('fuelType', e.target.value)}
          placeholder="e.g., Gasoline, Hybrid, Electric"
          required
        />
      </div>
      <div>
        <Label htmlFor="transmission">Transmission</Label>
        <Input
          id="transmission"
          value={formData.transmission}
          onChange={(e) => onInputChange('transmission', e.target.value)}
          placeholder="e.g., Automatic, Manual"
          required
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
