/* GENERADO por tools/generar_audio.py desde tools/guiones/m23-consejos.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m23-consejos",
  "modulo": "m23-superficie-respuesta",
  "titulo": "Consejos para la pregunta de superficie de respuesta",
  "archivo": "audio/m23-consejos.mp3",
  "duracion": 266,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué te van a preguntar"
    },
    {
      "t": 33.1,
      "titulo": "Reconocer el diseño"
    },
    {
      "t": 71.8,
      "titulo": "Leer la salida"
    },
    {
      "t": 109.6,
      "titulo": "El punto estacionario"
    },
    {
      "t": 167.5,
      "titulo": "Clasificar"
    },
    {
      "t": 206.0,
      "titulo": "¿Es el óptimo?"
    },
    {
      "t": 228.5,
      "titulo": "Errores típicos"
    },
    {
      "t": 249.0,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Consejos para la prueba · Superficie de respuesta",
  "orden": 0.0,
  "marcas": {
    "inicio": 0.0,
    "inst": 4.95,
    "i1": 7.21,
    "i2": 14.79,
    "i3": 22.28,
    "dis": 33.11,
    "d1": 35.21,
    "d2": 44.36,
    "d3": 53.96,
    "cod": 59.27,
    "sal": 71.8,
    "s1": 74.28,
    "s2": 82.52,
    "s3": 87.39,
    "s4": 90.87,
    "pista": 99.32,
    "pe": 109.62,
    "pe1": 111.27,
    "pe2": 126.02,
    "pe3": 127.96,
    "cramer": 129.98,
    "cr1": 139.97,
    "cr2": 145.09,
    "sinint": 150.93,
    "yest": 156.95,
    "hes": 167.48,
    "h2": 173.41,
    "h3": 185.16,
    "ojob": 194.01,
    "opt": 205.98,
    "o1": 209.0,
    "o2": 213.75,
    "o3": 223.25,
    "err": 228.53,
    "e1": 230.04,
    "e2": 232.66,
    "e3": 237.19,
    "e4": 240.75,
    "fin": 249.01
  },
  "frases": [
    [
      0.0,
      "Resumen práctico para la pregunta de superficie de respuesta de la prueba cuatro."
    ],
    [
      4.95,
      "El instructivo pide tres cosas."
    ],
    [
      7.21,
      "Interpretar un modelo de segundo orden: términos lineales, cuadráticos e interacciones, y si hay curvatura e interacción."
    ],
    [
      14.79,
      "Analizar la salida de R: valores p, términos significativos, F global, R² y si el modelo es adecuado."
    ],
    [
      22.28,
      "Y encontrar el punto estacionario a mano, y clasificarlo con la hessiana."
    ],
    [
      26.65,
      "Los datos saldrán de los ejercicios 22 a 29 del capítulo 12."
    ],
    [
      33.11,
      "Primero, reconoce el diseño."
    ],
    [
      35.21,
      "Esquinas con más y −1 y un centro repetido: un factorial dos a la k con puntos centrales."
    ],
    [
      41.13,
      "Sirve para explorar, pero no estima curvatura."
    ],
    [
      44.36,
      "Esquinas, puntos axiales sobre los ejes y centro: central compuesto."
    ],
    [
      48.85,
      "Si los axiales están a 1,414 con dos factores, es rotable."
    ],
    [
      53.96,
      "Puntos en el medio de las aristas, con un factor en cero, y centro: Box Behnken."
    ],
    [
      59.27,
      "Codificar: equis igual a valor menos centro, dividido en el semirrango."
    ],
    [
      63.98,
      "Decodificar: centro más equis por semirrango."
    ],
    [
      67.0,
      "La respuesta final siempre en unidades reales."
    ],
    [
      71.8,
      "En la salida, clasifica los términos."
    ],
    [
      74.28,
      "Un cuadrático significativo significa curvatura."
    ],
    [
      77.4,
      "Su signo dice hacia dónde: negativo curva hacia abajo, positivo hacia arriba."
    ],
    [
      82.52,
      "Una interacción significativa significa que el efecto de un factor depende del otro."
    ],
    [
      87.39,
      "Después, la F global, el R² y el ajustado."
    ],
    [
      90.87,
      "Y si hay réplicas del centro, la falta de ajuste: un p alto es lo que quieres."
    ],
    [
      95.69,
      "Como siempre: estadístico, decisión y contexto."
    ],
    [
      99.32,
      "Una pista útil: si los cuadráticos tienen todos el mismo signo, sospecha un máximo o un mínimo; si tienen signos opuestos, una silla."
    ],
    [
      109.62,
      "El procedimiento a mano."
    ],
    [
      111.27,
      "Deriva respecto de cada equis."
    ],
    [
      113.38,
      "El término lineal deja su coeficiente."
    ],
    [
      115.98,
      "El cuadrático, bᵢᵢ equis cuadrado, deja dos bᵢᵢ equis: no olvides el dos."
    ],
    [
      120.81,
      "Y la interacción, b₁₂ x₁ x₂, deja b₁₂ por la otra variable."
    ],
    [
      126.02,
      "Iguala cada derivada a cero."
    ],
    [
      127.96,
      "Resuelve el sistema."
    ],
    [
      129.98,
      "Con dos factores hay una fórmula directa."
    ],
    [
      132.62,
      "El denominador es cuatro b₁₁ b₂₂ − b₁₂², que es justo el determinante de la hessiana."
    ],
    [
      139.97,
      "x₁ es b₁₂ b₂ − 2 b₂₂ b₁, sobre ese determinante."
    ],
    [
      145.09,
      "x₂ es b₁₂ b₁ − 2 b₁₁ b₂, sobre el mismo determinante."
    ],
    [
      150.93,
      "Si no hay interacción, es aún más simple: cada equis es menos bᵢ dividido en dos bᵢᵢ."
    ],
    [
      156.95,
      "Para el valor predicho en el punto, reemplaza en el modelo."
    ],
    [
      160.45,
      "Un atajo: b₀ más un medio de la suma de cada equis por su coeficiente lineal."
    ],
    [
      167.48,
      "La hessiana es la matriz de segundas derivadas: dos bᵢᵢ en la diagonal, y bᵢⱼ fuera de ella."
    ],
    [
      173.41,
      "Con dos factores: si el determinante es positivo y el primer elemento negativo, máximo."
    ],
    [
      178.82,
      "Determinante positivo y primer elemento positivo, mínimo."
    ],
    [
      182.8,
      "Determinante negativo, silla."
    ],
    [
      185.16,
      "Con tres factores, se usan los valores propios que entrega R: todos negativos, máximo; todos positivos, mínimo; mezclados, silla."
    ],
    [
      194.01,
      "Ojo con una confusión: la matriz B lleva bᵢⱼ partido en dos fuera de la diagonal, y la hessiana es dos veces B, así que lleva bᵢⱼ completo."
    ],
    [
      205.98,
      "Antes de recomendar el punto, dos preguntas."
    ],
    [
      209.0,
      "¿Es del tipo que busco?"
    ],
    [
      210.64,
      "Si quiero maximizar, tiene que ser un máximo."
    ],
    [
      213.75,
      "¿Está dentro de la región experimental?"
    ],
    [
      216.26,
      "Si cualquiera de las dos falla, el óptimo está en la frontera: se evalúan las esquinas y bordes, sin extrapolar."
    ],
    [
      223.25,
      "Y siempre se recomienda confirmar con corridas reales."
    ],
    [
      228.53,
      "Los más comunes."
    ],
    [
      230.04,
      "Olvidar el dos al derivar los cuadrados."
    ],
    [
      232.66,
      "Dar el punto en unidades codificadas cuando piden condiciones de operación."
    ],
    [
      237.19,
      "Recomendar un punto silla o un punto fuera de la región."
    ],
    [
      240.75,
      "Y decir que el modelo es malo porque un término lineal no es significativo: con jerarquía, se mantiene."
    ],
    [
      249.01,
      "Diseño y codificación, términos y su significancia, F y R², derivar, igualar a cero, resolver, hessiana, unidades reales, y la pregunta final: ¿es del tipo buscado y está dentro?"
    ],
    [
      260.87,
      "Los ocho ejercicios del capítulo 12 siguen exactamente este orden."
    ]
  ],
  "frasesHabladas": [
    "Resumen práctico para la pregunta de superficie de respuesta de la prueba cuatro.",
    "El instructivo pide tres cosas.",
    "Interpretar un modelo de segundo orden: términos lineales, cuadráticos e interacciones, y si hay curvatura e interacción.",
    "Analizar la salida de erre: valores pe, términos significativos, efe global, erre cuadrado y si el modelo es adecuado.",
    "Y encontrar el punto estacionario a mano, y clasificarlo con la hessiana.",
    "Los datos saldrán de los ejercicios veintidós a veintinueve del capítulo doce.",
    "Primero, reconoce el diseño.",
    "Esquinas con más y menos uno y un centro repetido: un factorial dos a la ka con puntos centrales.",
    "Sirve para explorar, pero no estima curvatura.",
    "Esquinas, puntos axiales sobre los ejes y centro: central compuesto.",
    "Si los axiales están a uno coma cuatro uno cuatro con dos factores, es rotable.",
    "Puntos en el medio de las aristas, con un factor en cero, y centro: Box Behnken.",
    "Codificar: equis igual a valor menos centro, dividido en el semirrango.",
    "Decodificar: centro más equis por semirrango.",
    "La respuesta final siempre en unidades reales.",
    "En la salida, clasifica los términos.",
    "Un cuadrático significativo significa curvatura.",
    "Su signo dice hacia dónde: negativo curva hacia abajo, positivo hacia arriba.",
    "Una interacción significativa significa que el efecto de un factor depende del otro.",
    "Después, la efe global, el erre cuadrado y el ajustado.",
    "Y si hay réplicas del centro, la falta de ajuste: un pe alto es lo que quieres.",
    "Como siempre: estadístico, decisión y contexto.",
    "Una pista útil: si los cuadráticos tienen todos el mismo signo, sospecha un máximo o un mínimo; si tienen signos opuestos, una silla.",
    "El procedimiento a mano.",
    "Deriva respecto de cada equis.",
    "El término lineal deja su coeficiente.",
    "El cuadrático, be i i equis cuadrado, deja dos be i i equis: no olvides el dos.",
    "Y la interacción, be uno dos equis uno equis dos, deja be uno dos por la otra variable.",
    "Iguala cada derivada a cero.",
    "Resuelve el sistema.",
    "Con dos factores hay una fórmula directa.",
    "El denominador es cuatro be uno uno be dos dos, menos be uno dos al cuadrado, que es justo el determinante de la hessiana.",
    "Equis uno es be uno dos be dos, menos dos be dos dos be uno, sobre ese determinante.",
    "Equis dos es be uno dos be uno, menos dos be uno uno be dos, sobre el mismo determinante.",
    "Si no hay interacción, es aún más simple: cada equis es menos be i dividido en dos be i i.",
    "Para el valor predicho en el punto, reemplaza en el modelo.",
    "Un atajo: be cero más un medio de la suma de cada equis por su coeficiente lineal.",
    "La hessiana es la matriz de segundas derivadas: dos be i i en la diagonal, y be i j fuera de ella.",
    "Con dos factores: si el determinante es positivo y el primer elemento negativo, máximo.",
    "Determinante positivo y primer elemento positivo, mínimo.",
    "Determinante negativo, silla.",
    "Con tres factores, se usan los valores propios que entrega erre: todos negativos, máximo; todos positivos, mínimo; mezclados, silla.",
    "Ojo con una confusión: la matriz be mayúscula lleva be i j partido en dos fuera de la diagonal, y la hessiana es dos veces be mayúscula, así que lleva be i j completo.",
    "Antes de recomendar el punto, dos preguntas.",
    "¿Es del tipo que busco?",
    "Si quiero maximizar, tiene que ser un máximo.",
    "¿Está dentro de la región experimental?",
    "Si cualquiera de las dos falla, el óptimo está en la frontera: se evalúan las esquinas y bordes, sin extrapolar.",
    "Y siempre se recomienda confirmar con corridas reales.",
    "Los más comunes.",
    "Olvidar el dos al derivar los cuadrados.",
    "Dar el punto en unidades codificadas cuando piden condiciones de operación.",
    "Recomendar un punto silla o un punto fuera de la región.",
    "Y decir que el modelo es malo porque un término lineal no es significativo: con jerarquía, se mantiene.",
    "Diseño y codificación, términos y su significancia, efe y erre cuadrado, derivar, igualar a cero, resolver, hessiana, unidades reales, y la pregunta final: ¿es del tipo buscado y está dentro?",
    "Los ocho ejercicios del capítulo doce siguen exactamente este orden."
  ],
  "huella": "52cf422cd25f"
});
