import crypto from "crypto";
import { eq } from "drizzle-orm";
import { db } from "./index";
import { adminAllowlist, users } from "./schema";

async function seed() {
  console.log("🌱 Memulai seeding data awal SPMB...");

  const defaultAdminEmail = "admin@sekolah.sch.id";

  // Cek apakah admin sudah ada di admin_allowlist
  const existingAllowlist = await db
    .select()
    .from(adminAllowlist)
    .where(eq(adminAllowlist.email, defaultAdminEmail))
    .limit(1);

  if (existingAllowlist.length === 0) {
    const allowlistId = crypto.randomUUID();
    await db.insert(adminAllowlist).values({
      id: allowlistId,
      email: defaultAdminEmail,
      role: "SUPER_ADMIN",
    });
    console.log(`✓ Menambahkan ${defaultAdminEmail} ke admin_allowlist (SUPER_ADMIN)`);
  } else {
    console.log(`ℹ ${defaultAdminEmail} sudah terdaftar di admin_allowlist.`);
  }

  // Cek apakah user sudah dibuat
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, defaultAdminEmail))
    .limit(1);

  if (existingUser.length === 0) {
    await db.insert(users).values({
      id: crypto.randomUUID(),
      email: defaultAdminEmail,
      name: "Administrator Utama",
      role: "SUPER_ADMIN",
    });
    console.log(`✓ Akun pengguna awal untuk ${defaultAdminEmail} berhasil dibuat.`);
  } else {
    console.log(`ℹ Akun pengguna untuk ${defaultAdminEmail} sudah ada.`);
  }

  console.log("🎉 Seeding selesai!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Gagal melakukan seeding:", err);
  process.exit(1);
});
