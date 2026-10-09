/* Laboratorio R · DIANA (M14, P2) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m14-diana", modulo: "m14-diana", tema: "DIANA",
    titulo: "DIANA con la matriz de distancias de las 5 empresas",
    descripcion: "Reproduce el ejemplo de C5.2 slides 22–26 con cluster::diana. Se muestran las disparidades, los dif de la ronda 1 y el corte en 3 clústeres.",
    funciones: ["diana", "as.dist", "cutree", "as.hclust", "sapply"],
    codigo: `library(cluster)
n <- c("E1", "E2", "E5", "E7", "E8")
D <- matrix(c(0, .65, 1.64, 2.81, 3.22,  .65, 0, 1.97, 2.51, 2.92,
              1.64, 1.97, 0, 2.28, 2.60, 2.81, 2.51, 2.28, 0, .42,
              3.22, 2.92, 2.60, .42, 0), 5, dimnames = list(n, n))
round(sapply(n, function(i) sum(D[i, ]) / 4), 2)
C1 <- "E8"; C2 <- c("E1", "E2", "E5", "E7")
round(sapply(C2, function(i) mean(D[i, setdiff(C2, i)]) - mean(D[i, C1])), 2)
dd <- diana(as.dist(D), diss = TRUE)
round(dd$height, 2)
cutree(as.hclust(dd), k = 3)`,
    salida: `  E1   E2   E5   E7   E8
2.08 2.01 2.12 2.00 2.29
   E1    E2    E5    E7
-1.52 -1.21 -0.64  2.11
[1] 0.65 1.97 3.22 0.42
E1 E2 E5 E7 E8
 1  1  2  3  3`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul><li>La mayor disparidad es la de E8 ($2{,}29$) y en la ronda 1 solo E7 tiene dif $>0$ ($2{,}11$), igual que en la slide (E7 sale $2{,}00$ en R y $2{,}01$ en la slide por redondeo).</li><li>Las alturas de <code>diana</code> son los diámetros: $0{,}65;\ 1{,}97;\ 3{,}22;\ 0{,}42$.</li><li>Con $k=3$: $\{E_1,E_2\}$, $\{E_5\}$ y $\{E_7,E_8\}$.</li></ul>`,
    fuente: [{ id: "C5.2", loc: "slides 22–28" }]
  }
]);
