"use strict";
const E = require("./_ej");
const { n, nt, $, c, k, kicker, titulo, tabla, formula, nota, p, paso, grafica, COL, factorial, portada, enunciado, factDis, anovaFact } = E;
const Y = [[[2.5, 2.8], [3.8, 3.4], [4, 4.2]], [[1.6, 1.22], [3.2, 2.8], [4.3, 4.7]]];
const R = factorial(Y);
const T = ["60 °C", "80 °C", "100 °C"];
module.exports = { escenas: [
  portada("Libro guía · Cap. 5, ej. 20", "Pegamento y temperatura de curado", "Factorial 2 × 3 con interacción activa"),
  enunciado("Libro guía · Cap. 5, ej. 20",
    `Resistencia a la torsión de componentes pegados sobre placas: 2 tipos de pegamento y 3 temperaturas de curado. ` +
    `${k("clave1", "En cada combinación se analizan 2 componentes")}. ${k("clave2", "Se busca la mayor resistencia")}.`,
    tabla(["Pegamento"].concat(T), Y.map((f, i) => [{ v: "A" + (i + 1), th: true }].concat(f.map((x) => x.map((v) => n(v, 2)).join("; ")))))),
  factDis("Pegamento", "Curado", 2, 3, 2),
  { en: "tot", html: kicker("Totales y sumas de cuadrados") + titulo("Del total a la interacción") +
    `<div class="pz-cols">` +
    tabla(["", ...T], R.Tij.map((f, i) => [{ v: "A" + (i + 1), th: true }].concat(f.map((t) => c(n(t, 2), i ? "tot-ij" : "tot", { tot: true }))))) +
    `<div class="pz-col">` + p({ en: "tot-g" }, `Gran total: <strong>${n(R.G, 2)}</strong>`) +
    paso(1, "sct", $(`SC_T=${nt(R.SST)}`)) + paso(2, "sca", $(`SC_A=${nt(R.SSA)}`)) + paso(3, "scb", $(`SC_B=${nt(R.SSB)}`)) +
    paso(4, "scab", $(`SC_{AB}=${nt(R.SSsub)}-${nt(R.SSA)}-${nt(R.SSB)}=${nt(R.SSAB)}`)) + paso(5, "sce", $(`SC_E=${nt(R.SSE)}\;(6\\text{ gl})`)) + "</div></div>" },
  { en: "fa", html: kicker("Tabla ANOVA") + titulo("Los tres efectos activos") +
    anovaFact([["Pegamento (A)", R.SSA, R.gA, R.CMA, R.FA, "0,0161", "fa", ["fa", "fb"]], ["Curado (B)", R.SSB, R.gB, R.CMB, R.FB, "&lt; 0,0001", "fb", ["fb", "fab"]],
      ["AB", R.SSAB, R.gAB, R.CMAB, R.FAB, "0,0101", "fab", ["fab", "fin"]], ["Error", R.SSE, R.gE, R.CME, null, "", "fa"], ["Total", R.SST, R.N - 1, null, null, "", "fa"]]) +
    p({ en: "fa", clase: "pz-tenue" }, "F crít.: A 5,99 · B y AB 5,14") +
    nota({ en: "conc-r" }, "Interacción activa ⇒ se miran las <strong>6 medias de celda</strong>, no los efectos por separado", "mal") },
  { en: "graf", html: kicker("Gráfica de interacción") + titulo("Las líneas se cruzan") +
    `<div class="pz-cols pz-cols-64"><div style="height:58cqh">` + grafica({ xs: T, ymin: 1, ymax: 5, etiquetaY: "resistencia media",
      series: [{ nombre: "A1", ys: R.mij[0], color: COL.ce, en: "graf", valores: true }, { nombre: "A2", ys: R.mij[1], color: COL.am, en: "graf", valores: true, hl: ["mejor"] }] }) + "</div>" +
    `<div class="pz-col">` + nota({ en: "efectos" }, `Medias generales: A1 = ${n(R.mi[0], 2)} &gt; A2 = ${n(R.mi[1], 2)}… pero a 100 °C gana A2`, "mal") +
    nota({ en: "mejor" }, "Mejor: <strong>pegamento A2 con curado a 100 °C</strong>", "ok") +
    formula({ en: "pred" }, "\\hat Y=\\bar Y_{23\\cdot}=4{,}5\\pm0{,}434") + "</div></div>" },
  { en: "sup", html: kicker("Residuos") + titulo("Conclusiones con cautela") +
    tabla(["Prueba", "Valor-p", "Conclusión"], [[c("Shapiro–Wilk", "sup-sw"), c("0,0047", "sup-sw"), c("se rechaza normalidad", "sup-sw", { clase: "pz-ro" })],
      [c("Levene", "sup-lev"), c("&lt; 0,0001", "sup-lev"), c("varianzas distintas", "sup-lev", { clase: "pz-ro" })]]) +
    nota({ en: "fin" }, "Con interacción activa, el mejor tratamiento se elige <strong>celda por celda</strong>", "ok") }
] };
