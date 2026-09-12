"use client";

import React from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RegistrationFormData } from "../types";

interface StepProps {
  data: RegistrationFormData;
  onChange: (field: keyof RegistrationFormData, value: unknown) => void;
  disabled?: boolean;
}

export function AddressStep({ data, onChange, disabled }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h3 className="text-lg font-bold text-slate-800">
          Langkah 2: Alamat Domisili Siswa
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Masukkan alamat tempat tinggal siswa saat ini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alamat Lengkap */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="address" className="text-sm font-semibold text-slate-700">
            Alamat Lengkap (Nama Jalan, No. Rumah, Blok) <span className="text-red-500">*</span>
          </label>
          <InputTextarea
            id="address"
            rows={3}
            value={data.address || ""}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Contoh: Jl. Melati Indah No. 12, Kompleks Griya Asri"
            className="w-full"
            disabled={disabled}
          />
        </div>

        {/* RT / RW */}
        <div className="flex flex-col gap-2">
          <label htmlFor="rtRw" className="text-sm font-semibold text-slate-700">
            RT / RW <span className="text-red-500">*</span>
          </label>
          <InputText
            id="rtRw"
            value={data.rtRw || ""}
            onChange={(e) => onChange("rtRw", e.target.value)}
            placeholder="Contoh: 004 / 012"
            className="w-full"
            disabled={disabled}
          />
        </div>

        {/* Kelurahan / Desa */}
        <div className="flex flex-col gap-2">
          <label htmlFor="village" className="text-sm font-semibold text-slate-700">
            Kelurahan / Desa <span className="text-red-500">*</span>
          </label>
          <InputText
            id="village"
            value={data.village || ""}
            onChange={(e) => onChange("village", e.target.value)}
            placeholder="Contoh: Sukamaju"
            className="w-full"
            disabled={disabled}
          />
        </div>

        {/* Kecamatan */}
        <div className="flex flex-col gap-2">
          <label htmlFor="district" className="text-sm font-semibold text-slate-700">
            Kecamatan <span className="text-red-500">*</span>
          </label>
          <InputText
            id="district"
            value={data.district || ""}
            onChange={(e) => onChange("district", e.target.value)}
            placeholder="Contoh: Cilodong"
            className="w-full"
            disabled={disabled}
          />
        </div>

        {/* Kota / Kabupaten */}
        <div className="flex flex-col gap-2">
          <label htmlFor="city" className="text-sm font-semibold text-slate-700">
            Kota / Kabupaten <span className="text-red-500">*</span>
          </label>
          <InputText
            id="city"
            value={data.city || ""}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="Contoh: Kota Depok"
            className="w-full"
            disabled={disabled}
          />
        </div>

        {/* Kode Pos */}
        <div className="flex flex-col gap-2">
          <label htmlFor="postalCode" className="text-sm font-semibold text-slate-700">
            Kode Pos <span className="text-red-500">*</span>
          </label>
          <InputText
            id="postalCode"
            maxLength={6}
            value={data.postalCode || ""}
            onChange={(e) => onChange("postalCode", e.target.value.replace(/\D/g, ""))}
            placeholder="Contoh: 16413"
            className="w-full"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
