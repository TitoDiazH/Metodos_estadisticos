/* Laboratorio R · Escalamiento, distancias y similitud (M04, P1) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m04-escalas", modulo: "m04-escalamiento-distancias", tema: "Escalamiento",
    titulo: "Min–max, z-score, robusto y L2 (código de la clase)",
    descripcion: "C1 slides 41–44. Los tres primeros usan x = (10,12,15,20,25); el robusto, los 20 datos de la slide 43 (se muestran sus extremos).",
    funciones: ["min", "max", "mean", "sd", "scale", "median", "IQR", "sqrt", "sum"],
    codigo: `x <- c(10, 12, 15, 20, 25)
(x - min(x)) / (max(x) - min(x))
scale(x)[, 1]
x / sqrt(sum(x^2))

x2 <- c(5, 7, 8, 10, 12, 15, 18, 20, 22, 25,
        27, 30, 35, 40, 45, 50, 60, 70, 80, 100)
c(median(x2), IQR(x2))
w <- (x2 - median(x2)) / IQR(x2)
w[c(1, 20)]`,
    salida: `[1] 0.0000000 0.1333333 0.3333333 0.6666667 1.0000000
[1] -1.0479138 -0.7204407 -0.2292311  0.5894515  1.4081342
[1] 0.2587168 0.3104602 0.3880753 0.5174337 0.6467921
[1] 26 32
[1] -0.65625  2.31250`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul><li>Min–max: va de $0$ a $1$.</li><li>Z-score: suma $0$; mínimo $-1{,}05$, máximo $1{,}41$.</li><li>L2: los datos quedan en proporción a su largo ($38{,}65$).</li><li>Robusto: mediana $26$, IQR $32$; el valor extremo $100$ queda en $2{,}31$, no se «infla».</li></ul>`,
    fuente: [{ id: "C1", loc: "slides 41–44" }]
  },
  {
    id: "r-m04-distancias", modulo: "m04-escalamiento-distancias", tema: "Distancias y similitud",
    titulo: "Distancias euclídea y Manhattan; coseno vs. correlación",
    descripcion: "C1 slides 47 y 49.",
    funciones: ["dist", "rbind", "cor", "sum", "sqrt"],
    codigo: `A <- c(2, 3); B <- c(6, 8)
dist(rbind(A, B), method = "euclidean")
dist(rbind(A, B), method = "manhattan")

X <- c(1, 2, 3, 4); Y <- c(2, 8, 6, 8)
Xc <- X - mean(X); Yc <- Y - mean(Y)
sum(Xc*Yc) / (sqrt(sum(Xc^2)) * sqrt(sum(Yc^2)))
cor(X, Y)
sum(X*Y) / (sqrt(sum(X^2)) * sqrt(sum(Y^2)))`,
    salida: `         A
B 6.403124
  A
B 9
[1] 0.7302967
[1] 0.7302967
[1] 0.9578415`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>Euclídea $6{,}403$ y Manhattan $9$. El coseno de los vectores centrados coincide con <code>cor</code> ($0{,}730$); sin centrar, el coseno es $0{,}958$.</p>`,
    fuente: [{ id: "C1", loc: "slides 47 y 49" }]
  }
]);
