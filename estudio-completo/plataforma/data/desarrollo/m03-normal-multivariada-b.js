/* ============================================================================
   Desarrollo · M03 Distribución normal multivariada (P1) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m03-d001",
    modulo: "m03-normal-multivariada",
    concepto: "m03-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 38–39" }
    ],
    titulo: "Tiempo total de dos etapas (covarianza negativa)",
    enunciado: String.raw`<p>Un pedido pasa por dos etapas: preparación ($X_1$) y despacho ($X_2$), en minutos. Suponga que $(X_1,X_2)$ sigue una normal bivariada con $$\mu=\begin{pmatrix}10\\20\end{pmatrix},\qquad \Sigma=\begin{pmatrix}9&-2\\-2&11\end{pmatrix}.$$ Sea $Y=X_1+X_2$ (tiempo total).</p><ol type="a"><li>Calcula la correlación $\rho$ entre $X_1$ y $X_2$ y $E(Y)$.</li><li>Calcula $\operatorname{Var}(Y)$ y $\sigma_Y$.</li><li>Calcula $P(Y>34)$.</li></ol>`,
    partes: [
      { titulo: "a) Correlación y media de Y", puntos: 2, solucion: String.raw`<p>$\rho=\dfrac{\sigma_{12}}{\sigma_1\sigma_2}=\dfrac{-2}{\sqrt{9\cdot11}}=-0{,}201$.</p><p>$E(Y)=\mu_1+\mu_2=10+20=30$.</p>` },
      { titulo: "b) Varianza y desviación de Y", puntos: 2, solucion: String.raw`<p>$\operatorname{Var}(Y)=\sigma_1^2+\sigma_2^2+2\sigma_{12}=9+11+2(-2)=16$ ⇒ $\sigma_Y=4$.</p><p>La covarianza se suma <strong>dos veces</strong> (aquí es negativa, por eso la varianza de la suma es menor que la suma de las varianzas). Olvidarla daría $20$.</p>` },
      { titulo: "c) Probabilidad con la normal univariada", puntos: 2, solucion: String.raw`<p>Una combinación lineal de normales conjuntas es normal: $Y\sim N(30;\ 16)$.</p><p>$z=\dfrac{34-30}{4}=1$ ⇒ $P(Y\le34)=\Phi(1)=0{,}8413$ ⇒ $P(Y>34)=1-0{,}8413=0{,}1587$.</p><p>En R: <code>1 - pnorm(34, 30, sqrt(16))</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "probabilidad", r: "cat(1 - pnorm(34, 30, sqrt(16)))", esperado: 0.1587, tol: 0.000050001 },
      { que: "Var(Y)", js: "9 + 11 + 2*(-2)", esperado: 16, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 38–39" }
    ]
  },
  {
    id: "m03-d002",
    modulo: "m03-normal-multivariada",
    concepto: "m03-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 38–39" }
    ],
    titulo: "Puntaje total de dos pruebas",
    enunciado: String.raw`<p>Un postulante rinde dos pruebas con puntajes $X_1$ y $X_2$. Suponga que $(X_1,X_2)$ sigue una normal bivariada con $$\mu=\begin{pmatrix}50\\30\end{pmatrix},\qquad \Sigma=\begin{pmatrix}16&6\\6&9\end{pmatrix}.$$ Sea $Y=X_1+X_2$ (puntaje total).</p><ol type="a"><li>Calcula la correlación $\rho$ entre $X_1$ y $X_2$ y $E(Y)$.</li><li>Calcula $\operatorname{Var}(Y)$ y $\sigma_Y$.</li><li>Calcula $P(Y\le90)$.</li></ol>`,
    partes: [
      { titulo: "a) Correlación y media de Y", puntos: 2, solucion: String.raw`<p>$\rho=\dfrac{\sigma_{12}}{\sigma_1\sigma_2}=\dfrac{6}{\sqrt{16\cdot9}}=0{,}5$.</p><p>$E(Y)=\mu_1+\mu_2=50+30=80$.</p>` },
      { titulo: "b) Varianza y desviación de Y", puntos: 2, solucion: String.raw`<p>$\operatorname{Var}(Y)=\sigma_1^2+\sigma_2^2+2\sigma_{12}=16+9+2(6)=37$ ⇒ $\sigma_Y=6{,}083$.</p><p>La covarianza se suma <strong>dos veces</strong>. Olvidarla daría $25$.</p>` },
      { titulo: "c) Probabilidad con la normal univariada", puntos: 2, solucion: String.raw`<p>Una combinación lineal de normales conjuntas es normal: $Y\sim N(80;\ 37)$.</p><p>$z=\dfrac{90-80}{6{,}083}=1{,}644$ ⇒ $P(Y\le90)=\Phi(1{,}644)=0{,}9499$.</p><p>En R: <code>pnorm(90, 80, sqrt(37))</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "probabilidad", r: "cat(pnorm(90, 80, sqrt(37)))", esperado: 0.9499, tol: 0.000050001 },
      { que: "Var(Y)", js: "16 + 9 + 2*(6)", esperado: 37, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 38–39" }
    ]
  },
  {
    id: "m03-d003",
    modulo: "m03-normal-multivariada",
    concepto: "m03-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 38–39" }
    ],
    titulo: "Costo total: materiales más mano de obra",
    enunciado: String.raw`<p>El costo de un trabajo (en miles de pesos) se compone de materiales ($X_1$) y mano de obra ($X_2$). Suponga que $(X_1,X_2)$ sigue una normal bivariada con $$\mu=\begin{pmatrix}120\\80\end{pmatrix},\qquad \Sigma=\begin{pmatrix}100&30\\30&64\end{pmatrix}.$$ Sea $Y=X_1+X_2$ (costo total).</p><ol type="a"><li>Calcula la correlación $\rho$ entre $X_1$ y $X_2$ y $E(Y)$.</li><li>Calcula $\operatorname{Var}(Y)$ y $\sigma_Y$.</li><li>Calcula $P(Y>225)$.</li></ol>`,
    partes: [
      { titulo: "a) Correlación y media de Y", puntos: 2, solucion: String.raw`<p>$\rho=\dfrac{\sigma_{12}}{\sigma_1\sigma_2}=\dfrac{30}{\sqrt{100\cdot64}}=0{,}375$.</p><p>$E(Y)=\mu_1+\mu_2=120+80=200$.</p>` },
      { titulo: "b) Varianza y desviación de Y", puntos: 2, solucion: String.raw`<p>$\operatorname{Var}(Y)=\sigma_1^2+\sigma_2^2+2\sigma_{12}=100+64+2(30)=224$ ⇒ $\sigma_Y=14{,}967$.</p><p>La covarianza se suma <strong>dos veces</strong>. Olvidarla daría $164$.</p>` },
      { titulo: "c) Probabilidad con la normal univariada", puntos: 2, solucion: String.raw`<p>Una combinación lineal de normales conjuntas es normal: $Y\sim N(200;\ 224)$.</p><p>$z=\dfrac{225-200}{14{,}967}=1{,}67$ ⇒ $P(Y\le225)=\Phi(1{,}67)=0{,}9526$ ⇒ $P(Y>225)=1-0{,}9526=0{,}0474$.</p><p>En R: <code>1 - pnorm(225, 200, sqrt(224))</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "probabilidad", r: "cat(1 - pnorm(225, 200, sqrt(224)))", esperado: 0.0474, tol: 0.000050001 },
      { que: "Var(Y)", js: "100 + 64 + 2*(30)", esperado: 224, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 38–39" }
    ]
  }
]);
