/* ============================================================================
   M19 · MANOVA (P2)
   Fuentes abiertas para redactar: C7.2 slides 25–34 · CMAN (MANOVA.pdf, 16 págs.).
   Los números se recalculan en tools/verificar_numeros.js.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m19-manova",
  orden: 19,
  titulo: "MANOVA",
  descripcion: "El ANOVA cuando la respuesta no es un número sino un vector: comparar a la vez los vectores de medias de varios grupos.",
  pruebas: ["P2"],
  prioridad: "baja",
  fuentes: [{ id: "C7.2", loc: "slides 25–34" }, { id: "CMAN", loc: "páginas 1–13" }],

  conceptos: [
    {
      id: "m19-c01",
      titulo: "Qué es el MANOVA y por qué no varios ANOVA",
      figura: { tipo: "manovaIdea",
        pie: "Esquema: mirando una variable a la vez (curvas en los ejes) los grupos casi no se distinguen; el MANOVA usa la correlación entre las respuestas y los separa." },
      cubre: ["M19.1"],
      simple: String.raw`<p>El MANOVA compara los <strong>vectores de medias</strong> de $g$ grupos cuando se miden $p$ variables respuesta a la vez. Responde: ¿difieren los grupos considerando todas las variables en conjunto, y no una por una?</p>`,
      formal: String.raw`<p>Hacer un ANOVA separado por cada variable tiene dos problemas (C7.2 s27):</p>
<ol>
  <li><strong>Infla el error tipo I global</strong> al multiplicar los contrastes.</li>
  <li><strong>Ignora la correlación</strong> entre las variables respuesta.</li>
</ol>
<p>El MANOVA contrasta todas las variables a la vez: controla el error global y aprovecha la estructura de covarianzas, ganando potencia para detectar diferencias que los ANOVA por separado pueden no ver. Un conjunto de ANOVA por separado $\ne$ un contraste multivariado conjunto. Es la antesala natural del análisis discriminante.</p>`,
      errores: ["Reemplazar el MANOVA por $p$ ANOVA sin ajustar el nivel global."],
      memoriza: String.raw`<p>MANOVA = ANOVA con respuesta vectorial. Evita inflar el error tipo I e incorpora la correlación entre variables.</p>`,
      comprueba: {
        enunciado: "¿Por qué no basta con hacer un ANOVA por cada variable respuesta?",
        opciones: ["Infla el error tipo I global e ignora la correlación entre variables", "Los ANOVA no se pueden hacer con 3 variables", "Porque el MANOVA es más rápido", "Porque los ANOVA requieren normalidad y el MANOVA no"],
        correcta: 0,
        explicacion: "C7.2 s27: multiplica los contrastes (error tipo I) y no usa la covarianza entre respuestas."
      },
      fuente: [{ id: "C7.2", loc: "slides 26–27" }]
    },

    {
      id: "m19-c02",
      titulo: "Modelo, hipótesis y supuestos",
      cubre: ["M19.2"],
      simple: String.raw`<p>Cada grupo $j$ tiene su vector de medias $\mu_j$ ($p\times1$). Se quiere saber si son todos iguales.</p>`,
      formal: String.raw`<p>Modelo: $y_{ij}=\mu+\tau_j+\varepsilon_{ij}$ con matriz de covarianzas $\Sigma$ común. Hipótesis: $H_0:\mu_1=\mu_2=\dots=\mu_g$ frente a «al menos un vector de medias es distinto».</p>
<p><strong>Supuestos:</strong> normalidad multivariada dentro de cada grupo; misma matriz $\Sigma$ en todos los grupos; observaciones independientes.</p>`,
      ejemplo: String.raw`<p>CMAN: 30 estudiantes asignados al azar a 3 metodologías (Tradicional, ABP, ABPr), $10$ por grupo; se mide Química, Física y Biología. $H_0:\mu_{Trad}=\mu_{ABP}=\mu_{ABPr}$ con $\mu=(\mu_Q,\mu_F,\mu_B)$.</p>`,
      errores: ["Olvidar que el supuesto de homogeneidad es de la matriz de covarianza completa."],
      memoriza: String.raw`<p>$H_0:\mu_1=\dots=\mu_g$ (vectores). Supuestos: normalidad multivariada, $\Sigma$ común, independencia.</p>`,
      comprueba: {
        enunciado: "¿Qué iguala H0 en un MANOVA?",
        opciones: ["Los vectores de medias de todos los grupos", "Las matrices de covarianza", "Las varianzas de cada variable", "Los tamaños de grupo"],
        correcta: 0,
        explicacion: "H0: μ1 = μ2 = … = μg."
      },
      fuente: [{ id: "C7.2", loc: "slide 28" }, { id: "CMAN", loc: "páginas 1–4" }]
    },

    {
      id: "m19-c03",
      titulo: "W, B, T y la Λ de Wilks",
      cubre: ["M19.3"],
      simple: String.raw`<p>Igual que el ANOVA separa suma de cuadrados «dentro» y «entre», el MANOVA lo hace con matrices $p\times p$. La $\Lambda$ de Wilks mide qué fracción de la variabilidad total <em>no</em> se explica por el factor: cercana a $0$ ⇒ grupos muy separados.</p>`,
      formal: String.raw`<ul>
  <li>$W$: matriz de sumas de cuadrados y productos <strong>dentro</strong> de grupos (↔ $SC_E$).</li>
  <li>$B$: <strong>entre</strong> grupos (↔ $SC_{TRAT}$).</li>
  <li>$T=W+B$ (identidad MANOVA).</li>
</ul>
$$\Lambda=\frac{|W|}{|T|}=\frac{|W|}{|W+B|}$$
<p>Se rechaza $H_0$ cuando $\Lambda$ es <strong>pequeña</strong> ($B\gg W$); si los grupos son muy parecidos, $B\approx0$ y $\Lambda\approx1$. R la convierte en una $F$ aproximada. Otros estadísticos (todos funciones de los valores propios de $W^{-1}B$): traza de <strong>Pillai</strong>, traza de <strong>Lawley–Hotelling</strong>, raíz mayor de <strong>Roy</strong>. En R: <code>summary(fit, test = "Wilks")</code> (también <code>"Pillai"</code>, <code>"Hotelling-Lawley"</code>, <code>"Roy"</code>).</p>`,
      ejemplo: String.raw`<p>Metodologías (CMAN): $\Lambda=0{,}048958$ ⇒ aproximadamente un $4{,}9\,\%$ de la variabilidad multivariada queda sin explicar por el factor. $F=29{,}329$ con $\text{numDf}=p(g-1)=3\cdot2=6$ y $\text{denDf}=50$; p-valor $\approx9\times10^{-15}$ ⇒ se rechaza $H_0$: la metodología afecta el rendimiento conjunto en Química, Física y Biología.</p>`,
      r: {
        nota: "Código de CMAN p. 5 (base de datos de 30 estudiantes).",
        codigo: `modelo <- manova(cbind(quimica, fisica, biologia) ~ metodologia, data = datos)
summary(modelo, test = "Wilks")`,
        rlab: "r-m19-manova"
      },
      lectura: String.raw`<ul><li><code>Wilks 0.048958</code> y <code>approx F 29.329</code>: la aproximación F de la $\Lambda$.</li><li><code>num Df 6</code> $=p(g-1)$ y <code>den Df 50</code>.</li><li><code>Pr(&gt;F)</code> muy pequeño ⇒ se rechaza $H_0$.</li></ul>`,
      errores: ["Rechazar cuando Λ es grande: se rechaza con Λ pequeña.", "Calcular el numDf mal: es $p(g-1)$, no $g-1$."],
      memoriza: String.raw`<p>$\Lambda=|W|/|W+B|$ · rechazar si $\Lambda$ es pequeña · numDf $=p(g-1)$ · Pillai, Lawley–Hotelling y Roy son otras formas de resumir $W^{-1}B$.</p>`,
      comprueba: {
        enunciado: "Con p = 3 variables y g = 3 grupos, ¿cuántos grados de libertad del numerador tiene la F aproximada de Wilks?",
        opciones: ["6", "2", "9", "3"],
        correcta: 0,
        explicacion: "p(g − 1) = 3 · 2 = 6."
      },
      verifica: [
        { que: "numDf", js: "3*(3-1)", esperado: 6, tol: 1e-9 },
        { que: "Λ recalculada como |W|/|T|", r: `d <- data.frame(g = factor(rep(c("T","P","R"), each = 10)), q = c(62,60,65,58,64,61,63,59,66,62, 72,70,75,71,74,73,76,72,71,75, 80,82,78,84,81,83,79,85,82,80), f = c(58,60,85,62,57,59,61,56,63,58, 68,70,72,69,71,73,67,74,70,72, 78,80,82,79,81,83,77,84,80,82), b = c(85,87,63,69,66,68,64,70,65,67, 75,77,73,79,76,78,74,80,75,77, 84,86,82,88,85,87,83,89,84,86)); m <- manova(cbind(q, f, b) ~ g, d); W <- crossprod(resid(m)); Tt <- var(as.matrix(d[, 2:4])) * 29; cat(round(det(W) / det(Tt), 5))`, esperado: 0.04896, tol: 0.00001 }
      ],
      fuente: [{ id: "C7.2", loc: "slides 29–30" }, { id: "CMAN", loc: "páginas 5–6" }]
    },

    {
      id: "m19-c04",
      titulo: "Verificación de supuestos: Mardia y Box's M",
      cubre: ["M19.4"],
      simple: String.raw`<p>Antes de confiar en el MANOVA hay que revisar normalidad multivariada (Mardia) y homogeneidad de covarianzas (Box's M).</p>`,
      formal: String.raw`<ul>
  <li><strong>Normalidad multivariada</strong> en cada grupo: test de Mardia (<code>MVN::mvn(Y, mvnTest = "mardia")</code>) o Q-Q de Mahalanobis.</li>
  <li><strong>Homogeneidad de covarianzas:</strong> test M de Box (<code>biotools::boxM(Y, grupo)</code>), con grados de libertad $\text{gl}=\dfrac{p(p+1)}{2}(g-1)$.</li>
  <li>Independencia de las observaciones.</li>
  <li>Si falla la homogeneidad, <strong>Pillai</strong> es el estadístico más robusto; si falla la normalidad, considerar transformaciones. Con tamaños de muestra <strong>iguales</strong> el MANOVA es relativamente robusto a la violación de Box's M, pero hay que interpretar con cautela.</li>
</ul>`,
      ejemplo: String.raw`<p>CMAN (p. 13): Box's M significativa ($\chi^2=43{,}038$, $\text{gl}=12$, $p<0{,}001$), con $n=10$ por grupo ⇒ no se cumple la homogeneidad, pero el MANOVA se considera relativamente robusto. Los $12$ gl salen de $\dfrac{3\cdot4}{2}\cdot2=12$.</p>
<p class="ayuda">Con la base principal de la guía (30 estudiantes), calculado en R, Box's M da $\chi^2=56{,}40$ con $12$ gl ($p\approx10^{-7}$): la guía reporta $43{,}038$ para su versión de los datos de la sección final; los grados de libertad y la conclusión son los mismos.</p>`,
      errores: ["Interpretar la significancia de Box's M como «el MANOVA no sirve»: con $n$ iguales es relativamente robusto."],
      memoriza: String.raw`<p>Mardia (normalidad) · Box's M (gl $=p(p+1)(g-1)/2$) · si falla homogeneidad, usar Pillai.</p>`,
      comprueba: {
        enunciado: "Con p = 3 variables y g = 3 grupos, ¿cuántos gl tiene Box's M?",
        opciones: ["12", "6", "9", "18"],
        correcta: 0,
        explicacion: "p(p+1)/2 · (g−1) = 6 · 2 = 12."
      },
      verifica: [
        { que: "gl de Box's M", js: "(3*4/2)*(3-1)", esperado: 12, tol: 1e-9 },
        { que: "χ² de Box's M con la base principal (cálculo a mano)", r: `d <- data.frame(g = factor(rep(c("T","P","R"), each = 10)), q = c(62,60,65,58,64,61,63,59,66,62, 72,70,75,71,74,73,76,72,71,75, 80,82,78,84,81,83,79,85,82,80), f = c(58,60,85,62,57,59,61,56,63,58, 68,70,72,69,71,73,67,74,70,72, 78,80,82,79,81,83,77,84,80,82), b = c(85,87,63,69,66,68,64,70,65,67, 75,77,73,79,76,78,74,80,75,77, 84,86,82,88,85,87,83,89,84,86)); gr <- split(d[, 2:4], d$g); n <- sapply(gr, nrow); S <- lapply(gr, cov); p <- 3; K <- 3; Sp <- Reduce("+", Map(function(s, ni) (ni - 1) * s, S, n)) / (sum(n) - K); M <- (sum(n) - K) * log(det(Sp)) - sum(sapply(1:K, function(i) (n[i] - 1) * log(det(S[[i]])))); c1 <- (sum(1 / (n - 1)) - 1 / (sum(n) - K)) * (2 * p^2 + 3 * p - 1) / (6 * (p + 1) * (K - 1)); cat(round(M * (1 - c1), 2))`, esperado: 56.4, tol: 0.005 }
      ],
      fuente: [{ id: "C7.2", loc: "slide 31" }, { id: "CMAN", loc: "páginas 8–9 y 13" }]
    },

    {
      id: "m19-c05",
      titulo: "Relación con el análisis discriminante",
      cubre: ["M19.5"],
      simple: String.raw`<p>MANOVA y análisis discriminante son dos caras del mismo problema: ambos usan $W$ y $B$. El MANOVA responde <em>si</em> los grupos difieren; el discriminante, <em>cómo</em> y en qué dirección se separan.</p>`,
      formal: String.raw`<p>Las funciones discriminantes son los <strong>vectores propios de $W^{-1}B$</strong>; sus valores propios miden cuánta separación aporta cada una. La <strong>raíz mayor de Roy</strong> es precisamente el mayor valor propio de $W^{-1}B$. Secuencia natural: (1) MANOVA: ¿difieren los grupos? (2) si sí, discriminante: ¿qué combinación de variables los separa?</p>`,
      ejemplo: String.raw`<p>En iris, los valores propios de $W^{-1}B$ son $32{,}19$ y $0{,}285$ (los demás $\approx0$): Roy $=32{,}19$ y Lawley–Hotelling $=32{,}19+0{,}285=32{,}48$.</p>`,
      errores: ["Creer que Roy usa todos los valores propios: usa solo el mayor."],
      memoriza: String.raw`<p>Funciones discriminantes = vectores propios de $W^{-1}B$. Roy = mayor valor propio. Primero MANOVA, luego discriminante.</p>`,
      comprueba: {
        enunciado: "¿A qué es igual la raíz mayor de Roy?",
        opciones: ["Al mayor valor propio de W⁻¹B", "A la suma de los valores propios de W⁻¹B", "Al determinante de W", "A Λ"],
        correcta: 0,
        explicacion: "Roy es el máximo valor propio de W⁻¹B; la traza de Lawley–Hotelling es la suma."
      },
      verifica: [{ que: "mayor valor propio de W⁻¹B (iris)", r: `fit <- manova(cbind(Sepal.Length, Sepal.Width, Petal.Length, Petal.Width) ~ Species, data = iris); W <- crossprod(resid(fit)); Tt <- var(as.matrix(iris[, 1:4])) * 149; cat(round(eigen(solve(W) %*% (Tt - W))$values[1], 2))`, esperado: 32.19, tol: 0.005 }],
      fuente: [{ id: "C7.2", loc: "slide 32" }]
    },

    {
      id: "m19-c06",
      titulo: "Ejemplos: iris y metodologías de enseñanza (con post hoc)",
      cubre: ["M19.6", "M19.7"],
      simple: String.raw`<p>Dos ejemplos completos. Si el MANOVA rechaza, el siguiente paso es el <strong>post hoc</strong>: un ANOVA por variable y, si corresponde, Tukey.</p>`,
      formal: String.raw`<p>R: <code>manova(cbind(y1, y2, …) ~ factor, data)</code>; <code>summary(fit, test = "Wilks")</code>; <code>summary.aov(fit)</code> (un ANOVA por variable); <code>TukeyHSD(aov(y1 ~ factor, data))</code>.</p>`,
      ejemplo: String.raw`<p><strong>Iris</strong> (C7.2 s33–34; 150 flores, 3 especies, 4 medidas): $\Lambda=0{,}0234$, $F\approx199$ con gl $(8,\,288)$, $p<2\cdot10^{-16}$. Pillai $=1{,}19$; Lawley–Hotelling $=32{,}48$; Roy $=32{,}19$. Los cuatro coinciden: las especies difieren mucho en su vector de medias (las medidas de pétalo son las que más separan).</p>
<p><strong>Metodologías</strong> (CMAN): medias (Q, F, B): Tradicional $(62{,}0;\ 61{,}9;\ 70{,}4)$; ABP $(72{,}9;\ 70{,}6;\ 76{,}4)$; ABPr $(81{,}4;\ 80{,}6;\ 85{,}4)$. $\Lambda=0{,}048958$, $F=29{,}329$ ($6$, $50$ gl). Post hoc con <code>summary.aov</code>: <strong>significativo en las tres asignaturas</strong> (Química $F=180{,}7$; Física $32{,}6$; Biología $20{,}8$). Tukey sobre Química: las tres diferencias entre metodologías son significativas ($p\approx0$), con ABPr la mayor y Tradicional la menor.</p>`,
      r: {
        nota: "Código de C7.2 slide 33 / S7.2 líneas 35–47 (iris); el Box's M con biotools se calcula a mano en el Laboratorio.",
        codigo: `fit <- manova(cbind(Sepal.Length, Sepal.Width, Petal.Length, Petal.Width) ~ Species, data = iris)
summary(fit, test = "Wilks")
summary(fit, test = "Pillai")`,
        rlab: "r-m19-manova"
      },
      errores: ["Saltarse el post hoc: el MANOVA no dice qué variable o qué grupos difieren."],
      memoriza: String.raw`<p>Iris: $\Lambda=0{,}0234$, $F\approx199$ (8, 288). Metodologías: $\Lambda=0{,}048958$, $F=29{,}329$ (6, 50). Post hoc: <code>summary.aov</code> + <code>TukeyHSD</code>.</p>`,
      comprueba: {
        enunciado: "Tras un MANOVA significativo, ¿qué se hace para ver qué variables difieren?",
        opciones: ["Un ANOVA por variable (summary.aov) y, si corresponde, Tukey", "Se repite el MANOVA con otra Λ", "Nada: el MANOVA ya lo dice", "Un test de Bartlett"],
        correcta: 0,
        explicacion: "El post hoc de la clase: ANOVA por variable respuesta y comparaciones múltiples."
      },
      verifica: [
        { que: "Wilks iris", r: `fit <- manova(cbind(Sepal.Length, Sepal.Width, Petal.Length, Petal.Width) ~ Species, data = iris); cat(round(summary(fit, test = "Wilks")$stats[1, 2], 4))`, esperado: 0.0234, tol: 0.00005 },
        { que: "F de Wilks, metodologías", r: `d <- data.frame(g = factor(rep(c("T","P","R"), each = 10)), q = c(62,60,65,58,64,61,63,59,66,62, 72,70,75,71,74,73,76,72,71,75, 80,82,78,84,81,83,79,85,82,80), f = c(58,60,85,62,57,59,61,56,63,58, 68,70,72,69,71,73,67,74,70,72, 78,80,82,79,81,83,77,84,80,82), b = c(85,87,63,69,66,68,64,70,65,67, 75,77,73,79,76,78,74,80,75,77, 84,86,82,88,85,87,83,89,84,86)); m <- manova(cbind(q, f, b) ~ g, d); cat(round(summary(m, test = "Wilks")$stats[1, 3], 3))`, esperado: 29.329, tol: 0.0005 }
      ],
      fuente: [{ id: "C7.2", loc: "slides 33–34" }, { id: "S7.2", loc: "líneas 35–47" }, { id: "CMAN", loc: "páginas 1–13" }]
    }
  ],

  errores: [
    { texto: "Se rechaza H0 con Λ pequeña (B grande frente a W), no con Λ grande.", fuente: [{ id: "C7.2", loc: "slide 30" }] }
  ]
});
