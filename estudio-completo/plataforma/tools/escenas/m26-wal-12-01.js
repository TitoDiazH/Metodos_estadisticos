"use strict";
/* Walpole 12.1 — horno. Primer ejercicio de regresión: explica la materia mientras resuelve. */
const P = require("./_p4");
const { W } = require("../generadores/p4datos");
const { n, $, kicker, titulo, formula, nota, lista, p, div, tabla, s, k, C } = P;

const d = W.e12_1;
const r = C.ajustar({ datos: d, formula: "y ~ x1 + x2", vif: true });
const se2 = r.se[2], t2 = (r.est[2] - 2) / se2;
const pa = require("../generadores/lib").Rn(`2 * pt(-abs(${t2}), ${r.gl})`);
const sin10 = C.ajustar({ datos: { y: d.y.slice(0, 9), x1: d.x1.slice(0, 9), x2: d.x2.slice(0, 9) }, formula: "y ~ x1 + x2" });
const nt = (x, dd) => n(x, dd).replace(",", "{,}").replace("−", "-");

module.exports = { escenas: [
  P.portada("Walpole · Ejercicio 12.1", "El horno: regresión múltiple de principio a fin", "Primer ejercicio de la P4 · con la materia explicada"),

  P.enunciado("Walpole · Ejercicio 12.1", `Diez ensayos con un horno. ${k("clave1", "Respuesta: tiempo de cocción y")} · ${k("clave2", "regresores: ancho del horno x₁ y temperatura x₂")}. ` +
    `${k("clave3", "Estime μ<sub>Y|x₁,x₂</sub> = β₀ + β₁x₁ + β₂x₂")} (+ preguntas del Instructivo P4).`,
    tabla([""].concat(d.y.map((_, i) => i + 1)), [["y"].concat(d.y.map((v) => n(v, 2))), ["x₁"].concat(d.x1.map((v) => n(v, 2))), ["x₂"].concat(d.x2.map((v) => n(v, 2)))].map((f) => [{ v: f[0], th: true }].concat(f.slice(1))), "pz-mini")),

  { en: "idea", html: kicker("La idea") + titulo("Una x → recta · dos x → plano") +
    formula({ en: "modelo" }, "Y=\\beta_0+\\beta_1x_1+\\beta_2x_2+\\varepsilon") +
    `<div class="pz-cols">` +
    div({}, nota({ en: "mc" }, `Mínimos cuadrados: el plano que hace mínima ${$("\\sum e_i^2")}`) +
      formula({ en: "residuo" }, "e_i=y_i-\\hat y_i") +
      p({ en: "residuo", clase: "pz-tenue" }, "Al cuadrado para que positivos y negativos no se cancelen")) +
    div({}, formula({ en: "matriz" }, "\\mathbf b=(X'X)^{-1}X'\\mathbf y") + P.codigo("matriz", "modelo <- lm(y ~ x1 + x2, data = datos)\nsummary(modelo)")) + "</div>" },

  { en: "sal", html: kicker("Leer la salida de R") + titulo("Las cuatro columnas de summary()") +
    P.tablaCoef(r, { hlCol: [null, ["est", "se"], ["se", "tval"], ["tval", "pval"], ["pval"]] }) +
    formula({ en: "ecuacion" }, `\\hat y=${nt(r.est[0], 2)}+${nt(r.est[1], 3)}\\,x_1+${nt(r.est[2], 3)}\\,x_2`) +
    `<div class="pz-cols">` +
    div({}, p({ en: "se" }, `<span class="pz-ce">Std. Error</span>: cuánto variaría la estimación con otros 10 ensayos`) +
      P.calc({ partes: [["tcalc", `t=\\dfrac{b_1}{ee(b_1)}=\\dfrac{${nt(r.est[1], 3)}}{${nt(r.se[1], 4)}}`]], tRes: "tcalc@3", res: n(r.t[1], 2) }) +
      nota({ en: "tsig" }, "La estimación está a <strong>13 errores estándar</strong> de 0", "ok")) +
    div({}, formula({ en: "gl" }, `gl=n-k-1=10-2-1=${r.gl}`) + formula({ en: "tcrit" }, `t_{0{,}975;\\,7}=${nt(r.tcrit, 3)}`) +
      p({ en: "pval" }, `<span class="pz-ce">Pr(&gt;|t|)</span>: probabilidad de un t así de extremo si ${$("H_0")} fuera cierta`)) + "</div>" },

  { en: "h0", html: kicker("Pruebas t") + titulo("Estadístico · decisión · contexto") +
    formula({ en: "h0" }, "H_0:\\beta_i=0\\quad\\text{vs}\\quad H_1:\\beta_i\\neq0") +
    nota({ en: "tres" }, "El Instructivo P4: no basta «se rechaza». Siempre <strong>1)</strong> estadístico o valor-p, <strong>2)</strong> decisión, <strong>3)</strong> conclusión en el contexto") +
    lista([["r1", `Ancho: ${$("t=" + nt(r.t[1], 2))}, ${$("p<0{,}0001")} ⇒ se rechaza ⇒ <strong>el ancho influye</strong> en el tiempo de cocción`],
      ["r2", `Temperatura: ${$("t=" + nt(r.t[2], 2))}, ${$("p<0{,}0001")} ⇒ se rechaza ⇒ <strong>la temperatura influye</strong>`],
      ["r0", `Intercepto: ${$("t=" + nt(r.t[0], 2))}, ${$("p=" + nt(r.p[0], 3))} ⇒ no se rechaza`]]) },

  { en: "alfa", html: kicker("Instructivo: H₀: βᵢ = αᵢ") + titulo("¿Cada unidad de temperatura agrega 2 min?") +
    formula({ en: "alfa" }, "H_0:\\beta_2=2\\quad\\text{vs}\\quad H_1:\\beta_2\\neq2") +
    nota({ en: "ojo" }, "El <code>t value</code> de R compara con <strong>0</strong>: para comparar con 2 se calcula a mano", "mal") +
    P.calc({ partes: [["alfacalc", `t=\\dfrac{b_2-2}{ee(b_2)}=\\dfrac{${nt(r.est[2], 4)}-2}{${nt(se2, 4)}}`]], tRes: "alfacalc@4", res: n(t2, 2) }) +
    nota({ en: "alfadec" }, `${$("|t|=" + nt(t2, 2) + "<2{,}365")}, ${$("p=" + nt(pa, 2))} ⇒ no se rechaza: compatible con <strong>2 min por unidad</strong>`, "ok") },

  { en: "interp", html: kicker("Interpretar") + titulo("Cada coeficiente, con lo demás fijo") +
    lista([["b1", `${$("b_1=" + nt(r.est[1], 2))}: +1 unidad de ancho ⇒ +2,7 min en promedio, <span class="pz-am" data-en="ceteris">manteniendo la temperatura constante</span>`],
      ["b2", `${$("b_2=" + nt(r.est[2], 2))}: +1 unidad de temperatura ⇒ +2,05 min, con el ancho fijo`],
      ["b0", `${$("b_0=" + nt(r.est[0], 2))}: ancho 0 y temperatura 0 → fuera del rango ⇒ <strong>no se interpreta</strong>`]]) +
    formula({ en: "deriv" }, "\\frac{\\partial\\hat y}{\\partial x_1}=b_1=2{,}71\\quad(\\text{constante en un modelo lineal})") },

  { en: "f", html: kicker("¿Sirve el modelo?") + titulo("Prueba F global") +
    formula({ en: "f" }, "H_0:\\beta_1=\\beta_2=0") +
    formula({ en: "desc" }, "\\underbrace{STC}_{\\text{total}}=\\underbrace{SCR}_{\\text{explica}}+\\underbrace{SCE}_{\\text{no explica}}") +
    formula({ en: "scs" }, `${nt(r.sct, 1)}=${nt(r.scr, 1)}+${nt(r.sce, 2)}`) +
    `<div class="pz-cols">` +
    div({}, P.calc({ partes: [["fcalc", `F=\\dfrac{SCR/k}{SCE/(n-k-1)}=\\dfrac{${nt(r.scr, 1)}/2}{${nt(r.sce, 3)}/7}`]], tRes: "fres", res: s(r.F, 5) }) +
      nota({ en: "fres" }, `${$("F_{0{,}95;2,7}=" + nt(r.Fcrit, 2))} ⇒ se rechaza: <strong>el modelo explica el tiempo de cocción</strong>`, "ok")) +
    div({}, P.calc({ partes: [["rcuad", `R^2=\\dfrac{SCR}{STC}=\\dfrac{${nt(r.scr, 1)}}{${nt(r.sct, 1)}}`]], tRes: "rcuad@3", res: n(r.r2, 4) }) +
      formula({ en: "r2aj" }, `R^2_{aj}=1-(1-R^2)\\dfrac{n-1}{n-k-1}=${nt(r.r2a, 4)}`) +
      p({ en: "r2aj@6", clase: "pz-tenue" }, "R² siempre sube al agregar variables; el ajustado penaliza cada parámetro")) + "</div>" },

  { en: "sup", html: kicker("Supuestos") + titulo("Se revisan con los residuos") +
    `<div class="pz-cols">` +
    div({}, p({ en: "lin" }, "<span class=\"pz-ce\">Residuos vs ajustados</span>: sin curva (linealidad) ni embudo (varianza constante)") + P.residuos(r, { en: "lin" })) +
    div({}, p({ en: "qq" }, "<span class=\"pz-ce\">Q-Q</span>: los puntos siguen la diagonal") + P.qq(r, { en: "qq", enLinea: "qq" })) + "</div>" +
    nota({ en: "sw" }, `Shapiro–Wilk (${$("H_0")}: normalidad): ${$("p=" + nt(r.sw, 3))} ⇒ no se rechaza`, "ok") +
    p({ en: "indep", clase: "pz-tenue" }, "Independencia: residuos en el orden de los ensayos, sin rachas del mismo signo") },

  { en: "vif", html: kicker("Problemas del modelo") + titulo("Multicolinealidad: VIF") +
    `<div class="pz-cols">` +
    div({}, formula({ en: "viff" }, "VIF_j=\\dfrac{1}{1-R_j^2}") +
      formula({ en: "vifv" }, "VIF=8{,}27\\;\\Leftrightarrow\\;r_{x_1x_2}=0{,}94") +
      nota({ en: "vifd" }, "Entre 5 y 10: <strong>moderada</strong>. Infla los errores estándar, pero aquí los t igual son enormes")) +
    div({}, P.barras({ en: "vifv", valores: r.vif, etiquetas: ["x₁", "x₂"], corte: 5, etqCorte: "5", max: 11, mostrar: true, color: "#ffa94d" })) + "</div>" },

  { en: "hat", html: kicker("Problemas del modelo") + titulo("Apalancamiento y distancia de Cook") +
    `<div class="pz-cols">` +
    div({}, formula({ en: "hat" }, `h_{ii}>\\dfrac{2(k+1)}{n}=\\dfrac{2\\cdot3}{10}=0{,}6`) +
      P.barras({ en: "hat", valores: r.hat, etiquetas: r.hat.map((_, i) => i + 1), corte: r.hcorte, etqCorte: "0,6", max: 1, alto: 150 }) +
      p({ en: "hatv" }, `Ensayo 8: ${$("h=" + nt(r.hat[7], 3))}, justo sobre el corte`)) +
    div({}, formula({ en: "cook" }, "D_i>1\\;\\Rightarrow\\;\\text{influyente}") +
      P.barras({ en: "cook", valores: r.cook, etiquetas: r.cook.map((_, i) => i + 1), corte: 1, etqCorte: "1", max: 2, alto: 150 }) +
      p({ en: "cookv" }, `Ensayo 10: ${$("D=" + nt(r.cook[9], 2))} ⇒ <strong class="pz-ro">influyente</strong>`) +
      p({ en: "cookq" }, `Sin él: ${$("b_1")} pasa de ${n(r.est[1], 2)} a ${n(sin10.est[1], 2)}`)) + "</div>" +
    nota({ en: "cookn" }, "No se elimina automáticamente: primero se revisa si es un error de registro; si es real, se informa") },

  { en: "fin", html: kicker("Para cerrar") + titulo("El camino de una pregunta de regresión") +
    lista([["fin", "Modelo ajustado → interpretar cada b con lo demás fijo"], ["fin@4", "t de cada β: estadístico, decisión, contexto (y contra αᵢ a mano)"],
      ["fin@9", "F global · R² y R² ajustado"], ["fin@13", "Supuestos: residuos, Q-Q, Shapiro"], ["fin@17", "VIF · apalancamiento · Cook"]]) }
] };
