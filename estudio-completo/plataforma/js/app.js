/* ============================================================================
   app.js — Armazón: menú, selector de prueba, tema, router por hash y
   delegación de eventos. Cada vista vive en P.vistas[nombre] con:
     render(args)  → HTML de la vista
     montar(raiz, args) (opcional) → después de insertar el HTML
     acciones{}    → manejadores de data-accion / data-cambio
     salir()       (opcional) → limpiar temporizadores al cambiar de vista
   Funciona en file:// (solo usa location.hash).
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA, U = P.util, S = P.store;
  P.vistas = P.vistas || {};
  var A = {};
  P.app = A;

  var MENU = [
    { id: "inicio", txt: "Inicio", icono: "🏠" },
    { id: "aprender", txt: "Aprender", icono: "📚" },
    { id: "memorizar", txt: "Memorizar", icono: "🧾" },
    { id: "rlab", txt: "Laboratorio R", icono: "💻" },
    { id: "practicar", txt: "Practicar", icono: "🎯" },
    { id: "desarrollo", txt: "Desarrollo", icono: "✍️" },
    { id: "examen", txt: "Examen", icono: "📝" },
    { id: "progreso", txt: "Mi progreso", icono: "📊" },
    { id: "fuentes", txt: "Fuentes", icono: "📖" },
    { id: "diferencias", txt: "Diferencias entre fuentes", icono: "⚠️" }
  ];

  var raiz, actual = null, rutaActual = { vista: "inicio", args: [] };

  A.sel = function () {
    var s = S.pref("prueba");
    return (s === "todo" || P.prueba(s)) ? s : "todo";
  };
  A.nombreSel = function () {
    var s = A.sel();
    return s === "todo" ? "Todo el curso" : P.prueba(s).nombre;
  };

  /* ── Tema ──────────────────────────────────────────────────────────── */
  var TEMAS = ["auto", "claro", "oscuro"], ICONO_TEMA = { auto: "🌗", claro: "☀️", oscuro: "🌙" };
  function aplicarTema() {
    var t = S.pref("tema") || "auto";
    if (t === "auto") document.documentElement.removeAttribute("data-tema");
    else document.documentElement.setAttribute("data-tema", t);
    var b = document.getElementById("btnTema");
    if (b) { b.textContent = ICONO_TEMA[t]; b.title = "Tema: " + t + " (clic para cambiar)"; b.setAttribute("aria-label", "Tema " + t); }
  }

  /* ── Armazón fijo (menú + selector) ────────────────────────────────── */
  function pintarMenu() {
    document.getElementById("menu").innerHTML = MENU.map(function (m) {
      return '<a href="#/' + m.id + '" data-nav="' + m.id + '"><span aria-hidden="true">' + m.icono + "</span> " + m.txt + "</a>";
    }).join("");
  }
  function pintarSelector() {
    var sel = A.sel();
    var ops = P.datos.prueba.map(function (p) { return { id: p.id, txt: p.id, tit: p.nombre + " — " + p.estado }; });
    ops.push({ id: "todo", txt: "Todo", tit: "Todo el curso" });
    document.getElementById("selectorPrueba").innerHTML = '<span class="sel-rotulo">Estudiando para:</span>' +
      '<div class="segmentos" role="group" aria-label="Prueba que estás preparando">' + ops.map(function (o) {
        return '<button type="button" data-accion="elegirPrueba" data-prueba="' + o.id + '" title="' + U.esc(o.tit) + '" aria-pressed="' +
          (o.id === sel) + '"' + (o.id === sel ? ' class="activo"' : "") + ">" + o.txt + "</button>";
      }).join("") + "</div>";
  }

  /* ── Router ────────────────────────────────────────────────────────── */
  function leerRuta() {
    var h = (window.location.hash || "").replace(/^#\/?/, "");
    var partes = h.split("/").filter(Boolean).map(function (x) {
      try { return decodeURIComponent(x); } catch (e) { return x; }
    });
    var vista = partes.shift() || "inicio";
    if (!P.vistas[vista]) { vista = "inicio"; partes = []; }
    return { vista: vista, args: partes };
  }
  A.ir = function (ruta) {
    var h = "#/" + ruta.replace(/^#?\/?/, "");
    if (window.location.hash === h) A.pintar(); else window.location.hash = h;
  };
  A.ruta = function () { return rutaActual; };

  /* Redibuja la vista actual. conservarScroll evita el salto al responder una pregunta. */
  A.pintar = function (conservarScroll) {
    var r = leerRuta(), v = P.vistas[r.vista];
    var cambio = r.vista !== rutaActual.vista || r.args.join("/") !== rutaActual.args.join("/");
    if (actual && actual !== v && typeof actual.salir === "function") actual.salir();
    actual = v; rutaActual = r;
    var y = window.scrollY, html;
    try { html = v.render(r.args); }
    catch (e) { html = '<div class="aviso aviso-mal"><strong>Error al mostrar esta vista.</strong><br><code>' + U.esc(e && e.message) + "</code></div>"; }
    raiz.innerHTML = html;
    try { if (typeof v.montar === "function") v.montar(raiz, r.args); } catch (e) { /* la vista sigue visible */ }
    U.tex(raiz);
    Array.prototype.forEach.call(document.querySelectorAll("#menu a"), function (a) {
      var act = a.getAttribute("data-nav") === r.vista;
      a.classList.toggle("activo", act);
      if (act) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    document.body.classList.remove("menu-abierto");
    if (cambio && !conservarScroll) { window.scrollTo(0, 0); raiz.focus({ preventScroll: true }); }
    else window.scrollTo(0, y);
    document.title = (v.titulo ? v.titulo + " · " : "") + "Métodos Estadísticos";
  };

  /* ── Acciones globales (disponibles en cualquier vista) ────────────── */
  P.acciones = {
    elegirPrueba: function (el) {
      S.pref("prueba", el.getAttribute("data-prueba"));
      pintarSelector();
      /* Las sesiones en curso dependen de la prueba: se vuelve a la portada de la sección. */
      var r = leerRuta();
      if (r.args.length && ["practicar", "examen"].indexOf(r.vista) >= 0) A.ir(r.vista); else A.pintar();
    },
    cambiarTema: function () {
      var t = S.pref("tema") || "auto";
      S.pref("tema", TEMAS[(TEMAS.indexOf(t) + 1) % TEMAS.length]);
      aplicarTema();
    },
    alternarMenu: function () { document.body.classList.toggle("menu-abierto"); },
    imprimir: function () { window.print(); },
    irA: function (el) { A.ir(el.getAttribute("data-ruta")); }
  };

  function despachar(tipo, ev) {
    var el = ev.target.closest ? ev.target.closest("[" + tipo + "]") : null;
    if (!el) return;
    var nombre = el.getAttribute(tipo);
    var f = (actual && actual.acciones && actual.acciones[nombre]) || P.acciones[nombre];
    if (typeof f === "function") {
      if (tipo === "data-accion" && el.tagName !== "INPUT" && el.tagName !== "LABEL") ev.preventDefault();
      f(el, ev);
    }
  }

  /* ── Arranque (lo llama loader.js cuando terminó de cargar data/) ──── */
  P.iniciar = function (fallos) {
    S.cargar();
    P.indexar();
    raiz = document.getElementById("app");
    aplicarTema(); pintarMenu(); pintarSelector();

    document.addEventListener("click", function (ev) { despachar("data-accion", ev); });
    document.addEventListener("change", function (ev) { despachar("data-cambio", ev); });
    document.addEventListener("input", function (ev) { despachar("data-entrada", ev); });
    document.addEventListener("submit", function (ev) {
      var f = ev.target.closest("[data-envio]");
      if (!f) return;
      ev.preventDefault();
      var fn = (actual && actual.acciones && actual.acciones[f.getAttribute("data-envio")]) || P.acciones[f.getAttribute("data-envio")];
      if (fn) fn(f, ev);
    });
    document.getElementById("buscador").addEventListener("submit", function (ev) {
      ev.preventDefault();
      var q = document.getElementById("campoBuscar").value.trim();
      if (q) A.ir("buscar/" + encodeURIComponent(q));
    });
    window.addEventListener("hashchange", function () {
      /* La vista saliente puede rescatar lo que hay en pantalla antes de redibujar. */
      if (actual && typeof actual.antesDeRuta === "function") { try { actual.antesDeRuta(); } catch (e) { /* sigue */ } }
      A.pintar();
    });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") document.body.classList.remove("menu-abierto"); });

    var avisos = (fallos || []).map(function (f) { return "No se pudo cargar " + f; }).concat(P.erroresRegistro);
    if (!S.persistente) avisos.push("Este navegador no permite guardar datos: tu progreso durará solo hasta cerrar la pestaña.");
    var caja = document.getElementById("avisosGlobales");
    caja.innerHTML = avisos.map(function (a) { return '<div class="aviso aviso-mal">' + U.esc(a) + "</div>"; }).join("");
    document.body.classList.add("lista");
    A.pintar();
  };
})();
