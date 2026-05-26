/* =============================================
   inner.js — JS compartilhado (vídeos/fotos)
   ============================================= */

/* ── Navbar scroll ──────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile nav toggle ──────────────────────── */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('nav-menu');
navToggle?.addEventListener('click', () => {
  navMenu?.classList.toggle('open');
  navToggle.classList.toggle('active');
});

/* ── Scroll Reveal ──────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

  revealEls.forEach((el, i) => {
    // stagger por posição no DOM
    el.style.transitionDelay = `${(i % 4) * 0.07}s`;
    obs.observe(el);
  });

  // Fallback: garante visibilidade após 1.5s
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      el.classList.add('visible');
    });
  }, 1500);
} else {
  // Sem IntersectionObserver: mostra tudo imediatamente
  revealEls.forEach(el => el.classList.add('visible'));
}

/* ── Filtro de abas de vídeos ───────────────── */
const ftabs    = document.querySelectorAll('.ftab');
const vcards   = document.querySelectorAll('.vcard');

ftabs.forEach(tab => {
  tab.addEventListener('click', () => {
    ftabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const filter = tab.dataset.filter;

    vcards.forEach(card => {
      const cat = card.dataset.cat;
      const match = filter === 'all' || cat === filter;
      if (match) {
        card.style.display = '';
        card.style.opacity = '1';
        card.style.transform = '';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.96)';
        setTimeout(() => { card.style.display = 'none'; }, 280);
      }
    });
  });
});

/* ── Filtro de fotos ────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const photoCards = document.querySelectorAll('.collection-grid .collection-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    photoCards.forEach(item => {
      const category = item.getAttribute('data-category');
      const match = filter === 'all' || category === filter;
      
      if (match) {
        item.style.display = '';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.96)';
        setTimeout(() => { item.style.display = 'none'; }, 300);
      }
    });
  });
});

/* ── Lightbox ───────────────────────────────── */
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.photo-expand').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.closest('.photo-item')?.querySelector('img');
    if (!img || !lightbox) return;
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