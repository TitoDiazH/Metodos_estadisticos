"use strict";
const P = require("./_p4"), { W } = require("../generadores/p4datos"), { k } = P;
module.exports = { escenas: P.regEj({ ej: "Walpole · Ejercicio 12.5", titulo: "Consumo de energía de una planta química", datos: W.e12_5, formula: "y ~ x1 + x2 + x3 + x4", vif: true,
  nuevo: { x1: 75, x2: 24, x3: 90, x4: 98 }, sust: { x1: "75", x2: "24", x3: "90", x4: "98" },
  enun: `12 meses. ${k("clave1", "Respuesta: consumo de energía y")} · ${k("clave2", "temperatura x₁, días x₂, pureza x₃, toneladas x₄")}. ${k("clave3", "Prediga para x = (75; 24; 90; 98)")}.`,
  interp: ["+1 °F ⇒ +0,61 de consumo (todo lo demás fijo)", "+1 día ⇒ +8,9", "+1 punto de pureza ⇒ +1,4", "+1 tonelada ⇒ +0,01", "b₀: todo en 0 ⇒ no se interpreta"],
  pruebas: [["x1", "no significativa"], ["x2", "no significativa"], ["x3", "no significativa"], ["x4", "no significativa"]], fTxt: "el modelo en conjunto explica el consumo",
  notaProb: "VIF bajos: no es multicolinealidad, son <strong>pocos datos (12) para 5 parámetros</strong>", predTxt: "x₁ = 75 °F · x₂ = 24 días · x₃ = 90 % · x₄ = 98 t", predNota: "Coincide con el libro: 287,6 (intervalo ancho por los pocos datos)",
  fin: ["F significativo y ningún t significativo: posible", "Revisar VIF: aquí no es multicolinealidad, es n pequeño", "R² 0,74 → ajustado 0,60: sobran parámetros ⇒ modelo más simple"] }).escenas };
