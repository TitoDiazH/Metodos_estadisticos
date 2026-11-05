/* Pizarra de M11 · Conglomerados y distancias. Marcas en tools/guiones/m11-conglomerados-distancias.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, span, sumaVuela, calc, portada, cierre, cod, puntos, COL } = M;

const nube = puntos({ ancho: 340, alto: 230, x0: 0, x1: 10, y0: 0, y1: 10, ejes: ["variable 1", "variable 2"], en: { 1: "cluster", 2: "cluster" },
  pts: [{ x: 2, y: 2 }, { x: 2.8, y: 1.5 }, { x: 1.6, y: 3 }, { x: 2.5, y: 2.7 }, { x: 7, y: 7.5 }, { x: 7.8, y: 8.2 }, { x: 8.2, y: 7 }, { x: 7.3, y: 8.6 }, { x: 7.5, y: 2.5 }, { x: 8.4, y: 2 }, { x: 8, y: 3.2 }]
    .map((q, i) => Object.assign(q, { g: i < 4 ? 0 : i < 8 ? 1 : 2 })) });

const escenas = [
  portada(11, "Prueba 2", "Análisis de conglomerados", "Agrupar sin etiquetas y medir qué tan parecidas son dos observaciones"),

  { en: "idea", html: kicker("Qué es el clustering") + titulo("Parecidos adentro, distintos afuera") +
    `<div class="pz-cols pz-cols-64"><div style="height:46cqh">${nube}</div><div class="pz-col">` +
    lista([["idea", "Agrupar observaciones parecidas"], ["cluster", "Cada grupo es un <strong>clúster</strong>"], ["sin-etq", "Los grupos <span class=\"pz-am\">salen de los datos</span>"]]) +
    nota({ en: "nosup" }, "Aprendizaje <strong>no supervisado</strong>") +
    nota({ en: "nosup-r" }, "Clasificación: los grupos ya se conocen. Clustering: no hay etiquetas", "ok") + "</div></div>" },

  { en: "part", html: kicker("Partición y pasos") + titulo("Qué se busca y cómo se hace") +
    `<div class="pz-cols"><div class="pz-col">` +
    lista([["cob", "<strong>Cobertura</strong>: toda observación en algún clúster"], ["disj", "<strong>Disjuntividad</strong>: ninguna en dos a la vez"], ["novacio", "<strong>No vacío</strong>: ningún clúster vacío"]]) +
    nota({ en: "obj" }, "Mínima variabilidad interna (<span class=\"pz-ce\">cohesión</span>) · máxima diferencia entre grupos (<span class=\"pz-am\">separación</span>)") +
    `</div><div class="pz-col">` +
    paso(1, { en: "p1", hl: ["p5"] }, "Preparar datos: limpiar y <strong>estandarizar</strong>") +
    paso(2, { en: "p2", hl: ["p5"] }, "Definir la <strong>distancia</strong>") +
    paso(3, "p3", "Elegir algoritmo: jerárquico o particionado") +
    paso(4, "p4", "Número de clústeres: codo, silueta, dendrograma") +
    paso(5, "p5", "Validar e interpretar") + "</div></div>" },

  { en: "dist", html: kicker("Distancias numéricas") + titulo("La familia de Minkowski") +
    formula({ en: "mink-f" }, "d(i,j)=\\Bigl[\\sum_k |x_{ik}-x_{jk}|^{\\color{#ffd166}{\\lambda}}\\Bigr]^{1/\\color{#ffd166}{\\lambda}}") +
    `<div class="pz-cols pz-cols-3">` +
    div({ en: "l1" }, `<p class="pz-am"><strong>λ = 1 · Manhattan</strong></p>` + formula({}, "\\sum_k|x_{ik}-x_{jk}|") + p({ clase: "pz-tenue" }, "por las calles")) +
    div({ en: "l2" }, `<p class="pz-ce"><strong>λ = 2 · Euclídea</strong></p>` + formula({}, "\\sqrt{\\sum_k(x_{ik}-x_{jk})^2}") + p({ clase: "pz-tenue" }, "línea recta")) +
    div({ en: "linf" }, `<p class="pz-ro"><strong>λ = ∞ · Chebyshev</strong></p>` + formula({}, "\\max_k|x_{ik}-x_{jk}|") + p({ clase: "pz-tenue" }, "la mayor diferencia")) + "</div>" },

  { en: "ej", html: kicker("Ejemplo de la clase") + titulo("Empresas E1 y E2: inversión y ventas") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["", "Inversión", "Ventas"], [
      [{ v: "E1", th: true }, { v: "16", en: "ej-e1" }, { v: "10", en: "ej-e1" }],
      [{ v: "E2", th: true }, { v: "12", en: "ej-e2" }, { v: "14", en: "ej-e2" }],
      [{ v: "|dif|", th: true }, { v: "4", en: "ej-dif", id: "d1", tot: true }, { v: "4", en: "ej-dif@0.6", id: "d2", tot: true }]]) +
    nota({ en: "ej-che" }, `Chebyshev = máx(4; 4) = <strong>4</strong>`) + `</div><div class="pz-col">` +
    `<div class="pz-caja-calc"><span class="pz-etq">cálculo</span><div class="pz-col">` +
    sumaVuela({ etiqueta: "Manhattan", terms: [{ v: 4, desde: "d1" }, { v: 4, desde: "d2" }], tiempos: ["ej-man", "ej-man@0.6"], tRes: "ej-man@1.2", idRes: "man", dec: 0 }) +
    calc({ etiqueta: "Euclídea = ", partes: [["ej-euc", "\\sqrt{4^2+4^2}"], ["ej-euc@1", "=\\sqrt{32}"]], tRes: "ej-euc@2.2", res: "5,66" }) +
    "</div></div>" +
    nota({ en: "r" }, "En R: <code>dist(datos, \"euclidean\")</code> · <code>\"manhattan\"</code> · <code>\"maximum\"</code>") +
    nota({ en: "r-max" }, "Chebyshev en R se llama <strong>maximum</strong>", "mal") + "</div></div>" },

  { en: "ward", html: kicker("Otras distancias") + titulo("Euclídea al cuadrado y correlación") +
    nota({ en: "ward" }, `${$("d^2")}: la usa <strong>Ward</strong> y agranda las distancias grandes`) +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "cor-uso" }, "Interesa el <span class=\"pz-am\">patrón</span>, no el nivel: dos clientes que suben y bajan juntos") +
    formula({ en: "cor-f" }, "d(i,j)=1-r_{ij}\\in[0,\\,2]") +
    tabla(["r", "d"], [[{ v: "1", en: "cor-rango" }, { v: "0", en: "cor-rango" }], [{ v: "0", en: "cor-rango" }, { v: "1", en: "cor-rango" }], [{ v: "−1", en: "cor-2" }, { v: "<strong>2</strong>", en: "cor-2", hl: ["cor-2", "cor-r"] }]], "pz-chica") +
    `</div><div class="pz-col">` + cod("cor-r", "d <- 1 - cor(t(datos))", [["t(datos)", "cor-t"]]) +
    nota({ en: "cor-t" }, "<code>cor</code> correlaciona columnas; con <code>t()</code> se correlacionan las <strong>filas</strong> (observaciones)") + "</div></div>" },

  { en: "bin", html: kicker("Variables 0 / 1") + titulo("Distancias binarias") +
    `<div class="pz-cols pz-cols-37"><div class="pz-col">` +
    tabla(["", "j = 1", "j = 0"], [[{ v: "i = 1", th: true }, { v: "a", en: "bin-a", id: "ca" }, { v: "b", en: "bin-bc" }], [{ v: "i = 0", th: true }, { v: "c", en: "bin-bc" }, { v: "d", en: "bin-d", hl: ["bin-q", "sm"] }]]) +
    nota({ en: "bin-q" }, "¿Compartir un 0 dice algo del parecido?") + p({ en: "bin-q-ej", clase: "pz-tenue" }, "No tener yate no hace parecidas a dos personas") +
    `</div><div class="pz-col">` +
    formula({ en: "jac" }, "d_{J}=\\frac{b+c}{a+b+c}\\quad\\text{(ignora } d)") +
    formula({ en: "sm" }, "d_{SM}=\\frac{b+c}{a+b+c+d}") +
    formula({ en: "ham" }, "d_{H}=b+c\\ \\ (=\\text{Manhattan con 0/1})") +
    `<div class="pz-caja-calc"${M.at({ en: "bin-ej" })}><span class="pz-etq">a = b = c = d = 1</span><div class="pz-col">` +
    calc({ etiqueta: "SM: ", partes: [["bin-sm", "\\frac{1+1}{4}"]], tRes: "bin-sm@1", res: "0,5" }) +
    calc({ etiqueta: "Jaccard: ", partes: [["bin-jac", "\\frac{1+1}{3}"]], tRes: "bin-jac@1", res: "0,667" }) + "</div></div></div></div>" },

  { en: "ham-ej", html: kicker("Ayudantía 5") + titulo("Hamming entre productos") +
    tabla(["", "V1", "V2", "V3", "V4"], [
      [{ v: "P1", th: true }, "1", "0", "1", "1"], [{ v: "P3", th: true }, "0", "1", "0", "0"],
      [{ v: "¿difieren?", th: true }].concat([0, 1, 2, 3].map((k) => ({ v: "✓", en: `ham-r@${(k * 0.5).toFixed(1)}`, tot: true })))]) +
    nota({ en: "ham-r@2.2" }, "Difieren en las 4 variables ⇒ Hamming = <strong>4</strong>", "ok") },

  { en: "est", html: kicker("Estandarizar antes de medir") + titulo("Si no, manda la variable de números grandes") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["Variable", "Rango"], [["Activos", { v: "10 – 20", en: "est-ej" }], ["Trabajadores", { v: "40 – 350", en: "est-ej", hl: ["est-dom", "z"] }]]) +
    nota({ en: "est-dom" }, "Sin estandarizar, la distancia casi solo depende de los <strong>trabajadores</strong>", "mal") +
    `</div><div class="pz-col">` +
    tabla(["Método", "Fórmula", "Nota"], [
      [{ v: "Puntaje z", en: "z-f" }, { v: $("\\frac{x-\\bar x}{s}"), en: "z-f" }, { v: "media 0, sd 1 · <code>scale</code>", en: "z-f" }],
      [{ v: "÷ máximo", en: "max" }, { v: $("\\frac{x}{\\max}"), en: "max" }, { v: "datos positivos", en: "max" }],
      [{ v: "Min–max", en: "minmax", hl: ["out-r"] }, { v: $("\\frac{x-\\min}{\\max-\\min}"), en: "minmax", hl: ["out-r"] }, { v: "entre 0 y 1", en: "minmax", hl: ["out-r"] }]], "pz-chica") +
    nota({ en: "out-r" }, "Min–max es el más sensible a los <strong>atípicos</strong>", "mal") +
    p({ en: "sin", clase: "pz-tenue" }, "No estandarizar solo si las unidades ya son comparables") + "</div></div>" },

  cierre(11, [["c1", "Clustering: grupos sin etiquetas, cohesión y separación"], ["c2", "Minkowski: λ = 1 Manhattan, 2 euclídea, ∞ Chebyshev · correlación: 1 − r"],
    ["c3", "Binarias: Jaccard ignora los 0 compartidos, Simple Matching los cuenta"], ["c4", "Estandarizar antes de medir distancias"]])
];
module.exports = { escenas };
