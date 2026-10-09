/* ============================================================================
   motor.js — Motor de preguntas: prepara (baraja), dibuja, lee la respuesta,
   corrige y arma la retroalimentación de TODOS los tipos cerrados.
   Lo usan Practicar, Examen, Desafío, Simulacro, Diagnóstico y los "Comprueba".

   Forma de respuesta (se deduce de los campos, no solo del tipo):
     unica   → opciones + correcta (índice)
     multi   → opciones + correcta (arreglo de índices)
     vf      → correcta true/false
     numero  → respuesta (número) + tolerancia
     huecos  → huecos: [[aceptadas…], …] para cada ___ del código
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA, U = P.util, M = {};
  P.motor = M;

  M.forma = function (q) {
    if (q.tipo === "desarrollo") return "desarrollo";
    if (q.tipo === "vf") return "vf";
    if (Array.isArray(q.huecos)) return "huecos";
    if (typeof q.respuesta === "number") return "numero";
    if (Array.isArray(q.correcta)) return "multi";
    return "unica";
  };

  /* Crea una instancia lista para mostrar. Las alternativas se barajan guardando el
     orden: la corrección siempre compara índices ORIGINALES, así "correcta" no se pierde. */
  M.preparar = function (q) {
    var forma = M.forma(q), orden = null;
    if (forma === "unica" || forma === "multi") {
      orden = q.opciones.map(function (_, i) { return i; });
      if (!q.ordenFijo) orden = U.barajar(orden);
    }
    return { q: q, forma: forma, orden: orden };
  };

  M.vacia = function (inst) {
    if (inst.forma === "multi") return [];
    if (inst.forma === "huecos") return inst.q.huecos.map(function () { return ""; });
    if (inst.forma === "numero") return "";
    return null;
  };

  M.respondida = function (inst, r) {
    switch (inst.forma) {
      case "multi": return Array.isArray(r) && r.length > 0;
      case "huecos": return Array.isArray(r) && r.every(function (x) { return String(x).trim() !== ""; });
      case "numero": return String(r == null ? "" : r).trim() !== "";
      default: return r !== null && r !== undefined;
    }
  };

  function aNumero(txt) {
    var s = String(txt).trim().replace(/\s/g, "").replace(/−/g, "-");
    if (s.indexOf(",") >= 0 && s.indexOf(".") >= 0) s = s.replace(/\./g, "").replace(",", ".");
    else s = s.replace(",", ".");
    return s === "" ? NaN : Number(s);
  }
  M.aNumero = aNumero;
  function normCodigo(s) { return String(s).replace(/\s+/g, "").replace(/'/g, '"'); }

  M.corregir = function (inst, r) {
    var q = inst.q;
    if (!M.respondida(inst, r)) return false;
    switch (inst.forma) {
      case "unica": return r === q.correcta;
      case "vf": return r === q.correcta;
      case "multi":
        var a = r.slice().sort(), b = q.correcta.slice().sort();
        return a.length === b.length && a.every(function (x, i) { return x === b[i]; });
      case "numero":
        var x = aNumero(r), tol = q.tolerancia == null ? 0.01 : q.tolerancia;
        return isFinite(x) && Math.abs(x - q.respuesta) <= tol + 1e-12;
      case "huecos":
        return q.huecos.every(function (acept, i) {
          var dado = normCodigo(r[i]);
          return acept.some(function (op) { return normCodigo(op) === dado; });
        });
    }
    return false;
  };

  /* ── Dibujo ────────────────────────────────────────────────────────── */
  M.cabecera = function (q, extra) {
    var t = P.TIPOS_PREGUNTA[q.tipo] || { nombre: q.tipo, icono: "❓" };
    var m = P.modulo(q.modulo);
    return '<div class="q-meta"><span class="chip">' + t.icono + " " + U.esc(t.nombre) + "</span>" +
      '<span class="chip chip-tenue">' + U.esc(m ? m.titulo : q.modulo) + "</span>" +
      '<span class="chip chip-tenue" title="Dificultad">' + "●".repeat(q.dificultad || 1) + "○".repeat(3 - (q.dificultad || 1)) + "</span>" +
      (q.desafio ? '<span class="chip chip-alta">🔥 desafío</span>' : "") + (extra || "") + "</div>";
  };

  M.cuerpo = function (q) {
    return '<div class="q-enunciado">' + q.enunciado + "</div>" +
      (q.codigoR ? U.codigoR(q.codigoR) : "") +
      (q.salidaR ? U.salidaR(q.salidaR) : "");
  };

  /* Zona de respuesta. Si "corregida" es true se bloquea y se pinta lo correcto/incorrecto. */
  M.respuesta = function (inst, r, corregida) {
    var q = inst.q, dis = corregida ? " disabled" : "", h = "";
    if (inst.forma === "unica" || inst.forma === "multi") {
      var multi = inst.forma === "multi";
      var correctas = multi ? q.correcta : [q.correcta];
      var elegidas = multi ? (r || []) : (r == null ? [] : [r]);
      h += '<fieldset class="opciones"><legend class="oculto">' + (multi ? "Marca todas las correctas" : "Elige una alternativa") + "</legend>";
      if (multi) h += '<p class="ayuda">Puede haber más de una correcta: marca todas.</p>';
      inst.orden.forEach(function (oi, pos) {
        var esCorr = correctas.indexOf(oi) >= 0, sel = elegidas.indexOf(oi) >= 0, cls = "opcion";
        if (corregida) cls += esCorr ? " es-correcta" : (sel ? " es-incorrecta" : "");
        if (sel) cls += " elegida";
        h += '<label class="' + cls + '"><input type="' + (multi ? "checkbox" : "radio") + '" name="resp" value="' + oi + '"' +
          (sel ? " checked" : "") + dis + '><span class="letra">' + String.fromCharCode(65 + pos) + '</span><span class="txt">' + q.opciones[oi] +
          (corregida && q.distractores && q.distractores[oi] ? '<small class="porque">' + (esCorr ? "✔ " : "✘ ") + q.distractores[oi] + "</small>" : "") +
          "</span></label>";
      });
      h += "</fieldset>";
    } else if (inst.forma === "vf") {
      h += '<fieldset class="opciones opciones-vf"><legend class="oculto">Verdadero o falso</legend>';
      [true, false].forEach(function (v) {
        var sel = r === v, cls = "opcion";
        if (corregida) cls += q.correcta === v ? " es-correcta" : (sel ? " es-incorrecta" : "");
        if (sel) cls += " elegida";
        h += '<label class="' + cls + '"><input type="radio" name="resp" value="' + (v ? "V" : "F") + '"' + (sel ? " checked" : "") + dis +
          '><span class="letra">' + (v ? "V" : "F") + '</span><span class="txt">' + (v ? "Verdadero" : "Falso") + "</span></label>";
      });
      h += "</fieldset>";
    } else if (inst.forma === "numero") {
      h += '<label class="campo-num">Tu resultado' + (q.unidad ? " (" + U.esc(q.unidad) + ")" : "") +
        ': <input type="text" inputmode="decimal" name="resp" autocomplete="off" value="' + U.esc(r || "") + '"' + dis +
        ' placeholder="p. ej. 0,84"></label>' +
        '<p class="ayuda">Usa coma o punto decimal. Tolerancia: ±' + U.num(q.tolerancia == null ? 0.01 : q.tolerancia, 4) + ".</p>";
    } else if (inst.forma === "huecos") {
      h += '<div class="huecos">';
      q.huecos.forEach(function (_, i) {
        h += '<label class="campo-hueco">Hueco ' + (i + 1) + ': <input type="text" name="hueco' + i + '" autocomplete="off" autocapitalize="off" spellcheck="false" value="' +
          U.esc((r && r[i]) || "") + '"' + dis + "></label>";
      });
      h += '</div><p class="ayuda">Escribe exactamente lo que va en cada <code>_____</code> (R distingue mayúsculas).</p>';
    }
    return '<div class="q-resp">' + h + "</div>";
  };

  /* Lee la respuesta desde el DOM (índices ORIGINALES de las opciones). */
  M.leer = function (cont, inst) {
    var ins;
    switch (inst.forma) {
      case "unica":
        ins = cont.querySelector('input[name="resp"]:checked');
        return ins ? Number(ins.value) : null;
      case "multi":
        return Array.prototype.map.call(cont.querySelectorAll('input[name="resp"]:checked'), function (x) { return Number(x.value); });
      case "vf":
        ins = cont.querySelector('input[name="resp"]:checked');
        return ins ? ins.value === "V" : null;
      case "numero":
        ins = cont.querySelector('input[name="resp"]');
        return ins ? ins.value : "";
      case "huecos":
        return inst.q.huecos.map(function (_, i) {
          var x = cont.querySelector('input[name="hueco' + i + '"]'); return x ? x.value : "";
        });
    }
    return null;
  };

  M.correctaTxt = function (inst) {
    var q = inst.q;
    switch (inst.forma) {
      case "unica": return String.fromCharCode(65 + inst.orden.indexOf(q.correcta)) + ") " + q.opciones[q.correcta];
      case "multi": return q.correcta.map(function (c) { return String.fromCharCode(65 + inst.orden.indexOf(c)); }).sort().join(", ");
      case "vf": return q.correcta ? "Verdadero" : "Falso";
      case "numero": return U.num(q.respuesta, 4) + (q.unidad ? " " + U.esc(q.unidad) : "");
      case "huecos": return q.huecos.map(function (a) { return "<code>" + U.esc(a[0]) + "</code>"; }).join(" · ");
    }
    return "";
  };

  /* Retroalimentación: veredicto, respuesta correcta, por qué, fuente y origen. */
  M.retro = function (inst, r) {
    var q = inst.q, ok = M.corregir(inst, r);
    var h = '<div class="retro ' + (ok ? "retro-ok" : "retro-mal") + '" role="status">' +
      '<p class="veredicto">' + (ok ? "✅ Correcto" : "❌ Incorrecto") +
      (ok ? "" : ' <span class="resp-correcta">· Respuesta correcta: ' + M.correctaTxt(inst) + "</span>") + "</p>";
    if (q.explicacion) h += '<div class="explicacion"><strong>' + (q.tipo === "vf" ? "Justificación" : "Por qué") + ":</strong> " + q.explicacion + "</div>";
    if (q.tipo === "vf") h += '<p class="ayuda">En la prueba real de V/F solo la justificación tiene puntaje (pauta P1, pregunta 1).</p>';
    h += U.fuentes(q.fuente);
    h += '<p class="q-origen">' + U.chipOrigen(q.origen) +
      (q.origen === "variacion" && q.base ? " basada en " + q.base.map(U.cita).join(" ") : "") +
      (q.origen === "nueva" ? ' <span class="ayuda">Pregunta creada por IA sobre un concepto del curso; la fuente es la del concepto.</span>' : "") + "</p>";
    return h + "</div>";
  };

  /* Pregunta completa (cabecera + cuerpo + respuesta + retro si corresponde). */
  M.html = function (inst, r, corregida, extraCabecera) {
    return '<article class="pregunta" data-qid="' + U.esc(inst.q.id) + '">' + M.cabecera(inst.q, extraCabecera) + M.cuerpo(inst.q) +
      M.respuesta(inst, r, corregida) + (corregida ? M.retro(inst, r) : "") + "</article>";
  };
})();
