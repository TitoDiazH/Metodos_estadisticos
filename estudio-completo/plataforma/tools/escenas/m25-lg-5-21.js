"use strict";
const E = require("./_ej");
const A = require("./_anim");
const { n, nt, $, c, k, kicker, titulo, tabla, formula, nota, p, factorial, portada, enunciado, factDis, anovaFact, COL } = E;
const Y = [[[3900, 3600], [4300, 3700], [3700, 4100]], [[4100, 3500], [4200, 3900], [3900, 4000]], [[4000, 3800], [4300, 3600], [3600, 3800]]];
const R = factorial(Y);
/* Densidad F(2,9) ∝ (1 + 2x/9)^(-11/2); con d1 = 2 vale 1 en x = 0. */
const f = (x) => Math.pow(1 + (2 * x) / 9, -5.5);
const X = (x) => 40 + x * 70, Yp = (y) => 190 - y * 160;
let curva = "", area = `M${X(0.12)},${Yp(0)}`;
for (let x = 0; x <= 5.001; x += 0.05) { curva += `${x ? "L" : "M"}${X(x).toFixed(1)},${Yp(f(x)).toFixed(1)} `; if (x >= 0.12) area += ` L${X(x).toFixed(1)},${Yp(f(x)).toFixed(1)}`; }
area += ` L${X(5)},${Yp(0)} Z`;
const svg = `<svg viewBox="0 0 420 220"><path class="ejes" d="M40,20 V190 H400"/>` +
  `<path d="${area}" fill="${COL.am}" opacity=".35" data-en="pval-area"/>` +
  `<path class="trazo" pathLength="1" data-en="pval-curva" d="${curva}" fill="none" stroke="${COL.ce}" stroke-width="3"/>` +
  `<g data-en="pval-f0"><line x1="${X(0.12)}" y1="190" x2="${X(0.12)}" y2="${Yp(f(0.12)) - 10}" stroke="${COL.ro}" stroke-width="2.5"/>` +
  `<text x="${X(0.12) + 6}" y="${Yp(f(0.12)) - 14}" style="fill:${COL.ro}">F₀ = 0,12</text></g>` +
  `<text x="${X(1.6)}" y="${Yp(0.25)}" data-en="pval-area" style="fill:${COL.am};font-size:16px">área = 0,892</text>` +
  [0, 1, 2, 3, 4, 5].map((v) => `<text x="${X(v)}" y="208" text-anchor="middle">${v}</text>`).join("") +
  `<text x="300" y="40" data-en="pval-curva">F(2, 9)</text></svg>`;
module.exports = (ctx) => ({ escenas: [
  portada("Libro guía · Cap. 5, ej. 21", "Caucho vulcanizado: cuando nada sale", "Factorial 3 × 3 con 2 réplicas"),
  enunciado("Libro guía · Cap. 5, ej. 21",
    `Resistencia del caucho según tiempo de curado (40, 60, 80 min) y tipo de acelerante (A, B, C). ${k("clave1", "2 réplicas por combinación")}. ` +
    `${k("clave2", "Se busca la mayor resistencia")}. ${k("clave3", "Explique de manera gráfica cómo se obtiene el valor-p para el tiempo de cura")}.`,
    tabla(["Tiempo", "A", "B", "C"], Y.map((f, i) => [{ v: ["40", "60", "80"][i] + " min", th: true }].concat(f.map((x) => x.join("; ")))), "pz-chica")),
  factDis("Tiempo", "Acelerante", 3, 3, 2, true),
  { en: "tabla", html: kicker("Tabla ANOVA") + titulo("Ningún efecto es significativo") +
    (() => { const AN = A.anovaAnimada({ ctx, pref: "an", dec: 1, filas: [
      { nombre: "Tiempo", sc: R.SSA, gl: R.gA, tGl: "tabla@0.3", tCM: "tabla@0.6", tF: "fa", p: "0,8919", hlF: ["fa", "fb"] },
      { nombre: "Acelerante", sc: R.SSB, gl: R.gB, tGl: "tabla@0.5", tCM: "fb", tF: "fb@0.1", p: "0,5555", hlF: ["fb", "fab"] },
      { nombre: "AB", sc: R.SSAB, gl: R.gAB, tGl: "tabla@0.7", tCM: "fab", tF: "fab@0.1", p: "0,9173", hlF: ["fab", "conc"] },
      { nombre: "E", sc: R.SSE, gl: R.gE, tGl: "tabla@0.9", tCM: "tabla@0.4", error: true }], total: { sc: R.SST, gl: R.N - 1, tGl: "tabla@1.1" } });
      return AN.tabla.replace(">E<", ">Error<") + AN.calcs; })() +
    nota({ en: "conc" }, "F crít.: 4,26 (A y B) y 3,63 (AB) ⇒ no se rechaza ninguna H₀", "mal") },
  { en: "medias", html: kicker("¿Hay algo mejor?") + titulo("Diferencias que son puro azar") +
    `<div class="pz-cols">` +
    tabla(["Tiempo", "Media"], R.mi.map((m, i) => [c(["40 min", "60 min", "80 min"][i], "medias"), c(n(m, 1), "medias")]), "pz-chica") +
    tabla(["Acelerante", "Media"], R.mj.map((m, j) => [c("ABC"[j], "medias"), c(n(m, 1), "medias")]), "pz-chica") + "</div>" +
    nota({ en: "mejor" }, "Tiempo: no influye ⇒ usar el <strong>más corto</strong> (más barato)", "ok") +
    nota({ en: "mejor-b" }, "Acelerante: no influye ⇒ usar el <strong>más económico</strong>", "ok") +
    nota({ en: "mejor-ab" }, "Interacción no significativa ⇒ ninguna combinación destaca") },
  { en: "pval", html: kicker("El valor-p, gráficamente") + titulo("Área a la derecha de F₀") +
    `<div class="pz-cols pz-cols-64"><div style="height:60cqh">${svg}</div><div class="pz-col">` +
    p({ en: "pval" }, "Bajo H₀: " + $("F_0=\\dfrac{CM_A}{CM_E}\\sim F_{2,9}")) +
    formula({ en: "pval-area" }, "p=P(F_{2,9}>0{,}12)=0{,}892") +
    `<pre class="pz-code" data-en="pval-r"><code>pf(0.12, 2, 9, lower.tail = FALSE)</code></pre></div></div>` },
  { en: "sup", html: kicker("Supuestos") + titulo("¿Y si la varianza no es constante?") +
    tabla(["Prueba", "Valor-p", ""], [[c("Shapiro–Wilk", "sup"), c("0,4438", "sup"), c("normalidad ✓", "sup", { clase: "pz-ve" })],
      [c("Levene", "sup-lev"), c("&lt; 0,0001", "sup-lev"), c("varianzas distintas", "sup-lev", { clase: "pz-ro" })]], "pz-chica") +
    nota({ en: "varianza" }, "El tiempo afectaría la <strong>dispersión</strong>, no la media ⇒ elegir el de menor variabilidad. Corrección: transformar (log, raíz) y repetir el ANOVA.") +
    nota({ en: "fin" }, "«No hay efecto» también sirve: permite elegir el nivel más barato", "ok") }
] });
