"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  MapPin,
  GraduationCap,
  Building2,
} from "lucide-react";

export function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden pt-8 pb-20 md:pt-14 md:pb-28">
      {/* Background Decorative Gradients & Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none opacity-40 -z-10">
        <div className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-blue-400/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-12 right-1/4 w-[450px] h-[450px] bg-indigo-400/25 rounded-full blur-3xl" />
        <div className="absolute top-48 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-sky-300/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Text & Heading Section */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/90 backdrop-blur-sm border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm hover:bg-blue-100/80 transition-colors"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
            </span>
            <span>Pendaftaran Gelombang 1 Tahun Ajaran 2026/2027 Resmi Dibuka</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6"
          >
            Membangun Masa Depan Gemilang di{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              SMK PGRI 2 Mejayan
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Sistem Penerimaan Murid Baru (SPMB) online yang cepat, mudah, dan
            terintegrasi. Siapkan berkas dan daftarkan diri Anda dalam beberapa langkah
            sederhana secara transparan.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Daftar Pendaftaran Baru</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#alur"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-base hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all"
            >
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span>Lihat Alur Seleksi</span>
            </Link>
          </motion.div>

          {/* Quick Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Akreditasi A Unggul
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Kurikulum Berbasis Industri
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Pendaftaran 100% Online
            </span>
          </motion.div>
        </div>

        {/* Featured School Image Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative max-w-6xl mx-auto mb-16"
        >
          {/* Ambient Glow Backdrop */}
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-600/25 via-indigo-600/20 to-sky-500/25 rounded-[2.5rem] blur-2xl opacity-70 -z-10" />

          {/* Glassmorphic Frame */}
          <div className="relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 bg-gradient-to-b from-white/95 via-white/85 to-white/70 border border-white/80 shadow-2xl backdrop-blur-md overflow-hidden group">
            {/* Top Frame Status Bar */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 mb-2 sm:mb-3 bg-slate-900/[0.04] rounded-xl border border-slate-200/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-semibold text-slate-700 hidden sm:inline-flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  Kampus Utama SMK PGRI 2 Mejayan
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="truncate">Jl. P. Sudirman No. 69 Caruban</span>
              </div>
            </div>

            {/* Featured Image with Zoom Effect */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[1839/627] bg-slate-950 shadow-inner">
              <Image
                src="/image.png"
                alt="Gedung dan Gerbang Depan SMK PGRI 2 Mejayan"
                width={1839}
                height={627}
                priority
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Bottom Gradient Overlay for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Overlaid Badges on Image */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex flex-wrap items-end justify-between gap-3">
                {/* Left Floating Info Pill */}
                <div className="bg-slate-950/80 backdrop-blur-md border border-white/20 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-white shadow-xl max-w-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-0.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>Kampus Vokasi Berkarakter</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-100 tracking-tight">
                    SMK PGRI 2 MEJAYAN CARUBAN
                  </p>
                </div>

                {/* Right Floating Badge */}
                <div className="hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-white px-4 py-2 rounded-xl shadow-xl">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    Pendaftaran Online Aktif
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Advantages Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-2"
        >
          <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-center group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900">Akreditasi A</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Predikat Unggul & Terpercaya</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all text-center group">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900">98.5%</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Terserap Kerja, Wirausaha & Kuliah</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-200 transition-all text-center group">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900">Bengkel Modern</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Praktik Sesuai Standar Industri</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all text-center group">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900">100% Online</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Cepat, Aman & Terpantau</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

