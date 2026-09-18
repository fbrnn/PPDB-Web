"use client";

import React from "react";
import { InputText } from "primereact/inputtext";
import { RegistrationFormData } from "../types";

interface StepProps {
  data: RegistrationFormData;
  onChange: (field: keyof RegistrationFormData, value: unknown) => void;
  disabled?: boolean;
}

export function ParentDataStep({ data, onChange, disabled }: StepProps) {
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h3 className="text-lg font-bold text-slate-800">
          Langkah 4: Data Orang Tua & Wali
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Informasi identitas dan kontak orang tua kandung atau wali yang dapat dihubungi.
        </p>
      </div>

      {/* Bagian Data Ayah */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
        <h4 className="text-sm font-bold text-red-800 uppercase tracking-wider">
          A. Data Ayah Kandung
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherName" className="text-xs font-semibold text-slate-700">
              Nama Lengkap Ayah <span className="text-red-500">*</span>
            </label>
            <InputText
              id="fatherName"
              value={data.fatherName || ""}
              onChange={(e) => onChange("fatherName", e.target.value)}
              placeholder="Contoh: Hendra Pratama"
              className="w-full"
              disabled={disabled}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fatherNik" className="text-xs font-semibold text-slate-700">
              NIK Ayah (16 Digit)
            </label>
            <InputText
              id="fatherNik"
              maxLength={16}
              value={data.fatherNik || ""}
              onChange={(e) =>
                onChange("fatherNik", e.target.value.replace(/\D/g, ""))
              }
              placeholder="Contoh: 3171012345670002"
              className="w-full"
              disabled={disabled}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fatherOccupation" className="text-xs font-semibold text-slate-700">
              Pekerjaan Ayah
            </label>
            <InputText
              id="fatherOccupation"
              value={data.fatherOccupation || ""}
              onChange={(e) => onChange("fatherOccupation", e.target.value)}
              placeholder="Contoh: Karyawan Swasta / Wiraswasta"
              className="w-full"
              disabled={disabled}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fatherPhone" className="text-xs font-semibold text-slate-700">
              No. WhatsApp / HP Ayah
            </label>
            <InputText
              id="fatherPhone"
              value={data.fatherPhone || ""}
              onChange={(e) => onChange("fatherPhone", e.target.value)}
              placeholder="Contoh: 081234567891"
              className="w-full"
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      {/* Bagian Data Ibu */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
        <h4 className="text-sm font-bold text-red-800 uppercase tracking-wider">
          B. Data Ibu Kandung
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="motherName" className="text-xs font-semibold text-slate-700">
              Nama Lengkap Ibu <span className="text-red-500">*</span>
            </label>
            <InputText
              id="motherName"
              value={data.motherName || ""}
              onChange={(e) => onChange("motherName", e.target.value)}
              placeholder="Contoh: Siti Rahmawati"
              className="w-full"
              disabled={disabled}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="motherNik" className="text-xs font-semibold text-slate-700">
              NIK Ibu (16 Digit)
            </label>
            <InputText
              id="motherNik"
              maxLength={16}
              value={data.motherNik || ""}
              onChange={(e) =>
                onChange("motherNik", e.target.value.replace(/\D/g, ""))
              }
              placeholder="Contoh: 3171012345670003"
              className="w-full"
              disabled={disabled}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="motherOccupation" className="text-xs font-semibold text-slate-700">
              Pekerjaan Ibu
            </label>
            <InputText
              id="motherOccupation"
              value={data.motherOccupation || ""}
              onChange={(e) => onChange("motherOccupation", e.target.value)}
              placeholder="Contoh: Ibu Rumah Tangga / Guru"
              className="w-full"
              disabled={disabled}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="motherPhone" className="text-xs font-semibold text-slate-700">
              No. WhatsApp / HP Ibu
            </label>
            <InputText
              id="motherPhone"
              value={data.motherPhone || ""}
              onChange={(e) => onChange("motherPhone", e.target.value)}
              placeholder="Contoh: 081234567892"
              className="w-full"
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      {/* Bagian Data Wali (Opsional) */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
        <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wider">
          C. Data Wali (Opsional, jika tinggal bersama wali)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="guardianName" className="text-xs font-semibold text-slate-700">
              Nama Lengkap Wali
            </label>
            <InputText
              id="guardianName"
              value={data.guardianName || ""}
              onChange={(e) => onChange("guardianName", e.target.value)}
              placeholder="Kosongkan jika tidak ada wali"
              className="w-full"
              disabled={disabled}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="guardianRelation" className="text-xs font-semibold text-slate-700">
              Hubungan dengan Siswa
            </label>
            <InputText
              id="guardianRelation"
              value={data.guardianRelation || ""}
              onChange={(e) => onChange("guardianRelation", e.target.value)}
              placeholder="Contoh: Paman / Kakek"
              className="w-full"
              disabled={disabled}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="guardianPhone" className="text-xs font-semibold text-slate-700">
              No. Kontak Wali
            </label>
            <InputText
              id="guardianPhone"
              value={data.guardianPhone || ""}
              onChange={(e) => onChange("guardianPhone", e.target.value)}
              placeholder="Contoh: 081234567893"
              className="w-full"
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
