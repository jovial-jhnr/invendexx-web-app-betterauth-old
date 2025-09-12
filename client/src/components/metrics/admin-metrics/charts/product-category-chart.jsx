import Chart from "react-apexcharts";
import MetricCard from "@/components/ui/metric-card";
import DashboardCard from "@/components/ui/dashboard-card";

function ProductCategoryChart() {
  return (
    <>
      <div className="">
        <MetricCard>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[400px]">
              <Chart
                type="bar"
                weight={"100%"}
                height={390}
                series={[
                  {
                    name: "Amount",
                    data: [470, 600, 1000, 200, 500, 700, 450, 900, 986],
                    // color:"green"
                  },
                ]}
                options={{
                  chart: {
                    type: "bar",
                  },

                  toolbar: {
                    autoSelected: "zoom",
                  },

                  dataLabels: {
                    enabled: false,
                  },

                  title: {
                    text: "Top Selling Categories",
                    style: {
                      fontSize: 15,
                    },
                  },

                  plotOptions: {
                    bar: {
                      horizontal: true,
                      borderRadius: 5,
                    },
                  },

                  xaxis: {
                    title: {
                      text: "Amounts",
                      style: {
                        fontSize: 15,
                      },
                    },

                    labels: {
                      formatter: (value) => {
                        return `₵ ${value}`;
                      },
                    },

                    tickPlacement: "on",

                    categories: [
                      "Clothes",
                      "Socks",
                      "Cups",
                      "Shoes",
                      "Books",
                      "Pencils",
                      "Heels",
                      "Pens",
                      "Laptops",
                    ],
                  },

                  yaxis: {
                    title: {
                      text: "Categories",
                      style: {
                        fontSize: 15,
                      },
                    },
                    tickPlacement: "on",

                    legend: {
                      show: true,
                      position: "top",
                    },
                  },
                }}
              />
            </div>
          </div>
        </MetricCard>
      </div>
    </>
  );
}

export default ProductCategoryChart;
