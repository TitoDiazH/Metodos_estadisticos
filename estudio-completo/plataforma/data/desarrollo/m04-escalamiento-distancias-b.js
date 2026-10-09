/* ============================================================================
   Desarrollo · M04 Escalamiento, distancias y similitud (P1) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m04-d001",
    modulo: "m04-escalamiento-distancias",
    concepto: "m04-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 41–42" }
    ],
    titulo: "Min–max, z-score e inversa (sueldos)",
    enunciado: String.raw`<p>Se quiere escalar una variable antes de calcular distancias. Los datos de sueldo (miles de pesos) son: $450$; $520$; $610$; $700$; $980$.</p><ol type="a"><li>Aplica la normalización min–max a los datos.</li><li>Aplica la estandarización z-score (indica $\bar x$ y $s$).</li><li>Un dato nuevo tiene valor min–max $w=0{,}4$. ¿A qué valor original corresponde? ¿Qué propiedades tiene cada transformación?</li></ol>`,
    partes: [
      { titulo: "a) Normalización min–max", puntos: 2, solucion: String.raw`<p>$\min=450$, $\max=980$, rango $=530$. $w_i=\dfrac{x_i-\min}{\max-\min}$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_i$</th><th>$450$</th><th>$520$</th><th>$610$</th><th>$700$</th><th>$980$</th></tr></thead><tbody><tr><td>$w_i$</td><td>$0$</td><td>$0{,}132$</td><td>$0{,}302$</td><td>$0{,}472$</td><td>$1$</td></tr></tbody></table></div><p>Ejemplo: $\dfrac{520-450}{530}=0{,}132$. El mínimo queda en $0$ y el máximo en $1$.</p>` },
      { titulo: "b) Media, desviación y z-score", puntos: 2.5, solucion: String.raw`<p>$\bar x=652$; $s=\sqrt{\dfrac{\sum(x_i-\bar x)^2}{n-1}}=\sqrt{\dfrac{169880}{4}}=206{,}083$. $z_i=\dfrac{x_i-\bar x}{s}$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_i$</th><th>$450$</th><th>$520$</th><th>$610$</th><th>$700$</th><th>$980$</th></tr></thead><tbody><tr><td>$z_i$</td><td>$-0{,}98$</td><td>$-0{,}641$</td><td>$-0{,}204$</td><td>$0{,}233$</td><td>$1{,}592$</td></tr></tbody></table></div><p>Los $z_i$ tienen media $0$ y desviación $1$. Es lo que calcula <code>scale(x)</code> (divide con $n-1$).</p>` },
      { titulo: "c) Inversa de min–max y propiedades", puntos: 1.5, solucion: String.raw`<p>$x=w(\max-\min)+\min=0{,}4\cdot530+450=662$.</p><p>Min–max deja los datos en $[0,1]$ pero <strong>no</strong> da media $0$ ni varianza $1$, y es muy sensible a outliers (fijan el mínimo o el máximo). El z-score da media $0$ y desviación $1$, sin acotar el rango.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "z del 2.º dato", r: "cat(scale(c(450, 520, 610, 700, 980))[2])", esperado: -0.641, tol: 0.000500001 },
      { que: "min–max del 2.º dato", js: "(520 - 450)/(980 - 450)", esperado: 0.132, tol: 0.000500001 },
      { que: "inversa", js: "0.4*(980 - 450) + 450", esperado: 662, tol: 0.000500001 },
      { que: "s", r: "cat(sd(c(450, 520, 610, 700, 980)))", esperado: 206.083, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 41–42" }
    ]
  },
  {
    id: "m04-d002",
    modulo: "m04-escalamiento-distancias",
    concepto: "m04-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 41–42" }
    ],
    titulo: "Min–max, z-score e inversa (tiempos de entrega)",
    enunciado: String.raw`<p>Una empresa de reparto quiere comparar repartidores con variables en la misma escala. Los datos de tiempo de entrega (minutos) son: $12$; $15$; $18$; $20$; $35$.</p><ol type="a"><li>Aplica la normalización min–max a los datos.</li><li>Aplica la estandarización z-score (indica $\bar x$ y $s$).</li><li>Un dato nuevo tiene valor min–max $w=0{,}75$. ¿A qué valor original corresponde? ¿Qué propiedades tiene cada transformación?</li></ol>`,
    partes: [
      { titulo: "a) Normalización min–max", puntos: 2, solucion: String.raw`<p>$\min=12$, $\max=35$, rango $=23$. $w_i=\dfrac{x_i-\min}{\max-\min}$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_i$</th><th>$12$</th><th>$15$</th><th>$18$</th><th>$20$</th><th>$35$</th></tr></thead><tbody><tr><td>$w_i$</td><td>$0$</td><td>$0{,}13$</td><td>$0{,}261$</td><td>$0{,}348$</td><td>$1$</td></tr></tbody></table></div><p>Ejemplo: $\dfrac{15-12}{23}=0{,}13$. El mínimo queda en $0$ y el máximo en $1$.</p>` },
      { titulo: "b) Media, desviación y z-score", puntos: 2.5, solucion: String.raw`<p>$\bar x=20$; $s=\sqrt{\dfrac{\sum(x_i-\bar x)^2}{n-1}}=\sqrt{\dfrac{318}{4}}=8{,}916$. $z_i=\dfrac{x_i-\bar x}{s}$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_i$</th><th>$12$</th><th>$15$</th><th>$18$</th><th>$20$</th><th>$35$</th></tr></thead><tbody><tr><td>$z_i$</td><td>$-0{,}897$</td><td>$-0{,}561$</td><td>$-0{,}224$</td><td>$0$</td><td>$1{,}682$</td></tr></tbody></table></div><p>Los $z_i$ tienen media $0$ y desviación $1$. Es lo que calcula <code>scale(x)</code> (divide con $n-1$).</p>` },
      { titulo: "c) Inversa de min–max y propiedades", puntos: 1.5, solucion: String.raw`<p>$x=w(\max-\min)+\min=0{,}75\cdot23+12=29{,}25$.</p><p>Min–max deja los datos en $[0,1]$ pero <strong>no</strong> da media $0$ ni varianza $1$, y es muy sensible a outliers (fijan el mínimo o el máximo). El z-score da media $0$ y desviación $1$, sin acotar el rango.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "z del 2.º dato", r: "cat(scale(c(12, 15, 18, 20, 35))[2])", esperado: -0.561, tol: 0.000500001 },
      { que: "min–max del 2.º dato", js: "(15 - 12)/(35 - 12)", esperado: 0.13, tol: 0.000500001 },
      { que: "inversa", js: "0.75*(35 - 12) + 12", esperado: 29.25, tol: 0.000500001 },
      { que: "s", r: "cat(sd(c(12, 15, 18, 20, 35)))", esperado: 8.916, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 41–42" }
    ]
  },
  {
    id: "m04-d003",
    modulo: "m04-escalamiento-distancias",
    concepto: "m04-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 41–42" }
    ],
    titulo: "Min–max, z-score e inversa (puntajes)",
    enunciado: String.raw`<p>Se desea llevar un puntaje a una escala común. Los datos de puntaje son: $40$; $55$; $60$; $70$; $75$.</p><ol type="a"><li>Aplica la normalización min–max a los datos.</li><li>Aplica la estandarización z-score (indica $\bar x$ y $s$).</li><li>Un dato nuevo tiene valor min–max $w=0{,}2$. ¿A qué valor original corresponde? ¿Qué propiedades tiene cada transformación?</li></ol>`,
    partes: [
      { titulo: "a) Normalización min–max", puntos: 2, solucion: String.raw`<p>$\min=40$, $\max=75$, rango $=35$. $w_i=\dfrac{x_i-\min}{\max-\min}$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_i$</th><th>$40$</th><th>$55$</th><th>$60$</th><th>$70$</th><th>$75$</th></tr></thead><tbody><tr><td>$w_i$</td><td>$0$</td><td>$0{,}429$</td><td>$0{,}571$</td><td>$0{,}857$</td><td>$1$</td></tr></tbody></table></div><p>Ejemplo: $\dfrac{55-40}{35}=0{,}429$. El mínimo queda en $0$ y el máximo en $1$.</p>` },
      { titulo: "b) Media, desviación y z-score", puntos: 2.5, solucion: String.raw`<p>$\bar x=60$; $s=\sqrt{\dfrac{\sum(x_i-\bar x)^2}{n-1}}=\sqrt{\dfrac{750}{4}}=13{,}693$. $z_i=\dfrac{x_i-\bar x}{s}$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_i$</th><th>$40$</th><th>$55$</th><th>$60$</th><th>$70$</th><th>$75$</th></tr></thead><tbody><tr><td>$z_i$</td><td>$-1{,}461$</td><td>$-0{,}365$</td><td>$0$</td><td>$0{,}73$</td><td>$1{,}095$</td></tr></tbody></table></div><p>Los $z_i$ tienen media $0$ y desviación $1$. Es lo que calcula <code>scale(x)</code> (divide con $n-1$).</p>` },
      { titulo: "c) Inversa de min–max y propiedades", puntos: 1.5, solucion: String.raw`<p>$x=w(\max-\min)+\min=0{,}2\cdot35+40=47$.</p><p>Min–max deja los datos en $[0,1]$ pero <strong>no</strong> da media $0$ ni varianza $1$, y es muy sensible a outliers (fijan el mínimo o el máximo). El z-score da media $0$ y desviación $1$, sin acotar el rango.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "z del 2.º dato", r: "cat(scale(c(40, 55, 60, 70, 75))[2])", esperado: -0.365, tol: 0.000500001 },
      { que: "min–max del 2.º dato", js: "(55 - 40)/(75 - 40)", esperado: 0.429, tol: 0.000500001 },
      { que: "inversa", js: "0.2*(75 - 40) + 40", esperado: 47, tol: 0.000500001 },
      { que: "s", r: "cat(sd(c(40, 55, 60, 70, 75)))", esperado: 13.693, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 41–42" }
    ]
  },
  {
    id: "m04-d004",
    modulo: "m04-escalamiento-distancias",
    concepto: "m04-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 43–44" }
    ],
    titulo: "Escalamiento robusto con un outlier (y norma L2)",
    enunciado: `<p>Se mide el tiempo de respuesta (segundos) de un servidor en 5 consultas. Datos: $8$; $10$; $12$; $15$; $60$ (el último es un valor extremo).</p><ol type="a"><li>Calcula la mediana y el rango intercuartil (IQR) y aplica el escalamiento robusto.</li><li>Compara con el z-score: ¿por qué conviene el robusto aquí?</li><li>Aplica la normalización L2 al vector de datos.</li></ol>`,
    partes: [
      { titulo: "a) Mediana, cuartiles e IQR", puntos: 1.5, solucion: String.raw`<p>Datos ordenados: con $n=5$ la mediana es el 3.º ($12$), $Q_1$ el 2.º ($10$) y $Q_3$ el 4.º ($15$), como los calcula <code>quantile()</code> en R. $\text{IQR}=Q_3-Q_1=5$.</p>` },
      { titulo: "a) Escalamiento robusto", puntos: 1.5, solucion: String.raw`<p>$w_i=\dfrac{x_i-\text{mediana}}{\text{IQR}}$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_i$</th><th>$8$</th><th>$10$</th><th>$12$</th><th>$15$</th><th>$60$</th></tr></thead><tbody><tr><td>$w_i$</td><td>$-0{,}8$</td><td>$-0{,}4$</td><td>$0$</td><td>$0{,}6$</td><td>$9{,}6$</td></tr></tbody></table></div><p>Ejemplo: $\dfrac{60-12}{5}=9{,}6$.</p>` },
      { titulo: "b) Comparación con el z-score", puntos: 1.5, solucion: String.raw`<p>Con z-score: $\bar x=21$ y $s=21{,}95$ (ambos inflados por el valor extremo), y $z=(-0{,}59; -0{,}5; -0{,}41; -0{,}27; 1{,}78)$: los cuatro datos «normales» quedan apretados entre $-0{,}59$ y $-0{,}27$.</p><p>La mediana y el IQR casi no se ven afectados por el outlier, así que el escalamiento robusto conserva la separación entre los datos normales y deja al extremo claramente lejos.</p>` },
      { titulo: "c) Normalización L2", puntos: 1.5, solucion: String.raw`<p>$\lVert x\rVert_2=\sqrt{\sum x_i^2}=\sqrt{4133}=64{,}288$. $w_i=x_i/\lVert x\rVert_2$: $(0{,}124; 0{,}156; 0{,}187; 0{,}233; 0{,}933)$.</p><p>El vector resultante tiene norma $1$: se conserva la dirección, no la magnitud.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "IQR", r: "cat(IQR(c(8, 10, 12, 15, 60)))", esperado: 5, tol: 0.000050001 },
      { que: "mediana", r: "cat(median(c(8, 10, 12, 15, 60)))", esperado: 12, tol: 0.000050001 },
      { que: "robusto del extremo", js: "(60 - 12)/5", esperado: 9.6, tol: 0.000500001 },
      { que: "z del extremo", r: "cat(scale(c(8, 10, 12, 15, 60))[5])", esperado: 1.78, tol: 0.0050000010000000004 },
      { que: "norma", js: "Math.sqrt(suma([8,10,12,15,60].map(v => v*v)))", esperado: 64.288, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 43–44" }
    ]
  },
  {
    id: "m04-d005",
    modulo: "m04-escalamiento-distancias",
    concepto: "m04-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 43–44" }
    ],
    titulo: "Robusto vs. z-score: ventas con un día atípico",
    enunciado: `<p>Ventas diarias (millones) de una tienda durante 5 días. Datos: $3$; $4$; $6$; $7$; $40$ (el último es un valor extremo).</p><ol type="a"><li>Calcula la mediana y el rango intercuartil (IQR) y aplica el escalamiento robusto.</li><li>Compara con el z-score: ¿por qué conviene el robusto aquí?</li><li>Aplica la normalización L2 al vector de datos.</li></ol>`,
    partes: [
      { titulo: "a) Mediana, cuartiles e IQR", puntos: 1.5, solucion: String.raw`<p>Datos ordenados: con $n=5$ la mediana es el 3.º ($6$), $Q_1$ el 2.º ($4$) y $Q_3$ el 4.º ($7$), como los calcula <code>quantile()</code> en R. $\text{IQR}=Q_3-Q_1=3$.</p>` },
      { titulo: "a) Escalamiento robusto", puntos: 1.5, solucion: String.raw`<p>$w_i=\dfrac{x_i-\text{mediana}}{\text{IQR}}$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_i$</th><th>$3$</th><th>$4$</th><th>$6$</th><th>$7$</th><th>$40$</th></tr></thead><tbody><tr><td>$w_i$</td><td>$-1$</td><td>$-0{,}667$</td><td>$0$</td><td>$0{,}333$</td><td>$11{,}333$</td></tr></tbody></table></div><p>Ejemplo: $\dfrac{40-6}{3}=11{,}333$.</p>` },
      { titulo: "b) Comparación con el z-score", puntos: 1.5, solucion: String.raw`<p>Con z-score: $\bar x=12$ y $s=15{,}73$ (ambos inflados por el valor extremo), y $z=(-0{,}57; -0{,}51; -0{,}38; -0{,}32; 1{,}78)$: los cuatro datos «normales» quedan apretados entre $-0{,}57$ y $-0{,}32$.</p><p>La mediana y el IQR casi no se ven afectados por el outlier, así que el escalamiento robusto conserva la separación entre los datos normales y deja al extremo claramente lejos.</p>` },
      { titulo: "c) Normalización L2", puntos: 1.5, solucion: String.raw`<p>$\lVert x\rVert_2=\sqrt{\sum x_i^2}=\sqrt{1710}=41{,}352$. $w_i=x_i/\lVert x\rVert_2$: $(0{,}073; 0{,}097; 0{,}145; 0{,}169; 0{,}967)$.</p><p>El vector resultante tiene norma $1$: se conserva la dirección, no la magnitud.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "IQR", r: "cat(IQR(c(3, 4, 6, 7, 40)))", esperado: 3, tol: 0.000050001 },
      { que: "mediana", r: "cat(median(c(3, 4, 6, 7, 40)))", esperado: 6, tol: 0.000050001 },
      { que: "robusto del extremo", js: "(40 - 6)/3", esperado: 11.333, tol: 0.000500001 },
      { que: "z del extremo", r: "cat(scale(c(3, 4, 6, 7, 40))[5])", esperado: 1.78, tol: 0.0050000010000000004 },
      { que: "norma", js: "Math.sqrt(suma([3,4,6,7,40].map(v => v*v)))", esperado: 41.352, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 43–44" }
    ]
  },
  {
    id: "m04-d006",
    modulo: "m04-escalamiento-distancias",
    concepto: "m04-c05",
    dificultad: 1,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 46–47" }
    ],
    titulo: "Euclídea y Manhattan entre tres clientes",
    enunciado: `<p>Tres clientes descritos por tres variables ya estandarizadas a escalas comparables:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Compras</th><th>Visitas</th><th>Reclamos</th></tr></thead><tbody><tr><td>A</td><td>$2$</td><td>$5$</td><td>$1$</td></tr><tr><td>B</td><td>$6$</td><td>$2$</td><td>$3$</td></tr><tr><td>C</td><td>$3$</td><td>$7$</td><td>$4$</td></tr></tbody></table></div><ol type="a"><li>Calcula la distancia euclídea entre cada par.</li><li>Calcula la distancia Manhattan entre cada par.</li><li>¿Qué par es el más parecido según cada distancia? ¿Qué habría que hacer antes si las variables tuvieran unidades muy distintas?</li></ol>`,
    partes: [
      { titulo: "a) Distancias euclídeas", puntos: 2.5, solucion: String.raw`<p>$d_E=\sqrt{\sum_j(a_j-b_j)^2}$:</p><p>$d_E(A,B)=\sqrt{(-4)^2+(3)^2+(-2)^2}=\sqrt{29}=5{,}385$</p><p>$d_E(A,C)=\sqrt{(-1)^2+(-2)^2+(-3)^2}=\sqrt{14}=3{,}742$</p><p>$d_E(B,C)=\sqrt{(3)^2+(-5)^2+(-1)^2}=\sqrt{35}=5{,}916$</p>` },
      { titulo: "b) Distancias Manhattan", puntos: 2, solucion: String.raw`<p>$d_M=\sum_j|a_j-b_j|$:</p><p>$d_M(A,B)=|-4|+|3|+|-2|=9$</p><p>$d_M(A,C)=|-1|+|-2|+|-3|=6$</p><p>$d_M(B,C)=|3|+|-5|+|-1|=9$</p>` },
      { titulo: "c) Par más parecido y escalamiento", puntos: 1.5, solucion: String.raw`<p>Euclídea: el par más cercano es A–C ($3{,}742$). Manhattan: A–C ($6$). Ambas coinciden.</p><p>Siempre $d_M\ge d_E$. Si las unidades son muy distintas hay que estandarizar antes (z-score o min–max), o la variable de mayor escala domina la distancia.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "euclídea A–B", js: "dist([2,5,1], [6,2,3])", esperado: 5.385, tol: 0.000500001 },
      { que: "euclídea A–C", js: "dist([2,5,1], [3,7,4])", esperado: 3.742, tol: 0.000500001 },
      { que: "euclídea B–C", js: "dist([6,2,3], [3,7,4])", esperado: 5.916, tol: 0.000500001 },
      { que: "Manhattan A–B", js: "manhattan([2,5,1], [6,2,3])", esperado: 9, tol: 0.000050001 },
      { que: "Manhattan A–C", js: "manhattan([2,5,1], [3,7,4])", esperado: 6, tol: 0.000050001 },
      { que: "Manhattan B–C", js: "manhattan([6,2,3], [3,7,4])", esperado: 9, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 46–47" }
    ]
  },
  {
    id: "m04-d007",
    modulo: "m04-escalamiento-distancias",
    concepto: "m04-c05",
    dificultad: 1,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 46–47" }
    ],
    titulo: "Distancias entre tres sucursales (¿coinciden las métricas?)",
    enunciado: `<p>Tres sucursales evaluadas en tres indicadores (puntajes de 0 a 10):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Ventas</th><th>Servicio</th><th>Costos</th></tr></thead><tbody><tr><td>A</td><td>$1$</td><td>$1$</td><td>$1$</td></tr><tr><td>B</td><td>$5$</td><td>$2$</td><td>$1$</td></tr><tr><td>C</td><td>$3$</td><td>$3$</td><td>$3$</td></tr></tbody></table></div><ol type="a"><li>Calcula la distancia euclídea entre cada par.</li><li>Calcula la distancia Manhattan entre cada par.</li><li>¿Qué par es el más parecido según cada distancia? ¿Qué habría que hacer antes si las variables tuvieran unidades muy distintas?</li></ol>`,
    partes: [
      { titulo: "a) Distancias euclídeas", puntos: 2.5, solucion: String.raw`<p>$d_E=\sqrt{\sum_j(a_j-b_j)^2}$:</p><p>$d_E(A,B)=\sqrt{(-4)^2+(-1)^2+(0)^2}=\sqrt{17}=4{,}123$</p><p>$d_E(A,C)=\sqrt{(-2)^2+(-2)^2+(-2)^2}=\sqrt{12}=3{,}464$</p><p>$d_E(B,C)=\sqrt{(2)^2+(-1)^2+(-2)^2}=\sqrt{9}=3$</p>` },
      { titulo: "b) Distancias Manhattan", puntos: 2, solucion: String.raw`<p>$d_M=\sum_j|a_j-b_j|$:</p><p>$d_M(A,B)=|-4|+|-1|+|0|=5$</p><p>$d_M(A,C)=|-2|+|-2|+|-2|=6$</p><p>$d_M(B,C)=|2|+|-1|+|-2|=5$</p>` },
      { titulo: "c) Par más parecido y escalamiento", puntos: 1.5, solucion: String.raw`<p>Euclídea: el par más cercano es B–C ($3$). Manhattan: A–B ($5$). No coinciden: la euclídea castiga más las diferencias grandes en una sola variable (las eleva al cuadrado).</p><p>Siempre $d_M\ge d_E$. Si las unidades son muy distintas hay que estandarizar antes (z-score o min–max), o la variable de mayor escala domina la distancia.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "euclídea A–B", js: "dist([1,1,1], [5,2,1])", esperado: 4.123, tol: 0.000500001 },
      { que: "euclídea A–C", js: "dist([1,1,1], [3,3,3])", esperado: 3.464, tol: 0.000500001 },
      { que: "euclídea B–C", js: "dist([5,2,1], [3,3,3])", esperado: 3, tol: 0.000500001 },
      { que: "Manhattan A–B", js: "manhattan([1,1,1], [5,2,1])", esperado: 5, tol: 0.000050001 },
      { que: "Manhattan A–C", js: "manhattan([1,1,1], [3,3,3])", esperado: 6, tol: 0.000050001 },
      { que: "Manhattan B–C", js: "manhattan([5,2,1], [3,3,3])", esperado: 5, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 46–47" }
    ]
  },
  {
    id: "m04-d008",
    modulo: "m04-escalamiento-distancias",
    concepto: "m04-c06",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 48–49" }
    ],
    titulo: "Coseno vs. correlación (dos productos)",
    enunciado: `<p>Dos productos reciben evaluaciones de 4 clientes: $X=(2,4,6,8)$ e $Y=(1,3,2,6)$.</p><ol type="a"><li>Calcula la similitud coseno entre $X$ e $Y$.</li><li>Centra ambos vectores y calcula el coseno de los vectores centrados.</li><li>¿Qué mide cada resultado y por qué difieren?</li></ol>`,
    partes: [
      { titulo: "a) Similitud coseno", puntos: 2, solucion: String.raw`<p>$x\cdot y=2\cdot1+4\cdot3+6\cdot2+8\cdot6=74$; $\lVert x\rVert=\sqrt{120}=10{,}954$; $\lVert y\rVert=\sqrt{50}=7{,}071$.</p><p>$\cos\theta=\dfrac{x\cdot y}{\lVert x\rVert\,\lVert y\rVert}=\dfrac{74}{10{,}954\cdot7{,}071}=0{,}955$.</p>` },
      { titulo: "b) Coseno de los vectores centrados", puntos: 2.5, solucion: String.raw`<p>$\bar x=5$, $\bar y=3$ ⇒ $\tilde x=(-3; -1; 1; 3)$, $\tilde y=(-2; 0; -1; 3)$.</p><p>$\tilde x\cdot\tilde y=14$; $\lVert\tilde x\rVert=4{,}472$; $\lVert\tilde y\rVert=3{,}742$ ⇒ $\dfrac{14}{4{,}472\cdot3{,}742}=0{,}837$.</p>` },
      { titulo: "c) Interpretación", puntos: 1.5, solucion: "<p>El coseno sin centrar ($0{,}955$) mide la similitud <strong>angular</strong> de los vectores originales. El coseno de los centrados ($0{,}837$) es exactamente la <strong>correlación de Pearson</strong> (<code>cor(X, Y)</code>): mide el patrón lineal alrededor de las medias.</p><p>Difieren porque con valores todos positivos los vectores apuntan en direcciones parecidas aunque su patrón lineal sea más débil.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "correlación", js: "cor([2,4,6,8], [1,3,2,6])", esperado: 0.837, tol: 0.000500001 },
      { que: "coseno", r: "cat(sum(c(2, 4, 6, 8)*c(1, 3, 2, 6))/sqrt(sum(c(2, 4, 6, 8)^2)*sum(c(1, 3, 2, 6)^2)))", esperado: 0.955, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 48–49" }
    ]
  },
  {
    id: "m04-d009",
    modulo: "m04-escalamiento-distancias",
    concepto: "m04-c06",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 48–49" }
    ],
    titulo: "Coseno vs. correlación (perfiles de consumo)",
    enunciado: `<p>Consumo de dos hogares en 4 categorías: $X=(3,1,4,2)$ e $Y=(6,3,9,2)$.</p><ol type="a"><li>Calcula la similitud coseno entre $X$ e $Y$.</li><li>Centra ambos vectores y calcula el coseno de los vectores centrados.</li><li>¿Qué mide cada resultado y por qué difieren?</li></ol>`,
    partes: [
      { titulo: "a) Similitud coseno", puntos: 2, solucion: String.raw`<p>$x\cdot y=3\cdot6+1\cdot3+4\cdot9+2\cdot2=61$; $\lVert x\rVert=\sqrt{30}=5{,}477$; $\lVert y\rVert=\sqrt{130}=11{,}402$.</p><p>$\cos\theta=\dfrac{x\cdot y}{\lVert x\rVert\,\lVert y\rVert}=\dfrac{61}{5{,}477\cdot11{,}402}=0{,}977$.</p>` },
      { titulo: "b) Coseno de los vectores centrados", puntos: 2.5, solucion: String.raw`<p>$\bar x=2{,}5$, $\bar y=5$ ⇒ $\tilde x=(0{,}5; -1{,}5; 1{,}5; -0{,}5)$, $\tilde y=(1; -2; 4; -3)$.</p><p>$\tilde x\cdot\tilde y=11$; $\lVert\tilde x\rVert=2{,}236$; $\lVert\tilde y\rVert=5{,}477$ ⇒ $\dfrac{11}{2{,}236\cdot5{,}477}=0{,}898$.</p>` },
      { titulo: "c) Interpretación", puntos: 1.5, solucion: "<p>El coseno sin centrar ($0{,}977$) mide la similitud <strong>angular</strong> de los vectores originales. El coseno de los centrados ($0{,}898$) es exactamente la <strong>correlación de Pearson</strong> (<code>cor(X, Y)</code>): mide el patrón lineal alrededor de las medias.</p><p>Difieren porque con valores todos positivos los vectores apuntan en direcciones parecidas aunque su patrón lineal sea más débil.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "correlación", js: "cor([3,1,4,2], [6,3,9,2])", esperado: 0.898, tol: 0.000500001 },
      { que: "coseno", r: "cat(sum(c(3, 1, 4, 2)*c(6, 3, 9, 2))/sqrt(sum(c(3, 1, 4, 2)^2)*sum(c(6, 3, 9, 2)^2)))", esperado: 0.977, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 48–49" }
    ]
  }
]);
