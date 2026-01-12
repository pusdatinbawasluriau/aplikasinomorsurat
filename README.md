# 🏢 Sistem Penomoran Surat Bawaslu Riau

Aplikasi berbasis web untuk manajemen penomoran surat dinas di lingkungan Bawaslu Provinsi Riau. Aplikasi ini dirancang untuk memudahkan staf dalam mendapatkan nomor surat secara otomatis, berurutan, dan sesuai dengan aturan tata naskah dinas.

## 🚀 Fitur Utama

- **Sisi User**: Form input penomoran mandiri (tanpa login).
- **Sisi Admin**:
  - **Dashboard Statistik**: Visualisasi data surat masuk per bulan dan per kode klasifikasi menggunakan D3.js.
  - **Input Penomoran**: Form khusus admin untuk menerbitkan nomor surat.
  - **Riwayat Naskah**: Manajemen data surat yang telah diterbitkan (lihat & hapus).
  - **Pengaturan Klasifikasi**: Kelola Kode Klasifikasi (PM, PP, PS, dll) dan Kode Turunan secara dinamis.

## 🔑 Akses Login Admin

- **Username**: `admin`
- **Password**: `bawaslu2026`

## 🛠️ Panduan Menjalankan di GitHub

Aplikasi ini dapat dijalankan langsung menggunakan **GitHub Pages** sebagai situs statis.

### Langkah 1: Buat Repositori Baru
1. Masuk ke akun GitHub Anda.
2. Buat repositori baru (misalnya: `penomoran-bawaslu`).
3. Upload semua file aplikasi ini ke repositori tersebut.

### Langkah 2: Aktivasi GitHub Pages
1. Buka tab **Settings** di repositori GitHub Anda.
2. Pilih menu **Pages** di sidebar kiri.
3. Pada bagian **Build and deployment > Branch**, pilih branch `main` (atau `master`) dan folder `/ (root)`.
4. Klik **Save**.
5. Tunggu 1-2 menit, GitHub akan memberikan URL (misal: `https://username.github.io/penomoran-bawaslu/`).

### Langkah 3: Penyesuaian Base URL (Penting!)
Karena aplikasi ini menggunakan rute fragmen (`hash location strategy`), Anda tidak perlu melakukan konfigurasi tambahan pada server. Rute akan bekerja dengan format:
`https://username.github.io/penomoran-bawaslu/#/login`

## 📋 Logika Penomoran
Format: `Nomor/Kode Klasifikasi/Kode Penandatangan/Bulan/Tahun`
- **Urutan**: Nomor urut berjalan otomatis per Kode Klasifikasi.
- **Tanggal Mundur**: Jika mengambil nomor di tanggal yang sudah ada datanya, sistem otomatis menambahkan akhiran `.2`, `.3`, dst.
- **Kode Penandatangan**: 
  - `K.RA` jika ditandatangani oleh Ketua (Alnofrizal).
  - `RA` untuk penandatangan lainnya.

## 💻 Teknologi yang Digunakan
- **Angular v20** (Zoneless & Standalone Components)
- **Tailwind CSS** (Styling)
- **D3.js** (Data Visualization)
- **Local Storage** (Penyimpanan Data - Tanpa Database Server)

---
*Dikembangkan untuk Bawaslu Provinsi Riau.*
