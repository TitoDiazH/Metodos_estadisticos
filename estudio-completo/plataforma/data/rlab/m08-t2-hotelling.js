/* Laboratorio R · T² de Hotelling (M08, P1 por confirmar) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m08-t2", modulo: "m08-t2-hotelling", tema: "T² de Hotelling",
    titulo: "T² de una muestra con álgebra de matrices y críticos simultáneos",
    descripcion: "Mismo cálculo que HotellingsT2 de la slide 48, sin paquete, con X1 y X2 de C1 s24 y μ0 = (13, 9) (ejemplo construido). Incluye los críticos de T² y de Bonferroni.",
    funciones: ["cbind", "colMeans", "cov", "solve", "pf", "qf", "qt"],
    codigo: `X1 <- c(12.0, 14.5, 13.1, 15.3, 16.2, 11.8, 14.0, 13.7, 15.9, 12.6)
X2 <- c(8.2, 7.9, 9.1, 10.5, 9.7, 8.8, 9.3, 10.1, 9.9, 8.6)
X <- cbind(X1, X2); n <- nrow(X); p <- ncol(X); mu0 <- c(13, 9)
xbar <- colMeans(X); S <- cov(X)
T2 <- n * t(xbar - mu0) %*% solve(S) %*% (xbar - mu0)
Fobs <- (n - p) / ((n - 1) * p) * as.numeric(T2)
c(T2 = as.numeric(T2), F = Fobs, p_valor = 1 - pf(Fobs, p, n - p))
cT2 <- sqrt(p * (n - 1) / (n - p) * qf(0.95, p, n - p))
cB  <- qt(1 - 0.05 / (2 * p), n - 1)
c(cT2 = cT2, cBonferroni = cB)
se <- sqrt(diag(S) / n)
cbind(inf = xbar - cT2 * se, sup = xbar + cT2 * se)`,
    salida: `       T2         F   p_valor
3.5231742 1.5658552 0.2667549
        cT2 cBonferroni
   3.167441    2.685011
         inf      sup
X1 12.343655 15.47635
X2  8.360808 10.05919`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul><li>$T^2=3{,}523$, $F=1{,}566$ con gl $(2,8)$ y p-valor $0{,}267$ ⇒ no se rechaza $H_0:\mu=(13,9)$.</li><li>Los críticos son $3{,}167$ (T²) y $2{,}685$ (Bonferroni).</li><li>Los intervalos simultáneos de T² contienen $13$ y $9$, de acuerdo con no rechazar.</li></ul>`,
    fuente: [{ id: "C2", loc: "slides 43–48" }]
  },
  {
    id: "r-m08-corteza", modulo: "m08-t2-hotelling", tema: "T² de Hotelling",
    titulo: "Corteza: T² con ICSNP e IC simultáneos (salida de la clase)",
    descripcion: "Código y salida copiados de C2 slide 49. No se ejecutó aquí porque cork.csv no está en el repositorio.",
    funciones: ["read.csv", "rbind", "HotellingsT2", "qf", "colMeans", "cov"],
    codigo: `cork <- read.csv("cork.csv"); n <- nrow(cork)
R <- rbind(c(1, -1, 1, -1),    # (N+S)-(E+W)
           c(1, 0, -1, 0),     # N - S
           c(0, 1, 0, -1))     # E - W
Y <- as.matrix(cork) %*% t(R)
library(ICSNP)
HotellingsT2(Y, mu = c(0, 0, 0))
q <- ncol(Y); yb <- colMeans(Y); S <- cov(Y)
cr <- sqrt(q * (n - 1) / (n - q) * qf(.95, q, n - q))
se <- sqrt(diag(S) / n)
cbind(yb - cr * se, yb + cr * se)`,
    salida: `Hotelling's one-sample T2-test
T2 = 20.74   F = 6.40   df = (3, 25)
valor-p = 0.0023

IC simultaneos 95%          inferior  superior
(N+S)-(E+W)   8.86          2.18     15.53   *
N - S         0.86         -3.83      5.55
E - W         1.00         -4.98      6.98
(* el intervalo no contiene 0)`,
    ejecutable: false, origenSalida: "curso",
    lectura: String.raw`<p>$F=6{,}40>F_{0{,}01}(3,25)=4{,}68$ y $p=0{,}0023$ ⇒ se rechaza $H_0$: el depósito de corteza no es igual en las 4 direcciones. Solo $(N+S)-(E+W)$ excluye el $0$.</p>`,
    fuente: [{ id: "C2", loc: "slide 49" }]
  }
]);
