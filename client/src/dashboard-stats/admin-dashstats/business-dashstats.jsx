// components/StatCard.js
import DashboardCard from "@/components/ui/dashboard-card";
import Spinner from "@/components/ui/spinner";
import backendUrl from "@/lib/backendUrl";
import { useQuery } from "@tanstack/react-query";

import {
  DollarSign,
  ShoppingCart,
  Users,
  UserCheck,
  Package,
  TrendingUp,
  Store,
  House,
  Book,
  HousePlus,
} from "lucide-react";

const fetchBusinessStats = async () => {
  const res = await backendUrl.get("/admin/dashstats/business-stats");
  // console.log("Main Sats", res.data);

  return {
    totalStores: res?.data?.result?.totalStores || 0,
    recentStoresCount: res?.data?.result?.recentStoresCount || 0.0,
  };
};

export function BusinessStats() {
  const { data: dashstat, isLoading } = useQuery({
    queryKey: ["dash"],
    queryFn: fetchBusinessStats,
  });

  //   if (isLoading) {
  //     <div>
  //       <Spinner />
  //     </div>;
  //   }

  const stats = [
    {
      title: "Total Stores",
      description: "Available stores",
      content: dashstat?.totalStores || 0,
      icon: Store,
    },

    {
      title: "Recent Stores",
      description: "Total recent stores",
      content: dashstat?.recentStoresCount || 0,
      icon: HousePlus,
    },
    // {
    //   title: "Profits",
    //   description: "+10% this month",
    //   content: "₵2,000,000",
    //   icon: TrendingUp,
    // },
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
          <div className="text-xl">{stat.content}</div>
        </DashboardCard>
      ))}
    </div>
  );
}

export default BusinessStats;
