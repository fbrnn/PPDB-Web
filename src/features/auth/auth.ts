import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME, USER_ROLES } from "@/lib/constants";
import { verifySession } from "@/lib/session";
import { CurrentUser } from "./types";

/**
 * Mendapatkan user yang sedang aktif dari sesi cookie (jika ada).
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  const payload = await verifySession(sessionCookie.value);
  if (!payload) {
    return null;
  }

  return {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
    name: payload.name,
  };
}

/**
 * Memastikan user telah terotentikasi. Jika belum, redirect ke halaman login.
 */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

/**
 * Memastikan user memiliki hak akses ADMIN atau SUPER_ADMIN.
 */
export async function requireAdmin(): Promise<CurrentUser> {
  const user = await requireUser();
  if (user.role !== USER_ROLES.ADMIN && user.role !== USER_ROLES.SUPER_ADMIN) {
    redirect("/dashboard");
  }
  return user;
}

/**
 * Memastikan user memiliki hak akses SUPER_ADMIN.
 */
export async function requireSuperAdmin(): Promise<CurrentUser> {
  const user = await requireUser();
  if (user.role !== USER_ROLES.SUPER_ADMIN) {
    redirect("/admin/dashboard");
  }
  return user;
}
