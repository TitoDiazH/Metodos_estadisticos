/* ============================================================================
   Preguntas · M16 QDA, Naive Bayes y validación (P2)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m16-qda-nb-validacion";
  var ADEMUZ = `library(MASS)
X <- cbind(patrimonio = c(1.3,3.7,5,5.9,7.1,4,7.9,5.1,5.2,9.8,9,12,6.3,8.7,11.1,9.9),
           deuda      = c(4.1,6.9,3,6.5,5.4,2.7,7.6,3.8,1,4.2,4.8,2,5.2,1.1,4.1,1.6))
datos <- data.frame(grupo = factor(rep(c("Fallido", "Cumplidor"), each = 8)), X)
`;

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m16-q001", modulo: MOD, concepto: "m16-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Qué supone LDA y qué permite QDA respecto de las matrices de covarianza de los grupos?",
      opciones: [
        "LDA supone una matriz común para todos los grupos (frontera lineal); QDA permite una distinta por grupo (frontera cuadrática)",
        "LDA permite una distinta por grupo; QDA supone una común",
        "Ambos suponen matrices distintas, pero LDA usa menos variables",
        "Ninguno de los dos hace supuestos sobre las covarianzas"
      ],
      correcta: 0,
      explicacion: "LDA: Σ₁ = … = Σ_K, menos parámetros, frontera lineal, estable con pocos datos. QDA: Σ distintas, frontera curva, necesita más datos por grupo.",
      fuente: [{ id: "C6.2", loc: "slides 3–4" }]
    },
    {
      id: "m16-q002", modulo: MOD, concepto: "m16-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "Box's M da un p-valor de 0,8486 con α = 0,05. ¿Qué método de clasificación conviene?",
      opciones: ["LDA", "QDA", "Naive Bayes categórico", "Regresión lineal"],
      correcta: 0,
      explicacion: "p > 0,05 ⇒ no se rechaza H₀: Σ₁ = Σ₂ ⇒ las covarianzas se consideran iguales ⇒ LDA. (Si p ≤ 0,05 se usaría QDA, salvo que la muestra sea muy pequeña.)",
      fuente: [{ id: "C6.2", loc: "slides 4–5" }]
    },
    {
      id: "m16-q003", modulo: MOD, concepto: "m16-c01", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C6.2", loc: "slide 4" }],
      enunciado: String.raw`Con $p=3$ variables y $K=2$ grupos, calcula los grados de libertad del test de Box's M: $p(p+1)(K-1)/2$.`,
      respuesta: 6, tolerancia: 0,
      explicacion: String.raw`$\dfrac{3\cdot4\cdot1}{2}=6$. (En Ademuz con $p=2$, $K=2$: $\dfrac{2\cdot3\cdot1}{2}=3$.)`,
      verifica: [{ que: "gl", js: "3*4*(2-1)/2", esperado: 6, tol: 0 }, { que: "gl Ademuz", js: "2*3*(2-1)/2", esperado: 3, tol: 0 }],
      fuente: [{ id: "C6.2", loc: "slide 4" }]
    },
    {
      id: "m16-q004", modulo: MOD, concepto: "m16-c01", tipo: "vf", dificultad: 2, origen: "curso",
      enunciado: "Con muestras muy pequeñas se recomienda LDA aunque Box's M sugiera covarianzas distintas, porque QDA estima muchos más parámetros.",
      correcta: true,
      explicacion: "Verdadero. QDA necesita estimar una matriz de covarianza por grupo y requiere más datos por clase; con pocos datos LDA es más estable.",
      fuente: [{ id: "C6.2", loc: "slide 4" }]
    },
    {
      id: "m16-q005", modulo: MOD, concepto: "m16-c01", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Se ajustó un QDA al Banco de Ademuz y se evaluó sobre los mismos 16 clientes. ¿Qué se concluye al compararlo con el LDA?",
      codigoR: `modelo_qda <- qda(grupo ~ patrimonio + deuda, data = datos)
pred_qda <- predict(modelo_qda, datos)
table(Real = datos$grupo, Predicho = pred_qda$class)`,
      salidaR: `           Predicho
Real        Cumplidor Fallido
  Cumplidor         7       1
  Fallido           0       8`,
      salidaDe: ADEMUZ + `modelo_qda <- qda(grupo ~ patrimonio + deuda, data = datos)
pred_qda <- predict(modelo_qda, datos)
table(Real = datos$grupo, Predicho = pred_qda$class)`,
      opciones: [
        "Da la misma matriz de confusión que LDA (exactitud 93,75 %): coherente con que Box's M no rechazó la igualdad de covarianzas",
        "QDA es claramente mejor: acierta los 16 clientes",
        "QDA es peor: acierta solo 8",
        "La matriz no sirve para comparar métodos"
      ],
      correcta: 0,
      explicacion: "7 + 8 = 15 aciertos de 16, igual que LDA. Cuando las covarianzas son similares (Box's M p = 0,85) QDA y LDA tienden a coincidir.",
      fuente: [{ id: "C6.2", loc: "slides 4–5" }]
    },
    {
      id: "m16-q006", modulo: MOD, concepto: "m16-c02", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Por qué se dice que Naive Bayes es «ingenuo»?",
      opciones: [
        "Supone que, dentro de cada grupo, las variables son independientes, lo que permite multiplicar sus probabilidades",
        "Supone que todos los grupos son iguales",
        "Ignora las probabilidades a priori",
        "No usa los datos de entrenamiento"
      ],
      correcta: 0,
      explicacion: "Independencia condicional: P(x | C_k) = Π_j P(x_j | C_k). Es una simplificación que a menudo funciona bien aunque las variables estén correlacionadas.",
      fuente: [{ id: "C6.2", loc: "slides 7–8" }]
    },
    {
      id: "m16-q007", modulo: MOD, concepto: "m16-c02", tipo: "calculo", dificultad: 3, origen: "curso",
      enunciado: String.raw`Ademuz, cliente $(7,4)$ con Naive Bayes gaussiano. Para el grupo <em>Fallido</em>: $\text{dnorm}(7;5;2{,}07)=0{,}1208$, $\text{dnorm}(4;5;1{,}86)=0{,}1853$ y prior $0{,}5$. Calcula su score.`,
      respuesta: 0.0112, tolerancia: 0.0003,
      explicacion: String.raw`Score $=0{,}5\times0{,}1208\times0{,}1853=0{,}0112$. El de Cumplidor es $0{,}5\times0{,}1190\times0{,}1940=0{,}0115$. Como $0{,}0115>0{,}0112$, el cliente se clasifica como <strong>Cumplidor</strong> (el LDA lo dejaba en la frontera).`,
      verifica: [{ que: "score Fallido", js: "0.5*0.1208*0.1853", esperado: 0.01118, tol: 0.0001 }],
      fuente: [{ id: "C6.2", loc: "slides 10–11" }]
    },
    {
      id: "m16-q008", modulo: MOD, concepto: "m16-c02", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Ayudantía 6, P1: los scores de Naive Bayes son $0{,}046$ (Sí abandona) y $0{,}037$ (No abandona). ¿Cuál es $P(\text{Sí}\mid x)$?`,
      respuesta: 0.554, tolerancia: 0.003,
      explicacion: String.raw`Posterior = score / suma de scores: $\dfrac{0{,}046}{0{,}046+0{,}037}=0{,}554$. El cliente se clasifica como «Sí» (abandona), aunque la probabilidad no es muy contundente. Con <code>naiveBayes</code> en R se obtiene $0{,}5524$, porque la pauta redondea los scores antes de normalizar.`,
      verifica: [{ que: "posterior", js: "0.046/(0.046+0.037)", esperado: 0.5542, tol: 0.0001 }],
      fuente: [{ id: "AY6-E", loc: "P1" }, { id: "AY6-P", loc: "P1" }]
    },
    {
      id: "m16-q009", modulo: MOD, concepto: "m16-c02", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Se ajustó Naive Bayes gaussiano (e1071) al Banco de Ademuz y se predijo el cliente (7, 4). ¿Qué dice la salida?",
      codigoR: `modelo_nb <- naiveBayes(grupo ~ patrimonio + deuda, data = datos)
predict(modelo_nb, data.frame(patrimonio = 7, deuda = 4), type = "raw")`,
      salidaR: `     Cumplidor   Fallido
[1,] 0.5075953 0.4924047`,
      salidaDe: ADEMUZ + `library(e1071)
modelo_nb <- naiveBayes(grupo ~ patrimonio + deuda, data = datos)
predict(modelo_nb, data.frame(patrimonio = 7, deuda = 4), type = "raw")`,
      opciones: [
        "Se clasifica como Cumplidor con probabilidad 0,508, apenas por encima de Fallido (0,492): una decisión poco contundente",
        "Se clasifica como Fallido con probabilidad 0,508",
        "Es Cumplidor con certeza",
        "Las probabilidades no suman 1"
      ],
      correcta: 0,
      explicacion: "type = \"raw\" entrega las posteriores normalizadas (suman 1). La mayor es la de Cumplidor (0,5076), que coincide con los scores a mano 0,0115 vs 0,0112 normalizados.",
      fuente: [{ id: "C6.2", loc: "slides 10–14" }]
    },
    {
      id: "m16-q010", modulo: MOD, concepto: "m16-c02", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "En Naive Bayes, la posterior de un grupo se obtiene dividiendo su score por la suma de los scores de todos los grupos.",
      correcta: true,
      explicacion: "Los scores P(C_k)·ΠP(x_j|C_k) son proporcionales a la posterior; al normalizarlos (dividir por su suma) suman 1.",
      fuente: [{ id: "C6.2", loc: "slides 9–11" }]
    },
    {
      id: "m16-q011", modulo: MOD, concepto: "m16-c03", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Ayudantía 6, P2 (pyme con liquidez 1,5 y endeudamiento 0,6): densidades Fracaso $0{,}7528$ y $2{,}4197$; priors iguales $(0{,}5;\ 0{,}5)$. Calcula el score de <strong>Fracaso</strong>.`,
      respuesta: 0.911, tolerancia: 0.003,
      explicacion: String.raw`$0{,}5\times0{,}7528\times2{,}4197=0{,}911$. El score de Éxito es $0{,}5\times0{,}4839\times1{,}5221=0{,}368$ ⇒ <strong>Fracaso</strong>. Nota: <code>dnorm</code> da una densidad, que puede superar $1$ (aquí $2{,}42$), sin ser una probabilidad.`,
      verifica: [{ que: "score Fracaso", js: "0.5*0.7528*2.4197", esperado: 0.91078, tol: 0.0005 }],
      fuente: [{ id: "AY6-E", loc: "P2" }, { id: "AY6-P", loc: "P2" }]
    },
    {
      id: "m16-q012", modulo: MOD, concepto: "m16-c03", tipo: "calculo", dificultad: 3, origen: "curso",
      enunciado: String.raw`Con los mismos datos de la pyme pero priors $P(\text{Fracaso})=0{,}2$ y $P(\text{Éxito})=0{,}8$, calcula $P(\text{Éxito}\mid x)$.`,
      respuesta: 0.618, tolerancia: 0.003,
      explicacion: String.raw`Scores: Fracaso $=0{,}2\cdot0{,}7528\cdot2{,}4197=0{,}364$; Éxito $=0{,}8\cdot0{,}4839\cdot1{,}5221=0{,}589$. Posterior de Éxito $=0{,}589/(0{,}364+0{,}589)=0{,}618$. Con priors iguales ganaba Fracaso: el prior cambió la decisión a favor del grupo más frecuente.`,
      verifica: [{ que: "posterior Éxito", js: "(0.8*0.4839*1.5221)/((0.8*0.4839*1.5221)+(0.2*0.7528*2.4197))", esperado: 0.618, tol: 0.0005 }],
      fuente: [{ id: "AY6-E", loc: "P2" }, { id: "AY6-P", loc: "P2" }]
    },
    {
      id: "m16-q013", modulo: MOD, concepto: "m16-c03", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "Ningún cliente que abandonó (5 en total) era Premium, así que P(Premium | Sí) = 0/5 = 0. ¿Qué problema genera y cómo se resuelve?",
      opciones: [
        "El score de «Sí» se anula para cualquier cliente Premium; se corrige con el suavizado de Laplace: (0+1)/(5+2)",
        "El modelo no se puede entrenar; hay que eliminar la variable",
        "Aumenta el sobreajuste; se aplica LOO",
        "No genera problema alguno"
      ],
      correcta: 0,
      explicacion: "Un factor 0 anula todo el producto (frecuencia cero). Laplace suma 1 al conteo y m (nº de categorías) al denominador: (0 + 1)/(5 + 2) = 1/7 ≈ 0,143. En R: naiveBayes(…, laplace = 1).",
      verifica: [{ que: "Laplace", js: "(0+1)/(5+2)", esperado: 0.1429, tol: 0.0001 }],
      fuente: [{ id: "AY6-E", loc: "P1(d)" }, { id: "AY6-P", loc: "P1(d)" }]
    },
    {
      id: "m16-q014", modulo: MOD, concepto: "m16-c03", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Un valor de dnorm mayor que 1 indica que hubo un error de cálculo, pues las probabilidades no pueden superar 1.",
      correcta: false,
      explicacion: "Falso. dnorm devuelve una DENSIDAD (no una probabilidad): puede superar 1 cuando la desviación estándar es pequeña (p. ej. 2,42 en AY6 P2). Lo que debe sumar 1 son las posteriores ya normalizadas.",
      verifica: [{ que: "dnorm > 1", r: `cat(as.integer(dnorm(0, 0, 0.1) > 1))`, esperado: 1, tol: 0 }],
      fuente: [{ id: "AY6-E", loc: "P2" }]
    },
    {
      id: "m16-q015", modulo: MOD, concepto: "m16-c04", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "Naive Bayes equivale a QDA con matrices de covarianza…",
      opciones: ["Diagonales (variables independientes dentro de cada grupo)", "Idénticas para todos los grupos", "Singulares", "Con todas las correlaciones iguales a 1"],
      correcta: 0,
      explicacion: "La independencia condicional de NB implica covarianzas diagonales dentro de cada grupo; LDA es el caso de matrices idénticas y QDA el de matrices libres.",
      fuente: [{ id: "C6.2", loc: "slides 12–13" }]
    },
    {
      id: "m16-q016", modulo: MOD, concepto: "m16-c04", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "Se tienen pocos datos y muchas variables, algunas categóricas. ¿Qué método es el más apropiado?",
      opciones: ["Naive Bayes", "QDA", "LDA con una matriz por grupo", "Box's M"],
      correcta: 0,
      explicacion: "NB tiene pocos parámetros, funciona con pocas observaciones, maneja variables categóricas y es robusto a variables irrelevantes. QDA necesitaría muchos datos para estimar una Σ por grupo.",
      fuente: [{ id: "C6.2", loc: "slides 12–13" }]
    },
    {
      id: "m16-q017", modulo: MOD, concepto: "m16-c04", tipo: "multiple", dificultad: 2, origen: "curso",
      enunciado: "¿Cuáles son ventajas de Naive Bayes?",
      opciones: [
        "Es rápido y escalable",
        "Funciona razonablemente con pocas observaciones",
        "Es robusto a variables irrelevantes y puede manejar variables categóricas",
        "Capta bien las correlaciones entre variables"
      ],
      correcta: [0, 1, 2],
      explicacion: "Sus ventajas: sencillo, rápido, pocas observaciones, interpretable, robusto a ruido y con categóricas. Su debilidad: el supuesto de independencia le impide captar correlaciones (y sus probabilidades pueden estar mal calibradas).",
      fuente: [{ id: "C6.2", loc: "slides 12–13" }]
    },
    {
      id: "m16-q018", modulo: MOD, concepto: "m16-c05", tipo: "calculo", dificultad: 1, origen: "curso",
      enunciado: String.raw`LDA de Ademuz con <em>Cumplidor</em> como clase positiva: VP $=7$, FN $=1$, FP $=0$, VN $=8$. Calcula la sensibilidad.`,
      respuesta: 0.875, tolerancia: 0.002,
      explicacion: String.raw`Sensibilidad $=\dfrac{VP}{VP+FN}=\dfrac{7}{8}=0{,}875$: de los 8 cumplidores reales, se detectaron 7. Especificidad $=8/8=1$; precisión $=7/7=1$; VPN $=8/9=0{,}889$.`,
      verifica: [{ que: "sensibilidad", js: "7/(7+1)", esperado: 0.875, tol: 1e-9 }, { que: "VPN", js: "8/(8+1)", esperado: 0.8889, tol: 0.0001 }],
      fuente: [{ id: "C6.2", loc: "slides 16–17" }]
    },
    {
      id: "m16-q019", modulo: MOD, concepto: "m16-c05", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "AY6-E", loc: "P3(b)" }],
      enunciado: String.raw`Un clasificador tiene VP $=40$, FN $=10$, FP $=5$ y VN $=45$. Calcula la <strong>precisión</strong> (valor predictivo positivo) $VP/(VP+FP)$.`,
      respuesta: 0.8889, tolerancia: 0.002,
      explicacion: String.raw`Precisión $=\dfrac{40}{45}=0{,}889$. Las demás métricas: sensibilidad $40/50=0{,}80$; especificidad $45/50=0{,}90$; VPN $45/55=0{,}818$; exactitud $85/100=0{,}85$.`,
      verifica: [
        { que: "precisión", js: "40/(40+5)", esperado: 0.8889, tol: 0.0001 },
        { que: "VPN", js: "45/(45+10)", esperado: 0.8182, tol: 0.0001 },
        { que: "exactitud", js: "(40+45)/100", esperado: 0.85, tol: 1e-9 }
      ],
      fuente: [{ id: "C6.2", loc: "slides 16–17" }, { id: "AY6-E", loc: "P3(b)" }]
    },
    {
      id: "m16-q020", modulo: MOD, concepto: "m16-c05", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "En una base con 95 % de clientes que no abandonan, un modelo que predice «no abandona» para todos tiene exactitud 95 %. ¿Qué se concluye?",
      opciones: [
        "La exactitud puede ser engañosa con clases desbalanceadas: la sensibilidad para la clase «abandona» es 0",
        "El modelo es excelente, pues acierta 95 %",
        "La especificidad es 0",
        "El modelo tiene sobreajuste"
      ],
      correcta: 0,
      explicacion: "Con clases desbalanceadas hay que mirar sensibilidad/especificidad según la clase de interés (positivo = abandona): aquí detecta 0 de los que abandonan.",
      fuente: [{ id: "C6.2", loc: "slides 16–17" }]
    },
    {
      id: "m16-q021", modulo: MOD, concepto: "m16-c06", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Por qué el accuracy calculado con los mismos datos de entrenamiento es engañoso?",
      opciones: [
        "Sobreestima el rendimiento real: el modelo ya «vio» esas observaciones",
        "Subestima el rendimiento real",
        "Es idéntico al rendimiento en datos nuevos",
        "Solo se equivoca con variables categóricas"
      ],
      correcta: 0,
      explicacion: "Es como estudiar con las respuestas del examen. Para estimar el rendimiento honesto se usa train/test, k-fold o Leave-One-Out.",
      fuente: [{ id: "C6.2", loc: "slides 18–20" }]
    },
    {
      id: "m16-q022", modulo: MOD, concepto: "m16-c06", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "Con n = 16 observaciones, ¿qué validación aprovecha mejor los datos?",
      opciones: ["Leave-One-Out", "Train/test 80-20", "No validar", "Evaluar con los datos de entrenamiento"],
      correcta: 0,
      explicacion: "LOO entrena con n − 1 observaciones y predice la restante, repitiendo n veces. Con muestras pequeñas la partición train/test es poco fiable.",
      fuente: [{ id: "C6.2", loc: "slides 18–20" }]
    },
    {
      id: "m16-q023", modulo: MOD, concepto: "m16-c06", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Se evaluó el LDA de Ademuz con Leave-One-Out. ¿Cuál es el accuracy y qué compara con el de entrenamiento (0,9375)?",
      codigoR: `modelo_loo <- lda(grupo ~ patrimonio + deuda, data = datos, CV = TRUE)
tabla_loo <- table(Real = datos$grupo, Predicho = modelo_loo$class)
tabla_loo
sum(diag(tabla_loo)) / sum(tabla_loo)`,
      salidaR: `           Predicho
Real        Cumplidor Fallido
  Cumplidor         6       2
  Fallido           0       8
[1] 0.875`,
      salidaDe: ADEMUZ + `modelo_loo <- lda(grupo ~ patrimonio + deuda, data = datos, CV = TRUE)
tabla_loo <- table(Real = datos$grupo, Predicho = modelo_loo$class)
tabla_loo
sum(diag(tabla_loo)) / sum(tabla_loo)`,
      opciones: [
        "0,875 (14/16), menor que 0,9375: el accuracy de entrenamiento sobreestimaba el rendimiento",
        "0,875, mayor que el de entrenamiento",
        "0,9375, igual al de entrenamiento",
        "0,5, porque hay 2 errores"
      ],
      correcta: 0,
      explicacion: "6 + 8 = 14 aciertos de 16 ⇒ 0,875. Los dos cumplidores mal clasificados son los clientes 9 y 13. La caída respecto de 0,9375 muestra el optimismo del accuracy de entrenamiento.",
      fuente: [{ id: "C6.2", loc: "slide 20" }]
    },
    {
      id: "m16-q024", modulo: MOD, concepto: "m16-c06", tipo: "completar-R", dificultad: 2, origen: "curso",
      enunciado: "Completa el código para obtener las clasificaciones por Leave-One-Out con LDA.",
      codigoR: `modelo_loo <- lda(grupo ~ patrimonio + deuda, data = datos, ___ = ___)
modelo_loo$class`,
      huecos: [["CV"], ["TRUE", "T"]],
      explicacion: String.raw`<code>lda(…, CV = TRUE)</code> hace validación cruzada dejando uno fuera: <code>$class</code> trae la clasificación de cada observación con un modelo entrenado sin ella.`,
      fuente: [{ id: "C6.2", loc: "slide 20" }]
    },
    {
      id: "m16-q025", modulo: MOD, concepto: "m16-c06", tipo: "multiple", dificultad: 2, origen: "nueva",
      enunciado: "¿Cuáles afirmaciones sobre la validación cruzada son correctas?",
      opciones: [
        "En k-fold se entrena con k−1 partes y se evalúa con la restante, promediando los k accuracies",
        "LOO es k-fold con k = n",
        "Con LOO cada observación es de test exactamente una vez",
        "El accuracy de entrenamiento suele ser menor que el de validación cruzada"
      ],
      correcta: [0, 1, 2],
      explicacion: "Las tres primeras son la definición. La última es falsa: el accuracy de entrenamiento suele ser MAYOR (optimista) que el de validación.",
      fuente: [{ id: "C6.2", loc: "slides 18–20" }]
    }
  ]);
})();
