/* ============================================================================
   Preguntas · M17 Diseño de experimentos: introducción (P2, por confirmar)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m17-diseno-experimentos";

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m17-q001", modulo: MOD, concepto: "m17-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Cuál es la diferencia entre observar y experimentar un proceso?",
      opciones: [
        "Experimentar provoca señales mediante cambios deliberados (estrategia activa); observar espera señales (estrategia pasiva)",
        "Observar usa ANOVA y experimentar no",
        "Experimentar es siempre más barato que observar",
        "Son sinónimos"
      ],
      correcta: 0,
      explicacion: "El DDE es el conjunto de técnicas activas que manipulan el proceso para que entregue la información necesaria; observar es pasivo.",
      fuente: [{ id: "C7.1", loc: "páginas 4–9" }]
    },
    {
      id: "m17-q002", modulo: MOD, concepto: "m17-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿A quién se atribuye el desarrollo de métodos para muestras pequeñas y varios factores a la vez, en agricultura (1935)?",
      opciones: ["Fisher", "Box y Wilson", "Deming", "Ishikawa"],
      correcta: 0,
      explicacion: "Fisher (1935). Box y Wilson (1951): superficie de respuesta y experimentación secuencial. Deming e Ishikawa (años 80): estadística en calidad en la industria japonesa.",
      fuente: [{ id: "C7.1", loc: "páginas 8–9" }]
    },
    {
      id: "m17-q003", modulo: MOD, concepto: "m17-c02", tipo: "calculo", dificultad: 1, origen: "curso",
      enunciado: String.raw`Se estudian la velocidad (2 niveles) y la temperatura (2 niveles). ¿Cuántos tratamientos distintos hay?`,
      respuesta: 4, tolerancia: 0,
      explicacion: String.raw`Un tratamiento es una combinación de niveles de todos los factores: $2\times2=4$.`,
      verifica: [{ que: "tratamientos", js: "2*2", esperado: 4, tol: 0 }],
      fuente: [{ id: "C7.1", loc: "páginas 10–14" }]
    },
    {
      id: "m17-q004", modulo: MOD, concepto: "m17-c02", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C7.1", loc: "páginas 10–14" }],
      enunciado: String.raw`Un experimento tiene 3 factores con 3, 2 y 4 niveles. Si cada tratamiento se repite 2 veces, ¿cuántas corridas hay en total?`,
      respuesta: 48, tolerancia: 0,
      explicacion: String.raw`Tratamientos: $3\cdot2\cdot4=24$. Con 2 repeticiones: $24\cdot2=48$ corridas.`,
      verifica: [{ que: "corridas", js: "3*2*4*2", esperado: 48, tol: 0 }],
      fuente: [{ id: "C7.1", loc: "páginas 10–17" }]
    },
    {
      id: "m17-q005", modulo: MOD, concepto: "m17-c02", tipo: "multiple", dificultad: 2, origen: "curso",
      enunciado: "¿Cuáles de estos son factores NO controlables (ruido) durante un experimento?",
      opciones: [
        "La humedad ambiental",
        "El ánimo de los operadores",
        "La calidad del material del proveedor",
        "La temperatura fijada en el horno"
      ],
      correcta: [0, 1, 2],
      explicacion: "El ruido son factores que no se controlan durante el experimento (luz, humedad, ánimo de operadores, calidad del material del proveedor). La temperatura del horno es un factor controlable: se puede fijar en un nivel.",
      fuente: [{ id: "C7.1", loc: "páginas 11–12" }]
    },
    {
      id: "m17-q006", modulo: MOD, concepto: "m17-c02", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "¿Qué es una unidad experimental?",
      opciones: [
        "La pieza o muestra que genera un valor representativo del resultado (p. ej. un lote de piezas, no una sola)",
        "Cada factor controlable del proceso",
        "El número de repeticiones del experimento",
        "El error aleatorio de la medición"
      ],
      correcta: 0,
      explicacion: "La unidad experimental es lo que produce un valor representativo de la variable de respuesta; puede ser un lote de piezas y no una sola pieza.",
      fuente: [{ id: "C7.1", loc: "página 11" }]
    },
    {
      id: "m17-q007", modulo: MOD, concepto: "m17-c02", tipo: "vf", dificultad: 2, origen: "curso",
      enunciado: "El error experimental incluye solo el error aleatorio, sin considerar los errores graves que pueda cometer el experimentador.",
      correcta: false,
      explicacion: "Falso. Error experimental = error aleatorio + errores graves cometidos por el experimentador. El error aleatorio es la variabilidad no explicada por los factores (causas comunes, factores no estudiados de efecto pequeño, variabilidad de la medición).",
      fuente: [{ id: "C7.1", loc: "página 14" }]
    },
    {
      id: "m17-q008", modulo: MOD, concepto: "m17-c03", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Para qué sirve aleatorizar el orden de las corridas?",
      opciones: [
        "Para favorecer el supuesto de independencia de los errores",
        "Para reducir el número de tratamientos",
        "Para eliminar el error aleatorio",
        "Para aumentar el número de niveles"
      ],
      correcta: 0,
      explicacion: "Aleatorizar reparte entre los tratamientos los efectos ambientales y temporales no controlados y aumenta la posibilidad de que los errores sean independientes.",
      fuente: [{ id: "C7.1", loc: "página 17" }]
    },
    {
      id: "m17-q009", modulo: MOD, concepto: "m17-c03", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "Se comparan 4 máquinas, pero el operador influye en la respuesta. Se usan 4 operadores y cada uno prueba las 4 máquinas en orden aleatorio. ¿Qué principio se aplica al usar a cada operador como un grupo de comparación?",
      opciones: ["Bloqueo", "Repetición", "Error experimental", "Unidad experimental"],
      correcta: 0,
      explicacion: "Cada operador es un bloque: sus mediciones se parecen más entre sí que las de operadores distintos. Se bloquea el factor de molestia (operador) y se aleatoriza el orden dentro de cada bloque.",
      fuente: [{ id: "C7.1", loc: "página 17" }]
    },
    {
      id: "m17-q010", modulo: MOD, concepto: "m17-c03", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Repetir un tratamiento significa correr más de una vez ese tratamiento, lo que permite estimar el error experimental.",
      correcta: true,
      explicacion: "La repetición (réplica) del mismo tratamiento da varias observaciones bajo condiciones iguales, con las que se estima la variabilidad no explicada por los factores.",
      fuente: [{ id: "C7.1", loc: "página 17" }]
    },
    {
      id: "m17-q011", modulo: MOD, concepto: "m17-c04", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Cuál es la técnica estadística central para analizar los resultados de un experimento?",
      opciones: ["ANOVA", "PCA", "Clustering", "LDA"],
      correcta: 0,
      explicacion: "El análisis de varianza (ANOVA) contrasta si las diferencias entre tratamientos son suficientes para garantizar diferencias poblacionales.",
      fuente: [{ id: "C7.1", loc: "páginas 18–19" }]
    },
    {
      id: "m17-q012", modulo: MOD, concepto: "m17-c04", tipo: "multiple", dificultad: 2, origen: "curso",
      enunciado: "¿Cuáles son aspectos que más influyen en la elección del diseño experimental?",
      opciones: [
        "El objetivo del experimento",
        "El número de factores y de niveles por factor",
        "Los efectos que interesa investigar",
        "Costo, tiempo y precisión deseada",
        "El color del informe final"
      ],
      correcta: [0, 1, 2, 3],
      explicacion: "Los cinco aspectos de C7.1: objetivo, número de factores, número de niveles, efectos de interés, y costo/tiempo/precisión.",
      fuente: [{ id: "C7.1", loc: "páginas 20–22" }]
    },
    {
      id: "m17-q013", modulo: MOD, concepto: "m17-c04", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "¿En qué orden ocurren las etapas de un experimento?",
      opciones: [
        "Planeación → análisis → interpretación",
        "Análisis → planeación → interpretación",
        "Interpretación → análisis → planeación",
        "Planeación → interpretación → análisis"
      ],
      correcta: 0,
      explicacion: "Se planea (problema, respuestas, factores, tratamientos), se analiza (inferencia y ANOVA) y se interpreta (contrastar hipótesis, verificar supuestos, elegir el tratamiento ganador).",
      fuente: [{ id: "C7.1", loc: "páginas 18–19" }]
    }
  ]);
})();
