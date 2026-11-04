/* Laboratorio R · Factorial general (M25, P3) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m25-acabado", modulo: "m25-factorial-general", tema: "Factorial a × b y a × b × c",
    titulo: "Factorial 4 × 3 (acabado de metal): aov(y ~ A * B), medias y LSD",
    descripcion: "Datos de C7.3 s27. El curso muestra la tabla ANOVA (s28) y las medias marginales (s30); aquí se reproducen con aov, model.tables y los valores LSD de s30–31.",
    funciones: ["factor", "rep", "aov", "summary", "model.tables", "qt"],
    codigo: `prof <- factor(rep(c(0.15, 0.18, 0.21, 0.24), each = 9))           # A: 4 niveles
vel  <- factor(rep(rep(c(0.20, 0.25, 0.30), each = 3), times = 4))  # B: 3 niveles
acab <- c(74, 64, 60,  92, 86, 88,  99, 98, 102,     # prof 0.15
          79, 68, 73,  98, 104, 88, 104, 99, 95,     # prof 0.18
          82, 88, 92,  99, 108, 95, 108, 110, 99,    # prof 0.21
          99, 104, 96, 104, 110, 99, 114, 111, 107)  # prof 0.24
modelo <- aov(acab ~ prof * vel)
summary(modelo)
model.tables(modelo, type = "means")$tables$prof
model.tables(modelo, type = "means")$tables$vel
cme <- 28.72
qt(0.975, 24) * sqrt(2 * cme / 9)    # LSD medias de A (r = b*n = 9)
qt(0.975, 24) * sqrt(2 * cme / 12)   # LSD medias de B (r = a*n = 12)
qt(0.975, 24) * sqrt(2 * cme / 3)    # LSD dentro de un nivel (r = n = 3)`,
    salida: `            Df Sum Sq Mean Sq F value   Pr(>F)
prof         3 2125.1   708.4  24.663 1.65e-07 ***
vel          2 3160.5  1580.2  55.018 1.09e-09 ***
prof:vel     6  557.1    92.8   3.232    0.018 *
Residuals   24  689.3    28.7
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
prof
     0.15      0.18      0.21      0.24
 84.77778  89.77778  97.88889 104.88889
vel
      0.2      0.25       0.3
 81.58333  97.58333 103.83333
[1] 5.214039
[1] 4.515491
[1] 9.030981`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul>
<li><code>prof:vel</code> $F=3{,}232$, $p=0{,}018$: la interacción es significativa; también A y B.</li>
<li>Medias de A: $84{,}8;\ 89{,}8;\ 97{,}9;\ 104{,}9$. Con LSD $=5{,}21$: A1–A2 ($5{,}0$) no difieren; los demás pares sí.</li>
<li>Medias de B: $81{,}6;\ 97{,}6;\ 103{,}8$ y LSD $=4{,}52$: todos difieren.</li>
<li>Con interacción se compara dentro de cada velocidad con LSD $=9{,}03$ (medias de celda con $n=3$).</li></ul>`,
    fuente: [{ id: "C7.3", loc: "slides 27–31" }]
  },
  {
    id: "r-m25-sedimentacion", modulo: "m25-factorial-general", tema: "Factorial a × b y a × b × c",
    titulo: "Factorial 3 × 2 × 2 (sedimentación): aov(Y ~ A * B * C)",
    descripcion: "Datos leídos de la tabla en imagen de C7.3 s33 (6 réplicas por celda). La salida coincide con la que muestra s35.",
    funciones: ["factor", "rep", "unlist", "aov", "summary"],
    codigo: `celdas <- list(   # C1 = temperatura 0; C2 = temperatura 30
  c(60, 75, 75, 86, 70, 70), c(67, 73, 73, 67, 68, 68),   # A1 B1, A1 B2 (C1)
  c(62, 68, 65, 76, 65, 65), c(71, 80, 80, 72, 80, 80),   # A2 B1, A2 B2 (C1)
  c(76, 71, 75, 70, 68, 73), c(75, 75, 75, 75, 75, 77),   # A3 B1, A3 B2 (C1)
  c(55, 53, 53, 55, 55, 55), c(52, 52, 57, 52, 54, 54),   # A1 B1, A1 B2 (C2)
  c(44, 44, 45, 48, 48, 45), c(60, 60, 60, 67, 67, 65),   # A2 B1, A2 B2 (C2)
  c(52, 51, 50, 52, 48, 54), c(56, 55, 57, 59, 50, 55))   # A3 B1, A3 B2 (C2)
A <- factor(rep(rep(c("A1", "A1", "A2", "A2", "A3", "A3"), 2), each = 6))
B <- factor(rep(rep(c("B1", "B2"), 6), each = 6))
C <- factor(rep(c("C1", "C2"), each = 36))
Y <- unlist(celdas)
summary(aov(Y ~ A * B * C))`,
    salida: `            Df Sum Sq Mean Sq F value   Pr(>F)
A            2     14       7   0.494   0.6126
B            1    480     480  34.253 2.16e-07 ***
C            1   6087    6087 433.905  < 2e-16 ***
A:B          2    788     394  28.096 2.45e-09 ***
A:C          2     41      20   1.456   0.2412
B:C          1     57      57   4.055   0.0485 *
A:B:C        2     31      16   1.106   0.3375
Residuals   60    842      14
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul>
<li>Significativos: B, C, A:B y B:C ($p=0{,}0485$). No significativos: A, A:C, A:B:C.</li>
<li><code>Residuals 60</code>: $abc(n-1)=12\cdot5$.</li>
<li>Los términos no significativos pueden eliminarse del modelo y pasar al error (C7.3 s35).</li></ul>`,
    fuente: [{ id: "C7.3", loc: "slides 33–36" }]
  }
]);
