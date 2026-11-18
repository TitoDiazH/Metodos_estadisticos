/* GENERADO por tools/generar_audio.py desde tools/guiones/m26-wal-12-04.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m26-wal-12-04",
  "modulo": "m26-regresion-lineal",
  "titulo": "Ejercicio 12.4: peso final de un animal",
  "archivo": "audio/m26-wal-12-04.mp3",
  "duracion": 185,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 21.8,
      "titulo": "El modelo ajustado"
    },
    {
      "t": 54.1,
      "titulo": "Pruebas te"
    },
    {
      "t": 100.7,
      "titulo": "Efe y erre cuadrado"
    },
    {
      "t": 117.1,
      "titulo": "Supuestos y problemas"
    },
    {
      "t": 146.1,
      "titulo": "Predicción"
    },
    {
      "t": 171.8,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Walpole · Ej. 12.4",
  "pregunta": "m26-d011",
  "orden": 4.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 3.74,
    "clave1": 6.81,
    "clave2": 9.44,
    "clave3": 13.99,
    "sal": 21.77,
    "ecuacion": 23.43,
    "interp": 30.78,
    "i1": 32.14,
    "i2": 39.0,
    "i3": 45.22,
    "pt": 54.07,
    "t1": 58.48,
    "t2": 67.09,
    "alfa": 73.98,
    "alfacalc": 84.43,
    "alfadec": 91.64,
    "f": 100.74,
    "fcalc": 101.87,
    "rcuad": 110.64,
    "r2aj": 112.97,
    "sup": 117.12,
    "lin": 118.35,
    "sw": 119.9,
    "vif": 126.21,
    "vifv": 126.81,
    "hat": 130.8,
    "cook": 134.32,
    "pred": 146.1,
    "predcalc": 150.51,
    "predint": 159.48,
    "fin": 171.76
  },
  "frases": [
    [
      0.0,
      "Ejercicio 12 punto cuatro: el peso de un animal."
    ],
    [
      3.74,
      "Se quiere predecir el peso final de diez animales."
    ],
    [
      6.81,
      "La respuesta es el peso final, en kilos."
    ],
    [
      9.44,
      "Los regresores, el peso inicial y la cantidad de alimento consumido."
    ],
    [
      13.99,
      "Y se pide predecir el peso de un animal que parte con 35 kilos y come 250."
    ],
    [
      21.77,
      "La salida."
    ],
    [
      23.43,
      "ŷ igual a −23 + 1,4 por el peso inicial, +0,22 por el alimento."
    ],
    [
      30.78,
      "Interpretación."
    ],
    [
      32.14,
      "Por cada kilo más de peso inicial, el peso final sube en promedio 1,4 kilos, con el alimento fijo."
    ],
    [
      39.0,
      "Por cada kilo más de alimento, el peso final sube 0,22 kilos, con el peso inicial fijo."
    ],
    [
      45.22,
      "El intercepto, menos 23, sería un animal que parte pesando cero y no come."
    ],
    [
      50.29,
      "No tiene sentido físico."
    ],
    [
      54.07,
      "Siete grados de libertad, crítico 2,365."
    ],
    [
      58.48,
      "Peso inicial: t 2,4, p 0,048."
    ],
    [
      62.6,
      "Se rechaza, justo bajo el 5 %: el peso inicial influye."
    ],
    [
      67.09,
      "Alimento: t 3,76, p 0,007."
    ],
    [
      71.09,
      "Se rechaza: el alimento influye."
    ],
    [
      73.98,
      "Una pregunta tipo instructivo: ¿cada kilo inicial se traduce en exactamente un kilo final?"
    ],
    [
      79.73,
      "Eso es β₁ igual a uno, y el t de R no sirve porque compara con cero."
    ],
    [
      84.43,
      "A mano: 1,396 − 1 / 0,5825."
    ],
    [
      89.87,
      "Da 0,68."
    ],
    [
      91.64,
      "Muy lejos del crítico, p 0,52: no se rechaza."
    ],
    [
      95.5,
      "Es compatible con que cada kilo inicial dé un kilo final."
    ],
    [
      100.74,
      "F global."
    ],
    [
      101.87,
      "24, contra un crítico de 4,74, p 0,0007."
    ],
    [
      107.86,
      "Se rechaza: el modelo sirve."
    ],
    [
      110.64,
      "R² 0,87."
    ],
    [
      112.97,
      "Ajustado 0,84."
    ],
    [
      117.12,
      "Supuestos."
    ],
    [
      118.35,
      "Residuos sin forma."
    ],
    [
      119.9,
      "Shapiro da 0,999: los residuos son perfectamente compatibles con la normal."
    ],
    [
      126.21,
      "VIF, 1,57."
    ],
    [
      128.4,
      "Sin problema."
    ],
    [
      130.8,
      "Nadie pasa el corte de apalancamiento de 0,6."
    ],
    [
      134.32,
      "Y la mayor distancia de Cook es la del animal siete, 0,9, cerca de uno pero bajo el corte."
    ],
    [
      140.53,
      "Conviene mirarlo: es el que pesó solo 50 kilos."
    ],
    [
      146.1,
      "Predicción para 35 kilos iniciales y 250 de alimento."
    ],
    [
      150.51,
      "Menos 23 + 1,4 · 35 + 0,22 · 250."
    ],
    [
      157.31,
      "Da 80,3 kilos."
    ],
    [
      159.48,
      "El peso medio de animales así está entre 73,7 y 86,8."
    ],
    [
      165.06,
      "Para un animal individual, entre 64,5 y 96."
    ],
    [
      171.76,
      "Lo nuevo aquí fue la prueba contra un valor distinto de cero: se resta el valor de la hipótesis antes de dividir por el error estándar."
    ],
    [
      179.62,
      "Ese cálculo no aparece en la salida de R, y es justo lo que puede pedir la prueba."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio doce punto cuatro: el peso de un animal.",
    "Se quiere predecir el peso final de diez animales.",
    "La respuesta es el peso final, en kilos.",
    "Los regresores, el peso inicial y la cantidad de alimento consumido.",
    "Y se pide predecir el peso de un animal que parte con treinta y cinco kilos y come doscientos cincuenta.",
    "La salida.",
    "Ye gorro igual a menos veintitrés, más uno coma cuatro por el peso inicial, más cero coma dos dos por el alimento.",
    "Interpretación.",
    "Por cada kilo más de peso inicial, el peso final sube en promedio uno coma cuatro kilos, con el alimento fijo.",
    "Por cada kilo más de alimento, el peso final sube cero coma dos dos kilos, con el peso inicial fijo.",
    "El intercepto, menos veintitrés, sería un animal que parte pesando cero y no come.",
    "No tiene sentido físico.",
    "Siete grados de libertad, crítico dos coma tres seis cinco.",
    "Peso inicial: te dos coma cuatro, pe cero coma cero cuatro ocho.",
    "Se rechaza, justo bajo el cinco por ciento: el peso inicial influye.",
    "Alimento: te tres coma siete seis, pe cero coma cero cero siete.",
    "Se rechaza: el alimento influye.",
    "Una pregunta tipo instructivo: ¿cada kilo inicial se traduce en exactamente un kilo final?",
    "Eso es beta uno igual a uno, y el te de erre no sirve porque compara con cero.",
    "A mano: uno coma tres nueve seis menos uno, dividido en cero coma cinco ocho dos cinco.",
    "Da cero coma seis ocho.",
    "Muy lejos del crítico, pe cero coma cinco dos: no se rechaza.",
    "Es compatible con que cada kilo inicial dé un kilo final.",
    "Efe global.",
    "Veinticuatro, contra un crítico de cuatro coma siete cuatro, pe cero coma cero cero cero siete.",
    "Se rechaza: el modelo sirve.",
    "Erre cuadrado cero coma ocho siete.",
    "Ajustado cero coma ocho cuatro.",
    "Supuestos.",
    "Residuos sin forma.",
    "Shapiro da cero coma nueve nueve nueve: los residuos son perfectamente compatibles con la normal.",
    "Ve i efe, uno coma cinco siete.",
    "Sin problema.",
    "Nadie pasa el corte de apalancamiento de cero coma seis.",
    "Y la mayor distancia de Cook es la del animal siete, cero coma nueve, cerca de uno pero bajo el corte.",
    "Conviene mirarlo: es el que pesó solo cincuenta kilos.",
    "Predicción para treinta y cinco kilos iniciales y doscientos cincuenta de alimento.",
    "Menos veintitrés, más uno coma cuatro por treinta y cinco, más cero coma dos dos por doscientos cincuenta.",
    "Da ochenta coma tres kilos.",
    "El peso medio de animales así está entre setenta y tres coma siete y ochenta y seis coma ocho.",
    "Para un animal individual, entre sesenta y cuatro coma cinco y noventa y seis.",
    "Lo nuevo aquí fue la prueba contra un valor distinto de cero: se resta el valor de la hipótesis antes de dividir por el error estándar.",
    "Ese cálculo no aparece en la salida de erre, y es justo lo que puede pedir la prueba."
  ],
  "huella": "27f1ef7deea3"
});
