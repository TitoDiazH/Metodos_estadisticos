/* GENERADO por tools/generar_audio.py desde tools/guiones/m08-t2-hotelling.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m08-t2-hotelling",
  "modulo": "m08-t2-hotelling",
  "titulo": "Inferencia sobre el vector de medias: T² de Hotelling",
  "archivo": "audio/m08-t2-hotelling.mp3",
  "duracion": 306,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Varias medias a la vez"
    },
    {
      "t": 75.7,
      "titulo": "El estadístico"
    },
    {
      "t": 124.0,
      "titulo": "Un ejemplo"
    },
    {
      "t": 176.9,
      "titulo": "La región de confianza"
    },
    {
      "t": 198.0,
      "titulo": "¿Qué variable explica el rechazo?"
    },
    {
      "t": 283.8,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "idea": 5.94,
    "idea-ej": 14.78,
    "tes": 21.32,
    "tes-r1": 31.36,
    "tes-r2": 32.79,
    "tes-r3": 38.87,
    "tes-r4": 43.44,
    "elipse": 49.26,
    "elipse-2": 56.26,
    "elipse-3": 60.98,
    "sup": 65.5,
    "sup-r": 69.03,
    "t2": 75.66,
    "t2-f": 80.13,
    "t2-int": 88.84,
    "t2-uno": 96.18,
    "t2-f2": 101.52,
    "t2-f3": 103.87,
    "t2-reg": 110.9,
    "t2-ojo": 116.19,
    "ej": 124.0,
    "ej-mu": 127.35,
    "ej-xbar": 131.22,
    "ej-t2": 135.78,
    "ej-f": 138.32,
    "ej-p": 144.66,
    "ej-q": 146.93,
    "ej-r": 151.58,
    "ej-crit": 155.18,
    "ej-el": 161.32,
    "r": 165.52,
    "r-pkg": 171.47,
    "reg": 176.86,
    "reg-ej": 183.65,
    "reg-r": 188.84,
    "sim": 198.0,
    "sim-r": 204.83,
    "sim-def": 207.43,
    "sim-lee": 217.86,
    "corteza": 223.58,
    "corteza-d": 226.86,
    "corteza-t2": 233.26,
    "corteza-int": 242.07,
    "corteza-otros": 247.91,
    "corteza-r": 250.4,
    "bonf": 254.53,
    "bonf-q": 260.23,
    "bonf-r": 265.4,
    "bonf-r2": 269.33,
    "bonf-ej": 274.34,
    "c": 283.85,
    "c1": 284.51,
    "c2": 289.48,
    "c3": 294.93,
    "c4": 297.32,
    "fin": 303.21
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo ocho: la te cuadrado de Hotelling, para probar varias medias a la vez."
    ],
    [
      5.94,
      "Hasta ahora probábamos una media."
    ],
    [
      8.04,
      "Pero cuando se miden varias variables, muchas veces interesa saber si el vector de medias completo es igual a cierto valor."
    ],
    [
      14.78,
      "Por ejemplo, si una máquina produce piezas con el largo y el ancho correctos, las dos cosas juntas."
    ],
    [
      21.32,
      "La tentación es hacer una prueba te para cada variable por separado."
    ],
    [
      25.42,
      "¿Por qué no es lo mismo?"
    ],
    [
      31.36,
      "Por dos razones."
    ],
    [
      32.79,
      "Primero, cada prueba tiene su propio riesgo de error, y al hacer varias, el error global se acumula."
    ],
    [
      38.87,
      "Segundo, las pruebas separadas ignoran la correlación entre las variables."
    ],
    [
      43.44,
      "Puede pasar que ninguna prueba individual rechace, y la conjunta sí."
    ],
    [
      47.61,
      "O al revés."
    ],
    [
      49.26,
      "Hay una forma visual de verlo."
    ],
    [
      51.27,
      "Con dos variables, la región de aceptación de las pruebas separadas es un rectángulo."
    ],
    [
      56.26,
      "La de la prueba conjunta es una elipse, inclinada según la correlación."
    ],
    [
      60.98,
      "Y un punto puede estar dentro del rectángulo y fuera de la elipse."
    ],
    [
      65.5,
      "El supuesto es que los datos vienen de una normal multivariada."
    ],
    [
      69.03,
      "Y antes de aplicar la prueba, conviene verificarlo con el test de Mardia."
    ],
    [
      75.66,
      "La te cuadrado de Hotelling es la versión multivariada de la te de Student."
    ],
    [
      80.13,
      "Es ene, por la diferencia entre el vector de medias y mu cero, traspuesta, por la inversa de la matriz de covarianza, por esa misma diferencia."
    ],
    [
      88.84,
      "Mide qué tan lejos está el vector de medias de mu cero, pero usando la matriz de covarianza para pesar cada dirección."
    ],
    [
      96.18,
      "Con una sola variable, la te cuadrado de Hotelling es exactamente te al cuadrado."
    ],
    [
      101.52,
      "Para decidir, se transforma en una efe: ene menos pe, sobre ene menos uno por pe, por te cuadrado, sigue una efe con pe y ene menos pe grados de libertad."
    ],
    [
      110.9,
      "Si esa efe supera el valor crítico, o si el pe valor es menor que alfa, se rechaza."
    ],
    [
      116.19,
      "El error típico es olvidar esa constante delante, y comparar te cuadrado directamente con la efe."
    ],
    [
      124.0,
      "Veamos un ejemplo con diez observaciones de dos variables, y la hipótesis de que el vector de medias es trece coma nueve."
    ],
    [
      131.22,
      "Las medias de la muestra son trece coma noventa y uno, y nueve coma veintiuno."
    ],
    [
      135.78,
      "La te cuadrado da tres coma cinco dos."
    ],
    [
      138.32,
      "Multiplicada por ocho sobre dieciocho, la efe es uno coma cinco siete, con dos y ocho grados de libertad."
    ],
    [
      144.66,
      "El pe valor, cero coma veintisiete."
    ],
    [
      146.93,
      "¿Se rechaza?"
    ],
    [
      151.58,
      "No."
    ],
    [
      152.26,
      "El pe valor es mucho mayor a cero coma cero cinco."
    ],
    [
      155.18,
      "Dicho de otra forma: el crítico para te cuadrado es diez coma cero tres, y tres coma cinco no llega."
    ],
    [
      161.32,
      "En el gráfico, mu cero cae dentro de la elipse de confianza."
    ],
    [
      165.52,
      "En erre, se puede calcular a mano con álgebra de matrices: colMeans, cov, y solve para la inversa."
    ],
    [
      171.47,
      "O con la función HotellingsT2, del paquete ICSNP."
    ],
    [
      176.86,
      "La región de confianza para el vector de medias es justamente esa elipse, centrada en el vector de medias de la muestra."
    ],
    [
      183.65,
      "Sus ejes y su inclinación salen de los valores y vectores propios de la matriz de covarianza."
    ],
    [
      188.84,
      "Si mu cero cae adentro, no se rechaza."
    ],
    [
      191.44,
      "Si cae afuera, se rechaza."
    ],
    [
      193.35,
      "Es la misma información, dicha de dos formas."
    ],
    [
      198.0,
      "Si la prueba rechaza, la pregunta natural es: ¿qué variable, o qué combinación de variables, es la responsable?"
    ],
    [
      204.83,
      "Para eso están los intervalos simultáneos."
    ],
    [
      207.43,
      "Son intervalos para cada media, o para cualquier combinación lineal de ellas, que mantienen una confianza global del noventa y cinco por ciento, todos a la vez."
    ],
    [
      217.86,
      "El intervalo que no contiene el valor de hache cero es el que señala dónde está la diferencia."
    ],
    [
      223.58,
      "El ejemplo de la clase es el de la corteza de los árboles."
    ],
    [
      226.86,
      "Se midió el depósito de corcho en veintiocho árboles, en cuatro direcciones: norte, sur, este y oeste."
    ],
    [
      233.26,
      "La te cuadrado da veinte coma siete cuatro, y el pe valor, cero coma cero cero dos."
    ],
    [
      238.42,
      "Se rechaza que el depósito sea igual en las cuatro direcciones."
    ],
    [
      242.07,
      "Los intervalos simultáneos muestran que norte más sur, contra este más oeste, no contiene el cero."
    ],
    [
      247.91,
      "Los otros dos contrastes sí lo contienen."
    ],
    [
      250.4,
      "La diferencia está entre el eje norte sur y el eje este oeste."
    ],
    [
      254.53,
      "Hay una alternativa, los intervalos de Bonferroni, que reparten el alfa entre las pe medias."
    ],
    [
      260.23,
      "¿Cuáles son más angostos?"
    ],
    [
      265.4,
      "Los de Bonferroni, si solo interesan las medias originales."
    ],
    [
      269.33,
      "Los de te cuadrado son más anchos porque valen para cualquier combinación lineal."
    ],
    [
      274.34,
      "En el ejemplo de diez datos, el factor de te cuadrado es tres coma diecisiete, y el de Bonferroni, dos coma sesenta y nueve."
    ],
    [
      283.85,
      "En resumen: para probar un vector de medias se usa una prueba conjunta, no varias te separadas."
    ],
    [
      289.48,
      "La te cuadrado de Hotelling se transforma en una efe con pe y ene menos pe grados de libertad."
    ],
    [
      294.93,
      "Su región de confianza es una elipse."
    ],
    [
      297.32,
      "Y si se rechaza, los intervalos simultáneos muestran qué variable o combinación lo explica."
    ],
    [
      303.21,
      "Eso fue el módulo ocho."
    ]
  ],
  "huella": "849ea6eb7daa"
});
