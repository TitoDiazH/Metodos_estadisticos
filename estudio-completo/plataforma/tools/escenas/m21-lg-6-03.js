"use strict";
const E = require("./_2k");
const { n, nt, $, c, k, kicker, titulo, tabla, formula, nota, p, lista, grafica, COL, dosK, portada, enunciado, tablaSignos } = E;
const tot = [246, 239, 207, 270], ef = dosK(tot, 2, 3), m = tot.map((t) => t / 3);
module.exports = { escenas: [
  portada("Libro guía · Cap. 6, ej. 3", "Un 2² sin software", "Contrastes, efectos e interacción a mano"),
  enunciado("Libro guía · Cap. 6, ej. 3", `Resultados de un diseño factorial. ${k("clave1", "Conteste sin usar software, haciendo las operaciones a mano")}. ` +
    `${k("clave2", "Los totales de cada tratamiento vienen dados")}.`,
    tabla(["A", "B", "I", "II", "III", "Total"], [["−", "−", 82, 80, 84, "(1) = 246"], ["+", "−", 78, 82, 79, "a = 239"], ["−", "+", 71, 70, 66, "b = 207"], ["+", "+", 89, 88, 93, "ab = 270"]]
      .map((f) => f.map((v, j) => (j === 5 ? c(v, "clave2", { hl: ["clave2"] }) : v))), "pz-chica")),
  { en: "dis", html: kicker("El diseño") + titulo("¿Qué nombre recibe?") +
    lista([["dis-r", "Factorial <strong>2²</strong>: 2 factores con 2 niveles cada uno"], ["dis-r", "4 tratamientos: (1), a, b, ab"],
      ["rep", "3 réplicas ⇒ 12 corridas"], ["orden", "Orden <strong>aleatorio</strong> de las 12: los factores no controlados se reparten al azar"],
      ["estudia", "Efectos: A, B y la interacción AB · con réplicas se estima el error"]]) },
  { en: "signos", html: kicker("Contrastes") + titulo("Tabla de signos") +
    `<div class="pz-cols pz-cols-37"><div class="pz-col">` +
    tablaSignos(tot, 2, ["A", "B", "AB"], { A: "signos", B: "signos", AB: "signos-ab" }, { enTot: "tot", clase: "",
      hl: { A: ["ca", "cb"], B: ["cb", "cab"], AB: ["cab", "ef"] } }) + `</div><div class="pz-col">` +
    formula({ en: "ca" }, `C_A=a+ab-b-(1)=239+270-207-246=\\mathbf{${ef.A.contraste}}`) +
    formula({ en: "cb" }, `C_B=b+ab-a-(1)=\\mathbf{${ef.B.contraste}}`) +
    formula({ en: "cab" }, `C_{AB}=(1)+ab-a-b=\\mathbf{${ef.AB.contraste}}`) + "</div></div>" },
  { en: "ef", html: kicker("Efectos") + titulo("Contraste dividido en n · 2<sup>k−1</sup> = 6") +
    formula({ en: "ef" }, "\\text{Efecto}=\\frac{\\text{Contraste}}{n\\,2^{k-1}}=\\frac{\\text{Contraste}}{3\\cdot2}") +
    tabla(["Efecto", "Contraste", "Efecto"], [["A", ef.A.contraste, nt(ef.A.efecto)], ["B", ef.B.contraste, nt(ef.B.efecto)], ["AB", ef.AB.contraste, nt(ef.AB.efecto)]]
      .map((f, i) => f.map((v) => c(i === 2 || i === 0 ? String(v).replace("{,}", ",") : String(v).replace("{,}", ",").replace("-", "−"), ["ef-a", "ef-b", "ef-ab"][i], { hl: i === 2 ? ["ef-mira"] : null })))) +
    nota({ en: "ef-mira" }, "¡La interacción es el efecto más grande!", "mal") },
  { en: "medias", html: kicker("Gráficas") + titulo("Efectos principales vs. interacción") +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "medias" }, `Medias: (1) = ${n(m[0], 2)} · a = ${n(m[1], 2)} · b = ${n(m[2], 2)} · ab = ${n(m[3], 2)}`) +
    `<div style="height:40cqh">` + grafica({ xs: ["−", "+"], ymin: 65, ymax: 92, etiquetaY: "efectos principales", dec: 0,
      series: [{ nombre: "A", ys: [(m[0] + m[2]) / 2, (m[1] + m[3]) / 2], color: COL.am, en: "gef", valores: true },
        { nombre: "B", ys: [(m[0] + m[1]) / 2, (m[2] + m[3]) / 2], color: COL.ce, en: "gef", valores: true }] }) + "</div></div>" +
    `<div class="pz-col"><div style="height:46cqh">` + grafica({ xs: ["A−", "A+"], ymin: 65, ymax: 92, etiquetaY: "interacción AB", dec: 1,
      series: [{ nombre: "B−", ys: [m[0], m[1]], color: COL.ro, en: "gint", valores: true }, { nombre: "B+", ys: [m[2], m[3]], color: COL.ve, en: "gint", valores: true }] }) + "</div>" +
    nota({ en: "gint-cruce" }, "Se cruzan: el efecto de A depende de B", "mal") + "</div></div>" },
  { en: "binf", html: kicker("¿B influye?") + titulo("Sí, a través de la interacción") +
    tabla(["", "Cambio al subir B"], [[c("Con A bajo", "binf-r"), c("82 → 69: −13", "binf-r", { clase: "pz-ro" })], [c("Con A alto", "binf-r"), c("79,67 → 90: +10,33", "binf-r", { clase: "pz-ve" })]]) +
    nota({ en: "binf-r" }, "Los cambios se cancelan en el promedio ⇒ efecto principal de B ≈ −1,33") +
    nota({ en: "fin" }, "Un efecto principal pequeño no significa que el factor no importe", "ok") }
] };
