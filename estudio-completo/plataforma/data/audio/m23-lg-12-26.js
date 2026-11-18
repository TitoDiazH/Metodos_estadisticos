/* GENERADO por tools/generar_audio.py desde tools/guiones/m23-lg-12-26.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m23-lg-12-26",
  "modulo": "m23-superficie-respuesta",
  "titulo": "Ejercicio 12.26: rendimiento, experimentación secuencial",
  "archivo": "audio/m23-lg-12-26.mp3",
  "duracion": 173,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 35.8,
      "titulo": "El diseño"
    },
    {
      "t": 62.5,
      "titulo": "El modelo"
    },
    {
      "t": 79.8,
      "titulo": "¿Es adecuado?"
    },
    {
      "t": 91.1,
      "titulo": "Punto estacionario"
    },
    {
      "t": 105.7,
      "titulo": "Clasificar"
    },
    {
      "t": 127.5,
      "titulo": "El óptimo"
    },
    {
      "t": 157.2,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Libro guía · Cap. 12, ej. 26",
  "pregunta": "m23-d013",
  "orden": 5.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 5.47,
    "clave1": 10.29,
    "clave2": 20.82,
    "clave3": 24.38,
    "dis": 35.78,
    "cod": 42.12,
    "sal": 62.51,
    "ecuacion": 64.38,
    "lin": 65.54,
    "cuad": 66.13,
    "inter": 66.83,
    "sig": 68.46,
    "f": 79.82,
    "fcalc": 79.82,
    "rcuad": 84.04,
    "lof": 86.32,
    "deriv": 91.13,
    "d1": 92.35,
    "d2": 93.84,
    "sist": 96.0,
    "sol": 97.8,
    "real": 102.15,
    "hes": 105.69,
    "det": 106.76,
    "ev": 110.02,
    "clas": 114.07,
    "opt": 127.55,
    "mejor": 135.17,
    "fin": 157.23
  },
  "frases": [
    [
      0.0,
      "Ejercicio 26: muestra la estrategia completa de superficie de respuesta."
    ],
    [
      5.47,
      "Se busca maximizar el rendimiento de un proceso, moviendo tiempo y temperatura."
    ],
    [
      10.29,
      "Primero se exploró alrededor de 75 minutos y 130 grados, y siguiendo la trayectoria de máximo ascenso se llegó a 90 minutos y 145 grados."
    ],
    [
      20.82,
      "Ahí se corrió un factorial 2 · 2 con dos centros."
    ],
    [
      24.38,
      "Como el modelo de primer orden no describía bien la zona, se agregaron puntos axiales para completar un central compuesto."
    ],
    [
      31.67,
      "Analizamos ese diseño final."
    ],
    [
      35.78,
      "El central compuesto final: cuatro esquinas, cuatro axiales a 1,41, y cuatro centros."
    ],
    [
      42.12,
      "Tiempo −90, dividido en diez."
    ],
    [
      44.71,
      "Temperatura −145, dividido en cinco."
    ],
    [
      48.91,
      "¿Por qué no bastaba el primer orden en la segunda zona?"
    ],
    [
      52.19,
      "Porque cerca del óptimo la superficie ya no es un plano: se curva."
    ],
    [
      56.14,
      "Un plano ahí da un R² bajísimo."
    ],
    [
      58.7,
      "Por eso se agregan niveles."
    ],
    [
      62.51,
      "El modelo de segundo orden."
    ],
    [
      64.38,
      "La ecuación."
    ],
    [
      65.54,
      "Lineales, cuadráticos e interacción."
    ],
    [
      68.46,
      "Significativos: los dos cuadráticos, negativos, y la interacción, también negativa y grande."
    ],
    [
      74.59,
      "Ahora sí, el segundo orden describe la superficie."
    ],
    [
      79.82,
      "F 9,3, p 0,009: significativo."
    ],
    [
      84.04,
      "R² 0,89."
    ],
    [
      86.32,
      "Y sin falta de ajuste, p 0,28."
    ],
    [
      91.13,
      "Derivamos."
    ],
    [
      92.35,
      "Respecto del tiempo."
    ],
    [
      93.84,
      "Respecto de la temperatura."
    ],
    [
      96.0,
      "Resolvemos el sistema."
    ],
    [
      97.8,
      "x₁ − 3,66; x₂, 2,93."
    ],
    [
      102.15,
      "Muy fuera de la región."
    ],
    [
      105.69,
      "La hessiana."
    ],
    [
      106.76,
      "Determinante positivo y primer elemento negativo."
    ],
    [
      110.02,
      "Valores propios −0,14 y −5,1."
    ],
    [
      114.07,
      "Los dos negativos: es un máximo."
    ],
    [
      116.47,
      "Pero uno casi cero: la superficie es una cresta alargada, una cordillera, que sube muy lentamente hacia afuera."
    ],
    [
      123.22,
      "Por eso el máximo exacto se va lejos."
    ],
    [
      127.55,
      "Queremos maximizar, y es un máximo, pero fuera de la región."
    ],
    [
      131.4,
      "No se extrapola."
    ],
    [
      132.83,
      "El mejor punto se busca en la frontera."
    ],
    [
      135.17,
      "En la región del factorial, el mayor rendimiento está en x₁ igual a −1 y x₂ cerca de 0,85: unos 80 minutos y 149 grados, con un rendimiento predicho de 88,8."
    ],
    [
      149.37,
      "Como la cresta sigue subiendo hacia allá, valdría la pena un nuevo experimento en esa dirección."
    ],
    [
      157.23,
      "La estrategia completa: primer orden y máximo ascenso para acercarse, y cuando aparece la curvatura, un central compuesto y un modelo de segundo orden."
    ],
    [
      166.67,
      "Un valor propio casi cero indica una cordillera: muchas combinaciones dan casi el mismo resultado."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio veintiséis: muestra la estrategia completa de superficie de respuesta.",
    "Se busca maximizar el rendimiento de un proceso, moviendo tiempo y temperatura.",
    "Primero se exploró alrededor de setenta y cinco minutos y ciento treinta grados, y siguiendo la trayectoria de máximo ascenso se llegó a noventa minutos y ciento cuarenta y cinco grados.",
    "Ahí se corrió un factorial dos por dos con dos centros.",
    "Como el modelo de primer orden no describía bien la zona, se agregaron puntos axiales para completar un central compuesto.",
    "Analizamos ese diseño final.",
    "El central compuesto final: cuatro esquinas, cuatro axiales a uno coma cuatro uno, y cuatro centros.",
    "Tiempo menos noventa, dividido en diez.",
    "Temperatura menos ciento cuarenta y cinco, dividido en cinco.",
    "¿Por qué no bastaba el primer orden en la segunda zona?",
    "Porque cerca del óptimo la superficie ya no es un plano: se curva.",
    "Un plano ahí da un erre cuadrado bajísimo.",
    "Por eso se agregan niveles.",
    "El modelo de segundo orden.",
    "La ecuación.",
    "Lineales, cuadráticos e interacción.",
    "Significativos: los dos cuadráticos, negativos, y la interacción, también negativa y grande.",
    "Ahora sí, el segundo orden describe la superficie.",
    "Efe nueve coma tres, pe cero coma cero cero nueve: significativo.",
    "Erre cuadrado cero coma ocho nueve.",
    "Y sin falta de ajuste, pe cero coma dos ocho.",
    "Derivamos.",
    "Respecto del tiempo.",
    "Respecto de la temperatura.",
    "Resolvemos el sistema.",
    "Equis uno, menos tres coma seis seis; equis dos, dos coma nueve tres.",
    "Muy fuera de la región.",
    "La hessiana.",
    "Determinante positivo y primer elemento negativo.",
    "Valores propios menos cero coma uno cuatro y menos cinco coma uno.",
    "Los dos negativos: es un máximo.",
    "Pero uno casi cero: la superficie es una cresta alargada, una cordillera, que sube muy lentamente hacia afuera.",
    "Por eso el máximo exacto se va lejos.",
    "Queremos maximizar, y es un máximo, pero fuera de la región.",
    "No se extrapola.",
    "El mejor punto se busca en la frontera.",
    "En la región del factorial, el mayor rendimiento está en equis uno igual a menos uno y equis dos cerca de cero coma ocho cinco: unos ochenta minutos y ciento cuarenta y nueve grados, con un rendimiento predicho de ochenta y ocho coma ocho.",
    "Como la cresta sigue subiendo hacia allá, valdría la pena un nuevo experimento en esa dirección.",
    "La estrategia completa: primer orden y máximo ascenso para acercarse, y cuando aparece la curvatura, un central compuesto y un modelo de segundo orden.",
    "Un valor propio casi cero indica una cordillera: muchas combinaciones dan casi el mismo resultado."
  ],
  "huella": "d59e8388d434"
});
