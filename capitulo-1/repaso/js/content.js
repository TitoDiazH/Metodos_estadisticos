/* ============================================================================
   content.js — Módulos de estudio (parte A):
   Fundamentos multivariados + Pruebas de hipótesis
   Fuente principal: PPT del curso, pautas de pruebas y ayudantías.
   ========================================================================== */

window.MODULES = [

/* ────────────────────────────── MÓDULO 1 ────────────────────────────── */
{
  id: 'm1',
  num: 1,
  title: 'Covarianza, correlación y sus matrices',
  tag: 'Capítulo 1',
  desc: 'El primer paso del análisis multivariado: cómo se relacionan dos variables y cómo se resume eso en matrices Σ y R.',
  html: String.raw`
<h2>1.1 ¿Por qué empezamos aquí?</h2>
<p>El curso trata de datos con <strong>varias variables interrelacionadas</strong>. Antes de reducir dimensión (ACP, AF), agrupar (clustering) o clasificar, hay que responder algo básico: <em>cuando una variable sube, ¿qué suele pasar con la otra?</em> Hay tres respuestas posibles: sube, baja, o no hay patrón claro. Eso es covarianza, correlación y gráfico de dispersión.</p>
<div class="src">Fuente: PPT «1. Correlación», diapositivas 6–7.</div>

<h2>1.2 Covarianza</h2>

<div class="blk simple"><div class="blk-h">🧠 En simple</div>
<p>La covarianza mide <strong>cómo se mueven dos variables juntas</strong>. Positiva: tienden a subir o bajar al mismo tiempo. Negativa: cuando una sube, la otra tiende a bajar. Cercana a cero: no se observa relación lineal clara.</p></div>

<div class="blk deep"><div class="blk-h">📖 En profundidad</div>
<div class="tex">$$\begin{aligned}
\operatorname{Cov}(X,Y)=S_{xy}&=\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})
   && \text{(muestral)}\\[6pt]
\operatorname{Cov}(X,Y)&=E\big[(X-\mu_x)(Y-\mu_y)\big]=E[XY]-E[X]\,E[Y]
   && \text{(poblacional)}
\end{aligned}$$</div>
<p>Interpretación de la fórmula: cada término <code class="inl">(xᵢ−x̄)(yᵢ−ȳ)</code> es positivo cuando <strong>ambas</strong> observaciones están del mismo lado de su media, y negativo cuando están en lados opuestos. La covarianza es el promedio de esos productos.</p>
<p>Propiedad clave: la <strong>varianza es un caso particular de covarianza</strong>: Var(X) = Cov(X,X).</p></div>

<div class="note trap"><span class="nh">🚨 El problema de la covarianza</span>
<p>Su <strong>magnitud depende de las unidades de medida</strong>. Si mides la altura en cm en vez de m, la covarianza cambia de valor sin que la relación haya cambiado. Por eso al comienzo <em>el signo importa más que la magnitud</em>, y por eso existe la correlación.</p></div>

<h2>1.3 Coeficiente de correlación de Pearson</h2>

<div class="blk simple"><div class="blk-h">🧠 En simple</div>
<p>La correlación es la <strong>versión estandarizada</strong> de la covarianza: se le quitan las unidades dividiendo por las desviaciones estándar. Queda un número entre −1 y 1 que sí se puede comparar entre pares de variables medidas en escalas distintas.</p></div>

<div class="tex">$$r_{xy}=\frac{\operatorname{Cov}(X,Y)}{s_x\,s_y}
       =\frac{\operatorname{Cov}(X,Y)}{\sqrt{\operatorname{Var}(X)\cdot\operatorname{Var}(Y)}}$$</div>

<h4>Propiedades de r (memorizar)</h4>
<ul class="tight">
  <li>Es <strong>adimensional</strong> (no tiene unidades).</li>
  <li><strong>−1 ≤ r ≤ 1</strong>. Una relación lineal perfecta da exactamente ±1.</li>
  <li>El <strong>signo</strong> indica la dirección; |r| grande indica relación lineal más fuerte.</li>
  <li><strong>r = 0 no implica independencia</strong> en general (sí bajo normalidad conjunta).</li>
  <li>Una correlación alta <strong>no prueba causalidad</strong>.</li>
</ul>

<div class="blk ex"><div class="blk-h">💡 Ejemplo resuelto (Pauta Pregunta 3, Prueba 1)</div>
<p>Con Cov(mat, física) = 0.047, Var(mat) = 1.162 y Var(física) = 0.302:</p>
<div class="tex">$$r=\frac{0.047}{\sqrt{1.162\times 0.302}}
   =\frac{0.047}{\sqrt{0.3509}}=\frac{0.047}{0.5924}=\mathbf{0.0793}$$</div>
<p>Correlación prácticamente nula: las notas de matemáticas y física de esa muestra no tienen relación lineal apreciable.</p>
<div class="src">Fuente: «Pauta Pregunta 3 - Prueba 1».</div></div>

<h2>1.4 Test de significancia de una correlación</h2>
<p>Que r sea distinto de cero en la muestra no significa que ρ sea distinto de cero en la población. Se contrasta con el estadístico t:</p>

<div class="tex">$$\begin{gathered}
H_0:\ \rho=0 \qquad\text{vs}\qquad H_1:\ \rho\neq 0\\[8pt]
\mathbf{t=r\sqrt{\dfrac{n-2}{1-r^{2}}}}\ \sim\ t_{\,n-2}
\end{gathered}$$</div>

<p>Se rechaza H₀ si |t<sub>obs</sub>| &gt; t<sub>α/2, n−2</sub>. En R lo hace directamente <code class="inl">cor.test(x, y, method = "pearson")</code>, que devuelve el coeficiente, un intervalo de confianza y el p-valor para H₀: ρ = 0.</p>

<div class="note info"><span class="nh">📌 Efecto del tamaño de muestra (Ayudantía 1, P2)</span>
<p>Con r₂₃ = 1/√(9·25) = 0.0667 y <strong>n = 100</strong> el estadístico no alcanza el valor crítico → no se rechaza H₀ → no hay evidencia de correlación. Con <strong>n = 1000</strong>, el mismo r sí resulta significativo. <em>Una correlación pequeña puede volverse "estadísticamente significativa" solo por aumentar n</em> — significancia estadística ≠ relevancia práctica.</p>
<div class="src">Fuente: «Ayudantía 1 2026-20 Enunciado», P2 y su pauta en R.</div></div>

<h2>1.5 Matriz de covarianza Σ y matriz de correlación R</h2>
<p>Con p variables ya no basta un número: se resumen todas las relaciones lineales en una matriz.</p>

<div class="tex">$$\begin{gathered}
\Sigma=\operatorname{Cov}(X),\qquad \Sigma_{jk}=\operatorname{Cov}(X_j,X_k)\\[10pt]
\Sigma=\begin{pmatrix}
\sigma_1^{2}&\sigma_{12}&\sigma_{13}\\
\sigma_{12}&\sigma_2^{2}&\sigma_{23}\\
\sigma_{13}&\sigma_{23}&\sigma_3^{2}
\end{pmatrix}
\qquad
R=\begin{pmatrix}
1&r_{12}&r_{13}\\
r_{12}&1&r_{23}\\
r_{13}&r_{23}&1
\end{pmatrix}
\end{gathered}$$</div>

<ul class="tight">
  <li>La <strong>diagonal de Σ</strong> son las <strong>varianzas</strong>; fuera de la diagonal, las covarianzas.</li>
  <li>La <strong>diagonal de R</strong> es siempre <strong>1</strong>; fuera de la diagonal, correlaciones entre −1 y 1.</li>
  <li>Ambas son <strong>simétricas</strong>.</li>
</ul>

<h4>Condiciones para que una matriz sea válida como matriz de covarianza / correlación</h4>
<table class="tbl">
<tr><th>Condición</th><th>Matriz de covarianza Σ</th><th>Matriz de correlación R</th></tr>
<tr><td>Cuadrada y simétrica</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Diagonal</td><td>Varianzas ≥ 0</td><td>Todos los elementos = <strong>1</strong></td></tr>
<tr><td>Fuera de la diagonal</td><td>Cualquier real (compatible)</td><td>Entre <strong>−1 y 1</strong></td></tr>
<tr><td>Valores propios (autovalores)</td><td colspan="2">Todos <strong>≥ 0</strong> → semidefinida positiva</td></tr>
</table>

<div class="note memo"><span class="nh">⚠️ Memoriza este criterio</span>
<p>Una matriz simétrica es <strong>semidefinida positiva</strong> ⟺ todos sus valores propios son ≥ 0 ⟺ z′Σz ≥ 0 para todo z. Es <strong>definida positiva</strong> si z′Σz &gt; 0 para todo z ≠ 0 (todos los λ &gt; 0). Para el caso 2×2 basta con: σ₁² &gt; 0 y det(Σ) = σ₁²σ₂² − σ₁₂² &gt; 0.</p></div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo: forma cuadrática (Ayudantía 1, P4)</div>
<p>Con Σ = [[4,1],[1,3]] y z = (z₁, z₂)′:</p>
<div class="tex">$$\begin{aligned}
Q=z'\Sigma z&=4z_1^{2}+2z_1z_2+3z_2^{2}\\
&=4\Big(z_1+\tfrac{z_2}{4}\Big)^{2}+\Big(3-\tfrac{1}{4}\Big)z_2^{2}\\
&=4\,(z_1+0.25\,z_2)^{2}+2.75\,z_2^{2}\;\gt \;0
   \qquad \text{para todo } z\neq 0
\end{aligned}$$</div>
<p>Como es suma de cuadrados con coeficientes positivos, Q &gt; 0 salvo que z₁ = z₂ = 0 ⟹ <strong>Σ es definida positiva</strong>. Alternativa rápida: det(Σ) = 4·3 − 1² = 11 &gt; 0 y σ₁² = 4 &gt; 0.</p></div>

<h2>1.6 Test de esfericidad de Bartlett</h2>

<div class="blk simple"><div class="blk-h">🧠 En simple</div>
<p>Es el <strong>chequeo previo</strong> antes de aplicar ACP o análisis factorial. Pregunta: «¿hay algo de correlación global aprovechable entre estas variables, o cada una va por su lado?». Si no hay correlación, técnicas como el ACP aportan poco.</p></div>

<div class="tex">$$\begin{gathered}
H_0:\ R=I_p \qquad\qquad H_1:\ R\neq I_p\\[10pt]
\mathbf{\chi^{2}_{\text{Bartlett}}=-\Big(n-1-\dfrac{2p+5}{6}\Big)\ln|R|}\\[8pt]
\text{gl}=\frac{p(p-1)}{2}
\end{gathered}$$</div>

<p>Donde <strong>|R|</strong> es el determinante de la matriz de correlaciones, <strong>n</strong> el número de observaciones y <strong>p</strong> el número de variables.</p>

<div class="note tip"><span class="nh">✅ Cómo decidir</span>
<p>Si <strong>p-valor &lt; α</strong> (o χ²<sub>obs</sub> &gt; χ²<sub>crít</sub>) → se <strong>rechaza H₀</strong> → la matriz NO es la identidad → <strong>sí hay correlaciones útiles</strong> → tiene sentido aplicar ACP / AF. <em>Aquí queremos rechazar H₀.</em></p></div>

<p>Intuición del determinante: si R = I, entonces |R| = 1 y ln(1) = 0, así que el estadístico vale 0. Mientras más correlacionadas están las variables, más cerca de 0 queda |R|, más negativo es ln|R| y más grande el χ².</p>

<pre class="r"># Test de Bartlett con el paquete psych
install.packages("psych")
library(psych)
R &lt;- cor(datos)
res &lt;- cortest.bartlett(R, n = nrow(datos))
res   # devuelve chisq, p.value y df

# Cálculo manual (como se pide en la Ayudantía 1)
n  &lt;- 10; p &lt;- 3
df &lt;- p*(p-1)/2
bart &lt;- -(n - 1 - (2*p + 5)/6) * log(det(Rmat))
bart
qchisq(0.95, df)     # valor crítico</pre>

<div class="note trap"><span class="nh">🚨 Trampa clásica de prueba</span>
<p>«Si el test de Bartlett <strong>no</strong> resulta significativo, entonces no se debe aplicar ACP». Esto es <strong>verdadero como recomendación práctica</strong>: sin correlaciones, los componentes serían prácticamente las mismas variables originales y el ACP no reduce nada. Pero cuidado con la versión mal formulada: «si <em>dos</em> variables (Mat y Física) no están correlacionadas entre sí, no tiene sentido hacer ACP» — eso es <strong>falso</strong>, porque el ACP usa <em>todas</em> las variables; que un par no correlacione no invalida el análisis del conjunto.</p>
<div class="src">Fuente: «Ayudantía 3 2026-20 Enunciado», P1 incisos k) y l).</div></div>

<h2>1.7 Correlación y regresión lineal simple</h2>
<p>Cuando existe relación lineal entre dos variables, se puede representar con una recta de regresión. La correlación mide <strong>qué tan fuerte</strong> es esa relación lineal. Están relacionadas, pero <strong>no son lo mismo</strong>: la regresión estima una recta de predicción (pendiente e intercepto, con unidades), la correlación resume la fuerza de la asociación (adimensional).</p>

<div class="blk check"><div class="blk-h">❓ Comprueba</div>
<p>Antes de calcular r, ¿qué conviene mirar? → El <strong>gráfico de dispersión</strong>: dirección de la nube, qué tan alineados están los puntos y presencia de outliers. Un solo outlier puede inflar o destruir r.</p></div>

<pre class="r"># Correlación con test de significancia
x &lt;- c(161, 170, 180, 175, 165, 187)
y &lt;- c(50, 65, 78, 82, 60, 76)
cor.test(x, y, method = "pearson")
# devuelve: r, intervalo de confianza y p-valor para H0: rho = 0

# Matrices completas
S &lt;- cov(datos)      # matriz de covarianza (usa n-1)
R &lt;- cor(datos)      # matriz de correlación
eigen(S)             # valores y vectores propios → conecta con ACP</pre>

<div class="src">Fuentes de este módulo: PPT «1. Correlación» (diap. 9–31); «Ayudantía 1 2026-20 Enunciado» y su pauta en R; «Pauta Pregunta 1 y 3 - Prueba 1».</div>
`
},

/* ────────────────────────────── MÓDULO 2 ────────────────────────────── */
{
  id: 'm2',
  num: 2,
  title: 'Escalamiento, distancias y similitud',
  tag: 'Capítulo 1',
  desc: 'Estandarizar, normalizar, escalamiento robusto, L2; distancia euclídea vs Manhattan; similitud coseno.',
  html: String.raw`
<h2>2.1 ¿Por qué escalar?</h2>
<p>Antes de aplicar muchos métodos multivariados conviene poner las variables en escalas comparables, sobre todo si están en unidades distintas. Si no, <strong>una variable con valores grandes domina el análisis</strong> solo por su magnitud (ej.: gasto en pesos vs. frecuencia de compra en veces/mes).</p>

<div class="note memo"><span class="nh">⚠️ Cuándo escalar</span>
<p>Cuando (a) las variables están en <strong>unidades distintas</strong>, (b) vas a usar <strong>distancias</strong>, (c) vas a aplicar <strong>ACP o clustering</strong>.</p></div>

<h2>2.2 Los SEIS métodos del curso</h2>

<table class="tbl">
<tr><th>Método</th><th>Fórmula</th><th>Resultado</th><th>Cuándo usarlo</th></tr>
<tr>
  <td><strong>Estandarización</strong> (z-score)</td>
  <td>z<sub>i</sub> = (x<sub>i</sub> − x̄) / σ</td>
  <td>media <strong>0</strong>, desviación estándar <strong>1</strong></td>
  <td>Por defecto. Previo a ACP / AF / clustering.</td>
</tr>
<tr>
  <td><strong>Normalización</strong> min-máx</td>
  <td>w<sub>i</sub> = (x<sub>i</sub> − x<sub>mín</sub>) / (x<sub>máx</sub> − x<sub>mín</sub>)</td>
  <td>rango <strong>[0, 1]</strong></td>
  <td>Cuando interesa comparar magnitudes relativas.</td>
</tr>
<tr>
  <td><strong>Escalamiento robusto</strong></td>
  <td>w<sub>i</sub> = (x<sub>i</sub> − Mediana(x)) / IQR(x)<br><span class="small muted">con IQR = Q₃ − Q₁</span></td>
  <td>centrado en la mediana</td>
  <td>Cuando hay <strong>outliers</strong> (menos sensible).</td>
</tr>
<tr>
  <td><strong>Normalización L2</strong></td>
  <td>w<sub>i</sub> = x<sub>i</sub> / ‖x‖ = x<sub>i</sub> / √(Σx<sub>j</sub>²)</td>
  <td>vector de norma 1</td>
  <td>Cuando importa la <strong>dirección</strong> más que la magnitud.</td>
</tr>
<tr>
  <td><strong>Escalamiento por cuantiles</strong></td>
  <td>w<sub>i</sub> = <b>i / n</b><br><span class="small muted">i = posición del dato al ordenar de menor a mayor<br>n = nº total de observaciones</span></td>
  <td>cada dato queda reemplazado por su <strong>cuantil</strong></td>
  <td>Cuando solo importa el <strong>orden</strong> (rango), no la magnitud. Inmune a outliers.</td>
</tr>
<tr>
  <td><strong>Softmax</strong></td>
  <td>w<sub>i</sub> = e<sup>x<sub>i</sub></sup> / Σ<sub>j=1</sub><sup>n</sup> e<sup>x<sub>j</sub></sup></td>
  <td><strong>Σ w<sub>i</sub> = 1</strong></td>
  <td>Cuando se quieren convertir los valores en <strong>pesos o probabilidades</strong>.</td>
</tr>
</table>

<div class="note memo"><span class="nh">⚠️ Los dos que se olvidan</span>
<p><strong>Cuantiles</strong> y <strong>Softmax</strong> están en la lámina «OTROS MÉTODOS» del PPT y casi nadie los repasa. Lo distintivo de cada uno:</p>
<ul class="tight">
  <li><strong>Cuantiles:</strong> solo conserva el <em>orden</em>. Si ordenas [5, 7, 8, 10] el dato 8 está en posición i = 3 de n = 4 ⟹ w = 3/4 = <strong>0.75</strong>.</li>
  <li><strong>Softmax:</strong> es el único cuyos valores <strong>suman exactamente 1</strong>. Por eso se usa para transformar en pesos/probabilidades.</li>
</ul></div>

<div class="note trap"><span class="nh">🚨 Qué produce cada método (tabla de decisión)</span>
<table class="tbl">
<tr><th>Si el resultado debe…</th><th>El método es…</th></tr>
<tr><td>tener media 0 y sd 1</td><td>Estandarización (z-score)</td></tr>
<tr><td>quedar en el rango [0, 1]</td><td>Min-máx</td></tr>
<tr><td>sumar 1 en total</td><td><strong>Softmax</strong></td></tr>
<tr><td>tener norma (longitud) 1</td><td><strong>L2</strong></td></tr>
<tr><td>resistir outliers</td><td>Robusto o cuantiles</td></tr>
<tr><td>depender solo del orden</td><td><strong>Cuantiles</strong></td></tr>
</table>
<p class="small muted">Ojo: Softmax y L2 se confunden. <strong>Softmax</strong> hace que los valores <em>sumen</em> 1; <strong>L2</strong> hace que la <em>norma</em> (raíz de la suma de cuadrados) sea 1. Y min-máx acota al rango [0,1], que tampoco es lo mismo que sumar 1.</p></div>

<div class="note trap"><span class="nh">🚨 Pregunta V/F que ya cayó</span>
<p>«Con la normalización min-máx la variable normalizada tiene media 0 y varianza 1» → <strong>FALSO</strong>. La transformación que da media 0 y varianza 1 es la <strong>estandarización</strong>. La min-máx lleva la variable al intervalo [0,1], así que la media no puede ser 0 (salvo caso degenerado) ni la desviación 1.</p>
<div class="src">Fuente: «Pauta Pregunta 1 - Prueba 1», afirmación 5.</div></div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo resuelto: escalamiento robusto (Pauta P3, Prueba 1)</div>
<p>Notas de física: mediana = 5.55, Q₁ = 5.325, Q₃ = 5.850 → IQR = 0.525. Un alumno con 5.7:</p>
<div class="tex">$$w=\frac{5.7-5.55}{0.525}=\frac{0.15}{0.525}=\mathbf{0.287}$$</div></div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo: transformación inversa de min-máx (Pauta Prueba 2)</div>
<p>Si y = (x − mín)/(máx − mín), entonces <strong>x = y(máx − mín) + mín</strong>. Con presión entre 100 y 200: x = 100y + 100. Un centroide en y = 0.2 corresponde a 120 mmHg. Con glucosa entre 50 y 150: x = 100y + 50; y = 0.6 → 110 mg/dL.</p>
<div class="src">Fuente: «PAUTA P1 y P2 PRUEBA 2», Pregunta 1(d).</div></div>

<pre class="r"><span class="c"># Estandarización (z-score)</span>
z &lt;- (x - mean(x)) / sd(x)
z &lt;- scale(x)                <span class="c"># R lo hace automáticamente</span>
datos_std &lt;- scale(df)        <span class="c"># sobre un data.frame completo</span>

<span class="c"># Normalización min-máx a [0,1]</span>
w &lt;- (x - min(x)) / (max(x) - min(x))

<span class="c"># Escalamiento robusto (mediana e IQR)</span>
w &lt;- (x - median(x)) / IQR(x)

<span class="c"># Normalización L2 (la NORMA del vector queda en 1)</span>
w &lt;- x / sqrt(sum(x^2))

<span class="c"># Escalamiento por cuantiles (w = i/n, según el orden)</span>
w &lt;- rank(x) / length(x)

<span class="c"># Softmax (los pesos SUMAN 1)</span>
w &lt;- exp(x) / sum(exp(x))
sum(w)                        <span class="c"># == 1</span></pre>

<h2>2.3 Distancias entre observaciones</h2>
<p>Muchas técnicas multivariadas se basan en medir distancias o similitudes entre observaciones, para identificar patrones o agrupamientos. <strong>Si las variables tienen escalas distintas, primero estandariza.</strong></p>

<div class="tex">$$\begin{aligned}
\textbf{Euclídea:}&\quad & d(A,B)&=\sqrt{\textstyle\sum_j (a_j-b_j)^{2}}
   &&\text{línea recta}\\[4pt]
\textbf{Manhattan:}&& d(A,B)&=\textstyle\sum_j |a_j-b_j|
   &&\text{suma de diferencias absolutas}\\[4pt]
\textbf{Mahalanobis:}&& d^{2}(x,\mu)&=(x-\mu)'\,\Sigma^{-1}(x-\mu)
   &&\text{corrige escala y correlación}
\end{aligned}$$</div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo numérico</div>
<p>A = (2,3), B = (6,8): euclídea = √(4² + 5²) = √41 ≈ <strong>6.40</strong>; Manhattan = |4| + |5| = <strong>9</strong>. La Manhattan siempre es ≥ la euclídea.</p></div>

<pre class="r">A &lt;- c(2,3); B &lt;- c(6,8)
dist(rbind(A,B), method = "euclidean")   <span class="c"># 6.403124</span>
dist(rbind(A,B), method = "manhattan")   <span class="c"># 9</span></pre>

<h2>2.4 Similitud coseno</h2>
<p>La similitud compara <strong>dirección o patrón</strong>, no solo distancia: dos vectores pueden tener magnitudes muy distintas y aun así apuntar en una dirección parecida.</p>

<div class="tex">$$\begin{gathered}
\textbf{Producto punto:}\quad A\cdot B=\sum_i a_ib_i=\lVert A\rVert\,\lVert B\rVert\cos\theta\\[8pt]
\textbf{Similitud coseno:}\quad \cos\theta=\frac{A\cdot B}{\lVert A\rVert\,\lVert B\rVert}
\end{gathered}$$</div>

<div class="note info"><span class="nh">📌 Relación con varianza y correlación (lámina del PPT)</span>
<p>Si X e Y son dos vectores <strong>centrados</strong>:</p>
<div class="tex">$$X\cdot Y=n\,\operatorname{cov}(X,Y)
\qquad\qquad
\cos(X,Y)=\operatorname{corr}(X,Y)$$</div>
<p>Es decir: la correlación <em>es</em> la similitud coseno aplicada a datos centrados, y el producto punto de datos centrados <em>es</em> n veces la covarianza. Las tres medidas son la misma idea vista desde ángulos distintos.</p></div>

<pre class="r">X &lt;- c(1,2,3,4); Y &lt;- c(2,8,6,8)
Xc &lt;- X - mean(X); Yc &lt;- Y - mean(Y)     <span class="c"># centrar</span>
coseno &lt;- sum(Xc*Yc) / (sqrt(sum(Xc^2)) * sqrt(sum(Yc^2)))
cor(X, Y)   <span class="c"># mismo valor que 'coseno'</span></pre>

<div class="src">Fuentes: PPT «1. Correlación» (diap. 40–49); «Pauta Pregunta 3 - Prueba 1»; «PAUTA P1 y P2 PRUEBA 2».</div>
`
},

/* ────────────────────────────── MÓDULO 3 ────────────────────────────── */
{
  id: 'm3',
  num: 3,
  title: 'Distribución normal multivariada',
  tag: 'Capítulo 1',
  desc: 'La extensión de la normal a p variables: μ y Σ, elipses de densidad, combinaciones lineales y el caso ρ=0.',
  html: String.raw`
<h2>3.1 Idea central</h2>
<div class="blk simple"><div class="blk-h">🧠 En simple</div>
<p>Es la normal de siempre, pero para varias variables a la vez. Cada componente es normal univariada, y las variables pueden estar correlacionadas o no. Se describe con solo dos objetos: un <strong>vector de medias μ</strong> y una <strong>matriz de covarianza Σ</strong>.</p>
<p><em>Regla mnemotécnica del PPT:</em> «Normal multivariada = media + covarianza».</p></div>

<div class="blk deep"><div class="blk-h">📖 En profundidad</div>
<div class="tex">$$\begin{gathered}
X\sim N_p(\mu,\Sigma)\\[10pt]
f(x)=(2\pi)^{-p/2}\,|\Sigma|^{-1/2}
     \exp\!\Big(-\tfrac{1}{2}(x-\mu)'\,\Sigma^{-1}(x-\mu)\Big)
\end{gathered}$$</div>
<ul class="tight">
  <li><strong>μ</strong> mueve el centro (dónde está la nube de puntos).</li>
  <li><strong>Σ</strong> determina la forma (dispersión) y la inclinación (correlación).</li>
  <li>En 2D, las curvas de igual densidad son <strong>elipses</strong>. En p dimensiones, <strong>elipsoides</strong>.</li>
  <li>El exponente contiene la <strong>distancia de Mahalanobis</strong>: (x−μ)′Σ⁻¹(x−μ) = c² define esos contornos.</li>
</ul></div>

<h2>3.2 La propiedad que siempre preguntan</h2>
<div class="note memo"><span class="nh">⚠️ Memoriza esta distinción</span>
<p><strong>En general:</strong> correlación cero <strong>NO</strong> implica independencia (puede haber relación no lineal).<br>
<strong>Bajo normalidad conjunta:</strong> si ρ = 0, entonces X₁ y X₂ <strong>SÍ</strong> son independientes.<br>
<strong>Siempre:</strong> independencia ⟹ correlación 0 (esta dirección vale sin supuestos).</p></div>

<details class="acc"><summary>Justificación matemática de «independientes ⟹ r = 0» (pauta oficial)</summary><div>
<p>Si X e Y son independientes, entonces E(XY) = E(X)E(Y). Luego:</p>
<div class="tex">$$\begin{gathered}
\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]=E[X]E[Y]-E[X]E[Y]=\mathbf{0}\\[6pt]
\Longrightarrow\quad r=\frac{\operatorname{Cov}(X,Y)}{s_x s_y}=0
\end{gathered}$$</div>
<p><strong>Justificación intuitiva (también vale puntaje):</strong> correlación positiva significa que cuando una sube la otra sube; negativa, que cuando una sube la otra baja. Si son independientes, que una suba o baje no afecta a la otra, por lo que la correlación debe ser 0.</p>
<div class="src">Fuente: «Pauta Pregunta 1 - Prueba 1», afirmaciones 2 y 3.</div>
</div></details>

<h4>Por qué «r = 0 ⟹ independientes» es FALSO en general</h4>
<ul class="tight">
  <li>Las variables pueden estar relacionadas de forma <strong>no lineal</strong> y aun así tener r = 0 (ej.: Y = X² con X simétrica en torno a 0).</li>
  <li>Puede ser que r = 0 pero una variable influya en la <strong>distribución</strong> de la otra (ej.: la varianza de Y depende de X, pero su media no).</li>
  <li>La equivalencia solo se cumple bajo <strong>normal bivariada / conjunta</strong>.</li>
</ul>

<h2>3.3 Combinaciones lineales (el ejercicio tipo)</h2>
<p>Si X ~ N<sub>p</sub>(μ, Σ) y a es un vector de constantes, entonces Y = a′X sigue siendo <strong>normal univariada</strong>:</p>

<div class="tex">$$\begin{gathered}
Y=a'X\ \sim\ N\big(\,\mathbf{a'\mu}\,,\ \mathbf{a'\Sigma a}\,\big)\\[10pt]
\text{Caso } p=2,\ Y=X_1+X_2 \ \ (a=(1,1)')\!:\\[4pt]
\begin{aligned}
E(Y)&=\mu_1+\mu_2\\
\operatorname{Var}(Y)&=\sigma_1^{2}+\sigma_2^{2}+2\sigma_{12}
\end{aligned}
\end{gathered}$$</div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo del PPT (diap. 38–39)</div>
<p>μ = (1, 2)′ y Σ = [[4,1],[1,3]]. Sea Y = X₁ + X₂. Calcular P(Y ≤ 5).</p>
<ol class="tight">
  <li>Media: E(Y) = 1 + 2 = <strong>3</strong>.</li>
  <li>Varianza: Var(Y) = 4 + 3 + 2(1) = <strong>9</strong> ⟹ sd = 3.</li>
  <li>Y ~ N(3, 9). P(Y ≤ 5) = P(Z ≤ (5−3)/3) = P(Z ≤ 0.667) ≈ <strong>0.7475</strong>.</li>
</ol>
<pre class="r">mu &lt;- c(1,2)
Sigma &lt;- matrix(c(4,1,1,3), 2, 2)
mu_y &lt;- sum(mu)                    <span class="c"># 3</span>
sd_y &lt;- sqrt(4 + 3 + 2*1)          <span class="c"># 3</span>
pnorm(5, mean = mu_y, sd = sd_y)   <span class="c"># 0.7475</span></pre>
<p class="small muted"><strong>Pasos para resolver (los del PPT):</strong> identificar μ y Σ → calcular la media de Y → calcular la varianza de Y → aplicar normal univariada.</p></div>

<div class="note trap"><span class="nh">🚨 Error frecuente</span>
<p>Olvidar el término <strong>2σ₁₂</strong> al calcular Var(X₁ + X₂). Solo desaparece si las variables son <em>no correlacionadas</em>. Y para una <strong>diferencia</strong>: Var(X₁ − X₂) = σ₁² + σ₂² <strong>−</strong> 2σ₁₂.</p></div>

<pre class="r"><span class="c"># Graficar una normal bivariada</span>
library(plot3D); library(mvtnorm)
mu &lt;- c(0,0)
Sigma &lt;- matrix(c(1, 0.7, 0.7, 1), 2)
x &lt;- seq(-3, 3, length = 100); y &lt;- seq(-3, 3, length = 100)
grid &lt;- expand.grid(x = x, y = y)
z &lt;- dmvnorm(grid, mean = mu, sigma = Sigma)
persp3D(x, y, matrix(z, 100, 100), theta = 30, phi = 20,
        xlab = "X", ylab = "Y", zlab = "Densidad", main = "Normal Bivariada")</pre>

<div class="src">Fuentes: PPT «1. Correlación» (diap. 32–39); PPT «2. Pruebas de Hipótesis» (diap. 46); «Pauta Pregunta 1 - Prueba 1».</div>
`
},

/* ────────────────────────────── MÓDULO 4 ────────────────────────────── */
{
  id: 'm4',
  num: 4,
  title: 'Pruebas de hipótesis: la lógica',
  tag: 'Capítulo 2',
  desc: 'H₀ vs H₁, nivel de significancia, p-valor, región de rechazo, errores tipo I y II, potencia.',
  html: String.raw`
<h2>4.1 Qué es y qué NO es</h2>
<div class="blk simple"><div class="blk-h">🧠 En simple</div>
<p>Una prueba de hipótesis evalúa si los datos de una muestra dan <strong>suficiente evidencia</strong> para rechazar una suposición inicial sobre la población.</p></div>

<div class="note memo"><span class="nh">⚠️ Mensaje clave del curso (cae en V/F casi siempre)</span>
<p>La prueba <strong>NO demuestra</strong> que H₀ sea verdadera o falsa. Solo evalúa si hay evidencia suficiente para rechazarla. <strong>Si no hay evidencia suficiente, no se rechaza H₀ — pero eso no significa que sea verdadera</strong> (podría estar cometiéndose un error tipo II).</p>
<div class="src">Fuente: PPT «2. Pruebas de Hipótesis», diap. 2; «Pauta Pregunta 1 - Prueba 1», afirmación 4.</div></div>

<h4>Cómo plantear H₀ y H₁</h4>
<ul class="tight">
  <li><strong>H₀ (nula):</strong> la suposición inicial, el «status quo». Siempre contiene la igualdad (=, ≤, ≥).</li>
  <li><strong>H₁ (alternativa):</strong> lo que se quiere <em>demostrar</em>. Nunca contiene la igualdad.</li>
</ul>
<div class="note tip"><span class="nh">✅ Truco para no equivocarse</span>
<p>Lo que el enunciado quiere <strong>probar / afirmar / demostrar</strong> va en <strong>H₁</strong>. Ejemplos: «¿la gente vive <em>más</em> de 70 años?» → H₀: μ ≤ 70 vs H₁: μ &gt; 70. «¿el consumo del barrio es <em>superior</em> al de la ciudad?» → H₁: μ &gt; 721.</p>
<p><strong>Excepción a tener presente:</strong> cuando el enunciado dice «la empresa <em>afirma</em> que como máximo el 15% falla», la afirmación de la empresa (p ≤ 0.15) es el status quo y va en H₀; se busca evidencia <em>contra</em> ella: H₁: p &gt; 0.15.</p></div>

<h2>4.2 Nivel de significancia α y p-valor</h2>
<div class="tex">$$\begin{aligned}
\boldsymbol{\alpha}&=P\big(\text{rechazar } H_0 \mid H_0 \text{ verdadera}\big)
   &&\text{(máx. prob. de Error Tipo I)}\\[8pt]
\textbf{p-valor}&=P\big(\text{resultado tan extremo o más} \mid H_0 \text{ verdadera}\big)
\end{aligned}$$</div>

<div class="note memo"><span class="nh">⚠️ Regla de decisión (memorizar literal)</span>
<p><strong>Si p-valor ≤ α → se RECHAZA H₀.</strong><br>
<strong>Si p-valor &gt; α → NO se rechaza H₀.</strong></p></div>

<div class="note info"><span class="nh">📌 La segunda definición del p-valor (lámina «Formas de tomar la decisión»)</span>
<p>El PPT da también esta caracterización, que se pregunta mucho:</p>
<p>«El valor P es el <strong>mínimo nivel de significancia para el cual el valor de la estadística de prueba es significativo</strong>».</p>
<p>Es decir: si tu p-valor es 0.03, habrías rechazado H₀ con α = 0.05 y con α = 0.10, pero <strong>no</strong> con α = 0.01. El p-valor marca la frontera exacta.</p>
<p>El p-valor depende de tres cosas: <strong>(1)</strong> la distribución a utilizar, <strong>(2)</strong> la hipótesis alternativa H₁, y <strong>(3)</strong> el valor del estadístico de prueba.</p>
<ul class="tight">
  <li>Si el valor P es <strong>muy pequeño</strong> (menor de 0.001) → se rechaza H₀ a <em>cualquier</em> nivel de significancia.</li>
  <li>Si el valor P es <strong>muy grande</strong> (mayor de 0.1) → <em>no</em> se rechaza H₀ a ningún nivel de significancia habitual.</li>
</ul>
<div class="src">Fuente: PPT «2. Pruebas de Hipótesis», lámina «Formas de tomar la decisión».</div></div>

<p>La <strong>región de rechazo</strong> (o de valores críticos) lleva siempre a la misma decisión que el p-valor. Ambos métodos son equivalentes; la prueba puede pedir explícitamente uno u otro.</p>

<div class="blk ex"><div class="blk-h">💡 Ejemplo completo con los dos métodos: esperanza de vida</div>
<p>¿La gente vive más de 70 años en promedio? Muestra: <strong>x̄ = 71.8</strong>, <strong>n = 100</strong>, <strong>σ = 8.9</strong> (conocida), α = 0.05.</p>
<div class="tex">$$\begin{aligned}
&\textbf{1. Hipótesis}
   &&H_0:\mu=70 \quad\text{vs}\quad H_1:\mu\gt 70 &&\text{(unilateral derecha)}\\[4pt]
&\textbf{2. Significancia} && \alpha=0.05\\[4pt]
&\textbf{3. Estadístico}
   && z_c=\frac{\bar{x}-\mu_0}{\sigma/\sqrt{n}}
        =\frac{71.8-70}{8.9/\sqrt{100}}=\frac{1.8}{0.89}=\mathbf{2.02}\\[4pt]
&\textbf{4a. Región de rechazo}
   && z_{0.05}=1.64 \ \Longrightarrow\ 2.02\gt 1.64
   \ \Longrightarrow\ \mathbf{\text{se rechaza } H_0}\\[4pt]
&\textbf{4b. Valor P}
   && P(z\gt 2.02)=\mathbf{0.0217} \ \Longrightarrow\ 2.17\%\le 5\%
   \ \Longrightarrow\ \mathbf{\text{se rechaza } H_0}
\end{aligned}$$</div>
<p>Los dos caminos coinciden siempre. Fíjate en <strong>qué número del enunciado va en cada lugar</strong>: 71.8 es x̄ (el dato muestral), 70 es μ₀ (el valor de la afirmación), 8.9 es σ (la dispersión poblacional) y 100 es n. Se usa <strong>z</strong> y no t porque σ es conocida.</p>
<div class="src">Fuente: PPT «2. Pruebas de Hipótesis», diap. 3–4.</div></div>

<table class="tbl">
<tr><th>H₁</th><th>Tipo</th><th>Región de rechazo</th><th>p-valor</th><th>R</th></tr>
<tr><td>μ &gt; μ₀</td><td>Unilateral derecha</td><td>t<sub>obs</sub> &gt; t<sub>α, gl</sub></td><td>P(T &gt; t<sub>obs</sub>)</td><td><code>alternative="greater"</code></td></tr>
<tr><td>μ &lt; μ₀</td><td>Unilateral izquierda</td><td>t<sub>obs</sub> &lt; −t<sub>α, gl</sub></td><td>P(T &lt; t<sub>obs</sub>)</td><td><code>alternative="less"</code></td></tr>
<tr><td>μ ≠ μ₀</td><td>Bilateral</td><td>|t<sub>obs</sub>| &gt; t<sub>α/2, gl</sub></td><td>2·P(T &gt; |t<sub>obs</sub>|)</td><td><code>alternative="two.sided"</code></td></tr>
</table>

<div class="note trap"><span class="nh">🚨 Errores de bulto que cuestan puntos</span>
<ul class="tight">
  <li>Usar <strong>α</strong> en vez de <strong>α/2</strong> al buscar el valor crítico en una prueba bilateral.</li>
  <li>Confundir «nivel de confianza 90%» con α = 0.90. Es <strong>α = 0.10</strong>.</li>
  <li>Decir «se acepta H₀». La formulación correcta es <strong>«no se rechaza H₀»</strong>.</li>
</ul></div>

<h2>4.3 Errores tipo I y tipo II, y potencia</h2>

<table class="tbl">
<tr><th></th><th>H₀ es verdadera</th><th>H₀ es falsa</th></tr>
<tr><td><strong>Se rechaza H₀</strong></td><td class="" style="background:var(--red-bg)"><strong>Error Tipo I</strong><br>«falsa alarma» · P = <strong>α</strong></td><td style="background:var(--green-bg)">Decisión correcta<br>P = <strong>1 − β</strong> (potencia)</td></tr>
<tr><td><strong>No se rechaza H₀</strong></td><td style="background:var(--green-bg)">Decisión correcta<br>P = 1 − α</td><td style="background:var(--red-bg)"><strong>Error Tipo II</strong><br>«no detectar» · P = <strong>β</strong></td></tr>
</table>

<div class="note memo"><span class="nh">⚠️ Memoriza estas relaciones</span>
<ul class="tight">
  <li><strong>Potencia = 1 − β</strong>: capacidad de detectar un efecto que sí existe.</li>
  <li>Si <strong>disminuyes α, aumenta β</strong> (y baja la potencia). El equilibrio depende del contexto.</li>
  <li>Si <strong>aumentas n → disminuye β → aumenta la potencia</strong>. <em>α NO cambia con n.</em></li>
  <li>β depende de: <strong>n</strong>, <strong>α</strong>, la <strong>diferencia real</strong> entre el valor verdadero y μ₀, y la <strong>variabilidad σ</strong>.</li>
</ul></div>

<div class="note trap"><span class="nh">🚨 V/F que ya cayó en la Prueba 1</span>
<p>«Si hago un test con α = 0.01, mientras más grande el tamaño de muestra, menor es la probabilidad de cometer un error tipo I» → <strong>FALSO</strong>. La probabilidad de error tipo I <em>es</em> α, que sigue siendo 0.01 aunque aumente n. Lo que disminuye al aumentar n es β (error tipo II).</p>
<div class="src">Fuente: «Pauta Pregunta 1 - Prueba 1», afirmación 6.</div></div>

<h2>4.4 Los cuatro pasos que espera la pauta</h2>
<p>Las pautas del curso <strong>asignan puntaje por paso</strong>. Escríbelos siempre, aunque la respuesta numérica te salga mal:</p>
<ol class="tight">
  <li><strong>Planteamiento de hipótesis</strong> (H₀ y H₁, con el parámetro correcto). <em>~0.4 pts</em></li>
  <li><strong>Estadístico de prueba</strong> (fórmula + reemplazo + valor). <em>~0.7–0.8 pts</em></li>
  <li><strong>Valor crítico o p-valor y decisión</strong> (con los gl correctos). <em>~0.5–0.6 pts</em></li>
  <li><strong>Conclusión en contexto</strong>, mencionando el nivel de significancia y hablando del problema, no de símbolos. <em>~0.4 pts</em></li>
</ol>
<div class="note tip"><span class="nh">✅ Plantilla de conclusión</span>
<p>«Con un nivel de significancia del <em>5%</em>, <strong>existe / no existe</strong> evidencia estadística suficiente para afirmar que <em>[la afirmación del enunciado, en palabras del problema]</em>.»</p>
<div class="src">Fuente: rúbricas de «Pauta Pregunta 2 y 3 - Prueba 1».</div></div>

<div class="src">Fuentes: PPT «2. Pruebas de Hipótesis» (diap. 2–4, 14, 39–43); pautas de la Prueba 1.</div>
`
},

/* ────────────────────────────── MÓDULO 5 ────────────────────────────── */
{
  id: 'm5',
  num: 5,
  title: 'Una población: media, proporción y varianza',
  tag: 'Capítulo 2',
  desc: 'Las tres pruebas de una muestra: t / z para μ, z para p (con np₀ ≥ 5), y χ² para σ². Con ejercicios resueltos.',
  html: String.raw`
<h2>5.1 Media: ¿t o z?</h2>
<div class="note memo"><span class="nh">⚠️ El criterio</span>
<p><strong>σ conocida</strong> → prueba <strong>Z</strong> (distribución Normal estándar).<br>
<strong>σ desconocida</strong> → prueba <strong>t de Student</strong> con <strong>n − 1</strong> grados de libertad.</p>
<p>La t tiene <strong>colas más anchas</strong> que la normal, lo que compensa la incertidumbre adicional de estimar σ con s. Conocer σ es poco común en la práctica; puede ocurrir con información histórica sobre la variabilidad.</p></div>

<div class="tex">$$\underbrace{t=\frac{\bar{x}-\mu_0}{s/\sqrt{n}}}_{\substack{\sigma\ \text{desconocida}\\ \text{gl}=n-1}}
\qquad\qquad
\underbrace{z=\frac{\bar{x}-\mu_0}{\sigma/\sqrt{n}}}_{\substack{\sigma\ \text{conocida}\\ N(0,1)}}$$</div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo resuelto: consumo eléctrico (PPT diap. 5–6)</div>
<p>Media conocida de la ciudad: 721 kWh. La junta del barrio cree que consumen <em>más</em>. Muestra de n = 20 hogares, σ desconocida, α = 5%.</p>
<ol class="tight">
  <li>H₀: μ ≤ 721 &nbsp;vs&nbsp; H₁: μ &gt; 721 (unilateral derecha).</li>
  <li>Se usa <strong>t</strong> porque σ² es desconocida; gl = 19.</li>
  <li>Valor crítico t(19 gl, α = 0.05) = <strong>1.73</strong>; p-valor = <strong>0.02188</strong>.</li>
  <li>Como p = 2.19% ≤ 5% → <strong>se rechaza H₀</strong>.</li>
  <li>Conclusión: con α = 5%, hay evidencia suficiente de que el consumo promedio del barrio supera los 721 kWh.</li>
</ol></div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo en R: caso límite (PPT diap. 8)</div>
<pre class="r">set.seed(123)
x &lt;- rnorm(25, mean = 10.8, sd = 1.9)
res_t &lt;- t.test(x, mu = 10, alternative = "two.sided", conf.level = 0.95)

<span class="c"># Salida:  t = 2.048,  df = 24,  p-value = 0.0517</span>
<span class="c">#          IC 95%: [9.994, 11.479],  mean of x = 10.737</span></pre>
<p><strong>Cómo leerlo, en orden:</strong></p>
<ol class="tight">
  <li><strong>p-value</strong>: 0.0517 &gt; 0.05 → <strong>NO se rechaza H₀</strong> (caso límite).</li>
  <li><strong>Intervalo de confianza</strong>: [9.994, 11.479] <strong>contiene</strong> μ₀ = 10 → confirma que no se rechaza.</li>
  <li><strong>mean of x</strong> = 10.737 es la estimación puntual de μ.</li>
</ol>
<div class="note tip"><span class="nh">✅ La regla del intervalo (equivalencia test–IC)</span>
<p>Un IC bilateral del (1−α)·100% <strong>contiene μ₀</strong> ⟺ <strong>no se rechaza</strong> H₀: μ = μ₀ a nivel α. Si el IC <strong>no</strong> contiene μ₀ → se rechaza. Para diferencia de medias, el valor de referencia es D₀ (habitualmente 0).</p></div></div>

<h4>Prueba Z en R (varianza conocida) — paquete BSDA</h4>
<pre class="r">library(BSDA)
res_z &lt;- z.test(x = x, mu = 10, sigma.x = 2.0,
                alternative = "greater", conf.level = 0.95)
<span class="c"># z = 2.164, p-value = 0.0153, IC 95%: [10.189, Inf), mean of x = 10.790</span>
<span class="c"># p = 0.0153 &lt; 0.05 → se rechaza H0: hay evidencia de que mu &gt; 10</span></pre>
<p class="small muted">Nota del PPT: en la prueba <strong>unilateral derecha</strong> el intervalo de confianza tiene límite superior <strong>Inf</strong>, porque solo interesa el límite inferior.</p>

<h2>5.2 Proporciones</h2>
<div class="note memo"><span class="nh">⚠️ Requisito que hay que verificar SIEMPRE</span>
<div class="tex">$$n\,p_0\ \ge\ 5 \qquad\text{y}\qquad n\,(1-p_0)\ \ge\ 5$$</div>
<p>Garantiza que la aproximación normal es válida. Si no se cumple, hay que usar un método exacto (prueba binomial exacta). <strong>El PPT lo pone como «recordatorio importante» en la diapositiva de cierre — es candidato seguro de pregunta.</strong></p></div>

<div class="tex">$$\mathbf{Z=\dfrac{\hat{p}-p_0}{\sqrt{\dfrac{p_0(1-p_0)}{n}}}}
\qquad\text{con}\quad \hat{p}=\frac{X}{n}$$</div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo resuelto: estudiantes que trabajan (PPT diap. 12–14)</div>
<p>Se afirma que 4 de cada 10 universitarios trabajan. Muestra: 43 de 120. α = 10%.</p>
<ul class="tight">
  <li>H₀: p = 0.40 &nbsp;vs&nbsp; H₁: p ≠ 0.40 (bilateral).</li>
  <li>p̂ = 43/120 = <strong>0.358</strong>.</li>
  <li>Requisito: 120 × 0.40 = 48 ≥ 5 ✓ &nbsp;y&nbsp; 120 × 0.60 = 72 ≥ 5 ✓</li>
  <li>Valores críticos para α = 0.10 bilateral: <strong>Z = ±1.64</strong>. Se rechaza si |Z<sub>obs</sub>| &gt; 1.64.</li>
  <li>Z<sub>obs</sub> = (0.358 − 0.40)/√(0.40·0.60/120) = −0.0417/0.0447 ≈ <strong>−0.93</strong> → no se rechaza H₀.</li>
</ul>
<p class="small muted">Cálculo del p-valor bilateral: si Z<sub>obs</sub> &lt; 0 → p = 2·P(Z &lt; Z<sub>obs</sub>); si Z<sub>obs</sub> &gt; 0 → p = 2·P(Z &gt; Z<sub>obs</sub>).</p></div>

<pre class="r">X &lt;- 78; n &lt;- 120; p0 &lt;- 0.60
phat &lt;- X / n                       <span class="c"># 0.65</span>
n*p0; n*(1-p0)                      <span class="c"># requisito &gt;= 5</span>

<span class="c"># Manual, cola derecha</span>
z_obs &lt;- (phat - p0) / sqrt(p0*(1-p0)/n)   <span class="c"># 1.118</span>
1 - pnorm(z_obs)                            <span class="c"># p = 0.1318</span>

<span class="c"># Con la función directa (correct = FALSE quita la corrección de continuidad)</span>
prop.test(78, 120, 0.6, "greater", correct = FALSE)
<span class="c"># X-squared = 1.25, df = 1, p-value = 0.1318  → NO se rechaza H0</span></pre>
<div class="note info"><span class="nh">📌 Ojo con prop.test</span>
<p><code class="inl">prop.test</code> devuelve un estadístico <strong>X-squared</strong>, no una Z. Se cumple que <strong>X² = z²</strong> (aquí 1.118² = 1.25). El p-valor es el mismo. Usa <code class="inl">correct = FALSE</code> para que coincida con el cálculo manual.</p></div>

<h2>5.3 Varianza (χ²)</h2>
<p>Se usa cuando se quiere evaluar si la <strong>variabilidad</strong> de una población es igual, mayor o menor que un valor de referencia.</p>

<div class="tex">$$\begin{gathered}
\mathbf{\chi^{2}=\dfrac{(n-1)\,s^{2}}{\sigma_0^{2}}}
\qquad\text{gl}=n-1\\[10pt]
H_0:\sigma^{2}=\sigma_0^{2}\ (\text{o }\le,\ \ge)
\qquad
H_1:\sigma^{2}\neq\sigma_0^{2}\ (\text{o }\gt ,\ \lt )
\end{gathered}$$</div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo resuelto: tiempos de conexión (PPT diap. 18)</div>
<p>Los estudiantes afirman que la desviación estándar es como máximo 2 minutos. Muestra: n = 24, s² = 4.9 min². α = 5%.</p>
<ol class="tight">
  <li>H₀: σ² ≤ 4 &nbsp;vs&nbsp; H₁: σ² &gt; 4 &nbsp;(porque σ ≤ 2 ⟹ σ² ≤ 4).</li>
  <li>χ²₀ = (24 − 1) × 4.9 / 4 = <strong>28.175</strong>, con gl = 23.</li>
  <li>Valor crítico χ²(0.05, 23) = <strong>35.172</strong>.</li>
  <li>28.175 &lt; 35.172 → no cae en zona de rechazo → <strong>no se rechaza H₀</strong>.</li>
  <li>Conclusión: no hay evidencia suficiente para afirmar que σ &gt; 2 minutos; la afirmación de los estudiantes es consistente con los datos.</li>
</ol></div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo resuelto de PRUEBA: varianza de la Línea B</div>
<p>H₀: σ²<sub>B</sub> = 25 vs H₁: σ²<sub>B</sub> &gt; 25, con n = 12 y s² = 36, α = 0.05.</p>
<div class="tex">$$\begin{aligned}
\text{gl}&=12-1=11\\[4pt]
\chi^{2}_0&=\frac{(12-1)\cdot 36}{25}=\frac{396}{25}=\mathbf{15.84}\\[4pt]
\chi^{2}_{\text{crít}}&=\chi^{2}(0.05,\,11)=\mathbf{19.6751}\\[4pt]
&15.84\lt 19.6751 \ \Longrightarrow\ \mathbf{\text{NO se rechaza } H_0}
\end{aligned}$$</div>
<p>Conclusión: con α = 5%, no hay evidencia suficiente para afirmar que la varianza de la Línea B excede la especificación de 25.0 ml². La Línea B cumple el estándar de variabilidad.</p>
<div class="src">Fuente: «Pauta Pregunta 2 - Prueba 1», inciso a).</div></div>

<div class="note trap"><span class="nh">🚨 Cuidado con σ vs σ²</span>
<p>Los enunciados suelen dar la <strong>desviación estándar</strong> («desviación máximo 2 minutos», «desviación de 0.1 mm»), pero el estadístico usa <strong>varianzas</strong>. Eleva al cuadrado antes de reemplazar: σ ≤ 2 ⟹ σ₀² = 4; σ = 0.1 ⟹ σ₀² = 0.01.</p></div>

<pre class="r">x &lt;- c(10.2, 9.8, 11.1, 10.7, 9.5, 10.0, 10.8, 11.3,
       9.7, 10.4, 10.9, 9.6, 10.5, 11.0, 10.1)
sigma2_0 &lt;- 4; alpha &lt;- 0.05
n  &lt;- length(x); s2 &lt;- var(x)

chi_obs  &lt;- (n - 1) * s2 / sigma2_0        <span class="c"># 1.187</span>
chi_crit &lt;- qchisq(1 - alpha, df = n - 1)  <span class="c"># 23.685 (cola derecha)</span>
p_value  &lt;- 1 - pchisq(chi_obs, df = n - 1) <span class="c"># ~1.000</span>
<span class="c"># chi_obs &lt; chi_crit y p ~ 1 → no se rechaza H0</span></pre>

<div class="note info"><span class="nh">📌 R no tiene función built-in para esta prueba</span>
<p>A diferencia de <code class="inl">t.test</code>, no existe un <code class="inl">var.test</code> de <em>una</em> muestra. Hay que calcular el estadístico a mano y usar <code class="inl">qchisq()</code> (valores críticos) y <code class="inl">pchisq()</code> (p-valor). Esto lo dice explícitamente el PPT.</p></div>

<h4>Valores críticos χ² según H₁</h4>
<table class="tbl">
<tr><th>H₁</th><th>Región de rechazo</th><th>En R</th></tr>
<tr><td>σ² &gt; σ₀²</td><td>χ²₀ &gt; χ²<sub>1−α, n−1</sub></td><td><code>qchisq(1-alpha, n-1)</code></td></tr>
<tr><td>σ² &lt; σ₀²</td><td>χ²₀ &lt; χ²<sub>α, n−1</sub></td><td><code>qchisq(alpha, n-1)</code></td></tr>
<tr><td>σ² ≠ σ₀²</td><td>χ²₀ &lt; χ²<sub>α/2</sub> ó χ²₀ &gt; χ²<sub>1−α/2</sub></td><td><code>qchisq(c(alpha/2, 1-alpha/2), n-1)</code></td></tr>
</table>
<p class="small muted">La χ² <strong>no es simétrica</strong>: en el caso bilateral los dos valores críticos NO son opuestos, hay que buscar los dos por separado.</p>

<div class="src">Fuentes: PPT «2. Pruebas de Hipótesis» (diap. 3–20, 43); script «2. Pruebas de Hipótesis. Ejemplos R»; «Pauta Pregunta 2 - Prueba 1»; «Ayudantía 2 2026-20 Enunciado» P1–P3.</div>
`
},

/* ────────────────────────────── MÓDULO 6 ────────────────────────────── */
{
  id: 'm6',
  num: 6,
  title: 'Dos poblaciones: F, pooled, Welch y pareadas',
  tag: 'Capítulo 2',
  desc: 'El árbol de decisión completo para comparar dos grupos, con los tres ejercicios resueltos del PPT.',
  html: String.raw`
<h2>6.1 El árbol de decisión</h2>
<div class="note memo"><span class="nh">⚠️ Diagrama que hay que tener en la cabeza</span>
<div class="console">¿Las muestras son <b>dependientes</b> (pareadas: mismos sujetos medidos dos veces)?
   │
   ├── SÍ  →  t pareada:  <b>t.test(A, B, paired = TRUE)</b>
   │
   └── NO (independientes) → ¿varianzas iguales?
          │
          ├── (prueba F previa NO rechaza) → t <b>pooled</b>: var.equal = TRUE
          │
          └── (F rechaza, o no hay certeza) → t de <b>Welch</b>: var.equal = FALSE</div></div>

<div class="note tip"><span class="nh">✅ Recomendación explícita del curso</span>
<p>«Actualmente se recomienda usar el test de varianzas <strong>diferentes</strong> (Welch) a no ser que uno tenga certeza (o fuerte evidencia) de que son iguales» — <em>Zimmerman, 2004</em>, citado en el PPT diap. 37. En R, <code class="inl">var.equal = FALSE</code> es además el <strong>valor por defecto</strong> de <code class="inl">t.test</code>.</p></div>

<h2>6.2 Prueba F para el cociente de varianzas</h2>
<p>Compara la variabilidad de dos poblaciones. Es un <strong>paso previo</strong> a comparar medias, porque determina qué prueba t usar.</p>

<div class="tex">$$\begin{gathered}
\mathbf{F=\dfrac{s_1^{2}}{s_2^{2}}}\ \sim\ F_{(n_1-1,\ n_2-1)}\\[10pt]
H_0:\sigma_1^{2}=\sigma_2^{2}
\qquad
H_1:\sigma_1^{2}\neq\sigma_2^{2}\ (\text{o }\gt ,\ \lt )\\[8pt]
F\approx 1 \Rightarrow \text{varianzas similares}
\qquad
F\gg 1 \ \text{ó}\ F\ll 1 \Rightarrow \text{varianzas diferentes}
\end{gathered}$$</div>

<div class="note trap"><span class="nh">🚨 Nota del PPT</span>
<p>«<strong>La varianza mayor siempre va en el numerador</strong>» — en la versión clásica con tablas, para trabajar solo con la cola derecha. Ojo con el orden de los grados de libertad: si intercambias numerador y denominador, también se intercambian los gl.</p></div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo resuelto: mercado inmobiliario (PPT diap. 54)</div>
<p>Un economista afirma que la variabilidad del precio de viviendas nuevas en Santiago es <em>diferente</em> a la de Concepción. Santiago: n = 23, s = 120 MM. Concepción: n = 28, s = 99.3 MM. α = 5%.</p>
<ul class="tight">
  <li>H₀: σ₁² = σ₂² &nbsp;vs&nbsp; H₁: σ₁² ≠ σ₂² (bilateral).</li>
  <li>F = 120² / 99.3² = 14400 / 9860.5 = <strong>1.4603</strong>.</li>
  <li>gl₁ = 22, gl₂ = 27.</li>
  <li>Se compara con los valores críticos de la F bilateral (α/2 = 0.025 en cada cola). Si F<sub>obs</sub> cae fuera de la región de no rechazo, se rechaza H₀.</li>
</ul>
<p class="small muted"><em>Implicación práctica que pide la pauta:</em> si las varianzas difieren, el riesgo de invertir en viviendas varía entre ambas ciudades.</p></div>

<pre class="r">A &lt;- c(10.2, 11.0, 9.8, 10.7, 11.4, 10.9, 9.6, 12.2, 10.5, 11.3, 10.1, 11.6)
B &lt;- c(9.9, 10.1, 10.4, 9.7, 10.3, 9.8, 10.0, 9.6, 10.2, 9.9)

<span class="c"># Manual</span>
F_obs  &lt;- var(A) / var(B)
F_crit &lt;- qf(1 - 0.05, df1 = length(A)-1, df2 = length(B)-1)
p_val  &lt;- 1 - pf(F_obs, df1 = length(A)-1, df2 = length(B)-1)

<span class="c"># Directo — hace todo automáticamente</span>
var.test(A, B, alternative = "greater")
<span class="c"># F = 8.924, df = (11, 9), p-value = 0.001388, IC 95%: [2.876, Inf)</span>
<span class="c"># p &lt; 0.05 → se rechaza H0: la varianza de A es ~9 veces la de B</span></pre>

<h2>6.3 Diferencia de medias, varianzas IGUALES (pooled)</h2>
<div class="tex">$$\begin{gathered}
\mathbf{S_p^{2}=\dfrac{(n_1-1)s_1^{2}+(n_2-1)s_2^{2}}{n_1+n_2-2}}
\qquad \text{(varianza combinada)}\\[12pt]
\mathbf{t=\dfrac{\bar{x}_2-\bar{x}_1-D_0}{\sqrt{S_p^{2}\Big(\dfrac{1}{n_1}+\dfrac{1}{n_2}\Big)}}}
\qquad \text{gl}=n_1+n_2-2
\end{gathered}$$</div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo resuelto de PRUEBA: líneas de llenado</div>
<p>Línea A: n = 10, x̄ = 503, s² = 16. Línea B: n = 12, x̄ = 498, s² = 36. «Suponga varianzas poblacionales iguales». α = 0.05, bilateral.</p>
<div class="tex">$$\begin{aligned}
&H_0:\mu_A=\mu_B \qquad H_1:\mu_A\neq\mu_B\\[8pt]
S_p^{2}&=\frac{9(16)+11(36)}{10+12-2}=\frac{144+396}{20}=\frac{540}{20}=\mathbf{27}
\qquad S_p=\sqrt{27}=5.196\\[8pt]
t_0&=\frac{503-498}{5.196\cdot\sqrt{\tfrac{1}{10}+\tfrac{1}{12}}}
    =\frac{5}{5.196\cdot\sqrt{0.1833}}
    =\frac{5}{5.196\cdot 0.4282}=\frac{5}{2.225}=\mathbf{2.247}\\[8pt]
&\text{gl}=20,\ \ \text{bilateral } \alpha/2=0.025
  \ \Longrightarrow\ t_{\text{crít}}=t(0.025,\,20)=\mathbf{2.086}\\[4pt]
&|2.247|\gt 2.086 \ \Longrightarrow\ \mathbf{\text{se rechaza } H_0}
\end{aligned}$$</div>
<p>Conclusión: con α = 5%, hay evidencia de que los volúmenes promedio de llenado difieren significativamente (503 ml vs 498 ml).</p>
<div class="src">Fuente: «Pauta Pregunta 2 - Prueba 1», inciso b). Reproduce esto de memoria: es la estructura exacta que pide la rúbrica.</div></div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo con D₀ ≠ 0 (PPT diap. 30 y 56)</div>
<p>1 de enero: $1.520/kg (s = 140), n = 18. 20 de abril: $2.607/kg (s = 170), n = 10. «¿Hubo un aumento <em>igual a</em> $1.000?» α = 10%.</p>
<ul class="tight">
  <li>H₀: μ₂ − μ₁ = 1000 &nbsp;vs&nbsp; H₁: μ₂ − μ₁ ≠ 1000 (bilateral, porque dice «igual a»).</li>
  <li>Sp² = <strong>22 819.23</strong>, gl = 18 + 10 − 2 = <strong>26</strong>.</li>
  <li>t = <strong>1.4602</strong>, t crítico = <strong>1.7056</strong>, p-valor = <strong>0.1562</strong>.</li>
  <li>|1.4602| &lt; 1.7056 → no se rechaza H₀. El aumento observado ($1.087) no es estadísticamente distinto de $1.000 dada la variabilidad.</li>
</ul></div>

<h2>6.4 Diferencia de medias, varianzas DIFERENTES (Welch)</h2>
<div class="tex">$$\begin{gathered}
\mathbf{t=\dfrac{\bar{x}_2-\bar{x}_1-D_0}
   {\sqrt{\dfrac{s_1^{2}}{n_1}+\dfrac{s_2^{2}}{n_2}}}}\\[12pt]
\text{gl de Welch (puede no ser entero):}\\[6pt]
\nu=\frac{\Big(\dfrac{s_1^{2}}{n_1}+\dfrac{s_2^{2}}{n_2}\Big)^{2}}
        {\dfrac{(s_1^{2}/n_1)^{2}}{n_1-1}+\dfrac{(s_2^{2}/n_2)^{2}}{n_2-1}}
\end{gathered}$$</div>
<p>Welch <strong>ajusta los grados de libertad</strong> para compensar la desigualdad de varianzas. Es más conservadora (y más segura) que asumir varianzas iguales.</p>

<div class="blk ex"><div class="blk-h">💡 Ejemplo resuelto: precio del limón (PPT diap. 27 y 55)</div>
<p>1 enero 2023: $1.938/kg (s = 230), n = 13. 22 abril 2023: $3.560/kg (s = 445), n = 15. ¿Aumentó en <strong>más de</strong> $1.500? α = 5%.</p>
<ul class="tight">
  <li>H₀: μ₂ − μ₁ ≤ 1500 &nbsp;vs&nbsp; H₁: μ₂ − μ₁ &gt; 1500 (unilateral derecha).</li>
  <li>t = <strong>0.928</strong>, gl de Welch = 21.56 ≈ <strong>22</strong>, valor crítico = <strong>1.72</strong>, p-valor = <strong>0.1817</strong>.</li>
  <li>0.928 &lt; 1.72 → <strong>no se rechaza H₀</strong>.</li>
</ul>
<div class="note info"><span class="nh">📌 Cómo redacta la pauta la conclusión (copia el matiz)</span>
<p>«Los datos muestrales <strong>NO contienen suficiente evidencia estadística</strong> para afirmar que el precio promedio aumentó en más de $1.500. <strong>Esto NO significa que el aumento no haya sido mayor a $1.500</strong>; significa que con los datos disponibles y α = 5% no podemos demostrarlo estadísticamente. Posibles razones: variabilidad alta, tamaño de muestra insuficiente.»</p></div></div>

<pre class="r">A &lt;- c(14.2, 13.5, 15.1, 14.7, 13.9, 14.0, 15.4, 14.8, 13.8, 14.1, 15.0, 14.4)
B &lt;- c(16.0, 15.7, 17.3, 16.5, 15.9, 17.1, 16.8, 16.2, 17.4, 15.8)

t.test(A, B, alternative = "less", var.equal = FALSE)   <span class="c"># Welch</span>
<span class="c"># t = -7.781, df = 18.55, p &lt; 0.0001, mean A = 14.408, mean B = 16.470</span>
<span class="c"># → se rechaza H0: mu_A &lt; mu_B</span>

t.test(A, B, alternative = "less", var.equal = TRUE)    <span class="c"># pooled</span></pre>

<h2>6.5 Muestras dependientes (datos pareados)</h2>
<div class="blk simple"><div class="blk-h">🧠 En simple</div>
<p>Cada observación del grupo 1 está <strong>naturalmente vinculada</strong> a una del grupo 2: el mismo paciente antes y después, el mismo atleta antes y después, el mismo punto de venta en dos fechas. Se trabaja con las <strong>diferencias</strong> d = Antes − Después y se aplica una prueba t <em>de una muestra</em> sobre esas diferencias.</p></div>

<div class="tex">$$\begin{gathered}
\mathbf{t=\dfrac{\bar{d}-D_0}{s_d/\sqrt{n}}}
\qquad \text{gl}=n-1\\[10pt]
d_i=\text{Antes}_i-\text{Después}_i\\[6pt]
H_0:\mu_d=0 \qquad H_1:\mu_d\neq 0
\end{gathered}$$</div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo resuelto: colesterol (PPT diap. 33 y 57)</div>
<p>11 pacientes medidos antes y después del tratamiento. α = 5%.</p>
<ul class="tight">
  <li>t₀ = <strong>9.06</strong>; valor crítico t(0.05, 10) = <strong>1.8125</strong>.</li>
  <li>|9.06| &gt; 1.8125 → cae en zona de rechazo → <strong>se rechaza H₀</strong>.</li>
  <li>Conclusión: con α = 5%, el medicamento tiene efecto significativo en la reducción del colesterol. Como d̄ &gt; 0, el colesterol <em>después</em> es menor que <em>antes</em>.</li>
</ul>
<pre class="r">antes   &lt;- c(135, 140, 152, 150, 140, 157, 153, 154, 141, 130, 136)
despues &lt;- c(110, 125, 132, 143, 120, 124, 137, 130, 128, 115, 115)
t.test(antes, despues, paired = TRUE, alternative = "two.sided", conf.level = 0.95)

<span class="c"># paired = TRUE es EQUIVALENTE a:</span>
t.test(antes - despues, mu = 0)</pre>
<p class="small muted"><strong>El orden importa:</strong> si d̄ &gt; 0 con H₁ bilateral, se concluye que «antes» es mayor que «después».</p></div>

<div class="note memo"><span class="nh">⚠️ El truco del D₀ en pareadas (Ayudantía 3, P5)</span>
<p>Si la hipótesis es «el entrenamiento mejora el tiempo <strong>en más de 2 segundos</strong>»:</p>
<div class="tex">$$H_0:\ \mu_{\text{antes}}-\mu_{\text{después}}\le 2
\qquad
H_1:\ \mu_{\text{antes}}-\mu_{\text{después}}\gt  2$$</div>
<p>Hay dos formas de hacerlo en R, ambas válidas:</p>
<pre class="r"><span class="c"># Forma 1: desplazar una de las series</span>
t.test(antes - 2, despues, alternative = "greater", paired = TRUE)

<span class="c"># Forma 2: cálculo manual del estadístico</span>
dbarra &lt;- mean(antes - despues)
s      &lt;- sd(antes - despues)
tobt   &lt;- (dbarra - 2) / (s / sqrt(8))
1 - pt(tobt, 7)                <span class="c"># p-valor cola derecha</span></pre>
<p>Conclusión de la pauta: no es posible rechazar H₀ → no hay evidencia de que el entrenamiento mejore el tiempo en <em>al menos</em> 2 segundos.</p>
<div class="src">Fuente: «Ayudantia 3 2026-20 Pauta R.R», Problema 5.</div></div>

<h2>6.6 Diferencia de proporciones (dos poblaciones)</h2>
<div class="note memo"><span class="nh">⚠️ Este caso aparece en la tabla resumen del PPT y suele olvidarse</span>
<p>Cuando se comparan <strong>dos proporciones</strong> (p₁ − p₂), hay <strong>tres formas del estadístico</strong> según lo que diga H₀:</p></div>

<div class="tex">$$\begin{aligned}
&\textbf{Caso 1} && H_0:\ p_1-p_2=\text{valor conocido}\neq 0\\[4pt]
&&& Z=\frac{(\hat{p}_1-\hat{p}_2)-(p_1-p_2)}
            {\sqrt{\dfrac{\hat{p}_1\hat{q}_1}{n_1}+\dfrac{\hat{p}_2\hat{q}_2}{n_2}}}\\[14pt]
&\textbf{Caso 2} && H_0:\ p_1=p_2 \quad(\text{diferencia CERO})\\[4pt]
&&& Z=\frac{\hat{p}_1-\hat{p}_2}
            {\sqrt{\hat{p}\hat{q}\Big(\dfrac{1}{n_1}+\dfrac{1}{n_2}\Big)}}
     \qquad \mathbf{\hat{p}=\dfrac{x_1+x_2}{n_1+n_2}}\\[14pt]
&\textbf{Caso 3} && H_0:\ p_1-p_2=p_0\\[4pt]
&&& Z=\frac{(\hat{p}_1-\hat{p}_2)-p_0}
            {\sqrt{\dfrac{\hat{p}_1\hat{q}_1}{n_1}+\dfrac{\hat{p}_2\hat{q}_2}{n_2}}}
\end{aligned}$$</div>

<div class="note trap"><span class="nh">🚨 La distinción clave: ¿pooled o no pooled?</span>
<p>Es el error más frecuente de este tema:</p>
<ul class="tight">
  <li>Si H₀ dice que las proporciones son <strong>IGUALES</strong> (p₁ = p₂), entonces bajo H₀ hay una sola proporción común, así que se <strong>combinan</strong> las muestras: p̂ = (x₁+x₂)/(n₁+n₂), y el error estándar usa ese p̂ único.</li>
  <li>Si H₀ dice que la diferencia vale <strong>algo distinto de cero</strong>, las proporciones NO son iguales bajo H₀, así que <strong>no se combinan</strong>: cada muestra aporta su propio p̂ᵢq̂ᵢ/nᵢ.</li>
</ul>
<p>Es exactamente la misma lógica que <em>pooled vs Welch</em> en medias: se combina solo cuando H₀ afirma igualdad.</p></div>

<h4>Requisito de normalidad (los CUATRO se verifican)</h4>
<div class="tex">$$n_1\hat{p}_1\ge 5 \quad\cdot\quad n_1\hat{q}_1\ge 5
\quad\cdot\quad n_2\hat{p}_2\ge 5 \quad\cdot\quad n_2\hat{q}_2\ge 5$$</div>
<p class="small muted">Con dos poblaciones hay que verificar cuatro condiciones, no dos. Recuerda que q̂ = 1 − p̂.</p>

<pre class="r"><span class="c"># Dos proporciones: x = éxitos de cada grupo, n = tamaños</span>
prop.test(x = c(x1, x2), n = c(n1, n2), correct = FALSE)

<span class="c"># Ejemplo: 45 de 120 en el grupo A y 30 de 100 en el grupo B</span>
prop.test(c(45, 30), c(120, 100), correct = FALSE)

<span class="c"># Cálculo manual del caso 2 (pooled)</span>
x1 &lt;- 45; n1 &lt;- 120; x2 &lt;- 30; n2 &lt;- 100
p1 &lt;- x1/n1; p2 &lt;- x2/n2
p_pool &lt;- (x1 + x2) / (n1 + n2)          <span class="c"># proporción combinada</span>
z &lt;- (p1 - p2) / sqrt(p_pool*(1-p_pool)*(1/n1 + 1/n2))
2 * (1 - pnorm(abs(z)))                   <span class="c"># p-valor bilateral</span></pre>

<div class="note info"><span class="nh">📌 Forma general del estadístico F</span>
<p>La misma tabla del PPT da la forma general del cociente de varianzas:</p>
<div class="tex">$$F=\frac{\sigma_2^{2}\,S_1^{2}}{\sigma_1^{2}\,S_2^{2}}
\qquad \nu_1=n_1-1,\quad \nu_2=n_2-1$$</div>
<p>Bajo H₀: σ₁² = σ₂², los σ² se cancelan y queda el conocido <strong>F = S₁²/S₂²</strong>. La forma general sirve si H₀ propone una razón distinta de 1.</p></div>

<h2>6.7 Resumen de funciones en R</h2>
<table class="tbl">
<tr><th>Situación</th><th>Función</th></tr>
<tr><td>Comparar varianzas (prueba F)</td><td><code>var.test(A, B)</code></td></tr>
<tr><td>Medias, independientes, varianzas <strong>diferentes</strong> (Welch)</td><td><code>t.test(A, B, var.equal = FALSE)</code></td></tr>
<tr><td>Medias, independientes, varianzas <strong>iguales</strong> (pooled)</td><td><code>t.test(A, B, var.equal = TRUE)</code></td></tr>
<tr><td>Medias, muestras <strong>dependientes</strong> (pareadas)</td><td><code>t.test(A, B, paired = TRUE)</code></td></tr>
<tr><td>Diferencia bajo H₀ distinta de cero</td><td><code>t.test(A, B, mu = D0)</code></td></tr>
<tr><td>Comparar dos <strong>proporciones</strong></td><td><code>prop.test(c(x1,x2), c(n1,n2), correct = FALSE)</code></td></tr>
</table>

<div class="src">Fuentes: PPT «2. Pruebas de Hipótesis» (diap. 21–38, 54–57); script «2. Pruebas de Hipótesis. Ejemplos R»; «Ayudantia 3 2026-20 Pauta R.R»; «Pauta Pregunta 2 - Prueba 1».</div>
`
},

/* ────────────────────────────── MÓDULO 7 ────────────────────────────── */
{
  id: 'm7',
  num: 7,
  title: 'Valores límite, región de rechazo y cálculo de β',
  tag: 'Alta probabilidad',
  desc: 'Las preguntas «¿qué valores de x̄ / s² rechazan?» y «¿cuál es la probabilidad de no rechazar si la media real es d?». Aparecen en TODAS las pautas.',
  html: String.raw`
<div class="note memo"><span class="nh">⚠️ Por qué este módulo importa tanto</span>
<p>Revisa los enunciados: en el problema 6, 7, 8 y 9 de los «Ejercicios preparación», en la Ayudantía 2 (P2b, P2c, P3b, P3c) y en la Pauta Pregunta 3 de la Prueba 1 (incisos e y f) <strong>siempre</strong> aparecen estas dos preguntas después de la prueba de hipótesis. Es material casi garantizado.</p></div>

<h2>7.1 Pregunta tipo A: «¿Qué valores de la media muestral NO rechazan H₀?»</h2>

<div class="blk simple"><div class="blk-h">🧠 En simple</div>
<p>Estás <strong>despejando x̄</strong> de la regla de decisión. En vez de decidir con un x̄ concreto, dejas la condición escrita en términos de x̄ y encuentras el valor límite.</p></div>

<h4>Receta general (unilateral derecha, H₀: μ ≤ μ₀)</h4>
<div class="tex">$$\begin{aligned}
\text{No se rechaza } H_0 \ &\Longleftrightarrow\ t_{\text{obs}}\le t_{\alpha,\,n-1}\\[6pt]
&\Longleftrightarrow\ \frac{\bar{x}-\mu_0}{s/\sqrt{n}}\le t_{\alpha,\,n-1}\\[6pt]
&\Longleftrightarrow\ \boxed{\ \bar{x}\ \le\ \mu_0+t_{\alpha,\,n-1}\cdot\frac{s}{\sqrt{n}}\ }\\[10pt]
\text{Región de RECHAZO:}\ &\ \bar{x}\gt \mu_0+t_{\alpha,\,n-1}\cdot\frac{s}{\sqrt{n}}
\end{aligned}$$</div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo resuelto (Pauta Pregunta 3 - Prueba 1, inciso e)</div>
<p>Notas de física, n = 10, Var(fis) = 0.302. H₀: μ ≤ 5.8 vs H₁: μ &gt; 5.8, nivel de confianza 90% ⟹ α = 0.10.</p>
<ol class="tight">
  <li>Es unilateral derecha ⟹ punto crítico <strong>t<sub>0.1; 9</sub> = 1.383029</strong>. <em>(0.2 pts de la rúbrica)</em></li>
  <li>s = √Var = √0.302 = <strong>0.5495</strong>. <em>(0.2 pts)</em></li>
  <li>Condición de no rechazo: (x̄ − 5.8)/(s/√10) ≤ 1.383029</li>
</ol>
<div class="tex">$$\begin{aligned}
\bar{x}&\le 1.383029\cdot\frac{0.5495}{\sqrt{10}}+5.8\\[4pt]
       &\le 1.383029\cdot 0.17376+5.8\\[4pt]
       &\le 0.2403+5.8=\mathbf{6.04}
\end{aligned}$$</div>
<p>Conclusión: los valores de x̄ que <strong>no rechazan</strong> H₀ son x̄ ≤ <strong>6.04</strong>. <em>(0.6 pts por el valor límite)</em></p></div>

<h4>Los tres casos</h4>
<table class="tbl">
<tr><th>H₁</th><th>NO se rechaza H₀ si…</th><th>Se rechaza si…</th></tr>
<tr><td>μ &gt; μ₀</td><td>x̄ ≤ μ₀ + t<sub>α,n−1</sub>·s/√n</td><td>x̄ &gt; ese límite</td></tr>
<tr><td>μ &lt; μ₀</td><td>x̄ ≥ μ₀ − t<sub>α,n−1</sub>·s/√n</td><td>x̄ &lt; ese límite</td></tr>
<tr><td>μ ≠ μ₀</td><td>μ₀ − t<sub>α/2</sub>·s/√n ≤ x̄ ≤ μ₀ + t<sub>α/2</sub>·s/√n</td><td>x̄ fuera de ese intervalo</td></tr>
</table>
<p class="small muted">Si σ es conocida, reemplaza t por z y s por σ.</p>

<h2>7.2 Pregunta tipo B: «¿Qué valores de la varianza muestral rechazan H₀?»</h2>
<p>Misma idea, despejando s² del estadístico χ²:</p>

<div class="tex">$$\begin{gathered}
\chi^{2}_0=\frac{(n-1)s^{2}}{\sigma_0^{2}}\\[10pt]
\text{Unilateral derecha } (H_1:\sigma^{2}\gt \sigma_0^{2}):
   \text{ se rechaza si } \chi^{2}_0\gt \chi^{2}_{1-\alpha,\,n-1}\\[10pt]
\frac{(n-1)s^{2}}{\sigma_0^{2}}\ \gt \ \chi^{2}_{1-\alpha,\,n-1}
\qquad\Longrightarrow\qquad
\boxed{\ s^{2}\ \gt \ \frac{\sigma_0^{2}\cdot\chi^{2}_{1-\alpha,\,n-1}}{n-1}\ }
\end{gathered}$$</div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo (Ayudantía 2, P3b)</div>
<p>H₀: σ² = 4 vs H₁: σ² ≠ 4, n = 10, α = 0.05. Bilateral ⟹ dos límites:</p>
<pre class="r">n &lt;- 10; sigma2_0 &lt;- 4; alpha &lt;- 0.05
lo &lt;- sigma2_0 * qchisq(alpha/2,   n-1) / (n-1)   <span class="c"># límite inferior</span>
hi &lt;- sigma2_0 * qchisq(1-alpha/2, n-1) / (n-1)   <span class="c"># límite superior</span>
c(lo, hi)
<span class="c"># Se RECHAZA H0 si  s2 &lt; lo  o  s2 &gt; hi</span></pre></div>

<h2>7.3 Pregunta tipo C: β y potencia</h2>

<div class="blk simple"><div class="blk-h">🧠 En simple</div>
<p>«Si la verdad es <em>otra</em> (μ = μ<sub>real</sub> ≠ μ₀), ¿cuál es la probabilidad de que mi prueba <strong>no lo detecte</strong>?» Eso es β. Se calcula en dos pasos: <strong>(1)</strong> encontrar el valor límite de x̄ que separa rechazo de no rechazo; <strong>(2)</strong> calcular la probabilidad de caer en la zona de NO rechazo <em>bajo la distribución verdadera</em>, la que está centrada en μ<sub>real</sub>.</p></div>

<div class="tex">$$\begin{aligned}
\boldsymbol{\beta}&=P\big(\text{no rechazar } H_0 \mid \mu=\mu_{\text{real}}\big)\\[8pt]
\text{Unilateral derecha:}\quad \beta&=P\big(\bar{X}\le \bar{x}_{\text{lím}} \mid \mu=\mu_{\text{real}}\big)\\[4pt]
&=P\!\left(Z\le \frac{\bar{x}_{\text{lím}}-\mu_{\text{real}}}{\sigma/\sqrt{n}}\right)\\[10pt]
\textbf{Potencia}&=1-\beta
\end{aligned}$$</div>

<div class="note trap"><span class="nh">🚨 El paso donde todos se equivocan</span>
<p>En el paso (2) hay que <strong>recentrar en μ<sub>real</sub>, no en μ₀</strong>. El valor límite x̄<sub>lím</sub> se calculó con μ₀; la probabilidad se calcula con μ<sub>real</sub>. Si vuelves a usar μ₀ obtendrás exactamente 1 − α, que es la respuesta equivocada.</p></div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo del PPT resuelto completo: la máquina de bebidas</div>
<p><em>«Una máquina se ajusta de manera que la cantidad servida esté distribuida aproximadamente normal, con media de <strong>200 ml</strong> y una desviación estándar de <strong>15 ml</strong>. La máquina se verifica periódicamente tomando una muestra de <strong>9</strong> bebidas y calculando el contenido promedio. Si x̄ cae en el intervalo <strong>191 &lt; x̄ &lt; 209</strong> se considera que la máquina opera de forma satisfactoria; de otro modo se concluye que μ ≠ 200.»</em></p>
<p>Aquí <strong>la región de aceptación viene dada</strong> — no hay que calcularla. Fíjate en qué es cada número: 200 = μ₀, 15 = σ, 9 = n, y [191, 209] es la zona de NO rechazo.</p>

<h4>① Probabilidad de cometer error tipo I (= α)</h4>
<div class="tex">$$\begin{aligned}
\sigma_{\bar{x}}&=\frac{\sigma}{\sqrt{n}}=\frac{15}{\sqrt{9}}=\frac{15}{3}=\mathbf{5}\\[10pt]
\alpha&=P\big(\bar{x}\lt 191 \ \text{ó}\ \bar{x}\gt 209 \mid \mu=\mathbf{200}\big)\\[4pt]
&=P\!\left(Z\lt \tfrac{191-200}{5}\right)+P\!\left(Z\gt \tfrac{209-200}{5}\right)\\[4pt]
&=P(Z\lt -1.8)+P(Z\gt 1.8)\\[4pt]
&=0.0359+0.0359=\mathbf{0.0719}
\end{aligned}$$</div>
<p>La máquina se detendrá por error el <strong>7.19%</strong> de las veces aunque esté bien calibrada.</p>

<h4>② Probabilidad de cometer error tipo II cuando μ = 215 (= β)</h4>
<div class="tex">$$\begin{aligned}
\beta&=P\big(191\lt \bar{x}\lt 209 \mid \mu=\mathbf{215}\big)
   &&\leftarrow \text{ahora se centra en 215, no en 200}\\[4pt]
&=P\!\left(\tfrac{191-215}{5}\lt Z\lt \tfrac{209-215}{5}\right)\\[4pt]
&=P(-4.8\lt Z\lt -1.2)\\[4pt]
&=\Phi(-1.2)-\Phi(-4.8)=0.1151-0.0000=\mathbf{0.1151}\\[10pt]
\text{Potencia}&=1-\beta=\mathbf{0.8849}
\end{aligned}$$</div>
<p>Si la máquina se descalibra a 215 ml, la prueba lo detecta el <strong>88.5%</strong> de las veces, pero se le escapa el <strong>11.5%</strong>.</p>
<pre class="r">sigma &lt;- 15; n &lt;- 9; se &lt;- sigma/sqrt(n)      <span class="c"># 5</span>
<span class="c"># ① alpha (bajo mu = 200)</span>
pnorm(191, 200, se) + (1 - pnorm(209, 200, se))   <span class="c"># 0.0719</span>
<span class="c"># ② beta (bajo mu = 215)</span>
pnorm(209, 215, se) - pnorm(191, 215, se)          <span class="c"># 0.1151</span></pre>
<div class="src">Fuente: PPT «2. Pruebas de Hipótesis», diap. 41–42 (enunciado en imagen).</div></div>

<div class="note tip"><span class="nh">✅ Cómo reconocer qué te están pidiendo</span>
<table class="tbl">
<tr><th>Si la pregunta dice…</th><th>Estás calculando…</th><th>Y te centras en…</th></tr>
<tr><td>«probabilidad de rechazar H₀ <em>siendo verdadera</em>», «error tipo I», «falsa alarma»</td><td><strong>α</strong></td><td><strong>μ₀</strong></td></tr>
<tr><td>«probabilidad de <em>no rechazar</em> dado que la media real es X», «error tipo II»</td><td><strong>β</strong></td><td><strong>μ<sub>real</sub></strong></td></tr>
<tr><td>«probabilidad de <em>rechazar</em> dado que la media real es X», «detectar», «potencia»</td><td><strong>1 − β</strong></td><td><strong>μ<sub>real</sub></strong></td></tr>
</table></div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo resuelto (Pauta Pregunta 3 - Prueba 1, inciso f)</div>
<p>Ya se obtuvo x̄<sub>lím</sub> = 6.04, con s = 0.5495 y n = 10. Si la verdadera media poblacional es <em>d</em>:</p>
<div class="tex">$$\begin{aligned}
P(\text{no rechazar}\mid \mu=d)&=P\big(\bar{X}\le 6.04 \mid \mu=d\big)\\[6pt]
&=P\!\left(T_9\le \frac{6.04-d}{0.5495/\sqrt{10}}\right)
\end{aligned}$$</div>
<p>La pauta acepta dejar la respuesta <strong>expresada</strong> así. Si te dan un valor concreto de <em>d</em>, solo reemplazas y usas <code class="inl">pt()</code> (o <code class="inl">pnorm()</code> si σ es conocida).</p></div>

<div class="blk ex"><div class="blk-h">💡 Ejemplo numérico completo (Ayudantía 2, P2c)</div>
<p>Bolsas: σ = 0.02 kg (conocida), n = 20, H₀: μ = 1 vs H₁: μ ≠ 1, α = 0.05. ¿Probabilidad de no rechazar si la media real es 1.005?</p>
<pre class="r">sigma &lt;- 0.02; n &lt;- 20; mu0 &lt;- 1; mu_real &lt;- 1.005; alpha &lt;- 0.05
se &lt;- sigma / sqrt(n)                     <span class="c"># 0.004472</span>
zc &lt;- qnorm(1 - alpha/2)                  <span class="c"># 1.959964 (bilateral)</span>

<span class="c"># (1) Límites de NO rechazo para x-barra</span>
lo &lt;- mu0 - zc*se                         <span class="c"># 0.99123</span>
hi &lt;- mu0 + zc*se                         <span class="c"># 1.00877</span>

<span class="c"># (2) Probabilidad de caer entre ellos SI la media real es 1.005</span>
beta &lt;- pnorm(hi, mu_real, se) - pnorm(lo, mu_real, se)
beta                                      <span class="c"># ~0.7929</span>
1 - beta                                  <span class="c"># potencia ~0.2071</span></pre>
<p>Lectura: con n = 20 la prueba tiene solo ~21% de probabilidad de detectar un desvío de 5 gramos. Para subir la potencia hay que aumentar n.</p></div>

<div class="note info"><span class="nh">📌 Variante con proporciones (Ejercicios preparación, P6 y P7)</span>
<p>«Si en realidad el 30% prefiere el Cabernet, ¿cuál es la probabilidad de rechazar la afirmación del experto (p = 0.20)?» — es exactamente lo mismo, pero se trabaja con p̂:</p>
<div class="tex">$$\begin{aligned}
&\text{(1) límites de }\hat{p}: && p_0\pm z_{\alpha/2}\sqrt{\frac{p_0(1-p_0)}{n}}\\[8pt]
&\text{(2) potencia}: && P\big(\hat{p}\ \text{fuera de esos límites}\mid p=p_{\text{real}}\big)\\[4pt]
&&& \text{con error estándar } \mathbf{\sqrt{\dfrac{p_{\text{real}}(1-p_{\text{real}})}{n}}}
\end{aligned}$$</div>
<p><strong>Ojo:</strong> el error estándar del paso (1) usa p₀; el del paso (2) usa p<sub>real</sub>.</p></div>

<h2>7.4 Chuleta de funciones de distribución en R</h2>
<table class="tbl">
<tr><th>Necesito…</th><th>Normal</th><th>t</th><th>χ²</th><th>F</th></tr>
<tr><td><strong>Valor crítico</strong> (cuantil)</td><td><code>qnorm(1-a)</code></td><td><code>qt(1-a, gl)</code></td><td><code>qchisq(1-a, gl)</code></td><td><code>qf(1-a, gl1, gl2)</code></td></tr>
<tr><td><strong>p-valor</strong> cola derecha</td><td><code>1-pnorm(z)</code></td><td><code>1-pt(t, gl)</code></td><td><code>1-pchisq(x, gl)</code></td><td><code>1-pf(f, gl1, gl2)</code></td></tr>
<tr><td><strong>p-valor</strong> cola izquierda</td><td><code>pnorm(z)</code></td><td><code>pt(t, gl)</code></td><td><code>pchisq(x, gl)</code></td><td><code>pf(f, gl1, gl2)</code></td></tr>
<tr><td><strong>p-valor</strong> bilateral</td><td colspan="4"><code>2*(1 - pdist(abs(estadístico), ...))</code> &nbsp;(simétricas); para χ² y F hay que tomar la cola correspondiente</td></tr>
</table>
<p class="small muted">Regla mnemotécnica: <strong>q</strong> = «quantile» → me da el <em>valor crítico</em>. <strong>p</strong> = «probability» → me da la <em>probabilidad acumulada</em> (área a la izquierda). <strong>d</strong> = densidad, <strong>r</strong> = random.</p>

<div class="src">Fuentes: «Pauta Pregunta 3 - Prueba 1» (e, f); «Ayudantía 2 2026-20 Enunciado» P2 y P3; «Ejercicios preparación - Prueba 1» P6–P9; PPT «2. Pruebas de Hipótesis» diap. 41–42.</div>
`
},

/* ────────────────────────────── MÓDULO 8 ────────────────────────────── */
{
  id: 'm8',
  num: 8,
  title: 'T² de Hotelling e inferencia multivariada',
  tag: 'Capítulo 2',
  desc: 'Del contraste univariado al vector de medias: T², región elíptica, IC simultáneos y Bonferroni.',
  html: String.raw`
<h2>8.1 ¿Por qué no hacer p pruebas t por separado?</h2>
<div class="blk simple"><div class="blk-h">🧠 En simple</div>
<p>Cuando mides p variables a la vez, interesa contrastar el <strong>vector de medias completo</strong> μ = (μ₁,…,μ<sub>p</sub>)′ de forma conjunta, no cada media por separado.</p></div>

<div class="note memo"><span class="nh">⚠️ Idea clave del PPT (diap. 45)</span>
<p>Hacer <strong>p pruebas t individuales NO equivale</strong> a un contraste conjunto: se puede aceptar cada hipótesis por separado y aun así rechazar la hipótesis conjunta (y también lo contrario).</p>
<p>El contraste conjunto <strong>controla el error global</strong> y <strong>usa la correlación entre las variables</strong>. Las p pruebas t por separado no hacen ni lo uno ni lo otro.</p>
<p>Según el estadístico que se use, la región de aceptación puede ser rectangular, lineal, circular o elíptica. El enfoque correcto aprovecha la correlación y conduce a una <strong>región elíptica</strong>.</p></div>

<h2>8.2 Supuesto: normalidad multivariada</h2>
<p>El contraste sobre μ supone que x₁,…,x<sub>n</sub> es una muestra aleatoria de N<sub>p</sub>(μ, Σ). Los contornos de densidad constante son <strong>elipsoides</strong> definidos por la distancia de Mahalanobis:</p>
<div class="tex">$$(x-\mu)'\,\Sigma^{-1}(x-\mu)=c^{2}$$</div>
<p>Antes de aplicar T² conviene verificar la normalidad multivariada. El estándar es el <strong>test de asimetría y curtosis de Mardia</strong>.</p>
<pre class="r">MVN::mvn(X, mvnTest = "mardia")
psych::mardia(X)</pre>

<h2>8.3 El estadístico T²</h2>
<div class="tex">$$\begin{gathered}
H_0:\ \mu=\mu_0 \qquad\text{vs}\qquad H_1:\ \mu\neq\mu_0\\[10pt]
\mathbf{T^{2}=n\,(\bar{x}-\mu_0)'\,S^{-1}(\bar{x}-\mu_0)}\\[12pt]
\text{Distribución bajo } H_0:\quad
   \frac{n-p}{(n-1)p}\,T^{2}\ \sim\ F_{(p,\ n-p)}\\[12pt]
\text{Rechazar } H_0 \text{ si }\quad
   \mathbf{T^{2}\gt \dfrac{(n-1)p}{n-p}\,F_{\alpha}(p,\,n-p)}\\[12pt]
\text{Valor-p}=P\!\left(F_{(p,\,n-p)}\gt \frac{n-p}{(n-1)p}\,T^{2}\right)
\end{gathered}$$</div>

<div class="note tip"><span class="nh">✅ La conexión que hay que saber</span>
<p>T² es la <strong>extensión multivariada de la t de Student</strong>. Con <strong>p = 1, T² coincide exactamente con t²</strong>.</p></div>

<h4>Aplicación paso a paso (PPT diap. 48)</h4>
<ol class="tight">
  <li>Calcular el vector de medias x̄ y la matriz de covarianzas S de la muestra de p variables.</li>
  <li>Calcular T² = n (x̄ − μ₀)′ S⁻¹ (x̄ − μ₀).</li>
  <li>Comparar con el valor crítico [(n−1)p/(n−p)]·F<sub>α</sub>(p, n−p), o calcular el valor-p con la F.</li>
  <li>Si T² supera el crítico, <strong>rechazar H₀ y usar los intervalos de confianza simultáneos</strong> para identificar qué variables explican el rechazo.</li>
</ol>

<h2>8.4 Región de confianza para μ</h2>
<div class="tex">$$n\,(\bar{x}-\mu)'\,S^{-1}(\bar{x}-\mu)\ \le\
\frac{(n-1)p}{n-p}\,F_{\alpha}(p,\,n-p)$$</div>
<ul class="tight">
  <li>Está <strong>centrado en x̄</strong>; sus ejes y orientación los dan los <strong>valores y vectores propios de S</strong>.</li>
  <li><strong>Equivalencia test–región:</strong> μ₀ cae dentro de la región ⟺ no se rechaza H₀: μ = μ₀.</li>
  <li>Con p = 2 la región es una <strong>elipse</strong>, dibujable con <code class="inl">car::ellipse</code>.</li>
</ul>

<h2>8.5 Intervalos de confianza simultáneos vs Bonferroni</h2>

<div class="tex">$$\begin{aligned}
&\textbf{T}^{2}\ \textbf{(Roy)} && \text{para toda combinación lineal } a'\mu:\\[4pt]
&&& a'\bar{x}\ \pm\ \sqrt{\frac{p(n-1)}{n-p}F_{\alpha}(p,n-p)}\ \cdot\ \sqrt{\frac{a'Sa}{n}}\\[8pt]
&&& \text{con } a=e_k \text{, para cada media } \mu_k:\\[4pt]
&&& \bar{x}_k\ \pm\ \sqrt{\frac{p(n-1)}{n-p}F_{\alpha}(p,n-p)}\ \cdot\ \sqrt{\frac{s_{kk}}{n}}\\[14pt]
&\textbf{Bonferroni} && \text{solo para las } p \text{ medias originales:}\\[4pt]
&&& \bar{x}_k\ \pm\ t\Big(n-1;\ \frac{\alpha}{2p}\Big)\cdot\sqrt{\frac{s_{kk}}{n}},
    \qquad k=1,\dots,p
\end{aligned}$$</div>

<table class="tbl">
<tr><th></th><th>T² (Roy)</th><th>Bonferroni</th></tr>
<tr><td><strong>Cobertura</strong></td><td>Toda combinación lineal a′μ</td><td>Solo las p medias originales</td></tr>
<tr><td><strong>Ancho</strong></td><td>Más <strong>anchos</strong></td><td>Más <strong>angostos</strong> (más precisos)</td></tr>
<tr><td><strong>Cómo controla α</strong></td><td>Vía la distribución F conjunta</td><td>Reparte α entre las p componentes</td></tr>
<tr><td><strong>Cuándo usar</strong></td><td>Si interesan contrastes/combinaciones arbitrarias</td><td>Si solo interesan las p variables</td></tr>
</table>

<div class="note tip"><span class="nh">✅ ¿Para qué sirven?</span>
<p>Si se rechaza H₀, el intervalo (o la combinación a) que <strong>no contiene el valor bajo μ₀</strong> indica qué variable(s) explican el rechazo. El T² dice «algo pasa»; los IC simultáneos dicen «<em>qué</em> pasa».</p></div>

<h2>8.6 Ejemplo completo: datos «cork»</h2>
<p>Pesos de corteza (centigramos) de <strong>28 alcornoques</strong> en 4 direcciones (N, E, S, W). Fuente: Mardia, Kent &amp; Bibby (1979), Tabla 1.4.1 (datos de Rao, 1948).</p>
<p>H₀: el depósito de corteza es igual en las 4 direcciones. Se traduce en <strong>3 contrastes ortogonales</strong>:</p>

<pre class="r">cork &lt;- read.csv("cork.csv"); n &lt;- nrow(cork)

R &lt;- rbind(c(1, -1,  1, -1),   <span class="c"># (N+S) - (E+W)</span>
           c(1,  0, -1,  0),   <span class="c"># N - S</span>
           c(0,  1,  0, -1))   <span class="c"># E - W</span>
Y &lt;- as.matrix(cork) %*% t(R)

library(ICSNP)
HotellingsT2(Y, mu = c(0,0,0))

<span class="c"># IC simultáneos 95% por contraste</span>
q &lt;- ncol(Y); yb &lt;- colMeans(Y); S &lt;- cov(Y)
cr &lt;- sqrt(q*(n-1)/(n-q) * qf(.95, q, n-q))
se &lt;- sqrt(diag(S)/n)
cbind(yb - cr*se, yb + cr*se)</pre>

<div class="blk ex"><div class="blk-h">💡 Salida e interpretación</div>
<div class="console">T² = 20.74   F = 6.40   df = (3, 25)   valor-p = <b>0.0023</b>

IC simultáneos 95%        estim.   inferior  superior
  (N+S) − (E+W)            8.86      2.18     15.53   <b>*</b>
  N − S                    0.86     -3.83      5.55
  E − W                    1.00     -4.98      6.98
  (* el intervalo no contiene el 0)</div>
<p><strong>Conclusión:</strong> F = 6.40 &gt; F<sub>0.01</sub>(3,25) = 4.68, p = 0.0023 → se rechaza H₀: el depósito <strong>NO</strong> es igual en las 4 direcciones. Solo el contraste <strong>(N+S) − (E+W)</strong> excluye el 0, así que la diferencia está en el eje norte-sur frente al este-oeste, no entre N y S ni entre E y W.</p></div>

<pre class="r"><span class="c"># Plantilla general para T2 de Hotelling</span>
library(ICSNP); library(MVN); library(car)

mvn(X, mvnTest = "mardia")          <span class="c"># 1) normalidad multivariada</span>
HotellingsT2(X, mu = mu0)           <span class="c"># 2) T2: H0: mu = mu0</span>

<span class="c"># 3) Región de confianza (p = 2)</span>
xbar &lt;- colMeans(X); S &lt;- cov(X); n &lt;- nrow(X)
car::ellipse(center = xbar, shape = S/n,
             radius = sqrt(2*(n-1)/(n-2) * qf(.95, 2, n-2)))

<span class="c"># 4) Críticos para IC simultáneos: T2 y Bonferroni</span>
p   &lt;- ncol(X)
cT2 &lt;- sqrt(p*(n-1)/(n-p) * qf(.95, p, n-p))
cB  &lt;- qt(1 - .05/(2*p), n-1)</pre>

<div class="src">Fuentes: PPT «2. Pruebas de Hipótesis» (diap. 44–53); script «2. Pruebas de Hipótesis. Ejemplos R», bloque 8; Mardia, Kent &amp; Bibby (1979) §5.1–5.5 citado en las láminas.</div>
`
}

];
