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

  // Show nav CTA button only on wider screens
  function updateNavCta(){
    const navCta = document.getElementById('navCta');
    if(navCta){ navCta.style.display = window.innerWidth >= 960 ? 'inline-flex' : 'none'; }
  }
  updateNavCta();
  window.addEventListener('resize', updateNavCta);

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

  // Tombol kembali ke atas
  const backToTop = document.getElementById('backToTop');
  if(backToTop){
    window.addEventListener('scroll', ()=>{
      if(window.scrollY > 600){ backToTop.classList.add('show'); }
      else{ backToTop.classList.remove('show'); }
    });
    backToTop.addEventListener('click', ()=>{
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
