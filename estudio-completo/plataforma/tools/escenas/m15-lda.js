/* Pizarra de M15 · LDA. Marcas en tools/guiones/m15-lda.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, sumaVuela, portada, cierre, cod, puntos, COL } = M;

const X = [1.3, 3.7, 5, 5.9, 7.1, 4, 7.9, 5.1, 5.2, 9.8, 9, 12, 6.3, 8.7, 11.1, 9.9];
const Y = [4.1, 6.9, 3, 6.5, 5.4, 2.7, 7.6, 3.8, 1, 4.2, 4.8, 2, 5.2, 1.1, 4.1, 1.6];
/* Recta de Fisher: −0,074·P + 0,067·D = −0,251 ⇒ D = (−0,251 + 0,074 P)/0,067 */
const yF = (x) => (-0.251 + 0.074 * x) / 0.067;
const banco = (lineas) => puntos({ x0: 0, x1: 13, y0: 0, y1: 8.5, ancho: 340, alto: 250, ejes: ["patrimonio", "deuda"], en: { 1: "nuevo" },
  pts: X.map((x, i) => ({ x, y: Y[i], g: i < 8 ? 3 : 0 })).concat([{ x: 7, y: 4, g: 1, et: "nuevo" }]),
  colores: [COL.ve, COL.am, COL.am, COL.ro], extra: lineas });
const lPat = `<line data-en="uni-pat" x1="{X:7}" x2="{X:7}" y1="{Y:0}" y2="{Y:8.5}" stroke="${COL.ce}" stroke-dasharray="5 4" stroke-width="2"/>`;
const lDeu = `<line data-en="uni-deu" x1="{X:0}" x2="{X:13}" y1="{Y:4}" y2="{Y:4}" stroke="${COL.na}" stroke-dasharray="5 4" stroke-width="2"/>`;
const lFis = `<path class="trazo" pathLength="1" data-en="corte-v" d="M{X:3.4},{Y:${yF(3.4).toFixed(2)}} L{X:9.9},{Y:${yF(9.9).toFixed(2)}}" stroke="${COL.am}" stroke-width="3"/>`;

const escenas = [
  portada(15, "Prueba 2", "Clasificación supervisada: LDA", "Una regla para clasificar casos nuevos cuando los grupos ya se conocen"),

  { en: "idea", html: kicker("Ahora los grupos se conocen") + titulo("Banco de Ademuz") +
    `<div class="pz-cols pz-cols-64"><div style="height:50cqh">${banco("")}</div><div class="pz-col">` +
    nota({ en: "sup" }, "Datos históricos con el grupo <strong>conocido</strong>") + nota({ en: "regla" }, "Objetivo: una <strong>regla</strong> para casos nuevos", "ok") +
    tabla(["", "Patrimonio", "Deuda"], [[{ v: "<span class=\"pz-ro\">Fallidos</span> (8)", th: true }, { v: "5", en: "banco-m" }, { v: "5", en: "banco-m" }],
      [{ v: "<span class=\"pz-ve\">Cumplidores</span> (8)", th: true }, { v: "9", en: "banco-m" }, { v: "3", en: "banco-m" }],
      [{ v: "<span class=\"pz-am\">Nuevo</span>", th: true }, { v: "7", en: "nuevo" }, { v: "4", en: "nuevo" }]], "pz-chica") + "</div></div>" },

  { en: "uni", html: kicker("Con una sola variable") + titulo("Cortar en el punto medio de las medias") +
    `<div class="pz-cols pz-cols-64"><div style="height:50cqh">${banco(lPat + lDeu)}</div><div class="pz-col">` +
    calc({ etiqueta: "Patrimonio: ", partes: [["uni-pat", "C=\\frac{5+9}{2}"]], tRes: "uni-pat@2", res: "7" }) +
    nota({ en: "uni-pat-r" }, "Acierta <strong>12 / 16 = 75 %</strong>") +
    calc({ etiqueta: "Deuda: ", partes: [["uni-deu", "C=\\frac{5+3}{2}"]], tRes: "uni-deu@1", res: "4" }) +
    nota({ en: "uni-deu@1.5" }, "Acierta <strong>9 / 16 = 56 %</strong>", "mal") +
    nota({ en: "uni-nuevo" }, "El nuevo (7; 4) cae <strong>justo en los dos cortes</strong>") +
    nota({ en: "uni-r" }, "Se pierde la información de la <strong>combinación</strong>", "ok") + "</div></div>" },

  { en: "fisher", html: kicker("Función discriminante de Fisher") + titulo("Un solo puntaje que combina las variables") +
    formula({ en: "fisher-d" }, "D=u_1\\cdot\\text{Patrimonio}+u_2\\cdot\\text{Deuda}") +
    `<div class="pz-cols">` +
    nota({ en: "fisher-senal" }, "Medias de grupo <strong>lejos</strong> (señal)", "ok") + nota({ en: "fisher-ruido" }, "Datos de cada grupo <strong>juntos</strong> (ruido)") + "</div>" +
    formula({ en: "fisher-f" }, "\\max_u\\ \\frac{u'Fu}{u'Wu}\\quad\\text{(entre / dentro, como el ANOVA)}") +
    formula({ en: "fisher-2g" }, "\\text{2 grupos: }\\ u=W^{-1}(\\bar x_F-\\bar x_C)") +
    p({ en: "nomem", clase: "pz-tenue" }, "La fórmula no se memoriza: hay que entender qué hace") },

  { en: "calc", html: kicker("Ademuz con Fisher") + titulo("Pesos, corte y cliente nuevo") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "calc-dif" }, "\\bar x_F-\\bar x_C=(5-9;\\ 5-3)=(-4;\\ 2)") +
    formula({ en: "calc-w" }, "W=\\begin{pmatrix}66{,}70&14{,}01\\\\14{,}01&45{,}62\\end{pmatrix}") +
    `<p class="pz-f"${M.at({ en: "calc-u" })}>${$("u=(")}<span class="pz-am" data-id="u1">−0,074</span>${$(";\\ ")}<span class="pz-am" data-id="u2">0,067</span>${$(")")}</p>` +
    nota({ en: "calc-sig" }, "Más patrimonio baja D; más deuda lo sube ⇒ D alto = perfil de <span class=\"pz-ro\">fallido</span>") +
    `</div><div class="pz-col">` +
    calc({ etiqueta: "Corte: ", partes: [["corte-f", "\\frac{-0{,}037+(-0{,}466)}{2}"]], tRes: "corte-v", res: "−0,251", idRes: "corte" }) +
    `<div class="pz-caja-calc"${M.at({ en: "nuevo-c" })}><span class="pz-etq">cliente nuevo (7; 4)</span>` +
    `<div class="pz-suma"><span data-en="nuevo-c" data-desde="u1">−0,074</span>·7 <span data-en="nuevo-c@1.5" class="pz-t-op">+</span> <span data-en="nuevo-c@1.5" data-desde="u2">0,067</span>·4 ` +
    `<span data-en="nuevo-r" class="pz-t-op">=</span> <span data-en="nuevo-r" class="pz-res">−0,251</span></div></div>` +
    nota({ en: "nuevo-r@1" }, "Justo en la frontera: un cliente realmente dudoso") + "</div></div>" },

  { en: "acc", html: kicker("Resultado") + titulo("15 de 16 bien clasificados") +
    `<div class="pz-cols pz-cols-64"><div style="height:50cqh">${banco(lFis)}</div><div class="pz-col">` +
    tabla(["Regla", "Aciertos"], [["Solo patrimonio", "75 %"], ["Solo deuda", "56 %"], [{ v: "<strong>Fisher</strong>", en: "acc" }, { v: "<strong>93,75 %</strong>", en: "acc", hl: ["acc"] }]], "pz-chica") +
    nota({ en: "acc-err" }, "Único error: cliente 13 (cumplidor con 6,3 y 5,2)") +
    nota({ en: "escala" }, "Solo importa la <strong>dirección</strong> de u: R da (−0,422; 0,380), la misma regla", "ok") + "</div></div>" },

  { en: "sup2", html: kicker("Supuestos y R") + titulo("Cuándo funciona LDA") +
    `<div class="pz-cols"><div class="pz-col">` +
    lista([["sup-n", "Normalidad multivariada en cada grupo <span class=\"pz-tenue\">(robusto a desviaciones leves)</span>"], ["sup-s", "<strong>Covarianzas iguales</strong> entre grupos · test de Box"], ["sup-i", "Observaciones independientes"]]) +
    nota({ en: "sup-qr" }, "Si Box rechaza ⇒ <strong>QDA</strong> (módulo 16)") + `</div><div class="pz-col">` +
    cod("r", `library(MASS)
modelo <- lda(grupo ~ patrimonio + deuda, data = datos)
pred <- predict(modelo, datos)   # $class $posterior $x
t <- table(Real = datos$grupo, Predicho = pred$class)
sum(diag(t)) / sum(t)`, [["$class $posterior $x", "r-pred"], ["table(Real = datos$grupo, Predicho = pred$class)", "r-conf"], ["sum(diag(t)) / sum(t)", "r-acc"]]) +
    tabla(["Real \\ Pred.", "Cumplidor", "Fallido"], [[{ v: "Cumplidor", th: true }, { v: "7", en: "r-ej" }, { v: "1", en: "r-ej" }], [{ v: "Fallido", th: true }, { v: "0", en: "r-ej" }, { v: "8", en: "r-ej" }]], "pz-chica") + "</div></div>" },

  cierre(15, [["c1", "Supervisado: grupos conocidos, regla para casos nuevos"], ["c2", "Fisher: separar medias y juntar cada grupo"], ["c3", "Se clasifica comparando D con el punto medio"],
    ["c4", "Supuestos: normalidad, covarianzas iguales, independencia"], ["c5", "Ademuz: de 75 % a 93,75 % de aciertos"]])
];
module.exports = { escenas };
