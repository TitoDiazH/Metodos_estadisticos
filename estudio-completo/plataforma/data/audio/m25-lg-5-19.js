/* GENERADO por tools/generar_audio.py desde tools/guiones/m25-lg-5-19.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m25-lg-5-19",
  "modulo": "m25-factorial-general",
  "titulo": "Ejercicio 5.19: hinchamiento del catalizador",
  "archivo": "audio/m25-lg-5-19.mp3",
  "duracion": 211,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 46.0,
      "titulo": "Tabla ANOVA"
    },
    {
      "t": 79.8,
      "titulo": "LSD y Tukey"
    },
    {
      "t": 140.0,
      "titulo": "Interacción y mejor tratamiento"
    },
    {
      "t": 172.0,
      "titulo": "Supuestos"
    }
  ],
  "ejercicio": "Libro guía · Cap. 5, ej. 19",
  "pregunta": "m25-d005",
  "orden": 2.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 6.03,
    "clave1": 9.62,
    "clave2": 14.19,
    "clave3": 18.53,
    "dis": 22.61,
    "modelo": 32.27,
    "h0a": 38.58,
    "h0b": 40.77,
    "h0ab": 42.41,
    "tabla": 45.98,
    "fa": 55.46,
    "fb": 57.71,
    "fab": 62.71,
    "conc": 69.43,
    "medias": 79.76,
    "lsd": 93.4,
    "lsd-b": 98.24,
    "tukey": 103.08,
    "tukey-r": 117.51,
    "pares": 127.96,
    "graf": 139.96,
    "mejor": 150.46,
    "pred": 155.16,
    "sup": 171.98,
    "sup-sw": 174.82,
    "sup-lev": 181.34,
    "disp": 187.07,
    "fin": 200.21
  },
  "frases": [
    [
      0.0,
      "El ejercicio diecinueve del capítulo cinco viene de la fabricación de botellas de polietileno."
    ],
    [
      6.03,
      "Se estudia el hinchamiento del catalizador después de la extrusión."
    ],
    [
      9.62,
      "Hay dos factores: el molde, con dos niveles, y el catalizador, con tres."
    ],
    [
      14.19,
      "Cada combinación se repitió diez veces, así que son sesenta corridas."
    ],
    [
      18.53,
      "Y un dato clave para el final: se desea un hinchamiento bajo."
    ],
    [
      22.61,
      "Es un factorial dos por tres con diez réplicas."
    ],
    [
      25.61,
      "Con tantos datos, aquí no tiene sentido sumar a mano: lo razonable es leer la tabla que entrega erre."
    ],
    [
      32.27,
      "El modelo es el del factorial: media, efecto del molde, efecto del catalizador, interacción y error."
    ],
    [
      38.58,
      "Las hipótesis: el molde no influye, el catalizador no influye, y no hay interacción."
    ],
    [
      45.98,
      "En la tabla, el error tiene cincuenta y cuatro grados de libertad, que salen de seis tratamientos por nueve, y un cuadrado medio de uno coma seis dos."
    ],
    [
      55.46,
      "El molde tiene un efe de ciento once."
    ],
    [
      57.71,
      "El catalizador, de cuarenta y siete."
    ],
    [
      60.15,
      "Los dos con pe valor prácticamente cero."
    ],
    [
      62.71,
      "La interacción, en cambio, tiene un efe de uno coma cero seis, con pe valor cero coma treinta y cinco."
    ],
    [
      69.43,
      "Así que los efectos activos son el molde y el catalizador, y la interacción no."
    ],
    [
      74.19,
      "De nuevo, eso nos permite mirar cada factor por separado."
    ],
    [
      79.76,
      "Las medias por molde son noventa y dos coma cinco siete para el uno, y ochenta y nueve coma uno para el dos."
    ],
    [
      86.53,
      "Por catalizador: ochenta y nueve coma tres cinco, noventa coma uno, y noventa y tres coma cero cinco."
    ],
    [
      93.4,
      "La ele ese de para el molde, con treinta datos por media, es cero coma seis seis."
    ],
    [
      98.24,
      "Para el catalizador, con veinte datos por media, es cero coma ocho uno."
    ],
    [
      103.08,
      "Tukey, en cambio, usa el rango estudentizado en vez del te de Student."
    ],
    [
      107.4,
      "Para el catalizador da cero coma nueve siete, más que la ele ese de."
    ],
    [
      111.53,
      "¿Por qué Tukey exige una diferencia mayor?"
    ],
    [
      117.51,
      "Porque controla el error tipo uno de todas las comparaciones a la vez."
    ],
    [
      121.95,
      "Es más conservador: si algo es significativo con Tukey, también lo es con la ele ese de."
    ],
    [
      127.96,
      "Con cualquiera de los dos métodos, el catalizador tres es distinto de los otros dos."
    ],
    [
      132.98,
      "En cambio el uno y el dos difieren solo en cero coma setenta y cinco, que no alcanza."
    ],
    [
      139.96,
      "En la gráfica de interacción, las líneas de los dos moldes van casi paralelas: el molde dos queda siempre unos tres puntos más abajo, sea cual sea el catalizador."
    ],
    [
      150.46,
      "Como queremos hinchamiento bajo, conviene el molde dos y el catalizador uno."
    ],
    [
      155.16,
      "Sin interacción, la predicción se arma sumando a la media global los efectos de cada factor: noventa coma ocho tres, menos uno coma siete tres por el molde, menos uno coma cuatro ocho por el catalizador."
    ],
    [
      167.75,
      "Da ochenta y siete coma seis dos."
    ],
    [
      171.98,
      "Al revisar los supuestos, aparece un detalle."
    ],
    [
      174.82,
      "Shapiro Wilk rechaza la normalidad de los residuos, con pe valor menor que cero coma cero cero cero uno."
    ],
    [
      181.34,
      "En cambio Levene no detecta varianzas distintas, con pe cero coma cincuenta y cinco."
    ],
    [
      187.07,
      "Y la última pregunta: ¿en qué molde es menor la dispersión?"
    ],
    [
      190.73,
      "La desviación de los residuos es uno coma uno en el molde uno, y uno coma tres cuatro en el molde dos."
    ],
    [
      196.82,
      "Entonces la dispersión es menor en el molde uno."
    ],
    [
      200.21,
      "Fíjate en la tensión que deja el ejercicio: el molde dos da menor hinchamiento promedio, pero el molde uno es un poco más parejo."
    ],
    [
      207.88,
      "Elegir bien es pesar las dos cosas."
    ]
  ],
  "huella": "04e0d58dbdfb"
});
