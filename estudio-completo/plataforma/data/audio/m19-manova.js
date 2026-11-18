/* GENERADO por tools/generar_audio.py desde tools/guiones/m19-manova.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m19-manova",
  "modulo": "m19-manova",
  "titulo": "MANOVA",
  "archivo": "audio/m19-manova.mp3",
  "duracion": 573,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Por qué no basta con varios ANOVA"
    },
    {
      "t": 99.7,
      "titulo": "Hipótesis y supuestos"
    },
    {
      "t": 152.8,
      "titulo": "De las sumas de cuadrados a las matrices"
    },
    {
      "t": 253.5,
      "titulo": "El ejemplo en erre"
    },
    {
      "t": 324.0,
      "titulo": "Revisar los supuestos"
    },
    {
      "t": 397.8,
      "titulo": "Su relación con el discriminante"
    },
    {
      "t": 461.2,
      "titulo": "Qué hacer después de rechazar"
    },
    {
      "t": 526.0,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "caso": 5.44,
    "tres": 19.42,
    "tentacion": 24.95,
    "prob1": 43.31,
    "prob2": 59.68,
    "solucion": 73.97,
    "potencia": 82.11,
    "vector": 91.93,
    "hip": 99.72,
    "h0": 108.62,
    "h1": 113.65,
    "sup": 122.2,
    "sup1": 126.82,
    "sup2": 130.91,
    "sup3": 134.44,
    "matriz": 137.42,
    "wb": 152.76,
    "w": 168.84,
    "b": 176.55,
    "t": 182.24,
    "lambda": 185.07,
    "lambda-f": 191.53,
    "exp": 200.69,
    "exp-uno": 216.62,
    "exp-cero": 220.86,
    "rechazo": 225.8,
    "otros": 236.3,
    "r": 253.46,
    "r-cbind": 258.7,
    "r-summary": 265.47,
    "r-lambda": 269.14,
    "r-f": 279.56,
    "gl": 284.34,
    "gl-r": 298.39,
    "r-p": 302.54,
    "r-conc": 307.2,
    "gl-error": 313.42,
    "rev": 323.98,
    "mardia": 327.72,
    "box": 334.22,
    "box-gl": 341.4,
    "box-gl-n": 348.11,
    "box-sig": 354.51,
    "robusto": 371.83,
    "pillai": 383.77,
    "transf": 391.01,
    "lda": 397.81,
    "lda-preg": 407.13,
    "lda-vp": 415.53,
    "roy": 425.02,
    "lh": 433.17,
    "iris-vp": 436.3,
    "secuencia": 449.86,
    "post": 461.22,
    "post-aov": 473.23,
    "tukey": 489.25,
    "iris": 503.35,
    "cierre": 526.01,
    "c1": 530.34,
    "c2": 538.41,
    "c3": 542.9,
    "c4": 546.33,
    "ultima": 553.58,
    "ultima-r": 563.0,
    "fin": 570.67
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo 19: MANOVA, el análisis de varianza multivariado."
    ],
    [
      5.44,
      "Partamos con una situación concreta."
    ],
    [
      7.72,
      "30 estudiantes, repartidos al azar en tres metodologías de enseñanza: la tradicional, el aprendizaje basado en problemas y el aprendizaje basado en proyectos."
    ],
    [
      17.98,
      "Diez en cada grupo."
    ],
    [
      19.42,
      "Y a cada estudiante no le medimos una nota, sino tres: química, física y biología."
    ],
    [
      24.95,
      "Si tuviéramos una sola nota, esto sería un ANOVA de un factor, como el del módulo 18."
    ],
    [
      30.62,
      "Pero tenemos tres."
    ],
    [
      32.21,
      "Entonces la tentación es obvia: hago tres ANOVA, uno por asignatura, y listo."
    ],
    [
      37.17,
      "¿Qué tendría de malo eso?"
    ],
    [
      43.31,
      "Hay dos problemas."
    ],
    [
      44.77,
      "El primero es que cada prueba trae su propio riesgo de equivocarme, de rechazar cuando no debía."
    ],
    [
      50.56,
      "Si hago tres, ese riesgo se va acumulando, y el error tipo uno global termina siendo bastante más alto que el 5 % que creía tener."
    ],
    [
      59.68,
      "El segundo es más sutil."
    ],
    [
      61.42,
      "Las tres notas no son independientes entre sí: a un estudiante al que le va bien en química probablemente también le va bien en física."
    ],
    [
      69.5,
      "Al mirarlas una por una, esa correlación se pierde por completo."
    ],
    [
      73.97,
      "El MANOVA resuelve las dos cosas de una vez."
    ],
    [
      76.74,
      "Hace una sola prueba, con todas las variables juntas, así que controla el error global."
    ],
    [
      82.11,
      "Y como aprovecha la estructura de covarianzas, puede detectar diferencias que ningún ANOVA por separado alcanza a ver."
    ],
    [
      89.35,
      "Por eso se dice que gana potencia."
    ],
    [
      91.93,
      "Dicho de otra forma: el MANOVA es un ANOVA donde la respuesta ya no es un número, sino un vector."
    ],
    [
      99.72,
      "¿Qué estamos contrastando, entonces?"
    ],
    [
      102.35,
      "Cada grupo tiene su vector de medias: una media para química, otra para física y otra para biología."
    ],
    [
      108.62,
      "La hipótesis nula dice que esos vectores son iguales en las tres metodologías."
    ],
    [
      113.65,
      "La alternativa, que al menos uno es distinto."
    ],
    [
      117.18,
      "Fíjate que no comparo tres medias sueltas, sino tres vectores completos."
    ],
    [
      122.2,
      "Los supuestos te van a sonar si te acuerdas del análisis discriminante lineal."
    ],
    [
      126.82,
      "Dentro de cada grupo, los datos siguen una normal multivariada."
    ],
    [
      130.91,
      "Todos los grupos comparten la misma matriz de covarianzas."
    ],
    [
      134.44,
      "Y las observaciones son independientes."
    ],
    [
      137.42,
      "Ese detalle de la matriz es fácil de olvidar, así que vale la pena insistir: la homogeneidad que se pide es de la matriz de covarianzas completa, incluidas las covarianzas entre variables, no solo las varianzas de cada una."
    ],
    [
      152.76,
      "En el ANOVA de un factor, la variabilidad total se partía en dos: la de dentro de los grupos, que es el error, y la de entre grupos, que es el tratamiento."
    ],
    [
      161.9,
      "El MANOVA hace exactamente lo mismo, pero como hay varias variables, en vez de números aparecen matrices."
    ],
    [
      168.84,
      "La matriz doble u reúne las sumas de cuadrados y productos dentro de los grupos."
    ],
    [
      173.77,
      "Es la pariente de la suma de cuadrados del error."
    ],
    [
      176.55,
      "La matriz b hace lo mismo entre grupos, y es la pariente de la suma de cuadrados de tratamientos."
    ],
    [
      182.24,
      "Sumadas, dan la matriz total, te."
    ],
    [
      185.07,
      "Ahora, ¿cómo resumo dos matrices en un solo número para poder decidir?"
    ],
    [
      189.46,
      "Ahí entra la λ de Wilks."
    ],
    [
      191.53,
      "Se calcula como el determinante de doble u dividido por el determinante de la matriz total, o sea, de doble u más b."
    ],
    [
      198.73,
      "Dentro sobre total."
    ],
    [
      200.69,
      "Hagamos un pequeño experimento mental."
    ],
    [
      203.29,
      "Imagina que las tres metodologías dan resultados casi idénticos."
    ],
    [
      207.39,
      "La matriz b sería prácticamente cero."
    ],
    [
      209.95,
      "¿Cuánto valdría λ en ese caso?"
    ],
    [
      216.62,
      "Casi uno, porque el total sería prácticamente igual a lo de dentro."
    ],
    [
      220.86,
      "Y al revés: si los grupos están muy separados, b crece y λ se acerca a cero."
    ],
    [
      225.8,
      "Por eso aquí la lógica va al contrario de lo que uno espera: la hipótesis nula se rechaza cuando λ es pequeña."
    ],
    [
      232.66,
      "Una λ chica significa grupos bien separados."
    ],
    [
      236.3,
      "Además de Wilks, hay otros tres estadísticos que vas a ver en las salidas: la traza de Pillai, la traza de Lawley Hotelling y la raíz mayor de Roy."
    ],
    [
      245.11,
      "Todos salen de los valores propios de la matriz doble u inversa por b; solo cambia la forma de resumirlos."
    ],
    [
      253.46,
      "Volvamos a las metodologías."
    ],
    [
      255.62,
      "En R, el modelo se ajusta con la función manova."
    ],
    [
      258.7,
      "A la izquierda de la fórmula van las tres respuestas, unidas con c bind, y a la derecha va la metodología."
    ],
    [
      265.47,
      "Después se pide summary, con test igual a Wilks."
    ],
    [
      269.14,
      "La λ da 0,049."
    ],
    [
      271.78,
      "Una forma de leerla es que apenas un 5 % de la variabilidad multivariada queda sin explicar por la metodología."
    ],
    [
      279.56,
      "R la transforma en un F aproximado, que da 29,3."
    ],
    [
      284.34,
      "¿Y los grados de libertad del numerador?"
    ],
    [
      286.77,
      "Son el número de variables por el número de grupos −1."
    ],
    [
      290.52,
      "Con tres asignaturas y tres metodologías, ¿cuánto da?"
    ],
    [
      298.39,
      "Seis: 3 · 2."
    ],
    [
      300.43,
      "El denominador tiene 50."
    ],
    [
      302.54,
      "Y el valor p es del orden de diez elevado a −15, prácticamente cero."
    ],
    [
      307.2,
      "Conclusión: la metodología sí afecta el rendimiento conjunto en química, física y biología."
    ],
    [
      313.42,
      "Un error típico es poner solo ge −1, o sea dos, como si fuera un ANOVA común."
    ],
    [
      318.53,
      "Hay que acordarse de multiplicar por el número de variables."
    ],
    [
      323.98,
      "Antes de creerle al MANOVA, conviene revisar los supuestos."
    ],
    [
      327.72,
      "La normalidad multivariada se revisa con el test de Mardia, o con un gráfico cu cu de distancias de Mahalanobis."
    ],
    [
      334.22,
      "Y la homogeneidad de las matrices de covarianza, con el test eme de Box, el mismo que usamos en el discriminante."
    ],
    [
      341.4,
      "Los grados de libertad del eme de Box salen de p · p + 1 / 2, y todo eso por ge −1."
    ],
    [
      348.11,
      "Con tres variables y tres grupos: 3 · 4, partido en dos, da seis; y 6 · 2, 12."
    ],
    [
      354.51,
      "En el ejemplo de las metodologías, el eme de Box sale significativo."
    ],
    [
      358.71,
      "O sea, las matrices de covarianza no son iguales."
    ],
    [
      361.86,
      "Y aquí aparece una duda que se presta para confusión: ¿eso significa que el MANOVA ya no sirve?"
    ],
    [
      371.83,
      "No necesariamente."
    ],
    [
      373.47,
      "Cuando los grupos tienen el mismo tamaño, como aquí, diez, diez y diez, el MANOVA es bastante robusto a esa violación."
    ],
    [
      380.66,
      "Se interpreta con cautela, pero se interpreta."
    ],
    [
      383.77,
      "Además, si la homogeneidad falla, el estadístico que conviene mirar es Pillai, que es el más robusto de los cuatro."
    ],
    [
      391.01,
      "Y si lo que falla es la normalidad, la salida es pensar en transformar los datos."
    ],
    [
      397.81,
      "Hay algo bonito en este tema: el MANOVA y el análisis discriminante son dos caras del mismo problema."
    ],
    [
      403.74,
      "Los dos trabajan con las matrices doble u y b."
    ],
    [
      407.13,
      "La diferencia está en la pregunta."
    ],
    [
      409.16,
      "El MANOVA pregunta si los grupos difieren."
    ],
    [
      411.75,
      "El discriminante pregunta cómo se separan, en qué dirección."
    ],
    [
      415.53,
      "De hecho, las funciones discriminantes son los vectores propios de doble u inversa por b, y sus valores propios dicen cuánta separación aporta cada una."
    ],
    [
      425.02,
      "Esto, de paso, aclara los otros estadísticos."
    ],
    [
      427.89,
      "La raíz mayor de Roy es simplemente el valor propio más grande de esa matriz, solo ese."
    ],
    [
      433.17,
      "Y la traza de Lawley Hotelling es la suma de todos."
    ],
    [
      436.3,
      "En las flores iris, por ejemplo, los valores propios son 32,19 coma 29."
    ],
    [
      443.07,
      "Así que Roy vale 32,19, y Lawley Hotelling, 32,48."
    ],
    [
      449.86,
      "El orden natural de trabajo es primero el MANOVA y, si los grupos difieren, después el discriminante, para entender qué combinación de variables los separa."
    ],
    [
      461.22,
      "Supongamos que el MANOVA rechazó."
    ],
    [
      463.49,
      "Bien: sé que los grupos difieren, pero todavía no sé en qué variable ni entre qué grupos."
    ],
    [
      468.83,
      "El MANOVA no lo dice."
    ],
    [
      470.43,
      "Para eso está el análisis post hoc."
    ],
    [
      473.23,
      "En R, summary punto aov, aplicado al modelo, entrega un ANOVA para cada variable."
    ],
    [
      478.64,
      "En las metodologías salen significativas las tres asignaturas: química con un F cercano a 180, física con unos 33, y biología con unos 21."
    ],
    [
      489.25,
      "Y si después aplico Tukey sobre química, las tres comparaciones entre metodologías salen significativas: la de proyectos tiene la media más alta, unos 81, y la tradicional la más baja, alrededor de 62."
    ],
    [
      503.35,
      "El otro ejemplo de la clase es iris: 150 flores, tres especies y cuatro medidas."
    ],
    [
      509.18,
      "Ahí la λ de Wilks da 0,023, el F aproximado anda cerca de 200, con ocho y 288 grados de libertad, y el valor p es prácticamente cero."
    ],
    [
      520.66,
      "Las especies difieren muchísimo en su vector de medias."
    ],
    [
      526.01,
      "Si tuviera que quedarme con pocas ideas de este módulo, serían estas."
    ],
    [
      530.34,
      "El MANOVA compara vectores de medias con una sola prueba, en lugar de varios ANOVA que inflan el error y desperdician la correlación."
    ],
    [
      538.41,
      "La λ de Wilks es dentro sobre total, y se rechaza cuando es pequeña."
    ],
    [
      542.9,
      "Los grados de libertad del numerador son p por ge −1."
    ],
    [
      546.33,
      "Mardia revisa la normalidad, eme de Box revisa las covarianzas, y si Box falla, Pillai es el más confiable."
    ],
    [
      553.58,
      "Y una última para que la pienses tú: si el MANOVA te dice que los grupos difieren, ¿qué haces después?"
    ],
    [
      563.0,
      "Un ANOVA por variable y, si hace falta, Tukey."
    ],
    [
      565.93,
      "Y si quieres ver en qué dirección se separan los grupos, el discriminante."
    ],
    [
      570.67,
      "Eso fue el módulo 19."
    ]
  ],
  "huella": "4672035e4a82",
  "frasesHabladas": [
    "Ahora toca el módulo diecinueve: MANOVA, el análisis de varianza multivariado.",
    "Partamos con una situación concreta.",
    "Treinta estudiantes, repartidos al azar en tres metodologías de enseñanza: la tradicional, el aprendizaje basado en problemas y el aprendizaje basado en proyectos.",
    "Diez en cada grupo.",
    "Y a cada estudiante no le medimos una nota, sino tres: química, física y biología.",
    "Si tuviéramos una sola nota, esto sería un ANOVA de un factor, como el del módulo dieciocho.",
    "Pero tenemos tres.",
    "Entonces la tentación es obvia: hago tres ANOVA, uno por asignatura, y listo.",
    "¿Qué tendría de malo eso?",
    "Hay dos problemas.",
    "El primero es que cada prueba trae su propio riesgo de equivocarme, de rechazar cuando no debía.",
    "Si hago tres, ese riesgo se va acumulando, y el error tipo uno global termina siendo bastante más alto que el cinco por ciento que creía tener.",
    "El segundo es más sutil.",
    "Las tres notas no son independientes entre sí: a un estudiante al que le va bien en química probablemente también le va bien en física.",
    "Al mirarlas una por una, esa correlación se pierde por completo.",
    "El MANOVA resuelve las dos cosas de una vez.",
    "Hace una sola prueba, con todas las variables juntas, así que controla el error global.",
    "Y como aprovecha la estructura de covarianzas, puede detectar diferencias que ningún ANOVA por separado alcanza a ver.",
    "Por eso se dice que gana potencia.",
    "Dicho de otra forma: el MANOVA es un ANOVA donde la respuesta ya no es un número, sino un vector.",
    "¿Qué estamos contrastando, entonces?",
    "Cada grupo tiene su vector de medias: una media para química, otra para física y otra para biología.",
    "La hipótesis nula dice que esos vectores son iguales en las tres metodologías.",
    "La alternativa, que al menos uno es distinto.",
    "Fíjate que no comparo tres medias sueltas, sino tres vectores completos.",
    "Los supuestos te van a sonar si te acuerdas del análisis discriminante lineal.",
    "Dentro de cada grupo, los datos siguen una normal multivariada.",
    "Todos los grupos comparten la misma matriz de covarianzas.",
    "Y las observaciones son independientes.",
    "Ese detalle de la matriz es fácil de olvidar, así que vale la pena insistir: la homogeneidad que se pide es de la matriz de covarianzas completa, incluidas las covarianzas entre variables, no solo las varianzas de cada una.",
    "En el ANOVA de un factor, la variabilidad total se partía en dos: la de dentro de los grupos, que es el error, y la de entre grupos, que es el tratamiento.",
    "El MANOVA hace exactamente lo mismo, pero como hay varias variables, en vez de números aparecen matrices.",
    "La matriz doble u reúne las sumas de cuadrados y productos dentro de los grupos.",
    "Es la pariente de la suma de cuadrados del error.",
    "La matriz be hace lo mismo entre grupos, y es la pariente de la suma de cuadrados de tratamientos.",
    "Sumadas, dan la matriz total, te.",
    "Ahora, ¿cómo resumo dos matrices en un solo número para poder decidir?",
    "Ahí entra la lambda de Wilks.",
    "Se calcula como el determinante de doble u dividido por el determinante de la matriz total, o sea, de doble u más be.",
    "Dentro sobre total.",
    "Hagamos un pequeño experimento mental.",
    "Imagina que las tres metodologías dan resultados casi idénticos.",
    "La matriz be sería prácticamente cero.",
    "¿Cuánto valdría lambda en ese caso?",
    "Casi uno, porque el total sería prácticamente igual a lo de dentro.",
    "Y al revés: si los grupos están muy separados, be crece y lambda se acerca a cero.",
    "Por eso aquí la lógica va al contrario de lo que uno espera: la hipótesis nula se rechaza cuando lambda es pequeña.",
    "Una lambda chica significa grupos bien separados.",
    "Además de Wilks, hay otros tres estadísticos que vas a ver en las salidas: la traza de Pillai, la traza de Lawley Hotelling y la raíz mayor de Roy.",
    "Todos salen de los valores propios de la matriz doble u inversa por be; solo cambia la forma de resumirlos.",
    "Volvamos a las metodologías.",
    "En erre, el modelo se ajusta con la función manova.",
    "A la izquierda de la fórmula van las tres respuestas, unidas con ce bind, y a la derecha va la metodología.",
    "Después se pide summary, con test igual a Wilks.",
    "La lambda da cero coma cero cuarenta y nueve.",
    "Una forma de leerla es que apenas un cinco por ciento de la variabilidad multivariada queda sin explicar por la metodología.",
    "Erre la transforma en un efe aproximado, que da veintinueve coma tres.",
    "¿Y los grados de libertad del numerador?",
    "Son el número de variables por el número de grupos menos uno.",
    "Con tres asignaturas y tres metodologías, ¿cuánto da?",
    "Seis: tres por dos.",
    "El denominador tiene cincuenta.",
    "Y el pe valor es del orden de diez elevado a menos quince, prácticamente cero.",
    "Conclusión: la metodología sí afecta el rendimiento conjunto en química, física y biología.",
    "Un error típico es poner solo ge menos uno, o sea dos, como si fuera un ANOVA común.",
    "Hay que acordarse de multiplicar por el número de variables.",
    "Antes de creerle al MANOVA, conviene revisar los supuestos.",
    "La normalidad multivariada se revisa con el test de Mardia, o con un gráfico cu cu de distancias de Mahalanobis.",
    "Y la homogeneidad de las matrices de covarianza, con el test eme de Box, el mismo que usamos en el discriminante.",
    "Los grados de libertad del eme de Box salen de pe por pe más uno, dividido por dos, y todo eso por ge menos uno.",
    "Con tres variables y tres grupos: tres por cuatro, partido en dos, da seis; y seis por dos, doce.",
    "En el ejemplo de las metodologías, el eme de Box sale significativo.",
    "O sea, las matrices de covarianza no son iguales.",
    "Y aquí aparece una duda que se presta para confusión: ¿eso significa que el MANOVA ya no sirve?",
    "No necesariamente.",
    "Cuando los grupos tienen el mismo tamaño, como aquí, diez, diez y diez, el MANOVA es bastante robusto a esa violación.",
    "Se interpreta con cautela, pero se interpreta.",
    "Además, si la homogeneidad falla, el estadístico que conviene mirar es Pillai, que es el más robusto de los cuatro.",
    "Y si lo que falla es la normalidad, la salida es pensar en transformar los datos.",
    "Hay algo bonito en este tema: el MANOVA y el análisis discriminante son dos caras del mismo problema.",
    "Los dos trabajan con las matrices doble u y be.",
    "La diferencia está en la pregunta.",
    "El MANOVA pregunta si los grupos difieren.",
    "El discriminante pregunta cómo se separan, en qué dirección.",
    "De hecho, las funciones discriminantes son los vectores propios de doble u inversa por be, y sus valores propios dicen cuánta separación aporta cada una.",
    "Esto, de paso, aclara los otros estadísticos.",
    "La raíz mayor de Roy es simplemente el valor propio más grande de esa matriz, solo ese.",
    "Y la traza de Lawley Hotelling es la suma de todos.",
    "En las flores iris, por ejemplo, los valores propios son treinta y dos coma diecinueve y cero coma veintinueve.",
    "Así que Roy vale treinta y dos coma diecinueve, y Lawley Hotelling, treinta y dos coma cuarenta y ocho.",
    "El orden natural de trabajo es primero el MANOVA y, si los grupos difieren, después el discriminante, para entender qué combinación de variables los separa.",
    "Supongamos que el MANOVA rechazó.",
    "Bien: sé que los grupos difieren, pero todavía no sé en qué variable ni entre qué grupos.",
    "El MANOVA no lo dice.",
    "Para eso está el análisis post hoc.",
    "En erre, summary punto a o ve, aplicado al modelo, entrega un ANOVA para cada variable.",
    "En las metodologías salen significativas las tres asignaturas: química con un efe cercano a ciento ochenta, física con unos treinta y tres, y biología con unos veintiuno.",
    "Y si después aplico Tukey sobre química, las tres comparaciones entre metodologías salen significativas: la de proyectos tiene la media más alta, unos ochenta y uno, y la tradicional la más baja, alrededor de sesenta y dos.",
    "El otro ejemplo de la clase es iris: ciento cincuenta flores, tres especies y cuatro medidas.",
    "Ahí la lambda de Wilks da cero coma cero veintitrés, el efe aproximado anda cerca de doscientos, con ocho y doscientos ochenta y ocho grados de libertad, y el pe valor es prácticamente cero.",
    "Las especies difieren muchísimo en su vector de medias.",
    "Si tuviera que quedarme con pocas ideas de este módulo, serían estas.",
    "El MANOVA compara vectores de medias con una sola prueba, en lugar de varios ANOVA que inflan el error y desperdician la correlación.",
    "La lambda de Wilks es dentro sobre total, y se rechaza cuando es pequeña.",
    "Los grados de libertad del numerador son pe por ge menos uno.",
    "Mardia revisa la normalidad, eme de Box revisa las covarianzas, y si Box falla, Pillai es el más confiable.",
    "Y una última para que la pienses tú: si el MANOVA te dice que los grupos difieren, ¿qué haces después?",
    "Un ANOVA por variable y, si hace falta, Tukey.",
    "Y si quieres ver en qué dirección se separan los grupos, el discriminante.",
    "Eso fue el módulo diecinueve."
  ]
});
