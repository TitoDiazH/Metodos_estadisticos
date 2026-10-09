/* ============================================================================
   progreso.js — Cálculos derivados del historial: dominio por módulo,
   debilidades, repaso de errores y resúmenes. No guarda nada: todo se recalcula
   desde store + banco actual, así agregar o retirar preguntas no rompe nada.
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA, C = P.config, S = P.store, G = {};
  P.progreso = G;

  /* Puntaje 0–1 de una pregunta: promedio ponderado de sus últimos intentos (el más reciente pesa más). */
  function puntajePregunta(r) {
    var w = C.DOMINIO_PESOS, sw = 0, s = 0;
    for (var i = 0; i < r.h.length && i < w.length; i++) { sw += w[i]; s += w[i] * r.h[i]; }
    return sw ? s / sw : 0;
  }

  /* Dominio 0–100 de un módulo. Exige un mínimo de preguntas distintas: con menos, el
     dominio se escala (responder 2 preguntas bien no es "dominar"). Retiradas no cuentan. */
  G.dominio = function (mid) {
    var banco = P.preguntasDeModulo(mid, false);
    if (!banco.length) return { valor: 0, distintas: 0, minimo: 0, banco: 0, n: 0, ok: 0 };
    var minimo = Math.min(C.DOMINIO_MIN_PREGUNTAS, banco.length);
    var suma = 0, distintas = 0, n = 0, ok = 0;
    banco.forEach(function (q) {
      var r = S.stat(q.id);
      if (r && r.n) { distintas++; suma += puntajePregunta(r); n += r.n; ok += r.ok; }
    });
    var valor = distintas ? (suma / distintas) * Math.min(1, distintas / minimo) * 100 : 0;
    return { valor: Math.round(valor), distintas: distintas, minimo: minimo, banco: banco.length, n: n, ok: ok };
  };
  G.estadoDominio = function (d) {
    if (!d.distintas) return { clase: "nada", txt: "Sin practicar", icono: "⚪" };
    if (d.valor >= C.DOMINIO_UMBRAL) return { clase: "ok", txt: "Dominado", icono: "🟢" };
    if (d.valor >= 60) return { clase: "medio", txt: "En progreso", icono: "🟡" };
    return { clase: "bajo", txt: "Débil", icono: "🔴" };
  };

  /* Resumen general de la selección de prueba. */
  G.resumen = function (sel) {
    var mods = P.modulosDe(sel), banco = P.preguntas({ prueba: sel });
    var resp = 0, ok = 0, distintas = 0;
    banco.forEach(function (q) { var r = S.stat(q.id); if (r && r.n) { distintas++; resp += r.n; ok += r.ok; } });
    var hechos = mods.filter(function (m) { return S.e.hechos[m.id]; }).length;
    var dom = mods.map(function (m) { return G.dominio(m.id).valor; });
    var exs = S.e.examenes.filter(function (x) { return sel === "todo" || x.prueba === sel; });
    var mejor = null;
    exs.forEach(function (x) { if (!mejor || x.ok / x.n > mejor.ok / mejor.n) mejor = x; });
    return {
      modulos: mods.length, hechos: hechos, banco: banco.length, distintas: distintas,
      respondidas: resp, aciertos: ok,
      dominioMedio: dom.length ? Math.round(dom.reduce(function (a, b) { return a + b; }, 0) / dom.length) : 0,
      ultimo: exs.length ? exs[exs.length - 1] : null, mejor: mejor, examenes: exs.length
    };
  };

  /* Módulos ordenados del más débil al más fuerte (solo los que tienen intentos). */
  G.debilidades = function (sel) {
    return P.modulosDe(sel).map(function (m) { return { modulo: m, d: G.dominio(m.id) }; })
      .filter(function (x) { return x.d.distintas > 0 && x.d.valor < C.DOMINIO_UMBRAL; })
      .sort(function (a, b) { return a.d.valor - b.d.valor; });
  };

  /* Siguiente módulo sugerido: el más débil con intentos; si no hay, el primero sin completar. */
  G.sugerido = function (sel) {
    var deb = G.debilidades(sel);
    if (deb.length) return deb[0].modulo;
    var mods = P.modulosDe(sel);
    for (var i = 0; i < mods.length; i++) if (!S.e.hechos[mods[i].id]) return mods[i];
    return mods[0] || null;
  };

  /* Preguntas falladas en su último intento. */
  G.falladas = function (sel) {
    return P.preguntas({ prueba: sel }).filter(function (q) {
      var r = S.stat(q.id); return r && r.h.length && r.h[0] === 0;
    });
  };

  /* Cola de repaso: 1) falladas en el último intento, 2) vencidas según su caja de Leitner,
     ordenando primero los módulos más flojos. */
  G.colaRepaso = function (sel, max) {
    var ahora = Date.now(), DIA = 86400000, dom = {};
    function d(mid) { return dom[mid] == null ? (dom[mid] = G.dominio(mid).valor) : dom[mid]; }
    var cola = [];
    P.preguntas({ prueba: sel }).forEach(function (q) {
      var r = S.stat(q.id);
      if (!r || !r.n) return;
      var fallada = r.h[0] === 0;
      var vence = r.t + C.REPASO_INTERVALOS_DIAS[r.caja || 0] * DIA;
      if (fallada || (puntajePregunta(r) < 1 && vence <= ahora)) {
        cola.push({ q: q, clave: (fallada ? 0 : 1000) + d(q.modulo) });
      }
    });
    cola.sort(function (a, b) { return a.clave - b.clave; });
    return cola.slice(0, max || 20).map(function (x) { return x.q; });
  };

  /* Agregado por clave (módulo o prioridad) de una lista de resultados {q, ok}. */
  G.desglose = function (resultados, claveDe) {
    var out = {};
    resultados.forEach(function (r) {
      var k = claveDe(r.q), o = out[k] || (out[k] = { n: 0, ok: 0 });
      o.n++; if (r.ok) o.ok++;
    });
    return out;
  };
})();
