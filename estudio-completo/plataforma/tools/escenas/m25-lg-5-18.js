"use strict";
const E = require("./_ej");
const A = require("./_anim");
const { n, nt, $, c, k, kicker, titulo, tabla, formula, nota, p, grafica, COL, factorial, portada, enunciado, factDis } = E;
const Y = [[[44, 34, 30], [49, 48, 43], [52, 58, 62]], [[62, 56, 58], [68, 70, 58], [69, 75, 65]]];
const R = factorial(Y);
module.exports = (ctx) => {
  /* Paso 1: totales de celda (desde las réplicas), de fila, de columna y gran total */
  const celdas = A.serieSumas(ctx, "tot-ij", "tot-i", [].concat(...Y.map((f, i) => f.map((rep, j) => ({
    etiqueta: $(`Y_{${i + 1}${j + 1}\\cdot}`), terms: rep.map((v, q) => ({ v, desde: `r${i}${j}${q}` })), idRes: `sc${i}${j}` })))), { dec: 0 });
  const filas = A.serieSumas(ctx, "tot-i", "tot-j", R.Tij.map((f, i) => ({ etiqueta: $(`Y_{${i + 1}\\cdot\\cdot}`), terms: f.map((v, j) => ({ v, desde: `t${i}${j}` })), idRes: `sf${i}` })), { dec: 0 });
  const cols = A.serieSumas(ctx, "tot-j", "tot-g", [0, 1, 2].map((j) => ({ etiqueta: $(`Y_{\\cdot ${j + 1}\\cdot}`), terms: R.Tij.map((f, i) => ({ v: f[j], desde: `t${i}${j}` })), idRes: `sk${j}` })), { dec: 0 });
  const gran = A.serieSumas(ctx, "tot-g", "corr", [{ etiqueta: $("Y_{\\cdots}"), terms: R.Ti.map((v, i) => ({ v, desde: `fi${i}` })), idRes: "sgg" }], { dec: 0, finUltima: "corr" });
  const ci = (i, j) => i * 3 + j;
  const tabTot = tabla(["A \\ B", "B1", "B2", "B3", { v: $("Y_{i\\cdot\\cdot}"), tot: true }],
    Y.map((f, i) => [{ v: "A" + (i + 1), th: true }].concat(f.map((rep, j) =>
      ({ v: rep.map((v, q) => `<span data-id="r${i}${j}${q}">${v}</span>`).join("; ") + ` <span class="pz-am" data-en="${celdas.llegada[ci(i, j)]}" data-desde="sc${i}${j}" data-id="t${i}${j}">→ ${R.Tij[i][j]}</span>` })),
      [{ v: String(R.Ti[i]), tot: true, en: filas.llegada[i], desde: `sf${i}`, id: `fi${i}` }]))
      .concat([[{ v: $("Y_{\\cdot j\\cdot}"), th: true }].concat(R.Tj.map((t, j) => ({ v: String(t), tot: true, en: cols.llegada[j], desde: `sk${j}` })),
        [{ v: String(R.G), tot: true, en: gran.llegada[0], desde: "sgg" }])]));
  /* Paso 2: sumas de cuadrados, una tras otra, cada una a su casilla */
  const chips = (vals, pref, lab) => `<span class="pz-tenue">${lab}</span> ` + vals.map((v, i) => `<span class="pz-chip" data-id="${pref}${i}">${v}</span>`).join("");
  const sq = (m, sig) => A.reparto(ctx, m, sig, 4, 0.3);
  const tA = sq("sca", "scb"), tB = sq("scb", "scsub"), tS = sq("scsub", "scab");
  const pasosSC = [
    { t: "corr", html: A.calc({ partes: [["corr", "\\tfrac{Y_{\\cdots}^2}{N}="], ["corr@0.8", `\\tfrac{${R.G}^2}{${R.N}}`]], tRes: "corr@1.6", res: n(R.C), idRes: "q-c" }) },
    { t: "sct", html: A.calc({ partes: [["sct", "SC_T=\\sum Y^2-\\tfrac{Y_{\\cdots}^2}{N}="], ["sct@1", `${R.ssy}-${nt(R.C)}`]], tRes: "sct@1.8", res: n(R.SST), idRes: "q-t" }) },
    { t: "sca", html: A.sumaVuela({ etiqueta: $("\\sum Y_{i\\cdot\\cdot}^2"), terms: R.Ti.map((v, i) => ({ v, desde: `pi${i}` })), cuadrado: true, tiempos: [tA[0], tA[1]], tRes: tA[2], idRes: "x-a", dec: 0 }) +
      A.calc({ partes: [[tA[2], `SC_A=\\dfrac{${R.sTi2}}{\\color{#ffd166}{bn=9}}-${nt(R.C)}`]], tRes: tA[3], res: n(R.SSA), idRes: "q-a" }) },
    { t: "scb", html: A.sumaVuela({ etiqueta: $("\\sum Y_{\\cdot j\\cdot}^2"), terms: R.Tj.map((v, j) => ({ v, desde: `pj${j}` })), cuadrado: true, tiempos: tB.slice(0, 3), tRes: tB[3], idRes: "x-b", dec: 0 }) +
      A.calc({ partes: [[A.mas(tB[3], 0.3), `SC_B=\\dfrac{${R.sTj2}}{\\color{#7cc6fe}{an=6}}-${nt(R.C)}`]], tRes: A.mas(tB[3], 1.2), res: n(R.SSB), idRes: "q-b" }) },
    { t: "scsub", html: A.calc({ partes: [["scsub", "SC_{celdas}=\\dfrac{\\sum Y_{ij\\cdot}^2}{n=3}-\\tfrac{Y_{\\cdots}^2}{N}="], [tS[1], `\\dfrac{${R.sTij2}}{3}-${nt(R.C)}`]], tRes: tS[3], res: n(R.SSsub), idRes: "q-s" }) },
    { t: "scab", html: A.calc({ partes: [["scab", "SC_{AB}=SC_{celdas}-SC_A-SC_B="], ["scab@1.5", `${nt(R.SSsub)}-${nt(R.SSA)}-${nt(R.SSB)}`]], tRes: "scab@2.6", res: n(R.SSAB), idRes: "q-ab" }) },
    { t: "sce", html: A.calc({ partes: [["sce", "SC_E=SC_T-SC_A-SC_B-SC_{AB}="], ["sce@0.8", `${nt(R.SST)}-${nt(R.SSA)}-${nt(R.SSB)}-${nt(R.SSAB)}`]], tRes: "sce@1.8", res: n(R.SSE), idRes: "q-e" }) }
  ];
  const scTab = tabla(["Fuente", "SC"], [["A", { v: n(R.SSA), en: A.mas(tA[3], 0.8), desde: "q-a" }], ["B", { v: n(R.SSB), en: A.mas(tB[3], 2), desde: "q-b" }],
    ["AB", { v: n(R.SSAB), en: "scab@3.4", desde: "q-ab" }], ["Error", { v: n(R.SSE), en: "sce@2.6", desde: "q-e" }], ["Total", { v: n(R.SST), en: "sct@2.6", desde: "q-t" }]], "pz-chica");
  /* Paso 3: tabla ANOVA que se llena */
  const tcm = A.reparto(ctx, "gl", "fa", 4, 1.5);
  const AN = A.anovaAnimada({ ctx, pref: "an", filas: [
    { nombre: "A", sc: R.SSA, gl: R.gA, tGl: "gl@0.3", tCM: tcm[1], tF: "fa", p: "&lt; 0,0001", hlF: ["fa", "fb"] },
    { nombre: "B", sc: R.SSB, gl: R.gB, tGl: "gl@0.9", tCM: tcm[2], tF: "fb", p: "0,0006", hlF: ["fb", "fab"] },
    { nombre: "AB", sc: R.SSAB, gl: R.gAB, tGl: "gl@1.6", tCM: tcm[3], tF: "fab", p: "0,2636", hlF: ["fab", "conc"] },
    { nombre: "E", sc: R.SSE, gl: R.gE, tGl: "gl@2.6", tCM: tcm[0], error: true }], total: { sc: R.SST, gl: R.N - 1, tGl: "gl@3.4" } });
  return { escenas: [
    portada("Libro guía · Cap. 5, ej. 18", "Un factorial 2 × 3 a mano", "Totales, sumas de cuadrados, ANOVA y LSD"),
    enunciado("Libro guía · Cap. 5, ej. 18",
      `Datos de un ${k("clave1", "diseño factorial 2 × 3")} con ${k("clave2", "3 réplicas")}. Use α = 0,05.<br><br>` +
      k("clave3", "a) Totales · b) SC_A, SC_B, SC_AB, SC_T, SC_E · c) ANOVA · d) LSD para A y para B · e) LSD con interacción"),
      tabla(["A \\ B", "B1", "B2", "B3"], Y.map((f, i) => [{ v: "A" + (i + 1), th: true }].concat(f.map((x) => x.join("; ")))))),
    factDis("Factor A", "Factor B", 2, 3, 3),
    { en: "tot", html: kicker("Paso 1 · Totales") + titulo("Celdas, filas, columnas y gran total") + tabTot +
      `<div class="pz-caja-calc"><span class="pz-etq">suma</span><div class="pz-pila">${celdas.sumas}${filas.sumas}${cols.sumas}${gran.sumas}</div></div>` },
    { en: "corr", html: kicker("Paso 2 · Sumas de cuadrados") + titulo("De la corrección al error") +
      `<div class="pz-cols pz-cols-64"><div class="pz-col">` +
      `<div class="pz-suma">${chips(R.Ti, "pi", $("Y_{i\\cdot\\cdot}:"))} &nbsp; ${chips(R.Tj, "pj", $("Y_{\\cdot j\\cdot}:"))}</div>` +
      `<div class="pz-suma">${chips(R.Tij.flat(), "pc", $("Y_{ij\\cdot}:"))}</div>` + A.secuencia(pasosSC) +
      `</div><div class="pz-col">${scTab}</div></div>` },
    { en: "gl", html: kicker("Paso 3 · Tabla ANOVA") + titulo("CM = SC / gl · F = CM / CM<sub>E</sub>") + AN.tabla.replace(">E<", ">Error<") + AN.calcs +
      `<div class="pz-cols">` + p({ en: "fa", clase: "pz-tenue" }, "F crít.: A 4,75 · B y AB 3,89") +
      nota({ en: "conc" }, "A y B activos; la interacción <strong>no</strong> ⇒ efectos principales por separado", "ok") + "</div>" },
    { en: "graf", html: kicker("Gráfica de interacción") + titulo("Líneas casi paralelas") +
      `<div style="height:62cqh">` + grafica({ xs: ["B1", "B2", "B3"], ymin: 30, ymax: 75, etiquetaY: "media de celda",
        series: [{ nombre: "A1", ys: R.mij[0], color: COL.ce, en: "graf", valores: true }, { nombre: "A2", ys: R.mij[1], color: COL.am, en: "graf", valores: true }] }) + "</div>" },
    { en: "lsd", html: kicker("Paso 4 · LSD") + titulo("Sin y con interacción") +
      A.secuencia([
        { t: "lsd", html: A.calc({ partes: [["lsd", "LSD_A=t_{0{,}025;12}\\sqrt{\\tfrac{2\\,CM_E}{bn}}="], ["lsd@1.5", `2{,}179\\sqrt{\\tfrac{2\\cdot${nt(R.CME, 4)}}{9}}`]], tRes: "lsd@2.6", res: "5,364", idRes: "l-a" }) },
        { t: "lsd-b", html: A.calc({ partes: [["lsd-b", "LSD_B=t_{0{,}025;12}\\sqrt{\\tfrac{2\\,CM_E}{an}}="], ["lsd-b@1", `2{,}179\\sqrt{\\tfrac{2\\cdot${nt(R.CME, 4)}}{6}}`]], tRes: "lsd-b@1.8", res: "6,57", idRes: "l-b" }) },
        { t: "lsd-ab", html: A.calc({ partes: [["lsd-ab", "LSD_{AB}=t_{0{,}025;12}\\sqrt{\\tfrac{2\\,CM_E}{n}}="], ["lsd-ab@1.5", `2{,}179\\sqrt{\\tfrac{2\\cdot${nt(R.CME, 4)}}{3}}`]], tRes: "lsd-ab@2.6", res: "9,291", idRes: "l-ab" }) }
      ], "cálculo") +
      tabla(["Comparación", "Cada media junta", "LSD"], [["Medias de A", "bn = 9 datos", { v: "5,364", en: "lsd@3.4", desde: "l-a" }], ["Medias de B", "an = 6 datos", { v: "6,57", en: "lsd-b@2.6", desde: "l-b" }],
        ["Medias de celda", "n = 3 datos", { v: "<strong>9,291</strong>", en: "lsd-ab@3.4", desde: "l-ab" }]], "pz-chica") +
      nota({ en: "lsd-ab-r" }, "Menos datos por media ⇒ menos precisión ⇒ LSD mayor") },
    { en: "fin", html: kicker("Cierre") + titulo("El camino de un factorial a mano") +
      E.lista([["fin", "Totales de celda, fila, columna y gran total"], ["fin", "Corrección y SC de A, de B y de celdas"],
        ["fin", "SC<sub>AB</sub> = SC<sub>celdas</sub> − SC<sub>A</sub> − SC<sub>B</sub>"], ["fin", "SC<sub>E</sub> al final, por diferencia"]]) }
  ] };
};
