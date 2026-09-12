"use client";

import React from "react";
import {
  MonitorCheck,
  Library,
  Trophy,
  Mic,
  Wifi,
  Sparkles,
  Building2,
  HeartPulse,
} from "lucide-react";

export function Facilities() {
  const facilities = [
    {
      title: "Laboratorium Komputer & Server Canggih",
      desc: "Dilengkapi komputer spesifikasi tinggi, dual-monitor, dan jaringan serat optik gigabit untuk riset & coding.",
      icon: MonitorCheck,
    },
    {
      title: "Perpustakaan Digital & Co-Working",
      desc: "Ribuan koleksi e-book, jurnal akademik internasional, dan ruang diskusi ber-AC yang nyaman.",
      icon: Library,
    },
    {
      title: "Gelanggang Olahraga & Lapangan Futsal",
      desc: "Fasilitas olahraga indoor & outdoor lengkap untuk basket, voli, futsal, dan bulu tangkis.",
      icon: Trophy,
    },
    {
      title: "Studio Multimedia, Podcast & Broadcasting",
      desc: "Peralatan audio-visual profesional dengan peredam suara untuk produksi konten kreatif siswa.",
      icon: Mic,
    },
    {
      title: "Konektivitas Wi-Fi Kampus Terintegrasi",
      desc: "Akses internet berkecepatan tinggi dengan filtering konten edukatif di seluruh area sekolah.",
      icon: Wifi,
    },
    {
      title: "Smart Classroom Berteknologi Interaktif",
      desc: "Ruang kelas modern dengan Interactive Flat Panel Display (IFPD) dan tata udara ramah lingkungan.",
      icon: Building2,
    },
  ];

  return (
    <section id="fasilitas" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fasilitas Penunjang Pendidikan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Sarana Modern Berstandar Internasional
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Mendukung setiap potensi akademik dan kreativitas siswa dengan sarana prasarana yang lengkap dan aman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-white hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
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
