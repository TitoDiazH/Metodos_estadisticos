"use strict";
const E = require("./_2k");
const { n, nt, $, c, k, kicker, titulo, tabla, formula, nota, p, lista, dosK, portada, enunciado, tablaSignos, pareto } = E;
const A = require("./_anim");
const COD = ["(1)", "a", "b", "ab", "c", "ac", "bc", "abc"];
const tot = [27.2, 29.1, 29.5, 28.4, 34.1, 30.6, 34.5, 38.1], ef = dosK(tot, 3, 2);
const orden = ["C", "ABC", "B", "BC", "AB", "A", "AC"], marca = { C: "ef-c", ABC: "ef-abc", B: "ef-b", BC: "ef-bc", AB: "ef-bc", A: "ef-a", AC: "ef-a" };
const activos = ["B", "AB", "C", "BC", "ABC"];
const Fv = { A: 0.8, B: 89.36, AB: 16.64, C: 528.33, AC: 0.49, BC: 39.3, ABC: 101 }, pv = { A: "0,3966", B: "&lt; 0,0001", AB: "0,0035", C: "&lt; 0,0001", AC: "0,5058", BC: "0,0002", ABC: "&lt; 0,0001" };
module.exports = (ctx) => {
  /* Signos con totales (data-id) y el contraste de C armado término a término */
  const sig = tabla(["Trat.", "A", "B", "AB", "C", "AC", "BC", "ABC", "Total"], tot.map((t, i) => [{ v: COD[i], th: true }]
    .concat(["A", "B", "AB", "C", "AC", "BC", "ABC"].map((e) => ({ v: ef[e].signos[i] > 0 ? "+" : "−", clase: ef[e].signos[i] > 0 ? "pz-ve" : "pz-ro", hl: e === "C" ? ["tot@0.3", "formula@3"] : null })),
      [{ v: n(t, 1), tot: true, en: "tot", id: `tt${i}` }])), "pz-chica");
  const ttC = A.reparto(ctx, "tot", "formula", 9, 0.6);
  const sumaC = A.sumaVuela({ etiqueta: $("C_C"), terms: tot.map((v, i) => ({ v, desde: `tt${i}`, signo: ef.C.signos[i] })).sort((x, y) => y.signo - x.signo),
    tiempos: ttC.slice(0, 8), tRes: ttC[8], idRes: "cC", dec: 1 });
  /* Efecto y SC de cada efecto, en el orden en que se narran */
  const marcaDe = { C: "ef-c", ABC: "ef-abc", B: "ef-b", BC: "ef-bc", AB: "ef-bc@2.5", A: "ef-a", AC: "ef-a@2.5" };
  const tE = A.espaciar(ctx, orden.map((s) => marcaDe[s]), 2.4);
  const tDe = {}; orden.forEach((s, i) => { tDe[s] = tE[i]; });
  return { escenas: [
  portada("Libro guía · Cap. 6, ej. 8", "Viscosidad de una bebida de chocolate", "2³ con 2 réplicas"),
  enunciado("Libro guía · Cap. 6, ej. 8", `Tres ingredientes que se agregan en pequeñas cantidades podrían resolver la viscosidad. ` +
    `${k("clave1", "Se corre un 2³ con 2 réplicas")} (16 corridas). ${k("clave2", "Se desea minimizar la viscosidad")}.`,
    tabla(["Código", "Réplicas", "Total"], [["(1)", "13,3; 13,9"], ["a", "14,7; 14,4"], ["b", "14,6; 14,9"], ["ab", "14,3; 14,1"], ["c", "16,9; 17,2"], ["ac", "15,5; 15,1"], ["bc", "17,4; 17,1"], ["abc", "18,9; 19,2"]]
      .map((f, i) => f.concat([n(tot[i], 2)])), "pz-chica")),
  { en: "signos", html: kicker("Todos los efectos") + titulo("7 columnas de signos") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col">${sig}</div><div class="pz-col">` +
    formula({ en: "formula" }, "\\text{Efecto}=\\frac{C}{n\\,2^{k-1}}=\\frac{C}{8}") +
    formula({ en: "formula-sc" }, "SC=\\frac{C^2}{n\\,2^k}=\\frac{C^2}{16}") + "</div></div>" +
    `<div class="pz-caja-calc"><span class="pz-etq">contraste de C (ejemplo)</span>${sumaC}</div>` },
  { en: "ef-c", html: kicker("Efectos estimados") + titulo("Cada efecto: contraste / 8 · SC: contraste² / 16") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col">` +
    tabla(["Efecto", "Contraste", "Efecto", "SC"], orden.map((s) => [s, n(ef[s].contraste, 1),
      { v: n(ef[s].efecto, 4), en: A.mas(tDe[s], 1.9), desde: `e${s}` }, { v: n(ef[s].sc, 4), en: A.mas(tDe[s], 2.1) }]), "pz-chica") +
    A.secuencia(orden.map((s) => ({ t: tDe[s], html: A.calc({ partes: [[tDe[s], `\\text{Ef}_{${s}}=\\tfrac{${nt(ef[s].contraste, 1)}}{8}\\quad SC=\\tfrac{${nt(ef[s].contraste, 1)}^2}{16}=${nt(ef[s].sc, 4)}`]], tRes: A.mas(tDe[s], 1.1), res: n(ef[s].efecto, 4), idRes: `e${s}` }) })), "efecto") +
    `</div><div style="height:56cqh">` +
    pareto(orden.map((s) => ({ nombre: s, valor: ef[s].efecto, en: A.mas(tDe[s], 2.1), activo: false })), 3) + "</div></div>" },
  { en: "anova", html: kicker("Tabla ANOVA") + titulo("Cada efecto con 1 gl · F crítico (1, 8) = 5,32") +
    tabla(["Fuente", "SC", "gl", "F₀", "Valor-p"], ["A", "B", "AB", "C", "AC", "BC", "ABC"].map((s) => {
      const act = activos.includes(s);
      return [c(s, "anova", { hl: act ? ["activos", "inactivos"] : ["inactivos", "r2"] }), c(n(ef[s].sc, 3), "anova"), c("1", "anova"), c(`<strong>${n(Fv[s], 2)}</strong>`, "crit", { clase: act ? "pz-ve" : "pz-ro" }), c(pv[s], "crit")];
    }).concat([[c("Error", "anova"), c("0,505", "anova"), c("8", "anova"), "", ""], [c("Total", "anova"), c("49,484", "anova"), c("15", "anova"), "", ""]]), "pz-chica") +
    A.calc({ partes: [["anova@0.5", "SC_E=SC_T-\\sum SC_{\\text{efectos}}="], ["anova@2", "49{,}484-48{,}979"]], tRes: "anova@3.2", res: "0,505", idRes: "sce" }) +
    nota({ en: "r2" }, "Activos: B, AB, C, BC, ABC · R² = 99 %", "ok") },
  { en: "interp", html: kicker("Interpretar y elegir") + titulo("¿Hay un tratamiento ganador?") +
    lista([["interp", "C es el que más mueve la viscosidad (≈ +2,9 al subir); B también la sube"],
      ["interp-int", "Las interacciones activas: esos efectos dependen de los otros ingredientes"],
      ["jerarquia", "A no es significativo, pero se deja en el modelo: <span class=\"pz-am\">jerarquía</span>"]]) +
    nota({ en: "mejor-r" }, "Minimizar ⇒ tratamiento <strong>(1)</strong>: los tres ingredientes en nivel bajo", "ok") +
    formula({ en: "pred" }, "\\hat Y_{(1)}=13{,}644\\quad(\\text{media observada } 13{,}6)") },
  { en: "sup", html: kicker("Residuos y cierre") + titulo("Shapiro–Wilk: p = 0,031") +
    nota({ en: "sup" }, "Se rechaza la normalidad: revisar gráficos de residuos antes de confiar del todo en los valores-p", "mal") +
    lista([["fin", "Tabla de signos → contrastes → efectos"], ["fin", "SC con 1 gl cada una"], ["fin", "Error por diferencia y F contra el mismo crítico"]]) }
] };
};
