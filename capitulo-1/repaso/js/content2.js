/* ============================================================================
   content2.js — Módulos de estudio (parte B):
   ACP, Análisis Factorial, lectura comparativa y estrategia de prueba.
   ========================================================================== */

window.MODULES.push(

/* ────────────────────────────── MÓDULO 9 ────────────────────────────── */
{
  id: 'm9',
  num: 9,
  title: 'ACP: qué es y cómo funciona por dentro',
  tag: 'Capítulo 3',
  desc: 'Centrado, matriz de covarianza, autovalores y autovectores, loadings y scores. Con el ejemplo numérico completo del PPT.',
  html: String.raw`
<h2>9.1 Definición</h2>
<div class="blk simple"><div class="blk-h">🧠 En simple</div>
<p>El ACP (PCA) <strong>reduce la dimensión</strong> de un conjunto de datos conservando la mayor cantidad posible de su variabilidad original. Pasa de muchas variables a pocas variables <em>nuevas</em> — los componentes principales — que resumen la información.</p></div>

<div class="note memo"><span class="nh">⚠️ Mensaje clave del PPT (candidato seguro a V/F)</span>
<p><strong>El ACP NO elimina variables: crea nuevas variables</strong> (componentes) que son <strong>combinaciones lineales</strong> de las originales y capturan la mayor variabilidad posible.</p></div>

<h4>Las dos propiedades que definen a los componentes</h4>
<ol class="tight">
  <li>Cada componente principal es una <strong>combinación lineal</strong> de las variables originales.</li>
  <li>Se ordenan según <strong>cuánta variabilidad explican</strong>: PC1 explica la mayor parte posible; PC2 explica la mayor parte de la <em>restante</em> y es <strong>ortogonal</strong> a PC1; y así sucesivamente.</li>
</ol>
<p>En términos geométricos: el ACP <strong>reorganiza el sistema de coordenadas</strong> para encontrar las direcciones donde los datos «varían más».</p>

<h4>¿Por qué se necesita?</h4>
<ul class="tight">
  <li>Dificultad para <strong>visualizar</strong> relaciones con más de 3 variables.</li>
  <li>Modelos predictivos más lentos y menos estables (<strong>sobreajuste</strong>).</li>
  <li><strong>Redundancia</strong>: variables que explican lo mismo.</li>
  <li>Permite <strong>descubrir estructuras ocultas</strong> (patrones globales no evidentes variable a variable).</li>
</ul>

<h4>Ventajas vs. limitaciones (tabla del PPT diap. 6)</h4>
<table class="tbl">
<tr><th>✅ Qué se gana</th><th>❌ Qué NO hace el ACP</th></tr>
<tr><td>Reducción de dimensionalidad con casi la misma información</td><td>No distingue por sí mismo variables importantes de no importantes</td></tr>
<tr><td>Eliminación de redundancia entre variables correlacionadas</td><td>No garantiza interpretabilidad directa de cada componente</td></tr>
<tr><td>Simplificación de modelos</td><td>No es adecuado si las relaciones entre variables <strong>no son lineales</strong></td></tr>
<tr><td>Visualización en 2 o 3 dimensiones</td><td>No es un modelo predictivo: es exploración y simplificación</td></tr>
</table>

<h2>9.2 La matemática, paso a paso</h2>

<h4>Paso 1 — Centrar las variables</h4>
<div class="tex">$$\tilde{X}=X-\mathbf{1}\,\bar{x}^{\mathsf{T}}
\qquad \text{(restar la media de cada columna)}$$</div>
<div class="note info"><span class="nh">📌 ¿Por qué centrar?</span>
<p>Si no centramos, el primer componente podría simplemente <strong>apuntar hacia la media</strong> de los datos en lugar de capturar la dirección de máxima variabilidad. Centrar garantiza que el ACP detecte <em>patrones de variación</em>, no niveles de magnitud.</p></div>

<h4>Paso 2 — Matriz de covarianza</h4>
<div class="tex">$$S=\frac{1}{n-1}\,\tilde{X}^{\mathsf{T}}\tilde{X}$$</div>
<ul class="tight">
  <li>Es <strong>simétrica</strong> (S = Sᵀ).</li>
  <li>Es <strong>semidefinida positiva</strong> (todos los autovalores ≥ 0).</li>
  <li>Sus <strong>autovectores son ortogonales</strong> entre sí.</li>
</ul>

<h4>Paso 3 — El problema central: la ecuación de autovalores</h4>
<div class="tex">$$\begin{gathered}
\mathbf{S\,v=\lambda\,v}\\[10pt]
\begin{aligned}
v &= \text{autovector} &&\rightarrow\ \text{una \textbf{dirección} de variación}\\
\lambda &= \text{autovalor} &&\rightarrow\ \text{la \textbf{varianza explicada} en esa dirección}
\end{aligned}
\end{gathered}$$</div>
<p>El ACP ordena estas direcciones de mayor a menor variabilidad: <strong>λ₁ ≥ λ₂ ≥ … ≥ λ<sub>p</sub> ≥ 0</strong>.</p>

<h4>Paso 4 — PC1 como problema de optimización</h4>
<div class="tex">$$\begin{gathered}
\max_{w}\ V(w)=w^{\mathsf{T}}S\,w
\qquad \text{sujeto a}\quad \lVert w\rVert=1\\[10pt]
\text{Con multiplicadores de Lagrange}\quad\Longrightarrow\quad S\,w=\lambda\,w\\[10pt]
\Longrightarrow\ \text{el maximizador es el autovector de }\lambda_1,
\quad\text{y }\operatorname{Var}(\text{PC}_1)=\lambda_1
\end{gathered}$$</div>
<p>PC2 debe (a) maximizar la varianza restante y (b) ser ortogonal a PC1. La buena noticia: <strong>el siguiente autovector cumple ambas automáticamente</strong>, porque S es simétrica.</p>

<h4>Paso 5 — Proyección</h4>
<div class="tex">$$\begin{gathered}
V_m=[\,v_1,\ v_2,\ \dots,\ v_m\,]
\qquad\qquad
\mathbf{Z=\tilde{X}\,V_m}\\[12pt]
\text{Para la observación } i \text{ en el componente } \ell:\quad
\hat{z}_{i\ell}=\sum_{j=1}^{p}\tilde{x}_{ij}\,v_{j\ell}
\end{gathered}$$</div>

<div class="note memo"><span class="nh">⚠️ Vocabulario que se pregunta</span>
<ul class="tight">
<li><strong>Loadings</strong> (pesos): los coeficientes v<sub>jℓ</sub>. Indican <em>cuánto contribuye cada variable original</em> al componente. En R: <code class="inl">pca$rotation</code>.</li>
<li><strong>Scores</strong> (puntajes): los valores transformados ẑ<sub>iℓ</sub>, o sea las <em>coordenadas de cada observación</em> en el nuevo espacio. En R: <code class="inl">pca$x</code>.</li>
<li><strong>Autovalor λ<sub>k</sub></strong>: la varianza del componente k. En R: <code class="inl">pca$sdev^2</code>.</li>
</ul></div>

<h2>9.3 Ejemplo numérico completo (PPT diap. 16–18)</h2>
<div class="blk ex"><div class="blk-h">💡 3 observaciones, 2 variables</div>
<div class="tex">$$\begin{gathered}
X=\begin{pmatrix}2&0\\0&2\\3&3\end{pmatrix}
\quad
\text{medias: }1.67,\ 1.67
\quad
\tilde{X}=\begin{pmatrix}0.33&-1.67\\-1.67&0.33\\1.33&1.33\end{pmatrix}\\[14pt]
S=\tfrac{1}{2}\,\tilde{X}^{\mathsf{T}}\tilde{X}
 =\begin{pmatrix}2.333&0.333\\0.333&2.333\end{pmatrix}\\[14pt]
\text{Autovalores, resolviendo }\det(S-\lambda I)=0:\quad
\lambda_1=\mathbf{2.666}\ (\text{PC}_1),\qquad \lambda_2=\mathbf{2.000}\ (\text{PC}_2)\\[12pt]
v_1=\tfrac{1}{\sqrt{2}}(1,\,1)\ \rightarrow\ \text{ambas pesan igual (\textbf{suman})}
\qquad
v_2=\tfrac{1}{\sqrt{2}}(1,\,-1)\ \rightarrow\ \textbf{contraste}\\[14pt]
V=\begin{pmatrix}1/\sqrt{2}&1/\sqrt{2}\\ 1/\sqrt{2}&-1/\sqrt{2}\end{pmatrix}
\quad\Longrightarrow\quad
Z=\tilde{X}V=\begin{pmatrix}-0.95&1.41\\-0.95&-1.41\\1.90&0.00\end{pmatrix}
\begin{matrix}\leftarrow\text{Obs. 1}\\ \leftarrow\text{Obs. 2}\\ \leftarrow\text{Obs. 3}\end{matrix}
\end{gathered}$$</div>
<p>Verificación útil: λ₁ + λ₂ = 2.666 + 2.000 = 4.666 = 2.333 + 2.333 = <strong>traza de S</strong>. La varianza total se conserva.</p></div>

<div class="note memo"><span class="nh">⚠️ Propiedad que cae en V/F</span>
<p><strong>La suma de las varianzas explicadas por TODOS los componentes principales es igual a la suma de las varianzas de las variables originales</strong> (Σλ<sub>k</sub> = traza de S). Si se conservan todos los componentes, <strong>no se pierde nada de información</strong>; la pérdida solo aparece al descartar componentes.</p>
<p>Corolario: «Reducir dimensionalidad mediante ACP implica necesariamente perder <em>toda</em> la información» → <strong>FALSO</strong>. Se pierde solo la varianza de los componentes descartados, que por construcción es la menor.</p>
<div class="src">Fuente: «Ayudantía 3 2026-20 Enunciado», P1 incisos g) y j).</div></div>

<h2>9.4 Proporción de varianza explicada</h2>
<div class="tex">$$\text{Varianza explicada por PC}_k
 =\ \mathbf{\dfrac{\lambda_k}{\sum_{i=1}^{p}\lambda_i}}$$</div>

<h4>Los tres criterios para decidir cuántos componentes conservar</h4>
<table class="tbl">
<tr><th>Criterio</th><th>Regla</th><th>Observación</th></tr>
<tr><td><strong>Regla del 80%</strong> (varianza acumulada)</td><td>Conservar los que acumulen al menos el <strong>80%</strong> de la varianza total</td><td>El umbral es arbitrario; en AF el PPT usa 75–80%</td></tr>
<tr><td><strong>Regla de Kaiser</strong></td><td>Conservar componentes con <strong>autovalor &gt; 1</strong></td><td>Solo válida con <strong>datos estandarizados</strong> (matriz de correlación). Tiende a subestimar el número real de factores</td></tr>
<tr><td><strong>Scree plot</strong> (codo)</td><td>Graficar los autovalores y conservar los anteriores al «codo» donde la curva se aplana</td><td>Depende de interpretación visual: <strong>subjetivo</strong></td></tr>
</table>

<div class="note trap"><span class="nh">🚨 La trampa de Kaiser</span>
<p>La lógica de Kaiser es: con datos estandarizados <strong>cada variable aporta varianza = 1</strong>; si un componente explica menos que una variable sola, no vale la pena conservarlo. Por eso el umbral es exactamente 1 <em>y solo tiene sentido con la matriz de correlación</em>.</p>
<p>Y ojo con esta afirmación falsa de la Ayudantía 3: «Es preferible usar la matriz de correlaciones <em>ya que así todos los valores propios serán mayores que 1</em>» → <strong>FALSO</strong>. Con la matriz de correlación los λ suman p (número de variables), así que <strong>necesariamente</strong> algunos son menores que 1 (salvo el caso degenerado en que todos valen 1). Si todos fueran &gt; 1 la regla de Kaiser no descartaría nada y sería inútil.</p></div>

<div class="src">Fuentes: PPT «3. Análisis de Componentes Principales» (diap. 2–18); «Ayudantía 3 2026-20 Enunciado» P1.</div>
`
},

/* ────────────────────────────── MÓDULO 10 ────────────────────────────── */
{
  id: 'm10',
  num: 10,
  title: 'ACP en R: decisiones e interpretación de resultados',
  tag: 'Capítulo 3 · R',
  desc: 'prcomp, summary, screeplot, rotation, scores, biplot; cómo interpretar loadings y cómo calcular el score de un caso nuevo.',
  html: String.raw`
<h2>10.1 El flujo completo en R</h2>
<pre class="r">data(mtcars)
head(mtcars); str(mtcars)

<span class="c"># scale. = TRUE estandariza (resta media y divide por sd) → usa matriz de CORRELACIÓN</span>
pca &lt;- prcomp(mtcars, scale. = TRUE)

summary(pca)                    <span class="c"># varianza explicada y acumulada</span>
screeplot(pca, type = "lines")  <span class="c"># gráfico de codo</span>
pca$rotation                    <span class="c"># loadings (pesos)</span>
pca$x[, 1:2]                    <span class="c"># scores: coordenadas de cada observación</span>
biplot(pca, scale = 0)          <span class="c"># observaciones + variables en el mismo gráfico</span>

<span class="c"># Autovalores y proporciones a mano</span>
autovalores &lt;- pca$sdev^2
prop_var    &lt;- autovalores / sum(autovalores)
round(prop_var, 4)
cumsum(prop_var)

<span class="c"># Línea de referencia Kaiser sobre el scree plot</span>
screeplot(pca, type = "barplot")
abline(h = 1, col = "red", lty = 2)</pre>

<div class="note memo"><span class="nh">⚠️ scale. = TRUE es la decisión más importante</span>
<p><strong>Sin escalar</strong> (<code class="inl">scale. = FALSE</code>, el default de <code class="inl">prcomp</code>) el ACP trabaja sobre la <strong>matriz de covarianza</strong>: las variables con mayor varianza absoluta dominan los componentes.</p>
<p><strong>Escalando</strong> trabaja sobre la <strong>matriz de correlación</strong>: todas las variables pesan igual.</p>
<p>Regla del curso: si las variables están medidas en <strong>escalas muy distintas, usar la matriz de correlaciones</strong> (es decir, <code class="inl">scale. = TRUE</code>). Es también el requisito para poder aplicar la regla de Kaiser.</p></div>

<h2>10.2 Cómo leer el <code class="inl">summary(pca)</code></h2>
<div class="console">Importance of components:
                          PC1     PC2      PC3      PC4
  <b>Standard deviation</b>    1.4617  0.9909   0.8623  0.37143
  <b>Proportion of Variance</b> 0.5341 0.2455   0.1859  0.03449
  <b>Cumulative Proportion</b>  0.5341 0.7796   0.9655  1.00000</div>
<table class="tbl">
<tr><th>Fila</th><th>Qué es</th><th>Cómo obtenerla</th></tr>
<tr><td><strong>Standard deviation</strong></td><td>√λ<sub>k</sub> — la <strong>raíz cuadrada del autovalor</strong></td><td><code>pca$sdev</code></td></tr>
<tr><td><strong>Proportion of Variance</strong></td><td>λ<sub>k</sub> / Σλ<sub>i</sub></td><td><code>pca$sdev^2 / sum(pca$sdev^2)</code></td></tr>
<tr><td><strong>Cumulative Proportion</strong></td><td>Suma acumulada de la fila anterior</td><td><code>cumsum(...)</code></td></tr>
</table>
<div class="note trap"><span class="nh">🚨 Error de lectura muy común</span>
<p>La primera fila NO es el autovalor: es su <strong>raíz cuadrada</strong>. Para aplicar Kaiser hay que elevar al cuadrado. En el ejemplo: λ₁ = 1.4617² = <strong>2.137</strong> &gt; 1 ✓, λ₂ = 0.9909² = <strong>0.982</strong> &lt; 1 ✗. Un descuido aquí cambia la respuesta completa.</p></div>

<h2>10.3 Ejercicio resuelto: Ayudantía 2, P5 (clientes de retail)</h2>
<div class="blk ex"><div class="blk-h">💡 Enunciado</div>
<p>5 clientes, 4 variables: Frecuencia de compra, Gasto promedio ($), Nº de categorías, Uso de cupones. ACP sobre la <strong>matriz de correlaciones</strong>.</p>
<div class="console">                          PC1      PC2       PC3      PC4
  Standard deviation     1.4617  0.9909   0.8623  0.37143
  Proportion of Variance 0.5341  0.2455   0.1859  0.03449
  Cumulative Proportion  0.5341  0.7796   0.9655  1.00000

pca$rotation
                   PC1         PC2         PC3         PC4
  Frecuencia   0.6341368  -0.2424999  -0.1201098  -0.72431895
  Gasto        0.4335808   0.4966545  -0.6776901   0.32569643
  Categorias   0.5467570  -0.5127872   0.2654178   0.60634929
  Cupones     -0.3330691  -0.6569455  -0.6751764   0.04030424</div></div>

<details class="acc" open><summary>(a) ¿Cuántos componentes retener según cada criterio?</summary><div>
<ul class="tight">
  <li><strong>Kaiser (λ &gt; 1):</strong> λ₁ = 1.4617² = 2.137 &gt; 1 ✓; λ₂ = 0.9909² = 0.982 &lt; 1 ✗ (por un pelo). → <strong>1 componente</strong>.</li>
  <li><strong>Codo (scree plot):</strong> la caída fuerte está entre PC1 y PC2; después la curva se aplana. → <strong>1 componente</strong> (algunos leen el codo en PC2 y retendrían 2; es el criterio subjetivo).</li>
  <li><strong>Varianza acumulada 80%:</strong> PC1 = 53.41%; PC1+PC2 = 77.96% (aún &lt; 80%); PC1+PC2+PC3 = 96.55%. → hacen falta <strong>3 componentes</strong> para superar el 80%.</li>
</ul>
<p><strong>Conclusión honesta:</strong> los criterios <em>no coinciden</em>, algo muy típico con n = 5. Kaiser y el codo sugieren 1; el 80% exige 3. En la respuesta hay que decir esto explícitamente y justificar cuál se prefiere (con λ₂ = 0.98, retener 2 componentes es defendible y suele ser el compromiso razonable).</p>
</div></details>

<details class="acc"><summary>(b) Escribir explícitamente PC1 y PC2</summary><div>
<p>Los componentes se escriben sobre las variables <strong>estandarizadas</strong> (porque se usó <code class="inl">scale. = TRUE</code>):</p>
<div class="tex">$$\begin{aligned}
\text{PC}_1&=0.6341\,Z_{\text{Frec}}+0.4336\,Z_{\text{Gasto}}
            +0.5468\,Z_{\text{Categ}}-0.3331\,Z_{\text{Cup}}\\[8pt]
\text{PC}_2&=-0.2425\,Z_{\text{Frec}}+0.4967\,Z_{\text{Gasto}}
            -0.5128\,Z_{\text{Categ}}-0.6569\,Z_{\text{Cup}}\\[10pt]
\text{donde}\quad Z_j&=\frac{X_j-\bar{x}_j}{s_j}
\end{aligned}$$</div>
</div></details>

<details class="acc"><summary>(c) Interpretación conceptual de PC1</summary><div>
<p>Loadings de PC1: Frecuencia <strong>+0.634</strong>, Categorías <strong>+0.547</strong>, Gasto <strong>+0.434</strong>, Cupones <strong>−0.333</strong>.</p>
<p>Los tres primeros son positivos y fuertes (|loading| ≥ 0.40 → variable fuerte); Cupones es negativo y moderado. PC1 contrasta a clientes que compran <strong>seguido, mucho y en muchas categorías</strong> frente a clientes que <strong>dependen de cupones</strong>. Se puede llamar <strong>«intensidad / valor del cliente»</strong>: puntajes altos = cliente de alto compromiso que no necesita descuentos; puntajes bajos = cliente ocasional guiado por promociones.</p>
</div></details>

<details class="acc"><summary>(d) Score en PC1 de un cliente nuevo — la pregunta con truco</summary><div>
<p>Cliente nuevo: Frecuencia = 10, Gasto = $58.000, Categorías = 5, Cupones = 3.</p>
<div class="note trap"><span class="nh">🚨 NO se pueden reemplazar los valores crudos</span>
<p>Los loadings de <code class="inl">prcomp(..., scale. = TRUE)</code> multiplican variables <strong>estandarizadas</strong>, no las originales. Meter 58000 directamente da un número sin sentido (dominaría todo). <strong>Primero hay que estandarizar el cliente nuevo usando la media y la desviación estándar de la muestra original</strong> (no las suyas propias, que no existen para un solo caso).</p></div>
<p><strong>Procedimiento correcto:</strong></p>
<ol class="tight">
  <li>Calcular x̄<sub>j</sub> y s<sub>j</sub> de cada variable con los <strong>5 clientes originales</strong>.</li>
  <li>Estandarizar: Z<sub>j</sub> = (x<sub>j,nuevo</sub> − x̄<sub>j</sub>) / s<sub>j</sub>.</li>
  <li>Aplicar PC1 = Σ loading<sub>j</sub> · Z<sub>j</sub>.</li>
</ol>
<pre class="r">clientes &lt;- data.frame(
  Frecuencia = c(7, 8, 15, 11, 9),
  Gasto      = c(41962, 66644, 64345, 53818, 66123),
  Categorias = c(5, 3, 7, 5, 4),
  Cupones    = c(2, 2, 4, 4, 3))

pca   &lt;- prcomp(clientes, scale. = TRUE)
nuevo &lt;- data.frame(Frecuencia = 10, Gasto = 58000, Categorias = 5, Cupones = 3)

<span class="c"># Forma directa y segura: predict() aplica el mismo centrado y escalado</span>
predict(pca, newdata = nuevo)[, 1]

<span class="c"># Forma manual, equivalente (útil para mostrar el desarrollo en la prueba)</span>
z &lt;- (as.numeric(nuevo) - pca$center) / pca$scale
sum(z * pca$rotation[, 1])</pre>
<p class="small muted">Los objetos <code class="inl">pca$center</code> y <code class="inl">pca$scale</code> guardan exactamente las medias y desviaciones usadas en el ajuste. Por eso <code class="inl">predict()</code> es la forma correcta de puntuar casos nuevos.</p>
<div class="src">Fuente: «Ayudantía 2 2026-20 Enunciado», P5.</div>
</div></details>

<h2>10.4 Interpretación de loadings</h2>
<div class="note memo"><span class="nh">⚠️ Reglas de corte del curso</span>
<div class="tex">$$\begin{aligned}
|\text{loading}|\ \ge\ \mathbf{0.30}\ &\rightarrow\ \text{variable \textbf{relevante}}\\
|\text{loading}|\ \ge\ \mathbf{0.40}\ &\rightarrow\ \text{variable \textbf{fuerte}}\\[8pt]
(+)\ &\rightarrow\ \text{relación positiva con el componente}\\
(-)\ &\rightarrow\ \text{relación negativa con el componente}
\end{aligned}$$</div>
<p>Se interpreta el <strong>valor absoluto</strong> para decidir si la variable entra; el signo, para leer el contraste.</p></div>

<div class="blk ex"><div class="blk-h">💡 Interpretación de mtcars (PPT diap. 23–24)</div>
<p><strong>PC1</strong> — loadings positivos altos: <code class="inl">cyl, disp, hp, wt</code> (autos grandes, pesados, potentes). Loadings negativos altos: <code class="inl">mpg, drat</code> (autos eficientes, económicos).<br>
→ PC1 = <strong>«Tamaño y potencia del vehículo vs eficiencia»</strong>: un eje que va de vehículo grande/pesado/potente a liviano/eficiente.</p>
<p><strong>PC2</strong> — positivos: <code class="inl">gear, am, carb</code> (más marchas, transmisión manual, más carburadores). Negativos: <code class="inl">qsec</code> (mayor tiempo en 1/4 de milla).<br>
→ PC2 = <strong>«Configuración deportiva vs desempeño en aceleración»</strong>: características mecánicas y de transmisión no relacionadas con el tamaño.</p></div>

<h4>La salida real de <code class="inl">summary(prcomp(mtcars, scale. = TRUE))</code></h4>
<div class="console">Importance of components:
                          PC1     PC2      PC3      PC4      PC5
Standard deviation     <b>2.5707</b>  <b>1.6280</b>  0.79196  0.51923  0.47271
Proportion of Variance 0.6008  0.2409  0.05702  0.02451  0.02031
Cumulative Proportion  0.6008  <b>0.8417</b>  0.89873  0.92324  0.94356</div>
<div class="note memo"><span class="nh">⚠️ Los números que hay que saber leer aquí</span>
<ul class="tight">
  <li><strong>Autovalores:</strong> λ₁ = 2.5707² = <strong>6.608</strong> · λ₂ = 1.6280² = <strong>2.650</strong> · λ₃ = 0.79196² = <strong>0.627</strong></li>
  <li><strong>Kaiser (λ &gt; 1):</strong> retiene <strong>2 componentes</strong> (λ₃ = 0.627 &lt; 1).</li>
  <li><strong>Regla del 80%:</strong> PC1 = 60.08%; PC1+PC2 = <strong>84.17%</strong> ≥ 80% ⟹ también <strong>2 componentes</strong>.</li>
  <li><strong>Codo:</strong> la caída fuerte se agota tras PC2 ⟹ <strong>2 componentes</strong>.</li>
  <li>Verificación: Σλ = 11 = número de variables (porque se usó la matriz de correlación).</li>
</ul>
<p>En mtcars los <strong>tres criterios coinciden</strong> en 2 componentes — a diferencia del caso de la Ayudantía 2, donde discrepan. Ese contraste es material de pregunta.</p></div>

<h4>Loadings reales de PC1 y PC2 (<code class="inl">pca$rotation</code>)</h4>
<table class="tbl">
<tr><th>Variable</th><th>PC1</th><th>PC2</th><th>Lectura</th></tr>
<tr><td>mpg</td><td><b>−0.3625</b></td><td>0.0161</td><td>PC1 fuerte negativo</td></tr>
<tr><td>cyl</td><td><b>0.3739</b></td><td>0.0437</td><td>PC1 fuerte positivo</td></tr>
<tr><td>disp</td><td><b>0.3682</b></td><td>−0.0493</td><td>PC1 fuerte positivo</td></tr>
<tr><td>hp</td><td><b>0.3301</b></td><td>0.2488</td><td>PC1 fuerte positivo</td></tr>
<tr><td>drat</td><td>−0.2942</td><td>0.2747</td><td>PC1 relevante negativo</td></tr>
<tr><td>wt</td><td><b>0.3461</b></td><td>−0.1430</td><td>PC1 fuerte positivo</td></tr>
<tr><td>qsec</td><td>−0.2005</td><td><b>−0.4634</b></td><td>PC2 fuerte negativo</td></tr>
<tr><td>vs</td><td>−0.3065</td><td>−0.2316</td><td>PC1 relevante negativo</td></tr>
<tr><td>am</td><td>−0.2349</td><td><b>0.4294</b></td><td>PC2 fuerte positivo</td></tr>
<tr><td>gear</td><td>−0.2069</td><td><b>0.4623</b></td><td>PC2 fuerte positivo</td></tr>
<tr><td>carb</td><td>0.2140</td><td><b>0.4136</b></td><td>PC2 fuerte positivo</td></tr>
</table>
<p class="small muted">Aplicando la regla del curso (|loading| ≥ 0.40 fuerte, ≥ 0.30 relevante): en <strong>PC1</strong> son fuertes cyl, disp, wt, mpg, hp y vs (todas ≥ 0.30, ninguna llega a 0.40 porque con 11 variables el peso se reparte); en <strong>PC2</strong> son fuertes gear, qsec, am y carb. Eso respalda exactamente la interpretación de las láminas.</p>

<div class="blk ex"><div class="blk-h">💡 Interpretación de las notas (Ayudantía 3, P2)</div>
<p>50 alumnos, 6 asignaturas. PC1 tiene varianza <strong>3.87</strong>; PC2, <strong>0.84</strong>; PC3 ya es claramente menor.</p>
<ul class="tight">
  <li><strong>Kaiser:</strong> solo PC1 supera 1 → 1 componente.</li>
  <li><strong>Codo:</strong> el cambio brusco de pendiente está entre PC1 y PC2.</li>
  <li><strong>Interpretación de PC1:</strong> en términos simples, la «nota general» del alumno — un índice de rendimiento global.</li>
</ul>
<div class="src">Fuente: «Ayudantia 3 2026-20 Pauta R.R», bloques 2–3 y comentarios.</div></div>

<h2>10.5 Biplot</h2>
<p>Superpone <strong>observaciones (puntos)</strong> y <strong>variables (flechas)</strong> en el espacio PC1–PC2. Cómo leerlo:</p>
<ul class="tight">
  <li>Flechas <strong>cercanas entre sí</strong> (ángulo pequeño) → variables <strong>correlacionadas positivamente</strong>.</li>
  <li>Flechas <strong>opuestas</strong> (~180°) → correlacionadas negativamente.</li>
  <li>Flechas <strong>perpendiculares</strong> (~90°) → prácticamente no correlacionadas.</li>
  <li>Flecha <strong>larga</strong> → variable bien representada en ese plano.</li>
  <li>Observaciones en la dirección de una flecha → valores altos en esa variable.</li>
</ul>

<h2>10.6 Resumen del capítulo: los 7 pasos del ACP</h2>
<ol class="tight">
  <li>Centrar (y estandarizar) las variables.</li>
  <li>Calcular la matriz de covarianza (o correlación).</li>
  <li>Obtener autovalores y autovectores.</li>
  <li>Ordenar componentes por varianza explicada.</li>
  <li>Seleccionar cuántos conservar (scree plot, 80%, Kaiser).</li>
  <li>Proyectar los datos al espacio reducido.</li>
  <li>Interpretar los loadings de cada componente.</li>
</ol>
<div class="note info"><span class="nh">📌 Cierre del PPT</span>
<p>«El ACP es una técnica de <strong>reducción de dimensiones</strong>. <strong>No es un modelo predictivo</strong>, sino una herramienta de exploración y simplificación de datos multivariados.» Y es un método <strong>no supervisado</strong>: no usa ninguna variable objetivo para construir los componentes.</p></div>

<div class="src">Fuentes: PPT «3. Análisis de Componentes Principales» (diap. 19–26); script «3. Análisis de Componentes Principales. Ejemplos R»; «Ayudantía 2 2026-20 Enunciado» P5; «Ayudantia 3 2026-20 Pauta R.R». Complemento sobre prcomp vs princomp y biplots: <a href="https://www.sthda.com/english/articles/31-principal-component-methods-in-r-practical-guide/118-principal-component-analysis-in-r-prcomp-vs-princomp/" target="_blank" rel="noopener">STHDA</a> (búsqueda en internet).</div>
`
},

/* ────────────────────────────── MÓDULO 11 ────────────────────────────── */
{
  id: 'm11',
  num: 11,
  title: 'Análisis Factorial: el modelo y la adecuación de los datos',
  tag: 'Capítulo 4',
  desc: 'Factores latentes, comunalidad y unicidad, KMO y test de Bartlett. Los requisitos previos que siempre se preguntan.',
  html: String.raw`
<h2>11.1 ¿Qué es el Análisis Factorial?</h2>
<div class="blk simple"><div class="blk-h">🧠 En simple</div>
<p>Es una técnica de reducción de dimensiones que busca <strong>factores latentes (no observados)</strong> que expliquen las <strong>correlaciones entre las variables observadas</strong>.</p>
<p>La lógica es al revés que el ACP: en vez de «construyo un resumen de mis variables», el AF dice «existen unas pocas causas ocultas, y las correlaciones que veo entre mis variables son la <em>huella</em> de esas causas».</p></div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo que usa el PPT</div>
<p>Notas de 6 asignaturas. No se observa directamente la «aptitud científica» de un alumno, pero si Matemáticas, Física y Química correlacionan mucho entre sí, ese patrón sugiere un factor latente detrás. Igual con Inglés, Historia y Dibujo → «aptitud humanística».</p></div>

<h2>11.2 El modelo factorial</h2>
<div class="tex">$$\begin{gathered}
\mathbf{X_j=\lambda_{j1}F_1+\lambda_{j2}F_2+\dots+\lambda_{jm}F_m+e_j}\\[10pt]
\begin{aligned}
F_k &= \text{factores comunes (latentes, no observados)}\\
\lambda_{jk} &= \text{cargas factoriales: corr. entre la variable } j \text{ y el factor } k\\
e_j &= \text{factor único / específico (lo propio de esa variable + error)}
\end{aligned}\\[16pt]
\text{Descomposición de la varianza (variables estandarizadas):}\qquad
\mathbf{1=h_j^{2}+u_j^{2}}\\[10pt]
\begin{aligned}
h_j^{2} &= \textbf{COMUNALIDAD} = \sum_k \lambda_{jk}^{2}
   && \text{varianza explicada por los factores comunes}\\
u_j^{2} &= \textbf{UNICIDAD} = 1-h_j^{2}
   && \text{varianza propia + error, NO explicada}
\end{aligned}
\end{gathered}$$</div>

<div class="note memo"><span class="nh">⚠️ Comunalidad y unicidad — la pareja que siempre se pregunta</span>
<ul class="tight">
<li><strong>Comunalidad (h²)</strong>: proporción de la varianza de cada variable explicada por los factores. Cerca de 1 → variable bien representada.</li>
<li><strong>Unicidad (u²) = 1 − h²</strong>: varianza específica + error. Alta → la variable no encaja en la estructura factorial.</li>
<li>En una solución ortogonal, <strong>h² es la suma de los cuadrados de las cargas de esa fila</strong>.</li>
</ul></div>

<div class="blk ex"><div class="blk-h">💡 Lectura real de una salida (Ayudantía 3, notas)</div>
<ul class="tight">
  <li><strong>Historia: h² = 0.95</strong> → el 95% de su variación está explicada por los 2 factores.</li>
  <li><strong>Química: h² = 1.00</strong> → prácticamente toda su varianza está explicada; u² = 0.005.</li>
  <li><strong>Matemáticas: h² = 0.26</strong> → muy baja explicación, la variable está <strong>mal representada</strong>; u² = 0.737 (mucha información no explicada).</li>
</ul>
<div class="src">Fuente: «Ayudantia 3 2026-20 Pauta R.R», comentarios del bloque 7.</div></div>

<h2>11.3 Requisitos previos: ¿son mis datos aptos para AF?</h2>
<div class="note memo"><span class="nh">⚠️ Los tres requisitos del PPT (diap. 45)</span>
<ol class="tight">
  <li><strong>KMO adecuado</strong> (&gt; 0.5, idealmente ≥ 0.6).</li>
  <li><strong>Test de Bartlett significativo</strong> (p &lt; 0.05).</li>
  <li><strong>Matriz de correlaciones con estructura</strong> (correlaciones apreciables entre variables).</li>
</ol></div>

<h3>Test de esfericidad de Bartlett (mismo del módulo 1)</h3>
<div class="tex">$$\begin{gathered}
H_0:\ R=I \qquad \text{(no hay correlaciones)}\\[8pt]
\text{Queremos } \mathbf{RECHAZAR}\ H_0
\ \rightarrow\ p\lt 0.05
\ \rightarrow\ \text{sí hay correlaciones}
\ \rightarrow\ \text{el AF es apropiado}
\end{gathered}$$</div>
<pre class="r">library(psych)
cortest.bartlett(datos)                 <span class="c"># sobre datos crudos</span>
cortest.bartlett(cor(notas), n = 30)    <span class="c"># sobre la matriz de correlación (hay que dar n)</span></pre>

<h3>Test KMO (Kaiser-Meyer-Olkin)</h3>
<div class="blk simple"><div class="blk-h">🧠 En simple</div>
<p>El KMO mide si las correlaciones entre variables son «lo bastante compartidas» como para que existan factores comunes. Compara las correlaciones simples con las <strong>correlaciones parciales</strong>: si al controlar por el resto de variables la correlación entre dos se desvanece, eso indica estructura común (bueno para AF). Si se mantiene alta, la relación es exclusiva de ese par (malo para AF).</p></div>

<div class="note memo"><span class="nh">⚠️ Escala de interpretación del KMO</span>
<table class="tbl">
<tr><th>KMO</th><th>Etiqueta (escala de Kaiser)</th><th>¿Sirve?</th></tr>
<tr><td>0.90 – 1.00</td><td>Marvelous (excelente)</td><td>Sí</td></tr>
<tr><td>0.80 – 0.89</td><td>Meritorious (muy bueno)</td><td>Sí</td></tr>
<tr><td>0.70 – 0.79</td><td>Middling (aceptable)</td><td>Sí, con cuidado</td></tr>
<tr><td>0.60 – 0.69</td><td>Mediocre (marginal)</td><td>Límite</td></tr>
<tr><td>0.50 – 0.59</td><td>Miserable (pobre)</td><td>Dudoso</td></tr>
<tr><td>&lt; 0.50</td><td>Unacceptable</td><td><strong>No</strong></td></tr>
</table>
<p><strong>Umbrales que usa este curso:</strong> el script 4.1 dice «≥ 0.75 bien | ≥ 0.50 aceptable | &lt; 0.50 inaceptable»; el PPT 4.2 y la pauta de la Ayudantía 3 usan «<strong>Overall MSA &gt; 0.6</strong> para que sea aceptable». Usa el criterio del curso; la escala de Kaiser es el respaldo bibliográfico.</p>
<div class="src">Fuentes: script «4.1 Análisis Factorial (clase 1). Ejemplos R»; PPT «4.2» diap. 41; «Ayudantia 3 2026-20 Pauta R.R». Escala de Kaiser: <a href="https://en.wikipedia.org/wiki/Kaiser%E2%80%93Meyer%E2%80%93Olkin_test" target="_blank" rel="noopener">Kaiser–Meyer–Olkin test (Wikipedia)</a> (búsqueda en internet).</div></div>

<pre class="r">library(psych)
KMO(datos)
<span class="c"># Devuelve el "Overall MSA" (KMO global) y un MSA por variable.</span></pre>

<div class="blk ex"><div class="blk-h">💡 Caso USArrests (PPT diap. 41)</div>
<p>«KMO global &gt; 0.6 → adecuado para AF. <strong>UrbanPop muestra adecuación baja (MSA = 0.49)</strong>.»</p>
<p><strong>Lección:</strong> el KMO por variable (MSA individual) también se lee. Una variable con MSA bajo es candidata a ser <strong>eliminada</strong> del análisis, porque no comparte estructura con las demás — tiene sentido: UrbanPop (% población urbana) no es una tasa de criminalidad como las otras tres.</p></div>

<div class="blk ex"><div class="blk-h">💡 Caso notas (Ayudantía 3)</div>
<p>«Se obtiene un <strong>Overall MSA = 0.82</strong>, por lo que es muy adecuado» (categoría <em>meritorious</em>).</p></div>

<h2>11.4 Métodos de extracción</h2>
<table class="tbl">
<tr><th>Método</th><th>Idea</th><th>En R (<code>fm=</code>)</th></tr>
<tr><td><strong>Componentes Principales</strong></td><td>Usa el ACP como aproximación; explica varianza total</td><td><code>fm = "pa"</code> / <code>principal()</code></td></tr>
<tr><td><strong>Ejes Principales</strong></td><td>Itera sobre la matriz de correlación con comunalidades en la diagonal</td><td><code>fm = "pa"</code></td></tr>
<tr><td><strong>Máxima Verosimilitud</strong></td><td>Estimación bajo supuesto de <strong>normalidad</strong>; permite test de bondad de ajuste</td><td><code>fm = "ml"</code></td></tr>
</table>
<p class="small muted">La pauta de la Ayudantía 3 usa <code class="inl">fm = "ml"</code> y lo justifica así: «Método de estimación <em>Maximum Likelihood</em> para asumir supuesto de normalidad». Su ventaja práctica: entrega el χ² que permite contrastar si el número de factores es suficiente.</p>

<div class="src">Fuentes: PPT «4.2 Análisis Factorial (clase 2)» (diap. 45); scripts «4.1» y «4.2 Análisis Factorial. Ejemplos R»; «Ayudantia 3 2026-20 Pauta R.R». Complemento sobre comunalidad/unicidad: <a href="https://www.uv.es/ceaces/multivari/factorial/versus.htm" target="_blank" rel="noopener">Universitat de València — AF vs Componentes Principales</a> (búsqueda en internet).</div>
`
},

/* ────────────────────────────── MÓDULO 12 ────────────────────────────── */
{
  id: 'm12',
  num: 12,
  title: 'AF: número de factores, rotación e interpretación de fa()',
  tag: 'Capítulo 4 · R',
  desc: 'Parsimonia, los 4 criterios, Varimax/Quartimax/Equamax vs Oblimin/Promax, y cómo leer línea por línea la salida de psych::fa().',
  html: String.raw`
<h2>12.1 Principio de parsimonia</h2>
<p>El Análisis Factorial puede generar <strong>más factores de los necesarios</strong>. Los primeros explican casi toda la información (varianza) contenida en los datos.</p>
<div class="note memo"><span class="nh">⚠️ Principio de parsimonia</span>
<p>Explicar los datos con el <strong>menor número posible de factores</strong> sin perder información importante. Esto permite obtener factores más <strong>interpretables y estables</strong>.</p></div>

<h2>12.2 Los cuatro criterios para elegir el número de factores</h2>
<table class="tbl">
<tr><th>Criterio</th><th>En qué consiste</th><th>Ventaja / Problema</th></tr>
<tr>
  <td><strong>a) Determinación a priori</strong></td>
  <td>Basarse en <strong>conocimiento teórico</strong> del problema. Ej.: un cuestionario de satisfacción laboral donde teóricamente esperas 3 dimensiones.</td>
  <td>✅ Es el <strong>más confiable</strong> si las variables están bien seleccionadas y la base teórica es clara.</td>
</tr>
<tr>
  <td><strong>b) Regla de Kaiser</strong></td>
  <td>Conservar factores con <strong>valor propio (eigenvalue) &gt; 1</strong>. Lógica: cada variable aporta varianza = 1; si un factor explica menos, no vale la pena.</td>
  <td>❌ Tiende a <strong>subestimar</strong> el número real de factores.</td>
</tr>
<tr>
  <td><strong>c) % de varianza explicada</strong></td>
  <td>Seleccionar factores que expliquen <strong>75–80%</strong> de la varianza total.</td>
  <td>✅ Funciona con matrices de correlación y de varianza-covarianza.<br>❌ El porcentaje elegido es <strong>arbitrario</strong> (depende del investigador).</td>
</tr>
<tr>
  <td><strong>d) Scree plot</strong> (gráfico de sedimentación)</td>
  <td>Graficar eigenvalues vs nº de factores; conservar los <strong>anteriores al «codo»</strong> donde la curva se aplana.</td>
  <td>❌ Depende de la <strong>interpretación visual</strong>: es subjetivo.</td>
</tr>
</table>

<h4>Extra: análisis paralelo (el que usa R en la práctica)</h4>
<pre class="r">fa.parallel(datos, fa = "fa")</pre>
<p>Compara los eigenvalores <strong>reales</strong> (línea azul) con los de <strong>datos aleatorios simulados</strong> (línea roja). Regla: <strong>conservar los factores cuyo eigenvalor real supere al simulado</strong>. Es más robusto que Kaiser porque el umbral se adapta a n y p en vez de ser un 1 fijo.</p>
<p class="small muted">En USArrests, la recomendación del PPT fue: «1 factor claramente significativo; el 2º podría considerarse».</p>

<h2>12.3 Interpretación de los factores</h2>
<p>La interpretación se basa en las <strong>correlaciones entre factores latentes y variables observadas</strong> (las cargas factoriales).</p>
<ol class="tight">
  <li>Identificar las variables con <strong>mayor correlación en valor absoluto</strong> con cada factor.</li>
  <li><strong>Asignar un nombre</strong> al factor según las variables relacionadas.</li>
</ol>
<div class="note memo"><span class="nh">⚠️ Umbrales de carga factorial significativa</span>
<p>PPT: «generalmente <strong>&gt; |0.5|</strong> o <strong>&gt; |0.4|</strong>».<br>
Pauta de ayudantía (más fina): ≈ 0.30 → <strong>débil</strong>; ≥ 0.50 → <strong>moderada</strong>; ≥ 0.70 → <strong>fuerte</strong>.</p></div>

<p>En un <strong>loading plot</strong>: variables al final de un eje → alta correlación con ese factor; variables cerca del origen → baja correlación con todos los factores.</p>

<div class="blk ex"><div class="blk-h">💡 Ejemplo del PPT: 6 materias</div>
<ul class="tight">
  <li><strong>Factor 1</strong>: Matemáticas (0.8), Física (0.7), Química (0.6) → «<strong>Aptitud Científica</strong>» o «Razonamiento Lógico-Matemático».</li>
  <li><strong>Factor 2</strong>: Inglés (0.8), Historia (0.82), Dibujo (0.85) → «<strong>Aptitud Humanística</strong>» o «Creatividad y Expresión».</li>
</ul></div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo completo: encuesta de restaurantes (Ayudantía 3, P4)</div>
<p>10 preguntas (escala 1–5), <code class="inl">fa(nfactors = 4, rotate = "varimax", fm = "ml")</code>. El modelo explicó en conjunto el <strong>76%</strong> de la varianza total, con contribución equilibrada: F1 = 21%, F2 = 20%, F3 = 19%, F4 = 15%.</p>
<table class="tbl">
<tr><th>Factor</th><th>Nombre asignado</th><th>Variables con carga alta</th></tr>
<tr><td>F1</td><td><strong>Calidad del servicio</strong></td><td>Empleados amigables (0.98), Servicio rápido (0.82), Empleados con conocimiento (0.58)</td></tr>
<tr><td>F2</td><td><strong>Calidad de la comida</strong></td><td>Excelente sabor (0.96), Comida fresca (0.76), Temperatura apropiada (0.64)</td></tr>
<tr><td>F3</td><td><strong>Valor económico percibido</strong></td><td>Porciones grandes (0.98), Precios razonables (0.94)</td></tr>
<tr><td>F4</td><td><strong>Ambiente del restaurante</strong></td><td>Interior atractivo (0.99), Lugar entretenido (0.65)</td></tr>
</table>
<p>Mean item complexity = 1.2 → en general basta 1 factor para explicar cada ítem. <strong>Esta es exactamente la forma de responder «interprete cada uno de los factores»</strong>: agrupar por cargas altas y ponerle un nombre sustantivo al constructo.</p>
<div class="src">Fuente: «Ayudantia 3 2026-20 Pauta R.R», Pregunta 4.</div></div>

<h2>12.4 Rotación de factores</h2>
<div class="blk simple"><div class="blk-h">🧠 En simple</div>
<p>Los métodos de extracción no siempre producen matrices de cargas fácilmente interpretables. La rotación <strong>gira los ejes</strong> factoriales para acercarse a una estructura más limpia, sin cambiar cuánta varianza se explica en total.</p></div>

<div class="note memo"><span class="nh">⚠️ La propiedad que SIEMPRE se pregunta</span>
<p>La rotación <strong>NO cambia</strong>:</p>
<ul class="tight">
  <li>Las <strong>comunalidades</strong> (h²)</li>
  <li>Las <strong>especificidades / unicidades</strong> (u²)</li>
  <li>La <strong>varianza total explicada</strong> por el conjunto de factores</li>
</ul>
<p>Solo cambia <strong>cómo se distribuye la varianza entre los factores</strong> y la <strong>interpretabilidad</strong>.</p></div>

<h4>Principio de Estructura Simple (Thurstone, 1935)</h4>
<ul class="tight">
  <li>Cada factor debe tener <strong>pocas cargas altas</strong> y el resto cercanas a cero.</li>
  <li>Cada variable debe estar asociada <strong>principalmente a un solo factor</strong>.</li>
  <li>Los factores deben mostrar <strong>patrones diferentes</strong> de cargas.</li>
</ul>

<h4>Rotación ORTOGONAL (factores independientes, no correlacionados)</h4>
<table class="tbl">
<tr><th>Método</th><th>Objetivo</th><th>Nota</th></tr>
<tr><td><strong>Varimax</strong> <span class="chip green">el más utilizado</span></td><td>Que cada factor tenga cargas muy altas en algunas variables y muy bajas en las demás</td><td>Simplifica <strong>columnas</strong> (factores) → fáciles de interpretar</td></tr>
<tr><td><strong>Quartimax</strong></td><td>Que cada variable se relacione con un solo factor</td><td>Simplifica <strong>filas</strong>. Problema: a veces produce un <strong>factor general fuerte</strong> poco interpretable</td></tr>
<tr><td><strong>Equamax</strong></td><td>Combinación de Varimax y Quartimax</td><td>Equilibra ambos criterios</td></tr>
</table>

<h4>Rotación OBLICUA (permite factores correlacionados)</h4>
<table class="tbl">
<tr><th>Método</th><th>Cómo funciona</th><th>Cuándo usarlo</th></tr>
<tr><td><strong>Oblimin</strong></td><td>Permite que los factores estén correlacionados (no totalmente independientes)</td><td>Cuando es razonable que los factores compartan varianza. Ej.: factores de personalidad</td></tr>
<tr><td><strong>Promax</strong></td><td>Primero hace una rotación <strong>Varimax</strong> y luego permite correlación entre factores</td><td>Rápido y eficiente. Muy común con <strong>muchas variables</strong></td></tr>
</table>

<div class="note tip"><span class="nh">✅ ¿Ortogonal u oblicua?</span>
<p>Pregunta guía: <em>¿tiene sentido en el mundo real que estos constructos estén correlacionados?</em> «Aptitud científica» y «aptitud humanística» probablemente sí (ambas dependen de habilidad general y esfuerzo) → oblicua. Si necesitas factores estrictamente independientes para usarlos después como predictores no colineales → ortogonal (Varimax).</p></div>

<h2>12.5 Leer la salida de <code class="inl">psych::fa()</code> línea por línea</h2>
<pre class="r">library(psych)
fa_model &lt;- fa(notas,
               nfactors = 2,          <span class="c"># cantidad de factores</span>
               rotate   = "varimax",  <span class="c"># rotación ortogonal</span>
               fm       = "ml")       <span class="c"># máxima verosimilitud</span>
fa_model
fa_model$communality                  <span class="c"># h2 por variable</span>

fa_promax &lt;- fa(notas, nfactors = 2, rotate = "promax")   <span class="c"># oblicua</span></pre>

<table class="tbl">
<tr><th>Elemento de la salida</th><th>Qué significa</th><th>Cómo se lee</th></tr>
<tr><td><strong>ML1, ML2…</strong> (columnas)</td><td>Cargas factoriales de cada variable en cada factor (pattern matrix)</td><td>≈0.30 débil · ≥0.50 moderada · ≥0.70 fuerte</td></tr>
<tr><td><strong>h2</strong></td><td><strong>Comunalidad</strong>: proporción de varianza de la variable explicada por los factores</td><td>Cerca de 1 = bien representada. 0.26 = mal representada</td></tr>
<tr><td><strong>u2</strong></td><td><strong>Unicidad</strong> = 1 − h². Varianza específica + error</td><td>Alta = mucha información no explicada</td></tr>
<tr><td><strong>com</strong></td><td><strong>Complejidad</strong>: cuántos factores influyen en esa variable</td><td>≈1 estructura simple (ideal) · 1–2 moderada · &gt;2 compleja</td></tr>
<tr><td><strong>SS loadings</strong></td><td>Suma de cuadrados de las cargas de cada factor = varianza que aporta</td><td>Ej.: ML1 = 2.57, ML2 = 1.24</td></tr>
<tr><td><strong>Proportion Var</strong></td><td>Proporción de la varianza <strong>total</strong> explicada por cada factor</td><td>ML1 = 0.43, ML2 = 0.21 → juntos explican el <strong>64%</strong></td></tr>
<tr><td><strong>Proportion Explained</strong></td><td>Reparto de la varianza <strong>común</strong> entre factores</td><td>ML1 = 67%, ML2 = 33% → ML1 es dominante</td></tr>
<tr><td><strong>Mean item complexity</strong></td><td>Promedio de la columna <code>com</code></td><td>1.5 → las variables dependen en promedio de algo más de 1 factor, sin exceso</td></tr>
<tr><td><strong>Likelihood Chi Square</strong> + prob</td><td>Contraste de si el nº de factores es <strong>suficiente</strong></td><td>χ² = 1.21, p = 0.88 → <strong>no</strong> se rechaza que 2 factores basten ✓</td></tr>
<tr><td><strong>RMSR</strong></td><td>Residuo cuadrático medio</td><td>Ideal <strong>&lt; 0.05</strong>. Ej.: 0.02 ✓</td></tr>
<tr><td><strong>RMSEA</strong></td><td>Error de aproximación</td><td>Ideal <strong>&lt; 0.05</strong>. Ej.: 0.00 ✓</td></tr>
<tr><td><strong>TLI</strong> (Tucker-Lewis)</td><td>Índice de ajuste comparativo</td><td>Cerca de 1 = buen ajuste. <strong>Puede ser &gt;1 en muestras pequeñas</strong> (ej.: 1.114)</td></tr>
</table>

<div class="note trap"><span class="nh">🚨 El test χ² del AF va al revés de lo que uno espera</span>
<p>En el test de Bartlett <strong>queremos rechazar</strong> H₀. En el χ² de bondad de ajuste del modelo factorial <strong>queremos NO rechazar</strong>: H₀ dice «el modelo con m factores reproduce bien la matriz de correlaciones». Un <strong>p-valor grande es buena noticia</strong>: los m factores son suficientes.</p></div>

<h2>12.6 La demostración numérica: Varimax vs Promax en USArrests</h2>
<p>El PPT corre el <strong>mismo modelo dos veces</strong>, cambiando solo la rotación. Compararlas lado a lado prueba la propiedad de la sección 12.4.</p>

<div class="console"><b>rotate = "varimax"</b> (ortogonal)        <b>rotate = "promax"</b> (oblicua)
           MR1   MR2   h2    u2  com              MR1    MR2   h2    u2  com
Murder    0.95  0.02  <b>0.90</b>  <b>0.10</b>  1.0     Murder    1.04  −0.25  <b>0.90</b>  <b>0.10</b>  1.1
Assault   0.84  0.31  <b>0.80</b>  <b>0.20</b>  1.3     Assault   0.84   0.10  <b>0.80</b>  <b>0.20</b>  1.0
UrbanPop  0.06  0.67  <b>0.45</b>  <b>0.55</b>  1.0     UrbanPop −0.12   0.72  <b>0.45</b>  <b>0.55</b>  1.1
Rape      0.59  0.56  <b>0.66</b>  <b>0.34</b>  2.0     Rape      0.49   0.45  <b>0.66</b>  <b>0.34</b>  2.0

SS loadings      1.95  0.86                 SS loadings      2.03  0.78
Proportion Var   0.49  0.21                 Proportion Var   0.51  0.19
Cumulative Var   0.49  <b>0.70</b>                 Cumulative Var   0.51  <b>0.70</b>

                                            With factor correlations of
                                                  MR1   MR2
                                            MR1  1.00  <b>0.47</b>
                                            MR2  <b>0.47</b>  1.00</div>

<div class="note memo"><span class="nh">⚠️ Lee las columnas en negrita: esta es la prueba</span>
<ul class="tight">
  <li><strong>h² es IDÉNTICA</strong> en ambas (0.90, 0.80, 0.45, 0.66). La rotación no cambia las comunalidades. ✓</li>
  <li><strong>u² es IDÉNTICA</strong> (0.10, 0.20, 0.55, 0.34). No cambia las especificidades. ✓</li>
  <li><strong>Cumulative Var = 0.70 en las dos.</strong> La varianza total explicada no cambia. ✓</li>
  <li>Lo que <strong>sí</strong> cambia: las cargas individuales, el reparto entre factores (1.95/0.86 → 2.03/0.78) y la interpretabilidad.</li>
  <li>Solo la <strong>oblicua</strong> reporta «factor correlations»: aquí MR1 y MR2 correlacionan <strong>0.47</strong>. En Varimax esa correlación es 0 por construcción.</li>
</ul></div>

<div class="note trap"><span class="nh">🚨 Tres detalles de esta salida que confunden</span>
<ol class="tight">
  <li><strong>Murder tiene carga 1.04 en Promax</strong> — mayor que 1. Es posible: en rotación <em>oblicua</em> la <em>pattern matrix</em> contiene coeficientes de regresión, no correlaciones, y pueden superar 1. En rotación ortogonal las cargas sí son correlaciones y están acotadas en [−1, 1].</li>
  <li><strong>«df of the model are −1»</strong> y por eso RMSR = 0, Chi Square = 0 y prob = NA. Con <strong>p = 4 variables y m = 2 factores</strong>, los grados de libertad del modelo son [(p−m)² − (p+m)]/2 = [(4−2)² − 6]/2 = <strong>−1</strong>: el modelo tiene más parámetros que datos y está <strong>no identificado</strong>, así que el ajuste es «perfecto» de forma trivial y el test de bondad de ajuste no se puede calcular. <em>Con 4 variables, 2 factores es demasiado.</em></li>
  <li><strong>«method = minres»</strong>, no ML. Como el script del PPT llama a <code class="inl">fa(datos, nfactors=2, rotate="varimax")</code> sin especificar <code class="inl">fm</code>, se usa el <strong>default de psych: residuo mínimo (minres)</strong>. La pauta de la Ayudantía 3 sí pone <code class="inl">fm = "ml"</code> explícitamente, y ahí la etiqueta de los factores cambia de <strong>MR1/MR2</strong> a <strong>ML1/ML2</strong>.</li>
</ol>
<p class="small muted"><strong>Regla de lectura:</strong> el prefijo de la columna te dice el método de extracción — <code class="inl">MR</code> = minres, <code class="inl">ML</code> = máxima verosimilitud, <code class="inl">PA</code> = ejes principales.</p></div>

<h4>Interpretación de los factores de USArrests</h4>
<ul class="tight">
  <li><strong>MR1</strong>: Murder (0.95), Assault (0.84), Rape (0.59) → <strong>«criminalidad violenta»</strong>. Explica el 49% de la varianza.</li>
  <li><strong>MR2</strong>: UrbanPop (0.67), Rape (0.56) → <strong>«urbanización»</strong>. Explica el 21%.</li>
  <li><strong>Rape</strong> tiene com = 2.0: carga en ambos factores casi por igual (0.59 y 0.56), lo que la hace la variable más difícil de asignar.</li>
  <li><strong>UrbanPop</strong> tiene la comunalidad más baja (h² = 0.45) y era también la de menor MSA en el KMO — coherente: es la variable que peor encaja.</li>
</ul>

<h4>Los chequeos previos, con sus números reales</h4>
<div class="console">&gt; KMO(datos)
Kaiser-Meyer-Olkin factor adequacy
<b>Overall MSA =  0.65</b>
MSA for each item =
   Murder  Assault  UrbanPop   Rape
     0.62     0.64      <b>0.50</b>   0.78

&gt; cortest.bartlett(datos)
$chisq   [1] <b>88.28815</b>
$p.value [1] <b>6.868423e-17</b>
$df      [1] <b>6</b></div>
<ul class="tight">
  <li><strong>Overall MSA = 0.65</strong> &gt; 0.6 ⟹ adecuado (aunque solo «mediocre» en la escala de Kaiser).</li>
  <li><strong>UrbanPop MSA = 0.50</strong>, justo en el límite de lo inaceptable. <span class="small muted">(El texto de la lámina dice 0.49; la salida de consola muestra 0.50 — usa el valor de la salida.)</span></li>
  <li><strong>Bartlett:</strong> gl = p(p−1)/2 = 4·3/2 = <strong>6</strong> ✓. p = 6.87×10⁻¹⁷, prácticamente cero ⟹ se rechaza H₀: R = I ⟹ el AF es apropiado.</li>
</ul>

<div class="blk ex"><div class="blk-h">💡 Interpretación completa del ejemplo de notas (Ayudantía 3, P3)</div>
<p>2 factores, Varimax, ML, n = 30:</p>
<ul class="tight">
  <li><strong>ML1</strong> tiene carga fuerte en todos los cursos <em>excepto</em> Matemáticas. <strong>ML2</strong> destaca solo en Química y Matemáticas.</li>
  <li><strong>h²:</strong> Historia 0.95 · Química 1.00 · Matemáticas 0.26 (mal representada).</li>
  <li><strong>u²:</strong> Matemáticas 0.737 · Química 0.005.</li>
  <li><strong>com:</strong> Química = 2.0 (depende de ambos factores) · Inglés = 1.2 (depende principalmente de uno).</li>
  <li><strong>Varianza:</strong> ML1 explica 43%, ML2 el 21% → total <strong>64%</strong>. De la varianza <em>común</em>: ML1 67%, ML2 33%.</li>
  <li><strong>¿2 factores bastan?</strong> χ² = 1.21 con p = 0.88 → no se rechaza que 2 factores sean suficientes.</li>
  <li><strong>Ajuste global:</strong> RMSR = 0.02, RMSEA = 0.00, TLI = 1.114 → ajuste excelente.</li>
  <li><strong>Conclusión:</strong> los puntajes factoriales son fiables y pueden usarse en análisis posteriores (regresión, clustering).</li>
</ul>
<div class="src">Fuente: «Ayudantia 3 2026-20 Pauta R.R», Problema 3 y sus comentarios.</div></div>

<div class="src">Fuentes: PPT «4.2 Análisis Factorial (clase 2)» (diap. 28–45); script «4.2 Análisis Factorial. Ejemplos R»; «Ayudantia 3 2026-20 Pauta R.R». Complemento sobre la salida de fa(): <a href="https://m-clark.github.io/posts/2020-04-10-psych-explained/" target="_blank" rel="noopener">Factor Analysis with the psych package</a> (búsqueda en internet).</div>
`
},

/* ────────────────────────────── MÓDULO 13 ────────────────────────────── */
{
  id: 'm13',
  num: 13,
  title: 'Lectura clave: ACP vs Análisis Factorial',
  tag: 'Lecturas',
  desc: 'La comparación que exige la pregunta 2 de la prueba: qué comparten, en qué difieren y cuándo usar cada uno.',
  html: String.raw`
<div class="note info"><span class="nh">📌 Sobre esta sección</span>
<p>Los <strong>PDF de las lecturas</strong> de ACP y análisis factorial <strong>no están</strong> en los directorios entregados (<code class="inl">classes/</code>, <code class="inl">past-tests/</code>, <code class="inl">r-codes-for-study/</code>). Este módulo reconstruye la comparación estándar a partir de (1) los PPT del curso, que ya la contienen parcialmente, y (2) bibliografía complementaria buscada en internet. <strong>Si el profesor entregó lecturas específicas, esas mandan sobre este resumen.</strong> Revísalas para confirmar terminología y énfasis.</p></div>

<h2>13.1 La diferencia de fondo</h2>
<div class="note memo"><span class="nh">⚠️ Si te tienes que quedar con una sola frase</span>
<p>El <strong>ACP explica la VARIANZA</strong> de las variables observadas. El <strong>AF explica las COVARIANZAS / CORRELACIONES</strong> entre ellas.</p>
<p>Dicho de otro modo: el ACP <strong>resume</strong> lo que observas; el AF <strong>infiere causas latentes</strong> detrás de lo que observas.</p></div>

<h4>Dirección de las flechas (la imagen mental que ayuda)</h4>
<div class="console"><b>ACP</b> — los componentes son un <b>resultado</b> de las variables:

     X₁ ──┐
     X₂ ──┼──►  PC1          (PC1 = combinación lineal de las X)
     X₃ ──┘

<b>AF</b>  — los factores son una <b>causa</b> de las variables:

           ┌──► X₁ + e₁
     F₁ ───┼──► X₂ + e₂      (cada X = carga·F + error único)
           └──► X₃ + e₃</div>

<h2>13.2 Tabla comparativa completa</h2>
<table class="tbl">
<tr><th>Aspecto</th><th>ACP (Componentes Principales)</th><th>AF (Análisis Factorial)</th></tr>
<tr><td><strong>Objetivo</strong></td><td>Dar cuenta de la <strong>varianza</strong> de las variables observadas</td><td>Explicar las <strong>covarianzas/correlaciones</strong> entre ellas</td></tr>
<tr><td><strong>Naturaleza de las nuevas variables</strong></td><td>Los componentes son <strong>variables observadas</strong> (combinaciones lineales exactas de las X)</td><td>Los factores son <strong>variables latentes</strong> (no observadas, inferidas)</td></tr>
<tr><td><strong>¿Hay modelo estadístico?</strong></td><td><strong>No.</strong> Es una transformación algebraica; no hay supuestos que cumplir, ni iteraciones, ni convergencia</td><td><strong>Sí.</strong> Requiere supuestos (ej. normalidad si se usa ML); hay estimación iterativa y puede no converger</td></tr>
<tr><td><strong>Descomposición de la varianza</strong></td><td>No existe el concepto de unicidad: toda la varianza entra al análisis</td><td>Distingue <strong>varianza común (comunalidad h²)</strong> y <strong>varianza única (u²)</strong></td></tr>
<tr><td><strong>Diagonal de la matriz analizada</strong></td><td><strong>1</strong> (varianza total de cada variable estandarizada)</td><td>La <strong>comunalidad estimada</strong> (menor que 1)</td></tr>
<tr><td><strong>Término de error</strong></td><td>No hay término de error por variable</td><td>Cada variable tiene su propio <strong>e<sub>j</sub></strong></td></tr>
<tr><td><strong>Uso típico del resultado</strong></td><td>Se trabaja con las <strong>puntuaciones</strong> (scores) para reducir dimensión antes de otro método</td><td>Rara vez se usan las puntuaciones; el objetivo es <strong>conocer la estructura</strong> y plantear una teoría sobre los constructos</td></tr>
<tr><td><strong>Solución única</strong></td><td><strong>Sí</strong>, es determinista</td><td><strong>No</strong>: distintas rotaciones dan cargas distintas con el mismo ajuste (indeterminación factorial)</td></tr>
<tr><td><strong>Rotación</strong></td><td>Poco habitual (aunque es posible)</td><td><strong>Central</strong> para la interpretación (Varimax, Promax…)</td></tr>
<tr><td><strong>Función en R</strong></td><td><code>prcomp()</code>, <code>princomp()</code></td><td><code>psych::fa()</code>, <code>factanal()</code></td></tr>
</table>
<div class="src">Fuentes: <a href="https://www.uv.es/ceaces/multivari/factorial/versus.htm" target="_blank" rel="noopener">Universitat de València, «Análisis Factorial vs Componentes Principales»</a>; <a href="https://support.minitab.com/es-mx/minitab/help-and-how-to/statistical-modeling/multivariate/supporting-topics/principal-components-and-factor-analysis/differences-between-pca-and-factor-analysis/" target="_blank" rel="noopener">Minitab, «Diferencias entre ACP y análisis factorial»</a> (búsquedas en internet), contrastadas con los PPT del curso.</div>

<h2>13.3 Lo que SÍ comparten</h2>
<ul class="tight">
  <li>Ambos son técnicas <strong>no supervisadas</strong> de <strong>reducción de dimensiones</strong> (no usan variable objetivo).</li>
  <li>Ambos parten de la <strong>matriz de correlación o covarianza</strong> y usan su <strong>descomposición espectral</strong> (valores y vectores propios).</li>
  <li>Ambos exigen los <strong>mismos chequeos previos</strong>: correlaciones apreciables, test de Bartlett significativo, KMO adecuado.</li>
  <li>Ambos usan los <strong>mismos criterios</strong> para decidir cuántas dimensiones conservar: Kaiser, % de varianza, scree plot.</li>
  <li>En la práctica, cuando las comunalidades son altas y hay muchas variables, <strong>las soluciones se parecen mucho numéricamente</strong>. Por eso el ACP es uno de los «métodos de extracción» listados dentro del AF en el PPT.</li>
</ul>

<h2>13.4 ¿Cuándo usar cada uno?</h2>
<table class="tbl">
<tr><th>Usa ACP si…</th><th>Usa AF si…</th></tr>
<tr><td>Solo quieres <strong>menos variables</strong> que conserven la información</td><td>Quieres <strong>entender qué hay detrás</strong> de las correlaciones</td></tr>
<tr><td>Vas a alimentar otro modelo (regresión, clustering) y necesitas variables no colineales</td><td>Estás validando un <strong>cuestionario o escala</strong> (dimensiones de satisfacción, personalidad, aptitud)</td></tr>
<tr><td>No tienes una teoría previa sobre constructos</td><td>Tienes hipótesis sobre <strong>constructos teóricos</strong> que quieres confirmar</td></tr>
<tr><td>No quieres asumir supuestos distribucionales</td><td>Estás dispuesto a asumir un modelo (y quieres poder evaluar su ajuste)</td></tr>
</table>

<h2>13.5 Preguntas de desarrollo típicas y cómo responderlas</h2>

<details class="acc"><summary>«¿Por qué el ACP es un método no supervisado?»</summary><div>
<p>Porque construye los componentes usando <strong>únicamente la estructura de covarianza de las variables predictoras</strong>: maximiza varianza proyectada, sin mirar ninguna variable objetivo o etiqueta. No hay «respuesta correcta» que el método intente predecir. Por eso el inciso h) de la Ayudantía 3 («el PCA es supervisado porque usa una variable objetivo») es <strong>falso</strong>.</p>
</div></details>

<details class="acc"><summary>«Si las variables están en escalas muy distintas, ¿qué matriz uso?»</summary><div>
<p>La <strong>matriz de correlaciones</strong> (equivalente a estandarizar primero y usar covarianzas). Si usaras la de covarianzas, la variable con mayor varianza absoluta —por ejemplo el gasto en pesos frente a la frecuencia en veces/mes— <strong>dominaría PC1 solo por su unidad de medida</strong>, no por su importancia real. En R: <code class="inl">prcomp(datos, scale. = TRUE)</code>.</p>
</div></details>

<details class="acc"><summary>«¿El primer componente principal minimiza la varianza?»</summary><div>
<p><strong>Falso.</strong> PC1 es la combinación lineal que <strong>MAXIMIZA</strong> la varianza de los datos proyectados (sujeta a ‖w‖ = 1). Es la respuesta al inciso c) de la Ayudantía 3. Lo que sí <em>minimiza</em> PC1, de forma equivalente, es el error cuadrático de reconstrucción — pero la formulación del curso es la de máxima varianza.</p>
</div></details>

<details class="acc"><summary>«¿Cuál es el número máximo de componentes principales?»</summary><div>
<p>Es igual al <strong>número de variables originales p</strong> (más precisamente, min(n−1, p), pero el curso trabaja con la respuesta p). Al conservar los p componentes se reproduce exactamente la información original: Σλ<sub>k</sub> = traza de S.</p>
</div></details>

<details class="acc"><summary>«¿Cómo interpreto y nombro un factor?» (formato de respuesta esperado)</summary><div>
<ol class="tight">
  <li>Listar las variables con carga <strong>alta en valor absoluto</strong> en ese factor (&gt; |0.4| o |0.5|), con sus valores.</li>
  <li>Buscar <strong>qué tienen en común</strong> conceptualmente esas variables.</li>
  <li>Proponer un <strong>nombre sustantivo</strong> para el constructo.</li>
  <li>Si hay cargas negativas, describir el factor como un <strong>contraste</strong> entre dos polos.</li>
  <li>Mencionar el <strong>% de varianza</strong> que aporta ese factor.</li>
</ol>
<p><em>Modelo de redacción (de la pauta):</em> «Factor 1: <strong>Calidad del servicio</strong> — empleados amigables (0.98), servicio rápido (0.82), empleados con conocimiento (0.58); explica el 21% de la varianza.»</p>
</div></details>

<div class="src">Este módulo combina: PPT «3» y «4.2» del curso (jerarquía superior) + búsquedas en internet identificadas arriba. Ver la sección «⚠️ Información incierta» en Fuentes.</div>
`
},

/* ────────────────────────────── MÓDULO 14 ────────────────────────────── */
{
  id: 'm14',
  num: 14,
  title: 'Cómo se pregunta esto en la prueba',
  tag: 'Estrategia',
  desc: 'Anatomía de las 3 preguntas, errores que cuestan puntos, y el banco completo de V/F que ya cayó (con justificación).',
  html: String.raw`
<h2>14.1 El temario y qué esperar en cada pregunta</h2>
<table class="tbl">
<tr><th>Pregunta</th><th>Qué mide</th><th>Módulos que la cubren</th></tr>
<tr>
  <td><strong>1. Resolución y test de hipótesis</strong></td>
  <td>Ejercicios: plantear H₀/H₁, calcular el estadístico, valor crítico o p-valor, decisión y conclusión. Casi siempre incluye la sub-pregunta de <strong>valores límite</strong> y/o <strong>probabilidad de error tipo II</strong>.</td>
  <td>M4, M5, M6, <strong>M7</strong>, M8</td>
</tr>
<tr>
  <td><strong>2. Lecturas</strong> (ACP y AF)</td>
  <td>Conceptual: qué es cada técnica, en qué se diferencian, supuestos, cuándo usar cada una, interpretación de constructos. Suele ser V/F con justificación o desarrollo breve.</td>
  <td>M9, M11, <strong>M13</strong></td>
</tr>
<tr>
  <td><strong>3. Ayudantías y modelos vistos en clase</strong></td>
  <td>Interpretación de <strong>salidas de R</strong>: summary(pca), rotation, fa(), KMO, Bartlett, t.test, var.test. Y ejercicios calcados de las ayudantías.</td>
  <td>M1, M2, M10, <strong>M12</strong>, sección 💻 R</td>
</tr>
</table>

<h2>14.2 Los 12 errores que más cuestan puntos</h2>
<ol class="tight">
  <li><strong>Escribir «se acepta H₀»</strong> en vez de «no se rechaza H₀».</li>
  <li>Usar <strong>α</strong> en lugar de <strong>α/2</strong> en pruebas bilaterales.</li>
  <li>Confundir <strong>nivel de confianza 90%</strong> con α = 0.90 (es α = 0.10).</li>
  <li>Usar <strong>σ</strong> donde va <strong>σ²</strong> en la prueba χ² (el enunciado da la desviación, el estadístico usa la varianza).</li>
  <li>Equivocar los <strong>grados de libertad</strong>: n−1 (una muestra), n₁+n₂−2 (pooled), Welch (fórmula), n−2 (test de correlación), p(p−1)/2 (Bartlett).</li>
  <li>Leer <strong>«Standard deviation» del summary(pca) como si fuera el autovalor</strong> (hay que elevarla al cuadrado).</li>
  <li>Aplicar la <strong>regla de Kaiser sobre datos no estandarizados</strong>.</li>
  <li>Calcular el <strong>score de un caso nuevo con valores crudos</strong> en vez de estandarizados.</li>
  <li>Olvidar <strong>2σ₁₂</strong> en Var(X₁ + X₂).</li>
  <li>Recentrar mal el cálculo de β (usar μ₀ en vez de μ<sub>real</sub> en el segundo paso).</li>
  <li>Olvidar verificar <strong>np₀ ≥ 5 y n(1−p₀) ≥ 5</strong> en proporciones.</li>
  <li><strong>No escribir la conclusión en contexto.</strong> Vale ~0.4 pts y se obtiene solo con redactar una frase.</li>
</ol>

<h2>14.3 Banco de Verdadero/Falso ya evaluado, con justificación</h2>
<p class="muted small">Todas estas afirmaciones aparecen textualmente en «Pauta Pregunta 1 - Prueba 1» o en «Ayudantía 3 2026-20 Enunciado». Practícalas hasta poder justificar cada una en una línea — <strong>en la prueba solo la justificación tiene puntaje</strong>.</p>

<h3>Correlación, matrices y escalamiento</h3>
<table class="tbl">
<tr><th>Afirmación</th><th>V/F</th><th>Justificación</th></tr>
<tr><td>Cualquier matriz cuadrada podría ser una matriz de correlación</td><td><span class="chip red">F</span></td><td>Debe cumplir: diagonal toda igual a 1, valores entre −1 y 1, y ser semidefinida positiva</td></tr>
<tr><td>Si dos variables son independientes su correlación es 0</td><td><span class="chip green">V</span></td><td>Independencia ⟹ E(XY)=E(X)E(Y) ⟹ Cov = E(XY)−E(X)E(Y) = 0 ⟹ r = 0</td></tr>
<tr><td>Si dos variables tienen correlación 0, entonces son independientes</td><td><span class="chip red">F</span></td><td>Puede haber relación no lineal; la equivalencia solo vale bajo normal bivariada; o la varianza de Y puede depender de X sin que cambie su media</td></tr>
<tr><td>Con la normalización min-máx la variable tiene media 0 y varianza 1</td><td><span class="chip red">F</span></td><td>Eso lo hace la estandarización. Min-máx lleva al intervalo [0,1]</td></tr>
</table>

<h3>Pruebas de hipótesis</h3>
<table class="tbl">
<tr><th>Afirmación</th><th>V/F</th><th>Justificación</th></tr>
<tr><td>Si no rechazo H₀ puedo estar seguro de que es verdadera</td><td><span class="chip red">F</span></td><td>Solo sé que la evidencia no basta para rechazarla; puedo estar cometiendo un <strong>error tipo II</strong></td></tr>
<tr><td>Con α = 0.01, mientras más grande n, menor la probabilidad de error tipo I</td><td><span class="chip red">F</span></td><td>P(error tipo I) <strong>es</strong> α = 0.01, independientemente de n. Lo que baja con n es β</td></tr>
</table>

<h3>ACP (los 13 incisos de la Ayudantía 3)</h3>
<table class="tbl">
<tr><th>#</th><th>Afirmación</th><th>V/F</th><th>Justificación</th></tr>
<tr><td>a</td><td>El ACP transforma variables posiblemente correlacionadas en variables no correlacionadas llamadas componentes principales</td><td><span class="chip green">V</span></td><td>Es la definición. Los componentes son ortogonales entre sí ⟹ no correlacionados</td></tr>
<tr><td>b</td><td>Los componentes se obtienen como combinaciones lineales de las variables originales</td><td><span class="chip green">V</span></td><td>PC<sub>ℓ</sub> = Σ<sub>j</sub> v<sub>jℓ</sub> x̃<sub>j</sub></td></tr>
<tr><td>c</td><td>El primer componente <strong>minimiza</strong> la varianza de los datos proyectados</td><td><span class="chip red">F</span></td><td>La <strong>maximiza</strong>: max wᵀSw s.a. ‖w‖=1 ⟹ autovector de λ₁</td></tr>
<tr><td>d</td><td>Cada componente principal es ortogonal a los demás</td><td><span class="chip green">V</span></td><td>Los autovectores de una matriz simétrica son ortogonales entre sí</td></tr>
<tr><td>e</td><td>El número máximo de componentes es igual al número de variables originales</td><td><span class="chip green">V</span></td><td>S es p×p ⟹ tiene p autovalores</td></tr>
<tr><td>f</td><td>Si las escalas son muy distintas, conviene usar la matriz de correlaciones en vez de la de covarianzas</td><td><span class="chip green">V</span></td><td>Evita que la variable de mayor varianza absoluta domine los componentes. En R: <code>scale.=TRUE</code></td></tr>
<tr><td>g</td><td>La suma de las varianzas explicadas por todos los componentes = suma de las varianzas de las variables originales</td><td><span class="chip green">V</span></td><td>Σλ<sub>k</sub> = traza(S). La varianza total se conserva</td></tr>
<tr><td>h</td><td>El ACP es supervisado porque usa una variable objetivo</td><td><span class="chip red">F</span></td><td>Es <strong>no supervisado</strong>: solo usa la estructura de covarianza de las predictoras</td></tr>
<tr><td>i</td><td>Los componentes se obtienen de los vectores propios de la matriz de covarianza o correlación</td><td><span class="chip green">V</span></td><td>Es el problema Sv = λv</td></tr>
<tr><td>j</td><td>Reducir dimensionalidad con ACP implica perder <strong>toda</strong> la información</td><td><span class="chip red">F</span></td><td>Solo se pierde la varianza de los componentes descartados, que es la menor por construcción</td></tr>
<tr><td>k</td><td>Si Matemáticas y Física no correlacionan entre sí, no tiene sentido aplicar ACP al conjunto (6 asignaturas)</td><td><span class="chip red">F</span></td><td>El ACP usa <strong>todas</strong> las variables; que un par no correlacione no invalida la estructura global</td></tr>
<tr><td>l</td><td>Si el test de Bartlett no resulta significativo, no se debe aplicar ACP</td><td><span class="chip green">V</span></td><td>Sin correlación global (R ≈ I) los componentes serían básicamente las variables originales: no hay reducción útil</td></tr>
<tr><td>m</td><td>Es preferible la matriz de correlaciones porque así todos los valores propios serán &gt; 1</td><td><span class="chip red">F</span></td><td>Con R los λ suman p, así que necesariamente algunos son &lt; 1. La preferencia se justifica por la comparabilidad de escalas, no por eso</td></tr>
</table>

<h2>14.4 Checklist antes de entregar</h2>
<div class="note tip"><span class="nh">✅ Repasa esto en los últimos 5 minutos</span>
<ul class="tight">
  <li>¿Escribí H₀ <strong>y</strong> H₁ en cada prueba?</li>
  <li>¿Los grados de libertad son los correctos?</li>
  <li>¿Usé α o α/2 según corresponda?</li>
  <li>¿Comparé el estadístico contra el valor crítico <strong>o</strong> el p-valor contra α, y dije explícitamente la decisión?</li>
  <li>¿Escribí una <strong>conclusión en contexto</strong>, mencionando el nivel de significancia y hablando del problema?</li>
  <li>En interpretación de R: ¿cité el <strong>número concreto</strong> de la salida que respalda lo que digo?</li>
  <li>En ACP/AF: ¿nombré el componente/factor y justifiqué con las cargas específicas?</li>
</ul></div>

<div class="src">Fuentes: «Pauta Pregunta 1, 2 y 3 - Prueba 1»; «Ayudantía 3 2026-20 Enunciado» P1; rúbricas de las pautas; temario entregado por el usuario.</div>
`
},

/* ────────────────────────────── MÓDULO 15 ────────────────────────────── */
{
  id: 'm15',
  num: 15,
  title: 'Taller: elegir el test y ubicar los números',
  tag: 'Decisión',
  desc: 'El árbol maestro de decisión, el diccionario enunciado → símbolo, la tabla de grados de libertad y cómo concluir numéricamente en cada caso.',
  html: String.raw`
<div class="note info"><span class="nh">📌 Para qué sirve este módulo</span>
<p>En la prueba, el 80% de los errores no son de cálculo: son de <strong>elegir mal el test</strong> o de <strong>meter el número equivocado en la fórmula</strong>. Este módulo entrena solo eso. No hay teoría nueva: es el mapa que conecta lo que dice el enunciado con lo que hay que escribir.</p></div>

<h2>15.1 Árbol maestro: ¿qué test uso?</h2>

<div class="console"><b>PASO 1 — ¿Qué parámetro me preguntan?</b>

┌─ una <b>MEDIA</b> (μ) ────────── ¿σ conocida?
│                                  ├─ SÍ  → <b>prueba z</b>,  N(0,1)
│                                  └─ NO  → <b>prueba t</b>,  gl = n−1
│
├─ una <b>PROPORCIÓN</b> (p) ───── verificar np₀ ≥ 5 y n(1−p₀) ≥ 5
│                                  → <b>prueba z</b> de proporciones
│
├─ una <b>VARIANZA</b> (σ²) ────── → <b>χ²</b>,  gl = n−1
│
├─ <b>DOS VARIANZAS</b> ────────── → <b>F</b>,  gl = (n₁−1, n₂−1)
│
├─ <b>DOS MEDIAS</b> ──────────── ¿mismas unidades medidas dos veces?
│                                  ├─ SÍ  → <b>t pareada</b>, gl = n−1  (n = nº de PARES)
│                                  └─ NO  → ¿varianzas iguales?
│                                            ├─ SÍ → <b>t pooled</b>, gl = n₁+n₂−2
│                                            └─ NO → <b>t de Welch</b>, gl fórmula (decimal)
│
├─ <b>DOS PROPORCIONES</b> ────── ¿H₀ dice p₁ = p₂?
│                                  ├─ SÍ  → z con p̂ <b>combinada</b> (x₁+x₂)/(n₁+n₂)
│                                  └─ NO  → z <b>sin combinar</b> (cada p̂ᵢq̂ᵢ/nᵢ)
│
├─ <b>UNA CORRELACIÓN</b> (ρ) ─── → t = r√((n−2)/(1−r²)), gl = n−2
│
├─ <b>CORRELACIÓN GLOBAL</b> ──── → <b>Bartlett</b>, gl = p(p−1)/2
│
└─ <b>VECTOR DE MEDIAS</b> ────── → <b>T² de Hotelling</b>, F(p, n−p)</div>

<div class="note tip"><span class="nh">✅ Las tres preguntas que resuelven el 90% de los casos</span>
<ol class="tight">
  <li><strong>¿Cuántas poblaciones?</strong> Una o dos. Si el enunciado da <em>dos</em> tamaños de muestra (n₁ y n₂), son dos.</li>
  <li><strong>¿Qué parámetro?</strong> Si hablan de <em>promedio</em> → μ. De <em>porcentaje / proporción / «X de cada Y»</em> → p. De <em>variabilidad / desviación / varianza</em> → σ².</li>
  <li><strong>¿Los datos vienen emparejados?</strong> «antes y después», «los mismos sujetos», «cada paciente» → <strong>pareada</strong>. Si los dos grupos son personas distintas → independientes.</li>
</ol></div>

<div class="note trap"><span class="nh">🚨 Señales de que son muestras PAREADAS (y no independientes)</span>
<ul class="tight">
  <li>«Se mide a los <strong>mismos</strong> 20 participantes antes y después».</li>
  <li>«Se registra el colesterol de 11 pacientes <strong>antes y después</strong> del tratamiento».</li>
  <li>«Los <strong>mismos</strong> 10 alumnos rindieron Matemáticas y Física» ← este es el de la Pauta Pregunta 3.</li>
  <li>Pista infalible: <strong>n₁ = n₂</strong> y los datos vienen en dos columnas que se corresponden fila a fila.</li>
</ul>
<p>Si son pareadas y aplicas una prueba de dos muestras independientes, <strong>pierdes casi todo el puntaje</strong>: los gl cambian (n−1 en vez de n₁+n₂−2) y el estadístico es completamente distinto.</p></div>

<h2>15.2 Diccionario: del enunciado al símbolo</h2>
<p>Esta es la tabla que hay que tener automatizada. La columna del medio es lo que buscas en el texto.</p>

<table class="tbl">
<tr><th>Símbolo</th><th>Cómo aparece en el enunciado</th><th>Ejemplo real de las pautas</th></tr>
<tr><td><strong>μ₀</strong><br><span class="small muted">valor bajo H₀</span></td>
    <td>El valor de la <em>afirmación</em> que se contrasta: «se sabe que…», «se afirma que…», «la norma exige…», «el objetivo es…»</td>
    <td>«la media del consumo de la ciudad es <strong>721</strong> kWh» → μ₀ = 721</td></tr>
<tr><td><strong>x̄</strong><br><span class="small muted">media muestral</span></td>
    <td>Lo que se <em>observó</em> en la muestra: «se obtuvo un promedio de…», «la muestra arrojó…»</td>
    <td>«promedio <strong>$3.560</strong>/kg» → x̄₂ = 3560</td></tr>
<tr><td><strong>σ</strong> vs <strong>s</strong></td>
    <td><strong>σ</strong> si es un valor <em>poblacional / histórico / de la norma</em>. <strong>s</strong> si viene <em>de la muestra</em>.</td>
    <td>«desviación estándar de <strong>15 ml</strong>» (de la máquina) → σ = 15<br>«(s = <strong>$230</strong>)» (de los 13 puntos de venta) → s₁ = 230</td></tr>
<tr><td><strong>σ₀²</strong></td>
    <td>La varianza de la <em>afirmación</em>. <strong>Si dan la desviación, elévala al cuadrado.</strong></td>
    <td>«la desviación es máximo <strong>2</strong> min» → σ₀² = <strong>4</strong></td></tr>
<tr><td><strong>n</strong></td>
    <td>«una muestra de…», «se seleccionan…», «se prueban… especímenes». En pareadas es el nº de <strong>PARES</strong>.</td>
    <td>«muestra de <strong>24</strong> estudiantes» → n = 24</td></tr>
<tr><td><strong>p₀</strong></td>
    <td>El porcentaje de la afirmación. Ojo con «4 de cada 10» = 0.40 y con «el 15%» = 0.15.</td>
    <td>«<strong>4 de cada 10</strong> estudiantes trabajan» → p₀ = 0.40</td></tr>
<tr><td><strong>p̂</strong></td>
    <td>x/n, con x = «de los cuales…»</td>
    <td>«<strong>43</strong> de 120 trabajan» → p̂ = 43/120 = 0.358</td></tr>
<tr><td><strong>D₀</strong><br><span class="small muted">diferencia bajo H₀</span></td>
    <td>«aumentó en más de…», «supera en…», «mejora en al menos…». <strong>Si no lo mencionan, D₀ = 0.</strong></td>
    <td>«¿aumentó en más de <strong>$1.500</strong>?» → D₀ = 1500<br>«mejora en más de <strong>2</strong> segundos» → D₀ = 2</td></tr>
<tr><td><strong>α</strong></td>
    <td>«nivel de significancia del X%» → α = X/100.<br>«nivel de <strong>confianza</strong> del X%» → α = 1 − X/100.</td>
    <td>«nivel de confianza del <strong>90%</strong>» → α = <strong>0.10</strong></td></tr>
<tr><td><strong>μ<sub>real</sub></strong></td>
    <td>Aparece solo en las preguntas de β: «si en realidad la media verdadera es…»</td>
    <td>«sabiendo que la media poblacional verdadera es <strong>1,005</strong> kg»</td></tr>
</table>

<div class="note memo"><span class="nh">⚠️ Los cuatro números que más se confunden</span>
<ol class="tight">
  <li><strong>μ₀ vs x̄.</strong> μ₀ es lo que <em>alguien afirma</em>; x̄ es lo que <em>midieron</em>. En el numerador del estadístico va (x̄ − μ₀), en ese orden.</li>
  <li><strong>σ vs s.</strong> Determina si usas z o t. Si el enunciado dice «se sabe que la desviación es…» es σ (→ z); si dice «la muestra tuvo una desviación de…» es s (→ t).</li>
  <li><strong>σ vs σ².</strong> El estadístico χ² y el pooled usan <em>varianzas</em>. Casi todos los enunciados dan <em>desviaciones</em>. Eleva al cuadrado.</li>
  <li><strong>Confianza vs significancia.</strong> «90% de confianza» NO es α = 0.90.</li>
</ol></div>

<h2>15.3 Tabla maestra de grados de libertad</h2>
<table class="tbl">
<tr><th>Prueba</th><th>Grados de libertad</th><th>Ejemplo</th></tr>
<tr><td>t, una muestra</td><td><strong>n − 1</strong></td><td>n = 20 → 19</td></tr>
<tr><td>t pareada</td><td><strong>n − 1</strong>, con n = nº de <strong>pares</strong></td><td>11 pacientes → 10</td></tr>
<tr><td>t pooled</td><td><strong>n₁ + n₂ − 2</strong></td><td>10 y 12 → 20</td></tr>
<tr><td>t de Welch</td><td>fórmula de Welch, <strong>suele ser decimal</strong></td><td>13 y 15 → 21.56 ≈ 22</td></tr>
<tr><td>χ², una varianza</td><td><strong>n − 1</strong></td><td>n = 12 → 11</td></tr>
<tr><td>F, dos varianzas</td><td><strong>(n₁ − 1, n₂ − 1)</strong></td><td>23 y 28 → (22, 27)</td></tr>
<tr><td>t de correlación</td><td><strong>n − 2</strong></td><td>n = 10 → 8</td></tr>
<tr><td>Bartlett</td><td><strong>p(p − 1)/2</strong>, con p = nº de variables</td><td>p = 4 → 6 · p = 6 → 15</td></tr>
<tr><td>T² de Hotelling</td><td>F con <strong>(p, n − p)</strong></td><td>p = 3, n = 28 → (3, 25)</td></tr>
<tr><td>z (cualquiera)</td><td><strong>no tiene gl</strong></td><td>—</td></tr>
</table>
<div class="note trap"><span class="nh">🚨 La trampa de los gl</span>
<p>Bartlett usa <strong>p</strong> (variables), no <strong>n</strong> (observaciones), para los gl — aunque n sí entra en el estadístico. Y la prueba de correlación usa <strong>n − 2</strong>, no n − 1. Son los dos que más se fallan.</p></div>

<h2>15.4 Cómo concluir numéricamente</h2>
<p>Hay tres caminos y <strong>siempre dan la misma respuesta</strong>. Elige el que te permita el enunciado.</p>

<table class="tbl">
<tr><th>Camino</th><th>Se rechaza H₀ si…</th><th>Cuándo usarlo</th></tr>
<tr><td><strong>① p-valor</strong></td><td><strong>p ≤ α</strong></td><td>Si te dan una salida de R o el p-valor directamente</td></tr>
<tr><td><strong>② Valor crítico</strong></td><td>unilateral der.: <strong>estadístico &gt; crítico</strong><br>unilateral izq.: estadístico &lt; −crítico<br>bilateral: <strong>|estadístico| &gt; crítico(α/2)</strong></td><td>Si te dan una tabla o te piden «región de rechazo»</td></tr>
<tr><td><strong>③ Intervalo de confianza</strong></td><td>el IC <strong>NO contiene</strong> el valor bajo H₀</td><td>Si la salida de R muestra el IC</td></tr>
</table>

<div class="note memo"><span class="nh">⚠️ ¿Qué valor debe contener el IC en cada caso?</span>
<table class="tbl">
<tr><th>Prueba</th><th>El IC es de…</th><th>Valor de referencia</th></tr>
<tr><td><code>t.test(x, mu = 10)</code></td><td>la media μ</td><td><strong>10</strong> (el μ₀)</td></tr>
<tr><td><code>t.test(A, B)</code></td><td>la diferencia μ_A − μ_B</td><td><strong>0</strong></td></tr>
<tr><td><code>t.test(A, B, mu = 1500)</code></td><td>la diferencia</td><td><strong>1500</strong> (el D₀)</td></tr>
<tr><td><code>var.test(A, B)</code></td><td>la <strong>razón</strong> σ₁²/σ₂²</td><td><strong>1</strong> ← no 0</td></tr>
<tr><td><code>cor.test(x, y)</code></td><td>la correlación ρ</td><td><strong>0</strong></td></tr>
</table>
<p>El error clásico: buscar el 0 en la salida de <code class="inl">var.test</code>. Como es un cociente, el valor «sin efecto» es <strong>1</strong>.</p></div>

<h4>Casos límite y signos</h4>
<ul class="tight">
  <li><strong>p exactamente igual a α:</strong> se rechaza (la regla es p ≤ α). Con p = 0.0517 y α = 0.05, <strong>no</strong> se rechaza.</li>
  <li><strong>Estadístico negativo en prueba de cola derecha:</strong> jamás se rechaza. Si H₁ es «&gt;» y obtienes t = −0.75, la respuesta es directa: no se rechaza (p &gt; 0.5).</li>
  <li><strong>Prueba bilateral:</strong> se compara el <strong>valor absoluto</strong> contra el crítico de α/2.</li>
  <li><strong>χ² y F son siempre positivos:</strong> si te sale negativo, hay un error de cálculo.</li>
</ul>

<h2>15.5 Casos resueltos de identificación</h2>

<details class="acc" open><summary>Caso 1 — «Se sabe que la media del consumo es 721 kWh. La junta cree que su barrio consume más. Muestra de 20 hogares. α = 5%.»</summary><div>
<table class="tbl">
<tr><th>Pregunta</th><th>Respuesta</th></tr>
<tr><td>¿Una o dos poblaciones?</td><td>Una (solo un n)</td></tr>
<tr><td>¿Qué parámetro?</td><td>μ («consumo promedio»)</td></tr>
<tr><td>¿σ conocida?</td><td>No se menciona ⟹ <strong>t</strong></td></tr>
<tr><td>μ₀</td><td><strong>721</strong></td></tr>
<tr><td>n / gl</td><td>20 / <strong>19</strong></td></tr>
<tr><td>H₁</td><td>μ &gt; 721 (unilateral derecha, porque dice «más»)</td></tr>
<tr><td>Valor crítico</td><td>t(0.05, 19) = <strong>1.73</strong></td></tr>
<tr><td>R</td><td><code>t.test(x, mu = 721, alternative = "greater")</code></td></tr>
</table>
</div></details>

<details class="acc"><summary>Caso 2 — «Los mismos 10 alumnos rindieron Matemáticas y Física. Los directivos dicen que Física supera a Matemáticas en más de 0,5 puntos. Confianza 90%.»</summary><div>
<table class="tbl">
<tr><th>Pregunta</th><th>Respuesta</th></tr>
<tr><td>¿Independientes o pareadas?</td><td><strong>PAREADAS</strong> — son los mismos alumnos</td></tr>
<tr><td>D₀</td><td><strong>0.5</strong></td></tr>
<tr><td>α</td><td>1 − 0.90 = <strong>0.10</strong></td></tr>
<tr><td>gl</td><td>n − 1 = <strong>9</strong> (10 pares)</td></tr>
<tr><td>H₀ / H₁</td><td>H₀: μ_fis − μ_mat ≤ 0.5 &nbsp;vs&nbsp; H₁: &gt; 0.5</td></tr>
<tr><td>Código correcto</td><td><code>t.test(fisica - 0.5, matematicas, paired = TRUE, alternative = "greater")</code></td></tr>
<tr><td>Salida real</td><td>t = <strong>1.7281</strong>, df = 9, p-value = <strong>0.05902</strong></td></tr>
<tr><td>Decisión</td><td>0.05902 &lt; 0.10 ⟹ <strong>se rechaza H₀</strong>: la afirmación es válida</td></tr>
</table>
<p class="small muted">Este es el inciso (g) de la Pauta Pregunta 3. Nota que restar 0.5 a una serie es lo que traslada D₀ a cero. La rúbrica daba 0.2 pts solo por elegir el código correcto de R.</p>
</div></details>

<details class="acc"><summary>Caso 3 — «Una empresa afirma que como máximo el 15% de sus parabrisas no cumple. Muestra de 200, se observan 40 defectuosos. α = 5%.»</summary><div>
<table class="tbl">
<tr><th>Pregunta</th><th>Respuesta</th></tr>
<tr><td>Parámetro</td><td>p (proporción)</td></tr>
<tr><td>p₀</td><td><strong>0.15</strong></td></tr>
<tr><td>p̂</td><td>40/200 = <strong>0.20</strong></td></tr>
<tr><td>H₀ / H₁</td><td>H₀: p ≤ 0.15 &nbsp;vs&nbsp; H₁: p &gt; 0.15<br><span class="small muted">La afirmación de la empresa va en H₀ porque contiene la igualdad; se busca evidencia en su contra.</span></td></tr>
<tr><td>Requisito</td><td>200(0.15) = 30 ≥ 5 ✓ &nbsp;·&nbsp; 200(0.85) = 170 ≥ 5 ✓</td></tr>
<tr><td>Estadístico</td><td>Z = (0.20 − 0.15)/√(0.15·0.85/200) = 0.05/0.02525 = <strong>1.98</strong></td></tr>
<tr><td>Crítico</td><td>z<sub>0.05</sub> = <strong>1.645</strong> ⟹ 1.98 &gt; 1.645 ⟹ <strong>se rechaza H₀</strong></td></tr>
<tr><td>R</td><td><code>prop.test(40, 200, 0.15, "greater", correct = FALSE)</code></td></tr>
</table>
<p class="small muted">Ojo: el error estándar usa <strong>p₀ = 0.15</strong>, no p̂ = 0.20. Bajo H₀ la proporción vale p₀.</p>
</div></details>

<details class="acc"><summary>Caso 4 — «Se comparan dos aleaciones, 30 especímenes de cada una. ¿La media de A es mayor que la de B?»</summary><div>
<table class="tbl">
<tr><th>Pregunta</th><th>Respuesta</th></tr>
<tr><td>¿Pareadas?</td><td>No: son especímenes <strong>distintos</strong>, aunque n₁ = n₂ = 30</td></tr>
<tr><td>Paso previo</td><td><code>var.test(A, B)</code> para decidir pooled vs Welch</td></tr>
<tr><td>D₀</td><td><strong>0</strong> (no se menciona una diferencia concreta)</td></tr>
<tr><td>H₁</td><td>μ_A &gt; μ_B, o equivalentemente μ_A − μ_B &gt; 0</td></tr>
<tr><td>R</td><td><code>t.test(A, B, alternative = "greater", var.equal = FALSE)</code></td></tr>
</table>
<div class="note trap"><span class="nh">🚨 n₁ = n₂ NO significa pareadas</span>
<p>Que ambos grupos tengan el mismo tamaño es una coincidencia. Lo que define «pareadas» es que cada observación de un grupo esté <strong>vinculada</strong> a una del otro (mismo sujeto, mismo objeto). 30 especímenes de aleación A y 30 de aleación B son 60 objetos distintos.</p></div>
</div></details>

<details class="acc"><summary>Caso 5 — «Máquina con media 200 ml y desviación 15 ml. Muestra de 9. Si x̄ ∈ (191, 209) opera bien. ¿Probabilidad de error tipo II si μ = 215?»</summary><div>
<table class="tbl">
<tr><th>Pregunta</th><th>Respuesta</th></tr>
<tr><td>¿Me piden α o β?</td><td><strong>β</strong> — «error tipo II», y dan una media verdadera distinta de μ₀</td></tr>
<tr><td>¿En qué media me centro?</td><td><strong>215</strong> (μ<sub>real</sub>), NO en 200</td></tr>
<tr><td>Error estándar</td><td>σ/√n = 15/√9 = <strong>5</strong></td></tr>
<tr><td>Zona de NO rechazo</td><td>Ya viene dada: (191, 209). No hay que calcularla.</td></tr>
<tr><td>Cálculo</td><td>β = P(191 &lt; x̄ &lt; 209 | μ=215) = P(−4.8 &lt; Z &lt; −1.2) = <strong>0.1151</strong></td></tr>
<tr><td>Potencia</td><td>1 − 0.1151 = <strong>0.8849</strong></td></tr>
</table>
</div></details>

<details class="acc"><summary>Caso 6 — Salida de R sin enunciado: «F = 8.924, num df = 11, denom df = 9, p-value = 0.001388»</summary><div>
<table class="tbl">
<tr><th>Deduzco…</th><th>De…</th></tr>
<tr><td>Es una prueba <strong>F de dos varianzas</strong></td><td>El estadístico se llama F y hay dos gl</td></tr>
<tr><td>n₁ = <strong>12</strong>, n₂ = <strong>10</strong></td><td>gl = (n₁−1, n₂−1) = (11, 9)</td></tr>
<tr><td>La varianza del grupo 1 es ~8.9× la del 2</td><td>F = s₁²/s₂² = 8.924</td></tr>
<tr><td>Se <strong>rechaza</strong> H₀: σ₁² = σ₂²</td><td>p = 0.0014 &lt; 0.05</td></tr>
<tr><td>Para las medias hay que usar <strong>Welch</strong></td><td>Las varianzas resultaron distintas</td></tr>
</table>
<p class="small muted">Los grados de libertad son la huella dactilar del test: te dicen el tamaño de muestra y qué prueba se corrió.</p>
</div></details>

<h2>15.6 Chuleta final de 30 segundos</h2>
<div class="note tip"><span class="nh">✅ Antes de escribir cualquier fórmula, responde esto</span>
<ol class="tight">
  <li>¿Una o dos poblaciones? &nbsp;→ cuenta cuántos <strong>n</strong> hay.</li>
  <li>¿μ, p o σ²? &nbsp;→ busca «promedio», «porcentaje», «variabilidad».</li>
  <li>¿σ conocida? &nbsp;→ decide z o t.</li>
  <li>¿Pareadas? &nbsp;→ busca «los mismos», «antes/después».</li>
  <li>¿D₀ o μ₀? &nbsp;→ el número de la afirmación. Si no lo dan, es 0.</li>
  <li>¿α? &nbsp;→ ojo si dieron confianza.</li>
  <li>¿Uni o bilateral? &nbsp;→ «mayor/menor» = unilateral; «distinto/igual a» = bilateral.</li>
  <li>¿gl? &nbsp;→ tabla de 15.3.</li>
  <li>¿Con qué comparo? &nbsp;→ p vs α, o |estadístico| vs crítico.</li>
  <li>Conclusión en contexto, mencionando α.</li>
</ol></div>

<div class="src">Fuentes: síntesis de PPT «2. Pruebas de Hipótesis» (tablas resumen de una y dos poblaciones, diap. 21, 37, 43); anexos de «Pauta Pregunta 3 - Prueba 1»; «Ayudantía 2 y 3 2026-20»; «Ejercicios preparación - Prueba 1».</div>
`
}

);
