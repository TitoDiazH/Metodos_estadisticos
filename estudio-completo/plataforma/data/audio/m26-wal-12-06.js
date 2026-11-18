/* GENERADO por tools/generar_audio.py desde tools/guiones/m26-wal-12-06.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m26-wal-12-06",
  "modulo": "m26-regresion-lineal",
  "titulo": "Ejercicio 12.6: distancia de frenado, el primer polinomio",
  "archivo": "audio/m26-wal-12-06.mp3",
  "duracion": 242,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 28.9,
      "titulo": "El modelo ajustado"
    },
    {
      "t": 122.6,
      "titulo": "Pruebas te"
    },
    {
      "t": 145.0,
      "titulo": "Efe y erre cuadrado"
    },
    {
      "t": 167.4,
      "titulo": "Supuestos y problemas"
    },
    {
      "t": 198.4,
      "titulo": "Predicción"
    },
    {
      "t": 226.7,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Walpole · Ej. 12.6 (polinomio explicado)",
  "pregunta": "m26-d017",
  "orden": 6.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 9.21,
    "clave1": 12.9,
    "clave2": 16.27,
    "clave3": 23.0,
    "sal": 28.88,
    "ecuacion": 42.39,
    "interp": 51.98,
    "i1": 53.93,
    "i2": 61.94,
    "i3": 66.55,
    "deriv": 73.25,
    "tang1": 90.24,
    "tang2": 98.43,
    "vert": 108.32,
    "pt": 122.56,
    "t1": 129.01,
    "t2": 132.73,
    "f": 145.01,
    "fcalc": 146.15,
    "rcuad": 151.11,
    "r2aj": 153.54,
    "sup": 167.38,
    "lin": 168.62,
    "sw": 171.69,
    "hat": 176.12,
    "cook": 186.52,
    "pred": 198.43,
    "predcalc": 200.19,
    "predint": 210.34,
    "fin": 226.67
  },
  "frases": [
    [
      0.0,
      "Ejercicio 12 punto seis."
    ],
    [
      2.11,
      "Es el primer modelo polinomial, así que nos vamos a detener en lo que cambia: la interpretación con derivadas."
    ],
    [
      9.21,
      "Se midió la distancia de frenado de un auto a seis velocidades."
    ],
    [
      12.9,
      "La respuesta es la distancia de frenado, en metros."
    ],
    [
      16.27,
      "Y el modelo pedido es cuadrático: b₀ + b₁ por la velocidad, más b₂ por la velocidad al cuadrado."
    ],
    [
      23.0,
      "Además, estimar la distancia a 70 kilómetros por hora."
    ],
    [
      28.88,
      "¿Por qué esto sigue siendo regresión lineal?"
    ],
    [
      31.37,
      "Porque es lineal en los parámetros: la velocidad al cuadrado es simplemente otra columna."
    ],
    [
      36.68,
      "En R se escribe con i mayúscula y paréntesis, para que el sombrerito se entienda como potencia."
    ],
    [
      42.39,
      "El modelo ajustado: d̂ = 13,36 − 0,339 por ve, +0,0118 por ve al cuadrado."
    ],
    [
      51.98,
      "Ahora, cómo se interpreta."
    ],
    [
      53.93,
      "El coeficiente de ve, −0,339, ya no es el efecto de la velocidad."
    ],
    [
      59.37,
      "Ojo con esto, porque es el error típico."
    ],
    [
      61.94,
      "En un polinomio, el efecto de subir la velocidad depende de a qué velocidad vas."
    ],
    [
      66.55,
      "El intercepto sería la distancia a cero kilómetros por hora, fuera del rango, así que no se interpreta."
    ],
    [
      73.25,
      "El efecto se obtiene con la derivada."
    ],
    [
      75.48,
      "La derivada de b₁ por ve es b₁, y la de b₂ por ve al cuadrado es dos b₂ ve."
    ],
    [
      80.76,
      "Queda: −0,339 + 0,0237 por ve."
    ],
    [
      85.89,
      "Es una recta: la pendiente de la curva cambia con la velocidad."
    ],
    [
      90.24,
      "A 50 kilómetros por hora, la derivada vale 0,84: cada kilómetro por hora extra agrega casi un metro de frenado."
    ],
    [
      98.43,
      "A 100 kilómetros por hora vale 2,03: más del doble."
    ],
    [
      102.45,
      "Eso es lo que dice el término cuadrático positivo: la distancia crece cada vez más rápido."
    ],
    [
      108.32,
      "Si igualamos la derivada a cero, el vértice de la parábola queda en 14 kilómetros por hora."
    ],
    [
      114.25,
      "Está fuera de los datos, que parten en 35, así que en el rango observado la curva solo sube."
    ],
    [
      122.56,
      "Seis datos −3 parámetros: tres grados de libertad, y el crítico es 3,18."
    ],
    [
      129.01,
      "El término lineal: te −15,8, se rechaza."
    ],
    [
      132.73,
      "El cuadrático: t 80,8, p 0,00004."
    ],
    [
      137.62,
      "Se rechaza: hay curvatura."
    ],
    [
      139.85,
      "La distancia no crece en línea recta con la velocidad."
    ],
    [
      145.01,
      "F global."
    ],
    [
      146.15,
      "95000, con un p minúsculo: el modelo explica la distancia."
    ],
    [
      151.11,
      "El R² es prácticamente uno."
    ],
    [
      153.54,
      "El ajustado también."
    ],
    [
      155.14,
      "Un modelo cuadrático describe casi perfecto estos seis puntos, lo que tiene sentido físico: la energía que hay que disipar crece con el cuadrado de la velocidad."
    ],
    [
      167.38,
      "Supuestos."
    ],
    [
      168.62,
      "En los residuos, el último punto aparece marcado."
    ],
    [
      171.69,
      "Shapiro da 0,51: no se rechaza la normalidad."
    ],
    [
      176.12,
      "En un polinomio no se usa el VIF para decidir: ve y ve al cuadrado están correlacionados por construcción."
    ],
    [
      182.69,
      "Pasamos al apalancamiento: el corte es uno, nadie lo pasa."
    ],
    [
      186.52,
      "Pero la distancia de Cook de la velocidad 110 es 2,4: es influyente."
    ],
    [
      191.93,
      "Con solo seis datos, el punto del extremo pesa mucho en la forma de la curva."
    ],
    [
      198.43,
      "La distancia a 70."
    ],
    [
      200.19,
      "13,36 − 0,339 · 70 + 0,0118 · 70²."
    ],
    [
      207.78,
      "Da 47,5 metros."
    ],
    [
      210.34,
      "El intervalo para la media es angosto, de 47,1 a 47,9, porque el modelo ajusta casi perfecto."
    ],
    [
      218.55,
      "70 está dentro del rango: la predicción es confiable."
    ],
    [
      222.56,
      "A 150 no lo sería."
    ],
    [
      226.67,
      "Lo que hay que llevarse de los polinomios: el coeficiente lineal solo no es el efecto, el efecto es la derivada y cambia con equis, el signo del término cuadrático dice si la curva se acelera o se frena, y el vértice sale de igualar la derivada a cero."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio doce punto seis.",
    "Es el primer modelo polinomial, así que nos vamos a detener en lo que cambia: la interpretación con derivadas.",
    "Se midió la distancia de frenado de un auto a seis velocidades.",
    "La respuesta es la distancia de frenado, en metros.",
    "Y el modelo pedido es cuadrático: be cero más be uno por la velocidad, más be dos por la velocidad al cuadrado.",
    "Además, estimar la distancia a setenta kilómetros por hora.",
    "¿Por qué esto sigue siendo regresión lineal?",
    "Porque es lineal en los parámetros: la velocidad al cuadrado es simplemente otra columna.",
    "En erre se escribe con i mayúscula y paréntesis, para que el sombrerito se entienda como potencia.",
    "El modelo ajustado: de gorro igual a trece coma tres seis, menos cero coma tres tres nueve por ve, más cero coma cero uno uno ocho por ve al cuadrado.",
    "Ahora, cómo se interpreta.",
    "El coeficiente de ve, menos cero coma tres tres nueve, ya no es el efecto de la velocidad.",
    "Ojo con esto, porque es el error típico.",
    "En un polinomio, el efecto de subir la velocidad depende de a qué velocidad vas.",
    "El intercepto sería la distancia a cero kilómetros por hora, fuera del rango, así que no se interpreta.",
    "El efecto se obtiene con la derivada.",
    "La derivada de be uno por ve es be uno, y la de be dos por ve al cuadrado es dos be dos ve.",
    "Queda: menos cero coma tres tres nueve, más cero coma cero dos tres siete por ve.",
    "Es una recta: la pendiente de la curva cambia con la velocidad.",
    "A cincuenta kilómetros por hora, la derivada vale cero coma ocho cuatro: cada kilómetro por hora extra agrega casi un metro de frenado.",
    "A cien kilómetros por hora vale dos coma cero tres: más del doble.",
    "Eso es lo que dice el término cuadrático positivo: la distancia crece cada vez más rápido.",
    "Si igualamos la derivada a cero, el vértice de la parábola queda en catorce kilómetros por hora.",
    "Está fuera de los datos, que parten en treinta y cinco, así que en el rango observado la curva solo sube.",
    "Seis datos menos tres parámetros: tres grados de libertad, y el crítico es tres coma uno ocho.",
    "El término lineal: te menos quince coma ocho, se rechaza.",
    "El cuadrático: te ochenta coma ocho, pe cero coma cero cero cero cero cuatro.",
    "Se rechaza: hay curvatura.",
    "La distancia no crece en línea recta con la velocidad.",
    "Efe global.",
    "Noventa y cinco mil, con un pe minúsculo: el modelo explica la distancia.",
    "El erre cuadrado es prácticamente uno.",
    "El ajustado también.",
    "Un modelo cuadrático describe casi perfecto estos seis puntos, lo que tiene sentido físico: la energía que hay que disipar crece con el cuadrado de la velocidad.",
    "Supuestos.",
    "En los residuos, el último punto aparece marcado.",
    "Shapiro da cero coma cinco uno: no se rechaza la normalidad.",
    "En un polinomio no se usa el ve i efe para decidir: ve y ve al cuadrado están correlacionados por construcción.",
    "Pasamos al apalancamiento: el corte es uno, nadie lo pasa.",
    "Pero la distancia de Cook de la velocidad ciento diez es dos coma cuatro: es influyente.",
    "Con solo seis datos, el punto del extremo pesa mucho en la forma de la curva.",
    "La distancia a setenta.",
    "Trece coma tres seis, menos cero coma tres tres nueve por setenta, más cero coma cero uno uno ocho por setenta al cuadrado.",
    "Da cuarenta y siete coma cinco metros.",
    "El intervalo para la media es angosto, de cuarenta y siete coma uno a cuarenta y siete coma nueve, porque el modelo ajusta casi perfecto.",
    "Setenta está dentro del rango: la predicción es confiable.",
    "A ciento cincuenta no lo sería.",
    "Lo que hay que llevarse de los polinomios: el coeficiente lineal solo no es el efecto, el efecto es la derivada y cambia con equis, el signo del término cuadrático dice si la curva se acelera o se frena, y el vértice sale de igualar la derivada a cero."
  ],
  "huella": "0702315d3186"
});
