/* ============================================================================
   Desarrollo · M13 K-medias y elección de k (P2) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m13-d003",
    modulo: "m13-k-medias",
    concepto: "m13-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C5.2", loc: "slides 4–6" },
      { id: "EJ-P2", loc: "P11" }
    ],
    titulo: "K-medias a mano hasta converger (6 puntos)",
    enunciado: String.raw`<p>Seis clientes con dos variables estandarizadas: P1$(1;\ 2)$, P2$(2;\ 1)$, P3$(2;\ 3)$, P4$(6;\ 5)$, P5$(7;\ 7)$, P6$(8;\ 6)$. Se aplica K-medias con $k=2$ y centroides iniciales $\mu_1=(1;\ 2)$ y $\mu_2=(2;\ 3)$ (distancia euclídea).</p><ol type="a"><li>Realiza la primera asignación.</li><li>Recalcula los centroides.</li><li>Continúa iterando hasta que el algoritmo converja.</li><li>Calcula la suma de cuadrados dentro de los clústeres (WSS) de la solución final.</li></ol>`,
    partes: [
      { titulo: "a) Iteración 1: distancias y asignación", puntos: 2, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>$d(\cdot,\mu_1)$</th><th>$d(\cdot,\mu_2)$</th><th>Clúster</th></tr></thead><tbody><tr><td>P1 $(1;\ 2)$</td><td>$0$</td><td>$1{,}41$</td><td>1</td></tr><tr><td>P2 $(2;\ 1)$</td><td>$1{,}41$</td><td>$2$</td><td>1</td></tr><tr><td>P3 $(2;\ 3)$</td><td>$1{,}41$</td><td>$0$</td><td>2</td></tr><tr><td>P4 $(6;\ 5)$</td><td>$5{,}83$</td><td>$4{,}47$</td><td>2</td></tr><tr><td>P5 $(7;\ 7)$</td><td>$7{,}81$</td><td>$6{,}4$</td><td>2</td></tr><tr><td>P6 $(8;\ 6)$</td><td>$8{,}06$</td><td>$6{,}71$</td><td>2</td></tr></tbody></table></div><p>Cada punto va al centroide más cercano. Ejemplo: $d(P6,\mu_1)=\sqrt{(7)^2+(4)^2}=8{,}06$.</p>` },
      { titulo: "b) Nuevos centroides", puntos: 1, solucion: String.raw`<p>Cada centroide es la <strong>media</strong> de los puntos de su clúster:</p><p>$\mu_1=\left(\tfrac{1+2}{2};\ \tfrac{2+1}{2}\right)=(1{,}5;\ 1{,}5)$</p><p>$\mu_2=\left(\tfrac{2+6+7+8}{4};\ \tfrac{3+5+7+6}{4}\right)=(5{,}75;\ 5{,}25)$</p>` },
      { titulo: "c) Iteraciones siguientes hasta converger", puntos: 2, solucion: String.raw`<p><strong>Iteración 2</strong> (centroides $\mu_1=(1{,}5;\ 1{,}5)$, $\mu_2=(5{,}75;\ 5{,}25)$):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>$d(\cdot,\mu_1)$</th><th>$d(\cdot,\mu_2)$</th><th>Clúster</th></tr></thead><tbody><tr><td>P1 $(1;\ 2)$</td><td>$0{,}71$</td><td>$5{,}76$</td><td>1</td></tr><tr><td>P2 $(2;\ 1)$</td><td>$0{,}71$</td><td>$5{,}67$</td><td>1</td></tr><tr><td>P3 $(2;\ 3)$</td><td>$1{,}58$</td><td>$4{,}37$</td><td>1</td></tr><tr><td>P4 $(6;\ 5)$</td><td>$5{,}7$</td><td>$0{,}35$</td><td>2</td></tr><tr><td>P5 $(7;\ 7)$</td><td>$7{,}78$</td><td>$2{,}15$</td><td>2</td></tr><tr><td>P6 $(8;\ 6)$</td><td>$7{,}91$</td><td>$2{,}37$</td><td>2</td></tr></tbody></table></div><p>Cambia la asignación de P3. Nuevos centroides:</p><p>$\mu_1=\left(\tfrac{1+2+2}{3};\ \tfrac{2+1+3}{3}\right)=(1{,}67;\ 2)$</p><p>$\mu_2=\left(\tfrac{6+7+8}{3};\ \tfrac{5+7+6}{3}\right)=(7;\ 6)$</p><p><strong>Iteración 3</strong> (centroides $\mu_1=(1{,}67;\ 2)$, $\mu_2=(7;\ 6)$):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>$d(\cdot,\mu_1)$</th><th>$d(\cdot,\mu_2)$</th><th>Clúster</th></tr></thead><tbody><tr><td>P1 $(1;\ 2)$</td><td>$0{,}67$</td><td>$7{,}21$</td><td>1</td></tr><tr><td>P2 $(2;\ 1)$</td><td>$1{,}05$</td><td>$7{,}07$</td><td>1</td></tr><tr><td>P3 $(2;\ 3)$</td><td>$1{,}05$</td><td>$5{,}83$</td><td>1</td></tr><tr><td>P4 $(6;\ 5)$</td><td>$5{,}27$</td><td>$1{,}41$</td><td>2</td></tr><tr><td>P5 $(7;\ 7)$</td><td>$7{,}31$</td><td>$1$</td><td>2</td></tr><tr><td>P6 $(8;\ 6)$</td><td>$7{,}49$</td><td>$1$</td><td>2</td></tr></tbody></table></div><p>Ninguna asignación cambia ⇒ <strong>el algoritmo converge</strong>.</p><p>Solución: clúster 1 = {P1, P2, P3}; clúster 2 = {P4, P5, P6}.</p>` },
      { titulo: "d) WSS de la solución final", puntos: 1, solucion: String.raw`<p>$WSS=\sum_j\sum_{i\in C_j}\lVert x_i-\mu_j\rVert^2$ (distancias al cuadrado de cada punto a <strong>su</strong> centroide).</p><p>Clúster 1: $2{,}667$; clúster 2: $4$ ⇒ $WSS=6{,}667$.</p><p>En R: <code>km$tot.withinss</code>. El resultado depende de los centroides iniciales; por eso se usa <code>nstart</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "WSS (kmeans con esos centroides)", r: `cat(kmeans(matrix(c(1, 2, 2, 1, 2, 3, 6, 5, 7, 7, 8, 6), ncol = 2, byrow = TRUE), centers = matrix(c(1, 2, 2, 3), ncol = 2, byrow = TRUE), algorithm = "Lloyd")$tot.withinss)`, esperado: 6.667, tol: 0.000500001 },
      { que: "tamaño del clúster 1", r: `cat(kmeans(matrix(c(1, 2, 2, 1, 2, 3, 6, 5, 7, 7, 8, 6), ncol = 2, byrow = TRUE), centers = matrix(c(1, 2, 2, 3), ncol = 2, byrow = TRUE), algorithm = "Lloyd")$size[1])`, esperado: 3, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C5.2", loc: "slides 4–6" },
      { id: "EJ-P2", loc: "P11" }
    ]
  },
  {
    id: "m13-d004",
    modulo: "m13-k-medias",
    concepto: "m13-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C5.2", loc: "slides 4–6" },
      { id: "EJ-P2", loc: "P11" }
    ],
    titulo: "K-medias a mano: cinco puntos y centroides iniciales dados",
    enunciado: String.raw`<p>Cinco locales con coordenadas: A$(2;\ 10)$, B$(2;\ 5)$, C$(8;\ 4)$, D$(5;\ 8)$, E$(7;\ 5)$. Se aplica K-medias con $k=2$ y centroides iniciales $\mu_1=(2;\ 10)$ y $\mu_2=(5;\ 8)$ (distancia euclídea).</p><ol type="a"><li>Realiza la primera asignación.</li><li>Recalcula los centroides.</li><li>Continúa iterando hasta que el algoritmo converja.</li><li>Calcula la suma de cuadrados dentro de los clústeres (WSS) de la solución final.</li></ol>`,
    partes: [
      { titulo: "a) Iteración 1: distancias y asignación", puntos: 2, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>$d(\cdot,\mu_1)$</th><th>$d(\cdot,\mu_2)$</th><th>Clúster</th></tr></thead><tbody><tr><td>A $(2;\ 10)$</td><td>$0$</td><td>$3{,}61$</td><td>1</td></tr><tr><td>B $(2;\ 5)$</td><td>$5$</td><td>$4{,}24$</td><td>2</td></tr><tr><td>C $(8;\ 4)$</td><td>$8{,}49$</td><td>$5$</td><td>2</td></tr><tr><td>D $(5;\ 8)$</td><td>$3{,}61$</td><td>$0$</td><td>2</td></tr><tr><td>E $(7;\ 5)$</td><td>$7{,}07$</td><td>$3{,}61$</td><td>2</td></tr></tbody></table></div><p>Cada punto va al centroide más cercano. Ejemplo: $d(E,\mu_1)=\sqrt{(5)^2+(-5)^2}=7{,}07$.</p>` },
      { titulo: "b) Nuevos centroides", puntos: 1, solucion: String.raw`<p>Cada centroide es la <strong>media</strong> de los puntos de su clúster:</p><p>$\mu_1=\left(\tfrac{2}{1};\ \tfrac{10}{1}\right)=(2;\ 10)$</p><p>$\mu_2=\left(\tfrac{2+8+5+7}{4};\ \tfrac{5+4+8+5}{4}\right)=(5{,}5;\ 5{,}5)$</p>` },
      { titulo: "c) Iteraciones siguientes hasta converger", puntos: 2, solucion: String.raw`<p><strong>Iteración 2</strong> (centroides $\mu_1=(2;\ 10)$, $\mu_2=(5{,}5;\ 5{,}5)$):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>$d(\cdot,\mu_1)$</th><th>$d(\cdot,\mu_2)$</th><th>Clúster</th></tr></thead><tbody><tr><td>A $(2;\ 10)$</td><td>$0$</td><td>$5{,}7$</td><td>1</td></tr><tr><td>B $(2;\ 5)$</td><td>$5$</td><td>$3{,}54$</td><td>2</td></tr><tr><td>C $(8;\ 4)$</td><td>$8{,}49$</td><td>$2{,}92$</td><td>2</td></tr><tr><td>D $(5;\ 8)$</td><td>$3{,}61$</td><td>$2{,}55$</td><td>2</td></tr><tr><td>E $(7;\ 5)$</td><td>$7{,}07$</td><td>$1{,}58$</td><td>2</td></tr></tbody></table></div><p>Ninguna asignación cambia ⇒ <strong>el algoritmo converge</strong>.</p><p>Solución: clúster 1 = {A}; clúster 2 = {B, C, D, E}.</p>` },
      { titulo: "d) WSS de la solución final", puntos: 1, solucion: String.raw`<p>$WSS=\sum_j\sum_{i\in C_j}\lVert x_i-\mu_j\rVert^2$ (distancias al cuadrado de cada punto a <strong>su</strong> centroide).</p><p>Clúster 1: $0$; clúster 2: $30$ ⇒ $WSS=30$.</p><p>En R: <code>km$tot.withinss</code>. El resultado depende de los centroides iniciales; por eso se usa <code>nstart</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "WSS (kmeans con esos centroides)", r: `cat(kmeans(matrix(c(2, 10, 2, 5, 8, 4, 5, 8, 7, 5), ncol = 2, byrow = TRUE), centers = matrix(c(2, 10, 5, 8), ncol = 2, byrow = TRUE), algorithm = "Lloyd")$tot.withinss)`, esperado: 30, tol: 0.000500001 },
      { que: "tamaño del clúster 1", r: `cat(kmeans(matrix(c(2, 10, 2, 5, 8, 4, 5, 8, 7, 5), ncol = 2, byrow = TRUE), centers = matrix(c(2, 10, 5, 8), ncol = 2, byrow = TRUE), algorithm = "Lloyd")$size[1])`, esperado: 1, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C5.2", loc: "slides 4–6" },
      { id: "EJ-P2", loc: "P11" }
    ]
  },
  {
    id: "m13-d005",
    modulo: "m13-k-medias",
    concepto: "m13-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C5.2", loc: "slides 4–6" },
      { id: "EJ-P2", loc: "P11" }
    ],
    titulo: "K-medias en una dimensión (gasto mensual)",
    enunciado: String.raw`<p>Gasto mensual (en decenas de miles de pesos) de seis clientes: C1 = $2$, C2 = $4$, C3 = $5$, C4 = $10$, C5 = $12$, C6 = $20$. Se aplica K-medias con $k=2$ y centroides iniciales $\mu_1=2$ y $\mu_2=5$ (distancia euclídea).</p><ol type="a"><li>Realiza la primera asignación.</li><li>Recalcula los centroides.</li><li>Continúa iterando hasta que el algoritmo converja.</li><li>Calcula la suma de cuadrados dentro de los clústeres (WSS) de la solución final.</li></ol>`,
    partes: [
      { titulo: "a) Iteración 1: distancias y asignación", puntos: 2, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>$d(\cdot,\mu_1)$</th><th>$d(\cdot,\mu_2)$</th><th>Clúster</th></tr></thead><tbody><tr><td>C1 $2$</td><td>$0$</td><td>$3$</td><td>1</td></tr><tr><td>C2 $4$</td><td>$2$</td><td>$1$</td><td>2</td></tr><tr><td>C3 $5$</td><td>$3$</td><td>$0$</td><td>2</td></tr><tr><td>C4 $10$</td><td>$8$</td><td>$5$</td><td>2</td></tr><tr><td>C5 $12$</td><td>$10$</td><td>$7$</td><td>2</td></tr><tr><td>C6 $20$</td><td>$18$</td><td>$15$</td><td>2</td></tr></tbody></table></div><p>Cada punto va al centroide más cercano. Ejemplo: $d(C6,\mu_1)=|20-2|=18$.</p>` },
      { titulo: "b) Nuevos centroides", puntos: 1, solucion: String.raw`<p>Cada centroide es la <strong>media</strong> de los puntos de su clúster:</p><p>$\mu_1=\dfrac{2}{1}=2$</p><p>$\mu_2=\dfrac{4+5+10+12+20}{5}=10{,}2$</p>` },
      { titulo: "c) Iteraciones siguientes hasta converger", puntos: 2, solucion: String.raw`<p><strong>Iteración 2</strong> (centroides $\mu_1=2$, $\mu_2=10{,}2$):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>$d(\cdot,\mu_1)$</th><th>$d(\cdot,\mu_2)$</th><th>Clúster</th></tr></thead><tbody><tr><td>C1 $2$</td><td>$0$</td><td>$8{,}2$</td><td>1</td></tr><tr><td>C2 $4$</td><td>$2$</td><td>$6{,}2$</td><td>1</td></tr><tr><td>C3 $5$</td><td>$3$</td><td>$5{,}2$</td><td>1</td></tr><tr><td>C4 $10$</td><td>$8$</td><td>$0{,}2$</td><td>2</td></tr><tr><td>C5 $12$</td><td>$10$</td><td>$1{,}8$</td><td>2</td></tr><tr><td>C6 $20$</td><td>$18$</td><td>$9{,}8$</td><td>2</td></tr></tbody></table></div><p>Cambia la asignación de C2, C3. Nuevos centroides:</p><p>$\mu_1=\dfrac{2+4+5}{3}=3{,}667$</p><p>$\mu_2=\dfrac{10+12+20}{3}=14$</p><p><strong>Iteración 3</strong> (centroides $\mu_1=3{,}67$, $\mu_2=14$):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>$d(\cdot,\mu_1)$</th><th>$d(\cdot,\mu_2)$</th><th>Clúster</th></tr></thead><tbody><tr><td>C1 $2$</td><td>$1{,}67$</td><td>$12$</td><td>1</td></tr><tr><td>C2 $4$</td><td>$0{,}33$</td><td>$10$</td><td>1</td></tr><tr><td>C3 $5$</td><td>$1{,}33$</td><td>$9$</td><td>1</td></tr><tr><td>C4 $10$</td><td>$6{,}33$</td><td>$4$</td><td>2</td></tr><tr><td>C5 $12$</td><td>$8{,}33$</td><td>$2$</td><td>2</td></tr><tr><td>C6 $20$</td><td>$16{,}33$</td><td>$6$</td><td>2</td></tr></tbody></table></div><p>Ninguna asignación cambia ⇒ <strong>el algoritmo converge</strong>.</p><p>Solución: clúster 1 = {C1, C2, C3}; clúster 2 = {C4, C5, C6}.</p>` },
      { titulo: "d) WSS de la solución final", puntos: 1, solucion: String.raw`<p>$WSS=\sum_j\sum_{i\in C_j}\lVert x_i-\mu_j\rVert^2$ (distancias al cuadrado de cada punto a <strong>su</strong> centroide).</p><p>Clúster 1: $4{,}667$; clúster 2: $56$ ⇒ $WSS=60{,}667$.</p><p>En R: <code>km$tot.withinss</code>. El resultado depende de los centroides iniciales; por eso se usa <code>nstart</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "WSS (kmeans con esos centroides)", r: `cat(kmeans(matrix(c(2, 4, 5, 10, 12, 20), ncol = 1, byrow = TRUE), centers = matrix(c(2, 5), ncol = 1, byrow = TRUE), algorithm = "Lloyd")$tot.withinss)`, esperado: 60.667, tol: 0.000500001 },
      { que: "tamaño del clúster 1", r: `cat(kmeans(matrix(c(2, 4, 5, 10, 12, 20), ncol = 1, byrow = TRUE), centers = matrix(c(2, 5), ncol = 1, byrow = TRUE), algorithm = "Lloyd")$size[1])`, esperado: 3, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C5.2", loc: "slides 4–6" },
      { id: "EJ-P2", loc: "P11" }
    ]
  },
  {
    id: "m13-d006",
    modulo: "m13-k-medias",
    concepto: "m13-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C5.2", loc: "slides 4–6" },
      { id: "EJ-P2", loc: "P11" }
    ],
    titulo: "K-medias con una mala inicialización",
    enunciado: String.raw`<p>Seis tiendas con dos indicadores: T1$(1;\ 1)$, T2$(1;\ 3)$, T3$(2;\ 1)$, T4$(8;\ 8)$, T5$(9;\ 7)$, T6$(9;\ 9)$. Se aplica K-medias con $k=2$ y centroides iniciales $\mu_1=(1;\ 1)$ y $\mu_2=(1;\ 3)$ (distancia euclídea).</p><ol type="a"><li>Realiza la primera asignación.</li><li>Recalcula los centroides.</li><li>Continúa iterando hasta que el algoritmo converja.</li><li>Calcula la suma de cuadrados dentro de los clústeres (WSS) de la solución final.</li></ol>`,
    partes: [
      { titulo: "a) Iteración 1: distancias y asignación", puntos: 2, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>$d(\cdot,\mu_1)$</th><th>$d(\cdot,\mu_2)$</th><th>Clúster</th></tr></thead><tbody><tr><td>T1 $(1;\ 1)$</td><td>$0$</td><td>$2$</td><td>1</td></tr><tr><td>T2 $(1;\ 3)$</td><td>$2$</td><td>$0$</td><td>2</td></tr><tr><td>T3 $(2;\ 1)$</td><td>$1$</td><td>$2{,}24$</td><td>1</td></tr><tr><td>T4 $(8;\ 8)$</td><td>$9{,}9$</td><td>$8{,}6$</td><td>2</td></tr><tr><td>T5 $(9;\ 7)$</td><td>$10$</td><td>$8{,}94$</td><td>2</td></tr><tr><td>T6 $(9;\ 9)$</td><td>$11{,}31$</td><td>$10$</td><td>2</td></tr></tbody></table></div><p>Cada punto va al centroide más cercano. Ejemplo: $d(T6,\mu_1)=\sqrt{(8)^2+(8)^2}=11{,}31$.</p>` },
      { titulo: "b) Nuevos centroides", puntos: 1, solucion: String.raw`<p>Cada centroide es la <strong>media</strong> de los puntos de su clúster:</p><p>$\mu_1=\left(\tfrac{1+2}{2};\ \tfrac{1+1}{2}\right)=(1{,}5;\ 1)$</p><p>$\mu_2=\left(\tfrac{1+8+9+9}{4};\ \tfrac{3+8+7+9}{4}\right)=(6{,}75;\ 6{,}75)$</p>` },
      { titulo: "c) Iteraciones siguientes hasta converger", puntos: 2, solucion: String.raw`<p><strong>Iteración 2</strong> (centroides $\mu_1=(1{,}5;\ 1)$, $\mu_2=(6{,}75;\ 6{,}75)$):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>$d(\cdot,\mu_1)$</th><th>$d(\cdot,\mu_2)$</th><th>Clúster</th></tr></thead><tbody><tr><td>T1 $(1;\ 1)$</td><td>$0{,}5$</td><td>$8{,}13$</td><td>1</td></tr><tr><td>T2 $(1;\ 3)$</td><td>$2{,}06$</td><td>$6{,}86$</td><td>1</td></tr><tr><td>T3 $(2;\ 1)$</td><td>$0{,}5$</td><td>$7{,}46$</td><td>1</td></tr><tr><td>T4 $(8;\ 8)$</td><td>$9{,}55$</td><td>$1{,}77$</td><td>2</td></tr><tr><td>T5 $(9;\ 7)$</td><td>$9{,}6$</td><td>$2{,}26$</td><td>2</td></tr><tr><td>T6 $(9;\ 9)$</td><td>$10{,}97$</td><td>$3{,}18$</td><td>2</td></tr></tbody></table></div><p>Cambia la asignación de T2. Nuevos centroides:</p><p>$\mu_1=\left(\tfrac{1+1+2}{3};\ \tfrac{1+3+1}{3}\right)=(1{,}33;\ 1{,}67)$</p><p>$\mu_2=\left(\tfrac{8+9+9}{3};\ \tfrac{8+7+9}{3}\right)=(8{,}67;\ 8)$</p><p><strong>Iteración 3</strong> (centroides $\mu_1=(1{,}33;\ 1{,}67)$, $\mu_2=(8{,}67;\ 8)$):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>$d(\cdot,\mu_1)$</th><th>$d(\cdot,\mu_2)$</th><th>Clúster</th></tr></thead><tbody><tr><td>T1 $(1;\ 1)$</td><td>$0{,}75$</td><td>$10{,}38$</td><td>1</td></tr><tr><td>T2 $(1;\ 3)$</td><td>$1{,}37$</td><td>$9{,}15$</td><td>1</td></tr><tr><td>T3 $(2;\ 1)$</td><td>$0{,}94$</td><td>$9{,}67$</td><td>1</td></tr><tr><td>T4 $(8;\ 8)$</td><td>$9{,}2$</td><td>$0{,}67$</td><td>2</td></tr><tr><td>T5 $(9;\ 7)$</td><td>$9{,}34$</td><td>$1{,}05$</td><td>2</td></tr><tr><td>T6 $(9;\ 9)$</td><td>$10{,}61$</td><td>$1{,}05$</td><td>2</td></tr></tbody></table></div><p>Ninguna asignación cambia ⇒ <strong>el algoritmo converge</strong>.</p><p>Solución: clúster 1 = {T1, T2, T3}; clúster 2 = {T4, T5, T6}.</p>` },
      { titulo: "d) WSS de la solución final", puntos: 1, solucion: String.raw`<p>$WSS=\sum_j\sum_{i\in C_j}\lVert x_i-\mu_j\rVert^2$ (distancias al cuadrado de cada punto a <strong>su</strong> centroide).</p><p>Clúster 1: $3{,}333$; clúster 2: $2{,}667$ ⇒ $WSS=6$.</p><p>En R: <code>km$tot.withinss</code>. El resultado depende de los centroides iniciales; por eso se usa <code>nstart</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "WSS (kmeans con esos centroides)", r: `cat(kmeans(matrix(c(1, 1, 1, 3, 2, 1, 8, 8, 9, 7, 9, 9), ncol = 2, byrow = TRUE), centers = matrix(c(1, 1, 1, 3), ncol = 2, byrow = TRUE), algorithm = "Lloyd")$tot.withinss)`, esperado: 6, tol: 0.000500001 },
      { que: "tamaño del clúster 1", r: `cat(kmeans(matrix(c(1, 1, 1, 3, 2, 1, 8, 8, 9, 7, 9, 9), ncol = 2, byrow = TRUE), centers = matrix(c(1, 1, 1, 3), ncol = 2, byrow = TRUE), algorithm = "Lloyd")$size[1])`, esperado: 3, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C5.2", loc: "slides 4–6" },
      { id: "EJ-P2", loc: "P11" }
    ]
  },
  {
    id: "m13-d007",
    modulo: "m13-k-medias",
    concepto: "m13-c07",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.2", loc: "slides 14–18" },
      { id: "PR-P2-Q12", loc: "pregunta 1 e" }
    ],
    titulo: "Coeficiente de silueta a mano (datos en una dimensión)",
    enunciado: `<p>Cinco observaciones agrupadas en 2 clústeres:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>Valor</th><th>Clúster</th></tr></thead><tbody><tr><td>A</td><td>$1$</td><td>1</td></tr><tr><td>B</td><td>$2$</td><td>1</td></tr><tr><td>C</td><td>$4$</td><td>1</td></tr><tr><td>D</td><td>$8$</td><td>2</td></tr><tr><td>E</td><td>$10$</td><td>2</td></tr></tbody></table></div><ol type="a"><li>Calcula el coeficiente de silueta de C.</li><li>Calcula el coeficiente de silueta de D.</li><li>Con las siluetas de todos los puntos, calcula el promedio y evalúa el agrupamiento.</li></ol>`,
    partes: [
      { titulo: "a) Silueta de C: a(i), b(i) y s(i)", puntos: 2, solucion: String.raw`<p>$a(C)$ = distancia promedio a los demás puntos de <strong>su</strong> clúster $=\dfrac{3+2}{2}=2{,}5$.</p><p>Distancia promedio al clúster 2: $\dfrac{4+6}{2}=5$.</p><p>$b(C)$ = la menor de las distancias promedio a los otros clústeres $=5$.</p><p>$s(C)=\dfrac{b-a}{\max(a,b)}=\dfrac{5-2{,}5}{5}=0{,}5$ ⇒ asignación débil.</p>` },
      { titulo: "b) Silueta de D", puntos: 2, solucion: String.raw`<p>$a(D)$ = distancia promedio a los demás puntos de <strong>su</strong> clúster $=2$.</p><p>Distancia promedio al clúster 1: $\dfrac{7+6+4}{3}=5{,}667$.</p><p>$b(D)$ = la menor de las distancias promedio a los otros clústeres $=5{,}667$.</p><p>$s(D)=\dfrac{b-a}{\max(a,b)}=\dfrac{5{,}667-2}{5{,}667}=0{,}647$ ⇒ bien asignado (cerca de $1$).</p>` },
      { titulo: "c) Silueta promedio y evaluación", puntos: 2, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr></thead><tbody><tr><td>$a(i)$</td><td>$2$</td><td>$1{,}5$</td><td>$2{,}5$</td><td>$2$</td><td>$2$</td></tr><tr><td>$b(i)$</td><td>$8$</td><td>$7$</td><td>$5$</td><td>$5{,}667$</td><td>$7{,}667$</td></tr><tr><td>$s(i)$</td><td>$0{,}75$</td><td>$0{,}786$</td><td>$0{,}5$</td><td>$0{,}647$</td><td>$0{,}739$</td></tr></tbody></table></div><p>Silueta promedio $=0{,}684$.</p><p>Estructura razonable. Ninguna silueta es negativa ni cercana a $0$.</p><p>Para elegir $k$ se prefiere el que maximiza la silueta promedio. En R: <code>silhouette(km$cluster, dist(datos))</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "s(C)", r: "cat(cluster::silhouette(c(1, 1, 1, 2, 2), dist(matrix(c(1, 2, 4, 8, 10), ncol = 1, byrow = TRUE)))[3, 3])", esperado: 0.5, tol: 0.000500001 },
      { que: "s(D)", r: "cat(cluster::silhouette(c(1, 1, 1, 2, 2), dist(matrix(c(1, 2, 4, 8, 10), ncol = 1, byrow = TRUE)))[4, 3])", esperado: 0.647, tol: 0.000500001 },
      { que: "silueta promedio", r: "cat(mean(cluster::silhouette(c(1, 1, 1, 2, 2), dist(matrix(c(1, 2, 4, 8, 10), ncol = 1, byrow = TRUE)))[, 3]))", esperado: 0.684, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C5.2", loc: "slides 14–18" },
      { id: "PR-P2-Q12", loc: "pregunta 1 e" }
    ]
  },
  {
    id: "m13-d008",
    modulo: "m13-k-medias",
    concepto: "m13-c07",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.2", loc: "slides 14–18" },
      { id: "PR-P2-Q12", loc: "pregunta 1 e" }
    ],
    titulo: "Silueta de un punto mal asignado",
    enunciado: `<p>Cinco observaciones agrupadas en 2 clústeres (revisa la asignación de C):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>Valor</th><th>Clúster</th></tr></thead><tbody><tr><td>A</td><td>$1$</td><td>1</td></tr><tr><td>B</td><td>$2$</td><td>1</td></tr><tr><td>C</td><td>$6$</td><td>1</td></tr><tr><td>D</td><td>$8$</td><td>2</td></tr><tr><td>E</td><td>$10$</td><td>2</td></tr></tbody></table></div><ol type="a"><li>Calcula el coeficiente de silueta de C.</li><li>Calcula el coeficiente de silueta de A.</li><li>Con las siluetas de todos los puntos, calcula el promedio y evalúa el agrupamiento.</li></ol>`,
    partes: [
      { titulo: "a) Silueta de C: a(i), b(i) y s(i)", puntos: 2, solucion: String.raw`<p>$a(C)$ = distancia promedio a los demás puntos de <strong>su</strong> clúster $=\dfrac{5+4}{2}=4{,}5$.</p><p>Distancia promedio al clúster 2: $\dfrac{2+4}{2}=3$.</p><p>$b(C)$ = la menor de las distancias promedio a los otros clústeres $=3$.</p><p>$s(C)=\dfrac{b-a}{\max(a,b)}=\dfrac{3-4{,}5}{4{,}5}=-0{,}333$ ⇒ probablemente <strong>mal asignado</strong> (negativo): está más cerca del clúster vecino.</p>` },
      { titulo: "b) Silueta de A", puntos: 2, solucion: String.raw`<p>$a(A)$ = distancia promedio a los demás puntos de <strong>su</strong> clúster $=\dfrac{1+5}{2}=3$.</p><p>Distancia promedio al clúster 2: $\dfrac{7+9}{2}=8$.</p><p>$b(A)$ = la menor de las distancias promedio a los otros clústeres $=8$.</p><p>$s(A)=\dfrac{b-a}{\max(a,b)}=\dfrac{8-3}{8}=0{,}625$ ⇒ bien asignado (cerca de $1$).</p>` },
      { titulo: "c) Silueta promedio y evaluación", puntos: 2, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr></thead><tbody><tr><td>$a(i)$</td><td>$3$</td><td>$2{,}5$</td><td>$4{,}5$</td><td>$2$</td><td>$2$</td></tr><tr><td>$b(i)$</td><td>$8$</td><td>$7$</td><td>$3$</td><td>$5$</td><td>$7$</td></tr><tr><td>$s(i)$</td><td>$0{,}625$</td><td>$0{,}643$</td><td>$-0{,}333$</td><td>$0{,}6$</td><td>$0{,}714$</td></tr></tbody></table></div><p>Silueta promedio $=0{,}45$.</p><p>Estructura débil. Hay siluetas negativas (C): conviene revisar esa asignación o probar otro $k$.</p><p>Para elegir $k$ se prefiere el que maximiza la silueta promedio. En R: <code>silhouette(km$cluster, dist(datos))</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "s(C)", r: "cat(cluster::silhouette(c(1, 1, 1, 2, 2), dist(matrix(c(1, 2, 6, 8, 10), ncol = 1, byrow = TRUE)))[3, 3])", esperado: -0.333, tol: 0.000500001 },
      { que: "s(A)", r: "cat(cluster::silhouette(c(1, 1, 1, 2, 2), dist(matrix(c(1, 2, 6, 8, 10), ncol = 1, byrow = TRUE)))[1, 3])", esperado: 0.625, tol: 0.000500001 },
      { que: "silueta promedio", r: "cat(mean(cluster::silhouette(c(1, 1, 1, 2, 2), dist(matrix(c(1, 2, 6, 8, 10), ncol = 1, byrow = TRUE)))[, 3]))", esperado: 0.45, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C5.2", loc: "slides 14–18" },
      { id: "PR-P2-Q12", loc: "pregunta 1 e" }
    ]
  },
  {
    id: "m13-d009",
    modulo: "m13-k-medias",
    concepto: "m13-c07",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.2", loc: "slides 14–18" },
      { id: "PR-P2-Q12", loc: "pregunta 1 e" }
    ],
    titulo: "Silueta con tres clústeres: ¿cuál es el vecino?",
    enunciado: `<p>Seis observaciones agrupadas en 3 clústeres:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>Valor</th><th>Clúster</th></tr></thead><tbody><tr><td>A</td><td>$1$</td><td>1</td></tr><tr><td>B</td><td>$3$</td><td>1</td></tr><tr><td>C</td><td>$6$</td><td>2</td></tr><tr><td>D</td><td>$7$</td><td>2</td></tr><tr><td>E</td><td>$12$</td><td>3</td></tr><tr><td>F</td><td>$14$</td><td>3</td></tr></tbody></table></div><ol type="a"><li>Calcula el coeficiente de silueta de C.</li><li>Calcula el coeficiente de silueta de B.</li><li>Con las siluetas de todos los puntos, calcula el promedio y evalúa el agrupamiento.</li></ol>`,
    partes: [
      { titulo: "a) Silueta de C: a(i), b(i) y s(i)", puntos: 2, solucion: String.raw`<p>$a(C)$ = distancia promedio a los demás puntos de <strong>su</strong> clúster $=1$.</p><p>Distancia promedio al clúster 1: $\dfrac{5+3}{2}=4$.</p><p>Distancia promedio al clúster 3: $\dfrac{6+8}{2}=7$.</p><p>$b(C)$ = la menor de las distancias promedio a los otros clústeres $=4$ (clúster vecino: 1).</p><p>$s(C)=\dfrac{b-a}{\max(a,b)}=\dfrac{4-1}{4}=0{,}75$ ⇒ bien asignado (cerca de $1$).</p>` },
      { titulo: "b) Silueta de B", puntos: 2, solucion: String.raw`<p>$a(B)$ = distancia promedio a los demás puntos de <strong>su</strong> clúster $=2$.</p><p>Distancia promedio al clúster 2: $\dfrac{3+4}{2}=3{,}5$.</p><p>Distancia promedio al clúster 3: $\dfrac{9+11}{2}=10$.</p><p>$b(B)$ = la menor de las distancias promedio a los otros clústeres $=3{,}5$ (clúster vecino: 2).</p><p>$s(B)=\dfrac{b-a}{\max(a,b)}=\dfrac{3{,}5-2}{3{,}5}=0{,}429$ ⇒ asignación débil.</p>` },
      { titulo: "c) Silueta promedio y evaluación", puntos: 2, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th></tr></thead><tbody><tr><td>$a(i)$</td><td>$2$</td><td>$2$</td><td>$1$</td><td>$1$</td><td>$2$</td><td>$2$</td></tr><tr><td>$b(i)$</td><td>$5{,}5$</td><td>$3{,}5$</td><td>$4$</td><td>$5$</td><td>$5{,}5$</td><td>$7{,}5$</td></tr><tr><td>$s(i)$</td><td>$0{,}636$</td><td>$0{,}429$</td><td>$0{,}75$</td><td>$0{,}8$</td><td>$0{,}636$</td><td>$0{,}733$</td></tr></tbody></table></div><p>Silueta promedio $=0{,}664$.</p><p>Estructura razonable. Ninguna silueta es negativa ni cercana a $0$.</p><p>Para elegir $k$ se prefiere el que maximiza la silueta promedio. En R: <code>silhouette(km$cluster, dist(datos))</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "s(C)", r: "cat(cluster::silhouette(c(1, 1, 2, 2, 3, 3), dist(matrix(c(1, 3, 6, 7, 12, 14), ncol = 1, byrow = TRUE)))[3, 3])", esperado: 0.75, tol: 0.000500001 },
      { que: "s(B)", r: "cat(cluster::silhouette(c(1, 1, 2, 2, 3, 3), dist(matrix(c(1, 3, 6, 7, 12, 14), ncol = 1, byrow = TRUE)))[2, 3])", esperado: 0.429, tol: 0.000500001 },
      { que: "silueta promedio", r: "cat(mean(cluster::silhouette(c(1, 1, 2, 2, 3, 3), dist(matrix(c(1, 3, 6, 7, 12, 14), ncol = 1, byrow = TRUE)))[, 3]))", esperado: 0.664, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C5.2", loc: "slides 14–18" },
      { id: "PR-P2-Q12", loc: "pregunta 1 e" }
    ]
  },
  {
    id: "m13-d010",
    modulo: "m13-k-medias",
    concepto: "m13-c07",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.2", loc: "slides 14–18" },
      { id: "PR-P2-Q12", loc: "pregunta 1 e" }
    ],
    titulo: "Silueta a mano en dos dimensiones",
    enunciado: String.raw`<p>Cinco puntos agrupados en 2 clústeres (distancia euclídea):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>Coordenadas</th><th>Clúster</th></tr></thead><tbody><tr><td>A</td><td>$(1;\ 1)$</td><td>1</td></tr><tr><td>B</td><td>$(2;\ 1)$</td><td>1</td></tr><tr><td>C</td><td>$(1;\ 3)$</td><td>1</td></tr><tr><td>D</td><td>$(5;\ 4)$</td><td>2</td></tr><tr><td>E</td><td>$(6;\ 5)$</td><td>2</td></tr></tbody></table></div><ol type="a"><li>Calcula el coeficiente de silueta de C.</li><li>Calcula el coeficiente de silueta de D.</li><li>Con las siluetas de todos los puntos, calcula el promedio y evalúa el agrupamiento.</li></ol>`,
    partes: [
      { titulo: "a) Silueta de C: a(i), b(i) y s(i)", puntos: 2, solucion: String.raw`<p>$a(C)$ = distancia promedio a los demás puntos de <strong>su</strong> clúster $=\dfrac{2+2{,}236}{2}=2{,}118$.</p><p>Distancia promedio al clúster 2: $\dfrac{4{,}123+5{,}385}{2}=4{,}754$.</p><p>$b(C)$ = la menor de las distancias promedio a los otros clústeres $=4{,}754$.</p><p>$s(C)=\dfrac{b-a}{\max(a,b)}=\dfrac{4{,}754-2{,}118}{4{,}754}=0{,}554$ ⇒ bien asignado (cerca de $1$).</p>` },
      { titulo: "b) Silueta de D", puntos: 2, solucion: String.raw`<p>$a(D)$ = distancia promedio a los demás puntos de <strong>su</strong> clúster $=1{,}414$.</p><p>Distancia promedio al clúster 1: $\dfrac{5+4{,}243+4{,}123}{3}=4{,}455$.</p><p>$b(D)$ = la menor de las distancias promedio a los otros clústeres $=4{,}455$.</p><p>$s(D)=\dfrac{b-a}{\max(a,b)}=\dfrac{4{,}455-1{,}414}{4{,}455}=0{,}683$ ⇒ bien asignado (cerca de $1$).</p>` },
      { titulo: "c) Silueta promedio y evaluación", puntos: 2, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Punto</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr></thead><tbody><tr><td>$a(i)$</td><td>$1{,}5$</td><td>$1{,}618$</td><td>$2{,}118$</td><td>$1{,}414$</td><td>$1{,}414$</td></tr><tr><td>$b(i)$</td><td>$5{,}702$</td><td>$4{,}95$</td><td>$4{,}754$</td><td>$4{,}455$</td><td>$5{,}815$</td></tr><tr><td>$s(i)$</td><td>$0{,}737$</td><td>$0{,}673$</td><td>$0{,}554$</td><td>$0{,}683$</td><td>$0{,}757$</td></tr></tbody></table></div><p>Silueta promedio $=0{,}681$.</p><p>Estructura razonable. Ninguna silueta es negativa ni cercana a $0$.</p><p>Para elegir $k$ se prefiere el que maximiza la silueta promedio. En R: <code>silhouette(km$cluster, dist(datos))</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "s(C)", r: "cat(cluster::silhouette(c(1, 1, 1, 2, 2), dist(matrix(c(1, 1, 2, 1, 1, 3, 5, 4, 6, 5), ncol = 2, byrow = TRUE)))[3, 3])", esperado: 0.554, tol: 0.000500001 },
      { que: "s(D)", r: "cat(cluster::silhouette(c(1, 1, 1, 2, 2), dist(matrix(c(1, 1, 2, 1, 1, 3, 5, 4, 6, 5), ncol = 2, byrow = TRUE)))[4, 3])", esperado: 0.683, tol: 0.000500001 },
      { que: "silueta promedio", r: "cat(mean(cluster::silhouette(c(1, 1, 1, 2, 2), dist(matrix(c(1, 1, 2, 1, 1, 3, 5, 4, 6, 5), ncol = 2, byrow = TRUE)))[, 3]))", esperado: 0.681, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C5.2", loc: "slides 14–18" },
      { id: "PR-P2-Q12", loc: "pregunta 1 e" }
    ]
  },
  {
    id: "m13-d011",
    modulo: "m13-k-medias",
    concepto: "m13-c06",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C5.2", loc: "slides 10–13" },
      { id: "EJ-P2", loc: "P12" }
    ],
    titulo: "WSS a mano y método del codo (una dimensión)",
    enunciado: String.raw`<p>Tiempos de entrega (días) de siete pedidos: P1 = $2$, P2 = $3$, P3 = $4$, P4 = $10$, P5 = $11$, P6 = $12$, P7 = $13$.</p><ol type="a"><li>Calcula la WSS con $k=1$.</li><li>Calcula la WSS con $k=2$ para la partición {P1, P2, P3}, {P4, P5, P6, P7}.</li><li>En R se obtuvo la WSS para $k=1,\dots,5$: $130{,}86$; $7$; $3$; $1{,}5$; $1$. Aplica el método del codo.</li></ol>`,
    partes: [
      { titulo: "a) WSS con un solo clúster", puntos: 2, solucion: String.raw`<p>Con $k=1$ el centroide es la media global: $\mu=7{,}86$.</p><p>$WSS(1)=\sum\lVert x_i-\mu\rVert^2=(-5{,}857)^2+(-4{,}857)^2+(-3{,}857)^2+(2{,}143)^2+(3{,}143)^2+(4{,}143)^2+(5{,}143)^2=130{,}857$.</p><p>Es la suma de cuadrados total.</p>` },
      { titulo: "b) WSS con 2 clústeres", puntos: 2, solucion: String.raw`<p>{P1, P2, P3}: centroide $3$; suma de cuadrados $=(-1)^2+(0)^2+(1)^2=2$.</p><p>{P4, P5, P6, P7}: centroide $11{,}5$; suma de cuadrados $=(-1{,}5)^2+(-0{,}5)^2+(0{,}5)^2+(1{,}5)^2=5$.</p><p>$WSS(2)=2+5=7$: una reducción de $94{,}7\,\%$ respecto de $k=1$.</p>` },
      { titulo: "c) Método del codo", puntos: 2, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$k$</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><td>WSS</td><td>$130{,}86$</td><td>$7$</td><td>$3$</td><td>$1{,}5$</td><td>$1$</td></tr><tr><td>Reducción</td><td>—</td><td>$123{,}86$</td><td>$4$</td><td>$1{,}5$</td><td>$0{,}5$</td></tr></tbody></table></div><p>La WSS siempre decrece al aumentar $k$ (llega a $0$ con $k=n$), así que <strong>no</strong> se elige el $k$ de menor WSS. La caída es grande hasta $k=2$ y después la curva se aplana ⇒ el codo está en <strong>$k=2$</strong>.</p><p>Conviene confirmar con el coeficiente de silueta.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "WSS(1)", r: "cat(kmeans(matrix(c(2, 3, 4, 10, 11, 12, 13), ncol = 1, byrow = TRUE), centers = 1)$tot.withinss)", esperado: 130.857, tol: 0.000500001 },
      { que: "WSS(2)", r: "cat({set.seed(1); kmeans(matrix(c(2, 3, 4, 10, 11, 12, 13), ncol = 1, byrow = TRUE), centers = 2, nstart = 50)$tot.withinss})", esperado: 7, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C5.2", loc: "slides 10–13" },
      { id: "EJ-P2", loc: "P12" }
    ]
  },
  {
    id: "m13-d012",
    modulo: "m13-k-medias",
    concepto: "m13-c06",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C5.2", loc: "slides 10–13" },
      { id: "EJ-P2", loc: "P12" }
    ],
    titulo: "WSS a mano y codo con tres grupos (dos dimensiones)",
    enunciado: String.raw`<p>Seis locales con coordenadas: A$(1;\ 1)$, B$(2;\ 2)$, C$(8;\ 1)$, D$(9;\ 2)$, E$(5;\ 8)$, F$(6;\ 9)$.</p><ol type="a"><li>Calcula la WSS con $k=1$.</li><li>Calcula la WSS con $k=3$ para la partición {A, B}, {C, D}, {E, F}.</li><li>En R se obtuvo la WSS para $k=1,\dots,5$: $117{,}67$; $52$; $3$; $2$; $1$. Aplica el método del codo.</li></ol>`,
    partes: [
      { titulo: "a) WSS con un solo clúster", puntos: 2, solucion: String.raw`<p>Con $k=1$ el centroide es la media global: $\mu=(5{,}17;\ 3{,}83)$.</p><p>$WSS(1)=\sum\lVert x_i-\mu\rVert^2=[(-4{,}167)^2+(-2{,}833)^2]+[(-3{,}167)^2+(-1{,}833)^2]+[(2{,}833)^2+(-2{,}833)^2]+[(3{,}833)^2+(-1{,}833)^2]+[(-0{,}167)^2+(4{,}167)^2]+[(0{,}833)^2+(5{,}167)^2]=117{,}667$.</p><p>Es la suma de cuadrados total.</p>` },
      { titulo: "b) WSS con 3 clústeres", puntos: 2, solucion: String.raw`<p>{A, B}: centroide $(1{,}5;\ 1{,}5)$; suma de cuadrados $=[(-0{,}5)^2+(-0{,}5)^2]+[(0{,}5)^2+(0{,}5)^2]=1$.</p><p>{C, D}: centroide $(8{,}5;\ 1{,}5)$; suma de cuadrados $=[(-0{,}5)^2+(-0{,}5)^2]+[(0{,}5)^2+(0{,}5)^2]=1$.</p><p>{E, F}: centroide $(5{,}5;\ 8{,}5)$; suma de cuadrados $=[(-0{,}5)^2+(-0{,}5)^2]+[(0{,}5)^2+(0{,}5)^2]=1$.</p><p>$WSS(3)=1+1+1=3$: una reducción de $97{,}5\,\%$ respecto de $k=1$.</p>` },
      { titulo: "c) Método del codo", puntos: 2, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$k$</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><td>WSS</td><td>$117{,}67$</td><td>$52$</td><td>$3$</td><td>$2$</td><td>$1$</td></tr><tr><td>Reducción</td><td>—</td><td>$65{,}67$</td><td>$49$</td><td>$1$</td><td>$1$</td></tr></tbody></table></div><p>La WSS siempre decrece al aumentar $k$ (llega a $0$ con $k=n$), así que <strong>no</strong> se elige el $k$ de menor WSS. La caída es grande hasta $k=3$ y después la curva se aplana ⇒ el codo está en <strong>$k=3$</strong>.</p><p>Conviene confirmar con el coeficiente de silueta.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "WSS(1)", r: "cat(kmeans(matrix(c(1, 1, 2, 2, 8, 1, 9, 2, 5, 8, 6, 9), ncol = 2, byrow = TRUE), centers = 1)$tot.withinss)", esperado: 117.667, tol: 0.000500001 },
      { que: "WSS(3)", r: "cat({set.seed(1); kmeans(matrix(c(1, 1, 2, 2, 8, 1, 9, 2, 5, 8, 6, 9), ncol = 2, byrow = TRUE), centers = 3, nstart = 50)$tot.withinss})", esperado: 3, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C5.2", loc: "slides 10–13" },
      { id: "EJ-P2", loc: "P12" }
    ]
  }
]);
