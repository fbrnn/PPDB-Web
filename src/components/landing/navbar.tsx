"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogIn, ArrowRight, Menu, X, GraduationCap } from "lucide-react";

interface NavbarProps {
  userRole?: string | null;
}

export function Navbar({ userRole }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#be0817] flex items-center justify-center text-white shadow-md shadow-[#be0817]/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-none">
                SPMB <span className="text-[#be0817]">SMK PGRI 2 MEJAYAN</span>
              </span>
              <span className="text-xs font-medium text-slate-400">
                T.A. 2027/2028
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#beranda"
              className="text-sm font-medium text-slate-600 hover:text-[#be0817] transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="#tentang"
              className="text-sm font-medium text-slate-600 hover:text-[#be0817] transition-colors"
            >
              Profil Sekolah
            </Link>
            <Link
              href="#program"
              className="text-sm font-medium text-slate-600 hover:text-[#be0817] transition-colors"
            >
              Program Unggulan
            </Link>
            <Link
              href="#fasilitas"
              className="text-sm font-medium text-slate-600 hover:text-[#be0817] transition-colors"
            >
              Fasilitas
            </Link>
            <Link
              href="#pengumuman"
              className="text-sm font-medium text-slate-600 hover:text-[#be0817] transition-colors"
            >
              Informasi & Jadwal
            </Link>
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            {userRole ? (
              <Link
                href={
                  userRole === "ADMIN" || userRole === "SUPER_ADMIN"
                    ? "/admin/dashboard"
                    : "/dashboard"
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#be0817] text-white text-sm font-semibold hover:bg-[#a00714] shadow-md shadow-[#be0817]/20 transition-all hover:scale-105"
              >
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-slate-700 hover:text-[#be0817] font-medium text-sm transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk</span>
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#be0817] text-white text-sm font-semibold hover:bg-[#a00714] shadow-md shadow-[#be0817]/20 transition-all hover:scale-105"
                >
                  <span>Daftar Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="#beranda"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-[#be0817]/10 hover:text-[#be0817]"
          >
            Beranda
          </Link>
          <Link
            href="#tentang"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-[#be0817]/10 hover:text-[#be0817]"
          >
            Profil Sekolah
          </Link>
          <Link
            href="#program"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-[#be0817]/10 hover:text-[#be0817]"
          >
            Program Unggulan
          </Link>
          <Link
            href="#fasilitas"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-[#be0817]/10 hover:text-[#be0817]"
          >
            Fasilitas
          </Link>
          <Link
            href="#pengumuman"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-[#be0817]/10 hover:text-[#be0817]"
          >
            Informasi & Jadwal
          </Link>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/login"
              className="w-full text-center py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium text-sm"
            >
              Masuk
            </Link>
            <Link
              href="/login"
              className="w-full text-center py-2.5 rounded-lg bg-[#be0817] text-white font-medium text-sm shadow-md"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
