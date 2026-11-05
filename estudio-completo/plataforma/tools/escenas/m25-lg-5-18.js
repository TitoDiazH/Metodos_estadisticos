"use strict";
const E = require("./_ej");
const { n, nt, $, c, k, kicker, titulo, tabla, formula, nota, paso, p, div, grafica, COL, factorial, portada, enunciado, factDis, anovaFact } = E;
const Y = [[[44, 34, 30], [49, 48, 43], [52, 58, 62]], [[62, 56, 58], [68, 70, 58], [69, 75, 65]]];
const R = factorial(Y);
const celdas = (fmt) => Y.map((f, i) => [{ v: "A" + (i + 1), th: true }].concat(f.map((x, j) => fmt(x, i, j))));
module.exports = { escenas: [
  portada("Libro guía · Cap. 5, ej. 18", "Un factorial 2 × 3 a mano", "Totales, sumas de cuadrados, ANOVA y LSD"),
  enunciado("Libro guía · Cap. 5, ej. 18",
    `Datos de un ${k("clave1", "diseño factorial 2 × 3")} con ${k("clave2", "3 réplicas")}. Use α = 0,05.<br><br>` +
    k("clave3", "a) Totales · b) SC_A, SC_B, SC_AB, SC_T, SC_E · c) ANOVA · d) LSD para A y para B · e) LSD con interacción"),
    tabla(["A \\ B", "B1", "B2", "B3"], celdas((x) => x.join("; ")))),
  factDis("Factor A", "Factor B", 2, 3, 3),
  { en: "tot", html: kicker("Paso 1 · Totales") + titulo("Celdas, filas, columnas y gran total") +
    tabla(["A \\ B", "B1", "B2", "B3", { v: $("Y_{i\\cdot\\cdot}"), tot: true }],
      celdas((x, i, j) => c(`<span class="pz-tenue">${x.join("+")} =</span> <strong>${R.Tij[i][j]}</strong>`, "tot-ij", { hl: ["scsub", "scab"] }))
        .map((f, i) => f.concat([c(String(R.Ti[i]), "tot-i", { tot: true, hl: ["sca", "scb"] })]))
        .concat([[{ v: $("Y_{\\cdot j\\cdot}"), th: true }].concat(R.Tj.map((t) => c(String(t), "tot-j", { tot: true, hl: ["scb", "scsub"] })),
          [c(String(R.G), "tot-g", { tot: true, hl: ["corr", "sct"] })])])) },
  { en: "corr", html: kicker("Paso 2 · Sumas de cuadrados") + titulo("De la corrección al error") +
    `<div class="pz-col" style="font-size:.98em">` +
    paso(1, "corr", $(`\\tfrac{Y_{\\cdots}^2}{N}=\\tfrac{${R.G}^2}{${R.N}}=${nt(R.C)}`)) +
    paso(2, "sct", $(`SC_T=${R.ssy}-${nt(R.C)}=\\mathbf{${nt(R.SST)}}`)) +
    paso(3, "sca", $(`SC_A=\\dfrac{${R.sTi2}}{\\color{#ffd166}{bn=9}}-${nt(R.C)}=\\mathbf{${nt(R.SSA)}}`)) +
    paso(4, "scb", $(`SC_B=\\dfrac{${R.sTj2}}{\\color{#7cc6fe}{an=6}}-${nt(R.C)}=\\mathbf{${nt(R.SSB)}}`)) +
    paso(5, "scsub", $(`SC_{celdas}=\\dfrac{\\sum Y_{ij\\cdot}^2}{n=3}-${nt(R.C)}=${nt(R.SSsub)}`)) +
    paso(6, "scab", $(`SC_{AB}=${nt(R.SSsub)}-${nt(R.SSA)}-${nt(R.SSB)}=\\mathbf{${nt(R.SSAB)}}`)) +
    paso(7, "sce", $(`SC_E=SC_T-SC_A-SC_B-SC_{AB}=\\mathbf{${nt(R.SSE)}}`)) + "</div>" },
  { en: "gl", html: kicker("Paso 3 · Tabla ANOVA") + titulo("¿Qué efectos están activos?") +
    anovaFact([["A", R.SSA, R.gA, R.CMA, R.FA, "&lt; 0,0001", "fa", ["fa", "fb"]], ["B", R.SSB, R.gB, R.CMB, R.FB, "0,0006", "fb", ["fb", "fab"]],
      ["AB", R.SSAB, R.gAB, R.CMAB, R.FAB, "0,2636", "fab", ["fab", "conc"]], ["Error", R.SSE, R.gE, R.CME, null, "", "gl"], ["Total", R.SST, R.N - 1, null, null, "", "gl"]]) +
    `<div class="pz-cols">` + p({ en: "fa", clase: "pz-tenue" }, "F crít.: A 4,75 · B y AB 3,89") +
    nota({ en: "conc" }, "A y B activos; la interacción <strong>no</strong> ⇒ efectos principales por separado", "ok") + "</div>" },
  { en: "graf", html: kicker("Gráfica de interacción") + titulo("Líneas casi paralelas") +
    `<div style="height:62cqh">` + grafica({ xs: ["B1", "B2", "B3"], ymin: 30, ymax: 75, etiquetaY: "media de celda",
      series: [{ nombre: "A1", ys: R.mij[0], color: COL.ce, en: "graf", valores: true }, { nombre: "A2", ys: R.mij[1], color: COL.am, en: "graf", valores: true }] }) + "</div>" },
  { en: "lsd", html: kicker("Paso 4 · LSD") + titulo("Sin y con interacción") +
    `<div class="pz-col">` +
    formula({ en: "lsd" }, `LSD_A=t_{0{,}025;12}\\sqrt{\\frac{2\\,CM_E}{bn}}=2{,}179\\sqrt{\\frac{2\\cdot${nt(R.CME, 4)}}{9}}=\\mathbf{5{,}364}`) +
    formula({ en: "lsd-b" }, `LSD_B=2{,}179\\sqrt{\\frac{2\\cdot${nt(R.CME, 4)}}{an=6}}=\\mathbf{6{,}57}`) +
    formula({ en: "lsd-ab" }, `LSD_{AB}=2{,}179\\sqrt{\\frac{2\\cdot${nt(R.CME, 4)}}{n=3}}=\\mathbf{9{,}291}`) +
    nota({ en: "lsd-ab-r" }, "Cada media de celda usa solo 3 datos ⇒ es menos precisa ⇒ la LSD es mayor") + "</div>" },
  { en: "fin", html: kicker("Cierre") + titulo("El camino de un factorial a mano") +
    E.lista([["fin", "Totales de celda, fila, columna y gran total"], ["fin", "Corrección y SC de A, de B y de celdas"],
      ["fin", "SC<sub>AB</sub> = SC<sub>celdas</sub> − SC<sub>A</sub> − SC<sub>B</sub>"], ["fin", "SC<sub>E</sub> al final, por diferencia"]]) }
] };
