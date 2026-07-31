/* ==========================================================================
   LUMÉ ODONTOLOGIA — script.js (JavaScript puro, sem dependências)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Ano automático no rodapé ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header: sombra/compacto ao rolar ---------- */
  const header = document.getElementById('header');
  const onScrollHeader = () => {
    if (window.scrollY > 12) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  const closeNav = () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
  };

  const toggleNav = () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', toggleNav);
    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

  /* ---------- Animações suaves ao rolar (Intersection Observer) ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // pequeno atraso escalonado para elementos no mesmo grupo
          const delay = (index % 3) * 90;
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // fallback: exibe tudo direto, sem animação
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Formulário de contato -> abre WhatsApp com a mensagem ---------- */
  const CLINIC_WHATSAPP = '5511999999999'; // Substitua pelo número real da clínica (código do país + DDD + número)

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const telefone = document.getElementById('telefone').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();

      if (!nome || !telefone) {
        form.reportValidity();
        return;
      }

      let texto = `Olá, meu nome é ${nome}. Gostaria de agendar uma avaliação odontológica.`;
      texto += `\nMeu telefone: ${telefone}`;
      if (mensagem) texto += `\nMensagem: ${mensagem}`;

      const url = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(texto)}`;
      window.open(url, '_blank', 'noopener');
    });
  }

});
