"use client";

import { SensorsData } from "@/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useEffect, useState } from "react";
import { generateMockData } from "@/lib/convert-sensor-data";

const NUM_SENSORS = 5;
const NUM_READINGS = 10;

export const CurrentTempList = ({ className }: { className?: string }) => {
  const [sensorData, setSensorData] = useState<SensorsData[]>([]);

  useEffect(() => {
    const mockData = generateMockData(NUM_SENSORS, NUM_READINGS);
    setSensorData(mockData);
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

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-md">
          <span>Current Temperatures</span>
          <div className="h-2 w-2 rounded-full bg-emerald-400">
            <div className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
          </div>
        </CardTitle>
        <CardDescription>Latest readings from all sensors</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sensor ID</TableHead>
              <TableHead>Temperature (°C)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.values(latestReadings).map((reading) => (
              <TableRow key={reading.sensor_id}>
                <TableCell>Sensor {reading.sensor_id}</TableCell>
                <TableCell>{reading.temp}°C</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
