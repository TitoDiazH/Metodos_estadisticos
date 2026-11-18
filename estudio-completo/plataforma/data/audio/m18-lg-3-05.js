/* GENERADO por tools/generar_audio.py desde tools/guiones/m18-lg-3-05.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m18-lg-3-05",
  "modulo": "m18-anova-un-factor",
  "titulo": "Ejercicio 3.5: completar una tabla ANOVA",
  "archivo": "audio/m18-lg-3-05.mp3",
  "duracion": 158,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 29.6,
      "titulo": "Completar la tabla"
    },
    {
      "t": 82.0,
      "titulo": "El valor-p, en un dibujo"
    },
    {
      "t": 109.8,
      "titulo": "¿Hay diferencias?"
    }
  ],
  "ejercicio": "Libro guía · Cap. 3, ej. 5",
  "pregunta": "m18-d017",
  "orden": 2.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 6.33,
    "clave1": 8.29,
    "clave2": 12.4,
    "piezas": 20.4,
    "gl": 29.59,
    "gl-e": 34.78,
    "gl-t": 39.3,
    "sct": 46.77,
    "cm": 53.17,
    "cme": 61.33,
    "f": 66.97,
    "f-r": 78.52,
    "pval": 82.03,
    "pval-curva": 85.62,
    "pval-f0": 91.58,
    "pval-area": 93.72,
    "pval-r": 100.86,
    "conc": 109.83,
    "crit": 113.09,
    "conc-r": 118.86,
    "cuales": 123.73,
    "modelo": 135.09,
    "h0": 144.71,
    "fin": 148.69
  },
  "frases": [
    [
      0.0,
      "Este es un clásico de prueba: el ejercicio cinco del capítulo tres, completar una tabla ANOVA."
    ],
    [
      6.33,
      "Nos dan una tabla a medias."
    ],
    [
      8.29,
      "Se comparan cinco tratamientos, con cuatro réplicas cada uno."
    ],
    [
      12.4,
      "Y de la tabla solo conocemos dos números: la suma de cuadrados de tratamientos, 800, y la del error, 400."
    ],
    [
      20.4,
      "Antes de tocar la tabla, saquemos las piezas."
    ],
    [
      23.44,
      "k vale cinco, n vale cuatro, así que hay 20 datos en total."
    ],
    [
      29.59,
      "Empecemos por los grados de libertad."
    ],
    [
      32.05,
      "Para tratamientos, k − 1: cuatro."
    ],
    [
      34.78,
      "Para el error, el total de datos menos k: 20 − 5, 15."
    ],
    [
      39.3,
      "Y para el total, 20 − 1, 19."
    ],
    [
      42.27,
      "Fíjate que 4 + 15 dan 19: siempre se cumple."
    ],
    [
      46.77,
      "La suma de cuadrados total también es una suma: 800 + 400, 1200."
    ],
    [
      53.17,
      "Los cuadrados medios son cada suma dividida por sus grados de libertad."
    ],
    [
      57.29,
      "Para tratamientos, 800 dividido en cuatro: 200."
    ],
    [
      61.33,
      "Para el error, 400 / 15: 26,67."
    ],
    [
      66.97,
      "Y el F es el cuadrado medio de tratamientos sobre el del error: 200 / 26,67."
    ],
    [
      74.13,
      "¿Cuánto da?"
    ],
    [
      78.52,
      "7,5."
    ],
    [
      82.03,
      "La segunda parte pide explicar cómo se calcula el valor-p."
    ],
    [
      85.62,
      "Bajo la hipótesis nula, ese F sigue una distribución F con cuatro y 15 grados de libertad."
    ],
    [
      91.58,
      "Se marca 7,5 en el eje, y el valor-p es el área bajo la curva a la derecha de ese punto."
    ],
    [
      97.78,
      "Aquí da 0,0016."
    ],
    [
      100.86,
      "En R, ese número sale con la función p F, con 7,5, 4 y 15, pidiendo la cola superior."
    ],
    [
      109.83,
      "¿Se puede concluir algo con esta tabla?"
    ],
    [
      112.31,
      "Sí."
    ],
    [
      113.09,
      "El crítico al 5 %, con cuatro y 15 grados de libertad, es 3,06."
    ],
    [
      118.86,
      "7,5 lo supera, así que se rechaza la igualdad de medias."
    ],
    [
      123.73,
      "Pero ojo con lo que no se puede decir."
    ],
    [
      126.12,
      "La tabla no dice cuáles tratamientos difieren."
    ],
    [
      129.31,
      "Para eso harían falta las medias y una comparación múltiple, como la LSD o Tukey."
    ],
    [
      135.09,
      "La última parte pide el modelo y la hipótesis."
    ],
    [
      137.95,
      "El modelo: cada dato es la media global, más el efecto de su tratamiento, más un error normal con media cero."
    ],
    [
      144.71,
      "Y la hipótesis nula dice que las cinco medias son iguales."
    ],
    [
      148.69,
      "El truco de este tipo de pregunta es recordar que los grados de libertad y las sumas de cuadrados se suman, y que todo lo demás sale dividiendo."
    ]
  ],
  "huella": "fd6c4677ad81",
  "frasesHabladas": [
    "Este es un clásico de prueba: el ejercicio cinco del capítulo tres, completar una tabla ANOVA.",
    "Nos dan una tabla a medias.",
    "Se comparan cinco tratamientos, con cuatro réplicas cada uno.",
    "Y de la tabla solo conocemos dos números: la suma de cuadrados de tratamientos, ochocientos, y la del error, cuatrocientos.",
    "Antes de tocar la tabla, saquemos las piezas.",
    "Ka vale cinco, ene vale cuatro, así que hay veinte datos en total.",
    "Empecemos por los grados de libertad.",
    "Para tratamientos, ka menos uno: cuatro.",
    "Para el error, el total de datos menos ka: veinte menos cinco, quince.",
    "Y para el total, veinte menos uno, diecinueve.",
    "Fíjate que cuatro más quince dan diecinueve: siempre se cumple.",
    "La suma de cuadrados total también es una suma: ochocientos más cuatrocientos, mil doscientos.",
    "Los cuadrados medios son cada suma dividida por sus grados de libertad.",
    "Para tratamientos, ochocientos dividido en cuatro: doscientos.",
    "Para el error, cuatrocientos dividido en quince: veintiséis coma sesenta y siete.",
    "Y el efe es el cuadrado medio de tratamientos sobre el del error: doscientos dividido en veintiséis coma sesenta y siete.",
    "¿Cuánto da?",
    "Siete coma cinco.",
    "La segunda parte pide explicar cómo se calcula el valor-p.",
    "Bajo la hipótesis nula, ese efe sigue una distribución efe con cuatro y quince grados de libertad.",
    "Se marca siete coma cinco en el eje, y el valor-p es el área bajo la curva a la derecha de ese punto.",
    "Aquí da cero coma cero cero dieciséis.",
    "En erre, ese número sale con la función pe efe, con siete coma cinco, cuatro y quince, pidiendo la cola superior.",
    "¿Se puede concluir algo con esta tabla?",
    "Sí.",
    "El crítico al cinco por ciento, con cuatro y quince grados de libertad, es tres coma cero seis.",
    "Siete coma cinco lo supera, así que se rechaza la igualdad de medias.",
    "Pero ojo con lo que no se puede decir.",
    "La tabla no dice cuáles tratamientos difieren.",
    "Para eso harían falta las medias y una comparación múltiple, como la ele ese de o Tukey.",
    "La última parte pide el modelo y la hipótesis.",
    "El modelo: cada dato es la media global, más el efecto de su tratamiento, más un error normal con media cero.",
    "Y la hipótesis nula dice que las cinco medias son iguales.",
    "El truco de este tipo de pregunta es recordar que los grados de libertad y las sumas de cuadrados se suman, y que todo lo demás sale dividiendo."
  ]
});
