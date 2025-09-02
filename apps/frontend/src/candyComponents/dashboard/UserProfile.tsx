import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { User, Users, Heart } from "lucide-react";

// Generate dynamic user profile data based on date range
const generateUserProfileData = (dateRange: DateRange | undefined) => {
  const daysDiff = dateRange?.from && dateRange?.to 
    ? differenceInDays(dateRange.to, dateRange.from) 
    : 7;
  
  const baseMultiplier = Math.max(0.5, Math.min(3.0, daysDiff / 7));

  const genderData = [
    { name: "Female", value: 52, color: "#ec4899" },
    { name: "Male", value: 45, color: "#3b82f6" },
    { name: "Other", value: 3, color: "#8b5cf6" }
  ];

  const ageData = [
    { name: "18-25", value: 28, color: "#3b82f6" },
    { name: "26-35", value: 35, color: "#10b981" },
    { name: "36-45", value: 22, color: "#f59e0b" },
    { name: "46+", value: 15, color: "#8b5cf6" }
  ];

  const topInterests = [
    { name: "Travel & Leisure", count: Math.floor(8420 * baseMultiplier), percentage: 68 },
    { name: "Dining & Food", count: Math.floor(7230 * baseMultiplier), percentage: 58 },
    { name: "Shopping & Retail", count: Math.floor(6890 * baseMultiplier), percentage: 55 },
    { name: "Entertainment", count: Math.floor(5940 * baseMultiplier), percentage: 48 },
    { name: "Technology", count: Math.floor(4560 * baseMultiplier), percentage: 37 },
    { name: "Health & Wellness", count: Math.floor(4120 * baseMultiplier), percentage: 33 }
  ];

  return {
    genderData,
    ageData,
    topInterests,
    totalUsers: Math.floor((12400 + Math.random() * 2000) * baseMultiplier)
  };
};

interface UserProfileProps {
  dateRange: DateRange | undefined;
}

export const UserProfile = ({ dateRange }: UserProfileProps) => {
  const data = generateUserProfileData(dateRange);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          User Profile Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Gender Distribution */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Gender Distribution
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {data.genderData.map((gender, index) => (
                <div key={gender.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">{gender.name}</span>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: gender.color }}
                    />
                    <span className="text-sm font-medium">{gender.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Age Distribution */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Age Distribution
            </h4>
            <div className="space-y-2">
              {data.ageData.map((age, index) => (
                <div key={age.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{age.name}</span>
                    <span className="font-medium">{age.value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${age.value}%`,
                        backgroundColor: age.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interest Labels */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Top Interest Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.topInterests.slice(0, 6).map((interest, index) => (
                <Badge key={interest.name} variant="outline" className="text-sm">
                  {interest.name} ({interest.percentage}%)
                </Badge>
              ))}
            </div>
          </div>

          {/* Total Users Stats */}
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{data.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Active Users</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};