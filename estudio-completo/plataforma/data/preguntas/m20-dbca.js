/* Banco de preguntas · M20 DBCA (P3) */
PLATAFORMA.registrar("pregunta", [
  {
    id: "m20-q001", modulo: "m20-dbca", concepto: "m20-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
    enunciado: "Se comparan 4 máquinas y cada una la maneja un operador distinto. ¿Cuál es el problema de ese diseño?",
    opciones: ["El efecto de la máquina queda confundido con el del operador", "Hay demasiados tratamientos", "No se puede calcular la media", "El operador deja de ser aleatorio"],
    correcta: 0,
    explicacion: "C7.3 s4: si el operador influye, un mal diseño confunde su efecto con el de la máquina. Solución: bloquear por operador.",
    fuente: [{ id: "C7.3", loc: "slide 4" }]
  },
  {
    id: "m20-q002", modulo: "m20-dbca", concepto: "m20-c02", tipo: "vf", dificultad: 1, origen: "curso",
    enunciado: "En un DBCA, el orden de las corridas se sortea sobre todas las unidades a la vez, igual que en un DCA.",
    correcta: false,
    explicacion: "C7.3 s7: la aleatorización se hace dentro de cada bloque, no de manera total como en el DCA, y no se aleatoriza de bloque a bloque.",
    fuente: [{ id: "C7.3", loc: "slide 7" }]
  },
  {
    id: "m20-q003", modulo: "m20-dbca", concepto: "m20-c02", tipo: "multiple", dificultad: 2, origen: "curso",
    enunciado: "¿Cuáles son supuestos o características del modelo DBCA visto en clases?",
    opciones: ["Errores independientes N(0, σ²)", "Modelo aditivo: sin interacción tratamiento × bloque", "En cada bloque se prueban todos los tratamientos", "Hay interacción tratamiento × bloque que se estima con el error", "Los bloques se ordenan al azar entre sí"],
    correcta: [0, 1, 2],
    explicacion: "C7.3 s7–8: completo, aleatorización dentro del bloque, errores N(0,σ²) independientes y modelo aditivo.",
    fuente: [{ id: "C7.3", loc: "slides 7–8" }]
  },
  {
    id: "m20-q004", modulo: "m20-dbca", concepto: "m20-c03", tipo: "calculo", dificultad: 2, origen: "variacion",
    base: [{ id: "C7.3", loc: "slides 10–12" }],
    enunciado: String.raw`DBCA con 3 tratamientos y 3 bloques. T1: $10, 12, 14$; T2: $12, 15, 15$; T3: $15, 17, 19$ (en cada fila, bloques 1, 2 y 3). Calcula $SC_{TRAT}$.`,
    respuesta: 38, tolerancia: 0.01,
    explicacion: String.raw`Totales $36, 42, 51$; $Y_{\cdot\cdot}=129$; $Y_{\cdot\cdot}^2/N=1849$. $SC_{TRAT}=(36^2+42^2+51^2)/3-1849=1887-1849=38$.`,
    verifica: [{ que: "SC_TRAT", js: "(36*36+42*42+51*51)/3-129*129/9", esperado: 38, tol: 1e-9 }],
    fuente: [{ id: "C7.3", loc: "slide 10" }]
  },
  {
    id: "m20-q005", modulo: "m20-dbca", concepto: "m20-c03", tipo: "calculo", dificultad: 3, origen: "variacion",
    base: [{ id: "C7.3", loc: "slides 10–12" }],
    enunciado: String.raw`Con los mismos datos (T1: $10,12,14$; T2: $12,15,15$; T3: $15,17,19$; bloques en columnas), calcula el $F_0$ de tratamientos del DBCA.`,
    respuesta: 57, tolerancia: 0.05,
    explicacion: String.raw`$SC_T=1909-1849=60$; totales de bloque $37, 44, 48$ ⇒ $SC_B=5609/3-1849=20{,}67$; $SC_E=60-38-20{,}67=1{,}33$ con $(2)(2)=4$ gl ⇒ $CME=0{,}333$. $F_0=19/0{,}333=57$.`,
    verifica: [
      { que: "F0", js: "(38/2)/((60-38-(37*37+44*44+48*48)/3+1849)/4)", esperado: 57, tol: 0.001 },
      { que: "F en R", r: `trat <- factor(rep(1:3, each = 3)); bl <- factor(rep(1:3, 3)); y <- c(10,12,14,12,15,15,15,17,19); cat(summary(aov(y ~ trat + bl))[[1]][1, 4])`, esperado: 57, tol: 0.001 }
    ],
    fuente: [{ id: "C7.3", loc: "slides 9–10" }]
  },
  {
    id: "m20-q006", modulo: "m20-dbca", concepto: "m20-c07", tipo: "interpretacion-R", dificultad: 2, origen: "variacion",
    base: [{ id: "C7.3", loc: "slides 16–17" }],
    enunciado: "Con los datos anteriores se ajustó el modelo sin bloque. Comparando con el DBCA (F = 57, p = 0,00115), ¿qué se concluye?",
    salidaR: `            Df Sum Sq Mean Sq F value Pr(>F)
trat         2     38  19.000   5.182 0.0493 *
Residuals    6     22   3.667
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1`,
    salidaDe: `trat <- factor(rep(c("T1", "T2", "T3"), each = 3))
y <- c(10, 12, 14, 12, 15, 15, 15, 17, 19)
summary(aov(y ~ trat))`,
    opciones: ["Sin bloque la SC del bloque pasa al error: el CME sube a 3,67 y el F cae a 5,18 (p = 0,049), apenas significativo; el bloqueo aumentó mucho la potencia", "Sin bloque el F sube, así que el bloqueo era innecesario", "Las dos tablas son equivalentes", "El DCA muestra que los tratamientos no difieren"],
    correcta: 0,
    explicacion: "Es el mismo razonamiento de C7.3 s17: SC_E = 1,33 + 20,67 = 22 con 6 gl.",
    fuente: [{ id: "C7.3", loc: "slide 17" }]
  },
  {
    id: "m20-q007", modulo: "m20-dbca", concepto: "m20-c04", tipo: "completar-R", dificultad: 1, origen: "curso",
    enunciado: "Completa el código del DBCA de métodos de ensamble (operador = bloque).",
    codigoR: `modelo <- aov(y ~ metodo ___ operador, data = datos)
summary(modelo)
library(agricolae)
lsd <- ___(modelo, "metodo"); lsd$groups`,
    huecos: [["+"], ["LSD.test"]],
    explicacion: "C7.3 s13: el bloque se suma (sin interacción) y LSD.test del paquete agricolae hace las comparaciones.",
    fuente: [{ id: "C7.3", loc: "slide 13" }, { id: "S7.3" }]
  },
  {
    id: "m20-q008", modulo: "m20-dbca", concepto: "m20-c04", tipo: "codigo-R", dificultad: 2, origen: "nueva",
    enunciado: "En el DBCA de ensamble (una observación por método y operador) alguien escribe esto. ¿Qué problema tiene?",
    codigoR: `modelo <- aov(y ~ metodo * operador, data = datos)
summary(modelo)`,
    opciones: ["Incluye la interacción método × operador: con una observación por celda no quedan gl para el error y el DBCA supone que no hay interacción", "Falta library(agricolae)", "operador debería ser numérico", "Nada: es el modelo correcto"],
    correcta: 0,
    explicacion: "El modelo del DBCA es aditivo: y ~ metodo + operador (C7.3 s8 y s13). Con 16 datos y 16 parámetros el error tendría 0 gl.",
    fuente: [{ id: "C7.3", loc: "slides 8 y 13" }]
  },
  {
    id: "m20-q009", modulo: "m20-dbca", concepto: "m20-c06", tipo: "calculo", dificultad: 2, origen: "variacion",
    base: [{ id: "C7.3", loc: "slide 15" }],
    enunciado: String.raw`DBCA con $k=3$ tratamientos y $b=5$ bloques, $CME=4$. Usando $t_{0{,}025;8}=2{,}306$, calcula la LSD.`,
    respuesta: 2.917, tolerancia: 0.005,
    explicacion: String.raw`gl del error $=(3-1)(5-1)=8$. $LSD=2{,}306\sqrt{2\cdot4/5}=2{,}306\cdot1{,}265=2{,}917$.`,
    verifica: [{ que: "LSD", r: `cat(round(qt(0.975, 8) * sqrt(2 * 4 / 5), 3))`, esperado: 2.917, tol: 0.0005 }],
    fuente: [{ id: "C7.3", loc: "slide 15" }]
  },
  {
    id: "m20-q010", modulo: "m20-dbca", concepto: "m20-c06", tipo: "alternativas", dificultad: 2, origen: "curso",
    enunciado: "¿Qué cambia en la fórmula de la LSD al pasar de un DCA a un DBCA?",
    opciones: ["Los gl del t pasan a (k−1)(b−1) y la raíz usa b (número de bloques) en vez de n", "Se usa el CM de bloques en vez del CME", "Se multiplica por el número de bloques", "Nada"],
    correcta: 0,
    explicacion: "C7.3 s15: LSD = t(α/2,(k−1)(b−1)) √(2·CME/b); b hace las veces de réplicas.",
    fuente: [{ id: "C7.3", loc: "slide 15" }]
  },
  {
    id: "m20-q011", modulo: "m20-dbca", concepto: "m20-c05", tipo: "vf", dificultad: 1, origen: "curso",
    enunciado: "Si el efecto del bloque no resulta significativo, es un argumento a favor de no controlar ese factor en futuros experimentos.",
    correcta: true,
    explicacion: "C7.3 s14: «Los bloques son iguales → argumento a favor de no controlar este factor en futuros experimentos».",
    fuente: [{ id: "C7.3", loc: "slide 14" }]
  },
  {
    id: "m20-q012", modulo: "m20-dbca", concepto: "m20-c05", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
    enunciado: "Salida de LSD.test para los operadores (bloques) del ejemplo de ensamble. ¿Qué se concluye?",
    salidaR: `      y groups
2 12.00      a
3 10.00     ab
4  9.75     ab
1  8.25      b`,
    salidaDe: `metodo   <- factor(rep(c("A", "B", "C", "D"), each = 4))
operador <- factor(rep(c(1, 2, 3, 4), times = 4))
y <- c(6, 9, 7, 8, 7, 10, 11, 8, 10, 16, 11, 14, 10, 13, 11, 9)
modelo <- aov(y ~ metodo + operador)
library(agricolae)
LSD.test(modelo, "operador")$groups`,
    opciones: ["Solo los operadores 1 y 2 difieren; los demás son iguales entre sí y con ellos", "Todos los operadores difieren", "Ningún operador difiere", "El operador 2 difiere de todos"],
    correcta: 0,
    explicacion: "1 (b) y 2 (a) no comparten letra; 3 y 4 (ab) comparten con ambos. Coincide con C7.3 s14.",
    fuente: [{ id: "C7.3", loc: "slide 14" }]
  },
  {
    id: "m20-q013", modulo: "m20-dbca", concepto: "m20-c07", tipo: "calculo", dificultad: 2, origen: "curso",
    enunciado: String.raw`Ejercicio de fertilizantes: $SC_{trat}=72$ (2 gl), $SC_{bloque}=60$ (3 gl), $SC_E=24$ (6 gl). Si NO se hubiera bloqueado, ¿cuál sería el $F_0$ del fertilizante?`,
    respuesta: 3.857, tolerancia: 0.01,
    explicacion: String.raw`Sin bloque: $SC_E=24+60=84$ con $6+3=9$ gl ⇒ $CME=9{,}33$. $F_0=36/9{,}33=3{,}86<F_{0{,}05;2,9}=4{,}26$: no se detectaría la diferencia.`,
    verifica: [{ que: "F DCA", js: "36/(84/9)", esperado: 3.857, tol: 0.001 }],
    fuente: [{ id: "C7.3", loc: "slide 17" }, { id: "PR-P3-Q1", loc: "h" }]
  },
  {
    id: "m20-q014", modulo: "m20-dbca", concepto: "m20-c03", tipo: "alternativas", dificultad: 1, origen: "curso",
    enunciado: "En la tabla ANOVA de un DBCA con k tratamientos y b bloques, ¿cuántos gl tiene el total?",
    opciones: ["kb − 1", "(k − 1)(b − 1)", "k + b − 1", "kb − k"],
    correcta: 0,
    explicacion: "N − 1 con N = k·b (C7.3 s9).",
    fuente: [{ id: "C7.3", loc: "slide 9" }]
  }
]);
