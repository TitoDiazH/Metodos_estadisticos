/* Banco de preguntas · M21 Factorial 2^k (P3) */
PLATAFORMA.registrar("pregunta", [
  {
    id: "m21-q001", modulo: "m21-factorial-2k", concepto: "m21-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
    enunciado: "En un 2³, ¿qué combinación representa «bc» en notación de Yates?",
    opciones: ["A bajo, B alto, C alto", "A alto, B alto, C bajo", "A alto, B bajo, C alto", "Todos altos"],
    correcta: 0,
    explicacion: "Se escriben las letras de los factores en nivel alto (C7.4 s4).",
    fuente: [{ id: "C7.4", loc: "slide 4" }]
  },
  {
    id: "m21-q002", modulo: "m21-factorial-2k", concepto: "m21-c02", tipo: "alternativas", dificultad: 2, origen: "curso",
    enunciado: "En la tabla de signos de un 2³, ¿qué signo tiene el tratamiento «c» en la columna ABC?",
    opciones: ["+", "−", "0", "Depende de las réplicas"],
    correcta: 0,
    explicacion: "En «c»: A −, B −, C +; (−)(−)(+) = +. Coincide con C7.4 s5.",
    fuente: [{ id: "C7.4", loc: "slide 5" }]
  },
  {
    id: "m21-q003", modulo: "m21-factorial-2k", concepto: "m21-c03", tipo: "calculo", dificultad: 2, origen: "curso",
    enunciado: String.raw`Resistencia (2³, $n=2$). Totales: $(1)=125$, $a=147$, $b=110$, $ab=138$, $c=106$, $ac=167$, $bc=92$, $abc=162$. Calcula el efecto de A.`,
    respuesta: 22.625, tolerancia: 0.001,
    explicacion: String.raw`Contraste A $=a+ab+ac+abc-(1)-b-c-bc=614-433=181$. Efecto $=181/(4\cdot2)=22{,}625$.`,
    verifica: [{ que: "efecto A", js: "(147+138+167+162-125-110-106-92)/8", esperado: 22.625, tol: 1e-9 }],
    fuente: [{ id: "C7.4", loc: "slides 7 y 9" }]
  },
  {
    id: "m21-q004", modulo: "m21-factorial-2k", concepto: "m21-c03", tipo: "calculo", dificultad: 2, origen: "curso",
    enunciado: String.raw`Con los mismos totales, calcula $SC_A$.`,
    respuesta: 2047.5625, tolerancia: 0.01,
    explicacion: String.raw`$SC_A=181^2/(8\cdot2)=32761/16=2047{,}56$, igual que la tabla ANOVA de C7.4 s11.`,
    verifica: [{ que: "SC_A", js: "181*181/16", esperado: 2047.5625, tol: 1e-9 }],
    fuente: [{ id: "C7.4", loc: "slides 7 y 11" }]
  },
  {
    id: "m21-q005", modulo: "m21-factorial-2k", concepto: "m21-c02", tipo: "calculo", dificultad: 3, origen: "curso",
    enunciado: String.raw`Con los mismos totales, calcula el efecto de la interacción AC (signos AC: $(1)+,\ a-,\ b+,\ ab-,\ c-,\ ac+,\ bc-,\ abc+$).`,
    respuesta: 10.125, tolerancia: 0.001,
    explicacion: String.raw`Contraste AC $=125-147+110-138-106+167-92+162=81$. Efecto $=81/8=10{,}125$; $SC_{AC}=81^2/16=410{,}06$ (C7.4 s11: 410,1).`,
    verifica: [{ que: "efecto AC", js: "(125-147+110-138-106+167-92+162)/8", esperado: 10.125, tol: 1e-9 }],
    fuente: [{ id: "C7.4", loc: "slides 5, 7 y 11" }]
  },
  {
    id: "m21-q006", modulo: "m21-factorial-2k", concepto: "m21-c03", tipo: "vf", dificultad: 1, origen: "curso",
    enunciado: "En un diseño 2^k, cada efecto principal y cada interacción tiene 1 grado de libertad.",
    correcta: true,
    explicacion: "C7.4 s8.",
    fuente: [{ id: "C7.4", loc: "slide 8" }]
  },
  {
    id: "m21-q007", modulo: "m21-factorial-2k", concepto: "m21-c03", tipo: "calculo", dificultad: 1, origen: "nueva",
    enunciado: String.raw`Un $2^3$ se corre con $n=3$ réplicas. ¿Cuántos gl tiene el error?`,
    respuesta: 16, tolerancia: 0,
    explicacion: String.raw`$2^3(n-1)=8\cdot2=16$; total $24-1=23=7+16$.`,
    verifica: [{ que: "gl", js: "8*(3-1)", esperado: 16, tol: 0 }],
    fuente: [{ id: "C7.4", loc: "slide 8" }]
  },
  {
    id: "m21-q008", modulo: "m21-factorial-2k", concepto: "m21-c05", tipo: "interpretacion-R", dificultad: 3, origen: "curso",
    enunciado: "Parte de la salida de model.tables para el 2³ de resistencia. ¿Cuál es el efecto de C definido como ȳ₊ − ȳ₋?",
    salidaR: `C
     -1       1
-0.4375  0.4375`,
    salidaDe: `datos <- data.frame(
  A = factor(c(-1,-1,-1,-1,-1,-1,-1,-1, 1, 1, 1, 1, 1, 1, 1, 1)),
  B = factor(c(-1,-1,-1,-1, 1, 1, 1, 1,-1,-1,-1,-1, 1, 1, 1, 1)),
  C = factor(c(-1,-1, 1, 1,-1,-1, 1, 1,-1,-1, 1, 1,-1,-1, 1, 1)),
  Y = c(60, 65, 52, 54, 54, 56, 45, 47, 72, 75, 83, 84, 68, 70, 80, 82))
modelo <- aov(Y ~ A * B * C, data = datos)
model.tables(modelo, type = "effects")$tables$C`,
    opciones: ["0,875", "0,4375", "−0,4375", "0"],
    correcta: 0,
    explicacion: "model.tables entrega la desviación de cada nivel respecto de la media general: 0,4375 − (−0,4375) = 0,875 (ver ⚠️ Diferencias entre fuentes).",
    fuente: [{ id: "C7.4", loc: "slides 7 y 12" }]
  },
  {
    id: "m21-q009", modulo: "m21-factorial-2k", concepto: "m21-c05", tipo: "completar-R", dificultad: 1, origen: "curso",
    enunciado: "Completa para obtener la tabla de efectos estimados del modelo.",
    codigoR: `model.tables(modelo, type = "___")`,
    huecos: [["effects"]],
    explicacion: "S7.4 línea 33.",
    fuente: [{ id: "S7.4", loc: "línea 33" }]
  },
  {
    id: "m21-q010", modulo: "m21-factorial-2k", concepto: "m21-c06", tipo: "codigo-R", dificultad: 1, origen: "curso",
    enunciado: "¿Qué dibuja esta línea?",
    codigoR: `interaction.plot(datos$A, datos$C, datos$Y)`,
    opciones: ["La media de Y en cada nivel de A, con una línea por cada nivel de C", "La media de Y en cada nivel de C, con una línea por cada nivel de A", "Un boxplot de Y por A y C", "Los residuos del modelo"],
    correcta: 0,
    explicacion: "Primer argumento: eje x; segundo: define las líneas; tercero: respuesta (S7.4).",
    fuente: [{ id: "S7.4", loc: "líneas 41–43" }]
  },
  {
    id: "m21-q011", modulo: "m21-factorial-2k", concepto: "m21-c07", tipo: "alternativas", dificultad: 1, origen: "curso",
    enunciado: "Al bloquear un 2^k, ¿cuál es el caso ideal?",
    opciones: ["Que cada bloque contenga una réplica completa: ningún efecto queda confundido con los bloques", "Que cada bloque tenga un solo tratamiento", "Que los bloques se confundan con los efectos principales", "Que no haya réplicas"],
    correcta: 0,
    explicacion: "C7.4 s18.",
    fuente: [{ id: "C7.4", loc: "slide 18" }]
  },
  {
    id: "m21-q012", modulo: "m21-factorial-2k", concepto: "m21-c08", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
    enunciado: "ANOVA del 2² con bloques (días). ¿Qué se concluye?",
    salidaR: `            Df Sum Sq Mean Sq F value   Pr(>F)
A            1 210.12  210.12    1681 3.19e-05 ***
B            1  45.13   45.13     361 0.000318 ***
bloque       1  10.12   10.12      81 0.002896 **
A:B          1   0.12    0.12       1 0.391002
Residuals    3   0.38    0.13
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1`,
    salidaDe: `bloque <- factor(rep(1:2, each = 4))
A <- factor(rep(c(-1, 1, -1, 1), times = 2))
B <- factor(rep(c(-1, -1, 1, 1), times = 2))
respuesta <- c(20, 30, 25, 35, 22, 33, 27, 37)
summary(aov(respuesta ~ A * B + bloque))`,
    opciones: ["A y B influyen, no hay interacción (efectos aditivos) y el bloqueo por día fue útil", "Solo el bloque es significativo", "La interacción AB es significativa", "Nada es significativo porque el error tiene solo 3 gl"],
    correcta: 0,
    explicacion: "C7.4 s20: A (p = 3,2·10⁻⁵), B (p = 0,0003), bloque (p = 0,003), A:B (p = 0,39).",
    fuente: [{ id: "C7.4", loc: "slide 20" }]
  },
  {
    id: "m21-q013", modulo: "m21-factorial-2k", concepto: "m21-c09", tipo: "calculo", dificultad: 2, origen: "variacion",
    base: [{ id: "C7.4", loc: "slides 25–26" }],
    enunciado: String.raw`2² con $n=2$: totales $(1)=80$, $a=100$, $b=90$, $ab=130$. Calcula $SC_A$.`,
    respuesta: 450, tolerancia: 0.01,
    explicacion: String.raw`Contraste A $=100+130-80-90=60$; $SC_A=60^2/(4\cdot2)=450$. (Efecto A $=60/4=15$.)`,
    verifica: [{ que: "SC_A", js: "(100+130-80-90)**2/8", esperado: 450, tol: 1e-9 }],
    fuente: [{ id: "C7.4", loc: "slides 7 y 26" }]
  },
  {
    id: "m21-q014", modulo: "m21-factorial-2k", concepto: "m21-c09", tipo: "alternativas", dificultad: 2, origen: "curso",
    enunciado: "Viscosidad: F_AB = 7,41 con p = 0,0529 y F crítico (1, 4) = 7,71. ¿Qué conclusión da la pauta?",
    opciones: ["A y B son significativos; la interacción no lo es al 5 % (marginal)", "Los tres efectos son significativos", "Ninguno es significativo", "Solo la interacción es significativa"],
    correcta: 0,
    explicacion: "C7.4 s26.",
    fuente: [{ id: "C7.4", loc: "slide 26" }, { id: "PR-P3-Q2" }]
  },
  {
    id: "m21-q015", modulo: "m21-factorial-2k", concepto: "m21-c04", tipo: "multiple", dificultad: 2, origen: "curso",
    enunciado: "ANOVA del 2³ de resistencia (C7.4 s11). ¿Qué afirmaciones son correctas al 5 %?",
    opciones: ["La temperatura (A) tiene el mayor efecto", "La interacción A×C es significativa: el efecto de la temperatura depende del aditivo", "El aditivo (C) no es significativo por sí solo", "La interacción A×B es significativa", "La interacción triple es significativa"],
    correcta: [0, 1, 2],
    explicacion: "A p = 8,5·10⁻⁹; A:C p = 4,4·10⁻⁶; C p = 0,373; A:B p = 0,078; A:B:C p = 0,696.",
    fuente: [{ id: "C7.4", loc: "slide 11" }]
  }
]);
