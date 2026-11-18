"use strict";
const P = require("./_p4"), { G } = require("../generadores/p4datos"), { k } = P;
const d = G.e25, r3 = (v) => Math.round(v * 1000) / 1000;
module.exports = { escenas: P.rsmEj({ ej: "Libro guía · Cap. 12, ejercicio 25", titulo: "Producción de un colorante natural", k: 2, objetivo: "max",
  datos: { y: d.y, x1: d.carbono.map((c) => r3((c - 11) / 2)), x2: d.temp.map((t) => r3((t - 21) / 4)) }, tabla: { carbono: d.carbono, temp: d.temp, y: d.y }, etq: { carbono: "Carbono", temp: "Temp. °C", y: "Producción" },
  enun: `Maximizar la producción. ${k("clave1", "Factores: concentración de carbono y temperatura")} · ${k("clave2", "en unidades reales")} · ${k("clave3", "diseño, modelo de 2.º orden, ajuste y condiciones óptimas")}.`,
  disTitulo: "Central compuesto en unidades reales", disItems: ["Esquinas: carbono 9/13, temperatura 17/25", "Axiales: 8,17/13,8 y 15,34/26,66", "4 centros en (11; 21)"],
  codTex: "x_1=\\dfrac{C-11}{2}\\qquad x_2=\\dfrac{T-21}{4}\\quad(\\text{axiales}=\\pm1{,}414)",
  sigTxt: "T lineal y los dos cuadráticos, negativos ⇒ huele a máximo",
  realTxt: "Carbono = 11 + 2(0,128) = 11,26 · Temperatura = 21 + 4(−0,336) = 19,65 °C", clasTxt: "hessiana definida negativa",
  optItems: ["Máximo y <strong>dentro</strong> de la región ⇒ es el óptimo", "Carbono ≈ 11,3 y temperatura ≈ 19,7 °C, producción ≈ 7 824", "Confirmar con corridas reales"],
  fin: ["Dos cuadráticos negativos + det H &gt; 0 + h₁₁ &lt; 0 ⇒ máximo", "Dentro de la región ⇒ es el óptimo", "Reportar en unidades reales: centro + x·semirrango"] }).escenas };
