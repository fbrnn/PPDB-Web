"use client";

import React from "react";

export function Facilities() {
  const facilities = [
    {
      title: "Laboratorium Komputer",
      desc: "Dilengkapi komputer yang memadai dan terhubung ke jaringan server lokal untuk mendukung kegiatan belajar praktikum.",
    },
    {
      title: "Perpustakaan",
      desc: "Perpustakaan sekolah yang nyaman dengan berbagai macam buku pelajaran yang lengkap dan bermanfaat untuk belajar.",
    },
    {
      title: "Lapangan Olahraga",
      desc: "Fasilitas lapangan basket, voli, dan futsal.",
    },
    {
      title: "Bengkel Otomotif TKR",
      desc: "Bengkel praktik lengkap dengan peralatan otomotif standar industri untuk perawatan dan perbaikan kendaraan ringan.",
    },
    {
      title: "Konektivitas Wi-Fi Sekolah",
      desc: "Akses internet berkecepatan tinggi dengan filtering konten edukatif di seluruh area sekolah.",
    },
    {
      title: "Ruang Musik",
      desc: "Ruang musik kedap suara dengan berbagai alat musik lengkap untuk mengembangkan bakat dan kreativitas siswa.",
    },
  ];

  return (
    <section id="fasilitas" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Fasilitas Penunjang Pendidikan
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Mendukung setiap potensi akademik dan kreativitas siswa dengan sarana prasarana yang lengkap dan aman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => {
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-white hover:border-[#be0817]/30 hover:shadow-lg transition-all"
              >
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {fac.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
