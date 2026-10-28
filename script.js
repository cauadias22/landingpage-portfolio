const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal content as each section enters the viewport.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -30px 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Mobile navigation.
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav?.classList.toggle('is-open', open);
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Abrir menu');
}));

// Menu category filters.
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.menu-card');
tabs.forEach((tab) => tab.addEventListener('click', () => {
  const filter = tab.dataset.filter;
  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
  });
  cards.forEach((card) => card.classList.toggle('is-hidden', filter !== 'todos' && card.dataset.category !== filter));
}));

// Add buttons open WhatsApp with the selected item name.
document.querySelectorAll('.add-button').forEach((button) => button.addEventListener('click', () => {
  const name = button.closest('.menu-card')?.querySelector('h3')?.textContent || 'um pedido';
  const message = encodeURIComponent(`Oi, Quentess! Quero pedir ${name}.`);
  window.open(`https://wa.me/5500000000000?text=${message}`, '_blank', 'noopener');
}));
