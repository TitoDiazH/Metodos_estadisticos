/* GENERADO por tools/generar_audio.py desde tools/guiones/m18-lg-3-15.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m18-lg-3-15",
  "modulo": "m18-anova-un-factor",
  "titulo": "Ejercicio 3.15: almidón y dureza de tabletas",
  "archivo": "audio/m18-lg-3-15.mp3",
  "duracion": 207,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 48.6,
      "titulo": "Totales y sumas de cuadrados"
    },
    {
      "t": 98.1,
      "titulo": "Tabla ANOVA"
    },
    {
      "t": 132.1,
      "titulo": "¿Qué nivel conviene?"
    },
    {
      "t": 184.2,
      "titulo": "Supuestos"
    }
  ],
  "ejercicio": "Libro guía · Cap. 3, ej. 15",
  "pregunta": "m18-d021",
  "orden": 1.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 6.5,
    "clave1": 11.72,
    "clave2": 15.63,
    "clave3": 17.98,
    "dis": 22.43,
    "modelo": 34.08,
    "h0": 39.67,
    "tot": 48.57,
    "tot-i": 51.15,
    "tot-g": 59.45,
    "corr": 62.02,
    "sct": 68.15,
    "sctr": 76.41,
    "sce": 86.1,
    "gl": 98.06,
    "cm": 104.63,
    "f": 111.06,
    "fc": 116.78,
    "conc": 121.23,
    "lsd": 132.13,
    "lsd-n": 136.52,
    "medias": 146.23,
    "pares": 151.29,
    "mejor": 164.11,
    "ojo": 171.39,
    "sup": 184.24,
    "sup-sw": 186.21,
    "sup-var": 192.35,
    "fin": 197.49
  },
  "frases": [
    [
      0.0,
      "Vamos a preparar la pregunta adicional de ANOVA con el ejercicio 15 del capítulo tres del libro guía."
    ],
    [
      6.5,
      "Una farmacéutica quiere saber si la cantidad de almidón cambia la dureza de las tabletas."
    ],
    [
      11.72,
      "Prueba tres niveles: dos, cinco y 10 % de almidón."
    ],
    [
      15.63,
      "Cada nivel se repite cuatro veces."
    ],
    [
      17.98,
      "Y al final pregunta qué recomendaría si se quiere maximizar la dureza."
    ],
    [
      22.43,
      "Hay un solo factor, el porcentaje de almidón, con tres niveles, y las corridas se hacen al azar."
    ],
    [
      28.28,
      "Es un diseño completamente al azar: k vale tres, n vale cuatro, y hay 12 datos."
    ],
    [
      34.08,
      "El modelo es cada dato igual a la media global, más el efecto del nivel de almidón, más el error."
    ],
    [
      39.67,
      "La hipótesis nula dice que las tres medias de dureza son iguales."
    ],
    [
      43.45,
      "La alternativa, que al menos dos son distintas."
    ],
    [
      48.57,
      "Como siempre, partimos por los totales."
    ],
    [
      51.15,
      "El 2 % suma 18,8, el 5 %, 26,8, y el 10 %, 33,4."
    ],
    [
      59.45,
      "El gran total es 79."
    ],
    [
      62.02,
      "La corrección es 79² / 12: 520,08."
    ],
    [
      68.15,
      "Los datos al cuadrado suman 548,88, así que la suma de cuadrados total es 28,8."
    ],
    [
      76.41,
      "Para los tratamientos, cada total al cuadrado se divide por 4, el número de réplicas, y se resta la corrección."
    ],
    [
      83.44,
      "Da 26,73."
    ],
    [
      86.1,
      "El error sale por diferencia: 28,8 − 26,73, o sea, 2,07."
    ],
    [
      93.23,
      "Fíjate qué chico es comparado con el tratamiento."
    ],
    [
      98.06,
      "Los grados de libertad son dos para el almidón, k − 1, y nueve para el error, n total menos k."
    ],
    [
      104.63,
      "Los cuadrados medios: 13,36 para el almidón, y 0,23 para el error."
    ],
    [
      111.06,
      "El F es 13,36 / 0,23: 58,1."
    ],
    [
      116.78,
      "El crítico con dos y nueve grados de libertad es 4,26."
    ],
    [
      121.23,
      "58 lo supera de lejos, y el valor p es prácticamente cero."
    ],
    [
      125.86,
      "Se rechaza la hipótesis nula: el almidón sí influye en la dureza."
    ],
    [
      132.13,
      "El ANOVA dice que hay diferencias, pero no cuáles."
    ],
    [
      135.05,
      "Para eso, la LSD: te con nueve grados de libertad, 2,262, por la raíz de 2 · 0,23, dividido en cuatro."
    ],
    [
      143.87,
      "Da 0,77."
    ],
    [
      146.23,
      "Las medias son 4,7, 6,7, y 8,35."
    ],
    [
      151.29,
      "Ahora cada par contra 0,77."
    ],
    [
      154.02,
      "Dos contra 5 % difieren en dos: sí."
    ],
    [
      157.13,
      "Dos contra diez, en 3,65: sí."
    ],
    [
      159.99,
      "Y cinco contra diez, en 1,65: también sí."
    ],
    [
      164.11,
      "Como los tres niveles son distintos y queremos máxima dureza, la recomendación es el 10 % de almidón."
    ],
    [
      171.39,
      "Ojo con algo que en la prueba se repite: si cinco y diez no hubieran sido distintos, lo correcto sería recomendar el 5 %, porque da la misma dureza con menos almidón."
    ],
    [
      184.24,
      "Por último, los supuestos."
    ],
    [
      186.21,
      "Shapiro Wilk sobre los residuos da p = 0,43, así que se acepta la normalidad."
    ],
    [
      192.35,
      "Bartlett y Levene dan p / 0,7: las varianzas son parecidas."
    ],
    [
      197.49,
      "Ese es el camino completo de la pregunta de ANOVA: modelo e hipótesis, totales, sumas de cuadrados, tabla, decisión, comparaciones y supuestos."
    ]
  ],
  "huella": "caaeeee029f0",
  "frasesHabladas": [
    "Vamos a preparar la pregunta adicional de ANOVA con el ejercicio quince del capítulo tres del libro guía.",
    "Una farmacéutica quiere saber si la cantidad de almidón cambia la dureza de las tabletas.",
    "Prueba tres niveles: dos, cinco y diez por ciento de almidón.",
    "Cada nivel se repite cuatro veces.",
    "Y al final pregunta qué recomendaría si se quiere maximizar la dureza.",
    "Hay un solo factor, el porcentaje de almidón, con tres niveles, y las corridas se hacen al azar.",
    "Es un diseño completamente al azar: ka vale tres, ene vale cuatro, y hay doce datos.",
    "El modelo es cada dato igual a la media global, más el efecto del nivel de almidón, más el error.",
    "La hipótesis nula dice que las tres medias de dureza son iguales.",
    "La alternativa, que al menos dos son distintas.",
    "Como siempre, partimos por los totales.",
    "El dos por ciento suma dieciocho coma ocho, el cinco por ciento, veintiséis coma ocho, y el diez por ciento, treinta y tres coma cuatro.",
    "El gran total es setenta y nueve.",
    "La corrección es setenta y nueve al cuadrado, dividido en doce: quinientos veinte coma cero ocho.",
    "Los datos al cuadrado suman quinientos cuarenta y ocho coma ocho ocho, así que la suma de cuadrados total es veintiocho coma ocho.",
    "Para los tratamientos, cada total al cuadrado se divide por cuatro, el número de réplicas, y se resta la corrección.",
    "Da veintiséis coma siete tres.",
    "El error sale por diferencia: veintiocho coma ocho menos veintiséis coma siete tres, o sea, dos coma cero siete.",
    "Fíjate qué chico es comparado con el tratamiento.",
    "Los grados de libertad son dos para el almidón, ka menos uno, y nueve para el error, ene total menos ka.",
    "Los cuadrados medios: trece coma tres seis para el almidón, y cero coma veintitrés para el error.",
    "El efe es trece coma tres seis dividido en cero coma veintitrés: cincuenta y ocho coma uno.",
    "El crítico con dos y nueve grados de libertad es cuatro coma veintiséis.",
    "Cincuenta y ocho lo supera de lejos, y el pe valor es prácticamente cero.",
    "Se rechaza la hipótesis nula: el almidón sí influye en la dureza.",
    "El ANOVA dice que hay diferencias, pero no cuáles.",
    "Para eso, la ele ese de: te con nueve grados de libertad, dos coma dos seis dos, por la raíz de dos por cero coma veintitrés, dividido en cuatro.",
    "Da cero coma siete siete.",
    "Las medias son cuatro coma siete, seis coma siete, y ocho coma tres cinco.",
    "Ahora cada par contra cero coma siete siete.",
    "Dos contra cinco por ciento difieren en dos: sí.",
    "Dos contra diez, en tres coma seis cinco: sí.",
    "Y cinco contra diez, en uno coma seis cinco: también sí.",
    "Como los tres niveles son distintos y queremos máxima dureza, la recomendación es el diez por ciento de almidón.",
    "Ojo con algo que en la prueba se repite: si cinco y diez no hubieran sido distintos, lo correcto sería recomendar el cinco por ciento, porque da la misma dureza con menos almidón.",
    "Por último, los supuestos.",
    "Shapiro Wilk sobre los residuos da pe igual a cero coma cuarenta y tres, así que se acepta la normalidad.",
    "Bartlett y Levene dan pe sobre cero coma siete: las varianzas son parecidas.",
    "Ese es el camino completo de la pregunta de ANOVA: modelo e hipótesis, totales, sumas de cuadrados, tabla, decisión, comparaciones y supuestos."
  ]
});
