/* GENERADO por tools/generar_audio.py desde tools/guiones/m26-wal-12-36.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m26-wal-12-36",
  "modulo": "m26-regresion-lineal",
  "titulo": "Ejercicio 12.36: el factorial dos al cubo como regresión",
  "archivo": "audio/m26-wal-12-36.mp3",
  "duracion": 174,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 26.1,
      "titulo": "El modelo ajustado"
    },
    {
      "t": 74.0,
      "titulo": "Pruebas te"
    },
    {
      "t": 97.3,
      "titulo": "Efe y erre cuadrado"
    },
    {
      "t": 109.1,
      "titulo": "Supuestos y problemas"
    },
    {
      "t": 130.2,
      "titulo": "La suma de cuadrados por partes"
    },
    {
      "t": 159.8,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Walpole · Ej. 12.36",
  "pregunta": "m26-d035",
  "orden": 12.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 7.93,
    "clave1": 9.87,
    "clave2": 11.84,
    "clave3": 18.1,
    "sal": 26.08,
    "ecuacion": 35.73,
    "interp": 44.68,
    "i1": 47.38,
    "i2": 53.99,
    "i3": 63.7,
    "pt": 73.98,
    "t1": 77.8,
    "t2": 86.97,
    "t3": 90.35,
    "f": 97.25,
    "fcalc": 98.39,
    "rcuad": 102.6,
    "r2aj": 104.89,
    "sup": 109.08,
    "lin": 110.32,
    "sw": 111.86,
    "vif": 114.71,
    "vifv": 115.28,
    "hat": 121.22,
    "cook": 126.1,
    "scr": 130.21,
    "scrcalc": 144.17,
    "fin": 159.78
  },
  "frases": [
    [
      0.0,
      "Ejercicio 12 punto 36."
    ],
    [
      2.44,
      "Conecta la regresión con los diseños factoriales, y prepara la superficie de respuesta."
    ],
    [
      7.93,
      "Se hicieron ocho corridas."
    ],
    [
      9.87,
      "La respuesta es el producto."
    ],
    [
      11.84,
      "Los tres factores, temperatura, tiempo y concentración, están codificados en −1 y +1."
    ],
    [
      18.1,
      "Se pide el modelo y dividir la suma de cuadrados de la regresión en tres partes, una por variable."
    ],
    [
      26.08,
      "La salida."
    ],
    [
      27.74,
      "Fíjate en algo: los tres errores estándar son idénticos, 0,207."
    ],
    [
      33.09,
      "Eso pasa porque el diseño es ortogonal."
    ],
    [
      35.73,
      "El modelo: 9,9 + 0,575 x₁ + 0,55 x₂ + 1,15 x₃."
    ],
    [
      44.68,
      "Interpretación con variables codificadas."
    ],
    [
      47.38,
      "b₁, 0,575: subir la temperatura una unidad codificada sube el producto en eso."
    ],
    [
      53.99,
      "Pero de nivel bajo a nivel alto hay dos unidades, así que el efecto del factorial es el doble: 1,15."
    ],
    [
      61.04,
      "Cada coeficiente es la mitad del efecto."
    ],
    [
      63.7,
      "Y el intercepto ahora sí se interpreta: el cero codificado es el centro del diseño, y 9,9 es el promedio de las ocho corridas."
    ],
    [
      73.98,
      "Cuatro grados de libertad, crítico 2,776."
    ],
    [
      77.8,
      "Temperatura: t 2,77, p 0,0501."
    ],
    [
      82.37,
      "Justo en el borde: por una milésima, no se rechaza al 5 %."
    ],
    [
      86.97,
      "Tiempo: p 0,057, no se rechaza."
    ],
    [
      90.35,
      "Concentración: t 5,5, p 0,005: se rechaza."
    ],
    [
      97.25,
      "F global."
    ],
    [
      98.39,
      "15,17, p 0,012: el modelo sirve."
    ],
    [
      102.6,
      "R² 0,92."
    ],
    [
      104.89,
      "Ajustado 0,86."
    ],
    [
      109.08,
      "Supuestos."
    ],
    [
      110.32,
      "Residuos sin forma."
    ],
    [
      111.86,
      "Shapiro: 0,39."
    ],
    [
      114.71,
      "VIF: exactamente uno los tres."
    ],
    [
      117.04,
      "Diseño ortogonal: las columnas no están correlacionadas."
    ],
    [
      121.22,
      "Todas las corridas tienen el mismo apalancamiento, como corresponde a un factorial."
    ],
    [
      126.1,
      "El Cook más alto queda bajo uno."
    ],
    [
      130.21,
      "Lo último que pide el libro."
    ],
    [
      132.06,
      "Como las columnas son ortogonales, la suma de cuadrados de la regresión se reparte limpiamente: una parte por variable, cada una con un grado de libertad, y el orden en que se entran no cambia nada."
    ],
    [
      144.17,
      "Cada parte dividida por el cuadrado medio del error da un F, que es exactamente el t al cuadrado."
    ],
    [
      150.3,
      "Por eso las conclusiones son las mismas: la concentración es significativa, y temperatura y tiempo quedan justo al borde."
    ],
    [
      159.78,
      "Un factorial dos a la k es una regresión con variables codificadas: coeficiente igual a la mitad del efecto, errores estándar iguales y VIF igual a uno."
    ],
    [
      169.19,
      "Esa misma idea, con más niveles, es la superficie de respuesta."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio doce punto treinta y seis.",
    "Conecta la regresión con los diseños factoriales, y prepara la superficie de respuesta.",
    "Se hicieron ocho corridas.",
    "La respuesta es el producto.",
    "Los tres factores, temperatura, tiempo y concentración, están codificados en menos uno y más uno.",
    "Se pide el modelo y dividir la suma de cuadrados de la regresión en tres partes, una por variable.",
    "La salida.",
    "Fíjate en algo: los tres errores estándar son idénticos, cero coma dos cero siete.",
    "Eso pasa porque el diseño es ortogonal.",
    "El modelo: nueve coma nueve, más cero coma cinco siete cinco equis uno, más cero coma cinco cinco equis dos, más uno coma uno cinco equis tres.",
    "Interpretación con variables codificadas.",
    "Be uno, cero coma cinco siete cinco: subir la temperatura una unidad codificada sube el producto en eso.",
    "Pero de nivel bajo a nivel alto hay dos unidades, así que el efecto del factorial es el doble: uno coma uno cinco.",
    "Cada coeficiente es la mitad del efecto.",
    "Y el intercepto ahora sí se interpreta: el cero codificado es el centro del diseño, y nueve coma nueve es el promedio de las ocho corridas.",
    "Cuatro grados de libertad, crítico dos coma siete siete seis.",
    "Temperatura: te dos coma siete siete, pe cero coma cero cinco cero uno.",
    "Justo en el borde: por una milésima, no se rechaza al cinco por ciento.",
    "Tiempo: pe cero coma cero cinco siete, no se rechaza.",
    "Concentración: te cinco coma cinco, pe cero coma cero cero cinco: se rechaza.",
    "Efe global.",
    "Quince coma uno siete, pe cero coma cero uno dos: el modelo sirve.",
    "Erre cuadrado cero coma nueve dos.",
    "Ajustado cero coma ocho seis.",
    "Supuestos.",
    "Residuos sin forma.",
    "Shapiro: cero coma tres nueve.",
    "Ve i efe: exactamente uno los tres.",
    "Diseño ortogonal: las columnas no están correlacionadas.",
    "Todas las corridas tienen el mismo apalancamiento, como corresponde a un factorial.",
    "El Cook más alto queda bajo uno.",
    "Lo último que pide el libro.",
    "Como las columnas son ortogonales, la suma de cuadrados de la regresión se reparte limpiamente: una parte por variable, cada una con un grado de libertad, y el orden en que se entran no cambia nada.",
    "Cada parte dividida por el cuadrado medio del error da un efe, que es exactamente el te al cuadrado.",
    "Por eso las conclusiones son las mismas: la concentración es significativa, y temperatura y tiempo quedan justo al borde.",
    "Un factorial dos a la ka es una regresión con variables codificadas: coeficiente igual a la mitad del efecto, errores estándar iguales y ve i efe igual a uno.",
    "Esa misma idea, con más niveles, es la superficie de respuesta."
  ],
  "huella": "7d4200f5a597"
});
