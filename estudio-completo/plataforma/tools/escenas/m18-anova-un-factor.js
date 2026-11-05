/* Pizarra de M18 · ANOVA de un factor. Marcas en tools/guiones/m18-anova-un-factor.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, sumaVuela, portada, cierre, cod, COL } = M;

const c = (v, en, extra = {}) => Object.assign({ v, en }, extra);

const escenas = [
  portada(18, "Prueba 2 · también P3", "ANOVA de un factor", "Comparar varias medias, saber cuáles difieren y revisar los supuestos"),

  { en: "prob", html: kicker("Comparar más de dos medias") + titulo("¿Todas iguales o al menos dos distintas?") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "h0" }, "H_0:\\ \\mu_1=\\mu_2=\\dots=\\mu_k") + formula({ en: "h1" }, "H_1:\\ \\text{al menos dos difieren}") +
    nota({ en: "varios-t-r" }, "Muchas pruebas t acumulan el riesgo de una diferencia falsa; el ANOVA usa <strong>un solo F</strong>", "ok") +
    `</div><div class="pz-col">` +
    nota({ en: "dca" }, "<strong>DCA</strong>: todas las corridas en orden aleatorio") +
    p({ en: "dca-sup", clase: "pz-tenue" }, "Supone que ningún otro factor influye") +
    formula({ en: "modelo" }, "y_{ij}=\\mu+\\tau_i+\\varepsilon_{ij},\\quad \\varepsilon_{ij}\\sim N(0,\\sigma^2)") + "</div></div>" },

  { en: "idea", html: kicker("Análisis de varianza") + titulo("Entre grupos contra dentro de los grupos") +
    formula({ en: "idea-t" }, "SC_T=\\underbrace{SC_{TRAT}}_{\\text{entre}}+\\underbrace{SC_E}_{\\text{dentro}}") +
    tabla(["Fuente", "SC", "gl", "CM", "F₀"], [
      [c("Tratamientos", "tabla-sc"), c($("SC_{TRAT}"), "tabla-sc"), c($("k-1"), "tabla-gl"), c($("SC_{TRAT}/(k-1)"), "tabla-cm"), c($("CM_{TRAT}/CM_E"), "tabla-f", { hl: ["tabla-f", "tabla-dec"] })],
      [c("Error", "tabla-sc"), c($("SC_E"), "tabla-sc"), c($("N-k"), "tabla-gl"), c($("SC_E/(N-k)"), "tabla-cm"), ""],
      [c("Total", "tabla-sc"), c($("SC_T"), "tabla-sc"), c($("N-1"), "tabla-gl"), "", ""]]) +
    nota({ en: "tabla-dec" }, "Se rechaza H₀ si F₀ &gt; F crítico, o si p-valor &lt; α", "ok") },

  { en: "ej", html: kicker("Ejemplo a mano · 3 métodos de enseñanza") + titulo("Primero, las medias") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["Método", "Notas", "Media"], [
      [c("Conferencia", "ej-l"), c("80 · 85 · 78 · 83", "ej-l"), c("81,5", "ej-med", { id: "m1" })],
      [c("Taller", "ej-w"), c("55 · 34 · 43 · 54", "ej-w"), c("46,5", "ej-med@0.8", { id: "m2" })],
      [c("En línea", "ej-o"), c("70 · 65 · 74 · 77", "ej-o"), c("71,5", "ej-med@1.6", { id: "m3" })],
      [{ v: "General", th: true }, "", c("<strong>66,5</strong>", "ej-g", { tot: true })]]) +
    nota({ en: "ej-sct" }, "SC<sub>T</sub> = Σ (dato − 66,5)² = <strong>3007</strong>") +
    `</div><div class="pz-col"><div class="pz-caja-calc"><span class="pz-etq">SC de tratamientos</span><div class="pz-col">` +
    calc({ partes: [["ej-sctr-1", "(81{,}5-66{,}5)^2"]], tRes: "ej-sctr-1@2.5", res: "225", idRes: "q1" }) +
    calc({ partes: [["ej-sctr-2", "(46{,}5-66{,}5)^2"]], tRes: "ej-sctr-2@2.5", res: "400", idRes: "q2" }) +
    calc({ partes: [["ej-sctr-3", "(71{,}5-66{,}5)^2"]], tRes: "ej-sctr-3@2.5", res: "25", idRes: "q3" }) +
    sumaVuela({ etiqueta: "4 ×", terms: [{ v: 225, desde: "q1" }, { v: 400, desde: "q2" }, { v: 25, desde: "q3" }], tiempos: ["ej-sctr-n", "ej-sctr-n@0.8", "ej-sctr-n@1.6"], tRes: "ej-sctr-n@2.4", dec: 0 }) +
    calc({ partes: [["ej-sctr-r", "4\\cdot650"]], tRes: "ej-sctr-r@1", res: "2600", idRes: "sctr" }) +
    "</div></div></div></div>" },

  { en: "ej-sce", html: kicker("Ejemplo a mano") + titulo("La tabla ANOVA, casilla por casilla") +
    `<div class="pz-caja-calc"><span class="pz-etq">cálculo</span><div class="pz-pila">` +
    calc({ partes: [["ej-sce", "SC_E=3007-2600"]], tRes: "ej-sce@1.6", res: "407", idRes: "sce", hasta: "ej-cm" }) +
    calc({ partes: [["ej-cm", "CM_{TRAT}=\\frac{2600}{2}"]], tRes: "ej-cm@1.5", res: "1300", idRes: "cmt", hasta: "ej-cm@3.2" }) +
    calc({ partes: [["ej-cm@3.2", "CM_E=\\frac{407}{9}"]], tRes: "ej-cm@4.4", res: "45,2", idRes: "cme", hasta: "ej-f" }) +
    calc({ partes: [["ej-f", "F_0=\\frac{1300}{45{,}2}"]], tRes: "ej-f@1.8", res: "28,75", idRes: "f" }) + "</div></div>" +
    tabla(["Fuente", "SC", "gl", "CM", "F₀", "p"], [
      ["Métodos", "2600", c("2", "ej-gl"), c("1300", "ej-cm@2", { desde: "cmt" }), c("<strong>28,75</strong>", "ej-f@2.4", { desde: "f", hl: ["ej-f@2.4"] }), c("0,0001", "ej-p")],
      ["Error", c("407", "ej-sce@2.2", { desde: "sce" }), c("9", "ej-gl"), c("45,2", "ej-cm@5", { desde: "cme" }), "", ""],
      ["Total", "3007", "11", "", "", ""]]) +
    nota({ en: "ej-conc" }, "Se rechaza H₀: el método de enseñanza <strong>sí</strong> influye", "ok") },

  { en: "r", html: kicker("En R · 4 métodos de ensamble") + titulo("aov y summary") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col">` +
    cod("r", `metodo <- factor(rep(c("A","B","C","D"), each = 4))
modelo <- aov(tiempo ~ metodo, data = datos)
summary(modelo)`, [["aov(tiempo ~ metodo, data = datos)", "r-aov"], ["summary(modelo)", "r-sum"]]) +
    `<pre class="pz-code"${M.at({ en: "r-lee" })}><code>            Df Sum Sq Mean Sq F value  Pr(&gt;F)
metodo       <span data-hl="r-df r-ss">3</span>   <span data-hl="r-ss r-f">69.5</span>  23.167   <span data-hl="r-f r-q">9.424</span> <span data-hl="r-f r-q">0.00177</span>
Residuals   <span data-hl="r-df r-ss">12</span>   <span data-hl="r-ss r-f">29.5</span>   2.458</code></pre>` +
    `</div><div class="pz-col">` +
    nota({ en: "r-f" }, "p = 0,00177 &lt; 0,05 ⇒ se rechaza", "ok") +
    nota({ en: "r-qr" }, "El ANOVA dice que <strong>alguna</strong> media difiere, no <strong>cuál</strong>", "mal") + "</div></div>" },

  { en: "pares", html: kicker("Comparaciones múltiples") + titulo("¿Qué pares difieren?") +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "pares" }, `Pares: ${$("\\frac{k(k-1)}{2}=\\frac{4\\cdot3}{2}=6")}`) +
    formula({ en: "lsd-f" }, "LSD=t_{\\alpha/2,\\,N-k}\\sqrt{\\frac{2\\,CM_E}{n}}") +
    calc({ partes: [["lsd-ej", "2{,}179\\sqrt{\\tfrac{2\\cdot2{,}458}{4}}"]], tRes: "lsd-v", res: "2,42" }) +
    tabla(["", "A", "B", "C", "D"], [[{ v: "Media", th: true }, c("7,25", "lsd-med"), c("8,5", "lsd-med"), c("12,75", "lsd-med"), c("10,5", "lsd-med")]], "pz-chica") +
    `</div><div class="pz-col">` +
    tabla(["Par", "|dif|", "LSD", "Tukey"], [
      [c("C − A", "lsd-si"), c("5,5", "lsd-si"), c("✓", "lsd-si"), c("✓", "tukey-ej")],
      [c("C − B", "lsd-si"), c("4,25", "lsd-si"), c("✓", "lsd-si"), c("✓", "tukey-ej")],
      [c("D − A", "lsd-si", { hl: ["tukey-q", "tukey-erre"] }), c("3,25", "lsd-si", { hl: ["tukey-q", "tukey-erre"] }), c("✓", "lsd-si"), c("<span class=\"pz-ro\">✗</span> p = 0,053", "tukey-qr")],
      [c("D − C", "lsd-no"), c("2,25", "lsd-no"), c("✗", "lsd-no"), c("✗", "tukey-ej")]]) +
    nota({ en: "tukey-dif" }, "LSD: error de cada comparación · <strong>Tukey</strong>: error de todas juntas ⇒ más conservador") + "</div></div>" },

  { en: "sup", html: kicker("Supuestos") + titulo("Se revisan con los residuos") +
    formula({ en: "sup" }, "e_{ij}=y_{ij}-\\bar y_{i\\cdot}") +
    tabla(["Supuesto", "Cómo se revisa", "Ensamble"], [
      [c("Normalidad", "sup-n"), c("Q-Q de residuos · Shapiro-Wilk", "sup-n"), c("p = 0,28 ✓", "sup-ej2")],
      [c("Varianza constante", "sup-v"), c("residuos vs. predichos · Levene", "sup-v"), c("p = 0,45 ✓", "sup-ej")],
      [c("Independencia", "sup-i"), c("residuos vs. orden de corrida", "sup-i"), ""]]) +
    nota({ en: "sup-err" }, "Se revisan los <strong>residuos</strong>, no los datos crudos", "mal") +
    `<div class="pz-caja-calc"${M.at({ en: "n-f" })}><span class="pz-etq">observaciones por tratamiento</span>` +
    calc({ partes: [["n-f", "n=\\frac{2\\,t^2\\sigma^2}{d_T^2}"], ["n-ej", "=\\frac{2\\cdot2{,}12^2\\cdot1{,}5^2}{2^2}"]], tRes: "n-ej@3", res: "≈ 5" }) + "</div>" },

  cierre(18, [["c1", "F = variación entre grupos / variación dentro"], ["c2", "Si rechaza: LSD o Tukey (más conservador) para ver qué pares"], ["c3", "Supuestos con los residuos: normalidad, varianza constante, independencia"]])
];
module.exports = { escenas };
