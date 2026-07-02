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
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> navLinks.classList.remove('open'));
  });

  // Show nav CTA button only on wider screens
  function updateNavCta(){
    document.getElementById('navCta').style.display = window.innerWidth >= 960 ? 'inline-flex' : 'none';
  }
  updateNavCta();
  window.addEventListener('resize', updateNavCta);
