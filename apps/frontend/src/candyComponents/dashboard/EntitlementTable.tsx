import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { FilterPanel } from "./FilterPanel";

interface EntitlementItem {
  id: string;
  name: string;
  times: number;
  cost: number;
  redemptionRate: number;
  timesUsed: number;
  retailPrice: number;
  historicalOrders: number;
}

const entitlementData: EntitlementItem[] = [
  {
    id: "1",
    name: "Family Consultation Service",
    times: 1,
    cost: 20,
    redemptionRate: 10.21,
    timesUsed: 0.10,
    retailPrice: 50,
    historicalOrders: 520
  },
  {
    id: "2", 
    name: "Wellness Check Service",
    times: 1,
    cost: 60,
    redemptionRate: 80.01,
    timesUsed: 0.60,
    retailPrice: 80,
    historicalOrders: 10210
  },
  {
    id: "3",
    name: "Free Registration Service",
    times: 2,
    cost: 2,
    redemptionRate: 60.22,
    timesUsed: 1.24,
    retailPrice: 5,
    historicalOrders: 8001
  },
  {
    id: "4",
    name: "Video Consultation Service", 
    times: 2,
    cost: 5,
    redemptionRate: 70.03,
    timesUsed: 1.42,
    retailPrice: 10,
    historicalOrders: 10622
  },
  {
    id: "5",
    name: "Professional Consultation",
    times: 2,
    cost: 20,
    redemptionRate: 82.29,
    timesUsed: 1.64,
    retailPrice: 25,
    historicalOrders: 12290
  },
  {
    id: "6",
    name: "Premium Care Service",
    times: 2,
    cost: 30,
    redemptionRate: 52.00,
    timesUsed: 1.04,
    retailPrice: 49,
    historicalOrders: 17030
  },
  {
    id: "7",
    name: "Diagnostic Screening",
    times: 1,
    cost: 45,
    redemptionRate: 75.15,
    timesUsed: 0.85,
    retailPrice: 75,
    historicalOrders: 8950
  },
  {
    id: "8",
    name: "Specialist Referral Service",
    times: 1,
    cost: 15,
    redemptionRate: 65.40,
    timesUsed: 0.95,
    retailPrice: 35,
    historicalOrders: 6780
  },
  {
    id: "9",
    name: "Emergency Consultation",
    times: 1,
    cost: 80,
    redemptionRate: 45.30,
    timesUsed: 0.30,
    retailPrice: 120,
    historicalOrders: 3420
  },
  {
    id: "10",
    name: "Preventive Care Package",
    times: 3,
    cost: 25,
    redemptionRate: 88.75,
    timesUsed: 2.40,
    retailPrice: 60,
    historicalOrders: 15670
  },
  {
    id: "11",
    name: "Lab Work Authorization",
    times: 2,
    cost: 35,
    redemptionRate: 72.80,
    timesUsed: 1.80,
    retailPrice: 65,
    historicalOrders: 11230
  },
  {
    id: "12",
    name: "Follow-up Care Service",
    times: 3,
    cost: 18,
    redemptionRate: 68.50,
    timesUsed: 1.95,
    retailPrice: 40,
    historicalOrders: 9850
  },
  {
    id: "13",
    name: "Medication Consultation",
    times: 2,
    cost: 12,
    redemptionRate: 78.90,
    timesUsed: 1.55,
    retailPrice: 28,
    historicalOrders: 13450
  },
  {
    id: "14",
    name: "Rehabilitation Services",
    times: 5,
    cost: 40,
    redemptionRate: 55.25,
    timesUsed: 2.80,
    retailPrice: 85,
    historicalOrders: 7890
  },
  {
    id: "15",
    name: "Nutrition Counseling",
    times: 2,
    cost: 22,
    redemptionRate: 63.45,
    timesUsed: 1.25,
    retailPrice: 45,
    historicalOrders: 5670
  },
  {
    id: "16",
    name: "Mental Wellness Support",
    times: 4,
    cost: 35,
    redemptionRate: 71.60,
    timesUsed: 2.85,
    retailPrice: 70,
    historicalOrders: 8920
  },
  {
    id: "17",
    name: "Annual Check-up Service",
    times: 1,
    cost: 55,
    redemptionRate: 85.30,
    timesUsed: 0.95,
    retailPrice: 95,
    historicalOrders: 12780
  },
  {
    id: "18",
    name: "Chronic Care Management",
    times: 6,
    cost: 28,
    redemptionRate: 90.15,
    timesUsed: 4.20,
    retailPrice: 55,
    historicalOrders: 16890
  }
];

interface EntitlementTableProps {
  selectedEntitlements: string[];
  onSelectionChange: (selected: string[]) => void;
  filters: any;
  onFiltersChange: (filters: any) => void;
}

export const EntitlementTable = ({ selectedEntitlements, onSelectionChange, filters, onFiltersChange }: EntitlementTableProps) => {
  const handleSelectEntitlement = (entitlementId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedEntitlements, entitlementId]);
    } else {
      onSelectionChange(selectedEntitlements.filter(id => id !== entitlementId));
    }
  };

  // Check if any filter has content
  const hasActiveFilters = filters.userSegment || filters.targetRegion || filters.targetChannel || filters.targetPricing;

  return (
    <div className="space-y-6">
      {/* Filter Panel integrated into the module */}
      <div className="mb-4">
        <FilterPanel filters={filters} onFiltersChange={onFiltersChange} />
      </div>

      {/* Entitlements Table */}
      <div className="rounded-lg border shadow-sm h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10">
              <TableRow className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-700 hover:to-slate-800">
                <TableHead className="text-white w-12"></TableHead>
                <TableHead className="text-white font-semibold">Service Name</TableHead>
                <TableHead className="text-white font-semibold">Frequency</TableHead>
                <TableHead className="text-white font-semibold">Cost ($)</TableHead>
                <TableHead className="text-white font-semibold">Redemption Rate</TableHead>
                <TableHead className="text-white font-semibold">Usage Rate</TableHead>
                <TableHead className="text-white font-semibold">Market Price</TableHead>
                <TableHead className="text-white font-semibold">Order Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hasActiveFilters ? entitlementData.map((item, index) => (
                <TableRow 
                  key={item.id} 
                  className={`hover:bg-slate-50 transition-colors ${
                    selectedEntitlements.includes(item.id) ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedEntitlements.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectEntitlement(item.id, checked as boolean)}
                      className="border-slate-400"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-slate-800">{item.name}</TableCell>
                  <TableCell className="text-slate-600">{item.times}x</TableCell>
                  <TableCell className="text-slate-600 font-medium">${item.cost}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${
                      item.redemptionRate > 70 ? 'bg-green-50 text-green-700 border-green-200' :
                      item.redemptionRate > 50 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {item.redemptionRate}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{item.timesUsed}</TableCell>
                  <TableCell className="text-slate-600 font-medium">${item.retailPrice}</TableCell>
                  <TableCell>
                    <span className="text-blue-600 font-semibold">
                      {item.historicalOrders.toLocaleString()}
                    </span>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-20 text-slate-500">
                    Please select filter criteria to view available services
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Fixed footer for selection count */}
        <div className="border-t bg-gray-50 px-4 py-3 flex justify-end items-center">
          <div className="text-sm text-slate-500">
            {selectedEntitlements.length} services selected
          </div>
        </div>
      </div>
    </div>
  );
};