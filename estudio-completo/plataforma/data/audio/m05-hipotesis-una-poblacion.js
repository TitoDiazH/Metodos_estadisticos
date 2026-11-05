/* GENERADO por tools/generar_audio.py desde tools/guiones/m05-hipotesis-una-poblacion.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m05-hipotesis-una-poblacion",
  "modulo": "m05-hipotesis-una-poblacion",
  "titulo": "Pruebas de hipótesis: marco general y una población",
  "archivo": "audio/m05-hipotesis-una-poblacion.mp3",
  "duracion": 401,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "La lógica de una prueba"
    },
    {
      "t": 122.7,
      "titulo": "La media con desviación desconocida"
    },
    {
      "t": 225.6,
      "titulo": "La media con desviación conocida"
    },
    {
      "t": 261.5,
      "titulo": "Una proporción"
    },
    {
      "t": 319.7,
      "titulo": "Una varianza"
    },
    {
      "t": 377.0,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "q": 5.91,
    "q-m": 10.81,
    "q-dud": 15.77,
    "h0": 22.69,
    "h0-ej": 28.41,
    "h1": 30.81,
    "pval": 36.78,
    "pval-ej": 45.17,
    "pval-lee": 48.15,
    "alfa": 54.9,
    "regla": 62.57,
    "regla-ej": 67.87,
    "alfa-def": 76.04,
    "norech": 84.82,
    "norech-r": 95.01,
    "n-alfa": 104.7,
    "n-alfa-r": 110.85,
    "t": 122.74,
    "t-f": 127.15,
    "t-gl": 134.03,
    "t-colas": 136.32,
    "t-ej": 143.02,
    "t-ej-h": 151.96,
    "t-ej-crit": 157.96,
    "t-ej-p": 162.88,
    "t-ej-r": 165.3,
    "r": 168.98,
    "r-alt": 174.45,
    "r-ej": 181.73,
    "r-ej-t": 186.26,
    "r-ej-p": 190.27,
    "r-ej-ic": 196.31,
    "r-uni": 205.22,
    "r-uni-r": 212.66,
    "r-uni-c": 217.54,
    "z": 225.63,
    "z-f": 232.54,
    "z-regla": 236.28,
    "z-ej": 240.96,
    "z-ej-c": 248.55,
    "z-r": 254.14,
    "prop": 261.46,
    "prop-f": 263.98,
    "prop-ojo": 271.02,
    "prop-req": 277.44,
    "prop-ej": 286.91,
    "prop-ej-p": 295.07,
    "prop-ej-z": 298.04,
    "prop-ej-r": 303.2,
    "prop-r": 306.94,
    "prop-r-x": 310.6,
    "var": 319.72,
    "var-f": 321.52,
    "var-ej": 332.13,
    "var-ej-q": 336.75,
    "var-ej-qr": 343.57,
    "var-ej-d": 348.88,
    "var-ej-x": 352.5,
    "var-ej-crit": 357.18,
    "var-ej-r": 359.66,
    "var-r": 366.27,
    "c": 376.98,
    "c1": 377.67,
    "c2": 383.92,
    "c3": 386.04,
    "c4": 389.73,
    "c5": 393.41,
    "fin": 398.8
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo cinco: las pruebas de hipótesis, y cómo se aplican a una población."
    ],
    [
      5.91,
      "El ejemplo de la clase es este: ¿la gente vive, en promedio, más de setenta años?"
    ],
    [
      10.81,
      "Se toma una muestra de cien personas, y la edad media es setenta y uno coma ocho."
    ],
    [
      15.77,
      "Es más que setenta, sí."
    ],
    [
      17.82,
      "Pero, ¿es suficientemente más, o podría ser solo suerte de la muestra?"
    ],
    [
      22.69,
      "Una prueba de hipótesis parte de una suposición, la hipótesis nula, hache cero."
    ],
    [
      27.46,
      "Es el statu quo: acá, que la media es setenta o menos."
    ],
    [
      30.81,
      "Y la alternativa, hache uno, es lo que queremos demostrar: que la media es mayor a setenta."
    ],
    [
      36.78,
      "Después se calcula el pe valor: la probabilidad de obtener un resultado tan extremo como el observado, o más, si hache cero fuera cierta."
    ],
    [
      45.17,
      "En el ejemplo da dos coma diecisiete por ciento."
    ],
    [
      48.15,
      "O sea, si la media real fuera setenta, ver una muestra con setenta y uno coma ocho sería bastante raro."
    ],
    [
      54.9,
      "Para decidir, se compara con alfa, el nivel de significancia, que se fija antes: típicamente uno, cinco o diez por ciento."
    ],
    [
      62.57,
      "La regla de la clase es: si el pe valor es menor o igual que alfa, se rechaza hache cero."
    ],
    [
      67.87,
      "Dos coma diecisiete es menor que cinco, así que se rechaza: hay evidencia de que la esperanza de vida supera los setenta años."
    ],
    [
      76.04,
      "Y alfa tiene un significado preciso: es la probabilidad de rechazar hache cero cuando en realidad es verdadera."
    ],
    [
      82.87,
      "El error tipo uno."
    ],
    [
      84.82,
      "Ahora, una pregunta que aparece en las pruebas."
    ],
    [
      87.76,
      "Si no rechazo hache cero, ¿quedó demostrado que es verdadera?"
    ],
    [
      95.01,
      "No."
    ],
    [
      95.69,
      "Solo quiere decir que los datos no dieron suficiente evidencia en su contra."
    ],
    [
      100.19,
      "Puede que hache cero sea falsa y la muestra no alcanzó a mostrarlo."
    ],
    [
      104.7,
      "Y otra afirmación típica: al aumentar el tamaño de muestra, baja la probabilidad de error tipo uno."
    ],
    [
      110.85,
      "Falso."
    ],
    [
      112.6,
      "Esa probabilidad es alfa, y la fija quien hace la prueba."
    ],
    [
      116.3,
      "Lo que baja con más datos es el error tipo dos, que viene en el módulo siete."
    ],
    [
      122.74,
      "El caso más común es probar una media sin conocer la desviación de la población."
    ],
    [
      127.15,
      "Se usa el estadístico te: la media muestral menos el valor de hache cero, dividido por ese sobre raíz de ene."
    ],
    [
      134.03,
      "Con ene menos uno grados de libertad."
    ],
    [
      136.32,
      "La distribución te tiene colas más anchas que la normal, para compensar que la desviación también se estimó."
    ],
    [
      143.02,
      "El ejemplo de la clase: el consumo eléctrico de veinte hogares de un barrio, contra la media de la ciudad, setecientos veintiún kilowatts hora."
    ],
    [
      151.96,
      "La pregunta es si el barrio consume más."
    ],
    [
      154.57,
      "Hache uno: la media es mayor a setecientos veintiuno."
    ],
    [
      157.96,
      "Con diecinueve grados de libertad, el valor crítico es uno coma setenta y tres."
    ],
    [
      162.88,
      "El pe valor da cero coma cero dos dos."
    ],
    [
      165.3,
      "Se rechaza: el barrio consume más que la ciudad."
    ],
    [
      168.98,
      "En erre, se usa t punto test, con los datos, mu igual al valor de hache cero, y alternative."
    ],
    [
      174.45,
      "Alternative puede ser two punto sided, si hache uno es distinto de; greater, si es mayor; o less, si es menor."
    ],
    [
      181.73,
      "En el script de la clase, con veinticinco datos y mu igual a diez, bilateral: te da dos coma cero cinco, con veinticuatro grados de libertad."
    ],
    [
      190.27,
      "El pe valor, cero coma cero cinco uno siete."
    ],
    [
      193.01,
      "Apenas sobre cero coma cero cinco: no se rechaza."
    ],
    [
      196.31,
      "Y el intervalo de confianza va de nueve coma noventa y nueve a once coma cuarenta y ocho."
    ],
    [
      201.73,
      "Contiene el diez, coherente con no rechazar."
    ],
    [
      205.22,
      "¿Qué pasaría con los mismos datos, si la alternativa fuera mayor?"
    ],
    [
      212.66,
      "El pe valor se reduce a la mitad, cero coma cero dos seis, y ahí sí se rechaza."
    ],
    [
      217.54,
      "Por eso la hipótesis alternativa se elige antes de mirar los datos, según lo que pregunta el enunciado."
    ],
    [
      225.63,
      "Si la desviación de la población se conoce, por ejemplo por información histórica, se usa la normal en vez de la te."
    ],
    [
      232.54,
      "El estadístico zeta es igual, pero con sigma en vez de ese."
    ],
    [
      236.28,
      "La regla es simple: sigma conocida, zeta; sigma desconocida, te."
    ],
    [
      240.96,
      "En la clase, con treinta datos y sigma igual a dos, la media muestral es diez coma setenta y nueve, contra hache cero de diez."
    ],
    [
      248.55,
      "Zeta da dos coma dieciséis, y el pe valor, cero coma cero uno cinco."
    ],
    [
      252.92,
      "Se rechaza."
    ],
    [
      254.14,
      "En erre se usa zeta punto test, del paquete BSDA, y hay que pasarle sigma punto equis."
    ],
    [
      261.46,
      "Para una proporción, la idea es la misma."
    ],
    [
      263.98,
      "Zeta es la proporción de la muestra menos pe cero, dividido por la raíz de pe cero por uno menos pe cero, sobre ene."
    ],
    [
      271.02,
      "Fíjate que en el denominador va pe cero, el valor de la hipótesis, no la proporción de la muestra."
    ],
    [
      277.44,
      "Pero antes hay un requisito: ene por pe cero, y ene por uno menos pe cero, tienen que ser al menos cinco."
    ],
    [
      283.82,
      "Si no, la aproximación normal no sirve."
    ],
    [
      286.91,
      "En la ayudantía dos, doscientos parabrisas, cuarenta defectuosos."
    ],
    [
      291.26,
      "La empresa dice que a lo más el quince por ciento sale defectuoso."
    ],
    [
      295.07,
      "La proporción de la muestra es veinte por ciento."
    ],
    [
      298.04,
      "Zeta da uno coma noventa y ocho, mayor que el crítico de uno coma sesenta y cuatro."
    ],
    [
      303.2,
      "Se rechaza: la muestra no respalda a la empresa."
    ],
    [
      306.94,
      "En erre se usa prop punto test, con correct igual a FALSE."
    ],
    [
      310.6,
      "Ojo que no entrega zeta, sino equis cuadrado, que es zeta al cuadrado."
    ],
    [
      314.95,
      "En los parabrisas, tres coma noventa y dos."
    ],
    [
      319.72,
      "Y por último, la varianza."
    ],
    [
      321.52,
      "El estadístico es ene menos uno, por la varianza muestral, dividido por la varianza de hache cero."
    ],
    [
      327.59,
      "Se compara con una chi cuadrado de ene menos uno grados de libertad."
    ],
    [
      332.13,
      "En la clase: la desviación del tiempo de conexión sería a lo más dos minutos."
    ],
    [
      336.75,
      "Primer detalle, ¿qué va en hache cero, dos o cuatro?"
    ],
    [
      343.57,
      "Cuatro."
    ],
    [
      344.38,
      "La prueba es sobre la varianza, así que la desviación se eleva al cuadrado."
    ],
    [
      348.88,
      "Con veinticuatro datos y varianza muestral cuatro coma nueve: veintitrés por cuatro coma nueve, dividido en cuatro, veintiocho coma dos."
    ],
    [
      357.18,
      "El crítico es treinta y cinco coma uno."
    ],
    [
      359.66,
      "No se supera, así que no se rechaza: no hay evidencia de que la desviación sea mayor a dos minutos."
    ],
    [
      366.27,
      "En erre no hay una función como t punto test para esto."
    ],
    [
      369.64,
      "Se calcula a mano: qchisq para el valor crítico, y uno menos pchisq para el pe valor."
    ],
    [
      376.98,
      "En resumen: se plantea hache cero y hache uno, se calcula el pe valor, y si es menor o igual que alfa, se rechaza."
    ],
    [
      383.92,
      "No rechazar no prueba hache cero."
    ],
    [
      386.04,
      "Para la media, te si sigma es desconocida y zeta si es conocida."
    ],
    [
      389.73,
      "Para una proporción, zeta, revisando el requisito de cinco."
    ],
    [
      393.41,
      "Y para una varianza, chi cuadrado, siempre con la varianza, no la desviación."
    ],
    [
      398.8,
      "Eso fue el módulo cinco."
    ]
  ],
  "huella": "cc7b6bd2a2d0"
});
