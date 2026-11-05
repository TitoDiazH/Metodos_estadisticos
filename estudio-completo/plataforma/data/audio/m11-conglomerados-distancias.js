/* GENERADO por tools/generar_audio.py desde tools/guiones/m11-conglomerados-distancias.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m11-conglomerados-distancias",
  "modulo": "m11-conglomerados-distancias",
  "titulo": "Análisis de conglomerados: definición, pasos, distancias y estandarización",
  "archivo": "audio/m11-conglomerados-distancias.mp3",
  "duracion": 404,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Agrupar sin etiquetas"
    },
    {
      "t": 92.8,
      "titulo": "Distancias entre números"
    },
    {
      "t": 225.5,
      "titulo": "Distancias entre ceros y unos"
    },
    {
      "t": 309.7,
      "titulo": "Estandarizar antes de medir"
    },
    {
      "t": 377.9,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "idea": 8.26,
    "cluster": 16.07,
    "sin-etq": 18.13,
    "nosup": 23.84,
    "nosup-r": 34.77,
    "part": 43.61,
    "cob": 48.45,
    "disj": 52.38,
    "novacio": 56.0,
    "obj": 58.2,
    "pasos": 67.63,
    "p1": 70.07,
    "p2": 74.01,
    "p3": 76.38,
    "p4": 80.98,
    "p5": 85.91,
    "dist": 92.84,
    "mink": 99.02,
    "mink-f": 103.61,
    "l1": 114.13,
    "l2": 122.21,
    "linf": 125.25,
    "ej": 130.83,
    "ej-e1": 135.2,
    "ej-e2": 137.76,
    "ej-dif": 140.14,
    "ej-man": 149.81,
    "ej-euc": 151.85,
    "ej-che": 156.81,
    "r": 160.79,
    "r-max": 166.83,
    "ward": 170.87,
    "cor": 180.5,
    "cor-uso": 184.81,
    "cor-f": 193.98,
    "cor-rango": 197.96,
    "cor-2": 208.61,
    "cor-r": 212.25,
    "cor-t": 216.15,
    "bin": 225.51,
    "bin-tabla": 228.61,
    "bin-a": 233.43,
    "bin-bc": 235.75,
    "bin-d": 238.65,
    "bin-q": 241.4,
    "bin-q-ej": 247.21,
    "jac": 251.38,
    "jac-r": 255.82,
    "sm": 260.15,
    "ham": 265.34,
    "bin-ej": 275.88,
    "bin-sm": 285.86,
    "bin-jac": 289.65,
    "ham-ej": 295.23,
    "ham-r": 303.36,
    "est": 309.73,
    "est-ej": 315.57,
    "est-dom": 322.49,
    "z": 332.06,
    "z-f": 334.11,
    "max": 344.12,
    "minmax": 349.39,
    "out": 356.09,
    "out-r": 363.37,
    "sin": 370.49,
    "c": 377.93,
    "c1": 378.56,
    "c2": 383.76,
    "c3": 390.91,
    "c4": 396.54,
    "fin": 401.79
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo once: el análisis de conglomerados, o clastering, y cómo medir qué tan parecidas son dos observaciones."
    ],
    [
      8.26,
      "La idea es agrupar observaciones de modo que las de un mismo grupo se parezcan entre sí, y las de grupos distintos se diferencien."
    ],
    [
      16.07,
      "Cada grupo se llama clúster."
    ],
    [
      18.13,
      "Y lo interesante es que nadie nos dice de antemano cuáles son los grupos: salen de los datos."
    ],
    [
      23.84,
      "Por eso se dice que es aprendizaje no supervisado."
    ],
    [
      26.78,
      "¿En qué se diferencia de la clasificación, que veremos más adelante?"
    ],
    [
      34.77,
      "En la clasificación los grupos ya se conocen, y lo que se busca es asignar casos nuevos."
    ],
    [
      40.0,
      "Acá no hay etiquetas: los grupos aparecen solos."
    ],
    [
      43.61,
      "Lo que se busca, formalmente, es una partición de los datos que cumpla tres cosas."
    ],
    [
      48.45,
      "Que toda observación quede en algún clúster, que es la cobertura."
    ],
    [
      52.38,
      "Que ninguna quede en dos clústeres a la vez, la disjuntividad."
    ],
    [
      56.0,
      "Y que ningún clúster quede vacío."
    ],
    [
      58.2,
      "El objetivo es que la variabilidad dentro de cada grupo sea mínima, que es la cohesión, y la diferencia entre grupos, máxima, que es la separación."
    ],
    [
      67.63,
      "El análisis se hace en cinco pasos."
    ],
    [
      70.07,
      "Primero, preparar los datos: limpiarlos y estandarizarlos."
    ],
    [
      74.01,
      "Segundo, definir la distancia."
    ],
    [
      76.38,
      "Tercero, elegir el algoritmo, que puede ser jerárquico o particionado."
    ],
    [
      80.98,
      "Cuarto, decidir cuántos clústeres, con el codo, la silueta o el dendrograma."
    ],
    [
      85.91,
      "Y quinto, validar e interpretar."
    ],
    [
      88.15,
      "Este módulo trata los dos primeros pasos."
    ],
    [
      92.84,
      "Para agrupar lo parecido, primero hay que medir el parecido."
    ],
    [
      96.58,
      "Eso se hace con una distancia."
    ],
    [
      99.02,
      "Las tres distancias más comunes vienen de una misma familia, la de Minkowski."
    ],
    [
      103.61,
      "Se toman las diferencias entre dos observaciones, variable por variable, en valor absoluto."
    ],
    [
      109.31,
      "Se elevan a un exponente lambda, se suman, y se saca la raíz lambda."
    ],
    [
      114.13,
      "Si lambda es uno, queda la distancia Manhattan: la suma de las diferencias absolutas, como caminar por las calles de una ciudad."
    ],
    [
      122.21,
      "Si lambda es dos, la euclídea: la línea recta."
    ],
    [
      125.25,
      "Y si lambda es infinito, Chebyshev: la diferencia más grande en una sola variable."
    ],
    [
      130.83,
      "Veámoslo con las ocho empresas de la clase, que tienen inversión y ventas."
    ],
    [
      135.2,
      "La empresa uno tiene dieciséis y diez."
    ],
    [
      137.76,
      "La empresa dos, doce y catorce."
    ],
    [
      140.14,
      "Difieren en cuatro en inversión y en cuatro en ventas."
    ],
    [
      143.36,
      "¿Cuánto vale la distancia Manhattan entre ellas?"
    ],
    [
      149.81,
      "Ocho: cuatro más cuatro."
    ],
    [
      151.85,
      "La euclídea es la raíz de dieciséis más dieciséis, cinco coma sesenta y seis."
    ],
    [
      156.81,
      "Y Chebyshev es cuatro, la mayor de las dos diferencias."
    ],
    [
      160.79,
      "En erre todas salen con la función dist, indicando el método: euclidean, manhattan, o maximum."
    ],
    [
      166.83,
      "Ojo con ese último: Chebyshev en erre se llama maximum."
    ],
    [
      170.87,
      "Un dato que va a volver más adelante: la euclídea al cuadrado es la que usa el método de Ward, y tiene el efecto de agrandar las distancias grandes."
    ],
    [
      180.5,
      "Hay otra distancia, distinta en espíritu: la basada en la correlación."
    ],
    [
      184.81,
      "Sirve cuando interesa el patrón y no el nivel."
    ],
    [
      187.45,
      "Piensa en dos clientes que suben y bajan su consumo en los mismos meses, aunque uno consuma mucho más que el otro."
    ],
    [
      193.98,
      "Se calcula como uno menos la correlación entre las dos observaciones."
    ],
    [
      197.96,
      "Va de cero a dos."
    ],
    [
      199.42,
      "Cero es correlación perfecta positiva, y uno, sin correlación."
    ],
    [
      203.62,
      "¿Y cuándo vale dos?"
    ],
    [
      208.61,
      "Cuando la correlación es menos uno: uno menos menos uno, dos."
    ],
    [
      212.25,
      "En erre se calcula como uno menos cor de la traspuesta de los datos."
    ],
    [
      216.15,
      "La traspuesta hace falta porque cor correlaciona columnas, y acá queremos correlacionar filas, es decir, observaciones."
    ],
    [
      225.51,
      "¿Y si las variables son de sí o no, ceros y unos?"
    ],
    [
      228.61,
      "Al comparar dos observaciones, variable por variable, hay cuatro conteos."
    ],
    [
      233.43,
      "A, cuando las dos tienen un uno."
    ],
    [
      235.75,
      "Be y ce, cuando una tiene uno y la otra cero."
    ],
    [
      238.65,
      "Y de, cuando las dos tienen cero."
    ],
    [
      241.4,
      "La pregunta clave es esta: que dos observaciones compartan un cero, ¿dice algo de su parecido?"
    ],
    [
      247.21,
      "Que dos personas no tengan un yate no las hace parecidas."
    ],
    [
      251.38,
      "Si la respuesta es no, se usa Jaccard: be más ce, sobre a más be más ce."
    ],
    [
      255.82,
      "Es decir, las diferencias sobre todo, menos las dobles ausencias."
    ],
    [
      260.15,
      "Si la respuesta es sí, se usa Simpl Matching: be más ce sobre los cuatro conteos."
    ],
    [
      265.34,
      "Y la distancia de Hamming es aún más simple: cuántas variables son distintas, o sea, be más ce."
    ],
    [
      271.17,
      "Con ceros y unos coincide con la Manhattan, y así se calcula en erre."
    ],
    [
      275.88,
      "Una cuenta rápida."
    ],
    [
      277.37,
      "Si a, be, ce y de valen uno cada una, ¿cuánto da Simpl Matching?"
    ],
    [
      285.86,
      "Cero coma cinco: dos diferencias sobre cuatro variables."
    ],
    [
      289.65,
      "Jaccard, en cambio, deja fuera la doble ausencia y divide por tres: dos tercios."
    ],
    [
      295.23,
      "En la ayudantía cinco aparecía esto con productos."
    ],
    [
      298.4,
      "El producto uno es uno, cero, uno, uno; el producto tres es cero, uno, cero, cero."
    ],
    [
      303.36,
      "Difieren en las cuatro variables, así que la distancia de Hamming es cuatro."
    ],
    [
      309.73,
      "Último tema, y es de los que más se olvidan: estandarizar antes de calcular distancias."
    ],
    [
      315.57,
      "Piensa en empresas con activos, que van de diez a veinte, y trabajadores, que van de cuarenta a trescientos cincuenta."
    ],
    [
      322.49,
      "Sin estandarizar, la distancia depende casi solo de los trabajadores, porque sus números son mucho más grandes."
    ],
    [
      329.3,
      "Los activos casi no cuentan."
    ],
    [
      332.06,
      "Hay tres formas de corregirlo."
    ],
    [
      334.11,
      "La más usada es el puntaje zeta: restar la media y dividir por la desviación estándar."
    ],
    [
      339.53,
      "Queda todo con media cero y desviación uno."
    ],
    [
      342.1,
      "En erre es la función scale."
    ],
    [
      344.12,
      "La segunda es dividir por el máximo, que sirve para datos positivos y conserva el cero."
    ],
    [
      349.39,
      "Y la tercera es min max: restar el mínimo y dividir por el rango, para que todo quede entre cero y uno."
    ],
    [
      356.09,
      "¿Cuál de las tres crees que sufre más con un valor atípico?"
    ],
    [
      363.37,
      "Min max."
    ],
    [
      364.55,
      "Un solo valor extremo fija el máximo o el mínimo, y aplasta a todos los demás en un rincón del intervalo."
    ],
    [
      370.49,
      "Y no estandarizar solo tiene sentido cuando las variables ya están en unidades comparables."
    ],
    [
      377.93,
      "Entonces: el clastering agrupa sin etiquetas, buscando grupos cohesionados y separados."
    ],
    [
      383.76,
      "Las distancias de Minkowski son Manhattan, euclídea y Chebyshev, según lambda; y la de correlación mira el patrón."
    ],
    [
      390.91,
      "Con datos binarios, Jaccard ignora los ceros compartidos y Simpl Matching los cuenta."
    ],
    [
      396.54,
      "Y antes de todo, estandarizar, para que ninguna variable mande por su escala."
    ],
    [
      401.79,
      "Eso fue el módulo once."
    ]
  ],
  "huella": "8e2137b53835"
});
