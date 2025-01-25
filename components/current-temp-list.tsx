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
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { useHover } from "./HoverContext";

const WARNING_TEMP = 80;
const CRITICAL_TEMP = 100;

export const CurrentTempList = ({
  data,
  className,
}: {
  data: SensorsData[];
  className?: string;
}) => {
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

  const warningTemp = Object.values(latestReadings).some(
    (reading) => reading.temp > WARNING_TEMP
  );
  const criticalTemp = Object.values(latestReadings).some(
    (reading) => reading.temp > CRITICAL_TEMP
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-md">
          <span>Maschinentemperaturen</span>
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
        <CardDescription>Aktuelle Höchstwerte</CardDescription>
      </CardHeader>
      <CardContent>
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
                    {reading.temp > CRITICAL_TEMP && (
                      <Badge className="ms-3" variant="destructive">
                        Kritisch
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={warningTemp ? "destructive" : "outline"}>
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
            <TableRow>
              <TableCell colSpan={3}>
                <Button variant={"ghost"} className="p-0 und">
                  Alle anzeigen
                  <ChevronRight />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
