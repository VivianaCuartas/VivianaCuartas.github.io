/* ================================================================
   INVITACIÓN DE BODA · ANIMACIÓN DEL SOBRE
   Stack: GSAP 3 (sin plugins premium, solo core)
   ================================================================ */

(function () {
  'use strict';

  // ---------- 1. Espera a que GSAP esté disponible ----------
  function onReady(cb) {
    if (document.readyState !== 'loading') {
      cb();
    } else {
      document.addEventListener('DOMContentLoaded', cb);
    }
  }

  // ==============================================================
  // 2. FRASES ROMÁNTICAS (declaradas antes de onReady para evitar TDZ)
  // ==============================================================
  const QUOTES = [
/*     'Hay momentos en la vida<br/>que merecen ser compartidos…',
    'Donde hay amor verdadero,<br/>todo empieza a florecer…',
    'Hoy el tiempo se detiene<br/>para celebrar el nuestro…',
    'Las historias más bonitas<br/>se escriben con el corazón…',
    'Un instante basta<br/>para cambiar una vida entera…', */
    'Nos escribimos una promesa<br/>y hoy la compartimos contigo…',
   /*  'Que la vida nos regale<br/>una historia digna de contar…' */
  ];

  onReady(function () {
    if (typeof gsap === 'undefined') {
      console.warn('[Invitación] GSAP no se cargó. Usando fallback.');
      initFallback();
      return;
    }
    initExperience();
  });

  // ==============================================================
  // 3. INICIALIZACIÓN PRINCIPAL
  // ==============================================================
  function initExperience() {
    const welcome  = document.getElementById('welcome');
    const envelope = document.getElementById('envelope');
    const flap     = document.getElementById('flap');
    const waxSeal  = document.getElementById('waxSeal');
    const letter   = document.getElementById('letter');
    const hint     = document.getElementById('cardHint');
    const quoteEl  = document.getElementById('welcomeQuote');

    if (quoteEl) {
      quoteEl.innerHTML = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.set(letter, {
      y: 0,
      scale: 0.92,
      opacity: 0,
      rotationZ: 0,
      transformOrigin: '50% 50%'
    });

    gsap.set(flap, {
      rotationX: 0,
      transformOrigin: 'top center',
      transformPerspective: 1400
    });

    gsap.set(letter, { zIndex: 2 });
    gsap.set(flap,   { zIndex: 4 });

    /*
     * SELLO: el CSS ya lo centra con margin negativo (no con transform),
     * así GSAP anima scale y opacity libremente sin desplazarlo.
     */
    gsap.set(waxSeal, { transformOrigin: '50% 50%' });

    // ------------------------------------------------------------
    // 4. ANIMACIÓN DE ENTRADA
    // ------------------------------------------------------------
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

    intro
      .from(envelope, {
        y: 14,
        opacity: 0,
        duration: 1,
        delay: 0.35,
      })
      .from(waxSeal, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
        // No se toca el translate: el centrado lo hace el CSS con margin
      }, '-=0.5');

    // ------------------------------------------------------------
    // 5. ABRIR EL SOBRE
    // ------------------------------------------------------------
    let isOpening = false;

    function openEnvelope() {
      if (isOpening) return;
      isOpening = true;

      envelope.classList.add('is-opened');

      if (hint) {
        gsap.to(hint, { opacity: 0, y: 6, duration: 0.4, ease: 'power2.out' });
      }

      const speed = prefersReduced ? 0.4 : 1;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: handleEnvelopeOpened
      });

      tl
        .to(waxSeal, {
          scale: 0.88,
          duration: 0.18 * speed,
          ease: 'power2.inOut'
        })
        .to(waxSeal, {
          scale: 0.4,
          rotation: -18,
          y: -14,
          opacity: 0,
          duration: 0.55 * speed,
          ease: 'power3.in'
        })
        .to(flap, {
          rotationX: -178,
          duration: 1.05 * speed,
          ease: 'power4.out'
        }, '-=0.15')
        .to(flap, {
          rotationX: -172,
          duration: 0.35 * speed,
          ease: 'sine.inOut'
        })
        .to(flap, {
          rotationX: -176,
          duration: 0.3 * speed,
          ease: 'sine.inOut'
        })
        
        .set(flap,   { zIndex: 2 })
        .set(letter, { zIndex: 3 })
        .to(letter, {
          opacity: 1,
          scale: 1,
          y: '-28%',
          duration: 1.1 * speed,
          ease: 'expo.out'
        }, '-=0.5')
        .to(letter, {
          rotationZ: 0.6,
          duration: 0.8 * speed,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 1
        }, '-=0.3');
    }

    // ------------------------------------------------------------
    // 6. POST-ANIMACIÓN
    // ------------------------------------------------------------
    function handleEnvelopeOpened() {
      gsap.to(welcome, {
        opacity: 0,
        filter: 'blur(4px)',
        duration: 0.9,
        delay: 1.4,
        ease: 'power2.inOut',
        onStart: () => welcome.classList.add('is-leaving'),
        onComplete: () => {
          // ⬇️ EDITA ESTA LÍNEA SEGÚN TU INTEGRACIÓN ⬇️
          window.location.href = 'invitacion.html';
        }
      });
    }

    // ------------------------------------------------------------
    // 7. LISTENERS
    // ------------------------------------------------------------
    waxSeal.addEventListener('click', openEnvelope);

    envelope.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });

    if (!prefersReduced) {
      envelope.addEventListener('mouseenter', () => {
        gsap.to(envelope, { y: -3, duration: 0.6, ease: 'power2.out' });
      });
      envelope.addEventListener('mouseleave', () => {
        gsap.to(envelope, { y: 0, duration: 0.6, ease: 'power2.out' });
      });
    }
  }

  // ==============================================================
  // 8. FALLBACK CSS
  // ==============================================================
  function initFallback() {
    const waxSeal = document.getElementById('waxSeal');
    const flap    = document.getElementById('flap');
    const letter  = document.getElementById('letter');
    const welcome = document.getElementById('welcome');

    if (!waxSeal) return;

    waxSeal.addEventListener('click', () => {
      waxSeal.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
      waxSeal.style.transform  = 'scale(0.3)';
      waxSeal.style.opacity    = '0';

      setTimeout(() => {
        flap.style.transition      = 'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)';
        flap.style.transform       = 'rotateX(-176deg)';
        flap.style.transformOrigin = 'top center';
      }, 250);

      setTimeout(() => {
        letter.style.transition = 'opacity 0.8s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)';
        letter.style.opacity    = '1';
        letter.style.transform  = 'translate(-50%, -78%) scale(1)';
        letter.style.zIndex     = '3';
        flap.style.zIndex       = '2';
      }, 900);

      setTimeout(() => {
        welcome.style.transition = 'opacity 0.9s ease';
        welcome.style.opacity    = '0';
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 900);
      }, 2800);
    });
  }

})();