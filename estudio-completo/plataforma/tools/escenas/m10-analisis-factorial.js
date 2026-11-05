/* Pizarra de M10 · Análisis factorial (módulo). Marcas en tools/guiones/m10-analisis-factorial.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, sumaVuela, portada, cierre, cod, COL } = M;
const c = (v, en, extra = {}) => Object.assign({ v, en }, extra);

const mat = [["Matemáticas", 0.8, 0.2], ["Física", 0.7, 0.3], ["Química", 0.6, 0.3], ["Inglés", 0.2, 0.8], ["Historia", 0.15, 0.82], ["Dibujo", 0.25, 0.85]];
/* Barra de varianza: común | específica */
const barra = (h2, mk) => `<div data-en="${mk}" style="display:flex;height:3.2cqh;border-radius:4px;overflow:hidden;margin:.6cqh 0">` +
  `<div style="width:${h2 * 100}%;background:${COL.ce}"></div><div style="width:${(1 - h2) * 100}%;background:${COL.ro};opacity:.6"></div></div>`;

const escenas = [
  portada(10, "Prueba 1 · también P4", "Análisis factorial", "Pocos factores latentes que explican las correlaciones"),

  { en: "idea", html: kicker("Factores que no se ven") + titulo("¿Por qué unas variables se parecen más que otras?") +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "idea" }, "Cuestionario de satisfacción con 20 preguntas") +
    nota({ en: "idea-3" }, "Detrás hay pocos <strong>factores latentes</strong> que explican las correlaciones", "ok") +
    nota({ en: "papel" }, "No hay variable dependiente: todas cumplen el mismo papel") +
    `</div><div class="pz-col">` + p({ en: "var" }, "<strong>Varianza de cada variable</strong>") +
    `<div style="display:flex;height:6cqh;border-radius:6px;overflow:hidden;font-size:.8em;text-align:center;line-height:6cqh">` +
    `<div data-en="var-c" style="width:55%;background:${COL.ce};color:#000">común</div><div data-en="var-e" style="width:30%;background:${COL.am};color:#000">específica</div><div data-en="var-u" style="width:15%;background:${COL.ro};color:#000">error</div></div>` +
    nota({ en: "var-af" }, "El AF se concentra en la parte <strong>común</strong>") +
    nota({ en: "vs-pca-r" }, "PCA: toda la varianza · AF (factores comunes): solo la compartida") + "</div></div>" },

  { en: "mod", html: kicker("El modelo") + titulo("Comunalidad y especificidad") +
    formula({ en: "mod" }, "X_i=a_{i1}F_1+a_{i2}F_2+\\dots+u_i") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "h2-def" }, "h_i^2=\\sum_j a_{ij}^2\\qquad \\psi_i=1-h_i^2") +
    tabla(["Matemáticas", "F₁", "F₂"], [[{ v: "carga", th: true }, c("0,8", "ej-ma", { id: "a1" }), c("0,2", "ej-ma", { id: "a2" })]], "pz-chica") +
    nota({ en: "ej-err" }, "Se suman los cuadrados de <strong>toda la fila</strong>", "mal") +
    `</div><div class="pz-col"><div class="pz-caja-calc"><span class="pz-etq">matemáticas</span><div class="pz-col">` +
    sumaVuela({ etiqueta: "h²", terms: [{ v: 0.8, desde: "a1" }, { v: 0.2, desde: "a2" }], tiempos: ["ej-ma-c", "ej-ma-c@1.5"], tRes: "ej-ma-r", idRes: "h2", cuadrado: true }) +
    calc({ partes: [["ej-ma-psi", "\\psi=1-0{,}68"]], tRes: "ej-ma-psi@1.2", res: "0,32" }) + "</div></div>" +
    barra(0.68, "ej-ma-lee") + p({ en: "ej-ma-lee", clase: "pz-tenue" }, "<span class=\"pz-ce\">68 % explicado</span> · <span class=\"pz-ro\">32 % propio</span>") + "</div></div>" },

  { en: "adec", html: kicker("¿Los datos sirven?") + titulo("Bartlett y KMO") +
    `<div class="pz-cols"><div class="pz-col">` +
    nota({ en: "adec-b" }, "<strong>Bartlett</strong> (M02): H₀ R = I; si se rechaza, hay correlación") +
    nota({ en: "kmo-def" }, "<strong>KMO</strong>: correlaciones simples vs. <strong>parciales</strong> (controlando las demás)") +
    p({ en: "kmo-idea", clase: "pz-tenue" }, "Si comparten factores, las parciales son chicas ⇒ KMO alto") +
    `</div><div class="pz-col">` +
    tabla(["KMO", "Lectura"], [[c("≥ 0,75", "kmo-075"), c("bien", "kmo-075")], [c("≥ 0,5", "kmo-05"), c("aceptable", "kmo-05")], [c("&lt; 0,5", "kmo-mal"), c("no conviene", "kmo-mal")]]) +
    calc({ etiqueta: "Notas: ", partes: [["kmo-ej", "0{,}35"], ["kmo-ej2", "\\xrightarrow{\\text{sin lenguaje, música, ed. física}}"]], tRes: "kmo-ej2@3", res: "0,61" }) + "</div></div>" },

  { en: "ext", html: kicker("Extraer factores") + titulo("Cuántos y con qué método") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "ext-gl" }, "k\\le\\frac{p-1}{2}") + p({ en: "ext-gl-ej", clase: "pz-tenue" }, "Con 4 variables: a lo más 1 factor") +
    tabla(["Método", "Rasgo"], [[c("Componentes principales", "met-cp"), c("siempre da solución; toda la varianza", "met-cp")], [c("Ejes principales", "met-ep"), c("comunalidades en la diagonal; itera", "met-ep")], [c("Máxima verosimilitud", "met-mv"), c("supone normalidad; prueba χ² de ajuste", "met-mv")]], "pz-mini") +
    `</div><div class="pz-col">` +
    lista([["cu-k", "Kaiser: λ &gt; 1 <span class=\"pz-tenue\">(se queda corto)</span>"], ["cu-80", "75–80 % de la varianza"], ["cu-scree", "Codo del scree plot"], ["cu-par", "Análisis paralelo: real vs. simulado"]]) +
    `<div class="pz-caja-calc"${M.at({ en: "cu-pauta" })}><span class="pz-etq">pauta: 6 variables, 2 factores</span>` +
    calc({ partes: [["cu-pauta@3", "\\frac{2{,}51+1{,}74}{6}"]], tRes: "cu-pauta@5", res: "70,9 %" }) + "</div></div></div>" },

  { en: "rot", html: kicker("Rotar") + titulo("Girar los ejes para leer mejor") +
    `<div class="pz-cols"><div class="pz-col">` +
    nota({ en: "nounica" }, "La solución <strong>no es única</strong>: girar los ejes da otra igual de válida") +
    nota({ en: "rot-def" }, "Se busca <strong>estructura simple</strong>: cada variable fuerte en un solo factor", "ok") +
    tabla(["Matemáticas", "F₁", "F₂", "h²"], [[c("Inicial", "rot-ej"), c("0,80", "rot-ej"), c("0,20", "rot-ej"), c("0,68", "rot-ej")], [c("Rotada 45°", "rot-ej@2"), c("0,42", "rot-ej@2"), c("0,71", "rot-ej@2"), c("<strong>0,68</strong>", "rot-ej@4", { hl: ["rot-ej@4"] })]], "pz-chica") +
    nota({ en: "rot-r" }, "La rotación <strong>no cambia</strong> las comunalidades ni la varianza total", "ok") +
    `</div><div class="pz-col">` +
    tabla(["Familia", "Métodos", "Factores"], [[c("Ortogonal", "rot-ort"), c("<strong>varimax</strong>, quartimax, equamax", "rot-ort"), c("sin correlación", "rot-ort")], [c("Oblicua", "rot-obl"), c("oblimin, promax", "rot-obl"), c("correlacionados", "rot-obl")]], "pz-mini") +
    tabla(["", "F₁", "F₂"], mat.map(([nm, a, b], i) => [{ v: nm, th: true }, c(n(a, 2), "interp", { hl: a > 0.5 ? ["interp-ej", "interp-ej2"] : null }), c(n(b, 2), "interp", { hl: b > 0.5 ? ["interp-ej2", "r"] : null })]), "pz-mini") +
    `<p><span data-en="interp-ej">F₁: <span class="pz-am">científica</span></span> · <span data-en="interp-ej2">F₂: <span class="pz-ce">humanística</span></span></p>` + "</div></div>" },

  { en: "r", html: kicker("En R") + titulo("psych::fa") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col">` +
    cod("r", `datos <- scale(USArrests)
KMO(datos); cortest.bartlett(cor(datos), n = nrow(datos))
fa.parallel(datos, fa = "fa")
fa(datos, nfactors = 2, rotate = "varimax")`, [["scale(USArrests)", "r-1"], ["KMO(datos); cortest.bartlett(cor(datos), n = nrow(datos))", "r-2"], ["fa.parallel(datos, fa = \"fa\")", "r-3"], ["fa(datos, nfactors = 2, rotate = \"varimax\")", "r-4"]]) +
    `<pre class="pz-code"${M.at({ en: "r-sal" })}><code>          MR1  MR2   <span data-hl="r-h2 r-u2">h2</span>   <span data-hl="r-u2 r-com">u2</span>  <span data-hl="r-com r-ej">com</span>
Murder   0.95 0.10 0.90 0.10  1.0
Assault  0.84 0.30 0.80 0.20  1.3
UrbanPop 0.06 0.67 0.45 0.55  1.0
Rape     0.59 0.56 0.66 0.34  <span data-hl="r-ej-com">2.0</span></code></pre>` +
    `</div><div class="pz-col">` +
    tabla(["Columna", "Es"], [[c("h2", "r-h2"), c("comunalidad", "r-h2")], [c("u2", "r-u2"), c("especificidad = 1 − h2", "r-u2")], [c("com", "r-com"), c("en cuántos factores carga", "r-com")]], "pz-chica") +
    nota({ en: "r-ej-com" }, "Rape carga en los dos factores ⇒ complejidad 2") +
    nota({ en: "signo" }, "El signo de un factor es arbitrario") + "</div></div>" },

  cierre(10, [["c1", "Pocos factores latentes explican las correlaciones"], ["c2", "h² = Σ cargas²; ψ = 1 − h²"], ["c3", "Antes: Bartlett y KMO"], ["c4", "Rotar para interpretar; no cambia h²"], ["c5", "En R: h2, u2 y com"]])
];
module.exports = { escenas };
