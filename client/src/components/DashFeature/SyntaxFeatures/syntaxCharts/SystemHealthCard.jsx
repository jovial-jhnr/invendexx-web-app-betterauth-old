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

export default function SystemHealthCard() {
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
