"use strict";
const { n, $, c, k, kicker, titulo, tabla, formula, nota, p, lista, portada, enunciado } = require("./_ej");
const sd = [1.25, 0.98, 0.90, 0.80], lam = sd.map((s) => s * s), tot = lam.reduce((a, b) => a + b, 0), ac = lam.map((_, i) => lam.slice(0, i + 1).reduce((a, b) => a + b, 0) / tot);
const vars = ["Frecuencia", "Gasto", "Categorías", "Cupones"];
const rot = [[0.621, -0.281, -0.041, -0.731], [0.452, 0.541, -0.612, 0.359], [0.538, -0.474, 0.372, 0.592], [-0.349, -0.637, -0.696, 0.021]];
module.exports = { escenas: [
  portada("Prueba 1 (2026-20) · Pregunta 3.1", "Componentes principales en retail", "Pregunta adicional de P4 · se promedia con P1"),
  enunciado("Prueba 1 (2026-20) · Pregunta 3.1", `50 clientes, 4 variables: frecuencia, gasto, categorías y cupones. ${k("clave1", "summary(pca): desviaciones estándar")} y ` +
    `${k("clave2", "pca&#36;rotation: loadings")}. ${k("clave3", "Variables estandarizadas")}.`,
    tabla(["", "PC1", "PC2", "PC3", "PC4"], [[{ v: "Std. dev.", th: true }].concat(sd.map((s) => n(s, 2)))].concat(vars.map((v, i) => [{ v, th: true }].concat(rot[i].map((x) => n(x, 3))))), "pz-chica")),
  { en: "autovalor", html: kicker("¿Cuántos componentes?") + titulo("Autovalor = desviación estándar²") +
    tabla(["", "PC1", "PC2", "PC3", "PC4"], [
      [{ v: "sd", th: true }].concat(sd.map((s) => n(s, 2))),
      [{ v: "λ = sd²", th: true }].concat(lam.map((l, i) => c(n(l, 4), "lam", { hl: i === 0 ? ["kaiser", "prop"] : null, clase: l > 1 ? "pz-ve" : "" }))),
      [{ v: "% acumulado", th: true }].concat(ac.map((a, i) => c(n(a * 100, 1) + " %", "acum", { hl: i === 2 ? ["k80", "nocoinciden"] : null })))
    ]) +
    `<div class="pz-cols">` + nota({ en: "kaiser-r" }, "Kaiser (λ &gt; 1): <strong>1 componente</strong>", "ok") +
    nota({ en: "k80" }, "≥ 80 % acumulado: <strong>3 componentes</strong>", "ok") + "</div>" +
    p({ en: "prop", clase: "pz-tenue" }, `Total = ${n(tot, 4)} · % = λ / total`) + nota({ en: "nocoinciden" }, "Los criterios no coinciden: se aplican ambos y se justifica") },
  { en: "pc1", html: kicker("Expresión e interpretación") + titulo("PC1 con variables estandarizadas") +
    formula({ en: "pc1-f" }, "PC_1=0{,}621\\,Z_{\\text{Frec}}+0{,}452\\,Z_{\\text{Gasto}}+0{,}538\\,Z_{\\text{Categ}}-0{,}349\\,Z_{\\text{Cupones}}") +
    nota({ en: "zeta" }, `Con ${$("Z=(X-\\bar X)/s")}, no con las variables originales`) +
    tabla(["Variable", "Loading PC1", "Signo"], vars.map((v, i) => [c(v, i < 3 ? "interp-pos" : "interp-neg"), c(n(rot[i][0], 3), i < 3 ? "interp-pos" : "interp-neg"), c(i < 3 ? "+" : "−", i < 3 ? "interp-pos" : "interp-neg", { clase: i < 3 ? "pz-ve" : "pz-ro" })]), "pz-chica") +
    nota({ en: "interp-r" }, "PC1 = índice de <strong>intensidad de compra</strong>: alto si compra seguido, gasta más y lleva más categorías; bajo si usa más cupones", "ok") },
  { en: "nuevo", html: kicker("El cliente nuevo") + titulo("¿Se reemplaza directo en la fórmula?") +
    p({ en: "nuevo" }, "Frecuencia = 10 · Gasto = 58 000 · Categorías = 5 · Cupones = 3") +
    nota({ en: "nuevo-r" }, "<strong>No</strong>: la fórmula usa variables estandarizadas", "mal") +
    formula({ en: "nuevo-z" }, "Z_j=\\frac{X_j-\\bar X_j}{s_j}\\quad\\Rightarrow\\quad PC_1=\\sum_j a_{j1}\\,Z_j") +
    nota({ en: "nuevo-falta" }, "Sin las medias y desviaciones de la muestra, el score no se puede calcular: se explica el procedimiento") +
    lista([["fin", "sd² = autovalor · Kaiser y 80 % · PC1 con Z · interpretar por signos · estandarizar antes del score"]]) }
] };
