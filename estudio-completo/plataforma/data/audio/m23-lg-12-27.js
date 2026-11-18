/* GENERADO por tools/generar_audio.py desde tools/guiones/m23-lg-12-27.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m23-lg-12-27",
  "modulo": "m23-superficie-respuesta",
  "titulo": "Ejercicio 12.27: hojuelas de soya, Box-Behnken",
  "archivo": "audio/m23-lg-12-27.mp3",
  "duracion": 171,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 30.1,
      "titulo": "El diseño"
    },
    {
      "t": 46.7,
      "titulo": "El modelo"
    },
    {
      "t": 71.1,
      "titulo": "¿Es adecuado?"
    },
    {
      "t": 85.8,
      "titulo": "Punto estacionario"
    },
    {
      "t": 112.3,
      "titulo": "Clasificar"
    },
    {
      "t": 129.9,
      "titulo": "El mejor punto"
    },
    {
      "t": 156.4,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Libro guía · Cap. 12, ej. 27",
  "pregunta": "m23-d016",
  "orden": 6.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 9.98,
    "clave1": 13.36,
    "clave2": 23.44,
    "clave3": 25.91,
    "dis": 30.1,
    "cod": 34.92,
    "sal": 46.68,
    "ecuacion": 48.43,
    "lin": 50.32,
    "cuad": 50.9,
    "inter": 51.66,
    "sig": 53.27,
    "f": 71.08,
    "fcalc": 71.08,
    "rcuad": 75.38,
    "lof": 79.65,
    "deriv": 85.78,
    "d1": 87.0,
    "d2": 89.15,
    "d3": 90.15,
    "sist": 92.04,
    "sol": 97.22,
    "real": 103.0,
    "hes": 112.35,
    "ev": 113.91,
    "clas": 117.39,
    "opt": 129.94,
    "mejor": 133.27,
    "fin": 156.39
  },
  "frases": [
    [
      0.0,
      "Ejercicio 27: hojuelas de soya."
    ],
    [
      2.76,
      "Es el mismo problema del ejercicio que vimos en clase, pero con los datos del libro, y da un resultado distinto."
    ],
    [
      9.98,
      "Se estudia la elaboración de hojuelas de soya por extrusión."
    ],
    [
      13.36,
      "Factores: temperatura de 120 a 170 grados, humedad de 25 a 45 %, y velocidad de tornillo de 800 a 1000 revoluciones."
    ],
    [
      23.44,
      "Diseño Box Behnken de 15 corridas."
    ],
    [
      25.91,
      "Interesa minimizar la respuesta."
    ],
    [
      30.1,
      "Box Behnken con tres factores: 12 puntos en las aristas y tres centros."
    ],
    [
      34.92,
      "Codificación: temperatura −145 / 25, humedad −35 / 10, velocidad −900 / 100."
    ],
    [
      46.68,
      "El modelo."
    ],
    [
      48.43,
      "La ecuación de segundo orden."
    ],
    [
      50.32,
      "Lineales, cuadráticos, interacciones."
    ],
    [
      53.27,
      "Significativos: temperatura y humedad lineales, el cuadrático de humedad y la interacción temperatura humedad."
    ],
    [
      60.16,
      "A diferencia del ejercicio de clase, aquí sí hay una interacción importante: −6,8."
    ],
    [
      66.16,
      "El efecto de la temperatura depende de la humedad."
    ],
    [
      71.08,
      "F 8,7, p 0,014: significativo."
    ],
    [
      75.38,
      "R² 0,94, ajustado 0,83."
    ],
    [
      79.65,
      "Sin falta de ajuste al 5 %, p 0,07."
    ],
    [
      85.78,
      "Derivamos."
    ],
    [
      87.0,
      "Respecto de temperatura."
    ],
    [
      89.15,
      "De humedad."
    ],
    [
      90.15,
      "De velocidad."
    ],
    [
      92.04,
      "Con la interacción, el sistema ya no se separa por factor: hay que resolverlo junto."
    ],
    [
      97.22,
      "La solución: −0,09 − 0,67, y 0,07."
    ],
    [
      103.0,
      "Dentro de la región: unos 143 grados, 28 % de humedad y 907 revoluciones."
    ],
    [
      112.35,
      "Valores propios."
    ],
    [
      113.91,
      "8,9, 2,3, y −2,6."
    ],
    [
      117.39,
      "Signos mezclados: es un punto silla."
    ],
    [
      119.98,
      "Es justo lo que pregunta el libro: si queremos minimizar, ¿es el tipo de superficie deseado?"
    ],
    [
      125.49,
      "No."
    ],
    [
      126.16,
      "Una silla no es un mínimo."
    ],
    [
      129.94,
      "Entonces hay que buscar en la frontera de la región."
    ],
    [
      133.27,
      "El menor valor predicho está con temperatura alta, 170 grados, humedad cerca de 33 % y velocidad cerca de 915."
    ],
    [
      142.39,
      "Ojo: el modelo predice ahí un valor negativo, que es imposible."
    ],
    [
      146.34,
      "Eso dice que en ese borde el modelo cuadrático ya no es confiable, y que la recomendación hay que confirmarla con corridas reales."
    ],
    [
      156.39,
      "Con interacciones, el punto estacionario se obtiene resolviendo el sistema completo."
    ],
    [
      161.58,
      "Si sale una silla cuando buscas un mínimo, se busca en la frontera, y una predicción imposible es una alarma para no confiar ciegamente en el modelo."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio veintisiete: hojuelas de soya.",
    "Es el mismo problema del ejercicio que vimos en clase, pero con los datos del libro, y da un resultado distinto.",
    "Se estudia la elaboración de hojuelas de soya por extrusión.",
    "Factores: temperatura de ciento veinte a ciento setenta grados, humedad de veinticinco a cuarenta y cinco por ciento, y velocidad de tornillo de ochocientas a mil revoluciones.",
    "Diseño Box Behnken de quince corridas.",
    "Interesa minimizar la respuesta.",
    "Box Behnken con tres factores: doce puntos en las aristas y tres centros.",
    "Codificación: temperatura menos ciento cuarenta y cinco sobre veinticinco, humedad menos treinta y cinco sobre diez, velocidad menos novecientos sobre cien.",
    "El modelo.",
    "La ecuación de segundo orden.",
    "Lineales, cuadráticos, interacciones.",
    "Significativos: temperatura y humedad lineales, el cuadrático de humedad y la interacción temperatura humedad.",
    "A diferencia del ejercicio de clase, aquí sí hay una interacción importante: menos seis coma ocho.",
    "El efecto de la temperatura depende de la humedad.",
    "Efe ocho coma siete, pe cero coma cero uno cuatro: significativo.",
    "Erre cuadrado cero coma nueve cuatro, ajustado cero coma ocho tres.",
    "Sin falta de ajuste al cinco por ciento, pe cero coma cero siete.",
    "Derivamos.",
    "Respecto de temperatura.",
    "De humedad.",
    "De velocidad.",
    "Con la interacción, el sistema ya no se separa por factor: hay que resolverlo junto.",
    "La solución: menos cero coma cero nueve, menos cero coma seis siete, y cero coma cero siete.",
    "Dentro de la región: unos ciento cuarenta y tres grados, veintiocho por ciento de humedad y novecientas siete revoluciones.",
    "Valores propios.",
    "Ocho coma nueve, dos coma tres, y menos dos coma seis.",
    "Signos mezclados: es un punto silla.",
    "Es justo lo que pregunta el libro: si queremos minimizar, ¿es el tipo de superficie deseado?",
    "No.",
    "Una silla no es un mínimo.",
    "Entonces hay que buscar en la frontera de la región.",
    "El menor valor predicho está con temperatura alta, ciento setenta grados, humedad cerca de treinta y tres por ciento y velocidad cerca de novecientas quince.",
    "Ojo: el modelo predice ahí un valor negativo, que es imposible.",
    "Eso dice que en ese borde el modelo cuadrático ya no es confiable, y que la recomendación hay que confirmarla con corridas reales.",
    "Con interacciones, el punto estacionario se obtiene resolviendo el sistema completo.",
    "Si sale una silla cuando buscas un mínimo, se busca en la frontera, y una predicción imposible es una alarma para no confiar ciegamente en el modelo."
  ],
  "huella": "4f9818b78974"
});
