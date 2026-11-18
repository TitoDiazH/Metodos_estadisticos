"use strict";
const P = require("./_p4"), { W } = require("../generadores/p4datos"), { k } = P;
module.exports = { escenas: P.regEj({ ej: "Walpole · Ejercicio 12.7", titulo: "Flujo sanguíneo cerebral", datos: W.e12_7, formula: "y ~ x + I(x^2)",
  enun: `15 pacientes. ${k("clave1", "Respuesta: flujo sanguíneo y")} · ${k("clave2", "tensión arterial del oxígeno x (mm Hg)")} · ${k("clave3", "modelo cuadrático")}.`,
  interp: ["b₁ < 0 y b₂ > 0", "b₂ > 0 ⇒ parábola hacia arriba: tiene un <strong>mínimo</strong>", "b₀ = 141,6: x = 0 fuera del rango"],
  polinomio: { col: "x", etqX: "tensión x", etqY: "flujo y", x0: [400, 550], vert: 456, vertTxt: "mínimo ≈ 456", derivTex: "\\frac{\\partial\\hat y}{\\partial x}=-0{,}282+0{,}00062\\,x" },
  pruebas: [["x", "término lineal significativo"], ["I(x^2)", "<strong>hay curvatura</strong>"]], fTxt: "el modelo explica parte del flujo",
  notaProb: "Paciente 14 (tensión más baja) con alto apalancamiento; ningún Cook &gt; 1",
  fin: ["Significativo ≠ buen ajuste: R² = 0,43", "Derivada negativa antes de 456 y positiva después: mínimo interior", "Coincide con el libro: 141,6 − 0,2819x + 0,0003x²"] }).escenas };
