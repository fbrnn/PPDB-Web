import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connectionUri =
  process.env.DATABASE_URL || "mysql://root:@localhost:3306/spmb_db";

// Global pool connection cache for Next.js development hot-reloading
const globalForDb = globalThis as unknown as {
  pool: mysql.Pool | undefined;
};

const pool =
  globalForDb.pool ??
  mysql.createPool({
    uri: connectionUri,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

export const db = drizzle(pool, { schema, mode: "default" });
