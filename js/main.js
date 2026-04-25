/* ========================================
   ControlNice — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.navbar-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }

  // Fade-in on scroll (IntersectionObserver)
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // === Conversion Feature 1: Comparison Toggle ===
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const compTable = document.getElementById('compTable');
  if (toggleBtns.length && compTable) {
    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        toggleBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var target = btn.getAttribute('data-target');
        if (target === 'competitor') {
          compTable.classList.add('show-competitor');
        } else {
          compTable.classList.remove('show-competitor');
        }
      });
    });
  }

  // === Conversion Feature 2: Sticky RFQ Bar ===
  const stickyRfq = document.getElementById('stickyRfq');
  const floatingCta = document.getElementById('floatingCta');
  const contactSection = document.getElementById('contact');

  // Show sticky bar after user scrolls past hero
  if (stickyRfq) {
    var heroBottom = document.querySelector('.page-header') || document.querySelector('.hero');
    if (heroBottom) {
      window.addEventListener('scroll', function () {
        var scrollY = window.scrollY || window.pageYOffset;
        var heroH = heroBottom.offsetHeight;
        if (scrollY > heroH * 0.6) {
          stickyRfq.classList.add('visible');
        } else {
          stickyRfq.classList.remove('visible');
        }
      });
    }
  }

  // Hide floating CTA when contact section is in view
  if (floatingCta && contactSection && 'IntersectionObserver' in window) {
    var ctaObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            floatingCta.style.opacity = '0';
            floatingCta.style.pointerEvents = 'none';
            if (stickyRfq) stickyRfq.style.opacity = '0';
            if (stickyRfq) stickyRfq.style.pointerEvents = 'none';
          } else {
            floatingCta.style.opacity = '1';
            floatingCta.style.pointerEvents = 'auto';
            if (stickyRfq) stickyRfq.style.opacity = '';
            if (stickyRfq) stickyRfq.style.pointerEvents = '';
          }
        });
      },
      { threshold: 0.3 }
    );
    ctaObserver.observe(contactSection);
  }

  // === Conversion Feature 3: Newsletter Form ===
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = newsletterForm.querySelector('input[name="email"]').value;
      console.log('Newsletter subscription:', email);
      // TODO: Send to HubSpot via webhook
      // fetch('https://hooks.make.com/...', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: email, source: 'website_newsletter' })
      // });
      var input = newsletterForm.querySelector('input[name="email"]');
      input.value = '';
      input.placeholder = 'Subscribed! Check your inbox for the welcome guide.';
      input.disabled = true;
      newsletterForm.querySelector('button').textContent = 'Done ✓';
      newsletterForm.querySelector('button').disabled = true;
    });
  }

  // Contact form handler (placeholder — will connect to HubSpot API)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(contactForm);
      var data = Object.fromEntries(formData.entries());
      console.log('Form submission:', data);
      // TODO: Send to HubSpot via Webflow Logic / Make.com webhook
      alert('Thank you for your inquiry. Our metrology specialists will contact you within 24 hours.');
      contactForm.reset();
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80; // navbar height
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
});
