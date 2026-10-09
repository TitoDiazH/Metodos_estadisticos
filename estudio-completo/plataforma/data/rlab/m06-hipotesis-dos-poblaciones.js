/* Laboratorio R · Pruebas de hipótesis para dos poblaciones (M06, P1) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m06-vartest", modulo: "m06-hipotesis-dos-poblaciones", tema: "Dos poblaciones",
    titulo: "var.test(): prueba F para varianzas",
    descripcion: "C2 slide 25, unilateral derecha, y cálculo manual del cociente (también el caso de la Ayudantía 2 P4).",
    funciones: ["var", "qf", "pf", "var.test"],
    codigo: `A <- c(10.2, 11.0, 9.8, 10.7, 11.4, 10.9, 9.6, 12.2, 10.5, 11.3, 10.1, 11.6)
B <- c(9.9, 10.1, 10.4, 9.7, 10.3, 9.8, 10.0, 9.6, 10.2, 9.9)
var.test(A, B, alternative = "greater")

MA <- c(15, 16, 14, 18, 17, 16, 15, 19, 17, 16)
MB <- c(12, 14, 13, 15, 12, 14, 13, 12, 14, 13)
F_obs <- var(MA) / var(MB)
c(F_obs, qf(0.95, 9, 9), 1 - pf(F_obs, 9, 9))`,
    salida: `
	F test to compare two variances

data:  A and B
F = 8.9241, num df = 11, denom df = 9, p-value = 0.001388
alternative hypothesis: true ratio of variances is greater than 1
95 percent confidence interval:
 2.876434      Inf
sample estimates:
ratio of variances
          8.924093

[1] 2.0937500 3.1788931 0.1430822`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>Primera parte: $F=8{,}92$, $p=0{,}0014$ ⇒ se rechaza. Ayudantía 2 P4: $F=2{,}094<3{,}179$ y $p=0{,}143$ ⇒ no se rechaza que A tenga mayor varianza.</p>`,
    fuente: [{ id: "C2", loc: "slide 25" }, { id: "AY2-P", loc: "P4" }]
  },
  {
    id: "r-m06-welch", modulo: "m06-hipotesis-dos-poblaciones", tema: "Dos poblaciones",
    titulo: "Welch y pooled con t.test()",
    descripcion: "C2 slide 32 (Welch, alternative = \"less\"). Se agrega var.equal = TRUE para ver la diferencia en los grados de libertad.",
    funciones: ["t.test"],
    codigo: `A <- c(14.2, 13.5, 15.1, 14.7, 13.9, 14.0, 15.4, 14.8, 13.8, 14.1, 15.0, 14.4)
B <- c(16.0, 15.7, 17.3, 16.5, 15.9, 17.1, 16.8, 16.2, 17.4, 15.8)
t.test(A, B, alternative = "less", var.equal = FALSE)
t.test(A, B, alternative = "less", var.equal = TRUE)$parameter`,
    salida: `
	Welch Two Sample t-test

data:  A and B
t = -7.7812, df = 18.553, p-value = 1.481e-07
alternative hypothesis: true difference in means is less than 0
95 percent confidence interval:
      -Inf -1.602957
sample estimates:
mean of x mean of y
 14.40833  16.47000

df
20`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>Welch: $t=-7{,}78$ con $18{,}553$ gl y $p=1{,}5\times10^{-7}$. Con pooled los gl serían $n_1+n_2-2=20$.</p>`,
    fuente: [{ id: "C2", loc: "slides 32–33" }]
  },
  {
    id: "r-m06-pareadas", modulo: "m06-hipotesis-dos-poblaciones", tema: "Dos poblaciones",
    titulo: "t.test() pareada (colesterol)",
    descripcion: "C2 slide 34, y su equivalencia con una t de una muestra sobre las diferencias.",
    funciones: ["t.test"],
    codigo: `antes   <- c(135, 140, 152, 150, 140, 157, 153, 154, 141, 130, 136)
despues <- c(110, 125, 132, 143, 120, 124, 137, 130, 128, 115, 115)
t.test(antes, despues, paired = TRUE, alternative = "two.sided", conf.level = 0.95)
t.test(antes - despues, mu = 0)$statistic`,
    salida: `
	Paired t-test

data:  antes and despues
t = 9.0579, df = 10, p-value = 3.906e-06
alternative hypothesis: true mean difference is not equal to 0
95 percent confidence interval:
 14.32622 23.67378
sample estimates:
mean difference
             19

       t
9.057895`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>$t=9{,}058$, $p=3{,}9\times10^{-6}$, diferencia media $19$. La t de una muestra sobre $d$ da el mismo estadístico.</p>`,
    fuente: [{ id: "C2", loc: "slide 34" }]
  }
]);
