/* Laboratorio R · Análisis factorial (M10, P1) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m10-comunalidad", modulo: "m10-analisis-factorial", tema: "Análisis factorial",
    titulo: "Comunalidad, especificidad y rotación (6 materias)",
    descripcion: "Matriz A de C4.1 slide 13 y rotación T de la slide 23.",
    funciones: ["matrix", "rowSums", "round"],
    codigo: `A <- matrix(c(.8, .2, .7, .3, .6, .3, .2, .8, .15, .82, .25, .85), 6, byrow = TRUE)
rownames(A) <- c("Ma", "Fi", "Qu", "In", "Hi", "Di")
h2 <- rowSums(A^2)
round(cbind(h2, psi = 1 - h2), 4)
T <- matrix(c(1/sqrt(2), 1/sqrt(2), -1/sqrt(2), 1/sqrt(2)), 2, byrow = TRUE)
round(A %*% T, 3)
round(rowSums((A %*% T)^2), 4)`,
    salida: `       h2    psi
Ma 0.6800 0.3200
Fi 0.5800 0.4200
Qu 0.4500 0.5500
In 0.6800 0.3200
Hi 0.6949 0.3051
Di 0.7850 0.2150
     [,1]  [,2]
Ma  0.424 0.707
Fi  0.283 0.707
Qu  0.212 0.636
In -0.424 0.707
Hi -0.474 0.686
Di -0.424 0.778
    Ma     Fi     Qu     In     Hi     Di
0.6800 0.5800 0.4500 0.6800 0.6949 0.7850`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>Ma $0{,}68$ y Di $0{,}785$ coinciden con la slide 14. Tras rotar cambian las cargas pero las comunalidades son las mismas.</p>`,
    fuente: [{ id: "C4.1", loc: "slides 13–14 y 23" }]
  },
  {
    id: "r-m10-usarrests", modulo: "m10-analisis-factorial", tema: "Análisis factorial",
    titulo: "USArrests: KMO, Bartlett y fa() con Varimax",
    descripcion: "C4.2 slides 15–18. Requiere el paquete psych.",
    funciones: ["scale", "KMO", "cortest.bartlett", "fa"],
    codigo: `library(psych)
datos <- scale(USArrests)
KMO(datos)$MSA
round(KMO(datos)$MSAi, 2)
cortest.bartlett(cor(datos), n = nrow(datos))
fa_modelo <- fa(datos, nfactors = 2, rotate = "varimax")
round(fa_modelo$communality, 3)`,
    salida: `[1] 0.653815
  Murder  Assault UrbanPop     Rape
    0.62     0.64     0.50     0.78
$chisq
[1] 88.28815

$p.value
[1] 6.868423e-17

$df
[1] 6

  Murder  Assault UrbanPop     Rape
   0.899    0.802    0.451    0.657`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>KMO global $0{,}65$; Bartlett rechaza $H_0$ ($p\approx7\times10^{-17}$). Comunalidades: Murder $0{,}899$, Assault $0{,}802$, UrbanPop $0{,}451$, Rape $0{,}657$.</p>`,
    fuente: [{ id: "C4.2", loc: "slides 15–18" }]
  }
]);
