"use strict";
const P = require("./_p4"), { W } = require("../generadores/p4datos"), { k } = P;
module.exports = { escenas: P.regEj({ ej: "Walpole · Ejercicio 12.4", titulo: "Peso final de un animal", datos: W.e12_4, formula: "y ~ x1 + x2", vif: true, nuevo: { x1: 35, x2: 250 }, sust: { x1: "35", x2: "250" },
  enun: `10 animales. ${k("clave1", "Respuesta: peso final y (kg)")} · ${k("clave2", "peso inicial x₁ y alimento x₂ (kg)")}. ${k("clave3", "Prediga para 35 kg iniciales y 250 kg de alimento")}.`,
  interp: ["b₁ = 1,40: +1 kg inicial ⇒ +1,4 kg final (alimento fijo)", "b₂ = 0,22: +1 kg de alimento ⇒ +0,22 kg final (peso inicial fijo)", "b₀ = −23: peso 0 y sin comer ⇒ sin sentido físico"],
  pruebas: [["x1", "el peso inicial influye"], ["x2", "el alimento influye"]], alfa: ["x1", 1, "compatible con 1 kg final por kg inicial"], fTxt: "el modelo sirve",
  predTxt: "Peso inicial = 35 kg · alimento = 250 kg", notaProb: "Animal 7: Cook ≈ 0,9, cerca de 1 (pesó solo 50 kg): conviene revisarlo",
  fin: ["H₀: β = α ≠ 0 se calcula a mano: t = (b − α)/ee", "Ambos regresores significativos; R² = 0,87", "Predicción 80,3 kg; un animal individual: 64,5 a 96 kg"] }).escenas };
