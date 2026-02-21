import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id } from "./helpers/id";
import { timestamps } from "./helpers/timestamp";

export const transactionType = sqliteTable("transaction_type", {
  id,
  name: text("name").notNull(),
  key: text("key").notNull(),
  ...timestamps,
});
