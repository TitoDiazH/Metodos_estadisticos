/* ============================================================================
   M03 · Distribución normal multivariada (P1)
   Fuentes abiertas para redactar: C1 slides 32–39 · PR-P1-Q1 afirmaciones 2–3.
   La densidad (s33) y el caso bivariado (s35) están como imagen en la slide.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m03-normal-multivariada",
  orden: 3,
  titulo: "Distribución normal multivariada",
  descripcion: "La normal para varias variables a la vez: un vector de medias y una matriz de covarianza lo describen todo. Incluye la suma de variables normales conjuntas.",
  pruebas: ["P1"],
  prioridad: "baja",
  fuentes: [{ id: "C1", loc: "slides 32–39" }, { id: "PR-P1-Q1", loc: "afirmaciones 2–3" }],

  conceptos: [
    {
      id: "m03-c01",
      titulo: "Definición: media + covarianza",
      figura: { tipo: "nube", modo: "normal", r: 0.7, donde: "ejemplo",
        pie: "Parte en el ejemplo de la clase (ρ = 0,7; varianzas 1). Las elipses son curvas de igual densidad: Σ decide su forma e inclinación." },
      cubre: ["M03.1"],
      simple: String.raw`<p>La normal multivariada extiende la campana de Gauss a varias variables. Cada variable por separado es normal, y quedan descritas por <strong>dos cosas</strong>: un vector de medias y una matriz de covarianza. Idea para recordar (C1 s34): <em>normal multivariada = «media + covarianza»</em>.</p>`,
      formal: String.raw`<p>Se escribe $X\sim N_p(\mu,\Sigma)$.</p>
<ul>
  <li>$\mu$ mueve el centro de la nube de puntos.</li>
  <li>$\Sigma$ fija la forma (dispersión) y la inclinación (correlación).</li>
  <li>En 2D, las curvas de igual densidad son <strong>elipses</strong>; su forma y orientación vienen de $\Sigma$.</li>
</ul>`,
      ejemplo: String.raw`<p>Si $\mu=(0,0)$ y $\Sigma=\begin{pmatrix}1&0{,}7\\0{,}7&1\end{pmatrix}$ (el código de la clase), la nube es una elipse inclinada hacia arriba (correlación positiva) centrada en el origen. Con $\rho=0$ y varianzas iguales sería un círculo.</p>`,
      r: {
        nota: "C1 slide 37 grafica la densidad con mvtnorm::dmvnorm y plot3D::persp3D. La gráfica no se reproduce aquí; solo es para ver la forma.",
        codigo: `library(mvtnorm)
mu <- c(0, 0)
Sigma <- matrix(c(1, 0.7, 0.7, 1), 2)
dmvnorm(c(0, 0), mean = mu, sigma = Sigma)   # densidad en el centro`
      },
      errores: ["Pensar que basta con que cada variable sea normal por separado: la normalidad multivariada pide más (la conjunta)."],
      memoriza: String.raw`<p>$X\sim N_p(\mu,\Sigma)$: $\mu$ = centro, $\Sigma$ = forma e inclinación; contornos elípticos en 2D.</p>`,
      comprueba: {
        enunciado: "¿Qué parámetros bastan para describir completamente una normal multivariada?",
        opciones: ["El vector de medias y la matriz de covarianza", "Solo el vector de medias", "Solo las varianzas", "El tamaño de muestra y la media"],
        correcta: 0,
        explicacion: "Es la idea clave de C1 s32 y s34: centro (μ) más dispersión y dependencia (Σ)."
      },
      fuente: [{ id: "C1", loc: "slides 32–34, 37" }]
    },

    {
      id: "m03-c02",
      titulo: "Caso bivariado: ρ = 0 e independencia",
      cubre: ["M03.2"],
      simple: String.raw`<p>Con dos variables normales conjuntas, que su correlación sea cero <strong>sí</strong> significa que son independientes. Ojo: eso <strong>no</strong> pasa en general con otras distribuciones.</p>`,
      formal: String.raw`<p>Si $(X_1,X_2)$ es normal bivariada y $\rho=0$, entonces $X_1$ y $X_2$ son independientes (C1 s36). En general:</p>
<ul>
  <li>Independientes $\Rightarrow\rho=0$ (siempre, porque $E(XY)=E(X)E(Y)$).</li>
  <li>$\rho=0\Rightarrow$ independientes: <strong>falso</strong> en general; vale solo con normal conjunta.</li>
</ul>`,
      ejemplo: String.raw`<p>La pauta de la Prueba 1 (afirmación 3) lo justifica de tres maneras: (a) la relación puede ser no lineal y dar correlación $0$; (b) solo vale con normal conjunta; (c) una variable puede influir en la distribución de la otra (p. ej. su varianza) aunque la correlación sea $0$.</p>`,
      errores: ["Responder «verdadero» a «correlación 0 implica independencia» sin aclarar que requiere normal conjunta."],
      memoriza: String.raw`<p>Independencia $\Rightarrow\rho=0$. $\rho=0\Rightarrow$ independencia <strong>solo con normal bivariada</strong>.</p>`,
      comprueba: {
        enunciado: "Dos variables tienen correlación 0. ¿En qué caso se puede afirmar que son independientes?",
        opciones: ["Si siguen una normal bivariada conjunta", "Siempre", "Nunca", "Si la muestra es grande"],
        correcta: 0,
        explicacion: "La implicancia ρ = 0 ⇒ independencia vale únicamente para la normal conjunta (C1 s36)."
      },
      fuente: [{ id: "C1", loc: "slides 35–36" }, { id: "PR-P1-Q1", loc: "afirmaciones 2–3" }]
    },

    {
      id: "m03-c03",
      titulo: "Combinación lineal: media y varianza de Y = X₁ + X₂",
      cubre: ["M03.3"],
      simple: String.raw`<p>La suma de dos normales conjuntas es normal. Para trabajar con ella solo hay que calcular su <strong>media</strong> y su <strong>varianza</strong>; después se usa la normal de siempre (<code>pnorm</code>).</p>`,
      formal: String.raw`<p>Con $Y=X_1+X_2$:</p>
$$E(Y)=\mu_1+\mu_2,\qquad \operatorname{Var}(Y)=\sigma_1^2+\sigma_2^2+2\sigma_{12}$$
<p>Pasos (C1 s38): identificar $\mu$ y $\Sigma$, calcular la media de $Y$, calcular la varianza de $Y$, aplicar normal univariada. La covarianza $\sigma_{12}$ suma dos veces porque aparece en $\operatorname{Var}(X_1+X_2)$.</p>`,
      ejemplo: String.raw`<p>C1 s39: $\mu=(1,2)$, $\Sigma=\begin{pmatrix}4&1\\1&3\end{pmatrix}$.</p>
<ol>
  <li>$E(Y)=1+2=3$.</li>
  <li>$\operatorname{Var}(Y)=4+3+2\cdot1=9$, así que $\sigma_Y=3$.</li>
  <li>$P(Y\le5)=\Phi\!\left(\dfrac{5-3}{3}\right)=\Phi(0{,}667)=0{,}7475$.</li>
</ol>`,
      r: {
        nota: "Código de C1 slide 39.",
        codigo: `mu <- c(1, 2)
Sigma <- matrix(c(4, 1, 1, 3), 2, 2)
mu_y <- sum(mu)
sd_y <- sqrt(4 + 3 + 2*1)
pnorm(5, mean = mu_y, sd = sd_y)`,
        salida: `[1] 0.7475075`,
        rlab: "r-m03-suma"
      },
      lectura: String.raw`<p>El resultado es $P(Y\le5)=0{,}7475$. El paso clave es la varianza: se suma $2\sigma_{12}$ (aquí $2\cdot1$). Si se olvidara, se obtendría $\sqrt7$ en vez de $3$.</p>`,
      errores: ["Olvidar el término $2\\sigma_{12}$ y sumar solo las varianzas.", "Usar la varianza como si fuera desviación estándar en <code>pnorm</code> (pide sd)."],
      memoriza: String.raw`<p>$\operatorname{Var}(X_1+X_2)=\sigma_1^2+\sigma_2^2+2\sigma_{12}$ · en <code>pnorm</code> se pasa la <strong>desviación</strong>, no la varianza.</p>`,
      comprueba: {
        enunciado: "X tiene Σ = [[4,1],[1,3]]. ¿Cuál es Var(X₁ + X₂)?",
        opciones: ["9", "7", "8", "10"],
        correcta: 0,
        explicacion: "4 + 3 + 2·1 = 9."
      },
      verifica: [
        { que: "Var(Y)", js: "4+3+2*1", esperado: 9, tol: 1e-9 },
        { que: "P(Y<=5)", r: `cat(round(pnorm(5, 3, 3), 4))`, esperado: 0.7475, tol: 0.00005 }
      ],
      fuente: [{ id: "C1", loc: "slides 38–39" }]
    }
  ],

  errores: [
    { texto: "«Correlación 0 ⇒ independencia» es falso en general.", fuente: [{ id: "PR-P1-Q1", loc: "afirmación 3" }] }
  ]
});
