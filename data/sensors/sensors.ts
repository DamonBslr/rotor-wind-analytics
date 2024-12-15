import { db } from "@/db";
import { sensorsData, sensorsTable } from "@/db/schema";

export function getSensors() {
  return db.select().from(sensorsTable);
}

export async function getSensorsData() {
  // if (start && end) {
  //   return db
  //     .select()
  //     .from(sensorsData)
  //     .where(
  //       and(
  //         gte(sensorsData.created_at, start), 
  //         lt(sensorsData.created_at, end))
  //     );
  // }
  return await db.select().from(sensorsData);
}
