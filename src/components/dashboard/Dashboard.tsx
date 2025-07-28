import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { Sidebar } from "./Sidebar";
import { MetricsCards } from "./MetricsCards";
import { AIInsightsPanel } from "./AIInsightsPanel";
import { RecentBookings } from "./RecentBookings";
import { LoyaltyOverview } from "./LoyaltyOverview";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back, Admin</h2>
              <p className="text-muted-foreground">
                Your travel and loyalty platform overview for today
              </p>
            </div>
            
            <MetricsCards />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AIInsightsPanel />
              <RecentBookings />
            </div>
            
            <LoyaltyOverview />
          </div>
        );
      
      case "bookings":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Booking Management</h2>
            <RecentBookings />
            {/* Additional booking management components would go here */}
          </div>
        );
      
      case "customers":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Customer Analytics</h2>
            <p className="text-muted-foreground">
              Advanced customer segmentation and persona insights coming soon...
            </p>
          </div>
        );
      
      case "loyalty":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Loyalty Programs</h2>
            <LoyaltyOverview />
          </div>
        );
      
      case "ai-insights":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">AI Insights & Automation</h2>
            <AIInsightsPanel />
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace("-", " ")}
            </h2>
            <p className="text-muted-foreground">
              This module is coming soon as part of the full platform development.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};