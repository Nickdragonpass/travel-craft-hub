import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";

const packageData = [
  {
    name: "Premium Benefits Pack",
    items: ["Wellness Check x3", "Video Consultation x4", "Professional Consultation x5"],
    purchaseVolume: "50,000",
    redemptionVolume: "30,013", 
    grossProfit: "23%",
    rating: 4
  },
  {
    name: "Elite Service Pack",
    items: ["Wellness Check x3", "Video Consultation x4", "Professional Consultation x5"],
    purchaseVolume: "60,000",
    redemptionVolume: "31,021",
    grossProfit: "35%", 
    rating: 4
  },
  {
    name: "Comprehensive Benefits",
    items: ["Wellness Check x3", "Video Consultation x4", "Professional Consultation x5"],
    purchaseVolume: "30,000",
    redemptionVolume: "16,241",
    grossProfit: "30%",
    rating: 3
  }
];

export const BestPerformingPackages = () => {
  return (
    <Card className="h-full">
      <CardHeader className="bg-white">
        <CardTitle className="text-lg flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Popular Packages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {packageData.map((pkg, index) => (
            <div key={index} className={`relative rounded-lg p-4 border-2 ${
              index === 0 ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200' :
              index === 1 ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' :
              'bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200'
            }`}>
              {index === 0 && (
                <div className="absolute -top-2 left-4">
                  <Badge className="bg-yellow-500 text-white text-xs">🏆 #1 Seller</Badge>
                </div>
              )}
              
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-slate-800">{pkg.name}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={`w-4 h-4 ${
                        starIndex < pkg.rating 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="space-y-1">
                  <div className="text-xs text-slate-500">Services Included:</div>
                  <div className="text-xs text-slate-700">
                    {pkg.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Purchase Vol.</span>
                    <span className="font-semibold text-slate-700">{pkg.purchaseVolume}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Redemption</span>
                    <span className="font-semibold text-slate-700">{pkg.redemptionVolume}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Profit Margin</span>
                    <Badge variant="outline" className={`text-xs ${
                      parseInt(pkg.grossProfit) > 30 ? 'bg-green-50 text-green-700 border-green-200' :
                      parseInt(pkg.grossProfit) > 25 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      {pkg.grossProfit}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};