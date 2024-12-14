import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Sensor {
  id: string;
  temp: number;
}
const sensors: Sensor[] = [
  {
    id: "INV001",
    temp: 43,
  },
  {
    id: "INV002",
    temp: 48,
  },
  {
    id: "INV003",
    temp: 45,
  },
  {
    id: "INV004",
    temp: 41,
  },
  {
    id: "INV005",
    temp: 22,
  },
  {
    id: "INV006",
    temp: 53,
  },
  {
    id: "INV007",
    temp: 45,
  },
  {
    id: "INV008",
    temp: 45,
  },
];

const highestSensors = sensors.sort((a, b) => b.temp - a.temp).slice(0, 5);

export default function SensorOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Highest Sensor</CardTitle>
      </CardHeader>
      <CardContent>
        <SensorTable />
      </CardContent>
    </Card>
  );
}

const SensorTable = () => {
  return (
    <Table>
      <TableCaption>A list of highest temp data.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead className="text-right">Temp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {highestSensors.map((sensor) => (
          <TableRow key={sensor.id}>
            <TableCell className="font-medium">{sensor.id}</TableCell>
            <TableCell className="text-right">{sensor.temp}°C</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
