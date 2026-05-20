(function () {
  // Mobile nav
  const toggle = document.querySelector('[data-nav-toggle]');
  const closeBtn = document.querySelector('[data-mobile-nav-close]');
  const menu = document.querySelector('[data-mobile-nav]');

  function open() {
    if (!menu) return;
    menu.classList.add('is-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    if (!menu) return;
    menu.classList.remove('is-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggle) toggle.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (menu) menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  // Year stamp
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // AI Lab: collapsible domain cards
  document.querySelectorAll('[data-domain-acc]').forEach((card) => {
    const head = card.querySelector('.domain-acc__head');
    const body = card.querySelector('.domain-acc__body');
    if (!head || !body) return;
    head.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');
      card.classList.toggle('is-open');
      body.style.maxHeight = isOpen ? '0px' : body.scrollHeight + 'px';
    });
  });

  // Form submit (stub)
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Thanks — we will be in touch';
      btn.disabled = true;
      form.reset();
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 4000);
    });
  }
})();
