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
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const NUM_SENSORS = 5;
const NUM_READINGS = 10;
const WARNING_TEMP = 80;
const CRITICAL_TEMP = 100;

export const CurrentTempChart = ({ className }: { className?: string }) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  useEffect(() => {
    const mockData = generateMockData(NUM_SENSORS, NUM_READINGS);
    setChartData(convertSensorData(mockData));
  }, []);

  const warningTemp = chartData.some((reading) => {
    return Object.values(reading).some((temp) => temp > WARNING_TEMP);
  });

  const criticalTemp = chartData.some((reading) => {
    return Object.values(reading).some((temp) => temp > CRITICAL_TEMP);
  });


  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-md">
          <span>Temperaturverlauf</span>
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              criticalTemp ? "bg-red-500" : (warningTemp ? "bg-orange-400" : "bg-emerald-400")
            )}
          >
            <div
              className={cn(
                "h-2 w-2 animate-ping rounded-full",
                criticalTemp ? "bg-red-500" : (warningTemp ? "bg-orange-400" : "bg-emerald-400")
              )}
            />
          </div>
        </CardTitle>
        <CardDescription>Temperaturwerte der letzten 2 Stunden</CardDescription>
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
            <LineChart accessibilityLayer data={chartData}>
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
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              {Array.from({ length: NUM_SENSORS }, (_, i) => (
                <Line
                  key={i + 1}
                  type="monotone"
                  dataKey={`${i + 1}`}
                  stroke={`var(--color-${i + 1})`}
                  name={`Sensor ${i + 1}`}
                  dot={false}
                />
              ))}
              <ReferenceLine y={WARNING_TEMP} stroke="orange" strokeDasharray="3 3" />
              <ReferenceLine y={CRITICAL_TEMP} stroke="red" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
