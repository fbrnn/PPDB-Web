export const APP_NAME = "SPMB Online";
export const APP_DESCRIPTION = "Sistem Penerimaan Murid / Mahasiswa Baru";

export const USER_ROLES = {
  STUDENT: "STUDENT",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const REGISTRATION_STATUS = {
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
  REVISION_REQUIRED: "REVISION_REQUIRED",
  VERIFIED: "VERIFIED",
} as const;

export type RegistrationStatus =
  (typeof REGISTRATION_STATUS)[keyof typeof REGISTRATION_STATUS];

export const REGISTRATION_STATUS_LABELS: Record<RegistrationStatus, string> = {
  DRAFT: "Draf",
  SUBMITTED: "Terkirim (Menunggu Verifikasi)",
  REVISION_REQUIRED: "Perlu Perbaikan",
  VERIFIED: "Terverifikasi",
};

export const REGISTRATION_STATUS_SEVERITY: Record<
  RegistrationStatus,
  "info" | "warning" | "danger" | "success"
> = {
  DRAFT: "info",
  SUBMITTED: "warning",
  REVISION_REQUIRED: "danger",
  VERIFIED: "success",
};

export const SESSION_COOKIE_NAME = "spmb_session";
export const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds
