import { AlertTriangle, Bell, Cloud, MapPin, Clock, Camera, User } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export type AlertSeverity = "extreme" | "severe" | "moderate" | "minor";
export type AlertType = "weather" | "amber" | "emergency" | "health" | "traffic";

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  type: AlertType;
  location: string;
  timestamp: Date;
  expiresAt?: Date;
  isActive: boolean;
  photo?: string;
  reportedBy?: string;
}

interface AlertCardProps {
  alert: Alert;
  onClick?: () => void;
}

const severityConfig = {
  extreme: {
    bg: "bg-red-50 border-red-200",
    badge: "bg-red-600 text-white",
    icon: "text-red-600",
  },
  severe: {
    bg: "bg-orange-50 border-orange-200",
    badge: "bg-orange-600 text-white",
    icon: "text-orange-600",
  },
  moderate: {
    bg: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-600 text-white",
    icon: "text-yellow-600",
  },
  minor: {
    bg: "bg-blue-50 border-blue-200",
    badge: "bg-blue-600 text-white",
    icon: "text-blue-600",
  },
};

const typeIcons = {
  weather: Cloud,
  amber: Bell,
  emergency: AlertTriangle,
  health: AlertTriangle,
  traffic: MapPin,
};

export function AlertCard({ alert, onClick }: AlertCardProps) {
  const config = severityConfig[alert.severity];
  const Icon = typeIcons[alert.type];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card
      className={`${config.bg} border-2 cursor-pointer hover:shadow-lg transition-shadow`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-start gap-3 flex-1">
            <Icon className={`${config.icon} mt-1`} size={24} />
            <div className="flex-1">
              <h3 className="mb-1">{alert.title}</h3>
              <p className="text-sm text-gray-600">{alert.description}</p>
            </div>
          </div>
          <Badge className={config.badge}>
            {alert.severity.toUpperCase()}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{alert.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{formatTime(alert.timestamp)}</span>
          </div>
          {alert.photo && (
            <div className="flex items-center gap-1">
              <Camera size={14} />
              <span>Photo attached</span>
            </div>
          )}
          {alert.reportedBy && (
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>By {alert.reportedBy}</span>
            </div>
          )}
        </div>

        {alert.photo && (
          <div className="mt-4">
            <img
              src={alert.photo}
              alt="Report evidence"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        {alert.expiresAt && (
          <div className="mt-2 text-sm text-gray-500">
            Expires: {alert.expiresAt.toLocaleString()}
          </div>
        )}
      </div>
    </Card>
  );
}