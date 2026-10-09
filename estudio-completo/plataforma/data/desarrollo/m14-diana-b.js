/* ============================================================================
   Desarrollo · M14 DIANA (P2) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m14-d001",
    modulo: "m14-diana",
    concepto: "m14-c01",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.2", loc: "slides 20–28" }
    ],
    titulo: "DIANA a mano: escisión y dos rondas de reasignación",
    enunciado: `<p>Se quiere dividir un grupo de cinco sucursales. La matriz de distancias entre 5 objetos es:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td><strong>B</strong></td><td>$2$</td><td></td><td></td><td></td></tr><tr><td><strong>C</strong></td><td>$6$</td><td>$5$</td><td></td><td></td></tr><tr><td><strong>D</strong></td><td>$10$</td><td>$8$</td><td>$4$</td><td></td></tr><tr><td><strong>E</strong></td><td>$9$</td><td>$7$</td><td>$3$</td><td>$11$</td></tr></tbody></table></div><p>Aplica el algoritmo desagregativo <strong>DIANA</strong>.</p><ol type="a"><li>Calcula la disparidad promedio de cada objeto e indica cuál se escinde primero.</li><li>Realiza la primera ronda de reasignación.</li><li>Continúa hasta que nadie se mueva e indica la primera división.</li><li>¿Qué clúster se divide a continuación y cómo? Indica la solución con 3 clústeres.</li></ol>`,
    partes: [
      { titulo: "a) Disparidades promedio y objeto que se escinde", puntos: 1.5, solucion: String.raw`<p>Disparidad = distancia promedio a los demás objetos del clúster:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Objeto</th><th>Cálculo</th><th>Disparidad</th></tr></thead><tbody><tr><td>A</td><td>$\tfrac{2+6+10+9}{4}$</td><td>$6{,}75$</td></tr><tr><td>B</td><td>$\tfrac{2+5+8+7}{4}$</td><td>$5{,}5$</td></tr><tr><td>C</td><td>$\tfrac{6+5+4+3}{4}$</td><td>$4{,}5$</td></tr><tr><td>D</td><td>$\tfrac{10+8+4+11}{4}$</td><td>$8{,}25$</td></tr><tr><td>E</td><td>$\tfrac{9+7+3+11}{4}$</td><td>$7{,}5$</td></tr></tbody></table></div><p>La mayor es la de <strong>D</strong> ($8{,}25$) ⇒ $C_1=\{D\}$ y $C_2$ = {A, B, C, E}.</p>` },
      { titulo: "b) Primera ronda de reasignación", puntos: 2, solucion: String.raw`<p>Para cada $i\in C_2$: $\text{dif}=d(i,\,C_2\setminus\{i\})-d(i,\,C_1)$ (promedios). Si $\text{dif}>0$, $i$ está más cerca de $C_1$ y se mueve.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$i$</th><th>$d(i,\,C_2\setminus\{i\})$</th><th>$d(i,\,C_1)$</th><th>dif</th></tr></thead><tbody><tr><td>A</td><td>$\tfrac{2+6+9}{3}=5{,}67$</td><td>$10$</td><td>$-4{,}33$</td></tr><tr><td>B</td><td>$\tfrac{2+5+7}{3}=4{,}67$</td><td>$8$</td><td>$-3{,}33$</td></tr><tr><td>C</td><td>$\tfrac{6+5+3}{3}=4{,}67$</td><td>$4$</td><td>$0{,}67$</td></tr><tr><td>E</td><td>$\tfrac{9+7+3}{3}=6{,}33$</td><td>$11$</td><td>$-4{,}67$</td></tr></tbody></table></div><p>Solo C tiene dif positiva ⇒ <strong>C pasa a $C_1$</strong>.</p>` },
      { titulo: "c) Rondas siguientes y primera división", puntos: 1, solucion: String.raw`<p><strong>Ronda 2</strong>, con $C_1$ = {C, D}:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$i$</th><th>$d(i,\,C_2\setminus\{i\})$</th><th>$d(i,\,C_1)$</th><th>dif</th></tr></thead><tbody><tr><td>A</td><td>$\tfrac{2+9}{2}=5{,}5$</td><td>$\tfrac{6+10}{2}=8$</td><td>$-2{,}5$</td></tr><tr><td>B</td><td>$\tfrac{2+7}{2}=4{,}5$</td><td>$\tfrac{5+8}{2}=6{,}5$</td><td>$-2$</td></tr><tr><td>E</td><td>$\tfrac{9+7}{2}=8$</td><td>$\tfrac{3+11}{2}=7$</td><td>$1$</td></tr></tbody></table></div><p>E tiene dif positiva ⇒ pasa a $C_1$.</p><p><strong>Ronda 3</strong>, con $C_1$ = {C, D, E}:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$i$</th><th>$d(i,\,C_2\setminus\{i\})$</th><th>$d(i,\,C_1)$</th><th>dif</th></tr></thead><tbody><tr><td>A</td><td>$2$</td><td>$\tfrac{6+10+9}{3}=8{,}33$</td><td>$-6{,}33$</td></tr><tr><td>B</td><td>$2$</td><td>$\tfrac{5+8+7}{3}=6{,}67$</td><td>$-4{,}67$</td></tr></tbody></table></div><p>Todas negativas ⇒ la división es estable.</p><p>Primera división: <strong>{C, D, E}</strong> y <strong>{A, B}</strong>.</p>` },
      { titulo: "d) Segunda división y solución con 3 clústeres", puntos: 1.5, solucion: "<p>Se divide el clúster más heterogéneo. Distancia promedio interna: {C, D, E} $=6$; {A, B} $=2$ ⇒ se divide <strong>{C, D, E}</strong>.</p><p>Disparidades dentro de {C, D, E}: D $=7{,}5$; E $=7$; C $=3{,}5$ ⇒ sale <strong>D</strong>.</p><p>Reasignación: dif(C) $=-1$; dif(E) $=-8$ ⇒ nadie se mueve.</p><p>Con 3 clústeres: <strong>{A, B}</strong>, <strong>{D}</strong>, <strong>{C, E}</strong>. En R: <code>cutree(as.hclust(diana(d)), k = 3)</code>.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "partición en 2 (diana)", r: `cat(as.numeric(paste(cutree(as.hclust(cluster::diana(as.dist(matrix(c(0, 2, 6, 10, 9, 2, 0, 5, 8, 7, 6, 5, 0, 4, 3, 10, 8, 4, 0, 11, 9, 7, 3, 11, 0), 5, byrow = TRUE)))), 2), collapse = "")))`, esperado: 11222, tol: 0.000050001 },
      { que: "partición en 3 (diana)", r: `cat(as.numeric(paste(cutree(as.hclust(cluster::diana(as.dist(matrix(c(0, 2, 6, 10, 9, 2, 0, 5, 8, 7, 6, 5, 0, 4, 3, 10, 8, 4, 0, 11, 9, 7, 3, 11, 0), 5, byrow = TRUE)))), 3), collapse = "")))`, esperado: 11232, tol: 0.000050001 },
      { que: "disparidad de D", js: "media([10,8,4,11])", esperado: 8.25, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C5.2", loc: "slides 20–28" }
    ]
  },
  {
    id: "m14-d002",
    modulo: "m14-diana",
    concepto: "m14-c01",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.2", loc: "slides 20–28" }
    ],
    titulo: "DIANA a mano con otra matriz de distancias",
    enunciado: `<p>Cinco productos comparados según su perfil de ventas. La matriz de distancias entre 5 objetos es:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td><strong>B</strong></td><td>$3$</td><td></td><td></td><td></td></tr><tr><td><strong>C</strong></td><td>$8$</td><td>$6$</td><td></td><td></td></tr><tr><td><strong>D</strong></td><td>$12$</td><td>$11$</td><td>$5$</td><td></td></tr><tr><td><strong>E</strong></td><td>$10$</td><td>$9$</td><td>$8$</td><td>$4$</td></tr></tbody></table></div><p>Aplica el algoritmo desagregativo <strong>DIANA</strong>.</p><ol type="a"><li>Calcula la disparidad promedio de cada objeto e indica cuál se escinde primero.</li><li>Realiza la primera ronda de reasignación.</li><li>Continúa hasta que nadie se mueva e indica la primera división.</li><li>¿Qué clúster se divide a continuación y cómo? Indica la solución con 3 clústeres.</li></ol>`,
    partes: [
      { titulo: "a) Disparidades promedio y objeto que se escinde", puntos: 1.5, solucion: String.raw`<p>Disparidad = distancia promedio a los demás objetos del clúster:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Objeto</th><th>Cálculo</th><th>Disparidad</th></tr></thead><tbody><tr><td>A</td><td>$\tfrac{3+8+12+10}{4}$</td><td>$8{,}25$</td></tr><tr><td>B</td><td>$\tfrac{3+6+11+9}{4}$</td><td>$7{,}25$</td></tr><tr><td>C</td><td>$\tfrac{8+6+5+8}{4}$</td><td>$6{,}75$</td></tr><tr><td>D</td><td>$\tfrac{12+11+5+4}{4}$</td><td>$8$</td></tr><tr><td>E</td><td>$\tfrac{10+9+8+4}{4}$</td><td>$7{,}75$</td></tr></tbody></table></div><p>La mayor es la de <strong>A</strong> ($8{,}25$) ⇒ $C_1=\{A\}$ y $C_2$ = {B, C, D, E}.</p>` },
      { titulo: "b) Primera ronda de reasignación", puntos: 2, solucion: String.raw`<p>Para cada $i\in C_2$: $\text{dif}=d(i,\,C_2\setminus\{i\})-d(i,\,C_1)$ (promedios). Si $\text{dif}>0$, $i$ está más cerca de $C_1$ y se mueve.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$i$</th><th>$d(i,\,C_2\setminus\{i\})$</th><th>$d(i,\,C_1)$</th><th>dif</th></tr></thead><tbody><tr><td>B</td><td>$\tfrac{6+11+9}{3}=8{,}67$</td><td>$3$</td><td>$5{,}67$</td></tr><tr><td>C</td><td>$\tfrac{6+5+8}{3}=6{,}33$</td><td>$8$</td><td>$-1{,}67$</td></tr><tr><td>D</td><td>$\tfrac{11+5+4}{3}=6{,}67$</td><td>$12$</td><td>$-5{,}33$</td></tr><tr><td>E</td><td>$\tfrac{9+8+4}{3}=7$</td><td>$10$</td><td>$-3$</td></tr></tbody></table></div><p>Solo B tiene dif positiva ⇒ <strong>B pasa a $C_1$</strong>.</p>` },
      { titulo: "c) Rondas siguientes y primera división", puntos: 1, solucion: String.raw`<p><strong>Ronda 2</strong>, con $C_1$ = {A, B}:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$i$</th><th>$d(i,\,C_2\setminus\{i\})$</th><th>$d(i,\,C_1)$</th><th>dif</th></tr></thead><tbody><tr><td>C</td><td>$\tfrac{5+8}{2}=6{,}5$</td><td>$\tfrac{8+6}{2}=7$</td><td>$-0{,}5$</td></tr><tr><td>D</td><td>$\tfrac{5+4}{2}=4{,}5$</td><td>$\tfrac{12+11}{2}=11{,}5$</td><td>$-7$</td></tr><tr><td>E</td><td>$\tfrac{8+4}{2}=6$</td><td>$\tfrac{10+9}{2}=9{,}5$</td><td>$-3{,}5$</td></tr></tbody></table></div><p>Todas negativas ⇒ la división es estable.</p><p>Primera división: <strong>{A, B}</strong> y <strong>{C, D, E}</strong>.</p>` },
      { titulo: "d) Segunda división y solución con 3 clústeres", puntos: 1.5, solucion: "<p>Se divide el clúster más heterogéneo. Distancia promedio interna: {A, B} $=3$; {C, D, E} $=5{,}67$ ⇒ se divide <strong>{C, D, E}</strong>.</p><p>Disparidades dentro de {C, D, E}: C $=6{,}5$; E $=6$; D $=4{,}5$ ⇒ sale <strong>C</strong>.</p><p>Reasignación: dif(D) $=-1$; dif(E) $=-4$ ⇒ nadie se mueve.</p><p>Con 3 clústeres: <strong>{A, B}</strong>, <strong>{C}</strong>, <strong>{D, E}</strong>. En R: <code>cutree(as.hclust(diana(d)), k = 3)</code>.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "partición en 2 (diana)", r: `cat(as.numeric(paste(cutree(as.hclust(cluster::diana(as.dist(matrix(c(0, 3, 8, 12, 10, 3, 0, 6, 11, 9, 8, 6, 0, 5, 8, 12, 11, 5, 0, 4, 10, 9, 8, 4, 0), 5, byrow = TRUE)))), 2), collapse = "")))`, esperado: 11222, tol: 0.000050001 },
      { que: "partición en 3 (diana)", r: `cat(as.numeric(paste(cutree(as.hclust(cluster::diana(as.dist(matrix(c(0, 3, 8, 12, 10, 3, 0, 6, 11, 9, 8, 6, 0, 5, 8, 12, 11, 5, 0, 4, 10, 9, 8, 4, 0), 5, byrow = TRUE)))), 3), collapse = "")))`, esperado: 11233, tol: 0.000050001 },
      { que: "disparidad de A", js: "media([3,8,12,10])", esperado: 8.25, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C5.2", loc: "slides 20–28" }
    ]
  },
  {
    id: "m14-d003",
    modulo: "m14-diana",
    concepto: "m14-c01",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.2", loc: "slides 20–28" }
    ],
    titulo: "DIANA cuando hay un objeto atípico",
    enunciado: `<p>Cinco clientes; uno de ellos es muy distinto al resto. La matriz de distancias entre 5 objetos es:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td><strong>B</strong></td><td>$1$</td><td></td><td></td><td></td></tr><tr><td><strong>C</strong></td><td>$3$</td><td>$2$</td><td></td><td></td></tr><tr><td><strong>D</strong></td><td>$6$</td><td>$5$</td><td>$3$</td><td></td></tr><tr><td><strong>E</strong></td><td>$19$</td><td>$18$</td><td>$16$</td><td>$13$</td></tr></tbody></table></div><p>Aplica el algoritmo desagregativo <strong>DIANA</strong>.</p><ol type="a"><li>Calcula la disparidad promedio de cada objeto e indica cuál se escinde primero.</li><li>Realiza la primera ronda de reasignación.</li><li>Continúa hasta que nadie se mueva e indica la primera división.</li><li>¿Qué clúster se divide a continuación y cómo? Indica la solución con 3 clústeres.</li></ol>`,
    partes: [
      { titulo: "a) Disparidades promedio y objeto que se escinde", puntos: 1.5, solucion: String.raw`<p>Disparidad = distancia promedio a los demás objetos del clúster:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Objeto</th><th>Cálculo</th><th>Disparidad</th></tr></thead><tbody><tr><td>A</td><td>$\tfrac{1+3+6+19}{4}$</td><td>$7{,}25$</td></tr><tr><td>B</td><td>$\tfrac{1+2+5+18}{4}$</td><td>$6{,}5$</td></tr><tr><td>C</td><td>$\tfrac{3+2+3+16}{4}$</td><td>$6$</td></tr><tr><td>D</td><td>$\tfrac{6+5+3+13}{4}$</td><td>$6{,}75$</td></tr><tr><td>E</td><td>$\tfrac{19+18+16+13}{4}$</td><td>$16{,}5$</td></tr></tbody></table></div><p>La mayor es la de <strong>E</strong> ($16{,}5$) ⇒ $C_1=\{E\}$ y $C_2$ = {A, B, C, D}.</p>` },
      { titulo: "b) Primera ronda de reasignación", puntos: 2, solucion: String.raw`<p>Para cada $i\in C_2$: $\text{dif}=d(i,\,C_2\setminus\{i\})-d(i,\,C_1)$ (promedios). Si $\text{dif}>0$, $i$ está más cerca de $C_1$ y se mueve.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$i$</th><th>$d(i,\,C_2\setminus\{i\})$</th><th>$d(i,\,C_1)$</th><th>dif</th></tr></thead><tbody><tr><td>A</td><td>$\tfrac{1+3+6}{3}=3{,}33$</td><td>$19$</td><td>$-15{,}67$</td></tr><tr><td>B</td><td>$\tfrac{1+2+5}{3}=2{,}67$</td><td>$18$</td><td>$-15{,}33$</td></tr><tr><td>C</td><td>$\tfrac{3+2+3}{3}=2{,}67$</td><td>$16$</td><td>$-13{,}33$</td></tr><tr><td>D</td><td>$\tfrac{6+5+3}{3}=4{,}67$</td><td>$13$</td><td>$-8{,}33$</td></tr></tbody></table></div><p>Todas las diferencias son negativas ⇒ <strong>nadie se mueve</strong>.</p>` },
      { titulo: "c) Rondas siguientes y primera división", puntos: 1, solucion: "<p>No hay más rondas: la ronda 1 ya fue estable. Primera división: <strong>{E}</strong> y <strong>{A, B, C, D}</strong>.</p>" },
      { titulo: "d) Segunda división y solución con 3 clústeres", puntos: 1.5, solucion: "<p>Se divide el clúster más heterogéneo. Distancia promedio interna: {E} $=0$; {A, B, C, D} $=3{,}33$ ⇒ se divide <strong>{A, B, C, D}</strong>.</p><p>Disparidades dentro de {A, B, C, D}: D $=4{,}67$; A $=3{,}33$; B $=2{,}67$; C $=2{,}67$ ⇒ sale <strong>D</strong>.</p><p>Reasignación: dif(A) $=-4$; dif(B) $=-3{,}5$; dif(C) $=-0{,}5$ ⇒ nadie se mueve.</p><p>Con 3 clústeres: <strong>{E}</strong>, <strong>{D}</strong>, <strong>{A, B, C}</strong>. En R: <code>cutree(as.hclust(diana(d)), k = 3)</code>.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "partición en 2 (diana)", r: `cat(as.numeric(paste(cutree(as.hclust(cluster::diana(as.dist(matrix(c(0, 1, 3, 6, 19, 1, 0, 2, 5, 18, 3, 2, 0, 3, 16, 6, 5, 3, 0, 13, 19, 18, 16, 13, 0), 5, byrow = TRUE)))), 2), collapse = "")))`, esperado: 11112, tol: 0.000050001 },
      { que: "partición en 3 (diana)", r: `cat(as.numeric(paste(cutree(as.hclust(cluster::diana(as.dist(matrix(c(0, 1, 3, 6, 19, 1, 0, 2, 5, 18, 3, 2, 0, 3, 16, 6, 5, 3, 0, 13, 19, 18, 16, 13, 0), 5, byrow = TRUE)))), 3), collapse = "")))`, esperado: 11123, tol: 0.000050001 },
      { que: "disparidad de E", js: "media([19,18,16,13])", esperado: 16.5, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C5.2", loc: "slides 20–28" }
    ]
  }
]);
