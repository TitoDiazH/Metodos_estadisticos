/* ============================================================================
   Desarrollo · M20 Diseño en bloques completos al azar — libro guía (P3) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m20-d002",
    modulo: "m20-dbca",
    concepto: "m20-c03",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 4, ej. 9 · DBCA a mano: totales, SC, ANOVA y LSD",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 4, ej. 9 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro.</p><p>A continuación se muestran los datos de un diseño en bloques al azar (3 tratamientos, 4 bloques). Use $\alpha=0{,}05$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Bloque 1</th><th>Bloque 2</th><th>Bloque 3</th><th>Bloque 4</th></tr></thead><tbody><tr><td>A</td><td>3</td><td>4</td><td>2</td><td>6</td></tr><tr><td>B</td><td>7</td><td>9</td><td>3</td><td>10</td></tr><tr><td>C</td><td>4</td><td>6</td><td>3</td><td>7</td></tr></tbody></table></div><ol type="a"><li>Complete los totales por tratamiento $Y_{i\cdot}$, por bloque $Y_{\cdot j}$ y el total global $Y_{\cdot\cdot}$.</li><li>Calcule las sumas de cuadrados $SC_{TRAT}$, $SC_B$, $SC_T$ y $SC_E$.</li><li>Obtenga la tabla de análisis de varianza y anote las principales conclusiones.</li><li>Obtenga la diferencia mínima significativa (LSD) para comparar tratamientos en este diseño en bloques.</li></ol>`,
    codigoR: `y <- c(3, 4, 2, 6, 7, 9, 3, 10, 4, 6, 3, 7); trat <- factor(rep(c("A", "B", "C"), each = 4)); bloque <- factor(rep(1:4, 3))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value  Pr(>F)   
trat         2  25.17  12.583   13.73 0.00577 **
bloque       3  42.00  14.000   15.27 0.00324 **
Residuals    6   5.50   0.917                   
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  0.9166667 

trat,  means and individual ( 95 %) CI

     y      std r        se     LCL     UCL Min Max  Q25 Q50  Q75
A 3.75 1.707825 4 0.4787136 2.57863 4.92137   2   6 2.75 3.5 4.50
B 7.25 3.095696 4 0.4787136 6.07863 8.42137   3  10 6.00 8.0 9.25
C 5.00 1.825742 4 0.4787136 3.82863 6.17137   3   7 3.75 5.0 6.25

Alpha: 0.05 ; DF Error: 6
Critical Value of t: 2.446912 

least Significant Difference: 1.656567 

Treatments with the same letter are not significantly different.

     y groups
B 7.25      a
C 5.00      b
A 3.75      b

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.93679, p-value = 0.4576

Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  2  0.6724 0.5344
       9`,
    salidaDe: `y <- c(3, 4, 2, 6, 7, 9, 3, 10, 4, 6, 3, 7); trat <- factor(rep(c("A", "B", "C"), each = 4)); bloque <- factor(rep(1:4, 3))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    partes: [
      { titulo: "a) Totales", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Bloque 1</th><th>Bloque 2</th><th>Bloque 3</th><th>Bloque 4</th><th>Total $Y_{i\cdot}$</th><th>Media</th></tr></thead><tbody><tr><td>A</td><td>$3$</td><td>$4$</td><td>$2$</td><td>$6$</td><td>$15$</td><td>$3{,}75$</td></tr><tr><td>B</td><td>$7$</td><td>$9$</td><td>$3$</td><td>$10$</td><td>$29$</td><td>$7{,}25$</td></tr><tr><td>C</td><td>$4$</td><td>$6$</td><td>$3$</td><td>$7$</td><td>$20$</td><td>$5$</td></tr><tr><td>Total $Y_{\cdot j}$</td><td>$14$</td><td>$19$</td><td>$8$</td><td>$23$</td><td>$Y_{\cdot\cdot}=64$</td><td>$5{,}333$</td></tr></tbody></table></div>` },
      { titulo: "b) Sumas de cuadrados", puntos: 2, solucion: String.raw`<p>$N=3\cdot4=12$, $\;Y_{\cdot\cdot}^2/N=64^2/12=341{,}333$, $\;\sum\sum Y_{ij}^2=414$.</p><p>$SC_T=414-341{,}333=72{,}667$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{b}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{1466}{4}-341{,}333=25{,}167$</p><p>$SC_B=\dfrac{\sum Y_{\cdot j}^2}{a}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{1150}{3}-341{,}333=42$</p><p>$SC_E=SC_T-SC_{TRAT}-SC_B=5{,}5$</p>` },
      { titulo: "c) Tabla ANOVA y conclusiones", puntos: 1.5, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Tratamiento</td><td>$25{,}167$</td><td>$2$</td><td>$12{,}583$</td><td>$13{,}73$</td><td>$0{,}0058$</td></tr><tr><td>Bloque</td><td>$42$</td><td>$3$</td><td>$14$</td><td>$15{,}27$</td><td>$0{,}0032$</td></tr><tr><td>Error</td><td>$5{,}5$</td><td>$6$</td><td>$0{,}917$</td><td></td><td></td></tr><tr><td>Total</td><td>$72{,}667$</td><td>$11$</td><td></td><td></td><td></td></tr></tbody></table></div><p>Tratamiento: $F_0=13{,}73$ &gt; $F_{0{,}05;2,6}=5{,}14$ ($p=0{,}0058$) ⇒ se <strong>rechaza</strong> $H_0$. Hay diferencias entre tratamientos: al menos uno tiene una respuesta media distinta.</p><p>Bloque: $F_0=15{,}27$ &gt; $F_{0{,}05;3,6}=4{,}76$ ($p=0{,}0032$) ⇒ se <strong>rechaza</strong> $H_0$. El bloque sí influye: bloquear fue útil porque sacó esa variabilidad del error.</p>` },
      { titulo: "d) LSD y comparaciones", puntos: 1.5, solucion: String.raw`<p>$LSD=t_{0{,}025;\,6}\sqrt{\dfrac{2\,CM_E}{b}}=2{,}447\sqrt{\dfrac{2\cdot0{,}9167}{4}}=1{,}657$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Diferencia</th><th>$|\bar Y_{i\cdot}-\bar Y_{j\cdot}|$</th><th>¿Significativa?</th></tr></thead><tbody><tr><td>A − B</td><td>$3{,}5$</td><td>Sí</td></tr><tr><td>A − C</td><td>$1{,}25$</td><td>No</td></tr><tr><td>B − C</td><td>$2{,}25$</td><td>Sí</td></tr></tbody></table></div><p>Medias: B $=7{,}25$, C $=5$, A $=3{,}75$. <strong>B</strong> es significativamente mejor que todos los demás. (Objetivo supuesto, el enunciado no lo dice: maximizar la respuesta.) En R: <code>agricolae::LSD.test(modelo, "trat")</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F tratamiento", r: `cat({y <- c(3, 4, 2, 6, 7, 9, 3, 10, 4, 6, 3, 7); trat <- factor(rep(c("A", "B", "C"), each = 4)); bloque <- factor(rep(1:4, 3)); summary(aov(y ~ trat + bloque))[[1]][1, 4]})`, esperado: 13.73, tol: 0.0050000010000000004 },
      { que: "F bloque", r: `cat({y <- c(3, 4, 2, 6, 7, 9, 3, 10, 4, 6, 3, 7); trat <- factor(rep(c("A", "B", "C"), each = 4)); bloque <- factor(rep(1:4, 3)); summary(aov(y ~ trat + bloque))[[1]][2, 4]})`, esperado: 15.27, tol: 0.0050000010000000004 },
      { que: "CME", r: `cat({y <- c(3, 4, 2, 6, 7, 9, 3, 10, 4, 6, 3, 7); trat <- factor(rep(c("A", "B", "C"), each = 4)); bloque <- factor(rep(1:4, 3)); summary(aov(y ~ trat + bloque))[[1]][3, 3]})`, esperado: 0.917, tol: 0.000500001 },
      { que: "LSD", r: "cat(qt(0.975, 6) * sqrt(2 * 0.9166666666666666 / 4))", esperado: 1.657, tol: 0.000500001 },
      { que: "Y..", js: "[3, 4, 2, 6, 7, 9, 3, 10, 4, 6, 3, 7].reduce((a,b)=>a+b,0)", esperado: 64, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 4, ej. 9 (p. 119)" },
      { id: "C7.3", loc: "slides 9–17" }
    ]
  },
  {
    id: "m20-d003",
    modulo: "m20-dbca",
    concepto: "m20-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 4, ej. 9 (p. 119)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 4, ej. 9 · DBCA a mano: totales, SC, ANOVA y LSD (datos cambiados)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 4, ej. 9 del libro guía. Cambio respecto del original: se cambiaron 4 datos (A en bloque 2, B en bloques 1 y 3, C en bloque 4).</p><p>A continuación se muestran los datos de un diseño en bloques al azar (3 tratamientos, 4 bloques). Use $\alpha=0{,}05$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Bloque 1</th><th>Bloque 2</th><th>Bloque 3</th><th>Bloque 4</th></tr></thead><tbody><tr><td>A</td><td>3</td><td>5</td><td>2</td><td>6</td></tr><tr><td>B</td><td>8</td><td>9</td><td>4</td><td>10</td></tr><tr><td>C</td><td>4</td><td>6</td><td>3</td><td>8</td></tr></tbody></table></div><ol type="a"><li>Complete los totales por tratamiento $Y_{i\cdot}$, por bloque $Y_{\cdot j}$ y el total global $Y_{\cdot\cdot}$.</li><li>Calcule las sumas de cuadrados $SC_{TRAT}$, $SC_B$, $SC_T$ y $SC_E$.</li><li>Obtenga la tabla de análisis de varianza y anote las principales conclusiones.</li><li>Obtenga la diferencia mínima significativa (LSD) para comparar tratamientos en este diseño en bloques.</li></ol>`,
    codigoR: `y <- c(3, 5, 2, 6, 8, 9, 4, 10, 4, 6, 3, 8); trat <- factor(rep(c("A", "B", "C"), each = 4)); bloque <- factor(rep(1:4, 3))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value   Pr(>F)    
trat         2  29.17  14.583      25 0.001230 ** 
bloque       3  42.00  14.000      24 0.000966 ***
Residuals    6   3.50   0.583                     
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  0.5833333 

trat,  means and individual ( 95 %) CI

     y      std r        se     LCL     UCL Min Max  Q25 Q50  Q75
A 4.00 1.825742 4 0.3818813 3.06557 4.93443   2   6 2.75 4.0 5.25
B 7.75 2.629956 4 0.3818813 6.81557 8.68443   4  10 7.00 8.5 9.25
C 5.25 2.217356 4 0.3818813 4.31557 6.18443   3   8 3.75 5.0 6.50

Alpha: 0.05 ; DF Error: 6
Critical Value of t: 2.446912 

least Significant Difference: 1.321483 

Treatments with the same letter are not significantly different.

     y groups
B 7.75      a
C 5.25      b
A 4.00      b

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.98249, p-value = 0.9917

Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  2  0.0517 0.9499
       9`,
    salidaDe: `y <- c(3, 5, 2, 6, 8, 9, 4, 10, 4, 6, 3, 8); trat <- factor(rep(c("A", "B", "C"), each = 4)); bloque <- factor(rep(1:4, 3))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    partes: [
      { titulo: "a) Totales", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Bloque 1</th><th>Bloque 2</th><th>Bloque 3</th><th>Bloque 4</th><th>Total $Y_{i\cdot}$</th><th>Media</th></tr></thead><tbody><tr><td>A</td><td>$3$</td><td>$5$</td><td>$2$</td><td>$6$</td><td>$16$</td><td>$4$</td></tr><tr><td>B</td><td>$8$</td><td>$9$</td><td>$4$</td><td>$10$</td><td>$31$</td><td>$7{,}75$</td></tr><tr><td>C</td><td>$4$</td><td>$6$</td><td>$3$</td><td>$8$</td><td>$21$</td><td>$5{,}25$</td></tr><tr><td>Total $Y_{\cdot j}$</td><td>$15$</td><td>$20$</td><td>$9$</td><td>$24$</td><td>$Y_{\cdot\cdot}=68$</td><td>$5{,}667$</td></tr></tbody></table></div>` },
      { titulo: "b) Sumas de cuadrados", puntos: 2, solucion: String.raw`<p>$N=3\cdot4=12$, $\;Y_{\cdot\cdot}^2/N=68^2/12=385{,}333$, $\;\sum\sum Y_{ij}^2=460$.</p><p>$SC_T=460-385{,}333=74{,}667$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{b}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{1658}{4}-385{,}333=29{,}167$</p><p>$SC_B=\dfrac{\sum Y_{\cdot j}^2}{a}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{1282}{3}-385{,}333=42$</p><p>$SC_E=SC_T-SC_{TRAT}-SC_B=3{,}5$</p>` },
      { titulo: "c) Tabla ANOVA y conclusiones", puntos: 1.5, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Tratamiento</td><td>$29{,}167$</td><td>$2$</td><td>$14{,}583$</td><td>$25$</td><td>$0{,}0012$</td></tr><tr><td>Bloque</td><td>$42$</td><td>$3$</td><td>$14$</td><td>$24$</td><td>$0{,}001$</td></tr><tr><td>Error</td><td>$3{,}5$</td><td>$6$</td><td>$0{,}583$</td><td></td><td></td></tr><tr><td>Total</td><td>$74{,}667$</td><td>$11$</td><td></td><td></td><td></td></tr></tbody></table></div><p>Tratamiento: $F_0=25$ &gt; $F_{0{,}05;2,6}=5{,}14$ ($p=0{,}0012$) ⇒ se <strong>rechaza</strong> $H_0$. Hay diferencias entre tratamientos: al menos uno tiene una respuesta media distinta.</p><p>Bloque: $F_0=24$ &gt; $F_{0{,}05;3,6}=4{,}76$ ($p=0{,}001$) ⇒ se <strong>rechaza</strong> $H_0$. El bloque sí influye: bloquear fue útil porque sacó esa variabilidad del error.</p>` },
      { titulo: "d) LSD y comparaciones", puntos: 1.5, solucion: String.raw`<p>$LSD=t_{0{,}025;\,6}\sqrt{\dfrac{2\,CM_E}{b}}=2{,}447\sqrt{\dfrac{2\cdot0{,}5833}{4}}=1{,}321$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Diferencia</th><th>$|\bar Y_{i\cdot}-\bar Y_{j\cdot}|$</th><th>¿Significativa?</th></tr></thead><tbody><tr><td>A − B</td><td>$3{,}75$</td><td>Sí</td></tr><tr><td>A − C</td><td>$1{,}25$</td><td>No</td></tr><tr><td>B − C</td><td>$2{,}5$</td><td>Sí</td></tr></tbody></table></div><p>Medias: B $=7{,}75$, C $=5{,}25$, A $=4$. <strong>B</strong> es significativamente mejor que todos los demás. (Objetivo supuesto, el enunciado no lo dice: maximizar la respuesta.) En R: <code>agricolae::LSD.test(modelo, "trat")</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F tratamiento", r: `cat({y <- c(3, 5, 2, 6, 8, 9, 4, 10, 4, 6, 3, 8); trat <- factor(rep(c("A", "B", "C"), each = 4)); bloque <- factor(rep(1:4, 3)); summary(aov(y ~ trat + bloque))[[1]][1, 4]})`, esperado: 25, tol: 0.0050000010000000004 },
      { que: "F bloque", r: `cat({y <- c(3, 5, 2, 6, 8, 9, 4, 10, 4, 6, 3, 8); trat <- factor(rep(c("A", "B", "C"), each = 4)); bloque <- factor(rep(1:4, 3)); summary(aov(y ~ trat + bloque))[[1]][2, 4]})`, esperado: 24, tol: 0.0050000010000000004 },
      { que: "CME", r: `cat({y <- c(3, 5, 2, 6, 8, 9, 4, 10, 4, 6, 3, 8); trat <- factor(rep(c("A", "B", "C"), each = 4)); bloque <- factor(rep(1:4, 3)); summary(aov(y ~ trat + bloque))[[1]][3, 3]})`, esperado: 0.583, tol: 0.000500001 },
      { que: "LSD", r: "cat(qt(0.975, 6) * sqrt(2 * 0.5833333333333334 / 4))", esperado: 1.321, tol: 0.000500001 },
      { que: "Y..", js: "[3, 5, 2, 6, 8, 9, 4, 10, 4, 6, 3, 8].reduce((a,b)=>a+b,0)", esperado: 68, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 4, ej. 9 (p. 119)" },
      { id: "C7.3", loc: "slides 9–17" }
    ]
  },
  {
    id: "m20-d004",
    modulo: "m20-dbca",
    concepto: "m20-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 4, ej. 9 (p. 119)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 4, ej. 9 · DBCA a mano: totales, SC, ANOVA y LSD (4 tratamientos)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 4, ej. 9 del libro guía. Cambio respecto del original: se agregó un cuarto tratamiento D.</p><p>A continuación se muestran los datos de un diseño en bloques al azar (4 tratamientos, 4 bloques). Use $\alpha=0{,}05$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Bloque 1</th><th>Bloque 2</th><th>Bloque 3</th><th>Bloque 4</th></tr></thead><tbody><tr><td>A</td><td>3</td><td>4</td><td>2</td><td>6</td></tr><tr><td>B</td><td>7</td><td>9</td><td>3</td><td>10</td></tr><tr><td>C</td><td>4</td><td>6</td><td>3</td><td>7</td></tr><tr><td>D</td><td>5</td><td>7</td><td>4</td><td>8</td></tr></tbody></table></div><ol type="a"><li>Complete los totales por tratamiento $Y_{i\cdot}$, por bloque $Y_{\cdot j}$ y el total global $Y_{\cdot\cdot}$.</li><li>Calcule las sumas de cuadrados $SC_{TRAT}$, $SC_B$, $SC_T$ y $SC_E$.</li><li>Obtenga la tabla de análisis de varianza y anote las principales conclusiones.</li><li>Obtenga la diferencia mínima significativa (LSD) para comparar tratamientos en este diseño en bloques.</li></ol>`,
    codigoR: `y <- c(3, 4, 2, 6, 7, 9, 3, 10, 4, 6, 3, 7, 5, 7, 4, 8); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value   Pr(>F)    
trat         3   26.5   8.833   13.25  0.00119 ** 
bloque       3   51.5  17.167   25.75 9.47e-05 ***
Residuals    9    6.0   0.667                     
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  0.6666667 

trat,  means and individual ( 95 %) CI

     y      std r        se      LCL      UCL Min Max  Q25 Q50  Q75
A 3.75 1.707825 4 0.4082483 2.826478 4.673522   2   6 2.75 3.5 4.50
B 7.25 3.095696 4 0.4082483 6.326478 8.173522   3  10 6.00 8.0 9.25
C 5.00 1.825742 4 0.4082483 4.076478 5.923522   3   7 3.75 5.0 6.25
D 6.00 1.825742 4 0.4082483 5.076478 6.923522   4   8 4.75 6.0 7.25

Alpha: 0.05 ; DF Error: 9
Critical Value of t: 2.262157 

least Significant Difference: 1.306057 

Treatments with the same letter are not significantly different.

     y groups
B 7.25      a
D 6.00     ab
C 5.00     bc
A 3.75      c

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.86358, p-value = 0.02172

Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  3  0.5806 0.6389
      12`,
    salidaDe: `y <- c(3, 4, 2, 6, 7, 9, 3, 10, 4, 6, 3, 7, 5, 7, 4, 8); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    partes: [
      { titulo: "a) Totales", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Bloque 1</th><th>Bloque 2</th><th>Bloque 3</th><th>Bloque 4</th><th>Total $Y_{i\cdot}$</th><th>Media</th></tr></thead><tbody><tr><td>A</td><td>$3$</td><td>$4$</td><td>$2$</td><td>$6$</td><td>$15$</td><td>$3{,}75$</td></tr><tr><td>B</td><td>$7$</td><td>$9$</td><td>$3$</td><td>$10$</td><td>$29$</td><td>$7{,}25$</td></tr><tr><td>C</td><td>$4$</td><td>$6$</td><td>$3$</td><td>$7$</td><td>$20$</td><td>$5$</td></tr><tr><td>D</td><td>$5$</td><td>$7$</td><td>$4$</td><td>$8$</td><td>$24$</td><td>$6$</td></tr><tr><td>Total $Y_{\cdot j}$</td><td>$19$</td><td>$26$</td><td>$12$</td><td>$31$</td><td>$Y_{\cdot\cdot}=88$</td><td>$5{,}5$</td></tr></tbody></table></div>` },
      { titulo: "b) Sumas de cuadrados", puntos: 2, solucion: String.raw`<p>$N=4\cdot4=16$, $\;Y_{\cdot\cdot}^2/N=88^2/16=484$, $\;\sum\sum Y_{ij}^2=568$.</p><p>$SC_T=568-484=84$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{b}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{2042}{4}-484=26{,}5$</p><p>$SC_B=\dfrac{\sum Y_{\cdot j}^2}{a}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{2142}{4}-484=51{,}5$</p><p>$SC_E=SC_T-SC_{TRAT}-SC_B=6$</p>` },
      { titulo: "c) Tabla ANOVA y conclusiones", puntos: 1.5, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Tratamiento</td><td>$26{,}5$</td><td>$3$</td><td>$8{,}833$</td><td>$13{,}25$</td><td>$0{,}0012$</td></tr><tr><td>Bloque</td><td>$51{,}5$</td><td>$3$</td><td>$17{,}167$</td><td>$25{,}75$</td><td>$\lt 0{,}0001$</td></tr><tr><td>Error</td><td>$6$</td><td>$9$</td><td>$0{,}667$</td><td></td><td></td></tr><tr><td>Total</td><td>$84$</td><td>$15$</td><td></td><td></td><td></td></tr></tbody></table></div><p>Tratamiento: $F_0=13{,}25$ &gt; $F_{0{,}05;3,9}=3{,}86$ ($p=0{,}0012$) ⇒ se <strong>rechaza</strong> $H_0$. Hay diferencias entre tratamientos: al menos uno tiene una respuesta media distinta.</p><p>Bloque: $F_0=25{,}75$ &gt; $F_{0{,}05;3,9}=3{,}86$ ($p\lt 0{,}0001$) ⇒ se <strong>rechaza</strong> $H_0$. El bloque sí influye: bloquear fue útil porque sacó esa variabilidad del error.</p>` },
      { titulo: "d) LSD y comparaciones", puntos: 1.5, solucion: String.raw`<p>$LSD=t_{0{,}025;\,9}\sqrt{\dfrac{2\,CM_E}{b}}=2{,}262\sqrt{\dfrac{2\cdot0{,}6667}{4}}=1{,}306$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Diferencia</th><th>$|\bar Y_{i\cdot}-\bar Y_{j\cdot}|$</th><th>¿Significativa?</th></tr></thead><tbody><tr><td>A − B</td><td>$3{,}5$</td><td>Sí</td></tr><tr><td>A − C</td><td>$1{,}25$</td><td>No</td></tr><tr><td>A − D</td><td>$2{,}25$</td><td>Sí</td></tr><tr><td>B − C</td><td>$2{,}25$</td><td>Sí</td></tr><tr><td>B − D</td><td>$1{,}25$</td><td>No</td></tr><tr><td>C − D</td><td>$1$</td><td>No</td></tr></tbody></table></div><p>Medias: B $=7{,}25$, D $=6$, C $=5$, A $=3{,}75$. El de mejor media es <strong>B</strong>, pero no difiere significativamente de D: estadísticamente empatan; se elige entre ellos por costo u otro criterio. (Objetivo supuesto, el enunciado no lo dice: maximizar la respuesta.) En R: <code>agricolae::LSD.test(modelo, "trat")</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F tratamiento", r: `cat({y <- c(3, 4, 2, 6, 7, 9, 3, 10, 4, 6, 3, 7, 5, 7, 4, 8); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4)); summary(aov(y ~ trat + bloque))[[1]][1, 4]})`, esperado: 13.25, tol: 0.0050000010000000004 },
      { que: "F bloque", r: `cat({y <- c(3, 4, 2, 6, 7, 9, 3, 10, 4, 6, 3, 7, 5, 7, 4, 8); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4)); summary(aov(y ~ trat + bloque))[[1]][2, 4]})`, esperado: 25.75, tol: 0.0050000010000000004 },
      { que: "CME", r: `cat({y <- c(3, 4, 2, 6, 7, 9, 3, 10, 4, 6, 3, 7, 5, 7, 4, 8); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4)); summary(aov(y ~ trat + bloque))[[1]][3, 3]})`, esperado: 0.667, tol: 0.000500001 },
      { que: "LSD", r: "cat(qt(0.975, 9) * sqrt(2 * 0.6666666666666666 / 4))", esperado: 1.306, tol: 0.000500001 },
      { que: "Y..", js: "[3, 4, 2, 6, 7, 9, 3, 10, 4, 6, 3, 7, 5, 7, 4, 8].reduce((a,b)=>a+b,0)", esperado: 88, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 4, ej. 9 (p. 119)" },
      { id: "C7.3", loc: "slides 9–17" }
    ]
  },
  {
    id: "m20-d005",
    modulo: "m20-dbca",
    concepto: "m20-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 4, ej. 9 (p. 119)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 4, ej. 9 · DBCA a mano: totales, SC, ANOVA y LSD (5 bloques)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 4, ej. 9 del libro guía. Cambio respecto del original: se agregó un quinto bloque.</p><p>A continuación se muestran los datos de un diseño en bloques al azar (3 tratamientos, 5 bloques). Use $\alpha=0{,}05$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Bloque 1</th><th>Bloque 2</th><th>Bloque 3</th><th>Bloque 4</th><th>Bloque 5</th></tr></thead><tbody><tr><td>A</td><td>3</td><td>4</td><td>2</td><td>6</td><td>5</td></tr><tr><td>B</td><td>7</td><td>9</td><td>3</td><td>10</td><td>8</td></tr><tr><td>C</td><td>4</td><td>6</td><td>3</td><td>7</td><td>6</td></tr></tbody></table></div><ol type="a"><li>Complete los totales por tratamiento $Y_{i\cdot}$, por bloque $Y_{\cdot j}$ y el total global $Y_{\cdot\cdot}$.</li><li>Calcule las sumas de cuadrados $SC_{TRAT}$, $SC_B$, $SC_T$ y $SC_E$.</li><li>Obtenga la tabla de análisis de varianza y anote las principales conclusiones.</li><li>Obtenga la diferencia mínima significativa (LSD) para comparar tratamientos en este diseño en bloques.</li></ol>`,
    codigoR: `y <- c(3, 4, 2, 6, 5, 7, 9, 3, 10, 8, 4, 6, 3, 7, 6); trat <- factor(rep(c("A", "B", "C"), each = 5)); bloque <- factor(rep(1:5, 3))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value   Pr(>F)    
trat         2  29.73   14.87   21.24 0.000631 ***
bloque       4  44.40   11.10   15.86 0.000716 ***
Residuals    8   5.60    0.70                     
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  0.7 

trat,  means and individual ( 95 %) CI

    y      std r        se      LCL      UCL Min Max Q25 Q50 Q75
A 4.0 1.581139 5 0.3741657 3.137172 4.862828   2   6   3   4   5
B 7.4 2.701851 5 0.3741657 6.537172 8.262828   3  10   7   8   9
C 5.2 1.643168 5 0.3741657 4.337172 6.062828   3   7   4   6   6

Alpha: 0.05 ; DF Error: 8
Critical Value of t: 2.306004 

least Significant Difference: 1.220223 

Treatments with the same letter are not significantly different.

    y groups
B 7.4      a
C 5.2      b
A 4.0      b

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.93659, p-value = 0.3415

Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  2  0.2951 0.7497
      12`,
    salidaDe: `y <- c(3, 4, 2, 6, 5, 7, 9, 3, 10, 8, 4, 6, 3, 7, 6); trat <- factor(rep(c("A", "B", "C"), each = 5)); bloque <- factor(rep(1:5, 3))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    partes: [
      { titulo: "a) Totales", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Bloque 1</th><th>Bloque 2</th><th>Bloque 3</th><th>Bloque 4</th><th>Bloque 5</th><th>Total $Y_{i\cdot}$</th><th>Media</th></tr></thead><tbody><tr><td>A</td><td>$3$</td><td>$4$</td><td>$2$</td><td>$6$</td><td>$5$</td><td>$20$</td><td>$4$</td></tr><tr><td>B</td><td>$7$</td><td>$9$</td><td>$3$</td><td>$10$</td><td>$8$</td><td>$37$</td><td>$7{,}4$</td></tr><tr><td>C</td><td>$4$</td><td>$6$</td><td>$3$</td><td>$7$</td><td>$6$</td><td>$26$</td><td>$5{,}2$</td></tr><tr><td>Total $Y_{\cdot j}$</td><td>$14$</td><td>$19$</td><td>$8$</td><td>$23$</td><td>$19$</td><td>$Y_{\cdot\cdot}=83$</td><td>$5{,}533$</td></tr></tbody></table></div>` },
      { titulo: "b) Sumas de cuadrados", puntos: 2, solucion: String.raw`<p>$N=3\cdot5=15$, $\;Y_{\cdot\cdot}^2/N=83^2/15=459{,}267$, $\;\sum\sum Y_{ij}^2=539$.</p><p>$SC_T=539-459{,}267=79{,}733$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{b}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{2445}{5}-459{,}267=29{,}733$</p><p>$SC_B=\dfrac{\sum Y_{\cdot j}^2}{a}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{1511}{3}-459{,}267=44{,}4$</p><p>$SC_E=SC_T-SC_{TRAT}-SC_B=5{,}6$</p>` },
      { titulo: "c) Tabla ANOVA y conclusiones", puntos: 1.5, solucion: `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Tratamiento</td><td>$29{,}733$</td><td>$2$</td><td>$14{,}867$</td><td>$21{,}24$</td><td>$0{,}0006$</td></tr><tr><td>Bloque</td><td>$44{,}4$</td><td>$4$</td><td>$11{,}1$</td><td>$15{,}86$</td><td>$0{,}0007$</td></tr><tr><td>Error</td><td>$5{,}6$</td><td>$8$</td><td>$0{,}7$</td><td></td><td></td></tr><tr><td>Total</td><td>$79{,}733$</td><td>$14$</td><td></td><td></td><td></td></tr></tbody></table></div><p>Tratamiento: $F_0=21{,}24$ &gt; $F_{0{,}05;2,8}=4{,}46$ ($p=0{,}0006$) ⇒ se <strong>rechaza</strong> $H_0$. Hay diferencias entre tratamientos: al menos uno tiene una respuesta media distinta.</p><p>Bloque: $F_0=15{,}86$ &gt; $F_{0{,}05;4,8}=3{,}84$ ($p=0{,}0007$) ⇒ se <strong>rechaza</strong> $H_0$. El bloque sí influye: bloquear fue útil porque sacó esa variabilidad del error.</p>` },
      { titulo: "d) LSD y comparaciones", puntos: 1.5, solucion: String.raw`<p>$LSD=t_{0{,}025;\,8}\sqrt{\dfrac{2\,CM_E}{b}}=2{,}306\sqrt{\dfrac{2\cdot0{,}7}{5}}=1{,}22$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Diferencia</th><th>$|\bar Y_{i\cdot}-\bar Y_{j\cdot}|$</th><th>¿Significativa?</th></tr></thead><tbody><tr><td>A − B</td><td>$3{,}4$</td><td>Sí</td></tr><tr><td>A − C</td><td>$1{,}2$</td><td>No</td></tr><tr><td>B − C</td><td>$2{,}2$</td><td>Sí</td></tr></tbody></table></div><p>Medias: B $=7{,}4$, C $=5{,}2$, A $=4$. <strong>B</strong> es significativamente mejor que todos los demás. (Objetivo supuesto, el enunciado no lo dice: maximizar la respuesta.) En R: <code>agricolae::LSD.test(modelo, "trat")</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F tratamiento", r: `cat({y <- c(3, 4, 2, 6, 5, 7, 9, 3, 10, 8, 4, 6, 3, 7, 6); trat <- factor(rep(c("A", "B", "C"), each = 5)); bloque <- factor(rep(1:5, 3)); summary(aov(y ~ trat + bloque))[[1]][1, 4]})`, esperado: 21.24, tol: 0.0050000010000000004 },
      { que: "F bloque", r: `cat({y <- c(3, 4, 2, 6, 5, 7, 9, 3, 10, 8, 4, 6, 3, 7, 6); trat <- factor(rep(c("A", "B", "C"), each = 5)); bloque <- factor(rep(1:5, 3)); summary(aov(y ~ trat + bloque))[[1]][2, 4]})`, esperado: 15.86, tol: 0.0050000010000000004 },
      { que: "CME", r: `cat({y <- c(3, 4, 2, 6, 5, 7, 9, 3, 10, 8, 4, 6, 3, 7, 6); trat <- factor(rep(c("A", "B", "C"), each = 5)); bloque <- factor(rep(1:5, 3)); summary(aov(y ~ trat + bloque))[[1]][3, 3]})`, esperado: 0.7, tol: 0.000500001 },
      { que: "LSD", r: "cat(qt(0.975, 8) * sqrt(2 * 0.6999999999999957 / 5))", esperado: 1.22, tol: 0.000500001 },
      { que: "Y..", js: "[3, 4, 2, 6, 5, 7, 9, 3, 10, 8, 4, 6, 3, 7, 6].reduce((a,b)=>a+b,0)", esperado: 83, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 4, ej. 9 (p. 119)" },
      { id: "C7.3", loc: "slides 9–17" }
    ]
  },
  {
    id: "m20-d006",
    modulo: "m20-dbca",
    concepto: "m20-c03",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 4, ej. 10 · DBCA: 3 marcas de atomizador en 6 días",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 4, ej. 10 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro.</p><p>Se estudia la efectividad de 3 marcas de atomizador para matar moscas. Cada producto se aplica a un grupo de 100 moscas y se registra el porcentaje de moscas muertas. Se hicieron 6 réplicas en días diferentes, por lo que se sospecha un efecto del día. Use $\alpha=0{,}05$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Marca</th><th>Día 1</th><th>Día 2</th><th>Día 3</th><th>Día 4</th><th>Día 5</th><th>Día 6</th></tr></thead><tbody><tr><td>1</td><td>72</td><td>65</td><td>67</td><td>75</td><td>62</td><td>73</td></tr><tr><td>2</td><td>55</td><td>59</td><td>68</td><td>70</td><td>53</td><td>50</td></tr><tr><td>3</td><td>64</td><td>74</td><td>61</td><td>58</td><td>51</td><td>69</td></tr></tbody></table></div><ol type="a"><li>Suponiendo un DBCA, formule las hipótesis adecuadas y el modelo estadístico.</li><li>¿Existe diferencia entre la efectividad promedio de los atomizadores?</li><li>¿Hay algún atomizador mejor? Argumente su respuesta.</li><li>¿Hay diferencias significativas en los resultados de diferentes días en que se realizó el experimento? Argumente su respuesta.</li><li>Verifique los supuestos de normalidad y de igual varianza entre las marcas.</li></ol>`,
    codigoR: `y <- c(72, 65, 67, 75, 62, 73, 55, 59, 68, 70, 53, 50, 64, 74, 61, 58, 51, 69); trat <- factor(rep(c("1", "2", "3"), each = 6)); bloque <- factor(rep(1:6, 3))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value Pr(>F)
trat         2  296.3  148.17   2.881  0.103
bloque       5  281.3   56.27   1.094  0.421
Residuals   10  514.3   51.43               

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  51.43333 

trat,  means and individual ( 95 %) CI

         y      std r       se      LCL      UCL Min Max   Q25  Q50   Q75
1 69.00000 5.099020 6 2.927836 62.47638 75.52362  62  75 65.50 69.5 72.75
2 59.16667 8.183316 6 2.927836 52.64304 65.69029  50  70 53.50 57.0 65.75
3 62.83333 8.134290 6 2.927836 56.30971 69.35696  51  74 58.75 62.5 67.75

Alpha: 0.05 ; DF Error: 10
Critical Value of t: 2.228139 

least Significant Difference: 9.225798 

Treatments with the same letter are not significantly different.

         y groups
1 69.00000      a
3 62.83333     ab
2 59.16667      b

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.9575, p-value = 0.5541

Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  2  0.5288 0.5999
      15`,
    salidaDe: `y <- c(72, 65, 67, 75, 62, 73, 55, 59, 68, 70, 53, 50, 64, 74, 61, 58, 51, 69); trat <- factor(rep(c("1", "2", "3"), each = 6)); bloque <- factor(rep(1:6, 3))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    partes: [
      { titulo: "a) Modelo e hipótesis", puntos: 1, solucion: String.raw`<p>Diseño en bloques completos al azar (DBCA): cada día (bloque) recibe los 3 atomizadors en orden aleatorio. Modelo: $Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij}$, $i=1,\dots,3$ (atomizador), $j=1,\dots,6$ (día), $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes y sin interacción atomizador × día.</p><p>Tratamientos: $H_0:\tau_1=\dots=\tau_3=0$ (las 3 medias son iguales) contra $H_1:\tau_i\neq0$ para algún $i$. Bloques: $H_0:\gamma_1=\dots=\gamma_6=0$ contra $H_1:\gamma_j\neq0$ para algún $j$.</p>` },
      { titulo: "b) ANOVA y diferencia entre marcas", puntos: 1.5, solucion: String.raw`<p>$N=3\cdot6=18$, $\;Y_{\cdot\cdot}^2/N=1146^2/18=72962$, $\;\sum\sum Y_{ij}^2=74054$.</p><p>$SC_T=74054-72962=1092$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{b}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{439550}{6}-72962=296{,}333$</p><p>$SC_B=\dfrac{\sum Y_{\cdot j}^2}{a}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{219730}{3}-72962=281{,}333$</p><p>$SC_E=SC_T-SC_{TRAT}-SC_B=514{,}333$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Marca</td><td>$296{,}333$</td><td>$2$</td><td>$148{,}167$</td><td>$2{,}88$</td><td>$0{,}1028$</td></tr><tr><td>Día</td><td>$281{,}333$</td><td>$5$</td><td>$56{,}267$</td><td>$1{,}09$</td><td>$0{,}4207$</td></tr><tr><td>Error</td><td>$514{,}333$</td><td>$10$</td><td>$51{,}433$</td><td></td><td></td></tr><tr><td>Total</td><td>$1092$</td><td>$17$</td><td></td><td></td><td></td></tr></tbody></table></div><p>Marca: $F_0=2{,}88$ &lt; $F_{0{,}05;2,10}=4{,}1$ ($p=0{,}1028$) ⇒ <strong>no se rechaza</strong> $H_0$. No hay evidencia de diferencias entre las mortalidads medias de los atomizadors.</p>` },
      { titulo: "c) ¿Hay un atomizador mejor? (LSD)", puntos: 1.5, solucion: String.raw`<p>$LSD=t_{0{,}025;\,10}\sqrt{\dfrac{2\,CM_E}{b}}=2{,}228\sqrt{\dfrac{2\cdot51{,}4333}{6}}=9{,}226$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Diferencia</th><th>$|\bar Y_{i\cdot}-\bar Y_{j\cdot}|$</th><th>¿Significativa?</th></tr></thead><tbody><tr><td>1 − 2</td><td>$9{,}833$</td><td>Sí</td></tr><tr><td>1 − 3</td><td>$6{,}167$</td><td>No</td></tr><tr><td>2 − 3</td><td>$3{,}667$</td><td>No</td></tr></tbody></table></div><p>Medias: 1 $=69$, 3 $=62{,}833$, 2 $=59{,}167$. Como el ANOVA no rechazó $H_0$, en rigor no hay un atomizador mejor; el LSD solo se informa como ejercicio. (Objetivo: maximizar la mortalidad.) En R: <code>agricolae::LSD.test(modelo, "trat")</code>.</p>` },
      { titulo: "d) Efecto del día (bloque)", puntos: 1, solucion: "<p>Día: $F_0=1{,}09$ &lt; $F_{0{,}05;5,10}=3{,}33$ ($p=0{,}4207$) ⇒ <strong>no se rechaza</strong> $H_0$. No se detecta efecto del día; el bloqueo no era indispensable (aunque no perjudica mucho: solo cuesta 5 gl del error).</p>" },
      { titulo: "e) Supuestos", puntos: 1, solucion: "<p>Normalidad (Shapiro–Wilk sobre los residuos del modelo con bloque): $p=0{,}5541$ ⇒ no se rechaza la normalidad.</p><p>Varianza constante entre atomizadors (Levene, <code>car::leveneTest(y ~ trat)</code>): $p=0{,}5999$ ⇒ no hay evidencia de varianzas distintas.</p><p>Gráficamente: QQ-plot de residuos (puntos sobre la recta) y residuos contra predichos y contra atomizador (banda horizontal sin forma de embudo).</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F tratamiento", r: `cat({y <- c(72, 65, 67, 75, 62, 73, 55, 59, 68, 70, 53, 50, 64, 74, 61, 58, 51, 69); trat <- factor(rep(c("1", "2", "3"), each = 6)); bloque <- factor(rep(1:6, 3)); summary(aov(y ~ trat + bloque))[[1]][1, 4]})`, esperado: 2.88, tol: 0.0050000010000000004 },
      { que: "F bloque", r: `cat({y <- c(72, 65, 67, 75, 62, 73, 55, 59, 68, 70, 53, 50, 64, 74, 61, 58, 51, 69); trat <- factor(rep(c("1", "2", "3"), each = 6)); bloque <- factor(rep(1:6, 3)); summary(aov(y ~ trat + bloque))[[1]][2, 4]})`, esperado: 1.09, tol: 0.0050000010000000004 },
      { que: "CME", r: `cat({y <- c(72, 65, 67, 75, 62, 73, 55, 59, 68, 70, 53, 50, 64, 74, 61, 58, 51, 69); trat <- factor(rep(c("1", "2", "3"), each = 6)); bloque <- factor(rep(1:6, 3)); summary(aov(y ~ trat + bloque))[[1]][3, 3]})`, esperado: 51.433, tol: 0.000500001 },
      { que: "LSD", r: "cat(qt(0.975, 10) * sqrt(2 * 51.4333333333343 / 6))", esperado: 9.226, tol: 0.000500001 },
      { que: "p Shapiro", r: `cat({y <- c(72, 65, 67, 75, 62, 73, 55, 59, 68, 70, 53, 50, 64, 74, 61, 58, 51, 69); trat <- factor(rep(c("1", "2", "3"), each = 6)); bloque <- factor(rep(1:6, 3)); shapiro.test(resid(aov(y ~ trat + bloque)))$p.value})`, esperado: 0.5541, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 4, ej. 10 (p. 119)" },
      { id: "C7.3", loc: "slides 9–17" },
      { id: "C7.3", loc: "slides 18–24" }
    ]
  },
  {
    id: "m20-d007",
    modulo: "m20-dbca",
    concepto: "m20-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 4, ej. 10 (p. 119)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 4, ej. 10 · DBCA: 4 marcas de atomizador en 6 días",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 4, ej. 10 del libro guía. Cambio respecto del original: se agregó una cuarta marca de atomizador.</p><p>Se estudia la efectividad de 4 marcas de atomizador para matar moscas. Cada producto se aplica a un grupo de 100 moscas y se registra el porcentaje de moscas muertas. Se hicieron 6 réplicas en días diferentes, por lo que se sospecha un efecto del día. Use $\alpha=0{,}05$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Marca</th><th>Día 1</th><th>Día 2</th><th>Día 3</th><th>Día 4</th><th>Día 5</th><th>Día 6</th></tr></thead><tbody><tr><td>1</td><td>72</td><td>65</td><td>67</td><td>75</td><td>62</td><td>73</td></tr><tr><td>2</td><td>55</td><td>59</td><td>68</td><td>70</td><td>53</td><td>50</td></tr><tr><td>3</td><td>64</td><td>74</td><td>61</td><td>58</td><td>51</td><td>69</td></tr><tr><td>4</td><td>70</td><td>68</td><td>72</td><td>77</td><td>66</td><td>71</td></tr></tbody></table></div><ol type="a"><li>Suponiendo un DBCA, formule las hipótesis adecuadas y el modelo estadístico.</li><li>¿Existe diferencia entre la efectividad promedio de los atomizadores?</li><li>¿Hay algún atomizador mejor? Argumente su respuesta.</li><li>¿Hay diferencias significativas en los resultados de diferentes días en que se realizó el experimento? Argumente su respuesta.</li><li>Verifique los supuestos de normalidad y de igual varianza entre las marcas.</li></ol>`,
    codigoR: `y <- c(72, 65, 67, 75, 62, 73, 55, 59, 68, 70, 53, 50, 64, 74, 61, 58, 51, 69, 70, 68, 72, 77, 66, 71); trat <- factor(rep(c("1", "2", "3", "4"), each = 6)); bloque <- factor(rep(1:6, 4))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value Pr(>F)  
trat         3  516.8  172.28   4.719 0.0164 *
bloque       5  319.3   63.87   1.749 0.1842  
Residuals   15  547.7   36.51                 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  36.51111 

trat,  means and individual ( 95 %) CI

         y      std r       se      LCL      UCL Min Max   Q25  Q50   Q75
1 69.00000 5.099020 6 2.466817 63.74210 74.25790  62  75 65.50 69.5 72.75
2 59.16667 8.183316 6 2.466817 53.90877 64.42456  50  70 53.50 57.0 65.75
3 62.83333 8.134290 6 2.466817 57.57544 68.09123  51  74 58.75 62.5 67.75
4 70.66667 3.777124 6 2.466817 65.40877 75.92456  66  77 68.50 70.5 71.75

Alpha: 0.05 ; DF Error: 15
Critical Value of t: 2.13145 

least Significant Difference: 7.435787 

Treatments with the same letter are not significantly different.

         y groups
4 70.66667      a
1 69.00000     ab
3 62.83333     bc
2 59.16667      c

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.9791, p-value = 0.8788

Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  3  1.4545  0.257
      20`,
    salidaDe: `y <- c(72, 65, 67, 75, 62, 73, 55, 59, 68, 70, 53, 50, 64, 74, 61, 58, 51, 69, 70, 68, 72, 77, 66, 71); trat <- factor(rep(c("1", "2", "3", "4"), each = 6)); bloque <- factor(rep(1:6, 4))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    partes: [
      { titulo: "a) Modelo e hipótesis", puntos: 1, solucion: String.raw`<p>Diseño en bloques completos al azar (DBCA): cada día (bloque) recibe los 4 atomizadors en orden aleatorio. Modelo: $Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij}$, $i=1,\dots,4$ (atomizador), $j=1,\dots,6$ (día), $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes y sin interacción atomizador × día.</p><p>Tratamientos: $H_0:\tau_1=\dots=\tau_4=0$ (las 4 medias son iguales) contra $H_1:\tau_i\neq0$ para algún $i$. Bloques: $H_0:\gamma_1=\dots=\gamma_6=0$ contra $H_1:\gamma_j\neq0$ para algún $j$.</p>` },
      { titulo: "b) ANOVA y diferencia entre marcas", puntos: 1.5, solucion: String.raw`<p>$N=4\cdot6=24$, $\;Y_{\cdot\cdot}^2/N=1570^2/24=102704{,}167$, $\;\sum\sum Y_{ij}^2=104088$.</p><p>$SC_T=104088-102704{,}167=1383{,}833$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{b}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{619326}{6}-102704{,}167=516{,}833$</p><p>$SC_B=\dfrac{\sum Y_{\cdot j}^2}{a}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{412094}{4}-102704{,}167=319{,}333$</p><p>$SC_E=SC_T-SC_{TRAT}-SC_B=547{,}667$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Marca</td><td>$516{,}833$</td><td>$3$</td><td>$172{,}278$</td><td>$4{,}72$</td><td>$0{,}0164$</td></tr><tr><td>Día</td><td>$319{,}333$</td><td>$5$</td><td>$63{,}867$</td><td>$1{,}75$</td><td>$0{,}1842$</td></tr><tr><td>Error</td><td>$547{,}667$</td><td>$15$</td><td>$36{,}511$</td><td></td><td></td></tr><tr><td>Total</td><td>$1383{,}833$</td><td>$23$</td><td></td><td></td><td></td></tr></tbody></table></div><p>Marca: $F_0=4{,}72$ &gt; $F_{0{,}05;3,15}=3{,}29$ ($p=0{,}0164$) ⇒ se <strong>rechaza</strong> $H_0$. Hay diferencias entre atomizadors: al menos uno tiene una mortalidad media distinta.</p>` },
      { titulo: "c) ¿Hay un atomizador mejor? (LSD)", puntos: 1.5, solucion: String.raw`<p>$LSD=t_{0{,}025;\,15}\sqrt{\dfrac{2\,CM_E}{b}}=2{,}131\sqrt{\dfrac{2\cdot36{,}5111}{6}}=7{,}436$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Diferencia</th><th>$|\bar Y_{i\cdot}-\bar Y_{j\cdot}|$</th><th>¿Significativa?</th></tr></thead><tbody><tr><td>1 − 2</td><td>$9{,}833$</td><td>Sí</td></tr><tr><td>1 − 3</td><td>$6{,}167$</td><td>No</td></tr><tr><td>1 − 4</td><td>$1{,}667$</td><td>No</td></tr><tr><td>2 − 3</td><td>$3{,}667$</td><td>No</td></tr><tr><td>2 − 4</td><td>$11{,}5$</td><td>Sí</td></tr><tr><td>3 − 4</td><td>$7{,}833$</td><td>Sí</td></tr></tbody></table></div><p>Medias: 4 $=70{,}667$, 1 $=69$, 3 $=62{,}833$, 2 $=59{,}167$. El de mejor media es <strong>4</strong>, pero no difiere significativamente de 1: estadísticamente empatan; se elige entre ellos por costo u otro criterio. (Objetivo: maximizar la mortalidad.) En R: <code>agricolae::LSD.test(modelo, "trat")</code>.</p>` },
      { titulo: "d) Efecto del día (bloque)", puntos: 1, solucion: "<p>Día: $F_0=1{,}75$ &lt; $F_{0{,}05;5,15}=2{,}9$ ($p=0{,}1842$) ⇒ <strong>no se rechaza</strong> $H_0$. No se detecta efecto del día; el bloqueo no era indispensable (aunque no perjudica mucho: solo cuesta 5 gl del error).</p>" },
      { titulo: "e) Supuestos", puntos: 1, solucion: "<p>Normalidad (Shapiro–Wilk sobre los residuos del modelo con bloque): $p=0{,}8788$ ⇒ no se rechaza la normalidad.</p><p>Varianza constante entre atomizadors (Levene, <code>car::leveneTest(y ~ trat)</code>): $p=0{,}257$ ⇒ no hay evidencia de varianzas distintas.</p><p>Gráficamente: QQ-plot de residuos (puntos sobre la recta) y residuos contra predichos y contra atomizador (banda horizontal sin forma de embudo).</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F tratamiento", r: `cat({y <- c(72, 65, 67, 75, 62, 73, 55, 59, 68, 70, 53, 50, 64, 74, 61, 58, 51, 69, 70, 68, 72, 77, 66, 71); trat <- factor(rep(c("1", "2", "3", "4"), each = 6)); bloque <- factor(rep(1:6, 4)); summary(aov(y ~ trat + bloque))[[1]][1, 4]})`, esperado: 4.72, tol: 0.0050000010000000004 },
      { que: "F bloque", r: `cat({y <- c(72, 65, 67, 75, 62, 73, 55, 59, 68, 70, 53, 50, 64, 74, 61, 58, 51, 69, 70, 68, 72, 77, 66, 71); trat <- factor(rep(c("1", "2", "3", "4"), each = 6)); bloque <- factor(rep(1:6, 4)); summary(aov(y ~ trat + bloque))[[1]][2, 4]})`, esperado: 1.75, tol: 0.0050000010000000004 },
      { que: "CME", r: `cat({y <- c(72, 65, 67, 75, 62, 73, 55, 59, 68, 70, 53, 50, 64, 74, 61, 58, 51, 69, 70, 68, 72, 77, 66, 71); trat <- factor(rep(c("1", "2", "3", "4"), each = 6)); bloque <- factor(rep(1:6, 4)); summary(aov(y ~ trat + bloque))[[1]][3, 3]})`, esperado: 36.511, tol: 0.000500001 },
      { que: "LSD", r: "cat(qt(0.975, 15) * sqrt(2 * 36.51111111111143 / 6))", esperado: 7.436, tol: 0.000500001 },
      { que: "p Shapiro", r: `cat({y <- c(72, 65, 67, 75, 62, 73, 55, 59, 68, 70, 53, 50, 64, 74, 61, 58, 51, 69, 70, 68, 72, 77, 66, 71); trat <- factor(rep(c("1", "2", "3", "4"), each = 6)); bloque <- factor(rep(1:6, 4)); shapiro.test(resid(aov(y ~ trat + bloque)))$p.value})`, esperado: 0.8788, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 4, ej. 10 (p. 119)" },
      { id: "C7.3", loc: "slides 9–17" },
      { id: "C7.3", loc: "slides 18–24" }
    ]
  },
  {
    id: "m20-d008",
    modulo: "m20-dbca",
    concepto: "m20-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 4, ej. 10 (p. 119)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 4, ej. 10 · DBCA: 3 marcas de atomizador en 5 días",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 4, ej. 10 del libro guía. Cambio respecto del original: solo 5 días (se eliminó el día 6) y la marca 2 en el día 3 dio 60 en vez de 68.</p><p>Se estudia la efectividad de 3 marcas de atomizador para matar moscas. Cada producto se aplica a un grupo de 100 moscas y se registra el porcentaje de moscas muertas. Se hicieron 5 réplicas en días diferentes, por lo que se sospecha un efecto del día. Use $\alpha=0{,}05$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Marca</th><th>Día 1</th><th>Día 2</th><th>Día 3</th><th>Día 4</th><th>Día 5</th></tr></thead><tbody><tr><td>1</td><td>72</td><td>65</td><td>67</td><td>75</td><td>62</td></tr><tr><td>2</td><td>55</td><td>59</td><td>60</td><td>70</td><td>53</td></tr><tr><td>3</td><td>64</td><td>74</td><td>61</td><td>58</td><td>51</td></tr></tbody></table></div><ol type="a"><li>Suponiendo un DBCA, formule las hipótesis adecuadas y el modelo estadístico.</li><li>¿Existe diferencia entre la efectividad promedio de los atomizadores?</li><li>¿Hay algún atomizador mejor? Argumente su respuesta.</li><li>¿Hay diferencias significativas en los resultados de diferentes días en que se realizó el experimento? Argumente su respuesta.</li><li>Verifique los supuestos de normalidad y de igual varianza entre las marcas.</li></ol>`,
    codigoR: `y <- c(72, 65, 67, 75, 62, 55, 59, 60, 70, 53, 64, 74, 61, 58, 51); trat <- factor(rep(c("1", "2", "3"), each = 5)); bloque <- factor(rep(1:5, 3))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value Pr(>F)
trat         2  209.7  104.87   2.806  0.119
bloque       4  270.3   67.57   1.808  0.221
Residuals    8  298.9   37.37               

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  37.36667 

trat,  means and individual ( 95 %) CI

     y      std r      se      LCL      UCL Min Max Q25 Q50 Q75
1 68.2 5.263079 5 2.73374 61.89598 74.50402  62  75  65  67  72
2 59.4 6.580274 5 2.73374 53.09598 65.70402  53  70  55  59  60
3 61.6 8.443933 5 2.73374 55.29598 67.90402  51  74  58  61  64

Alpha: 0.05 ; DF Error: 8
Critical Value of t: 2.306004 

least Significant Difference: 8.915224 

Treatments with the same letter are not significantly different.

     y groups
1 68.2      a
3 61.6      a
2 59.4      a

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.97803, p-value = 0.9543

Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  2  0.2291 0.7987
      12`,
    salidaDe: `y <- c(72, 65, 67, 75, 62, 55, 59, 60, 70, 53, 64, 74, 61, 58, 51); trat <- factor(rep(c("1", "2", "3"), each = 5)); bloque <- factor(rep(1:5, 3))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    partes: [
      { titulo: "a) Modelo e hipótesis", puntos: 1, solucion: String.raw`<p>Diseño en bloques completos al azar (DBCA): cada día (bloque) recibe los 3 atomizadors en orden aleatorio. Modelo: $Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij}$, $i=1,\dots,3$ (atomizador), $j=1,\dots,5$ (día), $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes y sin interacción atomizador × día.</p><p>Tratamientos: $H_0:\tau_1=\dots=\tau_3=0$ (las 3 medias son iguales) contra $H_1:\tau_i\neq0$ para algún $i$. Bloques: $H_0:\gamma_1=\dots=\gamma_5=0$ contra $H_1:\gamma_j\neq0$ para algún $j$.</p>` },
      { titulo: "b) ANOVA y diferencia entre marcas", puntos: 1.5, solucion: String.raw`<p>$N=3\cdot5=15$, $\;Y_{\cdot\cdot}^2/N=946^2/15=59661{,}067$, $\;\sum\sum Y_{ij}^2=60440$.</p><p>$SC_T=60440-59661{,}067=778{,}933$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{b}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{299354}{5}-59661{,}067=209{,}733$</p><p>$SC_B=\dfrac{\sum Y_{\cdot j}^2}{a}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{179794}{3}-59661{,}067=270{,}267$</p><p>$SC_E=SC_T-SC_{TRAT}-SC_B=298{,}933$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Marca</td><td>$209{,}733$</td><td>$2$</td><td>$104{,}867$</td><td>$2{,}81$</td><td>$0{,}1193$</td></tr><tr><td>Día</td><td>$270{,}267$</td><td>$4$</td><td>$67{,}567$</td><td>$1{,}81$</td><td>$0{,}2206$</td></tr><tr><td>Error</td><td>$298{,}933$</td><td>$8$</td><td>$37{,}367$</td><td></td><td></td></tr><tr><td>Total</td><td>$778{,}933$</td><td>$14$</td><td></td><td></td><td></td></tr></tbody></table></div><p>Marca: $F_0=2{,}81$ &lt; $F_{0{,}05;2,8}=4{,}46$ ($p=0{,}1193$) ⇒ <strong>no se rechaza</strong> $H_0$. No hay evidencia de diferencias entre las mortalidads medias de los atomizadors.</p>` },
      { titulo: "c) ¿Hay un atomizador mejor? (LSD)", puntos: 1.5, solucion: String.raw`<p>$LSD=t_{0{,}025;\,8}\sqrt{\dfrac{2\,CM_E}{b}}=2{,}306\sqrt{\dfrac{2\cdot37{,}3667}{5}}=8{,}915$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Diferencia</th><th>$|\bar Y_{i\cdot}-\bar Y_{j\cdot}|$</th><th>¿Significativa?</th></tr></thead><tbody><tr><td>1 − 2</td><td>$8{,}8$</td><td>No</td></tr><tr><td>1 − 3</td><td>$6{,}6$</td><td>No</td></tr><tr><td>2 − 3</td><td>$2{,}2$</td><td>No</td></tr></tbody></table></div><p>Medias: 1 $=68{,}2$, 3 $=61{,}6$, 2 $=59{,}4$. Como el ANOVA no rechazó $H_0$, en rigor no hay un atomizador mejor; el LSD solo se informa como ejercicio. (Objetivo: maximizar la mortalidad.) En R: <code>agricolae::LSD.test(modelo, "trat")</code>.</p>` },
      { titulo: "d) Efecto del día (bloque)", puntos: 1, solucion: "<p>Día: $F_0=1{,}81$ &lt; $F_{0{,}05;4,8}=3{,}84$ ($p=0{,}2206$) ⇒ <strong>no se rechaza</strong> $H_0$. No se detecta efecto del día; el bloqueo no era indispensable (aunque no perjudica mucho: solo cuesta 4 gl del error).</p>" },
      { titulo: "e) Supuestos", puntos: 1, solucion: "<p>Normalidad (Shapiro–Wilk sobre los residuos del modelo con bloque): $p=0{,}9543$ ⇒ no se rechaza la normalidad.</p><p>Varianza constante entre atomizadors (Levene, <code>car::leveneTest(y ~ trat)</code>): $p=0{,}7987$ ⇒ no hay evidencia de varianzas distintas.</p><p>Gráficamente: QQ-plot de residuos (puntos sobre la recta) y residuos contra predichos y contra atomizador (banda horizontal sin forma de embudo).</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F tratamiento", r: `cat({y <- c(72, 65, 67, 75, 62, 55, 59, 60, 70, 53, 64, 74, 61, 58, 51); trat <- factor(rep(c("1", "2", "3"), each = 5)); bloque <- factor(rep(1:5, 3)); summary(aov(y ~ trat + bloque))[[1]][1, 4]})`, esperado: 2.81, tol: 0.0050000010000000004 },
      { que: "F bloque", r: `cat({y <- c(72, 65, 67, 75, 62, 55, 59, 60, 70, 53, 64, 74, 61, 58, 51); trat <- factor(rep(c("1", "2", "3"), each = 5)); bloque <- factor(rep(1:5, 3)); summary(aov(y ~ trat + bloque))[[1]][2, 4]})`, esperado: 1.81, tol: 0.0050000010000000004 },
      { que: "CME", r: `cat({y <- c(72, 65, 67, 75, 62, 55, 59, 60, 70, 53, 64, 74, 61, 58, 51); trat <- factor(rep(c("1", "2", "3"), each = 5)); bloque <- factor(rep(1:5, 3)); summary(aov(y ~ trat + bloque))[[1]][3, 3]})`, esperado: 37.367, tol: 0.000500001 },
      { que: "LSD", r: "cat(qt(0.975, 8) * sqrt(2 * 37.36666666666588 / 5))", esperado: 8.915, tol: 0.000500001 },
      { que: "p Shapiro", r: `cat({y <- c(72, 65, 67, 75, 62, 55, 59, 60, 70, 53, 64, 74, 61, 58, 51); trat <- factor(rep(c("1", "2", "3"), each = 5)); bloque <- factor(rep(1:5, 3)); shapiro.test(resid(aov(y ~ trat + bloque)))$p.value})`, esperado: 0.9543, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 4, ej. 10 (p. 119)" },
      { id: "C7.3", loc: "slides 9–17" },
      { id: "C7.3", loc: "slides 18–24" }
    ]
  },
  {
    id: "m20-d009",
    modulo: "m20-dbca",
    concepto: "m20-c05",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 4, ej. 11 · DBCA: temperatura de 5 silos en 5 días",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 4, ej. 11 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro.</p><p>En una empresa lechera se tienen varios silos para almacenar leche. Un aspecto crítico es la temperatura de almacenamiento y se sospecha que en algunos silos hay problemas; por ello, durante 5 días se registra la temperatura a cierta hora crítica. La temperatura de un día a otro es una fuente de variabilidad que podría impactar la variabilidad total. Use $\alpha=0{,}05$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Silo</th><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th></tr></thead><tbody><tr><td>A</td><td>4</td><td>4</td><td>5</td><td>0{,}5</td><td>3</td></tr><tr><td>B</td><td>5</td><td>6</td><td>2</td><td>4</td><td>4</td></tr><tr><td>C</td><td>4{,}5</td><td>4</td><td>3{,}5</td><td>2</td><td>3</td></tr><tr><td>D</td><td>2{,}5</td><td>4</td><td>6{,}5</td><td>4{,}5</td><td>4</td></tr><tr><td>E</td><td>4</td><td>4</td><td>3{,}5</td><td>2</td><td>4</td></tr></tbody></table></div><ol type="a"><li>En este problema, ¿cuál es el factor de tratamiento y cuál el factor de bloque?</li><li>Suponga un DBCA, formule las hipótesis adecuadas y el modelo estadístico.</li><li>¿Hay diferencia entre los silos?</li><li>¿La temperatura de un día a otro es diferente?</li><li>Revise residuos, ¿hay algún problema evidente?</li></ol>`,
    codigoR: `y <- c(4, 4, 5, 0.5, 3, 5, 6, 2, 4, 4, 4.5, 4, 3.5, 2, 3, 2.5, 4, 6.5, 4.5, 4, 4, 4, 3.5, 2, 4); trat <- factor(rep(c("A", "B", "C", "D", "E"), each = 5)); bloque <- factor(rep(1:5, 5))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value Pr(>F)
trat         4   4.46   1.115   0.690  0.609
bloque       4   9.76   2.440   1.511  0.246
Residuals   16  25.84   1.615               

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  1.615 

trat,  means and individual ( 95 %) CI

    y       std r        se      LCL      UCL Min Max Q25 Q50 Q75
A 3.3 1.7175564 5 0.5683309 2.095192 4.504808 0.5 5.0 3.0 4.0 4.0
B 4.2 1.4832397 5 0.5683309 2.995192 5.404808 2.0 6.0 4.0 4.0 5.0
C 3.4 0.9617692 5 0.5683309 2.195192 4.604808 2.0 4.5 3.0 3.5 4.0
D 4.3 1.4404860 5 0.5683309 3.095192 5.504808 2.5 6.5 4.0 4.0 4.5
E 3.5 0.8660254 5 0.5683309 2.295192 4.704808 2.0 4.0 3.5 4.0 4.0

Alpha: 0.05 ; DF Error: 16
Critical Value of t: 2.119905 

least Significant Difference: 1.703855 

Treatments with the same letter are not significantly different.

    y groups
D 4.3      a
B 4.2      a
E 3.5      a
C 3.4      a
A 3.3      a

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.94059, p-value = 0.1528

Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  4  0.2736 0.8915
      20`,
    salidaDe: `y <- c(4, 4, 5, 0.5, 3, 5, 6, 2, 4, 4, 4.5, 4, 3.5, 2, 3, 2.5, 4, 6.5, 4.5, 4, 4, 4, 3.5, 2, 4); trat <- factor(rep(c("A", "B", "C", "D", "E"), each = 5)); bloque <- factor(rep(1:5, 5))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    partes: [
      { titulo: "a) Factor de tratamiento y de bloque", puntos: 0.5, solucion: "<p>Tratamiento: el <strong>silo</strong> (es lo que se quiere comparar). Bloque: el <strong>día</strong> (fuente de variación conocida que no interesa estudiar, pero que se controla para que no infle el error).</p>" },
      { titulo: "b) Modelo e hipótesis", puntos: 1, solucion: String.raw`<p>Diseño en bloques completos al azar (DBCA): cada día (bloque) recibe los 5 silos en orden aleatorio. Modelo: $Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij}$, $i=1,\dots,5$ (silo), $j=1,\dots,5$ (día), $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes y sin interacción silo × día.</p><p>Tratamientos: $H_0:\tau_1=\dots=\tau_5=0$ (las 5 medias son iguales) contra $H_1:\tau_i\neq0$ para algún $i$. Bloques: $H_0:\gamma_1=\dots=\gamma_5=0$ contra $H_1:\gamma_j\neq0$ para algún $j$.</p>` },
      { titulo: "c) ¿Hay diferencia entre silos?", puntos: 2, solucion: String.raw`<p>$N=5\cdot5=25$, $\;Y_{\cdot\cdot}^2/N=93{,}5^2/25=349{,}69$, $\;\sum\sum Y_{ij}^2=389{,}75$.</p><p>$SC_T=389{,}75-349{,}69=40{,}06$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{b}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{1770{,}75}{5}-349{,}69=4{,}46$</p><p>$SC_B=\dfrac{\sum Y_{\cdot j}^2}{a}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{1797{,}25}{5}-349{,}69=9{,}76$</p><p>$SC_E=SC_T-SC_{TRAT}-SC_B=25{,}84$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Silo</td><td>$4{,}46$</td><td>$4$</td><td>$1{,}115$</td><td>$0{,}69$</td><td>$0{,}6092$</td></tr><tr><td>Día</td><td>$9{,}76$</td><td>$4$</td><td>$2{,}44$</td><td>$1{,}51$</td><td>$0{,}246$</td></tr><tr><td>Error</td><td>$25{,}84$</td><td>$16$</td><td>$1{,}615$</td><td></td><td></td></tr><tr><td>Total</td><td>$40{,}06$</td><td>$24$</td><td></td><td></td><td></td></tr></tbody></table></div><p>Silo: $F_0=0{,}69$ &lt; $F_{0{,}05;4,16}=3{,}01$ ($p=0{,}6092$) ⇒ <strong>no se rechaza</strong> $H_0$. No hay evidencia de diferencias entre las temperaturas medias de los silos.</p>` },
      { titulo: "d) ¿Difiere la temperatura entre días?", puntos: 1, solucion: "<p>Día: $F_0=1{,}51$ &lt; $F_{0{,}05;4,16}=3{,}01$ ($p=0{,}246$) ⇒ <strong>no se rechaza</strong> $H_0$. No se detecta efecto del día; el bloqueo no era indispensable (aunque no perjudica mucho: solo cuesta 4 gl del error).</p>" },
      { titulo: "e) Revisión de residuos", puntos: 1.5, solucion: String.raw`<p>Residuo del DBCA: $e_{ij}=Y_{ij}-\bar Y_{i\cdot}-\bar Y_{\cdot j}+\bar Y_{\cdot\cdot}$. El mayor en valor absoluto es el de B en Miércoles: $e=-2{,}56$, estandarizado $d=e/\sqrt{CM_E}=-2{,}01$.</p><p>Ningún residuo estandarizado supera 2,5 en valor absoluto: no hay datos atípicos evidentes.</p><p>Shapiro–Wilk $p=0{,}1528$; Levene entre silos $p=0{,}8915$.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F tratamiento", r: `cat({y <- c(4, 4, 5, 0.5, 3, 5, 6, 2, 4, 4, 4.5, 4, 3.5, 2, 3, 2.5, 4, 6.5, 4.5, 4, 4, 4, 3.5, 2, 4); trat <- factor(rep(c("A", "B", "C", "D", "E"), each = 5)); bloque <- factor(rep(1:5, 5)); summary(aov(y ~ trat + bloque))[[1]][1, 4]})`, esperado: 0.69, tol: 0.0050000010000000004 },
      { que: "F bloque", r: `cat({y <- c(4, 4, 5, 0.5, 3, 5, 6, 2, 4, 4, 4.5, 4, 3.5, 2, 3, 2.5, 4, 6.5, 4.5, 4, 4, 4, 3.5, 2, 4); trat <- factor(rep(c("A", "B", "C", "D", "E"), each = 5)); bloque <- factor(rep(1:5, 5)); summary(aov(y ~ trat + bloque))[[1]][2, 4]})`, esperado: 1.51, tol: 0.0050000010000000004 },
      { que: "CME", r: `cat({y <- c(4, 4, 5, 0.5, 3, 5, 6, 2, 4, 4, 4.5, 4, 3.5, 2, 3, 2.5, 4, 6.5, 4.5, 4, 4, 4, 3.5, 2, 4); trat <- factor(rep(c("A", "B", "C", "D", "E"), each = 5)); bloque <- factor(rep(1:5, 5)); summary(aov(y ~ trat + bloque))[[1]][3, 3]})`, esperado: 1.615, tol: 0.000500001 },
      { que: "LSD", r: "cat(qt(0.975, 16) * sqrt(2 * 1.615000000000002 / 5))", esperado: 1.704, tol: 0.000500001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 4, ej. 11 (pp. 119–120)" },
      { id: "C7.3", loc: "slides 9–17" }
    ]
  },
  {
    id: "m20-d010",
    modulo: "m20-dbca",
    concepto: "m20-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 4, ej. 11 (pp. 119–120)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 4, ej. 11 · DBCA: temperatura de 5 silos en 5 días",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 4, ej. 11 del libro guía. Cambio respecto del original: se corrigió la lectura del silo A el jueves (3,5 en vez de 0,5) y la del silo D el miércoles (3,5 en vez de 6,5).</p><p>En una empresa lechera se tienen varios silos para almacenar leche. Un aspecto crítico es la temperatura de almacenamiento y se sospecha que en algunos silos hay problemas; por ello, durante 5 días se registra la temperatura a cierta hora crítica. La temperatura de un día a otro es una fuente de variabilidad que podría impactar la variabilidad total. Use $\alpha=0{,}05$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Silo</th><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th></tr></thead><tbody><tr><td>A</td><td>4</td><td>4</td><td>5</td><td>3{,}5</td><td>3</td></tr><tr><td>B</td><td>5</td><td>6</td><td>2</td><td>4</td><td>4</td></tr><tr><td>C</td><td>4{,}5</td><td>4</td><td>3{,}5</td><td>2</td><td>3</td></tr><tr><td>D</td><td>2{,}5</td><td>4</td><td>3{,}5</td><td>4{,}5</td><td>4</td></tr><tr><td>E</td><td>4</td><td>4</td><td>3{,}5</td><td>2</td><td>4</td></tr></tbody></table></div><ol type="a"><li>En este problema, ¿cuál es el factor de tratamiento y cuál el factor de bloque?</li><li>Suponga un DBCA, formule las hipótesis adecuadas y el modelo estadístico.</li><li>¿Hay diferencia entre los silos?</li><li>¿La temperatura de un día a otro es diferente?</li><li>Revise residuos, ¿hay algún problema evidente?</li></ol>`,
    codigoR: `y <- c(4, 4, 5, 3.5, 3, 5, 6, 2, 4, 4, 4.5, 4, 3.5, 2, 3, 2.5, 4, 3.5, 4.5, 4, 4, 4, 3.5, 2, 4); trat <- factor(rep(c("A", "B", "C", "D", "E"), each = 5)); bloque <- factor(rep(1:5, 5))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value Pr(>F)
trat         4   2.06  0.5150   0.527  0.718
bloque       4   4.36  1.0900   1.115  0.384
Residuals   16  15.64  0.9775               

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  0.9775 

trat,  means and individual ( 95 %) CI

    y       std r        se      LCL      UCL Min Max Q25 Q50 Q75
A 3.9 0.7416198 5 0.4421538 2.962676 4.837324 3.0 5.0 3.5 4.0   4
B 4.2 1.4832397 5 0.4421538 3.262676 5.137324 2.0 6.0 4.0 4.0   5
C 3.4 0.9617692 5 0.4421538 2.462676 4.337324 2.0 4.5 3.0 3.5   4
D 3.7 0.7582875 5 0.4421538 2.762676 4.637324 2.5 4.5 3.5 4.0   4
E 3.5 0.8660254 5 0.4421538 2.562676 4.437324 2.0 4.0 3.5 4.0   4

Alpha: 0.05 ; DF Error: 16
Critical Value of t: 2.119905 

least Significant Difference: 1.325577 

Treatments with the same letter are not significantly different.

    y groups
B 4.2      a
A 3.9      a
D 3.7      a
E 3.5      a
C 3.4      a

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.97302, p-value = 0.722

Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  4  0.4444 0.7751
      20`,
    salidaDe: `y <- c(4, 4, 5, 3.5, 3, 5, 6, 2, 4, 4, 4.5, 4, 3.5, 2, 3, 2.5, 4, 3.5, 4.5, 4, 4, 4, 3.5, 2, 4); trat <- factor(rep(c("A", "B", "C", "D", "E"), each = 5)); bloque <- factor(rep(1:5, 5))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    partes: [
      { titulo: "a) Factor de tratamiento y de bloque", puntos: 0.5, solucion: "<p>Tratamiento: el <strong>silo</strong> (es lo que se quiere comparar). Bloque: el <strong>día</strong> (fuente de variación conocida que no interesa estudiar, pero que se controla para que no infle el error).</p>" },
      { titulo: "b) Modelo e hipótesis", puntos: 1, solucion: String.raw`<p>Diseño en bloques completos al azar (DBCA): cada día (bloque) recibe los 5 silos en orden aleatorio. Modelo: $Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij}$, $i=1,\dots,5$ (silo), $j=1,\dots,5$ (día), $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes y sin interacción silo × día.</p><p>Tratamientos: $H_0:\tau_1=\dots=\tau_5=0$ (las 5 medias son iguales) contra $H_1:\tau_i\neq0$ para algún $i$. Bloques: $H_0:\gamma_1=\dots=\gamma_5=0$ contra $H_1:\gamma_j\neq0$ para algún $j$.</p>` },
      { titulo: "c) ¿Hay diferencia entre silos?", puntos: 2, solucion: String.raw`<p>$N=5\cdot5=25$, $\;Y_{\cdot\cdot}^2/N=93{,}5^2/25=349{,}69$, $\;\sum\sum Y_{ij}^2=371{,}75$.</p><p>$SC_T=371{,}75-349{,}69=22{,}06$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{b}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{1758{,}75}{5}-349{,}69=2{,}06$</p><p>$SC_B=\dfrac{\sum Y_{\cdot j}^2}{a}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{1770{,}25}{5}-349{,}69=4{,}36$</p><p>$SC_E=SC_T-SC_{TRAT}-SC_B=15{,}64$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Silo</td><td>$2{,}06$</td><td>$4$</td><td>$0{,}515$</td><td>$0{,}53$</td><td>$0{,}7176$</td></tr><tr><td>Día</td><td>$4{,}36$</td><td>$4$</td><td>$1{,}09$</td><td>$1{,}12$</td><td>$0{,}3837$</td></tr><tr><td>Error</td><td>$15{,}64$</td><td>$16$</td><td>$0{,}978$</td><td></td><td></td></tr><tr><td>Total</td><td>$22{,}06$</td><td>$24$</td><td></td><td></td><td></td></tr></tbody></table></div><p>Silo: $F_0=0{,}53$ &lt; $F_{0{,}05;4,16}=3{,}01$ ($p=0{,}7176$) ⇒ <strong>no se rechaza</strong> $H_0$. No hay evidencia de diferencias entre las temperaturas medias de los silos.</p>` },
      { titulo: "d) ¿Difiere la temperatura entre días?", puntos: 1, solucion: "<p>Día: $F_0=1{,}12$ &lt; $F_{0{,}05;4,16}=3{,}01$ ($p=0{,}3837$) ⇒ <strong>no se rechaza</strong> $H_0$. No se detecta efecto del día; el bloqueo no era indispensable (aunque no perjudica mucho: solo cuesta 4 gl del error).</p>" },
      { titulo: "e) Revisión de residuos", puntos: 1.5, solucion: String.raw`<p>Residuo del DBCA: $e_{ij}=Y_{ij}-\bar Y_{i\cdot}-\bar Y_{\cdot j}+\bar Y_{\cdot\cdot}$. El mayor en valor absoluto es el de B en Miércoles: $e=-1{,}96$, estandarizado $d=e/\sqrt{CM_E}=-1{,}98$.</p><p>Ningún residuo estandarizado supera 2,5 en valor absoluto: no hay datos atípicos evidentes.</p><p>Shapiro–Wilk $p=0{,}722$; Levene entre silos $p=0{,}7751$.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F tratamiento", r: `cat({y <- c(4, 4, 5, 3.5, 3, 5, 6, 2, 4, 4, 4.5, 4, 3.5, 2, 3, 2.5, 4, 3.5, 4.5, 4, 4, 4, 3.5, 2, 4); trat <- factor(rep(c("A", "B", "C", "D", "E"), each = 5)); bloque <- factor(rep(1:5, 5)); summary(aov(y ~ trat + bloque))[[1]][1, 4]})`, esperado: 0.53, tol: 0.0050000010000000004 },
      { que: "F bloque", r: `cat({y <- c(4, 4, 5, 3.5, 3, 5, 6, 2, 4, 4, 4.5, 4, 3.5, 2, 3, 2.5, 4, 3.5, 4.5, 4, 4, 4, 3.5, 2, 4); trat <- factor(rep(c("A", "B", "C", "D", "E"), each = 5)); bloque <- factor(rep(1:5, 5)); summary(aov(y ~ trat + bloque))[[1]][2, 4]})`, esperado: 1.12, tol: 0.0050000010000000004 },
      { que: "CME", r: `cat({y <- c(4, 4, 5, 3.5, 3, 5, 6, 2, 4, 4, 4.5, 4, 3.5, 2, 3, 2.5, 4, 3.5, 4.5, 4, 4, 4, 3.5, 2, 4); trat <- factor(rep(c("A", "B", "C", "D", "E"), each = 5)); bloque <- factor(rep(1:5, 5)); summary(aov(y ~ trat + bloque))[[1]][3, 3]})`, esperado: 0.978, tol: 0.000500001 },
      { que: "LSD", r: "cat(qt(0.975, 16) * sqrt(2 * 0.9774999999999991 / 5))", esperado: 1.326, tol: 0.000500001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 4, ej. 11 (pp. 119–120)" },
      { id: "C7.3", loc: "slides 9–17" }
    ]
  },
  {
    id: "m20-d011",
    modulo: "m20-dbca",
    concepto: "m20-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 4, ej. 11 (pp. 119–120)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 4, ej. 11 · DBCA: temperatura de 4 silos en 4 días",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 4, ej. 11 del libro guía. Cambio respecto del original: solo 4 silos (A–D) y 4 días (lunes a jueves), con el silo B 1 grado más caliente cada día.</p><p>En una empresa lechera se tienen varios silos para almacenar leche. Un aspecto crítico es la temperatura de almacenamiento y se sospecha que en algunos silos hay problemas; por ello, durante 4 días se registra la temperatura a cierta hora crítica. La temperatura de un día a otro es una fuente de variabilidad que podría impactar la variabilidad total. Use $\alpha=0{,}05$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Silo</th><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th></tr></thead><tbody><tr><td>A</td><td>4</td><td>4</td><td>5</td><td>0{,}5</td></tr><tr><td>B</td><td>6</td><td>7</td><td>3</td><td>5</td></tr><tr><td>C</td><td>4{,}5</td><td>4</td><td>3{,}5</td><td>2</td></tr><tr><td>D</td><td>2{,}5</td><td>4</td><td>6{,}5</td><td>4{,}5</td></tr></tbody></table></div><ol type="a"><li>En este problema, ¿cuál es el factor de tratamiento y cuál el factor de bloque?</li><li>Suponga un DBCA, formule las hipótesis adecuadas y el modelo estadístico.</li><li>¿Hay diferencia entre los silos?</li><li>¿La temperatura de un día a otro es diferente?</li><li>Revise residuos, ¿hay algún problema evidente?</li></ol>`,
    codigoR: `y <- c(4, 4, 5, 0.5, 6, 7, 3, 5, 4.5, 4, 3.5, 2, 2.5, 4, 6.5, 4.5); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value Pr(>F)
trat         3  9.125   3.042   1.101  0.398
bloque       3  7.250   2.417   0.874  0.490
Residuals    9 24.875   2.764               

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  2.763889 

trat,  means and individual ( 95 %) CI

      y      std r        se      LCL      UCL Min Max   Q25  Q50   Q75
A 3.375 1.973787 4 0.8312474 1.494588 5.255412 0.5 5.0 3.125 4.00 4.250
B 5.250 1.707825 4 0.8312474 3.369588 7.130412 3.0 7.0 4.500 5.50 6.250
C 3.500 1.080123 4 0.8312474 1.619588 5.380412 2.0 4.5 3.125 3.75 4.125
D 4.375 1.652019 4 0.8312474 2.494588 6.255412 2.5 6.5 3.625 4.25 5.000

Alpha: 0.05 ; DF Error: 9
Critical Value of t: 2.262157 

least Significant Difference: 2.659304 

Treatments with the same letter are not significantly different.

      y groups
B 5.250      a
D 4.375      a
C 3.500      a
A 3.375      a

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.9302, p-value = 0.2456

Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  3   0.144 0.9316
      12`,
    salidaDe: `y <- c(4, 4, 5, 0.5, 6, 7, 3, 5, 4.5, 4, 3.5, 2, 2.5, 4, 6.5, 4.5); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    partes: [
      { titulo: "a) Factor de tratamiento y de bloque", puntos: 0.5, solucion: "<p>Tratamiento: el <strong>silo</strong> (es lo que se quiere comparar). Bloque: el <strong>día</strong> (fuente de variación conocida que no interesa estudiar, pero que se controla para que no infle el error).</p>" },
      { titulo: "b) Modelo e hipótesis", puntos: 1, solucion: String.raw`<p>Diseño en bloques completos al azar (DBCA): cada día (bloque) recibe los 4 silos en orden aleatorio. Modelo: $Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij}$, $i=1,\dots,4$ (silo), $j=1,\dots,4$ (día), $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes y sin interacción silo × día.</p><p>Tratamientos: $H_0:\tau_1=\dots=\tau_4=0$ (las 4 medias son iguales) contra $H_1:\tau_i\neq0$ para algún $i$. Bloques: $H_0:\gamma_1=\dots=\gamma_4=0$ contra $H_1:\gamma_j\neq0$ para algún $j$.</p>` },
      { titulo: "c) ¿Hay diferencia entre silos?", puntos: 2, solucion: String.raw`<p>$N=4\cdot4=16$, $\;Y_{\cdot\cdot}^2/N=66^2/16=272{,}25$, $\;\sum\sum Y_{ij}^2=313{,}5$.</p><p>$SC_T=313{,}5-272{,}25=41{,}25$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{b}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{1125{,}5}{4}-272{,}25=9{,}125$</p><p>$SC_B=\dfrac{\sum Y_{\cdot j}^2}{a}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{1118}{4}-272{,}25=7{,}25$</p><p>$SC_E=SC_T-SC_{TRAT}-SC_B=24{,}875$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Silo</td><td>$9{,}125$</td><td>$3$</td><td>$3{,}042$</td><td>$1{,}1$</td><td>$0{,}3982$</td></tr><tr><td>Día</td><td>$7{,}25$</td><td>$3$</td><td>$2{,}417$</td><td>$0{,}87$</td><td>$0{,}4896$</td></tr><tr><td>Error</td><td>$24{,}875$</td><td>$9$</td><td>$2{,}764$</td><td></td><td></td></tr><tr><td>Total</td><td>$41{,}25$</td><td>$15$</td><td></td><td></td><td></td></tr></tbody></table></div><p>Silo: $F_0=1{,}1$ &lt; $F_{0{,}05;3,9}=3{,}86$ ($p=0{,}3982$) ⇒ <strong>no se rechaza</strong> $H_0$. No hay evidencia de diferencias entre las temperaturas medias de los silos.</p>` },
      { titulo: "d) ¿Difiere la temperatura entre días?", puntos: 1, solucion: "<p>Día: $F_0=0{,}87$ &lt; $F_{0{,}05;3,9}=3{,}86$ ($p=0{,}4896$) ⇒ <strong>no se rechaza</strong> $H_0$. No se detecta efecto del día; el bloqueo no era indispensable (aunque no perjudica mucho: solo cuesta 3 gl del error).</p>" },
      { titulo: "e) Revisión de residuos", puntos: 1.5, solucion: String.raw`<p>Residuo del DBCA: $e_{ij}=Y_{ij}-\bar Y_{i\cdot}-\bar Y_{\cdot j}+\bar Y_{\cdot\cdot}$. El mayor en valor absoluto es el de B en Miércoles: $e=-2{,}625$, estandarizado $d=e/\sqrt{CM_E}=-1{,}58$.</p><p>Ningún residuo estandarizado supera 2,5 en valor absoluto: no hay datos atípicos evidentes.</p><p>Shapiro–Wilk $p=0{,}2456$; Levene entre silos $p=0{,}9316$.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F tratamiento", r: `cat({y <- c(4, 4, 5, 0.5, 6, 7, 3, 5, 4.5, 4, 3.5, 2, 2.5, 4, 6.5, 4.5); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4)); summary(aov(y ~ trat + bloque))[[1]][1, 4]})`, esperado: 1.1, tol: 0.0050000010000000004 },
      { que: "F bloque", r: `cat({y <- c(4, 4, 5, 0.5, 6, 7, 3, 5, 4.5, 4, 3.5, 2, 2.5, 4, 6.5, 4.5); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4)); summary(aov(y ~ trat + bloque))[[1]][2, 4]})`, esperado: 0.87, tol: 0.0050000010000000004 },
      { que: "CME", r: `cat({y <- c(4, 4, 5, 0.5, 6, 7, 3, 5, 4.5, 4, 3.5, 2, 2.5, 4, 6.5, 4.5); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4)); summary(aov(y ~ trat + bloque))[[1]][3, 3]})`, esperado: 2.764, tol: 0.000500001 },
      { que: "LSD", r: "cat(qt(0.975, 9) * sqrt(2 * 2.763888888888889 / 4))", esperado: 2.659, tol: 0.000500001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 4, ej. 11 (pp. 119–120)" },
      { id: "C7.3", loc: "slides 9–17" }
    ]
  },
  {
    id: "m20-d012",
    modulo: "m20-dbca",
    concepto: "m20-c03",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 4, ej. 12 · DBCA: 4 detergentes en 3 lavadoras",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 4, ej. 12 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro.</p><p>Se diseñó un experimento para estudiar el rendimiento de 4 detergentes. Las siguientes lecturas de «blancura» se obtuvieron con un equipo especial para 12 cargas de lavado, distribuidas en 3 modelos de lavadoras (mayor blancura es mejor). Use $\alpha=0{,}05$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Detergente</th><th>Lavadora 1</th><th>Lavadora 2</th><th>Lavadora 3</th></tr></thead><tbody><tr><td>A</td><td>45</td><td>43</td><td>51</td></tr><tr><td>B</td><td>47</td><td>44</td><td>52</td></tr><tr><td>C</td><td>50</td><td>49</td><td>57</td></tr><tr><td>D</td><td>42</td><td>37</td><td>49</td></tr></tbody></table></div><ol type="a"><li>Señale el nombre del diseño experimental utilizado.</li><li>Formule la hipótesis que se quiere probar en este problema.</li><li>Realice el análisis estadístico más apropiado para estos datos y obtenga conclusiones.</li></ol>`,
    codigoR: `y <- c(45, 43, 51, 47, 44, 52, 50, 49, 57, 42, 37, 49); trat <- factor(rep(c("A", "B", "C", "D"), each = 3)); bloque <- factor(rep(1:3, 4))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value   Pr(>F)    
trat         3 133.67   44.56   34.13 0.000363 ***
bloque       2 170.17   85.08   65.17 8.52e-05 ***
Residuals    6   7.83    1.31                     
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  1.305556 

trat,  means and individual ( 95 %) CI

         y      std r        se      LCL      UCL Min Max  Q25 Q50  Q75
A 46.33333 4.163332 3 0.6596857 44.71914 47.94753  43  51 44.0  45 48.0
B 47.66667 4.041452 3 0.6596857 46.05247 49.28086  44  52 45.5  47 49.5
C 52.00000 4.358899 3 0.6596857 50.38581 53.61419  49  57 49.5  50 53.5
D 42.66667 6.027714 3 0.6596857 41.05247 44.28086  37  49 39.5  42 45.5

Alpha: 0.05 ; DF Error: 6
Critical Value of t: 2.446912 

least Significant Difference: 2.282813 

Treatments with the same letter are not significantly different.

         y groups
C 52.00000      a
B 47.66667      b
A 46.33333      b
D 42.66667      c

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.96851, p-value = 0.8946

Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  3   0.124 0.9433
       8`,
    salidaDe: `y <- c(45, 43, 51, 47, 44, 52, 50, 49, 57, 42, 37, 49); trat <- factor(rep(c("A", "B", "C", "D"), each = 3)); bloque <- factor(rep(1:3, 4))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    partes: [
      { titulo: "a) Nombre del diseño", puntos: 1, solucion: "<p>Diseño en <strong>bloques completos al azar</strong> (DBCA): el factor de interés es el detergente (4 niveles) y la lavadora es un factor de bloque (3 niveles); cada lavadora recibe una carga con cada detergente, en orden aleatorio.</p>" },
      { titulo: "b) Hipótesis", puntos: 1, solucion: String.raw`<p>Diseño en bloques completos al azar (DBCA): cada lavadora (bloque) recibe los 4 detergentes en orden aleatorio. Modelo: $Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij}$, $i=1,\dots,4$ (detergente), $j=1,\dots,3$ (lavadora), $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes y sin interacción detergente × lavadora.</p><p>Tratamientos: $H_0:\tau_1=\dots=\tau_4=0$ (las 4 medias son iguales) contra $H_1:\tau_i\neq0$ para algún $i$. Bloques: $H_0:\gamma_1=\dots=\gamma_3=0$ contra $H_1:\gamma_j\neq0$ para algún $j$.</p>` },
      { titulo: "c) Tabla ANOVA y conclusión", puntos: 2, solucion: String.raw`<p>$N=4\cdot3=12$, $\;Y_{\cdot\cdot}^2/N=566^2/12=26696{,}333$, $\;\sum\sum Y_{ij}^2=27008$.</p><p>$SC_T=27008-26696{,}333=311{,}667$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{b}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{80490}{3}-26696{,}333=133{,}667$</p><p>$SC_B=\dfrac{\sum Y_{\cdot j}^2}{a}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{107466}{4}-26696{,}333=170{,}167$</p><p>$SC_E=SC_T-SC_{TRAT}-SC_B=7{,}833$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Detergente</td><td>$133{,}667$</td><td>$3$</td><td>$44{,}556$</td><td>$34{,}13$</td><td>$0{,}0004$</td></tr><tr><td>Lavadora</td><td>$170{,}167$</td><td>$2$</td><td>$85{,}083$</td><td>$65{,}17$</td><td>$\lt 0{,}0001$</td></tr><tr><td>Error</td><td>$7{,}833$</td><td>$6$</td><td>$1{,}306$</td><td></td><td></td></tr><tr><td>Total</td><td>$311{,}667$</td><td>$11$</td><td></td><td></td><td></td></tr></tbody></table></div><p>Detergente: $F_0=34{,}13$ &gt; $F_{0{,}05;3,6}=4{,}76$ ($p=0{,}0004$) ⇒ se <strong>rechaza</strong> $H_0$. Hay diferencias entre detergentes: al menos uno tiene una blancura media distinta.</p><p>Lavadora: $F_0=65{,}17$ &gt; $F_{0{,}05;2,6}=5{,}14$ ($p\lt 0{,}0001$) ⇒ se <strong>rechaza</strong> $H_0$. El lavadora sí influye: bloquear fue útil porque sacó esa variabilidad del error.</p>` },
      { titulo: "c) Comparaciones LSD y recomendación", puntos: 2, solucion: String.raw`<p>$LSD=t_{0{,}025;\,6}\sqrt{\dfrac{2\,CM_E}{b}}=2{,}447\sqrt{\dfrac{2\cdot1{,}3056}{3}}=2{,}283$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Diferencia</th><th>$|\bar Y_{i\cdot}-\bar Y_{j\cdot}|$</th><th>¿Significativa?</th></tr></thead><tbody><tr><td>A − B</td><td>$1{,}333$</td><td>No</td></tr><tr><td>A − C</td><td>$5{,}667$</td><td>Sí</td></tr><tr><td>A − D</td><td>$3{,}667$</td><td>Sí</td></tr><tr><td>B − C</td><td>$4{,}333$</td><td>Sí</td></tr><tr><td>B − D</td><td>$5$</td><td>Sí</td></tr><tr><td>C − D</td><td>$9{,}333$</td><td>Sí</td></tr></tbody></table></div><p>Medias: C $=52$, B $=47{,}667$, A $=46{,}333$, D $=42{,}667$. <strong>C</strong> es significativamente mejor que todos los demás. (Objetivo: maximizar la blancura.) En R: <code>agricolae::LSD.test(modelo, "trat")</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F tratamiento", r: `cat({y <- c(45, 43, 51, 47, 44, 52, 50, 49, 57, 42, 37, 49); trat <- factor(rep(c("A", "B", "C", "D"), each = 3)); bloque <- factor(rep(1:3, 4)); summary(aov(y ~ trat + bloque))[[1]][1, 4]})`, esperado: 34.13, tol: 0.0050000010000000004 },
      { que: "F bloque", r: `cat({y <- c(45, 43, 51, 47, 44, 52, 50, 49, 57, 42, 37, 49); trat <- factor(rep(c("A", "B", "C", "D"), each = 3)); bloque <- factor(rep(1:3, 4)); summary(aov(y ~ trat + bloque))[[1]][2, 4]})`, esperado: 65.17, tol: 0.0050000010000000004 },
      { que: "CME", r: `cat({y <- c(45, 43, 51, 47, 44, 52, 50, 49, 57, 42, 37, 49); trat <- factor(rep(c("A", "B", "C", "D"), each = 3)); bloque <- factor(rep(1:3, 4)); summary(aov(y ~ trat + bloque))[[1]][3, 3]})`, esperado: 1.306, tol: 0.000500001 },
      { que: "LSD", r: "cat(qt(0.975, 6) * sqrt(2 * 1.3055555555553535 / 3))", esperado: 2.283, tol: 0.000500001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 4, ej. 12 (p. 120)" },
      { id: "C7.3", loc: "slides 9–17" },
      { id: "C7.3", loc: "slides 18–24" }
    ]
  },
  {
    id: "m20-d013",
    modulo: "m20-dbca",
    concepto: "m20-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 4, ej. 12 (p. 120)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 4, ej. 12 · DBCA: 4 detergentes en 3 lavadoras",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 4, ej. 12 del libro guía. Cambio respecto del original: el detergente B tuvo lecturas 2, 2 y 1 puntos más altas.</p><p>Se diseñó un experimento para estudiar el rendimiento de 4 detergentes. Las siguientes lecturas de «blancura» se obtuvieron con un equipo especial para 12 cargas de lavado, distribuidas en 3 modelos de lavadoras (mayor blancura es mejor). Use $\alpha=0{,}05$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Detergente</th><th>Lavadora 1</th><th>Lavadora 2</th><th>Lavadora 3</th></tr></thead><tbody><tr><td>A</td><td>45</td><td>43</td><td>51</td></tr><tr><td>B</td><td>49</td><td>46</td><td>53</td></tr><tr><td>C</td><td>50</td><td>49</td><td>57</td></tr><tr><td>D</td><td>42</td><td>37</td><td>49</td></tr></tbody></table></div><ol type="a"><li>Señale el nombre del diseño experimental utilizado.</li><li>Formule la hipótesis que se quiere probar en este problema.</li><li>Realice el análisis estadístico más apropiado para estos datos y obtenga conclusiones.</li></ol>`,
    codigoR: `y <- c(45, 43, 51, 49, 46, 53, 50, 49, 57, 42, 37, 49); trat <- factor(rep(c("A", "B", "C", "D"), each = 3)); bloque <- factor(rep(1:3, 4))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value   Pr(>F)    
trat         3 144.92   48.31   29.48 0.000548 ***
bloque       2 160.17   80.08   48.86 0.000194 ***
Residuals    6   9.83    1.64                     
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  1.638889 

trat,  means and individual ( 95 %) CI

         y      std r        se      LCL      UCL Min Max  Q25 Q50  Q75
A 46.33333 4.163332 3 0.7391186 44.52478 48.14189  43  51 44.0  45 48.0
B 49.33333 3.511885 3 0.7391186 47.52478 51.14189  46  53 47.5  49 51.0
C 52.00000 4.358899 3 0.7391186 50.19144 53.80856  49  57 49.5  50 53.5
D 42.66667 6.027714 3 0.7391186 40.85811 44.47522  37  49 39.5  42 45.5

Alpha: 0.05 ; DF Error: 6
Critical Value of t: 2.446912 

least Significant Difference: 2.557687 

Treatments with the same letter are not significantly different.

         y groups
C 52.00000      a
B 49.33333      b
A 46.33333      c
D 42.66667      d

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.95317, p-value = 0.6837

Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  3  0.1599 0.9203
       8`,
    salidaDe: `y <- c(45, 43, 51, 49, 46, 53, 50, 49, 57, 42, 37, 49); trat <- factor(rep(c("A", "B", "C", "D"), each = 3)); bloque <- factor(rep(1:3, 4))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    partes: [
      { titulo: "a) Nombre del diseño", puntos: 1, solucion: "<p>Diseño en <strong>bloques completos al azar</strong> (DBCA): el factor de interés es el detergente (4 niveles) y la lavadora es un factor de bloque (3 niveles); cada lavadora recibe una carga con cada detergente, en orden aleatorio.</p>" },
      { titulo: "b) Hipótesis", puntos: 1, solucion: String.raw`<p>Diseño en bloques completos al azar (DBCA): cada lavadora (bloque) recibe los 4 detergentes en orden aleatorio. Modelo: $Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij}$, $i=1,\dots,4$ (detergente), $j=1,\dots,3$ (lavadora), $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes y sin interacción detergente × lavadora.</p><p>Tratamientos: $H_0:\tau_1=\dots=\tau_4=0$ (las 4 medias son iguales) contra $H_1:\tau_i\neq0$ para algún $i$. Bloques: $H_0:\gamma_1=\dots=\gamma_3=0$ contra $H_1:\gamma_j\neq0$ para algún $j$.</p>` },
      { titulo: "c) Tabla ANOVA y conclusión", puntos: 2, solucion: String.raw`<p>$N=4\cdot3=12$, $\;Y_{\cdot\cdot}^2/N=571^2/12=27170{,}083$, $\;\sum\sum Y_{ij}^2=27485$.</p><p>$SC_T=27485-27170{,}083=314{,}917$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{b}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{81945}{3}-27170{,}083=144{,}917$</p><p>$SC_B=\dfrac{\sum Y_{\cdot j}^2}{a}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{109321}{4}-27170{,}083=160{,}167$</p><p>$SC_E=SC_T-SC_{TRAT}-SC_B=9{,}833$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Detergente</td><td>$144{,}917$</td><td>$3$</td><td>$48{,}306$</td><td>$29{,}47$</td><td>$0{,}0005$</td></tr><tr><td>Lavadora</td><td>$160{,}167$</td><td>$2$</td><td>$80{,}083$</td><td>$48{,}86$</td><td>$0{,}0002$</td></tr><tr><td>Error</td><td>$9{,}833$</td><td>$6$</td><td>$1{,}639$</td><td></td><td></td></tr><tr><td>Total</td><td>$314{,}917$</td><td>$11$</td><td></td><td></td><td></td></tr></tbody></table></div><p>Detergente: $F_0=29{,}47$ &gt; $F_{0{,}05;3,6}=4{,}76$ ($p=0{,}0005$) ⇒ se <strong>rechaza</strong> $H_0$. Hay diferencias entre detergentes: al menos uno tiene una blancura media distinta.</p><p>Lavadora: $F_0=48{,}86$ &gt; $F_{0{,}05;2,6}=5{,}14$ ($p=0{,}0002$) ⇒ se <strong>rechaza</strong> $H_0$. El lavadora sí influye: bloquear fue útil porque sacó esa variabilidad del error.</p>` },
      { titulo: "c) Comparaciones LSD y recomendación", puntos: 2, solucion: String.raw`<p>$LSD=t_{0{,}025;\,6}\sqrt{\dfrac{2\,CM_E}{b}}=2{,}447\sqrt{\dfrac{2\cdot1{,}6389}{3}}=2{,}558$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Diferencia</th><th>$|\bar Y_{i\cdot}-\bar Y_{j\cdot}|$</th><th>¿Significativa?</th></tr></thead><tbody><tr><td>A − B</td><td>$3$</td><td>Sí</td></tr><tr><td>A − C</td><td>$5{,}667$</td><td>Sí</td></tr><tr><td>A − D</td><td>$3{,}667$</td><td>Sí</td></tr><tr><td>B − C</td><td>$2{,}667$</td><td>Sí</td></tr><tr><td>B − D</td><td>$6{,}667$</td><td>Sí</td></tr><tr><td>C − D</td><td>$9{,}333$</td><td>Sí</td></tr></tbody></table></div><p>Medias: C $=52$, B $=49{,}333$, A $=46{,}333$, D $=42{,}667$. <strong>C</strong> es significativamente mejor que todos los demás. (Objetivo: maximizar la blancura.) En R: <code>agricolae::LSD.test(modelo, "trat")</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F tratamiento", r: `cat({y <- c(45, 43, 51, 49, 46, 53, 50, 49, 57, 42, 37, 49); trat <- factor(rep(c("A", "B", "C", "D"), each = 3)); bloque <- factor(rep(1:3, 4)); summary(aov(y ~ trat + bloque))[[1]][1, 4]})`, esperado: 29.47, tol: 0.0050000010000000004 },
      { que: "F bloque", r: `cat({y <- c(45, 43, 51, 49, 46, 53, 50, 49, 57, 42, 37, 49); trat <- factor(rep(c("A", "B", "C", "D"), each = 3)); bloque <- factor(rep(1:3, 4)); summary(aov(y ~ trat + bloque))[[1]][2, 4]})`, esperado: 48.86, tol: 0.0050000010000000004 },
      { que: "CME", r: `cat({y <- c(45, 43, 51, 49, 46, 53, 50, 49, 57, 42, 37, 49); trat <- factor(rep(c("A", "B", "C", "D"), each = 3)); bloque <- factor(rep(1:3, 4)); summary(aov(y ~ trat + bloque))[[1]][3, 3]})`, esperado: 1.639, tol: 0.000500001 },
      { que: "LSD", r: "cat(qt(0.975, 6) * sqrt(2 * 1.6388888888886868 / 3))", esperado: 2.558, tol: 0.000500001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 4, ej. 12 (p. 120)" },
      { id: "C7.3", loc: "slides 9–17" },
      { id: "C7.3", loc: "slides 18–24" }
    ]
  },
  {
    id: "m20-d014",
    modulo: "m20-dbca",
    concepto: "m20-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 4, ej. 12 (p. 120)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 4, ej. 12 · DBCA: 4 detergentes en 4 lavadoras",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 4, ej. 12 del libro guía. Cambio respecto del original: se agregó una cuarta lavadora (16 cargas).</p><p>Se diseñó un experimento para estudiar el rendimiento de 4 detergentes. Las siguientes lecturas de «blancura» se obtuvieron con un equipo especial para 16 cargas de lavado, distribuidas en 4 modelos de lavadoras (mayor blancura es mejor). Use $\alpha=0{,}05$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Detergente</th><th>Lavadora 1</th><th>Lavadora 2</th><th>Lavadora 3</th><th>Lavadora 4</th></tr></thead><tbody><tr><td>A</td><td>45</td><td>43</td><td>51</td><td>46</td></tr><tr><td>B</td><td>47</td><td>44</td><td>52</td><td>48</td></tr><tr><td>C</td><td>50</td><td>49</td><td>57</td><td>52</td></tr><tr><td>D</td><td>42</td><td>37</td><td>49</td><td>41</td></tr></tbody></table></div><ol type="a"><li>Señale el nombre del diseño experimental utilizado.</li><li>Formule la hipótesis que se quiere probar en este problema.</li><li>Realice el análisis estadístico más apropiado para estos datos y obtenga conclusiones.</li></ol>`,
    codigoR: `y <- c(45, 43, 51, 46, 47, 44, 52, 48, 50, 49, 57, 52, 42, 37, 49, 41); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    salidaR: `            Df Sum Sq Mean Sq F value   Pr(>F)    
trat         3 194.69   64.90   61.08 2.64e-06 ***
bloque       3 170.69   56.90   53.55 4.62e-06 ***
Residuals    9   9.56    1.06                     
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Study: modelo ~ "trat"

LSD t Test for y 

Mean Square Error:  1.0625 

trat,  means and individual ( 95 %) CI

      y      std r        se      LCL      UCL Min Max   Q25  Q50   Q75
A 46.25 3.403430 4 0.5153882 45.08411 47.41589  43  51 44.50 45.5 47.25
B 47.75 3.304038 4 0.5153882 46.58411 48.91589  44  52 46.25 47.5 49.00
C 52.00 3.559026 4 0.5153882 50.83411 53.16589  49  57 49.75 51.0 53.25
D 42.25 4.991660 4 0.5153882 41.08411 43.41589  37  49 40.00 41.5 43.75

Alpha: 0.05 ; DF Error: 9
Critical Value of t: 2.262157 

least Significant Difference: 1.648816 

Treatments with the same letter are not significantly different.

      y groups
C 52.00      a
B 47.75      b
A 46.25      b
D 42.25      c

	Shapiro-Wilk normality test

data:  resid(modelo)
W = 0.97219, p-value = 0.8727

Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  3  0.1323  0.939
      12`,
    salidaDe: `y <- c(45, 43, 51, 46, 47, 44, 52, 48, 50, 49, 57, 52, 42, 37, 49, 41); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4))
modelo <- aov(y ~ trat + bloque)
summary(modelo)
library(agricolae)
LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
car::leveneTest(y ~ trat)`,
    partes: [
      { titulo: "a) Nombre del diseño", puntos: 1, solucion: "<p>Diseño en <strong>bloques completos al azar</strong> (DBCA): el factor de interés es el detergente (4 niveles) y la lavadora es un factor de bloque (4 niveles); cada lavadora recibe una carga con cada detergente, en orden aleatorio.</p>" },
      { titulo: "b) Hipótesis", puntos: 1, solucion: String.raw`<p>Diseño en bloques completos al azar (DBCA): cada lavadora (bloque) recibe los 4 detergentes en orden aleatorio. Modelo: $Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij}$, $i=1,\dots,4$ (detergente), $j=1,\dots,4$ (lavadora), $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes y sin interacción detergente × lavadora.</p><p>Tratamientos: $H_0:\tau_1=\dots=\tau_4=0$ (las 4 medias son iguales) contra $H_1:\tau_i\neq0$ para algún $i$. Bloques: $H_0:\gamma_1=\dots=\gamma_4=0$ contra $H_1:\gamma_j\neq0$ para algún $j$.</p>` },
      { titulo: "c) Tabla ANOVA y conclusión", puntos: 2, solucion: String.raw`<p>$N=4\cdot4=16$, $\;Y_{\cdot\cdot}^2/N=753^2/16=35438{,}063$, $\;\sum\sum Y_{ij}^2=35813$.</p><p>$SC_T=35813-35438{,}063=374{,}938$</p><p>$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{b}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{142531}{4}-35438{,}063=194{,}688$</p><p>$SC_B=\dfrac{\sum Y_{\cdot j}^2}{a}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{142435}{4}-35438{,}063=170{,}688$</p><p>$SC_E=SC_T-SC_{TRAT}-SC_B=9{,}563$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th><th>Valor-p</th></tr></thead><tbody><tr><td>Detergente</td><td>$194{,}688$</td><td>$3$</td><td>$64{,}896$</td><td>$61{,}08$</td><td>$\lt 0{,}0001$</td></tr><tr><td>Lavadora</td><td>$170{,}688$</td><td>$3$</td><td>$56{,}896$</td><td>$53{,}55$</td><td>$\lt 0{,}0001$</td></tr><tr><td>Error</td><td>$9{,}563$</td><td>$9$</td><td>$1{,}063$</td><td></td><td></td></tr><tr><td>Total</td><td>$374{,}938$</td><td>$15$</td><td></td><td></td><td></td></tr></tbody></table></div><p>Detergente: $F_0=61{,}08$ &gt; $F_{0{,}05;3,9}=3{,}86$ ($p\lt 0{,}0001$) ⇒ se <strong>rechaza</strong> $H_0$. Hay diferencias entre detergentes: al menos uno tiene una blancura media distinta.</p><p>Lavadora: $F_0=53{,}55$ &gt; $F_{0{,}05;3,9}=3{,}86$ ($p\lt 0{,}0001$) ⇒ se <strong>rechaza</strong> $H_0$. El lavadora sí influye: bloquear fue útil porque sacó esa variabilidad del error.</p>` },
      { titulo: "c) Comparaciones LSD y recomendación", puntos: 2, solucion: String.raw`<p>$LSD=t_{0{,}025;\,9}\sqrt{\dfrac{2\,CM_E}{b}}=2{,}262\sqrt{\dfrac{2\cdot1{,}0625}{4}}=1{,}649$</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Diferencia</th><th>$|\bar Y_{i\cdot}-\bar Y_{j\cdot}|$</th><th>¿Significativa?</th></tr></thead><tbody><tr><td>A − B</td><td>$1{,}5$</td><td>No</td></tr><tr><td>A − C</td><td>$5{,}75$</td><td>Sí</td></tr><tr><td>A − D</td><td>$4$</td><td>Sí</td></tr><tr><td>B − C</td><td>$4{,}25$</td><td>Sí</td></tr><tr><td>B − D</td><td>$5{,}5$</td><td>Sí</td></tr><tr><td>C − D</td><td>$9{,}75$</td><td>Sí</td></tr></tbody></table></div><p>Medias: C $=52$, B $=47{,}75$, A $=46{,}25$, D $=42{,}25$. <strong>C</strong> es significativamente mejor que todos los demás. (Objetivo: maximizar la blancura.) En R: <code>agricolae::LSD.test(modelo, "trat")</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "F tratamiento", r: `cat({y <- c(45, 43, 51, 46, 47, 44, 52, 48, 50, 49, 57, 52, 42, 37, 49, 41); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4)); summary(aov(y ~ trat + bloque))[[1]][1, 4]})`, esperado: 61.08, tol: 0.0050000010000000004 },
      { que: "F bloque", r: `cat({y <- c(45, 43, 51, 46, 47, 44, 52, 48, 50, 49, 57, 52, 42, 37, 49, 41); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4)); summary(aov(y ~ trat + bloque))[[1]][2, 4]})`, esperado: 53.55, tol: 0.0050000010000000004 },
      { que: "CME", r: `cat({y <- c(45, 43, 51, 46, 47, 44, 52, 48, 50, 49, 57, 52, 42, 37, 49, 41); trat <- factor(rep(c("A", "B", "C", "D"), each = 4)); bloque <- factor(rep(1:4, 4)); summary(aov(y ~ trat + bloque))[[1]][3, 3]})`, esperado: 1.063, tol: 0.000500001 },
      { que: "LSD", r: "cat(qt(0.975, 9) * sqrt(2 * 1.0625 / 4))", esperado: 1.649, tol: 0.000500001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 4, ej. 12 (p. 120)" },
      { id: "C7.3", loc: "slides 9–17" },
      { id: "C7.3", loc: "slides 18–24" }
    ]
  }
]);
