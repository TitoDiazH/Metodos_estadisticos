/* ============================================================================
   Diferencias entre fuentes (viene de CONTENIDOS.md §3; aquí solo las que tocan
   los módulos ya redactados — el resto se agrega en la Fase 5, módulo a módulo).
   tipo: "criterio" (fuentes que difieren) | "error" (error interno, verificado)
         | "notacion".   modulos: ids a los que afecta (para el selector de prueba).
   No se concilia por cuenta propia: se muestra qué dice cada fuente.
   ========================================================================== */
PLATAFORMA.registrar("diferencia", [
  {
    id: "dif-regla-decision", tipo: "criterio", modulos: ["m01-covarianza-correlacion"],
    tema: "Regla de decisión con el p-valor: ¿«≤ α» o «&lt; α»?",
    fuentes: [
      { id: "C2", loc: "slides 4 y 14", dice: "«Si P-valor ≤ α → Se rechaza H₀»." },
      { id: "C1", loc: "slide 30", dice: "«Si p &lt; α, la matriz no es identidad» (test de Bartlett)." }
    ],
    convencion: "Solo difieren si el p-valor es exactamente igual a α. En las explicaciones se escribe «p-valor menor que α»; ninguna pregunta depende del caso de igualdad."
  },
  {
    id: "dif-kmeans-pp", tipo: "error", modulos: ["m13-k-medias"],
    tema: "¿<code>kmeans()</code> usa K-Means++ por defecto?",
    fuentes: [
      { id: "C5.2", loc: "slide 7", dice: "«kmeans() usa K-Means++ por defecto (R ≥ 4.x)»." },
      { id: "S5.2", loc: "líneas 39–45", dice: "Para K-Means++ usa otro paquete: <code>ClusterR::KMeans_rcpp(…, initializer = \"kmeans++\")</code>." }
    ],
    verificacion: "La ayuda de <code>kmeans</code> (R 4.6.1) dice sobre <code>centers</code>: «If a number, a random set of (distinct) rows in x is chosen as the initial centres». Es decir, inicialización aleatoria.",
    convencion: "No se pregunta por este punto. Lo evaluable es qué hace <code>nstart</code> y para qué sirve K-Means++."
  },
  {
    id: "dif-escala-n", tipo: "error", modulos: ["m13-k-medias"],
    tema: "Valores estandarizados de las empresas: divisor n (slide) vs. n − 1 (<code>scale()</code>)",
    fuentes: [
      { id: "C5.2", loc: "slide 5", dice: "E1 = (−0,79; −1,29), E8 = (1,13; 1,29), «mismos datos estandarizados»." },
      { id: "S5.2", loc: "línea 25", dice: "<code>datos_norm &lt;- scale(datos)</code>." }
    ],
    verificacion: "Ejecutado en R: <code>scale()</code> sobre las 8 empresas da E1 = (−0,74; −1,21) y E8 = (1,06; 1,21), porque divide por la desviación estándar con n − 1. Los valores de la slide se reproducen dividiendo por la desviación con n (18,876·√(7/8) = 17,66 y 7,031·√(7/8) = 6,58).",
    convencion: "El ejemplo a mano usa los números de la slide (son coherentes entre sí); las salidas de R del Laboratorio usan <code>scale()</code>. Las asignaciones finales no cambian."
  },
  {
    id: "dif-ay1-parentesis", tipo: "error", modulos: ["m01-covarianza-correlacion"],
    tema: "Paréntesis en el estadístico t de correlación de la pauta en R",
    fuentes: [
      { id: "AY1-E", loc: "Parte II, P2", dice: "Fórmula del enunciado: t = r·√((n − 2)/(1 − r²))." },
      { id: "AY1-R", loc: "línea 121", dice: "<code>tval &lt;- r23*sqrt((n-2)/1-r23^2)</code>: resta r² dentro de la raíz en vez de dividir por (1 − r²)." }
    ],
    verificacion: "Recalculado: con n = 100 da 0,6600 (código) contra 0,6614 (fórmula); con n = 1000, 2,1061 contra 2,1108. La conclusión no cambia (no rechaza con 100; rechaza con 1000).",
    convencion: "Se usa la fórmula del enunciado."
  },
  {
    id: "dif-ay5-dist", tipo: "error", modulos: ["m13-k-medias"],
    tema: "Ayudantía 5, problema 4: detalles de la pauta en R",
    fuentes: [
      { id: "AY5-R", loc: "línea 176", dice: "La matriz euclídea de (c) se calcula con <code>dist(datos)</code>, sin normalizar, aunque (b) construye <code>datos_norm</code>; de (e) a (g) sí se usa <code>datos_norm</code>." },
      { id: "AY5-R", loc: "líneas 197–198", dice: "El comentario dice «C4 y C6 se agrupan primero, y luego se añade C2»; el grupo que forma es {C4, C5, C6}." }
    ],
    convencion: "Las recetas de K-medias, codo y silueta del Laboratorio usan <code>datos_norm</code>, como la pauta en esos incisos."
  }
]);
