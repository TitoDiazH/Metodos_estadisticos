"use strict";
const E = require("./_ej");
const { n, nt, $, c, k, kicker, titulo, tabla, formula, nota, p, grafica, COL, factorial, portada, enunciado, factDis, anovaFact } = E;
const Y = [[[93, 92, 93, 92, 91, 90, 90, 90, 91, 91], [92, 90, 92, 94, 91, 91, 90, 92, 91, 92], [95, 94, 94, 94, 97, 96, 94, 95, 94, 96]],
  [[88, 88, 87, 88, 87, 88, 87, 87, 87, 87], [90, 89, 88, 88, 90, 89, 88, 89, 88, 88], [91, 97, 91, 90, 89, 91, 92, 90, 90, 91]]];
const R = factorial(Y);
module.exports = { escenas: [
  portada("Libro guía · Cap. 5, ej. 19", "Hinchamiento del catalizador", "Factorial 2 × 3 con 10 réplicas"),
  enunciado("Libro guía · Cap. 5, ej. 19",
    `Botellas de polietileno: hinchamiento del catalizador tras la extrusión. ${k("clave1", "A: molde (2 niveles), B: catalizador (3 niveles)")}, ` +
    `${k("clave2", "10 réplicas")}. ${k("clave3", "Se desea un hinchamiento bajo")}.`,
    tabla(["Molde", "B1", "B2", "B3"], Y.map((f, i) => [{ v: "A" + (i + 1), th: true }].concat(f.map((x) => `<span style="font-size:.7em">${x.join(" ")}</span>`))), "pz-chica")),
  factDis("Molde", "Catalizador", 2, 3, 10),
  { en: "tabla", html: kicker("Tabla ANOVA (R)") + titulo("¿Qué efectos están activos?") +
    anovaFact([["Molde (A)", R.SSA, R.gA, R.CMA, R.FA, "&lt; 0,0001", "fa", ["fa", "fb"]], ["Catalizador (B)", R.SSB, R.gB, R.CMB, R.FB, "&lt; 0,0001", "fb", ["fb", "fab"]],
      ["AB", R.SSAB, R.gAB, R.CMAB, R.FAB, "0,3542", "fab", ["fab", "conc"]], ["Error", R.SSE, R.gE, R.CME, null, "", "tabla"], ["Total", R.SST, R.N - 1, null, null, "", "tabla"]]) +
    nota({ en: "conc" }, "Activos: molde y catalizador · Interacción no ⇒ cada factor por separado", "ok") },
  { en: "medias", html: kicker("Comparar medias") + titulo("LSD y Tukey") +
    `<div class="pz-cols">` +
    tabla(["", "B1", "B2", "B3", "Media"], R.mij.map((f, i) => [{ v: "A" + (i + 1), th: true }].concat(f.map((x) => n(x, 2)), [c(n(R.mi[i], 3), "medias", { tot: true })]))
      .concat([[{ v: "Media", th: true }].concat(R.mj.map((x, j) => c(n(x, 2), "medias", { tot: true, hl: j === 2 ? ["pares"] : null })), [n(R.G / R.N, 3)])]), "pz-chica") +
    `<div class="pz-col">` +
    formula({ en: "lsd" }, "LSD_A=2{,}005\\sqrt{\\tfrac{2\\cdot1{,}622}{30}}=0{,}659") +
    formula({ en: "lsd-b" }, "LSD_B=2{,}005\\sqrt{\\tfrac{2\\cdot1{,}622}{20}}=0{,}808") +
    formula({ en: "tukey" }, "HSD_B=q_{0{,}05}(3,54)\\sqrt{\\tfrac{CM_E}{20}}=0{,}971") + "</div></div>" +
    nota({ en: "tukey-r" }, "Tukey controla el error de <em>todas</em> las comparaciones a la vez ⇒ más conservador") +
    nota({ en: "pares" }, "B3 difiere de B1 y B2 · B1 vs B2: 0,75 &lt; 0,808 ⇒ no difieren", "ok") },
  { en: "graf", html: kicker("Interacción y mejor tratamiento") + titulo("Líneas casi paralelas") +
    `<div class="pz-cols pz-cols-64"><div style="height:58cqh">` + grafica({ xs: ["B1", "B2", "B3"], ymin: 86, ymax: 96, etiquetaY: "hinchamiento",
      series: [{ nombre: "A1", ys: R.mij[0], color: COL.ce, en: "graf", valores: true }, { nombre: "A2", ys: R.mij[1], color: COL.am, en: "graf", valores: true, hl: ["mejor"] }], dec: 1 }) + "</div>" +
    `<div class="pz-col">` + nota({ en: "mejor" }, "Minimizar ⇒ <strong>molde A2</strong> y <strong>catalizador B1</strong>", "ok") +
    formula({ en: "pred" }, "\\hat Y=90{,}833-1{,}733-1{,}483=\\mathbf{87{,}617}") + "</div></div>" },
  { en: "sup", html: kicker("Supuestos y dispersión") + titulo("Residuos") +
    tabla(["Prueba", "Valor-p", "Conclusión"], [[c("Shapiro–Wilk", "sup-sw"), c("&lt; 0,0001", "sup-sw"), c("se rechaza normalidad", "sup-sw", { clase: "pz-ro" })],
      [c("Levene (6 trat.)", "sup-lev"), c("0,5499", "sup-lev"), c("varianzas iguales ✓", "sup-lev", { clase: "pz-ve" })]]) +
    tabla(["Molde", "s de residuos"], [[c("A1", "disp", { hl: ["disp"] }), c("1,106", "disp", { hl: ["disp"] })], [c("A2", "disp"), c("1,340", "disp")]], "pz-chica") +
    nota({ en: "fin" }, "A2 da menor hinchamiento medio; A1 es más parejo: elegir es pesar ambas cosas") }
] };
