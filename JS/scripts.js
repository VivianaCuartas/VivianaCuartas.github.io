/* ============================================================
   scripts.js — Lógica principal de la página de boda
   Viviana & David — 26.07.2026
   ============================================================ */

/* ----------------------------------------------------------
   1. UTILIDADES GLOBALES
   ---------------------------------------------------------- */

function is_url(str) {
  var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return regexp.test(str);
}

function support_format_webp() {
  var elem = document.createElement('canvas');
  if (!!(elem.getContext && elem.getContext('2d'))) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  }
  return false;
}

/* ----------------------------------------------------------
   2. TIPO DE DISPOSITIVO
   ---------------------------------------------------------- */

var device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  ? 'mobile'
  : 'desktop';


/* ----------------------------------------------------------
   3. CANCIÓN — REPRODUCCIÓN / PAUSA
   ---------------------------------------------------------- */

function toggleCancion(e) {
  e.preventDefault();

  var audio = document.getElementById('audio-cancion');
  var btn   = document.getElementById('btn-cancion');

  if (audio.paused) {
    audio.play();
    btn.textContent = '⏸ Pausar canción';
  } else {
    audio.pause();
    btn.textContent = '▶ Escuchar canción';
  }
}


/* ----------------------------------------------------------
   4. CUENTA REGRESIVA
   ---------------------------------------------------------- */

(function initCountdown() {
  var countDownDate = new Date(fechaCuentaRegresiva).getTime();

  var x = setInterval(function () {
    var distance = countDownDate - new Date().getTime();

    $('#dias    .number').text(Math.floor(distance / 86400000));
    $('#horas   .number').text(Math.floor((distance % 86400000) / 3600000));
    $('#minutos .number').text(Math.floor((distance % 3600000)  / 60000));
    $('#segundos .number').text(Math.floor((distance % 60000)    / 1000));

    if (distance < 0) {
      clearInterval(x);
      document.getElementById('reloj').innerHTML =
        '<p class="fin-cuenta">' + lang_textoFinalCuentaRegresiva + '</p>';
      $('.falta').text('');
    }
  }, 1000);
})();


/* ----------------------------------------------------------
   5. ANIMACIONES LOTTIE
   ---------------------------------------------------------- */

(function initLottie() {

  /* Música de fondo (controlador flotante) */
  var animMusicIcon = bodymovin.loadAnimation({
    wrapper:  document.querySelector('.music-anim-icon'),
    animType: 'svg',
    autoplay: false,
    loop:     true,
    path:     _pathProducto + 'img/music-player-icon.json'
  });

  $(document).on('click', '#play-pause-music', function (e) {
    e.preventDefault();
    var audio      = document.getElementById('audio-cancion');
    var estado     = $(this).attr('data-estado-music');

    if (estado === 'pause') {
      $(this).attr('data-estado-music', 'play');
      animMusicIcon.play();
      audio.play();
    } else {
      $(this).attr('data-estado-music', 'pause');
      audio.pause();
      animMusicIcon.stop();
    }
  });

  /* Flores portada */
  var animFlores1 = bodymovin.loadAnimation({ wrapper: document.querySelector('.portada-flor-izq-sup'),       animType: 'svg', autoplay: true,  loop: false, path: _pathProducto + 'img/json_hojas01.json' });
  var animFlores2 = bodymovin.loadAnimation({ wrapper: document.querySelector('.portada-flor-der-inf'),       animType: 'svg', autoplay: true,  loop: false, path: _pathProducto + 'img/json_hojas02.json' });
  var animFlores3 = bodymovin.loadAnimation({ wrapper: document.querySelector('.portada-flor-izq-inf'),       animType: 'svg', autoplay: true,  loop: false, path: _pathProducto + 'img/json_hojas03.json' });
  var animFlores4 = bodymovin.loadAnimation({ wrapper: document.querySelector('.ceremonia-fiesta-flor-der'), animType: 'svg', autoplay: false, loop: false, path: _pathProducto + 'img/json_hojas04.json' });
  var animFlores5 = bodymovin.loadAnimation({ wrapper: document.querySelector('.regalos-flor-der'),           animType: 'svg', autoplay: false, loop: false, path: _pathProducto + 'img/json_hojas04.json' });

  /* Waypoints — flores */
  new Waypoint({ element: document.querySelector('.cuenta-regresiva'), handler: function () { animFlores1.stop(); animFlores1.play(); } });
  new Waypoint({ element: document.querySelector('.cuenta-regresiva'), handler: function () { animFlores2.stop(); animFlores2.play(); } });
  new Waypoint({ element: document.querySelector('.falta'),            handler: function () { animFlores3.stop(); animFlores3.play(); } });
  new Waypoint({ element: document.querySelector('.falta'),            handler: function () { animFlores4.stop(); animFlores4.play(); } });
  new Waypoint({ element: document.querySelector('.regalos'),          handler: function () { animFlores5.stop(); animFlores5.play(); } });

  /* Flecha scroll */
  var animFlechaScroll = bodymovin.loadAnimation({ wrapper: document.querySelector('.flecha-continuar'), animType: 'svg', loop: true, path: _pathProducto + 'img/down-scroll.json' });
  animFlechaScroll.setSpeed(0.6);

  /* Íconos de sección */
  bodymovin.loadAnimation({ wrapper: document.querySelector('.corazon-falta'),  animType: 'svg', loop: true, path: _pathProducto + 'img/corazon-falta.json' });

  var animAnillos  = bodymovin.loadAnimation({ wrapper: document.querySelector('.anim-anillos'),   animType: 'svg', loop: true, path: _pathProducto + 'img/img_ceremonia.json' });
  var animVestuario= bodymovin.loadAnimation({ wrapper: document.querySelector('.anim-vestuario'), animType: 'svg', loop: true, path: _pathProducto + 'img/vestuario.json' });
  var animGaleria  = bodymovin.loadAnimation({ wrapper: document.querySelector('.anim-galeria'),   animType: 'svg', loop: true, path: _pathProducto + 'img/json_camara.json' });
  var animMusica   = bodymovin.loadAnimation({ wrapper: document.querySelector('.anim-musica'),    animType: 'svg', loop: true, path: _pathProducto + 'img/img_musica.json' });
  var animRegalos  = bodymovin.loadAnimation({ wrapper: document.querySelector('.anim-regalos'),   animType: 'svg', loop: true, path: _pathProducto + 'img/img_regalo.json' });
  var animInstagram= bodymovin.loadAnimation({ wrapper: document.querySelector('.anim-instagram'), animType: 'svg', loop: true, path: _pathProducto + 'img/img_instagram.json' });

  animAnillos.play();
  animVestuario.play();
  animGaleria.play();
  animMusica.play();
  animRegalos.play();
  animInstagram.play();

})();


/* ----------------------------------------------------------
   6. CARRUSEL DE GALERÍA
   ---------------------------------------------------------- */

(function initCarrusel() {
  $('.carrusel').slick({
    lazyLoad:      'ondemand',
    autoplay:       true,
    autoplaySpeed:  2000,
    centerMode:     true,
    dots:           true,
    centerPadding: '20px',
    slidesToShow:   3,
    prevArrow:      false,
    nextArrow:      false,
    responsive: [
      { breakpoint: 768, settings: { arrows: false, centerMode: true, centerPadding: '40px', slidesToShow: 3 } },
      { breakpoint: 480, settings: { arrows: false, centerMode: true, centerPadding: '40px', slidesToShow: 1 } }
    ]
  });
})();


/* ----------------------------------------------------------
   7. MODAL — CONFIRMAR ASISTENCIA
   ---------------------------------------------------------- */

$('body').on('click', 'a.confirmar-asistencia', function (e) {
  e.preventDefault();
  $('#error-form').remove();
  $('#eventoAsistencia').val('Ceremonia');
  $('#modalAsistencia .modal-title').text(lang_titleModalAsistenciaCeremonia);
  $('#modalAsistencia .img-top-modal img').attr('src', _pathProducto + 'img/iconos/img_circuloCeremonia.svg');
  $('#modalAsistencia').modal({ backdrop: 'static' });
});

function isOkAsistencia() {
  $('#error-form').remove();
  var flag     = true;
  var err      = '';
  var name     = $.trim($('#nombreAsistente').val());
  var comments = $.trim($('#comentariosAsistente').val());

  if (name === '')             { flag = false; err = lang_nombreRequerido; }
  else if (name.length > 100)  { flag = false; err = lang_caracteresNombreAsistencia; }
  if (comments !== '' && comments.length > 100) { flag = false; err = lang_caracteresComentariosAsistencia; }

  if (!flag) $('#formAsistencia').after('<span id="error-form">' + err + '</span>');
  return flag;
}

$('body').on('click', '#sendAsistencia', function (e) {
  e.preventDefault();

  if (!isOkAsistencia()) return;

  $('#sendAsistencia').text('Enviando...').prop('disabled', true);

  var datos = {
    nombre:      $.trim($('#nombreAsistente').val()),
    asistencia:  $("input[name='asistencia']:checked").val(),
    comentarios: $.trim($('#comentariosAsistente').val()),
    evento:      'Ceremonia'
  };

  fetch(_pathApp, {
    method:  'POST',
    mode:    'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body:    JSON.stringify(datos)
  })
    .then(function () {
      $('#sendAsistencia').text('Enviar').prop('disabled', false);
      $('#formAsistencia')[0].reset();
      $('#modalAsistencia .formulario-content, #modalAsistencia .modal-footer, #modalAsistencia h5').hide();
      $('#modalAsistencia .modal-body').addClass('fix-height');
      $('#modalAsistencia .msj-content')
        .html('<h5>¡Gracias!</h5><p>Tu respuesta fue registrada correctamente.</p>')
        .show();

      setTimeout(function () {
        $('#modalAsistencia').modal('hide');
        $('#modalAsistencia .formulario-content, #modalAsistencia .modal-footer, #modalAsistencia h5').show();
        $('#modalAsistencia .msj-content').html('').hide();
        $('#modalAsistencia .modal-body').removeClass('fix-height');
      }, 4000);
    })
    .catch(function () {
      $('#sendAsistencia').text('Enviar').prop('disabled', false);
      $('#formAsistencia').after('<span id="error-form">Error de conexión, intenta de nuevo.</span>');
    });
});


/* ----------------------------------------------------------
   8. MODAL — VESTUARIO
   ---------------------------------------------------------- */

$('body').on('click', 'a.modal-vestuario', function (e) {
  e.preventDefault();
  $('#modalVestuario').modal({ backdrop: 'static' });
});


/* ----------------------------------------------------------
   9. MODAL — CÓMO LLEGAR (MAPA)
   ---------------------------------------------------------- */

$('body').on('click', 'a.modal-como-llegar', function (e) {
  e.preventDefault();

  var iframeSrc = 'https://www.google.com/maps?q=' + latitudCeremonia + ',' + longitudCeremonia + '&output=embed';
  var linkMaps  = linkMapsCeremonia || 'https://www.google.com/maps/search/?api=1&query=' + latitudCeremonia + ',' + longitudCeremonia;

  $('#modalMapa .modal-title').text(lang_titleModalMapaCeremonia);
  $('#mapLoader').removeClass('hidden');
  $('#googleMapIframe').css('opacity', '0').attr('src', iframeSrc);

  $('#googleMapIframe').off('load').on('load', function () {
    $('#mapLoader').addClass('hidden');
    $('#googleMapIframe').css('opacity', '1');
  });

  $('.ampliar-mapa').attr('href', linkMaps);
  $('#modalMapa').modal({ backdrop: 'static' });
});

$('#modalMapa').on('hidden.bs.modal', function () {
  $('#mapLoader').removeClass('hidden');
  $('#googleMapIframe').css('opacity', '0').attr('src', '');
});


/* ----------------------------------------------------------
   10. PARALLAX
   ---------------------------------------------------------- */

$(document).ready(function () {

  if ($(window).width() >= 768) {
    /* Desktop: parallax nativo del plugin */
    $('.portada').parallax({ imageSrc: _pathProducto + 'img/portada-3.webp' });
    $('.instagram').parallax({ imageSrc: _pathProducto + 'img/instagram.webp' });

  } else {
    /* Mobile: parallax manual vía background-position */
    var $portada   = $('.portada');
    var $instagram = $('.instagram');

    var imgPortada   = _pathProducto + 'img/portada-mobile.webp';
    var imgInstagram = _pathProducto + 'img/instagram-mobile.webp';

    $portada.css({
      'background-image': 'url(' + imgPortada + ')',
      'background-size':  'cover',
      'will-change':      'background-position'
    });

    $instagram.css({
      'background-image': 'linear-gradient(rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.3) 100%), url(' + imgInstagram + ')',
      'background-size':  'cover',
      'will-change':      'background-position'
    });

    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset;

      $portada.css('background-position', 'center ' + (scrollY * 0.3) + 'px');

      var instagramOffset = (scrollY - $instagram.offset().top) * 0.3;
      $instagram.css('background-position', 'center calc(50% + ' + instagramOffset + 'px)');
    }, { passive: true });
  }

});


/* ----------------------------------------------------------
   11. INVITADOS DINÁMICOS (por ?id= en la URL)
   ---------------------------------------------------------- */

(function initInvitados() {

  /* ── Aquí puedes agregar los grupos de invitados ──
  var invitados = {
    "nombre-apellido": {
      nombre:       "Nombre Apellido",
      pases:        2,
      acompanantes: ["Acompañante 1"],
      mensaje:      "Mensaje personalizado."
    }
  };
  ────────────────────────────────────────────────── */
  var invitados = {};

  var idInvitado = new URLSearchParams(window.location.search).get('id');
  if (!idInvitado || !invitados[idInvitado]) return;

  var inv = invitados[idInvitado];

  document.getElementById('pases-total').textContent   = inv.pases;
  document.getElementById('nombre-invitado').textContent = inv.nombre;
  document.getElementById('mensaje-grupo').textContent  = inv.mensaje;

  if (inv.acompanantes.length > 0) {
    document.getElementById('acompanantes-info').textContent =
      '(' + inv.acompanantes.length + ' acompañante' + (inv.acompanantes.length > 1 ? 's' : '') + ')';

    var lista = document.getElementById('lista-invitados');
    inv.acompanantes.forEach(function (nombre) {
      var li = document.createElement('li');
      li.className   = 'invitado-item';
      li.textContent = nombre;
      lista.appendChild(li);
    });
  }

  document.getElementById('seccion-invitados').style.display = 'block';

})();


/* ----------------------------------------------------------
   12. ADDEVENT — CONFIGURACIÓN
   ---------------------------------------------------------- */

window.addeventasync = function () {
  addeventatc.settings({
    css:        false,
    appleical:  { show: true, text: 'Apple Calendar' },
    google:     { show: true, text: 'Google <em>(online)</em>' },
    office365:  { show: true, text: 'Office 365 <em>(online)</em>' },
    outlook:    { show: true, text: 'Outlook' },
    outlookcom: { show: true, text: 'Outlook.com <em>(online)</em>' },
    yahoo:      { show: true, text: 'Yahoo <em>(online)</em>' },
    facebook:   { show: true, text: 'Facebook' }
  });
};
