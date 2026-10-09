/* ============================================================================
   Desarrollo · M11 Conglomerados: distancias y estandarización (P2) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m11-d001",
    modulo: "m11-conglomerados-distancias",
    concepto: "m11-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slides 6–9" }
    ],
    titulo: "Minkowski: Manhattan, euclídea y Chebyshev entre tres tiendas",
    enunciado: String.raw`<p>Tres tiendas evaluadas en cuatro indicadores (escala 1–10):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Ventas</th><th>Margen</th><th>Servicio</th><th>Rotación</th></tr></thead><tbody><tr><td>T1</td><td>$7$</td><td>$3$</td><td>$8$</td><td>$5$</td></tr><tr><td>T2</td><td>$4$</td><td>$6$</td><td>$6$</td><td>$9$</td></tr><tr><td>T3</td><td>$8$</td><td>$8$</td><td>$7$</td><td>$6$</td></tr></tbody></table></div><ol type="a"><li>Escribe la distancia de Minkowski e indica qué distancia resulta con $\lambda=1$, $2$ e $\infty$.</li><li>Calcula las tres distancias entre T1 y T2.</li><li>Completa las distancias para los otros pares. ¿Qué par se uniría primero en un clustering según cada distancia?</li></ol>`,
    partes: [
      { titulo: "a) Familia de Minkowski", puntos: 1.5, solucion: String.raw`<p>$d(i,j)=\left[\sum_p|x_{ip}-x_{jp}|^{\lambda}\right]^{1/\lambda}$. Con $\lambda=1$: <strong>Manhattan</strong> (suma de diferencias absolutas); $\lambda=2$: <strong>euclídea</strong>; $\lambda=\infty$: <strong>Chebyshev</strong> (la mayor diferencia absoluta).</p>` },
      { titulo: "b) Las tres distancias entre T1 y T2", puntos: 2.5, solucion: String.raw`<p>Diferencias absolutas por variable: $3$; $3$; $2$; $4$.</p><p>Manhattan: $3+3+2+4=12$.</p><p>Euclídea: $\sqrt{3^2+3^2+2^2+4^2}=\sqrt{38}=6{,}164$.</p><p>Chebyshev: $\max(3; 3; 2; 4)=4$.</p><p>Siempre Chebyshev $\le$ euclídea $\le$ Manhattan.</p>` },
      { titulo: "c) Resto de los pares y primera fusión", puntos: 2, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Par</th><th>Manhattan</th><th>Euclídea</th><th>Chebyshev</th></tr></thead><tbody><tr><td>T1–T2</td><td>$12$</td><td>$6{,}164$</td><td>$4$</td></tr><tr><td>T1–T3</td><td>$8$</td><td>$5{,}292$</td><td>$5$</td></tr><tr><td>T2–T3</td><td>$10$</td><td>$5{,}477$</td><td>$4$</td></tr></tbody></table></div><p>Se une primero el par de menor distancia: Manhattan ⇒ T1–T3; euclídea ⇒ T1–T3; Chebyshev ⇒ T1–T2. <strong>La elección de la distancia cambia el resultado.</strong></p><p>En R: <code>dist(datos, method = "manhattan" | "euclidean" | "maximum")</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "euclídea T1–T2", r: "cat(dist(rbind(c(7, 3, 8, 5), c(4, 6, 6, 9))))", esperado: 6.164, tol: 0.000500001 },
      { que: "Chebyshev T1–T2", r: `cat(dist(rbind(c(7, 3, 8, 5), c(4, 6, 6, 9)), "maximum"))`, esperado: 4, tol: 0.000050001 },
      { que: "Manhattan T1–T2", r: `cat(dist(rbind(c(7, 3, 8, 5), c(4, 6, 6, 9)), "manhattan"))`, esperado: 12, tol: 0.000050001 },
      { que: "euclídea T1–T3", r: "cat(dist(rbind(c(7, 3, 8, 5), c(8, 8, 7, 6))))", esperado: 5.292, tol: 0.000500001 },
      { que: "Chebyshev T1–T3", r: `cat(dist(rbind(c(7, 3, 8, 5), c(8, 8, 7, 6)), "maximum"))`, esperado: 5, tol: 0.000050001 },
      { que: "Manhattan T1–T3", r: `cat(dist(rbind(c(7, 3, 8, 5), c(8, 8, 7, 6)), "manhattan"))`, esperado: 8, tol: 0.000050001 },
      { que: "euclídea T2–T3", r: "cat(dist(rbind(c(4, 6, 6, 9), c(8, 8, 7, 6))))", esperado: 5.477, tol: 0.000500001 },
      { que: "Chebyshev T2–T3", r: `cat(dist(rbind(c(4, 6, 6, 9), c(8, 8, 7, 6)), "maximum"))`, esperado: 4, tol: 0.000050001 },
      { que: "Manhattan T2–T3", r: `cat(dist(rbind(c(4, 6, 6, 9), c(8, 8, 7, 6)), "manhattan"))`, esperado: 10, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C5.1", loc: "slides 6–9" }
    ]
  },
  {
    id: "m11-d002",
    modulo: "m11-conglomerados-distancias",
    concepto: "m11-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slides 6–9" }
    ],
    titulo: "Minkowski con tres clientes: ¿cambia la primera fusión?",
    enunciado: String.raw`<p>Tres clientes con tres variables ya estandarizadas a una escala común:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Frecuencia</th><th>Monto</th><th>Antigüedad</th></tr></thead><tbody><tr><td>C1</td><td>$0$</td><td>$0$</td><td>$0$</td></tr><tr><td>C2</td><td>$4$</td><td>$1$</td><td>$0$</td></tr><tr><td>C3</td><td>$3$</td><td>$3$</td><td>$2$</td></tr></tbody></table></div><ol type="a"><li>Escribe la distancia de Minkowski e indica qué distancia resulta con $\lambda=1$, $2$ e $\infty$.</li><li>Calcula las tres distancias entre C1 y C2.</li><li>Completa las distancias para los otros pares. ¿Qué par se uniría primero en un clustering según cada distancia?</li></ol>`,
    partes: [
      { titulo: "a) Familia de Minkowski", puntos: 1.5, solucion: String.raw`<p>$d(i,j)=\left[\sum_p|x_{ip}-x_{jp}|^{\lambda}\right]^{1/\lambda}$. Con $\lambda=1$: <strong>Manhattan</strong> (suma de diferencias absolutas); $\lambda=2$: <strong>euclídea</strong>; $\lambda=\infty$: <strong>Chebyshev</strong> (la mayor diferencia absoluta).</p>` },
      { titulo: "b) Las tres distancias entre C1 y C2", puntos: 2.5, solucion: String.raw`<p>Diferencias absolutas por variable: $4$; $1$; $0$.</p><p>Manhattan: $4+1+0=5$.</p><p>Euclídea: $\sqrt{4^2+1^2+0^2}=\sqrt{17}=4{,}123$.</p><p>Chebyshev: $\max(4; 1; 0)=4$.</p><p>Siempre Chebyshev $\le$ euclídea $\le$ Manhattan.</p>` },
      { titulo: "c) Resto de los pares y primera fusión", puntos: 2, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Par</th><th>Manhattan</th><th>Euclídea</th><th>Chebyshev</th></tr></thead><tbody><tr><td>C1–C2</td><td>$5$</td><td>$4{,}123$</td><td>$4$</td></tr><tr><td>C1–C3</td><td>$8$</td><td>$4{,}69$</td><td>$3$</td></tr><tr><td>C2–C3</td><td>$5$</td><td>$3$</td><td>$2$</td></tr></tbody></table></div><p>Se une primero el par de menor distancia: Manhattan ⇒ C1–C2; euclídea ⇒ C2–C3; Chebyshev ⇒ C2–C3. <strong>La elección de la distancia cambia el resultado.</strong></p><p>En R: <code>dist(datos, method = "manhattan" | "euclidean" | "maximum")</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "euclídea C1–C2", r: "cat(dist(rbind(c(0, 0, 0), c(4, 1, 0))))", esperado: 4.123, tol: 0.000500001 },
      { que: "Chebyshev C1–C2", r: `cat(dist(rbind(c(0, 0, 0), c(4, 1, 0)), "maximum"))`, esperado: 4, tol: 0.000050001 },
      { que: "Manhattan C1–C2", r: `cat(dist(rbind(c(0, 0, 0), c(4, 1, 0)), "manhattan"))`, esperado: 5, tol: 0.000050001 },
      { que: "euclídea C1–C3", r: "cat(dist(rbind(c(0, 0, 0), c(3, 3, 2))))", esperado: 4.69, tol: 0.000500001 },
      { que: "Chebyshev C1–C3", r: `cat(dist(rbind(c(0, 0, 0), c(3, 3, 2)), "maximum"))`, esperado: 3, tol: 0.000050001 },
      { que: "Manhattan C1–C3", r: `cat(dist(rbind(c(0, 0, 0), c(3, 3, 2)), "manhattan"))`, esperado: 8, tol: 0.000050001 },
      { que: "euclídea C2–C3", r: "cat(dist(rbind(c(4, 1, 0), c(3, 3, 2))))", esperado: 3, tol: 0.000500001 },
      { que: "Chebyshev C2–C3", r: `cat(dist(rbind(c(4, 1, 0), c(3, 3, 2)), "maximum"))`, esperado: 2, tol: 0.000050001 },
      { que: "Manhattan C2–C3", r: `cat(dist(rbind(c(4, 1, 0), c(3, 3, 2)), "manhattan"))`, esperado: 5, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C5.1", loc: "slides 6–9" }
    ]
  },
  {
    id: "m11-d003",
    modulo: "m11-conglomerados-distancias",
    concepto: "m11-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slides 10–11" },
      { id: "AY5-E", loc: "P3" }
    ],
    titulo: "Distancias binarias entre tres clientes (Jaccard y Simple Matching)",
    enunciado: `<p>Tres clientes y los productos que tienen contratados (1 = sí, 0 = no):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Cuenta</th><th>Tarjeta</th><th>Seguro</th><th>Crédito</th><th>Inversión</th><th>Hipotecario</th></tr></thead><tbody><tr><td>Ana</td><td>$1$</td><td>$1$</td><td>$0$</td><td>$1$</td><td>$0$</td><td>$0$</td></tr><tr><td>Luis</td><td>$1$</td><td>$0$</td><td>$0$</td><td>$1$</td><td>$1$</td><td>$0$</td></tr><tr><td>Eva</td><td>$1$</td><td>$1$</td><td>$1$</td><td>$0$</td><td>$0$</td><td>$0$</td></tr></tbody></table></div><ol type="a"><li>Para Ana y Luis, cuenta $a$, $b$, $c$ y $d$.</li><li>Calcula las distancias de Jaccard, Simple Matching y Hamming entre Ana y Luis.</li><li>Calcula Jaccard y Simple Matching para los otros pares. ¿Cuándo conviene Jaccard?</li></ol>`,
    partes: [
      { titulo: "a) Conteos a, b, c y d", puntos: 1.5, solucion: "<p>$a$ = ambos 1 (presencia conjunta) $=2$; $b$ = 1 en Ana y 0 en Luis $=1$; $c$ = 0 en Ana y 1 en Luis $=1$; $d$ = ambos 0 (doble ausencia) $=2$.</p><p>Comprobación: $a+b+c+d=6$ atributos.</p>" },
      { titulo: "b) Jaccard, Simple Matching y Hamming", puntos: 2.5, solucion: String.raw`<p>Jaccard $=\dfrac{b+c}{a+b+c}=\dfrac{2}{4}=0{,}5$ (ignora la doble ausencia $d$).</p><p>Simple Matching $=\dfrac{b+c}{a+b+c+d}=\dfrac{2}{6}=0{,}333$.</p><p>Hamming $=b+c=2$ (número de atributos en que difieren; igual a Manhattan con datos 0/1).</p>` },
      { titulo: "c) Otros pares y cuándo usar Jaccard", puntos: 2, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Par</th><th>$a$</th><th>$b$</th><th>$c$</th><th>$d$</th><th>Jaccard</th><th>Simple Matching</th></tr></thead><tbody><tr><td>Ana–Luis</td><td>2</td><td>1</td><td>1</td><td>2</td><td>$0{,}5$</td><td>$0{,}333$</td></tr><tr><td>Ana–Eva</td><td>2</td><td>1</td><td>1</td><td>2</td><td>$0{,}5$</td><td>$0{,}333$</td></tr><tr><td>Luis–Eva</td><td>1</td><td>2</td><td>2</td><td>1</td><td>$0{,}8$</td><td>$0{,}667$</td></tr></tbody></table></div><p>Par más parecido: Ana–Luis según Jaccard y Ana–Luis según Simple Matching.</p><p>Jaccard conviene cuando la doble ausencia <strong>no</strong> indica parecido (atributos poco frecuentes: que dos clientes no compren un producto no los hace similares). En R: <code>dist(datos, method = "binary")</code> entrega la distancia de Jaccard.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "Jaccard Ana–Luis", r: `cat(dist(rbind(c(1, 1, 0, 1, 0, 0), c(1, 0, 0, 1, 1, 0)), "binary"))`, esperado: 0.5, tol: 0.000500001 },
      { que: "Jaccard Ana–Eva", r: `cat(dist(rbind(c(1, 1, 0, 1, 0, 0), c(1, 1, 1, 0, 0, 0)), "binary"))`, esperado: 0.5, tol: 0.000500001 },
      { que: "Jaccard Luis–Eva", r: `cat(dist(rbind(c(1, 0, 0, 1, 1, 0), c(1, 1, 1, 0, 0, 0)), "binary"))`, esperado: 0.8, tol: 0.000500001 },
      { que: "SM Ana–Luis", js: "(1+1)/6", esperado: 0.333, tol: 0.000500001 },
      { que: "SM Ana–Eva", js: "(1+1)/6", esperado: 0.333, tol: 0.000500001 },
      { que: "SM Luis–Eva", js: "(2+2)/6", esperado: 0.667, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C5.1", loc: "slides 10–11" },
      { id: "AY5-E", loc: "P3" }
    ]
  },
  {
    id: "m11-d004",
    modulo: "m11-conglomerados-distancias",
    concepto: "m11-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slides 10–11" },
      { id: "AY5-E", loc: "P3" }
    ],
    titulo: "Jaccard vs. Simple Matching con muchos ceros",
    enunciado: `<p>Tres canastas de compra y si incluyen cada producto (1 = sí):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Pan</th><th>Leche</th><th>Vino</th><th>Queso</th><th>Café</th><th>Té</th><th>Arroz</th><th>Atún</th></tr></thead><tbody><tr><td>K1</td><td>$1$</td><td>$1$</td><td>$0$</td><td>$0$</td><td>$0$</td><td>$0$</td><td>$0$</td><td>$0$</td></tr><tr><td>K2</td><td>$1$</td><td>$0$</td><td>$1$</td><td>$0$</td><td>$0$</td><td>$0$</td><td>$0$</td><td>$0$</td></tr><tr><td>K3</td><td>$1$</td><td>$1$</td><td>$0$</td><td>$1$</td><td>$1$</td><td>$0$</td><td>$0$</td><td>$0$</td></tr></tbody></table></div><ol type="a"><li>Para K1 y K2, cuenta $a$, $b$, $c$ y $d$.</li><li>Calcula las distancias de Jaccard, Simple Matching y Hamming entre K1 y K2.</li><li>Calcula Jaccard y Simple Matching para los otros pares. ¿Cuándo conviene Jaccard?</li></ol>`,
    partes: [
      { titulo: "a) Conteos a, b, c y d", puntos: 1.5, solucion: "<p>$a$ = ambos 1 (presencia conjunta) $=1$; $b$ = 1 en K1 y 0 en K2 $=1$; $c$ = 0 en K1 y 1 en K2 $=1$; $d$ = ambos 0 (doble ausencia) $=5$.</p><p>Comprobación: $a+b+c+d=8$ atributos.</p>" },
      { titulo: "b) Jaccard, Simple Matching y Hamming", puntos: 2.5, solucion: String.raw`<p>Jaccard $=\dfrac{b+c}{a+b+c}=\dfrac{2}{3}=0{,}667$ (ignora la doble ausencia $d$).</p><p>Simple Matching $=\dfrac{b+c}{a+b+c+d}=\dfrac{2}{8}=0{,}25$.</p><p>Hamming $=b+c=2$ (número de atributos en que difieren; igual a Manhattan con datos 0/1).</p>` },
      { titulo: "c) Otros pares y cuándo usar Jaccard", puntos: 2, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Par</th><th>$a$</th><th>$b$</th><th>$c$</th><th>$d$</th><th>Jaccard</th><th>Simple Matching</th></tr></thead><tbody><tr><td>K1–K2</td><td>1</td><td>1</td><td>1</td><td>5</td><td>$0{,}667$</td><td>$0{,}25$</td></tr><tr><td>K1–K3</td><td>2</td><td>0</td><td>2</td><td>4</td><td>$0{,}5$</td><td>$0{,}25$</td></tr><tr><td>K2–K3</td><td>1</td><td>1</td><td>3</td><td>3</td><td>$0{,}8$</td><td>$0{,}5$</td></tr></tbody></table></div><p>Par más parecido: K1–K3 según Jaccard y K1–K2 según Simple Matching.</p><p>Jaccard conviene cuando la doble ausencia <strong>no</strong> indica parecido (atributos poco frecuentes: que dos clientes no compren un producto no los hace similares). En R: <code>dist(datos, method = "binary")</code> entrega la distancia de Jaccard.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "Jaccard K1–K2", r: `cat(dist(rbind(c(1, 1, 0, 0, 0, 0, 0, 0), c(1, 0, 1, 0, 0, 0, 0, 0)), "binary"))`, esperado: 0.667, tol: 0.000500001 },
      { que: "Jaccard K1–K3", r: `cat(dist(rbind(c(1, 1, 0, 0, 0, 0, 0, 0), c(1, 1, 0, 1, 1, 0, 0, 0)), "binary"))`, esperado: 0.5, tol: 0.000500001 },
      { que: "Jaccard K2–K3", r: `cat(dist(rbind(c(1, 0, 1, 0, 0, 0, 0, 0), c(1, 1, 0, 1, 1, 0, 0, 0)), "binary"))`, esperado: 0.8, tol: 0.000500001 },
      { que: "SM K1–K2", js: "(1+1)/8", esperado: 0.25, tol: 0.000500001 },
      { que: "SM K1–K3", js: "(0+2)/8", esperado: 0.25, tol: 0.000500001 },
      { que: "SM K2–K3", js: "(1+3)/8", esperado: 0.5, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C5.1", loc: "slides 10–11" },
      { id: "AY5-E", loc: "P3" }
    ]
  },
  {
    id: "m11-d005",
    modulo: "m11-conglomerados-distancias",
    concepto: "m11-c02",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slides 6–9" }
    ],
    titulo: "Distancia por correlación vs. euclídea (perfiles de venta)",
    enunciado: `<p>Ventas trimestrales (millones) de tres productos:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>T1</th><th>T2</th><th>T3</th><th>T4</th></tr></thead><tbody><tr><td>A</td><td>$2$</td><td>$4$</td><td>$3$</td><td>$5$</td></tr><tr><td>B</td><td>$12$</td><td>$14$</td><td>$13$</td><td>$15$</td></tr><tr><td>C</td><td>$3$</td><td>$3$</td><td>$4$</td><td>$3$</td></tr></tbody></table></div><ol type="a"><li>Calcula la correlación entre los perfiles de A y B, y entre A y C.</li><li>Calcula las distancias basadas en correlación $d=1-r$.</li><li>Calcula las distancias euclídeas. ¿A quién se parece más A según cada criterio y por qué difieren?</li></ol>`,
    partes: [
      { titulo: "a) Correlaciones entre perfiles", puntos: 2.5, solucion: String.raw`<p>Medias de los perfiles: A $=3{,}5$; B $=13{,}5$; C $=3{,}25$.</p><p>$r=\dfrac{\sum(x_i-\bar x)(y_i-\bar y)}{\sqrt{\sum(x_i-\bar x)^2\sum(y_i-\bar y)^2}}$ (se correlacionan <strong>filas</strong>, no columnas).</p><p>$r_{AB}=$ $\dfrac{5}{\sqrt{5\cdot5}}$ $=1$</p><p>$r_{AC}=$ $\dfrac{-0{,}5}{\sqrt{5\cdot0{,}75}}$ $=-0{,}258$</p>` },
      { titulo: "b) Distancias por correlación", puntos: 1.5, solucion: String.raw`<p>$d=1-r\in[0,2]$: $d(A,B)=1-(1)=0$ y $d(A,C)=1-(-0{,}258)=1{,}258$.</p><p>$0$ = perfiles con correlación $+1$; $1$ = sin correlación; $2$ = correlación $-1$. En R: <code>as.dist(1 - cor(t(datos)))</code>.</p>` },
      { titulo: "c) Distancias euclídeas y comparación", puntos: 2, solucion: "<p>$d_E(A,B)=20$ y $d_E(A,C)=2{,}646$.</p><p>Por correlación, A se parece más a B (mismo <strong>patrón</strong> de subidas y bajadas, aunque a otro nivel); por distancia euclídea, a C (valores de <strong>magnitud</strong> parecida).</p><p>La distancia por correlación agrupa por forma del perfil e ignora el nivel; la euclídea agrupa por cercanía en magnitud. Se elige según lo que interese al negocio.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "r AB", r: "cat(cor(c(2, 4, 3, 5), c(12, 14, 13, 15)))", esperado: 1, tol: 0.000500001 },
      { que: "r AC", r: "cat(cor(c(2, 4, 3, 5), c(3, 3, 4, 3)))", esperado: -0.258, tol: 0.000500001 },
      { que: "euclídea AB", js: "dist([2,4,3,5], [12,14,13,15])", esperado: 20, tol: 0.000500001 },
      { que: "euclídea AC", js: "dist([2,4,3,5], [3,3,4,3])", esperado: 2.646, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C5.1", loc: "slides 6–9" }
    ]
  },
  {
    id: "m11-d006",
    modulo: "m11-conglomerados-distancias",
    concepto: "m11-c02",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slides 6–9" }
    ],
    titulo: "¿Mismo patrón o misma magnitud? (consumo por franja)",
    enunciado: `<p>Consumo eléctrico promedio de tres hogares en cuatro franjas horarias:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Mañana</th><th>Tarde</th><th>Noche</th><th>Madrugada</th></tr></thead><tbody><tr><td>H1</td><td>$5$</td><td>$8$</td><td>$12$</td><td>$3$</td></tr><tr><td>H2</td><td>$10$</td><td>$16$</td><td>$25$</td><td>$7$</td></tr><tr><td>H3</td><td>$7$</td><td>$6$</td><td>$9$</td><td>$6$</td></tr></tbody></table></div><ol type="a"><li>Calcula la correlación entre los perfiles de H1 y H2, y entre H1 y H3.</li><li>Calcula las distancias basadas en correlación $d=1-r$.</li><li>Calcula las distancias euclídeas. ¿A quién se parece más H1 según cada criterio y por qué difieren?</li></ol>`,
    partes: [
      { titulo: "a) Correlaciones entre perfiles", puntos: 2.5, solucion: String.raw`<p>Medias de los perfiles: H1 $=7$; H2 $=14{,}5$; H3 $=7$.</p><p>$r=\dfrac{\sum(x_i-\bar x)(y_i-\bar y)}{\sqrt{\sum(x_i-\bar x)^2\sum(y_i-\bar y)^2}}$ (se correlacionan <strong>filas</strong>, no columnas).</p><p>$r_{H1H2}=$ $\dfrac{93}{\sqrt{46\cdot189}}$ $=0{,}997$</p><p>$r_{H1H3}=$ $\dfrac{13}{\sqrt{46\cdot6}}$ $=0{,}783$</p>` },
      { titulo: "b) Distancias por correlación", puntos: 1.5, solucion: String.raw`<p>$d=1-r\in[0,2]$: $d(H1,H2)=1-(0{,}997)=0{,}003$ y $d(H1,H3)=1-(0{,}783)=0{,}217$.</p><p>$0$ = perfiles con correlación $+1$; $1$ = sin correlación; $2$ = correlación $-1$. En R: <code>as.dist(1 - cor(t(datos)))</code>.</p>` },
      { titulo: "c) Distancias euclídeas y comparación", puntos: 2, solucion: "<p>$d_E(H1,H2)=16{,}553$ y $d_E(H1,H3)=5{,}099$.</p><p>Por correlación, H1 se parece más a H2 (mismo <strong>patrón</strong> de subidas y bajadas, aunque a otro nivel); por distancia euclídea, a H3 (valores de <strong>magnitud</strong> parecida).</p><p>La distancia por correlación agrupa por forma del perfil e ignora el nivel; la euclídea agrupa por cercanía en magnitud. Se elige según lo que interese al negocio.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "r H1H2", r: "cat(cor(c(5, 8, 12, 3), c(10, 16, 25, 7)))", esperado: 0.997, tol: 0.000500001 },
      { que: "r H1H3", r: "cat(cor(c(5, 8, 12, 3), c(7, 6, 9, 6)))", esperado: 0.783, tol: 0.000500001 },
      { que: "euclídea H1H2", js: "dist([5,8,12,3], [10,16,25,7])", esperado: 16.553, tol: 0.000500001 },
      { que: "euclídea H1H3", js: "dist([5,8,12,3], [7,6,9,6])", esperado: 5.099, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C5.1", loc: "slides 6–9" }
    ]
  },
  {
    id: "m11-d007",
    modulo: "m11-conglomerados-distancias",
    concepto: "m11-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slides 13–17" }
    ],
    titulo: "El efecto de estandarizar antes de calcular distancias",
    enunciado: `<p>Cuatro clientes con ingreso mensual (miles de pesos) y número de productos:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Ingreso</th><th>Productos</th></tr></thead><tbody><tr><td>A</td><td>$800$</td><td>$1$</td></tr><tr><td>B</td><td>$830$</td><td>$6$</td></tr><tr><td>C</td><td>$900$</td><td>$2$</td></tr><tr><td>D</td><td>$1200$</td><td>$5$</td></tr></tbody></table></div><ol type="a"><li>Calcula las distancias euclídeas con los datos originales. ¿Qué par se uniría primero?</li><li>Estandariza cada variable con z-score.</li><li>Recalcula las distancias con los datos estandarizados y comenta.</li></ol>`,
    partes: [
      { titulo: "a) Distancias sin estandarizar", puntos: 1.5, solucion: String.raw`<p>$d(A,B)=\sqrt{(-30)^2+(-5)^2}=30{,}414$</p><p>$d(A,C)=\sqrt{(-100)^2+(-1)^2}=100{,}005$</p><p>$d(A,D)=\sqrt{(-400)^2+(-4)^2}=400{,}02$</p><p>$d(B,C)=\sqrt{(-70)^2+(4)^2}=70{,}114$</p><p>$d(B,D)=\sqrt{(-370)^2+(1)^2}=370{,}001$</p><p>$d(C,D)=\sqrt{(-300)^2+(-3)^2}=300{,}015$</p><p>Se uniría primero A–B. La distancia queda dominada por «Ingreso», la variable de mayor escala.</p>` },
      { titulo: "b) Estandarización z-score", puntos: 2.5, solucion: String.raw`<p>Ingreso: $\bar x=932{,}5$, $s=183{,}189$. Productos: $\bar x=3{,}5$, $s=2{,}38$ (con $n-1$, como <code>scale()</code>).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>z Ingreso</th><th>z Productos</th></tr></thead><tbody><tr><td>A</td><td>$-0{,}723$</td><td>$-1{,}05$</td></tr><tr><td>B</td><td>$-0{,}56$</td><td>$1{,}05$</td></tr><tr><td>C</td><td>$-0{,}177$</td><td>$-0{,}63$</td></tr><tr><td>D</td><td>$1{,}46$</td><td>$0{,}63$</td></tr></tbody></table></div>` },
      { titulo: "c) Distancias estandarizadas y comentario", puntos: 2, solucion: "<p>$d_z(A,B)=2{,}107$</p><p>$d_z(A,C)=0{,}689$</p><p>$d_z(A,D)=2{,}755$</p><p>$d_z(B,C)=1{,}723$</p><p>$d_z(B,D)=2{,}063$</p><p>$d_z(C,D)=2{,}066$</p><p>Ahora el par más cercano es A–C, no A–B: al estandarizar, las dos variables pesan lo mismo.</p><p>Regla: con unidades distintas se estandariza antes de calcular distancias; si no, la variable de mayor varianza decide los clústeres.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "distancia estandarizada A–B", r: "cat(as.matrix(dist(scale(cbind(c(800, 830, 900, 1200), c(1, 6, 2, 5)))))[1, 2])", esperado: 2.107, tol: 0.000500001 },
      { que: "distancia estandarizada A–C", r: "cat(as.matrix(dist(scale(cbind(c(800, 830, 900, 1200), c(1, 6, 2, 5)))))[1, 3])", esperado: 0.689, tol: 0.000500001 },
      { que: "distancia estandarizada A–D", r: "cat(as.matrix(dist(scale(cbind(c(800, 830, 900, 1200), c(1, 6, 2, 5)))))[1, 4])", esperado: 2.755, tol: 0.000500001 },
      { que: "distancia estandarizada B–C", r: "cat(as.matrix(dist(scale(cbind(c(800, 830, 900, 1200), c(1, 6, 2, 5)))))[2, 3])", esperado: 1.723, tol: 0.000500001 },
      { que: "distancia estandarizada B–D", r: "cat(as.matrix(dist(scale(cbind(c(800, 830, 900, 1200), c(1, 6, 2, 5)))))[2, 4])", esperado: 2.063, tol: 0.000500001 },
      { que: "distancia estandarizada C–D", r: "cat(as.matrix(dist(scale(cbind(c(800, 830, 900, 1200), c(1, 6, 2, 5)))))[3, 4])", esperado: 2.066, tol: 0.000500001 },
      { que: "distancia original A–B", js: "dist([800,1], [830,6])", esperado: 30.414, tol: 0.000500001 },
      { que: "distancia original A–C", js: "dist([800,1], [900,2])", esperado: 100.005, tol: 0.000500001 },
      { que: "distancia original A–D", js: "dist([800,1], [1200,5])", esperado: 400.02, tol: 0.000500001 },
      { que: "distancia original B–C", js: "dist([830,6], [900,2])", esperado: 70.114, tol: 0.000500001 },
      { que: "distancia original B–D", js: "dist([830,6], [1200,5])", esperado: 370.001, tol: 0.000500001 },
      { que: "distancia original C–D", js: "dist([900,2], [1200,5])", esperado: 300.015, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C5.1", loc: "slides 13–17" }
    ]
  },
  {
    id: "m11-d008",
    modulo: "m11-conglomerados-distancias",
    concepto: "m11-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C5.1", loc: "slides 13–17" }
    ],
    titulo: "Estandarizar cambia quién es vecino de quién",
    enunciado: `<p>Cuatro sucursales con ventas anuales (millones) y nota de servicio (1–7):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Ventas</th><th>Nota</th></tr></thead><tbody><tr><td>S1</td><td>$1200$</td><td>$6{,}5$</td></tr><tr><td>S2</td><td>$1230$</td><td>$3$</td></tr><tr><td>S3</td><td>$1320$</td><td>$6$</td></tr><tr><td>S4</td><td>$1800$</td><td>$4$</td></tr></tbody></table></div><ol type="a"><li>Calcula las distancias euclídeas con los datos originales. ¿Qué par se uniría primero?</li><li>Estandariza cada variable con z-score.</li><li>Recalcula las distancias con los datos estandarizados y comenta.</li></ol>`,
    partes: [
      { titulo: "a) Distancias sin estandarizar", puntos: 1.5, solucion: String.raw`<p>$d(S1,S2)=\sqrt{(-30)^2+(3{,}5)^2}=30{,}203$</p><p>$d(S1,S3)=\sqrt{(-120)^2+(0{,}5)^2}=120{,}001$</p><p>$d(S1,S4)=\sqrt{(-600)^2+(2{,}5)^2}=600{,}005$</p><p>$d(S2,S3)=\sqrt{(-90)^2+(-3)^2}=90{,}05$</p><p>$d(S2,S4)=\sqrt{(-570)^2+(-1)^2}=570{,}001$</p><p>$d(S3,S4)=\sqrt{(-480)^2+(2)^2}=480{,}004$</p><p>Se uniría primero S1–S2. La distancia queda dominada por «Ventas», la variable de mayor escala.</p>` },
      { titulo: "b) Estandarización z-score", puntos: 2.5, solucion: String.raw`<p>Ventas: $\bar x=1387{,}5$, $s=279{,}687$. Nota: $\bar x=4{,}875$, $s=1{,}652$ (con $n-1$, como <code>scale()</code>).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>z Ventas</th><th>z Nota</th></tr></thead><tbody><tr><td>S1</td><td>$-0{,}67$</td><td>$0{,}984$</td></tr><tr><td>S2</td><td>$-0{,}563$</td><td>$-1{,}135$</td></tr><tr><td>S3</td><td>$-0{,}241$</td><td>$0{,}681$</td></tr><tr><td>S4</td><td>$1{,}475$</td><td>$-0{,}53$</td></tr></tbody></table></div>` },
      { titulo: "c) Distancias estandarizadas y comentario", puntos: 2, solucion: "<p>$d_z(S1,S2)=2{,}121$</p><p>$d_z(S1,S3)=0{,}525$</p><p>$d_z(S1,S4)=2{,}625$</p><p>$d_z(S2,S3)=1{,}844$</p><p>$d_z(S2,S4)=2{,}126$</p><p>$d_z(S3,S4)=2{,}1$</p><p>Ahora el par más cercano es S1–S3, no S1–S2: al estandarizar, las dos variables pesan lo mismo.</p><p>Regla: con unidades distintas se estandariza antes de calcular distancias; si no, la variable de mayor varianza decide los clústeres.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "distancia estandarizada S1–S2", r: "cat(as.matrix(dist(scale(cbind(c(1200, 1230, 1320, 1800), c(6.5, 3, 6, 4)))))[1, 2])", esperado: 2.121, tol: 0.000500001 },
      { que: "distancia estandarizada S1–S3", r: "cat(as.matrix(dist(scale(cbind(c(1200, 1230, 1320, 1800), c(6.5, 3, 6, 4)))))[1, 3])", esperado: 0.525, tol: 0.000500001 },
      { que: "distancia estandarizada S1–S4", r: "cat(as.matrix(dist(scale(cbind(c(1200, 1230, 1320, 1800), c(6.5, 3, 6, 4)))))[1, 4])", esperado: 2.625, tol: 0.000500001 },
      { que: "distancia estandarizada S2–S3", r: "cat(as.matrix(dist(scale(cbind(c(1200, 1230, 1320, 1800), c(6.5, 3, 6, 4)))))[2, 3])", esperado: 1.844, tol: 0.000500001 },
      { que: "distancia estandarizada S2–S4", r: "cat(as.matrix(dist(scale(cbind(c(1200, 1230, 1320, 1800), c(6.5, 3, 6, 4)))))[2, 4])", esperado: 2.126, tol: 0.000500001 },
      { que: "distancia estandarizada S3–S4", r: "cat(as.matrix(dist(scale(cbind(c(1200, 1230, 1320, 1800), c(6.5, 3, 6, 4)))))[3, 4])", esperado: 2.1, tol: 0.000500001 },
      { que: "distancia original S1–S2", js: "dist([1200,6.5], [1230,3])", esperado: 30.203, tol: 0.000500001 },
      { que: "distancia original S1–S3", js: "dist([1200,6.5], [1320,6])", esperado: 120.001, tol: 0.000500001 },
      { que: "distancia original S1–S4", js: "dist([1200,6.5], [1800,4])", esperado: 600.005, tol: 0.000500001 },
      { que: "distancia original S2–S3", js: "dist([1230,3], [1320,6])", esperado: 90.05, tol: 0.000500001 },
      { que: "distancia original S2–S4", js: "dist([1230,3], [1800,4])", esperado: 570.001, tol: 0.000500001 },
      { que: "distancia original S3–S4", js: "dist([1320,6], [1800,4])", esperado: 480.004, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C5.1", loc: "slides 13–17" }
    ]
  }
]);
