import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  MessageSquare, 
  Target,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";

const aiInsights = [
  {
    type: "upsell",
    priority: "high",
    title: "Premium Upgrade Opportunity",
    description: "Customer Jane Smith (Gold Member) searching premium hotels in Dubai",
    action: "Send personalized suite upgrade offer",
    confidence: 94,
    potentialRevenue: "$1,200",
    status: "pending"
  },
  {
    type: "service",
    priority: "urgent",
    title: "Flight Disruption Alert",
    description: "23 customers affected by AA123 delay - proactive rebooking needed",
    action: "Auto-rebook and send compensation offers",
    confidence: 98,
    potentialRevenue: "-$450",
    status: "in-progress"
  },
  {
    type: "retention",
    priority: "medium",
    title: "Churn Risk Detection",
    description: "VIP customer Michael Chen hasn't booked in 6 months",
    action: "Send exclusive loyalty bonus + personal concierge call",
    confidence: 87,
    potentialRevenue: "$3,400",
    status: "pending"
  },
  {
    type: "cross-sell",
    priority: "high",
    title: "Travel Insurance Opportunity",
    description: "Business traveler booking expensive trip without insurance",
    action: "Offer premium travel protection package",
    confidence: 91,
    potentialRevenue: "$340",
    status: "pending"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "warning";
    case "in-progress": return "default";
    case "completed": return "success";
    default: return "secondary";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent": return "destructive";
    case "high": return "warning";
    case "medium": return "secondary";
    default: return "secondary";
  }
};

export const AIInsightsPanel = () => {
  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <span>AI-Powered Insights & Actions</span>
          <Badge variant="secondary" className="ml-auto">
            Real-time
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {aiInsights.map((insight, index) => (
          <div
            key={index}
            className="p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Badge variant={getPriorityColor(insight.priority) as any}>
                  {insight.priority.toUpperCase()}
                </Badge>
                <Badge variant={getStatusColor(insight.status) as any}>
                  {insight.status === "in-progress" ? (
                    <Clock className="h-3 w-3 mr-1" />
                  ) : insight.status === "completed" ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 mr-1" />
                  )}
                  {insight.status.replace("-", " ")}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary">
                  {insight.potentialRevenue}
                </div>
                <div className="text-xs text-muted-foreground">
                  {insight.confidence}% confidence
                </div>
              </div>
            </div>
            
            <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {insight.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-foreground">
                <MessageSquare className="h-3 w-3 inline mr-1" />
                {insight.action}
              </div>
              <Button size="sm" variant={insight.status === "pending" ? "default" : "secondary"}>
                {insight.status === "pending" ? "Execute" : "View Details"}
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t border-border">
          <Button variant="outline" className="w-full">
            <Brain className="h-4 w-4 mr-2" />
            View All AI Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};