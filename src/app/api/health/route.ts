import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

/**
 * Endpoint diagnosa untuk mengecek koneksi database dan konfigurasi SMTP di Vercel.
 * Akses: GET /api/health
 * Hapus endpoint ini setelah selesai debugging.
 */
export async function GET() {
  const checks: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV || "(not set)",
  };

  // 1. Cek Environment Variables
  const rawUrl = process.env.DATABASE_URL || "";
  checks.envVars = {
    DATABASE_URL: rawUrl
      ? `✅ Set (${rawUrl.replace(/:([^@:]+)@/, ":****@")})`
      : "❌ NOT SET — akan fallback ke localhost",
    SESSION_SECRET: process.env.SESSION_SECRET ? "✅ Set" : "❌ NOT SET",
    SMTP_USER: process.env.SMTP_USER
      ? `✅ Set (${process.env.SMTP_USER})`
      : "❌ NOT SET",
    SMTP_PASS: process.env.SMTP_PASS ? "✅ Set" : "❌ NOT SET",
  };

  // 2. Cek koneksi database - LANGSUNG via mysql2 (bypass Drizzle)
  const dbUrl = rawUrl || "mysql://root:@localhost:3306/spmb_db";
  const cleanUrl = dbUrl.replace(/[?&]ssl-mode=[^&]*/gi, "");

  const isRemote =
    !dbUrl.includes("localhost") && !dbUrl.includes("127.0.0.1");

  let parsedConfig: mysql.ConnectionOptions = {};
  try {
    const parsed = new URL(cleanUrl);
    parsedConfig = {
      host: parsed.hostname,
      port: parseInt(parsed.port || "3306", 10),
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace(/^\//, ""),
      ssl: isRemote ? { rejectUnauthorized: false } : undefined,
      connectTimeout: 10000,
    };
    checks.parsedConnection = {
      host: parsedConfig.host,
      port: parsedConfig.port,
      user: parsedConfig.user,
      database: parsedConfig.database,
      ssl: isRemote ? "{ rejectUnauthorized: false }" : "disabled",
    };
  } catch (e: unknown) {
    checks.parsedConnection = `❌ URL parse error: ${(e as Error).message}`;
  }

  let connection: mysql.Connection | null = null;
  try {
    connection = await mysql.createConnection(parsedConfig);
    const [rows] = await connection.query("SELECT 1 as ok");
    checks.database = {
      status: "✅ Connected",
      result: rows,
    };

    // Cek tabel
    try {
      await connection.query("SELECT COUNT(*) as cnt FROM sessions");
      checks.sessionsTable = "✅ Exists";
    } catch (e: unknown) {
      checks.sessionsTable = `❌ MISSING — ${(e as Error).message}`;
    }

    try {
      await connection.query("SELECT COUNT(*) as cnt FROM otps");
      checks.otpsTable = "✅ Exists";
    } catch (e: unknown) {
      checks.otpsTable = `❌ MISSING — ${(e as Error).message}`;
    }

    try {
      await connection.query("SELECT COUNT(*) as cnt FROM users");
      checks.usersTable = "✅ Exists";
    } catch (e: unknown) {
      checks.usersTable = `❌ MISSING — ${(e as Error).message}`;
    }
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string; errno?: number; sqlState?: string };
    checks.database = {
      status: "❌ FAILED",
      errorCode: err?.code || "unknown",
      errno: err?.errno,
      sqlState: err?.sqlState,
      errorMessage: err?.message || "unknown error",
    };
  } finally {
    if (connection) {
      await connection.end().catch(() => {});
    }
  }

  // 3. Cek SMTP connection
  try {
    const nodemailer = await import("nodemailer");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      checks.smtp = "⚠️ SMTP_USER / SMTP_PASS belum diset.";
    } else {
      const transporter = nodemailer.default.createTransport({
        service: "gmail",
        auth: { user, pass },
      });
      await transporter.verify();
      checks.smtp = "✅ SMTP Connected & Authenticated";
    }
  } catch (error: unknown) {
    const err = error as { message?: string };
    checks.smtp = `❌ SMTP FAILED — ${err?.message || "unknown"}`;
  }

  return NextResponse.json(checks, { status: 200 });
}
