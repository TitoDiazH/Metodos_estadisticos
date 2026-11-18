"use strict";
const P = require("./_p4"), { G } = require("../generadores/p4datos"), { k } = P;
const d = G.e23;
module.exports = { escenas: P.rsmEj({ ej: "Libro guía · Cap. 12, ejercicio 23", titulo: "Tiempo de filtración: el punto estacionario a mano", sub: "Primer modelo de 2.º orden · procedimiento explicado", k: 2, objetivo: "min",
  datos: d, tabla: { x1: d.x1, x2: d.x2, y: d.y }, etq: { x1: "x₁ temp.", x2: "x₂ presión", y: "Y tiempo" },
  enun: `${k("clave1", "Temperatura x₁ y presión x₂ (codificadas)")} · ${k("clave2", "13 corridas")} · ${k("clave3", "diseño, modelo de 2.º orden, tipo de superficie y mejor punto (minimizar el tiempo)")}.`,
  disTitulo: "Central compuesto rotable (k = 2)", disItems: ["4 esquinas del 2² (±1, ±1)", "4 axiales a α = ⁴√4 = 1,414 (rotable)", "5 réplicas del centro ⇒ error puro", "5 niveles por factor ⇒ se estima curvatura"],
  sigTxt: "la interacción", explicaDeriv: "d/dx₁ de 3,71x₁² es 2·3,71x₁ = 7,43x₁ · d/dx₁ de 6x₁x₂ es 6x₂",
  clasTxt: "un λ ≈ 0: valle muy alargado (casi una canaleta)", realTxt: "x<sub>s</sub> = (32,7; −40,1): <strong>muy fuera</strong> de la región (±1,414)",
  optItems: ["Mínimo, pero fuera de la región ⇒ no se recomienda (sería extrapolar)", "El óptimo está en la <strong>frontera</strong>", "Mejor punto en la región: x₁ = 1, x₂ = −1 (temp. alta, presión baja), ŷ ≈ 37,9"], mejorEn: true,
  fin: ["Derivar → igualar a 0 → resolver (x_s = −½B⁻¹b)", "Clasificar: det H y h₁₁, o los valores propios de B", "¿Dentro de la región? ¿Del tipo buscado? Si no ⇒ frontera", "Aquí el modelo además es débil (F no significativo, falta de ajuste)"] }).escenas };
