/* GENERADO por tools/generar_audio.py desde tools/guiones/m15-lda.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m15-lda",
  "modulo": "m15-lda",
  "titulo": "Clasificación supervisada: LDA",
  "archivo": "audio/m15-lda.mp3",
  "duracion": 318,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Ahora los grupos sí se conocen"
    },
    {
      "t": 46.6,
      "titulo": "Con una sola variable"
    },
    {
      "t": 96.8,
      "titulo": "La función discriminante de Fisher"
    },
    {
      "t": 227.2,
      "titulo": "Supuestos y erre"
    },
    {
      "t": 291.3,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "idea": 7.05,
    "sup": 11.91,
    "regla": 16.68,
    "banco": 20.98,
    "banco-d": 23.73,
    "banco-g": 27.87,
    "banco-m": 32.41,
    "nuevo": 39.7,
    "uni": 46.61,
    "uni-pat": 49.46,
    "uni-pat-r": 56.52,
    "uni-deu": 65.41,
    "uni-nuevo": 71.85,
    "uni-q": 78.71,
    "uni-r": 85.7,
    "fisher": 96.82,
    "fisher-d": 100.45,
    "fisher-q": 103.81,
    "fisher-senal": 105.84,
    "fisher-ruido": 110.47,
    "fisher-f": 115.84,
    "fisher-2g": 126.15,
    "nomem": 134.22,
    "calc": 140.16,
    "calc-dif": 140.92,
    "calc-w": 147.03,
    "calc-u": 148.75,
    "calc-sig": 156.7,
    "corte": 163.48,
    "corte-f": 167.04,
    "corte-v": 173.54,
    "nuevo-d": 177.5,
    "nuevo-c": 179.02,
    "nuevo-r": 184.66,
    "acc": 191.49,
    "acc-err": 201.49,
    "escala": 208.2,
    "escala-r": 217.52,
    "sup2": 227.17,
    "sup-n": 229.15,
    "sup-s": 235.31,
    "sup-i": 241.46,
    "sup-q": 246.77,
    "sup-qr": 253.71,
    "r": 260.36,
    "r-pred": 266.25,
    "r-conf": 275.47,
    "r-acc": 279.64,
    "r-ej": 283.32,
    "c": 291.33,
    "c1": 292.03,
    "c2": 297.88,
    "c3": 303.69,
    "c4": 306.71,
    "c5": 310.46,
    "fin": 316.02
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo quince: la clasificación supervisada, y el análisis discriminante lineal, ele de a."
    ],
    [
      7.05,
      "En el clastering no sabíamos cuáles eran los grupos."
    ],
    [
      10.38,
      "Ahora es al revés."
    ],
    [
      11.91,
      "Tenemos datos históricos donde sí sabemos a qué grupo pertenece cada observación, y queremos construir una regla para clasificar casos nuevos."
    ],
    [
      20.98,
      "El ejemplo de la clase es el Banco de Ademuz."
    ],
    [
      23.73,
      "Hay dieciséis clientes, con dos variables: patrimonio y deuda."
    ],
    [
      27.87,
      "Ocho de ellos fueron fallidos, no pagaron, y ocho fueron cumplidores."
    ],
    [
      32.41,
      "Los fallidos tienen, en promedio, patrimonio cinco y deuda cinco."
    ],
    [
      36.54,
      "Los cumplidores, patrimonio nueve y deuda tres."
    ],
    [
      39.7,
      "Llega un cliente nuevo, con patrimonio siete y deuda cuatro."
    ],
    [
      43.48,
      "¿Le prestamos?"
    ],
    [
      46.61,
      "Lo más simple es mirar una sola variable."
    ],
    [
      49.46,
      "Con el patrimonio, el corte natural está en el promedio de las dos medias: cinco más nueve, dividido en dos, siete."
    ],
    [
      56.52,
      "Bajo siete, fallido; sobre siete, cumplidor."
    ],
    [
      59.53,
      "Con esa regla se acierta en doce de los dieciséis clientes, el setenta y cinco por ciento."
    ],
    [
      65.41,
      "Con la deuda, el corte es cuatro, y se acierta solo en nueve de dieciséis, el cincuenta y seis por ciento."
    ],
    [
      71.85,
      "Y fíjate en el cliente nuevo: patrimonio siete y deuda cuatro."
    ],
    [
      75.63,
      "Cae justo en el corte de las dos reglas."
    ],
    [
      78.71,
      "¿Qué se está perdiendo al mirar las variables por separado?"
    ],
    [
      85.7,
      "La información que hay en la combinación de las dos."
    ],
    [
      88.54,
      "Un cliente puede tener patrimonio regular y deuda baja, y en conjunto parecerse claramente a un grupo."
    ],
    [
      96.82,
      "La idea de Fisher es combinar las variables en un solo puntaje: de igual a u uno por patrimonio, más u dos por deuda."
    ],
    [
      103.81,
      "¿Y cómo se eligen los pesos?"
    ],
    [
      105.84,
      "Buscando que las medias de los grupos queden lo más lejos posible, eso es la señal, y que dentro de cada grupo los datos queden lo más juntos posible, eso es el ruido."
    ],
    [
      115.84,
      "Formalmente se maximiza un cociente entre la dispersión entre grupos y la dispersión dentro de los grupos."
    ],
    [
      122.04,
      "Es la misma idea del ANOVA, entre contra dentro, pero con matrices."
    ],
    [
      126.15,
      "Y con dos grupos, la solución es directa: u es la inversa de la matriz de dispersión dentro, W, por la diferencia de medias."
    ],
    [
      134.22,
      "La clase dice que esta fórmula no hay que memorizarla."
    ],
    [
      137.43,
      "Lo que sí hay que entender es qué hace."
    ],
    [
      140.16,
      "En el banco, la diferencia de medias, fallidos menos cumplidores, es menos cuatro en patrimonio y dos en deuda."
    ],
    [
      147.03,
      "Con la matriz W de la clase, los pesos salen menos cero coma cero setenta y cuatro para el patrimonio, y cero coma cero sesenta y siete para la deuda."
    ],
    [
      156.7,
      "Léelo así: más patrimonio baja el puntaje, y más deuda lo sube."
    ],
    [
      160.74,
      "Puntaje alto, perfil de fallido."
    ],
    [
      163.48,
      "El corte es el promedio de los puntajes medios de cada grupo: menos cero coma cero tres siete para los fallidos, y menos cero coma cuatro seis seis para los cumplidores."
    ],
    [
      173.54,
      "El corte queda en menos cero coma doscientos cincuenta y uno."
    ],
    [
      177.5,
      "¿Y el cliente nuevo?"
    ],
    [
      179.02,
      "Menos cero coma cero setenta y cuatro por siete, más cero coma cero sesenta y siete por cuatro."
    ],
    [
      184.66,
      "Da menos cero coma doscientos cincuenta y uno: justo en la frontera."
    ],
    [
      188.87,
      "Es un cliente realmente dudoso."
    ],
    [
      191.49,
      "Con los dieciséis clientes, la regla de Fisher acierta en quince: noventa y tres coma setenta y cinco por ciento, contra el setenta y cinco de la mejor variable sola."
    ],
    [
      201.49,
      "El único error es el cliente trece, un cumplidor con patrimonio seis coma tres y deuda cinco coma dos."
    ],
    [
      208.2,
      "Un detalle importante."
    ],
    [
      209.78,
      "Solo importa la dirección de los pesos."
    ],
    [
      212.5,
      "Si se multiplican por cualquier número, incluso negativo, la regla es la misma."
    ],
    [
      217.52,
      "Por eso erre entrega otros coeficientes, menos cero coma cuatro dos dos y cero coma tres ocho, que apuntan en la misma dirección."
    ],
    [
      227.17,
      "¿Cuándo funciona bien ele de a?"
    ],
    [
      229.15,
      "Primero, normalidad multivariada dentro de cada grupo, aunque es bastante robusto a desviaciones leves."
    ],
    [
      235.31,
      "Segundo, que los grupos tengan la misma matriz de covarianza."
    ],
    [
      239.17,
      "Eso se contrasta con el test de Box."
    ],
    [
      241.46,
      "Y tercero, observaciones independientes, que depende del diseño del estudio."
    ],
    [
      246.77,
      "¿Y si el test de Box rechaza que las covarianzas son iguales?"
    ],
    [
      253.71,
      "Entonces conviene el discriminante cuadrático, cu de a, que es lo que viene en el módulo dieciséis."
    ],
    [
      260.36,
      "En erre se usa la función lda, del paquete MASS, con la fórmula grupo tilde patrimonio más deuda."
    ],
    [
      266.25,
      "Después, predict entrega tres cosas: class, la clasificación; posterior, las probabilidades de cada grupo; y equis, los puntajes discriminantes."
    ],
    [
      275.47,
      "La matriz de confusión se arma con table, el real contra el predicho, y la exactitud es la suma de la diagonal sobre el total."
    ],
    [
      283.32,
      "En el banco: siete cumplidores bien y uno mal, ocho fallidos bien."
    ],
    [
      287.65,
      "Quince de dieciséis."
    ],
    [
      291.33,
      "En resumen: en la clasificación supervisada los grupos se conocen, y se busca una regla para casos nuevos."
    ],
    [
      297.88,
      "Fisher combina las variables en un puntaje que separa las medias y junta los datos de cada grupo, y se clasifica comparando con el punto medio."
    ],
    [
      306.71,
      "Supone normalidad, covarianzas iguales e independencia."
    ],
    [
      310.46,
      "En el banco pasamos de setenta y cinco a casi noventa y cuatro por ciento de aciertos."
    ],
    [
      316.02,
      "Eso fue el módulo quince."
    ]
  ],
  "huella": "3262abf0e8be"
});
