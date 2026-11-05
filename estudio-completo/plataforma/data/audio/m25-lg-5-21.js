/* GENERADO por tools/generar_audio.py desde tools/guiones/m25-lg-5-21.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m25-lg-5-21",
  "modulo": "m25-factorial-general",
  "titulo": "Ejercicio 5.21: caucho vulcanizado, cuando nada sale",
  "archivo": "audio/m25-lg-5-21.mp3",
  "duracion": 188,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 49.4,
      "titulo": "Tabla ANOVA"
    },
    {
      "t": 83.5,
      "titulo": "¿Hay algo mejor?"
    },
    {
      "t": 118.6,
      "titulo": "El pe valor, gráficamente"
    },
    {
      "t": 148.7,
      "titulo": "Supuestos"
    }
  ],
  "ejercicio": "Libro guía · Cap. 5, ej. 21",
  "pregunta": "m25-d011",
  "orden": 4.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 6.11,
    "clave1": 12.93,
    "clave2": 15.44,
    "clave3": 17.55,
    "dis": 23.75,
    "dis-r": 28.85,
    "modelo": 36.15,
    "h0a": 41.26,
    "h0b": 43.51,
    "h0ab": 45.09,
    "tabla": 49.4,
    "fa": 59.23,
    "fb": 64.2,
    "fab": 68.96,
    "conc": 73.82,
    "medias": 83.54,
    "mejor": 97.88,
    "mejor-b": 107.62,
    "mejor-ab": 111.87,
    "pval": 118.61,
    "pval-curva": 126.71,
    "pval-f0": 127.94,
    "pval-area": 130.76,
    "pval-r": 142.22,
    "sup": 148.67,
    "sup-lev": 154.55,
    "varianza": 157.66,
    "fin": 179.04
  },
  "frases": [
    [
      0.0,
      "El ejercicio veintiuno del capítulo cinco estudia la resistencia del caucho vulcanizado."
    ],
    [
      6.11,
      "Los factores son el tiempo de curado, a cuarenta, sesenta y ochenta minutos, y el tipo de acelerante, a, be o ce."
    ],
    [
      12.93,
      "Cada combinación tiene dos réplicas."
    ],
    [
      15.44,
      "Se busca la mayor resistencia."
    ],
    [
      17.55,
      "Y hay una pregunta poco común: explicar de forma gráfica cómo se obtiene el pe valor del tiempo."
    ],
    [
      23.75,
      "¿Cómo se llama el diseño?"
    ],
    [
      28.85,
      "Es un factorial tres por tres con dos réplicas, de efectos fijos y completamente al azar: dieciocho corridas."
    ],
    [
      36.15,
      "El modelo: media, efecto del tiempo, efecto del acelerante, interacción y error."
    ],
    [
      41.26,
      "Las hipótesis: el tiempo no influye, el acelerante no influye, y no hay interacción entre ambos."
    ],
    [
      49.4,
      "Los números son grandes porque la resistencia anda cerca de cuatro mil."
    ],
    [
      53.39,
      "El error tiene nueve grados de libertad y un cuadrado medio de noventa y un mil ciento once."
    ],
    [
      59.23,
      "El efe del tiempo es cero coma uno dos, con pe valor cero coma ochenta y nueve."
    ],
    [
      64.2,
      "El del acelerante, cero coma seis tres, con pe cero coma cincuenta y seis."
    ],
    [
      68.96,
      "Y el de la interacción, cero coma dos tres, con pe cero coma noventa y dos."
    ],
    [
      73.82,
      "Nada es significativo."
    ],
    [
      75.52,
      "Los tres efes están muy por debajo de sus críticos, que rondan entre tres coma seis y cuatro coma tres."
    ],
    [
      83.54,
      "Las medias por tiempo son tres mil ochocientos ochenta y tres, tres mil novecientos treinta y tres, y tres mil ochocientos cincuenta."
    ],
    [
      91.45,
      "Por acelerante: tres mil ochocientos diecisiete, cuatro mil, y tres mil ochocientos cincuenta."
    ],
    [
      97.88,
      "¿Hay un tiempo mejor?"
    ],
    [
      99.4,
      "No: las diferencias son puro azar."
    ],
    [
      101.59,
      "Y eso, en la práctica, es una buena noticia: se puede usar el tiempo más corto, que es más barato."
    ],
    [
      107.62,
      "Con el acelerante pasa lo mismo: se puede elegir el más económico."
    ],
    [
      111.87,
      "Y como la interacción tampoco es significativa, ninguna combinación destaca."
    ],
    [
      118.61,
      "Ahora la pregunta gráfica."
    ],
    [
      120.41,
      "Bajo la hipótesis nula, el efe del tiempo sigue una distribución efe con dos y nueve grados de libertad."
    ],
    [
      126.71,
      "Se dibuja esa curva, se marca el valor observado, cero coma uno dos, y el pe valor es el área bajo la curva a la derecha de ese punto."
    ],
    [
      134.92,
      "Como cero coma uno dos está casi al comienzo de la curva, el área a su derecha es enorme: cero coma ochenta y nueve."
    ],
    [
      142.22,
      "En erre, ese número sale con la función pe efe, pidiendo la cola superior."
    ],
    [
      148.67,
      "En los supuestos, la normalidad de los residuos se acepta, con pe cero coma cuarenta y cuatro."
    ],
    [
      154.55,
      "Pero la igualdad de varianzas se rechaza."
    ],
    [
      157.66,
      "El ejercicio pregunta qué significaría eso para el tiempo de cura."
    ],
    [
      161.49,
      "Si los tiempos tuvieran varianzas distintas, el tiempo estaría afectando la dispersión de la resistencia, aunque no su media."
    ],
    [
      168.5,
      "Entonces convendría elegir el tiempo con menos variabilidad."
    ],
    [
      172.13,
      "Y se corrige transformando la respuesta, por ejemplo con un logaritmo o una raíz, y repitiendo el ANOVA."
    ],
    [
      179.04,
      "Este ejercicio muestra que «no hay efecto» también es una conclusión útil: permite elegir el nivel más barato sin perder resistencia."
    ]
  ],
  "huella": "cb58f60db1df"
});
