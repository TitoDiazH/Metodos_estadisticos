/* ============================================================================
   Desarrollo · M26 Regresión lineal múltiple — Walpole cap. 12 (P4) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m26-d002",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c05",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO WALPOLE · Ej. 12.1 · Horno: tiempo de cocción",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO WALPOLE</strong> — Ej. 12.1 del libro de Walpole (9.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Se hicieron ensayos con un horno para predecir el tiempo de cocción $y$ (min) a partir del ancho del horno $x_1$ y de la temperatura $x_2$. Estime $\mu_{Y|x_1,x_2}=\beta_0+\beta_1x_1+\beta_2x_2$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$y$</th><th>$x_1$</th><th>$x_2$</th></tr></thead><tbody><tr><td>$6{,}4$</td><td>$1{,}32$</td><td>$1{,}15$</td></tr><tr><td>$15{,}05$</td><td>$2{,}69$</td><td>$3{,}4$</td></tr><tr><td>$18{,}75$</td><td>$3{,}56$</td><td>$4{,}1$</td></tr><tr><td>$30{,}25$</td><td>$4{,}41$</td><td>$8{,}75$</td></tr><tr><td>$44{,}85$</td><td>$5{,}35$</td><td>$14{,}82$</td></tr><tr><td>$48{,}94$</td><td>$6{,}2$</td><td>$15{,}15$</td></tr><tr><td>$51{,}55$</td><td>$7{,}12$</td><td>$15{,}32$</td></tr><tr><td>$61{,}5$</td><td>$8{,}87$</td><td>$18{,}18$</td></tr><tr><td>$100{,}4$</td><td>$9{,}8$</td><td>$35{,}19$</td></tr><tr><td>$111{,}4$</td><td>$10{,}65$</td><td>$40{,}4$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión lineal múltiple $\hat y=b_0+b_1x_1+b_2x_2$.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p. Además pruebe $H_0:\beta_2=2$ (¿cada unidad de temperatura agrega exactamente 2 minutos?).</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(6.4, 15.05, 18.75, 30.25, 44.85, 48.94, 51.55, 61.5, 100.44, 111.42), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8, 10.65), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19, 40.4))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
     Min       1Q   Median       3Q      Max 
-0.85350 -0.35739 -0.00333  0.24429  1.15088 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  0.57999    0.60685   0.956    0.371    
x1           2.71224    0.20209  13.421 2.99e-06 ***
x2           2.04971    0.04808  42.630 1.02e-09 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.657 on 7 degrees of freedom
Multiple R-squared:  0.9997,	Adjusted R-squared:  0.9996 
F-statistic: 1.269e+04 on 2 and 7 DF,  p-value: 3.482e-13


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.9766, p-value = 0.9444

      x1       x2 
8.265641 8.265641 
    1     2     3     4     5     6     7     8     9    10 
0.433 0.228 0.188 0.131 0.121 0.109 0.235 0.608 0.377 0.569 
    1     2     3     4     5     6     7     8     9    10 
0.014 0.012 0.003 0.007 0.046 0.026 0.021 0.492 0.993 1.718`,
    salidaDe: `library(car)
datos <- data.frame(y = c(6.4, 15.05, 18.75, 30.25, 44.85, 48.94, 51.55, 61.5, 100.44, 111.42), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8, 10.65), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19, 40.4))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=0{,}58+2{,}712\,x_1+2{,}05\,x_2$$</p><p>Coincide con la respuesta del libro: $\hat y=0{,}5800+2{,}7122x_1+2{,}0497x_2$.</p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=0{,}58$: tiempo de cocción esperado con ancho 0 y temperatura 0; no tiene sentido práctico (ningún horno tiene ancho 0) y además no es significativo.</p><p>$b_{x_1}=2{,}712$: por cada unidad adicional del ancho del horno, el tiempo de cocción aumenta en promedio 2,712 min, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=2{,}05$: por cada unidad adicional de la temperatura, el tiempo de cocción aumenta en promedio 2,05 min, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$0{,}58$</td><td>$0{,}6069$</td><td>$0{,}956$</td><td>$0{,}371$</td><td>No</td></tr><tr><td>$\beta_{x_1}$</td><td>$2{,}712$</td><td>$0{,}2021$</td><td>$13{,}421$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x_2}$</td><td>$2{,}05$</td><td>$0{,}04808$</td><td>$42{,}63$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{7}$ ($n-k-1=10-2-1=7$ gl). Región crítica: $|t|>t_{0{,}975;7}=2{,}3646$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=2{,}7122/0{,}2021=13{,}421$, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: el ancho del horno influye significativamente en el tiempo de cocción.</p><p>$\beta_{x_2}$: $t=2{,}0497/0{,}0481=42{,}63$, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: la temperatura influye significativamente en el tiempo de cocción.</p><p>$H_0:\beta_{x_2}=2$ vs $H_1:\beta_{x_2}\neq2$. Ojo: R prueba siempre contra 0, así que este $t$ se calcula a mano: $t=\dfrac{b-2}{ee(b)}=\dfrac{2{,}0497-2}{0{,}0481}=1{,}034$.</p><p>Con 7 gl: $|t|=1{,}034$ &lt; $t_{0{,}975;7}=2{,}3646$; valor-$p=2P(t_{7}>1{,}034)=0{,}3356$ ⇒ <strong>no se rechaza</strong> $H_0$. Los datos son compatibles con que cada unidad de temperatura agregue 2 minutos de cocción.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{10953/2}{3{,}021/7}=12688{,}74$ con $(2,7)$ gl; $F_{0{,}95;2,7}=4{,}737$ y $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo sirve: al menos una de las dos variables explica el tiempo de cocción.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{10953}{10956}=0{,}9997$: el modelo explica el <strong>99,97 %</strong> de la variabilidad del tiempo de cocción.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}9997)\dfrac{9}{7}=0{,}9996$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 2, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}9444$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=8{,}27\ (x_1);\ 8{,}27\ (x_2)$. Hay VIF entre 5 y 10: multicolinealidad moderada, que infla algo los errores estándar; conviene tenerla presente al interpretar los $t$.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/10=0{,}6$; el mayor es $h_{8}=0{,}608$ ⇒ observación 8 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{10}=1{,}718$ ⇒ la observación 10 es influyente: si se quitara, los coeficientes cambiarían bastante. No se elimina automáticamente; primero se revisa si es un error de registro.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(6.4, 15.05, 18.75, 30.25, 44.85, 48.94, 51.55, 61.5, 100.44, 111.42), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8, 10.65), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19, 40.4)); m <- lm(y ~ x1 + x2, data = d); coef(m)[2]})", esperado: 2.7122, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(6.4, 15.05, 18.75, 30.25, 44.85, 48.94, 51.55, 61.5, 100.44, 111.42), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8, 10.65), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19, 40.4)); m <- lm(y ~ x1 + x2, data = d); summary(m)$r.squared})", esperado: 0.9997, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(6.4, 15.05, 18.75, 30.25, 44.85, 48.94, 51.55, 61.5, 100.44, 111.42), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8, 10.65), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19, 40.4)); m <- lm(y ~ x1 + x2, data = d); summary(m)$fstatistic[1]})", esperado: 12688.74, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.1 (p. 450)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d003",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.1 (p. 450)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.1 · Horno: tiempo de cocción (datos cambiados)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.1 del libro de Walpole (9.ª ed.). Cambio respecto del original: la corrida 9 dio 96,20 min (en vez de 100,44) y la 3 dio 19,40 (en vez de 18,75).</p><p>Se hicieron ensayos con un horno para predecir el tiempo de cocción $y$ (min) a partir del ancho del horno $x_1$ y de la temperatura $x_2$. Estime $\mu_{Y|x_1,x_2}=\beta_0+\beta_1x_1+\beta_2x_2$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$y$</th><th>$x_1$</th><th>$x_2$</th></tr></thead><tbody><tr><td>$6{,}4$</td><td>$1{,}32$</td><td>$1{,}15$</td></tr><tr><td>$15{,}05$</td><td>$2{,}69$</td><td>$3{,}4$</td></tr><tr><td>$19{,}4$</td><td>$3{,}56$</td><td>$4{,}1$</td></tr><tr><td>$30{,}25$</td><td>$4{,}41$</td><td>$8{,}75$</td></tr><tr><td>$44{,}85$</td><td>$5{,}35$</td><td>$14{,}82$</td></tr><tr><td>$48{,}94$</td><td>$6{,}2$</td><td>$15{,}15$</td></tr><tr><td>$51{,}55$</td><td>$7{,}12$</td><td>$15{,}32$</td></tr><tr><td>$61{,}5$</td><td>$8{,}87$</td><td>$18{,}18$</td></tr><tr><td>$96{,}2$</td><td>$9{,}8$</td><td>$35{,}19$</td></tr><tr><td>$111{,}4$</td><td>$10{,}65$</td><td>$40{,}4$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión lineal múltiple $\hat y=b_0+b_1x_1+b_2x_2$.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p. Además pruebe $H_0:\beta_2=2$ (¿cada unidad de temperatura agrega exactamente 2 minutos?).</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(6.4, 15.05, 19.4, 30.25, 44.85, 48.94, 51.55, 61.5, 96.2, 111.42), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8, 10.65), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19, 40.4))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-1.4565 -0.2693 -0.1095  0.3885  1.1566 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  0.55603    0.75338   0.738    0.484    
x1           2.94410    0.25088  11.735 7.38e-06 ***
x2           1.93942    0.05969  32.491 6.77e-09 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.8156 on 7 degrees of freedom
Multiple R-squared:  0.9996,	Adjusted R-squared:  0.9994 
F-statistic:  7887 on 2 and 7 DF,  p-value: 1.838e-12


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.9574, p-value = 0.7558

      x1       x2 
8.265641 8.265641 
    1     2     3     4     5     6     7     8     9    10 
0.433 0.228 0.188 0.131 0.121 0.109 0.235 0.608 0.377 0.569 
    1     2     3     4     5     6     7     8     9    10 
0.050 0.000 0.024 0.006 0.003 0.039 0.021 0.365 1.032 2.047`,
    salidaDe: `library(car)
datos <- data.frame(y = c(6.4, 15.05, 19.4, 30.25, 44.85, 48.94, 51.55, 61.5, 96.2, 111.42), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8, 10.65), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19, 40.4))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=0{,}556+2{,}944\,x_1+1{,}939\,x_2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=0{,}556$: tiempo de cocción esperado con ancho 0 y temperatura 0; no tiene sentido práctico (ningún horno tiene ancho 0) y además no es significativo.</p><p>$b_{x_1}=2{,}944$: por cada unidad adicional del ancho del horno, el tiempo de cocción aumenta en promedio 2,944 min, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=1{,}939$: por cada unidad adicional de la temperatura, el tiempo de cocción aumenta en promedio 1,939 min, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$0{,}556$</td><td>$0{,}7534$</td><td>$0{,}738$</td><td>$0{,}4845$</td><td>No</td></tr><tr><td>$\beta_{x_1}$</td><td>$2{,}944$</td><td>$0{,}2509$</td><td>$11{,}735$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x_2}$</td><td>$1{,}939$</td><td>$0{,}05969$</td><td>$32{,}491$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{7}$ ($n-k-1=10-2-1=7$ gl). Región crítica: $|t|>t_{0{,}975;7}=2{,}3646$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=2{,}9441/0{,}2509=11{,}735$, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: el ancho del horno influye significativamente en el tiempo de cocción.</p><p>$\beta_{x_2}$: $t=1{,}9394/0{,}0597=32{,}491$, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: la temperatura influye significativamente en el tiempo de cocción.</p><p>$H_0:\beta_{x_2}=2$ vs $H_1:\beta_{x_2}\neq2$. Ojo: R prueba siempre contra 0, así que este $t$ se calcula a mano: $t=\dfrac{b-2}{ee(b)}=\dfrac{1{,}9394-2}{0{,}0597}=-1{,}015$.</p><p>Con 7 gl: $|t|=1{,}015$ &lt; $t_{0{,}975;7}=2{,}3646$; valor-$p=2P(t_{7}>1{,}015)=0{,}344$ ⇒ <strong>no se rechaza</strong> $H_0$. Los datos son compatibles con que cada unidad de temperatura agregue 2 minutos de cocción.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{10493/2}{4{,}656/7}=7886{,}79$ con $(2,7)$ gl; $F_{0{,}95;2,7}=4{,}737$ y $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo sirve: al menos una de las dos variables explica el tiempo de cocción.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{10493}{10497}=0{,}9996$: el modelo explica el <strong>99,96 %</strong> de la variabilidad del tiempo de cocción.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}9996)\dfrac{9}{7}=0{,}9994$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 2, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}7558$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=8{,}27\ (x_1);\ 8{,}27\ (x_2)$. Hay VIF entre 5 y 10: multicolinealidad moderada, que infla algo los errores estándar; conviene tenerla presente al interpretar los $t$.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/10=0{,}6$; el mayor es $h_{8}=0{,}608$ ⇒ observación 8 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{10}=2{,}047$ ⇒ las observaciónes 9, 10 son influyentes: si se quitara, los coeficientes cambiarían bastante. No se elimina automáticamente; primero se revisa si es un error de registro.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(6.4, 15.05, 19.4, 30.25, 44.85, 48.94, 51.55, 61.5, 96.2, 111.42), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8, 10.65), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19, 40.4)); m <- lm(y ~ x1 + x2, data = d); coef(m)[2]})", esperado: 2.9441, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(6.4, 15.05, 19.4, 30.25, 44.85, 48.94, 51.55, 61.5, 96.2, 111.42), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8, 10.65), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19, 40.4)); m <- lm(y ~ x1 + x2, data = d); summary(m)$r.squared})", esperado: 0.9996, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(6.4, 15.05, 19.4, 30.25, 44.85, 48.94, 51.55, 61.5, 96.2, 111.42), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8, 10.65), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19, 40.4)); m <- lm(y ~ x1 + x2, data = d); summary(m)$fstatistic[1]})", esperado: 7886.79, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.1 (p. 450)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d004",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.1 (p. 450)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.1 · Horno: tiempo de cocción (sin la corrida 10)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.1 del libro de Walpole (9.ª ed.). Cambio respecto del original: se eliminó la corrida 10 (la del horno más ancho), n = 9.</p><p>Se hicieron ensayos con un horno para predecir el tiempo de cocción $y$ (min) a partir del ancho del horno $x_1$ y de la temperatura $x_2$. Estime $\mu_{Y|x_1,x_2}=\beta_0+\beta_1x_1+\beta_2x_2$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$y$</th><th>$x_1$</th><th>$x_2$</th></tr></thead><tbody><tr><td>$6{,}4$</td><td>$1{,}32$</td><td>$1{,}15$</td></tr><tr><td>$15{,}05$</td><td>$2{,}69$</td><td>$3{,}4$</td></tr><tr><td>$18{,}75$</td><td>$3{,}56$</td><td>$4{,}1$</td></tr><tr><td>$30{,}25$</td><td>$4{,}41$</td><td>$8{,}75$</td></tr><tr><td>$44{,}85$</td><td>$5{,}35$</td><td>$14{,}82$</td></tr><tr><td>$48{,}94$</td><td>$6{,}2$</td><td>$15{,}15$</td></tr><tr><td>$51{,}55$</td><td>$7{,}12$</td><td>$15{,}32$</td></tr><tr><td>$61{,}5$</td><td>$8{,}87$</td><td>$18{,}18$</td></tr><tr><td>$100{,}4$</td><td>$9{,}8$</td><td>$35{,}19$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión lineal múltiple $\hat y=b_0+b_1x_1+b_2x_2$.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p. Además pruebe $H_0:\beta_2=2$ (¿cada unidad de temperatura agrega exactamente 2 minutos?).</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(6.4, 15.05, 18.75, 30.25, 44.85, 48.94, 51.55, 61.5, 100.44), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-0.8640 -0.2128  0.2424  0.3017  0.3600 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  0.68901    0.43718   1.576    0.166    
x1           2.54961    0.15653  16.288 3.41e-06 ***
x2           2.11772    0.04241  49.934 4.33e-09 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.4713 on 6 degrees of freedom
Multiple R-squared:  0.9998,	Adjusted R-squared:  0.9997 
F-statistic: 1.489e+04 on 2 and 6 DF,  p-value: 8.182e-12


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.83155, p-value = 0.04647

      x1       x2 
6.981072 6.981072 
    1     2     3     4     5     6     7     8     9 
0.434 0.234 0.210 0.131 0.157 0.120 0.235 0.614 0.866 
    1     2     3     4     5     6     7     8     9 
0.016 0.055 0.046 0.012 0.247 0.030 0.042 0.571 4.232`,
    salidaDe: `library(car)
datos <- data.frame(y = c(6.4, 15.05, 18.75, 30.25, 44.85, 48.94, 51.55, 61.5, 100.44), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=0{,}689+2{,}55\,x_1+2{,}118\,x_2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=0{,}689$: tiempo de cocción esperado con ancho 0 y temperatura 0; no tiene sentido práctico (ningún horno tiene ancho 0) y además no es significativo.</p><p>$b_{x_1}=2{,}55$: por cada unidad adicional del ancho del horno, el tiempo de cocción aumenta en promedio 2,55 min, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=2{,}118$: por cada unidad adicional de la temperatura, el tiempo de cocción aumenta en promedio 2,118 min, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$0{,}689$</td><td>$0{,}4372$</td><td>$1{,}576$</td><td>$0{,}1661$</td><td>No</td></tr><tr><td>$\beta_{x_1}$</td><td>$2{,}55$</td><td>$0{,}1565$</td><td>$16{,}288$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x_2}$</td><td>$2{,}118$</td><td>$0{,}04241$</td><td>$49{,}934$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{6}$ ($n-k-1=9-2-1=6$ gl). Región crítica: $|t|>t_{0{,}975;6}=2{,}4469$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=2{,}5496/0{,}1565=16{,}288$, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: el ancho del horno influye significativamente en el tiempo de cocción.</p><p>$\beta_{x_2}$: $t=2{,}1177/0{,}0424=49{,}934$, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: la temperatura influye significativamente en el tiempo de cocción.</p><p>$H_0:\beta_{x_2}=2$ vs $H_1:\beta_{x_2}\neq2$. Ojo: R prueba siempre contra 0, así que este $t$ se calcula a mano: $t=\dfrac{b-2}{ee(b)}=\dfrac{2{,}1177-2}{0{,}0424}=2{,}776$.</p><p>Con 6 gl: $|t|=2{,}776$ &gt; $t_{0{,}975;6}=2{,}4469$; valor-$p=2P(t_{6}>2{,}776)=0{,}0322$ ⇒ se <strong>rechaza</strong> $H_0$. El efecto de la temperatura es distinto de 2 min por unidad.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{6614/2}{1{,}333/6}=14885{,}17$ con $(2,6)$ gl; $F_{0{,}95;2,6}=5{,}143$ y $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo sirve: al menos una de las dos variables explica el tiempo de cocción.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{6614}{6615}=0{,}9998$: el modelo explica el <strong>99,98 %</strong> de la variabilidad del tiempo de cocción.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}9998)\dfrac{8}{6}=0{,}9997$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 2, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}0465$ ⇒ se rechaza: los residuos no parecen normales (revisar el Q-Q; con $n$ pequeño la prueba es poco confiable).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=6{,}98\ (x_1);\ 6{,}98\ (x_2)$. Hay VIF entre 5 y 10: multicolinealidad moderada, que infla algo los errores estándar; conviene tenerla presente al interpretar los $t$.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/9=0{,}667$; el mayor es $h_{9}=0{,}866$ ⇒ observación 9 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{9}=4{,}232$ ⇒ la observación 9 es influyente: si se quitara, los coeficientes cambiarían bastante. No se elimina automáticamente; primero se revisa si es un error de registro.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(6.4, 15.05, 18.75, 30.25, 44.85, 48.94, 51.55, 61.5, 100.44), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19)); m <- lm(y ~ x1 + x2, data = d); coef(m)[2]})", esperado: 2.5496, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(6.4, 15.05, 18.75, 30.25, 44.85, 48.94, 51.55, 61.5, 100.44), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19)); m <- lm(y ~ x1 + x2, data = d); summary(m)$r.squared})", esperado: 0.9998, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(6.4, 15.05, 18.75, 30.25, 44.85, 48.94, 51.55, 61.5, 100.44), x1 = c(1.32, 2.69, 3.56, 4.41, 5.35, 6.2, 7.12, 8.87, 9.8), x2 = c(1.15, 3.4, 4.1, 8.75, 14.82, 15.15, 15.32, 18.18, 35.19)); m <- lm(y ~ x1 + x2, data = d); summary(m)$fstatistic[1]})", esperado: 14885.17, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.1 (p. 450)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d005",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c05",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO WALPOLE · Ej. 12.2 · Densidad óptica de un lubricante",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO WALPOLE</strong> — Ej. 12.2 del libro de Walpole (9.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>En <strong>Applied Spectroscopy</strong> se estudió la densidad óptica $y$ de un lubricante en función de la frecuencia de banda $x_1$ y del espesor de película $x_2$ (mm).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$y$</th><th>$x_1$</th><th>$x_2$</th></tr></thead><tbody><tr><td>$0{,}231$</td><td>$740$</td><td>$1{,}1$</td></tr><tr><td>$0{,}107$</td><td>$740$</td><td>$0{,}62$</td></tr><tr><td>$0{,}053$</td><td>$740$</td><td>$0{,}31$</td></tr><tr><td>$0{,}129$</td><td>$805$</td><td>$1{,}1$</td></tr><tr><td>$0{,}069$</td><td>$805$</td><td>$0{,}62$</td></tr><tr><td>$0{,}03$</td><td>$805$</td><td>$0{,}31$</td></tr><tr><td>$1{,}005$</td><td>$980$</td><td>$1{,}1$</td></tr><tr><td>$0{,}559$</td><td>$980$</td><td>$0{,}62$</td></tr><tr><td>$0{,}321$</td><td>$980$</td><td>$0{,}31$</td></tr><tr><td>$2{,}948$</td><td>$1235$</td><td>$1{,}1$</td></tr><tr><td>$1{,}633$</td><td>$1235$</td><td>$0{,}62$</td></tr><tr><td>$0{,}934$</td><td>$1235$</td><td>$0{,}31$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión lineal múltiple $\hat y=b_0+b_1x_1+b_2x_2$.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(0.231, 0.107, 0.053, 0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.948, 1.633, 0.934), x1 = c(740, 740, 740, 805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
     Min       1Q   Median       3Q      Max 
-0.45373 -0.20243 -0.08618  0.20204  0.81167 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept) -3.3726733  0.6359963  -5.303 0.000492 ***
x1           0.0036167  0.0006121   5.908 0.000227 ***
x2           0.9475989  0.3608943   2.626 0.027552 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.4063 on 9 degrees of freedom
Multiple R-squared:  0.8228,	Adjusted R-squared:  0.7835 
F-statistic:  20.9 on 2 and 9 DF,  p-value: 0.0004146


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.91829, p-value = 0.2721

x1 x2 
 1  1 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.316 0.177 0.280 0.266 0.127 0.231 0.228 0.089 0.193 0.422 0.283 0.387 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.018 0.025 0.227 0.204 0.001 0.031 0.034 0.009 0.012 1.683 0.003 0.428`,
    salidaDe: `library(car)
datos <- data.frame(y = c(0.231, 0.107, 0.053, 0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.948, 1.633, 0.934), x1 = c(740, 740, 740, 805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=-3{,}373+0{,}003617\,x_1+0{,}9476\,x_2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=-3{,}373$: densidad óptica esperada con frecuencia 0 y espesor 0: fuera del rango de los datos, no se interpreta (de hecho es negativa, lo que es imposible).</p><p>$b_{x_1}=0{,}003617$: por cada unidad adicional de la frecuencia de banda, la densidad óptica aumenta en promedio 0,003617 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=0{,}9476$: por cada mm adicional del espesor de película, la densidad óptica aumenta en promedio 0,9476 unidades, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$-3{,}373$</td><td>$0{,}636$</td><td>$-5{,}303$</td><td>$0{,}0005$</td><td>Sí</td></tr><tr><td>$\beta_{x_1}$</td><td>$0{,}003617$</td><td>$0{,}0006121$</td><td>$5{,}908$</td><td>$0{,}0002$</td><td>Sí</td></tr><tr><td>$\beta_{x_2}$</td><td>$0{,}9476$</td><td>$0{,}3609$</td><td>$2{,}626$</td><td>$0{,}0276$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{9}$ ($n-k-1=12-2-1=9$ gl). Región crítica: $|t|>t_{0{,}975;9}=2{,}2622$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=0{,}0036/0{,}0006=5{,}908$, $p=0{,}0002$ ⇒ se <strong>rechaza</strong> $H_0$: la frecuencia de banda influye significativamente en la densidad óptica.</p><p>$\beta_{x_2}$: $t=0{,}9476/0{,}3609=2{,}626$, $p=0{,}0276$ ⇒ se <strong>rechaza</strong> $H_0$: el espesor de película influye significativamente en la densidad óptica.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{6{,}901/2}{1{,}486/9}=20{,}9$ con $(2,9)$ gl; $F_{0{,}95;2,9}=4{,}256$ y $p=0{,}0004$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo es útil para explicar la densidad óptica.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{6{,}901}{8{,}387}=0{,}8228$: el modelo explica el <strong>82,3 %</strong> de la variabilidad de la densidad óptica.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}8228)\dfrac{11}{9}=0{,}7835$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 2, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}2721$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=1\ (x_1);\ 1\ (x_2)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/12=0{,}5$; el mayor es $h_{10}=0{,}422$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{10}=1{,}683$ ⇒ la observación 10 es influyente: si se quitara, los coeficientes cambiarían bastante. No se elimina automáticamente; primero se revisa si es un error de registro.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(0.231, 0.107, 0.053, 0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.948, 1.633, 0.934), x1 = c(740, 740, 740, 805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31)); m <- lm(y ~ x1 + x2, data = d); coef(m)[2]})", esperado: 0.0036, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(0.231, 0.107, 0.053, 0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.948, 1.633, 0.934), x1 = c(740, 740, 740, 805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31)); m <- lm(y ~ x1 + x2, data = d); summary(m)$r.squared})", esperado: 0.8228, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(0.231, 0.107, 0.053, 0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.948, 1.633, 0.934), x1 = c(740, 740, 740, 805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31)); m <- lm(y ~ x1 + x2, data = d); summary(m)$fstatistic[1]})", esperado: 20.9, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.2 (p. 450)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d006",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.2 (p. 450)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.2 · Densidad óptica de un lubricante (datos cambiados)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.2 del libro de Walpole (9.ª ed.). Cambio respecto del original: la medición a 1235 y 1,10 mm dio 2,648 y la de 740 y 0,31 mm dio 0,045.</p><p>En <strong>Applied Spectroscopy</strong> se estudió la densidad óptica $y$ de un lubricante en función de la frecuencia de banda $x_1$ y del espesor de película $x_2$ (mm).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$y$</th><th>$x_1$</th><th>$x_2$</th></tr></thead><tbody><tr><td>$0{,}231$</td><td>$740$</td><td>$1{,}1$</td></tr><tr><td>$0{,}107$</td><td>$740$</td><td>$0{,}62$</td></tr><tr><td>$0{,}045$</td><td>$740$</td><td>$0{,}31$</td></tr><tr><td>$0{,}129$</td><td>$805$</td><td>$1{,}1$</td></tr><tr><td>$0{,}069$</td><td>$805$</td><td>$0{,}62$</td></tr><tr><td>$0{,}03$</td><td>$805$</td><td>$0{,}31$</td></tr><tr><td>$1{,}005$</td><td>$980$</td><td>$1{,}1$</td></tr><tr><td>$0{,}559$</td><td>$980$</td><td>$0{,}62$</td></tr><tr><td>$0{,}321$</td><td>$980$</td><td>$0{,}31$</td></tr><tr><td>$2{,}648$</td><td>$1235$</td><td>$1{,}1$</td></tr><tr><td>$1{,}633$</td><td>$1235$</td><td>$0{,}62$</td></tr><tr><td>$0{,}934$</td><td>$1235$</td><td>$0{,}31$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión lineal múltiple $\hat y=b_0+b_1x_1+b_2x_2$.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(0.231, 0.107, 0.045, 0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.648, 1.633, 0.934), x1 = c(740, 740, 740, 805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-0.4117 -0.1532 -0.0756  0.1696  0.6370 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept) -3.1466858  0.5332120  -5.901 0.000229 ***
x1           0.0034195  0.0005132   6.663 9.24e-05 ***
x2           0.8497133  0.3025697   2.808 0.020433 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.3406 on 9 degrees of freedom
Multiple R-squared:  0.8531,	Adjusted R-squared:  0.8205 
F-statistic: 26.14 on 2 and 9 DF,  p-value: 0.0001783


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.94325, p-value = 0.5412

x1 x2 
 1  1 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.316 0.177 0.280 0.266 0.127 0.231 0.228 0.089 0.193 0.422 0.283 0.387 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.015 0.029 0.246 0.241 0.002 0.029 0.020 0.009 0.018 1.474 0.001 0.487`,
    salidaDe: `library(car)
datos <- data.frame(y = c(0.231, 0.107, 0.045, 0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.648, 1.633, 0.934), x1 = c(740, 740, 740, 805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=-3{,}147+0{,}003419\,x_1+0{,}8497\,x_2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=-3{,}147$: densidad óptica esperada con frecuencia 0 y espesor 0: fuera del rango de los datos, no se interpreta (de hecho es negativa, lo que es imposible).</p><p>$b_{x_1}=0{,}003419$: por cada unidad adicional de la frecuencia de banda, la densidad óptica aumenta en promedio 0,003419 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=0{,}8497$: por cada mm adicional del espesor de película, la densidad óptica aumenta en promedio 0,8497 unidades, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$-3{,}147$</td><td>$0{,}5332$</td><td>$-5{,}901$</td><td>$0{,}0002$</td><td>Sí</td></tr><tr><td>$\beta_{x_1}$</td><td>$0{,}003419$</td><td>$0{,}0005132$</td><td>$6{,}663$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x_2}$</td><td>$0{,}8497$</td><td>$0{,}3026$</td><td>$2{,}808$</td><td>$0{,}0204$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{9}$ ($n-k-1=12-2-1=9$ gl). Región crítica: $|t|>t_{0{,}975;9}=2{,}2622$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=0{,}0034/0{,}0005=6{,}663$, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: la frecuencia de banda influye significativamente en la densidad óptica.</p><p>$\beta_{x_2}$: $t=0{,}8497/0{,}3026=2{,}808$, $p=0{,}0204$ ⇒ se <strong>rechaza</strong> $H_0$: el espesor de película influye significativamente en la densidad óptica.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{6{,}066/2}{1{,}044/9}=26{,}14$ con $(2,9)$ gl; $F_{0{,}95;2,9}=4{,}256$ y $p=0{,}0002$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo es útil para explicar la densidad óptica.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{6{,}066}{7{,}111}=0{,}8531$: el modelo explica el <strong>85,3 %</strong> de la variabilidad de la densidad óptica.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}8531)\dfrac{11}{9}=0{,}8205$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 2, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}5412$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=1\ (x_1);\ 1\ (x_2)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/12=0{,}5$; el mayor es $h_{10}=0{,}422$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{10}=1{,}474$ ⇒ la observación 10 es influyente: si se quitara, los coeficientes cambiarían bastante. No se elimina automáticamente; primero se revisa si es un error de registro.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(0.231, 0.107, 0.045, 0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.648, 1.633, 0.934), x1 = c(740, 740, 740, 805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31)); m <- lm(y ~ x1 + x2, data = d); coef(m)[2]})", esperado: 0.0034, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(0.231, 0.107, 0.045, 0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.648, 1.633, 0.934), x1 = c(740, 740, 740, 805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31)); m <- lm(y ~ x1 + x2, data = d); summary(m)$r.squared})", esperado: 0.8531, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(0.231, 0.107, 0.045, 0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.648, 1.633, 0.934), x1 = c(740, 740, 740, 805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31)); m <- lm(y ~ x1 + x2, data = d); summary(m)$fstatistic[1]})", esperado: 26.14, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.2 (p. 450)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d007",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.2 (p. 450)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.2 · Densidad óptica de un lubricante (9 mediciones)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.2 del libro de Walpole (9.ª ed.). Cambio respecto del original: solo las frecuencias 805, 980 y 1235 (sin las 3 mediciones a 740).</p><p>En <strong>Applied Spectroscopy</strong> se estudió la densidad óptica $y$ de un lubricante en función de la frecuencia de banda $x_1$ y del espesor de película $x_2$ (mm).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$y$</th><th>$x_1$</th><th>$x_2$</th></tr></thead><tbody><tr><td>$0{,}129$</td><td>$805$</td><td>$1{,}1$</td></tr><tr><td>$0{,}069$</td><td>$805$</td><td>$0{,}62$</td></tr><tr><td>$0{,}03$</td><td>$805$</td><td>$0{,}31$</td></tr><tr><td>$1{,}005$</td><td>$980$</td><td>$1{,}1$</td></tr><tr><td>$0{,}559$</td><td>$980$</td><td>$0{,}62$</td></tr><tr><td>$0{,}321$</td><td>$980$</td><td>$0{,}31$</td></tr><tr><td>$2{,}948$</td><td>$1235$</td><td>$1{,}1$</td></tr><tr><td>$1{,}633$</td><td>$1235$</td><td>$0{,}62$</td></tr><tr><td>$0{,}934$</td><td>$1235$</td><td>$0{,}31$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión lineal múltiple $\hat y=b_0+b_1x_1+b_2x_2$.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.948, 1.633, 0.934), x1 = c(805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
     Min       1Q   Median       3Q      Max 
-0.42472 -0.23468 -0.09382  0.12473  0.65122 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)   
(Intercept) -4.1290352  0.8581931  -4.811  0.00297 **
x1           0.0041455  0.0007901   5.247  0.00193 **
x2           1.1874150  0.4292482   2.766  0.03258 * 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.4185 on 6 degrees of freedom
Multiple R-squared:  0.8543,	Adjusted R-squared:  0.8057 
F-statistic: 17.59 on 2 and 6 DF,  p-value: 0.003094


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.93085, p-value = 0.4895

x1 x2 
 1  1 
    1     2     3     4     5     6     7     8     9 
0.445 0.259 0.398 0.302 0.117 0.255 0.485 0.300 0.438 
    1     2     3     4     5     6     7     8     9 
0.407 0.014 0.429 0.065 0.004 0.000 1.480 0.010 0.477`,
    salidaDe: `library(car)
datos <- data.frame(y = c(0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.948, 1.633, 0.934), x1 = c(805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=-4{,}129+0{,}004145\,x_1+1{,}187\,x_2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=-4{,}129$: densidad óptica esperada con frecuencia 0 y espesor 0: fuera del rango de los datos, no se interpreta (de hecho es negativa, lo que es imposible).</p><p>$b_{x_1}=0{,}004145$: por cada unidad adicional de la frecuencia de banda, la densidad óptica aumenta en promedio 0,004145 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=1{,}187$: por cada mm adicional del espesor de película, la densidad óptica aumenta en promedio 1,187 unidades, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$-4{,}129$</td><td>$0{,}8582$</td><td>$-4{,}811$</td><td>$0{,}003$</td><td>Sí</td></tr><tr><td>$\beta_{x_1}$</td><td>$0{,}004145$</td><td>$0{,}0007901$</td><td>$5{,}247$</td><td>$0{,}0019$</td><td>Sí</td></tr><tr><td>$\beta_{x_2}$</td><td>$1{,}187$</td><td>$0{,}4292$</td><td>$2{,}766$</td><td>$0{,}0326$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{6}$ ($n-k-1=9-2-1=6$ gl). Región crítica: $|t|>t_{0{,}975;6}=2{,}4469$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=0{,}0041/0{,}0008=5{,}247$, $p=0{,}0019$ ⇒ se <strong>rechaza</strong> $H_0$: la frecuencia de banda influye significativamente en la densidad óptica.</p><p>$\beta_{x_2}$: $t=1{,}1874/0{,}4292=2{,}766$, $p=0{,}0326$ ⇒ se <strong>rechaza</strong> $H_0$: el espesor de película influye significativamente en la densidad óptica.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{6{,}162/2}{1{,}051/6}=17{,}59$ con $(2,6)$ gl; $F_{0{,}95;2,6}=5{,}143$ y $p=0{,}0031$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo es útil para explicar la densidad óptica.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{6{,}162}{7{,}212}=0{,}8543$: el modelo explica el <strong>85,4 %</strong> de la variabilidad de la densidad óptica.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}8543)\dfrac{8}{6}=0{,}8057$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 2, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}4895$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=1\ (x_1);\ 1\ (x_2)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/9=0{,}667$; el mayor es $h_{7}=0{,}485$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{7}=1{,}48$ ⇒ la observación 7 es influyente: si se quitara, los coeficientes cambiarían bastante. No se elimina automáticamente; primero se revisa si es un error de registro.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.948, 1.633, 0.934), x1 = c(805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31)); m <- lm(y ~ x1 + x2, data = d); coef(m)[2]})", esperado: 0.0041, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.948, 1.633, 0.934), x1 = c(805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31)); m <- lm(y ~ x1 + x2, data = d); summary(m)$r.squared})", esperado: 0.8543, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(0.129, 0.069, 0.03, 1.005, 0.559, 0.321, 2.948, 1.633, 0.934), x1 = c(805, 805, 805, 980, 980, 980, 1235, 1235, 1235), x2 = c(1.1, 0.62, 0.31, 1.1, 0.62, 0.31, 1.1, 0.62, 0.31)); m <- lm(y ~ x1 + x2, data = d); summary(m)$fstatistic[1]})", esperado: 17.59, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.2 (p. 450)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d008",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c05",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO WALPOLE · Ej. 12.3 · Calificación en química",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO WALPOLE</strong> — Ej. 12.3 del libro de Walpole (9.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Para 12 estudiantes se registró la calificación en química $y$, la calificación en un examen de inteligencia $x_1$ y el número de clases perdidas $x_2$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Química $y$</th><th>Examen $x_1$</th><th>Clases perdidas $x_2$</th></tr></thead><tbody><tr><td>$85$</td><td>$65$</td><td>$1$</td></tr><tr><td>$74$</td><td>$50$</td><td>$7$</td></tr><tr><td>$76$</td><td>$55$</td><td>$5$</td></tr><tr><td>$90$</td><td>$65$</td><td>$2$</td></tr><tr><td>$85$</td><td>$55$</td><td>$6$</td></tr><tr><td>$87$</td><td>$70$</td><td>$3$</td></tr><tr><td>$94$</td><td>$65$</td><td>$2$</td></tr><tr><td>$98$</td><td>$70$</td><td>$5$</td></tr><tr><td>$81$</td><td>$55$</td><td>$4$</td></tr><tr><td>$91$</td><td>$70$</td><td>$3$</td></tr><tr><td>$76$</td><td>$50$</td><td>$1$</td></tr><tr><td>$74$</td><td>$55$</td><td>$4$</td></tr></tbody></table></div><ol type="a"><li>Ajuste $\hat y=b_0+b_1x_1+b_2x_2$.</li><li>Estime la calificación de química de un estudiante que obtuvo 60 en el examen y perdió 4 clases.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 98, 81, 91, 76, 74), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 60, x2 = 4)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-5.9169 -2.9701  0.0018  2.6925  5.9757 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  27.5467    12.4981   2.204 0.054975 .  
x1            0.9217     0.1858   4.960 0.000781 ***
x2            0.2842     0.7536   0.377 0.714772    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 4.517 on 9 degrees of freedom
Multiple R-squared:  0.7478,	Adjusted R-squared:  0.6918 
F-statistic: 13.34 on 2 and 9 DF,  p-value: 0.002031


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.93754, p-value = 0.4668

      x1       x2 
1.138729 1.138729 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.248 0.421 0.152 0.154 0.233 0.221 0.154 0.360 0.127 0.221 0.582 0.127 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.054 0.054 0.046 0.014 0.165 0.209 0.125 0.292 0.007 0.022 0.236 0.079 
      fit      lwr      upr
1 83.9844 80.95944 87.00937
      fit      lwr      upr
1 83.9844 73.32724 94.64157`,
    salidaDe: `library(car)
datos <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 98, 81, 91, 76, 74), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 60, x2 = 4)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=27{,}55+0{,}9217\,x_1+0{,}2842\,x_2$$</p><p>Coincide con el libro: $\hat y=27{,}547+0{,}922x_1+0{,}284x_2$. Ojo: el signo positivo de las clases perdidas es contraintuitivo, pero ese coeficiente no es significativo (ver c).</p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=27{,}55$: calificación esperada de un estudiante con 0 en el examen y 0 clases perdidas; nadie sacó 0 en el examen (rango 50–70), así que no tiene interpretación práctica.</p><p>$b_{x_1}=0{,}9217$: por cada punto adicional de la calificación en el examen, la calificación en química aumenta en promedio 0,9217 puntos, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=0{,}2842$: por cada clase adicional de las clases perdidas, la calificación en química aumenta en promedio 0,2842 puntos, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$27{,}55$</td><td>$12{,}5$</td><td>$2{,}204$</td><td>$0{,}055$</td><td>No</td></tr><tr><td>$\beta_{x_1}$</td><td>$0{,}9217$</td><td>$0{,}1858$</td><td>$4{,}96$</td><td>$0{,}0008$</td><td>Sí</td></tr><tr><td>$\beta_{x_2}$</td><td>$0{,}2842$</td><td>$0{,}7536$</td><td>$0{,}377$</td><td>$0{,}7148$</td><td>No</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{9}$ ($n-k-1=12-2-1=9$ gl). Región crítica: $|t|>t_{0{,}975;9}=2{,}2622$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=0{,}9217/0{,}1858=4{,}96$, $p=0{,}0008$ ⇒ se <strong>rechaza</strong> $H_0$: la calificación en el examen influye significativamente en la calificación en química.</p><p>$\beta_{x_2}$: $t=0{,}2842/0{,}7536=0{,}377$, $p=0{,}7148$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que las clases perdidas influya en la calificación en química una vez consideradas las demás variables.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{544{,}6/2}{183{,}7/9}=13{,}34$ con $(2,9)$ gl; $F_{0{,}95;2,9}=4{,}256$ y $p=0{,}002$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo sirve para explicar la calificación en química.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{544{,}6}{728{,}3}=0{,}7478$: el modelo explica el <strong>74,8 %</strong> de la variabilidad de la calificación en química.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}7478)\dfrac{11}{9}=0{,}6918$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}4668$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=1{,}14\ (x_1);\ 1{,}14\ (x_2)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/12=0{,}5$; el mayor es $h_{11}=0{,}582$ ⇒ observación 11 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{8}=0{,}292$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=27{,}5467+0{,}921678\cdot60+0{,}28425\cdot4=83{,}984$ puntos.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[80{,}959;\ 87{,}009]$. Intervalo de <strong>predicción</strong> para un caso individual: $[73{,}327;\ 94{,}642]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p>El libro (apéndice) da $\hat y=84$; $x_1=60$ y $x_2=4$ están dentro del rango de los datos, así que la predicción es confiable.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 98, 81, 91, 76, 74), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4)); m <- lm(y ~ x1 + x2, data = d); coef(m)[2]})", esperado: 0.9217, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 98, 81, 91, 76, 74), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4)); m <- lm(y ~ x1 + x2, data = d); summary(m)$r.squared})", esperado: 0.7478, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 98, 81, 91, 76, 74), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4)); m <- lm(y ~ x1 + x2, data = d); summary(m)$fstatistic[1]})", esperado: 13.34, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 98, 81, 91, 76, 74), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4)); m <- lm(y ~ x1 + x2, data = d); predict(m, data.frame(x1 = 60, x2 = 4))})", esperado: 83.984, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.3 (p. 450)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d009",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.3 (p. 450)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.3 · Calificación en química (otra predicción)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.3 del libro de Walpole (9.ª ed.). Cambio respecto del original: el estudiante 8 sacó 93 en química (en vez de 98) y se pide predecir para examen 68 y 2 clases perdidas.</p><p>Para 12 estudiantes se registró la calificación en química $y$, la calificación en un examen de inteligencia $x_1$ y el número de clases perdidas $x_2$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Química $y$</th><th>Examen $x_1$</th><th>Clases perdidas $x_2$</th></tr></thead><tbody><tr><td>$85$</td><td>$65$</td><td>$1$</td></tr><tr><td>$74$</td><td>$50$</td><td>$7$</td></tr><tr><td>$76$</td><td>$55$</td><td>$5$</td></tr><tr><td>$90$</td><td>$65$</td><td>$2$</td></tr><tr><td>$85$</td><td>$55$</td><td>$6$</td></tr><tr><td>$87$</td><td>$70$</td><td>$3$</td></tr><tr><td>$94$</td><td>$65$</td><td>$2$</td></tr><tr><td>$93$</td><td>$70$</td><td>$5$</td></tr><tr><td>$81$</td><td>$55$</td><td>$4$</td></tr><tr><td>$91$</td><td>$70$</td><td>$3$</td></tr><tr><td>$76$</td><td>$50$</td><td>$1$</td></tr><tr><td>$74$</td><td>$55$</td><td>$4$</td></tr></tbody></table></div><ol type="a"><li>Ajuste $\hat y=b_0+b_1x_1+b_2x_2$.</li><li>Estime la calificación de química de un estudiante que obtuvo 68 en el examen y perdió 2 clases.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 93, 81, 91, 76, 74), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 68, x2 = 2)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-5.3605 -2.8430 -0.0339  1.8166  6.3479 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept) 34.17172   11.46391   2.981 0.015429 *  
x1           0.82363    0.17045   4.832 0.000931 ***
x2          -0.02766    0.69124  -0.040 0.968957    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 4.144 on 9 degrees of freedom
Multiple R-squared:  0.7482,	Adjusted R-squared:  0.6923 
F-statistic: 13.37 on 2 and 9 DF,  p-value: 0.002017


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.95866, p-value = 0.7645

      x1       x2 
1.138729 1.138729 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.248 0.421 0.152 0.154 0.233 0.221 0.154 0.360 0.127 0.221 0.582 0.127 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.061 0.033 0.046 0.023 0.249 0.160 0.168 0.029 0.009 0.004 0.029 0.093 
       fit      lwr      upr
1 90.12295 86.00622 94.23969
       fit      lwr      upr
1 90.12295 79.88551 100.3604`,
    salidaDe: `library(car)
datos <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 93, 81, 91, 76, 74), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 68, x2 = 2)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=34{,}17+0{,}8236\,x_1-0{,}02766\,x_2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=34{,}17$: calificación esperada de un estudiante con 0 en el examen y 0 clases perdidas; nadie sacó 0 en el examen (rango 50–70), así que no tiene interpretación práctica.</p><p>$b_{x_1}=0{,}8236$: por cada punto adicional de la calificación en el examen, la calificación en química aumenta en promedio 0,8236 puntos, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=-0{,}02766$: por cada clase adicional de las clases perdidas, la calificación en química disminuye en promedio 0,02766 puntos, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$34{,}17$</td><td>$11{,}46$</td><td>$2{,}981$</td><td>$0{,}0154$</td><td>Sí</td></tr><tr><td>$\beta_{x_1}$</td><td>$0{,}8236$</td><td>$0{,}1704$</td><td>$4{,}832$</td><td>$0{,}0009$</td><td>Sí</td></tr><tr><td>$\beta_{x_2}$</td><td>$-0{,}02766$</td><td>$0{,}6912$</td><td>$-0{,}04$</td><td>$0{,}969$</td><td>No</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{9}$ ($n-k-1=12-2-1=9$ gl). Región crítica: $|t|>t_{0{,}975;9}=2{,}2622$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=0{,}8236/0{,}1704=4{,}832$, $p=0{,}0009$ ⇒ se <strong>rechaza</strong> $H_0$: la calificación en el examen influye significativamente en la calificación en química.</p><p>$\beta_{x_2}$: $t=-0{,}0277/0{,}6912=-0{,}04$, $p=0{,}969$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que las clases perdidas influya en la calificación en química una vez consideradas las demás variables.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{459{,}1/2}{154{,}5/9}=13{,}37$ con $(2,9)$ gl; $F_{0{,}95;2,9}=4{,}256$ y $p=0{,}002$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo sirve para explicar la calificación en química.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{459{,}1}{613{,}7}=0{,}7482$: el modelo explica el <strong>74,8 %</strong> de la variabilidad de la calificación en química.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}7482)\dfrac{11}{9}=0{,}6923$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}7645$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=1{,}14\ (x_1);\ 1{,}14\ (x_2)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/12=0{,}5$; el mayor es $h_{11}=0{,}582$ ⇒ observación 11 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{5}=0{,}249$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=34{,}1717+0{,}823626\cdot68-0{,}027658\cdot2=90{,}123$ puntos.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[86{,}006;\ 94{,}24]$. Intervalo de <strong>predicción</strong> para un caso individual: $[79{,}886;\ 100{,}36]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 93, 81, 91, 76, 74), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4)); m <- lm(y ~ x1 + x2, data = d); coef(m)[2]})", esperado: 0.8236, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 93, 81, 91, 76, 74), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4)); m <- lm(y ~ x1 + x2, data = d); summary(m)$r.squared})", esperado: 0.7482, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 93, 81, 91, 76, 74), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4)); m <- lm(y ~ x1 + x2, data = d); summary(m)$fstatistic[1]})", esperado: 13.37, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 93, 81, 91, 76, 74), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4)); m <- lm(y ~ x1 + x2, data = d); predict(m, data.frame(x1 = 68, x2 = 2))})", esperado: 90.123, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.3 (p. 450)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d010",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.3 (p. 450)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.3 · Calificación en química (13 estudiantes)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.3 del libro de Walpole (9.ª ed.). Cambio respecto del original: se agregó un estudiante 13 con examen 60, 6 clases perdidas y 80 en química.</p><p>Para 12 estudiantes se registró la calificación en química $y$, la calificación en un examen de inteligencia $x_1$ y el número de clases perdidas $x_2$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Química $y$</th><th>Examen $x_1$</th><th>Clases perdidas $x_2$</th></tr></thead><tbody><tr><td>$85$</td><td>$65$</td><td>$1$</td></tr><tr><td>$74$</td><td>$50$</td><td>$7$</td></tr><tr><td>$76$</td><td>$55$</td><td>$5$</td></tr><tr><td>$90$</td><td>$65$</td><td>$2$</td></tr><tr><td>$85$</td><td>$55$</td><td>$6$</td></tr><tr><td>$87$</td><td>$70$</td><td>$3$</td></tr><tr><td>$94$</td><td>$65$</td><td>$2$</td></tr><tr><td>$98$</td><td>$70$</td><td>$5$</td></tr><tr><td>$81$</td><td>$55$</td><td>$4$</td></tr><tr><td>$91$</td><td>$70$</td><td>$3$</td></tr><tr><td>$76$</td><td>$50$</td><td>$1$</td></tr><tr><td>$74$</td><td>$55$</td><td>$4$</td></tr><tr><td>$80$</td><td>$60$</td><td>$6$</td></tr></tbody></table></div><ol type="a"><li>Ajuste $\hat y=b_0+b_1x_1+b_2x_2$.</li><li>Estime la calificación de química de un estudiante que obtuvo 60 en el examen y perdió 4 clases.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 98, 81, 91, 76, 74, 80), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55, 60), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4, 6))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 60, x2 = 4)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-5.5744 -3.1113 -0.6786  1.9820  5.9820 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept) 29.23836   12.24466   2.388 0.038098 *  
x1           0.90303    0.18300   4.935 0.000592 ***
x2           0.04123    0.69766   0.059 0.954039    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 4.476 on 10 degrees of freedom
Multiple R-squared:  0.731,	Adjusted R-squared:  0.6773 
F-statistic: 13.59 on 2 and 10 DF,  p-value: 0.001407


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.91971, p-value = 0.2486

      x1       x2 
1.124987 1.124987 
    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.245 0.368 0.134 0.154 0.195 0.214 0.154 0.319 0.121 0.214 0.566 0.121 0.194 
    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.063 0.007 0.029 0.014 0.172 0.180 0.128 0.326 0.010 0.014 0.123 0.067 0.067 
       fit      lwr      upr
1 83.58527 80.79832 86.37222
       fit      lwr      upr
1 83.58527 73.22987 93.94067`,
    salidaDe: `library(car)
datos <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 98, 81, 91, 76, 74, 80), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55, 60), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4, 6))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 60, x2 = 4)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=29{,}24+0{,}903\,x_1+0{,}04123\,x_2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=29{,}24$: calificación esperada de un estudiante con 0 en el examen y 0 clases perdidas; nadie sacó 0 en el examen (rango 50–70), así que no tiene interpretación práctica.</p><p>$b_{x_1}=0{,}903$: por cada punto adicional de la calificación en el examen, la calificación en química aumenta en promedio 0,903 puntos, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=0{,}04123$: por cada clase adicional de las clases perdidas, la calificación en química aumenta en promedio 0,04123 puntos, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$29{,}24$</td><td>$12{,}24$</td><td>$2{,}388$</td><td>$0{,}0381$</td><td>Sí</td></tr><tr><td>$\beta_{x_1}$</td><td>$0{,}903$</td><td>$0{,}183$</td><td>$4{,}935$</td><td>$0{,}0006$</td><td>Sí</td></tr><tr><td>$\beta_{x_2}$</td><td>$0{,}04123$</td><td>$0{,}6977$</td><td>$0{,}059$</td><td>$0{,}954$</td><td>No</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{10}$ ($n-k-1=13-2-1=10$ gl). Región crítica: $|t|>t_{0{,}975;10}=2{,}2281$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=0{,}903/0{,}183=4{,}935$, $p=0{,}0006$ ⇒ se <strong>rechaza</strong> $H_0$: la calificación en el examen influye significativamente en la calificación en química.</p><p>$\beta_{x_2}$: $t=0{,}0412/0{,}6977=0{,}059$, $p=0{,}954$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que las clases perdidas influya en la calificación en química una vez consideradas las demás variables.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{544{,}6/2}{200{,}4/10}=13{,}59$ con $(2,10)$ gl; $F_{0{,}95;2,10}=4{,}103$ y $p=0{,}0014$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo sirve para explicar la calificación en química.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{544{,}6}{744{,}9}=0{,}731$: el modelo explica el <strong>73,1 %</strong> de la variabilidad de la calificación en química.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}731)\dfrac{12}{10}=0{,}6773$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}2486$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=1{,}12\ (x_1);\ 1{,}12\ (x_2)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/13=0{,}462$; el mayor es $h_{11}=0{,}566$ ⇒ observación 11 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{8}=0{,}326$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=29{,}2384+0{,}903033\cdot60+0{,}04123\cdot4=83{,}585$ puntos.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[80{,}798;\ 86{,}372]$. Intervalo de <strong>predicción</strong> para un caso individual: $[73{,}23;\ 93{,}941]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 98, 81, 91, 76, 74, 80), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55, 60), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4, 6)); m <- lm(y ~ x1 + x2, data = d); coef(m)[2]})", esperado: 0.903, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 98, 81, 91, 76, 74, 80), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55, 60), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4, 6)); m <- lm(y ~ x1 + x2, data = d); summary(m)$r.squared})", esperado: 0.731, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 98, 81, 91, 76, 74, 80), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55, 60), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4, 6)); m <- lm(y ~ x1 + x2, data = d); summary(m)$fstatistic[1]})", esperado: 13.59, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(y = c(85, 74, 76, 90, 85, 87, 94, 98, 81, 91, 76, 74, 80), x1 = c(65, 50, 55, 65, 55, 70, 65, 70, 55, 70, 50, 55, 60), x2 = c(1, 7, 5, 2, 6, 3, 2, 5, 4, 3, 1, 4, 6)); m <- lm(y ~ x1 + x2, data = d); predict(m, data.frame(x1 = 60, x2 = 4))})", esperado: 83.585, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.3 (p. 450)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d011",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c05",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO WALPOLE · Ej. 12.4 · Peso final de un animal",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO WALPOLE</strong> — Ej. 12.4 del libro de Walpole (9.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Se quiere predecir el peso final $y$ (kg) de un animal a partir de su peso inicial $x_1$ (kg) y de la cantidad de alimento consumido $x_2$ (kg).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Peso final $y$</th><th>Peso inicial $x_1$</th><th>Alimento $x_2$</th></tr></thead><tbody><tr><td>$95$</td><td>$42$</td><td>$272$</td></tr><tr><td>$77$</td><td>$33$</td><td>$226$</td></tr><tr><td>$80$</td><td>$33$</td><td>$259$</td></tr><tr><td>$100$</td><td>$45$</td><td>$292$</td></tr><tr><td>$97$</td><td>$39$</td><td>$311$</td></tr><tr><td>$70$</td><td>$36$</td><td>$183$</td></tr><tr><td>$50$</td><td>$32$</td><td>$173$</td></tr><tr><td>$80$</td><td>$41$</td><td>$236$</td></tr><tr><td>$92$</td><td>$40$</td><td>$230$</td></tr><tr><td>$84$</td><td>$38$</td><td>$235$</td></tr></tbody></table></div><ol type="a"><li>Ajuste $\mu_{Y|x_1,x_2}=\beta_0+\beta_1x_1+\beta_2x_2$.</li><li>Prediga el peso final de un animal que comienza pesando 35 kg y consume 250 kg de alimento.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p. Además pruebe $H_0:\beta_1=1$ (¿cada kg inicial se traduce en exactamente un kg final?).</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(95, 77, 80, 100, 97, 70, 50, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 36, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 183, 173, 236, 230, 235))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 35, x2 = 250)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-9.3155 -3.0454  0.3791  2.8989  9.1152 

Coefficients:
             Estimate Std. Error t value Pr(>|t|)   
(Intercept) -22.99316   17.76254  -1.294  0.23656   
x1            1.39567    0.58254   2.396  0.04776 * 
x2            0.21761    0.05777   3.767  0.00701 **
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 6.051 on 7 degrees of freedom
Multiple R-squared:  0.8732,	Adjusted R-squared:  0.8369 
F-statistic: 24.09 on 2 and 7 DF,  p-value: 0.0007268


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.99189, p-value = 0.9986

      x1       x2 
1.565524 1.565524 
    1     2     3     4     5     6     7     8     9    10 
0.202 0.260 0.443 0.403 0.465 0.324 0.405 0.212 0.180 0.105 
    1     2     3     4     5     6     7     8     9    10 
0.000 0.098 0.004 0.116 0.066 0.055 0.904 0.097 0.203 0.009 
       fit     lwr      upr
1 80.25874 73.6892 86.82828
       fit      lwr      upr
1 80.25874 64.51475 96.00273`,
    salidaDe: `library(car)
datos <- data.frame(y = c(95, 77, 80, 100, 97, 70, 50, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 36, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 183, 173, 236, 230, 235))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 35, x2 = 250)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=-22{,}99+1{,}396\,x_1+0{,}2176\,x_2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=-22{,}99$: peso final esperado de un animal que parte pesando 0 kg y no come: no tiene sentido físico (y es negativo); solo ajusta la altura del plano.</p><p>$b_{x_1}=1{,}396$: por cada kg adicional del peso inicial, el peso final aumenta en promedio 1,396 kg, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=0{,}2176$: por cada kg adicional del alimento consumido, el peso final aumenta en promedio 0,2176 kg, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$-22{,}99$</td><td>$17{,}76$</td><td>$-1{,}294$</td><td>$0{,}2366$</td><td>No</td></tr><tr><td>$\beta_{x_1}$</td><td>$1{,}396$</td><td>$0{,}5825$</td><td>$2{,}396$</td><td>$0{,}0478$</td><td>Sí</td></tr><tr><td>$\beta_{x_2}$</td><td>$0{,}2176$</td><td>$0{,}05777$</td><td>$3{,}767$</td><td>$0{,}007$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{7}$ ($n-k-1=10-2-1=7$ gl). Región crítica: $|t|>t_{0{,}975;7}=2{,}3646$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=1{,}3957/0{,}5825=2{,}396$, $p=0{,}0478$ ⇒ se <strong>rechaza</strong> $H_0$: el peso inicial influye significativamente en el peso final.</p><p>$\beta_{x_2}$: $t=0{,}2176/0{,}0578=3{,}767$, $p=0{,}007$ ⇒ se <strong>rechaza</strong> $H_0$: el alimento consumido influye significativamente en el peso final.</p><p>$H_0:\beta_{x_1}=1$ vs $H_1:\beta_{x_1}\neq1$. Ojo: R prueba siempre contra 0, así que este $t$ se calcula a mano: $t=\dfrac{b-1}{ee(b)}=\dfrac{1{,}3957-1}{0{,}5825}=0{,}679$.</p><p>Con 7 gl: $|t|=0{,}679$ &lt; $t_{0{,}975;7}=2{,}3646$; valor-$p=2P(t_{7}>0{,}679)=0{,}5188$ ⇒ <strong>no se rechaza</strong> $H_0$. Es compatible con que cada kg de peso inicial se traduzca en un kg de peso final (con el alimento fijo).</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{1764/2}{256{,}3/7}=24{,}09$ con $(2,7)$ gl; $F_{0{,}95;2,7}=4{,}737$ y $p=0{,}0007$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo sirve para predecir el peso final.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{1764}{2021}=0{,}8732$: el modelo explica el <strong>87,3 %</strong> de la variabilidad del peso final.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}8732)\dfrac{9}{7}=0{,}8369$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}9986$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=1{,}57\ (x_1);\ 1{,}57\ (x_2)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/10=0{,}6$; el mayor es $h_{5}=0{,}465$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{7}=0{,}904$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=-22{,}9932+1{,}395673\cdot35+0{,}217613\cdot250=80{,}259$ kg.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[73{,}689;\ 86{,}828]$. Intervalo de <strong>predicción</strong> para un caso individual: $[64{,}515;\ 96{,}003]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(95, 77, 80, 100, 97, 70, 50, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 36, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 183, 173, 236, 230, 235)); m <- lm(y ~ x1 + x2, data = d); coef(m)[2]})", esperado: 1.3957, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(95, 77, 80, 100, 97, 70, 50, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 36, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 183, 173, 236, 230, 235)); m <- lm(y ~ x1 + x2, data = d); summary(m)$r.squared})", esperado: 0.8732, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(95, 77, 80, 100, 97, 70, 50, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 36, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 183, 173, 236, 230, 235)); m <- lm(y ~ x1 + x2, data = d); summary(m)$fstatistic[1]})", esperado: 24.09, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(y = c(95, 77, 80, 100, 97, 70, 50, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 36, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 183, 173, 236, 230, 235)); m <- lm(y ~ x1 + x2, data = d); predict(m, data.frame(x1 = 35, x2 = 250))})", esperado: 80.259, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.4 (p. 450)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d012",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.4 (p. 450)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.4 · Peso final de un animal (otra predicción)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.4 del libro de Walpole (9.ª ed.). Cambio respecto del original: el animal 7 terminó pesando 62 kg (en vez de 50) y se predice para 40 kg iniciales y 280 kg de alimento.</p><p>Se quiere predecir el peso final $y$ (kg) de un animal a partir de su peso inicial $x_1$ (kg) y de la cantidad de alimento consumido $x_2$ (kg).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Peso final $y$</th><th>Peso inicial $x_1$</th><th>Alimento $x_2$</th></tr></thead><tbody><tr><td>$95$</td><td>$42$</td><td>$272$</td></tr><tr><td>$77$</td><td>$33$</td><td>$226$</td></tr><tr><td>$80$</td><td>$33$</td><td>$259$</td></tr><tr><td>$100$</td><td>$45$</td><td>$292$</td></tr><tr><td>$97$</td><td>$39$</td><td>$311$</td></tr><tr><td>$70$</td><td>$36$</td><td>$183$</td></tr><tr><td>$62$</td><td>$32$</td><td>$173$</td></tr><tr><td>$80$</td><td>$41$</td><td>$236$</td></tr><tr><td>$92$</td><td>$40$</td><td>$230$</td></tr><tr><td>$84$</td><td>$38$</td><td>$235$</td></tr></tbody></table></div><ol type="a"><li>Ajuste $\mu_{Y|x_1,x_2}=\beta_0+\beta_1x_1+\beta_2x_2$.</li><li>Prediga el peso final de un animal que comienza pesando 40 kg y consume 280 kg de alimento.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p. Además pruebe $H_0:\beta_1=1$ (¿cada kg inicial se traduce en exactamente un kg final?).</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(95, 77, 80, 100, 97, 70, 62, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 36, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 183, 173, 236, 230, 235))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 40, x2 = 280)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-6.3690 -1.2346 -0.6845  1.2726  7.9153 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)   
(Intercept) -5.47420   12.07278  -0.453  0.66396   
x1           1.19486    0.39594   3.018  0.01945 * 
x2           0.18159    0.03926   4.625  0.00241 **
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 4.113 on 7 degrees of freedom
Multiple R-squared:  0.9136,	Adjusted R-squared:  0.8889 
F-statistic:    37 on 2 and 7 DF,  p-value: 0.0001897


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.91197, p-value = 0.2948

      x1       x2 
1.565524 1.565524 
    1     2     3     4     5     6     7     8     9    10 
0.202 0.260 0.443 0.403 0.465 0.324 0.405 0.212 0.180 0.105 
    1     2     3     4     5     6     7     8     9    10 
0.005 0.038 0.027 0.039 0.011 0.008 0.107 0.272 0.332 0.005 
       fit      lwr      upr
1 93.16391 88.97311 97.35471
       fit      lwr      upr
1 93.16391 82.57464 103.7532`,
    salidaDe: `library(car)
datos <- data.frame(y = c(95, 77, 80, 100, 97, 70, 62, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 36, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 183, 173, 236, 230, 235))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 40, x2 = 280)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=-5{,}474+1{,}195\,x_1+0{,}1816\,x_2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=-5{,}474$: peso final esperado de un animal que parte pesando 0 kg y no come: no tiene sentido físico (y es negativo); solo ajusta la altura del plano.</p><p>$b_{x_1}=1{,}195$: por cada kg adicional del peso inicial, el peso final aumenta en promedio 1,195 kg, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=0{,}1816$: por cada kg adicional del alimento consumido, el peso final aumenta en promedio 0,1816 kg, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$-5{,}474$</td><td>$12{,}07$</td><td>$-0{,}453$</td><td>$0{,}664$</td><td>No</td></tr><tr><td>$\beta_{x_1}$</td><td>$1{,}195$</td><td>$0{,}3959$</td><td>$3{,}018$</td><td>$0{,}0194$</td><td>Sí</td></tr><tr><td>$\beta_{x_2}$</td><td>$0{,}1816$</td><td>$0{,}03926$</td><td>$4{,}625$</td><td>$0{,}0024$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{7}$ ($n-k-1=10-2-1=7$ gl). Región crítica: $|t|>t_{0{,}975;7}=2{,}3646$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=1{,}1949/0{,}3959=3{,}018$, $p=0{,}0194$ ⇒ se <strong>rechaza</strong> $H_0$: el peso inicial influye significativamente en el peso final.</p><p>$\beta_{x_2}$: $t=0{,}1816/0{,}0393=4{,}625$, $p=0{,}0024$ ⇒ se <strong>rechaza</strong> $H_0$: el alimento consumido influye significativamente en el peso final.</p><p>$H_0:\beta_{x_1}=1$ vs $H_1:\beta_{x_1}\neq1$. Ojo: R prueba siempre contra 0, así que este $t$ se calcula a mano: $t=\dfrac{b-1}{ee(b)}=\dfrac{1{,}1949-1}{0{,}3959}=0{,}492$.</p><p>Con 7 gl: $|t|=0{,}492$ &lt; $t_{0{,}975;7}=2{,}3646$; valor-$p=2P(t_{7}>0{,}492)=0{,}6377$ ⇒ <strong>no se rechaza</strong> $H_0$. Es compatible con que cada kg de peso inicial se traduzca en un kg de peso final (con el alimento fijo).</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{1252/2}{118{,}4/7}=37$ con $(2,7)$ gl; $F_{0{,}95;2,7}=4{,}737$ y $p=0{,}0002$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo sirve para predecir el peso final.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{1252}{1370}=0{,}9136$: el modelo explica el <strong>91,4 %</strong> de la variabilidad del peso final.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}9136)\dfrac{9}{7}=0{,}8889$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}2948$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=1{,}57\ (x_1);\ 1{,}57\ (x_2)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/10=0{,}6$; el mayor es $h_{5}=0{,}465$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{9}=0{,}332$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=-5{,}4742+1{,}194856\cdot40+0{,}181585\cdot280=93{,}164$ kg.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[88{,}973;\ 97{,}355]$. Intervalo de <strong>predicción</strong> para un caso individual: $[82{,}575;\ 103{,}753]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(95, 77, 80, 100, 97, 70, 62, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 36, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 183, 173, 236, 230, 235)); m <- lm(y ~ x1 + x2, data = d); coef(m)[2]})", esperado: 1.1949, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(95, 77, 80, 100, 97, 70, 62, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 36, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 183, 173, 236, 230, 235)); m <- lm(y ~ x1 + x2, data = d); summary(m)$r.squared})", esperado: 0.9136, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(95, 77, 80, 100, 97, 70, 62, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 36, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 183, 173, 236, 230, 235)); m <- lm(y ~ x1 + x2, data = d); summary(m)$fstatistic[1]})", esperado: 37, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(y = c(95, 77, 80, 100, 97, 70, 62, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 36, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 183, 173, 236, 230, 235)); m <- lm(y ~ x1 + x2, data = d); predict(m, data.frame(x1 = 40, x2 = 280))})", esperado: 93.164, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.4 (p. 450)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d013",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c05",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.4 (p. 450)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.4 · Peso final de un animal (9 animales)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.4 del libro de Walpole (9.ª ed.). Cambio respecto del original: se eliminó el animal 6 (n = 9).</p><p>Se quiere predecir el peso final $y$ (kg) de un animal a partir de su peso inicial $x_1$ (kg) y de la cantidad de alimento consumido $x_2$ (kg).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Peso final $y$</th><th>Peso inicial $x_1$</th><th>Alimento $x_2$</th></tr></thead><tbody><tr><td>$95$</td><td>$42$</td><td>$272$</td></tr><tr><td>$77$</td><td>$33$</td><td>$226$</td></tr><tr><td>$80$</td><td>$33$</td><td>$259$</td></tr><tr><td>$100$</td><td>$45$</td><td>$292$</td></tr><tr><td>$97$</td><td>$39$</td><td>$311$</td></tr><tr><td>$50$</td><td>$32$</td><td>$173$</td></tr><tr><td>$80$</td><td>$41$</td><td>$236$</td></tr><tr><td>$92$</td><td>$40$</td><td>$230$</td></tr><tr><td>$84$</td><td>$38$</td><td>$235$</td></tr></tbody></table></div><ol type="a"><li>Ajuste $\mu_{Y|x_1,x_2}=\beta_0+\beta_1x_1+\beta_2x_2$.</li><li>Prediga el peso final de un animal que comienza pesando 35 kg y consume 250 kg de alimento.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p. Además pruebe $H_0:\beta_1=1$ (¿cada kg inicial se traduce en exactamente un kg final?).</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(95, 77, 80, 100, 97, 50, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 173, 236, 230, 235))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 35, x2 = 250)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-7.9818 -3.4034  0.3159  3.3826  9.9007 

Coefficients:
             Estimate Std. Error t value Pr(>|t|)  
(Intercept) -25.49540   19.23452  -1.326   0.2332  
x1            1.33152    0.62413   2.133   0.0768 .
x2            0.23623    0.06937   3.405   0.0144 *
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 6.372 on 6 degrees of freedom
Multiple R-squared:  0.8681,	Adjusted R-squared:  0.8241 
F-statistic: 19.74 on 2 and 6 DF,  p-value: 0.002295


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.97734, p-value = 0.9492

      x1       x2 
1.581917 1.581917 
    1     2     3     4     5     6     7     8     9 
0.204 0.273 0.447 0.403 0.514 0.545 0.255 0.229 0.130 
    1     2     3     4     5     6     7     8     9 
0.000 0.113 0.002 0.108 0.150 1.380 0.088 0.310 0.016 
       fit      lwr      upr
1 80.16636 72.99585 87.33686
       fit      lwr      upr
1 80.16636 63.00476 97.32795`,
    salidaDe: `library(car)
datos <- data.frame(y = c(95, 77, 80, 100, 97, 50, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 173, 236, 230, 235))
modelo <- lm(y ~ x1 + x2, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 35, x2 = 250)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=-25{,}5+1{,}332\,x_1+0{,}2362\,x_2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=-25{,}5$: peso final esperado de un animal que parte pesando 0 kg y no come: no tiene sentido físico (y es negativo); solo ajusta la altura del plano.</p><p>$b_{x_1}=1{,}332$: por cada kg adicional del peso inicial, el peso final aumenta en promedio 1,332 kg, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=0{,}2362$: por cada kg adicional del alimento consumido, el peso final aumenta en promedio 0,2362 kg, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$-25{,}5$</td><td>$19{,}23$</td><td>$-1{,}326$</td><td>$0{,}2332$</td><td>No</td></tr><tr><td>$\beta_{x_1}$</td><td>$1{,}332$</td><td>$0{,}6241$</td><td>$2{,}133$</td><td>$0{,}0768$</td><td>No</td></tr><tr><td>$\beta_{x_2}$</td><td>$0{,}2362$</td><td>$0{,}06937$</td><td>$3{,}405$</td><td>$0{,}0144$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{6}$ ($n-k-1=9-2-1=6$ gl). Región crítica: $|t|>t_{0{,}975;6}=2{,}4469$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=1{,}3315/0{,}6241=2{,}133$, $p=0{,}0768$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que el peso inicial influya en el peso final una vez consideradas las demás variables.</p><p>$\beta_{x_2}$: $t=0{,}2362/0{,}0694=3{,}405$, $p=0{,}0144$ ⇒ se <strong>rechaza</strong> $H_0$: el alimento consumido influye significativamente en el peso final.</p><p>$H_0:\beta_{x_1}=1$ vs $H_1:\beta_{x_1}\neq1$. Ojo: R prueba siempre contra 0, así que este $t$ se calcula a mano: $t=\dfrac{b-1}{ee(b)}=\dfrac{1{,}3315-1}{0{,}6241}=0{,}531$.</p><p>Con 6 gl: $|t|=0{,}531$ &lt; $t_{0{,}975;6}=2{,}4469$; valor-$p=2P(t_{6}>0{,}531)=0{,}6144$ ⇒ <strong>no se rechaza</strong> $H_0$. Es compatible con que cada kg de peso inicial se traduzca en un kg de peso final (con el alimento fijo).</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{1603/2}{243{,}6/6}=19{,}74$ con $(2,6)$ gl; $F_{0{,}95;2,6}=5{,}143$ y $p=0{,}0023$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo sirve para predecir el peso final.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{1603}{1847}=0{,}8681$: el modelo explica el <strong>86,8 %</strong> de la variabilidad del peso final.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}8681)\dfrac{8}{6}=0{,}8241$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}9492$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=1{,}58\ (x_1);\ 1{,}58\ (x_2)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/9=0{,}667$; el mayor es $h_{6}=0{,}545$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{6}=1{,}38$ ⇒ la observación 6 es influyente: si se quitara, los coeficientes cambiarían bastante. No se elimina automáticamente; primero se revisa si es un error de registro.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=-25{,}4954+1{,}331519\cdot35+0{,}236234\cdot250=80{,}166$ kg.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[72{,}996;\ 87{,}337]$. Intervalo de <strong>predicción</strong> para un caso individual: $[63{,}005;\ 97{,}328]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(95, 77, 80, 100, 97, 50, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 173, 236, 230, 235)); m <- lm(y ~ x1 + x2, data = d); coef(m)[2]})", esperado: 1.3315, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(95, 77, 80, 100, 97, 50, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 173, 236, 230, 235)); m <- lm(y ~ x1 + x2, data = d); summary(m)$r.squared})", esperado: 0.8681, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(95, 77, 80, 100, 97, 50, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 173, 236, 230, 235)); m <- lm(y ~ x1 + x2, data = d); summary(m)$fstatistic[1]})", esperado: 19.74, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(y = c(95, 77, 80, 100, 97, 50, 80, 92, 84), x1 = c(42, 33, 33, 45, 39, 32, 41, 40, 38), x2 = c(272, 226, 259, 292, 311, 173, 236, 230, 235)); m <- lm(y ~ x1 + x2, data = d); predict(m, data.frame(x1 = 35, x2 = 250))})", esperado: 80.166, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.4 (p. 450)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d014",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c06",
    dificultad: 3,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO WALPOLE · Ej. 12.5 · Consumo de energía de una planta química",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO WALPOLE</strong> — Ej. 12.5 del libro de Walpole (9.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>El consumo mensual de energíaléctrica $y$ de una planta química se relaciona con la temperatura ambiente promedio $x_1$ (°F), los días del mes $x_2$, la pureza promedio del producto $x_3$ (%) y las toneladas fabricadas $x_4$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$y$</th><th>$x_1$</th><th>$x_2$</th><th>$x_3$</th><th>$x_4$</th></tr></thead><tbody><tr><td>$240$</td><td>$25$</td><td>$24$</td><td>$91$</td><td>$100$</td></tr><tr><td>$236$</td><td>$31$</td><td>$21$</td><td>$90$</td><td>$95$</td></tr><tr><td>$290$</td><td>$45$</td><td>$24$</td><td>$88$</td><td>$110$</td></tr><tr><td>$274$</td><td>$60$</td><td>$25$</td><td>$87$</td><td>$88$</td></tr><tr><td>$301$</td><td>$65$</td><td>$25$</td><td>$91$</td><td>$94$</td></tr><tr><td>$316$</td><td>$72$</td><td>$26$</td><td>$94$</td><td>$99$</td></tr><tr><td>$300$</td><td>$80$</td><td>$25$</td><td>$87$</td><td>$97$</td></tr><tr><td>$296$</td><td>$84$</td><td>$25$</td><td>$86$</td><td>$96$</td></tr><tr><td>$267$</td><td>$75$</td><td>$24$</td><td>$88$</td><td>$110$</td></tr><tr><td>$276$</td><td>$60$</td><td>$25$</td><td>$91$</td><td>$105$</td></tr><tr><td>$288$</td><td>$50$</td><td>$25$</td><td>$90$</td><td>$100$</td></tr><tr><td>$261$</td><td>$38$</td><td>$23$</td><td>$89$</td><td>$98$</td></tr></tbody></table></div><ol type="a"><li>Ajuste un modelo de regresión lineal múltiple.</li><li>Prediga el consumo para un mes con $x_1=75$, $x_2=24$, $x_3=90$, $x_4=98$.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(240, 236, 290, 274, 301, 316, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89), x4 = c(100, 95, 110, 88, 94, 99, 97, 96, 110, 105, 100, 98))
modelo <- lm(y ~ x1 + x2 + x3 + x4, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 75, x2 = 24, x3 = 90, x4 = 98)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3 + x4, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-18.758  -9.952   3.350   6.627  23.311 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)
(Intercept) -102.71324  207.85885  -0.494    0.636
x1             0.60537    0.36890   1.641    0.145
x2             8.92364    5.30052   1.684    0.136
x3             1.43746    2.39162   0.601    0.567
x4             0.01361    0.73382   0.019    0.986

Residual standard error: 15.58 on 7 degrees of freedom
Multiple R-squared:  0.7447,	Adjusted R-squared:  0.5989 
F-statistic: 5.106 on 4 and 7 DF,  p-value: 0.0303


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.93068, p-value = 0.3874

      x1       x2       x3       x4 
2.322836 2.160759 1.335410 1.008733 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.450 0.837 0.485 0.531 0.243 0.655 0.265 0.387 0.534 0.214 0.194 0.204 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.431 0.092 0.820 0.160 0.030 0.200 0.009 0.000 0.646 0.048 0.011 0.010 
       fit      lwr      upr
1 287.5618 263.7879 311.3357
       fit      lwr      upr
1 287.5618 243.7175 331.4062`,
    salidaDe: `library(car)
datos <- data.frame(y = c(240, 236, 290, 274, 301, 316, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89), x4 = c(100, 95, 110, 88, 94, 99, 97, 96, 110, 105, 100, 98))
modelo <- lm(y ~ x1 + x2 + x3 + x4, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 75, x2 = 24, x3 = 90, x4 = 98)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=-102{,}7+0{,}6054\,x_1+8{,}924\,x_2+1{,}437\,x_3+0{,}01361\,x_4$$</p><p>Coincide con el libro: $\hat y=-102{,}7132+0{,}6054x_1+8{,}9236x_2+1{,}4374x_3+0{,}0136x_4$.</p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=-102{,}7$: consumo esperado con temperatura 0 °F, 0 días, pureza 0 % y 0 toneladas: completamente fuera del rango, no se interpreta.</p><p>$b_{x_1}=0{,}6054$: por cada °F adicional de la temperatura, el consumo aumenta en promedio 0,6054 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=8{,}924$: por cada día adicional de los días del mes, el consumo aumenta en promedio 8,924 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_3}=1{,}437$: por cada punto porcentual adicional de la pureza, el consumo aumenta en promedio 1,437 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_4}=0{,}01361$: por cada tonelada adicional de la producción, el consumo aumenta en promedio 0,01361 unidades, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$-102{,}7$</td><td>$207{,}9$</td><td>$-0{,}494$</td><td>$0{,}6363$</td><td>No</td></tr><tr><td>$\beta_{x_1}$</td><td>$0{,}6054$</td><td>$0{,}3689$</td><td>$1{,}641$</td><td>$0{,}1448$</td><td>No</td></tr><tr><td>$\beta_{x_2}$</td><td>$8{,}924$</td><td>$5{,}301$</td><td>$1{,}684$</td><td>$0{,}1361$</td><td>No</td></tr><tr><td>$\beta_{x_3}$</td><td>$1{,}437$</td><td>$2{,}392$</td><td>$0{,}601$</td><td>$0{,}5668$</td><td>No</td></tr><tr><td>$\beta_{x_4}$</td><td>$0{,}01361$</td><td>$0{,}7338$</td><td>$0{,}019$</td><td>$0{,}9857$</td><td>No</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{7}$ ($n-k-1=12-4-1=7$ gl). Región crítica: $|t|>t_{0{,}975;7}=2{,}3646$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=0{,}6054/0{,}3689=1{,}641$, $p=0{,}1448$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la temperatura influya en el consumo una vez consideradas las demás variables.</p><p>$\beta_{x_2}$: $t=8{,}9236/5{,}3005=1{,}684$, $p=0{,}1361$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que los días del mes influya en el consumo una vez consideradas las demás variables.</p><p>$\beta_{x_3}$: $t=1{,}4375/2{,}3916=0{,}601$, $p=0{,}5668$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la pureza influya en el consumo una vez consideradas las demás variables.</p><p>$\beta_{x_4}$: $t=0{,}0136/0{,}7338=0{,}019$, $p=0{,}9857$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la producción influya en el consumo una vez consideradas las demás variables.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=\beta_{x_3}=\beta_{x_4}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{4957/4}{1699/7}=5{,}11$ con $(4,7)$ gl; $F_{0{,}95;4,7}=4{,}12$ y $p=0{,}0303$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo en su conjunto sirve, aunque varias variables no sean significativas por separado (con $n=12$ y 4 regresores hay poca información para separar los efectos).</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{4957}{6656}=0{,}7447$: el modelo explica el <strong>74,5 %</strong> de la variabilidad del consumo de energía.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}7447)\dfrac{11}{7}=0{,}5989$. Baja bastante respecto del $R^2$: con $n=12$ y 4 regresores, parte del $R^2$ se debe solo a haber agregado variables. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}3874$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=2{,}32\ (x_1);\ 2{,}16\ (x_2);\ 1{,}34\ (x_3);\ 1{,}01\ (x_4)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot5/12=0{,}833$; el mayor es $h_{2}=0{,}837$ ⇒ observación 2 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{3}=0{,}82$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=-102{,}7132+0{,}605371\cdot75+8{,}923644\cdot24+1{,}437457\cdot90+0{,}013609\cdot98=287{,}562$ unidades de energía.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[263{,}788;\ 311{,}336]$. Intervalo de <strong>predicción</strong> para un caso individual: $[243{,}717;\ 331{,}406]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p>El libro da $\hat y=287{,}6$.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(240, 236, 290, 274, 301, 316, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89), x4 = c(100, 95, 110, 88, 94, 99, 97, 96, 110, 105, 100, 98)); m <- lm(y ~ x1 + x2 + x3 + x4, data = d); coef(m)[2]})", esperado: 0.6054, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(240, 236, 290, 274, 301, 316, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89), x4 = c(100, 95, 110, 88, 94, 99, 97, 96, 110, 105, 100, 98)); m <- lm(y ~ x1 + x2 + x3 + x4, data = d); summary(m)$r.squared})", esperado: 0.7447, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(240, 236, 290, 274, 301, 316, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89), x4 = c(100, 95, 110, 88, 94, 99, 97, 96, 110, 105, 100, 98)); m <- lm(y ~ x1 + x2 + x3 + x4, data = d); summary(m)$fstatistic[1]})", esperado: 5.11, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(y = c(240, 236, 290, 274, 301, 316, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89), x4 = c(100, 95, 110, 88, 94, 99, 97, 96, 110, 105, 100, 98)); m <- lm(y ~ x1 + x2 + x3 + x4, data = d); predict(m, data.frame(x1 = 75, x2 = 24, x3 = 90, x4 = 98))})", esperado: 287.562, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.5 (pp. 450–451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d015",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c06",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.5 (pp. 450–451)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.5 · Consumo de energía de una planta química (datos cambiados)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.5 del libro de Walpole (9.ª ed.). Cambio respecto del original: el consumo de los meses 3 y 6 fue 280 y 306 (en vez de 290 y 316).</p><p>El consumo mensual de energíaléctrica $y$ de una planta química se relaciona con la temperatura ambiente promedio $x_1$ (°F), los días del mes $x_2$, la pureza promedio del producto $x_3$ (%) y las toneladas fabricadas $x_4$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$y$</th><th>$x_1$</th><th>$x_2$</th><th>$x_3$</th><th>$x_4$</th></tr></thead><tbody><tr><td>$240$</td><td>$25$</td><td>$24$</td><td>$91$</td><td>$100$</td></tr><tr><td>$236$</td><td>$31$</td><td>$21$</td><td>$90$</td><td>$95$</td></tr><tr><td>$280$</td><td>$45$</td><td>$24$</td><td>$88$</td><td>$110$</td></tr><tr><td>$274$</td><td>$60$</td><td>$25$</td><td>$87$</td><td>$88$</td></tr><tr><td>$301$</td><td>$65$</td><td>$25$</td><td>$91$</td><td>$94$</td></tr><tr><td>$306$</td><td>$72$</td><td>$26$</td><td>$94$</td><td>$99$</td></tr><tr><td>$300$</td><td>$80$</td><td>$25$</td><td>$87$</td><td>$97$</td></tr><tr><td>$296$</td><td>$84$</td><td>$25$</td><td>$86$</td><td>$96$</td></tr><tr><td>$267$</td><td>$75$</td><td>$24$</td><td>$88$</td><td>$110$</td></tr><tr><td>$276$</td><td>$60$</td><td>$25$</td><td>$91$</td><td>$105$</td></tr><tr><td>$288$</td><td>$50$</td><td>$25$</td><td>$90$</td><td>$100$</td></tr><tr><td>$261$</td><td>$38$</td><td>$23$</td><td>$89$</td><td>$98$</td></tr></tbody></table></div><ol type="a"><li>Ajuste un modelo de regresión lineal múltiple.</li><li>Prediga el consumo para un mes con $x_1=75$, $x_2=24$, $x_3=90$, $x_4=98$.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(240, 236, 280, 274, 301, 306, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89), x4 = c(100, 95, 110, 88, 94, 99, 97, 96, 110, 105, 100, 98))
modelo <- lm(y ~ x1 + x2 + x3 + x4, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 75, x2 = 24, x3 = 90, x4 = 98)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3 + x4, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-16.155  -9.192   1.130   7.269  16.512 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)  
(Intercept) -23.2736   176.0582  -0.132   0.8986  
x1            0.6129     0.3125   1.962   0.0906 .
x2            8.2012     4.4896   1.827   0.1105  
x3            0.9631     2.0257   0.475   0.6490  
x4           -0.2036     0.6216  -0.328   0.7528  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 13.2 on 7 degrees of freedom
Multiple R-squared:  0.7917,	Adjusted R-squared:  0.6727 
F-statistic: 6.653 on 4 and 7 DF,  p-value: 0.01554


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.95226, p-value = 0.6703

      x1       x2       x3       x4 
2.322836 2.160759 1.335410 1.008733 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.450 0.837 0.485 0.531 0.243 0.655 0.265 0.387 0.534 0.214 0.194 0.204 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.445 0.019 0.574 0.300 0.058 0.015 0.015 0.000 0.625 0.031 0.030 0.016 
       fit      lwr      upr
1 286.2444 266.1077 306.3811
       fit      lwr      upr
1 286.2444 249.1078 323.3809`,
    salidaDe: `library(car)
datos <- data.frame(y = c(240, 236, 280, 274, 301, 306, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89), x4 = c(100, 95, 110, 88, 94, 99, 97, 96, 110, 105, 100, 98))
modelo <- lm(y ~ x1 + x2 + x3 + x4, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 75, x2 = 24, x3 = 90, x4 = 98)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=-23{,}27+0{,}6129\,x_1+8{,}201\,x_2+0{,}9631\,x_3-0{,}2036\,x_4$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=-23{,}27$: consumo esperado con temperatura 0 °F, 0 días, pureza 0 % y 0 toneladas: completamente fuera del rango, no se interpreta.</p><p>$b_{x_1}=0{,}6129$: por cada °F adicional de la temperatura, el consumo aumenta en promedio 0,6129 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=8{,}201$: por cada día adicional de los días del mes, el consumo aumenta en promedio 8,201 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_3}=0{,}9631$: por cada punto porcentual adicional de la pureza, el consumo aumenta en promedio 0,9631 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_4}=-0{,}2036$: por cada tonelada adicional de la producción, el consumo disminuye en promedio 0,2036 unidades, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$-23{,}27$</td><td>$176{,}1$</td><td>$-0{,}132$</td><td>$0{,}8986$</td><td>No</td></tr><tr><td>$\beta_{x_1}$</td><td>$0{,}6129$</td><td>$0{,}3125$</td><td>$1{,}962$</td><td>$0{,}0906$</td><td>No</td></tr><tr><td>$\beta_{x_2}$</td><td>$8{,}201$</td><td>$4{,}49$</td><td>$1{,}827$</td><td>$0{,}1105$</td><td>No</td></tr><tr><td>$\beta_{x_3}$</td><td>$0{,}9631$</td><td>$2{,}026$</td><td>$0{,}475$</td><td>$0{,}649$</td><td>No</td></tr><tr><td>$\beta_{x_4}$</td><td>$-0{,}2036$</td><td>$0{,}6216$</td><td>$-0{,}328$</td><td>$0{,}7528$</td><td>No</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{7}$ ($n-k-1=12-4-1=7$ gl). Región crítica: $|t|>t_{0{,}975;7}=2{,}3646$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=0{,}6129/0{,}3125=1{,}962$, $p=0{,}0906$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la temperatura influya en el consumo una vez consideradas las demás variables.</p><p>$\beta_{x_2}$: $t=8{,}2012/4{,}4896=1{,}827$, $p=0{,}1105$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que los días del mes influya en el consumo una vez consideradas las demás variables.</p><p>$\beta_{x_3}$: $t=0{,}9631/2{,}0257=0{,}475$, $p=0{,}649$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la pureza influya en el consumo una vez consideradas las demás variables.</p><p>$\beta_{x_4}$: $t=-0{,}2036/0{,}6216=-0{,}328$, $p=0{,}7528$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la producción influya en el consumo una vez consideradas las demás variables.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=\beta_{x_3}=\beta_{x_4}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{4634/4}{1219/7}=6{,}65$ con $(4,7)$ gl; $F_{0{,}95;4,7}=4{,}12$ y $p=0{,}0155$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo en su conjunto sirve, aunque varias variables no sean significativas por separado (con $n=12$ y 4 regresores hay poca información para separar los efectos).</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{4634}{5853}=0{,}7917$: el modelo explica el <strong>79,2 %</strong> de la variabilidad del consumo de energía.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}7917)\dfrac{11}{7}=0{,}6727$. Baja bastante respecto del $R^2$: con $n=12$ y 4 regresores, parte del $R^2$ se debe solo a haber agregado variables. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}6703$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=2{,}32\ (x_1);\ 2{,}16\ (x_2);\ 1{,}34\ (x_3);\ 1{,}01\ (x_4)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot5/12=0{,}833$; el mayor es $h_{2}=0{,}837$ ⇒ observación 2 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{9}=0{,}625$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=-23{,}2736+0{,}612908\cdot75+8{,}201228\cdot24+0{,}963056\cdot90-0{,}203618\cdot98=286{,}244$ unidades de energía.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[266{,}108;\ 306{,}381]$. Intervalo de <strong>predicción</strong> para un caso individual: $[249{,}108;\ 323{,}381]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(240, 236, 280, 274, 301, 306, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89), x4 = c(100, 95, 110, 88, 94, 99, 97, 96, 110, 105, 100, 98)); m <- lm(y ~ x1 + x2 + x3 + x4, data = d); coef(m)[2]})", esperado: 0.6129, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(240, 236, 280, 274, 301, 306, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89), x4 = c(100, 95, 110, 88, 94, 99, 97, 96, 110, 105, 100, 98)); m <- lm(y ~ x1 + x2 + x3 + x4, data = d); summary(m)$r.squared})", esperado: 0.7917, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(240, 236, 280, 274, 301, 306, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89), x4 = c(100, 95, 110, 88, 94, 99, 97, 96, 110, 105, 100, 98)); m <- lm(y ~ x1 + x2 + x3 + x4, data = d); summary(m)$fstatistic[1]})", esperado: 6.65, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(y = c(240, 236, 280, 274, 301, 306, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89), x4 = c(100, 95, 110, 88, 94, 99, 97, 96, 110, 105, 100, 98)); m <- lm(y ~ x1 + x2 + x3 + x4, data = d); predict(m, data.frame(x1 = 75, x2 = 24, x3 = 90, x4 = 98))})", esperado: 286.244, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.5 (pp. 450–451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d016",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c06",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.5 (pp. 450–451)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.5 · Consumo de energía de una planta química (sin x4)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.5 del libro de Walpole (9.ª ed.). Cambio respecto del original: se ajusta el modelo sin las toneladas fabricadas ($x_4$, la de mayor valor-p en el original).</p><p>El consumo mensual de energíaléctrica $y$ de una planta química se relaciona con la temperatura ambiente promedio $x_1$ (°F), los días del mes $x_2$, la pureza promedio del producto $x_3$ (%) y las toneladas fabricadas $x_4$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$y$</th><th>$x_1$</th><th>$x_2$</th><th>$x_3$</th></tr></thead><tbody><tr><td>$240$</td><td>$25$</td><td>$24$</td><td>$91$</td></tr><tr><td>$236$</td><td>$31$</td><td>$21$</td><td>$90$</td></tr><tr><td>$290$</td><td>$45$</td><td>$24$</td><td>$88$</td></tr><tr><td>$274$</td><td>$60$</td><td>$25$</td><td>$87$</td></tr><tr><td>$301$</td><td>$65$</td><td>$25$</td><td>$91$</td></tr><tr><td>$316$</td><td>$72$</td><td>$26$</td><td>$94$</td></tr><tr><td>$300$</td><td>$80$</td><td>$25$</td><td>$87$</td></tr><tr><td>$296$</td><td>$84$</td><td>$25$</td><td>$86$</td></tr><tr><td>$267$</td><td>$75$</td><td>$24$</td><td>$88$</td></tr><tr><td>$276$</td><td>$60$</td><td>$25$</td><td>$91$</td></tr><tr><td>$288$</td><td>$50$</td><td>$25$</td><td>$90$</td></tr><tr><td>$261$</td><td>$38$</td><td>$23$</td><td>$89$</td></tr></tbody></table></div><ol type="a"><li>Ajuste un modelo de regresión lineal múltiple.</li><li>Prediga el consumo para un mes con $x_1=75$, $x_2=24$, $x_3=90$.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(240, 236, 290, 274, 301, 316, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89))
modelo <- lm(y ~ x1 + x2 + x3, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 75, x2 = 24, x3 = 90)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-18.749 -10.040   3.302   6.627  23.463 

Coefficients:
             Estimate Std. Error t value Pr(>|t|)
(Intercept) -101.6100   186.3059  -0.545    0.600
x1             0.6056     0.3449   1.756    0.117
x2             8.9188     4.9522   1.801    0.109
x3             1.4414     2.2283   0.647    0.536

Residual standard error: 14.57 on 8 degrees of freedom
Multiple R-squared:  0.7447,	Adjusted R-squared:  0.649 
F-statistic:  7.78 on 3 and 8 DF,  p-value: 0.009318


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.93115, p-value = 0.3924

      x1       x2       x3 
2.319926 2.155478 1.324808 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.449 0.776 0.209 0.288 0.171 0.651 0.257 0.372 0.284 0.150 0.192 0.200 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.611 0.060 0.217 0.055 0.024 0.276 0.013 0.000 0.205 0.040 0.015 0.014 
       fit      lwr      upr
1 287.5886 266.1251 309.0521
       fit      lwr      upr
1 287.5886 247.7128 327.4644`,
    salidaDe: `library(car)
datos <- data.frame(y = c(240, 236, 290, 274, 301, 316, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89))
modelo <- lm(y ~ x1 + x2 + x3, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x1 = 75, x2 = 24, x3 = 90)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=-101{,}6+0{,}6056\,x_1+8{,}919\,x_2+1{,}441\,x_3$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=-101{,}6$: consumo esperado con temperatura 0 °F, 0 días, pureza 0 % y 0 toneladas: completamente fuera del rango, no se interpreta.</p><p>$b_{x_1}=0{,}6056$: por cada °F adicional de la temperatura, el consumo aumenta en promedio 0,6056 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=8{,}919$: por cada día adicional de los días del mes, el consumo aumenta en promedio 8,919 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_3}=1{,}441$: por cada punto porcentual adicional de la pureza, el consumo aumenta en promedio 1,441 unidades, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$-101{,}6$</td><td>$186{,}3$</td><td>$-0{,}545$</td><td>$0{,}6004$</td><td>No</td></tr><tr><td>$\beta_{x_1}$</td><td>$0{,}6056$</td><td>$0{,}3449$</td><td>$1{,}756$</td><td>$0{,}1171$</td><td>No</td></tr><tr><td>$\beta_{x_2}$</td><td>$8{,}919$</td><td>$4{,}952$</td><td>$1{,}801$</td><td>$0{,}1094$</td><td>No</td></tr><tr><td>$\beta_{x_3}$</td><td>$1{,}441$</td><td>$2{,}228$</td><td>$0{,}647$</td><td>$0{,}5358$</td><td>No</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{8}$ ($n-k-1=12-3-1=8$ gl). Región crítica: $|t|>t_{0{,}975;8}=2{,}306$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=0{,}6056/0{,}3449=1{,}756$, $p=0{,}1171$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la temperatura influya en el consumo una vez consideradas las demás variables.</p><p>$\beta_{x_2}$: $t=8{,}9188/4{,}9522=1{,}801$, $p=0{,}1094$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que los días del mes influya en el consumo una vez consideradas las demás variables.</p><p>$\beta_{x_3}$: $t=1{,}4414/2{,}2283=0{,}647$, $p=0{,}5358$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la pureza influya en el consumo una vez consideradas las demás variables.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=\beta_{x_3}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{4957/3}{1699/8}=7{,}78$ con $(3,8)$ gl; $F_{0{,}95;3,8}=4{,}066$ y $p=0{,}0093$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo en su conjunto sirve, aunque varias variables no sean significativas por separado (con $n=12$ y 4 regresores hay poca información para separar los efectos).</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{4957}{6656}=0{,}7447$: el modelo explica el <strong>74,5 %</strong> de la variabilidad del consumo de energía.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}7447)\dfrac{11}{8}=0{,}649$. Baja bastante respecto del $R^2$: con $n=12$ y 3 regresores, parte del $R^2$ se debe solo a haber agregado variables. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}3924$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=2{,}32\ (x_1);\ 2{,}16\ (x_2);\ 1{,}32\ (x_3)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot4/12=0{,}667$; el mayor es $h_{2}=0{,}776$ ⇒ observación 2 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{1}=0{,}611$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=-101{,}61+0{,}605613\cdot75+8{,}918784\cdot24+1{,}441409\cdot90=287{,}589$ unidades de energía.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[266{,}125;\ 309{,}052]$. Intervalo de <strong>predicción</strong> para un caso individual: $[247{,}713;\ 327{,}464]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(240, 236, 290, 274, 301, 316, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89)); m <- lm(y ~ x1 + x2 + x3, data = d); coef(m)[2]})", esperado: 0.6056, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(240, 236, 290, 274, 301, 316, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89)); m <- lm(y ~ x1 + x2 + x3, data = d); summary(m)$r.squared})", esperado: 0.7447, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(240, 236, 290, 274, 301, 316, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89)); m <- lm(y ~ x1 + x2 + x3, data = d); summary(m)$fstatistic[1]})", esperado: 7.78, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(y = c(240, 236, 290, 274, 301, 316, 300, 296, 267, 276, 288, 261), x1 = c(25, 31, 45, 60, 65, 72, 80, 84, 75, 60, 50, 38), x2 = c(24, 21, 24, 25, 25, 26, 25, 25, 24, 25, 25, 23), x3 = c(91, 90, 88, 87, 91, 94, 87, 86, 88, 91, 90, 89)); m <- lm(y ~ x1 + x2 + x3, data = d); predict(m, data.frame(x1 = 75, x2 = 24, x3 = 90))})", esperado: 287.589, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.5 (pp. 450–451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d017",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO WALPOLE · Ej. 12.6 · Distancia de frenado: modelo cuadrático",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO WALPOLE</strong> — Ej. 12.6 del libro de Walpole (9.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Para un modelo de automóvil se midió la distancia de frenado $d$ (m) a distintas velocidades $v$ (km/h).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Velocidad $v$ (km/h)</th><th>Distancia $d$ (m)</th></tr></thead><tbody><tr><td>$35$</td><td>$16$</td></tr><tr><td>$50$</td><td>$26$</td></tr><tr><td>$65$</td><td>$41$</td></tr><tr><td>$80$</td><td>$62$</td></tr><tr><td>$95$</td><td>$88$</td></tr><tr><td>$110$</td><td>$119$</td></tr></tbody></table></div><ol type="a"><li>Ajuste $\mu_{D|v}=\beta_0+\beta_1v+\beta_2v^2$.</li><li>Estime la distancia de frenado a 70 km/h.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(d = c(16, 26, 41, 62, 88, 119), v = c(35, 50, 65, 80, 95, 110))
modelo <- lm(d ~ v + I(v^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(v = 70)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = d ~ v + I(v^2), data = datos)

Residuals:
       1        2        3        4        5        6 
 0.03571  0.05000 -0.25714  0.11429  0.16429 -0.10714 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept) 13.3587302  0.7168965   18.63 0.000337 ***
v           -0.3394444  0.0214604  -15.82 0.000549 ***
I(v^2)       0.0118254  0.0001463   80.81 4.18e-06 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.2012 on 3 degrees of freedom
Multiple R-squared:      1,	Adjusted R-squared:      1 
F-statistic: 9.526e+04 on 2 and 3 DF,  p-value: 6.249e-08


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.92082, p-value = 0.5113

    1     2     3     4     5     6 
0.821 0.307 0.371 0.371 0.307 0.821 
    1     2     3     4     5     6 
0.271 0.013 0.512 0.101 0.142 2.435 
       fit     lwr      upr
1 47.54206 47.1413 47.94283
       fit      lwr      upr
1 47.54206 46.78671 48.29742`,
    salidaDe: `datos <- data.frame(d = c(16, 26, 41, 62, 88, 119), v = c(35, 50, 65, 80, 95, 110))
modelo <- lm(d ~ v + I(v^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(v = 70)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{d}=13{,}36-0{,}3394\,v+0{,}01183\,v^2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=13{,}36$: distancia predicha a 0 km/h; está fuera del rango (35–110 km/h) y físicamente debería ser 0, así que no se interpreta.</p><p>En un polinomio el efecto de $v$ <strong>no es un solo número</strong>: la pendiente cambia con $v$. Derivando: $\dfrac{\partial\hat d}{\partial v}=-0{,}339444+2(0{,}0118254)v$.</p><p>En $v=50$: $\dfrac{\partial\hat d}{\partial v}=0{,}8431$ ⇒ ahí, un aumento de una unidad en la velocidad aumenta la distancia de frenado en unas 0,843 m.</p><p>En $v=100$: $\dfrac{\partial\hat d}{\partial v}=2{,}0256$ ⇒ ahí, un aumento de una unidad en la velocidad aumenta la distancia de frenado en unas 2,026 m.</p><p>El signo de $b_2=0{,}0118254$ dice la forma: positivo ⇒ parábola convexa (con un mínimo); igualando la derivada a 0, el vértice está en $v^*=-\dfrac{b_1}{2b_2}=14{,}352$, fuera del rango observado (no se extrapola).</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$13{,}36$</td><td>$0{,}7169$</td><td>$18{,}634$</td><td>$0{,}0003$</td><td>Sí</td></tr><tr><td>$\beta_{v}$</td><td>$-0{,}3394$</td><td>$0{,}02146$</td><td>$-15{,}817$</td><td>$0{,}0005$</td><td>Sí</td></tr><tr><td>$\beta_{v^2}$</td><td>$0{,}01183$</td><td>$0{,}0001463$</td><td>$80{,}807$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{3}$ ($n-k-1=6-2-1=3$ gl). Región crítica: $|t|>t_{0{,}975;3}=3{,}1824$, o bien $p<0{,}05$.</p><p>$\beta_{v}$: $t=-0{,}3394/0{,}0215=-15{,}817$, $p=0{,}0005$ ⇒ se <strong>rechaza</strong> $H_0$: el término lineal es significativo.</p><p>$\beta_{v^2}$: $t=0{,}0118/0{,}0001=80{,}807$, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: <strong>hay curvatura</strong>: la distancia crece más que proporcionalmente con la velocidad.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{v}=\beta_{v^2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{7711/2}{0{,}1214/3}=95256{,}15$ con $(2,3)$ gl; $F_{0{,}95;2,3}=9{,}552$ y $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo cuadrático explica la distancia de frenado.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{7711}{7711}=1$: el modelo explica el <strong>100 %</strong> de la variabilidad de la distancia de frenado.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-1)\dfrac{5}{3}=1$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}5113$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/6=1$; el mayor es $h_{6}=0{,}821$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{6}=2{,}435$ ⇒ la observación 6 es influyente: si se quitara, los coeficientes cambiarían bastante. No se elimina automáticamente; primero se revisa si es un error de registro.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=13{,}3587-0{,}339444\cdot70+0{,}011825\cdot70^2=47{,}542$ m.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[47{,}141;\ 47{,}943]$. Intervalo de <strong>predicción</strong> para un caso individual: $[46{,}787;\ 48{,}297]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef v", r: "cat({d <- data.frame(d = c(16, 26, 41, 62, 88, 119), v = c(35, 50, 65, 80, 95, 110)); m <- lm(d ~ v + I(v^2), data = d); coef(m)[2]})", esperado: -0.3394, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(d = c(16, 26, 41, 62, 88, 119), v = c(35, 50, 65, 80, 95, 110)); m <- lm(d ~ v + I(v^2), data = d); summary(m)$r.squared})", esperado: 1, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(d = c(16, 26, 41, 62, 88, 119), v = c(35, 50, 65, 80, 95, 110)); m <- lm(d ~ v + I(v^2), data = d); summary(m)$fstatistic[1]})", esperado: 95256.15, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(d = c(16, 26, 41, 62, 88, 119), v = c(35, 50, 65, 80, 95, 110)); m <- lm(d ~ v + I(v^2), data = d); predict(m, data.frame(v = 70))})", esperado: 47.542, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.6 (p. 451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d018",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.6 (p. 451)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.6 · Distancia de frenado: modelo cuadrático (otras distancias)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.6 del libro de Walpole (9.ª ed.). Cambio respecto del original: las distancias medidas fueron 16, 27, 42, 63, 90 y 121 m y se pide estimar a 85 km/h.</p><p>Para un modelo de automóvil se midió la distancia de frenado $d$ (m) a distintas velocidades $v$ (km/h).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Velocidad $v$ (km/h)</th><th>Distancia $d$ (m)</th></tr></thead><tbody><tr><td>$35$</td><td>$16$</td></tr><tr><td>$50$</td><td>$27$</td></tr><tr><td>$65$</td><td>$42$</td></tr><tr><td>$80$</td><td>$63$</td></tr><tr><td>$95$</td><td>$90$</td></tr><tr><td>$110$</td><td>$121$</td></tr></tbody></table></div><ol type="a"><li>Ajuste $\mu_{D|v}=\beta_0+\beta_1v+\beta_2v^2$.</li><li>Estime la distancia de frenado a 85 km/h.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(v = c(35, 50, 65, 80, 95, 110), d = c(16, 27, 42, 63, 90, 121))
modelo <- lm(d ~ v + I(v^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(v = 85)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = d ~ v + I(v^2), data = datos)

Residuals:
      1       2       3       4       5       6 
-0.1429  0.4286 -0.2857 -0.2857  0.4286 -0.1429 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept) 12.3650794  1.5551668   7.951  0.00415 ** 
v           -0.3031746  0.0465542  -6.512  0.00735 ** 
I(v^2)       0.0117460  0.0003175  37.000 4.34e-05 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.4364 on 3 degrees of freedom
Multiple R-squared:  0.9999,	Adjusted R-squared:  0.9999 
F-statistic: 2.094e+04 on 2 and 3 DF,  p-value: 6.061e-07


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.76178, p-value = 0.02591

    1     2     3     4     5     6 
0.821 0.307 0.371 0.371 0.307 0.821 
    1     2     3     4     5     6 
0.920 0.206 0.134 0.134 0.206 0.920 
       fit      lwr      upr
1 71.46032 70.65208 72.26856
       fit      lwr     upr
1 71.46032 69.85334 73.0673`,
    salidaDe: `datos <- data.frame(v = c(35, 50, 65, 80, 95, 110), d = c(16, 27, 42, 63, 90, 121))
modelo <- lm(d ~ v + I(v^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(v = 85)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{d}=12{,}37-0{,}3032\,v+0{,}01175\,v^2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=12{,}37$: distancia predicha a 0 km/h; está fuera del rango (35–110 km/h) y físicamente debería ser 0, así que no se interpreta.</p><p>En un polinomio el efecto de $v$ <strong>no es un solo número</strong>: la pendiente cambia con $v$. Derivando: $\dfrac{\partial\hat d}{\partial v}=-0{,}303175+2(0{,}01174603)v$.</p><p>En $v=50$: $\dfrac{\partial\hat d}{\partial v}=0{,}8714$ ⇒ ahí, un aumento de una unidad en la velocidad aumenta la distancia de frenado en unas 0,871 m.</p><p>En $v=100$: $\dfrac{\partial\hat d}{\partial v}=2{,}046$ ⇒ ahí, un aumento de una unidad en la velocidad aumenta la distancia de frenado en unas 2,046 m.</p><p>El signo de $b_2=0{,}01174603$ dice la forma: positivo ⇒ parábola convexa (con un mínimo); igualando la derivada a 0, el vértice está en $v^*=-\dfrac{b_1}{2b_2}=12{,}905$, fuera del rango observado (no se extrapola).</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$12{,}37$</td><td>$1{,}555$</td><td>$7{,}951$</td><td>$0{,}0041$</td><td>Sí</td></tr><tr><td>$\beta_{v}$</td><td>$-0{,}3032$</td><td>$0{,}04655$</td><td>$-6{,}512$</td><td>$0{,}0074$</td><td>Sí</td></tr><tr><td>$\beta_{v^2}$</td><td>$0{,}01175$</td><td>$0{,}0003175$</td><td>$37$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{3}$ ($n-k-1=6-2-1=3$ gl). Región crítica: $|t|>t_{0{,}975;3}=3{,}1824$, o bien $p<0{,}05$.</p><p>$\beta_{v}$: $t=-0{,}3032/0{,}0466=-6{,}512$, $p=0{,}0074$ ⇒ se <strong>rechaza</strong> $H_0$: el término lineal es significativo.</p><p>$\beta_{v^2}$: $t=0{,}0117/0{,}0003=37$, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: <strong>hay curvatura</strong>: la distancia crece más que proporcionalmente con la velocidad.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{v}=\beta_{v^2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{7978/2}{0{,}5714/3}=20942{,}94$ con $(2,3)$ gl; $F_{0{,}95;2,3}=9{,}552$ y $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo cuadrático explica la distancia de frenado.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{7978}{7979}=0{,}9999$: el modelo explica el <strong>99,99 %</strong> de la variabilidad de la distancia de frenado.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}9999)\dfrac{5}{3}=0{,}9999$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}0259$ ⇒ se rechaza: los residuos no parecen normales (revisar el Q-Q; con $n$ pequeño la prueba es poco confiable).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/6=1$; el mayor es $h_{6}=0{,}821$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{6}=0{,}92$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=12{,}3651-0{,}303175\cdot85+0{,}011746\cdot85^2=71{,}46$ m.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[70{,}652;\ 72{,}269]$. Intervalo de <strong>predicción</strong> para un caso individual: $[69{,}853;\ 73{,}067]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef v", r: "cat({d <- data.frame(v = c(35, 50, 65, 80, 95, 110), d = c(16, 27, 42, 63, 90, 121)); m <- lm(d ~ v + I(v^2), data = d); coef(m)[2]})", esperado: -0.3032, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(v = c(35, 50, 65, 80, 95, 110), d = c(16, 27, 42, 63, 90, 121)); m <- lm(d ~ v + I(v^2), data = d); summary(m)$r.squared})", esperado: 0.9999, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(v = c(35, 50, 65, 80, 95, 110), d = c(16, 27, 42, 63, 90, 121)); m <- lm(d ~ v + I(v^2), data = d); summary(m)$fstatistic[1]})", esperado: 20942.94, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(v = c(35, 50, 65, 80, 95, 110), d = c(16, 27, 42, 63, 90, 121)); m <- lm(d ~ v + I(v^2), data = d); predict(m, data.frame(v = 85))})", esperado: 71.46, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.6 (p. 451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d019",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.6 (p. 451)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.6 · Distancia de frenado: modelo cuadrático (7 velocidades)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.6 del libro de Walpole (9.ª ed.). Cambio respecto del original: se agregó una prueba a 125 km/h con 154 m de frenado.</p><p>Para un modelo de automóvil se midió la distancia de frenado $d$ (m) a distintas velocidades $v$ (km/h).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Velocidad $v$ (km/h)</th><th>Distancia $d$ (m)</th></tr></thead><tbody><tr><td>$35$</td><td>$16$</td></tr><tr><td>$50$</td><td>$26$</td></tr><tr><td>$65$</td><td>$41$</td></tr><tr><td>$80$</td><td>$62$</td></tr><tr><td>$95$</td><td>$88$</td></tr><tr><td>$110$</td><td>$119$</td></tr><tr><td>$125$</td><td>$154$</td></tr></tbody></table></div><ol type="a"><li>Ajuste $\mu_{D|v}=\beta_0+\beta_1v+\beta_2v^2$.</li><li>Estime la distancia de frenado a 70 km/h.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(v = c(35, 50, 65, 80, 95, 110, 125), d = c(16, 26, 41, 62, 88, 119, 154))
modelo <- lm(d ~ v + I(v^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(v = 70)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = d ~ v + I(v^2), data = datos)

Residuals:
       1        2        3        4        5        6        7 
 0.23810 -0.07143 -0.50000 -0.04762  0.28571  0.50000 -0.40476 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept) 11.6137566  1.2938834   8.976 0.000853 ***
v           -0.2796296  0.0353618  -7.908 0.001384 ** 
I(v^2)       0.0113757  0.0002182  52.145  8.1e-07 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.4499 on 4 degrees of freedom
Multiple R-squared:  0.9999,	Adjusted R-squared:  0.9999 
F-statistic: 3.83e+04 on 2 and 4 DF,  p-value: 2.727e-09


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.94797, p-value = 0.7112

    1     2     3     4     5     6     7 
0.762 0.286 0.286 0.333 0.286 0.286 0.762 
    1     2     3     4     5     6     7 
1.255 0.005 0.231 0.003 0.075 0.231 3.627 
       fit      lwr      upr
1 47.78042 47.08586 48.47499
       fit      lwr      upr
1 47.78042 46.35126 49.20959`,
    salidaDe: `datos <- data.frame(v = c(35, 50, 65, 80, 95, 110, 125), d = c(16, 26, 41, 62, 88, 119, 154))
modelo <- lm(d ~ v + I(v^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(v = 70)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{d}=11{,}61-0{,}2796\,v+0{,}01138\,v^2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=11{,}61$: distancia predicha a 0 km/h; está fuera del rango (35–110 km/h) y físicamente debería ser 0, así que no se interpreta.</p><p>En un polinomio el efecto de $v$ <strong>no es un solo número</strong>: la pendiente cambia con $v$. Derivando: $\dfrac{\partial\hat d}{\partial v}=-0{,}27963+2(0{,}01137566)v$.</p><p>En $v=50$: $\dfrac{\partial\hat d}{\partial v}=0{,}8579$ ⇒ ahí, un aumento de una unidad en la velocidad aumenta la distancia de frenado en unas 0,858 m.</p><p>En $v=100$: $\dfrac{\partial\hat d}{\partial v}=1{,}9955$ ⇒ ahí, un aumento de una unidad en la velocidad aumenta la distancia de frenado en unas 1,996 m.</p><p>El signo de $b_2=0{,}01137566$ dice la forma: positivo ⇒ parábola convexa (con un mínimo); igualando la derivada a 0, el vértice está en $v^*=-\dfrac{b_1}{2b_2}=12{,}291$, fuera del rango observado (no se extrapola).</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$11{,}61$</td><td>$1{,}294$</td><td>$8{,}976$</td><td>$0{,}0009$</td><td>Sí</td></tr><tr><td>$\beta_{v}$</td><td>$-0{,}2796$</td><td>$0{,}03536$</td><td>$-7{,}908$</td><td>$0{,}0014$</td><td>Sí</td></tr><tr><td>$\beta_{v^2}$</td><td>$0{,}01138$</td><td>$0{,}0002182$</td><td>$52{,}145$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{4}$ ($n-k-1=7-2-1=4$ gl). Región crítica: $|t|>t_{0{,}975;4}=2{,}7764$, o bien $p<0{,}05$.</p><p>$\beta_{v}$: $t=-0{,}2796/0{,}0354=-7{,}908$, $p=0{,}0014$ ⇒ se <strong>rechaza</strong> $H_0$: el término lineal es significativo.</p><p>$\beta_{v^2}$: $t=0{,}0114/0{,}0002=52{,}145$, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: <strong>hay curvatura</strong>: la distancia crece más que proporcionalmente con la velocidad.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{v}=\beta_{v^2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{15501/2}{0{,}8095/4}=38295{,}65$ con $(2,4)$ gl; $F_{0{,}95;2,4}=6{,}944$ y $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo cuadrático explica la distancia de frenado.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{15501}{15501}=0{,}9999$: el modelo explica el <strong>99,99 %</strong> de la variabilidad de la distancia de frenado.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}9999)\dfrac{6}{4}=0{,}9999$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}7112$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/7=0{,}857$; el mayor es $h_{1}=0{,}762$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{7}=3{,}627$ ⇒ las observaciónes 1, 7 son influyentes: si se quitara, los coeficientes cambiarían bastante. No se elimina automáticamente; primero se revisa si es un error de registro.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=11{,}6138-0{,}27963\cdot70+0{,}011376\cdot70^2=47{,}78$ m.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[47{,}086;\ 48{,}475]$. Intervalo de <strong>predicción</strong> para un caso individual: $[46{,}351;\ 49{,}21]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef v", r: "cat({d <- data.frame(v = c(35, 50, 65, 80, 95, 110, 125), d = c(16, 26, 41, 62, 88, 119, 154)); m <- lm(d ~ v + I(v^2), data = d); coef(m)[2]})", esperado: -0.2796, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(v = c(35, 50, 65, 80, 95, 110, 125), d = c(16, 26, 41, 62, 88, 119, 154)); m <- lm(d ~ v + I(v^2), data = d); summary(m)$r.squared})", esperado: 0.9999, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(v = c(35, 50, 65, 80, 95, 110, 125), d = c(16, 26, 41, 62, 88, 119, 154)); m <- lm(d ~ v + I(v^2), data = d); summary(m)$fstatistic[1]})", esperado: 38295.65, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(v = c(35, 50, 65, 80, 95, 110, 125), d = c(16, 26, 41, 62, 88, 119, 154)); m <- lm(d ~ v + I(v^2), data = d); predict(m, data.frame(v = 70))})", esperado: 47.78, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.6 (p. 451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d020",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO WALPOLE · Ej. 12.7 · Flujo sanguíneo cerebral: modelo cuadrático",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO WALPOLE</strong> — Ej. 12.7 del libro de Walpole (9.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>En 15 pacientes se midió el flujo sanguíneo cerebral $y$ y la tensión arterial del oxígeno $x$ (mm de Hg). Estime $\mu_{Y|x}=\beta_0+\beta_1x+\beta_2x^2$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Flujo $y$</th><th>Tensión $x$</th></tr></thead><tbody><tr><td>$84{,}33$</td><td>$603{,}4$</td></tr><tr><td>$87{,}8$</td><td>$582{,}5$</td></tr><tr><td>$82{,}2$</td><td>$556{,}2$</td></tr><tr><td>$78{,}21$</td><td>$594{,}6$</td></tr><tr><td>$78{,}44$</td><td>$558{,}9$</td></tr><tr><td>$80{,}01$</td><td>$575{,}2$</td></tr><tr><td>$83{,}53$</td><td>$580{,}1$</td></tr><tr><td>$79{,}46$</td><td>$451{,}2$</td></tr><tr><td>$75{,}22$</td><td>$404$</td></tr><tr><td>$76{,}58$</td><td>$484$</td></tr><tr><td>$77{,}9$</td><td>$452{,}4$</td></tr><tr><td>$78{,}8$</td><td>$448{,}4$</td></tr><tr><td>$80{,}67$</td><td>$334{,}8$</td></tr><tr><td>$86{,}6$</td><td>$320{,}3$</td></tr><tr><td>$78{,}2$</td><td>$350{,}3$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión cuadrática.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8, 80.67, 86.6, 78.2), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4, 334.8, 320.3, 350.3))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    salidaR: `
Call:
lm(formula = y ~ x + I(x^2), data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-5.0644 -1.9435  0.2775  1.6042  5.5173 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept)  1.416e+02  2.296e+01   6.169 4.81e-05 ***
x           -2.819e-01  1.015e-01  -2.776   0.0168 *  
I(x^2)       3.091e-04  1.082e-04   2.856   0.0145 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 2.979 on 12 degrees of freedom
Multiple R-squared:  0.4282,	Adjusted R-squared:  0.3329 
F-statistic: 4.494 on 2 and 12 DF,  p-value: 0.03494


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.98606, p-value = 0.9952

    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.263 0.148 0.106 0.203 0.107 0.127 0.140 0.194 0.158 0.186 0.195 0.193 0.312 
   14    15 
0.451 0.219 
    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.001 0.232 0.015 0.307 0.024 0.018 0.015 0.050 0.073 0.010 0.004 0.023 0.036 
   14    15 
0.717 0.090`,
    salidaDe: `datos <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8, 80.67, 86.6, 78.2), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4, 334.8, 320.3, 350.3))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=141{,}6-0{,}2819\,x+0{,}0003091\,x^2$$</p><p>Coincide con el libro: $\hat y=141{,}6118-0{,}2819x+0{,}0003x^2$.</p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=141{,}6$: flujo predicho con tensión 0, muy lejos del rango (320–600 mm Hg); no se interpreta.</p><p>En un polinomio el efecto de $x$ <strong>no es un solo número</strong>: la pendiente cambia con $x$. Derivando: $\dfrac{\partial\hat y}{\partial x}=-0{,}281927+2(0{,}00030914)x$.</p><p>En $x=400$: $\dfrac{\partial\hat y}{\partial x}=-0{,}0346$ ⇒ ahí, un aumento de una unidad en la tensión del oxígeno disminuye el flujo sanguíneo en unas 0,035 unidades de flujo.</p><p>En $x=550$: $\dfrac{\partial\hat y}{\partial x}=0{,}0581$ ⇒ ahí, un aumento de una unidad en la tensión del oxígeno aumenta el flujo sanguíneo en unas 0,058 unidades de flujo.</p><p>El signo de $b_2=0{,}00030914$ dice la forma: positivo ⇒ parábola convexa (con un mínimo); igualando la derivada a 0, el vértice está en $x^*=-\dfrac{b_1}{2b_2}=455{,}985$, dentro del rango observado.</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$141{,}6$</td><td>$22{,}96$</td><td>$6{,}169$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x}$</td><td>$-0{,}2819$</td><td>$0{,}1015$</td><td>$-2{,}776$</td><td>$0{,}0168$</td><td>Sí</td></tr><tr><td>$\beta_{x^2}$</td><td>$0{,}0003091$</td><td>$0{,}0001082$</td><td>$2{,}856$</td><td>$0{,}0145$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{12}$ ($n-k-1=15-2-1=12$ gl). Región crítica: $|t|>t_{0{,}975;12}=2{,}1788$, o bien $p<0{,}05$.</p><p>$\beta_{x}$: $t=-0{,}2819/0{,}1015=-2{,}776$, $p=0{,}0168$ ⇒ se <strong>rechaza</strong> $H_0$: el término lineal es significativo.</p><p>$\beta_{x^2}$: $t=0{,}0003/0{,}0001=2{,}856$, $p=0{,}0145$ ⇒ se <strong>rechaza</strong> $H_0$: <strong>hay curvatura</strong>: la relación no es una recta.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x}=\beta_{x^2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{79{,}76/2}{106{,}5/12}=4{,}49$ con $(2,12)$ gl; $F_{0{,}95;2,12}=3{,}885$ y $p=0{,}0349$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo cuadrático explica parte del flujo sanguíneo, aunque con un $R^2$ modesto.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{79{,}76}{186{,}2}=0{,}4282$: el modelo explica el <strong>42,8 %</strong> de la variabilidad del flujo sanguíneo.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}4282)\dfrac{14}{12}=0{,}3329$. Baja bastante respecto del $R^2$: con $n=15$ y 2 regresores, parte del $R^2$ se debe solo a haber agregado variables. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 2, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}9952$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/15=0{,}4$; el mayor es $h_{14}=0{,}451$ ⇒ observación 14 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{14}=0{,}717$ ⇒ ningún punto es influyente.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x", r: "cat({d <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8, 80.67, 86.6, 78.2), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4, 334.8, 320.3, 350.3)); m <- lm(y ~ x + I(x^2), data = d); coef(m)[2]})", esperado: -0.2819, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8, 80.67, 86.6, 78.2), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4, 334.8, 320.3, 350.3)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$r.squared})", esperado: 0.4282, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8, 80.67, 86.6, 78.2), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4, 334.8, 320.3, 350.3)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$fstatistic[1]})", esperado: 4.49, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.7 (p. 451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d021",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.7 (p. 451)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.7 · Flujo sanguíneo cerebral: modelo cuadrático (paciente 14 corregido)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.7 del libro de Walpole (9.ª ed.). Cambio respecto del original: el paciente 14 tuvo un flujo de 82,60 (en vez de 86,60).</p><p>En 15 pacientes se midió el flujo sanguíneo cerebral $y$ y la tensión arterial del oxígeno $x$ (mm de Hg). Estime $\mu_{Y|x}=\beta_0+\beta_1x+\beta_2x^2$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Flujo $y$</th><th>Tensión $x$</th></tr></thead><tbody><tr><td>$84{,}33$</td><td>$603{,}4$</td></tr><tr><td>$87{,}8$</td><td>$582{,}5$</td></tr><tr><td>$82{,}2$</td><td>$556{,}2$</td></tr><tr><td>$78{,}21$</td><td>$594{,}6$</td></tr><tr><td>$78{,}44$</td><td>$558{,}9$</td></tr><tr><td>$80{,}01$</td><td>$575{,}2$</td></tr><tr><td>$83{,}53$</td><td>$580{,}1$</td></tr><tr><td>$79{,}46$</td><td>$451{,}2$</td></tr><tr><td>$75{,}22$</td><td>$404$</td></tr><tr><td>$76{,}58$</td><td>$484$</td></tr><tr><td>$77{,}9$</td><td>$452{,}4$</td></tr><tr><td>$78{,}8$</td><td>$448{,}4$</td></tr><tr><td>$80{,}67$</td><td>$334{,}8$</td></tr><tr><td>$82{,}6$</td><td>$320{,}3$</td></tr><tr><td>$78{,}2$</td><td>$350{,}3$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión cuadrática.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8, 80.67, 82.6, 78.2), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4, 334.8, 320.3, 350.3))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    salidaR: `
Call:
lm(formula = y ~ x + I(x^2), data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-4.9061 -1.5911  0.3867  1.4091  5.5479 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept)  1.259e+02  2.071e+01   6.077 5.53e-05 ***
x           -2.182e-01  9.162e-02  -2.381   0.0347 *  
I(x^2)       2.460e-04  9.765e-05   2.519   0.0270 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 2.688 on 12 degrees of freedom
Multiple R-squared:  0.432,	Adjusted R-squared:  0.3374 
F-statistic: 4.564 on 2 and 12 DF,  p-value: 0.03357


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.95634, p-value = 0.6291

    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.263 0.148 0.106 0.203 0.107 0.127 0.140 0.194 0.158 0.186 0.195 0.193 0.312 
   14    15 
0.451 0.219 
    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.007 0.288 0.015 0.354 0.034 0.024 0.018 0.053 0.072 0.022 0.002 0.023 0.002 
   14    15 
0.131 0.034`,
    salidaDe: `datos <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8, 80.67, 82.6, 78.2), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4, 334.8, 320.3, 350.3))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=125{,}9-0{,}2182\,x+0{,}000246\,x^2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=125{,}9$: flujo predicho con tensión 0, muy lejos del rango (320–600 mm Hg); no se interpreta.</p><p>En un polinomio el efecto de $x$ <strong>no es un solo número</strong>: la pendiente cambia con $x$. Derivando: $\dfrac{\partial\hat y}{\partial x}=-0{,}218169+2(0{,}00024601)x$.</p><p>En $x=400$: $\dfrac{\partial\hat y}{\partial x}=-0{,}0214$ ⇒ ahí, un aumento de una unidad en la tensión del oxígeno disminuye el flujo sanguíneo en unas 0,021 unidades de flujo.</p><p>En $x=550$: $\dfrac{\partial\hat y}{\partial x}=0{,}0524$ ⇒ ahí, un aumento de una unidad en la tensión del oxígeno aumenta el flujo sanguíneo en unas 0,052 unidades de flujo.</p><p>El signo de $b_2=0{,}00024601$ dice la forma: positivo ⇒ parábola convexa (con un mínimo); igualando la derivada a 0, el vértice está en $x^*=-\dfrac{b_1}{2b_2}=443{,}419$, dentro del rango observado.</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$125{,}9$</td><td>$20{,}71$</td><td>$6{,}077$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x}$</td><td>$-0{,}2182$</td><td>$0{,}09162$</td><td>$-2{,}381$</td><td>$0{,}0347$</td><td>Sí</td></tr><tr><td>$\beta_{x^2}$</td><td>$0{,}000246$</td><td>$0{,}00009765$</td><td>$2{,}519$</td><td>$0{,}027$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{12}$ ($n-k-1=15-2-1=12$ gl). Región crítica: $|t|>t_{0{,}975;12}=2{,}1788$, o bien $p<0{,}05$.</p><p>$\beta_{x}$: $t=-0{,}2182/0{,}0916=-2{,}381$, $p=0{,}0347$ ⇒ se <strong>rechaza</strong> $H_0$: el término lineal es significativo.</p><p>$\beta_{x^2}$: $t=0{,}0002/0{,}0001=2{,}519$, $p=0{,}027$ ⇒ se <strong>rechaza</strong> $H_0$: <strong>hay curvatura</strong>: la relación no es una recta.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x}=\beta_{x^2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{65{,}94/2}{86{,}68/12}=4{,}56$ con $(2,12)$ gl; $F_{0{,}95;2,12}=3{,}885$ y $p=0{,}0336$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo cuadrático explica parte del flujo sanguíneo, aunque con un $R^2$ modesto.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{65{,}94}{152{,}6}=0{,}432$: el modelo explica el <strong>43,2 %</strong> de la variabilidad del flujo sanguíneo.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}432)\dfrac{14}{12}=0{,}3374$. Baja bastante respecto del $R^2$: con $n=15$ y 2 regresores, parte del $R^2$ se debe solo a haber agregado variables. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 2, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}6291$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/15=0{,}4$; el mayor es $h_{14}=0{,}451$ ⇒ observación 14 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{4}=0{,}354$ ⇒ ningún punto es influyente.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x", r: "cat({d <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8, 80.67, 82.6, 78.2), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4, 334.8, 320.3, 350.3)); m <- lm(y ~ x + I(x^2), data = d); coef(m)[2]})", esperado: -0.2182, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8, 80.67, 82.6, 78.2), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4, 334.8, 320.3, 350.3)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$r.squared})", esperado: 0.432, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8, 80.67, 82.6, 78.2), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4, 334.8, 320.3, 350.3)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$fstatistic[1]})", esperado: 4.56, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.7 (p. 451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d022",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.7 (p. 451)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.7 · Flujo sanguíneo cerebral: modelo cuadrático (12 pacientes)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.7 del libro de Walpole (9.ª ed.). Cambio respecto del original: se eliminaron los 3 últimos pacientes (n = 12).</p><p>En 15 pacientes se midió el flujo sanguíneo cerebral $y$ y la tensión arterial del oxígeno $x$ (mm de Hg). Estime $\mu_{Y|x}=\beta_0+\beta_1x+\beta_2x^2$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Flujo $y$</th><th>Tensión $x$</th></tr></thead><tbody><tr><td>$84{,}33$</td><td>$603{,}4$</td></tr><tr><td>$87{,}8$</td><td>$582{,}5$</td></tr><tr><td>$82{,}2$</td><td>$556{,}2$</td></tr><tr><td>$78{,}21$</td><td>$594{,}6$</td></tr><tr><td>$78{,}44$</td><td>$558{,}9$</td></tr><tr><td>$80{,}01$</td><td>$575{,}2$</td></tr><tr><td>$83{,}53$</td><td>$580{,}1$</td></tr><tr><td>$79{,}46$</td><td>$451{,}2$</td></tr><tr><td>$75{,}22$</td><td>$404$</td></tr><tr><td>$76{,}58$</td><td>$484$</td></tr><tr><td>$77{,}9$</td><td>$452{,}4$</td></tr><tr><td>$78{,}8$</td><td>$448{,}4$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión cuadrática.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    salidaR: `
Call:
lm(formula = y ~ x + I(x^2), data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-4.4929 -1.9670  0.6008  1.3029  5.5806 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)
(Intercept)  7.153e+01  7.637e+01   0.937    0.373
x           -2.832e-03  3.043e-01  -0.009    0.993
I(x^2)       3.635e-05  2.981e-04   0.122    0.906

Residual standard error: 2.948 on 9 degrees of freedom
Multiple R-squared:  0.4517,	Adjusted R-squared:  0.3299 
F-statistic: 3.707 on 2 and 9 DF,  p-value: 0.06692


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.95317, p-value = 0.6837

    1     2     3     4     5     6     7     8     9    10    11    12 
0.359 0.148 0.173 0.232 0.163 0.133 0.140 0.199 0.769 0.286 0.200 0.198 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.054 0.243 0.010 0.305 0.073 0.025 0.014 0.039 0.675 0.095 0.001 0.018`,
    salidaDe: `datos <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=71{,}53-0{,}002832\,x+0{,}00003635\,x^2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=71{,}53$: flujo predicho con tensión 0, muy lejos del rango (320–600 mm Hg); no se interpreta.</p><p>En un polinomio el efecto de $x$ <strong>no es un solo número</strong>: la pendiente cambia con $x$. Derivando: $\dfrac{\partial\hat y}{\partial x}=-0{,}002832+2(0{,}00003635)x$.</p><p>En $x=400$: $\dfrac{\partial\hat y}{\partial x}=0{,}0263$ ⇒ ahí, un aumento de una unidad en la tensión del oxígeno aumenta el flujo sanguíneo en unas 0,026 unidades de flujo.</p><p>En $x=550$: $\dfrac{\partial\hat y}{\partial x}=0{,}0372$ ⇒ ahí, un aumento de una unidad en la tensión del oxígeno aumenta el flujo sanguíneo en unas 0,037 unidades de flujo.</p><p>El signo de $b_2=0{,}00003635$ dice la forma: positivo ⇒ parábola convexa (con un mínimo); igualando la derivada a 0, el vértice está en $x^*=-\dfrac{b_1}{2b_2}=38{,}945$, fuera del rango observado (no se extrapola).</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$71{,}53$</td><td>$76{,}37$</td><td>$0{,}937$</td><td>$0{,}3734$</td><td>No</td></tr><tr><td>$\beta_{x}$</td><td>$-0{,}002832$</td><td>$0{,}3043$</td><td>$-0{,}009$</td><td>$0{,}9928$</td><td>No</td></tr><tr><td>$\beta_{x^2}$</td><td>$0{,}00003635$</td><td>$0{,}0002981$</td><td>$0{,}122$</td><td>$0{,}9056$</td><td>No</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{9}$ ($n-k-1=12-2-1=9$ gl). Región crítica: $|t|>t_{0{,}975;9}=2{,}2622$, o bien $p<0{,}05$.</p><p>$\beta_{x}$: $t=-0{,}0028/0{,}3043=-0{,}009$, $p=0{,}9928$ ⇒ <strong>no se rechaza</strong> $H_0$: el término lineal no es significativo.</p><p>$\beta_{x^2}$: $t=0/0{,}0003=0{,}122$, $p=0{,}9056$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de curvatura.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x}=\beta_{x^2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{64{,}46/2}{78{,}24/9}=3{,}71$ con $(2,9)$ gl; $F_{0{,}95;2,9}=4{,}256$ y $p=0{,}0669$ ⇒ <strong>no se rechaza</strong> $H_0$. El modelo no explica el flujo sanguíneo.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{64{,}46}{142{,}7}=0{,}4517$: el modelo explica el <strong>45,2 %</strong> de la variabilidad del flujo sanguíneo.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}4517)\dfrac{11}{9}=0{,}3299$. Baja bastante respecto del $R^2$: con $n=12$ y 2 regresores, parte del $R^2$ se debe solo a haber agregado variables. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 2, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}6837$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/12=0{,}5$; el mayor es $h_{9}=0{,}769$ ⇒ observación 9 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{9}=0{,}675$ ⇒ ningún punto es influyente.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x", r: "cat({d <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4)); m <- lm(y ~ x + I(x^2), data = d); coef(m)[2]})", esperado: -0.0028, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$r.squared})", esperado: 0.4517, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(84.33, 87.8, 82.2, 78.21, 78.44, 80.01, 83.53, 79.46, 75.22, 76.58, 77.9, 78.8), x = c(603.4, 582.5, 556.2, 594.6, 558.9, 575.2, 580.1, 451.2, 404, 484, 452.4, 448.4)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$fstatistic[1]})", esperado: 3.71, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.7 (p. 451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d023",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 3,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO WALPOLE · Ej. 12.8 · Resistencia de una aleación: cuadrático y falta de ajuste",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO WALPOLE</strong> — Ej. 12.8 del libro de Walpole (9.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Datos codificados de la resistencia a la compresión $y$ de una aleación para distintas concentraciones $x$ de un aditivo (3 réplicas por concentración).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Concentración $x$</th><th>Resistencia $y$</th></tr></thead><tbody><tr><td>$10$</td><td>$25{,}2$</td></tr><tr><td>$10$</td><td>$27{,}3$</td></tr><tr><td>$10$</td><td>$28{,}7$</td></tr><tr><td>$15$</td><td>$29{,}8$</td></tr><tr><td>$15$</td><td>$31{,}1$</td></tr><tr><td>$15$</td><td>$27{,}8$</td></tr><tr><td>$20$</td><td>$31{,}2$</td></tr><tr><td>$20$</td><td>$32{,}6$</td></tr><tr><td>$20$</td><td>$29{,}7$</td></tr><tr><td>$25$</td><td>$31{,}7$</td></tr><tr><td>$25$</td><td>$30{,}1$</td></tr><tr><td>$25$</td><td>$32{,}3$</td></tr><tr><td>$30$</td><td>$29{,}4$</td></tr><tr><td>$30$</td><td>$30{,}8$</td></tr><tr><td>$30$</td><td>$32{,}8$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión cuadrática.</li><li>Pruebe la falta de ajuste del modelo.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(y = c(25.2, 27.3, 28.7, 29.8, 31.1, 27.8, 31.2, 32.6, 29.7, 31.7, 30.1, 32.3, 29.4, 30.8, 32.8), x = c(10, 10, 10, 15, 15, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
completo <- lm(y ~ factor(x), data = datos)   # una media por nivel: error puro
anova(modelo, completo)`,
    salidaR: `
Call:
lm(formula = y ~ x + I(x^2), data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-1.8809 -1.3809  0.1905  1.1571  1.8524 

Coefficients:
             Estimate Std. Error t value Pr(>|t|)    
(Intercept) 19.033333   3.277549   5.807 8.38e-05 ***
x            1.008571   0.356431   2.830   0.0152 *  
I(x^2)      -0.020381   0.008815  -2.312   0.0393 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 1.428 on 12 degrees of freedom
Multiple R-squared:  0.614,	Adjusted R-squared:  0.5497 
F-statistic: 9.545 on 2 and 12 DF,  p-value: 0.003307


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.90021, p-value = 0.09589

    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.295 0.295 0.295 0.124 0.124 0.124 0.162 0.162 0.162 0.124 0.124 0.124 0.295 
   14    15 
0.295 0.295 
    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.344 0.005 0.255 0.001 0.061 0.083 0.001 0.090 0.069 0.001 0.052 0.016 0.233 
   14    15 
0.002 0.333 
Analysis of Variance Table

Model 1: y ~ x + I(x^2)
Model 2: y ~ factor(x)
  Res.Df    RSS Df Sum of Sq      F Pr(>F)
1     12 24.476                           
2     10 24.367  2   0.10952 0.0225 0.9778`,
    salidaDe: `datos <- data.frame(y = c(25.2, 27.3, 28.7, 29.8, 31.1, 27.8, 31.2, 32.6, 29.7, 31.7, 30.1, 32.3, 29.4, 30.8, 32.8), x = c(10, 10, 10, 15, 15, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
completo <- lm(y ~ factor(x), data = datos)   # una media por nivel: error puro
anova(modelo, completo)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=19{,}03+1{,}009\,x-0{,}02038\,x^2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=19{,}03$: resistencia predicha sin aditivo; $x=0$ está fuera del rango (10–30), no se interpreta.</p><p>En un polinomio el efecto de $x$ <strong>no es un solo número</strong>: la pendiente cambia con $x$. Derivando: $\dfrac{\partial\hat y}{\partial x}=1{,}008571-2(0{,}02038095)x$.</p><p>En $x=15$: $\dfrac{\partial\hat y}{\partial x}=0{,}3971$ ⇒ ahí, un aumento de una unidad en la concentración aumenta la resistencia a la compresión en unas 0,397 unidades.</p><p>En $x=25$: $\dfrac{\partial\hat y}{\partial x}=-0{,}0105$ ⇒ ahí, un aumento de una unidad en la concentración disminuye la resistencia a la compresión en unas 0,01 unidades.</p><p>El signo de $b_2=-0{,}02038095$ dice la forma: negativo ⇒ parábola cóncava (rendimientos decrecientes, con un máximo); igualando la derivada a 0, el vértice está en $x^*=-\dfrac{b_1}{2b_2}=24{,}743$, dentro del rango observado.</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$19{,}03$</td><td>$3{,}278$</td><td>$5{,}807$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x}$</td><td>$1{,}009$</td><td>$0{,}3564$</td><td>$2{,}83$</td><td>$0{,}0152$</td><td>Sí</td></tr><tr><td>$\beta_{x^2}$</td><td>$-0{,}02038$</td><td>$0{,}008815$</td><td>$-2{,}312$</td><td>$0{,}0393$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{12}$ ($n-k-1=15-2-1=12$ gl). Región crítica: $|t|>t_{0{,}975;12}=2{,}1788$, o bien $p<0{,}05$.</p><p>$\beta_{x}$: $t=1{,}0086/0{,}3564=2{,}83$, $p=0{,}0152$ ⇒ se <strong>rechaza</strong> $H_0$: el término lineal es significativo.</p><p>$\beta_{x^2}$: $t=-0{,}0204/0{,}0088=-2{,}312$, $p=0{,}0393$ ⇒ se <strong>rechaza</strong> $H_0$: <strong>hay curvatura</strong>: la resistencia sube y luego baja con la concentración.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x}=\beta_{x^2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{38{,}94/2}{24{,}48/12}=9{,}54$ con $(2,12)$ gl; $F_{0{,}95;2,12}=3{,}885$ y $p=0{,}0033$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo explica la resistencia.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{38{,}94}{63{,}41}=0{,}614$: el modelo explica el <strong>61,4 %</strong> de la variabilidad de la resistencia a la compresión.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}614)\dfrac{14}{12}=0{,}5497$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}0959$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/15=0{,}4$; el mayor es $h_{2}=0{,}295$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{1}=0{,}344$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Falta de ajuste", puntos: 1, solucion: String.raw`<p>Como hay réplicas en cada la concentración, el error se separa en <strong>error puro</strong> (variación entre réplicas del mismo nivel) y <strong>falta de ajuste</strong> (lo que el modelo no captura de las medias).</p><p>$SC_{puro}=\sum(y_{ij}-\bar y_i)^2=24{,}37$ con $n-m=15-5=10$ gl; $SC_{FA}=SCE-SC_{puro}=24{,}48-24{,}37=0{,}1095$ con $12-10=2$ gl.</p><p>$H_0$: el modelo cuadrático es adecuado. $F_{FA}=\dfrac{0{,}1095/2}{24{,}37/10}=0{,}022$, $p=0{,}9778$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de falta de ajuste; el modelo describe bien la forma de la relación.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x", r: "cat({d <- data.frame(y = c(25.2, 27.3, 28.7, 29.8, 31.1, 27.8, 31.2, 32.6, 29.7, 31.7, 30.1, 32.3, 29.4, 30.8, 32.8), x = c(10, 10, 10, 15, 15, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30)); m <- lm(y ~ x + I(x^2), data = d); coef(m)[2]})", esperado: 1.0086, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(25.2, 27.3, 28.7, 29.8, 31.1, 27.8, 31.2, 32.6, 29.7, 31.7, 30.1, 32.3, 29.4, 30.8, 32.8), x = c(10, 10, 10, 15, 15, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$r.squared})", esperado: 0.614, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(25.2, 27.3, 28.7, 29.8, 31.1, 27.8, 31.2, 32.6, 29.7, 31.7, 30.1, 32.3, 29.4, 30.8, 32.8), x = c(10, 10, 10, 15, 15, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$fstatistic[1]})", esperado: 9.54, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.8 (p. 451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" },
      { id: "C8.2", loc: "slide 15" }
    ]
  },
  {
    id: "m26-d024",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.8 (p. 451)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.8 · Resistencia de una aleación: cuadrático y falta de ajuste (otra respuesta a 30)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.8 del libro de Walpole (9.ª ed.). Cambio respecto del original: a concentración 30 la resistencia fue 28,1; 29,5 y 30,2.</p><p>Datos codificados de la resistencia a la compresión $y$ de una aleación para distintas concentraciones $x$ de un aditivo (3 réplicas por concentración).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Concentración $x$</th><th>Resistencia $y$</th></tr></thead><tbody><tr><td>$10$</td><td>$25{,}2$</td></tr><tr><td>$10$</td><td>$27{,}3$</td></tr><tr><td>$10$</td><td>$28{,}7$</td></tr><tr><td>$15$</td><td>$29{,}8$</td></tr><tr><td>$15$</td><td>$31{,}1$</td></tr><tr><td>$15$</td><td>$27{,}8$</td></tr><tr><td>$20$</td><td>$31{,}2$</td></tr><tr><td>$20$</td><td>$32{,}6$</td></tr><tr><td>$20$</td><td>$29{,}7$</td></tr><tr><td>$25$</td><td>$31{,}7$</td></tr><tr><td>$25$</td><td>$30{,}1$</td></tr><tr><td>$25$</td><td>$32{,}3$</td></tr><tr><td>$30$</td><td>$28{,}1$</td></tr><tr><td>$30$</td><td>$29{,}5$</td></tr><tr><td>$30$</td><td>$30{,}2$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión cuadrática.</li><li>Pruebe la falta de ajuste del modelo.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(y = c(25.2, 27.3, 28.7, 29.8, 31.1, 27.8, 31.2, 32.6, 29.7, 31.7, 30.1, 32.3, 28.1, 29.5, 30.2), x = c(10, 10, 10, 15, 15, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
completo <- lm(y ~ factor(x), data = datos)   # una media por nivel: error puro
anova(modelo, completo)`,
    salidaR: `
Call:
lm(formula = y ~ x + I(x^2), data = datos)

Residuals:
     Min       1Q   Median       3Q      Max 
-2.02381 -1.13810  0.08762  1.01190  1.76762 

Coefficients:
             Estimate Std. Error t value Pr(>|t|)    
(Intercept) 16.606667   3.065260   5.418 0.000156 ***
x            1.335429   0.333345   4.006 0.001742 ** 
I(x^2)      -0.030286   0.008244  -3.674 0.003185 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 1.336 on 12 degrees of freedom
Multiple R-squared:  0.6245,	Adjusted R-squared:  0.562 
F-statistic:  9.98 on 2 and 12 DF,  p-value: 0.002802


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.93352, p-value = 0.3078

    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.295 0.295 0.295 0.124 0.124 0.124 0.162 0.162 0.162 0.124 0.124 0.124 0.295 
   14    15 
0.295 0.295 
    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.333 0.015 0.347 0.000 0.049 0.123 0.000 0.084 0.097 0.012 0.028 0.046 0.191 
   14    15 
0.001 0.069 
Analysis of Variance Table

Model 1: y ~ x + I(x^2)
Model 2: y ~ factor(x)
  Res.Df    RSS Df Sum of Sq      F Pr(>F)
1     12 21.408                           
2     10 20.813  2   0.59486 0.1429 0.8686`,
    salidaDe: `datos <- data.frame(y = c(25.2, 27.3, 28.7, 29.8, 31.1, 27.8, 31.2, 32.6, 29.7, 31.7, 30.1, 32.3, 28.1, 29.5, 30.2), x = c(10, 10, 10, 15, 15, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
completo <- lm(y ~ factor(x), data = datos)   # una media por nivel: error puro
anova(modelo, completo)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=16{,}61+1{,}335\,x-0{,}03029\,x^2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=16{,}61$: resistencia predicha sin aditivo; $x=0$ está fuera del rango (10–30), no se interpreta.</p><p>En un polinomio el efecto de $x$ <strong>no es un solo número</strong>: la pendiente cambia con $x$. Derivando: $\dfrac{\partial\hat y}{\partial x}=1{,}335429-2(0{,}03028571)x$.</p><p>En $x=15$: $\dfrac{\partial\hat y}{\partial x}=0{,}4269$ ⇒ ahí, un aumento de una unidad en la concentración aumenta la resistencia a la compresión en unas 0,427 unidades.</p><p>En $x=25$: $\dfrac{\partial\hat y}{\partial x}=-0{,}1789$ ⇒ ahí, un aumento de una unidad en la concentración disminuye la resistencia a la compresión en unas 0,179 unidades.</p><p>El signo de $b_2=-0{,}03028571$ dice la forma: negativo ⇒ parábola cóncava (rendimientos decrecientes, con un máximo); igualando la derivada a 0, el vértice está en $x^*=-\dfrac{b_1}{2b_2}=22{,}047$, dentro del rango observado.</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$16{,}61$</td><td>$3{,}065$</td><td>$5{,}418$</td><td>$0{,}0002$</td><td>Sí</td></tr><tr><td>$\beta_{x}$</td><td>$1{,}335$</td><td>$0{,}3333$</td><td>$4{,}006$</td><td>$0{,}0017$</td><td>Sí</td></tr><tr><td>$\beta_{x^2}$</td><td>$-0{,}03029$</td><td>$0{,}008244$</td><td>$-3{,}674$</td><td>$0{,}0032$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{12}$ ($n-k-1=15-2-1=12$ gl). Región crítica: $|t|>t_{0{,}975;12}=2{,}1788$, o bien $p<0{,}05$.</p><p>$\beta_{x}$: $t=1{,}3354/0{,}3333=4{,}006$, $p=0{,}0017$ ⇒ se <strong>rechaza</strong> $H_0$: el término lineal es significativo.</p><p>$\beta_{x^2}$: $t=-0{,}0303/0{,}0082=-3{,}674$, $p=0{,}0032$ ⇒ se <strong>rechaza</strong> $H_0$: <strong>hay curvatura</strong>: la resistencia sube y luego baja con la concentración.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x}=\beta_{x^2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{35{,}61/2}{21{,}41/12}=9{,}98$ con $(2,12)$ gl; $F_{0{,}95;2,12}=3{,}885$ y $p=0{,}0028$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo explica la resistencia.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{35{,}61}{57{,}02}=0{,}6245$: el modelo explica el <strong>62,5 %</strong> de la variabilidad de la resistencia a la compresión.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}6245)\dfrac{14}{12}=0{,}562$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}3078$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/15=0{,}4$; el mayor es $h_{2}=0{,}295$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{3}=0{,}347$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Falta de ajuste", puntos: 1, solucion: String.raw`<p>Como hay réplicas en cada la concentración, el error se separa en <strong>error puro</strong> (variación entre réplicas del mismo nivel) y <strong>falta de ajuste</strong> (lo que el modelo no captura de las medias).</p><p>$SC_{puro}=\sum(y_{ij}-\bar y_i)^2=20{,}81$ con $n-m=15-5=10$ gl; $SC_{FA}=SCE-SC_{puro}=21{,}41-20{,}81=0{,}5949$ con $12-10=2$ gl.</p><p>$H_0$: el modelo cuadrático es adecuado. $F_{FA}=\dfrac{0{,}5949/2}{20{,}81/10}=0{,}143$, $p=0{,}8686$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de falta de ajuste; el modelo describe bien la forma de la relación.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x", r: "cat({d <- data.frame(y = c(25.2, 27.3, 28.7, 29.8, 31.1, 27.8, 31.2, 32.6, 29.7, 31.7, 30.1, 32.3, 28.1, 29.5, 30.2), x = c(10, 10, 10, 15, 15, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30)); m <- lm(y ~ x + I(x^2), data = d); coef(m)[2]})", esperado: 1.3354, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(25.2, 27.3, 28.7, 29.8, 31.1, 27.8, 31.2, 32.6, 29.7, 31.7, 30.1, 32.3, 28.1, 29.5, 30.2), x = c(10, 10, 10, 15, 15, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$r.squared})", esperado: 0.6245, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(25.2, 27.3, 28.7, 29.8, 31.1, 27.8, 31.2, 32.6, 29.7, 31.7, 30.1, 32.3, 28.1, 29.5, 30.2), x = c(10, 10, 10, 15, 15, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$fstatistic[1]})", esperado: 9.98, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.8 (p. 451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" },
      { id: "C8.2", loc: "slide 15" }
    ]
  },
  {
    id: "m26-d025",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.8 (p. 451)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.8 · Resistencia de una aleación: cuadrático y falta de ajuste (2 réplicas)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.8 del libro de Walpole (9.ª ed.). Cambio respecto del original: solo 2 réplicas por concentración (se eliminó la tercera).</p><p>Datos codificados de la resistencia a la compresión $y$ de una aleación para distintas concentraciones $x$ de un aditivo (3 réplicas por concentración).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Concentración $x$</th><th>Resistencia $y$</th></tr></thead><tbody><tr><td>$10$</td><td>$25{,}2$</td></tr><tr><td>$10$</td><td>$27{,}3$</td></tr><tr><td>$15$</td><td>$29{,}8$</td></tr><tr><td>$15$</td><td>$31{,}1$</td></tr><tr><td>$20$</td><td>$31{,}2$</td></tr><tr><td>$20$</td><td>$32{,}6$</td></tr><tr><td>$25$</td><td>$31{,}7$</td></tr><tr><td>$25$</td><td>$30{,}1$</td></tr><tr><td>$30$</td><td>$29{,}4$</td></tr><tr><td>$30$</td><td>$30{,}8$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión cuadrática.</li><li>Pruebe la falta de ajuste del modelo.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(y = c(25.2, 27.3, 29.8, 31.1, 31.2, 32.6, 31.7, 30.1, 29.4, 30.8), x = c(10, 10, 15, 15, 20, 20, 25, 25, 30, 30))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
completo <- lm(y ~ factor(x), data = datos)   # una media por nivel: error puro
anova(modelo, completo)`,
    salidaR: `
Call:
lm(formula = y ~ x + I(x^2), data = datos)

Residuals:
     Min       1Q   Median       3Q      Max 
-1.52429 -0.46679 -0.05929  0.87321  1.10571 

Coefficients:
             Estimate Std. Error t value Pr(>|t|)   
(Intercept) 14.210000   3.039912   4.674  0.00228 **
x            1.585857   0.330588   4.797  0.00197 **
I(x^2)      -0.035571   0.008176  -4.351  0.00335 **
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 1.082 on 7 degrees of freedom
Multiple R-squared:  0.8123,	Adjusted R-squared:  0.7586 
F-statistic: 15.14 on 2 and 7 DF,  p-value: 0.002867


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.91153, p-value = 0.2917

    1     2     3     4     5     6     7     8     9    10 
0.443 0.443 0.186 0.186 0.243 0.243 0.186 0.186 0.443 0.443 
    1     2     3     4     5     6     7     8     9    10 
0.699 0.253 0.003 0.098 0.030 0.098 0.000 0.185 0.056 0.430 
Analysis of Variance Table

Model 1: y ~ x + I(x^2)
Model 2: y ~ factor(x)
  Res.Df    RSS Df Sum of Sq      F Pr(>F)
1      7 8.1883                           
2      5 6.2900  2    1.8983 0.7545 0.5172`,
    salidaDe: `datos <- data.frame(y = c(25.2, 27.3, 29.8, 31.1, 31.2, 32.6, 31.7, 30.1, 29.4, 30.8), x = c(10, 10, 15, 15, 20, 20, 25, 25, 30, 30))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
completo <- lm(y ~ factor(x), data = datos)   # una media por nivel: error puro
anova(modelo, completo)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=14{,}21+1{,}586\,x-0{,}03557\,x^2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=14{,}21$: resistencia predicha sin aditivo; $x=0$ está fuera del rango (10–30), no se interpreta.</p><p>En un polinomio el efecto de $x$ <strong>no es un solo número</strong>: la pendiente cambia con $x$. Derivando: $\dfrac{\partial\hat y}{\partial x}=1{,}585857-2(0{,}03557143)x$.</p><p>En $x=15$: $\dfrac{\partial\hat y}{\partial x}=0{,}5187$ ⇒ ahí, un aumento de una unidad en la concentración aumenta la resistencia a la compresión en unas 0,519 unidades.</p><p>En $x=25$: $\dfrac{\partial\hat y}{\partial x}=-0{,}1927$ ⇒ ahí, un aumento de una unidad en la concentración disminuye la resistencia a la compresión en unas 0,193 unidades.</p><p>El signo de $b_2=-0{,}03557143$ dice la forma: negativo ⇒ parábola cóncava (rendimientos decrecientes, con un máximo); igualando la derivada a 0, el vértice está en $x^*=-\dfrac{b_1}{2b_2}=22{,}291$, dentro del rango observado.</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$14{,}21$</td><td>$3{,}04$</td><td>$4{,}674$</td><td>$0{,}0023$</td><td>Sí</td></tr><tr><td>$\beta_{x}$</td><td>$1{,}586$</td><td>$0{,}3306$</td><td>$4{,}797$</td><td>$0{,}002$</td><td>Sí</td></tr><tr><td>$\beta_{x^2}$</td><td>$-0{,}03557$</td><td>$0{,}008176$</td><td>$-4{,}351$</td><td>$0{,}0034$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{7}$ ($n-k-1=10-2-1=7$ gl). Región crítica: $|t|>t_{0{,}975;7}=2{,}3646$, o bien $p<0{,}05$.</p><p>$\beta_{x}$: $t=1{,}5859/0{,}3306=4{,}797$, $p=0{,}002$ ⇒ se <strong>rechaza</strong> $H_0$: el término lineal es significativo.</p><p>$\beta_{x^2}$: $t=-0{,}0356/0{,}0082=-4{,}351$, $p=0{,}0034$ ⇒ se <strong>rechaza</strong> $H_0$: <strong>hay curvatura</strong>: la resistencia sube y luego baja con la concentración.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x}=\beta_{x^2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{35{,}43/2}{8{,}188/7}=15{,}14$ con $(2,7)$ gl; $F_{0{,}95;2,7}=4{,}737$ y $p=0{,}0029$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo explica la resistencia.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{35{,}43}{43{,}62}=0{,}8123$: el modelo explica el <strong>81,2 %</strong> de la variabilidad de la resistencia a la compresión.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}8123)\dfrac{9}{7}=0{,}7586$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}2917$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/10=0{,}6$; el mayor es $h_{2}=0{,}443$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{1}=0{,}699$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Falta de ajuste", puntos: 1, solucion: String.raw`<p>Como hay réplicas en cada la concentración, el error se separa en <strong>error puro</strong> (variación entre réplicas del mismo nivel) y <strong>falta de ajuste</strong> (lo que el modelo no captura de las medias).</p><p>$SC_{puro}=\sum(y_{ij}-\bar y_i)^2=6{,}29$ con $n-m=10-5=5$ gl; $SC_{FA}=SCE-SC_{puro}=8{,}188-6{,}29=1{,}898$ con $7-5=2$ gl.</p><p>$H_0$: el modelo cuadrático es adecuado. $F_{FA}=\dfrac{1{,}898/2}{6{,}29/5}=0{,}754$, $p=0{,}5172$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de falta de ajuste; el modelo describe bien la forma de la relación.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x", r: "cat({d <- data.frame(y = c(25.2, 27.3, 29.8, 31.1, 31.2, 32.6, 31.7, 30.1, 29.4, 30.8), x = c(10, 10, 15, 15, 20, 20, 25, 25, 30, 30)); m <- lm(y ~ x + I(x^2), data = d); coef(m)[2]})", esperado: 1.5859, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(25.2, 27.3, 29.8, 31.1, 31.2, 32.6, 31.7, 30.1, 29.4, 30.8), x = c(10, 10, 15, 15, 20, 20, 25, 25, 30, 30)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$r.squared})", esperado: 0.8123, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(25.2, 27.3, 29.8, 31.1, 31.2, 32.6, 31.7, 30.1, 29.4, 30.8), x = c(10, 10, 15, 15, 20, 20, 25, 25, 30, 30)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$fstatistic[1]})", esperado: 15.14, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.8 (p. 451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" },
      { id: "C8.2", loc: "slide 15" }
    ]
  },
  {
    id: "m26-d026",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO WALPOLE · Ej. 12.9 · Producto de una reacción: cuadrático",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO WALPOLE</strong> — Ej. 12.9 del libro de Walpole (9.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Producto $y$ (%) de una reacción química a distintas temperaturas $x$ (°C), 3 observaciones por temperatura (datos del ejemplo 11.8).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Temperatura $x$ (°C)</th><th>Producto $y$ (%)</th></tr></thead><tbody><tr><td>$150$</td><td>$77{,}4$</td></tr><tr><td>$150$</td><td>$76{,}7$</td></tr><tr><td>$150$</td><td>$78{,}2$</td></tr><tr><td>$200$</td><td>$84{,}1$</td></tr><tr><td>$200$</td><td>$84{,}5$</td></tr><tr><td>$200$</td><td>$83{,}7$</td></tr><tr><td>$250$</td><td>$88{,}9$</td></tr><tr><td>$250$</td><td>$89{,}2$</td></tr><tr><td>$250$</td><td>$89{,}7$</td></tr><tr><td>$300$</td><td>$94{,}8$</td></tr><tr><td>$300$</td><td>$94{,}7$</td></tr><tr><td>$300$</td><td>$95{,}9$</td></tr></tbody></table></div><ol type="a"><li>Ajuste $\mu_{Y|x}=\beta_0+\beta_1x+\beta_2x^2$.</li><li>Estime el producto para una temperatura de 225 °C.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 94.8, 94.7, 95.9), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x = 225)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x + I(x^2), data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-0.8433 -0.3417 -0.1067  0.4117  0.8767 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept)  5.646e+01  3.443e+00  16.397 5.19e-08 ***
x            1.525e-01  3.203e-02   4.762  0.00103 ** 
I(x^2)      -8.000e-05  7.083e-05  -1.130  0.28788    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.6134 on 9 degrees of freedom
Multiple R-squared:  0.9934,	Adjusted R-squared:  0.9919 
F-statistic: 677.4 on 2 and 9 DF,  p-value: 1.54e-10


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.95616, p-value = 0.7279

    1     2     3     4     5     6     7     8     9    10    11    12 
0.317 0.317 0.317 0.183 0.183 0.183 0.183 0.183 0.183 0.317 0.317 0.317 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.012 0.427 0.259 0.027 0.130 0.001 0.118 0.038 0.003 0.030 0.063 0.462 
       fit      lwr      upr
1 86.73333 86.09214 87.37452
       fit      lwr      upr
1 86.73333 85.20481 88.26186`,
    salidaDe: `datos <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 94.8, 94.7, 95.9), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x = 225)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=56{,}46+0{,}1525\,x-0{,}00008\,x^2$$</p><p>Coincide con el libro: $\hat y=56{,}4633+0{,}1525x-0{,}00008x^2$ y $\hat y(225)=86{,}7\,\%$.</p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=56{,}46$: producto predicho a 0 °C; fuera del rango (150–300 °C), no se interpreta.</p><p>En un polinomio el efecto de $x$ <strong>no es un solo número</strong>: la pendiente cambia con $x$. Derivando: $\dfrac{\partial\hat y}{\partial x}=0{,}152533-2(0{,}00008)x$.</p><p>En $x=200$: $\dfrac{\partial\hat y}{\partial x}=0{,}1205$ ⇒ ahí, un aumento de una unidad en la temperatura aumenta el producto de la reacción en unas 0,121 puntos porcentuales.</p><p>En $x=275$: $\dfrac{\partial\hat y}{\partial x}=0{,}1085$ ⇒ ahí, un aumento de una unidad en la temperatura aumenta el producto de la reacción en unas 0,109 puntos porcentuales.</p><p>El signo de $b_2=-0{,}00008$ dice la forma: negativo ⇒ parábola cóncava (rendimientos decrecientes, con un máximo); igualando la derivada a 0, el vértice está en $x^*=-\dfrac{b_1}{2b_2}=953{,}333$, fuera del rango observado (no se extrapola).</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$56{,}46$</td><td>$3{,}443$</td><td>$16{,}397$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x}$</td><td>$0{,}1525$</td><td>$0{,}03203$</td><td>$4{,}762$</td><td>$0{,}001$</td><td>Sí</td></tr><tr><td>$\beta_{x^2}$</td><td>$-0{,}00008$</td><td>$0{,}00007083$</td><td>$-1{,}13$</td><td>$0{,}2879$</td><td>No</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{9}$ ($n-k-1=12-2-1=9$ gl). Región crítica: $|t|>t_{0{,}975;9}=2{,}2622$, o bien $p<0{,}05$.</p><p>$\beta_{x}$: $t=0{,}1525/0{,}032=4{,}762$, $p=0{,}001$ ⇒ se <strong>rechaza</strong> $H_0$: el término lineal es significativo.</p><p>$\beta_{x^2}$: $t=-0{,}0001/0{,}0001=-1{,}13$, $p=0{,}2879$ ⇒ <strong>no se rechaza</strong> $H_0$: <strong>no hay evidencia de curvatura</strong>: el término cuadrático sobra y bastaría la recta (como concluye el ejemplo 11.8).</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x}=\beta_{x^2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{509{,}7/2}{3{,}386/9}=677{,}43$ con $(2,9)$ gl; $F_{0{,}95;2,9}=4{,}256$ y $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo explica el producto de la reacción.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{509{,}7}{513{,}1}=0{,}9934$: el modelo explica el <strong>99,34 %</strong> de la variabilidad del producto de la reacción.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}9934)\dfrac{11}{9}=0{,}9919$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}7279$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/12=0{,}5$; el mayor es $h_{3}=0{,}317$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{12}=0{,}462$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=56{,}4633+0{,}152533\cdot225-0{,}00008\cdot225^2=86{,}733$ puntos porcentuales.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[86{,}092;\ 87{,}375]$. Intervalo de <strong>predicción</strong> para un caso individual: $[85{,}205;\ 88{,}262]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x", r: "cat({d <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 94.8, 94.7, 95.9), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300)); m <- lm(y ~ x + I(x^2), data = d); coef(m)[2]})", esperado: 0.1525, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 94.8, 94.7, 95.9), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$r.squared})", esperado: 0.9934, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 94.8, 94.7, 95.9), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$fstatistic[1]})", esperado: 677.43, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 94.8, 94.7, 95.9), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300)); m <- lm(y ~ x + I(x^2), data = d); predict(m, data.frame(x = 225))})", esperado: 86.733, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.9 (p. 451) con datos del ejemplo 11.8 (p. 421)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d027",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.9 (p. 451) con datos del ejemplo 11.8 (p. 421)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.9 · Producto de una reacción: cuadrático (con 350 °C)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.9 del libro de Walpole (9.ª ed.). Cambio respecto del original: se agregó la temperatura 350 °C con productos 97,0; 96,5 y 97,6.</p><p>Producto $y$ (%) de una reacción química a distintas temperaturas $x$ (°C), 3 observaciones por temperatura (datos del ejemplo 11.8).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Temperatura $x$ (°C)</th><th>Producto $y$ (%)</th></tr></thead><tbody><tr><td>$150$</td><td>$77{,}4$</td></tr><tr><td>$150$</td><td>$76{,}7$</td></tr><tr><td>$150$</td><td>$78{,}2$</td></tr><tr><td>$200$</td><td>$84{,}1$</td></tr><tr><td>$200$</td><td>$84{,}5$</td></tr><tr><td>$200$</td><td>$83{,}7$</td></tr><tr><td>$250$</td><td>$88{,}9$</td></tr><tr><td>$250$</td><td>$89{,}2$</td></tr><tr><td>$250$</td><td>$89{,}7$</td></tr><tr><td>$300$</td><td>$94{,}8$</td></tr><tr><td>$300$</td><td>$94{,}7$</td></tr><tr><td>$300$</td><td>$95{,}9$</td></tr><tr><td>$350$</td><td>$97$</td></tr><tr><td>$350$</td><td>$96{,}5$</td></tr><tr><td>$350$</td><td>$97{,}6$</td></tr></tbody></table></div><ol type="a"><li>Ajuste $\mu_{Y|x}=\beta_0+\beta_1x+\beta_2x^2$.</li><li>Estime el producto para una temperatura de 225 °C.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 94.8, 94.7, 95.9, 97, 96.5, 97.6), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300, 350, 350, 350))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x = 225)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x + I(x^2), data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-0.9552 -0.5429 -0.1009  0.3757  1.6524 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept)  4.896e+01  2.828e+00  17.313 7.46e-10 ***
x            2.267e-01  2.393e-02   9.474 6.40e-07 ***
I(x^2)      -2.524e-04  4.752e-05  -5.311 0.000185 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.7699 on 12 degrees of freedom
Multiple R-squared:  0.9909,	Adjusted R-squared:  0.9894 
F-statistic: 652.7 on 2 and 12 DF,  p-value: 5.712e-13


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.95395, p-value = 0.5887

    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.295 0.295 0.295 0.124 0.124 0.124 0.162 0.162 0.162 0.124 0.124 0.124 0.295 
   14    15 
0.295 0.295 
    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.004 0.114 0.280 0.001 0.008 0.023 0.118 0.056 0.003 0.028 0.019 0.248 0.048 
   14    15 
0.258 0.016 
       fit      lwr      upr
1 87.18583 86.54069 87.83098
       fit     lwr      upr
1 87.18583 85.3886 88.98306`,
    salidaDe: `datos <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 94.8, 94.7, 95.9, 97, 96.5, 97.6), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300, 350, 350, 350))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x = 225)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=48{,}96+0{,}2267\,x-0{,}0002524\,x^2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=48{,}96$: producto predicho a 0 °C; fuera del rango (150–350 °C), no se interpreta.</p><p>En un polinomio el efecto de $x$ <strong>no es un solo número</strong>: la pendiente cambia con $x$. Derivando: $\dfrac{\partial\hat y}{\partial x}=0{,}226657-2(0{,}00025238)x$.</p><p>En $x=200$: $\dfrac{\partial\hat y}{\partial x}=0{,}1257$ ⇒ ahí, un aumento de una unidad en la temperatura aumenta el producto de la reacción en unas 0,126 puntos porcentuales.</p><p>En $x=275$: $\dfrac{\partial\hat y}{\partial x}=0{,}0878$ ⇒ ahí, un aumento de una unidad en la temperatura aumenta el producto de la reacción en unas 0,088 puntos porcentuales.</p><p>El signo de $b_2=-0{,}00025238$ dice la forma: negativo ⇒ parábola cóncava (rendimientos decrecientes, con un máximo); igualando la derivada a 0, el vértice está en $x^*=-\dfrac{b_1}{2b_2}=449{,}038$, fuera del rango observado (no se extrapola).</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$48{,}96$</td><td>$2{,}828$</td><td>$17{,}313$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x}$</td><td>$0{,}2267$</td><td>$0{,}02393$</td><td>$9{,}474$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x^2}$</td><td>$-0{,}0002524$</td><td>$0{,}00004752$</td><td>$-5{,}311$</td><td>$0{,}0002$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{12}$ ($n-k-1=15-2-1=12$ gl). Región crítica: $|t|>t_{0{,}975;12}=2{,}1788$, o bien $p<0{,}05$.</p><p>$\beta_{x}$: $t=0{,}2267/0{,}0239=9{,}474$, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: el término lineal es significativo.</p><p>$\beta_{x^2}$: $t=-0{,}0003/0=-5{,}311$, $p=0{,}0002$ ⇒ se <strong>rechaza</strong> $H_0$: <strong>hay curvatura</strong>.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x}=\beta_{x^2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{773{,}7/2}{7{,}113/12}=652{,}69$ con $(2,12)$ gl; $F_{0{,}95;2,12}=3{,}885$ y $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo explica el producto de la reacción.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{773{,}7}{780{,}8}=0{,}9909$: el modelo explica el <strong>99,09 %</strong> de la variabilidad del producto de la reacción.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}9909)\dfrac{14}{12}=0{,}9894$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}5887$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/15=0{,}4$; el mayor es $h_{1}=0{,}295$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{3}=0{,}28$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=48{,}9648+0{,}226657\cdot225-0{,}000252\cdot225^2=87{,}186$ puntos porcentuales.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[86{,}541;\ 87{,}831]$. Intervalo de <strong>predicción</strong> para un caso individual: $[85{,}389;\ 88{,}983]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x", r: "cat({d <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 94.8, 94.7, 95.9, 97, 96.5, 97.6), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300, 350, 350, 350)); m <- lm(y ~ x + I(x^2), data = d); coef(m)[2]})", esperado: 0.2267, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 94.8, 94.7, 95.9, 97, 96.5, 97.6), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300, 350, 350, 350)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$r.squared})", esperado: 0.9909, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 94.8, 94.7, 95.9, 97, 96.5, 97.6), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300, 350, 350, 350)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$fstatistic[1]})", esperado: 652.69, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 94.8, 94.7, 95.9, 97, 96.5, 97.6), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300, 350, 350, 350)); m <- lm(y ~ x + I(x^2), data = d); predict(m, data.frame(x = 225))})", esperado: 87.186, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.9 (p. 451) con datos del ejemplo 11.8 (p. 421)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d028",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.9 (p. 451) con datos del ejemplo 11.8 (p. 421)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.9 · Producto de una reacción: cuadrático (300 °C corregido)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.9 del libro de Walpole (9.ª ed.). Cambio respecto del original: a 300 °C el producto fue 93,8; 94,0 y 94,9 (en vez de 94,8; 94,7 y 95,9).</p><p>Producto $y$ (%) de una reacción química a distintas temperaturas $x$ (°C), 3 observaciones por temperatura (datos del ejemplo 11.8).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Temperatura $x$ (°C)</th><th>Producto $y$ (%)</th></tr></thead><tbody><tr><td>$150$</td><td>$77{,}4$</td></tr><tr><td>$150$</td><td>$76{,}7$</td></tr><tr><td>$150$</td><td>$78{,}2$</td></tr><tr><td>$200$</td><td>$84{,}1$</td></tr><tr><td>$200$</td><td>$84{,}5$</td></tr><tr><td>$200$</td><td>$83{,}7$</td></tr><tr><td>$250$</td><td>$88{,}9$</td></tr><tr><td>$250$</td><td>$89{,}2$</td></tr><tr><td>$250$</td><td>$89{,}7$</td></tr><tr><td>$300$</td><td>$93{,}8$</td></tr><tr><td>$300$</td><td>$94$</td></tr><tr><td>$300$</td><td>$94{,}9$</td></tr></tbody></table></div><ol type="a"><li>Ajuste $\mu_{Y|x}=\beta_0+\beta_1x+\beta_2x^2$.</li><li>Estime el producto para una temperatura de 250 °C.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 93.8, 94, 94.9), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x = 250)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x + I(x^2), data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-0.7983 -0.2883 -0.1333  0.3275  0.7317 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept) 53.1783333  3.0825760  17.251 3.33e-08 ***
x            0.1876333  0.0286721   6.544 0.000106 ***
I(x^2)      -0.0001700  0.0000634  -2.681 0.025155 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.5491 on 9 degrees of freedom
Multiple R-squared:  0.9942,	Adjusted R-squared:  0.9929 
F-statistic: 771.7 on 2 and 9 DF,  p-value: 8.603e-11


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.94602, p-value = 0.5797

    1     2     3     4     5     6     7     8     9    10    11    12 
0.317 0.317 0.317 0.183 0.183 0.183 0.183 0.183 0.183 0.317 0.317 0.317 
    1     2     3     4     5     6     7     8     9    10    11    12 
0.007 0.478 0.369 0.012 0.108 0.013 0.096 0.021 0.017 0.102 0.021 0.401 
       fit      lwr      upr
1 89.46167 88.92982 89.99351
       fit      lwr      upr
1 89.46167 88.11047 90.81287`,
    salidaDe: `datos <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 93.8, 94, 94.9), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300))
modelo <- lm(y ~ x + I(x^2), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x = 250)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=53{,}18+0{,}1876\,x-0{,}00017\,x^2$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=53{,}18$: producto predicho a 0 °C; fuera del rango (150–300 °C), no se interpreta.</p><p>En un polinomio el efecto de $x$ <strong>no es un solo número</strong>: la pendiente cambia con $x$. Derivando: $\dfrac{\partial\hat y}{\partial x}=0{,}187633-2(0{,}00017)x$.</p><p>En $x=200$: $\dfrac{\partial\hat y}{\partial x}=0{,}1196$ ⇒ ahí, un aumento de una unidad en la temperatura aumenta el producto de la reacción en unas 0,12 puntos porcentuales.</p><p>En $x=275$: $\dfrac{\partial\hat y}{\partial x}=0{,}0941$ ⇒ ahí, un aumento de una unidad en la temperatura aumenta el producto de la reacción en unas 0,094 puntos porcentuales.</p><p>El signo de $b_2=-0{,}00017$ dice la forma: negativo ⇒ parábola cóncava (rendimientos decrecientes, con un máximo); igualando la derivada a 0, el vértice está en $x^*=-\dfrac{b_1}{2b_2}=551{,}863$, fuera del rango observado (no se extrapola).</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$53{,}18$</td><td>$3{,}083$</td><td>$17{,}251$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x}$</td><td>$0{,}1876$</td><td>$0{,}02867$</td><td>$6{,}544$</td><td>$0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x^2}$</td><td>$-0{,}00017$</td><td>$0{,}0000634$</td><td>$-2{,}681$</td><td>$0{,}0252$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{9}$ ($n-k-1=12-2-1=9$ gl). Región crítica: $|t|>t_{0{,}975;9}=2{,}2622$, o bien $p<0{,}05$.</p><p>$\beta_{x}$: $t=0{,}1876/0{,}0287=6{,}544$, $p=0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: el término lineal es significativo.</p><p>$\beta_{x^2}$: $t=-0{,}0002/0{,}0001=-2{,}681$, $p=0{,}0252$ ⇒ se <strong>rechaza</strong> $H_0$: <strong>hay curvatura</strong>.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x}=\beta_{x^2}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{465{,}3/2}{2{,}714/9}=771{,}67$ con $(2,9)$ gl; $F_{0{,}95;2,9}=4{,}256$ y $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo explica el producto de la reacción.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{465{,}3}{468}=0{,}9942$: el modelo explica el <strong>99,42 %</strong> de la variabilidad del producto de la reacción.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}9942)\dfrac{11}{9}=0{,}9929$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}5797$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/12=0{,}5$; el mayor es $h_{3}=0{,}317$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{2}=0{,}478$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=53{,}1783+0{,}187633\cdot250-0{,}00017\cdot250^2=89{,}462$ puntos porcentuales.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[88{,}93;\ 89{,}994]$. Intervalo de <strong>predicción</strong> para un caso individual: $[88{,}11;\ 90{,}813]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x", r: "cat({d <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 93.8, 94, 94.9), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300)); m <- lm(y ~ x + I(x^2), data = d); coef(m)[2]})", esperado: 0.1876, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 93.8, 94, 94.9), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$r.squared})", esperado: 0.9942, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 93.8, 94, 94.9), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300)); m <- lm(y ~ x + I(x^2), data = d); summary(m)$fstatistic[1]})", esperado: 771.67, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(y = c(77.4, 76.7, 78.2, 84.1, 84.5, 83.7, 88.9, 89.2, 89.7, 93.8, 94, 94.9), x = c(150, 150, 150, 200, 200, 200, 250, 250, 250, 300, 300, 300)); m <- lm(y ~ x + I(x^2), data = d); predict(m, data.frame(x = 250))})", esperado: 89.462, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.9 (p. 451) con datos del ejemplo 11.8 (p. 421)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d029",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 3,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO WALPOLE · Ej. 12.10 · Modelo cúbico",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO WALPOLE</strong> — Ej. 12.10 del libro de Walpole (9.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Para los datos siguientes ajuste el modelo cúbico $\mu_{Y|x}=\beta_0+\beta_1x+\beta_2x^2+\beta_3x^3$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x$</th><th>$y$</th></tr></thead><tbody><tr><td>$0$</td><td>$1$</td></tr><tr><td>$1$</td><td>$4$</td></tr><tr><td>$2$</td><td>$5$</td></tr><tr><td>$3$</td><td>$3$</td></tr><tr><td>$4$</td><td>$2$</td></tr><tr><td>$5$</td><td>$3$</td></tr><tr><td>$6$</td><td>$4$</td></tr></tbody></table></div><ol type="a"><li>Ajuste el modelo cúbico.</li><li>Prediga el valor de $Y$ cuando $x=2$.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(y = c(1, 4, 5, 3, 2, 3, 4), x = c(0, 1, 2, 3, 4, 5, 6))
modelo <- lm(y ~ x + I(x^2) + I(x^3), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x = 2)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x + I(x^2) + I(x^3), data = datos)

Residuals:
       1        2        3        4        5        6        7 
-0.07143 -0.02381  0.54762 -0.52381 -0.40476  0.73810 -0.26190 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)  
(Intercept)  1.07143    0.64813   1.653   0.1969  
x            4.60317    1.02361   4.497   0.0205 *
I(x^2)      -1.84524    0.41836  -4.411   0.0216 *
I(x^3)       0.19444    0.04576   4.249   0.0239 *
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.6726 on 3 degrees of freedom
Multiple R-squared:  0.875,	Adjusted R-squared:   0.75 
F-statistic:     7 on 3 and 3 DF,  p-value: 0.07215


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.9054, p-value = 0.365

    1     2     3     4     5     6     7 
0.929 0.452 0.452 0.333 0.452 0.452 0.929 
    1     2     3     4     5     6     7 
0.513 0.000 0.250 0.114 0.137 0.454 6.899 
       fit      lwr      upr
1 4.452381 3.012703 5.892059
       fit      lwr      upr
1 4.452381 1.872774 7.031988`,
    salidaDe: `datos <- data.frame(y = c(1, 4, 5, 3, 2, 3, 4), x = c(0, 1, 2, 3, 4, 5, 6))
modelo <- lm(y ~ x + I(x^2) + I(x^3), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x = 2)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=1{,}071+4{,}603\,x-1{,}845\,x^2+0{,}1944\,x^3$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=1{,}071$: valor predicho en $x=0$ (sí está en el rango de los datos).</p><p>En un polinomio el efecto de $x$ <strong>no es un solo número</strong>: la pendiente cambia con $x$. Derivando: $\dfrac{\partial\hat y}{\partial x}=4{,}603175-2(1{,}8452381)x+3(0{,}194444)x^2$.</p><p>En $x=1$: $\dfrac{\partial\hat y}{\partial x}=1{,}496$ ⇒ ahí, un aumento de una unidad en $x$ aumenta $y$ en unas 1,496 unidades.</p><p>En $x=5$: $\dfrac{\partial\hat y}{\partial x}=0{,}7341$ ⇒ ahí, un aumento de una unidad en $x$ aumenta $y$ en unas 0,734 unidades.</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$1{,}071$</td><td>$0{,}6481$</td><td>$1{,}653$</td><td>$0{,}1969$</td><td>No</td></tr><tr><td>$\beta_{x}$</td><td>$4{,}603$</td><td>$1{,}024$</td><td>$4{,}497$</td><td>$0{,}0205$</td><td>Sí</td></tr><tr><td>$\beta_{x^2}$</td><td>$-1{,}845$</td><td>$0{,}4184$</td><td>$-4{,}411$</td><td>$0{,}0216$</td><td>Sí</td></tr><tr><td>$\beta_{x^3}$</td><td>$0{,}1944$</td><td>$0{,}04576$</td><td>$4{,}249$</td><td>$0{,}0239$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{3}$ ($n-k-1=7-3-1=3$ gl). Región crítica: $|t|>t_{0{,}975;3}=3{,}1824$, o bien $p<0{,}05$.</p><p>$\beta_{x}$: $t=4{,}6032/1{,}0236=4{,}497$, $p=0{,}0205$ ⇒ se <strong>rechaza</strong> $H_0$: el término lineal es significativo.</p><p>$\beta_{x^2}$: $t=-1{,}8452/0{,}4184=-4{,}411$, $p=0{,}0216$ ⇒ se <strong>rechaza</strong> $H_0$: el término cuadrático es significativo.</p><p>$\beta_{x^3}$: $t=0{,}1944/0{,}0458=4{,}249$, $p=0{,}0239$ ⇒ se <strong>rechaza</strong> $H_0$: el término cúbico es significativo: la curva cambia de concavidad.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x}=\beta_{x^2}=\beta_{x^3}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{9{,}5/3}{1{,}357/3}=7$ con $(3,3)$ gl; $F_{0{,}95;3,3}=9{,}277$ y $p=0{,}0721$ ⇒ <strong>no se rechaza</strong> $H_0$. Con $n=7$ y 4 parámetros, el $F$ global no alcanza a ser significativo al 5 %, aunque cada término lo sea por separado: hay muy pocos grados de libertad para el error.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{9{,}5}{10{,}86}=0{,}875$: el modelo explica el <strong>87,5 %</strong> de la variabilidad de $y$.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}875)\dfrac{6}{3}=0{,}75$. Baja bastante respecto del $R^2$: con $n=7$ y 3 regresores, parte del $R^2$ se debe solo a haber agregado variables. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}365$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot4/7=1{,}143$; el mayor es $h_{1}=0{,}929$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{7}=6{,}899$ ⇒ la observación 7 es influyente: si se quitara, los coeficientes cambiarían bastante. No se elimina automáticamente; primero se revisa si es un error de registro.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=1{,}0714+4{,}603175\cdot2-1{,}845238\cdot2^2+0{,}194444\cdot2^3=4{,}452$ unidades.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[3{,}013;\ 5{,}892]$. Intervalo de <strong>predicción</strong> para un caso individual: $[1{,}873;\ 7{,}032]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x", r: "cat({d <- data.frame(y = c(1, 4, 5, 3, 2, 3, 4), x = c(0, 1, 2, 3, 4, 5, 6)); m <- lm(y ~ x + I(x^2) + I(x^3), data = d); coef(m)[2]})", esperado: 4.6032, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(1, 4, 5, 3, 2, 3, 4), x = c(0, 1, 2, 3, 4, 5, 6)); m <- lm(y ~ x + I(x^2) + I(x^3), data = d); summary(m)$r.squared})", esperado: 0.875, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(1, 4, 5, 3, 2, 3, 4), x = c(0, 1, 2, 3, 4, 5, 6)); m <- lm(y ~ x + I(x^2) + I(x^3), data = d); summary(m)$fstatistic[1]})", esperado: 7, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(y = c(1, 4, 5, 3, 2, 3, 4), x = c(0, 1, 2, 3, 4, 5, 6)); m <- lm(y ~ x + I(x^2) + I(x^3), data = d); predict(m, data.frame(x = 2))})", esperado: 4.452, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.10 (p. 451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d030",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.10 (p. 451)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.10 · Modelo cúbico (y₇ = 5)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.10 del libro de Walpole (9.ª ed.). Cambio respecto del original: el último dato es $y=5$ (en vez de 4).</p><p>Para los datos siguientes ajuste el modelo cúbico $\mu_{Y|x}=\beta_0+\beta_1x+\beta_2x^2+\beta_3x^3$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x$</th><th>$y$</th></tr></thead><tbody><tr><td>$0$</td><td>$1$</td></tr><tr><td>$1$</td><td>$4$</td></tr><tr><td>$2$</td><td>$5$</td></tr><tr><td>$3$</td><td>$3$</td></tr><tr><td>$4$</td><td>$2$</td></tr><tr><td>$5$</td><td>$3$</td></tr><tr><td>$6$</td><td>$5$</td></tr></tbody></table></div><ol type="a"><li>Ajuste el modelo cúbico.</li><li>Prediga el valor de $Y$ cuando $x=2$.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(x = c(0, 1, 2, 3, 4, 5, 6), y = c(1, 4, 5, 3, 2, 3, 5))
modelo <- lm(y ~ x + I(x^2) + I(x^3), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x = 2)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x + I(x^2) + I(x^3), data = datos)

Residuals:
       1        2        3        4        5        6        7 
-0.02381 -0.11905  0.52381 -0.42857 -0.30952  0.54762 -0.19048 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)   
(Intercept)  1.02381    0.52919   1.935  0.14849   
x            4.90873    0.83577   5.873  0.00985 **
I(x^2)      -2.03571    0.34159  -5.959  0.00945 **
I(x^3)       0.22222    0.03737   5.947  0.00951 **
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.5492 on 3 degrees of freedom
Multiple R-squared:  0.9326,	Adjusted R-squared:  0.8652 
F-statistic: 13.84 on 3 and 3 DF,  p-value: 0.02908


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.86432, p-value = 0.1654

    1     2     3     4     5     6     7 
0.929 0.452 0.452 0.333 0.452 0.452 0.929 
    1     2     3     4     5     6     7 
0.086 0.018 0.343 0.114 0.120 0.375 5.474 
      fit      lwr      upr
1 4.47619 3.300698 5.651683
      fit     lwr      upr
1 4.47619 2.36995 6.582431`,
    salidaDe: `datos <- data.frame(x = c(0, 1, 2, 3, 4, 5, 6), y = c(1, 4, 5, 3, 2, 3, 5))
modelo <- lm(y ~ x + I(x^2) + I(x^3), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x = 2)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=1{,}024+4{,}909\,x-2{,}036\,x^2+0{,}2222\,x^3$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=1{,}024$: valor predicho en $x=0$ (sí está en el rango de los datos).</p><p>En un polinomio el efecto de $x$ <strong>no es un solo número</strong>: la pendiente cambia con $x$. Derivando: $\dfrac{\partial\hat y}{\partial x}=4{,}90873-2(2{,}03571429)x+3(0{,}222222)x^2$.</p><p>En $x=1$: $\dfrac{\partial\hat y}{\partial x}=1{,}504$ ⇒ ahí, un aumento de una unidad en $x$ aumenta $y$ en unas 1,504 unidades.</p><p>En $x=5$: $\dfrac{\partial\hat y}{\partial x}=1{,}2183$ ⇒ ahí, un aumento de una unidad en $x$ aumenta $y$ en unas 1,218 unidades.</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$1{,}024$</td><td>$0{,}5292$</td><td>$1{,}935$</td><td>$0{,}1485$</td><td>No</td></tr><tr><td>$\beta_{x}$</td><td>$4{,}909$</td><td>$0{,}8358$</td><td>$5{,}873$</td><td>$0{,}0098$</td><td>Sí</td></tr><tr><td>$\beta_{x^2}$</td><td>$-2{,}036$</td><td>$0{,}3416$</td><td>$-5{,}959$</td><td>$0{,}0095$</td><td>Sí</td></tr><tr><td>$\beta_{x^3}$</td><td>$0{,}2222$</td><td>$0{,}03737$</td><td>$5{,}947$</td><td>$0{,}0095$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{3}$ ($n-k-1=7-3-1=3$ gl). Región crítica: $|t|>t_{0{,}975;3}=3{,}1824$, o bien $p<0{,}05$.</p><p>$\beta_{x}$: $t=4{,}9087/0{,}8358=5{,}873$, $p=0{,}0098$ ⇒ se <strong>rechaza</strong> $H_0$: el término lineal es significativo.</p><p>$\beta_{x^2}$: $t=-2{,}0357/0{,}3416=-5{,}959$, $p=0{,}0095$ ⇒ se <strong>rechaza</strong> $H_0$: el término cuadrático es significativo.</p><p>$\beta_{x^3}$: $t=0{,}2222/0{,}0374=5{,}947$, $p=0{,}0095$ ⇒ se <strong>rechaza</strong> $H_0$: el término cúbico es significativo: la curva cambia de concavidad.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x}=\beta_{x^2}=\beta_{x^3}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{12{,}52/3}{0{,}9048/3}=13{,}84$ con $(3,3)$ gl; $F_{0{,}95;3,3}=9{,}277$ y $p=0{,}0291$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo cúbico explica $y$.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{12{,}52}{13{,}43}=0{,}9326$: el modelo explica el <strong>93,3 %</strong> de la variabilidad de $y$.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}9326)\dfrac{6}{3}=0{,}8652$. Está cerca del $R^2$: los 3 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}1654$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot4/7=1{,}143$; el mayor es $h_{1}=0{,}929$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{7}=5{,}474$ ⇒ la observación 7 es influyente: si se quitara, los coeficientes cambiarían bastante. No se elimina automáticamente; primero se revisa si es un error de registro.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=1{,}0238+4{,}90873\cdot2-2{,}035714\cdot2^2+0{,}222222\cdot2^3=4{,}476$ unidades.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[3{,}301;\ 5{,}652]$. Intervalo de <strong>predicción</strong> para un caso individual: $[2{,}37;\ 6{,}582]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x", r: "cat({d <- data.frame(x = c(0, 1, 2, 3, 4, 5, 6), y = c(1, 4, 5, 3, 2, 3, 5)); m <- lm(y ~ x + I(x^2) + I(x^3), data = d); coef(m)[2]})", esperado: 4.9087, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(x = c(0, 1, 2, 3, 4, 5, 6), y = c(1, 4, 5, 3, 2, 3, 5)); m <- lm(y ~ x + I(x^2) + I(x^3), data = d); summary(m)$r.squared})", esperado: 0.9326, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(x = c(0, 1, 2, 3, 4, 5, 6), y = c(1, 4, 5, 3, 2, 3, 5)); m <- lm(y ~ x + I(x^2) + I(x^3), data = d); summary(m)$fstatistic[1]})", esperado: 13.84, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(x = c(0, 1, 2, 3, 4, 5, 6), y = c(1, 4, 5, 3, 2, 3, 5)); m <- lm(y ~ x + I(x^2) + I(x^3), data = d); predict(m, data.frame(x = 2))})", esperado: 4.476, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.10 (p. 451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d031",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c07",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.10 (p. 451)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.10 · Modelo cúbico (otros datos)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.10 del libro de Walpole (9.ª ed.). Cambio respecto del original: los datos son y = 2, 4, 6, 4, 2, 3, 5 y se predice en x = 4.</p><p>Para los datos siguientes ajuste el modelo cúbico $\mu_{Y|x}=\beta_0+\beta_1x+\beta_2x^2+\beta_3x^3$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x$</th><th>$y$</th></tr></thead><tbody><tr><td>$0$</td><td>$2$</td></tr><tr><td>$1$</td><td>$4$</td></tr><tr><td>$2$</td><td>$6$</td></tr><tr><td>$3$</td><td>$4$</td></tr><tr><td>$4$</td><td>$2$</td></tr><tr><td>$5$</td><td>$3$</td></tr><tr><td>$6$</td><td>$5$</td></tr></tbody></table></div><ol type="a"><li>Ajuste el modelo cúbico.</li><li>Prediga el valor de $Y$ cuando $x=4$.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema, incluyendo $\partial y/\partial x$.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `datos <- data.frame(x = c(0, 1, 2, 3, 4, 5, 6), y = c(2, 4, 6, 4, 2, 3, 5))
modelo <- lm(y ~ x + I(x^2) + I(x^3), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x = 4)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    salidaR: `
Call:
lm(formula = y ~ x + I(x^2) + I(x^3), data = datos)

Residuals:
       1        2        3        4        5        6        7 
 0.23810 -0.83333  0.88095  0.04762 -0.66667  0.40476 -0.07143 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)  
(Intercept)  1.76190    0.81441   2.163   0.1192  
x            4.90873    1.28623   3.816   0.0317 *
I(x^2)      -2.05952    0.52570  -3.918   0.0296 *
I(x^3)       0.22222    0.05751   3.864   0.0306 *
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.8452 on 3 degrees of freedom
Multiple R-squared:  0.8404,	Adjusted R-squared:  0.6809 
F-statistic: 5.267 on 3 and 3 DF,  p-value: 0.1029


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.96302, p-value = 0.8442

    1     2     3     4     5     6     7 
0.929 0.452 0.452 0.333 0.452 0.452 0.929 
    1     2     3     4     5     6     7 
3.611 0.367 0.410 0.001 0.235 0.086 0.325 
       fit       lwr      upr
1 2.666667 0.8576223 4.475711
       fit        lwr      upr
1 2.666667 -0.5747685 5.908102`,
    salidaDe: `datos <- data.frame(x = c(0, 1, 2, 3, 4, 5, 6), y = c(2, 4, 6, 4, 2, 3, 5))
modelo <- lm(y ~ x + I(x^2) + I(x^3), data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
nuevo <- data.frame(x = 4)
predict(modelo, nuevo, interval = "confidence")
predict(modelo, nuevo, interval = "prediction")`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=1{,}762+4{,}909\,x-2{,}06\,x^2+0{,}2222\,x^3$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes y de ∂y/∂x", puntos: 1, solucion: String.raw`<p>$b_0=1{,}762$: valor predicho en $x=0$ (sí está en el rango de los datos).</p><p>En un polinomio el efecto de $x$ <strong>no es un solo número</strong>: la pendiente cambia con $x$. Derivando: $\dfrac{\partial\hat y}{\partial x}=4{,}90873-2(2{,}05952381)x+3(0{,}222222)x^2$.</p><p>En $x=1$: $\dfrac{\partial\hat y}{\partial x}=1{,}4563$ ⇒ ahí, un aumento de una unidad en $x$ aumenta $y$ en unas 1,456 unidades.</p><p>En $x=5$: $\dfrac{\partial\hat y}{\partial x}=0{,}9802$ ⇒ ahí, un aumento de una unidad en $x$ aumenta $y$ en unas 0,98 unidades.</p>` },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$1{,}762$</td><td>$0{,}8144$</td><td>$2{,}163$</td><td>$0{,}1192$</td><td>No</td></tr><tr><td>$\beta_{x}$</td><td>$4{,}909$</td><td>$1{,}286$</td><td>$3{,}816$</td><td>$0{,}0317$</td><td>Sí</td></tr><tr><td>$\beta_{x^2}$</td><td>$-2{,}06$</td><td>$0{,}5257$</td><td>$-3{,}918$</td><td>$0{,}0296$</td><td>Sí</td></tr><tr><td>$\beta_{x^3}$</td><td>$0{,}2222$</td><td>$0{,}05751$</td><td>$3{,}864$</td><td>$0{,}0306$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{3}$ ($n-k-1=7-3-1=3$ gl). Región crítica: $|t|>t_{0{,}975;3}=3{,}1824$, o bien $p<0{,}05$.</p><p>$\beta_{x}$: $t=4{,}9087/1{,}2862=3{,}816$, $p=0{,}0317$ ⇒ se <strong>rechaza</strong> $H_0$: el término lineal es significativo.</p><p>$\beta_{x^2}$: $t=-2{,}0595/0{,}5257=-3{,}918$, $p=0{,}0296$ ⇒ se <strong>rechaza</strong> $H_0$: el término cuadrático es significativo.</p><p>$\beta_{x^3}$: $t=0{,}2222/0{,}0575=3{,}864$, $p=0{,}0306$ ⇒ se <strong>rechaza</strong> $H_0$: el término cúbico es significativo: la curva cambia de concavidad.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x}=\beta_{x^2}=\beta_{x^3}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{11{,}29/3}{2{,}143/3}=5{,}27$ con $(3,3)$ gl; $F_{0{,}95;3,3}=9{,}277$ y $p=0{,}1029$ ⇒ <strong>no se rechaza</strong> $H_0$. Con $n=7$ y 4 parámetros, el $F$ global no alcanza a ser significativo al 5 %, aunque cada término lo sea por separado: hay muy pocos grados de libertad para el error.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{11{,}29}{13{,}43}=0{,}8404$: el modelo explica el <strong>84 %</strong> de la variabilidad de $y$.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}8404)\dfrac{6}{3}=0{,}6809$. Baja bastante respecto del $R^2$: con $n=7$ y 3 regresores, parte del $R^2$ se debe solo a haber agregado variables. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}8442$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p>(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot4/7=1{,}143$; el mayor es $h_{1}=0{,}929$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{1}=3{,}611$ ⇒ la observación 1 es influyente: si se quitara, los coeficientes cambiarían bastante. No se elimina automáticamente; primero se revisa si es un error de registro.</p>` },
      { titulo: "f) Predicción", puntos: 1, solucion: String.raw`<p>$\hat y=1{,}7619+4{,}90873\cdot4-2{,}059524\cdot4^2+0{,}222222\cdot4^3=2{,}667$ unidades.</p><p>Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[0{,}858;\ 4{,}476]$. Intervalo de <strong>predicción</strong> para un caso individual: $[-0{,}575;\ 5{,}908]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.</p><p></p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x", r: "cat({d <- data.frame(x = c(0, 1, 2, 3, 4, 5, 6), y = c(2, 4, 6, 4, 2, 3, 5)); m <- lm(y ~ x + I(x^2) + I(x^3), data = d); coef(m)[2]})", esperado: 4.9087, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(x = c(0, 1, 2, 3, 4, 5, 6), y = c(2, 4, 6, 4, 2, 3, 5)); m <- lm(y ~ x + I(x^2) + I(x^3), data = d); summary(m)$r.squared})", esperado: 0.8404, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(x = c(0, 1, 2, 3, 4, 5, 6), y = c(2, 4, 6, 4, 2, 3, 5)); m <- lm(y ~ x + I(x^2) + I(x^3), data = d); summary(m)$fstatistic[1]})", esperado: 5.27, tol: 0.0050000010000000004 },
      { que: "pred", r: "cat({d <- data.frame(x = c(0, 1, 2, 3, 4, 5, 6), y = c(2, 4, 6, 4, 2, 3, 5)); m <- lm(y ~ x + I(x^2) + I(x^3), data = d); predict(m, data.frame(x = 4))})", esperado: 2.667, tol: 0.000500001 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.10 (p. 451)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d032",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c10",
    dificultad: 3,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO WALPOLE · Ej. 12.11 · Peso de calamares: multicolinealidad",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO WALPOLE</strong> — Ej. 12.11 del libro de Walpole (9.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Se estudió el peso $y$ (lb) de calamares a partir de medidas de la boca: $x_1$ longitud del rostral, $x_2$ longitud de la aleta, $x_3$ rostral a la cola, $x_4$ cola a la aleta y $x_5$ ancho (todas en pulgadas).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_1$</th><th>$x_2$</th><th>$x_3$</th><th>$x_4$</th><th>$x_5$</th><th>$y$</th></tr></thead><tbody><tr><td>$1{,}31$</td><td>$1{,}07$</td><td>$0{,}44$</td><td>$0{,}75$</td><td>$0{,}35$</td><td>$1{,}95$</td></tr><tr><td>$1{,}55$</td><td>$1{,}49$</td><td>$0{,}53$</td><td>$0{,}9$</td><td>$0{,}47$</td><td>$2{,}9$</td></tr><tr><td>$0{,}99$</td><td>$0{,}84$</td><td>$0{,}34$</td><td>$0{,}57$</td><td>$0{,}32$</td><td>$0{,}72$</td></tr><tr><td>$0{,}99$</td><td>$0{,}83$</td><td>$0{,}34$</td><td>$0{,}54$</td><td>$0{,}27$</td><td>$0{,}81$</td></tr><tr><td>$1{,}01$</td><td>$0{,}9$</td><td>$0{,}36$</td><td>$0{,}64$</td><td>$0{,}3$</td><td>$1{,}09$</td></tr><tr><td>$1{,}09$</td><td>$0{,}93$</td><td>$0{,}42$</td><td>$0{,}61$</td><td>$0{,}31$</td><td>$1{,}22$</td></tr><tr><td>$1{,}08$</td><td>$0{,}9$</td><td>$0{,}4$</td><td>$0{,}51$</td><td>$0{,}31$</td><td>$1{,}02$</td></tr><tr><td>$1{,}27$</td><td>$1{,}08$</td><td>$0{,}44$</td><td>$0{,}77$</td><td>$0{,}34$</td><td>$1{,}93$</td></tr><tr><td>$0{,}99$</td><td>$0{,}85$</td><td>$0{,}36$</td><td>$0{,}56$</td><td>$0{,}29$</td><td>$0{,}64$</td></tr><tr><td>$1{,}34$</td><td>$1{,}13$</td><td>$0{,}45$</td><td>$0{,}77$</td><td>$0{,}37$</td><td>$2{,}08$</td></tr><tr><td>$1{,}3$</td><td>$1{,}1$</td><td>$0{,}45$</td><td>$0{,}76$</td><td>$0{,}38$</td><td>$1{,}98$</td></tr><tr><td>$1{,}33$</td><td>$1{,}1$</td><td>$0{,}48$</td><td>$0{,}77$</td><td>$0{,}38$</td><td>$1{,}9$</td></tr><tr><td>$1{,}86$</td><td>$1{,}47$</td><td>$0{,}6$</td><td>$1{,}01$</td><td>$0{,}65$</td><td>$8{,}56$</td></tr><tr><td>$1{,}58$</td><td>$1{,}34$</td><td>$0{,}52$</td><td>$0{,}95$</td><td>$0{,}5$</td><td>$4{,}49$</td></tr><tr><td>$1{,}97$</td><td>$1{,}59$</td><td>$0{,}67$</td><td>$1{,}2$</td><td>$0{,}59$</td><td>$8{,}49$</td></tr><tr><td>$1{,}8$</td><td>$1{,}56$</td><td>$0{,}66$</td><td>$1{,}02$</td><td>$0{,}59$</td><td>$6{,}17$</td></tr><tr><td>$1{,}75$</td><td>$1{,}58$</td><td>$0{,}63$</td><td>$1{,}09$</td><td>$0{,}59$</td><td>$7{,}54$</td></tr><tr><td>$1{,}72$</td><td>$1{,}43$</td><td>$0{,}64$</td><td>$1{,}02$</td><td>$0{,}63$</td><td>$6{,}36$</td></tr><tr><td>$1{,}68$</td><td>$1{,}57$</td><td>$0{,}72$</td><td>$0{,}96$</td><td>$0{,}68$</td><td>$7{,}63$</td></tr><tr><td>$1{,}75$</td><td>$1{,}59$</td><td>$0{,}68$</td><td>$1{,}08$</td><td>$0{,}62$</td><td>$7{,}78$</td></tr><tr><td>$2{,}19$</td><td>$1{,}86$</td><td>$0{,}75$</td><td>$1{,}24$</td><td>$0{,}72$</td><td>$10{,}15$</td></tr><tr><td>$1{,}73$</td><td>$1{,}67$</td><td>$0{,}64$</td><td>$1{,}14$</td><td>$0{,}55$</td><td>$6{,}88$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión lineal múltiple.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(x1 = c(1.31, 1.55, 0.99, 0.99, 1.01, 1.09, 1.08, 1.27, 0.99, 1.34, 1.3, 1.33, 1.86, 1.58, 1.97, 1.8, 1.75, 1.72, 1.68, 1.75, 2.19, 1.73), x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x3 = c(0.44, 0.53, 0.34, 0.34, 0.36, 0.42, 0.4, 0.44, 0.36, 0.45, 0.45, 0.48, 0.6, 0.52, 0.67, 0.66, 0.63, 0.64, 0.72, 0.68, 0.75, 0.64), x4 = c(0.75, 0.9, 0.57, 0.54, 0.64, 0.61, 0.51, 0.77, 0.56, 0.77, 0.76, 0.77, 1.01, 0.95, 1.2, 1.02, 1.09, 1.02, 0.96, 1.08, 1.24, 1.14), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 8.56, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 10.15, 6.88))
modelo <- lm(y ~ x1 + x2 + x3 + x4 + x5, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3 + x4 + x5, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-1.2721 -0.5357  0.1389  0.5282  0.8541 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  -6.4443     0.9097  -7.084 2.59e-06 ***
x1            1.7719     2.4872   0.712  0.48645    
x2           -3.6573     2.7836  -1.314  0.20741    
x3            2.4111     6.3613   0.379  0.70965    
x4            5.3967     3.5880   1.504  0.15204    
x5           14.6205     4.8177   3.035  0.00789 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.7055 on 16 degrees of freedom
Multiple R-squared:  0.9631,	Adjusted R-squared:  0.9516 
F-statistic: 83.56 on 5 and 16 DF,  p-value: 6.885e-11


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.93287, p-value = 0.1408

      x1       x2       x3       x4       x5 
33.66921 34.24209 30.26943 28.17295 21.88597 
    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.134 0.565 0.297 0.145 0.244 0.195 0.384 0.139 0.136 0.100 0.067 0.151 0.557 
   14    15    16    17    18    19    20    21    22 
0.174 0.458 0.175 0.161 0.304 0.614 0.206 0.358 0.437 
    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.003 0.918 0.002 0.049 0.015 0.009 0.119 0.001 0.006 0.006 0.009 0.051 0.446 
   14    15    16    17    18    19    20    21    22 
0.037 0.153 0.030 0.031 0.341 0.001 0.018 0.070 0.183`,
    salidaDe: `library(car)
datos <- data.frame(x1 = c(1.31, 1.55, 0.99, 0.99, 1.01, 1.09, 1.08, 1.27, 0.99, 1.34, 1.3, 1.33, 1.86, 1.58, 1.97, 1.8, 1.75, 1.72, 1.68, 1.75, 2.19, 1.73), x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x3 = c(0.44, 0.53, 0.34, 0.34, 0.36, 0.42, 0.4, 0.44, 0.36, 0.45, 0.45, 0.48, 0.6, 0.52, 0.67, 0.66, 0.63, 0.64, 0.72, 0.68, 0.75, 0.64), x4 = c(0.75, 0.9, 0.57, 0.54, 0.64, 0.61, 0.51, 0.77, 0.56, 0.77, 0.76, 0.77, 1.01, 0.95, 1.2, 1.02, 1.09, 1.02, 0.96, 1.08, 1.24, 1.14), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 8.56, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 10.15, 6.88))
modelo <- lm(y ~ x1 + x2 + x3 + x4 + x5, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=-6{,}444+1{,}772\,x_1-3{,}657\,x_2+2{,}411\,x_3+5{,}397\,x_4+14{,}62\,x_5$$</p><p>El apéndice del libro da $\hat y=-6{,}5122+1{,}9994x_1-3{,}6751x_2+2{,}5245x_3+5{,}1581x_4+14{,}4012x_5$; con los datos impresos en la tabla R obtiene los valores de arriba (diferencias pequeñas, probablemente por algún dato distinto en la edición original).</p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=-6{,}444$: peso esperado de un calamar con todas las medidas en 0: fuera del rango, no se interpreta (es negativo).</p><p>$b_{x_1}=1{,}772$: por cada pulgada adicional de la longitud del rostral, el peso aumenta en promedio 1,772 lb, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=-3{,}657$: por cada pulgada adicional de la longitud de la aleta, el peso disminuye en promedio 3,657 lb, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_3}=2{,}411$: por cada pulgada adicional de la longitud rostral–cola, el peso aumenta en promedio 2,411 lb, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_4}=5{,}397$: por cada pulgada adicional de la longitud cola–aleta, el peso aumenta en promedio 5,397 lb, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_5}=14{,}62$: por cada pulgada adicional del ancho, el peso aumenta en promedio 14,62 lb, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$-6{,}444$</td><td>$0{,}9097$</td><td>$-7{,}084$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x_1}$</td><td>$1{,}772$</td><td>$2{,}487$</td><td>$0{,}712$</td><td>$0{,}4865$</td><td>No</td></tr><tr><td>$\beta_{x_2}$</td><td>$-3{,}657$</td><td>$2{,}784$</td><td>$-1{,}314$</td><td>$0{,}2074$</td><td>No</td></tr><tr><td>$\beta_{x_3}$</td><td>$2{,}411$</td><td>$6{,}361$</td><td>$0{,}379$</td><td>$0{,}7097$</td><td>No</td></tr><tr><td>$\beta_{x_4}$</td><td>$5{,}397$</td><td>$3{,}588$</td><td>$1{,}504$</td><td>$0{,}152$</td><td>No</td></tr><tr><td>$\beta_{x_5}$</td><td>$14{,}62$</td><td>$4{,}818$</td><td>$3{,}035$</td><td>$0{,}0079$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{16}$ ($n-k-1=22-5-1=16$ gl). Región crítica: $|t|>t_{0{,}975;16}=2{,}1199$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=1{,}7719/2{,}4872=0{,}712$, $p=0{,}4865$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la longitud del rostral influya en el peso una vez consideradas las demás variables.</p><p>$\beta_{x_2}$: $t=-3{,}6573/2{,}7836=-1{,}314$, $p=0{,}2074$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la longitud de la aleta influya en el peso una vez consideradas las demás variables.</p><p>$\beta_{x_3}$: $t=2{,}4111/6{,}3613=0{,}379$, $p=0{,}7097$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la longitud rostral–cola influya en el peso una vez consideradas las demás variables.</p><p>$\beta_{x_4}$: $t=5{,}3967/3{,}588=1{,}504$, $p=0{,}152$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la longitud cola–aleta influya en el peso una vez consideradas las demás variables.</p><p>$\beta_{x_5}$: $t=14{,}6205/4{,}8177=3{,}035$, $p=0{,}0079$ ⇒ se <strong>rechaza</strong> $H_0$: el ancho influye significativamente en el peso.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=\beta_{x_3}=\beta_{x_4}=\beta_{x_5}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{208/5}{7{,}964/16}=83{,}56$ con $(5,16)$ gl; $F_{0{,}95;5,16}=2{,}852$ y $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo explica muy bien el peso. Pero ojo con la contradicción: el $F$ es enorme y casi ningún $t$ es significativo. Esa es la huella típica de la multicolinealidad (ver e).</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{208}{215{,}9}=0{,}9631$: el modelo explica el <strong>96,3 %</strong> de la variabilidad del peso del calamar.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}9631)\dfrac{21}{16}=0{,}9516$. Está cerca del $R^2$: los 5 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 2, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}1408$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=33{,}67\ (x_1);\ 34{,}24\ (x_2);\ 30{,}27\ (x_3);\ 28{,}17\ (x_4);\ 21{,}89\ (x_5)$. Hay VIF mayores que 10: <strong>multicolinealidad severa</strong>. Los regresores comparten casi la misma información, los errores estándar se inflan y por eso pueden salir coeficientes no significativos (o con signo raro) aunque el $F$ global sea enorme.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot6/22=0{,}545$; el mayor es $h_{19}=0{,}614$ ⇒ observaciónes 2, 13, 19 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{2}=0{,}918$ ⇒ ningún punto es influyente.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(x1 = c(1.31, 1.55, 0.99, 0.99, 1.01, 1.09, 1.08, 1.27, 0.99, 1.34, 1.3, 1.33, 1.86, 1.58, 1.97, 1.8, 1.75, 1.72, 1.68, 1.75, 2.19, 1.73), x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x3 = c(0.44, 0.53, 0.34, 0.34, 0.36, 0.42, 0.4, 0.44, 0.36, 0.45, 0.45, 0.48, 0.6, 0.52, 0.67, 0.66, 0.63, 0.64, 0.72, 0.68, 0.75, 0.64), x4 = c(0.75, 0.9, 0.57, 0.54, 0.64, 0.61, 0.51, 0.77, 0.56, 0.77, 0.76, 0.77, 1.01, 0.95, 1.2, 1.02, 1.09, 1.02, 0.96, 1.08, 1.24, 1.14), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 8.56, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 10.15, 6.88)); m <- lm(y ~ x1 + x2 + x3 + x4 + x5, data = d); coef(m)[2]})", esperado: 1.7719, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(x1 = c(1.31, 1.55, 0.99, 0.99, 1.01, 1.09, 1.08, 1.27, 0.99, 1.34, 1.3, 1.33, 1.86, 1.58, 1.97, 1.8, 1.75, 1.72, 1.68, 1.75, 2.19, 1.73), x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x3 = c(0.44, 0.53, 0.34, 0.34, 0.36, 0.42, 0.4, 0.44, 0.36, 0.45, 0.45, 0.48, 0.6, 0.52, 0.67, 0.66, 0.63, 0.64, 0.72, 0.68, 0.75, 0.64), x4 = c(0.75, 0.9, 0.57, 0.54, 0.64, 0.61, 0.51, 0.77, 0.56, 0.77, 0.76, 0.77, 1.01, 0.95, 1.2, 1.02, 1.09, 1.02, 0.96, 1.08, 1.24, 1.14), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 8.56, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 10.15, 6.88)); m <- lm(y ~ x1 + x2 + x3 + x4 + x5, data = d); summary(m)$r.squared})", esperado: 0.9631, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(x1 = c(1.31, 1.55, 0.99, 0.99, 1.01, 1.09, 1.08, 1.27, 0.99, 1.34, 1.3, 1.33, 1.86, 1.58, 1.97, 1.8, 1.75, 1.72, 1.68, 1.75, 2.19, 1.73), x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x3 = c(0.44, 0.53, 0.34, 0.34, 0.36, 0.42, 0.4, 0.44, 0.36, 0.45, 0.45, 0.48, 0.6, 0.52, 0.67, 0.66, 0.63, 0.64, 0.72, 0.68, 0.75, 0.64), x4 = c(0.75, 0.9, 0.57, 0.54, 0.64, 0.61, 0.51, 0.77, 0.56, 0.77, 0.76, 0.77, 1.01, 0.95, 1.2, 1.02, 1.09, 1.02, 0.96, 1.08, 1.24, 1.14), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 8.56, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 10.15, 6.88)); m <- lm(y ~ x1 + x2 + x3 + x4 + x5, data = d); summary(m)$fstatistic[1]})", esperado: 83.56, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.11 (pp. 451–452)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d033",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c10",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.11 (pp. 451–452)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.11 · Peso de calamares: multicolinealidad (modelo reducido)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.11 del libro de Walpole (9.ª ed.). Cambio respecto del original: con los mismos datos se ajusta un modelo reducido solo con la longitud de la aleta $x_2$ y el ancho $x_5$.</p><p>Se estudió el peso $y$ (lb) de calamares a partir de medidas de la boca: $x_1$ longitud del rostral, $x_2$ longitud de la aleta, $x_3$ rostral a la cola, $x_4$ cola a la aleta y $x_5$ ancho (todas en pulgadas).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_2$</th><th>$x_5$</th><th>$y$</th></tr></thead><tbody><tr><td>$1{,}07$</td><td>$0{,}35$</td><td>$1{,}95$</td></tr><tr><td>$1{,}49$</td><td>$0{,}47$</td><td>$2{,}9$</td></tr><tr><td>$0{,}84$</td><td>$0{,}32$</td><td>$0{,}72$</td></tr><tr><td>$0{,}83$</td><td>$0{,}27$</td><td>$0{,}81$</td></tr><tr><td>$0{,}9$</td><td>$0{,}3$</td><td>$1{,}09$</td></tr><tr><td>$0{,}93$</td><td>$0{,}31$</td><td>$1{,}22$</td></tr><tr><td>$0{,}9$</td><td>$0{,}31$</td><td>$1{,}02$</td></tr><tr><td>$1{,}08$</td><td>$0{,}34$</td><td>$1{,}93$</td></tr><tr><td>$0{,}85$</td><td>$0{,}29$</td><td>$0{,}64$</td></tr><tr><td>$1{,}13$</td><td>$0{,}37$</td><td>$2{,}08$</td></tr><tr><td>$1{,}1$</td><td>$0{,}38$</td><td>$1{,}98$</td></tr><tr><td>$1{,}1$</td><td>$0{,}38$</td><td>$1{,}9$</td></tr><tr><td>$1{,}47$</td><td>$0{,}65$</td><td>$8{,}56$</td></tr><tr><td>$1{,}34$</td><td>$0{,}5$</td><td>$4{,}49$</td></tr><tr><td>$1{,}59$</td><td>$0{,}59$</td><td>$8{,}49$</td></tr><tr><td>$1{,}56$</td><td>$0{,}59$</td><td>$6{,}17$</td></tr><tr><td>$1{,}58$</td><td>$0{,}59$</td><td>$7{,}54$</td></tr><tr><td>$1{,}43$</td><td>$0{,}63$</td><td>$6{,}36$</td></tr><tr><td>$1{,}57$</td><td>$0{,}68$</td><td>$7{,}63$</td></tr><tr><td>$1{,}59$</td><td>$0{,}62$</td><td>$7{,}78$</td></tr><tr><td>$1{,}86$</td><td>$0{,}72$</td><td>$10{,}15$</td></tr><tr><td>$1{,}67$</td><td>$0{,}55$</td><td>$6{,}88$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión lineal múltiple.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 8.56, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 10.15, 6.88))
modelo <- lm(y ~ x2 + x5, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    salidaR: `
Call:
lm(formula = y ~ x2 + x5, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-1.7810 -0.4656  0.1536  0.4679  1.5577 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  -6.0284     0.7422  -8.122 1.34e-07 ***
x2            1.7224     1.6030   1.074    0.296    
x5           17.3255     3.4704   4.992 8.09e-05 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.7641 on 19 degrees of freedom
Multiple R-squared:  0.9486,	Adjusted R-squared:  0.9432 
F-statistic: 175.4 on 2 and 19 DF,  p-value: 5.651e-13


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.97548, p-value = 0.8328

      x2       x5 
9.681201 9.681201 
    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.079 0.241 0.166 0.133 0.107 0.098 0.108 0.098 0.126 0.078 0.061 0.061 0.259 
   14    15    16    17    18    19    20    21    22 
0.048 0.098 0.085 0.092 0.243 0.231 0.097 0.205 0.287 
    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.000 0.756 0.008 0.054 0.011 0.005 0.001 0.003 0.003 0.003 0.009 0.012 0.170 
   14    15    16    17    18    19    20    21    22 
0.006 0.166 0.029 0.025 0.237 0.152 0.007 0.046 0.082`,
    salidaDe: `library(car)
datos <- data.frame(x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 8.56, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 10.15, 6.88))
modelo <- lm(y ~ x2 + x5, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=-6{,}028+1{,}722\,x_2+17{,}33\,x_5$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=-6{,}028$: peso esperado de un calamar con todas las medidas en 0: fuera del rango, no se interpreta (es negativo).</p><p>$b_{x_2}=1{,}722$: por cada pulgada adicional de la longitud de la aleta, el peso aumenta en promedio 1,722 lb, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_5}=17{,}33$: por cada pulgada adicional del ancho, el peso aumenta en promedio 17,33 lb, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$-6{,}028$</td><td>$0{,}7422$</td><td>$-8{,}122$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x_2}$</td><td>$1{,}722$</td><td>$1{,}603$</td><td>$1{,}074$</td><td>$0{,}2961$</td><td>No</td></tr><tr><td>$\beta_{x_5}$</td><td>$17{,}33$</td><td>$3{,}47$</td><td>$4{,}992$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{19}$ ($n-k-1=22-2-1=19$ gl). Región crítica: $|t|>t_{0{,}975;19}=2{,}093$, o bien $p<0{,}05$.</p><p>$\beta_{x_2}$: $t=1{,}7224/1{,}603=1{,}074$, $p=0{,}2961$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la longitud de la aleta influya en el peso una vez consideradas las demás variables.</p><p>$\beta_{x_5}$: $t=17{,}3255/3{,}4704=4{,}992$, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: el ancho influye significativamente en el peso.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_2}=\beta_{x_5}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{204{,}8/2}{11{,}09/19}=175{,}42$ con $(2,19)$ gl; $F_{0{,}95;2,19}=3{,}522$ y $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo reducido explica casi lo mismo que el completo con solo dos variables.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{204{,}8}{215{,}9}=0{,}9486$: el modelo explica el <strong>94,9 %</strong> de la variabilidad del peso del calamar.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}9486)\dfrac{21}{19}=0{,}9432$. Está cerca del $R^2$: los 2 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 2, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}8328$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=9{,}68\ (x_2);\ 9{,}68\ (x_5)$. Hay VIF entre 5 y 10: multicolinealidad moderada, que infla algo los errores estándar; conviene tenerla presente al interpretar los $t$.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot3/22=0{,}273$; el mayor es $h_{22}=0{,}287$ ⇒ observación 22 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{2}=0{,}756$ ⇒ ningún punto es influyente.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x2", r: "cat({d <- data.frame(x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 8.56, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 10.15, 6.88)); m <- lm(y ~ x2 + x5, data = d); coef(m)[2]})", esperado: 1.7224, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 8.56, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 10.15, 6.88)); m <- lm(y ~ x2 + x5, data = d); summary(m)$r.squared})", esperado: 0.9486, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 8.56, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 10.15, 6.88)); m <- lm(y ~ x2 + x5, data = d); summary(m)$fstatistic[1]})", esperado: 175.42, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.11 (pp. 451–452)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d034",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c10",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.11 (pp. 451–452)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.11 · Peso de calamares: multicolinealidad (datos cambiados)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.11 del libro de Walpole (9.ª ed.). Cambio respecto del original: dos calamares pesaron distinto: el 13 pesó 7,80 lb (en vez de 8,56) y el 21 pesó 9,50 (en vez de 10,15).</p><p>Se estudió el peso $y$ (lb) de calamares a partir de medidas de la boca: $x_1$ longitud del rostral, $x_2$ longitud de la aleta, $x_3$ rostral a la cola, $x_4$ cola a la aleta y $x_5$ ancho (todas en pulgadas).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_1$</th><th>$x_2$</th><th>$x_3$</th><th>$x_4$</th><th>$x_5$</th><th>$y$</th></tr></thead><tbody><tr><td>$1{,}31$</td><td>$1{,}07$</td><td>$0{,}44$</td><td>$0{,}75$</td><td>$0{,}35$</td><td>$1{,}95$</td></tr><tr><td>$1{,}55$</td><td>$1{,}49$</td><td>$0{,}53$</td><td>$0{,}9$</td><td>$0{,}47$</td><td>$2{,}9$</td></tr><tr><td>$0{,}99$</td><td>$0{,}84$</td><td>$0{,}34$</td><td>$0{,}57$</td><td>$0{,}32$</td><td>$0{,}72$</td></tr><tr><td>$0{,}99$</td><td>$0{,}83$</td><td>$0{,}34$</td><td>$0{,}54$</td><td>$0{,}27$</td><td>$0{,}81$</td></tr><tr><td>$1{,}01$</td><td>$0{,}9$</td><td>$0{,}36$</td><td>$0{,}64$</td><td>$0{,}3$</td><td>$1{,}09$</td></tr><tr><td>$1{,}09$</td><td>$0{,}93$</td><td>$0{,}42$</td><td>$0{,}61$</td><td>$0{,}31$</td><td>$1{,}22$</td></tr><tr><td>$1{,}08$</td><td>$0{,}9$</td><td>$0{,}4$</td><td>$0{,}51$</td><td>$0{,}31$</td><td>$1{,}02$</td></tr><tr><td>$1{,}27$</td><td>$1{,}08$</td><td>$0{,}44$</td><td>$0{,}77$</td><td>$0{,}34$</td><td>$1{,}93$</td></tr><tr><td>$0{,}99$</td><td>$0{,}85$</td><td>$0{,}36$</td><td>$0{,}56$</td><td>$0{,}29$</td><td>$0{,}64$</td></tr><tr><td>$1{,}34$</td><td>$1{,}13$</td><td>$0{,}45$</td><td>$0{,}77$</td><td>$0{,}37$</td><td>$2{,}08$</td></tr><tr><td>$1{,}3$</td><td>$1{,}1$</td><td>$0{,}45$</td><td>$0{,}76$</td><td>$0{,}38$</td><td>$1{,}98$</td></tr><tr><td>$1{,}33$</td><td>$1{,}1$</td><td>$0{,}48$</td><td>$0{,}77$</td><td>$0{,}38$</td><td>$1{,}9$</td></tr><tr><td>$1{,}86$</td><td>$1{,}47$</td><td>$0{,}6$</td><td>$1{,}01$</td><td>$0{,}65$</td><td>$7{,}8$</td></tr><tr><td>$1{,}58$</td><td>$1{,}34$</td><td>$0{,}52$</td><td>$0{,}95$</td><td>$0{,}5$</td><td>$4{,}49$</td></tr><tr><td>$1{,}97$</td><td>$1{,}59$</td><td>$0{,}67$</td><td>$1{,}2$</td><td>$0{,}59$</td><td>$8{,}49$</td></tr><tr><td>$1{,}8$</td><td>$1{,}56$</td><td>$0{,}66$</td><td>$1{,}02$</td><td>$0{,}59$</td><td>$6{,}17$</td></tr><tr><td>$1{,}75$</td><td>$1{,}58$</td><td>$0{,}63$</td><td>$1{,}09$</td><td>$0{,}59$</td><td>$7{,}54$</td></tr><tr><td>$1{,}72$</td><td>$1{,}43$</td><td>$0{,}64$</td><td>$1{,}02$</td><td>$0{,}63$</td><td>$6{,}36$</td></tr><tr><td>$1{,}68$</td><td>$1{,}57$</td><td>$0{,}72$</td><td>$0{,}96$</td><td>$0{,}68$</td><td>$7{,}63$</td></tr><tr><td>$1{,}75$</td><td>$1{,}59$</td><td>$0{,}68$</td><td>$1{,}08$</td><td>$0{,}62$</td><td>$7{,}78$</td></tr><tr><td>$2{,}19$</td><td>$1{,}86$</td><td>$0{,}75$</td><td>$1{,}24$</td><td>$0{,}72$</td><td>$9{,}5$</td></tr><tr><td>$1{,}73$</td><td>$1{,}67$</td><td>$0{,}64$</td><td>$1{,}14$</td><td>$0{,}55$</td><td>$6{,}88$</td></tr></tbody></table></div><ol type="a"><li>Estime la ecuación de regresión lineal múltiple.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(x1 = c(1.31, 1.55, 0.99, 0.99, 1.01, 1.09, 1.08, 1.27, 0.99, 1.34, 1.3, 1.33, 1.86, 1.58, 1.97, 1.8, 1.75, 1.72, 1.68, 1.75, 2.19, 1.73), x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x3 = c(0.44, 0.53, 0.34, 0.34, 0.36, 0.42, 0.4, 0.44, 0.36, 0.45, 0.45, 0.48, 0.6, 0.52, 0.67, 0.66, 0.63, 0.64, 0.72, 0.68, 0.75, 0.64), x4 = c(0.75, 0.9, 0.57, 0.54, 0.64, 0.61, 0.51, 0.77, 0.56, 0.77, 0.76, 0.77, 1.01, 0.95, 1.2, 1.02, 1.09, 1.02, 0.96, 1.08, 1.24, 1.14), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 7.8, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 9.5, 6.88))
modelo <- lm(y ~ x1 + x2 + x3 + x4 + x5, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3 + x4 + x5, data = datos)

Residuals:
     Min       1Q   Median       3Q      Max 
-1.12186 -0.40838  0.07554  0.45387  0.85668 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  -6.2470     0.8270  -7.553 1.16e-06 ***
x1            0.1149     2.2611   0.051   0.9601    
x2           -3.7466     2.5306  -1.481   0.1582    
x3            5.8628     5.7832   1.014   0.3258    
x4            6.9587     3.2619   2.133   0.0487 *  
x5           12.7600     4.3798   2.913   0.0102 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.6414 on 16 degrees of freedom
Multiple R-squared:  0.9675,	Adjusted R-squared:  0.9573 
F-statistic: 95.23 on 5 and 16 DF,  p-value: 2.525e-11


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.96394, p-value = 0.5728

      x1       x2       x3       x4       x5 
33.66921 34.24209 30.26943 28.17295 21.88597 
    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.134 0.565 0.297 0.145 0.244 0.195 0.384 0.139 0.136 0.100 0.067 0.151 0.557 
   14    15    16    17    18    19    20    21    22 
0.174 0.458 0.175 0.161 0.304 0.614 0.206 0.358 0.437 
    1     2     3     4     5     6     7     8     9    10    11    12    13 
0.003 0.804 0.000 0.059 0.007 0.003 0.182 0.003 0.005 0.005 0.010 0.069 0.289 
   14    15    16    17    18    19    20    21    22 
0.022 0.275 0.020 0.045 0.320 0.000 0.018 0.022 0.129`,
    salidaDe: `library(car)
datos <- data.frame(x1 = c(1.31, 1.55, 0.99, 0.99, 1.01, 1.09, 1.08, 1.27, 0.99, 1.34, 1.3, 1.33, 1.86, 1.58, 1.97, 1.8, 1.75, 1.72, 1.68, 1.75, 2.19, 1.73), x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x3 = c(0.44, 0.53, 0.34, 0.34, 0.36, 0.42, 0.4, 0.44, 0.36, 0.45, 0.45, 0.48, 0.6, 0.52, 0.67, 0.66, 0.63, 0.64, 0.72, 0.68, 0.75, 0.64), x4 = c(0.75, 0.9, 0.57, 0.54, 0.64, 0.61, 0.51, 0.77, 0.56, 0.77, 0.76, 0.77, 1.01, 0.95, 1.2, 1.02, 1.09, 1.02, 0.96, 1.08, 1.24, 1.14), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 7.8, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 9.5, 6.88))
modelo <- lm(y ~ x1 + x2 + x3 + x4 + x5, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=-6{,}247+0{,}1149\,x_1-3{,}747\,x_2+5{,}863\,x_3+6{,}959\,x_4+12{,}76\,x_5$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=-6{,}247$: peso esperado de un calamar con todas las medidas en 0: fuera del rango, no se interpreta (es negativo).</p><p>$b_{x_1}=0{,}1149$: por cada pulgada adicional de la longitud del rostral, el peso aumenta en promedio 0,1149 lb, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=-3{,}747$: por cada pulgada adicional de la longitud de la aleta, el peso disminuye en promedio 3,747 lb, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_3}=5{,}863$: por cada pulgada adicional de la longitud rostral–cola, el peso aumenta en promedio 5,863 lb, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_4}=6{,}959$: por cada pulgada adicional de la longitud cola–aleta, el peso aumenta en promedio 6,959 lb, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_5}=12{,}76$: por cada pulgada adicional del ancho, el peso aumenta en promedio 12,76 lb, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$-6{,}247$</td><td>$0{,}827$</td><td>$-7{,}553$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x_1}$</td><td>$0{,}1149$</td><td>$2{,}261$</td><td>$0{,}051$</td><td>$0{,}9601$</td><td>No</td></tr><tr><td>$\beta_{x_2}$</td><td>$-3{,}747$</td><td>$2{,}531$</td><td>$-1{,}481$</td><td>$0{,}1582$</td><td>No</td></tr><tr><td>$\beta_{x_3}$</td><td>$5{,}863$</td><td>$5{,}783$</td><td>$1{,}014$</td><td>$0{,}3258$</td><td>No</td></tr><tr><td>$\beta_{x_4}$</td><td>$6{,}959$</td><td>$3{,}262$</td><td>$2{,}133$</td><td>$0{,}0487$</td><td>Sí</td></tr><tr><td>$\beta_{x_5}$</td><td>$12{,}76$</td><td>$4{,}38$</td><td>$2{,}913$</td><td>$0{,}0102$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{16}$ ($n-k-1=22-5-1=16$ gl). Región crítica: $|t|>t_{0{,}975;16}=2{,}1199$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=0{,}1149/2{,}2611=0{,}051$, $p=0{,}9601$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la longitud del rostral influya en el peso una vez consideradas las demás variables.</p><p>$\beta_{x_2}$: $t=-3{,}7466/2{,}5306=-1{,}481$, $p=0{,}1582$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la longitud de la aleta influya en el peso una vez consideradas las demás variables.</p><p>$\beta_{x_3}$: $t=5{,}8628/5{,}7832=1{,}014$, $p=0{,}3258$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la longitud rostral–cola influya en el peso una vez consideradas las demás variables.</p><p>$\beta_{x_4}$: $t=6{,}9587/3{,}2619=2{,}133$, $p=0{,}0487$ ⇒ se <strong>rechaza</strong> $H_0$: la longitud cola–aleta influye significativamente en el peso.</p><p>$\beta_{x_5}$: $t=12{,}76/4{,}3798=2{,}913$, $p=0{,}0102$ ⇒ se <strong>rechaza</strong> $H_0$: el ancho influye significativamente en el peso.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=\beta_{x_3}=\beta_{x_4}=\beta_{x_5}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{195{,}9/5}{6{,}582/16}=95{,}23$ con $(5,16)$ gl; $F_{0{,}95;5,16}=2{,}852$ y $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo explica muy bien el peso. Pero ojo con la contradicción: el $F$ es enorme y casi ningún $t$ es significativo. Esa es la huella típica de la multicolinealidad (ver e).</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{195{,}9}{202{,}5}=0{,}9675$: el modelo explica el <strong>96,7 %</strong> de la variabilidad del peso del calamar.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}9675)\dfrac{21}{16}=0{,}9573$. Está cerca del $R^2$: los 5 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 2, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}5728$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=33{,}67\ (x_1);\ 34{,}24\ (x_2);\ 30{,}27\ (x_3);\ 28{,}17\ (x_4);\ 21{,}89\ (x_5)$. Hay VIF mayores que 10: <strong>multicolinealidad severa</strong>. Los regresores comparten casi la misma información, los errores estándar se inflan y por eso pueden salir coeficientes no significativos (o con signo raro) aunque el $F$ global sea enorme.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot6/22=0{,}545$; el mayor es $h_{19}=0{,}614$ ⇒ observaciónes 2, 13, 19 con alto apalancamiento (valores de $x$ alejados del resto).</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{2}=0{,}804$ ⇒ ningún punto es influyente.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(x1 = c(1.31, 1.55, 0.99, 0.99, 1.01, 1.09, 1.08, 1.27, 0.99, 1.34, 1.3, 1.33, 1.86, 1.58, 1.97, 1.8, 1.75, 1.72, 1.68, 1.75, 2.19, 1.73), x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x3 = c(0.44, 0.53, 0.34, 0.34, 0.36, 0.42, 0.4, 0.44, 0.36, 0.45, 0.45, 0.48, 0.6, 0.52, 0.67, 0.66, 0.63, 0.64, 0.72, 0.68, 0.75, 0.64), x4 = c(0.75, 0.9, 0.57, 0.54, 0.64, 0.61, 0.51, 0.77, 0.56, 0.77, 0.76, 0.77, 1.01, 0.95, 1.2, 1.02, 1.09, 1.02, 0.96, 1.08, 1.24, 1.14), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 7.8, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 9.5, 6.88)); m <- lm(y ~ x1 + x2 + x3 + x4 + x5, data = d); coef(m)[2]})", esperado: 0.1149, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(x1 = c(1.31, 1.55, 0.99, 0.99, 1.01, 1.09, 1.08, 1.27, 0.99, 1.34, 1.3, 1.33, 1.86, 1.58, 1.97, 1.8, 1.75, 1.72, 1.68, 1.75, 2.19, 1.73), x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x3 = c(0.44, 0.53, 0.34, 0.34, 0.36, 0.42, 0.4, 0.44, 0.36, 0.45, 0.45, 0.48, 0.6, 0.52, 0.67, 0.66, 0.63, 0.64, 0.72, 0.68, 0.75, 0.64), x4 = c(0.75, 0.9, 0.57, 0.54, 0.64, 0.61, 0.51, 0.77, 0.56, 0.77, 0.76, 0.77, 1.01, 0.95, 1.2, 1.02, 1.09, 1.02, 0.96, 1.08, 1.24, 1.14), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 7.8, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 9.5, 6.88)); m <- lm(y ~ x1 + x2 + x3 + x4 + x5, data = d); summary(m)$r.squared})", esperado: 0.9675, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(x1 = c(1.31, 1.55, 0.99, 0.99, 1.01, 1.09, 1.08, 1.27, 0.99, 1.34, 1.3, 1.33, 1.86, 1.58, 1.97, 1.8, 1.75, 1.72, 1.68, 1.75, 2.19, 1.73), x2 = c(1.07, 1.49, 0.84, 0.83, 0.9, 0.93, 0.9, 1.08, 0.85, 1.13, 1.1, 1.1, 1.47, 1.34, 1.59, 1.56, 1.58, 1.43, 1.57, 1.59, 1.86, 1.67), x3 = c(0.44, 0.53, 0.34, 0.34, 0.36, 0.42, 0.4, 0.44, 0.36, 0.45, 0.45, 0.48, 0.6, 0.52, 0.67, 0.66, 0.63, 0.64, 0.72, 0.68, 0.75, 0.64), x4 = c(0.75, 0.9, 0.57, 0.54, 0.64, 0.61, 0.51, 0.77, 0.56, 0.77, 0.76, 0.77, 1.01, 0.95, 1.2, 1.02, 1.09, 1.02, 0.96, 1.08, 1.24, 1.14), x5 = c(0.35, 0.47, 0.32, 0.27, 0.3, 0.31, 0.31, 0.34, 0.29, 0.37, 0.38, 0.38, 0.65, 0.5, 0.59, 0.59, 0.59, 0.63, 0.68, 0.62, 0.72, 0.55), y = c(1.95, 2.9, 0.72, 0.81, 1.09, 1.22, 1.02, 1.93, 0.64, 2.08, 1.98, 1.9, 7.8, 4.49, 8.49, 6.17, 7.54, 6.36, 7.63, 7.78, 9.5, 6.88)); m <- lm(y ~ x1 + x2 + x3 + x4 + x5, data = d); summary(m)$fstatistic[1]})", esperado: 95.23, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.11 (pp. 451–452)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m26-d035",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c06",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO WALPOLE · Ej. 12.36 · Factorial 2³ como regresión codificada",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO WALPOLE</strong> — Ej. 12.36 del libro de Walpole (9.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Se ajusta una regresión múltiple del producto $y$ en función de la temperatura $x_1$, el tiempo de reacción $x_2$ y la concentración de un reactante $x_3$, cada una a dos niveles codificados ($-1$, $+1$).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$y$</th><th>$x_1$</th><th>$x_2$</th><th>$x_3$</th></tr></thead><tbody><tr><td>$7{,}6$</td><td>$−1$</td><td>$−1$</td><td>$−1$</td></tr><tr><td>$8{,}4$</td><td>$1$</td><td>$−1$</td><td>$−1$</td></tr><tr><td>$9{,}2$</td><td>$−1$</td><td>$1$</td><td>$−1$</td></tr><tr><td>$10{,}3$</td><td>$−1$</td><td>$−1$</td><td>$1$</td></tr><tr><td>$9{,}8$</td><td>$1$</td><td>$1$</td><td>$−1$</td></tr><tr><td>$11{,}1$</td><td>$1$</td><td>$−1$</td><td>$1$</td></tr><tr><td>$10{,}2$</td><td>$−1$</td><td>$1$</td><td>$1$</td></tr><tr><td>$12{,}6$</td><td>$1$</td><td>$1$</td><td>$1$</td></tr></tbody></table></div><ol type="a"><li>Use las variables codificadas para estimar $\mu_{Y|x_1,x_2,x_3}=\beta_0+\beta_1x_1+\beta_2x_2+\beta_3x_3$.</li><li>Divida la SCR en tres componentes de 1 gl atribuibles a $x_1$, $x_2$ y $x_3$ y construya la tabla ANOVA con las pruebas de significancia.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(7.6, 8.4, 9.2, 10.3, 9.8, 11.1, 10.2, 12.6), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1))
modelo <- lm(y ~ x1 + x2 + x3, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
anova(modelo)`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3, data = datos)

Residuals:
     1      2      3      4      5      6      7      8 
-0.025 -0.375  0.475  0.375 -0.075  0.025 -0.825  0.425 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)   9.9000     0.2073  47.759 1.15e-06 ***
x1            0.5750     0.2073   2.774  0.05013 .  
x2            0.5500     0.2073   2.653  0.05679 .  
x3            1.1500     0.2073   5.548  0.00516 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.5863 on 4 degrees of freedom
Multiple R-squared:  0.9192,	Adjusted R-squared:  0.8586 
F-statistic: 15.17 on 3 and 4 DF,  p-value: 0.0119


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.91432, p-value = 0.3855

x1 x2 x3 
 1  1  1 
  1   2   3   4   5   6   7   8 
0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5 
    1     2     3     4     5     6     7     8 
0.001 0.205 0.328 0.205 0.008 0.001 0.990 0.263 
Analysis of Variance Table

Response: y
          Df Sum Sq Mean Sq F value   Pr(>F)   
x1         1  2.645  2.6450  7.6945 0.050130 . 
x2         1  2.420  2.4200  7.0400 0.056786 . 
x3         1 10.580 10.5800 30.7782 0.005164 **
Residuals  4  1.375  0.3438                    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1`,
    salidaDe: `library(car)
datos <- data.frame(y = c(7.6, 8.4, 9.2, 10.3, 9.8, 11.1, 10.2, 12.6), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1))
modelo <- lm(y ~ x1 + x2 + x3, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
anova(modelo)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=9{,}9+0{,}575\,x_1+0{,}55\,x_2+1{,}15\,x_3$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=9{,}9$: con variables codificadas, el 0 es el <strong>centro del diseño</strong>; $b_0$ es el producto medio predicho en el centro (aquí, el promedio de las 8 corridas). A diferencia de las unidades reales, sí tiene interpretación.</p><p>$b_{x_1}=0{,}575$: por cada unidad codificada adicional de la temperatura, el producto aumenta en promedio 0,575 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=0{,}55$: por cada unidad codificada adicional del tiempo de reacción, el producto aumenta en promedio 0,55 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_3}=1{,}15$: por cada unidad codificada adicional de la concentración, el producto aumenta en promedio 1,15 unidades, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$9{,}9$</td><td>$0{,}2073$</td><td>$47{,}759$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x_1}$</td><td>$0{,}575$</td><td>$0{,}2073$</td><td>$2{,}774$</td><td>$0{,}0501$</td><td>No</td></tr><tr><td>$\beta_{x_2}$</td><td>$0{,}55$</td><td>$0{,}2073$</td><td>$2{,}653$</td><td>$0{,}0568$</td><td>No</td></tr><tr><td>$\beta_{x_3}$</td><td>$1{,}15$</td><td>$0{,}2073$</td><td>$5{,}548$</td><td>$0{,}0052$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{4}$ ($n-k-1=8-3-1=4$ gl). Región crítica: $|t|>t_{0{,}975;4}=2{,}7764$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=0{,}575/0{,}2073=2{,}774$, $p=0{,}0501$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la temperatura influya en el producto una vez consideradas las demás variables.</p><p>$\beta_{x_2}$: $t=0{,}55/0{,}2073=2{,}653$, $p=0{,}0568$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que el tiempo de reacción influya en el producto una vez consideradas las demás variables.</p><p>$\beta_{x_3}$: $t=1{,}15/0{,}2073=5{,}548$, $p=0{,}0052$ ⇒ se <strong>rechaza</strong> $H_0$: la concentración influye significativamente en el producto.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=\beta_{x_3}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{15{,}65/3}{1{,}375/4}=15{,}17$ con $(3,4)$ gl; $F_{0{,}95;3,4}=6{,}591$ y $p=0{,}0119$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo explica el producto.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{15{,}65}{17{,}02}=0{,}9192$: el modelo explica el <strong>91,9 %</strong> de la variabilidad del producto.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}9192)\dfrac{7}{4}=0{,}8586$. Está cerca del $R^2$: los 3 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}3855$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=1\ (x_1);\ 1\ (x_2);\ 1\ (x_3)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot4/8=1$; el mayor es $h_{1}=0{,}5$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{7}=0{,}99$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) SCR en componentes de 1 gl", puntos: 1, solucion: String.raw`<p>Con el diseño codificado ortogonal, <code>anova(modelo)</code> reparte la $SCR=15{,}65$ en una parte por variable (cada una con 1 gl): $R(\beta_1)=2{,}645$, $R(\beta_2)=2{,}42$, $R(\beta_3)=10{,}58$, que suman $15{,}65=SCR$. Como las columnas son ortogonales, el orden de entrada no cambia estas sumas.</p><p>$CME=1{,}375/4=0{,}3438$ y cada $F=R(\beta_j)/CME$: $F_1=7{,}69,\ F_2=7{,}04,\ F_3=30{,}78$, con $F_{0{,}95;1,4}=7{,}709$. Equivale a las pruebas $t$ (aquí $F=t^2$): $x_1$ no significativa ($p=0{,}0501$), $x_2$ no significativa ($p=0{,}0568$), $x_3$ significativa ($p=0{,}0052$). Cada coeficiente es la <strong>mitad del efecto</strong> del factorial: pasar de −1 a +1 cambia el producto en $2b_j$.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(7.6, 8.4, 9.2, 10.3, 9.8, 11.1, 10.2, 12.6), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1)); m <- lm(y ~ x1 + x2 + x3, data = d); coef(m)[2]})", esperado: 0.575, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(7.6, 8.4, 9.2, 10.3, 9.8, 11.1, 10.2, 12.6), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1)); m <- lm(y ~ x1 + x2 + x3, data = d); summary(m)$r.squared})", esperado: 0.9192, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(7.6, 8.4, 9.2, 10.3, 9.8, 11.1, 10.2, 12.6), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1)); m <- lm(y ~ x1 + x2 + x3, data = d); summary(m)$fstatistic[1]})", esperado: 15.17, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.36 (p. 471)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" },
      { id: "C8.2", loc: "slides 23–26" }
    ]
  },
  {
    id: "m26-d036",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c06",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.36 (p. 471)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.36 · Factorial 2³ como regresión codificada (datos cambiados)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.36 del libro de Walpole (9.ª ed.). Cambio respecto del original: la corrida (−1, −1, −1) dio 7,0 y la (1, 1, 1) dio 13,1.</p><p>Se ajusta una regresión múltiple del producto $y$ en función de la temperatura $x_1$, el tiempo de reacción $x_2$ y la concentración de un reactante $x_3$, cada una a dos niveles codificados ($-1$, $+1$).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$y$</th><th>$x_1$</th><th>$x_2$</th><th>$x_3$</th></tr></thead><tbody><tr><td>$7$</td><td>$−1$</td><td>$−1$</td><td>$−1$</td></tr><tr><td>$8{,}4$</td><td>$1$</td><td>$−1$</td><td>$−1$</td></tr><tr><td>$9{,}2$</td><td>$−1$</td><td>$1$</td><td>$−1$</td></tr><tr><td>$10{,}3$</td><td>$−1$</td><td>$−1$</td><td>$1$</td></tr><tr><td>$9{,}8$</td><td>$1$</td><td>$1$</td><td>$−1$</td></tr><tr><td>$11{,}1$</td><td>$1$</td><td>$−1$</td><td>$1$</td></tr><tr><td>$10{,}2$</td><td>$−1$</td><td>$1$</td><td>$1$</td></tr><tr><td>$13{,}1$</td><td>$1$</td><td>$1$</td><td>$1$</td></tr></tbody></table></div><ol type="a"><li>Use las variables codificadas para estimar $\mu_{Y|x_1,x_2,x_3}=\beta_0+\beta_1x_1+\beta_2x_2+\beta_3x_3$.</li><li>Divida la SCR en tres componentes de 1 gl atribuibles a $x_1$, $x_2$ y $x_3$ y construya la tabla ANOVA con las pruebas de significancia.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(7, 8.4, 9.2, 10.3, 9.8, 11.1, 10.2, 13.1), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1))
modelo <- lm(y ~ x1 + x2 + x3, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
anova(modelo)`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3, data = datos)

Residuals:
     1      2      3      4      5      6      7      8 
-0.200 -0.225  0.625  0.525 -0.200 -0.100 -0.950  0.525 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)   9.8875     0.2491  39.699 2.41e-06 ***
x1            0.7125     0.2491   2.861  0.04589 *  
x2            0.6875     0.2491   2.760  0.05083 .  
x3            1.2875     0.2491   5.169  0.00665 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.7045 on 4 degrees of freedom
Multiple R-squared:  0.914,	Adjusted R-squared:  0.8495 
F-statistic: 14.18 on 3 and 4 DF,  p-value: 0.01345


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.88151, p-value = 0.1947

x1 x2 x3 
 1  1  1 
  1   2   3   4   5   6   7   8 
0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5 
    1     2     3     4     5     6     7     8 
0.040 0.051 0.394 0.278 0.040 0.010 0.909 0.278 
Analysis of Variance Table

Response: y
          Df  Sum Sq Mean Sq F value   Pr(>F)   
x1         1  4.0613  4.0613  8.1839 0.045895 * 
x2         1  3.7813  3.7813  7.6196 0.050830 . 
x3         1 13.2612 13.2612 26.7229 0.006655 **
Residuals  4  1.9850  0.4963                    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1`,
    salidaDe: `library(car)
datos <- data.frame(y = c(7, 8.4, 9.2, 10.3, 9.8, 11.1, 10.2, 13.1), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1))
modelo <- lm(y ~ x1 + x2 + x3, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
anova(modelo)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=9{,}888+0{,}7125\,x_1+0{,}6875\,x_2+1{,}288\,x_3$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=9{,}888$: con variables codificadas, el 0 es el <strong>centro del diseño</strong>; $b_0$ es el producto medio predicho en el centro (aquí, el promedio de las 8 corridas). A diferencia de las unidades reales, sí tiene interpretación.</p><p>$b_{x_1}=0{,}7125$: por cada unidad codificada adicional de la temperatura, el producto aumenta en promedio 0,7125 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=0{,}6875$: por cada unidad codificada adicional del tiempo de reacción, el producto aumenta en promedio 0,6875 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_3}=1{,}288$: por cada unidad codificada adicional de la concentración, el producto aumenta en promedio 1,288 unidades, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$9{,}888$</td><td>$0{,}2491$</td><td>$39{,}699$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x_1}$</td><td>$0{,}7125$</td><td>$0{,}2491$</td><td>$2{,}861$</td><td>$0{,}0459$</td><td>Sí</td></tr><tr><td>$\beta_{x_2}$</td><td>$0{,}6875$</td><td>$0{,}2491$</td><td>$2{,}76$</td><td>$0{,}0508$</td><td>No</td></tr><tr><td>$\beta_{x_3}$</td><td>$1{,}288$</td><td>$0{,}2491$</td><td>$5{,}169$</td><td>$0{,}0067$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{4}$ ($n-k-1=8-3-1=4$ gl). Región crítica: $|t|>t_{0{,}975;4}=2{,}7764$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=0{,}7125/0{,}2491=2{,}861$, $p=0{,}0459$ ⇒ se <strong>rechaza</strong> $H_0$: la temperatura influye significativamente en el producto.</p><p>$\beta_{x_2}$: $t=0{,}6875/0{,}2491=2{,}76$, $p=0{,}0508$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que el tiempo de reacción influya en el producto una vez consideradas las demás variables.</p><p>$\beta_{x_3}$: $t=1{,}2875/0{,}2491=5{,}169$, $p=0{,}0067$ ⇒ se <strong>rechaza</strong> $H_0$: la concentración influye significativamente en el producto.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=\beta_{x_3}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{21{,}1/3}{1{,}985/4}=14{,}18$ con $(3,4)$ gl; $F_{0{,}95;3,4}=6{,}591$ y $p=0{,}0135$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo explica el producto.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{21{,}1}{23{,}09}=0{,}914$: el modelo explica el <strong>91,4 %</strong> de la variabilidad del producto.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}914)\dfrac{7}{4}=0{,}8495$. Está cerca del $R^2$: los 3 regresores no inflan artificialmente el ajuste. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}1947$ ⇒ no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=1\ (x_1);\ 1\ (x_2);\ 1\ (x_3)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot4/8=1$; el mayor es $h_{1}=0{,}5$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{7}=0{,}909$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) SCR en componentes de 1 gl", puntos: 1, solucion: String.raw`<p>Con el diseño codificado ortogonal, <code>anova(modelo)</code> reparte la $SCR=21{,}1$ en una parte por variable (cada una con 1 gl): $R(\beta_1)=4{,}061$, $R(\beta_2)=3{,}781$, $R(\beta_3)=13{,}26$, que suman $21{,}1=SCR$. Como las columnas son ortogonales, el orden de entrada no cambia estas sumas.</p><p>$CME=1{,}985/4=0{,}4963$ y cada $F=R(\beta_j)/CME$: $F_1=8{,}18,\ F_2=7{,}62,\ F_3=26{,}72$, con $F_{0{,}95;1,4}=7{,}709$. Equivale a las pruebas $t$ (aquí $F=t^2$): $x_1$ significativa ($p=0{,}0459$), $x_2$ no significativa ($p=0{,}0508$), $x_3$ significativa ($p=0{,}0067$). Cada coeficiente es la <strong>mitad del efecto</strong> del factorial: pasar de −1 a +1 cambia el producto en $2b_j$.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(7, 8.4, 9.2, 10.3, 9.8, 11.1, 10.2, 13.1), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1)); m <- lm(y ~ x1 + x2 + x3, data = d); coef(m)[2]})", esperado: 0.7125, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(7, 8.4, 9.2, 10.3, 9.8, 11.1, 10.2, 13.1), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1)); m <- lm(y ~ x1 + x2 + x3, data = d); summary(m)$r.squared})", esperado: 0.914, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(7, 8.4, 9.2, 10.3, 9.8, 11.1, 10.2, 13.1), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1)); m <- lm(y ~ x1 + x2 + x3, data = d); summary(m)$fstatistic[1]})", esperado: 14.18, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.36 (p. 471)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" },
      { id: "C8.2", loc: "slides 23–26" }
    ]
  },
  {
    id: "m26-d037",
    modulo: "m26-regresion-lineal",
    concepto: "m26-c06",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "WAL", loc: "ej. 12.36 (p. 471)" }
    ],
    titulo: "MODIFICADA-LIBRO WALPOLE · Ej. 12.36 · Factorial 2³ como regresión codificada (réplica)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO WALPOLE</strong> — variante del Ej. 12.36 del libro de Walpole (9.ª ed.). Cambio respecto del original: se repitió el experimento y se obtuvieron y = 9,2; 8,9; 9,6; 11,0; 10,1; 11,4; 10,6; 12,2.</p><p>Se ajusta una regresión múltiple del producto $y$ en función de la temperatura $x_1$, el tiempo de reacción $x_2$ y la concentración de un reactante $x_3$, cada una a dos niveles codificados ($-1$, $+1$).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$y$</th><th>$x_1$</th><th>$x_2$</th><th>$x_3$</th></tr></thead><tbody><tr><td>$9{,}2$</td><td>$−1$</td><td>$−1$</td><td>$−1$</td></tr><tr><td>$8{,}9$</td><td>$1$</td><td>$−1$</td><td>$−1$</td></tr><tr><td>$9{,}6$</td><td>$−1$</td><td>$1$</td><td>$−1$</td></tr><tr><td>$11$</td><td>$−1$</td><td>$−1$</td><td>$1$</td></tr><tr><td>$10{,}1$</td><td>$1$</td><td>$1$</td><td>$−1$</td></tr><tr><td>$11{,}4$</td><td>$1$</td><td>$−1$</td><td>$1$</td></tr><tr><td>$10{,}6$</td><td>$−1$</td><td>$1$</td><td>$1$</td></tr><tr><td>$12{,}2$</td><td>$1$</td><td>$1$</td><td>$1$</td></tr></tbody></table></div><ol type="a"><li>Use las variables codificadas para estimar $\mu_{Y|x_1,x_2,x_3}=\beta_0+\beta_1x_1+\beta_2x_2+\beta_3x_3$.</li><li>Divida la SCR en tres componentes de 1 gl atribuibles a $x_1$, $x_2$ y $x_3$ y construya la tabla ANOVA con las pruebas de significancia.</li><li>Interprete el intercepto y cada coeficiente en el contexto del problema.</li><li>Para cada coeficiente plantee $H_0:\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p.</li><li>¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.</li><li>Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente la multicolinealidad (VIF), el apalancamiento y la distancia de Cook.</li></ol><p>Use $\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba.</p>`,
    codigoR: `library(car)
datos <- data.frame(y = c(9.2, 8.9, 9.6, 11, 10.1, 11.4, 10.6, 12.2), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1))
modelo <- lm(y ~ x1 + x2 + x3, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
anova(modelo)`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3, data = datos)

Residuals:
     1      2      3      4      5      6      7      8 
 0.275 -0.575  0.175  0.225  0.125  0.075 -0.675  0.375 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  10.3750     0.1858  55.832 6.16e-07 ***
x1            0.2750     0.1858   1.480  0.21300    
x2            0.2500     0.1858   1.345  0.24972    
x3            0.9250     0.1858   4.978  0.00761 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.5256 on 4 degrees of freedom
Multiple R-squared:  0.878,	Adjusted R-squared:  0.7864 
F-statistic: 9.593 on 3 and 4 DF,  p-value: 0.02676


	Shapiro-Wilk normality test

data:  residuals(modelo)
W = 0.78822, p-value = 0.02138

x1 x2 x3 
 1  1  1 
  1   2   3   4   5   6   7   8 
0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5 
    1     2     3     4     5     6     7     8 
0.137 0.598 0.055 0.092 0.028 0.010 0.825 0.255 
Analysis of Variance Table

Response: y
          Df Sum Sq Mean Sq F value   Pr(>F)   
x1         1  0.605  0.6050   2.190 0.213005   
x2         1  0.500  0.5000   1.810 0.249720   
x3         1  6.845  6.8450  24.778 0.007609 **
Residuals  4  1.105  0.2762                    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1`,
    salidaDe: `library(car)
datos <- data.frame(y = c(9.2, 8.9, 9.6, 11, 10.1, 11.4, 10.6, 12.2), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1))
modelo <- lm(y ~ x1 + x2 + x3, data = datos)
summary(modelo)
shapiro.test(residuals(modelo))
vif(modelo)
round(hatvalues(modelo), 3)
round(cooks.distance(modelo), 3)
anova(modelo)`,
    partes: [
      { titulo: "a) Modelo ajustado", puntos: 1, solucion: String.raw`<p>Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$\hat{y}=10{,}38+0{,}275\,x_1+0{,}25\,x_2+0{,}925\,x_3$$</p><p></p>` },
      { titulo: "b) Interpretación de los coeficientes", puntos: 1, solucion: "<p>$b_0=10{,}38$: con variables codificadas, el 0 es el <strong>centro del diseño</strong>; $b_0$ es el producto medio predicho en el centro (aquí, el promedio de las 8 corridas). A diferencia de las unidades reales, sí tiene interpretación.</p><p>$b_{x_1}=0{,}275$: por cada unidad codificada adicional de la temperatura, el producto aumenta en promedio 0,275 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_2}=0{,}25$: por cada unidad codificada adicional del tiempo de reacción, el producto aumenta en promedio 0,25 unidades, <strong>manteniendo constantes las demás variables</strong>.</p><p>$b_{x_3}=0{,}925$: por cada unidad codificada adicional de la concentración, el producto aumenta en promedio 0,925 unidades, <strong>manteniendo constantes las demás variables</strong>.</p>" },
      { titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Coef.</th><th>Estimación</th><th>ee</th><th>$t$</th><th>Valor-p</th><th>¿Signif. 5 %?</th></tr></thead><tbody><tr><td>$\beta_0$</td><td>$10{,}38$</td><td>$0{,}1858$</td><td>$55{,}832$</td><td>$\lt 0{,}0001$</td><td>Sí</td></tr><tr><td>$\beta_{x_1}$</td><td>$0{,}275$</td><td>$0{,}1858$</td><td>$1{,}48$</td><td>$0{,}213$</td><td>No</td></tr><tr><td>$\beta_{x_2}$</td><td>$0{,}25$</td><td>$0{,}1858$</td><td>$1{,}345$</td><td>$0{,}2497$</td><td>No</td></tr><tr><td>$\beta_{x_3}$</td><td>$0{,}925$</td><td>$0{,}1858$</td><td>$4{,}978$</td><td>$0{,}0076$</td><td>Sí</td></tr></tbody></table></div><p>Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{4}$ ($n-k-1=8-3-1=4$ gl). Región crítica: $|t|>t_{0{,}975;4}=2{,}7764$, o bien $p<0{,}05$.</p><p>$\beta_{x_1}$: $t=0{,}275/0{,}1858=1{,}48$, $p=0{,}213$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que la temperatura influya en el producto una vez consideradas las demás variables.</p><p>$\beta_{x_2}$: $t=0{,}25/0{,}1858=1{,}345$, $p=0{,}2497$ ⇒ <strong>no se rechaza</strong> $H_0$: no hay evidencia de que el tiempo de reacción influya en el producto una vez consideradas las demás variables.</p><p>$\beta_{x_3}$: $t=0{,}925/0{,}1858=4{,}978$, $p=0{,}0076$ ⇒ se <strong>rechaza</strong> $H_0$: la concentración influye significativamente en el producto.</p>` },
      { titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: String.raw`<p>$H_0:\beta_{x_1}=\beta_{x_2}=\beta_{x_3}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.</p><p>$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{7{,}95/3}{1{,}105/4}=9{,}59$ con $(3,4)$ gl; $F_{0{,}95;3,4}=6{,}591$ y $p=0{,}0268$ ⇒ se <strong>rechaza</strong> $H_0$. El modelo explica el producto.</p><p>$R^2=\dfrac{SCR}{STC}=\dfrac{7{,}95}{9{,}055}=0{,}878$: el modelo explica el <strong>87,8 %</strong> de la variabilidad del producto.</p><p>$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-0{,}878)\dfrac{7}{4}=0{,}7864$. Baja bastante respecto del $R^2$: con $n=8$ y 3 regresores, parte del $R^2$ se debe solo a haber agregado variables. (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)</p>` },
      { titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: String.raw`<p><strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): $p=0{,}0214$ ⇒ se rechaza: los residuos no parecen normales (revisar el Q-Q; con $n$ pequeño la prueba es poco confiable).</p><p><strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.</p><p><strong>Multicolinealidad</strong>: VIF $=1\ (x_1);\ 1\ (x_2);\ 1\ (x_3)$. Todos bajo 5: no hay problema de multicolinealidad.</p><p><strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot4/8=1$; el mayor es $h_{1}=0{,}5$ ⇒ ninguna supera el corte.</p><p><strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{7}=0{,}825$ ⇒ ningún punto es influyente.</p>` },
      { titulo: "f) SCR en componentes de 1 gl", puntos: 1, solucion: String.raw`<p>Con el diseño codificado ortogonal, <code>anova(modelo)</code> reparte la $SCR=7{,}95$ en una parte por variable (cada una con 1 gl): $R(\beta_1)=0{,}605$, $R(\beta_2)=0{,}5$, $R(\beta_3)=6{,}845$, que suman $7{,}95=SCR$. Como las columnas son ortogonales, el orden de entrada no cambia estas sumas.</p><p>$CME=1{,}105/4=0{,}2763$ y cada $F=R(\beta_j)/CME$: $F_1=2{,}19,\ F_2=1{,}81,\ F_3=24{,}78$, con $F_{0{,}95;1,4}=7{,}709$. Equivale a las pruebas $t$ (aquí $F=t^2$): $x_1$ no significativa ($p=0{,}213$), $x_2$ no significativa ($p=0{,}2497$), $x_3$ significativa ($p=0{,}0076$). Cada coeficiente es la <strong>mitad del efecto</strong> del factorial: pasar de −1 a +1 cambia el producto en $2b_j$.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "coef x1", r: "cat({d <- data.frame(y = c(9.2, 8.9, 9.6, 11, 10.1, 11.4, 10.6, 12.2), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1)); m <- lm(y ~ x1 + x2 + x3, data = d); coef(m)[2]})", esperado: 0.275, tol: 0.000050001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(9.2, 8.9, 9.6, 11, 10.1, 11.4, 10.6, 12.2), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1)); m <- lm(y ~ x1 + x2 + x3, data = d); summary(m)$r.squared})", esperado: 0.878, tol: 0.000050001 },
      { que: "F", r: "cat({d <- data.frame(y = c(9.2, 8.9, 9.6, 11, 10.1, 11.4, 10.6, 12.2), x1 = c(-1, 1, -1, -1, 1, 1, -1, 1), x2 = c(-1, -1, 1, -1, 1, -1, 1, 1), x3 = c(-1, -1, -1, 1, -1, 1, 1, 1)); m <- lm(y ~ x1 + x2 + x3, data = d); summary(m)$fstatistic[1]})", esperado: 9.59, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "WAL", loc: "ej. 12.36 (p. 471)" },
      { id: "C8.1", loc: "slides 15–34" },
      { id: "AY10-P", loc: "P2–P4" },
      { id: "INST-P4" },
      { id: "C8.2", loc: "slides 23–26" }
    ]
  }
]);
