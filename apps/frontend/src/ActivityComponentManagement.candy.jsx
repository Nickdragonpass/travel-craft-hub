import { useState } from "react";
import { Button } from "./candyComponents/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./candyComponents/ui/card";
import { Input } from "./candyComponents/ui/input";
import { Label } from "./candyComponents/ui/label";
import { Textarea } from "./candyComponents/ui/textarea";
import { Switch } from "./candyComponents/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./candyComponents/ui/select";
import { Checkbox } from "./candyComponents/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./candyComponents/ui/tabs";
import { Badge } from "./candyComponents/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./candyComponents/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./candyComponents/ui/alert-dialog";
import { 
  Image, 
  List, 
  Target, 
  CheckSquare, 
  TrendingUp, 
  Gamepad2, 
  Users, 
  Plus,
  Edit,
  Calendar,
  BarChart3,
  Settings,
  ExternalLink,
  Save,
  Trash2,
  X
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./candyComponents/ui/chart";
import { CampaignPageData } from "./candyComponents/dashboard/CampaignPageData";
import { ComponentDetailSidebar } from "./candyComponents/dashboard/ComponentDetailSidebar";


const components = [
  { id: "banner", name: "Banner", icon: Image, lastModified: "2024-01-15 10:30" },
  { id: "benefits-list", name: "Benefits List", icon: List, lastModified: "2024-01-14 15:20" },
  { id: "spending-rewards", name: "Spending Milestone Rewards", icon: Target, lastModified: "2024-01-13 09:45" },
  { id: "task-achievement", name: "Task Achievement", icon: CheckSquare, lastModified: "2024-01-12 14:10" },
  { id: "interest-recommendation", name: "Interest-Based Recommendation Sales", icon: TrendingUp, lastModified: "2024-01-11 11:25" },
  { id: "mini-game", name: "Mini-Game", icon: Gamepad2, lastModified: "2024-01-10 16:40" },
  { id: "community", name: "Community", icon: Users, lastModified: "2024-01-09 13:15" },
];

const availableComponents = [
  "Banner",
  "Benefits List", 
  "Spending Milestone Rewards",
  "Task Achievement",
  "Interest-Based Recommendation Sales",
  "Mini-Game",
  "Community"
];

// Mock products from local offers
const availableProducts = [
  {
    id: "sketch-dining",
    name: "Michelin Star Dining at Sketch",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    costPrice: 135,
    inventory: 50
  },
  {
    id: "harrods-shopping",
    name: "Premium Shopping at Harrods",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    costPrice: 400,
    inventory: 25
  },
  {
    id: "coffee-experience",
    name: "Artisan Coffee Experience",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
    costPrice: 20,
    inventory: 100
  },
  {
    id: "spa-wellness",
    name: "Luxury Spa & Wellness",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=300&fit=crop",
    costPrice: 245,
    inventory: 30
  },
  {
    id: "personal-training",
    name: "Personal Training Sessions",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    costPrice: 120,
    inventory: 40
  }
];

// Mock analytics data for dashboard
const getAnalyticsData = (startDate, endDate) => {
  // Generate dynamic data based on date range
  const daysDiff = Math.floor((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const multiplier = Math.max(0.5, Math.min(2, daysDiff / 30)); // Scale data based on date range
  
  return {
    banner: {
      views: Math.floor(125430 * multiplier),
      clicks: Math.floor(8970 * multiplier),
      conversionRate: 7.15 + (Math.random() - 0.5) * 2,
      dailyData: [
        { date: "2024-01-25", views: Math.floor(4200 * multiplier), clicks: Math.floor(290 * multiplier), conversionRate: 6.9 + (Math.random() - 0.5) },
        { date: "2024-01-26", views: Math.floor(4100 * multiplier), clicks: Math.floor(310 * multiplier), conversionRate: 7.6 + (Math.random() - 0.5) },
        { date: "2024-01-27", views: Math.floor(4300 * multiplier), clicks: Math.floor(280 * multiplier), conversionRate: 6.5 + (Math.random() - 0.5) },
        { date: "2024-01-28", views: Math.floor(4050 * multiplier), clicks: Math.floor(320 * multiplier), conversionRate: 7.9 + (Math.random() - 0.5) },
        { date: "2024-01-29", views: Math.floor(4150 * multiplier), clicks: Math.floor(295 * multiplier), conversionRate: 7.1 + (Math.random() - 0.5) },
        { date: "2024-01-30", views: Math.floor(4250 * multiplier), clicks: Math.floor(305 * multiplier), conversionRate: 7.2 + (Math.random() - 0.5) },
        { date: "2024-01-31", views: Math.floor(4100 * multiplier), clicks: Math.floor(285 * multiplier), conversionRate: 6.9 + (Math.random() - 0.5) }
      ]
    },
    "benefits-list": {
      views: Math.floor(98760 * multiplier),
      claims: Math.floor(12450 * multiplier),
      redemptions: Math.floor(8930 * multiplier),
      conversionRate: 9.04 + (Math.random() - 0.5) * 2,
      dailyData: [
        { date: "2024-01-25", views: Math.floor(3200 * multiplier), claims: Math.floor(410 * multiplier), redemptions: Math.floor(290 * multiplier), conversionRate: 9.1 + (Math.random() - 0.5) },
        { date: "2024-01-26", views: Math.floor(3150 * multiplier), claims: Math.floor(390 * multiplier), redemptions: Math.floor(285 * multiplier), conversionRate: 9.0 + (Math.random() - 0.5) },
        { date: "2024-01-27", views: Math.floor(3250 * multiplier), claims: Math.floor(420 * multiplier), redemptions: Math.floor(305 * multiplier), conversionRate: 9.4 + (Math.random() - 0.5) },
        { date: "2024-01-28", views: Math.floor(3100 * multiplier), claims: Math.floor(380 * multiplier), redemptions: Math.floor(270 * multiplier), conversionRate: 8.7 + (Math.random() - 0.5) },
        { date: "2024-01-29", views: Math.floor(3200 * multiplier), claims: Math.floor(405 * multiplier), redemptions: Math.floor(295 * multiplier), conversionRate: 9.2 + (Math.random() - 0.5) },
        { date: "2024-01-30", views: Math.floor(3180 * multiplier), claims: Math.floor(395 * multiplier), redemptions: Math.floor(285 * multiplier), conversionRate: 9.0 + (Math.random() - 0.5) },
        { date: "2024-01-31", views: Math.floor(3220 * multiplier), claims: Math.floor(410 * multiplier), redemptions: Math.floor(300 * multiplier), conversionRate: 9.3 + (Math.random() - 0.5) }
      ]
    },
    "spending-rewards": {
      views: Math.floor(76540 * multiplier),
      tier1Users: Math.floor(4560 * multiplier),
      tier2Users: Math.floor(2340 * multiplier),
      tier3Users: Math.floor(890 * multiplier),
      conversionRate: 10.26 + (Math.random() - 0.5) * 2,
      dailyData: [
        { date: "2024-01-25", views: Math.floor(2520 * multiplier), tier1Users: Math.floor(150 * multiplier), tier2Users: Math.floor(80 * multiplier), tier3Users: Math.floor(30 * multiplier), conversionRate: 10.3 + (Math.random() - 0.5) },
        { date: "2024-01-26", views: Math.floor(2480 * multiplier), tier1Users: Math.floor(145 * multiplier), tier2Users: Math.floor(75 * multiplier), tier3Users: Math.floor(25 * multiplier), conversionRate: 9.9 + (Math.random() - 0.5) },
        { date: "2024-01-27", views: Math.floor(2550 * multiplier), tier1Users: Math.floor(155 * multiplier), tier2Users: Math.floor(85 * multiplier), tier3Users: Math.floor(35 * multiplier), conversionRate: 10.8 + (Math.random() - 0.5) },
        { date: "2024-01-28", views: Math.floor(2420 * multiplier), tier1Users: Math.floor(140 * multiplier), tier2Users: Math.floor(70 * multiplier), tier3Users: Math.floor(28 * multiplier), conversionRate: 9.8 + (Math.random() - 0.5) },
        { date: "2024-01-29", views: Math.floor(2500 * multiplier), tier1Users: Math.floor(148 * multiplier), tier2Users: Math.floor(78 * multiplier), tier3Users: Math.floor(32 * multiplier), conversionRate: 10.3 + (Math.random() - 0.5) },
        { date: "2024-01-30", views: Math.floor(2530 * multiplier), tier1Users: Math.floor(152 * multiplier), tier2Users: Math.floor(82 * multiplier), tier3Users: Math.floor(33 * multiplier), conversionRate: 10.5 + (Math.random() - 0.5) },
        { date: "2024-01-31", views: Math.floor(2490 * multiplier), tier1Users: Math.floor(147 * multiplier), tier2Users: Math.floor(76 * multiplier), tier3Users: Math.floor(30 * multiplier), conversionRate: 10.2 + (Math.random() - 0.5) }
      ]
    },
    "task-achievement": {
      views: Math.floor(67890 * multiplier),
      task1Completions: Math.floor(3450 * multiplier),
      task2Completions: Math.floor(2870 * multiplier),
      conversionRate: 9.31 + (Math.random() - 0.5) * 2,
      dailyData: [
        { date: "2024-01-25", views: Math.floor(2250 * multiplier), task1Completions: Math.floor(115 * multiplier), task2Completions: Math.floor(95 * multiplier), conversionRate: 9.3 + (Math.random() - 0.5) },
        { date: "2024-01-26", views: Math.floor(2180 * multiplier), task1Completions: Math.floor(110 * multiplier), task2Completions: Math.floor(90 * multiplier), conversionRate: 9.2 + (Math.random() - 0.5) },
        { date: "2024-01-27", views: Math.floor(2280 * multiplier), task1Completions: Math.floor(120 * multiplier), task2Completions: Math.floor(100 * multiplier), conversionRate: 9.6 + (Math.random() - 0.5) },
        { date: "2024-01-28", views: Math.floor(2200 * multiplier), task1Completions: Math.floor(108 * multiplier), task2Completions: Math.floor(88 * multiplier), conversionRate: 8.9 + (Math.random() - 0.5) },
        { date: "2024-01-29", views: Math.floor(2240 * multiplier), task1Completions: Math.floor(112 * multiplier), task2Completions: Math.floor(92 * multiplier), conversionRate: 9.1 + (Math.random() - 0.5) },
        { date: "2024-01-30", views: Math.floor(2260 * multiplier), task1Completions: Math.floor(118 * multiplier), task2Completions: Math.floor(96 * multiplier), conversionRate: 9.5 + (Math.random() - 0.5) },
        { date: "2024-01-31", views: Math.floor(2220 * multiplier), task1Completions: Math.floor(114 * multiplier), task2Completions: Math.floor(94 * multiplier), conversionRate: 9.4 + (Math.random() - 0.5) }
      ]
    },
    "interest-recommendation": {
      views: Math.floor(89320 * multiplier),
      clicks: Math.floor(6540 * multiplier),
      purchases: Math.floor(1890 * multiplier),
      conversionRate: 2.12 + (Math.random() - 0.5) * 1,
      dailyData: [
        { date: "2024-01-25", views: Math.floor(2980 * multiplier), clicks: Math.floor(220 * multiplier), purchases: Math.floor(65 * multiplier), conversionRate: 2.2 + (Math.random() - 0.5) * 0.5 },
        { date: "2024-01-26", views: Math.floor(2920 * multiplier), clicks: Math.floor(210 * multiplier), purchases: Math.floor(60 * multiplier), conversionRate: 2.1 + (Math.random() - 0.5) * 0.5 },
        { date: "2024-01-27", views: Math.floor(3020 * multiplier), clicks: Math.floor(225 * multiplier), purchases: Math.floor(68 * multiplier), conversionRate: 2.2 + (Math.random() - 0.5) * 0.5 },
        { date: "2024-01-28", views: Math.floor(2880 * multiplier), clicks: Math.floor(205 * multiplier), purchases: Math.floor(58 * multiplier), conversionRate: 2.0 + (Math.random() - 0.5) * 0.5 },
        { date: "2024-01-29", views: Math.floor(2950 * multiplier), clicks: Math.floor(215 * multiplier), purchases: Math.floor(62 * multiplier), conversionRate: 2.1 + (Math.random() - 0.5) * 0.5 },
        { date: "2024-01-30", views: Math.floor(2980 * multiplier), clicks: Math.floor(220 * multiplier), purchases: Math.floor(66 * multiplier), conversionRate: 2.2 + (Math.random() - 0.5) * 0.5 },
        { date: "2024-01-31", views: Math.floor(2940 * multiplier), clicks: Math.floor(212 * multiplier), purchases: Math.floor(64 * multiplier), conversionRate: 2.2 + (Math.random() - 0.5) * 0.5 }
      ]
    },
    "mini-game": {
      views: Math.floor(45670 * multiplier),
      participants: Math.floor(12340 * multiplier),
      completions: Math.floor(8760 * multiplier),
      dailyData: [
        { date: "2024-01-25", views: Math.floor(1520 * multiplier), participants: Math.floor(410 * multiplier), completions: Math.floor(290 * multiplier) },
        { date: "2024-01-26", views: Math.floor(1480 * multiplier), participants: Math.floor(395 * multiplier), completions: Math.floor(285 * multiplier) },
        { date: "2024-01-27", views: Math.floor(1550 * multiplier), participants: Math.floor(420 * multiplier), completions: Math.floor(305 * multiplier) },
        { date: "2024-01-28", views: Math.floor(1420 * multiplier), participants: Math.floor(380 * multiplier), completions: Math.floor(270 * multiplier) },
        { date: "2024-01-29", views: Math.floor(1500 * multiplier), participants: Math.floor(405 * multiplier), completions: Math.floor(295 * multiplier) },
        { date: "2024-01-30", views: Math.floor(1530 * multiplier), participants: Math.floor(410 * multiplier), completions: Math.floor(300 * multiplier) },
        { date: "2024-01-31", views: Math.floor(1520 * multiplier), participants: Math.floor(400 * multiplier), completions: Math.floor(290 * multiplier) }
      ]
    },
    community: {
      views: Math.floor(34560 * multiplier),
      activeUsers: Math.floor(5670 * multiplier),
      conversionRate: 16.41 + (Math.random() - 0.5) * 2,
      dailyData: [
        { date: "2024-01-25", views: Math.floor(1150 * multiplier), activeUsers: Math.floor(190 * multiplier), conversionRate: 16.5 + (Math.random() - 0.5) },
        { date: "2024-01-26", views: Math.floor(1120 * multiplier), activeUsers: Math.floor(185 * multiplier), conversionRate: 16.5 + (Math.random() - 0.5) },
        { date: "2024-01-27", views: Math.floor(1180 * multiplier), activeUsers: Math.floor(195 * multiplier), conversionRate: 16.5 + (Math.random() - 0.5) },
        { date: "2024-01-28", views: Math.floor(1100 * multiplier), activeUsers: Math.floor(180 * multiplier), conversionRate: 16.4 + (Math.random() - 0.5) },
        { date: "2024-01-29", views: Math.floor(1140 * multiplier), activeUsers: Math.floor(188 * multiplier), conversionRate: 16.5 + (Math.random() - 0.5) },
        { date: "2024-01-30", views: Math.floor(1160 * multiplier), activeUsers: Math.floor(192 * multiplier), conversionRate: 16.6 + (Math.random() - 0.5) },
        { date: "2024-01-31", views: Math.floor(1130 * multiplier), activeUsers: Math.floor(186 * multiplier), conversionRate: 16.5 + (Math.random() - 0.5) }
      ]
    }
  };
};

const CampaignComponentManagement = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-31");
  const [detailSidebarOpen, setDetailSidebarOpen] = useState(false);
  const [selectedDetailComponent, setSelectedDetailComponent] = useState(null);
  
  // Add Component Dialog
  const [addComponentOpen, setAddComponentOpen] = useState(false);
  const [newComponentType, setNewComponentType] = useState("");
  
  // Interest Recommendation Products
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Tasks
  const [tasks, setTasks] = useState([
    { id: "1", name: "Complete Profile", description: "Add profile picture and personal", reward: "50 Points" },
    { id: "2", name: "First Purchase", description: "Make your first purchase to unlock the reward", reward: "100 Points" }
  ]);
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({ name: "", description: "", reward: "" });
  const [editingTask, setEditingTask] = useState(null);
  
  // Spending Tiers
  const [spendingTiers, setSpendingTiers] = useState([
    { id: "1", threshold: 1000, reward: "10% cashback" },
    { id: "2", threshold: 2500, reward: "15% cashback" },
    { id: "3", threshold: 5000, reward: "20% cashback" }
  ]);
  const [addTierOpen, setAddTierOpen] = useState(false);
  const [newTier, setNewTier] = useState({ threshold: 0, reward: "" });

  // Get dynamic analytics data based on selected date range
  const analyticsData = getAnalyticsData(startDate, endDate);

  // Handler functions
  const handleAddComponent = () => {
    if (newComponentType) {
      // Create new component object
      const newComponent = {
        id: newComponentType.toLowerCase().replace(/\s+/g, '-'),
        name: newComponentType,
        icon: getComponentIcon(newComponentType),
        lastModified: new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      
      // Add to components list (normally would update state)
      setAddComponentOpen(false);
      setNewComponentType("");
    }
  };

  const getComponentIcon = (componentType) => {
    switch (componentType) {
      case "Banner": return Image;
      case "Benefits List": return List;
      case "Spending Milestone Rewards": return Target;
      case "Task Achievement": return CheckSquare;
      case "Interest-Based Recommendation Sales": return TrendingUp;
      case "Mini-Game": return Gamepad2;
      case "Community": return Users;
      default: return Settings;
    }
  };

  const handleAddProduct = (productId) => {
    const product = availableProducts.find(p => p.id === productId);
    if (product && !selectedProducts.find(p => p.id === productId)) {
      setSelectedProducts([...selectedProducts, { ...product, price: product.costPrice }]);
    }
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const handleUpdateProductPrice = (productId, price) => {
    setSelectedProducts(selectedProducts.map(p => 
      p.id === productId ? { ...p, price } : p
    ));
  };

  const handleAddTask = () => {
    if (newTask.name && newTask.description && newTask.reward) {
      const id = (tasks.length + 1).toString();
      setTasks([...tasks, { ...newTask, id }]);
      setNewTask({ name: "", description: "", reward: "" });
      setAddTaskOpen(false);
    }
  };

  const handleEditTask = (id, updatedTask) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updatedTask } : t));
    setEditingTask(null);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAddTier = () => {
    if (newTier.threshold && newTier.reward) {
      const id = (spendingTiers.length + 1).toString();
      setSpendingTiers([...spendingTiers, { ...newTier, id }]);
      setNewTier({ threshold: 0, reward: "" });
      setAddTierOpen(false);
    }
  };

  const renderConfigPanel = () => {
    if (!selectedComponent) {
      return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          Select a component to configure
        </div>
      );
    }

    switch (selectedComponent) {
      case "banner":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="banner-image">Banner Image</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Image className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
              </div>
            </div>
            <div>
              <Label htmlFor="redirect-link">Redirect Link</Label>
              <Input id="redirect-link" placeholder="https://example.com" className="mt-1" />
            </div>
          </div>
        );

      case "benefits-list":
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Fixed Benefits</Label>
              <p className="text-sm text-muted-foreground">Select a single benefit package to display</p>
              <Select>
                <SelectTrigger className="mt-2 bg-background border-input">
                  <SelectValue placeholder="Select benefit package" />
                </SelectTrigger>
                <SelectContent className="bg-background border-input shadow-lg z-50">
                  <SelectItem value="premium">Premium Package</SelectItem>
                  <SelectItem value="standard">Standard Package</SelectItem>
                  <SelectItem value="basic">Basic Package</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base font-medium">Dynamic Benefits</Label>
              <p className="text-sm text-muted-foreground">Select multiple packages for dynamic display</p>
              <div className="mt-2 space-y-2">
                {["Premium Package", "Standard Package", "Basic Package", "Family Package"].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={item} />
                    <Label htmlFor={item}>{item}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "spending-rewards":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Spending Tiers Configuration</Label>
              <Dialog open={addTierOpen} onOpenChange={setAddTierOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Tier
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Spending Tier</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="new-threshold">Spending Threshold ($)</Label>
                      <Input 
                        id="new-threshold" 
                        type="number" 
                        value={newTier.threshold || ""} 
                        onChange={(e) => setNewTier({ ...newTier, threshold: Number(e.target.value) })}
                        placeholder="1000" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-tier-reward">Reward</Label>
                      <Input 
                        id="new-tier-reward" 
                        value={newTier.reward} 
                        onChange={(e) => setNewTier({ ...newTier, reward: e.target.value })}
                        placeholder="10% cashback" 
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddTier}>Save</Button>
                      <Button variant="outline" onClick={() => setAddTierOpen(false)}>Close</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {spendingTiers.map((tier) => (
              <Card key={tier.id} className="rounded-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Tier {tier.id}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Spending Threshold: ${tier.threshold}</Label>
                  </div>
                  <div>
                    <Label>Reward: {tier.reward}</Label>
                  </div>
                   <div className="flex gap-2">
                     <Button size="sm" variant="outline">
                       <Edit className="h-4 w-4 mr-1" />
                       Edit
                     </Button>
                     <AlertDialog>
                       <AlertDialogTrigger asChild>
                         <Button size="sm" variant="destructive">
                           <Trash2 className="h-4 w-4 mr-1" />
                           Delete
                         </Button>
                       </AlertDialogTrigger>
                       <AlertDialogContent>
                         <AlertDialogHeader>
                           <AlertDialogTitle>Delete Spending Tier</AlertDialogTitle>
                           <AlertDialogDescription>
                             Are you sure you want to delete this spending tier? This action cannot be undone and will affect all users currently in this tier.
                           </AlertDialogDescription>
                         </AlertDialogHeader>
                         <AlertDialogFooter>
                           <AlertDialogCancel>Cancel</AlertDialogCancel>
                           <AlertDialogAction 
                             onClick={() => setSpendingTiers(spendingTiers.filter(t => t.id !== tier.id))}
                             className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                           >
                             Delete
                           </AlertDialogAction>
                         </AlertDialogFooter>
                       </AlertDialogContent>
                     </AlertDialog>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "task-achievement":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Tasks Configuration</Label>
              <Dialog open={addTaskOpen} onOpenChange={setAddTaskOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="task-name">Task Name</Label>
                      <Input 
                        id="task-name" 
                        value={newTask.name} 
                        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                        placeholder="Complete Profile" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="task-desc">Description</Label>
                      <Textarea 
                        id="task-desc" 
                        value={newTask.description} 
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        placeholder="Add profile picture and personal details" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="task-reward">Reward</Label>
                      <Input 
                        id="task-reward" 
                        value={newTask.reward} 
                        onChange={(e) => setNewTask({ ...newTask, reward: e.target.value })}
                        placeholder="50 Points" 
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddTask}>Save</Button>
                      <Button variant="outline" onClick={() => setAddTaskOpen(false)}>Close</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {tasks.map((task) => (
              <Card key={task.id} className="rounded-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Task {task.id}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Name: {task.name}</Label>
                  </div>
                  <div>
                    <Label>Description: {task.description}</Label>
                  </div>
                  <div>
                    <Label>Reward: {task.reward}</Label>
                  </div>
                   <div className="flex gap-2">
                     <Button 
                       size="sm" 
                       variant="outline" 
                       onClick={() => setEditingTask(task.id)}
                     >
                       <Edit className="h-4 w-4 mr-1" />
                       Edit
                     </Button>
                     <AlertDialog>
                       <AlertDialogTrigger asChild>
                         <Button size="sm" variant="destructive">
                           <Trash2 className="h-4 w-4 mr-1" />
                           Delete
                         </Button>
                       </AlertDialogTrigger>
                       <AlertDialogContent>
                         <AlertDialogHeader>
                           <AlertDialogTitle>Delete Task</AlertDialogTitle>
                           <AlertDialogDescription>
                             Are you sure you want to delete "{task.name}"? This action cannot be undone and will remove this task from all users' achievement lists.
                           </AlertDialogDescription>
                         </AlertDialogHeader>
                         <AlertDialogFooter>
                           <AlertDialogCancel>Cancel</AlertDialogCancel>
                           <AlertDialogAction 
                             onClick={() => handleDeleteTask(task.id)}
                             className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                           >
                             Delete
                           </AlertDialogAction>
                         </AlertDialogFooter>
                       </AlertDialogContent>
                     </AlertDialog>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "interest-recommendation":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Configure Interest-Based Recommendation Sales</Label>
               <Select onValueChange={handleAddProduct}>
                 <SelectTrigger className="w-48 bg-background border-input">
                   <SelectValue placeholder="Add Product" />
                 </SelectTrigger>
                 <SelectContent className="bg-background border-input shadow-lg z-50">
                  {availableProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedProducts.length > 0 && (
              <div className="space-y-4">
                <Label className="text-base font-medium">Selected Products</Label>
                {selectedProducts.map((product) => (
                  <Card key={product.id} className="rounded-lg">
                    <CardContent className="p-4">
                       <div className="flex items-start gap-4">
                         <img 
                           src={product.image} 
                           alt={product.name} 
                           className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                         />
                         <div className="flex-1 min-w-0">
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                             <div className="space-y-1">
                               <Label className="text-xs text-muted-foreground">Product Name</Label>
                               <p className="text-sm font-medium truncate">{product.name}</p>
                             </div>
                             <div className="space-y-1">
                               <Label className="text-xs text-muted-foreground">Cost Price</Label>
                               <p className="text-sm">${product.costPrice}</p>
                             </div>
                             <div className="space-y-1">
                               <Label className="text-xs text-muted-foreground">Stock</Label>
                               <p className="text-sm">{product.inventory}</p>
                             </div>
                             <div className="space-y-1">
                               <Label className="text-xs text-muted-foreground">Selling Price</Label>
                               {editingProduct === product.id ? (
                                 <Input
                                   type="number"
                                   value={product.price || ""}
                                   onChange={(e) => handleUpdateProductPrice(product.id, Number(e.target.value))}
                                   className="h-8 text-sm"
                                   placeholder="Enter price"
                                 />
                               ) : (
                                 <p className="text-sm font-medium">${product.price || 'Not set'}</p>
                               )}
                             </div>
                           </div>
                         </div>
                         <div className="flex flex-col gap-2 flex-shrink-0">
                           {editingProduct === product.id ? (
                             <>
                               <Button 
                                 size="sm" 
                                 onClick={() => setEditingProduct(null)}
                                 className="w-20"
                               >
                                 <Save className="h-4 w-4 mr-1" />
                                 Save
                               </Button>
                               <Button 
                                 size="sm" 
                                 variant="outline"
                                 onClick={() => setEditingProduct(null)}
                                 className="w-20"
                               >
                                 <X className="h-4 w-4 mr-1" />
                                 Cancel
                               </Button>
                             </>
                           ) : (
                             <Button 
                               size="sm" 
                               variant="outline"
                               onClick={() => setEditingProduct(product.id)}
                               className="w-20"
                             >
                               <Edit className="h-4 w-4 mr-1" />
                               Edit
                             </Button>
                           )}
                           <AlertDialog>
                             <AlertDialogTrigger asChild>
                               <Button size="sm" variant="outline" className="w-20">
                                 <Trash2 className="h-4 w-4 mr-1" />
                                 Delete
                               </Button>
                             </AlertDialogTrigger>
                             <AlertDialogContent>
                               <AlertDialogHeader>
                                 <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                                 <AlertDialogDescription>
                                   Are you sure you want to remove "{product.name}" from the recommendations? This action cannot be undone.
                                 </AlertDialogDescription>
                               </AlertDialogHeader>
                               <AlertDialogFooter>
                                 <AlertDialogCancel>Cancel</AlertDialogCancel>
                                 <AlertDialogAction onClick={() => handleRemoveProduct(product.id)}>
                                   Delete
                                 </AlertDialogAction>
                               </AlertDialogFooter>
                             </AlertDialogContent>
                           </AlertDialog>
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case "mini-game":
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Available Games</Label>
              <Select>
                <SelectTrigger className="mt-2 bg-background border-input">
                  <SelectValue placeholder="Select a mini-game" />
                </SelectTrigger>
                <SelectContent className="bg-background border-input shadow-lg z-50">
                  <SelectItem value="spin-wheel">Spin the Wheel</SelectItem>
                  <SelectItem value="scratch-card">Scratch Card</SelectItem>
                  <SelectItem value="memory-game">Memory Game</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="game-objective">Game Objective</Label>
              <Textarea id="game-objective" placeholder="Complete the challenge to win rewards" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="game-reward">Rewards</Label>
              <Input id="game-reward" placeholder="100 bonus points" className="mt-1" />
            </div>
          </div>
        );

      case "community":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="community-theme">Community Theme</Label>
              <Input id="community-theme" placeholder="Lifestyle & Wellness" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="community-intro">Community Introduction</Label>
              <Textarea 
                id="community-intro" 
                placeholder="Join our vibrant community of like-minded individuals..."
                className="mt-1"
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Time Period Filter */}
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Time Period Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Page Data */}
      <CampaignPageData dateRange={{ from: new Date(startDate), to: new Date(endDate) }} />

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Banner Analytics */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Banner
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => {
                  setSelectedDetailComponent("banner");
                  setDetailSidebarOpen(true);
                }}
              >
                Detail
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{analyticsData.banner.views.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Views</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{analyticsData.banner.clicks.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Clicks</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{analyticsData.banner.conversionRate.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Avg Conversion</div>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.banner.dailyData}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => new Date(value).getDate().toString()}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value, name) => [
                      typeof value === 'number' ? value.toLocaleString() : value,
                      name === 'views' ? 'Views' : 
                      name === 'clicks' ? 'Clicks' :
                      name === 'conversionRate' ? 'Conversion Rate (%)' : name
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Benefits List Analytics */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <List className="h-4 w-4" />
                Benefits List
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => {
                  setSelectedDetailComponent("benefits-list");
                  setDetailSidebarOpen(true);
                }}
              >
                Detail
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xl font-bold">{analyticsData["benefits-list"].views.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Views</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData["benefits-list"].claims.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Claims</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData["benefits-list"].redemptions.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Redemptions</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData["benefits-list"].conversionRate.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Avg Conversion</div>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData["benefits-list"].dailyData}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => new Date(value).getDate().toString()}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value, name) => [
                      typeof value === 'number' ? value.toLocaleString() : value,
                      name === 'views' ? 'Views' : 
                      name === 'claims' ? 'Claims' :
                      name === 'redemptions' ? 'Redemptions' :
                      name === 'conversionRate' ? 'Conversion Rate (%)' : name
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="claims" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="redemptions" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Spending Rewards Analytics */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Spending Rewards
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => {
                  setSelectedDetailComponent("spending-rewards");
                  setDetailSidebarOpen(true);
                }}
              >
                Detail
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xl font-bold">{analyticsData["spending-rewards"].views.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Views</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData["spending-rewards"].tier1Users.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Tier 1 Users</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData["spending-rewards"].tier2Users.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Tier 2 Users</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData["spending-rewards"].conversionRate.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Avg Conversion</div>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData["spending-rewards"].dailyData}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => new Date(value).getDate().toString()}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value, name) => [
                      typeof value === 'number' ? value.toLocaleString() : value,
                      name === 'tier1Users' ? 'Tier 1 Users' : 
                      name === 'tier2Users' ? 'Tier 2 Users' :
                      name === 'tier3Users' ? 'Tier 3 Users' :
                      name === 'conversionRate' ? 'Conversion Rate (%)' : name
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="tier1Users" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="tier2Users" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Task Achievement Analytics */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Task Achievement
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => {
                  setSelectedDetailComponent("task-achievement");
                  setDetailSidebarOpen(true);
                }}
              >
                Detail
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xl font-bold">{analyticsData["task-achievement"].views.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Views</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData["task-achievement"].task1Completions.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Task 1 Completions</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData["task-achievement"].task2Completions.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Task 2 Completions</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData["task-achievement"].conversionRate.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Avg Conversion</div>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData["task-achievement"].dailyData}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => new Date(value).getDate().toString()}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value, name) => [
                      typeof value === 'number' ? value.toLocaleString() : value,
                      name === 'task1Completions' ? 'Task 1 Completions' : 
                      name === 'task2Completions' ? 'Task 2 Completions' :
                      name === 'conversionRate' ? 'Conversion Rate (%)' : name
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="task1Completions" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="task2Completions" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Interest Recommendation Analytics */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Interest Recommendation
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => {
                  setSelectedDetailComponent("interest-recommendation");
                  setDetailSidebarOpen(true);
                }}
              >
                Detail
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xl font-bold">{analyticsData["interest-recommendation"].views.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Views</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData["interest-recommendation"].clicks.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Clicks</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData["interest-recommendation"].purchases.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Purchases</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData["interest-recommendation"].conversionRate.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Avg Conversion</div>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData["interest-recommendation"].dailyData}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => new Date(value).getDate().toString()}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value, name) => [
                      typeof value === 'number' ? value.toLocaleString() : value,
                      name === 'views' ? 'Views' : 
                      name === 'clicks' ? 'Clicks' :
                      name === 'purchases' ? 'Purchases' :
                      name === 'conversionRate' ? 'Conversion Rate (%)' : name
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="purchases" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Mini-Game Analytics */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                Mini-Game
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => {
                  setSelectedDetailComponent("mini-game");
                  setDetailSidebarOpen(true);
                }}
              >
                Detail
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold">{analyticsData["mini-game"].views.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Views</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData["mini-game"].participants.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Participants</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData["mini-game"].completions.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Completions</div>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData["mini-game"].dailyData}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => new Date(value).getDate().toString()}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value, name) => [
                      typeof value === 'number' ? value.toLocaleString() : value,
                      name === 'views' ? 'Views' : 
                      name === 'participants' ? 'Participants' :
                      name === 'completions' ? 'Completions' : name
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="participants" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completions" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Community Analytics */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Community
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => {
                  setSelectedDetailComponent("community");
                  setDetailSidebarOpen(true);
                }}
              >
                Detail
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold">{analyticsData.community.views.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Views</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData.community.activeUsers.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Active Users</div>
              </div>
              <div>
                <div className="text-xl font-bold">{analyticsData.community.conversionRate.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Avg Conversion</div>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.community.dailyData}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => new Date(value).getDate().toString()}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value, name) => [
                      typeof value === 'number' ? value.toLocaleString() : value,
                      name === 'views' ? 'Views' : 
                      name === 'activeUsers' ? 'Active Users' :
                      name === 'conversionRate' ? 'Conversion Rate (%)' : name
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="activeUsers" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversionRate" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="w-full flex-1 p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Campaign Component Management</h1>
          <p className="text-muted-foreground">Manage and configure campaign components</p>
        </div>

        <Tabs defaultValue="management" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="management" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Management
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="management" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Component List */}
              <div className="lg:col-span-1">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Components</h2>
                    <Dialog open={addComponentOpen} onOpenChange={setAddComponentOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Component
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Component</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="component-type">Select Component Type</Label>
                             <Select value={newComponentType} onValueChange={setNewComponentType}>
                               <SelectTrigger className="bg-background border-input">
                                 <SelectValue placeholder="Choose a component type" />
                               </SelectTrigger>
                               <SelectContent className="bg-background border-input shadow-lg z-50">
                                {availableComponents.map((component) => (
                                  <SelectItem key={component} value={component}>
                                    {component}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleAddComponent}>Save</Button>
                            <Button variant="outline" onClick={() => setAddComponentOpen(false)}>Cancel</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="space-y-2">
                    {components.map((component) => (
                      <Card 
                        key={component.id} 
                        className={`rounded-lg cursor-pointer transition-colors ${
                          selectedComponent === component.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedComponent(component.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <component.icon className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium text-sm">{component.name}</p>
                                <p className="text-xs text-muted-foreground">{component.lastModified}</p>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedComponent(component.id);
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Configuration Panel */}
              <div className="lg:col-span-2">
                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle>
                      {selectedComponent 
                        ? `Configure ${components.find(c => c.id === selectedComponent)?.name}`
                        : 'Component Configuration'
                      }
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderConfigPanel()}
                    {selectedComponent && (
                      <div className="flex justify-end space-x-2 mt-6 pt-6 border-t">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-4">
            {renderDashboard()}
          </TabsContent>
        </Tabs>

        {/* Detail Sidebar */}
        <ComponentDetailSidebar
          isOpen={detailSidebarOpen}
          onClose={() => setDetailSidebarOpen(false)}
          componentId={selectedDetailComponent}
          componentName={selectedDetailComponent ? components.find(c => c.id === selectedDetailComponent)?.name || "" : ""}
          data={selectedDetailComponent ? analyticsData[selectedDetailComponent] : null}
        />
      </div>
    </div>
  );
};

export default CampaignComponentManagement;