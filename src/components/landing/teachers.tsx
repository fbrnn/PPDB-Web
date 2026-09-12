"use client";

import React from "react";
import { motion } from "motion/react";

const teachers = [
  {
    id: 1,
    name: "Dra. Sutini",
    subject: "Kepala Sekolah",
    image: "https://ui-avatars.com/api/?name=Sutini&background=0ea5e9&color=fff&size=400",
  },
  {
    id: 2,
    name: "Budi Santoso, S.Pd., M.Pd.",
    subject: "Matematika",
    image: "https://ui-avatars.com/api/?name=Budi+Santoso&background=64748b&color=fff&size=400",
  },
  {
    id: 3,
    name: "Siti Aminah, S.Kom.",
    subject: "Produktif TKJ",
    image: "https://ui-avatars.com/api/?name=Siti+Aminah&background=10b981&color=fff&size=400",
  },
  {
    id: 4,
    name: "Dwi Saputra, S.T.",
    subject: "Produktif TKR",
    image: "https://ui-avatars.com/api/?name=Dwi+Saputra&background=f59e0b&color=fff&size=400",
  },
  {
    id: 5,
    name: "Rina Wati, S.E.",
    subject: "Akuntansi",
    image: "https://ui-avatars.com/api/?name=Rina+Wati&background=ec4899&color=fff&size=400",
  },
  {
    id: 6,
    name: "Nisa Ulfa, S.Pd.",
    subject: "Bahasa Inggris",
    image: "https://ui-avatars.com/api/?name=Nisa+Ulfa&background=8b5cf6&color=fff&size=400",
  },
  {
    id: 7,
    name: "H. Ahmad Fauzi, S.Ag.",
    subject: "Pendidikan Agama",
    image: "https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=14b8a6&color=fff&size=400",
  },
  {
    id: 8,
    name: "Tri Haryanto, S.Pd.",
    subject: "Pendidikan Jasmani",
    image: "https://ui-avatars.com/api/?name=Tri+Haryanto&background=f43f5e&color=fff&size=400",
  }
];

export function Teachers() {
  return (
    <section id="profil-guru" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            Tenaga Pendidik
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg"
          >
            Didukung oleh tenaga pendidik profesional dan berpengalaman di bidangnya untuk mencetak lulusan yang cerdas dan siap kerja.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group cursor-pointer"
            >
              {/* Image Section - Catalog Style */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={teacher.image} 
                  alt={teacher.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                  <span className="text-white text-sm font-semibold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100 border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                    Lihat Profil
                  </span>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-5 text-center bg-white relative z-10">
                <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {teacher.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 bg-slate-50 inline-block px-3 py-1 rounded-full border border-slate-100">
                  {teacher.subject}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
