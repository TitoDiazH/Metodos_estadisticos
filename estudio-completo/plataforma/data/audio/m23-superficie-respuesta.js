/* GENERADO por tools/generar_audio.py desde tools/guiones/m23-superficie-respuesta.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m23-superficie-respuesta",
  "modulo": "m23-superficie-respuesta",
  "titulo": "Metodología de superficie de respuesta",
  "archivo": "audio/m23-superficie-respuesta.mp3",
  "duracion": 541,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "La idea"
    },
    {
      "t": 63.3,
      "titulo": "Del factorial a la superficie"
    },
    {
      "t": 143.7,
      "titulo": "Los diseños de segundo orden"
    },
    {
      "t": 218.5,
      "titulo": "El modelo de segundo orden"
    },
    {
      "t": 293.8,
      "titulo": "El punto estacionario a mano"
    },
    {
      "t": 366.4,
      "titulo": "¿Máximo, mínimo o silla?"
    },
    {
      "t": 426.2,
      "titulo": "Volver a la realidad"
    },
    {
      "t": 506.5,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "idea": 11.22,
    "idea-s": 23.78,
    "formas": 36.08,
    "loma": 42.41,
    "valle": 44.18,
    "silla": 45.95,
    "preg": 50.4,
    "preg-1": 53.76,
    "preg-2": 55.14,
    "cod": 63.33,
    "cod-v": 73.14,
    "dosk": 81.43,
    "mitad": 86.26,
    "lim": 102.11,
    "tres": 109.94,
    "centro": 115.16,
    "puro": 120.24,
    "lof": 124.55,
    "lof-h": 131.56,
    "ccd": 143.7,
    "ccd-1": 146.51,
    "ccd-2": 148.72,
    "ccd-3": 152.75,
    "ccd-n": 155.42,
    "rot": 163.41,
    "ej": 176.92,
    "ej-c": 187.69,
    "ej-n": 197.27,
    "bb": 202.88,
    "mod": 218.47,
    "mod-l": 220.94,
    "mod-c": 223.35,
    "mod-i": 226.7,
    "mod-n": 231.56,
    "mod-r": 235.68,
    "sal": 249.41,
    "sal-c": 252.85,
    "sal-i": 259.38,
    "sal-f": 261.94,
    "sal-lof": 269.77,
    "comp": 279.66,
    "pe": 293.8,
    "pe-c": 302.16,
    "d1": 307.26,
    "d1-ojo": 313.72,
    "d2": 323.53,
    "sist": 326.93,
    "sist-1": 330.49,
    "sist-2": 338.13,
    "sol": 345.92,
    "mat": 352.69,
    "mat-bm": 359.18,
    "hes": 366.45,
    "hes-f": 373.85,
    "reg": 380.59,
    "reg-max": 382.83,
    "reg-min": 387.8,
    "reg-silla": 392.74,
    "det": 396.51,
    "det-c": 406.22,
    "ev": 410.08,
    "real": 426.18,
    "real-t": 436.11,
    "real-c": 444.23,
    "yest": 451.01,
    "dentro": 456.79,
    "cont": 471.44,
    "front": 482.85,
    "front-b": 490.99,
    "front-n": 499.55,
    "cierre": 506.49,
    "c1": 508.29,
    "c2": 516.33,
    "c3": 520.58,
    "c4": 526.05,
    "c5": 531.83,
    "fin": 538.24
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo 24: la metodología de superficie de respuesta."
    ],
    [
      4.81,
      "Es la otra mitad de la prueba cuatro, y se apoya completamente en la regresión del módulo anterior."
    ],
    [
      11.22,
      "Hasta ahora, en los diseños factoriales, cada factor tenía unos pocos niveles fijos."
    ],
    [
      16.55,
      "Pero la temperatura de un reactor o la concentración de un reactivo pueden tomar cualquier valor dentro de un rango."
    ],
    [
      23.78,
      "Entonces la respuesta, por ejemplo el rendimiento, deja de ser una tabla de medias y pasa a ser una superficie sobre el plano de los factores."
    ],
    [
      31.76,
      "Lo que queremos es encontrar la mejor zona de esa superficie."
    ],
    [
      36.08,
      "La superficie real puede ser complicada, pero en una zona acotada casi siempre se parece a una de tres formas: una loma, que tiene un máximo, un valle, que tiene un mínimo, o una silla de montar, que sube en una dirección y baja en otra."
    ],
    [
      50.4,
      "Desde el diseño de experimentos hay dos preguntas."
    ],
    [
      53.76,
      "¿En qué puntos mido?"
    ],
    [
      55.14,
      "¿Y cómo analizo los datos?"
    ],
    [
      57.15,
      "La respuesta a la segunda ya la conocen: con una regresión múltiple."
    ],
    [
      63.33,
      "El primer paso es siempre codificar."
    ],
    [
      65.68,
      "Cada factor se lleva a una escala de −1 a +1: equis es el valor real menos el centro, dividido por el semirrango."
    ],
    [
      73.14,
      "Así el cero es el centro del diseño, y todos los factores quedan en la misma escala, de modo que sus coeficientes se pueden comparar."
    ],
    [
      81.43,
      "Un factorial dos a la k, con los niveles codificados, ya es una regresión."
    ],
    [
      86.26,
      "Cada coeficiente es la mitad del efecto, porque ir de −1 a +1 son dos unidades."
    ],
    [
      91.78,
      "En el ejemplo de la clase, b₁ vale 8,7, así que subir la temperatura de su nivel bajo al alto aumenta la resistencia en unos 17,4."
    ],
    [
      102.11,
      "Pero el dos a la k tiene un límite."
    ],
    [
      104.25,
      "Con dos niveles, por 2 puntos pasa una sola recta, y no se puede ver si la respuesta se curva."
    ],
    [
      109.94,
      "Para estimar un término al cuadrado hacen falta al menos tres niveles por factor."
    ],
    [
      115.16,
      "La forma más barata de detectar curvatura es agregar puntos al centro, repetidos."
    ],
    [
      120.24,
      "Las réplicas del centro dan el error puro, que no depende de ningún modelo."
    ],
    [
      124.55,
      "Con él se hace la prueba de falta de ajuste: compara lo que el modelo no explica con la variación entre réplicas."
    ],
    [
      131.56,
      "La hipótesis nula es que el modelo es adecuado."
    ],
    [
      134.55,
      "Ojo con esto: aquí lo deseado es un valor p alto."
    ],
    [
      137.73,
      "Si la falta de ajuste es significativa, el modelo se queda corto."
    ],
    [
      143.7,
      "El diseño más usado es el central compuesto."
    ],
    [
      146.51,
      "Parte de las esquinas del dos a la k, agrega puntos axiales sobre cada eje, a una distancia α del centro, y un punto central repetido varias veces."
    ],
    [
      155.42,
      "En total son dos a la k + 2 k, más los centros."
    ],
    [
      158.69,
      "Cada factor queda con cinco niveles, y la curvatura se puede estimar."
    ],
    [
      163.41,
      "El valor de α más común es la raíz cuarta de dos a la k."
    ],
    [
      166.91,
      "Así el diseño es rotable: la precisión de la predicción depende solo de la distancia al centro."
    ],
    [
      172.94,
      "Con dos factores, α es 1,414."
    ],
    [
      176.92,
      "El ejemplo de la clase es el rendimiento de un proceso químico."
    ],
    [
      181.13,
      "La temperatura va de 200 a 250 grados, y la concentración de 15 a 25 %."
    ],
    [
      187.69,
      "La codificación es x₁ igual a temperatura −225 / 25, y x₂ igual a concentración −20 / 5."
    ],
    [
      197.27,
      "Son 12 corridas: cuatro esquinas, cuatro axiales y cuatro réplicas del centro."
    ],
    [
      202.88,
      "La alternativa es el diseño de Box-Behnken, que usa solo tres niveles y nunca pone todos los factores en un extremo a la vez."
    ],
    [
      210.28,
      "Sus puntos están en el medio de las aristas del cubo."
    ],
    [
      213.41,
      "Sirve cuando las esquinas son caras o peligrosas."
    ],
    [
      218.47,
      "El modelo tiene tres tipos de términos."
    ],
    [
      220.94,
      "Los lineales, que dan la inclinación."
    ],
    [
      223.35,
      "Los cuadráticos, que dan la curvatura en cada dirección."
    ],
    [
      226.7,
      "Y las interacciones, que dicen que el efecto de un factor depende del nivel del otro."
    ],
    [
      231.56,
      "Con dos factores son seis coeficientes; con tres, diez."
    ],
    [
      235.68,
      "Como es lineal en los parámetros, es una regresión múltiple más."
    ],
    [
      239.63,
      "En R se ajusta con lm, usando I de equis al cuadrado, o con el paquete rsm, escribiendo SO de x₁, x₂."
    ],
    [
      246.82,
      "SO significa segundo orden."
    ],
    [
      249.41,
      "En el ejemplo, todos los términos son significativos."
    ],
    [
      252.85,
      "Los dos cuadráticos son negativos y significativos: hay curvatura, y la superficie se dobla hacia abajo."
    ],
    [
      259.38,
      "La interacción también es significativa."
    ],
    [
      261.94,
      "La F global es 56,6, con valor p muy pequeño, y el R² ajustado es 0,962."
    ],
    [
      269.77,
      "Y la falta de ajuste da F = 0,39, con valor p 0,77: no se rechaza, así que el modelo de segundo orden es adecuado."
    ],
    [
      279.66,
      "Como los factores están codificados, los coeficientes se comparan directo: el de la temperatura, 10,2, es más del doble que el de la concentración, 4,2."
    ],
    [
      290.02,
      "La temperatura pesa más."
    ],
    [
      293.8,
      "Ahora, lo que el instructivo pide hacer a mano."
    ],
    [
      296.66,
      "En la cima de una loma el terreno es plano: la pendiente vale cero en todas las direcciones."
    ],
    [
      302.16,
      "Así que se hace lo mismo que en cálculo: derivar, igualar a cero y resolver."
    ],
    [
      307.26,
      "La derivada respecto de x₁ es: b₁ + 2 b₁₁ · x₁ + b₁₂ · x₂."
    ],
    [
      313.72,
      "Fíjense en el dos: viene de derivar x₁²."
    ],
    [
      317.4,
      "Y x₂ aparece porque la derivada de x₁ · x₂, respecto de x₁, es x₂."
    ],
    [
      323.53,
      "La derivada respecto de x₂ es análoga."
    ],
    [
      326.93,
      "Con los números del ejemplo queda un sistema de dos ecuaciones."
    ],
    [
      330.49,
      "10,18 − 17,00 · x₁ − 7,75 · x₂, igual a cero."
    ],
    [
      338.13,
      "Y 4,22 − 7,75 · x₁ − 10,50 · x₂, igual a cero."
    ],
    [
      345.92,
      "Resolviendo, x₁ vale 0,626, y x₂ vale −0,061."
    ],
    [
      352.69,
      "En forma matricial es lo mismo: el punto estacionario es menos un medio, por B inversa, por b."
    ],
    [
      359.18,
      "B tiene los cuadráticos en la diagonal, y la mitad de la interacción fuera de ella."
    ],
    [
      366.45,
      "Encontrar el punto no basta: hay que clasificarlo."
    ],
    [
      369.7,
      "Para eso está la matriz hessiana, que tiene las segundas derivadas."
    ],
    [
      373.85,
      "En la diagonal van dos b₁₁ y dos b₂₂, y fuera, b₁₂."
    ],
    [
      378.17,
      "Es el doble de B."
    ],
    [
      380.59,
      "Con dos factores la regla es simple."
    ],
    [
      382.83,
      "Si el determinante es positivo y el primer elemento es negativo, es un máximo."
    ],
    [
      387.8,
      "Si el determinante es positivo y el primer elemento es positivo, es un mínimo."
    ],
    [
      392.74,
      "Y si el determinante es negativo, es un punto silla."
    ],
    [
      396.51,
      "En el ejemplo, el determinante es −17 por menos diez,5 − 7,75²: 118,5, positivo."
    ],
    [
      406.22,
      "Y el primer elemento es negativo."
    ],
    [
      408.36,
      "Es un máximo."
    ],
    [
      410.08,
      "R lo dice de otra forma, con los valores propios de B: −2,67 y −11,08."
    ],
    [
      417.68,
      "Todos negativos, máximo."
    ],
    [
      419.87,
      "Si fueran todos positivos, mínimo, y con signos mezclados, silla."
    ],
    [
      426.18,
      "El punto está en unidades codificadas, pero la respuesta tiene que ser en condiciones de operación."
    ],
    [
      431.96,
      "Se despeja: valor real igual a centro más equis por semirrango."
    ],
    [
      436.11,
      "La temperatura óptima es 225 + 25 · 0,626: 240,7 grados."
    ],
    [
      444.23,
      "La concentración es 20 + 5 por menos cero,061: 19,7 %."
    ],
    [
      451.01,
      "Reemplazando en el modelo, el rendimiento máximo predicho es 82,8."
    ],
    [
      456.79,
      "Y la última revisión: ¿está dentro de la región estudiada?"
    ],
    [
      460.33,
      "Sí, las dos coordenadas están entre −1,414 y +1,414."
    ],
    [
      466.6,
      "Además es del tipo buscado, un máximo."
    ],
    [
      469.21,
      "Entonces es el óptimo."
    ],
    [
      471.44,
      "El gráfico de contornos muestra lo mismo desde arriba: curvas de igual rendimiento."
    ],
    [
      476.59,
      "Elipses cerradas alrededor del punto indican un máximo o un mínimo; hipérbolas, una silla."
    ],
    [
      482.85,
      "¿Y si algo falla?"
    ],
    [
      484.26,
      "Si el punto es del tipo equivocado, por ejemplo un mínimo cuando queremos maximizar, o si cae fuera de la región, el mejor punto que podemos recomendar está en el borde de la región: se evalúa el modelo en las esquinas y los bordes, y se elige el mejor."
    ],
    [
      499.55,
      "Nunca se extrapola fuera de lo medido, y siempre se confirma con corridas reales."
    ],
    [
      506.49,
      "Lo esencial de este módulo."
    ],
    [
      508.29,
      "Se codifica de −1 a +1, y el centro repetido da el error puro y la falta de ajuste, donde lo deseado es un valor p alto."
    ],
    [
      516.33,
      "El central compuesto agrega puntos axiales para estimar la curvatura."
    ],
    [
      520.58,
      "El modelo de segundo orden es una regresión con lineales, cuadráticos e interacciones."
    ],
    [
      526.05,
      "El punto estacionario se encuentra derivando e igualando a cero, y se clasifica con la hessiana."
    ],
    [
      531.83,
      "Y al final se pasa a unidades reales y se revisa que sea del tipo buscado y esté dentro de la región."
    ],
    [
      538.24,
      "Eso fue el módulo 24."
    ]
  ],
  "frasesHabladas": [
    "Ahora toca el módulo veinticuatro: la metodología de superficie de respuesta.",
    "Es la otra mitad de la prueba cuatro, y se apoya completamente en la regresión del módulo anterior.",
    "Hasta ahora, en los diseños factoriales, cada factor tenía unos pocos niveles fijos.",
    "Pero la temperatura de un reactor o la concentración de un reactivo pueden tomar cualquier valor dentro de un rango.",
    "Entonces la respuesta, por ejemplo el rendimiento, deja de ser una tabla de medias y pasa a ser una superficie sobre el plano de los factores.",
    "Lo que queremos es encontrar la mejor zona de esa superficie.",
    "La superficie real puede ser complicada, pero en una zona acotada casi siempre se parece a una de tres formas: una loma, que tiene un máximo, un valle, que tiene un mínimo, o una silla de montar, que sube en una dirección y baja en otra.",
    "Desde el diseño de experimentos hay dos preguntas.",
    "¿En qué puntos mido?",
    "¿Y cómo analizo los datos?",
    "La respuesta a la segunda ya la conocen: con una regresión múltiple.",
    "El primer paso es siempre codificar.",
    "Cada factor se lleva a una escala de menos uno a más uno: equis es el valor real menos el centro, dividido por el semirrango.",
    "Así el cero es el centro del diseño, y todos los factores quedan en la misma escala, de modo que sus coeficientes se pueden comparar.",
    "Un factorial dos a la ka, con los niveles codificados, ya es una regresión.",
    "Cada coeficiente es la mitad del efecto, porque ir de menos uno a más uno son dos unidades.",
    "En el ejemplo de la clase, be uno vale ocho coma siete, así que subir la temperatura de su nivel bajo al alto aumenta la resistencia en unos diecisiete coma cuatro.",
    "Pero el dos a la ka tiene un límite.",
    "Con dos niveles, por dos puntos pasa una sola recta, y no se puede ver si la respuesta se curva.",
    "Para estimar un término al cuadrado hacen falta al menos tres niveles por factor.",
    "La forma más barata de detectar curvatura es agregar puntos al centro, repetidos.",
    "Las réplicas del centro dan el error puro, que no depende de ningún modelo.",
    "Con él se hace la prueba de falta de ajuste: compara lo que el modelo no explica con la variación entre réplicas.",
    "La hipótesis nula es que el modelo es adecuado.",
    "Ojo con esto: aquí lo deseado es un pe valor alto.",
    "Si la falta de ajuste es significativa, el modelo se queda corto.",
    "El diseño más usado es el central compuesto.",
    "Parte de las esquinas del dos a la ka, agrega puntos axiales sobre cada eje, a una distancia alfa del centro, y un punto central repetido varias veces.",
    "En total son dos a la ka, más dos ka, más los centros.",
    "Cada factor queda con cinco niveles, y la curvatura se puede estimar.",
    "El valor de alfa más común es la raíz cuarta de dos a la ka.",
    "Así el diseño es rotable: la precisión de la predicción depende solo de la distancia al centro.",
    "Con dos factores, alfa es uno coma cuatro uno cuatro.",
    "El ejemplo de la clase es el rendimiento de un proceso químico.",
    "La temperatura va de doscientos a doscientos cincuenta grados, y la concentración de quince a veinticinco por ciento.",
    "La codificación es equis uno igual a temperatura menos doscientos veinticinco, sobre veinticinco, y equis dos igual a concentración menos veinte, sobre cinco.",
    "Son doce corridas: cuatro esquinas, cuatro axiales y cuatro réplicas del centro.",
    "La alternativa es el diseño de Box-Behnken, que usa solo tres niveles y nunca pone todos los factores en un extremo a la vez.",
    "Sus puntos están en el medio de las aristas del cubo.",
    "Sirve cuando las esquinas son caras o peligrosas.",
    "El modelo tiene tres tipos de términos.",
    "Los lineales, que dan la inclinación.",
    "Los cuadráticos, que dan la curvatura en cada dirección.",
    "Y las interacciones, que dicen que el efecto de un factor depende del nivel del otro.",
    "Con dos factores son seis coeficientes; con tres, diez.",
    "Como es lineal en los parámetros, es una regresión múltiple más.",
    "En erre se ajusta con lm, usando I de equis al cuadrado, o con el paquete rsm, escribiendo SO de equis uno, equis dos.",
    "SO significa segundo orden.",
    "En el ejemplo, todos los términos son significativos.",
    "Los dos cuadráticos son negativos y significativos: hay curvatura, y la superficie se dobla hacia abajo.",
    "La interacción también es significativa.",
    "La efe global es cincuenta y seis coma seis, con pe valor muy pequeño, y el erre cuadrado ajustado es cero coma nueve seis dos.",
    "Y la falta de ajuste da efe igual a cero coma tres nueve, con pe valor cero coma siete siete: no se rechaza, así que el modelo de segundo orden es adecuado.",
    "Como los factores están codificados, los coeficientes se comparan directo: el de la temperatura, diez coma dos, es más del doble que el de la concentración, cuatro coma dos.",
    "La temperatura pesa más.",
    "Ahora, lo que el instructivo pide hacer a mano.",
    "En la cima de una loma el terreno es plano: la pendiente vale cero en todas las direcciones.",
    "Así que se hace lo mismo que en cálculo: derivar, igualar a cero y resolver.",
    "La derivada respecto de equis uno es: be uno, más dos be uno uno por equis uno, más be uno dos por equis dos.",
    "Fíjense en el dos: viene de derivar equis uno al cuadrado.",
    "Y equis dos aparece porque la derivada de equis uno por equis dos, respecto de equis uno, es equis dos.",
    "La derivada respecto de equis dos es análoga.",
    "Con los números del ejemplo queda un sistema de dos ecuaciones.",
    "Diez coma uno ocho, menos diecisiete coma cero cero por equis uno, menos siete coma siete cinco por equis dos, igual a cero.",
    "Y cuatro coma dos dos, menos siete coma siete cinco por equis uno, menos diez coma cinco cero por equis dos, igual a cero.",
    "Resolviendo, equis uno vale cero coma seis dos seis, y equis dos vale menos cero coma cero seis uno.",
    "En forma matricial es lo mismo: el punto estacionario es menos un medio, por be mayúscula inversa, por be.",
    "Be mayúscula tiene los cuadráticos en la diagonal, y la mitad de la interacción fuera de ella.",
    "Encontrar el punto no basta: hay que clasificarlo.",
    "Para eso está la matriz hessiana, que tiene las segundas derivadas.",
    "En la diagonal van dos be uno uno y dos be dos dos, y fuera, be uno dos.",
    "Es el doble de be mayúscula.",
    "Con dos factores la regla es simple.",
    "Si el determinante es positivo y el primer elemento es negativo, es un máximo.",
    "Si el determinante es positivo y el primer elemento es positivo, es un mínimo.",
    "Y si el determinante es negativo, es un punto silla.",
    "En el ejemplo, el determinante es menos diecisiete por menos diez coma cinco, menos siete coma siete cinco al cuadrado: ciento dieciocho coma cinco, positivo.",
    "Y el primer elemento es negativo.",
    "Es un máximo.",
    "Erre lo dice de otra forma, con los valores propios de be mayúscula: menos dos coma seis siete y menos once coma cero ocho.",
    "Todos negativos, máximo.",
    "Si fueran todos positivos, mínimo, y con signos mezclados, silla.",
    "El punto está en unidades codificadas, pero la respuesta tiene que ser en condiciones de operación.",
    "Se despeja: valor real igual a centro más equis por semirrango.",
    "La temperatura óptima es doscientos veinticinco más veinticinco por cero coma seis dos seis: doscientos cuarenta coma siete grados.",
    "La concentración es veinte más cinco por menos cero coma cero seis uno: diecinueve coma siete por ciento.",
    "Reemplazando en el modelo, el rendimiento máximo predicho es ochenta y dos coma ocho.",
    "Y la última revisión: ¿está dentro de la región estudiada?",
    "Sí, las dos coordenadas están entre menos uno coma cuatro uno cuatro y más uno coma cuatro uno cuatro.",
    "Además es del tipo buscado, un máximo.",
    "Entonces es el óptimo.",
    "El gráfico de contornos muestra lo mismo desde arriba: curvas de igual rendimiento.",
    "Elipses cerradas alrededor del punto indican un máximo o un mínimo; hipérbolas, una silla.",
    "¿Y si algo falla?",
    "Si el punto es del tipo equivocado, por ejemplo un mínimo cuando queremos maximizar, o si cae fuera de la región, el mejor punto que podemos recomendar está en el borde de la región: se evalúa el modelo en las esquinas y los bordes, y se elige el mejor.",
    "Nunca se extrapola fuera de lo medido, y siempre se confirma con corridas reales.",
    "Lo esencial de este módulo.",
    "Se codifica de menos uno a más uno, y el centro repetido da el error puro y la falta de ajuste, donde lo deseado es un pe valor alto.",
    "El central compuesto agrega puntos axiales para estimar la curvatura.",
    "El modelo de segundo orden es una regresión con lineales, cuadráticos e interacciones.",
    "El punto estacionario se encuentra derivando e igualando a cero, y se clasifica con la hessiana.",
    "Y al final se pasa a unidades reales y se revisa que sea del tipo buscado y esté dentro de la región.",
    "Eso fue el módulo veinticuatro."
  ],
  "huella": "e4c118115ef1"
});
