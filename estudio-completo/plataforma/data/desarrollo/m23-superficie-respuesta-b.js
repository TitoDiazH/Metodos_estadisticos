/* ============================================================================
   Desarrollo · M23 Superficie de respuesta — libro guía cap. 12 (P4) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m23-d001",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c02",
    dificultad: 2,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 12, ej. 22 · Anodizado: factorial con centro y primer orden",
    enunciado: `<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 12, ej. 22 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>En una empresa que anodiza artículos de aluminio se estudia cómo el pH y la temperatura afectan el espesor del anodizado.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>pH</th><th>Temperatura</th><th>Espesor</th></tr></thead><tbody><tr><td>$1{,}2$</td><td>$−8$</td><td>$9$</td></tr><tr><td>$1{,}8$</td><td>$−8$</td><td>$14$</td></tr><tr><td>$1{,}2$</td><td>$8$</td><td>$10$</td></tr><tr><td>$1{,}8$</td><td>$8$</td><td>$19$</td></tr><tr><td>$1{,}2$</td><td>$−8$</td><td>$8$</td></tr><tr><td>$1{,}8$</td><td>$−8$</td><td>$12$</td></tr><tr><td>$1{,}2$</td><td>$8$</td><td>$11$</td></tr><tr><td>$1{,}8$</td><td>$8$</td><td>$20$</td></tr><tr><td>$1{,}5$</td><td>$0$</td><td>$14$</td></tr><tr><td>$1{,}5$</td><td>$0$</td><td>$13$</td></tr></tbody></table></div><ol type="a"><li>¿Cómo se llama el diseño empleado?</li><li>¿Qué se gana con las repeticiones al centro?</li><li>Encuentre el mejor modelo que describe el espesor (interprete coeficientes, $t$, $R^2$).</li><li>Con ese modelo liste cinco puntos en la dirección de máximo ascenso, con un paso de 0,3 en el factor de mayor influencia.</li><li>Explique qué se hace después con esos puntos.</li></ol>`,
    codigoR: `datos <- data.frame(y = c(9, 14, 10, 19, 8, 12, 11, 20, 14, 13), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0), x2 = c(-1, -1, 1, 1, -1, -1, 1, 1, 0, 0))   # x1 = (pH − 1,5)/0,3 ; x2 = temperatura/8
m1 <- lm(y ~ x1 + x2, data = datos); summary(m1)
m2 <- lm(y ~ x1 * x2, data = datos); summary(m2)
library(rsm)
summary(rsm(y ~ FO(x1, x2), data = datos))   # falta de ajuste del primer orden`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
   Min     1Q Median     3Q    Max 
-2.250 -0.625  0.250  0.875  1.500 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  13.0000     0.4590  28.320 1.76e-08 ***
x1            3.3750     0.5132   6.576 0.000311 ***
x2            2.1250     0.5132   4.141 0.004346 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 1.452 on 7 degrees of freedom
Multiple R-squared:  0.8961,	Adjusted R-squared:  0.8664 
F-statistic: 30.19 on 2 and 7 DF,  p-value: 0.0003612


Call:
lm(formula = y ~ x1 * x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-1.1250 -0.6250  0.1875  0.3750  1.0000 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  13.0000     0.2776  46.823 6.36e-09 ***
x1            3.3750     0.3104  10.873 3.59e-05 ***
x2            2.1250     0.3104   6.846 0.000478 ***
x1:x2         1.1250     0.3104   3.624 0.011041 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.878 on 6 degrees of freedom
Multiple R-squared:  0.9674,	Adjusted R-squared:  0.9511 
F-statistic: 59.41 on 3 and 6 DF,  p-value: 7.465e-05


Call:
rsm(formula = y ~ FO(x1, x2), data = datos)

            Estimate Std. Error t value  Pr(>|t|)    
(Intercept) 13.00000    0.45904 28.3202 1.759e-08 ***
x1           3.37500    0.51322  6.5762 0.0003111 ***
x2           2.12500    0.51322  4.1405 0.0043462 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.8961,	Adjusted R-squared:  0.8664 
F-statistic: 30.19 on 2 and 7 DF,  p-value: 0.0003612

Analysis of Variance Table

Response: y
            Df Sum Sq Mean Sq F value    Pr(>F)
FO(x1, x2)   2 127.25  63.625 30.1949 0.0003612
Residuals    7  14.75   2.107                  
Lack of fit  2  10.75   5.375  6.7187 0.0382975
Pure error   5   4.00   0.800                  

Direction of steepest ascent (at radius 1):
       x1        x2 
0.8462328 0.5328133 

Corresponding increment in original units:
       x1        x2 
0.8462328 0.5328133`,
    salidaDe: `datos <- data.frame(y = c(9, 14, 10, 19, 8, 12, 11, 20, 14, 13), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0), x2 = c(-1, -1, 1, 1, -1, -1, 1, 1, 0, 0))   # x1 = (pH − 1,5)/0,3 ; x2 = temperatura/8
m1 <- lm(y ~ x1 + x2, data = datos); summary(m1)
m2 <- lm(y ~ x1 * x2, data = datos); summary(m2)
library(rsm)
summary(rsm(y ~ FO(x1, x2), data = datos))   # falta de ajuste del primer orden`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño", puntos: 1, solucion: "<p>Es un <strong>factorial $2^2$ con 2 réplicas más 2 puntos al centro</strong> (10 corridas): pH en 1,2 y 1,8, temperatura en −8 y 8, centro en (1,5; 0). Codificado: $x_1=(pH-1{,}5)/0{,}3$ y $x_2=T/8$, así cada factor va de −1 a +1.</p><p>Es el diseño típico para una <strong>primera exploración</strong>: con dos niveles solo se estiman efectos lineales e interacciones; el centro permite ver si hay curvatura.</p>" },
      { titulo: "b) ¿Qué se gana con el centro?", puntos: 1, solucion: String.raw`<p>Dos cosas: (1) las réplicas dan una estimación del <strong>error puro</strong> que no depende del modelo; (2) comparar la media del centro con la de las esquinas detecta <strong>curvatura</strong> sin agregar niveles a cada factor.</p><p>Aquí $\bar y_{centro}=13{,}5$ y $\bar y_{esquinas}=12{,}875$: diferencia 0,625. Si la superficie fuera un plano, ambas medias coincidirían.</p><p>Falta de ajuste del modelo de primer orden (sin interacción): $F=6{,}719$, $p=0{,}0383$ ⇒ se <strong>rechaza</strong> $H_0$. El plano no basta.</p>` },
      { titulo: "c) Mejor modelo", puntos: 2, solucion: String.raw`<p>Primer orden: $\hat{y}=13+3{,}375\,x_1+2{,}125\,x_2$, $R^2=0{,}8961$.</p><p>Agregando la interacción: $\hat{y}=13+3{,}375\,x_1+2{,}125\,x_2+1{,}125\,x_1x_2$; $t_{x_1x_2}=3{,}624$, $p=0{,}011$ ⇒ se <strong>rechaza</strong> $H_0$. $R^2=0{,}9674$, $R^2_{aj}=0{,}9511$; falta de ajuste $F=0{,}781$, $p=0{,}4172$.</p><p>Mejor modelo: <strong>con interacción</strong>. Interpretación: $b_1=3{,}375$ ⇒ subir el pH de 1,2 a 1,8 (de −1 a +1) aumenta el espesor en $2b_1=6{,}75$ con la temperatura en su nivel medio; $b_{12}>0$ ⇒ ese efecto es mayor con temperatura alta: $\partial\hat y/\partial x_1=3{,}375+1{,}125x_2$.</p>` },
      { titulo: "d) Dirección de máximo ascenso (libro)", puntos: 1.5, solucion: String.raw`<p><strong>Esto viene del libro; la clase 8.2 no lo trabaja.</strong> En un modelo de primer orden, la dirección en que la respuesta sube más rápido es la del gradiente $(b_1,b_2)=(3{,}375;\ 2{,}125)$. Se avanza en el factor de mayor efecto ($x_1$, el pH) con paso $\Delta x_1=1$ (0,3 de pH) y el otro en proporción: $\Delta x_2=b_2/b_1=0{,}6296$ (5,037 grados).</p><p>Cinco puntos: pH $=1{,}8$, T $=5{,}04$; pH $=2{,}1$, T $=10{,}07$; pH $=2{,}4$, T $=15{,}11$; pH $=2{,}7$, T $=20{,}15$; pH $=3$, T $=25{,}19$.</p>` },
      { titulo: "e) ¿Qué se hace después?", puntos: 0.5, solucion: "<p>Se corren experimentos en esos puntos hasta que la respuesta deje de subir; alrededor del mejor se hace un nuevo diseño (central compuesto) para ajustar un modelo de segundo orden y encontrar el óptimo.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "b1", r: "cat({d <- data.frame(y = c(9, 14, 10, 19, 8, 12, 11, 20, 14, 13), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0), x2 = c(-1, -1, 1, 1, -1, -1, 1, 1, 0, 0)); coef(lm(y ~ x1 * x2, data = d))[2]})", esperado: 3.375, tol: 0.000050001 },
      { que: "LOF p", r: "cat({d <- data.frame(y = c(9, 14, 10, 19, 8, 12, 11, 20, 14, 13), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0), x2 = c(-1, -1, 1, 1, -1, -1, 1, 1, 0, 0)); m <- lm(y ~ x1 + x2, data = d); ce <- factor(paste(d$x1, d$x2)); sp <- sum((d$y - ave(d$y, ce))^2); gp <- nrow(d) - nlevels(ce); sl <- sum(resid(m)^2) - sp; gl <- m$df.residual - gp; pf((sl / gl) / (sp / gp), gl, gp, lower.tail = FALSE)})", esperado: 0.0383, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 22 (pp. 422–423)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d002",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 22 (pp. 422–423)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 22 · Anodizado: factorial con centro y primer orden (otro centro)",
    enunciado: `<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 22 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: las dos corridas al centro dieron 16 y 15 (en vez de 14 y 13).</p><p>En una empresa que anodiza artículos de aluminio se estudia cómo el pH y la temperatura afectan el espesor del anodizado.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>pH</th><th>Temperatura</th><th>Espesor</th></tr></thead><tbody><tr><td>$1{,}2$</td><td>$−8$</td><td>$9$</td></tr><tr><td>$1{,}8$</td><td>$−8$</td><td>$14$</td></tr><tr><td>$1{,}2$</td><td>$8$</td><td>$10$</td></tr><tr><td>$1{,}8$</td><td>$8$</td><td>$19$</td></tr><tr><td>$1{,}2$</td><td>$−8$</td><td>$8$</td></tr><tr><td>$1{,}8$</td><td>$−8$</td><td>$12$</td></tr><tr><td>$1{,}2$</td><td>$8$</td><td>$11$</td></tr><tr><td>$1{,}8$</td><td>$8$</td><td>$20$</td></tr><tr><td>$1{,}5$</td><td>$0$</td><td>$16$</td></tr><tr><td>$1{,}5$</td><td>$0$</td><td>$15$</td></tr></tbody></table></div><ol type="a"><li>¿Cómo se llama el diseño empleado?</li><li>¿Qué se gana con las repeticiones al centro?</li><li>Encuentre el mejor modelo que describe el espesor (interprete coeficientes, $t$, $R^2$).</li><li>Con ese modelo liste cinco puntos en la dirección de máximo ascenso, con un paso de 0,3 en el factor de mayor influencia.</li><li>Explique qué se hace después con esos puntos.</li></ol>`,
    codigoR: `datos <- data.frame(y = c(9, 14, 10, 19, 8, 12, 11, 20, 16, 15), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0), x2 = c(-1, -1, 1, 1, -1, -1, 1, 1, 0, 0))   # x1 = (pH − 1,5)/0,3 ; x2 = temperatura/8
m1 <- lm(y ~ x1 + x2, data = datos); summary(m1)
m2 <- lm(y ~ x1 * x2, data = datos); summary(m2)
library(rsm)
summary(rsm(y ~ FO(x1, x2), data = datos))   # falta de ajuste del primer orden`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
   Min     1Q Median     3Q    Max 
-2.650 -1.025  0.100  1.100  2.600 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  13.4000     0.5994  22.356 9.06e-08 ***
x1            3.3750     0.6702   5.036   0.0015 ** 
x2            2.1250     0.6702   3.171   0.0157 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 1.895 on 7 degrees of freedom
Multiple R-squared:  0.835,	Adjusted R-squared:  0.7878 
F-statistic: 17.71 on 2 and 7 DF,  p-value: 0.001826


Call:
lm(formula = y ~ x1 * x2, data = datos)

Residuals:
   Min     1Q Median     3Q    Max 
-1.525 -1.025 -0.025  0.350  2.600 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  13.4000     0.5004  26.778 1.79e-07 ***
x1            3.3750     0.5595   6.032 0.000938 ***
x2            2.1250     0.5595   3.798 0.008987 ** 
x1:x2         1.1250     0.5595   2.011 0.091055 .  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 1.582 on 6 degrees of freedom
Multiple R-squared:  0.9014,	Adjusted R-squared:  0.8521 
F-statistic: 18.29 on 3 and 6 DF,  p-value: 0.002017


Call:
rsm(formula = y ~ FO(x1, x2), data = datos)

            Estimate Std. Error t value  Pr(>|t|)    
(Intercept) 13.40000    0.59940 22.3555 9.063e-08 ***
x1           3.37500    0.67015  5.0362  0.001503 ** 
x2           2.12500    0.67015  3.1709  0.015688 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.835,	Adjusted R-squared:  0.7878 
F-statistic: 17.71 on 2 and 7 DF,  p-value: 0.001826

Analysis of Variance Table

Response: y
            Df Sum Sq Mean Sq F value   Pr(>F)
FO(x1, x2)   2 127.25  63.625  17.709 0.001826
Residuals    7  25.15   3.593                 
Lack of fit  2  21.15  10.575  13.219 0.010088
Pure error   5   4.00   0.800                 

Direction of steepest ascent (at radius 1):
       x1        x2 
0.8462328 0.5328133 

Corresponding increment in original units:
       x1        x2 
0.8462328 0.5328133`,
    salidaDe: `datos <- data.frame(y = c(9, 14, 10, 19, 8, 12, 11, 20, 16, 15), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0), x2 = c(-1, -1, 1, 1, -1, -1, 1, 1, 0, 0))   # x1 = (pH − 1,5)/0,3 ; x2 = temperatura/8
m1 <- lm(y ~ x1 + x2, data = datos); summary(m1)
m2 <- lm(y ~ x1 * x2, data = datos); summary(m2)
library(rsm)
summary(rsm(y ~ FO(x1, x2), data = datos))   # falta de ajuste del primer orden`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño", puntos: 1, solucion: "<p>Es un <strong>factorial $2^2$ con 2 réplicas más 2 puntos al centro</strong> (10 corridas): pH en 1,2 y 1,8, temperatura en −8 y 8, centro en (1,5; 0). Codificado: $x_1=(pH-1{,}5)/0{,}3$ y $x_2=T/8$, así cada factor va de −1 a +1.</p><p>Es el diseño típico para una <strong>primera exploración</strong>: con dos niveles solo se estiman efectos lineales e interacciones; el centro permite ver si hay curvatura.</p>" },
      { titulo: "b) ¿Qué se gana con el centro?", puntos: 1, solucion: String.raw`<p>Dos cosas: (1) las réplicas dan una estimación del <strong>error puro</strong> que no depende del modelo; (2) comparar la media del centro con la de las esquinas detecta <strong>curvatura</strong> sin agregar niveles a cada factor.</p><p>Aquí $\bar y_{centro}=15{,}5$ y $\bar y_{esquinas}=12{,}875$: diferencia 2,625. Si la superficie fuera un plano, ambas medias coincidirían.</p><p>Falta de ajuste del modelo de primer orden (sin interacción): $F=13{,}219$, $p=0{,}0101$ ⇒ se <strong>rechaza</strong> $H_0$. El plano no basta.</p>` },
      { titulo: "c) Mejor modelo", puntos: 2, solucion: String.raw`<p>Primer orden: $\hat{y}=13{,}4+3{,}375\,x_1+2{,}125\,x_2$, $R^2=0{,}835$.</p><p>Agregando la interacción: $\hat{y}=13{,}4+3{,}375\,x_1+2{,}125\,x_2+1{,}125\,x_1x_2$; $t_{x_1x_2}=2{,}011$, $p=0{,}0911$ ⇒ <strong>no se rechaza</strong> $H_0$. $R^2=0{,}9014$, $R^2_{aj}=0{,}8521$; falta de ajuste $F=13{,}781$, $p=0{,}0138$.</p><p>Mejor modelo: el de <strong>primer orden</strong>; la interacción no aporta.</p>` },
      { titulo: "d) Dirección de máximo ascenso (libro)", puntos: 1.5, solucion: String.raw`<p><strong>Esto viene del libro; la clase 8.2 no lo trabaja.</strong> En un modelo de primer orden, la dirección en que la respuesta sube más rápido es la del gradiente $(b_1,b_2)=(3{,}375;\ 2{,}125)$. Se avanza en el factor de mayor efecto ($x_1$, el pH) con paso $\Delta x_1=1$ (0,3 de pH) y el otro en proporción: $\Delta x_2=b_2/b_1=0{,}6296$ (5,037 grados).</p><p>Cinco puntos: pH $=1{,}8$, T $=5{,}04$; pH $=2{,}1$, T $=10{,}07$; pH $=2{,}4$, T $=15{,}11$; pH $=2{,}7$, T $=20{,}15$; pH $=3$, T $=25{,}19$.</p>` },
      { titulo: "e) ¿Qué se hace después?", puntos: 0.5, solucion: "<p>Se corren experimentos en esos puntos hasta que la respuesta deje de subir; alrededor del mejor se hace un nuevo diseño (central compuesto) para ajustar un modelo de segundo orden y encontrar el óptimo.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "b1", r: "cat({d <- data.frame(y = c(9, 14, 10, 19, 8, 12, 11, 20, 16, 15), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0), x2 = c(-1, -1, 1, 1, -1, -1, 1, 1, 0, 0)); coef(lm(y ~ x1 * x2, data = d))[2]})", esperado: 3.375, tol: 0.000050001 },
      { que: "LOF p", r: "cat({d <- data.frame(y = c(9, 14, 10, 19, 8, 12, 11, 20, 16, 15), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0), x2 = c(-1, -1, 1, 1, -1, -1, 1, 1, 0, 0)); m <- lm(y ~ x1 + x2, data = d); ce <- factor(paste(d$x1, d$x2)); sp <- sum((d$y - ave(d$y, ce))^2); gp <- nrow(d) - nlevels(ce); sl <- sum(resid(m)^2) - sp; gl <- m$df.residual - gp; pf((sl / gl) / (sp / gp), gl, gp, lower.tail = FALSE)})", esperado: 0.0101, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 22 (pp. 422–423)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d003",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 22 (pp. 422–423)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 22 · Anodizado: factorial con centro y primer orden (esquina alta)",
    enunciado: `<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 22 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: la combinación pH 1,8 y temperatura 8 dio 21 y 22 (en vez de 19 y 20).</p><p>En una empresa que anodiza artículos de aluminio se estudia cómo el pH y la temperatura afectan el espesor del anodizado.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>pH</th><th>Temperatura</th><th>Espesor</th></tr></thead><tbody><tr><td>$1{,}2$</td><td>$−8$</td><td>$9$</td></tr><tr><td>$1{,}8$</td><td>$−8$</td><td>$14$</td></tr><tr><td>$1{,}2$</td><td>$8$</td><td>$10$</td></tr><tr><td>$1{,}8$</td><td>$8$</td><td>$21$</td></tr><tr><td>$1{,}2$</td><td>$−8$</td><td>$8$</td></tr><tr><td>$1{,}8$</td><td>$−8$</td><td>$12$</td></tr><tr><td>$1{,}2$</td><td>$8$</td><td>$11$</td></tr><tr><td>$1{,}8$</td><td>$8$</td><td>$22$</td></tr><tr><td>$1{,}5$</td><td>$0$</td><td>$14$</td></tr><tr><td>$1{,}5$</td><td>$0$</td><td>$13$</td></tr></tbody></table></div><ol type="a"><li>¿Cómo se llama el diseño empleado?</li><li>¿Qué se gana con las repeticiones al centro?</li><li>Encuentre el mejor modelo que describe el espesor (interprete coeficientes, $t$, $R^2$).</li><li>Con ese modelo liste cinco puntos en la dirección de máximo ascenso, con un paso de 0,3 en el factor de mayor influencia.</li><li>Explique qué se hace después con esos puntos.</li></ol>`,
    codigoR: `datos <- data.frame(y = c(9, 14, 10, 21, 8, 12, 11, 22, 14, 13), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0), x2 = c(-1, -1, 1, 1, -1, -1, 1, 1, 0, 0))   # x1 = (pH − 1,5)/0,3 ; x2 = temperatura/8
m1 <- lm(y ~ x1 + x2, data = datos); summary(m1)
m2 <- lm(y ~ x1 * x2, data = datos); summary(m2)
library(rsm)
summary(rsm(y ~ FO(x1, x2), data = datos))   # falta de ajuste del primer orden`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2, data = datos)

Residuals:
   Min     1Q Median     3Q    Max 
-2.650 -1.025  0.100  1.100  2.100 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  13.4000     0.5994  22.356 9.06e-08 ***
x1            3.8750     0.6702   5.782 0.000676 ***
x2            2.6250     0.6702   3.917 0.005771 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 1.895 on 7 degrees of freedom
Multiple R-squared:  0.8745,	Adjusted R-squared:  0.8386 
F-statistic: 24.39 on 2 and 7 DF,  p-value: 0.0007002


Call:
lm(formula = y ~ x1 * x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-1.0250 -0.5250  0.0375  0.4750  0.9750 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  13.4000     0.2590  51.737 3.50e-09 ***
x1            3.8750     0.2896  13.382 1.08e-05 ***
x2            2.6250     0.2896   9.065 0.000101 ***
x1:x2         1.6250     0.2896   5.612 0.001366 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.819 on 6 degrees of freedom
Multiple R-squared:  0.9799,	Adjusted R-squared:  0.9699 
F-statistic: 97.58 on 3 and 6 DF,  p-value: 1.759e-05


Call:
rsm(formula = y ~ FO(x1, x2), data = datos)

            Estimate Std. Error t value  Pr(>|t|)    
(Intercept) 13.40000    0.59940 22.3555 9.063e-08 ***
x1           3.87500    0.67015  5.7822 0.0006757 ***
x2           2.62500    0.67015  3.9170 0.0057712 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.8745,	Adjusted R-squared:  0.8386 
F-statistic: 24.39 on 2 and 7 DF,  p-value: 0.0007002

Analysis of Variance Table

Response: y
            Df Sum Sq Mean Sq F value    Pr(>F)
FO(x1, x2)   2 175.25  87.625  24.389 0.0007002
Residuals    7  25.15   3.593                  
Lack of fit  2  21.15  10.575  13.219 0.0100880
Pure error   5   4.00   0.800                  

Direction of steepest ascent (at radius 1):
       x1        x2 
0.8279187 0.5608481 

Corresponding increment in original units:
       x1        x2 
0.8279187 0.5608481`,
    salidaDe: `datos <- data.frame(y = c(9, 14, 10, 21, 8, 12, 11, 22, 14, 13), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0), x2 = c(-1, -1, 1, 1, -1, -1, 1, 1, 0, 0))   # x1 = (pH − 1,5)/0,3 ; x2 = temperatura/8
m1 <- lm(y ~ x1 + x2, data = datos); summary(m1)
m2 <- lm(y ~ x1 * x2, data = datos); summary(m2)
library(rsm)
summary(rsm(y ~ FO(x1, x2), data = datos))   # falta de ajuste del primer orden`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño", puntos: 1, solucion: "<p>Es un <strong>factorial $2^2$ con 2 réplicas más 2 puntos al centro</strong> (10 corridas): pH en 1,2 y 1,8, temperatura en −8 y 8, centro en (1,5; 0). Codificado: $x_1=(pH-1{,}5)/0{,}3$ y $x_2=T/8$, así cada factor va de −1 a +1.</p><p>Es el diseño típico para una <strong>primera exploración</strong>: con dos niveles solo se estiman efectos lineales e interacciones; el centro permite ver si hay curvatura.</p>" },
      { titulo: "b) ¿Qué se gana con el centro?", puntos: 1, solucion: String.raw`<p>Dos cosas: (1) las réplicas dan una estimación del <strong>error puro</strong> que no depende del modelo; (2) comparar la media del centro con la de las esquinas detecta <strong>curvatura</strong> sin agregar niveles a cada factor.</p><p>Aquí $\bar y_{centro}=13{,}5$ y $\bar y_{esquinas}=13{,}375$: diferencia 0,125. Si la superficie fuera un plano, ambas medias coincidirían.</p><p>Falta de ajuste del modelo de primer orden (sin interacción): $F=13{,}219$, $p=0{,}0101$ ⇒ se <strong>rechaza</strong> $H_0$. El plano no basta.</p>` },
      { titulo: "c) Mejor modelo", puntos: 2, solucion: String.raw`<p>Primer orden: $\hat{y}=13{,}4+3{,}875\,x_1+2{,}625\,x_2$, $R^2=0{,}8745$.</p><p>Agregando la interacción: $\hat{y}=13{,}4+3{,}875\,x_1+2{,}625\,x_2+1{,}625\,x_1x_2$; $t_{x_1x_2}=5{,}612$, $p=0{,}0014$ ⇒ se <strong>rechaza</strong> $H_0$. $R^2=0{,}9799$, $R^2_{aj}=0{,}9699$; falta de ajuste $F=0{,}031$, $p=0{,}8666$.</p><p>Mejor modelo: <strong>con interacción</strong>. Interpretación: $b_1=3{,}875$ ⇒ subir el pH de 1,2 a 1,8 (de −1 a +1) aumenta el espesor en $2b_1=7{,}75$ con la temperatura en su nivel medio; $b_{12}>0$ ⇒ ese efecto es mayor con temperatura alta: $\partial\hat y/\partial x_1=3{,}875+1{,}625x_2$.</p>` },
      { titulo: "d) Dirección de máximo ascenso (libro)", puntos: 1.5, solucion: String.raw`<p><strong>Esto viene del libro; la clase 8.2 no lo trabaja.</strong> En un modelo de primer orden, la dirección en que la respuesta sube más rápido es la del gradiente $(b_1,b_2)=(3{,}875;\ 2{,}625)$. Se avanza en el factor de mayor efecto ($x_1$, el pH) con paso $\Delta x_1=1$ (0,3 de pH) y el otro en proporción: $\Delta x_2=b_2/b_1=0{,}6774$ (5,419 grados).</p><p>Cinco puntos: pH $=1{,}8$, T $=5{,}42$; pH $=2{,}1$, T $=10{,}84$; pH $=2{,}4$, T $=16{,}26$; pH $=2{,}7$, T $=21{,}68$; pH $=3$, T $=27{,}1$.</p>` },
      { titulo: "e) ¿Qué se hace después?", puntos: 0.5, solucion: "<p>Se corren experimentos en esos puntos hasta que la respuesta deje de subir; alrededor del mejor se hace un nuevo diseño (central compuesto) para ajustar un modelo de segundo orden y encontrar el óptimo.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "b1", r: "cat({d <- data.frame(y = c(9, 14, 10, 21, 8, 12, 11, 22, 14, 13), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0), x2 = c(-1, -1, 1, 1, -1, -1, 1, 1, 0, 0)); coef(lm(y ~ x1 * x2, data = d))[2]})", esperado: 3.875, tol: 0.000050001 },
      { que: "LOF p", r: "cat({d <- data.frame(y = c(9, 14, 10, 21, 8, 12, 11, 22, 14, 13), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0), x2 = c(-1, -1, 1, 1, -1, -1, 1, 1, 0, 0)); m <- lm(y ~ x1 + x2, data = d); ce <- factor(paste(d$x1, d$x2)); sp <- sum((d$y - ave(d$y, ce))^2); gp <- nrow(d) - nlevels(ce); sl <- sum(resid(m)^2) - sp; gl <- m$df.residual - gp; pf((sl / gl) / (sp / gp), gl, gp, lower.tail = FALSE)})", esperado: 0.0101, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 22 (pp. 422–423)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d004",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 12, ej. 23 · Tiempo de filtración: central compuesto",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 12, ej. 23 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Un ingeniero químico midió el tiempo de filtración $Y$ en función de la temperatura ($x_1$) y la presión ($x_2$), en unidades codificadas.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_1$</th><th>$x_2$</th><th>$Y$</th></tr></thead><tbody><tr><td>$−1$</td><td>$−1$</td><td>$54$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$45$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$32$</td></tr><tr><td>$1$</td><td>$1$</td><td>$47$</td></tr><tr><td>$−1{,}414$</td><td>$0$</td><td>$50$</td></tr><tr><td>$1{,}414$</td><td>$0$</td><td>$53$</td></tr><tr><td>$0$</td><td>$−1{,}414$</td><td>$47$</td></tr><tr><td>$0$</td><td>$1{,}414$</td><td>$51$</td></tr><tr><td>$0$</td><td>$0$</td><td>$41$</td></tr><tr><td>$0$</td><td>$0$</td><td>$39$</td></tr><tr><td>$0$</td><td>$0$</td><td>$44$</td></tr><tr><td>$0$</td><td>$0$</td><td>$42$</td></tr><tr><td>$0$</td><td>$0$</td><td>$40$</td></tr></tbody></table></div><ol type="a"><li>Represente el diseño y diga qué diseño es y qué propiedades tiene.</li><li>Ajuste un modelo de segundo orden y compruebe si es adecuado.</li><li>¿Qué tipo de superficie describe el modelo?</li><li>¿Cuál es el mejor punto posible de operación?</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para minimizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(54, 45, 32, 47, 50, 53, 47, 51, 41, 39, 44, 42, 40), x1 = c(-1, -1, 1, 1, -1.414, 1.414, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, 1, -1, 1, 0, 0, -1.414, 1.414, 0, 0, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-5.9482 -1.4093  0.1117  2.7993  7.1620 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)   41.201      2.101  19.614 2.24e-07 ***
x1            -1.970      1.661  -1.186   0.2742    
x2             1.457      1.661   0.877   0.4094    
I(x1^2)        3.713      1.781   2.084   0.0756 .  
I(x2^2)        2.462      1.781   1.382   0.2094    
x1:x2          6.000      2.349   2.555   0.0378 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 4.697 on 7 degrees of freedom
Multiple R-squared:  0.6714,	Adjusted R-squared:  0.4367 
F-statistic: 2.861 on 5 and 7 DF,  p-value: 0.1016


Call:
rsm(formula = y ~ SO(x1, x2), data = datos)

            Estimate Std. Error t value  Pr(>|t|)    
(Intercept)  41.2007     2.1006 19.6138 2.236e-07 ***
x1           -1.9700     1.6608 -1.1862   0.27424    
x2            1.4572     1.6608  0.8774   0.40936    
x1:x2         6.0000     2.3485  2.5548   0.03784 *  
x1^2          3.7126     1.7813  2.0843   0.07561 .  
x2^2          2.4622     1.7813  1.3823   0.20938    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.6714,	Adjusted R-squared:  0.4367 
F-statistic: 2.861 on 5 and 7 DF,  p-value: 0.1016

Analysis of Variance Table

Response: y
            Df  Sum Sq Mean Sq F value  Pr(>F)
FO(x1, x2)   2  48.029  24.015  1.0885 0.38761
TWI(x1, x2)  1 144.000 144.000  6.5269 0.03784
PQ(x1, x2)   2 123.532  61.766  2.7996 0.12783
Residuals    7 154.439  22.063                
Lack of fit  3 139.639  46.546 12.5800 0.01666
Pure error   4  14.800   3.700                

Stationary point of response surface:
       x1        x2 
 32.65991 -40.08929 

Eigenanalysis:
eigen() decomposition
$values
[1] 6.15185275 0.02295039

$vectors
         [,1]       [,2]
x1 -0.7758909  0.6308671
x2 -0.6308671 -0.7758909`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(54, 45, 32, 47, 50, 53, 47, 51, 41, 39, 44, 42, 40), x1 = c(-1, -1, 1, 1, -1.414, 1.414, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, 1, -1, 1, 0, 0, -1.414, 1.414, 0, 0, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p><strong>Diseño central compuesto</strong> para $k=2$: 4 esquinas del $2^2$, 4 puntos axiales a $\alpha=1{,}414=\sqrt[4]{4}$ (rotable: la varianza de la predicción depende solo de la distancia al centro) y 5 réplicas del centro (error puro). 5 niveles por factor ⇒ permite estimar curvatura.</p><p>Los datos ya vienen en <strong>unidades codificadas</strong> (−1, 0, +1 y los axiales), así que se trabaja directo con ellas: todos los factores quedan en la misma escala y sus coeficientes se pueden comparar.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=41{,}2-1{,}97\,x_1+1{,}457\,x_2+3{,}713\,x_1^2+2{,}462\,x_2^2+6\,x_1x_2$$</p><p>Términos: lineales $x_1,x_2$; cuadráticos $x_1^2,x_2^2$ (curvatura); interacciones $x_1x_2$. Significativos al 5 %: $x_1x_2$. Ningún cuadrático es significativo (sin evidencia clara de curvatura); hay <strong>interacción</strong>: el efecto de un factor depende del nivel del otro.</p><p>$F$ global $=2{,}86$ con $(5,7)$ gl, $p=0{,}1016$ ⇒ <strong>no se rechaza</strong> $H_0$: el modelo en su conjunto no es significativo (con pocos grados de libertad para el error). $R^2=0{,}6714$ (explica el 67,1 % de la variabilidad) y $R^2_{aj}=0{,}4367$, bastante menor: hay términos que no aportan. Falta de ajuste (con las réplicas del centro como error puro): $F=12{,}58$, $p=0{,}0167$ ⇒ hay falta de ajuste: el modelo de segundo orden se queda corto para describir la superficie.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-1{,}97+7{,}4252x_1+6x_2=0\\\frac{\partial\hat y}{\partial x_2}=1{,}4572+6x_1+4{,}9244x_2=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-1{,}97;\ 1{,}4572)$ y $B=\begin{pmatrix}3{,}7126&3\\3&2{,}4622\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=32{,}66,\ x_2^*=-40{,}089$. Valor predicho: $\hat y(\mathbf x_s)=-20{,}18$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}7{,}4252&6\\6&4{,}9244\end{pmatrix}$.</p><p>$\det H=(7{,}4252)(4{,}9244)-(6)^2=0{,}5647$ &gt; 0 y $h_{11}=7{,}4252$ &gt; 0 ⇒ definida positiva ⇒ <strong>mínimo</strong>.</p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=6{,}1519;\ 0{,}023$, todos positivos ⇒ <strong>mínimo</strong> (la superficie es un «valle»). Un valor propio es casi 0: en esa dirección la superficie es casi plana (una «cordillera»), así que hay muchas combinaciones con respuesta parecida.</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca minimizar (supuesto: el enunciado no lo dice explícitamente), pero el punto estacionario cae <strong>fuera</strong> de la región experimental ($x_1^*=32{,}66$, $x_2^*=-40{,}09$). Como dice la clase, entonces el óptimo está en la <strong>frontera</strong> de la región: se evalúa $\hat y$ en las esquinas y bordes (o en una grilla fina, que es la idea del análisis de cordillera del libro), sin salir de la zona estudiada.</p><p>Evaluando $\hat y$ en una grilla sobre la región del factorial, $[-1;\ 1]^2$: el menor valor está en $x_1=1,\ x_2=-1$, es decir temperatura (codificada) ≈ 1 , presión (codificada) ≈ −1 , con $\hat y\approx37{,}948$. Si se quiere ir más allá, se hace un nuevo experimento en esa dirección y se confirma con corridas reales.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(54, 45, 32, 47, 50, 53, 47, 51, 41, 39, 44, 42, 40), x1 = c(-1, -1, 1, 1, -1.414, 1.414, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, 1, -1, 1, 0, 0, -1.414, 1.414, 0, 0, 0, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); B <- matrix(0, 2, 2); co <- coef(m); vs <- c("x1", "x2"); for (i in 1:2) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 2) for (j in (i + 1):2) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: 32.66, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(54, 45, 32, 47, 50, 53, 47, 51, 41, 39, 44, 42, 40), x1 = c(-1, -1, 1, 1, -1.414, 1.414, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, 1, -1, 1, 0, 0, -1.414, 1.414, 0, 0, 0, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); summary(m)$r.squared})", esperado: 0.6714, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 23 (p. 423)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d005",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 23 (p. 423)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 23 · Tiempo de filtración: central compuesto (otro centro)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 23 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: las 5 réplicas del centro dieron 37, 35, 38, 36 y 39.</p><p>Un ingeniero químico midió el tiempo de filtración $Y$ en función de la temperatura ($x_1$) y la presión ($x_2$), en unidades codificadas.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_1$</th><th>$x_2$</th><th>$Y$</th></tr></thead><tbody><tr><td>$−1$</td><td>$−1$</td><td>$54$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$45$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$32$</td></tr><tr><td>$1$</td><td>$1$</td><td>$47$</td></tr><tr><td>$−1{,}414$</td><td>$0$</td><td>$50$</td></tr><tr><td>$1{,}414$</td><td>$0$</td><td>$53$</td></tr><tr><td>$0$</td><td>$−1{,}414$</td><td>$47$</td></tr><tr><td>$0$</td><td>$1{,}414$</td><td>$51$</td></tr><tr><td>$0$</td><td>$0$</td><td>$37$</td></tr><tr><td>$0$</td><td>$0$</td><td>$35$</td></tr><tr><td>$0$</td><td>$0$</td><td>$38$</td></tr><tr><td>$0$</td><td>$0$</td><td>$36$</td></tr><tr><td>$0$</td><td>$0$</td><td>$39$</td></tr></tbody></table></div><ol type="a"><li>Represente el diseño y diga qué diseño es y qué propiedades tiene.</li><li>Ajuste un modelo de segundo orden y compruebe si es adecuado.</li><li>¿Qué tipo de superficie describe el modelo?</li><li>¿Cuál es el mejor punto posible de operación?</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para minimizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(54, 45, 32, 47, 50, 53, 47, 51, 37, 35, 38, 36, 39), x1 = c(-1, -1, 1, 1, -1.414, 1.414, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, 1, -1, 1, 0, 0, -1.414, 1.414, 0, 0, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)

Residuals:
   Min     1Q Median     3Q    Max 
-5.949 -1.409  0.111  1.999  7.163 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)   37.001      2.068  17.893 4.21e-07 ***
x1            -1.970      1.635  -1.205   0.2674    
x2             1.457      1.635   0.891   0.4024    
I(x1^2)        5.813      1.754   3.315   0.0129 *  
I(x2^2)        4.563      1.754   2.602   0.0353 *  
x1:x2          6.000      2.312   2.595   0.0357 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 4.624 on 7 degrees of freedom
Multiple R-squared:  0.7796,	Adjusted R-squared:  0.6222 
F-statistic: 4.952 on 5 and 7 DF,  p-value: 0.02944


Call:
rsm(formula = y ~ SO(x1, x2), data = datos)

            Estimate Std. Error t value  Pr(>|t|)    
(Intercept)  37.0007     2.0679 17.8929 4.205e-07 ***
x1           -1.9700     1.6349 -1.2050   0.26737    
x2            1.4572     1.6349  0.8913   0.40237    
x1:x2         6.0000     2.3120  2.5952   0.03568 *  
x1^2          5.8129     1.7535  3.3150   0.01285 *  
x2^2          4.5625     1.7535  2.6019   0.03533 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.7796,	Adjusted R-squared:  0.6222 
F-statistic: 4.952 on 5 and 7 DF,  p-value: 0.02944

Analysis of Variance Table

Response: y
            Df Sum Sq Mean Sq F value   Pr(>F)
FO(x1, x2)   2  48.03  24.015  1.1232 0.377527
TWI(x1, x2)  1 144.00 144.000  6.7349 0.035675
PQ(x1, x2)   2 337.38 168.690  7.8897 0.016086
Residuals    7 149.67  21.381                 
Lack of fit  3 139.67  46.556 18.6224 0.008182
Pure error   4  10.00   2.500                 

Stationary point of response surface:
        x1         x2 
 0.3812462 -0.4103751 

Eigenanalysis:
eigen() decomposition
$values
[1] 8.252170 2.123267

$vectors
         [,1]       [,2]
x1 -0.7758909  0.6308671
x2 -0.6308671 -0.7758909`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(54, 45, 32, 47, 50, 53, 47, 51, 37, 35, 38, 36, 39), x1 = c(-1, -1, 1, 1, -1.414, 1.414, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, 1, -1, 1, 0, 0, -1.414, 1.414, 0, 0, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p><strong>Diseño central compuesto</strong> para $k=2$: 4 esquinas del $2^2$, 4 puntos axiales a $\alpha=1{,}414=\sqrt[4]{4}$ (rotable: la varianza de la predicción depende solo de la distancia al centro) y 5 réplicas del centro (error puro). 5 niveles por factor ⇒ permite estimar curvatura.</p><p>Los datos ya vienen en <strong>unidades codificadas</strong> (−1, 0, +1 y los axiales), así que se trabaja directo con ellas: todos los factores quedan en la misma escala y sus coeficientes se pueden comparar.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=37-1{,}97\,x_1+1{,}457\,x_2+5{,}813\,x_1^2+4{,}563\,x_2^2+6\,x_1x_2$$</p><p>Términos: lineales $x_1,x_2$; cuadráticos $x_1^2,x_2^2$ (curvatura); interacciones $x_1x_2$. Significativos al 5 %: $x_1^2$, $x_2^2$, $x_1x_2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); hay <strong>interacción</strong>: el efecto de un factor depende del nivel del otro.</p><p>$F$ global $=4{,}95$ con $(5,7)$ gl, $p=0{,}0294$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}7796$ (explica el 78 % de la variabilidad) y $R^2_{aj}=0{,}6222$, bastante menor: hay términos que no aportan. Falta de ajuste (con las réplicas del centro como error puro): $F=18{,}622$, $p=0{,}0082$ ⇒ hay falta de ajuste: el modelo de segundo orden se queda corto para describir la superficie.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-1{,}97+11{,}6258x_1+6x_2=0\\\frac{\partial\hat y}{\partial x_2}=1{,}4572+6x_1+9{,}1251x_2=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-1{,}97;\ 1{,}4572)$ y $B=\begin{pmatrix}5{,}8129&3\\3&4{,}5625\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=0{,}381,\ x_2^*=-0{,}41$. Valor predicho: $\hat y(\mathbf x_s)=36{,}326$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}11{,}6258&6\\6&9{,}1251\end{pmatrix}$.</p><p>$\det H=(11{,}6258)(9{,}1251)-(6)^2=70{,}0863$ &gt; 0 y $h_{11}=11{,}6258$ &gt; 0 ⇒ definida positiva ⇒ <strong>mínimo</strong>.</p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=8{,}2522;\ 2{,}1233$, todos positivos ⇒ <strong>mínimo</strong> (la superficie es un «valle»).</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca minimizar (supuesto: el enunciado no lo dice explícitamente) y el punto estacionario es un mínimo que cae <strong>dentro</strong> de la región experimental (todas las $|x_i^*|\le1{,}414$): es el óptimo. temperatura (codificada) ≈ 0,381 , presión (codificada) ≈ −0,41 , con $\hat y\approx36{,}326$.</p><p>Siguiente paso: confirmar con corridas reales en ese punto.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(54, 45, 32, 47, 50, 53, 47, 51, 37, 35, 38, 36, 39), x1 = c(-1, -1, 1, 1, -1.414, 1.414, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, 1, -1, 1, 0, 0, -1.414, 1.414, 0, 0, 0, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); B <- matrix(0, 2, 2); co <- coef(m); vs <- c("x1", "x2"); for (i in 1:2) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 2) for (j in (i + 1):2) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: 0.381, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(54, 45, 32, 47, 50, 53, 47, 51, 37, 35, 38, 36, 39), x1 = c(-1, -1, 1, 1, -1.414, 1.414, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, 1, -1, 1, 0, 0, -1.414, 1.414, 0, 0, 0, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); summary(m)$r.squared})", esperado: 0.7796, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 23 (p. 423)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d006",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 23 (p. 423)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 23 · Tiempo de filtración: central compuesto (dos datos cambiados)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 23 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: el punto axial (1,414; 0) dio 58 y la esquina (1, −1) dio 36.</p><p>Un ingeniero químico midió el tiempo de filtración $Y$ en función de la temperatura ($x_1$) y la presión ($x_2$), en unidades codificadas.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_1$</th><th>$x_2$</th><th>$Y$</th></tr></thead><tbody><tr><td>$−1$</td><td>$−1$</td><td>$54$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$45$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$36$</td></tr><tr><td>$1$</td><td>$1$</td><td>$47$</td></tr><tr><td>$−1{,}414$</td><td>$0$</td><td>$50$</td></tr><tr><td>$1{,}414$</td><td>$0$</td><td>$58$</td></tr><tr><td>$0$</td><td>$−1{,}414$</td><td>$47$</td></tr><tr><td>$0$</td><td>$1{,}414$</td><td>$51$</td></tr><tr><td>$0$</td><td>$0$</td><td>$41$</td></tr><tr><td>$0$</td><td>$0$</td><td>$39$</td></tr><tr><td>$0$</td><td>$0$</td><td>$44$</td></tr><tr><td>$0$</td><td>$0$</td><td>$42$</td></tr><tr><td>$0$</td><td>$0$</td><td>$40$</td></tr></tbody></table></div><ol type="a"><li>Represente el diseño y diga qué diseño es y qué propiedades tiene.</li><li>Ajuste un modelo de segundo orden y compruebe si es adecuado.</li><li>¿Qué tipo de superficie describe el modelo?</li><li>¿Cuál es el mejor punto posible de operación?</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para minimizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(54, 45, 36, 47, 50, 58, 47, 51, 41, 39, 44, 42, 40), x1 = c(-1, -1, 1, 1, -1.414, 1.414, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, 1, -1, 1, 0, 0, -1.414, 1.414, 0, 0, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-6.8717 -1.8272 -0.0439  2.3550  7.8303 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  41.2007     2.2790  18.079 3.92e-07 ***
x1           -0.5861     1.8018  -0.325   0.7545    
x2            0.9571     1.8018   0.531   0.6117    
I(x1^2)       4.9003     1.9325   2.536   0.0389 *  
I(x2^2)       2.3996     1.9325   1.242   0.2543    
x1:x2         5.0000     2.5480   1.962   0.0905 .  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 5.096 on 7 degrees of freedom
Multiple R-squared:  0.6219,	Adjusted R-squared:  0.3518 
F-statistic: 2.303 on 5 and 7 DF,  p-value: 0.1535


Call:
rsm(formula = y ~ SO(x1, x2), data = datos)

            Estimate Std. Error t value  Pr(>|t|)    
(Intercept) 41.20073    2.27896 18.0788 3.917e-07 ***
x1          -0.58609    1.80181 -0.3253    0.7545    
x2           0.95714    1.80181  0.5312    0.6117    
x1:x2        5.00000    2.54795  1.9624    0.0905 .  
x1^2         4.90034    1.93250  2.5358    0.0389 *  
x2^2         2.39958    1.93250  1.2417    0.2543    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.6219,	Adjusted R-squared:  0.3518 
F-statistic: 2.303 on 5 and 7 DF,  p-value: 0.1535

Analysis of Variance Table

Response: y
            Df  Sum Sq Mean Sq F value  Pr(>F)
FO(x1, x2)   2  10.075   5.038  0.1940 0.82794
TWI(x1, x2)  1 100.000 100.000  3.8509 0.09050
PQ(x1, x2)   2 188.916  94.458  3.6375 0.08257
Residuals    7 181.777  25.968                
Lack of fit  3 166.977  55.659 15.0430 0.01209
Pure error   4  14.800   3.700                

Stationary point of response surface:
        x1         x2 
 0.3448342 -0.5587042 

Eigenanalysis:
eigen() decomposition
$values
[1] 6.4452158 0.8547081

$vectors
         [,1]       [,2]
x1 -0.8506826  0.5256797
x2 -0.5256797 -0.8506826`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(54, 45, 36, 47, 50, 58, 47, 51, 41, 39, 44, 42, 40), x1 = c(-1, -1, 1, 1, -1.414, 1.414, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, 1, -1, 1, 0, 0, -1.414, 1.414, 0, 0, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p><strong>Diseño central compuesto</strong> para $k=2$: 4 esquinas del $2^2$, 4 puntos axiales a $\alpha=1{,}414=\sqrt[4]{4}$ (rotable: la varianza de la predicción depende solo de la distancia al centro) y 5 réplicas del centro (error puro). 5 niveles por factor ⇒ permite estimar curvatura.</p><p>Los datos ya vienen en <strong>unidades codificadas</strong> (−1, 0, +1 y los axiales), así que se trabaja directo con ellas: todos los factores quedan en la misma escala y sus coeficientes se pueden comparar.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=41{,}2-0{,}5861\,x_1+0{,}9571\,x_2+4{,}9\,x_1^2+2{,}4\,x_2^2+5\,x_1x_2$$</p><p>Términos: lineales $x_1,x_2$; cuadráticos $x_1^2,x_2^2$ (curvatura); interacciones $x_1x_2$. Significativos al 5 %: $x_1^2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); ninguna interacción es significativa: cada factor actúa por separado.</p><p>$F$ global $=2{,}3$ con $(5,7)$ gl, $p=0{,}1535$ ⇒ <strong>no se rechaza</strong> $H_0$: el modelo en su conjunto no es significativo (con pocos grados de libertad para el error). $R^2=0{,}6219$ (explica el 62,2 % de la variabilidad) y $R^2_{aj}=0{,}3518$, bastante menor: hay términos que no aportan. Falta de ajuste (con las réplicas del centro como error puro): $F=15{,}043$, $p=0{,}0121$ ⇒ hay falta de ajuste: el modelo de segundo orden se queda corto para describir la superficie.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-0{,}5861+9{,}8007x_1+5x_2=0\\\frac{\partial\hat y}{\partial x_2}=0{,}9571+5x_1+4{,}7992x_2=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-0{,}5861;\ 0{,}9571)$ y $B=\begin{pmatrix}4{,}9003&2{,}5\\2{,}5&2{,}3996\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=0{,}345,\ x_2^*=-0{,}559$. Valor predicho: $\hat y(\mathbf x_s)=40{,}832$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}9{,}8007&5\\5&4{,}7992\end{pmatrix}$.</p><p>$\det H=(9{,}8007)(4{,}7992)-(5)^2=22{,}0351$ &gt; 0 y $h_{11}=9{,}8007$ &gt; 0 ⇒ definida positiva ⇒ <strong>mínimo</strong>.</p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=6{,}4452;\ 0{,}8547$, todos positivos ⇒ <strong>mínimo</strong> (la superficie es un «valle»).</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca minimizar (supuesto: el enunciado no lo dice explícitamente) y el punto estacionario es un mínimo que cae <strong>dentro</strong> de la región experimental (todas las $|x_i^*|\le1{,}414$): es el óptimo. temperatura (codificada) ≈ 0,345 , presión (codificada) ≈ −0,559 , con $\hat y\approx40{,}832$.</p><p>Siguiente paso: confirmar con corridas reales en ese punto.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(54, 45, 36, 47, 50, 58, 47, 51, 41, 39, 44, 42, 40), x1 = c(-1, -1, 1, 1, -1.414, 1.414, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, 1, -1, 1, 0, 0, -1.414, 1.414, 0, 0, 0, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); B <- matrix(0, 2, 2); co <- coef(m); vs <- c("x1", "x2"); for (i in 1:2) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 2) for (j in (i + 1):2) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: 0.345, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(54, 45, 36, 47, 50, 58, 47, 51, 41, 39, 44, 42, 40), x1 = c(-1, -1, 1, 1, -1.414, 1.414, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, 1, -1, 1, 0, 0, -1.414, 1.414, 0, 0, 0, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); summary(m)$r.squared})", esperado: 0.6219, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 23 (p. 423)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d007",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c06",
    dificultad: 3,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 12, ej. 24 · Índice de solubilidad en agua: Box-Behnken",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 12, ej. 24 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>En un proceso de extrusión de harina de amaranto interesa <strong>minimizar</strong> el índice de solubilidad en agua (ISA). Factores (codificados): temperatura $x_1$, humedad $x_2$ y velocidad de tornillo $x_3$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_1$</th><th>$x_2$</th><th>$x_3$</th><th>ISA</th></tr></thead><tbody><tr><td>$−1$</td><td>$−1$</td><td>$0$</td><td>$15{,}87$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$0$</td><td>$12{,}7$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$0$</td><td>$14{,}8$</td></tr><tr><td>$1$</td><td>$1$</td><td>$0$</td><td>$13{,}53$</td></tr><tr><td>$−1$</td><td>$0$</td><td>$−1$</td><td>$15{,}1$</td></tr><tr><td>$1$</td><td>$0$</td><td>$−1$</td><td>$12{,}47$</td></tr><tr><td>$−1$</td><td>$0$</td><td>$1$</td><td>$11{,}37$</td></tr><tr><td>$1$</td><td>$0$</td><td>$1$</td><td>$10{,}27$</td></tr><tr><td>$0$</td><td>$−1$</td><td>$−1$</td><td>$15{,}33$</td></tr><tr><td>$0$</td><td>$1$</td><td>$−1$</td><td>$15{,}53$</td></tr><tr><td>$0$</td><td>$−1$</td><td>$1$</td><td>$15{,}17$</td></tr><tr><td>$0$</td><td>$1$</td><td>$1$</td><td>$14{,}17$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$13{,}85$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$13{,}93$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$13{,}77$</td></tr></tbody></table></div><ol type="a"><li>Represente el diseño, nómbrelo y diga cuándo se recomienda.</li><li>Ajuste un modelo de segundo orden y verifique su calidad.</li><li>¿Qué tipo de superficie describe el modelo?</li><li>Determine el mejor punto posible dentro de la región experimental.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para minimizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(15.87, 12.7, 14.8, 13.53, 15.1, 12.47, 11.37, 10.27, 15.33, 15.53, 15.17, 14.17, 13.85, 13.93, 13.77), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, 1, -1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, -1, 1, 1, -1, -1, 1, 1, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + 
    x1:x2 + x1:x3 + x2:x3, data = datos)

Residuals:
         1          2          3          4          5          6          7 
 1.875e-02 -1.588e-01  1.588e-01 -1.875e-02  4.625e-01  6.400e-01 -6.400e-01 
         8          9         10         11         12         13         14 
-4.625e-01 -4.812e-01 -6.213e-01  6.213e-01  4.812e-01  7.286e-17  8.000e-02 
        15 
-8.000e-02 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  13.8500     0.4120  33.617 4.38e-07 ***
x1           -1.0212     0.2523  -4.048  0.00985 ** 
x2           -0.1300     0.2523  -0.515  0.62832    
x3           -0.9312     0.2523  -3.691  0.01413 *  
I(x1^2)      -1.1863     0.3714  -3.194  0.02415 *  
I(x2^2)       1.5613     0.3714   4.204  0.00846 ** 
I(x3^2)      -0.3612     0.3714  -0.973  0.37534    
x1:x2         0.4750     0.3568   1.331  0.24056    
x1:x3         0.3825     0.3568   1.072  0.33269    
x2:x3        -0.3000     0.3568  -0.841  0.43879    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.7136 on 5 degrees of freedom
Multiple R-squared:  0.9287,	Adjusted R-squared:  0.8004 
F-statistic: 7.237 on 9 and 5 DF,  p-value: 0.02108


Call:
rsm(formula = y ~ SO(x1, x2, x3), data = datos)

            Estimate Std. Error t value  Pr(>|t|)    
(Intercept) 13.85000    0.41199 33.6174 4.379e-07 ***
x1          -1.02125    0.25229 -4.0479  0.009846 ** 
x2          -0.13000    0.25229 -0.5153  0.628323    
x3          -0.93125    0.25229 -3.6912  0.014128 *  
x1:x2        0.47500    0.35679  1.3313  0.240558    
x1:x3        0.38250    0.35679  1.0721  0.332692    
x2:x3       -0.30000    0.35679 -0.8408  0.438795    
x1^2        -1.18625    0.37136 -3.1943  0.024148 *  
x2^2         1.56125    0.37136  4.2041  0.008456 ** 
x3^2        -0.36125    0.37136 -0.9728  0.375344    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.9287,	Adjusted R-squared:  0.8004 
F-statistic: 7.237 on 9 and 5 DF,  p-value: 0.02108

Analysis of Variance Table

Response: y
                Df  Sum Sq Mean Sq  F value   Pr(>F)
FO(x1, x2, x3)   3 15.4166  5.1389  10.0920 0.014606
TWI(x1, x2, x3)  3  1.8477  0.6159   1.2095 0.396533
PQ(x1, x2, x3)   3 15.9007  5.3002  10.4089 0.013687
Residuals        5  2.5460  0.5092                  
Lack of fit      3  2.5332  0.8444 131.9388 0.007532
Pure error       2  0.0128  0.0064                  

Stationary point of response surface:
         x1          x2          x3 
-0.69941262 -0.01094538 -1.65465981 

Eigenanalysis:
eigen() decomposition
$values
[1]  1.5907737 -0.3237028 -1.2533209

$vectors
          [,1]       [,2]        [,3]
x1 -0.08032455 0.22893092  0.97012298
x2 -0.99440922 0.04852312 -0.09378596
x3  0.06854390 0.97223255 -0.22375342`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(15.87, 12.7, 14.8, 13.53, 15.1, 12.47, 11.37, 10.27, 15.33, 15.53, 15.17, 14.17, 13.85, 13.93, 13.77), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, 1, -1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, -1, 1, 1, -1, -1, 1, 1, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: "<p><strong>Diseño de Box-Behnken</strong> para $k=3$: tres factores a tres niveles (−1, 0, +1); 12 puntos en el medio de las aristas del cubo (un $2^2$ por cada par de factores con el tercero en 0) y 3 centros. Nunca pone todos los factores en un extremo a la vez; se recomienda cuando las esquinas son caras o riesgosas.</p><p>Los datos ya vienen en <strong>unidades codificadas</strong> (−1, 0, +1 y los axiales), así que se trabaja directo con ellas: todos los factores quedan en la misma escala y sus coeficientes se pueden comparar.</p>" },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=13{,}85-1{,}021\,x_1-0{,}13\,x_2-0{,}9313\,x_3-1{,}186\,x_1^2+1{,}561\,x_2^2-0{,}3613\,x_3^2+0{,}475\,x_1x_2+0{,}3825\,x_1x_3-0{,}3\,x_2x_3$$</p><p>Términos: lineales $x_1,x_2,x_3$; cuadráticos $x_1^2,x_2^2,x_3^2$ (curvatura); interacciones $x_1x_2,x_1x_3,x_2x_3$. Significativos al 5 %: $x_1$, $x_3$, $x_1^2$, $x_2^2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); ninguna interacción es significativa: cada factor actúa por separado.</p><p>$F$ global $=7{,}24$ con $(9,5)$ gl, $p=0{,}0211$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}9287$ (explica el 92,9 % de la variabilidad) y $R^2_{aj}=0{,}8004$, bastante menor: hay términos que no aportan. Falta de ajuste (con las réplicas del centro como error puro): $F=131{,}939$, $p=0{,}0075$ ⇒ hay falta de ajuste: el modelo de segundo orden se queda corto para describir la superficie.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-1{,}0213-2{,}3725x_1+0{,}475x_2+0{,}3825x_3=0\\\frac{\partial\hat y}{\partial x_2}=-0{,}13+0{,}475x_1+3{,}1225x_2-0{,}3x_3=0\\\frac{\partial\hat y}{\partial x_3}=-0{,}9313+0{,}3825x_1-0{,}3x_2-0{,}7225x_3=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-1{,}0213;\ -0{,}13;\ -0{,}9313)$ y $B=\begin{pmatrix}-1{,}1863&0{,}2375&0{,}1913\\0{,}2375&1{,}5613&-0{,}15\\0{,}1913&-0{,}15&-0{,}3613\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=-0{,}699,\ x_2^*=-0{,}011,\ x_3^*=-1{,}655$. Valor predicho: $\hat y(\mathbf x_s)=14{,}978$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-2{,}3725&0{,}475&0{,}3825\\0{,}475&3{,}1225&-0{,}3\\0{,}3825&-0{,}3&-0{,}7225\end{pmatrix}$.</p><p></p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=1{,}5908;\ -0{,}3237;\ -1{,}2533$, de signos mezclados ⇒ <strong>punto silla</strong>: sube en una dirección y baja en otra.</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca minimizar, pero el punto estacionario es un <strong>punto silla</strong>, no un mínimo y además cae <strong>fuera</strong> de la región experimental ($x_3^*=-1{,}65$). Como dice la clase, entonces el óptimo está en la <strong>frontera</strong> de la región: se evalúa $\hat y$ en las esquinas y bordes (o en una grilla fina, que es la idea del análisis de cordillera del libro), sin salir de la zona estudiada.</p><p>Evaluando $\hat y$ en una grilla sobre la región del factorial, $[-1;\ 1]^3$: el menor valor está en $x_1=1,\ x_2=0,\ x_3=1$, es decir temperatura ≈ 1 (cod.), humedad ≈ 0 (cod.), velocidad ≈ 1 (cod.), con $\hat y\approx10{,}733$. Si se quiere ir más allá, se hace un nuevo experimento en esa dirección y se confirma con corridas reales.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(15.87, 12.7, 14.8, 13.53, 15.1, 12.47, 11.37, 10.27, 15.33, 15.53, 15.17, 14.17, 13.85, 13.93, 13.77), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, 1, -1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, -1, 1, 1, -1, -1, 1, 1, 0, 0, 0)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); B <- matrix(0, 3, 3); co <- coef(m); vs <- c("x1", "x2", "x3"); for (i in 1:3) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 3) for (j in (i + 1):3) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: -0.699, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(15.87, 12.7, 14.8, 13.53, 15.1, 12.47, 11.37, 10.27, 15.33, 15.53, 15.17, 14.17, 13.85, 13.93, 13.77), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, 1, -1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, -1, 1, 1, -1, -1, 1, 1, 0, 0, 0)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); summary(m)$r.squared})", esperado: 0.9287, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 24 (pp. 423–424)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d008",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c06",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 24 (pp. 423–424)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 24 · Índice de solubilidad en agua: Box-Behnken (otro centro)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 24 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: los 3 centros dieron 13,25; 13,33 y 13,17.</p><p>En un proceso de extrusión de harina de amaranto interesa <strong>minimizar</strong> el índice de solubilidad en agua (ISA). Factores (codificados): temperatura $x_1$, humedad $x_2$ y velocidad de tornillo $x_3$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_1$</th><th>$x_2$</th><th>$x_3$</th><th>ISA</th></tr></thead><tbody><tr><td>$−1$</td><td>$−1$</td><td>$0$</td><td>$15{,}87$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$0$</td><td>$12{,}7$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$0$</td><td>$14{,}8$</td></tr><tr><td>$1$</td><td>$1$</td><td>$0$</td><td>$13{,}53$</td></tr><tr><td>$−1$</td><td>$0$</td><td>$−1$</td><td>$15{,}1$</td></tr><tr><td>$1$</td><td>$0$</td><td>$−1$</td><td>$12{,}47$</td></tr><tr><td>$−1$</td><td>$0$</td><td>$1$</td><td>$11{,}37$</td></tr><tr><td>$1$</td><td>$0$</td><td>$1$</td><td>$10{,}27$</td></tr><tr><td>$0$</td><td>$−1$</td><td>$−1$</td><td>$15{,}33$</td></tr><tr><td>$0$</td><td>$1$</td><td>$−1$</td><td>$15{,}53$</td></tr><tr><td>$0$</td><td>$−1$</td><td>$1$</td><td>$15{,}17$</td></tr><tr><td>$0$</td><td>$1$</td><td>$1$</td><td>$14{,}17$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$13{,}25$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$13{,}33$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$13{,}17$</td></tr></tbody></table></div><ol type="a"><li>Represente el diseño, nómbrelo y diga cuándo se recomienda.</li><li>Ajuste un modelo de segundo orden y verifique su calidad.</li><li>¿Qué tipo de superficie describe el modelo?</li><li>Determine el mejor punto posible dentro de la región experimental.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para minimizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(15.87, 12.7, 14.8, 13.53, 15.1, 12.47, 11.37, 10.27, 15.33, 15.53, 15.17, 14.17, 13.25, 13.33, 13.17), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, 1, -1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, -1, 1, 1, -1, -1, 1, 1, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + 
    x1:x2 + x1:x3 + x2:x3, data = datos)

Residuals:
         1          2          3          4          5          6          7 
 1.875e-02 -1.588e-01  1.588e-01 -1.875e-02  4.625e-01  6.400e-01 -6.400e-01 
         8          9         10         11         12         13         14 
-4.625e-01 -4.813e-01 -6.213e-01  6.213e-01  4.813e-01  1.895e-16  8.000e-02 
        15 
-8.000e-02 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept) 13.25000    0.41199  32.161 5.46e-07 ***
x1          -1.02125    0.25229  -4.048  0.00985 ** 
x2          -0.13000    0.25229  -0.515  0.62832    
x3          -0.93125    0.25229  -3.691  0.01413 *  
I(x1^2)     -0.88625    0.37136  -2.386  0.06266 .  
I(x2^2)      1.86125    0.37136   5.012  0.00406 ** 
I(x3^2)     -0.06125    0.37136  -0.165  0.87546    
x1:x2        0.47500    0.35679   1.331  0.24056    
x1:x3        0.38250    0.35679   1.072  0.33269    
x2:x3       -0.30000    0.35679  -0.841  0.43879    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.7136 on 5 degrees of freedom
Multiple R-squared:  0.9304,	Adjusted R-squared:  0.8052 
F-statistic: 7.431 on 9 and 5 DF,  p-value: 0.01991


Call:
rsm(formula = y ~ SO(x1, x2, x3), data = datos)

            Estimate Std. Error t value Pr(>|t|)    
(Intercept) 13.25000    0.41199 32.1610 5.46e-07 ***
x1          -1.02125    0.25229 -4.0479 0.009846 ** 
x2          -0.13000    0.25229 -0.5153 0.628323    
x3          -0.93125    0.25229 -3.6912 0.014128 *  
x1:x2        0.47500    0.35679  1.3313 0.240558    
x1:x3        0.38250    0.35679  1.0721 0.332692    
x2:x3       -0.30000    0.35679 -0.8408 0.438795    
x1^2        -0.88625    0.37136 -2.3865 0.062660 .  
x2^2         1.86125    0.37136  5.0120 0.004063 ** 
x3^2        -0.06125    0.37136 -0.1649 0.875457    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.9304,	Adjusted R-squared:  0.8052 
F-statistic: 7.431 on 9 and 5 DF,  p-value: 0.01991

Analysis of Variance Table

Response: y
                Df  Sum Sq Mean Sq  F value   Pr(>F)
FO(x1, x2, x3)   3 15.4166  5.1389  10.0920 0.014606
TWI(x1, x2, x3)  3  1.8477  0.6159   1.2095 0.396533
PQ(x1, x2, x3)   3 16.7911  5.5970  10.9917 0.012196
Residuals        5  2.5460  0.5092                  
Lack of fit      3  2.5332  0.8444 131.9388 0.007532
Pure error       2  0.0128  0.0064                  

Stationary point of response surface:
        x1         x2         x3 
 -5.920554  -1.095832 -23.404997 

Eigenanalysis:
eigen() decomposition
$values
[1]  1.89077372 -0.02370284 -0.95332088

$vectors
          [,1]       [,2]        [,3]
x1 -0.08032455 0.22893092  0.97012298
x2 -0.99440922 0.04852312 -0.09378596
x3  0.06854390 0.97223255 -0.22375342`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(15.87, 12.7, 14.8, 13.53, 15.1, 12.47, 11.37, 10.27, 15.33, 15.53, 15.17, 14.17, 13.25, 13.33, 13.17), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, 1, -1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, -1, 1, 1, -1, -1, 1, 1, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: "<p><strong>Diseño de Box-Behnken</strong> para $k=3$: tres factores a tres niveles (−1, 0, +1); 12 puntos en el medio de las aristas del cubo (un $2^2$ por cada par de factores con el tercero en 0) y 3 centros. Nunca pone todos los factores en un extremo a la vez; se recomienda cuando las esquinas son caras o riesgosas.</p><p>Los datos ya vienen en <strong>unidades codificadas</strong> (−1, 0, +1 y los axiales), así que se trabaja directo con ellas: todos los factores quedan en la misma escala y sus coeficientes se pueden comparar.</p>" },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=13{,}25-1{,}021\,x_1-0{,}13\,x_2-0{,}9313\,x_3-0{,}8863\,x_1^2+1{,}861\,x_2^2-0{,}06125\,x_3^2+0{,}475\,x_1x_2+0{,}3825\,x_1x_3-0{,}3\,x_2x_3$$</p><p>Términos: lineales $x_1,x_2,x_3$; cuadráticos $x_1^2,x_2^2,x_3^2$ (curvatura); interacciones $x_1x_2,x_1x_3,x_2x_3$. Significativos al 5 %: $x_1$, $x_3$, $x_2^2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); ninguna interacción es significativa: cada factor actúa por separado.</p><p>$F$ global $=7{,}43$ con $(9,5)$ gl, $p=0{,}0199$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}9304$ (explica el 93 % de la variabilidad) y $R^2_{aj}=0{,}8052$, bastante menor: hay términos que no aportan. Falta de ajuste (con las réplicas del centro como error puro): $F=131{,}939$, $p=0{,}0075$ ⇒ hay falta de ajuste: el modelo de segundo orden se queda corto para describir la superficie.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-1{,}0213-1{,}7725x_1+0{,}475x_2+0{,}3825x_3=0\\\frac{\partial\hat y}{\partial x_2}=-0{,}13+0{,}475x_1+3{,}7225x_2-0{,}3x_3=0\\\frac{\partial\hat y}{\partial x_3}=-0{,}9313+0{,}3825x_1-0{,}3x_2-0{,}1225x_3=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-1{,}0213;\ -0{,}13;\ -0{,}9313)$ y $B=\begin{pmatrix}-0{,}8863&0{,}2375&0{,}1913\\0{,}2375&1{,}8613&-0{,}15\\0{,}1913&-0{,}15&-0{,}0613\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=-5{,}921,\ x_2^*=-1{,}096,\ x_3^*=-23{,}405$. Valor predicho: $\hat y(\mathbf x_s)=27{,}242$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-1{,}7725&0{,}475&0{,}3825\\0{,}475&3{,}7225&-0{,}3\\0{,}3825&-0{,}3&-0{,}1225\end{pmatrix}$.</p><p></p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=1{,}8908;\ -0{,}0237;\ -0{,}9533$, de signos mezclados ⇒ <strong>punto silla</strong>: sube en una dirección y baja en otra. Un valor propio es casi 0: en esa dirección la superficie es casi plana (una «cordillera»), así que hay muchas combinaciones con respuesta parecida.</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca minimizar, pero el punto estacionario es un <strong>punto silla</strong>, no un mínimo y además cae <strong>fuera</strong> de la región experimental ($x_1^*=-5{,}92$, $x_2^*=-1{,}1$, $x_3^*=-23{,}4$). Como dice la clase, entonces el óptimo está en la <strong>frontera</strong> de la región: se evalúa $\hat y$ en las esquinas y bordes (o en una grilla fina, que es la idea del análisis de cordillera del libro), sin salir de la zona estudiada.</p><p>Evaluando $\hat y$ en una grilla sobre la región del factorial, $[-1;\ 1]^3$: el menor valor está en $x_1=1,\ x_2=0,\ x_3=1$, es decir temperatura ≈ 1 (cod.), humedad ≈ 0 (cod.), velocidad ≈ 1 (cod.), con $\hat y\approx10{,}733$. Si se quiere ir más allá, se hace un nuevo experimento en esa dirección y se confirma con corridas reales.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(15.87, 12.7, 14.8, 13.53, 15.1, 12.47, 11.37, 10.27, 15.33, 15.53, 15.17, 14.17, 13.25, 13.33, 13.17), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, 1, -1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, -1, 1, 1, -1, -1, 1, 1, 0, 0, 0)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); B <- matrix(0, 3, 3); co <- coef(m); vs <- c("x1", "x2", "x3"); for (i in 1:3) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 3) for (j in (i + 1):3) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: -5.921, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(15.87, 12.7, 14.8, 13.53, 15.1, 12.47, 11.37, 10.27, 15.33, 15.53, 15.17, 14.17, 13.25, 13.33, 13.17), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, 1, -1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, -1, 1, 1, -1, -1, 1, 1, 0, 0, 0)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); summary(m)$r.squared})", esperado: 0.9304, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 24 (pp. 423–424)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d009",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c06",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 24 (pp. 423–424)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 24 · Índice de solubilidad en agua: Box-Behnken (dos datos cambiados)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 24 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: las corridas (−1, 0, 1) y (0, −1, −1) dieron 12,37 y 16,20.</p><p>En un proceso de extrusión de harina de amaranto interesa <strong>minimizar</strong> el índice de solubilidad en agua (ISA). Factores (codificados): temperatura $x_1$, humedad $x_2$ y velocidad de tornillo $x_3$.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_1$</th><th>$x_2$</th><th>$x_3$</th><th>ISA</th></tr></thead><tbody><tr><td>$−1$</td><td>$−1$</td><td>$0$</td><td>$15{,}87$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$0$</td><td>$12{,}7$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$0$</td><td>$14{,}8$</td></tr><tr><td>$1$</td><td>$1$</td><td>$0$</td><td>$13{,}53$</td></tr><tr><td>$−1$</td><td>$0$</td><td>$−1$</td><td>$15{,}1$</td></tr><tr><td>$1$</td><td>$0$</td><td>$−1$</td><td>$12{,}47$</td></tr><tr><td>$−1$</td><td>$0$</td><td>$1$</td><td>$12{,}37$</td></tr><tr><td>$1$</td><td>$0$</td><td>$1$</td><td>$10{,}27$</td></tr><tr><td>$0$</td><td>$−1$</td><td>$−1$</td><td>$16{,}2$</td></tr><tr><td>$0$</td><td>$1$</td><td>$−1$</td><td>$15{,}53$</td></tr><tr><td>$0$</td><td>$−1$</td><td>$1$</td><td>$15{,}17$</td></tr><tr><td>$0$</td><td>$1$</td><td>$1$</td><td>$14{,}17$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$13{,}85$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$13{,}93$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$13{,}77$</td></tr></tbody></table></div><ol type="a"><li>Represente el diseño, nómbrelo y diga cuándo se recomienda.</li><li>Ajuste un modelo de segundo orden y verifique su calidad.</li><li>¿Qué tipo de superficie describe el modelo?</li><li>Determine el mejor punto posible dentro de la región experimental.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para minimizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(15.87, 12.7, 14.8, 13.53, 15.1, 12.47, 12.37, 10.27, 16.2, 15.53, 15.17, 14.17, 13.85, 13.93, 13.77), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, 1, -1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, -1, 1, 1, -1, -1, 1, 1, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + 
    x1:x2 + x1:x3 + x2:x3, data = datos)

Residuals:
         1          2          3          4          5          6          7 
-2.150e-01 -1.425e-01  1.425e-01  2.150e-01  3.538e-01  2.812e-01 -2.812e-01 
         8          9         10         11         12         13         14 
-3.538e-01 -1.387e-01 -4.963e-01  4.963e-01  1.387e-01  1.665e-16  8.000e-02 
        15 
-8.000e-02 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  13.8500     0.2690  51.488 5.22e-08 ***
x1           -1.1462     0.1647  -6.959 0.000942 ***
x2           -0.2387     0.1647  -1.449 0.206911    
x3           -0.9150     0.1647  -5.555 0.002600 ** 
I(x1^2)      -1.1700     0.2425  -4.825 0.004776 ** 
I(x2^2)       1.5450     0.2425   6.372 0.001408 ** 
I(x3^2)      -0.1275     0.2425  -0.526 0.621478    
x1:x2         0.4750     0.2330   2.039 0.096991 .  
x1:x3         0.1325     0.2330   0.569 0.594103    
x2:x3        -0.0825     0.2330  -0.354 0.737677    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.4659 on 5 degrees of freedom
Multiple R-squared:  0.9688,	Adjusted R-squared:  0.9127 
F-statistic: 17.27 on 9 and 5 DF,  p-value: 0.002953


Call:
rsm(formula = y ~ SO(x1, x2, x3), data = datos)

            Estimate Std. Error t value  Pr(>|t|)    
(Intercept) 13.85000    0.26899 51.4879 5.224e-08 ***
x1          -1.14625    0.16473 -6.9586 0.0009421 ***
x2          -0.23875    0.16473 -1.4494 0.2069114    
x3          -0.91500    0.16473 -5.5547 0.0025995 ** 
x1:x2        0.47500    0.23296  2.0390 0.0969914 .  
x1:x3        0.13250    0.23296  0.5688 0.5941034    
x2:x3       -0.08250    0.23296 -0.3541 0.7376768    
x1^2        -1.17000    0.24247 -4.8254 0.0047759 ** 
x2^2         1.54500    0.24247  6.3720 0.0014082 ** 
x3^2        -0.12750    0.24247 -0.5258 0.6214780    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.9688,	Adjusted R-squared:  0.9127 
F-statistic: 17.27 on 9 and 5 DF,  p-value: 0.002953

Analysis of Variance Table

Response: y
                Df  Sum Sq Mean Sq F value   Pr(>F)
FO(x1, x2, x3)   3 17.6649  5.8883 27.1257 0.001608
TWI(x1, x2, x3)  3  0.9999  0.3333  1.5355 0.314399
PQ(x1, x2, x3)   3 15.0724  5.0241 23.1447 0.002325
Residuals        5  1.0854  0.2171                 
Lack of fit      3  1.0726  0.3575 55.8633 0.017637
Pure error       2  0.0128  0.0064                 

Stationary point of response surface:
         x1          x2          x3 
-0.69909301  0.07855167 -3.97690328 

Eigenanalysis:
eigen() decomposition
$values
[1]  1.566358 -0.123704 -1.195154

$vectors
          [,1]       [,2]        [,3]
x1 -0.08594809 0.06661653  0.99407000
x2 -0.99608047 0.01518075 -0.08713924
x3  0.02089564 0.99766316 -0.06505067`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(15.87, 12.7, 14.8, 13.53, 15.1, 12.47, 12.37, 10.27, 16.2, 15.53, 15.17, 14.17, 13.85, 13.93, 13.77), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, 1, -1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, -1, 1, 1, -1, -1, 1, 1, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: "<p><strong>Diseño de Box-Behnken</strong> para $k=3$: tres factores a tres niveles (−1, 0, +1); 12 puntos en el medio de las aristas del cubo (un $2^2$ por cada par de factores con el tercero en 0) y 3 centros. Nunca pone todos los factores en un extremo a la vez; se recomienda cuando las esquinas son caras o riesgosas.</p><p>Los datos ya vienen en <strong>unidades codificadas</strong> (−1, 0, +1 y los axiales), así que se trabaja directo con ellas: todos los factores quedan en la misma escala y sus coeficientes se pueden comparar.</p>" },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=13{,}85-1{,}146\,x_1-0{,}2388\,x_2-0{,}915\,x_3-1{,}17\,x_1^2+1{,}545\,x_2^2-0{,}1275\,x_3^2+0{,}475\,x_1x_2+0{,}1325\,x_1x_3-0{,}0825\,x_2x_3$$</p><p>Términos: lineales $x_1,x_2,x_3$; cuadráticos $x_1^2,x_2^2,x_3^2$ (curvatura); interacciones $x_1x_2,x_1x_3,x_2x_3$. Significativos al 5 %: $x_1$, $x_3$, $x_1^2$, $x_2^2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); ninguna interacción es significativa: cada factor actúa por separado.</p><p>$F$ global $=17{,}27$ con $(9,5)$ gl, $p=0{,}003$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}9688$ (explica el 96,9 % de la variabilidad) y $R^2_{aj}=0{,}9127$. Falta de ajuste (con las réplicas del centro como error puro): $F=55{,}863$, $p=0{,}0176$ ⇒ hay falta de ajuste: el modelo de segundo orden se queda corto para describir la superficie.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-1{,}1463-2{,}34x_1+0{,}475x_2+0{,}1325x_3=0\\\frac{\partial\hat y}{\partial x_2}=-0{,}2388+0{,}475x_1+3{,}09x_2-0{,}0825x_3=0\\\frac{\partial\hat y}{\partial x_3}=-0{,}915+0{,}1325x_1-0{,}0825x_2-0{,}255x_3=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-1{,}1463;\ -0{,}2388;\ -0{,}915)$ y $B=\begin{pmatrix}-1{,}17&0{,}2375&0{,}0663\\0{,}2375&1{,}545&-0{,}0413\\0{,}0663&-0{,}0413&-0{,}1275\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=-0{,}699,\ x_2^*=0{,}079,\ x_3^*=-3{,}977$. Valor predicho: $\hat y(\mathbf x_s)=16{,}061$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-2{,}34&0{,}475&0{,}1325\\0{,}475&3{,}09&-0{,}0825\\0{,}1325&-0{,}0825&-0{,}255\end{pmatrix}$.</p><p></p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=1{,}5664;\ -0{,}1237;\ -1{,}1952$, de signos mezclados ⇒ <strong>punto silla</strong>: sube en una dirección y baja en otra.</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca minimizar, pero el punto estacionario es un <strong>punto silla</strong>, no un mínimo y además cae <strong>fuera</strong> de la región experimental ($x_3^*=-3{,}98$). Como dice la clase, entonces el óptimo está en la <strong>frontera</strong> de la región: se evalúa $\hat y$ en las esquinas y bordes (o en una grilla fina, que es la idea del análisis de cordillera del libro), sin salir de la zona estudiada.</p><p>Evaluando $\hat y$ en una grilla sobre la región del factorial, $[-1;\ 1]^3$: el menor valor está en $x_1=1,\ x_2=-0{,}05,\ x_3=1$, es decir temperatura ≈ 1 (cod.), humedad ≈ −0,05 (cod.), velocidad ≈ 1 (cod.), con $\hat y\approx10{,}62$. Si se quiere ir más allá, se hace un nuevo experimento en esa dirección y se confirma con corridas reales.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(15.87, 12.7, 14.8, 13.53, 15.1, 12.47, 12.37, 10.27, 16.2, 15.53, 15.17, 14.17, 13.85, 13.93, 13.77), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, 1, -1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, -1, 1, 1, -1, -1, 1, 1, 0, 0, 0)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); B <- matrix(0, 3, 3); co <- coef(m); vs <- c("x1", "x2", "x3"); for (i in 1:3) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 3) for (j in (i + 1):3) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: -0.699, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(15.87, 12.7, 14.8, 13.53, 15.1, 12.47, 12.37, 10.27, 16.2, 15.53, 15.17, 14.17, 13.85, 13.93, 13.77), x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, 1, -1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, -1, 1, 1, -1, -1, 1, 1, 0, 0, 0)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); summary(m)$r.squared})", esperado: 0.9688, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 24 (pp. 423–424)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d010",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 12, ej. 25 · Producción de colorante: central compuesto en unidades reales",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 12, ej. 25 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Se busca maximizar la producción de un colorante natural en función de la concentración de carbono y la temperatura (°C). Las corridas están en unidades reales.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Carbono</th><th>Temperatura (°C)</th><th>Producción</th></tr></thead><tbody><tr><td>$9$</td><td>$17$</td><td>$5707$</td></tr><tr><td>$13$</td><td>$17$</td><td>$5940$</td></tr><tr><td>$9$</td><td>$25$</td><td>$3015$</td></tr><tr><td>$13$</td><td>$25$</td><td>$2673$</td></tr><tr><td>$8{,}17$</td><td>$21$</td><td>$5804$</td></tr><tr><td>$13{,}8$</td><td>$21$</td><td>$6700$</td></tr><tr><td>$11$</td><td>$15{,}34$</td><td>$5310$</td></tr><tr><td>$11$</td><td>$26{,}66$</td><td>$725$</td></tr><tr><td>$11$</td><td>$21$</td><td>$7521$</td></tr><tr><td>$11$</td><td>$21$</td><td>$7642$</td></tr><tr><td>$11$</td><td>$21$</td><td>$7500$</td></tr><tr><td>$11$</td><td>$21$</td><td>$7545$</td></tr></tbody></table></div><ol type="a"><li>Represente el diseño en el plano (condiciones reales) y nómbrelo.</li><li>Ajuste un modelo de segundo orden y depúrelo.</li><li>¿El modelo describe adecuadamente la variación observada?</li><li>Encuentre las condiciones que maximizan la producción del colorante.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para maximizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(5707, 5940, 3015, 2673, 5804, 6700, 5310, 725, 7521, 7642, 7500, 7545), x1 = c(-1, 1, -1, 1, -1.415, 1.4, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, -1.415, 1.415, 0, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-379.08  -61.76  -20.88   84.85  388.55 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  7553.88     136.21  55.457 2.31e-09 ***
x1            138.94      96.55   1.439 0.200197    
x2          -1554.98      96.29 -16.149 3.59e-06 ***
I(x1^2)      -733.14     108.46  -6.760 0.000512 ***
I(x2^2)     -2339.34     107.55 -21.752 6.17e-07 ***
x1:x2        -143.75     136.22  -1.055 0.331910    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 272.4 on 6 degrees of freedom
Multiple R-squared:  0.992,	Adjusted R-squared:  0.9853 
F-statistic: 148.7 on 5 and 6 DF,  p-value: 3.336e-06


Call:
rsm(formula = y ~ SO(x1, x2), data = datos)

             Estimate Std. Error  t value  Pr(>|t|)    
(Intercept)  7553.884    136.213  55.4565 2.309e-09 ***
x1            138.942     96.553   1.4390 0.2001972    
x2          -1554.982     96.292 -16.1486 3.586e-06 ***
x1:x2        -143.750    136.215  -1.0553 0.3319103    
x1^2         -733.140    108.459  -6.7596 0.0005116 ***
x2^2        -2339.337    107.547 -21.7518 6.165e-07 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.992,	Adjusted R-squared:  0.9853 
F-statistic: 148.7 on 5 and 6 DF,  p-value: 3.336e-06

Analysis of Variance Table

Response: y
            Df   Sum Sq  Mean Sq  F value    Pr(>F)
FO(x1, x2)   2 19518001  9759001 131.4903 1.110e-05
TWI(x1, x2)  1    82656    82656   1.1137  0.331910
PQ(x1, x2)   2 35580846 17790423 239.7037 1.889e-06
Residuals    6   445310    74218                   
Lack of fit  3   433496   144499  36.6934  0.007277
Pure error   3    11814     3938                   

Stationary point of response surface:
        x1         x2 
 0.1277263 -0.3362797 

Eigenanalysis:
eigen() decomposition
$values
[1]  -729.9303 -2342.5464

$vectors
          [,1]       [,2]
x1 -0.99900426 0.04461486
x2  0.04461486 0.99900426`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(5707, 5940, 3015, 2673, 5804, 6700, 5310, 725, 7521, 7642, 7500, 7545), x1 = c(-1, 1, -1, 1, -1.415, 1.4, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, -1.415, 1.415, 0, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p><strong>Central compuesto</strong> ($k=2$): esquinas en carbono 9/13 y temperatura 17/25; puntos axiales en 8,17/13,8 y 15,34/26,66, que codificados quedan en $\pm1{,}414$ (rotable); 4 réplicas del centro (11; 21).</p><p>Codificación: $x_1=\dfrac{C-11}{2}$, $x_2=\dfrac{T-21}{4}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=7554+138{,}9\,x_1-1555\,x_2-733{,}1\,x_1^2-2339\,x_2^2-143{,}8\,x_1x_2$$</p><p>Términos: lineales $x_1,x_2$; cuadráticos $x_1^2,x_2^2$ (curvatura); interacciones $x_1x_2$. Significativos al 5 %: $x_2$, $x_1^2$, $x_2^2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); ninguna interacción es significativa: cada factor actúa por separado.</p><p>$F$ global $=148{,}7$ con $(5,6)$ gl, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}992$ (explica el 99,2 % de la variabilidad) y $R^2_{aj}=0{,}9853$. Falta de ajuste (con las réplicas del centro como error puro): $F=36{,}693$, $p=0{,}0073$ ⇒ hay falta de ajuste: el modelo de segundo orden se queda corto para describir la superficie.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=138{,}9423-1466{,}2803x_1-143{,}75x_2=0\\\frac{\partial\hat y}{\partial x_2}=-1554{,}9819-143{,}75x_1-4678{,}6731x_2=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(138{,}9423;\ -1554{,}9819)$ y $B=\begin{pmatrix}-733{,}1402&-71{,}875\\-71{,}875&-2339{,}3365\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=0{,}128,\ x_2^*=-0{,}336$ ⇒ en unidades reales carbono $=11+2(0{,}128)=11{,}255$ ; temperatura $=21+4(-0{,}336)=19{,}655$ °C. Valor predicho: $\hat y(\mathbf x_s)=7824{,}212$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-1466{,}2803&-143{,}75\\-143{,}75&-4678{,}6731\end{pmatrix}$.</p><p>$\det H=(-1466{,}2803)(-4678{,}6731)-(-143{,}75)^2=6839582{,}211$ &gt; 0 y $h_{11}=-1466{,}2803$ &lt; 0 ⇒ definida negativa ⇒ <strong>máximo</strong>.</p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=-729{,}9303;\ -2342{,}5464$, todos negativos ⇒ <strong>máximo</strong> (la superficie es una «loma»).</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca maximizar y el punto estacionario es un máximo que cae <strong>dentro</strong> de la región experimental (todas las $|x_i^*|\le1{,}414$): es el óptimo. carbono ≈ 11,255 , temperatura ≈ 19,655 °C, con $\hat y\approx7824{,}212$.</p><p>Siguiente paso: confirmar con corridas reales en ese punto.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(5707, 5940, 3015, 2673, 5804, 6700, 5310, 725, 7521, 7642, 7500, 7545), x1 = c(-1, 1, -1, 1, -1.415, 1.4, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, -1.415, 1.415, 0, 0, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); B <- matrix(0, 2, 2); co <- coef(m); vs <- c("x1", "x2"); for (i in 1:2) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 2) for (j in (i + 1):2) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: 0.128, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(5707, 5940, 3015, 2673, 5804, 6700, 5310, 725, 7521, 7642, 7500, 7545), x1 = c(-1, 1, -1, 1, -1.415, 1.4, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, -1.415, 1.415, 0, 0, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); summary(m)$r.squared})", esperado: 0.992, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 25 (p. 424)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d011",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 25 (p. 424)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 25 · Producción de colorante: central compuesto en unidades reales (otro axial)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 25 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: el axial de temperatura alta (26,66 °C) produjo 1 925 (en vez de 725).</p><p>Se busca maximizar la producción de un colorante natural en función de la concentración de carbono y la temperatura (°C). Las corridas están en unidades reales.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Carbono</th><th>Temperatura (°C)</th><th>Producción</th></tr></thead><tbody><tr><td>$9$</td><td>$17$</td><td>$5707$</td></tr><tr><td>$13$</td><td>$17$</td><td>$5940$</td></tr><tr><td>$9$</td><td>$25$</td><td>$3015$</td></tr><tr><td>$13$</td><td>$25$</td><td>$2673$</td></tr><tr><td>$8{,}17$</td><td>$21$</td><td>$5804$</td></tr><tr><td>$13{,}8$</td><td>$21$</td><td>$6700$</td></tr><tr><td>$11$</td><td>$15{,}34$</td><td>$5310$</td></tr><tr><td>$11$</td><td>$26{,}66$</td><td>$1925$</td></tr><tr><td>$11$</td><td>$21$</td><td>$7521$</td></tr><tr><td>$11$</td><td>$21$</td><td>$7642$</td></tr><tr><td>$11$</td><td>$21$</td><td>$7500$</td></tr><tr><td>$11$</td><td>$21$</td><td>$7545$</td></tr></tbody></table></div><ol type="a"><li>Represente el diseño en el plano (condiciones reales) y nómbrelo.</li><li>Ajuste un modelo de segundo orden y depúrelo.</li><li>¿El modelo describe adecuadamente la variación observada?</li><li>Encuentre las condiciones que maximizan la producción del colorante.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para maximizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(5707, 5940, 3015, 2673, 5804, 6700, 5310, 1925, 7521, 7642, 7500, 7545), x1 = c(-1, 1, -1, 1, -1.415, 1.4, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, -1.415, 1.415, 0, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-609.10 -110.49    2.94   87.84  538.76 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)   7554.5      215.7  35.024 3.61e-08 ***
x1             138.1      152.9   0.903 0.401244    
x2           -1342.8      152.5  -8.807 0.000119 ***
I(x1^2)       -809.5      171.7  -4.713 0.003281 ** 
I(x2^2)      -2114.4      170.3 -12.416 1.67e-05 ***
x1:x2         -143.7      215.7  -0.666 0.529913    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 431.4 on 6 degrees of freedom
Multiple R-squared:  0.9754,	Adjusted R-squared:  0.955 
F-statistic: 47.66 on 5 and 6 DF,  p-value: 9.452e-05


Call:
rsm(formula = y ~ SO(x1, x2), data = datos)

            Estimate Std. Error  t value  Pr(>|t|)    
(Intercept)  7554.51     215.70  35.0236 3.611e-08 ***
x1            138.09     152.89   0.9032  0.401244    
x2          -1342.85     152.48  -8.8066  0.000119 ***
x1:x2        -143.75     215.70  -0.6664  0.529913    
x1^2         -809.49     171.75  -4.7132  0.003281 ** 
x2^2        -2114.42     170.30 -12.4155 1.667e-05 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.9754,	Adjusted R-squared:  0.955 
F-statistic: 47.66 on 5 and 6 DF,  p-value: 9.452e-05

Analysis of Variance Table

Response: y
            Df   Sum Sq  Mean Sq F value    Pr(>F)
FO(x1, x2)   2 14597913  7298956 39.2187 0.0003588
TWI(x1, x2)  1    82656    82656  0.4441 0.5299130
PQ(x1, x2)   2 29673190 14836595 79.7199  4.77e-05
Residuals    6  1116654   186109                  
Lack of fit  3  1104840   368280 93.5196 0.0018415
Pure error   3    11814     3938                  

Stationary point of response surface:
        x1         x2 
 0.1138328 -0.3214157 

Eigenanalysis:
eigen() decomposition
$values
[1]  -805.5394 -2118.3637

$vectors
          [,1]       [,2]
x1 -0.99849566 0.05483086
x2  0.05483086 0.99849566`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(5707, 5940, 3015, 2673, 5804, 6700, 5310, 1925, 7521, 7642, 7500, 7545), x1 = c(-1, 1, -1, 1, -1.415, 1.4, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, -1.415, 1.415, 0, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p><strong>Central compuesto</strong> ($k=2$): esquinas en carbono 9/13 y temperatura 17/25; puntos axiales en 8,17/13,8 y 15,34/26,66, que codificados quedan en $\pm1{,}414$ (rotable); 4 réplicas del centro (11; 21).</p><p>Codificación: $x_1=\dfrac{C-11}{2}$, $x_2=\dfrac{T-21}{4}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=7555+138{,}1\,x_1-1343\,x_2-809{,}5\,x_1^2-2114\,x_2^2-143{,}8\,x_1x_2$$</p><p>Términos: lineales $x_1,x_2$; cuadráticos $x_1^2,x_2^2$ (curvatura); interacciones $x_1x_2$. Significativos al 5 %: $x_2$, $x_1^2$, $x_2^2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); ninguna interacción es significativa: cada factor actúa por separado.</p><p>$F$ global $=47{,}66$ con $(5,6)$ gl, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}9754$ (explica el 97,5 % de la variabilidad) y $R^2_{aj}=0{,}955$. Falta de ajuste (con las réplicas del centro como error puro): $F=93{,}52$, $p=0{,}0018$ ⇒ hay falta de ajuste: el modelo de segundo orden se queda corto para describir la superficie.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=138{,}0887-1618{,}9726x_1-143{,}75x_2=0\\\frac{\partial\hat y}{\partial x_2}=-1342{,}8499-143{,}75x_1-4228{,}8336x_2=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(138{,}0887;\ -1342{,}8499)$ y $B=\begin{pmatrix}-809{,}4863&-71{,}875\\-71{,}875&-2114{,}4168\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=0{,}114,\ x_2^*=-0{,}321$ ⇒ en unidades reales carbono $=11+2(0{,}114)=11{,}228$ ; temperatura $=21+4(-0{,}321)=19{,}714$ °C. Valor predicho: $\hat y(\mathbf x_s)=7778{,}177$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-1618{,}9726&-143{,}75\\-143{,}75&-4228{,}8336\end{pmatrix}$.</p><p>$\det H=(-1618{,}9726)(-4228{,}8336)-(-143{,}75)^2=6825701{,}7883$ &gt; 0 y $h_{11}=-1618{,}9726$ &lt; 0 ⇒ definida negativa ⇒ <strong>máximo</strong>.</p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=-805{,}5394;\ -2118{,}3637$, todos negativos ⇒ <strong>máximo</strong> (la superficie es una «loma»).</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca maximizar y el punto estacionario es un máximo que cae <strong>dentro</strong> de la región experimental (todas las $|x_i^*|\le1{,}414$): es el óptimo. carbono ≈ 11,228 , temperatura ≈ 19,714 °C, con $\hat y\approx7778{,}177$.</p><p>Siguiente paso: confirmar con corridas reales en ese punto.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(5707, 5940, 3015, 2673, 5804, 6700, 5310, 1925, 7521, 7642, 7500, 7545), x1 = c(-1, 1, -1, 1, -1.415, 1.4, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, -1.415, 1.415, 0, 0, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); B <- matrix(0, 2, 2); co <- coef(m); vs <- c("x1", "x2"); for (i in 1:2) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 2) for (j in (i + 1):2) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: 0.114, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(5707, 5940, 3015, 2673, 5804, 6700, 5310, 1925, 7521, 7642, 7500, 7545), x1 = c(-1, 1, -1, 1, -1.415, 1.4, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, -1.415, 1.415, 0, 0, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); summary(m)$r.squared})", esperado: 0.9754, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 25 (p. 424)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d012",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 25 (p. 424)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 25 · Producción de colorante: central compuesto en unidades reales (más carbono)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 25 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: las corridas a 13 de carbono produjeron 6 240 (a 17 °C) y 3 073 (a 25 °C).</p><p>Se busca maximizar la producción de un colorante natural en función de la concentración de carbono y la temperatura (°C). Las corridas están en unidades reales.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Carbono</th><th>Temperatura (°C)</th><th>Producción</th></tr></thead><tbody><tr><td>$9$</td><td>$17$</td><td>$5707$</td></tr><tr><td>$13$</td><td>$17$</td><td>$6240$</td></tr><tr><td>$9$</td><td>$25$</td><td>$3015$</td></tr><tr><td>$13$</td><td>$25$</td><td>$3073$</td></tr><tr><td>$8{,}17$</td><td>$21$</td><td>$5804$</td></tr><tr><td>$13{,}8$</td><td>$21$</td><td>$6700$</td></tr><tr><td>$11$</td><td>$15{,}34$</td><td>$5310$</td></tr><tr><td>$11$</td><td>$26{,}66$</td><td>$725$</td></tr><tr><td>$11$</td><td>$21$</td><td>$7521$</td></tr><tr><td>$11$</td><td>$21$</td><td>$7642$</td></tr><tr><td>$11$</td><td>$21$</td><td>$7500$</td></tr><tr><td>$11$</td><td>$21$</td><td>$7545$</td></tr></tbody></table></div><ol type="a"><li>Represente el diseño en el plano (condiciones reales) y nómbrelo.</li><li>Ajuste un modelo de segundo orden y depúrelo.</li><li>¿El modelo describe adecuadamente la variación observada?</li><li>Encuentre las condiciones que maximizan la producción del colorante.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para maximizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(5707, 6240, 3015, 3073, 5804, 6700, 5310, 725, 7521, 7642, 7500, 7545), x1 = c(-1, 1, -1, 1, -1.415, 1.4, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, -1.415, 1.415, 0, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-218.38  -54.43  -40.39   90.94  176.28 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  7552.86      76.77  98.380 7.43e-11 ***
x1            227.37      54.42   4.178  0.00583 ** 
x2          -1542.49      54.27 -28.421 1.26e-07 ***
I(x1^2)      -687.48      61.13 -11.246 2.95e-05 ***
I(x2^2)     -2295.61      60.62 -37.871 2.26e-08 ***
x1:x2        -118.75      76.77  -1.547  0.17289    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 153.5 on 6 degrees of freedom
Multiple R-squared:  0.9974,	Adjusted R-squared:  0.9952 
F-statistic: 455.4 on 5 and 6 DF,  p-value: 1.188e-07


Call:
rsm(formula = y ~ SO(x1, x2), data = datos)

             Estimate Std. Error  t value  Pr(>|t|)    
(Intercept)  7552.862     76.773  98.3796 7.433e-11 ***
x1            227.367     54.419   4.1780  0.005826 ** 
x2          -1542.489     54.272 -28.4212 1.256e-07 ***
x1:x2        -118.750     76.774  -1.5467  0.172886    
x1^2         -687.479     61.130 -11.2462 2.954e-05 ***
x2^2        -2295.606     60.616 -37.8714 2.263e-08 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.9974,	Adjusted R-squared:  0.9952 
F-statistic: 455.4 on 5 and 6 DF,  p-value: 1.188e-07

Analysis of Variance Table

Response: y
            Df   Sum Sq  Mean Sq  F value    Pr(>F)
FO(x1, x2)   2 19470812  9735406 412.9190 3.753e-07
TWI(x1, x2)  1    56406    56406   2.3924   0.17289
PQ(x1, x2)   2 34160133 17080067 724.4365 7.014e-08
Residuals    6   141462    23577                   
Lack of fit  3   129648    43216  10.9741   0.03993
Pure error   3    11814     3938                   

Stationary point of response surface:
        x1         x2 
 0.1948139 -0.3410043 

Eigenanalysis:
eigen() decomposition
$values
[1]  -685.2899 -2297.7954

$vectors
         [,1]      [,2]
x1 -0.9993209 0.0368466
x2  0.0368466 0.9993209`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(5707, 6240, 3015, 3073, 5804, 6700, 5310, 725, 7521, 7642, 7500, 7545), x1 = c(-1, 1, -1, 1, -1.415, 1.4, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, -1.415, 1.415, 0, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p><strong>Central compuesto</strong> ($k=2$): esquinas en carbono 9/13 y temperatura 17/25; puntos axiales en 8,17/13,8 y 15,34/26,66, que codificados quedan en $\pm1{,}414$ (rotable); 4 réplicas del centro (11; 21).</p><p>Codificación: $x_1=\dfrac{C-11}{2}$, $x_2=\dfrac{T-21}{4}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=7553+227{,}4\,x_1-1542\,x_2-687{,}5\,x_1^2-2296\,x_2^2-118{,}8\,x_1x_2$$</p><p>Términos: lineales $x_1,x_2$; cuadráticos $x_1^2,x_2^2$ (curvatura); interacciones $x_1x_2$. Significativos al 5 %: $x_1$, $x_2$, $x_1^2$, $x_2^2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); ninguna interacción es significativa: cada factor actúa por separado.</p><p>$F$ global $=455{,}42$ con $(5,6)$ gl, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}9974$ (explica el 99,74 % de la variabilidad) y $R^2_{aj}=0{,}9952$. Falta de ajuste (con las réplicas del centro como error puro): $F=10{,}974$, $p=0{,}0399$ ⇒ hay falta de ajuste: el modelo de segundo orden se queda corto para describir la superficie.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=227{,}3668-1374{,}9584x_1-118{,}75x_2=0\\\frac{\partial\hat y}{\partial x_2}=-1542{,}4889-118{,}75x_1-4591{,}2123x_2=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(227{,}3668;\ -1542{,}4889)$ y $B=\begin{pmatrix}-687{,}4792&-59{,}375\\-59{,}375&-2295{,}6062\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=0{,}195,\ x_2^*=-0{,}341$ ⇒ en unidades reales carbono $=11+2(0{,}195)=11{,}39$ ; temperatura $=21+4(-0{,}341)=19{,}636$ °C. Valor predicho: $\hat y(\mathbf x_s)=7838{,}006$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-1374{,}9584&-118{,}75\\-118{,}75&-4591{,}2123\end{pmatrix}$.</p><p>$\det H=(-1374{,}9584)(-4591{,}2123)-(-118{,}75)^2=6298624{,}2834$ &gt; 0 y $h_{11}=-1374{,}9584$ &lt; 0 ⇒ definida negativa ⇒ <strong>máximo</strong>.</p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=-685{,}2899;\ -2297{,}7954$, todos negativos ⇒ <strong>máximo</strong> (la superficie es una «loma»).</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca maximizar y el punto estacionario es un máximo que cae <strong>dentro</strong> de la región experimental (todas las $|x_i^*|\le1{,}414$): es el óptimo. carbono ≈ 11,39 , temperatura ≈ 19,636 °C, con $\hat y\approx7838{,}006$.</p><p>Siguiente paso: confirmar con corridas reales en ese punto.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(5707, 6240, 3015, 3073, 5804, 6700, 5310, 725, 7521, 7642, 7500, 7545), x1 = c(-1, 1, -1, 1, -1.415, 1.4, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, -1.415, 1.415, 0, 0, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); B <- matrix(0, 2, 2); co <- coef(m); vs <- c("x1", "x2"); for (i in 1:2) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 2) for (j in (i + 1):2) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: 0.195, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(5707, 6240, 3015, 3073, 5804, 6700, 5310, 725, 7521, 7642, 7500, 7545), x1 = c(-1, 1, -1, 1, -1.415, 1.4, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, -1.415, 1.415, 0, 0, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); summary(m)$r.squared})", esperado: 0.9974, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 25 (p. 424)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d013",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 12, ej. 26 · Rendimiento: del primer orden al central compuesto",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 12, ej. 26 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Se buscan el tiempo $W_1$ (min) y la temperatura $W_2$ (°C) que maximizan el rendimiento. Tras un primer diseño en (75; 130) y la trayectoria de máximo ascenso, se corrió un $2^2$ con 2 centros en torno a (90; 145) y se agregaron 6 corridas (axiales y centros) para completar un central compuesto. Se analiza ese diseño final de 12 corridas.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$W_1$ (min)</th><th>$W_2$ (°C)</th><th>Rendimiento</th></tr></thead><tbody><tr><td>$80$</td><td>$140$</td><td>$78{,}8$</td></tr><tr><td>$100$</td><td>$140$</td><td>$84{,}5$</td></tr><tr><td>$80$</td><td>$150$</td><td>$91{,}2$</td></tr><tr><td>$100$</td><td>$150$</td><td>$77{,}4$</td></tr><tr><td>$90$</td><td>$145$</td><td>$89{,}7$</td></tr><tr><td>$90$</td><td>$145$</td><td>$86{,}8$</td></tr><tr><td>$76$</td><td>$145$</td><td>$83{,}3$</td></tr><tr><td>$104$</td><td>$145$</td><td>$81{,}2$</td></tr><tr><td>$90$</td><td>$138$</td><td>$81{,}2$</td></tr><tr><td>$90$</td><td>$152$</td><td>$79{,}5$</td></tr><tr><td>$90$</td><td>$145$</td><td>$87$</td></tr><tr><td>$90$</td><td>$145$</td><td>$86$</td></tr></tbody></table></div><ol type="a"><li>A los datos del segundo diseño (6 corridas) ajuste un modelo de primer orden: ¿describe la superficie?</li><li>Con las 12 corridas del central compuesto ajuste un modelo de segundo orden: ¿ahora sí describe la superficie?</li><li>Verifique supuestos para el modelo de segundo orden.</li><li>Encuentre las condiciones que maximizan el rendimiento.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para maximizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(78.8, 84.5, 91.2, 77.4, 89.7, 86.8, 83.3, 81.2, 81.2, 79.5, 87, 86), x1 = c(-1, 1, -1, 1, 0, 0, -1.41, 1.41, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1.41, 1.41, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-2.2188 -0.9040 -0.1601  0.6892  2.4499 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  87.3699     1.0056  86.884 1.57e-10 ***
x1           -1.3868     0.7121  -1.947  0.09943 .  
x2            0.3640     0.7121   0.511  0.62755    
I(x1^2)      -2.1449     0.7983  -2.687  0.03621 *  
I(x2^2)      -3.1006     0.7983  -3.884  0.00813 ** 
x1:x2        -4.8750     1.0056  -4.848  0.00286 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 2.011 on 6 degrees of freedom
Multiple R-squared:  0.8857,	Adjusted R-squared:  0.7904 
F-statistic: 9.296 on 5 and 6 DF,  p-value: 0.008575


Call:
rsm(formula = y ~ SO(x1, x2), data = datos)

            Estimate Std. Error t value  Pr(>|t|)    
(Intercept) 87.36991    1.00559 86.8841 1.566e-10 ***
x1          -1.38675    0.71213 -1.9473  0.099425 .  
x2           0.36396    0.71213  0.5111  0.627547    
x1:x2       -4.87500    1.00560 -4.8479  0.002858 ** 
x1^2        -2.14489    0.79832 -2.6868  0.036208 *  
x2^2        -3.10058    0.79832 -3.8839  0.008134 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.8857,	Adjusted R-squared:  0.7904 
F-statistic: 9.296 on 5 and 6 DF,  p-value: 0.008575

Analysis of Variance Table

Response: y
            Df Sum Sq Mean Sq F value   Pr(>F)
FO(x1, x2)   2 16.395   8.198  2.0267 0.212581
TWI(x1, x2)  1 95.062  95.062 23.5017 0.002858
PQ(x1, x2)   2 76.549  38.275  9.4624 0.013950
Residuals    6 24.270   4.045                 
Lack of fit  3 16.502   5.501  2.1245 0.275929
Pure error   3  7.768   2.589                 

Stationary point of response surface:
       x1        x2 
-3.657907  2.934333 

Eigenanalysis:
eigen() decomposition
$values
[1] -0.1388381 -5.1066305

$vectors
         [,1]      [,2]
x1 -0.7721323 0.6354619
x2  0.6354619 0.7721323`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(78.8, 84.5, 91.2, 77.4, 89.7, 86.8, 83.3, 81.2, 81.2, 79.5, 87, 86), x1 = c(-1, 1, -1, 1, 0, 0, -1.41, 1.41, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1.41, 1.41, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p>El segundo diseño ($2^2$ + 2 centros) no permite estimar curvatura; al agregar 4 puntos axiales ($\pm1{,}41$) y 2 centros más queda un <strong>central compuesto</strong> de 12 corridas con 4 réplicas del centro.</p><p>Codificación: $x_1=\dfrac{W_1-90}{10}$, $x_2=\dfrac{W_2-145}{5}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=87{,}37-1{,}387\,x_1+0{,}364\,x_2-2{,}145\,x_1^2-3{,}101\,x_2^2-4{,}875\,x_1x_2$$</p><p>Términos: lineales $x_1,x_2$; cuadráticos $x_1^2,x_2^2$ (curvatura); interacciones $x_1x_2$. Significativos al 5 %: $x_1^2$, $x_2^2$, $x_1x_2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); hay <strong>interacción</strong>: el efecto de un factor depende del nivel del otro.</p><p>$F$ global $=9{,}3$ con $(5,6)$ gl, $p=0{,}0086$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}8857$ (explica el 88,6 % de la variabilidad) y $R^2_{aj}=0{,}7904$. Falta de ajuste (con las réplicas del centro como error puro): $F=2{,}124$, $p=0{,}2759$ ⇒ no hay evidencia de falta de ajuste.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-1{,}3868-4{,}2898x_1-4{,}875x_2=0\\\frac{\partial\hat y}{\partial x_2}=0{,}364-4{,}875x_1-6{,}2012x_2=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-1{,}3868;\ 0{,}364)$ y $B=\begin{pmatrix}-2{,}1449&-2{,}4375\\-2{,}4375&-3{,}1006\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=-3{,}658,\ x_2^*=2{,}934$ ⇒ en unidades reales tiempo $=90+10(-3{,}658)=53{,}421$ min; temperatura $=145+5(2{,}934)=159{,}672$ °C. Valor predicho: $\hat y(\mathbf x_s)=90{,}44$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-4{,}2898&-4{,}875\\-4{,}875&-6{,}2012\end{pmatrix}$.</p><p>$\det H=(-4{,}2898)(-6{,}2012)-(-4{,}875)^2=2{,}836$ &gt; 0 y $h_{11}=-4{,}2898$ &lt; 0 ⇒ definida negativa ⇒ <strong>máximo</strong>.</p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=-0{,}1388;\ -5{,}1066$, todos negativos ⇒ <strong>máximo</strong> (la superficie es una «loma»). Un valor propio es casi 0: en esa dirección la superficie es casi plana (una «cordillera»), así que hay muchas combinaciones con respuesta parecida.</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca maximizar, pero el punto estacionario cae <strong>fuera</strong> de la región experimental ($x_1^*=-3{,}66$, $x_2^*=2{,}93$). Como dice la clase, entonces el óptimo está en la <strong>frontera</strong> de la región: se evalúa $\hat y$ en las esquinas y bordes (o en una grilla fina, que es la idea del análisis de cordillera del libro), sin salir de la zona estudiada.</p><p>Evaluando $\hat y$ en una grilla sobre la región del factorial, $[-1;\ 1]^2$: el mayor valor está en $x_1=-1,\ x_2=0{,}85$, es decir tiempo ≈ 80 min, temperatura ≈ 149,25 °C, con $\hat y\approx88{,}825$. Si se quiere ir más allá, se hace un nuevo experimento en esa dirección y se confirma con corridas reales.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(78.8, 84.5, 91.2, 77.4, 89.7, 86.8, 83.3, 81.2, 81.2, 79.5, 87, 86), x1 = c(-1, 1, -1, 1, 0, 0, -1.41, 1.41, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1.41, 1.41, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); B <- matrix(0, 2, 2); co <- coef(m); vs <- c("x1", "x2"); for (i in 1:2) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 2) for (j in (i + 1):2) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: -3.658, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(78.8, 84.5, 91.2, 77.4, 89.7, 86.8, 83.3, 81.2, 81.2, 79.5, 87, 86), x1 = c(-1, 1, -1, 1, 0, 0, -1.41, 1.41, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1.41, 1.41, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); summary(m)$r.squared})", esperado: 0.8857, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 26 (pp. 425–426)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d014",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 26 (pp. 425–426)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 26 · Rendimiento: del primer orden al central compuesto (otra esquina)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 26 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: la esquina (100; 150) rindió 82,4 (en vez de 77,4).</p><p>Se buscan el tiempo $W_1$ (min) y la temperatura $W_2$ (°C) que maximizan el rendimiento. Tras un primer diseño en (75; 130) y la trayectoria de máximo ascenso, se corrió un $2^2$ con 2 centros en torno a (90; 145) y se agregaron 6 corridas (axiales y centros) para completar un central compuesto. Se analiza ese diseño final de 12 corridas.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$W_1$ (min)</th><th>$W_2$ (°C)</th><th>Rendimiento</th></tr></thead><tbody><tr><td>$80$</td><td>$140$</td><td>$78{,}8$</td></tr><tr><td>$100$</td><td>$140$</td><td>$84{,}5$</td></tr><tr><td>$80$</td><td>$150$</td><td>$91{,}2$</td></tr><tr><td>$100$</td><td>$150$</td><td>$82{,}4$</td></tr><tr><td>$90$</td><td>$145$</td><td>$89{,}7$</td></tr><tr><td>$90$</td><td>$145$</td><td>$86{,}8$</td></tr><tr><td>$76$</td><td>$145$</td><td>$83{,}3$</td></tr><tr><td>$104$</td><td>$145$</td><td>$81{,}2$</td></tr><tr><td>$90$</td><td>$138$</td><td>$81{,}2$</td></tr><tr><td>$90$</td><td>$152$</td><td>$79{,}5$</td></tr><tr><td>$90$</td><td>$145$</td><td>$87$</td></tr><tr><td>$90$</td><td>$145$</td><td>$86$</td></tr></tbody></table></div><ol type="a"><li>A los datos del segundo diseño (6 corridas) ajuste un modelo de primer orden: ¿describe la superficie?</li><li>Con las 12 corridas del central compuesto ajuste un modelo de segundo orden: ¿ahora sí describe la superficie?</li><li>Verifique supuestos para el modelo de segundo orden.</li><li>Encuentre las condiciones que maximizan el rendimiento.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para maximizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(78.8, 84.5, 91.2, 82.4, 89.7, 86.8, 83.3, 81.2, 81.2, 79.5, 87, 86), x1 = c(-1, 1, -1, 1, 0, 0, -1.41, 1.41, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1.41, 1.41, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-3.7277 -1.3894 -0.2468  1.1583  3.0711 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  87.3662     1.3745  63.564 1.02e-09 ***
x1           -0.7599     0.9734  -0.781   0.4647    
x2            0.9908     0.9734   1.018   0.3480    
I(x1^2)      -1.8287     1.0912  -1.676   0.1448    
I(x2^2)      -2.7843     1.0912  -2.552   0.0434 *  
x1:x2        -3.6250     1.3745  -2.637   0.0387 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 2.749 on 6 degrees of freedom
Multiple R-squared:  0.7339,	Adjusted R-squared:  0.5121 
F-statistic: 3.309 on 5 and 6 DF,  p-value: 0.08873


Call:
rsm(formula = y ~ SO(x1, x2), data = datos)

            Estimate Std. Error t value  Pr(>|t|)    
(Intercept) 87.36619    1.37447 63.5636 1.019e-09 ***
x1          -0.75989    0.97335 -0.7807   0.46466    
x2           0.99082    0.97335  1.0179   0.34798    
x1:x2       -3.62500    1.37448 -2.6374   0.03868 *  
x1^2        -1.82866    1.09116 -1.6759   0.14478    
x2^2        -2.78435    1.09116 -2.5517   0.04339 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.7339,	Adjusted R-squared:  0.5121 
F-statistic: 3.309 on 5 and 6 DF,  p-value: 0.08873

Analysis of Variance Table

Response: y
            Df Sum Sq Mean Sq F value  Pr(>F)
FO(x1, x2)   2 12.436   6.218  0.8228 0.48329
TWI(x1, x2)  1 52.562  52.562  6.9557 0.03868
PQ(x1, x2)   2 60.021  30.010  3.9713 0.07969
Residuals    6 45.341   7.557                
Lack of fit  3 37.573  12.524  4.8372 0.11399
Pure error   3  7.768   2.589                

Stationary point of response surface:
        x1         x2 
-1.0826767  0.8827068 

Eigenanalysis:
eigen() decomposition
$values
[1] -0.4320739 -4.1809352

$vectors
         [,1]      [,2]
x1 -0.7921260 0.6103576
x2  0.6103576 0.7921260`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(78.8, 84.5, 91.2, 82.4, 89.7, 86.8, 83.3, 81.2, 81.2, 79.5, 87, 86), x1 = c(-1, 1, -1, 1, 0, 0, -1.41, 1.41, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1.41, 1.41, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p>El segundo diseño ($2^2$ + 2 centros) no permite estimar curvatura; al agregar 4 puntos axiales ($\pm1{,}41$) y 2 centros más queda un <strong>central compuesto</strong> de 12 corridas con 4 réplicas del centro.</p><p>Codificación: $x_1=\dfrac{W_1-90}{10}$, $x_2=\dfrac{W_2-145}{5}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=87{,}37-0{,}7599\,x_1+0{,}9908\,x_2-1{,}829\,x_1^2-2{,}784\,x_2^2-3{,}625\,x_1x_2$$</p><p>Términos: lineales $x_1,x_2$; cuadráticos $x_1^2,x_2^2$ (curvatura); interacciones $x_1x_2$. Significativos al 5 %: $x_2^2$, $x_1x_2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); hay <strong>interacción</strong>: el efecto de un factor depende del nivel del otro.</p><p>$F$ global $=3{,}31$ con $(5,6)$ gl, $p=0{,}0887$ ⇒ <strong>no se rechaza</strong> $H_0$: el modelo en su conjunto no es significativo (con pocos grados de libertad para el error). $R^2=0{,}7339$ (explica el 73,4 % de la variabilidad) y $R^2_{aj}=0{,}5121$, bastante menor: hay términos que no aportan. Falta de ajuste (con las réplicas del centro como error puro): $F=4{,}837$, $p=0{,}114$ ⇒ no hay evidencia de falta de ajuste.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-0{,}7599-3{,}6573x_1-3{,}625x_2=0\\\frac{\partial\hat y}{\partial x_2}=0{,}9908-3{,}625x_1-5{,}5687x_2=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-0{,}7599;\ 0{,}9908)$ y $B=\begin{pmatrix}-1{,}8287&-1{,}8125\\-1{,}8125&-2{,}7843\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=-1{,}083,\ x_2^*=0{,}883$ ⇒ en unidades reales tiempo $=90+10(-1{,}083)=79{,}173$ min; temperatura $=145+5(0{,}883)=149{,}414$ °C. Valor predicho: $\hat y(\mathbf x_s)=88{,}215$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-3{,}6573&-3{,}625\\-3{,}625&-5{,}5687\end{pmatrix}$.</p><p>$\det H=(-3{,}6573)(-5{,}5687)-(-3{,}625)^2=7{,}2259$ &gt; 0 y $h_{11}=-3{,}6573$ &lt; 0 ⇒ definida negativa ⇒ <strong>máximo</strong>.</p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=-0{,}4321;\ -4{,}1809$, todos negativos ⇒ <strong>máximo</strong> (la superficie es una «loma»).</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca maximizar y el punto estacionario es un máximo que cae <strong>dentro</strong> de la región experimental (todas las $|x_i^*|\le1{,}41$): es el óptimo. tiempo ≈ 79,173 min, temperatura ≈ 149,414 °C, con $\hat y\approx88{,}215$.</p><p>Siguiente paso: confirmar con corridas reales en ese punto.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(78.8, 84.5, 91.2, 82.4, 89.7, 86.8, 83.3, 81.2, 81.2, 79.5, 87, 86), x1 = c(-1, 1, -1, 1, 0, 0, -1.41, 1.41, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1.41, 1.41, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); B <- matrix(0, 2, 2); co <- coef(m); vs <- c("x1", "x2"); for (i in 1:2) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 2) for (j in (i + 1):2) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: -1.083, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(78.8, 84.5, 91.2, 82.4, 89.7, 86.8, 83.3, 81.2, 81.2, 79.5, 87, 86), x1 = c(-1, 1, -1, 1, 0, 0, -1.41, 1.41, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1.41, 1.41, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); summary(m)$r.squared})", esperado: 0.7339, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 26 (pp. 425–426)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d015",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 26 (pp. 425–426)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 26 · Rendimiento: del primer orden al central compuesto (otros axiales)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 26 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: los axiales de tiempo rindieron 85,1 (76 min) y 79,0 (104 min).</p><p>Se buscan el tiempo $W_1$ (min) y la temperatura $W_2$ (°C) que maximizan el rendimiento. Tras un primer diseño en (75; 130) y la trayectoria de máximo ascenso, se corrió un $2^2$ con 2 centros en torno a (90; 145) y se agregaron 6 corridas (axiales y centros) para completar un central compuesto. Se analiza ese diseño final de 12 corridas.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$W_1$ (min)</th><th>$W_2$ (°C)</th><th>Rendimiento</th></tr></thead><tbody><tr><td>$80$</td><td>$140$</td><td>$78{,}8$</td></tr><tr><td>$100$</td><td>$140$</td><td>$84{,}5$</td></tr><tr><td>$80$</td><td>$150$</td><td>$91{,}2$</td></tr><tr><td>$100$</td><td>$150$</td><td>$77{,}4$</td></tr><tr><td>$90$</td><td>$145$</td><td>$89{,}7$</td></tr><tr><td>$90$</td><td>$145$</td><td>$86{,}8$</td></tr><tr><td>$76$</td><td>$145$</td><td>$85{,}1$</td></tr><tr><td>$104$</td><td>$145$</td><td>$79$</td></tr><tr><td>$90$</td><td>$138$</td><td>$81{,}2$</td></tr><tr><td>$90$</td><td>$152$</td><td>$79{,}5$</td></tr><tr><td>$90$</td><td>$145$</td><td>$87$</td></tr><tr><td>$90$</td><td>$145$</td><td>$86$</td></tr></tbody></table></div><ol type="a"><li>A los datos del segundo diseño (6 corridas) ajuste un modelo de primer orden: ¿describe la superficie?</li><li>Con las 12 corridas del central compuesto ajuste un modelo de segundo orden: ¿ahora sí describe la superficie?</li><li>Verifique supuestos para el modelo de segundo orden.</li><li>Encuentre las condiciones que maximizan el rendimiento.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para maximizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(78.8, 84.5, 91.2, 77.4, 89.7, 86.8, 85.1, 79, 81.2, 79.5, 87, 86), x1 = c(-1, 1, -1, 1, 0, 0, -1.41, 1.41, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1.41, 1.41, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-2.2691 -0.8571 -0.2495  0.7911  2.3304 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  87.3696     0.9518  91.792 1.13e-10 ***
x1           -2.0939     0.6740  -3.106  0.02095 *  
x2            0.3640     0.6740   0.540  0.60867    
I(x1^2)      -2.2200     0.7556  -2.938  0.02602 *  
I(x2^2)      -3.0751     0.7556  -4.070  0.00658 ** 
x1:x2        -4.8750     0.9518  -5.122  0.00217 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 1.904 on 6 degrees of freedom
Multiple R-squared:  0.9055,	Adjusted R-squared:  0.8267 
F-statistic:  11.5 on 5 and 6 DF,  p-value: 0.004963


Call:
rsm(formula = y ~ SO(x1, x2), data = datos)

            Estimate Std. Error t value  Pr(>|t|)    
(Intercept) 87.36961    0.95182 91.7919 1.126e-10 ***
x1          -2.09385    0.67405 -3.1064  0.020945 *  
x2           0.36396    0.67405  0.5400  0.608668    
x1:x2       -4.87500    0.95183 -5.1217  0.002175 ** 
x1^2        -2.22004    0.75563 -2.9380  0.026015 *  
x2^2        -3.07513    0.75563 -4.0696  0.006579 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.9055,	Adjusted R-squared:  0.8267 
F-statistic:  11.5 on 5 and 6 DF,  p-value: 0.004963

Analysis of Variance Table

Response: y
            Df Sum Sq Mean Sq F value   Pr(>F)
FO(x1, x2)   2 36.026  18.013  4.9706 0.053321
TWI(x1, x2)  1 95.062  95.062 26.2319 0.002175
PQ(x1, x2)   2 77.218  38.609 10.6539 0.010607
Residuals    6 21.744   3.624                 
Lack of fit  3 13.976   4.659  1.7993 0.320723
Pure error   3  7.768   2.589                 

Stationary point of response surface:
       x1        x2 
-4.136656  3.338098 

Eigenanalysis:
eigen() decomposition
$values
[1] -0.1728717 -5.1222959

$vectors
         [,1]      [,2]
x1 -0.7657562 0.6431310
x2  0.6431310 0.7657562`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(78.8, 84.5, 91.2, 77.4, 89.7, 86.8, 85.1, 79, 81.2, 79.5, 87, 86), x1 = c(-1, 1, -1, 1, 0, 0, -1.41, 1.41, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1.41, 1.41, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p>El segundo diseño ($2^2$ + 2 centros) no permite estimar curvatura; al agregar 4 puntos axiales ($\pm1{,}41$) y 2 centros más queda un <strong>central compuesto</strong> de 12 corridas con 4 réplicas del centro.</p><p>Codificación: $x_1=\dfrac{W_1-90}{10}$, $x_2=\dfrac{W_2-145}{5}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=87{,}37-2{,}094\,x_1+0{,}364\,x_2-2{,}22\,x_1^2-3{,}075\,x_2^2-4{,}875\,x_1x_2$$</p><p>Términos: lineales $x_1,x_2$; cuadráticos $x_1^2,x_2^2$ (curvatura); interacciones $x_1x_2$. Significativos al 5 %: $x_1$, $x_1^2$, $x_2^2$, $x_1x_2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); hay <strong>interacción</strong>: el efecto de un factor depende del nivel del otro.</p><p>$F$ global $=11{,}5$ con $(5,6)$ gl, $p=0{,}005$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}9055$ (explica el 90,5 % de la variabilidad) y $R^2_{aj}=0{,}8267$. Falta de ajuste (con las réplicas del centro como error puro): $F=1{,}799$, $p=0{,}3207$ ⇒ no hay evidencia de falta de ajuste.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-2{,}0939-4{,}4401x_1-4{,}875x_2=0\\\frac{\partial\hat y}{\partial x_2}=0{,}364-4{,}875x_1-6{,}1503x_2=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-2{,}0939;\ 0{,}364)$ y $B=\begin{pmatrix}-2{,}22&-2{,}4375\\-2{,}4375&-3{,}0751\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=-4{,}137,\ x_2^*=3{,}338$ ⇒ en unidades reales tiempo $=90+10(-4{,}137)=48{,}633$ min; temperatura $=145+5(3{,}338)=161{,}69$ °C. Valor predicho: $\hat y(\mathbf x_s)=92{,}308$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-4{,}4401&-4{,}875\\-4{,}875&-6{,}1503\end{pmatrix}$.</p><p>$\det H=(-4{,}4401)(-6{,}1503)-(-4{,}875)^2=3{,}542$ &gt; 0 y $h_{11}=-4{,}4401$ &lt; 0 ⇒ definida negativa ⇒ <strong>máximo</strong>.</p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=-0{,}1729;\ -5{,}1223$, todos negativos ⇒ <strong>máximo</strong> (la superficie es una «loma»). Un valor propio es casi 0: en esa dirección la superficie es casi plana (una «cordillera»), así que hay muchas combinaciones con respuesta parecida.</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca maximizar, pero el punto estacionario cae <strong>fuera</strong> de la región experimental ($x_1^*=-4{,}14$, $x_2^*=3{,}34$). Como dice la clase, entonces el óptimo está en la <strong>frontera</strong> de la región: se evalúa $\hat y$ en las esquinas y bordes (o en una grilla fina, que es la idea del análisis de cordillera del libro), sin salir de la zona estudiada.</p><p>Evaluando $\hat y$ en una grilla sobre la región del factorial, $[-1;\ 1]^2$: el mayor valor está en $x_1=-1,\ x_2=0{,}85$, es decir tiempo ≈ 80 min, temperatura ≈ 149,25 °C, con $\hat y\approx89{,}475$. Si se quiere ir más allá, se hace un nuevo experimento en esa dirección y se confirma con corridas reales.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(78.8, 84.5, 91.2, 77.4, 89.7, 86.8, 85.1, 79, 81.2, 79.5, 87, 86), x1 = c(-1, 1, -1, 1, 0, 0, -1.41, 1.41, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1.41, 1.41, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); B <- matrix(0, 2, 2); co <- coef(m); vs <- c("x1", "x2"); for (i in 1:2) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 2) for (j in (i + 1):2) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: -4.137, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(78.8, 84.5, 91.2, 77.4, 89.7, 86.8, 85.1, 79, 81.2, 79.5, 87, 86), x1 = c(-1, 1, -1, 1, 0, 0, -1.41, 1.41, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1.41, 1.41, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); summary(m)$r.squared})", esperado: 0.9055, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 26 (pp. 425–426)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d016",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c06",
    dificultad: 3,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 12, ej. 27 · Hojuelas de soya: Box-Behnken",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 12, ej. 27 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Aguilera y Kosikowski estudiaron la elaboración de hojuelas de soya por extrusión con un Box-Behnken: temperatura (120/145/170 °C), humedad (25/35/45 %) y velocidad de tornillo (800/900/1000 rpm). Interesa <strong>minimizar</strong> la respuesta.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_1$</th><th>$x_2$</th><th>$x_3$</th><th>$Y$</th></tr></thead><tbody><tr><td>$−1$</td><td>$−1$</td><td>$0$</td><td>$3{,}7$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$0$</td><td>$2$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$0$</td><td>$33{,}4$</td></tr><tr><td>$1$</td><td>$1$</td><td>$0$</td><td>$4{,}4$</td></tr><tr><td>$−1$</td><td>$0$</td><td>$−1$</td><td>$10$</td></tr><tr><td>$−1$</td><td>$0$</td><td>$1$</td><td>$6$</td></tr><tr><td>$1$</td><td>$0$</td><td>$−1$</td><td>$4{,}5$</td></tr><tr><td>$1$</td><td>$0$</td><td>$1$</td><td>$3{,}3$</td></tr><tr><td>$0$</td><td>$−1$</td><td>$−1$</td><td>$3{,}9$</td></tr><tr><td>$0$</td><td>$−1$</td><td>$1$</td><td>$3{,}7$</td></tr><tr><td>$0$</td><td>$1$</td><td>$−1$</td><td>$31$</td></tr><tr><td>$0$</td><td>$1$</td><td>$1$</td><td>$21$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$3{,}5$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$4{,}5$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$6{,}4$</td></tr></tbody></table></div><ol type="a"><li>Ajuste un modelo de segundo orden.</li><li>Verifique que el modelo sea adecuado. ¿Es útil para predecir?</li><li>Encuentre la ecuación canónica (valores propios).</li><li>¿Qué tipo de superficie describe el modelo?</li><li>Si interesa minimizar, ¿es el tipo de superficie deseado? Si no, ¿qué se debe hacer?</li><li>De ser necesario, determine el mejor punto posible dentro de la región experimental.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para minimizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(3.7, 2, 33.4, 4.4, 10, 6, 4.5, 3.3, 3.9, 3.7, 31, 21, 3.5, 4.5, 6.4), x1 = c(-1, 1, -1, 1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + 
    x1:x2 + x1:x3 + x2:x3, data = datos)

Residuals:
      1       2       3       4       5       6       7       8       9      10 
 4.3500 -1.2750  1.2750 -4.3500 -3.4375 -2.1875  2.1875  3.4375 -0.9125 -2.1625 
     11      12      13      14      15 
 2.1625  0.9125 -1.3000 -0.3000  1.6000 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)   
(Intercept)    4.800      2.445   1.963  0.10683   
x1            -4.862      1.497  -3.248  0.02275 * 
x2             9.562      1.497   6.387  0.00139 **
x3            -1.925      1.497  -1.286  0.25484   
I(x1^2)       -1.438      2.204  -0.652  0.54300   
I(x2^2)        7.513      2.204   3.409  0.01906 * 
I(x3^2)        2.587      2.204   1.174  0.29321   
x1:x2         -6.825      2.117  -3.223  0.02337 * 
x1:x3          0.700      2.117   0.331  0.75434   
x2:x3         -2.450      2.117  -1.157  0.29949   
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 4.235 on 5 degrees of freedom
Multiple R-squared:   0.94,	Adjusted R-squared:  0.8319 
F-statistic: 8.696 on 9 and 5 DF,  p-value: 0.01413


Call:
rsm(formula = y ~ SO(x1, x2, x3), data = datos)

            Estimate Std. Error t value Pr(>|t|)   
(Intercept)   4.8000     2.4448  1.9633 0.106832   
x1           -4.8625     1.4971 -3.2479 0.022750 * 
x2            9.5625     1.4971  6.3872 0.001393 **
x3           -1.9250     1.4971 -1.2858 0.254844   
x1:x2        -6.8250     2.1173 -3.2235 0.023375 * 
x1:x3         0.7000     2.1173  0.3306 0.754341   
x2:x3        -2.4500     2.1173 -1.1571 0.299486   
x1^2         -1.4375     2.2037 -0.6523 0.543001   
x2^2          7.5125     2.2037  3.4090 0.019064 * 
x3^2          2.5875     2.2037  1.1741 0.293212   
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:   0.94,	Adjusted R-squared:  0.8319 
F-statistic: 8.696 on 9 and 5 DF,  p-value: 0.01413

Analysis of Variance Table

Response: y
                Df Sum Sq Mean Sq F value   Pr(>F)
FO(x1, x2, x3)   3 950.33  316.78 17.6659 0.004306
TWI(x1, x2, x3)  3 212.29   70.76  3.9464 0.086807
PQ(x1, x2, x3)   3 240.79   80.26  4.4760 0.070097
Residuals        5  89.66   17.93                 
Lack of fit      3  85.32   28.44 13.1056 0.071724
Pure error       2   4.34    2.17                 

Stationary point of response surface:
         x1          x2          x3 
-0.09157068 -0.66683781  0.06866606 

Eigenanalysis:
eigen() decomposition
$values
[1]  8.920897  2.332509 -2.590905

$vectors
         [,1]        [,2]       [,3]
x1  0.3127667 -0.07444555 0.94690805
x2 -0.9291750  0.18279137 0.32128040
x3  0.1970045  0.98032911 0.01200189`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(3.7, 2, 33.4, 4.4, 10, 6, 4.5, 3.3, 3.9, 3.7, 31, 21, 3.5, 4.5, 6.4), x1 = c(-1, 1, -1, 1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p><strong>Box-Behnken</strong> con $k=3$: 12 puntos de arista + 3 centros = 15 corridas (el central compuesto necesitaría 20). Tres niveles por factor.</p><p>Codificación: $x_1=\dfrac{T-145}{25}$, $x_2=\dfrac{H-35}{10}$, $x_3=\dfrac{V-900}{100}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=4{,}8-4{,}863\,x_1+9{,}563\,x_2-1{,}925\,x_3-1{,}438\,x_1^2+7{,}513\,x_2^2+2{,}588\,x_3^2-6{,}825\,x_1x_2+0{,}7\,x_1x_3-2{,}45\,x_2x_3$$</p><p>Términos: lineales $x_1,x_2,x_3$; cuadráticos $x_1^2,x_2^2,x_3^2$ (curvatura); interacciones $x_1x_2,x_1x_3,x_2x_3$. Significativos al 5 %: $x_1$, $x_2$, $x_2^2$, $x_1x_2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); hay <strong>interacción</strong>: el efecto de un factor depende del nivel del otro.</p><p>$F$ global $=8{,}7$ con $(9,5)$ gl, $p=0{,}0141$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}94$ (explica el 94 % de la variabilidad) y $R^2_{aj}=0{,}8319$, bastante menor: hay términos que no aportan. Falta de ajuste (con las réplicas del centro como error puro): $F=13{,}106$, $p=0{,}0717$ ⇒ no hay evidencia de falta de ajuste.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-4{,}8625-2{,}875x_1-6{,}825x_2+0{,}7x_3=0\\\frac{\partial\hat y}{\partial x_2}=9{,}5625-6{,}825x_1+15{,}025x_2-2{,}45x_3=0\\\frac{\partial\hat y}{\partial x_3}=-1{,}925+0{,}7x_1-2{,}45x_2+5{,}175x_3=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-4{,}8625;\ 9{,}5625;\ -1{,}925)$ y $B=\begin{pmatrix}-1{,}4375&-3{,}4125&0{,}35\\-3{,}4125&7{,}5125&-1{,}225\\0{,}35&-1{,}225&2{,}5875\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=-0{,}092,\ x_2^*=-0{,}667,\ x_3^*=0{,}069$ ⇒ en unidades reales temperatura $=145+25(-0{,}092)=142{,}711$ °C; humedad $=35+10(-0{,}667)=28{,}332$ %; velocidad $=900+100(0{,}069)=906{,}867$ rpm. Valor predicho: $\hat y(\mathbf x_s)=1{,}768$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-2{,}875&-6{,}825&0{,}7\\-6{,}825&15{,}025&-2{,}45\\0{,}7&-2{,}45&5{,}175\end{pmatrix}$.</p><p></p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=8{,}9209;\ 2{,}3325;\ -2{,}5909$, de signos mezclados ⇒ <strong>punto silla</strong>: sube en una dirección y baja en otra.</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca minimizar, pero el punto estacionario es un <strong>punto silla</strong>, no un mínimo. Como dice la clase, entonces el óptimo está en la <strong>frontera</strong> de la región: se evalúa $\hat y$ en las esquinas y bordes (o en una grilla fina, que es la idea del análisis de cordillera del libro), sin salir de la zona estudiada.</p><p>Evaluando $\hat y$ en una grilla sobre la región del factorial, $[-1;\ 1]^3$: el menor valor está en $x_1=1,\ x_2=-0{,}15,\ x_3=0{,}15$, es decir temperatura ≈ 170 °C, humedad ≈ 33,5 %, velocidad ≈ 915 rpm, con $\hat y\approx-1{,}812$. Si se quiere ir más allá, se hace un nuevo experimento en esa dirección y se confirma con corridas reales.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(3.7, 2, 33.4, 4.4, 10, 6, 4.5, 3.3, 3.9, 3.7, 31, 21, 3.5, 4.5, 6.4), x1 = c(-1, 1, -1, 1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); B <- matrix(0, 3, 3); co <- coef(m); vs <- c("x1", "x2", "x3"); for (i in 1:3) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 3) for (j in (i + 1):3) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: -0.092, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(3.7, 2, 33.4, 4.4, 10, 6, 4.5, 3.3, 3.9, 3.7, 31, 21, 3.5, 4.5, 6.4), x1 = c(-1, 1, -1, 1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); summary(m)$r.squared})", esperado: 0.94, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 27 (p. 426)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" },
      { id: "C8.2", loc: "slides 19–22, 38–39" }
    ]
  },
  {
    id: "m23-d017",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c06",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 27 (p. 426)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 27 · Hojuelas de soya: Box-Behnken (un dato cambiado)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 27 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: la corrida (−1, 1, 0) dio 25,4 (en vez de 33,4).</p><p>Aguilera y Kosikowski estudiaron la elaboración de hojuelas de soya por extrusión con un Box-Behnken: temperatura (120/145/170 °C), humedad (25/35/45 %) y velocidad de tornillo (800/900/1000 rpm). Interesa <strong>minimizar</strong> la respuesta.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_1$</th><th>$x_2$</th><th>$x_3$</th><th>$Y$</th></tr></thead><tbody><tr><td>$−1$</td><td>$−1$</td><td>$0$</td><td>$3{,}7$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$0$</td><td>$2$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$0$</td><td>$25{,}4$</td></tr><tr><td>$1$</td><td>$1$</td><td>$0$</td><td>$4{,}4$</td></tr><tr><td>$−1$</td><td>$0$</td><td>$−1$</td><td>$10$</td></tr><tr><td>$−1$</td><td>$0$</td><td>$1$</td><td>$6$</td></tr><tr><td>$1$</td><td>$0$</td><td>$−1$</td><td>$4{,}5$</td></tr><tr><td>$1$</td><td>$0$</td><td>$1$</td><td>$3{,}3$</td></tr><tr><td>$0$</td><td>$−1$</td><td>$−1$</td><td>$3{,}9$</td></tr><tr><td>$0$</td><td>$−1$</td><td>$1$</td><td>$3{,}7$</td></tr><tr><td>$0$</td><td>$1$</td><td>$−1$</td><td>$31$</td></tr><tr><td>$0$</td><td>$1$</td><td>$1$</td><td>$21$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$3{,}5$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$4{,}5$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$6{,}4$</td></tr></tbody></table></div><ol type="a"><li>Ajuste un modelo de segundo orden.</li><li>Verifique que el modelo sea adecuado. ¿Es útil para predecir?</li><li>Encuentre la ecuación canónica (valores propios).</li><li>¿Qué tipo de superficie describe el modelo?</li><li>Si interesa minimizar, ¿es el tipo de superficie deseado? Si no, ¿qué se debe hacer?</li><li>De ser necesario, determine el mejor punto posible dentro de la región experimental.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para minimizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(3.7, 2, 25.4, 4.4, 10, 6, 4.5, 3.3, 3.9, 3.7, 31, 21, 3.5, 4.5, 6.4), x1 = c(-1, 1, -1, 1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + 
    x1:x2 + x1:x3 + x2:x3, data = datos)

Residuals:
     1      2      3      4      5      6      7      8      9     10     11 
 4.350  0.725 -0.725 -4.350 -2.437 -1.187  1.187  2.437 -1.913 -3.163  3.163 
    12     13     14     15 
 1.913 -1.300 -0.300  1.600 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)   
(Intercept)    4.800      2.384   2.013  0.10022   
x1            -3.862      1.460  -2.646  0.04566 * 
x2             8.562      1.460   5.865  0.00204 **
x3            -1.925      1.460  -1.319  0.24449   
I(x1^2)       -2.438      2.149  -1.134  0.30812   
I(x2^2)        6.513      2.149   3.031  0.02906 * 
I(x3^2)        3.587      2.149   1.669  0.15591   
x1:x2         -4.825      2.065  -2.337  0.06663 . 
x1:x3          0.700      2.065   0.339  0.74836   
x2:x3         -2.450      2.065  -1.187  0.28868   
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 4.129 on 5 degrees of freedom
Multiple R-squared:  0.9271,	Adjusted R-squared:  0.7958 
F-statistic: 7.063 on 9 and 5 DF,  p-value: 0.02221


Call:
rsm(formula = y ~ SO(x1, x2, x3), data = datos)

            Estimate Std. Error t value Pr(>|t|)   
(Intercept)   4.8000     2.3841  2.0134 0.100216   
x1           -3.8625     1.4599 -2.6456 0.045665 * 
x2            8.5625     1.4599  5.8649 0.002044 **
x3           -1.9250     1.4599 -1.3185 0.244486   
x1:x2        -4.8250     2.0647 -2.3369 0.066634 . 
x1:x3         0.7000     2.0647  0.3390 0.748357   
x2:x3        -2.4500     2.0647 -1.1866 0.288678   
x1^2         -2.4375     2.1490 -1.1343 0.308120   
x2^2          6.5125     2.1490  3.0305 0.029065 * 
x3^2          3.5875     2.1490  1.6694 0.155908   
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.9271,	Adjusted R-squared:  0.7958 
F-statistic: 7.063 on 9 and 5 DF,  p-value: 0.02221

Analysis of Variance Table

Response: y
                Df Sum Sq Mean Sq F value   Pr(>F)
FO(x1, x2, x3)   3 735.53 245.176 14.3785 0.006816
TWI(x1, x2, x3)  3 119.09  39.697  2.3281 0.191536
PQ(x1, x2, x3)   3 229.24  76.413  4.4813 0.069954
Residuals        5  85.26  17.051                 
Lack of fit      3  80.92  26.972 12.4297 0.075377
Pure error       2   4.34   2.170                 

Stationary point of response surface:
         x1          x2          x3 
-0.10501371 -0.68809386  0.04357904 

Eigenanalysis:
eigen() decomposition
$values
[1]  7.532438  3.176679 -3.046617

$vectors
         [,1]        [,2]         [,3]
x1  0.2339917 -0.06930463  0.969765319
x2 -0.9224303  0.29934000  0.243962785
x3  0.3071973  0.95162620 -0.006114371`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(3.7, 2, 25.4, 4.4, 10, 6, 4.5, 3.3, 3.9, 3.7, 31, 21, 3.5, 4.5, 6.4), x1 = c(-1, 1, -1, 1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p><strong>Box-Behnken</strong> con $k=3$: 12 puntos de arista + 3 centros = 15 corridas (el central compuesto necesitaría 20). Tres niveles por factor.</p><p>Codificación: $x_1=\dfrac{T-145}{25}$, $x_2=\dfrac{H-35}{10}$, $x_3=\dfrac{V-900}{100}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=4{,}8-3{,}863\,x_1+8{,}563\,x_2-1{,}925\,x_3-2{,}438\,x_1^2+6{,}513\,x_2^2+3{,}588\,x_3^2-4{,}825\,x_1x_2+0{,}7\,x_1x_3-2{,}45\,x_2x_3$$</p><p>Términos: lineales $x_1,x_2,x_3$; cuadráticos $x_1^2,x_2^2,x_3^2$ (curvatura); interacciones $x_1x_2,x_1x_3,x_2x_3$. Significativos al 5 %: $x_1$, $x_2$, $x_2^2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); ninguna interacción es significativa: cada factor actúa por separado.</p><p>$F$ global $=7{,}06$ con $(9,5)$ gl, $p=0{,}0222$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}9271$ (explica el 92,7 % de la variabilidad) y $R^2_{aj}=0{,}7958$, bastante menor: hay términos que no aportan. Falta de ajuste (con las réplicas del centro como error puro): $F=12{,}43$, $p=0{,}0754$ ⇒ no hay evidencia de falta de ajuste.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-3{,}8625-4{,}875x_1-4{,}825x_2+0{,}7x_3=0\\\frac{\partial\hat y}{\partial x_2}=8{,}5625-4{,}825x_1+13{,}025x_2-2{,}45x_3=0\\\frac{\partial\hat y}{\partial x_3}=-1{,}925+0{,}7x_1-2{,}45x_2+7{,}175x_3=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-3{,}8625;\ 8{,}5625;\ -1{,}925)$ y $B=\begin{pmatrix}-2{,}4375&-2{,}4125&0{,}35\\-2{,}4125&6{,}5125&-1{,}225\\0{,}35&-1{,}225&3{,}5875\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=-0{,}105,\ x_2^*=-0{,}688,\ x_3^*=0{,}044$ ⇒ en unidades reales temperatura $=145+25(-0{,}105)=142{,}375$ °C; humedad $=35+10(-0{,}688)=28{,}119$ %; velocidad $=900+100(0{,}044)=904{,}358$ rpm. Valor predicho: $\hat y(\mathbf x_s)=2{,}015$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-4{,}875&-4{,}825&0{,}7\\-4{,}825&13{,}025&-2{,}45\\0{,}7&-2{,}45&7{,}175\end{pmatrix}$.</p><p></p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=7{,}5324;\ 3{,}1767;\ -3{,}0466$, de signos mezclados ⇒ <strong>punto silla</strong>: sube en una dirección y baja en otra.</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca minimizar, pero el punto estacionario es un <strong>punto silla</strong>, no un mínimo. Como dice la clase, entonces el óptimo está en la <strong>frontera</strong> de la región: se evalúa $\hat y$ en las esquinas y bordes (o en una grilla fina, que es la idea del análisis de cordillera del libro), sin salir de la zona estudiada.</p><p>Evaluando $\hat y$ en una grilla sobre la región del factorial, $[-1;\ 1]^3$: el menor valor está en $x_1=1,\ x_2=-0{,}25,\ x_3=0{,}1$, es decir temperatura ≈ 170 °C, humedad ≈ 32,5 %, velocidad ≈ 910 rpm, con $\hat y\approx-2{,}053$. Si se quiere ir más allá, se hace un nuevo experimento en esa dirección y se confirma con corridas reales.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(3.7, 2, 25.4, 4.4, 10, 6, 4.5, 3.3, 3.9, 3.7, 31, 21, 3.5, 4.5, 6.4), x1 = c(-1, 1, -1, 1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); B <- matrix(0, 3, 3); co <- coef(m); vs <- c("x1", "x2", "x3"); for (i in 1:3) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 3) for (j in (i + 1):3) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: -0.105, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(3.7, 2, 25.4, 4.4, 10, 6, 4.5, 3.3, 3.9, 3.7, 31, 21, 3.5, 4.5, 6.4), x1 = c(-1, 1, -1, 1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); summary(m)$r.squared})", esperado: 0.9271, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 27 (p. 426)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" },
      { id: "C8.2", loc: "slides 19–22, 38–39" }
    ]
  },
  {
    id: "m23-d018",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c06",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 27 (p. 426)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 27 · Hojuelas de soya: Box-Behnken (otro centro)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 27 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: los centros dieron 4,0; 4,2 y 4,4.</p><p>Aguilera y Kosikowski estudiaron la elaboración de hojuelas de soya por extrusión con un Box-Behnken: temperatura (120/145/170 °C), humedad (25/35/45 %) y velocidad de tornillo (800/900/1000 rpm). Interesa <strong>minimizar</strong> la respuesta.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_1$</th><th>$x_2$</th><th>$x_3$</th><th>$Y$</th></tr></thead><tbody><tr><td>$−1$</td><td>$−1$</td><td>$0$</td><td>$3{,}7$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$0$</td><td>$2$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$0$</td><td>$33{,}4$</td></tr><tr><td>$1$</td><td>$1$</td><td>$0$</td><td>$4{,}4$</td></tr><tr><td>$−1$</td><td>$0$</td><td>$−1$</td><td>$10$</td></tr><tr><td>$−1$</td><td>$0$</td><td>$1$</td><td>$6$</td></tr><tr><td>$1$</td><td>$0$</td><td>$−1$</td><td>$4{,}5$</td></tr><tr><td>$1$</td><td>$0$</td><td>$1$</td><td>$3{,}3$</td></tr><tr><td>$0$</td><td>$−1$</td><td>$−1$</td><td>$3{,}9$</td></tr><tr><td>$0$</td><td>$−1$</td><td>$1$</td><td>$3{,}7$</td></tr><tr><td>$0$</td><td>$1$</td><td>$−1$</td><td>$31$</td></tr><tr><td>$0$</td><td>$1$</td><td>$1$</td><td>$21$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$4$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$4{,}2$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$4{,}4$</td></tr></tbody></table></div><ol type="a"><li>Ajuste un modelo de segundo orden.</li><li>Verifique que el modelo sea adecuado. ¿Es útil para predecir?</li><li>Encuentre la ecuación canónica (valores propios).</li><li>¿Qué tipo de superficie describe el modelo?</li><li>Si interesa minimizar, ¿es el tipo de superficie deseado? Si no, ¿qué se debe hacer?</li><li>De ser necesario, determine el mejor punto posible dentro de la región experimental.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para minimizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(3.7, 2, 33.4, 4.4, 10, 6, 4.5, 3.3, 3.9, 3.7, 31, 21, 4, 4.2, 4.4), x1 = c(-1, 1, -1, 1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + 
    x1:x2 + x1:x3 + x2:x3, data = datos)

Residuals:
         1          2          3          4          5          6          7 
 4.350e+00 -1.275e+00  1.275e+00 -4.350e+00 -3.437e+00 -2.187e+00  2.187e+00 
         8          9         10         11         12         13         14 
 3.438e+00 -9.125e-01 -2.163e+00  2.163e+00  9.125e-01 -2.000e-01 -2.887e-15 
        15 
 2.000e-01 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)   
(Intercept)    4.200      2.386   1.760  0.13868   
x1            -4.862      1.461  -3.328  0.02083 * 
x2             9.562      1.461   6.545  0.00125 **
x3            -1.925      1.461  -1.317  0.24482   
I(x1^2)       -1.137      2.151  -0.529  0.61951   
I(x2^2)        7.812      2.151   3.632  0.01502 * 
I(x3^2)        2.888      2.151   1.343  0.23714   
x1:x2         -6.825      2.066  -3.303  0.02141 * 
x1:x3          0.700      2.066   0.339  0.74855   
x2:x3         -2.450      2.066  -1.186  0.28903   
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 4.133 on 5 degrees of freedom
Multiple R-squared:  0.9433,	Adjusted R-squared:  0.8413 
F-statistic: 9.244 on 9 and 5 DF,  p-value: 0.01234


Call:
rsm(formula = y ~ SO(x1, x2, x3), data = datos)

            Estimate Std. Error t value Pr(>|t|)   
(Intercept)   4.2000     2.3860  1.7602 0.138680   
x1           -4.8625     1.4611 -3.3279 0.020827 * 
x2            9.5625     1.4611  6.5445 0.001247 **
x3           -1.9250     1.4611 -1.3175 0.244822   
x1:x2        -6.8250     2.0664 -3.3029 0.021407 * 
x1:x3         0.7000     2.0664  0.3388 0.748555   
x2:x3        -2.4500     2.0664 -1.1857 0.289029   
x1^2         -1.1375     2.1507 -0.5289 0.619512   
x2^2          7.8125     2.1507  3.6325 0.015022 * 
x3^2          2.8875     2.1507  1.3426 0.237142   
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.9433,	Adjusted R-squared:  0.8413 
F-statistic: 9.244 on 9 and 5 DF,  p-value: 0.01234

Analysis of Variance Table

Response: y
                Df Sum Sq Mean Sq  F value   Pr(>F)
FO(x1, x2, x3)   3 950.33  316.78  18.5471 0.003858
TWI(x1, x2, x3)  3 212.29   70.76   4.1432 0.080007
PQ(x1, x2, x3)   3 258.28   86.09   5.0408 0.056834
Residuals        5  85.40   17.08                  
Lack of fit      3  85.32   28.44 710.9792 0.001405
Pure error       2   0.08    0.04                  

Stationary point of response surface:
         x1          x2          x3 
-0.13534285 -0.66019578  0.06965547 

Eigenanalysis:
eigen() decomposition
$values
[1]  9.220897  2.632509 -2.290905

$vectors
         [,1]        [,2]       [,3]
x1  0.3127667 -0.07444555 0.94690805
x2 -0.9291750  0.18279137 0.32128040
x3  0.1970045  0.98032911 0.01200189`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(3.7, 2, 33.4, 4.4, 10, 6, 4.5, 3.3, 3.9, 3.7, 31, 21, 4, 4.2, 4.4), x1 = c(-1, 1, -1, 1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p><strong>Box-Behnken</strong> con $k=3$: 12 puntos de arista + 3 centros = 15 corridas (el central compuesto necesitaría 20). Tres niveles por factor.</p><p>Codificación: $x_1=\dfrac{T-145}{25}$, $x_2=\dfrac{H-35}{10}$, $x_3=\dfrac{V-900}{100}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=4{,}2-4{,}863\,x_1+9{,}563\,x_2-1{,}925\,x_3-1{,}138\,x_1^2+7{,}813\,x_2^2+2{,}888\,x_3^2-6{,}825\,x_1x_2+0{,}7\,x_1x_3-2{,}45\,x_2x_3$$</p><p>Términos: lineales $x_1,x_2,x_3$; cuadráticos $x_1^2,x_2^2,x_3^2$ (curvatura); interacciones $x_1x_2,x_1x_3,x_2x_3$. Significativos al 5 %: $x_1$, $x_2$, $x_2^2$, $x_1x_2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); hay <strong>interacción</strong>: el efecto de un factor depende del nivel del otro.</p><p>$F$ global $=9{,}24$ con $(9,5)$ gl, $p=0{,}0123$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}9433$ (explica el 94,3 % de la variabilidad) y $R^2_{aj}=0{,}8413$, bastante menor: hay términos que no aportan. Falta de ajuste (con las réplicas del centro como error puro): $F=710{,}979$, $p=0{,}0014$ ⇒ hay falta de ajuste: el modelo de segundo orden se queda corto para describir la superficie.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-4{,}8625-2{,}275x_1-6{,}825x_2+0{,}7x_3=0\\\frac{\partial\hat y}{\partial x_2}=9{,}5625-6{,}825x_1+15{,}625x_2-2{,}45x_3=0\\\frac{\partial\hat y}{\partial x_3}=-1{,}925+0{,}7x_1-2{,}45x_2+5{,}775x_3=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-4{,}8625;\ 9{,}5625;\ -1{,}925)$ y $B=\begin{pmatrix}-1{,}1375&-3{,}4125&0{,}35\\-3{,}4125&7{,}8125&-1{,}225\\0{,}35&-1{,}225&2{,}8875\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=-0{,}135,\ x_2^*=-0{,}66,\ x_3^*=0{,}07$ ⇒ en unidades reales temperatura $=145+25(-0{,}135)=141{,}616$ °C; humedad $=35+10(-0{,}66)=28{,}398$ %; velocidad $=900+100(0{,}07)=906{,}966$ rpm. Valor predicho: $\hat y(\mathbf x_s)=1{,}305$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-2{,}275&-6{,}825&0{,}7\\-6{,}825&15{,}625&-2{,}45\\0{,}7&-2{,}45&5{,}775\end{pmatrix}$.</p><p></p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=9{,}2209;\ 2{,}6325;\ -2{,}2909$, de signos mezclados ⇒ <strong>punto silla</strong>: sube en una dirección y baja en otra.</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca minimizar, pero el punto estacionario es un <strong>punto silla</strong>, no un mínimo. Como dice la clase, entonces el óptimo está en la <strong>frontera</strong> de la región: se evalúa $\hat y$ en las esquinas y bordes (o en una grilla fina, que es la idea del análisis de cordillera del libro), sin salir de la zona estudiada.</p><p>Evaluando $\hat y$ en una grilla sobre la región del factorial, $[-1;\ 1]^3$: el menor valor está en $x_1=1,\ x_2=-0{,}15,\ x_3=0{,}15$, es decir temperatura ≈ 170 °C, humedad ≈ 33,5 %, velocidad ≈ 915 rpm, con $\hat y\approx-2{,}099$. Si se quiere ir más allá, se hace un nuevo experimento en esa dirección y se confirma con corridas reales.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(3.7, 2, 33.4, 4.4, 10, 6, 4.5, 3.3, 3.9, 3.7, 31, 21, 4, 4.2, 4.4), x1 = c(-1, 1, -1, 1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); B <- matrix(0, 3, 3); co <- coef(m); vs <- c("x1", "x2", "x3"); for (i in 1:3) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 3) for (j in (i + 1):3) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: -0.135, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(3.7, 2, 33.4, 4.4, 10, 6, 4.5, 3.3, 3.9, 3.7, 31, 21, 4, 4.2, 4.4), x1 = c(-1, 1, -1, 1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); summary(m)$r.squared})", esperado: 0.9433, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 27 (p. 426)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" },
      { id: "C8.2", loc: "slides 19–22, 38–39" }
    ]
  },
  {
    id: "m23-d019",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 12, ej. 28 · Fuerza de arrastre de una soldadura: central compuesto ortogonal",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 12, ej. 28 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Para maximizar la fuerza de arrastre de una soldadura se corrió un $2^3$ con dos centros (2 réplicas) en tiempo $T$ (3/5/7 ms), potencia $P$ (3,0/4,3/5,6 W) y fuerza $F$ (700/750/800 g); al detectar curvatura se agregaron puntos axiales en $\pm1{,}28$ (2 réplicas). Se analizan las 32 corridas (codificadas; en la tabla, cada fila trae sus 2 réplicas). Nota: en la tabla del libro la fila (−1, 1, 1) dice fuerza «80»; por la codificación es 800 g.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_1$ (T)</th><th>$x_2$ (P)</th><th>$x_3$ (F)</th><th>Fuerza de arrastre</th></tr></thead><tbody><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$1981; 1645$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$−1$</td><td>$1506; 1157$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$−1$</td><td>$1308; 913$</td></tr><tr><td>$1$</td><td>$1$</td><td>$1$</td><td>$1682; 1049$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$1$</td><td>$908; 1094$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$1$</td><td>$1633; 1428$</td></tr><tr><td>$1$</td><td>$1$</td><td>$−1$</td><td>$1059; 1407$</td></tr><tr><td>$−1$</td><td>$−1$</td><td>$1$</td><td>$875; 967$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$1792; 1948$</td></tr><tr><td>$−1$</td><td>$−1$</td><td>$−1$</td><td>$750; 666$</td></tr><tr><td>$−1{,}28$</td><td>$0$</td><td>$0$</td><td>$1404; 1322$</td></tr><tr><td>$0$</td><td>$−1{,}28$</td><td>$0$</td><td>$740; 756$</td></tr><tr><td>$1{,}28$</td><td>$0$</td><td>$0$</td><td>$1656; 1512$</td></tr><tr><td>$0$</td><td>$0$</td><td>$−1{,}28$</td><td>$1482; 1485$</td></tr><tr><td>$0$</td><td>$1{,}28$</td><td>$0$</td><td>$1659; 1458$</td></tr><tr><td>$0$</td><td>$0$</td><td>$1{,}28$</td><td>$1517; 1176$</td></tr></tbody></table></div><ol type="a"><li>¿Qué utilidad tienen los puntos al centro?</li><li>Ajuste un modelo de segundo orden completo.</li><li>Caracterice la superficie: ¿qué tipo de superficie es?</li><li>Determine las condiciones de operación que maximizan la fuerza de arrastre.</li><li>Verifique residuos.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para maximizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(1981, 1645, 1506, 1157, 1308, 913, 1682, 1049, 908, 1094, 1633, 1428, 1059, 1407, 875, 967, 1792, 1948, 750, 666, 1404, 1322, 740, 756, 1656, 1512, 1482, 1485, 1659, 1458, 1517, 1176), x1 = c(0, 0, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 0, 0, -1, -1, -1.28, -1.28, 0, 0, 1.28, 1.28, 0, 0, 0, 0, 0, 0), x2 = c(0, 0, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 0, 0, -1, -1, 0, 0, -1.28, -1.28, 0, 0, 0, 0, 1.28, 1.28, 0, 0), x3 = c(0, 0, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, -1.28, -1.28, 0, 0, 1.28, 1.28))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + 
    x1:x2 + x1:x3 + x2:x3, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-331.82 -119.59   21.15  118.91  359.14 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  1755.25      79.32  22.128  < 2e-16 ***
x1             44.51      40.98   1.086  0.28923    
x2            244.52      40.98   5.967 5.27e-06 ***
x3             23.02      40.98   0.562  0.57991    
I(x1^2)      -133.30      59.11  -2.255  0.03442 *  
I(x2^2)      -328.76      59.11  -5.562 1.37e-05 ***
I(x3^2)      -169.00      59.11  -2.859  0.00912 ** 
x1:x2         -93.25      48.65  -1.917  0.06838 .  
x1:x3         -48.62      48.65  -0.999  0.32847    
x2:x3          28.50      48.65   0.586  0.56400    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 194.6 on 22 degrees of freedom
Multiple R-squared:  0.7981,	Adjusted R-squared:  0.7156 
F-statistic: 9.665 on 9 and 22 DF,  p-value: 8.006e-06


Call:
rsm(formula = y ~ SO(x1, x2, x3), data = datos)

            Estimate Std. Error t value  Pr(>|t|)    
(Intercept) 1755.245     79.321 22.1285 < 2.2e-16 ***
x1            44.506     40.981  1.0860  0.289230    
x2           244.523     40.981  5.9668 5.266e-06 ***
x3            23.024     40.981  0.5618  0.579910    
x1:x2        -93.250     48.655 -1.9166  0.068376 .  
x1:x3        -48.625     48.655 -0.9994  0.328475    
x2:x3         28.500     48.655  0.5858  0.564000    
x1^2        -133.299     59.113 -2.2550  0.034420 *  
x2^2        -328.764     59.113 -5.5617 1.368e-05 ***
x3^2        -169.005     59.113 -2.8590  0.009122 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.7981,	Adjusted R-squared:  0.7156 
F-statistic: 9.665 on 9 and 22 DF,  p-value: 8.006e-06

Analysis of Variance Table

Response: y
                Df  Sum Sq Mean Sq F value    Pr(>F)
FO(x1, x2, x3)   3 1405145  468382 12.3659 5.973e-05
TWI(x1, x2, x3)  3  189955   63318  1.6717    0.2021
PQ(x1, x2, x3)   3 1699546  566515 14.9568 1.580e-05
Residuals       22  833292   37877                  
Lack of fit      5  223343   44669  1.2450    0.3318
Pure error      17  609948   35879                  

Stationary point of response surface:
        x1         x2         x3 
0.01863984 0.37344018 0.09692327 

Eigenanalysis:
eigen() decomposition
$values
[1] -110.3759 -180.9408 -339.7508

$vectors
         [,1]       [,2]        [,3]
x1  0.8823290  0.4190121 -0.21429981
x2 -0.2156687 -0.0447388 -0.97544115
x3 -0.4183092  0.9068778  0.05089347`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(1981, 1645, 1506, 1157, 1308, 913, 1682, 1049, 908, 1094, 1633, 1428, 1059, 1407, 875, 967, 1792, 1948, 750, 666, 1404, 1322, 740, 756, 1656, 1512, 1482, 1485, 1659, 1458, 1517, 1176), x1 = c(0, 0, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 0, 0, -1, -1, -1.28, -1.28, 0, 0, 1.28, 1.28, 0, 0, 0, 0, 0, 0), x2 = c(0, 0, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 0, 0, -1, -1, 0, 0, -1.28, -1.28, 0, 0, 0, 0, 1.28, 1.28, 0, 0), x3 = c(0, 0, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, -1.28, -1.28, 0, 0, 1.28, 1.28))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p>Primero un $2^3$ + centro (sirve para el error puro y para detectar curvatura); luego se agregan 6 puntos axiales a $\pm1{,}28$ ⇒ <strong>central compuesto ortogonal</strong> (no rotable: el equipo no permite abrir más los niveles).</p><p>Codificación: $x_1=\dfrac{T-5}{2}$, $x_2=\dfrac{P-4{,}3}{1{,}3}$, $x_3=\dfrac{F-750}{50}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=1755+44{,}51\,x_1+244{,}5\,x_2+23{,}02\,x_3-133{,}3\,x_1^2-328{,}8\,x_2^2-169\,x_3^2-93{,}25\,x_1x_2-48{,}63\,x_1x_3+28{,}5\,x_2x_3$$</p><p>Términos: lineales $x_1,x_2,x_3$; cuadráticos $x_1^2,x_2^2,x_3^2$ (curvatura); interacciones $x_1x_2,x_1x_3,x_2x_3$. Significativos al 5 %: $x_2$, $x_1^2$, $x_2^2$, $x_3^2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); ninguna interacción es significativa: cada factor actúa por separado.</p><p>$F$ global $=9{,}66$ con $(9,22)$ gl, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}7981$ (explica el 79,8 % de la variabilidad) y $R^2_{aj}=0{,}7156$. Falta de ajuste (con las réplicas del centro como error puro): $F=1{,}245$, $p=0{,}3318$ ⇒ no hay evidencia de falta de ajuste.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=44{,}5055-266{,}5979x_1-93{,}25x_2-48{,}625x_3=0\\\frac{\partial\hat y}{\partial x_2}=244{,}5233-93{,}25x_1-657{,}5281x_2+28{,}5x_3=0\\\frac{\partial\hat y}{\partial x_3}=23{,}0243-48{,}625x_1+28{,}5x_2-338{,}0091x_3=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(44{,}5055;\ 244{,}5233;\ 23{,}0243)$ y $B=\begin{pmatrix}-133{,}299&-46{,}625&-24{,}3125\\-46{,}625&-328{,}7641&14{,}25\\-24{,}3125&14{,}25&-169{,}0045\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=0{,}019,\ x_2^*=0{,}373,\ x_3^*=0{,}097$ ⇒ en unidades reales tiempo $=5+2(0{,}019)=5{,}037$ ms; potencia $=4{,}3+1{,}3(0{,}373)=4{,}785$ W; fuerza $=750+50(0{,}097)=754{,}846$ g. Valor predicho: $\hat y(\mathbf x_s)=1802{,}433$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-266{,}5979&-93{,}25&-48{,}625\\-93{,}25&-657{,}5281&28{,}5\\-48{,}625&28{,}5&-338{,}0091\end{pmatrix}$.</p><p></p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=-110{,}3759;\ -180{,}9408;\ -339{,}7508$, todos negativos ⇒ <strong>máximo</strong> (la superficie es una «loma»).</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca maximizar y el punto estacionario es un máximo que cae <strong>dentro</strong> de la región experimental (todas las $|x_i^*|\le1{,}28$): es el óptimo. tiempo ≈ 5,037 ms, potencia ≈ 4,785 W, fuerza ≈ 754,846 g, con $\hat y\approx1802{,}433$.</p><p>Siguiente paso: confirmar con corridas reales en ese punto.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(1981, 1645, 1506, 1157, 1308, 913, 1682, 1049, 908, 1094, 1633, 1428, 1059, 1407, 875, 967, 1792, 1948, 750, 666, 1404, 1322, 740, 756, 1656, 1512, 1482, 1485, 1659, 1458, 1517, 1176), x1 = c(0, 0, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 0, 0, -1, -1, -1.28, -1.28, 0, 0, 1.28, 1.28, 0, 0, 0, 0, 0, 0), x2 = c(0, 0, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 0, 0, -1, -1, 0, 0, -1.28, -1.28, 0, 0, 0, 0, 1.28, 1.28, 0, 0), x3 = c(0, 0, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, -1.28, -1.28, 0, 0, 1.28, 1.28)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); B <- matrix(0, 3, 3); co <- coef(m); vs <- c("x1", "x2", "x3"); for (i in 1:3) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 3) for (j in (i + 1):3) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: 0.019, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(1981, 1645, 1506, 1157, 1308, 913, 1682, 1049, 908, 1094, 1633, 1428, 1059, 1407, 875, 967, 1792, 1948, 750, 666, 1404, 1322, 740, 756, 1656, 1512, 1482, 1485, 1659, 1458, 1517, 1176), x1 = c(0, 0, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 0, 0, -1, -1, -1.28, -1.28, 0, 0, 1.28, 1.28, 0, 0, 0, 0, 0, 0), x2 = c(0, 0, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 0, 0, -1, -1, 0, 0, -1.28, -1.28, 0, 0, 0, 0, 1.28, 1.28, 0, 0), x3 = c(0, 0, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, -1.28, -1.28, 0, 0, 1.28, 1.28)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); summary(m)$r.squared})", esperado: 0.7981, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 28 (pp. 426–428)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d020",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 28 (pp. 426–428)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 28 · Fuerza de arrastre de una soldadura: central compuesto ortogonal (otro axial)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 28 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: el axial de potencia baja (−1,28) dio 940 y 956 (en vez de 740 y 756).</p><p>Para maximizar la fuerza de arrastre de una soldadura se corrió un $2^3$ con dos centros (2 réplicas) en tiempo $T$ (3/5/7 ms), potencia $P$ (3,0/4,3/5,6 W) y fuerza $F$ (700/750/800 g); al detectar curvatura se agregaron puntos axiales en $\pm1{,}28$ (2 réplicas). Se analizan las 32 corridas (codificadas; en la tabla, cada fila trae sus 2 réplicas). Nota: en la tabla del libro la fila (−1, 1, 1) dice fuerza «80»; por la codificación es 800 g.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_1$ (T)</th><th>$x_2$ (P)</th><th>$x_3$ (F)</th><th>Fuerza de arrastre</th></tr></thead><tbody><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$1981; 1645$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$−1$</td><td>$1506; 1157$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$−1$</td><td>$1308; 913$</td></tr><tr><td>$1$</td><td>$1$</td><td>$1$</td><td>$1682; 1049$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$1$</td><td>$908; 1094$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$1$</td><td>$1633; 1428$</td></tr><tr><td>$1$</td><td>$1$</td><td>$−1$</td><td>$1059; 1407$</td></tr><tr><td>$−1$</td><td>$−1$</td><td>$1$</td><td>$875; 967$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$1792; 1948$</td></tr><tr><td>$−1$</td><td>$−1$</td><td>$−1$</td><td>$750; 666$</td></tr><tr><td>$−1{,}28$</td><td>$0$</td><td>$0$</td><td>$1404; 1322$</td></tr><tr><td>$0$</td><td>$−1{,}28$</td><td>$0$</td><td>$940; 956$</td></tr><tr><td>$1{,}28$</td><td>$0$</td><td>$0$</td><td>$1656; 1512$</td></tr><tr><td>$0$</td><td>$0$</td><td>$−1{,}28$</td><td>$1482; 1485$</td></tr><tr><td>$0$</td><td>$1{,}28$</td><td>$0$</td><td>$1659; 1458$</td></tr><tr><td>$0$</td><td>$0$</td><td>$1{,}28$</td><td>$1517; 1176$</td></tr></tbody></table></div><ol type="a"><li>¿Qué utilidad tienen los puntos al centro?</li><li>Ajuste un modelo de segundo orden completo.</li><li>Caracterice la superficie: ¿qué tipo de superficie es?</li><li>Determine las condiciones de operación que maximizan la fuerza de arrastre.</li><li>Verifique residuos.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para maximizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(1981, 1645, 1506, 1157, 1308, 913, 1682, 1049, 908, 1094, 1633, 1428, 1059, 1407, 875, 967, 1792, 1948, 750, 666, 1404, 1322, 940, 956, 1656, 1512, 1482, 1485, 1659, 1458, 1517, 1176), x1 = c(0, 0, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 0, 0, -1, -1, -1.28, -1.28, 0, 0, 1.28, 1.28, 0, 0, 0, 0, 0, 0), x2 = c(0, 0, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 0, 0, -1, -1, 0, 0, -1.28, -1.28, 0, 0, 0, 0, 1.28, 1.28, 0, 0), x3 = c(0, 0, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, -1.28, -1.28, 0, 0, 1.28, 1.28))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + 
    x1:x2 + x1:x3 + x2:x3, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-313.72  -95.18   16.62  101.74  374.43 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  1779.89      74.97  23.741  < 2e-16 ***
x1             44.51      38.73   1.149  0.26289    
x2            221.82      38.73   5.727 9.25e-06 ***
x3             23.02      38.73   0.594  0.55829    
I(x1^2)      -159.39      55.87  -2.853  0.00925 ** 
I(x2^2)      -293.82      55.87  -5.259 2.82e-05 ***
I(x3^2)      -195.09      55.87  -3.492  0.00206 ** 
x1:x2         -93.25      45.99  -2.028  0.05487 .  
x1:x3         -48.62      45.99  -1.057  0.30182    
x2:x3          28.50      45.99   0.620  0.54180    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 183.9 on 22 degrees of freedom
Multiple R-squared:  0.8016,	Adjusted R-squared:  0.7205 
F-statistic: 9.879 on 9 and 22 DF,  p-value: 6.692e-06


Call:
rsm(formula = y ~ SO(x1, x2, x3), data = datos)

            Estimate Std. Error t value  Pr(>|t|)    
(Intercept) 1779.889     74.972 23.7408 < 2.2e-16 ***
x1            44.506     38.734  1.1490  0.262891    
x2           221.822     38.734  5.7268 9.251e-06 ***
x3            23.024     38.734  0.5944  0.558293    
x1:x2        -93.250     45.987 -2.0277  0.054869 .  
x1:x3        -48.625     45.987 -1.0574  0.301822    
x2:x3         28.500     45.987  0.6197  0.541798    
x1^2        -159.388     55.872 -2.8528  0.009254 ** 
x2^2        -293.818     55.872 -5.2588 2.822e-05 ***
x3^2        -195.093     55.872 -3.4918  0.002064 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.8016,	Adjusted R-squared:  0.7205 
F-statistic: 9.879 on 9 and 22 DF,  p-value: 6.692e-06

Analysis of Variance Table

Response: y
                Df  Sum Sq Mean Sq F value    Pr(>F)
FO(x1, x2, x3)   3 1166377  388792 11.4900 9.730e-05
TWI(x1, x2, x3)  3  189955   63318  1.8713    0.1640
PQ(x1, x2, x3)   3 1652210  550737 16.2760 8.494e-06
Residuals       22  744421   33837                  
Lack of fit      5  134473   26895  0.7496    0.5976
Pure error      17  609948   35879                  

Stationary point of response surface:
        x1         x2         x3 
0.01579782 0.37908466 0.08472878 

Eigenanalysis:
eigen() decomposition
$values
[1] -132.6757 -206.8485 -308.7741

$vectors
         [,1]       [,2]        [,3]
x1  0.8686170  0.4026030 -0.28881710
x2 -0.2870417 -0.0662475 -0.95562458
x3 -0.4038707  0.9129743  0.05802014`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(1981, 1645, 1506, 1157, 1308, 913, 1682, 1049, 908, 1094, 1633, 1428, 1059, 1407, 875, 967, 1792, 1948, 750, 666, 1404, 1322, 940, 956, 1656, 1512, 1482, 1485, 1659, 1458, 1517, 1176), x1 = c(0, 0, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 0, 0, -1, -1, -1.28, -1.28, 0, 0, 1.28, 1.28, 0, 0, 0, 0, 0, 0), x2 = c(0, 0, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 0, 0, -1, -1, 0, 0, -1.28, -1.28, 0, 0, 0, 0, 1.28, 1.28, 0, 0), x3 = c(0, 0, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, -1.28, -1.28, 0, 0, 1.28, 1.28))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p>Primero un $2^3$ + centro (sirve para el error puro y para detectar curvatura); luego se agregan 6 puntos axiales a $\pm1{,}28$ ⇒ <strong>central compuesto ortogonal</strong> (no rotable: el equipo no permite abrir más los niveles).</p><p>Codificación: $x_1=\dfrac{T-5}{2}$, $x_2=\dfrac{P-4{,}3}{1{,}3}$, $x_3=\dfrac{F-750}{50}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=1780+44{,}51\,x_1+221{,}8\,x_2+23{,}02\,x_3-159{,}4\,x_1^2-293{,}8\,x_2^2-195{,}1\,x_3^2-93{,}25\,x_1x_2-48{,}63\,x_1x_3+28{,}5\,x_2x_3$$</p><p>Términos: lineales $x_1,x_2,x_3$; cuadráticos $x_1^2,x_2^2,x_3^2$ (curvatura); interacciones $x_1x_2,x_1x_3,x_2x_3$. Significativos al 5 %: $x_2$, $x_1^2$, $x_2^2$, $x_3^2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); ninguna interacción es significativa: cada factor actúa por separado.</p><p>$F$ global $=9{,}88$ con $(9,22)$ gl, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}8016$ (explica el 80,2 % de la variabilidad) y $R^2_{aj}=0{,}7205$. Falta de ajuste (con las réplicas del centro como error puro): $F=0{,}75$, $p=0{,}5976$ ⇒ no hay evidencia de falta de ajuste.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=44{,}5055-318{,}7751x_1-93{,}25x_2-48{,}625x_3=0\\\frac{\partial\hat y}{\partial x_2}=221{,}8218-93{,}25x_1-587{,}635x_2+28{,}5x_3=0\\\frac{\partial\hat y}{\partial x_3}=23{,}0243-48{,}625x_1+28{,}5x_2-390{,}1863x_3=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(44{,}5055;\ 221{,}8218;\ 23{,}0243)$ y $B=\begin{pmatrix}-159{,}3876&-46{,}625&-24{,}3125\\-46{,}625&-293{,}8175&14{,}25\\-24{,}3125&14{,}25&-195{,}0931\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=0{,}016,\ x_2^*=0{,}379,\ x_3^*=0{,}085$ ⇒ en unidades reales tiempo $=5+2(0{,}016)=5{,}032$ ms; potencia $=4{,}3+1{,}3(0{,}379)=4{,}793$ W; fuerza $=750+50(0{,}085)=754{,}236$ g. Valor predicho: $\hat y(\mathbf x_s)=1823{,}261$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-318{,}7751&-93{,}25&-48{,}625\\-93{,}25&-587{,}635&28{,}5\\-48{,}625&28{,}5&-390{,}1863\end{pmatrix}$.</p><p></p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=-132{,}6757;\ -206{,}8485;\ -308{,}7741$, todos negativos ⇒ <strong>máximo</strong> (la superficie es una «loma»).</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca maximizar y el punto estacionario es un máximo que cae <strong>dentro</strong> de la región experimental (todas las $|x_i^*|\le1{,}28$): es el óptimo. tiempo ≈ 5,032 ms, potencia ≈ 4,793 W, fuerza ≈ 754,236 g, con $\hat y\approx1823{,}261$.</p><p>Siguiente paso: confirmar con corridas reales en ese punto.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(1981, 1645, 1506, 1157, 1308, 913, 1682, 1049, 908, 1094, 1633, 1428, 1059, 1407, 875, 967, 1792, 1948, 750, 666, 1404, 1322, 940, 956, 1656, 1512, 1482, 1485, 1659, 1458, 1517, 1176), x1 = c(0, 0, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 0, 0, -1, -1, -1.28, -1.28, 0, 0, 1.28, 1.28, 0, 0, 0, 0, 0, 0), x2 = c(0, 0, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 0, 0, -1, -1, 0, 0, -1.28, -1.28, 0, 0, 0, 0, 1.28, 1.28, 0, 0), x3 = c(0, 0, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, -1.28, -1.28, 0, 0, 1.28, 1.28)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); B <- matrix(0, 3, 3); co <- coef(m); vs <- c("x1", "x2", "x3"); for (i in 1:3) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 3) for (j in (i + 1):3) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: 0.016, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(1981, 1645, 1506, 1157, 1308, 913, 1682, 1049, 908, 1094, 1633, 1428, 1059, 1407, 875, 967, 1792, 1948, 750, 666, 1404, 1322, 940, 956, 1656, 1512, 1482, 1485, 1659, 1458, 1517, 1176), x1 = c(0, 0, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 0, 0, -1, -1, -1.28, -1.28, 0, 0, 1.28, 1.28, 0, 0, 0, 0, 0, 0), x2 = c(0, 0, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 0, 0, -1, -1, 0, 0, -1.28, -1.28, 0, 0, 0, 0, 1.28, 1.28, 0, 0), x3 = c(0, 0, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, -1.28, -1.28, 0, 0, 1.28, 1.28)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); summary(m)$r.squared})", esperado: 0.8016, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 28 (pp. 426–428)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d021",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 28 (pp. 426–428)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 28 · Fuerza de arrastre de una soldadura: central compuesto ortogonal (otro centro)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 28 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: los centros dieron 1 881/1 745 y 1 692/1 848.</p><p>Para maximizar la fuerza de arrastre de una soldadura se corrió un $2^3$ con dos centros (2 réplicas) en tiempo $T$ (3/5/7 ms), potencia $P$ (3,0/4,3/5,6 W) y fuerza $F$ (700/750/800 g); al detectar curvatura se agregaron puntos axiales en $\pm1{,}28$ (2 réplicas). Se analizan las 32 corridas (codificadas; en la tabla, cada fila trae sus 2 réplicas). Nota: en la tabla del libro la fila (−1, 1, 1) dice fuerza «80»; por la codificación es 800 g.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>$x_1$ (T)</th><th>$x_2$ (P)</th><th>$x_3$ (F)</th><th>Fuerza de arrastre</th></tr></thead><tbody><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$1881; 1745$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$−1$</td><td>$1506; 1157$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$−1$</td><td>$1308; 913$</td></tr><tr><td>$1$</td><td>$1$</td><td>$1$</td><td>$1682; 1049$</td></tr><tr><td>$1$</td><td>$−1$</td><td>$1$</td><td>$908; 1094$</td></tr><tr><td>$−1$</td><td>$1$</td><td>$1$</td><td>$1633; 1428$</td></tr><tr><td>$1$</td><td>$1$</td><td>$−1$</td><td>$1059; 1407$</td></tr><tr><td>$−1$</td><td>$−1$</td><td>$1$</td><td>$875; 967$</td></tr><tr><td>$0$</td><td>$0$</td><td>$0$</td><td>$1692; 1848$</td></tr><tr><td>$−1$</td><td>$−1$</td><td>$−1$</td><td>$750; 666$</td></tr><tr><td>$−1{,}28$</td><td>$0$</td><td>$0$</td><td>$1404; 1322$</td></tr><tr><td>$0$</td><td>$−1{,}28$</td><td>$0$</td><td>$740; 756$</td></tr><tr><td>$1{,}28$</td><td>$0$</td><td>$0$</td><td>$1656; 1512$</td></tr><tr><td>$0$</td><td>$0$</td><td>$−1{,}28$</td><td>$1482; 1485$</td></tr><tr><td>$0$</td><td>$1{,}28$</td><td>$0$</td><td>$1659; 1458$</td></tr><tr><td>$0$</td><td>$0$</td><td>$1{,}28$</td><td>$1517; 1176$</td></tr></tbody></table></div><ol type="a"><li>¿Qué utilidad tienen los puntos al centro?</li><li>Ajuste un modelo de segundo orden completo.</li><li>Caracterice la superficie: ¿qué tipo de superficie es?</li><li>Determine las condiciones de operación que maximizan la fuerza de arrastre.</li><li>Verifique residuos.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para maximizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(1881, 1745, 1506, 1157, 1308, 913, 1682, 1049, 908, 1094, 1633, 1428, 1059, 1407, 875, 967, 1692, 1848, 750, 666, 1404, 1322, 740, 756, 1656, 1512, 1482, 1485, 1659, 1458, 1517, 1176), x1 = c(0, 0, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 0, 0, -1, -1, -1.28, -1.28, 0, 0, 1.28, 1.28, 0, 0, 0, 0, 0, 0), x2 = c(0, 0, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 0, 0, -1, -1, 0, 0, -1.28, -1.28, 0, 0, 0, 0, 1.28, 1.28, 0, 0), x3 = c(0, 0, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, -1.28, -1.28, 0, 0, 1.28, 1.28))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + 
    x1:x2 + x1:x3 + x2:x3, data = datos)

Residuals:
    Min      1Q  Median      3Q     Max 
-319.50 -104.80   22.24  114.18  354.10 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  1722.02      75.43  22.829  < 2e-16 ***
x1             44.51      38.97   1.142   0.2657    
x2            244.52      38.97   6.275 2.58e-06 ***
x3             23.02      38.97   0.591   0.5607    
I(x1^2)      -120.54      56.21  -2.144   0.0433 *  
I(x2^2)      -316.01      56.21  -5.622 1.19e-05 ***
I(x3^2)      -156.25      56.21  -2.780   0.0109 *  
x1:x2         -93.25      46.27  -2.015   0.0562 .  
x1:x3         -48.63      46.27  -1.051   0.3047    
x2:x3          28.50      46.27   0.616   0.5442    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 185.1 on 22 degrees of freedom
Multiple R-squared:  0.8056,	Adjusted R-squared:  0.726 
F-statistic: 10.13 on 9 and 22 DF,  p-value: 5.454e-06


Call:
rsm(formula = y ~ SO(x1, x2, x3), data = datos)

            Estimate Std. Error t value  Pr(>|t|)    
(Intercept) 1722.023     75.430 22.8295 < 2.2e-16 ***
x1            44.506     38.970  1.1420   0.26572    
x2           244.523     38.970  6.2746 2.580e-06 ***
x3            23.024     38.970  0.5908   0.56067    
x1:x2        -93.250     46.268 -2.0154   0.05624 .  
x1:x3        -48.625     46.268 -1.0509   0.30470    
x2:x3         28.500     46.268  0.6160   0.54423    
x1^2        -120.543     56.213 -2.1444   0.04330 *  
x2^2        -316.008     56.213 -5.6216 1.187e-05 ***
x3^2        -156.248     56.213 -2.7796   0.01093 *  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.8056,	Adjusted R-squared:  0.726 
F-statistic: 10.13 on 9 and 22 DF,  p-value: 5.454e-06

Analysis of Variance Table

Response: y
                Df  Sum Sq Mean Sq F value    Pr(>F)
FO(x1, x2, x3)   3 1405145  468382 13.6746 2.991e-05
TWI(x1, x2, x3)  3  189955   63318  1.8486    0.1679
PQ(x1, x2, x3)   3 1527030  509010 14.8607 1.655e-05
Residuals       22  753545   34252                  
Lack of fit      5  192197   38439  1.1641    0.3665
Pure error      17  561348   33020                  

Stationary point of response surface:
        x1         x2         x3 
0.01212357 0.38994692 0.10735569 

Eigenanalysis:
eigen() decomposition
$values
[1]  -97.61943 -168.18437 -326.99438

$vectors
         [,1]       [,2]        [,3]
x1  0.8823290  0.4190121 -0.21429981
x2 -0.2156687 -0.0447388 -0.97544115
x3 -0.4183092  0.9068778  0.05089347`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(1881, 1745, 1506, 1157, 1308, 913, 1682, 1049, 908, 1094, 1633, 1428, 1059, 1407, 875, 967, 1692, 1848, 750, 666, 1404, 1322, 740, 756, 1656, 1512, 1482, 1485, 1659, 1458, 1517, 1176), x1 = c(0, 0, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 0, 0, -1, -1, -1.28, -1.28, 0, 0, 1.28, 1.28, 0, 0, 0, 0, 0, 0), x2 = c(0, 0, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 0, 0, -1, -1, 0, 0, -1.28, -1.28, 0, 0, 0, 0, 1.28, 1.28, 0, 0), x3 = c(0, 0, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, -1.28, -1.28, 0, 0, 1.28, 1.28))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2, x3), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p>Primero un $2^3$ + centro (sirve para el error puro y para detectar curvatura); luego se agregan 6 puntos axiales a $\pm1{,}28$ ⇒ <strong>central compuesto ortogonal</strong> (no rotable: el equipo no permite abrir más los niveles).</p><p>Codificación: $x_1=\dfrac{T-5}{2}$, $x_2=\dfrac{P-4{,}3}{1{,}3}$, $x_3=\dfrac{F-750}{50}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=1722+44{,}51\,x_1+244{,}5\,x_2+23{,}02\,x_3-120{,}5\,x_1^2-316\,x_2^2-156{,}2\,x_3^2-93{,}25\,x_1x_2-48{,}63\,x_1x_3+28{,}5\,x_2x_3$$</p><p>Términos: lineales $x_1,x_2,x_3$; cuadráticos $x_1^2,x_2^2,x_3^2$ (curvatura); interacciones $x_1x_2,x_1x_3,x_2x_3$. Significativos al 5 %: $x_2$, $x_1^2$, $x_2^2$, $x_3^2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); ninguna interacción es significativa: cada factor actúa por separado.</p><p>$F$ global $=10{,}13$ con $(9,22)$ gl, $p\lt 0{,}0001$ ⇒ se <strong>rechaza</strong> $H_0$: el modelo explica la respuesta. $R^2=0{,}8056$ (explica el 80,6 % de la variabilidad) y $R^2_{aj}=0{,}726$. Falta de ajuste (con las réplicas del centro como error puro): $F=1{,}164$, $p=0{,}3665$ ⇒ no hay evidencia de falta de ajuste.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=44{,}5055-241{,}085x_1-93{,}25x_2-48{,}625x_3=0\\\frac{\partial\hat y}{\partial x_2}=244{,}5233-93{,}25x_1-632{,}0152x_2+28{,}5x_3=0\\\frac{\partial\hat y}{\partial x_3}=23{,}0243-48{,}625x_1+28{,}5x_2-312{,}4962x_3=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(44{,}5055;\ 244{,}5233;\ 23{,}0243)$ y $B=\begin{pmatrix}-120{,}5425&-46{,}625&-24{,}3125\\-46{,}625&-316{,}0076&14{,}25\\-24{,}3125&14{,}25&-156{,}2481\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=0{,}012,\ x_2^*=0{,}39,\ x_3^*=0{,}107$ ⇒ en unidades reales tiempo $=5+2(0{,}012)=5{,}024$ ms; potencia $=4{,}3+1{,}3(0{,}39)=4{,}807$ W; fuerza $=750+50(0{,}107)=755{,}368$ g. Valor predicho: $\hat y(\mathbf x_s)=1771{,}204$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-241{,}085&-93{,}25&-48{,}625\\-93{,}25&-632{,}0152&28{,}5\\-48{,}625&28{,}5&-312{,}4962\end{pmatrix}$.</p><p></p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=-97{,}6194;\ -168{,}1844;\ -326{,}9944$, todos negativos ⇒ <strong>máximo</strong> (la superficie es una «loma»).</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca maximizar y el punto estacionario es un máximo que cae <strong>dentro</strong> de la región experimental (todas las $|x_i^*|\le1{,}28$): es el óptimo. tiempo ≈ 5,024 ms, potencia ≈ 4,807 W, fuerza ≈ 755,368 g, con $\hat y\approx1771{,}204$.</p><p>Siguiente paso: confirmar con corridas reales en ese punto.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(1881, 1745, 1506, 1157, 1308, 913, 1682, 1049, 908, 1094, 1633, 1428, 1059, 1407, 875, 967, 1692, 1848, 750, 666, 1404, 1322, 740, 756, 1656, 1512, 1482, 1485, 1659, 1458, 1517, 1176), x1 = c(0, 0, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 0, 0, -1, -1, -1.28, -1.28, 0, 0, 1.28, 1.28, 0, 0, 0, 0, 0, 0), x2 = c(0, 0, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 0, 0, -1, -1, 0, 0, -1.28, -1.28, 0, 0, 0, 0, 1.28, 1.28, 0, 0), x3 = c(0, 0, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, -1.28, -1.28, 0, 0, 1.28, 1.28)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); B <- matrix(0, 3, 3); co <- coef(m); vs <- c("x1", "x2", "x3"); for (i in 1:3) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 3) for (j in (i + 1):3) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: 0.012, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(1881, 1745, 1506, 1157, 1308, 913, 1682, 1049, 908, 1094, 1633, 1428, 1059, 1407, 875, 967, 1692, 1848, 750, 666, 1404, 1322, 740, 756, 1656, 1512, 1482, 1485, 1659, 1458, 1517, 1176), x1 = c(0, 0, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 0, 0, -1, -1, -1.28, -1.28, 0, 0, 1.28, 1.28, 0, 0, 0, 0, 0, 0), x2 = c(0, 0, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 0, 0, -1, -1, 0, 0, -1.28, -1.28, 0, 0, 0, 0, 1.28, 1.28, 0, 0), x3 = c(0, 0, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, -1.28, -1.28, 0, 0, 1.28, 1.28)); m <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = d); summary(m)$r.squared})", esperado: 0.8056, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 28 (pp. 426–428)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d022",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "curso",
    titulo: "ORIGINAL-LIBRO GUIA · Cap. 12, ej. 29 · Sabor del queso panela: sal y cuajo",
    enunciado: String.raw`<p><strong>ORIGINAL-LIBRO GUIA</strong> — Cap. 12, ej. 29 del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p><p>Se estudia el sabor del queso panela (promedio de cinco jueces, escala hedónica) en función de la sal y el cuajo. Se busca el <strong>mejor sabor</strong> (maximizar).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Sal</th><th>Cuajo</th><th>Sabor</th></tr></thead><tbody><tr><td>$6$</td><td>$0{,}3$</td><td>$5{,}67$</td></tr><tr><td>$5{,}5$</td><td>$0{,}387$</td><td>$7{,}44$</td></tr><tr><td>$4{,}5$</td><td>$0{,}387$</td><td>$7{,}33$</td></tr><tr><td>$4$</td><td>$0{,}3$</td><td>$6{,}33$</td></tr><tr><td>$4{,}5$</td><td>$0{,}213$</td><td>$7{,}11$</td></tr><tr><td>$5{,}5$</td><td>$0{,}213$</td><td>$7{,}22$</td></tr><tr><td>$5$</td><td>$0{,}3$</td><td>$6{,}33$</td></tr><tr><td>$5$</td><td>$0{,}3$</td><td>$6{,}66$</td></tr></tbody></table></div><ol type="a"><li>Ajuste un modelo de segundo orden. ¿Qué porcentaje de la variación explica?</li><li>Escriba el modelo de segundo orden; describa la superficie y los contornos.</li><li>Encuentre la combinación de sal y cuajo que da el mejor sabor.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para maximizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(5.67, 7.44, 7.33, 6.33, 7.11, 7.22, 6.33, 6.66), x1 = c(1, 0.5, -0.5, -1, -0.5, 0.5, 0, 0), x2 = c(0, 0.87, 0.87, 0, -0.87, -0.87, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)

Residuals:
      1       2       3       4       5       6       7       8 
-0.1467  0.1467 -0.1467  0.1467 -0.1467  0.1467 -0.1650  0.1650 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)   
(Intercept)  6.495e+00  2.142e-01  30.323  0.00109 **
x1          -1.833e-01  1.749e-01  -1.048  0.40451   
x2           1.264e-01  1.741e-01   0.726  0.54317   
I(x1^2)     -4.950e-01  3.029e-01  -1.634  0.24385   
I(x2^2)      1.194e+00  3.002e-01   3.978  0.05777 . 
x1:x2        5.743e-16  3.482e-01   0.000  1.00000   
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.3029 on 2 degrees of freedom
Multiple R-squared:  0.9318,	Adjusted R-squared:  0.7612 
F-statistic: 5.462 on 5 and 2 DF,  p-value: 0.162


Call:
rsm(formula = y ~ SO(x1, x2), data = datos)

               Estimate  Std. Error t value Pr(>|t|)   
(Intercept)  6.4950e+00  2.1419e-01 30.3229 0.001086 **
x1          -1.8333e-01  1.7489e-01 -1.0483 0.404509   
x2           1.2644e-01  1.7409e-01  0.7263 0.543168   
x1:x2        8.1930e-16  3.4818e-01  0.0000 1.000000   
x1^2        -4.9500e-01  3.0292e-01 -1.6341 0.243849   
x2^2         1.1940e+00  3.0015e-01  3.9780 0.057771 . 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.9318,	Adjusted R-squared:  0.7612 
F-statistic: 5.462 on 5 and 2 DF,  p-value: 0.162

Analysis of Variance Table

Response: y
            Df  Sum Sq Mean Sq F value  Pr(>F)
FO(x1, x2)   2 0.14923 0.07462  0.8132 0.55152
TWI(x1, x2)  1 0.00000 0.00000  0.0000 1.00000
PQ(x1, x2)   2 2.35654 1.17827 12.8410 0.07225
Residuals    2 0.18352 0.09176                
Lack of fit  1 0.12907 0.12907  2.3704 0.36672
Pure error   1 0.05445 0.05445                

Stationary point of response surface:
         x1          x2 
-0.18518519 -0.05294606 

Eigenanalysis:
eigen() decomposition
$values
[1]  1.194015 -0.495000

$vectors
           [,1]          [,2]
x1 2.425376e-16 -1.000000e+00
x2 1.000000e+00  2.425376e-16`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(5.67, 7.44, 7.33, 6.33, 7.11, 7.22, 6.33, 6.66), x1 = c(1, 0.5, -0.5, -1, -0.5, 0.5, 0, 0), x2 = c(0, 0.87, 0.87, 0, -0.87, -0.87, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p>Codificando $x_1=\text{sal}-5$ y $x_2=(\text{cuajo}-0{,}3)/0{,}1$, los 6 puntos externos quedan sobre un círculo de radio 1, como un <strong>hexágono</strong> (por ejemplo (0,5; 0,87)), más 2 centros: un diseño de superficie de respuesta con 8 corridas para 6 parámetros (solo 2 gl para el error).</p><p>Codificación: $x_1=\dfrac{S-5}{1}$, $x_2=\dfrac{Cu-0{,}3}{0{,}1}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=6{,}495-0{,}1833\,x_1+0{,}1264\,x_2-0{,}495\,x_1^2+1{,}194\,x_2^2+0\,x_1x_2$$</p><p>Términos: lineales $x_1,x_2$; cuadráticos $x_1^2,x_2^2$ (curvatura); interacciones $x_1x_2$. Significativos al 5 %: ninguno. Ningún cuadrático es significativo (sin evidencia clara de curvatura); ninguna interacción es significativa: cada factor actúa por separado.</p><p>$F$ global $=5{,}46$ con $(5,2)$ gl, $p=0{,}162$ ⇒ <strong>no se rechaza</strong> $H_0$: el modelo en su conjunto no es significativo (con pocos grados de libertad para el error). $R^2=0{,}9318$ (explica el 93,2 % de la variabilidad) y $R^2_{aj}=0{,}7612$, bastante menor: hay términos que no aportan. Falta de ajuste (con las réplicas del centro como error puro): $F=2{,}37$, $p=0{,}3667$ ⇒ no hay evidencia de falta de ajuste.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-0{,}1833-0{,}99x_1=0\\\frac{\partial\hat y}{\partial x_2}=0{,}1264+2{,}388x_2=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-0{,}1833;\ 0{,}1264)$ y $B=\begin{pmatrix}-0{,}495&0\\0&1{,}194\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=-0{,}185,\ x_2^*=-0{,}053$ ⇒ en unidades reales sal $=5+1(-0{,}185)=4{,}815$ ; cuajo $=0{,}3+0{,}1(-0{,}053)=0{,}295$ . Valor predicho: $\hat y(\mathbf x_s)=6{,}509$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-0{,}99&0\\0&2{,}388\end{pmatrix}$.</p><p>$\det H=(-0{,}99)(2{,}388)-(0)^2=-2{,}3641$ &lt; 0 ⇒ indefinida ⇒ <strong>punto silla</strong>.</p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=1{,}194;\ -0{,}495$, de signos mezclados ⇒ <strong>punto silla</strong>: sube en una dirección y baja en otra.</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca maximizar, pero el punto estacionario es un <strong>punto silla</strong>, no un máximo. Como dice la clase, entonces el óptimo está en la <strong>frontera</strong> de la región: se evalúa $\hat y$ en las esquinas y bordes (o en una grilla fina, que es la idea del análisis de cordillera del libro), sin salir de la zona estudiada.</p><p>Evaluando $\hat y$ en una grilla sobre el hexágono que forman los puntos del diseño: el mayor valor está en $x_1=-0{,}2,\ x_2=0{,}85$, es decir sal ≈ 4,8 , cuajo ≈ 0,385 , con $\hat y\approx7{,}482$. Si se quiere ir más allá, se hace un nuevo experimento en esa dirección y se confirma con corridas reales.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(5.67, 7.44, 7.33, 6.33, 7.11, 7.22, 6.33, 6.66), x1 = c(1, 0.5, -0.5, -1, -0.5, 0.5, 0, 0), x2 = c(0, 0.87, 0.87, 0, -0.87, -0.87, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); B <- matrix(0, 2, 2); co <- coef(m); vs <- c("x1", "x2"); for (i in 1:2) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 2) for (j in (i + 1):2) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: -0.185, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(5.67, 7.44, 7.33, 6.33, 7.11, 7.22, 6.33, 6.66), x1 = c(1, 0.5, -0.5, -1, -0.5, 0.5, 0, 0), x2 = c(0, 0.87, 0.87, 0, -0.87, -0.87, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); summary(m)$r.squared})", esperado: 0.9318, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 29 (p. 428)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d023",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 29 (p. 428)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 29 · Sabor del queso panela: sal y cuajo (otro centro)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 29 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: los centros dieron 7,10 y 7,30 (en vez de 6,33 y 6,66).</p><p>Se estudia el sabor del queso panela (promedio de cinco jueces, escala hedónica) en función de la sal y el cuajo. Se busca el <strong>mejor sabor</strong> (maximizar).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Sal</th><th>Cuajo</th><th>Sabor</th></tr></thead><tbody><tr><td>$6$</td><td>$0{,}3$</td><td>$5{,}67$</td></tr><tr><td>$5{,}5$</td><td>$0{,}387$</td><td>$7{,}44$</td></tr><tr><td>$4{,}5$</td><td>$0{,}387$</td><td>$7{,}33$</td></tr><tr><td>$4$</td><td>$0{,}3$</td><td>$6{,}33$</td></tr><tr><td>$4{,}5$</td><td>$0{,}213$</td><td>$7{,}11$</td></tr><tr><td>$5{,}5$</td><td>$0{,}213$</td><td>$7{,}22$</td></tr><tr><td>$5$</td><td>$0{,}3$</td><td>$7{,}1$</td></tr><tr><td>$5$</td><td>$0{,}3$</td><td>$7{,}3$</td></tr></tbody></table></div><ol type="a"><li>Ajuste un modelo de segundo orden. ¿Qué porcentaje de la variación explica?</li><li>Escriba el modelo de segundo orden; describa la superficie y los contornos.</li><li>Encuentre la combinación de sal y cuajo que da el mejor sabor.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para maximizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(5.67, 7.44, 7.33, 6.33, 7.11, 7.22, 7.1, 7.3), x1 = c(1, 0.5, -0.5, -1, -0.5, 0.5, 0, 0), x2 = c(0, 0.87, 0.87, 0, -0.87, -0.87, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)

Residuals:
      1       2       3       4       5       6       7       8 
-0.1467  0.1467 -0.1467  0.1467 -0.1467  0.1467 -0.1000  0.1000 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept)  7.200e+00  1.930e-01  37.297 0.000718 ***
x1          -1.833e-01  1.576e-01  -1.163 0.364788    
x2           1.264e-01  1.569e-01   0.806 0.504920    
I(x1^2)     -1.200e+00  2.730e-01  -4.395 0.048059 *  
I(x2^2)      4.954e-01  2.705e-01   1.831 0.208507    
x1:x2        6.381e-16  3.138e-01   0.000 1.000000    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.273 on 2 degrees of freedom
Multiple R-squared:  0.9437,	Adjusted R-squared:  0.8031 
F-statistic:  6.71 on 5 and 2 DF,  p-value: 0.1348


Call:
rsm(formula = y ~ SO(x1, x2), data = datos)

               Estimate  Std. Error t value  Pr(>|t|)    
(Intercept)  7.2000e+00  1.9305e-01 37.2969 0.0007181 ***
x1          -1.8333e-01  1.5762e-01 -1.1631 0.3647876    
x2           1.2644e-01  1.5690e-01  0.8058 0.5049195    
x1:x2        7.1796e-16  3.1380e-01  0.0000 1.0000000    
x1^2        -1.2000e+00  2.7301e-01 -4.3955 0.0480587 *  
x2^2         4.9544e-01  2.7052e-01  1.8314 0.2085066    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.9437,	Adjusted R-squared:  0.8031 
F-statistic:  6.71 on 5 and 2 DF,  p-value: 0.1348

Analysis of Variance Table

Response: y
            Df  Sum Sq Mean Sq F value  Pr(>F)
FO(x1, x2)   2 0.14923 0.07462  1.0011 0.49972
TWI(x1, x2)  1 0.00000 0.00000  0.0000 1.00000
PQ(x1, x2)   2 2.35125 1.17563 15.7731 0.05962
Residuals    2 0.14907 0.07453                
Lack of fit  1 0.12907 0.12907  6.4533 0.23874
Pure error   1 0.02000 0.02000                

Stationary point of response surface:
         x1          x2 
-0.07638889 -0.12760000 

Eigenanalysis:
eigen() decomposition
$values
[1]  0.4954419 -1.2000000

$vectors
           [,1]         [,2]
x1 -2.11733e-16 -1.00000e+00
x2 -1.00000e+00  2.11733e-16`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(5.67, 7.44, 7.33, 6.33, 7.11, 7.22, 7.1, 7.3), x1 = c(1, 0.5, -0.5, -1, -0.5, 0.5, 0, 0), x2 = c(0, 0.87, 0.87, 0, -0.87, -0.87, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p>Codificando $x_1=\text{sal}-5$ y $x_2=(\text{cuajo}-0{,}3)/0{,}1$, los 6 puntos externos quedan sobre un círculo de radio 1, como un <strong>hexágono</strong> (por ejemplo (0,5; 0,87)), más 2 centros: un diseño de superficie de respuesta con 8 corridas para 6 parámetros (solo 2 gl para el error).</p><p>Codificación: $x_1=\dfrac{S-5}{1}$, $x_2=\dfrac{Cu-0{,}3}{0{,}1}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=7{,}2-0{,}1833\,x_1+0{,}1264\,x_2-1{,}2\,x_1^2+0{,}4954\,x_2^2+0\,x_1x_2$$</p><p>Términos: lineales $x_1,x_2$; cuadráticos $x_1^2,x_2^2$ (curvatura); interacciones $x_1x_2$. Significativos al 5 %: $x_1^2$. Hay <strong>curvatura</strong> (algún cuadrático significativo); ninguna interacción es significativa: cada factor actúa por separado.</p><p>$F$ global $=6{,}71$ con $(5,2)$ gl, $p=0{,}1348$ ⇒ <strong>no se rechaza</strong> $H_0$: el modelo en su conjunto no es significativo (con pocos grados de libertad para el error). $R^2=0{,}9437$ (explica el 94,4 % de la variabilidad) y $R^2_{aj}=0{,}8031$, bastante menor: hay términos que no aportan. Falta de ajuste (con las réplicas del centro como error puro): $F=6{,}453$, $p=0{,}2387$ ⇒ no hay evidencia de falta de ajuste.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-0{,}1833-2{,}4x_1=0\\\frac{\partial\hat y}{\partial x_2}=0{,}1264+0{,}9909x_2=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-0{,}1833;\ 0{,}1264)$ y $B=\begin{pmatrix}-1{,}2&0\\0&0{,}4954\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=-0{,}076,\ x_2^*=-0{,}128$ ⇒ en unidades reales sal $=5+1(-0{,}076)=4{,}924$ ; cuajo $=0{,}3+0{,}1(-0{,}128)=0{,}287$ . Valor predicho: $\hat y(\mathbf x_s)=7{,}199$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}-2{,}4&0\\0&0{,}9909\end{pmatrix}$.</p><p>$\det H=(-2{,}4)(0{,}9909)-(0)^2=-2{,}3781$ &lt; 0 ⇒ indefinida ⇒ <strong>punto silla</strong>.</p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=0{,}4954;\ -1{,}2$, de signos mezclados ⇒ <strong>punto silla</strong>: sube en una dirección y baja en otra.</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca maximizar, pero el punto estacionario es un <strong>punto silla</strong>, no un máximo. Como dice la clase, entonces el óptimo está en la <strong>frontera</strong> de la región: se evalúa $\hat y$ en las esquinas y bordes (o en una grilla fina, que es la idea del análisis de cordillera del libro), sin salir de la zona estudiada.</p><p>Evaluando $\hat y$ en una grilla sobre el hexágono que forman los puntos del diseño: el mayor valor está en $x_1=-0{,}1,\ x_2=0{,}85$, es decir sal ≈ 4,9 , cuajo ≈ 0,385 , con $\hat y\approx7{,}672$. Si se quiere ir más allá, se hace un nuevo experimento en esa dirección y se confirma con corridas reales.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(5.67, 7.44, 7.33, 6.33, 7.11, 7.22, 7.1, 7.3), x1 = c(1, 0.5, -0.5, -1, -0.5, 0.5, 0, 0), x2 = c(0, 0.87, 0.87, 0, -0.87, -0.87, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); B <- matrix(0, 2, 2); co <- coef(m); vs <- c("x1", "x2"); for (i in 1:2) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 2) for (j in (i + 1):2) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: -0.076, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(5.67, 7.44, 7.33, 6.33, 7.11, 7.22, 7.1, 7.3), x1 = c(1, 0.5, -0.5, -1, -0.5, 0.5, 0, 0), x2 = c(0, 0.87, 0.87, 0, -0.87, -0.87, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); summary(m)$r.squared})", esperado: 0.9437, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 29 (p. 428)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  },
  {
    id: "m23-d024",
    modulo: "m23-superficie-respuesta",
    concepto: "m23-c05",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "LG", loc: "cap. 12, ej. 29 (p. 428)" }
    ],
    titulo: "MODIFICADA-LIBRO GUIA · Cap. 12, ej. 29 · Sabor del queso panela: sal y cuajo (extremos de sal)",
    enunciado: String.raw`<p><strong>MODIFICADA-LIBRO GUIA</strong> — variante del Cap. 12, ej. 29 del libro guía (Gutiérrez y de la Vara, 2.ª ed.). Cambio respecto del original: el queso con sal 6 obtuvo 6,40 y el de sal 4 obtuvo 6,90.</p><p>Se estudia el sabor del queso panela (promedio de cinco jueces, escala hedónica) en función de la sal y el cuajo. Se busca el <strong>mejor sabor</strong> (maximizar).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Sal</th><th>Cuajo</th><th>Sabor</th></tr></thead><tbody><tr><td>$6$</td><td>$0{,}3$</td><td>$6{,}4$</td></tr><tr><td>$5{,}5$</td><td>$0{,}387$</td><td>$7{,}44$</td></tr><tr><td>$4{,}5$</td><td>$0{,}387$</td><td>$7{,}33$</td></tr><tr><td>$4$</td><td>$0{,}3$</td><td>$6{,}9$</td></tr><tr><td>$4{,}5$</td><td>$0{,}213$</td><td>$7{,}11$</td></tr><tr><td>$5{,}5$</td><td>$0{,}213$</td><td>$7{,}22$</td></tr><tr><td>$5$</td><td>$0{,}3$</td><td>$6{,}33$</td></tr><tr><td>$5$</td><td>$0{,}3$</td><td>$6{,}66$</td></tr></tbody></table></div><ol type="a"><li>Ajuste un modelo de segundo orden. ¿Qué porcentaje de la variación explica?</li><li>Escriba el modelo de segundo orden; describa la superficie y los contornos.</li><li>Encuentre la combinación de sal y cuajo que da el mejor sabor.</li><li>Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.</li><li>Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.</li><li>Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.</li><li>Indique la condición de operación recomendada para maximizar la respuesta, en unidades reales.</li></ol><p>Use $\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida.</p>`,
    codigoR: `library(rsm)
datos <- data.frame(y = c(6.4, 7.44, 7.33, 6.9, 7.11, 7.22, 6.33, 6.66), x1 = c(1, 0.5, -0.5, -1, -0.5, 0.5, 0, 0), x2 = c(0, 0.87, 0.87, 0, -0.87, -0.87, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    salidaR: `
Call:
lm(formula = y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)

Residuals:
     1      2      3      4      5      6      7      8 
-0.120  0.120 -0.120  0.120 -0.120  0.120 -0.165  0.165 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept)  6.495e+00  1.876e-01  34.612 0.000834 ***
x1          -1.300e-01  1.532e-01  -0.848 0.485527    
x2           1.264e-01  1.525e-01   0.829 0.494286    
I(x1^2)      1.550e-01  2.654e-01   0.584 0.618272    
I(x2^2)      9.793e-01  2.630e-01   3.724 0.065133 .  
x1:x2        3.190e-16  3.050e-01   0.000 1.000000    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.2654 on 2 degrees of freedom
Multiple R-squared:  0.8874,	Adjusted R-squared:  0.6059 
F-statistic: 3.153 on 5 and 2 DF,  p-value: 0.2582


Call:
rsm(formula = y ~ SO(x1, x2), data = datos)

               Estimate  Std. Error t value  Pr(>|t|)    
(Intercept)  6.4950e+00  1.8765e-01 34.6123 0.0008337 ***
x1          -1.3000e-01  1.5322e-01 -0.8485 0.4855266    
x2           1.2644e-01  1.5252e-01  0.8290 0.4942863    
x1:x2        5.7491e-16  3.0503e-01  0.0000 1.0000000    
x1^2         1.5500e-01  2.6538e-01  0.5841 0.6182718    
x2^2         9.7932e-01  2.6296e-01  3.7243 0.0651327 .  
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Multiple R-squared:  0.8874,	Adjusted R-squared:  0.6059 
F-statistic: 3.153 on 5 and 2 DF,  p-value: 0.2582

Analysis of Variance Table

Response: y
            Df  Sum Sq Mean Sq F value Pr(>F)
FO(x1, x2)   2 0.09910 0.04955  0.7036 0.5870
TWI(x1, x2)  1 0.00000 0.00000  0.0000 1.0000
PQ(x1, x2)   2 1.01104 0.50552  7.1781 0.1223
Residuals    2 0.14085 0.07043               
Lack of fit  1 0.08640 0.08640  1.5868 0.4272
Pure error   1 0.05445 0.05445               

Stationary point of response surface:
         x1          x2 
 0.41935484 -0.06455312 

Eigenanalysis:
eigen() decomposition
$values
[1] 0.9793236 0.1550000

$vectors
          [,1]         [,2]
x1 3.48718e-16 -1.00000e+00
x2 1.00000e+00  3.48718e-16`,
    salidaDe: `library(rsm)
datos <- data.frame(y = c(6.4, 7.44, 7.33, 6.9, 7.11, 7.22, 6.33, 6.66), x1 = c(1, 0.5, -0.5, -1, -0.5, 0.5, 0, 0), x2 = c(0, 0.87, 0.87, 0, -0.87, -0.87, 0, 0))
modelo <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = datos)
summary(modelo)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios`,
    paquetes: ["rsm"],
    partes: [
      { titulo: "a) Diseño y codificación", puntos: 1, solucion: String.raw`<p>Codificando $x_1=\text{sal}-5$ y $x_2=(\text{cuajo}-0{,}3)/0{,}1$, los 6 puntos externos quedan sobre un círculo de radio 1, como un <strong>hexágono</strong> (por ejemplo (0,5; 0,87)), más 2 centros: un diseño de superficie de respuesta con 8 corridas para 6 parámetros (solo 2 gl para el error).</p><p>Codificación: $x_1=\dfrac{S-5}{1}$, $x_2=\dfrac{Cu-0{,}3}{0{,}1}$. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.</p>` },
      { titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: String.raw`<p>$$\hat{y}=6{,}495-0{,}13\,x_1+0{,}1264\,x_2+0{,}155\,x_1^2+0{,}9793\,x_2^2+0\,x_1x_2$$</p><p>Términos: lineales $x_1,x_2$; cuadráticos $x_1^2,x_2^2$ (curvatura); interacciones $x_1x_2$. Significativos al 5 %: ninguno. Ningún cuadrático es significativo (sin evidencia clara de curvatura); ninguna interacción es significativa: cada factor actúa por separado.</p><p>$F$ global $=3{,}15$ con $(5,2)$ gl, $p=0{,}2582$ ⇒ <strong>no se rechaza</strong> $H_0$: el modelo en su conjunto no es significativo (con pocos grados de libertad para el error). $R^2=0{,}8874$ (explica el 88,7 % de la variabilidad) y $R^2_{aj}=0{,}6059$, bastante menor: hay términos que no aportan. Falta de ajuste (con las réplicas del centro como error puro): $F=1{,}587$, $p=0{,}4272$ ⇒ no hay evidencia de falta de ajuste.</p>` },
      { titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: String.raw`<p>Se deriva respecto de cada variable y se iguala a cero:</p><p>$$\begin{cases}\frac{\partial\hat y}{\partial x_1}=-0{,}13+0{,}31x_1=0\\\frac{\partial\hat y}{\partial x_2}=0{,}1264+1{,}9586x_2=0\end{cases}$$</p><p>En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(-0{,}13;\ 0{,}1264)$ y $B=\begin{pmatrix}0{,}155&0\\0&0{,}9793\end{pmatrix}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).</p><p>Resolviendo: $x_1^*=0{,}419,\ x_2^*=-0{,}065$ ⇒ en unidades reales sal $=5+1(0{,}419)=5{,}419$ ; cuajo $=0{,}3+0{,}1(-0{,}065)=0{,}294$ . Valor predicho: $\hat y(\mathbf x_s)=6{,}464$.</p>` },
      { titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: String.raw`<p>Hessiana (matriz de segundas derivadas): $H=2B=\begin{pmatrix}0{,}31&0\\0&1{,}9586\end{pmatrix}$.</p><p>$\det H=(0{,}31)(1{,}9586)-(0)^2=0{,}6072$ &gt; 0 y $h_{11}=0{,}31$ &gt; 0 ⇒ definida positiva ⇒ <strong>mínimo</strong>.</p><p>Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=0{,}9793;\ 0{,}155$, todos positivos ⇒ <strong>mínimo</strong> (la superficie es un «valle»).</p>` },
      { titulo: "e) Condición óptima", puntos: 1, solucion: String.raw`<p>Se busca maximizar, pero el punto estacionario es un <strong>mínimo</strong>, no un máximo. Como dice la clase, entonces el óptimo está en la <strong>frontera</strong> de la región: se evalúa $\hat y$ en las esquinas y bordes (o en una grilla fina, que es la idea del análisis de cordillera del libro), sin salir de la zona estudiada.</p><p>Evaluando $\hat y$ en una grilla sobre el hexágono que forman los puntos del diseño: el mayor valor está en $x_1=-0{,}5,\ x_2=0{,}85$, es decir sal ≈ 4,5 , cuajo ≈ 0,385 , con $\hat y\approx7{,}414$. Si se quiere ir más allá, se hace un nuevo experimento en esa dirección y se confirma con corridas reales.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "xs1", r: `cat({d <- data.frame(y = c(6.4, 7.44, 7.33, 6.9, 7.11, 7.22, 6.33, 6.66), x1 = c(1, 0.5, -0.5, -1, -0.5, 0.5, 0, 0), x2 = c(0, 0.87, 0.87, 0, -0.87, -0.87, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); B <- matrix(0, 2, 2); co <- coef(m); vs <- c("x1", "x2"); for (i in 1:2) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < 2) for (j in (i + 1):2) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]})`, esperado: 0.419, tol: 0.000500001 },
      { que: "R2", r: "cat({d <- data.frame(y = c(6.4, 7.44, 7.33, 6.9, 7.11, 7.22, 6.33, 6.66), x1 = c(1, 0.5, -0.5, -1, -0.5, 0.5, 0, 0), x2 = c(0, 0.87, 0.87, 0, -0.87, -0.87, 0, 0)); m <- lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2, data = d); summary(m)$r.squared})", esperado: 0.8874, tol: 0.000050001 }
    ],
    fuente: [
      { id: "LG", loc: "cap. 12, ej. 29 (p. 428)" },
      { id: "C8.2", loc: "slides 7–39" },
      { id: "INST-P4" }
    ]
  }
]);
