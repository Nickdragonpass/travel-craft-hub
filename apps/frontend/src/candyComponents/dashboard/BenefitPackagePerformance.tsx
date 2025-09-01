import { useState } from "react";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Filter, Download } from "lucide-react";

interface BenefitPackageData {
  id: string;
  name: string;
  estimatedViews: number;
  actualViews: number;
  estimatedClaims: number;
  actualClaims: number;
  estimatedRedemptions: number;
  actualRedemptions: number;
  channel: string;
}

interface BenefitData {
  id: string;
  name: string;
  estimatedViews: number;
  actualViews: number;
  estimatedClaims: number;
  actualClaims: number;
  estimatedRedemptions: number;
  actualRedemptions: number;
}

// Generate dynamic data based on date range
const generateMockData = (dateRange: DateRange | undefined) => {
  const daysDiff = dateRange?.from && dateRange?.to 
    ? differenceInDays(dateRange.to, dateRange.from) 
    : 7;
  
  const multiplier = Math.max(0.5, Math.min(2.0, daysDiff / 7)); // Scale factor based on date range
  const variation = 0.8 + Math.random() * 0.4; // Add some randomness

  const mockData: BenefitPackageData[] = [
    {
      id: "1",
      name: "Premium Travel Benefits",
      estimatedViews: Math.floor(15000 * multiplier),
      actualViews: Math.floor(12800 * multiplier * variation),
      estimatedClaims: Math.floor(750 * multiplier),
      actualClaims: Math.floor(680 * multiplier * variation),
      estimatedRedemptions: Math.floor(450 * multiplier),
      actualRedemptions: Math.floor(520 * multiplier * variation),
      channel: "VISA"
    }
  ];

  const benefitMockData: BenefitData[] = [
    {
      id: "1",
      name: "Airport Lounge",
      estimatedViews: Math.floor(4500 * multiplier),
      actualViews: Math.floor(3800 * multiplier * variation),
      estimatedClaims: Math.floor(225 * multiplier),
      actualClaims: Math.floor(190 * multiplier * variation),
      estimatedRedemptions: Math.floor(135 * multiplier),
      actualRedemptions: Math.floor(152 * multiplier * variation)
    },
    {
      id: "2",
      name: "Fast Track",
      estimatedViews: Math.floor(3200 * multiplier),
      actualViews: Math.floor(2900 * multiplier * variation),
      estimatedClaims: Math.floor(160 * multiplier),
      actualClaims: Math.floor(145 * multiplier * variation),
      estimatedRedemptions: Math.floor(96 * multiplier),
      actualRedemptions: Math.floor(116 * multiplier * variation)
    },
    {
      id: "3",
      name: "Meet & Greet",
      estimatedViews: Math.floor(2800 * multiplier),
      actualViews: Math.floor(2400 * multiplier * variation),
      estimatedClaims: Math.floor(140 * multiplier),
      actualClaims: Math.floor(120 * multiplier * variation),
      estimatedRedemptions: Math.floor(84 * multiplier),
      actualRedemptions: Math.floor(96 * multiplier * variation)
    },
    {
      id: "4",
      name: "Airport Dining Set Meal",
      estimatedViews: Math.floor(2500 * multiplier),
      actualViews: Math.floor(2200 * multiplier * variation),
      estimatedClaims: Math.floor(125 * multiplier),
      actualClaims: Math.floor(110 * multiplier * variation),
      estimatedRedemptions: Math.floor(75 * multiplier),
      actualRedemptions: Math.floor(88 * multiplier * variation)
    },
    {
      id: "5",
      name: "Limo",
      estimatedViews: Math.floor(2000 * multiplier),
      actualViews: Math.floor(1500 * multiplier * variation),
      estimatedClaims: Math.floor(100 * multiplier),
      actualClaims: Math.floor(115 * multiplier * variation),
      estimatedRedemptions: Math.floor(60 * multiplier),
      actualRedemptions: Math.floor(68 * multiplier * variation)
    }
  ];

  return { mockData, benefitMockData };
};

interface BenefitPackagePerformanceProps {
  dateRange: DateRange | undefined;
}

export const BenefitPackagePerformance = ({ dateRange }: BenefitPackagePerformanceProps) => {
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [selectedChannel, setSelectedChannel] = useState<string>("");

  const { mockData, benefitMockData } = generateMockData(dateRange);

  const filteredData = mockData.filter(item => {
    if (selectedPackage && selectedPackage !== "all" && item.name !== selectedPackage) return false;
    if (selectedChannel && selectedChannel !== "all" && item.channel !== selectedChannel) return false;
    return true;
  });

  const getPerformanceColor = (estimated: number, actual: number) => {
    const ratio = actual / estimated;
    if (ratio >= 1.1) return "text-green-600";
    if (ratio >= 0.9) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Benefit Package Performance Tracking
        </CardTitle>
        <div className="flex gap-4 mt-4">
          <Select value={selectedPackage} onValueChange={setSelectedPackage}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filter by package name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Packages</SelectItem>
              {mockData.map(item => (
                <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedChannel} onValueChange={setSelectedChannel}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="VISA">VISA</SelectItem>
              <SelectItem value="Mastercard">Mastercard</SelectItem>
              <SelectItem value="SPD Bank">SPD Bank</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead className="text-primary-foreground">Package Name</TableHead>
                <TableHead className="text-primary-foreground">Channel</TableHead>
                <TableHead className="text-center text-primary-foreground">Views (Est/Act)</TableHead>
                <TableHead className="text-center text-primary-foreground">Claims (Est/Act)</TableHead>
                <TableHead className="text-center text-primary-foreground">Redemptions (Est/Act)</TableHead>
                <TableHead className="text-center text-primary-foreground">Conversion Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => {
                const conversionRate = ((item.actualRedemptions / item.actualViews) * 100).toFixed(2);
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.channel}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{item.estimatedViews.toLocaleString()}</div>
                        <div className={`font-medium ${getPerformanceColor(item.estimatedViews, item.actualViews)}`}>
                          {item.actualViews.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{item.estimatedClaims.toLocaleString()}</div>
                        <div className={`font-medium ${getPerformanceColor(item.estimatedClaims, item.actualClaims)}`}>
                          {item.actualClaims.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{item.estimatedRedemptions.toLocaleString()}</div>
                        <div className={`font-medium ${getPerformanceColor(item.estimatedRedemptions, item.actualRedemptions)}`}>
                          {item.actualRedemptions.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{conversionRate}%</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Individual Benefits List */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Individual Benefits Performance</h3>
          <div className="rounded-lg border">
            <Table>
              <TableHeader className="bg-primary">
                <TableRow>
                  <TableHead className="text-primary-foreground">Benefit Name</TableHead>
                  <TableHead className="text-center text-primary-foreground">Views (Est/Act)</TableHead>
                  <TableHead className="text-center text-primary-foreground">Claims (Est/Act)</TableHead>
                  <TableHead className="text-center text-primary-foreground">Redemptions (Est/Act)</TableHead>
                  <TableHead className="text-center text-primary-foreground">Conversion Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {benefitMockData.map((benefit) => {
                  const conversionRate = ((benefit.actualRedemptions / benefit.actualViews) * 100).toFixed(2);
                  return (
                    <TableRow key={benefit.id}>
                      <TableCell className="font-medium">{benefit.name}</TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">{benefit.estimatedViews.toLocaleString()}</div>
                          <div className={`font-medium ${getPerformanceColor(benefit.estimatedViews, benefit.actualViews)}`}>
                            {benefit.actualViews.toLocaleString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">{benefit.estimatedClaims.toLocaleString()}</div>
                          <div className={`font-medium ${getPerformanceColor(benefit.estimatedClaims, benefit.actualClaims)}`}>
                            {benefit.actualClaims.toLocaleString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">{benefit.estimatedRedemptions.toLocaleString()}</div>
                          <div className={`font-medium ${getPerformanceColor(benefit.estimatedRedemptions, benefit.actualRedemptions)}`}>
                            {benefit.actualRedemptions.toLocaleString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{conversionRate}%</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};