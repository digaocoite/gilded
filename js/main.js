/* JavaScript for The Gilded Room */

document.addEventListener('DOMContentLoaded', () => {
  // Page load fade-in
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // Fade out page on navigation
  const links = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"]):not(.no-transition)');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Verify href exists and is a local page (does not contain protocol)
      if (href && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('http')) {
        e.preventDefault();
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      }
    });
  });

  // Mobile Navigation Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scrolling when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Countdown Timer for Saturday, July 18, 2026 at 20:00:00 (8:00 PM CST / -05:00)
  const countdownTarget = new Date('2026-07-18T20:00:00-05:00').getTime();
  const timerElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    container: document.getElementById('countdown')
  };

  if (timerElements.days && timerElements.hours && timerElements.minutes && timerElements.seconds) {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = countdownTarget - now;

      if (difference <= 0) {
        // Event has started or completed
        timerElements.days.textContent = '00';
        timerElements.hours.textContent = '00';
        timerElements.minutes.textContent = '00';
        timerElements.seconds.textContent = '00';
        
        // Optionally update text nearby
        const statusBadge = document.getElementById('event-status-badge');
        if (statusBadge) {
          statusBadge.textContent = 'Event In Progress / Completed';
        }
        return;
      }

      // Calculate time components
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      // Pad with leading zeros
      timerElements.days.textContent = d.toString().padStart(2, '0');
      timerElements.hours.textContent = h.toString().padStart(2, '0');
      timerElements.minutes.textContent = m.toString().padStart(2, '0');
      timerElements.seconds.textContent = s.toString().padStart(2, '0');
    };

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    
    if (trigger && panel) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-panel').style.maxHeight = null;
          }
        });

        // Toggle current item
        item.classList.toggle('active');
        if (!isActive) {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        } else {
          panel.style.maxHeight = null;
        }
      });
    }
  });

  // Contact Form Submission (Simulated)
  const contactForm = document.getElementById('gilded-contact-form');
  const modalOverlay = document.getElementById('success-modal');
  const modalClose = document.getElementById('modal-close-btn');

  if (contactForm && modalOverlay && modalClose) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Display modal overlay
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Reset form
      contactForm.reset();
    });

    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close modal when clicking outside contents
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Cookie Notice Banner
  const cookieBanner = document.getElementById('cookie-notice');
  const acceptCookiesBtn = document.getElementById('cookie-accept');
  const declineCookiesBtn = document.getElementById('cookie-decline');

  if (cookieBanner && acceptCookiesBtn && declineCookiesBtn) {
    // Show banner after short delay if choice not made
    const cookieChoice = localStorage.getItem('gilded_cookie_consent');
    if (!cookieChoice) {
      setTimeout(() => {
        cookieBanner.classList.add('active');
      }, 1500);
    }

    acceptCookiesBtn.addEventListener('click', () => {
      localStorage.setItem('gilded_cookie_consent', 'accepted');
      cookieBanner.classList.remove('active');
    });

    declineCookiesBtn.addEventListener('click', () => {
      localStorage.setItem('gilded_cookie_consent', 'declined');
      cookieBanner.classList.remove('active');
    });
  }
});
