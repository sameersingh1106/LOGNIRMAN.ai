import { Alert } from "./AlertCard";
import { Card } from "./ui/card";
import { AlertTriangle, TrendingUp, MapPin, Clock } from "lucide-react";

interface AlertStatsProps {
  alerts: Alert[];
}

export function AlertStats({ alerts }: AlertStatsProps) {
  const activeAlerts = alerts.filter((a) => a.isActive).length;
  const extremeAlerts = alerts.filter((a) => a.severity === "extreme").length;
  const affectedAreas = new Set(alerts.map((a) => a.location)).size;
  const recentAlerts = alerts.filter((a) => {
    const diff = new Date().getTime() - a.timestamp.getTime();
    return diff < 3600000; // Last hour
  }).length;

  const stats = [
    {
      label: "Active Alerts",
      value: activeAlerts,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Extreme",
      value: extremeAlerts,
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Affected Areas",
      value: affectedAreas,
      icon: MapPin,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Last Hour",
      value: recentAlerts,
      icon: Clock,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className={`${stat.bg} border-2`}>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl">{stat.value}</p>
              </div>
              <stat.icon className={stat.color} size={32} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
