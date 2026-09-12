# PPDB Web - School Admission Management System (SPMB)

Sistem Penerimaan Murid Baru (SPMB / PPDB Online) berbasis web yang modern, cepat, dan terintegrasi, dibangun sesuai dengan arsitektur dan prinsip yang ditentukan dalam [`AGENTS.md`](./AGENTS.md).

---

## 🛠️ Teknologi & Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19)
- **Language**: TypeScript
- **Styling**:
  - **Landing Page Publik**: Tailwind CSS v4 + Motion
  - **Portal Siswa, Form SPMB, & Panel Admin**: PrimeReact + PrimeIcons
- **Database & ORM**: MySQL + [Drizzle ORM](https://orm.drizzle.team/)
- **Autentikasi**: Passwordless Email OTP (Sesi Cookie JWT ~30 hari via `jose`)
- **Validasi**: Zod

---

## 🚀 Panduan Memulai

### 1. Prasyarat
- Node.js versi 18+ (direkomendasikan Node 20+)
- Server database MySQL aktif

### 2. Konfigurasi Lingkungan (.env)
Salin file `.env.example` ke `.env.local` atau pastikan variabel berikut terisi:

```env
DATABASE_URL="mysql://root:password@localhost:3306/spmb_db"
SESSION_SECRET="ppdb_super_secret_session_key_min_32_characters_long_12345"
NODE_ENV="development"
```

### 3. Migrasi Database
Jalankan migrasi tabel ke MySQL:
```bash
# Push skema langsung ke database
npm run db:push

# Atau generate migrasi SQL:
npm run db:generate
```

### 4. Seeding Administrator Utama
Tambahkan akun admin awal ke tabel `admin_allowlist`:
```bash
npm run db:seed
```
*Email default admin:* `admin@sekolah.sch.id`

### 5. Menjalankan Server Development
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

---

## 🔐 Alur Autentikasi Passwordless Email OTP

1. Calon siswa atau admin membuka `/login` dan memasukkan alamat email aktif.
2. Sistem menghasilkan 6 digit kode OTP yang berlaku selama 10 menit.
   - *Dalam mode development:* Kode OTP ditampilkan langsung di terminal console.
3. Pengguna memasukkan 6 digit kode untuk verifikasi.
4. Sistem memeriksa tabel `admin_allowlist`:
   - Jika terdaftar: dialihkan ke `/admin/dashboard`
   - Jika tidak terdaftar: terdaftar sebagai `STUDENT` dan dialihkan ke `/dashboard`.
5. Sesi login disimpan dalam cookie HTTP-Only selama 30 hari.

---

## 📋 Struktur Route Aplikasi

- `/` : Landing Page Publik (Profil sekolah, keunggulan, sarana, alur pendaftaran, berita/pengumuman)
- `/login` : Autentikasi Passwordless OTP
- `/dashboard` : Dashboard Siswa (Status pendaftaran & catatan revisi)
- `/pendaftaran` : Formulir Pendaftaran Multi-Step (Data pribadi, alamat, sekolah asal, data ortu, tinjau & kirim) dengan Debounced Autosave & LocalStorage backup
- `/admin/dashboard` : Statistik ringkasan pendaftar
- `/admin/pendaftar` : Manajemen DataTable pendaftar, pencarian, filter status, dan dialog verifikasi/catatan revisi

---

## 🤖 Panduan untuk Agen AI Berikutnya
Silakan periksa file [`TASK.md`](./TASK.md) sebelum memulai pekerjaan untuk melihat status terbaru dan catatan serah terima (handover).
