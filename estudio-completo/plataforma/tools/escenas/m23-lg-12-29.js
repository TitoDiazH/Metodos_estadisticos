"use strict";
const P = require("./_p4"), { G } = require("../generadores/p4datos"), { k } = P;
const d = G.e29;
module.exports = { escenas: P.rsmEj({ ej: "Libro guía · Cap. 12, ejercicio 29", titulo: "El sabor del queso panela", k: 2, objetivo: "max", circulo: true,
  datos: { y: d.y, x1: d.sal.map((s) => s - 5), x2: d.cuajo.map((c) => Math.round(((c - 0.3) / 0.1) * 1000) / 1000) }, tabla: { sal: d.sal, cuajo: d.cuajo, y: d.y }, etq: { sal: "Sal", cuajo: "Cuajo", y: "Sabor" },
  enun: `${k("clave1", "Factores: sal y cuajo")} · ${k("clave2", "solo 8 quesos")} · ${k("clave3", "modelo de 2.º orden, % explicado y mejor combinación")}.`,
  disTitulo: "Un hexágono + 2 centros", disItems: ["Codificado, los 6 puntos externos están en un círculo de radio 1", "8 corridas para 6 coeficientes ⇒ 2 gl de error"],
  codTex: "x_1=S-5\\qquad x_2=\\dfrac{Cu-0{,}3}{0{,}1}",
  sigTxt: "ninguno (x₂² casi: p = 0,058); cuadráticos de signos opuestos",
  realTxt: "Sal ≈ 4,8 · cuajo ≈ 0,295", clasTxt: "no es un máximo",
  optItems: ["Silla ⇒ el mejor sabor está en el borde del hexágono", "Sal ≈ 4,8 y cuajo ≈ 0,385 ⇒ ŷ ≈ 7,5", "Modelo no significativo: confirmar con corridas"], mejorEn: true,
  fin: ["R² alto con pocos datos engaña: mirar R² ajustado y F", "Sin interacción: xᵢ* = −bᵢ/(2bᵢᵢ)", "Silla al maximizar ⇒ frontera"] }).escenas };
