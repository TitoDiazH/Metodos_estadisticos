/* GENERADO por tools/generar_audio.py desde tools/guiones/m23-lg-12-23.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m23-lg-12-23",
  "modulo": "m23-superficie-respuesta",
  "titulo": "Ejercicio 12.23: tiempo de filtración y el punto estacionario a mano",
  "archivo": "audio/m23-lg-12-23.mp3",
  "duracion": 312,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 33.5,
      "titulo": "El diseño"
    },
    {
      "t": 69.1,
      "titulo": "El modelo de segundo orden"
    },
    {
      "t": 117.3,
      "titulo": "¿Es adecuado el modelo?"
    },
    {
      "t": 151.2,
      "titulo": "El punto estacionario, paso a paso"
    },
    {
      "t": 222.0,
      "titulo": "¿Máximo, mínimo o silla?"
    },
    {
      "t": 263.3,
      "titulo": "El mejor punto de operación"
    },
    {
      "t": 295.6,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Libro guía · Cap. 12, ej. 23 (punto estacionario explicado)",
  "pregunta": "m23-d004",
  "orden": 2.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 10.26,
    "clave1": 13.31,
    "clave2": 16.97,
    "clave3": 18.52,
    "dis": 33.51,
    "cod": 45.67,
    "sal": 69.13,
    "ecuacion": 74.26,
    "lin": 90.47,
    "cuad": 93.34,
    "inter": 99.69,
    "sig": 105.29,
    "f": 117.34,
    "fcalc": 119.41,
    "rcuad": 125.87,
    "lof": 131.18,
    "deriv": 151.15,
    "d1": 162.33,
    "d2": 182.2,
    "sist": 192.23,
    "sol": 210.26,
    "real": 215.3,
    "hes": 222.04,
    "det": 227.92,
    "ev": 242.93,
    "clas": 248.5,
    "opt": 263.29,
    "mejor": 275.8,
    "fin": 295.58
  },
  "frases": [
    [
      0.0,
      "Ejercicio 23 del capítulo 12."
    ],
    [
      2.58,
      "Aquí aparece por primera vez el modelo de segundo orden y el punto estacionario, así que lo vamos a hacer paso a paso."
    ],
    [
      10.26,
      "Un ingeniero químico midió el tiempo de filtración."
    ],
    [
      13.31,
      "Los factores son temperatura y presión, ya codificados."
    ],
    [
      16.97,
      "Hay 13 corridas."
    ],
    [
      18.52,
      "Se pide decir qué diseño es, ajustar un modelo de segundo orden, ver qué superficie describe y encontrar el mejor punto de operación."
    ],
    [
      26.95,
      "Como es un tiempo de filtración, suponemos que conviene minimizarlo."
    ],
    [
      33.51,
      "Es un diseño central compuesto."
    ],
    [
      35.63,
      "Las cuatro esquinas del factorial 2 · 2."
    ],
    [
      38.76,
      "Cuatro puntos axiales, sobre los ejes, a 1,414 del centro."
    ],
    [
      43.7,
      "Y cinco réplicas del centro."
    ],
    [
      45.67,
      "Los datos ya vienen codificados."
    ],
    [
      48.32,
      "¿Por qué 1,414?"
    ],
    [
      50.51,
      "Es la raíz cuarta de cuatro, y hace que todos los puntos externos queden a la misma distancia del centro: el diseño es rotable, la precisión de la predicción depende solo de la distancia al centro."
    ],
    [
      62.43,
      "Y ahora cada factor tiene cinco niveles, así que sí se puede estimar curvatura."
    ],
    [
      69.13,
      "El modelo de segundo orden se ajusta con regresión múltiple, con una columna por término."
    ],
    [
      74.26,
      "Queda: 41,2 − 1,97 x₁ + 1,46 x₂ + 3,71 x₁² + 2,46 x₂² + 6 x₁ x₂."
    ],
    [
      88.74,
      "Tres tipos de términos."
    ],
    [
      90.47,
      "Los lineales, que inclinan la superficie."
    ],
    [
      93.34,
      "Los cuadráticos, que la curvan: si son positivos, curva hacia arriba; si son negativos, hacia abajo."
    ],
    [
      99.69,
      "Y la interacción, que tuerce la superficie: el efecto de un factor depende del otro."
    ],
    [
      105.29,
      "¿Cuáles son significativos?"
    ],
    [
      107.14,
      "Solo la interacción, con p 0,038."
    ],
    [
      110.5,
      "El cuadrático de x₁ queda en 0,076, cerca pero no."
    ],
    [
      117.34,
      "La F global."
    ],
    [
      119.41,
      "2,86, p 0,10."
    ],
    [
      122.17,
      "No se rechaza: el modelo en conjunto no es significativo."
    ],
    [
      125.87,
      "El R² es 0,67, y el ajustado cae a 0,44."
    ],
    [
      131.18,
      "Y la falta de ajuste es significativa, p 0,017: las réplicas del centro varían poco, y el modelo no logra seguir los datos."
    ],
    [
      140.29,
      "Conclusión honesta: este modelo no es bueno."
    ],
    [
      143.21,
      "Aun así, el libro pide caracterizarlo, y es el ejemplo perfecto para practicar el procedimiento."
    ],
    [
      151.15,
      "En la cima de una loma, o en el fondo de un valle, el terreno es plano: la pendiente vale cero en todas las direcciones."
    ],
    [
      158.19,
      "Por eso se deriva respecto de cada variable y se iguala a cero."
    ],
    [
      162.33,
      "Derivando respecto de x₁: el término lineal deja −1,97."
    ],
    [
      167.46,
      "El cuadrático, 3,71 x₁², deja 2 · 3,71 x₁: 7,43 x₁."
    ],
    [
      175.81,
      "Y la interacción, seis x₁ x₂, deja seis x₂."
    ],
    [
      179.87,
      "Todo eso igual a cero."
    ],
    [
      182.2,
      "Respecto de x₂: 1,46 + 6 x₁ + 2 · 2,46, o sea, 4,92 x₂."
    ],
    [
      190.6,
      "Igual a cero."
    ],
    [
      192.23,
      "Es un sistema lineal de 2 · 2."
    ],
    [
      194.55,
      "En forma de matrices: b + 2 B por equis igual a cero, y la solución es menos un medio de B inversa por b."
    ],
    [
      202.54,
      "La matriz B lleva los cuadráticos en la diagonal, y la mitad de la interacción fuera de ella: tres en vez de seis."
    ],
    [
      210.26,
      "Resolviendo, x₁ da 32,6, y x₂ − 40."
    ],
    [
      215.3,
      "Muy, muy lejos de la región, que va de −1,4 a 1,4."
    ],
    [
      222.04,
      "Para clasificarlo, la hessiana: la matriz de segundas derivadas, que es dos veces B."
    ],
    [
      227.92,
      "Con dos variables basta el determinante: 7,43 · 4,92 − 6²."
    ],
    [
      234.93,
      "Da 0,56, positivo."
    ],
    [
      237.39,
      "Y el primer elemento es positivo."
    ],
    [
      239.53,
      "Hessiana definida positiva: es un mínimo."
    ],
    [
      242.93,
      "Lo mismo se ve con los valores propios de b: 6,15 y 0,023."
    ],
    [
      248.5,
      "Los dos positivos: mínimo."
    ],
    [
      250.59,
      "Pero uno es casi cero: en esa dirección la superficie es casi plana."
    ],
    [
      254.89,
      "Es un valle muy alargado, casi una canaleta."
    ],
    [
      257.89,
      "Por eso el punto estacionario se dispara tan lejos."
    ],
    [
      263.29,
      "Queremos minimizar, y el punto estacionario es un mínimo, pero está fuera de la región."
    ],
    [
      268.73,
      "No se puede recomendar: sería extrapolar."
    ],
    [
      271.52,
      "Cuando pasa esto, el óptimo está en la frontera de la región estudiada."
    ],
    [
      275.8,
      "Evaluando el modelo en la región del factorial, el menor tiempo de filtración se obtiene en la esquina x₁ igual a uno, x₂ igual a −1: temperatura alta y presión baja, con unos 38 minutos predichos."
    ],
    [
      289.56,
      "Coincide con la corrida de menor tiempo observado, 32."
    ],
    [
      295.58,
      "El procedimiento del punto estacionario: derivar respecto de cada variable, igualar a cero, resolver el sistema, clasificar con la hessiana o con los valores propios, y revisar si cae dentro de la región y si es del tipo que buscas."
    ],
    [
      309.27,
      "Si no, el óptimo está en el borde."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio veintitrés del capítulo doce.",
    "Aquí aparece por primera vez el modelo de segundo orden y el punto estacionario, así que lo vamos a hacer paso a paso.",
    "Un ingeniero químico midió el tiempo de filtración.",
    "Los factores son temperatura y presión, ya codificados.",
    "Hay trece corridas.",
    "Se pide decir qué diseño es, ajustar un modelo de segundo orden, ver qué superficie describe y encontrar el mejor punto de operación.",
    "Como es un tiempo de filtración, suponemos que conviene minimizarlo.",
    "Es un diseño central compuesto.",
    "Las cuatro esquinas del factorial dos por dos.",
    "Cuatro puntos axiales, sobre los ejes, a uno coma cuatro uno cuatro del centro.",
    "Y cinco réplicas del centro.",
    "Los datos ya vienen codificados.",
    "¿Por qué uno coma cuatro uno cuatro?",
    "Es la raíz cuarta de cuatro, y hace que todos los puntos externos queden a la misma distancia del centro: el diseño es rotable, la precisión de la predicción depende solo de la distancia al centro.",
    "Y ahora cada factor tiene cinco niveles, así que sí se puede estimar curvatura.",
    "El modelo de segundo orden se ajusta con regresión múltiple, con una columna por término.",
    "Queda: cuarenta y uno coma dos, menos uno coma nueve siete equis uno, más uno coma cuatro seis equis dos, más tres coma siete uno equis uno al cuadrado, más dos coma cuatro seis equis dos al cuadrado, más seis equis uno equis dos.",
    "Tres tipos de términos.",
    "Los lineales, que inclinan la superficie.",
    "Los cuadráticos, que la curvan: si son positivos, curva hacia arriba; si son negativos, hacia abajo.",
    "Y la interacción, que tuerce la superficie: el efecto de un factor depende del otro.",
    "¿Cuáles son significativos?",
    "Solo la interacción, con pe cero coma cero tres ocho.",
    "El cuadrático de equis uno queda en cero coma cero siete seis, cerca pero no.",
    "La efe global.",
    "Dos coma ocho seis, pe cero coma uno cero.",
    "No se rechaza: el modelo en conjunto no es significativo.",
    "El erre cuadrado es cero coma seis siete, y el ajustado cae a cero coma cuatro cuatro.",
    "Y la falta de ajuste es significativa, pe cero coma cero uno siete: las réplicas del centro varían poco, y el modelo no logra seguir los datos.",
    "Conclusión honesta: este modelo no es bueno.",
    "Aun así, el libro pide caracterizarlo, y es el ejemplo perfecto para practicar el procedimiento.",
    "En la cima de una loma, o en el fondo de un valle, el terreno es plano: la pendiente vale cero en todas las direcciones.",
    "Por eso se deriva respecto de cada variable y se iguala a cero.",
    "Derivando respecto de equis uno: el término lineal deja menos uno coma nueve siete.",
    "El cuadrático, tres coma siete uno equis uno al cuadrado, deja dos por tres coma siete uno equis uno: siete coma cuatro tres equis uno.",
    "Y la interacción, seis equis uno equis dos, deja seis equis dos.",
    "Todo eso igual a cero.",
    "Respecto de equis dos: uno coma cuatro seis, más seis equis uno, más dos por dos coma cuatro seis, o sea, cuatro coma nueve dos equis dos.",
    "Igual a cero.",
    "Es un sistema lineal de dos por dos.",
    "En forma de matrices: be más dos be mayúscula por equis igual a cero, y la solución es menos un medio de be mayúscula inversa por be.",
    "La matriz be mayúscula lleva los cuadráticos en la diagonal, y la mitad de la interacción fuera de ella: tres en vez de seis.",
    "Resolviendo, equis uno da treinta y dos coma seis, y equis dos menos cuarenta.",
    "Muy, muy lejos de la región, que va de menos uno coma cuatro a uno coma cuatro.",
    "Para clasificarlo, la hessiana: la matriz de segundas derivadas, que es dos veces be mayúscula.",
    "Con dos variables basta el determinante: siete coma cuatro tres por cuatro coma nueve dos, menos seis al cuadrado.",
    "Da cero coma cinco seis, positivo.",
    "Y el primer elemento es positivo.",
    "Hessiana definida positiva: es un mínimo.",
    "Lo mismo se ve con los valores propios de be: seis coma uno cinco y cero coma cero dos tres.",
    "Los dos positivos: mínimo.",
    "Pero uno es casi cero: en esa dirección la superficie es casi plana.",
    "Es un valle muy alargado, casi una canaleta.",
    "Por eso el punto estacionario se dispara tan lejos.",
    "Queremos minimizar, y el punto estacionario es un mínimo, pero está fuera de la región.",
    "No se puede recomendar: sería extrapolar.",
    "Cuando pasa esto, el óptimo está en la frontera de la región estudiada.",
    "Evaluando el modelo en la región del factorial, el menor tiempo de filtración se obtiene en la esquina equis uno igual a uno, equis dos igual a menos uno: temperatura alta y presión baja, con unos treinta y ocho minutos predichos.",
    "Coincide con la corrida de menor tiempo observado, treinta y dos.",
    "El procedimiento del punto estacionario: derivar respecto de cada variable, igualar a cero, resolver el sistema, clasificar con la hessiana o con los valores propios, y revisar si cae dentro de la región y si es del tipo que buscas.",
    "Si no, el óptimo está en el borde."
  ],
  "huella": "8919cfd1ccec"
});
