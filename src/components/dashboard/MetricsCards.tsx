import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CreditCard, 
  Calendar,
  AlertTriangle,
  Target,
  Globe
} from "lucide-react";

const metrics = [
  {
    title: "Total Revenue",
    value: "$2.4M",
    change: "+12.5%",
    trend: "up",
    icon: CreditCard,
    description: "This month"
  },
  {
    title: "Active Customers",
    value: "24,847",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    description: "Engaged users"
  },
  {
    title: "Bookings Today",
    value: "342",
    change: "-2.1%",
    trend: "down",
    icon: Calendar,
    description: "vs yesterday"
  },
  {
    title: "Conversion Rate",
    value: "3.4%",
    change: "+0.8%",
    trend: "up",
    icon: Target,
    description: "Search to book"
  },
  {
    title: "AI Actions Taken",
    value: "156",
    change: "+45.2%",
    trend: "up",
    icon: AlertTriangle,
    description: "Automated today",
    urgent: true
  },
  {
    title: "Global Destinations",
    value: "1,247",
    change: "+23",
    trend: "up",
    icon: Globe,
    description: "Live inventory"
  }
];

export const MetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const isPositive = metric.trend === "up";
        
        return (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-1">
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3 text-success" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-destructive" />
                  )}
                  <span className={`text-xs font-medium ${
                    isPositive ? "text-success" : "text-destructive"
                  }`}>
                    {metric.change}
                  </span>
                </div>
                {metric.urgent && (
                  <Badge variant="destructive" className="text-xs">
                    Action Required
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};