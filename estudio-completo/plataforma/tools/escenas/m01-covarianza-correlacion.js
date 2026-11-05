/* Pizarra de M01 · Covarianza y correlación. Marcas en tools/guiones/m01-covarianza-correlacion.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, sumaVuela, portada, cierre, cod, puntos, COL } = M;

const x = [161, 170, 180, 175, 165, 187], y = [50, 65, 78, 82, 60, 76];
const prods = x.map((v, i) => (v - 173) * (y[i] - 68.5));
const c = (v, en, extra = {}) => Object.assign({ v, en }, extra);
const lineasMedia = `<line data-en="ej-med" x1="{X:173}" x2="{X:173}" y1="{Y:45}" y2="{Y:88}" stroke="${COL.am}" stroke-dasharray="5 4"/>` +
  `<line data-en="ej-med" x1="{X:158}" x2="{X:190}" y1="{Y:68.5}" y2="{Y:68.5}" stroke="${COL.am}" stroke-dasharray="5 4"/>`;
const nube = (extra = "") => puntos({ x0: 158, x1: 190, y0: 45, y1: 88, ancho: 330, alto: 240, ejes: ["altura (cm)", "peso (kg)"],
  pts: x.map((v, i) => ({ x: v, y: y[i] })), extra });

const escenas = [
  portada(1, "Prueba 1", "Covarianza y correlación", "Cuando una variable sube, ¿qué pasa con la otra?"),

  { en: "datos", html: kicker("Seis personas") + titulo("Altura y peso") +
    `<div class="pz-cols pz-cols-64"><div style="height:50cqh">${nube()}</div><div class="pz-col">` +
    tabla(["", "Altura", "Peso"], x.map((v, i) => [{ v: String(i + 1), th: true }, c(String(v), "datos-x"), c(String(y[i]), "datos-y")]), "pz-chica") +
    "</div></div>" },

  { en: "cov", html: kicker("Covarianza") + titulo("Cómo se mueven juntas") +
    `<div class="pz-cols pz-cols-3">` +
    nota({ en: "cov-pos" }, "<strong>&gt; 0</strong>: suben y bajan juntas", "ok") +
    nota({ en: "cov-neg" }, "<strong>&lt; 0</strong>: una sube, la otra baja", "mal") +
    nota({ en: "cov-0" }, "<strong>≈ 0</strong>: sin relación lineal clara") + "</div>" +
    formula({ en: "cov-f" }, "s_{xy}=\\frac{1}{n-1}\\sum_{i=1}^{n}(x_i-\\bar x)(y_i-\\bar y)") },

  { en: "ej-med", html: kicker("Cálculo a mano") + titulo("Productos de desviaciones") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["", "x − 173", "y − 68,5", "producto"], x.map((v, i) => [{ v: String(i + 1), th: true },
      c(n(v - 173, 1), i ? "ej-prods" : "ej-p1"), c(n(y[i] - 68.5, 1), i ? "ej-prods" : "ej-p1"),
      c(n(prods[i], 1), i ? `ej-prods@${(i * 0.9).toFixed(1)}` : "ej-p1r", { id: "pr" + i, clase: "pz-ve", hl: ["ej-signo", "ej-suma"] })]), "pz-chica") +
    nota({ en: "ej-signo" }, "Todos positivos: cada persona está del mismo lado de ambas medias", "ok") +
    `</div><div class="pz-col"><div class="pz-caja-calc"><span class="pz-etq">covarianza</span><div class="pz-col">` +
    sumaVuela({ etiqueta: "Σ", terms: prods.map((v, i) => ({ v, desde: "pr" + i })), tiempos: prods.map((_, i) => `ej-suma@${(i * 0.45).toFixed(2)}`), tRes: "ej-suma@2.9", idRes: "suma", dec: 1 }) +
    calc({ partes: [["ej-cov", "s_{xy}=\\frac{499}{6-1}"]], tRes: "ej-cov@1.6", res: "99,8", idRes: "cov" }) + "</div></div>" +
    nota({ en: "unid-r" }, "En metros sería 0,998: la covarianza <strong>depende de las unidades</strong>", "mal") +
    p({ en: "var", clase: "pz-tenue" }, `${$("\\operatorname{Var}(X)=\\operatorname{Cov}(X,X)")}`) + "</div></div>" },

  { en: "cor", html: kicker("Correlación") + titulo("La covarianza sin unidades") +
    formula({ en: "cor-f" }, "r=\\frac{s_{xy}}{s_x\\,s_y}\\in[-1,\\,1]") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["", "valor"], [[{ v: $("s_{xy}"), th: true }, c("99,8", "cor-ej", { id: "sxy" })], [{ v: $("s_x"), th: true }, c("9,654", "cor-sx", { id: "sx" })], [{ v: $("s_y"), th: true }, c("12,292", "cor-sy", { id: "sy" })]], "pz-chica") +
    `</div><div class="pz-col"><div class="pz-caja-calc"><span class="pz-etq">cálculo</span>` +
    `<div class="pz-suma"><span data-en="cor-r" data-desde="sxy">99,8</span> <span data-en="cor-r@0.5" class="pz-t-op">÷ (</span><span data-en="cor-r@0.5" data-desde="sx">9,654</span>` +
    ` <span data-en="cor-r@1" class="pz-t-op">×</span> <span data-en="cor-r@1" data-desde="sy">12,292</span><span data-en="cor-r@1" class="pz-t-op">)</span>` +
    ` <span data-en="cor-r@2" class="pz-t-op">=</span> <span data-en="cor-r@2" class="pz-res">0,841</span></div></div>` +
    nota({ en: "cor-lee" }, "Positiva y fuerte; en metros sigue siendo 0,841", "ok") + "</div></div>" +
    p({ en: "nube", clase: "pz-tenue" }, "Antes de calcular: mirar la nube (dirección, alineación, atípicos)") },

  { en: "indep", html: kicker("Afirmación típica de prueba") + titulo("¿Correlación 0 ⇒ independencia?") +
    `<div class="pz-cols"><div class="pz-col">` +
    nota({ en: "indep-r" }, "<strong>Falso</strong>: la correlación solo mide relación <em>lineal</em>", "mal") +
    lista([["indep-curva", "Una curva fuerte puede tener r = 0"], ["indep-var", "Una variable puede cambiar la <strong>varianza</strong> de la otra"], ["indep-norm", "La equivalencia solo vale con <strong>normal conjunta</strong>"]]) +
    `</div><div class="pz-col">` +
    formula({ en: "indep-sent" }, "\\text{independientes}\\ \\Rightarrow\\ \\rho=0") +
    formula({ en: "indep-sent" }, "\\rho=0\\ \\not\\Rightarrow\\ \\text{independientes}") +
    nota({ en: "causa" }, "Correlación alta <strong>no</strong> prueba causalidad") +
    nota({ en: "reg-r" }, "Regresión: una recta para predecir · correlación: qué tan fuerte es la relación lineal") + "</div></div>" },

  { en: "rho", html: kicker("¿Es significativa?") + titulo("Test de correlación") +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "rho" }, "<strong>r</strong> = muestra · <strong>ρ</strong> = población") +
    formula({ en: "h0" }, "H_0:\\ \\rho=0") + formula({ en: "h1" }, "H_1:\\ \\rho\\ne0") +
    formula({ en: "t" }, "t=r\\sqrt{\\frac{n-2}{1-r^2}}\\sim t_{n-2}") +
    `</div><div class="pz-col"><div class="pz-caja-calc"><span class="pz-etq">altura y peso</span><div class="pz-col">` +
    calc({ partes: [["t-ej1", "t=0{,}841\\sqrt{\\frac{4}{1-0{,}841^2}}"]], tRes: "t-ej2", res: "3,11", idRes: "tobs" }) +
    calc({ partes: [["t-crit", "t_{0{,}025;\\,4}"]], tRes: "t-crit@1", res: "2,78" }) + "</div></div>" +
    nota({ en: "t-conc" }, "3,11 &gt; 2,78 ⇒ se rechaza: hay correlación lineal", "ok") + "</div></div>" },

  { en: "r", html: kicker("En R") + titulo("cor.test") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col">` +
    cod("r", "cor.test(x, y, method = \"pearson\")") +
    `<pre class="pz-code"${M.at({ en: "r-t" })}><code><span data-hl="r-t r-p">t = 3.1087, df = 4</span>, <span data-hl="r-p r-ic">p-value = 0.03592</span>
95 percent confidence interval:
 <span data-hl="r-ic r-cor">0.0926901 0.9821910</span>
sample estimates:
      cor
<span data-hl="r-cor fuerte">0.8409891</span></code></pre>` +
    `</div><div class="pz-col">` +
    nota({ en: "r-ic" }, "IC no contiene 0 (coherente), pero es muy ancho: n = 6") +
    nota({ en: "fuerte-r" }, "r = 0,067: no significativa con n = 100, <strong>sí</strong> con n = 1000") +
    nota({ en: "fuerte-c" }, "<strong>Significativa ≠ fuerte</strong>: el p-valor depende de n", "ok") + "</div></div>" },

  cierre(1, [["c1", "Covarianza: dirección, pero depende de las unidades"], ["c2", "Correlación: entre −1 y 1, sin unidades"], ["c3", "Correlación 0 no implica independencia"], ["c4", "cor.test: t = r √((n − 2)/(1 − r²)), H₀: ρ = 0"]])
];
module.exports = { escenas };
