
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

interface ImageUploadSectionProps {
  images: string[];
  uploadingImages: boolean;
  onImageChange: (index: number, value: string) => void;
  onImageUpload: (file: File, index: number) => Promise<void>;
  onAddImageField: () => void;
  onRemoveImageField: (index: number) => void;
}

const ImageUploadSection = ({ 
  images, 
  uploadingImages, 
  onImageChange, 
  onImageUpload, 
  onAddImageField, 
  onRemoveImageField 
}: ImageUploadSectionProps) => {
  return (
    <div>
      <Label className="text-base font-medium">Car Images</Label>
      <p className="text-sm text-gray-600 mb-4">Upload images or paste image URLs</p>
      {images.map((image, index) => (
        <div key={index} className="flex gap-2 mb-3 items-start">
          <div className="flex-1">
            <Input
              value={image}
              onChange={(e) => onImageChange(index, e.target.value)}
              placeholder="Enter image URL or upload file"
            />
          </div>
          <div className="flex gap-2">
            <Label className="cursor-pointer">
              <Button type="button" variant="outline" size="sm" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </span>
              </Button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onImageUpload(file, index);
                  }
                }}
              />
            </Label>
            {images.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onRemoveImageField(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={onAddImageField}
        className="mt-2"
        disabled={uploadingImages}
      >
        Add Another Image
      </Button>
    </div>
  );
};

export default ImageUploadSection;
