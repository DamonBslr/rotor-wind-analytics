"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ChartDataPoint,
  convertSensorData,
  generateMockData,
} from "@/lib/convert-sensor-data";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const NUM_SENSORS = 5;
const NUM_READINGS = 10;

export const CurrentTempChart = ({ className }: { className?: string }) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    const mockData = generateMockData(NUM_SENSORS, NUM_READINGS);
    setChartData(convertSensorData(mockData));
  }, []);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Temperature History</span>
          <div className="h-2 w-2 rounded-full bg-emerald-400">
            <div className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
          </div>
        </CardTitle>
        <CardDescription>Temperature readings over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            ...Object.fromEntries(
              Array.from({ length: NUM_SENSORS }, (_, i) => [
                i + 1,
                {
                  label: `Sensor ${i + 1}`,
                  color: `hsl(${(i * 360) / NUM_SENSORS}, 80%, 50%)`,
                },
              ])
            ),
          }}
          className="h-[400px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={5}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              {Array.from({ length: NUM_SENSORS }, (_, i) => (
                <Line
                  key={i + 1}
                  type="monotone"
                  dataKey={`${i + 1}`}
                  stroke={`var(--color-${i + 1})`}
                  name={`Sensor ${i + 1}`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
