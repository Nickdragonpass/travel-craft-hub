import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, TrendingUp, Users, Eye, MousePointer, MapPin, User, Briefcase, Heart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Generate dynamic data based on date range
const generateMockData = (dateRange: DateRange | undefined) => {
  const daysDiff = dateRange?.from && dateRange?.to 
    ? differenceInDays(dateRange.to, dateRange.from) 
    : 7;
  
  const baseMultiplier = Math.max(0.5, Math.min(3.0, daysDiff / 7)); // Scale based on date range
  const days = Math.max(1, daysDiff);

  const pageData = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    
    const dailyVariation = 0.8 + Math.random() * 0.4; // 0.8 to 1.2 variation
    pageData.push({
      date: date.toISOString().split('T')[0],
      pv: Math.floor(12000 * baseMultiplier * dailyVariation),
      uv: Math.floor(8000 * baseMultiplier * dailyVariation),
      conversionRate: parseFloat((3.5 + Math.random() * 2.5).toFixed(1))
    });
  }

  const totalPV = Math.floor(110000 * baseMultiplier);
  const totalUV = Math.floor(69000 * baseMultiplier);
  const avgConversion = parseFloat((3.8 + Math.random() * 1.5).toFixed(1));
  const bounceRate = parseFloat((25 + Math.random() * 8).toFixed(1));

  const funnelData = [
    { 
      stage: "Campaign Reach", 
      value: parseFloat((92 + Math.random() * 6).toFixed(1)), 
      color: "#3b82f6" 
    },
    { 
      stage: "Claim Rate", 
      value: parseFloat((20 + Math.random() * 10).toFixed(1)), 
      color: "#10b981" 
    },
    { 
      stage: "Redemption Rate", 
      value: parseFloat((60 + Math.random() * 15).toFixed(1)), 
      color: "#f59e0b" 
    }
  ];

  // User demographics data
  const regionData = [
    { name: "Asia Pacific", value: 45, color: "#3b82f6" },
    { name: "North America", value: 25, color: "#10b981" },
    { name: "Europe", value: 20, color: "#f59e0b" },
    { name: "Others", value: 10, color: "#8b5cf6" }
  ];

  const ageData = [
    { name: "18-25", value: 28, color: "#3b82f6" },
    { name: "26-35", value: 35, color: "#10b981" },
    { name: "36-45", value: 22, color: "#f59e0b" },
    { name: "46+", value: 15, color: "#8b5cf6" }
  ];

  const genderData = [
    { name: "Female", value: 52, color: "#ec4899" },
    { name: "Male", value: 45, color: "#3b82f6" },
    { name: "Other", value: 3, color: "#8b5cf6" }
  ];

  const incomeData = [
    { name: "$30K-50K", value: 25, color: "#3b82f6" },
    { name: "$50K-75K", value: 35, color: "#10b981" },
    { name: "$75K-100K", value: 25, color: "#f59e0b" },
    { name: "$100K+", value: 15, color: "#8b5cf6" }
  ];

  const topInterests = [
    { name: "Travel & Leisure", count: 8420, percentage: 68 },
    { name: "Dining & Food", count: 7230, percentage: 58 },
    { name: "Shopping & Retail", count: 6890, percentage: 55 },
    { name: "Entertainment", count: 5940, percentage: 48 },
    { name: "Technology", count: 4560, percentage: 37 },
    { name: "Health & Wellness", count: 4120, percentage: 33 }
  ];

  return {
    pageData,
    metrics: {
      totalPV,
      totalUV,
      avgConversion,
      bounceRate,
      pvGrowth: parseFloat((10 + Math.random() * 15).toFixed(1)),
      uvGrowth: parseFloat((8 + Math.random() * 12).toFixed(1)),
      conversionGrowth: parseFloat((0.5 + Math.random() * 1.5).toFixed(1)),
      bounceChange: parseFloat((-1 - Math.random() * 4).toFixed(1))
    },
    funnelData,
    userProfiles: {
      regionData,
      ageData,
      genderData,
      incomeData,
      topInterests,
      totalUsers: Math.floor(12400 + Math.random() * 2000)
    }
  };
};

interface CampaignPageDataProps {
  dateRange: DateRange | undefined;
}

export const CampaignPageData = ({ dateRange }: CampaignPageDataProps) => {
  const data = generateMockData(dateRange);

  return (
    <div className="space-y-6">
      {/* Campaign Page Data Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Campaign Page Data
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Page Views (PV)</p>
                <div className="flex items-center gap-2 mt-2">
                 <p className="text-2xl font-bold">{data.metrics.totalPV.toLocaleString()}</p>
                  <span className="text-sm text-green-600 font-medium">+{data.metrics.pvGrowth}%</span>
                </div>
              </div>
              <Eye className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unique Visitors (UV)</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-2xl font-bold">{data.metrics.totalUV.toLocaleString()}</p>
                  <span className="text-sm text-green-600 font-medium">+{data.metrics.uvGrowth}%</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Conversion Rate</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-2xl font-bold">{data.metrics.avgConversion}%</p>
                  <span className="text-sm text-green-600 font-medium">+{data.metrics.conversionGrowth}%</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-2xl font-bold">{data.metrics.bounceRate}%</p>
                  <span className="text-sm text-red-600 font-medium">{data.metrics.bounceChange}%</span>
                </div>
              </div>
              <MousePointer className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Page Browsing Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.pageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="pv" stroke="#3b82f6" name="Page Views" />
                  <Line type="monotone" dataKey="uv" stroke="#10b981" name="Unique Visitors" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {data.pageData.reduce((sum, d) => sum + d.pv, 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total PV</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {data.pageData.reduce((sum, d) => sum + d.uv, 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total UV</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {(data.pageData.reduce((sum, d) => sum + d.conversionRate, 0) / data.pageData.length).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg Conversion</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Campaign Benefit Package Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Performance Funnel */}
              <div className="space-y-4">
                <h4 className="font-medium">Performance Metrics</h4>
                {data.funnelData.map((item, index) => (
                  <div key={item.stage} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.stage}</span>
                      <Badge variant="secondary">{item.value}%</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="h-3 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${item.value}%`,
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </CardContent>
        </Card>
      </div>


    </div>
  );
};