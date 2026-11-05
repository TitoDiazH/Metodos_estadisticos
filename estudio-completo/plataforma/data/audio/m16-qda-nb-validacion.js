/* GENERADO por tools/generar_audio.py desde tools/guiones/m16-qda-nb-validacion.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m16-qda-nb-validacion",
  "modulo": "m16-qda-nb-validacion",
  "titulo": "QDA, Naive Bayes y validación",
  "archivo": "audio/m16-qda-nb-validacion.mp3",
  "duracion": 401,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Cuando las covarianzas no son iguales"
    },
    {
      "t": 81.1,
      "titulo": "Naive Bayes"
    },
    {
      "t": 250.1,
      "titulo": "La matriz de confusión"
    },
    {
      "t": 307.5,
      "titulo": "Validar con datos nuevos"
    },
    {
      "t": 374.1,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "lda": 7.21,
    "lda-f": 14.57,
    "qda": 18.07,
    "qda-f": 21.73,
    "costo": 24.52,
    "costo-r": 31.35,
    "box": 43.64,
    "box-h0": 45.94,
    "box-si": 50.07,
    "box-no": 55.04,
    "box-pr": 57.27,
    "box-ej": 64.41,
    "box-ej-r": 72.9,
    "box-ej-q": 75.23,
    "nb": 81.1,
    "nb-q": 85.19,
    "nb-f": 91.43,
    "nb-prod": 97.14,
    "naive": 102.2,
    "nb-cont": 110.4,
    "nb-cat": 118.04,
    "nb-ej": 122.58,
    "nb-ej-f": 129.49,
    "nb-ej-fr": 138.74,
    "nb-ej-c": 140.94,
    "nb-ej-cr": 147.18,
    "nb-ej-q": 149.43,
    "nb-ej-r": 154.67,
    "post": 156.96,
    "prior": 163.25,
    "prior-ej": 164.99,
    "prior-ej2": 170.53,
    "prior-r": 178.36,
    "dens": 182.81,
    "dens-r": 186.95,
    "cero": 194.2,
    "cero-r": 204.22,
    "laplace": 211.74,
    "laplace-ej": 218.74,
    "laplace-r": 222.64,
    "comp": 226.03,
    "comp-1": 227.79,
    "comp-2": 232.07,
    "comp-3": 238.16,
    "conf": 250.11,
    "conf-pos": 255.58,
    "conf-v": 260.6,
    "acc": 267.58,
    "sens": 271.78,
    "esp": 279.56,
    "prec": 284.5,
    "desb": 290.96,
    "sobre": 307.47,
    "sobre-def": 316.55,
    "tt": 323.83,
    "tt-n": 330.61,
    "kfold": 334.55,
    "loo": 341.46,
    "loo-r": 349.22,
    "loo-ej": 352.45,
    "loo-q": 360.37,
    "loo-qr": 367.79,
    "c": 374.09,
    "c1": 374.76,
    "c2": 377.75,
    "c3": 386.47,
    "c4": 393.99,
    "fin": 398.05
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo dieciséis: el discriminante cuadrático, Naive Bayes, y cómo evaluar un clasificador."
    ],
    [
      7.21,
      "Ele de a suponía que todos los grupos tienen la misma matriz de covarianza, la misma forma y orientación de la nube de puntos."
    ],
    [
      14.57,
      "Con ese supuesto, la frontera entre grupos es una recta."
    ],
    [
      18.07,
      "Cu de a deja que cada grupo tenga su propia matriz de covarianza, y entonces la frontera es una curva."
    ],
    [
      24.52,
      "¿Y por qué no usar siempre cu de a, si es más flexible?"
    ],
    [
      31.35,
      "Porque tiene que estimar muchos más parámetros: una matriz de covarianza completa por grupo."
    ],
    [
      37.16,
      "Con pocos datos, esas estimaciones son inestables, y el modelo se equivoca más con casos nuevos."
    ],
    [
      43.64,
      "Para decidir se usa el test de Box."
    ],
    [
      45.94,
      "La hipótesis nula es que todas las matrices de covarianza son iguales."
    ],
    [
      50.07,
      "Si el pe valor es mayor a cero coma cero cinco, no se rechaza, y se usa ele de a."
    ],
    [
      55.04,
      "Si es menor, se usa cu de a."
    ],
    [
      57.27,
      "Y una regla práctica: con muestras pequeñas, preferir ele de a aunque el test sugiera covarianzas distintas."
    ],
    [
      64.41,
      "En el banco de Ademuz, el test de Box da un chi cuadrado de cero coma ocho, con tres grados de libertad, y pe valor cero coma ochenta y cinco."
    ],
    [
      72.9,
      "No se rechaza: corresponde ele de a."
    ],
    [
      75.23,
      "Y de hecho, cu de a da exactamente la misma matriz de confusión."
    ],
    [
      81.1,
      "Naive Bayes ataca el problema de otra manera, con probabilidades."
    ],
    [
      85.19,
      "La pregunta es: dado lo que veo de este cliente, ¿cuál es la probabilidad de que sea de cada grupo?"
    ],
    [
      91.43,
      "Por el teorema de Bayes, esa probabilidad es proporcional a la probabilidad a priori del grupo, multiplicada por la probabilidad de observar cada variable dentro de ese grupo."
    ],
    [
      102.2,
      "Y aquí está lo ingenuo: se supone que, dentro de cada grupo, las variables son independientes."
    ],
    [
      108.0,
      "Por eso se pueden multiplicar."
    ],
    [
      110.4,
      "Si la variable es continua, se usa una normal con la media y la desviación de esa variable en el grupo, y se evalúa con dnorm."
    ],
    [
      118.04,
      "Si es categórica, se usa la frecuencia relativa dentro del grupo."
    ],
    [
      122.58,
      "Volvamos al cliente nuevo de Ademuz, patrimonio siete y deuda cuatro, el que ele de a dejaba justo en la frontera."
    ],
    [
      129.49,
      "Para el grupo de fallidos: la densidad del patrimonio, cero coma uno dos uno, por la de la deuda, cero coma uno ocho cinco, por el prior, cero coma cinco."
    ],
    [
      138.74,
      "Da cero coma cero uno uno dos."
    ],
    [
      140.94,
      "Para los cumplidores: cero coma uno uno nueve, por cero coma uno nueve cuatro, por cero coma cinco."
    ],
    [
      147.18,
      "Da cero coma cero uno uno cinco."
    ],
    [
      149.43,
      "¿Dónde lo clasifica?"
    ],
    [
      154.67,
      "Como cumplidor, aunque por muy poco."
    ],
    [
      156.96,
      "La probabilidad posterior se obtiene normalizando: cada puntaje dividido por la suma de los dos."
    ],
    [
      163.25,
      "El prior pesa bastante."
    ],
    [
      164.99,
      "En la ayudantía seis había una pyme que, con priors iguales, se clasificaba como fracaso."
    ],
    [
      170.53,
      "Pero si se sabe que solo el veinte por ciento de las pymes fracasa, el prior cambia la decisión, y pasa a clasificarse como éxito."
    ],
    [
      178.36,
      "El grupo más frecuente necesita menos evidencia para ganar."
    ],
    [
      182.81,
      "En ese mismo ejercicio, dnorm daba valores como dos coma cuatro."
    ],
    [
      186.95,
      "No es un error: es una densidad, no una probabilidad, y puede ser mayor que uno cuando la desviación es chica."
    ],
    [
      194.2,
      "Hay un problema práctico con las variables categóricas."
    ],
    [
      197.89,
      "¿Qué pasa si una categoría nunca aparece en un grupo?"
    ],
    [
      204.22,
      "Su frecuencia es cero, y como todo se multiplica, el puntaje de ese grupo queda en cero, sin importar las demás variables."
    ],
    [
      211.74,
      "La solución es el suavizado de Laplace: sumar uno a cada conteo, y sumar al denominador el número de categorías."
    ],
    [
      218.74,
      "En la ayudantía, cero de cinco pasaba a ser uno sobre siete."
    ],
    [
      222.64,
      "En erre, naiveBayes con laplace igual a uno."
    ],
    [
      226.03,
      "Para ubicar los tres métodos: ele de a es un caso particular de cu de a, con covarianzas iguales."
    ],
    [
      232.07,
      "Y Naive Bayes es como cu de a, pero con las covarianzas diagonales, sin correlación entre variables."
    ],
    [
      238.16,
      "Ele de a, con pocos datos y covarianzas parecidas; cu de a, con covarianzas distintas y muchos datos; Naive Bayes, con muchas variables o variables categóricas."
    ],
    [
      250.11,
      "Para evaluar un clasificador se usa la matriz de confusión, que cruza lo real con lo predicho."
    ],
    [
      255.58,
      "Primero hay que decir cuál es la clase positiva."
    ],
    [
      258.37,
      "En Ademuz, tomemos cumplidor."
    ],
    [
      260.6,
      "Hay siete verdaderos positivos, un falso negativo, cero falsos positivos y ocho verdaderos negativos."
    ],
    [
      267.58,
      "La exactitud son los aciertos sobre el total: quince de dieciséis."
    ],
    [
      271.78,
      "La sensibilidad responde: de los positivos reales, ¿cuántos detecté?"
    ],
    [
      276.29,
      "Siete de ocho, ochenta y siete coma cinco por ciento."
    ],
    [
      279.56,
      "La especificidad, lo mismo con los negativos: ocho de ocho, cien por ciento."
    ],
    [
      284.5,
      "Y la precisión responde: de los que predije positivos, ¿cuántos lo eran?"
    ],
    [
      289.04,
      "Siete de siete."
    ],
    [
      290.96,
      "Un cuidado con la exactitud."
    ],
    [
      292.94,
      "Si el noventa y cinco por ciento de los clientes paga, un modelo que dice siempre «paga» tiene noventa y cinco por ciento de exactitud, y no sirve para nada."
    ],
    [
      302.07,
      "Con clases desbalanceadas hay que mirar las otras métricas."
    ],
    [
      307.47,
      "Último tema."
    ],
    [
      308.63,
      "Evaluar el modelo con los mismos datos con que se entrenó es como estudiar con las respuestas del examen."
    ],
    [
      314.5,
      "La nota sale demasiado buena."
    ],
    [
      316.55,
      "El sobreajuste es justamente eso: un modelo que memoriza los datos de entrenamiento y falla con datos nuevos."
    ],
    [
      323.83,
      "La forma más simple de evitarlo es separar: entrenar con el setenta u ochenta por ciento, y probar con el resto."
    ],
    [
      330.61,
      "Pero con dieciséis clientes, separar deja muy pocos datos."
    ],
    [
      334.55,
      "La alternativa es ka fold: dividir en ka partes, entrenar con todas menos una, evaluar con la que quedó, y rotar."
    ],
    [
      341.46,
      "Y el caso extremo es dejar uno fuera: ka igual a ene, cada observación es la prueba una vez."
    ],
    [
      347.02,
      "Es ideal con muestras pequeñas."
    ],
    [
      349.22,
      "En erre basta poner ce ve igual a TRUE en lda."
    ],
    [
      352.45,
      "En Ademuz, la exactitud con dejar uno fuera baja de noventa y tres coma setenta y cinco a ochenta y siete coma cinco por ciento."
    ],
    [
      360.37,
      "¿Cuál de las dos cifras describe mejor cómo le irá con clientes nuevos?"
    ],
    [
      367.79,
      "La de dejar uno fuera."
    ],
    [
      369.77,
      "La de entrenamiento siempre sobreestima."
    ],
    [
      374.09,
      "En resumen: el test de Box decide entre ele de a y cu de a."
    ],
    [
      377.75,
      "Naive Bayes multiplica el prior por las verosimilitudes de cada variable, suponiendo independencia, y con frecuencias cero se usa Laplace."
    ],
    [
      386.47,
      "La matriz de confusión da exactitud, sensibilidad, especificidad y precisión, siempre diciendo cuál es la clase positiva."
    ],
    [
      393.99,
      "Y el rendimiento se mide con datos que el modelo no vio."
    ],
    [
      398.05,
      "Eso fue el módulo dieciséis."
    ]
  ],
  "huella": "9117fc5f0c64"
});
