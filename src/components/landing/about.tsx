"use client";

import React from "react";
import { 
  Check, 
  Compass, 
  Target, 
  FileText, 
  UserCheck, 
  Send,
  Building,
  Quote,
  Wrench,
  Calculator,
  Store
} from "lucide-react";
import { motion } from "motion/react";
import { Teacher } from "@/features/teachers/types";

interface AboutProps {
  teachers?: Teacher[];
}

export function About({ teachers = [] }: AboutProps) {
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
        
        {/* Profil & Sejarah */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
              <Building className="w-3.5 h-3.5" />
              <span>Profil Sekolah</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
              SMK PGRI 2 Mejayan
            </h2>
            
            <div className="prose prose-slate text-slate-600 mb-8 leading-relaxed text-sm sm:text-base">
              <p className="mb-4">
                <strong className="text-slate-800">Sejarah Singkat:</strong> SMK PGRI 2 Mejayan didirikan pada 11 Juli 2002 berdasarkan SK Pendirian Nomor 421.5/241/180.09/2002. Sejak berdiri, SMK PGRI 2 Mejayan berkomitmen menyelenggarakan pendidikan kejuruan yang berkualitas dengan membekali peserta didik melalui pengetahuan, keterampilan, dan karakter yang sesuai dengan kebutuhan dunia kerja.
              </p>
              <p>
                Hingga saat ini, kami terus berkembang dan berupaya mencetak lulusan yang kompeten, berkarakter, serta siap melanjutkan pendidikan maupun memasuki dunia kerja.
              </p>
            </div>

            {/* Identitas Sekolah Box */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Identitas Sekolah</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm">
                <div>
                  <dt className="text-slate-500 mb-1">NPSN</dt>
                  <dd className="font-medium text-slate-900">20507696</dd>
                </div>
                <div>
                  <dt className="text-slate-500 mb-1">Status / Akreditasi</dt>
                  <dd className="font-medium text-slate-900">Swasta / B</dd>
                </div>
                <div>
                  <dt className="text-slate-500 mb-1">Tahun Berdiri</dt>
                  <dd className="font-medium text-slate-900">11 Juli 2002</dd>
                </div>
                <div>
                  <dt className="text-slate-500 mb-1">Nomor Telepon</dt>
                  <dd className="font-medium text-slate-900">+62 856-0792-7791</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-slate-500 mb-1">Alamat Lengkap</dt>
                  <dd className="font-medium text-slate-900">Jalan Panglima Sudirman No.69 Mejayan, Kab. Madiun</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="space-y-6">
            {/* Sambutan Kepala Sekolah */}
            <div className="bg-blue-50 p-6 md:p-8 rounded-3xl border border-blue-100 relative overflow-hidden">
              <Quote className="absolute right-4 bottom-4 w-24 h-24 text-blue-100/50" />
              <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl bg-white p-1.5 shadow-sm border border-slate-200">
                  <div className="w-full h-full bg-slate-100 rounded-xl overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/dra sutini.png" alt="Dra. Sutini" className="w-full h-full object-cover scale-[1.6] origin-[50%_15%]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Dra. Sutini</h3>
                  <p className="text-blue-700 text-sm font-semibold mb-3">Kepala Sekolah</p>
                  <p className="text-slate-700 text-sm italic leading-relaxed">
                    "Selamat datang di SMK PGRI 2 Mejayan. Mari bersama mencetak generasi penerus bangsa yang cerdas, terampil, dan berakhlak mulia, siap bersaing di dunia kerja maupun jenjang pendidikan lanjutan."
                  </p>
                </div>
              </div>
            </div>

            {/* Visi Misi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Visi</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Meningkatkan kecerdasan kepribadian, akhlak mulia, serta keterampilan untuk hidup mandiri dan mengikuti pendidikan lebih lanjut sesuai dengan kejuruan.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Misi Utama</h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-outside ml-4">
                  <li>Menyiapkan siswa berfikir positif, kreatif, inovatif.</li>
                  <li>Meningkatkan kepribadian, disiplin & mandiri.</li>
                  <li>Menciptakan lulusan siap kerja di era globalisasi.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Profil Guru / Tenaga Pendidik */}
        <div className="mb-24 pt-12 border-t border-slate-100">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4"
            >
              Tenaga Pendidik
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 text-sm mt-2"
            >
              Didukung oleh tenaga pendidik profesional dan berpengalaman di bidangnya untuk mencetak lulusan yang cerdas dan siap kerja.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={teacher.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=0ea5e9&color=fff&size=400`} 
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <span className="text-white text-[10px] sm:text-sm font-semibold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100 border border-white/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                      Lihat Profil
                    </span>
                  </div>
                </div>
                
                <div className="p-3 sm:p-5 text-center bg-white relative z-10">
                  <h3 className="text-sm sm:text-lg font-bold text-slate-800 mb-1.5 sm:mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {teacher.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-medium text-slate-500 bg-slate-50 inline-block px-2 sm:px-3 py-1 rounded-full border border-slate-100">
                    {teacher.subject}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Program Keahlian */}
        <div className="mb-24 pt-12 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Program Keahlian</h2>
            <p className="text-slate-500 mt-2">Pilihan jurusan kompeten yang disesuaikan dengan kebutuhan industri modern.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* TKR */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
              <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                <Wrench className="w-12 h-12 text-slate-300 group-hover:text-blue-400 transition-colors" />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
                  Teknik Otomotif
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Teknik Kendaraan Ringan (TKR)</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                  Membekali siswa dengan kompetensi perbaikan dan perawatan kendaraan bermotor roda empat sesuai standar industri.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-600">Perawatan Mesin & Chasis</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-600">Sistem Kelistrikan Kendaraan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-600">Mekanik, Perakitan & Wirausaha</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Akuntansi */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
              <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                <Calculator className="w-12 h-12 text-slate-300 group-hover:text-emerald-400 transition-colors" />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3">
                  Bisnis & Manajemen
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Akuntansi</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                  Menyiapkan tenaga terampil di bidang administrasi keuangan, perpajakan, dan pelaporan akuntansi perusahaan.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-600">Komputer Akuntansi (MYOB)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-600">Administrasi Perpajakan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-600">Staff Keuangan & Teller</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Administrasi/Penjualan */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
              <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                <Store className="w-12 h-12 text-slate-300 group-hover:text-indigo-400 transition-colors" />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
                  Bisnis & Pemasaran
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Pemasaran / Penjualan</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                  Mendidik siswa menjadi profesional di bidang marketing, ritel, dan wirausaha bisnis daring maupun luring.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-600">Marketing & Bisnis Daring</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-600">Pengelolaan Ritel & Kasir</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-600">Sales Executive & Pramuniaga</span>
                  </div>
                </div>
              </div>
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
