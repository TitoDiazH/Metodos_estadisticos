"use strict";
const E = require("./_ej");
const A = require("./_anim");
const { n, nt, $, c, k, kicker, titulo, tabla, formula, nota, p, paso, grafica, COL, factorial, portada, enunciado, factDis, anovaFact } = E;
const Y = [[[2.5, 2.8], [3.8, 3.4], [4, 4.2]], [[1.6, 1.22], [3.2, 2.8], [4.3, 4.7]]];
const R = factorial(Y);
const T = ["60 °C", "80 °C", "100 °C"];
module.exports = (ctx) => ({ escenas: [
  portada("Libro guía · Cap. 5, ej. 20", "Pegamento y temperatura de curado", "Factorial 2 × 3 con interacción activa"),
  enunciado("Libro guía · Cap. 5, ej. 20",
    `Resistencia a la torsión de componentes pegados sobre placas: 2 tipos de pegamento y 3 temperaturas de curado. ` +
    `${k("clave1", "En cada combinación se analizan 2 componentes")}. ${k("clave2", "Se busca la mayor resistencia")}.`,
    tabla(["Pegamento"].concat(T), Y.map((f, i) => [{ v: "A" + (i + 1), th: true }].concat(f.map((x) => x.map((v) => n(v, 2)).join("; ")))))),
  factDis("Pegamento", "Curado", 2, 3, 2),
  (() => {
    const s1 = A.serieSumas(ctx, "tot", "tot-ij", Y[0].map((rep, j) => ({ etiqueta: $(`Y_{1${j + 1}\\cdot}`), terms: rep.map((v, q) => ({ v, desde: `r0${j}${q}` })), idRes: `c0${j}` })));
    const s2 = A.serieSumas(ctx, "tot-ij", "tot-g", Y[1].map((rep, j) => ({ etiqueta: $(`Y_{2${j + 1}\\cdot}`), terms: rep.map((v, q) => ({ v, desde: `r1${j}${q}` })), idRes: `c1${j}` })));
    const sg = A.serieSumas(ctx, "tot-g", "sct", [{ etiqueta: $("Y_{\\cdots}"), terms: R.Tij.flat().map((v, q) => ({ v, desde: `t${q}` })), idRes: "cg" }], { finUltima: "sct" });
    const lleg = [s1.llegada, s2.llegada];
    return { en: "tot", html: kicker("Totales y sumas de cuadrados") + titulo("Del total a la interacción") +
      `<div class="pz-cols"><div class="pz-col">` +
      tabla(["", ...T], Y.map((f, i) => [{ v: "A" + (i + 1), th: true }].concat(f.map((rep, j) => ({ v: rep.map((v, q) => `<span data-id="r${i}${j}${q}">${n(v, 2)}</span>`).join("; ") +
        ` <span class="pz-am" data-en="${lleg[i][j]}" data-desde="c${i}${j}" data-id="t${i * 3 + j}">→ ${n(R.Tij[i][j], 2)}</span>` })))), "pz-chica") +
      p({ en: sg.llegada[0] }, `Gran total: <strong data-en="${sg.llegada[0]}" data-desde="cg">${n(R.G, 2)}</strong>`) +
      `<div class="pz-caja-calc"><span class="pz-etq">suma</span><div class="pz-pila">${s1.sumas}${s2.sumas}${sg.sumas}</div></div></div>` +
      `<div class="pz-col">` +
      paso(1, "sct", $(`SC_T=${nt(R.SST)}`)) + paso(2, "sca", $(`SC_A=${nt(R.SSA)}`)) + paso(3, "scb", $(`SC_B=${nt(R.SSB)}`)) +
      paso(4, "scab", $(`SC_{AB}=${nt(R.SSsub)}-${nt(R.SSA)}-${nt(R.SSB)}=${nt(R.SSAB)}`)) + paso(5, "sce", $(`SC_E=${nt(R.SST)}-${nt(R.SSA)}-${nt(R.SSB)}-${nt(R.SSAB)}=${nt(R.SSE)}`)) + "</div></div>" };
  })(),
  { en: "fa", html: kicker("Tabla ANOVA") + titulo("Los tres efectos activos") +
    (() => { const AN = A.anovaAnimada({ ctx, pref: "an", dec: 3, filas: [
      { nombre: "Pegamento", sc: R.SSA, gl: R.gA, tGl: "fa@0.3", tCM: "fa@0.6", tF: "fa", p: "0,0161", hlF: ["fa", "fb"] },
      { nombre: "Curado", sc: R.SSB, gl: R.gB, tGl: "fa@0.5", tCM: "fb", tF: "fb@0.1", p: "&lt; 0,0001", hlF: ["fb", "fab"] },
      { nombre: "AB", sc: R.SSAB, gl: R.gAB, tGl: "fa@0.7", tCM: "fab", tF: "fab@0.1", p: "0,0101", hlF: ["fab", "conc"] },
      { nombre: "E", sc: R.SSE, gl: R.gE, tGl: "fa@0.9", tCM: "fa@0.4", error: true }], total: { sc: R.SST, gl: R.N - 1, tGl: "fa@1.1" } });
      return AN.tabla.replace(">E<", ">Error<") + AN.calcs; })() +
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
] });
