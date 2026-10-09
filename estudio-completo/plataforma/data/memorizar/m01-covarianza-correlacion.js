/* ============================================================================
   Memorizar · M01 Covarianza, correlación y regresión simple (P1)
   categoria: formula | umbral | decision | funcion-R | salida | flashcard
   (flashcard usa frente/reverso en vez de titulo/contenido)
   ========================================================================== */
PLATAFORMA.registrar("memorizar", [
  {
    id: "m01-mem-01", modulo: "m01-covarianza-correlacion", categoria: "formula",
    titulo: "Covarianza muestral",
    contenido: String.raw`$s_{xy}=\dfrac{1}{n-1}\displaystyle\sum_{i=1}^{n}(x_i-\bar x)(y_i-\bar y)$ · El signo indica dirección; la magnitud depende de las unidades. $\operatorname{Var}(X)=\operatorname{Cov}(X,X)$.`,
    fuente: [{ id: "C1", loc: "slides 9–14" }]
  },
  {
    id: "m01-mem-02", modulo: "m01-covarianza-correlacion", categoria: "formula",
    titulo: "Coeficiente de correlación",
    contenido: String.raw`$r=\dfrac{\operatorname{Cov}(X,Y)}{\sqrt{\operatorname{Var}(X)\operatorname{Var}(Y)}}$ · adimensional, $-1\le r\le 1$, relación lineal perfecta $=\pm1$.`,
    fuente: [{ id: "C1", loc: "slides 14–16" }, { id: "AY1-E", loc: "Parte II, P2" }]
  },
  {
    id: "m01-mem-03", modulo: "m01-covarianza-correlacion", categoria: "formula",
    titulo: "Test t de correlación",
    contenido: String.raw`$H_0:\rho=0$ · $t=r\sqrt{\dfrac{n-2}{1-r^{2}}}$ con $n-2$ grados de libertad.`,
    fuente: [{ id: "AY1-E", loc: "Parte II, P2" }]
  },
  {
    id: "m01-mem-04", modulo: "m01-covarianza-correlacion", categoria: "umbral",
    titulo: "Independencia y correlación",
    contenido: String.raw`Independientes $\Rightarrow\rho=0$ (verdadero). $\rho=0\Rightarrow$ independientes: <strong>falso</strong> en general (relación no lineal; solo vale con normal bivariada).`,
    fuente: [{ id: "PR-P1-Q1", loc: "afirmaciones 2 y 3" }]
  },
  {
    id: "m01-mem-05", modulo: "m01-covarianza-correlacion", categoria: "umbral",
    titulo: "Cómo leer r",
    contenido: "Cerca de 1: relación positiva fuerte · cerca de −1: negativa fuerte · cerca de 0: poca relación lineal. Una correlación alta no prueba causalidad.",
    fuente: [{ id: "C1", loc: "slide 20" }]
  },
  {
    id: "m01-mem-06", modulo: "m01-covarianza-correlacion", categoria: "funcion-R",
    titulo: "<code>cov(datos)</code>",
    contenido: "Matriz de covarianza de un data frame: varianzas en la diagonal, covarianzas fuera de ella.",
    fuente: [{ id: "C1", loc: "slide 13" }]
  },
  {
    id: "m01-mem-07", modulo: "m01-covarianza-correlacion", categoria: "funcion-R",
    titulo: "<code>cor.test(x, y, method = \"pearson\")</code>",
    contenido: String.raw`Devuelve el coeficiente de correlación, su intervalo de confianza y el p-valor para probar $H_0:\rho=0$.`,
    fuente: [{ id: "C1", loc: "slide 19" }]
  },
  {
    id: "m01-mem-08", modulo: "m01-covarianza-correlacion", categoria: "salida",
    titulo: "Salida de <code>cor.test()</code>",
    contenido: String.raw`<code>t</code> y <code>df</code> ($=n-2$) → estadístico · <code>p-value</code> → se compara con α · <code>95 percent confidence interval</code> → si no contiene el 0, coincide con rechazar · <code>cor</code> → $r$ muestral.`,
    fuente: [{ id: "C1", loc: "slide 19" }]
  },
  {
    id: "m01-fc-01", modulo: "m01-covarianza-correlacion", categoria: "flashcard",
    frente: "¿Qué indica el signo de la covarianza y de qué depende su magnitud?",
    reverso: "El signo indica la dirección de la relación lineal; la magnitud depende de las unidades de medida.",
    fuente: [{ id: "C1", loc: "slide 10" }]
  },
  {
    id: "m01-fc-02", modulo: "m01-covarianza-correlacion", categoria: "flashcard",
    frente: "¿Correlación 0 implica independencia?",
    reverso: "No en general: puede haber relación no lineal. Solo equivale a independencia con distribución normal conjunta.",
    fuente: [{ id: "PR-P1-Q1", loc: "afirmación 3" }]
  },
  {
    id: "m01-fc-03", modulo: "m01-covarianza-correlacion", categoria: "flashcard",
    frente: "¿Qué tres cosas devuelve cor.test()?",
    reverso: "El coeficiente de correlación, el intervalo de confianza y el p-valor para probar H0: ρ = 0.",
    fuente: [{ id: "C1", loc: "slide 19" }]
  }
]);
