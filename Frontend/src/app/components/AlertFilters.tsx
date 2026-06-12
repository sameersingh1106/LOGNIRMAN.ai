import { Badge } from "./ui/badge";
import { AlertType, AlertSeverity } from "./AlertCard";

interface AlertFiltersProps {
  selectedTypes: AlertType[];
  selectedSeverities: AlertSeverity[];
  onTypeToggle: (type: AlertType) => void;
  onSeverityToggle: (severity: AlertSeverity) => void;
}

const alertTypes: { value: AlertType; label: string }[] = [
  { value: "weather", label: "Weather" },
  { value: "amber", label: "Amber" },
  { value: "emergency", label: "Emergency" },
  { value: "health", label: "Health" },
  { value: "traffic", label: "Traffic" },
];

const severityLevels: { value: AlertSeverity; label: string; color: string }[] = [
  { value: "extreme", label: "Extreme", color: "bg-red-600 hover:bg-red-700" },
  { value: "severe", label: "Severe", color: "bg-orange-600 hover:bg-orange-700" },
  { value: "moderate", label: "Moderate", color: "bg-yellow-600 hover:bg-yellow-700" },
  { value: "minor", label: "Minor", color: "bg-blue-600 hover:bg-blue-700" },
];

export function AlertFilters({
  selectedTypes,
  selectedSeverities,
  onTypeToggle,
  onSeverityToggle,
}: AlertFiltersProps) {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div>
        <h3 className="mb-3">Alert Type</h3>
        <div className="flex flex-wrap gap-2">
          {alertTypes.map((type) => {
            const isSelected = selectedTypes.includes(type.value);
            return (
              <Badge
                key={type.value}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onTypeToggle(type.value)}
              >
                {type.label}
              </Badge>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-3">Severity</h3>
        <div className="flex flex-wrap gap-2">
          {severityLevels.map((severity) => {
            const isSelected = selectedSeverities.includes(severity.value);
            return (
              <Badge
                key={severity.value}
                className={`cursor-pointer ${
                  isSelected
                    ? `${severity.color} text-white`
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => onSeverityToggle(severity.value)}
              >
                {severity.label}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
