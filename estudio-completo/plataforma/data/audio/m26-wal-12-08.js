/* GENERADO por tools/generar_audio.py desde tools/guiones/m26-wal-12-08.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m26-wal-12-08",
  "modulo": "m26-regresion-lineal",
  "titulo": "Ejercicio 12.8: resistencia de una aleación y falta de ajuste",
  "archivo": "audio/m26-wal-12-08.mp3",
  "duracion": 175,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 21.4,
      "titulo": "El modelo ajustado"
    },
    {
      "t": 65.6,
      "titulo": "Pruebas te"
    },
    {
      "t": 79.8,
      "titulo": "Efe y erre cuadrado"
    },
    {
      "t": 94.7,
      "titulo": "Supuestos y problemas"
    },
    {
      "t": 110.5,
      "titulo": "Falta de ajuste"
    },
    {
      "t": 161.2,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Walpole · Ej. 12.8",
  "pregunta": "m26-d023",
  "orden": 8.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 5.19,
    "clave1": 8.03,
    "clave2": 10.77,
    "clave3": 13.29,
    "sal": 21.37,
    "ecuacion": 23.03,
    "interp": 30.87,
    "i1": 32.22,
    "i2": 36.01,
    "i3": 41.09,
    "deriv": 45.3,
    "tang1": 49.84,
    "tang2": 54.15,
    "vert": 56.3,
    "pt": 65.56,
    "t1": 67.33,
    "t2": 71.75,
    "f": 79.77,
    "fcalc": 80.9,
    "rcuad": 86.18,
    "r2aj": 88.41,
    "sup": 94.68,
    "lin": 95.92,
    "sw": 97.47,
    "hat": 103.65,
    "cook": 106.69,
    "lof": 110.54,
    "lofcalc": 130.04,
    "lofdec": 143.82,
    "fin": 161.23
  },
  "frases": [
    [
      0.0,
      "Ejercicio 12 punto ocho: resistencia a la compresión de una aleación."
    ],
    [
      5.19,
      "Se probaron cinco concentraciones de un aditivo."
    ],
    [
      8.03,
      "La respuesta es la resistencia a la compresión."
    ],
    [
      10.77,
      "Y hay tres réplicas en cada concentración."
    ],
    [
      13.29,
      "Se pide un modelo cuadrático y probar la falta de ajuste."
    ],
    [
      16.92,
      "Las réplicas son las que lo hacen posible."
    ],
    [
      21.37,
      "La salida."
    ],
    [
      23.03,
      "ŷ = 19 + 1,01 por equis, −0,0204 por equis al cuadrado."
    ],
    [
      30.87,
      "Interpretación."
    ],
    [
      32.22,
      "Cuadrático negativo: parábola hacia abajo, con un máximo."
    ],
    [
      36.01,
      "La resistencia sube con el aditivo, pero cada vez menos, hasta empezar a bajar."
    ],
    [
      41.09,
      "El intercepto, concentración cero, está fuera del rango."
    ],
    [
      45.3,
      "Derivada: 1,01 − 0,041 por equis."
    ],
    [
      49.84,
      "En 15 vale 0,4: todavía conviene agregar aditivo."
    ],
    [
      54.15,
      "En 25 ya es casi cero."
    ],
    [
      56.3,
      "Igualando a cero, el máximo está en 24,7, con una resistencia predicha de 31,5."
    ],
    [
      65.56,
      "12 grados de libertad."
    ],
    [
      67.33,
      "Lineal: t 2,83, p 0,015, se rechaza."
    ],
    [
      71.75,
      "Cuadrático: te −2,31, p 0,039, se rechaza: hay curvatura."
    ],
    [
      79.77,
      "F global."
    ],
    [
      80.9,
      "9,5, p 0,003: se rechaza, el modelo sirve."
    ],
    [
      86.18,
      "R² 0,61."
    ],
    [
      88.41,
      "Ajustado 0,55."
    ],
    [
      90.64,
      "Parece poco, pero veamos por qué."
    ],
    [
      94.68,
      "Supuestos."
    ],
    [
      95.92,
      "Residuos sin forma."
    ],
    [
      97.47,
      "Shapiro: 0,096, no se rechaza al 5 %, aunque está cerca."
    ],
    [
      103.65,
      "Apalancamiento bajo el corte de 0,4."
    ],
    [
      106.69,
      "Y ningún Cook pasa de uno."
    ],
    [
      110.54,
      "Ahora lo propio del ejercicio."
    ],
    [
      112.57,
      "Como hay tres réplicas por concentración, la suma de cuadrados del error se separa en dos."
    ],
    [
      117.87,
      "El error puro: cuánto varían entre sí las réplicas de una misma concentración, que no depende del modelo."
    ],
    [
      124.33,
      "Y la falta de ajuste: cuánto se alejan las medias de cada concentración de la curva."
    ],
    [
      130.04,
      "El error total es 24,5."
    ],
    [
      132.68,
      "El error puro es 24,4, con diez grados de libertad."
    ],
    [
      136.96,
      "La falta de ajuste es apenas 0,1, con dos grados de libertad."
    ],
    [
      141.39,
      "El F es 0,02."
    ],
    [
      143.82,
      "Con p = 0,98, no se rechaza la hipótesis de que el modelo cuadrático es adecuado."
    ],
    [
      150.26,
      "Y ahora se entiende el R² modesto: casi todo lo que el modelo no explica es variación entre réplicas, que ningún modelo podría explicar."
    ],
    [
      161.23,
      "La prueba de falta de ajuste necesita réplicas."
    ],
    [
      164.26,
      "Separa el error en puro y falta de ajuste, y compara los dos."
    ],
    [
      168.15,
      "Si no es significativa, el modelo describe bien la forma, aunque el R² no sea alto."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio doce punto ocho: resistencia a la compresión de una aleación.",
    "Se probaron cinco concentraciones de un aditivo.",
    "La respuesta es la resistencia a la compresión.",
    "Y hay tres réplicas en cada concentración.",
    "Se pide un modelo cuadrático y probar la falta de ajuste.",
    "Las réplicas son las que lo hacen posible.",
    "La salida.",
    "Ye gorro igual a diecinueve, más uno coma cero uno por equis, menos cero coma cero dos cero cuatro por equis al cuadrado.",
    "Interpretación.",
    "Cuadrático negativo: parábola hacia abajo, con un máximo.",
    "La resistencia sube con el aditivo, pero cada vez menos, hasta empezar a bajar.",
    "El intercepto, concentración cero, está fuera del rango.",
    "Derivada: uno coma cero uno menos cero coma cero cuatro uno por equis.",
    "En quince vale cero coma cuatro: todavía conviene agregar aditivo.",
    "En veinticinco ya es casi cero.",
    "Igualando a cero, el máximo está en veinticuatro coma siete, con una resistencia predicha de treinta y uno coma cinco.",
    "Doce grados de libertad.",
    "Lineal: te dos coma ocho tres, pe cero coma cero uno cinco, se rechaza.",
    "Cuadrático: te menos dos coma tres uno, pe cero coma cero tres nueve, se rechaza: hay curvatura.",
    "Efe global.",
    "Nueve coma cinco, pe cero coma cero cero tres: se rechaza, el modelo sirve.",
    "Erre cuadrado cero coma seis uno.",
    "Ajustado cero coma cinco cinco.",
    "Parece poco, pero veamos por qué.",
    "Supuestos.",
    "Residuos sin forma.",
    "Shapiro: cero coma cero nueve seis, no se rechaza al cinco por ciento, aunque está cerca.",
    "Apalancamiento bajo el corte de cero coma cuatro.",
    "Y ningún Cook pasa de uno.",
    "Ahora lo propio del ejercicio.",
    "Como hay tres réplicas por concentración, la suma de cuadrados del error se separa en dos.",
    "El error puro: cuánto varían entre sí las réplicas de una misma concentración, que no depende del modelo.",
    "Y la falta de ajuste: cuánto se alejan las medias de cada concentración de la curva.",
    "El error total es veinticuatro coma cinco.",
    "El error puro es veinticuatro coma cuatro, con diez grados de libertad.",
    "La falta de ajuste es apenas cero coma uno, con dos grados de libertad.",
    "El efe es cero coma cero dos.",
    "Con pe igual a cero coma nueve ocho, no se rechaza la hipótesis de que el modelo cuadrático es adecuado.",
    "Y ahora se entiende el erre cuadrado modesto: casi todo lo que el modelo no explica es variación entre réplicas, que ningún modelo podría explicar.",
    "La prueba de falta de ajuste necesita réplicas.",
    "Separa el error en puro y falta de ajuste, y compara los dos.",
    "Si no es significativa, el modelo describe bien la forma, aunque el erre cuadrado no sea alto."
  ],
  "huella": "23a1e4d92575"
});
