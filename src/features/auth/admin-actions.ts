"use server";

import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adminAllowlist, users } from "@/db/schema";
import { requireSuperAdmin } from "./auth";
import { addAdminSchema, AddAdminInput } from "./schemas";
import { AuthActionResult } from "./types";
import { countSuperAdmins } from "./queries";

/**
 * Server Action: Menambahkan email baru ke admin allowlist.
 * Hanya dapat diakses oleh SUPER_ADMIN.
 */
export async function addAdminToAllowlist(
  data: AddAdminInput
): Promise<AuthActionResult> {
  try {
    await requireSuperAdmin();

    const parsed = addAdminSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message || "Data tidak valid.",
      };
    }

    const { email, role } = parsed.data;

    // Cek apakah email sudah ada di allowlist
    const existing = await db
      .select()
      .from(adminAllowlist)
      .where(eq(adminAllowlist.email, email))
      .limit(1);

    if (existing.length > 0) {
      return {
        success: false,
        message: "Email ini sudah terdaftar sebagai administrator.",
      };
    }

    await db.insert(adminAllowlist).values({
      id: crypto.randomUUID(),
      email,
      role,
    });

    revalidatePath("/admin/pengaturan");

    return {
      success: true,
      message: `${email} berhasil ditambahkan sebagai ${role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}.`,
    };
  } catch (error) {
    console.error("Error in addAdminToAllowlist:", error);
    return {
      success: false,
      message: "Gagal menambahkan administrator.",
    };
  }
}

/**
 * Server Action: Mengubah role admin di allowlist.
 * Hanya dapat diakses oleh SUPER_ADMIN.
 */
export async function updateAdminRole(
  id: string,
  newRole: "ADMIN" | "SUPER_ADMIN"
): Promise<AuthActionResult> {
  try {
    const currentUser = await requireSuperAdmin();

    // Cari entry yang akan diubah
    const target = await db
      .select()
      .from(adminAllowlist)
      .where(eq(adminAllowlist.id, id))
      .limit(1);

    if (target.length === 0) {
      return {
        success: false,
        message: "Data administrator tidak ditemukan.",
      };
    }

    const targetEntry = target[0];

    // Proteksi: jika mengubah Super Admin menjadi Admin, pastikan masih ada minimal 1 Super Admin lain
    if (targetEntry.role === "SUPER_ADMIN" && newRole === "ADMIN") {
      const superAdminCount = await countSuperAdmins();
      if (superAdminCount <= 1) {
        return {
          success: false,
          message:
            "Tidak dapat mengubah role. Minimal harus ada satu Super Admin di sistem.",
        };
      }
    }

    await db
      .update(adminAllowlist)
      .set({ role: newRole })
      .where(eq(adminAllowlist.id, id));

    // Sinkronkan role di tabel users jika user sudah pernah login
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, targetEntry.email))
      .limit(1);

    if (existingUser.length > 0) {
      await db
        .update(users)
        .set({ role: newRole })
        .where(eq(users.email, targetEntry.email));
    }

    revalidatePath("/admin/pengaturan");

    return {
      success: true,
      message: `Role berhasil diubah menjadi ${newRole === "SUPER_ADMIN" ? "Super Admin" : "Admin"}.`,
    };
  } catch (error) {
    console.error("Error in updateAdminRole:", error);
    return {
      success: false,
      message: "Gagal mengubah role administrator.",
    };
  }
}

/**
 * Server Action: Menghapus admin dari allowlist.
 * Hanya dapat diakses oleh SUPER_ADMIN.
 */
export async function removeAdminFromAllowlist(
  id: string
): Promise<AuthActionResult> {
  try {
    const currentUser = await requireSuperAdmin();

    // Cari entry yang akan dihapus
    const target = await db
      .select()
      .from(adminAllowlist)
      .where(eq(adminAllowlist.id, id))
      .limit(1);

    if (target.length === 0) {
      return {
        success: false,
        message: "Data administrator tidak ditemukan.",
      };
    }

    const targetEntry = target[0];

    // Proteksi: tidak bisa menghapus diri sendiri
    if (targetEntry.email === currentUser.email) {
      return {
        success: false,
        message:
          "Anda tidak dapat menghapus akun Anda sendiri dari daftar administrator.",
      };
    }

    // Proteksi: jika target adalah Super Admin, pastikan masih ada minimal 1 Super Admin lain
    if (targetEntry.role === "SUPER_ADMIN") {
      const superAdminCount = await countSuperAdmins();
      if (superAdminCount <= 1) {
        return {
          success: false,
          message:
            "Tidak dapat menghapus. Minimal harus ada satu Super Admin di sistem.",
        };
      }
    }

    await db.delete(adminAllowlist).where(eq(adminAllowlist.id, id));

    // Downgrade user ke STUDENT jika sudah pernah login
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, targetEntry.email))
      .limit(1);

    if (existingUser.length > 0) {
      await db
        .update(users)
        .set({ role: "STUDENT" })
        .where(eq(users.email, targetEntry.email));
    }

    revalidatePath("/admin/pengaturan");

    return {
      success: true,
      message: `${targetEntry.email} berhasil dihapus dari daftar administrator.`,
    };
  } catch (error) {
    console.error("Error in removeAdminFromAllowlist:", error);
    return {
      success: false,
      message: "Gagal menghapus administrator.",
    };
  }
}
