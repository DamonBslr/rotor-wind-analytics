import { SensorsData } from "@/db/schema";

export interface ChartDataPoint {
  date: string;
  [sensorId: number]: number;
}

export function convertSensorData(data: SensorsData[]): ChartDataPoint[] {
  const groupedData: { [key: string]: { [sensorId: number]: number } } = {};

  // Group data by timestamp (rounded to the nearest second)
  data.forEach((item) => {
    const date = new Date(item.created_at);
    const roundedDate = new Date(date.setMilliseconds(0));
    const dateKey = roundedDate.toISOString().slice(0, -5); // Remove milliseconds and 'Z'

    if (!groupedData[dateKey]) {
      groupedData[dateKey] = {};
    }

    groupedData[dateKey][item.sensor_id] = item.temp;
  });

  // Convert grouped data to the desired format
  const chartData: ChartDataPoint[] = Object.entries(groupedData).map(
    ([date, sensors]) => ({
      date,
      ...sensors,
    })
  );

  return chartData;
}

export function generateMockData(
  numSensors: number,
  numReadings: number
): SensorsData[] {
  const data: SensorsData[] = [];
  // const baseTime = new Date();

  const startTime = new Date(new Date().getTime() - 1000 * 60 * numReadings); // 10 minutes ago

  for (let i = 0; i < numSensors; i++) {
    let temp = Math.floor(Math.random() * 10) + 50; // Initial temperature
    for (let j = 0; j < numReadings; j++) {
      const createdAt = new Date(startTime.getTime() + j * 60000); // Increment by 1 minute
      data.push({ id: i + 1, temp, created_at: createdAt, sensor_id: i + 1 });

      // Adjust temperature slightly for the next minute
      const tempChange = Math.random() < 0.5 ? Math.floor(Math.random() * -5) - 1 : Math.floor(Math.random() * 5) + 1;
      temp += tempChange;
    }
  }

  return data;
}
