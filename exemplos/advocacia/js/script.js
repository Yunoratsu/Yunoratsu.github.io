/* ==========================================================================
   Andrade & Vilela Advogados — script.js
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* Header sólido ao rolar */
  const header = $("#header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Menu mobile */
  const toggle = $("#navToggle");
  const nav = $("#nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("#nav a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        document.body.style.overflow = "";
      })
    );
  }

  /* Reveal ao rolar */
  const revealItems = $$(".reveal");
  if (revealItems.length) {
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealItems.forEach((el) => io.observe(el));
    } else {
      revealItems.forEach((el) => el.classList.add("is-visible"));
    }
  }

  /* Contadores animados */
  const counters = $$("[data-count]");
  if (counters.length) {
    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const duration = 1300;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            io2.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => io2.observe(el));
  }

  /* Formulário de contato -> abre o WhatsApp com a mensagem pronta */
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = $("#nome", form)?.value.trim();
      const contatoCliente = $("#contatoCliente", form)?.value.trim();
      const assunto = $("#assunto", form)?.value;
      const mensagem = $("#mensagem", form)?.value.trim();

      const texto =
        `Olá, meu nome é ${nome || "___"}. ` +
        `Gostaria de uma consulta sobre ${assunto || "um assunto jurídico"}. ` +
        (mensagem ? `Detalhes: ${mensagem}. ` : "") +
        `Meu contato: ${contatoCliente || "___"}.`;

      window.open(`https://wa.me/5511988887777?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
    });
  }

  /* Ano no rodapé */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
