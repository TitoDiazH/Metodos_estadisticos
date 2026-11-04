/* Banco de preguntas · M26 Regresión lineal (P3) */
PLATAFORMA.registrar("pregunta", [
  {
    id: "m26-q001", modulo: "m26-regresion-lineal", concepto: "m26-c02", tipo: "calculo", dificultad: 2, origen: "nueva",
    enunciado: String.raw`Datos: $x=(1,2,3,4,5)$, $y=(2,4,5,4,5)$. Con $\sum x=15$, $\sum y=20$, $\sum xy=66$, $\sum x^2=55$, calcula $b_1$.`,
    respuesta: 0.6, tolerancia: 0.001,
    explicacion: String.raw`$b_1=\dfrac{5(66)-15(20)}{5(55)-15^2}=\dfrac{30}{50}=0{,}6$.`,
    verifica: [{ que: "b1", js: "(5*66-15*20)/(5*55-15*15)", esperado: 0.6, tol: 1e-9 }],
    fuente: [{ id: "C8.1", loc: "slide 10" }]
  },
  {
    id: "m26-q002", modulo: "m26-regresion-lineal", concepto: "m26-c02", tipo: "calculo", dificultad: 1, origen: "nueva",
    enunciado: String.raw`Con los mismos datos ($b_1=0{,}6$, $\bar x=3$, $\bar y=4$), calcula $b_0$.`,
    respuesta: 2.2, tolerancia: 0.001,
    explicacion: String.raw`$b_0=\bar y-b_1\bar x=4-0{,}6\cdot3=2{,}2$.`,
    verifica: [{ que: "b0", js: "4-0.6*3", esperado: 2.2, tol: 1e-9 }, { que: "b0 en R", r: `cat(coef(lm(c(2,4,5,4,5) ~ c(1:5)))[1])`, esperado: 2.2, tol: 1e-9 }],
    fuente: [{ id: "C8.1", loc: "slide 10" }]
  },
  {
    id: "m26-q003", modulo: "m26-regresion-lineal", concepto: "m26-c03", tipo: "calculo", dificultad: 2, origen: "nueva",
    enunciado: String.raw`En la regresión anterior, $STC=6$ y la suma de residuos al cuadrado es $SRC=2{,}4$. Calcula $R^2$.`,
    respuesta: 0.6, tolerancia: 0.001,
    explicacion: String.raw`$R^2=1-SRC/STC=1-2{,}4/6=0{,}6$.`,
    verifica: [{ que: "R2", r: `cat(summary(lm(c(2,4,5,4,5) ~ c(1:5)))$r.squared)`, esperado: 0.6, tol: 1e-9 }],
    fuente: [{ id: "C8.1", loc: "slide 12" }]
  },
  {
    id: "m26-q004", modulo: "m26-regresion-lineal", concepto: "m26-c06", tipo: "calculo", dificultad: 2, origen: "variacion",
    base: [{ id: "C8.1", loc: "slide 23" }],
    enunciado: String.raw`Una regresión con $n=25$ y $k=4$ regresores tiene $R^2=0{,}80$. Calcula el $R^2$ ajustado.`,
    respuesta: 0.76, tolerancia: 0.001,
    explicacion: String.raw`$1-(1-0{,}8)\dfrac{24}{20}=1-0{,}24=0{,}76$.`,
    verifica: [{ que: "R2aj", js: "1-(1-0.8)*24/20", esperado: 0.76, tol: 1e-9 }],
    fuente: [{ id: "C8.1", loc: "slide 23" }]
  },
  {
    id: "m26-q005", modulo: "m26-regresion-lineal", concepto: "m26-c05", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
    enunciado: "Coeficientes del modelo de óxido nitroso. ¿Qué lectura es correcta?",
    salidaR: `            Estimate Std. Error  t value Pr(>|t|)
(Intercept) -3.50778    3.00486 -1.16737  0.26017
Humedad     -0.00262    0.00065 -4.00846  0.00101
Temperatura  0.00080    0.00205  0.39065  0.70121
Presion      0.15416    0.10137  1.52075  0.14784`,
    salidaDe: `ejemplo1 <- data.frame(
  Oxido_Nitroso = c(0.90,0.91,0.96,0.89,1.00,1.10,1.15,1.03,0.77,1.07,1.07,0.94,1.10,1.10,1.10,0.91,0.87,0.78,0.82,0.95),
  Humedad = c(72.4,41.6,34.3,35.1,10.7,12.9,8.3,20.1,72.2,24.0,23.2,47.4,31.5,10.6,11.2,73.3,75.4,96.6,107.4,54.9),
  Temperatura = c(76.3,70.3,77.1,68.0,79.0,67.4,66.8,76.9,77.7,67.7,76.8,86.6,76.9,86.3,86.0,76.3,77.9,78.7,86.8,70.9),
  Presion = c(29.18,29.35,29.24,29.27,29.78,29.39,29.69,29.48,29.09,29.60,29.38,29.35,29.63,29.56,29.48,29.40,29.28,29.29,29.03,29.37))
modelo1 <- lm(Oxido_Nitroso ~ Humedad + Temperatura + Presion, data = ejemplo1)
round(summary(modelo1)$coefficients, 5)`,
    opciones: ["Con temperatura y presión fijas, cada punto más de humedad baja la emisión esperada en 0,0026 ppm, y es significativo (p ≈ 0,001)", "La temperatura aumenta significativamente la emisión", "El intercepto −3,51 es la emisión esperada típica de los camiones", "Ningún coeficiente es significativo"],
    correcta: 0,
    explicacion: "C8.1 s22: solo la humedad es significativa; el intercepto está fuera del rango de los datos y no se interpreta.",
    fuente: [{ id: "C8.1", loc: "slides 20–22" }]
  },
  {
    id: "m26-q006", modulo: "m26-regresion-lineal", concepto: "m26-c06", tipo: "vf", dificultad: 1, origen: "curso",
    enunciado: "Al agregar una variable a una regresión, el R² nunca baja, pero el R² ajustado sí puede bajar.",
    correcta: true,
    explicacion: "C8.1 s23.",
    fuente: [{ id: "C8.1", loc: "slide 23" }]
  },
  {
    id: "m26-q007", modulo: "m26-regresion-lineal", concepto: "m26-c07", tipo: "completar-R", dificultad: 1, origen: "curso",
    enunciado: "Completa para ajustar una parábola en x.",
    codigoR: `poli <- lm(y ~ x + ___(x^2))`,
    huecos: [["I"]],
    explicacion: "C8.1 s25: sin I(), R interpreta el ^ de otra forma.",
    fuente: [{ id: "C8.1", loc: "slide 25" }]
  },
  {
    id: "m26-q008", modulo: "m26-regresion-lineal", concepto: "m26-c07", tipo: "calculo", dificultad: 2, origen: "nueva",
    enunciado: String.raw`Modelo ajustado $\hat y=5+4x-0{,}5x^2$. ¿En qué valor de $x$ la respuesta es máxima?`,
    respuesta: 4, tolerancia: 0.001,
    explicacion: String.raw`Pendiente $b_1+2b_2x=4-x=0$ ⇒ $x^*=-b_1/(2b_2)=4$. Como $b_2<0$ es un máximo (siempre que $x=4$ esté dentro del rango observado).`,
    verifica: [{ que: "x*", js: "-4/(2*-0.5)", esperado: 4, tol: 1e-9 }],
    fuente: [{ id: "C8.1", loc: "slide 26" }]
  },
  {
    id: "m26-q009", modulo: "m26-regresion-lineal", concepto: "m26-c08", tipo: "alternativas", dificultad: 1, origen: "curso",
    enunciado: "El gráfico de residuos vs valores ajustados tiene forma de U. ¿Qué sugiere?",
    opciones: ["Al modelo le falta un término (p. ej. x²): probar regresión polinomial", "La varianza crece con ŷ: transformar y", "Los residuos son normales", "Hay multicolinealidad"],
    correcta: 0,
    explicacion: "C8.1 s29.",
    fuente: [{ id: "C8.1", loc: "slide 29" }]
  },
  {
    id: "m26-q010", modulo: "m26-regresion-lineal", concepto: "m26-c10", tipo: "calculo", dificultad: 1, origen: "nueva",
    enunciado: String.raw`Al regresar $x_2$ contra los demás regresores se obtiene $R_2^2=0{,}8$. Calcula su VIF.`,
    respuesta: 5, tolerancia: 0.001,
    explicacion: String.raw`$VIF=1/(1-0{,}8)=5$: en el límite donde empieza a preocupar.`,
    verifica: [{ que: "VIF", js: "1/(1-0.8)", esperado: 5, tol: 1e-9 }],
    fuente: [{ id: "C8.1", loc: "slide 34" }]
  },
  {
    id: "m26-q011", modulo: "m26-regresion-lineal", concepto: "m26-c11", tipo: "alternativas", dificultad: 1, origen: "curso",
    enunciado: "¿Por qué un factor con 3 categorías se representa con solo 2 variables indicadoras?",
    opciones: ["Porque las 3 sumarían siempre 1 y serían colineales con el intercepto", "Porque R solo acepta 2", "Porque la tercera categoría se elimina de los datos", "Porque así sube el R²"],
    correcta: 0,
    explicacion: "C8.1 s35: multicolinealidad perfecta; la categoría omitida es la referencia.",
    fuente: [{ id: "C8.1", loc: "slide 35" }]
  },
  {
    id: "m26-q012", modulo: "m26-regresion-lineal", concepto: "m26-c11", tipo: "calculo", dificultad: 2, origen: "curso",
    enunciado: String.raw`En $mpg=33{,}99-3{,}21\,wt-4{,}26\,z_6-6{,}07\,z_8$, ¿cuál es el rendimiento esperado de un auto de 8 cilindros que pesa 3 (miles de lb)?`,
    respuesta: 18.29, tolerancia: 0.02,
    explicacion: String.raw`$33{,}99-6{,}07-3{,}21\cdot3=27{,}92-9{,}63=18{,}29$.`,
    verifica: [{ que: "pred", r: `m <- lm(mpg ~ wt + factor(cyl), data = mtcars); cat(round(sum(coef(m) * c(1, 3, 0, 1)), 2))`, esperado: 18.3, tol: 0.01 }],
    fuente: [{ id: "C8.1", loc: "slide 36" }]
  },
  {
    id: "m26-q013", modulo: "m26-regresion-lineal", concepto: "m26-c12", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
    enunciado: "Primer paso de step(modelo1, direction = \"both\") en el ejemplo de óxido nitroso. ¿Qué decide el procedimiento en este paso?",
    salidaR: `Start:  AIC=-111.64
Oxido_Nitroso ~ Humedad + Temperatura + Presion

              Df Sum of Sq      RSS      AIC
- Temperatura  1  0.000481 0.050960 -113.449
<none>                     0.050479 -111.639
- Presion      1  0.007296 0.057775 -110.939
- Humedad      1  0.050693 0.101172  -99.733

Step:  AIC=-113.45
Oxido_Nitroso ~ Humedad + Presion`,
    salidaDe: `ejemplo1 <- data.frame(
  Oxido_Nitroso = c(0.90,0.91,0.96,0.89,1.00,1.10,1.15,1.03,0.77,1.07,1.07,0.94,1.10,1.10,1.10,0.91,0.87,0.78,0.82,0.95),
  Humedad = c(72.4,41.6,34.3,35.1,10.7,12.9,8.3,20.1,72.2,24.0,23.2,47.4,31.5,10.6,11.2,73.3,75.4,96.6,107.4,54.9),
  Temperatura = c(76.3,70.3,77.1,68.0,79.0,67.4,66.8,76.9,77.7,67.7,76.8,86.6,76.9,86.3,86.0,76.3,77.9,78.7,86.8,70.9),
  Presion = c(29.18,29.35,29.24,29.27,29.78,29.39,29.69,29.48,29.09,29.60,29.38,29.35,29.63,29.56,29.48,29.40,29.28,29.29,29.03,29.37))
modelo1 <- lm(Oxido_Nitroso ~ Humedad + Temperatura + Presion, data = ejemplo1)
m <- step(modelo1, direction = "both", steps = 1)`,
    opciones: ["Sacar Temperatura, porque es el cambio que más baja el AIC (−111,64 → −113,45)", "Sacar Humedad, porque tiene el mayor RSS", "Detenerse, porque <none> tiene el menor AIC", "Sacar Presión"],
    correcta: 0,
    explicacion: "C8.1 s39: menor AIC = mejor; la fila «- Temperatura» queda por debajo de <none>.",
    fuente: [{ id: "C8.1", loc: "slide 39" }]
  },
  {
    id: "m26-q014", modulo: "m26-regresion-lineal", concepto: "m26-c09", tipo: "calculo", dificultad: 1, origen: "variacion",
    base: [{ id: "C8.1", loc: "slide 32" }],
    enunciado: String.raw`Una regresión con $n=30$ y $k=4$ regresores. ¿Desde qué valor de $h_{ii}$ se considera alto el apalancamiento?`,
    respuesta: 0.333, tolerancia: 0.001,
    explicacion: String.raw`$2(k+1)/n=10/30=0{,}333$.`,
    verifica: [{ que: "corte", js: "2*5/30", esperado: 0.3333, tol: 0.0001 }],
    fuente: [{ id: "C8.1", loc: "slide 32" }]
  },
  {
    id: "m26-q015", modulo: "m26-regresion-lineal", concepto: "m26-c01", tipo: "vf", dificultad: 1, origen: "curso",
    enunciado: "Los errores εᵢ del modelo se observan directamente y por eso se usan para revisar los supuestos.",
    correcta: false,
    explicacion: "C8.1 s7 y s28: los εᵢ no se observan; los supuestos se revisan con los residuos eᵢ = yᵢ − ŷᵢ.",
    fuente: [{ id: "C8.1", loc: "slides 7 y 28" }]
  },
  {
    id: "m26-q016", modulo: "m26-regresion-lineal", concepto: "m26-c04", tipo: "alternativas", dificultad: 2, origen: "curso",
    enunciado: "¿Qué estima s² = SCE/(n − k − 1) en la regresión múltiple?",
    opciones: ["La varianza del error σ² (de forma insesgada)", "El R²", "La varianza de y", "El error estándar de b₀"],
    correcta: 0,
    explicacion: "C8.1 s17.",
    fuente: [{ id: "C8.1", loc: "slide 17" }]
  },
  {
    id: "m26-q017", modulo: "m26-regresion-lineal", concepto: "m26-c13", tipo: "multiple", dificultad: 2, origen: "curso",
    enunciado: "Según el flujo de trabajo de C8.1, ¿qué se mira en cada paso?",
    opciones: ["summary: F global, pruebas t y R² ajustado", "plot(modelo): residuos sin patrón y Q-Q sobre la diagonal", "vif: valores mayores que 5 a 10", "step: el mayor AIC", "cooks.distance: valores menores que 1 indican problema"],
    correcta: [0, 1, 2],
    explicacion: "C8.1 s40: step busca el MENOR AIC; Cook > 1 indica punto muy influyente.",
    fuente: [{ id: "C8.1", loc: "slide 40" }]
  }
]);
