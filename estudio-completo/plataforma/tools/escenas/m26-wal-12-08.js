"use strict";
const P = require("./_p4"), { W } = require("../generadores/p4datos"), { k } = P;
module.exports = { escenas: P.regEj({ ej: "Walpole · Ejercicio 12.8", titulo: "Resistencia de una aleación: falta de ajuste", datos: W.e12_8, formula: "y ~ x + I(x^2)", lof: "x",
  tabla: { x: W.e12_8.x, y: W.e12_8.y }, etq: { x: "concentración", y: "resistencia" },
  enun: `${k("clave1", "Respuesta: resistencia a la compresión")} · 5 concentraciones con ${k("clave2", "3 réplicas cada una")} · ${k("clave3", "modelo cuadrático y prueba de falta de ajuste")}.`,
  interp: ["b₂ < 0 ⇒ parábola hacia abajo: tiene un <strong>máximo</strong>", "La resistencia sube con el aditivo, cada vez menos", "b₀: concentración 0 fuera del rango"],
  polinomio: { col: "x", etqX: "concentración", etqY: "resistencia", x0: [15, 25], vert: 24.74, vertTxt: "máximo ≈ 24,7", derivTex: "\\frac{\\partial\\hat y}{\\partial x}=1{,}009-0{,}0408\\,x" },
  pruebas: [["x", "término lineal significativo"], ["I(x^2)", "<strong>hay curvatura</strong>"]], fTxt: "el modelo sirve",
  fin: ["La falta de ajuste necesita réplicas", "SCE = error puro + falta de ajuste", "F_FA = 0,02 (p = 0,98): el cuadrático describe bien la forma", "R² modesto porque casi todo el error es entre réplicas"] }).escenas };
