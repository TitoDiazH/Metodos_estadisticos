/* GENERADO por tools/generar_audio.py desde tools/guiones/m23-lg-12-24.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m23-lg-12-24",
  "modulo": "m23-superficie-respuesta",
  "titulo": "Ejercicio 12.24: solubilidad de la harina de amaranto, Box-Behnken",
  "archivo": "audio/m23-lg-12-24.mp3",
  "duracion": 194,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 27.5,
      "titulo": "El diseño"
    },
    {
      "t": 53.8,
      "titulo": "El modelo"
    },
    {
      "t": 84.3,
      "titulo": "¿Es adecuado?"
    },
    {
      "t": 114.0,
      "titulo": "Punto estacionario"
    },
    {
      "t": 139.3,
      "titulo": "Clasificar"
    },
    {
      "t": 153.7,
      "titulo": "El mejor punto"
    },
    {
      "t": 182.1,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Libro guía · Cap. 12, ej. 24",
  "pregunta": "m23-d007",
  "orden": 3.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 5.12,
    "clave1": 9.11,
    "clave2": 13.88,
    "clave3": 16.88,
    "dis": 27.47,
    "cod": 49.61,
    "sal": 53.76,
    "ecuacion": 58.23,
    "lin": 60.38,
    "cuad": 61.31,
    "inter": 62.41,
    "sig": 64.5,
    "f": 84.35,
    "fcalc": 84.35,
    "rcuad": 89.85,
    "lof": 93.85,
    "deriv": 114.02,
    "d1": 117.3,
    "d2": 119.45,
    "d3": 120.45,
    "sist": 124.16,
    "sol": 128.28,
    "real": 133.11,
    "hes": 139.27,
    "ev": 142.13,
    "clas": 146.83,
    "opt": 153.71,
    "mejor": 162.3,
    "fin": 182.08
  },
  "frases": [
    [
      0.0,
      "Ejercicio 24 del capítulo 12: harina instantánea de amaranto."
    ],
    [
      5.12,
      "En la extrusión interesa minimizar el índice de solubilidad en agua."
    ],
    [
      9.11,
      "Los factores son temperatura, humedad y velocidad del tornillo, codificados."
    ],
    [
      13.88,
      "El diseño es un Box Behnken de 15 corridas."
    ],
    [
      16.88,
      "Se pide nombrar el diseño, ajustar un modelo de segundo orden, ver qué superficie describe y encontrar el mejor punto dentro de la región."
    ],
    [
      27.47,
      "El Box Behnken usa tres niveles por factor."
    ],
    [
      30.22,
      "Sus puntos están en la mitad de las aristas del cubo: un factorial 2 · 2 para cada par de factores, con el tercero en cero."
    ],
    [
      38.13,
      "Más 3 centros."
    ],
    [
      39.84,
      "12 + 3, 15 corridas."
    ],
    [
      42.17,
      "Nunca pone los tres factores en un extremo al mismo tiempo, por eso se recomienda cuando las esquinas son caras o riesgosas."
    ],
    [
      49.61,
      "Los datos ya vienen codificados."
    ],
    [
      53.76,
      "Con tres factores, el modelo de segundo orden tiene diez coeficientes."
    ],
    [
      58.23,
      "Ahí está la ecuación ajustada."
    ],
    [
      60.38,
      "Tres lineales, tres cuadráticos, y tres interacciones."
    ],
    [
      64.5,
      "Significativos: temperatura y velocidad en lo lineal, y los cuadráticos de temperatura y humedad."
    ],
    [
      70.89,
      "Fíjate en los signos de esos cuadráticos: el de temperatura es negativo y el de humedad positivo."
    ],
    [
      76.62,
      "Curvan en direcciones opuestas: eso anuncia una silla."
    ],
    [
      80.05,
      "Ninguna interacción es significativa."
    ],
    [
      84.35,
      "La F global es 7,2, p 0,021: el modelo es significativo."
    ],
    [
      89.85,
      "R² 0,93, ajustado 0,8."
    ],
    [
      93.85,
      "La falta de ajuste sí es significativa, pero ojo por qué: los tres centros dieron casi lo mismo, 13,85, 13,93 y 13,77."
    ],
    [
      104.02,
      "Con un error puro tan chico, cualquier desvío del modelo se vuelve significativo."
    ],
    [
      109.08,
      "Aun así el modelo explica el 93 %."
    ],
    [
      114.02,
      "Derivamos respecto de cada factor e igualamos a cero."
    ],
    [
      117.3,
      "Respecto de temperatura."
    ],
    [
      119.45,
      "De humedad."
    ],
    [
      120.45,
      "Y de velocidad."
    ],
    [
      121.68,
      "Ahora es un sistema de 3 · 3."
    ],
    [
      124.16,
      "En forma matricial, menos un medio de B inversa por b."
    ],
    [
      128.28,
      "La solución: −0,7, casi cero, y −1,65."
    ],
    [
      133.11,
      "La velocidad queda en −1,65: fuera de la región."
    ],
    [
      139.27,
      "Con tres factores se usan los valores propios."
    ],
    [
      142.13,
      "1,59 − 0,32, y −1,25."
    ],
    [
      146.83,
      "Signos mezclados: es un punto silla."
    ],
    [
      149.42,
      "Sube en una dirección y baja en otra."
    ],
    [
      153.71,
      "Queremos minimizar."
    ],
    [
      155.22,
      "El punto estacionario es una silla y además está fuera: no sirve."
    ],
    [
      159.3,
      "El mínimo dentro de la región está en la frontera."
    ],
    [
      162.3,
      "Evaluando el modelo en el cubo, el menor índice se obtiene con temperatura alta, humedad media y velocidad alta: x₁ igual a uno, x₂ igual a cero, x₃ igual a uno, con un índice predicho de 10,7."
    ],
    [
      175.73,
      "Coincide con la corrida de menor índice observado, 10,27."
    ],
    [
      182.08,
      "Box Behnken: tres niveles, aristas más centro."
    ],
    [
      185.24,
      "Cuadráticos con signos opuestos anuncian una silla."
    ],
    [
      188.27,
      "Con una silla, o un punto fuera de la región, el óptimo se busca en la frontera."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio veinticuatro del capítulo doce: harina instantánea de amaranto.",
    "En la extrusión interesa minimizar el índice de solubilidad en agua.",
    "Los factores son temperatura, humedad y velocidad del tornillo, codificados.",
    "El diseño es un Box Behnken de quince corridas.",
    "Se pide nombrar el diseño, ajustar un modelo de segundo orden, ver qué superficie describe y encontrar el mejor punto dentro de la región.",
    "El Box Behnken usa tres niveles por factor.",
    "Sus puntos están en la mitad de las aristas del cubo: un factorial dos por dos para cada par de factores, con el tercero en cero.",
    "Más tres centros.",
    "Doce más tres, quince corridas.",
    "Nunca pone los tres factores en un extremo al mismo tiempo, por eso se recomienda cuando las esquinas son caras o riesgosas.",
    "Los datos ya vienen codificados.",
    "Con tres factores, el modelo de segundo orden tiene diez coeficientes.",
    "Ahí está la ecuación ajustada.",
    "Tres lineales, tres cuadráticos, y tres interacciones.",
    "Significativos: temperatura y velocidad en lo lineal, y los cuadráticos de temperatura y humedad.",
    "Fíjate en los signos de esos cuadráticos: el de temperatura es negativo y el de humedad positivo.",
    "Curvan en direcciones opuestas: eso anuncia una silla.",
    "Ninguna interacción es significativa.",
    "La efe global es siete coma dos, pe cero coma cero dos uno: el modelo es significativo.",
    "Erre cuadrado cero coma nueve tres, ajustado cero coma ocho.",
    "La falta de ajuste sí es significativa, pero ojo por qué: los tres centros dieron casi lo mismo, trece coma ocho cinco, trece coma nueve tres y trece coma siete siete.",
    "Con un error puro tan chico, cualquier desvío del modelo se vuelve significativo.",
    "Aun así el modelo explica el noventa y tres por ciento.",
    "Derivamos respecto de cada factor e igualamos a cero.",
    "Respecto de temperatura.",
    "De humedad.",
    "Y de velocidad.",
    "Ahora es un sistema de tres por tres.",
    "En forma matricial, menos un medio de be mayúscula inversa por be.",
    "La solución: menos cero coma siete, casi cero, y menos uno coma seis cinco.",
    "La velocidad queda en menos uno coma seis cinco: fuera de la región.",
    "Con tres factores se usan los valores propios.",
    "Uno coma cinco nueve, menos cero coma tres dos, y menos uno coma dos cinco.",
    "Signos mezclados: es un punto silla.",
    "Sube en una dirección y baja en otra.",
    "Queremos minimizar.",
    "El punto estacionario es una silla y además está fuera: no sirve.",
    "El mínimo dentro de la región está en la frontera.",
    "Evaluando el modelo en el cubo, el menor índice se obtiene con temperatura alta, humedad media y velocidad alta: equis uno igual a uno, equis dos igual a cero, equis tres igual a uno, con un índice predicho de diez coma siete.",
    "Coincide con la corrida de menor índice observado, diez coma dos siete.",
    "Box Behnken: tres niveles, aristas más centro.",
    "Cuadráticos con signos opuestos anuncian una silla.",
    "Con una silla, o un punto fuera de la región, el óptimo se busca en la frontera."
  ],
  "huella": "9d7626a4e5fa"
});
