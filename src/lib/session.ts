import { SignJWT, jwtVerify } from "jose";
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE, UserRole } from "./constants";

export interface SessionPayload {
  userId: string;
  email: string;
  role: UserRole;
  name?: string | null;
  expiresAt: number;
}

const secretKey =
  process.env.SESSION_SECRET ||
  "ppdb_super_secret_session_key_min_32_characters_long_12345";
const key = new TextEncoder().encode(secretKey);

export async function signSession(payload: Omit<SessionPayload, "expiresAt">): Promise<string> {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;

  return new SignJWT({ ...payload, expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(key);
}

export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch (err) {
    return null;
  }
}
