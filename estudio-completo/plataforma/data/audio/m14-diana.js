/* GENERADO por tools/generar_audio.py desde tools/guiones/m14-diana.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m14-diana",
  "modulo": "m14-diana",
  "titulo": "DIANA (desagregativo)",
  "archivo": "audio/m14-diana.mp3",
  "duracion": 274,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "De arriba hacia abajo"
    },
    {
      "t": 31.6,
      "titulo": "El algoritmo"
    },
    {
      "t": 86.7,
      "titulo": "El ejemplo de las cinco empresas"
    },
    {
      "t": 188.9,
      "titulo": "En erre y el dendrograma"
    },
    {
      "t": 217.5,
      "titulo": "Comparar los métodos"
    },
    {
      "t": 258.3,
      "titulo": "Para cerrar"
    }
  ],
  "marcas": {
    "inicio": 0.0,
    "idea": 5.71,
    "idea-1": 12.08,
    "idea-2": 14.59,
    "nombre": 15.98,
    "pregunta": 19.58,
    "disp": 31.56,
    "escis": 37.48,
    "reas": 43.43,
    "reas-1": 49.16,
    "reas-2": 51.68,
    "reas-pos": 54.45,
    "reas-rep": 59.96,
    "sig": 62.8,
    "sig-q": 68.53,
    "sig-r": 75.86,
    "ej": 86.66,
    "ej-d": 89.27,
    "ej-disp": 92.39,
    "ej-e8": 94.38,
    "ej-otras": 103.96,
    "ej-sale": 110.43,
    "ej-reas": 114.67,
    "ej-e7": 119.07,
    "ej-e7b": 131.32,
    "ej-e7r": 140.61,
    "ej-resto": 146.3,
    "ej-r2": 150.49,
    "ej-2": 157.59,
    "ej-2a": 161.09,
    "ej-2b": 165.07,
    "ej-2c": 168.14,
    "ej-3": 175.39,
    "ej-3r": 180.23,
    "r": 188.91,
    "r-cut": 196.56,
    "dendro": 202.72,
    "dendro-h": 207.14,
    "comp": 217.48,
    "comp-1": 220.65,
    "comp-2": 222.95,
    "comp-3": 229.31,
    "comp-r": 231.42,
    "cuando": 237.88,
    "cuando-j": 239.59,
    "cuando-k": 245.73,
    "cuando-d": 249.67,
    "c": 258.33,
    "c1": 259.0,
    "c2": 261.02,
    "c3": 263.56,
    "c4": 266.45,
    "fin": 271.13
  },
  "frases": [
    [
      0.0,
      "Ahora toca el módulo catorce: DIANA, el clastering jerárquico de arriba hacia abajo."
    ],
    [
      5.71,
      "Los métodos aglomerativos partían con cada dato solo y los iban uniendo."
    ],
    [
      10.36,
      "DIANA hace lo contrario."
    ],
    [
      12.08,
      "Parte con todos los datos en un solo clúster, y lo va dividiendo."
    ],
    [
      15.98,
      "El nombre viene del inglés: divisive analysis."
    ],
    [
      19.58,
      "La pregunta es cómo dividir un grupo en dos."
    ],
    [
      22.54,
      "La idea de DIANA es bien intuitiva: sacar primero a quien más se aleja del resto, y después ver quién lo quiere seguir."
    ],
    [
      31.56,
      "Primero se calcula la disparidad de cada observación: su distancia promedio a todas las demás del grupo."
    ],
    [
      37.48,
      "La que tenga la mayor disparidad sale, y forma un clúster nuevo."
    ],
    [
      41.37,
      "Eso es la escisión."
    ],
    [
      43.43,
      "Después viene la reasignación."
    ],
    [
      45.45,
      "Para cada observación que quedó en el grupo original, se compara: su distancia promedio a los que se quedaron, menos su distancia promedio al grupo nuevo."
    ],
    [
      54.45,
      "Si esa diferencia es positiva, quiere decir que está más cerca del grupo nuevo, y se cambia."
    ],
    [
      59.96,
      "Esto se repite hasta que nadie se mueve."
    ],
    [
      62.8,
      "Y para la siguiente división, se elige el clúster más heterogéneo, el que tiene la mayor disparidad."
    ],
    [
      68.53,
      "Fíjate que no dice el más grande."
    ],
    [
      70.59,
      "¿Por qué importa esa diferencia?"
    ],
    [
      75.86,
      "Porque un grupo grande puede ser muy parejo, y uno chico puede tener puntos muy separados."
    ],
    [
      81.35,
      "Lo que se busca dividir es el que está más desordenado."
    ],
    [
      86.66,
      "Veámoslo con las cinco empresas de la clase."
    ],
    [
      89.27,
      "Tenemos la matriz de distancias entre ellas."
    ],
    [
      92.39,
      "Primero, las disparidades."
    ],
    [
      94.38,
      "Para E ocho: tres coma veintidós, más dos coma noventa y dos, más dos coma sesenta, más cero coma cuarenta y dos, dividido en cuatro: dos coma veintinueve."
    ],
    [
      103.96,
      "Las otras quedan alrededor de dos: dos coma cero ocho, dos coma cero uno, dos coma doce y dos coma cero cero."
    ],
    [
      110.43,
      "E ocho tiene la mayor, así que sale y forma su propio grupo."
    ],
    [
      114.67,
      "Ahora la reasignación."
    ],
    [
      116.41,
      "¿Alguna de las otras quiere irse con E ocho?"
    ],
    [
      119.07,
      "Mira E siete."
    ],
    [
      120.79,
      "Su distancia promedio a E uno, E dos y E cinco es dos coma ochenta y uno, más dos coma cincuenta y uno, más dos coma veintiocho, dividido en tres, que da dos coma cincuenta y tres."
    ],
    [
      131.32,
      "Y su distancia a E ocho es solo cero coma cuarenta y dos."
    ],
    [
      134.76,
      "¿La diferencia es positiva o negativa?"
    ],
    [
      140.61,
      "Positiva: dos coma once."
    ],
    [
      142.59,
      "E siete está mucho más cerca de E ocho, y se cambia de grupo."
    ],
    [
      146.3,
      "Para E uno, E dos y E cinco la diferencia sale negativa: se quedan."
    ],
    [
      150.49,
      "En la segunda ronda nadie más se mueve."
    ],
    [
      152.83,
      "La primera división queda E siete con E ocho, y E uno, E dos y E cinco."
    ],
    [
      157.59,
      "Para la segunda división se elige el grupo más heterogéneo."
    ],
    [
      161.09,
      "E siete con E ocho tiene una disparidad de cero coma cuarenta y dos."
    ],
    [
      165.07,
      "E uno, E dos y E cinco, de uno coma cuarenta y dos."
    ],
    [
      168.14,
      "Se divide el segundo, y sale E cinco, que tiene la mayor disparidad, uno coma ochenta."
    ],
    [
      173.67,
      "Nadie la sigue."
    ],
    [
      175.39,
      "Con tres clústeres quedan: E siete con E ocho, E uno con E dos, y E cinco sola."
    ],
    [
      180.23,
      "Tiene sentido: E cinco es la empresa de mucha inversión y pocas ventas, un perfil que no se parece a ninguna otra."
    ],
    [
      188.91,
      "En erre, DIANA está en el paquete cluster, con la función diana."
    ],
    [
      192.85,
      "Se le dan los datos estandarizados o una matriz de distancias, y para cortar en grupos se transforma con as punto hclust y se usa cutree, igual que antes."
    ],
    [
      202.72,
      "El dendrograma se lee al revés que el aglomerativo: de la raíz hacia abajo."
    ],
    [
      207.14,
      "Y un detalle: en DIANA las alturas son el diámetro de cada clúster, la mayor distancia entre dos de sus miembros, no una distancia de fusión."
    ],
    [
      217.48,
      "Con estas mismas empresas ya usamos varios métodos."
    ],
    [
      220.65,
      "Todos juntan a E siete con E ocho."
    ],
    [
      222.95,
      "Con dos grupos, single, complete y ka medias dan lo mismo: E uno, E dos y E cinco contra E siete y E ocho."
    ],
    [
      229.31,
      "Y con tres, DIANA aísla a E cinco."
    ],
    [
      231.42,
      "Es lo normal: los métodos coinciden en lo que está muy marcado, y difieren en los casos ambiguos."
    ],
    [
      237.88,
      "¿Cuándo conviene cada uno?"
    ],
    [
      239.59,
      "Los jerárquicos, con datos pequeños o medianos, para explorar distintos ka con el dendrograma."
    ],
    [
      245.73,
      "Ka medias, con datos grandes y una idea de cuántos grupos hay."
    ],
    [
      249.67,
      "Y DIANA, cuando interesa detectar primero las separaciones grandes, por ejemplo aislar un perfil atípico."
    ],
    [
      258.33,
      "En resumen: DIANA parte del todo y divide."
    ],
    [
      261.02,
      "Saca a la observación con mayor disparidad, mueve a las que quedan más cerca del grupo nuevo, y en cada paso divide el clúster más heterogéneo, no el más grande."
    ],
    [
      271.13,
      "Eso fue el módulo catorce."
    ]
  ],
  "huella": "067e38b4e526"
});
