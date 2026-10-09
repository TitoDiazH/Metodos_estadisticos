/* Memorizar · M11 Conglomerados: definición, distancias, estandarización (P2) */
PLATAFORMA.registrar("memorizar", [
  { id: "m11-mem-01", modulo: "m11-conglomerados-distancias", categoria: "umbral", titulo: "Definición de partición",
    contenido: "Aprendizaje no supervisado. Cobertura (todos en algún clúster), disjuntividad (sin solapamiento), no vacío. Minimizar cohesión interna y maximizar separación.",
    fuente: [{ id: "C5.1", loc: "slides 2–3" }] },
  { id: "m11-mem-02", modulo: "m11-conglomerados-distancias", categoria: "decision", titulo: "Cinco pasos",
    contenido: "1) Preparar datos (estandarizar) · 2) Distancia · 3) Algoritmo · 4) Número de clústeres (codo, silueta, dendrograma) · 5) Validar e interpretar.",
    fuente: [{ id: "C5.1", loc: "slide 4" }] },
  { id: "m11-mem-03", modulo: "m11-conglomerados-distancias", categoria: "formula", titulo: "Minkowski",
    contenido: String.raw`$d=\left[\sum|x_{ip}-x_{jp}|^{\lambda}\right]^{1/\lambda}$: $\lambda=1$ Manhattan, $2$ euclídea, $\infty$ Chebyshev. Ward usa $d^2$.`,
    fuente: [{ id: "C5.1", loc: "slide 7" }] },
  { id: "m11-mem-04", modulo: "m11-conglomerados-distancias", categoria: "formula", titulo: "Distancia por correlación",
    contenido: String.raw`$d=1-\operatorname{cor}\in[0,2]$ · 0 = correlación +1; 1 = sin correlación; 2 = correlación −1 · <code>1 - cor(t(datos))</code>.`,
    fuente: [{ id: "C5.1", loc: "slide 9" }] },
  { id: "m11-mem-05", modulo: "m11-conglomerados-distancias", categoria: "formula", titulo: "Jaccard y Simple Matching",
    contenido: String.raw`Jaccard $=\dfrac{b+c}{a+b+c}$ (ignora doble ausencia) · SM $=\dfrac{b+c}{a+b+c+d}$ · Hamming $=b+c$ (= Manhattan con 0/1).`,
    fuente: [{ id: "C5.1", loc: "slide 10" }, { id: "AY5-R", loc: "línea 104" }] },
  { id: "m11-mem-06", modulo: "m11-conglomerados-distancias", categoria: "funcion-R", titulo: "<code>dist(x, method = …)</code>",
    contenido: "<code>\"euclidean\"</code>, <code>\"manhattan\"</code>, <code>\"maximum\"</code> (Chebyshev). Euclídea²: <code>dist(x)^2</code>. Binarias: <code>ade4::dist.binary(x, method = 1)</code> (Jaccard).",
    fuente: [{ id: "C5.1", loc: "slides 8 y 11" }] },
  { id: "m11-mem-07", modulo: "m11-conglomerados-distancias", categoria: "decision", titulo: "Qué escalamiento usar",
    contenido: "Z: unidades distintas (media 0, sd 1). [0, máx]: datos positivos. Min–max: extremos fijos, muy sensible a outliers. Sin escala: domina la variable grande.",
    fuente: [{ id: "C5.1", loc: "slide 17" }] }
]);
