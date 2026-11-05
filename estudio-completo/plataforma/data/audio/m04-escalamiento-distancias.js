/* GENERADO por tools/generar_audio.py desde tools/guiones/m04-escalamiento-distancias.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m04-escalamiento-distancias",
  "modulo": "m04-escalamiento-distancias",
  "titulo": "Escalamiento, distancias y similitud",
  "archivo": "audio/m04-escalamiento-distancias.mp3",
  "duracion": 291,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Por qué escalar"
    },
    {
      "t": 48.4,
      "titulo": "Cuatro formas de escalar"
    },
    {
      "t": 165.2,
      "titulo": "Distancias"
    },
    {
      "t": 206.4,
      "titulo": "Similitud: dirección y patrón"
    },
    {
      "t": 264.7,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "prob": 4.76,
    "prob-ej": 8.0,
    "prob-q": 11.74,
    "prob-r": 20.63,
    "cuando": 30.39,
    "cuando-1": 33.32,
    "cuando-2": 36.18,
    "cuando-3": 38.08,
    "cuando-dep": 41.98,
    "datos": 48.43,
    "mm": 54.67,
    "mm-f": 56.5,
    "mm-r": 61.82,
    "mm-ej": 63.99,
    "mm-ej2": 69.03,
    "mm-inv": 73.33,
    "mm-inv-ej": 78.88,
    "mm-inv-uso": 84.91,
    "mm-trampa": 91.04,
    "mm-trampa-r": 101.59,
    "z": 111.45,
    "z-f": 114.84,
    "z-r": 119.15,
    "z-ej": 123.59,
    "z-erre": 134.11,
    "rob": 136.66,
    "rob-f": 139.04,
    "rob-por": 143.76,
    "rob-uso": 149.97,
    "l2": 152.94,
    "l2-uso": 160.13,
    "dist": 165.2,
    "dist-ej": 168.46,
    "dist-dif": 172.29,
    "euc": 176.83,
    "euc-c": 179.24,
    "euc-r": 183.78,
    "man": 185.58,
    "man-c": 189.48,
    "man-r": 190.47,
    "man-ojo": 191.15,
    "dist-erre": 196.17,
    "dist-est": 199.45,
    "sim": 206.44,
    "cos": 214.37,
    "cos-r": 221.3,
    "corr": 224.39,
    "corr-ej": 230.48,
    "corr-ej-sin": 234.97,
    "corr-ej-con": 240.41,
    "corr-q": 245.72,
    "corr-qr": 251.22,
    "c": 264.75,
    "c1": 265.48,
    "c2": 271.42,
    "c3": 279.38,
    "c4": 284.46,
    "fin": 288.41
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo cuatro: escalamiento, distancias y similitud."
    ],
    [
      4.76,
      "Imagina que comparas personas por su edad y su ingreso."
    ],
    [
      8.0,
      "Dos personas que difieren en treinta años y en un millón de pesos."
    ],
    [
      11.74,
      "Si calculas la distancia entre ellas con esos números tal cual, ¿qué variable crees que manda?"
    ],
    [
      20.63,
      "El ingreso, por lejos."
    ],
    [
      22.55,
      "Un millón pesa muchísimo más que treinta."
    ],
    [
      25.05,
      "La edad casi no cuenta, y no porque sea menos importante, sino por sus unidades."
    ],
    [
      30.39,
      "Por eso se recomienda escalar en tres situaciones: cuando las variables están en unidades distintas, cuando se van a usar distancias, y cuando se va a aplicar componentes principales o clastering."
    ],
    [
      41.98,
      "Qué método usar depende de lo que viene después, y de si hay valores atípicos."
    ],
    [
      48.43,
      "Para ver los métodos, usemos los datos de la clase: diez, doce, quince, veinte y veinticinco."
    ],
    [
      54.67,
      "El primero es min max."
    ],
    [
      56.5,
      "A cada dato se le resta el mínimo, y se divide por el rango, el máximo menos el mínimo."
    ],
    [
      61.82,
      "Así todo queda entre cero y uno."
    ],
    [
      63.99,
      "El mínimo es diez y el rango quince."
    ],
    [
      66.31,
      "El diez queda en cero, el veinticinco en uno, y el quince queda en cinco quinceavos, cero coma tres tres."
    ],
    [
      73.33,
      "Y se puede volver atrás: el valor original es el normalizado, por el rango, más el mínimo."
    ],
    [
      78.88,
      "Un cero coma cinco corresponde a cero coma cinco por quince, más diez: diecisiete coma cinco."
    ],
    [
      84.91,
      "Esto se usa, por ejemplo, para interpretar un centroide de ka medias en las unidades originales."
    ],
    [
      91.04,
      "En la prueba uno hubo una afirmación: min max deja los datos con media cero y varianza uno."
    ],
    [
      96.6,
      "¿Verdadero o falso?"
    ],
    [
      101.59,
      "Falso."
    ],
    [
      103.34,
      "Los deja entre cero y uno, pero la media y la varianza quedan donde caigan."
    ],
    [
      107.76,
      "Media cero y varianza uno es lo que hace el puntaje zeta."
    ],
    [
      111.45,
      "Justamente, el segundo método es el puntaje zeta."
    ],
    [
      114.84,
      "A cada dato se le resta la media y se divide por la desviación estándar."
    ],
    [
      119.15,
      "Cada valor queda expresado como cuántas desviaciones está sobre o bajo la media."
    ],
    [
      123.59,
      "Con los datos de la clase, la media es dieciséis coma cuatro y la desviación seis coma uno."
    ],
    [
      128.98,
      "El diez queda en menos uno coma cero cinco, y el veinticinco en uno coma cuatro uno."
    ],
    [
      134.11,
      "En erre, la función scale."
    ],
    [
      136.66,
      "El tercero es el escalamiento robusto."
    ],
    [
      139.04,
      "En vez de la media y la desviación, usa la mediana y el rango intercuartílico."
    ],
    [
      143.76,
      "¿Por qué?"
    ],
    [
      144.58,
      "Porque un valor extremo arrastra a la media y a la desviación, pero casi no mueve a la mediana."
    ],
    [
      149.97,
      "Es el que conviene cuando hay atípicos."
    ],
    [
      152.94,
      "Y el cuarto es la normalización ele dos: dividir cada dato por el largo del vector, la raíz de la suma de los cuadrados."
    ],
    [
      160.13,
      "Sirve cuando importa la dirección y no la magnitud."
    ],
    [
      165.2,
      "Una vez escalados los datos, se miden distancias."
    ],
    [
      168.46,
      "Toma dos puntos: a, en dos coma tres, y be, en seis coma ocho."
    ],
    [
      172.29,
      "Difieren en cuatro en la primera variable y en cinco en la segunda."
    ],
    [
      176.83,
      "La distancia euclídea es la línea recta: la raíz de cuatro al cuadrado más cinco al cuadrado, raíz de cuarenta y uno, seis coma cuatro."
    ],
    [
      185.58,
      "La distancia Manhattan es lo que recorrerías por calles en cuadrícula: cuatro más cinco, nueve."
    ],
    [
      191.15,
      "Siempre con las diferencias en valor absoluto."
    ],
    [
      193.79,
      "Si no, se pueden cancelar."
    ],
    [
      196.17,
      "En erre, las dos salen con dist, cambiando el método."
    ],
    [
      199.45,
      "Y recuerda: si las variables están en escalas distintas, primero se estandariza."
    ],
    [
      206.44,
      "A veces no importa qué tan lejos están dos observaciones, sino si apuntan hacia el mismo lado."
    ],
    [
      212.09,
      "Para eso está la similitud."
    ],
    [
      214.37,
      "La similitud coseno mide el ángulo entre dos vectores: el producto punto, dividido por el producto de sus largos."
    ],
    [
      221.3,
      "Si apuntan exactamente igual, da uno."
    ],
    [
      224.39,
      "Y la correlación resulta ser lo mismo, pero con los vectores centrados: primero se les resta su media."
    ],
    [
      230.48,
      "En la clase: equis es uno, dos, tres, cuatro, y ye es dos, ocho, seis, ocho."
    ],
    [
      234.97,
      "Sin centrar, el coseno da cero coma noventa y seis: los vectores apuntan casi igual."
    ],
    [
      240.41,
      "Centrados, da cero coma setenta y tres, que es exactamente la correlación."
    ],
    [
      245.72,
      "¿Por qué cambia tanto al centrar?"
    ],
    [
      251.22,
      "Porque sin centrar, los dos vectores son todos positivos y apuntan hacia la misma zona solo por estar lejos del origen."
    ],
    [
      257.96,
      "Al centrar, se mira el patrón: si suben y bajan juntos respecto de su media."
    ],
    [
      264.75,
      "En resumen: se escala cuando hay unidades distintas, distancias, o componentes principales y clastering."
    ],
    [
      271.42,
      "Min max deja todo entre cero y uno; el puntaje zeta, media cero y desviación uno; el robusto usa mediana y rango intercuartílico."
    ],
    [
      279.38,
      "La euclídea es la línea recta; la Manhattan, la suma de las diferencias absolutas."
    ],
    [
      284.46,
      "Y la correlación es el coseno de los vectores centrados."
    ],
    [
      288.41,
      "Eso fue el módulo cuatro."
    ]
  ],
  "huella": "3d1d814d5c5b"
});
