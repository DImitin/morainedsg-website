/**
 * Moraine DSG — main.js
 * - Sticky nav shadow on scroll
 * - Hamburger mobile menu toggle
 * - IntersectionObserver fade-in-up animations
 * - Smooth scroll for anchor links
 */

(function () {
  'use strict';

  /* ── Sticky Nav ─────────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── Hamburger Toggle ───────────────────────────────────── */
  const hamburger = document.querySelector('.nav__hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
      const expanded = document.body.classList.contains('nav-open');
      hamburger.setAttribute('aria-expanded', expanded);
      // Prevent body scroll when menu is open
      document.body.style.overflow = expanded ? 'hidden' : '';
    });

    // Close menu on mobile link click
    document.querySelectorAll('.nav__mobile a').forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        document.body.style.overflow = '';
      });
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Scroll Animations (IntersectionObserver) ───────────── */
  const fadeEls = document.querySelectorAll('.fade-in-up');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: just show everything
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Smooth Scroll for Anchor Links ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
