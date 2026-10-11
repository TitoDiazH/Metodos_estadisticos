/* ============================================================================
   vistas-audio.js — 🎧 Clases en audio: se marcan los módulos, se arma una cola
   y se escuchan de corrido. Los mp3 los genera tools/generar_audio.py desde
   tools/guiones/ y cada uno se registra con PLATAFORMA.registrar("audio", …).
   El reproductor vive fuera de la vista: sigue sonando al cambiar de sección,
   y recuerda dónde ibas (cola, posición y velocidad) entre visitas.
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA, U = P.util, S = P.store;
  var V = P.vistas = P.vistas || {};

  var VELOCIDADES = [0.8, 1, 1.25, 1.5, 1.75, 2];
  var SALTO = 15;                 // segundos de ⏪ / ⏩
  var GUARDAR_CADA = 5;           // segundos entre guardados de la posición

  var el = null;                  // <audio> (se crea al primer uso)
  var cola = [], pos = -1;        // ids de módulo en orden, e índice del que suena
  var restaurado = false, ultimoGuardado = 0, fallo = "";

  function enVista() { return P.app.ruta().vista === "audio"; }
  function repintar() { if (enVista()) P.app.pintar(true); }
  function pista() { return pos >= 0 ? P.audioDe(cola[pos]) : null; }
  function marcados() { return S.pref("audioSel") || []; }
  function velocidad() { return Number(S.pref("audioVel")) || 1; }
  function duracionTxt(seg) {
    var m = Math.round(seg / 60);
    return m < 60 ? m + " min" : Math.floor(m / 60) + " h " + (m % 60) + " min";
  }
  function capituloEn(a, t) {
    var i = 0;
    a.capitulos.forEach(function (c, k) { if (t >= c.t - 0.3) i = k; });
    return i;
  }

  /* ── Motor ─────────────────────────────────────────────────────────── */
  function motor() {
    if (el) return el;
    el = new Audio();
    el.preload = "metadata";
    el.addEventListener("timeupdate", function () {
      if (Math.abs(el.currentTime - ultimoGuardado) >= GUARDAR_CADA) guardar();
      refrescar();
    });
    el.addEventListener("ended", function () {
      if (pos < cola.length - 1) cargar(pos + 1, 0, true);
      else { guardar(); repintar(); }
    });
    el.addEventListener("play", repintar);
    el.addEventListener("pause", function () { guardar(); repintar(); });
    el.addEventListener("error", function () {
      var a = pista();
      fallo = "No se pudo abrir " + (a ? a.archivo : "el audio") + ".";
      repintar();
    });
    if (navigator.mediaSession) {
      /* Controles de la pantalla bloqueada y de los audífonos. */
      var ms = navigator.mediaSession, poner = function (nombre, f) { try { ms.setActionHandler(nombre, f); } catch (e) { /* no soportado */ } };
      poner("play", tocar);
      poner("pause", function () { el.pause(); });
      poner("previoustrack", function () { mover(-1); });
      poner("nexttrack", function () { mover(1); });
      poner("seekbackward", function () { saltar(-SALTO); });
      poner("seekforward", function () { saltar(SALTO); });
    }
    return el;
  }

  /* play() devuelve una promesa que falla si el navegador exige un clic antes: no es un error. */
  function tocar() {
    var p = el.play();
    if (p && p.catch) p.catch(function () { repintar(); });
  }

  function cargar(i, desde, sonar, callado) {
    var a = P.audioDe(cola[i]);
    if (!a) return;
    pos = i; fallo = "";
    var m = motor();
    m.src = a.archivo;
    m.playbackRate = velocidad();
    if (desde > 0) m.addEventListener("loadedmetadata", function () { m.currentTime = desde; }, { once: true });
    if (navigator.mediaSession && window.MediaMetadata) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: a.titulo, artist: "Métodos Estadísticos", album: "Clase " + (i + 1) + " de " + cola.length
      });
    }
    if (sonar) tocar();
    ultimoGuardado = desde || 0;
    guardar(desde || 0);
    if (!callado) repintar();
  }
  function mover(d) {
    var i = pos + d;
    if (i >= 0 && i < cola.length) cargar(i, 0, !el.paused);
  }
  function saltar(seg) {
    if (!el || !pista()) return;
    el.currentTime = Math.max(0, Math.min(pista().duracion, el.currentTime + seg));
    refrescar();
  }
  function guardar(t) {
    if (pos < 0) return;
    ultimoGuardado = t != null ? t : el.currentTime;
    S.pref("audioEstado", { cola: cola, pos: pos, t: Math.floor(ultimoGuardado) });
  }
  /* Recupera la cola de la última visita (en pausa, donde quedó). */
  function restaurar() {
    if (restaurado) return;
    restaurado = true;
    var e = S.pref("audioEstado");
    if (!e || !Array.isArray(e.cola)) return;
    cola = e.cola.filter(function (id) { return P.audioDe(id); });
    var i = cola.indexOf(e.cola[e.pos]);
    if (i >= 0) cargar(i, e.t || 0, false, true);
    else cola = [];
  }

  /* Actualiza tiempo, barra y capítulo sin redibujar la vista (no interrumpe el arrastre). */
  function refrescar() {
    var a = pista(), caja = enVista() && document.getElementById("audioAhora");
    if (!a || !caja) return;
    var t = el.currentTime, barra = document.getElementById("audioBarra");
    if (barra && document.activeElement !== barra) barra.value = Math.floor(t);
    document.getElementById("audioTiempo").textContent = U.tiempo(t) + " / " + U.tiempo(a.duracion);
    var cap = capituloEn(a, t);
    if (String(cap) !== caja.getAttribute("data-cap")) {
      caja.setAttribute("data-cap", cap);
      document.getElementById("audioCapitulo").textContent = a.capitulos.length ? a.capitulos[cap].titulo : "";
      Array.prototype.forEach.call(caja.querySelectorAll("[data-capitulo]"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-capitulo") === String(cap));
      });
    }
  }

  /* ── Vista ─────────────────────────────────────────────────────────── */
  function reproductor() {
    var a = pista();
    if (!a) return "";
    var t = el.currentTime || ultimoGuardado, cap = capituloEn(a, t), sonando = !el.paused;
    var h = '<section class="tarjeta audio-ahora" id="audioAhora" data-cap="' + cap + '" aria-label="Reproductor">' +
      '<p class="mod-num">Clase ' + (pos + 1) + " de " + cola.length + "</p>" +
      "<h2>" + U.esc(a.titulo) + "</h2>" +
      '<p class="tenue" id="audioCapitulo">' + U.esc(a.capitulos.length ? a.capitulos[cap].titulo : "") + "</p>" +
      (fallo ? '<div class="aviso aviso-mal" role="alert">' + U.esc(fallo) + "</div>" : "") +
      '<input type="range" id="audioBarra" class="audio-barra" min="0" max="' + a.duracion + '" step="1" value="' + Math.floor(t) +
      '" data-cambio="buscar" aria-label="Posición en la clase">' +
      '<p class="audio-tiempo" id="audioTiempo">' + U.tiempo(t) + " / " + U.tiempo(a.duracion) + "</p>" +
      '<div class="audio-controles">' +
      '<button type="button" class="btn btn-sec" data-accion="anterior" aria-label="Clase anterior"' + (pos <= 0 ? " disabled" : "") + ">⏮</button>" +
      '<button type="button" class="btn btn-sec" data-accion="atras" aria-label="Retroceder ' + SALTO + ' segundos">−' + SALTO + " s</button>" +
      '<button type="button" class="btn btn-pri audio-play" data-accion="alternar">' + (sonando ? "⏸ Pausar" : "▶ Reproducir") + "</button>" +
      '<button type="button" class="btn btn-sec" data-accion="adelante" aria-label="Adelantar ' + SALTO + ' segundos">+' + SALTO + " s</button>" +
      '<button type="button" class="btn btn-sec" data-accion="siguiente" aria-label="Clase siguiente"' + (pos >= cola.length - 1 ? " disabled" : "") + ">⏭</button>" +
      '<label class="audio-vel">Velocidad <select data-cambio="velocidad">' + VELOCIDADES.map(function (v) {
        return '<option value="' + v + '"' + (v === velocidad() ? " selected" : "") + ">" + U.num(v) + "×</option>";
      }).join("") + "</select></label></div>";
    if (a.capitulos.length > 1) {
      h += '<div class="audio-capitulos" role="group" aria-label="Capítulos">' + a.capitulos.map(function (c, k) {
        return '<button type="button" class="btn btn-sec btn-chico" data-accion="capitulo" data-capitulo="' + k + '" aria-pressed="' + (k === cap) + '">' +
          U.esc(c.titulo) + ' <small class="tenue">' + U.tiempo(c.t) + "</small></button>";
      }).join("") + "</div>";
    }
    if (cola.length > 1) {
      h += '<ol class="audio-cola">' + cola.map(function (id, k) {
        var x = P.audioDe(id);
        return "<li" + (k === pos ? ' class="actual"' : "") + '><button type="button" class="enlace" data-accion="irCola" data-indice="' + k + '">' +
          U.esc(x.titulo) + '</button> <small class="tenue">' + duracionTxt(x.duracion) + "</small></li>";
      }).join("") + "</ol>";
    }
    return h + "</section>";
  }

  V.audio = {
    titulo: "Clases en audio",
    render: function () {
      restaurar();
      var mods = P.modulosDe(P.app.sel()), sel = marcados();
      var conAudio = mods.filter(function (m) { return P.audioDe(m.id); });
      var elegidos = conAudio.filter(function (m) { return sel.indexOf(m.id) >= 0; });
      var total = elegidos.reduce(function (s, m) { return s + P.audioDe(m.id).duracion; }, 0);

      var h = "<h1>🎧 Clases en audio</h1>" +
        '<p class="tenue">Cada clase explica un módulo solo con palabras: primero en simple, después con el detalle y de nuevo en simple, ' +
        "con preguntas y una pausa para que respondas en tu cabeza. Marca las que quieras y dale a reproducir: suenan una tras otra.</p>" +
        reproductor();

      h += "<h2>Elegir clases</h2>";
      if (!conAudio.length) {
        return h + '<div class="vacio"><p>Todavía no hay clases en audio para esta selección. Se generan con <code>tools/generar_audio.py</code>.</p></div>';
      }
      h += '<div class="fila-botones">' +
        '<button type="button" class="btn btn-pri" data-accion="reproducirSeleccion"' + (elegidos.length ? "" : " disabled") + ">▶ Reproducir selección" +
        (elegidos.length ? " (" + elegidos.length + " · " + duracionTxt(total) + ")" : "") + "</button>" +
        '<button type="button" class="btn btn-sec" data-accion="marcarTodas">Marcar todas</button>' +
        '<button type="button" class="btn btn-sec" data-accion="marcarNinguna">Ninguna</button></div>';
      h += '<ul class="lista-limpia audio-lista">' + mods.map(function (m) {
        var a = P.audioDe(m.id), num = '<span class="mod-num">M' + (m.orden < 10 ? "0" : "") + m.orden + "</span> ";
        if (!a) return '<li class="audio-fila sin-audio">' + num + U.esc(m.titulo) + ' <small class="tenue">sin audio todavía</small></li>';
        return '<li class="audio-fila"><label class="chk"><input type="checkbox" data-cambio="marcar" data-id="' + m.id + '"' +
          (sel.indexOf(m.id) >= 0 ? " checked" : "") + "><span>" + num + U.esc(m.titulo) + ' <small class="tenue">' + duracionTxt(a.duracion) +
          "</small></span></label>" +
          '<button type="button" class="btn btn-sec btn-chico" data-accion="reproducirUna" data-id="' + m.id + '">▶ Solo esta</button></li>';
      }).join("") + "</ul>";
      return h;
    },
    acciones: {
      marcar: function (caja) {
        var id = caja.getAttribute("data-id"), sel = marcados().filter(function (x) { return x !== id; });
        if (caja.checked) sel.push(id);
        S.pref("audioSel", sel);
        P.app.pintar(true);
      },
      marcarTodas: function () {
        S.pref("audioSel", P.datos.audio.map(function (a) { return a.modulo; }));
        P.app.pintar(true);
      },
      marcarNinguna: function () { S.pref("audioSel", []); P.app.pintar(true); },
      reproducirSeleccion: function () {
        var sel = marcados();
        cola = P.modulosDe(P.app.sel()).filter(function (m) { return P.audioDe(m.id) && sel.indexOf(m.id) >= 0; })
          .map(function (m) { return m.id; });
        if (cola.length) cargar(0, 0, true);
      },
      reproducirUna: function (b) { cola = [b.getAttribute("data-id")]; cargar(0, 0, true); },
      alternar: function () { if (el.paused) tocar(); else el.pause(); },
      anterior: function () { mover(-1); },
      siguiente: function () { mover(1); },
      atras: function () { saltar(-SALTO); },
      adelante: function () { saltar(SALTO); },
      buscar: function (barra) { el.currentTime = Number(barra.value); barra.blur(); refrescar(); },
      capitulo: function (b) { el.currentTime = pista().capitulos[Number(b.getAttribute("data-capitulo"))].t; refrescar(); },
      irCola: function (b) { cargar(Number(b.getAttribute("data-indice")), 0, true); },
      velocidad: function (s) { S.pref("audioVel", Number(s.value)); el.playbackRate = velocidad(); }
    }
  };
})();
