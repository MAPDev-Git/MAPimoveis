(function () {
  function initCookieConsent() {
    // Verifica se o usuário já respondeu ao consentimento
    const consent = localStorage.getItem('lgpd_cookie_consent');
    if (consent) return; // Já consentiu ou recusou, não mostra nada

    // Cria o elemento do banner
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookieConsentBanner';
    banner.innerHTML = `
      <div class="cookie-banner__inner container">
        <div class="cookie-banner__text">
          <p>
            Nós utilizamos cookies e tecnologias semelhantes para melhorar a sua experiência, 
            otimizar o desempenho do site e analisar o tráfego, em conformidade com a LGPD. 
            Conheça as nossas 
            <a href="politica-de-privacidade.html">Políticas de Privacidade</a> e 
            <a href="termos-de-uso.html">Termos de Uso</a>.
          </p>
        </div>
        <div class="cookie-banner__actions">
          <button type="button" class="btn btn--ghost-white btn--sm" id="btnRejectCookies">Apenas essenciais</button>
          <button type="button" class="btn btn--primary btn--sm" id="btnAcceptCookies">Aceitar todos</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Animação de subida (slide-up) após um breve delay
    setTimeout(() => {
      banner.classList.add('show');
    }, 500);

    // Eventos dos botões
    const btnAccept = document.getElementById('btnAcceptCookies');
    const btnReject = document.getElementById('btnRejectCookies');

    function closeBanner(choice) {
      localStorage.setItem('lgpd_cookie_consent', choice);
      banner.classList.remove('show');
      banner.classList.add('hide');
      
      // Remove do DOM após a animação de saída terminar
      setTimeout(() => {
        banner.remove();
      }, 400);
    }

    btnAccept?.addEventListener('click', () => closeBanner('accepted'));
    btnReject?.addEventListener('click', () => closeBanner('declined'));
  }

  // Inicializa quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    initCookieConsent();
  }
})();
