/* Pizarra de M14 · DIANA. Marcas en tools/guiones/m14-diana.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, sumaVuela, portada, cierre, cod, puntos, COL } = M;

const nom = ["E1", "E2", "E5", "E7", "E8"];
const D = [[0, .65, 1.64, 2.81, 3.22], [.65, 0, 1.97, 2.51, 2.92], [1.64, 1.97, 0, 2.28, 2.60], [2.81, 2.51, 2.28, 0, .42], [3.22, 2.92, 2.60, .42, 0]];
const E = { E1: [-0.79, -1.29], E2: [-1.02, -0.68], E5: [0.85, -1.29], E7: [0.85, 0.99], E8: [1.13, 1.29] };
const plano = (grupos, en) => puntos({ x0: -1.4, x1: 1.5, y0: -1.6, y1: 1.6, ancho: 320, alto: 230, ejes: ["inversión (z)", "ventas (z)"], en,
  pts: Object.entries(E).map(([et, [x, y]]) => ({ x, y, et, g: grupos[et] || 0 })) });

/* Matriz de distancias con ids por celda (dE8-k) para que vuelen */
const matriz = (hlFila, hlCol, en) => tabla([""].concat(nom), D.map((f, i) => [{ v: nom[i], th: true }].concat(f.map((v, j) => ({
  v: n(v, 2), id: `d${i}${j}`, hl: (hlFila[i] && j !== i ? hlFila[i] : null) || (hlCol[j] && i !== j ? hlCol[j] : null) })))), "pz-chica");

const escenas = [
  portada(14, "Prueba 2", "DIANA", "Clustering jerárquico de arriba hacia abajo"),

  { en: "idea", html: kicker("Desagregativo") + titulo("Al revés que el aglomerativo") +
    `<div class="pz-cols">` +
    nota({ en: "idea-1" }, "Parte con <strong>todos</strong> en un solo clúster") +
    nota({ en: "idea-2" }, "Lo va <strong>dividiendo</strong>") + "</div>" +
    p({ en: "nombre", clase: "pz-tenue" }, "DIANA = <em>DIvisive ANAlysis</em>") +
    nota({ en: "pregunta" }, "Idea: sacar primero a quien <span class=\"pz-am\">más se aleja</span>, y ver quién lo quiere seguir", "ok") },

  { en: "disp", html: kicker("El algoritmo") + titulo("Escisión y reasignación") +
    `<div class="pz-col">` +
    paso(1, "disp", "<strong>Disparidad</strong> de cada observación: distancia promedio a las demás") +
    paso(2, "escis", "La de mayor disparidad sale y forma un clúster nuevo (<strong>escisión</strong>)") +
    paso(3, "reas", `Para cada una que quedó: ${$("\\text{dif}=\\bar d(i,\\text{los que quedan})-\\bar d(i,\\text{grupo nuevo})")}`) +
    paso(4, "reas-pos", "Si dif > 0, está más cerca del nuevo ⇒ <strong>se cambia</strong>. Repetir hasta que nadie se mueva") +
    paso(5, "sig", "Siguiente división: el clúster <span class=\"pz-am\">más heterogéneo</span> (no el más grande)") + "</div>" +
    nota({ en: "sig-r" }, "Un grupo grande puede ser parejo; uno chico, muy disperso", "ok") },

  { en: "ej-d", html: kicker("Ejemplo · 5 empresas") + titulo("Disparidad: ¿quién sale primero?") +
    `<div class="pz-cols"><div class="pz-col">` + matriz({ 4: ["ej-e8", "ej-otras"] }, {}) + `</div><div class="pz-col">` +
    `<div class="pz-caja-calc"><span class="pz-etq">disparidad de E8</span>` +
    sumaVuela({ terms: [3.22, 2.92, 2.60, 0.42].map((v, j) => ({ v, desde: `d4${j}` })), tiempos: ["ej-e8@0.5", "ej-e8@1.4", "ej-e8@2.3", "ej-e8@3.2"], tRes: "ej-e8@4.2", idRes: "s8" }) +
    calc({ partes: [["ej-e8@5", "\\bar d=\\frac{9{,}16}{4}"]], tRes: "ej-e8@6", res: "2,29", idRes: "p8" }) + "</div>" +
    tabla(nom, [[{ v: "2,08", en: "ej-otras" }, { v: "2,01", en: "ej-otras" }, { v: "2,12", en: "ej-otras" }, { v: "2,00", en: "ej-otras" }, { v: "<strong>2,29</strong>", en: "ej-otras", desde: "p8", hl: ["ej-sale"] }]], "pz-chica") +
    nota({ en: "ej-sale" }, "E8 tiene la mayor ⇒ sale y forma su grupo", "ok") + "</div></div>" },

  { en: "ej-reas", html: kicker("Reasignación") + titulo("¿Alguien quiere irse con E8?") +
    `<div class="pz-cols"><div class="pz-col">` + matriz({ 3: ["ej-e7", "ej-e7r"] }, {}) +
    nota({ en: "ej-resto" }, "E1, E2, E5: dif negativa ⇒ se quedan") + `</div><div class="pz-col">` +
    `<div class="pz-caja-calc"><span class="pz-etq">E7</span><div class="pz-pila">` +
    sumaVuela({ etiqueta: "a los que quedan", terms: [{ v: 2.81, desde: "d30" }, { v: 2.51, desde: "d31" }, { v: 2.28, desde: "d32" }], tiempos: ["ej-e7@0.3", "ej-e7@1.3", "ej-e7@2.3"], tRes: "ej-e7@3.3", hasta: "ej-e7@4.6" }) +
    calc({ etiqueta: "", partes: [["ej-e7@4.6", "\\bar d=\\frac{7{,}60}{3}"]], tRes: "ej-e7@5.4", res: "2,53", idRes: "q7" }) + "</div></div>" +
    calc({ etiqueta: "dif = ", partes: [["ej-e7b", "2{,}53-\\underbrace{0{,}42}_{d(E7,E8)}"]], tRes: "ej-e7r", res: "+2,11" }) +
    nota({ en: "ej-e7r@1" }, "Positiva ⇒ <strong>E7 se cambia</strong> con E8", "ok") + "</div></div>" },

  { en: "ej-r2", html: kicker("Las divisiones") + titulo("Del todo hacia abajo") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["Clúster", "Disparidad"], [[{ v: "{E7, E8}", en: "ej-2a" }, { v: "0,42", en: "ej-2a" }], [{ v: "{E1, E2, E5}", en: "ej-2b" }, { v: "<strong>1,42</strong>", en: "ej-2b", hl: ["ej-2c"] }]]) +
    nota({ en: "ej-2c" }, "Se divide el más heterogéneo: sale <strong>E5</strong> (1,80)") +
    nota({ en: "ej-3r" }, "E5: mucha inversión y pocas ventas, un perfil único", "ok") + `</div><div class="pz-col">` +
    `<div style="height:46cqh;position:relative"><div style="position:absolute;inset:0" data-en="ej-r2" data-hasta="ej-3">${plano({ E7: 1, E8: 1 })}</div>` +
    `<div style="position:absolute;inset:0"${M.at({ en: "ej-3" })}>${plano({ E7: 1, E8: 1, E5: 2 })}</div></div>` + "</div></div>" },

  { en: "r", html: kicker("En R y el dendrograma") + titulo("cluster::diana") +
    cod("r", `library(cluster)
dd <- diana(datos_norm, metric = "euclidean")
cutree(as.hclust(dd), k = 3)`, [["as.hclust(dd)", "r-cut"]]) +
    `<div class="pz-cols">` +
    nota({ en: "dendro" }, "El dendrograma se lee de la raíz hacia abajo") +
    nota({ en: "dendro-h" }, "Alturas = <strong>diámetro</strong> de cada clúster (no distancia de fusión)") + "</div>" },

  { en: "comp", html: kicker("Comparar métodos") + titulo("Mismas empresas, varios métodos") +
    tabla(["Método", "k = 2", "k = 3"], [
      [{ v: "Single · complete · K-medias", en: "comp-2" }, { v: "{E1,E2,E5} · {E7,E8}", en: "comp-2" }, ""],
      [{ v: "DIANA", en: "comp-3" }, { v: "{E1,E2,E5} · {E7,E8}", en: "comp-3" }, { v: "{E1,E2} · {E5} · {E7,E8}", en: "comp-3", hl: ["comp-3", "comp-r"] }]]) +
    nota({ en: "comp-r" }, "Coinciden en lo muy marcado; difieren en los casos ambiguos (E5)") +
    tabla(["Método", "Conviene cuando…"], [[{ v: "Jerárquicos", en: "cuando-j" }, { v: "datos chicos o medianos; explorar k con el dendrograma", en: "cuando-j" }],
      [{ v: "K-medias", en: "cuando-k" }, { v: "datos grandes, idea de k", en: "cuando-k" }], [{ v: "DIANA", en: "cuando-d" }, { v: "detectar primero las separaciones grandes", en: "cuando-d" }]], "pz-chica") },

  cierre(14, [["c1", "DIANA parte del todo y divide"], ["c2", "Sale la observación de mayor disparidad"], ["c3", "Se mueven las que quedan más cerca del grupo nuevo (dif > 0)"], ["c4", "Se divide el clúster más heterogéneo, no el más grande"]])
];
module.exports = { escenas };
