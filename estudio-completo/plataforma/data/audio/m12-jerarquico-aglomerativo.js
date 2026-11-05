/* GENERADO por tools/generar_audio.py desde tools/guiones/m12-jerarquico-aglomerativo.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m12-jerarquico-aglomerativo",
  "modulo": "m12-jerarquico-aglomerativo",
  "titulo": "Clustering jerárquico aglomerativo",
  "archivo": "audio/m12-jerarquico-aglomerativo.mp3",
  "duracion": 297,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "De abajo hacia arriba"
    },
    {
      "t": 74.2,
      "titulo": "La distancia entre dos clústeres"
    },
    {
      "t": 201.7,
      "titulo": "Centroide y Ward"
    },
    {
      "t": 272.4,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "idea": 4.7,
    "aglo": 10.13,
    "desag": 18.14,
    "algo": 26.34,
    "algo1": 28.85,
    "algo2": 31.38,
    "algo3": 33.64,
    "algo4": 37.12,
    "dendro": 40.15,
    "dendro-h": 42.53,
    "corte": 46.87,
    "cutree": 54.66,
    "k-antes": 59.28,
    "k-antes-r": 66.33,
    "link": 74.19,
    "link-r": 84.49,
    "single": 88.6,
    "ej": 97.05,
    "ej1": 101.27,
    "ej2": 106.5,
    "ej3": 109.89,
    "ej3-r": 124.22,
    "ej4": 128.65,
    "cadena": 131.78,
    "complete": 144.14,
    "comp-ej": 152.3,
    "comp-e5": 158.96,
    "comp-fin": 163.12,
    "comp-r": 166.0,
    "average": 171.5,
    "tiendas": 181.63,
    "tiendas-1": 185.71,
    "tiendas-2": 189.22,
    "tiendas-s": 194.32,
    "tiendas-c": 195.54,
    "tiendas-a": 196.83,
    "cent": 201.7,
    "cent-def": 203.46,
    "inv": 210.66,
    "inv-ej": 217.47,
    "ward": 226.75,
    "ward-def": 229.77,
    "ward-r": 235.0,
    "ward-erre": 238.88,
    "inv-q": 244.09,
    "inv-q-r": 251.85,
    "r": 256.82,
    "r-plot": 266.29,
    "c": 272.36,
    "c1": 273.07,
    "c2": 278.83,
    "c3": 285.43,
    "c4": 290.44,
    "fin": 294.56
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo doce: el clastering jerárquico aglomerativo."
    ],
    [
      4.7,
      "Los métodos jerárquicos no entregan una sola partición, sino un árbol completo de uniones."
    ],
    [
      10.13,
      "Si parten con cada observación como su propio clúster, y los van uniendo de a dos, se llaman aglomerativos: van de abajo hacia arriba."
    ],
    [
      18.14,
      "Si parten con todo en un solo grupo y lo van dividiendo, se llaman desagregativos, como DIANA, que viene en el módulo catorce."
    ],
    [
      26.34,
      "El algoritmo aglomerativo es muy simple."
    ],
    [
      28.85,
      "Se parte con ene clústeres de un dato."
    ],
    [
      31.38,
      "Se unen los dos más cercanos."
    ],
    [
      33.64,
      "Se recalculan las distancias del clúster nuevo a los demás."
    ],
    [
      37.12,
      "Y se repite, hasta que queda uno solo."
    ],
    [
      40.15,
      "Todo eso se dibuja en un dendrograma."
    ],
    [
      42.53,
      "La altura de cada unión es la distancia a la que se unieron esos dos clústeres."
    ],
    [
      46.87,
      "Y para obtener los grupos se corta el árbol a cierta altura: el número de ramas que cruza la línea de corte es el número de clústeres."
    ],
    [
      54.66,
      "En erre eso lo hace cutree, dándole el árbol y el número de grupos."
    ],
    [
      59.28,
      "¿Hay que decidir el número de clústeres antes de construir el árbol?"
    ],
    [
      66.33,
      "No."
    ],
    [
      67.0,
      "Se construye el árbol entero, y el número de grupos se decide después, al cortarlo."
    ],
    [
      74.19,
      "Ahora, hay un detalle que cambia todo."
    ],
    [
      76.78,
      "Entre dos observaciones, la distancia es clara."
    ],
    [
      79.88,
      "Pero, ¿cuál es la distancia entre dos clústeres que tienen varios puntos?"
    ],
    [
      84.49,
      "Hay varias respuestas, y cada una es un método distinto."
    ],
    [
      88.6,
      "La primera es single linkage, o vecino más cercano: la distancia entre dos clústeres es la de sus dos puntos más cercanos, el mínimo."
    ],
    [
      97.05,
      "Veámoslo con cinco de las empresas de la clase, ya estandarizadas."
    ],
    [
      101.27,
      "El par más cercano es E siete con E ocho, a cero coma cuarenta y dos, y se unen primero."
    ],
    [
      106.5,
      "Después E uno con E dos, a cero coma sesenta y cinco."
    ],
    [
      109.89,
      "Ahora, ¿a qué distancia queda E cinco del clúster E uno, E dos?"
    ],
    [
      113.91,
      "E cinco está a uno coma sesenta y cuatro de E uno, y a uno coma noventa y siete de E dos."
    ],
    [
      119.14,
      "¿Qué número usa single?"
    ],
    [
      124.22,
      "El mínimo: uno coma sesenta y cuatro."
    ],
    [
      126.65,
      "Y E cinco se une a ese grupo."
    ],
    [
      128.65,
      "La última unión queda a dos coma veintiocho."
    ],
    [
      131.78,
      "Single tiene un problema conocido: el efecto cadena."
    ],
    [
      135.28,
      "Como basta con que un punto esté cerca de uno solo de los miembros, los clústeres van creciendo como una cadena, largos y filamentosos."
    ],
    [
      144.14,
      "La alternativa es complete linkage, o vecino más lejano: la distancia entre clústeres es la de sus dos puntos más lejanos, el máximo."
    ],
    [
      152.3,
      "Con las mismas empresas, las dos primeras uniones son iguales, porque con clústeres de un solo punto no hay diferencia."
    ],
    [
      158.96,
      "Pero E cinco ahora queda a uno coma noventa y siete del grupo, el máximo, y la última unión sube a tres coma veintidós."
    ],
    [
      166.0,
      "Complete es más conservador: une a mayor altura, y forma clústeres compactos."
    ],
    [
      171.5,
      "Entre los dos está el average linkage, o promedio: la distancia entre dos clústeres es el promedio de todas las distancias entre pares, un punto de cada clúster."
    ],
    [
      181.63,
      "En la ayudantía cinco había cinco tiendas, con distancia Manhattan."
    ],
    [
      185.71,
      "Las más cercanas son ce y e, a tres, y se unen primero."
    ],
    [
      189.22,
      "Después, la distancia de la tienda a a ese grupo: a está a cinco de ce y a cuatro de e."
    ],
    [
      194.32,
      "Single toma cuatro, complete toma cinco, y average, el promedio: cuatro coma cinco."
    ],
    [
      201.7,
      "Quedan dos métodos más."
    ],
    [
      203.46,
      "El del centroide mide la distancia entre los puntos medios de cada clúster."
    ],
    [
      207.92,
      "Es barato de calcular, pero tiene una rareza."
    ],
    [
      210.66,
      "Puede producir inversiones en el dendrograma: una unión posterior que queda más abajo que una anterior."
    ],
    [
      217.47,
      "Con las ocho empresas pasa: las últimas alturas son uno coma tres ocho cinco, uno coma cinco uno, y de nuevo uno coma tres ocho tres, más abajo."
    ],
    [
      226.75,
      "Y el de Ward, que es probablemente el más usado."
    ],
    [
      229.77,
      "Une los dos clústeres cuya fusión aumenta lo menos posible la variabilidad interna."
    ],
    [
      235.0,
      "El resultado son clústeres compactos y de tamaños parecidos."
    ],
    [
      238.88,
      "En erre se pide como ward punto de dos, y se usa con distancias euclídeas."
    ],
    [
      244.09,
      "De estos cinco métodos, ¿cuál es el único que puede mostrar inversiones?"
    ],
    [
      251.85,
      "El del centroide."
    ],
    [
      253.18,
      "Single, complete, average y Ward siempre suben."
    ],
    [
      256.82,
      "En erre, todos salen con la misma función, hclust, dándole la matriz de distancias y el método: single, complete, average, centroid o ward punto de dos."
    ],
    [
      266.29,
      "Con plot se dibuja el dendrograma, y con cutree se obtienen los grupos."
    ],
    [
      272.36,
      "En resumen: el aglomerativo une de a dos, de abajo hacia arriba, y el dendrograma muestra a qué altura."
    ],
    [
      278.83,
      "Single usa el mínimo y produce cadenas; complete, el máximo, y da grupos compactos; average, el promedio."
    ],
    [
      285.43,
      "El centroide puede tener inversiones, y Ward busca grupos compactos y parejos."
    ],
    [
      290.44,
      "Y el número de clústeres se decide al final, cortando el árbol."
    ],
    [
      294.56,
      "Eso fue el módulo doce."
    ]
  ],
  "huella": "e7be9037c0f8"
});
