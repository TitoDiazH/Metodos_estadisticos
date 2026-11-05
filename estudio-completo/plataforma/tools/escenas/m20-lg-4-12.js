"use strict";
const { dbcaEj, k } = require("./_ej");
module.exports = { escenas: dbcaEj({
  ej: "Libro guía · Cap. 4, ej. 12", titulo: "Detergentes y lavadoras",
  Y: [[45, 43, 51], [47, 44, 52], [50, 49, 57], [42, 37, 49]], trat: ["A", "B", "C", "D"], bloq: ["Lavadora 1", "Lavadora 2", "Lavadora 3"],
  nomTrat: "detergente", NomTrat: "Detergente", nomBloque: "lavadora", NomBloque: "Lavadora", disR: true,
  disTitulo: "¿Qué diseño es?",
  enun: `Rendimiento de 4 detergentes: lecturas de blancura de 12 cargas de lavado, distribuidas en 3 modelos de lavadoras. ` +
    `${k("clave1", "a) Señale el nombre del diseño")}. ${k("clave2", "Cada lavadora lava una carga con cada detergente")}. ` +
    `${k("clave3", "Mayor blancura es mejor")}.`,
  crit: { t: 4.76, b: 5.14 }, p: { t: "0,0004", b: "&lt; 0,0001" },
  lsd: { t: 2.447, valor: 2.283, pares: [["A − B", "1,33", false], ["A − C", "5,67", true], ["A − D", "3,67", true], ["B − C", "4,33", true], ["B − D", "5,00", true], ["C − D", "9,33", true]],
    mejor: "Mayor blancura es mejor ⇒ <strong>C</strong> es significativamente superior a todos; D es el peor" },
  r: `modelo &lt;- aov(blancura ~ detergente + lavadora)
summary(modelo)
agricolae::LSD.test(modelo, "detergente")$groups`,
  cierre: "El bloque (lavadora) se llevó más variabilidad que el propio tratamiento: sin bloquear, el error habría sido enorme"
}) };
