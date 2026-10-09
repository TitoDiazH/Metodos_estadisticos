/* ============================================================================
   Desarrollo · M18 ANOVA de un factor (P2) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m18-d002",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–9" }
    ],
    titulo: "ANOVA a mano: tres fertilizantes",
    enunciado: String.raw`<p>Se mide el rendimiento (kg por parcela) con tres fertilizantes, 4 parcelas cada uno:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fertilizante</th><th>Observaciones</th></tr></thead><tbody><tr><td>A</td><td>$20$; $22$; $19$; $23$</td></tr><tr><td>B</td><td>$25$; $27$; $26$; $30$</td></tr><tr><td>C</td><td>$21$; $20$; $24$; $23$</td></tr></tbody></table></div><p>Usa $\alpha=5\,\%$.</p><ol type="a"><li>Plantea las hipótesis y calcula las medias.</li><li>Calcula $SC_{TRAT}$ y $SC_E$.</li><li>Arma la tabla ANOVA.</li><li>Decide y concluye. ¿Qué harías a continuación?</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y medias", puntos: 1, solucion: String.raw`<p>$H_0:\mu_1=\mu_2=\mu_3$ contra $H_1$: al menos dos medias son distintas.</p><p>Medias: $\bar y_{A}=21$, $\bar y_{B}=27$, $\bar y_{C}=22$; media general $\bar y=23{,}333$ ($N=12$).</p>` },
      { titulo: "b) Sumas de cuadrados", puntos: 2, solucion: String.raw`<p>$SC_{TRAT}=\sum n_i(\bar y_i-\bar y)^2=4(21-23{,}333)^2+4(27-23{,}333)^2+4(22-23{,}333)^2=82{,}667$.</p><p>$SC_E=\sum_i\sum_j(y_{ij}-\bar y_i)^2=10+14+10=34$ (suma, grupo por grupo, de las desviaciones al cuadrado respecto de la media del grupo).</p><p>Comprobación: $SC_T=SC_{TRAT}+SC_E=116{,}667$.</p>` },
      { titulo: "c) Tabla ANOVA", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th></tr></thead><tbody><tr><td>Tratamientos</td><td>$82{,}667$</td><td>2</td><td>$41{,}333$</td><td>$10{,}941$</td></tr><tr><td>Error</td><td>$34$</td><td>9</td><td>$3{,}778$</td><td></td></tr><tr><td>Total</td><td>$116{,}667$</td><td>11</td><td></td><td></td></tr></tbody></table></div><p>gl: $k-1=2$, $N-k=9$, $N-1=11$. $CM=SC/\text{gl}$ y $F_0=CM_{TRAT}/CM_E=41{,}333/3{,}778=10{,}941$.</p>` },
      { titulo: "d) Decisión, conclusión y pasos siguientes", puntos: 1.5, solucion: "<p>Crítico: $F_{0{,}05;2,9}=4{,}256$. $F_0=10{,}941>4{,}256$ (p-valor $=0{,}0039$) ⇒ se <strong>rechaza</strong> $H_0$.</p><p>El fertilizante influye en el rendimiento medio. El F global no dice cuáles difieren: sigue una comparación múltiple (LSD o Tukey).</p><p>En ambos casos se verifican los supuestos con los residuos: normalidad (Q-Q), varianza constante (residuos vs. predichos) e independencia (residuos vs. orden).</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F (aov)", r: `cat({d <- data.frame(y = c(20, 22, 19, 23, 25, 27, 26, 30, 21, 20, 24, 23), g = factor(rep(c("A", "B", "C"), c(4, 4, 4)))); summary(aov(y ~ g, d))[[1]][1, 4]})`, esperado: 10.941, tol: 0.000500001 },
      { que: "SC error (aov)", r: `cat({d <- data.frame(y = c(20, 22, 19, 23, 25, 27, 26, 30, 21, 20, 24, 23), g = factor(rep(c("A", "B", "C"), c(4, 4, 4)))); summary(aov(y ~ g, d))[[1]][2, 2]})`, esperado: 34, tol: 0.000500001 },
      { que: "crítico", r: "cat(qf(0.95, 2, 9))", esperado: 4.256, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–9" }
    ]
  },
  {
    id: "m18-d003",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–9" }
    ],
    titulo: "ANOVA a mano: cuatro máquinas",
    enunciado: String.raw`<p>Se registra la producción por hora de cuatro máquinas, 3 mediciones cada una:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Máquina</th><th>Observaciones</th></tr></thead><tbody><tr><td>M1</td><td>$50$; $52$; $51$</td></tr><tr><td>M2</td><td>$55$; $57$; $56$</td></tr><tr><td>M3</td><td>$49$; $50$; $48$</td></tr><tr><td>M4</td><td>$54$; $53$; $55$</td></tr></tbody></table></div><p>Usa $\alpha=5\,\%$.</p><ol type="a"><li>Plantea las hipótesis y calcula las medias.</li><li>Calcula $SC_{TRAT}$ y $SC_E$.</li><li>Arma la tabla ANOVA.</li><li>Decide y concluye. ¿Qué harías a continuación?</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y medias", puntos: 1, solucion: String.raw`<p>$H_0:\mu_1=\mu_2=\mu_3=\mu_4$ contra $H_1$: al menos dos medias son distintas.</p><p>Medias: $\bar y_{M1}=51$, $\bar y_{M2}=56$, $\bar y_{M3}=49$, $\bar y_{M4}=54$; media general $\bar y=52{,}5$ ($N=12$).</p>` },
      { titulo: "b) Sumas de cuadrados", puntos: 2, solucion: String.raw`<p>$SC_{TRAT}=\sum n_i(\bar y_i-\bar y)^2=3(51-52{,}5)^2+3(56-52{,}5)^2+3(49-52{,}5)^2+3(54-52{,}5)^2=87$.</p><p>$SC_E=\sum_i\sum_j(y_{ij}-\bar y_i)^2=2+2+2+2=8$ (suma, grupo por grupo, de las desviaciones al cuadrado respecto de la media del grupo).</p><p>Comprobación: $SC_T=SC_{TRAT}+SC_E=95$.</p>` },
      { titulo: "c) Tabla ANOVA", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th></tr></thead><tbody><tr><td>Tratamientos</td><td>$87$</td><td>3</td><td>$29$</td><td>$29$</td></tr><tr><td>Error</td><td>$8$</td><td>8</td><td>$1$</td><td></td></tr><tr><td>Total</td><td>$95$</td><td>11</td><td></td><td></td></tr></tbody></table></div><p>gl: $k-1=3$, $N-k=8$, $N-1=11$. $CM=SC/\text{gl}$ y $F_0=CM_{TRAT}/CM_E=29/1=29$.</p>` },
      { titulo: "d) Decisión, conclusión y pasos siguientes", puntos: 1.5, solucion: "<p>Crítico: $F_{0{,}05;3,8}=4{,}066$. $F_0=29>4{,}066$ (p-valor $=0{,}0001$) ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Al menos una máquina tiene una producción media distinta. El F global no dice cuáles difieren: sigue una comparación múltiple (LSD o Tukey).</p><p>En ambos casos se verifican los supuestos con los residuos: normalidad (Q-Q), varianza constante (residuos vs. predichos) e independencia (residuos vs. orden).</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F (aov)", r: `cat({d <- data.frame(y = c(50, 52, 51, 55, 57, 56, 49, 50, 48, 54, 53, 55), g = factor(rep(c("M1", "M2", "M3", "M4"), c(3, 3, 3, 3)))); summary(aov(y ~ g, d))[[1]][1, 4]})`, esperado: 29, tol: 0.000500001 },
      { que: "SC error (aov)", r: `cat({d <- data.frame(y = c(50, 52, 51, 55, 57, 56, 49, 50, 48, 54, 53, 55), g = factor(rep(c("M1", "M2", "M3", "M4"), c(3, 3, 3, 3)))); summary(aov(y ~ g, d))[[1]][2, 2]})`, esperado: 8, tol: 0.000500001 },
      { que: "crítico", r: "cat(qf(0.95, 3, 8))", esperado: 4.066, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–9" }
    ]
  },
  {
    id: "m18-d004",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–9" }
    ],
    titulo: "ANOVA a mano: tres turnos (¿hay diferencias?)",
    enunciado: String.raw`<p>Unidades defectuosas por lote en tres turnos, 5 lotes cada uno:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Turno</th><th>Observaciones</th></tr></thead><tbody><tr><td>Mañana</td><td>$30$; $34$; $29$; $35$; $32$</td></tr><tr><td>Tarde</td><td>$33$; $31$; $36$; $30$; $35$</td></tr><tr><td>Noche</td><td>$28$; $33$; $31$; $34$; $29$</td></tr></tbody></table></div><p>Usa $\alpha=5\,\%$.</p><ol type="a"><li>Plantea las hipótesis y calcula las medias.</li><li>Calcula $SC_{TRAT}$ y $SC_E$.</li><li>Arma la tabla ANOVA.</li><li>Decide y concluye. ¿Qué harías a continuación?</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y medias", puntos: 1, solucion: String.raw`<p>$H_0:\mu_1=\mu_2=\mu_3$ contra $H_1$: al menos dos medias son distintas.</p><p>Medias: $\bar y_{Mañana}=32$, $\bar y_{Tarde}=33$, $\bar y_{Noche}=31$; media general $\bar y=32$ ($N=15$).</p>` },
      { titulo: "b) Sumas de cuadrados", puntos: 2, solucion: String.raw`<p>$SC_{TRAT}=\sum n_i(\bar y_i-\bar y)^2=5(32-32)^2+5(33-32)^2+5(31-32)^2=10$.</p><p>$SC_E=\sum_i\sum_j(y_{ij}-\bar y_i)^2=26+26+26=78$ (suma, grupo por grupo, de las desviaciones al cuadrado respecto de la media del grupo).</p><p>Comprobación: $SC_T=SC_{TRAT}+SC_E=88$.</p>` },
      { titulo: "c) Tabla ANOVA", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th></tr></thead><tbody><tr><td>Tratamientos</td><td>$10$</td><td>2</td><td>$5$</td><td>$0{,}769$</td></tr><tr><td>Error</td><td>$78$</td><td>12</td><td>$6{,}5$</td><td></td></tr><tr><td>Total</td><td>$88$</td><td>14</td><td></td><td></td></tr></tbody></table></div><p>gl: $k-1=2$, $N-k=12$, $N-1=14$. $CM=SC/\text{gl}$ y $F_0=CM_{TRAT}/CM_E=5/6{,}5=0{,}769$.</p>` },
      { titulo: "d) Decisión, conclusión y pasos siguientes", puntos: 1.5, solucion: "<p>Crítico: $F_{0{,}05;2,12}=3{,}885$. $F_0=0{,}769<3{,}885$ (p-valor $=0{,}4849$) ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>No hay evidencia de que el turno influya en el número medio de defectuosos: las diferencias entre medias son pequeñas frente a la variabilidad dentro de cada turno. No corresponde hacer comparaciones múltiples.</p><p>En ambos casos se verifican los supuestos con los residuos: normalidad (Q-Q), varianza constante (residuos vs. predichos) e independencia (residuos vs. orden).</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F (aov)", r: `cat({d <- data.frame(y = c(30, 34, 29, 35, 32, 33, 31, 36, 30, 35, 28, 33, 31, 34, 29), g = factor(rep(c("Mañana", "Tarde", "Noche"), c(5, 5, 5)))); summary(aov(y ~ g, d))[[1]][1, 4]})`, esperado: 0.769, tol: 0.000500001 },
      { que: "SC error (aov)", r: `cat({d <- data.frame(y = c(30, 34, 29, 35, 32, 33, 31, 36, 30, 35, 28, 33, 31, 34, 29), g = factor(rep(c("Mañana", "Tarde", "Noche"), c(5, 5, 5)))); summary(aov(y ~ g, d))[[1]][2, 2]})`, esperado: 78, tol: 0.000500001 },
      { que: "crítico", r: "cat(qf(0.95, 2, 12))", esperado: 3.885, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–9" }
    ]
  },
  {
    id: "m18-d005",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–9" }
    ],
    titulo: "ANOVA con tamaños de muestra distintos",
    enunciado: String.raw`<p>Tiempo de respuesta (segundos) de tres servidores, con distinto número de pruebas:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Servidor</th><th>Observaciones</th></tr></thead><tbody><tr><td>S1</td><td>$8$; $10$; $9$</td></tr><tr><td>S2</td><td>$12$; $11$; $14$; $13$</td></tr><tr><td>S3</td><td>$9$; $11$; $10$; $12$; $8$</td></tr></tbody></table></div><p>Usa $\alpha=5\,\%$.</p><ol type="a"><li>Plantea las hipótesis y calcula las medias.</li><li>Calcula $SC_{TRAT}$ y $SC_E$.</li><li>Arma la tabla ANOVA.</li><li>Decide y concluye. ¿Qué harías a continuación?</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y medias", puntos: 1, solucion: String.raw`<p>$H_0:\mu_1=\mu_2=\mu_3$ contra $H_1$: al menos dos medias son distintas.</p><p>Medias: $\bar y_{S1}=9$, $\bar y_{S2}=12{,}5$, $\bar y_{S3}=10$; media general $\bar y=10{,}583$ ($N=12$).</p>` },
      { titulo: "b) Sumas de cuadrados", puntos: 2, solucion: String.raw`<p>$SC_{TRAT}=\sum n_i(\bar y_i-\bar y)^2=3(9-10{,}583)^2+4(12{,}5-10{,}583)^2+5(10-10{,}583)^2=23{,}917$.</p><p>$SC_E=\sum_i\sum_j(y_{ij}-\bar y_i)^2=2+5+10=17$ (suma, grupo por grupo, de las desviaciones al cuadrado respecto de la media del grupo).</p><p>Comprobación: $SC_T=SC_{TRAT}+SC_E=40{,}917$.</p>` },
      { titulo: "c) Tabla ANOVA", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th></tr></thead><tbody><tr><td>Tratamientos</td><td>$23{,}917$</td><td>2</td><td>$11{,}958$</td><td>$6{,}331$</td></tr><tr><td>Error</td><td>$17$</td><td>9</td><td>$1{,}889$</td><td></td></tr><tr><td>Total</td><td>$40{,}917$</td><td>11</td><td></td><td></td></tr></tbody></table></div><p>gl: $k-1=2$, $N-k=9$, $N-1=11$. $CM=SC/\text{gl}$ y $F_0=CM_{TRAT}/CM_E=11{,}958/1{,}889=6{,}331$.</p>` },
      { titulo: "d) Decisión, conclusión y pasos siguientes", puntos: 1.5, solucion: "<p>Crítico: $F_{0{,}05;2,9}=4{,}256$. $F_0=6{,}331>4{,}256$ (p-valor $=0{,}0192$) ⇒ se <strong>rechaza</strong> $H_0$.</p><p>El tiempo medio de respuesta difiere entre servidores. El F global no dice cuáles difieren: sigue una comparación múltiple (LSD o Tukey).</p><p>En ambos casos se verifican los supuestos con los residuos: normalidad (Q-Q), varianza constante (residuos vs. predichos) e independencia (residuos vs. orden). (Diseño desbalanceado: cada grupo pesa según su $n_i$.)</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F (aov)", r: `cat({d <- data.frame(y = c(8, 10, 9, 12, 11, 14, 13, 9, 11, 10, 12, 8), g = factor(rep(c("S1", "S2", "S3"), c(3, 4, 5)))); summary(aov(y ~ g, d))[[1]][1, 4]})`, esperado: 6.331, tol: 0.000500001 },
      { que: "SC error (aov)", r: `cat({d <- data.frame(y = c(8, 10, 9, 12, 11, 14, 13, 9, 11, 10, 12, 8), g = factor(rep(c("S1", "S2", "S3"), c(3, 4, 5)))); summary(aov(y ~ g, d))[[1]][2, 2]})`, esperado: 17, tol: 0.000500001 },
      { que: "crítico", r: "cat(qf(0.95, 2, 9))", esperado: 4.256, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–9" }
    ]
  },
  {
    id: "m18-d006",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–9" }
    ],
    titulo: "ANOVA a mano con α = 1 %: tres métodos de capacitación",
    enunciado: String.raw`<p>Puntaje final de 12 trabajadores asignados al azar a tres métodos de capacitación:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Método</th><th>Observaciones</th></tr></thead><tbody><tr><td>Presencial</td><td>$78$; $82$; $80$; $84$</td></tr><tr><td>Online</td><td>$72$; $75$; $70$; $71$</td></tr><tr><td>Mixto</td><td>$80$; $79$; $83$; $86$</td></tr></tbody></table></div><p>Usa $\alpha=1\,\%$.</p><ol type="a"><li>Plantea las hipótesis y calcula las medias.</li><li>Calcula $SC_{TRAT}$ y $SC_E$.</li><li>Arma la tabla ANOVA.</li><li>Decide y concluye. ¿Qué harías a continuación?</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y medias", puntos: 1, solucion: String.raw`<p>$H_0:\mu_1=\mu_2=\mu_3$ contra $H_1$: al menos dos medias son distintas.</p><p>Medias: $\bar y_{Presencial}=81$, $\bar y_{Online}=72$, $\bar y_{Mixto}=82$; media general $\bar y=78{,}333$ ($N=12$).</p>` },
      { titulo: "b) Sumas de cuadrados", puntos: 2, solucion: String.raw`<p>$SC_{TRAT}=\sum n_i(\bar y_i-\bar y)^2=4(81-78{,}333)^2+4(72-78{,}333)^2+4(82-78{,}333)^2=242{,}667$.</p><p>$SC_E=\sum_i\sum_j(y_{ij}-\bar y_i)^2=20+14+30=64$ (suma, grupo por grupo, de las desviaciones al cuadrado respecto de la media del grupo).</p><p>Comprobación: $SC_T=SC_{TRAT}+SC_E=306{,}667$.</p>` },
      { titulo: "c) Tabla ANOVA", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th></tr></thead><tbody><tr><td>Tratamientos</td><td>$242{,}667$</td><td>2</td><td>$121{,}333$</td><td>$17{,}063$</td></tr><tr><td>Error</td><td>$64$</td><td>9</td><td>$7{,}111$</td><td></td></tr><tr><td>Total</td><td>$306{,}667$</td><td>11</td><td></td><td></td></tr></tbody></table></div><p>gl: $k-1=2$, $N-k=9$, $N-1=11$. $CM=SC/\text{gl}$ y $F_0=CM_{TRAT}/CM_E=121{,}333/7{,}111=17{,}063$.</p>` },
      { titulo: "d) Decisión, conclusión y pasos siguientes", puntos: 1.5, solucion: String.raw`<p>Crítico: $F_{0{,}01;2,9}=8{,}022$. $F_0=17{,}063>8{,}022$ (p-valor $=0{,}0009$) ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Al $1\,\%$ hay evidencia de que el método de capacitación influye en el puntaje medio. El F global no dice cuáles difieren: sigue una comparación múltiple (LSD o Tukey).</p><p>En ambos casos se verifican los supuestos con los residuos: normalidad (Q-Q), varianza constante (residuos vs. predichos) e independencia (residuos vs. orden).</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F (aov)", r: `cat({d <- data.frame(y = c(78, 82, 80, 84, 72, 75, 70, 71, 80, 79, 83, 86), g = factor(rep(c("Presencial", "Online", "Mixto"), c(4, 4, 4)))); summary(aov(y ~ g, d))[[1]][1, 4]})`, esperado: 17.063, tol: 0.000500001 },
      { que: "SC error (aov)", r: `cat({d <- data.frame(y = c(78, 82, 80, 84, 72, 75, 70, 71, 80, 79, 83, 86), g = factor(rep(c("Presencial", "Online", "Mixto"), c(4, 4, 4)))); summary(aov(y ~ g, d))[[1]][2, 2]})`, esperado: 64, tol: 0.000500001 },
      { que: "crítico", r: "cat(qf(0.99, 2, 9))", esperado: 8.022, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–9" }
    ]
  },
  {
    id: "m18-d007",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C7.1", loc: "páginas 36–41" },
      { id: "C7.2", loc: "slides 2–6" }
    ],
    titulo: "Completar una tabla ANOVA (k = 4, n = 6)",
    enunciado: String.raw`<p>De un experimento se conserva solo parte de la tabla ANOVA. Se compararon $k=4$ tratamientos con $n=6$ observaciones cada uno. Completa la tabla:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th></tr></thead><tbody><tr><td>Tratamientos</td><td>$84$</td><td>?</td><td>?</td><td>?</td></tr><tr><td>Error</td><td>?</td><td>?</td><td>?</td><td></td></tr><tr><td>Total</td><td>$244$</td><td>?</td><td></td><td></td></tr></tbody></table></div><ol type="a"><li>Completa los grados de libertad.</li><li>Completa $SC_E$ y los cuadrados medios.</li><li>Calcula $F_0$ y decide con $\alpha=5\,\%$.</li></ol>`,
    partes: [
      { titulo: "a) Grados de libertad", puntos: 1.5, solucion: String.raw`<p>$N=k\cdot n=24$. Tratamientos: $k-1=3$; error: $N-k=20$; total: $N-1=23$ (y $3+20=23$).</p>` },
      { titulo: "b) Suma de cuadrados del error y cuadrados medios", puntos: 2, solucion: String.raw`<p>$SC_E=SC_T-SC_{TRAT}=244-84=160$.</p><p>$CM_{TRAT}=\dfrac{84}{3}=28$; $CM_E=\dfrac{160}{20}=8$ (estimador de $\sigma^2$).</p>` },
      { titulo: "c) Estadístico F, valor crítico y decisión", puntos: 2.5, solucion: String.raw`<p>$F_0=\dfrac{CM_{TRAT}}{CM_E}=\dfrac{28}{8}=3{,}5$.</p><p>Crítico: $F_{0{,}05;3,20}=3{,}098$ ⇒ $3{,}5>3{,}098$ (p-valor $=0{,}0345$) ⇒ se <strong>rechaza</strong> $H_0$: al menos un tratamiento tiene media distinta.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th></tr></thead><tbody><tr><td>Tratamientos</td><td>$84$</td><td>3</td><td>$28$</td><td>$3{,}5$</td></tr><tr><td>Error</td><td>$160$</td><td>20</td><td>$8$</td><td></td></tr><tr><td>Total</td><td>$244$</td><td>23</td><td></td><td></td></tr></tbody></table></div>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F", js: "(84/3)/((244 - 84)/20)", esperado: 3.5, tol: 0.000500001 },
      { que: "crítico", r: "cat(qf(0.95, 3, 20))", esperado: 3.098, tol: 0.000500001 },
      { que: "p-valor", r: "cat(1 - pf((84/3)/((244 - 84)/20), 3, 20))", esperado: 0.0345, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C7.1", loc: "páginas 36–41" },
      { id: "C7.2", loc: "slides 2–6" }
    ]
  },
  {
    id: "m18-d008",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C7.1", loc: "páginas 36–41" },
      { id: "C7.2", loc: "slides 2–6" }
    ],
    titulo: "Completar una tabla ANOVA (k = 3, n = 8)",
    enunciado: String.raw`<p>Un informe trae la tabla ANOVA incompleta. Se compararon $k=3$ tratamientos con $n=8$ observaciones cada uno. Completa la tabla:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th></tr></thead><tbody><tr><td>Tratamientos</td><td>$30$</td><td>?</td><td>?</td><td>?</td></tr><tr><td>Error</td><td>?</td><td>?</td><td>?</td><td></td></tr><tr><td>Total</td><td>$240$</td><td>?</td><td></td><td></td></tr></tbody></table></div><ol type="a"><li>Completa los grados de libertad.</li><li>Completa $SC_E$ y los cuadrados medios.</li><li>Calcula $F_0$ y decide con $\alpha=5\,\%$.</li></ol>`,
    partes: [
      { titulo: "a) Grados de libertad", puntos: 1.5, solucion: String.raw`<p>$N=k\cdot n=24$. Tratamientos: $k-1=2$; error: $N-k=21$; total: $N-1=23$ (y $2+21=23$).</p>` },
      { titulo: "b) Suma de cuadrados del error y cuadrados medios", puntos: 2, solucion: String.raw`<p>$SC_E=SC_T-SC_{TRAT}=240-30=210$.</p><p>$CM_{TRAT}=\dfrac{30}{2}=15$; $CM_E=\dfrac{210}{21}=10$ (estimador de $\sigma^2$).</p>` },
      { titulo: "c) Estadístico F, valor crítico y decisión", puntos: 2.5, solucion: String.raw`<p>$F_0=\dfrac{CM_{TRAT}}{CM_E}=\dfrac{15}{10}=1{,}5$.</p><p>Crítico: $F_{0{,}05;2,21}=3{,}467$ ⇒ $1{,}5<3{,}467$ (p-valor $=0{,}2461$) ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de diferencias entre las medias de los tratamientos.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th></tr></thead><tbody><tr><td>Tratamientos</td><td>$30$</td><td>2</td><td>$15$</td><td>$1{,}5$</td></tr><tr><td>Error</td><td>$210$</td><td>21</td><td>$10$</td><td></td></tr><tr><td>Total</td><td>$240$</td><td>23</td><td></td><td></td></tr></tbody></table></div>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F", js: "(30/2)/((240 - 30)/21)", esperado: 1.5, tol: 0.000500001 },
      { que: "crítico", r: "cat(qf(0.95, 2, 21))", esperado: 3.467, tol: 0.000500001 },
      { que: "p-valor", r: "cat(1 - pf((30/2)/((240 - 30)/21), 2, 21))", esperado: 0.2461, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C7.1", loc: "páginas 36–41" },
      { id: "C7.2", loc: "slides 2–6" }
    ]
  },
  {
    id: "m18-d009",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C7.1", loc: "páginas 36–41" },
      { id: "C7.2", loc: "slides 2–6" }
    ],
    titulo: "Completar una tabla ANOVA (k = 5, n = 4, α = 1 %)",
    enunciado: String.raw`<p>Se compararon cinco proveedores y la tabla quedó incompleta. Se compararon $k=5$ tratamientos con $n=4$ observaciones cada uno. Completa la tabla:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th></tr></thead><tbody><tr><td>Tratamientos</td><td>$152$</td><td>?</td><td>?</td><td>?</td></tr><tr><td>Error</td><td>?</td><td>?</td><td>?</td><td></td></tr><tr><td>Total</td><td>$242$</td><td>?</td><td></td><td></td></tr></tbody></table></div><ol type="a"><li>Completa los grados de libertad.</li><li>Completa $SC_E$ y los cuadrados medios.</li><li>Calcula $F_0$ y decide con $\alpha=1\,\%$.</li></ol>`,
    partes: [
      { titulo: "a) Grados de libertad", puntos: 1.5, solucion: String.raw`<p>$N=k\cdot n=20$. Tratamientos: $k-1=4$; error: $N-k=15$; total: $N-1=19$ (y $4+15=19$).</p>` },
      { titulo: "b) Suma de cuadrados del error y cuadrados medios", puntos: 2, solucion: String.raw`<p>$SC_E=SC_T-SC_{TRAT}=242-152=90$.</p><p>$CM_{TRAT}=\dfrac{152}{4}=38$; $CM_E=\dfrac{90}{15}=6$ (estimador de $\sigma^2$).</p>` },
      { titulo: "c) Estadístico F, valor crítico y decisión", puntos: 2.5, solucion: String.raw`<p>$F_0=\dfrac{CM_{TRAT}}{CM_E}=\dfrac{38}{6}=6{,}333$.</p><p>Crítico: $F_{0{,}01;4,15}=4{,}893$ ⇒ $6{,}333>4{,}893$ (p-valor $=0{,}0034$) ⇒ se <strong>rechaza</strong> $H_0$: al menos un tratamiento tiene media distinta.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th></tr></thead><tbody><tr><td>Tratamientos</td><td>$152$</td><td>4</td><td>$38$</td><td>$6{,}333$</td></tr><tr><td>Error</td><td>$90$</td><td>15</td><td>$6$</td><td></td></tr><tr><td>Total</td><td>$242$</td><td>19</td><td></td><td></td></tr></tbody></table></div>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F", js: "(152/4)/((242 - 152)/15)", esperado: 6.333, tol: 0.000500001 },
      { que: "crítico", r: "cat(qf(0.99, 4, 15))", esperado: 4.893, tol: 0.000500001 },
      { que: "p-valor", r: "cat(1 - pf((152/4)/((242 - 152)/15), 4, 15))", esperado: 0.0034, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C7.1", loc: "páginas 36–41" },
      { id: "C7.2", loc: "slides 2–6" }
    ]
  },
  {
    id: "m18-d010",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c06",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C7.2", loc: "slides 10–19" }
    ],
    titulo: "LSD de Fisher con tres fertilizantes",
    enunciado: String.raw`<p>Experimento con tres fertilizantes (rendimiento en kg por parcela). El ANOVA resultó significativo, con $CM_E=3{,}778$ y $n=4$ observaciones por tratamiento. Medias: $\bar y_{A}=21$, $\bar y_{B}=27$, $\bar y_{C}=22$.</p><ol type="a"><li>¿Cuántas comparaciones de pares hay y con cuántos gl se busca el valor $t$?</li><li>Calcula la diferencia mínima significativa (LSD) con $\alpha=5\,\%$.</li><li>Indica qué pares difieren y resume la conclusión. ¿En qué se diferencia Tukey?</li></ol>`,
    partes: [
      { titulo: "a) Número de pares y valor t", puntos: 1.5, solucion: String.raw`<p>Pares: $\dfrac{k(k-1)}{2}=\dfrac{3\cdot2}{2}=3$.</p><p>gl del error: $N-k=12-3=9$ ⇒ $t_{\alpha/2;\,N-k}=t_{0{,}025;9}=2{,}262$ (<code>qt(0.975, 9)</code>).</p>` },
      { titulo: "b) LSD", puntos: 2, solucion: String.raw`<p>$\text{LSD}=t_{\alpha/2,N-k}\sqrt{\dfrac{2\,CM_E}{n}}=2{,}262\sqrt{\dfrac{2\cdot3{,}778}{4}}=2{,}262\cdot1{,}3744=3{,}109$.</p><p>Se declaran distintas las medias cuya diferencia absoluta supere $3{,}109$.</p>` },
      { titulo: "c) Pares que difieren y conclusión", puntos: 2.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Par</th><th>$|\bar y_i-\bar y_j|$</th><th>¿$>$ LSD?</th></tr></thead><tbody><tr><td>A – B</td><td>$6$</td><td><strong>sí</strong></td></tr><tr><td>A – C</td><td>$1$</td><td>no</td></tr><tr><td>B – C</td><td>$5$</td><td><strong>sí</strong></td></tr></tbody></table></div><p>Difieren: A–B, B–C. Orden de las medias: B > C > A.</p><p>B rinde más que A y que C; entre A y C no hay diferencia: conviene B.</p><p>LSD usa la $t$ de Student con confianza <strong>individual</strong> (por comparación): es muy sensible/potente. <strong>Tukey</strong> usa el rango estudentizado y controla el error <strong>grupal</strong> (por experimento): es más conservador y puede dejar de declarar significativas las diferencias pequeñas. Si la diferencia es clara, coinciden.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "LSD", r: "cat(qt(0.975, 9)*sqrt(2*3.7777777777777777/4))", esperado: 3.109, tol: 0.000500001 },
      { que: "nº de pares", js: "3*(3-1)/2", esperado: 3, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C7.2", loc: "slides 10–19" }
    ]
  },
  {
    id: "m18-d011",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c06",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C7.2", loc: "slides 10–19" }
    ],
    titulo: "LSD de Fisher con cuatro máquinas",
    enunciado: String.raw`<p>Experimento con cuatro máquinas (producción por hora). El ANOVA resultó significativo, con $CM_E=1$ y $n=3$ observaciones por tratamiento. Medias: $\bar y_{M1}=51$, $\bar y_{M2}=56$, $\bar y_{M3}=49$, $\bar y_{M4}=54$.</p><ol type="a"><li>¿Cuántas comparaciones de pares hay y con cuántos gl se busca el valor $t$?</li><li>Calcula la diferencia mínima significativa (LSD) con $\alpha=5\,\%$.</li><li>Indica qué pares difieren y resume la conclusión. ¿En qué se diferencia Tukey?</li></ol>`,
    partes: [
      { titulo: "a) Número de pares y valor t", puntos: 1.5, solucion: String.raw`<p>Pares: $\dfrac{k(k-1)}{2}=\dfrac{4\cdot3}{2}=6$.</p><p>gl del error: $N-k=12-4=8$ ⇒ $t_{\alpha/2;\,N-k}=t_{0{,}025;8}=2{,}306$ (<code>qt(0.975, 8)</code>).</p>` },
      { titulo: "b) LSD", puntos: 2, solucion: String.raw`<p>$\text{LSD}=t_{\alpha/2,N-k}\sqrt{\dfrac{2\,CM_E}{n}}=2{,}306\sqrt{\dfrac{2\cdot1}{3}}=2{,}306\cdot0{,}8165=1{,}883$.</p><p>Se declaran distintas las medias cuya diferencia absoluta supere $1{,}883$.</p>` },
      { titulo: "c) Pares que difieren y conclusión", puntos: 2.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Par</th><th>$|\bar y_i-\bar y_j|$</th><th>¿$>$ LSD?</th></tr></thead><tbody><tr><td>M1 – M2</td><td>$5$</td><td><strong>sí</strong></td></tr><tr><td>M1 – M3</td><td>$2$</td><td><strong>sí</strong></td></tr><tr><td>M1 – M4</td><td>$3$</td><td><strong>sí</strong></td></tr><tr><td>M2 – M3</td><td>$7$</td><td><strong>sí</strong></td></tr><tr><td>M2 – M4</td><td>$2$</td><td><strong>sí</strong></td></tr><tr><td>M3 – M4</td><td>$5$</td><td><strong>sí</strong></td></tr></tbody></table></div><p>Difieren: M1–M2, M1–M3, M1–M4, M2–M3, M2–M4, M3–M4. Orden de las medias: M2 > M4 > M1 > M3.</p><p>Todas las máquinas difieren entre sí: M2 es la de mayor producción y M3 la de menor.</p><p>LSD usa la $t$ de Student con confianza <strong>individual</strong> (por comparación): es muy sensible/potente. <strong>Tukey</strong> usa el rango estudentizado y controla el error <strong>grupal</strong> (por experimento): es más conservador y puede dejar de declarar significativas las diferencias pequeñas. Si la diferencia es clara, coinciden.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "LSD", r: "cat(qt(0.975, 8)*sqrt(2*1/3))", esperado: 1.883, tol: 0.000500001 },
      { que: "nº de pares", js: "4*(4-1)/2", esperado: 6, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C7.2", loc: "slides 10–19" }
    ]
  },
  {
    id: "m18-d012",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c06",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C7.2", loc: "slides 10–19" }
    ],
    titulo: "LSD de Fisher con cuatro dietas (grupos que se traslapan)",
    enunciado: String.raw`<p>Se compara la ganancia de peso con cuatro dietas. El ANOVA resultó significativo, con $CM_E=6{,}4$ y $n=5$ observaciones por tratamiento. Medias: $\bar y_{D1}=40{,}2$, $\bar y_{D2}=44{,}9$, $\bar y_{D3}=41{,}8$, $\bar y_{D4}=47{,}6$.</p><ol type="a"><li>¿Cuántas comparaciones de pares hay y con cuántos gl se busca el valor $t$?</li><li>Calcula la diferencia mínima significativa (LSD) con $\alpha=5\,\%$.</li><li>Indica qué pares difieren y resume la conclusión. ¿En qué se diferencia Tukey?</li></ol>`,
    partes: [
      { titulo: "a) Número de pares y valor t", puntos: 1.5, solucion: String.raw`<p>Pares: $\dfrac{k(k-1)}{2}=\dfrac{4\cdot3}{2}=6$.</p><p>gl del error: $N-k=20-4=16$ ⇒ $t_{\alpha/2;\,N-k}=t_{0{,}025;16}=2{,}12$ (<code>qt(0.975, 16)</code>).</p>` },
      { titulo: "b) LSD", puntos: 2, solucion: String.raw`<p>$\text{LSD}=t_{\alpha/2,N-k}\sqrt{\dfrac{2\,CM_E}{n}}=2{,}12\sqrt{\dfrac{2\cdot6{,}4}{5}}=2{,}12\cdot1{,}6=3{,}392$.</p><p>Se declaran distintas las medias cuya diferencia absoluta supere $3{,}392$.</p>` },
      { titulo: "c) Pares que difieren y conclusión", puntos: 2.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Par</th><th>$|\bar y_i-\bar y_j|$</th><th>¿$>$ LSD?</th></tr></thead><tbody><tr><td>D1 – D2</td><td>$4{,}7$</td><td><strong>sí</strong></td></tr><tr><td>D1 – D3</td><td>$1{,}6$</td><td>no</td></tr><tr><td>D1 – D4</td><td>$7{,}4$</td><td><strong>sí</strong></td></tr><tr><td>D2 – D3</td><td>$3{,}1$</td><td>no</td></tr><tr><td>D2 – D4</td><td>$2{,}7$</td><td>no</td></tr><tr><td>D3 – D4</td><td>$5{,}8$</td><td><strong>sí</strong></td></tr></tbody></table></div><p>Difieren: D1–D2, D1–D4, D3–D4. Orden de las medias: D4 > D2 > D3 > D1.</p><p>Se forman grupos: D1 y D3 no difieren entre sí, D2 y D4 tampoco; D4 supera a D1 y D3, y D2 supera a D1.</p><p>LSD usa la $t$ de Student con confianza <strong>individual</strong> (por comparación): es muy sensible/potente. <strong>Tukey</strong> usa el rango estudentizado y controla el error <strong>grupal</strong> (por experimento): es más conservador y puede dejar de declarar significativas las diferencias pequeñas. Si la diferencia es clara, coinciden.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "LSD", r: "cat(qt(0.975, 16)*sqrt(2*6.4/5))", esperado: 3.392, tol: 0.000500001 },
      { que: "nº de pares", js: "4*(4-1)/2", esperado: 6, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C7.2", loc: "slides 10–19" }
    ]
  },
  {
    id: "m18-d013",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c07",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C7.2", loc: "slides 20–21" },
      { id: "C7.1", loc: "página 31" }
    ],
    titulo: "Tamaño de muestra por tratamiento (k = 4)",
    enunciado: String.raw`<p>Se planifica un experimento para comparar métodos de ensamble. Se compararán $k=4$ tratamientos. Se estima $\sigma=2$ y se quiere detectar una diferencia mínima entre tratamientos de $d_T=2{,}4$, con $\alpha=5\,\%$.</p><ol type="a"><li>Escribe la fórmula del número de réplicas por tratamiento y aplícala partiendo de un valor tentativo $n=5$.</li><li>Itera hasta que el valor se estabilice.</li><li>¿Cuántas corridas se necesitan en total? ¿Es coherente con la recomendación general de la clase?</li></ol>`,
    partes: [
      { titulo: "a) Fórmula y primera iteración", puntos: 2.5, solucion: String.raw`<p>$n=\dfrac{2\,t^2\,\sigma^2}{d_T^2}$, con $t=t_{\alpha/2}$ de los gl del error, $k(n-1)$. Como $t$ depende de $n$, se parte de un valor tentativo y se itera.</p><p>Con $n=5$: gl $=k(n-1)=4\cdot4=16$ ⇒ $t_{0{,}975;16}=2{,}12$ ⇒ $n=\dfrac{2\cdot2{,}12^2\cdot2^2}{2{,}4^2}=6{,}24\approx6$.</p>` },
      { titulo: "b) Iteraciones siguientes", puntos: 2.5, solucion: String.raw`<p>Con $n=6$: gl $=k(n-1)=4\cdot5=20$ ⇒ $t_{0{,}975;20}=2{,}086$ ⇒ $n=\dfrac{2\cdot2{,}086^2\cdot2^2}{2{,}4^2}=6{,}04\approx6$.</p><p>El valor se repite ⇒ <strong>$n=6$ réplicas por tratamiento</strong>.</p>` },
      { titulo: "c) Corridas totales y recomendación general", puntos: 1, solucion: String.raw`<p>Total: $N=k\cdot n=4\cdot6=24$ corridas.</p><p>Recomendación de la clase: entre 5 y 30 mediciones por tratamiento (≈10 con datos consistentes, ≈30 con mucha dispersión). El resultado cae dentro de ese rango.</p><p>A mayor $\sigma$ o menor $d_T$, más réplicas se necesitan. Aquí se redondea al entero más cercano, como en el ejemplo de la clase ($5{,}1\Rightarrow5$); un criterio más conservador es redondear hacia arriba.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "n de la última iteración", r: "cat(2*qt(0.975, 20)^2*2^2/2.4^2)", esperado: 6.04, tol: 0.0050000010000000004 },
      { que: "n de la primera iteración", r: "cat(2*qt(0.975, 16)^2*2^2/2.4^2)", esperado: 6.24, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C7.2", loc: "slides 20–21" },
      { id: "C7.1", loc: "página 31" }
    ]
  },
  {
    id: "m18-d014",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c07",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C7.2", loc: "slides 20–21" },
      { id: "C7.1", loc: "página 31" }
    ],
    titulo: "Tamaño de muestra por tratamiento (k = 3)",
    enunciado: String.raw`<p>Se planifica un experimento para comparar tres proveedores. Se compararán $k=3$ tratamientos. Se estima $\sigma=3$ y se quiere detectar una diferencia mínima entre tratamientos de $d_T=3{,}3$, con $\alpha=5\,\%$.</p><ol type="a"><li>Escribe la fórmula del número de réplicas por tratamiento y aplícala partiendo de un valor tentativo $n=5$.</li><li>Itera hasta que el valor se estabilice.</li><li>¿Cuántas corridas se necesitan en total? ¿Es coherente con la recomendación general de la clase?</li></ol>`,
    partes: [
      { titulo: "a) Fórmula y primera iteración", puntos: 2.5, solucion: String.raw`<p>$n=\dfrac{2\,t^2\,\sigma^2}{d_T^2}$, con $t=t_{\alpha/2}$ de los gl del error, $k(n-1)$. Como $t$ depende de $n$, se parte de un valor tentativo y se itera.</p><p>Con $n=5$: gl $=k(n-1)=3\cdot4=12$ ⇒ $t_{0{,}975;12}=2{,}179$ ⇒ $n=\dfrac{2\cdot2{,}179^2\cdot3^2}{3{,}3^2}=7{,}85\approx8$.</p>` },
      { titulo: "b) Iteraciones siguientes", puntos: 2.5, solucion: String.raw`<p>Con $n=8$: gl $=k(n-1)=3\cdot7=21$ ⇒ $t_{0{,}975;21}=2{,}08$ ⇒ $n=\dfrac{2\cdot2{,}08^2\cdot3^2}{3{,}3^2}=7{,}15\approx7$.</p><p>Con $n=7$: gl $=k(n-1)=3\cdot6=18$ ⇒ $t_{0{,}975;18}=2{,}101$ ⇒ $n=\dfrac{2\cdot2{,}101^2\cdot3^2}{3{,}3^2}=7{,}3\approx7$.</p><p>El valor se repite ⇒ <strong>$n=7$ réplicas por tratamiento</strong>.</p>` },
      { titulo: "c) Corridas totales y recomendación general", puntos: 1, solucion: String.raw`<p>Total: $N=k\cdot n=3\cdot7=21$ corridas.</p><p>Recomendación de la clase: entre 5 y 30 mediciones por tratamiento (≈10 con datos consistentes, ≈30 con mucha dispersión). El resultado cae dentro de ese rango.</p><p>A mayor $\sigma$ o menor $d_T$, más réplicas se necesitan. Aquí se redondea al entero más cercano, como en el ejemplo de la clase ($5{,}1\Rightarrow5$); un criterio más conservador es redondear hacia arriba.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "n de la última iteración", r: "cat(2*qt(0.975, 18)^2*3^2/3.3^2)", esperado: 7.3, tol: 0.0050000010000000004 },
      { que: "n de la primera iteración", r: "cat(2*qt(0.975, 12)^2*3^2/3.3^2)", esperado: 7.85, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C7.2", loc: "slides 20–21" },
      { id: "C7.1", loc: "página 31" }
    ]
  },
  {
    id: "m18-d015",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c06",
    dificultad: 2,
    origen: "nueva",
    titulo: "Leer la salida de TukeyHSD (cuatro máquinas)",
    enunciado: String.raw`<p>Producción por hora de cuatro máquinas (3 mediciones cada una). Tras un ANOVA significativo se ejecutó la prueba de Tukey:</p><ol type="a"><li>¿Cuántas comparaciones se hacen y qué significa cada columna?</li><li>¿Qué pares difieren con $\alpha=5\,\%$? Indica dos formas de verlo en la salida.</li><li>Resume la conclusión y explica por qué se usa Tukey y no varias pruebas t.</li></ol>`,
    codigoR: `datos <- data.frame(
  respuesta = c(50, 52, 51, 55, 57, 56, 49, 50, 48, 54, 53, 55),
  maquina = factor(rep(c("M1", "M2", "M3", "M4"), each = 3)))
modelo <- aov(respuesta ~ maquina, data = datos)
TukeyHSD(modelo)`,
    salidaR: `  Tukey multiple comparisons of means
    95% family-wise confidence level

Fit: aov(formula = respuesta ~ maquina, data = datos)

$maquina
      diff        lwr        upr     p adj
M2-M1    5  2.3852905  7.6147095 0.0012710
M3-M1   -2 -4.6147095  0.6147095 0.1441838
M4-M1    3  0.3852905  5.6147095 0.0259193
M3-M2   -7 -9.6147095 -4.3852905 0.0001224
M4-M2   -2 -4.6147095  0.6147095 0.1441838
M4-M3    5  2.3852905  7.6147095 0.0012710`,
    salidaDe: `datos <- data.frame(
  respuesta = c(50, 52, 51, 55, 57, 56, 49, 50, 48, 54, 53, 55),
  maquina = factor(rep(c("M1", "M2", "M3", "M4"), each = 3)))
modelo <- aov(respuesta ~ maquina, data = datos)
TukeyHSD(modelo)`,
    partes: [
      { titulo: "a) Número de comparaciones y columnas", puntos: 1.5, solucion: String.raw`<p>$k(k-1)/2=4\cdot3/2=6$ comparaciones.</p><p><code>diff</code>: diferencia de medias, el primero del nombre de la fila menos el segundo (p. ej. <code>M2-M1</code> es $\bar y_{M2}-\bar y_{M1}$); <code>lwr</code> y <code>upr</code>: intervalo de confianza simultáneo de la diferencia; <code>p adj</code>: p-valor ajustado por comparaciones múltiples.</p>` },
      { titulo: "b) Pares que difieren", puntos: 2.5, solucion: String.raw`<p>Un par difiere si <code>p adj</code> $<0{,}05$ o, equivalentemente, si su intervalo <strong>no contiene el 0</strong>.</p><p>Difieren: M2–M1 (dif $=5$, p adj $=0{,}0013$); M4–M1 (dif $=3$, p adj $=0{,}0259$); M3–M2 (dif $=-7$, p adj $=0{,}0001$); M4–M3 (dif $=5$, p adj $=0{,}0013$).</p><p>No difieren: M3–M1 (p adj $=0{,}1442$, IC $[-4{,}61;\ 0{,}61]$ contiene el 0); M4–M2 (p adj $=0{,}1442$, IC $[-4{,}61;\ 0{,}61]$ contiene el 0).</p>` },
      { titulo: "c) Conclusión y por qué Tukey", puntos: 2, solucion: "<p>M2 y M4 producen más que M1 y M3. Dentro de cada pareja (M2 con M4, M1 con M3) Tukey no detecta diferencia, aunque el LSD sí lo haría: Tukey es más conservador.</p><p>Hacer varias pruebas t por separado infla la probabilidad de error tipo I global; Tukey controla la tasa de error <strong>por experimento</strong> (confianza grupal). El LSD de Fisher, con confianza individual, es más potente pero declara más diferencias falsas.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    fuente: [
      { id: "C7.2", loc: "slides 10–19" },
      { id: "S7.2", loc: "líneas 14–27" }
    ]
  },
  {
    id: "m18-d016",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c06",
    dificultad: 2,
    origen: "nueva",
    titulo: "Leer la salida de TukeyHSD (tres fertilizantes)",
    enunciado: String.raw`<p>Rendimiento (kg por parcela) con tres fertilizantes, 4 parcelas cada uno. Tras un ANOVA significativo se ejecutó la prueba de Tukey:</p><ol type="a"><li>¿Cuántas comparaciones se hacen y qué significa cada columna?</li><li>¿Qué pares difieren con $\alpha=5\,\%$? Indica dos formas de verlo en la salida.</li><li>Resume la conclusión y explica por qué se usa Tukey y no varias pruebas t.</li></ol>`,
    codigoR: `datos <- data.frame(
  respuesta = c(20, 22, 19, 23, 25, 27, 26, 30, 21, 20, 24, 23),
  fertilizante = factor(rep(c("A", "B", "C"), each = 4)))
modelo <- aov(respuesta ~ fertilizante, data = datos)
TukeyHSD(modelo)`,
    salidaR: `  Tukey multiple comparisons of means
    95% family-wise confidence level

Fit: aov(formula = respuesta ~ fertilizante, data = datos)

$fertilizante
    diff       lwr       upr     p adj
B-A    6  2.162755  9.837245 0.0046177
C-A    1 -2.837245  4.837245 0.7539302
C-B   -5 -8.837245 -1.162755 0.0135199`,
    salidaDe: `datos <- data.frame(
  respuesta = c(20, 22, 19, 23, 25, 27, 26, 30, 21, 20, 24, 23),
  fertilizante = factor(rep(c("A", "B", "C"), each = 4)))
modelo <- aov(respuesta ~ fertilizante, data = datos)
TukeyHSD(modelo)`,
    partes: [
      { titulo: "a) Número de comparaciones y columnas", puntos: 1.5, solucion: String.raw`<p>$k(k-1)/2=3\cdot2/2=3$ comparaciones.</p><p><code>diff</code>: diferencia de medias, el primero del nombre de la fila menos el segundo (p. ej. <code>B-A</code> es $\bar y_{B}-\bar y_{A}$); <code>lwr</code> y <code>upr</code>: intervalo de confianza simultáneo de la diferencia; <code>p adj</code>: p-valor ajustado por comparaciones múltiples.</p>` },
      { titulo: "b) Pares que difieren", puntos: 2.5, solucion: String.raw`<p>Un par difiere si <code>p adj</code> $<0{,}05$ o, equivalentemente, si su intervalo <strong>no contiene el 0</strong>.</p><p>Difieren: B–A (dif $=6$, p adj $=0{,}0046$); C–B (dif $=-5$, p adj $=0{,}0135$).</p><p>No difieren: C–A (p adj $=0{,}7539$, IC $[-2{,}84;\ 4{,}84]$ contiene el 0).</p>` },
      { titulo: "c) Conclusión y por qué Tukey", puntos: 2, solucion: "<p>El fertilizante B rinde más que A y que C; A y C no se distinguen. Se recomienda B.</p><p>Hacer varias pruebas t por separado infla la probabilidad de error tipo I global; Tukey controla la tasa de error <strong>por experimento</strong> (confianza grupal). El LSD de Fisher, con confianza individual, es más potente pero declara más diferencias falsas.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    fuente: [
      { id: "C7.2", loc: "slides 10–19" },
      { id: "S7.2", loc: "líneas 14–27" }
    ]
  }
]);
