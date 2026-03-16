/* ============================================================
   Clearwater Plumbing — Main JS
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     STICKY NAV SHADOW
     ---------------------------------------------------------- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------
     MOBILE MENU TOGGLE
     ---------------------------------------------------------- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      }
    });
  }

  /* ----------------------------------------------------------
     SCROLL FADE-IN ANIMATIONS
     ---------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );

    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ----------------------------------------------------------
     ACTIVE NAV LINK (highlight current page)
     ---------------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ----------------------------------------------------------
     ACCORDION (services page)
     ---------------------------------------------------------- */
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all in same category first (optional — comment out for multi-open)
      const category = item.closest('.accordion-category');
      if (category) {
        category.querySelectorAll('.accordion-item.open').forEach(el => {
          if (el !== item) el.classList.remove('open');
        });
      }

      item.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', !isOpen);
    });
  });

  // Open first item in each category by default
  document.querySelectorAll('.accordion-category').forEach(cat => {
    const first = cat.querySelector('.accordion-item');
    if (first) {
      first.classList.add('open');
      const t = first.querySelector('.accordion-trigger');
      if (t) t.setAttribute('aria-expanded', 'true');
    }
  });

  /* ----------------------------------------------------------
     CONTACT FORM — basic client-side validation feedback
     ---------------------------------------------------------- */
  const form = document.querySelector('.quote-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const requiredFields = form.querySelectorAll('[required]');
      let valid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#E53E3E';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (valid) {
        // In production, this submits to Formspree or similar
        const submitBtn = form.querySelector('[type="submit"]');
        submitBtn.textContent = 'Message Sent!';
        submitBtn.disabled = true;
        submitBtn.style.background = 'var(--color-success)';
        submitBtn.style.borderColor = 'var(--color-success)';
      }
    });
  }

})();
