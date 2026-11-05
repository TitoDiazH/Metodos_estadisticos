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
      "Vamos con el ejercicio once del capítulo cuatro: los silos de una empresa lechera."
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
      "Son cinco silos y cinco días, veinticinco datos."
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
      "Por silo: dieciséis coma cinco, veintiuno, diecisiete, veintiuno coma cinco y diecisiete coma cinco."
    ],
    [
      73.27,
      "Por día: veinte el lunes, veintidós el martes, veinte coma cinco el miércoles, trece el jueves y dieciocho el viernes."
    ],
    [
      80.75,
      "El gran total es noventa y tres coma cinco."
    ],
    [
      85.65,
      "La corrección es noventa y tres coma cinco al cuadrado, dividido en veinticinco: trescientos cuarenta y nueve coma sesenta y nueve."
    ],
    [
      94.15,
      "Los datos al cuadrado suman trescientos ochenta y nueve coma setenta y cinco, así que la suma de cuadrados total es cuarenta coma cero seis."
    ],
    [
      102.8,
      "Para los silos, los totales al cuadrado divididos en cinco días, menos la corrección: cuatro coma cuarenta y seis."
    ],
    [
      110.41,
      "Para los días, los totales al cuadrado divididos en cinco silos, menos la corrección: nueve coma setenta y seis."
    ],
    [
      117.95,
      "El error, por diferencia, queda en veinticinco coma ochenta y cuatro."
    ],
    [
      122.35,
      "Fíjate que se lleva la mayor parte de la variabilidad."
    ],
    [
      127.63,
      "Grados de libertad: cuatro para silos, cuatro para días y dieciséis para el error."
    ],
    [
      133.28,
      "Los cuadrados medios: uno coma uno dos para silos, dos coma cuarenta y cuatro para días, y uno coma seis dos para el error."
    ],
    [
      141.35,
      "El efe de los silos es cero coma sesenta y nueve."
    ],
    [
      144.24,
      "Ni siquiera llega a uno, y el crítico con cuatro y dieciséis grados de libertad es tres coma cero uno."
    ],
    [
      150.4,
      "El pe valor es cero coma sesenta y uno."
    ],
    [
      152.86,
      "No se rechaza: no hay evidencia de que los silos tengan temperaturas medias distintas."
    ],
    [
      158.62,
      "El efe de los días es uno coma cincuenta y uno, con pe valor cero coma veinticinco."
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
      "En el de be ce a, el residuo es el dato, menos la media de su tratamiento, menos la media de su bloque, más la media global."
    ],
    [
      182.09,
      "El residuo más grande en valor absoluto es el del silo be el miércoles: menos dos coma cinco seis."
    ],
    [
      188.15,
      "Si lo divido por la raíz del cuadrado medio del error, queda menos dos coma cero uno."
    ],
    [
      193.22,
      "Como ningún residuo estandarizado pasa de dos coma cinco en valor absoluto, no hay datos atípicos evidentes."
    ],
    [
      200.38,
      "Además, Shapiro Wilk da pe igual a cero coma quince, así que se acepta la normalidad, y Levene entre silos da cero coma ochenta y nueve, así que las varianzas se ven parecidas."
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
  "huella": "75a80716394d"
});
