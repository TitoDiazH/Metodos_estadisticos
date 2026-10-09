/* ============================================================================
   Desarrollo · M05 Pruebas de hipótesis: una población (P1) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m05-d003",
    modulo: "m05-hipotesis-una-poblacion",
    concepto: "m05-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 5–9" }
    ],
    titulo: "Llenado de botellas (prueba t bilateral)",
    enunciado: String.raw`<p>Una máquina debe llenar botellas con $500$ ml en promedio. En una muestra de $n=16$ botellas se obtuvo $\bar x=496{,}5$ ml y $s=6{,}2$ ml (población normal). ¿Está descalibrada la máquina? Usa $\alpha=5\,\%$.</p><ol type="a"><li>Plantea las hipótesis e indica qué prueba corresponde.</li><li>Calcula el estadístico de prueba.</li><li>Indica la región de rechazo (valor crítico).</li><li>Decide y concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y tipo de prueba", puntos: 1.5, solucion: String.raw`<p>$H_0:\mu=500$ contra $H_1:\mu\neq500$ — prueba bilateral (dos colas). «Descalibrada» es desviarse hacia cualquier lado.</p><p>Media con σ desconocida y se usa $s$ ⇒ prueba $t$.</p>` },
      { titulo: "b) Estadístico de prueba", puntos: 2, solucion: String.raw`<p>$t=\dfrac{\bar x-\mu_0}{s/\sqrt n}=\dfrac{496{,}5-500}{6{,}2/\sqrt{16}}=\dfrac{-3{,}5}{1{,}55}=-2{,}258$ con $n-1=15$ gl (σ desconocida ⇒ $t$ de Student).</p>` },
      { titulo: "c) Región de rechazo", puntos: 1, solucion: "<p>Bilateral: se rechaza si $|t|>t_{0{,}975;15}=2{,}131$.</p>" },
      { titulo: "d) Decisión y conclusión en contexto", puntos: 1.5, solucion: String.raw`<p>Estadístico $=-2{,}258$; p-valor $=0{,}0393$, menor o igual que $\alpha=0{,}05$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Al $5\,\%$ hay evidencia de que el llenado medio difiere de $500$ ml: la máquina está descalibrada.</p><p>Con los datos originales: <code>t.test(x, mu = …, alternative = …)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "t", js: "(496.5 - 500)/(6.2/Math.sqrt(16))", esperado: -2.258, tol: 0.000500001 },
      { que: "crítico", r: "cat(qt(0.975, 15))", esperado: 2.131, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 5–9" }
    ]
  },
  {
    id: "m05-d004",
    modulo: "m05-hipotesis-una-poblacion",
    concepto: "m05-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 5–9" }
    ],
    titulo: "Tiempo de atención (prueba t de cola derecha)",
    enunciado: String.raw`<p>Un banco declara que el tiempo medio de atención es a lo más $8$ minutos. Una muestra de $n=25$ clientes dio $\bar x=8{,}6$ y $s=1{,}9$ minutos. ¿Hay evidencia de que el tiempo medio supera lo declarado? Usa $\alpha=5\,\%$.</p><ol type="a"><li>Plantea las hipótesis e indica qué prueba corresponde.</li><li>Calcula el estadístico de prueba.</li><li>Indica la región de rechazo (valor crítico).</li><li>Decide y concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y tipo de prueba", puntos: 1.5, solucion: String.raw`<p>$H_0:\mu\le8$ contra $H_1:\mu>8$ — prueba cola derecha. Lo que se quiere demostrar (superar los 8 minutos) va en $H_1$.</p><p>Media con σ desconocida y se usa $s$ ⇒ prueba $t$.</p>` },
      { titulo: "b) Estadístico de prueba", puntos: 2, solucion: String.raw`<p>$t=\dfrac{\bar x-\mu_0}{s/\sqrt n}=\dfrac{8{,}6-8}{1{,}9/\sqrt{25}}=\dfrac{0{,}6}{0{,}38}=1{,}579$ con $n-1=24$ gl (σ desconocida ⇒ $t$ de Student).</p>` },
      { titulo: "c) Región de rechazo", puntos: 1, solucion: "<p>Cola derecha: se rechaza si $t>t_{0{,}95;24}=1{,}711$.</p>" },
      { titulo: "d) Decisión y conclusión en contexto", puntos: 1.5, solucion: String.raw`<p>Estadístico $=1{,}579$; p-valor $=0{,}0637$, mayor que $\alpha=0{,}05$ ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>Con un $5\,\%$ de significancia no hay evidencia de que el tiempo medio supere los $8$ minutos declarados. (No rechazar no prueba que $H_0$ sea verdadera.)</p><p>Con los datos originales: <code>t.test(x, mu = …, alternative = …)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "t", js: "(8.6 - 8)/(1.9/Math.sqrt(25))", esperado: 1.579, tol: 0.000500001 },
      { que: "crítico", r: "cat(qt(0.95, 24))", esperado: 1.711, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 5–9" }
    ]
  },
  {
    id: "m05-d005",
    modulo: "m05-hipotesis-una-poblacion",
    concepto: "m05-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 5–9" }
    ],
    titulo: "Duración de baterías con α = 1 % (cola izquierda)",
    enunciado: String.raw`<p>Un fabricante asegura que sus baterías duran al menos $40$ horas en promedio. En $n=10$ baterías se midió $\bar x=38{,}2$ y $s=2{,}5$ horas. ¿Hay evidencia de que duran menos? Usa $\alpha=1\,\%$.</p><ol type="a"><li>Plantea las hipótesis e indica qué prueba corresponde.</li><li>Calcula el estadístico de prueba.</li><li>Indica la región de rechazo (valor crítico).</li><li>Decide y concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y tipo de prueba", puntos: 1.5, solucion: String.raw`<p>$H_0:\mu\ge40$ contra $H_1:\mu<40$ — prueba cola izquierda. La sospecha (duran menos) va en $H_1$.</p><p>Media con σ desconocida y se usa $s$ ⇒ prueba $t$.</p>` },
      { titulo: "b) Estadístico de prueba", puntos: 2, solucion: String.raw`<p>$t=\dfrac{\bar x-\mu_0}{s/\sqrt n}=\dfrac{38{,}2-40}{2{,}5/\sqrt{10}}=\dfrac{-1{,}8}{0{,}7906}=-2{,}277$ con $n-1=9$ gl (σ desconocida ⇒ $t$ de Student).</p>` },
      { titulo: "c) Región de rechazo", puntos: 1, solucion: "<p>Cola izquierda: se rechaza si $t<-t_{0{,}99;9}=-2{,}821$.</p>" },
      { titulo: "d) Decisión y conclusión en contexto", puntos: 1.5, solucion: String.raw`<p>Estadístico $=-2{,}277$; p-valor $=0{,}0244$, mayor que $\alpha=0{,}01$ ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>Al $1\,\%$ no hay evidencia suficiente de que la duración media sea menor que $40$ horas (al $5\,\%$ sí se rechazaría: la conclusión depende de $\alpha$). (No rechazar no prueba que $H_0$ sea verdadera.)</p><p>Con los datos originales: <code>t.test(x, mu = …, alternative = …)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "t", js: "(38.2 - 40)/(2.5/Math.sqrt(10))", esperado: -2.277, tol: 0.000500001 },
      { que: "crítico", r: "cat(qt(0.99, 9))", esperado: 2.821, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 5–9" }
    ]
  },
  {
    id: "m05-d006",
    modulo: "m05-hipotesis-una-poblacion",
    concepto: "m05-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 5–9" }
    ],
    titulo: "Rendimiento de un proceso (prueba t, muestra pequeña)",
    enunciado: String.raw`<p>Un proceso químico rinde históricamente $70\,\%$. Tras un ajuste, $n=9$ corridas dan $\bar x=73{,}4$ y $s=4{,}8$. ¿Aumentó el rendimiento medio? Usa $\alpha=5\,\%$.</p><ol type="a"><li>Plantea las hipótesis e indica qué prueba corresponde.</li><li>Calcula el estadístico de prueba.</li><li>Indica la región de rechazo (valor crítico).</li><li>Decide y concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y tipo de prueba", puntos: 1.5, solucion: String.raw`<p>$H_0:\mu\le70$ contra $H_1:\mu>70$ — prueba cola derecha. Se busca evidencia de aumento.</p><p>Media con σ desconocida y se usa $s$ ⇒ prueba $t$.</p>` },
      { titulo: "b) Estadístico de prueba", puntos: 2, solucion: String.raw`<p>$t=\dfrac{\bar x-\mu_0}{s/\sqrt n}=\dfrac{73{,}4-70}{4{,}8/\sqrt{9}}=\dfrac{3{,}4}{1{,}6}=2{,}125$ con $n-1=8$ gl (σ desconocida ⇒ $t$ de Student).</p>` },
      { titulo: "c) Región de rechazo", puntos: 1, solucion: "<p>Cola derecha: se rechaza si $t>t_{0{,}95;8}=1{,}86$.</p>" },
      { titulo: "d) Decisión y conclusión en contexto", puntos: 1.5, solucion: String.raw`<p>Estadístico $=2{,}125$; p-valor $=0{,}0332$, menor o igual que $\alpha=0{,}05$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia de que el ajuste aumentó el rendimiento medio por sobre $70\,\%$.</p><p>Con los datos originales: <code>t.test(x, mu = …, alternative = …)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "t", js: "(73.4 - 70)/(4.8/Math.sqrt(9))", esperado: 2.125, tol: 0.000500001 },
      { que: "crítico", r: "cat(qt(0.95, 8))", esperado: 1.86, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 5–9" }
    ]
  },
  {
    id: "m05-d007",
    modulo: "m05-hipotesis-una-poblacion",
    concepto: "m05-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 10–11" }
    ],
    titulo: "Diámetro de piezas con σ conocida (prueba Z bilateral)",
    enunciado: String.raw`<p>El diámetro de una pieza debe ser $10$ mm; se sabe que $\sigma=0{,}5$ mm. Una muestra de $n=36$ piezas da $\bar x=10{,}21$ mm. ¿Se ha desajustado el proceso? Usa $\alpha=5\,\%$.</p><ol type="a"><li>Plantea las hipótesis e indica qué prueba corresponde.</li><li>Calcula el estadístico de prueba.</li><li>Indica la región de rechazo (valor crítico).</li><li>Decide y concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y tipo de prueba", puntos: 1.5, solucion: String.raw`<p>$H_0:\mu=10$ contra $H_1:\mu\neq10$ — prueba bilateral (dos colas). Interesa un desajuste en cualquier dirección.</p><p>Media con σ poblacional conocida ⇒ prueba $Z$.</p>` },
      { titulo: "b) Estadístico de prueba", puntos: 2, solucion: String.raw`<p>$z=\dfrac{\bar x-\mu_0}{\sigma/\sqrt n}=\dfrac{10{,}21-10}{0{,}5/\sqrt{36}}=\dfrac{0{,}21}{0{,}0833}=2{,}52$ (σ conocida ⇒ normal estándar).</p>` },
      { titulo: "c) Región de rechazo", puntos: 1, solucion: "<p>Bilateral: se rechaza si $|z|>z_{0{,}975}=1{,}96$.</p>" },
      { titulo: "d) Decisión y conclusión en contexto", puntos: 1.5, solucion: String.raw`<p>Estadístico $=2{,}52$; p-valor $=0{,}0117$, menor o igual que $\alpha=0{,}05$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia de que el diámetro medio difiere de $10$ mm: el proceso está desajustado.</p><p>Con los datos originales: <code>BSDA::z.test(x, mu = …, sigma.x = …)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "z", js: "(10.21 - 10)/(0.5/Math.sqrt(36))", esperado: 2.52, tol: 0.000500001 },
      { que: "crítico", r: "cat(qnorm(0.975))", esperado: 1.96, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 10–11" }
    ]
  },
  {
    id: "m05-d008",
    modulo: "m05-hipotesis-una-poblacion",
    concepto: "m05-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 10–11" }
    ],
    titulo: "Contenido neto con σ conocida (prueba Z de cola izquierda)",
    enunciado: String.raw`<p>Un envase declara $250$ g. Se sabe que $\sigma=12$ g. En $n=49$ envases se obtiene $\bar x=246{,}4$ g. ¿Hay evidencia de que el contenido medio es menor que el declarado? Usa $\alpha=5\,\%$.</p><ol type="a"><li>Plantea las hipótesis e indica qué prueba corresponde.</li><li>Calcula el estadístico de prueba.</li><li>Indica la región de rechazo (valor crítico).</li><li>Decide y concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y tipo de prueba", puntos: 1.5, solucion: String.raw`<p>$H_0:\mu\ge250$ contra $H_1:\mu<250$ — prueba cola izquierda. La sospecha (menos contenido) va en $H_1$.</p><p>Media con σ poblacional conocida ⇒ prueba $Z$.</p>` },
      { titulo: "b) Estadístico de prueba", puntos: 2, solucion: String.raw`<p>$z=\dfrac{\bar x-\mu_0}{\sigma/\sqrt n}=\dfrac{246{,}4-250}{12/\sqrt{49}}=\dfrac{-3{,}6}{1{,}7143}=-2{,}1$ (σ conocida ⇒ normal estándar).</p>` },
      { titulo: "c) Región de rechazo", puntos: 1, solucion: "<p>Cola izquierda: se rechaza si $z<-z_{0{,}95}=-1{,}645$.</p>" },
      { titulo: "d) Decisión y conclusión en contexto", puntos: 1.5, solucion: String.raw`<p>Estadístico $=-2{,}1$; p-valor $=0{,}0179$, menor o igual que $\alpha=0{,}05$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia de que el contenido medio es menor que los $250$ g declarados.</p><p>Con los datos originales: <code>BSDA::z.test(x, mu = …, sigma.x = …)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "z", js: "(246.4 - 250)/(12/Math.sqrt(49))", esperado: -2.1, tol: 0.000500001 },
      { que: "crítico", r: "cat(qnorm(0.95))", esperado: 1.645, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 10–11" }
    ]
  },
  {
    id: "m05-d009",
    modulo: "m05-hipotesis-una-poblacion",
    concepto: "m05-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 10–11" }
    ],
    titulo: "Consumo eléctrico con σ conocida y α = 1 %",
    enunciado: String.raw`<p>El consumo medio histórico de un equipo es $100$ kWh, con $\sigma=9{,}6$ kWh. Tras un cambio de proveedor, $n=64$ mediciones dan $\bar x=102{,}5$ kWh. ¿Aumentó el consumo medio? Usa $\alpha=1\,\%$.</p><ol type="a"><li>Plantea las hipótesis e indica qué prueba corresponde.</li><li>Calcula el estadístico de prueba.</li><li>Indica la región de rechazo (valor crítico).</li><li>Decide y concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y tipo de prueba", puntos: 1.5, solucion: String.raw`<p>$H_0:\mu\le100$ contra $H_1:\mu>100$ — prueba cola derecha. Se busca evidencia de aumento.</p><p>Media con σ poblacional conocida ⇒ prueba $Z$.</p>` },
      { titulo: "b) Estadístico de prueba", puntos: 2, solucion: String.raw`<p>$z=\dfrac{\bar x-\mu_0}{\sigma/\sqrt n}=\dfrac{102{,}5-100}{9{,}6/\sqrt{64}}=\dfrac{2{,}5}{1{,}2}=2{,}083$ (σ conocida ⇒ normal estándar).</p>` },
      { titulo: "c) Región de rechazo", puntos: 1, solucion: "<p>Cola derecha: se rechaza si $z>z_{0{,}99}=2{,}326$.</p>" },
      { titulo: "d) Decisión y conclusión en contexto", puntos: 1.5, solucion: String.raw`<p>Estadístico $=2{,}083$; p-valor $=0{,}0186$, mayor que $\alpha=0{,}01$ ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>Al $1\,\%$ no hay evidencia suficiente de que el consumo medio haya aumentado (el p-valor es menor que $0{,}05$, pero mayor que $0{,}01$). (No rechazar no prueba que $H_0$ sea verdadera.)</p><p>Con los datos originales: <code>BSDA::z.test(x, mu = …, sigma.x = …)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "z", js: "(102.5 - 100)/(9.6/Math.sqrt(64))", esperado: 2.083, tol: 0.000500001 },
      { que: "crítico", r: "cat(qnorm(0.99))", esperado: 2.326, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 10–11" }
    ]
  },
  {
    id: "m05-d010",
    modulo: "m05-hipotesis-una-poblacion",
    concepto: "m05-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 12–16" },
      { id: "AY2-E", loc: "P1" }
    ],
    titulo: "Preferencia por una marca (proporción, bilateral)",
    enunciado: String.raw`<p>Se afirma que el $40\,\%$ de los consumidores prefiere cierta marca. En una encuesta a $150$ personas, $51$ la prefieren. ¿Es compatible con lo afirmado? Usa $\alpha=5\,\%$.</p><ol type="a"><li>Plantea las hipótesis y verifica el requisito de la prueba.</li><li>Calcula el estadístico de prueba.</li><li>Indica la región de rechazo (valor crítico).</li><li>Decide y concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y requisito", puntos: 1.5, solucion: String.raw`<p>$H_0:p=0{,}4$ contra $H_1:p\neq0{,}4$ — prueba bilateral (dos colas). Se contrasta si la proporción cambió, sin dirección.</p><p>Requisito: $np_0=150\cdot0{,}4=60\ge5$ y $n(1-p_0)=90\ge5$ ⇒ vale la aproximación normal.</p>` },
      { titulo: "b) Estadístico de prueba", puntos: 2, solucion: String.raw`<p>$\hat p=51/150=0{,}34$. $z=\dfrac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}=\dfrac{0{,}34-0{,}4}{\sqrt{0{,}4\cdot0{,}6/150}}=\dfrac{-0{,}06}{0{,}04}=-1{,}5$. En el denominador va $p_0$, no $\hat p$.</p>` },
      { titulo: "c) Región de rechazo", puntos: 1, solucion: "<p>Bilateral: se rechaza si $|z|>z_{0{,}975}=1{,}96$; p-valor $=2P(Z>|z|)$.</p>" },
      { titulo: "d) Decisión y conclusión en contexto", puntos: 1.5, solucion: String.raw`<p>Estadístico $=-1{,}5$; p-valor $=0{,}1336$, mayor que $\alpha=0{,}05$ ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>No hay evidencia de que la proporción difiera del $40\,\%$ afirmado. (No rechazar no prueba que $H_0$ sea verdadera.)</p><p>En R: <code>prop.test(51, 150, 0.4, "two.sided", correct = FALSE)</code> da $X^2=z^2=2{,}25$.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "z² (prop.test)", r: `cat(prop.test(51, 150, 0.4, "two.sided", correct = FALSE)$statistic)`, esperado: 2.25, tol: 0.000500001 },
      { que: "p-valor (prop.test)", r: `cat(prop.test(51, 150, 0.4, "two.sided", correct = FALSE)$p.value)`, esperado: 0.1336, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 12–16" },
      { id: "AY2-E", loc: "P1" }
    ]
  },
  {
    id: "m05-d011",
    modulo: "m05-hipotesis-una-poblacion",
    concepto: "m05-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 12–16" },
      { id: "AY2-E", loc: "P1" }
    ],
    titulo: "Entregas a tiempo (proporción, cola izquierda, α = 1 %)",
    enunciado: String.raw`<p>Una empresa de despacho promete que al menos el $90\,\%$ de sus entregas llega a tiempo. De $200$ entregas revisadas, $168$ llegaron a tiempo. ¿Hay evidencia de que no cumple? Usa $\alpha=1\,\%$.</p><ol type="a"><li>Plantea las hipótesis y verifica el requisito de la prueba.</li><li>Calcula el estadístico de prueba.</li><li>Indica la región de rechazo (valor crítico).</li><li>Decide y concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y requisito", puntos: 1.5, solucion: String.raw`<p>$H_0:p\ge0{,}9$ contra $H_1:p<0{,}9$ — prueba cola izquierda. No cumplir significa $p<0{,}90$, que va en $H_1$.</p><p>Requisito: $np_0=200\cdot0{,}9=180\ge5$ y $n(1-p_0)=20\ge5$ ⇒ vale la aproximación normal.</p>` },
      { titulo: "b) Estadístico de prueba", puntos: 2, solucion: String.raw`<p>$\hat p=168/200=0{,}84$. $z=\dfrac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}=\dfrac{0{,}84-0{,}9}{\sqrt{0{,}9\cdot0{,}1/200}}=\dfrac{-0{,}06}{0{,}02121}=-2{,}828$. En el denominador va $p_0$, no $\hat p$.</p>` },
      { titulo: "c) Región de rechazo", puntos: 1, solucion: "<p>Cola izquierda: se rechaza si $z<-z_{0{,}99}=-2{,}326$.</p>" },
      { titulo: "d) Decisión y conclusión en contexto", puntos: 1.5, solucion: String.raw`<p>Estadístico $=-2{,}828$; p-valor $=0{,}0023$, menor o igual que $\alpha=0{,}01$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Al $1\,\%$ hay evidencia de que la proporción de entregas a tiempo es menor que $90\,\%$: la empresa no cumple lo prometido.</p><p>En R: <code>prop.test(168, 200, 0.9, "less", correct = FALSE)</code> da $X^2=z^2=8$.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "z² (prop.test)", r: `cat(prop.test(168, 200, 0.9, "less", correct = FALSE)$statistic)`, esperado: 8, tol: 0.000500001 },
      { que: "p-valor (prop.test)", r: `cat(prop.test(168, 200, 0.9, "less", correct = FALSE)$p.value)`, esperado: 0.0023, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 12–16" },
      { id: "AY2-E", loc: "P1" }
    ]
  },
  {
    id: "m05-d012",
    modulo: "m05-hipotesis-una-poblacion",
    concepto: "m05-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 12–16" },
      { id: "AY2-E", loc: "P1" }
    ],
    titulo: "Clientes que reclaman (proporción, muestra chica)",
    enunciado: String.raw`<p>Históricamente reclama a lo más el $10\,\%$ de los clientes. Este mes, de $80$ clientes reclamaron $14$. ¿Aumentó la proporción de reclamos? Usa $\alpha=5\,\%$.</p><ol type="a"><li>Plantea las hipótesis y verifica el requisito de la prueba.</li><li>Calcula el estadístico de prueba.</li><li>Indica la región de rechazo (valor crítico).</li><li>Decide y concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y requisito", puntos: 1.5, solucion: String.raw`<p>$H_0:p\le0{,}1$ contra $H_1:p>0{,}1$ — prueba cola derecha. Se busca evidencia de aumento.</p><p>Requisito: $np_0=80\cdot0{,}1=8\ge5$ y $n(1-p_0)=72\ge5$ ⇒ vale la aproximación normal.</p>` },
      { titulo: "b) Estadístico de prueba", puntos: 2, solucion: String.raw`<p>$\hat p=14/80=0{,}175$. $z=\dfrac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}=\dfrac{0{,}175-0{,}1}{\sqrt{0{,}1\cdot0{,}9/80}}=\dfrac{0{,}075}{0{,}03354}=2{,}236$. En el denominador va $p_0$, no $\hat p$.</p>` },
      { titulo: "c) Región de rechazo", puntos: 1, solucion: "<p>Cola derecha: se rechaza si $z>z_{0{,}95}=1{,}645$.</p>" },
      { titulo: "d) Decisión y conclusión en contexto", puntos: 1.5, solucion: String.raw`<p>Estadístico $=2{,}236$; p-valor $=0{,}0127$, menor o igual que $\alpha=0{,}05$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia de que la proporción de reclamos supera el $10\,\%$.</p><p>En R: <code>prop.test(14, 80, 0.1, "greater", correct = FALSE)</code> da $X^2=z^2=5$.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "z² (prop.test)", r: `cat(prop.test(14, 80, 0.1, "greater", correct = FALSE)$statistic)`, esperado: 5, tol: 0.000500001 },
      { que: "p-valor (prop.test)", r: `cat(prop.test(14, 80, 0.1, "greater", correct = FALSE)$p.value)`, esperado: 0.0127, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 12–16" },
      { id: "AY2-E", loc: "P1" }
    ]
  },
  {
    id: "m05-d013",
    modulo: "m05-hipotesis-una-poblacion",
    concepto: "m05-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 17–20" },
      { id: "AY2-E", loc: "P3(a)" }
    ],
    titulo: "¿Se redujo la variabilidad? (χ² de cola izquierda)",
    enunciado: String.raw`<p>Un proceso tenía varianza $25$. Tras una mejora, una muestra de $n=20$ da $s^2=14{,}2$ (población normal). ¿Hay evidencia de que la varianza disminuyó? Usa $\alpha=5\,\%$.</p><ol type="a"><li>Plantea las hipótesis e indica qué prueba corresponde.</li><li>Calcula el estadístico de prueba.</li><li>Indica la región de rechazo (valor crítico).</li><li>Decide y concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y tipo de prueba", puntos: 1.5, solucion: String.raw`<p>$H_0:\sigma^2\ge25$ contra $H_1:\sigma^2<25$ — prueba cola izquierda. La disminución va en $H_1$.</p><p>Parámetro de dispersión ⇒ prueba $\chi^2$ para la varianza.</p>` },
      { titulo: "b) Estadístico de prueba", puntos: 2, solucion: String.raw`<p>$\chi^2=\dfrac{(n-1)s^2}{\sigma_0^2}=\dfrac{19\cdot14{,}2}{25}=10{,}792$ con $n-1=19$ gl.</p>` },
      { titulo: "c) Región de rechazo", puntos: 1, solucion: String.raw`<p>Cola izquierda: se rechaza si $\chi^2<\chi^2_{0{,}05;19}=10{,}117$ (el cuantil <strong>inferior</strong>: <code>qchisq(0.05, 19)</code>).</p>` },
      { titulo: "d) Decisión y conclusión en contexto", puntos: 1.5, solucion: String.raw`<p>Estadístico $=10{,}792$; p-valor $=0{,}0694$, mayor que $\alpha=0{,}05$ ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>Al $5\,\%$ no hay evidencia suficiente de que la varianza haya disminuido, aunque $s^2<25$ en la muestra. (No rechazar no prueba que $H_0$ sea verdadera.)</p><p>La prueba supone población normal. En R se calcula a mano con <code>qchisq()</code> y <code>pchisq()</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "χ²", js: "(20 - 1)*14.2/25", esperado: 10.792, tol: 0.000500001 },
      { que: "crítico", r: "cat(qchisq(0.05, 19))", esperado: 10.117, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 17–20" },
      { id: "AY2-E", loc: "P3(a)" }
    ]
  },
  {
    id: "m05-d014",
    modulo: "m05-hipotesis-una-poblacion",
    concepto: "m05-c05",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 17–20" },
      { id: "AY2-E", loc: "P3(a)" }
    ],
    titulo: "Desviación estándar de un instrumento (χ² bilateral)",
    enunciado: String.raw`<p>Un instrumento debe tener una desviación estándar de $\sigma=2$ unidades. En $n=12$ mediciones se obtuvo $s=3{,}1$ (población normal). ¿Difiere la variabilidad de la especificada? Usa $\alpha=5\,\%$.</p><ol type="a"><li>Plantea las hipótesis e indica qué prueba corresponde.</li><li>Calcula el estadístico de prueba.</li><li>Indica la región de rechazo (valor crítico).</li><li>Decide y concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y tipo de prueba", puntos: 1.5, solucion: String.raw`<p>$H_0:\sigma^2=4$ contra $H_1:\sigma^2\neq4$ — prueba bilateral (dos colas). «Difiere» ⇒ dos colas.</p><p>Parámetro de dispersión ⇒ prueba $\chi^2$ para la varianza.</p>` },
      { titulo: "b) Estadístico de prueba", puntos: 2, solucion: String.raw`<p>$\chi^2=\dfrac{(n-1)s^2}{\sigma_0^2}=\dfrac{11\cdot9{,}61}{4}=26{,}428$ con $n-1=11$ gl. Ojo: la hipótesis se plantea sobre la varianza, $\sigma_0^2=2^2=4$ y $s^2=3{,}1^2=9{,}61$.</p>` },
      { titulo: "c) Región de rechazo", puntos: 1, solucion: String.raw`<p>Bilateral: se rechaza si $\chi^2<\chi^2_{0{,}025;11}=3{,}816$ o $\chi^2>\chi^2_{0{,}975;11}=21{,}92$.</p>` },
      { titulo: "d) Decisión y conclusión en contexto", puntos: 1.5, solucion: String.raw`<p>Estadístico $=26{,}428$; p-valor $=0{,}0112$, menor o igual que $\alpha=0{,}05$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia de que la variabilidad del instrumento difiere de la especificada (es mayor).</p><p>La prueba supone población normal. En R se calcula a mano con <code>qchisq()</code> y <code>pchisq()</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "χ²", js: "(12 - 1)*9.61/4", esperado: 26.428, tol: 0.000500001 },
      { que: "crítico", r: "cat(qchisq(0.975, 11))", esperado: 21.92, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 17–20" },
      { id: "AY2-E", loc: "P3(a)" }
    ]
  },
  {
    id: "m05-d015",
    modulo: "m05-hipotesis-una-poblacion",
    concepto: "m05-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 17–20" },
      { id: "AY2-E", loc: "P3(a)" }
    ],
    titulo: "Variabilidad del espesor con α = 1 % (χ² de cola derecha)",
    enunciado: String.raw`<p>El espesor de una lámina debe tener varianza a lo más $0{,}01$ mm². En $n=25$ láminas se obtiene $s=0{,}14$ mm, es decir $s^2=0{,}0196$ (población normal). ¿Hay evidencia de que la varianza excede lo permitido? Usa $\alpha=1\,\%$.</p><ol type="a"><li>Plantea las hipótesis e indica qué prueba corresponde.</li><li>Calcula el estadístico de prueba.</li><li>Indica la región de rechazo (valor crítico).</li><li>Decide y concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y tipo de prueba", puntos: 1.5, solucion: String.raw`<p>$H_0:\sigma^2\le0{,}01$ contra $H_1:\sigma^2>0{,}01$ — prueba cola derecha. Exceder lo permitido va en $H_1$.</p><p>Parámetro de dispersión ⇒ prueba $\chi^2$ para la varianza.</p>` },
      { titulo: "b) Estadístico de prueba", puntos: 2, solucion: String.raw`<p>$\chi^2=\dfrac{(n-1)s^2}{\sigma_0^2}=\dfrac{24\cdot0{,}0196}{0{,}01}=47{,}04$ con $n-1=24$ gl.</p>` },
      { titulo: "c) Región de rechazo", puntos: 1, solucion: String.raw`<p>Cola derecha: se rechaza si $\chi^2>\chi^2_{0{,}99;24}=42{,}98$.</p>` },
      { titulo: "d) Decisión y conclusión en contexto", puntos: 1.5, solucion: String.raw`<p>Estadístico $=47{,}04$; p-valor $=0{,}0033$, menor o igual que $\alpha=0{,}01$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Al $1\,\%$ hay evidencia de que la varianza del espesor excede $0{,}01$ mm².</p><p>La prueba supone población normal. En R se calcula a mano con <code>qchisq()</code> y <code>pchisq()</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "χ²", js: "(25 - 1)*0.0196/0.01", esperado: 47.04, tol: 0.000500001 },
      { que: "crítico", r: "cat(qchisq(0.99, 24))", esperado: 42.98, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 17–20" },
      { id: "AY2-E", loc: "P3(a)" }
    ]
  }
]);
