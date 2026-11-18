/* Banco de preguntas · M23 Superficie de respuesta (P4) */
PLATAFORMA.registrar("pregunta", [
  {
    id: "m23-q001", modulo: "m23-superficie-respuesta", concepto: "m23-c01", tipo: "alternativas", dificultad: 1, origen: "nueva",
    enunciado: String.raw`En el modelo $\hat y=b_0+b_1x_1+b_2x_2+b_{11}x_1^2+b_{22}x_2^2+b_{12}x_1x_2$, ¿qué término indica que el efecto de $x_1$ depende del nivel de $x_2$?`,
    opciones: ["$b_{12}x_1x_2$ (interacción)", "$b_{11}x_1^2$ (cuadrático)", "$b_1x_1$ (lineal)", "$b_0$"],
    correcta: 0,
    explicacion: String.raw`La interacción: $\partial\hat y/\partial x_1=b_1+2b_{11}x_1+b_{12}x_2$ cambia con $x_2$ solo si $b_{12}\neq0$.`,
    fuente: [{ id: "C8.2", loc: "slide 7" }]
  },
  {
    id: "m23-q002", modulo: "m23-superficie-respuesta", concepto: "m23-c01", tipo: "vf", dificultad: 1, origen: "nueva",
    enunciado: "El modelo de segundo orden no se puede ajustar con regresión lineal múltiple porque tiene términos al cuadrado.",
    correcta: false,
    explicacion: "Falso: es lineal en los parámetros. Cada término (x₁², x₁x₂…) se ingresa como una columna más y se ajusta con lm() (C8.2 s7).",
    fuente: [{ id: "C8.2", loc: "slide 7" }]
  },
  {
    id: "m23-q003", modulo: "m23-superficie-respuesta", concepto: "m23-c02", tipo: "vf", dificultad: 2, origen: "curso",
    enunciado: "Con un factorial 2^k (dos niveles por factor) se puede estimar el término cuadrático de cada factor.",
    correcta: false,
    explicacion: "Falso: con x = ±1, x² vale siempre 1 y se confunde con el intercepto. Para estimar curvatura hacen falta al menos tres niveles (C8.2 s28, s35).",
    fuente: [{ id: "C8.2", loc: "slides 28, 35" }]
  },
  {
    id: "m23-q004", modulo: "m23-superficie-respuesta", concepto: "m23-c02", tipo: "calculo", dificultad: 1, origen: "variacion",
    base: [{ id: "C8.2", loc: "slide 19" }],
    enunciado: String.raw`La temperatura va de 120 a 170 °C (centro 145, semirrango 25). Una corrida a 157,5 °C, ¿qué valor codificado $x_1$ tiene?`,
    respuesta: 0.5, tolerancia: 0.001,
    explicacion: String.raw`$x_1=(157{,}5-145)/25=0{,}5$.`,
    verifica: [{ que: "x codificado", js: "(157.5-145)/25", esperado: 0.5, tol: 1e-9 }],
    fuente: [{ id: "C8.2", loc: "slide 19" }]
  },
  {
    id: "m23-q005", modulo: "m23-superficie-respuesta", concepto: "m23-c02", tipo: "alternativas", dificultad: 2, origen: "curso",
    enunciado: "En un 2³ con interacciones, la presión tiene p < 0,001 con variables codificadas y p = 0,139 con variables en unidades reales (mismo R²). ¿Por qué?",
    opciones: ["En unidades reales la prueba t pregunta por el efecto de la presión cuando los otros factores valen 0 (0 °C, 0 min), condición que nunca ocurre", "Porque en unidades reales el modelo ajusta peor", "Porque codificar cambia los datos", "Porque la presión no influye"],
    correcta: 0,
    explicacion: "Con interacción, el efecto de un factor depende de los otros. La parametrización cambia la pregunta de cada t, no el ajuste (C8.2 s25).",
    fuente: [{ id: "C8.2", loc: "slides 25–26" }]
  },
  {
    id: "m23-q006", modulo: "m23-superficie-respuesta", concepto: "m23-c03", tipo: "calculo", dificultad: 1, origen: "nueva",
    enunciado: String.raw`¿Cuántas corridas tiene un diseño central compuesto con $k=2$ factores y 5 réplicas del centro?`,
    respuesta: 13, tolerancia: 0,
    explicacion: String.raw`$2^2=4$ esquinas + $2\cdot2=4$ axiales + 5 centros = 13 (como el ej. 23 del cap. 12 del libro guía).`,
    verifica: [{ que: "corridas", js: "4+4+5", esperado: 13, tol: 0 }],
    fuente: [{ id: "C8.2", loc: "slide 5" }]
  },
  {
    id: "m23-q007", modulo: "m23-superficie-respuesta", concepto: "m23-c03", tipo: "multiple", dificultad: 2, origen: "nueva",
    enunciado: "¿Qué se gana con repetir el punto central en un diseño de superficie de respuesta?",
    opciones: ["Una estimación del error puro, independiente del modelo", "Poder probar la falta de ajuste", "Detectar curvatura comparando el centro con las esquinas", "Estimar las interacciones de tres factores"],
    correcta: [0, 1, 2],
    explicacion: "Las réplicas del centro dan el error puro (y con él la prueba de falta de ajuste) y permiten ver si la media del centro difiere de la de las esquinas (curvatura). No sirven para estimar interacciones.",
    fuente: [{ id: "C8.2", loc: "slides 15, 37" }, { id: "LG", loc: "cap. 12, ej. 22b" }]
  },
  {
    id: "m23-q008", modulo: "m23-superficie-respuesta", concepto: "m23-c04", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
    enunciado: "Salida del modelo de segundo orden para el índice de solubilidad (Box-Behnken, cap. 12 ej. 24 del libro guía). ¿Qué lectura es correcta (α = 0,05)?",
    salidaR: `            Estimate Std. Error t value Pr(>|t|)
(Intercept)  13.8500     0.4120 33.6174   0.0000
x1           -1.0212     0.2523 -4.0479   0.0098
x2           -0.1300     0.2523 -0.5153   0.6283
x3           -0.9312     0.2523 -3.6912   0.0141
I(x1^2)      -1.1863     0.3714 -3.1943   0.0241
I(x2^2)       1.5613     0.3714  4.2041   0.0085
I(x3^2)      -0.3612     0.3714 -0.9728   0.3753
x1:x2         0.4750     0.3568  1.3313   0.2406
x1:x3         0.3825     0.3568  1.0721   0.3327
x2:x3        -0.3000     0.3568 -0.8408   0.4388`,
    salidaDe: `datos <- data.frame(x1 = c(-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, 0, 0, -1, 1, -1, 1, 0, 0, 0), x3 = c(0, 0, 0, 0, -1, -1, 1, 1, -1, -1, 1, 1, 0, 0, 0), y = c(15.87, 12.7, 14.8, 13.53, 15.1, 12.47, 11.37, 10.27, 15.33, 15.53, 15.17, 14.17, 13.85, 13.93, 13.77))
modelo <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x2 + x1:x3 + x2:x3, data = datos)
round(summary(modelo)$coefficients, 4)`,
    opciones: ["Hay curvatura en x₁ y x₂ (cuadráticos significativos, con signos opuestos) y ninguna interacción es significativa", "No hay curvatura porque x₂ lineal no es significativo", "Todas las interacciones son significativas", "x₃ no influye porque su cuadrático no es significativo"],
    correcta: 0,
    explicacion: "I(x1^2) (p = 0,024) y I(x2^2) (p = 0,0085) son significativos: curvatura; uno negativo y otro positivo anuncian un punto silla. Las tres interacciones tienen p > 0,24. x₃ sí influye por su término lineal (p = 0,014).",
    fuente: [{ id: "LG", loc: "cap. 12, ej. 24" }, { id: "C8.2", loc: "slides 14, 31" }]
  },
  {
    id: "m23-q009", modulo: "m23-superficie-respuesta", concepto: "m23-c04", tipo: "completar-R", dificultad: 1, origen: "curso",
    enunciado: "Completa el modelo de segundo orden con dos factores.",
    codigoR: `modelo <- lm(y ~ x1 + x2 + ___(x1^2) + I(x2^2) + x1:x2, data = datos)
library(rsm)
modelo_rsm <- rsm(y ~ ___(x1, x2), data = datos)`,
    huecos: [["I"], ["SO"]],
    explicacion: "<code>I()</code> hace que <code>^</code> sea potencia dentro de la fórmula; <code>SO()</code> (second order) arma lineales, interacción y cuadráticos en <code>rsm</code> (C8.2 s14–15).",
    fuente: [{ id: "C8.2", loc: "slides 14–15" }]
  },
  {
    id: "m23-q010", modulo: "m23-superficie-respuesta", concepto: "m23-c05", tipo: "calculo", dificultad: 2, origen: "variacion",
    base: [{ id: "C8.2", loc: "slide 29" }],
    enunciado: String.raw`$\hat y=50+4x_1+6x_2-2x_1^2-3x_2^2$ (sin interacción). Encuentra $x_2^*$, la coordenada del punto estacionario en $x_2$.`,
    respuesta: 1, tolerancia: 0.001,
    explicacion: String.raw`$\partial\hat y/\partial x_2=6-6x_2=0$ ⇒ $x_2^*=1$. (Y $x_1^*=4/4=1$.) Como $b_{11},b_{22}<0$: máximo.`,
    verifica: [{ que: "x2*", js: "-6/(2*(-3))", esperado: 1, tol: 1e-9 }],
    fuente: [{ id: "C8.2", loc: "slides 16, 29" }]
  },
  {
    id: "m23-q011", modulo: "m23-superficie-respuesta", concepto: "m23-c05", tipo: "calculo", dificultad: 3, origen: "variacion",
    base: [{ id: "C8.2", loc: "slide 29" }],
    enunciado: String.raw`$\hat y=80+10x_1+4x_2-8x_1^2-5x_2^2-8x_1x_2$. Calcula el determinante de la hessiana.`,
    respuesta: 96, tolerancia: 0.01,
    explicacion: String.raw`$H=\begin{pmatrix}2b_{11}&b_{12}\\b_{12}&2b_{22}\end{pmatrix}=\begin{pmatrix}-16&-8\\-8&-10\end{pmatrix}$; $\det H=160-64=96>0$ y $h_{11}<0$ ⇒ máximo.`,
    verifica: [{ que: "detH", js: "(-16)*(-10)-(-8)*(-8)", esperado: 96, tol: 1e-9 }],
    fuente: [{ id: "C8.2", loc: "slide 29" }]
  },
  {
    id: "m23-q012", modulo: "m23-superficie-respuesta", concepto: "m23-c05", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
    enunciado: "Salida de canonical() para el ejemplo del rendimiento (x₁ = (T − 225)/25, x₂ = (C − 20)/5). ¿Qué se concluye?",
    salidaR: `$xs
         x1          x2
 0.62633433 -0.06072677

$eigen
eigen() decomposition
$values
[1]  -2.673971 -11.078218

$vectors
         [,1]       [,2]
x1  0.5537030 -0.8327142
x2 -0.8327142 -0.5537030`,
    salidaDe: `library(rsm)
datos <- data.frame(x1 = c(-1, 1, -1, 1, -1.414, 1.414, 0, 0, 0, 0, 0, 0), x2 = c(-1, -1, 1, 1, 0, 0, -1.414, 1.414, 0, 0, 0, 0), y = c(43, 78, 69, 73, 48, 78, 65, 74, 76, 79, 83, 81))
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
canonical(modelo_rsm)`,
    opciones: ["Máximo en T ≈ 240,7 °C y C ≈ 19,7 %, dentro de la región", "Mínimo en T ≈ 240,7 °C y C ≈ 19,7 %", "Punto silla en (0,63; −0,06)", "Máximo en T ≈ 0,63 °C y C ≈ −0,06 %"],
    correcta: 0,
    explicacion: "Ambos valores propios son negativos ⇒ máximo. En reales: T = 225 + 25(0,626) = 240,7; C = 20 + 5(−0,061) = 19,7. Dentro de ±1,414 (C8.2 s17).",
    fuente: [{ id: "C8.2", loc: "slide 17" }]
  },
  {
    id: "m23-q013", modulo: "m23-superficie-respuesta", concepto: "m23-c06", tipo: "alternativas", dificultad: 1, origen: "nueva",
    enunciado: "¿Qué caracteriza al diseño de Box-Behnken?",
    opciones: ["Tres niveles por factor y ninguna corrida con todos los factores en un extremo a la vez", "Cinco niveles por factor con puntos axiales", "Solo las esquinas del cubo", "No usa puntos centrales"],
    correcta: 0,
    explicacion: "Sus puntos están en el medio de las aristas del cubo más el centro (C8.2 s38).",
    fuente: [{ id: "C8.2", loc: "slides 4, 38" }]
  },
  {
    id: "m23-q014", modulo: "m23-superficie-respuesta", concepto: "m23-c06", tipo: "calculo", dificultad: 2, origen: "curso",
    enunciado: String.raw`Hojuelas de soya (C8.2 s21): $b_3=3{,}625$, $b_{33}=4{,}667$, sin interacciones; velocidad = $900+100x_3$ rpm. ¿Qué velocidad (rpm) minimiza la respuesta?`,
    respuesta: 861.6, tolerancia: 1,
    explicacion: String.raw`$x_3^*=-3{,}625/(2\cdot4{,}667)=-0{,}388$ ⇒ $900+100(-0{,}388)\approx861$ rpm. $b_{33}>0$ ⇒ mínimo en esa dirección.`,
    verifica: [{ que: "vel", js: "900+100*(-3.625/(2*4.667))", esperado: 861.16, tol: 0.01 }],
    fuente: [{ id: "C8.2", loc: "slide 21" }]
  },
  {
    id: "m23-q015", modulo: "m23-superficie-respuesta", concepto: "m23-c09", tipo: "alternativas", dificultad: 2, origen: "curso",
    enunciado: "Se quiere maximizar la resistencia. El punto estacionario tiene valores propios 17,5; 15,3 y 3,9 y una coordenada x₃* = −1,11 (región −1 a 1). ¿Qué se recomienda?",
    opciones: ["Buscar el máximo en la frontera de la región (evaluar esquinas y caras) y confirmar con corridas", "Operar en el punto estacionario", "Extrapolar a x₃ = −1,11", "Concluir que el modelo está mal"],
    correcta: 0,
    explicacion: "Es un mínimo (todos los λ > 0) y además está fuera de la región: el máximo está en la frontera (C8.2 s33–34).",
    fuente: [{ id: "C8.2", loc: "slides 33–34" }]
  },
  {
    id: "m23-q016", modulo: "m23-superficie-respuesta", concepto: "m23-c08", tipo: "codigo-R", dificultad: 2, origen: "curso",
    enunciado: "¿Qué compara este código?",
    codigoR: `modelo_red <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x3, data = datos)
anova(modelo_red, modelo)`,
    opciones: ["Si las interacciones x₁x₂ y x₂x₃ que se sacaron mejoran el ajuste (F parcial de modelos anidados)", "Los supuestos de ambos modelos", "Qué modelo tiene mejor R²", "Si x₁x₃ es significativa"],
    correcta: 0,
    explicacion: "anova(reducido, completo) prueba H₀: los términos extra del completo valen 0 (C8.2 s32).",
    fuente: [{ id: "C8.2", loc: "slide 32" }]
  },
  {
    id: "m23-q017", modulo: "m23-superficie-respuesta", concepto: "m23-c07", tipo: "vf", dificultad: 1, origen: "curso",
    enunciado: "En el gráfico de contornos, elipses cerradas alrededor del punto estacionario indican un máximo o un mínimo.",
    correcta: true,
    explicacion: "Verdadero: las curvas de nivel rodean la cima o el fondo; en una silla son hipérbolas (C8.2 s18).",
    fuente: [{ id: "C8.2", loc: "slide 18" }]
  },
  {
    id: "m23-q018", modulo: "m23-superficie-respuesta", concepto: "m23-c10", tipo: "multiple", dificultad: 2, origen: "nueva",
    enunciado: "Según el Instructivo P4, ¿qué debe incluir cada respuesta de la pregunta de superficie de respuesta?",
    opciones: ["El estadístico o valor-p relevante", "La decisión estadística", "Una conclusión en el contexto del problema", "Solo indicar si se rechaza o no H₀"],
    correcta: [0, 1, 2],
    explicacion: "El instructivo dice que no basta indicar si se rechaza: cada respuesta lleva estadístico/valor-p, decisión y conclusión en contexto.",
    fuente: [{ id: "INST-P4" }]
  },
  {
    id: "m23-q019", modulo: "m23-superficie-respuesta", concepto: "m23-c10", tipo: "calculo", dificultad: 3, origen: "variacion",
    base: [{ id: "LG", loc: "cap. 12, ej. 29" }],
    enunciado: String.raw`$\hat y=6{,}5-0{,}2x_1+0{,}1x_2-0{,}5x_1^2+1{,}2x_2^2$ (sin interacción). Calcula el determinante de la hessiana e indica qué tipo de punto es (responde el determinante).`,
    respuesta: -2.4, tolerancia: 0.001,
    explicacion: String.raw`$H=\begin{pmatrix}-1&0\\0&2{,}4\end{pmatrix}$, $\det H=-2{,}4<0$ ⇒ <strong>punto silla</strong> (curva hacia abajo en $x_1$ y hacia arriba en $x_2$). Si se busca el mejor sabor, el óptimo está en la frontera.`,
    verifica: [{ que: "detH", js: "(2*-0.5)*(2*1.2)", esperado: -2.4, tol: 1e-9 }],
    fuente: [{ id: "C8.2", loc: "slides 16, 29" }]
  }
]);
