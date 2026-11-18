"use strict";
const P = require("./_p4"), { G } = require("../generadores/p4datos"), { k } = P;
const e = G.e26, W1 = e.d2.W1.concat(e.d3.W1), W2 = e.d2.W2.concat(e.d3.W2), y = e.d2.y.concat(e.d3.y);
module.exports = { escenas: P.rsmEj({ ej: "Libro guía · Cap. 12, ejercicio 26", titulo: "Rendimiento: experimentación secuencial", k: 2, objetivo: "max",
  datos: { y, x1: e.d2.x1.concat(e.d3.x1), x2: e.d2.x2.concat(e.d3.x2) }, tabla: { W1, W2, y }, etq: { W1: "W₁ (min)", W2: "W₂ (°C)", y: "Rendimiento" },
  enun: `Maximizar el rendimiento. ${k("clave1", "Exploración en (75; 130) y máximo ascenso hasta (90; 145)")} · ${k("clave2", "2² + 2 centros ahí")} · ${k("clave3", "+ axiales ⇒ central compuesto (12 corridas)")}.`,
  disTitulo: "Central compuesto final", disItems: ["4 esquinas: 80/100 min × 140/150 °C", "4 axiales a ±1,41", "4 centros en (90; 145)", "Cerca del óptimo un plano ya no basta"],
  codTex: "x_1=\\dfrac{W_1-90}{10}\\qquad x_2=\\dfrac{W_2-145}{5}",
  sigTxt: "los dos cuadráticos y la interacción", realTxt: "x<sub>s</sub> = (−3,66; 2,93): <strong>fuera</strong> de la región", clasTxt: "un λ ≈ 0: cresta alargada (cordillera)",
  optItems: ["Máximo, pero fuera ⇒ no se extrapola", "Mejor punto en la frontera: x₁ = −1, x₂ ≈ 0,85", "≈ 80 min y 149 °C, ŷ ≈ 88,8 · la cresta sigue subiendo ⇒ nuevo experimento en esa dirección"], mejorEn: true,
  fin: ["Primer orden + máximo ascenso para acercarse", "Curvatura ⇒ central compuesto y 2.º orden", "λ ≈ 0 ⇒ cordillera: muchas combinaciones casi igual de buenas"] }).escenas };
