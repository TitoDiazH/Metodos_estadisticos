/* Laboratorio R · Distancias para clustering (M11, P2) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m11-distancias", modulo: "m11-conglomerados-distancias", tema: "Distancias",
    titulo: "Euclídea, Manhattan, Chebyshev y correlación (8 empresas)",
    descripcion: "Datos de C5.1 slide 8. Se muestran las distancias entre E1, E2 y E3.",
    funciones: ["dist", "as.matrix", "cor", "t"],
    codigo: `datos <- data.frame(Inversion = c(16, 12, 10, 12, 45, 50, 45, 50),
                    Ventas    = c(10, 14, 22, 25, 10, 15, 25, 27))
rownames(datos) <- paste0("E", 1:8)
round(as.matrix(dist(datos, "euclidean"))[1:3, 1:3], 2)
as.matrix(dist(datos, "manhattan"))[1:3, 1:3]
as.matrix(dist(datos, "maximum"))[1:3, 1:3]
round(1 - cor(t(datos))[1:3, 1:3], 3)`,
    salida: `      E1   E2    E3
E1  0.00 5.66 13.42
E2  5.66 0.00  8.25
E3 13.42 8.25  0.00
   E1 E2 E3
E1  0  8 18
E2  8  0 10
E3 18 10  0
   E1 E2 E3
E1  0  4 12
E2  4  0  8
E3 12  8  0
   E1 E2 E3
E1  0  2  2
E2  2  0  0
E3  2  0  0`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>E1–E2: euclídea $5{,}66$, Manhattan $8$, Chebyshev $4$. Con solo dos variables, la distancia por correlación vale $0$ o $2$ (la correlación entre dos puntos de 2 valores es $\pm1$); no es informativa aquí.</p>`,
    fuente: [{ id: "C5.1", loc: "slides 8–9" }]
  },
  {
    id: "r-m11-binarias", modulo: "m11-conglomerados-distancias", tema: "Distancias",
    titulo: "Jaccard, Simple Matching y Hamming con datos binarios",
    descripcion: "Conteos a, b, c, d de E1 y E2 (datos de C5.1 slide 11) calculados en R base, y Hamming de la Ayudantía 5 P3 con dist(\"manhattan\").",
    funciones: ["sum", "dist"],
    codigo: `x <- c(1, 1, 0, 0); y <- c(0, 1, 1, 1)
a <- sum(x & y); b <- sum(x & !y); c <- sum(!x & y); d <- sum(!x & !y)
c(a = a, b = b, c = c, d = d)
c(jaccard = (b + c) / (a + b + c), simple_matching = (b + c) / (a + b + c + d))

B <- matrix(c(1,0,1,1, 1,0,1,0, 0,1,0,0, 0,1,0,1, 1,0,0,1), 5, byrow = TRUE,
            dimnames = list(paste0("P", 1:5), NULL))
dist(B, "manhattan")`,
    salida: `a b c d
1 1 2 0
        jaccard simple_matching
           0.75            0.75
   P1 P2 P3 P4
P2  1
P3  4  3
P4  3  4  1
P5  1  2  3  2`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>Para E1 y E2: $a=1,b=1,c=2,d=0$ ⇒ SM $=$ Jaccard $=0{,}75$ (la slide dice $a=b=c=d=1$ y $0{,}5$: no coincide con sus datos). En la Ayudantía 5 P3 las distancias de Hamming van de $1$ a $4$: $P_1$–$P_2$, $P_1$–$P_5$ y $P_3$–$P_4$ están a $1$.</p>`,
    fuente: [{ id: "C5.1", loc: "slide 11" }, { id: "AY5-E", loc: "P3" }]
  }
]);
