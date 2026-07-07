# Master Backlog Pengembangan Website — Khanza Bibit
**Sumber:** Audit Bisnis & Strategi, Audit CRO, Audit UI/UX & Branding, Audit Teknikal SEO, Roadmap Implementasi, + update lapangan dari Owner (domain benar, kesepakatan harga pasar, data ulasan & koordinat Maps).
**Metode:** Temuan yang tumpang tindih antar audit digabung jadi satu item. Item yang saling bertentangan diselesaikan lewat analisis trade-off di Bagian 0 sebelum masuk backlog, supaya tidak ada instruksi kontradiktif ke tim eksekusi.
**Domain resmi:** `https://khanzabibit.vercel.app`. `khanza-bibit.vercel.app` (bertanda hubung) = domain lama, akan di-redirect.

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
- [ ] Cek & hapus semua referensi `khanza-bibit` (tanda hubung) di environment variable/hardcode, redeploy.
- [ ] Set 301 redirect domain lama → domain baru + noindex sementara di domain lama.
- [ ] Samakan alamat & link Maps di footer homepage + 4 artikel + schema JSON-LD.
- [ ] Tambahkan blok `GeoCoordinates` (lat -7.659488, long 109.8746012) ke schema `GardenStore`.
- [ ] Pasang link `wa.me` dengan teks prefilled per produk untuk CTA harga.
- [ ] Update copy rating & badge stok sesuai keputusan Owner.

**Checklist implementasi (owner):**
- [ ] Konfirmasi status testimoni (asli/ilustrasi) dan beri izin pemakaian kalau asli.
- [ ] Tentukan kebijakan garansi riil (hari, syarat klaim, solusi).
- [ ] Tandai produk yang stoknya benar-benar terbatas musim ini.
- [ ] Submit ulang homepage domain baru via Google Search Console setelah QW1 selesai.

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
- [ ] Find & replace semua `<h4>` yang seharusnya `<h3>` di index.html + 4 artikel, sesuaikan CSS selector.
- [ ] Tambahkan variabel warna kontras baru, terapkan ke `.testi .stars`, label `.eyebrow`, `.foot-bottom`.
- [ ] Tambahkan `width`/`height` ke 2 instance logo di tiap 4 file artikel.
- [ ] Tambahkan preload + `fetchpriority="high"` untuk hero image.
- [ ] Tambahkan 3 meta tag Twitter Card yang hilang di 4 artikel.
- [ ] Bungkus breadcrumb dengan markup semantik + tambahkan JSON-LD BreadcrumbList.
- [ ] Tambahkan skip-link setelah `<body>` + CSS fokus.
- [ ] Ganti karakter emoji ikon dengan SVG inline `currentColor`.
- [ ] Ganti `../index.html` → `../` di 4 artikel + redirect permanen di `vercel.json`.
- [ ] Buat `404.html` dengan header/footer konsisten.
- [ ] Pangkas title/meta description yang kepanjangan.

---

# BAGIAN 2 — 🟠 HIGH IMPACT (Impact Tinggi, Effort Sedang–Tinggi)

*Proyek yang butuh lebih dari sehari kerja atau koordinasi aset (foto, tulisan, riset), tapi dampaknya besar. Kerjakan setelah Quick Wins selesai, dalam bulan pertama.*

### HI1. Bukti visual proses: foto kebun & packing + galeri homepage
*(Gabungan UI/UX-H1, UI/UX-M12 — item terpisah di roadmap lama, sekarang jadi satu inisiatif karena saling bergantung)*
- **Kenapa digabung:** Tidak ada gunanya foto tanpa tempat menampilkannya, dan tidak ada gunanya section galeri tanpa foto — keduanya satu paket kerja.
- **Dampak:** Menjawab langsung kecemasan #1 pembeli bibit ("sampai rusak gak?"), trust visual terlihat sejak first impression di homepage, bukan hanya di artikel.
- **Effort:** Sedang (1 hari foto + 3-4 jam implementasi).
- **PIC:** Owner (ambil foto) → Content Writer (caption) → UI Designer (layout) → Developer (implementasi).
- **Checklist:**
  - [ ] Owner ambil 10-15 foto kebun dari berbagai sudut + foto proses cek bibit & packing.
  - [ ] Kompres semua foto baru langsung ke WebP saat proses upload (satukan dengan HI2 di bawah).
  - [ ] Developer buat section galeri baru di homepage (antara "Kenapa Pilih Kami" dan "Katalog"), pakai sistem desain existing.

### HI2. Optimasi gambar seluruh situs (WebP + resize logo)
*(SEO-M1)*
- **Dampak:** Kontributor terbesar beban halaman tak perlu (~5.3MB folder images unoptimized); berdampak langsung ke LCP & pengalaman mobile.
- **Effort:** Sedang (4-6 jam, sekaligus proses foto baru dari HI1).
- **PIC:** Developer.
- **Checklist:**
  - [ ] Resize `logo.png` ke ~160×160px, convert WebP.
  - [ ] Convert 24+ foto produk existing ke WebP kualitas 75-80%.
  - [ ] Update semua `<img>` jadi `<picture>` dengan fallback JPG.

### HI3. Halaman "Tentang Kami"
*(Gabungan Bisnis + CRO + SEO E-E-A-T — 3 audit menandai gap yang sama)*
- **Dampak:** Memperkuat E-E-A-T (Experience/Expertise nyata di balik brand), trust dari "wajah manusia", bukan sekadar logo.
- **Effort:** Sedang (1 hari).
- **PIC:** Content Writer (narasi) + Owner (cerita & foto) + Developer (implementasi).
- **Checklist:**
  - [ ] Kumpulkan cerita: sejak kapan berdiri, siapa mengelola, kenapa sistem kode varian dibuat.
  - [ ] Ambil foto pemilik/tim di kebun (gabungkan sesi dengan HI1).
  - [ ] Buat halaman baru konsisten desain, tautkan dari nav & footer.

### HI4. Halaman "Area Pengiriman"
*(Bisnis)*
- **Dampak:** Meyakinkan buyer luar kota + keyword long-tail baru untuk SEO lokal ("kirim bibit ke [kota]").
- **Effort:** Rendah-Sedang (3-4 jam).
- **PIC:** Content Writer + Owner (data ekspedisi & kota tujuan) + Developer.
- **Checklist:**
  - [ ] Owner beri daftar ekspedisi & contoh kota yang pernah dikirimi.
  - [ ] Tulis & buat halaman, tautkan dari nav/footer & FAQ pengiriman luar Jawa.

### HI5. Artikel edukasi tambahan (4 → 8+) + riset keyword lokal
*(Gabungan Bisnis + SEO-M4 + SEO-M9's riset keyword)*
- **Dampak:** Memperluas jangkauan keyword long-tail lokal, memperdalam edukasi per kategori produk.
- **Effort:** Sedang, berkelanjutan ~1 artikel/minggu.
- **PIC:** SEO (riset keyword) → Content Writer (tulis) → Developer (implementasi per artikel).
- **Checklist:**
  - [ ] Riset 10-15 keyword long-tail lokal ("bibit [jenis] Purworejo", dst).
  - [ ] Tulis 4 artikel baru mengikuti template & schema yang sama.
  - [ ] Update sitemap dengan `lastmod` akurat sesuai tanggal publish riil.

### HI6. Lead-capture ringan untuk traffic dingin
*(CRO, dibatasi oleh T3 & T4 — tetap statis, bukan sistem checkout)*
- **Dampak:** Menangkap sebagian traffic yang sebelumnya hilang 100% tanpa jejak follow-up, penting untuk scaling lewat Ads nanti.
- **Effort:** Sedang (1 hari).
- **PIC:** Marketing (tentukan lead magnet) + Developer (implementasi widget ringan).
- **Checklist:**
  - [ ] Tentukan bentuk lead magnet (panduan pilih bibit sesuai lahan, dsb).
  - [ ] Implementasi lewat embed ringan (Google Form/link WA khusus) — **bukan** form custom yang butuh backend baru (sesuai T4).

### HI7. Testimoni bernama + foto asli (penyelesaian permanen dari QW3)
*(CRO + SEO E-E-A-T)*
- **Dampak:** Kredibilitas testimoni naik signifikan dari atribusi generik "Pelanggan WhatsApp".
- **Effort:** Sedang, berkelanjutan sebulan.
- **PIC:** Owner/Marketing (hubungi pelanggan lama) + Content Writer (susun ulang).
- **Checklist:**
  - [ ] WA pelanggan lama, minta izin nama/inisial + foto bibit yang sudah tumbuh.
  - [ ] Susun ulang section testimoni, tautkan ke ulasan Google Maps asli kalau memungkinkan.
  - [ ] **Catatan:** sebar permintaan review baru (jangan serentak dalam hitungan menit) untuk menghindari pola yang bisa disalahartikan sistem anti-spam Google.

### HI8. Security headers (HSTS + CSP)
*(SEO-M8)*
- **Dampak:** Baseline keamanan lebih kuat, sinyal yang diperhatikan Google secara umum.
- **Effort:** Sedang (perlu testing supaya tidak memblokir Google Fonts).
- **PIC:** Developer.
- **Checklist:**
  - [ ] Tambahkan `Strict-Transport-Security` + `Content-Security-Policy` dasar di `vercel.json`.
  - [ ] Test ulang semua halaman pastikan tidak ada resource ke-block.

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
- [ ] QW1 — Fix canonical/redirect domain
- [ ] QW2 — Update NAP + geo coordinates di kode & schema
- [ ] QW4 — Pasang kebijakan garansi ke web
- [ ] QW5 — Pasang CTA & link wa.me prefilled
- [ ] QW7 — Terapkan badge stok terbatas sesuai data Owner
- [ ] QW9–QW19 — Seluruh perbaikan teknikal cepat (heading, kontras, CLS, LCP, Twitter Card, breadcrumb, skip-link, ikon SVG, internal link, 404)
- [ ] HI1 — Implementasi section galeri
- [ ] HI2 — Convert & resize gambar ke WebP
- [ ] HI3, HI4 — Implementasi halaman Tentang Kami & Area Pengiriman
- [ ] HI6 — Implementasi lead-capture ringan (embed, bukan sistem baru)
- [ ] HI8 — Tambah HSTS + CSP
- [ ] LT3, LT5, LT6, LT9 — sesuai jadwal jangka panjang

## Checklist SEO Specialist
- [ ] QW1 — Verifikasi canonical/sitemap/robots.txt sinkron, submit ulang di Search Console
- [ ] QW14 — Validasi BreadcrumbList & QW2 geo lewat Rich Results Test
- [ ] QW19 — Pangkas title/description + mulai riset keyword lokal
- [ ] HI5 — Riset 10-15 keyword long-tail lokal untuk artikel baru
- [ ] Pantau Search Console mingguan untuk status indexing pasca-fix domain
- [ ] Jalankan PageSpeed Insights setelah HI2 untuk verifikasi dampak nyata

## Checklist UI Designer
- [ ] QW10 — Tentukan nilai warna baru yang lolos kontras AA
- [ ] QW16 — Desain/pilih SVG icon set pengganti emoji
- [ ] HI1 — Desain layout section galeri
- [ ] HI3 — Desain halaman Tentang Kami konsisten sistem desain
- [ ] LT9 — Review polish UI minor

## Checklist Content Writer
- [ ] QW3 — Tulis disclosure testimoni (stopgap)
- [ ] QW4 — Tulis kebijakan garansi final
- [ ] QW5 — Tulis copy CTA harga & FAQ jujur
- [ ] QW6 — Update copy rating & waktu respons
- [ ] QW8 — Tulis ulang subheadline hero
- [ ] QW19 — Revisi title/meta description
- [ ] HI1 — Tulis caption foto galeri
- [ ] HI3, HI4 — Tulis narasi Tentang Kami & Area Pengiriman
- [ ] HI5 — Tulis 4 artikel edukasi baru
- [ ] HI7 — Susun ulang testimoni dengan data asli

## Checklist Owner
- [ ] QW1 — Konfirmasi domain final (sudah: khanzabibit.vercel.app)
- [ ] QW2 — Konfirmasi NAP & link Maps final (sudah: koordinat & link didapat)
- [ ] QW3 — Konfirmasi status testimoni + izin pemakaian
- [ ] QW4 — Tentukan kebijakan garansi riil
- [ ] QW5 — Konfirmasi tetap tidak menampilkan harga (sudah final, lihat T1)
- [ ] QW6 — Sudah: 11 ulasan dikonfirmasi
- [ ] QW7 — Tandai produk yang stoknya benar-benar terbatas
- [ ] HI1 — Ambil foto kebun & proses packing
- [ ] HI3 — Sediakan cerita & foto untuk halaman Tentang Kami
- [ ] HI4 — Beri data ekspedisi & kota tujuan
- [ ] HI7 — Hubungi pelanggan lama untuk testimoni asli (sebar permintaan, jangan serentak)
- [ ] LT1, LT2, LT3, LT6, LT7 — Keputusan bisnis jangka panjang

## Checklist Marketing
- [ ] QW6 — Bantu susun copy rating & waktu respons
- [ ] HI6 — Tentukan bentuk lead magnet untuk traffic dingin
- [ ] HI7 — Bantu follow-up WA ke pelanggan lama untuk testimoni
- [ ] QW7 — Bantu komunikasi urgency stok yang jujur
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
| Quick Win | QW16 — Ganti ikon emoji jadi SVG | Sedang | Rendah-Sedang | ✅ Selesai — tidak ada emoji Unicode tersisa |
| Quick Win | QW17 — Internal link index.html→/ | Sedang | Rendah | ✅ Selesai — redirect permanent di vercel.json + link `../` di artikel |
| Quick Win | QW18 — Custom 404 page | Kecil | Rendah | ✅ Selesai — noindex, skip-link, CTA katalog & WA ada |
| Quick Win | QW19 — Pangkas title/meta description | Sedang | Rendah | ✅ Selesai — semua title ≤60 karakter, semua desc ≤155 karakter (dihitung ulang manual) |
| High Impact | HI1 — Foto kebun/packing + galeri homepage | Besar | Sedang | ⛔ Ditutup sesuai keputusan Owner — galeri gak dipakai, cukup FB & TikTok. Komentar placeholder kosong sudah dibersihkan |
| High Impact | HI2 — Optimasi gambar (WebP) | Tinggi | Sedang | ✅ Selesai — 31 file WebP (kualitas adaptif 65-80, rata-rata ~30% lebih kecil dari JPG asli, semua diverifikasi lebih kecil dari original), logo di-resize 400×400→160×160, semua `<img>` relevan jadi `<picture>` dengan fallback |
| High Impact | HI3 — Halaman Tentang Kami | Sedang-Tinggi | Sedang | Belum dikerjakan |
| High Impact | HI4 — Halaman Area Pengiriman | Sedang | Rendah-Sedang | Belum dikerjakan |
| High Impact | HI5 — Artikel edukasi tambahan + riset keyword | Sedang | Sedang | Belum dikerjakan |
| High Impact | HI6 — Lead-capture traffic dingin | Sedang | Sedang | Belum dikerjakan |
| High Impact | HI7 — Testimoni bernama + foto asli | Sedang-Tinggi | Sedang | ✅ Selesai (bagian nama) — 6 testimoni bernama asli, termasuk 1 rating 4★ dibiarkan apa adanya biar natural. *Foto asli per testimoni belum ada* |
| High Impact | HI8 — Security headers HSTS+CSP | Kecil-Sedang | Sedang | ✅ Selesai — HSTS + CSP lengkap di vercel.json, dicek gak ada resource yang keblok |
| Long-term | LT1 — Bundling produk musiman | Sedang | Sedang | Belum dikerjakan |
| Long-term | LT2 — Program retensi & repeat order | Tinggi (jk. panjang) | Rendah-Sedang | Belum dikerjakan |
| Long-term | LT3 — Evaluasi checkout mandiri | Tinggi (jk. panjang) | Tinggi | Menunggu data |
| Long-term | LT4 — Video tur kebun | Sedang | Sedang | Belum dikerjakan |
| Long-term | LT5 — Embed widget Google review | Sedang | Sedang | Menunggu HI7 |
| Long-term | LT6 — Custom domain | Sedang-Tinggi (jk. panjang) | Sedang | Menunggu QW1 tuntas |
| Long-term | LT7 — Segmen B2B/penghijauan | Tinggi (jk. panjang) | Sedang-Tinggi | Belum dikerjakan |
| Long-term | LT8 — Foto skala/angle tambahan per produk | Sedang | Sedang | Belum dikerjakan |
| Long-term | LT9 — Polish UI minor | Kecil | Rendah | Belum dikerjakan |

---

*Master backlog ini menggabungkan seluruh temuan dari 4 audit + roadmap sebelumnya, tanpa duplikasi. 6 trade-off di Bagian 0 sudah diputuskan final — tim eksekusi tidak perlu menafsirkan ulang kalau menemukan rekomendasi yang tampak bertentangan di dokumen audit asli, cukup rujuk ke Bagian 0. Update kolom "Status" secara manual seiring progres.*
