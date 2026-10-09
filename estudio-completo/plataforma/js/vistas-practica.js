/* ============================================================================
   vistas-practica.js — 🎯 Practicar (filtros + sesión con retroalimentación
   inmediata) y ✍️ Desarrollo (se resuelve en papel; aquí se corrige por
   partes que se desbloquean una a una, con nota estimada 1–7).
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA, U = P.util, S = P.store, G = P.progreso, M = P.motor, C = P.config;
  var V = P.vistas = P.vistas || {};
  function sel() { return P.app.sel(); }
  function vacio(txt) { return '<div class="vacio"><p>' + txt + "</p></div>"; }

  /* ═════════════════════════════ PRACTICAR ════════════════════════════ */
  var F = { modulo: "", prioridad: "", tipos: [], dificultad: 0, origen: "", marcadas: false, falladas: false, n: 10 };
  var Ses = null;   // {clave, titulo, items, i, resp, corregida, ok, hechas}

  function filtradas() {
    var lista = P.preguntas({ prueba: sel(), modulo: F.modulo, prioridad: F.prioridad, tipos: F.tipos, dificultad: F.dificultad, origen: F.origen });
    if (F.marcadas) lista = lista.filter(function (q) { return S.marcada(q.id); });
    if (F.falladas) lista = lista.filter(function (q) { var r = S.stat(q.id); return r && r.h[0] === 0; });
    return lista;
  }
  function nuevaSesion(clave, titulo, preguntas, barajar) {
    var lista = barajar === false ? preguntas : U.barajar(preguntas);
    Ses = { clave: clave, titulo: titulo, items: lista.map(M.preparar), i: 0, corregida: false, ok: 0, hechas: 0 };
    Ses.resp = Ses.items.length ? M.vacia(Ses.items[0]) : null;
  }

  function opciones(lista, valor) {
    return lista.map(function (o) { return '<option value="' + o[0] + '"' + (String(o[0]) === String(valor) ? " selected" : "") + ">" + U.esc(o[1]) + "</option>"; }).join("");
  }

  function htmlFiltros() {
    var n = filtradas().length, total = P.preguntas({ prueba: sel() }).length;
    var tiposHay = {};
    P.preguntas({ prueba: sel() }).forEach(function (q) { tiposHay[q.tipo] = (tiposHay[q.tipo] || 0) + 1; });
    var h = "<h1>🎯 Practicar</h1>" + P.avisoPrueba() +
      '<p class="bajada">Retroalimentación inmediata: la correcta, por qué, por qué las otras no y la fuente.</p>';
    if (!total) return h + vacio("No hay preguntas para esta selección de prueba.");
    h += '<div class="accesos"><a class="btn btn-sec" href="#/practicar/repaso">🧠 Repasar mis errores <span class="chip">' + G.colaRepaso(sel(), 99).length + "</span></a>" +
      '<a class="btn btn-sec" href="#/practicar/marcadas">🔖 Mis marcadas <span class="chip">' +
      P.preguntas({ prueba: sel() }).filter(function (q) { return S.marcada(q.id); }).length + "</span></a></div>";
    h += '<form class="tarjeta filtros" data-envio="empezar"><h2>Arma tu práctica</h2><div class="rejilla-filtros">' +
      '<label class="campo">Módulo <select name="modulo" data-cambio="filtro"><option value="">Todos</option>' +
      P.modulosDe(sel()).map(function (m) { return '<option value="' + m.id + '"' + (m.id === F.modulo ? " selected" : "") + ">M" + String(m.orden).padStart(2, "0") + " · " + U.esc(m.titulo) + "</option>"; }).join("") + "</select></label>" +
      '<label class="campo">Prioridad <select name="prioridad" data-cambio="filtro">' + opciones([["", "Todas"], ["alta", "Alta"], ["media", "Media"], ["baja", "Baja"]], F.prioridad) + "</select></label>" +
      '<label class="campo">Dificultad <select name="dificultad" data-cambio="filtro">' + opciones([[0, "Todas"], [1, "Fácil"], [2, "Media"], [3, "Difícil"]], F.dificultad) + "</select></label>" +
      '<label class="campo">Origen <select name="origen" data-cambio="filtro">' + opciones([["", "Todos"], ["curso", "Del curso"], ["variacion", "Variación"], ["nueva", "Nueva (IA)"]], F.origen) + "</select></label>" +
      '<label class="campo">Cantidad <select name="n" data-cambio="filtro">' + opciones([[5, "5"], [10, "10"], [20, "20"], [50, "50"], [9999, "Todas"]], F.n) + "</select></label></div>" +
      '<fieldset class="grupo-chk"><legend>Tipo de pregunta</legend>' + Object.keys(P.TIPOS_PREGUNTA).filter(function (t) { return tiposHay[t]; }).map(function (t) {
        return '<label class="chk"><input type="checkbox" name="tipo" value="' + t + '" data-cambio="filtro"' + (F.tipos.indexOf(t) >= 0 ? " checked" : "") + "> " +
          P.TIPOS_PREGUNTA[t].icono + " " + P.TIPOS_PREGUNTA[t].nombre + ' <span class="tenue">(' + tiposHay[t] + ")</span></label>";
      }).join("") + "</fieldset>" +
      '<fieldset class="grupo-chk"><legend>Solo…</legend>' +
      '<label class="chk"><input type="checkbox" name="marcadas" data-cambio="filtro"' + (F.marcadas ? " checked" : "") + "> 🔖 marcadas</label>" +
      '<label class="chk"><input type="checkbox" name="falladas" data-cambio="filtro"' + (F.falladas ? " checked" : "") + "> ❌ falladas la última vez</label></fieldset>" +
      '<div class="fila-botones"><button class="btn btn-pri" type="submit"' + (n ? "" : " disabled") + ">Empezar (" + Math.min(n, F.n) + " de " + n + ' disponibles)</button></div></form>';
    return h;
  }

  function htmlSesion() {
    var total = Ses.items.length;
    if (!total) return "<h1>" + U.esc(Ses.titulo) + "</h1>" + vacio('No hay preguntas que cumplan esa condición. <a href="#/practicar">Volver a Practicar</a>');
    if (Ses.i >= total) {
      return "<h1>" + U.esc(Ses.titulo) + '</h1><div class="tarjeta resultado"><p class="gran-numero">' + Ses.ok + " / " + total + "</p><p>" +
        U.num(U.pct(Ses.ok, total), 1) + ' % de acierto en esta práctica.</p><div class="fila-botones">' +
        '<button class="btn btn-pri" data-accion="repetir">Practicar de nuevo</button><a class="btn btn-sec" href="#/practicar">Cambiar filtros</a>' +
        '<a class="btn btn-sec" href="#/progreso">📊 Ver mi progreso</a></div></div>';
    }
    var inst = Ses.items[Ses.i], q = inst.q, marc = S.marcada(q.id);
    return '<nav class="migas"><a href="#/practicar">🎯 Practicar</a> › ' + U.esc(Ses.titulo) + "</nav>" +
      '<div class="avance-sesion"><span>Pregunta ' + (Ses.i + 1) + " de " + total + " · " + Ses.ok + " correctas</span>" + U.barra(100 * Ses.i / total) + "</div>" +
      M.html(inst, Ses.resp, Ses.corregida) +
      '<div class="fila-botones">' +
      (Ses.corregida
        ? '<button class="btn btn-pri" data-accion="siguiente">' + (Ses.i + 1 < total ? "Siguiente →" : "Ver resumen") + "</button>"
        : '<button class="btn btn-pri" data-accion="revisar">Revisar respuesta</button>') +
      '<button class="btn btn-sec" data-accion="marcar" aria-pressed="' + marc + '">' + (marc ? "🔖 Marcada" : "🔖 Marcar para repasar") + "</button>" +
      (Ses.corregida ? '<a class="btn btn-sec" href="#/aprender/' + q.modulo + (q.concepto ? "/" + q.concepto : "") + '">📚 Repasar el concepto</a>' : "") + "</div>";
  }

  V.practicar = {
    titulo: "Practicar",
    render: function (args) {
      var clave = args.join("/");
      if (!args[0]) return htmlFiltros();
      if (args[0] === "sesion") return Ses && Ses.clave === "sesion" ? htmlSesion() : htmlFiltros();
      if (!Ses || Ses.clave !== clave) {
        if (args[0] === "modulo") {
          var m = P.modulo(args[1]);
          nuevaSesion(clave, m ? "Módulo: " + m.titulo : "Módulo", m ? P.preguntasDeModulo(m.id, false) : []);
        } else if (args[0] === "repaso") {
          nuevaSesion(clave, "Repasar mis errores", G.colaRepaso(sel(), 20), false);
        } else if (args[0] === "marcadas") {
          nuevaSesion(clave, "Mis marcadas", P.preguntas({ prueba: sel() }).filter(function (q) { return S.marcada(q.id); }));
        } else return htmlFiltros();
      }
      return htmlSesion();
    },
    acciones: {
      filtro: function (el) {
        var f = el.form;
        F.modulo = f.modulo.value; F.prioridad = f.prioridad.value; F.dificultad = Number(f.dificultad.value);
        F.origen = f.origen.value; F.n = Number(f.n.value);
        F.tipos = Array.prototype.filter.call(f.querySelectorAll('input[name="tipo"]'), function (x) { return x.checked; }).map(function (x) { return x.value; });
        F.marcadas = f.marcadas.checked; F.falladas = f.falladas.checked;
        var nombre = el.name, valor = el.type === "checkbox" ? el.value : null;
        P.app.pintar(true);
        /* Devuelve el foco al control usado (el formulario se redibujó). */
        var otra = document.querySelector('.filtros [name="' + nombre + '"]' + (valor && nombre === "tipo" ? '[value="' + valor + '"]' : ""));
        if (otra) otra.focus({ preventScroll: true });
      },
      empezar: function () {
        nuevaSesion("sesion", "Práctica personalizada", U.barajar(filtradas()).slice(0, F.n), false);
        P.app.ir("practicar/sesion");
      },
      revisar: function () {
        var inst = Ses.items[Ses.i], cont = document.querySelector(".pregunta");
        Ses.resp = M.leer(cont, inst);
        if (!M.respondida(inst, Ses.resp)) { cont.classList.add("falta"); return; }
        var ok = M.corregir(inst, Ses.resp);
        Ses.corregida = true; Ses.hechas++; if (ok) Ses.ok++;
        S.anotar(inst.q.id, ok);
        P.app.pintar(true);
      },
      siguiente: function () {
        Ses.i++; Ses.corregida = false;
        Ses.resp = Ses.i < Ses.items.length ? M.vacia(Ses.items[Ses.i]) : null;
        P.app.pintar(); window.scrollTo(0, 0);
      },
      marcar: function () {
        /* Conserva lo que el estudiante ya había elegido antes de redibujar. */
        if (!Ses.corregida) Ses.resp = M.leer(document.querySelector(".pregunta"), Ses.items[Ses.i]);
        S.marcar(Ses.items[Ses.i].q.id); P.app.pintar(true);
      },
      repetir: function () {
        var era = Ses.clave; Ses = null;
        if (era === "sesion") P.app.ir("practicar"); else P.app.pintar();
      }
    }
  };

  /* ════════════════════════════ DESARROLLO ════════════════════════════
     Se resuelve EN PAPEL. La app solo guía la corrección: la pregunta se divide en
     "partes" que se desbloquean una a una. Cada parte parte oculta; al abrirla se ve
     su solución y se responde «¿la tuviste correcta?». Recién entonces se habilita
     la siguiente. Puntaje = puntos de las partes marcadas como correctas. */
  function estadoDes(id) { return S.e.desarrollo[id] || { r: [], vista: 0 }; }
  function tocarDes(id) { return S.e.desarrollo[id] || (S.e.desarrollo[id] = { r: [], vista: 0 }); }
  function puntosDes(q, g) {
    var tot = 0, got = 0, hechas = 0;
    q.partes.forEach(function (pt, k) {
      tot += pt.puntos;
      if (typeof g.r[k] === "boolean") { hechas++; if (g.r[k]) got += pt.puntos; }
    });
    return { total: tot, logrado: got, hechas: hechas, n: q.partes.length, completa: hechas === q.partes.length };
  }
  /* Centésimas → enteros: la aprobación se decide sin errores de coma flotante. */
  function notaDes(p) { return U.notaTxt(Math.round(p.logrado * 100), Math.round(p.total * 100)); }

  function htmlPuntaje(q, g) {
    var p = puntosDes(q, g);
    if (!p.completa) {
      return '<div class="nota-estimada"><span class="gran-numero">' + U.num(p.logrado) + '</span><span>puntos de ' + U.num(p.total) + " · " + p.hechas + " de " + p.n +
        " partes corregidas<br><small>La nota estimada aparece al corregir todas las partes.</small></span></div>" + U.barra(100 * p.hechas / p.n);
    }
    var ok = Math.round(p.logrado * 100), tot = Math.round(p.total * 100);
    return '<div class="nota-estimada ' + (U.aprueba(ok, tot) ? "nota-ok" : "nota-mal") + '"><span class="gran-numero">' + notaDes(p) + "</span>" +
      "<span>" + U.num(p.logrado) + " de " + U.num(p.total) + " puntos · " + U.num(U.pct(ok, tot), 1) + " %<br><small>Nota estimada (" +
      C.PORCENTAJE_APROBACION + " % → " + U.num(C.NOTA_APROBACION, 1) + "). " + (q.escala ? U.esc(q.escala) : "Los puntos por parte son una regla de la plataforma, no la pauta oficial.") + "</small></span></div>";
  }

  function htmlParte(q, g, k) {
    var pt = q.partes[k], hecha = typeof g.r[k] === "boolean";
    var disponible = k === 0 || typeof g.r[k - 1] === "boolean";      // la anterior ya se corrigió
    var abierta = hecha || (disponible && g.vista > k);
    var cab = '<span class="parte-num">Parte ' + (k + 1) + '</span> <span class="parte-titulo">' + pt.titulo + '</span> <span class="chip chip-tenue">' + U.num(pt.puntos) + " pt</span>";
    if (!disponible) {
      return '<li class="parte parte-bloqueada" data-k="' + k + '"><div class="parte-cab">🔒 ' + cab + '</div><p class="ayuda">Se desbloquea al corregir la parte ' + k + ".</p></li>";
    }
    if (!abierta) {
      return '<li class="parte parte-lista" data-k="' + k + '"><div class="parte-cab">' + cab + "</div>" +
        '<p class="ayuda">Resuélvela en papel y recién entonces mira la solución.</p>' +
        '<button class="btn btn-pri" data-accion="abrirParte" data-qid="' + q.id + '" data-k="' + k + '">Mostrar solución de la parte ' + (k + 1) + "</button></li>";
    }
    return '<li class="parte ' + (hecha ? (g.r[k] ? "parte-ok" : "parte-mal") : "parte-abierta") + '" data-k="' + k + '"><div class="parte-cab">' + cab +
      (hecha ? ' <span class="chip ' + (g.r[k] ? "chip-ok" : "chip-alta") + '">' + (g.r[k] ? "✅ Correcta" : "❌ Incorrecta") + "</span>" : "") + "</div>" +
      '<div class="parte-solucion">' + pt.solucion + "</div>" +
      '<div class="parte-juicio"><strong>' + (hecha ? "Cambiar mi corrección:" : "¿La tuviste correcta?") + "</strong> " +
      '<button class="btn ' + (hecha ? "btn-sec btn-chico" : "btn-pri") + '" data-accion="juzgarParte" data-qid="' + q.id + '" data-k="' + k + '" data-ok="1" aria-pressed="' + (g.r[k] === true) + '">✅ Sí</button> ' +
      '<button class="btn btn-sec' + (hecha ? " btn-chico" : "") + '" data-accion="juzgarParte" data-qid="' + q.id + '" data-k="' + k + '" data-ok="0" aria-pressed="' + (g.r[k] === false) + '">❌ No</button></div></li>';
  }

  V.desarrollo = {
    titulo: "Desarrollo",
    render: function (args) {
      var lista = P.preguntas({ prueba: sel(), soloDesarrollo: true });
      if (args[0]) {
        var q = P.pregunta(args[0]);
        if (!q || q.tipo !== "desarrollo" || q.retirada) return "<h1>Pregunta no encontrada</h1>" + vacio('<a href="#/desarrollo">Volver a Desarrollo</a>');
        return this.detalle(q, lista);
      }
      var h = "<h1>✍️ Desarrollo</h1>" + P.avisoPrueba() +
        '<p class="bajada">El formato de la prueba real. Resuelve cada pregunta <strong>en papel</strong>; aquí la corriges por partes: abres la solución de una parte, marcas si la tuviste correcta y se desbloquea la siguiente. Cada pregunta documentada de pruebas pasadas vale ' + C.PUNTAJE_DESARROLLO + " puntos.</p>";
      if (!lista.length) return h + vacio("No hay preguntas de desarrollo para esta selección.");
      /* Agrupadas por módulo (son muchas): cada grupo muestra cuántas llevas corregidas. */
      var grupos = {}, orden = [];
      lista.forEach(function (q) { if (!grupos[q.modulo]) { grupos[q.modulo] = []; orden.push(q.modulo); } grupos[q.modulo].push(q); });
      orden.sort();
      var pendientes = lista.filter(function (q) { return !puntosDes(q, estadoDes(q.id)).completa; });
      h += '<p class="ayuda">' + lista.length + " preguntas · " + (lista.length - pendientes.length) + " corregidas. " +
        (pendientes.length ? '<a class="btn btn-sec btn-chico" href="#/desarrollo/' + pendientes[Math.floor(Math.random() * pendientes.length)].id + '">🎲 Una al azar sin corregir</a>' : "") + "</p>";
      orden.forEach(function (idMod) {
        var m = P.modulo(idMod), qs = grupos[idMod];
        var listas = qs.filter(function (q) { return puntosDes(q, estadoDes(q.id)).completa; }).length;
        h += "<h2>" + U.esc(idMod.split("-")[0].toUpperCase() + " · " + (m ? m.titulo : idMod)) + ' <span class="chip chip-tenue">' + listas + " de " + qs.length + " corregidas</span></h2>" +
          '<div class="rejilla">' + qs.map(function (q) {
            var g = estadoDes(q.id), p = puntosDes(q, g);
            return '<a class="tarjeta" href="#/desarrollo/' + q.id + '"><h3>' + U.esc(q.titulo || U.recortar(q.enunciado, 60)) + "</h3><p>" + U.recortar(String(q.enunciado).replace(/\$\$[\s\S]*?\$\$/g, " […] ").replace(/<table[\s\S]*?<\/table>/g, " "), 150) + "</p>" +
              '<div class="chips"><span class="chip chip-tenue">' + p.n + " partes</span>" + U.chipOrigen(q.origen) +
              (p.completa ? '<span class="chip chip-ok">Corregida: ' + notaDes(p) + "</span>"
                : (p.hechas || g.vista) ? '<span class="chip chip-media">En curso: ' + p.hechas + " de " + p.n + "</span>" : "") + "</div></a>";
          }).join("") + "</div>";
      });
      return h;
    },
    detalle: function (q, lista) {
      var g = estadoDes(q.id), p = puntosDes(q, g);
      var i = lista.indexOf(q), ant = i > 0 ? lista[i - 1] : null, sig = i >= 0 && i < lista.length - 1 ? lista[i + 1] : null;
      var h = '<nav class="migas"><a href="#/desarrollo">✍️ Desarrollo</a> › ' + U.esc(q.id) + "</nav><h1>" + U.esc(q.titulo || "Pregunta de desarrollo") + "</h1>" +
        '<article class="pregunta" data-qid="' + q.id + '">' + M.cabecera(q, U.chipOrigen(q.origen)) + M.cuerpo(q) + "</article>" +
        '<section class="tarjeta partes"><h2>Corrección por partes</h2>' +
        '<p class="ayuda">Desarrolla en papel. Abre una parte solo cuando ya la tengas resuelta: verás su solución y marcarás si la tuviste correcta.</p>' +
        '<ol class="lista-partes">' + q.partes.map(function (_, k) { return htmlParte(q, g, k); }).join("") + "</ol>" +
        '<div id="notaDesarrollo">' + htmlPuntaje(q, g) + "</div>";
      if (p.completa) {
        h += (q.comentario ? '<div class="aviso">' + q.comentario + "</div>" : "") + U.fuentes(q.fuente) +
          (q.origen === "variacion" && q.base ? '<p class="q-origen">' + U.chipOrigen(q.origen) + " basada en " + q.base.map(U.cita).join(" ") + "</p>" : "");
      }
      if (p.hechas || g.vista) h += '<div class="fila-botones"><button class="btn btn-sec" data-accion="reiniciarDesarrollo" data-qid="' + q.id + '">Volver a ocultar todo y empezar de nuevo</button></div>';
      h += "</section>" +
        '<nav class="ant-sig">' + (ant ? '<a class="btn btn-sec" href="#/desarrollo/' + ant.id + '">← Anterior</a>' : "<span></span>") +
        (sig ? '<a class="btn btn-sec" href="#/desarrollo/' + sig.id + '">Siguiente →</a>' : "<span></span>") + "</nav>";
      return h;
    },
    acciones: {
      abrirParte: function (el) {
        var g = tocarDes(el.getAttribute("data-qid")), k = Number(el.getAttribute("data-k"));
        g.vista = Math.max(g.vista || 0, k + 1); g.ts = Date.now();
        S.guardar(); P.app.pintar(true);
      },
      juzgarParte: function (el) {
        var g = tocarDes(el.getAttribute("data-qid")), k = Number(el.getAttribute("data-k"));
        g.r[k] = el.getAttribute("data-ok") === "1"; g.vista = Math.max(g.vista || 0, k + 1); g.ts = Date.now();
        S.guardar(); P.app.pintar(true);
      },
      reiniciarDesarrollo: function (el) {
        if (!window.confirm("¿Ocultar todas las soluciones y borrar tu corrección de esta pregunta?")) return;
        delete S.e.desarrollo[el.getAttribute("data-qid")]; S.guardar(); P.app.pintar(true);
      }
    }
  };
})();
