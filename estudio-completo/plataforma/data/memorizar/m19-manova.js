/* Memorizar · M19 MANOVA (P2) */
PLATAFORMA.registrar("memorizar", [
  { id: "m19-mem-01", modulo: "m19-manova", categoria: "decision", titulo: "Por qué MANOVA",
    contenido: "Compara vectores de medias de g grupos con p respuestas. Evita inflar el error tipo I de p ANOVA y usa la correlación entre variables. H0: μ1 = … = μg.",
    fuente: [{ id: "C7.2", loc: "slides 26–28" }] },
  { id: "m19-mem-02", modulo: "m19-manova", categoria: "umbral", titulo: "Supuestos",
    contenido: "Normalidad multivariada (Mardia) · misma Σ en todos los grupos (Box's M) · independencia. Con n iguales, relativamente robusto a Box's M; si falla homogeneidad, Pillai es el más robusto.",
    fuente: [{ id: "C7.2", loc: "slides 28 y 31" }, { id: "CMAN", loc: "página 13" }] },
  { id: "m19-mem-03", modulo: "m19-manova", categoria: "formula", titulo: "W, B, T y Wilks",
    contenido: String.raw`$T=W+B$ · $\Lambda=|W|/|W+B|$ · rechazar si $\Lambda$ es <strong>pequeña</strong> · numDf $=p(g-1)$ · Pillai, Lawley–Hotelling y Roy vienen de los valores propios de $W^{-1}B$ (Roy = el mayor).`,
    fuente: [{ id: "C7.2", loc: "slides 29–30" }, { id: "CMAN", loc: "páginas 5–6" }] },
  { id: "m19-mem-04", modulo: "m19-manova", categoria: "formula", titulo: "Box's M",
    contenido: String.raw`$\text{gl}=\dfrac{p(p+1)}{2}(g-1)$ · con $p=3$, $g=3$: 12.`,
    fuente: [{ id: "CMAN", loc: "página 9" }] },
  { id: "m19-mem-05", modulo: "m19-manova", categoria: "salida", titulo: "Ejemplos",
    contenido: "Iris: Λ = 0,0234; F ≈ 199 (8, 288); Pillai 1,19; Lawley–Hotelling 32,48; Roy 32,19. Metodologías: Λ = 0,048958; F = 29,329 (6, 50); post hoc significativo en Química, Física y Biología.",
    fuente: [{ id: "C7.2", loc: "slide 34" }, { id: "CMAN", loc: "páginas 5–7" }] },
  { id: "m19-mem-06", modulo: "m19-manova", categoria: "funcion-R", titulo: "<code>manova</code> · <code>summary(…, test = …)</code> · <code>summary.aov</code>",
    contenido: "<code>manova(cbind(y1, y2) ~ g)</code> · <code>summary(fit, test = \"Wilks\")</code> (o <code>\"Pillai\"</code>, <code>\"Hotelling-Lawley\"</code>, <code>\"Roy\"</code>) · <code>summary.aov(fit)</code> (post hoc) · <code>TukeyHSD(aov(y ~ g))</code> · <code>biotools::boxM</code> · <code>MVN::mvn(…, \"mardia\")</code>.",
    fuente: [{ id: "C7.2", loc: "slides 30–33" }] }
]);
