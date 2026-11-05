"use strict";
const { dbcaEj, k, kicker, titulo, nota, tabla, c, p } = require("./_ej");
module.exports = (ctx) => ({ escenas: dbcaEj({
  ej: "Libro guía · Cap. 4, ej. 10", titulo: "Atomizadores y el efecto del día",
  Y: [[72, 65, 67, 75, 62, 73], [55, 59, 68, 70, 53, 50], [64, 74, 61, 58, 51, 69]], trat: ["Marca 1", "Marca 2", "Marca 3"],
  bloq: ["D1", "D2", "D3", "D4", "D5", "D6"], datosChica: true,
  nomTrat: "marca", NomTrat: "Marca", nomBloque: "día", NomBloque: "Día",
  enun: `3 marcas de atomizador; cada una se aplica a 100 moscas y se registra el % de moscas muertas. ` +
    `${k("clave1", "Se hicieron 6 réplicas en días diferentes, por lo que se sospecha un efecto del día")}. ` +
    `${k("clave2", "⇒ el día es el bloque")}. ${k("clave3", "Objetivo: matar más moscas (mayor es mejor)")}.`,
  crit: { t: 4.10, b: 3.33 }, p: { t: "0,1028", b: "0,4207" },
  lsd: { t: 2.228, valor: 9.226, pares: [["1 − 2", "9,83", true], ["1 − 3", "6,17", false], ["2 − 3", "3,67", false]],
    mejor: "⚠ El ANOVA <strong>no</strong> rechazó: no se puede declarar un atomizador mejor. La LSD solo se mira tras un ANOVA significativo.", mejorTipo: "mal" },
  lsdTitulo: "¿Hay un atomizador mejor?",
  extras: [{ en: "sup", html: kicker("Supuestos") + titulo("Normalidad y varianza constante") +
    tabla(["Supuesto", "Prueba", "Valor-p", "Conclusión"], [
      [c("Normalidad de residuos", "sup-sw"), c("Shapiro–Wilk", "sup-sw"), c("0,554", "sup-sw"), c("Se cumple", "sup-sw", { clase: "pz-ve" })],
      [c("Igual varianza entre marcas", "sup-lev"), c("Levene", "sup-lev"), c("0,600", "sup-lev"), c("Se cumple", "sup-lev", { clase: "pz-ve" })]
    ]) + p({ en: "sup-sw", clase: "pz-tenue" }, "Gráficamente: QQ-plot de residuos y residuos vs. predichos sin forma de embudo") }],
  cierre: "Identificar el bloque en el enunciado, y no buscar «el mejor» si el ANOVA no detectó diferencias"
}, ctx) });
