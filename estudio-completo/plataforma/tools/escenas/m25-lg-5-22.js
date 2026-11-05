"use strict";
const E = require("./_ej");
const { n, nt, $, c, k, kicker, titulo, tabla, formula, nota, p, lista, grafica, COL, factorial, portada, enunciado, factDis, anovaFact } = E;
const Y = [[[5.8, 5.9], [5.4, 5.5], [4.9, 5.1], [4.5, 4.4]], [[5, 4.9], [4.8, 4.7], [4.6, 4.4], [4.1, 4.3]], [[4.7, 4.6], [4.4, 4.4], [4.1, 4], [3.7, 3.6]]];
const R = factorial(Y);
const AR = ["0,8 %", "0,9 %", "1,0 %", "1,1 %"], TE = ["90", "100", "110"];
module.exports = { escenas: [
  portada("Libro guía · Cap. 5, ej. 22", "Blanqueo de aceite comestible", "Factorial 3 × 4 con 2 réplicas"),
  enunciado("Libro guía · Cap. 5, ej. 22",
    `La eficacia del blanqueo se mide con el color: ${k("clave1", "un valor menor indica un aceite más claro (mejor)")}. ` +
    `${k("clave2", "Temperatura: 90, 100, 110 · Arcilla: 0,8 a 1,1 %")}. ${k("clave3", "En planta se usa 1,1 % y 100 grados")}.`,
    tabla(["T \\ Arcilla"].concat(AR), Y.map((f, i) => [{ v: TE[i], th: true }].concat(f.map((x) => x.map((v) => n(v, 1)).join("; ")))), "pz-chica")),
  factDis("Temperatura", "Arcilla", 3, 4, 2),
  { en: "niveles", html: kicker("¿Por qué esos niveles?") + titulo("Alrededor de las condiciones actuales") +
    lista([["niveles", "Temperatura: hacia ambos lados de 100"], ["niveles", "Arcilla: hacia abajo de 1,1 % (la arcilla cuesta)"],
      ["niveles", "Objetivo: ¿se puede ahorrar arcilla sin perder calidad?"]]) },
  { en: "tabla", html: kicker("Tabla ANOVA") + titulo("Los tres efectos activos") +
    anovaFact([["Temperatura (A)", R.SSA, R.gA, R.CMA, R.FA, "&lt; 0,0001", "fa", ["fa", "fb"]], ["Arcilla (B)", R.SSB, R.gB, R.CMB, R.FB, "&lt; 0,0001", "fb", ["fb", "fab"]],
      ["AB", R.SSAB, R.gAB, R.CMAB, R.FAB, "0,0109", "fab", ["fab", "conc"]], ["Error", R.SSE, R.gE, R.CME, null, "", "tabla"], ["Total", R.SST, R.N - 1, null, null, "", "tabla"]]) +
    nota({ en: "conc" }, "Interacción activa (4,72 &gt; 3,00) ⇒ decidir con las 12 medias de celda", "ok") },
  { en: "efectos", html: kicker("Gráficas") + titulo("Más arcilla y más temperatura ⇒ más claro") +
    `<div class="pz-cols"><div style="height:56cqh">` + grafica({ xs: AR, ymin: 3.5, ymax: 6, etiquetaY: "color medio", dec: 1,
      series: [{ nombre: "90", ys: R.mij[0], color: COL.ro, en: "graf", valores: true }, { nombre: "100", ys: R.mij[1], color: COL.ce, en: "graf", valores: true },
        { nombre: "110", ys: R.mij[2], color: COL.am, en: "graf", valores: true }] }) + "</div><div class=\"pz-col\">" +
    p({ en: "efectos" }, `Arcilla: ${n(R.mj[0], 2)} → ${n(R.mj[3], 2)}`) + p({ en: "efectos" }, `Temperatura: ${n(R.mi[0], 2)} → ${n(R.mi[2], 2)}`) +
    nota({ en: "graf" }, "Caída por arcilla: 1,4 a 90° · 0,75 a 100° · 1,0 a 110° ⇒ no paralelas") +
    nota({ en: "nolineal" }, "¿Curvatura? Mirar si los saltos entre niveles seguidos son parecidos") + "</div></div>" },
  { en: "limite", html: kicker("Elegir el tratamiento") + titulo("Color de a lo más 4,8") +
    tabla(["T \\ Arcilla"].concat(AR), R.mij.map((f, i) => [{ v: TE[i], th: true }].concat(f.map((m, j) => {
      const ok = m <= 4.8 + 1e-9, mejor = i === 2 && j === 0;
      return { v: n(m, 2), clase: ok ? "pz-ve" : "pz-tenue", hl: mejor ? ["elige"] : ok ? ["cumplen", "elige"] : null };
    })))) +
    nota({ en: "elige" }, "Menos arcilla (el insumo caro): <strong>110 grados con 0,8 % de arcilla</strong> (color 4,65)", "ok") +
    nota({ en: "real" }, "Llevarlo a planta: pocos niveles alrededor del elegido, réplicas en lotes o días (bloques) y medir el costo") },
  { en: "fin", html: kicker("Cierre") + titulo("Todo junto") +
    lista([["fin", "Leer qué significa «mejor» en la respuesta (aquí: menor color)"], ["fin", "Respetar la interacción: decidir con las medias de celda"],
      ["fin", "Usar la restricción práctica (color ≤ 4,8) y el costo para elegir"]]) }
] };
