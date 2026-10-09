/* ============================================================================
   Preguntas · M13 K-medias y elección de k (P2) — lote b
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m13-k-medias";
  var DATOS_CLIENTES = `datos <- data.frame(
  ingreso   = c(1.22, 1.5, 1.3, 4.5, 5.0, 4.8),
  gasto     = c(0.8, 1.0, 0.9, 3.5, 3.8, 3.2),
  productos = c(2, 3, 2, 6, 7, 6))
rownames(datos) <- c("C1", "C2", "C3", "C4", "C5", "C6")
datos_norm <- as.data.frame(scale(datos,
                                  center = apply(datos, 2, min),
                                  scale = apply(datos, 2, max) - apply(datos, 2, min)))
`;

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m13-q013", modulo: MOD, concepto: "m13-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Qué cantidad minimiza K-medias?",
      opciones: [
        "La suma de las distancias al cuadrado de cada observación al centroide de su clúster",
        "La distancia mínima entre dos clústeres",
        "El número de clústeres k",
        "La distancia promedio entre los centroides"
      ],
      correcta: 0,
      explicacion: "El objetivo es la variabilidad interna total (WSS): Σ_j Σ_{i∈C_j} ‖x_i − μ_j‖². El número k no se optimiza: se entrega de antemano.",
      fuente: [{ id: "C5.2", loc: "slide 3" }]
    },
    {
      id: "m13-q014", modulo: MOD, concepto: "m13-c01", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "EJ-P2", loc: "P11" }],
      enunciado: String.raw`Un clúster contiene los puntos $(1,1)$ y $(2,1)$. Calcula su suma de cuadrados intra-clúster (WSS), respecto de su centroide.`,
      respuesta: 0.5, tolerancia: 0.005,
      explicacion: String.raw`Centroide: $(1{,}5;\ 1)$. $\lVert(1,1)-\mu\rVert^2=0{,}25$ y $\lVert(2,1)-\mu\rVert^2=0{,}25$ ⇒ WSS $=0{,}5$. Con el clúster $\{(4,3),(5,4)\}$ (centroide $(4{,}5;\ 3{,}5)$) se suma otro $1$: WSS total $=1{,}5$.`,
      verifica: [{ que: "WSS", r: `P <- rbind(c(1,1), c(2,1)); m <- colMeans(P); cat(sum((t(t(P) - m))^2))`, esperado: 0.5, tol: 1e-9 }],
      fuente: [{ id: "C5.2", loc: "slides 3–6" }]
    },
    {
      id: "m13-q015", modulo: MOD, concepto: "m13-c01", tipo: "vf", dificultad: 1, origen: "nueva",
      enunciado: "K-medias requiere especificar el número de clústeres k antes de ejecutar el algoritmo.",
      correcta: true,
      explicacion: "Verdadero. Es una de sus características principales (y limitaciones): k se fija de antemano, a diferencia de los jerárquicos, donde k se decide cortando el dendrograma. Para elegirlo se usan el codo y la silueta.",
      fuente: [{ id: "C5.2", loc: "slides 3, 8" }]
    },
    {
      id: "m13-q016", modulo: MOD, concepto: "m13-c01", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Se agruparon 6 clientes (datos normalizados min–máx) con K-medias, k = 2. ¿Cómo quedan los clústeres y qué tan buena es la partición?",
      codigoR: `set.seed(123)
km <- kmeans(datos_norm, centers = 2, nstart = 25)
km$cluster
round(km$tot.withinss, 4)
round(km$betweenss / km$totss, 4)`,
      salidaR: `C1 C2 C3 C4 C5 C6 
 1  1  1  2  2  2 
[1] 0.0873
[1] 0.9744`,
      salidaDe: DATOS_CLIENTES + `set.seed(123)
km <- kmeans(datos_norm, centers = 2, nstart = 25)
km$cluster
round(km$tot.withinss, 4)
round(km$betweenss / km$totss, 4)`,
      opciones: [
        "{C1, C2, C3} y {C4, C5, C6}; la variabilidad entre clústeres es el 97,4 % de la total, es decir, una partición muy marcada (WSS baja: 0,0873)",
        "{C1, C4} y {C2, C3, C5, C6}; WSS 0,0873",
        "Tres clústeres de tamaño 2",
        "La partición es mala porque betweenss/totss es alto"
      ],
      correcta: 0,
      explicacion: "cluster asigna 1 a C1–C3 y 2 a C4–C6. betweenss/totss = 0,9744: casi toda la variabilidad se explica por la separación entre clústeres, y la WSS total (0,0873) es mínima. Cuanto más cerca de 1 esa razón, mejor separados.",
      fuente: [{ id: "AY5-R", loc: "líneas 211–228" }, { id: "C5.2", loc: "slides 3–6" }]
    },
    {
      id: "m13-q017", modulo: MOD, concepto: "m13-c03", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "¿Qué hace el argumento nstart = 25 en kmeans()?",
      opciones: [
        "Ejecuta el algoritmo con 25 inicializaciones distintas y retorna la mejor (menor WSS)",
        "Limita el algoritmo a 25 iteraciones",
        "Forma 25 clústeres",
        "Usa 25 observaciones como muestra"
      ],
      correcta: 0,
      explicacion: "nstart controla cuántas veces se parte desde centroides iniciales distintos y se queda con la solución de menor WSS, mitigando los óptimos locales. El número de clústeres es centers; el máximo de iteraciones, iter.max.",
      fuente: [{ id: "C5.2", loc: "slide 7" }, { id: "S5.2", loc: "líneas 39–45" }]
    },
    {
      id: "m13-q018", modulo: MOD, concepto: "m13-c03", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "En K-Means++, ¿cómo se elige cada nuevo centroide inicial después del primero?",
      opciones: [
        "Con probabilidad proporcional a D(x)², la distancia al cuadrado al centroide más cercano ya elegido",
        "Siempre el punto más cercano a los centroides ya elegidos",
        "Al azar con la misma probabilidad para todos los puntos",
        "Siempre el punto con mayor valor en la primera variable"
      ],
      correcta: 0,
      explicacion: "K-Means++ elige centroides bien dispersos: los puntos lejanos a los centroides ya elegidos tienen más probabilidad de ser elegidos (∝ D²). Luego se ejecuta K-medias estándar desde ahí.",
      fuente: [{ id: "C5.2", loc: "slide 7" }]
    },
    {
      id: "m13-q019", modulo: MOD, concepto: "m13-c03", tipo: "calculo", dificultad: 3, origen: "variacion",
      base: [{ id: "C5.2", loc: "slide 7" }],
      enunciado: String.raw`En K-Means++ ya hay un centroide y tres puntos candidatos con distancias $D=(0,\ 1,\ 3)$ al centroide más cercano. ¿Cuál es la probabilidad de que el tercer punto sea el siguiente centroide?`,
      respuesta: 0.9, tolerancia: 0.002,
      explicacion: String.raw`Probabilidad $\propto D^2=(0,\ 1,\ 9)$, que suman $10$: el tercer punto tiene $9/10=0{,}9$. El primero ($D=0$, que ya es el centroide) tiene probabilidad $0$.`,
      verifica: [{ que: "probabilidad", js: "9/(0+1+9)", esperado: 0.9, tol: 1e-9 }],
      fuente: [{ id: "C5.2", loc: "slide 7" }]
    },
    {
      id: "m13-q020", modulo: MOD, concepto: "m13-c03", tipo: "vf", dificultad: 3, origen: "nueva",
      enunciado: "La función kmeans() de R usa K-Means++ por defecto para elegir los centroides iniciales.",
      correcta: false,
      explicacion: "Falso, aunque la slide 7 lo sugiere: según la ayuda de kmeans(), si centers es un número se eligen filas distintas AL AZAR como centros iniciales. K-Means++ está, por ejemplo, en ClusterR::KMeans_rcpp(initializer = \"kmeans++\"). Por eso se usa nstart > 1.",
      fuente: [{ id: "C5.2", loc: "slide 7" }, { id: "S5.2", loc: "líneas 39–45" }]
    },
    {
      id: "m13-q021", modulo: MOD, concepto: "m13-c04", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "Para un conjunto de datos muy grande, con idea del número de grupos y clústeres aproximadamente esféricos, ¿qué método conviene?",
      opciones: ["K-medias", "Jerárquico con single linkage", "DIANA", "Ward con dendrograma"],
      correcta: 0,
      explicacion: "K-medias es rápido y escalable a millones de observaciones. Los jerárquicos se prefieren con datos pequeños/medianos, para explorar distintos k con el dendrograma y para formas irregulares.",
      fuente: [{ id: "C5.2", loc: "slide 8" }]
    },
    {
      id: "m13-q022", modulo: MOD, concepto: "m13-c04", tipo: "vf", dificultad: 2, origen: "curso",
      enunciado: "K-medias entrega un dendrograma que permite elegir k después de ejecutar el algoritmo.",
      correcta: false,
      explicacion: "No hay jerarquía ni dendrograma: k se fija antes de ejecutar. Explorar distintos k cortando un dendrograma es propio de los métodos jerárquicos.",
      fuente: [{ id: "C5.2", loc: "slide 8" }, { id: "EJ-P2", loc: "P11" }]
    },
    {
      id: "m13-q023", modulo: MOD, concepto: "m13-c04", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "Si en los datos hay outliers, ¿qué problema tiene K-medias?",
      opciones: [
        "Los outliers arrastran los centroides (que son medias) y distorsionan los clústeres",
        "Ninguno: el centroide es la mediana",
        "Solo afectan al método de Ward",
        "Aumentan k automáticamente"
      ],
      correcta: 0,
      explicacion: "El centroide es el promedio de los puntos del clúster, que es sensible a valores extremos. Por eso K-medias es sensible a outliers (ver también el efecto del escalamiento min–max).",
      fuente: [{ id: "C5.2", loc: "slide 8" }]
    }
  ]);
})();
