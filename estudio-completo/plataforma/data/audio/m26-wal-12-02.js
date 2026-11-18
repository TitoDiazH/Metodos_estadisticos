/* GENERADO por tools/generar_audio.py desde tools/guiones/m26-wal-12-02.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m26-wal-12-02",
  "modulo": "m26-regresion-lineal",
  "titulo": "Ejercicio 12.2: densidad óptica de un lubricante",
  "archivo": "audio/m26-wal-12-02.mp3",
  "duracion": 202,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 30.8,
      "titulo": "El modelo ajustado"
    },
    {
      "t": 79.4,
      "titulo": "Pruebas te"
    },
    {
      "t": 105.7,
      "titulo": "Efe y erre cuadrado"
    },
    {
      "t": 133.6,
      "titulo": "Supuestos y problemas"
    },
    {
      "t": 187.2,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Walpole · Ej. 12.2",
  "pregunta": "m26-d005",
  "orden": 2.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 6.64,
    "clave1": 11.43,
    "clave2": 14.12,
    "clave3": 19.85,
    "sal": 30.77,
    "ecuacion": 32.87,
    "interp": 43.0,
    "i1": 44.38,
    "i2": 59.93,
    "i3": 65.96,
    "pt": 79.39,
    "t1": 86.17,
    "t2": 95.85,
    "f": 105.67,
    "fcalc": 109.0,
    "rcuad": 119.17,
    "r2aj": 125.46,
    "sup": 133.61,
    "lin": 134.85,
    "sw": 148.51,
    "vif": 153.42,
    "vifv": 154.96,
    "hat": 167.47,
    "cook": 172.55,
    "fin": 187.21
  },
  "frases": [
    [
      0.0,
      "Ejercicio 12 punto dos de Walpole."
    ],
    [
      2.47,
      "Ahora el método ya lo conoces, así que vamos más directo."
    ],
    [
      6.64,
      "Se estudió la densidad óptica de un lubricante, medida con un espectrómetro."
    ],
    [
      11.43,
      "La respuesta es la densidad óptica, ye."
    ],
    [
      14.12,
      "Los regresores son la frecuencia de banda, x₁, y el espesor de la película, x₂."
    ],
    [
      19.85,
      "Fíjate en la tabla: hay cuatro frecuencias y tres espesores, y cada frecuencia se probó con los tres espesores."
    ],
    [
      26.95,
      "Eso va a importar al final."
    ],
    [
      30.77,
      "Esta es la salida de R."
    ],
    [
      32.87,
      "El modelo ajustado es ŷ igual a −3,37 + 0,0036 por la frecuencia, +0,95 por el espesor."
    ],
    [
      43.0,
      "Interpretemos."
    ],
    [
      44.38,
      "Por cada unidad más de frecuencia, la densidad óptica sube en promedio 0,0036, con el espesor fijo."
    ],
    [
      51.8,
      "Parece poco, pero la frecuencia va de 740 a 1235: en ese rango sube casi 1,8."
    ],
    [
      59.93,
      "Por cada milímetro más de espesor, la densidad sube 0,95, con la frecuencia fija."
    ],
    [
      65.96,
      "El intercepto, −3,37, sería la densidad con frecuencia cero y espesor cero."
    ],
    [
      71.86,
      "Está fuera del rango, y además una densidad negativa es imposible."
    ],
    [
      76.03,
      "No se interpreta."
    ],
    [
      79.39,
      "Con 12 datos y dos variables quedan nueve grados de libertad, y el t crítico es 2,262."
    ],
    [
      86.17,
      "Frecuencia: t = 5,91, p 0,0002."
    ],
    [
      91.13,
      "Se rechaza la hipótesis nula: la frecuencia influye en la densidad óptica."
    ],
    [
      95.85,
      "Espesor: t 2,63, p 0,028."
    ],
    [
      99.63,
      "También se rechaza, aunque con menos holgura: el espesor influye."
    ],
    [
      105.67,
      "La F global prueba si ambos betas son cero a la vez."
    ],
    [
      109.0,
      "Da 20,9, contra un crítico de 4,26, con p 0,0004."
    ],
    [
      115.33,
      "Se rechaza: el modelo explica la densidad óptica."
    ],
    [
      119.17,
      "El R² es 0,82: el modelo explica el 82 % de la variabilidad."
    ],
    [
      125.46,
      "El ajustado baja a 0,78."
    ],
    [
      128.12,
      "Es una caída razonable para 12 datos y dos regresores."
    ],
    [
      133.61,
      "Supuestos."
    ],
    [
      134.85,
      "En el gráfico de residuos, mira el punto marcado: el último dato tiene un residuo grande, y los residuos crecen con el valor ajustado."
    ],
    [
      143.05,
      "Es una señal de que la varianza no es constante y de que la relación tal vez no sea un plano."
    ],
    [
      148.51,
      "Shapiro Wilk da p 0,27: no se rechaza la normalidad."
    ],
    [
      153.42,
      "Ahora el VIF."
    ],
    [
      154.96,
      "Los dos valen exactamente uno."
    ],
    [
      157.12,
      "¿Por qué?"
    ],
    [
      157.94,
      "Porque el diseño cruza todas las frecuencias con todos los espesores: las dos variables no están correlacionadas."
    ],
    [
      164.76,
      "No hay nada de multicolinealidad."
    ],
    [
      167.47,
      "Apalancamiento: el corte es 0,5, y ninguna observación lo supera."
    ],
    [
      172.55,
      "Pero la distancia de Cook del dato diez, frecuencia 1235 y espesor 1,1, es 1,68."
    ],
    [
      180.38,
      "Es influyente: es el valor más alto de toda la tabla y tira el plano hacia él."
    ],
    [
      187.21,
      "En resumen: el modelo es significativo y ambas variables influyen, el VIF es uno porque el diseño es cruzado, y el dato diez es influyente, lo que junto al patrón de los residuos sugiere que un plano no captura del todo cómo crece la densidad."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio doce punto dos de Walpole.",
    "Ahora el método ya lo conoces, así que vamos más directo.",
    "Se estudió la densidad óptica de un lubricante, medida con un espectrómetro.",
    "La respuesta es la densidad óptica, ye.",
    "Los regresores son la frecuencia de banda, equis uno, y el espesor de la película, equis dos.",
    "Fíjate en la tabla: hay cuatro frecuencias y tres espesores, y cada frecuencia se probó con los tres espesores.",
    "Eso va a importar al final.",
    "Esta es la salida de erre.",
    "El modelo ajustado es ye gorro igual a menos tres coma tres siete, más cero coma cero cero tres seis por la frecuencia, más cero coma nueve cinco por el espesor.",
    "Interpretemos.",
    "Por cada unidad más de frecuencia, la densidad óptica sube en promedio cero coma cero cero tres seis, con el espesor fijo.",
    "Parece poco, pero la frecuencia va de setecientos cuarenta a mil doscientos treinta y cinco: en ese rango sube casi uno coma ocho.",
    "Por cada milímetro más de espesor, la densidad sube cero coma nueve cinco, con la frecuencia fija.",
    "El intercepto, menos tres coma tres siete, sería la densidad con frecuencia cero y espesor cero.",
    "Está fuera del rango, y además una densidad negativa es imposible.",
    "No se interpreta.",
    "Con doce datos y dos variables quedan nueve grados de libertad, y el te crítico es dos coma dos seis dos.",
    "Frecuencia: te igual a cinco coma nueve uno, pe cero coma cero cero cero dos.",
    "Se rechaza la hipótesis nula: la frecuencia influye en la densidad óptica.",
    "Espesor: te dos coma seis tres, pe cero coma cero dos ocho.",
    "También se rechaza, aunque con menos holgura: el espesor influye.",
    "La efe global prueba si ambos betas son cero a la vez.",
    "Da veinte coma nueve, contra un crítico de cuatro coma dos seis, con pe cero coma cero cero cero cuatro.",
    "Se rechaza: el modelo explica la densidad óptica.",
    "El erre cuadrado es cero coma ocho dos: el modelo explica el ochenta y dos por ciento de la variabilidad.",
    "El ajustado baja a cero coma siete ocho.",
    "Es una caída razonable para doce datos y dos regresores.",
    "Supuestos.",
    "En el gráfico de residuos, mira el punto marcado: el último dato tiene un residuo grande, y los residuos crecen con el valor ajustado.",
    "Es una señal de que la varianza no es constante y de que la relación tal vez no sea un plano.",
    "Shapiro Wilk da pe cero coma dos siete: no se rechaza la normalidad.",
    "Ahora el ve i efe.",
    "Los dos valen exactamente uno.",
    "¿Por qué?",
    "Porque el diseño cruza todas las frecuencias con todos los espesores: las dos variables no están correlacionadas.",
    "No hay nada de multicolinealidad.",
    "Apalancamiento: el corte es cero coma cinco, y ninguna observación lo supera.",
    "Pero la distancia de Cook del dato diez, frecuencia mil doscientos treinta y cinco y espesor uno coma uno, es uno coma seis ocho.",
    "Es influyente: es el valor más alto de toda la tabla y tira el plano hacia él.",
    "En resumen: el modelo es significativo y ambas variables influyen, el ve i efe es uno porque el diseño es cruzado, y el dato diez es influyente, lo que junto al patrón de los residuos sugiere que un plano no captura del todo cómo crece la densidad."
  ],
  "huella": "db1ccdc64563"
});
