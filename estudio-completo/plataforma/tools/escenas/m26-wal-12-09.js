"use strict";
const P = require("./_p4"), { W } = require("../generadores/p4datos"), { k } = P;
module.exports = { escenas: P.regEj({ ej: "Walpole · Ejercicio 12.9", titulo: "Producto de una reacción", datos: W.e12_9, formula: "y ~ x + I(x^2)",
  tabla: { x: W.e12_9.x, y: W.e12_9.y }, etq: { x: "temperatura (°C)", y: "producto (%)" }, nuevo: { x: 225 }, sust: { x: "225", "I(x^2)": "225^2" },
  enun: `Datos del ejemplo 11.8. ${k("clave1", "Respuesta: producto (%)")} · ${k("clave2", "modelo cuadrático en la temperatura")} · ${k("clave3", "estime a 225 °C")}.`,
  interp: ["b₂ &lt; 0 pero diminuto", "Mirar la derivada antes de concluir", "b₀: 0 °C fuera del rango"],
  polinomio: { col: "x", etqX: "temperatura", etqY: "producto", x0: [200, 275], derivTex: "\\frac{\\partial\\hat y}{\\partial x}=0{,}1525-0{,}00016\\,x" },
  pruebas: [["x", "término lineal significativo"], ["I(x^2)", "<strong>sin evidencia de curvatura</strong>: bastaría la recta"]], fTxt: "el modelo explica el producto",
  predTxt: "x = 225 °C", predNota: "Coincide con el libro: 86,7 %",
  fin: ["Cuadrático no significativo + derivada casi constante ⇒ la recta basta", "Predicción dentro del rango: confiable"] }).escenas };
