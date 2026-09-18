"use client";

import React from "react";
import { Calendar, Bell, FileCheck, Info, Clock } from "lucide-react";

export function News() {
  const schedule = [
    {
      stage: "Gelombang I",
      dates: "1 Desember 2025 – 31 Januari 2026",
      status: "Selesai",
      color: "bg-slate-400",
    },
    {
      stage: "Gelombang II",
      dates: "1 Februari – 15 April 2026",
      status: "Selesai",
      color: "bg-slate-400",
    },
    {
      stage: "Gelombang III",
      dates: "16 April – 30 Juni 2026",
      status: "Selesai",
      color: "bg-slate-400",
    },
  ];

  const announcements = [
    {
      tag: "Pengumuman",
      title: "Jadwal dan Panduan Verifikasi Dokumen Asli Calon Siswa Baru",
      date: "04 Maret 2026",
      summary: "Bagi pendaftar yang telah mengisi formulir online, pastikan membawa fotokopi KK, Akta Kelahiran, dan Surat Keterangan Lulus saat verifikasi fisik.",
    },
    {
      tag: "Informasi",
      title: "Program Beasiswa Pendidikan Penuh untuk Siswa Berprestasi",
      date: "01 Maret 2026",
      summary: "Tersedia kuota beasiswa bebas biaya pendidikan bagi calon murid yang memiliki sertifikat kejuaraan tingkat Kota/Provinsi/Nasional.",
    },
    {
      tag: "Sosialisasi",
      title: "Open House & Seminar Pengenalan Kurikulum Merdeka",
      date: "25 Februari 2026",
      summary: "Undangan bagi calon wali murid untuk menghadiri tur kampus dan konsultasi peminatan program keahlian secara gratis.",
    },
  ];

  return (
    <section id="pengumuman" className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Jadwal Pelaksanaan */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#be0817]/10 text-[#be0817] flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Jadwal Pendaftaran SPMB
                </h3>
                <p className="text-xs text-slate-500">Tahun Ajaran 2027/2028</p>
              </div>
            </div>

            <div className="space-y-6">
              {schedule.map((item, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-slate-200 pb-2 last:pb-0">
                  <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-800">
                      {item.stage}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {item.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.dates}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 bg-[#be0817]/5 p-4 rounded-xl flex items-start gap-3">
              <Info className="w-5 h-5 text-[#be0817] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                Jadwal dapat berubah sewaktu-waktu sesuai kebijakan sekolah. Selalu pantau informasi terbaru di laman pengumuman.
              </p>
            </div>
          </div>

          {/* Berita & Pengumuman Terbaru */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#be0817]/10 text-[#be0817] flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Pengumuman & Berita Terbaru
                </h3>
                <p className="text-xs text-slate-500">Informasi resmi dari panitia penerimaan siswa baru</p>
              </div>
            </div>

            <div className="space-y-4">
              {announcements.map((post, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#be0817]/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#be0817]/10 text-[#be0817]">
                      {post.tag}
                    </span>
                    <span className="text-xs text-slate-400">{post.date}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-800 mb-2 hover:text-[#be0817] transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
