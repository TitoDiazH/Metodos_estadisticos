/* Pizarra de M03 · Normal multivariada. Marcas en tools/guiones/m03-normal-multivariada.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, portada, cierre, cod, COL } = M;

/* Elipses de igual densidad: con rho = 0,7 (inclinada) y rho = 0 (círculo) */
const elipses = `<svg viewBox="0 0 300 240"><path class="ejes" d="M20,120 H290 M150,10 V230"/>` +
  [1, 0.7, 0.4].map((k, i) => `<g data-en="elipse" data-hasta="circulo-r"><ellipse cx="150" cy="120" rx="${110 * k}" ry="${45 * k}" transform="rotate(-45 150 120)" fill="${COL.ce}" opacity="${0.12 + i * 0.1}" stroke="${COL.ce}"/></g>`).join("") +
  [1, 0.7, 0.4].map((k, i) => `<g data-en="circulo-r"><circle cx="150" cy="120" r="${85 * k}" fill="${COL.am}" opacity="${0.12 + i * 0.1}" stroke="${COL.am}"/></g>`).join("") +
  `<text data-en="elipse-ej" data-hasta="circulo-r" x="240" y="30" style="font-size:13px;fill:${COL.ce}">ρ = 0,7</text>` +
  `<text data-en="circulo-r" x="240" y="30" style="font-size:13px;fill:${COL.am}">ρ = 0</text></svg>`;

const escenas = [
  portada(3, "Prueba 1", "Distribución normal multivariada", "La campana de Gauss para varias variables a la vez"),

  { en: "idea", html: kicker("Media + covarianza") + titulo("Dos cosas la describen entera") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "idea-dos" }, "X\\sim N_p(\\color{#ffd166}{\\mu},\\ \\color{#7cc6fe}{\\Sigma})") +
    lista([["mu", "<span class=\"pz-am\">μ</span>: vector de medias ⇒ el <strong>centro</strong>"], ["sigma", "<span class=\"pz-ce\">Σ</span>: matriz de covarianza ⇒ la <strong>forma</strong> e inclinación"]]) +
    nota({ en: "marg" }, "Cada variable por separado es normal") +
    nota({ en: "marg-no" }, "Pero que cada una sea normal <strong>no basta</strong> para que juntas lo sean", "mal") +
    `</div><div style="height:46cqh">${elipses}</div></div>` },

  { en: "indep", html: kicker("La excepción de la normal") + titulo("Correlación 0 e independencia") +
    nota({ en: "indep-r" }, "Normales <strong>conjuntas</strong> con ρ = 0 ⇒ <strong>independientes</strong>", "ok") +
    tabla(["Implicación", "¿Vale?"], [
      [{ v: "independientes ⇒ ρ = 0", en: "indep-1" }, { v: "siempre", en: "indep-1", clase: "pz-ve" }],
      [{ v: "ρ = 0 ⇒ independientes", en: "indep-2" }, { v: "solo con normal conjunta", en: "indep-2", clase: "pz-am" }]]) +
    p({ en: "pauta" }, "<strong>Pauta P1</strong> — por qué es falso en general:") +
    lista([["pauta-1", "La relación puede ser no lineal"], ["pauta-2", "Solo vale con normalidad conjunta"], ["pauta-3", "Una puede cambiar la varianza de la otra"]]) },

  { en: "suma", html: kicker("Ejercicio típico") + titulo("Y = X₁ + X₂") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "suma-mu" }, "E(Y)=\\mu_1+\\mu_2") +
    formula({ en: "suma-var" }, "\\operatorname{Var}(Y)=\\sigma_1^2+\\sigma_2^2+\\color{#ff8fab}{2\\sigma_{12}}") +
    formula({ en: "ej" }, "\\mu=(1;\\ 2)\\qquad \\Sigma=\\begin{pmatrix}4&1\\\\1&3\\end{pmatrix}") +
    p({ en: "ej-q" }, `Piden ${$("P(Y\\le5)")}`) +
    `</div><div class="pz-col"><div class="pz-caja-calc"><span class="pz-etq">cálculo</span><div class="pz-col">` +
    calc({ partes: [["ej-mu", "E(Y)=1+2"]], tRes: "ej-mu@1.2", res: "3" }) +
    calc({ partes: [["ej-var", "\\operatorname{Var}(Y)=4+3+2\\cdot1"]], tRes: "ej-var-r", res: "9", idRes: "var" }) +
    calc({ partes: [["ej-var-r@1", "\\sigma_Y=\\sqrt9"]], tRes: "ej-var-r@2", res: "3" }) +
    calc({ partes: [["ej-z", "z=\\frac{5-3}{3}"]], tRes: "ej-z@2", res: "0,667" }) +
    calc({ partes: [["ej-p", "\\Phi(0{,}667)"]], tRes: "ej-p@1.5", res: "0,7475" }) + "</div></div></div></div>" },

  { en: "ej-r", html: kicker("En R") + titulo("pnorm con la desviación, no la varianza") +
    cod("ej-r", "pnorm(5, mean = 3, sd = 3)    # 0.7475", [["sd = 3", "ej-sd"]]) +
    `<div class="pz-cols">` +
    nota({ en: "ej-sd" }, "<code>pnorm</code> pide <strong>sd</strong>: con 9 daría mal", "mal") +
    nota({ en: "olvido-r" }, "Sin 2σ₁₂ la varianza sería 7 en vez de 9", "mal") + "</div>" },

  cierre(3, [["c1", "N(μ, Σ): vector de medias y matriz de covarianza"], ["c2", "En 2D, contornos elípticos según Σ"], ["c3", "Normal conjunta: ρ = 0 ⇒ independencia"], ["c4", "Var(X₁ + X₂) = σ₁² + σ₂² + 2σ₁₂"]])
];
module.exports = { escenas };
