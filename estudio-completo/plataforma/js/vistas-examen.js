/* ============================================================================
   vistas-examen.js — 📝 Examen, 🔥 Desafío, 🎓 Simulacro y 🧭 Diagnóstico.
   Comparten un mismo motor de sesión: preguntas sin repetir, alternativas
   barajadas, sin respuestas hasta el final, navegación libre y "revisar luego".
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA, U = P.util, S = P.store, G = P.progreso, M = P.motor, C = P.config;
  var V = P.vistas = P.vistas || {};
  function sel() { return P.app.sel(); }
  function vacio(txt) { return '<div class="vacio"><p>' + txt + "</p></div>"; }

  var MODOS = {
    examen: { nombre: "Examen", icono: "📝", desc: "Preguntas al azar del banco de la prueba elegida, ponderadas por prioridad. Sin respuestas hasta el final." },
    desafio: { nombre: "Desafío", icono: "🔥", desc: "Solo las difíciles: supuestos y excepciones, conceptos parecidos, salidas de R ambiguas." },
    simulacro: { nombre: "Simulacro", icono: "🎓", desc: "Examen con cronómetro. Recuerda: la prueba real es de desarrollo; complementa con ✍️ Desarrollo." },
    diagnostico: { nombre: "Diagnóstico", icono: "🧭", desc: "Pocas preguntas repartidas entre todos los módulos para ubicar tu nivel inicial." }
  };

  var X = null;         // sesión en curso o terminada
  var reloj = null;

  function peso(q) { return C.PESO_PRIORIDAD[P.prioridadDe(q)] || 1; }

  /* Selección de preguntas según el modo (nunca repite una pregunta). */
  function elegir(modo) {
    var banco = P.preguntas({ prueba: sel() });
    if (modo === "desafio") {
      return U.muestraPonderada(P.preguntas({ prueba: sel(), desafio: true }), C.N_PREGUNTAS_DESAFIO, peso);
    }
    if (modo === "diagnostico") {
      /* Ronda por módulos: una pregunta de cada uno hasta completar N. */
      var porMod = {}, orden = [], out = [];
      U.barajar(banco).forEach(function (q) { if (!porMod[q.modulo]) { porMod[q.modulo] = []; orden.push(q.modulo); } porMod[q.modulo].push(q); });
      while (out.length < C.N_PREGUNTAS_DIAGNOSTICO && orden.some(function (m) { return porMod[m].length; })) {
        orden.forEach(function (m) { if (out.length < C.N_PREGUNTAS_DIAGNOSTICO && porMod[m].length) out.push(porMod[m].pop()); });
      }
      return out;
    }
    return U.muestraPonderada(banco, Number(S.pref("nExamen")) || C.N_PREGUNTAS_EXAMEN, peso);
  }

  function empezar(modo) {
    var qs = U.barajar(elegir(modo));
    X = {
      modo: modo, prueba: sel(), items: qs.map(M.preparar), i: 0, revisar: {}, inicio: Date.now(), fin: null,
      limite: modo === "simulacro" && S.pref("crono") ? C.MINUTOS_SIMULACRO * 60 : null, crono: modo === "simulacro" ? !!S.pref("crono") : true
    };
    X.resp = X.items.map(M.vacia);
  }
  function guardarActual() {
    /* Solo si lo que hay en pantalla es la pregunta en curso (no la revisión de un resultado). */
    var cont = document.querySelector(".examen-cabecera") && document.querySelector(".pregunta");
    if (X && !X.fin && cont && cont.getAttribute("data-qid") === X.items[X.i].q.id) X.resp[X.i] = M.leer(cont, X.items[X.i]);
  }
  function transcurrido() { return Math.round(((X.fin || Date.now()) - X.inicio) / 1000); }

  function terminar() {
    guardarActual();
    X.fin = Date.now();
    clearInterval(reloj);
    X.res = X.items.map(function (inst, k) {
      var ok = M.corregir(inst, X.resp[k]);
      S.anotar(inst.q.id, ok);
      return { q: inst.q, ok: ok, respondida: M.respondida(inst, X.resp[k]) };
    });
    X.ok = X.res.filter(function (r) { return r.ok; }).length;
    X.porModulo = G.desglose(X.res, function (q) { return q.modulo; });
    X.porPrioridad = G.desglose(X.res, P.prioridadDe);
    S.e.examenes.push({ ts: X.fin, modo: X.modo, prueba: X.prueba, n: X.items.length, ok: X.ok, seg: transcurrido(), mod: X.porModulo, pri: X.porPrioridad });
    if (X.modo === "diagnostico" && X.prueba !== "todo") S.e.diag[X.prueba] = X.fin;
    S.guardar();
  }

  /* ── Portada ───────────────────────────────────────────────────────── */
  function htmlPortada() {
    var banco = P.preguntas({ prueba: sel() }).length, dificiles = P.preguntas({ prueba: sel(), desafio: true }).length;
    var n = Number(S.pref("nExamen")) || C.N_PREGUNTAS_EXAMEN;
    var h = "<h1>📝 Examen</h1>" + P.avisoPrueba();
    if (!banco) return h + vacio("No hay preguntas para esta selección: no se puede armar un examen.");
    if (X && !X.fin) h += '<div class="aviso aviso-alerta">Tienes un ' + MODOS[X.modo].nombre.toLowerCase() + ' sin terminar. <a class="btn btn-pri" href="#/examen/curso">Continuar</a></div>';
    h += '<p class="bajada">Banco disponible para ' + U.esc(P.app.nombreSel()) + ": <strong>" + banco + "</strong> preguntas cerradas. Se aprueba con " + C.PORCENTAJE_APROBACION + " % (nota " +
      U.num(C.NOTA_APROBACION, 1) + "), valores configurables en js/config.js.</p>" +
      (banco < n ? '<div class="aviso">El banco tiene menos de ' + n + " preguntas: el examen usará las " + banco + " disponibles, sin repetir.</div>" : "") +
      '<div class="rejilla">' + Object.keys(MODOS).map(function (k) {
        var m = MODOS[k], cuantas = k === "desafio" ? Math.min(dificiles, C.N_PREGUNTAS_DESAFIO) : k === "diagnostico" ? Math.min(banco, C.N_PREGUNTAS_DIAGNOSTICO) : Math.min(banco, n);
        return '<div class="tarjeta"><h3>' + m.icono + " " + m.nombre + "</h3><p>" + m.desc + '</p><p class="tenue">' + cuantas + " preguntas" +
          (k === "simulacro" ? " · " + C.MINUTOS_SIMULACRO + " min" : "") + "</p>" +
          '<button class="btn btn-pri" data-accion="empezarExamen" data-modo="' + k + '"' + (cuantas ? "" : " disabled") + ">Empezar</button></div>";
      }).join("") + "</div>" +
      '<section class="tarjeta"><h2>Ajustes</h2><div class="rejilla-filtros">' +
      '<label class="campo">Preguntas por examen <select data-cambio="ajusteN">' + [10, 20, 30, 40, 50].map(function (x) {
        return '<option value="' + x + '"' + (x === n ? " selected" : "") + ">" + x + "</option>";
      }).join("") + "</select></label>" +
      '<label class="chk"><input type="checkbox" data-cambio="ajusteCrono"' + (S.pref("crono") ? " checked" : "") + "> Cronómetro con límite en el simulacro</label></div></section>";
    return h;
  }

  /* ── En curso ──────────────────────────────────────────────────────── */
  function htmlCurso() {
    var inst = X.items[X.i], total = X.items.length, m = MODOS[X.modo];
    var contestadas = X.items.filter(function (it, k) { return M.respondida(it, X.resp[k]); }).length;
    return '<div class="examen-cabecera"><strong>' + m.icono + " " + m.nombre + " · " + U.esc(X.prueba === "todo" ? "Todo" : X.prueba) + "</strong>" +
      "<span>Pregunta " + (X.i + 1) + " de " + total + " · " + contestadas + " respondidas</span>" +
      (X.crono ? '<span class="reloj" id="reloj" aria-live="off">⏱ ' + textoReloj() + "</span>" : "") + "</div>" +
      U.barra(100 * contestadas / total) +
      M.html(inst, X.resp[X.i], false) +
      '<div class="fila-botones">' +
      '<button class="btn btn-sec" data-accion="mover" data-paso="-1"' + (X.i === 0 ? " disabled" : "") + ">← Anterior</button>" +
      '<button class="btn btn-sec" data-accion="revisarLuego" aria-pressed="' + !!X.revisar[X.i] + '">' + (X.revisar[X.i] ? "🚩 Marcada para revisar" : "🚩 Revisar después") + "</button>" +
      (X.i < total - 1 ? '<button class="btn btn-pri" data-accion="mover" data-paso="1">Siguiente →</button>' : "") +
      '<button class="btn ' + (X.i === total - 1 ? "btn-pri" : "btn-sec") + '" data-accion="terminarExamen">Terminar y corregir</button></div>' +
      '<nav class="mapa-preguntas" aria-label="Ir a una pregunta">' + X.items.map(function (it, k) {
        var cls = (k === X.i ? " actual" : "") + (M.respondida(it, X.resp[k]) ? " hecha" : "") + (X.revisar[k] ? " bandera" : "");
        return '<button class="' + cls.trim() + '" data-accion="saltar" data-k="' + k + '" aria-label="Pregunta ' + (k + 1) + '">' + (k + 1) + "</button>";
      }).join("") + "</nav>" +
      '<p class="ayuda">Las respuestas y explicaciones se muestran al terminar.</p>';
  }
  function textoReloj() {
    var t = transcurrido();
    return X.limite ? U.tiempo(X.limite - t) + " restantes" : U.tiempo(t);
  }

  /* ── Resultado ─────────────────────────────────────────────────────── */
  function tablaDesglose(titulo, datos, nombreDe) {
    return "<h3>" + titulo + '</h3><div class="tabla-scroll"><table class="tabla"><thead><tr><th>' + titulo.replace("Por ", "") + "</th><th>Aciertos</th><th>%</th><th></th></tr></thead><tbody>" +
      Object.keys(datos).map(function (k) {
        var d = datos[k], p = U.pct(d.ok, d.n);
        return "<tr><td>" + nombreDe(k) + "</td><td>" + d.ok + " / " + d.n + "</td><td>" + U.num(p, 1) + " %</td><td>" + U.barra(p, p >= C.PORCENTAJE_APROBACION ? "barra-ok" : "barra-bajo") + "</td></tr>";
      }).join("") + "</tbody></table></div>";
  }
  function htmlResultado() {
    var n = X.items.length, m = MODOS[X.modo], aprobado = U.aprueba(X.ok, n);
    var h = "<h1>" + m.icono + " Resultado del " + m.nombre.toLowerCase() + "</h1>" +
      '<div class="tarjeta resultado ' + (aprobado ? "nota-ok" : "nota-mal") + '"><p class="gran-numero">' + U.notaTxt(X.ok, n) + "</p>" +
      "<p><strong>" + (X.modo === "diagnostico" ? "Nivel inicial" : aprobado ? "Aprobado" : "No aprobado") + "</strong> · " + X.ok + " de " + n + " correctas (" + U.num(U.pct(X.ok, n), 1) + " %) · tiempo " + U.tiempo(transcurrido()) + "</p>" +
      '<p class="tenue">Se aprueba con ' + C.PORCENTAJE_APROBACION + " % exacto o más (sin redondeo a favor). Escala 1–7 lineal por tramos (la forma de la escala es un supuesto).</p></div>";
    if (X.modo === "simulacro" || X.modo === "examen") {
      h += '<div class="aviso">La prueba real es de <strong>desarrollo con lectura de salidas de R</strong>. Este puntaje mide conceptos y cálculos; practica también en <a href="#/desarrollo">✍️ Desarrollo</a>.</div>';
    }
    h += '<section class="tarjeta">' + tablaDesglose("Por módulo", X.porModulo, function (k) {
      var mo = P.modulo(k); return '<a href="#/aprender/' + k + '">' + U.esc(mo ? mo.titulo : k) + "</a>";
    }) + tablaDesglose("Por prioridad", X.porPrioridad, function (k) { return U.chipPrioridad(k); }) + "</section>";

    var malas = [], buenas = [];
    X.items.forEach(function (inst, k) { (X.res[k].ok ? buenas : malas).push(k); });
    h += "<h2>Preguntas falladas (" + malas.length + ")</h2>" + (malas.length ? malas.map(function (k) {
      return '<div class="revision"><span class="rev-num">' + (k + 1) + (X.res[k].respondida ? "" : " · sin responder") + "</span>" + M.html(X.items[k], X.resp[k], true) + "</div>";
    }).join("") : '<p class="tenue">Ninguna. 🎉</p>');
    if (buenas.length) {
      h += "<details class=\"tarjeta\"><summary>Ver las " + buenas.length + " correctas con su explicación</summary>" + buenas.map(function (k) {
        return '<div class="revision"><span class="rev-num">' + (k + 1) + "</span>" + M.html(X.items[k], X.resp[k], true) + "</div>";
      }).join("") + "</details>";
    }
    h += '<div class="fila-botones"><button class="btn btn-pri" data-accion="empezarExamen" data-modo="' + X.modo + '">Repetir ' + m.nombre.toLowerCase() + "</button>" +
      '<a class="btn btn-sec" href="#/practicar/repaso">🧠 Repasar mis errores</a><a class="btn btn-sec" href="#/progreso">📊 Mi progreso</a></div>';
    return h;
  }

  V.examen = {
    titulo: "Examen",
    render: function (args) {
      if (args[0] === "curso" && X && !X.fin) return htmlCurso();
      if (args[0] === "resultado" && X && X.fin) return htmlResultado();
      if (MODOS[args[0]] && (!X || X.fin)) {
        /* Enlace directo (p. ej. #/examen/diagnostico desde Inicio). */
        var banco = P.preguntas({ prueba: sel() }).length;
        return "<h1>" + MODOS[args[0]].icono + " " + MODOS[args[0]].nombre + "</h1><p class=\"bajada\">" + MODOS[args[0]].desc + "</p>" +
          (banco ? '<button class="btn btn-pri" data-accion="empezarExamen" data-modo="' + args[0] + '">Empezar</button>' : vacio("No hay preguntas para esta selección."));
      }
      return htmlPortada();
    },
    montar: function (raiz, args) {
      clearInterval(reloj);
      if (args[0] === "curso" && X && !X.fin && X.crono) {
        reloj = setInterval(function () {
          var el = document.getElementById("reloj");
          if (X.limite && transcurrido() >= X.limite) { terminar(); P.app.ir("examen/resultado"); return; }
          if (el) el.textContent = "⏱ " + textoReloj();
        }, 1000);
      }
    },
    antesDeRuta: guardarActual,
    salir: function () { clearInterval(reloj); },
    acciones: {
      empezarExamen: function (el) {
        if (X && !X.fin && !window.confirm("Hay una evaluación sin terminar. ¿Descartarla y empezar otra?")) return;
        empezar(el.getAttribute("data-modo"));
        if (!X.items.length) { X = null; P.app.ir("examen"); return; }
        P.app.ir("examen/curso");
      },
      mover: function (el) { guardarActual(); X.i = Math.max(0, Math.min(X.items.length - 1, X.i + Number(el.getAttribute("data-paso")))); P.app.pintar(); window.scrollTo(0, 0); },
      saltar: function (el) { guardarActual(); X.i = Number(el.getAttribute("data-k")); P.app.pintar(); window.scrollTo(0, 0); },
      revisarLuego: function () { guardarActual(); X.revisar[X.i] = !X.revisar[X.i]; P.app.pintar(true); },
      terminarExamen: function () {
        guardarActual();
        var faltan = X.items.filter(function (it, k) { return !M.respondida(it, X.resp[k]); }).length;
        var msg = faltan ? "Quedan " + faltan + " pregunta(s) sin responder (contarán como incorrectas). ¿Terminar igual?" : "¿Terminar y corregir?";
        if (!window.confirm(msg)) return;
        terminar(); P.app.ir("examen/resultado");
      },
      ajusteN: function (el) { S.pref("nExamen", Number(el.value)); P.app.pintar(true); },
      ajusteCrono: function (el) { S.pref("crono", el.checked); }
    }
  };
})();
