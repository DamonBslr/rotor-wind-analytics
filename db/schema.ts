import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const sensorsTable = pgTable("sensors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  machineId: integer().notNull(),
  location: varchar(),
});

export const sensorsData = pgTable("sensors_data", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sensor_id: integer().notNull().references(() => sensorsTable.id),
  temp: integer().notNull(),
  created_at: timestamp().notNull().$default(() => new Date()),
});

export type SensorsData = typeof sensorsData.$inferSelect;