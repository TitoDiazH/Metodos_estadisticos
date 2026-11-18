"use strict";
/* Libro guía cap. 12 ej. 22 — anodizado. Primer ejercicio de superficie de respuesta: explica la materia. */
const P = require("./_p4");
const { G } = require("../generadores/p4datos");
const { n, $, kicker, titulo, formula, nota, lista, p, div, tabla, s, k, C, COL } = P;

const d = G.e22, x1 = d.pH.map((v) => Math.round(((v - 1.5) / 0.3) * 1e6) / 1e6), x2 = d.temp.map((t) => t / 8);
const datos = { y: d.y, x1, x2 };
const r1 = C.ajustar({ datos, formula: "y ~ x1 + x2", falta: ["x1", "x2"] });
const r2 = C.ajustar({ datos, formula: "y ~ x1 * x2", falta: ["x1", "x2"] });
const nt = (x, dd) => s(x, dd || 4).replace(",", "{,}").replace("−", "-");
const mC = (d.y[8] + d.y[9]) / 2, mF = d.y.slice(0, 8).reduce((a, b) => a + b, 0) / 8;
const b1 = r1.coef("x1"), b2 = r1.coef("x2"), paso = b2 / b1;
const pts = x1.map((_, i) => [x1[i], x2[i]]);

/* Las tres formas de una superficie (íconos de contorno) */
const forma = (tipo, color) => `<svg viewBox="0 0 120 90" style="width:9em">` + [1, 2, 3].map((i) => tipo === "silla"
  ? `<path d="M${10 + i * 8},10 Q60,${45 - i * 6} ${110 - i * 8},10 M${10 + i * 8},80 Q60,${45 + i * 6} ${110 - i * 8},80" fill="none" stroke="${color}" stroke-width="2"/>`
  : `<ellipse cx="60" cy="45" rx="${i * 17}" ry="${i * 12}" fill="none" stroke="${color}" stroke-width="2" opacity="${tipo === "loma" ? 1.2 - i * 0.3 : 0.4 + i * 0.2}"/>`).join("") +
  `<text x="60" y="${tipo === "silla" ? 49 : 49}" text-anchor="middle" style="font-size:14px;fill:${color}">${tipo === "loma" ? "▲" : tipo === "valle" ? "▼" : "✕"}</text></svg>`;

module.exports = { escenas: [
  P.portada("Libro guía · Cap. 12, ejercicio 22", "Anodizado: la puerta de entrada a la superficie de respuesta", "Primer ejercicio de superficie · con la materia explicada"),

  P.enunciado("Libro guía · Cap. 12, ej. 22", `Ollas de aluminio con anodizado muy delgado. ${k("clave1", "¿Cómo afectan el pH y la temperatura al espesor?")} ${k("clave2", "10 corridas: 2² con 2 réplicas + 2 al centro")}. ` +
    `${k("clave3", "a) ¿Qué diseño es? b) ¿Qué se gana con el centro? c) Mejor modelo · d) Máximo ascenso (paso 0,3) · e) ¿Y después?")}`,
    tabla([""].concat(d.y.map((_, i) => i + 1)), [["pH"].concat(d.pH.map((v) => n(v, 1))), ["Temperatura"].concat(d.temp), ["Espesor"].concat(d.y)].map((f) => [{ v: f[0], th: true }].concat(f.slice(1))), "pz-mini")),

  { en: "idea", html: kicker("La idea") + titulo("Factores continuos ⇒ la respuesta es una superficie") +
    p({ en: "idea" }, "Antes: niveles fijos (bajo/alto). Ahora pH y temperatura pueden tomar <strong>cualquier valor</strong>.") +
    nota({ en: "sup" }, "El espesor es una <strong>superficie</strong> sobre el plano (pH, temperatura): queremos encontrar su mejor zona") +
    `<div class="pz-cols pz-cols-3" data-en="formas" style="text-align:center">` +
    div({}, forma("loma", COL.am) + p({}, "Loma: <strong>máximo</strong>")) + div({}, forma("valle", COL.ce) + p({}, "Valle: <strong>mínimo</strong>")) + div({}, forma("silla", COL.ro) + p({}, "Silla de montar")) + "</div>" },

  { en: "cod", html: kicker("Paso 0") + titulo("Codificar: todos de −1 a +1") +
    formula({ en: "cod" }, "x=\\dfrac{X-\\text{centro}}{\\text{semirrango}}") +
    `<div class="pz-cols">` +
    div({}, formula({ en: "codph" }, "x_1=\\dfrac{pH-1{,}5}{0{,}3}") + P.calc({ partes: [["codph@4", "pH=1{,}8:\\ \\dfrac{1{,}8-1{,}5}{0{,}3}"]], tRes: "codph@6", res: "+1" })) +
    div({}, formula({ en: "codt" }, "x_2=\\dfrac{T-0}{8}") + P.calc({ partes: [["codt@3", "T=-8:\\ \\dfrac{-8}{8}"]], tRes: "codt@4", res: "−1" })) + "</div>" +
    nota({ en: "codpq" }, "Misma escala ⇒ los coeficientes se pueden <strong>comparar</strong> entre factores", "ok") },

  { en: "dis", html: kicker("a) El diseño") + titulo("Factorial 2² con puntos al centro") +
    `<div class="pz-cols pz-cols-64">` +
    div({}, lista([["esq", "4 esquinas (±1, ±1), cada una <strong>2 veces</strong>"], ["cen", "Centro (0, 0) <strong>2 veces</strong>"], ["limite", "Dos niveles ⇒ solo rectas e interacciones: <strong>no ve curvatura</strong>"]])) +
    div({}, P.superficie(r2, { vx: "x1", vy: "x2", lo: -1.5, hi: 1.5, puntos: pts, enPuntos: "esq", lado: 210, etqX: "x₁ (pH)", etqY: "x₂ (temperatura)", sinColor: true })) + "</div>" },

  { en: "m1", html: kicker("c) Primer modelo") + titulo("Un plano: ŷ = b₀ + b₁x₁ + b₂x₂") +
    P.tablaCoef(r1, { nombres: { x1: "x1 (pH)", x2: "x2 (temp.)" } }) +
    formula({ en: "m1ec" }, `\\hat y=${nt(r1.est[0])}+${nt(b1)}\\,x_1+${nt(b2)}\\,x_2`) +
    lista([["b1", `${$("b_1=" + nt(b1))}: +1 unidad codificada de pH ⇒ +3,375 de espesor`], ["mitad", `De −1 a +1 son 2 unidades ⇒ efecto = ${$("2b_1=" + nt(2 * b1))}: <strong>coeficiente = mitad del efecto</strong>`],
      ["comp", `${$("b_1>b_2")}: el pH pesa más que la temperatura`], ["b0", `${$("b_0=13")}: espesor predicho en el centro del diseño`]]) },

  { en: "centro", html: kicker("b) Lo que aporta el centro") + titulo("Error puro y curvatura") +
    `<div class="pz-cols">` +
    div({}, nota({ en: "puro" }, "Réplicas (centro: 14 y 13; esquinas repetidas) ⇒ <strong>error puro</strong>, sin depender del modelo") +
      nota({ en: "curv" }, "Si fuera un plano: media del centro = media de las esquinas")) +
    div({}, formula({ en: "medias" }, `\\bar y_{centro}=${nt(mC, 3)}\\qquad\\bar y_{esquinas}=${nt(mF, 4)}`)) + "</div>" +
    formula({ en: "lof" }, "F_{FA}=\\dfrac{SC_{FA}/gl_{FA}}{SC_{puro}/gl_{puro}}") +
    P.calc({ partes: [["lofv", `F_{FA}=\\dfrac{${nt(r1.lof.scLof)}/${r1.lof.glLof}}{${nt(r1.lof.scPuro)}/${r1.lof.glPuro}}`]], tRes: "lofv@2", res: n(r1.lof.F, 2) }) +
    nota({ en: "lofv@4" }, `${$("p=" + nt(r1.lof.p, 3))} ⇒ se rechaza: <strong>el plano se queda corto</strong>`, "mal") },

  { en: "m2", html: kicker("c) Segundo modelo") + titulo("Con interacción pH × temperatura") +
    P.tablaCoef(r2, { filas: { "x1:x2": { hl: ["m2t"] } }, clase: "pz-mini" }) +
    formula({ en: "m2ec" }, `\\hat y=13+${nt(r2.coef("x1"))}x_1+${nt(r2.coef("x2"))}x_2+${nt(r2.coef("x1:x2"))}x_1x_2`) +
    nota({ en: "m2t" }, `Interacción: ${$("t=" + nt(r2.t[3], 3) + ",\\ p=" + nt(r2.p[3], 3))} ⇒ significativa`, "ok") +
    nota({ en: "m2r" }, `${$("R^2:\\ " + nt(r1.r2, 3) + "\\to" + nt(r2.r2, 3))} · falta de ajuste ${$("p=" + nt(r2.lof.p, 2))} ⇒ <strong>mejor modelo</strong>`, "ok") +
    formula({ en: "dint" }, `\\frac{\\partial\\hat y}{\\partial x_1}=${nt(r2.coef("x1"))}+${nt(r2.coef("x1:x2"))}\\,x_2`) +
    p({ en: "dintv" }, `Temperatura baja (${$("x_2=-1")}): ${$(nt(r2.coef("x1") - r2.coef("x1:x2")))} · alta (${$("x_2=1")}): ${$(nt(r2.coef("x1") + r2.coef("x1:x2")))} ⇒ el efecto del pH <strong>depende</strong> de la temperatura`) },

  { en: "asc", html: kicker("d) Máximo ascenso (del libro)") + titulo("Hacia dónde sube más rápido") +
    formula({ en: "grad" }, `\\text{dirección}\\propto(b_1,b_2)=(${nt(b1)};\\ ${nt(b2)})`) +
    formula({ en: "paso" }, `\\Delta x_1=1\\ (0{,}3\\text{ de pH})\\qquad \\Delta x_2=\\dfrac{b_2}{b_1}=${nt(paso, 3)}\\ (${nt(8 * paso, 3)}\\ °C)`) +
    tabla(["Paso", "pH", "Temperatura (°C)"], [1, 2, 3, 4, 5].map((j) => [j, { v: n(1.5 + 0.3 * j, 1), en: "puntos" }, { v: n(8 * paso * j, 2), en: "puntos" }]), "pz-chica") +
    nota({ en: "despues" }, "Correr esos puntos hasta que el espesor deje de subir ⇒ ahí, un <strong>central compuesto</strong> y un modelo de 2.º orden (ej. 23)") },

  { en: "fin", html: kicker("Para cerrar") + titulo("Lo que hay que llevarse") +
    lista([["fin", "Codificar: x = (X − centro)/semirrango"], ["fin@4", "Coeficiente codificado = mitad del efecto; b₀ = respuesta en el centro"], ["fin@8", "Centro: error puro + detectar curvatura"],
      ["fin@12", "Falta de ajuste significativa ⇒ el modelo se queda corto"], ["fin@16", "Interacción: ∂ŷ/∂x₁ depende de x₂"]]) }
] };
