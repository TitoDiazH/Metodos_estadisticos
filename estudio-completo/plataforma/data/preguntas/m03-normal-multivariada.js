/* ============================================================================
   Preguntas · M03 Distribución normal multivariada (P1)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m03-normal-multivariada";

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m03-q001", modulo: MOD, concepto: "m03-c01", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: String.raw`Si $X\sim N_p(\mu,\Sigma)$, ¿qué papel cumple cada parámetro?`,
      opciones: [
        String.raw`$\mu$ fija el centro de la nube; $\Sigma$ fija su dispersión e inclinación`,
        String.raw`$\mu$ fija la dispersión; $\Sigma$ fija el centro`,
        String.raw`Ambos solo fijan el centro`,
        String.raw`$\Sigma$ es el número de variables y $\mu$ el tamaño de muestra`
      ],
      correcta: 0,
      explicacion: String.raw`Normal multivariada = «media + covarianza»: $\mu$ desplaza el centro y $\Sigma$ determina la forma (varianzas) y la inclinación (correlaciones) de las elipses de igual densidad.`,
      fuente: [{ id: "C1", loc: "slides 32–34" }]
    },
    {
      id: "m03-q002", modulo: MOD, concepto: "m03-c01", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Si cada una de las variables X₁, …, X_p es normal por separado, entonces el vector (X₁, …, X_p) es necesariamente normal multivariado.",
      correcta: false,
      explicacion: "Falso. La normalidad multivariada exige que toda combinación lineal sea normal (normalidad conjunta). Que cada marginal sea normal es necesario pero no suficiente.",
      fuente: [{ id: "C1", loc: "slides 32–34" }]
    },
    {
      id: "m03-q003", modulo: MOD, concepto: "m03-c01", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: String.raw`En una normal bivariada con $\mu=(0,0)$, varianzas iguales y $\rho=0$, ¿qué forma tienen las curvas de igual densidad?`,
      opciones: ["Círculos centrados en el origen", "Elipses inclinadas hacia arriba", "Elipses inclinadas hacia abajo", "Rectas"],
      correcta: 0,
      explicacion: String.raw`Sin correlación y con la misma varianza, la nube no se estira en ninguna dirección: los contornos son círculos. Con $\rho>0$ son elipses inclinadas hacia arriba, y con $\rho<0$ hacia abajo.`,
      distractores: ["", "Eso ocurre con ρ > 0.", "Eso ocurre con ρ < 0.", "Las curvas de nivel de una densidad con ρ < 1 son cerradas."],
      fuente: [{ id: "C1", loc: "slides 34–37" }]
    },
    {
      id: "m03-q004", modulo: MOD, concepto: "m03-c02", tipo: "vf", dificultad: 2, origen: "curso",
      enunciado: "Si dos variables tienen correlación 0, entonces son independientes.",
      correcta: false,
      explicacion: String.raw`Falso en general. (i) La relación puede ser no lineal y aun así dar correlación $0$ (p. ej. $Y=X^2$ con $X$ simétrica); (ii) la implicancia $\rho=0\Rightarrow$ independencia vale solo si las variables son <strong>normales conjuntas</strong>; (iii) una variable puede afectar la distribución de la otra (p. ej. su varianza) sin afectar su correlación.`,
      verifica: [{ que: "cor(x, x^2) = 0 para x simétrica", r: `x <- c(-2,-1,0,1,2); cat(cor(x, x^2))`, esperado: 0, tol: 1e-12 }],
      fuente: [{ id: "PR-P1-Q1", loc: "afirmación 3" }, { id: "C1", loc: "slide 36" }]
    },
    {
      id: "m03-q005", modulo: MOD, concepto: "m03-c02", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "Dos variables tienen correlación 0. ¿En cuál de estos casos se puede asegurar que son independientes?",
      opciones: [
        "Cuando (X₁, X₂) sigue una distribución normal bivariada",
        "Cuando la muestra tiene más de 30 observaciones",
        "Cuando ambas variables tienen la misma varianza",
        "Siempre que la covarianza muestral sea exactamente 0"
      ],
      correcta: 0,
      explicacion: "La equivalencia entre correlación cero e independencia es propiedad de la normal conjunta. Las otras condiciones no la garantizan.",
      distractores: ["", "El tamaño de muestra no cambia la relación entre correlación e independencia.", "Igual varianza no implica independencia.", "Una covarianza muestral 0 puede darse con dependencia no lineal."],
      fuente: [{ id: "C1", loc: "slide 36" }, { id: "PR-P1-Q1", loc: "afirmación 3" }]
    },
    {
      id: "m03-q006", modulo: MOD, concepto: "m03-c03", tipo: "calculo", dificultad: 1, origen: "curso",
      enunciado: String.raw`Sea $X\sim N_2(\mu,\Sigma)$ con $\mu=(1,2)$ y $\Sigma=\begin{pmatrix}4&1\\1&3\end{pmatrix}$, e $Y=X_1+X_2$. Calcula $\operatorname{Var}(Y)$.`,
      respuesta: 9, tolerancia: 0.01,
      explicacion: String.raw`$\operatorname{Var}(Y)=\sigma_1^2+\sigma_2^2+2\sigma_{12}=4+3+2\cdot1=9$ (y $E(Y)=3$).`,
      verifica: [{ que: "Var(Y)", r: `S <- matrix(c(4,1,1,3),2); cat(sum(S))`, esperado: 9, tol: 1e-9 }],
      fuente: [{ id: "C1", loc: "slides 38–39" }]
    },
    {
      id: "m03-q007", modulo: MOD, concepto: "m03-c03", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Con los mismos datos ($\mu=(1,2)$, $\Sigma=\begin{pmatrix}4&1\\1&3\end{pmatrix}$, $Y=X_1+X_2$), calcula $P(Y\le5)$.`,
      respuesta: 0.7475, tolerancia: 0.002,
      explicacion: String.raw`$Y\sim N(3,\,9)$, o sea $\sigma_Y=3$. $P(Y\le5)=\Phi\!\left(\dfrac{5-3}{3}\right)=\Phi(0{,}667)=0{,}7475$. En R: <code>pnorm(5, mean = 3, sd = 3)</code> (se pasa la desviación, no la varianza).`,
      verifica: [{ que: "P(Y<=5)", r: `cat(round(pnorm(5, 3, 3), 4))`, esperado: 0.7475, tol: 0.00005 }],
      fuente: [{ id: "C1", loc: "slide 39" }]
    },
    {
      id: "m03-q008", modulo: MOD, concepto: "m03-c03", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C1", loc: "slide 39" }],
      enunciado: String.raw`Sea $X\sim N_2(\mu,\Sigma)$ con $\mu=(2,5)$ y $\Sigma=\begin{pmatrix}9&2\\2&4\end{pmatrix}$, e $Y=X_1+X_2$. Calcula $P(Y\le10)$.`,
      respuesta: 0.7666, tolerancia: 0.002,
      explicacion: String.raw`$E(Y)=2+5=7$; $\operatorname{Var}(Y)=9+4+2\cdot2=17$, así que $\sigma_Y=\sqrt{17}=4{,}123$. $P(Y\le10)=\Phi\!\left(\dfrac{10-7}{4{,}123}\right)=\Phi(0{,}7276)=0{,}7666$.`,
      verifica: [
        { que: "Var(Y)", js: "9+4+2*2", esperado: 17, tol: 1e-9 },
        { que: "P(Y<=10)", r: `cat(round(pnorm(10, 7, sqrt(17)), 4))`, esperado: 0.7666, tol: 0.00005 }
      ],
      fuente: [{ id: "C1", loc: "slides 38–39" }]
    },
    {
      id: "m03-q009", modulo: MOD, concepto: "m03-c03", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C1", loc: "slide 39" }],
      enunciado: String.raw`Sea $X\sim N_2(\mu,\Sigma)$ con $\mu=(1,3)$ y $\Sigma=\begin{pmatrix}4&0\\0&1\end{pmatrix}$ ($X_1$ y $X_2$ independientes), e $Y=X_1+X_2$. Calcula $P(Y>6)$.`,
      respuesta: 0.1855, tolerancia: 0.002,
      explicacion: String.raw`$E(Y)=4$; con $\sigma_{12}=0$, $\operatorname{Var}(Y)=4+1=5$ y $\sigma_Y=2{,}236$. $P(Y>6)=1-\Phi\!\left(\dfrac{6-4}{2{,}236}\right)=1-\Phi(0{,}894)=0{,}1855$.`,
      verifica: [{ que: "P(Y>6)", r: `cat(round(1 - pnorm(6, 4, sqrt(5)), 4))`, esperado: 0.1855, tol: 0.00005 }],
      fuente: [{ id: "C1", loc: "slides 38–39" }]
    },
    {
      id: "m03-q010", modulo: MOD, concepto: "m03-c03", tipo: "completar-R", dificultad: 2, origen: "curso",
      enunciado: String.raw`Completa el código para calcular $P(Y\le5)$ con $Y=X_1+X_2$, $\mu=(1,2)$ y $\Sigma=\begin{pmatrix}4&1\\1&3\end{pmatrix}$.`,
      codigoR: `mu <- c(1, 2)
mu_y <- sum(mu)
sd_y <- ___(4 + 3 + 2*1)
___(5, mean = mu_y, sd = sd_y)`,
      huecos: [["sqrt"], ["pnorm"]],
      explicacion: String.raw`La varianza de $Y$ es $4+3+2\cdot1=9$; <code>pnorm</code> pide la <strong>desviación estándar</strong>, por eso se aplica <code>sqrt()</code>.`,
      fuente: [{ id: "C1", loc: "slide 39" }]
    },
    {
      id: "m03-q011", modulo: MOD, concepto: "m03-c03", tipo: "codigo-R", dificultad: 2, origen: "nueva",
      enunciado: String.raw`Para $Y=X_1+X_2$ con $\Sigma=\begin{pmatrix}4&1\\1&3\end{pmatrix}$ y $\mu_Y=3$, un compañero escribe el siguiente código. ¿Qué error tiene?`,
      codigoR: `sd_y <- 4 + 3 + 2*1
pnorm(5, mean = 3, sd = sd_y)`,
      opciones: [
        "Pasa la varianza (9) como sd: falta aplicar sqrt() para obtener la desviación estándar (3)",
        "Debería sumar solo las varianzas, sin el 2·1",
        "pnorm no admite el argumento mean",
        "Debería usar qnorm en lugar de pnorm"
      ],
      correcta: 0,
      explicacion: String.raw`La suma $4+3+2\cdot1=9$ es la <em>varianza</em>. El argumento <code>sd</code> de <code>pnorm</code> es la desviación estándar $\sqrt9=3$. Con $9$ se obtiene $0{,}5879$ en vez de $0{,}7475$.`,
      verifica: [
        { que: "con sd=9 (erróneo)", r: `cat(round(pnorm(5, 3, 9), 4))`, esperado: 0.5879, tol: 0.0005 },
        { que: "con sd=3 (correcto)", r: `cat(round(pnorm(5, 3, 3), 4))`, esperado: 0.7475, tol: 0.00005 }
      ],
      fuente: [{ id: "C1", loc: "slides 38–39" }]
    }
  ]);
})();
