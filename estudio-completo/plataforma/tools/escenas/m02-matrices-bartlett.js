/* Pizarra de M02 · Matrices y Bartlett. Marcas en tools/guiones/m02-matrices-bartlett.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, portada, cierre, cod, COL } = M;
const c = (v, en, extra = {}) => Object.assign({ v, en }, extra);

const escenas = [
  portada(2, "Prueba 1", "Matrices de covarianza y correlación", "Todas las relaciones en una tabla, y el test de Bartlett"),

  { en: "idea", html: kicker("Muchas variables") + titulo("La matriz de covarianza") +
    `<div class="pz-cols"><div style="font-size:1.25em">` +
    formula({ en: "idea-m" }, "\\Sigma=\\begin{pmatrix}\\color{#ffd166}{\\sigma_1^2}&\\color{#7cc6fe}{\\sigma_{12}}&\\color{#7cc6fe}{\\sigma_{13}}\\\\\\color{#7cc6fe}{\\sigma_{21}}&\\color{#ffd166}{\\sigma_2^2}&\\color{#7cc6fe}{\\sigma_{23}}\\\\\\color{#7cc6fe}{\\sigma_{31}}&\\color{#7cc6fe}{\\sigma_{32}}&\\color{#ffd166}{\\sigma_3^2}\\end{pmatrix}") +
    `</div><div class="pz-col">` +
    lista([["diag", "<span class=\"pz-am\">Diagonal</span>: varianzas"], ["fuera", "<span class=\"pz-ce\">Fuera</span>: covarianzas de cada par"], ["sim", "<strong>Simétrica</strong>: σ₁₂ = σ₂₁"]]) + "</div></div>" },

  { en: "valida", html: kicker("Pregunta típica") + titulo("¿Puede ser una matriz de covarianza?") +
    `<div class="pz-cols"><div class="pz-col">` +
    paso(1, "valida-1", "Simétrica") + paso(2, "valida-2", "Diagonal sin negativos") +
    paso(3, { en: "valida-3", hl: ["valida-3", "neg-r"] }, "<strong>Semidefinida positiva</strong>") +
    formula({ en: "sdp" }, "z^{\\top}\\Sigma z\\ \\ge\\ 0\\quad\\forall z") +
    p({ en: "sdp-int", clase: "pz-tenue" }, "Es la varianza de una combinación: nunca negativa") +
    `</div><div class="pz-col">` +
    nota({ en: "sdp-eig" }, "En la práctica: todos los <strong>valores propios ≥ 0</strong>", "ok") +
    nota({ en: "neg-r" }, "Un valor propio negativo ⇒ <strong>no</strong> es matriz de covarianza", "mal") +
"</div></div>" },

  { en: "ay", html: kicker("Ayudantía 1") + titulo("¿Es definida positiva?") +
    formula({ en: "ay" }, "\\Sigma=\\begin{pmatrix}4&1\\\\1&3\\end{pmatrix}") +
    `<div class="pz-col" style="font-size:1.1em">` +
    paso(1, "ay-q", $("z^{\\top}\\Sigma z=4z_1^2+2z_1z_2+3z_2^2")) +
    paso(2, "ay-re", $("=(z_1+z_2)^2+3z_1^2+2z_2^2")) +
    paso(3, "ay-r", "Suma de cuadrados: solo vale 0 si z = 0 ⇒ <strong>definida positiva</strong>") + "</div>" +
    calc({ etiqueta: "Comprobación: ", partes: [["ay-eig", "\\lambda=4{,}618;\\ 2{,}382"]], tRes: "ay-eig@2", res: "ambos > 0 ✓" }) +
    nota({ en: "corr-val" }, "¿Y una matriz de <strong>correlación</strong>? Además: unos en la diagonal y |r| ≤ 1") +
    p({ en: "corr-trampa", clase: "pz-tenue" }, "…y también tiene que ser semidefinida positiva") },

  { en: "r", html: kicker("En R") + titulo("cov y eigen") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col">` +
    cod("r", `S <- cov(datos)      # divide por n − 1
eigen(S)$values`, [["eigen(S)$values", "r-eig"]]) +
    tabla(["λ₁", "λ₂", "λ₃", "λ₄"], [[c("4,350", "r-ej-val", { hl: ["r-ej-1"] }), c("0,527", "r-ej-val"), c("0,276", "r-ej-val"), c("0,023", "r-ej-val")]]) +
    `</div><div class="pz-col">` +
    nota({ en: "r-ej-1" }, "El primero concentra casi toda la variación") +
    calc({ partes: [["r-ej-traza", "\\sum\\lambda=\\operatorname{tr}(S)"]], tRes: "r-ej-traza@2.5", res: "5,18" }) +
    nota({ en: "r-ej-pca" }, "Base de componentes principales (M09)", "ok") + "</div></div>" },

  { en: "cor", html: kicker("Matriz de correlación") + titulo("La de covarianza sin unidades") +
    formula({ en: "cor-f" }, "r_{ij}=\\frac{s_{ij}}{\\sqrt{s_{ii}\\,s_{jj}}}") +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "cor-ej" }, "Tiempo, costo y distancia:") +
    formula({ en: "cor-ej" }, "\\Sigma=\\begin{pmatrix}16&6&8\\\\6&9&1\\\\8&1&25\\end{pmatrix}") +
    p({ en: "cor-ej-sd" }, `Desviaciones: ${$("4;\\ 3;\\ 5")}`) +
    `</div><div class="pz-col"><div class="pz-caja-calc"><span class="pz-etq">correlaciones</span><div class="pz-col">` +
    calc({ partes: [["cor-ej-12", "r_{12}=\\frac{6}{4\\cdot3}"]], tRes: "cor-ej-12@2", res: "0,5" }) +
    calc({ partes: [["cor-ej-13", "r_{13}=\\frac{8}{4\\cdot5}"]], tRes: "cor-ej-13@2", res: "0,4" }) +
    calc({ partes: [["cor-ej-23", "r_{23}=\\frac{1}{3\\cdot5}"]], tRes: "cor-ej-23@2", res: "0,067" }) + "</div></div>" +
    nota({ en: "cor-ej-r" }, "Más fuerte: tiempo–costo (0,5)", "ok") +
    cod("cor-r", "cor(datos)    # o cov2cor(Sigma)") + "</div></div>" },

  { en: "bart", html: kicker("Test de Bartlett") + titulo("¿Las variables están correlacionadas?") +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "bart-por", clase: "pz-tenue" }, "Si no lo están, no hay nada que resumir (PCA, AF)") +
    formula({ en: "bart-h0" }, "H_0:\\ R=I") + formula({ en: "bart-h1" }, "H_1:\\ R\\ne I") +
    p({ en: "bart-sup", clase: "pz-tenue" }, "Supone normalidad multivariada") +
    `</div><div class="pz-col">` +
    formula({ en: "bart-f" }, "\\chi^2_B=-\\Bigl(n-1-\\tfrac{2p+5}{6}\\Bigr)\\ln|R|") +
    formula({ en: "bart-gl" }, "gl=\\frac{p(p-1)}{2}") +
    nota({ en: "bart-int" }, "R = I ⇒ |R| = 1 ⇒ ln|R| = 0 ⇒ χ² = 0") +
    nota({ en: "bart-int2" }, "Más correlación ⇒ |R| más chico ⇒ χ² más grande", "ok") + "</div></div>" },

  { en: "bart-ej", html: kicker("Bartlett · Ayudantía 1") + titulo("n = 10, p = 3") +
    `<div class="pz-caja-calc"><span class="pz-etq">cálculo</span><div class="pz-col">` +
    calc({ partes: [["bart-ej-det", "|R|=0{,}612\\ \\Rightarrow\\ \\ln|R|"]], tRes: "bart-ej-det@2.5", res: "−0,491", idRes: "ln" }) +
    calc({ partes: [["bart-ej-c", "9-\\tfrac{11}{6}"]], tRes: "bart-ej-c@1.5", res: "7,167", idRes: "coef" }) +
    `<div class="pz-suma"><span data-en="bart-ej-x" data-desde="coef">7,167</span> <span data-en="bart-ej-x@0.6" class="pz-t-op">×</span> <span data-en="bart-ej-x@0.6">0,491</span>` +
    ` <span data-en="bart-ej-x@1.6" class="pz-t-op">=</span> <span data-en="bart-ej-x@1.6" class="pz-res" data-id="chi">3,52</span></div>` + "</div></div>" +
    tabla(["χ²", "gl", "crítico", "Decisión"], [[c("3,52", "bart-ej-x@2.4", { desde: "chi" }), c("3", "bart-ej-gl"), c("7,81", "bart-ej-crit"), c("<strong>No se rechaza</strong>", "bart-ej-r", { hl: ["bart-ej-r", "bart-ojo"] })]]) +
    nota({ en: "bart-ojo" }, "No rechazar ≠ «no hay correlación»: con n = 10 puede faltar muestra", "mal") +
    nota({ en: "bart-clase" }, "Ejemplo de clase: χ² = 26,9, p = 0,0001 ⇒ se rechaza ⇒ tiene sentido PCA", "ok") +
    cod("bart-r", "psych::cortest.bartlett(R, n = nrow(datos))", [["n = nrow(datos)", "bart-r-n"]]) },

  cierre(2, [["c1", "Covarianza: simétrica, varianzas en la diagonal, valores propios ≥ 0"], ["c2", "Correlación: la misma sin unidades, unos en la diagonal"], ["c3", "Bartlett: H₀ R = I; si se rechaza, hay correlación que resumir"]])
];
module.exports = { escenas };
