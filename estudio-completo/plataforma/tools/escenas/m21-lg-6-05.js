"use strict";
const E = require("./_2k");
const { n, nt, $, c, k, kicker, titulo, tabla, formula, nota, p, lista, grafica, COL, dosK, portada, enunciado } = E;
const filas = [["−", "+", "−", 25, "b", "yates-1"], ["+", "+", "+", 12, "abc", "yates-2"], ["−", "−", "−", 30, "(1)", "yates-3"], ["+", "−", "+", 10, "ac", "yates-resto"],
  ["−", "−", "+", 10, "c", "yates-resto"], ["+", "+", "−", 14, "ab", "yates-resto"], ["−", "+", "+", 31, "bc", "yates-resto"], ["+", "−", "−", 17, "a", "yates-resto"]];
const tot = [30, 17, 25, 14, 10, 10, 31, 12], ef = dosK(tot, 3, 1);
const tablaY = tabla(["Código", "A", "B", "C", "Y"], filas.map(([a, b, cc, y, cod, m]) => [c(`<strong>${cod}</strong>`, m, { clase: "pz-am" }), a, b, cc, y]));
module.exports = { escenas: [
  portada("Libro guía · Cap. 6, ej. 5", "Un 2³ desordenado", "Notación de Yates, efectos y sumas de cuadrados"),
  enunciado("Libro guía · Cap. 6, ej. 5", `Resultados de un diseño factorial 2³ no replicado. ${k("clave1", "Las filas no están en orden estándar")}. ` +
    `${k("clave2", "Conteste sin usar software")}.`, tabla(["A", "B", "C", "Y"], filas.map((f) => f.slice(0, 4)), "pz-chica")),
  { en: "yates", html: kicker("Paso 1 · Notación de Yates") + titulo("Letras de los factores en nivel alto") +
    `<div class="pz-cols"><div class="pz-col">${tablaY}</div><div class="pz-col">` +
    nota({ en: "yates" }, "Se escriben las letras de los factores en <strong>+</strong>; si todos están en −: (1)") +
    p({ en: "ordenar" }, "En orden estándar:") +
    tabla(["(1)", "a", "b", "ab", "c", "ac", "bc", "abc"], [tot.map((t) => c(String(t), "ordenar"))], "pz-chica") + "</div></div>" },
  { en: "ca", html: kicker("Paso 2 · Efectos de A y B") + titulo("Con n = 1: efecto = contraste / 4") +
    formula({ en: "ca" }, "C_A=(a+ab+ac+abc)-((1)+b+c+bc)=(17+14+10+12)-(30+25+10+31)") +
    formula({ en: "ef-a" }, `C_A=53-96=\\mathbf{${ef.A.contraste}}\;\\Rightarrow\;A=\\tfrac{${ef.A.contraste}}{4}=\\mathbf{${nt(ef.A.efecto)}}`) +
    formula({ en: "cb" }, `C_B=(b+ab+bc+abc)-((1)+a+c+ac)=\\mathbf{${ef.B.contraste}}`) +
    formula({ en: "ef-b" }, `B=\\tfrac{${ef.B.contraste}}{4}=\\mathbf{${nt(ef.B.efecto)}}`) +
    `<div style="height:26cqh">` + grafica({ xs: ["−", "+"], ymin: 10, ymax: 26, alto: 150, dec: 0,
      series: [{ nombre: "A", ys: [24, 13.25], color: COL.am, en: "gef", valores: true }, { nombre: "B", ys: [16.75, 20.5], color: COL.ce, en: "gef", valores: true }] }) + "</div>" },
  { en: "cab", html: kicker("Paso 3 · Interacción AB") + titulo("Signo de AB = signo de A × signo de B") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "cab" }, "C_{AB}=((1)+ab+c+abc)-(a+b+ac+bc)") +
    formula({ en: "ef-ab" }, `C_{AB}=66-83=\\mathbf{${ef.AB.contraste}}\\Rightarrow AB=\\mathbf{${nt(ef.AB.efecto)}}`) +
    nota({ en: "gint-r" }, "Pendientes distintas ⇒ indicios de interacción") + "</div>" +
    `<div style="height:52cqh">` + grafica({ xs: ["A−", "A+"], ymin: 10, ymax: 30, dec: 1, etiquetaY: "promediando C",
      series: [{ nombre: "B−", ys: [20, 13.5], color: COL.ro, en: "gint", valores: true }, { nombre: "B+", ys: [28, 13], color: COL.ve, en: "gint", valores: true }] }) + "</div></div>" },
  { en: "sig", html: kicker("¿Son significativos?") + titulo("Sin réplicas no hay error puro") +
    lista([["sig-r", "Sin réplicas ⇒ 0 gl para el error"], ["sig-1", "Gráfica de efectos en papel normal (o Pareto / Daniel)"],
      ["sig-2", "Suponer despreciables las interacciones altas y usarlas como error"], ["sig-3", "Replicar el experimento (o agregar puntos centrales)"]]) },
  { en: "sc", html: kicker("Paso 4 · Sumas de cuadrados") + titulo("SC = contraste² / (n · 2³) = contraste² / 8") +
    formula({ en: "sc-a" }, `SC_A=\\frac{(${ef.A.contraste})^2}{8}=\\mathbf{${nt(ef.A.sc)}}`) +
    formula({ en: "sc-ab" }, `SC_{AB}=\\frac{(${ef.AB.contraste})^2}{8}=\\mathbf{${nt(ef.AB.sc)}}`) +
    nota({ en: "fin" }, "No saltarse el paso 1: un código de Yates mal puesto arruina todos los contrastes", "ok") }
] };
