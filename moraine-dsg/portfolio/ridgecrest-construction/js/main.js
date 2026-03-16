document.addEventListener('DOMContentLoaded', () => {

  // 1. NAV SCROLL
  const nav = document.getElementById('mainNav');
  const isHome = document.body.dataset.page === 'home';
  if (isHome) nav.classList.add('nav--transparent');
  else nav.classList.add('nav--scrolled');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('nav--scrolled');
      nav.classList.remove('nav--transparent');
    } else if (isHome) {
      nav.classList.remove('nav--scrolled');
      nav.classList.add('nav--transparent');
    }
  });

  // 2. MOBILE MENU
  const hamburger = document.querySelector('.nav-hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
    });
  }

  // 3. ACTIVE NAV LINK
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });

  // 4. SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 5. GALLERY FILTER
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');
      const cat = btn.dataset.filter;
      galleryItems.forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.category === cat) ? '' : 'none';
      });
    });
  });

  // 6. DROPDOWN (desktop hover handled by CSS, mobile click)
  document.querySelectorAll('.nav-dropdown > a').forEach(toggle => {
    toggle.addEventListener('click', e => {
      if (window.innerWidth < 768) {
        e.preventDefault();
        toggle.parentElement.classList.toggle('nav-dropdown--open');
      }
    });
  });

});
