// Site script: nav toggle, reveal on scroll, theme toggle, year
(function () {
  // Elements
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("primary-navigation");
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const root = document.documentElement;

  // Year placeholders
  const yearEls = document.querySelectorAll("#year, #year-about, #year-projects");
  const y = new Date().getFullYear();
  yearEls.forEach(el => { if (el) el.textContent = y; });

  // NAV toggle for mobile
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open");
      // animate hamburger
      navToggle.classList.toggle("open");
      navToggle.setAttribute("aria-label", expanded ? "Open menu" : "Close menu");
    });
  }

  // Theme handling
  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme','light');
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-pressed','true');
    } else {
      root.removeAttribute('data-theme');
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-pressed','false');
    }
  }
  // load saved or system
  const savedTheme = localStorage.getItem('theme');
  const initial = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.hasAttribute('data-theme') ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // Simple reveal on scroll
  function revealOnScroll() {
    const cards = document.querySelectorAll('.card');
    const offset = window.innerHeight * 0.85;
    cards.forEach(card => {
      if (card.getBoundingClientRect().top < offset) {
        card.classList.add('visible');
      }
    });
  }
  document.addEventListener('scroll', revealOnScroll, {passive:true});
  window.addEventListener('load', revealOnScroll);
  window.addEventListener('resize', revealOnScroll);

  // Close nav when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !navToggle.contains(e.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    }
  });

  // Smooth link behaviour for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (ev)=>{
      const href = a.getAttribute('href');
      if (href.length>1) {
        ev.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

})();
