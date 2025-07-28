import DashboardCard from "@/components/ui/dashboard-card";

import { 
    DollarSign,
    BadgeCent, 
    ShoppingCart, 
    Users, 
    UserCheck, 
    Package, 
    TrendingUp, 
    Activity,
    ShieldCheck,
    Banknote,
} from "lucide-react";

function ReportsDashCard(){

    const repstat = [
        { title: "Total Revenue", description: "+15% this month", content: "₵ 5,000,000", icon: DollarSign },
        { title: "Months Revenue", description: "+12% this month", content: "₵ 5,000", icon: BadgeCent},
        { title: "Total Users", description: "+5% this month", content: "5000", icon:Users},
        { title: "Active Users", description: "30+ active now", content: "3000", icon: UserCheck },
        { title: "Total Business", description:"+10 this month", content: "200,000", icon:ShieldCheck},
        { title: "Total GMV", description: "+10 this month", content: "₵ 30,000", icon: Banknote }
    ]

    return(
        <>
         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 m-2 gap-4">
            {repstat.map((repstat, idx) => (
                <DashboardCard
                 key={idx}
                 title={repstat.title}
                 description={repstat.description}
                 icon={repstat.icon}
                >
                  <div className="text-xl">
                    {repstat.content}
                  </div>
                </DashboardCard>
            )
            )}
         </div>
        </>
    )
}

export default ReportsDashCard;