"use strict";
const E = require("./_2k");
const { n, nt, $, c, k, kicker, titulo, tabla, formula, nota, p, lista, dosK, portada, enunciado, pareto } = E;
const tot = [9.1, 21.4, 8.9, 21, 6.1, 12.6, 6.8, 11.8], ef = dosK(tot, 3, 3);
const Fv = { A: 53.5, B: 0.02, AB: 0.12, C: 22.15, AC: 6.91, BC: 0.01, ABC: 0.07 }, pv = { A: "&lt; 0,0001", B: "0,888", AB: "0,734", C: "0,0002", AC: "0,0183", BC: "0,920", ABC: "0,795" };
const activos = ["A", "C", "AC"];
module.exports = { escenas: [
  portada("Libro guía · Cap. 6, ej. 10", "Resistencia de bolsas de papel", "2³ con 3 réplicas"),
  enunciado("Libro guía · Cap. 6, ej. 10", `Resistencia al rasgamiento: ${k("clave1", "mayor es mejor")}. ` +
    `${k("clave2", "A = papel, B = humedad, C = dirección del rasguño")}, ${k("clave3", "3 réplicas por combinación")} (24 corridas).`,
    tabla(["Código", "Réplicas", "Total"], [["(1)", "3,8; 3,1; 2,2"], ["a", "6,6; 8; 6,8"], ["b", "3,4; 1,7; 3,8"], ["ab", "6,8; 8,2; 6"], ["c", "2,3; 3,1; 0,7"], ["ac", "4,7; 3,5; 4,4"], ["bc", "2,1; 1,1; 3,6"], ["abc", "4,2; 4,7; 2,9"]]
      .map((f, i) => f.concat([n(tot[i], 2)])), "pz-chica")),
  { en: "formula", html: kicker("Efectos") + titulo("Con n = 3: efecto = C / 12 · SC = C² / 24") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "formula" }, "\\text{Efecto}=\\frac{C}{3\\cdot2^{2}}=\\frac{C}{12}") + formula({ en: "formula-sc" }, "SC=\\frac{C^2}{3\\cdot2^3}=\\frac{C^2}{24}") +
    `<div style="height:34cqh">` + pareto(["A", "C", "AC", "AB", "ABC", "B", "BC"].map((s) => ({ nombre: s, valor: ef[s].efecto,
      en: { A: "ef-a", C: "ef-c", AC: "ef-ac" }[s] || "ef-resto", activo: activos.includes(s) })), 3.2) + "</div></div>" +
    tabla(["Efecto", "Contraste", "Efecto", "SC"], ["A", "C", "AC", "B", "AB", "BC", "ABC"].map((s) => [s, n(ef[s].contraste, 1), n(ef[s].efecto, 4), n(ef[s].sc, 4)]
      .map((v) => c(v, { A: "ef-a", C: "ef-c", AC: "ef-ac" }[s] || "ef-resto"))), "pz-chica") + "</div>" },
  { en: "anova", html: kicker("Tabla ANOVA") + titulo("F crítico (1, 16) = 4,49") +
    tabla(["Fuente", "SC", "gl", "F₀", "Valor-p"], ["A", "B", "AB", "C", "AC", "BC", "ABC"].map((s) => {
      const act = activos.includes(s);
      return [c(s, "anova", { hl: act ? ["activos", "inactivos"] : ["inactivos", "r2"] }), c(n(ef[s].sc, 3), "anova"), c("1", "anova"), c(`<strong>${n(Fv[s], 2)}</strong>`, "crit", { clase: act ? "pz-ve" : "pz-ro" }), c(pv[s], "crit")];
    }).concat([[c("Error", "anova"), c("16,06", "anova"), c("16", "anova"), "", ""], [c("Total", "anova"), c("99,15", "anova"), c("23", "anova"), "", ""]]), "pz-chica") +
    nota({ en: "r2" }, "Activos: papel (A), dirección (C) y AC · R² = 83,8 %", "ok") },
  { en: "modelo", html: kicker("Mejor tratamiento") + titulo("Coeficiente = efecto / 2") +
    formula({ en: "modelo" }, "\\hat Y=4{,}0708+1{,}4958\\,x_A-0{,}9625\\,x_C-0{,}5375\\,x_Ax_C") +
    formula({ en: "mejor-r" }, "x_A=+1,\;x_C=-1:\;\\hat Y=4{,}0708+1{,}4958+0{,}9625+0{,}5375=\\mathbf{7{,}067}") +
    nota({ en: "mejor-r" }, "Maximizar ⇒ tratamiento <strong>a</strong>: papel alto, dirección baja (observado: 7,133)", "ok") +
    nota({ en: "humedad" }, "La humedad (B) no influye ⇒ se fija en el nivel más económico") },
  { en: "sup", html: kicker("Supuestos y cierre") + titulo("Shapiro–Wilk: p = 0,233 ⇒ normalidad ✓") +
    lista([["sup", "Varianza constante: residuos vs. predichos"], ["sup", "Independencia: residuos vs. orden de corrida"]]) +
    nota({ en: "fin" }, "Con interacción activa, el mejor tratamiento sale del modelo completo, mirando los signos de cada término", "ok") }
] };
