import crypto from "crypto";
import { eq } from "drizzle-orm";
import { db } from "./index";
import { adminAllowlist, users } from "./schema";

async function seed() {
  console.log("🌱 Memulai seeding data awal SPMB...");

  const defaultAdminEmail = "smkpgri02mejayan@gmail.com";

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
    // Pastikan role-nya SUPER_ADMIN jika sudah ada
    await db
      .update(adminAllowlist)
      .set({ role: "SUPER_ADMIN" })
      .where(eq(adminAllowlist.email, defaultAdminEmail));
    console.log(`ℹ ${defaultAdminEmail} sudah terdaftar di admin_allowlist (dipastikan SUPER_ADMIN).`);
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
    await db
      .update(users)
      .set({ role: "SUPER_ADMIN" })
      .where(eq(users.email, defaultAdminEmail));
    console.log(`ℹ Akun pengguna untuk ${defaultAdminEmail} sudah ada (role dipastikan SUPER_ADMIN).`);
  }

  console.log("🎉 Seeding selesai!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Gagal melakukan seeding:", err);
  process.exit(1);
});
