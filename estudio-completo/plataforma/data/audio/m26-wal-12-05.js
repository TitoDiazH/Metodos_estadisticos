/* GENERADO por tools/generar_audio.py desde tools/guiones/m26-wal-12-05.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m26-wal-12-05",
  "modulo": "m26-regresion-lineal",
  "titulo": "Ejercicio 12.5: energía de una planta química",
  "archivo": "audio/m26-wal-12-05.mp3",
  "duracion": 197,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 26.2,
      "titulo": "El modelo ajustado"
    },
    {
      "t": 63.3,
      "titulo": "Pruebas te"
    },
    {
      "t": 88.3,
      "titulo": "Efe y erre cuadrado"
    },
    {
      "t": 126.1,
      "titulo": "Supuestos y problemas"
    },
    {
      "t": 158.0,
      "titulo": "Predicción"
    },
    {
      "t": 177.2,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Walpole · Ej. 12.5",
  "pregunta": "m26-d014",
  "orden": 5.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 4.67,
    "clave1": 6.99,
    "clave2": 9.78,
    "clave3": 15.93,
    "sal": 26.22,
    "ecuacion": 27.88,
    "interp": 41.21,
    "i1": 42.56,
    "i2": 47.67,
    "i3": 50.2,
    "i4": 52.8,
    "i5": 55.59,
    "pt": 63.29,
    "t1": 69.42,
    "t2": 74.37,
    "t3": 78.52,
    "t4": 80.79,
    "f": 88.33,
    "fcalc": 89.92,
    "rcuad": 115.46,
    "r2aj": 117.85,
    "sup": 126.1,
    "lin": 127.34,
    "sw": 129.83,
    "vif": 134.33,
    "vifv": 136.19,
    "hat": 145.48,
    "cook": 153.63,
    "pred": 158.04,
    "predcalc": 160.01,
    "predint": 165.55,
    "fin": 177.22
  },
  "frases": [
    [
      0.0,
      "Ejercicio 12 punto cinco: el consumo de energía de una planta."
    ],
    [
      4.67,
      "Se tienen 12 meses de datos."
    ],
    [
      6.99,
      "La respuesta es el consumo eléctrico mensual."
    ],
    [
      9.78,
      "Y hay cuatro regresores: temperatura, días del mes, pureza del producto y toneladas fabricadas."
    ],
    [
      15.93,
      "Se pide el modelo y predecir un mes con 75 grados, 24 días, 90 % de pureza y 98 toneladas."
    ],
    [
      26.22,
      "La salida."
    ],
    [
      27.88,
      "ŷ igual a −102,7 + 0,6 por la temperatura, +8,9 por los días, +1,4 por la pureza, +0,01 por las toneladas."
    ],
    [
      39.35,
      "Igual que el libro."
    ],
    [
      41.21,
      "Interpretación."
    ],
    [
      42.56,
      "Cada grado más sube el consumo en 0,6 unidades, con todo lo demás fijo."
    ],
    [
      47.67,
      "Cada día más del mes, 8,9."
    ],
    [
      50.2,
      "Cada punto de pureza, 1,4."
    ],
    [
      52.8,
      "Y cada tonelada, apenas 0,01."
    ],
    [
      55.59,
      "El intercepto no se interpreta: cero grados, cero días y cero toneladas no tienen sentido."
    ],
    [
      63.29,
      "Aquí viene lo interesante."
    ],
    [
      65.04,
      "12 datos −5 parámetros: siete grados de libertad."
    ],
    [
      69.42,
      "Temperatura: t 1,64, p 0,14: no se rechaza."
    ],
    [
      74.37,
      "Días: t 1,68, p 0,13: no se rechaza."
    ],
    [
      78.52,
      "Pureza: p 0,57."
    ],
    [
      80.79,
      "Toneladas: p 0,99."
    ],
    [
      83.32,
      "Ninguna variable es significativa por separado."
    ],
    [
      88.33,
      "¿Y el modelo completo?"
    ],
    [
      89.92,
      "F = 5,1, contra un crítico de 4,12, p 0,03."
    ],
    [
      95.66,
      "Se rechaza: el modelo en conjunto sí explica el consumo."
    ],
    [
      99.9,
      "¿Cómo puede ser?"
    ],
    [
      101.11,
      "El F dice que las cuatro juntas explican algo, pero con solo 12 meses no hay información suficiente para separar el aporte de cada una."
    ],
    [
      109.88,
      "Cada t pregunta si una variable aporta algo extra cuando ya están las otras tres."
    ],
    [
      115.46,
      "R² 0,74."
    ],
    [
      117.85,
      "Pero el ajustado cae a 0,6."
    ],
    [
      120.38,
      "Esa caída grande es la señal de que hay parámetros que sobran."
    ],
    [
      126.1,
      "Supuestos."
    ],
    [
      127.34,
      "Los residuos no muestran forma clara."
    ],
    [
      129.83,
      "Shapiro da 0,39: no se rechaza la normalidad."
    ],
    [
      134.33,
      "¿Será multicolinealidad?"
    ],
    [
      136.19,
      "Los VIF van de uno a 2,3: no."
    ],
    [
      138.96,
      "El problema aquí no es la correlación entre variables, sino tener pocos datos para tantos parámetros."
    ],
    [
      145.48,
      "El corte de apalancamiento es alto, 0,83, porque hay muchos parámetros para pocos datos; el mes dos lo supera apenas."
    ],
    [
      153.63,
      "Ninguna distancia de Cook pasa de uno."
    ],
    [
      158.04,
      "La predicción que pide el libro."
    ],
    [
      160.01,
      "Reemplazando, da 287,6, igual que la respuesta del libro."
    ],
    [
      165.55,
      "Pero mira el intervalo de predicción: de 244 a 331."
    ],
    [
      171.78,
      "Es muy ancho, coherente con un modelo de pocos datos."
    ],
    [
      177.22,
      "La lección de este ejercicio: un F significativo con todos los t no significativos es posible."
    ],
    [
      183.21,
      "Puede ser multicolinealidad, que se revisa con el VIF, o simplemente muy pocos datos para tantos parámetros, como aquí."
    ],
    [
      190.98,
      "La salida razonable es un modelo más simple, que es lo que hace la segunda variante en Desarrollo."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio doce punto cinco: el consumo de energía de una planta.",
    "Se tienen doce meses de datos.",
    "La respuesta es el consumo eléctrico mensual.",
    "Y hay cuatro regresores: temperatura, días del mes, pureza del producto y toneladas fabricadas.",
    "Se pide el modelo y predecir un mes con setenta y cinco grados, veinticuatro días, noventa por ciento de pureza y noventa y ocho toneladas.",
    "La salida.",
    "Ye gorro igual a menos ciento dos coma siete, más cero coma seis por la temperatura, más ocho coma nueve por los días, más uno coma cuatro por la pureza, más cero coma cero uno por las toneladas.",
    "Igual que el libro.",
    "Interpretación.",
    "Cada grado más sube el consumo en cero coma seis unidades, con todo lo demás fijo.",
    "Cada día más del mes, ocho coma nueve.",
    "Cada punto de pureza, uno coma cuatro.",
    "Y cada tonelada, apenas cero coma cero uno.",
    "El intercepto no se interpreta: cero grados, cero días y cero toneladas no tienen sentido.",
    "Aquí viene lo interesante.",
    "Doce datos menos cinco parámetros: siete grados de libertad.",
    "Temperatura: te uno coma seis cuatro, pe cero coma uno cuatro: no se rechaza.",
    "Días: te uno coma seis ocho, pe cero coma uno tres: no se rechaza.",
    "Pureza: pe cero coma cinco siete.",
    "Toneladas: pe cero coma nueve nueve.",
    "Ninguna variable es significativa por separado.",
    "¿Y el modelo completo?",
    "Efe igual a cinco coma uno, contra un crítico de cuatro coma uno dos, pe cero coma cero tres.",
    "Se rechaza: el modelo en conjunto sí explica el consumo.",
    "¿Cómo puede ser?",
    "El efe dice que las cuatro juntas explican algo, pero con solo doce meses no hay información suficiente para separar el aporte de cada una.",
    "Cada te pregunta si una variable aporta algo extra cuando ya están las otras tres.",
    "Erre cuadrado cero coma siete cuatro.",
    "Pero el ajustado cae a cero coma seis.",
    "Esa caída grande es la señal de que hay parámetros que sobran.",
    "Supuestos.",
    "Los residuos no muestran forma clara.",
    "Shapiro da cero coma tres nueve: no se rechaza la normalidad.",
    "¿Será multicolinealidad?",
    "Los ve i efe van de uno a dos coma tres: no.",
    "El problema aquí no es la correlación entre variables, sino tener pocos datos para tantos parámetros.",
    "El corte de apalancamiento es alto, cero coma ocho tres, porque hay muchos parámetros para pocos datos; el mes dos lo supera apenas.",
    "Ninguna distancia de Cook pasa de uno.",
    "La predicción que pide el libro.",
    "Reemplazando, da doscientos ochenta y siete coma seis, igual que la respuesta del libro.",
    "Pero mira el intervalo de predicción: de doscientos cuarenta y cuatro a trescientos treinta y uno.",
    "Es muy ancho, coherente con un modelo de pocos datos.",
    "La lección de este ejercicio: un efe significativo con todos los te no significativos es posible.",
    "Puede ser multicolinealidad, que se revisa con el ve i efe, o simplemente muy pocos datos para tantos parámetros, como aquí.",
    "La salida razonable es un modelo más simple, que es lo que hace la segunda variante en Desarrollo."
  ],
  "huella": "94b44c440974"
});
