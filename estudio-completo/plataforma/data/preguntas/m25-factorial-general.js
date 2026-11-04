/* Banco de preguntas · M25 Factorial general (P3) */
PLATAFORMA.registrar("pregunta", [
  {
    id: "m25-q001", modulo: "m25-factorial-general", concepto: "m25-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
    enunciado: "¿Cuál es uno de los objetivos más importantes de un diseño factorial?",
    opciones: ["Determinar la combinación de niveles de los factores en que el desempeño del proceso es mejor", "Eliminar un factor perturbador", "Estudiar un solo factor con más réplicas", "Evitar la aleatorización"],
    correcta: 0,
    explicacion: "C7.3 s19.",
    fuente: [{ id: "C7.3", loc: "slide 19" }]
  },
  {
    id: "m25-q002", modulo: "m25-factorial-general", concepto: "m25-c02", tipo: "calculo", dificultad: 1, origen: "variacion",
    base: [{ id: "C7.3", loc: "slide 20" }],
    enunciado: String.raw`Factorial 2² sin réplicas: $(A-,B-)=20$, $(A+,B-)=30$, $(A-,B+)=25$, $(A+,B+)=45$. Calcula el efecto principal de A.`,
    respuesta: 15, tolerancia: 0.01,
    explicacion: String.raw`$\dfrac{30+45}{2}-\dfrac{20+25}{2}=37{,}5-22{,}5=15$.`,
    verifica: [{ que: "efecto A", js: "(30+45)/2-(20+25)/2", esperado: 15, tol: 1e-9 }],
    fuente: [{ id: "C7.3", loc: "slide 20" }]
  },
  {
    id: "m25-q003", modulo: "m25-factorial-general", concepto: "m25-c03", tipo: "calculo", dificultad: 2, origen: "variacion",
    base: [{ id: "C7.3", loc: "slides 21–22" }],
    enunciado: String.raw`Con los mismos datos ($20, 30, 25, 45$ para $(--), (+-), (-+), (++)$), calcula el efecto de interacción AB.`,
    respuesta: 5, tolerancia: 0.01,
    explicacion: String.raw`$AB=\dfrac{20+45}{2}-\dfrac{30+25}{2}=32{,}5-27{,}5=5$. Equivale a la mitad de la diferencia entre el efecto de A con B alto ($20$) y con B bajo ($10$).`,
    verifica: [{ que: "AB", js: "(20+45)/2-(30+25)/2", esperado: 5, tol: 1e-9 }],
    fuente: [{ id: "C7.3", loc: "slides 21–22" }]
  },
  {
    id: "m25-q004", modulo: "m25-factorial-general", concepto: "m25-c03", tipo: "alternativas", dificultad: 1, origen: "curso",
    enunciado: "En el ejemplo levadura/temperatura, el efecto de A es 13 con B bajo y −18 con B alto. ¿Qué indica?",
    opciones: ["Que A y B interactúan: la mejor elección de A depende del nivel de B", "Que A no tiene efecto", "Que B no tiene efecto", "Que hay un error de cálculo"],
    correcta: 0,
    explicacion: "C7.3 s21.",
    fuente: [{ id: "C7.3", loc: "slide 21" }]
  },
  {
    id: "m25-q005", modulo: "m25-factorial-general", concepto: "m25-c04", tipo: "calculo", dificultad: 1, origen: "nueva",
    enunciado: String.raw`Un factorial $3\times4$ se corre con $n=2$ réplicas. ¿Cuántos grados de libertad tiene el error?`,
    respuesta: 12, tolerancia: 0,
    explicacion: String.raw`$ab(n-1)=12\cdot1=12$.`,
    verifica: [{ que: "gl error", js: "3*4*(2-1)", esperado: 12, tol: 0 }],
    fuente: [{ id: "C7.3", loc: "slide 26" }]
  },
  {
    id: "m25-q006", modulo: "m25-factorial-general", concepto: "m25-c04", tipo: "vf", dificultad: 1, origen: "curso",
    enunciado: "En un factorial a × b con una sola réplica se pueden estimar el error y la interacción AB a la vez.",
    correcta: false,
    explicacion: "C7.3 s26: el error tiene ab(n−1) gl; con n = 1 son 0. Se necesitan al menos 2 réplicas para construir la tabla ANOVA.",
    fuente: [{ id: "C7.3", loc: "slide 26" }]
  },
  {
    id: "m25-q007", modulo: "m25-factorial-general", concepto: "m25-c04", tipo: "calculo", dificultad: 2, origen: "nueva",
    enunciado: String.raw`Factorial $3\times2$ con $n=2$. Totales de A: $40, 52, 60$; gran total $152$. Calcula $SC_A$.`,
    respuesta: 50.667, tolerancia: 0.01,
    explicacion: String.raw`Cada total de A suma $bn=4$ datos; $N=12$. $SC_A=(40^2+52^2+60^2)/4-152^2/12=1976-1925{,}33=50{,}67$.`,
    verifica: [{ que: "SC_A", js: "(40*40+52*52+60*60)/4-152*152/12", esperado: 50.667, tol: 0.001 }],
    fuente: [{ id: "C7.3", loc: "slide 26" }]
  },
  {
    id: "m25-q008", modulo: "m25-factorial-general", concepto: "m25-c07", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
    enunciado: "ANOVA del factorial 3 × 2 × 2 (sedimentación; se quiere minimizar). ¿Qué lectura es correcta?",
    salidaR: `            Df Sum Sq Mean Sq F value   Pr(>F)
A            2     14       7   0.494   0.6126
B            1    480     480  34.253 2.16e-07 ***
C            1   6087    6087 433.905  < 2e-16 ***
A:B          2    788     394  28.096 2.45e-09 ***
A:C          2     41      20   1.456   0.2412
B:C          1     57      57   4.055   0.0485 *
A:B:C        2     31      16   1.106   0.3375
Residuals   60    842      14
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1`,
    salidaDe: `celdas <- list(c(60,75,75,86,70,70), c(67,73,73,67,68,68), c(62,68,65,76,65,65), c(71,80,80,72,80,80), c(76,71,75,70,68,73), c(75,75,75,75,75,77),
  c(55,53,53,55,55,55), c(52,52,57,52,54,54), c(44,44,45,48,48,45), c(60,60,60,67,67,65), c(52,51,50,52,48,54), c(56,55,57,59,50,55))
A <- factor(rep(rep(c("A1","A1","A2","A2","A3","A3"), 2), each = 6))
B <- factor(rep(rep(c("B1","B2"), 6), each = 6))
C <- factor(rep(c("C1","C2"), each = 36))
Y <- unlist(celdas)
summary(aov(Y ~ A * B * C))`,
    opciones: ["Influyen B, C, AB y (en menor medida) BC; A, AC y ABC pueden enviarse al error, pero el nivel de A igual importa por la interacción AB", "A no es significativo, así que da lo mismo qué suspensión se use", "Solo C importa", "Todos los efectos son significativos"],
    correcta: 0,
    explicacion: "C7.3 s35–36: la mejor combinación es suspensión intermedia y abertura baja (interacción AB).",
    fuente: [{ id: "C7.3", loc: "slides 35–36" }]
  },
  {
    id: "m25-q009", modulo: "m25-factorial-general", concepto: "m25-c07", tipo: "completar-R", dificultad: 1, origen: "curso",
    enunciado: "Completa para ajustar el factorial con los tres efectos principales y todas sus interacciones.",
    codigoR: `summary(aov(Y ~ A ___ B ___ C))`,
    huecos: [["*"], ["*"]],
    explicacion: "El operador * genera A + B + C + A:B + A:C + B:C + A:B:C (C7.3 s35; C7.4 s10).",
    fuente: [{ id: "C7.3", loc: "slide 35" }]
  },
  {
    id: "m25-q010", modulo: "m25-factorial-general", concepto: "m25-c06", tipo: "calculo", dificultad: 2, origen: "curso",
    enunciado: String.raw`Acabado de metal (4 × 3, $n=3$): $CME=28{,}72$ con 24 gl. Calcula la LSD para comparar las medias marginales de la profundidad (A), sin considerar la interacción.`,
    respuesta: 5.214, tolerancia: 0.005,
    explicacion: String.raw`$r=bn=9$. $LSD=t_{0{,}025;24}\sqrt{2\cdot28{,}72/9}=2{,}064\cdot2{,}526=5{,}21$. A1–A2 $=5{,}0<5{,}21$: no difieren.`,
    verifica: [{ que: "LSD A", r: `cat(round(qt(0.975, 24) * sqrt(2 * 28.72 / 9), 3))`, esperado: 5.214, tol: 0.0005 }],
    fuente: [{ id: "C7.3", loc: "slide 30" }]
  },
  {
    id: "m25-q011", modulo: "m25-factorial-general", concepto: "m25-c06", tipo: "alternativas", dificultad: 2, origen: "curso",
    enunciado: "La interacción AB es significativa. ¿Cómo deben hacerse las comparaciones LSD?",
    opciones: ["Comparando medias de tratamientos dentro de cada nivel del otro factor, con r = n", "Solo con las medias marginales de A y B", "No se pueden hacer comparaciones", "Usando el CM de la interacción en vez del CME"],
    correcta: 0,
    explicacion: "C7.3 s31: las comparaciones cambian según el nivel del otro factor.",
    fuente: [{ id: "C7.3", loc: "slide 31" }]
  },
  {
    id: "m25-q012", modulo: "m25-factorial-general", concepto: "m25-c05", tipo: "vf", dificultad: 1, origen: "curso",
    enunciado: "En la gráfica de interacción del ejemplo 4 × 3, aparecen tantas líneas como niveles tenga el factor dibujado «arriba» (el de las líneas).",
    correcta: true,
    explicacion: "C7.3 s29.",
    fuente: [{ id: "C7.3", loc: "slide 29" }]
  },
  {
    id: "m25-q013", modulo: "m25-factorial-general", concepto: "m25-c08", tipo: "alternativas", dificultad: 1, origen: "curso",
    enunciado: "¿Qué motiva el principio de escasez de efectos?",
    opciones: ["El uso de diseños fraccionados 2^(k−p), porque las interacciones de orden alto suelen ser despreciables", "Agregar más réplicas", "Eliminar los efectos principales", "Usar solo un factor"],
    correcta: 0,
    explicacion: "C7.3 s37.",
    fuente: [{ id: "C7.3", loc: "slide 37" }]
  },
  {
    id: "m25-q014", modulo: "m25-factorial-general", concepto: "m25-c07", tipo: "calculo", dificultad: 1, origen: "nueva",
    enunciado: String.raw`Factorial $2\times2\times3$ con $n=3$ réplicas (como el Proyecto 3). ¿Cuántos gl tiene la interacción triple?`,
    respuesta: 2, tolerancia: 0,
    explicacion: String.raw`$(a-1)(b-1)(c-1)=1\cdot1\cdot2=2$. El error tiene $abc(n-1)=24$.`,
    verifica: [{ que: "gl ABC", js: "1*1*2", esperado: 2, tol: 0 }],
    fuente: [{ id: "C7.3", loc: "slide 35" }, { id: "PC3" }]
  }
]);
