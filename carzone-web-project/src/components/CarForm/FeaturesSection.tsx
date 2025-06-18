
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface FeaturesSectionProps {
  features: string[];
  onFeatureChange: (index: number, value: string) => void;
  onAddFeatureField: () => void;
  onRemoveFeatureField: (index: number) => void;
}

const FeaturesSection = ({ 
  features, 
  onFeatureChange, 
  onAddFeatureField, 
  onRemoveFeatureField 
}: FeaturesSectionProps) => {
  return (
    <div>
      <Label className="text-base font-medium">Features</Label>
      {features.map((feature, index) => (
        <div key={index} className="flex gap-2 mt-2">
          <Input
            value={feature}
            onChange={(e) => onFeatureChange(index, e.target.value)}
            placeholder="Enter feature"
            className="flex-1"
          />
          {features.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onRemoveFeatureField(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={onAddFeatureField}
        className="mt-2"
      >
        Add Another Feature
      </Button>
    </div>
  );
};

export default FeaturesSection;
