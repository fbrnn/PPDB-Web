"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative w-full h-[420px] md:h-[480px] overflow-hidden"
    >
      {/* Background Image via CSS — most reliable approach */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Simple dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />

      {/* Content — positioned at bottom-left like Polsek Bendo reference */}
      <div className="absolute inset-0 flex flex-col justify-end" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-10 pb-8 md:pb-12">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
          >
            Selamat Datang di
            <br />
            <span className="text-blue-400">SMK PGRI 2 Mejayan</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-300 mb-6 max-w-lg leading-relaxed"
          >
            Sistem Penerimaan Murid Baru (SPMB) online resmi — cepat, mudah,
            dan terintegrasi secara transparan.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Daftar Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#alur"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold text-sm hover:bg-white/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Lihat Alur Seleksi</span>
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
