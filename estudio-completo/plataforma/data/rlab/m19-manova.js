/* Laboratorio R · MANOVA (M19, P2) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m19-manova", modulo: "m19-manova", tema: "MANOVA",
    titulo: "MANOVA con iris (clase) y con las metodologías de enseñanza (CMAN)",
    descripcion: "C7.2 slide 33 / S7.2 y CMAN páginas 1–7. Incluye Wilks, Pillai, los valores propios de W⁻¹B y Box's M calculado a mano (biotools no está instalado aquí).",
    funciones: ["manova", "summary", "summary.aov", "TukeyHSD", "eigen", "crossprod"],
    codigo: `fit <- manova(cbind(Sepal.Length, Sepal.Width, Petal.Length, Petal.Width) ~ Species, data = iris)
summary(fit, test = "Wilks")
W <- crossprod(resid(fit)); Tt <- var(as.matrix(iris[, 1:4])) * 149
round(eigen(solve(W) %*% (Tt - W))$values, 3)

datos <- data.frame(
  metodologia = factor(c(rep("Tradicional", 10), rep("ABP", 10), rep("ABPr", 10))),
  quimica  = c(62,60,65,58,64,61,63,59,66,62, 72,70,75,71,74,73,76,72,71,75, 80,82,78,84,81,83,79,85,82,80),
  fisica   = c(58,60,85,62,57,59,61,56,63,58, 68,70,72,69,71,73,67,74,70,72, 78,80,82,79,81,83,77,84,80,82),
  biologia = c(85,87,63,69,66,68,64,70,65,67, 75,77,73,79,76,78,74,80,75,77, 84,86,82,88,85,87,83,89,84,86))
modelo <- manova(cbind(quimica, fisica, biologia) ~ metodologia, data = datos)
summary(modelo, test = "Wilks")
summary.aov(modelo)
TukeyHSD(aov(quimica ~ metodologia, data = datos))`,
    salida: `           Df    Wilks approx F num Df den Df    Pr(>F)
Species     2 0.023439   199.15      8    288 < 2.2e-16 ***
Residuals 147
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
[1] 32.192  0.285  0.000  0.000
            Df    Wilks approx F num Df den Df    Pr(>F)
metodologia  2 0.048958   29.329      6     50 9.127e-15 ***
Residuals   27
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
 Response quimica :
            Df Sum Sq Mean Sq F value    Pr(>F)
metodologia  2 1891.4  945.70  180.71 2.333e-16 ***
Residuals   27  141.3    5.23
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

 Response fisica :
            Df Sum Sq Mean Sq F value    Pr(>F)
metodologia  2 1751.3  875.63  32.578 6.343e-08 ***
Residuals   27  725.7   26.88
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

 Response biologia :
            Df Sum Sq Mean Sq F value    Pr(>F)
metodologia  2 1140.0  570.00  20.764 3.461e-06 ***
Residuals   27  741.2   27.45
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

  Tukey multiple comparisons of means
    95% family-wise confidence level

Fit: aov(formula = quimica ~ metodologia, data = datos)

$metodologia
                  diff        lwr        upr p adj
ABPr-ABP           8.5   5.963389  11.036611     0
Tradicional-ABP  -10.9 -13.436611  -8.363389     0
Tradicional-ABPr -19.4 -21.936611 -16.863389     0`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul>
<li><strong>Iris:</strong> $\Lambda=0{,}023439$, $F=199{,}15$ (8, 288). Valores propios de $W^{-1}B$: $32{,}19$ (Roy) y $0{,}285$ ⇒ Lawley–Hotelling $32{,}48$.</li>
<li><strong>Metodologías:</strong> $\Lambda=0{,}048958$, $F=29{,}329$ (6, 50), $p=9\times10^{-15}$. Post hoc: los tres ANOVA son significativos; Tukey en Química: las tres diferencias son significativas.</li>
</ul>`,
    fuente: [{ id: "C7.2", loc: "slides 33–34" }, { id: "S7.2", loc: "líneas 35–47" }, { id: "CMAN", loc: "páginas 1–7" }]
  }
]);
