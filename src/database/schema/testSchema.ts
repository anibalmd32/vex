import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id } from "./helpers/id";
import { timestamps } from "./helpers/timestamp";

export const test = sqliteTable("test", {
  id,
  title: text("title").notNull(),
  content: text("content"),
  ...timestamps,
});
