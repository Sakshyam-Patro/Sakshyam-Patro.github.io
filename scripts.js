// ============================================================
// Sakshyam Patro — Portfolio Scripts
// ============================================================
(function () {
  'use strict';

  const html = document.documentElement;

  // ---- Theme ----
  const toggle = document.getElementById('theme-toggle');
  function setTheme(t) { html.setAttribute('data-theme', t); localStorage.setItem('theme', t); }
  setTheme(localStorage.getItem('theme') || 'light');
  toggle.addEventListener('click', () => setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  // ---- Mobile Menu ----
  const burger = document.getElementById('nav-hamburger');
  const menu = document.getElementById('mobile-menu');
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }));

  // ---- Sticky Nav (hide on scroll down) ----
  const nav = document.getElementById('nav');
  let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    nav.classList.toggle('scrolled', y > 40);
    nav.classList.toggle('hidden', y > lastY && y > 240);
    lastY = y;
  }, { passive: true });

  // ---- Active Nav Link ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const obNav = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -55% 0px' });
  sections.forEach(s => obNav.observe(s));

  // ---- Scroll Reveal ----
  const obAnim = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obAnim.unobserve(e.target); }
  }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.anim').forEach(el => obAnim.observe(el));

  // ---- Smooth Scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const t = document.querySelector(href);
    if (t) {
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - nav.offsetHeight - 16, behavior: 'smooth' });
    }
  }));
})();
