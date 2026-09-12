"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";
import { Tag } from "primereact/tag";

import { Registration } from "@/db/schema";
import { REGISTRATION_STATUS_LABELS, REGISTRATION_STATUS_SEVERITY } from "@/lib/constants";
import { RegistrationFormData, FormStep } from "../types";
import { saveRegistrationDraft, submitRegistration } from "../actions";

import { PersonalDataStep } from "./personal-data-step";
import { AddressStep } from "./address-step";
import { SchoolDataStep } from "./school-data-step";
import { ParentDataStep } from "./parent-data-step";
import { ReviewStep } from "./review-step";

const LOCAL_STORAGE_KEY = "spmb_registration_draft_backup";

interface RegistrationFormProps {
  initialData: Registration;
}

export function RegistrationForm({ initialData }: RegistrationFormProps) {
  const router = useRouter();
  const toastRef = useRef<Toast>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<RegistrationFormData>(() => {
    return {
      fullName: initialData.fullName ?? "",
      nisn: initialData.nisn ?? "",
      nik: initialData.nik ?? "",
      gender: initialData.gender ?? null,
      birthPlace: initialData.birthPlace ?? "",
      birthDate: initialData.birthDate ? String(initialData.birthDate) : "",
      religion: initialData.religion ?? "",
      phoneNumber: initialData.phoneNumber ?? "",

      address: initialData.address ?? "",
      rtRw: initialData.rtRw ?? "",
      village: initialData.village ?? "",
      district: initialData.district ?? "",
      city: initialData.city ?? "",
      postalCode: initialData.postalCode ?? "",

      previousSchoolName: initialData.previousSchoolName ?? "",
      previousSchoolNpsn: initialData.previousSchoolNpsn ?? "",
      graduationYear: initialData.graduationYear ?? "",
      diplomaNumber: initialData.diplomaNumber ?? "",

      fatherName: initialData.fatherName ?? "",
      fatherNik: initialData.fatherNik ?? "",
      fatherOccupation: initialData.fatherOccupation ?? "",
      fatherPhone: initialData.fatherPhone ?? "",

      motherName: initialData.motherName ?? "",
      motherNik: initialData.motherNik ?? "",
      motherOccupation: initialData.motherOccupation ?? "",
      motherPhone: initialData.motherPhone ?? "",

      guardianName: initialData.guardianName ?? "",
      guardianNik: initialData.guardianNik ?? "",
      guardianOccupation: initialData.guardianOccupation ?? "",
      guardianPhone: initialData.guardianPhone ?? "",
      guardianRelation: initialData.guardianRelation ?? "",
    };
  });

  const [activeStep, setActiveStep] = useState<FormStep>(0);
  const [agreement, setAgreement] = useState(false);
  const [autosaveStatus, setAutosaveStatus] = useState<
    "idle" | "saving" | "saved" | "error" | "local"
  >("idle");

  const isLocked =
    initialData.status === "VERIFIED" || initialData.status === "SUBMITTED";

  // Check LocalStorage backup on mount
  useEffect(() => {
    if (isLocked) return;
    try {
      const backupStr = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (backupStr) {
        const backupData = JSON.parse(backupStr);
        // Only consider if backup has content
        if (backupData.fullName && !initialData.fullName) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setFormData((prev) => ({ ...prev, ...backupData }));
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setAutosaveStatus("local");
        }
      }
    } catch {
      // ignore
    }
  }, [initialData, isLocked]);

  // Debounced Autosave to Server & LocalStorage
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const performAutosave = useCallback(
    async (dataToSave: RegistrationFormData) => {
      if (isLocked) return;

      setAutosaveStatus("saving");
      // Simpan cadangan darurat di LocalStorage
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
      } catch {
        // ignore
      }

      // Kirim Server Action ke MySQL
      try {
        const res = await saveRegistrationDraft(dataToSave);
        if (res.success) {
          setAutosaveStatus("saved");
        } else {
          setAutosaveStatus("local");
        }
      } catch {
        setAutosaveStatus("local");
      }
    },
    [isLocked]
  );

  const handleFieldChange = (
    field: keyof RegistrationFormData,
    value: unknown
  ) => {
    if (isLocked) return;

    setFormData((prev) => {
      const next = { ...prev, [field]: value };

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        performAutosave(next);
      }, 1200);

      return next;
    });
  };

  // Manual Save Draft
  const handleManualSaveDraft = async () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    setIsSubmitting(true);
    try {
      setAutosaveStatus("saving");
      const res = await saveRegistrationDraft(formData);
      if (res.success) {
        setAutosaveStatus("saved");
        toastRef.current?.show({
          severity: "success",
          summary: "Draf Tersimpan",
          detail: "Perubahan data berhasil disimpan ke server.",
          life: 3000,
        });
      } else {
        setAutosaveStatus("error");
        toastRef.current?.show({
          severity: "error",
          summary: "Gagal Menyimpan",
          detail: res.message,
          life: 3000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Final Submit
  const handleFinalSubmit = async () => {
    if (!agreement) {
      toastRef.current?.show({
        severity: "warn",
        summary: "Persetujuan Diperlukan",
        detail:
          "Centang pernyataan kebenaran data terlebih dahulu sebelum mengirim formulir.",
        life: 4000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // @ts-expect-error partial typing matches submit schema
      const res = await submitRegistration(formData);
      if (res.success) {
        // Hapus backup lokal setelah berhasil submit
        try {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        } catch {
          // ignore
        }

        toastRef.current?.show({
          severity: "success",
          summary: "Pendaftaran Terkirim!",
          detail: res.message,
          life: 3000,
        });

        // Hanya gunakan router.push, hindari router.refresh secara bersamaan
        // karena bisa menyebabkan race condition dan UI stuck.
        router.push("/dashboard");
      } else {
        toastRef.current?.show({
          severity: "error",
          summary: "Pengiriman Gagal",
          detail: res.message,
          life: 5000,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      toastRef.current?.show({
        severity: "error",
        summary: "Kesalahan Sistem",
        detail: "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
        life: 5000,
      });
      setIsSubmitting(false);
    }
  };

  const stepsItems = [
    { label: "Data Pribadi" },
    { label: "Alamat" },
    { label: "Asal Sekolah" },
    { label: "Orang Tua / Wali" },
    { label: "Tinjau & Kirim" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
      <Toast ref={toastRef} />

      {/* Header Form & Autosave Indicator */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              Formulir Pendaftaran SPMB
            </h2>
            <Tag
              value={REGISTRATION_STATUS_LABELS[initialData.status]}
              severity={REGISTRATION_STATUS_SEVERITY[initialData.status]}
              className="text-xs px-2.5 py-1"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Isi semua tahapan formulir secara teliti sebelum batas akhir pendaftaran.
          </p>
        </div>

        {/* Save Status Badge */}
        <div className="flex flex-row-reverse sm:flex-row items-center justify-between sm:justify-end gap-3 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-slate-200">
          {!isLocked && (
            <Button
              type="button"
              label="Simpan Draf"
              icon="pi pi-save"
              outlined
              size="small"
              onClick={handleManualSaveDraft}
              loading={isSubmitting}
              className="text-xs py-1.5 px-3"
            />
          )}
          <div className="text-[11px] sm:text-xs flex items-center gap-1.5 text-slate-500 font-medium">
            {autosaveStatus === "saving" && (
              <>
                <i className="pi pi-spin pi-spinner text-blue-600 text-xs" />
                <span className="text-blue-600 font-semibold">Menyimpan...</span>
              </>
            )}
            {autosaveStatus === "saved" && (
              <>
                <i className="pi pi-check text-emerald-600 text-xs" />
                <span className="text-emerald-700">Tersimpan otomatis</span>
              </>
            )}
            {autosaveStatus === "local" && (
              <>
                <i className="pi pi-save text-amber-600 text-xs" />
                <span className="text-amber-700">Tersimpan lokal</span>
              </>
            )}
            {autosaveStatus === "error" && (
              <>
                <i className="pi pi-exclamation-triangle text-red-600 text-xs" />
                <span className="text-red-700">Gagal menyimpan</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Catatan Revisi jika status REVISION_REQUIRED */}
      {initialData.status === "REVISION_REQUIRED" && (
        <div className="p-5 sm:p-6 bg-red-50 border-b border-red-200">
          <Message
            severity="error"
            text={`Catatan Perbaikan dari Panitia: ${
              initialData.revisionNotes || "Harap periksa dan lengkapi data Anda kembali."
            }`}
            className="w-full text-left text-sm"
          />
        </div>
      )}

      {/* Notice jika status SUBMITTED atau VERIFIED */}
      {initialData.status === "SUBMITTED" && (
        <div className="p-4 bg-amber-50 border-b border-amber-200 text-xs text-amber-800 flex items-center gap-2">
          <i className="pi pi-info-circle text-amber-600 text-base" />
          <span className="leading-relaxed">
            Formulir telah dikirim dan sedang menunggu proses verifikasi oleh panitia SPMB.
          </span>
        </div>
      )}

      {initialData.status === "VERIFIED" && (
        <div className="p-4 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <i className="pi pi-check-circle text-emerald-600 text-base" />
          <span className="leading-relaxed">
            Pendaftaran Anda telah resmi terverifikasi. Data telah dikunci.
          </span>
        </div>
      )}

      {/* Stepper Progress */}
      <div className="py-6 px-0 sm:px-8 border-b border-slate-100 bg-white overflow-hidden">
        <div className="w-full overflow-x-auto pb-2 px-4 sm:px-0 scrollbar-hide">
          <div className="min-w-[500px]">
            <Steps
              model={stepsItems}
              activeIndex={activeStep}
              onSelect={(e) => setActiveStep(e.index as FormStep)}
              readOnly={false}
              className="text-xs"
            />
          </div>
        </div>
      </div>

      {/* Step Content Area */}
      <div className="p-5 sm:p-10">
        {activeStep === 0 && (
          <PersonalDataStep
            data={formData}
            onChange={handleFieldChange}
            disabled={isLocked}
          />
        )}
        {activeStep === 1 && (
          <AddressStep
            data={formData}
            onChange={handleFieldChange}
            disabled={isLocked}
          />
        )}
        {activeStep === 2 && (
          <SchoolDataStep
            data={formData}
            onChange={handleFieldChange}
            disabled={isLocked}
          />
        )}
        {activeStep === 3 && (
          <ParentDataStep
            data={formData}
            onChange={handleFieldChange}
            disabled={isLocked}
          />
        )}
        {activeStep === 4 && (
          <ReviewStep
            data={formData}
            agreement={agreement}
            onAgreementChange={setAgreement}
            disabled={isLocked}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-8 py-4 flex items-center justify-between">
        <div>
          {activeStep > 0 && (
            <Button
              type="button"
              label="Sebelumnya"
              icon="pi pi-arrow-left"
              outlined
              size="small"
              onClick={() => setActiveStep((prev) => (prev - 1) as FormStep)}
              disabled={isSubmitting}
              className="text-xs sm:text-sm px-3 py-2"
            />
          )}
        </div>

        <div className="flex items-center gap-3">
          {activeStep < 4 ? (
            <Button
              type="button"
              label="Selanjutnya"
              icon="pi pi-arrow-right"
              iconPos="right"
              size="small"
              onClick={() => setActiveStep((prev) => (prev + 1) as FormStep)}
              className="bg-blue-600 hover:bg-blue-700 text-white border-none text-xs sm:text-sm px-4 py-2"
            />
          ) : (
            !isLocked && (
              <Button
                type="button"
                label={isSubmitting ? "Mengirimkan..." : "Kirim Pendaftaran"}
                icon={isSubmitting ? "pi pi-spin pi-spinner" : "pi pi-send"}
                size="small"
                loading={isSubmitting}
                onClick={handleFinalSubmit}
                className="bg-emerald-600 hover:bg-emerald-700 text-white border-none px-4 sm:px-6 shadow-md text-xs sm:text-sm py-2"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
