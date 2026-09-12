import crypto from "crypto";
import { eq, desc, count } from "drizzle-orm";
import { db } from "@/db";
import { registrations, users, Registration } from "@/db/schema";
import { requireUser, requireAdmin } from "@/features/auth/auth";

/**
 * Mengambil data pendaftaran milik user yang sedang aktif.
 * Validasi kepemilikan selalu dilakukan di sisi server berdasarkan session.
 */
export async function getMyRegistration(): Promise<Registration> {
  const user = await requireUser();

  const existing = await db
    .select()
    .from(registrations)
    .where(eq(registrations.userId, user.userId))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  // Jika belum ada record pendaftaran untuk user ini, buat draf baru
  const newRegistrationId = crypto.randomUUID();
  await db.insert(registrations).values({
    id: newRegistrationId,
    userId: user.userId,
    status: "DRAFT",
  });

  const created = await db
    .select()
    .from(registrations)
    .where(eq(registrations.id, newRegistrationId))
    .limit(1);

  return created[0];
}

export interface RegistrationListItem extends Registration {
  userEmail: string;
}

/**
 * Mengambil seluruh data pendaftaran untuk panel admin.
 * Hanya dapat dipanggil oleh ADMIN atau SUPER_ADMIN.
 */
export async function getAllRegistrations(): Promise<RegistrationListItem[]> {
  await requireAdmin();

  const rows = await db
    .select({
      registration: registrations,
      userEmail: users.email,
    })
    .from(registrations)
    .innerJoin(users, eq(registrations.userId, users.id))
    .orderBy(desc(registrations.updatedAt));

  return rows.map((r) => ({
    ...r.registration,
    userEmail: r.userEmail,
  }));
}

export interface RegistrationStats {
  total: number;
  draft: number;
  submitted: number;
  revisionRequired: number;
  verified: number;
}

/**
 * Mengambil statistik ringkasan pendaftaran untuk dashboard admin.
 */
export async function getRegistrationStats(): Promise<RegistrationStats> {
  await requireAdmin();

  const allRegs = await db.select().from(registrations);

  return {
    total: allRegs.length,
    draft: allRegs.filter((r) => r.status === "DRAFT").length,
    submitted: allRegs.filter((r) => r.status === "SUBMITTED").length,
    revisionRequired: allRegs.filter((r) => r.status === "REVISION_REQUIRED")
      .length,
    verified: allRegs.filter((r) => r.status === "VERIFIED").length,
  };
}
