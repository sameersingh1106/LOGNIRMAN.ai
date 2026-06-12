import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { AlertType, AlertSeverity } from "./AlertCard";
import { Camera, Upload, X } from "lucide-react";

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (report: {
    title: string;
    description: string;
    severity: AlertSeverity;
    type: AlertType;
    location: string;
    photo?: string;
  }) => void;
}

export function ReportDialog({ open, onOpenChange, onSubmit }: ReportDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<AlertSeverity>("moderate");
  const [type, setType] = useState<AlertType>("emergency");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && location) {
      onSubmit({
        title,
        description,
        severity,
        type,
        location,
        photo: photo || undefined,
      });
      // Reset form
      setTitle("");
      setDescription("");
      setSeverity("moderate");
      setType("emergency");
      setLocation("");
      setPhoto(null);
      setPhotoFile(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Report a Problem</DialogTitle>
          <DialogDescription>
            Submit a report with details and photo evidence. Our team will review it immediately.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="report-title">Problem Title</Label>
            <Input
              id="report-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Flooded street, Downed power lines"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="report-description">Description</Label>
            <Textarea
              id="report-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed information about the problem..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="report-location">Location</Label>
            <Input
              id="report-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Main St & 5th Ave, Downtown"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="report-severity">Severity</Label>
              <Select value={severity} onValueChange={(value) => setSeverity(value as AlertSeverity)}>
                <SelectTrigger id="report-severity">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="extreme">Extreme - Life threatening</SelectItem>
                  <SelectItem value="severe">Severe - Major impact</SelectItem>
                  <SelectItem value="moderate">Moderate - Significant issue</SelectItem>
                  <SelectItem value="minor">Minor - Small concern</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-type">Category</Label>
              <Select value={type} onValueChange={(value) => setType(value as AlertType)}>
                <SelectTrigger id="report-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="weather">Weather</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="traffic">Traffic</SelectItem>
                  <SelectItem value="amber">Amber Alert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Photo Evidence (Optional)</Label>
            {!photo ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Camera className="mx-auto text-gray-400 mb-2" size={40} />
                  <p className="text-sm text-gray-600 mb-1">
                    Click to upload a photo
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG up to 10MB
                  </p>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={photo}
                  alt="Uploaded evidence"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleRemovePhoto}
                >
                  <X size={16} />
                </Button>
              </div>
            )}
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Your report will be reviewed by our emergency response team. 
              For immediate life-threatening emergencies, please call 911.
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Upload size={16} className="mr-2" />
              Submit Report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
