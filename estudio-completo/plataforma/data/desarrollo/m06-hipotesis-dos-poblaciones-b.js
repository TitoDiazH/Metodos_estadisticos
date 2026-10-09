/* ============================================================================
   Desarrollo · M06 Pruebas de hipótesis: dos poblaciones (P1) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m06-d002",
    modulo: "m06-hipotesis-dos-poblaciones",
    concepto: "m06-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 22–25" },
      { id: "AY2-E", loc: "P4" }
    ],
    titulo: "¿Varianzas iguales? Prueba F bilateral",
    enunciado: String.raw`<p>Se comparan los tiempos de dos líneas de producción. Línea 1: $n_1=16$, $s_1^2=42{,}3$. Línea 2: $n_2=21$, $s_2^2=18{,}9$. ¿Difieren las varianzas? Usa $\alpha=5\,\%$ y supón poblaciones normales.</p><ol type="a"><li>Plantea las hipótesis.</li><li>Calcula el estadístico $F$ y sus grados de libertad.</li><li>Indica la región de rechazo, decide y concluye. ¿Qué prueba de medias usarías después?</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis", puntos: 1.5, solucion: String.raw`<p>$H_0:\sigma_1^2=\sigma_2^2$ contra $H_1:\sigma_1^2\neq\sigma_2^2$.</p><p>Equivale a contrastar el cociente $\sigma_1^2/\sigma_2^2$ contra $1$.</p>` },
      { titulo: "b) Estadístico F y grados de libertad", puntos: 2, solucion: String.raw`<p>$F=\dfrac{s_1^2}{s_2^2}=\dfrac{42{,}3}{18{,}9}=2{,}238$, con gl $(n_1-1,\ n_2-1)=(15,\ 20)$.</p><p>Se usan las <strong>varianzas</strong>: si dan desviaciones estándar hay que elevarlas al cuadrado.</p>` },
      { titulo: "c) Región de rechazo, decisión y conclusión", puntos: 2.5, solucion: String.raw`<p>Bilateral: se rechaza si $F\lt F_{0{,}025;15,20}=0{,}363$ o $F>F_{0{,}975;15,20}=2{,}573$ (<code>qf(c(0.025, 0.975), 15, 20)</code>).</p><p>$F=2{,}238$; p-valor $=0{,}0936$ ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>No hay evidencia de que las varianzas de las dos líneas difieran. Aun así, la recomendación de la clase es usar <strong>Welch</strong> por defecto; el pooled solo con certeza o fuerte evidencia de varianzas iguales.</p><p>En R: <code>var.test(A, B)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F", js: "42.3/18.9", esperado: 2.238, tol: 0.000500001 },
      { que: "crítico superior", r: "cat(qf(0.975, 15, 20))", esperado: 2.573, tol: 0.000500001 },
      { que: "crítico inferior", r: "cat(qf(0.025, 15, 20))", esperado: 0.363, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 22–25" },
      { id: "AY2-E", loc: "P4" }
    ]
  },
  {
    id: "m06-d003",
    modulo: "m06-hipotesis-dos-poblaciones",
    concepto: "m06-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 22–25" },
      { id: "AY2-E", loc: "P4" }
    ],
    titulo: "¿Es más variable el proveedor A? Prueba F de cola derecha",
    enunciado: String.raw`<p>Proveedor A: $n_1=13$ entregas con $s_1=5{,}8$ días. Proveedor B: $n_2=11$ entregas con $s_2=3{,}1$ días. ¿Hay evidencia de que A es más variable que B? Usa $\alpha=5\,\%$ y supón poblaciones normales.</p><ol type="a"><li>Plantea las hipótesis.</li><li>Calcula el estadístico $F$ y sus grados de libertad.</li><li>Indica la región de rechazo, decide y concluye. ¿Qué prueba de medias usarías después?</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis", puntos: 1.5, solucion: String.raw`<p>$H_0:\sigma_1^2\le\sigma_2^2$ contra $H_1:\sigma_1^2>\sigma_2^2$.</p><p>Equivale a contrastar el cociente $\sigma_1^2/\sigma_2^2$ contra $1$.</p>` },
      { titulo: "b) Estadístico F y grados de libertad", puntos: 2, solucion: String.raw`<p>$F=\dfrac{s_1^2}{s_2^2}=\dfrac{33{,}64}{9{,}61}=3{,}501$, con gl $(n_1-1,\ n_2-1)=(12,\ 10)$.</p><p>Se dan desviaciones: $s_1^2=5{,}8^2=33{,}64$ y $s_2^2=3{,}1^2=9{,}61$.</p>` },
      { titulo: "c) Región de rechazo, decisión y conclusión", puntos: 2.5, solucion: "<p>Cola derecha (la varianza mayor va en el numerador): se rechaza si $F>F_{0{,}95;12,10}=2{,}913$.</p><p>$F=3{,}501$; p-valor $=0{,}028$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia de que los tiempos del proveedor A son más variables que los de B. Para comparar las medias corresponde <strong>Welch</strong> (<code>var.equal = FALSE</code>).</p><p>En R: <code>var.test(A, B)</code>.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F", js: "33.64/9.61", esperado: 3.501, tol: 0.000500001 },
      { que: "crítico", r: "cat(qf(0.95, 12, 10))", esperado: 2.913, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 22–25" },
      { id: "AY2-E", loc: "P4" }
    ]
  },
  {
    id: "m06-d004",
    modulo: "m06-hipotesis-dos-poblaciones",
    concepto: "m06-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 22–25" },
      { id: "AY2-E", loc: "P4" }
    ],
    titulo: "Dos máquinas llenadoras: prueba F con α = 10 %",
    enunciado: String.raw`<p>Máquina 1: $n_1=10$, $s_1^2=2{,}9$. Máquina 2: $n_2=10$, $s_2^2=1{,}6$. ¿Difieren las varianzas del llenado? Usa $\alpha=10\,\%$ y supón poblaciones normales.</p><ol type="a"><li>Plantea las hipótesis.</li><li>Calcula el estadístico $F$ y sus grados de libertad.</li><li>Indica la región de rechazo, decide y concluye. ¿Qué prueba de medias usarías después?</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis", puntos: 1.5, solucion: String.raw`<p>$H_0:\sigma_1^2=\sigma_2^2$ contra $H_1:\sigma_1^2\neq\sigma_2^2$.</p><p>Equivale a contrastar el cociente $\sigma_1^2/\sigma_2^2$ contra $1$.</p>` },
      { titulo: "b) Estadístico F y grados de libertad", puntos: 2, solucion: String.raw`<p>$F=\dfrac{s_1^2}{s_2^2}=\dfrac{2{,}9}{1{,}6}=1{,}813$, con gl $(n_1-1,\ n_2-1)=(9,\ 9)$.</p><p>Se usan las <strong>varianzas</strong>: si dan desviaciones estándar hay que elevarlas al cuadrado.</p>` },
      { titulo: "c) Región de rechazo, decisión y conclusión", puntos: 2.5, solucion: String.raw`<p>Bilateral: se rechaza si $F\lt F_{0{,}05;9,9}=0{,}315$ o $F>F_{0{,}95;9,9}=3{,}179$ (<code>qf(c(0.05, 0.95), 9, 9)</code>).</p><p>$F=1{,}813$; p-valor $=0{,}3889$ ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>No hay evidencia de que las varianzas de las dos máquinas difieran: un cociente de $1{,}8$ no es raro con muestras de tamaño 10. Aun así, la recomendación de la clase es usar <strong>Welch</strong> por defecto; el pooled solo con certeza o fuerte evidencia de varianzas iguales.</p><p>En R: <code>var.test(A, B)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F", js: "2.9/1.6", esperado: 1.813, tol: 0.000500001 },
      { que: "crítico superior", r: "cat(qf(0.95, 9, 9))", esperado: 3.179, tol: 0.000500001 },
      { que: "crítico inferior", r: "cat(qf(0.05, 9, 9))", esperado: 0.315, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 22–25" },
      { id: "AY2-E", loc: "P4" }
    ]
  },
  {
    id: "m06-d005",
    modulo: "m06-hipotesis-dos-poblaciones",
    concepto: "m06-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 26–27 y 32" }
    ],
    titulo: "Diferencia de medias con varianzas distintas (Welch)",
    enunciado: String.raw`<p>Se compara el rendimiento (km/l) de dos tipos de combustible:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Grupo</th><th>$n$</th><th>$\bar x$</th><th>$s$</th></tr></thead><tbody><tr><td>1: estándar</td><td>$12$</td><td>$24{,}1$</td><td>$2{,}2$</td></tr><tr><td>2: aditivado</td><td>$15$</td><td>$27{,}3$</td><td>$4{,}9$</td></tr></tbody></table></div><p>¿Rinde más, en promedio, el combustible aditivado? Usa $\alpha=5\,\%$ y <strong>no</strong> supongas varianzas iguales.</p><ol type="a"><li>Plantea las hipótesis sobre $\mu_2-\mu_1$.</li><li>Calcula el estadístico $t$ de Welch.</li><li>Calcula los grados de libertad y el valor crítico.</li><li>Decide y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis", puntos: 1, solucion: String.raw`<p>$H_0:\mu_2-\mu_1\le0$ contra $H_1:\mu_2-\mu_1>0$ (cola derecha). Lo que se quiere demostrar es $\mu_2>\mu_1$.</p>` },
      { titulo: "b) Estadístico t de Welch", puntos: 2.5, solucion: String.raw`<p>$t=\dfrac{(\bar x_2-\bar x_1)-D_0}{\sqrt{s_1^2/n_1+s_2^2/n_2}}=\dfrac{(27{,}3-24{,}1)-0}{\sqrt{2{,}2^2/12+4{,}9^2/15}}=\dfrac{3{,}2}{1{,}4156}=2{,}26$.</p>` },
      { titulo: "c) Grados de libertad y valor crítico", puntos: 1.5, solucion: String.raw`<p>gl de Welch $=\dfrac{(s_1^2/n_1+s_2^2/n_2)^2}{\frac{(s_1^2/n_1)^2}{n_1-1}+\frac{(s_2^2/n_2)^2}{n_2-1}}=\dfrac{(0{,}4033+1{,}6007)^2}{\frac{0{,}4033^2}{11}+\frac{1{,}6007^2}{14}}=20{,}3\approx20$.</p><p>Prueba cola derecha: se rechaza si $t>t_{0{,}95;20}=1{,}725$.</p>` },
      { titulo: "d) Decisión y conclusión", puntos: 1, solucion: String.raw`<p>$t=2{,}26$; p-valor $\approx0{,}0175$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia de que el combustible aditivado rinde más en promedio.</p><p>En R: <code>t.test(A, B, var.equal = FALSE)</code> (R usa los gl sin redondear).</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "t", js: "(27.3 - 24.1 - 0)/1.4156270695349114", esperado: 2.26, tol: 0.000500001 },
      { que: "crítico", r: "cat(qt(0.95, 20))", esperado: 1.725, tol: 0.000500001 },
      { que: "gl de Welch", js: "(0.4033333333333334+1.600666666666667)**2/((0.4033333333333334)**2/11+(1.600666666666667)**2/14)", esperado: 20.3, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C2", loc: "slides 26–27 y 32" }
    ]
  },
  {
    id: "m06-d006",
    modulo: "m06-hipotesis-dos-poblaciones",
    concepto: "m06-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 26–27 y 32" }
    ],
    titulo: "Welch con diferencia hipotética distinta de cero",
    enunciado: String.raw`<p>Sueldos (miles de pesos) antes y después de una negociación, en dos muestras independientes de trabajadores:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Grupo</th><th>$n$</th><th>$\bar x$</th><th>$s$</th></tr></thead><tbody><tr><td>1: antes</td><td>$14$</td><td>$820$</td><td>$60$</td></tr><tr><td>2: después</td><td>$10$</td><td>$965$</td><td>$110$</td></tr></tbody></table></div><p>¿Hay evidencia de que el sueldo medio subió <strong>más de</strong> $100$ mil pesos? Usa $\alpha=5\,\%$ y <strong>no</strong> supongas varianzas iguales.</p><ol type="a"><li>Plantea las hipótesis sobre $\mu_2-\mu_1$.</li><li>Calcula el estadístico $t$ de Welch.</li><li>Calcula los grados de libertad y el valor crítico.</li><li>Decide y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis", puntos: 1, solucion: String.raw`<p>$H_0:\mu_2-\mu_1\le100$ contra $H_1:\mu_2-\mu_1>100$ (cola derecha). $D_0=100$: se contrasta si el aumento supera 100.</p>` },
      { titulo: "b) Estadístico t de Welch", puntos: 2.5, solucion: String.raw`<p>$t=\dfrac{(\bar x_2-\bar x_1)-D_0}{\sqrt{s_1^2/n_1+s_2^2/n_2}}=\dfrac{(965-820)-100}{\sqrt{60^2/14+110^2/10}}=\dfrac{45}{38{,}3033}=1{,}175$.</p>` },
      { titulo: "c) Grados de libertad y valor crítico", puntos: 1.5, solucion: String.raw`<p>gl de Welch $=\dfrac{(s_1^2/n_1+s_2^2/n_2)^2}{\frac{(s_1^2/n_1)^2}{n_1-1}+\frac{(s_2^2/n_2)^2}{n_2-1}}=\dfrac{(257{,}1429+1210)^2}{\frac{257{,}1429^2}{13}+\frac{1210^2}{9}}=12{,}83\approx13$.</p><p>Prueba cola derecha: se rechaza si $t>t_{0{,}95;13}=1{,}771$.</p>` },
      { titulo: "d) Decisión y conclusión", puntos: 1, solucion: String.raw`<p>$t=1{,}175$; p-valor $\approx0{,}1306$ ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>No se puede afirmar que el aumento medio supere los $100$ mil pesos (aunque la diferencia muestral es $145$).</p><p>En R: <code>t.test(A, B, var.equal = FALSE)</code> (R usa los gl sin redondear).</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "t", js: "(965 - 820 - 100)/38.303300864845276", esperado: 1.175, tol: 0.000500001 },
      { que: "crítico", r: "cat(qt(0.95, 13))", esperado: 1.771, tol: 0.000500001 },
      { que: "gl de Welch", js: "(257.14285714285717+1210)**2/((257.14285714285717)**2/13+(1210)**2/9)", esperado: 12.83, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C2", loc: "slides 26–27 y 32" }
    ]
  },
  {
    id: "m06-d007",
    modulo: "m06-hipotesis-dos-poblaciones",
    concepto: "m06-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 26–27 y 32" }
    ],
    titulo: "Welch bilateral: dos turnos",
    enunciado: String.raw`<p>Unidades producidas por hora en dos turnos:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Grupo</th><th>$n$</th><th>$\bar x$</th><th>$s$</th></tr></thead><tbody><tr><td>1: turno día</td><td>$9$</td><td>$51{,}2$</td><td>$3{,}1$</td></tr><tr><td>2: turno noche</td><td>$16$</td><td>$46{,}8$</td><td>$6{,}4$</td></tr></tbody></table></div><p>¿Difiere la producción media entre turnos? Usa $\alpha=5\,\%$ y <strong>no</strong> supongas varianzas iguales.</p><ol type="a"><li>Plantea las hipótesis sobre $\mu_2-\mu_1$.</li><li>Calcula el estadístico $t$ de Welch.</li><li>Calcula los grados de libertad y el valor crítico.</li><li>Decide y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis", puntos: 1, solucion: String.raw`<p>$H_0:\mu_2-\mu_1=0$ contra $H_1:\mu_2-\mu_1\neq0$ (bilateral (dos colas)). «Difiere» ⇒ dos colas.</p>` },
      { titulo: "b) Estadístico t de Welch", puntos: 2.5, solucion: String.raw`<p>$t=\dfrac{(\bar x_2-\bar x_1)-D_0}{\sqrt{s_1^2/n_1+s_2^2/n_2}}=\dfrac{(46{,}8-51{,}2)-0}{\sqrt{3{,}1^2/9+6{,}4^2/16}}=\dfrac{-4{,}4}{1{,}9047}=-2{,}31$.</p>` },
      { titulo: "c) Grados de libertad y valor crítico", puntos: 1.5, solucion: String.raw`<p>gl de Welch $=\dfrac{(s_1^2/n_1+s_2^2/n_2)^2}{\frac{(s_1^2/n_1)^2}{n_1-1}+\frac{(s_2^2/n_2)^2}{n_2-1}}=\dfrac{(1{,}0678+2{,}56)^2}{\frac{1{,}0678^2}{8}+\frac{2{,}56^2}{15}}=22{,}71\approx23$.</p><p>Prueba bilateral (dos colas): se rechaza si $|t|>t_{0{,}975;23}=2{,}069$.</p>` },
      { titulo: "d) Decisión y conclusión", puntos: 1, solucion: String.raw`<p>$t=-2{,}31$; p-valor $\approx0{,}0302$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia de que la producción media difiere entre turnos (es menor de noche).</p><p>En R: <code>t.test(A, B, var.equal = FALSE)</code> (R usa los gl sin redondear).</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "t", js: "(46.8 - 51.2 - 0)/1.904672616954887", esperado: -2.31, tol: 0.000500001 },
      { que: "crítico", r: "cat(qt(0.975, 23))", esperado: 2.069, tol: 0.000500001 },
      { que: "gl de Welch", js: "(1.067777777777778+2.5600000000000005)**2/((1.067777777777778)**2/8+(2.5600000000000005)**2/15)", esperado: 22.71, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C2", loc: "slides 26–27 y 32" }
    ]
  },
  {
    id: "m06-d008",
    modulo: "m06-hipotesis-dos-poblaciones",
    concepto: "m06-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 28–29" }
    ],
    titulo: "Diferencia de medias con varianzas iguales (pooled)",
    enunciado: String.raw`<p>Puntajes de dos secciones de un curso:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Grupo</th><th>$n$</th><th>$\bar x$</th><th>$s$</th></tr></thead><tbody><tr><td>1: sección A</td><td>$10$</td><td>$72{,}4$</td><td>$5{,}1$</td></tr><tr><td>2: sección B</td><td>$12$</td><td>$77{,}9$</td><td>$4{,}6$</td></tr></tbody></table></div><p>¿Difieren los puntajes medios? Usa $\alpha=5\,\%$ y supón varianzas poblacionales <strong>iguales</strong>.</p><ol type="a"><li>Plantea las hipótesis sobre $\mu_2-\mu_1$.</li><li>Calcula la varianza combinada $S_p^2$ y el estadístico $t$.</li><li>Calcula los grados de libertad y el valor crítico.</li><li>Decide y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis", puntos: 1, solucion: String.raw`<p>$H_0:\mu_2-\mu_1=0$ contra $H_1:\mu_2-\mu_1\neq0$ (bilateral (dos colas)). «Difieren» ⇒ dos colas.</p>` },
      { titulo: "b) Varianza combinada y estadístico t", puntos: 2.5, solucion: String.raw`<p>$S_p^2=\dfrac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}=\dfrac{9\cdot5{,}1^2+11\cdot4{,}6^2}{20}=23{,}3425$.</p><p>$t=\dfrac{(\bar x_2-\bar x_1)-D_0}{\sqrt{S_p^2\left(\frac1{n_1}+\frac1{n_2}\right)}}=\dfrac{(77{,}9-72{,}4)-0}{\sqrt{23{,}3425\left(\frac1{10}+\frac1{12}\right)}}=\dfrac{5{,}5}{2{,}0687}=2{,}659$.</p>` },
      { titulo: "c) Grados de libertad y valor crítico", puntos: 1.5, solucion: "<p>gl $=n_1+n_2-2=20$.</p><p>Prueba bilateral (dos colas): se rechaza si $|t|>t_{0{,}975;20}=2{,}086$.</p>" },
      { titulo: "d) Decisión y conclusión", puntos: 1, solucion: String.raw`<p>$t=2{,}659$; p-valor $\approx0{,}0151$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia de que los puntajes medios de las secciones difieren.</p><p>En R: <code>t.test(A, B, var.equal = TRUE)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "t", js: "(77.9 - 72.4 - 0)/2.068685170182581", esperado: 2.659, tol: 0.000500001 },
      { que: "crítico", r: "cat(qt(0.975, 20))", esperado: 2.086, tol: 0.000500001 },
      { que: "Sp²", js: "((10-1)*5.1**2+(12-1)*4.6**2)/(10+12-2)", esperado: 23.3425, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 28–29" }
    ]
  },
  {
    id: "m06-d009",
    modulo: "m06-hipotesis-dos-poblaciones",
    concepto: "m06-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 28–29" }
    ],
    titulo: "Pooled de cola izquierda: ¿reduce el tiempo el método nuevo?",
    enunciado: String.raw`<p>Tiempo de armado (minutos) con dos métodos, en muestras independientes:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Grupo</th><th>$n$</th><th>$\bar x$</th><th>$s$</th></tr></thead><tbody><tr><td>1: método actual</td><td>$8$</td><td>$34{,}5$</td><td>$3{,}9$</td></tr><tr><td>2: método nuevo</td><td>$8$</td><td>$31{,}8$</td><td>$3{,}3$</td></tr></tbody></table></div><p>¿Hay evidencia de que el método nuevo toma menos tiempo en promedio? Usa $\alpha=5\,\%$ y supón varianzas poblacionales <strong>iguales</strong>.</p><ol type="a"><li>Plantea las hipótesis sobre $\mu_2-\mu_1$.</li><li>Calcula la varianza combinada $S_p^2$ y el estadístico $t$.</li><li>Calcula los grados de libertad y el valor crítico.</li><li>Decide y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis", puntos: 1, solucion: String.raw`<p>$H_0:\mu_2-\mu_1\ge0$ contra $H_1:\mu_2-\mu_1<0$ (cola izquierda). Menos tiempo con el nuevo significa $\mu_2-\mu_1<0$.</p>` },
      { titulo: "b) Varianza combinada y estadístico t", puntos: 2.5, solucion: String.raw`<p>$S_p^2=\dfrac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}=\dfrac{7\cdot3{,}9^2+7\cdot3{,}3^2}{14}=13{,}05$.</p><p>$t=\dfrac{(\bar x_2-\bar x_1)-D_0}{\sqrt{S_p^2\left(\frac1{n_1}+\frac1{n_2}\right)}}=\dfrac{(31{,}8-34{,}5)-0}{\sqrt{13{,}05\left(\frac1{8}+\frac1{8}\right)}}=\dfrac{-2{,}7}{1{,}8062}=-1{,}495$.</p>` },
      { titulo: "c) Grados de libertad y valor crítico", puntos: 1.5, solucion: "<p>gl $=n_1+n_2-2=14$.</p><p>Prueba cola izquierda: se rechaza si $t<-t_{0{,}95;14}=-1{,}761$.</p>" },
      { titulo: "d) Decisión y conclusión", puntos: 1, solucion: String.raw`<p>$t=-1{,}495$; p-valor $\approx0{,}0786$ ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>Con estas muestras no hay evidencia de que el método nuevo reduzca el tiempo medio (la diferencia de $2{,}7$ minutos puede deberse al azar).</p><p>En R: <code>t.test(A, B, var.equal = TRUE)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "t", js: "(31.8 - 34.5 - 0)/1.8062391868188443", esperado: -1.495, tol: 0.000500001 },
      { que: "crítico", r: "cat(qt(0.95, 14))", esperado: 1.761, tol: 0.000500001 },
      { que: "Sp²", js: "((8-1)*3.9**2+(8-1)*3.3**2)/(8+8-2)", esperado: 13.05, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 28–29" }
    ]
  },
  {
    id: "m06-d010",
    modulo: "m06-hipotesis-dos-poblaciones",
    concepto: "m06-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 28–29" }
    ],
    titulo: "Pooled con D₀ ≠ 0 y α = 10 %",
    enunciado: String.raw`<p>Ventas diarias (unidades) antes y después de una campaña, en días distintos elegidos al azar:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Grupo</th><th>$n$</th><th>$\bar x$</th><th>$s$</th></tr></thead><tbody><tr><td>1: antes</td><td>$15$</td><td>$48$</td><td>$6$</td></tr><tr><td>2: después</td><td>$11$</td><td>$58{,}5$</td><td>$7$</td></tr></tbody></table></div><p>La gerencia afirma que la campaña sube las ventas medias en exactamente $5$ unidades. ¿Es compatible con los datos? Usa $\alpha=10\,\%$ y supón varianzas poblacionales <strong>iguales</strong>.</p><ol type="a"><li>Plantea las hipótesis sobre $\mu_2-\mu_1$.</li><li>Calcula la varianza combinada $S_p^2$ y el estadístico $t$.</li><li>Calcula los grados de libertad y el valor crítico.</li><li>Decide y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis", puntos: 1, solucion: String.raw`<p>$H_0:\mu_2-\mu_1=5$ contra $H_1:\mu_2-\mu_1\neq5$ (bilateral (dos colas)). Se contrasta la afirmación $\mu_2-\mu_1=5$.</p>` },
      { titulo: "b) Varianza combinada y estadístico t", puntos: 2.5, solucion: String.raw`<p>$S_p^2=\dfrac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}=\dfrac{14\cdot6^2+10\cdot7^2}{24}=41{,}4167$.</p><p>$t=\dfrac{(\bar x_2-\bar x_1)-D_0}{\sqrt{S_p^2\left(\frac1{n_1}+\frac1{n_2}\right)}}=\dfrac{(58{,}5-48)-5}{\sqrt{41{,}4167\left(\frac1{15}+\frac1{11}\right)}}=\dfrac{5{,}5}{2{,}5547}=2{,}153$.</p>` },
      { titulo: "c) Grados de libertad y valor crítico", puntos: 1.5, solucion: "<p>gl $=n_1+n_2-2=24$.</p><p>Prueba bilateral (dos colas): se rechaza si $|t|>t_{0{,}95;24}=1{,}711$.</p>" },
      { titulo: "d) Decisión y conclusión", puntos: 1, solucion: String.raw`<p>$t=2{,}153$; p-valor $\approx0{,}0416$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia de que el aumento medio no es $5$ unidades (la muestra sugiere un aumento mayor).</p><p>En R: <code>t.test(A, B, var.equal = TRUE)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "t", js: "(58.5 - 48 - 5)/2.55465508949107", esperado: 2.153, tol: 0.000500001 },
      { que: "crítico", r: "cat(qt(0.95, 24))", esperado: 1.711, tol: 0.000500001 },
      { que: "Sp²", js: "((15-1)*6**2+(11-1)*7**2)/(15+11-2)", esperado: 41.4167, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 28–29" }
    ]
  },
  {
    id: "m06-d011",
    modulo: "m06-hipotesis-dos-poblaciones",
    concepto: "m06-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 30–31 y 34" }
    ],
    titulo: "Antes y después de una capacitación (pareada)",
    enunciado: String.raw`<p>Ocho vendedores rinden una prueba antes y después de una capacitación:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Vendedor</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr></thead><tbody><tr><td>Antes</td><td>$62$</td><td>$70$</td><td>$58$</td><td>$75$</td><td>$66$</td><td>$71$</td><td>$60$</td><td>$68$</td></tr><tr><td>Después</td><td>$68$</td><td>$74$</td><td>$57$</td><td>$82$</td><td>$70$</td><td>$78$</td><td>$65$</td><td>$69$</td></tr></tbody></table></div><p>¿Mejoró el puntaje medio? Usa $\alpha=5\,\%$.</p><ol type="a"><li>¿Por qué las muestras son dependientes? Plantea las hipótesis con $d_i=$ antes $-$ después.</li><li>Calcula las diferencias, $\bar d$ y $s_d$.</li><li>Calcula el estadístico, el valor crítico, decide y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Por qué es pareada, e hipótesis", puntos: 1.5, solucion: String.raw`<p>Cada vendedor aporta dos mediciones ⇒ muestras dependientes: se trabaja con las diferencias y <strong>no</strong> con una prueba de dos muestras independientes.</p><p>$H_0:\mu_d\ge0$ contra $H_1:\mu_d<0$, con $d=$ antes $-$ después. Mejorar significa después $>$ antes, es decir $\mu_d<0$.</p>` },
      { titulo: "b) Diferencias, media y desviación", puntos: 2, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr></thead><tbody><tr><td>$d_i$</td><td>$-6$</td><td>$-4$</td><td>$1$</td><td>$-7$</td><td>$-4$</td><td>$-7$</td><td>$-5$</td><td>$-1$</td></tr></tbody></table></div><p>$\bar d=\dfrac{-33}{8}=-4{,}125$; $s_d=\sqrt{\dfrac{\sum(d_i-\bar d)^2}{n-1}}=\sqrt{\dfrac{56{,}875}{7}}=2{,}8504$.</p>` },
      { titulo: "c) Estadístico, crítico, decisión y conclusión", puntos: 2.5, solucion: String.raw`<p>$t=\dfrac{\bar d}{s_d/\sqrt n}=\dfrac{-4{,}125}{2{,}8504/\sqrt{8}}=-4{,}093$ con $n-1=7$ gl.</p><p>Crítico (cola izquierda): $t_{0{,}95;7}=1{,}895$; p-valor $=0{,}0023$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia de que la capacitación aumentó el puntaje medio.</p><p>En R: <code>t.test(antes, despues, paired = TRUE, alternative = "less")</code>. El orden importa: $\bar d>0$ significa que «antes» es mayor.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "t (t.test pareado)", r: "cat(t.test(c(62, 70, 58, 75, 66, 71, 60, 68), c(68, 74, 57, 82, 70, 78, 65, 69), paired = TRUE)$statistic)", esperado: -4.093, tol: 0.000500001 },
      { que: "sd de d", r: "cat(sd(c(62, 70, 58, 75, 66, 71, 60, 68) - c(68, 74, 57, 82, 70, 78, 65, 69)))", esperado: 2.8504, tol: 0.000050001 },
      { que: "crítico", r: "cat(qt(0.95, 7))", esperado: 1.895, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 30–31 y 34" }
    ]
  },
  {
    id: "m06-d012",
    modulo: "m06-hipotesis-dos-poblaciones",
    concepto: "m06-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 30–31 y 34" }
    ],
    titulo: "Dos balanzas sobre las mismas muestras (pareada bilateral)",
    enunciado: String.raw`<p>Seis muestras se pesan en dos balanzas (A y B):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Muestra</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody><tr><td>Balanza A</td><td>$10{,}2$</td><td>$11{,}5$</td><td>$9{,}8$</td><td>$12{,}1$</td><td>$10{,}9$</td><td>$11{,}3$</td></tr><tr><td>Balanza B</td><td>$10$</td><td>$11{,}6$</td><td>$9{,}9$</td><td>$11{,}8$</td><td>$11$</td><td>$11{,}1$</td></tr></tbody></table></div><p>¿Miden distinto, en promedio, las dos balanzas? (toma $d=$ A $-$ B). Usa $\alpha=5\,\%$.</p><ol type="a"><li>¿Por qué las muestras son dependientes? Plantea las hipótesis con $d_i=$ antes $-$ después.</li><li>Calcula las diferencias, $\bar d$ y $s_d$.</li><li>Calcula el estadístico, el valor crítico, decide y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Por qué es pareada, e hipótesis", puntos: 1.5, solucion: String.raw`<p>La misma muestra se pesa en ambas balanzas ⇒ muestras dependientes: se trabaja con las diferencias y <strong>no</strong> con una prueba de dos muestras independientes.</p><p>$H_0:\mu_d=0$ contra $H_1:\mu_d\neq0$, con $d=$ antes $-$ después. «Distinto» ⇒ dos colas.</p>` },
      { titulo: "b) Diferencias, media y desviación", puntos: 2, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody><tr><td>$d_i$</td><td>$0{,}2$</td><td>$-0{,}1$</td><td>$-0{,}1$</td><td>$0{,}3$</td><td>$-0{,}1$</td><td>$0{,}2$</td></tr></tbody></table></div><p>$\bar d=\dfrac{0{,}4}{6}=0{,}0667$; $s_d=\sqrt{\dfrac{\sum(d_i-\bar d)^2}{n-1}}=\sqrt{\dfrac{0{,}1733}{5}}=0{,}1862$.</p>` },
      { titulo: "c) Estadístico, crítico, decisión y conclusión", puntos: 2.5, solucion: String.raw`<p>$t=\dfrac{\bar d}{s_d/\sqrt n}=\dfrac{0{,}0667}{0{,}1862/\sqrt{6}}=0{,}877$ con $n-1=5$ gl.</p><p>Crítico (bilateral (dos colas)): $t_{0{,}975;5}=2{,}571$; p-valor $=0{,}4206$ ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>No hay evidencia de que las balanzas midan distinto en promedio.</p><p>En R: <code>t.test(antes, despues, paired = TRUE)</code>. El orden importa: $\bar d>0$ significa que «antes» es mayor.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "t (t.test pareado)", r: "cat(t.test(c(10.2, 11.5, 9.8, 12.1, 10.9, 11.3), c(10, 11.6, 9.9, 11.8, 11, 11.1), paired = TRUE)$statistic)", esperado: 0.877, tol: 0.000500001 },
      { que: "sd de d", r: "cat(sd(c(10.2, 11.5, 9.8, 12.1, 10.9, 11.3) - c(10, 11.6, 9.9, 11.8, 11, 11.1)))", esperado: 0.1862, tol: 0.000050001 },
      { que: "crítico", r: "cat(qt(0.975, 5))", esperado: 2.571, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 30–31 y 34" }
    ]
  },
  {
    id: "m06-d013",
    modulo: "m06-hipotesis-dos-poblaciones",
    concepto: "m06-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 30–31 y 34" }
    ],
    titulo: "Efecto de una dieta (pareada de cola derecha)",
    enunciado: String.raw`<p>Peso (kg) de siete personas antes y después de un programa de 3 meses:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Persona</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></thead><tbody><tr><td>Antes</td><td>$82$</td><td>$91$</td><td>$77$</td><td>$88$</td><td>$95$</td><td>$84$</td><td>$79$</td></tr><tr><td>Después</td><td>$78$</td><td>$86$</td><td>$76$</td><td>$83$</td><td>$89$</td><td>$81$</td><td>$77$</td></tr></tbody></table></div><p>¿Hay evidencia, al nivel indicado, de que el programa reduce el peso medio? Usa $\alpha=1\,\%$.</p><ol type="a"><li>¿Por qué las muestras son dependientes? Plantea las hipótesis con $d_i=$ antes $-$ después.</li><li>Calcula las diferencias, $\bar d$ y $s_d$.</li><li>Calcula el estadístico, el valor crítico, decide y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Por qué es pareada, e hipótesis", puntos: 1.5, solucion: String.raw`<p>Cada persona se mide dos veces ⇒ muestras dependientes: se trabaja con las diferencias y <strong>no</strong> con una prueba de dos muestras independientes.</p><p>$H_0:\mu_d\le0$ contra $H_1:\mu_d>0$, con $d=$ antes $-$ después. Reducir el peso significa antes $>$ después, es decir $\mu_d>0$.</p>` },
      { titulo: "b) Diferencias, media y desviación", puntos: 2, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></thead><tbody><tr><td>$d_i$</td><td>$4$</td><td>$5$</td><td>$1$</td><td>$5$</td><td>$6$</td><td>$3$</td><td>$2$</td></tr></tbody></table></div><p>$\bar d=\dfrac{26}{7}=3{,}7143$; $s_d=\sqrt{\dfrac{\sum(d_i-\bar d)^2}{n-1}}=\sqrt{\dfrac{19{,}4286}{6}}=1{,}7995$.</p>` },
      { titulo: "c) Estadístico, crítico, decisión y conclusión", puntos: 2.5, solucion: String.raw`<p>$t=\dfrac{\bar d}{s_d/\sqrt n}=\dfrac{3{,}7143}{1{,}7995/\sqrt{7}}=5{,}461$ con $n-1=6$ gl.</p><p>Crítico (cola derecha): $t_{0{,}99;6}=3{,}143$; p-valor $=0{,}0008$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Al $1\,\%$ hay evidencia de que el programa reduce el peso medio.</p><p>En R: <code>t.test(antes, despues, paired = TRUE, alternative = "greater")</code>. El orden importa: $\bar d>0$ significa que «antes» es mayor.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "t (t.test pareado)", r: "cat(t.test(c(82, 91, 77, 88, 95, 84, 79), c(78, 86, 76, 83, 89, 81, 77), paired = TRUE)$statistic)", esperado: 5.461, tol: 0.000500001 },
      { que: "sd de d", r: "cat(sd(c(82, 91, 77, 88, 95, 84, 79) - c(78, 86, 76, 83, 89, 81, 77)))", esperado: 1.7995, tol: 0.000050001 },
      { que: "crítico", r: "cat(qt(0.99, 6))", esperado: 3.143, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 30–31 y 34" }
    ]
  }
]);
