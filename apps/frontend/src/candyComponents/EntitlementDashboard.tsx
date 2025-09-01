import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { RefreshCw, Download } from "lucide-react";
import { EntitlementTable } from "./dashboard/EntitlementTable";
import { MetricsPanel } from "./dashboard/MetricsPanel";
import { PerformanceFunnel } from "./dashboard/PerformanceFunnel";
import { BestPerformingPackages } from "./dashboard/BestPerformingPackages";

const EntitlementDashboard = () => {
  const [selectedEntitlements, setSelectedEntitlements] = useState([]);
  const [filters, setFilters] = useState({
    userSegment: "",
    targetRegion: "", 
    targetChannel: "",
    targetPricing: ""
  });

  const handleReset = () => {
    setSelectedEntitlements([]);
    setFilters({
      userSegment: "",
      targetRegion: "",
      targetChannel: "",
      targetPricing: ""
    });
  };

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Entitlement Package Design System</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button size="sm" className="bg-dashboard-blue hover:bg-dashboard-blue-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            Get Product Set
          </Button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Left Section - Entitlement Table */}
        <div className="col-span-9">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Entitlement Selection</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <EntitlementTable 
                selectedEntitlements={selectedEntitlements}
                onSelectionChange={setSelectedEntitlements}
                filters={filters}
                onFiltersChange={setFilters}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Metrics Panel */}
        <div className="col-span-3">
          <div className="h-full">
            <MetricsPanel selectedEntitlements={selectedEntitlements} />
          </div>
        </div>
      </div>

      {/* Bottom Analytics Section */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-5">
          <PerformanceFunnel selectedEntitlements={selectedEntitlements} />
        </div>

        <div className="col-span-7">
          <BestPerformingPackages />
        </div>
      </div>
    </div>
  );
};

export default EntitlementDashboard;