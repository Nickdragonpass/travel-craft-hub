import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { FileText, Download } from "lucide-react";

interface PerformanceFunnelProps {
  selectedEntitlements: string[];
}

const funnelData = [
  { stage: "Visit", value: 100, color: "bg-chart-1" },
  { stage: "Purchase", value: 70, color: "bg-chart-2" },
  { stage: "Benefit Selection", value: 40, color: "bg-chart-3" },
  { stage: "Redemption", value: 10, color: "bg-chart-4" }
];

export const PerformanceFunnel = ({ selectedEntitlements }: PerformanceFunnelProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Service Performance Funnel</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-xs">
            Estimate Conversion
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Detail Outcome
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Segmentation Analysis
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Modern Funnel Visualization */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6">
            <div className="space-y-3">
              {funnelData.map((stage, index) => {
                const widthPercent = stage.value;
                
                return (
                  <div key={stage.stage} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-medium text-slate-600 text-right">
                      {stage.stage}
                    </div>
                    <div className="flex-1 relative">
                      <div className="w-full bg-slate-200 rounded-full h-8 overflow-hidden">
                        <div 
                          className={`h-full rounded-full flex items-center justify-end pr-3 text-white text-sm font-medium transition-all duration-700 ${stage.color}`}
                          style={{ width: `${widthPercent}%` }}
                        >
                          {stage.value}%
                        </div>
                      </div>
                    </div>
                    <div className="w-16 text-sm text-slate-500">
                      {stage.value === 100 ? '10K' : 
                       stage.value === 70 ? '7K' :
                       stage.value === 40 ? '4K' : '1K'} users
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 grid grid-cols-4 gap-4 text-center">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-lg font-bold text-blue-600">30%</div>
                <div className="text-xs text-slate-600">Conversion Rate</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-lg font-bold text-green-600">$142</div>
                <div className="text-xs text-slate-600">Avg. Value</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-lg font-bold text-purple-600">85%</div>
                <div className="text-xs text-slate-600">Satisfaction</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-lg font-bold text-orange-600">22%</div>
                <div className="text-xs text-slate-600">Profit Margin</div>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="w-3 h-3 mr-1" />
              Export Excel
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <FileText className="w-3 h-3 mr-1" />
              Export PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};