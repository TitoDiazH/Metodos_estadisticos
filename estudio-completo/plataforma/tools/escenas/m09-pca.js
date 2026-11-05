/* Pizarra de M09 · Componentes principales (módulo). Marcas en tools/guiones/m09-pca.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, sumaVuela, portada, cierre, cod, puntos, COL } = M;
const c = (v, en, extra = {}) => Object.assign({ v, en }, extra);

/* Los 3 puntos del ejemplo con las direcciones v1 (45°) y v2 (135°) */
const tres = puntos({ x0: -0.5, x1: 3.8, y0: -0.5, y1: 3.8, ancho: 280, alto: 250, ejes: ["x₁", "x₂"], pts: [{ x: 2, y: 0, et: "(2, 0)" }, { x: 0, y: 2, et: "(0, 2)" }, { x: 3, y: 3, et: "(3, 3)" }],
  extra: `<path class="trazo" pathLength="1" data-en="ej-v1" d="M{X:0.2},{Y:0.2} L{X:3.5},{Y:3.5}" stroke="${COL.am}" stroke-width="3"/>` +
    `<text data-en="ej-v1" x="{X:3.2}" y="{Y:3.65}" style="font-size:12px;fill:${COL.am}">PC1</text>` +
    `<path class="trazo" pathLength="1" data-en="ej-v2" d="M{X:0.2},{Y:3.2} L{X:3.2},{Y:0.2}" stroke="${COL.ro}" stroke-width="2.5"/>` +
    `<text data-en="ej-v2" x="{X:3.1}" y="{Y:0.45}" style="font-size:12px;fill:${COL.ro}">PC2</text>` });

/* Scree de la ayudantía */
function scree() {
  const l = [2.137, 0.982, 0.744, 0.138], X = (k) => 50 + k * 75, Y = (v) => 190 - (v / 2.3) * 170;
  let s = `<svg viewBox="0 0 320 220"><path class="ejes" d="M30,10 V190 H310"/>`;
  s += `<line data-en="ay-k" x1="30" x2="310" y1="${Y(1)}" y2="${Y(1)}" stroke="${COL.ro}" stroke-dasharray="6 4"/><text data-en="ay-k" x="300" y="${Y(1) - 5}" text-anchor="end" style="font-size:11px;fill:${COL.ro}">λ = 1</text>`;
  s += `<path class="trazo" pathLength="1" data-en="ay-l" d="${l.map((v, k) => `${k ? "L" : "M"}${X(k)},${Y(v)}`).join(" ")}" fill="none" stroke="${COL.ce}" stroke-width="3"/>`;
  l.forEach((v, k) => { s += `<g data-en="ay-l"><circle cx="${X(k)}" cy="${Y(v)}" r="5" fill="${COL.ce}"/><text x="${X(k) + 8}" y="${Y(v) - 8}" style="font-size:12px">${n(v, 2)}</text><text x="${X(k)}" y="208" text-anchor="middle" style="font-size:12px">PC${k + 1}</text></g>`; });
  return s + "</svg>";
}

const escenas = [
  portada(9, "Prueba 1 · también P4", "Componentes principales", "Muchas variables correlacionadas resumidas en pocas"),

  { en: "idea", html: kicker("Qué es PCA") + titulo("Pocas variables nuevas que resumen casi todo") +
    `<div class="pz-cols"><div class="pz-col">` +
    nota({ en: "idea-pca" }, "Crea <strong>componentes</strong>: combinaciones lineales de las variables") +
    nota({ en: "no-elim-r" }, "<strong>No elimina variables</strong>: cada componente usa todas", "mal") +
    lista([["pc1", "PC1: la mayor varianza posible"], ["pc2", "PC2: la mayor de lo que queda, perpendicular a PC1"]]) +
    `</div><div class="pz-col">` + p({ en: "lim" }, "<strong>Lo que no hace:</strong>") +
    lista([["lim-1", "decidir solo qué variables importan"], ["lim-2", "garantizar una interpretación clara"], ["lim-3", "relaciones no lineales"]]) + "</div></div>" },

  { en: "const", html: kicker("Cómo se construye") + titulo("Centrar, covarianza, valores propios") +
    `<div class="pz-col">` +
    paso(1, "centrar", "Centrar: restar la media de cada variable") +
    paso(2, "s", "Matriz de covarianza S") +
    paso(3, "eig", `Valores y vectores propios: ${$("Sv=\\lambda v")}`) + "</div>" +
    `<div class="pz-cols">` +
    nota({ en: "eig-v" }, "<strong>Vector propio</strong> = dirección (componente)") +
    nota({ en: "eig-l" }, "<strong>Valor propio</strong> = varianza en esa dirección", "ok") + "</div>" +
    formula({ en: "max" }, "PC_1:\\ \\max_{\\lVert w\\rVert=1} w^{\\top}Sw\\ \\Rightarrow\\ Sw=\\lambda_1 w") },

  { en: "ej", html: kicker("Ejemplo a mano") + titulo("3 observaciones, 2 variables") +
    `<div class="pz-cols"><div style="height:46cqh">${tres}</div><div class="pz-col">` +
    formula({ en: "ej-s" }, "S=\\begin{pmatrix}2{,}33&0{,}33\\\\0{,}33&2{,}33\\end{pmatrix}") +
    tabla(["", "λ", "vector"], [[{ v: "PC1", th: true }, c("2,667", "ej-l", { id: "l1" }), c($("\\tfrac{1}{\\sqrt2}(1,\\ 1)"), "ej-v1")], [{ v: "PC2", th: true }, c("2", "ej-l", { id: "l2" }), c($("\\tfrac{1}{\\sqrt2}(1,\\,-1)"), "ej-v2")]], "pz-chica") +
    p({ en: "ej-v1", clase: "pz-tenue" }, "PC1: las dos pesan igual y suman · PC2: una menos la otra") +
    `<div class="pz-caja-calc"><span class="pz-etq">% de PC1</span>` +
    `<div class="pz-suma"><span data-en="ej-var-r" data-desde="l1">2,667</span> <span data-en="ej-var-r@0.8" class="pz-t-op">÷ (</span><span data-en="ej-var-r@0.8">2,667 + 2</span><span data-en="ej-var-r@0.8" class="pz-t-op">)</span> ` +
    `<span data-en="ej-var-r@2.5" class="pz-t-op">=</span> <span data-en="ej-var-r@2.5" class="pz-res">57 %</span></div></div>` + "</div></div>" },

  { en: "load", html: kicker("Dos palabras clave") + titulo("Loadings y scores") +
    `<div class="pz-cols">` +
    nota({ en: "load-def" }, "<strong>Loadings</strong>: pesos de cada variable en el componente (el vector propio)") +
    nota({ en: "score" }, "<strong>Scores</strong>: valores de cada observación en los componentes") + "</div>" +
    formula({ en: "score-f" }, "z_{i}=\\sum_j \\tilde x_{ij}\\,v_{j}") +
    nota({ en: "score-ojo" }, "Si el PCA usó variables <strong>estandarizadas</strong>, un dato nuevo se estandariza primero con la media y sd de la muestra", "mal") +
    p({ en: "score-ojo-r", clase: "pz-tenue" }, "Con valores crudos manda la variable de números grandes") },

  { en: "cuantos", html: kicker("¿Cuántos componentes?") + titulo("Tres reglas") +
    `<div class="pz-cols pz-cols-37"><div class="pz-col">` +
    lista([["r80", "Acumular ≥ <strong>80 %</strong>"], ["kaiser", "Kaiser: <strong>λ &gt; 1</strong> (datos estandarizados)"], ["codo", "El <strong>codo</strong> del scree plot"]]) +
    nota({ en: "sd-r" }, "<code>summary</code> da la <strong>sd</strong>: λ = sd²", "mal") +
    `</div><div class="pz-col">` +
    tabla(["", "PC1", "PC2", "PC3", "PC4"], [
      [{ v: "sd", th: true }].concat(["1,46", "0,99", "0,86", "0,37"].map((v, i) => c(v, "ay", { id: "sd" + i }))),
      [{ v: "λ = sd²", th: true }].concat(["2,14", "0,98", "0,74", "0,14"].map((v, i) => c(v, `ay-l@${(i * 0.9).toFixed(1)}`, { desde: "sd" + i, hl: i === 0 ? ["ay-k", "ay-codo"] : null }))),
      [{ v: "acumulado", th: true }].concat(["53 %", "78 %", "97 %", "100 %"].map((v, i) => c(v, "ay-80", { hl: i === 2 ? ["ay-80", "ay-c"] : null })))], "pz-chica") +
    `<div style="height:30cqh">${scree()}</div>` +
    p({ en: "ay-k", clase: "pz-tenue" }, "Kaiser: 1 · codo: 1 · 80 %: <strong>3</strong> ⇒ no coinciden, hay que <span class=\"pz-am\">justificar</span>") + "</div></div>" },

  { en: "r", html: kicker("En R · mtcars") + titulo("prcomp y los loadings") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col">` +
    cod("r", `pca <- prcomp(mtcars, scale. = TRUE)
summary(pca)          # varianza explicada
pca$rotation          # loadings
pca$x                 # scores`, [["summary(pca)", "r-s"], ["pca$rotation", "r-rot"], ["pca$x", "r-x"]]) +
    tabla(["", "PC1", "PC2", "Acum."], [[{ v: "% var.", th: true }, c("60 %", "mt-var"), c("24 %", "mt-var"), c("84 %", "mt-var")]], "pz-chica") +
    nota({ en: "mt-regla" }, "|loading| ≥ 0,3 relevante · ≥ 0,4 fuerte") +
    `</div><div class="pz-col">` +
    tabla(["", "PC1"], [[c("cyl", "mt-pc1"), c("+0,37", "mt-pc1", { clase: "pz-am" })], [c("disp", "mt-pc1"), c("+0,37", "mt-pc1", { clase: "pz-am" })], [c("hp", "mt-pc1"), c("+0,33", "mt-pc1", { clase: "pz-am" })], [c("wt", "mt-pc1"), c("+0,35", "mt-pc1", { clase: "pz-am" })], [c("mpg", "mt-pc1"), c("−0,36", "mt-pc1", { clase: "pz-ce" })]], "pz-mini") +
    nota({ en: "mt-pc1-r" }, "PC1: <strong>tamaño y potencia vs. eficiencia</strong>", "ok") +
    p({ en: "mt-pc2", clase: "pz-tenue" }, "PC2: configuración deportiva (gear, am, carb vs. qsec)") +
    p({ en: "signo", clase: "pz-tenue" }, "El signo de un componente completo es arbitrario") + "</div></div>" },

  cierre(9, [["c1", "Combinaciones lineales perpendiculares ordenadas por varianza"], ["c2", "Vector propio = dirección · valor propio = varianza"], ["c3", "80 %, Kaiser o codo; en R, λ = sd²"], ["c4", "Interpretar por los loadings grandes y sus signos"]])
];
module.exports = { escenas };
