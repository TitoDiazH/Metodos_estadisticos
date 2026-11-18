"use strict";
const P = require("./_p4"), { W } = require("../generadores/p4datos"), { k, C } = P;
const L = require("./_lib"), Rl = require("../generadores/lib");
const d = W.e12_36, r = C.ajustar({ datos: d, formula: "y ~ x1 + x2 + x3" });
const sc = Rl.Rtxt(`d <- ${C.rdatos(d)}; cat(anova(lm(y ~ x1 + x2 + x3, data = d))[[2]], sep = " ")`).trim().split(/\s+/).map(Number);
const cme = sc[3] / 4, Fc = Rl.Rn("qf(0.95, 1, 4)");
const scr = L.tabla(["Fuente", "SC", "gl", "F = SC/CME"], [["x₁ temperatura", P.s(sc[0]), 1, { v: L.n(sc[0] / cme, 2), en: "scrcalc" }], ["x₂ tiempo", P.s(sc[1]), 1, { v: L.n(sc[1] / cme, 2), en: "scrcalc" }],
  ["x₃ concentración", P.s(sc[2]), 1, { v: L.n(sc[2] / cme, 2), en: "scrcalc", hl: ["scrcalc"] }], ["Error", P.s(sc[3]), 4, ""]].map((f) => f.map((c, j) => (j === 0 ? { v: c, th: true } : c))), "") +
  L.formula({ en: "scr" }, `SCR=${L.nt(sc[0], 3)}+${L.nt(sc[1], 3)}+${L.nt(sc[2], 3)}=${L.nt(sc[0] + sc[1] + sc[2], 3)}`) +
  L.nota({ en: "scrcalc@3" }, `F = t² · crítico ${L.n(Fc, 2)} ⇒ solo x₃ significativa; x₁ y x₂ al borde`, "ok");
module.exports = { escenas: P.regEj({ ej: "Walpole · Ejercicio 12.36", titulo: "El factorial 2³ como regresión", datos: d, formula: "y ~ x1 + x2 + x3", vif: true, scr,
  enun: `8 corridas. ${k("clave1", "Respuesta: producto y")} · ${k("clave2", "temperatura, tiempo y concentración codificados en ±1")} · ${k("clave3", "dividir la SCR en 3 componentes de 1 gl")}.`,
  interp: ["b₁ = 0,575: +1 unidad codificada de temperatura", "De −1 a +1 hay 2 unidades ⇒ efecto = 2b₁ = 1,15 (coeficiente = mitad del efecto)", "b₀ = 9,9 = promedio de las 8 corridas (el 0 es el centro del diseño)"],
  pruebas: [["x1", "al borde (p = 0,0501): no se rechaza al 5 %"], ["x2", "no significativa"], ["x3", "la concentración influye"]], fTxt: "el modelo sirve",
  notaProb: "Diseño ortogonal: VIF = 1, mismo ee y mismo apalancamiento para todos",
  fin: ["2^k = regresión codificada: coeficiente = efecto/2", "Ortogonal: ee iguales, VIF = 1, SCR se reparte sin depender del orden", "Con más niveles, esa misma idea es la superficie de respuesta"] }).escenas };
