import { useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { BenefitPackagePerformance } from "./dashboard/BenefitPackagePerformance";
import { CampaignPageData } from "./dashboard/CampaignPageData";
import { DateRangePicker } from "./ui/date-range-picker";

const DataInsightsDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  return (
    <div className="bg-background space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Data Insights Dashboard</h1>
        
        {/* Date Range Picker */}
        <DateRangePicker 
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>

      {/* Benefit Package Performance Module */}
      <BenefitPackagePerformance dateRange={dateRange} />

      {/* Campaign Page Data Module */}
      <CampaignPageData dateRange={dateRange} />
    </div>
  );
};

export default DataInsightsDashboard;