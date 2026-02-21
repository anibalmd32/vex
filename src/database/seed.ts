import { Database } from "bun:sqlite";
import os from "node:os";
import path from "node:path";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { TransactionTypeKey } from "../definitions/enums";
import * as schema from "./schema";

const windowsAppDataPath = process.env.APPDATA;
const macOsAppDataPath = path.join(
  os.homedir(),
  "Library",
  "Application Support",
);
const linuxAppDataPath = path.join(os.homedir(), ".local", "share");

const appDataPath =
  windowsAppDataPath ||
  (process.platform === "darwin" ? macOsAppDataPath : linuxAppDataPath);

const dbPath = path.join(appDataPath, "com.anibalmd32.vex", "vex.db");

console.info(`📂 Conectando a la DB en: ${dbPath}`);

const sqlite = new Database(dbPath);

const db = drizzle(sqlite, {
  schema: schema,
  logger: true,
});

async function main() {
  console.info("⏳ Start seeding database...");

  //? Seed transaction types
  console.info("Seeding transaction types...");
  await db.delete(schema.transactionType);
  await db.insert(schema.transactionType).values([
    {
      name: "Ingreso",
      key: TransactionTypeKey.IN,
    },
    {
      name: "Egreso",
      key: TransactionTypeKey.OUT,
    },
  ]);
  console.info("✅ Transaction types seeded successfully");

  console.info("✅ Database seeded successfully");
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
  })
  .finally(() => {
    console.info("👋 Goodbye");
  });
