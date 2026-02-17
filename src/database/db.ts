import Database from "@tauri-apps/plugin-sql";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import * as schema from "./schema";

export async function getDb() {
  return await Database.load("sqlite:vex.db");
}

function isSelectQuery(sql: string) {
  return sql.trim().toLowerCase().startsWith("select");
}

export const db = drizzle<typeof schema>(
  async (sql, params, method) => {
    const sqlite = await getDb();
    let rows: unknown = [];
    let results = [];

    if (isSelectQuery(sql)) {
      rows = await sqlite.select(sql, params).catch((e) => {
        console.error("SQL Error:", e);
        return [];
      });
    } else {
      rows = await sqlite.execute(sql, params).catch((e) => {
        console.error("SQL Error:", e);
        return [];
      });
      return {
        rows: [],
      };
    }

    rows = Array.isArray(rows)
      ? rows.map((row: Record<string, unknown>) => {
          return Object.values(row);
        })
      : rows;

    results = method === "all" ? rows : Array.isArray(rows) ? rows[0] : rows;
    await sqlite.close();
    return {
      rows: results,
    };
  },

  {
    schema: schema,
    logger: true,
  },
);
