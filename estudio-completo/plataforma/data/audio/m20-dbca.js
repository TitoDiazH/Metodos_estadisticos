/* GENERADO por tools/generar_audio.py desde tools/guiones/m20-dbca.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m20-dbca",
  "modulo": "m20-dbca",
  "titulo": "Diseño en bloques completos al azar",
  "archivo": "audio/m20-dbca.mp3",
  "duracion": 583,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Un factor que molesta"
    },
    {
      "t": 71.0,
      "titulo": "Cómo se arma el diseño"
    },
    {
      "t": 142.4,
      "titulo": "La tabla ANOVA, paso a paso"
    },
    {
      "t": 279.2,
      "titulo": "En erre"
    },
    {
      "t": 348.1,
      "titulo": "Leer el efecto de bloque"
    },
    {
      "t": 386.2,
      "titulo": "La diferencia mínima significativa"
    },
    {
      "t": 437.1,
      "titulo": "El ejercicio de la prueba"
    },
    {
      "t": 561.0,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "problema": 6.35,
    "mal": 12.9,
    "lento": 16.2,
    "confundido": 27.59,
    "bien": 33.59,
    "bloque": 42.8,
    "def": 46.84,
    "def-para": 53.45,
    "ejemplos": 64.21,
    "diseno": 71.03,
    "completo": 73.46,
    "azar": 77.52,
    "dentro": 80.94,
    "dca": 84.24,
    "noentre": 91.53,
    "modelo": 98.72,
    "mod-mu": 102.28,
    "mod-tau": 104.44,
    "mod-gamma": 106.26,
    "mod-eps": 107.78,
    "sup-normal": 109.47,
    "aditivo": 115.26,
    "h0t": 129.52,
    "h0b": 134.61,
    "tabla": 142.41,
    "fila-bloque": 146.82,
    "totales": 151.34,
    "corr": 154.24,
    "sct-f": 164.23,
    "sctr-f": 169.65,
    "scb-f": 177.06,
    "sce-f": 183.38,
    "divisor": 186.02,
    "divisor-r": 197.38,
    "gl": 210.95,
    "ens": 218.83,
    "e-corr": 220.94,
    "e-sct": 229.99,
    "e-sctr": 232.64,
    "e-scb": 235.34,
    "e-sce": 238.11,
    "e-glq": 240.9,
    "e-gl": 249.62,
    "e-cme": 251.48,
    "e-fm": 256.26,
    "e-fo": 264.04,
    "e-conc": 271.43,
    "r": 279.21,
    "r-aov": 283.98,
    "r-factor": 288.56,
    "r-mas": 300.04,
    "r-mas-r": 312.11,
    "r-celda": 316.79,
    "r-lsd": 321.94,
    "r-grupos": 329.96,
    "r-medias": 335.76,
    "r-dif": 343.44,
    "bl": 348.15,
    "bl-si": 350.54,
    "bl-no": 357.21,
    "bl-elegir": 366.25,
    "bl-ens": 379.77,
    "lsd": 386.22,
    "lsd-f": 395.09,
    "lsd-gl": 407.16,
    "lsd-b": 413.32,
    "lsd-num": 416.96,
    "lsd-val": 424.9,
    "lsd-si": 428.42,
    "lsd-no": 432.4,
    "f": 437.1,
    "f-sect": 444.23,
    "f-tot": 451.57,
    "f-sc": 457.91,
    "f-sctr": 461.93,
    "f-scb": 463.73,
    "f-sce": 464.87,
    "f-cme": 469.42,
    "f-ft": 472.15,
    "f-ftc": 476.45,
    "f-fb": 484.16,
    "f-lsd": 493.21,
    "f-medias": 496.01,
    "f-par": 507.07,
    "f-dca": 514.28,
    "f-mueve": 526.8,
    "f-err": 530.59,
    "f-dcaf": 537.5,
    "f-nada": 544.49,
    "f-moraleja": 549.47,
    "c": 561.0,
    "c-dca": 561.87,
    "c-dbca": 565.58,
    "c-fact": 573.16,
    "fin": 581.11
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo veinte: el diseño en bloques completos al azar, que vamos a llamar de be ce a."
    ],
    [
      6.35,
      "Imagina que quieres comparar cuatro métodos de ensamble para ver cuál es más rápido, y tienes cuatro operadores."
    ],
    [
      12.9,
      "Lo más intuitivo sería darle un método a cada operador."
    ],
    [
      16.2,
      "Pero piensa en esto: si el operador uno es más lento que los demás, ¿cómo sabes si su método es malo o si simplemente él es lento?"
    ],
    [
      27.59,
      "No puedes saberlo."
    ],
    [
      29.01,
      "El efecto del método queda confundido con el efecto del operador."
    ],
    [
      33.59,
      "La salida es que cada operador pruebe los cuatro métodos."
    ],
    [
      37.12,
      "Así, las diferencias entre operadores se pueden separar de las diferencias entre métodos."
    ],
    [
      42.8,
      "En este diseño, el operador es lo que llamamos un bloque."
    ],
    [
      46.84,
      "Un bloque es justamente eso: un factor que no nos interesa estudiar, pero que sabemos que mueve la respuesta."
    ],
    [
      53.45,
      "No lo incluimos porque queramos saber cuál operador es mejor, sino para que su variabilidad no se mezcle con la del factor que sí nos importa, y así bajar el error experimental."
    ],
    [
      64.21,
      "Otros bloques típicos son el día, el lote de material o el sector de un terreno."
    ],
    [
      71.03,
      "¿Por qué se llama bloques completos al azar?"
    ],
    [
      73.46,
      "Completos, porque en cada bloque se prueban todos los tratamientos."
    ],
    [
      77.52,
      "Y al azar, porque el orden en que se prueban se sortea."
    ],
    [
      80.94,
      "Pero ojo: se sortea dentro de cada bloque."
    ],
    [
      84.24,
      "Esa es la gran diferencia con el diseño completamente al azar, el ce a."
    ],
    [
      88.51,
      "Ahí se aleatorizaban todas las corridas juntas."
    ],
    [
      91.53,
      "Acá no: cada operador tiene su propio sorteo, y lo que no se puede hacer es aleatorizar de un bloque a otro."
    ],
    [
      98.72,
      "El modelo es el del ANOVA de un factor, con un término más."
    ],
    [
      102.28,
      "Cada observación es la media global, más el efecto del tratamiento, más el efecto del bloque, más un error aleatorio."
    ],
    [
      109.47,
      "Los errores se suponen independientes y normales, con media cero y varianza constante."
    ],
    [
      115.26,
      "Hay un supuesto adicional que conviene tener muy presente: el modelo es aditivo."
    ],
    [
      120.09,
      "No hay interacción entre tratamiento y bloque."
    ],
    [
      122.79,
      "Es decir, se asume que un método es más rápido o más lento de la misma manera para todos los operadores."
    ],
    [
      129.52,
      "La hipótesis que más interesa es que los efectos de todos los tratamientos son cero."
    ],
    [
      134.61,
      "Y en la prueba suelen pedir también la del bloque: que los efectos de los bloques son todos cero."
    ],
    [
      142.41,
      "La tabla ANOVA del de be ce a tiene una fila más que la del ANOVA de un factor: la del bloque."
    ],
    [
      147.94,
      "Quedan tratamientos, bloques, error y total."
    ],
    [
      151.34,
      "Para calcularla a mano se trabaja con totales."
    ],
    [
      154.24,
      "Primero viene el término de corrección: el gran total al cuadrado, dividido por el número total de datos."
    ],
    [
      160.61,
      "Ese término se resta en todas las sumas de cuadrados."
    ],
    [
      164.23,
      "La suma de cuadrados total es la suma de todos los datos al cuadrado, menos la corrección."
    ],
    [
      169.65,
      "La de tratamientos se obtiene sumando cada total de tratamiento al cuadrado, dividido por el número de bloques, y restando la corrección."
    ],
    [
      177.06,
      "La de bloques es igual, pero con los totales de bloque al cuadrado, divididos por el número de tratamientos."
    ],
    [
      183.38,
      "Y la del error sale por diferencia."
    ],
    [
      186.02,
      "Detente un momento en eso."
    ],
    [
      187.89,
      "¿Por qué el total de un tratamiento se divide por el número de bloques, y no por el de tratamientos?"
    ],
    [
      197.38,
      "Porque cada total de tratamiento suma un dato por cada bloque."
    ],
    [
      201.01,
      "Si hay cuatro operadores, ese total junta cuatro datos, y por eso se divide por cuatro."
    ],
    [
      206.46,
      "Confundir esos divisores es de los errores más comunes en la prueba."
    ],
    [
      210.95,
      "Los grados de libertad son: tratamientos, ka menos uno; bloques, be menos uno; y el error, ka menos uno por be menos uno."
    ],
    [
      218.83,
      "Veamos los números del ensamble."
    ],
    [
      220.94,
      "El gran total es ciento sesenta minutos, con dieciséis datos, así que la corrección es ciento sesenta al cuadrado sobre dieciséis: mil seiscientos."
    ],
    [
      229.99,
      "La suma de cuadrados total da ciento ocho."
    ],
    [
      232.64,
      "La de métodos, sesenta y uno coma cinco."
    ],
    [
      235.34,
      "La de operadores, veintiocho coma cinco."
    ],
    [
      238.11,
      "Y el error, por diferencia, dieciocho."
    ],
    [
      240.9,
      "¿Cuántos grados de libertad tiene ese error, con cuatro métodos y cuatro operadores?"
    ],
    [
      249.62,
      "Nueve: tres por tres."
    ],
    [
      251.48,
      "Así que el cuadrado medio del error es dieciocho dividido en nueve, o sea dos."
    ],
    [
      256.26,
      "El efe de los métodos es veinte coma cinco dividido en dos, diez coma veinticinco, con un pe valor de cero coma cero cero tres."
    ],
    [
      264.04,
      "Y el de los operadores es nueve coma cinco dividido en dos, cuatro coma setenta y cinco, con pe valor cero coma cero tres."
    ],
    [
      271.43,
      "Los dos son significativos: los métodos difieren, y el operador también influye en el tiempo."
    ],
    [
      279.21,
      "En erre esto es muy directo."
    ],
    [
      281.14,
      "Se crean el método y el operador como factores, y se ajusta a o ve con la respuesta, tilde, método más operador."
    ],
    [
      288.56,
      "Un detalle importante: si el operador viene codificado con números, hay que pasarlo por factor."
    ],
    [
      294.4,
      "Si no, erre lo trata como una variable numérica y le da un solo grado de libertad."
    ],
    [
      300.04,
      "Y otro detalle: en la fórmula va un signo más, no un asterisco."
    ],
    [
      304.0,
      "¿Por qué no se pone el asterisco, que agregaría la interacción?"
    ],
    [
      312.11,
      "Por dos razones."
    ],
    [
      313.54,
      "El modelo del de be ce a supone que no hay interacción."
    ],
    [
      316.79,
      "Y con una sola observación por celda, no quedarían datos para estimar el error."
    ],
    [
      321.94,
      "Para las comparaciones se usa la función ele ese de punto test, del paquete agricolae, dándole el modelo y el nombre del tratamiento."
    ],
    [
      329.96,
      "En la salida, los tratamientos se agrupan con letras: si dos comparten una letra, no difieren."
    ],
    [
      335.76,
      "En el ensamble, el método ce tiene la media más alta, unos doce coma ocho minutos, y el método a la más baja, siete coma cinco."
    ],
    [
      343.44,
      "Ce difiere de a y de be, y de difiere de a."
    ],
    [
      348.15,
      "¿Y qué hago con el resultado del bloque?"
    ],
    [
      350.54,
      "Si sale significativo, el bloqueo valió la pena: ese factor sí movía la respuesta y fue bueno controlarlo."
    ],
    [
      357.21,
      "Si no sale significativo, los bloques son parecidos entre sí, y eso es un argumento para no controlar ese factor en experimentos futuros."
    ],
    [
      366.25,
      "Hay algo que conviene tener claro."
    ],
    [
      368.37,
      "Con los tratamientos uno busca el mejor."
    ],
    [
      371.12,
      "Con los bloques, no."
    ],
    [
      372.89,
      "No se trata de elegir al mejor operador, sino de tomar decisiones, por ejemplo, darle más entrenamiento a alguno."
    ],
    [
      379.77,
      "En el ensamble, el operador uno es el que se diferencia del operador dos."
    ],
    [
      386.22,
      "La ele ese de, o diferencia mínima significativa, es la distancia mínima que tiene que haber entre dos medias para decir que son distintas."
    ],
    [
      395.09,
      "En el de be ce a se calcula como el te de Student, con alfa medio y los grados de libertad del error, multiplicado por la raíz de dos veces el cuadrado medio del error, dividido por el número de bloques."
    ],
    [
      407.16,
      "Fíjate en dos cosas."
    ],
    [
      408.84,
      "Los grados de libertad son los del error del de be ce a, no los del ce a."
    ],
    [
      413.32,
      "Y el número de bloques cumple el papel de las réplicas."
    ],
    [
      416.96,
      "En el ensamble, el te con nueve grados de libertad es dos coma doscientos sesenta y dos, y la raíz de dos por dos sobre cuatro es uno."
    ],
    [
      424.9,
      "Así que la ele ese de vale dos coma doscientos sesenta y dos."
    ],
    [
      428.42,
      "Con eso, a contra ce, a contra de, y be contra ce son distintos."
    ],
    [
      432.4,
      "En cambio, a con be, be con de, y ce con de, no."
    ],
    [
      437.1,
      "El ejercicio típico de prueba fue con fertilizantes."
    ],
    [
      440.49,
      "Tres fertilizantes, y el rendimiento en kilos por parcela."
    ],
    [
      444.23,
      "Como la fertilidad del suelo no es pareja, el terreno se divide en cuatro sectores, y esos sectores son los bloques."
    ],
    [
      451.57,
      "Los totales de los fertilizantes son ochenta y ocho, cien y ciento doce, y el gran total, trescientos."
    ],
    [
      457.91,
      "Las sumas de cuadrados quedan así: total, ciento cincuenta y seis; fertilizantes, setenta y dos; sectores, sesenta; y el error, por diferencia, veinticuatro, con seis grados de libertad."
    ],
    [
      469.42,
      "El cuadrado medio del error es cuatro."
    ],
    [
      472.15,
      "El efe de los fertilizantes es treinta y seis sobre cuatro, nueve."
    ],
    [
      476.45,
      "El valor crítico con dos y seis grados de libertad es cinco coma catorce, así que se rechaza: los fertilizantes difieren."
    ],
    [
      484.16,
      "El efe del sector es veinte sobre cuatro, cinco, contra un crítico de cuatro coma setenta y seis."
    ],
    [
      490.12,
      "También significativo, aunque por poco."
    ],
    [
      493.21,
      "La ele ese de da tres coma cuarenta y seis."
    ],
    [
      496.01,
      "Las medias de los fertilizantes son veintidós, veinticinco y veintiocho."
    ],
    [
      500.65,
      "¿Qué par supera esa diferencia?"
    ],
    [
      507.07,
      "Solo el fertilizante tres contra el uno, que difieren en seis."
    ],
    [
      511.13,
      "Así que se recomienda el fertilizante tres."
    ],
    [
      514.28,
      "Y ahora viene la parte que más enseña de este ejercicio."
    ],
    [
      517.76,
      "¿Qué habría pasado si no se hubiera bloqueado, y se analizara todo como un ce a?"
    ],
    [
      526.8,
      "La suma de cuadrados del sector, esos sesenta, se iría al error."
    ],
    [
      530.59,
      "El error pasaría a ochenta y cuatro con nueve grados de libertad, y su cuadrado medio subiría de cuatro a más de nueve."
    ],
    [
      537.5,
      "El efe de los fertilizantes caería a tres coma ochenta y seis, que no alcanza el crítico de cuatro coma veintiséis."
    ],
    [
      544.49,
      "Sin bloque, no habríamos visto ninguna diferencia entre fertilizantes."
    ],
    [
      549.47,
      "Por eso, aunque el efe del bloque apenas pase el crítico, no se puede decir que el bloqueo no sirvió."
    ],
    [
      555.29,
      "Fue justamente lo que permitió ver el efecto del fertilizante."
    ],
    [
      561.0,
      "Para ubicarte: si tienes un solo factor y unidades parejas, usas el ce a."
    ],
    [
      565.58,
      "Si además hay un factor que molesta, como el operador, el día o el sector, lo bloqueas, y en erre lo agregas con un signo más."
    ],
    [
      573.16,
      "Y si todos los factores te interesan, ya no es bloqueo: es un diseño factorial, que es lo que viene en los próximos módulos."
    ],
    [
      581.11,
      "Eso fue el módulo veinte."
    ]
  ],
  "huella": "17a18681f175"
});
