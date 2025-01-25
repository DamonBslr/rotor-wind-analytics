import { SensorsData } from "@/db/schema";

export interface ChartDataPoint {
  date: string;
  [sensorId: number]: number;
}

export const NUM_SENSORS = 6;
export const WARNING_TEMP = 80;
export const CRITICAL_TEMP = 100;
export const DEVIATION = 5;
export const NUM_MINUTES = 5;
export const READINGS_PER_MINUTE = 6;


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
// const staticMockData: SensorsData[] = [
//   {
//     id: 1,
//     temp: 30,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 5, 0, 0)),
//     sensor_id: 1,
//   },
//   {
//     id: 2,
//     temp: 65,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 5, 0, 0)),
//     sensor_id: 2,
//   },
//   {
//     id: 3,
//     temp: 61,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 5, 0, 0)),
//     sensor_id: 3,
//   },
//   {
//     id: 4,
//     temp: 35,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 5, 0, 0)),
//     sensor_id: 4,
//   },
//   {
//     id: 5,
//     temp: 40,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 5, 0, 0)),
//     sensor_id: 5,
//   },
//   {
//     id: 6,
//     temp: 45,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 5, 0, 0)),
//     sensor_id: 6,
//   },
//   {
//     id: 1,
//     temp: 33,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 4, 0, 0)),
//     sensor_id: 1,
//   },
//   {
//     id: 2,
//     temp: 63,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 4, 0, 0)),
//     sensor_id: 2,
//   },
//   {
//     id: 3,
//     temp: 58,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 4, 0, 0)),
//     sensor_id: 3,
//   },
//   {
//     id: 4,
//     temp: 40,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 4, 0, 0)),
//     sensor_id: 4,
//   },
//   {
//     id: 5,
//     temp: 45,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 4, 0, 0)),
//     sensor_id: 5,
//   },
//   {
//     id: 6,
//     temp: 50,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 4, 0, 0)),
//     sensor_id: 6,
//   },
//   {
//     id: 1,
//     temp: 35,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 3, 0, 0)),
//     sensor_id: 1,
//   },
//   {
//     id: 2,
//     temp: 69,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 3, 0, 0)),
//     sensor_id: 2,
//   },
//   {
//     id: 3,
//     temp: 55,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 3, 0, 0)),
//     sensor_id: 3,
//   },
//   {
//     id: 4,
//     temp: 45,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 3, 0, 0)),
//     sensor_id: 4,
//   },
//   {
//     id: 5,
//     temp: 50,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 3, 0, 0)),
//     sensor_id: 5,
//   },
//   {
//     id: 6,
//     temp: 55,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 3, 0, 0)),
//     sensor_id: 6,
//   },
//   {
//     id: 1,
//     temp: 34,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 2, 0, 0)),
//     sensor_id: 1,
//   },
//   {
//     id: 2,
//     temp: 74,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 2, 0, 0)),
//     sensor_id: 2,
//   },
//   {
//     id: 3,
//     temp: 51,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 2, 0, 0)),
//     sensor_id: 3,
//   },
//   {
//     id: 4,
//     temp: 50,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 2, 0, 0)),
//     sensor_id: 4,
//   },
//   {
//     id: 5,
//     temp: 55,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 2, 0, 0)),
//     sensor_id: 5,
//   },
//   {
//     id: 6,
//     temp: 60,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 2, 0, 0)),
//     sensor_id: 6,
//   },
//   {
//     id: 1,
//     temp: 40,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 1, 0, 0)),
//     sensor_id: 1,
//   },
//   {
//     id: 2,
//     temp: 76,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 1, 0, 0)),
//     sensor_id: 2,
//   },
//   {
//     id: 3,
//     temp: 44,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 1, 0, 0)),
//     sensor_id: 3,
//   },
//   {
//     id: 4,
//     temp: 55,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 1, 0, 0)),
//     sensor_id: 4,
//   },
//   {
//     id: 5,
//     temp: 60,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 1, 0, 0)),
//     sensor_id: 5,
//   },
//   {
//     id: 6,
//     temp: 65,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 1, 0, 0)),
//     sensor_id: 6,
//   },
//   {
//     id: 1,
//     temp: 44,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes(), 0, 0)),
//     sensor_id: 1,
//   },
//   {
//     id: 2,
//     temp: 72,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes(), 0, 0)),
//     sensor_id: 2,
//   },
//   {
//     id: 3,
//     temp: 39,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes(), 0, 0)),
//     sensor_id: 3,
//   },
//   {
//     id: 4,
//     temp: 60,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes(), 0, 0)),
//     sensor_id: 4,
//   },
//   {
//     id: 5,
//     temp: 65,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes(), 0, 0)),
//     sensor_id: 5,
//   },
//   {
//     id: 6,
//     temp: 70,
//     created_at: new Date(new Date().setMinutes(new Date().getMinutes(), 0, 0)),
//     sensor_id: 6,
//   },
// ];

// export const mockData: SensorsData[]  = [...staticMockData, ...generateMockData(10, 5, 6)];

export const mockData: SensorsData[] = generateMockData(NUM_SENSORS, NUM_MINUTES, READINGS_PER_MINUTE);


export function generateMockData(
  numSensors: number,
  minutes: number,
  readingsPerMinute: number
): SensorsData[] {
  const data: SensorsData[] = [];
  // const baseTime = new Date();

  const numReadings = minutes * readingsPerMinute;
  // start time 30 minutes ago
  const startTime = new Date();
  startTime.setMinutes(startTime.getMinutes() - minutes);

  for (let i = 0; i < numSensors; i++) {
    // let temp = Math.floor(Math.random() * 10) + 10; // Initial temperature
    // initial temp between 30 and 60
    let temp = Math.floor(Math.random() * 30) + 30;
    for (let j = 0; j < numReadings; j++) {
      const createdAt = new Date(startTime.getTime() + j * (60000 / readingsPerMinute)); // Increment by 10sec
      data.push({ id: i + 1, temp, created_at: createdAt, sensor_id: i + 1 });

      // Adjust temperature slightly for the next minute
      const tempChange =
        Math.random() < 0.5
          ? Math.floor(Math.random() * -5) - 1
          : Math.floor(Math.random() * 5) + 1;
      // cannot go below 0
      if (temp + tempChange < 0) {
        temp += Math.abs(tempChange);
        // cannot go above 100
      } else if (temp + tempChange > 100) {
        temp -= Math.abs(tempChange);
      } else {
        temp += tempChange;
      }
    }
  }

  return data;
}
