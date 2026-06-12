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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { User, Shield } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (userType: "citizen" | "admin", username: string) => void;
}

export function LoginDialog({ open, onOpenChange, onLogin }: LoginDialogProps) {
  const [citizenUsername, setCitizenUsername] = useState("");
  const [citizenPassword, setCitizenPassword] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleCitizenLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (citizenUsername) {
      onLogin("citizen", citizenUsername);
      setCitizenUsername("");
      setCitizenPassword("");
      onOpenChange(false);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername) {
      onLogin("admin", adminUsername);
      setAdminUsername("");
      setAdminPassword("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Login to Public Safety System</DialogTitle>
          <DialogDescription>
            Choose your account type to access the system
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="citizen" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="citizen" className="flex items-center gap-2">
              <User size={16} />
              Citizen
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield size={16} />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="citizen" className="space-y-4 mt-4">
            <form onSubmit={handleCitizenLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="citizen-username">Username</Label>
                <Input
                  id="citizen-username"
                  type="text"
                  placeholder="Enter your username"
                  value={citizenUsername}
                  onChange={(e) => setCitizenUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="citizen-password">Password</Label>
                <Input
                  id="citizen-password"
                  type="password"
                  placeholder="Enter your password"
                  value={citizenPassword}
                  onChange={(e) => setCitizenPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                <p>Citizen Access Features:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>View all public safety alerts</li>
                  <li>Save locations for notifications</li>
                  <li>Report emergencies</li>
                </ul>
              </div>
              <Button type="submit" className="w-full">
                Login as Citizen
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="admin" className="space-y-4 mt-4">
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-username">Admin Username</Label>
                <Input
                  id="admin-username"
                  type="text"
                  placeholder="Enter admin username"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Admin Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Enter admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-sm text-gray-600 bg-orange-50 p-3 rounded border border-orange-200">
                <p>Admin Access Features:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Create and manage alerts</li>
                  <li>View analytics and reports</li>
                  <li>Manage user notifications</li>
                </ul>
              </div>
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                Login as Admin
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
