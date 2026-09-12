import { z } from "zod";

// Skema untuk Draf (fleksibel & opsional agar autosave tidak gagal di tengah jalan)
export const registrationDraftSchema = z.object({
  fullName: z.string().optional().nullable(),
  nisn: z.string().optional().nullable(),
  nik: z.string().optional().nullable(),
  gender: z.enum(["L", "P"]).optional().nullable(),
  birthPlace: z.string().optional().nullable(),
  birthDate: z.string().optional().nullable(),
  religion: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),

  address: z.string().optional().nullable(),
  rtRw: z.string().optional().nullable(),
  village: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),

  previousSchoolName: z.string().optional().nullable(),
  previousSchoolNpsn: z.string().optional().nullable(),
  graduationYear: z.string().optional().nullable(),
  diplomaNumber: z.string().optional().nullable(),

  fatherName: z.string().optional().nullable(),
  fatherNik: z.string().optional().nullable(),
  fatherOccupation: z.string().optional().nullable(),
  fatherPhone: z.string().optional().nullable(),

  motherName: z.string().optional().nullable(),
  motherNik: z.string().optional().nullable(),
  motherOccupation: z.string().optional().nullable(),
  motherPhone: z.string().optional().nullable(),

  guardianName: z.string().optional().nullable(),
  guardianNik: z.string().optional().nullable(),
  guardianOccupation: z.string().optional().nullable(),
  guardianPhone: z.string().optional().nullable(),
  guardianRelation: z.string().optional().nullable(),
});

// Skema untuk Pengiriman Final (Wajib terisi lengkap sebelum status beralih ke SUBMITTED)
export const registrationSubmitSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  nisn: z.string().min(10, "NISN harus terdiri dari 10 digit").max(10, "NISN harus 10 digit"),
  nik: z.string().min(16, "NIK harus terdiri dari 16 digit").max(16, "NIK harus 16 digit"),
  gender: z.enum(["L", "P"], { message: "Pilih jenis kelamin" }),
  birthPlace: z.string().min(2, "Tempat lahir wajib diisi"),
  birthDate: z.string().min(1, "Tanggal lahir wajib diisi"),
  religion: z.string().min(2, "Agama wajib dipilih"),
  phoneNumber: z.string().min(9, "Nomor WhatsApp / HP tidak valid"),

  address: z.string().min(5, "Alamat domisili lengkap wajib diisi"),
  rtRw: z.string().min(3, "RT / RW wajib diisi"),
  village: z.string().min(2, "Kelurahan / Desa wajib diisi"),
  district: z.string().min(2, "Kecamatan wajib diisi"),
  city: z.string().min(2, "Kota / Kabupaten wajib diisi"),
  postalCode: z.string().min(5, "Kode pos minimal 5 digit"),

  previousSchoolName: z.string().min(3, "Nama sekolah asal wajib diisi"),
  graduationYear: z.string().min(4, "Tahun kelulusan harus 4 digit"),

  fatherName: z.string().min(2, "Nama ayah wajib diisi"),
  motherName: z.string().min(2, "Nama ibu wajib diisi"),
});

export type RegistrationDraftInput = z.infer<typeof registrationDraftSchema>;
export type RegistrationSubmitInput = z.infer<typeof registrationSubmitSchema>;
