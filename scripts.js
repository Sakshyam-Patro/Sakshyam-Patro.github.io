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
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }));

  // ---- Sticky Nav ----
  const nav = document.getElementById('nav');
  let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    nav.classList.toggle('scrolled', y > 40);
    nav.classList.toggle('hidden', y > lastY && y > 200);
    lastY = y;
  }, { passive: true });

  // ---- Active Nav Link ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const obNav = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-40% 0px -60% 0px' });
  sections.forEach(s => obNav.observe(s));

  // ---- Scroll Reveal ----
  const obAnim = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obAnim.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.anim').forEach(el => obAnim.observe(el));

  // ---- Smooth Scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', function (e) {
    e.preventDefault();
    const t = document.querySelector(this.getAttribute('href'));
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - nav.offsetHeight - 16, behavior: 'smooth' });
  }));

  // ---- Particle Canvas ----
  const canvas = document.getElementById('geo-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles, raf;

  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  function spawn() {
    const n = Math.min(Math.floor(W * H / 28000), 50);
    particles = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.5
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const dc = getComputedStyle(html).getPropertyValue('--dot-color').trim();
    const lc = getComputedStyle(html).getPropertyValue('--line-color').trim();
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fillStyle = dc; ctx.fill();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        if (dx * dx + dy * dy < 32400) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = lc; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  }

  resize(); spawn(); draw();
  addEventListener('resize', () => { resize(); spawn(); });
  document.addEventListener('visibilitychange', () => { document.hidden ? cancelAnimationFrame(raf) : draw(); });
})();
