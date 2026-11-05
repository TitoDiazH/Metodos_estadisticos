/* GENERADO por tools/generar_audio.py desde tools/guiones/m01-covarianza-correlacion.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m01-covarianza-correlacion",
  "modulo": "m01-covarianza-correlacion",
  "titulo": "Covarianza, correlación y regresión simple",
  "archivo": "audio/m01-covarianza-correlacion.mp3",
  "duracion": 347,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Cómo se mueven dos variables juntas"
    },
    {
      "t": 125.5,
      "titulo": "La correlación"
    },
    {
      "t": 223.1,
      "titulo": "¿Es significativa?"
    },
    {
      "t": 326.3,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "q": 6.72,
    "datos": 12.44,
    "datos-x": 16.52,
    "datos-y": 25.95,
    "cov": 32.83,
    "cov-pos": 35.6,
    "cov-neg": 39.33,
    "cov-0": 42.99,
    "cov-f": 47.03,
    "ej-med": 56.58,
    "ej-p1": 62.76,
    "ej-p1r": 70.32,
    "ej-prods": 75.07,
    "ej-signo": 82.11,
    "ej-suma": 87.84,
    "ej-cov": 90.39,
    "unid": 95.07,
    "unid-r": 101.51,
    "unid-c": 110.66,
    "var": 117.54,
    "cor": 125.49,
    "cor-f": 130.0,
    "cor-rango": 134.25,
    "cor-ej": 140.39,
    "cor-sx": 141.28,
    "cor-sy": 144.43,
    "cor-r": 146.86,
    "cor-lee": 151.38,
    "nube": 158.45,
    "indep": 166.28,
    "indep-r": 178.75,
    "indep-curva": 183.21,
    "indep-var": 188.71,
    "indep-sent": 192.19,
    "indep-norm": 198.72,
    "causa": 203.82,
    "reg": 209.16,
    "reg-r": 213.5,
    "sig": 223.08,
    "rho": 231.35,
    "rho-h": 238.97,
    "h0": 241.5,
    "h1": 243.05,
    "t": 246.27,
    "t-ej": 254.75,
    "t-ej1": 255.59,
    "t-ej2": 261.78,
    "t-crit": 263.42,
    "t-conc": 269.22,
    "r": 275.79,
    "r-t": 278.29,
    "r-p": 282.46,
    "r-ic": 286.76,
    "r-cor": 297.23,
    "fuerte": 299.76,
    "fuerte-r": 312.45,
    "fuerte-c": 318.02,
    "c": 326.27,
    "c1": 326.97,
    "c2": 330.8,
    "c3": 334.38,
    "c4": 337.42,
    "fin": 344.96
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo uno: covarianza, correlación, y cómo saber si una correlación es significativa."
    ],
    [
      6.72,
      "La pregunta de fondo es simple: cuando una variable sube, ¿qué suele pasar con la otra?"
    ],
    [
      12.44,
      "El ejemplo de la clase son seis personas, con su altura y su peso."
    ],
    [
      16.52,
      "Las alturas son ciento sesenta y uno, ciento setenta, ciento ochenta, ciento setenta y cinco, ciento sesenta y cinco, y ciento ochenta y siete centímetros."
    ],
    [
      25.95,
      "Y los pesos, cincuenta, sesenta y cinco, setenta y ocho, ochenta y dos, sesenta, y setenta y seis kilos."
    ],
    [
      32.83,
      "La covarianza mide cómo se mueven juntas."
    ],
    [
      35.6,
      "Si es positiva, tienden a subir y bajar al mismo tiempo."
    ],
    [
      39.33,
      "Si es negativa, cuando una sube, la otra tiende a bajar."
    ],
    [
      42.99,
      "Y si es cercana a cero, no se ve una relación lineal clara."
    ],
    [
      47.03,
      "Para calcularla, a cada persona se le resta la media en las dos variables, se multiplican esas dos diferencias, se suman, y se divide por ene menos uno."
    ],
    [
      56.58,
      "En el ejemplo, la altura media es ciento setenta y tres, y el peso medio, sesenta y ocho coma cinco."
    ],
    [
      62.76,
      "La primera persona mide ciento sesenta y uno: doce bajo la media."
    ],
    [
      66.77,
      "Y pesa cincuenta: dieciocho coma cinco bajo la media."
    ],
    [
      70.32,
      "Menos doce por menos dieciocho coma cinco: doscientos veintidós, positivo."
    ],
    [
      75.07,
      "Los demás productos son diez coma cinco, sesenta y seis coma cinco, veintisiete, sesenta y ocho, y ciento cinco."
    ],
    [
      82.11,
      "Fíjate que todos son positivos: cada persona está del mismo lado de la media en las dos variables."
    ],
    [
      87.84,
      "La suma da cuatrocientos noventa y nueve, y dividido en cinco, la covarianza es noventa y nueve coma ocho."
    ],
    [
      95.07,
      "Ahora, ¿noventa y nueve coma ocho es mucho o poco?"
    ],
    [
      101.51,
      "No se puede saber."
    ],
    [
      103.05,
      "Si la altura se midiera en metros, la covarianza sería cero coma nueve nueve ocho, y la relación sería exactamente la misma."
    ],
    [
      110.66,
      "La covarianza depende de las unidades."
    ],
    [
      113.21,
      "Su signo dice la dirección, pero su tamaño no dice la fuerza."
    ],
    [
      117.54,
      "Un detalle: la varianza es un caso particular."
    ],
    [
      120.59,
      "Es la covarianza de una variable consigo misma."
    ],
    [
      125.49,
      "Para tener una medida que no dependa de las unidades está la correlación."
    ],
    [
      130.0,
      "Es la covarianza dividida por el producto de las dos desviaciones estándar."
    ],
    [
      134.25,
      "Así queda siempre entre menos uno y uno."
    ],
    [
      136.77,
      "Y una relación lineal perfecta da uno o menos uno."
    ],
    [
      140.39,
      "En el ejemplo: la desviación de la altura es nueve coma seis cinco, la del peso, doce coma veintinueve."
    ],
    [
      146.86,
      "Noventa y nueve coma ocho dividido por el producto da cero coma ochenta y cuatro."
    ],
    [
      151.38,
      "Una relación positiva y fuerte."
    ],
    [
      153.45,
      "Y si la altura estuviera en metros, seguiría dando cero coma ochenta y cuatro."
    ],
    [
      158.45,
      "Antes de calcular, conviene mirar la nube de puntos: la dirección, qué tan alineados están, y si hay valores atípicos."
    ],
    [
      166.28,
      "Hay una afirmación que aparece en las pruebas: si la correlación es cero, las variables son independientes."
    ],
    [
      172.76,
      "¿Verdadero o falso?"
    ],
    [
      178.75,
      "Falso."
    ],
    [
      180.5,
      "La correlación solo mide relación lineal."
    ],
    [
      183.21,
      "Dos variables pueden tener una relación en forma de curva, muy fuerte, y correlación cero."
    ],
    [
      188.71,
      "O una puede cambiar la varianza de la otra sin cambiar su media."
    ],
    [
      192.19,
      "Lo que sí vale es el otro sentido: si son independientes, la covarianza es cero, y la correlación también."
    ],
    [
      198.72,
      "La equivalencia completa solo se cumple si las dos tienen distribución normal conjunta."
    ],
    [
      203.82,
      "Y lo otro que hay que recordar siempre: una correlación alta no prueba causalidad."
    ],
    [
      209.16,
      "La correlación y la regresión están relacionadas, pero no son lo mismo."
    ],
    [
      213.5,
      "La regresión representa la relación con una recta, para predecir."
    ],
    [
      217.63,
      "La correlación mide qué tan fuerte es esa relación lineal."
    ],
    [
      223.08,
      "Con seis personas, un ere de cero coma ochenta y cuatro podría haber salido por azar."
    ],
    [
      228.18,
      "¿Cómo sabemos si en la población hay correlación?"
    ],
    [
      231.35,
      "Primero, una distinción."
    ],
    [
      233.29,
      "Ere es la correlación de la muestra."
    ],
    [
      235.38,
      "Ro es la de la población, el parámetro que no conocemos."
    ],
    [
      238.97,
      "Las hipótesis se escriben siempre sobre ro: la nula es que ro es cero, y la alternativa, que es distinto de cero."
    ],
    [
      246.27,
      "El estadístico es te igual a ere, por la raíz de ene menos dos, sobre uno menos ere al cuadrado."
    ],
    [
      252.05,
      "Con ene menos dos grados de libertad."
    ],
    [
      254.75,
      "En el ejemplo: cero coma ochenta y cuatro, por la raíz de cuatro sobre uno menos cero coma ochenta y cuatro al cuadrado."
    ],
    [
      261.78,
      "Da tres coma once."
    ],
    [
      263.42,
      "El valor crítico, con cuatro grados de libertad y cinco por ciento, es dos coma setenta y ocho."
    ],
    [
      269.22,
      "Como tres coma once lo supera, se rechaza: hay evidencia de correlación lineal entre altura y peso."
    ],
    [
      275.79,
      "En erre, todo eso lo hace cor punto test."
    ],
    [
      278.29,
      "Entrega te igual a tres coma uno uno, con cuatro grados de libertad."
    ],
    [
      282.46,
      "El pe valor, cero coma cero tres seis, menor que cero coma cero cinco."
    ],
    [
      286.76,
      "Un intervalo de confianza que va de cero coma cero nueve a cero coma noventa y ocho."
    ],
    [
      291.54,
      "No contiene el cero, coherente con rechazar, pero es muy ancho, porque son solo seis datos."
    ],
    [
      297.23,
      "Y al final, el ere de la muestra."
    ],
    [
      299.76,
      "Una última idea, que es de las más preguntadas."
    ],
    [
      302.76,
      "En la ayudantía uno había una correlación de apenas cero coma cero seis siete."
    ],
    [
      307.31,
      "¿Puede ser significativa?"
    ],
    [
      312.45,
      "Sí, si la muestra es suficientemente grande."
    ],
    [
      315.35,
      "Con cien datos no lo es, pero con mil sí."
    ],
    [
      318.02,
      "Significativa no es lo mismo que fuerte."
    ],
    [
      320.63,
      "El pe valor depende de ene; la fuerza la da el tamaño de ere."
    ],
    [
      326.27,
      "En resumen: la covarianza da la dirección, pero depende de las unidades."
    ],
    [
      330.8,
      "La correlación la estandariza, entre menos uno y uno."
    ],
    [
      334.38,
      "Correlación cero no implica independencia."
    ],
    [
      337.42,
      "Y cor punto test prueba si ro es cero, con te igual a ere por la raíz de ene menos dos sobre uno menos ere al cuadrado."
    ],
    [
      344.96,
      "Eso fue el módulo uno."
    ]
  ],
  "huella": "4a75827c5a9a"
});
