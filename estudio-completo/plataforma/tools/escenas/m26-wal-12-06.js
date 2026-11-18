"use strict";
const P = require("./_p4"), { W } = require("../generadores/p4datos"), { k } = P;
module.exports = { escenas: P.regEj({ ej: "Walpole · Ejercicio 12.6", titulo: "Distancia de frenado: el primer polinomio", datos: W.e12_6, formula: "d ~ v + I(v^2)", yTex: "d",
  tabla: { v: W.e12_6.v, d: W.e12_6.d }, etq: { v: "v (km/h)", d: "d (m)" }, nomR: { "I(v^2)": "I(v^2)" },
  nuevo: { v: 70 }, sust: { v: "70", "I(v^2)": "70^2" },
  enun: `${k("clave1", "Respuesta: distancia de frenado d (m)")} · ${k("clave2", "modelo cuadrático μ = β₀ + β₁v + β₂v²")} · ${k("clave3", "estime d a 70 km/h")}.`,
  interp: ["b₁ = −0,339 <strong class=\"pz-ro\">no</strong> es «el efecto de la velocidad»", "El efecto depende de a qué velocidad vas ⇒ <strong>derivada</strong>", "b₀: v = 0 fuera del rango ⇒ no se interpreta"],
  polinomio: { col: "v", y: "d", etqX: "v (km/h)", etqY: "d (m)", x0: [50, 100], vert: null, derivTex: "\\frac{\\partial\\hat d}{\\partial v}=b_1+2b_2v=-0{,}339+0{,}0237\\,v" },
  pruebas: [["v", "término lineal significativo"], ["I(v^2)", "<strong>hay curvatura</strong>: la distancia crece más que proporcional"]], fTxt: "el modelo explica la distancia",
  notaProb: "Polinomio: v y v² correlacionados por construcción ⇒ el VIF no se usa · v = 110 influyente (Cook 2,4)",
  predTxt: "v = 70 km/h (dentro del rango 35–110)",
  fin: ["En un polinomio el efecto es la derivada: b₁ + 2b₂x", "b₂ > 0: la curva se acelera (a 50 km/h: 0,84 m; a 100: 2,03 m por km/h)", "Vértice: −b₁/(2b₂) = 14 km/h, fuera del rango", "Predecir dentro del rango; nunca extrapolar un polinomio"] }).escenas };
