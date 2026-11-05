/* GENERADO por tools/generar_audio.py desde tools/guiones/m20-lg-4-09.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m20-lg-4-09",
  "modulo": "m20-dbca",
  "titulo": "Ejercicio 4.9: bloques con tres tratamientos",
  "archivo": "audio/m20-lg-4-09.mp3",
  "duracion": 277,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 54.1,
      "titulo": "Totales"
    },
    {
      "t": 79.6,
      "titulo": "Sumas de cuadrados"
    },
    {
      "t": 150.0,
      "titulo": "Tabla ANOVA"
    },
    {
      "t": 206.0,
      "titulo": "Comparaciones con la ele ese de"
    },
    {
      "t": 253.3,
      "titulo": "En erre y cierre"
    }
  ],
  "ejercicio": "Libro guía · Cap. 4, ej. 9",
  "pregunta": "m20-d002",
  "orden": 1.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 4.23,
    "clave1": 10.15,
    "clave2": 15.71,
    "clave3": 21.72,
    "dis": 25.5,
    "modelo": 36.94,
    "h0t": 44.76,
    "h0b": 48.61,
    "tot": 54.14,
    "tot-i": 57.34,
    "tot-j": 62.94,
    "tot-g": 68.2,
    "corr": 79.56,
    "sct": 90.82,
    "sctr": 101.62,
    "sctr-div": 115.27,
    "scb": 126.75,
    "sce": 138.37,
    "gl": 149.95,
    "cm": 156.69,
    "ft": 165.97,
    "ftc": 172.8,
    "conc-t": 181.82,
    "fb": 187.29,
    "conc-b": 195.92,
    "lsd": 206.01,
    "lsd-n": 214.21,
    "medias": 222.34,
    "pares": 228.08,
    "mejor": 241.25,
    "r": 253.33,
    "fin": 264.72
  },
  "frases": [
    [
      0.0,
      "Vamos con el ejercicio nueve del capítulo cuatro del libro guía."
    ],
    [
      4.23,
      "El enunciado nos entrega una tabla con tres tratamientos, a, be y ce, medidos en cuatro bloques."
    ],
    [
      10.15,
      "La primera pista está en las palabras «diseño en bloques al azar»: ya nos dicen qué modelo usar."
    ],
    [
      15.71,
      "La segunda es que nos piden totales, sumas de cuadrados, la tabla ANOVA y la ele ese de, en ese orden."
    ],
    [
      21.72,
      "Y hay que trabajar con alfa igual a cero coma cero cinco."
    ],
    [
      25.5,
      "Antes de calcular, ubiquemos las piezas."
    ],
    [
      28.36,
      "Los tratamientos son tres, así que ka vale tres."
    ],
    [
      31.63,
      "Los bloques son cuatro, así que be vale cuatro."
    ],
    [
      34.61,
      "En total hay doce datos."
    ],
    [
      36.94,
      "El modelo es el del de be ce a: cada dato es la media global, más el efecto del tratamiento, más el efecto del bloque, más el error."
    ],
    [
      44.76,
      "La hipótesis nula de tratamientos dice que los tres efectos son cero, y la de bloques, que los cuatro efectos de bloque son cero."
    ],
    [
      54.14,
      "Partimos por los totales, que son la base de todo."
    ],
    [
      57.34,
      "Sumando cada fila: el tratamiento a suma quince, el be suma veintinueve, y el ce, veinte."
    ],
    [
      62.94,
      "Sumando cada columna, los bloques suman catorce, diecinueve, ocho y veintitrés."
    ],
    [
      68.2,
      "Y el gran total es sesenta y cuatro."
    ],
    [
      70.39,
      "Una buena costumbre es comprobar que filas y columnas sumen lo mismo."
    ],
    [
      74.34,
      "Aquí ambas dan sesenta y cuatro, así que vamos bien."
    ],
    [
      79.56,
      "El término de corrección es el gran total al cuadrado sobre el número de datos: sesenta y cuatro al cuadrado, dividido en doce, da trescientos cuarenta y uno coma tres tres tres."
    ],
    [
      90.82,
      "Para la suma de cuadrados total, elevo cada dato al cuadrado y los sumo."
    ],
    [
      95.16,
      "Eso da cuatrocientos catorce."
    ],
    [
      97.26,
      "Menos la corrección, quedan setenta y dos coma seis seis siete."
    ],
    [
      101.62,
      "Para tratamientos, elevo al cuadrado los totales de fila, quince, veintinueve y veinte, y los sumo: mil cuatrocientos sesenta y seis."
    ],
    [
      110.0,
      "¿Por cuánto divido ese número?"
    ],
    [
      115.27,
      "Por cuatro, el número de bloques, porque cada total junta cuatro datos."
    ],
    [
      119.86,
      "Queda trescientos sesenta y seis coma cinco, y al restar la corrección, veinticinco coma uno seis siete."
    ],
    [
      126.75,
      "Con los bloques es lo mismo, pero dividiendo por tres."
    ],
    [
      130.16,
      "Los totales de columna al cuadrado suman mil ciento cincuenta; dividido en tres y menos la corrección, da cuarenta y dos exactos."
    ],
    [
      138.37,
      "Y el error sale por diferencia: setenta y dos coma seis seis siete, menos veinticinco coma uno seis siete, menos cuarenta y dos."
    ],
    [
      146.28,
      "Queda cinco coma cinco."
    ],
    [
      149.95,
      "Los grados de libertad son dos para tratamientos, tres para bloques, y dos por tres, seis, para el error."
    ],
    [
      156.69,
      "Dividiendo cada suma por sus grados de libertad, los cuadrados medios quedan en doce coma cinco ocho, catorce, y cero coma nueve uno siete para el error."
    ],
    [
      165.97,
      "El efe de tratamientos es doce coma cinco ocho dividido en cero coma nueve uno siete: trece coma setenta y tres."
    ],
    [
      172.8,
      "El crítico con dos y seis grados de libertad es cinco coma catorce."
    ],
    [
      176.99,
      "Trece coma siete lo supera de lejos, y el pe valor es cero coma cero cero seis."
    ],
    [
      181.82,
      "Se rechaza la hipótesis nula: los tratamientos no tienen todos la misma media."
    ],
    [
      187.29,
      "Para los bloques, catorce dividido en cero coma nueve uno siete da quince coma veintisiete, contra un crítico de cuatro coma setenta y seis."
    ],
    [
      195.92,
      "También se rechaza."
    ],
    [
      197.83,
      "O sea, los bloques sí eran distintos, y bloquear sirvió: esa variabilidad no quedó metida en el error."
    ],
    [
      206.01,
      "Falta ver qué tratamientos difieren."
    ],
    [
      208.23,
      "La ele ese de usa el te de Student con seis grados de libertad, que vale dos coma cuatro cuatro siete, multiplicado por la raíz de dos por cero coma nueve uno siete, dividido en cuatro bloques."
    ],
    [
      219.79,
      "Da uno coma seis cinco siete."
    ],
    [
      222.34,
      "Las medias son: a, tres coma setenta y cinco; be, siete coma veinticinco; y ce, cinco."
    ],
    [
      228.08,
      "Ahora comparo cada par con uno coma seis cinco siete."
    ],
    [
      231.35,
      "A contra be difieren en tres coma cinco: sí son distintos."
    ],
    [
      235.14,
      "A contra ce, uno coma veinticinco: no alcanza."
    ],
    [
      238.26,
      "Be contra ce, dos coma veinticinco: sí."
    ],
    [
      241.25,
      "El enunciado no dice si conviene una respuesta alta o baja."
    ],
    [
      244.93,
      "Si suponemos que mayor es mejor, el tratamiento be es significativamente superior a los otros dos."
    ],
    [
      253.33,
      "En erre se ajusta a o ve con la respuesta, tilde, tratamiento más bloque, con los dos como factor."
    ],
    [
      259.33,
      "Y la ele ese de sale con la función ele ese de punto test, del paquete agricolae."
    ],
    [
      264.72,
      "Resumiendo: totales, corrección, sumas de cuadrados con los divisores correctos, el error por diferencia, y recién ahí la tabla."
    ],
    [
      272.91,
      "Ese orden te sirve para cualquier ejercicio de bloques."
    ]
  ],
  "huella": "7db9d45aa618"
});
