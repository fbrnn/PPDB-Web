"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { teachers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/features/auth/auth";
import { insertTeacherSchema } from "./schemas";
import { ActionResponse, InsertTeacherInput } from "./types";

export async function createTeacher(data: InsertTeacherInput): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const validatedData = insertTeacherSchema.parse(data);

    await db.insert(teachers).values({
      name: validatedData.name,
      subject: validatedData.subject,
      imageUrl: validatedData.imageUrl,
      displayOrder: validatedData.displayOrder,
    });

    revalidatePath("/");
    revalidatePath("/admin/guru");

    return { success: true, message: "Data guru berhasil ditambahkan." };
  } catch (error: any) {
    console.error("Failed to create teacher:", error);
    return { success: false, message: error.message || "Gagal menambahkan data guru." };
  }
}

export async function updateTeacher(id: number, data: InsertTeacherInput): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const validatedData = insertTeacherSchema.parse(data);

    await db.update(teachers)
      .set({
        name: validatedData.name,
        subject: validatedData.subject,
        imageUrl: validatedData.imageUrl,
        displayOrder: validatedData.displayOrder,
      })
      .where(eq(teachers.id, id));

    revalidatePath("/");
    revalidatePath("/admin/guru");

    return { success: true, message: "Data guru berhasil diperbarui." };
  } catch (error: any) {
    console.error("Failed to update teacher:", error);
    return { success: false, message: error.message || "Gagal memperbarui data guru." };
  }
}

export async function deleteTeacher(id: number): Promise<ActionResponse> {
  try {
    await requireAdmin();

    await db.delete(teachers).where(eq(teachers.id, id));

    revalidatePath("/");
    revalidatePath("/admin/guru");

    return { success: true, message: "Data guru berhasil dihapus." };
  } catch (error: any) {
    console.error("Failed to delete teacher:", error);
    return { success: false, message: error.message || "Gagal menghapus data guru." };
  }
}
