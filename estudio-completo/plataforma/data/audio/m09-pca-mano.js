/* GENERADO por tools/generar_audio.py desde tools/guiones/m09-pca-mano.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m09-pca-mano",
  "modulo": "m09-pca",
  "titulo": "Componentes principales a mano con una matriz de dos por dos",
  "archivo": "audio/m09-pca-mano.mp3",
  "duracion": 168,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 25.6,
      "titulo": "Los autovalores"
    },
    {
      "t": 80.0,
      "titulo": "Varianza explicada"
    },
    {
      "t": 96.7,
      "titulo": "El autovector"
    },
    {
      "t": 129.7,
      "titulo": "Interpretar"
    }
  ],
  "ejercicio": "Ejercicio tipo prueba · PCA a mano",
  "pregunta": "m09-d002",
  "orden": 2.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 7.62,
    "clave1": 11.92,
    "clave2": 17.22,
    "car": 25.58,
    "det": 33.51,
    "cuad": 42.52,
    "raices": 48.4,
    "raices-r": 63.79,
    "chequeo": 65.43,
    "var": 80.05,
    "var-1": 82.47,
    "var-2": 87.57,
    "var-r": 90.82,
    "vec": 96.7,
    "vec-fila": 103.5,
    "vec-prop": 111.55,
    "vec-norm": 115.12,
    "interp": 129.67,
    "interp-r": 137.22,
    "signo": 148.74,
    "fin": 157.08
  },
  "frases": [
    [
      0.0,
      "Este ejercicio es la base de todo el análisis de componentes principales: hacerlo a mano con una matriz de dos por dos."
    ],
    [
      7.62,
      "Se estudian dos variables de un grupo de empresas: ventas y utilidad."
    ],
    [
      11.92,
      "Nos dan su matriz de covarianza: cinco y dos en la diagonal, y dos fuera de la diagonal."
    ],
    [
      17.22,
      "Y nos piden los autovalores, el porcentaje de varianza de cada componente, y el autovector del primero."
    ],
    [
      25.58,
      "Los autovalores salen de la ecuación característica: el determinante de ese menos lambda por la identidad, igualado a cero."
    ],
    [
      33.51,
      "Con una matriz de dos por dos, el determinante es fácil."
    ],
    [
      37.16,
      "Cinco menos lambda, por dos menos lambda, menos dos al cuadrado, igual a cero."
    ],
    [
      42.52,
      "Si desarrollo, queda lambda al cuadrado, menos siete lambda, más seis, igual a cero."
    ],
    [
      48.4,
      "Con la fórmula de la ecuación cuadrática: siete más o menos la raíz de cuarenta y nueve menos veinticuatro, que es cinco, todo dividido en dos."
    ],
    [
      57.32,
      "¿Cuáles son los dos autovalores?"
    ],
    [
      63.79,
      "Seis y uno."
    ],
    [
      65.43,
      "Hay un chequeo rápido que conviene hacer siempre."
    ],
    [
      68.26,
      "La suma de los autovalores es la traza, cinco más dos, siete."
    ],
    [
      72.18,
      "Y el producto es el determinante, cinco por dos menos cuatro, seis."
    ],
    [
      76.48,
      "Las dos cosas calzan."
    ],
    [
      80.05,
      "La varianza total es la traza, siete."
    ],
    [
      82.47,
      "El primer componente explica seis de siete: ochenta y cinco coma siete por ciento."
    ],
    [
      87.57,
      "El segundo, el resto: catorce coma tres por ciento."
    ],
    [
      90.82,
      "Con un solo componente ya se supera el ochenta por ciento."
    ],
    [
      96.7,
      "Para el autovector del primer componente, se resuelve ese menos seis por la identidad, por v, igual a cero."
    ],
    [
      103.5,
      "Con la primera fila: cinco menos seis, por v uno, más dos por v dos, igual a cero."
    ],
    [
      108.51,
      "O sea, v uno es igual a dos veces v dos."
    ],
    [
      111.55,
      "Entonces el vector es proporcional a dos coma uno."
    ],
    [
      115.12,
      "Falta normalizarlo, para que su largo sea uno."
    ],
    [
      118.31,
      "La norma es la raíz de cuatro más uno, raíz de cinco, dos coma dos tres."
    ],
    [
      122.74,
      "Dividiendo, quedan cero coma ocho nueve cuatro y cero coma cuatro cuatro siete."
    ],
    [
      129.67,
      "Entonces PC uno es cero coma ocho nueve por ventas, más cero coma cuatro cinco por utilidad, con las variables centradas."
    ],
    [
      137.22,
      "Los dos loadings tienen el mismo signo, así que PC uno es un índice de tamaño: crece cuando crecen ventas y utilidad."
    ],
    [
      144.55,
      "Y pesa más ventas, porque es la variable con más varianza."
    ],
    [
      148.74,
      "Un detalle: el signo del autovector es arbitrario."
    ],
    [
      152.03,
      "Si erre te lo entrega con los dos signos negativos, es el mismo componente."
    ],
    [
      157.08,
      "El esquema para una pregunta así: ecuación característica, raíces, chequeo con traza y determinante, porcentajes, autovector normalizado, e interpretación por los signos."
    ]
  ],
  "huella": "29778d59b753"
});
