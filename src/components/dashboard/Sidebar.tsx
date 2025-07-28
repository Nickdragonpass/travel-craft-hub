import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  TrendingUp, 
  Gift, 
  Settings, 
  BarChart3,
  Plane,
  CreditCard,
  Shield,
  Brain
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "bookings", label: "Booking Management", icon: Calendar },
  { id: "customers", label: "Customer Analytics", icon: Users },
  { id: "loyalty", label: "Loyalty Programs", icon: Gift },
  { id: "ai-insights", label: "AI Insights", icon: Brain },
  { id: "revenue", label: "Revenue Optimizer", icon: TrendingUp },
  { id: "travel", label: "Travel Engine", icon: Plane },
  { id: "corporate", label: "Corporate Travel", icon: CreditCard },
  { id: "analytics", label: "Advanced Analytics", icon: BarChart3 },
  { id: "compliance", label: "Compliance & Risk", icon: Shield },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <aside className="w-64 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-6">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  isActive && "bg-primary text-primary-foreground shadow-soft"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};