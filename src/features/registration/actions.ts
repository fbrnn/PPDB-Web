"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { registrations } from "@/db/schema";
import { requireUser, requireAdmin } from "@/features/auth/auth";
import {
  registrationDraftSchema,
  registrationSubmitSchema,
  RegistrationDraftInput,
  RegistrationSubmitInput,
} from "./schemas";
import { RegistrationActionResult } from "./types";

/**
 * Server Action: Autosave & Simpan Draf Pendaftaran.
 */
export async function saveRegistrationDraft(
  inputData: RegistrationDraftInput
): Promise<RegistrationActionResult> {
  try {
    const user = await requireUser();

    // Pastikan user adalah STUDENT atau berhak menyimpan pendaftaran pribadinya
    const existing = await db
      .select()
      .from(registrations)
      .where(eq(registrations.userId, user.userId))
      .limit(1);

    if (!existing.length) {
      return {
        success: false,
        message: "Data pendaftaran tidak ditemukan.",
      };
    }

    const currentReg = existing[0];
    if (currentReg.status === "VERIFIED") {
      return {
        success: false,
        message: "Pendaftaran Anda telah diverifikasi dan tidak dapat diubah lagi.",
      };
    }

    const parseResult = registrationDraftSchema.safeParse(inputData);
    if (!parseResult.success) {
      return {
        success: false,
        message: parseResult.error.issues[0]?.message || "Format data tidak valid.",
      };
    }

    const dataToUpdate = parseResult.data;

    await db
      .update(registrations)
      .set({
        ...dataToUpdate,
        updatedAt: new Date(),
      })
      .where(eq(registrations.id, currentReg.id));

    revalidatePath("/pendaftaran");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Draf berhasil disimpan secara otomatis ke server.",
    };
  } catch (error) {
    console.error("Error in saveRegistrationDraft:", error);
    return {
      success: false,
      message: "Gagal menyimpan draf ke database.",
    };
  }
}

/**
 * Server Action: Pengiriman Final Formulir Pendaftaran (Submit).
 */
export async function submitRegistration(
  inputData: RegistrationSubmitInput & RegistrationDraftInput
): Promise<RegistrationActionResult> {
  try {
    const user = await requireUser();

    const existing = await db
      .select()
      .from(registrations)
      .where(eq(registrations.userId, user.userId))
      .limit(1);

    if (!existing.length) {
      return {
        success: false,
        message: "Data pendaftaran tidak ditemukan.",
      };
    }

    const currentReg = existing[0];
    if (currentReg.status === "VERIFIED") {
      return {
        success: false,
        message: "Pendaftaran Anda sudah terverifikasi.",
      };
    }

    // Validasi semua isian wajib
    const parseResult = registrationSubmitSchema.safeParse(inputData);
    if (!parseResult.success) {
      return {
        success: false,
        message: parseResult.error.issues[0]?.message || "Mohon lengkapi semua kolom wajib.",
      };
    }

    const validData = parseResult.data;

    // Simpan semua data dan ubah status ke SUBMITTED
    await db
      .update(registrations)
      .set({
        ...inputData,
        ...validData,
        status: "SUBMITTED",
        submittedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(registrations.id, currentReg.id));

    revalidatePath("/pendaftaran");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Pendaftaran berhasil dikirim! Berkas Anda sedang menunggu verifikasi panitia.",
    };
  } catch (error) {
    console.error("Error in submitRegistration:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat mengirimkan pendaftaran.",
    };
  }
}

/**
 * Server Action: Mengubah status pendaftaran oleh Administrator (Verifikasi / Minta Revisi).
 */
export async function updateRegistrationStatus(
  registrationId: string,
  status: "DRAFT" | "SUBMITTED" | "REVISION_REQUIRED" | "VERIFIED",
  revisionNotes?: string
): Promise<RegistrationActionResult> {
  try {
    const admin = await requireAdmin();

    const existing = await db
      .select()
      .from(registrations)
      .where(eq(registrations.id, registrationId))
      .limit(1);

    if (existing.length === 0) {
      return {
        success: false,
        message: "Pendaftaran tidak ditemukan.",
      };
    }

    const updates: Partial<typeof registrations.$inferInsert> = {
      status,
      revisionNotes: revisionNotes ?? null,
      updatedAt: new Date(),
    };

    if (status === "VERIFIED") {
      updates.verifiedAt = new Date();
    }

    await db
      .update(registrations)
      .set(updates)
      .where(eq(registrations.id, registrationId));

    revalidatePath("/admin/pendaftar");
    revalidatePath("/admin/dashboard");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: `Status pendaftaran berhasil diubah menjadi ${status}.`,
    };
  } catch (error) {
    console.error("Error in updateRegistrationStatus:", error);
    return {
      success: false,
      message: "Gagal memperbarui status pendaftaran.",
    };
  }
}

