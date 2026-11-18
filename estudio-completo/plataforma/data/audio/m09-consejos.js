/* GENERADO por tools/generar_audio.py desde tools/guiones/m09-consejos.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m09-consejos",
  "modulo": "m09-pca",
  "titulo": "Consejos para la pregunta de componentes principales",
  "archivo": "audio/m09-consejos.mp3",
  "duracion": 185,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "La pregunta adicional"
    },
    {
      "t": 26.1,
      "titulo": "Paso uno: estandarizar"
    },
    {
      "t": 50.6,
      "titulo": "Paso dos: autovalores y varianza"
    },
    {
      "t": 73.7,
      "titulo": "Paso tres: cuántos componentes"
    },
    {
      "t": 98.5,
      "titulo": "Paso cuatro: interpretar"
    },
    {
      "t": 124.6,
      "titulo": "Paso cinco: el puntaje"
    },
    {
      "t": 149.0,
      "titulo": "Errores típicos"
    },
    {
      "t": 165.6,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Consejos para la prueba · Componentes principales",
  "orden": 0.0,
  "marcas": {
    "inicio": 0.0,
    "tipo": 7.86,
    "est": 26.1,
    "estr": 40.83,
    "sd": 50.56,
    "lam": 56.54,
    "prop": 64.58,
    "acum": 69.78,
    "crit": 73.69,
    "c1": 75.6,
    "c2": 86.92,
    "c3": 89.48,
    "cdif": 92.01,
    "load": 98.54,
    "sig": 105.01,
    "nombre": 113.15,
    "score": 124.56,
    "z": 130.47,
    "zno": 135.87,
    "err": 148.98,
    "e1": 150.64,
    "e2": 153.83,
    "e3": 155.57,
    "e4": 157.62,
    "fin": 165.59
  },
  "frases": [
    [
      0.0,
      "Este resumen es para la pregunta adicional de la prueba cuatro sobre componentes principales, la que se promedia con la prueba uno."
    ],
    [
      7.86,
      "En la prueba uno de este semestre la pregunta entregaba la salida de summary de prcomp, con las desviaciones estándar, y la matriz rotation con los loadings."
    ],
    [
      17.33,
      "Lo que se pide es leer eso: cuántos componentes, qué significan, y cómo se calcularía el puntaje de alguien."
    ],
    [
      26.1,
      "Primero: ¿se estandarizó?"
    ],
    [
      28.07,
      "Si las variables están en unidades distintas, como pesos y número de compras, hay que usar scale punto igual a true."
    ],
    [
      35.12,
      "Si no, la variable con números más grandes domina el primer componente solo por su escala."
    ],
    [
      40.83,
      "Con variables estandarizadas, cada una aporta varianza uno, y la suma de los autovalores es igual al número de variables."
    ],
    [
      50.56,
      "Ojo con esta trampa: summary entrega la desviación estándar de cada componente, no el autovalor."
    ],
    [
      56.54,
      "El autovalor es la desviación estándar al cuadrado."
    ],
    [
      59.4,
      "Una desviación de 1,25 es un autovalor de 1,56."
    ],
    [
      64.58,
      "La proporción de varianza de cada componente es su autovalor dividido en la suma de todos."
    ],
    [
      69.78,
      "Y la acumulada se va sumando."
    ],
    [
      73.69,
      "Tres criterios del curso."
    ],
    [
      75.6,
      "Kaiser: quedarse con los autovalores mayores que uno, con datos estandarizados."
    ],
    [
      80.35,
      "Ojo, sobre el autovalor, no sobre la desviación estándar, aunque aquí da lo mismo porque 1² es uno."
    ],
    [
      86.92,
      "80 % de varianza acumulada."
    ],
    [
      89.48,
      "Y el codo del gráfico de sedimentación."
    ],
    [
      92.01,
      "Pueden no coincidir."
    ],
    [
      93.55,
      "Si no coinciden, dilo y justifica cuál usas."
    ],
    [
      98.54,
      "Para interpretar un componente, mira los loadings grandes en valor absoluto, de 0,4 para arriba."
    ],
    [
      105.01,
      "Y mira los signos: las variables con el mismo signo se mueven juntas en ese componente, y las de signo opuesto, en sentido contrario."
    ],
    [
      113.15,
      "Después ponle un nombre: por ejemplo, intensidad de compra, si frecuencia, gasto y categorías tienen loadings positivos grandes y los cupones uno negativo."
    ],
    [
      124.56,
      "El puntaje de una persona en un componente es la suma de cada loading por su variable estandarizada."
    ],
    [
      130.47,
      "Estandarizada: el valor menos la media, dividido en la desviación estándar de la muestra."
    ],
    [
      135.87,
      "El error típico de la prueba es reemplazar los valores originales directamente en la fórmula."
    ],
    [
      141.1,
      "Si no te dan medias y desviaciones, no se puede calcular el número: se explica el procedimiento."
    ],
    [
      148.98,
      "Resumen de errores."
    ],
    [
      150.64,
      "Usar la desviación estándar como si fuera el autovalor."
    ],
    [
      153.83,
      "Olvidar estandarizar."
    ],
    [
      155.57,
      "Interpretar loadings chicos."
    ],
    [
      157.62,
      "Y decir que componentes principales elimina variables: cada componente usa todas las variables."
    ],
    [
      165.59,
      "Estandarizar, autovalor igual a desviación al cuadrado, proporción y acumulada, Kaiser, 80 % y codo, interpretar con loadings grandes y signos, y el puntaje siempre con variables estandarizadas."
    ],
    [
      178.79,
      "En la sección de clases tienes resuelta la pregunta tres punto uno de la prueba uno y un ejercicio a mano."
    ]
  ],
  "frasesHabladas": [
    "Este resumen es para la pregunta adicional de la prueba cuatro sobre componentes principales, la que se promedia con la prueba uno.",
    "En la prueba uno de este semestre la pregunta entregaba la salida de summary de prcomp, con las desviaciones estándar, y la matriz rotation con los loadings.",
    "Lo que se pide es leer eso: cuántos componentes, qué significan, y cómo se calcularía el puntaje de alguien.",
    "Primero: ¿se estandarizó?",
    "Si las variables están en unidades distintas, como pesos y número de compras, hay que usar scale punto igual a true.",
    "Si no, la variable con números más grandes domina el primer componente solo por su escala.",
    "Con variables estandarizadas, cada una aporta varianza uno, y la suma de los autovalores es igual al número de variables.",
    "Ojo con esta trampa: summary entrega la desviación estándar de cada componente, no el autovalor.",
    "El autovalor es la desviación estándar al cuadrado.",
    "Una desviación de uno coma dos cinco es un autovalor de uno coma cinco seis.",
    "La proporción de varianza de cada componente es su autovalor dividido en la suma de todos.",
    "Y la acumulada se va sumando.",
    "Tres criterios del curso.",
    "Kaiser: quedarse con los autovalores mayores que uno, con datos estandarizados.",
    "Ojo, sobre el autovalor, no sobre la desviación estándar, aunque aquí da lo mismo porque uno al cuadrado es uno.",
    "Ochenta por ciento de varianza acumulada.",
    "Y el codo del gráfico de sedimentación.",
    "Pueden no coincidir.",
    "Si no coinciden, dilo y justifica cuál usas.",
    "Para interpretar un componente, mira los loadings grandes en valor absoluto, de cero coma cuatro para arriba.",
    "Y mira los signos: las variables con el mismo signo se mueven juntas en ese componente, y las de signo opuesto, en sentido contrario.",
    "Después ponle un nombre: por ejemplo, intensidad de compra, si frecuencia, gasto y categorías tienen loadings positivos grandes y los cupones uno negativo.",
    "El puntaje de una persona en un componente es la suma de cada loading por su variable estandarizada.",
    "Estandarizada: el valor menos la media, dividido en la desviación estándar de la muestra.",
    "El error típico de la prueba es reemplazar los valores originales directamente en la fórmula.",
    "Si no te dan medias y desviaciones, no se puede calcular el número: se explica el procedimiento.",
    "Resumen de errores.",
    "Usar la desviación estándar como si fuera el autovalor.",
    "Olvidar estandarizar.",
    "Interpretar loadings chicos.",
    "Y decir que componentes principales elimina variables: cada componente usa todas las variables.",
    "Estandarizar, autovalor igual a desviación al cuadrado, proporción y acumulada, Kaiser, ochenta por ciento y codo, interpretar con loadings grandes y signos, y el puntaje siempre con variables estandarizadas.",
    "En la sección de clases tienes resuelta la pregunta tres punto uno de la prueba uno y un ejercicio a mano."
  ],
  "huella": "20062cf47c5a"
});
