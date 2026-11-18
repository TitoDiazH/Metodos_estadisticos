"use strict";
const P = require("./_p4"), { W } = require("../generadores/p4datos"), { k } = P;
const d = W.e12_11;
module.exports = { escenas: P.regEj({ ej: "Walpole · Ejercicio 12.11", titulo: "Calamares y multicolinealidad", datos: d, formula: "y ~ x1 + x2 + x3 + x4 + x5", vif: true,
  tabla: { y: d.y, x1: d.x1, x2: d.x2, x5: d.x5 }, etq: { y: "peso", x1: "x₁", x2: "x₂", x5: "x₅" },
  enun: `22 calamares. ${k("clave1", "Respuesta: peso (lb)")} · ${k("clave2", "5 medidas de la boca (x₁…x₅, pulgadas)")} · ${k("clave3", "ajuste el modelo con las cinco")}. (En la tabla se muestran y, x₁, x₂ y x₅.)`,
  interp: ["Cada b: cambio de peso por pulgada de esa medida, con las otras 4 fijas", "b₂ = −3,66: ¿aleta más larga ⇒ menos peso? <span class=\"pz-ro\">signo raro</span>", "¿Existe un calamar con la aleta más larga y todo lo demás igual? Casi no"],
  pruebas: [["x1", "no significativa"], ["x2", "no significativa"], ["x3", "no significativa"], ["x4", "no significativa"], ["x5", "el ancho sí influye"]], fTxt: "el modelo explica el peso",
  notaProb: "VIF entre 22 y 34: <strong>multicolinealidad severa</strong> ⇒ ee inflados (×√34 ≈ 6), t chicos, signos poco confiables",
  fin: ["F enorme + t chicos ⇒ sospechar multicolinealidad", "VIF &gt; 10: no interpretar coeficientes individuales", "Quedarse con menos variables (variante: aleta y ancho)"] }).escenas };
