import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./candyComponents/ui/tabs";
import EntitlementDashboard from "./candyComponents/EntitlementDashboard";
import DataInsightsDashboard from "./candyComponents/DataInsightsDashboard";
import './candy.css'

const Index = () => {
    const [activeTab, setActiveTab] = useState("entitlement");

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="entitlement">Entitlement Design</TabsTrigger>
                <TabsTrigger value="dashboard">Data Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="entitlement" className="space-y-4">
                <EntitlementDashboard />
            </TabsContent>

            <TabsContent value="dashboard" className="space-y-4">
                <DataInsightsDashboard />
            </TabsContent>
        </Tabs>
    );
};

export default Index;
