/* Pizarra de M12 · Clustering jerárquico aglomerativo. Marcas en tools/guiones/m12-jerarquico-aglomerativo.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, portada, cierre, cod, COL } = M;

/* Dendrograma de 5 hojas: fusiones [[i, j, h, marca]] con índices de nodos (hojas 0..4, nuevos 5..). */
function dendro({ hojas, fus, hmax, ancho = 380, alto = 240, corte }) {
  const m = { i: 36, d: 12, a: 12, b: 28 }, W = ancho - m.i - m.d, H = alto - m.a - m.b;
  const Y = (h) => m.a + H - (h / hmax) * H;
  const x = hojas.map((_, k) => m.i + (W * (k + 0.5)) / hojas.length), y = hojas.map(() => Y(0));
  let s = `<svg viewBox="0 0 ${ancho} ${alto}" role="img"><path class="ejes" d="M${m.i - 6},${m.a} V${m.a + H}"/>`;
  [0, hmax / 2, hmax].forEach((v) => { s += `<text x="${m.i - 9}" y="${Y(v) + 4}" text-anchor="end" style="font-size:10px;opacity:.7">${n(v, 1)}</text>`; });
  hojas.forEach((h, k) => { s += `<text x="${x[k]}" y="${alto - 8}" text-anchor="middle" style="font-size:12px">${h}</text>`; });
  fus.forEach(([i, j, h, mk]) => {
    const yy = Y(h);
    s += `<path class="trazo" pathLength="1" data-en="${mk}" d="M${x[i]},${y[i]} V${yy} H${x[j]} V${y[j]}" fill="none" stroke="${COL.ce}" stroke-width="2.5"/>`;
    s += `<text data-en="${mk}" x="${(x[i] + x[j]) / 2}" y="${yy - 5}" text-anchor="middle" style="font-size:11px;fill:${COL.am}">${n(h, 2)}</text>`;
    x.push((x[i] + x[j]) / 2); y.push(yy);
  });
  if (corte) s += `<g data-en="${corte[1]}"><line x1="${m.i - 6}" x2="${ancho - m.d}" y1="${Y(corte[0])}" y2="${Y(corte[0])}" stroke="${COL.ro}" stroke-dasharray="6 4" stroke-width="2"/>` +
    `<text x="${ancho - m.d}" y="${Y(corte[0]) - 5}" text-anchor="end" style="font-size:11px;fill:${COL.ro}">corte</text></g>`;
  return s + "</svg>";
}
const hojas = ["E7", "E8", "E1", "E2", "E5"];

const escenas = [
  portada(12, "Prueba 2", "Clustering jerárquico aglomerativo", "Unir de a dos, de abajo hacia arriba, y dibujarlo como dendrograma"),

  { en: "idea", html: kicker("Métodos jerárquicos") + titulo("Un árbol completo de uniones") +
    `<div class="pz-cols">` +
    nota({ en: "aglo" }, "<strong>Aglomerativo</strong>: parte con n clústeres de 1 dato y los une ↑", "ok") +
    nota({ en: "desag" }, "<strong>Desagregativo</strong> (DIANA, M14): parte con 1 clúster y lo divide ↓") + "</div>" +
    `<div class="pz-col" style="margin-top:2cqh">` +
    paso(1, "algo1", "Cada observación es su propio clúster") +
    paso(2, "algo2", "Unir los <strong>dos más cercanos</strong>") +
    paso(3, "algo3", "Recalcular distancias del clúster nuevo a los demás") +
    paso(4, "algo4", "Repetir hasta que quede uno solo") + "</div>" },

  { en: "dendro", html: kicker("El dendrograma") + titulo("La altura de cada unión es su distancia") +
    `<div class="pz-cols pz-cols-64"><div style="height:50cqh">` +
    dendro({ hojas, hmax: 3.4, fus: [[0, 1, 0.42, "dendro"], [2, 3, 0.65, "dendro"], [6, 4, 1.97, "dendro"], [5, 7, 3.22, "dendro"]], corte: [2.6, "corte"] }) +
    `</div><div class="pz-col">` +
    nota({ en: "dendro-h" }, "Eje vertical: distancia a la que se unieron") +
    nota({ en: "corte" }, "Cortar a una altura ⇒ ramas que cruzan la línea = <strong>número de clústeres</strong>") +
    cod("cutree", "cutree(hc, k = 2)") +
    nota({ en: "k-antes-r" }, "k se decide <strong>después</strong>, al cortar", "ok") + "</div></div>" },

  { en: "link", html: kicker("Distancia entre clústeres") + titulo("Single linkage: el mínimo") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col">` +
    formula({ en: "single" }, "d(A,B)=\\min_{i\\in A,\\,j\\in B} d(i,j)") +
    tabla(["Paso", "Unión", "Altura"], [
      [{ v: "1", en: "ej1" }, { v: "E7 + E8", en: "ej1" }, { v: "0,42", en: "ej1", id: "h1" }],
      [{ v: "2", en: "ej2" }, { v: "E1 + E2", en: "ej2" }, { v: "0,65", en: "ej2" }],
      [{ v: "3", en: "ej3-r" }, { v: "{E1,E2} + E5", en: "ej3-r" }, { v: "1,64", en: "ej3-r@1", desde: "min", hl: ["ej3-r@1", "ej4"] }],
      [{ v: "4", en: "ej4" }, { v: "todo", en: "ej4" }, { v: "2,28", en: "ej4" }]]) +
    `<div class="pz-caja-calc"${M.at({ en: "ej3" })}><span class="pz-etq">E5 al grupo {E1, E2}</span>` +
    calc({ partes: [["ej3", "\\min(\\,d_{E5,E1}=1{,}64;\\ d_{E5,E2}=1{,}97\\,)"]], tRes: "ej3-r", res: "1,64", idRes: "min" }) + "</div>" +
    `</div><div class="pz-col">` +
    `<div style="height:36cqh">${dendro({ hojas, hmax: 3.4, fus: [[0, 1, 0.42, "ej1"], [2, 3, 0.65, "ej2"], [6, 4, 1.64, "ej3-r@1"], [5, 7, 2.28, "ej4"]] })}</div>` +
    nota({ en: "cadena" }, "<strong>Efecto cadena</strong>: basta estar cerca de un miembro ⇒ clústeres largos", "mal") + "</div></div>" },

  { en: "complete", html: kicker("Distancia entre clústeres") + titulo("Complete linkage: el máximo") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col">` +
    formula({ en: "complete" }, "d(A,B)=\\max_{i\\in A,\\,j\\in B} d(i,j)") +
    p({ en: "comp-ej", clase: "pz-tenue" }, "Las dos primeras uniones no cambian (clústeres de 1 punto)") +
    `<div class="pz-caja-calc"${M.at({ en: "comp-e5" })}><span class="pz-etq">E5 al grupo {E1, E2}</span>` +
    calc({ partes: [["comp-e5", "\\max(1{,}64;\\ 1{,}97)"]], tRes: "comp-e5@1.5", res: "1,97" }) + "</div>" +
    tabla(["", "Single", "Complete"], [["Unión 3", "1,64", { v: "1,97", en: "comp-e5@1.5" }], ["Unión 4", "2,28", { v: "3,22", en: "comp-fin" }]], "pz-chica") +
    `</div><div class="pz-col">` +
    `<div style="height:36cqh">${dendro({ hojas, hmax: 3.4, fus: [[0, 1, 0.42, "comp-ej"], [2, 3, 0.65, "comp-ej"], [6, 4, 1.97, "comp-e5@1.5"], [5, 7, 3.22, "comp-fin"]] })}</div>` +
    nota({ en: "comp-r" }, "Más conservador: une a mayor altura y forma clústeres <strong>compactos</strong>", "ok") + "</div></div>" },

  { en: "average", html: kicker("Distancia entre clústeres") + titulo("Average linkage: el promedio de los pares") +
    formula({ en: "average" }, "d(A,B)=\\frac{1}{|A|\\,|B|}\\sum_{i\\in A}\\sum_{j\\in B} d(i,j)") +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "tiendas" }, "Ayudantía 5 · cinco tiendas, distancia Manhattan") +
    nota({ en: "tiendas-1" }, "Primero se unen <strong>C</strong> y <strong>E</strong> (distancia 3)") +
    tabla(["", "d(A, C)", "d(A, E)"], [[{ v: "A", th: true }, { v: "5", en: "tiendas-2", id: "ac" }, { v: "4", en: "tiendas-2", id: "ae" }]]) +
    `</div><div class="pz-col">` +
    tabla(["Método", "d(A, {C, E})"], [
      [{ v: "Single", en: "tiendas-s" }, { v: "4", en: "tiendas-s@0.4", desde: "ae" }],
      [{ v: "Complete", en: "tiendas-c" }, { v: "5", en: "tiendas-c@0.4", desde: "ac" }],
      [{ v: "Average", en: "tiendas-a" }, { v: "<strong>4,5</strong>", en: "tiendas-a@1.2", desde: "prom" }]]) +
    calc({ partes: [["tiendas-a", "\\frac{5+4}{2}"]], tRes: "tiendas-a@0.6", res: "4,5", idRes: "prom" }) + "</div></div>" },

  { en: "cent", html: kicker("Otros dos métodos") + titulo("Centroide y Ward") +
    `<div class="pz-cols"><div class="pz-col">` +
    `<p class="pz-ce"${M.at("cent-def")}><strong>Centroide</strong>: distancia entre los puntos medios</p>` +
    nota({ en: "inv" }, "Puede producir <strong>inversiones</strong>: una unión posterior más abajo", "mal") +
    tabla(["Unión", "…", "6", "7", "8"], [[{ v: "Altura", th: true }, "…", { v: "1,385", en: "inv-ej" }, { v: "1,510", en: "inv-ej" }, { v: "1,383", en: "inv-ej", hl: ["inv-ej", "ward"] }]], "pz-chica") +
    `</div><div class="pz-col">` +
    `<p class="pz-am"${M.at("ward")}><strong>Ward</strong>: une lo que menos aumenta la variabilidad interna</p>` +
    nota({ en: "ward-r" }, "Clústeres <strong>compactos</strong> y de tamaño parecido", "ok") +
    cod("ward-erre", "hclust(d, method = \"ward.D2\")") +
    nota({ en: "inv-q-r" }, "Solo el <strong>centroide</strong> puede invertir; los demás siempre suben") + "</div></div>" },

  { en: "r", html: kicker("En R") + titulo("Todo con hclust") +
    cod("r", `d  <- dist(scale(datos))
hc <- hclust(d, method = "complete")
#   "single" · "complete" · "average" · "centroid" · "ward.D2"
plot(hc)
cutree(hc, k = 3)`, [["plot(hc)", "r-plot"], ["cutree(hc, k = 3)", "r-plot"]]) +
    tabla(["Método", "d entre clústeres", "Rasgo"], [
      ["Single", "mínimo", "efecto cadena"], ["Complete", "máximo", "compactos"], ["Average", "promedio de pares", "intermedio"],
      ["Centroide", "entre centroides", "inversiones"], ["Ward", "aumento de SC", "compactos y parejos"]].map((f) => f.map((v) => ({ v, en: "r-plot" }))), "pz-chica") },

  cierre(12, [["c1", "Aglomerativo: unir de a dos, de abajo hacia arriba; el dendrograma muestra la altura"], ["c2", "Single = mínimo (cadenas) · complete = máximo (compactos) · average = promedio"],
    ["c3", "Centroide puede invertir · Ward: compactos y parejos"], ["c4", "El número de clústeres se elige al cortar el árbol"]])
];
module.exports = { escenas };
