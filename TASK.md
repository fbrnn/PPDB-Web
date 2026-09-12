# SPMB / PPDB Web - Task & Progress Tracking

> **Status Proyek**: Fase Inisialisasi & Setup Arsitektur Dasar  
> **Terakhir Diperbarui**: 2026-09-07  
> **Tujuan Dokumen**: Dokumen ini adalah *Single Source of Truth* untuk melacak progres pengembangan sistem PPDB Web (SPMB). Setiap AI Agent yang mengerjakan proyek ini **WAJIB** membaca dokumen ini, memperbarui status task (`[ ]` -> `[-]` -> `[x]`), dan mencatat handover log sebelum menyelesaikan tugasnya.

---

## 📌 Aturan Penting Handover Antar-Agent (Agent Handover Protocol)

Bagi Agent yang melanjutkan pekerjaan di proyek ini:
1. **Patuhi `AGENTS.md`**:
   - Seluruh teks antarmuka pengguna (UI, form, tombol, pesan error/sukses, status) **HARUS** berbahasa Indonesia.
   - Seluruh kode sumber (nama variabel, fungsi, file, skema DB, tipe) **HARUS** berbahasa Inggris.
   - Arsitektur MVP sederhana: hindari overengineering (jangan buat repo/service/use-case layer berlebihan).
   - Server Actions untuk mutasi internal; tidak perlu REST API endpoint `/api` untuk CRUD internal biasa.
   - Autentikasi menggunakan Passwordless Email OTP (tanpa password).
   - Otorisasi berbasis `admin_allowlist`.
2. **Perbarui `TASK.md`**:
   - Beri tanda `[-]` saat memulai suatu task.
   - Beri tanda `[x]` setelah task selesai dan terverifikasi.
   - Tambahkan catatan penting pada bagian **Log Handover & Catatan Arsitektur** di bawah jika ada keputusan teknis atau langkah tertunda.
   - Pastikan task berikutnya yang belum dikerjakan tertera jelas di bagian **Immediate Next Steps**.

---

## 🚀 Status Fase & Roadmap Pekerjaan

### Fase 1: Inisialisasi Proyek & Pondasi Sistem
- [x] Inisialisasi Next.js (App Router, TypeScript, Tailwind CSS, `src/` directory)
- [x] Instalasi dependensi:
  - [x] `primereact` & `primeicons`
  - [x] `drizzle-orm`, `mysql2`, `drizzle-kit`
  - [x] `zod`
  - [x] `jose` (JWT cookie session)
  - [x] `motion` (Motion for animations)
  - [x] `clsx`, `tailwind-merge`
- [x] Konfigurasi Tailwind CSS berdampingan dengan PrimeReact theme
- [x] Konfigurasi PrimeReact Provider (`src/components/providers/prime-provider.tsx`)
- [x] Setup struktur folder sesuai `AGENTS.md`:
  - `src/app/(public)`, `src/app/(auth)`, `src/app/(student)`, `src/app/(admin)`
  - `src/components/shared`, `src/components/landing`
  - `src/features/auth`, `src/features/registration`, `src/features/content`
  - `src/db/schema`, `src/lib`, `src/types`
- [x] Buat file template konfigurasi `.env.example` dan `.env.local`

### Fase 2: Database Schema & Setup Drizzle ORM
- [x] Setup `drizzle.config.ts` dan koneksi database di `src/db/index.ts`
- [x] Definisikan skema tabel di `src/db/schema/`:
  - [x] `users.ts`: id, email, role (`STUDENT`, `ADMIN`, `SUPER_ADMIN`), timestamps
  - [x] `admin-allowlist.ts`: id, email, role, timestamps
  - [x] `registrations.ts`: id, userId, status (`DRAFT`, `SUBMITTED`, `REVISION_REQUIRED`, `VERIFIED`), personalData, address, previousSchool, parentData, revisionNotes, timestamps
  - [x] `otps.ts`: id, email, code, expiresAt, usedAt, timestamps
- [x] Setup script db generate / push pada `package.json` & generate migrasi awal `0000_futuristic_living_lightning.sql`

### Fase 3: Fitur Autentikasi Passwordless Email OTP
- [x] Helper OTP di `src/lib/otp.ts` (generate 6-digit OTP, batas kadaluarsa 10 menit)
- [x] Helper Session di `src/lib/session.ts` / `src/features/auth/auth.ts` (cookie enkripsi 30 hari via `jose`)
- [x] Server Actions autentikasi di `src/features/auth/actions.ts`:
  - [x] `requestOtp(email)`: simpan OTP & log/kirim email simulasi
  - [x] `verifyOtp(email, code)`: validasi OTP, cek `admin_allowlist`, set session cookie, return role/redirect
  - [x] `signOutUser()`: hapus cookie sesi
- [x] Helper otorisasi server-side:
  - [x] `requireUser()`: memastikan ada sesi valid
  - [x] `requireAdmin()`: memastikan role ADMIN atau SUPER_ADMIN
  - [x] `requireSuperAdmin()`: memastikan role SUPER_ADMIN
- [x] Halaman Login UI di `src/app/(auth)/login/page.tsx` & `src/features/auth/components/login-form.tsx`

### Fase 4: Public Landing Page (Tailwind CSS + Motion)
- [x] Komponen landing di `src/components/landing/`:
  - [x] `navbar.tsx`: Header navigasi, status login, tombol Masuk / Daftar PPDB
  - [x] `hero.tsx`: Banner PPDB, jadwal pembukaan pendaftaran, tombol CTA
  - [x] `about.tsx`: Profil singkat sekolah, visi & misi
  - [x] `programs.tsx`: Program kejuruan / kurikulum unggulan
  - [x] `facilities.tsx`: Sarana & fasilitas sekolah
  - [x] `news.tsx`: Berita & pengumuman SPMB
  - [x] `footer.tsx`: Informasi kontak, peta lokasi, media sosial
- [x] Integrasi halaman utama `src/app/(public)/page.tsx`

### Fase 5: Portal Siswa & Formulir Pendaftaran Multi-Step (PrimeReact)
- [x] Skema Validasi Zod di `src/features/registration/schemas.ts`
- [x] Server Actions di `src/features/registration/actions.ts`:
  - [x] `saveRegistrationDraft(data)`: Debounced autosave ke database
  - [x] `submitRegistration(data)`: Validasi menyeluruh & submit final status `SUBMITTED`
- [x] Queries di `src/features/registration/queries.ts`:
  - [x] `getMyRegistration()`: Ambil pendaftaran milik user yang login
- [x] Komponen Formulir Multi-Step PrimeReact di `src/features/registration/components/`:
  - [x] `registration-form.tsx`: State manager, debounced autosave, local backup LocalStorage
  - [x] `personal-data-step.tsx`: NISN, NIK, nama lengkap, tempat/tanggal lahir, jenis kelamin, agama
  - [x] `address-step.tsx`: Alamat lengkap, RT/RW, kelurahan, kecamatan, kota, kode pos
  - [x] `school-data-step.tsx`: Asal sekolah, NPSN asal sekolah, tahun lulus, nomor ijazah
  - [x] `parent-data-step.tsx`: Data ayah, ibu, dan wali (nama, NIK, pekerjaan, penghasilan, kontak)
  - [x] `review-step.tsx`: Ringkasan data sebelum submit final & pernyataan kebenaran
- [x] Status Banner Autosave (Menyimpan..., Tersimpan, Gagal menyimpan, Perubahan disimpan di perangkat lokal)
- [x] Halaman Pendaftaran: `src/app/(student)/pendaftaran/page.tsx`
- [x] Halaman Dashboard Siswa: `src/app/(student)/dashboard/page.tsx` (Status pendaftaran: Draf, Terkirim, Perlu Perbaikan, Terverifikasi)

### Fase 6: Panel Admin SPMB (PrimeReact)
- [x] Layout admin di `src/app/(admin)/layout.tsx` (Sidebar/Topbar navigasi admin)
- [x] Halaman Dashboard Admin di `src/app/(admin)/admin/dashboard/page.tsx`:
  - [x] Ringkasan kartu statistik (Total Pendaftar, Menunggu Verifikasi, Perlu Perbaikan, Terverifikasi)
  - [x] Tabel pendaftar terbaru dengan status badge
- [x] Halaman Kelola Pendaftar di `src/app/(admin)/admin/pendaftar/page.tsx`:
  - [x] PrimeReact `DataTable` dengan filter status, pencarian nama/NISN, sort
  - [x] Tombol aksi: lihat detail, verifikasi sah, minta perbaikan (dengan input catatan revisi)
- [x] Server Action admin:
  - [x] `updateRegistrationStatus(registrationId, status, notes)`

### Fase 7: Pengujian, Seeding & Dokumentasi
- [x] Uji kompilasi tipe TypeScript (`npx tsc --noEmit`) - 0 error
- [x] Uji build Next.js (`npm run build`) - Seluruh route berhasil dikompilasi (Dynamic & Static)
- [x] Buat skrip seeder database admin di `src/db/seed.ts` (`npm run db:seed`)
- [x] Dokumentasikan panduan setup dan arsitektur di `README.md`

---

## 🎯 Immediate Next Steps (Fokus Pekerjaan untuk Agent Berikutnya)

1. **Koneksi Database MySQL Lokal / Staging**:
   - Pastikan server MySQL berjalan di port `3306` dengan database `spmb_db` (atau sesuaikan nilai `DATABASE_URL` pada `.env.local`).
   - Jalankan `npm run db:push` untuk menerapkan skema tabel ke MySQL.
   - Jalankan `npm run db:seed` untuk membuat akun administrator awal (`admin@sekolah.sch.id`).
2. **Uji Coba Fungsional Browser (Opsional / Manual)**:
   - Jalankan `npm run dev` dan buka browser di `http://localhost:3000`.
   - Coba login menggunakan email murid baru untuk memastikan kode OTP tercetak di terminal dan formulir pendaftaran dapat disimpan.
   - Coba login menggunakan `admin@sekolah.sch.id` untuk memverifikasi halaman panel admin.
3. **Penyempurnaan Fitur Tambahan (Jika Diinginkan oleh Pengguna)**:
   - Upload berkas (foto/ijazah) jika ada instruksi tambahan dari pengguna di masa depan.
   - Ekspor data pendaftar ke file Excel/PDF dari tabel admin jika diperlukan.

---

## 📝 Log Handover & Catatan Arsitektur

| Tanggal | Oleh Agent | Catatan Progres / Keputusan Teknis |
| :--- | :--- | :--- |
| 2026-09-07 | Agent 1 (Initial Setup) | Membaca dan memahami penuh seluruh instruksi `AGENTS.md`. Membuat dokumen pelacak `TASK.md` dan `implementation_plan.md`. Menginisialisasi Next.js 16 + React 19 + Tailwind CSS v4 + PrimeReact 10.9.9 + Drizzle ORM + Zod v4 + Jose. Mengimplementasikan skema database MySQL (`users`, `admin_allowlist`, `otps`, `registrations`), fitur autentikasi Passwordless Email OTP, Landing Page Publik (Tailwind + Motion), Portal Siswa dengan Formulir Multi-Step SPMB (Autosave Debounced + LocalStorage backup), dan Panel Admin dengan PrimeReact DataTable dan dialog verifikasi/revisi. Seluruh pengujian kompilasi tipe TypeScript dan build Next.js sukses 100%. |

