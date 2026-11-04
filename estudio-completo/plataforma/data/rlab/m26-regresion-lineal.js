/* Laboratorio R · Regresión lineal (M26, P3) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m26-simple", modulo: "m26-regresion-lineal", tema: "Regresión lineal",
    titulo: "Regresión simple: b₀ y b₁ a mano y con lm (ejemplo 11.1)",
    descripcion: "Datos de la tabla 11.1 de C8.1 s11 (n = 33). Se comprueban las sumas de la slide y se obtiene la recta con las fórmulas y con lm().",
    funciones: ["sum", "length", "lm", "coef", "cor"],
    codigo: `x <- c(3, 7, 11, 15, 18, 27, 29, 30, 30, 31, 31, 32, 33, 33, 34, 36, 36,
       36, 37, 38, 39, 39, 39, 40, 41, 42, 42, 43, 44, 45, 46, 47, 50)
y <- c(5, 11, 21, 16, 16, 28, 27, 25, 35, 30, 40, 32, 34, 32, 34, 37, 38,
       34, 36, 38, 37, 36, 45, 39, 41, 40, 44, 37, 44, 46, 46, 49, 51)
n <- length(x)
c(n, sum(x), sum(y), sum(x * y), sum(x^2))
b1 <- (n * sum(x * y) - sum(x) * sum(y)) / (n * sum(x^2) - sum(x)^2)
b0 <- (sum(y) - b1 * sum(x)) / n
c(b0, b1)
coef(lm(y ~ x))
summary(lm(y ~ x))$r.squared
cor(x, y)^2                  # con una sola x, R2 = r2`,
    salida: `[1]    33  1104  1124 41355 41086
[1] 3.8296332 0.9036432
(Intercept)           x
  3.8296332   0.9036432
[1] 0.9129408
[1] 0.9129408`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul><li>Las sumas coinciden con la slide: 1104, 1124, 41355 y 41086.</li><li>$b_0=3{,}8296$ y $b_1=0{,}9036$, igual con la fórmula y con <code>lm</code>.</li><li>$R^2=r^2$ cuando hay una sola variable independiente.</li></ul>`,
    fuente: [{ id: "C8.1", loc: "slides 10–13" }]
  },
  {
    id: "r-m26-oxido", modulo: "m26-regresion-lineal", tema: "Regresión lineal",
    titulo: "Regresión múltiple completa (óxido nitroso): lm, Shapiro, influyentes, VIF y step",
    descripcion: "Datos de C8.1 s19. Reproduce las salidas de s20, s31, s32, s34 y s39 (los gráficos de plot(modelo1) se omiten aquí porque no tienen salida de texto). La variable se llama Presion, sin tilde.",
    funciones: ["data.frame", "lm", "summary", "shapiro.test", "residuals", "hatvalues", "cooks.distance", "cor", "car::vif", "step"],
    paquetes: ["car"],
    codigo: `ejemplo1 <- data.frame(
  Oxido_Nitroso = c(0.90, 0.91, 0.96, 0.89, 1.00, 1.10, 1.15, 1.03, 0.77, 1.07,
                    1.07, 0.94, 1.10, 1.10, 1.10, 0.91, 0.87, 0.78, 0.82, 0.95),
  Humedad     = c(72.4, 41.6, 34.3, 35.1, 10.7, 12.9, 8.3, 20.1, 72.2, 24.0,
                  23.2, 47.4, 31.5, 10.6, 11.2, 73.3, 75.4, 96.6, 107.4, 54.9),
  Temperatura = c(76.3, 70.3, 77.1, 68.0, 79.0, 67.4, 66.8, 76.9, 77.7, 67.7,
                  76.8, 86.6, 76.9, 86.3, 86.0, 76.3, 77.9, 78.7, 86.8, 70.9),
  Presion     = c(29.18, 29.35, 29.24, 29.27, 29.78, 29.39, 29.69, 29.48, 29.09, 29.60,
                  29.38, 29.35, 29.63, 29.56, 29.48, 29.40, 29.28, 29.29, 29.03, 29.37))

modelo1 <- lm(Oxido_Nitroso ~ Humedad + Temperatura + Presion, data = ejemplo1)
summary(modelo1)

# par(mfrow = c(2, 2)); plot(modelo1)      # los 4 gráficos de diagnóstico
shapiro.test(residuals(modelo1))
round(max(hatvalues(modelo1)), 3); 2 * 4 / 20   # corte 2(k+1)/n
round(max(cooks.distance(modelo1)), 2)
round(cor(ejemplo1[, 2:4]), 3)
library(car)
vif(modelo1)
final <- step(modelo1, direction = "both")
summary(final)$adj.r.squared`,
    salida: `Call:
lm(formula = Oxido_Nitroso ~ Humedad + Temperatura + Presion,
    data = ejemplo1)

Residuals:
     Min       1Q   Median       3Q      Max
-0.11799 -0.02526  0.01345  0.04103  0.06523

Coefficients:
              Estimate Std. Error t value Pr(>|t|)
(Intercept) -3.5077781  3.0048641  -1.167  0.26017
Humedad     -0.0026250  0.0006549  -4.008  0.00101 **
Temperatura  0.0007989  0.0020451   0.391  0.70121
Presion      0.1541550  0.1013675   1.521  0.14784
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.05617 on 16 degrees of freedom
Multiple R-squared:  0.8005,	Adjusted R-squared:  0.763
F-statistic:  21.4 on 3 and 16 DF,  p-value: 7.609e-06


	Shapiro-Wilk normality test

data:  residuals(modelo1)
W = 0.93532, p-value = 0.1953

[1] 0.354
[1] 0.4
[1] 0.71
            Humedad Temperatura Presion
Humedad       1.000       0.254  -0.755
Temperatura   0.254       1.000  -0.194
Presion      -0.755      -0.194   1.000
    Humedad Temperatura     Presion
   2.396391    1.068691    2.329738
Start:  AIC=-111.64
Oxido_Nitroso ~ Humedad + Temperatura + Presion

              Df Sum of Sq      RSS      AIC
- Temperatura  1  0.000481 0.050960 -113.449
<none>                     0.050479 -111.639
- Presion      1  0.007296 0.057775 -110.939
- Humedad      1  0.050693 0.101172  -99.733

Step:  AIC=-113.45
Oxido_Nitroso ~ Humedad + Presion

              Df Sum of Sq      RSS     AIC
<none>                     0.050960 -113.45
- Presion      1  0.007284 0.058244 -112.78
+ Temperatura  1  0.000481 0.050479 -111.64
- Humedad      1  0.050462 0.101422 -101.68
[1] 0.7748606`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul>
<li><code>summary</code>: solo Humedad es significativa ($p=0{,}001$). $F=21{,}4$ (3 y 16 gl), $p=7{,}6\cdot10^{-6}$; $R^2=0{,}8005$; $R^2_{aj}=0{,}763$.</li>
<li>Shapiro $p=0{,}1953$ ⇒ no se rechaza la normalidad de los residuos.</li>
<li>Máximo $h_{ii}=0{,}354<0{,}40$; máxima Cook $0{,}71<1$: ningún punto domina.</li>
<li>VIF todos $<5$: no hay multicolinealidad seria, aunque $r(\text{Hum},\text{Pres})=-0{,}755$.</li>
<li><code>step</code>: sale Temperatura (AIC $-111{,}64\to-113{,}45$) y se detiene; $R^2_{aj}$ del modelo final $=0{,}7749$.</li></ul>`,
    fuente: [{ id: "C8.1", loc: "slides 19–23, 31–34 y 39" }]
  },
  {
    id: "r-m26-polinomial", modulo: "m26-regresion-lineal", tema: "Regresión lineal",
    titulo: "Regresión polinomial con I(x^2) y pendiente variable",
    descripcion: "Código de C8.1 s25–26. Se agrega el R² de la recta para ver que sube de 0,973 a 0,999.",
    funciones: ["set.seed", "rnorm", "lm", "I", "summary", "coef"],
    codigo: `set.seed(32)
x <- 1:9
Ey <- 10 + 2*x + 0.5*x^2      # modelo verdadero
e <- rnorm(9, mean = 0, sd = 1)
y <- Ey + e
poli <- lm(y ~ x + I(x^2))
summary(poli)
summary(lm(y ~ x))$r.squared  # R2 de la recta
b <- coef(poli)
b["x"] + 2*b["I(x^2)"]*x      # pendiente en cada x`,
    salida: `Call:
lm(formula = y ~ x + I(x^2))

Residuals:
    Min      1Q  Median      3Q     Max
-1.1892 -0.1606  0.2012  0.5105  0.7094

Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept) 10.19544    0.95827   10.64 4.06e-05 ***
x            1.97546    0.44000    4.49  0.00415 **
I(x^2)       0.50438    0.04291   11.75 2.29e-05 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.7531 on 6 degrees of freedom
Multiple R-squared:  0.9989,	Adjusted R-squared:  0.9985
F-statistic:  2675 on 2 and 6 DF,  p-value: 1.406e-09

[1] 0.9730879
[1]  2.984215  3.992970  5.001724  6.010479  7.019233  8.027987  9.036742
[8] 10.045496 11.054251`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul><li><code>I(x^2)</code> $=0{,}50438$ con $p=2{,}29\cdot10^{-5}$: hay curvatura.</li><li>Recta $R^2=0{,}973$ vs parábola $0{,}9989$.</li><li>La pendiente crece de 2,98 a 11,05: como $b_2>0$ la curva es convexa.</li></ul>`,
    fuente: [{ id: "C8.1", loc: "slides 25–26" }]
  },
  {
    id: "r-m26-indicadoras", modulo: "m26-regresion-lineal", tema: "Regresión lineal",
    titulo: "Variables indicadoras con factor() (mtcars)",
    descripcion: "Código de C8.1 s36 (mtcars viene con R).",
    funciones: ["lm", "factor", "summary"],
    codigo: `modelo2 <- lm(mpg ~ wt + factor(cyl), data = mtcars)
summary(modelo2)`,
    salida: `Call:
lm(formula = mpg ~ wt + factor(cyl), data = mtcars)

Residuals:
    Min      1Q  Median      3Q     Max
-4.5890 -1.2357 -0.5159  1.3845  5.7915

Coefficients:
             Estimate Std. Error t value Pr(>|t|)
(Intercept)   33.9908     1.8878  18.006  < 2e-16 ***
wt            -3.2056     0.7539  -4.252 0.000213 ***
factor(cyl)6  -4.2556     1.3861  -3.070 0.004718 **
factor(cyl)8  -6.0709     1.6523  -3.674 0.000999 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 2.557 on 28 degrees of freedom
Multiple R-squared:  0.8374,	Adjusted R-squared:   0.82
F-statistic: 48.08 on 3 and 28 DF,  p-value: 3.594e-11`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul><li>4 cilindros es la referencia (no aparece).</li><li><code>factor(cyl)6 -4.2556</code>: a igual peso, 4,26 mpg menos que 4 cilindros; <code>factor(cyl)8 -6.0709</code>: 6,07 menos.</li><li>Misma pendiente <code>wt -3.2056</code> para las tres rectas.</li></ul>`,
    fuente: [{ id: "C8.1", loc: "slides 35–36" }]
  }
]);
