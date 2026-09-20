import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const rawUri =
  process.env.DATABASE_URL || "mysql://root:@localhost:3306/spmb_db";

const isRemoteDb =
  Boolean(process.env.DATABASE_URL) &&
  !process.env.DATABASE_URL?.includes("localhost") &&
  !process.env.DATABASE_URL?.includes("127.0.0.1");

/**
 * Parse MySQL URI secara manual agar opsi SSL bisa diterapkan dengan benar.
 * mysql2 sering mengabaikan ssl config saat menggunakan `uri` option.
 */
function parseDbUrl(url: string): mysql.PoolOptions {
  // Hapus parameter query yang tidak dikenali mysql2
  const cleanUrl = url.replace(/[?&]ssl-mode=[^&]*/gi, "");

  try {
    const parsed = new URL(cleanUrl);
    return {
      host: parsed.hostname,
      port: parseInt(parsed.port || "3306", 10),
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace(/^\//, ""),
    };
  } catch {
    // Fallback: gunakan URI langsung jika parsing gagal
    return { uri: cleanUrl };
  }
}

// Global pool connection cache for Next.js development hot-reloading
const globalForDb = globalThis as unknown as {
  pool: mysql.Pool | undefined;
};

const poolOptions: mysql.PoolOptions = isRemoteDb
  ? {
      ...parseDbUrl(rawUri),
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      ssl: { rejectUnauthorized: false },
    }
  : {
      uri: rawUri,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };

const pool = globalForDb.pool ?? mysql.createPool(poolOptions);

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

export const db = drizzle(pool, { schema, mode: "default" });
