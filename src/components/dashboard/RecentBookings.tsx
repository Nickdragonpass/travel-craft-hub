import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Plane, 
  Hotel, 
  Car, 
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

const bookings = [
  {
    id: "BK-2024-001",
    customer: "Sarah Johnson",
    type: "flight",
    destination: "London → New York",
    date: "Dec 15, 2024",
    amount: "$1,247",
    status: "confirmed",
    loyaltyTier: "Platinum",
    aiFlag: "upsell-opportunity"
  },
  {
    id: "BK-2024-002",
    customer: "Michael Chen",
    type: "hotel",
    destination: "Four Seasons Dubai",
    date: "Dec 18, 2024",
    amount: "$2,340",
    status: "pending",
    loyaltyTier: "Gold",
    aiFlag: null
  },
  {
    id: "BK-2024-003",
    customer: "Emma Davis",
    type: "package",
    destination: "Tokyo Package Deal",
    date: "Dec 22, 2024",
    amount: "$3,456",
    status: "confirmed",
    loyaltyTier: "Silver",
    aiFlag: "service-alert"
  },
  {
    id: "BK-2024-004",
    customer: "David Wilson",
    type: "car",
    destination: "BMW X5 - Miami",
    date: "Dec 20, 2024",
    amount: "$567",
    status: "confirmed",
    loyaltyTier: "Basic",
    aiFlag: null
  },
  {
    id: "BK-2024-005",
    customer: "Lisa Brown",
    type: "flight",
    destination: "Paris → Singapore",
    date: "Dec 25, 2024",
    amount: "$1,890",
    status: "cancelled",
    loyaltyTier: "Platinum",
    aiFlag: "retention-risk"
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "flight": return <Plane className="h-4 w-4" />;
    case "hotel": return <Hotel className="h-4 w-4" />;
    case "car": return <Car className="h-4 w-4" />;
    case "package": return <Calendar className="h-4 w-4" />;
    default: return <Calendar className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed": return "success";
    case "pending": return "warning";
    case "cancelled": return "destructive";
    default: return "secondary";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "confirmed": return <CheckCircle className="h-3 w-3" />;
    case "pending": return <Clock className="h-3 w-3" />;
    case "cancelled": return <AlertCircle className="h-3 w-3" />;
    default: return <Clock className="h-3 w-3" />;
  }
};

const getTierColor = (tier: string) => {
  switch (tier) {
    case "Platinum": return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
    case "Gold": return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    case "Silver": return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    default: return "bg-muted text-muted-foreground";
  }
};

const getAIFlagInfo = (flag: string | null) => {
  switch (flag) {
    case "upsell-opportunity":
      return { text: "Upsell Ready", color: "success" };
    case "service-alert":
      return { text: "Service Alert", color: "warning" };
    case "retention-risk":
      return { text: "Retention Risk", color: "destructive" };
    default:
      return null;
  }
};

export const RecentBookings = () => {
  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Recent Bookings</span>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => {
            const aiFlagInfo = getAIFlagInfo(booking.aiFlag);
            
            return (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-muted rounded-lg">
                    {getTypeIcon(booking.type)}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-sm">{booking.customer}</h4>
                      <Badge className={getTierColor(booking.loyaltyTier)}>
                        {booking.loyaltyTier}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {booking.destination}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {booking.date}
                      </span>
                      <Badge variant={getStatusColor(booking.status) as any} className="text-xs">
                        {getStatusIcon(booking.status)}
                        <span className="ml-1">{booking.status}</span>
                      </Badge>
                      {aiFlagInfo && (
                        <Badge variant={aiFlagInfo.color as any} className="text-xs">
                          {aiFlagInfo.text}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-semibold">{booking.amount}</div>
                    <div className="text-xs text-muted-foreground">{booking.id}</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};