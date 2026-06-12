import { useState } from "react";
import { Card } from "./ui/card";
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
import { Plus, Send } from "lucide-react";

interface AdminPanelProps {
  onCreateAlert: (alert: {
    title: string;
    description: string;
    severity: AlertSeverity;
    type: AlertType;
    location: string;
  }) => void;
}

export function AdminPanel({ onCreateAlert }: AdminPanelProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<AlertSeverity>("moderate");
  const [type, setType] = useState<AlertType>("emergency");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && location) {
      onCreateAlert({
        title,
        description,
        severity,
        type,
        location,
      });
      // Reset form
      setTitle("");
      setDescription("");
      setSeverity("moderate");
      setType("emergency");
      setLocation("");
    }
  };

  return (
    <Card className="p-6 bg-orange-50 border-orange-200 border-2">
      <div className="flex items-center gap-2 mb-4">
        <Plus className="text-orange-600" size={24} />
        <h2>Admin: Create New Alert</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Alert Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter alert title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter detailed alert description"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="severity">Severity Level</Label>
            <Select value={severity} onValueChange={(value) => setSeverity(value as AlertSeverity)}>
              <SelectTrigger id="severity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="extreme">Extreme</SelectItem>
                <SelectItem value="severe">Severe</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="minor">Minor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Alert Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as AlertType)}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="weather">Weather</SelectItem>
                <SelectItem value="amber">Amber</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="traffic">Traffic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter affected location"
            required
          />
        </div>

        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
          <Send size={16} className="mr-2" />
          Broadcast Alert
        </Button>
      </form>
    </Card>
  );
}
