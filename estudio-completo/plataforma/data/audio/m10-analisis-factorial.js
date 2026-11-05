/* GENERADO por tools/generar_audio.py desde tools/guiones/m10-analisis-factorial.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m10-analisis-factorial",
  "modulo": "m10-analisis-factorial",
  "titulo": "Análisis factorial",
  "archivo": "audio/m10-analisis-factorial.mp3",
  "duracion": 417,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Factores que no se ven"
    },
    {
      "t": 65.7,
      "titulo": "El modelo"
    },
    {
      "t": 131.5,
      "titulo": "¿Los datos sirven?"
    },
    {
      "t": 191.4,
      "titulo": "Extraer los factores"
    },
    {
      "t": 263.4,
      "titulo": "Rotar e interpretar"
    },
    {
      "t": 340.6,
      "titulo": "En erre"
    },
    {
      "t": 393.7,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "idea": 3.82,
    "idea-2": 7.94,
    "idea-3": 15.91,
    "papel": 27.46,
    "var": 35.11,
    "var-c": 39.26,
    "var-e": 41.93,
    "var-u": 44.17,
    "var-af": 45.23,
    "vs-pca": 48.85,
    "vs-pca-r": 55.19,
    "mod": 65.7,
    "mod-a": 72.13,
    "h2": 76.3,
    "h2-def": 78.38,
    "psi": 87.52,
    "ej": 91.72,
    "ej-ma": 94.41,
    "ej-ma-c": 97.81,
    "ej-ma-r": 107.87,
    "ej-ma-psi": 113.01,
    "ej-ma-lee": 115.95,
    "ej-err": 123.19,
    "adec": 131.52,
    "adec-b": 136.86,
    "kmo": 145.89,
    "kmo-def": 148.12,
    "kmo-idea": 157.64,
    "kmo-esc": 165.29,
    "kmo-075": 166.75,
    "kmo-05": 169.39,
    "kmo-mal": 171.84,
    "kmo-ej": 175.81,
    "kmo-ej2": 181.5,
    "ext": 191.4,
    "ext-gl": 195.15,
    "ext-gl-ej": 202.29,
    "ext-met": 205.35,
    "met-cp": 207.2,
    "met-ep": 212.65,
    "met-mv": 217.98,
    "cuantos": 226.29,
    "cu-k": 227.81,
    "cu-80": 232.36,
    "cu-scree": 236.41,
    "cu-par": 238.79,
    "cu-pauta": 244.92,
    "rot": 263.35,
    "nounica": 269.99,
    "rot-def": 275.55,
    "rot-q": 282.32,
    "rot-r": 288.37,
    "rot-ej": 297.25,
    "rot-tipos": 310.0,
    "rot-ort": 311.44,
    "rot-obl": 317.94,
    "interp": 323.03,
    "interp-ej": 328.99,
    "interp-ej2": 334.74,
    "r": 340.61,
    "r-1": 342.43,
    "r-2": 344.01,
    "r-3": 346.41,
    "r-4": 348.93,
    "r-sal": 352.54,
    "r-h2": 356.12,
    "r-u2": 358.28,
    "r-com": 362.08,
    "r-ej": 368.77,
    "r-ej-f": 372.61,
    "r-ej-com": 378.22,
    "signo": 382.52,
    "c": 393.71,
    "c1": 394.45,
    "c2": 399.45,
    "c3": 404.81,
    "c4": 406.99,
    "c5": 411.26,
    "fin": 414.62
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo diez: el análisis factorial."
    ],
    [
      3.82,
      "Piensa en un cuestionario de satisfacción laboral con veinte preguntas."
    ],
    [
      7.94,
      "Seguramente las respuestas se agrupan: las preguntas sobre el sueldo se parecen entre sí, las del ambiente de trabajo también."
    ],
    [
      15.91,
      "El análisis factorial propone que detrás de esas correlaciones hay unos pocos factores latentes, que no se observan directamente, y que explican por qué unas variables se parecen más a otras."
    ],
    [
      27.46,
      "Algo que lo distingue de la regresión: acá no hay variable dependiente."
    ],
    [
      31.68,
      "Todas las variables cumplen el mismo papel."
    ],
    [
      35.11,
      "La idea central es que la varianza de cada variable tiene tres partes."
    ],
    [
      39.26,
      "Una común, que comparte con las demás."
    ],
    [
      41.93,
      "Una específica, que es solo suya."
    ],
    [
      44.17,
      "Y un error."
    ],
    [
      45.23,
      "El análisis factorial se concentra en la parte común."
    ],
    [
      48.85,
      "¿En qué se diferencia de componentes principales?"
    ],
    [
      55.19,
      "Componentes principales analiza toda la varianza de las variables."
    ],
    [
      59.18,
      "El análisis factorial por factores comunes analiza solo la parte compartida."
    ],
    [
      65.7,
      "El modelo escribe cada variable estandarizada como una suma ponderada de los factores, más un término propio."
    ],
    [
      72.13,
      "Los pesos se llaman cargas, y se ordenan en una matriz, a."
    ],
    [
      76.3,
      "De ahí salen dos números clave."
    ],
    [
      78.38,
      "La comunalidad, hache dos: la parte de la varianza de la variable que explican los factores."
    ],
    [
      84.06,
      "Se calcula sumando las cargas de esa variable al cuadrado."
    ],
    [
      87.52,
      "Y la especificidad, psi: lo que queda, uno menos hache dos."
    ],
    [
      91.72,
      "En la clase hay seis materias y dos factores."
    ],
    [
      94.41,
      "Matemáticas tiene cargas cero coma ocho y cero coma dos."
    ],
    [
      97.81,
      "Su comunalidad es cero coma ocho al cuadrado, más cero coma dos al cuadrado."
    ],
    [
      102.48,
      "¿Cuánto da?"
    ],
    [
      107.87,
      "Cero coma sesenta y cuatro, más cero coma cero cuatro: cero coma sesenta y ocho."
    ],
    [
      113.01,
      "Su especificidad es cero coma treinta y dos."
    ],
    [
      115.95,
      "El sesenta y ocho por ciento de la varianza de matemáticas lo explican los factores, y el treinta y dos es propio."
    ],
    [
      123.19,
      "Un error típico es calcular la comunalidad con un solo factor."
    ],
    [
      127.06,
      "Se suman los cuadrados de toda la fila."
    ],
    [
      131.52,
      "Antes de hacer un análisis factorial, hay que comprobar que las variables estén correlacionadas."
    ],
    [
      136.86,
      "El test de Bartlett, que ya vimos en el módulo dos, prueba si la matriz de correlación es la identidad."
    ],
    [
      143.06,
      "Si se rechaza, hay correlación."
    ],
    [
      145.89,
      "Y la otra herramienta es el KMO."
    ],
    [
      148.12,
      "Compara las correlaciones simples con las parciales."
    ],
    [
      151.23,
      "La correlación parcial es la que queda entre dos variables cuando se controla el efecto de todas las demás."
    ],
    [
      157.64,
      "Si las variables comparten factores, las parciales deberían ser chicas comparadas con las simples, y el KMO es alto."
    ],
    [
      165.29,
      "Va de cero a uno."
    ],
    [
      166.75,
      "Sobre cero coma setenta y cinco, bien."
    ],
    [
      169.39,
      "Sobre cero coma cinco, aceptable."
    ],
    [
      171.84,
      "Bajo cero coma cinco, no conviene hacer el análisis."
    ],
    [
      175.81,
      "En la clase, con las notas de varias materias, el KMO global daba cero coma treinta y cinco."
    ],
    [
      181.5,
      "Al sacar las materias poco correlacionadas con las demás, lenguaje, música y educación física, subió a cero coma sesenta y uno."
    ],
    [
      191.4,
      "Extraer los factores es encontrar la matriz de cargas."
    ],
    [
      195.15,
      "Primer cuidado: no se pueden pedir demasiados factores."
    ],
    [
      198.66,
      "La regla es que ka sea a lo más pe menos uno, dividido en dos."
    ],
    [
      202.29,
      "Con cuatro variables, a lo más un factor."
    ],
    [
      205.35,
      "Hay tres métodos clásicos."
    ],
    [
      207.2,
      "El de componentes principales, que siempre da solución, pero analiza toda la varianza."
    ],
    [
      212.65,
      "El de ejes principales, que reemplaza los unos de la diagonal por comunalidades e itera."
    ],
    [
      217.98,
      "Y el de máxima verosimilitud, que supone normalidad, y a cambio entrega una prueba chi cuadrado de qué tan bien ajusta el modelo."
    ],
    [
      226.29,
      "¿Cuántos factores?"
    ],
    [
      227.81,
      "Kaiser, valores propios mayores que uno, aunque tiende a quedarse corto."
    ],
    [
      232.36,
      "Explicar entre setenta y cinco y ochenta por ciento de la varianza."
    ],
    [
      236.41,
      "El codo del gráfico de sedimentación."
    ],
    [
      238.79,
      "Y el análisis paralelo, que compara los valores propios reales con los de datos simulados al azar."
    ],
    [
      244.92,
      "En la pauta de una prueba pasada se eligieron dos factores con tres argumentos: solo dos valores propios mayores que uno, un codo después del segundo, y entre los dos, dos coma cinco uno más uno coma siete cuatro, dividido en seis variables: setenta coma nueve por ciento."
    ],
    [
      263.35,
      "La solución inicial muchas veces es difícil de leer: varias variables cargan en varios factores a la vez."
    ],
    [
      269.99,
      "Pero la solución no es única: si se giran los ejes, se obtiene otra solución igual de válida."
    ],
    [
      275.55,
      "Eso es rotar."
    ],
    [
      276.82,
      "Se busca una estructura simple: que cada variable cargue fuerte en un solo factor."
    ],
    [
      282.32,
      "Y al rotar, ¿cambian las comunalidades?"
    ],
    [
      288.37,
      "No."
    ],
    [
      289.04,
      "Cambia cómo se reparte la varianza entre los factores, pero la comunalidad de cada variable y la varianza total explicada quedan iguales."
    ],
    [
      297.25,
      "En la clase, al girar cuarenta y cinco grados, matemáticas pasa de cero coma ocho y cero coma dos a cero coma cuatro dos y cero coma siete uno."
    ],
    [
      306.04,
      "Y su comunalidad sigue siendo cero coma sesenta y ocho."
    ],
    [
      310.0,
      "Hay dos familias."
    ],
    [
      311.44,
      "Las ortogonales mantienen los factores sin correlación: varimax, la más usada, quartimax y equamax."
    ],
    [
      317.94,
      "Las oblicuas permiten que los factores se correlacionen: oblimin y promax."
    ],
    [
      323.03,
      "Para interpretar, se miran las cargas grandes, mayores que cero coma cuatro o cero coma cinco."
    ],
    [
      328.99,
      "En las materias, el primer factor reúne matemáticas, física y química: aptitud científica."
    ],
    [
      334.74,
      "El segundo, inglés, historia y dibujo: aptitud humanística."
    ],
    [
      340.61,
      "En erre, con el paquete psych: se estandarizan los datos, se revisan KMO y cortest punto bartlett, se decide el número con fa punto parallel, y se ajusta con fa, indicando nfactors y rotate."
    ],
    [
      352.54,
      "En la salida hay tres columnas que se preguntan siempre."
    ],
    [
      356.12,
      "Hache dos, la comunalidad."
    ],
    [
      358.28,
      "U dos, la especificidad."
    ],
    [
      360.21,
      "Ojo con no confundirlas."
    ],
    [
      362.08,
      "Y com, la complejidad: en cuántos factores carga cada variable."
    ],
    [
      366.07,
      "Cerca de uno, en uno solo."
    ],
    [
      368.77,
      "Con USArrests, el KMO global es cero coma sesenta y cinco."
    ],
    [
      372.61,
      "Con varimax, el primer factor reúne asesinatos y asaltos, y el segundo, la población urbana."
    ],
    [
      378.22,
      "Las violaciones cargan en los dos, y su complejidad es dos."
    ],
    [
      382.52,
      "Un último detalle: el signo de un factor es arbitrario."
    ],
    [
      386.0,
      "Si en otra muestra todas las cargas de un factor salen con el signo invertido, es el mismo factor."
    ],
    [
      393.71,
      "En resumen: el análisis factorial explica las correlaciones con pocos factores latentes."
    ],
    [
      399.45,
      "La comunalidad es la suma de las cargas al cuadrado, y la especificidad, uno menos eso."
    ],
    [
      404.81,
      "Antes, Bartlett y KMO."
    ],
    [
      406.99,
      "Se rota para interpretar, y la rotación no cambia las comunalidades."
    ],
    [
      411.26,
      "Y en la salida de erre: hache dos, u dos y com."
    ],
    [
      414.62,
      "Eso fue el módulo diez."
    ]
  ],
  "huella": "ad116ed5b57f"
});
