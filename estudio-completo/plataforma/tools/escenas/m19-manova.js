/* Pizarra de M19 · MANOVA. Marcas en tools/guiones/m19-manova.txt. */
"use strict";
const { n, at, $, formula, nota, kicker, titulo, tabla, lista, div, p, span, COL } = require("./_lib");
const c = (v, m, extra = {}) => Object.assign({ v, en: m }, extra);

/* Nubes correlacionadas: mirando un eje a la vez se superponen; en el plano se separan. */
function nubes() {
  /* Correlación positiva: en pantalla, la nube se alarga en la dirección (1, −1); los grupos se desplazan en (1, 1). */
  const grupos = [{ d: -30, col: COL.ce }, { d: 0, col: COL.am }, { d: 30, col: COL.ro }];
  let s = `<svg viewBox="0 0 300 240"><path class="ejes" d="M30,10 V210 H290"/>` +
    `<text x="160" y="232" text-anchor="middle">química</text><text x="14" y="110" transform="rotate(-90 14 110)" text-anchor="middle">física</text>`;
  let semilla = 11;
  const azar = () => (semilla = (semilla * 9301 + 49297) % 233280) / 233280 - 0.5;
  grupos.forEach((g) => {
    s += `<g${at("prob2")}>`;
    for (let i = 0; i < 16; i++) {
      const t = azar() * 190, u = azar() * 26;
      const x = 160 + (t + g.d + u) * 0.707, y = 110 + (-t + g.d + u) * 0.707;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.6" fill="${g.col}" opacity=".85"/>`;
    }
    s += "</g>";
  });
  return s + `<text x="288" y="22" text-anchor="end" style="font-size:12px"${at("potencia")}>juntas, se separan</text></svg>`;
}

const escenas = [
  { en: "inicio", html: `<div class="pz-centro">${kicker("Módulo 19 · Prueba 3")}` +
    `<h3 class="pz-t" style="font-size:2.4em">MANOVA</h3>` + p({ clase: "pz-st" }, "El ANOVA cuando la respuesta es un vector") + "</div>" },

  { en: "caso", html: kicker("Por qué no basta con varios ANOVA") + titulo("30 estudiantes · 3 metodologías · 3 notas") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col">` +
    tabla(["Metodología", "n", "Respuestas"], [
      ["Tradicional", "10", c("Q · F · B", "tres")], ["Basado en problemas", "10", c("Q · F · B", "tres")], ["Basado en proyectos", "10", c("Q · F · B", "tres")]
    ]) +
    p({ en: "tentacion" }, `¿Tres ANOVA, uno por asignatura, y listo?`) +
    nota({ en: "prob1" }, "① Cada prueba suma su riesgo ⇒ el <strong>error tipo I global</strong> se infla", "mal") +
    nota({ en: "prob2" }, "② Se pierde la <strong>correlación</strong> entre las notas", "mal") +
    `</div><div class="pz-col"><div style="height:46cqh">${nubes()}</div>` +
    nota({ en: "solucion" }, "MANOVA: <strong>una sola prueba</strong> con todas las variables", "ok") + "</div></div>" },

  { en: "vector", html: kicker("Idea central") + `<div class="pz-centro">` +
    `<p style="font-size:1.5em">ANOVA: respuesta ${$("y")} &nbsp;→&nbsp; MANOVA: respuesta ${$("\\mathbf{y}=\\begin{pmatrix}y_Q\\\\y_F\\\\y_B\\end{pmatrix}")}</p></div>` },

  { en: "hip", html: kicker("Hipótesis y supuestos") + titulo("Se comparan vectores de medias") +
    formula({ en: "h0" }, "H_0:\\;\\boldsymbol\\mu_{Trad}=\\boldsymbol\\mu_{ABP}=\\boldsymbol\\mu_{ABPr},\\qquad \\boldsymbol\\mu=(\\mu_Q,\\mu_F,\\mu_B)") +
    p({ en: "h1" }, `${$("H_1")}: al menos un vector de medias es distinto`) +
    lista([["sup1", "Normalidad <strong>multivariada</strong> dentro de cada grupo"], ["sup2", `Misma matriz de covarianzas ${$("\\Sigma")} en todos los grupos`],
      ["sup3", "Observaciones independientes"]]) +
    nota({ en: "matriz" }, `La homogeneidad es de la <strong>matriz completa</strong> ${$("\\Sigma")}: varianzas y covarianzas`) },

  { en: "wb", html: kicker("De sumas de cuadrados a matrices") + titulo("Dentro, entre y total") +
    tabla(["ANOVA", "MANOVA (matrices p × p)"], [
      [c($("SC_E"), "w"), c(`${$("\\mathbf W")}: dentro de los grupos`, "w")],
      [c($("SC_{TRAT}"), "b"), c(`${$("\\mathbf B")}: entre grupos`, "b")],
      [c($("SC_T"), "t"), c(`${$("\\mathbf T=\\mathbf W+\\mathbf B")}`, "t")]
    ]) + p({ en: "lambda", clase: "pz-tenue" }, "¿Cómo resumir dos matrices en un solo número?") },

  { en: "lambda-f", html: kicker("Lambda de Wilks") + titulo("Dentro sobre total") +
    formula({ en: "lambda-f" }, "\\Lambda=\\frac{|\\mathbf W|}{|\\mathbf T|}=\\frac{|\\mathbf W|}{|\\mathbf W+\\mathbf B|}\\qquad\\text{(dentro sobre total)}") +
    `<div class="pz-cols">` +
    nota({ en: "exp-uno" }, `Grupos parecidos: ${$("\\mathbf B\\approx0\\Rightarrow\\Lambda\\approx1")}`) +
    nota({ en: "exp-cero" }, `Grupos separados: ${$("\\mathbf B")} grande ${$("\\Rightarrow\\Lambda\\to0")}`) + "</div>" +
    nota({ en: "rechazo" }, "Se rechaza H₀ cuando Λ es <strong>pequeña</strong>", "ok") +
    p({ en: "otros", clase: "pz-tenue" }, `Otros: Pillai · Lawley–Hotelling · Roy — todos a partir de los valores propios de ${$("\\mathbf W^{-1}\\mathbf B")}`) },

  { en: "r", html: kicker("En R") + titulo("Metodologías de enseñanza") +
    `<pre class="pz-code"${at("r-cbind")}><code>modelo &lt;- manova(<span class="pz-am">cbind(quimica, fisica, biologia)</span> ~ metodologia, data = datos)
summary(modelo, test = "Wilks")</code></pre>` +
    tabla(["", "Df", "Wilks", "approx F", "num Df", "den Df", "Pr(>F)"], [
      ["metodologia", "2", c("0,04896", "r-lambda", { hl: ["r-lambda", "r-f"] }), c("29,329", "r-f", { hl: ["r-f", "gl"] }),
        c("6", "gl-r", { hl: ["gl-r", "r-p"] }), c("50", "gl-r"), c("≈ 9·10⁻¹⁵", "r-p", { hl: ["r-p", "r-conc"] })]
    ], "pz-chica") +
    formula({ en: "gl" }, "\\text{num Df}=p\\,(g-1)=3\\cdot2=6") +
    nota({ en: "r-conc" }, "Se rechaza H₀: la metodología afecta el rendimiento conjunto", "ok") +
    nota({ en: "gl-error" }, "Error típico: usar solo g − 1 = 2", "mal") },

  { en: "rev", html: kicker("Revisar los supuestos") + titulo("Mardia y M de Box") +
    `<div class="pz-cols">` +
    lista([["mardia", "Normalidad multivariada: <strong>Mardia</strong> o QQ de Mahalanobis"],
      ["box", "Homogeneidad de covarianzas: <strong>M de Box</strong>"]]) +
    formula({ en: "box-gl" }, "gl=\\frac{p(p+1)}{2}(g-1)=\\frac{3\\cdot4}{2}\\cdot2=12") + "</div>" +
    nota({ en: "box-sig" }, "Ejemplo: Box sale significativo (12 gl) ⇒ covarianzas distintas… ¿el MANOVA ya no sirve?", "mal") +
    nota({ en: "robusto" }, "Con grupos de igual tamaño (10, 10, 10) es robusto: se interpreta con cautela", "ok") +
    `<div class="pz-cols">` + nota({ en: "pillai" }, "Si falla la homogeneidad ⇒ mirar <strong>Pillai</strong>") +
    nota({ en: "transf" }, "Si falla la normalidad ⇒ transformar") + "</div>" },

  { en: "lda", html: kicker("MANOVA y discriminante") + titulo("Dos caras del mismo problema") +
    tabla(["", "MANOVA", "Discriminante"], [[c("Pregunta", "lda-preg"), c("¿Difieren los grupos?", "lda-preg"), c("¿Cómo y en qué dirección se separan?", "lda-preg")],
      [c("Usa", "lda"), c($("\\mathbf W,\\ \\mathbf B"), "lda"), c(`vectores propios de ${$("\\mathbf W^{-1}\\mathbf B")}`, "lda-vp")]]) +
    `<div class="pz-cols">` +
    formula({ en: "roy" }, "\\text{Roy}=\\lambda_{\\max}(\\mathbf W^{-1}\\mathbf B)") + formula({ en: "lh" }, "\\text{Lawley–Hotelling}=\\textstyle\\sum\\lambda_i") + "</div>" +
    p({ en: "iris-vp" }, `Iris: ${$("\\lambda=32{,}19;\\ 0{,}29")} ⇒ Roy = 32,19 · L–H = 32,48`) +
    nota({ en: "secuencia" }, "Primero MANOVA → si difieren, discriminante", "ok") },

  { en: "post", html: kicker("Después de rechazar") + titulo("Post hoc: ¿qué variable y qué grupos?") +
    `<div class="pz-cols"><div class="pz-col">` +
    `<pre class="pz-code"${at("post-aov")}><code>summary.aov(modelo)   # un ANOVA por variable
TukeyHSD(aov(quimica ~ metodologia))</code></pre>` +
    tabla(["Variable", "F"], [[c("Química", "post-aov"), c("≈ 180,7", "post-aov")], [c("Física", "post-aov"), c("≈ 32,6", "post-aov")], [c("Biología", "post-aov"), c("≈ 20,8", "post-aov")]], "pz-chica") +
    `</div><div class="pz-col">` +
    nota({ en: "tukey" }, "Tukey en química: las 3 metodologías difieren · proyectos ≈ 81 (la más alta), tradicional ≈ 62") +
    nota({ en: "iris" }, "Iris: Λ = 0,0234 · F ≈ 199 con (8, 288) gl · p ≈ 0") + "</div></div>" },

  { en: "cierre", html: kicker("Para cerrar") + titulo("Lo esencial del MANOVA") +
    lista([["c1", "Una sola prueba para vectores de medias (no varios ANOVA)"], ["c2", "Λ = |W| / |W + B| · se rechaza si es <strong>pequeña</strong>"],
      ["c3", "num Df = p (g − 1)"], ["c4", "Mardia (normalidad) · Box (covarianzas) · si falla Box ⇒ Pillai"],
      ["ultima-r", "Después: ANOVA por variable + Tukey · dirección: discriminante"]]) }
];

module.exports = { escenas };
