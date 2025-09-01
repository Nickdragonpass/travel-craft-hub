import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Calendar, TrendingUp, Users, Globe, Heart, ShoppingBag, User2, Briefcase } from "lucide-react";

interface ComponentDetailSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  componentId: string | null;
  componentName: string;
  data: any;
}

// Generate mock user profile data
const generateUserProfiles = (componentId: string) => {
  const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'];
  const ages = ['18-24', '25-34', '35-44', '45-54', '55+'];
  const interests = ['Shopping', 'Travel', 'Technology', 'Finance', 'Entertainment', 'Food & Dining', 'Sports', 'Health & Wellness'];
  const genders = ['Male', 'Female', 'Prefer not to say'];
  const incomeRanges = ['$30K-50K', '$50K-75K', '$75K-100K', '$100K+'];
  
  return {
    demographics: {
      regions: regions.map(region => ({
        region,
        percentage: Math.floor(Math.random() * 30) + 10,
        users: Math.floor(Math.random() * 5000) + 1000
      })),
      ages: ages.map(age => ({
        age,
        percentage: Math.floor(Math.random() * 25) + 15,
        users: Math.floor(Math.random() * 3000) + 500
      })),
      interests: interests.slice(0, 5).map(interest => ({
        interest,
        percentage: Math.floor(Math.random() * 20) + 10,
        users: Math.floor(Math.random() * 2000) + 300
      })),
      genders: genders.map(gender => ({
        gender,
        percentage: gender === 'Male' ? 48 : gender === 'Female' ? 49 : 3,
        users: Math.floor(Math.random() * 2000) + 500
      })),
      incomes: incomeRanges.map(income => ({
        income,
        percentage: Math.floor(Math.random() * 30) + 15,
        users: Math.floor(Math.random() * 1500) + 400
      }))
    },
    topPerformingSegments: [
      { segment: 'Tech-savvy Millennials', engagement: '87.2%', conversion: '12.4%' },
      { segment: 'Premium Shoppers', engagement: '82.1%', conversion: '15.8%' },
      { segment: 'Travel Enthusiasts', engagement: '79.5%', conversion: '9.3%' },
      { segment: 'Financial Planners', engagement: '76.8%', conversion: '11.2%' }
    ]
  };
};

export const ComponentDetailSidebar = ({ 
  isOpen, 
  onClose, 
  componentId, 
  componentName, 
  data 
}: ComponentDetailSidebarProps) => {
  const [activeTab, setActiveTab] = useState("daily-data");
  
  if (!componentId || !data) return null;

  const userProfiles = generateUserProfiles(componentId);

  const renderDailyDataTable = () => {
    const dailyData = data.dailyData || [];
    
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Views</TableHead>
            {data.clicks !== undefined && <TableHead className="text-right">Clicks</TableHead>}
            {data.participants !== undefined && <TableHead className="text-right">Participants</TableHead>}
            {data.claims !== undefined && <TableHead className="text-right">Claims</TableHead>}
            {data.conversionRate !== undefined && <TableHead className="text-right">Conv. Rate</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dailyData.map((day: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{new Date(day.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">{day.views?.toLocaleString()}</TableCell>
              {day.clicks !== undefined && <TableCell className="text-right">{day.clicks?.toLocaleString()}</TableCell>}
              {day.participants !== undefined && <TableCell className="text-right">{day.participants?.toLocaleString()}</TableCell>}
              {day.claims !== undefined && <TableCell className="text-right">{day.claims?.toLocaleString()}</TableCell>}
              {day.conversionRate !== undefined && <TableCell className="text-right">{day.conversionRate?.toFixed(1)}%</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderTrendChart = () => {
    const dailyData = data.dailyData || [];
    
    return (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString()} 
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Line 
              type="monotone" 
              dataKey="views" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Views"
            />
            {data.clicks !== undefined && (
              <Line 
                type="monotone" 
                dataKey="clicks" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={2}
                name="Clicks"
              />
            )}
            {data.participants !== undefined && (
              <Line 
                type="monotone" 
                dataKey="participants" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                name="Participants"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderUserProfiles = () => {
    return (
      <div className="space-y-6">
        {/* Interest Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="w-5 h-5" />
              Interest Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userProfiles.demographics.interests.map((interest, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {interest.interest} ({interest.percentage}%)
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demographics by Region */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="w-5 h-5" />
              Regional Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userProfiles.demographics.regions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5" />
              Age Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userProfiles.demographics.ages.map((age, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{age.age}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${age.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground min-w-[40px]">
                      {age.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User2 className="w-5 h-5" />
              Gender Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userProfiles.demographics.genders.map((gender, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{gender.gender}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${gender.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground min-w-[40px]">
                      {gender.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Income Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="w-5 h-5" />
              Income Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userProfiles.demographics.incomes.map((income, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{income.income}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${income.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground min-w-[40px]">
                      {income.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Segments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5" />
              Top Performing Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Segment</TableHead>
                  <TableHead className="text-right">Engagement</TableHead>
                  <TableHead className="text-right">Conversion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userProfiles.topPerformingSegments.map((segment, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{segment.segment}</TableCell>
                    <TableCell className="text-right">{segment.engagement}</TableCell>
                    <TableCell className="text-right">{segment.conversion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[600px] sm:w-[800px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {componentName} - Detailed Analytics
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily-data">Daily Data</TabsTrigger>
              <TabsTrigger value="trends">Trend Charts</TabsTrigger>
              <TabsTrigger value="profiles">User Profiles</TabsTrigger>
            </TabsList>

            <TabsContent value="daily-data" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Performance Data</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderDailyDataTable()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderTrendChart()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profiles" className="mt-6">
              {renderUserProfiles()}
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};