/* ============================================================================
   escenas/_mod.js — Piezas comunes de las pizarras de MÓDULOS (P1 y P2).
   portada(num, prueba, titulo, sub) · cierre(marcas→textos) · cod(marca, código)
   puntos(svg de dispersión con grupos) · mas lo de _anim.js (vuelos y sumas).
   ========================================================================== */
"use strict";
const A = require("./_anim");
const { kicker, titulo, lista, p, COL } = A;

const portada = (num, prueba, tit, sub) => ({ en: "inicio", html:
  `<div class="pz-centro">${kicker(`Módulo ${num} · ${prueba}`)}` +
  `<h3 class="pz-t" style="font-size:2.2em">${tit}</h3>` + p({ en: "inicio", clase: "pz-st" }, sub) + "</div>" });

const cierre = (num, items) => ({ en: "c", html:
  kicker("Para cerrar") + titulo(`Lo esencial del módulo ${num}`) + lista(items) +
  p({ en: "fin", clase: "pz-tenue" }, `Fin del módulo ${num}`) });

/* Bloque de código R que aparece en una marca; hl opcional: [[texto, a, b]] resalta trozos. */
function cod(m, codigo, hl = []) {
  let h = codigo.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  hl.forEach(([t, a, b]) => { h = h.replace(t, `<span class="pz-am" data-hl="${a}${b ? " " + b : ""}">${t}</span>`); });
  return `<pre class="pz-code"${m ? ` data-en="${m}"` : ""}><code>${h}</code></pre>`;
}

/* Dispersión simple: pts [{x, y, g, et}] en [x0,x1]×[y0,y1]; colores por grupo; en(g) = marca para cada grupo. */
function puntos({ pts, x0, x1, y0, y1, ancho = 360, alto = 240, ejes = ["", ""], colores = [COL.ce, COL.am, COL.ro, COL.ve], en = {}, extra = "" }) {
  const m = 30, X = (v) => m + ((v - x0) / (x1 - x0)) * (ancho - 2 * m), Y = (v) => alto - m - ((v - y0) / (y1 - y0)) * (alto - 2 * m);
  let s = `<svg viewBox="0 0 ${ancho} ${alto}" role="img"><path class="ejes" d="M${m},${m / 2} V${alto - m} H${ancho - m / 2}"/>`;
  s += `<text x="${ancho / 2}" y="${alto - 6}" text-anchor="middle" style="font-size:12px;opacity:.75">${ejes[0]}</text>`;
  s += `<text x="12" y="${alto / 2}" transform="rotate(-90 12 ${alto / 2})" text-anchor="middle" style="font-size:12px;opacity:.75">${ejes[1]}</text>`;
  pts.forEach((q) => {
    const c = colores[q.g || 0], mk = en[q.g] ? ` data-en="${en[q.g]}"` : "";
    s += `<g${mk}><circle cx="${X(q.x).toFixed(1)}" cy="${Y(q.y).toFixed(1)}" r="6" fill="${c}"/>` +
      (q.et ? `<text x="${(X(q.x) + 8).toFixed(1)}" y="${(Y(q.y) - 7).toFixed(1)}" style="font-size:12px;fill:${c}">${q.et}</text>` : "") + "</g>";
  });
  return s + extra.replace(/\{X:([-\d.]+)\}/g, (_, v) => X(+v).toFixed(1)).replace(/\{Y:([-\d.]+)\}/g, (_, v) => Y(+v).toFixed(1)) + "</svg>";
}

module.exports = Object.assign({}, A, { portada, cierre, cod, puntos });
