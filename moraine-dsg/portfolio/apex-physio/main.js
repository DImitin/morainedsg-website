document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------
  // 1. Nav transparency on home page
  // -------------------------------------------------------
  const nav = document.querySelector('.site-nav');
  if (nav && document.body.classList.contains('page-home')) {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load to set correct initial state
    handleScroll();
  }

  // -------------------------------------------------------
  // 2. Mobile hamburger
  // -------------------------------------------------------
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });

    // Close mobile nav when a link is clicked
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.classList.remove('nav-open');
      });
    });

    // Mobile services accordion
    const mobileServicesToggle = document.querySelector('.mobile-services-toggle');
    const mobileServicesMenu = document.querySelector('.mobile-services-menu');
    if (mobileServicesToggle && mobileServicesMenu) {
      mobileServicesToggle.addEventListener('click', () => {
        mobileServicesToggle.classList.toggle('open');
        mobileServicesMenu.classList.toggle('open');
      });
    }
  }

  // -------------------------------------------------------
  // 3. FAQ Accordion — one item open at a time
  // -------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(i => {
          i.classList.remove('open');
          const a = i.querySelector('.faq-answer');
          if (a) a.style.maxHeight = null;
        });
        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // -------------------------------------------------------
  // 4. Smooth scroll for anchor links
  // -------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // -------------------------------------------------------
  // 5. Desktop dropdown — Services nav
  // -------------------------------------------------------
  const servicesToggle = document.querySelector('.nav-services-toggle');
  const servicesDropdown = document.querySelector('.services-dropdown');
  if (servicesToggle && servicesDropdown) {
    const navItem = servicesToggle.closest('.nav-item');
    if (navItem) {
      navItem.addEventListener('mouseenter', () => {
        servicesDropdown.classList.add('open');
        const arrow = servicesToggle.querySelector('.dropdown-arrow');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
      });
      navItem.addEventListener('mouseleave', () => {
        servicesDropdown.classList.remove('open');
        const arrow = servicesToggle.querySelector('.dropdown-arrow');
        if (arrow) arrow.style.transform = '';
      });
    }
  }

  // -------------------------------------------------------
  // 6. Booking discipline quick-select
  // -------------------------------------------------------
  const disciplineCards = document.querySelectorAll('.discipline-card[data-discipline]');
  const bookingForm = document.querySelector('#booking-form');
  const disciplineSelect = document.querySelector('#booking-discipline');

  disciplineCards.forEach(card => {
    card.addEventListener('click', e => {
      const discipline = card.dataset.discipline;
      if (disciplineSelect && discipline) {
        disciplineSelect.value = discipline;
        // Highlight with a brief flash
        disciplineSelect.closest('.form-group').scrollIntoView({ behavior: 'smooth', block: 'center' });
        disciplineSelect.style.borderColor = 'var(--ap-sage)';
        setTimeout(() => {
          disciplineSelect.style.borderColor = '';
        }, 1800);
      } else if (bookingForm) {
        bookingForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // -------------------------------------------------------
  // 7. Form — prevent default submit (demo)
  // -------------------------------------------------------
  const forms = document.querySelectorAll('form.apex-form');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.disabled = true;
        btn.style.backgroundColor = 'var(--ap-sage-dark)';
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.backgroundColor = '';
        }, 3000);
      }
    });
  });

});
