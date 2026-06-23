/* =====================================================
   MAP Real Estate — Interactions
   ===================================================== */

const IMOVEIS = window.IMOVEIS || [];
const SITE = window.SITE || {};

/* -------- 1. NAV scroll -------- */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 40
      ? 'rgba(250, 249, 245, 0.95)'
      : 'rgba(250, 249, 245, 0.85)';
  });
}

/* -------- 2. BURGER mobile -------- */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');
burger?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  if (isOpen) {
    Object.assign(navLinks.style, {
      display: 'flex',
      position: 'absolute',
      top: '100%',
      right: '24px',
      flexDirection: 'column',
      alignItems: 'flex-start',
      background: 'rgba(250, 249, 245, 0.98)',
      backdropFilter: 'blur(20px)',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid rgba(20, 20, 19, 0.10)',
      boxShadow: '0 16px 40px rgba(20, 20, 19, 0.14)',
      gap: '16px'
    });
  } else {
    navLinks.removeAttribute('style');
  }
});

/* -------- 3. HERO SLIDER — imagens da pasta Carrossel -------- */
const HERO_SLIDES = [
  {
    imagem: 'Carrossel/Alto Padrão 2 Quartos - Centro SM - 895.000.jpeg',
    rotulo: 'Alto Padrão 2 Quartos - Centro SM - 895.000',
    slug: 'residencial-montline-605-centro-santa-maria'
  },
  {
    imagem: 'Carrossel/4 Quartos (3 Supites) - Xangri-Lá - 890.000.jpg',
    rotulo: '4 Quartos (3 Suítes) - Xangri-Lá - 890.000',
    slug: 'casa-na-praia-centro-xangri-la',
    vendido: true
  },
  {
    imagem: 'Carrossel/3 Quartos - Xangri-Lá 770.000.jpg',
    rotulo: '3 Quartos - Xangri-Lá 770.000',
    slug: 'casa-na-praia-noiva-do-mar-xangri-la'
  },
  {
    imagem: 'Carrossel/3 Quartos - Camobi SM - 440.000.jpeg',
    rotulo: '3 Quartos - Camobi SM - 440.000',
    slug: 'residencial-catharina-201-camobi-santa-maria'
  },
  {
    imagem: 'Carrossel/2 Quartos - Centro SM - 430.000.jpeg',
    rotulo: '2 Quartos - Centro SM - 430.000',
    slug: 'residencial-montline-605-centro-santa-maria'
  },
  {
    imagem: 'Carrossel/2 Quartos - Camobi SM - 340.000.jpeg',
    rotulo: '2 Quartos - Camobi SM - 340.000',
    slug: 'residencial-di-siena-camobi-santa-maria'
  }
];

function initHeroSlider() {
  const slider = document.getElementById('heroSlider');
  const caption = document.getElementById('heroCaption');
  const dotsEl = document.getElementById('heroDots');
  if (!slider || !HERO_SLIDES.length) return;

  // Cria slides
  slider.innerHTML = HERO_SLIDES.map((slide, i) => `
    <a href="imovel.html?slug=${encodeURIComponent(slide.slug)}"
       class="hero__slide ${i === 0 ? 'is-active' : ''} ${slide.vendido ? 'hero__slide--vendido' : ''}"
       style="background-image:url('${slide.imagem}')"
       data-index="${i}"
       aria-label="${slide.rotulo}">
      <span class="hero__slide-tag ${slide.vendido ? 'hero__slide-tag--vendido' : ''}">${slide.vendido ? 'VENDIDO' : 'Destaque'}</span>
    </a>
  `).join('');

  // Cria dots
  dotsEl.innerHTML = HERO_SLIDES.map((_, i) =>
    `<button class="hero__dot ${i === 0 ? 'is-active' : ''}" data-index="${i}" aria-label="Imóvel ${i+1}"></button>`
  ).join('');

  let current = 0;
  const slides = slider.querySelectorAll('.hero__slide');
  const dots = dotsEl.querySelectorAll('.hero__dot');

  function updateCaption(i) {
    const slide = HERO_SLIDES[i];
    const spanEl = caption.querySelector('span');
    if (spanEl) {
      spanEl.textContent = slide.rotulo;
    }
  }
  updateCaption(0);

  function show(i) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = i;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    updateCaption(current);
  }

  // Auto-play
  let timer = setInterval(() => show((current + 1) % slides.length), 4500);

  // Dots controlam manualmente + pausam autoplay temporariamente
  dots.forEach(d => d.addEventListener('click', () => {
    clearInterval(timer);
    show(parseInt(d.dataset.index, 10));
    timer = setInterval(() => show((current + 1) % slides.length), 4500);
  }));
}

/* -------- 4. CARDS de imóveis -------- */
function renderCards() {
  const container = document.getElementById('cardsContainer');
  if (!container || !IMOVEIS.length) return;

  container.innerHTML = IMOVEIS.map(im => `
    <article class="card reveal" data-cat="${im.cat}">
      <a href="imovel.html?slug=${encodeURIComponent(im.slug)}" class="card__link">
        <div class="card__media" style="background-image:url('${im.fotos[0]}')" role="img" aria-label="Foto de ${im.nome}">
          <span class="card__tag ${im.tag === 'Lançamento' ? 'card__tag--bordo' : (im.tag === 'VENDIDO' || im.vendido) ? 'card__tag--vendido' : ''}">${im.tag}</span>
        </div>
        <div class="card__body">
          <h3>${im.nome}</h3>
          <p class="card__loc">${im.local}</p>
          <ul class="card__specs">
            <li>${im.suites}</li><li>${im.area}</li><li>${im.vagas}</li>
          </ul>
          <div class="card__foot">
            <span class="card__price">${im.preco}${im.precoSub ? `<small>${im.precoSub}</small>` : ''}</span>
            <span class="link-arrow">Ver detalhes →</span>
          </div>
        </div>
      </a>
    </article>
  `).join('');

  // Re-aplica observer de reveal
  document.querySelectorAll('.card.reveal').forEach(el => revealObserver.observe(el));
}

/* -------- 5. REVEAL ON SCROLL -------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function initReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* -------- 6. FILTROS -------- */
function initFilters() {
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      document.querySelectorAll('.card[data-cat]').forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
}

/* -------- 7. FORMULÁRIO — envia e-mail via mailto -------- */
function enviarFormulario(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  const destino = (window.SITE && window.SITE.emailFormDestino) || 'marcoantoniopratbroker@gmail.com';

  const assunto = `Contato pelo site · ${data.nome || 'Sem nome'}`;
  const corpo = [
    `Nome: ${data.nome || ''}`,
    `Telefone / WhatsApp: ${data.telefone || ''}`,
    `E-mail: ${data.email || ''}`,
    `Interesse: ${data.interesse || ''}`,
    '',
    'Mensagem:',
    data.mensagem || '',
    '',
    '—',
    'Enviado pelo site MAP Real Estate'
  ].join('\n');

  const mailto = `mailto:${destino}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;

  // Abre o cliente de e-mail do usuário com tudo preenchido
  window.location.href = mailto;

  // Feedback visual
  const btn = form.querySelector('button[type=submit]');
  const original = btn.textContent;
  btn.textContent = 'Abrindo seu e-mail…';
  btn.style.background = '#9B0E0E';
  btn.style.borderColor = '#9B0E0E';

  setTimeout(() => {
    btn.textContent = 'Mensagem pronta ✓';
    setTimeout(() => {
      form.reset();
      btn.textContent = original;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 2500);
  }, 600);
}
window.enviarFormulario = enviarFormulario;

/* -------- 8. ANO + SMOOTH SCROLL -------- */
function initAno() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

/* -------- INIT -------- */
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  initHeroSlider();
  initFilters();
  initReveal();
  initAno();
  initSmoothScroll();
});
