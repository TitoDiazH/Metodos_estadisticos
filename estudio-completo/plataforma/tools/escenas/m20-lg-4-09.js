"use strict";
const { dbcaEj, k } = require("./_ej");
module.exports = (ctx) => ({ escenas: dbcaEj({
  ej: "Libro guía · Cap. 4, ej. 9", titulo: "Bloques con tres tratamientos",
  Y: [[3, 4, 2, 6], [7, 9, 3, 10], [4, 6, 3, 7]], trat: ["A", "B", "C"], bloq: ["Bloque 1", "Bloque 2", "Bloque 3", "Bloque 4"],
  nomTrat: "tratamiento", NomTrat: "Tratamiento", nomBloque: "bloque", NomBloque: "Bloque", sctrDiv: true,
  enun: `Datos de un ${k("clave1", "diseño en bloques al azar")} (3 tratamientos, 4 bloques). ${k("clave3", "Use α = 0,05")}.<br><br>` +
    `${k("clave2", "a) Totales · b) Sumas de cuadrados · c) Tabla ANOVA y conclusiones · d) LSD")}`,
  crit: { t: 5.14, b: 4.76 }, p: { t: "0,0058", b: "0,0032" },
  lsd: { t: 2.447, valor: 1.657, pares: [["A − B", "3,5", true], ["A − C", "1,25", false], ["B − C", "2,25", true]],
    mejor: "Si mayor es mejor (el enunciado no lo dice): <strong>B</strong> supera a A y a C" },
  r: `modelo &lt;- aov(y ~ trat + bloque)   # ambos como factor
summary(modelo)
agricolae::LSD.test(modelo, "trat")$groups`,
  cierre: "Totales → corrección → SC (con el divisor correcto) → error por diferencia → tabla → LSD"
}, ctx) });
