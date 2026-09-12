import { db } from "@/db";
import { teachers } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function getTeachers() {
  try {
    return await db.query.teachers.findMany({
      orderBy: [asc(teachers.displayOrder), asc(teachers.name)],
    });
  } catch (error) {
    console.error("Failed to fetch teachers:", error);
    return [];
  }
}
