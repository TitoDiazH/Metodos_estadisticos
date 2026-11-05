"use strict";
const E = require("./_2k");
const { n, nt, $, c, k, kicker, titulo, tabla, formula, nota, p, lista, grafica, COL, dosK, portada, enunciado } = E;
const A = require("./_anim");
const COD = ["(1)", "a", "b", "ab", "c", "ac", "bc", "abc"];
const filas = [["−", "+", "−", 25, "b", "yates-1"], ["+", "+", "+", 12, "abc", "yates-2"], ["−", "−", "−", 30, "(1)", "yates-3"], ["+", "−", "+", 10, "ac", "yates-resto"],
  ["−", "−", "+", 10, "c", "yates-resto"], ["+", "+", "−", 14, "ab", "yates-resto"], ["−", "+", "+", 31, "bc", "yates-resto"], ["+", "−", "−", 17, "a", "yates-resto"]];
const tot = [30, 17, 25, 14, 10, 10, 31, 12], ef = dosK(tot, 3, 1);
const tablaY = tabla(["Código", "A", "B", "C", "Y"], filas.map(([a, b, cc, y, cod, m]) => [c(`<strong>${cod}</strong>`, m, { clase: "pz-am" }), a, b, cc, y]));
module.exports = (ctx) => {
  /* Totales en orden estándar (cada celda con data-id) y contrastes que se arman con sus signos */
  const fila = (pref) => tabla(COD, [tot.map((t, i) => ({ v: String(t), id: `${pref}${i}` }))], "pz-chica");
  const contraste = (efe, mk, sig, pref, id) => {
    const terms = tot.map((v, i) => ({ v, desde: `${pref}${i}`, signo: ef[efe].signos[i] })).sort((x, y) => y.signo - x.signo);
    const tt = A.reparto(ctx, mk, sig, 9, 0.5);
    return A.sumaVuela({ etiqueta: $(`C_{${efe}}`), terms, tiempos: tt.slice(0, 8), tRes: tt[8], idRes: id, dec: 0 });
  };
  return { escenas: [
  portada("Libro guía · Cap. 6, ej. 5", "Un 2³ desordenado", "Notación de Yates, efectos y sumas de cuadrados"),
  enunciado("Libro guía · Cap. 6, ej. 5", `Resultados de un diseño factorial 2³ no replicado. ${k("clave1", "Las filas no están en orden estándar")}. ` +
    `${k("clave2", "Conteste sin usar software")}.`, tabla(["A", "B", "C", "Y"], filas.map((f) => f.slice(0, 4)), "pz-chica")),
  { en: "yates", html: kicker("Paso 1 · Notación de Yates") + titulo("Letras de los factores en nivel alto") +
    `<div class="pz-cols"><div class="pz-col">${tablaY}</div><div class="pz-col">` +
    nota({ en: "yates" }, "Se escriben las letras de los factores en <strong>+</strong>; si todos están en −: (1)") +
    p({ en: "ordenar" }, "En orden estándar:") +
    tabla(["(1)", "a", "b", "ab", "c", "ac", "bc", "abc"], [tot.map((t) => c(String(t), "ordenar"))], "pz-chica") + "</div></div>" },
  { en: "ca", html: kicker("Paso 2 · Efectos de A y B") + titulo("Con n = 1: efecto = contraste / 4") + fila("x") +
    A.secuencia([
      { t: "ca", html: contraste("A", "ca", "ef-a", "x", "cA") },
      { t: "ef-a", html: A.calc({ partes: [["ef-a", `A=\\dfrac{C_A}{4}=\\dfrac{${ef.A.contraste}}{4}`]], tRes: "ef-a@1.2", res: n(ef.A.efecto, 2), idRes: "eA" }) },
      { t: "cb", html: contraste("B", "cb", "ef-b", "x", "cB") },
      { t: "ef-b", html: A.calc({ partes: [["ef-b", `B=\\dfrac{C_B}{4}=\\dfrac{${ef.B.contraste}}{4}`]], tRes: "ef-b@1.2", res: n(ef.B.efecto, 2), idRes: "eB" }) }
    ], "cálculo") + `<div class="pz-cols"><div class="pz-col">` +
    tabla(["Efecto", "Contraste", "Efecto"], [["A", { v: String(ef.A.contraste).replace("-", "−"), en: A.reparto(ctx, "ca", "ef-a", 9, 0.5)[8].replace(/@([\d.]+)/, (m, x) => "@" + (Number(x) + 0.35).toFixed(2)), desde: "cA" }, { v: n(ef.A.efecto, 2), en: "ef-a@2", desde: "eA" }],
      ["B", { v: String(ef.B.contraste), en: A.reparto(ctx, "cb", "ef-b", 9, 0.5)[8].replace(/@([\d.]+)/, (m, x) => "@" + (Number(x) + 0.35).toFixed(2)), desde: "cB" }, { v: n(ef.B.efecto, 2), en: "ef-b@2", desde: "eB" }]], "pz-chica") +
    `</div><div style="height:26cqh">` + grafica({ xs: ["−", "+"], ymin: 10, ymax: 26, alto: 170, dec: 0,
      series: [{ nombre: "A", ys: [24, 13.25], color: COL.am, en: "gef", valores: true }, { nombre: "B", ys: [16.75, 20.5], color: COL.ce, en: "gef", valores: true }] }) + "</div></div>" },
  { en: "cab", html: kicker("Paso 3 · Interacción AB") + titulo("Signo de AB = signo de A × signo de B") + fila("y") +
    A.secuencia([
      { t: "cab", html: contraste("AB", "cab", "ef-ab", "y", "cAB") },
      { t: "ef-ab", html: A.calc({ partes: [["ef-ab", `AB=\\dfrac{C_{AB}}{4}=\\dfrac{${ef.AB.contraste}}{4}`]], tRes: "ef-ab@1.2", res: n(ef.AB.efecto, 2), idRes: "eAB" }) }
    ], "cálculo") +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "ef-ab@2" }, `Efecto AB = <strong data-en="ef-ab@2" data-desde="eAB">${n(ef.AB.efecto, 2)}</strong>`) +
    nota({ en: "gint-r" }, "Pendientes distintas ⇒ indicios de interacción") + "</div>" +
    `<div style="height:36cqh">` + grafica({ xs: ["A−", "A+"], ymin: 10, ymax: 30, dec: 1, etiquetaY: "promediando C", alto: 200,
      series: [{ nombre: "B−", ys: [20, 13.5], color: COL.ro, en: "gint", valores: true }, { nombre: "B+", ys: [28, 13], color: COL.ve, en: "gint", valores: true }] }) + "</div></div>" },
  { en: "sig", html: kicker("¿Son significativos?") + titulo("Sin réplicas no hay error puro") +
    lista([["sig-r", "Sin réplicas ⇒ 0 gl para el error"], ["sig-1", "Gráfica de efectos en papel normal (o Pareto / Daniel)"],
      ["sig-2", "Suponer despreciables las interacciones altas y usarlas como error"], ["sig-3", "Replicar el experimento (o agregar puntos centrales)"]]) },
  { en: "sc", html: kicker("Paso 4 · Sumas de cuadrados") + titulo("SC = contraste² / (n · 2³) = contraste² / 8") +
    `<div class="pz-suma"><span class="pz-tenue">${$("C_A=")}</span><span class="pz-chip">${ef.A.contraste}</span> &nbsp; <span class="pz-tenue">${$("C_{AB}=")}</span><span class="pz-chip">${ef.AB.contraste}</span></div>` +
    A.calc({ partes: [["sc-a", `SC_A=\\frac{(${ef.A.contraste})^2}{8}=\\frac{${ef.A.contraste ** 2}}{8}`]], tRes: "sc-a@1.5", res: n(ef.A.sc, 3), idRes: "sA" }) +
    A.calc({ partes: [["sc-ab", `SC_{AB}=\\frac{(${ef.AB.contraste})^2}{8}=\\frac{${ef.AB.contraste ** 2}}{8}`]], tRes: "sc-ab@1.5", res: n(ef.AB.sc, 3), idRes: "sAB" }) +
    nota({ en: "fin" }, "No saltarse el paso 1: un código de Yates mal puesto arruina todos los contrastes", "ok") }
] };
};
