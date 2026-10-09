/* ============================================================================
   M08 · Inferencia sobre el vector de medias: T² de Hotelling (P1)
   Fuentes abiertas para redactar: C2 slides 40–49 (Mardia, Kent & Bibby, 1979).
   El ejemplo numérico de la corteza usa cork.csv, que no está en el repositorio:
   sus resultados se citan tal cual de la slide 49. El ejemplo calculado aquí usa
   los datos X1 y X2 de C1 slide 24 (valores construidos, sin relación con la corteza).
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m08-t2-hotelling",
  orden: 8,
  titulo: "Inferencia sobre el vector de medias: T² de Hotelling",
  descripcion: "Contrastar varias medias a la vez: el T² de Hotelling, su región de confianza elíptica y los intervalos simultáneos.",
  pruebas: ["P1"],
  prioridad: "media",
  fuentes: [{ id: "C2", loc: "slides 40–49" }],

  conceptos: [
    {
      id: "m08-c01",
      titulo: "Por qué un contraste conjunto, y su supuesto",
      cubre: ["M08.1", "M08.2"],
      simple: String.raw`<p>Cuando se miden $p$ variables a la vez interesa saber si el <strong>vector de medias</strong> es un valor dado, no cada media por separado. Hacer $p$ pruebas $t$ individuales no equivale a una prueba conjunta: se puede no rechazar cada una por separado y aun así rechazar la conjunta (y al revés).</p>`,
      formal: String.raw`<ul>
  <li>El contraste conjunto <strong>controla el error global</strong> y <strong>aprovecha la correlación</strong> entre variables; las $p$ pruebas $t$ no hacen ni lo uno ni lo otro (C2 s41).</li>
  <li>Su región de aceptación es una <strong>elipse/elipsoide</strong> (no un rectángulo).</li>
  <li><strong>Supuesto:</strong> muestra aleatoria de una normal multivariada $N_p(\mu,\Sigma)$. Los contornos son elipsoides de la distancia de Mahalanobis $(x-\mu)'\Sigma^{-1}(x-\mu)=c^2$.</li>
  <li>Antes de usar $T^2$ conviene verificar normalidad multivariada con el test de Mardia: <code>MVN::mvn(X, mvnTest = "mardia")</code> o <code>psych::mardia(X)</code> (C2 s42).</li>
</ul>`,
      errores: ["Reemplazar el T² por p pruebas t separadas sin ajustar el nivel global."],
      memoriza: String.raw`<p>Contraste conjunto ⇒ región elíptica, controla error global y usa la correlación. Supuesto: normal multivariada (test de Mardia).</p>`,
      comprueba: {
        enunciado: "¿Qué ventaja tiene el contraste conjunto T² frente a p pruebas t separadas?",
        opciones: ["Controla el error global y usa la correlación entre variables", "Es más fácil de calcular a mano", "No requiere supuestos", "Solo sirve para una variable"],
        correcta: 0,
        explicacion: "Esa es la idea clave de C2 s41."
      },
      fuente: [{ id: "C2", loc: "slides 40–42" }]
    },

    {
      id: "m08-c02",
      titulo: "T² de una muestra y regla de decisión",
      cubre: ["M08.3"],
      simple: String.raw`<p>El T² es la versión multivariada de la $t$ de Student: mide qué tan lejos está el vector de medias muestral de $\mu_0$, usando la matriz de covarianza para «pesar» cada dirección. Con $p=1$ el $T^2$ es exactamente $t^2$.</p>`,
      formal: String.raw`<p>$H_0:\mu=\mu_0$ vs $H_1:\mu\ne\mu_0$.</p>
$$T^2=n\,(\bar x-\mu_0)'S^{-1}(\bar x-\mu_0),\qquad \frac{n-p}{(n-1)p}\,T^2\sim F_{(p,\ n-p)}\ \text{bajo }H_0$$
<p>Se rechaza si $T^2>\dfrac{(n-1)p}{n-p}F_\alpha(p,n-p)$, o si el p-valor $P\!\left(F_{(p,n-p)}>\tfrac{n-p}{(n-1)p}T^2\right)<\alpha$. Pasos (s44): calcular $\bar x$ y $S$; calcular $T^2$; comparar con el crítico o calcular el p-valor; si se rechaza, usar intervalos simultáneos para ver qué variables lo explican. En R: <code>ICSNP::HotellingsT2(X, mu = mu0)</code>.</p>`,
      ejemplo: String.raw`<p>Ejemplo construido con las variables $X_1,X_2$ de C1 s24 ($n=10$, $p=2$) y $\mu_0=(13,\ 9)$:</p>
<ol>
  <li>$\bar x=(13{,}91;\ 9{,}21)$ y $S=\begin{pmatrix}2{,}445&0{,}780\\0{,}780&0{,}719\end{pmatrix}$.</li>
  <li>$T^2=3{,}523$.</li>
  <li>$F=\dfrac{10-2}{9\cdot2}\,T^2=1{,}566$ con gl $(2,8)$ ⇒ p-valor $=0{,}267$.</li>
  <li>Crítico de $T^2$: $\dfrac{9\cdot2}{8}F_{0{,}05}(2,8)=10{,}03$. Como $3{,}523<10{,}03$, no se rechaza $H_0$.</li>
</ol>`,
      r: {
        nota: "T² calculado con álgebra de matrices en R base (la slide 48 usa ICSNP::HotellingsT2). Mismo cálculo, sin paquete.",
        codigo: `X1 <- c(12.0, 14.5, 13.1, 15.3, 16.2, 11.8, 14.0, 13.7, 15.9, 12.6)
X2 <- c(8.2, 7.9, 9.1, 10.5, 9.7, 8.8, 9.3, 10.1, 9.9, 8.6)
X <- cbind(X1, X2); n <- nrow(X); p <- ncol(X); mu0 <- c(13, 9)
xbar <- colMeans(X); S <- cov(X)
T2 <- n * t(xbar - mu0) %*% solve(S) %*% (xbar - mu0)
Fobs <- (n - p) / ((n - 1) * p) * as.numeric(T2)
c(T2 = as.numeric(T2), F = Fobs, p_valor = 1 - pf(Fobs, p, n - p))`,
        rlab: "r-m08-t2"
      },
      errores: ["Usar la F sin la constante $(n-p)/((n-1)p)$.", "Olvidar que los gl de la F son $(p,\\ n-p)$."],
      memoriza: String.raw`<p>$T^2=n(\bar x-\mu_0)'S^{-1}(\bar x-\mu_0)$ · $\frac{n-p}{(n-1)p}T^2\sim F(p,n-p)$ · con $p=1$, $T^2=t^2$.</p>`,
      comprueba: {
        enunciado: "Con p = 1 variable, ¿a qué es igual el estadístico T² de Hotelling?",
        opciones: ["Al cuadrado del estadístico t de Student", "A la media muestral", "A la varianza", "Al valor p"],
        correcta: 0,
        explicacion: "El T² es la extensión multivariada de la t; con p = 1 coincide con t²."
      },
      verifica: [
        { que: "T² del ejemplo", r: `X <- cbind(c(12.0, 14.5, 13.1, 15.3, 16.2, 11.8, 14.0, 13.7, 15.9, 12.6), c(8.2, 7.9, 9.1, 10.5, 9.7, 8.8, 9.3, 10.1, 9.9, 8.6)); n <- 10; mu0 <- c(13, 9); xb <- colMeans(X); cat(round(n * t(xb - mu0) %*% solve(cov(X)) %*% (xb - mu0), 3))`, esperado: 3.523, tol: 0.0005 },
        { que: "crítico de T² (p=2, n=10)", js: "(9*2/8)*4.45897", esperado: 10.0327, tol: 0.001 },
        { que: "p=1: T² = t²", r: `x <- c(12.0, 14.5, 13.1, 15.3, 16.2, 11.8, 14.0, 13.7, 15.9, 12.6); cat(round(10 * (mean(x) - 13)^2 / var(x) - ((mean(x) - 13) / (sd(x) / sqrt(10)))^2, 8))`, esperado: 0, tol: 1e-6 }
      ],
      fuente: [{ id: "C2", loc: "slides 43–44 y 48" }]
    },

    {
      id: "m08-c03",
      titulo: "Región de confianza elíptica",
      figura: { tipo: "elipseConfianza", x1: [12.0, 14.5, 13.1, 15.3, 16.2, 11.8, 14.0, 13.7, 15.9, 12.6], x2: [8.2, 7.9, 9.1, 10.5, 9.7, 8.8, 9.3, 10.1, 9.9, 8.6], mu0: [13, 9], critT2: 10.03, cT2: 3.167, cBonf: 2.685,
        pie: "Región de confianza al 95 % del ejemplo (n = 10, p = 2). μ₀ = (13; 9) cae dentro de la elipse, por eso el T² no rechaza H₀." },
      cubre: ["M08.4"],
      simple: String.raw`<p>La región de confianza para $\mu$ es una elipse (con $p=2$) centrada en el vector de medias muestral. Si $\mu_0$ cae dentro, no se rechaza $H_0$; si cae fuera, se rechaza. Son la misma información dicha de dos maneras.</p>`,
      formal: String.raw`$$n(\bar x-\mu)'S^{-1}(\bar x-\mu)\le\frac{(n-1)p}{n-p}F_\alpha(p,n-p)$$
<p>Centrada en $\bar x$; sus ejes y orientación vienen de los valores y vectores propios de $S$. En R (con $p=2$): <code>car::ellipse(center = xbar, shape = S/n, radius = …)</code> (C2 s45 y s48).</p>`,
      errores: ["Pensar que el IC de cada media por separado forma la región: ignora la correlación y da un rectángulo."],
      memoriza: String.raw`<p>$\mu_0$ dentro de la elipse $\iff$ no se rechaza $H_0:\mu=\mu_0$.</p>`,
      comprueba: {
        enunciado: "El vector μ0 queda fuera de la región de confianza elíptica del 95 %. ¿Qué se concluye?",
        opciones: ["Se rechaza H0: μ = μ0 al 5 %", "No se rechaza H0", "La región está mal calculada", "Faltan datos"],
        correcta: 0,
        explicacion: "Equivalencia entre el test y la región: μ0 dentro ⇔ no se rechaza."
      },
      fuente: [{ id: "C2", loc: "slide 45" }]
    },

    {
      id: "m08-c04",
      titulo: "Intervalos de confianza simultáneos (T²) y Bonferroni",
      figura: { tipo: "elipseConfianza", donde: "ejemplo", x1: [12.0, 14.5, 13.1, 15.3, 16.2, 11.8, 14.0, 13.7, 15.9, 12.6], x2: [8.2, 7.9, 9.1, 10.5, 9.7, 8.8, 9.3, 10.1, 9.9, 8.6], mu0: [13, 9], critT2: 10.03, cT2: 3.167, cBonf: 2.685, intervalos: true,
        pie: "Los intervalos simultáneos T² forman el rectángulo que encierra justo a la elipse; los de Bonferroni son más angostos." },
      cubre: ["M08.5"],
      simple: String.raw`<p>Si el T² rechaza, la pregunta natural es <em>cuál variable (o combinación)</em> explica el rechazo. Los intervalos simultáneos responden eso manteniendo una confianza global del $1-\alpha$ para todos a la vez.</p>`,
      formal: String.raw`<p>Para toda combinación lineal $a'\mu$ (C2 s46):
$$a'\bar x\ \pm\ \sqrt{\tfrac{p(n-1)}{n-p}F_\alpha(p,n-p)}\ \sqrt{\tfrac{a'Sa}{n}}$$
con $a=e_k$ se obtiene el de cada media: $\bar x_k\pm c_{T^2}\sqrt{s_{kk}/n}$. El intervalo que <em>no</em> contiene el valor de $\mu_0$ señala qué variable explica el rechazo.</p>
<p><strong>Bonferroni</strong> (s47): $\bar x_k\pm t_{n-1;\ \alpha/2p}\sqrt{s_{kk}/n}$. Es más angosto si solo interesan las $p$ medias originales; T² vale para <em>toda</em> combinación lineal y por eso es más ancho.</p>`,
      ejemplo: String.raw`<p>Corteza (C2 s49): $28$ árboles medidos en 4 direcciones; tres contrastes ortogonales. $T^2=20{,}74$, $F=6{,}40$ con gl $(3,25)$, p-valor $=0{,}0023$ ⇒ se rechaza que el depósito sea igual en las 4 direcciones. Intervalos simultáneos al 95 %: $(N+S)-(E+W)$: $[2{,}18;\ 15{,}53]$ (no contiene $0$); $N-S$: $[-3{,}83;\ 5{,}55]$; $E-W$: $[-4{,}98;\ 6{,}98]$. Solo el primero excluye el $0$, así que es el que explica el rechazo.</p>
<p>Con el ejemplo de $X_1,X_2$ de arriba ($n=10$, $p=2$): los críticos son $c_{T^2}=3{,}167$ y $c_{Bonf}=2{,}685$ (Bonferroni es menor, por lo tanto más angosto).</p>`,
      r: {
        nota: "Críticos de C2 slide 48 (n y p del ejemplo X1, X2).",
        codigo: `n <- 10; p <- 2
cT2 <- sqrt(p * (n - 1) / (n - p) * qf(0.95, p, n - p))
cB  <- qt(1 - 0.05 / (2 * p), n - 1)
c(cT2 = cT2, cBonferroni = cB)`,
        rlab: "r-m08-t2"
      },
      errores: ["Usar Bonferroni cuando interesan combinaciones lineales arbitrarias (ahí corresponde T²)."],
      memoriza: String.raw`<p>T²: válidos para toda combinación $a'\mu$, más anchos. Bonferroni: solo las $p$ medias, más angostos. El intervalo sin el $\mu_0$ explica el rechazo.</p>`,
      comprueba: {
        enunciado: "Solo interesan las p medias originales (no combinaciones). ¿Qué intervalos simultáneos son más precisos?",
        opciones: ["Bonferroni", "T² (Roy)", "Ninguno", "Los mismos"],
        correcta: 0,
        explicacion: "Bonferroni es más angosto cuando solo se quieren las p medias; T² cubre todas las combinaciones lineales."
      },
      verifica: [
        { que: "crítico T² simultáneo", r: `n <- 10; p <- 2; cat(round(sqrt(p*(n-1)/(n-p)*qf(0.95, p, n-p)), 3))`, esperado: 3.167, tol: 0.0005 },
        { que: "crítico Bonferroni", r: `n <- 10; p <- 2; cat(round(qt(1 - 0.05/(2*p), n-1), 3))`, esperado: 2.685, tol: 0.0005 },
        { que: "F de la corteza (de T²=20,74)", js: "20.74*(28-3)/((28-1)*3)", esperado: 6.4012, tol: 0.001 }
      ],
      fuente: [{ id: "C2", loc: "slides 46–49" }]
    }
  ],

  errores: [
    { texto: "Concluir qué variable explica el rechazo sin mirar los intervalos simultáneos.", fuente: [{ id: "C2", loc: "slides 44 y 46" }] }
  ]
});
