"use client";

import React from "react";
import { Check, Compass, Target, HeartHandshake, FileText, UserCheck, Send, Award } from "lucide-react";

export function About() {
  const steps = [
    {
      num: "01",
      title: "Masuk via Email OTP",
      desc: "Masukkan alamat email aktif Anda tanpa perlu menghafal kata sandi.",
      icon: Send,
    },
    {
      num: "02",
      title: "Pengisian Formulir Multi-Step",
      desc: "Lengkapi data pribadi siswa, alamat domisili, sekolah asal, dan data orang tua.",
      icon: FileText,
    },
    {
      num: "03",
      title: "Autosave & Simpan Draf",
      desc: "Data disimpan otomatis ke sistem. Anda dapat melanjutkan pengisian kapan saja.",
      icon: Target,
    },
    {
      num: "04",
      title: "Verifikasi Berkas & Pengumuman",
      desc: "Tim panitia SPMB memverifikasi berkas dan mengumumkan hasil seleksi secara online.",
      icon: UserCheck,
    },
  ];

  return (
    <section id="tentang" className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About School Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Profil & Nilai Utama</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
              Membentuk Generasi Berilmu, Berdaya Saing Global, dan Berakhlak Mulia
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Lembaga pendidikan kami berkomitmen menyediakan lingkungan belajar
              yang inklusif, modern, dan berorientasi pada kemajuan teknologi serta
              pembentukan integritas moral peserta didik.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Kurikulum Merdeka Terintegrasi</h3>
                  <p className="text-xs text-slate-500">Mendorong eksplorasi minat, bakat, dan proyek riset inovatif siswa.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Tenaga Pendidik Profesional & Tersertifikasi</h3>
                  <p className="text-xs text-slate-500">Guru berdedikasi tinggi dengan latar belakang akademik unggul.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Jaringan Kemitraan Kampus & Industri</h3>
                  <p className="text-xs text-slate-500">Peluang beasiswa lanjutan dan magang industri terkemuka.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Visi Sekolah</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Menjadi sentra pendidikan terkemuka dalam menghasilkan lulusan yang cerdas intelektual, emosional, dan berjiwa kepemimpinan.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Misi Utama</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Menyelenggarakan pembelajaran berbasis teknologi mutakhir dan pembinaan kepribadian yang berbudi pekerti luhur.
              </p>
            </div>
          </div>
        </div>

        {/* Alur Pendaftaran */}
        <div id="alur" className="pt-12 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Alur Pendaftaran Online yang Mudah
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Empat langkah praktis menyelesaikan proses pendaftaran calon siswa baru dari mana saja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="relative bg-slate-50 p-6 rounded-2xl border border-slate-200/70 hover:shadow-md transition-all group"
                >
                  <div className="text-3xl font-extrabold text-blue-200/80 mb-3 group-hover:text-blue-600 transition-colors">
                    {step.num}
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-white text-blue-600 flex items-center justify-center shadow-sm mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
