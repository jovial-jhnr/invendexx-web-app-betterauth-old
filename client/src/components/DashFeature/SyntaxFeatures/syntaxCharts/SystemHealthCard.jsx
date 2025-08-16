import DashboardCard from "@/components/ui/dashboard-card";
import MetricCard from "@/components/ui/metric-card";
import {
  Server,
  Database,
  CreditCard,
  Cloud,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    name: "API Services",
    status: "Operational",
    description: "All systems normal",
    icon: Cloud,
    healthy: true,
  },
  {
    name: "Database",
    status: "Operational",
    description: "Running smoothly",
    icon: Database,
    healthy: true,
  },
  {
    name: "Payment Gateway",
    status: "Degraded",
    description: "High latency detected",
    icon: CreditCard,
    healthy: false,
  },
  {
    name: "Server",
    status: "Operational",
    description: "Server load: normal",
    icon: Server,
    healthy: true,
  },
];

export function SystemHealthCard() {
  return (
    <MetricCard
      title="System Health Overview"
      description="Live status of key infrastructure services"
      icon={Server}
      className="w-full"
    >
      <div className="space-y-4 mt-2">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="flex items-start gap-3">
              <Icon className="h-5 w-5 text-muted-foreground mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{service.name}</p>
                  <div className="flex items-center gap-1 text-sm">
                    {service.healthy ? (
                      <CheckCircle className="text-green-500 h-4 w-4" />
                    ) : (
                      <AlertTriangle className="text-yellow-500 h-4 w-4" />
                    )}
                    <span
                      className={
                        service.healthy
                          ? "text-green-600 font-medium"
                          : "text-yellow-600 font-medium"
                      }
                    >
                      {service.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </MetricCard>
  );
}

// import DashboardCard from "@/components/ui/dashboard-card";
// import {
//   Server,
//   Database,
//   CreditCard,
//   Cloud,
//   AlertTriangle,
//   CheckCircle,
// } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const useServiceStatus = (key, url) =>
//   useQuery({
//     queryKey: [key],
//     queryFn: async () => {
//       const { data } = await axios.get(url);
//       return data;
//     },
//     staleTime: 60 * 1000, // 1 minute
//   });

// export function SystemHealthCard() {
//   const apiStatus = useServiceStatus("api", "/api/status/api");
//   const dbStatus = useServiceStatus("db", "/api/status/database");
//   const paymentStatus = useServiceStatus("payment", "/api/status/payment");
//   const serverStatus = useServiceStatus("server", "/api/status/server");

//   const services = [
//     {
//       name: "API Services",
//       data: apiStatus.data,
//       isLoading: apiStatus.isLoading,
//       icon: Cloud,
//     },
//     {
//       name: "Database",
//       data: dbStatus.data,
//       isLoading: dbStatus.isLoading,
//       icon: Database,
//     },
//     {
//       name: "Payment Gateway",
//       data: paymentStatus.data,
//       isLoading: paymentStatus.isLoading,
//       icon: CreditCard,
//     },
//     {
//       name: "Server",
//       data: serverStatus.data,
//       isLoading: serverStatus.isLoading,
//       icon: Server,
//     },
//   ];

//   return (
//     <DashboardCard
//       title="System Health Overview"
//       description="Live status of key infrastructure services"
//       icon={Server}
//     >
//       <div className="space-y-4 mt-2">
//         {services.map((service, idx) => {
//           const Icon = service.icon;
//           const healthy = service.data?.healthy;
//           const status = service.data?.status || "Unknown";
//           const description = service.data?.description || "Loading...";
//           const isLoading = service.isLoading;

//           return (
//             <div key={idx} className="flex items-start gap-3">
//               <Icon className="h-5 w-5 text-muted-foreground mt-1" />
//               <div className="flex-1">
//                 <div className="flex items-center justify-between">
//                   <p className="font-medium">{service.name}</p>
//                   <div className="flex items-center gap-1 text-sm">
//                     {isLoading ? (
//                       <span className="text-muted-foreground">Loading...</span>
//                     ) : healthy ? (
//                       <>
//                         <CheckCircle className="text-green-500 h-4 w-4" />
//                         <span className="text-green-600 font-medium">{status}</span>
//                       </>
//                     ) : (
//                       <>
//                         <AlertTriangle className="text-yellow-500 h-4 w-4" />
//                         <span className="text-yellow-600 font-medium">{status}</span>
//                       </>
//                     )}
//                   </div>
//                 </div>
//                 <p className="text-sm text-muted-foreground">{description}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </DashboardCard>
//   );
// }

// import React from 'react';
// import DashboardCard from '@/components/ui/dashboard-card';

// function SystemHealthCard(){

//     return(
//         <>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
//                 {stats.map((stat, index) => (
//                   <DashboardCard
//                     key={index}
//                     title={stat.title}
//                     description={stat.description}
//                     icon={stat.icon}
//                   >
//                     <div className="text-xl">
//                       {stat.content}
//                     </div>

//                   </DashboardCard>
//                 ))}
//             </div>
//         </>
//     )
// };

// export default SystemHealthCard;
