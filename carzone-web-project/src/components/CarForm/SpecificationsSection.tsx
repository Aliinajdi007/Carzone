
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SpecificationsSectionProps {
  specs: {
    engine: string;
    horsepower: string;
    mpg: string;
    drivetrain: string;
    seating: string;
    safety: string;
  };
  onSpecChange: (spec: string, value: string) => void;
}

const SpecificationsSection = ({ specs, onSpecChange }: SpecificationsSectionProps) => {
  return (
    <div>
      <Label className="text-base font-medium">Specifications</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <Input
          placeholder="Engine (e.g., 2.5L 4-Cylinder)"
          value={specs.engine}
          onChange={(e) => onSpecChange('engine', e.target.value)}
        />
        <Input
          placeholder="Horsepower (e.g., 200 HP)"
          value={specs.horsepower}
          onChange={(e) => onSpecChange('horsepower', e.target.value)}
        />
        <Input
          placeholder="MPG (e.g., 28 city / 35 highway)"
          value={specs.mpg}
          onChange={(e) => onSpecChange('mpg', e.target.value)}
        />
        <Input
          placeholder="Drivetrain (e.g., Front-Wheel Drive)"
          value={specs.drivetrain}
          onChange={(e) => onSpecChange('drivetrain', e.target.value)}
        />
        <Input
          placeholder="Seating (e.g., 5 passengers)"
          value={specs.seating}
          onChange={(e) => onSpecChange('seating', e.target.value)}
        />
        <Input
          placeholder="Safety Rating (e.g., 5-Star NHTSA)"
          value={specs.safety}
          onChange={(e) => onSpecChange('safety', e.target.value)}
        />
      </div>
    </div>
  );
};

export default SpecificationsSection;
