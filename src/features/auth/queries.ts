import { db } from "@/db";
import { adminAllowlist } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

/**
 * Mendapatkan seluruh daftar admin dari admin_allowlist.
 */
export async function getAllAdminAllowlist() {
  try {
    return await db.query.adminAllowlist.findMany({
      orderBy: [asc(adminAllowlist.createdAt)],
    });
  } catch (error) {
    console.error("Failed to fetch admin allowlist:", error);
    return [];
  }
}

/**
 * Menghitung jumlah SUPER_ADMIN di admin_allowlist.
 */
export async function countSuperAdmins(): Promise<number> {
  try {
    const results = await db
      .select()
      .from(adminAllowlist)
      .where(eq(adminAllowlist.role, "SUPER_ADMIN"));
    return results.length;
  } catch (error) {
    console.error("Failed to count super admins:", error);
    return 0;
  }
}
