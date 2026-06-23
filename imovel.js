const IMOVEIS = window.IMOVEIS || [];
const SITE = window.SITE || {};

const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');
const imovel = IMOVEIS.find((item) => item.slug === slug) || IMOVEIS[0];

const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 40
      ? 'rgba(250, 249, 245, 0.95)'
      : 'rgba(250, 249, 245, 0.85)';
  });
}

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

function renderDetail() {
  const content = document.getElementById('detailContent');
  if (!content || !imovel) return;

  document.title = `${imovel.nome} · MAP Real Estate`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', imovel.descricao);

  const baseUrl = 'https://marcoantonioprat.utilafull.com';
  const itemUrl = `${baseUrl}/imovel.html?slug=${encodeURIComponent(imovel.slug)}`;
  const itemImage = `${baseUrl}/${imovel.fotos[0]}`;

  // Atualizar Link Canônico
  const canonical = document.getElementById('canonical-link');
  if (canonical) canonical.setAttribute('href', itemUrl);

  // Atualizar Metadados Open Graph
  const ogUrl = document.getElementById('meta-og-url');
  if (ogUrl) ogUrl.setAttribute('content', itemUrl);
  
  const ogTitle = document.getElementById('meta-og-title');
  if (ogTitle) ogTitle.setAttribute('content', `${imovel.nome} · MAP Real Estate`);
  
  const ogDesc = document.getElementById('meta-og-description');
  if (ogDesc) ogDesc.setAttribute('content', imovel.descricao);
  
  const ogImage = document.getElementById('meta-og-image');
  if (ogImage) ogImage.setAttribute('content', itemImage);

  // Atualizar Metadados Twitter
  const twitterUrl = document.getElementById('meta-twitter-url');
  if (twitterUrl) twitterUrl.setAttribute('content', itemUrl);
  
  const twitterTitle = document.getElementById('meta-twitter-title');
  if (twitterTitle) twitterTitle.setAttribute('content', `${imovel.nome} · MAP Real Estate`);
  
  const twitterDesc = document.getElementById('meta-twitter-description');
  if (twitterDesc) twitterDesc.setAttribute('content', imovel.descricao);
  
  const twitterImage = document.getElementById('meta-twitter-image');
  if (twitterImage) twitterImage.setAttribute('content', itemImage);

  // Gerar e Injetar Dados Estruturados (JSON-LD)
  const jsonLdEl = document.getElementById('json-ld-imovel');
  if (jsonLdEl) {
    const numericPrice = parseInt(imovel.preco.replace(/\D/g, ''), 10) || null;
    const numericArea = parseInt(imovel.area.replace(/\D/g, ''), 10) || null;
    
    // Parsear quartos e suítes
    const bedroomsMatch = imovel.suites.match(/(\d+)\s*(?:dormitório|quarto)/i);
    const bedrooms = bedroomsMatch ? parseInt(bedroomsMatch[1], 10) : null;
    
    const suitesMatch = imovel.suites.match(/(\d+)\s*suíte/i);
    const suites = suitesMatch ? parseInt(suitesMatch[1], 10) : null;
    
    const schemaType = imovel.tipo.toLowerCase().includes('apartamento') ? 'Apartment' : 'SingleFamilyResidence';
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "@id": `${itemUrl}#listing`,
      "url": itemUrl,
      "name": `${imovel.nome} · MAP Real Estate`,
      "description": imovel.descricao,
      "datePosted": new Date().toISOString().split('T')[0],
      "offers": {
        "@type": "Offer",
        "price": numericPrice,
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock"
      },
      "about": {
        "@type": schemaType,
        "name": imovel.nome,
        "description": imovel.descricao,
        "image": itemImage,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": imovel.local.includes('·') ? imovel.local.split('·')[1].trim() : imovel.local,
          "addressRegion": "RS",
          "addressCountry": "BR"
        },
        "numberOfRooms": bedrooms,
        "numberOfBedrooms": bedrooms,
        "floorSize": numericArea ? {
          "@type": "QuantitativeValue",
          "value": numericArea,
          "unitCode": "MTK"
        } : undefined
      }
    };
    
    jsonLdEl.textContent = JSON.stringify(structuredData, null, 2);
  }

  const isSantaMaria = imovel.cat === 'santa-maria';
  const whatsappNumber = isSantaMaria ? '5555996397125' : '5551989042833';
  const whatsappText = encodeURIComponent(`Olá, Marco. Tenho interesse no imóvel: ${imovel.nome}.`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  // Atualizar link de WhatsApp do cabeçalho e do botão flutuante para corresponder à região
  const navWaBtn = document.querySelector('.btn--nav');
  if (navWaBtn) {
    navWaBtn.href = `https://wa.me/${whatsappNumber}`;
  }
  const floatWaBtn = document.querySelector('.wa-float');
  if (floatWaBtn) {
    floatWaBtn.href = `https://wa.me/${whatsappNumber}`;
  }

  content.innerHTML = `
    <header class="detail__head">
      <div>
        <h1 class="detail__title">${imovel.nome}</h1>
        <p class="detail__loc">${imovel.local}</p>
      </div>
      <div class="detail__price-box">
        <span class="detail__tag ${imovel.tag === 'VENDIDO' || imovel.vendido ? 'detail__tag--vendido' : ''}">${imovel.tag}</span>
        <div class="detail__price">${imovel.preco}${imovel.precoSub ? `<small>${imovel.precoSub}</small>` : ''}</div>
      </div>
    </header>

    <div class="gallery" aria-label="Galeria de fotos do imóvel">
      ${imovel.fotos.slice(0, 3).map((foto, index) => `
        <div
          class="gallery__item ${index === 0 ? 'gallery__main' : ''}"
          id="${index === 0 ? 'mainGalleryPhoto' : ''}"
          style="background-image:url('${foto}')"
          role="img"
          aria-label="Foto ${index + 1} de ${imovel.nome}">
        </div>
      `).join('')}
    </div>

    ${imovel.fotos.length > 0 ? `
      <div class="thumbnail-strip">
        ${imovel.fotos.map((foto, index) => `
          <button
            type="button"
            class="thumbnail-item ${index === 0 ? 'active' : ''}"
            style="background-image:url('${foto}')"
            data-index="${index}"
            aria-label="Ver foto ${index + 1} de ${imovel.nome}">
          </button>
        `).join('')}
      </div>
    ` : ''}

    <div class="detail__body">
      <article class="detail__info">
        <h2>Sobre o imóvel</h2>
        <p>${imovel.descricao}</p>

        <div class="specs-grid">
          <div><strong>Tipo</strong><span>${imovel.tipo}</span></div>
          <div><strong>Área</strong><span>${imovel.area}</span></div>
          <div><strong>Vagas</strong><span>${imovel.vagas}</span></div>
        </div>

        <h2>Destaques</h2>
        <ul class="highlights">
          ${imovel.destaques.map((destaque) => `<li>${destaque}</li>`).join('')}
        </ul>
      </article>

      <aside class="detail__sidebar">
        <div class="corretor">
          <img src="assets/marco.png" alt="Marco Antonio Prat" />
          <div>
            <strong>${SITE.nomeCompleto || 'Marco Antonio Prat'}</strong>
            <span>${SITE.creci || 'CRECI/RS 76519'}</span>
          </div>
        </div>
        <h3>Gostou deste imóvel?</h3>
        <p>Consulte a disponibilidade e agende uma visita comigo imediatamente abaixo.</p>
        <a href="${whatsappLink}" target="_blank" rel="noopener" class="btn btn--primary">Chamar no WhatsApp</a>
        <a href="mailto:${SITE.email || 'marcoantonioprat@creci.org.br'}?subject=${encodeURIComponent(`Interesse em ${imovel.nome}`)}" class="btn btn--secondary">Enviar e-mail</a>
      </aside>
    </div>

    ${imovel.mapQuery ? `
    <section class="detail__map" aria-label="Localização do imóvel">
      <h2>Localização</h2>
      <a
        href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(imovel.mapQuery)}"
        target="_blank"
        rel="noopener"
        class="detail__map-link"
        aria-label="Abrir localização no Google Maps">
        <div class="detail__map-frame">
          <iframe
            src="https://maps.google.com/maps?q=${encodeURIComponent(imovel.mapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style="border:0; pointer-events:none;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Mapa da localização de ${imovel.nome}">
          </iframe>
          <div class="detail__map-overlay">
            <span class="detail__map-cta">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
              Abrir no Google Maps
            </span>
          </div>
        </div>
      </a>
    </section>
    ` : ''}

    <!-- Caixa de Perguntas de IA -->
    <section class="detail__ai-qa" aria-label="Dúvidas sobre o imóvel com Inteligência Artificial">
      <div class="ai-box">
        <div class="ai-box__header">
          <svg viewBox="0 0 24 24" width="20" height="20" class="ai-box__icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275z"/>
          </svg>
          <h3>Dúvidas sobre o imóvel? Pergunte aqui.</h3>
        </div>
        <p class="ai-box__desc">Nossa Inteligência Artificial analisa a ficha técnica deste imóvel para responder suas dúvidas instantaneamente.</p>
        
        <form class="ai-box__form" id="aiForm">
          <div class="ai-box__input-wrapper">
            <input 
              type="text" 
              id="aiQuestion" 
              placeholder="Ex: Aceita financiamento? Quantos dormitórios possui?" 
              required 
              maxlength="150"
            />
            <button type="submit" class="btn btn--primary" id="aiSubmitBtn">Perguntar</button>
          </div>
        </form>

        <div class="ai-box__result" id="aiResult" style="display: none;">
          <div class="ai-box__loading" id="aiLoading" style="display: none;">
            <span class="ai-box__spinner"></span>
            <span>Consultando assistente MAP IA...</span>
          </div>
          <div class="ai-box__answer-wrapper" id="aiAnswerWrapper" style="display: none;">
            <div class="ai-box__avatar">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a1 1 0 1 1-1-1 1 1 0 0 1 1 1zm1-5.5a1.5 1.5 0 1 0-3 0 1 1 0 0 1-2 0 3.5 3.5 0 1 1 7 0c0 1.34-.84 2.2-1.6 2.87-.5.45-.9.84-.9 1.63a1 1 0 0 1-2 0c0-1.88 1-2.78 1.9-3.58.55-.49.95-.87.95-1.42z"/>
              </svg>
              <span>Assistente MAP IA</span>
            </div>
            <p class="ai-box__answer" id="aiAnswerText"></p>
          </div>
        </div>
      </div>
    </section>
  `;

  // Vincular evento de envio de perguntas para a IA
  const aiForm = content.querySelector('#aiForm');
  const aiInput = content.querySelector('#aiQuestion');
  const aiResult = content.querySelector('#aiResult');
  const aiLoading = content.querySelector('#aiLoading');
  const aiAnswerWrapper = content.querySelector('#aiAnswerWrapper');
  const aiAnswerText = content.querySelector('#aiAnswerText');
  const aiSubmitBtn = content.querySelector('#aiSubmitBtn');

  if (aiForm) {
    aiForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const question = aiInput.value.trim();
      if (!question) return;

      // Desabilitar botão e mostrar loading
      aiSubmitBtn.disabled = true;
      aiSubmitBtn.textContent = 'Enviando...';
      aiResult.style.display = 'block';
      aiLoading.style.display = 'flex';
      aiAnswerWrapper.style.display = 'none';

      // Carregar arquivo de informações detalhadas (info.md) da pasta do imóvel
      let infoText = "";
      try {
        const firstPhoto = imovel.fotos[0];
        if (firstPhoto) {
          const folderPath = firstPhoto.substring(0, firstPhoto.lastIndexOf('/'));
          const infoMdUrl = `${folderPath}/info.md`;
          const infoRes = await fetch(infoMdUrl);
          if (infoRes.ok) {
            infoText = await infoRes.text();
          }
        }
      } catch (e) {
        console.warn("Não foi possível carregar info.md, usando ficha básica:", e);
      }

      try {
        const response = await fetch('https://xrsjpgjqhsingniyxtua.supabase.co/functions/v1/ask-property-ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            property: {
              nome: imovel.nome,
              tipo: imovel.tipo,
              local: imovel.local,
              preco: imovel.preco,
              precoSub: imovel.precoSub,
              area: imovel.area,
              suites: imovel.suites,
              vagas: imovel.vagas,
              descricao: imovel.descricao,
              destaques: imovel.destaques
            },
            question: question,
            infoText: infoText
          })
        });

        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }

        const data = await response.json();
        
        if (data.answer) {
          // Remover formatação markdown de negrito (asteriscos duplos) do texto de resposta
          aiAnswerText.textContent = data.answer.replace(/\*\*/g, '');
        } else {
          console.error("AI Error:", data.error || "No answer returned");
          aiAnswerText.textContent = "Estamos com uma demanda grande de requisições no servidor, por favor tente novamente ou chame o corretor no WhatsApp.";
        }
      } catch (err) {
        console.error("Fetch error:", err);
        aiAnswerText.textContent = "Estamos com uma demanda grande de requisições no servidor, por favor tente novamente ou chame o corretor no WhatsApp.";
      } finally {
        aiLoading.style.display = 'none';
        aiAnswerWrapper.style.display = 'block';
        aiSubmitBtn.disabled = false;
        aiSubmitBtn.textContent = 'Perguntar';
      }
    });
  }

  // Vincular eventos nas miniaturas
  const thumbnails = content.querySelectorAll('.thumbnail-item');
  const mainPhoto = content.querySelector('#mainGalleryPhoto');
  if (mainPhoto && thumbnails.length) {
    thumbnails.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        thumbnails.forEach((t) => t.classList.remove('active'));
        thumb.classList.add('active');
        const idx = parseInt(thumb.dataset.index, 10);
        const fotoUrl = imovel.fotos[idx];
        mainPhoto.style.backgroundImage = `url('${fotoUrl}')`;
      });
    });
  }

  // ===================== LIGHTBOX =====================
  initLightbox(imovel.fotos, content);
}

/* -------------------------------------------------------
   Lightbox — galeria popup com navegação por setas
   ------------------------------------------------------- */
function initLightbox(fotos, container) {
  if (!fotos || fotos.length === 0) return;

  let currentIndex = 0;

  // Criar o elemento da lightbox uma vez
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Galeria de fotos');
  overlay.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Fechar galeria">&times;</button>
      <button class="lightbox-arrow lightbox-arrow--prev" aria-label="Foto anterior">&#8249;</button>
      <img class="lightbox-image" src="" alt="" />
      <button class="lightbox-arrow lightbox-arrow--next" aria-label="Próxima foto">&#8250;</button>
      <div class="lightbox-counter"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('.lightbox-image');
  const counterEl = overlay.querySelector('.lightbox-counter');
  const btnClose = overlay.querySelector('.lightbox-close');
  const btnPrev = overlay.querySelector('.lightbox-arrow--prev');
  const btnNext = overlay.querySelector('.lightbox-arrow--next');

  function showPhoto(index) {
    currentIndex = ((index % fotos.length) + fotos.length) % fotos.length;
    imgEl.src = fotos[currentIndex];
    imgEl.alt = `Foto ${currentIndex + 1} de ${fotos.length}`;
    counterEl.textContent = `${currentIndex + 1} / ${fotos.length}`;

    // Mostrar/esconder setas se houver apenas 1 foto
    const hide = fotos.length <= 1;
    btnPrev.style.display = hide ? 'none' : '';
    btnNext.style.display = hide ? 'none' : '';
  }

  function openLightbox(index) {
    showPhoto(index);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Fechar ao clicar no fundo (overlay), mas não no conteúdo
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });
  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', (e) => { e.stopPropagation(); showPhoto(currentIndex - 1); });
  btnNext.addEventListener('click', (e) => { e.stopPropagation(); showPhoto(currentIndex + 1); });

  // Prevenir que cliques na imagem ou conteúdo fechem a lightbox
  overlay.querySelector('.lightbox-content').addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Navegação por teclado
  function handleKeydown(e) {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
    if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
  }
  document.addEventListener('keydown', handleKeydown);

  // Suporte a swipe em mobile
  let touchStartX = 0;
  let touchEndX = 0;
  overlay.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  overlay.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) showPhoto(currentIndex + 1);   // swipe left → next
      else showPhoto(currentIndex - 1);              // swipe right → prev
    }
  }, { passive: true });

  // Vincular clique nas fotos da galeria principal (grid 3 fotos)
  const galleryItems = container.querySelectorAll('.gallery__item');
  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  // Vincular clique nas miniaturas (thumbnail strip)
  const thumbs = container.querySelectorAll('.thumbnail-item');
  thumbs.forEach((thumb) => {
    thumb.addEventListener('dblclick', () => {
      const idx = parseInt(thumb.dataset.index, 10);
      openLightbox(idx);
    });
  });
}

function renderRelated() {
  const container = document.getElementById('relatedCards');
  if (!container) return;

  const currentCat = imovel.cat;
  const related = IMOVEIS
    .filter((item) => item.slug !== imovel.slug)
    .sort((a, b) => {
      if (a.cat === currentCat && b.cat !== currentCat) return -1;
      if (b.cat === currentCat && a.cat !== currentCat) return 1;
      return 0;
    })
    .slice(0, 3);

  container.innerHTML = related.map((item) => `
    <article class="card" data-cat="${item.cat}">
      <a href="imovel.html?slug=${encodeURIComponent(item.slug)}" class="card__link">
        <div class="card__media" style="background-image:url('${item.fotos[0]}')" role="img" aria-label="Foto de ${item.nome}">
          <span class="card__tag ${item.tag === 'Lançamento' ? 'card__tag--bordo' : (item.tag === 'VENDIDO' || item.vendido) ? 'card__tag--vendido' : ''}">${item.tag}</span>
        </div>
        <div class="card__body">
          <h3>${item.nome}</h3>
          <p class="card__loc">${item.local}</p>
          <ul class="card__specs">
            <li>${item.suites}</li><li>${item.area}</li><li>${item.vagas}</li>
          </ul>
          <div class="card__foot">
            <span class="card__price">${item.preco}${item.precoSub ? `<small>${item.precoSub}</small>` : ''}</span>
            <span class="link-arrow">Ver detalhes →</span>
          </div>
        </div>
      </a>
    </article>
  `).join('');
}

function initYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  renderDetail();
  renderRelated();
  initYear();
});
