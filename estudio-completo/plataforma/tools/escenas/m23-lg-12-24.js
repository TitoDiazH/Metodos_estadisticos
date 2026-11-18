"use strict";
const P = require("./_p4"), { G } = require("../generadores/p4datos"), { k } = P;
const d = G.e24;
module.exports = { escenas: P.rsmEj({ ej: "Libro guía · Cap. 12, ejercicio 24", titulo: "Solubilidad de la harina de amaranto", k: 3, objetivo: "min", datos: d,
  tabla: { x1: d.x1, x2: d.x2, x3: d.x3, y: d.y }, etq: { x1: "x₁ temp.", x2: "x₂ hum.", x3: "x₃ vel.", y: "ISA" },
  enun: `Minimizar el índice de solubilidad (ISA). ${k("clave1", "Temperatura, humedad y velocidad (codificadas)")} · ${k("clave2", "Box-Behnken, 15 corridas")} · ${k("clave3", "modelo de 2.º orden, tipo de superficie y mejor punto en la región")}.`,
  disTitulo: "Box-Behnken (k = 3)", disItems: ["3 niveles por factor: −1, 0, +1", "12 puntos en el medio de las aristas + 3 centros", "Nunca los 3 factores en un extremo a la vez"],
  sigTxt: "x₁² negativo y x₂² positivo: curvan en sentidos opuestos ⇒ anuncia una silla",
  realTxt: "x₃* = −1,65: <strong>fuera</strong> de la región", clasTxt: "sube en una dirección y baja en otra",
  optItems: ["Silla y además fuera ⇒ no sirve", "Mínimo dentro de la región: en la <strong>frontera</strong>", "x = (1; 0; 1): temperatura alta, humedad media, velocidad alta ⇒ ŷ ≈ 10,7"], mejorEn: true,
  fin: ["Box-Behnken: aristas + centro, 3 niveles", "Cuadráticos de signos opuestos ⇒ silla", "Silla o punto fuera ⇒ óptimo en la frontera"] }).escenas };
