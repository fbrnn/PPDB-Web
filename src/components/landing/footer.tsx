"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, Clock, HelpCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Identity */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#be0817] flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                SPMB <span className="text-[#e8363f]">SMK PGRI 2 MEJAYAN</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Sistem resmi pendaftaran murid dan mahasiswa baru secara terintegrasi, transparan, dan akuntabel.
            </p>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#e8363f] shrink-0" />
              <span>Layanan Panitia: Senin - Jumat (08.00 - 15.00 WIB)</span>
            </div>
          </div>

          {/* Navigasi Cepat */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Tautan Cepat
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="#beranda" className="hover:text-[#e8363f] transition-colors">
                  Beranda Utama
                </Link>
              </li>
              <li>
                <Link href="#tentang" className="hover:text-[#e8363f] transition-colors">
                  Profil & Visi Misi
                </Link>
              </li>
              <li>
                <Link href="#program" className="hover:text-[#e8363f] transition-colors">
                  Program Keahlian
                </Link>
              </li>
              <li>
                <Link href="#fasilitas" className="hover:text-[#e8363f] transition-colors">
                  Sarana & Fasilitas
                </Link>
              </li>
              <li>
                <Link href="#pengumuman" className="hover:text-[#e8363f] transition-colors">
                  Jadwal & Pengumuman
                </Link>
              </li>
            </ul>
          </div>

          {/* Jalur Pendaftaran */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Jalur Penerimaan
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>Jalur Prestasi Akademik & Non-Akademik</li>
              <li>Jalur Afirmasi Keluarga Sejahtera</li>
              <li>Jalur Zonasi Domisili Wilayah</li>
              <li>Jalur Reguler Tes Potensi Akademik</li>
              <li>Program Beasiswa Kemitraan</li>
            </ul>
          </div>

          {/* Kontak Sekretariat PPDB */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Sekretariat PPDB
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e8363f] shrink-0 mt-0.5" />
                <span>Jl. Pendidikan Unggulan No. 45, Kompleks Edukasi Modern, Indonesia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e8363f] shrink-0" />
                <span>(021) 555-0192 / +62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#e8363f] shrink-0" />
                <span>panitia.spmb@sekolah-unggulan.sch.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} SPMB SMK PGRI 2 MEJAYAN. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-slate-300">
              Masuk Akun
            </Link>
            <span>Kebijakan Privasi</span>
            <span>Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
