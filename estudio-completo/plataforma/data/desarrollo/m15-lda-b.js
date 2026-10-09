/* ============================================================================
   Desarrollo · M15 Clasificación supervisada: LDA (P2) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m15-d002",
    modulo: "m15-lda",
    concepto: "m15-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C6.1", loc: "slides 13–19" }
    ],
    titulo: "Discriminante de Fisher con W no diagonal",
    enunciado: String.raw`<p>Un banco clasifica solicitudes con ingreso ($X_1$) y deuda ($X_2$), ambos en millones. Grupo 1 = «Aprobado», grupo 2 = «Rechazado». Medias de grupo: $\bar x_1=(6;\ 3)$ y $\bar x_2=(4;\ 5)$. Matriz de dispersión dentro de grupos: $W=\begin{pmatrix}4&1\\1&2\end{pmatrix}$.</p><ol type="a"><li>Calcula $W^{-1}$.</li><li>Calcula el vector de pesos de Fisher $u=W^{-1}(\bar x_1-\bar x_2)$ y escribe la función discriminante.</li><li>Calcula el puntaje promedio de cada grupo y el punto de corte.</li><li>Clasifica $X=(5;\ 3)$ y $X=(4{,}5;\ 5)$.</li></ol>`,
    partes: [
      { titulo: "a) Inversa de W", puntos: 1.5, solucion: String.raw`<p>$|W|=4\cdot2-(1)^2=7$ ⇒ $W^{-1}=\dfrac{1}{7}\begin{pmatrix}2&-1\\-1&4\end{pmatrix}=\begin{pmatrix}0{,}2857&-0{,}1429\\-0{,}1429&0{,}5714\end{pmatrix}$.</p><p>(Inversa $2\times2$: se intercambia la diagonal, se cambia el signo de los otros dos y se divide por el determinante.)</p>` },
      { titulo: "b) Pesos de Fisher y función discriminante", puntos: 1.5, solucion: String.raw`<p>$\bar x_1-\bar x_2=\begin{pmatrix}2\\-2\end{pmatrix}$ ⇒ $u=W^{-1}(\bar x_1-\bar x_2)=\begin{pmatrix}0{,}8571\\-1{,}4286\end{pmatrix}$.</p><p>Función discriminante: $D=0{,}8571\,X_1-1{,}4286\,X_2$. Solo importa la dirección de $u$: R entrega un múltiplo.</p>` },
      { titulo: "c) Puntajes promedio y punto de corte", puntos: 1.5, solucion: String.raw`<p>$\bar D_1=0{,}8571\cdot6-1{,}4286\cdot3=0{,}8571$ y $\bar D_2=0{,}8571\cdot4-1{,}4286\cdot5=-3{,}7143$.</p><p>Corte: $C=\dfrac{\bar D_1+\bar D_2}{2}=-1{,}4286$. Regla: $D>-1{,}4286$ ⇒ grupo 1 (Aprobado); $D<-1{,}4286$ ⇒ grupo 2 (Rechazado).</p>` },
      { titulo: "d) Clasificar las observaciones nuevas", puntos: 1.5, solucion: String.raw`<p>$X=(5;\ 3)$: $D=0{,}8571\cdot5-1{,}4286\cdot3=0>-1{,}4286$ ⇒ <strong>Aprobado</strong>.</p><p>$X=(4{,}5;\ 5)$: $D=0{,}8571\cdot4{,}5-1{,}4286\cdot5=-3{,}2857<-1{,}4286$ ⇒ <strong>Rechazado</strong>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "u1", r: "cat(solve(matrix(c(4, 1, 1, 2), 2, byrow = TRUE), c(2, -2))[1])", esperado: 0.8571, tol: 0.000050001 },
      { que: "u2", r: "cat(solve(matrix(c(4, 1, 1, 2), 2, byrow = TRUE), c(2, -2))[2])", esperado: -1.4286, tol: 0.000050001 },
      { que: "corte", js: "(0.8571428571428577 + -3.714285714285714)/2", esperado: -1.4286, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C6.1", loc: "slides 13–19" }
    ]
  },
  {
    id: "m15-d003",
    modulo: "m15-lda",
    concepto: "m15-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C6.1", loc: "slides 13–19" }
    ],
    titulo: "Discriminante de Fisher: clientes fieles y fugados",
    enunciado: String.raw`<p>Una empresa clasifica clientes con antigüedad en años ($X_1$) y reclamos del último año ($X_2$). Grupo 1 = «Fiel», grupo 2 = «Fugado». Medias de grupo: $\bar x_1=(12;\ 7)$ y $\bar x_2=(9;\ 8)$. Matriz de dispersión dentro de grupos: $W=\begin{pmatrix}10&4\\4&8\end{pmatrix}$.</p><ol type="a"><li>Calcula $W^{-1}$.</li><li>Calcula el vector de pesos de Fisher $u=W^{-1}(\bar x_1-\bar x_2)$ y escribe la función discriminante.</li><li>Calcula el puntaje promedio de cada grupo y el punto de corte.</li><li>Clasifica $X=(11;\ 9)$ y $X=(10;\ 6)$.</li></ol>`,
    partes: [
      { titulo: "a) Inversa de W", puntos: 1.5, solucion: String.raw`<p>$|W|=10\cdot8-(4)^2=64$ ⇒ $W^{-1}=\dfrac{1}{64}\begin{pmatrix}8&-4\\-4&10\end{pmatrix}=\begin{pmatrix}0{,}125&-0{,}0625\\-0{,}0625&0{,}1563\end{pmatrix}$.</p><p>(Inversa $2\times2$: se intercambia la diagonal, se cambia el signo de los otros dos y se divide por el determinante.)</p>` },
      { titulo: "b) Pesos de Fisher y función discriminante", puntos: 1.5, solucion: String.raw`<p>$\bar x_1-\bar x_2=\begin{pmatrix}3\\-1\end{pmatrix}$ ⇒ $u=W^{-1}(\bar x_1-\bar x_2)=\begin{pmatrix}0{,}4375\\-0{,}3438\end{pmatrix}$.</p><p>Función discriminante: $D=0{,}4375\,X_1-0{,}3438\,X_2$. Solo importa la dirección de $u$: R entrega un múltiplo.</p>` },
      { titulo: "c) Puntajes promedio y punto de corte", puntos: 1.5, solucion: String.raw`<p>$\bar D_1=0{,}4375\cdot12-0{,}3438\cdot7=2{,}8438$ y $\bar D_2=0{,}4375\cdot9-0{,}3438\cdot8=1{,}1875$.</p><p>Corte: $C=\dfrac{\bar D_1+\bar D_2}{2}=2{,}0156$. Regla: $D>2{,}0156$ ⇒ grupo 1 (Fiel); $D<2{,}0156$ ⇒ grupo 2 (Fugado).</p>` },
      { titulo: "d) Clasificar las observaciones nuevas", puntos: 1.5, solucion: String.raw`<p>$X=(11;\ 9)$: $D=0{,}4375\cdot11-0{,}3438\cdot9=1{,}7188<2{,}0156$ ⇒ <strong>Fugado</strong>.</p><p>$X=(10;\ 6)$: $D=0{,}4375\cdot10-0{,}3438\cdot6=2{,}3125>2{,}0156$ ⇒ <strong>Fiel</strong>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "u1", r: "cat(solve(matrix(c(10, 4, 4, 8), 2, byrow = TRUE), c(3, -1))[1])", esperado: 0.4375, tol: 0.000050001 },
      { que: "u2", r: "cat(solve(matrix(c(10, 4, 4, 8), 2, byrow = TRUE), c(3, -1))[2])", esperado: -0.3438, tol: 0.000050001 },
      { que: "corte", js: "(2.84375 + 1.1875)/2", esperado: 2.0156, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C6.1", loc: "slides 13–19" }
    ]
  },
  {
    id: "m15-d004",
    modulo: "m15-lda",
    concepto: "m15-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C6.1", loc: "slides 13–19" }
    ],
    titulo: "Discriminante de Fisher con covarianza negativa",
    enunciado: String.raw`<p>Control de calidad con dos mediciones $X_1$ y $X_2$. Grupo 1 = «Conforme», grupo 2 = «Defectuosa». Medias de grupo: $\bar x_1=(8;\ 5)$ y $\bar x_2=(6;\ 6)$. Matriz de dispersión dentro de grupos: $W=\begin{pmatrix}5&-2\\-2&3\end{pmatrix}$.</p><ol type="a"><li>Calcula $W^{-1}$.</li><li>Calcula el vector de pesos de Fisher $u=W^{-1}(\bar x_1-\bar x_2)$ y escribe la función discriminante.</li><li>Calcula el puntaje promedio de cada grupo y el punto de corte.</li><li>Clasifica $X=(7;\ 6)$ y $X=(6{,}5;\ 4{,}5)$.</li></ol>`,
    partes: [
      { titulo: "a) Inversa de W", puntos: 1.5, solucion: String.raw`<p>$|W|=5\cdot3-(-2)^2=11$ ⇒ $W^{-1}=\dfrac{1}{11}\begin{pmatrix}3&2\\2&5\end{pmatrix}=\begin{pmatrix}0{,}2727&0{,}1818\\0{,}1818&0{,}4545\end{pmatrix}$.</p><p>(Inversa $2\times2$: se intercambia la diagonal, se cambia el signo de los otros dos y se divide por el determinante.)</p>` },
      { titulo: "b) Pesos de Fisher y función discriminante", puntos: 1.5, solucion: String.raw`<p>$\bar x_1-\bar x_2=\begin{pmatrix}2\\-1\end{pmatrix}$ ⇒ $u=W^{-1}(\bar x_1-\bar x_2)=\begin{pmatrix}0{,}3636\\-0{,}0909\end{pmatrix}$.</p><p>Función discriminante: $D=0{,}3636\,X_1-0{,}0909\,X_2$. Solo importa la dirección de $u$: R entrega un múltiplo.</p>` },
      { titulo: "c) Puntajes promedio y punto de corte", puntos: 1.5, solucion: String.raw`<p>$\bar D_1=0{,}3636\cdot8-0{,}0909\cdot5=2{,}4545$ y $\bar D_2=0{,}3636\cdot6-0{,}0909\cdot6=1{,}6364$.</p><p>Corte: $C=\dfrac{\bar D_1+\bar D_2}{2}=2{,}0455$. Regla: $D>2{,}0455$ ⇒ grupo 1 (Conforme); $D<2{,}0455$ ⇒ grupo 2 (Defectuosa).</p>` },
      { titulo: "d) Clasificar las observaciones nuevas", puntos: 1.5, solucion: String.raw`<p>$X=(7;\ 6)$: $D=0{,}3636\cdot7-0{,}0909\cdot6=2<2{,}0455$ ⇒ <strong>Defectuosa</strong>.</p><p>$X=(6{,}5;\ 4{,}5)$: $D=0{,}3636\cdot6{,}5-0{,}0909\cdot4{,}5=1{,}9545<2{,}0455$ ⇒ <strong>Defectuosa</strong>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "u1", r: "cat(solve(matrix(c(5, -2, -2, 3), 2, byrow = TRUE), c(2, -1))[1])", esperado: 0.3636, tol: 0.000050001 },
      { que: "u2", r: "cat(solve(matrix(c(5, -2, -2, 3), 2, byrow = TRUE), c(2, -1))[2])", esperado: -0.0909, tol: 0.000050001 },
      { que: "corte", js: "(2.454545454545454 + 1.6363636363636362)/2", esperado: 2.0455, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C6.1", loc: "slides 13–19" }
    ]
  },
  {
    id: "m15-d005",
    modulo: "m15-lda",
    concepto: "m15-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C6.1", loc: "slides 13–19" }
    ],
    titulo: "Discriminante de Fisher: pymes que pagan y que no pagan",
    enunciado: String.raw`<p>Se clasifican pymes con liquidez ($X_1$) y endeudamiento ($X_2$). Grupo 1 = «Paga», grupo 2 = «No paga». Medias de grupo: $\bar x_1=(2{,}4;\ 1{,}1)$ y $\bar x_2=(1{,}6;\ 1{,}9)$. Matriz de dispersión dentro de grupos: $W=\begin{pmatrix}1{,}5&0{,}3\\0{,}3&0{,}9\end{pmatrix}$.</p><ol type="a"><li>Calcula $W^{-1}$.</li><li>Calcula el vector de pesos de Fisher $u=W^{-1}(\bar x_1-\bar x_2)$ y escribe la función discriminante.</li><li>Calcula el puntaje promedio de cada grupo y el punto de corte.</li><li>Clasifica $X=(2;\ 1{,}6)$ y $X=(1{,}8;\ 1{,}2)$.</li></ol>`,
    partes: [
      { titulo: "a) Inversa de W", puntos: 1.5, solucion: String.raw`<p>$|W|=1{,}5\cdot0{,}9-(0{,}3)^2=1{,}26$ ⇒ $W^{-1}=\dfrac{1}{1{,}26}\begin{pmatrix}0{,}9&-0{,}3\\-0{,}3&1{,}5\end{pmatrix}=\begin{pmatrix}0{,}7143&-0{,}2381\\-0{,}2381&1{,}1905\end{pmatrix}$.</p><p>(Inversa $2\times2$: se intercambia la diagonal, se cambia el signo de los otros dos y se divide por el determinante.)</p>` },
      { titulo: "b) Pesos de Fisher y función discriminante", puntos: 1.5, solucion: String.raw`<p>$\bar x_1-\bar x_2=\begin{pmatrix}0{,}8\\-0{,}8\end{pmatrix}$ ⇒ $u=W^{-1}(\bar x_1-\bar x_2)=\begin{pmatrix}0{,}7619\\-1{,}1429\end{pmatrix}$.</p><p>Función discriminante: $D=0{,}7619\,X_1-1{,}1429\,X_2$. Solo importa la dirección de $u$: R entrega un múltiplo.</p>` },
      { titulo: "c) Puntajes promedio y punto de corte", puntos: 1.5, solucion: String.raw`<p>$\bar D_1=0{,}7619\cdot2{,}4-1{,}1429\cdot1{,}1=0{,}5714$ y $\bar D_2=0{,}7619\cdot1{,}6-1{,}1429\cdot1{,}9=-0{,}9524$.</p><p>Corte: $C=\dfrac{\bar D_1+\bar D_2}{2}=-0{,}1905$. Regla: $D>-0{,}1905$ ⇒ grupo 1 (Paga); $D<-0{,}1905$ ⇒ grupo 2 (No paga).</p>` },
      { titulo: "d) Clasificar las observaciones nuevas", puntos: 1.5, solucion: String.raw`<p>$X=(2;\ 1{,}6)$: $D=0{,}7619\cdot2-1{,}1429\cdot1{,}6=-0{,}3048<-0{,}1905$ ⇒ <strong>No paga</strong>.</p><p>$X=(1{,}8;\ 1{,}2)$: $D=0{,}7619\cdot1{,}8-1{,}1429\cdot1{,}2=0>-0{,}1905$ ⇒ <strong>Paga</strong>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "u1", r: "cat(solve(matrix(c(1.5, 0.3, 0.3, 0.9), 2, byrow = TRUE), c(0.7999999999999998, -0.7999999999999998))[1])", esperado: 0.7619, tol: 0.000050001 },
      { que: "u2", r: "cat(solve(matrix(c(1.5, 0.3, 0.3, 0.9), 2, byrow = TRUE), c(0.7999999999999998, -0.7999999999999998))[2])", esperado: -1.1429, tol: 0.000050001 },
      { que: "corte", js: "(0.571428571428571 + -0.9523809523809521)/2", esperado: -0.1905, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C6.1", loc: "slides 13–19" }
    ]
  },
  {
    id: "m15-d006",
    modulo: "m15-lda",
    concepto: "m15-c02",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C6.1", loc: "slides 10–19" }
    ],
    titulo: "LDA completo desde los datos (dos grupos de 4)",
    enunciado: String.raw`<p>Ocho productos clasificados como «Éxito» o «Fracaso» según dos indicadores:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Grupo</th><th>$X_1$</th><th>$X_2$</th></tr></thead><tbody><tr><td>Éxito</td><td>$2$</td><td>$3$</td></tr><tr><td>Éxito</td><td>$3$</td><td>$5$</td></tr><tr><td>Éxito</td><td>$4$</td><td>$4$</td></tr><tr><td>Éxito</td><td>$3$</td><td>$4$</td></tr><tr><td>Fracaso</td><td>$6$</td><td>$1$</td></tr><tr><td>Fracaso</td><td>$7$</td><td>$3$</td></tr><tr><td>Fracaso</td><td>$9$</td><td>$2$</td></tr><tr><td>Fracaso</td><td>$6$</td><td>$2$</td></tr></tbody></table></div><ol type="a"><li>Calcula las medias de cada grupo y la matriz $W$ (suma de las matrices de dispersión de cada grupo).</li><li>Calcula los pesos de Fisher $u=W^{-1}(\bar x_1-\bar x_2)$.</li><li>Calcula el punto de corte y la regla de decisión.</li><li>Clasifica la observación nueva $(5;\ 4)$ y calcula el porcentaje de aciertos en los datos de entrenamiento.</li></ol>`,
    partes: [
      { titulo: "a) Medias de grupo y matriz W", puntos: 2.5, solucion: String.raw`<p>$\bar x_1=(3;\ 4)$ (Éxito) y $\bar x_2=(7;\ 2)$ (Fracaso).</p><p>Dispersión de cada grupo: $W_g=\sum(x_i-\bar x_g)(x_i-\bar x_g)'$, es decir $\begin{pmatrix}\sum d_1^2&\sum d_1d_2\\\sum d_1d_2&\sum d_2^2\end{pmatrix}$ con $d$ = desviaciones respecto de la media del grupo.</p><p>$W_1=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, $W_2=\begin{pmatrix}6&1\\1&2\end{pmatrix}$ ⇒ $W=W_1+W_2=\begin{pmatrix}8&2\\2&4\end{pmatrix}$.</p>` },
      { titulo: "b) Pesos de Fisher", puntos: 1.5, solucion: String.raw`<p>$|W|=8\cdot4-(2)^2=28$ ⇒ $W^{-1}=\dfrac{1}{28}\begin{pmatrix}4&-2\\-2&8\end{pmatrix}=\begin{pmatrix}0{,}1429&-0{,}0714\\-0{,}0714&0{,}2857\end{pmatrix}$.</p><p>(Inversa $2\times2$: se intercambia la diagonal, se cambia el signo de los otros dos y se divide por el determinante.)</p><p>$\bar x_1-\bar x_2=\begin{pmatrix}-4\\2\end{pmatrix}$ ⇒ $u=W^{-1}(\bar x_1-\bar x_2)=\begin{pmatrix}-0{,}7143\\0{,}8571\end{pmatrix}$.</p><p>Función discriminante: $D=-0{,}7143\,X_1+0{,}8571\,X_2$. Solo importa la dirección de $u$: R entrega un múltiplo.</p>` },
      { titulo: "c) Punto de corte y regla", puntos: 1, solucion: String.raw`<p>$\bar D_1=-0{,}7143\cdot3+0{,}8571\cdot4=1{,}2857$ y $\bar D_2=-0{,}7143\cdot7+0{,}8571\cdot2=-3{,}2857$.</p><p>Corte: $C=\dfrac{\bar D_1+\bar D_2}{2}=-1$. Regla: $D>-1$ ⇒ grupo 1 (Éxito); $D<-1$ ⇒ grupo 2 (Fracaso).</p>` },
      { titulo: "d) Clasificación y porcentaje de aciertos", puntos: 1, solucion: String.raw`<p>$X=(5;\ 4)$: $D=-0{,}7143\cdot5+0{,}8571\cdot4=-0{,}1429>-1$ ⇒ <strong>Éxito</strong>.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Grupo real</th><th>$X_1$</th><th>$X_2$</th><th>$D$</th><th>Predicho</th></tr></thead><tbody><tr><td>Éxito</td><td>$2$</td><td>$3$</td><td>$1{,}143$</td><td>Éxito</td></tr><tr><td>Éxito</td><td>$3$</td><td>$5$</td><td>$2{,}143$</td><td>Éxito</td></tr><tr><td>Éxito</td><td>$4$</td><td>$4$</td><td>$0{,}571$</td><td>Éxito</td></tr><tr><td>Éxito</td><td>$3$</td><td>$4$</td><td>$1{,}286$</td><td>Éxito</td></tr><tr><td>Fracaso</td><td>$6$</td><td>$1$</td><td>$-3{,}429$</td><td>Fracaso</td></tr><tr><td>Fracaso</td><td>$7$</td><td>$3$</td><td>$-2{,}429$</td><td>Fracaso</td></tr><tr><td>Fracaso</td><td>$9$</td><td>$2$</td><td>$-4{,}714$</td><td>Fracaso</td></tr><tr><td>Fracaso</td><td>$6$</td><td>$2$</td><td>$-2{,}571$</td><td>Fracaso</td></tr></tbody></table></div><p>Aciertos: $8/8=100\,\%$. Es un porcentaje optimista: se evalúa con los mismos datos con que se construyó la regla; lo correcto es validar con datos de prueba.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "razón u2/u1 (MASS::lda)", r: `cat({d <- data.frame(x1 = c(2, 3, 4, 3, 6, 7, 9, 6), x2 = c(3, 5, 4, 4, 1, 3, 2, 2), g = rep(c("a", "b"), c(4, 4))); m <- MASS::lda(g ~ x1 + x2, d); m$scaling[2]/m$scaling[1]})`, esperado: -1.2, tol: 0.000500001 },
      { que: "aciertos (MASS::lda, priors iguales)", r: `cat({d <- data.frame(x1 = c(2, 3, 4, 3, 6, 7, 9, 6), x2 = c(3, 5, 4, 4, 1, 3, 2, 2), g = rep(c("a", "b"), c(4, 4))); m <- MASS::lda(g ~ x1 + x2, d, prior = c(0.5, 0.5)); sum(predict(m)$class == d$g)})`, esperado: 8, tol: 0.000050001 },
      { que: "corte", js: "(1.285714285714286 + -3.2857142857142847)/2", esperado: -1, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C6.1", loc: "slides 10–19" }
    ]
  },
  {
    id: "m15-d007",
    modulo: "m15-lda",
    concepto: "m15-c02",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C6.1", loc: "slides 10–19" }
    ],
    titulo: "LDA desde los datos con un caso mal clasificado",
    enunciado: String.raw`<p>Ocho postulantes, «Contratado» o «No contratado», con puntaje técnico y de entrevista:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Grupo</th><th>Técnico</th><th>Entrevista</th></tr></thead><tbody><tr><td>Contratado</td><td>$7$</td><td>$6$</td></tr><tr><td>Contratado</td><td>$8$</td><td>$8$</td></tr><tr><td>Contratado</td><td>$6$</td><td>$7$</td></tr><tr><td>Contratado</td><td>$5$</td><td>$4$</td></tr><tr><td>No contratado</td><td>$4$</td><td>$5$</td></tr><tr><td>No contratado</td><td>$3$</td><td>$3$</td></tr><tr><td>No contratado</td><td>$5$</td><td>$2$</td></tr><tr><td>No contratado</td><td>$6$</td><td>$6$</td></tr></tbody></table></div><ol type="a"><li>Calcula las medias de cada grupo y la matriz $W$ (suma de las matrices de dispersión de cada grupo).</li><li>Calcula los pesos de Fisher $u=W^{-1}(\bar x_1-\bar x_2)$.</li><li>Calcula el punto de corte y la regla de decisión.</li><li>Clasifica la observación nueva $(6;\ 5)$ y calcula el porcentaje de aciertos en los datos de entrenamiento.</li></ol>`,
    partes: [
      { titulo: "a) Medias de grupo y matriz W", puntos: 2.5, solucion: String.raw`<p>$\bar x_1=(6{,}5;\ 6{,}25)$ (Contratado) y $\bar x_2=(4{,}5;\ 4)$ (No contratado).</p><p>Dispersión de cada grupo: $W_g=\sum(x_i-\bar x_g)(x_i-\bar x_g)'$, es decir $\begin{pmatrix}\sum d_1^2&\sum d_1d_2\\\sum d_1d_2&\sum d_2^2\end{pmatrix}$ con $d$ = desviaciones respecto de la media del grupo.</p><p>$W_1=\begin{pmatrix}5&5{,}5\\5{,}5&8{,}75\end{pmatrix}$, $W_2=\begin{pmatrix}5&3\\3&10\end{pmatrix}$ ⇒ $W=W_1+W_2=\begin{pmatrix}10&8{,}5\\8{,}5&18{,}75\end{pmatrix}$.</p>` },
      { titulo: "b) Pesos de Fisher", puntos: 1.5, solucion: String.raw`<p>$|W|=10\cdot18{,}75-(8{,}5)^2=115{,}25$ ⇒ $W^{-1}=\dfrac{1}{115{,}25}\begin{pmatrix}18{,}75&-8{,}5\\-8{,}5&10\end{pmatrix}=\begin{pmatrix}0{,}1627&-0{,}0738\\-0{,}0738&0{,}0868\end{pmatrix}$.</p><p>(Inversa $2\times2$: se intercambia la diagonal, se cambia el signo de los otros dos y se divide por el determinante.)</p><p>$\bar x_1-\bar x_2=\begin{pmatrix}2\\2{,}25\end{pmatrix}$ ⇒ $u=W^{-1}(\bar x_1-\bar x_2)=\begin{pmatrix}0{,}1594\\0{,}0477\end{pmatrix}$.</p><p>Función discriminante: $D=0{,}1594\,X_1+0{,}0477\,X_2$. Solo importa la dirección de $u$: R entrega un múltiplo.</p>` },
      { titulo: "c) Punto de corte y regla", puntos: 1, solucion: String.raw`<p>$\bar D_1=0{,}1594\cdot6{,}5+0{,}0477\cdot6{,}25=1{,}3346$ y $\bar D_2=0{,}1594\cdot4{,}5+0{,}0477\cdot4=0{,}9084$.</p><p>Corte: $C=\dfrac{\bar D_1+\bar D_2}{2}=1{,}1215$. Regla: $D>1{,}1215$ ⇒ grupo 1 (Contratado); $D<1{,}1215$ ⇒ grupo 2 (No contratado).</p>` },
      { titulo: "d) Clasificación y porcentaje de aciertos", puntos: 1, solucion: String.raw`<p>$X=(6;\ 5)$: $D=0{,}1594\cdot6+0{,}0477\cdot5=1{,}1952>1{,}1215$ ⇒ <strong>Contratado</strong>.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Grupo real</th><th>Técnico</th><th>Entrevista</th><th>$D$</th><th>Predicho</th></tr></thead><tbody><tr><td>Contratado</td><td>$7$</td><td>$6$</td><td>$1{,}402$</td><td>Contratado</td></tr><tr><td>Contratado</td><td>$8$</td><td>$8$</td><td>$1{,}657$</td><td>Contratado</td></tr><tr><td>Contratado</td><td>$6$</td><td>$7$</td><td>$1{,}291$</td><td>Contratado</td></tr><tr><td>Contratado</td><td>$5$</td><td>$4$</td><td>$0{,}988$</td><td>No contratado</td></tr><tr><td>No contratado</td><td>$4$</td><td>$5$</td><td>$0{,}876$</td><td>No contratado</td></tr><tr><td>No contratado</td><td>$3$</td><td>$3$</td><td>$0{,}621$</td><td>No contratado</td></tr><tr><td>No contratado</td><td>$5$</td><td>$2$</td><td>$0{,}893$</td><td>No contratado</td></tr><tr><td>No contratado</td><td>$6$</td><td>$6$</td><td>$1{,}243$</td><td>Contratado</td></tr></tbody></table></div><p>Aciertos: $6/8=75\,\%$. Es un porcentaje optimista: se evalúa con los mismos datos con que se construyó la regla; lo correcto es validar con datos de prueba.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "razón u2/u1 (MASS::lda)", r: `cat({d <- data.frame(x1 = c(7, 8, 6, 5, 4, 3, 5, 6), x2 = c(6, 8, 7, 4, 5, 3, 2, 6), g = rep(c("a", "b"), c(4, 4))); m <- MASS::lda(g ~ x1 + x2, d); m$scaling[2]/m$scaling[1]})`, esperado: 0.299, tol: 0.000500001 },
      { que: "aciertos (MASS::lda, priors iguales)", r: `cat({d <- data.frame(x1 = c(7, 8, 6, 5, 4, 3, 5, 6), x2 = c(6, 8, 7, 4, 5, 3, 2, 6), g = rep(c("a", "b"), c(4, 4))); m <- MASS::lda(g ~ x1 + x2, d, prior = c(0.5, 0.5)); sum(predict(m)$class == d$g)})`, esperado: 6, tol: 0.000050001 },
      { que: "corte", js: "(1.3345986984815619 + 0.9083514099783081)/2", esperado: 1.1215, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C6.1", loc: "slides 10–19" }
    ]
  }
]);
