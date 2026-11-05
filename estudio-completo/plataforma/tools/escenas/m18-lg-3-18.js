"use strict";
const { anovaEj, k } = require("./_anova");
module.exports = { escenas: anovaEj({
  ej: "Libro guía · Cap. 3, ej. 18", titulo: "Clonas de agave: el empate", nomTrat: "Clona", nomFactor: "clona", NomFactor: "Clona",
  trat: ["Clona 1", "Clona 2", "Clona 3", "Clona 4"], Y: [[8.69, 6.68, 6.83, 6.43, 10.30], [8.00, 16.41, 12.43, 10.99, 15.53], [17.39, 13.73, 15.62, 17.05, 15.42], [10.37, 9.16, 8.13, 4.40, 10.38]],
  enun: `Cuatro clonas de agave bajo el mismo manejo; se mide el % de azúcares reductores. ${k("clave1", "5 plantas por clona")}. ` +
    `${k("clave2", "¿Qué clona responde mejor? (más es mejor)")} ${k("clave3", "Si hay un empate estadístico, ¿qué propondría para desempatar?")}`,
  crit: 3.24, pv: "0,0002", tc: 2.12, concTxt: "las clonas no responden igual",
  pares: [[2, 0, "pares"], [2, 3, "pares"], [2, 1, "empate"], [1, 3, "pares"], [1, 0, "pares"], [3, 0, "pares"]], lsdTitulo: "¿Hay una clona mejor?",
  notasLSD: [["empate-r", "Clona 3 vs. 2: 3,17 &lt; 3,20 ⇒ <strong>empate estadístico</strong>", "mal"], ["desempate", "Desempatar: más réplicas de esas dos, o costo, rendimiento en campo y variabilidad", "ok"]],
  sup: [["Shapiro–Wilk", "0,799", "sup"], ["Bartlett", "0,354", "sup"]],
  cierre: "La media más alta no es automáticamente la mejor: siempre mirar la LSD"
}) };
