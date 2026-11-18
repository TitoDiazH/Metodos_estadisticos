/* GENERADO por tools/generar_audio.py desde tools/guiones/m23-lg-12-22.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m23-lg-12-22",
  "modulo": "m23-superficie-respuesta",
  "titulo": "Ejercicio 12.22: anodizado, la puerta de entrada a la superficie de respuesta",
  "archivo": "audio/m23-lg-12-22.mp3",
  "duracion": 334,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 35.3,
      "titulo": "La idea de superficie de respuesta"
    },
    {
      "t": 63.7,
      "titulo": "Codificar"
    },
    {
      "t": 92.8,
      "titulo": "El diseño"
    },
    {
      "t": 120.9,
      "titulo": "Primer modelo: un plano"
    },
    {
      "t": 161.3,
      "titulo": "Lo que aporta el centro"
    },
    {
      "t": 207.8,
      "titulo": "Segundo modelo: con interacción"
    },
    {
      "t": 259.0,
      "titulo": "Hacia dónde moverse"
    },
    {
      "t": 316.8,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Libro guía · Cap. 12, ej. 22 (con la materia explicada)",
  "pregunta": "m23-d001",
  "orden": 1.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 9.82,
    "clave1": 14.76,
    "clave2": 18.75,
    "clave3": 25.58,
    "idea": 35.34,
    "sup": 43.82,
    "formas": 49.55,
    "cod": 63.75,
    "codph": 68.44,
    "codt": 78.02,
    "codpq": 82.55,
    "dis": 92.83,
    "esq": 95.46,
    "cen": 99.91,
    "limite": 106.21,
    "m1": 120.85,
    "m1ec": 124.3,
    "b1": 131.35,
    "mitad": 139.75,
    "comp": 150.4,
    "b0": 155.28,
    "centro": 161.32,
    "puro": 165.12,
    "curv": 178.31,
    "medias": 185.8,
    "lof": 191.24,
    "lofv": 197.7,
    "m2": 207.77,
    "m2ec": 210.7,
    "m2t": 219.76,
    "m2r": 225.03,
    "dint": 235.6,
    "dintv": 243.44,
    "asc": 259.05,
    "grad": 265.15,
    "paso": 274.71,
    "puntos": 290.65,
    "despues": 298.5,
    "fin": 316.78
  },
  "frases": [
    [
      0.0,
      "Este es el primer ejercicio de superficie de respuesta, el 22 del capítulo 12 del libro guía."
    ],
    [
      6.01,
      "Lo vamos a usar para entender la materia desde el principio."
    ],
    [
      9.82,
      "Una empresa anodiza ollas de aluminio, y el anodizado está quedando muy delgado."
    ],
    [
      14.76,
      "Se quiere estudiar cómo el pH y la temperatura afectan el espesor."
    ],
    [
      18.75,
      "Hay diez corridas: cuatro combinaciones de pH y temperatura, cada una dos veces, y dos corridas en el centro."
    ],
    [
      25.58,
      "El libro pregunta qué diseño es, qué se gana con el centro, cuál es el mejor modelo, y hacia dónde moverse para aumentar el espesor."
    ],
    [
      35.34,
      "Hasta ahora, en los factoriales, los factores tenían niveles fijos, como bajo y alto."
    ],
    [
      40.66,
      "Pero el pH y la temperatura pueden tomar cualquier valor."
    ],
    [
      43.82,
      "Entonces el espesor no es una tabla de medias: es una superficie sobre el plano pH temperatura."
    ],
    [
      49.55,
      "La superficie real puede ser complicada, pero en una zona acotada casi siempre se parece a una de tres formas: una loma, un valle, o una silla de montar."
    ],
    [
      59.01,
      "El objetivo es encontrar dónde está lo mejor."
    ],
    [
      63.75,
      "Primero, codificar."
    ],
    [
      65.57,
      "Se resta el centro y se divide por el semirrango."
    ],
    [
      68.44,
      "El pH va de 1,2 a 1,8: centro 1,5, semirrango 0,3."
    ],
    [
      74.14,
      "Así 1,8 queda en +1, y 1,2 en −1."
    ],
    [
      78.02,
      "La temperatura va de −8 a ocho: centro cero, semirrango ocho."
    ],
    [
      82.55,
      "¿Para qué?"
    ],
    [
      83.44,
      "Para que los dos factores queden en la misma escala, de −1 a uno, y sus coeficientes se puedan comparar directamente."
    ],
    [
      92.83,
      "En el plano codificado, el diseño se ve así: las cuatro esquinas de un factorial 2 · 2, cada una con dos réplicas, y un punto central repetido dos veces."
    ],
    [
      102.48,
      "Es un factorial 2² con puntos al centro."
    ],
    [
      106.21,
      "Con solo dos niveles por factor, el modelo solo puede tener rectas e interacciones."
    ],
    [
      111.26,
      "Por 2 puntos pasa una sola recta, pero infinitas curvas: un dos a la k no puede ver curvatura."
    ],
    [
      117.23,
      "Ahí entra el centro."
    ],
    [
      120.85,
      "Ajustamos primero un modelo de primer orden: un plano."
    ],
    [
      124.3,
      "ŷ = 13 + 3,375 · x₁ + 2,125 · x₂."
    ],
    [
      131.35,
      "¿Cómo se lee con variables codificadas?"
    ],
    [
      133.79,
      "b₁, 3,375, es lo que sube el espesor por cada unidad codificada de pH."
    ],
    [
      139.75,
      "Pero de pH bajo a pH alto hay dos unidades, de −1 a +1, así que el efecto del factorial es el doble: 6,75."
    ],
    [
      147.93,
      "El coeficiente es la mitad del efecto."
    ],
    [
      150.4,
      "Como están en la misma escala, comparamos: el pH pesa más que la temperatura."
    ],
    [
      155.28,
      "Y b₀, 13, es el espesor predicho en el centro del diseño."
    ],
    [
      161.32,
      "Ahora, ¿para qué el centro?"
    ],
    [
      163.25,
      "Para dos cosas."
    ],
    [
      165.12,
      "La primera: las réplicas dan el error puro."
    ],
    [
      167.68,
      "Las dos corridas al centro dieron 14 y 13, y cada esquina también se repitió."
    ],
    [
      172.85,
      "Esa variación entre réplicas no depende de ningún modelo: es el ruido del proceso."
    ],
    [
      178.31,
      "La segunda: detectar curvatura."
    ],
    [
      180.47,
      "Si la superficie fuera un plano, la media en el centro sería igual a la media de las esquinas."
    ],
    [
      185.8,
      "Aquí el centro promedia 13,5, y las esquinas 12,88."
    ],
    [
      191.24,
      "Con el error puro se hace la prueba de falta de ajuste: compara lo que el plano no explica, contra el ruido puro."
    ],
    [
      197.7,
      "Da F = 6,72, con p 0,038."
    ],
    [
      202.01,
      "Se rechaza: el plano se queda corto."
    ],
    [
      204.54,
      "Algo le falta."
    ],
    [
      207.77,
      "Agregamos la interacción entre pH y temperatura."
    ],
    [
      210.7,
      "Ahora ŷ es 13 + 3,375 x₁ + 2,125 x₂ + 1,125 x₁ x₂."
    ],
    [
      219.76,
      "La interacción tiene t 3,62 y p 0,011: es significativa."
    ],
    [
      225.03,
      "El R² sube de 0,896 a 0,967, y la falta de ajuste desaparece: p 0,42."
    ],
    [
      233.44,
      "Este es el mejor modelo."
    ],
    [
      235.6,
      "¿Qué significa la interacción?"
    ],
    [
      237.48,
      "Derivemos respecto del pH: 3,375 + 1,125 · x₂."
    ],
    [
      243.44,
      "Con temperatura baja, x₂ igual a −1, el pH sube el espesor en 2,25 por unidad."
    ],
    [
      250.02,
      "Con temperatura alta, en 4,5."
    ],
    [
      252.77,
      "El efecto del pH depende de la temperatura: eso es una interacción."
    ],
    [
      259.05,
      "La última pregunta del libro es la dirección de máximo ascenso."
    ],
    [
      262.76,
      "Esto no está en la clase, pero es corto."
    ],
    [
      265.15,
      "En un plano, la dirección en que la respuesta sube más rápido es la de los coeficientes: 3,375 en pH y 2,125 en temperatura."
    ],
    [
      274.71,
      "Se avanza en el factor más influyente, el pH, con un paso de 0,3, que es una unidad codificada."
    ],
    [
      281.35,
      "Y la temperatura avanza en proporción: 2,125 / 3,375, 0,63 unidades, o sea, cinco grados."
    ],
    [
      290.65,
      "Cinco puntos: pH 1,8 y cinco grados, pH 2,1 y diez grados, y así hasta pH tres y 25 grados."
    ],
    [
      298.5,
      "¿Y después?"
    ],
    [
      299.57,
      "Se corre el proceso en esos puntos hasta que el espesor deje de subir."
    ],
    [
      303.99,
      "Alrededor del mejor se monta un diseño con más niveles, un central compuesto, para ajustar un modelo de segundo orden y encontrar el óptimo."
    ],
    [
      311.98,
      "Eso es lo que hacemos en el ejercicio 23."
    ],
    [
      316.78,
      "Resumiendo: codificar para comparar, el coeficiente codificado es la mitad del efecto, el centro da error puro y detecta curvatura, la falta de ajuste dice si el modelo se queda corto, y una interacción significa que la derivada respecto de un factor depende del otro."
    ]
  ],
  "frasesHabladas": [
    "Este es el primer ejercicio de superficie de respuesta, el veintidós del capítulo doce del libro guía.",
    "Lo vamos a usar para entender la materia desde el principio.",
    "Una empresa anodiza ollas de aluminio, y el anodizado está quedando muy delgado.",
    "Se quiere estudiar cómo el pH y la temperatura afectan el espesor.",
    "Hay diez corridas: cuatro combinaciones de pH y temperatura, cada una dos veces, y dos corridas en el centro.",
    "El libro pregunta qué diseño es, qué se gana con el centro, cuál es el mejor modelo, y hacia dónde moverse para aumentar el espesor.",
    "Hasta ahora, en los factoriales, los factores tenían niveles fijos, como bajo y alto.",
    "Pero el pH y la temperatura pueden tomar cualquier valor.",
    "Entonces el espesor no es una tabla de medias: es una superficie sobre el plano pH temperatura.",
    "La superficie real puede ser complicada, pero en una zona acotada casi siempre se parece a una de tres formas: una loma, un valle, o una silla de montar.",
    "El objetivo es encontrar dónde está lo mejor.",
    "Primero, codificar.",
    "Se resta el centro y se divide por el semirrango.",
    "El pH va de uno coma dos a uno coma ocho: centro uno coma cinco, semirrango cero coma tres.",
    "Así uno coma ocho queda en más uno, y uno coma dos en menos uno.",
    "La temperatura va de menos ocho a ocho: centro cero, semirrango ocho.",
    "¿Para qué?",
    "Para que los dos factores queden en la misma escala, de menos uno a uno, y sus coeficientes se puedan comparar directamente.",
    "En el plano codificado, el diseño se ve así: las cuatro esquinas de un factorial dos por dos, cada una con dos réplicas, y un punto central repetido dos veces.",
    "Es un factorial dos al cuadrado con puntos al centro.",
    "Con solo dos niveles por factor, el modelo solo puede tener rectas e interacciones.",
    "Por dos puntos pasa una sola recta, pero infinitas curvas: un dos a la ka no puede ver curvatura.",
    "Ahí entra el centro.",
    "Ajustamos primero un modelo de primer orden: un plano.",
    "Ye gorro igual a trece, más tres coma tres siete cinco por equis uno, más dos coma uno dos cinco por equis dos.",
    "¿Cómo se lee con variables codificadas?",
    "Be uno, tres coma tres siete cinco, es lo que sube el espesor por cada unidad codificada de pH.",
    "Pero de pH bajo a pH alto hay dos unidades, de menos uno a más uno, así que el efecto del factorial es el doble: seis coma siete cinco.",
    "El coeficiente es la mitad del efecto.",
    "Como están en la misma escala, comparamos: el pH pesa más que la temperatura.",
    "Y be cero, trece, es el espesor predicho en el centro del diseño.",
    "Ahora, ¿para qué el centro?",
    "Para dos cosas.",
    "La primera: las réplicas dan el error puro.",
    "Las dos corridas al centro dieron catorce y trece, y cada esquina también se repitió.",
    "Esa variación entre réplicas no depende de ningún modelo: es el ruido del proceso.",
    "La segunda: detectar curvatura.",
    "Si la superficie fuera un plano, la media en el centro sería igual a la media de las esquinas.",
    "Aquí el centro promedia trece coma cinco, y las esquinas doce coma ocho ocho.",
    "Con el error puro se hace la prueba de falta de ajuste: compara lo que el plano no explica, contra el ruido puro.",
    "Da efe igual a seis coma siete dos, con pe cero coma cero tres ocho.",
    "Se rechaza: el plano se queda corto.",
    "Algo le falta.",
    "Agregamos la interacción entre pH y temperatura.",
    "Ahora ye gorro es trece, más tres coma tres siete cinco equis uno, más dos coma uno dos cinco equis dos, más uno coma uno dos cinco equis uno equis dos.",
    "La interacción tiene te tres coma seis dos y pe cero coma cero uno uno: es significativa.",
    "El erre cuadrado sube de cero coma ocho nueve seis a cero coma nueve seis siete, y la falta de ajuste desaparece: pe cero coma cuatro dos.",
    "Este es el mejor modelo.",
    "¿Qué significa la interacción?",
    "Derivemos respecto del pH: tres coma tres siete cinco más uno coma uno dos cinco por equis dos.",
    "Con temperatura baja, equis dos igual a menos uno, el pH sube el espesor en dos coma dos cinco por unidad.",
    "Con temperatura alta, en cuatro coma cinco.",
    "El efecto del pH depende de la temperatura: eso es una interacción.",
    "La última pregunta del libro es la dirección de máximo ascenso.",
    "Esto no está en la clase, pero es corto.",
    "En un plano, la dirección en que la respuesta sube más rápido es la de los coeficientes: tres coma tres siete cinco en pH y dos coma uno dos cinco en temperatura.",
    "Se avanza en el factor más influyente, el pH, con un paso de cero coma tres, que es una unidad codificada.",
    "Y la temperatura avanza en proporción: dos coma uno dos cinco dividido en tres coma tres siete cinco, cero coma seis tres unidades, o sea, cinco grados.",
    "Cinco puntos: pH uno coma ocho y cinco grados, pH dos coma uno y diez grados, y así hasta pH tres y veinticinco grados.",
    "¿Y después?",
    "Se corre el proceso en esos puntos hasta que el espesor deje de subir.",
    "Alrededor del mejor se monta un diseño con más niveles, un central compuesto, para ajustar un modelo de segundo orden y encontrar el óptimo.",
    "Eso es lo que hacemos en el ejercicio veintitrés.",
    "Resumiendo: codificar para comparar, el coeficiente codificado es la mitad del efecto, el centro da error puro y detecta curvatura, la falta de ajuste dice si el modelo se queda corto, y una interacción significa que la derivada respecto de un factor depende del otro."
  ],
  "huella": "9957f934aa2b"
});
