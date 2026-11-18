"use strict";
const P = require("./_p4"), { W } = require("../generadores/p4datos"), { k } = P;
module.exports = { escenas: P.regEj({ ej: "Walpole · Ejercicio 12.10", titulo: "Un modelo cúbico", datos: W.e12_10, formula: "y ~ x + I(x^2) + I(x^3)",
  tabla: { x: W.e12_10.x, y: W.e12_10.y }, nuevo: { x: 2 }, sust: { x: "2", "I(x^2)": "2^2", "I(x^3)": "2^3" },
  enun: `7 puntos. ${k("clave1", "Ajuste μ = β₀ + β₁x + β₂x² + β₃x³")} · ${k("clave2", "en R: I(x^2), I(x^3)")} · ${k("clave3", "prediga Y en x = 2")}.`,
  interp: ["Un cúbico sube, baja y vuelve a subir", "Ningún coeficiente es un efecto por sí solo", "b₀ = 1,07: x = 0 sí está en el rango"],
  polinomio: { col: "x", etqX: "x", etqY: "y", x0: [1, 5], derivTex: "\\frac{\\partial\\hat y}{\\partial x}=4{,}60-3{,}69x+0{,}583x^2" },
  pruebas: [["x", "significativo"], ["I(x^2)", "significativo"], ["I(x^3)", "<strong>el término cúbico es necesario</strong>"]], fTxt: "con solo 3 gl de error el F no alcanza",
  notaProb: "Último dato: Cook = 6,9 ⇒ <strong>muy influyente</strong> (con 7 puntos, el borde decide la curva)", predTxt: "x = 2",
  fin: ["Cada t significativo pero F no: 3 gl de error ⇒ crítico enorme", "Derivada = 0 en x ≈ 1,7 (máx) y 4,6 (mín)", "Pocos datos + grado alto ⇒ un punto muy influyente e intervalos anchos"] }).escenas };
