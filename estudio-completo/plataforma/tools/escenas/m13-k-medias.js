/* Pizarra de M13 · K-medias y elección de k. Marcas en tools/guiones/m13-k-medias.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, sumaVuela, portada, cierre, cod, puntos, COL } = M;

const E = { E1: [-0.79, -1.29], E2: [-1.02, -0.68], E5: [0.85, -1.29], E7: [0.85, 0.99], E8: [1.13, 1.29] };
const pts = Object.entries(E).map(([et, [x, y]]) => ({ x, y, et, g: ["E7", "E8"].includes(et) ? 1 : 0 }));
/* Centroides como cruces: inicial (E1, E8) y nuevos */
const cruz = (x, y, c, mk) => `<g data-en="${mk}"><path d="M{X:${x - 0.09}},{Y:${y - 0.09}} L{X:${x + 0.09}},{Y:${y + 0.09}} M{X:${x - 0.09}},{Y:${y + 0.09}} L{X:${x + 0.09}},{Y:${y - 0.09}}" stroke="${c}" stroke-width="4"/></g>`;
const plano = (extra, en = {}) => puntos({ pts, x0: -1.4, x1: 1.5, y0: -1.6, y1: 1.6, ancho: 340, alto: 250, ejes: ["inversión (z)", "ventas (z)"], en, extra });

/* Codo: WSS por k */
function codo() {
  const w = [100, 60, 45, 42, 41], X = (k) => 40 + k * 70, Y = (v) => 200 - (v / 100) * 170;
  let s = `<svg viewBox="0 0 340 230"><path class="ejes" d="M30,10 V200 H330"/>`;
  w.forEach((v, k) => { s += `<text x="${X(k)}" y="218" text-anchor="middle" style="font-size:12px">${k + 1}</text>`; });
  const d = w.map((v, k) => `${k ? "L" : "M"}${X(k)},${Y(v)}`).join(" ");
  s += `<path class="trazo" pathLength="1" data-en="codo-1" d="${d}" fill="none" stroke="${COL.ce}" stroke-width="3"/>`;
  w.forEach((v, k) => { s += `<g data-en="codo-${Math.max(k, 1)}"><circle cx="${X(k)}" cy="${Y(v)}" r="5" fill="${COL.ce}"/><text x="${X(k) + 8}" y="${Y(v) - 8}" style="font-size:12px;fill:${COL.ce}">${v}</text></g>`; });
  s += `<g data-en="codo-k"><circle cx="${X(2)}" cy="${Y(45)}" r="14" fill="none" stroke="${COL.am}" stroke-width="3"/><text x="${X(2)}" y="${Y(45) + 34}" text-anchor="middle" style="font-size:13px;fill:${COL.am}">codo</text></g>`;
  return s + `<text x="185" y="230" text-anchor="middle" style="font-size:11px;opacity:.7">k</text></svg>`;
}

const escenas = [
  portada(13, "Prueba 2", "K-medias y elección de k", "Repartir en k grupos alternando asignar y recalcular centroides"),

  { en: "idea", html: kicker("Método de partición") + titulo("Tú das k; el algoritmo reparte") +
    `<div class="pz-cols"><div class="pz-col">` +
    nota({ en: "idea" }, "Jerárquicos: árbol completo · <strong>K-medias</strong>: directamente k grupos") +
    nota({ en: "centro" }, "Cada grupo tiene un <span class=\"pz-am\">centroide</span> = la media de sus puntos") + `</div><div class="pz-col">` +
    formula({ en: "wss" }, "\\min\\ \\underbrace{\\sum_{j=1}^{k}\\sum_{i\\in C_j}\\lVert x_i-\\mu_j\\rVert^2}_{WSS}") +
    p({ en: "wss", clase: "pz-tenue" }, "suma de cuadrados dentro de los clústeres") + "</div></div>" +
    `<div class="pz-col">` + paso(1, "alg-ini", "Elegir k centroides iniciales") + paso(2, "alg-asig", "Asignar cada punto al centroide <strong>más cercano</strong>") +
    paso(3, "alg-act", "Recalcular cada centroide como la <strong>media</strong> de su grupo") + paso(4, "alg-rep", "Repetir hasta que las asignaciones no cambien") + "</div>" },

  { en: "ej", html: kicker("Ejemplo · 5 empresas estandarizadas, k = 2") + titulo("Iteración 1: asignar") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["", "d(·, μ₁ = E1)", "d(·, μ₂ = E8)", "Grupo"], [
      ["E1", "0,00", "3,22", { v: "1", en: "it1", clase: "pz-ce" }],
      ["E2", { v: "0,65", en: "it1-e2", hl: ["it1-e2", "it1-e5"] }, { v: "2,92", en: "it1-e2" }, { v: "1", en: "it1-e2@1.5" }],
      ["E5", { v: "1,64", en: "it1-e5", hl: ["it1-e5", "it1-e7"] }, { v: "2,60", en: "it1-e5" }, { v: "1", en: "it1-e5@1.5" }],
      ["E7", { v: "2,81", en: "it1-e7" }, { v: "0,42", en: "it1-e7", hl: ["it1-e7", "it1-r"] }, { v: "2", en: "it1-e7@1.2" }],
      ["E8", "3,22", "0,00", { v: "2", en: "it1" }]]) +
    nota({ en: "it1-r" }, "Grupo 1 = {E1, E2, E5} · Grupo 2 = {E7, E8}") +
    `</div><div style="height:48cqh">${plano(cruz(-0.79, -1.29, COL.am, "ej-ini") + cruz(1.13, 1.29, COL.am, "ej-ini"), { 1: "it1-r" })}</div></div>` },

  { en: "mu", html: kicker("Recalcular centroides") + titulo("La media de cada grupo") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["Grupo 1", "inversión", "ventas"], [["E1", { v: "−0,79", id: "a1" }, { v: "−1,29", id: "b1" }], ["E2", { v: "−1,02", id: "a2" }, { v: "−0,68", id: "b2" }], ["E5", { v: "0,85", id: "a3" }, { v: "−1,29", id: "b3" }],
      [{ v: "μ₁", th: true }, { v: "<strong>−0,32</strong>", en: "mu1@4", desde: "m1x", tot: true }, { v: "<strong>−1,09</strong>", en: "mu1-v@0.8", tot: true }]]) +
    `<div class="pz-caja-calc"><span class="pz-etq">cálculo</span><div class="pz-pila">` +
    sumaVuela({ etiqueta: "Σ inversión", terms: [{ v: 0.79, signo: -1, desde: "a1" }, { v: 1.02, signo: -1, desde: "a2" }, { v: 0.85, desde: "a3" }], tiempos: ["mu1", "mu1@0.8", "mu1@1.6"], tRes: "mu1@2.4", idRes: "sx", hasta: "mu1@3.2" }) +
    calc({ partes: [["mu1@3.2", "\\bar x=\\frac{-0{,}96}{3}"]], tRes: "mu1@3.6", res: "−0,32", idRes: "m1x" }) + "</div></div>" +
    `</div><div class="pz-col">` +
    tabla(["Grupo 2", "inversión", "ventas"], [["E7", "0,85", "0,99"], ["E8", "1,13", "1,29"], [{ v: "μ₂", th: true }, { v: "<strong>0,99</strong>", en: "mu2", tot: true }, { v: "<strong>1,14</strong>", en: "mu2@0.6", tot: true }]]) +
    nota({ en: "it2" }, "Iteración 2: ¿alguna empresa cambia de grupo?") +
    nota({ en: "it2-r" }, "Ninguna ⇒ <strong>convergió</strong> en 2 iteraciones", "ok") + "</div></div>" },

  { en: "local", html: kicker("Convergencia e inicio") + titulo("Siempre converge… a un óptimo local") +
    `<div class="pz-cols"><div class="pz-col">` +
    nota({ en: "local" }, "La WSS baja en cada paso y no puede bajar de 0 ⇒ converge") +
    nota({ en: "local-r" }, "Pero a un óptimo <strong>local</strong>: depende de los centroides iniciales", "mal") +
    `</div><div class="pz-col">` +
    nota({ en: "pp" }, "<strong>K-means++</strong>: siguiente centroide con probabilidad ∝ D(x)² ⇒ bien dispersos") +
    nota({ en: "nstart" }, "<strong>nstart</strong>: muchas inicializaciones, se queda con la de menor WSS", "ok") +
    cod("nstart-r", "kmeans(datos_norm, centers = 3, nstart = 25)", [["nstart = 25", "nstart-r"]]) + "</div></div>" },

  { en: "r", html: kicker("En R") + titulo("Estandarizar, kmeans y leer 3 cosas") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col">` +
    cod("r1", `datos_norm <- scale(datos)
set.seed(123)
km <- kmeans(datos_norm, centers = 3, nstart = 25)
km$cluster        # grupo de cada observación
km$centers        # centroides (en z)
km$tot.withinss   # WSS total`, [["scale(datos)", "r1", "r2"], ["km$cluster", "r3"], ["km$centers", "r-cent"], ["km$tot.withinss", "r3"]]) +
    `</div><div class="pz-col">` +
    tabla(["Grupo", "Empresas"], [[{ v: "3", en: "r-ej" }, { v: "E1 E2 E3 E4", en: "r-ej" }], [{ v: "1", en: "r-ej" }, { v: "E5 E6", en: "r-ej" }], [{ v: "2", en: "r-ej" }, { v: "E7 E8", en: "r-ej" }]], "pz-chica") +
    nota({ en: "r-num" }, "El número de cada grupo es arbitrario") +
    `<div class="pz-caja-calc"${M.at({ en: "minmax-f" })}><span class="pz-etq">volver a unidades (min–max)</span>` +
    calc({ partes: [["minmax-f", "x=w\\,(\\max-\\min)+\\min"], ["minmax-ej", "=0{,}2\\cdot100+100"]], tRes: "minmax-ej@1.5", res: "120" }) + "</div></div></div>" },

  { en: "codo", html: kicker("Elegir k") + titulo("El método del codo") +
    `<div class="pz-cols pz-cols-64"><div style="height:46cqh">${codo()}</div><div class="pz-col">` +
    nota({ en: "codo-r" }, "La WSS <strong>siempre</strong> baja al agregar grupos (con k = n llega a 0)", "mal") +
    tabla(["Paso", "ΔWSS"], [[{ v: "1 → 2", en: "codo-1" }, { v: "40", en: "codo-1" }], [{ v: "2 → 3", en: "codo-2" }, { v: "15", en: "codo-2" }],
      [{ v: "3 → 4", en: "codo-3" }, { v: "3", en: "codo-3", hl: ["codo-3", "codo-k"] }], [{ v: "4 → 5", en: "codo-4" }, { v: "1", en: "codo-4" }]], "pz-chica") +
    nota({ en: "codo-k" }, "Codo en <strong>k = 3</strong>: desde ahí la curva se aplana", "ok") + "</div></div>" },

  { en: "sil", html: kicker("Elegir k") + titulo("Coeficiente de silueta") +
    `<div class="pz-cols"><div class="pz-col">` +
    lista([["sil-a", `${$("a(i)")}: distancia media a <span class="pz-ce">su propio grupo</span> (cohesión)`], ["sil-b", `${$("b(i)")}: distancia media al <span class="pz-am">grupo vecino</span> (separación)`]]) +
    formula({ en: "sil-f" }, "s(i)=\\frac{b(i)-a(i)}{\\max\\{a(i),\\,b(i)\\}}\\in[-1,1]") +
    `</div><div class="pz-col">` +
    tabla(["s(i)", "Lectura"], [[{ v: "≈ 1", en: "sil-1" }, { v: "bien asignada", en: "sil-1" }], [{ v: "≈ 0", en: "sil-0" }, { v: "en el borde", en: "sil-0" }], [{ v: "< 0", en: "sil-neg" }, { v: "probablemente mal asignada", en: "sil-neg-r" }]]) +
    nota({ en: "sil-ej" }, "Ayudantía 5: siluetas entre 0,83 y 0,92 ⇒ k = 2 está bien", "ok") +
    nota({ en: "sil-regla" }, "Usar codo y silueta <strong>juntos</strong>") + "</div></div>" },

  cierre(13, [["c1", "Asignar ↔ recalcular centroides; converge a un óptimo local"], ["c2", "nstart = 25 para no depender del inicio"],
    ["c3", "Elegir k con el codo de la WSS, nunca con el mínimo"], ["c4", "Silueta: (b − a) / máx(a, b)"], ["c5", "Rápido y escalable; pide k, sensible a atípicos, grupos redondos"]])
];
module.exports = { escenas };
