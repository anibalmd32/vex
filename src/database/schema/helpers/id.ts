import { integer } from "drizzle-orm/sqlite-core";

export const id = integer("id").primaryKey({
  autoIncrement: true,
});
