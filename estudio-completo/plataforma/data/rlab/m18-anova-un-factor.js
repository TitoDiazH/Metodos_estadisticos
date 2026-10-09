/* Laboratorio R · ANOVA de un factor (M18, P2) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m18-anova", modulo: "m18-anova-un-factor", tema: "ANOVA",
    titulo: "aov, TukeyHSD, LSD y supuestos (ensamble) + 3 métodos de enseñanza",
    descripcion: "Código de C7.2 slides 9 y 19 / S7.2. Se agregan el LSD calculado a mano, las pruebas de Levene (paquete car) y Shapiro-Wilk, y el ejemplo de 3 métodos de C7.1 (datos leídos de una imagen).",
    funciones: ["aov", "summary", "TukeyHSD", "qt", "resid", "shapiro.test", "car::leveneTest"],
    codigo: `A <- c(6, 8, 7, 8); B <- c(7, 9, 10, 8); C <- c(11, 16, 11, 13); D <- c(10, 12, 11, 9)
tiempo <- c(A, B, C, D)
metodo <- factor(c(rep("A", 4), rep("B", 4), rep("C", 4), rep("D", 4)))
datos <- data.frame(metodo, tiempo)
modelo <- aov(tiempo ~ metodo, data = datos)
summary(modelo)
TukeyHSD(modelo)
cme <- sum(resid(modelo)^2) / 12
round(qt(0.975, 12) * sqrt(2 * cme / 4), 3)
shapiro.test(resid(modelo))$p.value
car::leveneTest(tiempo ~ metodo, data = datos)

x <- c(80, 85, 78, 83,  55, 34, 43, 54,  70, 65, 74, 77)
g <- factor(rep(c("Lecture", "Workshop", "Online"), each = 4))
summary(aov(x ~ g))`,
    salida: `            Df Sum Sq Mean Sq F value  Pr(>F)
metodo       3   69.5  23.167   9.424 0.00177 **
Residuals   12   29.5   2.458
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
  Tukey multiple comparisons of means
    95% family-wise confidence level

Fit: aov(formula = tiempo ~ metodo, data = datos)

$metodo
     diff         lwr      upr     p adj
B-A  1.25 -2.04155503 4.541555 0.6804513
C-A  5.50  2.20844497 8.791555 0.0016206
D-A  3.25 -0.04155503 6.541555 0.0533380
C-B  4.25  0.95844497 7.541555 0.0110423
D-B  2.00 -1.29155503 5.291555 0.3181239
D-C -2.25 -5.54155503 1.041555 0.2309373

[1] 2.416
[1] 0.2808008
Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  3  0.9474 0.4485
      12
            Df Sum Sq Mean Sq F value   Pr(>F)
g            2   2600  1300.0   28.75 0.000123 ***
Residuals    9    407    45.2
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul>
<li>ANOVA ensamble: $F=9{,}424$, $p=0{,}00177$ ⇒ se rechaza $H_0$.</li>
<li><strong>Tukey:</strong> solo C–A ($p=0{,}0016$) y C–B ($p=0{,}0110$) son significativas; D–A ($p=0{,}053$) no. LSD $=2{,}416\approx2{,}42$ sí declararía significativa D–A ($3{,}25>2{,}42$).</li>
<li>Shapiro de los residuos $p=0{,}28$ y Levene $p=0{,}4485$: no se rechazan normalidad ni homogeneidad.</li>
<li>3 métodos: $SC_{TRAT}=2600$, $SC_E=407$, $F=28{,}75$ (gl $2$ y $9$), $p=0{,}000123$.</li>
</ul>`,
    fuente: [{ id: "C7.2", loc: "slides 9 y 19" }, { id: "S7.2", loc: "líneas 14–27" }]
  }
]);
