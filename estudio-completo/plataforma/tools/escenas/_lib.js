/* ============================================================================
   escenas/_lib.js — Ayudas para escribir las pizarras animadas.
   Cada archivo tools/escenas/<guion>.js exporta { escenas: [{ en, html, clase? }] }
   y tools/generar_escenas.js lo compila a data/escenas/<guion>.js.
   Atributos de animación (ver js/animacion.js): data-en, data-fuera, data-hl, data-contar.
   ========================================================================== */
"use strict";

/* Número con coma decimal, sin ceros de más: n(3.50) → "3,5"; n(1234.5, 1) → "1234,5". */
function n(x, dec = 3) {
  if (typeof x === "string") return x;
  const r = Number(x.toFixed(dec));
  return String(r).replace("-", "−").replace(".", ",");
}
/* Igual que n() pero para dentro de LaTeX ({,} evita el espacio tras la coma). */
function nt(x, dec = 3) { return n(x, dec).replace("−", "-").replace(",", "{,}"); }

/* Atributos de animación. en("m1") → ' data-en="m1"' */
const en = (m) => (m ? ` data-en="${m}"` : "");
const fuera = (m) => (m ? ` data-fuera="${m}"` : "");
const hl = (a, b) => (a ? ` data-hl="${a}${b ? " " + b : ""}"` : "");
/* at({en, fuera, hl:[a,b], clase, contar}) → atributos combinados */
function at(o = {}) {
  if (typeof o === "string") return en(o);
  return en(o.en) + fuera(o.fuera) + (o.hl ? hl(o.hl[0], o.hl[1]) : "") +
    (o.contar ? " data-contar" : "") + (o.clase ? ` class="${o.clase}"` : "");
}

const $ = (s) => `$${s}$`;
const $$ = (s) => `$$${s}$$`;

/* Bloque genérico */
const div = (o, html) => `<div${at(o)}>${html}</div>`;
const p = (o, html) => `<p${at(o)}>${html}</p>`;
const span = (o, html) => `<span${at(o)}>${html}</span>`;
const kicker = (txt) => `<p class="pz-kicker">${txt}</p>`;
const titulo = (txt, o) => `<h3 class="pz-t"${at(o)}>${txt}</h3>`;
/* Fórmula en display que aparece en la marca */
const formula = (o, tex) => `<div class="pz-f"${at(o)}>${$$(tex)}</div>`;
/* Nota con borde: tipo "ok" | "mal" | "" */
const nota = (o, html, tipo = "") => `<p class="pz-nota${tipo ? " pz-" + tipo : ""}"${at(o)}>${html}</p>`;
const clave = (o, html) => `<span class="pz-clave"${at(o)}>${html}</span>`;
/* Paso numerado */
const paso = (num, o, html) => `<div class="pz-paso"${at(o)}><span class="pz-n">${num}</span><div>${html}</div></div>`;
/* Lista con ítems que aparecen en marcas: items = [[marca, html], …] */
const lista = (items) => `<ul class="pz-lista">${items.map(([m, h]) => `<li${at(m)}>${h}</li>`).join("")}</ul>`;

/* Tabla. cab: [celdas]; filas: [[celdas]]. Cada celda: texto | { v, en, hl:[a,b], fuera, tot, contar, th }. */
function tabla(cab, filas, clase = "") {
  const celda = (c, th) => {
    if (c == null) c = "";
    if (typeof c !== "object") c = { v: c };
    const tag = c.th || th ? "th" : "td";
    const cls = [c.tot ? "pz-tot" : "", c.clase || ""].filter(Boolean).join(" ");
    return `<${tag}${cls ? ` class="${cls}"` : ""}${en(c.en)}${fuera(c.fuera)}${c.hl ? hl(c.hl[0], c.hl[1]) : ""}${c.contar ? " data-contar" : ""}>${c.v}</${tag}>`;
  };
  return `<table class="pz-tabla ${clase}">` +
    (cab ? `<thead><tr>${cab.map((c) => celda(c, true)).join("")}</tr></thead>` : "") +
    `<tbody>${filas.map((f) => `<tr>${f.map((c, j) => celda(c, false)).join("")}</tr>`).join("")}</tbody></table>`;
}

/* Gráfica de líneas (efectos o interacción) en SVG. series: [{ nombre, ys, color, en }],
   xs: etiquetas del eje x. Devuelve <svg> con ejes, puntos y trazos animados. */
function grafica({ xs, series, ymin, ymax, ancho = 420, alto = 240, en: enEjes, etiquetaY = "", dec = 2 }) {
  const m = { i: 46, d: 90, a: 14, b: 34 };
  const W = ancho - m.i - m.d, H = alto - m.a - m.b;
  const X = (k) => m.i + (xs.length === 1 ? W / 2 : (k * W) / (xs.length - 1));
  const Y = (v) => m.a + H - ((v - ymin) / (ymax - ymin)) * H;
  let s = `<svg viewBox="0 0 ${ancho} ${alto}" role="img">`;
  s += `<g${en(enEjes)} class="${enEjes ? "" : ""}"><path class="ejes" d="M${m.i},${m.a} V${m.a + H} H${m.i + W}"/>`;
  xs.forEach((x, k) => { s += `<text x="${X(k)}" y="${alto - 12}" text-anchor="middle">${x}</text>`; });
  [ymin, (ymin + ymax) / 2, ymax].forEach((v) => { s += `<text x="${m.i - 6}" y="${Y(v) + 4}" text-anchor="end" style="font-size:11px;opacity:.7">${n(v, dec)}</text>`; });
  if (etiquetaY) s += `<text x="${m.i}" y="${m.a - 2}" style="font-size:11px;opacity:.7">${etiquetaY}</text>`;
  s += "</g>";
  series.forEach((se) => {
    const d = se.ys.map((v, k) => `${k ? "L" : "M"}${X(k).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");
    s += `<g${en(se.en)}${se.hl ? hl(se.hl[0], se.hl[1]) : ""}>`;
    s += `<path class="trazo" pathLength="1"${en(se.en)} d="${d}" fill="none" stroke="${se.color}" stroke-width="3" stroke-linecap="round"/>`;
    se.ys.forEach((v, k) => { s += `<circle cx="${X(k)}" cy="${Y(v)}" r="4.5" fill="${se.color}"/>`; });
    if (se.valores) se.ys.forEach((v, k) => { s += `<text x="${X(k) + 7}" y="${Y(v) - 8}" style="font-size:12px;fill:${se.color}">${n(v, dec)}</text>`; });
    const yl = Y(se.ys[se.ys.length - 1]);
    s += `<text x="${X(xs.length - 1) + 10}" y="${yl + 4}" style="fill:${se.color};font-size:13px">${se.nombre}</text></g>`;
  });
  return s + "</svg>";
}
const COL = { am: "#ffd166", ce: "#7cc6fe", ro: "#ff8fab", ve: "#8ce99a", na: "#ffa94d" };

/* ── Cálculos (para que los números de la pizarra salgan de los datos) ── */
const suma = (v) => v.reduce((a, b) => a + b, 0);
/* DBCA: Y[i][j] (tratamiento i, bloque j) */
function dbca(Y) {
  const a = Y.length, b = Y[0].length, N = a * b;
  const Ti = Y.map(suma), Bj = Y[0].map((_, j) => suma(Y.map((f) => f[j]))), G = suma(Ti), C = (G * G) / N;
  const ssy = suma(Y.flat().map((x) => x * x));
  const SST = ssy - C, SStr = suma(Ti.map((t) => t * t)) / b - C, SSb = suma(Bj.map((t) => t * t)) / a - C, SSE = SST - SStr - SSb;
  const gT = a - 1, gB = b - 1, gE = (a - 1) * (b - 1);
  const CMt = SStr / gT, CMb = SSb / gB, CME = SSE / gE;
  return { a, b, N, Ti, Bj, G, C, ssy, SST, SStr, SSb, SSE, gT, gB, gE, CMt, CMb, CME, Ft: CMt / CME, Fb: CMb / CME,
    mT: Ti.map((t) => t / b), sTi2: suma(Ti.map((t) => t * t)), sBj2: suma(Bj.map((t) => t * t)) };
}
/* Factorial a×b con n réplicas: Y[i][j] = [réplicas] */
function factorial(Y) {
  const a = Y.length, b = Y[0].length, r = Y[0][0].length, N = a * b * r;
  const Tij = Y.map((f) => f.map(suma)), Ti = Tij.map(suma), Tj = Tij[0].map((_, j) => suma(Tij.map((f) => f[j]))), G = suma(Ti);
  const C = (G * G) / N, ssy = suma(Y.flat(2).map((x) => x * x));
  const SST = ssy - C, SSA = suma(Ti.map((t) => t * t)) / (b * r) - C, SSB = suma(Tj.map((t) => t * t)) / (a * r) - C;
  const SSsub = suma(Tij.flat().map((t) => t * t)) / r - C, SSAB = SSsub - SSA - SSB, SSE = SST - SSsub;
  const gA = a - 1, gB = b - 1, gAB = gA * gB, gE = a * b * (r - 1);
  return { a, b, r, N, Tij, Ti, Tj, G, C, ssy, SST, SSA, SSB, SSAB, SSE, SSsub, gA, gB, gAB, gE,
    CMA: SSA / gA, CMB: SSB / gB, CMAB: SSAB / gAB, CME: SSE / gE,
    FA: SSA / gA / (SSE / gE), FB: SSB / gB / (SSE / gE), FAB: SSAB / gAB / (SSE / gE),
    mij: Tij.map((f) => f.map((t) => t / r)), mi: Ti.map((t) => t / (b * r)), mj: Tj.map((t) => t / (a * r)),
    sTi2: suma(Ti.map((t) => t * t)), sTj2: suma(Tj.map((t) => t * t)), sTij2: suma(Tij.flat().map((t) => t * t)) };
}
/* 2^k: totales en orden de Yates [(1), a, b, ab, c, ac, bc, abc], n réplicas */
function dosK(tot, k, nrep) {
  const nombres = [];
  for (let m = 1; m < 1 << k; m++) { let s = ""; for (let f = 0; f < k; f++) if ((m >> f) & 1) s += "ABC"[f]; nombres.push({ m, s }); }
  const signo = (fila, m) => { let sg = 1; for (let f = 0; f < k; f++) if ((m >> f) & 1) sg *= (fila >> f) & 1 ? 1 : -1; return sg; };
  const ef = {};
  nombres.forEach(({ m, s }) => {
    const c = suma(tot.map((t, fila) => signo(fila, m) * t));
    ef[s] = { contraste: c, efecto: c / (nrep * 2 ** (k - 1)), sc: (c * c) / (nrep * 2 ** k), signos: tot.map((_, fila) => signo(fila, m)) };
  });
  return ef;
}
const yates = (fila, k) => { let s = ""; for (let f = 0; f < k; f++) if ((fila >> f) & 1) s += "abc"[f]; return s || "(1)"; };

module.exports = { n, nt, en, fuera, hl, at, $, $$, div, p, span, kicker, titulo, formula, nota, clave, paso, lista, tabla,
  grafica, COL, suma, dbca, factorial, dosK, yates };
