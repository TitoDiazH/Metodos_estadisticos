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
