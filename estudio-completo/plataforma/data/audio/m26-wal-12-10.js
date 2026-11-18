/* GENERADO por tools/generar_audio.py desde tools/guiones/m26-wal-12-10.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m26-wal-12-10",
  "modulo": "m26-regresion-lineal",
  "titulo": "Ejercicio 12.10: un modelo cúbico",
  "archivo": "audio/m26-wal-12-10.mp3",
  "duracion": 177,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 19.9,
      "titulo": "El modelo ajustado"
    },
    {
      "t": 73.1,
      "titulo": "Pruebas te"
    },
    {
      "t": 94.0,
      "titulo": "Efe y erre cuadrado"
    },
    {
      "t": 123.8,
      "titulo": "Supuestos y problemas"
    },
    {
      "t": 146.3,
      "titulo": "Predicción"
    },
    {
      "t": 166.1,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Walpole · Ej. 12.10",
  "pregunta": "m26-d029",
  "orden": 10.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 3.52,
    "clave1": 6.38,
    "clave2": 13.01,
    "clave3": 15.74,
    "sal": 19.91,
    "ecuacion": 21.58,
    "interp": 32.06,
    "i1": 33.41,
    "i2": 36.73,
    "i3": 39.49,
    "deriv": 45.53,
    "tang1": 55.39,
    "tang2": 58.42,
    "pt": 73.05,
    "t1": 79.23,
    "t2": 81.91,
    "t3": 85.35,
    "f": 93.98,
    "fcalc": 95.7,
    "rcuad": 117.02,
    "r2aj": 119.65,
    "sup": 123.82,
    "lin": 125.06,
    "sw": 126.6,
    "hat": 130.05,
    "cook": 135.98,
    "pred": 146.26,
    "predcalc": 148.31,
    "predint": 158.18,
    "fin": 166.05
  },
  "frases": [
    [
      0.0,
      "Ejercicio 12 punto diez: un modelo cúbico."
    ],
    [
      3.52,
      "Hay siete puntos, con equis de cero a seis."
    ],
    [
      6.38,
      "Se pide ajustar el cúbico: b₀ + b₁ equis, más b₂ equis cuadrado, más b₃ equis al cubo."
    ],
    [
      13.01,
      "En R, cada potencia va con su i mayúscula."
    ],
    [
      15.74,
      "Y predecir ye en equis igual a dos."
    ],
    [
      19.91,
      "La salida."
    ],
    [
      21.58,
      "ŷ = 1,07 + 4,6 por equis, −1,85 por equis al cuadrado, +0,194 por equis al cubo."
    ],
    [
      32.06,
      "Interpretación."
    ],
    [
      33.41,
      "Con un cúbico, la curva sube, baja y vuelve a subir."
    ],
    [
      36.73,
      "Ningún coeficiente es un efecto por sí solo."
    ],
    [
      39.49,
      "El intercepto sí está en el rango: en equis igual a cero, ŷ vale 1,07."
    ],
    [
      45.53,
      "La derivada ahora tiene tres términos: 4,6 − 2 · 1,85 por equis, más 3 · 0,194 por equis al cuadrado."
    ],
    [
      55.39,
      "En equis igual a uno vale 1,5: sube."
    ],
    [
      58.42,
      "En cinco vale 0,73: vuelve a subir, después de haber bajado entre medio."
    ],
    [
      63.84,
      "Igualando la derivada a cero salen dos puntos: un máximo cerca de 1,7 y un mínimo cerca de 4,6."
    ],
    [
      73.05,
      "Siete datos y cuatro parámetros: solo tres grados de libertad."
    ],
    [
      77.05,
      "El crítico es 3,18."
    ],
    [
      79.23,
      "Lineal, t 4,5, se rechaza."
    ],
    [
      81.91,
      "Cuadrático, te −4,4, se rechaza."
    ],
    [
      85.35,
      "Cúbico, t 4,25, p 0,024, se rechaza: el término cúbico es necesario."
    ],
    [
      93.98,
      "Y aquí una sorpresa."
    ],
    [
      95.7,
      "La F global es siete, pero el crítico con tres y tres grados de libertad es 9,28."
    ],
    [
      101.46,
      "p 0,07: no se rechaza."
    ],
    [
      103.92,
      "Cada término es significativo, pero el modelo en conjunto no alcanza."
    ],
    [
      108.74,
      "¿Por qué?"
    ],
    [
      109.56,
      "Con tres grados de libertad en el error, el crítico de F es enorme."
    ],
    [
      113.72,
      "Hay muy poca información para estimar la varianza."
    ],
    [
      117.02,
      "R² 0,875."
    ],
    [
      119.65,
      "Ajustado 0,75."
    ],
    [
      123.82,
      "Supuestos."
    ],
    [
      125.06,
      "Residuos sin forma."
    ],
    [
      126.6,
      "Shapiro: 0,36, no se rechaza."
    ],
    [
      130.05,
      "Con cuatro parámetros y siete datos, el corte de apalancamiento supera uno, así que no marca nada."
    ],
    [
      135.98,
      "Pero el último dato tiene Cook 6,9: muy influyente."
    ],
    [
      140.01,
      "Con tan pocos puntos, un dato del borde decide la forma de la curva."
    ],
    [
      146.26,
      "Predicción en equis igual a dos."
    ],
    [
      148.31,
      "1,07 + 4,6 · 2 − 1,85 · 4 + 0,194 · 8."
    ],
    [
      156.22,
      "Da 4,45."
    ],
    [
      158.18,
      "El intervalo para la media va de tres a 5,9: ancho, por los pocos grados de libertad."
    ],
    [
      166.05,
      "Con polinomios de grado alto y pocos datos, cuidado: cada término puede salir significativo y el F no, un solo punto puede ser muy influyente, y los intervalos son anchos."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio doce punto diez: un modelo cúbico.",
    "Hay siete puntos, con equis de cero a seis.",
    "Se pide ajustar el cúbico: be cero, más be uno equis, más be dos equis cuadrado, más be tres equis al cubo.",
    "En erre, cada potencia va con su i mayúscula.",
    "Y predecir ye en equis igual a dos.",
    "La salida.",
    "Ye gorro igual a uno coma cero siete, más cuatro coma seis por equis, menos uno coma ocho cinco por equis al cuadrado, más cero coma uno nueve cuatro por equis al cubo.",
    "Interpretación.",
    "Con un cúbico, la curva sube, baja y vuelve a subir.",
    "Ningún coeficiente es un efecto por sí solo.",
    "El intercepto sí está en el rango: en equis igual a cero, ye gorro vale uno coma cero siete.",
    "La derivada ahora tiene tres términos: cuatro coma seis, menos dos por uno coma ocho cinco por equis, más tres por cero coma uno nueve cuatro por equis al cuadrado.",
    "En equis igual a uno vale uno coma cinco: sube.",
    "En cinco vale cero coma siete tres: vuelve a subir, después de haber bajado entre medio.",
    "Igualando la derivada a cero salen dos puntos: un máximo cerca de uno coma siete y un mínimo cerca de cuatro coma seis.",
    "Siete datos y cuatro parámetros: solo tres grados de libertad.",
    "El crítico es tres coma uno ocho.",
    "Lineal, te cuatro coma cinco, se rechaza.",
    "Cuadrático, te menos cuatro coma cuatro, se rechaza.",
    "Cúbico, te cuatro coma dos cinco, pe cero coma cero dos cuatro, se rechaza: el término cúbico es necesario.",
    "Y aquí una sorpresa.",
    "La efe global es siete, pero el crítico con tres y tres grados de libertad es nueve coma dos ocho.",
    "Pe cero coma cero siete: no se rechaza.",
    "Cada término es significativo, pero el modelo en conjunto no alcanza.",
    "¿Por qué?",
    "Con tres grados de libertad en el error, el crítico de efe es enorme.",
    "Hay muy poca información para estimar la varianza.",
    "Erre cuadrado cero coma ocho siete cinco.",
    "Ajustado cero coma siete cinco.",
    "Supuestos.",
    "Residuos sin forma.",
    "Shapiro: cero coma tres seis, no se rechaza.",
    "Con cuatro parámetros y siete datos, el corte de apalancamiento supera uno, así que no marca nada.",
    "Pero el último dato tiene Cook seis coma nueve: muy influyente.",
    "Con tan pocos puntos, un dato del borde decide la forma de la curva.",
    "Predicción en equis igual a dos.",
    "Uno coma cero siete, más cuatro coma seis por dos, menos uno coma ocho cinco por cuatro, más cero coma uno nueve cuatro por ocho.",
    "Da cuatro coma cuatro cinco.",
    "El intervalo para la media va de tres a cinco coma nueve: ancho, por los pocos grados de libertad.",
    "Con polinomios de grado alto y pocos datos, cuidado: cada término puede salir significativo y el efe no, un solo punto puede ser muy influyente, y los intervalos son anchos."
  ],
  "huella": "fd355e35513b"
});
