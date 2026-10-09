/* ============================================================================
   vistas-estudio.js — Inicio, Aprender, Memorizar, Laboratorio R, Fuentes,
   Diferencias entre fuentes y Buscador. Todo se deriva de los datos registrados.
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA, U = P.util, S = P.store, G = P.progreso, M = P.motor, C = P.config;
  var V = P.vistas = P.vistas || {};
  function sel() { return P.app.sel(); }

  /* Aviso estándar cuando la prueba elegida no tiene contenido. */
  function avisoPrueba() {
    var s = sel();
    if (s === "todo") return "";
    var pr = P.prueba(s), h = "";
    if (pr.estado !== "definida") {
      h += '<div class="aviso aviso-alerta"><strong>' + U.esc(pr.nombre) + ": " + U.esc(pr.estado) + ".</strong> " + (pr.nota || "") +
        (pr.acumulativa === null ? " <em>No se sabe si es acumulativa.</em>" : "") + "</div>";
    } else if (pr.nota) {
      h += '<div class="aviso">' + pr.nota + "</div>";
    }
    return h;
  }
  P.avisoPrueba = avisoPrueba;

  function vacio(txt) { return '<div class="vacio"><p>' + txt + "</p></div>"; }
  function chipsPruebas(m) {
    return (m.pruebas || []).map(function (p) { return '<span class="chip chip-prueba">' + U.esc(p) + "</span>"; }).join("");
  }

  /* ══════════════════════════════ INICIO ══════════════════════════════ */
  V.inicio = {
    titulo: "Inicio",
    render: function () {
      var s = sel(), r = G.resumen(s), pend = P.temarioPendiente(s);
      var cont = (S.e.ultimo && P.idsModulos(s)[S.e.ultimo] && P.modulo(S.e.ultimo)) || G.sugerido(s);
      var sug = G.sugerido(s), deb = G.debilidades(s).slice(0, 4);
      var h = '<h1>Estudiando para: ' + U.esc(P.app.nombreSel()) + "</h1>" + avisoPrueba();

      if (!r.modulos) {
        h += vacio("Todavía no hay módulos redactados para esta selección. " +
          (pend.length ? "El temario tiene " + pend.length + " módulo(s) pendientes: mira 📚 Aprender." : "No se muestra contenido inventado."));
      } else {
        h += '<div class="acciones-principales">' +
          (cont ? '<a class="btn btn-pri" href="#/aprender/' + cont.id + '">▶ Continuar estudiando<small>' + U.esc(cont.titulo) + "</small></a>" : "") +
          '<a class="btn btn-sec" href="#/examen">📝 Hacer un examen<small>' + S.pref("nExamen") + " preguntas · nota 1–7</small></a>" +
          (s !== "todo" && !S.e.diag[s] && r.banco ? '<a class="btn btn-sec" href="#/examen/diagnostico">🧭 Diagnóstico inicial<small>' +
            C.N_PREGUNTAS_DIAGNOSTICO + " preguntas para ubicar tu nivel</small></a>" : "") + "</div>";

        h += '<section class="fichas" aria-label="Resumen">' +
          ficha("Dominio medio", r.dominioMedio + " %", U.barra(r.dominioMedio)) +
          ficha("Módulos completados", r.hechos + " / " + r.modulos, U.barra(100 * r.hechos / r.modulos)) +
          ficha("Preguntas respondidas", r.distintas + " / " + r.banco, '<small>' + r.respondidas + " intentos · " + U.num(U.pct(r.aciertos, r.respondidas), 1) + " % de acierto</small>") +
          ficha("Último examen", r.ultimo ? U.notaTxt(r.ultimo.ok, r.ultimo.n) : "—", r.ultimo ? "<small>" + r.ultimo.ok + "/" + r.ultimo.n + " · " + U.fecha(r.ultimo.ts) + "</small>" : "<small>Aún no rindes ninguno</small>") +
          ficha("Mejor resultado", r.mejor ? U.notaTxt(r.mejor.ok, r.mejor.n) : "—", r.mejor ? "<small>" + r.mejor.ok + "/" + r.mejor.n + " (" + U.num(U.pct(r.mejor.ok, r.mejor.n), 1) + " %)</small>" : "") +
          "</section>";

        h += '<div class="dos-col"><section class="tarjeta"><h2>Mis debilidades</h2>';
        if (deb.length) {
          h += '<ul class="lista-limpia">' + deb.map(function (x) {
            return '<li><a href="#/aprender/' + x.modulo.id + '">' + U.esc(x.modulo.titulo) + "</a> " + U.barra(x.d.valor, "barra-" + G.estadoDominio(x.d).clase) +
              "<small>" + x.d.valor + " % de dominio · " + x.d.distintas + " preguntas distintas</small></li>";
          }).join("") + '</ul><a class="btn btn-sec" href="#/practicar/repaso">🧠 Repasar mis errores</a>';
        } else h += '<p class="tenue">Aparecerán aquí cuando practiques: se calculan con tus respuestas.</p>';
        h += '</section><section class="tarjeta"><h2>Siguiente módulo sugerido</h2>' +
          (sug ? '<p><a href="#/aprender/' + sug.id + '"><strong>' + U.esc(sug.titulo) + "</strong></a><br>" + U.chipPrioridad(sug.prioridad) + " " + chipsPruebas(sug) + "</p>" +
            '<a class="btn btn-sec" href="#/practicar/modulo/' + sug.id + '">🎯 Practicar este módulo</a>' : '<p class="tenue">—</p>') +
          "</section></div>";
      }

      h += '<section class="tarjeta"><h2>Alcance de lo que ves</h2><ul>' +
        P.datos.prueba.map(function (pr) {
          var t = P.temario(pr.id), listos = t.filter(function (x) { return P.modulo(x.id); }).length;
          return "<li><strong>" + U.esc(pr.nombre) + ":</strong> " + U.esc(pr.estado) + " · " + listos + " de " + t.length + " módulos redactados" +
            (pr.acumulativa === null ? " · acumulativa: sin confirmar" : pr.acumulativa ? " · acumulativa" : "") + "</li>";
        }).join("") + "</ul>" +
        (pend.length ? '<p class="tenue">Los módulos pendientes aparecen en 📚 Aprender marcados como «pendiente»; no se rellenan con contenido inventado.</p>' : "") +
        "<details><summary>Supuestos configurables (js/config.js)</summary><ul>" + C.SUPUESTOS.map(function (x) { return "<li>" + U.esc(x) + "</li>"; }).join("") + "</ul></details></section>";
      return h;
    }
  };
  function ficha(rotulo, valor, extra) {
    return '<div class="ficha"><span class="ficha-rotulo">' + rotulo + '</span><span class="ficha-valor">' + valor + "</span>" + (extra || "") + "</div>";
  }

  /* ═════════════════════════════ APRENDER ═════════════════════════════ */
  var comprueba = {};   // id concepto → {inst, resp, corregida}
  var rutaVista = null; // última ruta de Aprender ya desplazada (para no saltar al redibujar)

  function tarjetaModulo(m) {
    var d = G.dominio(m.id), e = G.estadoDominio(d), nq = P.preguntasDeModulo(m.id, true).length;
    return '<a class="tarjeta tarjeta-modulo" href="#/aprender/' + m.id + '">' +
      '<span class="mod-num">M' + String(m.orden).padStart(2, "0") + "</span>" +
      "<h3>" + (S.e.hechos[m.id] ? "✅ " : "") + U.esc(m.titulo) + "</h3>" +
      (m.descripcion ? "<p>" + U.esc(m.descripcion) + "</p>" : "") +
      '<div class="chips">' + chipsPruebas(m) + U.chipPrioridad(m.prioridad) + '<span class="chip chip-tenue">' + (m.conceptos || []).length + " conceptos · " + nq + " preguntas</span></div>" +
      U.barra(d.valor, "barra-" + e.clase) + "<small>" + e.icono + " " + e.txt + (d.distintas ? " · " + d.valor + " %" : "") + "</small></a>";
  }

  function bloque(clase, titulo, html) {
    return html ? '<div class="bloque bloque-' + clase + '"><h4>' + titulo + "</h4>" + html + "</div>" : "";
  }

  function htmlConcepto(m, c, n) {
    var h = '<section class="concepto" id="' + c.id + '" tabindex="-1"><h3><span class="con-num">' + n + "</span> " + U.esc(c.titulo) + "</h3>";
    h += bloque("simple", "🧠 En simple", c.simple);
    h += bloque("formal", "📐 Definición formal", c.formal);
    h += P.figuras.html(c, "formal");
    h += bloque("ejemplo", "🔢 Ejemplo paso a paso", c.ejemplo);
    h += P.figuras.html(c, "ejemplo");
    if (c.r) {
      h += bloque("r", "💻 Cómo se hace en R", (c.r.nota ? "<p>" + c.r.nota + "</p>" : "") + U.codigoR(c.r.codigo) +
        (c.r.salida ? U.salidaR(c.r.salida) : "") + (c.r.rlab ? '<p><a href="#/rlab/' + c.r.rlab + '">Ver en el Laboratorio R →</a></p>' : ""));
    }
    h += bloque("lectura", "📟 Cómo se lee la salida", c.lectura);
    if (c.errores && c.errores.length) h += bloque("errores", "🚫 Errores frecuentes", "<ul>" + c.errores.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>");
    if (c.quepasa && c.quepasa.length) {
      h += bloque("quepasa", "🤔 ¿Qué pasa si…?", c.quepasa.map(function (x) {
        return "<details><summary>" + x.si + "</summary><div>" + x.entonces + "</div></details>";
      }).join(""));
    }
    if (c.memoriza) h += '<div class="bloque bloque-memoriza"><h4>⚠️ Memoriza este dato</h4>' + c.memoriza + "</div>";
    if (c.externo && c.externo.length) {
      h += bloque("externo", "🌐 Para saber más (fuente externa, no evaluable)", c.externo.map(function (x) {
        return "<div>" + (x.html || "") + U.fuentes([{ id: "EXT", titulo: x.titulo, url: x.url, consultado: x.consultado }]) + "</div>";
      }).join(""));
    }
    if (c.comprueba) {
      var st = comprueba[c.id];
      if (!st) {
        var q = Object.assign({ id: c.id + "-cmp", modulo: m.id, tipo: "alternativas", dificultad: 1, origen: "nueva", fuente: c.fuente }, c.comprueba);
        st = comprueba[c.id] = { inst: M.preparar(q), resp: null, corregida: false };
        st.resp = M.vacia(st.inst);
      }
      h += '<div class="bloque bloque-comprueba" data-concepto="' + c.id + '"><h4>✅ Comprueba</h4>' + M.cuerpo(st.inst.q) +
        M.respuesta(st.inst, st.resp, st.corregida) +
        (st.corregida ? M.retro(st.inst, st.resp) + '<button class="btn btn-sec" data-accion="reintentarComprueba" data-concepto="' + c.id + '">Intentar de nuevo</button>'
          : '<button class="btn btn-pri" data-accion="revisarComprueba" data-concepto="' + c.id + '">Revisar</button>') + "</div>";
    }
    h += U.fuentes(c.fuente) + "</section>";
    return h;
  }

  V.aprender = {
    titulo: "Aprender",
    render: function (args) {
      var s = sel(), mods = P.modulosDe(s);
      if (args[0]) {
        var m = P.modulo(args[0]);
        if (!m) return "<h1>Módulo no encontrado</h1>" + vacio('El módulo «' + U.esc(args[0]) + '» no existe (todavía). <a href="#/aprender">Volver a Aprender</a>');
        return this.modulo(m, mods);
      }
      var pend = P.temarioPendiente(s);
      var h = "<h1>📚 Aprender</h1>" + avisoPrueba() +
        '<p class="bajada">Cada módulo sigue el mismo camino: en simple → definición formal → ejemplo → R → lectura de la salida → comprueba → fuente.</p>';
      h += mods.length ? '<div class="rejilla">' + mods.map(tarjetaModulo).join("") + "</div>" : vacio("No hay módulos redactados para esta selección.");
      if (pend.length) {
        h += '<h2>Temario pendiente de redactar <span class="chip chip-tenue">' + pend.length + '</span></h2><p class="tenue">Figuran en el mapa de contenidos del curso, pero su material de estudio aún no se escribe (Fases 5 y 7 del ROADMAP).</p>' +
          '<ul class="lista-pendientes">' + pend.map(function (t) {
            return "<li><span class=\"mod-num\">" + U.esc(t.codigo || "") + "</span> " + U.esc(t.titulo) + " " + (t.prioridad ? U.chipPrioridad(t.prioridad) : "") +
              (t.nota ? ' <small class="tenue">' + U.esc(t.nota) + "</small>" : "") + "</li>";
          }).join("") + "</ul>";
      }
      /* Temas vistos en pruebas pasadas sin clase subida: se informan, no se enseñan. */
      P.datos.prueba.forEach(function (pr) {
        if ((s !== "todo" && s !== pr.id) || !pr.observado || !pr.observado.length) return;
        h += "<h2>" + U.esc(pr.nombre) + ': temas evaluados antes, sin clase subida</h2><p class="tenue">Solo se registra qué se preguntó. No hay material de estudio hasta que existan las clases.</p><ul class="lista-pendientes">' +
          pr.observado.map(function (t) {
            return '<li><span class="mod-num">' + U.esc(t.codigo || "") + "</span> " + U.esc(t.titulo) + " " + (t.fuente || []).map(U.cita).join(" ") + "</li>";
          }).join("") + "</ul>";
      });
      return h;
    },
    modulo: function (m, mods) {
      var lista = mods.some(function (x) { return x.id === m.id; }) ? mods : P.datos.modulo;
      var i = lista.findIndex(function (x) { return x.id === m.id; });
      var ant = i > 0 ? lista[i - 1] : null, sig = i < lista.length - 1 ? lista[i + 1] : null;
      var d = G.dominio(m.id), e = G.estadoDominio(d), hecho = !!S.e.hechos[m.id];
      var h = '<nav class="migas"><a href="#/aprender">📚 Aprender</a> › M' + String(m.orden).padStart(2, "0") + "</nav>" +
        "<h1>" + U.esc(m.titulo) + "</h1>" +
        '<div class="chips">' + chipsPruebas(m) + U.chipPrioridad(m.prioridad) + '<span class="chip chip-tenue">' + e.icono + " " + e.txt + (d.distintas ? " · " + d.valor + " %" : "") + "</span></div>" +
        (m.descripcion ? '<p class="bajada">' + U.esc(m.descripcion) + "</p>" : "") +
        (m.aviso ? '<div class="aviso aviso-alerta">' + m.aviso + "</div>" : "") +
        U.fuentes(m.fuentes, "Corresponde a") +
        '<div class="avance-modulo"><span>Módulo ' + (i + 1) + " de " + lista.length + "</span>" + U.barra(100 * (i + 1) / lista.length) + "</div>";

      h += '<nav class="indice" aria-label="Índice del módulo"><strong>En este módulo</strong><ol>' + (m.conceptos || []).map(function (c) {
        return '<li><a href="#/aprender/' + m.id + "/" + c.id + '">' + U.esc(c.titulo) + "</a></li>";
      }).join("") + (m.cuando ? '<li><a href="#/aprender/' + m.id + '/sec-cuando">¿Cuándo usar qué?</a></li>' : "") + "</ol></nav>";

      h += (m.conceptos || []).map(function (c, k) { return htmlConcepto(m, c, k + 1); }).join("");

      if (m.cuando) h += '<section class="concepto" id="sec-cuando" tabindex="-1"><h3>🧭 ¿Cuándo usar qué?</h3>' + m.cuando + "</section>";
      if (m.errores && m.errores.length) {
        h += '<section class="concepto"><h3>🚫 Errores frecuentes del módulo</h3><ul>' + m.errores.map(function (x) {
          return "<li>" + x.texto + (x.fuente ? " " + x.fuente.map(U.cita).join(" ") : "") + "</li>";
        }).join("") + "</ul></section>";
      }

      h += '<div class="cierre-modulo">' +
        '<button class="btn ' + (hecho ? "btn-sec" : "btn-pri") + '" data-accion="alternarHecho" data-modulo="' + m.id + '">' + (hecho ? "✅ Completado (desmarcar)" : "Marcar módulo como completado") + "</button>" +
        '<a class="btn btn-sec" href="#/practicar/modulo/' + m.id + '">🎯 Practicar este módulo</a>' +
        '<a class="btn btn-sec" href="#/memorizar/' + m.id + '">🧾 Memorizar</a></div>' +
        '<nav class="ant-sig">' + (ant ? '<a class="btn btn-sec" href="#/aprender/' + ant.id + '">← ' + U.esc(ant.titulo) + "</a>" : "<span></span>") +
        (sig ? '<a class="btn btn-sec" href="#/aprender/' + sig.id + '">' + U.esc(sig.titulo) + " →</a>" : "<span></span>") + "</nav>";
      return h;
    },
    montar: function (raiz, args) {
      if (args[0] && P.modulo(args[0])) {
        P.figuras.montar(raiz, P.modulo(args[0]));
        S.e.ultimo = args[0]; S.guardar();
        /* #/aprender/<módulo>/<concepto> lleva directo a ese concepto (lo usan el índice, el buscador y las citas). */
        var clave = args.join("/");
        if (args[1] && clave !== rutaVista) { var d = document.getElementById(args[1]); if (d) setTimeout(function () { d.scrollIntoView(); d.focus({ preventScroll: true }); }, 0); }
        rutaVista = clave;
      }
    },
    salir: function () { rutaVista = null; },
    acciones: {
      alternarHecho: function (el) {
        var id = el.getAttribute("data-modulo");
        if (S.e.hechos[id]) delete S.e.hechos[id]; else S.e.hechos[id] = Date.now();
        S.guardar(); P.app.pintar(true);
      },
      revisarComprueba: function (el) {
        var id = el.getAttribute("data-concepto"), st = comprueba[id];
        st.resp = M.leer(el.closest(".bloque-comprueba"), st.inst);
        if (!M.respondida(st.inst, st.resp)) return;
        st.corregida = true; P.app.pintar(true);
      },
      reintentarComprueba: function (el) {
        delete comprueba[el.getAttribute("data-concepto")]; P.app.pintar(true);
      }
    }
  };

  /* ════════════════════════════ MEMORIZAR ═════════════════════════════ */
  var CATEGORIAS = [
    { id: "formula", txt: "Fórmulas", icono: "📐" },
    { id: "umbral", txt: "Umbrales y criterios de decisión", icono: "🎚️" },
    { id: "decision", txt: "Tablas de decisión", icono: "🧭" },
    { id: "funcion-R", txt: "Funciones de R y qué devuelven", icono: "💻" },
    { id: "salida", txt: "Interpretación de salidas", icono: "📟" }
  ];
  var tarjetas = { i: 0, vuelta: false, orden: null, clave: "" };

  function itemsMemorizar(mid) {
    var set = P.idsModulos(sel());
    return P.datos.memorizar.filter(function (x) { return set[x.modulo] && (!mid || x.modulo === mid); });
  }
  function selectorModulo(valor, accion, todos) {
    return '<label class="campo">Módulo <select data-cambio="' + accion + '"><option value="">' + (todos || "Todos") + "</option>" +
      P.modulosDe(sel()).map(function (m) {
        return '<option value="' + m.id + '"' + (m.id === valor ? " selected" : "") + ">M" + String(m.orden).padStart(2, "0") + " · " + U.esc(m.titulo) + "</option>";
      }).join("") + "</select></label>";
  }

  V.memorizar = {
    titulo: "Memorizar",
    render: function (args) {
      if (args[0] === "tarjetas") return this.tarjetas(args[1] || "");
      var mid = args[0] || "", items = itemsMemorizar(mid), flash = items.filter(function (x) { return x.categoria === "flashcard"; });
      var h = "<h1>🧾 Memorizar</h1>" + avisoPrueba() +
        '<p class="bajada">Resumen de última hora: fórmulas, umbrales, funciones de R y lectura de salidas. Cada ítem dice de dónde sale.</p>' +
        '<div class="barra-filtros no-imprimir">' + selectorModulo(mid, "filtrarModulo") +
        '<button class="btn btn-sec" data-accion="imprimir">🖨️ Imprimir</button>' +
        (flash.length ? '<a class="btn btn-pri" href="#/memorizar/tarjetas/' + mid + '">🃏 Tarjetas (' + flash.length + ")</a>" : "") + "</div>";
      if (!items.length) return h + vacio("No hay ítems para memorizar en esta selección.");
      CATEGORIAS.forEach(function (cat) {
        var de = items.filter(function (x) { return x.categoria === cat.id; });
        if (!de.length) return;
        h += '<section class="mem-seccion"><h2>' + cat.icono + " " + cat.txt + '</h2><table class="tabla tabla-mem"><tbody>' + de.map(function (x) {
          var m = P.modulo(x.modulo);
          return "<tr><th scope=\"row\">" + x.titulo + '<small class="tenue">' + U.esc(m ? m.titulo : "") + "</small></th><td>" + x.contenido + U.fuentes(x.fuente) + "</td></tr>";
        }).join("") + "</tbody></table></section>";
      });
      return h;
    },
    tarjetas: function (mid) {
      var cartas = itemsMemorizar(mid).filter(function (x) { return x.categoria === "flashcard"; });
      var clave = sel() + "|" + mid + "|" + cartas.length;
      if (tarjetas.clave !== clave) tarjetas = { i: 0, vuelta: false, orden: cartas.map(function (_, i) { return i; }), clave: clave };
      var h = '<nav class="migas"><a href="#/memorizar/' + mid + '">🧾 Memorizar</a> › Tarjetas</nav><h1>🃏 Tarjetas</h1>';
      if (!cartas.length) return h + vacio("No hay tarjetas en esta selección.");
      var c = cartas[tarjetas.orden[tarjetas.i]];
      h += '<p class="tenue">Tarjeta ' + (tarjetas.i + 1) + " de " + cartas.length + "</p>" +
        '<div class="carta' + (tarjetas.vuelta ? " vuelta" : "") + '"><div class="carta-frente">' + c.frente + "</div>" +
        (tarjetas.vuelta ? '<div class="carta-reverso">' + c.reverso + U.fuentes(c.fuente) + "</div>" : "") + "</div>" +
        '<div class="fila-botones">' +
        '<button class="btn btn-sec" data-accion="carta" data-paso="-1"' + (tarjetas.i === 0 ? " disabled" : "") + ">← Anterior</button>" +
        '<button class="btn btn-pri" data-accion="voltear">' + (tarjetas.vuelta ? "Ocultar respuesta" : "Mostrar respuesta") + "</button>" +
        '<button class="btn btn-sec" data-accion="carta" data-paso="1"' + (tarjetas.i >= cartas.length - 1 ? " disabled" : "") + ">Siguiente →</button>" +
        '<button class="btn btn-sec" data-accion="barajarCartas">🔀 Barajar</button></div>';
      return h;
    },
    acciones: {
      filtrarModulo: function (el) { P.app.ir("memorizar/" + el.value); },
      voltear: function () { tarjetas.vuelta = !tarjetas.vuelta; P.app.pintar(true); },
      carta: function (el) {
        tarjetas.i = Math.max(0, Math.min(tarjetas.orden.length - 1, tarjetas.i + Number(el.getAttribute("data-paso"))));
        tarjetas.vuelta = false; P.app.pintar(true);
      },
      barajarCartas: function () { tarjetas.orden = U.barajar(tarjetas.orden); tarjetas.i = 0; tarjetas.vuelta = false; P.app.pintar(true); }
    }
  };

  /* ═══════════════════════════ LABORATORIO R ══════════════════════════ */
  function etiquetaSalida(x) {
    if (!x.salida) return "";
    return x.origenSalida === "curso"
      ? '<span class="chip chip-tenue">Salida tomada del material del curso</span>'
      : '<span class="chip chip-ok">Salida real, ejecutada en ' + U.esc(x.version || "R") + "</span>";
  }
  V.rlab = {
    titulo: "Laboratorio R",
    render: function (args) {
      var set = P.idsModulos(sel());
      var items = P.datos.rlab.filter(function (x) { return set[x.modulo]; });
      if (args[0]) {
        var x = P.idx.rlab[args[0]];
        if (!x) return "<h1>Receta no encontrada</h1>" + vacio('<a href="#/rlab">Volver al Laboratorio R</a>');
        var i = items.indexOf(x), ant = i > 0 ? items[i - 1] : null, sig = i >= 0 && i < items.length - 1 ? items[i + 1] : null, m = P.modulo(x.modulo);
        return '<nav class="migas"><a href="#/rlab">💻 Laboratorio R</a> › ' + U.esc(x.tema) + "</nav><h1>" + U.esc(x.titulo) + "</h1>" +
          '<div class="chips">' + (m ? '<a class="chip chip-tenue" href="#/aprender/' + m.id + '">' + U.esc(m.titulo) + "</a>" : "") + etiquetaSalida(x) + "</div>" +
          (x.descripcion ? '<p class="bajada">' + x.descripcion + "</p>" : "") +
          (x.aviso ? '<div class="aviso aviso-alerta">' + x.aviso + "</div>" : "") +
          "<h2>Código</h2>" + U.codigoR(x.codigo) +
          (x.salida ? "<h2>Salida</h2>" + U.salidaR(x.salida) : "") +
          (x.lectura ? '<h2>Cómo se lee</h2><div class="lectura">' + x.lectura + "</div>" : "") +
          U.fuentes(x.fuente) +
          '<nav class="ant-sig">' + (ant ? '<a class="btn btn-sec" href="#/rlab/' + ant.id + '">← ' + U.esc(ant.titulo) + "</a>" : "<span></span>") +
          (sig ? '<a class="btn btn-sec" href="#/rlab/' + sig.id + '">' + U.esc(sig.titulo) + " →</a>" : "<span></span>") + "</nav>";
      }
      var h = "<h1>💻 Laboratorio R</h1>" + avisoPrueba() +
        '<p class="bajada">Recetario del curso con su salida real y cómo leerla. Aquí no se ejecuta R: se practica <em>leer</em> código y salidas, que es lo que piden las pruebas.</p>';
      if (!items.length) return h + vacio("No hay recetas de R para esta selección.");
      var temas = {};
      items.forEach(function (x) { (temas[x.tema] = temas[x.tema] || []).push(x); });
      Object.keys(temas).forEach(function (t) {
        h += "<h2>" + U.esc(t) + '</h2><div class="rejilla">' + temas[t].map(function (x) {
          return '<a class="tarjeta" href="#/rlab/' + x.id + '"><h3>' + U.esc(x.titulo) + "</h3><p>" + U.recortar(x.descripcion, 140) + "</p>" +
            '<div class="chips">' + (x.funciones || []).map(function (f) { return '<code class="chip chip-codigo">' + U.esc(f) + "</code>"; }).join("") + "</div></a>";
        }).join("") + "</div>";
      });
      return h;
    }
  };

  /* ══════════════════════════════ FUENTES ═════════════════════════════ */
  var TIPOS_FUENTE = { clase: "Clases", ayudantia: "Ayudantías", script: "Scripts R", prueba: "Pruebas y pautas", ejercicios: "Ejercicios de preparación" };

  /* Cuenta dónde se cita cada fuente (una sola pasada, cacheada). */
  var usoFuentes = null;
  function calcularUso() {
    if (usoFuentes) return usoFuentes;
    var uso = {};
    function sumar(lista, que, ref) {
      (lista || []).forEach(function (f) {
        var u = uso[f.id] || (uso[f.id] = { concepto: [], pregunta: 0, memorizar: 0, rlab: [] });
        if (que === "pregunta" || que === "memorizar") u[que]++; else u[que].push(ref);
      });
    }
    P.datos.modulo.forEach(function (m) { (m.conceptos || []).forEach(function (c) { sumar(c.fuente, "concepto", { m: m, c: c }); }); });
    P.datos.pregunta.forEach(function (q) { if (!q.retirada) sumar(q.fuente, "pregunta"); });
    P.datos.memorizar.forEach(function (x) { sumar(x.fuente, "memorizar"); });
    P.datos.rlab.forEach(function (x) { sumar(x.fuente, "rlab", x); });
    return (usoFuentes = uso);
  }

  V.fuentes = {
    titulo: "Fuentes",
    render: function (args) {
      var uso = calcularUso();
      if (args[0]) {
        var f = P.fuente(args[0]);
        if (!f) return "<h1>Fuente no registrada</h1>" + vacio("El ID «" + U.esc(args[0]) + '» no está en data/fuentes.js. <a href="#/fuentes">Ver todas</a>');
        var u = uso[f.id] || { concepto: [], pregunta: 0, memorizar: 0, rlab: [] };
        return '<nav class="migas"><a href="#/fuentes">📖 Fuentes</a> › ' + U.esc(f.id) + "</nav><h1>" + U.esc(f.id) + " · " + U.esc(f.titulo) + "</h1>" +
          '<table class="tabla"><tbody>' +
          "<tr><th>Tipo</th><td>" + U.esc(TIPOS_FUENTE[f.tipo] || f.tipo) + "</td></tr>" +
          "<tr><th>Prueba(s)</th><td>" + U.esc((f.pruebas || []).join(", ") || "—") + "</td></tr>" +
          "<tr><th>Tamaño</th><td>" + U.esc(f.tamano || "—") + "</td></tr>" +
          "<tr><th>Estado</th><td>" + U.esc(f.estado || "—") + "</td></tr>" +
          "<tr><th>Archivo</th><td><code>" + U.esc(f.ruta) + '</code><br><a class="btn btn-sec" target="_blank" rel="noopener" href="' + U.enlaceArchivo(f) + '">Abrir archivo</a>' +
          (/\.pdf$/i.test(f.ruta) ? "" : ' <small class="tenue">(PPT/R: se abre o descarga según tu equipo; ubica la slide o línea citada)</small>') + "</td></tr></tbody></table>" +
          "<h2>Dónde se usa en la plataforma</h2><ul>" +
          u.concepto.map(function (x) { return '<li>Concepto: <a href="#/aprender/' + x.m.id + "/" + x.c.id + '">' + U.esc(x.c.titulo) + "</a></li>"; }).join("") +
          u.rlab.map(function (x) { return '<li>Laboratorio R: <a href="#/rlab/' + x.id + '">' + U.esc(x.titulo) + "</a></li>"; }).join("") +
          "<li>" + u.pregunta + " pregunta(s) y " + u.memorizar + " ítem(s) de Memorizar la citan.</li></ul>";
      }
      var s = sel();
      var lista = P.datos.fuente.filter(function (f) { return s === "todo" || (f.pruebas || []).indexOf(s) >= 0; });
      var h = "<h1>📖 Fuentes</h1><p class=\"bajada\">Inventario del material del curso con el ID que usan las citas (📎). Viene de <code>CONTENIDOS.md</code> §1.</p>";
      if (!lista.length) return h + vacio("No hay fuentes asociadas a esta prueba.");
      Object.keys(TIPOS_FUENTE).forEach(function (t) {
        var de = lista.filter(function (f) { return f.tipo === t; });
        if (!de.length) return;
        h += "<h2>" + TIPOS_FUENTE[t] + '</h2><div class="tabla-scroll"><table class="tabla"><thead><tr><th>ID</th><th>Documento</th><th>Prueba</th><th>Tamaño</th><th>Estado</th><th>Citas</th></tr></thead><tbody>' +
          de.map(function (f) {
            var u = uso[f.id], n = u ? u.concepto.length + u.pregunta + u.memorizar + u.rlab.length : 0;
            return '<tr><td><a href="#/fuentes/' + encodeURIComponent(f.id) + '"><strong>' + U.esc(f.id) + "</strong></a></td><td>" + U.esc(f.titulo) + "</td><td>" +
              U.esc((f.pruebas || []).join(", ")) + "</td><td>" + U.esc(f.tamano || "") + "</td><td>" + U.esc(f.estado || "") + "</td><td>" + n + "</td></tr>";
          }).join("") + "</tbody></table></div>";
      });
      return h;
    }
  };

  /* ═════════════════════ DIFERENCIAS ENTRE FUENTES ════════════════════ */
  V.diferencias = {
    titulo: "Diferencias entre fuentes",
    render: function () {
      var set = P.idsModulos(sel());
      var lista = P.datos.diferencia.filter(function (d) {
        return !d.modulos || !d.modulos.length || d.modulos.some(function (m) { return set[m]; });
      });
      var h = "<h1>⚠️ Diferencias entre fuentes</h1>" +
        '<p class="bajada">Cuando una slide, una pauta y un script no dicen lo mismo, aquí se muestra tal cual: no se concilia por cuenta propia. Regla del proyecto: <strong>pautas &gt; slides &gt; scripts</strong>, salvo que el docente indique otra cosa.</p>';
      if (!lista.length) return h + vacio("No hay diferencias registradas para esta selección.");
      [["criterio", "Criterios y umbrales que difieren"], ["error", "Errores internos de una fuente (verificados)"], ["notacion", "Notación y código"]].forEach(function (g) {
        var de = lista.filter(function (d) { return d.tipo === g[0]; });
        if (!de.length) return;
        h += "<h2>" + g[1] + "</h2>" + de.map(function (d) {
          return '<article class="tarjeta diferencia"><h3>' + d.tema + "</h3><ul>" + d.fuentes.map(function (f) {
            return "<li>" + U.cita(f) + " — " + f.dice + "</li>";
          }).join("") + "</ul>" + (d.verificacion ? '<p><strong>Verificación:</strong> ' + d.verificacion + "</p>" : "") +
            (d.convencion ? '<p class="convencion"><strong>Qué usa la plataforma:</strong> ' + d.convencion + "</p>" : "") + "</article>";
        }).join("");
      });
      return h;
    }
  };

  /* ══════════════════════════════ BUSCAR ══════════════════════════════ */
  V.buscar = {
    titulo: "Buscar",
    render: function (args) {
      var q = args[0] || "", pag = Number(args[1]) || 1, n = U.sinTildes(q), res = [];
      var set = P.idsModulos(sel());
      function coincide() { for (var i = 0; i < arguments.length; i++) if (arguments[i] && U.sinTildes(U.plano(arguments[i])).indexOf(n) >= 0) return true; return false; }
      if (n.length >= 2) {
        P.modulosDe(sel()).forEach(function (m) {
          (m.conceptos || []).forEach(function (c) {
            if (coincide(c.titulo, c.simple, c.formal, c.ejemplo, c.lectura, c.memoriza, c.r && c.r.codigo))
              res.push({ tipo: "📚 Concepto", titulo: c.titulo, sub: m.titulo, ruta: "aprender/" + m.id + "/" + c.id });
          });
        });
        P.datos.memorizar.forEach(function (x) {
          if (set[x.modulo] && coincide(x.titulo, x.contenido, x.frente, x.reverso))
            res.push({ tipo: "🧾 Memorizar", titulo: U.plano(x.titulo || x.frente), sub: U.recortar(x.contenido || x.reverso, 110), ruta: "memorizar/" + x.modulo });
        });
        P.datos.rlab.forEach(function (x) {
          if (set[x.modulo] && coincide(x.titulo, x.descripcion, x.codigo, x.lectura))
            res.push({ tipo: "💻 Laboratorio R", titulo: x.titulo, sub: U.recortar(x.descripcion, 110), ruta: "rlab/" + x.id });
        });
        P.preguntas({ prueba: sel(), soloDesarrollo: true }).forEach(function (x) {
          if (coincide(x.titulo, x.enunciado)) res.push({ tipo: "✍️ Desarrollo", titulo: x.titulo || U.recortar(x.enunciado, 70), sub: U.recortar(x.enunciado, 110), ruta: "desarrollo/" + x.id });
        });
        P.datos.fuente.forEach(function (f) {
          if (coincide(f.id, f.titulo)) res.push({ tipo: "📖 Fuente", titulo: f.id + " · " + f.titulo, sub: f.estado || "", ruta: "fuentes/" + encodeURIComponent(f.id) });
        });
      }
      var pg = U.paginar(res, pag);
      var h = "<h1>Buscar: «" + U.esc(q) + "»</h1>";
      if (n.length < 2) return h + vacio("Escribe al menos 2 letras.");
      if (!res.length) return h + vacio("Sin resultados en " + U.esc(P.app.nombreSel()) + ". Prueba con otra palabra o cambia la prueba seleccionada.");
      h += '<p class="tenue">' + res.length + " resultado(s) en " + U.esc(P.app.nombreSel()) + '.</p><ul class="resultados">' + pg.items.map(function (r) {
        return '<li><a href="#/' + r.ruta + '"><span class="chip chip-tenue">' + r.tipo + "</span> <strong>" + U.esc(r.titulo) + "</strong><small>" + U.esc(r.sub) + "</small></a></li>";
      }).join("") + "</ul>" + U.paginador(pg, "paginaBusqueda");
      return h;
    },
    acciones: {
      paginaBusqueda: function (el) { P.app.ir("buscar/" + encodeURIComponent(P.app.ruta().args[0] || "") + "/" + el.getAttribute("data-pagina")); }
    }
  };
})();
