"use strict";
const P = require("./_p4"), { W } = require("../generadores/p4datos"), { k } = P;
module.exports = { escenas: P.regEj({ ej: "Walpole · Ejercicio 12.3", titulo: "Calificación en química", datos: W.e12_3, formula: "y ~ x1 + x2", vif: true, nuevo: { x1: 60, x2: 4 }, sust: { x1: "60", x2: "4" },
  enun: `12 estudiantes. ${k("clave1", "Respuesta: nota de química y")} · ${k("clave2", "examen de inteligencia x₁ y clases perdidas x₂")}. ${k("clave3", "Estime la nota con examen 60 y 4 clases perdidas")}.`,
  interp: ["b₁ = 0,92: +1 punto en el examen ⇒ +0,92 en química (clases fijas)", "b₂ = 0,28: ¿perder clases sube la nota? <span class=\"pz-ro\">signo raro</span>… ver la prueba t", "b₀ = 27,5: examen 0 está fuera del rango (50–70) ⇒ no se interpreta"],
  pruebas: [["x1", "el examen explica la nota de química"], ["x2", "no hay evidencia de efecto de las clases perdidas ⇒ el signo raro no se interpreta"]], fTxt: "el modelo sirve",
  predTxt: "Examen = 60 · clases perdidas = 4 (dentro del rango de los datos)", predNota: "Coincide con el libro: ŷ ≈ 84",
  fin: ["Signo raro en un coeficiente no significativo: no se interpreta", "R² ajustado castiga el regresor que no aporta (0,75 → 0,69)", "Intervalo de predicción más ancho que el de la media"] }).escenas };
