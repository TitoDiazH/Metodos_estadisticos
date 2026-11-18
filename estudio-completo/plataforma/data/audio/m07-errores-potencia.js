/* GENERADO por tools/generar_audio.py desde tools/guiones/m07-errores-potencia.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m07-errores-potencia",
  "modulo": "m07-errores-potencia",
  "titulo": "Errores tipo I/II y potencia",
  "archivo": "audio/m07-errores-potencia.mp3",
  "duracion": 294,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Dos formas de equivocarse"
    },
    {
      "t": 87.4,
      "titulo": "De qué depende beta"
    },
    {
      "t": 130.5,
      "titulo": "El ejercicio típico"
    },
    {
      "t": 268.1,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "idea": 6.07,
    "idea-q": 10.07,
    "idea-r": 17.88,
    "tabla": 23.1,
    "t1": 25.44,
    "t2": 32.11,
    "pot": 39.91,
    "balance": 45.83,
    "balance-r": 47.89,
    "balance-c": 55.85,
    "pauta": 58.7,
    "pauta-1": 62.12,
    "pauta-1r": 69.18,
    "pauta-2": 76.87,
    "pauta-2r": 81.77,
    "beta": 87.44,
    "beta-q": 90.03,
    "beta-r": 98.33,
    "beta-lejos": 105.95,
    "dep": 113.01,
    "dep-n": 115.21,
    "dep-a": 118.26,
    "dep-d": 120.63,
    "dep-s": 125.49,
    "ej": 130.52,
    "ej-1": 133.51,
    "ej-2": 138.14,
    "ej-d": 146.63,
    "ej-h": 154.82,
    "lim": 159.97,
    "lim-se": 162.12,
    "lim-f": 168.19,
    "lim-r": 173.08,
    "lim-ojo": 180.63,
    "b": 186.87,
    "b-f": 193.46,
    "b-mu": 197.93,
    "b-r": 202.75,
    "b-lee": 204.81,
    "b-q": 210.68,
    "b-qr": 218.08,
    "b-dif": 223.6,
    "var": 232.62,
    "var-ej": 235.21,
    "var-b": 244.45,
    "var-r": 249.86,
    "r": 252.92,
    "r-resta": 257.46,
    "c": 268.09,
    "c1": 268.8,
    "c2": 273.71,
    "c3": 279.63,
    "c4": 286.11,
    "fin": 291.7
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo siete: los errores tipo uno y tipo dos, y la potencia de una prueba."
    ],
    [
      6.07,
      "Cuando decidimos con datos, podemos equivocarnos de dos maneras."
    ],
    [
      10.07,
      "Piensa en una alarma de incendio."
    ],
    [
      12.13,
      "¿Cuáles son los dos errores posibles?"
    ],
    [
      17.88,
      "Que suene sin que haya fuego, una falsa alarma."
    ],
    [
      20.79,
      "O que haya fuego y no suene."
    ],
    [
      23.1,
      "En una prueba de hipótesis es igual."
    ],
    [
      25.44,
      "El error tipo uno es rechazar H₀ cuando es verdadera: la falsa alarma."
    ],
    [
      30.24,
      "Su probabilidad es α."
    ],
    [
      32.11,
      "El error tipo dos es no rechazar H₀ cuando es falsa: no detectar algo que sí existe."
    ],
    [
      37.74,
      "Su probabilidad se llama β."
    ],
    [
      39.91,
      "Y la potencia es 1 − β: la probabilidad de detectar un efecto que de verdad está."
    ],
    [
      45.83,
      "Hay un equilibrio entre los dos."
    ],
    [
      47.89,
      "Si bajas α para tener menos falsas alarmas, la prueba se vuelve más exigente, y aumenta β: se escapan más efectos reales."
    ],
    [
      55.85,
      "Cuál importa más depende del contexto."
    ],
    [
      58.7,
      "En la prueba uno aparecieron dos afirmaciones sobre esto."
    ],
    [
      62.12,
      "La primera: con α = 0,01, a mayor tamaño de muestra, menor probabilidad de error tipo uno."
    ],
    [
      69.18,
      "Falso: la probabilidad de error tipo uno es α, 0,01, sin importar n."
    ],
    [
      74.75,
      "Lo que baja con más datos es β."
    ],
    [
      76.87,
      "La segunda: si no rechazo H₀, puedo estar seguro de que es verdadera."
    ],
    [
      81.77,
      "También falso: puedo estar cometiendo un error tipo dos."
    ],
    [
      87.44,
      "Para calcular β hay un detalle clave."
    ],
    [
      90.03,
      "H₁ dice, por ejemplo, que la media no es uno."
    ],
    [
      93.17,
      "Pero, ¿cuál es entonces?"
    ],
    [
      98.33,
      "Hay que fijar un valor verdadero concreto, por ejemplo 1,005."
    ],
    [
      103.15,
      "Sin ese valor, β no se puede calcular."
    ],
    [
      105.95,
      "Y mientras más lejos esté el valor verdadero del de H₀, más fácil es detectarlo, y más chico es β."
    ],
    [
      113.01,
      "β depende de cuatro cosas."
    ],
    [
      115.21,
      "Del tamaño de muestra: más datos, menor β."
    ],
    [
      118.26,
      "De α: si α baja, β sube."
    ],
    [
      120.63,
      "De la diferencia real con el valor de H₀: más diferencia, menor β."
    ],
    [
      125.49,
      "Y de la variabilidad: más dispersión, mayor β."
    ],
    [
      130.52,
      "El ejercicio típico de prueba tiene dos partes."
    ],
    [
      133.51,
      "Primero: ¿para qué valores de la media muestral se rechaza H₀?"
    ],
    [
      138.14,
      "Y segundo: si el parámetro verdadero fuera tal valor, ¿cuál es la probabilidad de no rechazar?"
    ],
    [
      143.81,
      "Esa segunda probabilidad es β."
    ],
    [
      146.63,
      "El de la ayudantía dos: una máquina que llena bolsas de un kilo, con desviación conocida de 0,02 kilos, y 20 bolsas."
    ],
    [
      154.82,
      "H₀: la media es uno."
    ],
    [
      157.13,
      "Bilateral, con α 5 %."
    ],
    [
      159.97,
      "Primera parte, los límites."
    ],
    [
      162.12,
      "El error estándar es 0,02 sobre raíz de 20, 0,0045."
    ],
    [
      168.19,
      "Los límites son uno, más y −1,96 por ese error estándar."
    ],
    [
      173.08,
      "Se rechaza si la media muestral es menor que 0,9912, o mayor que 1,0088."
    ],
    [
      180.63,
      "Ojo con algo: estos límites se calculan siempre con el valor de H₀, con la media uno."
    ],
    [
      186.87,
      "Segunda parte."
    ],
    [
      188.11,
      "Si la media verdadera fuera 1,005, ¿qué tan probable es no rechazar?"
    ],
    [
      193.46,
      "Es la probabilidad de que la media muestral caiga entre los dos límites, pero ahora calculada con una normal centrada en 1,005."
    ],
    [
      202.75,
      "Da cerca de 0,80."
    ],
    [
      204.81,
      "O sea, ocho de cada diez veces, la prueba no detectaría que la máquina está llenando de más."
    ],
    [
      210.68,
      "Es un β muy alto."
    ],
    [
      212.35,
      "¿Qué se podría hacer para bajarlo?"
    ],
    [
      218.08,
      "Tomar más bolsas."
    ],
    [
      219.65,
      "Con 80 en vez de 20, β baja a 0,39."
    ],
    [
      223.6,
      "Y lo mismo pasaría si la diferencia real fuera más grande: con una media verdadera de 1,01, también baja a 0,39."
    ],
    [
      232.62,
      "La misma lógica sirve para varianzas."
    ],
    [
      235.21,
      "En la ayudantía, con diez datos y H₀, varianza cuatro, se rechaza si la varianza muestral es menor a 1,2 o mayor a 8,46."
    ],
    [
      244.45,
      "Si la varianza real fuera cinco, la probabilidad de no rechazar es 0,90."
    ],
    [
      249.86,
      "La prueba casi no detecta esa diferencia."
    ],
    [
      252.92,
      "En R, los límites salen con qnorm o qchisq, y β con pnorm o pchisq."
    ],
    [
      257.46,
      "Y como β es la probabilidad de caer entre dos límites, se calcula como la acumulada en el límite de arriba menos la acumulada en el de abajo."
    ],
    [
      268.09,
      "En resumen: el error tipo uno es rechazar una H₀ verdadera, con probabilidad α."
    ],
    [
      273.71,
      "El tipo dos es no rechazar una falsa, con probabilidad β, y la potencia es 1 − β."
    ],
    [
      279.63,
      "β baja con más datos, con un α mayor, con una diferencia real más grande y con menos variabilidad."
    ],
    [
      286.11,
      "Y para calcularlo: límites con H₀, probabilidad con el valor verdadero."
    ],
    [
      291.7,
      "Eso fue el módulo siete."
    ]
  ],
  "huella": "c508561bff69",
  "frasesHabladas": [
    "Ahora toca el módulo siete: los errores tipo uno y tipo dos, y la potencia de una prueba.",
    "Cuando decidimos con datos, podemos equivocarnos de dos maneras.",
    "Piensa en una alarma de incendio.",
    "¿Cuáles son los dos errores posibles?",
    "Que suene sin que haya fuego, una falsa alarma.",
    "O que haya fuego y no suene.",
    "En una prueba de hipótesis es igual.",
    "El error tipo uno es rechazar hache cero cuando es verdadera: la falsa alarma.",
    "Su probabilidad es alfa.",
    "El error tipo dos es no rechazar hache cero cuando es falsa: no detectar algo que sí existe.",
    "Su probabilidad se llama beta.",
    "Y la potencia es uno menos beta: la probabilidad de detectar un efecto que de verdad está.",
    "Hay un equilibrio entre los dos.",
    "Si bajas alfa para tener menos falsas alarmas, la prueba se vuelve más exigente, y aumenta beta: se escapan más efectos reales.",
    "Cuál importa más depende del contexto.",
    "En la prueba uno aparecieron dos afirmaciones sobre esto.",
    "La primera: con alfa igual a cero coma cero uno, a mayor tamaño de muestra, menor probabilidad de error tipo uno.",
    "Falso: la probabilidad de error tipo uno es alfa, cero coma cero uno, sin importar ene.",
    "Lo que baja con más datos es beta.",
    "La segunda: si no rechazo hache cero, puedo estar seguro de que es verdadera.",
    "También falso: puedo estar cometiendo un error tipo dos.",
    "Para calcular beta hay un detalle clave.",
    "Hache uno dice, por ejemplo, que la media no es uno.",
    "Pero, ¿cuál es entonces?",
    "Hay que fijar un valor verdadero concreto, por ejemplo uno coma cero cero cinco.",
    "Sin ese valor, beta no se puede calcular.",
    "Y mientras más lejos esté el valor verdadero del de hache cero, más fácil es detectarlo, y más chico es beta.",
    "Beta depende de cuatro cosas.",
    "Del tamaño de muestra: más datos, menor beta.",
    "De alfa: si alfa baja, beta sube.",
    "De la diferencia real con el valor de hache cero: más diferencia, menor beta.",
    "Y de la variabilidad: más dispersión, mayor beta.",
    "El ejercicio típico de prueba tiene dos partes.",
    "Primero: ¿para qué valores de la media muestral se rechaza hache cero?",
    "Y segundo: si el parámetro verdadero fuera tal valor, ¿cuál es la probabilidad de no rechazar?",
    "Esa segunda probabilidad es beta.",
    "El de la ayudantía dos: una máquina que llena bolsas de un kilo, con desviación conocida de cero coma cero dos kilos, y veinte bolsas.",
    "Hache cero: la media es uno.",
    "Bilateral, con alfa cinco por ciento.",
    "Primera parte, los límites.",
    "El error estándar es cero coma cero dos sobre raíz de veinte, cero coma cero cero cuatro cinco.",
    "Los límites son uno, más y menos uno coma noventa y seis por ese error estándar.",
    "Se rechaza si la media muestral es menor que cero coma nueve nueve uno dos, o mayor que uno coma cero cero ocho ocho.",
    "Ojo con algo: estos límites se calculan siempre con el valor de hache cero, con la media uno.",
    "Segunda parte.",
    "Si la media verdadera fuera uno coma cero cero cinco, ¿qué tan probable es no rechazar?",
    "Es la probabilidad de que la media muestral caiga entre los dos límites, pero ahora calculada con una normal centrada en uno coma cero cero cinco.",
    "Da cerca de cero coma ochenta.",
    "O sea, ocho de cada diez veces, la prueba no detectaría que la máquina está llenando de más.",
    "Es un beta muy alto.",
    "¿Qué se podría hacer para bajarlo?",
    "Tomar más bolsas.",
    "Con ochenta en vez de veinte, beta baja a cero coma treinta y nueve.",
    "Y lo mismo pasaría si la diferencia real fuera más grande: con una media verdadera de uno coma cero uno, también baja a cero coma treinta y nueve.",
    "La misma lógica sirve para varianzas.",
    "En la ayudantía, con diez datos y hache cero, varianza cuatro, se rechaza si la varianza muestral es menor a uno coma dos o mayor a ocho coma cuatro seis.",
    "Si la varianza real fuera cinco, la probabilidad de no rechazar es cero coma noventa.",
    "La prueba casi no detecta esa diferencia.",
    "En erre, los límites salen con qnorm o qchisq, y beta con pnorm o pchisq.",
    "Y como beta es la probabilidad de caer entre dos límites, se calcula como la acumulada en el límite de arriba menos la acumulada en el de abajo.",
    "En resumen: el error tipo uno es rechazar una hache cero verdadera, con probabilidad alfa.",
    "El tipo dos es no rechazar una falsa, con probabilidad beta, y la potencia es uno menos beta.",
    "Beta baja con más datos, con un alfa mayor, con una diferencia real más grande y con menos variabilidad.",
    "Y para calcularlo: límites con hache cero, probabilidad con el valor verdadero.",
    "Eso fue el módulo siete."
  ]
});
