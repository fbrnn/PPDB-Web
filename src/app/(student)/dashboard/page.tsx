import { Metadata } from "next";
import Link from "next/link";
import { getMyRegistration } from "@/features/registration/queries";
import {
  REGISTRATION_STATUS_LABELS,
  REGISTRATION_STATUS_SEVERITY,
} from "@/lib/constants";
import { Tag } from "primereact/tag";
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard Siswa",
  description: "Status pendaftaran dan ringkasan berkas SPMB.",
};

export default async function StudentDashboardPage() {
  const reg = await getMyRegistration();

  const statusConfig = {
    DRAFT: {
      title: "Pendaftaran Belum Dikirim (Draf)",
      desc: "Data formulir pendaftaran Anda telah tersimpan sebagai draf. Silakan lengkapi seluruh isian dan kirim pendaftaran sebelum batas akhir.",
      icon: Clock,
      color: "bg-blue-50 border-blue-200 text-blue-800",
      btnText: "Lanjutkan Isi Formulir",
    },
    SUBMITTED: {
      title: "Formulir Berhasil Dikirim",
      desc: "Pendaftaran Anda telah diterima dan sedang menunggu giliran verifikasi dokumen oleh panitia SPMB.",
      icon: CheckCircle2,
      color: "bg-amber-50 border-amber-200 text-amber-800",
      btnText: "Lihat Data Pendaftaran",
    },
    REVISION_REQUIRED: {
      title: "Perlu Perbaikan Berkas",
      desc: "Panitia SPMB menemukan adanya ketidaksesuaian berkas atau data. Silakan periksa catatan perbaikan dan kirim ulang formulir Anda.",
      icon: AlertCircle,
      color: "bg-red-50 border-red-200 text-red-800",
      btnText: "Perbaiki Formulir Sekarang",
    },
    VERIFIED: {
      title: "Pendaftaran Terverifikasi",
      desc: "Selamat! Seluruh berkas dan data pendaftaran Anda telah dinyatakan valid dan memenuhi syarat seleksi.",
      icon: CheckCircle2,
      color: "bg-emerald-50 border-emerald-200 text-emerald-800",
      btnText: "Lihat Bukti Pendaftaran",
    },
  };

  const currentConfig = statusConfig[reg.status];
  const IconComponent = currentConfig.icon;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
            Tahun Ajaran 2026/2027
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            Selamat Datang, {reg.fullName || "Calon Siswa Baru"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pantau status verifikasi dan tindak lanjut pendaftaran sekolah Anda di sini.
          </p>
        </div>

        <Link
          href="/pendaftaran"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-600/20 transition-all hover:scale-105"
        >
          <span>{currentConfig.btnText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Revision Notes Alert jika status REVISION_REQUIRED */}
      {reg.status === "REVISION_REQUIRED" && (
        <div className="p-6 bg-red-50 rounded-2xl border border-red-200 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-red-900">
              Catatan Perbaikan dari Panitia Seleksi
            </h3>
            <p className="text-sm text-red-700 leading-relaxed">
              {reg.revisionNotes ||
                "Mohon periksa kembali kelengkapan NISN, NIK, dan nama sekolah asal pada formulir Anda."}
            </p>
            <div className="pt-2">
              <Link
                href="/pendaftaran"
                className="text-xs font-bold text-red-800 underline hover:text-red-900"
              >
                Klik di sini untuk membuka formulir & melakukan koreksi &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Status Card & Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card */}
        <div className={`p-6 rounded-2xl border ${currentConfig.color} md:col-span-2 space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <IconComponent className="w-6 h-6" />
              <h2 className="text-lg font-bold">{currentConfig.title}</h2>
            </div>
            <Tag
              value={REGISTRATION_STATUS_LABELS[reg.status]}
              severity={REGISTRATION_STATUS_SEVERITY[reg.status]}
              className="text-xs px-3 py-1"
            />
          </div>
          <p className="text-xs sm:text-sm leading-relaxed opacity-90">
            {currentConfig.desc}
          </p>

          <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between text-xs gap-3">
            <div>
              <span className="opacity-70">Waktu Terakhir Disimpan: </span>
              <span className="font-semibold">
                {reg.updatedAt
                  ? new Date(reg.updatedAt).toLocaleString("id-ID")
                  : "-"}
              </span>
            </div>
            {reg.submittedAt && (
              <div>
                <span className="opacity-70">Waktu Pengiriman: </span>
                <span className="font-semibold">
                  {new Date(reg.submittedAt).toLocaleString("id-ID")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Informasi Bantuan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <Info className="w-4 h-4 text-blue-600" />
            <span>Butuh Bantuan?</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Jika Anda mengalami kendala teknis atau memiliki pertanyaan terkait persyaratan berkas, hubungi panitia melalui WhatsApp.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
            >
              <i className="pi pi-whatsapp text-emerald-600 text-sm" />
              <span>WhatsApp Sekretariat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Ringkasan Isian */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-800">
              Ringkasan Data Pendaftaran
            </h3>
          </div>
          <Link
            href="/pendaftaran"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            Buka Formulir Lengkap &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] text-slate-400 font-medium">Nama Lengkap</div>
            <div className="text-sm font-bold text-slate-800 mt-1">
              {reg.fullName || "(Belum diisi)"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] text-slate-400 font-medium">NISN</div>
            <div className="text-sm font-bold text-slate-800 mt-1">
              {reg.nisn || "(Belum diisi)"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] text-slate-400 font-medium">Sekolah Asal</div>
            <div className="text-sm font-bold text-slate-800 mt-1">
              {reg.previousSchoolName || "(Belum diisi)"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] text-slate-400 font-medium">Kota Domisili</div>
            <div className="text-sm font-bold text-slate-800 mt-1">
              {reg.city || "(Belum diisi)"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
