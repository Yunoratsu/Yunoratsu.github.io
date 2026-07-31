/* ==========================================================================
   NV Studio — script.js (JavaScript puro, sem dependências)
   ========================================================================== */

const NUMERO_WHATSAPP = "5511999999999";

/* --------------------------------------------------------------------------
   Projetos reais do portfólio. Cada um aponta para um site de verdade,
   publicado dentro de /exemplos/<slug>/ — com seu próprio HTML, CSS e JS,
   funcionando de forma independente. Para adicionar um novo projeto:
   1) coloque o site em /exemplos/<slug>/index.html
   2) copie um objeto abaixo e ajuste os dados e o campo "url"
   -------------------------------------------------------------------------- */
const projetos = [
  {
    id: 1,
    slug: "advocacia-andrade-vilela",
    nome: "Andrade & Vilela Advogados",
    categoria: "Escritório de Advocacia",
    resumo: "Site institucional com áreas de atuação, equipe e um formulário que já monta a mensagem pro WhatsApp.",
    descricao:
      "Site completo para um escritório de advocacia boutique, com apresentação das áreas de atuação, dos sócios responsáveis por cada caso e depoimentos de clientes. Cada seção foi pensada pra transmitir confiança logo de cara — sem parecer frio ou burocrático.",
    objetivo: "Gerar mais pedidos de consulta pelo WhatsApp, vindos de quem já chega no site decidido a marcar um horário.",
    desafio: "Passar seriedade e tradição sem parecer um site antigo ou engessado.",
    solucao: "Paleta em azul-marinho e dourado, tipografia elegante e um formulário que já monta a mensagem do WhatsApp com os dados preenchidos.",
    tempo: "3 semanas",
    corA: "#0E1B33",
    corB: "#B08D3E",
    url: "exemplos/advocacia/index.html",
  },
];

/* --------------------------------------------------------------------------
   Estilos possíveis para a seção "vitrine" (mostrados dentro do celular)
   -------------------------------------------------------------------------- */
const estilos = [
  {
    nome: "Loja Online",
    desc: "Vitrine de produtos com botão de comprar sempre em destaque.",
    layout: "shop",
    corA: "#EC4899",
    corB: "#8B5CF6",
  },
  {
    nome: "Restaurante / Cardápio",
    desc: "Pratos com foto, nome e preço — fácil de ler no celular, na mesa do cliente.",
    layout: "menu",
    corA: "#F59E0B",
    corB: "#EF4444",
  },
  {
    nome: "Institucional",
    desc: "Visual sério e confiável, ideal para clínicas, escritórios e empresas.",
    layout: "corporate",
    corA: "#64748B",
    corB: "#3B82F6",
  },
  {
    nome: "Portfólio Criativo",
    desc: "Galeria de trabalhos em destaque — ótimo para fotógrafos e criadores.",
    layout: "gallery",
    corA: "#8B5CF6",
    corB: "#3B82F6",
  },
  {
    nome: "Página de Serviço",
    desc: "Uma tela só, direto ao ponto, com um botão grande de agendar ou comprar.",
    layout: "landing",
    corA: "#22C55E",
    corB: "#0EA5E9",
  },
];

/* --------------------------------------------------------------------------
   Utilitários
   -------------------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function whatsappLink(mensagem) {
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

/* --------------------------------------------------------------------------
   Pré-visualização ao vivo de um site real — em vez de desenhar um "print"
   falso em CSS, isto carrega o site de verdade dentro de um <iframe> em
   miniatura (sem interação). A escala é ajustada em JS por initSiteEmbeds().
   -------------------------------------------------------------------------- */
function siteEmbedHTML(projeto, aspecto) {
  const style = aspecto ? ` style="aspect-ratio:${aspecto}"` : "";
  return `
    <div class="browser-frame">
      <div class="browser-bar"><span></span><span></span><span></span></div>
      <div class="browser-screen"${style}>
        <div class="site-embed" data-site-embed>
          <div class="embed-loading">Carregando site…</div>
          <iframe src="${projeto.url}" title="Pré-visualização do site: ${projeto.nome}" loading="lazy" tabindex="-1" aria-hidden="true"></iframe>
        </div>
      </div>
    </div>`;
}

function initSiteEmbeds(root = document) {
  const wraps = $$("[data-site-embed]", root);
  if (!wraps.length) return;

  function scaleOne(wrap) {
    const iframe = wrap.querySelector("iframe");
    if (!iframe) return;
    const w = wrap.clientWidth || wrap.parentElement.clientWidth;
    const scale = w / 1440;
    iframe.style.transform = `scale(${scale})`;
    iframe.addEventListener("load", () => wrap.classList.add("is-loaded"), { once: true });
  }

  wraps.forEach(scaleOne);

  let raf = null;
  window.addEventListener("resize", () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => wraps.forEach(scaleOne));
  });
}

function projectCardHTML(projeto, index) {
  return `
    <a class="project-card reveal" style="transition-delay:${(index % 3) * 0.08}s" href="projeto.html?slug=${projeto.slug}">
      <div class="mock-wrap"><div class="mock-scale">${siteEmbedHTML(projeto)}</div></div>
      <div class="project-body">
        <span class="eyebrow">${projeto.categoria}</span>
        <h3>${projeto.nome}</h3>
        <p>${projeto.resumo}</p>
        <span class="btn-ghost">Ver detalhes
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </a>`;
}

function placeholderCardHTML() {
  return `
    <div class="project-card project-card--placeholder reveal">
      <div class="ph-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg>
      </div>
      <h3>Seu site pode ser o próximo</h3>
      <p>Este espaço está reservado pro seu projeto. Bora conversar?</p>
      <a class="btn-ghost js-whatsapp" href="#">Pedir orçamento
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>`;
}

function renderPortfolio() {
  const grid = $("#portfolio-grid");
  if (!grid) return;
  grid.innerHTML = projetos.map(projectCardHTML).join("") + placeholderCardHTML();
  initSiteEmbeds(grid);
}

/* --------------------------------------------------------------------------
   Navbar: transparente no topo, sólida com blur ao rolar + menu mobile
   -------------------------------------------------------------------------- */
function initNavbar() {
  const nav = $(".navbar");
  if (!nav) return;
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = $(".nav-toggle");
  const mobileNav = $(".mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$(".mobile-nav a").forEach((a) =>
      a.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        document.body.style.overflow = "";
      })
    );
  }
}

/* --------------------------------------------------------------------------
   "Universo" do hero: acompanha o mouse suavemente — só em telas com mouse
   de verdade (desktop). Em celular/tablet a composição fica parada e leve.
   -------------------------------------------------------------------------- */
function initHeroParallax() {
  const hero = $(".hero");
  const art = $(".hero-art");
  if (!hero || !art) return;

  const podeUsarMouse = window.matchMedia("(pointer: fine)").matches && window.innerWidth >= 980;
  if (!podeUsarMouse) return;

  const layers = [
    { el: $(".frame", art), depth: 6 },
    { el: $(".frame-inner", art), depth: 12 },
    { el: $(".core", art), depth: 20 },
    { el: $(".dot--1", art), depth: 30 },
    { el: $(".dot--2", art), depth: 26 },
  ].filter((l) => l.el);

  let raf = null;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      layers.forEach(({ el, depth }) => {
        el.style.transform = `translate(${relX * depth}px, ${relY * depth}px)`;
      });
    });
  });

  hero.addEventListener("mouseleave", () => {
    layers.forEach(({ el }) => { el.style.transform = "translate(0,0)"; });
  });
}

/* --------------------------------------------------------------------------
   Reveal ao rolar a tela
   -------------------------------------------------------------------------- */
function initReveal() {
  const items = $$(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
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
  items.forEach((el) => io.observe(el));
}

/* --------------------------------------------------------------------------
   Contadores animados
   -------------------------------------------------------------------------- */
function initCounters() {
  const counters = $$("[data-count]");
  if (!counters.length) return;
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => io.observe(el));
}

/* --------------------------------------------------------------------------
   FAQ (acordeão)
   -------------------------------------------------------------------------- */
function initFaq() {
  $$(".faq-item").forEach((item) => {
    const btn = $(".faq-question", item);
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      $$(".faq-item").forEach((i) => {
        i.classList.remove("is-open");
        $(".faq-question", i)?.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Vitrine de estilos — celular com telas trocando sozinhas (ou por clique)
   -------------------------------------------------------------------------- */
function miniScreenHTML(estilo) {
  const grad = `linear-gradient(135deg, ${estilo.corA}, ${estilo.corB})`;
  const gradSoft = `linear-gradient(135deg, ${estilo.corA}55, ${estilo.corB}55)`;

  const layouts = {
    shop: `
      <div class="layout-shop">
        <div class="tile" style="background:${gradSoft}"></div>
        <div class="tile"></div>
        <div class="tile"></div>
      </div>`,
    menu: `
      <div class="layout-menu">
        <div class="row"><div class="thumb" style="background:${gradSoft}"></div><div class="lines"><span></span><span></span></div></div>
        <div class="row"><div class="thumb" style="background:${gradSoft}"></div><div class="lines"><span></span><span></span></div></div>
        <div class="row"><div class="thumb" style="background:${gradSoft}"></div><div class="lines"><span></span><span></span></div></div>
      </div>`,
    corporate: `
      <div class="layout-corporate">
        <div class="badge" style="background:${grad}"></div>
        <div class="lines"><span style="width:70%"></span><span style="width:55%"></span><span style="width:40%"></span></div>
        <div class="cta" style="background:${grad}"></div>
      </div>`,
    gallery: `
      <div class="layout-gallery">
        <div class="tile" style="background:${gradSoft}"></div>
        <div class="tile"></div>
        <div class="tile"></div>
      </div>`,
    landing: `
      <div class="layout-landing">
        <div class="hero-block" style="background:${gradSoft}"></div>
        <div class="lines"><span style="width:80%"></span><span style="width:50%"></span></div>
        <div class="cta" style="background:${grad}"></div>
      </div>`,
  };

  return `
    <div class="screen-bg" style="background:linear-gradient(160deg, ${estilo.corA}22, #0e0e0e 60%)"></div>
    <div class="screen-content is-active">
      <div class="mini-header">
        <span class="mini-bar" style="width:44px;background:${estilo.corA}"></span>
        <span class="mini-dot-row"><span></span><span></span><span></span></span>
      </div>
      ${layouts[estilo.layout]}
    </div>`;
}

function initVitrine() {
  const screen = $("#phone-screen");
  const dotsWrap = $("#phone-dots");
  const nameEl = $("#phone-style-name");
  const descEl = $("#phone-style-desc");
  if (!screen || !dotsWrap) return;

  let atual = 0;
  let timer = null;

  function renderDots() {
    dotsWrap.innerHTML = estilos
      .map((_, i) => `<button class="phone-dot${i === atual ? " is-active" : ""}" aria-label="Ver estilo ${i + 1}"></button>`)
      .join("");
    $$(".phone-dot", dotsWrap).forEach((dot, i) => dot.addEventListener("click", () => irPara(i, true)));
  }

  function irPara(index, manual) {
    atual = index;
    screen.innerHTML = miniScreenHTML(estilos[atual]);
    nameEl.textContent = estilos[atual].nome;
    descEl.textContent = estilos[atual].desc;
    renderDots();
    if (manual) reiniciarAuto();
  }

  function proximo() {
    irPara((atual + 1) % estilos.length, false);
  }

  function reiniciarAuto() {
    if (timer) clearInterval(timer);
    timer = setInterval(proximo, 4200);
  }

  irPara(0, false);
  reiniciarAuto();
}

/* --------------------------------------------------------------------------
   WhatsApp
   -------------------------------------------------------------------------- */
function initWhatsapp() {
  const generico = whatsappLink("Olá! Vi o site da NV Studio e queria saber mais sobre criar meu site.");
  $$(".js-whatsapp").forEach((a) => {
    a.href = generico;
    a.target = "_blank";
    a.rel = "noopener";
  });
}

/* --------------------------------------------------------------------------
   Página de detalhe do projeto (projeto.html)
   -------------------------------------------------------------------------- */
function renderDetalheProjeto() {
  const root = $("#projeto-detalhe");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const projeto = projetos.find((p) => p.slug === slug) || projetos[0];

  document.title = `${projeto.nome} · NV Studio`;
  $("#bc-nome").textContent = projeto.nome;
  $("#det-categoria").textContent = projeto.categoria;
  $("#det-nome").textContent = projeto.nome;
  $("#det-resumo").textContent = projeto.resumo;
  $("#det-descricao").textContent = projeto.descricao;
  $("#det-objetivo").textContent = projeto.objetivo;
  $("#det-desafio").textContent = projeto.desafio;
  $("#det-solucao").textContent = projeto.solucao;
  $("#det-tempo").textContent = projeto.tempo;

  $("#det-banner").innerHTML = siteEmbedHTML(projeto, "21/9");
  $("#det-galeria").innerHTML = [0, 1]
    .map(() => `<div class="reveal">${siteEmbedHTML(projeto)}</div>`)
    .join("");
  $("#det-notebook").innerHTML = siteEmbedHTML(projeto);
  $("#det-tablet").innerHTML = siteEmbedHTML(projeto);
  $("#det-mobile").innerHTML = siteEmbedHTML(projeto);
  initSiteEmbeds(root.closest("main") || document);

  const abrirSite = $("#det-abrir-site");
  if (abrirSite) { abrirSite.href = projeto.url; abrirSite.target = "_blank"; abrirSite.rel = "noopener"; }

  const msg = `Olá! Vi o projeto ${projeto.nome} no portfólio da NV Studio e queria conversar sobre um projeto parecido.`;
  const cta = $("#det-whatsapp");
  if (cta) { cta.href = whatsappLink(msg); cta.target = "_blank"; cta.rel = "noopener"; }

  const relacionados = projetos.filter((p) => p.slug !== projeto.slug);
  const relWrap = $("#relacionados-grid");
  if (relWrap) { relWrap.innerHTML = relacionados.length ? relacionados.map(projectCardHTML).join("") : placeholderCardHTML(); initSiteEmbeds(relWrap); }

  initReveal();
}

/* --------------------------------------------------------------------------
   Inicialização
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHeroParallax();
  initCounters();
  initFaq();
  initVitrine();
  renderPortfolio();
  renderDetalheProjeto();
  initWhatsapp();
  initReveal();

  const ano = $("#ano-atual");
  if (ano) ano.textContent = new Date().getFullYear();
});
