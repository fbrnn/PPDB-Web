import { Metadata } from "next";
import Link from "next/link";
import { getRegistrationStats, getAllRegistrations } from "@/features/registration/queries";
import {
  REGISTRATION_STATUS_LABELS,
  REGISTRATION_STATUS_SEVERITY,
} from "@/lib/constants";
import { Tag } from "primereact/tag";
import { Users, Clock, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard Admin",
  description: "Statistik dan ringkasan pendaftaran SPMB.",
};

export default async function AdminDashboardPage() {
  const stats = await getRegistrationStats();
  const recentRegistrations = await getAllRegistrations();
  const topFive = recentRegistrations.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Ringkasan Statistik Pendaftaran
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Data real-time penerimaan calon siswa baru tahun ajaran 2026/2027.
          </p>
        </div>

        <Link
          href="/admin/pendaftar"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <span>Kelola Semua Pendaftar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Pendaftar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500">Total Akun Terdaftar</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">
              {stats.total}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Semua pendaftar</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Menunggu Verifikasi */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-amber-700">Menunggu Verifikasi</div>
            <div className="text-3xl font-extrabold text-amber-600 mt-2">
              {stats.submitted}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Perlu segera dicek</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Perlu Perbaikan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-red-700">Perlu Perbaikan</div>
            <div className="text-3xl font-extrabold text-red-600 mt-2">
              {stats.revisionRequired}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Menunggu revisi siswa</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Terverifikasi */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-emerald-700">Terverifikasi Sah</div>
            <div className="text-3xl font-extrabold text-emerald-600 mt-2">
              {stats.verified}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Dokumen lengkap & valid</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Pendaftar Terbaru */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">
            Aktivitas Pendaftaran Terbaru
          </h2>
          <Link
            href="/admin/pendaftar"
            className="text-xs font-semibold text-red-600 hover:text-red-800"
          >
            Lihat Tabel Lengkap &rarr;
          </Link>
        </div>

        {topFive.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Belum ada data pendaftar masuk.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-4">Email Akun</th>
                  <th className="py-3 px-4">NISN</th>
                  <th className="py-3 px-4">Asal Sekolah</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Tanggal Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topFive.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {row.fullName || "(Belum mengisi nama)"}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{row.userEmail}</td>
                    <td className="py-3.5 px-4 text-slate-600">{row.nisn || "-"}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {row.previousSchoolName || "-"}
                    </td>
                    <td className="py-3.5 px-4">
                      <Tag
                        value={REGISTRATION_STATUS_LABELS[row.status]}
                        severity={REGISTRATION_STATUS_SEVERITY[row.status]}
                        className="text-[10px] px-2 py-0.5"
                      />
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {new Date(row.updatedAt).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
