/* ============================================================================
   escenas/_p4.js — Piezas de pizarra para la PRUEBA 4 (regresión múltiple y
   superficie de respuesta). Los números salen de tools/generadores/p4calc.js
   (el mismo ajuste en R que usa la pauta de Desarrollo), nunca a mano.
     tablaCoef  · tabla tipo summary() con filas que aparecen/se resaltan en marcas
     residuos   · residuos vs ajustados (SVG)       qq · gráfico cuantil-cuantil
     barras     · VIF / Cook / apalancamiento con línea de corte
     parabola   · curva ajustada con sus datos y la recta tangente (∂y/∂x)
     superficie · mapa de color de ŷ con puntos del diseño y punto estacionario
   ========================================================================== */
"use strict";
const L = require("./_lib");
const A = require("./_anim");
const E = require("./_ej");
const C = require("../generadores/p4calc");
const { n, $, COL } = L;

/* Número para la pizarra con c cifras significativas (coma decimal) */
function s(x, c = 4) {
  if (x === 0) return "0";
  const d = Math.max(0, c - 1 - Math.floor(Math.log10(Math.abs(x))));
  return n(x, Math.min(d, 8));
}
const pv = (p) => (p < 0.0001 ? "&lt; 0,0001" : n(p, 4));
const ini = (o) => (o.en ? ` data-en="${o.en}"` : "");

/* Tabla de coeficientes. filas: { "x1": { en, hl:[a,b] } } (por defecto todas aparecen en o.en) */
function tablaCoef(r, o = {}) {
  const nom = o.nombres || {};
  const cab = ["", "Estimate", "Std. Error", "t value", "Pr(&gt;|t|)"].map((c, j) => (o.hlCol && o.hlCol[j] ? { v: c, th: true, hl: o.hlCol[j] } : c));
  const filas = r.nom.map((t, i) => {
    const f = (o.filas && o.filas[t]) || {};
    const celda = (v, j) => ({ v, en: f.en || o.enFilas, hl: (f.hlc && f.hlc[j]) || f.hl || (o.hlCol && o.hlCol[j]) || null, id: o.pref ? `${o.pref}-${i}-${j}` : null });
    return [{ v: `<code>${nom[t] || t}</code>`, th: true, en: f.en || o.enFilas, hl: f.hl || null }, celda(s(r.est[i]), 1), celda(s(r.se[i]), 2), celda(n(r.t[i], 3), 3), celda(pv(r.p[i]), 4)];
  });
  return L.tabla(cab, filas, o.clase || "pz-chica");
}
/* Línea de resumen bajo la tabla (R², F) */
function resumenR(r, o = {}) {
  return `<p class="pz-tenue" style="margin:0;font-size:.82em"${ini(o)}>Residual standard error: ${n(r.sigma, 4)} on ${r.gl} DF · R² = ${n(r.r2, 4)} · R² aj. = ${n(r.r2a, 4)} · F = ${s(r.F, 5)} on ${r.gl1} y ${r.gl2} DF, p ${r.pF < 0.0001 ? "&lt; 0,0001" : "= " + n(r.pF, 4)}</p>`;
}

/* ── Gráficos SVG ───────────────────────────────────────────────────── */
function marco(ancho, alto, m) { return { W: ancho - m.i - m.d, H: alto - m.a - m.b }; }
function ejes(ancho, alto, m, etqX, etqY) {
  return `<path class="ejes" d="M${m.i},${m.a} V${alto - m.b} H${ancho - m.d}"/>` +
    `<text x="${(m.i + ancho - m.d) / 2}" y="${alto - 4}" text-anchor="middle" style="font-size:12px;opacity:.75">${etqX}</text>` +
    `<text x="12" y="${(m.a + alto - m.b) / 2}" transform="rotate(-90 12 ${(m.a + alto - m.b) / 2})" text-anchor="middle" style="font-size:12px;opacity:.75">${etqY}</text>`;
}
const rango = (v, pad = 0.08) => { const lo = Math.min(...v), hi = Math.max(...v), d = (hi - lo) || 1; return [lo - pad * d, hi + pad * d]; };

/* Residuos vs ajustados. o: { en, enPuntos, marcar:[i] (índices 0-based a destacar), ancho, alto } */
function residuos(r, o = {}) {
  const ancho = o.ancho || 360, alto = o.alto || 220, m = { i: 34, d: 12, a: 12, b: 30 };
  const { W, H } = marco(ancho, alto, m);
  const [x0, x1] = rango(r.fit), lim = Math.max(...r.res.map(Math.abs)) * 1.15;
  const X = (v) => m.i + ((v - x0) / (x1 - x0)) * W, Y = (v) => m.a + H / 2 - (v / lim) * (H / 2);
  let h = `<svg viewBox="0 0 ${ancho} ${alto}" role="img"${ini(o)}>` + ejes(ancho, alto, m, "ajustados ŷ", "residuos e");
  h += `<line x1="${m.i}" x2="${m.i + W}" y1="${Y(0)}" y2="${Y(0)}" stroke="${COL.ce}" stroke-dasharray="5 4" opacity=".7"/>`;
  r.fit.forEach((f, i) => {
    const dest = (o.marcar || []).includes(i);
    h += `<g${o.enPuntos ? ` data-en="${o.enPuntos}"` : ""}><circle cx="${X(f).toFixed(1)}" cy="${Y(r.res[i]).toFixed(1)}" r="${dest ? 6 : 4.5}" fill="${dest ? COL.ro : COL.am}"/>` +
      (dest ? `<text x="${(X(f) + 8).toFixed(1)}" y="${(Y(r.res[i]) - 6).toFixed(1)}" style="font-size:12px;fill:${COL.ro}">${i + 1}</text>` : "") + "</g>";
  });
  return h + "</svg>";
}
/* Inversa de la normal estándar (Acklam) para el gráfico Q-Q */
function qnorm(p) {
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  if (p < pl) { const q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  if (p > 1 - pl) { const q = Math.sqrt(-2 * Math.log(1 - p)); return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  const q = p - 0.5, t = q * q;
  return (((((a[0] * t + a[1]) * t + a[2]) * t + a[3]) * t + a[4]) * t + a[5]) * q / (((((b[0] * t + b[1]) * t + b[2]) * t + b[3]) * t + b[4]) * t + 1);
}
function qq(r, o = {}) {
  const ancho = o.ancho || 300, alto = o.alto || 220, m = { i: 34, d: 12, a: 12, b: 30 };
  const { W, H } = marco(ancho, alto, m);
  const nn = r.res.length, sd = Math.sqrt(r.res.reduce((a, e) => a + e * e, 0) / (nn - 1));
  const z = r.res.map((e) => e / sd).sort((a, b) => a - b), t = z.map((_, i) => qnorm((i + 1 - 0.375) / (nn + 0.25)));
  const lim = Math.max(...z.map(Math.abs), ...t.map(Math.abs)) * 1.1;
  const X = (v) => m.i + ((v + lim) / (2 * lim)) * W, Y = (v) => m.a + H - ((v + lim) / (2 * lim)) * H;
  let h = `<svg viewBox="0 0 ${ancho} ${alto}" role="img"${ini(o)}>` + ejes(ancho, alto, m, "cuantiles teóricos", "residuos estandarizados");
  h += `<path class="trazo" pathLength="1"${o.enLinea ? ` data-en="${o.enLinea}"` : ""} d="M${X(-lim)},${Y(-lim)} L${X(lim)},${Y(lim)}" stroke="${COL.ce}" stroke-width="2" fill="none"/>`;
  z.forEach((v, i) => { h += `<circle cx="${X(t[i]).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="4.5" fill="${COL.am}"${o.enPuntos ? ` data-en="${o.enPuntos}"` : ""}/>`; });
  return h + "</svg>";
}
/* Barras con línea de corte. o: { valores, etiquetas, corte, etqCorte, en, enCorte, color, ancho, alto, max } */
function barras(o) {
  const ancho = o.ancho || 360, alto = o.alto || 200, m = { i: 34, d: 12, a: 14, b: 26 };
  const { W, H } = marco(ancho, alto, m);
  const max = o.max || Math.max(...o.valores, o.corte || 0) * 1.15, k = o.valores.length, bw = (W / k) * 0.6;
  const Y = (v) => m.a + H - (v / max) * H;
  let h = `<svg viewBox="0 0 ${ancho} ${alto}" role="img"${ini(o)}><path class="ejes" d="M${m.i},${m.a} V${m.a + H} H${m.i + W}"/>`;
  o.valores.forEach((v, i) => {
    const x = m.i + (W / k) * (i + 0.5) - bw / 2, sobre = o.corte != null && v > o.corte;
    h += `<rect x="${x.toFixed(1)}" y="${Y(v).toFixed(1)}" width="${bw.toFixed(1)}" height="${(m.a + H - Y(v)).toFixed(1)}" rx="2" fill="${sobre ? COL.ro : (o.color || COL.ce)}" opacity=".9"/>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${alto - 8}" text-anchor="middle" style="font-size:11px;opacity:.8">${o.etiquetas[i]}</text>` +
      (o.mostrar ? `<text x="${(x + bw / 2).toFixed(1)}" y="${(Y(v) - 4).toFixed(1)}" text-anchor="middle" style="font-size:11px;fill:${sobre ? COL.ro : "#eef3f1"}">${s(v, 3)}</text>` : "");
  });
  if (o.corte != null) h += `<g${o.enCorte ? ` data-en="${o.enCorte}"` : ""}><line x1="${m.i}" x2="${m.i + W}" y1="${Y(o.corte)}" y2="${Y(o.corte)}" stroke="${COL.am}" stroke-dasharray="6 4"/>` +
    `<text x="${m.i + W}" y="${Y(o.corte) - 5}" text-anchor="end" style="font-size:12px;fill:${COL.am}">${o.etqCorte || "corte " + s(o.corte, 3)}</text></g>`;
  return h + "</svg>";
}
/* Parábola ajustada (o polinomio) con sus datos y tangentes en x0s. o: { col, tangentes:[{x0, en}], en, enCurva, etqX, etqY, vertice:{en} } */
function parabola(r, o) {
  const ancho = o.ancho || 380, alto = o.alto || 230, m = { i: 40, d: 14, a: 12, b: 30 };
  const { W, H } = marco(ancho, alto, m);
  const xs = o.datos[o.col], ys = o.datos[o.y || "y"];
  const [x0, x1] = rango(xs, 0.06);
  const f = (x) => C.evalModelo(r, { [o.col]: x });
  const curva = Array.from({ length: 61 }, (_, i) => x0 + ((x1 - x0) * i) / 60);
  const [y0, y1] = rango(ys.concat(curva.map(f)), 0.1);
  const X = (v) => m.i + ((v - x0) / (x1 - x0)) * W, Y = (v) => m.a + H - ((v - y0) / (y1 - y0)) * H;
  let h = `<svg viewBox="0 0 ${ancho} ${alto}" role="img"${ini(o)}>` + ejes(ancho, alto, m, o.etqX || o.col, o.etqY || "y");
  h += `<path class="trazo" pathLength="1"${o.enCurva ? ` data-en="${o.enCurva}"` : ""} d="${curva.map((x, i) => `${i ? "L" : "M"}${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`).join(" ")}" fill="none" stroke="${COL.ce}" stroke-width="3"/>`;
  xs.forEach((x, i) => { h += `<circle cx="${X(x).toFixed(1)}" cy="${Y(ys[i]).toFixed(1)}" r="4.5" fill="${COL.am}" stroke="#13212a" stroke-width="1.5"/>`; });
  (o.tangentes || []).forEach((tg) => {
    const dx = 1e-4 * (x1 - x0), sl = (f(tg.x0 + dx) - f(tg.x0 - dx)) / (2 * dx), half = (x1 - x0) * 0.16;
    const a = tg.x0 - half, b = tg.x0 + half;
    h += `<g data-en="${tg.en}"><path class="trazo" pathLength="1" data-en="${tg.en}" d="M${X(a).toFixed(1)},${Y(f(tg.x0) + sl * (a - tg.x0)).toFixed(1)} L${X(b).toFixed(1)},${Y(f(tg.x0) + sl * (b - tg.x0)).toFixed(1)}" stroke="${tg.color || COL.ro}" stroke-width="2.5" fill="none"/>` +
      `<circle cx="${X(tg.x0).toFixed(1)}" cy="${Y(f(tg.x0)).toFixed(1)}" r="5" fill="${tg.color || COL.ro}"/>` +
      `<text x="${(X(tg.x0) + (tg.abajo ? -8 : 8)).toFixed(1)}" y="${(Y(f(tg.x0)) + (tg.abajo ? 20 : -12)).toFixed(1)}" text-anchor="${tg.abajo ? "end" : "start"}" style="font-size:13px;font-weight:700;paint-order:stroke;stroke:#13212a;stroke-width:4px;fill:${tg.color || COL.ro}">pendiente ${s(sl, 3)}</text></g>`;
  });
  if (o.vertice) {
    const xv = o.vertice.x;
    h += `<g data-en="${o.vertice.en}"><line x1="${X(xv)}" x2="${X(xv)}" y1="${m.a}" y2="${m.a + H}" stroke="${COL.ve}" stroke-dasharray="4 4"/><text x="${X(xv) + 5}" y="${m.a + 12}" style="font-size:12px;fill:${COL.ve}">${o.vertice.txt || "vértice"}</text></g>`;
  }
  return h + "</svg>";
}
/* Color de un valor entre lo y hi (azul → amarillo → rojo) */
function color(t) {
  const st = [[46, 86, 140], [64, 160, 170], [255, 209, 102], [255, 120, 110]];
  const u = Math.max(0, Math.min(1, t)) * (st.length - 1), i = Math.min(Math.floor(u), st.length - 2), f = u - i;
  const c = st[i].map((v, j) => Math.round(v + (st[i + 1][j] - v) * f));
  return `rgb(${c.join(",")})`;
}
/* Mapa de ŷ sobre (vx, vy) en [lo, hi]², con el resto fijo. o: { vx, vy, fijo, lo, hi, puntos:[[x,y]], estrella:{x,y,en,txt}, en, enPuntos, mejor:{x,y,en,txt}, circulo } */
function superficie(r, o) {
  const lado = o.lado || 250, m = { i: 34, d: 70, a: 10, b: 30 }, ancho = lado + m.i + m.d, alto = lado + m.a + m.b;
  const lo = o.lo == null ? -1.5 : o.lo, hi = o.hi == null ? 1.5 : o.hi, N = 30, paso = (hi - lo) / N;
  const X = (v) => m.i + ((v - lo) / (hi - lo)) * lado, Y = (v) => m.a + lado - ((v - lo) / (hi - lo)) * lado;
  const vals = [];
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const px = lo + (i + 0.5) * paso, py = lo + (j + 0.5) * paso;
    vals.push({ px, py, y: C.evalModelo(r, Object.assign({}, o.fijo || {}, { [o.vx]: px, [o.vy]: py })) });
  }
  const ymin = Math.min(...vals.map((v) => v.y)), ymax = Math.max(...vals.map((v) => v.y));
  let h = `<svg viewBox="0 0 ${ancho} ${alto}" role="img"${ini(o)}><g>`;
  if (!o.sinColor) vals.forEach((v) => { h += `<rect x="${(X(v.px - paso / 2)).toFixed(1)}" y="${(Y(v.py + paso / 2)).toFixed(1)}" width="${(lado / N + 0.6).toFixed(1)}" height="${(lado / N + 0.6).toFixed(1)}" fill="${color((v.y - ymin) / (ymax - ymin))}"/>`; });
  h += "</g>";
  /* región del factorial y ejes */
  h += `<rect x="${X(-1)}" y="${Y(1)}" width="${X(1) - X(-1)}" height="${Y(-1) - Y(1)}" fill="none" stroke="#eef3f1" stroke-opacity=".55" stroke-dasharray="5 4"/>`;
  if (o.circulo) h += `<polygon points="${[0, 60, 120, 180, 240, 300].map((a) => `${X(Math.cos(a * Math.PI / 180)).toFixed(1)},${Y(Math.sin(a * Math.PI / 180)).toFixed(1)}`).join(" ")}" fill="none" stroke="#eef3f1" stroke-opacity=".7" stroke-dasharray="5 4"/>`;
  h += `<text x="${m.i + lado / 2}" y="${alto - 6}" text-anchor="middle" style="font-size:12px;opacity:.8">${o.etqX || o.vx}</text>` +
    `<text x="12" y="${m.a + lado / 2}" transform="rotate(-90 12 ${m.a + lado / 2})" text-anchor="middle" style="font-size:12px;opacity:.8">${o.etqY || o.vy}</text>`;
  [-1, 0, 1].forEach((t) => { h += `<text x="${X(t)}" y="${m.a + lado + 13}" text-anchor="middle" style="font-size:10px;opacity:.6">${t}</text><text x="${m.i - 5}" y="${Y(t) + 4}" text-anchor="end" style="font-size:10px;opacity:.6">${t}</text>`; });
  /* leyenda */
  if (!o.sinColor) for (let k = 0; k < 20; k++) h += `<rect x="${m.i + lado + 18}" y="${(m.a + lado - (k + 1) * (lado / 20)).toFixed(1)}" width="12" height="${(lado / 20 + 0.5).toFixed(1)}" fill="${color(k / 19)}"/>`;
  if (!o.sinColor) h += `<text x="${m.i + lado + 34}" y="${m.a + 10}" style="font-size:11px;opacity:.8">${s(ymax, 3)}</text><text x="${m.i + lado + 34}" y="${m.a + lado}" style="font-size:11px;opacity:.8">${s(ymin, 3)}</text>`;
  if (o.puntos) h += `<g${o.enPuntos ? ` data-en="${o.enPuntos}"` : ""}>` + o.puntos.map(([a, b]) => `<circle cx="${X(a).toFixed(1)}" cy="${Y(b).toFixed(1)}" r="4" fill="${o.sinColor ? "#ffd166" : "#13212a"}" stroke="#eef3f1" stroke-width="1.5"/>`).join("") + "</g>";
  const pin = (p, col, forma) => {
    const dentro = p.x >= lo && p.x <= hi && p.y >= lo && p.y <= hi;
    const cx = X(Math.max(lo, Math.min(hi, p.x))), cy = Y(Math.max(lo, Math.min(hi, p.y)));
    return `<g data-en="${p.en}">` + (forma === "estrella" ? `<text x="${cx}" y="${cy + 7}" text-anchor="middle" style="font-size:22px;fill:${col}">★</text>` : `<circle cx="${cx}" cy="${cy}" r="8" fill="none" stroke="${col}" stroke-width="3"/>`) +
      `<text x="${cx + (cx > m.i + lado * 0.7 ? -12 : 12)}" y="${forma === "estrella" ? cy - 10 : cy + 24}" text-anchor="${cx > m.i + lado * 0.7 ? "end" : "start"}" style="font-size:12px;fill:${col};font-weight:700">${p.txt || ""}${dentro ? "" : " (fuera →)"}</text></g>`;
  };
  if (o.estrella) h += pin(o.estrella, "#ffffff", "estrella");
  if (o.mejor) h += pin(o.mejor, COL.ve, "circulo");
  return h + "</svg>";
}

/* Bloque de código R corto (sin resaltado) */
const codigo = (en, txt) => `<pre class="pz-code"${en ? ` data-en="${en}"` : ""}><code>${txt.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\$/g, "&#36;")}</code></pre>`;

module.exports = Object.assign({}, A, { s, pv, tablaCoef, resumenR, residuos, qq, barras, parabola, superficie, codigo, qnorm,
  portada: E.portada, enunciado: E.enunciado, k: E.k, c: E.c, C });

/* ══════════ Constructor de ejercicios de REGRESIÓN (marcas estándar) ══════════
   Marcas del guion: inicio enun clave1 clave2 [clave3] sal ecuacion
     interp i1..iK (una por término interpretado, en el orden de cfg.interp)
     [deriv tang1 tang2 [vert]]   (polinomios: ∂y/∂x y tangentes)
     pt t1..tM (una por término probado, en el orden de cfg.pruebas)
     [alfa alfacalc alfadec]       (H0: β = α)
     f fcalc rcuad r2aj
     sup lin sw [vif vifv] hat cook
     [pred predcalc predint] | [lof lofcalc lofdec] | [scr scrcalc]
     fin                                                                         */
function regEj(cfg) {
  const L2 = require("./_lib");
  const { kicker, titulo, formula, nota, lista, p, div, tabla } = L2;
  const r = C.ajustar({ datos: cfg.datos, formula: cfg.formula, vif: !!cfg.vif, nuevo: cfg.nuevo, falta: cfg.lof ? [cfg.lof] : null });
  const nt = (x, dd) => s(x, dd || 4).replace(",", "{,}").replace("−", "-");
  const nom = cfg.nombres || {};
  const tex = (t) => (t === "(Intercept)" ? "b_0" : `b_{${(nom[t] || t).replace(/^x(\d)$/, "x_$1").replace(/^I\((\w+)\^(\d)\)$/, "$1^$2").replace(/:/g, "")}}`);
  const esc = [];
  esc.push(P_portada(cfg));
  const cols = Object.keys(cfg.tabla || cfg.datos);
  const T = cfg.tabla || cfg.datos;
  const filasDatos = cols.map((c) => [{ v: cfg.etq && cfg.etq[c] || c, th: true }].concat(T[c].map((v) => (typeof v === "number" ? s(v, 5) : v))));
  esc.push(E.enunciado(cfg.ej, cfg.enun, tabla([""].concat(T[cols[0]].map((_, i) => i + 1)), filasDatos, T[cols[0]].length > 12 ? "pz-mini" : "pz-mini")));
  /* salida */
  const ec = `\\hat ${cfg.yTex || "y"}=` + r.nom.map((t, i) => (i === 0 ? nt(r.est[0]) : `${r.est[i] < 0 ? "-" : "+"}${nt(Math.abs(r.est[i]))}\\,${tex(t).replace(/^b_\{?|\}$/g, "").replace(/^b_/, "")}`)).join("");
  esc.push({ en: "sal", html: kicker("La salida de R") + titulo(cfg.tituloSal || "summary(modelo)") + tablaCoef(r, { nombres: cfg.nomR }) + resumenR(r) +
    formula({ en: "ecuacion" }, ec) + (cfg.notaEc ? nota({ en: "ecuacion@3" }, cfg.notaEc) : "") });
  /* interpretación */
  esc.push({ en: "interp", html: kicker("Interpretar") + titulo(cfg.polinomio ? "Coeficientes y ∂y/∂x" : "Cada coeficiente, con lo demás fijo") +
    (cfg.polinomio ? `<div class="pz-cols"><div>` : "") +
    lista(cfg.interp.map((h, i) => [`i${i + 1}`, h])) +
    (cfg.polinomio ? `</div><div>` + formula({ en: "deriv" }, cfg.polinomio.derivTex) +
      parabola(r, { datos: cfg.datos, col: cfg.polinomio.col, y: cfg.polinomio.y, etqX: cfg.polinomio.etqX, etqY: cfg.polinomio.etqY, enCurva: "interp", alto: 240, ancho: 400,
        tangentes: cfg.polinomio.x0.map((x0, j) => ({ x0, en: `tang${j + 1}`, color: j ? COL.ve : COL.ro, abajo: !!j })),
        vertice: cfg.polinomio.vert ? { x: cfg.polinomio.vert, en: "vert", txt: cfg.polinomio.vertTxt } : null }) + `</div></div>` : "") });
  /* pruebas t */
  esc.push({ en: "pt", html: kicker("Pruebas t · H₀: βᵢ = 0") + titulo("Estadístico · decisión · contexto") +
    formula({ en: "pt" }, `t=\\dfrac{b_i}{ee(b_i)}\\sim t_{${r.gl}}\\qquad t_{0{,}975;\\,${r.gl}}=${nt(r.tcrit)}`) +
    lista(cfg.pruebas.map(([t, txt], i) => { const j = r.idx(t); return [`t${i + 1}`, `${$(tex(t).replace(/^b/, "\\beta"))}: ${$("t=" + n(r.t[j], 2).replace(",", "{,}").replace("−", "-"))}, ${$("p" + (r.p[j] < 0.0001 ? "<0{,}0001" : "=" + n(r.p[j], 4).replace(",", "{,}")))} ⇒ ${r.p[j] < 0.05 ? "<strong class=\"pz-ve\">se rechaza</strong>" : "<strong class=\"pz-ro\">no se rechaza</strong>"}: ${txt}`]; })) +
    (cfg.alfa ? (() => { const [t, a0, txt] = cfg.alfa, j = r.idx(t), tt = (r.est[j] - a0) / r.se[j], pa = require("../generadores/lib").Rn(`2 * pt(-abs(${tt}), ${r.gl})`);
      return nota({ en: "alfa" }, `${$("H_0:" + tex(t).replace(/^b/, "\\beta") + "=" + nt(a0))}: R no lo da, se calcula a mano`, "mal") +
        A.calc({ partes: [["alfacalc", `t=\\dfrac{${nt(r.est[j])}-${nt(a0)}}{${nt(r.se[j])}}`]], tRes: "alfacalc@3", res: n(tt, 2) }) +
        nota({ en: "alfadec" }, `${$("p=" + nt(pa, 3))} ⇒ ${pa < 0.05 ? "se rechaza" : "no se rechaza"}: ${txt}`, pa < 0.05 ? "mal" : "ok"); })() : "") });
  /* F y R² */
  esc.push({ en: "f", html: kicker("¿Sirve el modelo?") + titulo("F global, R² y R² ajustado") +
    formula({ en: "f" }, `H_0:${r.nom.slice(1).map((t) => tex(t).replace(/^b/, "\\beta")).join("=")}=0`) +
    `<div class="pz-cols">` +
    div({}, A.calc({ partes: [["fcalc", `F=\\dfrac{SCR/k}{SCE/(n-k-1)}=\\dfrac{${nt(r.scr)}/${r.k}}{${nt(r.sce)}/${r.gl}}`]], tRes: "fcalc@3", res: s(r.F, 4) }) +
      nota({ en: "fcalc@5" }, `${$("F_{0{,}95;" + r.k + "," + r.gl + "}=" + nt(r.Fcrit, 3))}, ${$("p" + (r.pF < 0.0001 ? "<0{,}0001" : "=" + nt(r.pF, 3)))} ⇒ ${r.pF < 0.05 ? "se rechaza: " + (cfg.fTxt || "el modelo sirve") : "no se rechaza: " + (cfg.fTxt || "el modelo no explica la respuesta")}`, r.pF < 0.05 ? "ok" : "mal")) +
    div({}, A.calc({ partes: [["rcuad", `R^2=\\dfrac{SCR}{STC}=\\dfrac{${nt(r.scr)}}{${nt(r.sct)}}`]], tRes: "rcuad@3", res: n(r.r2, r.r2 > 0.9999 ? 6 : 4) }) +
      formula({ en: "r2aj" }, `R^2_{aj}=1-(1-R^2)\\tfrac{${r.n - 1}}{${r.gl}}=${nt(r.r2a, r.r2a > 0.9999 ? 6 : 4)}`)) + "</div>" });
  /* supuestos y problemas */
  const marcar = r.cook.map((c, i) => [c, i]).filter(([c]) => c > 1).map(([, i]) => i);
  esc.push({ en: "sup", html: kicker("Supuestos") + titulo("Residuos, Q-Q y Shapiro") +
    `<div class="pz-cols">` + div({}, residuos(r, { en: "lin", marcar, alto: 190 })) + div({}, qq(r, { en: "sw", enLinea: "sw", alto: 190 })) + "</div>" +
    nota({ en: "sw" }, `Shapiro–Wilk: ${$("p=" + nt(r.sw, 3))} ⇒ ${r.sw < 0.05 ? "se rechaza la normalidad" : "no se rechaza la normalidad"}`, r.sw < 0.05 ? "mal" : "ok") });
  esc.push({ en: cfg.vif ? "vif" : "hat", html: kicker("Problemas del modelo") + titulo(cfg.vif ? "VIF, apalancamiento y Cook" : "Apalancamiento y Cook") +
    `<div class="${cfg.vif ? "pz-cols pz-cols-3" : "pz-cols"}">` +
    (cfg.vif ? div({}, formula({ en: "vif" }, "VIF_j=\\tfrac{1}{1-R_j^2}") + barras({ en: "vifv", valores: r.vif, etiquetas: r.vifNom.map((v) => v.replace(/^x(\d)$/, "x$1")), corte: 5, etqCorte: "5", mostrar: true, color: "#ffa94d", ancho: 260, alto: 170 })) : "") +
    div({}, formula({ en: "hat" }, `h_{ii}>\\tfrac{2(k+1)}{n}=${nt(r.hcorte, 3)}`) + barras({ en: "hat", valores: r.hat, etiquetas: r.hat.map((_, i) => i + 1), corte: r.hcorte, etqCorte: s(r.hcorte, 3), max: Math.max(1, ...r.hat), alto: 160 })) +
    div({}, formula({ en: "cook" }, "D_i>1\\Rightarrow\\text{influyente}") + barras({ en: "cook", valores: r.cook, etiquetas: r.cook.map((_, i) => i + 1), corte: 1, etqCorte: "1", max: Math.max(1.3, ...r.cook) * 1.05, alto: 160 })) +
    "</div>" + (cfg.notaProb ? nota({ en: "cook@3" }, cfg.notaProb) : "") });
  /* parte propia */
  if (cfg.nuevo) {
    const sust = r.nom.map((t, i) => (i === 0 ? nt(r.est[0]) : `${r.est[i] < 0 ? "-" : "+"}${nt(Math.abs(r.est[i]))}\\cdot${cfg.sust[t]}`)).join("");
    esc.push({ en: "pred", html: kicker("Predicción") + titulo(cfg.tituloPred || "Estimar la respuesta") +
      p({ en: "pred" }, cfg.predTxt) + A.calc({ partes: [["predcalc", `\\hat ${cfg.yTex || "y"}=${sust}`]], tRes: "predcalc@4", res: s(r.pc[0], 4) }) +
      lista([["predint", `IC 95 % de la <strong>media</strong>: [${s(r.pc[1], 4)}; ${s(r.pc[2], 4)}]`], ["predint@4", `Intervalo de <strong>predicción</strong> (un caso): [${s(r.pp[1], 4)}; ${s(r.pp[2], 4)}] — más ancho`]]) +
      (cfg.predNota ? nota({ en: "predint@8" }, cfg.predNota) : "") });
  }
  if (cfg.lof) {
    const f = r.lof;
    esc.push({ en: "lof", html: kicker("Falta de ajuste") + titulo("Error puro vs falta de ajuste") +
      formula({ en: "lof" }, `SCE=\\underbrace{SC_{puro}}_{\\text{entre réplicas}}+\\underbrace{SC_{FA}}_{\\text{lo que el modelo no capta}}`) +
      formula({ en: "lofcalc" }, `${nt(r.sce)}=${nt(f.scPuro)}+${nt(f.scLof)}\\qquad gl:\\ ${r.gl}=${f.glPuro}+${f.glLof}`) +
      A.calc({ partes: [["lofcalc@4", `F_{FA}=\\dfrac{${nt(f.scLof)}/${f.glLof}}{${nt(f.scPuro)}/${f.glPuro}}`]], tRes: "lofcalc@7", res: n(f.F, 3) }) +
      nota({ en: "lofdec" }, `${$("p=" + nt(f.p, 3))} ⇒ ${f.p < 0.05 ? "hay falta de ajuste: el modelo se queda corto" : "no hay falta de ajuste: el modelo describe bien la forma"}`, f.p < 0.05 ? "mal" : "ok") });
  }
  if (cfg.scr) esc.push({ en: "scr", html: kicker("SCR en partes de 1 gl") + titulo("Diseño ortogonal: cada variable aporta lo suyo") + cfg.scr });
  esc.push({ en: "fin", html: kicker("Para cerrar") + titulo(cfg.tituloFin || "Lo que hay que llevarse") + lista(cfg.fin.map((h, i) => [i ? `fin@${i * 4}` : "fin", h])) });
  return { escenas: esc, r };
}
function P_portada(cfg) { return E.portada(cfg.ej, cfg.titulo, cfg.sub || "Regresión lineal múltiple · Prueba 4"); }
module.exports.regEj = regEj;

/* ══════════ Constructor de ejercicios de SUPERFICIE DE RESPUESTA ══════════
   Marcas: inicio enun clave1 clave2 [clave3] dis cod
     sal ecuacion lin cuad inter (tipos de términos) sig
     f fcalc rcuad lof
     deriv d1 d2 [d3] sist sol real
     hes [det] ev clas
     opt [mejor] fin                                                       */
function rsmEj(cfg) {
  const L2 = require("./_lib");
  const { kicker, titulo, formula, nota, lista, p, div, tabla } = L2;
  const k = cfg.k, vars = ["x1", "x2", "x3"].slice(0, k);
  const so = vars.join(" + ") + " + " + vars.map((x) => `I(${x}^2)`).join(" + ") + " + " + vars.flatMap((a, i) => vars.slice(i + 1).map((b) => a + ":" + b)).join(" + ");
  const r = C.ajustar({ datos: cfg.datos, formula: "y ~ " + so, falta: vars, rsm: vars });
  const nt = (x, dd) => s(x, dd || 4).replace(",", "{,}").replace("−", "-");
  const xi = (i) => `x_${i + 1}`;
  const esc = [E.portada(cfg.ej, cfg.titulo, cfg.sub || "Superficie de respuesta · Prueba 4")];
  const T = cfg.tabla, cols = Object.keys(T);
  esc.push(E.enunciado(cfg.ej, cfg.enun, tabla([""].concat(T[cols[0]].map((_, i) => i + 1)), cols.map((c) => [{ v: (cfg.etq && cfg.etq[c]) || c, th: true }].concat(T[c].map((v) => (typeof v === "number" ? s(v, 5) : v)))), "pz-mini")));
  /* diseño */
  const pts = cfg.datos.x1.map((_, i) => [cfg.datos.x1[i], cfg.datos.x2[i]]);
  esc.push({ en: "dis", html: kicker("El diseño") + titulo(cfg.disTitulo) +
    `<div class="pz-cols pz-cols-64">` + div({}, lista(cfg.disItems.map((h, i) => [i ? `dis@${i * 3}` : "dis", h])) +
      (cfg.codTex ? formula({ en: "cod" }, cfg.codTex) : p({ en: "cod", clase: "pz-tenue" }, "Los datos ya vienen codificados")) ) +
    div({}, superficie(r, { vx: "x1", vy: "x2", fijo: k === 3 ? { x3: 0 } : {}, lo: -1.6, hi: 1.6, puntos: pts, enPuntos: "dis", en: "dis", lado: 200, etqX: "x₁", etqY: "x₂", circulo: cfg.circulo, sinColor: true }) +
      p({ clase: "pz-tenue", en: "dis" }, k === 3 ? "Puntos proyectados en el plano (x₁, x₂)" : "Puntos del diseño en el plano codificado")) + "</div>" });
  /* salida y términos */
  const sigT = r.nom.slice(1).filter((t, j) => r.p[j + 1] < 0.05);
  const texT = (t) => (/^I\((x\d)\^2\)$/.test(t) ? t.replace(/^I\(x(\d)\^2\)$/, "x_$1^2") : t.replace(/x(\d)/g, "x_$1").replace(":", ""));
  const ec = "\\hat y=" + r.nom.map((t, i) => (i === 0 ? nt(r.est[0]) : `${r.est[i] < 0 ? "-" : "+"}${nt(Math.abs(r.est[i]))}${texT(t)}`)).join("");
  const filas = {};
  r.nom.forEach((t, i) => { if (i && r.p[i] < 0.05) filas[t] = { hl: ["sig"] }; });
  const terminos = p({ en: "lin" }, `<span class="pz-ce">Lineales</span>: ${$(vars.map((_, i) => xi(i)).join(",\\ "))}`) +
    p({ en: "cuad" }, `<span class="pz-am">Cuadráticos</span> (curvatura): ${$(vars.map((_, i) => xi(i) + "^2").join(",\\ "))}`) +
    p({ en: "inter" }, `<span class="pz-ro">Interacciones</span>: ${$(vars.flatMap((_, i) => vars.slice(i + 1).map((__, j) => xi(i) + xi(i + j + 1))).join(",\\ "))}`);
  const sigNota = nota({ en: "sig" }, `Significativos (p &lt; 0,05): ${sigT.length ? sigT.map((t) => $(texT(t))).join(", ") : "ninguno"} · ${cfg.sigTxt}`);
  esc.push({ en: "sal", html: kicker("La salida de R") + titulo("Modelo de segundo orden") + (k === 3
    ? `<div class="pz-cols pz-cols-64">` + div({}, tablaCoef(r, { filas, clase: "pz-mini" })) + div({ clase: "pz-col" }, `<div style="font-size:.85em">` + terminos + "</div>" + sigNota) + "</div>" +
      formula({ en: "ecuacion" }, ec.replace(/([+-][^+-]*x_1x_2)/, "\\\\ &\\quad$1").replace("=", "&=").replace(/^/, "\\begin{aligned}").replace(/$/, "\\end{aligned}"))
    : tablaCoef(r, { filas, clase: "pz-chica" }) + formula({ en: "ecuacion" }, ec) + `<div class="pz-cols pz-cols-3">` + terminos + "</div>" + sigNota) });
  /* F, R², LOF */
  esc.push({ en: "f", html: kicker("¿Es adecuado el modelo?") + titulo("F global, R² y falta de ajuste") +
    A.calc({ partes: [["fcalc", `F=\\dfrac{SCR/${r.k}}{SCE/${r.gl}}`]], tRes: "fcalc@2", res: n(r.F, 2) }) +
    nota({ en: "fcalc@4" }, `${$("p" + (r.pF < 0.0001 ? "<0{,}0001" : "=" + nt(r.pF, 3)))} ⇒ ${r.pF < 0.05 ? "se rechaza H₀: el modelo explica la respuesta" : "no se rechaza H₀: el modelo en conjunto no es significativo"}`, r.pF < 0.05 ? "ok" : "mal") +
    formula({ en: "rcuad" }, `R^2=${nt(r.r2, 4)}\\qquad R^2_{aj}=${nt(r.r2a, 4)}`) +
    (r.lof ? nota({ en: "lof" }, `Falta de ajuste (error puro de las réplicas): ${$("F=" + nt(r.lof.F, 3) + ",\\ p=" + nt(r.lof.p, 3))} ⇒ ${r.lof.p < 0.05 ? "<strong>hay</strong> falta de ajuste" : "no hay falta de ajuste"}`, r.lof.p < 0.05 ? "mal" : "ok") : "") });
  /* derivadas y sistema */
  const der = vars.map((_, i) => {
    let t = `\\frac{\\partial\\hat y}{\\partial ${xi(i)}}=${nt(r.b[i])}`;
    vars.forEach((__, j) => { const c = 2 * r.B[i][j]; if (Math.abs(c) > 1e-9) t += `${c < 0 ? "-" : "+"}${nt(Math.abs(c))}${xi(j)}`; });
    return t + "=0";
  });
  const pm = (M) => (k === 3 ? "\\left(\\begin{smallmatrix}" : "\\begin{pmatrix}") + M.map((f) => f.map((v) => nt(v)).join("&")).join("\\\\") + (k === 3 ? "\\end{smallmatrix}\\right)" : "\\end{pmatrix}");
  esc.push({ en: "deriv", html: kicker("Punto estacionario a mano") + titulo("Derivar, igualar a 0 y resolver") +
    der.map((d, i) => formula({ en: `d${i + 1}` }, (k === 3 ? "\\small " : "") + d)).join("") +
    (cfg.explicaDeriv ? p({ en: "d1@4", clase: "pz-tenue" }, cfg.explicaDeriv) : "") +
    formula({ en: "sist" }, `\\mathbf b+2B\\mathbf x=\\mathbf 0\\quad\\Rightarrow\\quad\\mathbf x_s=-\\tfrac12B^{-1}\\mathbf b,\\quad B=${pm(r.B)}`) +
    formula({ en: "sol" }, "\\mathbf x_s=(" + r.xs.map((x) => nt(x, 3)).join(";\\ ") + ")\\qquad \\hat y(\\mathbf x_s)=" + nt(r.yxs, 4)) +
    (cfg.realTxt ? nota({ en: "real" }, cfg.realTxt) : "") });
  /* hessiana */
  const H = r.B.map((f) => f.map((v) => 2 * v)), detH = k === 2 ? H[0][0] * H[1][1] - H[0][1] ** 2 : null;
  const tipo = r.ev.every((l) => l < 0) ? "máximo" : r.ev.every((l) => l > 0) ? "mínimo" : "punto silla";
  esc.push({ en: "hes", html: kicker("Clasificar") + titulo("¿Máximo, mínimo o silla?") +
    formula({ en: "hes" }, `H=2B=${pm(H)}`) +
    (k === 2 ? formula({ en: "det" }, `\\det H=(${nt(H[0][0])})(${nt(H[1][1])})-(${nt(H[0][1])})^2=${nt(detH)}`) : "") +
    formula({ en: "ev" }, `\\lambda(B)=${r.ev.map((v) => nt(v)).join(";\\ ")}`) +
    nota({ en: "clas" }, `${r.ev.every((l) => l < 0) ? "Todos negativos" : r.ev.every((l) => l > 0) ? "Todos positivos" : "Signos mezclados"} ⇒ <strong>${tipo}</strong>${cfg.clasTxt ? " · " + cfg.clasTxt : ""}`, "ok") });
  /* óptimo */
  const g = C.grilla(r, vars, cfg.objetivo, -1, 1, 0.05, cfg.circulo ? (pt) => Math.abs(pt.x2) <= 0.8661 && Math.sqrt(3) * Math.abs(pt.x1) + Math.abs(pt.x2) <= Math.sqrt(3) + 1e-9 : null);
  const fijo = k === 3 ? { x3: cfg.fijo3 != null ? cfg.fijo3 : g.punto.x3 } : {};
  esc.push({ en: "opt", html: kicker("Condición óptima") + titulo(cfg.optTitulo || `Objetivo: ${cfg.objetivo === "max" ? "maximizar" : "minimizar"}`) +
    `<div class="pz-cols pz-cols-64">` + div({}, lista(cfg.optItems.map((h, i) => [i ? (cfg.mejorEn && i === cfg.optItems.length - 1 ? "mejor" : `opt@${i * 4}`) : "opt", h]))) +
    div({}, superficie(r, { vx: "x1", vy: "x2", fijo, lo: -1.6, hi: 1.6, puntos: pts, en: "opt", lado: 220, etqX: "x₁", etqY: "x₂", circulo: cfg.circulo,
      estrella: { x: r.xs[0], y: r.xs[1], en: "opt", txt: tipo }, mejor: cfg.mejorEn ? { x: g.punto.x1, y: g.punto.x2, en: "mejor", txt: "mejor" } : null }) +
      (k === 3 ? p({ clase: "pz-tenue", en: "opt" }, `Corte con x₃ = ${s(fijo.x3, 2)}`) : "")) + "</div>" });
  esc.push({ en: "fin", html: kicker("Para cerrar") + titulo("Lo que hay que llevarse") + lista(cfg.fin.map((h, i) => [i ? `fin@${i * 4}` : "fin", h])) });
  return { escenas: esc, r, g };
}
module.exports.rsmEj = rsmEj;
