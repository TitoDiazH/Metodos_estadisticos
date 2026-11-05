/* Pizarra de M08 · T² de Hotelling. Marcas en tools/guiones/m08-t2-hotelling.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, portada, cierre, cod, COL } = M;
const c = (v, en, extra = {}) => Object.assign({ v, en }, extra);

/* Rectángulo (pruebas separadas) vs elipse (conjunta) con un punto dentro del rectángulo y fuera de la elipse */
const regiones = `<svg viewBox="0 0 300 230"><path class="ejes" d="M20,215 H290 M20,215 V10"/>` +
  `<g data-en="elipse"><rect x="70" y="40" width="160" height="150" fill="${COL.am}" opacity=".1" stroke="${COL.am}" stroke-dasharray="6 4" stroke-width="2"/></g>` +
  `<text data-en="elipse" x="75" y="34" style="font-size:12px;fill:${COL.am}">t separadas</text>` +
  `<g data-en="elipse-2"><ellipse cx="150" cy="115" rx="105" ry="38" transform="rotate(-40 150 115)" fill="${COL.ce}" opacity=".2" stroke="${COL.ce}" stroke-width="2.5"/></g>` +
  `<text data-en="elipse-2" x="205" y="205" style="font-size:12px;fill:${COL.ce}">T² conjunta</text>` +
  `<g data-en="elipse-3"><circle cx="80" cy="52" r="6" fill="${COL.ro}"/><text x="88" y="48" style="font-size:12px;fill:${COL.ro}">μ₀</text></g></svg>`;

const escenas = [
  portada(8, "Prueba 1", "T² de Hotelling", "Probar varias medias a la vez"),

  { en: "idea", html: kicker("Un vector de medias") + titulo("¿Por qué no varias pruebas t?") +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "idea-ej" }, "Ej.: largo <em>y</em> ancho de una pieza, juntos") +
    lista([["tes-r2", "Varias pruebas acumulan el <strong>error global</strong>"], ["tes-r3", "Ignoran la <strong>correlación</strong> entre variables"], ["tes-r4", "Pueden no rechazar una a una y rechazar en conjunto (o al revés)"]]) +
    nota({ en: "sup" }, "Supuesto: normal multivariada · verificar con <strong>Mardia</strong>") +
    `</div><div style="height:48cqh">${regiones}</div></div>` },

  { en: "t2", html: kicker("El estadístico") + titulo("La t de Student en varias dimensiones") +
    formula({ en: "t2-f" }, "T^2=n\\,(\\bar x-\\mu_0)'\\,S^{-1}\\,(\\bar x-\\mu_0)") +
    p({ en: "t2-int", clase: "pz-tenue" }, "Distancia de x̄ a μ₀, pesando cada dirección con S") +
    nota({ en: "t2-uno" }, "Con una sola variable: T² = t²") +
    formula({ en: "t2-f3" }, "\\color{#ffd166}{\\frac{n-p}{(n-1)\\,p}}\\,T^2\\sim F_{(p,\\ n-p)}") +
    nota({ en: "t2-ojo" }, "Error típico: olvidar la constante y comparar T² directo con F", "mal") },

  { en: "ej", html: kicker("Ejemplo · n = 10, p = 2") + titulo("H₀: μ = (13; 9)") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["", "X₁", "X₂"], [[{ v: "x̄", th: true }, c("13,91", "ej-xbar"), c("9,21", "ej-xbar")], [{ v: "μ₀", th: true }, c("13", "ej-mu"), c("9", "ej-mu")]], "pz-chica") +
    `<div class="pz-caja-calc"><span class="pz-etq">cálculo</span><div class="pz-col">` +
    calc({ partes: [["ej-t2", "T^2"]], tRes: "ej-t2@0.8", res: "3,52", idRes: "t2" }) +
    `<div class="pz-suma"><span data-en="ej-f">F = </span><span data-en="ej-f" class="pz-am">8/18</span> <span data-en="ej-f@0.6" class="pz-t-op">×</span> <span data-en="ej-f@0.6" data-desde="t2">3,52</span>` +
    ` <span data-en="ej-f@1.8" class="pz-t-op">=</span> <span data-en="ej-f@1.8" class="pz-res">1,57</span></div>` + "</div></div>" +
    `</div><div class="pz-col">` +
    tabla(["gl", "p-valor", "Decisión"], [[c("(2, 8)", "ej-f@2.5"), c("0,27", "ej-p"), c("No se rechaza", "ej-r")]]) +
    nota({ en: "ej-crit" }, "Crítico de T²: 10,03 &gt; 3,52") +
    nota({ en: "ej-el" }, "μ₀ cae <strong>dentro</strong> de la elipse de confianza", "ok") +
    cod("r", "ICSNP::HotellingsT2(X, mu = c(13, 9))") + "</div></div>" },

  { en: "reg", html: kicker("Región de confianza") + titulo("Una elipse centrada en x̄") +
    nota({ en: "reg-ej" }, "Ejes e inclinación: valores y vectores propios de S") +
    nota({ en: "reg-r" }, "μ₀ dentro ⇒ no se rechaza · μ₀ fuera ⇒ se rechaza", "ok") +
    p({ en: "sim" }, "<strong>Si se rechaza: ¿qué variable lo explica?</strong>") +
    nota({ en: "sim-def" }, "<strong>Intervalos simultáneos</strong>: confianza global del 95 % para todas las combinaciones") +
    p({ en: "sim-lee", clase: "pz-tenue" }, "El intervalo que no contiene el valor de H₀ señala la diferencia") },

  { en: "corteza", html: kicker("Ejemplo de clase") + titulo("Corcho en 28 árboles, 4 direcciones") +
    p({ en: "corteza-t2" }, "T² = 20,74 · p = 0,002 ⇒ <strong>se rechaza</strong>") +
    tabla(["Contraste", "IC simultáneo 95 %", "¿Contiene 0?"], [
      [c("(N + S) − (E + W)", "corteza-int", { hl: ["corteza-int", "bonf"] }), c("[2,18; 15,53]", "corteza-int", { hl: ["corteza-int", "bonf"] }), c("<strong>No</strong>", "corteza-int", { hl: ["corteza-int", "bonf"] })],
      [c("N − S", "corteza-otros"), c("[−3,83; 5,55]", "corteza-otros"), c("Sí", "corteza-otros")],
      [c("E − W", "corteza-otros"), c("[−4,98; 6,98]", "corteza-otros"), c("Sí", "corteza-otros")]], "pz-chica") +
    p({ en: "corteza-r", clase: "pz-ve" }, "La diferencia: eje norte–sur vs. eje este–oeste") +
    tabla(["Intervalos", "Factor (n = 10, p = 2)", "Ancho"], [[c("T²", "bonf-r2"), c("3,17", "bonf-ej"), c("más anchos (cualquier combinación)", "bonf-r2")], [c("Bonferroni", "bonf-r"), c("2,69", "bonf-ej"), c("más angostos (solo las medias)", "bonf-r")]], "pz-mini") },

  cierre(8, [["c1", "Prueba conjunta, no varias t separadas"], ["c2", "(n − p)/((n − 1)p) · T² ~ F(p, n − p)"], ["c3", "Región de confianza: una elipse"], ["c4", "Intervalos simultáneos para saber qué explica el rechazo"]])
];
module.exports = { escenas };
