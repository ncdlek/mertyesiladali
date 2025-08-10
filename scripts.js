document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

