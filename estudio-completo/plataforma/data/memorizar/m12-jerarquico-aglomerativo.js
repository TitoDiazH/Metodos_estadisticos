/* Memorizar · M12 Clustering jerárquico aglomerativo (P2) */
PLATAFORMA.registrar("memorizar", [
  { id: "m12-mem-01", modulo: "m12-jerarquico-aglomerativo", categoria: "decision", titulo: "Aglomerativo vs desagregativo",
    contenido: "Aglomerativo: n clústeres → 1 (une los más similares). Desagregativo: 1 → n (divide el más heterogéneo). Ambos dan un dendrograma; se corta con <code>cutree(hc, k)</code>.",
    fuente: [{ id: "C5.1", loc: "slide 19" }] },
  { id: "m12-mem-02", modulo: "m12-jerarquico-aglomerativo", categoria: "formula", titulo: "Distancia entre clústeres",
    contenido: String.raw`Single $=\min$ (efecto cadena) · Complete $=\max$ (compactos) · Average $=$ promedio de todos los pares · Centroide $=d(\mu_A,\mu_B)$ · Ward: mínimo aumento de varianza interna.`,
    fuente: [{ id: "C5.1", loc: "slides 21, 26, 29, 31" }] },
  { id: "m12-mem-03", modulo: "m12-jerarquico-aglomerativo", categoria: "salida", titulo: "Fusiones de las 5 empresas",
    contenido: "Single: 0,42 → 0,65 → 1,64 → 2,28. Complete: 0,42 → 0,65 → 1,97 → 3,22 (fusiones mayores).",
    fuente: [{ id: "C5.1", loc: "slides 24 y 27" }] },
  { id: "m12-mem-04", modulo: "m12-jerarquico-aglomerativo", categoria: "umbral", titulo: "Centroide y Ward",
    contenido: "Centroide: no es métrica, puede dar inversiones. Ward: clústeres de tamaño similar y compactos, no es métrica, estable.",
    fuente: [{ id: "C5.1", loc: "slides 29 y 31" }] },
  { id: "m12-mem-05", modulo: "m12-jerarquico-aglomerativo", categoria: "funcion-R", titulo: "<code>hclust(dist, method = …)</code>",
    contenido: "<code>\"single\"</code>, <code>\"complete\"</code>, <code>\"average\"</code>, <code>\"centroid\"</code>, <code>\"ward.D2\"</code>. Luego <code>plot()</code> (dendrograma) y <code>cutree(hc, k)</code>.",
    fuente: [{ id: "C5.1", loc: "slides 25, 28, 30, 32" }, { id: "AY5-R", loc: "líneas 51–62" }] },
  { id: "m12-mem-06", modulo: "m12-jerarquico-aglomerativo", categoria: "flashcard", frente: "¿Cuándo hay empate en una fusión jerárquica?",
    reverso: "Cuando dos pares de clústeres tienen la misma distancia mínima; el orden depende del desempate del programa (ej. A y D a 4,5 de {C,E} en AY5 P1 con average).",
    fuente: [{ id: "AY5-E", loc: "P1" }] }
]);
