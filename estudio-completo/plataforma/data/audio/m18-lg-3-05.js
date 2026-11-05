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
      "Y de la tabla solo conocemos dos números: la suma de cuadrados de tratamientos, ochocientos, y la del error, cuatrocientos."
    ],
    [
      20.4,
      "Antes de tocar la tabla, saquemos las piezas."
    ],
    [
      23.44,
      "Ka vale cinco, ene vale cuatro, así que hay veinte datos en total."
    ],
    [
      29.59,
      "Empecemos por los grados de libertad."
    ],
    [
      32.05,
      "Para tratamientos, ka menos uno: cuatro."
    ],
    [
      34.78,
      "Para el error, el total de datos menos ka: veinte menos cinco, quince."
    ],
    [
      39.3,
      "Y para el total, veinte menos uno, diecinueve."
    ],
    [
      42.27,
      "Fíjate que cuatro más quince dan diecinueve: siempre se cumple."
    ],
    [
      46.77,
      "La suma de cuadrados total también es una suma: ochocientos más cuatrocientos, mil doscientos."
    ],
    [
      53.17,
      "Los cuadrados medios son cada suma dividida por sus grados de libertad."
    ],
    [
      57.29,
      "Para tratamientos, ochocientos dividido en cuatro: doscientos."
    ],
    [
      61.33,
      "Para el error, cuatrocientos dividido en quince: veintiséis coma sesenta y siete."
    ],
    [
      66.97,
      "Y el efe es el cuadrado medio de tratamientos sobre el del error: doscientos dividido en veintiséis coma sesenta y siete."
    ],
    [
      74.13,
      "¿Cuánto da?"
    ],
    [
      78.52,
      "Siete coma cinco."
    ],
    [
      82.03,
      "La segunda parte pide explicar cómo se calcula el valor-p."
    ],
    [
      85.62,
      "Bajo la hipótesis nula, ese efe sigue una distribución efe con cuatro y quince grados de libertad."
    ],
    [
      91.58,
      "Se marca siete coma cinco en el eje, y el valor-p es el área bajo la curva a la derecha de ese punto."
    ],
    [
      97.78,
      "Aquí da cero coma cero cero dieciséis."
    ],
    [
      100.86,
      "En erre, ese número sale con la función pe efe, con siete coma cinco, cuatro y quince, pidiendo la cola superior."
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
      "El crítico al cinco por ciento, con cuatro y quince grados de libertad, es tres coma cero seis."
    ],
    [
      118.86,
      "Siete coma cinco lo supera, así que se rechaza la igualdad de medias."
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
      "Para eso harían falta las medias y una comparación múltiple, como la ele ese de o Tukey."
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
  "huella": "fd6c4677ad81"
});
