/* Ayudas para pizarras de factoriales 2^k */
"use strict";
const E = require("./_ej");
const { n, c, tabla, COL, dosK, yates } = E;
/* Tabla de signos con totales. cols: nombres de efectos a mostrar; marcas: {efecto: marca de aparición}; hlFila: {efecto: [m1,m2]} */
function tablaSignos(tot, k, cols, marcas = {}, opts = {}) {
  const ef = dosK(tot, k, 1);
  const cab = ["Trat."].concat(cols.map((s) => ({ v: s, en: marcas[s] })), [{ v: "Total", tot: true, en: opts.enTot }]);
  const filas = tot.map((t, i) => [{ v: yates(i, k), th: true }].concat(cols.map((s) => {
    const sg = ef[s].signos[i];
    return { v: sg > 0 ? "+" : "−", en: marcas[s], clase: sg > 0 ? "pz-ve" : "pz-ro", hl: opts.hl && opts.hl[s] && sg > 0 ? opts.hl[s] : null };
  }), [{ v: n(t, 2), tot: true, en: opts.enTot }]));
  return tabla(cab, filas, opts.clase || "pz-chica");
}
/* Barras horizontales de |efecto| (Pareto). items: [{ nombre, valor, en, activo }] */
function pareto(items, max) {
  const W = 300, h = 24, gap = 6;
  let s = `<svg viewBox="0 0 420 ${items.length * (h + gap) + 10}">`;
  items.forEach((it, i) => {
    const y = 5 + i * (h + gap), w = (Math.abs(it.valor) / max) * W;
    s += `<g data-en="${it.en}"><text x="34" y="${y + 17}" text-anchor="end">${it.nombre}</text>` +
      `<rect x="40" y="${y}" width="${w.toFixed(1)}" height="${h}" rx="3" fill="${it.activo ? COL.am : "#5b6f78"}"/>` +
      `<text x="${46 + w}" y="${y + 17}">${n(it.valor, 3)}</text></g>`;
  });
  return s + "</svg>";
}
module.exports = Object.assign({}, E, { tablaSignos, pareto });
