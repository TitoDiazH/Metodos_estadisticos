/* GENERADO por tools/generar_audio.py desde tools/guiones/m23-lg-12-29.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m23-lg-12-29",
  "modulo": "m23-superficie-respuesta",
  "titulo": "Ejercicio 12.29: el sabor del queso panela",
  "archivo": "audio/m23-lg-12-29.mp3",
  "duracion": 173,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 19.1,
      "titulo": "El diseño"
    },
    {
      "t": 39.9,
      "titulo": "El modelo"
    },
    {
      "t": 64.3,
      "titulo": "¿Es adecuado?"
    },
    {
      "t": 93.4,
      "titulo": "Punto estacionario"
    },
    {
      "t": 116.6,
      "titulo": "Clasificar"
    },
    {
      "t": 132.8,
      "titulo": "El mejor sabor"
    },
    {
      "t": 161.5,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Libro guía · Cap. 12, ej. 29",
  "pregunta": "m23-d022",
  "orden": 8.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 4.47,
    "clave1": 6.85,
    "clave2": 9.11,
    "clave3": 10.87,
    "dis": 19.14,
    "cod": 32.74,
    "sal": 39.92,
    "ecuacion": 41.67,
    "lin": 42.83,
    "cuad": 43.42,
    "inter": 44.11,
    "sig": 48.99,
    "f": 64.33,
    "fcalc": 64.33,
    "rcuad": 69.49,
    "lof": 79.54,
    "deriv": 93.41,
    "d1": 95.68,
    "d2": 97.63,
    "sist": 103.21,
    "sol": 107.58,
    "real": 110.93,
    "hes": 116.56,
    "det": 118.1,
    "ev": 123.09,
    "clas": 128.48,
    "opt": 132.8,
    "mejor": 138.92,
    "fin": 161.53
  },
  "frases": [
    [
      0.0,
      "Ejercicio 29, el último: el sabor del queso panela."
    ],
    [
      4.47,
      "Cinco jueces calificaron el sabor."
    ],
    [
      6.85,
      "Los factores son la sal y el cuajo."
    ],
    [
      9.11,
      "Hay solo ocho quesos."
    ],
    [
      10.87,
      "Se pide un modelo de segundo orden, cuánto explica, y la combinación de sal y cuajo con el mejor sabor."
    ],
    [
      19.14,
      "Si codificamos la sal como sal −5, y el cuajo como cuajo −0,3 / 0,1, los seis puntos externos quedan sobre un círculo de radio uno, formando un hexágono."
    ],
    [
      31.26,
      "Más 2 centros."
    ],
    [
      32.74,
      "Ocho corridas para seis coeficientes: quedan solo dos grados de libertad para el error."
    ],
    [
      39.92,
      "El modelo."
    ],
    [
      41.67,
      "La ecuación."
    ],
    [
      42.83,
      "Lineales, cuadráticos e interacción, que sale exactamente cero por la simetría del hexágono."
    ],
    [
      48.99,
      "Ningún término es significativo al 5 %; el cuadrático del cuajo queda cerca, con p 0,058."
    ],
    [
      56.69,
      "Y los cuadráticos tienen signos opuestos: negativo para la sal, positivo para el cuajo."
    ],
    [
      64.33,
      "La F global da 5,5, con p 0,16: no es significativo."
    ],
    [
      69.49,
      "El R² es 0,93, que parece alto, pero el ajustado cae a 0,76."
    ],
    [
      75.69,
      "Con seis parámetros y ocho datos, cualquier modelo ajusta bien."
    ],
    [
      79.54,
      "La falta de ajuste no es significativa, pero eso tampoco salva al modelo."
    ],
    [
      83.98,
      "Lo que hay que decir: explica el 93 % de la variación observada, pero con tan pocos datos no es confiable."
    ],
    [
      93.41,
      "De todos modos, el procedimiento."
    ],
    [
      95.68,
      "Derivada respecto de la sal."
    ],
    [
      97.63,
      "Respecto del cuajo."
    ],
    [
      99.14,
      "Como la interacción es cero, cada ecuación tiene una sola variable."
    ],
    [
      103.21,
      "Se despeja directo: equis igual a menos bᵢ dividido en dos bᵢᵢ."
    ],
    [
      107.58,
      "Menos 0,18 y −0,05."
    ],
    [
      110.93,
      "Sal 4,8 y cuajo 0,295."
    ],
    [
      116.56,
      "La hessiana es diagonal."
    ],
    [
      118.1,
      "Su determinante: −0,99 · 2,39, negativo."
    ],
    [
      123.09,
      "Los valores propios son los propios cuadráticos, −0,5 y 1,2."
    ],
    [
      128.48,
      "Signos opuestos: punto silla."
    ],
    [
      132.8,
      "Queremos el mejor sabor, y una silla no es un máximo."
    ],
    [
      136.26,
      "El mejor punto está en el borde del hexágono."
    ],
    [
      138.92,
      "Evaluando el modelo en la región, el mayor sabor predicho está con sal cerca de 4,8 y el cuajo más alto del diseño, 0,385: un sabor de 7,5."
    ],
    [
      149.99,
      "Coincide con lo observado: los quesos con más cuajo fueron los mejor evaluados."
    ],
    [
      154.85,
      "Pero con un modelo no significativo, esta recomendación hay que confirmarla."
    ],
    [
      161.53,
      "Un R² alto con pocos datos engaña: mira el ajustado y el F."
    ],
    [
      166.01,
      "Y sin interacción, cada factor se optimiza por separado, con equis igual a menos bᵢ / 2 bᵢᵢ."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio veintinueve, el último: el sabor del queso panela.",
    "Cinco jueces calificaron el sabor.",
    "Los factores son la sal y el cuajo.",
    "Hay solo ocho quesos.",
    "Se pide un modelo de segundo orden, cuánto explica, y la combinación de sal y cuajo con el mejor sabor.",
    "Si codificamos la sal como sal menos cinco, y el cuajo como cuajo menos cero coma tres, dividido en cero coma uno, los seis puntos externos quedan sobre un círculo de radio uno, formando un hexágono.",
    "Más dos centros.",
    "Ocho corridas para seis coeficientes: quedan solo dos grados de libertad para el error.",
    "El modelo.",
    "La ecuación.",
    "Lineales, cuadráticos e interacción, que sale exactamente cero por la simetría del hexágono.",
    "Ningún término es significativo al cinco por ciento; el cuadrático del cuajo queda cerca, con pe cero coma cero cinco ocho.",
    "Y los cuadráticos tienen signos opuestos: negativo para la sal, positivo para el cuajo.",
    "La efe global da cinco coma cinco, con pe cero coma uno seis: no es significativo.",
    "El erre cuadrado es cero coma nueve tres, que parece alto, pero el ajustado cae a cero coma siete seis.",
    "Con seis parámetros y ocho datos, cualquier modelo ajusta bien.",
    "La falta de ajuste no es significativa, pero eso tampoco salva al modelo.",
    "Lo que hay que decir: explica el noventa y tres por ciento de la variación observada, pero con tan pocos datos no es confiable.",
    "De todos modos, el procedimiento.",
    "Derivada respecto de la sal.",
    "Respecto del cuajo.",
    "Como la interacción es cero, cada ecuación tiene una sola variable.",
    "Se despeja directo: equis igual a menos be i dividido en dos be i i.",
    "Menos cero coma uno ocho y menos cero coma cero cinco.",
    "Sal cuatro coma ocho y cuajo cero coma dos nueve cinco.",
    "La hessiana es diagonal.",
    "Su determinante: menos cero coma nueve nueve por dos coma tres nueve, negativo.",
    "Los valores propios son los propios cuadráticos, menos cero coma cinco y uno coma dos.",
    "Signos opuestos: punto silla.",
    "Queremos el mejor sabor, y una silla no es un máximo.",
    "El mejor punto está en el borde del hexágono.",
    "Evaluando el modelo en la región, el mayor sabor predicho está con sal cerca de cuatro coma ocho y el cuajo más alto del diseño, cero coma tres ocho cinco: un sabor de siete coma cinco.",
    "Coincide con lo observado: los quesos con más cuajo fueron los mejor evaluados.",
    "Pero con un modelo no significativo, esta recomendación hay que confirmarla.",
    "Un erre cuadrado alto con pocos datos engaña: mira el ajustado y el efe.",
    "Y sin interacción, cada factor se optimiza por separado, con equis igual a menos be i sobre dos be i i."
  ],
  "huella": "70ad8c57c2e4"
});
