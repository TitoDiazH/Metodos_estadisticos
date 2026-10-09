/* ============================================================================
   Preguntas · M11 Análisis de conglomerados: definición, pasos, distancias (P2)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m11-conglomerados-distancias";
  var EMPRESAS = `datos <- data.frame(Inversion = c(16, 12, 10, 12, 45, 50, 45, 50),
                    Ventas    = c(10, 14, 22, 25, 10, 15, 25, 27))
rownames(datos) <- paste0("E", 1:8)
`;

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m11-q001", modulo: MOD, concepto: "m11-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Qué distingue al análisis de conglomerados de la clasificación supervisada?",
      opciones: [
        "No hay etiquetas previas: los grupos emergen de los datos",
        "Siempre usa K-medias",
        "Requiere conocer las clases de antemano",
        "Solo funciona con variables binarias"
      ],
      correcta: 0,
      explicacion: "El clustering es aprendizaje no supervisado: no se cuenta con etiquetas previas. La clasificación supervisada (LDA, QDA, NB) sí las usa para entrenar.",
      fuente: [{ id: "C5.1", loc: "slides 2–3" }]
    },
    {
      id: "m11-q002", modulo: MOD, concepto: "m11-c01", tipo: "multiple", dificultad: 2, origen: "nueva",
      enunciado: "¿Qué condiciones debe cumplir una partición C = {C₁, …, C_k} de los datos?",
      opciones: [
        "Cobertura: la unión de los clústeres es todo el conjunto",
        "Disjuntividad: dos clústeres distintos no comparten observaciones",
        "Ningún clúster está vacío",
        "Todos los clústeres tienen el mismo tamaño"
      ],
      correcta: [0, 1, 2],
      explicacion: "Cobertura, disjuntividad y no vacío. No se exige igual tamaño: de hecho, los clústeres reales suelen tener tamaños distintos.",
      fuente: [{ id: "C5.1", loc: "slide 3" }]
    },
    {
      id: "m11-q003", modulo: MOD, concepto: "m11-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Cuál es el orden correcto de los cinco pasos de un análisis de conglomerados?",
      opciones: [
        "Preparar los datos → definir la distancia → elegir el algoritmo → determinar k → validar e interpretar",
        "Elegir el algoritmo → determinar k → definir la distancia → preparar los datos → validar",
        "Determinar k → preparar datos → validar → elegir algoritmo → definir distancia",
        "Validar → preparar datos → elegir algoritmo → definir distancia → determinar k"
      ],
      correcta: 0,
      explicacion: "C5.1 s4: (1) preparar/estandarizar los datos, (2) definir la distancia, (3) elegir el algoritmo (jerárquico o particionado), (4) determinar el número de clústeres (codo, silueta, dendrograma), (5) validar e interpretar.",
      fuente: [{ id: "C5.1", loc: "slide 4" }]
    },
    {
      id: "m11-q004", modulo: MOD, concepto: "m11-c02", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`C5.1 s8: E1 $=(16,10)$ y E3 $=(10,22)$ (inversión, ventas). Calcula la distancia euclídea.`,
      respuesta: 13.416, tolerancia: 0.01,
      explicacion: String.raw`$d=\sqrt{(16-10)^2+(10-22)^2}=\sqrt{36+144}=\sqrt{180}=13{,}416$. (Manhattan: $6+12=18$; Chebyshev: $\max\{6,12\}=12$.)`,
      verifica: [
        { que: "euclídea", js: "dist([16,10],[10,22])", esperado: 13.4164, tol: 0.0001 },
        { que: "Manhattan", js: "manhattan([16,10],[10,22])", esperado: 18, tol: 1e-9 }
      ],
      fuente: [{ id: "C5.1", loc: "slide 8" }]
    },
    {
      id: "m11-q005", modulo: MOD, concepto: "m11-c02", tipo: "calculo", dificultad: 2, origen: "nueva",
      enunciado: String.raw`Calcula la distancia de Chebyshev (<code>"maximum"</code>) entre E1 $=(16,10)$ y E3 $=(10,22)$.`,
      respuesta: 12, tolerancia: 0.01,
      explicacion: String.raw`Chebyshev es la máxima diferencia en una variable: $\max\{|16-10|,|10-22|\}=\max\{6,12\}=12$ (caso $\lambda=\infty$ de Minkowski).`,
      verifica: [{ que: "Chebyshev", r: `d <- data.frame(I=c(16,10), V=c(10,22)); cat(as.numeric(dist(d, "maximum")))`, esperado: 12, tol: 1e-9 }],
      fuente: [{ id: "C5.1", loc: "slides 6–8" }]
    },
    {
      id: "m11-q006", modulo: MOD, concepto: "m11-c02", tipo: "calculo", dificultad: 2, origen: "nueva",
      enunciado: String.raw`Distancia de Minkowski con $\lambda=3$ entre $A=(1,2)$ y $B=(4,6)$.`,
      respuesta: 4.498, tolerancia: 0.01,
      explicacion: String.raw`$d=\bigl(|1-4|^3+|2-6|^3\bigr)^{1/3}=(27+64)^{1/3}=91^{1/3}=4{,}498$. Con $\lambda=1$ daría $7$ (Manhattan), con $\lambda=2$, $5$ (euclídea).`,
      verifica: [{ que: "Minkowski 3", js: "Math.pow(27+64,1/3)", esperado: 4.498, tol: 0.001 }],
      fuente: [{ id: "C5.1", loc: "slide 6" }]
    },
    {
      id: "m11-q007", modulo: MOD, concepto: "m11-c02", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "Se quiere agrupar clientes por el PATRÓN de su consumo mensual (cómo suben y bajan), sin importar el nivel de gasto. ¿Qué distancia es más apropiada?",
      opciones: [
        "Distancia basada en correlación, d = 1 − r",
        "Distancia euclídea sin estandarizar",
        "Distancia de Hamming",
        "Distancia de Jaccard"
      ],
      correcta: 0,
      explicacion: "La distancia por correlación es invariante a cambios de escala y de nivel: compara la forma del perfil. En R: 1 - cor(t(datos)).",
      distractores: ["", "Depende del nivel de gasto, no solo del patrón.", "Es para variables binarias.", "También es para variables binarias."],
      fuente: [{ id: "C5.1", loc: "slide 9" }]
    },
    {
      id: "m11-q008", modulo: MOD, concepto: "m11-c02", tipo: "calculo", dificultad: 2, origen: "nueva",
      enunciado: String.raw`Dos perfiles tienen correlación $r=-1$. ¿Cuál es su distancia $d=1-r$?`,
      respuesta: 2, tolerancia: 0,
      explicacion: String.raw`$d=1-(-1)=2$, el máximo del rango $[0,2]$: $0$ es correlación perfecta positiva, $1$ ausencia de correlación y $2$ correlación perfecta negativa.`,
      verifica: [{ que: "d", r: `m <- rbind(a=c(1,2,3,4), c=c(4,3,2,1)); cat(round(1 - cor(m[1,], m[2,]), 6))`, esperado: 2, tol: 1e-6 }],
      fuente: [{ id: "C5.1", loc: "slide 9" }]
    },
    {
      id: "m11-q009", modulo: MOD, concepto: "m11-c02", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Matriz de distancias euclídeas entre las empresas E1–E4 (inversión y ventas sin estandarizar). ¿Qué par es el más cercano?",
      codigoR: `round(as.matrix(dist(datos[1:4, ])), 2)`,
      salidaR: `      E1    E2    E3    E4
E1  0.00  5.66 13.42 15.52
E2  5.66  0.00  8.25 11.00
E3 13.42  8.25  0.00  3.61
E4 15.52 11.00  3.61  0.00`,
      salidaDe: EMPRESAS + `round(as.matrix(dist(datos[1:4, ])), 2)`,
      opciones: ["E3 y E4 (distancia 3,61)", "E1 y E2 (distancia 5,66)", "E1 y E4 (distancia 15,52)", "E2 y E3 (distancia 8,25)"],
      correcta: 0,
      explicacion: "El par más cercano es el de menor distancia (fuera de la diagonal): d(E3, E4) = 3,61. El más lejano es E1–E4 (15,52).",
      distractores: ["", "Es el segundo par más cercano.", "Es el par más lejano.", "Es un par de distancia intermedia."],
      fuente: [{ id: "C5.1", loc: "slide 8" }]
    },
    {
      id: "m11-q010", modulo: MOD, concepto: "m11-c03", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "Para variables binarias donde la ausencia mutua (0 y 0) NO indica parecido, ¿qué distancia conviene?",
      opciones: ["Jaccard", "Simple Matching", "Euclídea", "Minkowski con λ = ∞"],
      correcta: 0,
      explicacion: "Jaccard ignora las coincidencias de ceros: d = (b + c)/(a + b + c). Simple Matching cuenta también las coincidencias 0–0 (d en el denominador).",
      fuente: [{ id: "C5.1", loc: "slides 10–11" }]
    },
    {
      id: "m11-q011", modulo: MOD, concepto: "m11-c03", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`C5.1 s11: E1 $=(1,1,0,0)$ y E2 $=(0,1,1,1)$. Calcula la distancia de Simple Matching $(b+c)/(a+b+c+d)$.`,
      respuesta: 0.75, tolerancia: 0.005,
      explicacion: String.raw`Posición a posición: $a=1$ (ambos 1 en la 2.ª), $b=1$ (E1=1, E2=0 en la 1.ª), $c=2$ (E1=0, E2=1 en la 3.ª y 4.ª), $d=0$. $d_{SM}=\dfrac{1+2}{1+1+2+0}=0{,}75$. (La slide indica $0{,}5$, valor que corresponde a $a=b=c=d=1$; ver «Diferencias entre fuentes».)`,
      verifica: [{ que: "SM", r: `x <- c(1,1,0,0); y <- c(0,1,1,1); cat((sum(x&!y)+sum(!x&y))/length(x))`, esperado: 0.75, tol: 1e-9 }],
      fuente: [{ id: "C5.1", loc: "slide 11" }]
    },
    {
      id: "m11-q012", modulo: MOD, concepto: "m11-c03", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C5.1", loc: "slide 11" }],
      enunciado: String.raw`Dos observaciones binarias: $x=(1,0,1,1,0)$ e $y=(1,1,0,1,0)$. Calcula la distancia de <strong>Jaccard</strong>.`,
      respuesta: 0.5, tolerancia: 0.005,
      explicacion: String.raw`$a=2$ (posiciones 1 y 4), $b=1$ (3.ª), $c=1$ (2.ª), $d=1$ (5.ª). $d_{Jaccard}=\dfrac{b+c}{a+b+c}=\dfrac{2}{4}=0{,}5$. Simple Matching daría $\dfrac{2}{5}=0{,}4$, porque cuenta también la coincidencia 0–0.`,
      verifica: [
        { que: "Jaccard", r: `x <- c(1,0,1,1,0); y <- c(1,1,0,1,0); a <- sum(x&y); b <- sum(x&!y); c <- sum(!x&y); cat((b+c)/(a+b+c))`, esperado: 0.5, tol: 1e-9 },
        { que: "SM", r: `x <- c(1,0,1,1,0); y <- c(1,1,0,1,0); cat(mean(x != y))`, esperado: 0.4, tol: 1e-9 }
      ],
      fuente: [{ id: "C5.1", loc: "slides 10–11" }]
    },
    {
      id: "m11-q013", modulo: MOD, concepto: "m11-c03", tipo: "calculo", dificultad: 1, origen: "curso",
      enunciado: String.raw`Ayudantía 5, P3: $P_1=(1,0,1,1)$ y $P_3=(0,1,0,0)$. Calcula la distancia de Hamming.`,
      respuesta: 4, tolerancia: 0,
      explicacion: String.raw`Hamming = número de variables en que difieren: difieren en las 4 ($b+c=4$). Con variables 0/1 coincide con la distancia de Manhattan: <code>dist(x, "manhattan")</code>.`,
      verifica: [{ que: "Hamming", js: "manhattan([1,0,1,1],[0,1,0,0])", esperado: 4, tol: 0 }],
      fuente: [{ id: "AY5-E", loc: "P3" }, { id: "AY5-R", loc: "línea 104" }]
    },
    {
      id: "m11-q014", modulo: MOD, concepto: "m11-c03", tipo: "completar-R", dificultad: 2, origen: "curso",
      enunciado: "Completa el código para obtener la distancia de Hamming entre filas de una matriz binaria con R base.",
      codigoR: `dist(x, method = "___")`,
      huecos: [["manhattan"]],
      explicacion: String.raw`Con datos 0/1, la Manhattan suma las diferencias absolutas = número de posiciones distintas = distancia de Hamming.`,
      fuente: [{ id: "AY5-R", loc: "línea 104" }]
    },
    {
      id: "m11-q015", modulo: MOD, concepto: "m11-c04", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "Se agrupan empresas según activos (10–20) y número de trabajadores (40–350) SIN estandarizar. ¿Qué ocurre?",
      opciones: [
        "La variable trabajadores domina las distancias por tener valores mayores",
        "Ambas variables pesan igual",
        "La variable activos domina porque es menor",
        "No cambia nada, la euclídea ya compensa las escalas"
      ],
      correcta: 0,
      explicacion: "La distancia euclídea suma diferencias al cuadrado en unidades originales: la variable de mayor rango domina. Por eso se estandariza antes de agrupar.",
      fuente: [{ id: "C5.1", loc: "slides 13–14" }]
    },
    {
      id: "m11-q016", modulo: MOD, concepto: "m11-c04", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "¿Qué método de escalamiento es el más sensible a los valores atípicos (outliers)?",
      opciones: ["Min–max", "Z-score", "Ninguno: todos son igual de sensibles", "Sin escala"],
      correcta: 0,
      explicacion: "Con min–max el outlier fija el máximo (o mínimo) y comprime al resto de los datos en un rango pequeño.",
      fuente: [{ id: "C5.1", loc: "slide 17" }]
    },
    {
      id: "m11-q017", modulo: MOD, concepto: "m11-c04", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Distancia euclídea entre E1 y E2 con los datos originales (5,66) y estandarizados con scale(). ¿Qué muestra?",
      codigoR: `round(dist(scale(datos)[1:2, ]), 3)`,
      salidaR: `      E1
E2 0.607`,
      salidaDe: EMPRESAS + `round(dist(scale(datos)[1:2, ]), 3)`,
      opciones: [
        "Al estandarizar, la distancia pasa de 5,66 a 0,607: queda en unidades de desviación estándar y ambas variables pesan por igual",
        "Estandarizar no cambia la distancia",
        "La distancia aumentó porque scale() amplifica las diferencias",
        "0,607 es una correlación, no una distancia"
      ],
      correcta: 0,
      explicacion: "Con z-score cada variable queda con media 0 y sd 1, así que la distancia se expresa en desviaciones estándar y ninguna variable domina por sus unidades.",
      fuente: [{ id: "C5.1", loc: "slides 13–15" }]
    },
    {
      id: "m11-q018", modulo: MOD, concepto: "m11-c04", tipo: "multiple", dificultad: 2, origen: "nueva",
      enunciado: "¿Cuáles de estas afirmaciones sobre el escalamiento antes de agrupar son correctas?",
      opciones: [
        "Z-score deja media 0 y desviación estándar 1",
        "Dividir por el máximo preserva el cero como origen en datos positivos",
        "Min–max fija los extremos en 0 y 1",
        "Siempre conviene estandarizar, incluso con las variables ya en las mismas unidades y rangos"
      ],
      correcta: [0, 1, 2],
      explicacion: "Los tres primeros son propiedades de la tabla de C5.1 s14–17. Sin escala solo es aceptable si las variables ya están en unidades comparables; no siempre hace falta estandarizar.",
      fuente: [{ id: "C5.1", loc: "slides 14–17" }]
    }
  ]);
})();
