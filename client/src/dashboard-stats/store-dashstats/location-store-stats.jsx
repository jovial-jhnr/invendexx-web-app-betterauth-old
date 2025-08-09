// components/StatCard.js
import DashboardCard from "@/components/ui/dashboard-card";
import Spinner from "@/components/ui/spinner";
import backendUrl from "@/lib/backendUrl";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

import {
  Users,
  PackageOpen,
  ShoppingBasket,
  Banknote,
  PackageCheck,
  MapPinCheckInside,
  MapPinCheckInsideIcon,
} from "lucide-react";

const fetchLocationStats = async ({ queryKey }) => {
  const [_key, storeId] = queryKey;

  const res = await backendUrl.get(
    `/stores/store/${storeId}/dashstats/location-stats`
  );
  //   console.log("Main Stats", res.data);

  return {
    totalLocation: res?.data?.result?.totalLocation || 0,
    totalRecentLocation: res?.data?.result?.totalRecentLocation || 0,
  };
};

// Main function
export function LocationStoreStats() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const storeId = activeOrganization?.id;

  const { data: dashstat, isLoading } = useQuery({
    queryKey: ["dash", storeId],
    queryFn: fetchLocationStats,
    enabled: !!storeId,
  });

  //   if (isLoading) {
  //     return (
  //       <div>
  //         <Spinner />
  //       </div>
  //     );
  //   }

  const stats = [
    {
      title: "Total Locations",
      description: "Available locations",
      content: dashstat?.totalLocation || 0,
      icon: MapPinCheckInside,
    },

    {
      title: " Total Recent Locations",
      description: "Total recent locations",
      content: dashstat?.totalRecentLocation || 0,
      icon: MapPinCheckInsideIcon,
    },
    // {
    //   title: "Total Products",
    //   description: "Total active now",
    //   content: dashstat?.totalProduct,
    //   icon: PackageOpen,
    // },

    // {
    //   title: "Profits",
    //   description: "+10% this month",
    //   content: "₵2,000,000",
    //   icon: TrendingUp,
    // },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
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

export default LocationStoreStats;
