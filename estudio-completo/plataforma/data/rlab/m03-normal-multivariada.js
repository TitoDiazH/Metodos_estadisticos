/* Laboratorio R · Normal multivariada (M03, P1) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m03-suma", modulo: "m03-normal-multivariada", tema: "Normal multivariada",
    titulo: "P(X₁ + X₂ ≤ 5) con pnorm (ejercicio de la clase)",
    descripcion: "Código de C1 slide 39: media y varianza de la suma y luego normal univariada.",
    funciones: ["matrix", "sum", "sqrt", "pnorm"],
    codigo: `mu <- c(1, 2)
Sigma <- matrix(c(4, 1, 1, 3), 2, 2)
mu_y <- sum(mu)
sd_y <- sqrt(4 + 3 + 2*1)
mu_y
sd_y
pnorm(5, mean = mu_y, sd = sd_y)`,
    salida: `[1] 3
[1] 3
[1] 0.7475075`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>Media $3$, desviación $3$ (varianza $4+3+2=9$) y $P(Y\le5)=0{,}7475$.</p>`,
    fuente: [{ id: "C1", loc: "slide 39" }]
  }
]);
