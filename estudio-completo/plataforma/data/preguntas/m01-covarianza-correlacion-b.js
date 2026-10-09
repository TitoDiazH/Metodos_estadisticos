/* ============================================================================
   Preguntas · M01 Covarianza, correlación y regresión simple (P1) — lote b
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m01-covarianza-correlacion";
  var AP = `x <- c(161, 170, 180, 175, 165, 187)
y <- c(50, 65, 78, 82, 60, 76)
`;

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m01-q013", modulo: MOD, concepto: "m01-c01", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Datos de la clase: altura $x=(161,170,180,175,165,187)$ cm y peso $y=(50,65,78,82,60,76)$ kg. La suma de los productos de desviaciones es $499$. ¿Cuánto vale la covarianza muestral?`,
      respuesta: 99.8, tolerancia: 0.05,
      explicacion: String.raw`$s_{xy}=\dfrac{499}{n-1}=\dfrac{499}{5}=99{,}8$ (cm·kg). Es la que entrega <code>cov(x, y)</code> en R.`,
      verifica: [{ que: "cov", r: AP + `cat(cov(x, y))`, esperado: 99.8, tol: 1e-9 }],
      fuente: [{ id: "C1", loc: "slides 10–14" }]
    },
    {
      id: "m01-q014", modulo: MOD, concepto: "m01-c01", tipo: "calculo", dificultad: 2, origen: "nueva",
      enunciado: String.raw`Si la altura de la pregunta anterior se midiera en <strong>metros</strong> en vez de centímetros, ¿cuánto valdría la covarianza con el peso?`,
      respuesta: 0.998, tolerancia: 0.002,
      explicacion: String.raw`La covarianza se divide por 100: $99{,}8/100=0{,}998$ (m·kg), aunque la relación entre altura y peso es la misma. Por eso su magnitud depende de las unidades y no sirve para comparar la fuerza de relaciones.`,
      verifica: [{ que: "cov en metros", r: AP + `cat(cov(x/100, y))`, esperado: 0.998, tol: 1e-9 }],
      fuente: [{ id: "C1", loc: "slides 10–14" }]
    },
    {
      id: "m01-q015", modulo: MOD, concepto: "m01-c01", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Matriz de covarianza de altura (x) y peso (y). ¿Qué representan los valores 93,2 y 151,1 de la diagonal y qué indica el signo de 99,8?",
      codigoR: `cov(data.frame(x, y))`,
      salidaR: `     x     y
x 93.2  99.8
y 99.8 151.1`,
      salidaDe: AP + `cov(data.frame(x, y))`,
      opciones: [
        "Son las varianzas de x e y; el signo positivo indica que tienden a aumentar juntas",
        "Son las correlaciones consigo mismas y el signo indica fuerza",
        "Son las desviaciones estándar y 99,8 es la correlación",
        "Son las medias de x e y"
      ],
      correcta: 0,
      explicacion: "En la diagonal están las varianzas (Var(X) = Cov(X, X)); fuera de ella, la covarianza (99,8 > 0: a mayor altura, mayor peso). La matriz es simétrica.",
      fuente: [{ id: "C1", loc: "slides 12–14" }]
    },
    {
      id: "m01-q016", modulo: MOD, concepto: "m01-c01", tipo: "vf", dificultad: 2, origen: "curso",
      enunciado: "Una covarianza igual a cero entre dos variables significa que no existe ninguna relación entre ellas.",
      correcta: false,
      explicacion: "Falso. Covarianza 0 indica que no se observa relación LINEAL; puede haber una relación no lineal. Ejemplo: x = (−2,−1,0,1,2) e y = x² tienen covarianza 0 y dependencia perfecta.",
      verifica: [{ que: "cov(x, x²)", r: `x <- c(-2,-1,0,1,2); cat(cov(x, x^2))`, esperado: 0, tol: 1e-12 }],
      fuente: [{ id: "C1", loc: "slides 12–14" }, { id: "PR-P1-Q1", loc: "afirmación 3" }]
    },
    {
      id: "m01-q017", modulo: MOD, concepto: "m01-c02", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Con $s_{xy}=99{,}8$, $s_x=9{,}654$ y $s_y=12{,}292$ (altura y peso), calcula el coeficiente de correlación $r$.`,
      respuesta: 0.841, tolerancia: 0.002,
      explicacion: String.raw`$r=\dfrac{s_{xy}}{s_xs_y}=\dfrac{99{,}8}{9{,}654\times12{,}292}=0{,}841$: relación lineal positiva y fuerte. No cambia si la altura se mide en metros.`,
      verifica: [{ que: "r", r: AP + `cat(round(cor(x, y), 4))`, esperado: 0.841, tol: 0.0006 }],
      fuente: [{ id: "C1", loc: "slides 15–16" }]
    },
    {
      id: "m01-q018", modulo: MOD, concepto: "m01-c02", tipo: "vf", dificultad: 1, origen: "nueva",
      enunciado: "Si se cambian las unidades de una variable (por ejemplo, de cm a m), el coeficiente de correlación cambia.",
      correcta: false,
      explicacion: "Falso. r es adimensional: al multiplicar una variable por una constante positiva, covarianza y desviación estándar cambian en la misma proporción y r queda igual (0,841 en ambos casos).",
      verifica: [{ que: "cor en metros", r: AP + `cat(round(cor(x/100, y) - cor(x, y), 12))`, esperado: 0, tol: 1e-9 }],
      fuente: [{ id: "C1", loc: "slides 15–16" }]
    },
    {
      id: "m01-q019", modulo: MOD, concepto: "m01-c02", tipo: "calculo", dificultad: 1, origen: "nueva",
      enunciado: String.raw`Para $x=(1,2,3,4,5)$ e $y=(2,4,6,8,10)$ (relación lineal perfecta creciente), ¿cuánto vale $r$?`,
      respuesta: 1, tolerancia: 0.001,
      explicacion: String.raw`$y=2x$ es una relación lineal exacta con pendiente positiva ⇒ $r=1$ (aunque la covarianza vale $5$, que no dice nada de la fuerza).`,
      verifica: [{ que: "r", r: `cat(cor(c(1,2,3,4,5), c(2,4,6,8,10)))`, esperado: 1, tol: 1e-9 }],
      fuente: [{ id: "C1", loc: "slides 15–16" }]
    },
    {
      id: "m01-q020", modulo: MOD, concepto: "m01-c02", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "La correlación entre las ventas de helados y los ahogamientos en piscinas es alta y positiva. ¿Qué se concluye?",
      opciones: [
        "Existe asociación lineal, pero no se puede afirmar causalidad (puede haber una tercera variable: el calor)",
        "Comer helados causa ahogamientos",
        "Los ahogamientos aumentan las ventas de helados",
        "Las variables son independientes"
      ],
      correcta: 0,
      explicacion: "Una correlación alta mide asociación lineal, no causalidad. Una variable común (temperatura) puede explicar ambas.",
      fuente: [{ id: "C1", loc: "slide 20" }]
    },
    {
      id: "m01-q021", modulo: MOD, concepto: "m01-c02", tipo: "calculo", dificultad: 3, origen: "nueva",
      enunciado: String.raw`Con $x=(1,2,3,4,10)$ e $y=(2,3,4,5,1)$ la correlación es $-0{,}447$. Si se elimina el último par (el valor atípico $(10,1)$), ¿cuánto vale la correlación de los 4 pares restantes?`,
      respuesta: 1, tolerancia: 0.001,
      explicacion: String.raw`Sin el outlier, $y=x+1$ para los 4 pares restantes ⇒ $r=1$. Un solo valor atípico cambió $r$ de $+1$ a $-0{,}447$: por eso antes de calcular $r$ hay que mirar la nube de puntos y detectar outliers.`,
      verifica: [
        { que: "r con outlier", r: `cat(round(cor(c(1,2,3,4,10), c(2,3,4,5,1)), 4))`, esperado: -0.4472, tol: 0.00005 },
        { que: "r sin outlier", r: `cat(cor(c(1,2,3,4), c(2,3,4,5)))`, esperado: 1, tol: 1e-9 }
      ],
      fuente: [{ id: "C1", loc: "slides 15–16" }]
    },
    {
      id: "m01-q022", modulo: MOD, concepto: "m01-c03", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "Al contrastar si existe correlación lineal, ¿sobre qué cantidad se plantean las hipótesis?",
      opciones: [
        "Sobre ρ, la correlación poblacional (H₀: ρ = 0)",
        "Sobre r, la correlación muestral",
        "Sobre la pendiente muestral de la recta",
        "Sobre la covarianza muestral"
      ],
      correcta: 0,
      explicacion: "r se calcula con los datos y se conoce; lo desconocido es ρ. Las hipótesis siempre van sobre parámetros poblacionales.",
      fuente: [{ id: "C1", loc: "slides 17–18" }]
    },
    {
      id: "m01-q023", modulo: MOD, concepto: "m01-c03", tipo: "multiple", dificultad: 2, origen: "nueva",
      enunciado: "¿Cuáles afirmaciones sobre correlación y regresión lineal simple son correctas?",
      opciones: [
        "La regresión representa la relación lineal con una recta; la correlación mide su fuerza",
        "r es muestral y ρ es poblacional",
        "Están relacionadas, pero no son lo mismo",
        "r y ρ son siempre iguales"
      ],
      correcta: [0, 1, 2],
      explicacion: "r se obtiene de la muestra y es solo una estimación de ρ; casi nunca coinciden exactamente.",
      fuente: [{ id: "C1", loc: "slides 17–18" }]
    },
    {
      id: "m01-q024", modulo: MOD, concepto: "m01-c04", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "AY1-E", loc: "Parte II, P2" }],
      enunciado: String.raw`Con $r=-0{,}5$ y $n=27$, calcula el estadístico $t=r\sqrt{(n-2)/(1-r^2)}$ para $H_0:\rho=0$.`,
      respuesta: -2.887, tolerancia: 0.005,
      explicacion: String.raw`$t=-0{,}5\sqrt{25/0{,}75}=-2{,}887$ con $25$ gl. El crítico bilateral ($5\,\%$) es $\pm2{,}060$: como $|t|>2{,}060$ (p-valor $=0{,}0079$) se rechaza $H_0$: hay correlación lineal negativa significativa.`,
      verifica: [
        { que: "t", js: "-0.5*Math.sqrt(25/(1-0.25))", esperado: -2.8868, tol: 0.0001 },
        { que: "crítico", r: `cat(round(qt(0.975, 25), 3))`, esperado: 2.06, tol: 0.0005 }
      ],
      fuente: [{ id: "C1", loc: "slide 19" }, { id: "AY1-E", loc: "Parte II, P2" }]
    },
    {
      id: "m01-q025", modulo: MOD, concepto: "m01-c04", tipo: "calculo", dificultad: 3, origen: "curso",
      enunciado: String.raw`Ayudantía 1: $r_{23}=1/15$ y $n=1000$. Calcula $t=r\sqrt{(n-2)/(1-r^2)}$ y compáralo con $t_{0{,}975;998}=1{,}962$.`,
      respuesta: 2.111, tolerancia: 0.005,
      explicacion: String.raw`$t=\dfrac1{15}\sqrt{\dfrac{998}{1-1/225}}=2{,}111>1{,}962$ ⇒ se rechaza $H_0$. Con $n=100$, el mismo $r=0{,}067$ da $t=0{,}66<1{,}984$ y no se rechaza: <strong>significativa no es lo mismo que fuerte</strong>, pues el p-valor depende de $n$.`,
      verifica: [
        { que: "t n=1000", js: "(1/15)*Math.sqrt(998/(1-1/225))", esperado: 2.1108, tol: 0.0001 },
        { que: "t n=100", js: "(1/15)*Math.sqrt(98/(1-1/225))", esperado: 0.6614, tol: 0.0001 }
      ],
      fuente: [{ id: "AY1-E", loc: "Parte II, P2" }, { id: "AY1-R", loc: "líneas 118–126" }]
    }
  ]);
})();
