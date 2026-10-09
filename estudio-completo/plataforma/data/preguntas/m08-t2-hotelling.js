/* ============================================================================
   Preguntas · M08 Inferencia sobre el vector de medias: T² de Hotelling (P1)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m08-t2-hotelling";
  var DATOS_X = `X1 <- c(12.0, 14.5, 13.1, 15.3, 16.2, 11.8, 14.0, 13.7, 15.9, 12.6)
X2 <- c(8.2, 7.9, 9.1, 10.5, 9.7, 8.8, 9.3, 10.1, 9.9, 8.6)
X <- cbind(X1, X2); n <- nrow(X); p <- ncol(X)
xbar <- colMeans(X); S <- cov(X)
`;
  var T2FUN = `hotelling <- function(mu0) {
  T2 <- as.numeric(n * t(xbar - mu0) %*% solve(S) %*% (xbar - mu0))
  Fobs <- (n - p) / ((n - 1) * p) * T2
  c(T2 = T2, F = Fobs, p_valor = 1 - pf(Fobs, p, n - p))
}
`;

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m08-q001", modulo: MOD, concepto: "m08-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Qué ventaja tiene el contraste conjunto T² frente a p pruebas t separadas sobre cada media?",
      opciones: [
        "Controla el error global y aprovecha la correlación entre las variables",
        "Es más fácil de calcular a mano",
        "No requiere ningún supuesto",
        "Solo sirve cuando las variables son independientes"
      ],
      correcta: 0,
      explicacion: "Las p pruebas t por separado no controlan el error global ni usan la correlación entre variables; el T² sí, y su región de aceptación es una elipse/elipsoide. Requiere normalidad multivariada.",
      distractores: ["", "Es más complejo, no más simple.", "Supone normal multivariada.", "Al contrario: usa la correlación."],
      fuente: [{ id: "C2", loc: "slides 41–42" }]
    },
    {
      id: "m08-q002", modulo: MOD, concepto: "m08-c01", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Si ninguna de las p pruebas t individuales rechaza su hipótesis, entonces el T² conjunto tampoco rechazará H₀: μ = μ₀.",
      correcta: false,
      explicacion: "Falso. Las pruebas separadas ignoran la correlación entre variables y la región de aceptación conjunta es una elipse, no un rectángulo. Un vector puede quedar dentro del rectángulo de los intervalos individuales y fuera de la elipse: el T² rechaza aunque ninguna t lo haga.",
      fuente: [{ id: "C2", loc: "slides 41, 45" }]
    },
    {
      id: "m08-q003", modulo: MOD, concepto: "m08-c01", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: "¿Qué supuesto principal exige la prueba T² de Hotelling y cómo se puede verificar?",
      opciones: [
        "Muestra aleatoria de una normal multivariada; test de Mardia (MVN::mvn o psych::mardia)",
        "Varianzas iguales; test de Bartlett",
        "Datos pareados; test t",
        "Independencia de las variables; correlación de Pearson"
      ],
      correcta: 0,
      explicacion: "Supuesto: X ~ N_p(μ, Σ). Se verifica con el test de Mardia (asimetría y curtosis multivariadas).",
      fuente: [{ id: "C2", loc: "slide 42" }]
    },
    {
      id: "m08-q004", modulo: MOD, concepto: "m08-c02", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Con una sola variable (p = 1), el estadístico T² de Hotelling es igual al cuadrado del estadístico t de Student.",
      correcta: true,
      explicacion: String.raw`Verdadero: $T^2=n(\bar x-\mu_0)^2/s^2=\bigl[(\bar x-\mu_0)/(s/\sqrt n)\bigr]^2=t^2$. El T² es la generalización multivariada de la t.`,
      verifica: [{ que: "T² − t² = 0", r: `x <- c(12.0, 14.5, 13.1, 15.3, 16.2, 11.8, 14.0, 13.7, 15.9, 12.6); cat(round(10 * (mean(x) - 13)^2 / var(x) - ((mean(x) - 13) / (sd(x) / sqrt(10)))^2, 8))`, esperado: 0, tol: 1e-6 }],
      fuente: [{ id: "C2", loc: "slides 43–44" }]
    },
    {
      id: "m08-q005", modulo: MOD, concepto: "m08-c02", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: String.raw`Con $n$ observaciones y $p$ variables, ¿qué distribución sigue $\frac{n-p}{(n-1)p}T^2$ bajo $H_0$?`,
      opciones: [
        String.raw`$F$ con $(p,\ n-p)$ grados de libertad`,
        String.raw`$F$ con $(n-1,\ p)$ grados de libertad`,
        String.raw`$\chi^2$ con $p$ grados de libertad`,
        String.raw`$t$ con $n-1$ grados de libertad`
      ],
      correcta: 0,
      explicacion: "El T² se transforma a una F con (p, n − p) gl; por eso el crítico del T² es (n − 1)p/(n − p) · F_α(p, n − p).",
      fuente: [{ id: "C2", loc: "slides 43–44" }]
    },
    {
      id: "m08-q006", modulo: MOD, concepto: "m08-c02", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C2", loc: "slide 44" }],
      enunciado: String.raw`Con $n=20$, $p=3$ y $T^2=12$, calcula el estadístico $F=\frac{n-p}{(n-1)p}T^2$.`,
      respuesta: 3.579, tolerancia: 0.005,
      explicacion: String.raw`$F=\dfrac{17}{19\cdot3}\cdot12=3{,}579$ con gl $(3,17)$; p-valor $=0{,}036<0{,}05$ ⇒ se rechaza $H_0$. Equivalente: crítico de $T^2$ $=\frac{19\cdot3}{17}F_{0{,}05}(3,17)=10{,}72$ y $12>10{,}72$.`,
      verifica: [
        { que: "F", js: "17/(19*3)*12", esperado: 3.5789, tol: 0.0001 },
        { que: "p-valor", r: `cat(round(pf(3.578947, 3, 17, lower.tail = FALSE), 4))`, esperado: 0.0359, tol: 0.00005 },
        { que: "crítico T²", r: `cat(round(19*3/17*qf(0.95, 3, 17), 3))`, esperado: 10.719, tol: 0.0005 }
      ],
      fuente: [{ id: "C2", loc: "slide 44" }]
    },
    {
      id: "m08-q007", modulo: MOD, concepto: "m08-c02", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C2", loc: "slide 44" }],
      enunciado: String.raw`Para $n=25$ y $p=4$, calcula el <strong>valor crítico del $T^2$</strong> con $\alpha=5\,\%$: $\frac{(n-1)p}{n-p}F_{0{,}05}(p,n-p)$.`,
      respuesta: 12.983, tolerancia: 0.01,
      explicacion: String.raw`$\dfrac{24\cdot4}{21}=4{,}571$ y $F_{0{,}05}(4,21)=2{,}840$ ⇒ crítico $=4{,}571\cdot2{,}840=12{,}983$. Se rechaza $H_0$ si $T^2>12{,}98$.`,
      verifica: [{ que: "crítico T²", r: `cat(round(24*4/21*qf(0.95, 4, 21), 3))`, esperado: 12.983, tol: 0.0005 }],
      fuente: [{ id: "C2", loc: "slide 44" }]
    },
    {
      id: "m08-q008", modulo: MOD, concepto: "m08-c02", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Con las variables X₁ y X₂ (n = 10) se contrastó H₀: μ = (13, 9) con T² de Hotelling. ¿Qué se concluye con α = 0,05?",
      codigoR: `hotelling(c(13, 9))`,
      salidaR: `       T2         F   p_valor 
3.5231742 1.5658552 0.2667549 `,
      salidaDe: DATOS_X + T2FUN + `print(hotelling(c(13, 9)))`,
      opciones: [
        "No se rechaza H₀: p-valor 0,267 > 0,05; no hay evidencia de que el vector de medias difiera de (13, 9)",
        "Se rechaza H₀: T² = 3,52 es mayor que 1",
        "Se rechaza H₀: F = 1,57 es mayor que 1",
        "Se concluye que el vector de medias es exactamente (13, 9)"
      ],
      correcta: 0,
      explicacion: "p = 0,267 > 0,05. En términos del crítico: T² = 3,52 < 10,03 = (9·2/8)·F_{0,05}(2, 8). No rechazar no prueba que μ = (13, 9), solo que no hay evidencia en contra.",
      distractores: ["", "No se compara con 1: se compara con el crítico (10,03) o se usa el p-valor.", "La F se compara con F_{0,05}(2,8) = 4,46, no con 1.", "No rechazar no demuestra igualdad."],
      verifica: [{ que: "crítico T²", r: `cat(round(9*2/8*qf(0.95, 2, 8), 3))`, esperado: 10.033, tol: 0.0005 }],
      fuente: [{ id: "C2", loc: "slides 44, 48" }]
    },
    {
      id: "m08-q009", modulo: MOD, concepto: "m08-c02", tipo: "interpretacion-R", dificultad: 3, origen: "nueva",
      enunciado: "Con los mismos datos se contrastó ahora H₀: μ = (12, 8). ¿Qué se concluye con α = 0,05?",
      codigoR: `hotelling(c(12, 8))`,
      salidaR: `          T2            F      p_valor 
22.598833894 10.043926175  0.006580908 `,
      salidaDe: DATOS_X + T2FUN + `print(hotelling(c(12, 8)))`,
      opciones: [
        "Se rechaza H₀: p-valor 0,0066 < 0,05 (también T² = 22,6 > 10,03)",
        "No se rechaza H₀: p-valor 0,0066 es muy pequeño",
        "No se rechaza H₀ porque F = 10,04 es grande",
        "El test no es válido con n = 10"
      ],
      correcta: 0,
      explicacion: "p = 0,0066 < 0,05 ⇒ se rechaza. T² = 22,6 supera el crítico 10,03. Como se rechaza, el siguiente paso es mirar los intervalos simultáneos para ver qué variable explica el rechazo.",
      distractores: ["", "Un p-valor pequeño lleva a rechazar.", "Un F grande es evidencia contra H₀.", "Con n > p el test se puede calcular (la validez depende de la normalidad)."],
      fuente: [{ id: "C2", loc: "slides 44, 48" }]
    },
    {
      id: "m08-q010", modulo: MOD, concepto: "m08-c02", tipo: "completar-R", dificultad: 2, origen: "curso",
      enunciado: "Completa el cálculo del T² de Hotelling con álgebra de matrices.",
      codigoR: `xbar <- colMeans(X); S <- cov(X)
T2 <- n * t(xbar - mu0) %*% ___(S) %*% (xbar - mu0)
Fobs <- (n - p) / ((n - 1) * p) * as.numeric(T2)
p_valor <- 1 - ___(Fobs, p, n - p)`,
      huecos: [["solve"], ["pf"]],
      explicacion: String.raw`$T^2=n(\bar x-\mu_0)'S^{-1}(\bar x-\mu_0)$: <code>solve(S)</code> invierte $S$. El p-valor usa la distribución F con $(p,\,n-p)$ gl: <code>1 - pf(Fobs, p, n - p)</code>.`,
      fuente: [{ id: "C2", loc: "slides 44, 48" }]
    },
    {
      id: "m08-q011", modulo: MOD, concepto: "m08-c03", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "El vector μ₀ queda FUERA de la elipse de confianza del 95 % para el vector de medias. ¿Qué se concluye?",
      opciones: [
        "Se rechaza H₀: μ = μ₀ al 5 %",
        "No se rechaza H₀",
        "La elipse está mal construida",
        "Hay que usar Bonferroni"
      ],
      correcta: 0,
      explicacion: "Región de confianza y test son equivalentes: μ₀ dentro ⇔ no se rechaza; fuera ⇔ se rechaza.",
      fuente: [{ id: "C2", loc: "slide 45" }]
    },
    {
      id: "m08-q012", modulo: MOD, concepto: "m08-c03", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "La región de confianza conjunta del 95 % para (μ₁, μ₂) es el rectángulo formado por los dos intervalos t individuales del 95 %.",
      correcta: false,
      explicacion: "Falso. La región conjunta es una elipse centrada en el vector de medias, cuya inclinación depende de la correlación; el rectángulo de los dos IC individuales ignora la correlación y su confianza conjunta no es 95 %.",
      fuente: [{ id: "C2", loc: "slides 41, 45" }]
    },
    {
      id: "m08-q013", modulo: MOD, concepto: "m08-c04", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Con $n=10$ y $p=2$, calcula el coeficiente de los intervalos simultáneos $T^2$: $c=\sqrt{\frac{p(n-1)}{n-p}F_{0{,}05}(p,n-p)}$.`,
      respuesta: 3.167, tolerancia: 0.005,
      explicacion: String.raw`$\dfrac{2\cdot9}{8}=2{,}25$ y $F_{0{,}05}(2,8)=4{,}459$ ⇒ $c=\sqrt{2{,}25\cdot4{,}459}=3{,}167$. Intervalo para cada media: $\bar x_k\pm c\sqrt{s_{kk}/n}$.`,
      verifica: [{ que: "c T²", r: `cat(round(sqrt(2*9/8*qf(0.95, 2, 8)), 3))`, esperado: 3.167, tol: 0.0005 }],
      fuente: [{ id: "C2", loc: "slides 46, 48" }]
    },
    {
      id: "m08-q014", modulo: MOD, concepto: "m08-c04", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C2", loc: "slides 46–48" }],
      enunciado: String.raw`Con $n=10$, $p=2$, $\bar x_1=13{,}91$ y $s_{11}=2{,}445$, calcula el <strong>límite superior</strong> del intervalo simultáneo $T^2$ del 95 % para $\mu_1$ (usa $c=3{,}167$).`,
      respuesta: 15.476, tolerancia: 0.01,
      explicacion: String.raw`$13{,}91+3{,}167\sqrt{2{,}445/10}=13{,}91+1{,}566=15{,}476$ (el límite inferior es $12{,}344$). Con Bonferroni ($c=2{,}685$) el intervalo es $[12{,}582;\ 15{,}238]$: más angosto.`,
      verifica: [
        { que: "límite superior T²", r: `cat(round(13.91 + sqrt(2*9/8*qf(0.95, 2, 8)) * sqrt(2.445/10), 3))`, esperado: 15.476, tol: 0.0005 },
        { que: "límite superior Bonferroni", r: `cat(round(13.91 + qt(1 - 0.05/4, 9) * sqrt(2.445/10), 3))`, esperado: 15.238, tol: 0.0005 }
      ],
      fuente: [{ id: "C2", loc: "slides 46–48" }]
    },
    {
      id: "m08-q015", modulo: MOD, concepto: "m08-c04", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "Si solo interesan las p medias originales (no combinaciones lineales arbitrarias), ¿qué intervalos simultáneos son más precisos (angostos)?",
      opciones: ["Bonferroni", "Los de T²", "Ninguno: son idénticos", "Los intervalos t individuales sin ajuste"],
      correcta: 0,
      explicacion: "T² garantiza la confianza para TODAS las combinaciones lineales y por eso es más ancho. Si solo hay p medias, Bonferroni (t con α/2p) es más angosto. Los t sin ajuste son aún más angostos, pero no controlan la confianza global.",
      distractores: ["", "T² es más ancho porque cubre más.", "Bonferroni es menor que T² para p pequeño (2,685 < 3,167 con n = 10, p = 2).", "Son más angostos pero no mantienen la confianza global."],
      verifica: [{ que: "Bonferroni < T²", r: `cat(as.integer(qt(1 - 0.05/4, 9) < sqrt(2*9/8*qf(0.95, 2, 8))))`, esperado: 1, tol: 0 }],
      fuente: [{ id: "C2", loc: "slide 47" }]
    },
    {
      id: "m08-q016", modulo: MOD, concepto: "m08-c04", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "El T² rechazó H₀: μ = μ₀ con p = 2 variables. Los intervalos simultáneos del 95 % son: X₁: [12,3; 15,5] con μ₀₁ = 12, y X₂: [8,4; 10,1] con μ₀₂ = 8. ¿Qué variable(s) explica(n) el rechazo?",
      opciones: [
        "Ambas: ningún intervalo contiene su valor de μ₀",
        "Solo X₁",
        "Solo X₂",
        "Ninguna: los intervalos no sirven después de rechazar"
      ],
      correcta: 0,
      explicacion: "12 no está en [12,3; 15,5] y 8 no está en [8,4; 10,1]: ambas medias difieren de su valor hipotético. Los intervalos simultáneos sirven justamente para localizar qué variables explican el rechazo.",
      fuente: [{ id: "C2", loc: "slides 44, 46, 49" }]
    }
  ]);
})();
