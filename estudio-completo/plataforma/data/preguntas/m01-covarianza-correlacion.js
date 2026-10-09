/* ============================================================================
   Preguntas · M01 Covarianza, correlación y regresión simple (P1)
   IDs ESTABLES: nunca se renumeran ni se reutilizan (el progreso depende de ellos).
   "verifica" = cálculos que tools/verificar_numeros.js recalcula.
   ========================================================================== */
PLATAFORMA.registrar("pregunta", [
  {
    id: "m01-q001", modulo: "m01-covarianza-correlacion", concepto: "m01-c02", tipo: "vf", dificultad: 1, origen: "curso",
    enunciado: "Si dos variables son independientes, su correlación es 0.",
    correcta: true,
    explicacion: String.raw`Si son independientes, $E(XY)=E(X)E(Y)$; entonces $\operatorname{Cov}(X,Y)=E(XY)-E(X)E(Y)=0$ y la correlación también es 0. Intuitivamente: si una sube o baja, la otra no se ve afectada.`,
    fuente: [{ id: "PR-P1-Q1", loc: "afirmación 2" }]
  },
  {
    id: "m01-q002", modulo: "m01-covarianza-correlacion", concepto: "m01-c02", tipo: "vf", dificultad: 2, origen: "curso",
    enunciado: "Si dos variables tienen correlación 0, entonces son independientes.",
    correcta: false,
    explicacion: "La pauta acepta cualquiera de estas justificaciones: (1) pueden estar relacionadas de manera no lineal y aun así tener correlación 0; (2) eso solo ocurre cuando ambas tienen distribución normal conjunta (normal bivariada); (3) la correlación puede ser 0 y, sin embargo, una variable influir en la distribución de la otra (por ejemplo, que la varianza de y dependa de x pero su media no).",
    fuente: [{ id: "PR-P1-Q1", loc: "afirmación 3" }, { id: "C1", loc: "slide 16" }]
  },
  {
    id: "m01-q003", modulo: "m01-covarianza-correlacion", concepto: "m01-c02", tipo: "alternativas", dificultad: 1, origen: "nueva",
    enunciado: "¿Cuál es la ventaja de la correlación sobre la covarianza?",
    opciones: [
      "Está siempre entre −1 y 1 y permite comparar relaciones entre variables medidas en escalas distintas",
      "Detecta relaciones no lineales que la covarianza no detecta",
      "Permite concluir que una variable causa a la otra",
      "No depende del signo de la relación"
    ],
    correcta: 0,
    explicacion: "La correlación es la versión estandarizada de la covarianza: no depende de las unidades, queda entre −1 y 1 y una relación lineal perfecta da ±1.",
    distractores: ["", "Ambas miden solo relación lineal.", "Una correlación alta no prueba causalidad.", "El signo sí importa: indica la dirección."],
    fuente: [{ id: "C1", loc: "slide 15" }]
  },
  {
    id: "m01-q004", modulo: "m01-covarianza-correlacion", concepto: "m01-c01", tipo: "calculo", dificultad: 2, origen: "nueva",
    enunciado: String.raw`Calcula la covarianza muestral (divisor $n-1$) de $x=(2,4,6,8)$ e $y=(1,3,2,6)$.`,
    respuesta: 4.6667, tolerancia: 0.01,
    explicacion: String.raw`$\bar x=5$, $\bar y=3$. Productos de desviaciones: $(-3)(-2)=6$; $(-1)(0)=0$; $(1)(-1)=-1$; $(3)(3)=9$. Suma $=14$. $s_{xy}=14/(4-1)=4{,}67$. Signo positivo: tienden a moverse en el mismo sentido.`,
    verifica: [{ que: "cov de los datos", js: "cov([2,4,6,8],[1,3,2,6])", esperado: 4.6667, tol: 0.0001 }],
    fuente: [{ id: "C1", loc: "slides 9–11" }]
  },
  {
    id: "m01-q005", modulo: "m01-covarianza-correlacion", concepto: "m01-c02", tipo: "calculo", dificultad: 2, origen: "curso",
    enunciado: String.raw`Tres variables ($X_1$: tiempo de viaje, $X_2$: costo de transporte, $X_3$: distancia recorrida) tienen matriz de varianza-covarianza
$$\Sigma=\begin{pmatrix}16&6&8\\6&9&1\\8&1&25\end{pmatrix}$$
Calcula la correlación entre $X_2$ y $X_3$.`,
    respuesta: 0.0667, tolerancia: 0.002,
    explicacion: String.raw`$r_{23}=\dfrac{\operatorname{Cov}(X_2,X_3)}{\sqrt{\operatorname{Var}(X_2)\operatorname{Var}(X_3)}}=\dfrac{1}{\sqrt{9\cdot25}}=\dfrac{1}{15}=0{,}067$. Correlación muy baja.`,
    verifica: [{ que: "r23", js: "1/Math.sqrt(9*25)", esperado: 0.0667, tol: 0.0001 }],
    fuente: [{ id: "AY1-E", loc: "Parte II, P1 b" }, { id: "AY1-R", loc: "líneas 103–106" }]
  },
  {
    id: "m01-q006", modulo: "m01-covarianza-correlacion", concepto: "m01-c02", tipo: "alternativas", dificultad: 2, origen: "curso",
    enunciado: String.raw`Con la matriz $\Sigma=\begin{pmatrix}16&6&8\\6&9&1\\8&1&25\end{pmatrix}$, ¿qué par de variables tiene la relación lineal más fuerte?`,
    opciones: ["$X_1$ y $X_2$", "$X_1$ y $X_3$", "$X_2$ y $X_3$", "No se puede saber sin los datos originales"],
    correcta: 0,
    explicacion: String.raw`$r_{12}=6/\sqrt{16\cdot9}=0{,}50$; $r_{13}=8/\sqrt{16\cdot25}=0{,}40$; $r_{23}=1/\sqrt{9\cdot25}=0{,}067$. La mayor es $r_{12}$ (positiva moderada), aunque la covarianza más grande sea la de $X_1$ y $X_3$.`,
    distractores: ["", "Tiene la mayor covarianza (8), pero al estandarizar queda en 0,40.", "Es la más baja: 0,067.", "La matriz de covarianza basta: trae varianzas y covarianzas."],
    verifica: [
      { que: "r12", js: "6/Math.sqrt(16*9)", esperado: 0.5, tol: 0.0001 },
      { que: "r13", js: "8/Math.sqrt(16*25)", esperado: 0.4, tol: 0.0001 }
    ],
    fuente: [{ id: "AY1-E", loc: "Parte II, P1 c" }, { id: "AY1-R", loc: "líneas 103–116" }]
  },
  {
    id: "m01-q007", modulo: "m01-covarianza-correlacion", concepto: "m01-c02", tipo: "multiple", dificultad: 2, origen: "nueva",
    enunciado: "¿Cuáles de estas afirmaciones sobre el coeficiente de correlación r son correctas?",
    opciones: [
      "Es adimensional",
      "Siempre cumple −1 ≤ r ≤ 1",
      "r = 0 no implica independencia en general",
      "Su valor cambia si se cambian las unidades de una variable",
      "Un r cercano a 1 demuestra que X causa Y"
    ],
    correcta: [0, 1, 2],
    explicacion: "Propiedades de r: adimensional, acotado entre −1 y 1, el signo indica dirección, |r| grande = relación lineal más fuerte, y r = 0 no implica independencia en general. Lo que depende de las unidades es la covarianza, y una correlación alta no prueba causalidad.",
    fuente: [{ id: "C1", loc: "slides 15–16 y 20" }]
  },
  {
    id: "m01-q008", modulo: "m01-covarianza-correlacion", concepto: "m01-c04", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
    enunciado: "Se ejecutó <code>cor.test(x, y, method = \"pearson\")</code> con la altura (cm) y el peso (kg) de 6 personas. Con α = 0,05, ¿qué se concluye?",
    salidaR: `	Pearson's product-moment correlation

data:  x and y
t = 3.1087, df = 4, p-value = 0.03592
alternative hypothesis: true correlation is not equal to 0
95 percent confidence interval:
 0.0926901 0.9821910
sample estimates:
      cor
0.8409891 `,
    salidaDe: `x <- c(161, 170, 180, 175, 165, 187)
y <- c(50, 65, 78, 82, 60, 76)
cor.test(x, y, method = "pearson")`,
    opciones: [
      "Se rechaza H0: ρ = 0; hay evidencia de correlación lineal entre altura y peso",
      "No se rechaza H0: ρ = 0, porque el p-valor es menor que 0,05",
      "Se rechaza H0 porque el intervalo de confianza contiene el 0",
      "La correlación poblacional es exactamente 0,84"
    ],
    correcta: 0,
    explicacion: "p-value = 0,036 < 0,05 ⇒ se rechaza H0: ρ = 0. Con un nivel de significancia del 5 % existe evidencia estadística suficiente para afirmar que hay correlación lineal. Coherente con el IC del 95 % (0,093 a 0,982), que no contiene el 0.",
    distractores: ["", "Un p-valor menor que α lleva a rechazar, no a «no rechazar».", "El intervalo va de 0,093 a 0,982: no contiene el 0.", "0,84 es r, el valor muestral; ρ es desconocido (el IC es muy ancho)."],
    fuente: [{ id: "C1", loc: "slide 19" }]
  },
  {
    id: "m01-q009", modulo: "m01-covarianza-correlacion", concepto: "m01-c01", tipo: "codigo-R", dificultad: 1, origen: "nueva",
    enunciado: "¿Qué entrega la última línea de este código?",
    codigoR: `datos <- data.frame(Altura_cm = altura, Peso_kg = peso)
covarianza <- cov(datos)
covarianza`,
    opciones: [
      "Una matriz 2×2: las varianzas en la diagonal y la covarianza fuera de ella",
      "Un único número: la covarianza entre altura y peso",
      "La matriz de correlación, con unos en la diagonal",
      "El p-valor de la prueba de correlación"
    ],
    correcta: 0,
    explicacion: "cov() aplicada a un data frame entrega la matriz de covarianza: la diagonal corresponde a varianzas y fuera de la diagonal aparecen las covarianzas.",
    distractores: ["", "Eso sería cov(altura, peso) con dos vectores.", "Eso lo entrega cor(datos).", "Eso lo entrega cor.test()."],
    fuente: [{ id: "C1", loc: "slide 13" }]
  },
  {
    id: "m01-q010", modulo: "m01-covarianza-correlacion", concepto: "m01-c04", tipo: "completar-R", dificultad: 1, origen: "curso",
    enunciado: "Completa la función que entrega el coeficiente de correlación, su intervalo de confianza y el p-valor para H0: ρ = 0.",
    codigoR: `x <- c(161, 170, 180, 175, 165, 187)
y <- c(50, 65, 78, 82, 60, 76)

___(x, y, method = "pearson")`,
    huecos: [["cor.test"]],
    explicacion: "<code>cor.test()</code> devuelve el coeficiente de correlación, el intervalo de confianza y el p-valor para probar H0: ρ = 0. <code>cor()</code> solo entrega r.",
    fuente: [{ id: "C1", loc: "slide 19" }]
  },
  {
    id: "m01-q011", modulo: "m01-covarianza-correlacion", concepto: "m01-c04", tipo: "alternativas", dificultad: 3, desafio: true, origen: "curso",
    enunciado: String.raw`La correlación muestral entre costo de transporte y distancia recorrida es $r=1/15$. Usando $t=r\sqrt{\dfrac{n-2}{1-r^2}}$ y α = 0,05 bilateral (valores críticos: $t_{0{,}025;\,98}=1{,}984$ y $t_{0{,}025;\,998}=1{,}962$), ¿se puede asegurar que existe correlación lineal con $n=100$? ¿Y con $n=1000$?`,
    opciones: [
      "Con n = 100 no se rechaza H0; con n = 1000 sí se rechaza",
      "Se rechaza H0 en ambos casos",
      "No se rechaza H0 en ninguno de los dos casos",
      "Con n = 100 se rechaza H0; con n = 1000 no"
    ],
    correcta: 0,
    explicacion: String.raw`$n=100$: $t=\tfrac{1}{15}\sqrt{98/(1-1/225)}=0{,}66<1{,}984$ ⇒ no se rechaza. $n=1000$: $t=\tfrac{1}{15}\sqrt{998/(1-1/225)}=2{,}11>1{,}962$ ⇒ se rechaza. El mismo $r$ pequeño pasa a ser significativo cuando la muestra es grande: significativo no es lo mismo que fuerte.`,
    verifica: [
      { que: "t con n=100", js: "(1/15)*Math.sqrt(98/(1-1/225))", esperado: 0.6614, tol: 0.0005 },
      { que: "t con n=1000", js: "(1/15)*Math.sqrt(998/(1-1/225))", esperado: 2.1108, tol: 0.0005 },
      { que: "t crítico 98 gl", r: "cat(qt(0.975, 98))", esperado: 1.984, tol: 0.001 },
      { que: "t crítico 998 gl", r: "cat(qt(0.975, 998))", esperado: 1.962, tol: 0.001 }
    ],
    fuente: [{ id: "AY1-E", loc: "Parte II, P2" }, { id: "AY1-R", loc: "líneas 118–126" }]
  },
  {
    id: "m01-q012", modulo: "m01-covarianza-correlacion", concepto: "m01-c04", tipo: "calculo", dificultad: 2, origen: "variacion",
    base: [{ id: "AY1-E", loc: "Parte II, P2" }],
    enunciado: String.raw`En una muestra de $n=6$ pares se obtuvo $r=0{,}841$. Calcula el estadístico $t$ para probar $H_0:\rho=0$.`,
    respuesta: 3.109, tolerancia: 0.02,
    explicacion: String.raw`$t=r\sqrt{\dfrac{n-2}{1-r^2}}=0{,}841\sqrt{\dfrac{4}{1-0{,}7073}}=3{,}109$, con $n-2=4$ grados de libertad. Coincide con el <code>t = 3.1087</code> de <code>cor.test()</code> para los datos de altura y peso.`,
    verifica: [{ que: "t", js: "0.841*Math.sqrt(4/(1-0.841*0.841))", esperado: 3.109, tol: 0.002 }],
    fuente: [{ id: "C1", loc: "slide 19" }, { id: "AY1-E", loc: "Parte II, P2" }]
  }
]);
