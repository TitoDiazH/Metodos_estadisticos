/* Laboratorio R · Pruebas de hipótesis para una población (M05, P1) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m05-ttest", modulo: "m05-hipotesis-una-poblacion", tema: "Pruebas para la media",
    titulo: "t.test() bilateral con datos simulados (código de la clase)",
    descripcion: "C2 slide 8: 25 tiempos simulados y H0: μ = 10 contra H1: μ ≠ 10, α = 0,05. Se agrega la versión unilateral derecha para comparar.",
    funciones: ["set.seed", "rnorm", "t.test"],
    codigo: `set.seed(123)
x <- rnorm(25, mean = 10.8, sd = 1.9)
t.test(x, mu = 10, alternative = "two.sided", conf.level = 0.95)
t.test(x, mu = 10, alternative = "greater")$p.value`,
    salida: `
	One Sample t-test

data:  x
t = 2.0477, df = 24, p-value = 0.05169
alternative hypothesis: true mean is not equal to 10
95 percent confidence interval:
  9.994168 11.479177
sample estimates:
mean of x
 10.73667

[1] 0.02584274`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>Bilateral: $p=0{,}0517>0{,}05$ ⇒ no se rechaza $H_0$; el IC $[9{,}994;\ 11{,}479]$ contiene $10$. Unilateral derecha: $p=0{,}0258<0{,}05$ ⇒ sí se rechazaría.</p>`,
    fuente: [{ id: "C2", loc: "slides 8–9" }]
  },
  {
    id: "r-m05-ztest", modulo: "m05-hipotesis-una-poblacion", tema: "Pruebas para la media",
    titulo: "z.test() de BSDA con σ conocida",
    descripcion: "C2 slide 11: 30 datos, σ = 2, H0: μ ≤ 10 contra H1: μ > 10.",
    funciones: ["library", "z.test"],
    codigo: `library(BSDA)
x <- c(12.1, 8.9, 10.5, 11.3, 9.7, 13.0, 10.8, 11.6, 7.9, 12.4,
       9.8, 10.9, 11.1, 10.2, 12.0, 9.3, 10.6, 13.2, 8.7, 11.4,
       10.0, 12.6, 9.5, 10.7, 11.8, 10.1, 12.3, 9.9, 11.0, 10.4)
z.test(x = x, mu = 10, sigma.x = 2.0, alternative = "greater", conf.level = 0.95)`,
    salida: `
	One-sample z-Test

data:  x
z = 2.1635, p-value = 0.01525
alternative hypothesis: true mean is greater than 10
95 percent confidence interval:
 10.18938       NA
sample estimates:
mean of x
    10.79`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>$z=2{,}1635$, $p=0{,}01525<0{,}05$ ⇒ se rechaza $H_0$. El IC superior sale <code>NA</code> (la slide escribe «Inf»).</p>`,
    fuente: [{ id: "C2", loc: "slide 11" }]
  },
  {
    id: "r-m05-prop", modulo: "m05-hipotesis-una-poblacion", tema: "Pruebas para proporciones",
    titulo: "Proporción: cálculo manual y prop.test()",
    descripcion: "C2 slide 16: 78 de 120 respondieron que sí; H0: p ≤ 0,60 contra H1: p > 0,60.",
    funciones: ["pnorm", "prop.test"],
    codigo: `X <- 78; n <- 120; p0 <- 0.60
phat <- X / n
z_obs <- (phat - p0) / sqrt(p0 * (1 - p0) / n)
z_obs
1 - pnorm(z_obs)
prop.test(78, 120, 0.6, "greater", correct = FALSE)`,
    salida: `[1] 1.118034
[1] 0.1317762

	1-sample proportions test without continuity correction

data:  78 out of 120, null probability 0.6
X-squared = 1.25, df = 1, p-value = 0.1318
alternative hypothesis: true p is greater than 0.6
95 percent confidence interval:
 0.5757906 1.0000000
sample estimates:
   p
0.65`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>$z=1{,}118$ y p-valor $0{,}1318>0{,}05$ ⇒ no se rechaza. <code>X-squared = 1.25</code> es $z^2$.</p>`,
    fuente: [{ id: "C2", loc: "slide 16" }]
  },
  {
    id: "r-m05-varianza", modulo: "m05-hipotesis-una-poblacion", tema: "Pruebas para la varianza",
    titulo: "Varianza con qchisq/pchisq (no hay función específica)",
    descripcion: "C2 slide 20 (H0: σ² ≤ 4) y Ayudantía 2 P3 (H0: σ² = 4, n = 10; límites de rechazo para s²).",
    funciones: ["var", "qchisq", "pchisq"],
    codigo: `x <- c(10.2, 9.8, 11.1, 10.7, 9.5, 10.0, 10.8, 11.3,
       9.7, 10.4, 10.9, 9.6, 10.5, 11.0, 10.1)
n <- length(x); s2 <- var(x)
chi_obs <- (n - 1) * s2 / 4
c(s2 = s2, chi_obs = chi_obs, chi_crit = qchisq(0.95, n - 1), p = 1 - pchisq(chi_obs, n - 1))

y <- c(52, 55, 54, 58, 53, 56, 57, 59, 54, 56)
n <- length(y)
(n - 1) * var(y) / 4
qchisq(c(0.025, 0.975), n - 1)
4 * qchisq(c(0.025, 0.975), n - 1) / (n - 1)`,
    salida: `        s2    chi_obs   chi_crit          p
 0.3392381  1.1873333 23.6847913  0.9999969
[1] 11.1
[1]  2.700389 19.022768
[1] 1.200173 8.454563`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul><li>Primera parte: $\chi^2_{obs}=1{,}187<23{,}685$ ⇒ no se rechaza.</li><li>Ayudantía 2 P3: $\chi^2=11{,}1$ entre $2{,}70$ y $19{,}02$ ⇒ no se rechaza $H_0:\sigma^2=4$. Se rechazaría si $s^2<1{,}200$ o $s^2>8{,}455$.</li></ul>`,
    fuente: [{ id: "C2", loc: "slide 20" }, { id: "AY2-P", loc: "P3 (a) y (b)" }]
  }
]);
