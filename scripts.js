document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  async function includeHTML() {
    const includes = document.querySelectorAll('[data-include]');
    for (const el of includes) {
      const url = el.dataset.include;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const text = await response.text();
          el.innerHTML = text;
        } else {
          el.innerHTML = 'Page not found.';
        }
      } catch (error) {
        console.error('Error including HTML:', error);
        el.innerHTML = 'Error loading content.';
      }
    }
  }

  includeHTML().then(() => {
    // Hamburger menu toggle
    const topnav = document.querySelector('.topnav');
    const toggleBtn = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (topnav && toggleBtn) {
      const closeMenu = () => {
        topnav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      };
      const openMenu = () => {
        topnav.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
      };
      toggleBtn.addEventListener('click', () => {
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        expanded ? closeMenu() : openMenu();
      });
      // Close on link click (mobile UX)
      navLinks.forEach(a => a.addEventListener('click', () => closeMenu()));
      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!topnav.classList.contains('open')) return;
        if (!topnav.contains(e.target)) closeMenu();
      });
      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
      });
    }

    // FAQ Carousel initialization
    (function initFaqCarousel() {
      const carousels = document.querySelectorAll('[data-carousel]');
      if (!carousels.length) return;

      carousels.forEach((carousel) => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevBtn = carousel.querySelector('[data-carousel-prev]');
        const nextBtn = carousel.querySelector('[data-carousel-next]');
        const dotsContainer = carousel.parentElement?.querySelector('.carousel-dots');
        if (!track || !slides.length) return;

        let index = 0;
        let slidesPerView = 3;
        let startX = 0;
        let currentTranslate = 0;
        let isDragging = false;

        const computeSlidesPerView = () => {
          const w = window.innerWidth;
          if (w <= 620) return 1;
          if (w <= 980) return 2;
          return 3;
        };

        const update = () => {
          slidesPerView = computeSlidesPerView();
          const maxIndex = Math.max(0, slides.length - slidesPerView);
          index = Math.max(0, Math.min(index, maxIndex));
          const slideWidth = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || '0');
          currentTranslate = -(index * slideWidth);
          track.style.transform = `translateX(${currentTranslate}px)`;
          // Update dots
          if (dotsContainer) {
            const total = maxIndex + 1;
            dotsContainer.innerHTML = '';
            for (let i = 0; i < total; i++) {
              const b = document.createElement('button');
              b.type = 'button';
              b.setAttribute('aria-label', `Slayt ${i+1}`);
              if (i === index) b.setAttribute('aria-current', 'true');
              b.addEventListener('click', () => { index = i; update(); });
              dotsContainer.appendChild(b);
            }
          }
        };

        const next = () => { index++; update(); };
        const prev = () => { index--; update(); };

        nextBtn && nextBtn.addEventListener('click', next);
        prevBtn && prevBtn.addEventListener('click', prev);

        // Touch/Mouse drag support
        const onPointerDown = (e) => {
          // Don't prevent default behavior for clicks on links/buttons
          const target = e.target;
          if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a, button')) {
            return;
          }
          isDragging = true;
          startX = e.type.includes('mouse') ? e.clientX : (e.touches?.[0]?.clientX || 0);
          carousel.classList.add('dragging');
        };
        const onPointerMove = (e) => {
          if (!isDragging) return;
          const x = e.type.includes('mouse') ? e.clientX : (e.touches?.[0]?.clientX || 0);
          const dx = x - startX;
          track.style.transform = `translateX(${currentTranslate + dx}px)`;
        };
        const onPointerUp = (e) => {
          if (!isDragging) return;
          isDragging = false;
          const x = e.type.includes('mouse') ? e.clientX : (e.changedTouches?.[0]?.clientX || 0);
          const dx = x - startX;
          const threshold = 40; // px
          if (dx < -threshold) next();
          else if (dx > threshold) prev();
          else update();
          carousel.classList.remove('dragging');
        };

        track.addEventListener('mousedown', onPointerDown);
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerUp);
        track.addEventListener('touchstart', onPointerDown, { passive: true });
        window.addEventListener('touchmove', onPointerMove, { passive: true });
        window.addEventListener('touchend', onPointerUp);

        window.addEventListener('resize', () => update());
        update();
      });
    })();

    // Auto-open FAQ item when arriving with an anchor (on faq.html)
    const openHashDetails = () => {
      if (!location.hash) return;
      const el = document.querySelector(location.hash);
      if (el && el.tagName === 'DETAILS') {
        el.open = true;
        // Ensure it's in view after opening
        setTimeout(() => {
          try { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) {}
        }, 0);
      }
    };
    openHashDetails();
    window.addEventListener('hashchange', openHashDetails);

    // Ripple effect for all .btn
    function createRipple(target, event) {
      try {
        const circle = document.createElement('span');
        circle.classList.add('ripple');

        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        circle.style.width = circle.style.height = `${size}px`;

        const x = event ? event.clientX - rect.left - size / 2 : rect.width / 2 - size / 2;
        const y = event ? event.clientY - rect.top - size / 2 : rect.height / 2 - size / 2;
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        target.appendChild(circle);
        circle.addEventListener('animationend', () => circle.remove());
      } catch (_) {}
    }

    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', (e) => createRipple(btn, e));
    });

    // Scroll reveal
    const revealItems = document.querySelectorAll('.reveal');
    if (revealItems.length && !prefersReduced && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      revealItems.forEach(el => io.observe(el));
    } else {
      // Fallback
      revealItems.forEach(el => el.classList.add('visible'));
    }

    // Card tilt for overview cards
    if (!prefersReduced) {
      const cards = document.querySelectorAll('.overview-card');
      cards.forEach(card => {
        let raf = null;
        const onMove = (e) => {
          if (raf) return;
          raf = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (0.5 - y) * 6; // tilt up/down
            const rotateY = (x - 0.5) * 6; // tilt left/right
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            card.style.transition = 'transform 60ms ease-out';
            raf = null;
          });
        };
        const onLeave = () => {
          card.style.transition = 'transform 200ms ease';
          card.style.transform = '';
        };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        card.addEventListener('touchmove', onMove, { passive: true });
        card.addEventListener('touchend', onLeave);
      });
    }
  });
});