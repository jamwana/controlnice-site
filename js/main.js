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

  // Contact form handler (placeholder — will connect to HubSpot API)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      console.log('Form submission:', data);
      // TODO: Send to HubSpot via Webflow Logic / Make.com webhook
      // fetch('https://hooks.make.com/...', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      alert('Thank you for your inquiry. Our metrology specialists will contact you within 24 hours.');
      contactForm.reset();
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // Floating CTA visibility (hide on About page when contact section is in view)
  const floatingCta = document.querySelector('.floating-cta');
  const contactSection = document.getElementById('contact');
  if (floatingCta && contactSection) {
    const ctaObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            floatingCta.style.opacity = '0';
            floatingCta.style.pointerEvents = 'none';
          } else {
            floatingCta.style.opacity = '1';
            floatingCta.style.pointerEvents = 'auto';
          }
        });
      },
      { threshold: 0.3 }
    );
    ctaObserver.observe(contactSection);
  }
});
