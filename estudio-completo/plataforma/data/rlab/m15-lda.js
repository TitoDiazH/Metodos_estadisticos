/* Laboratorio R · LDA (M15, P2) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m15-lda", modulo: "m15-lda", tema: "LDA",
    titulo: "Banco de Ademuz: Fisher a mano y lda() de MASS",
    descripcion: "C6.1 slides 14–21 / S6.1. Primero W, u y el corte con álgebra; luego lda(), la matriz de confusión y el cliente nuevo (7, 4).",
    funciones: ["cov", "solve", "lda", "predict", "table"],
    codigo: `datos <- data.frame(
  patrimonio = c(1.3,3.7,5,5.9,7.1,4,7.9,5.1, 5.2,9.8,9,12,6.3,8.7,11.1,9.9),
  deuda      = c(4.1,6.9,3,6.5,5.4,2.7,7.6,3.8, 1,4.2,4.8,2,5.2,1.1,4.1,1.6),
  grupo      = factor(c(rep("Fallido", 8), rep("Cumplidor", 8))))
X <- as.matrix(datos[, 1:2]); F <- X[1:8, ]; C <- X[9:16, ]
W <- cov(F) * 7 + cov(C) * 7
u <- solve(W, colMeans(F) - colMeans(C))
D <- X %*% u
c(round(u, 4), corte = round((mean(D[1:8]) + mean(D[9:16])) / 2, 3))
which((D > (mean(D[1:8]) + mean(D[9:16])) / 2) != (datos$grupo == "Fallido"))

library(MASS)
modelo_lda <- lda(grupo ~ patrimonio + deuda, data = datos)
modelo_lda
pred_lda <- predict(modelo_lda, datos)
tabla <- table(Real = datos$grupo, Predicho = pred_lda$class)
tabla
sum(diag(tabla)) / sum(tabla)
predict(modelo_lda, data.frame(patrimonio = 7, deuda = 4))$posterior`,
    salida: `patrimonio      deuda      corte
   -0.0739     0.0666    -0.2510
[1] 13
Call:
lda(grupo ~ patrimonio + deuda, data = datos)

Prior probabilities of groups:
Cumplidor   Fallido
      0.5       0.5

Group means:
          patrimonio deuda
Cumplidor          9     3
Fallido            5     5

Coefficients of linear discriminants:
                  LD1
patrimonio -0.4224919
deuda       0.3802226
           Predicho
Real        Cumplidor Fallido
  Cumplidor         7       1
  Fallido           0       8
[1] 0.9375
  Cumplidor Fallido
1       0.5     0.5`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul><li>$u=(-0{,}0739;\ 0{,}0666)$ y corte $-0{,}251$; el único dato mal clasificado es el número <strong>13</strong>.</li><li><code>lda()</code>: priors $0{,}5/0{,}5$, medias por grupo y <code>LD1</code> $=(-0{,}422;\ 0{,}380)$ (misma dirección que $u$).</li><li>Matriz de confusión: $7$, $1$, $0$, $8$ ⇒ accuracy $0{,}9375$.</li><li>El cliente $(7,4)$ tiene posterior $0{,}5$ en cada grupo.</li></ul>`,
    fuente: [{ id: "C6.1", loc: "slides 14–21" }, { id: "S6.1", loc: "líneas 11–42" }]
  }
]);
