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

export function generateMockData(numSensors: number, numReadings: number): SensorsData[] {
  const data: SensorsData[] = [];
  const baseTime = new Date();

  for (let i = 0; i < numReadings; i++) {
    for (let sensorId = 1; sensorId <= numSensors; sensorId++) {
      data.push({
        id: data.length + 1,
        sensor_id: sensorId,
        temp: Math.floor(Math.random() * 30) + 10, // Random temperature between 10 and 40
        created_at: new Date(baseTime.getTime() - i * 60000)// Each reading is 1 minute apart
      });
    }
  }

  return data;
}


