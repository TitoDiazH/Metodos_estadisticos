/* Pizarra de M04 · Escalamiento y distancias. Marcas en tools/guiones/m04-escalamiento-distancias.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, sumaVuela, portada, cierre, cod, puntos, COL } = M;
const c = (v, en, extra = {}) => Object.assign({ v, en }, extra);
const xs = [10, 12, 15, 20, 25];

const ab = puntos({ x0: 0, x1: 8, y0: 0, y1: 10, ancho: 300, alto: 240, ejes: ["x₁", "x₂"], pts: [{ x: 2, y: 3, et: "A" }, { x: 6, y: 8, et: "B", g: 1 }],
  extra: `<path class="trazo" pathLength="1" data-en="euc" d="M{X:2},{Y:3} L{X:6},{Y:8}" stroke="${COL.ce}" stroke-width="3"/>` +
    `<path class="trazo" pathLength="1" data-en="man" d="M{X:2},{Y:3} L{X:6},{Y:3} L{X:6},{Y:8}" stroke="${COL.am}" stroke-width="3" stroke-dasharray="7 5" fill="none"/>` +
    `<text data-en="dist-dif" x="{X:4}" y="{Y:2.3}" text-anchor="middle" style="font-size:13px;fill:${COL.am}">4</text>` +
    `<text data-en="dist-dif" x="{X:6.5}" y="{Y:5.5}" style="font-size:13px;fill:${COL.am}">5</text>` });

const escenas = [
  portada(4, "Prueba 1", "Escalamiento, distancias y similitud", "Poner las variables en escala comparable antes de medir"),

  { en: "prob", html: kicker("¿Por qué escalar?") + titulo("Edad e ingreso") +
    tabla(["", "Edad", "Ingreso"], [[{ v: "Diferencia", th: true }, c("30 años", "prob-ej"), c("1.000.000 pesos", "prob-ej", { hl: ["prob-r", "cuando"] })]]) +
    nota({ en: "prob-r" }, "El ingreso <strong>manda</strong> en la distancia, solo por sus unidades", "mal") +
    p({ en: "cuando" }, "<strong>Escalar cuando:</strong>") +
    lista([["cuando-1", "las unidades son distintas"], ["cuando-2", "se usan distancias"], ["cuando-3", "se aplica PCA o clustering"]]) +
    p({ en: "cuando-dep", clase: "pz-tenue" }, "El método depende del análisis posterior y de los atípicos") },

  { en: "mm", html: kicker("Min–max") + titulo("Todo entre 0 y 1") +
    formula({ en: "mm-f" }, "w=\\frac{x-\\min}{\\max-\\min}") +
    tabla(["x"].concat(xs.map(String)), [[{ v: "w", th: true }].concat(xs.map((x, i) => c(n((x - 10) / 15, 3), i === 2 ? "mm-ej2" : "mm-ej", { hl: i === 2 ? ["mm-ej2", "mm-inv"] : null })))]) +
    `<div class="pz-cols">` +
    calc({ etiqueta: "Inversa: ", partes: [["mm-inv", "x=w(\\max-\\min)+\\min"], ["mm-inv-ej", "=0{,}5\\cdot15+10"]], tRes: "mm-inv-ej@2.5", res: "17,5" }) +
    nota({ en: "mm-inv-uso" }, "Sirve para leer un centroide en unidades originales") + "</div>" +
    nota({ en: "mm-trampa-r" }, "Min–max <strong>no</strong> deja media 0 y varianza 1: eso es el puntaje z", "mal") },

  { en: "z", html: kicker("Otras tres formas") + titulo("Puntaje z, robusto y L2") +
    tabla(["Método", "Fórmula", "Para qué"], [
      [c("<strong>Puntaje z</strong>", "z-f"), c($("\\frac{x-\\bar x}{s}"), "z-f"), c("media 0, sd 1 · <code>scale</code>", "z-f")],
      [c("<strong>Robusto</strong>", "rob-f"), c($("\\frac{x-\\text{mediana}}{IQR}"), "rob-f"), c("hay atípicos", "rob-uso")],
      [c("<strong>L2</strong>", "l2"), c($("\\frac{x}{\\lVert x\\rVert}"), "l2"), c("importa la dirección", "l2-uso")]]) +
    tabla(["x"].concat(xs.map(String)), [[{ v: "z", th: true }].concat(xs.map((x) => c(n((x - 16.4) / 6.107, 2), "z-ej")))], "pz-chica") +
    p({ en: "rob-por", clase: "pz-tenue" }, "Un extremo arrastra a la media y la sd, casi no a la mediana") },

  { en: "dist", html: kicker("Distancias") + titulo("A = (2; 3) y B = (6; 8)") +
    `<div class="pz-cols pz-cols-64"><div style="height:48cqh">${ab}</div><div class="pz-col">` +
    `<div class="pz-caja-calc"><span class="pz-etq">cálculo</span><div class="pz-col">` +
    calc({ etiqueta: "Euclídea ", partes: [["euc-c", "\\sqrt{4^2+5^2}=\\sqrt{41}"]], tRes: "euc-r", res: "6,40" }) +
    calc({ etiqueta: "Manhattan ", partes: [["man-c", "4+5"]], tRes: "man-r", res: "9" }) + "</div></div>" +
    nota({ en: "man-ojo" }, "Siempre en <strong>valor absoluto</strong>") +
    cod("dist-erre", "dist(rbind(A, B), method = \"euclidean\")  # o \"manhattan\"") +
    nota({ en: "dist-est" }, "Con escalas distintas, estandarizar primero", "ok") + "</div></div>" },

  { en: "sim", html: kicker("Similitud") + titulo("Dirección y patrón") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "cos" }, "\\cos\\theta=\\frac{x\\cdot y}{\\lVert x\\rVert\\,\\lVert y\\rVert}") +
    nota({ en: "corr" }, "<strong>Correlación</strong> = coseno de los vectores <span class=\"pz-am\">centrados</span>", "ok") +
    `</div><div class="pz-col">` +
    tabla(["", "1", "2", "3", "4"], [[{ v: "X", th: true }, "1", "2", "3", "4"], [{ v: "Y", th: true }, "2", "8", "6", "8"]].map((f) => f.map((v) => (typeof v === "string" ? c(v, "corr-ej") : v))), "pz-chica") +
    tabla(["", "Coseno"], [[c("Sin centrar", "corr-ej-sin"), c("0,958", "corr-ej-sin")], [c("Centrados", "corr-ej-con"), c("<strong>0,730</strong> = r", "corr-ej-con", { hl: ["corr-ej-con"] })]]) +
    nota({ en: "corr-qr" }, "Sin centrar, apuntan igual solo por estar lejos del origen") + "</div></div>" },

  cierre(4, [["c1", "Escalar: unidades distintas, distancias, PCA o clustering"], ["c2", "Min–max [0, 1] · z: media 0 y sd 1 · robusto: mediana e IQR"], ["c3", "Euclídea: línea recta · Manhattan: suma de |diferencias|"], ["c4", "Correlación = coseno de los vectores centrados"]])
];
module.exports = { escenas };
