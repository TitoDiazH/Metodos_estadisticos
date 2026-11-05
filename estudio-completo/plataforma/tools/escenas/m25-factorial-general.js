/* Pizarra de M25 · Diseño factorial. Marcas en tools/guiones/m25-factorial-general.txt. */
"use strict";
const { n, at, $, formula, nota, kicker, titulo, tabla, lista, div, p, grafica, COL } = require("./_lib");
const c = (v, m, extra = {}) => Object.assign({ v, en: m }, extra);

/* Cuadrado 2×2 con las cuatro esquinas */
function cuadrado() {
  const pt = (x, y, v, m, col) => `<g${at(m)}><circle cx="${x}" cy="${y}" r="20" fill="${col}" opacity=".9"/><text x="${x}" y="${y + 6}" text-anchor="middle" style="fill:#13212a;font-weight:700;font-size:16px">${v}</text></g>`;
  return `<svg viewBox="0 0 300 230"><path class="ejes" d="M60,190 H260 M60,190 V30"/>` +
    `<rect x="80" y="50" width="160" height="120" fill="none" stroke="#5b6f78" stroke-dasharray="5 5"/>` +
    `<text x="80" y="214" text-anchor="middle">−</text><text x="240" y="214" text-anchor="middle">+</text><text x="160" y="226" text-anchor="middle">levadura</text>` +
    `<text x="44" y="174" text-anchor="middle">22</text><text x="44" y="56" text-anchor="middle">30</text><text x="18" y="115" transform="rotate(-90 18 115)" text-anchor="middle">temp.</text>` +
    pt(80, 170, 28, "datos", COL.ce) + pt(240, 170, 41, "d-a", COL.ce) + pt(80, 50, 63, "d-b", COL.am) + pt(240, 50, 45, "d-ab", COL.am) + "</svg>";
}

const escenas = [
  { en: "inicio", html: `<div class="pz-centro">${kicker("Módulo 21 · Prueba 3")}` +
    `<h3 class="pz-t" style="font-size:2.4em">Diseño factorial</h3>` + p({ clase: "pz-st" }, "Varios factores, todos de interés, todas las combinaciones") + "</div>" },

  { en: "mirada", html: kicker("Cuando todos los factores importan") + titulo("Bloque vs. factorial") +
    tabla(["", "DBCA", "Factorial"], [[c("Factores", "mirada"), c("1 de interés + 1 que molesta", "mirada"), c("todos de interés", "mirada", { hl: ["mirada", "para"] })],
      [c("Corridas", "todas"), c("todos los trat. en cada bloque", "todas"), c("<strong>todas</strong> las combinaciones, al azar", "todas", { hl: ["todas", "para"] })]]) +
    lista([["para", "Objetivo: la combinación en que el proceso funciona mejor"],
      ["tipos", `Cualitativos <span class="pz-chip pz-ce">operador</span><span class="pz-chip pz-ce">material</span> o cuantitativos <span class="pz-chip pz-am">temperatura</span><span class="pz-chip pz-am">velocidad</span>`],
      ["niveles", "Cada factor: al menos 2 niveles"]]) },

  { en: "ej", html: kicker("Efecto principal") + titulo("Levadura × temperatura → rendimiento") +
    `<div class="pz-cols"><div style="height:56cqh">${cuadrado()}</div><div class="pz-col">` +
    formula({ en: "def" }, "\\text{Efecto}=\\bar Y_{+}-\\bar Y_{-}") +
    formula({ en: "ef-a" }, "A=\\tfrac{41+45}{2}-\\tfrac{28+63}{2}=43-45{,}5=\\mathbf{-2{,}5}") +
    formula({ en: "ef-b" }, "B=\\tfrac{63+45}{2}-\\tfrac{28+41}{2}=54-34{,}5=\\mathbf{19{,}5}") +
    nota({ en: "abs" }, "La temperatura pesa mucho más: se compara el <strong>valor absoluto</strong>") + "</div></div>" },

  { en: "raro", html: kicker("Interacción") + titulo("El efecto de un factor depende del otro") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["Temperatura", "Subir la levadura"], [[c("baja (22)", "raro-1"), c("28 → 41: <strong class=\"pz-ve\">+13</strong>", "raro-1")], [c("alta (30)", "raro-2"), c("63 → 45: <strong class=\"pz-ro\">−18</strong>", "raro-2")]]) +
    formula({ en: "int-f" }, "AB=\\frac{Y_{--}+Y_{++}}{2}-\\frac{Y_{+-}+Y_{-+}}{2}") +
    formula({ en: "int-n" }, "AB=\\tfrac{28+45}{2}-\\tfrac{41+63}{2}=\\mathbf{-15{,}5}") +
    nota({ en: "max" }, "Máximo: levadura baja + temperatura alta (63)", "ok") + `</div><div class="pz-col"><div style="height:48cqh">` +
    grafica({ xs: ["lev. −", "lev. +"], ymin: 20, ymax: 70, dec: 0, etiquetaY: "rendimiento",
      series: [{ nombre: "T 22", ys: [28, 41], color: COL.ce, en: "graf", valores: true }, { nombre: "T 30", ys: [63, 45], color: COL.am, en: "graf", valores: true }] }) +
    "</div>" + p({ en: "cruzan", clase: "pz-tenue" }, "Paralelas ⇒ sin interacción · se cruzan ⇒ hay interacción") +
    `<pre class="pz-code"${at("r-plot")}><code>interaction.plot(A, B, Y)</code></pre>` + "</div></div>" },

  { en: "ab", html: kicker("Factorial a × b con n réplicas") + titulo("Modelo, hipótesis y grados de libertad") +
    formula({ en: "modelo" }, "Y_{ijk}=\\mu+\\alpha_i+\\beta_j+(\\alpha\\beta)_{ij}+\\varepsilon_{ijk}") +
    p({ en: "hip" }, `${$("H_0:\\alpha_i=0")} · ${$("H_0:\\beta_j=0")} · ${$("H_0:(\\alpha\\beta)_{ij}=0")}`) +
    tabla(["Fuente", "gl"], [[c("A", "gl"), c($("a-1"), "gl")], [c("B", "gl"), c($("b-1"), "gl")], [c("AB", "gl"), c($("(a-1)(b-1)"), "gl")],
      [c("Error", "gl"), c($("ab(n-1)"), "gl", { hl: ["gl-q", "metal"] })]], "pz-chica") +
    nota({ en: "gl-r" }, "Con n = 1 el error tiene 0 gl ⇒ se necesitan <strong>al menos 2 réplicas</strong>", "mal") },

  { en: "metal", html: kicker("Ejemplo: acabado del metal (minimizar)") + titulo("Profundidad (4) × velocidad (3) · 3 réplicas") +
    tabla(["Fuente", "SC", "gl", "CM", "F₀", "p"], [
      [c("B: velocidad", "m-b"), c("3160,5", "m-b"), c("2", "m-b"), c("1580,25", "m-b"), c("<strong>55,02</strong>", "m-b", { hl: ["m-b", "m-a"] }), c("0,0000", "m-b")],
      [c("A: profundidad", "m-a"), c("2125,1", "m-a"), c("3", "m-a"), c("708,37", "m-a"), c("<strong>24,66</strong>", "m-a", { hl: ["m-a", "m-ab"] }), c("0,0000", "m-a")],
      [c("AB", "m-ab"), c("557,07", "m-ab"), c("6", "m-ab"), c("92,84", "m-ab"), c("<strong>3,23</strong>", "m-ab", { hl: ["m-ab", "m-e"] }), c("0,018", "m-ab")],
      [c("Error", "m-e"), c("689,33", "m-e"), c("24", "m-e"), c("28,72", "m-e"), "", ""]
    ]) +
    nota({ en: "m-conc" }, "Más velocidad y más profundidad ⇒ peor acabado ⇒ <strong>profundidad baja y velocidad baja</strong>", "ok") +
    `<pre class="pz-code"${at("m-r")}><code>summary(aov(acabado ~ profundidad <span class="pz-am">*</span> velocidad))</code></pre>` },

  { en: "lsd", html: kicker("Comparar medias") + titulo("¿Hay interacción?") +
    `<div class="pz-cols">` +
    div({ en: "sin" }, nota({}, "<strong>No</strong> ⇒ medias marginales", "ok") +
      formula({ en: "sin-r" }, "LSD=t_{\\alpha/2,GL_E}\\sqrt{\\frac{2\\,CM_E}{r}},\\quad r=bn\\text{ (A)},\\;an\\text{ (B)}")) +
    div({ en: "con" }, nota({}, "<strong>Sí</strong> ⇒ comparar dentro de cada nivel del otro factor", "mal") +
      formula({}, "LSD=t_{\\alpha/2,GL_E}\\sqrt{\\frac{2\\,CM_E}{n}}")) + "</div>" +
    tabla(["Acabado", "Conclusión"], [[c("Marginales (r = 9)", "dif-marg"), c("A1 = A2; el resto difiere", "dif-marg")],
      [c("Dentro de B₂ (n = 3)", "dif-dentro"), c("solo A1–A3 y A1–A4", "dif-dentro", { hl: ["dif-dentro"] })]]) },

  { en: "tres", html: kicker("Tres factores") + titulo("Sedimentación 3 × 2 × 2 · 6 réplicas (minimizar)") +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "tres" }, "7 efectos: A, B, C, AB, AC, BC, ABC") +
    formula({ en: "sed-gl-r" }, "gl_E=abc(n-1)=12\\cdot5=60") +
    `<pre class="pz-code"${at("tres")}><code>aov(Y ~ A * B * C)</code></pre></div><div class="pz-col">` +
    tabla(["Efecto", "¿Significativo?"], [
      [c("B: abertura", "sed-sig"), c("Sí", "sed-sig", { clase: "pz-ve" })], [c("C: temperatura", "sed-sig"), c("Sí", "sed-sig", { clase: "pz-ve" })],
      [c("AB", "sed-sig", { hl: ["trampa", "sed-mejor"] }), c("Sí", "sed-sig", { clase: "pz-ve" })], [c("BC", "sed-sig"), c("Sí", "sed-sig", { clase: "pz-ve" })],
      [c("A: suspensión", "sed-no", { hl: ["trampa", "sed-mejor"] }), c("No", "sed-no", { clase: "pz-ro" })], [c("AC, ABC", "sed-no"), c("No", "sed-no", { clase: "pz-ro" })]
    ], "pz-chica") + "</div></div>" +
    nota({ en: "trampa-r" }, "A no es significativo solo, pero participa en AB ⇒ su nivel <strong>sí</strong> importa", "mal") +
    nota({ en: "sed-mejor" }, "Mejor: suspensión intermedia, abertura baja, temperatura alta", "ok") },

  { en: "muchos", html: kicker("Muchos factores") + `<div class="pz-centro">` +
    titulo("Principio de escasez de efectos") +
    p({ en: "escasez" }, "Las interacciones de orden alto casi nunca importan ⇒ diseños fraccionados " + $("2^{k-p}")) + "</div>" },

  { en: "cierre", html: kicker("Para cerrar") + titulo("Cómo leer un factorial") +
    lista([["c1", "ANOVA: la interacción de <strong>mayor orden</strong> significativa"], ["c2", "Con interacción: gráfica de interacción y comparar dentro de cada nivel"],
      ["c3", "Sin interacción: cada factor por separado (medias marginales)"], ["c4", "Lo no significativo se manda al error"]]) }
];

module.exports = { escenas };
