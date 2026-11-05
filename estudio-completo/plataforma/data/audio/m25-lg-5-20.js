/* GENERADO por tools/generar_audio.py desde tools/guiones/m25-lg-5-20.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m25-lg-5-20",
  "modulo": "m25-factorial-general",
  "titulo": "Ejercicio 5.20: pegamento y temperatura de curado",
  "archivo": "audio/m25-lg-5-20.mp3",
  "duracion": 185,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 38.0,
      "titulo": "Totales y sumas de cuadrados"
    },
    {
      "t": 70.3,
      "titulo": "Tabla ANOVA"
    },
    {
      "t": 113.1,
      "titulo": "Gráficas y mejor tratamiento"
    },
    {
      "t": 158.3,
      "titulo": "Residuos"
    }
  ],
  "ejercicio": "Libro guía · Cap. 5, ej. 20",
  "pregunta": "m25-d008",
  "orden": 3.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 7.95,
    "clave1": 13.82,
    "clave2": 18.08,
    "dis": 20.72,
    "modelo": 25.06,
    "h0a": 30.64,
    "h0b": 32.8,
    "h0ab": 34.41,
    "tot": 37.97,
    "tot-ij": 44.06,
    "tot-g": 47.51,
    "sct": 50.83,
    "sca": 54.02,
    "scb": 56.91,
    "scab": 59.76,
    "sce": 64.06,
    "fa": 70.26,
    "fb": 77.37,
    "fab": 81.73,
    "conc": 89.15,
    "conc-r": 102.15,
    "graf": 113.08,
    "efectos": 130.96,
    "mejor": 142.59,
    "pred": 146.54,
    "sup": 158.3,
    "sup-sw": 160.78,
    "sup-lev": 165.0,
    "fin": 173.83
  },
  "frases": [
    [
      0.0,
      "El ejercicio veinte del capítulo cinco busca mejorar la resistencia a la torsión de componentes electrónicos pegados sobre placas."
    ],
    [
      7.95,
      "Se prueban dos tipos de pegamento y tres temperaturas de curado: sesenta, ochenta y cien grados."
    ],
    [
      13.82,
      "En cada combinación se analizan dos componentes, o sea, dos réplicas."
    ],
    [
      18.08,
      "Y se busca la mayor resistencia."
    ],
    [
      20.72,
      "Es un factorial dos por tres con dos réplicas: doce corridas."
    ],
    [
      25.06,
      "El modelo: media, efecto del pegamento, efecto de la temperatura, interacción y error."
    ],
    [
      30.64,
      "Hipótesis: el pegamento no influye, la temperatura no influye, y no hay interacción."
    ],
    [
      37.97,
      "Los totales de celda, para el pegamento uno, son cinco coma tres, siete coma dos y ocho coma dos."
    ],
    [
      44.06,
      "Para el pegamento dos: dos coma ocho dos, seis y nueve."
    ],
    [
      47.51,
      "El gran total es treinta y ocho coma cinco dos."
    ],
    [
      50.83,
      "La suma de cuadrados total es doce coma siete nueve."
    ],
    [
      54.02,
      "La del pegamento, cero coma sesenta y nueve."
    ],
    [
      56.91,
      "La de la temperatura, diez coma tres cinco."
    ],
    [
      59.76,
      "La interacción, por diferencia desde las celdas, uno coma tres siete."
    ],
    [
      64.06,
      "Y el error, apenas cero coma tres ocho, con seis grados de libertad."
    ],
    [
      70.26,
      "El pegamento tiene un efe de diez coma nueve nueve, contra un crítico de cinco coma noventa y nueve: es significativo."
    ],
    [
      77.37,
      "La temperatura, ochenta y dos coma tres cinco: muy significativa."
    ],
    [
      81.73,
      "Y la interacción, diez coma ocho siete, contra un crítico de cinco coma catorce, con pe valor cero coma cero uno."
    ],
    [
      89.15,
      "Los tres efectos están activos."
    ],
    [
      91.32,
      "Y como la interacción es significativa, cambia la forma de concluir."
    ],
    [
      95.55,
      "¿Puedo elegir el mejor pegamento mirando solo su media?"
    ],
    [
      102.15,
      "No."
    ],
    [
      102.83,
      "Con interacción, el efecto de un factor depende del nivel del otro."
    ],
    [
      106.92,
      "Hay que mirar las seis medias de celda, no los promedios por separado."
    ],
    [
      113.08,
      "En la gráfica de interacción se ve claro."
    ],
    [
      115.63,
      "A sesenta grados, el pegamento uno resiste más: dos coma sesenta y cinco contra uno coma cuarenta y uno."
    ],
    [
      122.15,
      "Pero a cien grados se invierten: el pegamento dos llega a cuatro coma cinco, y el uno se queda en cuatro coma uno."
    ],
    [
      128.93,
      "Las líneas se cruzan."
    ],
    [
      130.96,
      "Si solo mirara los efectos principales, diría que el pegamento uno es mejor, porque su media general es tres coma cuarenta y cinco contra dos coma noventa y siete."
    ],
    [
      140.72,
      "Y sería un error."
    ],
    [
      142.59,
      "El mejor tratamiento es el pegamento dos con curado a cien grados."
    ],
    [
      146.54,
      "Con interacción activa, la predicción es simplemente la media de esa celda: cuatro coma cinco."
    ],
    [
      152.28,
      "Y un intervalo aproximado le suma y le resta cero coma cuatro tres."
    ],
    [
      158.3,
      "Al revisar los residuos hay problemas."
    ],
    [
      160.78,
      "Shapiro Wilk rechaza la normalidad, con pe cero coma cero cero cinco, y Levene detecta varianzas distintas entre tratamientos."
    ],
    [
      168.73,
      "Con solo dos réplicas por celda, conviene tomar estas conclusiones con cautela."
    ],
    [
      173.83,
      "La idea que se lleva este ejercicio: cuando la interacción es activa, el mejor tratamiento se elige celda por celda, nunca combinando los mejores niveles de cada factor por separado."
    ]
  ],
  "huella": "31cc38f246d6"
});
