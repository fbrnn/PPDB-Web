"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";
import { requestOtp, verifyOtp } from "../actions";

export function LoginForm() {
  const router = useRouter();
  const toastRef = useRef<Toast>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessInfo(null);

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Silakan masukkan alamat email yang valid.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await requestOtp(email.trim());
      if (res.success) {
        setStep("OTP");
        setSuccessInfo(res.message);
        toastRef.current?.show({
          severity: "success",
          summary: "Kode Terkirim",
          detail: res.message,
          life: 4000,
        });
      } else {
        setErrorMessage(res.message);
        toastRef.current?.show({
          severity: "error",
          summary: "Gagal Mengirim",
          detail: res.message,
          life: 4000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (otpCode.trim().length !== 6) {
      setErrorMessage("Kode OTP harus terdiri dari 6 digit angka.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await verifyOtp(email.trim(), otpCode.trim());
      if (res.success && res.data) {
        toastRef.current?.show({
          severity: "success",
          summary: "Berhasil Masuk",
          detail: res.message,
          life: 2000,
        });

        // Redirect ke dashboard sesuai role
        router.push(res.data.redirectUrl);
      } else {
        setErrorMessage(res.message);
        toastRef.current?.show({
          severity: "error",
          summary: "Verifikasi Gagal",
          detail: res.message,
          life: 4000,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      toastRef.current?.show({
        severity: "error",
        summary: "Kesalahan Sistem",
        detail: "Terjadi kesalahan. Silakan coba lagi.",
        life: 4000,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto bg-slate-900/20 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 p-8">
      <Toast ref={toastRef} />

      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/20 shadow-inner">
          <i className="pi pi-desktop text-2xl" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          SPMB Online
        </h1>
        <p className="text-[11px] text-white/70 mt-2 font-medium tracking-wide px-4">
          Sistem Penerimaan Murid Baru
          <br />
          SMK PGRI 2 Mejayan
        </p>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3 rounded-xl bg-red-500/20 border border-red-500/30 flex items-start gap-2.5 shadow-inner">
          <i className="pi pi-exclamation-circle text-red-400 text-base mt-[2px] shrink-0" />
          <p className="text-xs text-red-100 font-normal leading-relaxed">{errorMessage}</p>
        </div>
      )}

      {successInfo && step === "OTP" && (
        <div className="mb-5 p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-start gap-2.5 shadow-inner">
          <i className="pi pi-info-circle text-blue-400 text-base mt-[2px] shrink-0" />
          <p className="text-xs text-blue-100 font-normal leading-relaxed">{successInfo}</p>
        </div>
      )}

      {step === "EMAIL" ? (
        <form onSubmit={handleRequestOtp} className="space-y-5">
          <div className="relative w-full flex items-center">
            <i className="pi pi-user text-white/50 absolute left-4" />
            <InputText
              id="email"
              type="email"
              placeholder="Email Aktif"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm bg-black/40 border border-white/10 text-white placeholder:text-white/40 rounded-xl focus:bg-black/60 focus:border-white/30 transition-all hover:bg-black/50"
              disabled={isSubmitting}
              required
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 flex justify-center items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-xl shadow-lg shadow-red-500/20 border-none text-sm font-bold tracking-wide transition-all"
          >
            {isSubmitting ? (
              <i className="pi pi-spin pi-spinner" />
            ) : null}
            <span>{isSubmitting ? "MENGIRIM..." : "KIRIM OTP"}</span>
          </Button>

          <div className="pt-4 text-center">
            <p className="text-[11px] text-white/60">
              Ingin kembali?{" "}
              <Link href="/" className="text-[#f87171] hover:text-[#fca5a5] font-semibold transition-colors">
                Ke Beranda
              </Link>
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div className="relative w-full flex items-center">
            <i className="pi pi-lock text-white/50 absolute left-4" />
            <InputText
              id="otp"
              type="text"
              maxLength={6}
              placeholder="Kode 6 Digit"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
              className="w-full pl-11 pr-4 py-3 text-sm bg-black/40 border border-white/10 text-white placeholder:text-white/40 rounded-xl focus:bg-black/60 focus:border-white/30 transition-all text-center tracking-widest font-mono"
              disabled={isSubmitting}
              required
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 flex justify-center items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-xl shadow-lg shadow-red-500/20 border-none text-sm font-bold tracking-wide transition-all"
          >
            {isSubmitting ? (
              <i className="pi pi-spin pi-spinner" />
            ) : null}
            <span>{isSubmitting ? "MEMVERIFIKASI..." : "LOGIN"}</span>
          </Button>

          <div className="flex items-center justify-between text-[11px] pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setStep("EMAIL");
                setOtpCode("");
                setErrorMessage(null);
                setSuccessInfo(null);
              }}
              className="text-white/60 hover:text-white transition-colors cursor-pointer flex items-center"
              disabled={isSubmitting}
            >
              <i className="pi pi-arrow-left mr-1 text-[10px]" /> Ganti Email
            </button>

            <button
              type="button"
              onClick={handleRequestOtp}
              className="text-[#f87171] hover:text-[#fca5a5] font-semibold transition-colors cursor-pointer"
              disabled={isSubmitting}
            >
              Kirim Ulang
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
