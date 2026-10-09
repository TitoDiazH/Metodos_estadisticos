/* ============================================================================
   Preguntas · M04 Escalamiento, distancias y similitud (P1)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m04-escalamiento-distancias";

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m04-q001", modulo: MOD, concepto: "m04-c01", tipo: "multiple", dificultad: 1, origen: "curso",
      enunciado: "¿En cuáles de estas situaciones se recomienda escalar las variables?",
      opciones: [
        "Las variables están en unidades distintas",
        "Se van a calcular distancias entre observaciones",
        "Se va a aplicar PCA o clustering",
        "Hay una sola variable y no se hará ningún análisis posterior"
      ],
      correcta: [0, 1, 2],
      explicacion: "C1 s40: escalar cuando las unidades difieren, cuando se usan distancias y antes de PCA o clustering. Con una sola variable y sin análisis posterior no hay nada que comparar.",
      fuente: [{ id: "C1", loc: "slide 40" }, { id: "AY5-E", loc: "P1" }]
    },
    {
      id: "m04-q002", modulo: MOD, concepto: "m04-c01", tipo: "calculo", dificultad: 2, origen: "nueva",
      enunciado: String.raw`Dos personas tienen (edad en años, ingreso en pesos): $A=(30;\,500\,000)$ y $B=(40;\,510\,000)$. Calcula la distancia euclídea <strong>sin estandarizar</strong> (redondea al entero más cercano).`,
      respuesta: 10000, tolerancia: 1,
      explicacion: String.raw`$d=\sqrt{10^2+10\,000^2}=\sqrt{100\,000\,100}\approx10\,000$. La diferencia de $10$ años casi no aporta: el ingreso, por tener números enormes, domina la distancia. Por eso se estandariza antes de medir distancias.`,
      verifica: [{ que: "distancia", js: "dist([30,500000],[40,510000])", esperado: 10000.005, tol: 0.01 }],
      fuente: [{ id: "C1", loc: "slides 40, 46" }]
    },
    {
      id: "m04-q003", modulo: MOD, concepto: "m04-c01", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Estandarizar siempre mejora el análisis, sin importar el método posterior ni la presencia de outliers.",
      correcta: false,
      explicacion: "Falso. La elección del escalamiento depende del análisis posterior y de los outliers (C1 s45): con outliers conviene el robusto; si importa la dirección, L2; y si las variables ya están en la misma escala, quizás no haga falta.",
      fuente: [{ id: "C1", loc: "slide 45" }]
    },
    {
      id: "m04-q004", modulo: MOD, concepto: "m04-c02", tipo: "calculo", dificultad: 1, origen: "variacion",
      base: [{ id: "C1", loc: "slide 41" }],
      enunciado: String.raw`Con $x=(4,8,12,20)$, normaliza min–max el dato $8$.`,
      respuesta: 0.25, tolerancia: 0.005,
      explicacion: String.raw`$w=\dfrac{8-4}{20-4}=\dfrac{4}{16}=0{,}25$.`,
      verifica: [{ que: "w", js: "(8-4)/(20-4)", esperado: 0.25, tol: 1e-9 }],
      fuente: [{ id: "C1", loc: "slide 41" }]
    },
    {
      id: "m04-q005", modulo: MOD, concepto: "m04-c02", tipo: "calculo", dificultad: 2, origen: "curso",
      base: [{ id: "PR-P2-Q12", loc: "pregunta 1d" }],
      enunciado: String.raw`El ingreso de unos clientes varía entre $\min=1\,000$ y $\max=5\,000$ y se normalizó con min–max. Un centroide tiene ingreso normalizado $0{,}6$. ¿A cuánto ingreso original corresponde?`,
      respuesta: 3400, tolerancia: 0.5,
      explicacion: String.raw`Inversa: $x=w\,(x_{\max}-x_{\min})+x_{\min}=0{,}6\cdot4\,000+1\,000=3\,400$.`,
      verifica: [{ que: "inversa", js: "0.6*(5000-1000)+1000", esperado: 3400, tol: 1e-9 }],
      fuente: [{ id: "PR-P2-Q12", loc: "pregunta 1d" }, { id: "C1", loc: "slide 41" }]
    },
    {
      id: "m04-q006", modulo: MOD, concepto: "m04-c02", tipo: "vf", dificultad: 2, origen: "curso",
      enunciado: "La normalización min–max deja los datos con media 0 y varianza 1.",
      correcta: false,
      explicacion: String.raw`Falso. Min–max deja los datos en $[0,1]$ (mínimo $0$, máximo $1$) pero su media y varianza dependen de los datos. La que deja media $0$ y varianza $1$ es la estandarización z-score. Ejemplo: $x=(1,5,2,8,4)$ queda $(0;\,0{,}571;\,0{,}143;\,1;\,0{,}429)$, con media $0{,}429$.`,
      verifica: [{ que: "media tras min–max", r: `x <- c(1,5,2,8,4); cat(round(mean((x-min(x))/(max(x)-min(x))), 4))`, esperado: 0.4286, tol: 0.00005 }],
      fuente: [{ id: "PR-P1-Q1", loc: "afirmación 5" }, { id: "C1", loc: "slides 41–42" }]
    },
    {
      id: "m04-q007", modulo: MOD, concepto: "m04-c03", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C1", loc: "slide 42" }],
      enunciado: String.raw`Estandariza el dato $10$ del vector $x=(2,4,6,8,10)$ con z-score (usa $s$ muestral, divisor $n-1$).`,
      respuesta: 1.265, tolerancia: 0.005,
      explicacion: String.raw`$\bar x=6$, $s=\sqrt{10}=3{,}162$. $z=\dfrac{10-6}{3{,}162}=1{,}265$. Es lo que entrega <code>scale(x)</code>.`,
      verifica: [{ que: "z(10)", r: `cat(round(scale(c(2,4,6,8,10))[5,1], 4))`, esperado: 1.2649, tol: 0.00005 }],
      fuente: [{ id: "C1", loc: "slide 42" }]
    },
    {
      id: "m04-q008", modulo: MOD, concepto: "m04-c03", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: String.raw`Tras aplicar <code>scale(x)</code> a un vector, ¿qué media y desviación estándar tiene el resultado?`,
      opciones: ["Media 0 y desviación 1", "Mínimo 0 y máximo 1", "Mediana 0 e IQR 1", "Media 1 y desviación 0"],
      correcta: 0,
      explicacion: String.raw`<code>scale()</code> resta la media y divide por la desviación estándar muestral: $z=(x-\bar x)/s$.`,
      distractores: ["", "Eso es min–max.", "Eso es el escalamiento robusto.", "Al revés."],
      fuente: [{ id: "C1", loc: "slide 42" }]
    },
    {
      id: "m04-q009", modulo: MOD, concepto: "m04-c03", tipo: "completar-R", dificultad: 1, origen: "curso",
      enunciado: "Completa el código para estandarizar con z-score a mano y con la función de R.",
      codigoR: `x <- c(10, 12, 15, 20, 25)
z <- (x - ___(x)) / ___(x)
___(x)[, 1]`,
      huecos: [["mean"], ["sd"], ["scale"]],
      explicacion: String.raw`$z=(x-\bar x)/s$: <code>mean()</code> y <code>sd()</code>; <code>scale()</code> lo hace de una vez (devuelve una matriz, por eso <code>[, 1]</code>).`,
      fuente: [{ id: "C1", loc: "slide 42" }]
    },
    {
      id: "m04-q010", modulo: MOD, concepto: "m04-c04", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "Un conjunto de datos tiene varios valores extremos (outliers). ¿Qué escalamiento es menos sensible a ellos?",
      opciones: [
        "Robusto: (x − mediana) / IQR",
        "Z-score: (x − media) / desviación",
        "Min–max",
        "Todos se afectan por igual"
      ],
      correcta: 0,
      explicacion: "La mediana y el IQR casi no cambian con valores extremos; la media, la desviación, el mínimo y el máximo sí.",
      distractores: ["", "La media y la desviación se distorsionan con outliers.", "El máximo (o mínimo) extremo comprime al resto de los datos.", "El robusto precisamente no se ve afectado."],
      fuente: [{ id: "C1", loc: "slides 43, 45" }, { id: "PR-P1-Q3", loc: "pregunta (b)" }]
    },
    {
      id: "m04-q011", modulo: MOD, concepto: "m04-c04", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C1", loc: "slide 43" }],
      enunciado: String.raw`Con $x=(5,7,9,11,60)$ la mediana es $9$ y el IQR es $4$. Calcula el valor del dato $60$ con el escalamiento robusto.`,
      respuesta: 12.75, tolerancia: 0.01,
      explicacion: String.raw`$w=\dfrac{60-9}{4}=12{,}75$. Los otros cuatro datos quedan en $-1;\,-0{,}5;\,0;\,0{,}5$: el outlier se ve como tal sin haber deformado la escala del resto.`,
      verifica: [{ que: "w(60)", r: `x <- c(5,7,9,11,60); cat((60-median(x))/IQR(x))`, esperado: 12.75, tol: 1e-9 }],
      fuente: [{ id: "C1", loc: "slide 43" }]
    },
    {
      id: "m04-q012", modulo: MOD, concepto: "m04-c04", tipo: "calculo", dificultad: 1, origen: "nueva",
      enunciado: String.raw`Normaliza con L2 el vector $x=(3,4)$: ¿cuánto vale la segunda componente?`,
      respuesta: 0.8, tolerancia: 0.005,
      explicacion: String.raw`$\lVert x\rVert_2=\sqrt{9+16}=5$, así que $w=(3/5,\,4/5)=(0{,}6;\,0{,}8)$. El vector resultante tiene largo $1$.`,
      verifica: [{ que: "w2", js: "4/Math.sqrt(3*3+4*4)", esperado: 0.8, tol: 1e-9 }],
      fuente: [{ id: "C1", loc: "slide 44" }]
    },
    {
      id: "m04-q013", modulo: MOD, concepto: "m04-c05", tipo: "calculo", dificultad: 1, origen: "variacion",
      base: [{ id: "C1", loc: "slide 47" }],
      enunciado: String.raw`Para $A=(1,2,3)$ y $B=(4,6,3)$ calcula la distancia <strong>Manhattan</strong>.`,
      respuesta: 7, tolerancia: 0.01,
      explicacion: String.raw`$|1-4|+|2-6|+|3-3|=3+4+0=7$. (La euclídea sería $\sqrt{9+16+0}=5$.)`,
      verifica: [{ que: "Manhattan", js: "manhattan([1,2,3],[4,6,3])", esperado: 7, tol: 1e-9 }, { que: "Euclídea", js: "dist([1,2,3],[4,6,3])", esperado: 5, tol: 1e-9 }],
      fuente: [{ id: "C1", loc: "slide 47" }]
    },
    {
      id: "m04-q014", modulo: MOD, concepto: "m04-c05", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: "¿Cómo se calcula la distancia de Manhattan entre dos observaciones?",
      opciones: [
        "Sumando las diferencias absolutas en cada variable",
        "Con la raíz de la suma de las diferencias al cuadrado",
        "Con el máximo de las diferencias",
        "Con el ángulo entre los vectores"
      ],
      correcta: 0,
      explicacion: String.raw`$d_M=\sum_j|a_j-b_j|$. La segunda opción es la euclídea; la tercera, Chebyshev; la cuarta, el coseno.`,
      fuente: [{ id: "C1", loc: "slides 46–47" }]
    },
    {
      id: "m04-q015", modulo: MOD, concepto: "m04-c05", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Se calcularon las distancias entre tres clientes (variables ya estandarizadas). ¿Cuáles son los dos clientes más parecidos?",
      codigoR: `dist(datos_z)`,
      salidaR: `         1        2
2 1.109400         
3 2.773501 1.754116`,
      salidaDe: `datos_z <- scale(rbind(c(30, 500000), c(40, 510000), c(50, 540000)))
dist(datos_z)`,
      opciones: ["Los clientes 1 y 2 (distancia 1,11)", "Los clientes 2 y 3 (distancia 1,75)", "Los clientes 1 y 3 (distancia 2,77)", "Los tres son igual de parecidos"],
      correcta: 0,
      explicacion: "Menor distancia = mayor parecido. La menor es d(1,2) = 1,11; la mayor, d(1,3) = 2,77.",
      distractores: ["", "1,75 es la distancia intermedia.", "Es la mayor: son los más distintos.", "Las distancias son distintas."],
      fuente: [{ id: "C1", loc: "slides 46–47" }]
    },
    {
      id: "m04-q016", modulo: MOD, concepto: "m04-c06", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C1", loc: "slide 49" }],
      enunciado: String.raw`Calcula el coseno <strong>sin centrar</strong> entre $a=(1,2,3)$ y $b=(11,12,13)$. (Su correlación es $1$.)`,
      respuesta: 0.9493, tolerancia: 0.002,
      explicacion: String.raw`$\cos\theta=\dfrac{a\cdot b}{\lVert a\rVert\lVert b\rVert}=\dfrac{74}{\sqrt{14}\sqrt{434}}=0{,}9493$. Aunque la correlación es exactamente $1$ (relación lineal perfecta), el coseno sin centrar es menor que $1$: solo coinciden cuando se centran los vectores.`,
      verifica: [
        { que: "coseno", r: `a <- c(1,2,3); b <- c(11,12,13); cat(round(sum(a*b)/sqrt(sum(a^2)*sum(b^2)), 4))`, esperado: 0.9493, tol: 0.00005 },
        { que: "correlación", js: "cor([1,2,3],[11,12,13])", esperado: 1, tol: 1e-9 }
      ],
      fuente: [{ id: "C1", loc: "slides 48–49" }]
    },
    {
      id: "m04-q017", modulo: MOD, concepto: "m04-c06", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "La correlación de Pearson entre dos vectores es igual al coseno de los vectores originales (sin centrar).",
      correcta: false,
      explicacion: "Falso: la correlación es el coseno de los vectores CENTRADOS (se les resta la media). Sin centrar pueden dar valores distintos, como en a = (1,2,3), b = (11,12,13): cor = 1 y coseno = 0,949.",
      fuente: [{ id: "C1", loc: "slide 49" }]
    },
    {
      id: "m04-q018", modulo: MOD, concepto: "m04-c06", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "Se quiere comparar dos documentos por la proporción relativa de palabras, sin importar cuán largos son. ¿Qué medida es la más apropiada?",
      opciones: [
        "Similitud coseno, que compara la dirección de los vectores",
        "Distancia euclídea sin normalizar",
        "La media de cada documento",
        "Distancia de Manhattan sin normalizar"
      ],
      correcta: 0,
      explicacion: "El coseno mide similitud angular: dos vectores proporcionales (mismo patrón, distinto largo) tienen coseno 1. Las distancias sin normalizar penalizarían la diferencia de magnitud.",
      fuente: [{ id: "C1", loc: "slides 44, 48" }]
    }
  ]);
})();
