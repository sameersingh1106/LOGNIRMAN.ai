import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Alert } from "./AlertCard";
import { Badge } from "./ui/badge";
import { MapPin, Clock, AlertTriangle, Info, User } from "lucide-react";
import { Button } from "./ui/button";

interface AlertDialogProps {
  alert: Alert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const severityConfig = {
  extreme: {
    badge: "bg-red-600 text-white",
    border: "border-red-200",
  },
  severe: {
    badge: "bg-orange-600 text-white",
    border: "border-orange-200",
  },
  moderate: {
    badge: "bg-yellow-600 text-white",
    border: "border-yellow-200",
  },
  minor: {
    badge: "bg-blue-600 text-white",
    border: "border-blue-200",
  },
};

export function AlertDetailsDialog({
  alert,
  open,
  onOpenChange,
}: AlertDialogProps) {
  if (!alert) return null;

  const config = severityConfig[alert.severity];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="flex-1">{alert.title}</DialogTitle>
            <Badge className={config.badge}>
              {alert.severity.toUpperCase()}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className={`p-4 border-2 rounded-lg ${config.border} bg-gray-50`}>
            <div className="flex items-start gap-3">
              <Info className="text-gray-600 mt-1 flex-shrink-0" size={20} />
              <p>{alert.description}</p>
            </div>
          </div>

          {alert.photo && (
            <div>
              <h4 className="mb-2">Photo Evidence</h4>
              <img
                src={alert.photo}
                alt="Report evidence"
                className="w-full h-auto max-h-96 object-contain rounded-lg border-2 border-gray-200"
              />
            </div>
          )}

          {alert.reportedBy && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-gray-700">
                <User size={16} />
                <span className="text-sm">Reported by: <strong>{alert.reportedBy}</strong></span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <MapPin size={16} />
                <span className="text-sm">Location</span>
              </div>
              <p>{alert.location}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <Clock size={16} />
                <span className="text-sm">Issued</span>
              </div>
              <p>{alert.timestamp.toLocaleString()}</p>
            </div>
          </div>

          {alert.expiresAt && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <AlertTriangle size={16} />
                <span className="text-sm">Expires</span>
              </div>
              <p>{alert.expiresAt.toLocaleString()}</p>
            </div>
          )}

          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <h4 className="mb-2">Safety Recommendations</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {alert.severity === "extreme" && (
                <>
                  <li>Follow evacuation orders immediately if issued</li>
                  <li>Stay indoors and away from windows</li>
                  <li>Monitor official channels for updates</li>
                </>
              )}
              {alert.severity === "severe" && (
                <>
                  <li>Stay alert and monitor the situation</li>
                  <li>Prepare emergency supplies</li>
                  <li>Follow local authority instructions</li>
                </>
              )}
              {(alert.severity === "moderate" || alert.severity === "minor") && (
                <>
                  <li>Stay informed of developing conditions</li>
                  <li>Exercise caution in affected areas</li>
                  <li>Check on vulnerable neighbors</li>
                </>
              )}
            </ul>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>Share Alert</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}