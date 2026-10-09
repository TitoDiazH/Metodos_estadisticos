/* ============================================================================
   Preguntas · M05 Pruebas de hipótesis: marco general y una población (P1)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m05-hipotesis-una-poblacion";

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m05-q001", modulo: MOD, concepto: "m05-c01", tipo: "vf", dificultad: 2, origen: "curso",
      enunciado: "Si no se rechaza H₀, se concluye que H₀ es verdadera.",
      correcta: false,
      explicacion: "Falso. No rechazar H₀ significa que los datos no entregan evidencia suficiente en su contra; no la demuestra. Puede haberse cometido un error tipo II (no rechazar una H₀ falsa), por ejemplo con una muestra pequeña.",
      fuente: [{ id: "PR-P1-Q1", loc: "afirmación 4" }, { id: "C2", loc: "slide 4" }]
    },
    {
      id: "m05-q002", modulo: MOD, concepto: "m05-c01", tipo: "vf", dificultad: 2, origen: "curso",
      enunciado: "Al aumentar el tamaño de la muestra disminuye la probabilidad de cometer un error tipo I.",
      correcta: false,
      explicacion: "Falso. La probabilidad de error tipo I es α, el nivel de significancia que fija quien hace la prueba; no cambia con n. Lo que sí disminuye al aumentar n es la probabilidad de error tipo II (y aumenta la potencia).",
      fuente: [{ id: "PR-P1-Q1", loc: "afirmación 6" }, { id: "C2", loc: "slide 4" }]
    },
    {
      id: "m05-q003", modulo: MOD, concepto: "m05-c01", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: "Con α = 0,01 se obtiene un p-valor de 0,03. ¿Qué se concluye?",
      opciones: ["No se rechaza H₀", "Se rechaza H₀", "Se acepta H₁ con certeza", "Hay que repetir con α = 0,001"],
      correcta: 0,
      explicacion: "Regla de la clase: p-valor ≤ α ⇒ rechazar. Como 0,03 > 0,01, no se rechaza H₀ a ese nivel (sí se rechazaría con α = 0,05).",
      distractores: ["", "Habría que rechazar solo si p ≤ 0,01.", "Una prueba nunca da certeza.", "Cambiar α después de ver los datos no es válido."],
      fuente: [{ id: "C2", loc: "slides 4, 14" }]
    },
    {
      id: "m05-q004", modulo: MOD, concepto: "m05-c01", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "¿Qué es el p-valor?",
      opciones: [
        "La probabilidad de obtener un resultado tan extremo o más que el observado, suponiendo que H₀ es verdadera",
        "La probabilidad de que H₀ sea verdadera",
        "La probabilidad de que H₁ sea verdadera",
        "El nivel de significancia α elegido antes del estudio"
      ],
      correcta: 0,
      explicacion: "El p-valor se calcula suponiendo H₀ cierta. No es la probabilidad de que H₀ (o H₁) sea verdadera, ni es α (que se fija de antemano).",
      distractores: ["", "Se calcula asumiendo H₀ cierta; no es una probabilidad sobre H₀.", "Tampoco es una probabilidad sobre H₁.", "α se elige antes; el p-valor sale de los datos."],
      fuente: [{ id: "C2", loc: "slides 3–4" }]
    },
    {
      id: "m05-q005", modulo: MOD, concepto: "m05-c02", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C2", loc: "slides 5–6" }],
      enunciado: String.raw`Una muestra de $n=16$ tiene $\bar x=52$ y $s=8$. Para $H_0:\mu=50$ calcula el estadístico $t$.`,
      respuesta: 1, tolerancia: 0.005,
      explicacion: String.raw`$t=\dfrac{\bar x-\mu_0}{s/\sqrt n}=\dfrac{52-50}{8/4}=1{,}0$ con $n-1=15$ gl. El crítico bilateral con $\alpha=5\,\%$ es $t_{0{,}975;15}=2{,}131$: como $|1|<2{,}131$, no se rechaza $H_0$.`,
      verifica: [
        { que: "t", js: "(52-50)/(8/Math.sqrt(16))", esperado: 1, tol: 1e-9 },
        { que: "crítico", r: `cat(round(qt(0.975, 15), 3))`, esperado: 2.131, tol: 0.0005 }
      ],
      fuente: [{ id: "C2", loc: "slides 5–6" }]
    },
    {
      id: "m05-q006", modulo: MOD, concepto: "m05-c02", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: "En la salida de t.test() aparece «df = 24». ¿Cuántas observaciones tenía la muestra?",
      opciones: ["25", "24", "23", "26"],
      correcta: 0,
      explicacion: "En la prueba t de una muestra, gl = n − 1, entonces n = 25.",
      fuente: [{ id: "C2", loc: "slide 8" }]
    },
    {
      id: "m05-q007", modulo: MOD, concepto: "m05-c02", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Se probó H₀: μ = 10 contra H₁: μ ≠ 10 con α = 0,05 sobre una muestra. ¿Qué se concluye?",
      codigoR: `set.seed(123)
x <- rnorm(25, mean = 10.8, sd = 1.9)
t.test(x, mu = 10, alternative = "two.sided", conf.level = 0.95)`,
      salidaR: `
	One Sample t-test

data:  x
t = 2.0477, df = 24, p-value = 0.05169
alternative hypothesis: true mean is not equal to 10
95 percent confidence interval:
  9.994168 11.479177
sample estimates:
mean of x 
 10.73667 
`,
      salidaDe: `set.seed(123)
x <- rnorm(25, mean = 10.8, sd = 1.9)
t.test(x, mu = 10, alternative = "two.sided", conf.level = 0.95)`,
      opciones: [
        "No se rechaza H₀: p-valor 0,0517 > 0,05 y el IC (9,99; 11,48) contiene al 10",
        "Se rechaza H₀: la media muestral 10,74 es mayor que 10",
        "Se rechaza H₀: el estadístico t es mayor que 2",
        "Se acepta que μ = 10 con certeza"
      ],
      correcta: 0,
      explicacion: "p = 0,0517 > 0,05 ⇒ no se rechaza H₀ (caso límite). El IC al 95 % contiene μ₀ = 10, coherente con no rechazar. Que t sea 2,05 no basta: el crítico con 24 gl es 2,064, que no se supera.",
      distractores: ["", "La diferencia observada debe ser estadísticamente significativa, no solo positiva.", "El crítico bilateral con 24 gl es 2,064 > 2,048.", "No rechazar no equivale a aceptar con certeza."],
      verifica: [{ que: "crítico t(0,975; 24)", r: `cat(round(qt(0.975, 24), 3))`, esperado: 2.064, tol: 0.0005 }],
      fuente: [{ id: "C2", loc: "slide 8" }]
    },
    {
      id: "m05-q008", modulo: MOD, concepto: "m05-c02", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "Con los mismos datos de la salida anterior (p = 0,0517 bilateral) se repite la prueba con alternative = \"greater\". ¿Qué ocurre?",
      opciones: [
        "El p-valor se reduce a 0,0258 y ahora sí se rechaza H₀ con α = 0,05",
        "El p-valor sigue siendo 0,0517 y no se rechaza",
        "El p-valor aumenta a 0,974",
        "El p-valor queda igual, pero cambia el estadístico t"
      ],
      correcta: 0,
      explicacion: "Al ser la diferencia observada hacia la derecha (media 10,74 > 10), la unilateral derecha tiene la mitad del p-valor: 0,0258 < 0,05. Por eso la hipótesis alternativa se define ANTES de ver los datos.",
      verifica: [{ que: "p unilateral", r: `set.seed(123); x <- rnorm(25, 10.8, 1.9); cat(round(t.test(x, mu = 10, alternative = "greater")$p.value, 4))`, esperado: 0.0258, tol: 0.00005 }],
      fuente: [{ id: "C2", loc: "slides 7–8" }]
    },
    {
      id: "m05-q009", modulo: MOD, concepto: "m05-c02", tipo: "completar-R", dificultad: 1, origen: "curso",
      enunciado: "Completa para contrastar H₀: μ ≤ 721 contra H₁: μ > 721 con una prueba t.",
      codigoR: `___(x, mu = 721, alternative = "___")`,
      huecos: [["t.test"], ["greater"]],
      explicacion: String.raw`<code>t.test</code> para σ desconocida; la alternativa $\mu>721$ es de cola derecha: <code>"greater"</code> (<code>"less"</code> sería cola izquierda y <code>"two.sided"</code> bilateral).`,
      fuente: [{ id: "C2", loc: "slides 5–8" }]
    },
    {
      id: "m05-q010", modulo: MOD, concepto: "m05-c03", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Cuándo corresponde usar la prueba Z (en vez de la t) para una media?",
      opciones: [
        "Cuando la desviación estándar poblacional σ es conocida",
        "Cuando la muestra es pequeña",
        "Cuando se desconoce σ",
        "Siempre que hay una sola muestra"
      ],
      correcta: 0,
      explicacion: "σ conocida ⇒ Z (normal estándar); σ desconocida ⇒ t de Student con n − 1 gl.",
      distractores: ["", "El tamaño no decide: lo decide si σ se conoce.", "Eso corresponde a la t.", "Una muestra puede analizarse con t o Z según σ."],
      fuente: [{ id: "C2", loc: "slides 10–11" }]
    },
    {
      id: "m05-q011", modulo: MOD, concepto: "m05-c03", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C2", loc: "slide 11" }],
      enunciado: String.raw`Con $\sigma=10$ conocida, $n=25$ y $\bar x=103$, calcula el estadístico $z$ para $H_0:\mu=100$.`,
      respuesta: 1.5, tolerancia: 0.005,
      explicacion: String.raw`$z=\dfrac{103-100}{10/\sqrt{25}}=\dfrac{3}{2}=1{,}5$. Para $H_1:\mu>100$, el p-valor es $1-\Phi(1{,}5)=0{,}0668>0{,}05$ ⇒ no se rechaza.`,
      verifica: [
        { que: "z", js: "(103-100)/(10/Math.sqrt(25))", esperado: 1.5, tol: 1e-9 },
        { que: "p-valor", r: `cat(round(1 - pnorm(1.5), 4))`, esperado: 0.0668, tol: 0.00005 }
      ],
      fuente: [{ id: "C2", loc: "slides 10–11" }]
    },
    {
      id: "m05-q012", modulo: MOD, concepto: "m05-c03", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "AY2-E", loc: "P2(a)" }],
      enunciado: String.raw`La desviación del peso de un envase es $\sigma=0{,}02$ kg (conocida). Con $n=20$ y $\bar x=0{,}9915$ kg, calcula $z$ para $H_0:\mu=1$.`,
      respuesta: -1.9, tolerancia: 0.02,
      explicacion: String.raw`$z=\dfrac{0{,}9915-1}{0{,}02/\sqrt{20}}=\dfrac{-0{,}0085}{0{,}004472}=-1{,}90$. Bilateral: p-valor $=2\,\Phi(-1{,}90)=0{,}0574>0{,}05$ y $|z|<1{,}96$ ⇒ no se rechaza $H_0$.`,
      verifica: [
        { que: "z", js: "(0.9915-1)/(0.02/Math.sqrt(20))", esperado: -1.9, tol: 0.001 },
        { que: "p-valor", r: `cat(round(2 * pnorm(-1.9005), 4))`, esperado: 0.0574, tol: 0.0002 }
      ],
      fuente: [{ id: "AY2-E", loc: "P2(a)" }, { id: "C2", loc: "slides 10–11" }]
    },
    {
      id: "m05-q013", modulo: MOD, concepto: "m05-c03", tipo: "codigo-R", dificultad: 2, origen: "nueva",
      enunciado: "Se conoce σ = 2 y se quiere probar H₀: μ ≤ 10 contra H₁: μ > 10. ¿Qué error tiene este código?",
      codigoR: `library(BSDA)
z.test(x = x, mu = 10, alternative = "greater")`,
      opciones: [
        "Falta el argumento sigma.x = 2 (la desviación conocida)",
        "Debería usar t.test en lugar de z.test",
        "alternative debería ser \"two.sided\"",
        "Falta cargar el paquete psych"
      ],
      correcta: 0,
      explicacion: "z.test de BSDA necesita sigma.x, la desviación estándar poblacional conocida; sin ella no puede calcular z. El resto (mu, alternative) está bien.",
      fuente: [{ id: "C2", loc: "slide 11" }]
    },
    {
      id: "m05-q014", modulo: MOD, concepto: "m05-c04", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "Para la prueba Z de una proporción, ¿qué condición debe cumplirse?",
      opciones: ["n·p₀ ≥ 5 y n·(1 − p₀) ≥ 5", "n ≥ 30 solamente", "p₀ = 0,5", "σ conocida"],
      correcta: 0,
      explicacion: "La aproximación normal de la binomial requiere al menos 5 éxitos y 5 fracasos esperados bajo H₀: np₀ ≥ 5 y n(1 − p₀) ≥ 5. Si no se cumple, se usa el método exacto (binomial).",
      fuente: [{ id: "C2", loc: "slides 12, 39" }]
    },
    {
      id: "m05-q015", modulo: MOD, concepto: "m05-c04", tipo: "vf", dificultad: 2, origen: "variacion",
      base: [{ id: "C2", loc: "slide 12" }],
      enunciado: String.raw`Con $n=30$ y $H_0:p=0{,}10$ se cumple el requisito para usar la aproximación normal en la prueba de proporciones.`,
      correcta: false,
      explicacion: String.raw`Falso: $np_0=30\cdot0{,}10=3<5$ (aunque $n(1-p_0)=27\ge5$). Ambas condiciones deben cumplirse; aquí corresponde el método exacto.`,
      verifica: [{ que: "n·p0", js: "30*0.10", esperado: 3, tol: 1e-9 }],
      fuente: [{ id: "C2", loc: "slides 12, 39" }]
    },
    {
      id: "m05-q016", modulo: MOD, concepto: "m05-c04", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Ayudantía 2, P1: de $n=200$ parabrisas, $40$ son defectuosos. Para $H_0:p\le0{,}15$ calcula el estadístico $z$.`,
      respuesta: 1.98, tolerancia: 0.01,
      explicacion: String.raw`$\hat p=40/200=0{,}20$. $z=\dfrac{0{,}20-0{,}15}{\sqrt{0{,}15\cdot0{,}85/200}}=\dfrac{0{,}05}{0{,}02525}=1{,}98$. Con $H_1:p>0{,}15$ y $\alpha=5\,\%$, $1{,}98>1{,}64$ ⇒ se rechaza $H_0$. (En el denominador va $p_0$, no $\hat p$.)`,
      verifica: [{ que: "z", js: "(0.2-0.15)/Math.sqrt(0.15*0.85/200)", esperado: 1.9803, tol: 0.0001 }],
      fuente: [{ id: "AY2-E", loc: "P1" }]
    },
    {
      id: "m05-q017", modulo: MOD, concepto: "m05-c04", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "AY2-E", loc: "P1" }],
      enunciado: String.raw`Se observan $30$ éxitos en $n=100$ ensayos. Para $H_0:p\le0{,}25$ contra $H_1:p>0{,}25$, calcula $z$.`,
      respuesta: 1.155, tolerancia: 0.005,
      explicacion: String.raw`$\hat p=0{,}30$; $z=\dfrac{0{,}30-0{,}25}{\sqrt{0{,}25\cdot0{,}75/100}}=\dfrac{0{,}05}{0{,}0433}=1{,}155$. El p-valor (cola derecha) es $0{,}124>0{,}05$ ⇒ no se rechaza $H_0$.`,
      verifica: [
        { que: "z", js: "(0.3-0.25)/Math.sqrt(0.25*0.75/100)", esperado: 1.1547, tol: 0.0001 },
        { que: "p-valor", r: `cat(round(1 - pnorm((0.3-0.25)/sqrt(0.25*0.75/100)), 4))`, esperado: 0.1241, tol: 0.00005 }
      ],
      fuente: [{ id: "C2", loc: "slides 12–16" }]
    },
    {
      id: "m05-q018", modulo: MOD, concepto: "m05-c04", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "En una encuesta, 78 de 120 personas respondieron «sí». Se probó H₀: p ≤ 0,60 contra H₁: p > 0,60 con α = 0,05. ¿Qué se concluye?",
      codigoR: `prop.test(78, 120, 0.6, "greater", correct = FALSE)`,
      salidaR: `
	1-sample proportions test without continuity correction

data:  78 out of 120, null probability 0.6
X-squared = 1.25, df = 1, p-value = 0.1318
alternative hypothesis: true p is greater than 0.6
95 percent confidence interval:
 0.5757906 1.0000000
sample estimates:
   p 
0.65 
`,
      salidaDe: `prop.test(78, 120, 0.6, "greater", correct = FALSE)`,
      opciones: [
        "No se rechaza H₀: p-valor 0,1318 > 0,05; no hay evidencia de que la proporción supere 0,60",
        "Se rechaza H₀: la proporción muestral 0,65 supera 0,60",
        "Se rechaza H₀: X-squared = 1,25 es mayor que 1",
        "Se concluye que p = 0,65 exactamente"
      ],
      correcta: 0,
      explicacion: String.raw`$p\text{-valor}=0{,}1318>0{,}05$ ⇒ no se rechaza. El estadístico $X^2=1{,}25=z^2$ (con $z=1{,}118$). El IC unilateral $[0{,}576;\,1]$ incluye $0{,}60$. Una diferencia de $0{,}05$ en la muestra no alcanza a ser significativa con $n=120$.`,
      distractores: ["", "Que p̂ > p₀ no basta: hay que ver si es significativo.", "El estadístico se compara con el crítico de χ²(1) = 3,84, o se usa el p-valor.", "0,65 es solo la estimación puntual."],
      verifica: [{ que: "z² = X²", js: "((78/120-0.6)/Math.sqrt(0.6*0.4/120))**2", esperado: 1.25, tol: 0.0001 }],
      fuente: [{ id: "C2", loc: "slides 15–16" }]
    },
    {
      id: "m05-q019", modulo: MOD, concepto: "m05-c05", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`C2 s18: $n=24$ y $s^2=4{,}9$ para $H_0:\sigma^2\le4$ (la desviación sería a lo más $2$ min). Calcula el estadístico $\chi^2$.`,
      respuesta: 28.175, tolerancia: 0.01,
      explicacion: String.raw`$\chi^2=\dfrac{(n-1)s^2}{\sigma_0^2}=\dfrac{23\cdot4{,}9}{4}=28{,}175$ con $23$ gl. El crítico $\chi^2_{0{,}95;23}=35{,}172$ no se supera ⇒ no se rechaza $H_0$.`,
      verifica: [
        { que: "χ²", js: "23*4.9/4", esperado: 28.175, tol: 1e-9 },
        { que: "crítico", r: `cat(round(qchisq(0.95, 23), 3))`, esperado: 35.172, tol: 0.0005 }
      ],
      fuente: [{ id: "C2", loc: "slide 18" }]
    },
    {
      id: "m05-q020", modulo: MOD, concepto: "m05-c05", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C2", loc: "slide 18" }],
      enunciado: String.raw`Con $n=16$ y $s^2=9$, calcula el valor crítico $\chi^2_{0{,}95;15}$ y el estadístico para $H_0:\sigma^2\le4$. ¿Cuánto vale el <strong>estadístico</strong>?`,
      respuesta: 33.75, tolerancia: 0.01,
      explicacion: String.raw`$\chi^2=\dfrac{15\cdot9}{4}=33{,}75$. El crítico es $\chi^2_{0{,}95;15}=24{,}996$. Como $33{,}75>24{,}996$ se rechaza $H_0$ (p-valor $=0{,}0037$): hay evidencia de que $\sigma^2>4$.`,
      verifica: [
        { que: "χ²", js: "15*9/4", esperado: 33.75, tol: 1e-9 },
        { que: "crítico", r: `cat(round(qchisq(0.95, 15), 3))`, esperado: 24.996, tol: 0.0005 },
        { que: "p-valor", r: `cat(round(1 - pchisq(33.75, 15), 4))`, esperado: 0.0037, tol: 0.00005 }
      ],
      fuente: [{ id: "C2", loc: "slides 17–20" }]
    },
    {
      id: "m05-q021", modulo: MOD, concepto: "m05-c05", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "Se afirma que la desviación estándar de un tiempo es a lo más 2 minutos. ¿Qué hipótesis nula se plantea en la prueba de varianza?",
      opciones: ["σ² ≤ 4", "σ² ≤ 2", "σ² ≥ 4", "σ² = 2"],
      correcta: 0,
      explicacion: "La prueba χ² es sobre la varianza: σ ≤ 2 equivale a σ² ≤ 4. Por eso hay que elevar al cuadrado el valor de la desviación.",
      fuente: [{ id: "C2", loc: "slide 18" }]
    },
    {
      id: "m05-q022", modulo: MOD, concepto: "m05-c05", tipo: "completar-R", dificultad: 2, origen: "curso",
      enunciado: "R no tiene una función específica para probar una varianza. Completa el cálculo manual.",
      codigoR: `n <- length(x); s2 <- var(x)
chi_obs  <- (n - 1) * s2 / 4
chi_crit <- ___(0.95, df = n - 1)
p_value  <- 1 - ___(chi_obs, df = n - 1)`,
      huecos: [["qchisq"], ["pchisq"]],
      explicacion: String.raw`<code>qchisq</code> da el valor crítico (cuantil) y <code>pchisq</code> la probabilidad acumulada; el p-valor de cola derecha es $1-\texttt{pchisq}$.`,
      fuente: [{ id: "C2", loc: "slide 20" }]
    },
    {
      id: "m05-q023", modulo: MOD, concepto: "m05-c02", tipo: "multiple", dificultad: 2, origen: "nueva",
      enunciado: "En una prueba bilateral para una media con σ desconocida, ¿cuáles de estas decisiones son coherentes entre sí?",
      opciones: [
        "p-valor 0,03 con α = 0,05 y un IC al 95 % que no contiene a μ₀",
        "p-valor 0,20 con α = 0,05 y un IC al 95 % que contiene a μ₀",
        "p-valor 0,03 con α = 0,05 y un IC al 95 % que contiene a μ₀",
        "p-valor 0,20 con α = 0,05 y un IC al 95 % que no contiene a μ₀"
      ],
      correcta: [0, 1],
      explicacion: "En una prueba bilateral, el IC al 1 − α contiene a μ₀ exactamente cuando el p-valor es mayor que α. Las dos primeras son coherentes; las otras dos se contradicen.",
      fuente: [{ id: "C2", loc: "slide 8" }]
    }
  ]);
})();
