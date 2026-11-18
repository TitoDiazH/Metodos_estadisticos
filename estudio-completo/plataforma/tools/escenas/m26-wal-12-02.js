"use strict";
const P = require("./_p4"), { W } = require("../generadores/p4datos"), { k } = P;
module.exports = { escenas: P.regEj({ ej: "Walpole · Ejercicio 12.2", titulo: "Densidad óptica de un lubricante", datos: W.e12_2, formula: "y ~ x1 + x2", vif: true,
  enun: `${k("clave1", "Respuesta: densidad óptica y")} · ${k("clave2", "regresores: frecuencia de banda x₁ y espesor de película x₂ (mm)")}. ${k("clave3", "4 frecuencias × 3 espesores: diseño cruzado")}.`,
  interp: ["b₁ = 0,0036: +1 de frecuencia ⇒ +0,0036 de densidad (espesor fijo); en el rango 740–1235 son ≈ +1,8", "b₂ = 0,95: +1 mm de espesor ⇒ +0,95 (frecuencia fija)", "b₀ = −3,37: fuera del rango y negativo ⇒ no se interpreta"],
  pruebas: [["x1", "la frecuencia influye"], ["x2", "el espesor influye"]], fTxt: "el modelo explica la densidad óptica",
  notaProb: "VIF = 1: diseño cruzado, sin correlación entre x₁ y x₂ · el dato 10 (1235; 1,10) es <strong>influyente</strong>",
  fin: ["Modelo significativo; frecuencia y espesor influyen", "VIF = 1 porque el diseño es cruzado", "Dato 10 influyente y residuos que crecen: el plano no lo capta todo"] }).escenas };
