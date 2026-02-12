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
    let rows: any = [];
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

    rows = rows.map((row: any) => {
      return Object.values(row);
    });

    results = method === "all" ? rows : rows[0];
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
