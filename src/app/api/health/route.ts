import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

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
  checks.envVars = {
    DATABASE_URL: process.env.DATABASE_URL
      ? `✅ Set (${process.env.DATABASE_URL.replace(/:([^@]+)@/, ":****@")})`
      : "❌ NOT SET — akan fallback ke localhost",
    SESSION_SECRET: process.env.SESSION_SECRET ? "✅ Set" : "❌ NOT SET",
    SMTP_USER: process.env.SMTP_USER
      ? `✅ Set (${process.env.SMTP_USER})`
      : "❌ NOT SET",
    SMTP_PASS: process.env.SMTP_PASS ? "✅ Set" : "❌ NOT SET",
  };

  // 2. Cek koneksi database
  try {
    const result = await db.execute(sql`SELECT 1 as ok`);
    checks.database = {
      status: "✅ Connected",
      result: result,
    };
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string };
    checks.database = {
      status: "❌ FAILED",
      errorCode: err?.code || "unknown",
      errorMessage: err?.message || "unknown error",
    };
  }

  // 3. Cek tabel sessions exists
  try {
    await db.execute(sql`SELECT COUNT(*) as cnt FROM sessions`);
    checks.sessionsTable = "✅ Exists";
  } catch (error: unknown) {
    const err = error as { message?: string };
    checks.sessionsTable = `❌ MISSING — ${err?.message || "Table not found. Jalankan: npm run db:push"}`;
  }

  // 4. Cek tabel otps exists
  try {
    await db.execute(sql`SELECT COUNT(*) as cnt FROM otps`);
    checks.otpsTable = "✅ Exists";
  } catch (error: unknown) {
    const err = error as { message?: string };
    checks.otpsTable = `❌ MISSING — ${err?.message || "Table not found. Jalankan: npm run db:push"}`;
  }

  // 5. Cek SMTP connection
  try {
    const nodemailer = await import("nodemailer");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      checks.smtp = "⚠️ SMTP_USER / SMTP_PASS belum diset. Email OTP tidak akan terkirim.";
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
