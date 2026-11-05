/* GENERADO por tools/generar_audio.py desde tools/guiones/m09-p1-3-1.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m09-p1-3-1",
  "modulo": "m09-pca",
  "titulo": "Prueba 1, pregunta 3.1: componentes principales en retail",
  "archivo": "audio/m09-p1-3-1.mp3",
  "duracion": 188,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide la pregunta"
    },
    {
      "t": 29.4,
      "titulo": "¿Cuántos componentes?"
    },
    {
      "t": 95.1,
      "titulo": "La expresión de PC uno"
    },
    {
      "t": 120.6,
      "titulo": "Interpretar"
    },
    {
      "t": 141.3,
      "titulo": "El cliente nuevo"
    }
  ],
  "ejercicio": "Prueba 1 (2026-20) · Pregunta 3.1",
  "pregunta": "m09-d011",
  "orden": 1.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 8.42,
    "clave1": 17.67,
    "clave2": 22.18,
    "clave3": 25.13,
    "autovalor": 29.39,
    "autovalor-r": 41.32,
    "lam": 45.42,
    "kaiser": 60.04,
    "kaiser-r": 66.54,
    "prop": 69.09,
    "acum": 75.34,
    "k80": 83.12,
    "nocoinciden": 87.69,
    "pc1": 95.09,
    "pc1-f": 99.21,
    "zeta": 112.64,
    "interp": 120.57,
    "interp-pos": 122.48,
    "interp-neg": 126.98,
    "interp-r": 129.06,
    "nuevo": 141.35,
    "nuevo-r": 156.8,
    "nuevo-z": 160.24,
    "nuevo-falta": 167.22,
    "fin": 175.36
  },
  "frases": [
    [
      0.0,
      "Vamos a preparar la pregunta adicional de componentes principales con la pregunta tres punto uno de la Prueba uno de este semestre."
    ],
    [
      8.42,
      "Una empresa de retail estudia a cincuenta clientes con cuatro variables: frecuencia de compra, gasto promedio, número de categorías y uso de cupones."
    ],
    [
      17.67,
      "Nos dan la salida de erre: las desviaciones estándar de los cuatro componentes, y la matriz de rotación, que son los loadings."
    ],
    [
      25.13,
      "Las variables están estandarizadas."
    ],
    [
      29.39,
      "El primer paso es la clave de toda la pregunta: erre no muestra los autovalores, muestra desviaciones estándar."
    ],
    [
      36.1,
      "¿Cómo paso de una a otra?"
    ],
    [
      41.32,
      "Elevando al cuadrado."
    ],
    [
      42.82,
      "El autovalor es la varianza del componente."
    ],
    [
      45.42,
      "Uno coma veinticinco al cuadrado es uno coma cinco seis."
    ],
    [
      49.25,
      "Cero coma nueve ocho al cuadrado, cero coma nueve seis."
    ],
    [
      52.95,
      "Cero coma nueve al cuadrado, cero coma ocho uno."
    ],
    [
      56.23,
      "Y cero coma ocho al cuadrado, cero coma seis cuatro."
    ],
    [
      60.04,
      "Con el criterio de Kaiser se retienen los componentes con autovalor mayor que uno."
    ],
    [
      64.71,
      "Solo el primero lo cumple."
    ],
    [
      66.54,
      "Por Kaiser, un componente."
    ],
    [
      69.09,
      "Para el criterio del ochenta por ciento, divido cada autovalor por la suma, que es tres coma nueve siete."
    ],
    [
      75.34,
      "El primero explica el treinta y nueve por ciento."
    ],
    [
      78.18,
      "Con el segundo se llega al sesenta y tres."
    ],
    [
      80.74,
      "Y con el tercero, al ochenta y cuatro."
    ],
    [
      83.12,
      "Para superar el ochenta por ciento se necesitan tres componentes."
    ],
    [
      87.69,
      "Los criterios no coinciden, y eso está bien."
    ],
    [
      90.51,
      "Lo que se pide es aplicarlos y justificar."
    ],
    [
      95.09,
      "La expresión de PC uno sale de la primera columna de la rotación."
    ],
    [
      99.21,
      "PC uno es cero coma seis dos uno por zeta de frecuencia, más cero coma cuatro cinco dos por zeta de gasto, más cero coma cinco tres ocho por zeta de categorías, menos cero coma tres cuatro nueve por zeta de cupones."
    ],
    [
      112.64,
      "Fíjate que se escribe con zetas, las variables estandarizadas, no con las variables originales."
    ],
    [
      120.57,
      "¿Qué mide PC uno?"
    ],
    [
      122.48,
      "Frecuencia, gasto y categorías tienen signo positivo: crecen juntas."
    ],
    [
      126.98,
      "Cupones tiene signo negativo."
    ],
    [
      129.06,
      "Entonces PC uno es un índice de intensidad de compra: es alto en clientes que compran seguido, gastan más y llevan más categorías, y es bajo en los que usan más cupones."
    ],
    [
      141.35,
      "La última parte trae una trampa."
    ],
    [
      143.53,
      "Un cliente nuevo tiene frecuencia diez, gasto cincuenta y ocho mil, cinco categorías y tres cupones."
    ],
    [
      149.73,
      "¿Se puede reemplazar directo en la fórmula?"
    ],
    [
      156.8,
      "No."
    ],
    [
      157.47,
      "La fórmula usa variables estandarizadas."
    ],
    [
      160.24,
      "Primero habría que calcular cada zeta: el valor menos la media de la muestra, dividido por su desviación estándar."
    ],
    [
      167.22,
      "Y como el enunciado no da esas medias ni desviaciones, el score no se puede calcular."
    ],
    [
      172.31,
      "Lo que se pide es explicar el procedimiento."
    ],
    [
      175.36,
      "En resumen: desviación al cuadrado es autovalor, se aplican los dos criterios, se escribe PC uno con zetas, se interpreta por los signos, y nunca se reemplazan valores originales sin estandarizar."
    ]
  ],
  "huella": "a55b5ebab84a"
});
