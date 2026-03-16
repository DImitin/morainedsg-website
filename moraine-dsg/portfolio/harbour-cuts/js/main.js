/* ============================================================
   HARBOUR CUTS — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Scroll Fade-In ─────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach((el) => fadeObserver.observe(el));
  }

  /* ── 2. Mobile Nav Toggle ──────────────────────────────── */
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks  = document.querySelector('.nav__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
      const isOpen = navLinks.classList.contains('is-open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  /* ── 3. Services Sidebar / Tab Active State ────────────── */
  const priceSections = document.querySelectorAll('.price-section');
  const sidebarItems  = document.querySelectorAll('.sidebar-nav__item');
  const tabItems      = document.querySelectorAll('.services-tabs li');

  function setActiveLink(id) {
    // Sidebar
    sidebarItems.forEach((item) => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === '#' + id) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });
    // Mobile tabs
    tabItems.forEach((item) => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === '#' + id) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });
  }

  if (priceSections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-70px 0px -60% 0px',
        threshold: 0,
      }
    );
    priceSections.forEach((section) => sectionObserver.observe(section));
  }

  /* ── 4. Smooth Scroll for Sidebar / Tab Anchors ────────── */
  const anchorLinks = document.querySelectorAll(
    '.sidebar-nav__item a, .services-tabs li a'
  );

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navHeight = 70;
          const tabsEl = document.querySelector('.services-tabs');
          const tabsHeight = tabsEl && getComputedStyle(tabsEl).display !== 'none'
            ? tabsEl.offsetHeight : 0;
          const offset = navHeight + tabsHeight + 16;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ── Active nav link highlighting by page ──────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

})();
