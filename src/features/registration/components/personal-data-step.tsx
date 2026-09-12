"use client";

import React from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { RegistrationFormData } from "../types";

interface StepProps {
  data: RegistrationFormData;
  onChange: (field: keyof RegistrationFormData, value: unknown) => void;
  disabled?: boolean;
}

export function PersonalDataStep({ data, onChange, disabled }: StepProps) {
  const genderOptions = [
    { label: "Laki-laki", value: "L" },
    { label: "Perempuan", value: "P" },
  ];

  const religionOptions = [
    { label: "Islam", value: "Islam" },
    { label: "Kristen Protestan", value: "Kristen Protestan" },
    { label: "Katolik", value: "Katolik" },
    { label: "Hindu", value: "Hindu" },
    { label: "Buddha", value: "Buddha" },
    { label: "Konghucu", value: "Konghucu" },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h3 className="text-lg font-bold text-slate-800">
          Langkah 1: Data Pribadi Calon Siswa
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Lengkapi identitas diri sesuai kartu identitas resmi (Akta / Kartu Keluarga).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nama Lengkap */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">
            Nama Lengkap Sesuai Akta / Ijazah <span className="text-red-500">*</span>
          </label>
          <InputText
            id="fullName"
            value={data.fullName || ""}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Contoh: Muhammad Rayhan Pratama"
            className="w-full"
            disabled={disabled}
          />
        </div>

        {/* NISN */}
        <div className="flex flex-col gap-2">
          <label htmlFor="nisn" className="text-sm font-semibold text-slate-700">
            NISN (10 Digit Angka) <span className="text-red-500">*</span>
          </label>
          <InputText
            id="nisn"
            maxLength={10}
            value={data.nisn || ""}
            onChange={(e) => onChange("nisn", e.target.value.replace(/\D/g, ""))}
            placeholder="Contoh: 0071234567"
            className="w-full"
            disabled={disabled}
          />
          <span className="text-[11px] text-slate-400">Nomor Induk Siswa Nasional dari Kemendikbud</span>
        </div>

        {/* NIK */}
        <div className="flex flex-col gap-2">
          <label htmlFor="nik" className="text-sm font-semibold text-slate-700">
            NIK Siswa (16 Digit Sesuai KK) <span className="text-red-500">*</span>
          </label>
          <InputText
            id="nik"
            maxLength={16}
            value={data.nik || ""}
            onChange={(e) => onChange("nik", e.target.value.replace(/\D/g, ""))}
            placeholder="Contoh: 3171012345670001"
            className="w-full"
            disabled={disabled}
          />
          <span className="text-[11px] text-slate-400">Nomor Induk Kependudukan pada Kartu Keluarga</span>
        </div>

        {/* Jenis Kelamin */}
        <div className="flex flex-col gap-2">
          <label htmlFor="gender" className="text-sm font-semibold text-slate-700">
            Jenis Kelamin <span className="text-red-500">*</span>
          </label>
          <Dropdown
            id="gender"
            value={data.gender || null}
            options={genderOptions}
            onChange={(e) => onChange("gender", e.value)}
            placeholder="Pilih Jenis Kelamin"
            className="w-full"
            disabled={disabled}
          />
        </div>

        {/* Agama */}
        <div className="flex flex-col gap-2">
          <label htmlFor="religion" className="text-sm font-semibold text-slate-700">
            Agama <span className="text-red-500">*</span>
          </label>
          <Dropdown
            id="religion"
            value={data.religion || null}
            options={religionOptions}
            onChange={(e) => onChange("religion", e.value)}
            placeholder="Pilih Agama"
            className="w-full"
            disabled={disabled}
          />
        </div>

        {/* Tempat Lahir */}
        <div className="flex flex-col gap-2">
          <label htmlFor="birthPlace" className="text-sm font-semibold text-slate-700">
            Tempat Lahir <span className="text-red-500">*</span>
          </label>
          <InputText
            id="birthPlace"
            value={data.birthPlace || ""}
            onChange={(e) => onChange("birthPlace", e.target.value)}
            placeholder="Contoh: Jakarta"
            className="w-full"
            disabled={disabled}
          />
        </div>

        {/* Tanggal Lahir */}
        <div className="flex flex-col gap-2">
          <label htmlFor="birthDate" className="text-sm font-semibold text-slate-700">
            Tanggal Lahir <span className="text-red-500">*</span>
          </label>
          <InputText
            id="birthDate"
            type="date"
            value={data.birthDate || ""}
            onChange={(e) => onChange("birthDate", e.target.value)}
            className="w-full"
            disabled={disabled}
          />
        </div>

        {/* Nomor WhatsApp Siswa */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="phoneNumber" className="text-sm font-semibold text-slate-700">
            Nomor Telepon / WhatsApp Siswa <span className="text-red-500">*</span>
          </label>
          <InputText
            id="phoneNumber"
            value={data.phoneNumber || ""}
            onChange={(e) => onChange("phoneNumber", e.target.value)}
            placeholder="Contoh: 081234567890"
            className="w-full"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
