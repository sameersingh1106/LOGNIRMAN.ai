import { useState } from "react";
import { AlertCard, Alert, AlertType, AlertSeverity } from "./components/AlertCard";
import { AlertDetailsDialog } from "./components/AlertDialog";
import { AlertFilters } from "./components/AlertFilters";
import { AlertStats } from "./components/AlertStats";
import { LoginDialog } from "./components/LoginDialog";
import { AdminPanel } from "./components/AdminPanel";
import { Bell, Search, User, Shield, LogOut, Camera } from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { ReportDialog } from "./components/ReportDialog";

// Mock alert data
const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "Severe Thunderstorm Warning",
    description: "Severe thunderstorms with damaging winds, large hail, and possible tornadoes. Seek shelter immediately.",
    severity: "extreme",
    type: "weather",
    location: "Downtown Metro Area",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
    isActive: true,
  },
  {
    id: "2",
    title: "AMBER Alert: Missing Child",
    description: "Child abduction reported. White sedan, license plate ABC-1234. Last seen near Central Park.",
    severity: "extreme",
    type: "amber",
    location: "Central District",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 12),
    isActive: true,
  },
  {
    id: "3",
    title: "Flash Flood Warning",
    description: "Heavy rainfall causing flash flooding in low-lying areas. Avoid driving through water.",
    severity: "severe",
    type: "weather",
    location: "Riverside County",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 4),
    isActive: true,
  },
  {
    id: "4",
    title: "Air Quality Alert",
    description: "Poor air quality due to wildfire smoke. Limit outdoor activities, especially for sensitive groups.",
    severity: "moderate",
    type: "health",
    location: "Northern Region",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    isActive: true,
  },
  {
    id: "5",
    title: "Major Traffic Incident",
    description: "Multi-vehicle accident on Highway 101. Expect significant delays. Use alternate routes.",
    severity: "moderate",
    type: "traffic",
    location: "Highway 101 North",
    timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 mins ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 3),
    isActive: true,
  },
  {
    id: "6",
    title: "Winter Weather Advisory",
    description: "Light snow expected overnight. Slippery road conditions possible during morning commute.",
    severity: "minor",
    type: "weather",
    location: "Mountain Areas",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 18),
    isActive: true,
  },
  {
    id: "7",
    title: "Heat Advisory",
    description: "Dangerously hot temperatures expected. Stay hydrated and limit outdoor activities.",
    severity: "moderate",
    type: "health",
    location: "Southern Valley",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    isActive: false,
  },
  {
    id: "8",
    title: "Emergency Shelter Open",
    description: "Emergency shelter opened at Community Center due to power outages. Services available 24/7.",
    severity: "severe",
    type: "emergency",
    location: "Eastside Community",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 48),
    isActive: true,
  },
];

export default function App() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<AlertType[]>([]);
  const [selectedSeverities, setSelectedSeverities] = useState<AlertSeverity[]>([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState<{ type: "citizen" | "admin"; username: string } | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [reportOpen, setReportOpen] = useState(false);

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setDialogOpen(true);
  };

  const handleTypeToggle = (type: AlertType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSeverityToggle = (severity: AlertSeverity) => {
    setSelectedSeverities((prev) =>
      prev.includes(severity)
        ? prev.filter((s) => s !== severity)
        : [...prev, severity]
    );
  };

  const handleLogin = (userType: "citizen" | "admin", username: string) => {
    setUser({ type: userType, username });
    toast.success(`Welcome ${username}! Logged in as ${userType}.`);
  };

  const handleLogout = () => {
    setUser(null);
    toast.info("You have been logged out.");
  };

  const handleCreateAlert = (alertData: {
    title: string;
    description: string;
    severity: AlertSeverity;
    type: AlertType;
    location: string;
  }) => {
    const newAlert: Alert = {
      id: Date.now().toString(),
      ...alertData,
      timestamp: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      isActive: true,
    };
    setAlerts((prev) => [newAlert, ...prev]);
    toast.success("Alert broadcasted successfully!");
  };

  const handleSubmitReport = (reportData: {
    title: string;
    description: string;
    severity: AlertSeverity;
    type: AlertType;
    location: string;
    photo?: string;
  }) => {
    const newReport: Alert = {
      id: Date.now().toString(),
      ...reportData,
      timestamp: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      isActive: true,
      reportedBy: user?.username || "Anonymous",
    };
    setAlerts((prev) => [newReport, ...prev]);
    toast.success("Report submitted successfully! Emergency team notified.");
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      searchQuery === "" ||
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(alert.type);

    const matchesSeverity =
      selectedSeverities.length === 0 ||
      selectedSeverities.includes(alert.severity);

    return matchesSearch && matchesType && matchesSeverity;
  });

  const activeAlerts = filteredAlerts.filter((a) => a.isActive);
  const inactiveAlerts = filteredAlerts.filter((a) => !a.isActive);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <Bell className="text-white" size={24} />
              </div>
              <div>
                <h1>Public Safety Alert System</h1>
                <p className="text-sm text-gray-600">
                  Real-time emergency notifications
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Logged in as</div>
                    <div className="text-sm flex items-center gap-1">
                      {user.type === "admin" ? (
                        <Shield size={14} className="text-orange-600" />
                      ) : (
                        <User size={14} className="text-blue-600" />
                      )}
                      {user.username}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => setLoginOpen(true)}>
                    <User size={16} className="mr-2" />
                    Citizen Login
                  </Button>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700" onClick={() => setLoginOpen(true)}>
                    <Shield size={16} className="mr-2" />
                    Admin Login
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="mb-8">
          <AlertStats alerts={mockAlerts} />
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search alerts by title, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="lg:col-span-1">
            <AlertFilters
              selectedTypes={selectedTypes}
              selectedSeverities={selectedSeverities}
              onTypeToggle={handleTypeToggle}
              onSeverityToggle={handleSeverityToggle}
            />
          </div>
        </div>

        {/* Admin Panel */}
        {user?.type === "admin" && (
          <div className="mb-8">
            <AdminPanel onCreateAlert={handleCreateAlert} />
          </div>
        )}

        {/* Alerts List */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">
              Active Alerts ({activeAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="archive">
              Archive ({inactiveAlerts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeAlerts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border">
                <Bell className="mx-auto text-gray-400 mb-3" size={48} />
                <h3 className="text-gray-600 mb-2">No Active Alerts</h3>
                <p className="text-sm text-gray-500">
                  There are currently no active alerts matching your filters.
                </p>
              </div>
            ) : (
              activeAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onClick={() => handleAlertClick(alert)}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="archive" className="space-y-4">
            {inactiveAlerts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border">
                <Bell className="mx-auto text-gray-400 mb-3" size={48} />
                <h3 className="text-gray-600 mb-2">No Archived Alerts</h3>
                <p className="text-sm text-gray-500">
                  There are currently no archived alerts matching your filters.
                </p>
              </div>
            ) : (
              inactiveAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onClick={() => handleAlertClick(alert)}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Alert Details Dialog */}
      <AlertDetailsDialog
        alert={selectedAlert}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      {/* Login Dialog */}
      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onLogin={handleLogin}
      />

      {/* Report Dialog */}
      <ReportDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        onSubmit={handleSubmitReport}
      />

      {/* Floating Report Button - Only for Citizens */}
      {user?.type === "citizen" && (
        <Button
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          onClick={() => setReportOpen(true)}
        >
          <Camera size={24} />
        </Button>
      )}
    </div>
  );
}