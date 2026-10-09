/* ============================================================================
   Preguntas · M02 Matriz de covarianza, matriz de correlación y test de Bartlett (P1)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m02-matrices-bartlett";

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m02-q001", modulo: MOD, concepto: "m02-c01", tipo: "vf", dificultad: 2, origen: "curso",
      enunciado: String.raw`Una matriz simétrica con unos en la diagonal y todas sus entradas entre $-1$ y $1$ es siempre una matriz de correlación válida.`,
      correcta: false,
      explicacion: String.raw`Falso. Además debe ser <strong>semidefinida positiva</strong> (valores propios $\ge 0$). Contraejemplo: $\begin{pmatrix}1&0{,}9&-0{,}9\\0{,}9&1&0{,}9\\-0{,}9&0{,}9&1\end{pmatrix}$ cumple lo anterior pero no puede existir: si $X_1$ y $X_2$ se correlacionan $+0{,}9$ y $X_2$ y $X_3$ también, $X_1$ y $X_3$ no pueden correlacionarse $-0{,}9$.`,
      verifica: [{ que: "menor valor propio < 0", r: `m <- matrix(c(1,.9,-.9,.9,1,.9,-.9,.9,1),3); cat(as.integer(min(eigen(m)$values) < 0))`, esperado: 1, tol: 0 }],
      fuente: [{ id: "PR-P1-Q1", loc: "afirmación 1" }, { id: "C1", loc: "slides 23–26" }]
    },
    {
      id: "m02-q002", modulo: MOD, concepto: "m02-c01", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: "¿Qué contiene la diagonal de una matriz de covarianza?",
      opciones: ["Las varianzas de cada variable", "Unos", "Las correlaciones de cada variable consigo misma", "Las desviaciones estándar"],
      correcta: 0,
      explicacion: String.raw`$\Sigma_{ii}=\operatorname{Var}(X_i)$. Los unos de la diagonal son propios de la matriz de <em>correlación</em>.`,
      distractores: ["", "Son de la matriz de correlación, no de la de covarianza.", "Eso es 1 y aparece en la matriz de correlación.", "Contiene varianzas (cuadrado de la desviación), no desviaciones."],
      fuente: [{ id: "C1", loc: "slide 22" }]
    },
    {
      id: "m02-q003", modulo: MOD, concepto: "m02-c01", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "AY1-E", loc: "Parte II, P4" }],
      enunciado: String.raw`Sea $\Sigma=\begin{pmatrix}5&2\\2&5\end{pmatrix}$. Calcula su <strong>mayor valor propio</strong>.`,
      respuesta: 7, tolerancia: 0.01,
      explicacion: String.raw`$|\Sigma-\lambda I|=(5-\lambda)^2-4=0\Rightarrow 5-\lambda=\pm2\Rightarrow\lambda=7$ o $\lambda=3$. Ambos son positivos: $\Sigma$ es definida positiva.`,
      verifica: [{ que: "mayor valor propio", r: `cat(max(eigen(matrix(c(5,2,2,5),2))$values))`, esperado: 7, tol: 0.0001 }],
      fuente: [{ id: "C1", loc: "slides 23–24" }, { id: "AY1-E", loc: "Parte II, P4" }]
    },
    {
      id: "m02-q004", modulo: MOD, concepto: "m02-c01", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: String.raw`¿Puede $\begin{pmatrix}4&3\\3&2\end{pmatrix}$ ser una matriz de covarianza?`,
      opciones: [
        "No: tiene un valor propio negativo (no es semidefinida positiva)",
        "Sí: es simétrica y su diagonal es positiva",
        "Sí: todas sus entradas son positivas",
        "No: no tiene unos en la diagonal"
      ],
      correcta: 0,
      explicacion: String.raw`Es simétrica y con diagonal positiva, pero $\det=4\cdot2-3^2=-1<0$, así que un valor propio es negativo ($\lambda\approx6{,}16$ y $\lambda\approx-0{,}16$). Eso implicaría una combinación lineal con varianza negativa, imposible. Equivalente: $\operatorname{cor}=3/\sqrt{8}=1{,}06>1$.`,
      distractores: ["", "Simetría y diagonal positiva son necesarias, no suficientes.", "Las entradas positivas no garantizan semidefinida positiva.", "Los unos son de la matriz de correlación; no se exigen en la de covarianza."],
      verifica: [
        { que: "menor valor propio", r: `cat(round(min(eigen(matrix(c(4,3,3,2),2))$values), 4))`, esperado: -0.1623, tol: 0.0005 },
        { que: "correlación implícita", js: "3/Math.sqrt(4*2)", esperado: 1.0607, tol: 0.001 }
      ],
      fuente: [{ id: "C1", loc: "slide 23" }]
    },
    {
      id: "m02-q005", modulo: MOD, concepto: "m02-c02", tipo: "completar-R", dificultad: 1, origen: "curso",
      enunciado: "Completa el código para obtener la matriz de covarianza muestral del data frame y sus valores propios.",
      codigoR: `S <- ___(datos)
___(S)$values`,
      huecos: [["cov"], ["eigen"]],
      explicacion: String.raw`<code>cov(datos)</code> entrega $S$ (divide por $n-1$) y <code>eigen(S)$values</code> sus valores propios, de mayor a menor.`,
      fuente: [{ id: "C1", loc: "slide 24" }, { id: "AY1-R", loc: "líneas 96–120" }]
    },
    {
      id: "m02-q006", modulo: MOD, concepto: "m02-c02", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C1", loc: "slide 24" }],
      enunciado: String.raw`Una matriz de covarianza de 3 variables tiene varianzas $2{,}5;\ 2{,}5$ y $2{,}5$ en la diagonal. ¿Cuánto suman sus tres valores propios?`,
      respuesta: 7.5, tolerancia: 0.01,
      explicacion: String.raw`La suma de los valores propios es la traza de la matriz: $2{,}5+2{,}5+2{,}5=7{,}5$ (la varianza total). Se puede comprobar con los datos $a=(1,2,3,4,5)$, $b=(2,1,4,3,5)$, $c=(5,3,4,1,2)$: la suma de los valores propios de su $S$ es $7{,}5$.`,
      verifica: [{ que: "suma de valores propios", r: `d <- data.frame(a=c(1,2,3,4,5), b=c(2,1,4,3,5), c=c(5,3,4,1,2)); cat(round(sum(eigen(cov(d))$values), 4))`, esperado: 7.5, tol: 0.0001 }],
      fuente: [{ id: "C1", loc: "slide 24" }]
    },
    {
      id: "m02-q007", modulo: MOD, concepto: "m02-c02", tipo: "vf", dificultad: 1, origen: "nueva",
      enunciado: String.raw`La función <code>cov(datos)</code> de R divide por $n$ y no por $n-1$.`,
      correcta: false,
      explicacion: String.raw`Falso: <code>cov()</code> entrega la covarianza <strong>muestral</strong>, que divide por $n-1$.`,
      verifica: [{ que: "cov(1:3,c(2,4,9)) = 3.5 (n-1)", r: `cat(cov(1:3, c(2,4,9)))`, esperado: 3.5, tol: 0.0001 }],
      fuente: [{ id: "C1", loc: "slide 24" }]
    },
    {
      id: "m02-q008", modulo: MOD, concepto: "m02-c03", tipo: "calculo", dificultad: 1, origen: "curso",
      enunciado: String.raw`Con $\Sigma=\begin{pmatrix}16&6&8\\6&9&1\\8&1&25\end{pmatrix}$ (tiempo, costo, distancia), calcula la correlación entre tiempo (variable 1) y distancia (variable 3).`,
      respuesta: 0.4, tolerancia: 0.005,
      explicacion: String.raw`$r_{13}=\dfrac{8}{\sqrt{16\cdot25}}=\dfrac{8}{20}=0{,}4$: asociación lineal positiva moderada.`,
      verifica: [{ que: "r13", js: "8/Math.sqrt(16*25)", esperado: 0.4, tol: 1e-9 }],
      fuente: [{ id: "AY1-E", loc: "Parte II, P1" }, { id: "C1", loc: "slide 25" }]
    },
    {
      id: "m02-q009", modulo: MOD, concepto: "m02-c03", tipo: "calculo", dificultad: 1, origen: "variacion",
      base: [{ id: "AY1-E", loc: "Parte II, P1" }],
      enunciado: String.raw`Dos variables tienen $s_{11}=25$, $s_{22}=4$ y covarianza $s_{12}=-6$. Calcula su correlación.`,
      respuesta: -0.6, tolerancia: 0.005,
      explicacion: String.raw`$r_{12}=\dfrac{-6}{\sqrt{25\cdot4}}=\dfrac{-6}{10}=-0{,}6$: relación lineal negativa moderada.`,
      verifica: [{ que: "r12", r: `cat(cov2cor(matrix(c(25,-6,-6,4),2))[1,2])`, esperado: -0.6, tol: 1e-9 }],
      fuente: [{ id: "C1", loc: "slide 25" }]
    },
    {
      id: "m02-q010", modulo: MOD, concepto: "m02-c03", tipo: "multiple", dificultad: 1, origen: "nueva",
      enunciado: "¿Cuáles son propiedades de una matriz de correlación de Pearson?",
      opciones: [
        "Es simétrica",
        "Tiene unos en la diagonal",
        "Sus entradas están entre −1 y 1",
        "Sus entradas dependen de las unidades de medida de las variables",
        "Su diagonal son las varianzas"
      ],
      correcta: [0, 1, 2],
      explicacion: "La correlación es simétrica, tiene unos en la diagonal y |r| ≤ 1. Es adimensional: no depende de las unidades. Las varianzas están en la diagonal de la matriz de covarianza.",
      fuente: [{ id: "C1", loc: "slides 25–26" }]
    },
    {
      id: "m02-q011", modulo: MOD, concepto: "m02-c03", tipo: "completar-R", dificultad: 1, origen: "curso",
      enunciado: "Se tiene la matriz de covarianza Sigma (sin los datos originales). Completa para obtener la matriz de correlación.",
      codigoR: `Sigma <- matrix(c(16, 6, 8, 6, 9, 1, 8, 1, 25), 3, byrow = TRUE)
Rmat <- ___(Sigma)`,
      huecos: [["cov2cor"]],
      explicacion: String.raw`<code>cov2cor(Sigma)</code> divide cada covarianza por el producto de las desviaciones: $r_{ij}=s_{ij}/\sqrt{s_{ii}s_{jj}}$.`,
      fuente: [{ id: "AY1-R", loc: "líneas 96–120" }]
    },
    {
      id: "m02-q012", modulo: MOD, concepto: "m02-c03", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Se calculó la matriz de correlación de cuatro variables de `mtcars`. ¿Qué par de variables tiene la asociación lineal más fuerte (en valor absoluto)?",
      salidaR: `        mpg   disp     hp     wt
mpg   1.000 -0.848 -0.776 -0.868
disp -0.848  1.000  0.791  0.888
hp   -0.776  0.791  1.000  0.659
wt   -0.868  0.888  0.659  1.000`,
      salidaDe: `round(cor(mtcars[, c("mpg", "disp", "hp", "wt")]), 3)`,
      opciones: ["disp y wt (r = 0,888)", "mpg y wt (r = −0,868), porque es negativa", "hp y wt (r = 0,659)", "mpg y hp (r = −0,776)"],
      correcta: 0,
      explicacion: "La fuerza se mide con |r|: el mayor es 0,888 (disp–wt). El signo solo da el sentido: mpg–wt es negativa y casi igual de fuerte, pero 0,868 < 0,888.",
      distractores: ["", "Es muy fuerte pero |−0,868| < 0,888; el signo no resta fuerza.", "Es la más débil de las seis.", "Es más débil que disp–wt."],
      fuente: [{ id: "C1", loc: "slide 26" }]
    },
    {
      id: "m02-q013", modulo: MOD, concepto: "m02-c04", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Qué hipótesis nula contrasta el test de esfericidad de Bartlett sobre la matriz de correlación R?",
      opciones: [
        "R es la matriz identidad (las variables no están correlacionadas)",
        "R tiene todas sus correlaciones distintas de cero",
        "Las medias de las variables son iguales",
        "Las varianzas de las variables son iguales"
      ],
      correcta: 0,
      explicacion: String.raw`$H_0:R=I_p$ frente a $H_1:R\ne I_p$. Si se rechaza, existe correlación entre al menos dos variables y tiene sentido PCA o análisis factorial.`,
      distractores: ["", "Eso es parte de H1 (ni siquiera exige todas ≠ 0).", "Eso lo contrasta ANOVA o T².", "Eso sería un test de homogeneidad de varianzas."],
      fuente: [{ id: "C1", loc: "slides 27–28" }, { id: "AY1-E", loc: "Parte II, P3" }]
    },
    {
      id: "m02-q014", modulo: MOD, concepto: "m02-c04", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`En la Ayudantía 1 se tiene $p=3$ variables, $n=10$ y $|R|=0{,}6122$. Calcula el estadístico $\chi^2_B=-\bigl(n-1-\tfrac{2p+5}{6}\bigr)\ln|R|$.`,
      respuesta: 3.516, tolerancia: 0.01,
      explicacion: String.raw`Coeficiente: $9-\tfrac{11}{6}=7{,}1667$. Entonces $\chi^2_B=7{,}1667\cdot0{,}4906=3{,}516$ (con $|R|$ sin redondear). Se compara con $\chi^2_{0{,}95;3}=7{,}815$: no se rechaza $H_0$.`,
      verifica: [{ que: "χ²B", r: `Sigma <- matrix(c(16, 6, 8, 6, 9, 1, 8, 1, 25), 3, byrow = TRUE); cat(round(-(10 - 1 - (2*3 + 5)/6) * log(det(cov2cor(Sigma))), 3))`, esperado: 3.516, tol: 0.0005 }],
      fuente: [{ id: "AY1-E", loc: "Parte II, P3" }, { id: "AY1-R", loc: "líneas 131–137" }]
    },
    {
      id: "m02-q015", modulo: MOD, concepto: "m02-c04", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "AY1-E", loc: "Parte II, P3" }],
      enunciado: String.raw`Con $n=20$ observaciones y $p=4$ variables se obtuvo $|R|=0{,}2$. Calcula el estadístico de Bartlett.`,
      respuesta: 27.09, tolerancia: 0.05,
      explicacion: String.raw`Coeficiente: $n-1-\tfrac{2p+5}{6}=19-\tfrac{13}{6}=16{,}8333$. $\ln0{,}2=-1{,}6094$. Entonces $\chi^2_B=16{,}8333\cdot1{,}6094=27{,}09$. Con $\text{gl}=4\cdot3/2=6$ y $\chi^2_{0{,}95;6}=12{,}59$, se rechaza $H_0$.`,
      verifica: [{ que: "χ²B", js: "-(20-1-(2*4+5)/6)*Math.log(0.2)", esperado: 27.0922, tol: 0.001 }],
      fuente: [{ id: "C1", loc: "slides 27–30" }]
    },
    {
      id: "m02-q016", modulo: MOD, concepto: "m02-c04", tipo: "calculo", dificultad: 1, origen: "nueva",
      enunciado: String.raw`¿Cuántos grados de libertad tiene el test de Bartlett con $p=5$ variables?`,
      respuesta: 10, tolerancia: 0,
      explicacion: String.raw`$\text{gl}=\dfrac{p(p-1)}{2}=\dfrac{5\cdot4}{2}=10$ (el número de correlaciones distintas de la matriz).`,
      verifica: [{ que: "gl", js: "5*4/2", esperado: 10, tol: 0 }],
      fuente: [{ id: "C1", loc: "slide 28" }]
    },
    {
      id: "m02-q017", modulo: MOD, concepto: "m02-c04", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: String.raw`Si la matriz de correlación fuera exactamente la identidad, ¿cuánto valdría el estadístico de Bartlett?`,
      opciones: ["0, porque ln|I| = ln 1 = 0", "1", "Infinito", "Depende de n y p, pero es positivo"],
      correcta: 0,
      explicacion: String.raw`$|I|=1\Rightarrow\ln|I|=0\Rightarrow\chi^2_B=0$: no se rechaza $H_0$ (no hay correlación que aprovechar).`,
      distractores: ["", "Eso sería |R|, no el estadístico.", "Crecería sin límite si |R| → 0 (correlación perfecta), no con la identidad.", "El coeficiente es positivo pero multiplica ln|I| = 0."],
      verifica: [{ que: "ln 1", js: "Math.log(1)", esperado: 0, tol: 0 }],
      fuente: [{ id: "C1", loc: "slides 27–29" }]
    },
    {
      id: "m02-q018", modulo: MOD, concepto: "m02-c04", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Se aplicó el test de Bartlett a cuatro variables de `mtcars` (n = 32) con α = 0,05. ¿Qué se concluye?",
      codigoR: `R <- cor(mtcars[, c("mpg", "disp", "hp", "wt")])
psych::cortest.bartlett(R, n = 32)`,
      salidaR: `$chisq
[1] 124.3817

$p.value
[1] 1.955473e-24

$df
[1] 6`,
      salidaDe: `R <- cor(mtcars[, c("mpg", "disp", "hp", "wt")])
print(psych::cortest.bartlett(R, n = 32))`,
      opciones: [
        "Se rechaza H0: R no es la identidad, hay correlación suficiente para PCA o análisis factorial",
        "No se rechaza H0: las variables no están correlacionadas",
        "Se rechaza H0: las variables son independientes",
        "El test no es concluyente porque el p-valor es demasiado pequeño"
      ],
      correcta: 0,
      explicacion: String.raw`$p\approx2\times10^{-24}<0{,}05\Rightarrow$ se rechaza $H_0:R=I$. Hay correlaciones y tiene sentido aplicar PCA o AF. (Los $6$ gl corresponden a $p(p-1)/2$ con $p=4$.)`,
      distractores: ["", "Un p-valor tan bajo lleva a rechazar, no a no rechazar.", "Rechazar H0 significa lo contrario: que NO son independientes (R ≠ I).", "Un p-valor pequeño es evidencia fuerte, no ambigüedad."],
      fuente: [{ id: "C1", loc: "slide 31" }]
    },
    {
      id: "m02-q019", modulo: MOD, concepto: "m02-c04", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Si el test de Bartlett no rechaza H0, se concluye que las variables son independientes entre sí.",
      correcta: false,
      explicacion: "No rechazar H0 solo significa que no hay evidencia suficiente de correlación (puede deberse, por ejemplo, a un n pequeño, como en la Ayudantía 1 con n = 10). No se demuestra independencia; además Bartlett detecta solo correlación lineal y supone normalidad multivariante.",
      fuente: [{ id: "C1", loc: "slides 29–30" }, { id: "C4.1", loc: "slide 18" }, { id: "AY1-E", loc: "Parte II, P3" }]
    },
    {
      id: "m02-q020", modulo: MOD, concepto: "m02-c04", tipo: "codigo-R", dificultad: 2, origen: "nueva",
      enunciado: "Un compañero calcula el estadístico de Bartlett a mano en R. ¿Qué error tiene su código?",
      codigoR: `Sigma <- matrix(c(16, 6, 8, 6, 9, 1, 8, 1, 25), 3, byrow = TRUE)
n <- 10; p <- 3
bart <- -(n - 1 - (2*p + 5)/6) * log(det(Sigma))`,
      opciones: [
        "Usa el determinante de la matriz de covarianza; debe usar el de la matriz de correlación (cov2cor(Sigma))",
        "Debería dividir por n en vez de n − 1",
        "log() debería ser log10()",
        "No hay error: Sigma y R dan el mismo determinante"
      ],
      correcta: 0,
      explicacion: String.raw`El test se define sobre $|R|$. Aquí $|\Sigma|=2204$ mientras que $|R|=0{,}6122$: el determinante de $\Sigma$ depende de las unidades de medida y daría un estadístico distinto (y sin sentido). Correcto: <code>det(cov2cor(Sigma))</code>.`,
      verifica: [{ que: "det(Sigma)", r: `Sigma <- matrix(c(16, 6, 8, 6, 9, 1, 8, 1, 25), 3, byrow = TRUE); cat(round(det(Sigma), 1))`, esperado: 2204, tol: 0.05 },
        { que: "det(R)", r: `Sigma <- matrix(c(16, 6, 8, 6, 9, 1, 8, 1, 25), 3, byrow = TRUE); cat(round(det(cov2cor(Sigma)), 4))`, esperado: 0.6122, tol: 0.00005 }],
      fuente: [{ id: "AY1-R", loc: "líneas 131–137" }, { id: "C1", loc: "slide 28" }]
    }
  ]);
})();
