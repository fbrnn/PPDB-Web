"use server";

import crypto from "crypto";
import { cookies } from "next/headers";
import { eq, and, gt, desc } from "drizzle-orm";
import { db } from "@/db";
import { users, adminAllowlist, otps, registrations } from "@/db/schema";
import { generateOtpCode } from "@/lib/otp";
import { signSession, invalidateSession } from "@/lib/session";
import { sendOtpEmail } from "@/lib/email";
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE, UserRole } from "@/lib/constants";
import { requestOtpSchema, verifyOtpSchema } from "./schemas";
import { AuthActionResult } from "./types";

/**
 * Server Action: Mengirim kode OTP ke email pemohon.
 */
export async function requestOtp(emailInput: string): Promise<AuthActionResult> {
  try {
    const parseResult = requestOtpSchema.safeParse({ email: emailInput });
    if (!parseResult.success) {
      return {
        success: false,
        message: parseResult.error.issues[0]?.message || "Email tidak valid.",
      };
    }

    const { email } = parseResult.data;
    const code = generateOtpCode(6);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 menit kedaluwarsa

    // Simpan OTP ke database
    await db.insert(otps).values({
      id: crypto.randomUUID(),
      email,
      code,
      expiresAt,
    });

    // Cek apakah email termasuk admin (untuk console fallback)
    const allowlisted = await db
      .select()
      .from(adminAllowlist)
      .where(eq(adminAllowlist.email, email))
      .limit(1);
    const isAdmin = allowlisted.length > 0;

    // Kirim email OTP (dengan fallback console untuk admin)
    await sendOtpEmail(email, code, { isAdmin });

    return {
      success: true,
      message: `Kode verifikasi OTP telah dikirimkan ke ${email}. Silakan periksa kotak masuk email Anda.`,
    };
  } catch (error) {
    console.error("Error in requestOtp:", error);
    return {
      success: false,
      message: "Gagal mengirimkan kode OTP. Silakan coba beberapa saat lagi.",
    };
  }
}

/**
 * Server Action: Verifikasi kode OTP dan inisialisasi sesi login.
 */
export async function verifyOtp(
  emailInput: string,
  codeInput: string
): Promise<AuthActionResult<{ role: UserRole; redirectUrl: string }>> {
  try {
    const parseResult = verifyOtpSchema.safeParse({
      email: emailInput,
      code: codeInput,
    });

    if (!parseResult.success) {
      return {
        success: false,
        message: parseResult.error.issues[0]?.message || "Input tidak valid.",
      };
    }

    const { email, code } = parseResult.data;
    const now = new Date();

    // Cari OTP aktif yang cocok
    const existingOtps = await db
      .select()
      .from(otps)
      .where(and(eq(otps.email, email), eq(otps.code, code), gt(otps.expiresAt, now)))
      .orderBy(desc(otps.createdAt))
      .limit(1);

    const validOtp = existingOtps[0];
    if (!validOtp || validOtp.usedAt !== null) {
      return {
        success: false,
        message: "Kode OTP salah atau telah kedaluwarsa. Silakan minta kode baru.",
      };
    }

    // Tandai OTP telah digunakan
    await db.update(otps).set({ usedAt: now }).where(eq(otps.id, validOtp.id));

    // Periksa apakah email ada di admin_allowlist
    const allowlisted = await db
      .select()
      .from(adminAllowlist)
      .where(eq(adminAllowlist.email, email))
      .limit(1);

    let assignedRole: UserRole = "STUDENT";
    if (allowlisted.length > 0) {
      assignedRole = allowlisted[0].role as UserRole;
    }

    // Cari user di database, atau buat baru jika belum ada
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    let userId: string;

    if (existingUsers.length > 0) {
      userId = existingUsers[0].id;
      // Perbarui role jika status allowlist berubah
      if (existingUsers[0].role !== assignedRole) {
        await db
          .update(users)
          .set({ role: assignedRole })
          .where(eq(users.id, userId));
      }
    } else {
      userId = crypto.randomUUID();
      await db.insert(users).values({
        id: userId,
        email,
        role: assignedRole,
      });
    }

    // Jika role siswa, pastikan draft registrasi awal tersedia
    if (assignedRole === "STUDENT") {
      const existingReg = await db
        .select()
        .from(registrations)
        .where(eq(registrations.userId, userId))
        .limit(1);

      if (existingReg.length === 0) {
        await db.insert(registrations).values({
          id: crypto.randomUUID(),
          userId,
          status: "DRAFT",
        });
      }
    }

    // Buat token sesi JWT (30 hari)
    const token = await signSession({
      userId,
      email,
      role: assignedRole,
    });

    // Pasang cookie HTTP-Only
    const cookieStore = await cookies();
    cookieStore.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });

    const redirectUrl =
      assignedRole === "STUDENT" ? "/dashboard" : "/admin/dashboard";

    return {
      success: true,
      message: "Verifikasi berhasil. Mengalihkan...",
      data: {
        role: assignedRole,
        redirectUrl,
      },
    };
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat memverifikasi kode OTP.",
    };
  }
}

/**
 * Server Action: Keluar dari akun (Sign Out).
 */
export async function signOutUser(): Promise<AuthActionResult> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    // Invalidasi session di database
    if (sessionCookie?.value) {
      await invalidateSession(sessionCookie.value);
    }

    cookieStore.delete(SESSION_COOKIE_NAME);

    return {
      success: true,
      message: "Anda telah berhasil keluar.",
    };
  } catch (error) {
    console.error("Error in signOutUser:", error);
    return {
      success: false,
      message: "Gagal memproses keluar akun.",
    };
  }
}
