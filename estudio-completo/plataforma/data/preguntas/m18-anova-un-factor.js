/* ============================================================================
   Preguntas · M18 ANOVA de un factor, comparaciones múltiples y supuestos (P2)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m18-anova-un-factor";
  var ENSAMBLE = `A <- c(6, 8, 7, 8); B <- c(7, 9, 10, 8); C <- c(11, 16, 11, 13); D <- c(10, 12, 11, 9)
tiempo <- c(A, B, C, D)
metodo <- factor(c(rep("A", 4), rep("B", 4), rep("C", 4), rep("D", 4)))
datos <- data.frame(metodo, tiempo)
modelo <- aov(tiempo ~ metodo, data = datos)
`;
  var NUEVO = `y <- c(12,14,13,15,11, 18,17,19,16,20, 13,15,14,12,16)
h <- factor(rep(c("X", "Y", "Z"), each = 5))
`;

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m18-q001", modulo: MOD, concepto: "m18-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Cuál es la hipótesis alternativa del ANOVA de un factor?",
      opciones: [
        "Al menos dos medias son distintas",
        "Todas las medias son distintas entre sí",
        "Todas las varianzas son distintas",
        "La media del primer grupo es mayor que la de los demás"
      ],
      correcta: 0,
      explicacion: "H₀: μ₁ = … = μ_k frente a H₁: al menos dos medias distintas. H₁ no dice cuáles ni cuántas.",
      fuente: [{ id: "C7.1", loc: "páginas 25–34" }]
    },
    {
      id: "m18-q002", modulo: MOD, concepto: "m18-c01", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Para comparar las medias de 4 grupos es equivalente realizar 6 pruebas t de a pares, cada una con α = 0,05.",
      correcta: false,
      explicacion: "Falso. Con varias pruebas simultáneas el error global crece (la probabilidad de al menos una falsa alarma supera α). El ANOVA contrasta todas las medias con un solo estadístico F; luego se usan comparaciones múltiples que controlan el error (Tukey).",
      fuente: [{ id: "C7.1", loc: "páginas 25–30" }]
    },
    {
      id: "m18-q003", modulo: MOD, concepto: "m18-c01", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "El diseño completamente al azar (DCA) supone que…",
      opciones: [
        "Aparte del factor estudiado, ningún otro factor influye significativamente: solo hay tratamientos y error aleatorio",
        "Hay un factor de bloqueo que se controla",
        "Las corridas se hacen en un orden fijo",
        "Las medias de los tratamientos son iguales"
      ],
      correcta: 0,
      explicacion: "En el DCA las corridas se hacen en orden aleatorio y solo actúan dos fuentes de variabilidad: tratamientos y error. Si hubiera otro factor influyente, se bloquea.",
      fuente: [{ id: "C7.1", loc: "páginas 33–34" }]
    },
    {
      id: "m18-q004", modulo: MOD, concepto: "m18-c02", tipo: "calculo", dificultad: 1, origen: "curso",
      enunciado: String.raw`Con $k=4$ tratamientos y $N=16$ observaciones, ¿cuántos grados de libertad tiene el error?`,
      respuesta: 12, tolerancia: 0,
      explicacion: String.raw`$gl_E=N-k=16-4=12$. Los de tratamientos son $k-1=3$ y los totales $N-1=15$.`,
      verifica: [{ que: "gl error", js: "16-4", esperado: 12, tol: 0 }],
      fuente: [{ id: "C7.1", loc: "páginas 36–41" }, { id: "C7.2", loc: "slides 2–6" }]
    },
    {
      id: "m18-q005", modulo: MOD, concepto: "m18-c02", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C7.2", loc: "slides 4–6" }],
      enunciado: String.raw`Se tiene $SC_{TRAT}=70$ con $k=3$ tratamientos y $SC_E=30$ con $N=15$. Calcula el estadístico $F_0=CM_{TRAT}/CM_E$.`,
      respuesta: 14, tolerancia: 0.01,
      explicacion: String.raw`$CM_{TRAT}=70/2=35$; $CM_E=30/12=2{,}5$; $F_0=35/2{,}5=14$ con gl $(2,12)$. Crítico $F_{0{,}05;2,12}=3{,}89$ ⇒ se rechaza $H_0$ (p-valor $=0{,}0007$).`,
      verifica: [
        { que: "F0", js: "(70/2)/(30/12)", esperado: 14, tol: 1e-9 },
        { que: "crítico", r: `cat(round(qf(0.95, 2, 12), 2))`, esperado: 3.89, tol: 0.005 }
      ],
      fuente: [{ id: "C7.2", loc: "slides 4–6" }]
    },
    {
      id: "m18-q006", modulo: MOD, concepto: "m18-c02", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: "En la tabla ANOVA, ¿cómo se obtiene el estadístico F₀?",
      opciones: [
        "CM_TRAT / CM_E",
        "CM_E / CM_TRAT",
        "SC_TRAT / SC_E",
        "SC_T / N"
      ],
      correcta: 0,
      explicacion: "F₀ = CM_TRAT / CM_E con CM = SC / gl. Se compara con F_{α; k−1, N−k}. Dividir las sumas de cuadrados sin pasar por los cuadrados medios (opción C) es un error frecuente.",
      distractores: ["", "Está invertido.", "Faltan los grados de libertad.", "No es el estadístico del ANOVA."],
      fuente: [{ id: "C7.1", loc: "páginas 36–41" }]
    },
    {
      id: "m18-q007", modulo: MOD, concepto: "m18-c03", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Ejemplo de los 3 métodos de enseñanza: $SC_T=3007$ y $SC_{TRAT}=2600$. Calcula $SC_E$.`,
      respuesta: 407, tolerancia: 0.5,
      explicacion: String.raw`$SC_E=SC_T-SC_{TRAT}=3007-2600=407$. Con $9$ gl, $CM_E=45{,}2$.`,
      verifica: [{ que: "SC_E", js: "3007-2600", esperado: 407, tol: 0 }],
      fuente: [{ id: "C7.1", loc: "páginas 43–51" }]
    },
    {
      id: "m18-q008", modulo: MOD, concepto: "m18-c03", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Con medias de grupo $81{,}5;\ 46{,}5;\ 71{,}5$, media general $66{,}5$ y $n=4$ por grupo, calcula $SC_{TRAT}=n\sum(\bar y_i-\bar y)^2$.`,
      respuesta: 2600, tolerancia: 0.5,
      explicacion: String.raw`$4\,[(15)^2+(-20)^2+(5)^2]=4(225+400+25)=2600$. Con $F_0=(2600/2)/(407/9)=28{,}75$ se rechaza $H_0$ (p-valor $=0{,}000123$).`,
      verifica: [{ que: "SC_TRAT", js: "4*((81.5-66.5)**2+(46.5-66.5)**2+(71.5-66.5)**2)", esperado: 2600, tol: 1e-9 }],
      fuente: [{ id: "C7.1", loc: "páginas 43–51" }]
    },
    {
      id: "m18-q009", modulo: MOD, concepto: "m18-c03", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "ANOVA sobre las notas de 12 alumnos en tres métodos de enseñanza. ¿Qué se concluye con α = 0,05?",
      codigoR: `g <- factor(rep(c("Lecture", "Workshop", "Online"), each = 4))
summary(aov(x ~ g))`,
      salidaR: `            Df Sum Sq Mean Sq F value   Pr(>F)    
g            2   2600  1300.0   28.75 0.000123 ***
Residuals    9    407    45.2                     
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1`,
      salidaDe: `x <- c(80, 85, 78, 83,  55, 34, 43, 54,  70, 65, 74, 77)
g <- factor(rep(c("Lecture", "Workshop", "Online"), each = 4))
summary(aov(x ~ g))`,
      opciones: [
        "Se rechaza H₀: el método de enseñanza influye en la nota promedio, aunque la salida no dice qué pares difieren",
        "No se rechaza H₀: las notas medias son iguales",
        "Se rechaza H₀: los tres métodos difieren entre sí por pares",
        "El test es inválido porque N − k = 9"
      ],
      correcta: 0,
      explicacion: "Pr(>F) = 0,000123 < 0,05 ⇒ se rechaza H₀: μ₁ = μ₂ = μ₃. Df: 2 (métodos) y 9 (residuales). El F global no identifica qué pares difieren: para eso hace falta Tukey o LSD.",
      fuente: [{ id: "C7.1", loc: "páginas 43–51" }]
    },
    {
      id: "m18-q010", modulo: MOD, concepto: "m18-c04", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "ANOVA del tiempo de ensamble para 4 métodos (4 tiempos por método). ¿Qué indica la salida?",
      codigoR: `modelo <- aov(tiempo ~ metodo, data = datos)
summary(modelo)`,
      salidaR: `            Df Sum Sq Mean Sq F value  Pr(>F)   
metodo       3   69.5  23.167   9.424 0.00177 **
Residuals   12   29.5   2.458                   
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1`,
      salidaDe: ENSAMBLE + `summary(modelo)`,
      opciones: [
        "Se rechaza H₀: el tiempo promedio de ensamble no es igual en todos los métodos (p = 0,00177 < 0,05)",
        "No se rechaza H₀ porque F = 9,42 es mayor que 1",
        "Todos los métodos tienen tiempos distintos",
        "El método C es el más lento, según este output"
      ],
      correcta: 0,
      explicacion: "p = 0,00177 < 0,05 ⇒ al menos dos métodos tienen tiempo promedio distinto (F = 9,42 > F_crítico = 3,49). La salida no identifica cuáles; de las medias C es la mayor, pero eso se confirma con Tukey.",
      distractores: ["", "F grande lleva a rechazar H₀.", "H₁ no afirma que todos difieran.", "El output del ANOVA no compara pares ni dice cuál método es más lento."],
      verifica: [{ que: "F crítico", r: `cat(round(qf(0.95, 3, 12), 2))`, esperado: 3.49, tol: 0.005 }],
      fuente: [{ id: "C7.2", loc: "slides 7–9" }]
    },
    {
      id: "m18-q011", modulo: MOD, concepto: "m18-c04", tipo: "completar-R", dificultad: 1, origen: "curso",
      enunciado: "Completa el código para ajustar el ANOVA de un factor y ver la tabla.",
      codigoR: `modelo <- ___(tiempo ~ metodo, data = datos)
___(modelo)`,
      huecos: [["aov"], ["summary"]],
      explicacion: String.raw`<code>aov(respuesta ~ factor, data)</code> ajusta el modelo y <code>summary()</code> entrega la tabla ANOVA (Df, Sum Sq, Mean Sq, F, Pr(>F)). El factor debe ser de tipo <code>factor</code>.`,
      fuente: [{ id: "C7.2", loc: "slide 9" }, { id: "S7.2", loc: "líneas 14–27" }]
    },
    {
      id: "m18-q012", modulo: MOD, concepto: "m18-c04", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C7.2", loc: "slides 7–9" }],
      enunciado: String.raw`Tres tratamientos con 5 observaciones cada uno: X $=(12,14,13,15,11)$, Y $=(18,17,19,16,20)$, Z $=(13,15,14,12,16)$. La media general es $15$. Calcula $SC_{TRAT}$.`,
      respuesta: 70, tolerancia: 0.01,
      explicacion: String.raw`Medias: $13;\ 18;\ 14$. $SC_{TRAT}=5\,[(13-15)^2+(18-15)^2+(14-15)^2]=5(4+9+1)=70$. $SC_E=10+10+10=30$; $F_0=35/2{,}5=14$.`,
      verifica: [{ que: "SC_TRAT", r: NUEVO + `cat(summary(aov(y ~ h))[[1]][["Sum Sq"]][1])`, esperado: 70, tol: 1e-9 }, { que: "SC_E", r: NUEVO + `cat(summary(aov(y ~ h))[[1]][["Sum Sq"]][2])`, esperado: 30, tol: 1e-9 }],
      fuente: [{ id: "C7.2", loc: "slides 4–6" }]
    },
    {
      id: "m18-q013", modulo: MOD, concepto: "m18-c05", tipo: "multiple", dificultad: 1, origen: "curso",
      enunciado: "¿Cuáles son los supuestos del ANOVA de un factor?",
      opciones: [
        "Normalidad de los residuos",
        "Varianza constante entre tratamientos",
        "Independencia de las observaciones",
        "Que todos los tratamientos tengan la misma media"
      ],
      correcta: [0, 1, 2],
      explicacion: "Los tres supuestos: normalidad, homogeneidad de varianzas e independencia (de los errores). Que las medias sean iguales es la hipótesis nula, no un supuesto.",
      fuente: [{ id: "C7.1", loc: "página 54" }, { id: "C7.2", loc: "slide 22" }]
    },
    {
      id: "m18-q014", modulo: MOD, concepto: "m18-c05", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "¿Con qué gráfico se verifica el supuesto de varianza constante entre tratamientos?",
      opciones: [
        "Residuos vs. valores predichos",
        "Histograma de la respuesta sin separar por tratamiento",
        "Residuos vs. orden de las corridas",
        "Diagrama de cajas de un solo tratamiento"
      ],
      correcta: 0,
      explicacion: "La homogeneidad de varianzas se evalúa con residuos vs. predichos (la dispersión debe verse pareja). La independencia se ve en residuos vs. orden de corridas y la normalidad en el gráfico Q-Q de los residuos.",
      fuente: [{ id: "C7.2", loc: "slides 22–24" }]
    },
    {
      id: "m18-q015", modulo: MOD, concepto: "m18-c05", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`En el ANOVA de un factor, el valor ajustado de cada observación es la media de su tratamiento. En el método A (datos $6,8,7,8$; media $7{,}25$), ¿cuál es el residuo de la primera observación?`,
      respuesta: -1.25, tolerancia: 0.005,
      explicacion: String.raw`$e_{ij}=y_{ij}-\bar y_{i\cdot}=6-7{,}25=-1{,}25$. Los residuos de un tratamiento suman $0$ ($-1{,}25+0{,}75-0{,}25+0{,}75=0$).`,
      verifica: [{ que: "residuo", js: "6-(6+8+7+8)/4", esperado: -1.25, tol: 1e-9 }],
      fuente: [{ id: "C7.1", loc: "página 44" }]
    },
    {
      id: "m18-q016", modulo: MOD, concepto: "m18-c05", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Se verificaron los supuestos del ANOVA de los 4 métodos de ensamble con la prueba de Levene. ¿Qué se concluye?",
      codigoR: `car::leveneTest(tiempo ~ metodo, data = datos)`,
      salidaR: `Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  3  0.9474 0.4485
      12               `,
      salidaDe: ENSAMBLE + `print(car::leveneTest(tiempo ~ metodo, data = datos))`,
      opciones: [
        "No se rechaza H₀ de varianzas iguales (p = 0,4485 > 0,05): se cumple el supuesto de homogeneidad",
        "Se rechaza H₀: las varianzas son distintas",
        "El ANOVA no se puede interpretar",
        "El p-valor indica que las medias son iguales"
      ],
      correcta: 0,
      explicacion: "H₀ de Levene: varianzas iguales. p = 0,4485 > 0,05 ⇒ no se rechaza ⇒ no hay evidencia contra la varianza constante. No es un test sobre medias.",
      fuente: [{ id: "C7.2", loc: "slides 22–24" }]
    },
    {
      id: "m18-q017", modulo: MOD, concepto: "m18-c05", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "En el ANOVA, la normalidad se verifica sobre los datos originales de la respuesta y no sobre los residuos.",
      correcta: false,
      explicacion: "Falso. Los datos originales mezclan las medias distintas de los tratamientos; la normalidad se verifica sobre los residuos (y − media del tratamiento), que deben parecer una muestra normal con media 0.",
      fuente: [{ id: "C7.2", loc: "slides 22–23" }]
    },
    {
      id: "m18-q018", modulo: MOD, concepto: "m18-c06", tipo: "calculo", dificultad: 1, origen: "curso",
      enunciado: String.raw`Con $k=4$ tratamientos, ¿cuántos pares de medias hay que comparar?`,
      respuesta: 6, tolerancia: 0,
      explicacion: String.raw`$k(k-1)/2=4\cdot3/2=6$ (A–B, A–C, A–D, B–C, B–D, C–D).`,
      verifica: [{ que: "pares", js: "4*3/2", esperado: 6, tol: 0 }],
      fuente: [{ id: "C7.2", loc: "slides 10–11" }]
    },
    {
      id: "m18-q019", modulo: MOD, concepto: "m18-c06", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Métodos de ensamble: $n=4$, $CM_E=2{,}458$ y $t_{0{,}025;12}=2{,}179$. Calcula el LSD de Fisher $=t\sqrt{2CM_E/n}$.`,
      respuesta: 2.42, tolerancia: 0.01,
      explicacion: String.raw`$\text{LSD}=2{,}179\sqrt{2\cdot2{,}458/4}=2{,}179\cdot1{,}1086=2{,}42$. Con LSD se declaran significativas las diferencias de medias mayores que $2{,}42$.`,
      verifica: [{ que: "LSD", r: `cat(round(qt(0.975, 12) * sqrt(2 * (29.5/12) / 4), 3))`, esperado: 2.416, tol: 0.0006 }],
      fuente: [{ id: "C7.2", loc: "slides 10–16" }]
    },
    {
      id: "m18-q020", modulo: MOD, concepto: "m18-c06", tipo: "interpretacion-R", dificultad: 3, origen: "curso",
      enunciado: "Comparaciones múltiples de Tukey para los 4 métodos de ensamble (familia de confianza 95 %). ¿Qué pares difieren significativamente?",
      codigoR: `TukeyHSD(modelo)`,
      salidaR: `  Tukey multiple comparisons of means
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
`,
      salidaDe: ENSAMBLE + `TukeyHSD(modelo)`,
      opciones: [
        "Solo C–A (p = 0,0016) y C–B (p = 0,011): son los únicos con p ajustado < 0,05",
        "C–A, C–B y D–A, porque 3,25 > 2,42",
        "Todos los pares, porque el ANOVA fue significativo",
        "Ninguno: Tukey nunca encuentra diferencias"
      ],
      correcta: 0,
      explicacion: "Se mira «p adj» (o si el IC excluye el 0): C–A (0,0016) y C–B (0,011). D–A (0,053) queda justo sobre 0,05: con LSD (umbral 2,42) sí sería significativa; Tukey es menos potente (más conservador).",
      fuente: [{ id: "C7.2", loc: "slides 17–19" }]
    },
    {
      id: "m18-q021", modulo: MOD, concepto: "m18-c06", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "¿Cuál afirmación sobre Tukey y LSD es correcta?",
      opciones: [
        "Tukey es menos potente y controla la confianza grupal (error por experimento)",
        "Tukey detecta más diferencias que LSD",
        "LSD tiene confianza grupal",
        "No se pueden usar después de un ANOVA significativo"
      ],
      correcta: 0,
      explicacion: "LSD (basada en t) tiene confianza individual y es muy sensible; Tukey usa el rango estudentizado, controla el error de toda la familia y es más conservador. Se aplican precisamente después de un ANOVA que rechaza H₀.",
      fuente: [{ id: "C7.2", loc: "slides 10–19" }]
    },
    {
      id: "m18-q022", modulo: MOD, concepto: "m18-c06", tipo: "interpretacion-R", dificultad: 3, origen: "nueva",
      enunciado: "Tukey sobre otros tres tratamientos X, Y y Z (5 observaciones cada uno). ¿Qué se concluye?",
      codigoR: `TukeyHSD(aov(y ~ h))`,
      salidaR: `  Tukey multiple comparisons of means
    95% family-wise confidence level

Fit: aov(formula = y ~ h)

$h
    diff       lwr       upr     p adj
Y-X    5  2.332136  7.667864 0.0008342
Z-X    1 -1.667864  3.667864 0.5907706
Z-Y   -4 -6.667864 -1.332136 0.0046341
`,
      salidaDe: NUEVO + `TukeyHSD(aov(y ~ h))`,
      opciones: [
        "Y difiere de X y de Z; X y Z no difieren entre sí (su IC contiene el 0)",
        "X y Z difieren porque Z−X = 1",
        "Todos los tratamientos difieren",
        "Ningún par difiere"
      ],
      correcta: 0,
      explicacion: "Significativos: Y–X (p = 0,0008) y Z–Y (p = 0,0046), cuyos IC no contienen el 0. Z–X: IC (−1,67; 3,67) incluye el 0 y p = 0,59 ⇒ no hay evidencia de diferencia. Y es el tratamiento con mayor media (18).",
      fuente: [{ id: "C7.2", loc: "slides 17–19" }]
    },
    {
      id: "m18-q023", modulo: MOD, concepto: "m18-c07", tipo: "calculo", dificultad: 3, origen: "curso",
      enunciado: String.raw`C7.2 s21: con $\sigma=1{,}5$, diferencia mínima importante $d_T=2$ y $k=4$ tratamientos, $n=2t^2\sigma^2/d_T^2$ con $t_{0{,}975;16}=2{,}12$. ¿Cuántas observaciones por tratamiento (redondea al entero más cercano)?`,
      respuesta: 5, tolerancia: 0,
      explicacion: String.raw`$n=\dfrac{2\cdot2{,}12^2\cdot1{,}5^2}{2^2}=5{,}06\approx5$. La $t$ depende de $n$ (gl $=k(n-1)=16$ para $n=5$), por eso se itera.`,
      verifica: [{ que: "n redondeado", r: `cat(round(2 * qt(0.975, 16)^2 * 1.5^2 / 2^2))`, esperado: 5, tol: 0 }],
      fuente: [{ id: "C7.2", loc: "slides 20–21" }]
    },
    {
      id: "m18-q024", modulo: MOD, concepto: "m18-c07", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Qué rango de observaciones por tratamiento se recomienda en general?",
      opciones: ["Entre 5 y 30", "Entre 1 y 3", "Más de 100", "Exactamente 12"],
      correcta: 0,
      explicacion: "Recomendación general de C7.1: entre 5 y 30 (cerca de 10 si los datos son consistentes y hasta 30 si hay mucha dispersión).",
      fuente: [{ id: "C7.1", loc: "página 31" }]
    }
  ]);
})();
