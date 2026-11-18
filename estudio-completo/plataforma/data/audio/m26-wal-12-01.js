/* GENERADO por tools/generar_audio.py desde tools/guiones/m26-wal-12-01.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m26-wal-12-01",
  "modulo": "m26-regresion-lineal",
  "titulo": "Ejercicio 12.1: el horno, regresión múltiple de principio a fin",
  "archivo": "audio/m26-wal-12-01.mp3",
  "duracion": 559,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 39.3,
      "titulo": "La idea del modelo"
    },
    {
      "t": 87.4,
      "titulo": "Leer la salida de R"
    },
    {
      "t": 173.0,
      "titulo": "Pruebas te, con las tres partes de la respuesta"
    },
    {
      "t": 268.6,
      "titulo": "Interpretar los coeficientes"
    },
    {
      "t": 322.8,
      "titulo": "¿Sirve el modelo? La prueba efe y el erre cuadrado"
    },
    {
      "t": 416.7,
      "titulo": "Supuestos"
    },
    {
      "t": 461.5,
      "titulo": "Problemas del modelo"
    },
    {
      "t": 535.9,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Walpole · Ej. 12.1 (con la materia explicada)",
  "pregunta": "m26-d002",
  "orden": 1.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 11.41,
    "clave1": 13.67,
    "clave2": 17.22,
    "clave3": 23.52,
    "idea": 39.32,
    "modelo": 44.61,
    "mc": 59.02,
    "residuo": 67.28,
    "matriz": 76.29,
    "sal": 87.44,
    "est": 94.97,
    "ecuacion": 97.91,
    "se": 110.72,
    "tval": 118.98,
    "tcalc": 123.33,
    "tsig": 133.12,
    "gl": 145.23,
    "tcrit": 158.56,
    "pval": 164.52,
    "h0": 172.98,
    "tres": 182.16,
    "r1": 195.42,
    "r2": 208.13,
    "r0": 215.56,
    "alfa": 221.55,
    "ojo": 236.04,
    "alfacalc": 242.7,
    "alfadec": 253.8,
    "interp": 268.58,
    "b1": 271.04,
    "ceteris": 281.15,
    "deriv": 287.88,
    "b2": 300.34,
    "b0": 307.63,
    "f": 322.79,
    "desc": 332.74,
    "scs": 347.62,
    "fcalc": 357.34,
    "fres": 368.28,
    "rcuad": 380.13,
    "r2aj": 389.56,
    "sup": 416.69,
    "lin": 422.61,
    "qq": 438.01,
    "sw": 443.03,
    "indep": 452.88,
    "vif": 461.45,
    "viff": 470.58,
    "vifv": 475.31,
    "vifd": 487.08,
    "hat": 495.51,
    "hatv": 505.48,
    "cook": 510.36,
    "cookv": 518.05,
    "cookq": 521.53,
    "cookn": 525.9,
    "fin": 535.9
  },
  "frases": [
    [
      0.0,
      "Este es el primer ejercicio de regresión para la prueba cuatro, así que lo vamos a resolver con calma, explicando de dónde sale cada cosa."
    ],
    [
      8.28,
      "Es el 12 punto uno del libro de Walpole."
    ],
    [
      11.41,
      "Se hicieron diez ensayos con un horno."
    ],
    [
      13.67,
      "Se midió el tiempo de cocción, que es la respuesta, ye."
    ],
    [
      17.22,
      "Y dos variables que podrían explicarlo: el ancho del horno, x₁, y la temperatura, x₂."
    ],
    [
      23.52,
      "El libro pide estimar la ecuación de regresión lineal múltiple."
    ],
    [
      27.14,
      "Nosotros vamos a hacer además todo lo que pide el instructivo de la prueba: interpretar, probar hipótesis, revisar el ajuste, los supuestos y los problemas del modelo."
    ],
    [
      39.32,
      "Con una sola variable, la regresión es una recta."
    ],
    [
      42.42,
      "Con dos variables, es un plano."
    ],
    [
      44.61,
      "El modelo dice que el tiempo de cocción es b₀ + b₁ por el ancho, más b₂ por la temperatura, más un error aleatorio."
    ],
    [
      52.4,
      "Los betas son los parámetros verdaderos, que no conocemos."
    ],
    [
      55.96,
      "Lo que hacemos es estimarlos con los datos."
    ],
    [
      59.02,
      "¿Cómo se eligen las estimaciones?"
    ],
    [
      61.12,
      "Con mínimos cuadrados: se busca el plano que hace lo más chica posible la suma de los residuos al cuadrado."
    ],
    [
      67.28,
      "El residuo de cada ensayo es lo observado menos lo que predice el plano."
    ],
    [
      71.68,
      "Se elevan al cuadrado para que los positivos y los negativos no se cancelen."
    ],
    [
      76.29,
      "En forma de matrices la solución es X'X, inversa, por X'y."
    ],
    [
      81.06,
      "Eso no se hace a mano en la prueba: lo hace la función ele eme de R."
    ],
    [
      87.44,
      "Esta es la tabla de coeficientes de summary."
    ],
    [
      90.13,
      "Tiene cuatro columnas, y conviene saber exactamente qué es cada una."
    ],
    [
      94.97,
      "La primera, Estimate, son las estimaciones."
    ],
    [
      97.91,
      "Con ellas, el modelo ajustado queda: ŷ = 0,58 + 2,71 · x₁ + 2,05 · x₂."
    ],
    [
      107.6,
      "Es lo mismo que da el libro en sus respuestas."
    ],
    [
      110.72,
      "La segunda columna es el error estándar: cuánto variaría esa estimación si repitiéramos el experimento con otros diez ensayos."
    ],
    [
      118.98,
      "La tercera es el t, y sale de dividir la primera columna por la segunda."
    ],
    [
      123.33,
      "Para el ancho: 2,71 / 0,202 da 13,4."
    ],
    [
      128.85,
      "¿Qué significa ese 13?"
    ],
    [
      133.12,
      "Que la estimación está a 13 errores estándar de cero."
    ],
    [
      136.79,
      "Si el ancho no tuviera ningún efecto, lo normal sería ver un t cerca de cero, digamos entre −2 y dos."
    ],
    [
      143.37,
      "13 es muchísimo."
    ],
    [
      145.23,
      "Ese t se compara con una t de Student con n − k − 1 grados de libertad."
    ],
    [
      150.49,
      "Diez datos, menos dos variables, menos uno por el intercepto: siete."
    ],
    [
      154.95,
      "Se pierde un grado de libertad por cada parámetro que estimamos."
    ],
    [
      158.56,
      "Con siete grados de libertad y 5 %, el valor crítico es 2,365."
    ],
    [
      164.52,
      "La cuarta columna es el valor p: la probabilidad de ver un t tan extremo si la hipótesis nula fuera cierta."
    ],
    [
      172.98,
      "Para cada coeficiente, la hipótesis nula es que el β vale cero, o sea, que esa variable no aporta, y la alternativa es que es distinto de cero."
    ],
    [
      182.16,
      "El instructivo es muy claro en algo: no basta con decir se rechaza."
    ],
    [
      186.24,
      "Cada respuesta tiene que traer tres cosas."
    ],
    [
      188.97,
      "El estadístico o el valor p."
    ],
    [
      190.93,
      "La decisión."
    ],
    [
      192.08,
      "Y una conclusión en el contexto del problema."
    ],
    [
      195.42,
      "Para el ancho: t = 13,4, valor p menor que 0,0001."
    ],
    [
      201.23,
      "Se rechaza la hipótesis nula."
    ],
    [
      203.36,
      "El ancho del horno influye significativamente en el tiempo de cocción."
    ],
    [
      208.13,
      "Para la temperatura: t = 42,6, y lo mismo: se rechaza."
    ],
    [
      213.07,
      "La temperatura también influye."
    ],
    [
      215.56,
      "El intercepto tiene t 0,96 y p 0,37: no es distinto de cero."
    ],
    [
      221.55,
      "Ahora, una pregunta que el instructivo pone explícitamente: probar que un β es igual a un valor que no es cero."
    ],
    [
      228.15,
      "Por ejemplo, ¿cada unidad de temperatura agrega exactamente dos minutos?"
    ],
    [
      232.77,
      "La hipótesis nula sería β₂ igual a dos."
    ],
    [
      236.04,
      "Ojo con esto: el t de la salida de R siempre compara con cero."
    ],
    [
      240.04,
      "Para comparar con dos hay que calcularlo a mano."
    ],
    [
      242.7,
      "Se le resta el dos a la estimación: 2,0497 − 2, dividido en el error estándar, 0,0481."
    ],
    [
      251.45,
      "Da 1,03."
    ],
    [
      253.8,
      "1,03 es menor que 2,365, y el valor p es 0,34."
    ],
    [
      259.48,
      "No se rechaza."
    ],
    [
      261.17,
      "Los datos son compatibles con que cada unidad de temperatura agregue dos minutos de cocción."
    ],
    [
      268.58,
      "Ahora, qué significa cada número."
    ],
    [
      271.04,
      "b₁, 2,71: por cada unidad adicional de ancho, el tiempo de cocción aumenta en promedio 2,7 minutos, manteniendo constante la temperatura."
    ],
    [
      281.15,
      "Esa última frase es la clave de la regresión múltiple."
    ],
    [
      284.48,
      "Es el efecto del ancho con la temperatura fija."
    ],
    [
      287.88,
      "Dicho como derivada: la derivada parcial de ŷ respecto de x₁ es b₁."
    ],
    [
      293.1,
      "En un modelo lineal es un número fijo, no depende de dónde estés."
    ],
    [
      297.16,
      "Cuando veamos polinomios, eso va a cambiar."
    ],
    [
      300.34,
      "b₂, 2,05: cada unidad más de temperatura agrega en promedio dos minutos, con el ancho fijo."
    ],
    [
      307.63,
      "¿Y el intercepto?"
    ],
    [
      309.1,
      "Sería el tiempo con ancho cero y temperatura cero."
    ],
    [
      312.23,
      "Ningún horno tiene ancho cero, está fuera del rango de los datos, así que no tiene interpretación práctica."
    ],
    [
      318.67,
      "Solo ajusta la altura del plano."
    ],
    [
      322.79,
      "La prueba F global se pregunta si el modelo, en conjunto, explica algo."
    ],
    [
      327.58,
      "La hipótesis nula es que todos los betas, salvo el intercepto, valen cero."
    ],
    [
      332.74,
      "Para entenderla hay que ver cómo se reparte la variabilidad."
    ],
    [
      336.81,
      "La variación total de los tiempos, la suma de cuadrados total, se divide en dos: lo que el modelo explica, la suma de cuadrados de la regresión, y lo que no explica, la del error."
    ],
    [
      347.62,
      "Aquí la total es 10956, y casi todo es explicado: 10953."
    ],
    [
      355.04,
      "El error es apenas tres."
    ],
    [
      357.34,
      "El F divide lo explicado por cada variable, entre lo no explicado por cada grado de libertad: 10953 / 2 / 3 dividido en siete."
    ],
    [
      368.28,
      "Da más de 12600."
    ],
    [
      370.47,
      "El crítico con dos y siete grados de libertad es 4,7."
    ],
    [
      374.5,
      "Se rechaza: el modelo sirve, al menos una variable explica el tiempo de cocción."
    ],
    [
      380.13,
      "El R² es lo explicado sobre el total: 0,9997."
    ],
    [
      385.07,
      "El modelo explica prácticamente el 100 % de la variabilidad."
    ],
    [
      389.56,
      "Y el R² ajustado, 0,9996."
    ],
    [
      393.53,
      "¿Por qué existe?"
    ],
    [
      394.74,
      "Porque el R² sube siempre que agregas una variable, aunque sea basura."
    ],
    [
      400.07,
      "El ajustado multiplica por n − 1 / n − k − 1, y así penaliza cada parámetro."
    ],
    [
      405.98,
      "Si al agregar una variable el ajustado baja, esa variable no se ganó su lugar."
    ],
    [
      410.72,
      "Aquí están casi iguales: los dos regresores aportan de verdad."
    ],
    [
      416.69,
      "Los supuestos se revisan con los residuos, porque los errores verdaderos no se observan."
    ],
    [
      422.61,
      "Linealidad y varianza constante: en el gráfico de residuos contra valores ajustados no debería haber forma."
    ],
    [
      429.43,
      "Ni curva, que indicaría que falta un término, ni embudo, que indicaría varianza creciente."
    ],
    [
      435.17,
      "Aquí se ve una nube sin patrón claro."
    ],
    [
      438.01,
      "Normalidad: en el gráfico cuantil cuantil los puntos deberían seguir la diagonal."
    ],
    [
      443.03,
      "Y la prueba de Shapiro Wilk, con hipótesis nula de normalidad, da p = 0,94."
    ],
    [
      449.14,
      "No se rechaza: no hay evidencia contra la normalidad."
    ],
    [
      452.88,
      "La independencia se mira con los residuos en el orden en que se hicieron los ensayos: sin rachas largas del mismo signo."
    ],
    [
      461.45,
      "Ahora, multicolinealidad."
    ],
    [
      463.43,
      "El VIF de cada variable mide cuánto se infla la varianza de su coeficiente por estar correlacionada con las demás."
    ],
    [
      470.58,
      "Es 1 / 1 menos el R² de esa variable explicada por las otras."
    ],
    [
      475.31,
      "Aquí los dos valen 8,27."
    ],
    [
      477.72,
      "Con dos variables eso corresponde a una correlación de 0,94 entre ancho y temperatura: los hornos más anchos se usaron a más temperatura."
    ],
    [
      487.08,
      "Entre cinco y diez es multicolinealidad moderada: no arruina el modelo, porque los t igual salieron enormes, pero hay que decirlo."
    ],
    [
      495.51,
      "El apalancamiento mide qué tan lejos está un ensayo del resto en las equis."
    ],
    [
      499.95,
      "El corte es 2 · k + 1 / n: 2 · 3, dividido en diez, 0,6."
    ],
    [
      505.48,
      "El ensayo ocho tiene 0,608, apenas sobre el corte."
    ],
    [
      510.36,
      "La distancia de Cook mide cuánto cambiarían los coeficientes si sacáramos ese dato."
    ],
    [
      515.38,
      "Se considera influyente si pasa de uno."
    ],
    [
      518.05,
      "El ensayo diez tiene 1,72: es influyente."
    ],
    [
      521.53,
      "Si se saca, b₁ baja de 2,71 a 2,55."
    ],
    [
      525.9,
      "¿Se elimina?"
    ],
    [
      527.05,
      "No automáticamente."
    ],
    [
      529.0,
      "Primero se revisa si fue un error de registro."
    ],
    [
      531.83,
      "Si el dato es real, se informa."
    ],
    [
      535.9,
      "Resumiendo el camino: escribir el modelo ajustado, interpretar cada coeficiente con las demás variables fijas, probar cada β con te, estadístico, decisión y contexto, la F global, el R² y el ajustado, los supuestos con residuos y Shapiro, y por último VIF, apalancamiento y Cook."
    ],
    [
      554.55,
      "Ese orden te sirve para cualquier pregunta de regresión de la prueba."
    ]
  ],
  "huella": "72c4aaa34426",
  "frasesHabladas": [
    "Este es el primer ejercicio de regresión para la prueba cuatro, así que lo vamos a resolver con calma, explicando de dónde sale cada cosa.",
    "Es el doce punto uno del libro de Walpole.",
    "Se hicieron diez ensayos con un horno.",
    "Se midió el tiempo de cocción, que es la respuesta, ye.",
    "Y dos variables que podrían explicarlo: el ancho del horno, equis uno, y la temperatura, equis dos.",
    "El libro pide estimar la ecuación de regresión lineal múltiple.",
    "Nosotros vamos a hacer además todo lo que pide el instructivo de la prueba: interpretar, probar hipótesis, revisar el ajuste, los supuestos y los problemas del modelo.",
    "Con una sola variable, la regresión es una recta.",
    "Con dos variables, es un plano.",
    "El modelo dice que el tiempo de cocción es be cero, más be uno por el ancho, más be dos por la temperatura, más un error aleatorio.",
    "Los betas son los parámetros verdaderos, que no conocemos.",
    "Lo que hacemos es estimarlos con los datos.",
    "¿Cómo se eligen las estimaciones?",
    "Con mínimos cuadrados: se busca el plano que hace lo más chica posible la suma de los residuos al cuadrado.",
    "El residuo de cada ensayo es lo observado menos lo que predice el plano.",
    "Se elevan al cuadrado para que los positivos y los negativos no se cancelen.",
    "En forma de matrices la solución es equis prima equis, inversa, por equis prima ye.",
    "Eso no se hace a mano en la prueba: lo hace la función ele eme de erre.",
    "Esta es la tabla de coeficientes de summary.",
    "Tiene cuatro columnas, y conviene saber exactamente qué es cada una.",
    "La primera, Estimate, son las estimaciones.",
    "Con ellas, el modelo ajustado queda: ye gorro igual a cero coma cinco ocho, más dos coma siete uno por equis uno, más dos coma cero cinco por equis dos.",
    "Es lo mismo que da el libro en sus respuestas.",
    "La segunda columna es el error estándar: cuánto variaría esa estimación si repitiéramos el experimento con otros diez ensayos.",
    "La tercera es el te, y sale de dividir la primera columna por la segunda.",
    "Para el ancho: dos coma siete uno dividido en cero coma dos cero dos da trece coma cuatro.",
    "¿Qué significa ese trece?",
    "Que la estimación está a trece errores estándar de cero.",
    "Si el ancho no tuviera ningún efecto, lo normal sería ver un te cerca de cero, digamos entre menos dos y dos.",
    "Trece es muchísimo.",
    "Ese te se compara con una te de Student con ene menos ka menos uno grados de libertad.",
    "Diez datos, menos dos variables, menos uno por el intercepto: siete.",
    "Se pierde un grado de libertad por cada parámetro que estimamos.",
    "Con siete grados de libertad y cinco por ciento, el valor crítico es dos coma tres seis cinco.",
    "La cuarta columna es el pe valor: la probabilidad de ver un te tan extremo si la hipótesis nula fuera cierta.",
    "Para cada coeficiente, la hipótesis nula es que el beta vale cero, o sea, que esa variable no aporta, y la alternativa es que es distinto de cero.",
    "El instructivo es muy claro en algo: no basta con decir se rechaza.",
    "Cada respuesta tiene que traer tres cosas.",
    "El estadístico o el pe valor.",
    "La decisión.",
    "Y una conclusión en el contexto del problema.",
    "Para el ancho: te igual a trece coma cuatro, pe valor menor que cero coma cero cero cero uno.",
    "Se rechaza la hipótesis nula.",
    "El ancho del horno influye significativamente en el tiempo de cocción.",
    "Para la temperatura: te igual a cuarenta y dos coma seis, y lo mismo: se rechaza.",
    "La temperatura también influye.",
    "El intercepto tiene te cero coma nueve seis y pe cero coma tres siete: no es distinto de cero.",
    "Ahora, una pregunta que el instructivo pone explícitamente: probar que un beta es igual a un valor que no es cero.",
    "Por ejemplo, ¿cada unidad de temperatura agrega exactamente dos minutos?",
    "La hipótesis nula sería beta dos igual a dos.",
    "Ojo con esto: el te de la salida de erre siempre compara con cero.",
    "Para comparar con dos hay que calcularlo a mano.",
    "Se le resta el dos a la estimación: dos coma cero cuatro nueve siete menos dos, dividido en el error estándar, cero coma cero cuatro ocho uno.",
    "Da uno coma cero tres.",
    "Uno coma cero tres es menor que dos coma tres seis cinco, y el pe valor es cero coma tres cuatro.",
    "No se rechaza.",
    "Los datos son compatibles con que cada unidad de temperatura agregue dos minutos de cocción.",
    "Ahora, qué significa cada número.",
    "Be uno, dos coma siete uno: por cada unidad adicional de ancho, el tiempo de cocción aumenta en promedio dos coma siete minutos, manteniendo constante la temperatura.",
    "Esa última frase es la clave de la regresión múltiple.",
    "Es el efecto del ancho con la temperatura fija.",
    "Dicho como derivada: la derivada parcial de ye gorro respecto de equis uno es be uno.",
    "En un modelo lineal es un número fijo, no depende de dónde estés.",
    "Cuando veamos polinomios, eso va a cambiar.",
    "Be dos, dos coma cero cinco: cada unidad más de temperatura agrega en promedio dos minutos, con el ancho fijo.",
    "¿Y el intercepto?",
    "Sería el tiempo con ancho cero y temperatura cero.",
    "Ningún horno tiene ancho cero, está fuera del rango de los datos, así que no tiene interpretación práctica.",
    "Solo ajusta la altura del plano.",
    "La prueba efe global se pregunta si el modelo, en conjunto, explica algo.",
    "La hipótesis nula es que todos los betas, salvo el intercepto, valen cero.",
    "Para entenderla hay que ver cómo se reparte la variabilidad.",
    "La variación total de los tiempos, la suma de cuadrados total, se divide en dos: lo que el modelo explica, la suma de cuadrados de la regresión, y lo que no explica, la del error.",
    "Aquí la total es diez mil novecientos cincuenta y seis, y casi todo es explicado: diez mil novecientos cincuenta y tres.",
    "El error es apenas tres.",
    "El efe divide lo explicado por cada variable, entre lo no explicado por cada grado de libertad: diez mil novecientos cincuenta y tres dividido en dos, sobre tres dividido en siete.",
    "Da más de doce mil seiscientos.",
    "El crítico con dos y siete grados de libertad es cuatro coma siete.",
    "Se rechaza: el modelo sirve, al menos una variable explica el tiempo de cocción.",
    "El erre cuadrado es lo explicado sobre el total: cero coma nueve nueve nueve siete.",
    "El modelo explica prácticamente el cien por ciento de la variabilidad.",
    "Y el erre cuadrado ajustado, cero coma nueve nueve nueve seis.",
    "¿Por qué existe?",
    "Porque el erre cuadrado sube siempre que agregas una variable, aunque sea basura.",
    "El ajustado multiplica por ene menos uno sobre ene menos ka menos uno, y así penaliza cada parámetro.",
    "Si al agregar una variable el ajustado baja, esa variable no se ganó su lugar.",
    "Aquí están casi iguales: los dos regresores aportan de verdad.",
    "Los supuestos se revisan con los residuos, porque los errores verdaderos no se observan.",
    "Linealidad y varianza constante: en el gráfico de residuos contra valores ajustados no debería haber forma.",
    "Ni curva, que indicaría que falta un término, ni embudo, que indicaría varianza creciente.",
    "Aquí se ve una nube sin patrón claro.",
    "Normalidad: en el gráfico cuantil cuantil los puntos deberían seguir la diagonal.",
    "Y la prueba de Shapiro Wilk, con hipótesis nula de normalidad, da pe igual a cero coma nueve cuatro.",
    "No se rechaza: no hay evidencia contra la normalidad.",
    "La independencia se mira con los residuos en el orden en que se hicieron los ensayos: sin rachas largas del mismo signo.",
    "Ahora, multicolinealidad.",
    "El ve i efe de cada variable mide cuánto se infla la varianza de su coeficiente por estar correlacionada con las demás.",
    "Es uno sobre uno menos el erre cuadrado de esa variable explicada por las otras.",
    "Aquí los dos valen ocho coma dos siete.",
    "Con dos variables eso corresponde a una correlación de cero coma nueve cuatro entre ancho y temperatura: los hornos más anchos se usaron a más temperatura.",
    "Entre cinco y diez es multicolinealidad moderada: no arruina el modelo, porque los te igual salieron enormes, pero hay que decirlo.",
    "El apalancamiento mide qué tan lejos está un ensayo del resto en las equis.",
    "El corte es dos por ka más uno sobre ene: dos por tres, dividido en diez, cero coma seis.",
    "El ensayo ocho tiene cero coma seis cero ocho, apenas sobre el corte.",
    "La distancia de Cook mide cuánto cambiarían los coeficientes si sacáramos ese dato.",
    "Se considera influyente si pasa de uno.",
    "El ensayo diez tiene uno coma siete dos: es influyente.",
    "Si se saca, be uno baja de dos coma siete uno a dos coma cinco cinco.",
    "¿Se elimina?",
    "No automáticamente.",
    "Primero se revisa si fue un error de registro.",
    "Si el dato es real, se informa.",
    "Resumiendo el camino: escribir el modelo ajustado, interpretar cada coeficiente con las demás variables fijas, probar cada beta con te, estadístico, decisión y contexto, la efe global, el erre cuadrado y el ajustado, los supuestos con residuos y Shapiro, y por último ve i efe, apalancamiento y Cook.",
    "Ese orden te sirve para cualquier pregunta de regresión de la prueba."
  ]
});
