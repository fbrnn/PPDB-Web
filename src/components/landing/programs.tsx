"use client";

import React from "react";
import { Code, Cpu, Palette, Microscope, Globe, CheckCircle } from "lucide-react";

export function Programs() {
  const programs = [
    {
      title: "Rekayasa Perangkat Lunak & AI",
      category: "Teknologi Informasi",
      desc: "Mempelajari pengembangan aplikasi web, mobile, komputasi awan, dan dasar kecerdasan buatan terapan.",
      icon: Code,
      badgeColor: "bg-blue-50 text-blue-700",
      skills: ["Fullstack Web Development", "Algoritma & Data Structure", "Cloud DevOps Dasar"],
    },
    {
      title: "Teknik Jaringan Komputer & Telekomunikasi",
      category: "Infrastruktur IT",
      desc: "Spesialisasi konfigurasi server, arsitektur jaringan skala besar, cybersecurity, dan virtualisasi.",
      icon: Cpu,
      badgeColor: "bg-indigo-50 text-indigo-700",
      skills: ["MikroTik & Cisco Routing", "Keamanan Siber Terapan", "Administrasi Server Linux"],
    },
    {
      title: "Desain Komunikasi Visual & Multimedia",
      category: "Industri Kreatif",
      desc: "Keahlian desain grafis, animasi 2D/3D, videografi digital, dan UI/UX interaktif bersertifikasi industri.",
      icon: Palette,
      badgeColor: "bg-pink-50 text-pink-700",
      skills: ["Branding & Visual Design", "Motion Graphics & Editing", "UI/UX Product Design"],
    },
    {
      title: "MIPA Riset & Sains Terapan",
      category: "Akademik Sains",
      desc: "Kurikulum penguatan sains, bioteknologi, kimia terapan, dan persiapan olimpiade tingkat nasional.",
      icon: Microscope,
      badgeColor: "bg-emerald-50 text-emerald-700",
      skills: ["Metodologi Penelitian Ilmiah", "Praktikum Lab Berstandar", "Bimbingan Olimpiade Sains"],
    },
    {
      title: "IPS & Bisnis Digital Internasional",
      category: "Sosial & Ekonomi",
      desc: "Membekali literasi finansial, perdagangan digital global, manajemen kepemimpinan, dan komunikasi multibahasa.",
      icon: Globe,
      badgeColor: "bg-amber-50 text-amber-700",
      skills: ["E-Commerce & Digital Marketing", "Komunikasi Bahasa Asing", "Manajemen Kewirausahaan"],
    },
  ];

  return (
    <section id="program" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-3">
            Program Keahlian & Peminatan
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Pilihan Program Studi Unggulan
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Kurikulum relevan yang dirancang untuk menjawab tuntutan era transformasi digital dan revolusi industri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${item.badgeColor}`}
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
                  <div className="text-xs font-semibold text-slate-700 mb-2">
                    Kompetensi Lulusan:
                  </div>
                  <ul className="space-y-1.5">
                    {item.skills.map((skill, sIdx) => (
                      <li
                        key={sIdx}
                        className="text-xs text-slate-500 flex items-center gap-2"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
