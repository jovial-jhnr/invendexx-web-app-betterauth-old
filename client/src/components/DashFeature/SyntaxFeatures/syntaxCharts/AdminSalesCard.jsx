import DashboardCard from "@/components/ui/dashboard-card";
import MetricCard from "@/components/ui/metric-card";
import Chart from "react-apexcharts";

function AdminSalesCard() {
  return (
    <>
      <div>
        <DashboardCard>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[500px]">
              <div></div>
              <Chart
                type="bar"
                width={"100%"}
                height={370}
                series={[
                  {
                    name: "Revenue",
                    data: [
                      470, 600, 1000, 200, 500, 700, 450, 900, 986, 583, 637,
                      924,
                    ],
                    color: "green",
                  },

                  {
                    name: "Profits",
                    data: [
                      400, 200, 950, 200, 300, 450, 700, 389, 785, 837, 937,
                      230,
                    ],
                    color: "blue",
                  },

                  {
                    name: "Expense",
                    data: [
                      120, 60, 100, 50, 35, 300, 198, 156, 482, 338, 847, 828,
                    ],
                    color: "red",
                  },
                ]}
                options={{
                  chart: {
                    type: "bar",
                  },

                  dataLabels: {
                    enabled: false,
                  },

                  title: {
                    text: "Overall Amounts",
                    style: {
                      fontSize: 14,
                    },
                  },

                  subtitle: {
                    text: "This chart shows all the amount going through your business by months",
                  },

                  xaxis: {
                    title: {
                      text: "Months",
                    },
                    labels: {
                      rotate: -45,
                    },
                    tickPlacement: "on",
                    categories: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "April",
                      "May",
                      "June",
                      "July",
                      "Aug",
                      "Sept",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                  },

                  yaxis: {
                    title: {
                      text: "Amount",
                      style: {
                        fontSize: 14,
                      },
                    },

                    labels: {
                      formatter: (value) => {
                        return `₵ ${value}`;
                      },
                    },
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: "55%",
                      borderRadius: 5,
                      borderRadiusApplication: "end",
                    },
                  },

                  responsive: [
                    {
                      breakpoint: 580,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </DashboardCard>
      </div>
    </>
  );
}

export default AdminSalesCard;
