/* GENERADO por tools/generar_audio.py desde tools/guiones/m26-wal-12-11.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m26-wal-12-11",
  "modulo": "m26-regresion-lineal",
  "titulo": "Ejercicio 12.11: calamares y multicolinealidad",
  "archivo": "audio/m26-wal-12-11.mp3",
  "duracion": 172,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 25.5,
      "titulo": "El modelo ajustado"
    },
    {
      "t": 71.1,
      "titulo": "Pruebas te"
    },
    {
      "t": 91.5,
      "titulo": "Efe y erre cuadrado"
    },
    {
      "t": 117.2,
      "titulo": "Supuestos y problemas"
    },
    {
      "t": 152.9,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Walpole · Ej. 12.11",
  "pregunta": "m26-d032",
  "orden": 11.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 7.33,
    "clave1": 9.61,
    "clave2": 12.04,
    "clave3": 20.39,
    "sal": 25.54,
    "ecuacion": 27.2,
    "interp": 44.26,
    "i1": 45.61,
    "i2": 51.19,
    "i3": 56.93,
    "pt": 71.12,
    "t1": 74.78,
    "t2": 77.95,
    "t3": 80.61,
    "t4": 83.12,
    "t5": 85.44,
    "f": 91.48,
    "fcalc": 93.03,
    "rcuad": 100.01,
    "r2aj": 102.34,
    "sup": 117.22,
    "lin": 118.46,
    "sw": 120.41,
    "vif": 123.96,
    "vifv": 125.89,
    "hat": 145.5,
    "cook": 148.66,
    "fin": 152.87
  },
  "frases": [
    [
      0.0,
      "Ejercicio 12 punto 11: el peso de los calamares."
    ],
    [
      3.47,
      "Es el mejor ejemplo de multicolinealidad de la lista."
    ],
    [
      7.33,
      "Se midieron 22 calamares."
    ],
    [
      9.61,
      "La respuesta es el peso, en libras."
    ],
    [
      12.04,
      "Y hay cinco regresores, todos medidas de la boca: largo del rostral, de la aleta, del rostral a la cola, de la cola a la aleta, y el ancho."
    ],
    [
      20.39,
      "Se pide la ecuación de regresión con las cinco."
    ],
    [
      25.54,
      "La salida."
    ],
    [
      27.2,
      "Los coeficientes: 1,77 para x₁ − 3,66 para x₂, 2,41, 5,4, y 14,6 para el ancho."
    ],
    [
      37.67,
      "El apéndice del libro da números algo distintos; con los datos impresos, esto es lo que entrega R."
    ],
    [
      44.26,
      "Interpretación."
    ],
    [
      45.61,
      "Cada coeficiente sería el cambio de peso por pulgada de esa medida, con las otras cuatro fijas."
    ],
    [
      51.19,
      "Pero mira el de la aleta: −3,6."
    ],
    [
      54.18,
      "¿Un calamar con aleta más larga pesa menos?"
    ],
    [
      56.93,
      "Y pensemos qué significa «con las otras cuatro fijas»: ¿existe un calamar con la aleta más larga pero el mismo rostral, la misma cola y el mismo ancho?"
    ],
    [
      66.04,
      "Casi no."
    ],
    [
      66.95,
      "Todas las medidas crecen juntas."
    ],
    [
      71.12,
      "16 grados de libertad, crítico 2,12."
    ],
    [
      74.78,
      "Rostral: p 0,49, no se rechaza."
    ],
    [
      77.95,
      "Aleta: p 0,21, no se rechaza."
    ],
    [
      80.61,
      "Rostral cola: p 0,71."
    ],
    [
      83.12,
      "Cola aleta: p 0,15."
    ],
    [
      85.44,
      "Solo el ancho es significativo, con p 0,008."
    ],
    [
      91.48,
      "Y ahora el contraste."
    ],
    [
      93.03,
      "La F global es 83,6, con un p minúsculo."
    ],
    [
      96.81,
      "Se rechaza de lejos: el modelo explica el peso."
    ],
    [
      100.01,
      "R² 0,96."
    ],
    [
      102.34,
      "Ajustado 0,95."
    ],
    [
      105.0,
      "Un modelo que explica el 96 %, pero en el que casi ninguna variable es significativa."
    ],
    [
      111.08,
      "Esa contradicción es la huella típica de la multicolinealidad."
    ],
    [
      117.22,
      "Supuestos."
    ],
    [
      118.46,
      "Residuos sin patrón fuerte."
    ],
    [
      120.41,
      "Shapiro: 0,14, no se rechaza."
    ],
    [
      123.96,
      "Ahora sí, el VIF."
    ],
    [
      125.89,
      "Todos entre 22 y 34."
    ],
    [
      128.45,
      "Muy por encima de diez: multicolinealidad severa."
    ],
    [
      131.76,
      "Un VIF de 34 significa que la varianza de ese coeficiente se multiplica por 34, o sea, su error estándar por casi seis."
    ],
    [
      140.93,
      "Por eso los t salen chicos, y por eso los signos no son confiables."
    ],
    [
      145.5,
      "Tres calamares superan el corte de apalancamiento."
    ],
    [
      148.66,
      "Pero ningún Cook pasa de uno."
    ],
    [
      152.87,
      "Cuando el F es enorme y los t no, revisa el VIF."
    ],
    [
      156.39,
      "Si pasa de diez, las variables están midiendo casi lo mismo: los coeficientes individuales no se interpretan y conviene quedarse con menos variables."
    ],
    [
      165.66,
      "En Desarrollo, la segunda variante ajusta solo aleta y ancho, y explica casi lo mismo."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio doce punto once: el peso de los calamares.",
    "Es el mejor ejemplo de multicolinealidad de la lista.",
    "Se midieron veintidós calamares.",
    "La respuesta es el peso, en libras.",
    "Y hay cinco regresores, todos medidas de la boca: largo del rostral, de la aleta, del rostral a la cola, de la cola a la aleta, y el ancho.",
    "Se pide la ecuación de regresión con las cinco.",
    "La salida.",
    "Los coeficientes: uno coma siete siete para equis uno, menos tres coma seis seis para equis dos, dos coma cuatro uno, cinco coma cuatro, y catorce coma seis para el ancho.",
    "El apéndice del libro da números algo distintos; con los datos impresos, esto es lo que entrega erre.",
    "Interpretación.",
    "Cada coeficiente sería el cambio de peso por pulgada de esa medida, con las otras cuatro fijas.",
    "Pero mira el de la aleta: menos tres coma seis.",
    "¿Un calamar con aleta más larga pesa menos?",
    "Y pensemos qué significa «con las otras cuatro fijas»: ¿existe un calamar con la aleta más larga pero el mismo rostral, la misma cola y el mismo ancho?",
    "Casi no.",
    "Todas las medidas crecen juntas.",
    "Dieciséis grados de libertad, crítico dos coma uno dos.",
    "Rostral: pe cero coma cuatro nueve, no se rechaza.",
    "Aleta: pe cero coma dos uno, no se rechaza.",
    "Rostral cola: pe cero coma siete uno.",
    "Cola aleta: pe cero coma uno cinco.",
    "Solo el ancho es significativo, con pe cero coma cero cero ocho.",
    "Y ahora el contraste.",
    "La efe global es ochenta y tres coma seis, con un pe minúsculo.",
    "Se rechaza de lejos: el modelo explica el peso.",
    "Erre cuadrado cero coma nueve seis.",
    "Ajustado cero coma nueve cinco.",
    "Un modelo que explica el noventa y seis por ciento, pero en el que casi ninguna variable es significativa.",
    "Esa contradicción es la huella típica de la multicolinealidad.",
    "Supuestos.",
    "Residuos sin patrón fuerte.",
    "Shapiro: cero coma uno cuatro, no se rechaza.",
    "Ahora sí, el ve i efe.",
    "Todos entre veintidós y treinta y cuatro.",
    "Muy por encima de diez: multicolinealidad severa.",
    "Un ve i efe de treinta y cuatro significa que la varianza de ese coeficiente se multiplica por treinta y cuatro, o sea, su error estándar por casi seis.",
    "Por eso los te salen chicos, y por eso los signos no son confiables.",
    "Tres calamares superan el corte de apalancamiento.",
    "Pero ningún Cook pasa de uno.",
    "Cuando el efe es enorme y los te no, revisa el ve i efe.",
    "Si pasa de diez, las variables están midiendo casi lo mismo: los coeficientes individuales no se interpretan y conviene quedarse con menos variables.",
    "En Desarrollo, la segunda variante ajusta solo aleta y ancho, y explica casi lo mismo."
  ],
  "huella": "d6f8df5443ad"
});
