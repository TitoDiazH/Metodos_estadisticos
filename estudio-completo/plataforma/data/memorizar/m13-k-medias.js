/* ============================================================================
   Memorizar · M13 K-medias y elección de k (P2)
   ========================================================================== */
PLATAFORMA.registrar("memorizar", [
  {
    id: "m13-mem-01", modulo: "m13-k-medias", categoria: "formula",
    titulo: "Objetivo de K-medias",
    contenido: String.raw`$\min\displaystyle\sum_{j=1}^{k}\sum_{i\in C_j}\lVert x_i-\mu_j\rVert^{2}$, con $\mu_j$ = centroide (media) del clúster $C_j$.`,
    fuente: [{ id: "C5.2", loc: "slide 3" }]
  },
  {
    id: "m13-mem-02", modulo: "m13-k-medias", categoria: "formula",
    titulo: "Silueta",
    contenido: String.raw`$s(i)=\dfrac{b(i)-a(i)}{\max\{a(i),b(i)\}}\in[-1,1]$ · $a(i)$: distancia promedio dentro de su clúster · $b(i)$: distancia promedio al clúster vecino más cercano.`,
    fuente: [{ id: "C5.2", loc: "slide 14" }]
  },
  {
    id: "m13-mem-03", modulo: "m13-k-medias", categoria: "formula",
    titulo: "Inversa de min–máx",
    contenido: String.raw`Si $y=\dfrac{x-\min}{\max-\min}$, entonces $x=y(\max-\min)+\min$ (para interpretar centroides en unidades originales).`,
    fuente: [{ id: "PR-P2-Q12", loc: "pregunta 1 d" }]
  },
  {
    id: "m13-mem-04", modulo: "m13-k-medias", categoria: "umbral",
    titulo: "Cómo leer s(i)",
    contenido: String.raw`$s(i)\approx1$: muy bien asignada · $s(i)\approx0$: en el borde de dos clústeres · $s(i)<0$: podría estar mejor en otro clúster.`,
    fuente: [{ id: "C5.2", loc: "slide 14" }]
  },
  {
    id: "m13-mem-05", modulo: "m13-k-medias", categoria: "umbral",
    titulo: "WSS y codo",
    contenido: String.raw`$WSS(1)\ge WSS(2)\ge\dots\ge WSS(n)=0$: siempre decrece con $k$. Se elige el $k$ donde la curva pasa de pendiente pronunciada a plana, no el de menor WSS.`,
    fuente: [{ id: "C5.2", loc: "slides 12–13" }]
  },
  {
    id: "m13-mem-06", modulo: "m13-k-medias", categoria: "decision",
    titulo: "¿K-medias o jerárquico?",
    contenido: "<strong>K-medias:</strong> datos grandes, se tiene idea del k, clústeres esféricos, eficiencia. <strong>Jerárquicos:</strong> datos pequeños/medianos, explorar distintos k con el dendrograma, clústeres de forma irregular.",
    fuente: [{ id: "C5.2", loc: "slide 8" }]
  },
  {
    id: "m13-mem-07", modulo: "m13-k-medias", categoria: "decision",
    titulo: "Pasos del algoritmo",
    contenido: "1) Inicializar k centroides · 2) Asignar cada observación al centroide más cercano · 3) Recalcular centroides como media de su clúster · 4) Repetir 2–3 hasta que las asignaciones no cambien.",
    fuente: [{ id: "C5.2", loc: "slide 4" }]
  },
  {
    id: "m13-mem-08", modulo: "m13-k-medias", categoria: "funcion-R",
    titulo: "<code>kmeans(datos_norm, centers = 3, nstart = 25)</code>",
    contenido: "<code>$cluster</code>: asignación de cada observación · <code>$centers</code>: centroides finales · <code>$tot.withinss</code>: WSS total. <code>nstart = 25</code> ejecuta 25 inicializaciones y retorna la mejor. Antes: <code>scale(datos)</code>.",
    fuente: [{ id: "C5.2", loc: "slide 9" }, { id: "S5.2", loc: "líneas 25–32" }]
  },
  {
    id: "m13-mem-09", modulo: "m13-k-medias", categoria: "funcion-R",
    titulo: "<code>silhouette(km$cluster, dist(datos_norm))</code>",
    contenido: "Paquete <code>cluster</code>. Entrega para cada observación su clúster, el clúster vecino y su ancho de silueta (<code>sil_width</code>). Aparece en la ayudantía 5, no en el script de clase.",
    fuente: [{ id: "AY5-R", loc: "líneas 241–244" }]
  },
  {
    id: "m13-mem-10", modulo: "m13-k-medias", categoria: "salida",
    titulo: "Centroides de <code>km$centers</code>",
    contenido: "Están en la escala en que se entregaron los datos (estandarizados o normalizados): positivo = sobre la media. Para hablar en unidades originales hay que deshacer la transformación.",
    fuente: [{ id: "C5.2", loc: "slide 9" }, { id: "PR-P2-Q12", loc: "pregunta 1 d" }]
  },
  {
    id: "m13-fc-01", modulo: "m13-k-medias", categoria: "flashcard",
    frente: "¿K-medias converge siempre? ¿A qué?",
    reverso: "Sí, siempre converge (la WSS decrece en cada iteración y está acotada por 0), pero a un óptimo LOCAL que depende de la inicialización.",
    fuente: [{ id: "C5.2", loc: "slide 4" }]
  },
  {
    id: "m13-fc-02", modulo: "m13-k-medias", categoria: "flashcard",
    frente: "Dos ventajas y dos desventajas de K-medias",
    reverso: "Ventajas: rápido y escalable; fácil de implementar e interpretar. Desventajas: requiere k de antemano; sensible a outliers y a la inicialización.",
    fuente: [{ id: "C5.2", loc: "slide 8" }, { id: "EJ-P2", loc: "P11" }]
  },
  {
    id: "m13-fc-03", modulo: "m13-k-medias", categoria: "flashcard",
    frente: "¿Qué miden a(i) y b(i) en la silueta?",
    reverso: "a(i): cohesión, distancia promedio a las observaciones de su mismo clúster. b(i): separación, distancia promedio al clúster vecino más cercano.",
    fuente: [{ id: "C5.2", loc: "slides 14–16" }]
  }
]);
