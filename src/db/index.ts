import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const rawUri =
  process.env.DATABASE_URL || "mysql://root:@localhost:3306/spmb_db";

// mysql2 tidak mengenal parameter ?ssl-mode=REQUIRED di URL.
// Hapus parameter tersebut dan tangani SSL melalui config object.
const connectionUri = rawUri.replace(/[?&]ssl-mode=[^&]*/gi, "");

const isRemoteDb =
  Boolean(process.env.DATABASE_URL) &&
  !process.env.DATABASE_URL?.includes("localhost") &&
  !process.env.DATABASE_URL?.includes("127.0.0.1");

// Global pool connection cache for Next.js development hot-reloading
const globalForDb = globalThis as unknown as {
  pool: mysql.Pool | undefined;
};

const pool =
  globalForDb.pool ??
  mysql.createPool({
    uri: connectionUri,
    waitForConnections: true,
    connectionLimit: process.env.NODE_ENV === "production" ? 5 : 10,
    queueLimit: 0,
    ssl: isRemoteDb ? { rejectUnauthorized: false } : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

export const db = drizzle(pool, { schema, mode: "default" });

