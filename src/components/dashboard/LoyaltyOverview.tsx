import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Gift, 
  Users, 
  TrendingUp, 
  Plus,
  Crown,
  Star,
  Award,
  Target
} from "lucide-react";

const loyaltyPrograms = [
  {
    name: "Premium Travel Rewards",
    members: 12847,
    engagement: 78,
    revenue: "$1.2M",
    growth: "+15.2%",
    status: "active"
  },
  {
    name: "Business Elite Benefits",
    members: 3241,
    engagement: 92,
    revenue: "$890K",
    growth: "+22.1%",
    status: "active"
  },
  {
    name: "Family Adventure Points",
    members: 8934,
    engagement: 65,
    revenue: "$456K",
    growth: "+8.7%",
    status: "active"
  }
];

const recentOffers = [
  {
    title: "Double Points Weekend",
    redemptions: 1247,
    success: 94,
    audience: "Gold+ Members",
    expires: "2 days"
  },
  {
    title: "Luxury Hotel Upgrade",
    redemptions: 234,
    success: 87,
    audience: "Platinum Members",
    expires: "5 days"
  },
  {
    title: "Free Airport Lounge",
    redemptions: 567,
    success: 76,
    audience: "All Members",
    expires: "1 week"
  }
];

export const LoyaltyOverview = () => {
  return (
    <div className="space-y-6">
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-primary" />
              <span>Loyalty Programs Performance</span>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Program
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {loyaltyPrograms.map((program, index) => (
              <div
                key={index}
                className="p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{program.name}</h4>
                  <Badge variant="secondary" className="text-success">
                    {program.growth}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div className="text-center">
                    <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-sm font-medium">{program.members.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Members</div>
                  </div>
                  <div className="text-center">
                    <Target className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-sm font-medium">{program.engagement}%</div>
                    <div className="text-xs text-muted-foreground">Engagement</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-sm font-medium">{program.revenue}</div>
                    <div className="text-xs text-muted-foreground">Revenue</div>
                  </div>
                  <div className="text-center">
                    <Award className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <Badge variant={program.status === "active" ? "default" : "secondary"}>
                      {program.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Engagement Rate</span>
                    <span>{program.engagement}%</span>
                  </div>
                  <Progress value={program.engagement} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-primary" />
            <span>Active Offers & Campaigns</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOffers.map((offer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">{offer.title}</h4>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{offer.redemptions} redemptions</span>
                    <span>{offer.success}% success rate</span>
                    <Badge variant="outline" className="text-xs">
                      {offer.audience}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Expires in</div>
                  <div className="text-xs text-warning">{offer.expires}</div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            <Crown className="h-4 w-4 mr-2" />
            Manage All Offers
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};