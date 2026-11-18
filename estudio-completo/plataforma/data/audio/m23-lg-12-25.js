/* GENERADO por tools/generar_audio.py desde tools/guiones/m23-lg-12-25.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m23-lg-12-25",
  "modulo": "m23-superficie-respuesta",
  "titulo": "Ejercicio 12.25: producción de un colorante natural",
  "archivo": "audio/m23-lg-12-25.mp3",
  "duracion": 194,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 25.1,
      "titulo": "El diseño"
    },
    {
      "t": 56.7,
      "titulo": "El modelo"
    },
    {
      "t": 80.7,
      "titulo": "¿Es adecuado?"
    },
    {
      "t": 99.4,
      "titulo": "Punto estacionario"
    },
    {
      "t": 146.6,
      "titulo": "Clasificar"
    },
    {
      "t": 162.8,
      "titulo": "El óptimo"
    },
    {
      "t": 180.8,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Libro guía · Cap. 12, ej. 25",
  "pregunta": "m23-d010",
  "orden": 4.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 6.93,
    "clave1": 9.37,
    "clave2": 13.24,
    "clave3": 15.72,
    "dis": 25.06,
    "cod": 43.37,
    "sal": 56.68,
    "ecuacion": 58.35,
    "lin": 61.31,
    "cuad": 61.89,
    "inter": 62.64,
    "sig": 64.13,
    "f": 80.66,
    "fcalc": 80.66,
    "rcuad": 83.71,
    "lof": 86.28,
    "deriv": 99.42,
    "d1": 100.64,
    "d2": 109.86,
    "sist": 121.0,
    "sol": 122.79,
    "real": 132.18,
    "hes": 146.57,
    "det": 147.65,
    "ev": 153.02,
    "clas": 158.74,
    "opt": 162.81,
    "fin": 180.79
  },
  "frases": [
    [
      0.0,
      "Ejercicio 25: un colorante natural."
    ],
    [
      3.14,
      "Este es el caso de libro, con un máximo bien definido."
    ],
    [
      6.93,
      "Se busca maximizar la producción."
    ],
    [
      9.37,
      "Los factores son la concentración de carbono y la temperatura."
    ],
    [
      13.24,
      "Y esta vez vienen en unidades reales."
    ],
    [
      15.72,
      "Se pide el diseño, un modelo de segundo orden, si describe bien los datos, y las condiciones que maximizan la producción."
    ],
    [
      25.06,
      "Carbono en nueve y 13, temperatura en 17 y 25: las cuatro esquinas."
    ],
    [
      30.61,
      "Los axiales, 8,17 y 13,8 para el carbono, 15,34 y 26,66 para la temperatura."
    ],
    [
      39.12,
      "Y cuatro centros en 11 y 21."
    ],
    [
      41.61,
      "Es un central compuesto."
    ],
    [
      43.37,
      "Para codificar: el carbono −11, dividido en dos; la temperatura −21, dividido en cuatro."
    ],
    [
      50.03,
      "Así los axiales quedan en más y −1,414: es rotable."
    ],
    [
      56.68,
      "El modelo en codificado."
    ],
    [
      58.35,
      "Intercepto 7554."
    ],
    [
      61.31,
      "Lineales, cuadráticos, interacción."
    ],
    [
      64.13,
      "Significativos: la temperatura lineal, con un coeficiente grande y negativo, y los dos cuadráticos, ambos negativos."
    ],
    [
      71.75,
      "Dos cuadráticos negativos: la superficie curva hacia abajo en las dos direcciones."
    ],
    [
      76.84,
      "Huele a máximo."
    ],
    [
      80.66,
      "F 148, con p minúsculo."
    ],
    [
      83.71,
      "R² 0,992."
    ],
    [
      86.28,
      "La falta de ajuste es significativa, de nuevo porque las réplicas del centro son muy parejas; con un R² de 99 %, el modelo describe muy bien la producción."
    ],
    [
      99.42,
      "Derivamos."
    ],
    [
      100.64,
      "Respecto del carbono: 139 − 2 · 733 x₁ − 144 x₂, igual a cero."
    ],
    [
      109.86,
      "Respecto de la temperatura: −1555 − 144 x₁ − 2 · 2339 x₂, igual a cero."
    ],
    [
      121.0,
      "Se resuelve el sistema."
    ],
    [
      122.79,
      "x₁ = 0,13, x₂ igual a −0,34."
    ],
    [
      127.93,
      "Producción predicha: 7824."
    ],
    [
      132.18,
      "En unidades reales: carbono igual a 11 + 2 · 0,13, 11,26."
    ],
    [
      137.95,
      "Temperatura igual a 21 + 4 por menos cero,34, 19,65 grados."
    ],
    [
      146.57,
      "La hessiana."
    ],
    [
      147.65,
      "El determinante es positivo y el primer elemento negativo: hessiana definida negativa."
    ],
    [
      153.02,
      "Los valores propios, menos 730 y −2343."
    ],
    [
      158.74,
      "Los dos negativos: máximo."
    ],
    [
      162.81,
      "Queremos maximizar, el punto es un máximo y está dentro de la región."
    ],
    [
      167.27,
      "Esta vez sí es el óptimo: carbono 11,3 y 19,7 grados, con unas 7800 unidades."
    ],
    [
      175.0,
      "El último paso es confirmarlo con corridas reales en ese punto."
    ],
    [
      180.79,
      "Cuando los dos cuadráticos son negativos, la hessiana es definida negativa y el punto cae dentro, el punto estacionario es el óptimo."
    ],
    [
      188.92,
      "Y siempre se reporta en unidades reales: centro más equis por semirrango."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio veinticinco: un colorante natural.",
    "Este es el caso de libro, con un máximo bien definido.",
    "Se busca maximizar la producción.",
    "Los factores son la concentración de carbono y la temperatura.",
    "Y esta vez vienen en unidades reales.",
    "Se pide el diseño, un modelo de segundo orden, si describe bien los datos, y las condiciones que maximizan la producción.",
    "Carbono en nueve y trece, temperatura en diecisiete y veinticinco: las cuatro esquinas.",
    "Los axiales, ocho coma uno siete y trece coma ocho para el carbono, quince coma tres cuatro y veintiséis coma seis seis para la temperatura.",
    "Y cuatro centros en once y veintiuno.",
    "Es un central compuesto.",
    "Para codificar: el carbono menos once, dividido en dos; la temperatura menos veintiuno, dividido en cuatro.",
    "Así los axiales quedan en más y menos uno coma cuatro uno cuatro: es rotable.",
    "El modelo en codificado.",
    "Intercepto siete mil quinientos cincuenta y cuatro.",
    "Lineales, cuadráticos, interacción.",
    "Significativos: la temperatura lineal, con un coeficiente grande y negativo, y los dos cuadráticos, ambos negativos.",
    "Dos cuadráticos negativos: la superficie curva hacia abajo en las dos direcciones.",
    "Huele a máximo.",
    "Efe ciento cuarenta y ocho, con pe minúsculo.",
    "Erre cuadrado cero coma nueve nueve dos.",
    "La falta de ajuste es significativa, de nuevo porque las réplicas del centro son muy parejas; con un erre cuadrado de noventa y nueve por ciento, el modelo describe muy bien la producción.",
    "Derivamos.",
    "Respecto del carbono: ciento treinta y nueve, menos dos por setecientos treinta y tres equis uno, menos ciento cuarenta y cuatro equis dos, igual a cero.",
    "Respecto de la temperatura: menos mil quinientos cincuenta y cinco, menos ciento cuarenta y cuatro equis uno, menos dos por dos mil trescientos treinta y nueve equis dos, igual a cero.",
    "Se resuelve el sistema.",
    "Equis uno igual a cero coma uno tres, equis dos igual a menos cero coma tres cuatro.",
    "Producción predicha: siete mil ochocientos veinticuatro.",
    "En unidades reales: carbono igual a once más dos por cero coma uno tres, once coma dos seis.",
    "Temperatura igual a veintiuno más cuatro por menos cero coma tres cuatro, diecinueve coma seis cinco grados.",
    "La hessiana.",
    "El determinante es positivo y el primer elemento negativo: hessiana definida negativa.",
    "Los valores propios, menos setecientos treinta y menos dos mil trescientos cuarenta y tres.",
    "Los dos negativos: máximo.",
    "Queremos maximizar, el punto es un máximo y está dentro de la región.",
    "Esta vez sí es el óptimo: carbono once coma tres y diecinueve coma siete grados, con unas siete mil ochocientas unidades.",
    "El último paso es confirmarlo con corridas reales en ese punto.",
    "Cuando los dos cuadráticos son negativos, la hessiana es definida negativa y el punto cae dentro, el punto estacionario es el óptimo.",
    "Y siempre se reporta en unidades reales: centro más equis por semirrango."
  ],
  "huella": "07656034ea27"
});
