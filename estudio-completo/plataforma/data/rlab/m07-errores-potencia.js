/* Laboratorio R · Errores tipo II y potencia (M07, P1) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m07-beta", modulo: "m07-errores-potencia", tema: "Errores y potencia",
    titulo: "β y potencia para la media (Ayudantía 2, P2) y para la varianza (P3)",
    descripcion: "Límites de no rechazo y probabilidad de no rechazar con el parámetro verdadero. Se agrega el caso n = 80 para ver el efecto del tamaño de muestra.",
    funciones: ["qnorm", "pnorm", "qchisq", "pchisq"],
    codigo: `sigma <- 0.02; n <- 20
li <- 1 + qnorm(0.025) * sigma / sqrt(n)
ls <- 1 + qnorm(0.975) * sigma / sqrt(n)
c(li, ls)
se <- sigma / sqrt(n)
beta <- pnorm(ls, 1.005, se) - pnorm(li, 1.005, se)
c(beta = beta, potencia = 1 - beta)

se80 <- sigma / sqrt(80)
li80 <- 1 + qnorm(0.025) * se80; ls80 <- 1 + qnorm(0.975) * se80
pnorm(ls80, 1.005, se80) - pnorm(li80, 1.005, se80)

n <- 10
ci <- qchisq(0.025, n - 1); cs <- qchisq(0.975, n - 1)
pchisq(cs * 4 / 5, n - 1) - pchisq(ci * 4 / 5, n - 1)`,
    salida: `[1] 0.9912348 1.0087652
     beta  potencia
0.7990444 0.2009556
[1] 0.3912205
[1] 0.9035575`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul><li>Se rechaza si $\bar X<0{,}9912$ o $\bar X>1{,}0088$.</li><li>Con $\mu=1{,}005$: $\beta=0{,}799$ y potencia $0{,}201$. Con $n=80$, $\beta$ baja a $0{,}391$.</li><li>Para la varianza real $5$ (vs. $4$) con $n=10$, la probabilidad de no rechazar es $0{,}9036$.</li></ul>`,
    fuente: [{ id: "AY2-P", loc: "P2 (b)(c) y P3 (c)" }]
  }
]);
