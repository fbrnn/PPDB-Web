import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connectionUri =
  process.env.DATABASE_URL || "mysql://root:@localhost:3306/spmb_db";

// Global pool connection cache for Next.js development hot-reloading
const globalForDb = globalThis as unknown as {
  pool: mysql.Pool | undefined;
};

const isRemoteDb =
  Boolean(process.env.DATABASE_URL) &&
  !process.env.DATABASE_URL?.includes("localhost") &&
  !process.env.DATABASE_URL?.includes("127.0.0.1");

if (process.env.NODE_ENV === "production" && !isRemoteDb) {
  console.warn(
    "⚠️ [DATABASE WARNING] Aplikasi berjalan di Production (Vercel) namun DATABASE_URL belum diarahkan ke Cloud Database atau masih menggunakan localhost. Vercel tidak dapat mengakses localhost."
  );
}

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
