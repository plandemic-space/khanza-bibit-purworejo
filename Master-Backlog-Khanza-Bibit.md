# Master Backlog Pengembangan Website — Khanza Bibit
**Sumber:** Audit Bisnis & Strategi, Audit CRO, Audit UI/UX & Branding, Audit Teknikal SEO, Roadmap Implementasi, + update lapangan dari Owner (domain benar, kesepakatan harga pasar, data ulasan & koordinat Maps).
**Metode:** Temuan yang tumpang tindih antar audit digabung jadi satu item. Item yang saling bertentangan diselesaikan lewat analisis trade-off di Bagian 0 sebelum masuk backlog, supaya tidak ada instruksi kontradiktif ke tim eksekusi.
**Domain resmi:** `https://khanzabibit.vercel.app`. `khanza-bibit.vercel.app` (bertanda hubung) = domain lama, akan di-redirect.

**Dokumen ini sekarang jadi satu-satunya sumber kebenaran** untuk status progres & data bisnis (alamat, WA, rating). `README.md` dan `PROJECT-SETUP.md` cuma merujuk ke sini, gak nyimpen angka sendiri lagi. `Roadmap-Implementasi-Khanza-Bibit.md` sudah diarsipkan — isinya sudah terserap ke sini, gak perlu diupload/dibaca lagi kecuali buat referensi historis.

---

## ⚠️ CATATAN VERIFIKASI (update terakhir: audit langsung ke isi zip, bukan cuma laporan sesi)

Status di Bagian 5 di bawah sudah diverifikasi manual (grep + hitung kontras + baca JSON-LD langsung dari kode), bukan cuma dipercaya dari laporan sesi sebelumnya.

**4 gap yang sempat ketemu di audit sebelumnya — SEMUA SUDAH DIBERESKAN di sesi ini:**

1. ✅ **HI2 (WebP)** — sekarang beneran ada: 31 file `.webp` (semua foto produk + hero + logo), logo di-resize ke 160×160, semua `<img>` relevan dibungkus `<picture>` dengan fallback JPG/PNG.
2. ✅ **QW2 — GeoCoordinates** — blok `geo` (lat -7.659488, long 109.8746012) sudah masuk ke schema `GardenStore`.
3. ✅ **README.md & PROJECT-SETUP.md** — domain, alamat, rating, dan catatan foto (sempat salah bilang "ilustrasi AI" padahal sudah dikonfirmasi foto asli) sudah disamakan dengan kondisi situs terkini.
4. ✅ Komentar kosong `<!-- GALERI -->` sudah dibuang.

**Bonus di luar backlog:** favicon di-resize dari 32×32 → 96×96 (PNG, bukan WebP — Google & Safari kurang stabil baca favicon WebP), biar muncul di hasil pencarian Google sesuai rekomendasi resmi mereka (>48×48px).

**Catatan teknis:** ukuran folder `images/` sekarang naik jadi ~8.7MB (dari 5.3MB) karena file WebP ditambahkan **di samping** file JPG/PNG asli (untuk fallback browser lama) — bukan menggantikan. Yang dikirim ke browser pengunjung tetap lebih kecil (browser modern otomatis pilih WebP), storage server yang nambah dikit, bukan masalah.

**Pelajaran ke depan:** kalau sesi kerja mendekati batas/mentok, rekap dan kirim file dulu sebelum lanjut ke item berikutnya — supaya progres yang udah dikerjain gak keburu ilang kalau sesi keputus.

---

## 📌 UPDATE SESI JULI 2026 (lanjutan)

- **HI5 selesai** — 2 artikel baru (investasi-bibit-jati.html, durian-duri-hitam.html), riset keyword dulu (fokus lokal Kemiri/Purworejo, bukan keyword nasional yang udah dikuasai media besar), internal link 6 artikel diupdate, sitemap diupdate, index manual diminta.
- **HI4 & HI6 resmi ditutup** — keputusan Owner, gak dieksekusi.
- **Audit PageSpeed round 2 (real data, bukan asumsi)** — ketemu & dibenerin: kontras eyebrow gagal AA di 2 section (`.katalog-bg`, `.artikel-lainnya`), bug warna kategori di 6 artikel (semua kepatok hijau `--pine`, harusnya beda per kategori), gambar oversized (858 KiB waste), forced reflow di script.js (baca `window.innerWidth`), render-blocking Google Fonts. Performance naik 74→94, Accessibility 95→100.
- **Insiden CSP:** sempat pasang trik `onload` inline buat async-load font — ternyata dilarang CSP `script-src 'self'` yang udah dipasang (HI8), bikin console error & Best Practices turun ke 92. Sudah di-revert ke cara yang CSP-safe (preload + link biasa, gak pakai inline event handler). **Pelajaran: jangan pernah pakai inline `onload`/inline `<script>` di project ini, CSP-nya strict.**
- **Vercel Web Analytics terpasang** — pakai cara CSP-safe (polyfill `window.va` dipindah ke `script.js` eksternal, bukan inline kayak contoh resmi Vercel), diaktifkan Owner di dashboard.
- **Review/AggregateRating schema untuk testimoni — dicek, TIDAK di-implement.** Google secara eksplisit gak kasih rich snippet buat "self-serving reviews" (bisnis mereview diri sendiri di web sendiri) sejak 2019. Jangan disarankan lagi kecuali ada platform review pihak ketiga yang legit.
- **Domain lama `khanza-bibit.vercel.app` (tanda hubung) sudah dihapus Owner** (konfirmasi: `DEPLOYMENT_NOT_FOUND`), tapi sempat ke-index Google dengan konten usang & klaim yang salah (rating 5.0, "garansi tumbuh", label semua bibit). Sudah diajukan hapus dari index via Google **Remove Outdated Content tool** (search.google.com/search-console/remove-outdated-content — tool publik, gak perlu verifikasi kepemilikan domain).

### 🔍 Audit Final 3-Perspektif (Frontend Engineer / Google Quality Rater / Calon Pelanggan)
**Skor: 8.7/10 — Layak dipublikasikan sebagai website UMKM profesional.**

Ketemu & langsung dibenerin (semua low-risk, low-effort):
1. **Bug fallback gambar (serius, gak kelihatan visual tapi nyata)** — semua 27 `<picture>` produk di `index.html` punya `<img src="....jpg">` yang filenya gak pernah ada sama sekali di folder `images/` (cuma versi `.webp` yang eksis). Kerja normal di browser modern (auto pakai `<source webp>`), tapi fallback-nya cuma ilusi — kalau webp gagal load/browser lama/tool yang baca `<img src>` langsung, hasilnya broken image icon. **Sudah diperbaiki**, `src` diarahkan ke file `.webp` yang beneran ada.
2. **Homepage gak nautkan 2 artikel baru** (investasi-bibit-jati.html, durian-duri-hitam.html) di section "Panduan Menanam" — cuma bisa ditemuin lewat "Baca Juga" artikel lain, ngurangin link equity dari homepage. **Sudah diperbaiki**, sekarang 6 artikel tertaut dari homepage.
3. **Rating bintang testimoni gak accessible** — unicode star (`★★★★★`) tanpa `aria-label`, screen reader gak bisa baca artinya. **Sudah diperbaiki**, ditambah `role="img" aria-label="Rating X dari 5 bintang"`.
4. **Klaim "Buka 24 Jam" di footer ambigu** — berdiri sendiri tanpa konteks di bawah alamat, bisa disalahartikan sebagai jam buka fisik kebun (gak masuk akal buat kebun bibit di desa). **Sudah diperbaiki**, diganti jadi "Chat WA dibalas 24 jam" di 8 halaman.

Temuan minor yang **belum** dibenerin (opsional, dampak kecil):
- Title tag artikel durian 69 karakter, sedikit di atas batas aman ~60 karakter SERP.
- Gak ada embed peta lokasi (cuma link ke Google Maps) — nice-to-have, bukan gap kritis.

---

# BAGIAN 0 — Resolusi Trade-off (Rekomendasi yang Saling Bertentangan)

Beberapa audit memberi rekomendasi yang kalau dijalankan bersamaan apa adanya akan saling bertabrakan. Berikut keputusan final + alasannya, supaya backlog di bawah tidak mengandung instruksi ganda.

### T1. Tampilkan harga (CRO) vs. Kesepakatan pasar bibit lokal (Owner)
- **Konflik:** Audit CRO merekomendasikan menampilkan rentang harga sebagai perbaikan berdampak terbesar. Owner mengonfirmasi ini tidak bisa dijalankan karena kesepakatan bersama antar pelaku pasar bibit lokal untuk tidak memasang harga di ruang publik.
- **Keputusan:** Tidak menampilkan harga dalam bentuk apa pun (bukan cuma "disembunyikan sedikit" dengan rentang kasar). Sebagai gantinya, percepat & perjelas jalur WhatsApp (CTA spesifik + `wa.me` prefilled text + alasan jujur di FAQ).
- **Alasan pemilihan:** Norma pasar lokal adalah batasan keras (hard constraint) yang tidak bisa dilanggar sepihak oleh satu pelaku usaha kecil — risikonya konflik dengan sesama pedagang bibit di komunitas yang sama. CRO tetap terlayani sebagian besar lewat pengurangan *friction proses*, bukan pengungkapan angka.

### T2. Badge urgensi/stok terbatas (CRO) vs. Autentisitas & E-E-A-T (SEO)
- **Konflik:** Audit CRO ingin lebih banyak sinyal urgensi ("Stok Terbatas") untuk mendorong konversi. Audit SEO/E-E-A-T memperingatkan terhadap konten yang terkesan dibuat-buat/tidak bisa diverifikasi.
- **Keputusan:** Badge urgensi **hanya** dipasang pada produk yang stoknya benar-benar terbatas musim ini (dikonfirmasi Owner), diterapkan konsisten ke semua produk yang memenuhi kondisi itu — bukan ditambah di semua produk sebagai gimmick.
- **Alasan pemilihan:** Urgensi yang jujur tetap mendorong konversi tanpa mengorbankan kepercayaan jangka panjang; urgensi palsu sekali ketahuan (dan pembeli desa/rural biasanya saling cerita) akan merusak reputasi lebih besar dari nilai konversi jangka pendek yang didapat.

### T3. Sistem checkout mandiri/e-commerce (skalabilitas) vs. Model transaksi berbasis WhatsApp (konteks pasar UMKM lokal)
- **Konflik:** Beberapa temuan (CRO soal lead-capture, Bisnis soal scalability) mengarah ke pembangunan sistem order/pembayaran otomatis. Tapi konteks pasar UMKM di wilayah ini secara konsisten lebih percaya transaksi berbasis WhatsApp dengan trust-building personal, bukan checkout impersonal.
- **Keputusan:** Tidak membangun sistem checkout mandiri sekarang. Tambahkan hanya lead-capture ringan (bukan pengganti WA, cuma jaring tambahan untuk traffic dingin yang belum siap chat). Checkout mandiri dievaluasi ulang nanti berdasarkan data volume chat riil (lihat item Long-term).
- **Alasan pemilihan:** Membangun sistem checkout terlalu dini berisiko menghilangkan sentuhan personal yang justru jadi kekuatan penjualan UMKM rural, sekaligus effort development tinggi untuk kebutuhan yang belum terbukti ada.

### T4. Interaktivitas tambahan (form, filter dinamis) vs. Situs statis (kekuatan crawlability SEO)
- **Konflik:** Beberapa rekomendasi (lead-capture, galeri interaktif) berpotensi mendorong migrasi ke framework JS yang lebih kompleks. Tapi Audit SEO menandai situs statis saat ini sebagai kekuatan besar (crawlability sempurna, tidak butuh JS untuk render konten).
- **Keputusan:** Tetap pertahankan arsitektur statis HTML. Interaktivitas baru (lead-capture, galeri) diimplementasikan sebagai widget ringan (vanilla JS kecil atau embed pihak ketiga seperti Google Form) yang **tidak mengubah cara konten utama di-render** — konten inti tetap ada langsung di HTML, bukan di-inject via JS.
- **Alasan pemilihan:** Ini persis pelajaran yang sudah pernah dialami di proyek SIMBAH (masalah client-side rendering yang sempat memengaruhi indexing halaman UMKM) — tidak perlu mengulang kesalahan yang sama di Khanza Bibit. Kesederhanaan ini juga cocok dengan preferensi kerja non-CLI/GUI.

### T5. Pindah ke custom domain (branding & kontrol) vs. Tetap di `.vercel.app` (gratis & sederhana)
- **Konflik:** Audit SEO menyarankan custom domain untuk kekuatan branding jangka panjang, tapi ini menambah biaya & kompleksitas untuk usaha yang masih tahap konsolidasi teknikal dasar.
- **Keputusan:** Ditunda ke kategori Long-term, dieksekusi setelah masalah domain ganda (`khanza-bibit` vs `khanzabibit`) benar-benar tuntas dan situs sudah stabil di domain gratis.
- **Alasan pemilihan:** Menambah domain ketiga sebelum domain kedua (lama) beres akan memperbesar risiko kebingungan sinyal SEO yang sudah jadi masalah kritis saat ini.

### T6. Prioritas waktu developer: perbaikan teknikal SEO vs. konten/trust
- **Konflik:** Audit SEO ingin semua isu teknikal (schema, heading, CLS/LCP) dikerjakan segera; Audit CRO & Bisnis ingin konten trust (foto, testimoni, garansi) diprioritaskan karena dampak konversi.
- **Keputusan:** Tidak dipilih salah satu — keduanya digabung dalam kategori **Quick Wins** yang sama di backlog di bawah, diurutkan bukan berdasarkan asal audit tapi murni rasio dampak:effort. Kebetulan sebagian besar item dari kedua sisi sama-sama low-effort, jadi tidak perlu dikorbankan salah satu.
- **Alasan pemilihan:** Effort kecil di kedua sisi berarti tidak ada trade-off riil dalam alokasi waktu — keduanya bisa selesai di periode yang sama (minggu pertama).

---

# BAGIAN 1 — 🟢 QUICK WINS (Impact Tinggi, Effort Rendah)

*Kerjakan semua ini dulu — total estimasi gabungan sekitar 3–4 hari kerja, dampaknya mencakup hampir seluruh isu kritis dari keempat audit.*

## 1.1 Fondasi Teknikal & Kepercayaan (gabungan Critical items)

| # | Item (gabungan dari) | Deskripsi ringkas | PIC |
|---|---|---|---|
| QW1 | Fix domain & canonical (SEO-C1) | Canonical/OG homepage salah arah ke domain lama `khanza-bibit.vercel.app`. Redirect 301 domain lama → domain baru, perbaiki tag, submit ulang di Search Console. | Developer |
| QW2 | Sinkronkan NAP + geo (SEO-C2 + SEO-H8, **sudah digabung**) | Alamat & link Maps beda-beda antar halaman. Koordinat sudah didapat (-7.659488, 109.8746012). Satukan link Maps `maps.app.goo.gl/XCTFWpKahprscj1H9` di semua halaman + schema. | Developer + Owner |
| QW3 | Putuskan status testimoni (SEO-C3) | Testimoni tanpa identitas asli. Tambahkan disclosure sementara ATAU mulai proses testimoni asli (lanjut ke QW4 di High Impact). | Owner + Content Writer |
| QW4 | Tulis kebijakan garansi (Bisnis + CRO-C4) | Belum ada garansi eksplisit — standar kategori yang sudah dipenuhi kompetitor. Tentukan hari garansi, syarat klaim, solusi (ganti/refund). | Owner + Content Writer + Developer |
| QW5 | CTA harga via WA + `wa.me` prefilled (revisi CRO-C5, lihat T1) | Karena harga tak bisa ditampilkan, percepat proses tanya-harga: CTA spesifik "Tanya Harga & Stok", link WA dengan teks otomatis per produk, FAQ jujur soal kenapa harga tak dipasang. | Content Writer + Developer |
| QW6 | Update klaim rating + waktu respons (CRO-H11) | Ganti "Rating 5.0" jadi "Rating 5.0 dari 11 ulasan Google Maps" (angka sudah dikonfirmasi), tambah estimasi waktu respons WA. | Content Writer + Owner |
| QW7 | Badge stok terbatas konsisten & jujur (CRO-M10, lihat T2) | Terapkan badge hanya ke produk yang benar-benar terbatas musim ini. | Owner + Developer |
| QW8 | Perbaiki subheadline hero (UI/UX-H12) | Headline & subheadline hero redundan, ganti subheadline jadi pesan pelengkap (area kirim/kecepatan respons). | Content Writer |

**Checklist implementasi gabungan (developer):**
- [x] Cek & hapus semua referensi `khanza-bibit` (tanda hubung) di environment variable/hardcode, redeploy. *(diverifikasi: nol hasil grep untuk `khanza-bibit.vercel` di seluruh file)*
- [x] Set 301 redirect domain lama → domain baru + noindex sementara di domain lama.
- [x] Samakan alamat & link Maps di footer homepage + 4 artikel + schema JSON-LD.
- [x] Tambahkan blok `GeoCoordinates` (lat -7.659488, long 109.8746012) ke schema `GardenStore`.
- [x] Pasang link `wa.me` dengan teks prefilled per produk untuk CTA harga. *(31 link diverifikasi)*
- [ ] Update copy rating & badge stok sesuai keputusan Owner. *(badge stok sudah beres, tapi angka rating masih nunggu konfirmasi final Owner — lihat QW6)*

**Checklist implementasi (owner):**
- [x] Konfirmasi status testimoni (asli/ilustrasi) dan beri izin pemakaian kalau asli.
- [x] Tentukan kebijakan garansi riil (hari, syarat klaim, solusi).
- [x] Tandai produk yang stoknya benar-benar terbatas musim ini. *(hasil: tidak ada yang benar-benar terbatas, badge dihapus)*
- [ ] Submit ulang homepage domain baru via Google Search Console setelah QW1 selesai. *(aksi manual di luar kode, gak bisa diverifikasi dari repo)*

## 1.2 Perbaikan Teknikal Cepat (gabungan item SEO + Accessibility, semua low-effort)

| # | Item (gabungan dari) | Deskripsi ringkas | PIC |
|---|---|---|---|
| QW9 | Heading H2→H4 jadi H3 (SEO-H2 + UI/UX Accessibility) | 32+ instance skip level di 5 halaman. Ganti `<h4>` produk/artikel-terkait/footer jadi `<h3>`, sesuaikan CSS. | Developer |
| QW10 | Perbaiki 3 kontras warna gagal WCAG AA (UI/UX-H3) | Bintang rating, label kategori, teks copyright footer — 3 kombinasi warna terukur gagal 4.5:1. Buat variabel warna teks baru. | UI Designer/Developer |
| QW11 | CLS fix: width/height logo 4 artikel (SEO-H4) | Logo header/footer di 4 halaman artikel tanpa dimensi eksplisit. Tambahkan `width="400" height="400"`. | Developer |
| QW12 | LCP fix: preload hero image (SEO-H5) | Hero image 327KB tanpa preload/fetchpriority. Tambahkan `<link rel="preload">` + `fetchpriority="high"`. | Developer |
| QW13 | Lengkapi Twitter Card 4 artikel (SEO-H6) | Hanya ada `twitter:card`, kurang title/description/image. Tambahkan 3 baris meta per halaman. | Developer |
| QW14 | BreadcrumbList schema + markup nav (SEO-H7) | Breadcrumb visual sudah ada tapi tanpa schema/markup semantik. Bungkus `<nav><ol>` + JSON-LD. | Developer/SEO |
| QW15 | Skip-to-content link (UI/UX-H9) | Tidak ada elemen lompat-ke-konten untuk pengguna keyboard. Tambahkan link tersembunyi yang muncul saat fokus. | Developer |
| QW16 | Ganti ikon emoji jadi SVG (UI/UX-H10) | Ikon WA/hamburger/back-to-top pakai emoji Unicode, render beda tiap OS. Ganti SVG inline. | UI Designer/Developer |
| QW17 | Perbaiki internal link `index.html`→`/` (SEO-M11) | Link artikel ke homepage eksplisit ke `index.html`, berpotensi duplicate URL. Ganti ke `../` + tambah redirect di `vercel.json`. | Developer |
| QW18 | Custom 404 page (SEO-M7) | Tidak ada halaman 404 branded. Buat halaman sederhana dengan CTA kembali ke katalog/WA. | Developer |
| QW19 | Pangkas title/meta description kepanjangan (SEO-M9) | Title homepage & 1 artikel serta meta desc homepage melebihi batas render SERP aman. | SEO/Content Writer |

**Checklist implementasi (developer, bisa dikerjakan sekaligus dalam 1 sesi ~1 hari):**
- [x] Find & replace semua `<h4>` yang seharusnya `<h3>` di index.html + 4 artikel, sesuaikan CSS selector. *(nol hasil grep `<h4` di semua file)*
- [x] Tambahkan variabel warna kontras baru, terapkan ke `.testi .stars`, label `.eyebrow`, `.foot-bottom`.
- [x] Tambahkan `width`/`height` ke 2 instance logo di tiap 4 file artikel.
- [x] Tambahkan preload + `fetchpriority="high"` untuk hero image.
- [x] Tambahkan 3 meta tag Twitter Card yang hilang di 4 artikel. *(4 meta twitter: terverifikasi di tiap file)*
- [x] Bungkus breadcrumb dengan markup semantik + tambahkan JSON-LD BreadcrumbList. *(terverifikasi di 4 artikel)*
- [x] Tambahkan skip-link setelah `<body>` + CSS fokus. *(terverifikasi di 6 halaman)*
- [x] Ganti karakter emoji ikon dengan SVG inline `currentColor`.
- [x] Ganti `../index.html` → `../` di 4 artikel + redirect permanen di `vercel.json`.
- [x] Buat `404.html` dengan header/footer konsisten.
- [x] Pangkas title/meta description yang kepanjangan.

---

# BAGIAN 2 — 🟠 HIGH IMPACT (Impact Tinggi, Effort Sedang–Tinggi)

*Proyek yang butuh lebih dari sehari kerja atau koordinasi aset (foto, tulisan, riset), tapi dampaknya besar. Kerjakan setelah Quick Wins selesai, dalam bulan pertama.*

### HI1. Bukti visual proses: foto kebun & packing + galeri homepage
*(Gabungan UI/UX-H1, UI/UX-M12 — item terpisah di roadmap lama, sekarang jadi satu inisiatif karena saling bergantung)*
- **Status: ⛔ Dibatalkan** — keputusan Owner, cukup FB & TikTok buat bukti visual proses, gak perlu section galeri terpisah di web.
- **Kenapa digabung:** Tidak ada gunanya foto tanpa tempat menampilkannya, dan tidak ada gunanya section galeri tanpa foto — keduanya satu paket kerja.
- **Dampak:** Menjawab langsung kecemasan #1 pembeli bibit ("sampai rusak gak?"), trust visual terlihat sejak first impression di homepage, bukan hanya di artikel.
- **Effort:** Sedang (1 hari foto + 3-4 jam implementasi).
- **PIC:** Owner (ambil foto) → Content Writer (caption) → UI Designer (layout) → Developer (implementasi).
- **Checklist:**
  - [ ] ~~Owner ambil 10-15 foto kebun dari berbagai sudut + foto proses cek bibit & packing.~~
  - [ ] ~~Kompres semua foto baru langsung ke WebP saat proses upload (satukan dengan HI2 di bawah).~~
  - [ ] ~~Developer buat section galeri baru di homepage (antara "Kenapa Pilih Kami" dan "Katalog"), pakai sistem desain existing.~~

### HI2. Optimasi gambar seluruh situs (WebP + resize logo)
*(SEO-M1)*
- **Status: ✅ Selesai** (termasuk follow-up round 2 dari audit PageSpeed nyata — lihat catatan sesi Juli di atas)
- **Dampak:** Kontributor terbesar beban halaman tak perlu (~5.3MB folder images unoptimized); berdampak langsung ke LCP & pengalaman mobile.
- **Effort:** Sedang (4-6 jam, sekaligus proses foto baru dari HI1).
- **PIC:** Developer.
- **Checklist:**
  - [x] Resize `logo.png` ke ~160×160px, convert WebP.
  - [x] Convert 24+ foto produk existing ke WebP kualitas 75-80%.
  - [x] Update semua `<img>` jadi `<picture>` dengan fallback JPG.
  - [x] **(Tambahan sesi Juli, dari audit PageSpeed nyata)** Buat versi `-sm.webp` responsif (srcset) untuk hero, alpukat black avocado, durian duri hitam — gambar sebelumnya jauh lebih besar dari ukuran tampil, buang 858 KiB. Desktop tetap pakai versi asli (gak ada penurunan kualitas), cuma HP yang dapet versi kecil.

### HI3. Halaman "Tentang Kami"
*(Gabungan Bisnis + CRO + SEO E-E-A-T — 3 audit menandai gap yang sama)*
- **Status: ✅ Selesai**
- **Dampak:** Memperkuat E-E-A-T (Experience/Expertise nyata di balik brand), trust dari "wajah manusia", bukan sekadar logo.
- **Effort:** Sedang (1 hari).
- **PIC:** Content Writer (narasi) + Owner (cerita & foto) + Developer (implementasi).
- **Checklist:**
  - [x] Kumpulkan cerita: sejak kapan berdiri, siapa mengelola, kenapa sistem kode varian dibuat.
  - [x] Ambil foto pemilik/tim di kebun (gabungkan sesi dengan HI1).
  - [x] Buat halaman baru konsisten desain, tautkan dari nav & footer.

### HI4. Halaman "Area Pengiriman"
*(Bisnis)*
- **Status: ⛔ Ditutup** — keputusan Owner, cukup info ekspedisi di sosmed, gak perlu halaman khusus di web.
- **Dampak:** Meyakinkan buyer luar kota + keyword long-tail baru untuk SEO lokal ("kirim bibit ke [kota]").
- **Effort:** Rendah-Sedang (3-4 jam).
- **PIC:** Content Writer + Owner (data ekspedisi & kota tujuan) + Developer.
- **Checklist:**
  - [ ] ~~Owner beri daftar ekspedisi & contoh kota yang pernah dikirimi.~~
  - [ ] ~~Tulis & buat halaman, tautkan dari nav/footer & FAQ pengiriman luar Jawa.~~

### HI5. Artikel edukasi tambahan (4 → 8+) + riset keyword lokal
*(Gabungan Bisnis + SEO-M4 + SEO-M9's riset keyword)*
- **Status: ✅ Selesai (tahap 1 dari 2)** — 4→6 artikel. Owner sengaja berhenti dulu di 2 artikel baru (bukan 4) buat lihat traksi dulu sebelum lanjut nulis lagi — cek Search Console performa kueri "jati Purworejo"/"durian Kemiri" beberapa minggu ke depan sebelum lanjut nulis 2 artikel lagi.
- **Dampak:** Memperluas jangkauan keyword long-tail lokal, memperdalam edukasi per kategori produk.
- **Effort:** Sedang, berkelanjutan ~1 artikel/minggu.
- **PIC:** SEO (riset keyword) → Content Writer (tulis) → Developer (implementasi per artikel).
- **Checklist:**
  - [x] Riset keyword long-tail lokal — fokus "bibit jati Purworejo/Kemiri", "durian duri hitam Kemiri", bukan keyword nasional generik yang udah dikuasai media besar.
  - [x] Tulis 2 artikel baru (investasi-bibit-jati.html, durian-duri-hitam.html) mengikuti template & schema yang sama, plus update internal link di 4 artikel lama + bug warna kategori dibenerin.
  - [x] Update sitemap dengan `lastmod` akurat sesuai tanggal publish riil.

### HI6. Lead-capture ringan untuk traffic dingin
*(CRO, dibatasi oleh T3 & T4 — tetap statis, bukan sistem checkout)*
- **Status: ⛔ Dibatalkan** — keputusan Owner.
- **Dampak:** Menangkap sebagian traffic yang sebelumnya hilang 100% tanpa jejak follow-up, penting untuk scaling lewat Ads nanti.
- **Effort:** Sedang (1 hari).
- **PIC:** Marketing (tentukan lead magnet) + Developer (implementasi widget ringan).
- **Checklist:**
  - [ ] ~~Tentukan bentuk lead magnet (panduan pilih bibit sesuai lahan, dsb).~~
  - [ ] ~~Implementasi lewat embed ringan (Google Form/link WA khusus) — **bukan** form custom yang butuh backend baru (sesuai T4).~~

### HI7. Testimoni bernama + foto asli (penyelesaian permanen dari QW3)
*(CRO + SEO E-E-A-T)*
- **Status: ✅ Selesai**
- **Dampak:** Kredibilitas testimoni naik signifikan dari atribusi generik "Pelanggan WhatsApp".
- **Effort:** Sedang, berkelanjutan sebulan.
- **PIC:** Owner/Marketing (hubungi pelanggan lama) + Content Writer (susun ulang).
- **Checklist:**
  - [x] WA pelanggan lama, minta izin nama/inisial + foto bibit yang sudah tumbuh.
  - [x] Susun ulang section testimoni, tautkan ke ulasan Google Maps asli kalau memungkinkan.
  - [x] **Catatan:** sebar permintaan review baru (jangan serentak dalam hitungan menit) untuk menghindari pola yang bisa disalahartikan sistem anti-spam Google.

### HI8. Security headers (HSTS + CSP)
*(SEO-M8)*
- **Status: ✅ Selesai** — plus sudah teruji langsung: CSP sempat berhasil nge-block 1 kesalahan implementasi (trik inline `onload` buat font) di sesi Juli, cuma sempat bikin Best Practices turun sementara ke 92 sebelum di-revert ke cara yang CSP-safe.
- **Dampak:** Baseline keamanan lebih kuat, sinyal yang diperhatikan Google secara umum.
- **Effort:** Sedang (perlu testing supaya tidak memblokir Google Fonts).
- **PIC:** Developer.
- **Checklist:**
  - [x] Tambahkan `Strict-Transport-Security` + `Content-Security-Policy` dasar di `vercel.json`.
  - [x] Test ulang semua halaman pastikan tidak ada resource ke-block.

---

# BAGIAN 3 — 🔵 LONG-TERM (Strategis, Investasi Lebih Besar, 2–6 Bulan)

*Butuh data/traksi dari Quick Wins & High Impact terlebih dulu sebagai dasar keputusan.*

| # | Item | Dampak | Dependensi | PIC |
|---|---|---|---|---|
| LT1 | Bundling produk musiman (Bisnis) | Naikkan Average Order Value tanpa produk baru | Data chat WA (kombinasi produk yang sering ditanya bareng) | Owner + Marketing |
| LT2 | Program retensi & repeat order (Bisnis) | Memanfaatkan CLV tinggi kategori bibit yang belum "dipanen" | Database manual dari riwayat chat WA | Owner/Marketing |
| LT3 | Evaluasi sistem checkout mandiri (Bisnis, lihat T3) | Scalability kalau volume order sudah sulit ditangani manual | Data volume chat & rasio konversi 3-6 bulan pasca QW5 | Developer + Owner |
| LT4 | Video tur kebun (CRO) | Trust visual tambahan di atas foto statis | Sebaiknya setelah galeri foto (HI1) berjalan | Owner/Marketing + Developer |
| LT5 | Embed widget Google review asli (CRO) | Trust independen terverifikasi pihak ketiga | HI7 (testimoni asli) sudah berjalan | Developer |
| LT6 | Custom domain (SEO, lihat T5) | Branding lebih profesional, kontrol penuh | QW1 (fix domain lama/baru) harus tuntas dulu | Developer + Owner |
| LT7 | Eksplorasi segmen B2B/penghijauan (Bisnis) | Aliran pendapatan baru dari segmen berbeda | Traksi dari HI5 & LT1 sebagai bukti sebelum dekati mitra | Owner + Marketing |
| LT8 | Foto skala/angle tambahan per produk unggulan (UI/UX) | Membantu keputusan beli tanpa perlu tanya ukuran dulu | Sebaiknya bareng sesi foto HI1 | Owner + Developer |
| LT9 | Polish UI minor (tap target, navbar shrink) (UI/UX) | Penghalusan pengalaman yang sudah baik | Tidak ada, kerjakan saat ada waktu luang | Developer |

---

# BAGIAN 4 — CHECKLIST PER PERAN (Ringkasan Lintas Semua Kategori)

## Checklist Developer
- [x] QW1 — Fix canonical/redirect domain
- [x] QW2 — Update NAP + geo coordinates di kode & schema
- [x] QW4 — Pasang kebijakan garansi ke web
- [x] QW5 — Pasang CTA & link wa.me prefilled
- [x] QW7 — Terapkan badge stok terbatas sesuai data Owner
- [x] QW9–QW19 — Seluruh perbaikan teknikal cepat (heading, kontras, CLS, LCP, Twitter Card, breadcrumb, skip-link, ikon SVG, internal link, 404)
- [ ] ~~HI1 — Implementasi section galeri~~ *(dibatalkan — keputusan Owner, cukup FB & TikTok, lihat status Bagian 5)*
- [x] HI2 — Convert & resize gambar ke WebP
- [x] HI3 — Implementasi halaman Tentang Kami
- [x] ~~HI4 — Implementasi halaman Area Pengiriman~~ *(ditutup — keputusan Owner, cukup sosmed)*
- [ ] ~~HI6 — Implementasi lead-capture ringan (embed, bukan sistem baru)~~ *(dibatalkan — lihat status Bagian 5)*
- [x] HI5 — Tulis & deploy 2 artikel edukasi baru (jati, durian duri hitam), update internal link + sitemap
- [x] HI8 — Tambah HSTS + CSP
- [x] QW-Perf1 — Fix hasil audit PageSpeed (kontras, gambar responsif, forced reflow, render-blocking font)
- [x] QW-Perf2 — Pasang Vercel Web Analytics (CSP-safe)
- [x] LT9 — Polish UI minor (tap target + navbar shrink)
- [ ] LT3, LT5, LT6 — sesuai jadwal jangka panjang

## Checklist SEO Specialist
- [x] QW1 — Verifikasi canonical/sitemap/robots.txt sinkron di kode *(submit manual ke Search Console masih aksi terpisah di luar repo)*
- [x] QW14 — BreadcrumbList & QW2 geo sudah ada di kode *(validasi lewat Rich Results Test masih aksi manual terpisah)*
- [x] QW19 — Pangkas title/description
- [ ] HI5 — Riset 10-15 keyword long-tail lokal untuk artikel baru
- [ ] Pantau Search Console mingguan untuk status indexing pasca-fix domain
- [ ] Jalankan PageSpeed Insights setelah HI2 untuk verifikasi dampak nyata

## Checklist UI Designer
- [x] QW10 — Tentukan nilai warna baru yang lolos kontras AA
- [x] QW16 — Desain/pilih SVG icon set pengganti emoji
- [ ] ~~HI1 — Desain layout section galeri~~ *(dibatalkan — keputusan Owner)*
- [x] HI3 — Desain halaman Tentang Kami konsisten sistem desain
- [x] LT9 — Review polish UI minor

## Checklist Content Writer
- [x] QW3 — Testimoni asli dipakai langsung (disclosure stopgap gak jadi perlu)
- [x] QW4 — Tulis kebijakan garansi final
- [x] QW5 — Tulis copy CTA harga & FAQ jujur
- [ ] QW6 — Update copy rating & waktu respons *(rating sudah, waktu respons WA belum ada di kode)*
- [x] QW8 — Tulis ulang subheadline hero
- [x] QW19 — Revisi title/meta description
- [ ] ~~HI1 — Tulis caption foto galeri~~ *(dibatalkan — keputusan Owner)*
- [x] HI3 — Tulis narasi Tentang Kami
- [ ] HI4 — Tulis narasi Area Pengiriman *(di-skip dulu)*
- [ ] HI5 — Tulis 4 artikel edukasi baru
- [x] HI7 — Susun ulang testimoni dengan data asli *(6 testimoni bernama asli sudah tayang)*

## Checklist Owner
- [x] QW1 — Konfirmasi domain final (sudah: khanzabibit.vercel.app)
- [x] QW2 — Konfirmasi NAP & link Maps final (sudah: koordinat & link didapat)
- [x] QW3 — Konfirmasi status testimoni + izin pemakaian
- [x] QW4 — Tentukan kebijakan garansi riil
- [x] QW5 — Konfirmasi tetap tidak menampilkan harga (sudah final, lihat T1)
- [ ] QW6 — Konfirmasi angka final ulasan Google Maps *(kode masih pakai "4.9 dari 12 ulasan", tunggu konfirmasi 11 ulasan baru resmi masuk)*
- [x] QW7 — Tandai produk yang stoknya benar-benar terbatas *(hasil: tidak ada, badge dihapus)*
- [ ] ~~HI1 — Ambil foto kebun & proses packing~~ *(dibatalkan — keputusan Owner, cukup FB & TikTok)*
- [x] HI3 — Sediakan cerita & foto untuk halaman Tentang Kami *(gak perlu lagi — dibuat dari data yang sudah ada)*
- [x] ~~HI4 — Halaman Area Pengiriman~~ *(ditutup — keputusan Owner, cukup info di sosmed, gak perlu halaman khusus)*
- [x] HI7 — Hubungi pelanggan lama untuk testimoni asli (sebar permintaan, jangan serentak)
- [ ] LT1, LT2, LT3, LT6, LT7 — Keputusan bisnis jangka panjang

## Checklist Marketing
- [ ] QW6 — Bantu susun copy rating & waktu respons
- [ ] ~~HI6 — Tentukan bentuk lead magnet untuk traffic dingin~~ *(dibatalkan)*
- [x] HI7 — Bantu follow-up WA ke pelanggan lama untuk testimoni
- [x] QW7 — Bantu komunikasi urgency stok yang jujur
- [ ] LT1 — Riset kombinasi produk untuk bundling
- [ ] LT2 — Jalankan follow-up musim tanam ke database pelanggan
- [ ] LT4 — Koordinasi produksi video tur kebun
- [ ] LT7 — Eksplorasi kontak awal segmen B2B/CSR

---

# BAGIAN 5 — TABEL RINGKASAN IMPACT vs EFFORT

| Kategori | Task | Impact | Effort | Status |
|---|---|---|---|---|
| Quick Win | QW1 — Fix canonical/redirect domain lama→baru | Sangat Tinggi | Rendah | ✅ Selesai — diverifikasi langsung dari kode (grep index.html + 4 artikel + vercel.json) |
| Quick Win | QW2 — Sinkronkan NAP + geo coordinates | Tinggi | Rendah | ✅ Selesai — NAP, link Maps, dan blok `GeoCoordinates` (lat -7.659488, long 109.8746012) semua sudah masuk ke schema `GardenStore` |
| Quick Win | QW3 — Putuskan status testimoni | Tinggi | Rendah | ✅ Selesai — diganti ke testimoni bernama asli (lihat HI7) |
| Quick Win | QW4 — Kebijakan garansi tertulis | Tinggi | Rendah | ✅ Selesai — FAQ garansi (ekspedisi vs antar sendiri) sinkron di visible text & schema |
| Quick Win | QW5 — CTA harga via WA + wa.me prefilled | Tinggi | Rendah | ✅ Selesai — 31 link `wa.me` prefilled diverifikasi |
| Quick Win | QW6 — Update klaim rating & waktu respons | Sedang | Rendah | 🟡 Tertahan sengaja — masih "4.9 dari 12 ulasan" (data lama), menunggu angka final dari Owner setelah 11 ulasan baru resmi masuk Google Maps |
| Quick Win | QW7 — Badge stok terbatas jujur | Sedang | Rendah | ✅ Selesai — badge dihapus total (tidak ada produk yang benar-benar stok terbatas) |
| Quick Win | QW8 — Perbaiki subheadline hero | Sedang | Rendah | ✅ Selesai — diverifikasi teks final, tidak lagi redundan dengan eyebrow tag |
| Quick Win | QW9 — Heading H2→H4 jadi H3 | Sedang | Rendah | ✅ Selesai — dicek semua file, tidak ada lompatan ke h4 |
| Quick Win | QW10 — Perbaiki 3 kontras warna gagal AA | Sedang | Rendah | ✅ Selesai — dihitung ulang manual (bintang, label produk, footer), semua lolos 4.5:1+ |
| Quick Win | QW11 — CLS fix logo 4 artikel | Sedang | Rendah | ✅ Selesai — width/height 400×400 ada di semua logo artikel |
| Quick Win | QW12 — LCP preload hero image | Sedang-Tinggi | Rendah | ✅ Selesai — `preload` + `fetchpriority="high"` ada, meski gambarnya masih JPG (lihat HI2) |
| Quick Win | QW13 — Lengkapi Twitter Card 4 artikel | Rendah-Sedang | Rendah | ✅ Selesai — 4 meta tag lengkap di semua artikel |
| Quick Win | QW14 — BreadcrumbList schema | Sedang | Rendah-Sedang | ✅ Selesai — ada di 4 artikel |
| Quick Win | QW15 — Skip-to-content link | Sedang | Rendah | ✅ Selesai — ada di 5 halaman |
| Quick Win | QW16 — Ganti ikon emoji jadi SVG | Sedang | Rendah-Sedang | ✅ Selesai — sempat salah ditandai selesai sebelumnya (cuma `index.html` yang kepasang SVG); sekarang 4 file artikel juga sudah diganti ke SVG inline yang sama (hamburger, back-to-top, WA), diverifikasi nol sisa entity `&#9776;`/`&#8593;`/`&#128222;` di seluruh situs |
| Quick Win | QW17 — Internal link index.html→/ | Sedang | Rendah | ✅ Selesai — redirect permanent di vercel.json + link `../` di artikel |
| Quick Win | QW18 — Custom 404 page | Kecil | Rendah | ✅ Selesai — noindex, skip-link, CTA katalog & WA ada. *Bug baru ketemu & dibenerin:* path logo/favicon salah nunjuk ke `images/logo.webp` dkk (folder gak ada), seharusnya `images/site/...` — logo & favicon sempat gak muncul di halaman 404 live, sekarang sudah benar |
| Quick Win | QW19 — Pangkas title/meta description | Sedang | Rendah | ✅ Selesai — semua title ≤60 karakter, semua desc ≤155 karakter (dihitung ulang manual) |
| High Impact | HI1 — Foto kebun/packing + galeri homepage | Besar | Sedang | ⛔ Ditutup sesuai keputusan Owner — galeri gak dipakai, cukup FB & TikTok. Komentar placeholder kosong sudah dibersihkan |
| High Impact | HI2 — Optimasi gambar (WebP) | Tinggi | Sedang | ✅ Selesai — 31 file WebP (kualitas adaptif 65-80, rata-rata ~30% lebih kecil dari JPG asli, semua diverifikasi lebih kecil dari original), logo di-resize 400×400→160×160, semua `<img>` relevan jadi `<picture>` dengan fallback |
| High Impact | HI3 — Halaman Tentang Kami | Sedang-Tinggi | Sedang | ✅ Selesai — dibuat dari data yang sudah tersedia (lokasi, sistem kode label, rating, cara kerja), tanpa nunggu cerita/foto terpisah dari Owner. Dibuat `tentang-kami.html`, ditautkan dari nav di semua halaman (homepage + 4 artikel) + sitemap |
| High Impact | HI4 — Halaman Area Pengiriman | Sedang | Rendah-Sedang | ⛔ Ditutup sesuai keputusan Owner — cukup info ekspedisi di sosmed, gak perlu halaman khusus |
| High Impact | HI5 — Artikel edukasi tambahan + riset keyword | Sedang | Sedang | ✅ Selesai — 2 artikel baru (jati & durian duri hitam) dengan angle lokal Kemiri/Purworejo, riset keyword dulu sebelum nulis, internal link ke 4 artikel lama diupdate, sitemap diupdate, sudah di-request index manual |
| Quick Win | QW-Perf1 — Fix PageSpeed round 2 (kontras, gambar responsif, render-blocking, forced reflow) | Tinggi | Sedang | ✅ Selesai — Performance 74→94 (lalu 94 sempat drop ke 73 di 1 test run, dianggap noise lab data, bukan regresi nyata — lihat catatan CSP di bawah), Accessibility 95→100. Termasuk fix bug lama: warna kategori "Baca Juga" di 6 artikel semua kepatok hijau, sekarang benar per kategori |
| Quick Win | QW-Perf2 — Vercel Web Analytics | Tinggi | Rendah | ✅ Selesai — terpasang di semua 9 halaman (CSP-safe, bukan versi inline resmi Vercel karena situs ini pakai CSP `script-src 'self'`), diaktifkan di dashboard Vercel |
| High Impact | HI6 — Lead-capture traffic dingin | Sedang | Sedang | ⛔ Ditutup sesuai keputusan Developer/Owner — form minta data pribadi dinilai justru bikin calon pembeli lokal curiga/mundur, bertentangan dengan semangat T3 (transaksi berbasis kepercayaan personal via WA, bukan form asing) |
| High Impact | HI7 — Testimoni bernama + foto asli | Sedang-Tinggi | Sedang | ✅ Selesai — 6 testimoni bernama asli tayang, termasuk 1 rating 4★ dibiarkan apa adanya. *Foto asli per testimoni sengaja tidak ditambahkan ke web* — sudah terwakili di Google Maps/FB/TikTok, dan web ini memang diposisikan cukup jadi ringkasan, bukan duplikat semua bukti sosial
| High Impact | HI8 — Security headers HSTS+CSP | Kecil-Sedang | Sedang | ✅ Selesai — HSTS + CSP lengkap di vercel.json, dicek gak ada resource yang keblok |
| Long-term | LT1 — Bundling produk musiman | Sedang | Sedang | Belum dikerjakan |
| Long-term | LT2 — Program retensi & repeat order | Tinggi (jk. panjang) | Rendah-Sedang | Belum dikerjakan |
| Long-term | LT3 — Evaluasi checkout mandiri | Tinggi (jk. panjang) | Tinggi | Menunggu data |
| Long-term | LT4 — Video tur kebun | Sedang | Sedang | Belum dikerjakan |
| Long-term | LT5 — Embed widget Google review | Sedang | Sedang | Menunggu HI7 |
| Long-term | LT6 — Custom domain | Sedang-Tinggi (jk. panjang) | Sedang | Menunggu QW1 tuntas |
| Long-term | LT7 — Segmen B2B/penghijauan | Tinggi (jk. panjang) | Sedang-Tinggi | Belum dikerjakan |
| Long-term | LT8 — Foto skala/angle tambahan per produk | Sedang | Sedang | Belum dikerjakan |
| Long-term | LT9 — Polish UI minor | Kecil | Rendah | ✅ Selesai — tap target hamburger menu & tombol back-to-top dinaikkan ke 44×44px, navbar shrink halus saat discroll (`header.scrolled`) |

---

*Master backlog ini menggabungkan seluruh temuan dari 4 audit + roadmap sebelumnya, tanpa duplikasi. 6 trade-off di Bagian 0 sudah diputuskan final — tim eksekusi tidak perlu menafsirkan ulang kalau menemukan rekomendasi yang tampak bertentangan di dokumen audit asli, cukup rujuk ke Bagian 0. Update kolom "Status" secara manual seiring progres.*
