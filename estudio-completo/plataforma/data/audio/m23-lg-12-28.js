/* GENERADO por tools/generar_audio.py desde tools/guiones/m23-lg-12-28.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m23-lg-12-28",
  "modulo": "m23-superficie-respuesta",
  "titulo": "Ejercicio 12.28: fuerza de arrastre de una soldadura",
  "archivo": "audio/m23-lg-12-28.mp3",
  "duracion": 167,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 31.4,
      "titulo": "El diseño"
    },
    {
      "t": 58.2,
      "titulo": "El modelo"
    },
    {
      "t": 77.5,
      "titulo": "¿Es adecuado?"
    },
    {
      "t": 90.2,
      "titulo": "Punto estacionario"
    },
    {
      "t": 117.1,
      "titulo": "Clasificar"
    },
    {
      "t": 127.7,
      "titulo": "El óptimo"
    },
    {
      "t": 154.4,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Libro guía · Cap. 12, ej. 28",
  "pregunta": "m23-d019",
  "orden": 7.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 5.07,
    "clave1": 7.68,
    "clave2": 11.09,
    "clave3": 20.58,
    "dis": 31.44,
    "cod": 47.1,
    "sal": 58.24,
    "ecuacion": 60.48,
    "lin": 61.64,
    "cuad": 62.22,
    "inter": 62.98,
    "sig": 64.59,
    "f": 77.48,
    "fcalc": 77.48,
    "rcuad": 81.35,
    "lof": 85.33,
    "deriv": 90.22,
    "d1": 92.82,
    "d2": 93.7,
    "d3": 94.66,
    "sist": 95.54,
    "sol": 97.34,
    "real": 102.74,
    "hes": 117.07,
    "ev": 118.73,
    "clas": 123.45,
    "opt": 127.7,
    "fin": 154.42
  },
  "frases": [
    [
      0.0,
      "Ejercicio 28: la soldadura de un poste a un tablero electrónico."
    ],
    [
      5.07,
      "Se quiere maximizar la fuerza de arrastre."
    ],
    [
      7.68,
      "Los factores son tiempo, potencia y fuerza aplicada."
    ],
    [
      11.09,
      "Primero se corrió un factorial 2³ con dos centros, todo con dos réplicas."
    ],
    [
      16.14,
      "Al detectar curvatura, se agregaron puntos axiales a 1,28."
    ],
    [
      20.58,
      "Se analizan las 32 corridas."
    ],
    [
      23.05,
      "Una nota: en la tabla del libro hay una fuerza que dice 80, pero por la codificación es 800."
    ],
    [
      31.44,
      "El factorial con centro sirve para el error puro y para detectar curvatura."
    ],
    [
      36.1,
      "Al agregar los seis axiales queda un central compuesto ortogonal."
    ],
    [
      40.02,
      "No se usó el rotable, que pediría axiales a 1,68, porque el equipo no permite abrir tanto los niveles."
    ],
    [
      47.1,
      "Codificación: tiempo −5 / 2, potencia −4,3 / 1,3, fuerza −750 / 50."
    ],
    [
      58.24,
      "El modelo de segundo orden completo."
    ],
    [
      60.48,
      "La ecuación."
    ],
    [
      61.64,
      "Lineales, cuadráticos, interacciones."
    ],
    [
      64.59,
      "Significativos: la potencia lineal y los tres cuadráticos, todos negativos."
    ],
    [
      69.71,
      "Tres curvaturas hacia abajo: todo apunta a un máximo."
    ],
    [
      73.19,
      "Ninguna interacción es significativa."
    ],
    [
      77.48,
      "F 9,7, p 0,00008."
    ],
    [
      81.35,
      "R² 0,8, ajustado 0,72."
    ],
    [
      85.33,
      "Sin falta de ajuste, p 0,33."
    ],
    [
      90.22,
      "Derivamos respecto de los tres factores."
    ],
    [
      92.82,
      "Tiempo."
    ],
    [
      93.7,
      "Potencia."
    ],
    [
      94.66,
      "Fuerza."
    ],
    [
      95.54,
      "Resolvemos el sistema."
    ],
    [
      97.34,
      "0,02, 0,37, y 0,1: todos dentro de la región."
    ],
    [
      102.74,
      "En unidades reales: tiempo 5,04 milisegundos, potencia 4,8 watts, fuerza 755 gramos."
    ],
    [
      111.71,
      "Fuerza de arrastre predicha: 1802."
    ],
    [
      117.07,
      "Los valores propios."
    ],
    [
      118.73,
      "Menos 110 − 181 − 340."
    ],
    [
      123.45,
      "Los tres negativos: máximo."
    ],
    [
      127.7,
      "Se busca maximizar, es un máximo y está dentro."
    ],
    [
      130.9,
      "Es la condición óptima: unos cinco milisegundos, 4,8 watts y 755 gramos."
    ],
    [
      138.0,
      "Comparado con la operación anterior, seis milisegundos, cinco watts y 850 gramos, se recomienda bajar la fuerza y un poco la potencia."
    ],
    [
      147.47,
      "Falta revisar los residuos, que se ven razonables, y confirmar con corridas."
    ],
    [
      154.42,
      "Cuando todos los cuadráticos son negativos y los valores propios también, y el punto cae dentro, el punto estacionario es el máximo."
    ],
    [
      162.6,
      "Con tres factores la clasificación se hace con los valores propios."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio veintiocho: la soldadura de un poste a un tablero electrónico.",
    "Se quiere maximizar la fuerza de arrastre.",
    "Los factores son tiempo, potencia y fuerza aplicada.",
    "Primero se corrió un factorial dos al cubo con dos centros, todo con dos réplicas.",
    "Al detectar curvatura, se agregaron puntos axiales a uno coma dos ocho.",
    "Se analizan las treinta y dos corridas.",
    "Una nota: en la tabla del libro hay una fuerza que dice ochenta, pero por la codificación es ochocientos.",
    "El factorial con centro sirve para el error puro y para detectar curvatura.",
    "Al agregar los seis axiales queda un central compuesto ortogonal.",
    "No se usó el rotable, que pediría axiales a uno coma seis ocho, porque el equipo no permite abrir tanto los niveles.",
    "Codificación: tiempo menos cinco sobre dos, potencia menos cuatro coma tres sobre uno coma tres, fuerza menos setecientos cincuenta sobre cincuenta.",
    "El modelo de segundo orden completo.",
    "La ecuación.",
    "Lineales, cuadráticos, interacciones.",
    "Significativos: la potencia lineal y los tres cuadráticos, todos negativos.",
    "Tres curvaturas hacia abajo: todo apunta a un máximo.",
    "Ninguna interacción es significativa.",
    "Efe nueve coma siete, pe cero coma cero cero cero cero ocho.",
    "Erre cuadrado cero coma ocho, ajustado cero coma siete dos.",
    "Sin falta de ajuste, pe cero coma tres tres.",
    "Derivamos respecto de los tres factores.",
    "Tiempo.",
    "Potencia.",
    "Fuerza.",
    "Resolvemos el sistema.",
    "Cero coma cero dos, cero coma tres siete, y cero coma uno: todos dentro de la región.",
    "En unidades reales: tiempo cinco coma cero cuatro milisegundos, potencia cuatro coma ocho watts, fuerza setecientos cincuenta y cinco gramos.",
    "Fuerza de arrastre predicha: mil ochocientos dos.",
    "Los valores propios.",
    "Menos ciento diez, menos ciento ochenta y uno, menos trescientos cuarenta.",
    "Los tres negativos: máximo.",
    "Se busca maximizar, es un máximo y está dentro.",
    "Es la condición óptima: unos cinco milisegundos, cuatro coma ocho watts y setecientos cincuenta y cinco gramos.",
    "Comparado con la operación anterior, seis milisegundos, cinco watts y ochocientos cincuenta gramos, se recomienda bajar la fuerza y un poco la potencia.",
    "Falta revisar los residuos, que se ven razonables, y confirmar con corridas.",
    "Cuando todos los cuadráticos son negativos y los valores propios también, y el punto cae dentro, el punto estacionario es el máximo.",
    "Con tres factores la clasificación se hace con los valores propios."
  ],
  "huella": "97d4a52203b1"
});
