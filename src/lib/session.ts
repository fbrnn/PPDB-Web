import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { eq, lt } from "drizzle-orm";
import { db } from "@/db";
import { sessions } from "@/db/schema";
import { SESSION_MAX_AGE, UserRole } from "./constants";

export interface SessionPayload {
  userId: string;
  email: string;
  role: UserRole;
  name?: string | null;
  sessionId: string;
  expiresAt: number;
}

const secretKey =
  process.env.SESSION_SECRET ||
  "ppdb_super_secret_session_key_min_32_characters_long_12345";
const key = new TextEncoder().encode(secretKey);

/**
 * Hash token untuk disimpan di database (tidak menyimpan raw token).
 */
function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Membuat session baru: JWT token + record di database.
 */
export async function signSession(
  payload: Omit<SessionPayload, "expiresAt" | "sessionId">
): Promise<string> {
  const sessionId = crypto.randomUUID();
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const expiresAtDate = new Date(expiresAt * 1000);

  const token = await new SignJWT({ ...payload, sessionId, expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(key);

  // Simpan session ke database
  const tokenHash = hashToken(token);
  await db.insert(sessions).values({
    id: sessionId,
    userId: payload.userId,
    tokenHash,
    expiresAt: expiresAtDate,
  });

  // Lazy cleanup: hapus session expired milik user ini (max 1x per login)
  await db
    .delete(sessions)
    .where(lt(sessions.expiresAt, new Date()))
    .catch(() => {
      // Non-critical, jangan gagalkan login
    });

  return token;
}

/**
 * Verifikasi session: cek JWT + cek session masih ada di database.
 */
export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    const sessionPayload = payload as unknown as SessionPayload;

    // Verifikasi session masih aktif di database
    const tokenHash = hashToken(token);
    const dbSession = await db.query.sessions.findFirst({
      where: eq(sessions.tokenHash, tokenHash),
    });

    if (!dbSession) {
      // Session sudah di-revoke atau tidak ditemukan
      return null;
    }

    // Sliding session: update last_active_at jika sudah >1 jam sejak update terakhir
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (dbSession.lastActiveAt < oneHourAgo) {
      await db
        .update(sessions)
        .set({ lastActiveAt: new Date() })
        .where(eq(sessions.id, dbSession.id))
        .catch(() => {
          // Non-critical
        });
    }

    return sessionPayload;
  } catch {
    return null;
  }
}

/**
 * Invalidasi satu session (logout).
 */
export async function invalidateSession(token: string): Promise<void> {
  const tokenHash = hashToken(token);
  await db.delete(sessions).where(eq(sessions.tokenHash, tokenHash));
}

/**
 * Invalidasi semua session milik satu user (force logout dari semua device).
 */
export async function invalidateAllUserSessions(
  userId: string
): Promise<void> {
  await db.delete(sessions).where(eq(sessions.userId, userId));
}

