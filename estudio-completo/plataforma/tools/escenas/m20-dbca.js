/* Pizarra de M20 · DBCA. Marcas en tools/guiones/m20-dbca.txt. */
"use strict";
const { n, nt, at, $, formula, nota, clave, kicker, titulo, tabla, lista, paso, div, p, span, dbca } = require("./_lib");

const ens = [[6, 9, 7, 8], [7, 10, 11, 8], [10, 16, 11, 14], [10, 13, 11, 9]];
const E = dbca(ens);
const fert = [[21, 20, 24, 23], [21, 26, 24, 29], [24, 26, 30, 32]];
const F = dbca(fert);

/* Celda con aparición en una marca */
const c = (v, m, extra = {}) => Object.assign({ v, en: m }, extra);

const escenas = [
  { en: "inicio", clase: "", html:
    `<div class="pz-centro">${kicker("Módulo 20 · Prueba 3")}` +
    `<h3 class="pz-t" style="font-size:2.3em">Diseño en bloques<br>completos al azar</h3>` +
    p({ en: "inicio", clase: "pz-st" }, "DBCA: comparar tratamientos controlando un factor que molesta") + "</div>" },

  { en: "problema", html:
    kicker("Un factor que molesta") + titulo("4 métodos de ensamble · 4 operadores") +
    `<div class="pz-cols">` +
    div({ en: "mal" }, `<p class="pz-ro"><strong>Diseño ingenuo</strong>: un método por operador</p>` +
      tabla(["Operador", "1", "2", "3", "4"], [["Método", c("A", "mal"), c("B", "mal"), c("C", "mal"), c("D", "mal")]]) +
      p({ en: "lento" }, `Si el operador 1 es lento… ¿es <span class="pz-am">A</span> o es <span class="pz-am">él</span>?`) +
      nota({ en: "confundido" }, "Método y operador quedan <strong>confundidos</strong>", "mal")) +
    div({ en: "bien" }, `<p class="pz-ve"><strong>Mejor</strong>: cada operador prueba los 4 métodos</p>` +
      tabla(["", "Op 1", "Op 2", "Op 3", "Op 4"], ["A", "B", "C", "D"].map((m) => [{ v: m, th: true }, "✓", "✓", "✓", "✓"])) +
      nota({ en: "bloque" }, "El operador es un <strong>bloque</strong>", "ok")) +
    "</div>" },

  { en: "def", html:
    kicker("Qué es un bloque") + titulo("Un factor que no interesa, pero mueve la respuesta") +
    lista([
      ["def", "No se estudia: <span class=\"pz-tenue\">no buscamos «el mejor operador»</span>"],
      ["def-para", "Se controla para que su variabilidad <span class=\"pz-am\">no infle el error</span>"],
      ["ejemplos", `Ejemplos: <span class="pz-chip pz-ce">día</span><span class="pz-chip pz-ce">lote</span><span class="pz-chip pz-ce">sector</span><span class="pz-chip pz-ce">operador</span>`]
    ]) },

  { en: "diseno", html:
    kicker("Cómo se arma") + titulo("Completo · al azar dentro de cada bloque") +
    `<div class="pz-cols pz-cols-64">` +
    div({}, tabla(["Operador 1", "Operador 2", "Operador 3", "Operador 4"],
      [["C", "B", "A", "D"], ["A", "D", "C", "B"], ["D", "A", "B", "C"], ["B", "C", "D", "A"]].map((f, i) =>
        f.map((v) => c(v, i === 0 ? "completo" : "azar", { hl: ["dentro", "dca"] }))))) +
    div({}, lista([
      ["completo", "<strong>Completo</strong>: los 4 tratamientos en cada bloque"],
      ["azar", "<strong>Al azar</strong>: el orden se sortea…"],
      ["dentro", "… <span class=\"pz-am\">dentro</span> de cada bloque"],
      ["dca", "DCA: se sorteaban <em>todas</em> las corridas juntas"],
      ["noentre", "<span class=\"pz-ro\">No</span> se aleatoriza de un bloque a otro"]
    ])) + "</div>" },

  { en: "modelo", html:
    kicker("Modelo") + titulo("Un término más que el ANOVA de un factor") +
    `<div class="pz-f" style="font-size:1.35em;text-align:center">` +
    span({ en: "mod-mu" }, $("Y_{ij}=\\mu")) + " " + span({ en: "mod-tau" }, $("+\\,\\tau_i")) + " " +
    span({ en: "mod-gamma" }, $("+\\,\\gamma_j")) + " " + span({ en: "mod-eps" }, $("+\\,\\varepsilon_{ij}")) + "</div>" +
    `<div class="pz-cols">` +
    lista([
      ["mod-tau", `${$("\\tau_i")}: efecto del <span class="pz-am">tratamiento</span> ${$("i")}`],
      ["mod-gamma", `${$("\\gamma_j")}: efecto del <span class="pz-ce">bloque</span> ${$("j")}`],
      ["sup-normal", `${$("\\varepsilon_{ij}\\sim N(0,\\sigma^2)")} independientes`],
      ["aditivo", `<span class="pz-ro">Aditivo</span>: sin interacción tratamiento × bloque`]
    ]) +
    lista([
      ["h0t", `${$("H_0:\\tau_1=\\dots=\\tau_k=0")}`],
      ["h0b", `${$("H_0:\\gamma_1=\\dots=\\gamma_b=0")} <span class="pz-tenue">(bloque)</span>`]
    ]) + "</div>" },

  { en: "tabla", html:
    kicker("Tabla ANOVA") + titulo("Tratamientos, bloques, error y total") +
    tabla(["Fuente", "SC", "gl", "F₀"], [
      ["Tratamientos", c($("SC_{TRAT}"), "sctr-f"), c($("k-1"), "gl"), $("CM_{TRAT}/CM_E")],
      [{ v: "Bloques", en: "fila-bloque", hl: ["fila-bloque", "totales"] }, c($("SC_B"), "scb-f"), c($("b-1"), "gl"), c($("CM_B/CM_E"), "fila-bloque")],
      ["Error", c($("SC_E"), "sce-f"), c($("(k-1)(b-1)"), "gl", { hl: ["gl"] }), ""],
      ["Total", c($("SC_T"), "sct-f"), $("N-1"), ""]
    ], "pz-chica") +
    `<div class="pz-cols pz-cols-3">` +
    formula({ en: "corr" }, "\\frac{Y_{\\cdot\\cdot}^2}{N}") +
    formula({ en: "sctr-f", hl: ["divisor", "gl"] }, "SC_{TRAT}=\\sum_i\\frac{Y_{i\\cdot}^2}{\\color{#ffd166}{b}}-\\frac{Y_{\\cdot\\cdot}^2}{N}") +
    formula({ en: "scb-f" }, "SC_B=\\sum_j\\frac{Y_{\\cdot j}^2}{\\color{#7cc6fe}{k}}-\\frac{Y_{\\cdot\\cdot}^2}{N}") + "</div>" +
    nota({ en: "divisor-r" }, `Cada total de tratamiento suma <strong>un dato por bloque</strong> ⇒ se divide por ${$("b")}`) },

  { en: "ens", html:
    kicker("Ejemplo: métodos de ensamble (minutos)") +
    `<div class="pz-cols pz-cols-64">` +
    div({}, tabla(["Método", "Op 1", "Op 2", "Op 3", "Op 4", { v: $("Y_{i\\cdot}"), tot: true }],
      ens.map((f, i) => [{ v: "ABCD"[i], th: true }].concat(f.map(String), [{ v: String(E.Ti[i]), tot: true, hl: ["e-sctr", "e-scb"] }]))
        .concat([[{ v: $("Y_{\\cdot j}"), th: true }].concat(E.Bj.map((x) => ({ v: String(x), tot: true, hl: ["e-scb", "e-sce"] })), [{ v: String(E.G), tot: true, hl: ["e-corr", "e-sct"] }])])) +
      formula({ en: "e-corr" }, `\\frac{${E.G}^2}{${E.N}}=${E.C}`)) +
    div({}, tabla(["Fuente", "SC", "gl", "CM", "F₀"], [
      ["Métodos", c(n(E.SStr), "e-sctr", { contar: true }), c("3", "e-sctr"), c(n(E.CMt), "e-fm"), c(`<strong>${n(E.Ft, 2)}</strong>`, "e-fm", { hl: ["e-fm", "e-fo"] })],
      ["Operadores", c(n(E.SSb), "e-scb", { contar: true }), c("3", "e-scb"), c(n(E.CMb), "e-fo"), c(`<strong>${n(E.Fb, 2)}</strong>`, "e-fo", { hl: ["e-fo", "e-conc"] })],
      ["Error", c(String(E.SSE), "e-sce", { contar: true }), c("9", "e-gl", { hl: ["e-gl", "e-cme"] }), c("2", "e-cme", { hl: ["e-cme", "e-fm"] }), ""],
      ["Total", c(String(E.SST), "e-sct", { contar: true }), "15", "", ""]
    ]) +
      p({ en: "e-fm", clase: "pz-tenue" }, `métodos: p = 0,003 · operadores: p = 0,030`) +
      nota({ en: "e-conc" }, "Ambos significativos: los métodos difieren <em>y</em> el operador influye", "ok")) +
    "</div>" },

  { en: "r", html:
    kicker("En R") + titulo("aov con el bloque sumado") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col">` +
    `<pre class="pz-code"${at("r-aov")}><code>metodo   &lt;- factor(rep(c("A","B","C","D"), each = 4))
operador &lt;- <span class="pz-am"${at({ hl: ["r-factor", "r-mas"] })}>factor</span>(rep(1:4, times = 4))
modelo &lt;- aov(y ~ metodo <span class="pz-ve"${at({ hl: ["r-mas", "r-lsd"] })}>+</span> operador)
summary(modelo)</code></pre>` +
    nota({ en: "r-factor" }, "Sin <code>factor()</code>, R trataría al operador como número (1 gl)") +
    nota({ en: "r-mas-r" }, "<strong>+</strong> y no <strong>*</strong>: sin interacción en el DBCA, y con 1 dato por celda no quedaría error", "ok") +
    `</div><div class="pz-col">` +
    `<pre class="pz-code"${at("r-lsd")}><code>library(agricolae)
LSD.test(modelo, "metodo")$groups</code></pre>` +
    div({ en: "r-grupos" }, tabla(["Método", "Media", "Grupo"], [["C", "12,75", "a"], ["D", "10,75", "ab"], ["B", "9,00", "bc"], ["A", "7,50", "c"]].map((f, i) =>
      f.map((v) => ({ v, hl: i === 0 || i === 3 ? ["r-medias", "r-dif"] : null }))), "pz-chica")) +
    p({ en: "r-dif", clase: "pz-tenue" }, "Misma letra = no difieren") +
    "</div></div>" },

  { en: "bl", html:
    kicker("Interpretar el bloque") + titulo("¿El bloque salió significativo?") +
    `<div class="pz-cols">` +
    nota({ en: "bl-si" }, "<strong>Sí</strong> ⇒ el bloqueo valió la pena: ese factor movía la respuesta", "ok") +
    nota({ en: "bl-no" }, "<strong>No</strong> ⇒ los bloques son parecidos: argumento para no controlarlo en el futuro", "mal") + "</div>" +
    nota({ en: "bl-elegir" }, "Con tratamientos se elige el mejor. Con bloques <strong>no</strong>: se toman decisiones (p. ej., capacitar a un operador)") +
    p({ en: "bl-ens", clase: "pz-tenue" }, "Ensamble: el operador 1 difiere del operador 2 (p = 0,030)") },

  { en: "lsd", html:
    kicker("Diferencia mínima significativa") + titulo("LSD en el DBCA") +
    formula({ en: "lsd-f" }, "LSD=t_{\\alpha/2,\\;\\color{#ffd166}{(k-1)(b-1)}}\\sqrt{\\frac{2\\,CM_E}{\\color{#7cc6fe}{b}}}") +
    `<div class="pz-cols">` +
    div({}, lista([["lsd-gl", `<span class="pz-am">gl del error del DBCA</span> (no ${$("N-k")})`], ["lsd-b", `<span class="pz-ce">${$("b")}</span> hace de réplicas`]]) +
      formula({ en: "lsd-num" }, "LSD=2{,}262\\sqrt{\\tfrac{2\\cdot 2}{4}}=\\mathbf{2{,}262}")) +
    div({}, tabla(["Par", "|diferencia|", "¿> LSD?"], [
      ["A–C", "5,25", c("Sí", "lsd-si")], ["A–D", "3,25", c("Sí", "lsd-si")], ["B–C", "3,75", c("Sí", "lsd-si")],
      ["A–B", "1,50", c("No", "lsd-no")], ["B–D", "1,75", c("No", "lsd-no")], ["C–D", "2,00", c("No", "lsd-no")]
    ].map((f) => f.map((v) => (typeof v === "string" ? { v, en: "lsd-val" } : v))))) + "</div>" },

  { en: "f", html:
    kicker("Ejercicio de la Prueba 3") + titulo("Fertilizantes en 4 sectores (kg/parcela)") +
    `<div class="pz-cols">` +
    `<div class="pz-col">` + tabla(["", "S1", "S2", "S3", "S4", { v: $("Y_{i\\cdot}"), tot: true }],
      fert.map((f, i) => [{ v: "F" + (i + 1), th: true }].concat(f.map(String), [c(String(F.Ti[i]), "f-tot", { tot: true })]))
        .concat([[{ v: $("Y_{\\cdot j}"), th: true }].concat(F.Bj.map((x) => c(String(x), "f-tot", { tot: true })), [c(String(F.G), "f-tot", { tot: true })])])) +
      p({ en: "f-sect", clase: "pz-tenue" }, "Sectores = <span class=\"pz-ce\">bloques</span> (fertilidad no pareja)") + "</div>" +
    `<div class="pz-col">` + tabla(["Fuente", "SC", "gl", "CM", "F₀"], [
      ["Fertilizante", c("72", "f-sctr"), c("2", "f-sctr"), c("36", "f-ft"), c("<strong>9,00</strong>", "f-ft", { hl: ["f-ftc", "f-fb"] })],
      ["Sector", c("60", "f-scb"), c("3", "f-scb"), c("20", "f-fb"), c("<strong>5,00</strong>", "f-fb", { hl: ["f-fb", "f-lsd"] })],
      ["Error", c("24", "f-sce"), c("6", "f-sce"), c("4", "f-cme"), ""],
      ["Total", c("156", "f-sc"), "11", "", ""]
    ]) + p({ en: "f-ftc", clase: "pz-tenue" }, "9,00 &gt; F(2,6) = 5,14 ⇒ fertilizantes difieren") +
      p({ en: "f-fb", clase: "pz-tenue" }, "5,00 &gt; F(3,6) = 4,76 ⇒ el bloque sirvió") + "</div>" +
    "</div>" },

  { en: "f-lsd", html:
    kicker("Fertilizantes · comparaciones") + titulo("¿Qué fertilizante es mejor?") +
    formula({ en: "f-lsd" }, "LSD=t_{0{,}025;\\,6}\\sqrt{\\frac{2\\cdot CM_E}{b}}=2{,}447\\sqrt{\\frac{2\\cdot4}{4}}=3{,}46") +
    tabla(["", "F1", "F2", "F3"], [[{ v: "Media", th: true }, c("22", "f-medias", { hl: ["f-par"] }), c("25", "f-medias"), c("28", "f-medias", { hl: ["f-par"] })]]) +
    tabla(["Par", "|diferencia|", "¿> 3,46?"], [["F2 − F1", "3", "No"], ["F3 − F2", "3", "No"], [{ v: "F3 − F1", hl: ["f-par"] }, { v: "6", hl: ["f-par"] }, { v: "Sí", hl: ["f-par"] }]].map((f) => f.map((v) => (typeof v === "string" ? { v, en: "f-par" } : Object.assign({ en: "f-par" }, v)))), "pz-chica") +
    nota({ en: "f-par" }, "Se recomienda <strong>F3</strong>", "ok") },

  { en: "f-dca", html:
    kicker("¿Y sin bloquear?") + titulo("Si se analiza como DCA") +
    `<div class="pz-cols">` +
    div({}, tabla(["Fuente", "SC", "gl", "CM", "F₀"], [
      ["Fertilizante", "72", "2", "36", "9,00"], [{ v: "Sector", hl: ["f-mueve", "f-err"] }, { v: "60", hl: ["f-mueve", "f-err"] }, "3", "20", "5,00"], ["Error", "24", "6", "4", ""]
    ]) + p({ clase: "pz-tenue" }, "Con bloque")) +
    div({ en: "f-err" }, tabla(["Fuente", "SC", "gl", "CM", "F₀"], [
      ["Fertilizante", "72", "2", "36", c("<strong>3,86</strong>", "f-dcaf", { hl: ["f-dcaf"] })],
      ["Error", { v: "24 + 60 = 84", hl: ["f-err", "f-dcaf"] }, "9", "9,33", ""]
    ]) + p({ clase: "pz-tenue" }, "Sin bloque (DCA)")) + "</div>" +
    nota({ en: "f-nada" }, "3,86 &lt; F(2,9) = 4,26 ⇒ sin bloque <strong>no</strong> se detecta el efecto del fertilizante", "mal") +
    nota({ en: "f-moraleja" }, "El bloqueo fue lo que permitió ver la diferencia", "ok") },

  { en: "c", html:
    kicker("Para cerrar") + titulo("¿Qué diseño uso?") +
    tabla(["Situación", "Diseño", "En R"], [
      [c("Un factor, unidades parejas", "c-dca"), c("DCA", "c-dca"), c("<code>aov(y ~ trat)</code>", "c-dca")],
      [c("Un factor + uno que molesta", "c-dbca", { hl: ["c-dbca", "c-fact"] }), c("<strong>DBCA</strong>", "c-dbca", { hl: ["c-dbca", "c-fact"] }), c("<code>aov(y ~ trat + bloque)</code>", "c-dbca", { hl: ["c-dbca", "c-fact"] })],
      [c("Varios factores de interés", "c-fact"), c("Factorial", "c-fact"), c("<code>aov(y ~ A * B)</code>", "c-fact")]
    ]) + p({ en: "fin", clase: "pz-tenue" }, "Fin del módulo 20") }
];

module.exports = { escenas };
