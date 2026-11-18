/* GENERADO por tools/generar_audio.py desde tools/guiones/m10-consejos.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m10-consejos",
  "modulo": "m10-analisis-factorial",
  "titulo": "Consejos para la pregunta de análisis factorial",
  "archivo": "audio/m10-consejos.mp3",
  "duracion": 175,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "La pregunta adicional"
    },
    {
      "t": 21.5,
      "titulo": "Paso uno: ¿sirven los datos?"
    },
    {
      "t": 53.5,
      "titulo": "Paso dos: cuántos factores"
    },
    {
      "t": 71.5,
      "titulo": "Paso tres: leer la salida"
    },
    {
      "t": 114.1,
      "titulo": "Paso cuatro: rotar e interpretar"
    },
    {
      "t": 141.6,
      "titulo": "Errores típicos"
    },
    {
      "t": 158.9,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Consejos para la prueba · Análisis factorial",
  "orden": 0.0,
  "marcas": {
    "inicio": 0.0,
    "idea": 6.36,
    "adec": 21.54,
    "bart": 24.01,
    "kmo": 35.7,
    "nf": 53.49,
    "lim": 62.59,
    "sal": 71.49,
    "h2": 77.74,
    "u2": 85.92,
    "ej": 89.54,
    "trampa": 101.93,
    "rot": 114.05,
    "rotno": 121.88,
    "interp": 130.99,
    "err": 141.64,
    "e1": 143.44,
    "e2": 145.43,
    "e3": 148.94,
    "e4": 152.41,
    "fin": 158.91
  },
  "frases": [
    [
      0.0,
      "Resumen práctico para la parte de análisis factorial de la pregunta adicional de la prueba cuatro."
    ],
    [
      6.36,
      "Recuerda la idea: hay factores latentes, que no se observan, que explican por qué las variables están correlacionadas."
    ],
    [
      13.52,
      "Componentes principales analiza toda la varianza; el análisis factorial, solo la varianza común."
    ],
    [
      21.54,
      "Antes de extraer factores, dos pruebas."
    ],
    [
      24.01,
      "Bartlett: la hipótesis nula es que la matriz de correlaciones es la identidad, o sea, que las variables no están correlacionadas."
    ],
    [
      31.99,
      "Queremos rechazarla: p menor que 0,05."
    ],
    [
      35.7,
      "KMO: mide si las correlaciones parciales son chicas."
    ],
    [
      39.03,
      "Mayor o igual a 0,75 es bueno, mayor o igual a 0,5 aceptable, menor que 0,5 inaceptable."
    ],
    [
      46.88,
      "Y mira también el de cada variable: una con KMO bajo es candidata a salir."
    ],
    [
      53.49,
      "Los criterios: Kaiser, autovalores mayores que uno; el porcentaje de varianza; el codo; y el análisis paralelo, que compara con datos simulados."
    ],
    [
      62.59,
      "Y un límite: el número de factores no puede pasar de p − 1, dividido en dos, con p el número de variables."
    ],
    [
      71.49,
      "En la salida de fa o de principal, cada variable tiene sus cargas en cada factor, y dos columnas clave."
    ],
    [
      77.74,
      "h² es la comunalidad: la parte de la varianza de la variable que explican los factores."
    ],
    [
      83.23,
      "Se calcula sumando las cargas al cuadrado."
    ],
    [
      85.92,
      "u² es la unicidad: uno menos la comunalidad."
    ],
    [
      89.54,
      "Ejemplo: una variable con cargas 0,8 y 0,3 tiene comunalidad 0,64 + 0,09, 0,73."
    ],
    [
      99.0,
      "Su unicidad es 0,27."
    ],
    [
      101.93,
      "Ojo: la pauta de la prueba uno de este semestre confundió las dos columnas en una pregunta."
    ],
    [
      107.62,
      "La variable peor representada es la de menor h², no la de menor u²."
    ],
    [
      114.05,
      "La rotación, por ejemplo varimax, gira los factores para que cada variable cargue fuerte en uno solo y sea más fácil interpretar."
    ],
    [
      121.88,
      "Lo que no cambia al rotar: las comunalidades, las unicidades y la varianza total explicada."
    ],
    [
      127.36,
      "Lo que cambia es cómo se reparte entre factores."
    ],
    [
      130.99,
      "Para nombrar un factor, mira las cargas mayores que 0,4 o 0,5 en valor absoluto y qué tienen en común esas variables."
    ],
    [
      141.64,
      "Los errores más comunes."
    ],
    [
      143.44,
      "Confundir h² con u²."
    ],
    [
      145.43,
      "Olvidar revisar Bartlett y KMO antes de interpretar."
    ],
    [
      148.94,
      "Interpretar las cargas sin rotar cuando te dan las rotadas."
    ],
    [
      152.41,
      "Y decir que la rotación cambia la varianza explicada total: no la cambia."
    ],
    [
      158.91,
      "El orden: Bartlett y KMO, cuántos factores, comunalidad igual a suma de cargas al cuadrado y unicidad uno menos eso, rotar e interpretar con las cargas grandes."
    ],
    [
      169.0,
      "En la sección de clases está resuelta la pregunta tres punto dos de la prueba uno, paso a paso."
    ]
  ],
  "frasesHabladas": [
    "Resumen práctico para la parte de análisis factorial de la pregunta adicional de la prueba cuatro.",
    "Recuerda la idea: hay factores latentes, que no se observan, que explican por qué las variables están correlacionadas.",
    "Componentes principales analiza toda la varianza; el análisis factorial, solo la varianza común.",
    "Antes de extraer factores, dos pruebas.",
    "Bartlett: la hipótesis nula es que la matriz de correlaciones es la identidad, o sea, que las variables no están correlacionadas.",
    "Queremos rechazarla: pe menor que cero coma cero cinco.",
    "K M O: mide si las correlaciones parciales son chicas.",
    "Mayor o igual a cero coma siete cinco es bueno, mayor o igual a cero coma cinco aceptable, menor que cero coma cinco inaceptable.",
    "Y mira también el de cada variable: una con K M O bajo es candidata a salir.",
    "Los criterios: Kaiser, autovalores mayores que uno; el porcentaje de varianza; el codo; y el análisis paralelo, que compara con datos simulados.",
    "Y un límite: el número de factores no puede pasar de pe menos uno, dividido en dos, con pe el número de variables.",
    "En la salida de fa o de principal, cada variable tiene sus cargas en cada factor, y dos columnas clave.",
    "Hache dos es la comunalidad: la parte de la varianza de la variable que explican los factores.",
    "Se calcula sumando las cargas al cuadrado.",
    "U dos es la unicidad: uno menos la comunalidad.",
    "Ejemplo: una variable con cargas cero coma ocho y cero coma tres tiene comunalidad cero coma seis cuatro más cero coma cero nueve, cero coma siete tres.",
    "Su unicidad es cero coma dos siete.",
    "Ojo: la pauta de la prueba uno de este semestre confundió las dos columnas en una pregunta.",
    "La variable peor representada es la de menor hache dos, no la de menor u dos.",
    "La rotación, por ejemplo varimax, gira los factores para que cada variable cargue fuerte en uno solo y sea más fácil interpretar.",
    "Lo que no cambia al rotar: las comunalidades, las unicidades y la varianza total explicada.",
    "Lo que cambia es cómo se reparte entre factores.",
    "Para nombrar un factor, mira las cargas mayores que cero coma cuatro o cero coma cinco en valor absoluto y qué tienen en común esas variables.",
    "Los errores más comunes.",
    "Confundir hache dos con u dos.",
    "Olvidar revisar Bartlett y K M O antes de interpretar.",
    "Interpretar las cargas sin rotar cuando te dan las rotadas.",
    "Y decir que la rotación cambia la varianza explicada total: no la cambia.",
    "El orden: Bartlett y K M O, cuántos factores, comunalidad igual a suma de cargas al cuadrado y unicidad uno menos eso, rotar e interpretar con las cargas grandes.",
    "En la sección de clases está resuelta la pregunta tres punto dos de la prueba uno, paso a paso."
  ],
  "huella": "3287b3ce8431"
});
