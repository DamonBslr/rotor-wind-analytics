"use client";

import {
  CRITICAL_TEMP,
  DEVIATION,
  NUM_SENSORS,
  WARNING_TEMP,
} from "@/lib/convert-sensor-data";
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
import { SensorsData } from "@/db/schema";
import { ChartDataPoint, convertSensorData } from "@/lib/convert-sensor-data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useHover } from "./HoverContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

export const CurrentTempChart = ({
  data,
  className,
}: {
  data: SensorsData[];
  className?: string;
}) => {
  const { hoveredSensorId } = useHover();

  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  useEffect(() => {
    setChartData(convertSensorData(data));
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-3 rounded-md shadow-md">
          <p className="label">{`Time: ${new Date(
            label
          ).toLocaleTimeString()}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}°C`}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  const [sensorData, setSensorData] = useState<SensorsData[]>([]);
  const { setHoveredSensorId } = useHover();

  useEffect(() => {
    setSensorData(data);
  }, []);

  const latestReadings = sensorData.reduce((acc, reading) => {
    if (
      !acc[reading.sensor_id] ||
      new Date(reading.created_at) > new Date(acc[reading.sensor_id].created_at)
    ) {
      acc[reading.sensor_id] = reading;
    }
    return acc;
  }, {} as { [key: number]: SensorsData });

  // const warningTemp = Object.values(latestReadings).some(
  //   (reading) => reading.temp > WARNING_TEMP
  // );
  // const criticalTemp = Object.values(latestReadings).some(
  //   (reading) => reading.temp > CRITICAL_TEMP
  // );

  const warningTemp = chartData.some((reading) => {
    return Object.values(reading).some(
      (temp) => temp >= WARNING_TEMP - DEVIATION
    );
  });

  const criticalTemp = chartData.some((reading) => {
    return Object.values(reading).some(
      (temp) => temp >= CRITICAL_TEMP - DEVIATION
    );
  });

  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <CardTitle className="flex justify-between items-center text-md">
          <span>Temperaturverlauf</span>
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              criticalTemp
                ? "bg-red-500"
                : warningTemp
                ? "bg-orange-400"
                : "bg-emerald-400"
            )}
          >
            <div
              className={cn(
                "h-2 w-2 animate-ping rounded-full",
                criticalTemp
                  ? "bg-red-500"
                  : warningTemp
                  ? "bg-orange-400"
                  : "bg-emerald-400"
              )}
            />
          </div>
        </CardTitle>
        <CardDescription>
          Temperaturentwicklung der letzten 30 Minuten
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-6 mr-6 pb-0 mb-[-3rem]">
        <ChartContainer
          config={{
            ...Object.fromEntries(
              Array.from({ length: NUM_SENSORS }, (_, i) => [
                i + 1,
                {
                  label: `Maschine ${i + 1}`,
                  color: `hsl(${(i * 360) / NUM_SENSORS}, 80%, 50%)`,
                },
              ])
            ),
          }}
          className="h-[400px] w-2/3 pt-[44px]"
        >
          <ResponsiveContainer aspect={2.7}>
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
              <Tooltip content={<CustomTooltip />} />
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
                  name={`Maschine ${i + 1}`}
                  dot={false}
                  opacity={
                    hoveredSensorId === null || hoveredSensorId === i + 1
                      ? 1
                      : 0.2
                  }
                />
              ))}
              <ReferenceLine
                y={CRITICAL_TEMP}
                stroke="red"
                strokeDasharray="3 3"
              />
              <ReferenceArea
                y1={CRITICAL_TEMP - DEVIATION}
                y2={CRITICAL_TEMP}
                fill="red"
                fillOpacity={0.3}
              />
              <ReferenceLine
                y={WARNING_TEMP}
                stroke="orange"
                strokeDasharray="3 3"
              />
              <ReferenceArea
                y1={WARNING_TEMP - DEVIATION}
                y2={WARNING_TEMP}
                fill="orange"
                fillOpacity={0.3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Temperatur</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.values(latestReadings)
              .sort((a, b) => b.temp - a.temp)
              .slice(0, 5)
              .map((reading) => (
                <TableRow
                  key={reading.sensor_id}
                  onMouseEnter={() => setHoveredSensorId(reading.sensor_id)}
                  onMouseLeave={() => setHoveredSensorId(null)}
                >
                  <TableCell>{reading.sensor_id}</TableCell>
                  <TableCell>
                    {reading.temp}°C{" "}
                  </TableCell>
                  <TableCell>
                    <Badge variant={reading.temp > WARNING_TEMP ? "destructive" : "outline"}>
                      vor{" "}
                      {Math.round(
                        (Date.now() - new Date(reading.created_at).getTime()) /
                          1000
                      )}{" "}
                      sec
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
