"use client";

import React from "react";
import { addDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import InfoCard from "@/components/ui/infocard";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// -----------------------------
// Sample Data & Config
// -----------------------------
const chartData = [
  { date: "2024-01-07", month: "January", desktop: 186, mobile: 80 },
  { date: "2024-02-03", month: "February", desktop: 305, mobile: 200 },
  { date: "2024-03-01", month: "March", desktop: 237, mobile: 120 },
  { date: "2024-03-11", month: "March", desktop: 237, mobile: 120 },
  { date: "2024-04-01", month: "March", desktop: 237, mobile: 120 },
  { date: "2024-04-10", month: "April", desktop: 573, mobile: 190 },
  { date: "2024-05-01", month: "May", desktop: 209, mobile: 130 },
  { date: "2024-05-01", month: "March", desktop: 237, mobile: 120 },
  { date: "2024-06-01", month: "March", desktop: 237, mobile: 120 },
  { date: "2024-06-20", month: "June", desktop: 214, mobile: 140 },
  { date: "2024-07-01", month: "July", desktop: 314, mobile: 160 },
  { date: "2024-08-15", month: "August", desktop: 214, mobile: 554 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

// -----------------------------
// Main Component
// -----------------------------
export default function OverallSalesCard() {
  const [timeRange, setTimeRange] = React.useState("9m");
  const [customRange, setCustomRange] = React.useState({
    from: new Date(2024, 0, 1),
    to: addDays(new Date(2024, 0, 1), 30),
  });

  const filteredData = chartData.filter((item) => {
    const itemDate = new Date(item.date);
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    let startDate = new Date(now);

    switch (timeRange) {
      case "1d":
        startDate.setDate(startDate.getDate() - 1);
        break;
      case "7d":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "1m":
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case "3m":
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case "9m":
        startDate.setMonth(startDate.getMonth() - 9);
        break;
      case "1y":
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      case "custom":
        if (!customRange?.from || !customRange.to) return false;
        const customStart = new Date(customRange.from);
        const customEnd = new Date(customRange.to);
        customStart.setHours(0, 0, 0, 0);
        customEnd.setHours(23, 59, 59, 999);
        return itemDate >= customStart && itemDate <= customEnd;
      default:
        return true;
    }

    startDate.setHours(0, 0, 0, 0);
    return itemDate >= startDate && itemDate <= now;
  });

  return (
    <InfoCard
      title="Overall Sales & Profits"
      description="Filter by time range"
      className="w-full"
    >
      {/* Filter Controls */}
      <div className="flex flex-row sm:items-end gap-4 mb-4">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[140px] sm:w-[120px] md:w-[200px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">Last 1 day</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="1m">Last 1 month</SelectItem>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="9m">Last 9 months</SelectItem>
            <SelectItem value="1y">Last 1 year</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>

        {/* Custom Date Picker */}
        {timeRange === "custom" && (
          <div className="sm:ml-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-[50px] justify-start text-left font-normal",
                    !customRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={customRange?.from}
                  selected={customRange}
                  onSelect={setCustomRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {/* Chart */}
      <ChartContainer config={chartConfig} className="w-full">
        <BarChart accessibilityLayer data={filteredData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={5}
            axisLine={true}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </InfoCard>
  );
}
