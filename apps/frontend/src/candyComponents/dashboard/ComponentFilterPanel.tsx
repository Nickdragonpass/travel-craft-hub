import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ComponentFilterPanelProps {
  filters: {
    userSegment: string;
    targetRegion: string;
    targetChannel: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const ComponentFilterPanel = ({ filters, onFiltersChange }: ComponentFilterPanelProps) => {
  const userSegmentOptions = ["Frequent Traveller", "Pet Owner", "Youth", "Food Lover", "Entrepreneur"];
  const targetRegionOptions = ["UK", "North Asia", "Latin America", "Middle East"];
  const targetChannelOptions = ["Visa", "Master Card", "SPDB"];

  const updateFilter = (filterKey: string, value: string) => {
    onFiltersChange({
      ...filters,
      [filterKey]: value
    });
  };

  return (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-4">
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">User Segment</label>
          <Select
            value={filters.userSegment}
            onValueChange={(value) => updateFilter('userSegment', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select user segment" />
            </SelectTrigger>
            <SelectContent>
              {userSegmentOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Target Region</label>
          <Select
            value={filters.targetRegion}
            onValueChange={(value) => updateFilter('targetRegion', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select target region" />
            </SelectTrigger>
            <SelectContent>
              {targetRegionOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Target Channel</label>
          <Select
            value={filters.targetChannel}
            onValueChange={(value) => updateFilter('targetChannel', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select target channel" />
            </SelectTrigger>
            <SelectContent>
              {targetChannelOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};