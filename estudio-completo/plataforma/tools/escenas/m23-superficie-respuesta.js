"use strict";
/* Pizarra de M23 · Superficie de respuesta (clase del módulo). Marcas en tools/guiones/m23-superficie-respuesta.txt.
   Ejemplo de clase: rendimiento de un proceso químico, central compuesto rotable (C8.2 s8–18), recalculado en R. */
const P = require("./_p4");
const D = require("./_datos_modulos");
const { n, $, kicker, titulo, formula, nota, lista, p, div, s, C, COL } = P;

const r = C.ajustar({ datos: D.rend, formula: "y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2", falta: ["x1", "x2"], rsm: ["x1", "x2"] });
const nt = (x, d) => s(x, d || 4).replace(",", "{,}").replace("−", "-");
const b = r.b, B = r.B, xs = r.xs, H = [[2 * B[0][0], 2 * B[0][1]], [2 * B[1][0], 2 * B[1][1]]];
const detH = H[0][0] * H[1][1] - H[0][1] * H[1][0];
const pts = D.rend.x1.map((_, i) => [D.rend.x1[i], D.rend.x2[i]]);

/* Las tres formas (íconos de contorno) */
const forma = (tipo, color, en) => `<svg viewBox="0 0 120 90" style="width:8em" data-en="${en}">` + [1, 2, 3].map((i) => tipo === "silla"
  ? `<path d="M${10 + i * 8},10 Q60,${45 - i * 6} ${110 - i * 8},10 M${10 + i * 8},80 Q60,${45 + i * 6} ${110 - i * 8},80" fill="none" stroke="${color}" stroke-width="2"/>`
  : `<ellipse cx="60" cy="45" rx="${i * 17}" ry="${i * 12}" fill="none" stroke="${color}" stroke-width="2"/>`).join("") +
  `<text x="60" y="49" text-anchor="middle" style="font-size:14px;fill:${color}">${tipo === "loma" ? "▲" : tipo === "valle" ? "▼" : "✕"}</text></svg>`;

/* Central compuesto con k = 2 */
function ccd() {
  const c = 110, u = 55, a = 1.414 * u;
  const pt = (x, y, col, en, rr) => `<circle data-en="${en}" cx="${c + x}" cy="${c - y}" r="${rr || 7}" fill="${col}"/>`;
  return `<svg viewBox="0 0 220 220" style="max-height:50cqh"><g stroke="currentColor" stroke-opacity=".35" fill="none"><rect x="${c - u}" y="${c - u}" width="${2 * u}" height="${2 * u}"/>` +
    `<circle cx="${c}" cy="${c}" r="${a}" data-en="rot" stroke="${COL.am}" stroke-dasharray="4 4" stroke-opacity=".8"/><line x1="10" y1="${c}" x2="210" y2="${c}"/><line x1="${c}" y1="10" x2="${c}" y2="210"/></g>` +
    [[-u, -u], [u, -u], [-u, u], [u, u]].map(([x, y]) => pt(x, y, COL.ce, "ccd-1")).join("") +
    [[-a, 0], [a, 0], [0, -a], [0, a]].map(([x, y]) => pt(x, y, COL.am, "ccd-2")).join("") + pt(0, 0, COL.ve, "ccd-3", 9) +
    `<text data-en="ccd-2" x="${c + a - 8}" y="${c - 12}" style="font-size:12px;fill:${COL.am}">α</text>` +
    `<text x="200" y="${c + 16}" style="font-size:12px">x₁</text><text x="${c + 6}" y="20" style="font-size:12px">x₂</text></svg>`;
}

module.exports = { escenas: [
  { en: "inicio", html: `<div class="pz-centro">${kicker("Módulo 24 · Prueba 4")}` +
    `<h3 class="pz-t" style="font-size:2.2em">Superficie de respuesta</h3>` + p({ clase: "pz-st" }, "Buscar las mejores condiciones de operación con una regresión de segundo orden") + "</div>" },

  { en: "idea", html: kicker("La idea") + titulo("Factores continuos ⇒ la respuesta es una superficie") +
    p({ en: "idea" }, "Temperatura y concentración pueden tomar <strong>cualquier valor</strong> dentro de un rango") +
    nota({ en: "idea-s" }, "Rendimiento = superficie sobre el plano (T, C): buscamos su <strong>mejor zona</strong>") +
    `<div class="pz-cols pz-cols-3" data-en="formas" style="text-align:center">` +
    div({}, forma("loma", COL.am, "loma") + p({ en: "loma" }, "Loma: <strong>máximo</strong>")) + div({}, forma("valle", COL.ce, "valle") + p({ en: "valle" }, "Valle: <strong>mínimo</strong>")) +
    div({}, forma("silla", COL.ro, "silla") + p({ en: "silla" }, "Silla de montar")) + "</div>" +
    `<div class="pz-cols" data-en="preg">` + nota({ en: "preg-1" }, "¿En qué puntos mido? ⇒ <strong>diseño</strong>") + nota({ en: "preg-2" }, "¿Cómo analizo? ⇒ <strong>regresión múltiple</strong>", "ok") + "</div>" },

  { en: "cod", html: kicker("Del factorial a la superficie") + titulo("Codificar, y lo que el 2^k no ve") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "cod" }, "x=\\dfrac{X-\\text{centro}}{\\text{semirrango}}\\in[-1,\\,1]") +
    nota({ en: "cod-v" }, "0 = centro del diseño · misma escala ⇒ coeficientes <strong>comparables</strong>", "ok") +
    p({ en: "dosk" }, "Un 2<sup>k</sup> codificado <strong>ya es una regresión</strong>") +
    formula({ en: "mitad" }, "\\text{efecto}=2b:\\ b_1=8{,}71\\Rightarrow17{,}4") +
    `</div><div class="pz-col">` +
    nota({ en: "lim" }, "Dos niveles ⇒ solo rectas: <strong>no ve curvatura</strong> · <span data-en=\"tres\">x² necesita <strong>≥ 3 niveles</strong></span>", "mal") +
    p({ en: "centro" }, "<strong>Puntos al centro, repetidos</strong>") +
    nota({ en: "puro" }, "Réplicas ⇒ <strong>error puro</strong>, sin depender del modelo") +
    formula({ en: "lof" }, "F_{FA}=\\dfrac{SC_{FA}/gl_{FA}}{SC_{puro}/gl_{puro}}") +
    nota({ en: "lof-h" }, `${$("H_0")}: el modelo es adecuado ⇒ se quiere un <strong>p alto</strong>`, "ok") + "</div></div>" },

  { en: "ccd", html: kicker("Diseños de segundo orden") + titulo("Central compuesto") +
    `<div class="pz-cols"><div class="pz-col">${ccd()}</div><div class="pz-col">` +
    lista([["ccd-1", "Esquinas del 2<sup>k</sup> (±1, ±1)"], ["ccd-2", "Axiales a distancia α sobre cada eje"], ["ccd-3", "Centro repetido n₀ veces"]]) +
    formula({ en: "ccd-n" }, "N=2^k+2k+n_0\\quad(5\\text{ niveles})") +
    formula({ en: "rot" }, "\\text{rotable: }\\alpha=\\sqrt[4]{2^k}\\quad(k=2:\\ 1{,}414)") +
    nota({ en: "bb" }, "<strong>Box-Behnken</strong>: 3 niveles, medio de las aristas + centro (sin esquinas)") + "</div></div>" },

  { en: "ej", html: kicker("Ejemplo de clase · rendimiento de un proceso químico") + titulo("T: 200–250 °C · C: 15–25 %") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "ej-c" }, "x_1=\\dfrac{T-225}{25}\\qquad x_2=\\dfrac{C-20}{5}") +
    P.tabla(["x₁", "x₂", "y"], pts.map(([a, c], i) => [{ v: n(a, 3), en: "ej-n" }, { v: n(c, 3), en: "ej-n" }, { v: D.rend.y[i], en: "ej-n" }]), "pz-mini") +
    `</div><div class="pz-col">` +
    P.superficie(r, { vx: "x1", vy: "x2", lo: -1.6, hi: 1.6, puntos: pts, enPuntos: "ej-n", lado: 230, etqX: "x₁ (T)", etqY: "x₂ (C)", sinColor: true }) +
    p({ en: "ej-n" }, "4 esquinas + 4 axiales (±1,414) + 4 centros = <strong>12 corridas</strong>") + "</div></div>" },

  { en: "mod", html: kicker("El modelo de segundo orden") + titulo("Lineales + cuadráticos + interacción") +
    formula({ en: "mod" }, "\\hat y=b_0+\\underbrace{b_1x_1+b_2x_2}_{\\text{lineales}}+\\underbrace{b_{11}x_1^2+b_{22}x_2^2}_{\\text{curvatura}}+\\underbrace{b_{12}x_1x_2}_{\\text{interacción}}") +
    `<div class="pz-cols">` + lista([["mod-l", "Lineales: inclinación"], ["mod-c", "Cuadráticos: curvatura en cada dirección"], ["mod-i", "Interacción: el efecto de uno depende del otro"], ["mod-n", "k = 2 ⇒ 6 coeficientes · k = 3 ⇒ 10"]]) +
    P.codigo("mod-r", "lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2)\nlibrary(rsm)\nrsm(y ~ SO(x1, x2), data = datos)") + "</div>" },

  { en: "sal", html: kicker("Leer la salida") + titulo("¿Curvatura? ¿Interacción? ¿Es adecuado?") +
    P.tablaCoef(r, { enFilas: "sal", filas: { "I(x1^2)": { en: "sal", hl: ["sal-c", "sal-i"] }, "I(x2^2)": { en: "sal", hl: ["sal-c", "sal-i"] }, "x1:x2": { en: "sal", hl: ["sal-i", "sal-f"] } } }) +
    `<div class="pz-cols"><div class="pz-col">` +
    nota({ en: "sal-c" }, "Cuadráticos <strong>negativos</strong> y significativos ⇒ curvatura hacia abajo", "ok") +
    nota({ en: "sal-f" }, `${$("F=" + nt(r.F, 3) + ",\\ p\\lt 0{,}001")} · ${$("R^2_{aj}=" + nt(r.r2a, 3))}`) +
    `</div><div class="pz-col">` +
    nota({ en: "sal-lof" }, `Falta de ajuste: ${$("F=" + nt(r.lof.F, 2) + ",\\ p=" + nt(r.lof.p, 2))} ⇒ modelo <strong>adecuado</strong>`, "ok") +
    nota({ en: "comp" }, `Codificado: ${$("b_1=" + nt(b[0], 3))} &gt; 2 × ${$("b_2=" + nt(b[1], 3))} ⇒ la <strong>temperatura pesa más</strong>`) + "</div></div>" },

  { en: "pe", html: kicker("Punto estacionario a mano") + titulo("Derivar · igualar a 0 · resolver") +
    nota({ en: "pe" }, "En la cima de una loma el terreno es plano: <strong>pendiente 0</strong> en todas las direcciones · <span data-en=\"pe-c\">como en cálculo</span>") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "d1" }, "\\frac{\\partial\\hat y}{\\partial x_1}=b_1+2b_{11}x_1+b_{12}x_2=0") +
    nota({ en: "d1-ojo" }, "El <strong>2</strong> sale de derivar x₁² · x₂ sale de derivar x₁x₂", "mal") +
    formula({ en: "d2" }, "\\frac{\\partial\\hat y}{\\partial x_2}=b_2+b_{12}x_1+2b_{22}x_2=0") +
    `</div><div class="pz-col">` +
    p({ en: "sist" }, "Con los números del ejemplo:") +
    formula({ en: "sist-1" }, `${nt(b[0])}${nt(2 * B[0][0])}\\,x_1${nt(2 * B[0][1], 3)}\\,x_2=0`) +
    formula({ en: "sist-2" }, `${nt(b[1])}${nt(2 * B[0][1], 3)}\\,x_1${nt(2 * B[1][1])}\\,x_2=0`) +
    formula({ en: "sol" }, `x_1^*=${nt(xs[0], 3)}\\qquad x_2^*=${nt(xs[1], 2)}`) +
    formula({ en: "mat" }, "\\mathbf x_s=-\\tfrac12B^{-1}\\mathbf b,\\ \\ B=\\left(\\begin{smallmatrix}b_{11}&b_{12}/2\\\\b_{12}/2&b_{22}\\end{smallmatrix}\\right)") + "</div></div>" },

  { en: "hes", html: kicker("¿Máximo, mínimo o silla?") + titulo("La hessiana: segundas derivadas") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "hes-f" }, "H=\\begin{pmatrix}2b_{11}&b_{12}\\\\b_{12}&2b_{22}\\end{pmatrix}=2B") +
    p({ en: "reg" }, "<strong>Con k = 2:</strong>") +
    lista([["reg-max", "det H &gt; 0 y h₁₁ &lt; 0 ⇒ <strong>máximo</strong>"], ["reg-min", "det H &gt; 0 y h₁₁ &gt; 0 ⇒ <strong>mínimo</strong>"], ["reg-silla", "det H &lt; 0 ⇒ <strong>silla</strong>"]]) +
    `</div><div class="pz-col">` +
    formula({ en: "det" }, `H=\\begin{pmatrix}${nt(H[0][0])}&${nt(H[0][1], 3)}\\\\${nt(H[1][0], 3)}&${nt(H[1][1])}\\end{pmatrix}`) +
    formula({ en: "det" }, `\\det H=${nt(H[0][0] * H[1][1])}-${nt(H[0][1] * H[0][1])}=${nt(detH)}`) +
    nota({ en: "det-c" }, `det H &gt; 0 y ${$("h_{11}\\lt 0")} ⇒ <strong>máximo</strong>`, "ok") +
    nota({ en: "ev" }, `Valores propios de B: ${$(nt(r.ev[0], 3) + ";\\ " + nt(r.ev[1], 3))} ⇒ todos negativos ⇒ máximo`) + "</div></div>" },

  { en: "real", html: kicker("Volver a la realidad") + titulo("Condiciones de operación") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "real" }, "X=\\text{centro}+x\\cdot\\text{semirrango}") +
    formula({ en: "real-t" }, `T^*=225+25(${nt(xs[0], 3)})=${nt(225 + 25 * xs[0], 4)}\\ °C`) +
    formula({ en: "real-c" }, `C^*=20+5(${nt(xs[1], 2)})=${nt(20 + 5 * xs[1], 3)}\\ \\%`) +
    formula({ en: "yest" }, `\\hat y_{máx}=${nt(r.yxs, 3)}`) +
    nota({ en: "dentro" }, "Dentro de la región (±1,414) y del tipo buscado ⇒ <strong>es el óptimo</strong>", "ok") +
    `</div><div class="pz-col">` +
    P.superficie(r, { vx: "x1", vy: "x2", lo: -1.6, hi: 1.6, puntos: pts, en: "cont", lado: 250, etqX: "x₁ (T)", etqY: "x₂ (C)", estrella: { x: xs[0], y: xs[1], en: "sol", txt: "máx." } }) +
    p({ en: "cont" }, "Contornos: elipses ⇒ máx./mín. · hipérbolas ⇒ silla") + "</div></div>" },

  { en: "front", html: kicker("¿Y si algo falla?") + titulo("Cuando el punto estacionario no sirve") +
    lista([["front", "Tipo equivocado (mínimo cuando se maximiza, o silla) · o <strong>fuera</strong> de la región"], ["front-b", "⇒ Evaluar ŷ en el <strong>borde</strong>: esquinas y caras, elegir el mejor"], ["front-n", "Nunca extrapolar · <strong>confirmar con corridas reales</strong>"]]) },

  { en: "cierre", html: kicker("Para cerrar") + titulo("Lo que hay que llevarse") +
    lista([["c1", "Codificar −1…+1 · centro repetido ⇒ error puro y falta de ajuste (p alto = bien)"], ["c2", "Central compuesto: esquinas + axiales (α) + centro"], ["c3", "2.º orden: lineales + cuadráticos + interacciones (una regresión)"],
      ["c4", "Derivar = 0 ⇒ x<sub>s</sub> · clasificar con la hessiana"], ["c5", "Unidades reales · ¿tipo buscado? · ¿dentro de la región?"]]) +
    p({ en: "fin" }, "Módulo 24 · Superficie de respuesta") }
] };
