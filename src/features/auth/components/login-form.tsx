"use client";

import React, { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";
import { requestOtp, verifyOtp } from "../actions";

export function LoginForm() {
  const router = useRouter();
  const toastRef = useRef<Toast>(null);
  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessInfo(null);

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Silakan masukkan alamat email yang valid.");
      return;
    }

    startTransition(async () => {
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
    });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (otpCode.trim().length !== 6) {
      setErrorMessage("Kode OTP harus terdiri dari 6 digit angka.");
      return;
    }

    startTransition(async () => {
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
        router.refresh();
      } else {
        setErrorMessage(res.message);
        toastRef.current?.show({
          severity: "error",
          summary: "Verifikasi Gagal",
          detail: res.message,
          life: 4000,
        });
      }
    });
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
      <Toast ref={toastRef} />

      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">
          <i className="pi pi-shield text-xl" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Masuk ke Portal SPMB
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          {step === "EMAIL"
            ? "Masukkan alamat email Anda untuk menerima kode OTP masuk."
            : `Masukkan 6 digit kode OTP yang dikirim ke ${email}`}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6">
          <Message severity="error" text={errorMessage} className="w-full" />
        </div>
      )}

      {successInfo && step === "OTP" && (
        <div className="mb-6">
          <Message severity="info" text={successInfo} className="w-full" />
        </div>
      )}

      {step === "EMAIL" ? (
        <form onSubmit={handleRequestOtp} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Alamat Email Aktif
            </label>
            <span className="p-input-icon-left w-full">
              <i className="pi pi-envelope text-slate-400 pl-3" />
              <InputText
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 py-2.5"
                disabled={isPending}
                required
                autoFocus
              />
            </span>
          </div>

          <Button
            type="submit"
            label={isPending ? "Mengirim Kode..." : "Kirim Kode OTP"}
            icon={isPending ? "pi pi-spin pi-spinner" : "pi pi-send"}
            loading={isPending}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white border-none shadow-md font-medium"
          />

          <p className="text-xs text-center text-slate-400 mt-4 leading-relaxed">
            Sistem kami menggunakan verifikasi tanpa kata sandi (Passwordless OTP)
            untuk keamanan akun dan kemudahan akses Anda.
          </p>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="otp"
              className="text-sm font-medium text-slate-700"
            >
              Kode Verifikasi (6 Digit)
            </label>
            <InputText
              id="otp"
              type="text"
              maxLength={6}
              placeholder="123456"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
              className="w-full text-center text-2xl tracking-widest font-mono py-2.5"
              disabled={isPending}
              required
              autoFocus
            />
          </div>

          <Button
            type="submit"
            label={isPending ? "Memverifikasi..." : "Verifikasi & Masuk"}
            icon={isPending ? "pi pi-spin pi-spinner" : "pi pi-check"}
            loading={isPending}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white border-none shadow-md font-medium"
          />

          <div className="flex items-center justify-between text-xs pt-2">
            <button
              type="button"
              onClick={() => {
                setStep("EMAIL");
                setOtpCode("");
                setErrorMessage(null);
                setSuccessInfo(null);
              }}
              className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              disabled={isPending}
            >
              <i className="pi pi-arrow-left mr-1" /> Ganti Email
            </button>

            <button
              type="button"
              onClick={handleRequestOtp}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
              disabled={isPending}
            >
              Kirim Ulang Kode
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
