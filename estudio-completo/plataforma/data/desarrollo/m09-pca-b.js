/* ============================================================================
   Desarrollo · M09 Análisis de componentes principales (P1) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m09-d002",
    modulo: "m09-pca",
    concepto: "m09-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C3", loc: "slides 8–12 y 16–18" }
    ],
    titulo: "PCA a mano con una matriz de covarianza 2 × 2",
    enunciado: String.raw`<p>Se estudian dos variables de un grupo de empresas. La matriz de covarianza de ventas ($X_1$) y utilidad ($X_2$) es $$S=\begin{pmatrix}5&2\\2&2\end{pmatrix}.$$</p><ol type="a"><li>Calcula los autovalores.</li><li>¿Qué porcentaje de la varianza total explica cada componente?</li><li>Calcula el autovector (loadings) del primer componente, normalizado, e interprétalo.</li></ol>`,
    partes: [
      { titulo: "a) Ecuación característica y autovalores", puntos: 2.5, solucion: String.raw`<p>$|S-\lambda I|=0$ ⇒ $(5-\lambda)(2-\lambda)-2^2=0$ ⇒ $\lambda^2-7\lambda+6=0$.</p><p>$\lambda=\dfrac{7\pm\sqrt{7^2-4\cdot6}}{2}=\dfrac{7\pm5}{2}$ ⇒ $\lambda_1=6$ y $\lambda_2=1$.</p><p>Comprobación: $\lambda_1+\lambda_2=7$ = traza (varianza total) y $\lambda_1\lambda_2=6=|S|$.</p>` },
      { titulo: "b) Varianza explicada", puntos: 1.5, solucion: String.raw`<p>PC1: $\dfrac{\lambda_1}{\lambda_1+\lambda_2}=\dfrac{6}{7}=85{,}7\,\%$; PC2: $14{,}3\,\%$.</p><p>Con PC1 ya se supera el $80\,\%$: basta un componente.</p>` },
      { titulo: "c) Autovector de λ₁ e interpretación", puntos: 2, solucion: String.raw`<p>$(S-\lambda_1I)v=0$ ⇒ primera fila: $(5-6)v_1+2v_2=0$ ⇒ $v\propto(2;\ 1)$.</p><p>Normalizando (norma $2{,}2361$): $v_1=(0{,}894;\ 0{,}447)$, así $PC_1=0{,}894\,X_1+0{,}447\,X_2$ (con las variables centradas).</p><p>Ambos loadings tienen el mismo signo: PC1 es un índice de «tamaño» que crece con las dos variables; pesa más ventas. El signo global del autovector es arbitrario. En R: <code>eigen(S)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "λ1", r: "cat(eigen(matrix(c(5, 2, 2, 2), 2, byrow = TRUE))$values[1])", esperado: 6, tol: 0.000050001 },
      { que: "λ2", r: "cat(eigen(matrix(c(5, 2, 2, 2), 2, byrow = TRUE))$values[2])", esperado: 1, tol: 0.000050001 },
      { que: "|v11|", r: "cat(abs(eigen(matrix(c(5, 2, 2, 2), 2, byrow = TRUE))$vectors[1, 1]))", esperado: 0.894, tol: 0.000500001 },
      { que: "|v21|", r: "cat(abs(eigen(matrix(c(5, 2, 2, 2), 2, byrow = TRUE))$vectors[2, 1]))", esperado: 0.447, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C3", loc: "slides 8–12 y 16–18" }
    ]
  },
  {
    id: "m09-d003",
    modulo: "m09-pca",
    concepto: "m09-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C3", loc: "slides 8–12 y 16–18" }
    ],
    titulo: "Autovalores y loadings de una matriz 2 × 2 (otro caso)",
    enunciado: String.raw`<p>Se miden dos dimensiones de una pieza. La matriz de covarianza de largo ($X_1$) y ancho ($X_2$) es $$S=\begin{pmatrix}10&6\\6&5\end{pmatrix}.$$</p><ol type="a"><li>Calcula los autovalores.</li><li>¿Qué porcentaje de la varianza total explica cada componente?</li><li>Calcula el autovector (loadings) del primer componente, normalizado, e interprétalo.</li></ol>`,
    partes: [
      { titulo: "a) Ecuación característica y autovalores", puntos: 2.5, solucion: String.raw`<p>$|S-\lambda I|=0$ ⇒ $(10-\lambda)(5-\lambda)-6^2=0$ ⇒ $\lambda^2-15\lambda+14=0$.</p><p>$\lambda=\dfrac{15\pm\sqrt{15^2-4\cdot14}}{2}=\dfrac{15\pm13}{2}$ ⇒ $\lambda_1=14$ y $\lambda_2=1$.</p><p>Comprobación: $\lambda_1+\lambda_2=15$ = traza (varianza total) y $\lambda_1\lambda_2=14=|S|$.</p>` },
      { titulo: "b) Varianza explicada", puntos: 1.5, solucion: String.raw`<p>PC1: $\dfrac{\lambda_1}{\lambda_1+\lambda_2}=\dfrac{14}{15}=93{,}3\,\%$; PC2: $6{,}7\,\%$.</p><p>Con PC1 ya se supera el $80\,\%$: basta un componente.</p>` },
      { titulo: "c) Autovector de λ₁ e interpretación", puntos: 2, solucion: String.raw`<p>$(S-\lambda_1I)v=0$ ⇒ primera fila: $(10-14)v_1+6v_2=0$ ⇒ $v\propto(6;\ 4)$.</p><p>Normalizando (norma $7{,}2111$): $v_1=(0{,}832;\ 0{,}555)$, así $PC_1=0{,}832\,X_1+0{,}555\,X_2$ (con las variables centradas).</p><p>Ambos loadings tienen el mismo signo: PC1 es un índice de «tamaño» que crece con las dos variables; pesa más largo. El signo global del autovector es arbitrario. En R: <code>eigen(S)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "λ1", r: "cat(eigen(matrix(c(10, 6, 6, 5), 2, byrow = TRUE))$values[1])", esperado: 14, tol: 0.000050001 },
      { que: "λ2", r: "cat(eigen(matrix(c(10, 6, 6, 5), 2, byrow = TRUE))$values[2])", esperado: 1, tol: 0.000050001 },
      { que: "|v11|", r: "cat(abs(eigen(matrix(c(10, 6, 6, 5), 2, byrow = TRUE))$vectors[1, 1]))", esperado: 0.832, tol: 0.000500001 },
      { que: "|v21|", r: "cat(abs(eigen(matrix(c(10, 6, 6, 5), 2, byrow = TRUE))$vectors[2, 1]))", esperado: 0.555, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C3", loc: "slides 8–12 y 16–18" }
    ]
  },
  {
    id: "m09-d004",
    modulo: "m09-pca",
    concepto: "m09-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C3", loc: "slides 8–12 y 16–18" }
    ],
    titulo: "PCA sobre una matriz de correlación 2 × 2",
    enunciado: String.raw`<p>Dos variables estandarizadas con correlación $0{,}6$. La matriz de correlación de la primera variable ($X_1$) y la segunda variable ($X_2$) es $$R=\begin{pmatrix}1&0{,}6\\0{,}6&1\end{pmatrix}.$$</p><ol type="a"><li>Calcula los autovalores.</li><li>¿Qué porcentaje de la varianza total explica cada componente?</li><li>Calcula el autovector (loadings) del primer componente, normalizado, e interprétalo.</li></ol>`,
    partes: [
      { titulo: "a) Ecuación característica y autovalores", puntos: 2.5, solucion: String.raw`<p>$|R-\lambda I|=0$ ⇒ $(1-\lambda)(1-\lambda)-0{,}6^2=0$ ⇒ $\lambda^2-2\lambda+0{,}64=0$.</p><p>$\lambda=\dfrac{2\pm\sqrt{2^2-4\cdot0{,}64}}{2}=\dfrac{2\pm1{,}2}{2}$ ⇒ $\lambda_1=1{,}6$ y $\lambda_2=0{,}4$.</p><p>Comprobación: $\lambda_1+\lambda_2=2$ = traza (varianza total) y $\lambda_1\lambda_2=0{,}64=|R|$.</p>` },
      { titulo: "b) Varianza explicada", puntos: 1.5, solucion: String.raw`<p>PC1: $\dfrac{\lambda_1}{\lambda_1+\lambda_2}=\dfrac{1{,}6}{2}=80\,\%$; PC2: $20\,\%$.</p><p>Con datos estandarizados la varianza total es $p=2$. Kaiser: se conserva PC1 ($\lambda_1>1$) y no PC2 ($\lambda_2<1$).</p>` },
      { titulo: "c) Autovector de λ₁ e interpretación", puntos: 2, solucion: String.raw`<p>$(R-\lambda_1I)v=0$ ⇒ primera fila: $(1-1{,}6)v_1+0{,}6v_2=0$ ⇒ $v\propto(0{,}6;\ 0{,}6)$.</p><p>Normalizando (norma $0{,}8485$): $v_1=(0{,}707;\ 0{,}707)$, así $PC_1=0{,}707\,X_1+0{,}707\,X_2$ (con las variables centradas).</p><p>Ambos loadings tienen el mismo signo: PC1 es un índice de «tamaño» que crece con las dos variables; pesa más ninguna (pesan igual). El signo global del autovector es arbitrario. En R: <code>eigen(R)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "λ1", r: "cat(eigen(matrix(c(1, 0.6, 0.6, 1), 2, byrow = TRUE))$values[1])", esperado: 1.6, tol: 0.000050001 },
      { que: "λ2", r: "cat(eigen(matrix(c(1, 0.6, 0.6, 1), 2, byrow = TRUE))$values[2])", esperado: 0.4, tol: 0.000050001 },
      { que: "|v11|", r: "cat(abs(eigen(matrix(c(1, 0.6, 0.6, 1), 2, byrow = TRUE))$vectors[1, 1]))", esperado: 0.707, tol: 0.000500001 },
      { que: "|v21|", r: "cat(abs(eigen(matrix(c(1, 0.6, 0.6, 1), 2, byrow = TRUE))$vectors[2, 1]))", esperado: 0.707, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C3", loc: "slides 8–12 y 16–18" }
    ]
  },
  {
    id: "m09-d005",
    modulo: "m09-pca",
    concepto: "m09-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C3", loc: "slides 8–12 y 16–18" }
    ],
    titulo: "PCA con covarianza negativa",
    enunciado: String.raw`<p>Se registran dos variables de un producto. La matriz de covarianza de precio ($X_1$) y demanda ($X_2$) es $$S=\begin{pmatrix}8&-3\\-3&4\end{pmatrix}.$$</p><ol type="a"><li>Calcula los autovalores.</li><li>¿Qué porcentaje de la varianza total explica cada componente?</li><li>Calcula el autovector (loadings) del primer componente, normalizado, e interprétalo.</li></ol>`,
    partes: [
      { titulo: "a) Ecuación característica y autovalores", puntos: 2.5, solucion: String.raw`<p>$|S-\lambda I|=0$ ⇒ $(8-\lambda)(4-\lambda)--3^2=0$ ⇒ $\lambda^2-12\lambda+23=0$.</p><p>$\lambda=\dfrac{12\pm\sqrt{12^2-4\cdot23}}{2}=\dfrac{12\pm7{,}2111}{2}$ ⇒ $\lambda_1=9{,}6056$ y $\lambda_2=2{,}3944$.</p><p>Comprobación: $\lambda_1+\lambda_2=12$ = traza (varianza total) y $\lambda_1\lambda_2=23=|S|$.</p>` },
      { titulo: "b) Varianza explicada", puntos: 1.5, solucion: String.raw`<p>PC1: $\dfrac{\lambda_1}{\lambda_1+\lambda_2}=\dfrac{9{,}6056}{12}=80\,\%$; PC2: $20\,\%$.</p><p>Con PC1 ya se supera el $80\,\%$: basta un componente.</p>` },
      { titulo: "c) Autovector de λ₁ e interpretación", puntos: 2, solucion: String.raw`<p>$(S-\lambda_1I)v=0$ ⇒ primera fila: $(8-9{,}6056)v_1+-3v_2=0$ ⇒ $v\propto(-3;\ 1{,}6056)$.</p><p>Normalizando (norma $3{,}4026$): $v_1=(0{,}882;\ -0{,}472)$, así $PC_1=0{,}882\,X_1-0{,}472\,X_2$ (con las variables centradas).</p><p>Los loadings tienen signo opuesto: PC1 contrasta una variable con la otra; pesa más precio. El signo global del autovector es arbitrario. En R: <code>eigen(S)</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "λ1", r: "cat(eigen(matrix(c(8, -3, -3, 4), 2, byrow = TRUE))$values[1])", esperado: 9.6056, tol: 0.000050001 },
      { que: "λ2", r: "cat(eigen(matrix(c(8, -3, -3, 4), 2, byrow = TRUE))$values[2])", esperado: 2.3944, tol: 0.000050001 },
      { que: "|v11|", r: "cat(abs(eigen(matrix(c(8, -3, -3, 4), 2, byrow = TRUE))$vectors[1, 1]))", esperado: 0.882, tol: 0.000500001 },
      { que: "|v21|", r: "cat(abs(eigen(matrix(c(8, -3, -3, 4), 2, byrow = TRUE))$vectors[2, 1]))", esperado: 0.472, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C3", loc: "slides 8–12 y 16–18" }
    ]
  },
  {
    id: "m09-d006",
    modulo: "m09-pca",
    concepto: "m09-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C3", loc: "slide 15" },
      { id: "C4.2", loc: "slides 4–5" }
    ],
    titulo: "¿Cuántos componentes conservar? (autovalores dados)",
    enunciado: String.raw`<p>Un PCA sobre 5 variables estandarizadas entrega estos autovalores:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>PC1</th><th>PC2</th><th>PC3</th><th>PC4</th><th>PC5</th></tr></thead><tbody><tr><td>Autovalor $\lambda$</td><td>$2{,}9$</td><td>$1{,}3$</td><td>$0{,}45$</td><td>$0{,}25$</td><td>$0{,}1$</td></tr></tbody></table></div><ol type="a"><li>Calcula la proporción de varianza explicada y la acumulada.</li><li>¿Cuántos componentes se conservan con el criterio del $80\,\%$ y con el de Kaiser?</li><li>¿Qué decisión tomarías y qué se pierde?</li></ol>`,
    partes: [
      { titulo: "a) Proporción de varianza y acumulada", puntos: 2.5, solucion: String.raw`<p>Varianza total $=\sum\lambda_i=5$ (5 variables estandarizadas ⇒ $\approx p=5$). Proporción $=\lambda_k/\sum\lambda_i$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>PC1</th><th>PC2</th><th>PC3</th><th>PC4</th><th>PC5</th></tr></thead><tbody><tr><td>$\lambda$</td><td>$2{,}9$</td><td>$1{,}3$</td><td>$0{,}45$</td><td>$0{,}25$</td><td>$0{,}1$</td></tr><tr><td>Proporción</td><td>$0{,}58$</td><td>$0{,}26$</td><td>$0{,}09$</td><td>$0{,}05$</td><td>$0{,}02$</td></tr><tr><td>Acumulada</td><td>$0{,}58$</td><td>$0{,}84$</td><td>$0{,}93$</td><td>$0{,}98$</td><td>$1$</td></tr></tbody></table></div>` },
      { titulo: "b) Criterio del 80 % y criterio de Kaiser", puntos: 2, solucion: "<p><strong>80 %:</strong> la acumulada supera $0{,}80$ recién en PC2 ($0{,}84$) ⇒ 2 componentes.</p><p><strong>Kaiser</strong> (autovalor $>1$, datos estandarizados): 2 componentes ($2{,}9$, $1{,}3$).</p>" },
      { titulo: "c) Decisión", puntos: 1.5, solucion: String.raw`<p>Ambos criterios coinciden en 2. Se conservan 2 componentes, que explican el $84\,\%$ de la varianza; se pierde el $16\,\%$ restante.</p><p>Los componentes descartados son los de menor varianza; PCA no elimina variables: cada componente combina todas.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "acumulada en el corte del 80 %", js: "suma([2.9,1.3,0.45,0.25,0.1].slice(0, 2))/suma([2.9,1.3,0.45,0.25,0.1])", esperado: 0.84, tol: 0.000500001 },
      { que: "proporción PC1", js: "2.9/suma([2.9,1.3,0.45,0.25,0.1])", esperado: 0.58, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C3", loc: "slide 15" },
      { id: "C4.2", loc: "slides 4–5" }
    ]
  },
  {
    id: "m09-d007",
    modulo: "m09-pca",
    concepto: "m09-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C3", loc: "slide 15" },
      { id: "C4.2", loc: "slides 4–5" }
    ],
    titulo: "¿Cuántos componentes? Lectura de summary(prcomp())",
    enunciado: String.raw`<p>La salida <code>summary(pca)</code> de un PCA con 6 variables estandarizadas muestra estas desviaciones estándar:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>PC1</th><th>PC2</th><th>PC3</th><th>PC4</th><th>PC5</th><th>PC6</th></tr></thead><tbody><tr><td>Standard deviation</td><td>$1{,}75$</td><td>$1{,}2$</td><td>$0{,}85$</td><td>$0{,}7$</td><td>$0{,}45$</td><td>$0{,}3$</td></tr></tbody></table></div><ol type="a"><li>Obtén los autovalores y calcula la proporción de varianza explicada y la acumulada.</li><li>¿Cuántos componentes se conservan con el criterio del $80\,\%$ y con el de Kaiser?</li><li>¿Qué decisión tomarías y qué se pierde?</li></ol>`,
    partes: [
      { titulo: "a) Proporción de varianza y acumulada", puntos: 2.5, solucion: String.raw`<p>En <code>summary(prcomp())</code> el autovalor es la desviación al cuadrado: $\lambda=\text{sd}^2$. Varianza total $=\sum\lambda_i=6{,}008$ (6 variables estandarizadas ⇒ $\approx p=6$). Proporción $=\lambda_k/\sum\lambda_i$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>PC1</th><th>PC2</th><th>PC3</th><th>PC4</th><th>PC5</th><th>PC6</th></tr></thead><tbody><tr><td>$\lambda$</td><td>$3{,}063$</td><td>$1{,}44$</td><td>$0{,}723$</td><td>$0{,}49$</td><td>$0{,}203$</td><td>$0{,}09$</td></tr><tr><td>Proporción</td><td>$0{,}51$</td><td>$0{,}24$</td><td>$0{,}12$</td><td>$0{,}082$</td><td>$0{,}034$</td><td>$0{,}015$</td></tr><tr><td>Acumulada</td><td>$0{,}51$</td><td>$0{,}749$</td><td>$0{,}87$</td><td>$0{,}951$</td><td>$0{,}985$</td><td>$1$</td></tr></tbody></table></div>` },
      { titulo: "b) Criterio del 80 % y criterio de Kaiser", puntos: 2, solucion: "<p><strong>80 %:</strong> la acumulada supera $0{,}80$ recién en PC3 ($0{,}87$) ⇒ 3 componentes.</p><p><strong>Kaiser</strong> (autovalor $>1$, datos estandarizados): 2 componentes ($3{,}063$, $1{,}44$).</p>" },
      { titulo: "c) Decisión", puntos: 1.5, solucion: String.raw`<p>No coinciden (3 vs. 2): Kaiser deja solo el $74{,}9\,\%$ de la varianza y el criterio del 80 % pide 3. Se complementa con el codo del scree plot y con la interpretabilidad; una opción defendible es conservar 3 ($87\,\%$).</p><p>Los componentes descartados son los de menor varianza; PCA no elimina variables: cada componente combina todas.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "acumulada en el corte del 80 %", js: "suma([3.0625,1.44,0.7224999999999999,0.48999999999999994,0.2025,0.09].slice(0, 3))/suma([3.0625,1.44,0.7224999999999999,0.48999999999999994,0.2025,0.09])", esperado: 0.87, tol: 0.000500001 },
      { que: "proporción PC1", js: "3.0625/suma([3.0625,1.44,0.7224999999999999,0.48999999999999994,0.2025,0.09])", esperado: 0.51, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C3", loc: "slide 15" },
      { id: "C4.2", loc: "slides 4–5" }
    ]
  },
  {
    id: "m09-d008",
    modulo: "m09-pca",
    concepto: "m09-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C3", loc: "slide 15" },
      { id: "C4.2", loc: "slides 4–5" }
    ],
    titulo: "Criterios que no coinciden (7 variables)",
    enunciado: String.raw`<p>Un PCA sobre 7 indicadores estandarizados entrega estos autovalores:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>PC1</th><th>PC2</th><th>PC3</th><th>PC4</th><th>PC5</th><th>PC6</th><th>PC7</th></tr></thead><tbody><tr><td>Autovalor $\lambda$</td><td>$3{,}2$</td><td>$1{,}2$</td><td>$0{,}9$</td><td>$0{,}8$</td><td>$0{,}5$</td><td>$0{,}3$</td><td>$0{,}1$</td></tr></tbody></table></div><ol type="a"><li>Calcula la proporción de varianza explicada y la acumulada.</li><li>¿Cuántos componentes se conservan con el criterio del $80\,\%$ y con el de Kaiser?</li><li>¿Qué decisión tomarías y qué se pierde?</li></ol>`,
    partes: [
      { titulo: "a) Proporción de varianza y acumulada", puntos: 2.5, solucion: String.raw`<p>Varianza total $=\sum\lambda_i=7$ (7 variables estandarizadas ⇒ $\approx p=7$). Proporción $=\lambda_k/\sum\lambda_i$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>PC1</th><th>PC2</th><th>PC3</th><th>PC4</th><th>PC5</th><th>PC6</th><th>PC7</th></tr></thead><tbody><tr><td>$\lambda$</td><td>$3{,}2$</td><td>$1{,}2$</td><td>$0{,}9$</td><td>$0{,}8$</td><td>$0{,}5$</td><td>$0{,}3$</td><td>$0{,}1$</td></tr><tr><td>Proporción</td><td>$0{,}457$</td><td>$0{,}171$</td><td>$0{,}129$</td><td>$0{,}114$</td><td>$0{,}071$</td><td>$0{,}043$</td><td>$0{,}014$</td></tr><tr><td>Acumulada</td><td>$0{,}457$</td><td>$0{,}629$</td><td>$0{,}757$</td><td>$0{,}871$</td><td>$0{,}943$</td><td>$0{,}986$</td><td>$1$</td></tr></tbody></table></div>` },
      { titulo: "b) Criterio del 80 % y criterio de Kaiser", puntos: 2, solucion: "<p><strong>80 %:</strong> la acumulada supera $0{,}80$ recién en PC4 ($0{,}871$) ⇒ 4 componentes.</p><p><strong>Kaiser</strong> (autovalor $>1$, datos estandarizados): 2 componentes ($3{,}2$, $1{,}2$).</p>" },
      { titulo: "c) Decisión", puntos: 1.5, solucion: String.raw`<p>No coinciden (4 vs. 2): Kaiser deja solo el $62{,}9\,\%$ de la varianza y el criterio del 80 % pide 4. Se complementa con el codo del scree plot y con la interpretabilidad; una opción defendible es conservar 4 ($87{,}1\,\%$).</p><p>Los componentes descartados son los de menor varianza; PCA no elimina variables: cada componente combina todas.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "acumulada en el corte del 80 %", js: "suma([3.2,1.2,0.9,0.8,0.5,0.3,0.1].slice(0, 4))/suma([3.2,1.2,0.9,0.8,0.5,0.3,0.1])", esperado: 0.871, tol: 0.000500001 },
      { que: "proporción PC1", js: "3.2/suma([3.2,1.2,0.9,0.8,0.5,0.3,0.1])", esperado: 0.457, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C3", loc: "slide 15" },
      { id: "C4.2", loc: "slides 4–5" }
    ]
  },
  {
    id: "m09-d009",
    modulo: "m09-pca",
    concepto: "m09-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C3", loc: "slides 13–14 y 19–26" },
      { id: "AY2-E", loc: "P5(d)" }
    ],
    titulo: "Score de un auto nuevo en los dos primeros componentes",
    enunciado: `<p>Con el conjunto <code>mtcars</code> (32 autos) y las variables mpg (rendimiento), hp (potencia) y wt (peso). Se hizo un PCA con datos estandarizados (<code>prcomp(…, scale. = TRUE)</code>) y se obtuvo:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable</th><th>Media</th><th>Desv. estándar</th><th>Loading PC1</th><th>Loading PC2</th></tr></thead><tbody><tr><td>mpg</td><td>$20{,}09$</td><td>$6{,}03$</td><td>$-0{,}603$</td><td>$0{,}163$</td></tr><tr><td>hp</td><td>$146{,}69$</td><td>$68{,}56$</td><td>$0{,}551$</td><td>$0{,}793$</td></tr><tr><td>wt</td><td>$3{,}22$</td><td>$0{,}98$</td><td>$0{,}576$</td><td>$-0{,}587$</td></tr></tbody></table></div><p>Auto nuevo: mpg $=25$, hp $=100$, wt $=2{,}5$.</p><ol type="a"><li>Estandariza la observación nueva.</li><li>Calcula su score en PC1 y en PC2.</li><li>Interpreta PC1 según los loadings y ubica la observación.</li></ol>`,
    partes: [
      { titulo: "a) Estandarizar con la media y desviación de la muestra", puntos: 2, solucion: String.raw`<p>$z_j=\dfrac{x_j-\bar x_j}{s_j}$ (con la media y desviación <strong>de la muestra original</strong>, no de la observación nueva):</p><p>mpg: $\dfrac{25-20{,}09}{6{,}03}=0{,}814$</p><p>hp: $\dfrac{100-146{,}69}{68{,}56}=-0{,}681$</p><p>wt: $\dfrac{2{,}5-3{,}22}{0{,}98}=-0{,}735$</p>` },
      { titulo: "b) Scores en PC1 y PC2", puntos: 2.5, solucion: String.raw`<p>Score $=$ suma de loading $\times$ valor estandarizado:</p><p>$PC_1=(-0{,}603)(0{,}814)+(0{,}551)(-0{,}681)+(0{,}576)(-0{,}735)=-1{,}289$</p><p>$PC_2=(0{,}163)(0{,}814)+(0{,}793)(-0{,}681)+(-0{,}587)(-0{,}735)=0{,}024$</p><p>En R: <code>predict(pc, newdata = nuevo)</code>.</p>` },
      { titulo: "c) Interpretación", puntos: 1.5, solucion: String.raw`<p>En PC1, mpg tiene signo negativo y hp y wt signo positivo: PC1 contrasta rendimiento contra potencia y peso (autos grandes y potentes en un extremo, livianos y eficientes en el otro). El auto nuevo tiene $PC_1=-1{,}29$: queda del lado de los autos livianos y eficientes.</p><p>Un loading con $|v|\ge0{,}30$ se considera relevante y $\ge0{,}40$ fuerte; el signo indica la dirección. El signo global de un componente es arbitrario.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "score PC1 (predict)", r: `cat({pc <- prcomp(mtcars[, c("mpg", "hp", "wt")], scale. = TRUE); predict(pc, data.frame(mpg = 25, hp = 100, wt = 2.5))[1]})`, esperado: -1.29, tol: 0.03 },
      { que: "score PC2 (predict)", r: `cat({pc <- prcomp(mtcars[, c("mpg", "hp", "wt")], scale. = TRUE); predict(pc, data.frame(mpg = 25, hp = 100, wt = 2.5))[2]})`, esperado: 0.02, tol: 0.03 },
      { que: "score PC1 con valores redondeados", js: "[-0.603,0.551,0.576].map((l, i) => l*([25,100,2.5][i] - [20.09,146.69,3.22][i])/[6.03,68.56,0.98][i]).reduce((a, b) => a + b)", esperado: -1.289, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C3", loc: "slides 13–14 y 19–26" },
      { id: "AY2-E", loc: "P5(d)" }
    ]
  },
  {
    id: "m09-d010",
    modulo: "m09-pca",
    concepto: "m09-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C3", loc: "slides 13–14 y 19–26" },
      { id: "AY2-E", loc: "P5(d)" }
    ],
    titulo: "Score de un estado nuevo (USArrests)",
    enunciado: `<p>Con <code>USArrests</code> (50 estados) y las variables Murder, Assault y UrbanPop. Se hizo un PCA con datos estandarizados (<code>prcomp(…, scale. = TRUE)</code>) y se obtuvo:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable</th><th>Media</th><th>Desv. estándar</th><th>Loading PC1</th><th>Loading PC2</th></tr></thead><tbody><tr><td>Murder</td><td>$7{,}79$</td><td>$4{,}36$</td><td>$-0{,}667$</td><td>$-0{,}303$</td></tr><tr><td>Assault</td><td>$170{,}76$</td><td>$83{,}34$</td><td>$-0{,}697$</td><td>$-0{,}067$</td></tr><tr><td>UrbanPop</td><td>$65{,}54$</td><td>$14{,}47$</td><td>$-0{,}262$</td><td>$0{,}95$</td></tr></tbody></table></div><p>Estado nuevo: Murder $=12$, Assault $=250$, UrbanPop $=60$.</p><ol type="a"><li>Estandariza la observación nueva.</li><li>Calcula su score en PC1 y en PC2.</li><li>Interpreta PC1 según los loadings y ubica la observación.</li></ol>`,
    partes: [
      { titulo: "a) Estandarizar con la media y desviación de la muestra", puntos: 2, solucion: String.raw`<p>$z_j=\dfrac{x_j-\bar x_j}{s_j}$ (con la media y desviación <strong>de la muestra original</strong>, no de la observación nueva):</p><p>Murder: $\dfrac{12-7{,}79}{4{,}36}=0{,}966$</p><p>Assault: $\dfrac{250-170{,}76}{83{,}34}=0{,}951$</p><p>UrbanPop: $\dfrac{60-65{,}54}{14{,}47}=-0{,}383$</p>` },
      { titulo: "b) Scores en PC1 y PC2", puntos: 2.5, solucion: String.raw`<p>Score $=$ suma de loading $\times$ valor estandarizado:</p><p>$PC_1=(-0{,}667)(0{,}966)+(-0{,}697)(0{,}951)+(-0{,}262)(-0{,}383)=-1{,}206$</p><p>$PC_2=(-0{,}303)(0{,}966)+(-0{,}067)(0{,}951)+(0{,}95)(-0{,}383)=-0{,}72$</p><p>En R: <code>predict(pc, newdata = nuevo)</code>.</p>` },
      { titulo: "c) Interpretación", puntos: 1.5, solucion: String.raw`<p>En PC1 las tres variables tienen el mismo signo, con Murder y Assault como las más fuertes: PC1 es un índice de criminalidad violenta. PC2 está dominado por UrbanPop (loading $0{,}95$): grado de urbanización. El estado nuevo tiene $PC_1=-1{,}21$ (criminalidad sobre el promedio) y $PC_2=-0{,}72$.</p><p>Un loading con $|v|\ge0{,}30$ se considera relevante y $\ge0{,}40$ fuerte; el signo indica la dirección. El signo global de un componente es arbitrario.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "score PC1 (predict)", r: `cat({pc <- prcomp(USArrests[, c("Murder", "Assault", "UrbanPop")], scale. = TRUE); predict(pc, data.frame(Murder = 12, Assault = 250, UrbanPop = 60))[1]})`, esperado: -1.21, tol: 0.03 },
      { que: "score PC2 (predict)", r: `cat({pc <- prcomp(USArrests[, c("Murder", "Assault", "UrbanPop")], scale. = TRUE); predict(pc, data.frame(Murder = 12, Assault = 250, UrbanPop = 60))[2]})`, esperado: -0.72, tol: 0.03 },
      { que: "score PC1 con valores redondeados", js: "[-0.667,-0.697,-0.262].map((l, i) => l*([12,250,60][i] - [7.79,170.76,65.54][i])/[4.36,83.34,14.47][i]).reduce((a, b) => a + b)", esperado: -1.206, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C3", loc: "slides 13–14 y 19–26" },
      { id: "AY2-E", loc: "P5(d)" }
    ]
  }
]);
