import { z } from "zod";

export const requestOtpSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid")
    .transform((val) => val.trim().toLowerCase()),
});

export const verifyOtpSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid")
    .transform((val) => val.trim().toLowerCase()),
  code: z
    .string()
    .min(1, "Kode OTP wajib diisi")
    .length(6, "Kode OTP harus terdiri dari 6 digit angka")
    .regex(/^\d+$/, "Kode OTP hanya boleh berisi angka"),
});

export type RequestOtpInput = z.infer<typeof requestOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
