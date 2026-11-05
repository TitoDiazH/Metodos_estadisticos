/* ============================================================================
   vistas-audio.js — 🎧 Clases en audio: se marcan clases (de módulos y de
   ejercicios del libro guía), se arma una cola y se escuchan de corrido. Los
   mp3 los genera tools/generar_audio.py desde tools/guiones/ y cada uno se
   registra con PLATAFORMA.registrar("audio", …). Si la clase tiene animación
   (data/escenas/, ver js/animacion.js) se muestra una pizarra sincronizada.
   El reproductor vive fuera de la vista: sigue sonando al cambiar de sección,
   y recuerda dónde ibas (cola, posición y velocidad) entre visitas.
   Ruta directa a una clase: #/audio/<id de la clase>.
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA, U = P.util, S = P.store;
  var V = P.vistas = P.vistas || {};

  var VELOCIDADES = [0.8, 1, 1.25, 1.5, 1.75, 2];
  var SALTO = 15;                 // segundos de ⏪ / ⏩
  var GUARDAR_CADA = 5;           // segundos entre guardados de la posición

  var el = null;                  // <audio> (se crea al primer uso)
  var cola = [], pos = -1;        // ids de clase en orden, e índice de la que suena
  var restaurado = false, ultimoGuardado = 0, fallo = "";
  var pizarra = null, bucle = 0;  // animación montada en la vista y su requestAnimationFrame

  function enVista() { return P.app.ruta().vista === "audio"; }
  /* En pantalla completa no se redibuja la vista (eso cerraría la pantalla completa): solo botones y pizarra. */
  function repintar() {
    if (!enVista()) return;
    var marco = document.getElementById("pzMarco");
    if (marco && document.fullscreenElement === marco) {
      var a = pista(), sonando = el && !el.paused;
      Array.prototype.forEach.call(document.querySelectorAll('[data-accion="alternar"].pz-btn, .audio-play'), function (b) {
        b.textContent = b.classList.contains("pz-btn") ? (sonando ? "⏸" : "▶") : (sonando ? "⏸ Pausar" : "▶ Reproducir");
      });
      if (a && (!pizarra || pizarra.audio !== a.id)) {
        Array.prototype.forEach.call(marco.querySelectorAll(".audio-barra"), function (b) { b.max = a.duracion; });
        V.audio.montar(document);
      }
      return;
    }
    P.app.pintar(true);
  }
  function pista() { return pos >= 0 ? P.audioPorId(cola[pos]) : null; }
  /* Normaliza ids guardados por versiones anteriores (ids de módulo) a ids de clase. */
  function idClase(x) { var a = P.audioPorId(x); return a ? a.id : null; }
  function marcados() { return (S.pref("audioSel") || []).map(idClase).filter(Boolean); }
  function velocidad() { return Number(S.pref("audioVel")) || 1; }
  function conSubtitulos() { return S.pref("audioSub") !== false; }
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
    el.addEventListener("play", function () { repintar(); animar(); });
    el.addEventListener("pause", function () { guardar(); repintar(); });
    el.addEventListener("seeked", refrescar);
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

  /* Mientras suena, la pizarra se actualiza en cada cuadro (timeupdate solo llega ~4 veces por segundo). */
  function animar() {
    cancelAnimationFrame(bucle);
    (function cuadro() {
      if (!el || el.paused || !pizarra || !enVista()) return;
      pizarra.actualizar(el.currentTime, true);
      bucle = requestAnimationFrame(cuadro);
    })();
  }

  function cargar(i, desde, sonar, callado) {
    var a = P.audioPorId(cola[i]);
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
    var antes = idClase(e.cola[e.pos]);
    cola = e.cola.map(idClase).filter(Boolean);
    var i = cola.indexOf(antes);
    if (i >= 0) cargar(i, e.t || 0, false, true);
    else cola = [];
  }

  /* Actualiza tiempo, barra, capítulo y pizarra sin redibujar la vista (no interrumpe el arrastre). */
  function refrescar() {
    var a = pista(), caja = enVista() && document.getElementById("audioAhora");
    if (!a || !caja) return;
    var t = el.currentTime;
    Array.prototype.forEach.call(caja.querySelectorAll(".audio-barra"), function (barra) {
      if (document.activeElement !== barra) barra.value = Math.floor(t);
    });
    Array.prototype.forEach.call(caja.querySelectorAll(".audio-tiempo"), function (x) {
      x.textContent = U.tiempo(t) + " / " + U.tiempo(a.duracion);
    });
    if (pizarra && el.paused) pizarra.actualizar(t, false);
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
  function marcoPizarra(a, t, sonando) {
    return '<div class="pz-marco" id="pzMarco">' +
      '<div class="pz" id="pizarra" data-accion="alternar" role="img" aria-label="Pizarra animada de la clase"></div>' +
      '<div class="pz-barra">' +
      '<button type="button" class="pz-btn" data-accion="alternar" aria-label="' + (sonando ? "Pausar" : "Reproducir") + '">' + (sonando ? "⏸" : "▶") + "</button>" +
      '<button type="button" class="pz-btn" data-accion="atras" aria-label="Retroceder ' + SALTO + ' segundos">↺</button>' +
      '<input type="range" class="audio-barra pz-progreso" min="0" max="' + a.duracion + '" step="1" value="' + Math.floor(t) +
      '" data-cambio="buscar" aria-label="Posición en la clase">' +
      '<span class="audio-tiempo pz-tiempo">' + U.tiempo(t) + " / " + U.tiempo(a.duracion) + "</span>" +
      '<button type="button" class="pz-btn" data-accion="subtitulos" aria-pressed="' + conSubtitulos() + '" title="Subtítulos">CC</button>' +
      '<button type="button" class="pz-btn" data-accion="pantallaCompleta" aria-label="Pantalla completa" title="Pantalla completa (Espacio: pausa · ←/→: 5 s)">⤢</button>' +
      "</div></div>";
  }

  function reproductor() {
    var a = pista();
    if (!a) return "";
    var t = el.currentTime || ultimoGuardado, cap = capituloEn(a, t), sonando = !el.paused;
    var conPizarra = !!P.escenaDe(a.id);
    var h = '<section class="tarjeta audio-ahora" id="audioAhora" data-cap="' + cap + '" aria-label="Reproductor">' +
      '<p class="mod-num">Clase ' + (pos + 1) + " de " + cola.length + (a.ejercicio ? " · " + U.esc(a.ejercicio) : "") + "</p>" +
      "<h2>" + U.esc(a.titulo) + "</h2>" +
      '<p class="tenue" id="audioCapitulo">' + U.esc(a.capitulos.length ? a.capitulos[cap].titulo : "") + "</p>" +
      (fallo ? '<div class="aviso aviso-mal" role="alert">' + U.esc(fallo) + "</div>" : "") +
      (conPizarra ? marcoPizarra(a, t, sonando) :
        '<input type="range" id="audioBarra" class="audio-barra" min="0" max="' + a.duracion + '" step="1" value="' + Math.floor(t) +
        '" data-cambio="buscar" aria-label="Posición en la clase">' +
        '<p class="audio-tiempo" id="audioTiempo">' + U.tiempo(t) + " / " + U.tiempo(a.duracion) + "</p>") +
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
    if (a.pregunta && P.pregunta(a.pregunta)) {
      h += '<p class="audio-enlace"><a href="#/desarrollo/' + U.esc(a.pregunta) + '">✍️ Resolver este ejercicio en Desarrollo</a></p>';
    }
    if (cola.length > 1) {
      h += '<ol class="audio-cola">' + cola.map(function (id, k) {
        var x = P.audioPorId(id);
        return "<li" + (k === pos ? ' class="actual"' : "") + '><button type="button" class="enlace" data-accion="irCola" data-indice="' + k + '">' +
          U.esc(x.titulo) + '</button> <small class="tenue">' + duracionTxt(x.duracion) + "</small></li>";
      }).join("") + "</ol>";
    }
    return h + "</section>";
  }

  function filaClase(a, sel, sangria) {
    return '<li class="audio-fila' + (sangria ? " audio-ejercicio" : "") + '"><label class="chk"><input type="checkbox" data-cambio="marcar" data-id="' + a.id + '"' +
      (sel.indexOf(a.id) >= 0 ? " checked" : "") + "><span>" + (sangria ? "✏️ " : "") + U.esc(a.titulo) +
      (P.escenaDe(a.id) ? ' <span class="etiqueta-anim" title="Con pizarra animada">🎬</span>' : "") +
      ' <small class="tenue">' + duracionTxt(a.duracion) + "</small></span></label>" +
      '<button type="button" class="btn btn-sec btn-chico" data-accion="reproducirUna" data-id="' + a.id + '">▶ Solo esta</button></li>';
  }

  /* Clases visibles con la prueba elegida, en orden de módulo (módulo y luego sus ejercicios). */
  function clasesVisibles() {
    var out = [];
    P.modulosDe(P.app.sel()).forEach(function (m) { out = out.concat(P.audiosDe(m.id)); });
    return out;
  }

  V.audio = {
    titulo: "Clases en audio",
    render: function (args) {
      restaurar();
      if (args && args[0] && P.audioPorId(args[0])) {
        var pedida = P.audioPorId(args[0]).id;
        if (pista() == null || pista().id !== pedida) { cola = [pedida]; cargar(0, 0, false, true); }
      }
      var mods = P.modulosDe(P.app.sel()), sel = marcados(), visibles = clasesVisibles();
      var elegidas = visibles.filter(function (a) { return sel.indexOf(a.id) >= 0; });
      var total = elegidas.reduce(function (s, a) { return s + a.duracion; }, 0);

      var h = "<h1>🎧 Clases en audio</h1>" +
        '<p class="tenue">Cada clase explica un módulo, o resuelve un ejercicio paso a paso, como si alguien te lo contara. ' +
        "Las marcadas con 🎬 traen una pizarra animada que va mostrando fórmulas, tablas y cálculos al ritmo de la voz. " +
        "Marca las que quieras y dale a reproducir: suenan una tras otra.</p>" +
        reproductor();

      h += "<h2>Elegir clases</h2>";
      if (!visibles.length) {
        return h + '<div class="vacio"><p>Todavía no hay clases en audio para esta selección. Se generan con <code>tools/generar_audio.py</code>.</p></div>';
      }
      h += '<div class="fila-botones">' +
        '<button type="button" class="btn btn-pri" data-accion="reproducirSeleccion"' + (elegidas.length ? "" : " disabled") + ">▶ Reproducir selección" +
        (elegidas.length ? " (" + elegidas.length + " · " + duracionTxt(total) + ")" : "") + "</button>" +
        '<button type="button" class="btn btn-sec" data-accion="marcarTodas">Marcar todas</button>' +
        '<button type="button" class="btn btn-sec" data-accion="marcarModulos">Solo módulos</button>' +
        '<button type="button" class="btn btn-sec" data-accion="marcarNinguna">Ninguna</button></div>';
      h += '<ul class="lista-limpia audio-lista">' + mods.map(function (m) {
        var lista = P.audiosDe(m.id), num = '<span class="mod-num">M' + (m.orden < 10 ? "0" : "") + m.orden + "</span> ";
        if (!lista.length) return '<li class="audio-fila sin-audio">' + num + U.esc(m.titulo) + ' <small class="tenue">sin audio todavía</small></li>';
        return lista.map(function (a) {
          return a.ejercicio ? filaClase(a, sel, true) : filaClase(a, sel, false).replace("<span>", "<span>" + num);
        }).join("");
      }).join("") + "</ul>";
      return h;
    },
    montar: function (raiz) {
      var a = pista(), caja = raiz.querySelector("#pizarra"), anim = a && P.escenaDe(a.id);
      pizarra = null;
      if (!caja || !anim || !P.animacion) return;
      pizarra = P.animacion.crear(caja, a, anim);
      pizarra.audio = a.id;
      pizarra.subtitulos(conSubtitulos());
      pizarra.actualizar(el.currentTime || ultimoGuardado, false);
      if (!el.paused) animar();
    },
    salir: function () { pizarra = null; cancelAnimationFrame(bucle); },
    acciones: {
      marcar: function (caja) {
        var id = caja.getAttribute("data-id"), sel = marcados().filter(function (x) { return x !== id; });
        if (caja.checked) sel.push(id);
        S.pref("audioSel", sel);
        P.app.pintar(true);
      },
      marcarTodas: function () {
        S.pref("audioSel", P.datos.audio.map(function (a) { return a.id; }));
        P.app.pintar(true);
      },
      marcarModulos: function () {
        S.pref("audioSel", P.datos.audio.filter(function (a) { return !a.ejercicio; }).map(function (a) { return a.id; }));
        P.app.pintar(true);
      },
      marcarNinguna: function () { S.pref("audioSel", []); P.app.pintar(true); },
      reproducirSeleccion: function () {
        var sel = marcados();
        cola = clasesVisibles().filter(function (a) { return sel.indexOf(a.id) >= 0; }).map(function (a) { return a.id; });
        if (cola.length) cargar(0, 0, true);
      },
      reproducirUna: function (b) { cola = [b.getAttribute("data-id")]; cargar(0, 0, true); },
      alternar: function () { if (!el) return; if (el.paused) tocar(); else el.pause(); },
      anterior: function () { mover(-1); },
      siguiente: function () { mover(1); },
      atras: function () { saltar(-SALTO); },
      adelante: function () { saltar(SALTO); },
      buscar: function (barra) { el.currentTime = Number(barra.value); barra.blur(); refrescar(); },
      capitulo: function (b) { el.currentTime = pista().capitulos[Number(b.getAttribute("data-capitulo"))].t; refrescar(); },
      irCola: function (b) { cargar(Number(b.getAttribute("data-indice")), 0, true); },
      velocidad: function (s) { S.pref("audioVel", Number(s.value)); el.playbackRate = velocidad(); },
      subtitulos: function (b) {
        S.pref("audioSub", !conSubtitulos());
        b.setAttribute("aria-pressed", conSubtitulos());
        if (pizarra) { pizarra.subtitulos(conSubtitulos()); pizarra.actualizar(el.currentTime, false); }
      },
      pantallaCompleta: function () {
        var m = document.getElementById("pzMarco");
        if (!m) return;
        if (document.fullscreenElement) document.exitFullscreen();
        else if (m.requestFullscreen) m.requestFullscreen();
        else if (m.webkitRequestFullscreen) m.webkitRequestFullscreen();
      }
    }
  };

  /* Espacio = reproducir/pausar mientras la pizarra está a pantalla completa. */
  document.addEventListener("keydown", function (e) {
    if (!document.fullscreenElement || !el) return;
    if (e.key === " ") { e.preventDefault(); if (el.paused) tocar(); else el.pause(); }
    else if (e.key === "ArrowLeft") saltar(-5);
    else if (e.key === "ArrowRight") saltar(5);
  });
})();
