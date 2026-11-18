"use strict";
const P = require("./_p4"), { G } = require("../generadores/p4datos"), { k } = P;
const d = G.e27;
module.exports = { escenas: P.rsmEj({ ej: "Libro guía · Cap. 12, ejercicio 27", titulo: "Hojuelas de soya: Box-Behnken", k: 3, objetivo: "min", datos: d,
  tabla: { x1: d.x1, x2: d.x2, x3: d.x3, y: d.y }, etq: { x1: "x₁ T", x2: "x₂ H", x3: "x₃ V", y: "Y" },
  enun: `${k("clave1", "Temperatura 120–170 °C, humedad 25–45 %, velocidad 800–1000 rpm")} · ${k("clave2", "Box-Behnken, 15 corridas")} · ${k("clave3", "minimizar la respuesta")}.`,
  disTitulo: "Box-Behnken (k = 3)", disItems: ["12 aristas + 3 centros", "Tres niveles por factor"],
  codTex: "x_1=\\dfrac{T-145}{25}\\quad x_2=\\dfrac{H-35}{10}\\quad x_3=\\dfrac{V-900}{100}",
  sigTxt: "x₁, x₂, x₂² y la interacción x₁x₂ = −6,8: el efecto de la temperatura depende de la humedad",
  realTxt: "Dentro de la región: ≈ 143 °C, 28 % y 907 rpm", clasTxt: "¿es lo deseado para minimizar? <strong>No</strong>",
  optItems: ["Silla ⇒ no es un mínimo", "Buscar en la frontera", "≈ 170 °C, 33,5 % y 915 rpm; el modelo predice un valor <strong>negativo</strong> (imposible) ⇒ confirmar con corridas"], mejorEn: true,
  fin: ["Con interacción: resolver el sistema completo", "Silla al minimizar ⇒ frontera", "Predicción imposible = alarma: no confiar a ciegas"] }).escenas };
