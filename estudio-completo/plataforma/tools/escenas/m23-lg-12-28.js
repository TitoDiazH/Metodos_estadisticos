"use strict";
const P = require("./_p4"), { G } = require("../generadores/p4datos"), { k } = P;
const e = G.e28, rp = (a) => a.flatMap((v) => [v, v]);
const datos = { y: e.fact.y.concat(e.ax.y).flat(), x1: rp(e.fact.T).concat(rp(e.ax.T)), x2: rp(e.fact.P).concat(rp(e.ax.P)), x3: rp(e.fact.F).concat(rp(e.ax.F)) };
const Y = e.fact.y.concat(e.ax.y);
module.exports = { escenas: P.rsmEj({ ej: "Libro guía · Cap. 12, ejercicio 28", titulo: "Fuerza de arrastre de una soldadura", k: 3, objetivo: "max", datos,
  tabla: { T: e.fact.T.concat(e.ax.T), P: e.fact.P.concat(e.ax.P), F: e.fact.F.concat(e.ax.F), y: Y.map((p) => p.join(" / ")) }, etq: { T: "x₁ T", P: "x₂ P", F: "x₃ F", y: "Réplicas" },
  enun: `Maximizar la fuerza de arrastre. ${k("clave1", "Tiempo, potencia y fuerza")} · ${k("clave2", "2³ + centro (2 réplicas) y luego axiales a ±1,28")} · ${k("clave3", "32 corridas")} (en el libro «80» es 800 g).`,
  disTitulo: "Central compuesto ortogonal", disItems: ["2³ + centro: error puro y detectar curvatura", "+ 6 axiales a ±1,28 (no rotable: el equipo no permite ±1,68)", "Todo con 2 réplicas"],
  codTex: "x_1=\\dfrac{T-5}{2}\\quad x_2=\\dfrac{P-4{,}3}{1{,}3}\\quad x_3=\\dfrac{F-750}{50}",
  sigTxt: "potencia y los tres cuadráticos, todos negativos ⇒ apunta a un máximo",
  realTxt: "T ≈ 5,04 ms · P ≈ 4,79 W · F ≈ 755 g · ŷ ≈ 1 802", fijo3: 0.097,
  optItems: ["Máximo y <strong>dentro</strong> ⇒ es el óptimo", "≈ 5 ms, 4,8 W y 755 g (antes: 6 ms, 5 W, 850 g)", "Residuos razonables · confirmar con corridas"],
  fin: ["Tres cuadráticos negativos y λ negativos ⇒ máximo", "Con k = 3 se clasifica con valores propios", "Dentro de la región ⇒ condición recomendada"] }).escenas };
