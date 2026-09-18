"use client";

import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { RegistrationFormData } from "../types";

interface StepProps {
  data: RegistrationFormData;
  agreement: boolean;
  onAgreementChange: (val: boolean) => void;
  disabled?: boolean;
}

export function ReviewStep({
  data,
  agreement,
  onAgreementChange,
  disabled,
}: StepProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h3 className="text-lg font-bold text-slate-800">
          Langkah 5: Tinjau Data Pendaftaran
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Periksa kembali seluruh informasi sebelum mengirim formulir pendaftaran.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ringkasan Data Siswa */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-3">
            1. Data Pribadi
          </h4>
          <dl className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <dt className="text-slate-500">Nama Lengkap:</dt>
              <dd className="font-semibold text-slate-800">{data.fullName || "-"}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <dt className="text-slate-500">NISN:</dt>
              <dd className="font-semibold text-slate-800">{data.nisn || "-"}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <dt className="text-slate-500">NIK:</dt>
              <dd className="font-semibold text-slate-800">{data.nik || "-"}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <dt className="text-slate-500">Jenis Kelamin:</dt>
              <dd className="font-semibold text-slate-800">
                {data.gender === "L" ? "Laki-laki" : data.gender === "P" ? "Perempuan" : "-"}
              </dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <dt className="text-slate-500">TTL:</dt>
              <dd className="font-semibold text-slate-800">
                {data.birthPlace || "-"}, {data.birthDate || "-"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">No. WhatsApp:</dt>
              <dd className="font-semibold text-slate-800">{data.phoneNumber || "-"}</dd>
            </div>
          </dl>
        </div>

        {/* Ringkasan Alamat */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-3">
            2. Alamat Domisili
          </h4>
          <dl className="space-y-2 text-xs">
            <div className="border-b border-slate-100 pb-1">
              <dt className="text-slate-500">Alamat:</dt>
              <dd className="font-semibold text-slate-800 mt-0.5">{data.address || "-"}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <dt className="text-slate-500">RT/RW:</dt>
              <dd className="font-semibold text-slate-800">{data.rtRw || "-"}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <dt className="text-slate-500">Kelurahan / Kecamatan:</dt>
              <dd className="font-semibold text-slate-800">
                {data.village || "-"} / {data.district || "-"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Kota / Kode Pos:</dt>
              <dd className="font-semibold text-slate-800">
                {data.city || "-"} ({data.postalCode || "-"})
              </dd>
            </div>
          </dl>
        </div>

        {/* Ringkasan Sekolah Asal */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-3">
            3. Asal Sekolah
          </h4>
          <dl className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <dt className="text-slate-500">Nama Sekolah:</dt>
              <dd className="font-semibold text-slate-800">{data.previousSchoolName || "-"}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <dt className="text-slate-500">NPSN:</dt>
              <dd className="font-semibold text-slate-800">{data.previousSchoolNpsn || "-"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Tahun Lulus:</dt>
              <dd className="font-semibold text-slate-800">{data.graduationYear || "-"}</dd>
            </div>
          </dl>
        </div>

        {/* Ringkasan Orang Tua */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-3">
            4. Data Orang Tua
          </h4>
          <dl className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <dt className="text-slate-500">Nama Ayah:</dt>
              <dd className="font-semibold text-slate-800">{data.fatherName || "-"}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <dt className="text-slate-500">Nama Ibu:</dt>
              <dd className="font-semibold text-slate-800">{data.motherName || "-"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Wali:</dt>
              <dd className="font-semibold text-slate-800">{data.guardianName || "(Tidak ada)"}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Pernyataan Kebenaran Data */}
      <div className="mt-8 pt-6 border-t border-slate-200 bg-red-50/50 p-5 rounded-xl">
        <div className="flex items-start gap-3">
          <Checkbox
            inputId="agreement"
            checked={agreement}
            onChange={(e) => onAgreementChange(!!e.checked)}
            disabled={disabled}
            className="mt-0.5"
          />
          <label
            htmlFor="agreement"
            className="text-xs text-slate-700 leading-relaxed cursor-pointer font-medium"
          >
            Saya menyatakan dengan sungguh-sungguh bahwa seluruh data dan informasi yang saya isikan
            dalam formulir pendaftaran ini adalah lengkap, benar, dan sah. Apabila di kemudian hari
            ditemukan ketidaksesuaian data, saya bersedia menerima sanksi pembatalan kelulusan.
          </label>
        </div>
      </div>
    </div>
  );
}
