/* =============================================
   MATHEUS FILMS — main.js (robusto)
   ============================================= */

/* ── Marcar body como loaded imediatamente ─── */
document.documentElement.classList.add('js');
document.body.classList.add('loaded');

/* ── Navbar scroll effect ──────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Active nav link on scroll ─────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => sectionObserver.observe(s));

/* ── Mobile nav toggle ──────────────────────── */
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.classList.toggle('active');
});

/* ── Smooth anchor scroll ───────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    navMenu?.classList.remove('open');
    navToggle?.classList.remove('active');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Scroll Reveal ──────────────────────────── */
function initReveal() {
  // Só adiciona a classe se IntersectionObserver está disponível
  if (!('IntersectionObserver' in window)) return;

  const revealItems = document.querySelectorAll(
    '.section-header, .featured-video, .card, .photo-item, .filter-bar, .contact-inner, .collection-label'
  );

  // Stagger por grupo de irmãos
  revealItems.forEach(el => {
    const siblings = Array.from(el.parentElement.children).filter(
      c => c.classList.contains(el.classList[0])
    );
    const idx = siblings.indexOf(el);
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(idx * 0.07, 0.4)}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  revealItems.forEach(el => observer.observe(el));

  // Fallback: garante que tudo fica visível após 2s
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      el.classList.add('visible');
    });
  }, 2000);
}

/* ── Photo filter ───────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const photoItems = document.querySelectorAll('.photo-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    photoItems.forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      item.style.opacity = '0';
      item.style.transform = 'scale(0.97)';
      setTimeout(() => {
        if (match) {
          item.style.display = '';
          requestAnimationFrame(() => {
            item.style.opacity = '';
            item.style.transform = '';
          });
        } else {
          item.style.display = 'none';
        }
      }, 220);
    });
  });
});

/* ── Lightbox ───────────────────────────────── */
const lightbox   = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.photo-expand').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.closest('.photo-item')?.querySelector('img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox?.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 350);
}

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ── Hero parallax mouse light ─────────────── */
const hero = document.querySelector('.hero');
hero?.addEventListener('mousemove', e => {
  const r = hero.getBoundingClientRect();
  hero.style.setProperty('--mx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
  hero.style.setProperty('--my', `${((e.clientY - r.top)  / r.height * 100).toFixed(1)}%`);
}, { passive: true });

/* ── Init ───────────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal);
} else {
  initReveal();
}
