/* ============================================================================
   M16 · QDA, Naive Bayes y validación (P2)
   Fuentes abiertas para redactar: C6.2 slides 2–21 · S6.2 · AY6-E P1, P2, P3 y AY6-P.
   Laplace no está en las clases: viene de AY6 P1(d). Los números se recalculan en
   tools/verificar_numeros.js.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m16-qda-nb-validacion",
  orden: 16,
  titulo: "QDA, Naive Bayes y validación",
  descripcion: "Cuándo pasar de LDA a QDA, cómo clasifica Naive Bayes con probabilidades, y cómo evaluar un clasificador con la matriz de confusión y validación cruzada.",
  pruebas: ["P2"],
  prioridad: "alta",
  fuentes: [{ id: "C6.2", loc: "slides 2–21" }, { id: "AY6-E", loc: "P1, P2, P3" }, { id: "AY6-P", loc: "P1–P3" }],

  conceptos: [
    {
      id: "m16-c01",
      titulo: "LDA vs. QDA y el test de Box's M",
      figura: { tipo: "fronteras",
        pie: "Esquema: si los grupos comparten la matriz de covarianza la frontera es una recta (LDA); si no, es una curva (QDA)." },
      cubre: ["M16.1"],
      simple: String.raw`<p>LDA supone que todos los grupos tienen la misma matriz de covarianza (frontera <strong>recta</strong>). QDA permite una matriz distinta por grupo (frontera <strong>curva</strong>), a costa de estimar más parámetros.</p>`,
      formal: String.raw`<table class="tabla"><thead><tr><th></th><th>LDA</th><th>QDA</th></tr></thead><tbody>
<tr><td>Covarianzas</td><td>$\Sigma_1=\dots=\Sigma_K$</td><td>$\Sigma_1\ne\Sigma_2\ne\dots$</td></tr>
<tr><td>Frontera</td><td>Lineal</td><td>Cuadrática</td></tr>
<tr><td>Parámetros</td><td>Menos: más estable, sirve con pocos datos</td><td>Más: flexible, necesita más datos por grupo</td></tr>
<tr><td>Cuándo</td><td>Box's M no rechaza $H_0$</td><td>Box's M rechaza $H_0$</td></tr></tbody></table>
<p><strong>Box's M:</strong> $H_0:\Sigma_1=\dots=\Sigma_K$. p-valor $>0{,}05$ ⇒ covarianzas iguales ⇒ LDA; p-valor $\le0{,}05$ ⇒ distintas ⇒ QDA. <strong>Regla práctica:</strong> con muestras pequeñas, preferir LDA aunque Box's M sugiera covarianzas distintas. Grados de libertad de Box's M: $p(p+1)(K-1)/2$. En R: <code>biotools::boxM(datos[, vars], datos$grupo)</code> y <code>MASS::qda()</code>.</p>`,
      ejemplo: String.raw`<p>Ademuz (C6.2 s4–5): Box's M $\chi^2=0{,}8035$, $\text{gl}=2\cdot3\cdot1/2=3$, p-valor $=0{,}8486>0{,}05$ ⇒ no se rechaza ⇒ LDA. El QDA da la misma matriz de confusión ($7,1,0,8$) y accuracy $0{,}9375$.</p>
<p class="ayuda">La slide 5 explica el parecido entre LDA y QDA con «Box's M p = 0,544»; el p-valor de la slide 4 (y el recalculado) es $0{,}8486$. Ver «Diferencias entre fuentes».</p>`,
      r: {
        nota: "El paquete biotools no está instalado en esta máquina; el estadístico de Box's M se calcula aquí a mano (misma fórmula).",
        codigo: `library(MASS)
modelo_qda <- qda(grupo ~ patrimonio + deuda, data = datos)
pred_qda <- predict(modelo_qda, datos)
table(Real = datos$grupo, Predicho = pred_qda$class)`,
        rlab: "r-m16-qda-boxm"
      },
      errores: ["Usar QDA con muestras muy pequeñas solo porque Box's M rechaza.", "Olvidar que Box's M requiere mirar el p-valor: &gt; 0,05 ⇒ LDA."],
      memoriza: String.raw`<p>Box's M: $p>0{,}05$ ⇒ LDA; $p\le0{,}05$ ⇒ QDA. Muestra pequeña ⇒ LDA. gl $=p(p+1)(K-1)/2$.</p>`,
      comprueba: {
        enunciado: "Box's M da p-valor = 0,8486 con α = 0,05. ¿Qué método conviene?",
        opciones: ["LDA", "QDA", "Naive Bayes categórico", "Regresión lineal"],
        correcta: 0,
        explicacion: "p > 0,05 ⇒ no se rechaza que las covarianzas sean iguales ⇒ LDA."
      },
      verifica: [{ que: "gl de Box's M (p=2, K=2)", js: "2*3*(2-1)/2", esperado: 3, tol: 1e-9 }],
      fuente: [{ id: "C6.2", loc: "slides 3–5" }]
    },

    {
      id: "m16-c02",
      titulo: "Naive Bayes: Bayes, independencia condicional y verosimilitudes",
      cubre: ["M16.4"],
      simple: String.raw`<p>Naive Bayes se pregunta «¿a qué grupo se parece más este cliente?» usando probabilidades. Es «ingenuo» porque supone que, dentro de cada grupo, las variables son <strong>independientes</strong>, lo que permite multiplicar las probabilidades de cada variable.</p>`,
      formal: String.raw`$$P(C_k\mid x)\ \propto\ P(C_k)\prod_{j}P(x_j\mid C_k)$$
<ul>
  <li><strong>Prior</strong> $P(C_k)=n_k/n$.</li>
  <li><strong>Verosimilitud continua (gaussiana):</strong> $x_j\mid C_k\sim N(\mu_{jk},\sigma_{jk}^2)$ con media y varianza de cada variable por grupo; se evalúa con <code>dnorm</code>.</li>
  <li><strong>Verosimilitud categórica:</strong> frecuencia relativa $n_{jkv}/n_k$.</li>
  <li>Se clasifica en el grupo de mayor score; la <strong>posterior</strong> se obtiene normalizando los scores.</li>
</ul>`,
      ejemplo: String.raw`<p>Ademuz, cliente $(7,4)$ (C6.2 s10–11). Medias y sd por grupo: Fallido patrimonio $(5;\ 2{,}07)$ y deuda $(5;\ 1{,}86)$; Cumplidor patrimonio $(9;\ 2{,}29)$ y deuda $(3;\ 1{,}74)$.</p>
<ul>
  <li>Fallido: $0{,}1208\times0{,}1853\times0{,}5=0{,}0112$.</li>
  <li>Cumplidor: $0{,}1190\times0{,}1940\times0{,}5=0{,}0115$.</li>
  <li>$0{,}0115>0{,}0112$ ⇒ <strong>Cumplidor</strong> (LDA lo dejaba en la frontera).</li>
</ul>
<p>Ayudantía 6, P1 (14 clientes de telecom; nuevo: Básico, con reclamo, Antiguo): priors $P(Sí)=5/14$ y $P(No)=9/14$; scores $0{,}046$ (Sí) y $0{,}037$ (No); posterior $P(Sí\mid x)=0{,}554$ ⇒ <strong>abandona</strong> (no muy contundente). R con <code>naiveBayes</code> da $0{,}5524$ (la pauta redondea los scores antes de normalizar).</p>`,
      r: {
        nota: "e1071::naiveBayes (C6.2 slide 14); aquí con las variables categóricas de AY6 P1.",
        codigo: `library(e1071)
modelo_nb <- naiveBayes(grupo ~ patrimonio + deuda, data = datos)
modelo_nb$apriori
predict(modelo_nb, datos)`,
        rlab: "r-m16-nb"
      },
      errores: ["Normalizar mal: la posterior es score / suma de los scores.", "Creer que las variables realmente son independientes: es una simplificación."],
      memoriza: String.raw`<p>$P(C_k\mid x)\propto P(C_k)\prod P(x_j\mid C_k)$; gaussiano con <code>dnorm</code>, categórico con frecuencias relativas; posterior = score/suma.</p>`,
      comprueba: {
        enunciado: "Scores de Naive Bayes: 0,046 para «Sí» y 0,037 para «No». ¿Cuál es P(Sí | x) aproximada?",
        opciones: ["0,55", "0,046", "0,37", "0,84"],
        correcta: 0,
        explicacion: "0,046 / (0,046 + 0,037) = 0,554."
      },
      verifica: [
        { que: "score Fallido", r: `cat(round(dnorm(7,5,sd(c(1.3,3.7,5,5.9,7.1,4,7.9,5.1)))*dnorm(4,5,sd(c(4.1,6.9,3,6.5,5.4,2.7,7.6,3.8)))*0.5, 4))`, esperado: 0.0112, tol: 0.00005 },
        { que: "score Cumplidor", r: `cat(round(dnorm(7,9,sd(c(5.2,9.8,9,12,6.3,8.7,11.1,9.9)))*dnorm(4,3,sd(c(1,4.2,4.8,2,5.2,1.1,4.1,1.6)))*0.5, 4))`, esperado: 0.0115, tol: 0.00005 },
        { que: "posterior Sí (AY6 P1)", js: "(5/14*4/5*4/5*1/5)/((5/14*4/5*4/5*1/5)+(9/14*3/9*2/9*7/9))", esperado: 0.5524, tol: 0.0001 }
      ],
      fuente: [{ id: "C6.2", loc: "slides 7–11 y 14" }, { id: "AY6-E", loc: "P1" }, { id: "AY6-P", loc: "P1" }]
    },

    {
      id: "m16-c03",
      titulo: "Probabilidades a priori y frecuencia cero (Laplace)",
      cubre: ["M16.2", "M16.3"],
      simple: String.raw`<p>El prior pesa en la decisión: si un grupo es mucho más frecuente, hace falta mucha más evidencia en contra para clasificar en el otro. Y si una categoría nunca aparece en un grupo, su probabilidad es $0$ y <strong>anula todo el producto</strong>; se arregla con el suavizado de Laplace.</p>`,
      formal: String.raw`<p><strong>Frecuencia cero:</strong> si $P(x_j=v\mid C_k)=0$, el score de $C_k$ es $0$ sin importar las demás variables. <strong>Laplace</strong>:
$$P(x_j=v\mid C_k)=\frac{n_{jkv}+1}{n_k+m_j}$$
con $m_j$ el número de categorías de la variable $j$. En R: <code>naiveBayes(…, laplace = 1)</code>. (Laplace no está en las clases: aparece en la Ayudantía 6.)</p>
<p><strong>Densidad gaussiana:</strong> <code>dnorm</code> devuelve una <em>densidad</em>, que puede ser mayor que $1$ cuando la desviación es pequeña (p. ej. $2{,}42$ y $1{,}52$ en AY6 P2); no es una probabilidad.</p>`,
      ejemplo: String.raw`<p>Ayudantía 6, P2 (pyme con liquidez $1{,}5$ y endeudamiento $0{,}6$). Densidades: Fracaso $0{,}7528$ y $2{,}4197$; Éxito $0{,}4839$ y $1{,}5221$.</p>
<ol>
  <li>Priors iguales: Fracaso $=0{,}7528\cdot2{,}4197\cdot0{,}5=0{,}911$; Éxito $=0{,}4839\cdot1{,}5221\cdot0{,}5=0{,}368$ ⇒ <strong>Fracaso</strong>.</li>
  <li>Priors $(0{,}2;\ 0{,}8)$: Fracaso $=0{,}364$; Éxito $=0{,}589$ ⇒ <strong>Éxito</strong>, con $P(\text{Éxito}\mid x)=0{,}618$.</li>
  <li>El prior cambió la decisión: favorece al grupo más frecuente.</li>
</ol>
<p>Ayudantía 6, P1(d): si ningún cliente que abandonó fuera Premium, $P(\text{Premium}\mid Sí)=0/5=0$ y un cliente Premium nunca se clasificaría como «Sí». Con Laplace: $(0+1)/(5+2)=1/7$.</p>`,
      errores: ["Interpretar un valor de <code>dnorm</code> mayor que 1 como probabilidad inválida: es una densidad.", "Ignorar el prior al comparar scores."],
      memoriza: String.raw`<p>Frecuencia cero ⇒ score 0 ⇒ Laplace $(n+1)/(n_k+m_j)$, <code>laplace = 1</code>. El prior inclina la decisión hacia el grupo más frecuente.</p>`,
      comprueba: {
        enunciado: "Una categoría nunca aparece en un grupo del entrenamiento. ¿Qué problema genera en Naive Bayes y cómo se resuelve?",
        opciones: ["Probabilidad 0 que anula el score; se suaviza con Laplace", "Aumenta el sobreajuste; se aplica LOO", "La covarianza no es invertible; se usa QDA", "Ninguno"],
        correcta: 0,
        explicacion: "Un factor 0 anula el producto; Laplace suma 1 a cada conteo."
      },
      verifica: [
        { que: "score Fracaso priors iguales", js: "0.7528*2.4197*0.5", esperado: 0.9108, tol: 0.0005 },
        { que: "P(Éxito|x) con priors 0,2/0,8", js: "(0.8*0.4839*1.5221)/((0.8*0.4839*1.5221)+(0.2*0.7528*2.4197))", esperado: 0.618, tol: 0.0005 },
        { que: "Laplace Premium|Sí", js: "(0+1)/(5+2)", esperado: 0.1429, tol: 0.0001 }
      ],
      fuente: [{ id: "C6.2", loc: "slides 7 y 9" }, { id: "AY6-E", loc: "P1(d), P2" }, { id: "AY6-P", loc: "P1(d), P2" }]
    },

    {
      id: "m16-c04",
      titulo: "Comparación LDA, QDA y Naive Bayes",
      cubre: ["M16.5"],
      simple: String.raw`<p>LDA es un caso particular de QDA (covarianzas iguales); Naive Bayes es como QDA pero con covarianzas <strong>diagonales</strong> (sin correlación entre variables dentro de cada grupo).</p>`,
      formal: String.raw`<table class="tabla"><thead><tr><th></th><th>LDA</th><th>QDA</th><th>Naive Bayes</th></tr></thead><tbody>
<tr><td>Distribución</td><td>Normal multivariante</td><td>Normal multivariante</td><td>Normal univariante (gaussiano)</td></tr>
<tr><td>Covarianza</td><td>Común</td><td>Distinta por grupo</td><td>Diagonal</td></tr>
<tr><td>Frontera</td><td>Lineal</td><td>Cuadrática</td><td>No lineal</td></tr>
<tr><td>Parámetros / datos</td><td>Moderado / moderados</td><td>Alto / muchos</td><td>Bajo / pocos</td></tr>
<tr><td>Velocidad</td><td>Rápido</td><td>Moderado</td><td>Muy rápido</td></tr></tbody></table>
<p><strong>¿Cuándo?</strong> Pocos datos con $\Sigma$ similares ⇒ LDA · $\Sigma$ distintas ⇒ QDA · muchas variables ⇒ NB.</p>
<ul>
  <li><strong>NB, ventajas:</strong> fácil, funciona con pocas observaciones, escalable, interpretable, robusto a ruido y variables irrelevantes, maneja categóricas.</li>
  <li><strong>NB, desventajas:</strong> supuesto fuerte de independencia, no capta correlaciones, probabilidades mal calibradas, puede superarlo un método sofisticado con datos suficientes.</li>
</ul>`,
      errores: ["Decir que NB no puede usar variables categóricas: las maneja naturalmente."],
      memoriza: String.raw`<p>LDA ⊂ QDA (Σ iguales). NB = QDA con covarianza diagonal. LDA: pocos datos; QDA: Σ distintas y muchos datos; NB: muchas variables.</p>`,
      comprueba: {
        enunciado: "Naive Bayes equivale a QDA con matrices de covarianza…",
        opciones: ["Diagonales", "Idénticas", "Singulares", "Negativas"],
        correcta: 0,
        explicacion: "La independencia condicional implica covarianzas diagonales dentro de cada grupo."
      },
      fuente: [{ id: "C6.2", loc: "slides 12–13" }]
    },

    {
      id: "m16-c05",
      titulo: "Matriz de confusión y sus métricas",
      figura: { tipo: "confusion", donde: "ejemplo", pos: "Cumplidor", neg: "Fallido", vp: 7, fn: 1, fp: 0, vn: 8,
        pie: "LDA de Ademuz con Cumplidor como clase positiva. Elige una métrica para ver qué casillas usa." },
      cubre: ["M16.6"],
      simple: String.raw`<p>La matriz de confusión cuenta aciertos y errores del clasificador. De ella salen varias métricas, cada una responde una pregunta distinta.</p>`,
      formal: String.raw`<table class="tabla"><thead><tr><th>Métrica</th><th>Fórmula</th><th>Responde</th></tr></thead><tbody>
<tr><td>Exactitud</td><td>$(VP+VN)/\text{Total}$</td><td>Proporción de aciertos</td></tr>
<tr><td>Sensibilidad (recall)</td><td>$VP/(VP+FN)$</td><td>De los positivos reales, ¿cuántos detectamos?</td></tr>
<tr><td>Especificidad</td><td>$VN/(VN+FP)$</td><td>De los negativos reales, ¿cuántos detectamos?</td></tr>
<tr><td>Precisión (VPP)</td><td>$VP/(VP+FP)$</td><td>De los predichos positivos, ¿cuántos lo son?</td></tr>
<tr><td>VPN</td><td>$VN/(VN+FN)$</td><td>De los predichos negativos, ¿cuántos lo son?</td></tr></tbody></table>
<p><strong>Cuidado:</strong> el accuracy puede ser engañoso con clases desbalanceadas (predecir siempre la mayoritaria). Hay que decir qué clase es la «positiva».</p>`,
      ejemplo: String.raw`<p>LDA de Ademuz, con <em>Cumplidor</em> como positivo (C6.2 s17): VP $=7$, FN $=1$, FP $=0$, VN $=8$.</p>
<ul>
  <li>Exactitud $=15/16=93{,}75\,\%$.</li>
  <li>Sensibilidad $=7/8=87{,}5\,\%$; especificidad $=8/8=100\,\%$.</li>
  <li>Precisión $=7/7=100\,\%$; VPN $=8/9=88{,}9\,\%$.</li>
</ul>`,
      errores: ["Calcular las métricas con la clase positiva equivocada.", "Confiar en el accuracy cuando una clase es mucho más grande que la otra."],
      memoriza: String.raw`<p>Sensibilidad $VP/(VP+FN)$ · especificidad $VN/(VN+FP)$ · precisión $VP/(VP+FP)$ · VPN $VN/(VN+FN)$ · exactitud $(VP+VN)/n$.</p>`,
      comprueba: {
        enunciado: "VP = 7, FN = 1, FP = 0, VN = 8. ¿Cuál es la sensibilidad?",
        opciones: ["0,875", "1", "0,889", "0,9375"],
        correcta: 0,
        explicacion: "7/(7+1) = 0,875."
      },
      verifica: [
        { que: "sensibilidad", js: "7/(7+1)", esperado: 0.875, tol: 1e-9 },
        { que: "VPN", js: "8/(8+1)", esperado: 0.8889, tol: 0.0001 },
        { que: "exactitud", js: "(7+8)/16", esperado: 0.9375, tol: 1e-9 }
      ],
      fuente: [{ id: "C6.2", loc: "slides 16–17" }, { id: "AY6-E", loc: "P3(b)" }]
    },

    {
      id: "m16-c06",
      titulo: "Sobreajuste y validación (train/test, k-fold, LOO)",
      figura: { tipo: "kfold", k: 5,
        pie: "K-fold con K = 5: cada parte se usa una vez como prueba y las otras cuatro para entrenar." },
      cubre: ["M16.7"],
      simple: String.raw`<p>Evaluar un modelo con los mismos datos con que se entrenó es como estudiar con las respuestas del examen: da una nota demasiado buena. El <strong>sobreajuste</strong> es memorizar los datos de entrenamiento y fallar con datos nuevos.</p>`,
      formal: String.raw`<ul>
  <li><strong>Train/test:</strong> entrenar con 70–80 % y probar con 20–30 %. Con pocos datos (n = 16) la partición es poco fiable.</li>
  <li><strong>K-fold:</strong> dividir en $K$ partes; entrenar con $K-1$ y evaluar con la restante; promediar los $K$ accuracies.</li>
  <li><strong>Leave-One-Out (LOO):</strong> $K=n$; cada observación es test una vez. Ideal para muestras pequeñas. En R: <code>lda(…, CV = TRUE)</code>.</li>
  <li>El accuracy de entrenamiento <strong>sobreestima</strong> el rendimiento real.</li>
</ul>`,
      ejemplo: String.raw`<p>Ademuz (C6.2 s20): LOO con LDA: Cumplidor $6$ bien y $2$ mal; Fallido $8$ bien ⇒ accuracy LOO $=14/16=0{,}875$, menor que el $0{,}9375$ de entrenamiento. Los errores son los clientes 9 y 13.</p>`,
      r: {
        nota: "Código de C6.2 slide 20.",
        codigo: `modelo_loo <- lda(grupo ~ patrimonio + deuda, data = datos, CV = TRUE)
tabla_loo <- table(Real = datos$grupo, Predicho = modelo_loo$class)
tabla_loo
sum(diag(tabla_loo)) / sum(tabla_loo)`,
        rlab: "r-m16-loo"
      },
      errores: ["Reportar solo el accuracy de entrenamiento.", "Usar train/test con una muestra muy pequeña."],
      memoriza: String.raw`<p>Accuracy de entrenamiento sobreestima · LOO = k-fold con $K=n$ · <code>lda(…, CV = TRUE)</code> · Ademuz: 0,9375 (train) vs 0,875 (LOO).</p>`,
      comprueba: {
        enunciado: "Con n = 16 observaciones, ¿qué validación aprovecha mejor los datos?",
        opciones: ["Leave-One-Out", "Train/test 80-20", "No validar", "Evaluar con los datos de entrenamiento"],
        correcta: 0,
        explicacion: "LOO entrena con 15 y predice 1, repitiendo 16 veces."
      },
      verifica: [{ que: "accuracy LOO", js: "14/16", esperado: 0.875, tol: 1e-9 }],
      fuente: [{ id: "C6.2", loc: "slides 18–20" }]
    }
  ],

  errores: [
    { texto: "El accuracy de entrenamiento siempre sobreestima el rendimiento real.", fuente: [{ id: "C6.2", loc: "slide 20" }] }
  ]
});
