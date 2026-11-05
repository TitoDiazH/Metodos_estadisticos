/* GENERADO por tools/generar_audio.py desde tools/guiones/m18-anova-un-factor.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m18-anova-un-factor",
  "modulo": "m18-anova-un-factor",
  "titulo": "ANOVA de un factor, comparaciones múltiples y supuestos",
  "archivo": "audio/m18-anova-un-factor.mp3",
  "duracion": 453,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Comparar más de dos medias"
    },
    {
      "t": 66.3,
      "titulo": "Separar la variabilidad"
    },
    {
      "t": 117.5,
      "titulo": "Un ejemplo a mano"
    },
    {
      "t": 224.2,
      "titulo": "En erre"
    },
    {
      "t": 271.1,
      "titulo": "¿Cuáles difieren?"
    },
    {
      "t": 360.5,
      "titulo": "Los supuestos"
    },
    {
      "t": 406.9,
      "titulo": "Cuántas observaciones"
    },
    {
      "t": 431.3,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "prob": 6.55,
    "h0": 16.42,
    "h1": 19.7,
    "varios-t": 23.32,
    "varios-t-r": 30.28,
    "dca": 43.04,
    "dca-sup": 49.3,
    "modelo": 54.79,
    "idea": 66.29,
    "idea-t": 69.96,
    "idea-tr": 73.61,
    "idea-e": 75.49,
    "idea-r": 78.9,
    "tabla": 87.13,
    "tabla-sc": 89.22,
    "tabla-gl": 91.72,
    "tabla-cm": 98.88,
    "tabla-f": 104.36,
    "tabla-dec": 109.13,
    "ej": 117.46,
    "ej-l": 122.57,
    "ej-w": 127.48,
    "ej-o": 133.13,
    "ej-med": 138.15,
    "ej-g": 144.09,
    "ej-sct": 147.52,
    "ej-sctr": 154.68,
    "ej-sctr-1": 157.49,
    "ej-sctr-2": 163.67,
    "ej-sctr-3": 170.05,
    "ej-sctr-n": 176.11,
    "ej-sctr-r": 186.45,
    "ej-sce": 190.2,
    "ej-gl": 196.53,
    "ej-cm": 200.49,
    "ej-f": 208.83,
    "ej-p": 214.54,
    "ej-conc": 218.01,
    "r": 224.24,
    "r-aov": 231.52,
    "r-sum": 233.96,
    "r-lee": 235.95,
    "r-df": 239.78,
    "r-ss": 242.08,
    "r-f": 246.84,
    "r-q": 253.07,
    "r-qr": 260.56,
    "pares": 271.13,
    "lsd": 276.59,
    "lsd-f": 281.77,
    "lsd-r": 290.35,
    "lsd-ej": 294.67,
    "lsd-v": 299.13,
    "lsd-med": 302.02,
    "lsd-si": 309.17,
    "lsd-no": 319.08,
    "tukey": 323.83,
    "tukey-dif": 325.8,
    "tukey-r": 333.12,
    "tukey-ej": 337.83,
    "tukey-q": 342.44,
    "tukey-qr": 350.58,
    "tukey-erre": 355.38,
    "sup": 360.47,
    "sup-n": 368.92,
    "sup-v": 373.98,
    "sup-i": 382.49,
    "sup-ej": 388.18,
    "sup-ej2": 392.26,
    "sup-err": 398.83,
    "n": 406.86,
    "n-f": 410.6,
    "n-ej": 419.4,
    "n-rec": 425.71,
    "c": 431.29,
    "c1": 432.0,
    "c2": 438.72,
    "c3": 444.46,
    "fin": 450.79
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo dieciocho: el ANOVA de un factor, las comparaciones múltiples y los supuestos."
    ],
    [
      6.55,
      "Tenemos varios tratamientos, por ejemplo tres métodos de enseñanza, y queremos saber si el rendimiento promedio es el mismo en todos, o si al menos dos difieren."
    ],
    [
      16.42,
      "La hipótesis nula es que todas las medias son iguales."
    ],
    [
      19.7,
      "La alternativa, que al menos dos son distintas."
    ],
    [
      23.32,
      "¿Por qué no hacer una prueba te para cada par de métodos?"
    ],
    [
      30.28,
      "Porque cada prueba tiene su propio riesgo de equivocarse, y al hacer muchas, la probabilidad de encontrar una diferencia falsa se acumula."
    ],
    [
      38.77,
      "El ANOVA lo prueba todo de una vez, con un solo estadístico."
    ],
    [
      43.04,
      "El diseño más simple es el completamente al azar, el ce a: todas las corridas se hacen en orden aleatorio."
    ],
    [
      49.3,
      "Y supone que, aparte del factor que estudiamos, ningún otro factor influye en la respuesta."
    ],
    [
      54.79,
      "El modelo dice que cada observación es la media global, más el efecto de su tratamiento, más un error aleatorio, normal, con media cero y varianza constante."
    ],
    [
      66.29,
      "La idea del ANOVA está en su nombre: análisis de varianza."
    ],
    [
      69.96,
      "La variabilidad total de los datos se separa en dos partes."
    ],
    [
      73.61,
      "La que hay entre los tratamientos, y la que hay dentro de cada tratamiento, que es el error."
    ],
    [
      78.9,
      "Si la variación entre grupos es mucho más grande que la variación dentro de ellos, las medias no pueden ser todas iguales."
    ],
    [
      87.13,
      "Eso se ordena en la tabla ANOVA."
    ],
    [
      89.22,
      "Cada fuente tiene su suma de cuadrados."
    ],
    [
      91.72,
      "Sus grados de libertad: ka menos uno para tratamientos, ene menos ka para el error, y ene menos uno para el total."
    ],
    [
      98.88,
      "Al dividir la suma de cuadrados por los grados de libertad se obtiene el cuadrado medio."
    ],
    [
      104.36,
      "Y el estadístico efe es el cuadrado medio de tratamientos dividido por el del error."
    ],
    [
      109.13,
      "Si efe supera el valor crítico, o si el pe valor es menor que alfa, se rechaza que las medias sean iguales."
    ],
    [
      117.46,
      "Hagamos uno completo."
    ],
    [
      119.07,
      "Tres métodos de enseñanza, cuatro alumnos en cada uno."
    ],
    [
      122.57,
      "Con conferencias: ochenta, ochenta y cinco, setenta y ocho y ochenta y tres."
    ],
    [
      127.48,
      "Con talleres: cincuenta y cinco, treinta y cuatro, cuarenta y tres y cincuenta y cuatro."
    ],
    [
      133.13,
      "Y en línea: setenta, sesenta y cinco, setenta y cuatro y setenta y siete."
    ],
    [
      138.15,
      "Las medias son ochenta y uno coma cinco, cuarenta y seis coma cinco, y setenta y uno coma cinco."
    ],
    [
      144.09,
      "Y la media general, sesenta y seis coma cinco."
    ],
    [
      147.52,
      "La suma de cuadrados total suma las distancias de cada dato a la media general, al cuadrado: da tres mil siete."
    ],
    [
      154.68,
      "La de tratamientos usa las medias de cada grupo."
    ],
    [
      157.49,
      "Ochenta y uno coma cinco menos sesenta y seis coma cinco es quince, al cuadrado, doscientos veinticinco."
    ],
    [
      163.67,
      "Cuarenta y seis coma cinco menos sesenta y seis coma cinco es menos veinte, al cuadrado, cuatrocientos."
    ],
    [
      170.05,
      "Y setenta y uno coma cinco menos sesenta y seis coma cinco es cinco, al cuadrado, veinticinco."
    ],
    [
      176.11,
      "Esos tres se suman y se multiplican por cuatro, el número de alumnos por grupo."
    ],
    [
      181.07,
      "¿Cuánto da?"
    ],
    [
      186.45,
      "Dos mil seiscientos."
    ],
    [
      188.19,
      "Cuatro por seiscientos cincuenta."
    ],
    [
      190.2,
      "Y el error sale por diferencia: tres mil siete menos dos mil seiscientos, cuatrocientos siete."
    ],
    [
      196.53,
      "Los grados de libertad son dos para tratamientos y nueve para el error."
    ],
    [
      200.49,
      "Los cuadrados medios: dos mil seiscientos sobre dos, mil trescientos; y cuatrocientos siete sobre nueve, cuarenta y cinco coma dos."
    ],
    [
      208.83,
      "Efe es mil trescientos dividido en cuarenta y cinco coma dos: veintiocho coma setenta y cinco."
    ],
    [
      214.54,
      "El pe valor es muy chico, cero coma cero cero cero uno."
    ],
    [
      218.01,
      "Se rechaza: el método de enseñanza sí influye en el rendimiento."
    ],
    [
      224.24,
      "En erre, con el ejemplo de la clase de cuatro métodos de ensamble, se arma un data frame con el tiempo y el método como factor, se ajusta a o ve, con tiempo tilde método, y se mira el summary."
    ],
    [
      235.95,
      "La salida tiene una fila para el método y otra para los residuos."
    ],
    [
      239.78,
      "Grados de libertad, tres y doce."
    ],
    [
      242.08,
      "Sumas de cuadrados, sesenta y nueve coma cinco y veintinueve coma cinco."
    ],
    [
      246.84,
      "Efe, nueve coma cuarenta y dos, con pe valor cero coma cero cero uno siete."
    ],
    [
      251.4,
      "Se rechaza."
    ],
    [
      253.07,
      "Ahora, ¿qué nos dice ese resultado sobre qué métodos son distintos?"
    ],
    [
      260.56,
      "Nada todavía."
    ],
    [
      262.49,
      "El ANOVA solo dice que al menos dos medias difieren, no cuáles."
    ],
    [
      266.31,
      "Para eso están las comparaciones múltiples."
    ],
    [
      271.13,
      "Con cuatro métodos hay seis pares posibles: ka por ka menos uno, dividido en dos."
    ],
    [
      276.59,
      "La primera herramienta es la ele ese de de Fisher, la diferencia mínima significativa."
    ],
    [
      281.77,
      "Es el te de Student, con alfa medio y los grados de libertad del error, por la raíz de dos veces el cuadrado medio del error, dividido por ene."
    ],
    [
      290.35,
      "Si dos medias difieren en más que eso, se declaran distintas."
    ],
    [
      294.67,
      "En el ensamble, el te con doce grados de libertad es dos coma uno siete nueve, y la ele ese de sale dos coma cuarenta y dos."
    ],
    [
      302.02,
      "Las medias son: a, siete coma veinticinco; be, ocho coma cinco; ce, doce coma setenta y cinco; y de, diez coma cinco."
    ],
    [
      309.17,
      "Ce contra a difiere en cinco coma cinco, ce contra be en cuatro coma veinticinco, y de contra a en tres coma veinticinco."
    ],
    [
      316.49,
      "Los tres superan dos coma cuarenta y dos."
    ],
    [
      319.08,
      "De contra ce, en cambio, difieren en dos coma veinticinco, y no alcanza."
    ],
    [
      323.83,
      "La otra herramienta es Tukey."
    ],
    [
      325.8,
      "La diferencia es que la ele ese de controla el error de cada comparación por separado, y Tukey controla el error de todas juntas."
    ],
    [
      333.12,
      "Por eso Tukey es más conservador: le cuesta más declarar una diferencia."
    ],
    [
      337.83,
      "En el ensamble, con Tukey siguen siendo distintos ce contra a y ce contra be."
    ],
    [
      342.44,
      "Pero, ¿qué crees que pasa con de contra a, que con la ele ese de apenas pasaba?"
    ],
    [
      350.58,
      "Deja de ser significativo: su pe valor queda en cero coma cero cinco tres."
    ],
    [
      355.38,
      "En erre, Tukey es TukeyHSD, aplicado al modelo."
    ],
    [
      360.47,
      "El ANOVA descansa en tres supuestos, y se revisan con los residuos: lo que queda de cada dato al restarle la media de su tratamiento."
    ],
    [
      368.92,
      "Normalidad: con un gráfico cuantil cuantil de los residuos, o con Shapiro Wilk."
    ],
    [
      373.98,
      "Varianza constante: graficando los residuos contra los valores predichos, que son las medias de cada tratamiento, o con la prueba de Levene."
    ],
    [
      382.49,
      "E independencia: graficando los residuos contra el orden en que se hicieron las corridas."
    ],
    [
      388.18,
      "En el ensamble, Levene da un pe valor de cero coma cuarenta y cinco, y Shapiro, de cero coma veintiocho."
    ],
    [
      394.68,
      "Ninguno rechaza, así que los supuestos se ven razonables."
    ],
    [
      398.83,
      "Un error frecuente es revisar la normalidad de los datos crudos."
    ],
    [
      402.68,
      "Lo que se revisa son los residuos."
    ],
    [
      406.86,
      "Por último, ¿cuántas observaciones poner en cada tratamiento?"
    ],
    [
      410.6,
      "Hay una fórmula: ene es dos, por te al cuadrado, por sigma al cuadrado, dividido por la diferencia mínima que interesa detectar, al cuadrado."
    ],
    [
      419.4,
      "En la clase, con sigma uno coma cinco y una diferencia de dos, sale alrededor de cinco por tratamiento."
    ],
    [
      425.71,
      "Como regla general, se recomiendan entre cinco y treinta."
    ],
    [
      431.29,
      "En resumen: el ANOVA compara varias medias con un solo efe, que es la variación entre grupos sobre la variación dentro."
    ],
    [
      438.72,
      "Si rechaza, la ele ese de o Tukey dicen qué pares difieren, siendo Tukey más conservador."
    ],
    [
      444.46,
      "Y los supuestos, normalidad, varianza constante e independencia, se revisan con los residuos."
    ],
    [
      450.79,
      "Eso fue el módulo dieciocho."
    ]
  ],
  "huella": "6deaaa42f8df"
});
