"use client";

import React from "react";
import { InputText } from "primereact/inputtext";
import { RegistrationFormData } from "../types";

interface StepProps {
  data: RegistrationFormData;
  onChange: (field: keyof RegistrationFormData, value: unknown) => void;
  disabled?: boolean;
}

export function SchoolDataStep({ data, onChange, disabled }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h3 className="text-lg font-bold text-slate-800">
          Langkah 3: Data Sekolah Asal
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Informasi mengenai jenjang pendidikan sekolah sebelumnya (SMP / MTs sederajat).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nama Sekolah Asal */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label
            htmlFor="previousSchoolName"
            className="text-sm font-semibold text-slate-700"
          >
            Nama Sekolah Asal (SMP / MTs) <span className="text-red-500">*</span>
          </label>
          <InputText
            id="previousSchoolName"
            value={data.previousSchoolName || ""}
            onChange={(e) => onChange("previousSchoolName", e.target.value)}
            placeholder="Contoh: SMP Negeri 1 Kota Impian"
            className="w-full"
            disabled={disabled}
          />
        </div>

        {/* NPSN Sekolah Asal */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="previousSchoolNpsn"
            className="text-sm font-semibold text-slate-700"
          >
            NPSN Sekolah Asal (8 Digit)
          </label>
          <InputText
            id="previousSchoolNpsn"
            maxLength={8}
            value={data.previousSchoolNpsn || ""}
            onChange={(e) =>
              onChange("previousSchoolNpsn", e.target.value.replace(/\D/g, ""))
            }
            placeholder="Contoh: 20101234"
            className="w-full"
            disabled={disabled}
          />
          <span className="text-[11px] text-slate-400">
            Nomor Pokok Sekolah Nasional (dapat dilihat di raport/ijazah)
          </span>
        </div>

        {/* Tahun Kelulusan */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="graduationYear"
            className="text-sm font-semibold text-slate-700"
          >
            Tahun Lulus <span className="text-red-500">*</span>
          </label>
          <InputText
            id="graduationYear"
            maxLength={4}
            value={data.graduationYear || ""}
            onChange={(e) =>
              onChange("graduationYear", e.target.value.replace(/\D/g, ""))
            }
            placeholder="Contoh: 2026"
            className="w-full"
            disabled={disabled}
          />
        </div>

        {/* Nomor Seri Ijazah / SKL */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label
            htmlFor="diplomaNumber"
            className="text-sm font-semibold text-slate-700"
          >
            Nomor Seri Ijazah atau Surat Keterangan Lulus (SKL)
          </label>
          <InputText
            id="diplomaNumber"
            value={data.diplomaNumber || ""}
            onChange={(e) => onChange("diplomaNumber", e.target.value)}
            placeholder="Contoh: DN-01/D-SMP/K13/2026/001"
            className="w-full"
            disabled={disabled}
          />
          <span className="text-[11px] text-slate-400">
            Dapat dikosongkan sementara jika belum diterbitkan oleh sekolah asal.
          </span>
        </div>
      </div>
    </div>
  );
}
