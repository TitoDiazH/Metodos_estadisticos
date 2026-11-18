/* GENERADO por tools/generar_audio.py desde tools/guiones/m20-lg-4-11.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m20-lg-4-11",
  "modulo": "m20-dbca",
  "titulo": "Ejercicio 4.11: temperatura de los silos de leche",
  "archivo": "audio/m20-lg-4-11.mp3",
  "duracion": 225,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 65.5,
      "titulo": "Totales"
    },
    {
      "t": 85.6,
      "titulo": "Sumas de cuadrados"
    },
    {
      "t": 127.6,
      "titulo": "Tabla ANOVA"
    },
    {
      "t": 171.6,
      "titulo": "Revisar los residuos"
    }
  ],
  "ejercicio": "Libro guía · Cap. 4, ej. 11",
  "pregunta": "m20-d009",
  "orden": 3.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 5.34,
    "clave1": 14.47,
    "clave2": 18.01,
    "dis": 27.38,
    "dis-r": 33.97,
    "modelo": 49.0,
    "h0t": 55.34,
    "h0b": 60.59,
    "tot": 65.48,
    "tot-i": 66.77,
    "tot-j": 73.27,
    "tot-g": 80.75,
    "corr": 85.65,
    "sct": 94.15,
    "sctr": 102.8,
    "scb": 110.41,
    "sce": 117.95,
    "gl": 127.63,
    "cm": 133.28,
    "ft": 141.35,
    "ftc": 144.24,
    "conc-t": 152.86,
    "fb": 158.62,
    "conc-b": 163.68,
    "res": 171.56,
    "res-max": 182.09,
    "res-d": 188.15,
    "sup-sw": 200.38,
    "sup-lev": 205.44,
    "fin": 211.54
  },
  "frases": [
    [
      0.0,
      "Vamos con el ejercicio 11 del capítulo cuatro: los silos de una empresa lechera."
    ],
    [
      5.34,
      "Se sospecha que en algunos silos hay problemas de temperatura, así que durante cinco días se registra la temperatura de cada uno a cierta hora crítica."
    ],
    [
      14.47,
      "La pregunta central es si hay diferencia entre los silos."
    ],
    [
      18.01,
      "Y el enunciado agrega una frase importante: «la temperatura de un día a otro es una fuente de variabilidad que podría impactar la variabilidad total»."
    ],
    [
      27.38,
      "Entonces, ¿cuál es el tratamiento y cuál el bloque?"
    ],
    [
      33.97,
      "El tratamiento es el silo, porque es lo que queremos comparar."
    ],
    [
      37.6,
      "El bloque es el día: una fuente de variación conocida, que no nos interesa estudiar, pero que controlamos para que no infle el error."
    ],
    [
      45.28,
      "Son cinco silos y cinco días, 25 datos."
    ],
    [
      49.0,
      "El modelo es el de bloques al azar: media global, más efecto del silo, más efecto del día, más el error."
    ],
    [
      55.34,
      "La hipótesis de tratamientos dice que los cinco silos tienen la misma temperatura media."
    ],
    [
      60.59,
      "Y la de bloques, que los cinco días dan lo mismo."
    ],
    [
      65.48,
      "Los totales."
    ],
    [
      66.77,
      "Por silo: 16,5, 21, 17, 21,5 y 17,5."
    ],
    [
      73.27,
      "Por día: 20 el lunes, 22 el martes, 20,5 el miércoles, 13 el jueves y 18 el viernes."
    ],
    [
      80.75,
      "El gran total es 93,5."
    ],
    [
      85.65,
      "La corrección es 93,5² / 25: 349,69."
    ],
    [
      94.15,
      "Los datos al cuadrado suman 389,75, así que la suma de cuadrados total es 40,06."
    ],
    [
      102.8,
      "Para los silos, los totales al cuadrado divididos en cinco días, menos la corrección: 4,46."
    ],
    [
      110.41,
      "Para los días, los totales al cuadrado divididos en cinco silos, menos la corrección: 9,76."
    ],
    [
      117.95,
      "El error, por diferencia, queda en 25,84."
    ],
    [
      122.35,
      "Fíjate que se lleva la mayor parte de la variabilidad."
    ],
    [
      127.63,
      "Grados de libertad: cuatro para silos, cuatro para días y 16 para el error."
    ],
    [
      133.28,
      "Los cuadrados medios: 1,12 para silos, 2,44 para días, y 1,62 para el error."
    ],
    [
      141.35,
      "El F de los silos es 0,69."
    ],
    [
      144.24,
      "Ni siquiera llega a uno, y el crítico con cuatro y 16 grados de libertad es 3,01."
    ],
    [
      150.4,
      "El valor p es 0,61."
    ],
    [
      152.86,
      "No se rechaza: no hay evidencia de que los silos tengan temperaturas medias distintas."
    ],
    [
      158.62,
      "El F de los días es 1,51, con valor p 0,25."
    ],
    [
      163.68,
      "Tampoco se rechaza: la temperatura de un día a otro no resultó significativamente distinta."
    ],
    [
      171.56,
      "La última parte pide revisar los residuos."
    ],
    [
      174.31,
      "En el DBCA, el residuo es el dato, menos la media de su tratamiento, menos la media de su bloque, más la media global."
    ],
    [
      182.09,
      "El residuo más grande en valor absoluto es el del silo b el miércoles: −2,56."
    ],
    [
      188.15,
      "Si lo divido por la raíz del cuadrado medio del error, queda −2,01."
    ],
    [
      193.22,
      "Como ningún residuo estandarizado pasa de 2,5 en valor absoluto, no hay datos atípicos evidentes."
    ],
    [
      200.38,
      "Además, Shapiro Wilk da p = 0,15, así que se acepta la normalidad, y Levene entre silos da 0,89, así que las varianzas se ven parecidas."
    ],
    [
      211.54,
      "En resumen: en este ejercicio nada sale significativo, y eso también es una conclusión válida."
    ],
    [
      217.57,
      "Lo importante es saber identificar el bloque, armar bien la tabla y revisar los residuos antes de confiar en ella."
    ]
  ],
  "huella": "75a80716394d",
  "frasesHabladas": [
    "Vamos con el ejercicio once del capítulo cuatro: los silos de una empresa lechera.",
    "Se sospecha que en algunos silos hay problemas de temperatura, así que durante cinco días se registra la temperatura de cada uno a cierta hora crítica.",
    "La pregunta central es si hay diferencia entre los silos.",
    "Y el enunciado agrega una frase importante: «la temperatura de un día a otro es una fuente de variabilidad que podría impactar la variabilidad total».",
    "Entonces, ¿cuál es el tratamiento y cuál el bloque?",
    "El tratamiento es el silo, porque es lo que queremos comparar.",
    "El bloque es el día: una fuente de variación conocida, que no nos interesa estudiar, pero que controlamos para que no infle el error.",
    "Son cinco silos y cinco días, veinticinco datos.",
    "El modelo es el de bloques al azar: media global, más efecto del silo, más efecto del día, más el error.",
    "La hipótesis de tratamientos dice que los cinco silos tienen la misma temperatura media.",
    "Y la de bloques, que los cinco días dan lo mismo.",
    "Los totales.",
    "Por silo: dieciséis coma cinco, veintiuno, diecisiete, veintiuno coma cinco y diecisiete coma cinco.",
    "Por día: veinte el lunes, veintidós el martes, veinte coma cinco el miércoles, trece el jueves y dieciocho el viernes.",
    "El gran total es noventa y tres coma cinco.",
    "La corrección es noventa y tres coma cinco al cuadrado, dividido en veinticinco: trescientos cuarenta y nueve coma sesenta y nueve.",
    "Los datos al cuadrado suman trescientos ochenta y nueve coma setenta y cinco, así que la suma de cuadrados total es cuarenta coma cero seis.",
    "Para los silos, los totales al cuadrado divididos en cinco días, menos la corrección: cuatro coma cuarenta y seis.",
    "Para los días, los totales al cuadrado divididos en cinco silos, menos la corrección: nueve coma setenta y seis.",
    "El error, por diferencia, queda en veinticinco coma ochenta y cuatro.",
    "Fíjate que se lleva la mayor parte de la variabilidad.",
    "Grados de libertad: cuatro para silos, cuatro para días y dieciséis para el error.",
    "Los cuadrados medios: uno coma uno dos para silos, dos coma cuarenta y cuatro para días, y uno coma seis dos para el error.",
    "El efe de los silos es cero coma sesenta y nueve.",
    "Ni siquiera llega a uno, y el crítico con cuatro y dieciséis grados de libertad es tres coma cero uno.",
    "El pe valor es cero coma sesenta y uno.",
    "No se rechaza: no hay evidencia de que los silos tengan temperaturas medias distintas.",
    "El efe de los días es uno coma cincuenta y uno, con pe valor cero coma veinticinco.",
    "Tampoco se rechaza: la temperatura de un día a otro no resultó significativamente distinta.",
    "La última parte pide revisar los residuos.",
    "En el de be ce a, el residuo es el dato, menos la media de su tratamiento, menos la media de su bloque, más la media global.",
    "El residuo más grande en valor absoluto es el del silo be el miércoles: menos dos coma cinco seis.",
    "Si lo divido por la raíz del cuadrado medio del error, queda menos dos coma cero uno.",
    "Como ningún residuo estandarizado pasa de dos coma cinco en valor absoluto, no hay datos atípicos evidentes.",
    "Además, Shapiro Wilk da pe igual a cero coma quince, así que se acepta la normalidad, y Levene entre silos da cero coma ochenta y nueve, así que las varianzas se ven parecidas.",
    "En resumen: en este ejercicio nada sale significativo, y eso también es una conclusión válida.",
    "Lo importante es saber identificar el bloque, armar bien la tabla y revisar los residuos antes de confiar en ella."
  ]
});
