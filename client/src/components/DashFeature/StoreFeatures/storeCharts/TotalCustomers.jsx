"use client";
import * as React from "react";
import MetricCard from "@/components/ui/metric-card";
import Chart from "react-apexcharts";

export default function TotalCustomers() {
  return (
    <>
      <div className="">
        <MetricCard>
          <Chart
            type="donut"
            width={"95%"}
            height={450}
            series={[200, 500, 600]}
            options={{
              chart: {
                type: "donut",
              },

              title: {
                text: "Total Customers",
              },

              labels: ["New", "Returning", "Churned"],
            }}
          />
        </MetricCard>
      </div>
    </>
  );
}
