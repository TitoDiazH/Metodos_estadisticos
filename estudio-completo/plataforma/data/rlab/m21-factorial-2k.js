/* Laboratorio R · Factorial 2^k (M21, P3) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m21-resistencia", modulo: "m21-factorial-2k", tema: "Factorial 2^k",
    titulo: "2³ con 2 réplicas (resistencia): aov(Y ~ A * B * C) y model.tables",
    descripcion: "Código de S7.4 (líneas 12–33). Se agregan las medias por nivel (type = \"means\") para ver que el efecto ȳ₊ − ȳ₋ es el doble de lo que muestra type = \"effects\".",
    funciones: ["data.frame", "factor", "aov", "summary", "model.tables"],
    codigo: `datos <- data.frame(
  A = factor(c(-1,-1,-1,-1,-1,-1,-1,-1, 1, 1, 1, 1, 1, 1, 1, 1)),
  B = factor(c(-1,-1,-1,-1, 1, 1, 1, 1,-1,-1,-1,-1, 1, 1, 1, 1)),
  C = factor(c(-1,-1, 1, 1,-1,-1, 1, 1,-1,-1, 1, 1,-1,-1, 1, 1)),
  replica = rep(c(1, 2), 8),
  Y = c(60, 65,   # (1)
        52, 54,   # c
        54, 56,   # b
        45, 47,   # bc
        72, 75,   # a
        83, 84,   # ac
        68, 70,   # ab
        80, 82))  # abc
modelo <- aov(Y ~ A * B * C, data = datos)
summary(modelo)
model.tables(modelo, type = "effects")
model.tables(modelo, type = "means")$tables$A
model.tables(modelo, type = "means")$tables$B`,
    salida: `            Df Sum Sq Mean Sq F value   Pr(>F)
A            1 2047.6  2047.6 595.655 8.48e-09 ***
B            1  115.6   115.6  33.618 0.000406 ***
C            1    3.1     3.1   0.891 0.372860
A:B          1   14.1    14.1   4.091 0.077745 .
A:C          1  410.1   410.1 119.291 4.38e-06 ***
B:C          1    1.6     1.6   0.455 0.519187
A:B:C        1    0.6     0.6   0.164 0.696430
Residuals    8   27.5     3.4
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
Tables of effects

 A
A
     -1       1
-11.313  11.313

 B
B
     -1       1
 2.6875 -2.6875

 C
C
     -1       1
-0.4375  0.4375

 A:B
    B
A    -1      1
  -1  0.9375 -0.9375
  1  -0.9375  0.9375

 A:C
    C
A    -1     1
  -1  5.062 -5.062
  1  -5.062  5.062

 B:C
    C
B    -1      1
  -1  0.3125 -0.3125
  1  -0.3125  0.3125

 A:B:C
, , C = -1

    B
A    -1      1
  -1 -0.1875  0.1875
  1   0.1875 -0.1875

, , C = 1

    B
A    -1      1
  -1  0.1875 -0.1875
  1  -0.1875  0.1875

A
    -1      1
54.125 76.750
B
    -1      1
68.125 62.750`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul>
<li>Significativos al 5 %: A ($p=8{,}48\cdot10^{-9}$), B ($p=0{,}000406$) y A:C ($p=4{,}38\cdot10^{-6}$). A:B ($p=0{,}078$) es marginal (<code>.</code>).</li>
<li>Cada efecto tiene <code>Df 1</code>; el error, $2^3(2-1)=8$ gl y $CM=3{,}4$.</li>
<li><code>Tables of effects</code>: desviación de cada nivel respecto de la media general (65,4375). A: $\pm11{,}313$ ⇒ efecto $\bar Y_+-\bar Y_-=76{,}75-54{,}125=22{,}625$.</li>
<li>B: con B alto la media es 62,75 y con B bajo 68,125: la presión <strong>baja</strong> la resistencia.</li>
<li>A:C $\pm5{,}062$ es la interacción más importante.</li></ul>`,
    fuente: [{ id: "S7.4", loc: "líneas 12–33" }, { id: "C7.4", loc: "slides 9–12" }]
  },
  {
    id: "r-m21-graficos", modulo: "m21-factorial-2k", tema: "Factorial 2^k",
    titulo: "Gráficas de interacción y de efectos principales (interaction.plot, plot.design)",
    descripcion: "S7.4 líneas 39–45 y 64–65. Solo gráficos: no hay salida de texto. Requiere el data.frame «datos» de la receta anterior.",
    funciones: ["par", "interaction.plot", "plot.design"],
    codigo: `par(mfrow = c(1, 3))                          # 3 gráficos en una fila
interaction.plot(datos$A, datos$B, datos$Y)   # A x B
interaction.plot(datos$A, datos$C, datos$Y)   # A x C
interaction.plot(datos$B, datos$C, datos$Y)   # B x C
par(mfrow = c(1, 1))

plot.design(datos[, c("A", "B", "C", "Y")])   # efectos principales`,
    lectura: String.raw`<ul>
<li>A×B y B×C: líneas casi paralelas ⇒ sin interacción. A×C: pendientes distintas ⇒ con temperatura alta el aditivo marca la diferencia.</li>
<li><code>plot.design</code>: una barra vertical por factor con la media de cada nivel; la línea horizontal es la media general. A tiene el mayor recorrido; B: el nivel −1 queda arriba; C casi no se mueve (C7.4 s13).</li>
<li>En <code>plot.design</code> se pasan solo los factores y la respuesta (sin la columna de réplica ni de bloque).</li></ul>`,
    fuente: [{ id: "S7.4", loc: "líneas 39–45 y 64–65" }, { id: "C7.4", loc: "slides 13–15" }]
  },
  {
    id: "r-m21-bloques", modulo: "m21-factorial-2k", tema: "Factorial 2^k",
    titulo: "2² con bloques (días): aov(respuesta ~ A * B + bloque)",
    descripcion: "S7.4 líneas 49–60. Los gráficos de esa sección (interaction.plot y plot.design(datos[, 2:4])) se dibujan igual que en la receta anterior.",
    funciones: ["factor", "rep", "data.frame", "aov", "summary"],
    codigo: `bloque <- factor(rep(1:2, each = 4))
A <- factor(rep(c(-1, 1, -1, 1), times = 2))
B <- factor(rep(c(-1, -1, 1, 1), times = 2))
respuesta <- c(20, 30, 25, 35,
               22, 33, 27, 37)
datos <- data.frame(bloque, A, B, respuesta)
print(datos)
modelo <- aov(respuesta ~ A * B + bloque, data = datos)
summary(modelo)`,
    salida: `  bloque  A  B respuesta
1      1 -1 -1        20
2      1  1 -1        30
3      1 -1  1        25
4      1  1  1        35
5      2 -1 -1        22
6      2  1 -1        33
7      2 -1  1        27
8      2  1  1        37
            Df Sum Sq Mean Sq F value   Pr(>F)
A            1 210.12  210.12    1681 3.19e-05 ***
B            1  45.13   45.13     361 0.000318 ***
bloque       1  10.12   10.12      81 0.002896 **
A:B          1   0.12    0.12       1 0.391002
Residuals    3   0.38    0.13
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul>
<li>A ($F=1681$) y B ($F=361$) significativos; A domina.</li>
<li><code>bloque</code> $p=0{,}0029$: los días difieren ⇒ el bloqueo fue útil.</li>
<li><code>A:B</code> $p=0{,}391$: sin interacción, efectos aditivos.</li>
<li>Error con 3 gl: $8-1-1-1-1-1$.</li></ul>`,
    fuente: [{ id: "S7.4", loc: "líneas 49–60" }, { id: "C7.4", loc: "slides 19–22" }]
  },
  {
    id: "r-m21-viscosidad", modulo: "m21-factorial-2k", tema: "Factorial 2^k",
    titulo: "Ejercicio 2² de la Prueba 3 (viscosidad): efectos y SC con contrastes",
    descripcion: "Totales de C7.4 s25. Se calculan los contrastes, efectos (contraste / 2n), SC (contraste² / 4n) y el F crítico. No hay datos individuales en la slide, así que el ANOVA se completa con SC_T = 403,5 dada en s26.",
    funciones: ["c", "qf", "pf"],
    codigo: `n <- 2
t1 <- 292; a <- 304; b <- 269; ab <- 301      # totales (notación de Yates)
cA  <- a + ab - t1 - b
cB  <- b + ab - t1 - a
cAB <- t1 + ab - a - b
c(cA, cB, cAB) / (2 * n)                      # efectos
sc <- c(cA, cB, cAB)^2 / (4 * n); sc          # SC_A, SC_B, SC_AB
sce <- 403.5 - sum(sc); sce                   # SC_E (gl = 4)
round(sc / (sce / 4), 2)                      # F0 de A, B y AB
round(1 - pf(sc / (sce / 4), 1, 4), 4)        # valores-p
qf(0.95, 1, 4)`,
    salida: `[1] 11.0 -6.5  5.0
[1] 242.0  84.5  50.0
[1] 27
[1] 35.85 12.52  7.41
[1] 0.0039 0.0241 0.0529
[1] 7.708647`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul><li>Efectos: 11, −6,5 y 5. SC: 242, 84,5 y 50. $SC_E=27$.</li>
<li>$F$: 35,85; 12,52; 7,41 con p 0,0039; 0,0241; 0,0529. Crítico $7{,}71$ ⇒ AB no significativa al 5 %.</li></ul>`,
    fuente: [{ id: "C7.4", loc: "slides 25–26" }, { id: "PR-P3-Q2" }]
  }
]);
