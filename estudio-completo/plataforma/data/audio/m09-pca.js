/* GENERADO por tools/generar_audio.py desde tools/guiones/m09-pca.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m09-pca",
  "modulo": "m09-pca",
  "titulo": "Análisis de componentes principales",
  "archivo": "audio/m09-pca.mp3",
  "duracion": 359,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Resumir muchas variables en pocas"
    },
    {
      "t": 56.6,
      "titulo": "Cómo se construye"
    },
    {
      "t": 104.3,
      "titulo": "Un ejemplo a mano"
    },
    {
      "t": 153.9,
      "titulo": "Loadings y scores"
    },
    {
      "t": 195.6,
      "titulo": "Cuántos componentes conservar"
    },
    {
      "t": 264.0,
      "titulo": "En erre: los autos"
    },
    {
      "t": 334.7,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "idea": 5.42,
    "idea-pca": 11.84,
    "no-elim": 20.69,
    "no-elim-r": 25.36,
    "orden": 30.45,
    "pc1": 33.98,
    "pc2": 36.38,
    "lim": 42.9,
    "lim-1": 44.03,
    "lim-2": 47.23,
    "lim-3": 51.14,
    "const": 56.63,
    "centrar": 58.85,
    "centrar-q": 62.83,
    "centrar-r": 67.17,
    "s": 73.93,
    "eig": 76.91,
    "eig-v": 80.09,
    "eig-l": 83.34,
    "max": 87.28,
    "max-r": 94.29,
    "ej": 104.35,
    "ej-d": 108.64,
    "ej-m": 111.61,
    "ej-s": 114.77,
    "ej-l": 121.48,
    "ej-v1": 125.16,
    "ej-v2": 131.43,
    "ej-var": 137.95,
    "ej-var-r": 145.84,
    "load": 153.91,
    "load-def": 156.28,
    "score": 162.75,
    "score-f": 169.17,
    "score-ojo": 173.93,
    "score-ojo-r": 188.14,
    "cuantos": 195.57,
    "r80": 199.31,
    "kaiser": 203.37,
    "codo": 210.8,
    "sd": 217.73,
    "sd-r": 219.87,
    "ay": 229.54,
    "ay-l": 237.62,
    "ay-k": 244.05,
    "ay-codo": 247.56,
    "ay-80": 249.51,
    "ay-c": 257.41,
    "r": 264.02,
    "r-s": 268.79,
    "r-rot": 270.88,
    "r-x": 272.47,
    "mt": 274.5,
    "mt-var": 278.75,
    "mt-regla": 286.71,
    "mt-pc1": 295.77,
    "mt-pc1-q": 304.74,
    "mt-pc1-r": 309.67,
    "mt-pc2": 316.22,
    "signo": 325.21,
    "c": 334.68,
    "c1": 335.41,
    "c2": 340.38,
    "c3": 345.87,
    "c4": 353.16,
    "fin": 356.88
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo nueve: el análisis de componentes principales, o PCA."
    ],
    [
      5.42,
      "Cuando tienes muchas variables, y varias de ellas están correlacionadas, en parte están diciendo lo mismo."
    ],
    [
      11.84,
      "Componentes principales aprovecha eso: crea unas pocas variables nuevas, los componentes, que resumen la mayor parte de la información."
    ],
    [
      20.69,
      "Un detalle importante, que se pregunta mucho: PCA no elimina variables."
    ],
    [
      25.36,
      "Cada componente es una combinación lineal de todas las variables originales."
    ],
    [
      30.45,
      "Los componentes se ordenan por cuánta variabilidad capturan."
    ],
    [
      33.98,
      "El primero captura lo máximo posible."
    ],
    [
      36.38,
      "El segundo, lo máximo de lo que queda, y es perpendicular al primero."
    ],
    [
      40.78,
      "Y así sucesivamente."
    ],
    [
      42.9,
      "¿Y qué no hace?"
    ],
    [
      44.03,
      "No te dice por sí solo qué variables son importantes."
    ],
    [
      47.23,
      "No garantiza que cada componente tenga una interpretación clara."
    ],
    [
      51.14,
      "Y no sirve si las relaciones entre variables no son lineales."
    ],
    [
      56.63,
      "La construcción tiene tres pasos."
    ],
    [
      58.85,
      "Primero se centran los datos: a cada variable se le resta su media."
    ],
    [
      62.83,
      "¿Para qué?"
    ],
    [
      67.17,
      "Para que el primer componente apunte hacia donde los datos varían más, y no simplemente hacia donde está su media."
    ],
    [
      73.93,
      "Segundo, se calcula la matriz de covarianza."
    ],
    [
      76.91,
      "Y tercero, se buscan sus valores y vectores propios."
    ],
    [
      80.09,
      "Cada vector propio es una dirección: un componente."
    ],
    [
      83.34,
      "Y su valor propio es la varianza de los datos en esa dirección."
    ],
    [
      87.28,
      "Formalmente, el primer componente es la dirección de largo uno que maximiza la varianza de los datos proyectados."
    ],
    [
      94.29,
      "Resolviendo ese problema, sale que es el vector propio con el mayor valor propio, y que su varianza es justamente ese valor propio."
    ],
    [
      104.35,
      "El ejemplo de la clase es chico: tres observaciones y dos variables."
    ],
    [
      108.64,
      "Los puntos son dos cero, cero dos, y tres tres."
    ],
    [
      111.61,
      "Las dos medias son 1,67."
    ],
    [
      114.77,
      "Después de centrar, la matriz de covarianza tiene 2,33 en la diagonal, y 0,33 fuera."
    ],
    [
      121.48,
      "Sus valores propios son 2,667 y dos."
    ],
    [
      125.16,
      "El primer vector propio es uno uno, dividido por raíz de dos: las dos variables pesan igual y se suman."
    ],
    [
      131.43,
      "El segundo es 1 − 1, dividido por raíz de dos: un contraste, una variable menos la otra."
    ],
    [
      137.95,
      "¿Qué porcentaje de la varianza explica el primer componente?"
    ],
    [
      145.84,
      "2,667 sobre la suma, 4,667: 57 %."
    ],
    [
      153.91,
      "Hay dos palabras que hay que tener claras."
    ],
    [
      156.28,
      "Los loadings son los pesos con que cada variable entra en un componente: los elementos del vector propio."
    ],
    [
      162.75,
      "Y los scores son los valores que toma cada observación en los componentes: sus nuevas coordenadas."
    ],
    [
      169.17,
      "El score de una observación es la suma de cada variable centrada, por su loading."
    ],
    [
      173.93,
      "Y aquí hay un error típico, que apareció en la ayudantía dos."
    ],
    [
      177.64,
      "Si el PCA se hizo con variables estandarizadas, para calcular el score de una observación nueva hay que estandarizarla primero, con la media y la desviación de la muestra."
    ],
    [
      188.14,
      "Si se reemplazan los valores crudos, la variable con números más grandes domina el resultado."
    ],
    [
      195.57,
      "¿Con cuántos componentes nos quedamos?"
    ],
    [
      198.01,
      "Hay tres reglas."
    ],
    [
      199.31,
      "La primera: acumular al menos el 80 % de la varianza."
    ],
    [
      203.37,
      "La segunda, el criterio de Kaiser: quedarse con los de valor propio mayor que uno."
    ],
    [
      208.38,
      "Esto vale con datos estandarizados."
    ],
    [
      210.8,
      "Y la tercera: mirar el codo del gráfico de sedimentación, donde los valores propios dejan de caer rápido."
    ],
    [
      217.73,
      "En la salida de R hay una trampa."
    ],
    [
      219.87,
      "Summary no entrega los valores propios, sino las desviaciones estándar de los componentes."
    ],
    [
      225.79,
      "Para obtener el valor propio, hay que elevar al cuadrado."
    ],
    [
      229.54,
      "En la ayudantía dos: las desviaciones son 1,46, 0,99, 0,86 y 0,37."
    ],
    [
      237.62,
      "Al cuadrado: 2,14, 0,98, 0,74 y 0,14."
    ],
    [
      244.05,
      "Con Kaiser, solo el primero supera uno: un componente."
    ],
    [
      247.56,
      "El codo también sugiere uno."
    ],
    [
      249.51,
      "Pero el acumulado es 53, 78, y 97 %."
    ],
    [
      254.65,
      "Con la regla del 80, hacen falta tres."
    ],
    [
      257.41,
      "Las reglas no siempre coinciden, y lo que se pide es justificar la elección."
    ],
    [
      264.02,
      "En R, todo sale con prcomp, con scale punto igual a TRUE para estandarizar."
    ],
    [
      268.79,
      "Summary da la varianza explicada, rotation da los loadings, y equis, los scores."
    ],
    [
      274.5,
      "El ejemplo de la clase es mtcars: 32 autos, 11 variables."
    ],
    [
      278.75,
      "El primer componente explica el 60 %, y el segundo, el 24."
    ],
    [
      283.71,
      "Juntos, 84 %."
    ],
    [
      286.71,
      "Para interpretar, la regla de la clase: un loading de 0,3 o más en valor absoluto es relevante, y de 0,4 o más, fuerte."
    ],
    [
      295.77,
      "En el primer componente, pesan positivo los cilindros, la cilindrada, la potencia y el peso."
    ],
    [
      301.67,
      "Y negativo, el rendimiento en millas por galón."
    ],
    [
      304.74,
      "¿Cómo lo llamarías?"
    ],
    [
      309.67,
      "Tamaño y potencia, contra eficiencia."
    ],
    [
      312.21,
      "Autos grandes y potentes a un lado, autos económicos al otro."
    ],
    [
      316.22,
      "En el segundo pesan las marchas, la transmisión manual y los carburadores, contra el tiempo de aceleración: una configuración deportiva."
    ],
    [
      325.21,
      "Y un detalle: el signo de un componente completo es arbitrario."
    ],
    [
      329.14,
      "Si se invierten todos los loadings, es el mismo componente."
    ],
    [
      334.68,
      "En resumen: PCA crea combinaciones lineales perpendiculares, ordenadas por varianza."
    ],
    [
      340.38,
      "Los vectores propios son las direcciones, y los valores propios, la varianza en cada una."
    ],
    [
      345.87,
      "Para decidir cuántos, 80 %, Kaiser o el codo, recordando que la desviación de R se eleva al cuadrado."
    ],
    [
      353.16,
      "Y se interpreta por los loadings más grandes y sus signos."
    ],
    [
      356.88,
      "Eso fue el módulo nueve."
    ]
  ],
  "huella": "99c8b137dc67",
  "frasesHabladas": [
    "Ahora toca el módulo nueve: el análisis de componentes principales, o pe ce a.",
    "Cuando tienes muchas variables, y varias de ellas están correlacionadas, en parte están diciendo lo mismo.",
    "Componentes principales aprovecha eso: crea unas pocas variables nuevas, los componentes, que resumen la mayor parte de la información.",
    "Un detalle importante, que se pregunta mucho: pe ce a no elimina variables.",
    "Cada componente es una combinación lineal de todas las variables originales.",
    "Los componentes se ordenan por cuánta variabilidad capturan.",
    "El primero captura lo máximo posible.",
    "El segundo, lo máximo de lo que queda, y es perpendicular al primero.",
    "Y así sucesivamente.",
    "¿Y qué no hace?",
    "No te dice por sí solo qué variables son importantes.",
    "No garantiza que cada componente tenga una interpretación clara.",
    "Y no sirve si las relaciones entre variables no son lineales.",
    "La construcción tiene tres pasos.",
    "Primero se centran los datos: a cada variable se le resta su media.",
    "¿Para qué?",
    "Para que el primer componente apunte hacia donde los datos varían más, y no simplemente hacia donde está su media.",
    "Segundo, se calcula la matriz de covarianza.",
    "Y tercero, se buscan sus valores y vectores propios.",
    "Cada vector propio es una dirección: un componente.",
    "Y su valor propio es la varianza de los datos en esa dirección.",
    "Formalmente, el primer componente es la dirección de largo uno que maximiza la varianza de los datos proyectados.",
    "Resolviendo ese problema, sale que es el vector propio con el mayor valor propio, y que su varianza es justamente ese valor propio.",
    "El ejemplo de la clase es chico: tres observaciones y dos variables.",
    "Los puntos son dos cero, cero dos, y tres tres.",
    "Las dos medias son uno coma sesenta y siete.",
    "Después de centrar, la matriz de covarianza tiene dos coma tres tres en la diagonal, y cero coma tres tres fuera.",
    "Sus valores propios son dos coma seis seis siete y dos.",
    "El primer vector propio es uno uno, dividido por raíz de dos: las dos variables pesan igual y se suman.",
    "El segundo es uno menos uno, dividido por raíz de dos: un contraste, una variable menos la otra.",
    "¿Qué porcentaje de la varianza explica el primer componente?",
    "Dos coma seis seis siete sobre la suma, cuatro coma seis seis siete: cincuenta y siete por ciento.",
    "Hay dos palabras que hay que tener claras.",
    "Los loadings son los pesos con que cada variable entra en un componente: los elementos del vector propio.",
    "Y los scores son los valores que toma cada observación en los componentes: sus nuevas coordenadas.",
    "El score de una observación es la suma de cada variable centrada, por su loading.",
    "Y aquí hay un error típico, que apareció en la ayudantía dos.",
    "Si el pe ce a se hizo con variables estandarizadas, para calcular el score de una observación nueva hay que estandarizarla primero, con la media y la desviación de la muestra.",
    "Si se reemplazan los valores crudos, la variable con números más grandes domina el resultado.",
    "¿Con cuántos componentes nos quedamos?",
    "Hay tres reglas.",
    "La primera: acumular al menos el ochenta por ciento de la varianza.",
    "La segunda, el criterio de Kaiser: quedarse con los de valor propio mayor que uno.",
    "Esto vale con datos estandarizados.",
    "Y la tercera: mirar el codo del gráfico de sedimentación, donde los valores propios dejan de caer rápido.",
    "En la salida de erre hay una trampa.",
    "Summary no entrega los valores propios, sino las desviaciones estándar de los componentes.",
    "Para obtener el valor propio, hay que elevar al cuadrado.",
    "En la ayudantía dos: las desviaciones son uno coma cuatro seis, cero coma nueve nueve, cero coma ocho seis y cero coma tres siete.",
    "Al cuadrado: dos coma catorce, cero coma noventa y ocho, cero coma setenta y cuatro y cero coma catorce.",
    "Con Kaiser, solo el primero supera uno: un componente.",
    "El codo también sugiere uno.",
    "Pero el acumulado es cincuenta y tres, setenta y ocho, y noventa y siete por ciento.",
    "Con la regla del ochenta, hacen falta tres.",
    "Las reglas no siempre coinciden, y lo que se pide es justificar la elección.",
    "En erre, todo sale con prcomp, con scale punto igual a TRUE para estandarizar.",
    "Summary da la varianza explicada, rotation da los loadings, y equis, los scores.",
    "El ejemplo de la clase es mtcars: treinta y dos autos, once variables.",
    "El primer componente explica el sesenta por ciento, y el segundo, el veinticuatro.",
    "Juntos, ochenta y cuatro por ciento.",
    "Para interpretar, la regla de la clase: un loading de cero coma tres o más en valor absoluto es relevante, y de cero coma cuatro o más, fuerte.",
    "En el primer componente, pesan positivo los cilindros, la cilindrada, la potencia y el peso.",
    "Y negativo, el rendimiento en millas por galón.",
    "¿Cómo lo llamarías?",
    "Tamaño y potencia, contra eficiencia.",
    "Autos grandes y potentes a un lado, autos económicos al otro.",
    "En el segundo pesan las marchas, la transmisión manual y los carburadores, contra el tiempo de aceleración: una configuración deportiva.",
    "Y un detalle: el signo de un componente completo es arbitrario.",
    "Si se invierten todos los loadings, es el mismo componente.",
    "En resumen: pe ce a crea combinaciones lineales perpendiculares, ordenadas por varianza.",
    "Los vectores propios son las direcciones, y los valores propios, la varianza en cada una.",
    "Para decidir cuántos, ochenta por ciento, Kaiser o el codo, recordando que la desviación de erre se eleva al cuadrado.",
    "Y se interpreta por los loadings más grandes y sus signos.",
    "Eso fue el módulo nueve."
  ]
});
