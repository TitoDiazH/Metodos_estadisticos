/* Pizarra de M06 · Hipótesis, dos poblaciones. Marcas en tools/guiones/m06-hipotesis-dos-poblaciones.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, portada, cierre, cod, COL } = M;
const c = (v, en, extra = {}) => Object.assign({ v, en }, extra);

/* Árbol de decisión */
const caja = (x, y, w, txt, mk, col = COL.ce) => `<g data-en="${mk}"><rect x="${x - w / 2}" y="${y - 18}" width="${w}" height="36" rx="8" fill="none" stroke="${col}" stroke-width="2"/>` +
  `<text x="${x}" y="${y + 5}" text-anchor="middle" style="font-size:13px;fill:${col}">${txt}</text></g>`;
const flecha = (x1, y1, x2, y2, et, mk) => `<g data-en="${mk}"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#9aa" stroke-width="1.5"/>` +
  `<text x="${(x1 + x2) / 2 + 6}" y="${(y1 + y2) / 2}" style="font-size:11px;opacity:.8">${et}</text></g>`;
const arbol = `<svg viewBox="0 0 520 250">` +
  caja(260, 25, 230, "¿Mismos sujetos dos veces?", "arbol-1") + flecha(200, 43, 110, 100, "sí", "arbol-1") + caja(110, 118, 160, "t pareada", "arbol-1", COL.ve) +
  flecha(320, 43, 380, 100, "no", "arbol-2") + caja(380, 118, 190, "¿Varianzas iguales?", "arbol-2") +
  flecha(330, 136, 280, 195, "sí", "arbol-3") + caja(280, 213, 150, "pooled", "arbol-3", COL.am) +
  flecha(430, 136, 450, 195, "no / no sé", "arbol-4") + caja(450, 213, 120, "Welch", "arbol-4", COL.ro) + "</svg>";

const escenas = [
  portada(6, "Prueba 1", "Pruebas de hipótesis: dos poblaciones", "Comparar varianzas, medias independientes y muestras pareadas"),

  { en: "tres", html: kicker("Tres preguntas") + titulo("¿Qué prueba uso?") +
    `<div class="pz-cols pz-cols-37"><div class="pz-col">` +
    lista([["tres-v", "¿Misma variabilidad? ⇒ <strong>F</strong>"], ["tres-m", "¿Misma media? ⇒ <strong>t</strong>"], ["tres-p", "¿Cambió en los mismos sujetos? ⇒ <strong>pareada</strong>"]]) +
    `</div><div style="height:44cqh">${arbol}</div></div>` +
    nota({ en: "welch-def" }, "Recomendación actual: <strong>Welch por defecto</strong>, salvo certeza de varianzas iguales", "ok") +
    p({ en: "welch-enun", clase: "pz-tenue" }, "«Suponga varianzas iguales» ⇒ pooled · no dice nada ⇒ Welch") },

  { en: "f", html: kicker("Comparar varianzas") + titulo("Prueba F") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "f" }, "F=\\frac{s_1^2}{s_2^2}\\sim F_{(n_1-1,\\ n_2-1)}") +
    lista([["f-1", "F ≈ 1 ⇒ varianzas parecidas"], ["f-lejos", "Muy grande o muy chico ⇒ difieren"]]) +
    nota({ en: "f-ojo" }, "Unilateral derecha: la varianza <strong>mayor arriba</strong>") +
    cod("f-r", "var.test(A, B, alternative = \"greater\")") +
    `</div><div class="pz-col"><div class="pz-caja-calc"${M.at({ en: "f-ej" })}><span class="pz-etq">máquinas A y B, n = 10 cada una</span><div class="pz-col">` +
    p({ en: "f-ej-v" }, `${$("s_A^2=2{,}23")} · ${$("s_B^2=1{,}07")}`) +
    calc({ partes: [["f-ej-f", "F=\\frac{2{,}23}{1{,}07}"]], tRes: "f-ej-f@1.5", res: "2,09" }) + "</div></div>" +
    tabla(["F", "gl", "crítico", "p"], [[c("2,09", "f-ej-f@2"), c("(9, 9)", "f-ej-f@2"), c("3,18", "f-ej-crit"), c("0,14", "f-ej-r")]]) +
    nota({ en: "f-ej-r" }, "No se rechaza: con 10 datos no alcanza", "mal") + "</div></div>" },

  { en: "w", html: kicker("Medias, varianzas distintas") + titulo("Welch: precio del limón") +
    formula({ en: "w-f" }, "t=\\frac{(\\bar x_2-\\bar x_1)-\\color{#ffd166}{D_0}}{\\sqrt{s_1^2/n_1+s_2^2/n_2}}") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["", "Media", "n"], [[{ v: "Enero", th: true }, c("1938", "w-ej-d", { id: "x1" }), c("13", "w-ej-d")], [{ v: "Abril", th: true }, c("3560", "w-ej-d", { id: "x2" }), c("15", "w-ej-d")]], "pz-chica") +
    formula({ en: "w-ej-h1" }, "H_1:\\ \\mu_2-\\mu_1>\\color{#ffd166}{1500}") +
    `</div><div class="pz-col"><div class="pz-caja-calc"><span class="pz-etq">cálculo</span><div class="pz-col">` +
    `<div class="pz-suma"><span data-en="w-ej-num" data-desde="x2">3560</span> <span data-en="w-ej-num@1" class="pz-t-op pz-ro">−</span> <span data-en="w-ej-num@1" data-desde="x1">1938</span>` +
    ` <span data-en="w-ej-num@2.4" class="pz-t-op pz-ro">−</span> <span data-en="w-ej-num@2.4" class="pz-am">1500</span> <span data-en="w-ej-num@3.6" class="pz-t-op">=</span> <span data-en="w-ej-num@3.6" class="pz-res">122</span></div>` +
    calc({ partes: [["w-ej-t", "t=\\frac{122}{131{,}4}"]], tRes: "w-ej-t@1.6", res: "0,93" }) + "</div></div>" +
    tabla(["gl", "crítico", "Decisión"], [[c("21,6 <span class=\"pz-tenue\">(no entero)</span>", "w-ej-gl"), c("1,72", "w-ej-gl"), c("No se rechaza", "w-ej-r")]], "pz-chica") +
    cod("w-r", "t.test(abril, enero, mu = 1500, alternative = \"greater\")", [["mu = 1500", "w-ojo", "w-r"]]) + "</div></div>" },

  { en: "p", html: kicker("Medias, varianzas iguales") + titulo("Pooled") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "p-f" }, "S_p^2=\\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}") +
    p({ en: "p-gl" }, `${$("n_1+n_2-2")} grados de libertad (más que Welch)`) +
    cod("p-r", "t.test(A, B, var.equal = TRUE)") +
    `</div><div class="pz-col">` +
    tabla(["", "valor"], [[c("S²ₚ", "p-ej-sp"), c("22 819", "p-ej-sp")], [c("t", "p-ej-t"), c("1,46", "p-ej-t")], [c("gl", "p-ej-t"), c("26", "p-ej-t")], [c("crítico (α = 10 %, bilateral)", "p-ej-crit"), c("1,71", "p-ej-crit")]], "pz-chica") +
    nota({ en: "p-ej-r" }, "|1,46| &lt; 1,71 ⇒ no se rechaza", "mal") + "</div></div>" },

  { en: "par", html: kicker("Muestras pareadas") + titulo("Colesterol antes y después") +
    `<div class="pz-cols"><div class="pz-col">` +
    nota({ en: "par-qr" }, "Son las <strong>mismas personas</strong>: cada antes está unido a un después") +
    formula({ en: "par-d" }, "d_i=\\text{antes}_i-\\text{después}_i") +
    formula({ en: "par-t" }, "t=\\frac{\\bar d}{s_d/\\sqrt n}\\sim t_{n-1}") +
    `</div><div class="pz-col">` +
    tabla(["d̄", "t", "gl", "Decisión"], [[c("19", "par-ej-d"), c("9,06", "par-ej-t"), c("10", "par-ej-t"), c("<strong>Se rechaza</strong>", "par-ej-r")]]) +
    nota({ en: "par-ej-r" }, "d̄ &gt; 0 con antes − después ⇒ el medicamento <strong>baja</strong> el colesterol", "ok") +
    cod("par-r", "t.test(antes, despues, paired = TRUE)", [["paired = TRUE", "par-r"]]) +
    nota({ en: "par-ord" }, "Invertir el orden invierte el signo", "mal") + "</div></div>" },

  cierre(6, [["c1", "F compara varianzas con un cociente"], ["c2", "Independientes: Welch por defecto; pooled solo con varianzas iguales"], ["c3", "Hipótesis con diferencia ≠ 0: argumento mu"], ["c4", "Mismos sujetos: prueba pareada sobre las diferencias"]])
];
module.exports = { escenas };
