/* GENERADO por tools/generar_audio.py desde tools/guiones/m13-k-medias.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m13-k-medias",
  "modulo": "m13-k-medias",
  "titulo": "K-medias y elección de k",
  "archivo": "audio/m13-k-medias.mp3",
  "duracion": 386,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Partir directamente en k grupos"
    },
    {
      "t": 38.2,
      "titulo": "El algoritmo"
    },
    {
      "t": 153.5,
      "titulo": "La inicialización"
    },
    {
      "t": 189.0,
      "titulo": "En erre"
    },
    {
      "t": 248.8,
      "titulo": "Elegir k con el codo"
    },
    {
      "t": 291.9,
      "titulo": "La silueta"
    },
    {
      "t": 355.7,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "idea": 5.16,
    "centro": 15.52,
    "obj": 21.04,
    "wss": 26.52,
    "alg": 38.18,
    "alg-ini": 41.03,
    "alg-asig": 43.95,
    "alg-act": 47.51,
    "alg-rep": 51.61,
    "ej": 58.23,
    "ej-ini": 63.12,
    "it1": 66.37,
    "it1-e2": 71.29,
    "it1-e5": 77.75,
    "it1-e7": 82.93,
    "it1-r": 86.68,
    "mu": 91.47,
    "mu1": 93.89,
    "mu1-v": 107.01,
    "mu2": 109.61,
    "it2": 115.56,
    "it2-r": 124.8,
    "conv": 130.9,
    "local": 136.13,
    "local-r": 143.62,
    "ini": 153.54,
    "pp": 160.31,
    "nstart": 172.7,
    "nstart-r": 179.2,
    "r": 188.99,
    "r1": 190.84,
    "r2": 193.19,
    "r3": 197.5,
    "r-ej": 206.62,
    "r-cent": 213.29,
    "r-num": 223.94,
    "minmax": 230.13,
    "minmax-f": 234.31,
    "minmax-ej": 241.0,
    "codo": 248.77,
    "codo-q": 251.64,
    "codo-r": 261.78,
    "codo-idea": 267.63,
    "codo-ej": 273.45,
    "codo-1": 275.01,
    "codo-2": 280.27,
    "codo-3": 282.5,
    "codo-4": 284.58,
    "codo-k": 286.82,
    "sil": 291.91,
    "sil-a": 298.0,
    "sil-b": 305.81,
    "sil-f": 311.28,
    "sil-rango": 315.41,
    "sil-1": 317.1,
    "sil-0": 320.47,
    "sil-neg": 323.73,
    "sil-neg-r": 328.74,
    "sil-ej": 336.04,
    "sil-ej-r": 343.95,
    "sil-regla": 348.28,
    "c": 355.71,
    "c1": 356.41,
    "c2": 362.89,
    "c3": 365.41,
    "c4": 368.74,
    "c5": 372.83,
    "fin": 383.72
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo trece: ka medias, y cómo elegir el número de clústeres."
    ],
    [
      5.16,
      "Los métodos jerárquicos construían un árbol entero."
    ],
    [
      8.23,
      "Ka medias hace otra cosa: tú le dices cuántos grupos quieres, ka, y él reparte los datos directamente en esos ka grupos."
    ],
    [
      15.52,
      "Cada grupo tiene un centro, el centroide, que es simplemente la media de sus puntos."
    ],
    [
      21.04,
      "¿Qué busca?"
    ],
    [
      22.56,
      "Que cada grupo sea lo más compacto posible alrededor de su centroide."
    ],
    [
      26.52,
      "Formalmente, minimiza la suma de las distancias al cuadrado de cada punto a su centroide."
    ],
    [
      31.99,
      "Esa suma se llama W S S, la suma de cuadrados dentro de los clústeres."
    ],
    [
      38.18,
      "El algoritmo es un ir y venir entre dos pasos."
    ],
    [
      41.03,
      "Se parte eligiendo ka centroides iniciales."
    ],
    [
      43.95,
      "Después, cada punto se asigna al centroide más cercano."
    ],
    [
      47.51,
      "Luego se recalcula cada centroide como la media de los puntos que le tocaron."
    ],
    [
      51.61,
      "Y se repite: asignar, recalcular, asignar, recalcular, hasta que las asignaciones dejan de cambiar."
    ],
    [
      58.23,
      "Veámoslo con las cinco empresas estandarizadas de la clase, con ka igual a dos."
    ],
    [
      63.12,
      "Los centroides iniciales son E uno y E ocho."
    ],
    [
      66.37,
      "Primera iteración: a cada empresa se le mide la distancia a los dos centroides."
    ],
    [
      71.29,
      "E dos está a cero coma sesenta y cinco del primero, y a dos coma noventa y dos del segundo: va al grupo uno."
    ],
    [
      77.75,
      "E cinco está a uno coma sesenta y cuatro y a dos coma sesenta: también al grupo uno."
    ],
    [
      82.93,
      "Y E siete, a cero coma cuarenta y dos del segundo: grupo dos."
    ],
    [
      86.68,
      "Quedan E uno, E dos y E cinco en un grupo, y E siete y E ocho en el otro."
    ],
    [
      91.47,
      "Ahora se recalculan los centroides."
    ],
    [
      93.89,
      "El primero es el promedio de las tres empresas del grupo uno: en inversión, menos cero coma setenta y nueve, menos uno coma cero dos, más cero coma ochenta y cinco, todo dividido en tres, menos cero coma treinta y dos."
    ],
    [
      107.01,
      "Y en ventas, menos uno coma cero nueve."
    ],
    [
      109.61,
      "El segundo, el promedio de E siete y E ocho: cero coma noventa y nueve, y uno coma catorce."
    ],
    [
      115.56,
      "Segunda iteración, con los centroides nuevos."
    ],
    [
      118.77,
      "¿Crees que alguna empresa cambia de grupo?"
    ],
    [
      124.8,
      "Ninguna."
    ],
    [
      125.77,
      "Las distancias cambian un poco, pero cada empresa sigue más cerca del mismo centroide."
    ],
    [
      130.9,
      "Y cuando nada cambia, el algoritmo terminó."
    ],
    [
      133.65,
      "Convergió en dos iteraciones."
    ],
    [
      136.13,
      "Un detalle que es pregunta típica: ka medias siempre converge, porque la W S S baja en cada paso y no puede bajar de cero."
    ],
    [
      143.62,
      "Pero converge a un óptimo local, no necesariamente al mejor agrupamiento posible."
    ],
    [
      148.87,
      "Depende de dónde partieron los centroides."
    ],
    [
      153.54,
      "Por eso importa cómo se eligen los centroides iniciales."
    ],
    [
      157.14,
      "Si quedan muy juntos, el resultado puede ser malo."
    ],
    [
      160.31,
      "Una solución es ka medias más más: elige el primer centroide al azar, y cada siguiente con probabilidad proporcional a la distancia al cuadrado al centroide más cercano."
    ],
    [
      170.74,
      "Así quedan bien dispersos."
    ],
    [
      172.7,
      "La otra solución, la que se usa en la clase, es probar muchas inicializaciones y quedarse con la mejor."
    ],
    [
      179.2,
      "En erre eso es el argumento nstart: con nstart igual a veinticinco, se corre veinticinco veces y se devuelve la de menor W S S."
    ],
    [
      188.99,
      "En erre son tres pasos."
    ],
    [
      190.84,
      "Estandarizar siempre, con scale."
    ],
    [
      193.19,
      "Correr kmeans, con centers igual a ka y nstart igual a veinticinco."
    ],
    [
      197.5,
      "Y leer tres cosas del resultado: cluster, que es el grupo de cada observación; centers, los centroides; y tot punto withinss, la W S S total."
    ],
    [
      206.62,
      "Con las ocho empresas y tres grupos, quedan E uno a E cuatro juntas, E cinco con E seis, y E siete con E ocho."
    ],
    [
      213.29,
      "Los centroides están en unidades estandarizadas: el grupo de las cuatro primeras tiene inversión bajo la media, y los otros dos tienen inversión alta, pero se separan por ventas."
    ],
    [
      223.94,
      "Y ojo: el número de cada clúster es arbitrario."
    ],
    [
      226.99,
      "Con otra semilla pueden salir permutados."
    ],
    [
      230.13,
      "En una pauta de la prueba dos pedían volver a las unidades originales."
    ],
    [
      234.31,
      "Si se normalizó con min max, se despeja: el valor original es el normalizado, por el rango, más el mínimo."
    ],
    [
      241.0,
      "Con mínimo cien y máximo doscientos, un centroide de cero coma dos corresponde a ciento veinte."
    ],
    [
      248.77,
      "Ahora, la gran pregunta: ¿cuántos grupos?"
    ],
    [
      251.64,
      "Si la W S S mide lo compacto que es cada grupo, ¿por qué no elegir el ka con la W S S más baja?"
    ],
    [
      261.78,
      "Porque la W S S siempre baja al agregar grupos."
    ],
    [
      264.84,
      "Con tantos grupos como datos, llega a cero."
    ],
    [
      267.63,
      "Lo que se busca es el codo: el punto donde agregar un grupo más deja de mejorar mucho."
    ],
    [
      273.45,
      "En el ejemplo de la clase, al pasar de uno a dos grupos la W S S baja de cien a sesenta, una mejora de cuarenta."
    ],
    [
      280.27,
      "De dos a tres, baja quince."
    ],
    [
      282.5,
      "De tres a cuatro, solo tres."
    ],
    [
      284.58,
      "Y de cuatro a cinco, uno."
    ],
    [
      286.82,
      "El codo está en tres: desde ahí, la curva se aplana."
    ],
    [
      291.91,
      "La otra herramienta es el coeficiente de silueta, que mide qué tan bien está asignada cada observación."
    ],
    [
      298.0,
      "Se calculan dos cosas."
    ],
    [
      299.92,
      "A de i: la distancia promedio de la observación a los de su propio grupo."
    ],
    [
      304.47,
      "Eso es cohesión."
    ],
    [
      305.81,
      "Y be de i: la distancia promedio al grupo vecino más cercano."
    ],
    [
      309.76,
      "Eso es separación."
    ],
    [
      311.28,
      "La silueta es be menos a, dividido por el mayor de los dos."
    ],
    [
      315.41,
      "Va de menos uno a uno."
    ],
    [
      317.1,
      "Cerca de uno, la observación está muy bien asignada."
    ],
    [
      320.47,
      "Cerca de cero, está en el borde entre dos grupos."
    ],
    [
      323.73,
      "¿Y si sale negativa?"
    ],
    [
      328.74,
      "Quiere decir que está más cerca, en promedio, del grupo vecino que del propio."
    ],
    [
      333.39,
      "Probablemente quedó mal asignada."
    ],
    [
      336.04,
      "En la ayudantía cinco, con seis clientes y dos grupos, todas las siluetas iban de cero coma ochenta y tres a cero coma noventa y dos."
    ],
    [
      343.95,
      "Ninguna cerca de cero, ninguna negativa: ka igual a dos estaba bien."
    ],
    [
      348.28,
      "La regla práctica es usar el codo y la silueta juntos."
    ],
    [
      351.61,
      "Si coinciden, hay confianza."
    ],
    [
      355.71,
      "En resumen: ka medias reparte en ka grupos alternando asignar y recalcular centroides, y converge a un óptimo local."
    ],
    [
      362.89,
      "Para no depender del inicio, nstart."
    ],
    [
      365.41,
      "Para elegir ka, el codo de la W S S, nunca el mínimo."
    ],
    [
      368.74,
      "Y la silueta dice qué tan bien asignada está cada observación."
    ],
    [
      372.83,
      "Frente a los jerárquicos, ka medias es rápido y escala a muchos datos, pero hay que darle ka, es sensible a los atípicos, y prefiere grupos redondos y de tamaño parecido."
    ],
    [
      383.72,
      "Eso fue el módulo trece."
    ]
  ],
  "huella": "de582cc8cf37"
});
