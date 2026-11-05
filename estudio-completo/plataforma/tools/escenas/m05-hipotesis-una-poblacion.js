/* Pizarra de M05 · Hipótesis, una población. Marcas en tools/guiones/m05-hipotesis-una-poblacion.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, portada, cierre, cod, COL } = M;
const c = (v, en, extra = {}) => Object.assign({ v, en }, extra);

/* Campana con cola derecha sombreada (p-valor) */
function campana(mk) {
  const X = (z) => 150 + z * 50, Y = (z) => 170 - 140 * Math.exp(-z * z / 2);
  let d = "", a = `M${X(2.02)},170`;
  for (let z = -3; z <= 3.001; z += 0.1) d += `${d ? "L" : "M"}${X(z).toFixed(1)},${Y(z).toFixed(1)} `;
  for (let z = 2.02; z <= 3.001; z += 0.05) a += ` L${X(z).toFixed(1)},${Y(z).toFixed(1)}`;
  a += ` L${X(3)},170 Z`;
  return `<svg viewBox="0 0 300 200"><path class="ejes" d="M0,170 H300"/><path d="${d}" fill="none" stroke="${COL.ce}" stroke-width="3"/>` +
    `<g data-en="${mk}"><path d="${a}" fill="${COL.ro}" opacity=".7"/></g>` +
    `<line data-en="${mk}" x1="${X(2.02)}" x2="${X(2.02)}" y1="60" y2="170" stroke="${COL.am}" stroke-width="2"/>` +
    `<text data-en="${mk}" x="${X(2.02) + 5}" y="70" style="font-size:12px;fill:${COL.am}">71,8</text>` +
    `<text x="${X(0)}" y="190" text-anchor="middle" style="font-size:12px">70</text>` +
    `<text data-en="${mk}" x="${X(2.6)}" y="150" style="font-size:12px;fill:${COL.ro}">2,17 %</text></svg>`;
}

const escenas = [
  portada(5, "Prueba 1", "Pruebas de hipótesis: una población", "Decidir con datos si se rechaza una afirmación sobre un parámetro"),

  { en: "q", html: kicker("La lógica") + titulo("¿Se vive más de 70 años?") +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "q-m" }, "n = 100 · media muestral = <strong>71,8</strong>") +
    formula({ en: "h0-ej" }, "H_0:\\ \\mu\\le70") +
    formula({ en: "h1" }, "H_1:\\ \\mu>70") +
    nota({ en: "pval" }, "<strong>p-valor</strong>: probabilidad de algo tan extremo o más, si H₀ fuera cierta") +
    nota({ en: "regla" }, "p ≤ α ⇒ se rechaza H₀ · 2,17 % ≤ 5 % ⇒ <strong>se rechaza</strong>", "ok") +
    `</div><div style="height:40cqh">${campana("pval-ej")}</div></div>` },

  { en: "alfa-def", html: kicker("Lo que se pregunta siempre") + titulo("α y lo que significa no rechazar") +
    nota({ en: "alfa-def" }, "α = P(rechazar H₀ siendo verdadera) = error <strong>tipo I</strong>") +
    nota({ en: "norech-r" }, "No rechazar H₀ <strong>no</strong> demuestra que sea verdadera: solo falta evidencia", "mal") +
    nota({ en: "n-alfa-r" }, "Más muestra <strong>no</strong> baja α (lo fija quien hace la prueba); baja el error tipo II", "mal") },

  { en: "t", html: kicker("Media con σ desconocida") + titulo("Prueba t") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "t-f" }, "t=\\frac{\\bar x-\\mu_0}{s/\\sqrt n}\\sim t_{n-1}") +
    p({ en: "t-ej" }, "Consumo de 20 hogares vs. 721 kWh de la ciudad") +
    formula({ en: "t-ej-h" }, "H_1:\\ \\mu>721") +
    tabla(["crítico", "p-valor", "Decisión"], [[c("1,73", "t-ej-crit"), c("0,022", "t-ej-p"), c("<strong>Se rechaza</strong>", "t-ej-r")]]) +
    `</div><div class="pz-col">` +
    cod("r", "t.test(x, mu = 10, alternative = \"two.sided\")", [["alternative = \"two.sided\"", "r-alt"]]) +
    tabla(["alternative", "H₁"], [[c("<code>\"two.sided\"</code>", "r-alt"), c("μ ≠ μ₀", "r-alt")], [c("<code>\"greater\"</code>", "r-alt"), c("μ &gt; μ₀", "r-alt", { hl: ["r-uni-r"] })], [c("<code>\"less\"</code>", "r-alt"), c("μ &lt; μ₀", "r-alt")]], "pz-chica") +
    tabla(["", "Bilateral", "Mayor"], [[{ v: "p-valor", th: true }, c("0,0517", "r-ej-p"), c("<strong>0,0258</strong>", "r-uni-r")], [{ v: "α = 5 %", th: true }, c("no rechaza", "r-ej-p"), c("rechaza", "r-uni-r")]], "pz-chica") +
    nota({ en: "r-ej-ic" }, "IC (9,99; 11,48) contiene 10 ⇒ coherente con no rechazar") + "</div></div>" },

  { en: "z", html: kicker("Media con σ conocida y proporción") + titulo("Prueba z") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "z-f" }, "z=\\frac{\\bar x-\\mu_0}{\\sigma/\\sqrt n}") +
    nota({ en: "z-regla" }, "σ conocida ⇒ <strong>z</strong> · σ desconocida ⇒ <strong>t</strong>", "ok") +
    p({ en: "z-r", clase: "pz-tenue" }, "R: <code>BSDA::z.test(x, mu, sigma.x)</code>") +
    calc({ etiqueta: "Clase: ", partes: [["z-ej-c", "z=\\frac{10{,}79-10}{2/\\sqrt{30}}"]], tRes: "z-ej-c@2", res: "2,16" }) +
    `</div><div class="pz-col">` +
    formula({ en: "prop-f" }, "z=\\frac{\\hat p-\\color{#ffd166}{p_0}}{\\sqrt{\\color{#ffd166}{p_0}(1-\\color{#ffd166}{p_0})/n}}") +
    p({ en: "prop-req", clase: "pz-tenue" }, `Requisito: ${$("np_0\\ge5")} y ${$("n(1-p_0)\\ge5")}`) +
    `<div class="pz-caja-calc"${M.at({ en: "prop-ej" })}><span class="pz-etq">parabrisas: 40 de 200, H₀: p ≤ 0,15</span>` +
    calc({ partes: [["prop-ej-z", "z=\\frac{0{,}20-0{,}15}{\\sqrt{0{,}15\\cdot0{,}85/200}}"]], tRes: "prop-ej-z@3", res: "1,98" }) + "</div>" +
    nota({ en: "prop-ej-r" }, "1,98 &gt; 1,64 ⇒ se rechaza: no respalda a la empresa", "ok") +
    p({ en: "prop-r-x", clase: "pz-tenue" }, "<code>prop.test</code> da X² = z² = 3,92") + "</div></div>" },

  { en: "var", html: kicker("Una varianza") + titulo("Prueba χ²") +
    formula({ en: "var-f" }, "\\chi^2=\\frac{(n-1)\\,s^2}{\\sigma_0^2}\\sim\\chi^2_{n-1}") +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "var-ej" }, "Desviación del tiempo de conexión ≤ 2 min") +
    formula({ en: "var-ej-qr" }, "H_0:\\ \\sigma^2\\le\\color{#ffd166}{4}") +
    nota({ en: "var-ej-qr" }, "La prueba es sobre la <strong>varianza</strong>: 2² = 4") +
    `</div><div class="pz-col"><div class="pz-caja-calc"><span class="pz-etq">n = 24, s² = 4,9</span>` +
    calc({ partes: [["var-ej-x", "\\chi^2=\\frac{23\\cdot4{,}9}{4}"]], tRes: "var-ej-x@2.5", res: "28,2" }) + "</div>" +
    tabla(["χ²", "crítico", "Decisión"], [[c("28,2", "var-ej-crit"), c("35,1", "var-ej-crit"), c("No se rechaza", "var-ej-r")]]) +
    nota({ en: "var-r" }, "En R a mano: <code>qchisq</code> (crítico) · <code>1 - pchisq</code> (p-valor)") + "</div></div>" },

  cierre(5, [["c1", "H₀, H₁, p-valor: si p ≤ α se rechaza"], ["c2", "No rechazar no prueba H₀"], ["c3", "Media: t si σ desconocida, z si conocida"], ["c4", "Proporción: z, revisando np₀ ≥ 5"], ["c5", "Varianza: χ², siempre con σ²"]])
];
module.exports = { escenas };
