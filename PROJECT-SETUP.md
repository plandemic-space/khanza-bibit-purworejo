# Instruksi Project: Khanza Bibit — Landing Page

**Copy-paste teks di bawah ini ke kolom "Custom Instructions" waktu bikin Project baru di Claude.**

---

## Tentang Proyek Ini

Saya (Ngemplak) adalah developer yang mengerjakan landing page untuk **Khanza Bibit**, penjual bibit tanaman kayu, buah-buahan, hias, dan rempah-rempah di Kec. Kemiri, Purworejo, Jawa Tengah.

Website sudah live di: **https://khanzabibit.vercel.app/**
Repo GitHub: (isi link repo Bapak di sini kalau mau)

## Stack & Struktur

Website statis — HTML/CSS/JS murni, tanpa framework/build tool. Struktur folder:
```
khanza-bibit-web/
├── index.html
├── css/style.css
├── js/script.js
├── images/
└── README.md
```

## Info Bisnis (jangan diubah tanpa konfirmasi)

- **Nama**: Khanza Bibit
- **Alamat**: Ngemplak RT 02 / RW 02, Desa Samping, Kec. Kemiri, Kabupaten Purworejo, Jawa Tengah 54262
- **WhatsApp**: 0822-2441-5565
- **TikTok**: @teguh.wibowo561
- **Google Maps**: rating 4.9 dari 12 ulasan (data lama, ada 11 ulasan baru menunggu masuk resmi), link https://maps.app.goo.gl/UqwznX7Ne4UvaN2a9
- **Kontak/Admin**: Dya Mardhiana & Teguh Wibowo

## Gaya Desain

Tema "kertas kebun" — krem, hijau pinus, aksen warna per kategori (kayu=hijau, buah=ochre/kuning, hias=moss, rempah=paprika/merah). Elemen khas: kartu produk berbentuk label gantung bibit (nursery tag), sesuai kebiasaan Khanza yang selalu melabeli tiap bibit dengan kode (contoh: SAB 034, TA-21).

## Gaya Bahasa / Copywriting

Bahasa Indonesia, **sopan & meyakinkan tapi ringkas** — bukan gaya sastra/muter-muter. Hindari kalimat panjang atau istilah yang terlalu puitis.

## Yang Perlu Diingat Claude Setiap Sesi

1. Selalu cek file `index.html`, `css/style.css`, `js/script.js` di knowledge base project ini sebelum menjawab pertanyaan soal kode — jangan asumsi dari ingatan chat lama.
2. Harga & stok produk **sengaja tidak dicantumkan** di web (fluktuatif) — semua CTA produk mengarah ke WhatsApp.
3. Katalog berisi 27 produk di 4 kategori (Buah 9, Hias 5, Kayu 6, Rempah 7) — kalau ada yang out of stock, hapus kartunya di `index.html`, jangan cuma disembunyikan.
4. Semua foto produk adalah **foto asli** (sudah dikonfirmasi Owner) — belum ada foto proses packing, tapi itu bukan prioritas karena galeri homepage diputuskan tidak dipakai (cukup FB & TikTok untuk bukti visual).
5. Kalau saya minta "audit" atau "cek situs", dan yang dimaksud adalah versi yang sudah live, gunakan web fetch ke https://khanzabibit.vercel.app/ — jangan hanya mengandalkan file di knowledge base, karena bisa saja sudah beda dari yang di-upload.

---

## 📋 File yang Perlu Diupload ke Knowledge Base Project

Setelah bikin Project dan paste instruksi di atas, upload file-file ini ke bagian knowledge base (tombol "+" di halaman project):

- [ ] `index.html`
- [ ] `css/style.css`
- [ ] `js/script.js`
- [ ] `README.md`
- [ ] Brief awal proyek (kalau masih ada — `Brief-Landing-Page-Khanza-Bibit-Tanaman.md`)

*Foto-foto di folder `images/` tidak wajib diupload ke knowledge base (lebih untuk referensi kode, bukan visual) — kecuali Bapak mau saya bantu review kualitas fotonya juga.*

## 🚀 Cara Bikin Project-nya

1. Buka [claude.ai/projects](https://claude.ai/projects)
2. Klik **"+ New Project"**
3. Kasih nama, misal: **"Khanza Bibit — Web"**
4. Di kolom instruksi, paste isi dokumen ini (bagian atas, sebelum checklist)
5. Upload file-file di checklist atas lewat tombol **"+"** di knowledge base
6. Mulai chat baru di dalam project ini — saya otomatis sudah paham konteksnya
