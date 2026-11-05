/* GENERADO por tools/generar_audio.py desde tools/guiones/m06-hipotesis-dos-poblaciones.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m06-hipotesis-dos-poblaciones",
  "modulo": "m06-hipotesis-dos-poblaciones",
  "titulo": "Pruebas de hipótesis: dos poblaciones",
  "archivo": "audio/m06-hipotesis-dos-poblaciones.mp3",
  "duracion": 333,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué prueba usar"
    },
    {
      "t": 61.6,
      "titulo": "Comparar varianzas"
    },
    {
      "t": 122.9,
      "titulo": "Medias con varianzas distintas: Welch"
    },
    {
      "t": 201.6,
      "titulo": "Medias con varianzas iguales: pooled"
    },
    {
      "t": 247.4,
      "titulo": "Muestras pareadas"
    },
    {
      "t": 311.5,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "tres": 5.82,
    "tres-v": 9.18,
    "tres-m": 13.27,
    "tres-p": 18.64,
    "arbol": 24.9,
    "arbol-1": 27.41,
    "arbol-2": 35.98,
    "arbol-3": 39.68,
    "arbol-4": 43.38,
    "welch-def": 46.8,
    "welch-enun": 53.34,
    "f": 61.62,
    "f-1": 67.49,
    "f-lejos": 70.54,
    "f-gl": 73.22,
    "f-ej": 79.93,
    "f-ej-q": 84.33,
    "f-ej-v": 88.0,
    "f-ej-f": 91.83,
    "f-ej-crit": 96.21,
    "f-ej-q2": 98.44,
    "f-ej-r": 103.09,
    "f-ojo": 112.75,
    "f-r": 118.26,
    "w": 122.93,
    "w-f": 126.66,
    "w-gl": 137.54,
    "w-ej": 144.01,
    "w-ej-d": 147.09,
    "w-ej-h": 155.39,
    "w-ej-h1": 158.94,
    "w-ej-num": 163.62,
    "w-ej-t": 171.6,
    "w-ej-gl": 175.67,
    "w-ej-r": 181.65,
    "w-ojo": 187.17,
    "w-r": 193.07,
    "p": 201.63,
    "p-f": 208.11,
    "p-gl": 213.29,
    "p-ej": 218.63,
    "p-ej-sp": 227.37,
    "p-ej-t": 231.17,
    "p-ej-crit": 235.33,
    "p-ej-r": 240.01,
    "p-r": 242.16,
    "par": 247.42,
    "par-ej": 250.25,
    "par-q": 255.81,
    "par-qr": 263.23,
    "par-d": 272.96,
    "par-t": 277.42,
    "par-ej-d": 283.96,
    "par-ej-t": 286.9,
    "par-ej-p": 290.18,
    "par-ej-r": 291.91,
    "par-r": 299.84,
    "par-ord": 302.57,
    "c": 311.51,
    "c1": 312.24,
    "c2": 315.52,
    "c3": 322.26,
    "c4": 325.64,
    "fin": 331.18
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo seis: las pruebas de hipótesis para comparar dos poblaciones."
    ],
    [
      5.82,
      "Cuando hay dos grupos, se pueden hacer tres preguntas."
    ],
    [
      9.18,
      "¿Tienen la misma variabilidad?"
    ],
    [
      11.14,
      "Eso se responde con la prueba efe."
    ],
    [
      13.27,
      "¿Tienen la misma media?"
    ],
    [
      14.79,
      "Con una prueba te, que tiene dos versiones según las varianzas."
    ],
    [
      18.64,
      "Y si son los mismos sujetos medidos dos veces, ¿cambió la media?"
    ],
    [
      22.6,
      "Eso es una prueba pareada."
    ],
    [
      24.9,
      "El árbol de decisión de la clase es así."
    ],
    [
      27.41,
      "Primero: ¿son los mismos sujetos medidos dos veces, como pacientes antes y después de un tratamiento?"
    ],
    [
      33.77,
      "Si es así, prueba pareada."
    ],
    [
      35.98,
      "Si son grupos independientes: ¿las varianzas son iguales?"
    ],
    [
      39.68,
      "Si se sabe que sí, se usa la versión combinada, o pooled."
    ],
    [
      43.38,
      "Y si no se sabe, o son distintas, se usa Welch."
    ],
    [
      46.8,
      "La recomendación actual es usar Welch por defecto, salvo que haya certeza de que las varianzas son iguales."
    ],
    [
      53.34,
      "En una prueba: si el enunciado dice suponga varianzas iguales, pooled."
    ],
    [
      57.65,
      "Si no dice nada, Welch."
    ],
    [
      61.62,
      "La prueba efe compara las varianzas con un cociente: la varianza de un grupo dividida por la del otro."
    ],
    [
      67.49,
      "Si el cociente es cercano a uno, son parecidas."
    ],
    [
      70.54,
      "Si es muy grande o muy chico, difieren."
    ],
    [
      73.22,
      "Se compara con una distribución efe, con ene uno menos uno y ene dos menos uno grados de libertad."
    ],
    [
      79.93,
      "En la ayudantía dos se comparan dos máquinas, con diez datos cada una."
    ],
    [
      84.33,
      "La pregunta es si la máquina a tiene mayor varianza que la be."
    ],
    [
      88.0,
      "Las varianzas son dos coma veintitrés y uno coma cero siete."
    ],
    [
      91.83,
      "El cociente da dos coma cero nueve, con nueve y nueve grados de libertad."
    ],
    [
      96.21,
      "El crítico es tres coma dieciocho."
    ],
    [
      98.44,
      "¿Se rechaza?"
    ],
    [
      103.09,
      "No."
    ],
    [
      103.76,
      "Aunque una varianza es el doble de la otra, con diez datos no alcanza: el pe valor es cero coma catorce."
    ],
    [
      110.06,
      "No hay evidencia de que a varíe más."
    ],
    [
      112.75,
      "Un detalle: en una prueba unilateral hacia la derecha, la varianza más grande va arriba."
    ],
    [
      118.26,
      "En erre, var punto test, con los dos grupos."
    ],
    [
      122.93,
      "Welch compara dos medias sin suponer varianzas iguales."
    ],
    [
      126.66,
      "El estadístico es la diferencia de medias, menos la diferencia de la hipótesis, dividido por la raíz de ese uno al cuadrado sobre ene uno, más ese dos al cuadrado sobre ene dos."
    ],
    [
      137.54,
      "Y los grados de libertad se calculan con una fórmula especial, que casi nunca da un número entero."
    ],
    [
      144.01,
      "El ejemplo de la clase es el precio del limón."
    ],
    [
      147.09,
      "En enero, la media es mil novecientos treinta y ocho pesos, con trece datos."
    ],
    [
      151.8,
      "En abril, tres mil quinientos sesenta, con quince datos."
    ],
    [
      155.39,
      "La pregunta es si el precio subió más de mil quinientos pesos."
    ],
    [
      158.94,
      "Así que la diferencia de la hipótesis no es cero, es mil quinientos."
    ],
    [
      163.62,
      "El numerador: tres mil quinientos sesenta menos mil novecientos treinta y ocho, menos mil quinientos."
    ],
    [
      169.93,
      "Da ciento veintidós."
    ],
    [
      171.6,
      "Dividido por el error estándar, te sale cero coma noventa y tres."
    ],
    [
      175.67,
      "Los grados de libertad de Welch son veintiuno coma seis, y el crítico, uno coma setenta y dos."
    ],
    [
      181.65,
      "No se rechaza: no se puede afirmar que el aumento supere los mil quinientos pesos."
    ],
    [
      187.17,
      "Fíjate en el detalle de la diferencia de la hipótesis."
    ],
    [
      190.3,
      "En erre, eso se indica con el argumento mu."
    ],
    [
      193.07,
      "Welch es t punto test con los dos grupos, y var punto equal igual a FALSE, que es lo que hace erre por defecto."
    ],
    [
      201.63,
      "Si se puede suponer que las varianzas son iguales, se juntan en una sola estimación: la varianza combinada."
    ],
    [
      208.11,
      "Es un promedio ponderado de las dos varianzas, con pesos ene menos uno de cada grupo."
    ],
    [
      213.29,
      "La prueba queda con ene uno más ene dos menos dos grados de libertad, más que Welch."
    ],
    [
      218.63,
      "En la clase, de nuevo con el limón, pero otro año: dieciocho datos en enero y diez en abril, y la pregunta es si la diferencia es distinta de mil."
    ],
    [
      227.37,
      "La varianza combinada da veintidós mil ochocientos diecinueve."
    ],
    [
      231.17,
      "Te da uno coma cuarenta y seis, con veintiséis grados de libertad."
    ],
    [
      235.33,
      "Con alfa diez por ciento y bilateral, el crítico es uno coma setenta y uno."
    ],
    [
      240.01,
      "No se rechaza."
    ],
    [
      242.16,
      "En erre, t punto test con var punto equal igual a TRUE."
    ],
    [
      247.42,
      "El último caso es el de las muestras pareadas."
    ],
    [
      250.25,
      "En la clase, se mide el colesterol de once pacientes, antes y después de un medicamento."
    ],
    [
      255.81,
      "¿Por qué no se pueden tratar como dos grupos independientes?"
    ],
    [
      263.23,
      "Porque son las mismas personas."
    ],
    [
      265.38,
      "Cada dato de antes está unido a uno de después, y gran parte de la variación entre pacientes se repite en las dos mediciones."
    ],
    [
      272.96,
      "Lo que se hace es calcular la diferencia de cada paciente, antes menos después, y hacer una prueba te de una sola muestra sobre esas diferencias, con ene menos uno grados de libertad."
    ],
    [
      283.96,
      "En el ejemplo, la diferencia media es diecinueve."
    ],
    [
      286.9,
      "Te da nueve coma cero seis, con diez grados de libertad, y un pe valor muy chico."
    ],
    [
      291.91,
      "Se rechaza: el medicamento cambia el colesterol."
    ],
    [
      295.22,
      "Y como la diferencia es antes menos después, y es positiva, lo baja."
    ],
    [
      299.84,
      "En erre, t punto test con paired igual a TRUE."
    ],
    [
      302.57,
      "Y ojo con el orden: si pones después antes que antes, el signo se invierte, y hay que leer la conclusión al revés."
    ],
    [
      311.51,
      "En resumen: la prueba efe compara varianzas con un cociente."
    ],
    [
      315.52,
      "Para medias de grupos independientes, Welch por defecto, y pooled solo si se sabe que las varianzas son iguales."
    ],
    [
      322.26,
      "Si la hipótesis no es diferencia cero, se indica con mu."
    ],
    [
      325.64,
      "Y si son los mismos sujetos, se trabaja con las diferencias, en una prueba pareada."
    ],
    [
      331.18,
      "Eso fue el módulo seis."
    ]
  ],
  "huella": "e6a2b6d42e9e"
});
