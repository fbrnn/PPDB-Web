"use client";

import React from "react";

export function Programs() {
  const programs = [
    {
      title: "Konsentrasi Keahlian TKR",
      category: "Kejuruan Utama",
      desc: "Kompetensi mendalam sistem kendaraan roda empat mencakup sasis, kelistrikan bodi & mesin, serta sistem pengaman modern.",
      badgeColor: "bg-[#be0817]/10 text-[#be0817]",
      subjects: [
        "Elektrikal Kendaraan Ringan",
        "Sistem Sasis Kendaraan Ringan",
        "Sistem Pengaman & Kontrol Elektronik Kendaraan Ringan",
        "Prosedur Penggunaan Kendaraan Ringan",
      ],
    },
    {
      title: "Dasar Kejuruan & Konversi Energi",
      category: "Dasar & Konversi",
      desc: "Fondasi keilmuan otomotif, manajemen bengkel, serta pemahaman konversi energi mekanik dan termal pada kendaraan.",
      badgeColor: "bg-blue-50 text-blue-700",
      subjects: [
        "Dasar-dasar Kompetensi Keahlian",
        "Konversi Energi Kendaraan Ringan",
        "Proses Pelayanan & Manajemen Bengkel Kendaraan Ringan",
      ],
    },
    {
      title: "Pilihan Kejuruan & Wirausaha",
      category: "Pilihan & Wirausaha",
      desc: "Diversifikasi keahlian roda dua serta pembentukan jiwa wirausaha mandiri di bidang produk kreatif dan otomotif.",
      badgeColor: "bg-amber-50 text-amber-700",
      subjects: [
        "Sistem Kelistrikan Sepeda Motor",
        "Produk Kreatif dan Kewirausahaan (PKK)",
        "Informatika",
      ],
    },
    {
      title: "Matematika & Sains Terapan (IPAS)",
      category: "Sains & Analisis",
      desc: "Fondasi logika kuantitatif, kalkulasi teknik permesinan, serta pemahaman fenomena ilmiah dan sosial terintegrasi.",
      badgeColor: "bg-emerald-50 text-emerald-700",
      subjects: [
        "Matematika",
        "Projek Ilmu Pengetahuan Alam dan Sosial (IPAS)",
      ],
    },
    {
      title: "Bahasa & Komunikasi",
      category: "Bahasa",
      desc: "Penguasaan komunikasi profesional baik secara nasional, internasional untuk dunia industri, maupun pelestarian budaya lokal.",
      badgeColor: "bg-violet-50 text-violet-700",
      subjects: [
        "Bahasa Indonesia",
        "Bahasa Inggris",
        "Bahasa Jawa",
      ],
    },
    {
      title: "Pendidikan Karakter & Kebangsaan",
      category: "Karakter & Sosial",
      desc: "Pembentukan mental kepribadian, akhlak mulia, kesadaran berbangsa dan bernegara, seni budaya, serta kebugaran jasmani.",
      badgeColor: "bg-rose-50 text-rose-700",
      subjects: [
        "Pendidikan Agama dan Budi Pekerti",
        "Pendidikan Pancasila",
        "Sejarah & Seni Budaya",
        "Penjasorkes",
        "Bimbingan Konseling (BK)",
      ],
    },
  ];

  return (
    <section id="program" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Pilihan Mata Pelajaran
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Struktur kurikulum SMK PGRI 2 Mejayan Bidang Keahlian Teknologi Manufaktur & Rekayasa — Konsentrasi Keahlian Teknik Kendaraan Ringan (TKR).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#be0817]/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="mb-4">
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${item.badgeColor}`}
                  >
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-700 mb-2.5">
                  Mata Pelajaran:
                </div>
                <ul className="space-y-2">
                  {item.subjects.map((subject, sIdx) => (
                    <li
                      key={sIdx}
                      className="text-xs text-slate-600 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#be0817] mt-1.5 shrink-0" />
                      <span>{subject}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
