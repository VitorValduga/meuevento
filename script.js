// ----------------- Contador (index) -----------------
(function () {
    // elements (may be missing on integrantes.html; handle gracefully)
    const diasEl = document.getElementById("dias");
    const horasEl = document.getElementById("horas");
    const minutosEl = document.getElementById("minutos");
    const segundosEl = document.getElementById("segundos");
  
    function atualizarContagem() {
      if (!diasEl) return; // se não existir (páginas sem contador), retorna
      const agora = new Date();
      // data destino (LOCAL): 04 Jan 2026 00:00
      const destino = new Date(2026, 0, 4, 0, 0, 0);
  
      const diff = destino - agora;
  
      if (diff <= 0) {
        document.querySelector(".hero-title").textContent = "🎉 Chegou o dia! 🎉";
        document.querySelector(".contador").style.display = "none";
        clearInterval(intervaloContador);
        return;
      }
  
      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diff / (1000 * 60)) % 60);
      const segundos = Math.floor((diff / 1000) % 60);
  
      diasEl.textContent = dias;
      horasEl.textContent = String(horas).padStart(2, '0');
      minutosEl.textContent = String(minutos).padStart(2, '0');
      segundosEl.textContent = String(segundos).padStart(2, '0');
    }
  
    let intervaloContador;
    if (diasEl) {
      atualizarContagem();
      intervaloContador = setInterval(atualizarContagem, 1000);
    }
  })();
  
  // ----------------- Page transition (both pages) -----------------
  (function () {
    const overlay = document.querySelectorAll('#page-transition')[0]; // existe em ambas as páginas (primeiro)
    // fallback: se não encontrou, cria um (para segurança)
    let overlayEl = overlay;
    if (!overlayEl) {
      overlayEl = document.createElement('div');
      overlayEl.id = 'page-transition';
      overlayEl.className = 'page-transition';
      overlayEl.innerHTML = '<div class="spinner" aria-hidden="true"></div>';
      document.body.insertBefore(overlayEl, document.body.firstChild);
    }
  
    // on load -> fade out overlay
    window.addEventListener('DOMContentLoaded', () => {
      // exibir ano no rodapé se existir
      const anoEl = document.getElementById('ano');
      if (anoEl) anoEl.textContent = new Date().getFullYear();
  
      // mostrar transição inicial (overlay já visível no DOM),
      // depois fazer fade-out para revelar a página
      requestAnimationFrame(() => {
        overlayEl.classList.add('hidden');
        // mostrar elementos com .fade-in-on-load
        document.querySelectorAll('.fade-in-on-load').forEach(el => {
          el.classList.add('visible');
        });
      });
  
      // remover overlay do fluxo após a animação
      setTimeout(() => {
        overlayEl.style.display = 'none';
      }, 800);
    });
  
    // intercept clicks on internal links and animate before navigation
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;
      // don't intercept external or targets _blank or anchors
      const isExternal = href.startsWith('http') && !href.includes(location.hostname);
      const isAnchor = href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:');
      if (isExternal || isAnchor || a.target === '_blank' || a.hasAttribute('download')) return;
  
      // internal navigation -> animate
      e.preventDefault();
  
      // prepare overlay
      overlayEl.style.display = 'flex';
      // force reflow
      void overlayEl.offsetWidth;
      overlayEl.classList.remove('hidden');
      overlayEl.classList.add('show');
  
      // navigate after animation time
      setTimeout(() => {
        location.href = href;
      }, 600);
    });
  })();