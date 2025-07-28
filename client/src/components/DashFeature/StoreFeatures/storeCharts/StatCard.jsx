// components/StatCard.js
import DashboardCard from "@/components/ui/dashboard-card";

import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  UserCheck, 
  Package, 
  TrendingUp 
} from "lucide-react";

export function StatCard() {
  
  const stats = [
    { title: "Total Revenue", description: "+15% this month", content: "₵5,000,000", icon: DollarSign },
    { title: "Sales", description: "+20% this month", content: "+20,000", icon: ShoppingCart },
    { title: "Users", description: "Total user", content: "15,000", icon: Users },
    { title: "Active Users", description: "30+ active now", content: "3000", icon: UserCheck },
    { title: "Orders", description: "+10% this month", content: "₵2,000,000", icon: Package },
    { title: "Profits", description: "+10% this month", content: "₵2,000,000", icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <DashboardCard
          key={index}
          title={stat.title}
          description={stat.description}
          icon={stat.icon}
        >
          <div className="text-xl">
            {stat.content}
          </div>

        </DashboardCard>
      ))}
    </div>
  );
}
