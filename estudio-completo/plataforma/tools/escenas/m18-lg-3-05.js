"use strict";
const { n, $, c, k, kicker, titulo, tabla, formula, nota, p, lista, portada, enunciado, COL } = require("./_ej");
/* Densidad F(4,15), escalada para el dibujo */
const d1 = 4, d2 = 15, lg = (x) => { let a = 1; for (let i = 2; i < x; i++) a *= i; return a; };
const f = (x) => (x <= 0 ? 0 : Math.pow(x, d1 / 2 - 1) * Math.pow(1 + (d1 * x) / d2, -(d1 + d2) / 2));
const X = (x) => 40 + x * 38, Yp = (y) => 190 - y * 330;
let curva = "", area = `M${X(7.5)},${Yp(0)}`;
for (let x = 0; x <= 9.001; x += 0.05) { curva += `${x ? "L" : "M"}${X(x).toFixed(1)},${Yp(f(x)).toFixed(1)} `; if (x >= 7.5) area += ` L${X(x).toFixed(1)},${Yp(f(x)).toFixed(1)}`; }
area += ` L${X(9)},${Yp(0)} Z`;
const svg = `<svg viewBox="0 0 420 220"><path class="ejes" d="M40,20 V190 H400"/>` +
  `<path d="${area}" fill="${COL.am}" opacity=".6" data-en="pval-area"/>` +
  `<path class="trazo" pathLength="1" data-en="pval-curva" d="${curva}" fill="none" stroke="${COL.ce}" stroke-width="3"/>` +
  `<g data-en="pval-f0"><line x1="${X(7.5)}" y1="190" x2="${X(7.5)}" y2="120" stroke="${COL.ro}" stroke-width="2.5"/><text x="${X(7.5) - 6}" y="112" text-anchor="end" style="fill:${COL.ro}">F₀ = 7,5</text></g>` +
  `<g data-en="crit"><line x1="${X(3.06)}" y1="190" x2="${X(3.06)}" y2="140" stroke="${COL.ve}" stroke-width="2" stroke-dasharray="4 3"/><text x="${X(3.06) + 4}" y="136" style="fill:${COL.ve};font-size:12px">crítico 3,06</text></g>` +
  `<text x="${X(7.9)}" y="170" data-en="pval-area" style="fill:${COL.am};font-size:14px">p = 0,0016</text>` +
  [0, 2, 4, 6, 8].map((v) => `<text x="${X(v)}" y="208" text-anchor="middle">${v}</text>`).join("") + `<text x="250" y="40" data-en="pval-curva">F(4, 15)</text></svg>`;
module.exports = { escenas: [
  portada("Libro guía · Cap. 3, ej. 5", "Completar una tabla ANOVA", "La pregunta corta típica de ANOVA"),
  enunciado("Libro guía · Cap. 3, ej. 5", `Parte del ANOVA para comparar ${k("clave1", "cinco tratamientos con cuatro réplicas cada uno")}. ` +
    `${k("clave2", "Se conocen solo SC de tratamientos (800) y del error (400)")}.`,
    tabla(["Fuente", "SC", "gl", "CM", "F₀"], [["Tratamiento", "800", "?", "?", "?"], ["Error", "400", "?", "?", ""], ["Total", "?", "?", "", ""]])),
  { en: "piezas", html: kicker("Completar la tabla") + titulo("k = 5 · n = 4 · N = 20") +
    tabla(["Fuente", "SC", "gl", "CM", "F₀"], [
      ["Tratamiento", "800", c("k − 1 = <strong>4</strong>", "gl"), c("800 / 4 = <strong>200</strong>", "cm"), c("200 / 26,67 = <strong>7,5</strong>", "f-r", { hl: ["f-r", "pval"] })],
      ["Error", "400", c("N − k = <strong>15</strong>", "gl-e"), c("400 / 15 = <strong>26,67</strong>", "cme"), ""],
      ["Total", c("800 + 400 = <strong>1200</strong>", "sct"), c("N − 1 = <strong>19</strong>", "gl-t"), "", ""]]) +
    nota({ en: "gl-t" }, "Los gl y las SC se <strong>suman</strong>: 4 + 15 = 19 · 800 + 400 = 1200") +
    formula({ en: "f" }, "F_0=\\frac{CM_{TRAT}}{CM_E}=\\frac{200}{26{,}67}") },
  { en: "pval", html: kicker("El valor-p, en un dibujo") + titulo("Área a la derecha de F₀") +
    `<div class="pz-cols pz-cols-64"><div style="height:58cqh">${svg}</div><div class="pz-col">` +
    p({ en: "pval-curva" }, "Bajo H₀: " + $("F_0\\sim F_{4,15}")) + formula({ en: "pval-area" }, "p=P(F_{4,15}>7{,}5)=0{,}0016") +
    `<pre class="pz-code" data-en="pval-r"><code>pf(7.5, 4, 15, lower.tail = FALSE)</code></pre></div></div>` },
  { en: "conc", html: kicker("¿Hay diferencias?") + titulo("Sí, pero la tabla no dice cuáles") +
    nota({ en: "conc-r" }, "7,5 &gt; F(4, 15) = 3,06 ⇒ se rechaza la igualdad de las 5 medias", "ok") +
    nota({ en: "cuales" }, "Para saber <strong>cuáles</strong> difieren: medias + LSD o Tukey", "mal") +
    formula({ en: "modelo" }, "Y_{ij}=\\mu+\\tau_i+\\varepsilon_{ij},\\quad \\varepsilon_{ij}\\sim N(0,\\sigma^2)") +
    formula({ en: "h0" }, "H_0:\\mu_1=\\mu_2=\\dots=\\mu_5") +
    nota({ en: "fin" }, "gl y SC se suman; todo lo demás sale dividiendo", "ok") }
] };
