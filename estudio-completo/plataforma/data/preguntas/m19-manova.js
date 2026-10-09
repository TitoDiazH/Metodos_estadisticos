/* ============================================================================
   Preguntas · M19 MANOVA (P2)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m19-manova";
  var METOD = `datos <- data.frame(
  metodologia = factor(c(rep("Tradicional", 10), rep("ABP", 10), rep("ABPr", 10))),
  quimica  = c(62,60,65,58,64,61,63,59,66,62, 72,70,75,71,74,73,76,72,71,75, 80,82,78,84,81,83,79,85,82,80),
  fisica   = c(58,60,85,62,57,59,61,56,63,58, 68,70,72,69,71,73,67,74,70,72, 78,80,82,79,81,83,77,84,80,82),
  biologia = c(85,87,63,69,66,68,64,70,65,67, 75,77,73,79,76,78,74,80,75,77, 84,86,82,88,85,87,83,89,84,86))
modelo <- manova(cbind(quimica, fisica, biologia) ~ metodologia, data = datos)
`;

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m19-q001", modulo: MOD, concepto: "m19-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Por qué no basta con hacer un ANOVA por cada variable respuesta?",
      opciones: [
        "Infla el error tipo I global e ignora la correlación entre las variables respuesta",
        "Los ANOVA no se pueden hacer con 3 variables",
        "Porque el MANOVA es más rápido",
        "Porque los ANOVA requieren normalidad y el MANOVA no"
      ],
      correcta: 0,
      explicacion: "C7.2 s27: varios contrastes separados multiplican el error tipo I global y no aprovechan la covarianza entre respuestas. El MANOVA contrasta todas las variables a la vez.",
      fuente: [{ id: "C7.2", loc: "slides 26–27" }]
    },
    {
      id: "m19-q002", modulo: MOD, concepto: "m19-c02", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Qué hipótesis nula contrasta el MANOVA?",
      opciones: [
        "Los vectores de medias de todos los grupos son iguales",
        "Las matrices de covarianza de todos los grupos son iguales",
        "Cada variable tiene media cero",
        "Las variables respuesta son independientes"
      ],
      correcta: 0,
      explicacion: "H₀: μ₁ = μ₂ = … = μ_g (vectores de medias), frente a «al menos un vector de medias es distinto». La igualdad de covarianzas es un supuesto (Box's M), no la hipótesis.",
      fuente: [{ id: "C7.2", loc: "slide 28" }]
    },
    {
      id: "m19-q003", modulo: MOD, concepto: "m19-c02", tipo: "multiple", dificultad: 2, origen: "curso",
      enunciado: "¿Cuáles son supuestos del MANOVA?",
      opciones: [
        "Normalidad multivariada dentro de cada grupo",
        "La misma matriz de covarianza en todos los grupos",
        "Observaciones independientes",
        "Que las variables respuesta sean independientes entre sí"
      ],
      correcta: [0, 1, 2],
      explicacion: "Los supuestos son normalidad multivariada, Σ común e independencia. De hecho, el MANOVA aprovecha la correlación entre variables respuesta: no exige que sean independientes.",
      fuente: [{ id: "C7.2", loc: "slide 28" }, { id: "CMAN", loc: "páginas 1–4" }]
    },
    {
      id: "m19-q004", modulo: MOD, concepto: "m19-c03", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "En el MANOVA, ¿cuándo se rechaza H₀ según la Λ de Wilks, Λ = |W| / |W + B|?",
      opciones: [
        "Cuando Λ es pequeña (cercana a 0): B es grande frente a W",
        "Cuando Λ es grande (cercana a 1)",
        "Cuando Λ es exactamente 0,5",
        "Cuando |W| = |B|"
      ],
      correcta: 0,
      explicacion: "Λ mide la fracción de variabilidad total NO explicada por el factor. Grupos muy separados (B grande) ⇒ Λ cercana a 0 ⇒ se rechaza H₀; grupos parecidos (B ≈ 0) ⇒ Λ ≈ 1 ⇒ no se rechaza.",
      fuente: [{ id: "C7.2", loc: "slides 29–30" }]
    },
    {
      id: "m19-q005", modulo: MOD, concepto: "m19-c03", tipo: "calculo", dificultad: 1, origen: "curso",
      enunciado: String.raw`Con $p=3$ variables y $g=3$ grupos, ¿cuántos grados de libertad del numerador tiene la $F$ aproximada de Wilks, $p(g-1)$?`,
      respuesta: 6, tolerancia: 0,
      explicacion: String.raw`$p(g-1)=3\cdot2=6$. En el ejemplo de las metodologías el denominador tiene $50$ gl.`,
      verifica: [{ que: "numDf", js: "3*(3-1)", esperado: 6, tol: 0 }],
      fuente: [{ id: "C7.2", loc: "slides 29–30" }, { id: "CMAN", loc: "páginas 5–6" }]
    },
    {
      id: "m19-q006", modulo: MOD, concepto: "m19-c03", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Se aplicó un MANOVA a Química, Física y Biología de 30 estudiantes según tres metodologías de enseñanza. ¿Qué se concluye con α = 0,05?",
      codigoR: `summary(modelo, test = "Wilks")`,
      salidaR: `            Df    Wilks approx F num Df den Df    Pr(>F)    
metodologia  2 0.048958   29.329      6     50 9.127e-15 ***
Residuals   27                                              
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1`,
      salidaDe: METOD + `summary(modelo, test = "Wilks")`,
      opciones: [
        "Se rechaza H₀: la metodología afecta el rendimiento conjunto en las tres asignaturas (Λ = 0,049 es pequeña)",
        "No se rechaza H₀: Λ = 0,049 es casi 0",
        "Se rechaza H₀ solo para Química",
        "El resultado no es interpretable sin un ANOVA"
      ],
      correcta: 0,
      explicacion: "p ≈ 9·10⁻¹⁵ < 0,05 y Λ muy pequeña (≈ 4,9 % de la variabilidad queda sin explicar por el factor). El MANOVA es global: no dice qué variable o qué grupos difieren; para eso se hace el post hoc.",
      distractores: ["", "Λ cercana a 0 indica grupos muy separados: se rechaza.", "El test conjunto no distingue por asignatura.", "El MANOVA ya es un test con su propio p-valor."],
      fuente: [{ id: "CMAN", loc: "páginas 5–6" }]
    },
    {
      id: "m19-q007", modulo: MOD, concepto: "m19-c03", tipo: "completar-R", dificultad: 1, origen: "curso",
      enunciado: "Completa el código para ajustar un MANOVA con tres respuestas y obtener el estadístico de Wilks.",
      codigoR: `modelo <- ___(cbind(quimica, fisica, biologia) ~ metodologia, data = datos)
summary(modelo, test = "___")`,
      huecos: [["manova"], ["Wilks"]],
      explicacion: String.raw`<code>manova()</code> con las respuestas unidas por <code>cbind()</code>; <code>summary(…, test = "Wilks")</code> (también <code>"Pillai"</code>, <code>"Hotelling-Lawley"</code> o <code>"Roy"</code>).`,
      fuente: [{ id: "CMAN", loc: "página 5" }, { id: "C7.2", loc: "slide 33" }]
    },
    {
      id: "m19-q008", modulo: MOD, concepto: "m19-c04", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`¿Cuántos grados de libertad tiene el test M de Box con $p=3$ variables y $g=3$ grupos, $\frac{p(p+1)}{2}(g-1)$?`,
      respuesta: 12, tolerancia: 0,
      explicacion: String.raw`$\dfrac{3\cdot4}{2}\cdot2=12$. Con $p=2$ y $g=2$ (Ademuz) serían $3$.`,
      verifica: [{ que: "gl", js: "(3*4/2)*(3-1)", esperado: 12, tol: 0 }],
      fuente: [{ id: "C7.2", loc: "slide 31" }, { id: "CMAN", loc: "página 13" }]
    },
    {
      id: "m19-q009", modulo: MOD, concepto: "m19-c04", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "Box's M rechaza la homogeneidad de covarianzas, pero los grupos tienen igual tamaño (n = 10 cada uno). ¿Qué se recomienda?",
      opciones: [
        "Continuar con cautela: con tamaños iguales el MANOVA es relativamente robusto, y Pillai es el estadístico más robusto",
        "Descartar el MANOVA por completo",
        "Usar Wilks sin ninguna precaución",
        "Aumentar α hasta que Box's M no rechace"
      ],
      correcta: 0,
      explicacion: "La violación de la homogeneidad pesa menos con tamaños iguales; si preocupa, se usa Pillai (más robusto). Nunca se ajusta α para que un supuesto pase.",
      fuente: [{ id: "CMAN", loc: "página 13" }, { id: "C7.2", loc: "slide 31" }]
    },
    {
      id: "m19-q010", modulo: MOD, concepto: "m19-c05", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "¿A qué es igual la raíz mayor de Roy?",
      opciones: [
        "Al mayor valor propio de W⁻¹B",
        "A la suma de los valores propios de W⁻¹B",
        "Al determinante de W",
        "A la Λ de Wilks"
      ],
      correcta: 0,
      explicacion: "Roy usa solo el mayor valor propio de W⁻¹B (en iris, 32,19). La traza de Lawley–Hotelling es la SUMA de los valores propios (32,19 + 0,285 = 32,48).",
      verifica: [{ que: "suma de valores propios iris", r: `fit <- manova(cbind(Sepal.Length, Sepal.Width, Petal.Length, Petal.Width) ~ Species, data = iris); W <- crossprod(resid(fit)); Tt <- var(as.matrix(iris[, 1:4])) * 149; cat(round(sum(eigen(solve(W) %*% (Tt - W))$values), 2))`, esperado: 32.48, tol: 0.005 }],
      fuente: [{ id: "C7.2", loc: "slide 32" }]
    },
    {
      id: "m19-q011", modulo: MOD, concepto: "m19-c06", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "MANOVA sobre las 4 medidas de las flores de iris según la especie. ¿Qué se concluye?",
      codigoR: `fit <- manova(cbind(Sepal.Length, Sepal.Width, Petal.Length, Petal.Width) ~ Species, data = iris)
summary(fit, test = "Wilks")`,
      salidaR: `           Df    Wilks approx F num Df den Df    Pr(>F)    
Species     2 0.023439   199.15      8    288 < 2.2e-16 ***
Residuals 147                                              
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1`,
      salidaDe: `fit <- manova(cbind(Sepal.Length, Sepal.Width, Petal.Length, Petal.Width) ~ Species, data = iris)
summary(fit, test = "Wilks")`,
      opciones: [
        "Se rechaza H₀: los vectores de medias de las tres especies difieren fuertemente (Λ = 0,023; p < 2,2·10⁻¹⁶)",
        "No se rechaza H₀: Λ es casi cero",
        "Solo difieren dos de las especies",
        "num Df = 8 indica que hay 8 especies"
      ],
      correcta: 0,
      explicacion: "Λ = 0,023 muy pequeña y p < 2,2·10⁻¹⁶ ⇒ se rechaza H₀. num Df = p(g − 1) = 4·2 = 8 (no es el nº de especies, que son 3). Para saber qué pares de especies difieren hay que hacer el post hoc.",
      fuente: [{ id: "C7.2", loc: "slides 33–34" }]
    },
    {
      id: "m19-q012", modulo: MOD, concepto: "m19-c06", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "Tras un MANOVA significativo, ¿cómo se identifican las variables que difieren entre grupos?",
      opciones: [
        "Con un ANOVA por variable (summary.aov) y, si corresponde, comparaciones de Tukey",
        "Repitiendo el MANOVA con otra Λ",
        "No hace falta: el MANOVA ya lo indica",
        "Con un test de Bartlett"
      ],
      correcta: 0,
      explicacion: "El post hoc de la clase: summary.aov(modelo) entrega un ANOVA por cada variable respuesta y TukeyHSD compara los pares de grupos.",
      fuente: [{ id: "CMAN", loc: "páginas 6–8" }, { id: "C7.2", loc: "slide 34" }]
    },
    {
      id: "m19-q013", modulo: MOD, concepto: "m19-c06", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Post hoc del MANOVA de las metodologías: ANOVA por variable respuesta. ¿En cuál asignatura es más fuerte el efecto de la metodología?",
      codigoR: `summary.aov(modelo)`,
      salidaR: ` Response quimica :
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
`,
      salidaDe: METOD + `summary.aov(modelo)`,
      opciones: [
        "Química (F = 180,7): el efecto es significativo en las tres asignaturas, pero mayor en Química",
        "Biología (F = 20,8), por tener el menor F",
        "Solo en Química es significativo",
        "En ninguna: los p-valores son muy pequeños"
      ],
      correcta: 0,
      explicacion: "Los tres ANOVA son significativos (p < 0,001), con F de 180,7 (Química), 32,6 (Física) y 20,8 (Biología): el mayor F es el efecto más marcado. Un p-valor pequeño indica significancia, no ausencia de efecto.",
      fuente: [{ id: "CMAN", loc: "páginas 6–8" }]
    },
    {
      id: "m19-q014", modulo: MOD, concepto: "m19-c01", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Realizar un ANOVA por separado para cada variable respuesta equivale a un MANOVA, porque ambos contrastan igualdad de medias.",
      correcta: false,
      explicacion: "Falso. Varios ANOVA separados no controlan el error tipo I global y no usan la correlación entre las variables respuesta; el MANOVA contrasta los vectores de medias en conjunto. Un conjunto de ANOVA ≠ un contraste multivariado conjunto.",
      fuente: [{ id: "C7.2", loc: "slide 27" }]
    },
    {
      id: "m19-q015", modulo: MOD, concepto: "m19-c05", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "¿Cómo se relacionan el MANOVA y el análisis discriminante?",
      opciones: [
        "Ambos usan W y B: el MANOVA responde si los grupos difieren y el discriminante cómo se separan (sus funciones son los vectores propios de W⁻¹B)",
        "Son completamente independientes",
        "El MANOVA clasifica observaciones nuevas y el discriminante solo compara medias",
        "El discriminante exige un solo grupo"
      ],
      correcta: 0,
      explicacion: "Secuencia natural: (1) MANOVA para saber si hay diferencias; (2) si las hay, discriminante para encontrar la combinación de variables que mejor separa los grupos. Roy es el mayor valor propio de W⁻¹B.",
      fuente: [{ id: "C7.2", loc: "slide 32" }]
    }
  ]);
})();
