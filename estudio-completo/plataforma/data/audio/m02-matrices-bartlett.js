/* GENERADO por tools/generar_audio.py desde tools/guiones/m02-matrices-bartlett.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m02-matrices-bartlett",
  "modulo": "m02-matrices-bartlett",
  "titulo": "Matriz de covarianza, matriz de correlación y test de Bartlett",
  "archivo": "audio/m02-matrices-bartlett.mp3",
  "duracion": 382,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Muchas variables a la vez"
    },
    {
      "t": 32.7,
      "titulo": "¿Puede ser una matriz de covarianza?"
    },
    {
      "t": 135.9,
      "titulo": "En erre"
    },
    {
      "t": 171.1,
      "titulo": "La matriz de correlación"
    },
    {
      "t": 220.9,
      "titulo": "El test de Bartlett"
    },
    {
      "t": 359.0,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "idea": 6.64,
    "idea-m": 13.93,
    "diag": 18.19,
    "fuera": 21.28,
    "sim": 24.51,
    "valida": 32.71,
    "valida-1": 39.56,
    "valida-2": 41.89,
    "valida-3": 46.35,
    "sdp": 51.23,
    "sdp-int": 58.55,
    "sdp-eig": 65.74,
    "neg": 71.86,
    "neg-r": 80.45,
    "ay": 88.3,
    "ay-q": 94.04,
    "ay-re": 100.77,
    "ay-r": 107.94,
    "ay-eig": 113.4,
    "corr-val": 119.84,
    "corr-trampa": 129.09,
    "r": 135.91,
    "r-eig": 142.11,
    "r-ej": 146.28,
    "r-ej-val": 149.53,
    "r-ej-1": 156.21,
    "r-ej-traza": 159.0,
    "r-ej-pca": 164.62,
    "cor": 171.07,
    "cor-f": 174.96,
    "cor-ej": 179.61,
    "cor-ej-sd": 185.6,
    "cor-ej-12": 188.44,
    "cor-ej-13": 194.56,
    "cor-ej-23": 199.69,
    "cor-ej-q": 204.49,
    "cor-ej-r": 210.22,
    "cor-r": 213.86,
    "bart": 220.87,
    "bart-q": 227.34,
    "bart-por": 231.29,
    "bart-h0": 236.65,
    "bart-h1": 242.76,
    "bart-sup": 244.82,
    "bart-f": 247.83,
    "bart-gl": 257.42,
    "bart-int": 263.0,
    "bart-int2": 273.9,
    "bart-ej": 279.77,
    "bart-ej-det": 282.78,
    "bart-ej-c": 289.87,
    "bart-ej-x": 293.98,
    "bart-ej-gl": 299.43,
    "bart-ej-crit": 301.44,
    "bart-ej-q": 304.15,
    "bart-ej-r": 308.81,
    "bart-ojo": 317.06,
    "bart-clase": 329.03,
    "bart-r": 343.59,
    "bart-r-n": 349.53,
    "c": 359.01,
    "c1": 359.72,
    "c2": 368.23,
    "c3": 372.22,
    "fin": 379.82
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo dos: la matriz de covarianza, la matriz de correlación, y el test de Bartlett."
    ],
    [
      6.64,
      "Con dos variables había una sola covarianza."
    ],
    [
      9.37,
      "Pero con cuatro, cinco o diez variables, hay una covarianza por cada par."
    ],
    [
      13.93,
      "La matriz de covarianza las ordena todas en una tabla cuadrada."
    ],
    [
      18.19,
      "En la diagonal van las varianzas de cada variable."
    ],
    [
      21.28,
      "Fuera de la diagonal, la covarianza de cada par."
    ],
    [
      24.51,
      "Y es simétrica: la covarianza de equis uno con equis dos es la misma que la de equis dos con equis uno."
    ],
    [
      32.71,
      "En las pruebas aparece mucho una pregunta: te dan una matriz, y preguntan si puede ser una matriz de covarianza."
    ],
    [
      39.56,
      "Primero, tiene que ser simétrica."
    ],
    [
      41.89,
      "Segundo, la diagonal no puede tener negativos, porque son varianzas."
    ],
    [
      46.35,
      "Y tercero, la que más se olvida: tiene que ser semidefinida positiva."
    ],
    [
      51.23,
      "¿Qué significa eso?"
    ],
    [
      52.72,
      "Que para cualquier vector zeta, zeta traspuesto por la matriz por zeta es mayor o igual a cero."
    ],
    [
      58.55,
      "La intuición es que esa expresión es la varianza de una combinación de las variables, y una varianza nunca puede ser negativa."
    ],
    [
      65.74,
      "En la práctica se revisa con los valores propios: todos tienen que ser mayores o iguales a cero."
    ],
    [
      71.86,
      "Entonces, si una matriz simétrica tiene un valor propio negativo, ¿qué concluyes?"
    ],
    [
      80.45,
      "Que no puede ser una matriz de covarianza."
    ],
    [
      82.89,
      "Habría una combinación de las variables con varianza negativa, y eso es imposible."
    ],
    [
      88.3,
      "En la ayudantía uno había una matriz de dos por dos: cuatro y tres en la diagonal, y uno fuera."
    ],
    [
      94.04,
      "La forma cuadrática es cuatro zeta uno al cuadrado, más dos zeta uno zeta dos, más tres zeta dos al cuadrado."
    ],
    [
      100.77,
      "Reordenando, queda zeta uno más zeta dos al cuadrado, más tres zeta uno al cuadrado, más dos zeta dos al cuadrado."
    ],
    [
      107.94,
      "Todo son cuadrados, así que solo vale cero si zeta es cero."
    ],
    [
      111.7,
      "Es definida positiva."
    ],
    [
      113.4,
      "Y sus valores propios lo confirman: cuatro coma seis dos y dos coma tres ocho, ambos positivos."
    ],
    [
      119.84,
      "Si te preguntan por una matriz de correlación, se agregan dos cosas: unos en la diagonal, y todos los valores fuera de la diagonal entre menos uno y uno."
    ],
    [
      129.09,
      "Pero ojo: eso tampoco basta."
    ],
    [
      131.29,
      "También tiene que ser semidefinida positiva."
    ],
    [
      135.91,
      "En erre, cov aplicado a un data frame entrega la matriz de covarianza, dividiendo por ene menos uno."
    ],
    [
      142.11,
      "Y eigen la descompone en valores propios y vectores propios."
    ],
    [
      146.28,
      "En la clase hay diez observaciones de cuatro variables."
    ],
    [
      149.53,
      "Los valores propios son cuatro coma tres cinco, cero coma cinco tres, cero coma dos ocho y cero coma cero dos."
    ],
    [
      156.21,
      "El primero concentra casi toda la variación."
    ],
    [
      159.0,
      "Y su suma, cinco coma uno ocho, es igual a la suma de las varianzas, la traza de la matriz."
    ],
    [
      164.62,
      "Esto es justamente la base de componentes principales, en el módulo nueve."
    ],
    [
      171.07,
      "La matriz de correlación es la de covarianza, pero sin unidades."
    ],
    [
      174.96,
      "Cada covarianza se divide por la raíz del producto de las dos varianzas."
    ],
    [
      179.61,
      "En la ayudantía uno: tiempo, costo y distancia, con varianzas dieciséis, nueve y veinticinco."
    ],
    [
      185.6,
      "Las desviaciones son cuatro, tres y cinco."
    ],
    [
      188.44,
      "La covarianza entre tiempo y costo es seis, y seis dividido por cuatro por tres da cero coma cinco."
    ],
    [
      194.56,
      "Entre tiempo y distancia, ocho dividido por cuatro por cinco: cero coma cuatro."
    ],
    [
      199.69,
      "Y entre costo y distancia, uno dividido por quince: cero coma cero seis siete."
    ],
    [
      204.49,
      "¿Cuál es la relación más fuerte?"
    ],
    [
      210.22,
      "Tiempo con costo, cero coma cinco: positiva y moderada."
    ],
    [
      213.86,
      "En erre, cor de los datos, o cov dos cor si solo tienes la matriz de covarianza."
    ],
    [
      220.87,
      "Y ahora el test de Bartlett, que aparece siempre antes de componentes principales o de análisis factorial."
    ],
    [
      227.34,
      "La pregunta es: ¿las variables están correlacionadas entre sí?"
    ],
    [
      231.29,
      "Porque si no lo están, no hay nada que resumir."
    ],
    [
      234.33,
      "Cada variable va por su lado."
    ],
    [
      236.65,
      "La hipótesis nula es que la matriz de correlación es la identidad: unos en la diagonal, ceros afuera."
    ],
    [
      242.76,
      "La alternativa, que no lo es."
    ],
    [
      244.82,
      "Y el test supone normalidad multivariada."
    ],
    [
      247.83,
      "El estadístico es menos, entre paréntesis, ene menos uno menos dos pe más cinco sobre seis, por el logaritmo del determinante de la matriz de correlación."
    ],
    [
      257.42,
      "Se compara con una chi cuadrado de pe por pe menos uno, sobre dos grados de libertad."
    ],
    [
      263.0,
      "La intuición está en el determinante."
    ],
    [
      265.19,
      "Si las variables no están correlacionadas, la matriz es la identidad, su determinante es uno, el logaritmo es cero, y el estadístico es cero."
    ],
    [
      273.9,
      "Mientras más correlacionadas, más chico el determinante, y más grande el estadístico."
    ],
    [
      279.77,
      "En la ayudantía, con diez datos y tres variables: el determinante de la matriz de correlación es cero coma seis uno, y su logaritmo, menos cero coma cuatro nueve."
    ],
    [
      289.87,
      "El coeficiente es nueve menos once sextos: siete coma uno siete."
    ],
    [
      293.98,
      "El estadístico: siete coma uno siete por cero coma cuatro nueve, tres coma cincuenta y dos, con tres grados de libertad."
    ],
    [
      301.44,
      "El valor crítico es siete coma ochenta y uno."
    ],
    [
      304.15,
      "¿Se rechaza?"
    ],
    [
      308.81,
      "No."
    ],
    [
      309.48,
      "Tres coma cinco no llega a siete coma ocho."
    ],
    [
      312.12,
      "Con diez datos, no hay evidencia de que las variables estén correlacionadas."
    ],
    [
      317.06,
      "Y ojo con cómo se dice eso."
    ],
    [
      319.09,
      "No se rechaza no significa que no haya correlación: significa que la evidencia no alcanza."
    ],
    [
      325.0,
      "Con diez datos, puede ser simplemente falta de muestra."
    ],
    [
      329.03,
      "En cambio, en el ejemplo de la clase, con cuatro variables muy correlacionadas, el estadístico da veintiséis coma nueve, con pe valor cero coma cero cero cero uno."
    ],
    [
      338.99,
      "Se rechaza, y tiene sentido aplicar componentes principales."
    ],
    [
      343.59,
      "En erre, se puede calcular a mano con det y log, o con cortest punto bartlett, del paquete psych."
    ],
    [
      349.53,
      "Y ahí hay que pasarle ene, el número de observaciones."
    ],
    [
      352.98,
      "Si no, la función no sabe con cuántos datos se calculó la matriz."
    ],
    [
      359.01,
      "En resumen: la matriz de covarianza tiene varianzas en la diagonal, es simétrica y semidefinida positiva, con valores propios mayores o iguales a cero."
    ],
    [
      368.23,
      "La de correlación es la misma sin unidades, con unos en la diagonal."
    ],
    [
      372.22,
      "Y Bartlett prueba si la matriz de correlación es la identidad."
    ],
    [
      375.86,
      "Si se rechaza, hay correlación que vale la pena resumir."
    ],
    [
      379.82,
      "Eso fue el módulo dos."
    ]
  ],
  "huella": "72d3c52e3296"
});
