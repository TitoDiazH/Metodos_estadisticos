/* GENERADO por tools/generar_audio.py desde tools/guiones/m26-consejos.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m26-consejos",
  "modulo": "m26-regresion-lineal",
  "titulo": "Consejos para la pregunta de regresión lineal",
  "archivo": "audio/m26-consejos.mp3",
  "duracion": 310,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué te van a preguntar"
    },
    {
      "t": 32.6,
      "titulo": "La plantilla de cada respuesta"
    },
    {
      "t": 66.3,
      "titulo": "Paso uno: interpretar"
    },
    {
      "t": 124.0,
      "titulo": "Paso dos: pruebas te"
    },
    {
      "t": 162.9,
      "titulo": "Paso tres: efe y erre cuadrado"
    },
    {
      "t": 208.2,
      "titulo": "Paso cuatro: supuestos"
    },
    {
      "t": 237.2,
      "titulo": "Paso cinco: problemas del modelo"
    },
    {
      "t": 267.9,
      "titulo": "Errores típicos"
    },
    {
      "t": 291.7,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Consejos para la prueba · Regresión lineal",
  "orden": 0.0,
  "marcas": {
    "inicio": 0.0,
    "inst": 8.38,
    "temas": 16.95,
    "plant": 32.58,
    "p1": 39.24,
    "p2": 41.44,
    "p3": 43.13,
    "ejemplo": 46.81,
    "interp": 66.33,
    "unidades": 78.02,
    "icpt": 85.64,
    "deriv": 93.99,
    "derivp": 100.1,
    "derivi": 107.04,
    "indic": 112.37,
    "tt": 123.99,
    "ta": 136.36,
    "rc": 151.26,
    "f": 162.91,
    "fs": 169.4,
    "r2": 179.61,
    "r2a": 185.38,
    "compl": 197.65,
    "sup": 208.19,
    "sl": 210.36,
    "sh": 217.1,
    "sn": 219.92,
    "si": 231.69,
    "vif": 237.18,
    "hat": 251.64,
    "cook": 257.41,
    "err": 267.94,
    "e1": 269.99,
    "e2": 273.11,
    "e3": 277.24,
    "e4": 281.32,
    "e5": 283.75,
    "fin": 291.66
  },
  "frases": [
    [
      0.0,
      "Este video es un resumen práctico para la pregunta de regresión de la prueba cuatro: qué te van a pedir y cómo responder paso a paso."
    ],
    [
      8.38,
      "El instructivo dice que la prueba entrega un contexto, salidas de R, gráficos y pruebas."
    ],
    [
      14.08,
      "O sea, no vas a ajustar modelos: vas a leerlos."
    ],
    [
      16.95,
      "Seis temas: interpretar el modelo, contrastar hipótesis sobre los coeficientes, la F global, el R² y el ajustado, los supuestos, y los problemas del modelo: multicolinealidad y observaciones influyentes."
    ],
    [
      32.58,
      "Lo más importante del instructivo es esto: no basta con decir se rechaza."
    ],
    [
      37.1,
      "Cada respuesta lleva tres partes."
    ],
    [
      39.24,
      "Uno: el estadístico o el valor p."
    ],
    [
      41.44,
      "Dos: la decisión."
    ],
    [
      43.13,
      "Tres: la conclusión en el contexto del problema."
    ],
    [
      46.81,
      "Por ejemplo: t = 4,96, p = 0,0008, menor que 0,05."
    ],
    [
      54.2,
      "Se rechaza la hipótesis nula."
    ],
    [
      56.34,
      "La nota del examen influye significativamente en la nota de química."
    ],
    [
      60.83,
      "Si te falta cualquiera de las tres partes, pierdes puntaje."
    ],
    [
      66.33,
      "Cada coeficiente es el cambio promedio en ye cuando esa equis sube una unidad, manteniendo constantes las demás."
    ],
    [
      73.31,
      "Esa frase final no es decoración: es lo que distingue la regresión múltiple."
    ],
    [
      78.02,
      "Siempre con unidades: no digas aumenta en 2,7, di aumenta en 2,7 minutos por cada centímetro."
    ],
    [
      85.64,
      "El intercepto solo se interpreta si equis igual a cero tiene sentido y está dentro del rango de los datos."
    ],
    [
      92.09,
      "Casi nunca pasa."
    ],
    [
      93.99,
      "El instructivo pide la derivada parcial."
    ],
    [
      96.6,
      "En un modelo lineal es el coeficiente, un número fijo."
    ],
    [
      100.1,
      "En un polinomio, cambia con equis: b₁ + 2 b₂ equis."
    ],
    [
      104.08,
      "Evalúala en algún valor y di qué significa ahí."
    ],
    [
      107.04,
      "Y con una interacción, la derivada respecto de x₁ depende de x₂."
    ],
    [
      112.37,
      "Si hay una variable indicadora, como calzado común contra clavos, su coeficiente es la diferencia promedio con la categoría de referencia, con todo lo demás igual."
    ],
    [
      123.99,
      "La prueba te para un coeficiente: t igual a la estimación dividida por su error estándar, con n − k − 1 grados de libertad."
    ],
    [
      132.02,
      "n son los datos, k las variables sin contar el intercepto."
    ],
    [
      136.36,
      "Ojo con la hipótesis de β igual a un valor distinto de cero, como β igual a dos."
    ],
    [
      141.42,
      "La salida de R no sirve: hay que restar el dos antes de dividir."
    ],
    [
      145.61,
      "Y el valor p sale de la t de Student: 2 · 1 − p te del valor absoluto."
    ],
    [
      151.26,
      "Puedes decidir con el valor p o con la región crítica."
    ],
    [
      154.74,
      "Si te dan el valor de cu te, compara el valor absoluto de te con ese crítico."
    ],
    [
      159.46,
      "Usa lo que te entreguen."
    ],
    [
      162.91,
      "La F global prueba que todos los betas son cero a la vez."
    ],
    [
      166.44,
      "Si se rechaza, al menos una variable sirve."
    ],
    [
      169.4,
      "Recuerda la descomposición: la total es la de regresión más la del error."
    ],
    [
      173.86,
      "Y F es la de regresión sobre k, dividida por la del error sobre n − k − 1."
    ],
    [
      179.61,
      "R²: la de regresión sobre la total, porcentaje de la variabilidad explicada."
    ],
    [
      185.38,
      "R² ajustado: 1 − 1 − R² · n − 1 / n − k − 1."
    ],
    [
      191.99,
      "Sirve para comparar modelos con distinto número de variables, porque castiga cada parámetro."
    ],
    [
      197.65,
      "Si te piden completar una salida con huecos, casi siempre es esto: t igual a estimación sobre error estándar, R² y el ajustado."
    ],
    [
      208.19,
      "Cuatro supuestos, y cómo se ven."
    ],
    [
      210.36,
      "Linealidad: residuos contra ajustados sin curva."
    ],
    [
      213.7,
      "Una forma de u significa que falta un término cuadrático."
    ],
    [
      217.1,
      "Varianza constante: sin forma de embudo."
    ],
    [
      219.92,
      "Normalidad: el cuantil cuantil sobre la diagonal y Shapiro Wilk con p mayor que 0,05."
    ],
    [
      226.53,
      "Ojo, la nula de Shapiro es que los residuos son normales: un p alto es lo que quieres."
    ],
    [
      231.69,
      "Independencia: sin rachas en el orden de las corridas."
    ],
    [
      237.18,
      "VIF: mayor que cinco moderado, mayor que diez severo."
    ],
    [
      241.03,
      "La pista típica de la prueba: F enorme y casi ningún te significativo, o un coeficiente con un signo absurdo."
    ],
    [
      247.86,
      "La solución, sacar una de las variables redundantes."
    ],
    [
      251.64,
      "Apalancamiento: mayor que 2 · k + 1 / n."
    ],
    [
      255.35,
      "Son datos con equis raras."
    ],
    [
      257.41,
      "Distancia de Cook mayor que uno: el dato cambia el modelo si lo sacas."
    ],
    [
      261.75,
      "Nunca digas que se elimina automáticamente: se revisa y se informa."
    ],
    [
      267.94,
      "Los errores que más se repiten."
    ],
    [
      269.99,
      "Interpretar un coeficiente que no es significativo."
    ],
    [
      273.11,
      "Decir que se acepta la hipótesis nula: se dice que no se rechaza."
    ],
    [
      277.24,
      "Extrapolar fuera del rango de los datos, sobre todo con polinomios."
    ],
    [
      281.32,
      "Olvidar el con todo lo demás constante."
    ],
    [
      283.75,
      "Y confundir el intervalo de confianza de la media con el de predicción, que siempre es más ancho."
    ],
    [
      291.66,
      "El orden para cualquier pregunta: modelo e interpretación, pruebas te, F y R², supuestos, y VIF, apalancamiento y Cook."
    ],
    [
      300.23,
      "Y en cada respuesta, estadístico, decisión y contexto."
    ],
    [
      303.93,
      "Los 12 ejercicios de Walpole en Desarrollo tienen este mismo esquema, cada uno con su video."
    ]
  ],
  "frasesHabladas": [
    "Este video es un resumen práctico para la pregunta de regresión de la prueba cuatro: qué te van a pedir y cómo responder paso a paso.",
    "El instructivo dice que la prueba entrega un contexto, salidas de erre, gráficos y pruebas.",
    "O sea, no vas a ajustar modelos: vas a leerlos.",
    "Seis temas: interpretar el modelo, contrastar hipótesis sobre los coeficientes, la efe global, el erre cuadrado y el ajustado, los supuestos, y los problemas del modelo: multicolinealidad y observaciones influyentes.",
    "Lo más importante del instructivo es esto: no basta con decir se rechaza.",
    "Cada respuesta lleva tres partes.",
    "Uno: el estadístico o el pe valor.",
    "Dos: la decisión.",
    "Tres: la conclusión en el contexto del problema.",
    "Por ejemplo: te igual a cuatro coma nueve seis, pe igual a cero coma cero cero cero ocho, menor que cero coma cero cinco.",
    "Se rechaza la hipótesis nula.",
    "La nota del examen influye significativamente en la nota de química.",
    "Si te falta cualquiera de las tres partes, pierdes puntaje.",
    "Cada coeficiente es el cambio promedio en ye cuando esa equis sube una unidad, manteniendo constantes las demás.",
    "Esa frase final no es decoración: es lo que distingue la regresión múltiple.",
    "Siempre con unidades: no digas aumenta en dos coma siete, di aumenta en dos coma siete minutos por cada centímetro.",
    "El intercepto solo se interpreta si equis igual a cero tiene sentido y está dentro del rango de los datos.",
    "Casi nunca pasa.",
    "El instructivo pide la derivada parcial.",
    "En un modelo lineal es el coeficiente, un número fijo.",
    "En un polinomio, cambia con equis: be uno más dos be dos equis.",
    "Evalúala en algún valor y di qué significa ahí.",
    "Y con una interacción, la derivada respecto de equis uno depende de equis dos.",
    "Si hay una variable indicadora, como calzado común contra clavos, su coeficiente es la diferencia promedio con la categoría de referencia, con todo lo demás igual.",
    "La prueba te para un coeficiente: te igual a la estimación dividida por su error estándar, con ene menos ka menos uno grados de libertad.",
    "Ene son los datos, ka las variables sin contar el intercepto.",
    "Ojo con la hipótesis de beta igual a un valor distinto de cero, como beta igual a dos.",
    "La salida de erre no sirve: hay que restar el dos antes de dividir.",
    "Y el pe valor sale de la te de Student: dos por uno menos pe te del valor absoluto.",
    "Puedes decidir con el pe valor o con la región crítica.",
    "Si te dan el valor de cu te, compara el valor absoluto de te con ese crítico.",
    "Usa lo que te entreguen.",
    "La efe global prueba que todos los betas son cero a la vez.",
    "Si se rechaza, al menos una variable sirve.",
    "Recuerda la descomposición: la total es la de regresión más la del error.",
    "Y efe es la de regresión sobre ka, dividida por la del error sobre ene menos ka menos uno.",
    "Erre cuadrado: la de regresión sobre la total, porcentaje de la variabilidad explicada.",
    "Erre cuadrado ajustado: uno menos uno menos erre cuadrado, por ene menos uno sobre ene menos ka menos uno.",
    "Sirve para comparar modelos con distinto número de variables, porque castiga cada parámetro.",
    "Si te piden completar una salida con huecos, casi siempre es esto: te igual a estimación sobre error estándar, erre cuadrado y el ajustado.",
    "Cuatro supuestos, y cómo se ven.",
    "Linealidad: residuos contra ajustados sin curva.",
    "Una forma de u significa que falta un término cuadrático.",
    "Varianza constante: sin forma de embudo.",
    "Normalidad: el cuantil cuantil sobre la diagonal y Shapiro Wilk con pe mayor que cero coma cero cinco.",
    "Ojo, la nula de Shapiro es que los residuos son normales: un pe alto es lo que quieres.",
    "Independencia: sin rachas en el orden de las corridas.",
    "Ve i efe: mayor que cinco moderado, mayor que diez severo.",
    "La pista típica de la prueba: efe enorme y casi ningún te significativo, o un coeficiente con un signo absurdo.",
    "La solución, sacar una de las variables redundantes.",
    "Apalancamiento: mayor que dos por ka más uno, sobre ene.",
    "Son datos con equis raras.",
    "Distancia de Cook mayor que uno: el dato cambia el modelo si lo sacas.",
    "Nunca digas que se elimina automáticamente: se revisa y se informa.",
    "Los errores que más se repiten.",
    "Interpretar un coeficiente que no es significativo.",
    "Decir que se acepta la hipótesis nula: se dice que no se rechaza.",
    "Extrapolar fuera del rango de los datos, sobre todo con polinomios.",
    "Olvidar el con todo lo demás constante.",
    "Y confundir el intervalo de confianza de la media con el de predicción, que siempre es más ancho.",
    "El orden para cualquier pregunta: modelo e interpretación, pruebas te, efe y erre cuadrado, supuestos, y ve i efe, apalancamiento y Cook.",
    "Y en cada respuesta, estadístico, decisión y contexto.",
    "Los doce ejercicios de Walpole en Desarrollo tienen este mismo esquema, cada uno con su video."
  ],
  "huella": "5aed8a9f91bc"
});
