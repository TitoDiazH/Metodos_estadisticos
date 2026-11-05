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
  },
  {
    id: "m18-d017",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c02",
    dificultad: 1,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 3, ej. 5 · Completar la tabla ANOVA",
    enunciado: `<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 3, ej. 5 del libro guía (Gutiérrez y de la Vara, 2.ª ed.).</p><p>A continuación se muestra parte del ANOVA para comparar cinco tratamientos con cuatro réplicas cada uno.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Tratamiento</td><td>$800$</td><td></td><td></td><td></td><td></td></tr><tr><td>Error</td><td>$400$</td><td></td><td></td><td></td><td></td></tr><tr><td>Total</td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table></div><ol type="a"><li>Agregue los grados de libertad, el cuadrado medio y la razón F.</li><li>Explique de manera esquemática cómo calcularía el valor-p.</li><li>¿Con la información disponible se puede concluir si hay diferencias significativas entre tratamientos? Argumente.</li><li>Anote el modelo estadístico y formule la hipótesis pertinente.</li></ol>`,
    partes: [
      { titulo: "a) Completar la tabla", puntos: 2, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th></tr></thead><tbody><tr><td>Tratamiento</td><td>$800$</td><td>$4$</td><td>$200$</td><td>$7{,}5$</td></tr><tr><td>Error</td><td>$400$</td><td>$15$</td><td>$26{,}667$</td><td></td></tr><tr><td>Total</td><td>$1200$</td><td>$19$</td><td></td><td></td></tr></tbody></table></div><p>gl: tratamientos $k-1=4$; error $N-k=20-5=15$; total $N-1=19$. $CM=SC/\text{gl}$ y $F_0=CM_{TRAT}/CM_E=200/26{,}667=7{,}5$.</p>` },
      { titulo: "b) Valor-p, esquemáticamente", puntos: 1.5, solucion: String.raw`<p>Bajo $H_0$, $F_0\sim F_{4,15}$. Se dibuja esa distribución, se marca $F_0=7{,}5$ y el valor-p es el área a su derecha: $P(F_{4,15}>7{,}5)=0{,}0016$. En R: pf(7.5, 4, 15, lower.tail = FALSE) .</p>` },
      { titulo: "c) ¿Hay diferencias?", puntos: 1.5, solucion: "<p>Sí: $F_0=7{,}5$ supera al crítico $F_{0{,}05;4,15}=3{,}06$ ($p=0{,}0016$), así que al 5 % se rechaza la igualdad de medias. Con la tabla no se puede decir <strong>cuáles</strong> difieren: para eso hacen falta las medias y una comparación múltiple (LSD, Tukey).</p>" },
      { titulo: "d) Modelo e hipótesis", puntos: 1, solucion: String.raw`<p>$Y_{ij}=\mu+\tau_i+\varepsilon_{ij}$, $i=1,\dots,5$, $j=1,\dots,4$, $\varepsilon_{ij}\sim N(0,\sigma^2)$. $H_0:\mu_1=\dots=\mu_5$ contra $H_1:\mu_i\neq\mu_j$ para algún par.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F", js: "(800/4)/(400/15)", esperado: 7.5, tol: 0.000500001 },
      { que: "valor-p", r: "cat(pf(7.5, 4, 15, lower.tail = FALSE))", esperado: 0.0016, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 3, ej. 5" },
      { id: "C7.1", loc: "páginas 36–41" }
    ]
  },
  {
    id: "m18-d018",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c06",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 3, ej. 10 · Mezclas y peso molecular",
    enunciado: `<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 3, ej. 10 del libro guía.</p><p>En una industria química se prueban cuatro mezclas, con cinco repeticiones cada una, para ver si difieren en el peso molecular final. El ANOVA da para el factor mezcla un valor-p de 0,01, y los promedios son: A = 10 000, B = 7 000, C = 8 000, D = 7 500.</p><ol type="a"><li>¿Las mezclas difieren de manera significativa en cuanto a su peso molecular?</li><li>Con el ANOVA y los promedios, ¿se puede asegurar que con la mezcla B se logra un menor peso molecular? Argumente.</li><li>Si no se cumple el supuesto de varianza constante entre las mezclas, ¿qué significa eso? ¿Se puede seguir apoyando la conclusión de a)?</li></ol>`,
    partes: [
      { titulo: "a) ¿Difieren?", puntos: 2, solucion: "<p>Sí, al 5 %: el valor-p (0,01) es menor que α = 0,05, así que se rechaza la igualdad de las cuatro medias. (Al 1 % quedaría justo en el límite.)</p>" },
      { titulo: "b) ¿B es la menor?", puntos: 2, solucion: "<p>No se puede asegurar solo con el ANOVA y los promedios. El ANOVA dice que <strong>al menos</strong> un par difiere, no cuál. Que B tenga el promedio más bajo no basta: B (7 000), D (7 500) y C (8 000) podrían no diferir entre sí. Hay que hacer una comparación múltiple (LSD o Tukey) con el CM del error; lo más probable es que A sea la que se separa.</p>" },
      { titulo: "c) Si falla la varianza constante", puntos: 2, solucion: "<p>Significa que las mezclas no solo afectan el peso medio, sino también su dispersión: algunas producen pesos más variables. El ANOVA supone varianza común, así que su valor-p ya no es confiable y la conclusión de a) queda en duda. Se corrige transformando la respuesta (logaritmo, raíz) o con un método robusto, y se repite el análisis.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    fuente: [
      { id: "LG", loc: "cap. 3, ej. 10" },
      { id: "C7.2", loc: "slides 10–19" }
    ]
  },
  {
    id: "m18-d019",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c03",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 3, ej. 12 · Tiempo de cocción de frijoles",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 3, ej. 12 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro.</p><p>Se comparan tratamientos que reducen el tiempo de cocción de frijoles crudos: Control (sin tratamiento), T2 (remojo con bicarbonato), T3 (remojo con sal común) y T4 (ambos en partes iguales). Respuesta: tiempo de cocción en minutos.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Réplica</th><th>Control</th><th>T2</th><th>T3</th><th>T4</th></tr></thead><tbody><tr><td>1</td><td>$213$</td><td>$76$</td><td>$57$</td><td>$84$</td></tr><tr><td>2</td><td>$214$</td><td>$85$</td><td>$67$</td><td>$82$</td></tr><tr><td>3</td><td>$204$</td><td>$74$</td><td>$55$</td><td>$85$</td></tr><tr><td>4</td><td>$208$</td><td>$78$</td><td>$64$</td><td>$92$</td></tr><tr><td>5</td><td>$212$</td><td>$82$</td><td>$61$</td><td>$87$</td></tr><tr><td>6</td><td>$200$</td><td>$75$</td><td>$63$</td><td>$79$</td></tr><tr><td>7</td><td>$207$</td><td>$82$</td><td>$63$</td><td>$90$</td></tr></tbody></table></div><p>Use $\alpha=0{,}05$.</p><ol type="a"><li>¿Cómo debe aleatorizar el experimentador? Formule el modelo y la hipótesis.</li><li>Calcule las sumas de cuadrados.</li><li>Construya la tabla ANOVA y pruebe la igualdad de medias.</li><li>¿Hay algún tratamiento mejor? ¿Cuál es el tiempo de cocción esperado con él?</li><li>¿Se cumplen los supuestos? Pruebe la igualdad de varianzas.</li></ol>`,
    codigoR: `y <- c(213, 214, 204, 208, 212, 200, 207, 76, 85, 74, 78, 82, 75, 82, 57, 67, 55, 64, 61, 63, 63, 84, 82, 85, 92, 87, 79, 90); trat <- factor(rep(c("Control", "T2", "T3", "T4"), c(7, 7, 7, 7)), levels = c("Control", "T2", "T3", "T4"))
modelo <- aov(y ~ trat)
summary(modelo)
agricolae::LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
bartlett.test(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value Pr(>F)    
trat         3  95041   31680    1559 <2e-16 ***
Residuals   24    488      20                   
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  20.32143 

trat,  means and individual ( 95 %) CI

                y      std r       se       LCL       UCL Min Max   Q25 Q50
Control 208.28571 5.122313 7 1.703837 204.76917 211.80226 200 214 205.5 208
T2       78.85714 4.180453 7 1.703837  75.34060  82.37369  74  85  75.5  78
T3       61.42857 4.157609 7 1.703837  57.91202  64.94512  55  67  59.0  63
T4       85.57143 4.503967 7 1.703837  82.05488  89.08798  79  92  83.0  85
          Q75
Control 212.5
T2       82.0
T3       63.5
T4       88.5

Alpha: 0.05 ; DF Error: 24
Critical Value of t: 2.063899 

least Significant Difference: 4.973149 

Treatments with the same letter are not significantly different.

                y groups
Control 208.28571      a
T4       85.57143      b
T2       78.85714      c
T3       61.42857      d

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.95991, p-value = 0.3469


	Bartlett test of homogeneity of variances

data:  y by trat
Bartlett's K-squared = 0.3302, df = 3, p-value = 0.9543`,
    salidaDe: `y <- c(213, 214, 204, 208, 212, 200, 207, 76, 85, 74, 78, 82, 75, 82, 57, 67, 55, 64, 61, 63, 63, 84, 82, 85, 92, 87, 79, 90); trat <- factor(rep(c("Control", "T2", "T3", "T4"), c(7, 7, 7, 7)), levels = c("Control", "T2", "T3", "T4"))
modelo <- aov(y ~ trat)
summary(modelo)
agricolae::LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
bartlett.test(y ~ trat)`,
    partes: [
      { titulo: "a) Modelo e hipótesis", puntos: 1, solucion: String.raw`<p>Se asigna al azar cada porción de frijoles a un tratamiento y se cocinan en orden aleatorio, con todo lo demás fijo (tipo y cantidad de frijol, volumen de agua, temperatura, olla). Diseño completamente al azar con un factor (tratamiento, $k=4$ niveles, $n=7$ réplicas). Modelo: $Y_{ij}=\mu+\tau_i+\varepsilon_{ij}$, $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes.</p><p>$H_0:\mu_1=\dots=\mu_4$ (el tratamiento no influye en la media de tiempo de cocción) contra $H_1:\mu_i\neq\mu_j$ para algún par.</p>` },
      { titulo: "b) Sumas de cuadrados con totales", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Control</th><th>T2</th><th>T3</th><th>T4</th><th>Total</th></tr></thead><tbody><tr><td>$Y_{i\cdot}$</td><td>$1458$</td><td>$552$</td><td>$430$</td><td>$599$</td><td>$3039$</td></tr><tr><td>$\bar Y_{i\cdot}$</td><td>$208{,}286$</td><td>$78{,}857$</td><td>$61{,}429$</td><td>$85{,}571$</td><td>$108{,}536$</td></tr></tbody></table></div><p>$N=28$, $\;Y_{\cdot\cdot}^2/N=3039^2/28=329840{,}036$, $\;\sum Y_{ij}^2=425369$.</p><p>$SC_T=425369-329840{,}036=95528{,}964$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{n}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{2974169}{7}-329840{,}036=95041{,}25$</p><p>$SC_E=SC_T-SC_{TRAT}=487{,}714$</p>` },
      { titulo: "c) Tabla ANOVA y decisión", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Tratamiento</td><td>$95041{,}25$</td><td>3</td><td>$31680{,}417$</td><td>$1558{,}97$</td><td>$\lt 0{,}0001$</td></tr><tr><td>Error</td><td>$487{,}714$</td><td>24</td><td>$20{,}321$</td><td></td><td></td></tr><tr><td>Total</td><td>$95528{,}964$</td><td>27</td><td></td><td></td><td></td></tr></tbody></table></div><p>$F_0=1558{,}97$ &gt; $F_{0{,}05;3,24}=3{,}01$ ($p\lt 0{,}0001$) ⇒ se <strong>rechaza</strong> $H_0$. Los tratamientos no dan todos el mismo tiempo de cocción.</p>` },
      { titulo: "d) Mejor tratamiento", puntos: 1, solucion: String.raw`<p>$LSD=t_{0{,}025;\,24}\sqrt{\dfrac{2\,CM_E}{n}}=2{,}064\sqrt{\dfrac{2\cdot20{,}3214}{7}}=4{,}973$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Par</th><th>$|\bar Y_i-\bar Y_j|$</th><th>LSD</th><th>¿Difieren?</th></tr></thead><tbody><tr><td>Control − T2</td><td>$129{,}429$</td><td>$4{,}973$</td><td>Sí</td></tr><tr><td>Control − T3</td><td>$146{,}857$</td><td>$4{,}973$</td><td>Sí</td></tr><tr><td>Control − T4</td><td>$122{,}714$</td><td>$4{,}973$</td><td>Sí</td></tr><tr><td>T2 − T3</td><td>$17{,}429$</td><td>$4{,}973$</td><td>Sí</td></tr><tr><td>T2 − T4</td><td>$6{,}714$</td><td>$4{,}973$</td><td>Sí</td></tr><tr><td>T3 − T4</td><td>$24{,}143$</td><td>$4{,}973$</td><td>Sí</td></tr></tbody></table></div><p>Se busca el menor tiempo: <strong>T3</strong> (remojo con sal) es significativamente más rápido que los demás; el tiempo esperado es su media, $\approx 61{,}4$ min. Antes de adoptarlo hay que revisar efectos colaterales (sabor, textura, sodio).</p>` },
      { titulo: "e) Supuestos", puntos: 1, solucion: "<p>Normalidad de los residuos (Shapiro–Wilk): $p=0{,}3469$ ⇒ no se rechaza la normalidad.</p><p>Varianza constante: Bartlett $p=0{,}9543$ y Levene $p=0{,}9201$ ⇒ no hay evidencia de varianzas distintas.</p><p>Gráficamente: QQ-plot de residuos, residuos contra predichos (sin forma de embudo) y residuos contra el orden de corrida (independencia).</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F (aov)", r: `cat({y <- c(213, 214, 204, 208, 212, 200, 207, 76, 85, 74, 78, 82, 75, 82, 57, 67, 55, 64, 61, 63, 63, 84, 82, 85, 92, 87, 79, 90); trat <- factor(rep(c("Control", "T2", "T3", "T4"), c(7, 7, 7, 7)), levels = c("Control", "T2", "T3", "T4")); summary(aov(y ~ trat))[[1]][1, 4]})`, esperado: 1558.966, tol: 0.000500001 },
      { que: "SC error (aov)", r: `cat({y <- c(213, 214, 204, 208, 212, 200, 207, 76, 85, 74, 78, 82, 75, 82, 57, 67, 55, 64, 61, 63, 63, 84, 82, 85, 92, 87, 79, 90); trat <- factor(rep(c("Control", "T2", "T3", "T4"), c(7, 7, 7, 7)), levels = c("Control", "T2", "T3", "T4")); summary(aov(y ~ trat))[[1]][2, 2]})`, esperado: 487.714, tol: 0.000500001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 3, ej. 12" },
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–19" }
    ]
  },
  {
    id: "m18-d020",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c03",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 3, ej. 13 · Temperatura y deterioro de tableros",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 3, ej. 13 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro.</p><p>Tableros electrónicos sometidos a envejecimiento acelerado durante 100 horas a distintas temperaturas; se mide la intensidad de corriente entre dos puntos (aumenta con el deterioro). 20 módulos repartidos en 5 temperaturas.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Réplica</th><th>20 °C</th><th>40 °C</th><th>60 °C</th><th>80 °C</th><th>100 °C</th></tr></thead><tbody><tr><td>1</td><td>$15$</td><td>$17$</td><td>$23$</td><td>$28$</td><td>$45$</td></tr><tr><td>2</td><td>$18$</td><td>$21$</td><td>$19$</td><td>$32$</td><td>$51$</td></tr><tr><td>3</td><td>$13$</td><td>$11$</td><td>$25$</td><td>$34$</td><td>$57$</td></tr><tr><td>4</td><td>$12$</td><td>$16$</td><td>$22$</td><td>$31$</td><td>$48$</td></tr></tbody></table></div><p>Use $\alpha=0{,}05$.</p><ol type="a"><li>Formule la hipótesis y el modelo.</li><li>Calcule las sumas de cuadrados.</li><li>Realice el ANOVA: ¿la temperatura afecta la intensidad promedio?</li><li>¿Qué temperaturas difieren?</li><li>¿La temperatura afecta la variabilidad de las intensidades?</li></ol>`,
    codigoR: `y <- c(15, 18, 13, 12, 17, 21, 11, 16, 23, 19, 25, 22, 28, 32, 34, 31, 45, 51, 57, 48); trat <- factor(rep(c("20 °C", "40 °C", "60 °C", "80 °C", "100 °C"), c(4, 4, 4, 4, 4)), levels = c("20 °C", "40 °C", "60 °C", "80 °C", "100 °C"))
modelo <- aov(y ~ trat)
summary(modelo)
agricolae::LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
bartlett.test(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value   Pr(>F)    
trat         4   3412   852.9   68.06 1.96e-09 ***
Residuals   15    188    12.5                     
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  12.53333 

trat,  means and individual ( 95 %) CI

           y      std r       se      LCL      UCL Min Max   Q25  Q50   Q75
100 °C 50.25 5.123475 4 1.770122 46.47707 54.02293  45  57 47.25 49.5 52.50
20 °C  14.50 2.645751 4 1.770122 10.72707 18.27293  12  18 12.75 14.0 15.75
40 °C  16.25 4.112988 4 1.770122 12.47707 20.02293  11  21 14.75 16.5 18.00
60 °C  22.25 2.500000 4 1.770122 18.47707 26.02293  19  25 21.25 22.5 23.50
80 °C  31.25 2.500000 4 1.770122 27.47707 35.02293  28  34 30.25 31.5 32.50

Alpha: 0.05 ; DF Error: 15
Critical Value of t: 2.13145 

least Significant Difference: 5.335724 

Treatments with the same letter are not significantly different.

           y groups
100 °C 50.25      a
80 °C  31.25      b
60 °C  22.25      c
40 °C  16.25      d
20 °C  14.50      d

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.97113, p-value = 0.7785


	Bartlett test of homogeneity of variances

data:  y by trat
Bartlett's K-squared = 2.4748, df = 4, p-value = 0.6492`,
    salidaDe: `y <- c(15, 18, 13, 12, 17, 21, 11, 16, 23, 19, 25, 22, 28, 32, 34, 31, 45, 51, 57, 48); trat <- factor(rep(c("20 °C", "40 °C", "60 °C", "80 °C", "100 °C"), c(4, 4, 4, 4, 4)), levels = c("20 °C", "40 °C", "60 °C", "80 °C", "100 °C"))
modelo <- aov(y ~ trat)
summary(modelo)
agricolae::LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
bartlett.test(y ~ trat)`,
    partes: [
      { titulo: "a) Modelo e hipótesis", puntos: 1, solucion: String.raw`<p>Diseño completamente al azar con un factor (temperatura, $k=5$ niveles, $n=4$ réplicas). Modelo: $Y_{ij}=\mu+\tau_i+\varepsilon_{ij}$, $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes.</p><p>$H_0:\mu_1=\dots=\mu_5$ (el temperatura no influye en la media de intensidad de corriente) contra $H_1:\mu_i\neq\mu_j$ para algún par.</p>` },
      { titulo: "b) Sumas de cuadrados con totales", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>20 °C</th><th>40 °C</th><th>60 °C</th><th>80 °C</th><th>100 °C</th><th>Total</th></tr></thead><tbody><tr><td>$Y_{i\cdot}$</td><td>$58$</td><td>$65$</td><td>$89$</td><td>$125$</td><td>$201$</td><td>$538$</td></tr><tr><td>$\bar Y_{i\cdot}$</td><td>$14{,}5$</td><td>$16{,}25$</td><td>$22{,}25$</td><td>$31{,}25$</td><td>$50{,}25$</td><td>$26{,}9$</td></tr></tbody></table></div><p>$N=20$, $\;Y_{\cdot\cdot}^2/N=538^2/20=14472{,}2$, $\;\sum Y_{ij}^2=18072$.</p><p>$SC_T=18072-14472{,}2=3599{,}8$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{n}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{71536}{4}-14472{,}2=3411{,}8$</p><p>$SC_E=SC_T-SC_{TRAT}=188$</p>` },
      { titulo: "c) Tabla ANOVA y decisión", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Temperatura</td><td>$3411{,}8$</td><td>4</td><td>$852{,}95$</td><td>$68{,}05$</td><td>$\lt 0{,}0001$</td></tr><tr><td>Error</td><td>$188$</td><td>15</td><td>$12{,}533$</td><td></td><td></td></tr><tr><td>Total</td><td>$3599{,}8$</td><td>19</td><td></td><td></td><td></td></tr></tbody></table></div><p>$F_0=68{,}05$ &gt; $F_{0{,}05;4,15}=3{,}06$ ($p\lt 0{,}0001$) ⇒ se <strong>rechaza</strong> $H_0$. La temperatura sí afecta la intensidad promedio: a mayor temperatura, mayor deterioro.</p>` },
      { titulo: "d) Comparaciones", puntos: 1, solucion: String.raw`<p>$LSD=t_{0{,}025;\,15}\sqrt{\dfrac{2\,CM_E}{n}}=2{,}131\sqrt{\dfrac{2\cdot12{,}5333}{4}}=5{,}336$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Par</th><th>$|\bar Y_i-\bar Y_j|$</th><th>LSD</th><th>¿Difieren?</th></tr></thead><tbody><tr><td>20 °C − 40 °C</td><td>$1{,}75$</td><td>$5{,}336$</td><td>No</td></tr><tr><td>20 °C − 60 °C</td><td>$7{,}75$</td><td>$5{,}336$</td><td>Sí</td></tr><tr><td>20 °C − 80 °C</td><td>$16{,}75$</td><td>$5{,}336$</td><td>Sí</td></tr><tr><td>20 °C − 100 °C</td><td>$35{,}75$</td><td>$5{,}336$</td><td>Sí</td></tr><tr><td>40 °C − 60 °C</td><td>$6$</td><td>$5{,}336$</td><td>Sí</td></tr><tr><td>40 °C − 80 °C</td><td>$15$</td><td>$5{,}336$</td><td>Sí</td></tr><tr><td>40 °C − 100 °C</td><td>$34$</td><td>$5{,}336$</td><td>Sí</td></tr><tr><td>60 °C − 80 °C</td><td>$9$</td><td>$5{,}336$</td><td>Sí</td></tr><tr><td>60 °C − 100 °C</td><td>$28$</td><td>$5{,}336$</td><td>Sí</td></tr><tr><td>80 °C − 100 °C</td><td>$19$</td><td>$5{,}336$</td><td>Sí</td></tr></tbody></table></div><p>Las medias crecen con la temperatura. Todas las temperaturas difieren entre sí, salvo 20 °C y 40 °C; 100 °C se separa claramente de todas.</p>` },
      { titulo: "e) ¿Afecta la variabilidad?", puntos: 1, solucion: "<p>Normalidad de los residuos (Shapiro–Wilk): $p=0{,}7785$ ⇒ no se rechaza la normalidad.</p><p>Varianza constante: Bartlett $p=0{,}6492$ y Levene $p=0{,}616$ ⇒ no hay evidencia de varianzas distintas.</p><p>Las pruebas de igualdad de varianzas responden directamente esta pregunta: si se rechazara, la temperatura afectaría también la dispersión del deterioro, no solo su media.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F (aov)", r: `cat({y <- c(15, 18, 13, 12, 17, 21, 11, 16, 23, 19, 25, 22, 28, 32, 34, 31, 45, 51, 57, 48); trat <- factor(rep(c("20 °C", "40 °C", "60 °C", "80 °C", "100 °C"), c(4, 4, 4, 4, 4)), levels = c("20 °C", "40 °C", "60 °C", "80 °C", "100 °C")); summary(aov(y ~ trat))[[1]][1, 4]})`, esperado: 68.055, tol: 0.000500001 },
      { que: "SC error (aov)", r: `cat({y <- c(15, 18, 13, 12, 17, 21, 11, 16, 23, 19, 25, 22, 28, 32, 34, 31, 45, 51, 57, 48); trat <- factor(rep(c("20 °C", "40 °C", "60 °C", "80 °C", "100 °C"), c(4, 4, 4, 4, 4)), levels = c("20 °C", "40 °C", "60 °C", "80 °C", "100 °C")); summary(aov(y ~ trat))[[1]][2, 2]})`, esperado: 188, tol: 0.000500001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 3, ej. 13" },
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–19" }
    ]
  },
  {
    id: "m18-d021",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c03",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 3, ej. 15 · Almidón y dureza de tabletas",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 3, ej. 15 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro.</p><p>Una farmacéutica evalúa el efecto de la cantidad de almidón (2 %, 5 % y 10 %) en la dureza de las tabletas. Respuesta: dureza promedio de 20 tabletas de cada lote; 4 réplicas por tratamiento.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Réplica</th><th>2 %</th><th>5 %</th><th>10 %</th></tr></thead><tbody><tr><td>1</td><td>$4{,}3$</td><td>$6{,}5$</td><td>$9$</td></tr><tr><td>2</td><td>$5{,}2$</td><td>$7{,}3$</td><td>$7{,}8$</td></tr><tr><td>3</td><td>$4{,}8$</td><td>$6{,}9$</td><td>$8{,}5$</td></tr><tr><td>4</td><td>$4{,}5$</td><td>$6{,}1$</td><td>$8{,}1$</td></tr></tbody></table></div><p>Use $\alpha=0{,}05$.</p><ol type="a"><li>Formule el modelo y la hipótesis.</li><li>Calcule las sumas de cuadrados.</li><li>¿Hay evidencia de que el almidón influye en la dureza? Halle el ANOVA.</li><li>Realice los análisis complementarios. Si se desea maximizar la dureza, ¿qué recomendaría?</li><li>Verifique los supuestos.</li></ol>`,
    codigoR: `y <- c(4.3, 5.2, 4.8, 4.5, 6.5, 7.3, 6.9, 6.1, 9, 7.8, 8.5, 8.1); trat <- factor(rep(c("2 %", "5 %", "10 %"), c(4, 4, 4)), levels = c("2 %", "5 %", "10 %"))
modelo <- aov(y ~ trat)
summary(modelo)
agricolae::LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
bartlett.test(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value   Pr(>F)    
trat         2  26.73   13.36    58.1 7.16e-06 ***
Residuals    9   2.07    0.23                     
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  0.23 

trat,  means and individual ( 95 %) CI

        y       std r        se      LCL      UCL Min Max   Q25  Q50   Q75
10 % 8.35 0.5196152 4 0.2397916 7.807554 8.892446 7.8 9.0 8.025 8.30 8.625
2 %  4.70 0.3915780 4 0.2397916 4.157554 5.242446 4.3 5.2 4.450 4.65 4.900
5 %  6.70 0.5163978 4 0.2397916 6.157554 7.242446 6.1 7.3 6.400 6.70 7.000

Alpha: 0.05 ; DF Error: 9
Critical Value of t: 2.262157 

least Significant Difference: 0.7671348 

Treatments with the same letter are not significantly different.

        y groups
10 % 8.35      a
5 %  6.70      b
2 %  4.70      c

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.93444, p-value = 0.4295


	Bartlett test of homogeneity of variances

data:  y by trat
Bartlett's K-squared = 0.25398, df = 2, p-value = 0.8807`,
    salidaDe: `y <- c(4.3, 5.2, 4.8, 4.5, 6.5, 7.3, 6.9, 6.1, 9, 7.8, 8.5, 8.1); trat <- factor(rep(c("2 %", "5 %", "10 %"), c(4, 4, 4)), levels = c("2 %", "5 %", "10 %"))
modelo <- aov(y ~ trat)
summary(modelo)
agricolae::LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
bartlett.test(y ~ trat)`,
    partes: [
      { titulo: "a) Modelo e hipótesis", puntos: 1, solucion: String.raw`<p>Diseño completamente al azar con un factor (porcentaje de almidón, $k=3$ niveles, $n=4$ réplicas). Modelo: $Y_{ij}=\mu+\tau_i+\varepsilon_{ij}$, $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes.</p><p>$H_0:\mu_1=\dots=\mu_3$ (el porcentaje de almidón no influye en la media de dureza) contra $H_1:\mu_i\neq\mu_j$ para algún par.</p>` },
      { titulo: "b) Sumas de cuadrados con totales", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>2 %</th><th>5 %</th><th>10 %</th><th>Total</th></tr></thead><tbody><tr><td>$Y_{i\cdot}$</td><td>$18{,}8$</td><td>$26{,}8$</td><td>$33{,}4$</td><td>$79$</td></tr><tr><td>$\bar Y_{i\cdot}$</td><td>$4{,}7$</td><td>$6{,}7$</td><td>$8{,}35$</td><td>$6{,}583$</td></tr></tbody></table></div><p>$N=12$, $\;Y_{\cdot\cdot}^2/N=79^2/12=520{,}083$, $\;\sum Y_{ij}^2=548{,}88$.</p><p>$SC_T=548{,}88-520{,}083=28{,}797$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{n}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{2187{,}24}{4}-520{,}083=26{,}727$</p><p>$SC_E=SC_T-SC_{TRAT}=2{,}07$</p>` },
      { titulo: "c) Tabla ANOVA y decisión", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Almidón</td><td>$26{,}727$</td><td>2</td><td>$13{,}363$</td><td>$58{,}1$</td><td>$\lt 0{,}0001$</td></tr><tr><td>Error</td><td>$2{,}07$</td><td>9</td><td>$0{,}23$</td><td></td><td></td></tr><tr><td>Total</td><td>$28{,}797$</td><td>11</td><td></td><td></td><td></td></tr></tbody></table></div><p>$F_0=58{,}1$ &gt; $F_{0{,}05;2,9}=4{,}26$ ($p\lt 0{,}0001$) ⇒ se <strong>rechaza</strong> $H_0$. El porcentaje de almidón influye en la dureza.</p>` },
      { titulo: "d) Comparaciones y recomendación", puntos: 1, solucion: String.raw`<p>$LSD=t_{0{,}025;\,9}\sqrt{\dfrac{2\,CM_E}{n}}=2{,}262\sqrt{\dfrac{2\cdot0{,}23}{4}}=0{,}767$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Par</th><th>$|\bar Y_i-\bar Y_j|$</th><th>LSD</th><th>¿Difieren?</th></tr></thead><tbody><tr><td>2 % − 5 %</td><td>$2$</td><td>$0{,}767$</td><td>Sí</td></tr><tr><td>2 % − 10 %</td><td>$3{,}65$</td><td>$0{,}767$</td><td>Sí</td></tr><tr><td>5 % − 10 %</td><td>$1{,}65$</td><td>$0{,}767$</td><td>Sí</td></tr></tbody></table></div><p>Los tres niveles difieren entre sí. Para maximizar la dureza se recomienda <strong>10 %</strong> de almidón (media $\approx 8{,}35$).</p>` },
      { titulo: "e) Supuestos", puntos: 1, solucion: "<p>Normalidad de los residuos (Shapiro–Wilk): $p=0{,}4295$ ⇒ no se rechaza la normalidad.</p><p>Varianza constante: Bartlett $p=0{,}8807$ y Levene $p=0{,}7718$ ⇒ no hay evidencia de varianzas distintas.</p><p>Gráficamente: QQ-plot de residuos, residuos contra predichos (sin forma de embudo) y residuos contra el orden de corrida (independencia).</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F (aov)", r: `cat({y <- c(4.3, 5.2, 4.8, 4.5, 6.5, 7.3, 6.9, 6.1, 9, 7.8, 8.5, 8.1); trat <- factor(rep(c("2 %", "5 %", "10 %"), c(4, 4, 4)), levels = c("2 %", "5 %", "10 %")); summary(aov(y ~ trat))[[1]][1, 4]})`, esperado: 58.101, tol: 0.000500001 },
      { que: "SC error (aov)", r: `cat({y <- c(4.3, 5.2, 4.8, 4.5, 6.5, 7.3, 6.9, 6.1, 9, 7.8, 8.5, 8.1); trat <- factor(rep(c("2 %", "5 %", "10 %"), c(4, 4, 4)), levels = c("2 %", "5 %", "10 %")); summary(aov(y ~ trat))[[1]][2, 2]})`, esperado: 2.07, tol: 0.000500001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 3, ej. 15" },
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–19" }
    ]
  },
  {
    id: "m18-d022",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c03",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 3, ej. 18 · Clonas de agave",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 3, ej. 18 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro.</p><p>Se cultivaron cuatro clonas de agave tequilana bajo un mismo manejo; se mide el porcentaje de azúcares reductores totales (mayor es mejor).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Réplica</th><th>Clona 1</th><th>Clona 2</th><th>Clona 3</th><th>Clona 4</th></tr></thead><tbody><tr><td>1</td><td>$8{,}69$</td><td>$8$</td><td>$17{,}39$</td><td>$10{,}37$</td></tr><tr><td>2</td><td>$6{,}68$</td><td>$16{,}41$</td><td>$13{,}73$</td><td>$9{,}16$</td></tr><tr><td>3</td><td>$6{,}83$</td><td>$12{,}43$</td><td>$15{,}62$</td><td>$8{,}13$</td></tr><tr><td>4</td><td>$6{,}43$</td><td>$10{,}99$</td><td>$17{,}05$</td><td>$4{,}4$</td></tr><tr><td>5</td><td>$10{,}3$</td><td>$15{,}53$</td><td>$15{,}42$</td><td>$10{,}38$</td></tr></tbody></table></div><p>Use $\alpha=0{,}05$.</p><ol type="a"><li>Formule el modelo y la hipótesis.</li><li>Calcule las sumas de cuadrados.</li><li>Compare las medias de las clonas mediante ANOVA.</li><li>¿Hay una clona que respondió mejor? Si hay un empate estadístico, ¿qué propondría para desempatar?</li><li>Verifique los residuos.</li></ol>`,
    codigoR: `y <- c(8.69, 6.68, 6.83, 6.43, 10.3, 8, 16.41, 12.43, 10.99, 15.53, 17.39, 13.73, 15.62, 17.05, 15.42, 10.37, 9.16, 8.13, 4.4, 10.38); trat <- factor(rep(c("Clona 1", "Clona 2", "Clona 3", "Clona 4"), c(5, 5, 5, 5)), levels = c("Clona 1", "Clona 2", "Clona 3", "Clona 4"))
modelo <- aov(y ~ trat)
summary(modelo)
agricolae::LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
bartlett.test(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value   Pr(>F)    
trat         3 213.63   71.21   12.53 0.000181 ***
Residuals   16  90.93    5.68                     
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  5.682872 

trat,  means and individual ( 95 %) CI

             y      std r       se       LCL      UCL   Min   Max   Q25   Q50
Clona 1  7.786 1.666832 5 1.066102  5.525964 10.04604  6.43 10.30  6.68  6.83
Clona 2 12.672 3.422575 5 1.066102 10.411964 14.93204  8.00 16.41 10.99 12.43
Clona 3 15.842 1.461462 5 1.066102 13.581964 18.10204 13.73 17.39 15.42 15.62
Clona 4  8.488 2.470480 5 1.066102  6.227964 10.74804  4.40 10.38  8.13  9.16
          Q75
Clona 1  8.69
Clona 2 15.53
Clona 3 17.05
Clona 4 10.37

Alpha: 0.05 ; DF Error: 16
Critical Value of t: 2.119905 

least Significant Difference: 3.196174 

Treatments with the same letter are not significantly different.

             y groups
Clona 3 15.842      a
Clona 2 12.672      a
Clona 4  8.488      b
Clona 1  7.786      b

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.97211, p-value = 0.7987


	Bartlett test of homogeneity of variances

data:  y by trat
Bartlett's K-squared = 3.2585, df = 3, p-value = 0.3535`,
    salidaDe: `y <- c(8.69, 6.68, 6.83, 6.43, 10.3, 8, 16.41, 12.43, 10.99, 15.53, 17.39, 13.73, 15.62, 17.05, 15.42, 10.37, 9.16, 8.13, 4.4, 10.38); trat <- factor(rep(c("Clona 1", "Clona 2", "Clona 3", "Clona 4"), c(5, 5, 5, 5)), levels = c("Clona 1", "Clona 2", "Clona 3", "Clona 4"))
modelo <- aov(y ~ trat)
summary(modelo)
agricolae::LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
bartlett.test(y ~ trat)`,
    partes: [
      { titulo: "a) Modelo e hipótesis", puntos: 1, solucion: String.raw`<p>Diseño completamente al azar con un factor (tipo de clona, $k=4$ niveles, $n=5$ réplicas). Modelo: $Y_{ij}=\mu+\tau_i+\varepsilon_{ij}$, $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes.</p><p>$H_0:\mu_1=\dots=\mu_4$ (el tipo de clona no influye en la media de % de azúcares reductores) contra $H_1:\mu_i\neq\mu_j$ para algún par.</p>` },
      { titulo: "b) Sumas de cuadrados con totales", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Clona 1</th><th>Clona 2</th><th>Clona 3</th><th>Clona 4</th><th>Total</th></tr></thead><tbody><tr><td>$Y_{i\cdot}$</td><td>$38{,}93$</td><td>$63{,}36$</td><td>$79{,}21$</td><td>$42{,}44$</td><td>$223{,}94$</td></tr><tr><td>$\bar Y_{i\cdot}$</td><td>$7{,}786$</td><td>$12{,}672$</td><td>$15{,}842$</td><td>$8{,}488$</td><td>$11{,}197$</td></tr></tbody></table></div><p>$N=20$, $\;Y_{\cdot\cdot}^2/N=223{,}94^2/20=2507{,}456$, $\;\sum Y_{ij}^2=2812{,}008$.</p><p>$SC_T=2812{,}008-2507{,}456=304{,}552$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{n}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{13605{,}412}{5}-2507{,}456=213{,}626$</p><p>$SC_E=SC_T-SC_{TRAT}=90{,}926$</p>` },
      { titulo: "c) Tabla ANOVA y decisión", puntos: 1.5, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Clona</td><td>$213{,}626$</td><td>3</td><td>$71{,}209$</td><td>$12{,}53$</td><td>$0{,}0002$</td></tr><tr><td>Error</td><td>$90{,}926$</td><td>16</td><td>$5{,}683$</td><td></td><td></td></tr><tr><td>Total</td><td>$304{,}552$</td><td>19</td><td></td><td></td><td></td></tr></tbody></table></div><p>$F_0=12{,}53$ &gt; $F_{0{,}05;3,16}=3{,}24$ ($p=0{,}0002$) ⇒ se <strong>rechaza</strong> $H_0$. Las clonas no responden igual al manejo.</p>` },
      { titulo: "d) ¿Hay una clona mejor?", puntos: 1, solucion: String.raw`<p>$LSD=t_{0{,}025;\,16}\sqrt{\dfrac{2\,CM_E}{n}}=2{,}12\sqrt{\dfrac{2\cdot5{,}6829}{5}}=3{,}196$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Par</th><th>$|\bar Y_i-\bar Y_j|$</th><th>LSD</th><th>¿Difieren?</th></tr></thead><tbody><tr><td>Clona 1 − Clona 2</td><td>$4{,}886$</td><td>$3{,}196$</td><td>Sí</td></tr><tr><td>Clona 1 − Clona 3</td><td>$8{,}056$</td><td>$3{,}196$</td><td>Sí</td></tr><tr><td>Clona 1 − Clona 4</td><td>$0{,}702$</td><td>$3{,}196$</td><td>No</td></tr><tr><td>Clona 2 − Clona 3</td><td>$3{,}17$</td><td>$3{,}196$</td><td>No</td></tr><tr><td>Clona 2 − Clona 4</td><td>$4{,}184$</td><td>$3{,}196$</td><td>Sí</td></tr><tr><td>Clona 3 − Clona 4</td><td>$7{,}354$</td><td>$3{,}196$</td><td>Sí</td></tr></tbody></table></div><p>La clona 3 tiene la media más alta y difiere de las clonas 1 y 4, pero <strong>no</strong> de la clona 2: hay un empate estadístico entre 3 y 2. Para desempatar: más réplicas, otros criterios (costo, rendimiento en campo, variabilidad) o un segundo experimento solo con esas dos.</p>` },
      { titulo: "e) Supuestos", puntos: 1, solucion: "<p>Normalidad de los residuos (Shapiro–Wilk): $p=0{,}7987$ ⇒ no se rechaza la normalidad.</p><p>Varianza constante: Bartlett $p=0{,}3535$ y Levene $p=0{,}4176$ ⇒ no hay evidencia de varianzas distintas.</p><p>Gráficamente: QQ-plot de residuos, residuos contra predichos (sin forma de embudo) y residuos contra el orden de corrida (independencia).</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F (aov)", r: `cat({y <- c(8.69, 6.68, 6.83, 6.43, 10.3, 8, 16.41, 12.43, 10.99, 15.53, 17.39, 13.73, 15.62, 17.05, 15.42, 10.37, 9.16, 8.13, 4.4, 10.38); trat <- factor(rep(c("Clona 1", "Clona 2", "Clona 3", "Clona 4"), c(5, 5, 5, 5)), levels = c("Clona 1", "Clona 2", "Clona 3", "Clona 4")); summary(aov(y ~ trat))[[1]][1, 4]})`, esperado: 12.53, tol: 0.000500001 },
      { que: "SC error (aov)", r: `cat({y <- c(8.69, 6.68, 6.83, 6.43, 10.3, 8, 16.41, 12.43, 10.99, 15.53, 17.39, 13.73, 15.62, 17.05, 15.42, 10.37, 9.16, 8.13, 4.4, 10.38); trat <- factor(rep(c("Clona 1", "Clona 2", "Clona 3", "Clona 4"), c(5, 5, 5, 5)), levels = c("Clona 1", "Clona 2", "Clona 3", "Clona 4")); summary(aov(y ~ trat))[[1]][2, 2]})`, esperado: 90.926, tol: 0.000500001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 3, ej. 18" },
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–19" }
    ]
  },
  {
    id: "m18-d023",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 3, ej. 15" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 3, ej. 15 · Almidón y dureza (variante)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 3, ej. 15 del libro guía. Cambio respecto del original: otros valores de dureza, con el 5 % y el 10 % más cercanos.</p><p>Misma situación del ejercicio 15: dureza promedio de tabletas con 2 %, 5 % y 10 % de almidón, 4 réplicas por nivel.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Réplica</th><th>2 %</th><th>5 %</th><th>10 %</th></tr></thead><tbody><tr><td>1</td><td>$4{,}6$</td><td>$7{,}4$</td><td>$7{,}9$</td></tr><tr><td>2</td><td>$5{,}3$</td><td>$7{,}9$</td><td>$7{,}6$</td></tr><tr><td>3</td><td>$4{,}9$</td><td>$6{,}8$</td><td>$8$</td></tr><tr><td>4</td><td>$5$</td><td>$7{,}5$</td><td>$7{,}7$</td></tr></tbody></table></div><p>Use $\alpha=0{,}05$.</p><ol type="a"><li>Formule el modelo y la hipótesis.</li><li>Calcule las sumas de cuadrados.</li><li>Halle el ANOVA.</li><li>Compare con LSD. Si se desea maximizar la dureza, ¿qué recomendaría?</li><li>Verifique los supuestos.</li></ol>`,
    codigoR: `y <- c(4.6, 5.3, 4.9, 5, 7.4, 7.9, 6.8, 7.5, 7.9, 7.6, 8, 7.7); trat <- factor(rep(c("2 %", "5 %", "10 %"), c(4, 4, 4)), levels = c("2 %", "5 %", "10 %"))
modelo <- aov(y ~ trat)
summary(modelo)
agricolae::LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
bartlett.test(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value   Pr(>F)    
trat         2  19.05   9.523   88.36 1.21e-06 ***
Residuals    9   0.97   0.108                     
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  0.1077778 

trat,  means and individual ( 95 %) CI

        y       std r        se      LCL      UCL Min Max   Q25  Q50   Q75
10 % 7.80 0.1825742 4 0.1641476 7.428672 8.171328 7.6 8.0 7.675 7.80 7.925
2 %  4.95 0.2886751 4 0.1641476 4.578672 5.321328 4.6 5.3 4.825 4.95 5.075
5 %  7.40 0.4546061 4 0.1641476 7.028672 7.771328 6.8 7.9 7.250 7.45 7.600

Alpha: 0.05 ; DF Error: 9
Critical Value of t: 2.262157 

least Significant Difference: 0.5251367 

Treatments with the same letter are not significantly different.

        y groups
10 % 7.80      a
5 %  7.40      a
2 %  4.95      b

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.98194, p-value = 0.9902


	Bartlett test of homogeneity of variances

data:  y by trat
Bartlett's K-squared = 2.0373, df = 2, p-value = 0.3611`,
    salidaDe: `y <- c(4.6, 5.3, 4.9, 5, 7.4, 7.9, 6.8, 7.5, 7.9, 7.6, 8, 7.7); trat <- factor(rep(c("2 %", "5 %", "10 %"), c(4, 4, 4)), levels = c("2 %", "5 %", "10 %"))
modelo <- aov(y ~ trat)
summary(modelo)
agricolae::LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
bartlett.test(y ~ trat)`,
    partes: [
      { titulo: "a) Modelo e hipótesis", puntos: 1, solucion: String.raw`<p>Diseño completamente al azar con un factor (porcentaje de almidón, $k=3$ niveles, $n=4$ réplicas). Modelo: $Y_{ij}=\mu+\tau_i+\varepsilon_{ij}$, $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes.</p><p>$H_0:\mu_1=\dots=\mu_3$ (el porcentaje de almidón no influye en la media de dureza) contra $H_1:\mu_i\neq\mu_j$ para algún par.</p>` },
      { titulo: "b) Sumas de cuadrados con totales", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>2 %</th><th>5 %</th><th>10 %</th><th>Total</th></tr></thead><tbody><tr><td>$Y_{i\cdot}$</td><td>$19{,}8$</td><td>$29{,}6$</td><td>$31{,}2$</td><td>$80{,}6$</td></tr><tr><td>$\bar Y_{i\cdot}$</td><td>$4{,}95$</td><td>$7{,}4$</td><td>$7{,}8$</td><td>$6{,}717$</td></tr></tbody></table></div><p>$N=12$, $\;Y_{\cdot\cdot}^2/N=80{,}6^2/12=541{,}363$, $\;\sum Y_{ij}^2=561{,}38$.</p><p>$SC_T=561{,}38-541{,}363=20{,}017$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{n}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{2241{,}64}{4}-541{,}363=19{,}047$</p><p>$SC_E=SC_T-SC_{TRAT}=0{,}97$</p>` },
      { titulo: "c) Tabla ANOVA y decisión", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Almidón</td><td>$19{,}047$</td><td>2</td><td>$9{,}523$</td><td>$88{,}36$</td><td>$\lt 0{,}0001$</td></tr><tr><td>Error</td><td>$0{,}97$</td><td>9</td><td>$0{,}108$</td><td></td><td></td></tr><tr><td>Total</td><td>$20{,}017$</td><td>11</td><td></td><td></td><td></td></tr></tbody></table></div><p>$F_0=88{,}36$ &gt; $F_{0{,}05;2,9}=4{,}26$ ($p\lt 0{,}0001$) ⇒ se <strong>rechaza</strong> $H_0$. El porcentaje de almidón influye en la dureza.</p>` },
      { titulo: "d) Comparaciones y recomendación", puntos: 1, solucion: String.raw`<p>$LSD=t_{0{,}025;\,9}\sqrt{\dfrac{2\,CM_E}{n}}=2{,}262\sqrt{\dfrac{2\cdot0{,}1078}{4}}=0{,}525$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Par</th><th>$|\bar Y_i-\bar Y_j|$</th><th>LSD</th><th>¿Difieren?</th></tr></thead><tbody><tr><td>2 % − 5 %</td><td>$2{,}45$</td><td>$0{,}525$</td><td>Sí</td></tr><tr><td>2 % − 10 %</td><td>$2{,}85$</td><td>$0{,}525$</td><td>Sí</td></tr><tr><td>5 % − 10 %</td><td>$0{,}4$</td><td>$0{,}525$</td><td>No</td></tr></tbody></table></div><p>El 5 % y el 10 % <strong>no</strong> difieren: conviene el <strong>5 %</strong>, misma dureza estadística con menos almidón (más barato). Elegir el promedio más alto (10 %) sin mirar la LSD sería un error típico.</p>` },
      { titulo: "e) Supuestos", puntos: 1, solucion: "<p>Normalidad de los residuos (Shapiro–Wilk): $p=0{,}9902$ ⇒ no se rechaza la normalidad.</p><p>Varianza constante: Bartlett $p=0{,}3611$ y Levene $p=0{,}5859$ ⇒ no hay evidencia de varianzas distintas.</p><p>Gráficamente: QQ-plot de residuos, residuos contra predichos (sin forma de embudo) y residuos contra el orden de corrida (independencia).</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F (aov)", r: `cat({y <- c(4.6, 5.3, 4.9, 5, 7.4, 7.9, 6.8, 7.5, 7.9, 7.6, 8, 7.7); trat <- factor(rep(c("2 %", "5 %", "10 %"), c(4, 4, 4)), levels = c("2 %", "5 %", "10 %")); summary(aov(y ~ trat))[[1]][1, 4]})`, esperado: 88.361, tol: 0.000500001 },
      { que: "SC error (aov)", r: `cat({y <- c(4.6, 5.3, 4.9, 5, 7.4, 7.9, 6.8, 7.5, 7.9, 7.6, 8, 7.7); trat <- factor(rep(c("2 %", "5 %", "10 %"), c(4, 4, 4)), levels = c("2 %", "5 %", "10 %")); summary(aov(y ~ trat))[[1]][2, 2]})`, esperado: 0.97, tol: 0.000500001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 3, ej. 15" },
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–19" }
    ]
  },
  {
    id: "m18-d024",
    modulo: "m18-anova-un-factor",
    concepto: "m18-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 3, ej. 12" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 3, ej. 12 · Cocción de frijoles (variante)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 3, ej. 12 del libro guía. Cambio respecto del original: solo 5 réplicas por tratamiento y otros tiempos.</p><p>Misma situación del ejercicio 12 (tiempo de cocción de frijoles en minutos), ahora con 5 réplicas por tratamiento.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Réplica</th><th>Control</th><th>T2</th><th>T3</th><th>T4</th></tr></thead><tbody><tr><td>1</td><td>$205$</td><td>$80$</td><td>$70$</td><td>$83$</td></tr><tr><td>2</td><td>$198$</td><td>$72$</td><td>$75$</td><td>$88$</td></tr><tr><td>3</td><td>$210$</td><td>$77$</td><td>$66$</td><td>$80$</td></tr><tr><td>4</td><td>$202$</td><td>$84$</td><td>$73$</td><td>$86$</td></tr><tr><td>5</td><td>$207$</td><td>$79$</td><td>$71$</td><td>$82$</td></tr></tbody></table></div><p>Use $\alpha=0{,}05$.</p><ol type="a"><li>Formule el modelo y la hipótesis.</li><li>Calcule las sumas de cuadrados.</li><li>Construya la tabla ANOVA.</li><li>¿Hay algún tratamiento mejor?</li><li>Verifique los supuestos.</li></ol>`,
    codigoR: `y <- c(205, 198, 210, 202, 207, 80, 72, 77, 84, 79, 70, 75, 66, 73, 71, 83, 88, 80, 86, 82); trat <- factor(rep(c("Control", "T2", "T3", "T4"), c(5, 5, 5, 5)), levels = c("Control", "T2", "T3", "T4"))
modelo <- aov(y ~ trat)
summary(modelo)
agricolae::LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
bartlett.test(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value Pr(>F)    
trat         3  60580   20193    1297 <2e-16 ***
Residuals   16    249      16                   
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  15.575 

trat,  means and individual ( 95 %) CI

            y      std r       se      LCL      UCL Min Max Q25 Q50 Q75
Control 204.4 4.615192 5 1.764936 200.6585 208.1415 198 210 202 205 207
T2       78.4 4.393177 5 1.764936  74.6585  82.1415  72  84  77  79  80
T3       71.0 3.391165 5 1.764936  67.2585  74.7415  66  75  70  71  73
T4       83.8 3.193744 5 1.764936  80.0585  87.5415  80  88  82  83  86

Alpha: 0.05 ; DF Error: 16
Critical Value of t: 2.119905 

least Significant Difference: 5.291277 

Treatments with the same letter are not significantly different.

            y groups
Control 204.4      a
T4       83.8      b
T2       78.4      c
T3       71.0      d

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.96331, p-value = 0.6118


	Bartlett test of homogeneity of variances

data:  y by trat
Bartlett's K-squared = 0.72135, df = 3, p-value = 0.8682`,
    salidaDe: `y <- c(205, 198, 210, 202, 207, 80, 72, 77, 84, 79, 70, 75, 66, 73, 71, 83, 88, 80, 86, 82); trat <- factor(rep(c("Control", "T2", "T3", "T4"), c(5, 5, 5, 5)), levels = c("Control", "T2", "T3", "T4"))
modelo <- aov(y ~ trat)
summary(modelo)
agricolae::LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
bartlett.test(y ~ trat)`,
    partes: [
      { titulo: "a) Modelo e hipótesis", puntos: 1, solucion: String.raw`<p>Diseño completamente al azar con un factor (tratamiento, $k=4$ niveles, $n=5$ réplicas). Modelo: $Y_{ij}=\mu+\tau_i+\varepsilon_{ij}$, $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes.</p><p>$H_0:\mu_1=\dots=\mu_4$ (el tratamiento no influye en la media de tiempo de cocción) contra $H_1:\mu_i\neq\mu_j$ para algún par.</p>` },
      { titulo: "b) Sumas de cuadrados con totales", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Control</th><th>T2</th><th>T3</th><th>T4</th><th>Total</th></tr></thead><tbody><tr><td>$Y_{i\cdot}$</td><td>$1022$</td><td>$392$</td><td>$355$</td><td>$419$</td><td>$2188$</td></tr><tr><td>$\bar Y_{i\cdot}$</td><td>$204{,}4$</td><td>$78{,}4$</td><td>$71$</td><td>$83{,}8$</td><td>$109{,}4$</td></tr></tbody></table></div><p>$N=20$, $\;Y_{\cdot\cdot}^2/N=2188^2/20=239367{,}2$, $\;\sum Y_{ij}^2=300196$.</p><p>$SC_T=300196-239367{,}2=60828{,}8$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{n}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{1499734}{5}-239367{,}2=60579{,}6$</p><p>$SC_E=SC_T-SC_{TRAT}=249{,}2$</p>` },
      { titulo: "c) Tabla ANOVA y decisión", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Tratamiento</td><td>$60579{,}6$</td><td>3</td><td>$20193{,}2$</td><td>$1296{,}51$</td><td>$\lt 0{,}0001$</td></tr><tr><td>Error</td><td>$249{,}2$</td><td>16</td><td>$15{,}575$</td><td></td><td></td></tr><tr><td>Total</td><td>$60828{,}8$</td><td>19</td><td></td><td></td><td></td></tr></tbody></table></div><p>$F_0=1296{,}51$ &gt; $F_{0{,}05;3,16}=3{,}24$ ($p\lt 0{,}0001$) ⇒ se <strong>rechaza</strong> $H_0$. Los tratamientos no dan todos el mismo tiempo de cocción.</p>` },
      { titulo: "d) Mejor tratamiento", puntos: 1, solucion: String.raw`<p>$LSD=t_{0{,}025;\,16}\sqrt{\dfrac{2\,CM_E}{n}}=2{,}12\sqrt{\dfrac{2\cdot15{,}575}{5}}=5{,}291$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Par</th><th>$|\bar Y_i-\bar Y_j|$</th><th>LSD</th><th>¿Difieren?</th></tr></thead><tbody><tr><td>Control − T2</td><td>$126$</td><td>$5{,}291$</td><td>Sí</td></tr><tr><td>Control − T3</td><td>$133{,}4$</td><td>$5{,}291$</td><td>Sí</td></tr><tr><td>Control − T4</td><td>$120{,}6$</td><td>$5{,}291$</td><td>Sí</td></tr><tr><td>T2 − T3</td><td>$7{,}4$</td><td>$5{,}291$</td><td>Sí</td></tr><tr><td>T2 − T4</td><td>$5{,}4$</td><td>$5{,}291$</td><td>Sí</td></tr><tr><td>T3 − T4</td><td>$12{,}8$</td><td>$5{,}291$</td><td>Sí</td></tr></tbody></table></div><p>Se busca el menor tiempo: <strong>T3</strong> es el más rápido y difiere de todos (la diferencia más chica, con T2, es 7,4 &gt; LSD). Tiempo esperado: su media, 71 min.</p>` },
      { titulo: "e) Supuestos", puntos: 1, solucion: "<p>Normalidad de los residuos (Shapiro–Wilk): $p=0{,}6118$ ⇒ no se rechaza la normalidad.</p><p>Varianza constante: Bartlett $p=0{,}8682$ y Levene $p=0{,}8943$ ⇒ no hay evidencia de varianzas distintas.</p><p>Gráficamente: QQ-plot de residuos, residuos contra predichos (sin forma de embudo) y residuos contra el orden de corrida (independencia).</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F (aov)", r: `cat({y <- c(205, 198, 210, 202, 207, 80, 72, 77, 84, 79, 70, 75, 66, 73, 71, 83, 88, 80, 86, 82); trat <- factor(rep(c("Control", "T2", "T3", "T4"), c(5, 5, 5, 5)), levels = c("Control", "T2", "T3", "T4")); summary(aov(y ~ trat))[[1]][1, 4]})`, esperado: 1296.514, tol: 0.000500001 },
      { que: "SC error (aov)", r: `cat({y <- c(205, 198, 210, 202, 207, 80, 72, 77, 84, 79, 70, 75, 66, 73, 71, 83, 88, 80, 86, 82); trat <- factor(rep(c("Control", "T2", "T3", "T4"), c(5, 5, 5, 5)), levels = c("Control", "T2", "T3", "T4")); summary(aov(y ~ trat))[[1]][2, 2]})`, esperado: 249.2, tol: 0.000500001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 3, ej. 12" },
      { id: "C7.1", loc: "páginas 36–51" },
      { id: "C7.2", loc: "slides 2–19" }
    ]
  }
]);
