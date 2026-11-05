/* Pizarra de M21 · Factorial 2^k y bloqueo. Marcas en tools/guiones/m21-factorial-2k.txt. */
"use strict";
const { n, at, $, formula, nota, kicker, titulo, tabla, lista, div, p, grafica, COL, dosK, yates } = require("./_lib");
const c = (v, m, extra = {}) => Object.assign({ v, en: m }, extra);

/* Cubo 2³ en perspectiva con los códigos de Yates en los vértices */
function cubo() {
  const P = { "(1)": [70, 190], a: [200, 190], b: [70, 70], ab: [200, 70], c: [120, 150], ac: [250, 150], bc: [120, 30], abc: [250, 30] };
  const aristas = [["(1)", "a"], ["b", "ab"], ["(1)", "b"], ["a", "ab"], ["c", "ac"], ["bc", "abc"], ["c", "bc"], ["ac", "abc"], ["(1)", "c"], ["a", "ac"], ["b", "bc"], ["ab", "abc"]];
  const marca = { "(1)": "y-1", a: "y-a", ac: "y-ac", abc: "y-abc" };
  let s = `<svg viewBox="0 0 320 230">` + aristas.map(([u, v]) => `<line x1="${P[u][0]}" y1="${P[u][1]}" x2="${P[v][0]}" y2="${P[v][1]}" stroke="#5b6f78" stroke-width="1.5"/>`).join("");
  Object.entries(P).forEach(([k, [x, y]]) => {
    s += `<g${at(marca[k] || "y-todos")}${marca[k] ? ` data-hl="${marca[k]} y-todos"` : ""}><circle cx="${x}" cy="${y}" r="6" fill="${COL.am}"/>` +
      `<text x="${x + 9}" y="${y - 8}" style="font-size:15px">${k}</text></g>`;
  });
  return s + `<text x="135" y="215" style="fill:${COL.ce}">A →</text><text x="22" y="135" style="fill:${COL.ce}">B ↑</text><text x="96" y="186" style="fill:${COL.ce}">C ↗</text></svg>`;
}

const signos = dosK([0, 0, 0, 0, 0, 0, 0, 0], 3, 1);
const vis = dosK([292, 304, 269, 301], 2, 2);

const escenas = [
  { en: "inicio", html: `<div class="pz-centro">${kicker("Módulo 22 · Prueba 3")}` +
    `<h3 class="pz-t" style="font-size:2.3em">Factorial 2<sup>k</sup> y bloqueo</h3>` + p({ clase: "pz-st" }, "Todos los factores a dos niveles: −1 y +1") + "</div>" },

  { en: "dosniv", html: kicker("Todo a dos niveles") + titulo("2³ = 8 tratamientos: los vértices de un cubo") +
    `<div class="pz-cols"><div style="height:58cqh">${cubo()}</div><div class="pz-col">` +
    nota({ en: "yates" }, "<strong>Yates</strong>: letras minúsculas de los factores en nivel <strong>alto</strong>") +
    lista([["y-a", "solo A alto → <span class=\"pz-am\">a</span>"], ["y-ac", "A y C altos → <span class=\"pz-am\">ac</span>"],
      ["y-abc", "todos altos → <span class=\"pz-am\">abc</span>"], ["y-1", "todos bajos → <span class=\"pz-am\">(1)</span>"]]) +
    p({ en: "y-todos" }, "(1), a, b, ab, c, ac, bc, abc") + "</div></div>" },

  { en: "signos", html: kicker("Signos y contrastes") + titulo("Signo de AB = signo de A × signo de B") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col">` +
    tabla(["Trat.", "A", "B", "AB", "C", "AC", "BC", "ABC"], [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [{ v: yates(i, 3), th: true, hl: i === 1 ? ["s-q", "contraste"] : null }]
      .concat(["A", "B", "AB", "C", "AC", "BC", "ABC"].map((s) => {
        const sg = signos[s].signos[i];
        return { v: sg > 0 ? "+" : "−", clase: sg > 0 ? "pz-ve" : "pz-ro", en: ["A", "B", "C"].includes(s) ? "signos" : "s-int",
          hl: s === "AB" && i === 1 ? ["s-r", "contraste"] : s === "A" && sg > 0 ? ["c-a", "ef"] : null };
      }))), "pz-chica") + `</div><div class="pz-col">` +
    nota({ en: "s-r" }, "En «a»: (+)(−) = <strong>−</strong>") +
    formula({ en: "c-a" }, "C_A=a+ab+ac+abc-(1)-b-c-bc") + "</div></div>" },

  { en: "ef", html: kicker("Efecto y suma de cuadrados") + titulo("Del contraste salen dos cosas") +
    `<div class="pz-cols">` +
    formula({ en: "ef-f" }, "\\text{Efecto}=\\frac{C}{n\\,2^{k-1}}") + formula({ en: "sc-f" }, "SC=\\frac{C^2}{n\\,2^{k}}") + "</div>" +
    nota({ en: "recordar" }, "La SC divide por el <strong>doble</strong> que el efecto, y el contraste va al cuadrado") +
    nota({ en: "gl" }, "1 gl por efecto · 2³: 7 efectos · error con 2³(n − 1) gl · F = CM<sub>efecto</sub> / CM<sub>E</sub>", "ok") },

  { en: "v", html: kicker("Ejercicio de la Prueba 3 · viscosidad (2², n = 2)") + titulo("A = concentración · B = tasa de alimentación") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["(1)", "a", "b", "ab"], [[c("292", "v-tot"), c("304", "v-tot"), c("269", "v-tot"), c("301", "v-tot")]]) +
    formula({ en: "v-ca" }, "C_A=a+ab-(1)-b") + formula({ en: "v-ca" }, "=304+301-292-269=\\mathbf{44}") +
    formula({ en: "v-ea" }, "A=\\tfrac{44}{n\\,2^{1}}=\\tfrac{44}{4}=\\mathbf{11}") +
    formula({ en: "v-scq" }, "SC_A=\\tfrac{44^2}{n\\,2^{2}}=\\tfrac{1936}{8}=") + `<p class="pz-big"${at("v-sca")} style="text-align:center">242</p></div><div class="pz-col">` +
    tabla(["Efecto", "Efecto", "SC", "F₀"], [
      [c("A", "v-sca"), c("11,0", "v-sca"), c("242", "v-sca"), c("<strong>35,85</strong>", "v-f", { clase: "pz-ve" })],
      [c("B", "v-b"), c("−6,5", "v-b"), c("84,5", "v-b"), c("<strong>12,52</strong>", "v-f", { clase: "pz-ve" })],
      [c("AB", "v-ab"), c("5,0", "v-ab"), c("50", "v-ab"), c("<strong>7,41</strong>", "v-f", { clase: "pz-ro", hl: ["v-q", "v-conc"] })],
      [c("Error", "v-e"), "", c("27 (4 gl)", "v-e"), c("CM 6,75", "v-e")]
    ], "pz-chica") +
    p({ en: "v-crit" }, "F crítico (1, 4) = 7,71") +
    nota({ en: "v-ab-r" }, "AB: 7,41 &lt; 7,71 ⇒ no significativa (p = 0,053)", "mal") +
    nota({ en: "v-conc" }, "A y B significativos: A sube la viscosidad, B la baja", "ok") + "</div></div>" },

  { en: "r", html: kicker("Un 2³ en R · resistencia de un material") + titulo("Temperatura (A) · presión (B) · aditivo (C) · n = 2") +
    `<div class="pz-cols"><div class="pz-col">` +
    `<pre class="pz-code"${at("r-aov")}><code>modelo &lt;- aov(Y ~ A <span class="pz-am">*</span> B <span class="pz-am">*</span> C)
summary(modelo)</code></pre>` +
    p({ en: "r-ast", clase: "pz-tenue" }, "* ⇒ A + B + C + A:B + A:C + B:C + A:B:C") + `</div><div class="pz-col">` +
    tabla(["Efecto", "F₀", "p"], [
      [c("A temperatura", "r-a"), c("<strong>595,66</strong>", "r-a"), c("≈ 0", "r-a", { clase: "pz-ve" })], [c("B presión", "r-b"), c("33,62", "r-b"), c("0,0004", "r-b", { clase: "pz-ve" })],
      [c("C aditivo", "r-c"), c("0,89", "r-c"), c("0,373", "r-c", { clase: "pz-ro" })], [c("A:C", "r-ac", { hl: ["r-ac", "r-gl"] }), c("119,29", "r-ac"), c("≈ 0", "r-ac", { clase: "pz-ve" })],
      [c("A:B, B:C, A:B:C", "r-ac"), c("&lt; 4,1", "r-ac"), c("&gt; 0,05", "r-ac", { clase: "pz-ro" })], [c("Error", "r-gl"), c("8 gl", "r-gl"), ""]
    ], "pz-chica") + "</div></div>" },

  { en: "mt", html: kicker("model.tables y gráficas") + titulo("model.tables da la mitad del efecto") +
    `<div class="pz-cols"><div class="pz-col">` +
    `<pre class="pz-code"${at("mt")}><code>model.tables(modelo, type = "effects")
$A:  -1: -11.3125    1: 11.3125</code></pre>` +
    formula({ en: "mt-r" }, "\\text{Efecto}_A=\\bar Y_+-\\bar Y_-=2\\times11{,}31=\\mathbf{22{,}6}") +
    nota({ en: "mt-b" }, "B alto queda 2,69 bajo la media ⇒ más presión, menos resistencia") + `</div><div class="pz-col"><div style="height:44cqh">` +
    grafica({ xs: ["A−", "A+"], ymin: 45, ymax: 85, dec: 0, etiquetaY: "interacción A × C",
      series: [{ nombre: "C−", ys: [58.75, 71.25], color: COL.ce, en: "ip-ac", valores: true }, { nombre: "C+", ys: [49.5, 82.25], color: COL.am, en: "ip-ac", valores: true }] }) + "</div>" +
    `<pre class="pz-code"${at("ip")}><code>interaction.plot(A, C, Y)   # eje x, líneas, respuesta</code></pre>` + "</div></div>" },

  { en: "bl", html: kicker("Bloquear un 2ᵏ") + titulo("Cuando no todo se puede correr igual") +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "bl" }, "Días, turnos, lotes, operadores ⇒ bloques") +
    lista([["jer-1", "① Efectos principales: <span class=\"pz-ve\">se cuidan</span>"], ["jer-2", "② Interacciones dobles"], ["jer-3", "③ Triples y mayores: <span class=\"pz-ro\">se sacrifican</span>"]]) +
    nota({ en: "ideal" }, "Ideal: cada bloque = una réplica completa ⇒ nada confundido", "ok") + `</div><div class="pz-col">` +
    `<pre class="pz-code"${at("dias-r")}><code>aov(respuesta ~ A * B <span class="pz-am">+ bloque</span>)</code></pre>` +
    tabla(["Fuente", "F₀", "p"], [[c("A temperatura", "dias-ab"), c("1681", "dias-ab"), c("≈ 0", "dias-ab", { clase: "pz-ve" })],
      [c("B presión", "dias-ab"), c("361", "dias-ab"), c("0,0003", "dias-ab", { clase: "pz-ve" })], [c("A:B", "dias-int"), c("1", "dias-int"), c("0,391", "dias-int", { clase: "pz-ro" })],
      [c("Bloque (día)", "dias-bl", { hl: ["dias-bl"] }), c("81", "dias-bl"), c("0,003", "dias-bl", { clase: "pz-ve" })]], "pz-chica") + "</div></div>" },

  { en: "cierre", html: kicker("Para cerrar") + titulo("Lo esencial del 2ᵏ") +
    lista([["c1", "Tratamientos con notación de Yates"], ["c2", "Signo de una interacción = producto de signos"],
      ["c3", `Efecto = ${$("C/(n\\,2^{k-1})")} · SC = ${$("C^2/(n\\,2^{k})")} · 1 gl`], ["c4", "model.tables = mitad del efecto"],
      ["c5", "Bloque sumado al modelo; se sacrifican las interacciones altas"]]) }
];

module.exports = { escenas };
