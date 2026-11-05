"use strict";
const { anovaEj, k } = require("./_anova");
module.exports = { escenas: anovaEj({
  ej: "Libro guía · Cap. 3, ej. 15", titulo: "Almidón y dureza de tabletas", nomTrat: "% almidón", nomFactor: "% de almidón", NomFactor: "Almidón",
  trat: ["2 %", "5 %", "10 %"], Y: [[4.3, 5.2, 4.8, 4.5], [6.5, 7.3, 6.9, 6.1], [9.0, 7.8, 8.5, 8.1]],
  enun: `Una farmacéutica evalúa si la cantidad de almidón influye en la dureza de las tabletas: ${k("clave1", "2 %, 5 % y 10 % de almidón")}, ` +
    `${k("clave2", "4 réplicas por nivel")}. ${k("clave3", "Si se desea maximizar la dureza, ¿qué recomendaría?")}`,
  crit: 4.26, pv: "&lt; 0,0001", tc: 2.262, concTxt: "el almidón influye en la dureza",
  pares: [[0, 1], [0, 2], [1, 2]], lsdTitulo: "¿Qué nivel conviene?",
  notasLSD: [["mejor", "Los tres difieren ⇒ máxima dureza con <strong>10 %</strong>", "ok"], ["ojo", "Si 5 % y 10 % no difirieran, convendría el 5 % (menos almidón)", ""]],
  sup: [["Shapiro–Wilk", "0,430", "sup-sw"], ["Bartlett", "0,881", "sup-var"], ["Levene", "0,772", "sup-var"]],
  cierre: "Modelo e hipótesis → totales → SC → tabla → decisión → LSD → supuestos"
}) };
