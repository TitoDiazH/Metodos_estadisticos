/* ============================================================================
   Desarrollo · M01 Covarianza, correlación y regresión simple (P1) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m01-d002",
    modulo: "m01-covarianza-correlacion",
    concepto: "m01-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 9–19" }
    ],
    titulo: "Horas de estudio y nota: covarianza, r y test (a mano)",
    enunciado: String.raw`<p>Se registran las horas de estudio semanales ($x$) y la nota final ($y$) de 5 estudiantes:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><td>Horas ($x$)</td><td>$2$</td><td>$4$</td><td>$5$</td><td>$7$</td><td>$9$</td></tr><tr><td>Nota ($y$)</td><td>$3{,}5$</td><td>$4{,}2$</td><td>$5$</td><td>$5{,}8$</td><td>$6{,}5$</td></tr></tbody></table></div><ol type="a"><li>Calcula las medias y la covarianza muestral.</li><li>Calcula las varianzas y el coeficiente de correlación $r$. Interprétalo.</li><li>Con $\alpha=5\,\%$, contrasta $H_0:\rho=0$ contra $H_1:\rho\neq0$.</li></ol>`,
    partes: [
      { titulo: "a) Medias y tabla de desviaciones", puntos: 1.5, solucion: String.raw`<p>$\bar x=5{,}4$ y $\bar y=5$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_i-\bar x$</th><th>$y_i-\bar y$</th><th>producto</th></tr></thead><tbody><tr><td>$-3{,}4$</td><td>$-1{,}5$</td><td>$5{,}1$</td></tr><tr><td>$-1{,}4$</td><td>$-0{,}8$</td><td>$1{,}12$</td></tr><tr><td>$-0{,}4$</td><td>$0$</td><td>$0$</td></tr><tr><td>$1{,}6$</td><td>$0{,}8$</td><td>$1{,}28$</td></tr><tr><td>$3{,}6$</td><td>$1{,}5$</td><td>$5{,}4$</td></tr></tbody></table></div><p>Suma de productos: $12{,}9$.</p>` },
      { titulo: "a) Covarianza muestral", puntos: 1, solucion: String.raw`<p>$s_{xy}=\dfrac{1}{n-1}\sum(x_i-\bar x)(y_i-\bar y)=\dfrac{12{,}9}{4}=3{,}225$.</p><p>Se divide por $n-1=4$, no por $n$. El signo positivo indica la dirección; la magnitud depende de las unidades.</p>` },
      { titulo: "b) Varianzas y coeficiente r, con interpretación", puntos: 1.5, solucion: String.raw`<p>$s_x^2=\dfrac{\sum(x_i-\bar x)^2}{n-1}=7{,}3$ y $s_y^2=1{,}445$.</p><p>$r=\dfrac{s_{xy}}{\sqrt{s_x^2\,s_y^2}}=\dfrac{3{,}225}{\sqrt{7{,}3\cdot1{,}445}}=0{,}993$.</p><p>Relación lineal fuerte y positiva (cuando una sube, la otra tiende a subir). $r$ no tiene unidades y no prueba causalidad.</p>` },
      { titulo: "c) Estadístico t, valor crítico y decisión", puntos: 2, solucion: String.raw`<p>$t=r\sqrt{\dfrac{n-2}{1-r^2}}=0{,}993\sqrt{\dfrac{3}{1-0{,}986}}=14{,}526$ con $n-2=3$ gl.</p><p>Crítico bilateral: $t_{0{,}975;3}=3{,}182$. Como $|14{,}526|>3{,}182$ (p-valor $=0{,}0007$), se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia de correlación lineal entre las horas de estudio y la nota.</p><p>En R: <code>cor.test(x, y)</code> entrega este mismo $t$, los gl y el p-valor.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "covarianza", js: "cov([2,4,5,7,9], [3.5,4.2,5,5.8,6.5])", esperado: 3.225, tol: 0.000050001 },
      { que: "r", js: "cor([2,4,5,7,9], [3.5,4.2,5,5.8,6.5])", esperado: 0.993, tol: 0.000050001 },
      { que: "t de cor.test", r: "cat(cor.test(c(2, 4, 5, 7, 9), c(3.5, 4.2, 5, 5.8, 6.5))$statistic)", esperado: 14.526, tol: 0.000500001 },
      { que: "p-valor de cor.test", r: "cat(cor.test(c(2, 4, 5, 7, 9), c(3.5, 4.2, 5, 5.8, 6.5))$p.value)", esperado: 0.0007, tol: 0.000050001 },
      { que: "t crítico", r: "cat(qt(0.975, 3))", esperado: 3.182, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 9–19" }
    ]
  },
  {
    id: "m01-d003",
    modulo: "m01-covarianza-correlacion",
    concepto: "m01-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 9–19" }
    ],
    titulo: "Precio y unidades vendidas: correlación negativa",
    enunciado: String.raw`<p>Una tienda prueba 6 precios (en miles de pesos, $x$) y anota las unidades vendidas en la semana ($y$):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody><tr><td>Precio ($x$)</td><td>$10$</td><td>$12$</td><td>$14$</td><td>$16$</td><td>$18$</td><td>$20$</td></tr><tr><td>Unidades ($y$)</td><td>$48$</td><td>$45$</td><td>$40$</td><td>$41$</td><td>$33$</td><td>$30$</td></tr></tbody></table></div><ol type="a"><li>Calcula las medias y la covarianza muestral.</li><li>Calcula las varianzas y el coeficiente de correlación $r$. Interprétalo.</li><li>Con $\alpha=5\,\%$, contrasta $H_0:\rho=0$ contra $H_1:\rho\neq0$.</li></ol>`,
    partes: [
      { titulo: "a) Medias y tabla de desviaciones", puntos: 1.5, solucion: String.raw`<p>$\bar x=15$ y $\bar y=39{,}5$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_i-\bar x$</th><th>$y_i-\bar y$</th><th>producto</th></tr></thead><tbody><tr><td>$-5$</td><td>$8{,}5$</td><td>$-42{,}5$</td></tr><tr><td>$-3$</td><td>$5{,}5$</td><td>$-16{,}5$</td></tr><tr><td>$-1$</td><td>$0{,}5$</td><td>$-0{,}5$</td></tr><tr><td>$1$</td><td>$1{,}5$</td><td>$1{,}5$</td></tr><tr><td>$3$</td><td>$-6{,}5$</td><td>$-19{,}5$</td></tr><tr><td>$5$</td><td>$-9{,}5$</td><td>$-47{,}5$</td></tr></tbody></table></div><p>Suma de productos: $-125$.</p>` },
      { titulo: "a) Covarianza muestral", puntos: 1, solucion: String.raw`<p>$s_{xy}=\dfrac{1}{n-1}\sum(x_i-\bar x)(y_i-\bar y)=\dfrac{-125}{5}=-25$.</p><p>Se divide por $n-1=5$, no por $n$. El signo negativo indica la dirección; la magnitud depende de las unidades.</p>` },
      { titulo: "b) Varianzas y coeficiente r, con interpretación", puntos: 1.5, solucion: String.raw`<p>$s_x^2=\dfrac{\sum(x_i-\bar x)^2}{n-1}=14$ y $s_y^2=47{,}5$.</p><p>$r=\dfrac{s_{xy}}{\sqrt{s_x^2\,s_y^2}}=\dfrac{-25}{\sqrt{14\cdot47{,}5}}=-0{,}9695$.</p><p>Relación lineal fuerte y negativa (cuando una sube, la otra tiende a bajar). $r$ no tiene unidades y no prueba causalidad.</p>` },
      { titulo: "c) Estadístico t, valor crítico y decisión", puntos: 2, solucion: String.raw`<p>$t=r\sqrt{\dfrac{n-2}{1-r^2}}=-0{,}9695\sqrt{\dfrac{4}{1-0{,}9398}}=-7{,}906$ con $n-2=4$ gl.</p><p>Crítico bilateral: $t_{0{,}975;4}=2{,}776$. Como $|-7{,}906|>2{,}776$ (p-valor $=0{,}0014$), se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia de que el precio y las unidades vendidas están correlacionados linealmente (a mayor precio, menos ventas).</p><p>En R: <code>cor.test(x, y)</code> entrega este mismo $t$, los gl y el p-valor.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "covarianza", js: "cov([10,12,14,16,18,20], [48,45,40,41,33,30])", esperado: -25, tol: 0.000050001 },
      { que: "r", js: "cor([10,12,14,16,18,20], [48,45,40,41,33,30])", esperado: -0.9695, tol: 0.000050001 },
      { que: "t de cor.test", r: "cat(cor.test(c(10, 12, 14, 16, 18, 20), c(48, 45, 40, 41, 33, 30))$statistic)", esperado: -7.906, tol: 0.000500001 },
      { que: "p-valor de cor.test", r: "cat(cor.test(c(10, 12, 14, 16, 18, 20), c(48, 45, 40, 41, 33, 30))$p.value)", esperado: 0.0014, tol: 0.000050001 },
      { que: "t crítico", r: "cat(qt(0.975, 4))", esperado: 2.776, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 9–19" }
    ]
  },
  {
    id: "m01-d004",
    modulo: "m01-covarianza-correlacion",
    concepto: "m01-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 9–19" }
    ],
    titulo: "Antigüedad y errores: ¿es significativa una correlación débil?",
    enunciado: String.raw`<p>Para 6 operarios se registran los años de antigüedad ($x$) y el número de errores del mes ($y$):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody><tr><td>Antigüedad ($x$)</td><td>$1$</td><td>$2$</td><td>$3$</td><td>$4$</td><td>$5$</td><td>$6$</td></tr><tr><td>Errores ($y$)</td><td>$5$</td><td>$3$</td><td>$6$</td><td>$2$</td><td>$7$</td><td>$4$</td></tr></tbody></table></div><ol type="a"><li>Calcula las medias y la covarianza muestral.</li><li>Calcula las varianzas y el coeficiente de correlación $r$. Interprétalo.</li><li>Con $\alpha=5\,\%$, contrasta $H_0:\rho=0$ contra $H_1:\rho\neq0$.</li></ol>`,
    partes: [
      { titulo: "a) Medias y tabla de desviaciones", puntos: 1.5, solucion: String.raw`<p>$\bar x=3{,}5$ y $\bar y=4{,}5$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_i-\bar x$</th><th>$y_i-\bar y$</th><th>producto</th></tr></thead><tbody><tr><td>$-2{,}5$</td><td>$0{,}5$</td><td>$-1{,}25$</td></tr><tr><td>$-1{,}5$</td><td>$-1{,}5$</td><td>$2{,}25$</td></tr><tr><td>$-0{,}5$</td><td>$1{,}5$</td><td>$-0{,}75$</td></tr><tr><td>$0{,}5$</td><td>$-2{,}5$</td><td>$-1{,}25$</td></tr><tr><td>$1{,}5$</td><td>$2{,}5$</td><td>$3{,}75$</td></tr><tr><td>$2{,}5$</td><td>$-0{,}5$</td><td>$-1{,}25$</td></tr></tbody></table></div><p>Suma de productos: $1{,}5$.</p>` },
      { titulo: "a) Covarianza muestral", puntos: 1, solucion: String.raw`<p>$s_{xy}=\dfrac{1}{n-1}\sum(x_i-\bar x)(y_i-\bar y)=\dfrac{1{,}5}{5}=0{,}3$.</p><p>Se divide por $n-1=5$, no por $n$. El signo positivo indica la dirección; la magnitud depende de las unidades.</p>` },
      { titulo: "b) Varianzas y coeficiente r, con interpretación", puntos: 1.5, solucion: String.raw`<p>$s_x^2=\dfrac{\sum(x_i-\bar x)^2}{n-1}=3{,}5$ y $s_y^2=3{,}5$.</p><p>$r=\dfrac{s_{xy}}{\sqrt{s_x^2\,s_y^2}}=\dfrac{0{,}3}{\sqrt{3{,}5\cdot3{,}5}}=0{,}0857$.</p><p>Relación lineal débil y positiva (cuando una sube, la otra tiende a subir). $r$ no tiene unidades y no prueba causalidad.</p>` },
      { titulo: "c) Estadístico t, valor crítico y decisión", puntos: 2, solucion: String.raw`<p>$t=r\sqrt{\dfrac{n-2}{1-r^2}}=0{,}0857\sqrt{\dfrac{4}{1-0{,}0073}}=0{,}172$ con $n-2=4$ gl.</p><p>Crítico bilateral: $t_{0{,}975;4}=2{,}776$. Como $|0{,}172|<2{,}776$ (p-valor $=0{,}8717$), <strong>no se rechaza</strong> $H_0$.</p><p>Con estos datos no hay evidencia de correlación lineal entre antigüedad y errores: un $r$ distinto de cero en la muestra no basta, y menos con $n=6$.</p><p>En R: <code>cor.test(x, y)</code> entrega este mismo $t$, los gl y el p-valor.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "covarianza", js: "cov([1,2,3,4,5,6], [5,3,6,2,7,4])", esperado: 0.3, tol: 0.000050001 },
      { que: "r", js: "cor([1,2,3,4,5,6], [5,3,6,2,7,4])", esperado: 0.0857, tol: 0.000050001 },
      { que: "t de cor.test", r: "cat(cor.test(c(1, 2, 3, 4, 5, 6), c(5, 3, 6, 2, 7, 4))$statistic)", esperado: 0.172, tol: 0.000500001 },
      { que: "p-valor de cor.test", r: "cat(cor.test(c(1, 2, 3, 4, 5, 6), c(5, 3, 6, 2, 7, 4))$p.value)", esperado: 0.8717, tol: 0.000050001 },
      { que: "t crítico", r: "cat(qt(0.975, 4))", esperado: 2.776, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 9–19" }
    ]
  },
  {
    id: "m01-d005",
    modulo: "m01-covarianza-correlacion",
    concepto: "m01-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 9–19" }
    ],
    titulo: "Publicidad y ventas con α = 1 %",
    enunciado: String.raw`<p>Una empresa registra durante 7 meses el gasto en publicidad (millones, $x$) y las ventas (millones, $y$):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></thead><tbody><tr><td>Publicidad ($x$)</td><td>$1$</td><td>$2$</td><td>$3$</td><td>$4$</td><td>$5$</td><td>$6$</td><td>$7$</td></tr><tr><td>Ventas ($y$)</td><td>$12$</td><td>$15$</td><td>$14$</td><td>$19$</td><td>$21$</td><td>$20$</td><td>$26$</td></tr></tbody></table></div><ol type="a"><li>Calcula las medias y la covarianza muestral.</li><li>Calcula las varianzas y el coeficiente de correlación $r$. Interprétalo.</li><li>Con $\alpha=1\,\%$, contrasta $H_0:\rho=0$ contra $H_1:\rho\neq0$.</li></ol>`,
    partes: [
      { titulo: "a) Medias y tabla de desviaciones", puntos: 1.5, solucion: String.raw`<p>$\bar x=4$ y $\bar y=18{,}143$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_i-\bar x$</th><th>$y_i-\bar y$</th><th>producto</th></tr></thead><tbody><tr><td>$-3$</td><td>$-6{,}143$</td><td>$18{,}429$</td></tr><tr><td>$-2$</td><td>$-3{,}143$</td><td>$6{,}286$</td></tr><tr><td>$-1$</td><td>$-4{,}143$</td><td>$4{,}143$</td></tr><tr><td>$0$</td><td>$0{,}857$</td><td>$0$</td></tr><tr><td>$1$</td><td>$2{,}857$</td><td>$2{,}857$</td></tr><tr><td>$2$</td><td>$1{,}857$</td><td>$3{,}714$</td></tr><tr><td>$3$</td><td>$7{,}857$</td><td>$23{,}571$</td></tr></tbody></table></div><p>Suma de productos: $59$.</p>` },
      { titulo: "a) Covarianza muestral", puntos: 1, solucion: String.raw`<p>$s_{xy}=\dfrac{1}{n-1}\sum(x_i-\bar x)(y_i-\bar y)=\dfrac{59}{6}=9{,}8333$.</p><p>Se divide por $n-1=6$, no por $n$. El signo positivo indica la dirección; la magnitud depende de las unidades.</p>` },
      { titulo: "b) Varianzas y coeficiente r, con interpretación", puntos: 1.5, solucion: String.raw`<p>$s_x^2=\dfrac{\sum(x_i-\bar x)^2}{n-1}=4{,}6667$ y $s_y^2=23{,}1429$.</p><p>$r=\dfrac{s_{xy}}{\sqrt{s_x^2\,s_y^2}}=\dfrac{9{,}8333}{\sqrt{4{,}6667\cdot23{,}1429}}=0{,}9462$.</p><p>Relación lineal fuerte y positiva (cuando una sube, la otra tiende a subir). $r$ no tiene unidades y no prueba causalidad.</p>` },
      { titulo: "c) Estadístico t, valor crítico y decisión", puntos: 2, solucion: String.raw`<p>$t=r\sqrt{\dfrac{n-2}{1-r^2}}=0{,}9462\sqrt{\dfrac{5}{1-0{,}8953}}=6{,}539$ con $n-2=5$ gl.</p><p>Crítico bilateral: $t_{0{,}995;5}=4{,}032$. Como $|6{,}539|>4{,}032$ (p-valor $=0{,}0013$), se <strong>rechaza</strong> $H_0$.</p><p>Al $1\,\%$ hay evidencia de correlación lineal entre publicidad y ventas.</p><p>En R: <code>cor.test(x, y)</code> entrega este mismo $t$, los gl y el p-valor.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "covarianza", js: "cov([1,2,3,4,5,6,7], [12,15,14,19,21,20,26])", esperado: 9.8333, tol: 0.000050001 },
      { que: "r", js: "cor([1,2,3,4,5,6,7], [12,15,14,19,21,20,26])", esperado: 0.9462, tol: 0.000050001 },
      { que: "t de cor.test", r: "cat(cor.test(c(1, 2, 3, 4, 5, 6, 7), c(12, 15, 14, 19, 21, 20, 26))$statistic)", esperado: 6.539, tol: 0.000500001 },
      { que: "p-valor de cor.test", r: "cat(cor.test(c(1, 2, 3, 4, 5, 6, 7), c(12, 15, 14, 19, 21, 20, 26))$p.value)", esperado: 0.0013, tol: 0.000050001 },
      { que: "t crítico", r: "cat(qt(0.995, 5))", esperado: 4.032, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 9–19" }
    ]
  }
]);
