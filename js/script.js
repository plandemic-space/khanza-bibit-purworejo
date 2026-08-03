// Vercel Web Analytics queue polyfill
  window.va = window.va || function(){ (window.vaq = window.vaq || []).push(arguments); };

  // Filter katalog
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.produk');
  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      buttons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      items.forEach(it=>{
        if(cat==='all' || it.dataset.cat===cat){ it.classList.remove('hide'); }
        else{ it.classList.add('hide'); }
      });
    });
  });

  // Mobile menu toggle
  const toggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  toggle.addEventListener('click', ()=>{
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Nav CTA visibility sekarang di-handle CSS media query (.nav-cta), tidak perlu JS

  // Pilih beberapa produk sekaligus -> 1 pesan WA gabungan
  const pilihBoxes = document.querySelectorAll('.pilih-produk');
  const multiBar = document.getElementById('multiWaBar');
  const multiCount = document.getElementById('multiCount');
  const multiLink = document.getElementById('multiWaLink');

  function updateMultiBar(){
    const dipilih = Array.from(pilihBoxes).filter(c => c.checked).map(c => c.dataset.nama);
    if(dipilih.length === 0){
      multiBar.classList.remove('show');
      return;
    }
    multiCount.textContent = dipilih.length;
    const daftar = dipilih.join(', ');
    const pesan = `Halo Khanza Bibit, saya tertarik dengan beberapa bibit berikut: ${daftar}. Boleh info harga & stoknya?`;
    multiLink.href = `https://wa.me/6282224415565?text=${encodeURIComponent(pesan)}`;
    multiBar.classList.add('show');
  }
  pilihBoxes.forEach(cb => cb.addEventListener('change', updateMultiBar));

  // Tombol kembali ke atas + navbar shrink saat discroll
  const backToTop = document.getElementById('backToTop');
  const siteHeader = document.querySelector('header');
  window.addEventListener('scroll', ()=>{
    if(backToTop){
      if(window.scrollY > 600){ backToTop.classList.add('show'); }
      else{ backToTop.classList.remove('show'); }
    }
    if(siteHeader){
      if(window.scrollY > 40){ siteHeader.classList.add('scrolled'); }
      else{ siteHeader.classList.remove('scrolled'); }
    }
  });
  if(backToTop){
    backToTop.addEventListener('click', ()=>{
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ====== Footer bersama (di-generate sekali di sini, dipakai di semua halaman) ======
  // Supaya footer cukup diedit di 1 tempat (bukan copy-paste di tiap file HTML),
  // taruh <div id="footer-slot" data-base="..."></div> di posisi footer tiap halaman.
  // data-base: "" untuk halaman di folder root, "../" untuk halaman di dalam folder artikel/.
  // data-jam-text (opsional): override baris jam operasional, default "Chat WA dibalas 24 jam".
  (function renderFooter(){
    const slot = document.getElementById('footer-slot');
    if(!slot) return;
    const base = slot.dataset.base || '';
    const jamText = slot.dataset.jamText || 'Chat WA dibalas 24 jam';

    slot.outerHTML = `
<footer id="kontak">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">
          <picture><source srcset="${base}images/site/logo.webp" type="image/webp"><img loading="lazy" src="${base}images/site/logo.png" alt="Logo Khanza Bibit" width="160" height="160"></picture>
          <span>Khanza Bibit</span>
        </div>
        <p style="max-width:320px;">Menyediakan bibit tanaman kayu, buah-buahan, hias, dan rempah-rempah berkualitas. Berbasis di Purworejo, siap kirim ke seluruh Indonesia.</p>
      </div>
      <div>
        <h3>Kontak</h3>
        <p>
          <a href="https://wa.me/6282224415565" target="_blank" rel="noopener">WhatsApp: 0822-2441-5565</a><br>
          <a href="https://www.tiktok.com/@teguh.wibowo561" target="_blank" rel="noopener">TikTok: @teguh.wibowo561</a><br>
          <a href="https://www.facebook.com/teguh.wibowo.597812" target="_blank" rel="noopener">Facebook: Teguh Wibowo</a><br>
          <a href="https://www.facebook.com/dya.mardhiana90" target="_blank" rel="noopener">Facebook: Dya Mardhiana</a><br>
          <a href="https://maps.app.goo.gl/UqwznX7Ne4UvaN2a9" target="_blank" rel="noopener">Lihat lokasi di Google Maps →</a>
        </p>
      </div>
      <div>
        <h3>Kirim Dari</h3>
        <p>
          Ngemplak RT 02 / RW 02, Desa Samping,<br>
          Kec. Kemiri, Kabupaten Purworejo,<br>
          Jawa Tengah 54262<br><br>
          ${jamText}
        </p>
      </div>
    </div>
    <div class="foot-bottom">
      <span>&copy; 2026 Khanza Bibit</span>
      <span class="foot-credit">Crafted by <a href="https://plandemicspace.vercel.app/" target="_blank" rel="noopener noreferrer">Plandemic Space</a></span>
    </div>
  </div>
</footer>`;
  })();
