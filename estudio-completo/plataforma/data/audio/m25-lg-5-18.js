/* GENERADO por tools/generar_audio.py desde tools/guiones/m25-lg-5-18.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m25-lg-5-18",
  "modulo": "m25-factorial-general",
  "titulo": "Ejercicio 5.18: un factorial dos por tres a mano",
  "archivo": "audio/m25-lg-5-18.mp3",
  "duracion": 260,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 44.0,
      "titulo": "Totales"
    },
    {
      "t": 82.6,
      "titulo": "Sumas de cuadrados"
    },
    {
      "t": 152.7,
      "titulo": "Tabla ANOVA"
    },
    {
      "t": 204.7,
      "titulo": "Las ele ese de"
    }
  ],
  "ejercicio": "Libro guía · Cap. 5, ej. 18",
  "pregunta": "m25-d001",
  "orden": 1.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 4.81,
    "clave1": 8.49,
    "clave2": 13.67,
    "clave3": 17.93,
    "dis": 23.52,
    "modelo": 30.28,
    "h0a": 36.53,
    "h0b": 39.17,
    "h0ab": 40.27,
    "tot": 44.0,
    "tot-ij": 46.93,
    "tot-i": 65.8,
    "tot-j": 71.11,
    "tot-g": 78.86,
    "corr": 82.58,
    "sct": 90.95,
    "sca": 102.6,
    "scb": 114.82,
    "scsub": 124.77,
    "scab": 139.21,
    "sce": 146.16,
    "gl": 152.69,
    "fa": 162.66,
    "fb": 172.6,
    "fab": 178.0,
    "conc": 184.09,
    "graf": 194.99,
    "lsd": 204.65,
    "lsd-b": 218.61,
    "lsd-ab": 223.62,
    "lsd-ab-r": 237.88,
    "fin": 246.99
  },
  "frases": [
    [
      0.0,
      "Empezamos los factoriales con el ejercicio 18 del capítulo cinco."
    ],
    [
      4.81,
      "Nos dan los datos de un factorial 2 · 3 con tres réplicas."
    ],
    [
      8.49,
      "2 · 3 significa que el factor a tiene dos niveles y el factor b tiene tres."
    ],
    [
      13.67,
      "Tres réplicas quiere decir que cada combinación se corrió tres veces."
    ],
    [
      17.93,
      "Y nos piden todo a mano: totales, sumas de cuadrados, tabla ANOVA y las LSD."
    ],
    [
      23.52,
      "Las piezas: a vale dos, b vale tres y n vale tres."
    ],
    [
      26.89,
      "Hay seis tratamientos y 18 datos en total."
    ],
    [
      30.28,
      "El modelo tiene la media global, el efecto de a, el efecto de b, la interacción entre ambos y el error."
    ],
    [
      36.53,
      "Con eso hay tres hipótesis: que a no influye, que b no influye, y que no hay interacción."
    ],
    [
      44.0,
      "El primer paso es el mismo de siempre: totales."
    ],
    [
      46.93,
      "Primero, el total de cada celda."
    ],
    [
      49.21,
      "Para a uno con b₁, 44 + 34 + 30: 108."
    ],
    [
      54.62,
      "Siguiendo igual, las celdas de a uno suman 108, 140 y 172, y las de a dos, 176, 196 y 209."
    ],
    [
      65.8,
      "Sumando por fila, a uno da 420 y a dos, 581."
    ],
    [
      71.11,
      "Por columna, b₁ da 284, b₂, 336, y b₃, 381."
    ],
    [
      78.86,
      "El gran total es 1001."
    ],
    [
      82.58,
      "La corrección: 1001² / 18, da 55666,72."
    ],
    [
      90.95,
      "La suma de todos los datos al cuadrado es 58301."
    ],
    [
      95.41,
      "Menos la corrección, la suma de cuadrados total queda en 2634,28."
    ],
    [
      102.6,
      "Para a, los totales de fila al cuadrado se dividen por b · n, o sea por 9, porque cada total de fila junta nueve datos."
    ],
    [
      110.2,
      "Menos la corrección: 1440,06."
    ],
    [
      114.82,
      "Para b, los totales de columna al cuadrado se dividen por a por n, o sea por 6."
    ],
    [
      119.89,
      "Menos la corrección: 785,44."
    ],
    [
      124.77,
      "La interacción es la parte más delicada."
    ],
    [
      127.28,
      "Primero se calcula la suma de cuadrados de las celdas: los seis totales de celda al cuadrado, divididos por n, que es tres, menos la corrección."
    ],
    [
      135.96,
      "Eso da 2306,94."
    ],
    [
      139.21,
      "A eso le resto lo que ya explicaron a y b, y lo que sobra es la interacción: 81,44."
    ],
    [
      146.16,
      "El error es lo que queda del total: 327,33."
    ],
    [
      152.69,
      "Los grados de libertad son: uno para a, dos para b, 1 · 2, o sea dos, para la interacción, y 12 para el error, que salen de a por b · n − 1."
    ],
    [
      162.66,
      "El cuadrado medio del error es 27,28."
    ],
    [
      166.18,
      "El F de a es 52,79, muy por encima del crítico de 4,75."
    ],
    [
      172.6,
      "El F de b es 14,4, también sobre su crítico de 3,89."
    ],
    [
      178.0,
      "Y la interacción tiene un F de 1,49, con valor p 0,26."
    ],
    [
      184.09,
      "Conclusión: a y b influyen, y la interacción no es significativa."
    ],
    [
      188.29,
      "Eso tiene una consecuencia práctica: los efectos principales se pueden interpretar por separado."
    ],
    [
      194.99,
      "En la gráfica de interacción, las dos líneas suben y van casi paralelas: el efecto de b es parecido en los dos niveles de a."
    ],
    [
      204.65,
      "Como no hay interacción, se comparan medias marginales."
    ],
    [
      208.09,
      "Cada media de a junta nueve datos, así que su LSD es 2,179 por la raíz de 2 · 27,28, dividido en nueve: 5,36."
    ],
    [
      218.61,
      "Cada media de b junta seis datos, y su LSD da 6,57."
    ],
    [
      223.62,
      "Y si quisiéramos tomar en cuenta la interacción, compararíamos medias de celda, de solo tres datos cada una."
    ],
    [
      230.11,
      "La LSD sube a 9,29."
    ],
    [
      232.73,
      "¿Por qué es más grande?"
    ],
    [
      237.88,
      "Porque cada media de celda se basa en menos datos, así que es menos precisa, y hace falta una diferencia mayor para declararla significativa."
    ],
    [
      246.99,
      "El camino para cualquier factorial a mano: totales de celda, de fila, de columna y gran total; corrección; sumas de cuadrados de a, de b y de celdas; la interacción por diferencia; y el error al final."
    ]
  ],
  "huella": "322c7903ef0c",
  "frasesHabladas": [
    "Empezamos los factoriales con el ejercicio dieciocho del capítulo cinco.",
    "Nos dan los datos de un factorial dos por tres con tres réplicas.",
    "Dos por tres significa que el factor a tiene dos niveles y el factor be tiene tres.",
    "Tres réplicas quiere decir que cada combinación se corrió tres veces.",
    "Y nos piden todo a mano: totales, sumas de cuadrados, tabla ANOVA y las ele ese de.",
    "Las piezas: a vale dos, be vale tres y ene vale tres.",
    "Hay seis tratamientos y dieciocho datos en total.",
    "El modelo tiene la media global, el efecto de a, el efecto de be, la interacción entre ambos y el error.",
    "Con eso hay tres hipótesis: que a no influye, que be no influye, y que no hay interacción.",
    "El primer paso es el mismo de siempre: totales.",
    "Primero, el total de cada celda.",
    "Para a uno con be uno, cuarenta y cuatro más treinta y cuatro más treinta: ciento ocho.",
    "Siguiendo igual, las celdas de a uno suman ciento ocho, ciento cuarenta y ciento setenta y dos, y las de a dos, ciento setenta y seis, ciento noventa y seis y doscientos nueve.",
    "Sumando por fila, a uno da cuatrocientos veinte y a dos, quinientos ochenta y uno.",
    "Por columna, be uno da doscientos ochenta y cuatro, be dos, trescientos treinta y seis, y be tres, trescientos ochenta y uno.",
    "El gran total es mil uno.",
    "La corrección: mil uno al cuadrado, dividido en dieciocho, da cincuenta y cinco mil seiscientos sesenta y seis coma siete dos.",
    "La suma de todos los datos al cuadrado es cincuenta y ocho mil trescientos uno.",
    "Menos la corrección, la suma de cuadrados total queda en dos mil seiscientos treinta y cuatro coma dos ocho.",
    "Para a, los totales de fila al cuadrado se dividen por be por ene, o sea por nueve, porque cada total de fila junta nueve datos.",
    "Menos la corrección: mil cuatrocientos cuarenta coma cero seis.",
    "Para be, los totales de columna al cuadrado se dividen por a por ene, o sea por seis.",
    "Menos la corrección: setecientos ochenta y cinco coma cuatro cuatro.",
    "La interacción es la parte más delicada.",
    "Primero se calcula la suma de cuadrados de las celdas: los seis totales de celda al cuadrado, divididos por ene, que es tres, menos la corrección.",
    "Eso da dos mil trescientos seis coma nueve cuatro.",
    "A eso le resto lo que ya explicaron a y be, y lo que sobra es la interacción: ochenta y uno coma cuatro cuatro.",
    "El error es lo que queda del total: trescientos veintisiete coma tres tres.",
    "Los grados de libertad son: uno para a, dos para be, uno por dos, o sea dos, para la interacción, y doce para el error, que salen de a por be por ene menos uno.",
    "El cuadrado medio del error es veintisiete coma dos ocho.",
    "El efe de a es cincuenta y dos coma siete nueve, muy por encima del crítico de cuatro coma setenta y cinco.",
    "El efe de be es catorce coma cuatro, también sobre su crítico de tres coma ochenta y nueve.",
    "Y la interacción tiene un efe de uno coma cuarenta y nueve, con pe valor cero coma veintiséis.",
    "Conclusión: a y be influyen, y la interacción no es significativa.",
    "Eso tiene una consecuencia práctica: los efectos principales se pueden interpretar por separado.",
    "En la gráfica de interacción, las dos líneas suben y van casi paralelas: el efecto de be es parecido en los dos niveles de a.",
    "Como no hay interacción, se comparan medias marginales.",
    "Cada media de a junta nueve datos, así que su ele ese de es dos coma uno siete nueve por la raíz de dos por veintisiete coma dos ocho, dividido en nueve: cinco coma tres seis.",
    "Cada media de be junta seis datos, y su ele ese de da seis coma cinco siete.",
    "Y si quisiéramos tomar en cuenta la interacción, compararíamos medias de celda, de solo tres datos cada una.",
    "La ele ese de sube a nueve coma dos nueve.",
    "¿Por qué es más grande?",
    "Porque cada media de celda se basa en menos datos, así que es menos precisa, y hace falta una diferencia mayor para declararla significativa.",
    "El camino para cualquier factorial a mano: totales de celda, de fila, de columna y gran total; corrección; sumas de cuadrados de a, de be y de celdas; la interacción por diferencia; y el error al final."
  ]
});
