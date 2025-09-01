import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface MetricsPanelProps {
  selectedEntitlements: string[];
}

export const MetricsPanel = ({ selectedEntitlements }: MetricsPanelProps) => {
  // Calculate dynamic metrics based on selected entitlements
  const hasSelections = selectedEntitlements.length > 0;
  
  // Simulated calculation based on selections
  const calculateMetrics = () => {
    if (!hasSelections) {
      return {
        margin: 0,
        valueScore: 0,
        averageCost: 0,
        totalPackage: 0,
        profitMargin: 0,
        recommendedPrice: 0
      };
    }

    // Simple simulation based on number of selections
    const selectionCount = selectedEntitlements.length;
    return {
      margin: Math.min(22 + (selectionCount * 3), 45),
      valueScore: 300 + (selectionCount * 25),
      averageCost: 60 + (selectionCount * 15),
      totalPackage: 100 + (selectionCount * 25),
      profitMargin: 20 + (selectionCount * 8),
      recommendedPrice: 140 + (selectionCount * 20)
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Key Metrics Card */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Package Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-xs opacity-90 mb-1">Est. Margin</div>
              <div className="text-xl font-bold">{metrics.margin}%</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-xs opacity-90 mb-1">Value Score</div>
              <div className="text-xl font-bold">{metrics.valueScore}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Analysis */}
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-700">Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-sm text-slate-600">Average Cost</span>
            <span className="font-semibold text-slate-800">${metrics.averageCost}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-sm text-slate-600">Total Package</span>
            <span className="font-semibold text-slate-800">${metrics.totalPackage}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-slate-600">Profit Margin</span>
            <Badge className={hasSelections ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"}>
              +${metrics.profitMargin}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Options */}
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-700">Pricing Strategy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className={`flex justify-between items-center p-2 rounded ${hasSelections ? 'bg-blue-50' : 'bg-gray-50'}`}>
            <span className="text-sm text-slate-600">Recommended</span>
            <span className={`font-semibold ${hasSelections ? 'text-blue-600' : 'text-gray-500'}`}>
              ${metrics.recommendedPrice}
            </span>
          </div>
          <div className="flex justify-between items-center p-2 rounded">
            <span className="text-sm text-slate-600">Manual</span>
            <span className="font-semibold text-slate-600">${Math.max(0, metrics.recommendedPrice - 25)}</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded">
            <span className="text-sm text-slate-600">Dynamic</span>
            <span className="font-semibold text-slate-600">${Math.max(0, metrics.recommendedPrice - 10)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};