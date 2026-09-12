import { Metadata } from "next";
import { getAllRegistrations } from "@/features/registration/queries";
import { AdminRegistrationsTable } from "@/features/registration/components/admin-registrations-table";

export const metadata: Metadata = {
  title: "Data Pendaftar",
  description: "Kelola, filter, dan verifikasi data calon siswa baru.",
};

export default async function AdminPendaftarPage() {
  const registrations = await getAllRegistrations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Kelola Data Calon Siswa
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Daftar seluruh calon murid yang mendaftar. Lakukan verifikasi berkas atau instruksikan perbaikan jika terdapat ketidaksesuaian data.
        </p>
      </div>

      <AdminRegistrationsTable initialData={registrations} />
    </div>
  );
}
