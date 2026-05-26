/* =============================================
   home.js — Animações da página inicial
   ============================================= */

/* Parallax sutil no background com o mouse */
const heroBg = document.querySelector('.hero-img');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 8;
  const y = (e.clientY / window.innerHeight - 0.5) * 6;
  if (heroBg) {
    heroBg.style.transform = `scale(1.04) translate(${x}px, ${y}px)`;
  }
}, { passive: true });

/* Transição de saída suave ao clicar nos botões */
document.querySelectorAll('.hero-buttons a').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const href = this.getAttribute('href');

    // Fade out rápido antes de navegar
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';

    setTimeout(() => {
      window.location.href = href;
    }, 380);
  });
});
