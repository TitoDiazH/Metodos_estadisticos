/* ============================================================================
   Memorizar · M02 Matriz de covarianza, correlación y Bartlett (P1)
   ========================================================================== */
PLATAFORMA.registrar("memorizar", [
  {
    id: "m02-mem-01", modulo: "m02-matrices-bartlett", categoria: "formula",
    titulo: "Matriz de covarianza Σ",
    contenido: String.raw`Simétrica · diagonal = varianzas · <strong>semidefinida positiva</strong> ($z^{\top}\Sigma z\ge0$, valores propios $\ge0$). Muestral: se divide por $n-1$.`,
    fuente: [{ id: "C1", loc: "slides 22–23" }]
  },
  {
    id: "m02-mem-02", modulo: "m02-matrices-bartlett", categoria: "umbral",
    titulo: "¿Puede ser matriz de correlación?",
    contenido: "Diagonal toda 1 · elementos entre −1 y 1 · semidefinida positiva (la pauta pide estas tres). Una matriz cuadrada cualquiera no lo es.",
    fuente: [{ id: "PR-P1-Q1", loc: "afirmación 1" }]
  },
  {
    id: "m02-mem-03", modulo: "m02-matrices-bartlett", categoria: "formula",
    titulo: "Correlación desde covarianzas",
    contenido: String.raw`$r_{ij}=\dfrac{s_{ij}}{\sqrt{s_{ii}s_{jj}}}$ · En R: <code>cor(datos)</code> o <code>cov2cor(S)</code>.`,
    fuente: [{ id: "C1", loc: "slides 25–26" }, { id: "AY1-E", loc: "Parte II, P1" }]
  },
  {
    id: "m02-mem-04", modulo: "m02-matrices-bartlett", categoria: "formula",
    titulo: "Estadístico de Bartlett",
    contenido: String.raw`$\chi^2_B=-\bigl(n-1-\tfrac{2p+5}{6}\bigr)\ln|R|$ · gl $=\tfrac{p(p-1)}{2}$ · $H_0:R=I$.`,
    verifica: [{ que: "coeficiente n=10, p=3", js: "10-1-(2*3+5)/6", esperado: 7.1667, tol: 0.0001 }],
    fuente: [{ id: "AY1-E", loc: "Parte II, P3" }, { id: "AY1-R", loc: "líneas 131–137" }]
  },
  {
    id: "m02-mem-05", modulo: "m02-matrices-bartlett", categoria: "decision",
    titulo: "Decisión del test de Bartlett",
    contenido: "p-valor &lt; α ⇒ se rechaza H0 ⇒ la matriz no es la identidad ⇒ hay correlaciones y PCA/AF tienen sentido. p ≥ α ⇒ no hay evidencia de correlación global. Requiere normalidad multivariante.",
    fuente: [{ id: "C1", loc: "slides 29–30" }, { id: "C4.1", loc: "slide 18" }]
  },
  {
    id: "m02-mem-06", modulo: "m02-matrices-bartlett", categoria: "funcion-R",
    titulo: "<code>psych::cortest.bartlett(R, n = nrow(datos))</code>",
    contenido: "Recibe la matriz de <strong>correlación</strong> y el tamaño de muestra <code>n</code>. Devuelve <code>$chisq</code>, <code>$p.value</code> y <code>$df</code>.",
    fuente: [{ id: "C1", loc: "slide 31" }]
  },
  {
    id: "m02-mem-07", modulo: "m02-matrices-bartlett", categoria: "funcion-R",
    titulo: "<code>cov(datos)</code> · <code>cor(datos)</code> · <code>eigen(S)</code>",
    contenido: "Matriz de covarianza (divide por n−1) · matriz de correlación · valores y vectores propios (los valores propios de S suman la traza).",
    fuente: [{ id: "C1", loc: "slides 24 y 26" }]
  },
  {
    id: "m02-mem-08", modulo: "m02-matrices-bartlett", categoria: "flashcard",
    frente: "No rechazo H0 en el test de Bartlett. ¿Qué concluyo?",
    reverso: "Que no hay evidencia suficiente de correlación entre las variables (con ese n). No que las variables sean independientes.",
    fuente: [{ id: "C1", loc: "slide 30" }, { id: "PR-P1-Q1", loc: "afirmación 4" }]
  }
]);
