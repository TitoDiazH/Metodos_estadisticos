/* GENERADO por tools/generar_audio.py desde tools/guiones/m03-normal-multivariada.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m03-normal-multivariada",
  "modulo": "m03-normal-multivariada",
  "titulo": "Distribución normal multivariada",
  "archivo": "audio/m03-normal-multivariada.mp3",
  "duracion": 229,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "La campana en varias dimensiones"
    },
    {
      "t": 79.5,
      "titulo": "Correlación cero e independencia"
    },
    {
      "t": 122.2,
      "titulo": "La suma de dos normales"
    },
    {
      "t": 204.7,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "idea": 4.52,
    "idea-m": 11.3,
    "idea-dos": 15.25,
    "mu": 17.54,
    "sigma": 18.75,
    "frase": 20.65,
    "mu-r": 25.7,
    "sigma-r": 29.47,
    "elipse": 36.28,
    "elipse-ej": 41.84,
    "circulo": 51.52,
    "circulo-r": 59.61,
    "marg": 65.14,
    "marg-no": 70.66,
    "indep": 79.47,
    "indep-exc": 83.74,
    "indep-r": 86.69,
    "indep-tabla": 93.21,
    "indep-1": 94.43,
    "indep-2": 98.97,
    "pauta": 105.11,
    "pauta-1": 110.9,
    "pauta-2": 113.11,
    "pauta-3": 115.4,
    "suma": 122.19,
    "suma-def": 125.12,
    "suma-idea": 131.07,
    "suma-mu": 136.55,
    "suma-var": 139.26,
    "ej": 146.05,
    "ej-s": 148.8,
    "ej-q": 153.22,
    "ej-mu": 157.35,
    "ej-var": 159.63,
    "ej-var-r": 167.06,
    "ej-z": 171.74,
    "ej-p": 177.5,
    "ej-r": 182.55,
    "ej-sd": 187.02,
    "olvido": 194.34,
    "olvido-r": 197.67,
    "c": 204.71,
    "c1": 205.39,
    "c2": 210.61,
    "c3": 215.86,
    "c4": 220.1,
    "fin": 226.99
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo tres: la distribución normal multivariada."
    ],
    [
      4.52,
      "La normal de siempre, la campana de Gauss, describe una sola variable con dos números: la media y la varianza."
    ],
    [
      11.3,
      "La normal multivariada hace lo mismo con varias variables a la vez."
    ],
    [
      15.25,
      "Y también queda descrita por dos cosas: un vector de medias, y una matriz de covarianza."
    ],
    [
      20.65,
      "En la clase lo resumen así: normal multivariada es media más covarianza."
    ],
    [
      25.7,
      "El vector de medias dice dónde está el centro de la nube de puntos."
    ],
    [
      29.47,
      "Y la matriz de covarianza dice su forma: qué tan dispersa es en cada dirección, y hacia dónde se inclina."
    ],
    [
      36.28,
      "Con dos variables, si cortas la campana a cierta altura, el borde que queda es una elipse."
    ],
    [
      41.84,
      "En el ejemplo de la clase, con medias cero, varianzas uno y correlación cero coma siete, la elipse se inclina hacia arriba, porque la correlación es positiva."
    ],
    [
      51.52,
      "¿Y cómo se vería si la correlación fuera cero y las dos varianzas iguales?"
    ],
    [
      59.61,
      "Como un círculo."
    ],
    [
      60.94,
      "Sin inclinación, e igual de ancha en todas las direcciones."
    ],
    [
      65.14,
      "Un detalle importante: en una normal multivariada, cada variable por separado es normal."
    ],
    [
      70.66,
      "Pero al revés no basta."
    ],
    [
      72.38,
      "Que cada variable sea normal por su lado no garantiza que juntas sean normal multivariada."
    ],
    [
      79.47,
      "En el módulo uno vimos que correlación cero no implica independencia."
    ],
    [
      83.74,
      "Bueno, la normal es justamente la excepción."
    ],
    [
      86.69,
      "Si dos variables son normales conjuntas y su correlación es cero, entonces sí son independientes."
    ],
    [
      93.21,
      "Ordenémoslo."
    ],
    [
      94.43,
      "Si son independientes, la correlación es cero."
    ],
    [
      97.58,
      "Eso vale siempre."
    ],
    [
      98.97,
      "Si la correlación es cero, son independientes: eso solo vale si son normales conjuntas."
    ],
    [
      105.11,
      "En la prueba uno apareció esta afirmación, y la pauta pedía justificar que es falsa en general."
    ],
    [
      110.9,
      "La relación puede ser no lineal."
    ],
    [
      113.11,
      "Solo vale con normalidad conjunta."
    ],
    [
      115.4,
      "Y una variable puede afectar la varianza de la otra sin cambiar la correlación."
    ],
    [
      122.19,
      "El ejercicio típico de este tema es con una suma."
    ],
    [
      125.12,
      "Si equis uno y equis dos son normales conjuntas, ye igual a equis uno más equis dos también es normal."
    ],
    [
      131.07,
      "Así que solo hay que calcular su media y su varianza, y después usar la normal de siempre."
    ],
    [
      136.55,
      "La media es fácil: la suma de las medias."
    ],
    [
      139.26,
      "La varianza tiene un truco: es la varianza de equis uno, más la de equis dos, más dos veces la covarianza."
    ],
    [
      146.05,
      "El ejemplo de la clase: las medias son uno y dos, y la matriz de covarianza tiene cuatro y tres en la diagonal, y uno fuera."
    ],
    [
      153.22,
      "Nos piden la probabilidad de que ye sea menor o igual a cinco."
    ],
    [
      157.35,
      "La media de ye: uno más dos, tres."
    ],
    [
      159.63,
      "La varianza: cuatro más tres, más dos por uno."
    ],
    [
      162.67,
      "¿Cuánto da?"
    ],
    [
      167.06,
      "Nueve."
    ],
    [
      168.81,
      "Así que la desviación estándar es tres."
    ],
    [
      171.74,
      "Ahora es una normal común: cinco menos tres, dividido en tres, da cero coma sesenta y siete."
    ],
    [
      177.5,
      "Y la probabilidad de estar bajo eso es cero coma siete cuatro siete cinco."
    ],
    [
      182.55,
      "En erre es una línea: pnorm de cinco, con media tres y desviación tres."
    ],
    [
      187.02,
      "Ojo con eso: pnorm pide la desviación estándar, no la varianza."
    ],
    [
      191.08,
      "Si le pasas nueve, el resultado sale mal."
    ],
    [
      194.34,
      "El otro error típico es olvidar el dos por la covarianza."
    ],
    [
      197.67,
      "Sin ese término, la varianza daría siete en vez de nueve, y la probabilidad cambia."
    ],
    [
      204.71,
      "En resumen: la normal multivariada se describe con un vector de medias y una matriz de covarianza."
    ],
    [
      210.61,
      "En dos dimensiones, sus contornos son elipses, cuya forma depende de la covarianza."
    ],
    [
      215.86,
      "Con normalidad conjunta, correlación cero sí implica independencia."
    ],
    [
      220.1,
      "Y la suma de dos normales es normal, con varianza igual a la suma de varianzas más dos veces la covarianza."
    ],
    [
      226.99,
      "Eso fue el módulo tres."
    ]
  ],
  "huella": "52f78566bed7"
});
