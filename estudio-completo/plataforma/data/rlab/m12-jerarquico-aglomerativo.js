/* Laboratorio R · Clustering jerárquico aglomerativo (M12, P2) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m12-linkage", modulo: "m12-jerarquico-aglomerativo", tema: "Jerárquico aglomerativo",
    titulo: "Alturas de fusión: single, complete, average, centroide y Ward",
    descripcion: "Parte A: 5 empresas de C5.1 s22 (con la estandarización de la slide, divisor n) para reproducir 0,42 → 0,65 → 1,64 → 2,28 y 0,42 → 0,65 → 1,97 → 3,22. Parte B: las 8 empresas con scale() y hclust. Parte C: Ayudantía 5 P1 (Manhattan).",
    funciones: ["scale", "dist", "hclust", "cutree", "sapply"],
    codigo: `datos <- data.frame(Inversion = c(16, 12, 10, 12, 45, 50, 45, 50),
                    Ventas    = c(10, 14, 22, 25, 10, 15, 25, 27))
rownames(datos) <- paste0("E", 1:8)

# A) estandarización con divisor n (reproduce la slide)
sdn <- apply(datos, 2, function(v) sqrt(mean((v - mean(v))^2)))
z <- sweep(sweep(as.matrix(datos), 2, colMeans(datos)), 2, sdn, "/")
d5 <- dist(z[c("E1", "E2", "E5", "E7", "E8"), ])
round(hclust(d5, "single")$height, 2)
round(hclust(d5, "complete")$height, 2)

# B) scale() de R (divisor n-1), 8 empresas
dist_matriz <- dist(scale(datos))
lapply(c("single", "complete", "average", "centroid", "ward.D2"),
       function(m) round(hclust(dist_matriz, m)$height, 3))
cutree(hclust(dist_matriz, "ward.D2"), k = 2)

# C) Ayudantía 5, P1
P <- data.frame(X = c(1, 2, 4, 7, 5), Y = c(1, 6, 3, 4, 1), row.names = LETTERS[1:5])
d <- dist(P, "manhattan")
sapply(c("single", "complete", "average"), function(m) hclust(d, method = m)$height)`,
    salida: `[1] 0.42 0.65 1.64 2.28
[1] 0.42 0.65 1.97 3.22
[[1]]
[1] 0.389 0.440 0.607 0.759 1.143 1.447 1.536

[[2]]
[1] 0.389 0.440 0.607 0.759 2.018 2.235 3.015

[[3]]
[1] 0.389 0.440 0.607 0.759 1.647 1.930 2.254

[[4]]
[1] 0.389 0.440 0.607 0.759 1.385 1.510 1.383

[[5]]
[1] 0.389 0.440 0.607 0.759 2.324 2.716 3.733

E1 E2 E3 E4 E5 E6 E7 E8
 1  1  1  1  2  2  2  2
     single complete average
[1,]      3        3     3.0
[2,]      4        5     4.5
[3,]      4        7     6.0
[4,]      5        9     6.5`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul>
<li><strong>A:</strong> reproduce las alturas de la slide con divisor $n$.</li>
<li><strong>B:</strong> con <code>scale()</code> (divisor $n-1$) las distancias cambian un poco. En el <strong>centroide</strong> las alturas $\dots1{,}385;\,1{,}510;\,1{,}383$ no son crecientes: hay una inversión. Ward separa {E1–E4} de {E5–E8}.</li>
<li><strong>C:</strong> alturas de la Ayudantía 5: single $3,4,4,5$; complete $3,5,7,9$; average $3;\,4{,}5;\,6;\,6{,}5$.</li>
</ul>`,
    fuente: [{ id: "C5.1", loc: "slides 22–32" }, { id: "AY5-E", loc: "P1" }]
  }
]);
