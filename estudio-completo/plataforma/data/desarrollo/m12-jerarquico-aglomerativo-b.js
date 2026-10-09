/* ============================================================================
   Desarrollo · M12 Clustering jerárquico aglomerativo (P2) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m12-d002",
    modulo: "m12-jerarquico-aglomerativo",
    concepto: "m12-c02",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slides 21–25" },
      { id: "AY5-E", loc: "P1" }
    ],
    titulo: "Jerárquico a mano con single linkage (matriz dada)",
    enunciado: `<p>Se quiere agrupar cinco sucursales. La matriz de distancias entre 5 objetos es:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td><strong>B</strong></td><td>$2$</td><td></td><td></td><td></td></tr><tr><td><strong>C</strong></td><td>$6$</td><td>$5$</td><td></td><td></td></tr><tr><td><strong>D</strong></td><td>$10$</td><td>$8$</td><td>$4$</td><td></td></tr><tr><td><strong>E</strong></td><td>$9$</td><td>$7$</td><td>$3$</td><td>$11$</td></tr></tbody></table></div><p>Aplica clustering jerárquico aglomerativo con <strong>single linkage (vecino más cercano)</strong>.</p><ol type="a"><li>Indica la primera fusión.</li><li>Actualiza las distancias y determina la segunda fusión.</li><li>Completa las fusiones restantes.</li><li>Indica las alturas del dendrograma y los grupos al cortar en 2 clústeres.</li></ol>`,
    partes: [
      { titulo: "a) Primera fusión", puntos: 1.5, solucion: "<p>Cada objeto parte como un clúster. La menor distancia de la matriz es $d(A,B)=2$ ⇒ primera fusión: <strong>{A, B}</strong> a altura $2$.</p>" },
      { titulo: "b) Distancias actualizadas y segunda fusión", puntos: 2, solucion: String.raw`<p>Con single linkage la distancia entre clústeres es la <strong>mínima</strong> distancia entre un elemento de cada clúster.</p><p>Distancias al clúster recién formado {A, B}: $d(C,\{A,B\})=\min(6;\ 5)=5$; $d(D,\{A,B\})=\min(10;\ 8)=8$; $d(E,\{A,B\})=\min(9;\ 7)=7$.</p><p>Las demás no cambian: $d(C,D)=4$; $d(C,E)=3$; $d(D,E)=11$.</p><p>La menor es $3$ ⇒ se unen <strong>C</strong> y <strong>E</strong> a altura $3$.</p>` },
      { titulo: "c) Fusiones restantes", puntos: 1.5, solucion: String.raw`<p><strong>Fusión 3.</strong></p><p>Distancias al clúster recién formado {C, E}: $d(D,\{C,E\})=\min(4;\ 11)=4$; $d(\{A,B\},\{C,E\})=\min(6;\ 9;\ 5;\ 7)=5$.</p><p>Las demás no cambian: $d(D,\{A,B\})=8$.</p><p>La menor es $4$ ⇒ se unen <strong>D</strong> y <strong>{C, E}</strong> a altura $4$.</p><p><strong>Fusión 4.</strong></p><p>Distancias al clúster recién formado {C, D, E}: $d(\{A,B\},\{C,D,E\})=\min(6;\ 10;\ 9;\ 5;\ 8;\ 7)=5$.</p><p></p><p>La menor es $5$ ⇒ se unen <strong>{A, B}</strong> y <strong>{C, D, E}</strong> a altura $5$.</p>` },
      { titulo: "d) Alturas del dendrograma y corte en 2 clústeres", puntos: 1, solucion: `<p>Alturas de fusión: $2$; $3$; $4$; $5$.</p><p>Cortar en 2 clústeres equivale a cortar el dendrograma entre las alturas $4$ y $5$: quedan <strong>{A, B}</strong>, <strong>{C, D, E}</strong>.</p><p>En R: <code>hc <- hclust(d, method = "single"); cutree(hc, k = 2)</code>. Con single aparece el <strong>efecto cadena</strong>: los objetos se van enganchando de a uno.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "altura 1 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 2, 6, 10, 9, 2, 0, 5, 8, 7, 6, 5, 0, 4, 3, 10, 8, 4, 0, 11, 9, 7, 3, 11, 0), 5, byrow = TRUE)), "single")$height[1])`, esperado: 2, tol: 0.0050000010000000004 },
      { que: "altura 2 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 2, 6, 10, 9, 2, 0, 5, 8, 7, 6, 5, 0, 4, 3, 10, 8, 4, 0, 11, 9, 7, 3, 11, 0), 5, byrow = TRUE)), "single")$height[2])`, esperado: 3, tol: 0.0050000010000000004 },
      { que: "altura 3 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 2, 6, 10, 9, 2, 0, 5, 8, 7, 6, 5, 0, 4, 3, 10, 8, 4, 0, 11, 9, 7, 3, 11, 0), 5, byrow = TRUE)), "single")$height[3])`, esperado: 4, tol: 0.0050000010000000004 },
      { que: "altura 4 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 2, 6, 10, 9, 2, 0, 5, 8, 7, 6, 5, 0, 4, 3, 10, 8, 4, 0, 11, 9, 7, 3, 11, 0), 5, byrow = TRUE)), "single")$height[4])`, esperado: 5, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C5.1", loc: "slides 21–25" },
      { id: "AY5-E", loc: "P1" }
    ]
  },
  {
    id: "m12-d003",
    modulo: "m12-jerarquico-aglomerativo",
    concepto: "m12-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slides 26–28" },
      { id: "AY5-E", loc: "P1" }
    ],
    titulo: "La misma matriz con complete linkage",
    enunciado: `<p>Se quiere agrupar cinco sucursales. La matriz de distancias entre 5 objetos es:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td><strong>B</strong></td><td>$2$</td><td></td><td></td><td></td></tr><tr><td><strong>C</strong></td><td>$6$</td><td>$5$</td><td></td><td></td></tr><tr><td><strong>D</strong></td><td>$10$</td><td>$8$</td><td>$4$</td><td></td></tr><tr><td><strong>E</strong></td><td>$9$</td><td>$7$</td><td>$3$</td><td>$11$</td></tr></tbody></table></div><p>Aplica clustering jerárquico aglomerativo con <strong>complete linkage (vecino más lejano)</strong>.</p><ol type="a"><li>Indica la primera fusión.</li><li>Actualiza las distancias y determina la segunda fusión.</li><li>Completa las fusiones restantes.</li><li>Indica las alturas del dendrograma y los grupos al cortar en 2 clústeres.</li></ol>`,
    partes: [
      { titulo: "a) Primera fusión", puntos: 1.5, solucion: "<p>Cada objeto parte como un clúster. La menor distancia de la matriz es $d(A,B)=2$ ⇒ primera fusión: <strong>{A, B}</strong> a altura $2$.</p>" },
      { titulo: "b) Distancias actualizadas y segunda fusión", puntos: 2, solucion: String.raw`<p>Con complete linkage la distancia entre clústeres es la <strong>máxima</strong> distancia entre un elemento de cada clúster.</p><p>Distancias al clúster recién formado {A, B}: $d(C,\{A,B\})=\max(6;\ 5)=6$; $d(D,\{A,B\})=\max(10;\ 8)=10$; $d(E,\{A,B\})=\max(9;\ 7)=9$.</p><p>Las demás no cambian: $d(C,D)=4$; $d(C,E)=3$; $d(D,E)=11$.</p><p>La menor es $3$ ⇒ se unen <strong>C</strong> y <strong>E</strong> a altura $3$.</p>` },
      { titulo: "c) Fusiones restantes", puntos: 1.5, solucion: String.raw`<p><strong>Fusión 3.</strong></p><p>Distancias al clúster recién formado {C, E}: $d(D,\{C,E\})=\max(4;\ 11)=11$; $d(\{A,B\},\{C,E\})=\max(6;\ 9;\ 5;\ 7)=9$.</p><p>Las demás no cambian: $d(D,\{A,B\})=10$.</p><p>La menor es $9$ ⇒ se unen <strong>{A, B}</strong> y <strong>{C, E}</strong> a altura $9$.</p><p><strong>Fusión 4.</strong></p><p>Distancias al clúster recién formado {A, B, C, E}: $d(D,\{A,B,C,E\})=\max(10;\ 8;\ 4;\ 11)=11$.</p><p></p><p>La menor es $11$ ⇒ se unen <strong>D</strong> y <strong>{A, B, C, E}</strong> a altura $11$.</p>` },
      { titulo: "d) Alturas del dendrograma y corte en 2 clústeres", puntos: 1, solucion: `<p>Alturas de fusión: $2$; $3$; $9$; $11$.</p><p>Cortar en 2 clústeres equivale a cortar el dendrograma entre las alturas $9$ y $11$: quedan <strong>D</strong>, <strong>{A, B, C, E}</strong>.</p><p>En R: <code>hc <- hclust(d, method = "complete"); cutree(hc, k = 2)</code>. Compara con single sobre la misma matriz: el objeto D ya no se engancha temprano; complete forma grupos compactos.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "altura 1 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 2, 6, 10, 9, 2, 0, 5, 8, 7, 6, 5, 0, 4, 3, 10, 8, 4, 0, 11, 9, 7, 3, 11, 0), 5, byrow = TRUE)), "complete")$height[1])`, esperado: 2, tol: 0.0050000010000000004 },
      { que: "altura 2 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 2, 6, 10, 9, 2, 0, 5, 8, 7, 6, 5, 0, 4, 3, 10, 8, 4, 0, 11, 9, 7, 3, 11, 0), 5, byrow = TRUE)), "complete")$height[2])`, esperado: 3, tol: 0.0050000010000000004 },
      { que: "altura 3 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 2, 6, 10, 9, 2, 0, 5, 8, 7, 6, 5, 0, 4, 3, 10, 8, 4, 0, 11, 9, 7, 3, 11, 0), 5, byrow = TRUE)), "complete")$height[3])`, esperado: 9, tol: 0.0050000010000000004 },
      { que: "altura 4 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 2, 6, 10, 9, 2, 0, 5, 8, 7, 6, 5, 0, 4, 3, 10, 8, 4, 0, 11, 9, 7, 3, 11, 0), 5, byrow = TRUE)), "complete")$height[4])`, esperado: 11, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C5.1", loc: "slides 26–28" },
      { id: "AY5-E", loc: "P1" }
    ]
  },
  {
    id: "m12-d004",
    modulo: "m12-jerarquico-aglomerativo",
    concepto: "m12-c04",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slide 20" },
      { id: "AY5-E", loc: "P1" }
    ],
    titulo: "La misma matriz con average linkage",
    enunciado: `<p>Se quiere agrupar cinco sucursales. La matriz de distancias entre 5 objetos es:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td><strong>B</strong></td><td>$2$</td><td></td><td></td><td></td></tr><tr><td><strong>C</strong></td><td>$6$</td><td>$5$</td><td></td><td></td></tr><tr><td><strong>D</strong></td><td>$10$</td><td>$8$</td><td>$4$</td><td></td></tr><tr><td><strong>E</strong></td><td>$9$</td><td>$7$</td><td>$3$</td><td>$11$</td></tr></tbody></table></div><p>Aplica clustering jerárquico aglomerativo con <strong>average linkage (promedio)</strong>.</p><ol type="a"><li>Indica la primera fusión.</li><li>Actualiza las distancias y determina la segunda fusión.</li><li>Completa las fusiones restantes.</li><li>Indica las alturas del dendrograma y los grupos al cortar en 3 clústeres.</li></ol>`,
    partes: [
      { titulo: "a) Primera fusión", puntos: 1.5, solucion: "<p>Cada objeto parte como un clúster. La menor distancia de la matriz es $d(A,B)=2$ ⇒ primera fusión: <strong>{A, B}</strong> a altura $2$.</p>" },
      { titulo: "b) Distancias actualizadas y segunda fusión", puntos: 2, solucion: String.raw`<p>Con average linkage la distancia entre clústeres es el <strong>promedio</strong> de todas las distancias entre pares (uno de cada clúster).</p><p>Distancias al clúster recién formado {A, B}: $d(C,\{A,B\})=\dfrac{6+5}{2}=5{,}5$; $d(D,\{A,B\})=\dfrac{10+8}{2}=9$; $d(E,\{A,B\})=\dfrac{9+7}{2}=8$.</p><p>Las demás no cambian: $d(C,D)=4$; $d(C,E)=3$; $d(D,E)=11$.</p><p>La menor es $3$ ⇒ se unen <strong>C</strong> y <strong>E</strong> a altura $3$.</p>` },
      { titulo: "c) Fusiones restantes", puntos: 1.5, solucion: String.raw`<p><strong>Fusión 3.</strong></p><p>Distancias al clúster recién formado {C, E}: $d(D,\{C,E\})=\dfrac{4+11}{2}=7{,}5$; $d(\{A,B\},\{C,E\})=\dfrac{6+9+5+7}{4}=6{,}75$.</p><p>Las demás no cambian: $d(D,\{A,B\})=9$.</p><p>La menor es $6{,}75$ ⇒ se unen <strong>{A, B}</strong> y <strong>{C, E}</strong> a altura $6{,}75$.</p><p><strong>Fusión 4.</strong></p><p>Distancias al clúster recién formado {A, B, C, E}: $d(D,\{A,B,C,E\})=\dfrac{10+8+4+11}{4}=8{,}25$.</p><p></p><p>La menor es $8{,}25$ ⇒ se unen <strong>D</strong> y <strong>{A, B, C, E}</strong> a altura $8{,}25$.</p>` },
      { titulo: "d) Alturas del dendrograma y corte en 3 clústeres", puntos: 1, solucion: `<p>Alturas de fusión: $2$; $3$; $6{,}75$; $8{,}25$.</p><p>Cortar en 3 clústeres equivale a cortar el dendrograma entre las alturas $3$ y $6{,}75$: quedan <strong>D</strong>, <strong>{A, B}</strong>, <strong>{C, E}</strong>.</p><p>En R: <code>hc <- hclust(d, method = "average"); cutree(hc, k = 3)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "altura 1 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 2, 6, 10, 9, 2, 0, 5, 8, 7, 6, 5, 0, 4, 3, 10, 8, 4, 0, 11, 9, 7, 3, 11, 0), 5, byrow = TRUE)), "average")$height[1])`, esperado: 2, tol: 0.0050000010000000004 },
      { que: "altura 2 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 2, 6, 10, 9, 2, 0, 5, 8, 7, 6, 5, 0, 4, 3, 10, 8, 4, 0, 11, 9, 7, 3, 11, 0), 5, byrow = TRUE)), "average")$height[2])`, esperado: 3, tol: 0.0050000010000000004 },
      { que: "altura 3 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 2, 6, 10, 9, 2, 0, 5, 8, 7, 6, 5, 0, 4, 3, 10, 8, 4, 0, 11, 9, 7, 3, 11, 0), 5, byrow = TRUE)), "average")$height[3])`, esperado: 6.75, tol: 0.0050000010000000004 },
      { que: "altura 4 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 2, 6, 10, 9, 2, 0, 5, 8, 7, 6, 5, 0, 4, 3, 10, 8, 4, 0, 11, 9, 7, 3, 11, 0), 5, byrow = TRUE)), "average")$height[4])`, esperado: 8.25, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C5.1", loc: "slide 20" },
      { id: "AY5-E", loc: "P1" }
    ]
  },
  {
    id: "m12-d005",
    modulo: "m12-jerarquico-aglomerativo",
    concepto: "m12-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slides 26–28" },
      { id: "AY5-E", loc: "P1" }
    ],
    titulo: "Complete linkage con otra matriz de distancias",
    enunciado: `<p>Cinco productos se comparan según su perfil de ventas. La matriz de distancias entre 5 objetos es:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td><strong>B</strong></td><td>$3$</td><td></td><td></td><td></td></tr><tr><td><strong>C</strong></td><td>$7$</td><td>$6$</td><td></td><td></td></tr><tr><td><strong>D</strong></td><td>$12$</td><td>$11$</td><td>$5$</td><td></td></tr><tr><td><strong>E</strong></td><td>$10$</td><td>$9$</td><td>$8$</td><td>$4$</td></tr></tbody></table></div><p>Aplica clustering jerárquico aglomerativo con <strong>complete linkage (vecino más lejano)</strong>.</p><ol type="a"><li>Indica la primera fusión.</li><li>Actualiza las distancias y determina la segunda fusión.</li><li>Completa las fusiones restantes.</li><li>Indica las alturas del dendrograma y los grupos al cortar en 2 clústeres.</li></ol>`,
    partes: [
      { titulo: "a) Primera fusión", puntos: 1.5, solucion: "<p>Cada objeto parte como un clúster. La menor distancia de la matriz es $d(A,B)=3$ ⇒ primera fusión: <strong>{A, B}</strong> a altura $3$.</p>" },
      { titulo: "b) Distancias actualizadas y segunda fusión", puntos: 2, solucion: String.raw`<p>Con complete linkage la distancia entre clústeres es la <strong>máxima</strong> distancia entre un elemento de cada clúster.</p><p>Distancias al clúster recién formado {A, B}: $d(C,\{A,B\})=\max(7;\ 6)=7$; $d(D,\{A,B\})=\max(12;\ 11)=12$; $d(E,\{A,B\})=\max(10;\ 9)=10$.</p><p>Las demás no cambian: $d(C,D)=5$; $d(C,E)=8$; $d(D,E)=4$.</p><p>La menor es $4$ ⇒ se unen <strong>D</strong> y <strong>E</strong> a altura $4$.</p>` },
      { titulo: "c) Fusiones restantes", puntos: 1.5, solucion: String.raw`<p><strong>Fusión 3.</strong></p><p>Distancias al clúster recién formado {D, E}: $d(C,\{D,E\})=\max(5;\ 8)=8$; $d(\{A,B\},\{D,E\})=\max(12;\ 10;\ 11;\ 9)=12$.</p><p>Las demás no cambian: $d(C,\{A,B\})=7$.</p><p>La menor es $7$ ⇒ se unen <strong>C</strong> y <strong>{A, B}</strong> a altura $7$.</p><p><strong>Fusión 4.</strong></p><p>Distancias al clúster recién formado {A, B, C}: $d(\{D,E\},\{A,B,C\})=\max(12;\ 11;\ 5;\ 10;\ 9;\ 8)=12$.</p><p></p><p>La menor es $12$ ⇒ se unen <strong>{D, E}</strong> y <strong>{A, B, C}</strong> a altura $12$.</p>` },
      { titulo: "d) Alturas del dendrograma y corte en 2 clústeres", puntos: 1, solucion: `<p>Alturas de fusión: $3$; $4$; $7$; $12$.</p><p>Cortar en 2 clústeres equivale a cortar el dendrograma entre las alturas $7$ y $12$: quedan <strong>{D, E}</strong>, <strong>{A, B, C}</strong>.</p><p>En R: <code>hc <- hclust(d, method = "complete"); cutree(hc, k = 2)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "altura 1 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 3, 7, 12, 10, 3, 0, 6, 11, 9, 7, 6, 0, 5, 8, 12, 11, 5, 0, 4, 10, 9, 8, 4, 0), 5, byrow = TRUE)), "complete")$height[1])`, esperado: 3, tol: 0.0050000010000000004 },
      { que: "altura 2 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 3, 7, 12, 10, 3, 0, 6, 11, 9, 7, 6, 0, 5, 8, 12, 11, 5, 0, 4, 10, 9, 8, 4, 0), 5, byrow = TRUE)), "complete")$height[2])`, esperado: 4, tol: 0.0050000010000000004 },
      { que: "altura 3 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 3, 7, 12, 10, 3, 0, 6, 11, 9, 7, 6, 0, 5, 8, 12, 11, 5, 0, 4, 10, 9, 8, 4, 0), 5, byrow = TRUE)), "complete")$height[3])`, esperado: 7, tol: 0.0050000010000000004 },
      { que: "altura 4 (hclust)", r: `cat(hclust(as.dist(matrix(c(0, 3, 7, 12, 10, 3, 0, 6, 11, 9, 7, 6, 0, 5, 8, 12, 11, 5, 0, 4, 10, 9, 8, 4, 0), 5, byrow = TRUE)), "complete")$height[4])`, esperado: 12, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C5.1", loc: "slides 26–28" },
      { id: "AY5-E", loc: "P1" }
    ]
  },
  {
    id: "m12-d006",
    modulo: "m12-jerarquico-aglomerativo",
    concepto: "m12-c04",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slide 20" },
      { id: "AY5-E", loc: "P1" }
    ],
    titulo: "Average linkage a partir de coordenadas (Manhattan)",
    enunciado: String.raw`<p>Cinco locales con coordenadas (X, Y): A$(1;\ 2)$, B$(2;\ 2)$, C$(5;\ 6)$, D$(6;\ 5)$, E$(9;\ 1)$. Usa distancia Manhattan.</p><p>Aplica clustering jerárquico aglomerativo con <strong>average linkage (promedio)</strong>.</p><ol type="a"><li>Calcula la matriz de distancias e indica la primera fusión.</li><li>Actualiza las distancias y determina la segunda fusión.</li><li>Completa las fusiones restantes.</li><li>Indica las alturas del dendrograma y los grupos al cortar en 3 clústeres.</li></ol>`,
    partes: [
      { titulo: "a) Matriz de distancias y primera fusión", puntos: 1.5, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td><strong>B</strong></td><td>$1$</td><td></td><td></td><td></td></tr><tr><td><strong>C</strong></td><td>$8$</td><td>$7$</td><td></td><td></td></tr><tr><td><strong>D</strong></td><td>$8$</td><td>$7$</td><td>$2$</td><td></td></tr><tr><td><strong>E</strong></td><td>$9$</td><td>$8$</td><td>$9$</td><td>$7$</td></tr></tbody></table></div><p>Cada objeto parte como un clúster. La menor distancia de la matriz es $d(A,B)=1$ ⇒ primera fusión: <strong>{A, B}</strong> a altura $1$.</p>` },
      { titulo: "b) Distancias actualizadas y segunda fusión", puntos: 2, solucion: String.raw`<p>Con average linkage la distancia entre clústeres es el <strong>promedio</strong> de todas las distancias entre pares (uno de cada clúster).</p><p>Distancias al clúster recién formado {A, B}: $d(C,\{A,B\})=\dfrac{8+7}{2}=7{,}5$; $d(D,\{A,B\})=\dfrac{8+7}{2}=7{,}5$; $d(E,\{A,B\})=\dfrac{9+8}{2}=8{,}5$.</p><p>Las demás no cambian: $d(C,D)=2$; $d(C,E)=9$; $d(D,E)=7$.</p><p>La menor es $2$ ⇒ se unen <strong>C</strong> y <strong>D</strong> a altura $2$.</p>` },
      { titulo: "c) Fusiones restantes", puntos: 1.5, solucion: String.raw`<p><strong>Fusión 3.</strong></p><p>Distancias al clúster recién formado {C, D}: $d(E,\{C,D\})=\dfrac{9+7}{2}=8$; $d(\{A,B\},\{C,D\})=\dfrac{8+8+7+7}{4}=7{,}5$.</p><p>Las demás no cambian: $d(E,\{A,B\})=8{,}5$.</p><p>La menor es $7{,}5$ ⇒ se unen <strong>{A, B}</strong> y <strong>{C, D}</strong> a altura $7{,}5$.</p><p><strong>Fusión 4.</strong></p><p>Distancias al clúster recién formado {A, B, C, D}: $d(E,\{A,B,C,D\})=\dfrac{9+8+9+7}{4}=8{,}25$.</p><p></p><p>La menor es $8{,}25$ ⇒ se unen <strong>E</strong> y <strong>{A, B, C, D}</strong> a altura $8{,}25$.</p>` },
      { titulo: "d) Alturas del dendrograma y corte en 3 clústeres", puntos: 1, solucion: `<p>Alturas de fusión: $1$; $2$; $7{,}5$; $8{,}25$.</p><p>Cortar en 3 clústeres equivale a cortar el dendrograma entre las alturas $2$ y $7{,}5$: quedan <strong>E</strong>, <strong>{A, B}</strong>, <strong>{C, D}</strong>.</p><p>En R: <code>hc <- hclust(d, method = "average"); cutree(hc, k = 3)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "altura 1 (hclust)", r: `cat(hclust(dist(rbind(c(1, 2), c(2, 2), c(5, 6), c(6, 5), c(9, 1)), "manhattan"), "average")$height[1])`, esperado: 1, tol: 0.0050000010000000004 },
      { que: "altura 2 (hclust)", r: `cat(hclust(dist(rbind(c(1, 2), c(2, 2), c(5, 6), c(6, 5), c(9, 1)), "manhattan"), "average")$height[2])`, esperado: 2, tol: 0.0050000010000000004 },
      { que: "altura 3 (hclust)", r: `cat(hclust(dist(rbind(c(1, 2), c(2, 2), c(5, 6), c(6, 5), c(9, 1)), "manhattan"), "average")$height[3])`, esperado: 7.5, tol: 0.0050000010000000004 },
      { que: "altura 4 (hclust)", r: `cat(hclust(dist(rbind(c(1, 2), c(2, 2), c(5, 6), c(6, 5), c(9, 1)), "manhattan"), "average")$height[4])`, esperado: 8.25, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C5.1", loc: "slide 20" },
      { id: "AY5-E", loc: "P1" }
    ]
  },
  {
    id: "m12-d007",
    modulo: "m12-jerarquico-aglomerativo",
    concepto: "m12-c02",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slides 21–25" },
      { id: "AY5-E", loc: "P1" }
    ],
    titulo: "Single linkage a partir de coordenadas (Manhattan)",
    enunciado: String.raw`<p>Cinco bodegas con coordenadas (X, Y): A$(0;\ 0)$, B$(1;\ 2)$, C$(4;\ 1)$, D$(5;\ 5)$, E$(10;\ 3)$. Usa distancia Manhattan.</p><p>Aplica clustering jerárquico aglomerativo con <strong>single linkage (vecino más cercano)</strong>.</p><ol type="a"><li>Calcula la matriz de distancias e indica la primera fusión.</li><li>Actualiza las distancias y determina la segunda fusión.</li><li>Completa las fusiones restantes.</li><li>Indica las alturas del dendrograma y los grupos al cortar en 2 clústeres.</li></ol>`,
    partes: [
      { titulo: "a) Matriz de distancias y primera fusión", puntos: 1.5, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td><strong>B</strong></td><td>$3$</td><td></td><td></td><td></td></tr><tr><td><strong>C</strong></td><td>$5$</td><td>$4$</td><td></td><td></td></tr><tr><td><strong>D</strong></td><td>$10$</td><td>$7$</td><td>$5$</td><td></td></tr><tr><td><strong>E</strong></td><td>$13$</td><td>$10$</td><td>$8$</td><td>$7$</td></tr></tbody></table></div><p>Cada objeto parte como un clúster. La menor distancia de la matriz es $d(A,B)=3$ ⇒ primera fusión: <strong>{A, B}</strong> a altura $3$.</p>` },
      { titulo: "b) Distancias actualizadas y segunda fusión", puntos: 2, solucion: String.raw`<p>Con single linkage la distancia entre clústeres es la <strong>mínima</strong> distancia entre un elemento de cada clúster.</p><p>Distancias al clúster recién formado {A, B}: $d(C,\{A,B\})=\min(5;\ 4)=4$; $d(D,\{A,B\})=\min(10;\ 7)=7$; $d(E,\{A,B\})=\min(13;\ 10)=10$.</p><p>Las demás no cambian: $d(C,D)=5$; $d(C,E)=8$; $d(D,E)=7$.</p><p>La menor es $4$ ⇒ se unen <strong>C</strong> y <strong>{A, B}</strong> a altura $4$.</p>` },
      { titulo: "c) Fusiones restantes", puntos: 1.5, solucion: String.raw`<p><strong>Fusión 3.</strong></p><p>Distancias al clúster recién formado {A, B, C}: $d(D,\{A,B,C\})=\min(10;\ 7;\ 5)=5$; $d(E,\{A,B,C\})=\min(13;\ 10;\ 8)=8$.</p><p>Las demás no cambian: $d(D,E)=7$.</p><p>La menor es $5$ ⇒ se unen <strong>D</strong> y <strong>{A, B, C}</strong> a altura $5$.</p><p><strong>Fusión 4.</strong></p><p>Distancias al clúster recién formado {A, B, C, D}: $d(E,\{A,B,C,D\})=\min(13;\ 10;\ 8;\ 7)=7$.</p><p></p><p>La menor es $7$ ⇒ se unen <strong>E</strong> y <strong>{A, B, C, D}</strong> a altura $7$.</p>` },
      { titulo: "d) Alturas del dendrograma y corte en 2 clústeres", puntos: 1, solucion: `<p>Alturas de fusión: $3$; $4$; $5$; $7$.</p><p>Cortar en 2 clústeres equivale a cortar el dendrograma entre las alturas $5$ y $7$: quedan <strong>E</strong>, <strong>{A, B, C, D}</strong>.</p><p>En R: <code>hc <- hclust(d, method = "single"); cutree(hc, k = 2)</code>. Resultado típico de single: un clúster grande y un objeto aislado.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "altura 1 (hclust)", r: `cat(hclust(dist(rbind(c(0, 0), c(1, 2), c(4, 1), c(5, 5), c(10, 3)), "manhattan"), "single")$height[1])`, esperado: 3, tol: 0.0050000010000000004 },
      { que: "altura 2 (hclust)", r: `cat(hclust(dist(rbind(c(0, 0), c(1, 2), c(4, 1), c(5, 5), c(10, 3)), "manhattan"), "single")$height[2])`, esperado: 4, tol: 0.0050000010000000004 },
      { que: "altura 3 (hclust)", r: `cat(hclust(dist(rbind(c(0, 0), c(1, 2), c(4, 1), c(5, 5), c(10, 3)), "manhattan"), "single")$height[3])`, esperado: 5, tol: 0.0050000010000000004 },
      { que: "altura 4 (hclust)", r: `cat(hclust(dist(rbind(c(0, 0), c(1, 2), c(4, 1), c(5, 5), c(10, 3)), "manhattan"), "single")$height[4])`, esperado: 7, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C5.1", loc: "slides 21–25" },
      { id: "AY5-E", loc: "P1" }
    ]
  },
  {
    id: "m12-d008",
    modulo: "m12-jerarquico-aglomerativo",
    concepto: "m12-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slides 26–28" },
      { id: "AY5-E", loc: "P1" }
    ],
    titulo: "Complete linkage con distancia euclídea",
    enunciado: String.raw`<p>Cinco clientes con dos variables estandarizadas: A$(0;\ 0)$, B$(3;\ 4)$, C$(1;\ 1)$, D$(7;\ 8)$, E$(8;\ 5)$. Usa distancia euclídea.</p><p>Aplica clustering jerárquico aglomerativo con <strong>complete linkage (vecino más lejano)</strong>.</p><ol type="a"><li>Calcula la matriz de distancias e indica la primera fusión.</li><li>Actualiza las distancias y determina la segunda fusión.</li><li>Completa las fusiones restantes.</li><li>Indica las alturas del dendrograma y los grupos al cortar en 2 clústeres.</li></ol>`,
    partes: [
      { titulo: "a) Matriz de distancias y primera fusión", puntos: 1.5, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td><strong>B</strong></td><td>$5$</td><td></td><td></td><td></td></tr><tr><td><strong>C</strong></td><td>$1{,}414$</td><td>$3{,}606$</td><td></td><td></td></tr><tr><td><strong>D</strong></td><td>$10{,}63$</td><td>$5{,}657$</td><td>$9{,}22$</td><td></td></tr><tr><td><strong>E</strong></td><td>$9{,}434$</td><td>$5{,}099$</td><td>$8{,}062$</td><td>$3{,}162$</td></tr></tbody></table></div><p>Cada objeto parte como un clúster. La menor distancia de la matriz es $d(A,C)=1{,}414$ ⇒ primera fusión: <strong>{A, C}</strong> a altura $1{,}414$.</p>` },
      { titulo: "b) Distancias actualizadas y segunda fusión", puntos: 2, solucion: String.raw`<p>Con complete linkage la distancia entre clústeres es la <strong>máxima</strong> distancia entre un elemento de cada clúster.</p><p>Distancias al clúster recién formado {A, C}: $d(B,\{A,C\})=\max(5;\ 3{,}606)=5$; $d(D,\{A,C\})=\max(10{,}63;\ 9{,}22)=10{,}63$; $d(E,\{A,C\})=\max(9{,}434;\ 8{,}062)=9{,}434$.</p><p>Las demás no cambian: $d(B,D)=5{,}657$; $d(B,E)=5{,}099$; $d(D,E)=3{,}162$.</p><p>La menor es $3{,}162$ ⇒ se unen <strong>D</strong> y <strong>E</strong> a altura $3{,}162$.</p>` },
      { titulo: "c) Fusiones restantes", puntos: 1.5, solucion: String.raw`<p><strong>Fusión 3.</strong></p><p>Distancias al clúster recién formado {D, E}: $d(B,\{D,E\})=\max(5{,}657;\ 5{,}099)=5{,}657$; $d(\{A,C\},\{D,E\})=\max(10{,}63;\ 9{,}434;\ 9{,}22;\ 8{,}062)=10{,}63$.</p><p>Las demás no cambian: $d(B,\{A,C\})=5$.</p><p>La menor es $5$ ⇒ se unen <strong>B</strong> y <strong>{A, C}</strong> a altura $5$.</p><p><strong>Fusión 4.</strong></p><p>Distancias al clúster recién formado {A, B, C}: $d(\{D,E\},\{A,B,C\})=\max(10{,}63;\ 5{,}657;\ 9{,}22;\ 9{,}434;\ 5{,}099;\ 8{,}062)=10{,}63$.</p><p></p><p>La menor es $10{,}63$ ⇒ se unen <strong>{D, E}</strong> y <strong>{A, B, C}</strong> a altura $10{,}63$.</p>` },
      { titulo: "d) Alturas del dendrograma y corte en 2 clústeres", puntos: 1, solucion: `<p>Alturas de fusión: $1{,}414$; $3{,}162$; $5$; $10{,}63$.</p><p>Cortar en 2 clústeres equivale a cortar el dendrograma entre las alturas $5$ y $10{,}63$: quedan <strong>{D, E}</strong>, <strong>{A, B, C}</strong>.</p><p>En R: <code>hc <- hclust(d, method = "complete"); cutree(hc, k = 2)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "altura 1 (hclust)", r: `cat(hclust(dist(rbind(c(0, 0), c(3, 4), c(1, 1), c(7, 8), c(8, 5)), "euclidean"), "complete")$height[1])`, esperado: 1.414, tol: 0.000500001 },
      { que: "altura 2 (hclust)", r: `cat(hclust(dist(rbind(c(0, 0), c(3, 4), c(1, 1), c(7, 8), c(8, 5)), "euclidean"), "complete")$height[2])`, esperado: 3.162, tol: 0.000500001 },
      { que: "altura 3 (hclust)", r: `cat(hclust(dist(rbind(c(0, 0), c(3, 4), c(1, 1), c(7, 8), c(8, 5)), "euclidean"), "complete")$height[3])`, esperado: 5, tol: 0.000500001 },
      { que: "altura 4 (hclust)", r: `cat(hclust(dist(rbind(c(0, 0), c(3, 4), c(1, 1), c(7, 8), c(8, 5)), "euclidean"), "complete")$height[4])`, esperado: 10.63, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C5.1", loc: "slides 26–28" },
      { id: "AY5-E", loc: "P1" }
    ]
  }
]);
