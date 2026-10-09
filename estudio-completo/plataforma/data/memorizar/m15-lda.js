/* Memorizar · M15 LDA (P2) */
PLATAFORMA.registrar("memorizar", [
  { id: "m15-mem-01", modulo: "m15-lda", categoria: "decision", titulo: "Supervisado vs no supervisado",
    contenido: "Supervisado: grupos conocidos, se construye una regla de decisión (LDA, QDA, Naive Bayes). No supervisado: se descubren grupos (clustering).",
    fuente: [{ id: "C6.1", loc: "slides 2–3" }] },
  { id: "m15-mem-02", modulo: "m15-lda", categoria: "formula", titulo: "Criterio de Fisher",
    contenido: String.raw`$\max_u \dfrac{u'Fu}{u'Wu}$ (señal/ruido) · 2 grupos: $u=W^{-1}(\bar x_1-\bar x_2)$ · $D=u'x$ · corte $=(\bar D_1+\bar D_2)/2$. Solo importa la dirección de $u$.`,
    fuente: [{ id: "C6.1", loc: "slides 12–13 y 18" }] },
  { id: "m15-mem-03", modulo: "m15-lda", categoria: "salida", titulo: "Banco de Ademuz",
    contenido: "u = (−0,074; 0,067), corte −0,251, cliente (7,4) justo en la frontera. LDA 15/16 = 93,75 % (error: cliente 13). Univariado: patrimonio 75 %, deuda 56,3 %.",
    fuente: [{ id: "C6.1", loc: "slides 7–8 y 16–19" }] },
  { id: "m15-mem-04", modulo: "m15-lda", categoria: "umbral", titulo: "Supuestos de LDA",
    contenido: "Normalidad multivariada (robusto a desviaciones leves) · covarianzas iguales (Box's M) · observaciones independientes.",
    fuente: [{ id: "C6.1", loc: "slide 20" }] },
  { id: "m15-mem-05", modulo: "m15-lda", categoria: "funcion-R", titulo: "<code>MASS::lda</code> y <code>predict</code>",
    contenido: "<code>lda(grupo ~ x1 + x2, data)</code>; <code>predict()</code> → <code>$class</code>, <code>$posterior</code>, <code>$x</code>. Confusión: <code>table(Real, Predicho)</code>; accuracy: <code>sum(diag(t))/sum(t)</code>.",
    fuente: [{ id: "C6.1", loc: "slide 21" }] }
]);
