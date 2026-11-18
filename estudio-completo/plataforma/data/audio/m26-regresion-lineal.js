/* GENERADO por tools/generar_audio.py desde tools/guiones/m26-regresion-lineal.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m26-regresion-lineal",
  "modulo": "m26-regresion-lineal",
  "titulo": "Regresión lineal simple, múltiple y polinomial",
  "archivo": "audio/m26-regresion-lineal.mp3",
  "duracion": 630,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "La idea"
    },
    {
      "t": 60.3,
      "titulo": "Mínimos cuadrados y R cuadrado"
    },
    {
      "t": 103.6,
      "titulo": "Regresión múltiple"
    },
    {
      "t": 153.0,
      "titulo": "El ejemplo del óxido nitroso"
    },
    {
      "t": 225.8,
      "titulo": "Pruebas te"
    },
    {
      "t": 314.2,
      "titulo": "La prueba efe global y el erre cuadrado ajustado"
    },
    {
      "t": 381.8,
      "titulo": "Regresión polinomial y derivadas"
    },
    {
      "t": 459.0,
      "titulo": "Supuestos y diagnóstico"
    },
    {
      "t": 506.9,
      "titulo": "Puntos influyentes y multicolinealidad"
    },
    {
      "t": 587.4,
      "titulo": "Cerrar una respuesta"
    },
    {
      "t": 601.4,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "idea": 10.72,
    "modelo": 25.39,
    "modelo-p": 34.06,
    "error": 42.58,
    "error-e": 45.48,
    "error-r": 51.45,
    "mc": 60.26,
    "mc-f": 68.49,
    "r2": 79.87,
    "r2-sc": 83.17,
    "r2-f": 89.44,
    "r2-l": 96.53,
    "mult": 103.58,
    "mat": 109.64,
    "mat-b": 113.57,
    "sup": 120.91,
    "sup-1": 122.46,
    "sup-2": 124.13,
    "sup-3": 127.47,
    "sup-4": 128.97,
    "s2": 136.32,
    "ox": 152.95,
    "oxsal": 166.63,
    "ec": 172.95,
    "hum": 187.39,
    "fijos": 196.12,
    "deriv": 208.57,
    "b0": 214.67,
    "t": 225.83,
    "thum": 237.85,
    "thum-c": 249.83,
    "tno": 258.52,
    "alfa": 267.97,
    "alfa-f": 279.2,
    "alfa-ej": 286.52,
    "alfa-dec": 304.04,
    "f": 314.24,
    "fv": 323.75,
    "r2v": 336.08,
    "r2aj": 343.12,
    "r2aj-v": 356.71,
    "comp": 363.51,
    "comp-1": 368.71,
    "comp-2": 370.74,
    "comp-3": 374.93,
    "poli": 381.83,
    "poli-r": 392.35,
    "pend": 398.19,
    "pend-f": 401.74,
    "pend-0": 407.53,
    "fert": 414.45,
    "fert-d": 428.09,
    "fert-0": 434.76,
    "inter": 445.3,
    "diag": 459.02,
    "rva": 468.84,
    "rva-ok": 472.75,
    "rva-u": 477.42,
    "rva-emb": 482.53,
    "qq": 489.55,
    "sw": 495.38,
    "infl": 506.88,
    "hat": 511.86,
    "hat-v": 519.97,
    "cook": 531.36,
    "cook-v": 539.02,
    "noelim": 544.52,
    "vif": 551.79,
    "vif-f": 563.71,
    "vif-c": 573.37,
    "vif-v": 577.46,
    "resp": 587.36,
    "resp-1": 591.43,
    "resp-2": 593.17,
    "resp-3": 593.93,
    "cierre": 601.37,
    "c1": 603.18,
    "c2": 608.45,
    "c3": 614.23,
    "c4": 619.53,
    "c5": 623.24,
    "fin": 627.32
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo 23: la regresión lineal."
    ],
    [
      3.31,
      "Es la mitad de la prueba cuatro, y además es la base de la superficie de respuesta, así que vale la pena entenderla bien."
    ],
    [
      10.72,
      "La pregunta es siempre la misma: tengo una respuesta cuantitativa, y, y quiero explicarla con una o varias variables, las equis."
    ],
    [
      18.69,
      "Por ejemplo, cuánto óxido nitroso emite un camión según la humedad, la temperatura y la presión del aire."
    ],
    [
      25.39,
      "El modelo más simple dice que, en promedio, ye sigue una recta en equis, más un ruido: ye igual a β₀ + β₁ por equis, más épsilon."
    ],
    [
      34.06,
      "β₀ es el intercepto, β₁ es la pendiente, y épsilon es el error aleatorio, con media cero y varianza σ²."
    ],
    [
      42.58,
      "Hay una distinción que se pregunta mucho."
    ],
    [
      45.48,
      "El error, épsilon, se mide respecto de la recta verdadera, que nadie conoce, así que no se observa."
    ],
    [
      51.45,
      "El residuo, e i, es la diferencia entre el dato y la recta estimada: ye i menos ŷ i."
    ],
    [
      56.81,
      "Ese sí se calcula."
    ],
    [
      60.26,
      "¿Cómo se elige la recta?"
    ],
    [
      61.86,
      "Se busca la que hace lo más pequeña posible la suma de los residuos al cuadrado."
    ],
    [
      66.19,
      "Por eso se llama mínimos cuadrados."
    ],
    [
      68.49,
      "De ahí salen las fórmulas: la pendiente, b₁, es la suma de productos cruzados dividida por la suma de cuadrados de equis, y el intercepto es ȳ − b₁ · x̄."
    ],
    [
      79.87,
      "Para medir qué tan bien ajusta, se usa el R²."
    ],
    [
      83.17,
      "La variación total de ye se separa en dos partes: la que explica el modelo y la que queda en los residuos."
    ],
    [
      89.44,
      "R² es la parte explicada dividida por la total, o sea, uno menos la suma de cuadrados residual sobre la total."
    ],
    [
      96.53,
      "Va de cero a uno, y se lee como la fracción de la variación de ye que explica el modelo."
    ],
    [
      103.58,
      "Con varias equis la idea es la misma, pero en vez de una recta se ajusta un plano, o un hiperplano."
    ],
    [
      109.64,
      "Escrito con matrices, el modelo es ye igual a equis por β, más épsilon, y la solución de mínimos cuadrados es β gorro igual a X'X, inversa, por X'y."
    ],
    [
      120.91,
      "Los supuestos son cuatro: que la relación sea lineal, que los errores tengan media cero y varianza constante, que sean independientes, y, para las pruebas, que sean normales."
    ],
    [
      131.64,
      "Además, ninguna equis puede ser combinación exacta de las otras."
    ],
    [
      136.32,
      "La varianza del error se estima con ese cuadrado: la suma de cuadrados residual dividida por n − k − 1."
    ],
    [
      143.4,
      "k es el número de regresores, y n − k − 1 son los grados de libertad del error, que aparecen en todas las pruebas."
    ],
    [
      152.95,
      "El ejemplo de la clase son 20 camiones diésel."
    ],
    [
      155.97,
      "La respuesta es el óxido nitroso, en partes por millón, y los regresores son la humedad, la temperatura y la presión."
    ],
    [
      163.08,
      "En R se ajusta con lm, y se mira con summary."
    ],
    [
      166.63,
      "La salida trae una fila por coeficiente: la estimación, su error estándar, el valor te y el valor p."
    ],
    [
      172.95,
      "Con las estimaciones, el modelo queda: ŷ igual a −3,51 − 0,00263 por humedad, +0,0008 por temperatura, +0,154 por presión."
    ],
    [
      187.39,
      "¿Cómo se lee el coeficiente de la humedad?"
    ],
    [
      189.83,
      "Por cada punto más de humedad, la emisión baja en promedio 0,0026 partes por millón, manteniendo fijas la temperatura y la presión."
    ],
    [
      199.17,
      "Esa última parte es la que más se olvida, y es lo que distingue a la regresión múltiple: cada coeficiente es el efecto de su variable con las demás constantes."
    ],
    [
      208.57,
      "Dicho de otra forma, el coeficiente es la derivada parcial de ŷ respecto de esa equis."
    ],
    [
      214.67,
      "El intercepto sería la emisión con humedad, temperatura y presión iguales a cero."
    ],
    [
      219.72,
      "Eso está muy fuera del rango de los datos, así que aquí no se interpreta."
    ],
    [
      225.83,
      "Para saber si una variable aporta, se prueba la hipótesis nula de que su β vale cero."
    ],
    [
      230.8,
      "El estadístico es t igual ab dividido por su error estándar, con n − k − 1 grados de libertad."
    ],
    [
      237.85,
      "Para la humedad: −0,002625 / 0,000655, da t igual a −4,01, con valor p 0,001."
    ],
    [
      249.83,
      "Como el valor p es menor que 0,05, se rechaza la hipótesis nula: la humedad sí explica la emisión de óxido nitroso."
    ],
    [
      258.52,
      "En cambio, la temperatura tiene valor p 0,70 y la presión 0,15."
    ],
    [
      264.4,
      "Ninguna de las dos es significativa al 5 %."
    ],
    [
      267.97,
      "Ahora, algo que el instructivo pide explícitamente."
    ],
    [
      271.25,
      "R siempre prueba β igual a cero."
    ],
    [
      273.58,
      "Pero a veces la pregunta es otra: ¿cada grado agrega dos minutos?"
    ],
    [
      277.55,
      "¿la pendiente vale uno?"
    ],
    [
      279.2,
      "Entonces la hipótesis nula es β = α, y el t se calcula a mano: b − α, dividido por el error estándar."
    ],
    [
      286.52,
      "Por ejemplo, en el ejercicio 12 punto uno de Walpole, b₂ es 2,0497, con error estándar 0,0481."
    ],
    [
      295.74,
      "Para la hipótesis de que vale dos, te es 0,0497 / 0,0481, o sea 1,03."
    ],
    [
      304.04,
      "Eso es menor que el valor crítico, 2,365, así que no se rechaza: los datos son compatibles con dos minutos por unidad."
    ],
    [
      314.24,
      "La prueba F global pregunta si el modelo sirve en su conjunto."
    ],
    [
      318.03,
      "La hipótesis nula es que todas las pendientes valen cero; la alternativa, que al menos una no."
    ],
    [
      323.75,
      "En el ejemplo, F vale 21,4, con tres y 16 grados de libertad, y el valor p es del orden de diez a la −6."
    ],
    [
      331.99,
      "Se rechaza: al menos una variable explica la emisión."
    ],
    [
      336.08,
      "El R² es 0,80: el modelo explica el 80 % de la variación del óxido nitroso."
    ],
    [
      343.12,
      "Pero el R² siempre sube al agregar variables, aunque no sirvan."
    ],
    [
      347.41,
      "Por eso existe el R² ajustado, que castiga cada regresor: uno menos, 1 − R² · n − 1 / n − k − 1."
    ],
    [
      356.71,
      "Aquí da 0,763."
    ],
    [
      359.04,
      "Es el que se usa para comparar modelos con distinto número de variables."
    ],
    [
      363.51,
      "En la prueba puede venir una salida con huecos."
    ],
    [
      366.38,
      "Todo se completa con estas relaciones: te es b sobre el error estándar, R² es la suma de cuadrados de la regresión sobre la total, y F es el cuadrado medio de la regresión sobre el cuadrado medio del error."
    ],
    [
      381.83,
      "La regresión es lineal en los parámetros, no necesariamente en las variables."
    ],
    [
      386.5,
      "Equis y equis al cuadrado pueden entrar como dos regresores distintos, y así se ajustan curvas."
    ],
    [
      392.35,
      "En R se escribe I de equis elevado a dos."
    ],
    [
      395.18,
      "Sin la I, R no agrega el cuadrado."
    ],
    [
      398.19,
      "Con un término cuadrático, b₁ ya no es la pendiente."
    ],
    [
      401.74,
      "La pendiente es la derivada: b₁ + 2 b₂ por equis, y cambia según dónde estemos."
    ],
    [
      407.53,
      "Se hace cero en equis igual a menos b₁ / 2 b₂."
    ],
    [
      411.28,
      "Si b₂ es negativo, ahí hay un máximo."
    ],
    [
      414.45,
      "El ejemplo de la ayudantía diez es un fertilizante."
    ],
    [
      417.59,
      "El rendimiento estimado es 3,121 + 0,03268 por la dosis, −0,0001118 por la dosis al cuadrado."
    ],
    [
      428.09,
      "La derivada es 0,03268 − 0,0002236 por la dosis."
    ],
    [
      434.76,
      "Se anula cerca de 146 kilos por hectárea, y como el cuadrático es negativo, es un máximo, con un rendimiento de 5,5 toneladas por hectárea."
    ],
    [
      445.3,
      "Con una interacción pasa algo parecido: si el modelo tiene b₁₂ · x₁ · x₂, el efecto de x₁ es b₁ + b₁₂ · x₂."
    ],
    [
      454.81,
      "Depende del nivel de la otra variable."
    ],
    [
      459.02,
      "Los supuestos son sobre los errores, que no vemos."
    ],
    [
      462.19,
      "Por eso se revisan con los residuos."
    ],
    [
      464.48,
      "En R, plot del modelo entrega cuatro gráficos de una vez."
    ],
    [
      468.84,
      "El más importante es el de residuos contra valores ajustados."
    ],
    [
      472.75,
      "Lo que se quiere ver es una nube sin forma, centrada en cero, de ancho parejo."
    ],
    [
      477.42,
      "Si aparece una curva, una U, falta un término, por ejemplo un equis al cuadrado."
    ],
    [
      482.53,
      "Si aparece un embudo, la varianza no es constante, y se puede transformar ye, por ejemplo con logaritmo."
    ],
    [
      489.55,
      "Para la normalidad está el gráfico cuantil cuantil: los puntos deberían caer sobre la diagonal."
    ],
    [
      495.38,
      "Y la prueba formal es Shapiro-Wilk, con hipótesis nula de normalidad."
    ],
    [
      499.67,
      "En el ejemplo da valor p 0,195, así que no se rechaza la normalidad."
    ],
    [
      506.88,
      "Un punto es influyente si al sacarlo el modelo cambia mucho."
    ],
    [
      510.42,
      "Hay dos medidas."
    ],
    [
      511.86,
      "La primera es el apalancamiento, que mide qué tan raras son sus equis."
    ],
    [
      516.11,
      "Se considera alto si supera dos veces k + 1 / n."
    ],
    [
      519.97,
      "Con k igual a tres y n = 20, el corte es 0,4."
    ],
    [
      524.29,
      "El máximo del ejemplo es 0,354, en la observación 19, así que ninguno es alto."
    ],
    [
      531.36,
      "La segunda es la distancia de Cook, que combina el apalancamiento con el tamaño del residuo."
    ],
    [
      536.8,
      "Se preocupa uno si pasa de uno."
    ],
    [
      539.02,
      "Aquí el máximo es 0,71, en la observación cinco."
    ],
    [
      542.95,
      "Tampoco hay problema."
    ],
    [
      544.52,
      "Y aunque hubiera uno, no se borra automáticamente: primero se revisa si es un error de registro o un caso real."
    ],
    [
      551.79,
      "Por último, la multicolinealidad."
    ],
    [
      554.17,
      "Si dos regresores están muy correlacionados, el modelo no logra separar sus efectos: los errores estándar se inflan y los coeficientes se vuelven inestables."
    ],
    [
      563.71,
      "Se mide con el factor de inflación de la varianza: 1 / 1 − R jota cuadrado, donde R jota cuadrado viene de explicar esa equis con las demás."
    ],
    [
      573.37,
      "Si pasa de cinco, o de diez según el criterio, es preocupante."
    ],
    [
      577.46,
      "En el ejemplo los valores son 2,4, 1,07 y 2,33."
    ],
    [
      582.8,
      "Todos bajo cinco: sin problema serio."
    ],
    [
      587.36,
      "El instructivo es claro con esto: cada respuesta lleva tres cosas."
    ],
    [
      591.43,
      "El estadístico o el valor p, la decisión, y la conclusión en el contexto del problema."
    ],
    [
      596.83,
      "No basta con decir se rechaza H₀."
    ],
    [
      601.37,
      "Lo esencial de este módulo."
    ],
    [
      603.18,
      "Cada coeficiente es el cambio esperado en ye por unidad de su equis, con las demás fijas."
    ],
    [
      608.45,
      "La prueba te es b sobre su error estándar, y si la hipótesis es otro valor, se resta ese valor."
    ],
    [
      614.23,
      "La F global prueba el modelo completo, y el R² ajustado compara modelos."
    ],
    [
      619.53,
      "En un polinomio el efecto es la derivada, y cambia con equis."
    ],
    [
      623.24,
      "Y se revisan residuos, apalancamiento, Cook y VIF."
    ],
    [
      627.32,
      "Eso fue el módulo 23."
    ]
  ],
  "frasesHabladas": [
    "Ahora toca el módulo veintitrés: la regresión lineal.",
    "Es la mitad de la prueba cuatro, y además es la base de la superficie de respuesta, así que vale la pena entenderla bien.",
    "La pregunta es siempre la misma: tengo una respuesta cuantitativa, y, y quiero explicarla con una o varias variables, las equis.",
    "Por ejemplo, cuánto óxido nitroso emite un camión según la humedad, la temperatura y la presión del aire.",
    "El modelo más simple dice que, en promedio, ye sigue una recta en equis, más un ruido: ye igual a beta cero, más beta uno por equis, más épsilon.",
    "Beta cero es el intercepto, beta uno es la pendiente, y épsilon es el error aleatorio, con media cero y varianza sigma cuadrado.",
    "Hay una distinción que se pregunta mucho.",
    "El error, épsilon, se mide respecto de la recta verdadera, que nadie conoce, así que no se observa.",
    "El residuo, e i, es la diferencia entre el dato y la recta estimada: ye i menos ye gorro i.",
    "Ese sí se calcula.",
    "¿Cómo se elige la recta?",
    "Se busca la que hace lo más pequeña posible la suma de los residuos al cuadrado.",
    "Por eso se llama mínimos cuadrados.",
    "De ahí salen las fórmulas: la pendiente, be uno, es la suma de productos cruzados dividida por la suma de cuadrados de equis, y el intercepto es ye barra menos be uno por equis barra.",
    "Para medir qué tan bien ajusta, se usa el erre cuadrado.",
    "La variación total de ye se separa en dos partes: la que explica el modelo y la que queda en los residuos.",
    "Erre cuadrado es la parte explicada dividida por la total, o sea, uno menos la suma de cuadrados residual sobre la total.",
    "Va de cero a uno, y se lee como la fracción de la variación de ye que explica el modelo.",
    "Con varias equis la idea es la misma, pero en vez de una recta se ajusta un plano, o un hiperplano.",
    "Escrito con matrices, el modelo es ye igual a equis por beta, más épsilon, y la solución de mínimos cuadrados es beta gorro igual a equis prima equis, inversa, por equis prima ye.",
    "Los supuestos son cuatro: que la relación sea lineal, que los errores tengan media cero y varianza constante, que sean independientes, y, para las pruebas, que sean normales.",
    "Además, ninguna equis puede ser combinación exacta de las otras.",
    "La varianza del error se estima con ese cuadrado: la suma de cuadrados residual dividida por ene menos ka menos uno.",
    "Ka es el número de regresores, y ene menos ka menos uno son los grados de libertad del error, que aparecen en todas las pruebas.",
    "El ejemplo de la clase son veinte camiones diésel.",
    "La respuesta es el óxido nitroso, en partes por millón, y los regresores son la humedad, la temperatura y la presión.",
    "En erre se ajusta con lm, y se mira con summary.",
    "La salida trae una fila por coeficiente: la estimación, su error estándar, el valor te y el pe valor.",
    "Con las estimaciones, el modelo queda: ye gorro igual a menos tres coma cinco uno, menos cero coma cero cero dos seis tres por humedad, más cero coma cero cero cero ocho por temperatura, más cero coma uno cinco cuatro por presión.",
    "¿Cómo se lee el coeficiente de la humedad?",
    "Por cada punto más de humedad, la emisión baja en promedio cero coma cero cero dos seis partes por millón, manteniendo fijas la temperatura y la presión.",
    "Esa última parte es la que más se olvida, y es lo que distingue a la regresión múltiple: cada coeficiente es el efecto de su variable con las demás constantes.",
    "Dicho de otra forma, el coeficiente es la derivada parcial de ye gorro respecto de esa equis.",
    "El intercepto sería la emisión con humedad, temperatura y presión iguales a cero.",
    "Eso está muy fuera del rango de los datos, así que aquí no se interpreta.",
    "Para saber si una variable aporta, se prueba la hipótesis nula de que su beta vale cero.",
    "El estadístico es te igual a be dividido por su error estándar, con ene menos ka menos uno grados de libertad.",
    "Para la humedad: menos cero coma cero cero dos seis dos cinco, dividido por cero coma cero cero cero seis cinco cinco, da te igual a menos cuatro coma cero uno, con pe valor cero coma cero cero uno.",
    "Como el pe valor es menor que cero coma cero cinco, se rechaza la hipótesis nula: la humedad sí explica la emisión de óxido nitroso.",
    "En cambio, la temperatura tiene pe valor cero coma siete cero y la presión cero coma uno cinco.",
    "Ninguna de las dos es significativa al cinco por ciento.",
    "Ahora, algo que el instructivo pide explícitamente.",
    "Erre siempre prueba beta igual a cero.",
    "Pero a veces la pregunta es otra: ¿cada grado agrega dos minutos?",
    "¿la pendiente vale uno?",
    "Entonces la hipótesis nula es beta igual a alfa, y el te se calcula a mano: be menos alfa, dividido por el error estándar.",
    "Por ejemplo, en el ejercicio doce punto uno de Walpole, be dos es dos coma cero cuatro nueve siete, con error estándar cero coma cero cuatro ocho uno.",
    "Para la hipótesis de que vale dos, te es cero coma cero cuatro nueve siete sobre cero coma cero cuatro ocho uno, o sea uno coma cero tres.",
    "Eso es menor que el valor crítico, dos coma tres seis cinco, así que no se rechaza: los datos son compatibles con dos minutos por unidad.",
    "La prueba efe global pregunta si el modelo sirve en su conjunto.",
    "La hipótesis nula es que todas las pendientes valen cero; la alternativa, que al menos una no.",
    "En el ejemplo, efe vale veintiuno coma cuatro, con tres y dieciséis grados de libertad, y el pe valor es del orden de diez a la menos seis.",
    "Se rechaza: al menos una variable explica la emisión.",
    "El erre cuadrado es cero coma ocho cero: el modelo explica el ochenta por ciento de la variación del óxido nitroso.",
    "Pero el erre cuadrado siempre sube al agregar variables, aunque no sirvan.",
    "Por eso existe el erre cuadrado ajustado, que castiga cada regresor: uno menos, uno menos erre cuadrado, por ene menos uno sobre ene menos ka menos uno.",
    "Aquí da cero coma siete seis tres.",
    "Es el que se usa para comparar modelos con distinto número de variables.",
    "En la prueba puede venir una salida con huecos.",
    "Todo se completa con estas relaciones: te es be sobre el error estándar, erre cuadrado es la suma de cuadrados de la regresión sobre la total, y efe es el cuadrado medio de la regresión sobre el cuadrado medio del error.",
    "La regresión es lineal en los parámetros, no necesariamente en las variables.",
    "Equis y equis al cuadrado pueden entrar como dos regresores distintos, y así se ajustan curvas.",
    "En erre se escribe I de equis elevado a dos.",
    "Sin la I, erre no agrega el cuadrado.",
    "Con un término cuadrático, be uno ya no es la pendiente.",
    "La pendiente es la derivada: be uno, más dos be dos por equis, y cambia según dónde estemos.",
    "Se hace cero en equis igual a menos be uno sobre dos be dos.",
    "Si be dos es negativo, ahí hay un máximo.",
    "El ejemplo de la ayudantía diez es un fertilizante.",
    "El rendimiento estimado es tres coma uno dos uno, más cero coma cero tres dos seis ocho por la dosis, menos cero coma cero cero cero uno uno uno ocho por la dosis al cuadrado.",
    "La derivada es cero coma cero tres dos seis ocho, menos cero coma cero cero cero dos dos tres seis por la dosis.",
    "Se anula cerca de ciento cuarenta y seis kilos por hectárea, y como el cuadrático es negativo, es un máximo, con un rendimiento de cinco coma cinco toneladas por hectárea.",
    "Con una interacción pasa algo parecido: si el modelo tiene be uno dos por equis uno por equis dos, el efecto de equis uno es be uno, más be uno dos por equis dos.",
    "Depende del nivel de la otra variable.",
    "Los supuestos son sobre los errores, que no vemos.",
    "Por eso se revisan con los residuos.",
    "En erre, plot del modelo entrega cuatro gráficos de una vez.",
    "El más importante es el de residuos contra valores ajustados.",
    "Lo que se quiere ver es una nube sin forma, centrada en cero, de ancho parejo.",
    "Si aparece una curva, una U, falta un término, por ejemplo un equis al cuadrado.",
    "Si aparece un embudo, la varianza no es constante, y se puede transformar ye, por ejemplo con logaritmo.",
    "Para la normalidad está el gráfico cuantil cuantil: los puntos deberían caer sobre la diagonal.",
    "Y la prueba formal es Shapiro-Wilk, con hipótesis nula de normalidad.",
    "En el ejemplo da pe valor cero coma uno nueve cinco, así que no se rechaza la normalidad.",
    "Un punto es influyente si al sacarlo el modelo cambia mucho.",
    "Hay dos medidas.",
    "La primera es el apalancamiento, que mide qué tan raras son sus equis.",
    "Se considera alto si supera dos veces ka más uno, sobre ene.",
    "Con ka igual a tres y ene igual a veinte, el corte es cero coma cuatro.",
    "El máximo del ejemplo es cero coma tres cinco cuatro, en la observación diecinueve, así que ninguno es alto.",
    "La segunda es la distancia de Cook, que combina el apalancamiento con el tamaño del residuo.",
    "Se preocupa uno si pasa de uno.",
    "Aquí el máximo es cero coma siete uno, en la observación cinco.",
    "Tampoco hay problema.",
    "Y aunque hubiera uno, no se borra automáticamente: primero se revisa si es un error de registro o un caso real.",
    "Por último, la multicolinealidad.",
    "Si dos regresores están muy correlacionados, el modelo no logra separar sus efectos: los errores estándar se inflan y los coeficientes se vuelven inestables.",
    "Se mide con el factor de inflación de la varianza: uno sobre uno menos erre jota cuadrado, donde erre jota cuadrado viene de explicar esa equis con las demás.",
    "Si pasa de cinco, o de diez según el criterio, es preocupante.",
    "En el ejemplo los valores son dos coma cuatro, uno coma cero siete y dos coma tres tres.",
    "Todos bajo cinco: sin problema serio.",
    "El instructivo es claro con esto: cada respuesta lleva tres cosas.",
    "El estadístico o el pe valor, la decisión, y la conclusión en el contexto del problema.",
    "No basta con decir se rechaza hache cero.",
    "Lo esencial de este módulo.",
    "Cada coeficiente es el cambio esperado en ye por unidad de su equis, con las demás fijas.",
    "La prueba te es be sobre su error estándar, y si la hipótesis es otro valor, se resta ese valor.",
    "La efe global prueba el modelo completo, y el erre cuadrado ajustado compara modelos.",
    "En un polinomio el efecto es la derivada, y cambia con equis.",
    "Y se revisan residuos, apalancamiento, Cook y ve i efe.",
    "Eso fue el módulo veintitrés."
  ],
  "huella": "e83b32404846"
});
