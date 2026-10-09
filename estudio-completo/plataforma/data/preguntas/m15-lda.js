/* ============================================================================
   Preguntas · M15 Clasificación supervisada: LDA (P2)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m15-lda";
  var ADEMUZ = `library(MASS)
X <- cbind(patrimonio = c(1.3,3.7,5,5.9,7.1,4,7.9,5.1,5.2,9.8,9,12,6.3,8.7,11.1,9.9),
           deuda      = c(4.1,6.9,3,6.5,5.4,2.7,7.6,3.8,1,4.2,4.8,2,5.2,1.1,4.1,1.6))
datos <- data.frame(grupo = factor(rep(c("Fallido", "Cumplidor"), each = 8)), X)
`;

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m15-q001", modulo: MOD, concepto: "m15-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Qué distingue a la clasificación supervisada del clustering?",
      opciones: [
        "En la supervisada se conoce el grupo de las observaciones históricas y se construye una regla para clasificar casos nuevos",
        "En la supervisada los grupos se descubren con un dendrograma",
        "La supervisada no tiene variable respuesta",
        "La supervisada usa una sola variable"
      ],
      correcta: 0,
      explicacion: "Supervisado = etiquetas conocidas (Fallido/Cumplidor en el Banco de Ademuz) + regla de decisión. En el clustering no hay etiquetas previas.",
      fuente: [{ id: "C6.1", loc: "slides 2–4" }]
    },
    {
      id: "m15-q002", modulo: MOD, concepto: "m15-c01", tipo: "calculo", dificultad: 1, origen: "curso",
      enunciado: String.raw`Banco de Ademuz: patrimonio medio de Fallidos $=5$ y de Cumplidores $=9$. Con una sola variable, el corte es el promedio de las medias. ¿Cuál es el corte para patrimonio?`,
      respuesta: 7, tolerancia: 0.001,
      explicacion: String.raw`$C=(5+9)/2=7$: se clasifica Fallido si el patrimonio es menor que $7$. Con solo esta variable se acierta $12/16=75\,\%$; con deuda (corte $(5+3)/2=4$) solo $56{,}3\,\%$.`,
      verifica: [{ que: "corte", js: "(5+9)/2", esperado: 7, tol: 1e-9 }],
      fuente: [{ id: "C6.1", loc: "slides 5–8" }]
    },
    {
      id: "m15-q003", modulo: MOD, concepto: "m15-c01", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Una sola variable (por ejemplo, patrimonio) siempre captura toda la información necesaria para clasificar bien a los clientes.",
      correcta: false,
      explicacion: "Falso. Con una variable se acierta 75 % (patrimonio) o 56,3 % (deuda) en Ademuz; combinándolas con el discriminante de Fisher se llega a 93,75 % (15/16).",
      fuente: [{ id: "C6.1", loc: "slides 8, 19" }]
    },
    {
      id: "m15-q004", modulo: MOD, concepto: "m15-c02", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Qué busca maximizar el criterio de Fisher al construir la función discriminante?",
      opciones: [
        "La separación entre las medias de los grupos relativa a la dispersión dentro de cada grupo (señal/ruido)",
        "La dispersión dentro de cada grupo",
        "El número de variables usadas",
        "La media global de los datos"
      ],
      correcta: 0,
      explicacion: "λ = u′Fu / u′Wu: F = dispersión entre grupos (señal) y W = dispersión dentro (ruido). Análogo al ANOVA (entre vs. dentro) pero con matrices.",
      fuente: [{ id: "C6.1", loc: "slides 10–13" }]
    },
    {
      id: "m15-q005", modulo: MOD, concepto: "m15-c02", tipo: "calculo", dificultad: 3, origen: "variacion",
      base: [{ id: "C6.1", loc: "slides 13–16" }],
      enunciado: String.raw`Dos grupos con medias $\bar x_1=(5,4)$ y $\bar x_2=(3,3)$ y matriz de dispersión dentro de grupos $W=\begin{pmatrix}2&0\\0&1\end{pmatrix}$. Con $u=W^{-1}(\bar x_1-\bar x_2)$, ¿cuánto vale la <strong>primera componente</strong> $u_1$?`,
      respuesta: 1, tolerancia: 0.001,
      explicacion: String.raw`$\bar x_1-\bar x_2=(2,1)$; $W^{-1}=\operatorname{diag}(1/2,\,1)$ ⇒ $u=(1,\ 1)$. Función discriminante: $D=X_1+X_2$.`,
      verifica: [{ que: "u1", r: `W <- diag(c(2, 1)); cat(solve(W, c(5,4) - c(3,3))[1])`, esperado: 1, tol: 1e-9 }],
      fuente: [{ id: "C6.1", loc: "slides 13–16" }]
    },
    {
      id: "m15-q006", modulo: MOD, concepto: "m15-c02", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C6.1", loc: "slides 17–19" }],
      enunciado: String.raw`Con $D=X_1+X_2$ las medias de los puntajes son $\bar D_1=9$ y $\bar D_2=6$. ¿Cuál es el punto de corte $C=(\bar D_1+\bar D_2)/2$?`,
      respuesta: 7.5, tolerancia: 0.001,
      explicacion: String.raw`$C=(9+6)/2=7{,}5$. Una observación con $D>7{,}5$ se clasifica en el grupo 1 (el de mayor puntaje promedio) y con $D<7{,}5$ en el grupo 2. Un cliente $(4,4)$ tiene $D=8>7{,}5$ ⇒ grupo 1.`,
      verifica: [{ que: "corte", js: "(9+6)/2", esperado: 7.5, tol: 1e-9 }],
      fuente: [{ id: "C6.1", loc: "slides 17–19" }]
    },
    {
      id: "m15-q007", modulo: MOD, concepto: "m15-c02", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Banco de Ademuz: $D=-0{,}074\,\text{Patrimonio}+0{,}067\,\text{Deuda}$ y el corte es $C=-0{,}251$ (Fallido si $D>-0{,}251$). Calcula $D$ del cliente $(7,\ 4)$ (usa $u=(-0{,}0739;\ 0{,}0666)$).`,
      respuesta: -0.251, tolerancia: 0.002,
      explicacion: String.raw`$D=-0{,}0739\cdot7+0{,}0666\cdot4=-0{,}5173+0{,}2664=-0{,}251$: exactamente en la frontera (posterior $0{,}5$/$0{,}5$). Es el caso que la clase deja como ejemplo de cliente nuevo.`,
      verifica: [{ que: "D", r: `X <- cbind(c(1.3,3.7,5,5.9,7.1,4,7.9,5.1,5.2,9.8,9,12,6.3,8.7,11.1,9.9), c(4.1,6.9,3,6.5,5.4,2.7,7.6,3.8,1,4.2,4.8,2,5.2,1.1,4.1,1.6)); F <- X[1:8,]; C <- X[9:16,]; W <- cov(F)*7+cov(C)*7; u <- solve(W, colMeans(F)-colMeans(C)); cat(round(sum(u*c(7,4)), 3))`, esperado: -0.251, tol: 0.0006 }],
      fuente: [{ id: "C6.1", loc: "slides 17–19" }]
    },
    {
      id: "m15-q008", modulo: MOD, concepto: "m15-c02", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "En el discriminante de Fisher, multiplicar el vector u por una constante (incluso negativa) cambia la capacidad de separar los grupos, por lo que R debe entregar exactamente los mismos pesos que el cálculo a mano.",
      correcta: false,
      explicacion: "Falso. Solo importa la DIRECCIÓN de u; cualquier múltiplo da la misma separación (con el corte reescalado). Por eso LD1 de R (−0,422; 0,380) difiere de (−0,074; 0,067) y tiene la misma proporción entre coeficientes.",
      verifica: [{ que: "razón u2/u1 coincide con LD1", r: `X <- cbind(c(1.3,3.7,5,5.9,7.1,4,7.9,5.1,5.2,9.8,9,12,6.3,8.7,11.1,9.9), c(4.1,6.9,3,6.5,5.4,2.7,7.6,3.8,1,4.2,4.8,2,5.2,1.1,4.1,1.6)); F <- X[1:8,]; C <- X[9:16,]; W <- cov(F)*7+cov(C)*7; u <- solve(W, colMeans(F)-colMeans(C)); cat(round(u[2]/u[1], 2))`, esperado: -0.9, tol: 0.005 }],
      fuente: [{ id: "C6.1", loc: "slides 13, 21" }]
    },
    {
      id: "m15-q009", modulo: MOD, concepto: "m15-c03", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Se ajustó un LDA al Banco de Ademuz (grupos Fallido y Cumplidor). ¿Qué muestra la salida?",
      codigoR: `modelo_lda <- lda(grupo ~ patrimonio + deuda, data = datos)
modelo_lda`,
      salidaR: `Call:
lda(grupo ~ patrimonio + deuda, data = datos)

Prior probabilities of groups:
Cumplidor   Fallido 
      0.5       0.5 

Group means:
          patrimonio deuda
Cumplidor          9     3
Fallido            5     5

Coefficients of linear discriminants:
                  LD1
patrimonio -0.4224919
deuda       0.3802226
`,
      salidaDe: ADEMUZ + `modelo_lda <- lda(grupo ~ patrimonio + deuda, data = datos)
print(modelo_lda)`,
      opciones: [
        "Los grupos tienen la misma proporción (0,5); los cumplidores tienen mayor patrimonio y menor deuda; LD1 pondera más el patrimonio (negativo) y la deuda (positivo)",
        "Los fallidos tienen mayor patrimonio que los cumplidores",
        "Las probabilidades a priori son 0 y 1",
        "LD1 son las probabilidades de pertenecer a cada grupo"
      ],
      correcta: 0,
      explicacion: "Prior probabilities = proporciones de cada grupo (0,5/0,5). Group means: Cumplidor (9, 3); Fallido (5, 5). LD1 son los coeficientes de la función discriminante (signo opuesto para patrimonio y deuda, coherente con que fallidos tienen menos patrimonio y más deuda).",
      fuente: [{ id: "C6.1", loc: "slide 21" }]
    },
    {
      id: "m15-q010", modulo: MOD, concepto: "m15-c03", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Matriz de confusión del LDA sobre los 16 clientes (filas: real; columnas: predicho). ¿Cuál es la exactitud (accuracy) y qué error se cometió?",
      codigoR: `tabla <- table(Real = datos$grupo, Predicho = pred_lda$class)
tabla
sum(diag(tabla)) / sum(tabla)`,
      salidaR: `           Predicho
Real        Cumplidor Fallido
  Cumplidor         7       1
  Fallido           0       8
[1] 0.9375`,
      salidaDe: ADEMUZ + `modelo_lda <- lda(grupo ~ patrimonio + deuda, data = datos)
pred_lda <- predict(modelo_lda, datos)
tabla <- table(Real = datos$grupo, Predicho = pred_lda$class)
tabla
sum(diag(tabla)) / sum(tabla)`,
      opciones: [
        "93,75 % (15/16): un cumplidor fue clasificado como fallido",
        "93,75 % (15/16): un fallido fue clasificado como cumplidor",
        "50 %: la mitad de los clientes se clasificó mal",
        "87,5 % (14/16): dos errores"
      ],
      correcta: 0,
      explicacion: "Diagonal: 7 + 8 = 15 aciertos de 16. La fila Cumplidor/columna Fallido tiene un 1: un cumplidor (el cliente 13, con patrimonio 6,3 y deuda 5,2) fue clasificado como fallido. Los 8 fallidos se clasificaron bien.",
      fuente: [{ id: "C6.1", loc: "slides 19, 21" }]
    },
    {
      id: "m15-q011", modulo: MOD, concepto: "m15-c03", tipo: "interpretacion-R", dificultad: 3, origen: "nueva",
      enunciado: "Se clasificó un cliente nuevo con patrimonio 7 y deuda 4. ¿Qué dice el resultado?",
      codigoR: `predict(modelo_lda, data.frame(patrimonio = 7, deuda = 4))$posterior`,
      salidaR: `  Cumplidor Fallido
1       0.5     0.5`,
      salidaDe: ADEMUZ + `modelo_lda <- lda(grupo ~ patrimonio + deuda, data = datos)
predict(modelo_lda, data.frame(patrimonio = 7, deuda = 4))$posterior`,
      opciones: [
        "El cliente cae exactamente en la frontera de decisión: la probabilidad es 0,5 en cada grupo y la clasificación es indeterminada",
        "Es cumplidor con certeza",
        "Es fallido con certeza",
        "Hay un error: las probabilidades deberían sumar 2"
      ],
      correcta: 0,
      explicacion: "Posteriores 0,5/0,5 ⇒ el cliente (7,4) está sobre la frontera (D = −0,251 = corte). Cualquier asignación es arbitraria; sería prudente pedir más información. Las posteriores siempre suman 1.",
      fuente: [{ id: "C6.1", loc: "slides 18–21" }]
    },
    {
      id: "m15-q012", modulo: MOD, concepto: "m15-c03", tipo: "completar-R", dificultad: 1, origen: "curso",
      enunciado: "Completa el código para ajustar un LDA, predecir y calcular la exactitud.",
      codigoR: `library(MASS)
modelo_lda <- ___(grupo ~ patrimonio + deuda, data = datos)
pred_lda <- ___(modelo_lda, datos)
tabla <- table(Real = datos$grupo, Predicho = pred_lda$class)
sum(___(tabla)) / sum(tabla)`,
      huecos: [["lda"], ["predict"], ["diag"]],
      explicacion: String.raw`<code>MASS::lda()</code> ajusta, <code>predict()</code> clasifica (devuelve <code>$class</code>, <code>$posterior</code> y <code>$x</code>) y la exactitud es la suma de la diagonal de la matriz de confusión dividida por el total.`,
      fuente: [{ id: "C6.1", loc: "slide 21" }, { id: "S6.1", loc: "líneas 28–42" }]
    },
    {
      id: "m15-q013", modulo: MOD, concepto: "m15-c03", tipo: "multiple", dificultad: 1, origen: "curso",
      enunciado: "¿Cuáles son supuestos de LDA?",
      opciones: [
        "Normalidad multivariada dentro de cada grupo",
        "Matrices de covarianza iguales entre grupos",
        "Observaciones independientes",
        "Todas las variables independientes entre sí"
      ],
      correcta: [0, 1, 2],
      explicacion: "Los tres supuestos de C6.1: normalidad multivariada por grupo (LDA es robusto a desviaciones leves), Σ iguales (Box's M) e independencia de las observaciones. No se exige que las variables sean independientes entre sí.",
      fuente: [{ id: "C6.1", loc: "slide 20" }]
    },
    {
      id: "m15-q014", modulo: MOD, concepto: "m15-c03", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Qué test se usa para contrastar que los grupos tienen la misma matriz de covarianza?",
      opciones: ["Box's M", "Bartlett de esfericidad", "Shapiro-Wilk", "t de Student"],
      correcta: 0,
      explicacion: "Box's M contrasta H₀: Σ₁ = … = Σ_K. Si se rechaza, se recomienda QDA; si no se rechaza, LDA es adecuado.",
      distractores: ["", "Bartlett de esfericidad contrasta H₀: R = I (M02).", "Shapiro-Wilk contrasta normalidad univariada.", "t de Student compara medias."],
      fuente: [{ id: "C6.1", loc: "slide 20" }]
    },
    {
      id: "m15-q015", modulo: MOD, concepto: "m15-c03", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Si los datos no son perfectamente normales dentro de cada grupo, LDA no se puede usar.",
      correcta: false,
      explicacion: "Falso. LDA es bastante robusto a desviaciones leves de la normalidad; el supuesto que más influye es la igualdad de covarianzas entre grupos, que se verifica con Box's M.",
      fuente: [{ id: "C6.1", loc: "slide 20" }]
    },
    {
      id: "m15-q016", modulo: MOD, concepto: "m15-c03", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "El test de Box's M rechaza la igualdad de covarianzas entre grupos y hay suficientes datos por grupo. ¿Qué método conviene?",
      opciones: ["QDA", "LDA", "Un ANOVA", "K-medias"],
      correcta: 0,
      explicacion: "Si las matrices de covarianza difieren, LDA (que supone Σ iguales) deja de ser apropiado y se usa QDA, que estima una Σ por grupo (a costa de necesitar más datos).",
      fuente: [{ id: "C6.1", loc: "slide 20" }]
    },
    {
      id: "m15-q017", modulo: MOD, concepto: "m15-c03", tipo: "calculo", dificultad: 1, origen: "variacion",
      base: [{ id: "C6.1", loc: "slide 21" }],
      enunciado: String.raw`Una matriz de confusión de 3 clases tiene diagonal $(40,\,35,\,25)$ y total de 120 observaciones. Calcula la exactitud (proporción).`,
      respuesta: 0.8333, tolerancia: 0.002,
      explicacion: String.raw`$\text{accuracy}=\dfrac{\text{sum(diag)}}{\text{sum(tabla)}}=\dfrac{40+35+25}{120}=\dfrac{100}{120}=0{,}8333$.`,
      verifica: [{ que: "accuracy", js: "(40+35+25)/120", esperado: 0.8333, tol: 0.0001 }],
      fuente: [{ id: "C6.1", loc: "slide 21" }]
    },
    {
      id: "m15-q018", modulo: MOD, concepto: "m15-c02", tipo: "codigo-R", dificultad: 3, origen: "nueva",
      enunciado: "Un compañero calcula a mano la función discriminante de dos grupos (matrices F y C con los datos de cada grupo). ¿Qué error tiene?",
      codigoR: `W <- cov(F) + cov(C)
u <- solve(W, colMeans(F) - colMeans(C))
D <- X %*% u`,
      opciones: [
        "Usa la suma de las covarianzas en vez de la matriz de dispersión dentro de grupos W = (n₁−1)·cov(F) + (n₂−1)·cov(C); la dirección u puede salir distinta si los tamaños difieren",
        "Debería usar la suma de las medias en lugar de su diferencia",
        "Debería invertir X, no W",
        "No hay error: ambas formas son siempre equivalentes"
      ],
      correcta: 0,
      explicacion: "W es la matriz de dispersión dentro de grupos: suma de las matrices de dispersión de cada grupo ((n−1)·cov). Con grupos de igual tamaño solo cambia un factor constante (no la dirección), pero con tamaños distintos la dirección sí cambia. En Ademuz: W = 7·cov(F) + 7·cov(C).",
      fuente: [{ id: "C6.1", loc: "slides 13–16" }]
    }
  ]);
})();
