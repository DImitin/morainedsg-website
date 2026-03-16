/* ============================================
   FIELDSTONE KITCHEN — main.js
   Moraine DSG | Business Pro Tier Demo
   ============================================ */

(function () {
  'use strict';

  /* ----------------------------------------
     Nav: transparent on home hero, solid on scroll
  ---------------------------------------- */
  const body = document.body;
  const nav = document.querySelector('.site-nav');

  if (body.classList.contains('home-page') && nav) {
    const handleNavScroll = function () {
      if (window.scrollY > 56) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  /* ----------------------------------------
     Mobile nav hamburger toggle
  ---------------------------------------- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on any link click inside mobile nav
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ----------------------------------------
     Form: basic client-side feedback (demo)
  ---------------------------------------- */
  document.querySelectorAll('form[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const original = submitBtn.textContent;
      submitBtn.textContent = 'Message Sent';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      setTimeout(function () {
        submitBtn.textContent = original;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        form.reset();
      }, 3500);
    });
  });

  /* ----------------------------------------
     Reservation Modal
  ---------------------------------------- */
  const overlay = document.getElementById('reservationModal');
  if (!overlay) return;

  const modalContainer = overlay.querySelector('.modal-container');
  const modalForm     = overlay.querySelector('#reservationForm');
  const confirmScreen = overlay.querySelector('.modal-confirm');
  const closeBtn      = overlay.querySelector('.modal-close');
  const confirmCloseBtn = overlay.querySelector('.modal-confirm-close');

  // Set date picker minimum to today
  const dateInput = overlay.querySelector('#res-date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm   = String(today.getMonth() + 1).padStart(2, '0');
    const dd   = String(today.getDate()).padStart(2, '0');
    dateInput.min = yyyy + '-' + mm + '-' + dd;
  }

  function openModal() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus first field after transition
    setTimeout(function () {
      var first = modalForm.querySelector('input, select');
      if (first) first.focus();
    }, 260);
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Reset after transition completes
    setTimeout(function () {
      modalForm.reset();
      modalForm.style.display = '';
      confirmScreen.classList.remove('is-visible');
      // Clear any error states
      modalForm.querySelectorAll('.has-error').forEach(function (el) {
        el.classList.remove('has-error');
      });
    }, 280);
  }

  // Wire up all reserve triggers
  document.querySelectorAll('.js-reserve-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  // Close button
  closeBtn.addEventListener('click', closeModal);

  // Confirmation close button
  confirmCloseBtn.addEventListener('click', closeModal);

  // Click outside container
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  // ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Form submission
  modalForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var valid = true;
    var required = ['res-date', 'res-time', 'res-size', 'res-name', 'res-phone'];

    required.forEach(function (id) {
      var field = overlay.querySelector('#' + id);
      var group = field ? field.closest('.form-group') : null;
      if (!field || !field.value.trim()) {
        valid = false;
        if (group) group.classList.add('has-error');
      } else {
        if (group) group.classList.remove('has-error');
      }
    });

    // Live-clear errors on input
    required.forEach(function (id) {
      var field = overlay.querySelector('#' + id);
      if (field) {
        field.addEventListener('input', function () {
          var group = field.closest('.form-group');
          if (field.value.trim() && group) group.classList.remove('has-error');
        }, { once: false });
      }
    });

    if (!valid) return;

    // Build confirmation message values
    var name      = overlay.querySelector('#res-name').value.trim();
    var size      = overlay.querySelector('#res-size').value;
    var dateRaw   = overlay.querySelector('#res-date').value;
    var time      = overlay.querySelector('#res-time').options[overlay.querySelector('#res-time').selectedIndex].text;

    // Format date nicely
    var dateDisplay = dateRaw;
    if (dateRaw) {
      var parts = dateRaw.split('-');
      var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      dateDisplay = d.toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }

    var sizeLabel = size === '11+' ? '11 or more guests' : (size === '1' ? '1 guest' : size + ' guests');

    var confirmMsg = overlay.querySelector('.modal-confirm-message');
    if (confirmMsg) {
      confirmMsg.textContent = 'Thanks, ' + name + '! We\u2019ve received your request for '
        + sizeLabel + ' on ' + dateDisplay + ' at ' + time
        + '. We\u2019ll confirm your reservation by phone shortly.';
    }

    // Swap to confirmation screen
    modalForm.style.display = 'none';
    overlay.querySelector('.modal-header').style.display = 'none';
    overlay.querySelector('.modal-subtext').style.display = 'none';
    overlay.querySelector('.modal-divider').style.display = 'none';
    confirmScreen.classList.add('is-visible');
  });

})();
