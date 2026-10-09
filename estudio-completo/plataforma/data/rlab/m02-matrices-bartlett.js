/* ============================================================================
   Laboratorio R · Matrices de covarianza/correlación y Bartlett (M02, P1)
   ========================================================================== */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m02-cov-eigen", modulo: "m02-matrices-bartlett", tema: "Matrices de covarianza y correlación",
    titulo: "cov(), eigen() y cor() con 4 variables (código de la clase)",
    descripcion: "Los datos X1–X4 (n = 10) de C1 slides 24 y 26. Se muestra la matriz de covarianza, sus valores propios y la matriz de correlación.",
    funciones: ["data.frame", "cov", "eigen", "cor", "round"],
    codigo: `X1 <- c(12.0, 14.5, 13.1, 15.3, 16.2, 11.8, 14.0, 13.7, 15.9, 12.6)
X2 <- c(8.2, 7.9, 9.1, 10.5, 9.7, 8.8, 9.3, 10.1, 9.9, 8.6)
X3 <- c(21.0, 20.5, 19.8, 22.1, 23.4, 20.2, 21.7, 22.5, 23.1, 19.9)
X4 <- c(5.5, 6.1, 5.8, 6.7, 6.4, 5.2, 5.9, 6.3, 6.6, 5.6)
datos <- data.frame(X1, X2, X3, X4)
S <- cov(datos)
round(S, 4)
eigen(S)$values
round(cor(datos), 4)`,
    salida: `       X1     X2     X3     X4
X1 2.4454 0.7799 1.6398 0.7110
X2 0.7799 0.7188 0.8031 0.3043
X3 1.6398 0.8031 1.7662 0.5109
X4 0.7110 0.3043 0.5109 0.2454
[1] 4.35032049 0.52652011 0.27574278 0.02330551
       X1     X2     X3     X4
X1 1.0000 0.5882 0.7890 0.9177
X2 0.5882 1.0000 0.7128 0.7246
X3 0.7890 0.7128 1.0000 0.7759
X4 0.9177 0.7246 0.7759 1.0000`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul>
<li>Diagonal de la primera matriz: varianzas ($2{,}445;\ 0{,}719;\ 1{,}766;\ 0{,}245$). Fuera: covarianzas, todas positivas.</li>
<li>Valores propios: todos $\ge0$ (es semidefinida positiva); el primero ($4{,}35$) concentra $84\,\%$ de la varianza total $5{,}176$.</li>
<li>Matriz de correlación: unos en la diagonal; las correlaciones van de $0{,}59$ a $0{,}92$.</li>
</ul>`,
    fuente: [{ id: "C1", loc: "slides 24 y 26" }]
  },
  {
    id: "r-m02-cor", modulo: "m02-matrices-bartlett", tema: "Matrices de covarianza y correlación",
    titulo: "De covarianzas a correlaciones (Ayudantía 1, ejercicio 1)",
    descripcion: "La pauta calcula cada r a mano; <code>cov2cor()</code> lo hace de una vez.",
    funciones: ["matrix", "sqrt", "diag", "cov2cor"],
    codigo: `Sigma <- matrix(c(16, 6, 8,
                  6, 9, 1,
                  8, 1, 25), 3, byrow = TRUE)
sqrt(diag(Sigma))
cov2cor(Sigma)`,
    salida: `[1] 4 3 5
     [,1]       [,2]       [,3]
[1,]  1.0 0.50000000 0.40000000
[2,]  0.5 1.00000000 0.06666667
[3,]  0.4 0.06666667 1.00000000`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>Desviaciones $4,3,5$. La relación más fuerte es la de las variables 1 y 2 ($r=0{,}5$); la más débil, 2 y 3 ($r=0{,}067$).</p>`,
    fuente: [{ id: "AY1-E", loc: "Parte II, P1" }, { id: "AY1-R", loc: "líneas 96–120" }]
  },
  {
    id: "r-m02-bartlett", modulo: "m02-matrices-bartlett", tema: "Test de Bartlett",
    titulo: "Bartlett a mano (AY1) y con cortest.bartlett (clase)",
    descripcion: "Parte 1: estadístico de la Ayudantía 1 (n = 10, p = 3). Parte 2: <code>psych::cortest.bartlett</code> sobre los datos X1–X4 de la clase.",
    funciones: ["cov2cor", "det", "log", "qchisq", "psych::cortest.bartlett"],
    codigo: `Sigma <- matrix(c(16, 6, 8, 6, 9, 1, 8, 1, 25), 3, byrow = TRUE)
Rmat <- cov2cor(Sigma)
n <- 10; p <- 3
bart <- -(n - 1 - (2*p + 5)/6) * log(det(Rmat))
bart
qchisq(0.95, p*(p - 1)/2)

X1 <- c(12.0, 14.5, 13.1, 15.3, 16.2, 11.8, 14.0, 13.7, 15.9, 12.6)
X2 <- c(8.2, 7.9, 9.1, 10.5, 9.7, 8.8, 9.3, 10.1, 9.9, 8.6)
X3 <- c(21.0, 20.5, 19.8, 22.1, 23.4, 20.2, 21.7, 22.5, 23.1, 19.9)
X4 <- c(5.5, 6.1, 5.8, 6.7, 6.4, 5.2, 5.9, 6.3, 6.6, 5.6)
datos <- data.frame(X1, X2, X3, X4)
library(psych)
cortest.bartlett(cor(datos), n = nrow(datos))`,
    salida: `[1] 3.516396
[1] 7.814728
$chisq
[1] 26.96946

$p.value
[1] 0.0001467275

$df
[1] 6
`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul>
<li><strong>Parte 1:</strong> $3{,}516<7{,}815$ ⇒ no se rechaza $H_0$ (AY1 P3).</li>
<li><strong>Parte 2:</strong> $\chi^2=26{,}97$, $6$ gl, $p=0{,}000147<0{,}05$ ⇒ se rechaza $H_0$: hay correlación global y se puede aplicar PCA o AF.</li>
</ul>`,
    fuente: [{ id: "AY1-R", loc: "líneas 131–137" }, { id: "C1", loc: "slide 31" }]
  }
]);
