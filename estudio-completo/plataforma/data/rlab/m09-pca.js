/* Laboratorio R · Análisis de componentes principales (M09, P1) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m09-ejemplo", modulo: "m09-pca", tema: "PCA",
    titulo: "Ejemplo 3×2 a mano vs. R",
    descripcion: "Verifica el ejemplo de C3 slides 16–18: covarianza, autovalores y scores.",
    funciones: ["matrix", "cov", "eigen", "scale"],
    codigo: `X <- matrix(c(2, 0, 0, 2, 3, 3), 3, byrow = TRUE)
S <- cov(X)
S
e <- eigen(S)
e$values
round(scale(X, scale = FALSE) %*% e$vectors, 2)`,
    salida: `          [,1]      [,2]
[1,] 2.3333333 0.3333333
[2,] 0.3333333 2.3333333
[1] 2.666667 2.000000
      [,1]  [,2]
[1,] -0.94 -1.41
[2,] -0.94  1.41
[3,]  1.89  0.00`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul><li>$S$ coincide con la slide ($2{,}333$ y $0{,}333$).</li><li>Autovalores $2{,}667$ y $2$.</li><li>Los scores son $\pm0{,}94$, $\pm1{,}41$ y $1{,}89$; la slide redondea a $0{,}95$ y $1{,}90$ y el signo de PC2 depende del autovector elegido.</li></ul>`,
    fuente: [{ id: "C3", loc: "slides 16–18" }]
  },
  {
    id: "r-m09-mtcars", modulo: "m09-pca", tema: "PCA",
    titulo: "prcomp() con mtcars (código de la clase)",
    descripcion: "C3 slides 20–25: varianza explicada y loadings de PC1 y PC2.",
    funciones: ["prcomp", "summary", "round"],
    codigo: `pca <- prcomp(mtcars, scale. = TRUE)
summary(pca)
round(pca$rotation[, 1:2], 3)
round(pca$sdev^2, 3)`,
    salida: `Importance of components:
                          PC1    PC2     PC3     PC4     PC5     PC6    PC7
Standard deviation     2.5707 1.6280 0.79196 0.51923 0.47271 0.46000 0.3678
Proportion of Variance 0.6008 0.2409 0.05702 0.02451 0.02031 0.01924 0.0123
Cumulative Proportion  0.6008 0.8417 0.89873 0.92324 0.94356 0.96279 0.9751
                           PC8    PC9    PC10   PC11
Standard deviation     0.35057 0.2776 0.22811 0.1485
Proportion of Variance 0.01117 0.0070 0.00473 0.0020
Cumulative Proportion  0.98626 0.9933 0.99800 1.0000
        PC1    PC2
mpg  -0.363  0.016
cyl   0.374  0.044
disp  0.368 -0.049
hp    0.330  0.249
drat -0.294  0.275
wt    0.346 -0.143
qsec -0.200 -0.463
vs   -0.307 -0.232
am   -0.235  0.429
gear -0.207  0.462
carb  0.214  0.414
 [1] 6.608 2.650 0.627 0.270 0.223 0.212 0.135 0.123 0.077 0.052 0.022`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul><li>PC1 $60{,}1\,\%$ y PC2 $24{,}1\,\%$ ⇒ $84{,}2\,\%$ acumulado.</li><li>Autovalores &gt; 1 (Kaiser): solo los dos primeros ($6{,}61$ y $2{,}65$); el tercero vale $0{,}63$.</li><li>PC1: <code>cyl</code>, <code>disp</code>, <code>wt</code>, <code>hp</code> positivos y <code>mpg</code>, <code>drat</code> negativos. PC2: <code>gear</code>, <code>am</code>, <code>carb</code> positivos y <code>qsec</code> negativo.</li></ul>`,
    fuente: [{ id: "C3", loc: "slides 20–24" }]
  }
]);
