import { Metadata } from "next";
import { requireSuperAdmin } from "@/features/auth/auth";
import { getAllAdminAllowlist } from "@/features/auth/queries";
import { AdminAllowlistClient } from "./admin-allowlist-client";

export const metadata: Metadata = {
  title: "Pengaturan — Manajemen Administrator",
  description: "Kelola daftar email yang memiliki akses administrator SPMB.",
};

export default async function PengaturanPage() {
  const currentUser = await requireSuperAdmin();
  const admins = await getAllAdminAllowlist();

  return (
    <AdminAllowlistClient
      initialData={admins}
      currentUserEmail={currentUser.email}
    />
  );
}
