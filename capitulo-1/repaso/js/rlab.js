/* ============================================================================
   rlab.js — Laboratorio de R: fundamentos, recetario y lectura de salidas.
   Basado en los scripts del curso + complemento de programación en R.
   ========================================================================== */

window.RLAB = [

/* ─────────────────────────────────────────────────────────────────────── */
{
id:'r1', title:'Fundamentos del lenguaje', icon:'🧱',
desc:'Lo mínimo para no perder tiempo en la prueba: asignación, tipos, vectores, matrices, data frames e indexación.',
html:String.raw`
<h3>Asignación y objetos</h3>
<pre class="r">a1 &lt;- 5          <span class="c"># el operador de asignación es &lt;-  (ALT+60 y ALT+62 si el teclado no lo tiene)</span>
a2 &lt;- "a"        <span class="c"># texto (character)</span>
a3 &lt;- c(1,2,3,4,5)   <span class="c"># c() = "combine", crea un vector</span>
a1               <span class="c"># para "printear" basta escribir el nombre y ejecutar</span>

typeof(a1)       <span class="c"># "double"</span>
typeof(a2)       <span class="c"># "character"</span>
class(a3); length(a3); str(a3)</pre>
<p class="small muted">También funciona <code class="inl">=</code>, pero la convención en R es <code class="inl">&lt;-</code>. Para ejecutar una línea en RStudio: <strong>Ctrl+Enter</strong> (Cmd+Enter en Mac).</p>

<h3>Vectores: creación e indexación</h3>
<pre class="r">x &lt;- c(10, 12, 15, 20, 25)
seq(1, 10, by = 2)       <span class="c"># 1 3 5 7 9</span>
rep(0, 5)                <span class="c"># 0 0 0 0 0</span>
1:10                     <span class="c"># secuencia rápida</span>

x[1]                     <span class="c"># PRIMER elemento — R indexa desde 1, no desde 0</span>
x[c(1,3)]                <span class="c"># elementos 1 y 3</span>
x[-1]                    <span class="c"># TODOS MENOS el primero (índice negativo = excluir)</span>
x[x &gt; 14]                <span class="c"># filtrado lógico</span>

<span class="c"># Las operaciones son VECTORIZADAS: se aplican elemento a elemento</span>
x * 2
x - mean(x)
(x - mean(x)) / sd(x)    <span class="c"># estandarización sin bucles</span></pre>

<div class="note tip"><span class="nh">✅ Vectorización</span>
<p>En R casi nunca necesitas un <code class="inl">for</code>. Todo lo que hicieras elemento a elemento se escribe directo sobre el vector. Esto hace que la estandarización, las diferencias pareadas o el cálculo de un estadístico quepan en una línea.</p></div>

<h3>Matrices</h3>
<pre class="r">matriz &lt;- matrix(c("a","b",
                   "c","d"),
                 nrow = 2,
                 byrow = TRUE)   <span class="c"># byrow=TRUE llena por FILAS (por defecto es por columnas)</span>
matriz

Sigma &lt;- matrix(c(16,6,8,
                   6,9,1,
                   8,1,25), nrow = 3, byrow = TRUE)

<span class="c"># Operaciones matriciales</span>
t(Sigma)          <span class="c"># transpuesta</span>
solve(Sigma)      <span class="c"># INVERSA (no "resolver"): ojo con este nombre</span>
det(Sigma)        <span class="c"># determinante</span>
diag(Sigma)       <span class="c"># extrae la diagonal (= varianzas)</span>
Sigma %*% B       <span class="c"># producto MATRICIAL  (%*%),  distinto de * que es elemento a elemento</span>
eigen(Sigma)      <span class="c"># $values = autovalores, $vectors = autovectores</span></pre>

<div class="note memo"><span class="nh">⚠️ Los tres operadores que se confunden</span>
<p><code class="inl">*</code> = producto <strong>elemento a elemento</strong> · <code class="inl">%*%</code> = producto <strong>matricial</strong> · <code class="inl">solve()</code> = <strong>inversa</strong>. Si calculas T² de Hotelling a mano necesitas los tres.</p></div>

<h3>Data frames</h3>
<pre class="r">v1 &lt;- c(1,2,3); v2 &lt;- c("a","b","c"); v3 &lt;- c(TRUE, TRUE, FALSE)
df1 &lt;- data.frame(v1, v2, v3)
df1

<span class="c"># Acceso a columnas</span>
df1$v1                 <span class="c"># con $ (lo más usado)</span>
df1[["v1"]]
df1[, 1]               <span class="c"># [fila, columna] — vacío = todas</span>
df1[1, ]               <span class="c"># primera fila completa</span>
df1[df1$v1 &gt; 1, ]      <span class="c"># filtrar filas por condición</span>

nrow(df1); ncol(df1); dim(df1); colnames(df1)</pre>

<h3>Preparación de datos que aparece en las pautas</h3>
<pre class="r">restaurant1 &lt;- Restaurant[-1, ]                   <span class="c"># elimina la primera fila (headers duplicados)</span>
restaurant1[] &lt;- lapply(restaurant1, as.numeric)  <span class="c"># convierte TODAS las columnas a numérico</span>
colnames(restaurant1) &lt;- c("empleados_amigables", "lugar_entretenido", ...)

<span class="c"># lapply(objeto, funcion) aplica la función a cada columna y devuelve una lista.</span>
<span class="c"># El truco de asignar a restaurant1[] mantiene la estructura de data.frame.</span></pre>

<h3>Paquetes</h3>
<pre class="r">install.packages("psych")   <span class="c"># SOLO UNA VEZ: queda instalado en el PC</span>
library(psych)              <span class="c"># EN CADA SESIÓN: carga las funciones</span>

<span class="c"># Paquetes del curso:</span>
<span class="c">#   psych  → KMO(), cortest.bartlett(), fa(), fa.parallel(), describe()</span>
<span class="c">#   BSDA   → z.test()</span>
<span class="c">#   ICSNP  → HotellingsT2()</span>
<span class="c">#   MVN    → mvn() (normalidad multivariada, test de Mardia)</span>
<span class="c">#   car    → ellipse() (región de confianza)</span>
<span class="c">#   readxl → read_excel()</span></pre>
<div class="note trap"><span class="nh">🚨 Error clásico</span>
<p>«Si no cargan las librerías, por más instalado que esté no funcionarán» (comentario textual de la pauta de la Ayudantía 1). <code class="inl">install.packages()</code> ≠ <code class="inl">library()</code>.</p></div>

<h3>Ayuda y directorio de trabajo</h3>
<pre class="r">?t.test          <span class="c"># ayuda de una función concreta</span>
??"distribution" <span class="c"># búsqueda por tema</span>
getwd(); setwd("ruta/a/la/carpeta")
<span class="c"># En RStudio: Session &gt; Set Working Directory &gt; To Source File Location</span>

read.csv("cork.csv")
readxl::read_excel("notas.xlsx")</pre>

<div class="src">Fuente: «Ayudantia 1 2026-20 Pauta.R»; scripts del curso.</div>
`},

/* ─────────────────────────────────────────────────────────────────────── */
{
id:'r2', title:'Exploración y gráficos', icon:'📈',
desc:'Datasets incluidos, estadística descriptiva y los gráficos que se piden en las ayudantías.',
html:String.raw`
<h3>Datasets incluidos en R</h3>
<pre class="r">library(datasets)
data(iris);      head(iris);      summary(iris)
data(mtcars);    head(mtcars);    str(mtcars)
data(USArrests); head(USArrests)</pre>
<table class="tbl">
<tr><th>Dataset</th><th>Contenido</th><th>Se usa en</th></tr>
<tr><td><code>iris</code></td><td>150 flores, 4 medidas + especie</td><td>Ayudantía 1 (gráficos)</td></tr>
<tr><td><code>mtcars</code></td><td>32 autos (Motor Trend 1974), 11 variables numéricas</td><td>Ayudantía 1 y ACP (clase 3)</td></tr>
<tr><td><code>USArrests</code></td><td>50 estados EEUU 1973: Murder, Assault, UrbanPop, Rape</td><td>Análisis Factorial (clase 4.2)</td></tr>
</table>

<details class="acc"><summary>Variables de mtcars (por si preguntan por la interpretación)</summary><div>
<ul class="tight">
<li><code class="inl">mpg</code> millas por galón (eficiencia) · <code class="inl">cyl</code> nº de cilindros · <code class="inl">disp</code> cilindrada</li>
<li><code class="inl">hp</code> caballos de fuerza · <code class="inl">drat</code> relación del eje trasero · <code class="inl">wt</code> peso (miles de libras)</li>
<li><code class="inl">qsec</code> tiempo en 1/4 de milla (s) · <code class="inl">vs</code> tipo de motor (0=V, 1=línea)</li>
<li><code class="inl">am</code> transmisión (0=automática, 1=manual) · <code class="inl">gear</code> marchas · <code class="inl">carb</code> carburadores</li>
</ul>
<p>Es ideal para ACP porque tiene 11 variables numéricas, muchas correlacionadas entre sí (cilindros, peso y potencia).</p>
</div></details>

<h3>Estadística descriptiva</h3>
<pre class="r">summary(mtcars)            <span class="c"># mín, Q1, mediana, media, Q3, máx por variable</span>
str(mtcars)                <span class="c"># estructura y tipos</span>

library(psych)
describe(mtcars)           <span class="c"># n, mean, sd, median, trimmed, mad, min, max,</span>
                           <span class="c"># range, skew, kurtosis, se — descriptiva DETALLADA</span>

mean(x); sd(x); var(x); median(x)
IQR(x)                     <span class="c"># rango intercuartílico Q3 - Q1</span>
quantile(x)                <span class="c"># 0%, 25%, 50%, 75%, 100%</span>
range(x); max(x) - min(x)  <span class="c"># rango</span>
table(mtcars$cyl)          <span class="c"># tabla de frecuencias</span></pre>

<div class="note info"><span class="nh">📌 Tres formas de argumentar «cuál muestra tiene mayor dispersión»</span>
<p>La Pauta de la Pregunta 3 pedía justificar con <strong>dos enfoques distintos</strong> y aceptaba: (1) comparar <strong>varianzas</strong> de la matriz de covarianza; (2) comparar el <strong>rango intercuartílico</strong> Q3−Q1; (3) comparar el <strong>rango</strong> máx−mín. Cada una valía 0.25 pts.</p></div>

<h3>Gráficos base</h3>
<pre class="r"><span class="c"># Dispersión</span>
plot(datos$Altura_cm, datos$Peso_kg,
     xlab = "Altura (cm)", ylab = "Peso (kg)",
     main = "Diagrama de dispersión", pch = 19, col = "red")

<span class="c"># plot() sobre un data.frame completo → matriz de dispersión (scatterplot matrix)</span>
plot(df1)

<span class="c"># plot(factor, numerica) → boxplots por categoría</span>
plot(iris$Species, iris$Petal.Width)

<span class="c"># Histograma con filtro, título, color y nº de barras</span>
hist(mtcars$wt[mtcars$cyl == 8],
     main = "Peso de vehículos con 8 cilindros",
     col = "red", breaks = 9)

<span class="c"># Barras: primero hay que TABULAR</span>
cilindros &lt;- table(mtcars$cyl)
barplot(cilindros)

boxplot(matematicas, fisica, names = c("Mat","Fís"))</pre>
<div class="note trap"><span class="nh">🚨 Detalle de la pauta de la Ayudantía 1</span>
<p><code class="inl">barplot(mtcars$cyl)</code> «no permite desprender información útil, por lo que hay que transformar la variable»: <code class="inl">barplot</code> espera <strong>alturas ya tabuladas</strong>, no los datos crudos. Por eso primero <code class="inl">table()</code>.</p></div>

<h3>Parámetros gráficos útiles</h3>
<table class="tbl">
<tr><th>Argumento</th><th>Qué hace</th></tr>
<tr><td><code>main =</code></td><td>Título del gráfico</td></tr>
<tr><td><code>xlab =</code>, <code>ylab =</code></td><td>Etiquetas de los ejes</td></tr>
<tr><td><code>col =</code></td><td>Color ("red", "blue"…)</td></tr>
<tr><td><code>pch = 19</code></td><td>Círculos rellenos (por defecto son huecos)</td></tr>
<tr><td><code>breaks = 9</code></td><td>Nº aproximado de barras del histograma</td></tr>
<tr><td><code>abline(h = 1, col="red", lty=2)</code></td><td>Línea horizontal punteada (ej. referencia de Kaiser)</td></tr>
</table>

<div class="src">Fuente: «Ayudantia 1 2026-20 Pauta.R»; «Ayudantía 1 2026-20 Enunciado» Parte I.</div>
`},

/* ─────────────────────────────────────────────────────────────────────── */
{
id:'r3', title:'Recetario: pruebas de hipótesis', icon:'🧪',
desc:'Todas las pruebas del capítulo 2, listas para copiar, con la salida esperada.',
html:String.raw`
<h3>Media, una muestra</h3>
<pre class="r"><span class="c"># t bilateral: H0: mu = 10  vs  H1: mu != 10</span>
t.test(x, mu = 10, alternative = "two.sided", conf.level = 0.95)

<span class="c"># Unilaterales</span>
t.test(x, mu = 10, alternative = "greater")   <span class="c"># H1: mu &gt; 10</span>
t.test(x, mu = 10, alternative = "less")      <span class="c"># H1: mu &lt; 10</span>

<span class="c"># z (sigma CONOCIDA)</span>
library(BSDA)
z.test(x = x, mu = 10, sigma.x = 2.0, alternative = "greater", conf.level = 0.95)</pre>

<h3>Proporción</h3>
<pre class="r">X &lt;- 78; n &lt;- 120; p0 &lt;- 0.60
phat &lt;- X/n
n*p0; n*(1-p0)                                <span class="c"># verificar &gt;= 5</span>

z_obs &lt;- (phat - p0)/sqrt(p0*(1-p0)/n)        <span class="c"># manual</span>
1 - pnorm(z_obs)                              <span class="c"># p-valor cola derecha</span>

prop.test(78, 120, 0.6, "greater", correct = FALSE)   <span class="c"># directo</span></pre>
<p class="small muted"><code class="inl">prop.test</code> devuelve <strong>X-squared = z²</strong> y el mismo p-valor. <code class="inl">correct = FALSE</code> desactiva la corrección de continuidad para que coincida con el cálculo manual.</p>

<h3>Varianza (no hay función built-in)</h3>
<pre class="r">n &lt;- length(x); s2 &lt;- var(x); sigma2_0 &lt;- 4; alpha &lt;- 0.05

chi_obs  &lt;- (n - 1) * s2 / sigma2_0
chi_crit &lt;- qchisq(1 - alpha, df = n - 1)        <span class="c"># unilateral derecha</span>
p_value  &lt;- 1 - pchisq(chi_obs, df = n - 1)

<span class="c"># Bilateral: DOS valores críticos (la chi2 no es simétrica)</span>
qchisq(c(alpha/2, 1 - alpha/2), df = n - 1)</pre>

<h3>Dos muestras</h3>
<pre class="r"><span class="c"># 1) Comparar varianzas (paso previo)</span>
var.test(A, B)                                  <span class="c"># bilateral</span>
var.test(A, B, alternative = "greater")         <span class="c"># H1: var(A) &gt; var(B)</span>

<span class="c"># 2) Comparar medias</span>
t.test(A, B, var.equal = FALSE)                 <span class="c"># Welch — DEFAULT y recomendado</span>
t.test(A, B, var.equal = TRUE)                  <span class="c"># pooled</span>
t.test(A, B, paired = TRUE)                     <span class="c"># pareadas</span>

<span class="c"># 3) Con diferencia bajo H0 distinta de cero (D0 = 2)</span>
t.test(antes - 2, despues, alternative = "greater", paired = TRUE)
<span class="c"># equivalente:</span>
t.test(antes, despues, mu = 2, alternative = "greater", paired = TRUE)</pre>

<h3>Correlación</h3>
<pre class="r">cor(x, y)                                <span class="c"># solo el coeficiente</span>
cor.test(x, y, method = "pearson")       <span class="c"># r + IC + p-valor para H0: rho = 0</span>

<span class="c"># Estadístico manual</span>
r &lt;- cor(x, y); n &lt;- length(x)
tval &lt;- r * sqrt((n - 2)/(1 - r^2))
qt(0.975, n - 2)                         <span class="c"># crítico bilateral</span>

<span class="c"># Matrices</span>
S &lt;- cov(df); R &lt;- cor(df); eigen(S)</pre>

<h3>Bartlett (correlación global)</h3>
<pre class="r">library(psych)
cortest.bartlett(cor(notas), n = 30)     <span class="c"># desde matriz de correlación (dar n)</span>
cortest.bartlett(datos)                  <span class="c"># desde datos crudos</span>

<span class="c"># Manual</span>
n &lt;- nrow(df); p &lt;- ncol(df); gl &lt;- p*(p-1)/2
bart &lt;- -(n - 1 - (2*p + 5)/6) * log(det(cor(df)))
bart; qchisq(0.95, gl)                   <span class="c"># si bart &gt; critico → se rechaza H0</span></pre>

<h3>T² de Hotelling</h3>
<pre class="r">library(ICSNP); library(MVN); library(car)

mvn(X, mvnTest = "mardia")               <span class="c"># normalidad multivariada</span>
HotellingsT2(X, mu = mu0)                <span class="c"># T2, F y valor-p</span>

<span class="c"># IC simultáneos T2 y Bonferroni</span>
n &lt;- nrow(X); p &lt;- ncol(X)
cT2 &lt;- sqrt(p*(n-1)/(n-p) * qf(.95, p, n-p))
cB  &lt;- qt(1 - .05/(2*p), n-1)
xbar &lt;- colMeans(X); S &lt;- cov(X); se &lt;- sqrt(diag(S)/n)
cbind(inferior = xbar - cT2*se, superior = xbar + cT2*se)</pre>

<h3>Valores críticos y potencia</h3>
<pre class="r">qt(0.95, 100)        <span class="c"># t al 95% con 100 gl</span>
qchisq(0.95, 100)    <span class="c"># chi2 al 95% con 100 gl</span>
qf(0.95, 22, 27)     <span class="c"># F al 95% con (22,27) gl</span>
qnorm(0.975)         <span class="c"># 1.959964</span>

<span class="c"># Beta y potencia (sigma conocida, bilateral)</span>
se &lt;- sigma/sqrt(n); zc &lt;- qnorm(1 - alpha/2)
lo &lt;- mu0 - zc*se;  hi &lt;- mu0 + zc*se
beta &lt;- pnorm(hi, mu_real, se) - pnorm(lo, mu_real, se)
potencia &lt;- 1 - beta

<span class="c"># También existe la función dedicada:</span>
power.t.test(n = 20, delta = 0.005, sd = 0.02, sig.level = 0.05)</pre>

<div class="src">Fuente: «2. Pruebas de Hipótesis. Ejemplos R(1).R»; «Ayudantia 1 y 3 Pauta.R»; PPT capítulo 2.</div>
`},

/* ─────────────────────────────────────────────────────────────────────── */
{
id:'r4', title:'Leer las salidas de R', icon:'🔍',
desc:'Anatomía línea por línea de t.test, var.test, prop.test y summary(pca). Esto es lo que pide la pregunta 3.',
html:String.raw`
<h3><code class="inl">t.test()</code> — una muestra</h3>
<div class="console">	One Sample t-test

data:  x
<b>t = 2.048</b>, <b>df = 24</b>, <b>p-value = 0.0517</b>
alternative hypothesis: true mean is not equal to 10
95 percent confidence interval:
 <b>9.994431 11.479250</b>
sample estimates:
mean of x
 <b>10.73684</b></div>
<table class="tbl">
<tr><th>Elemento</th><th>Qué es</th><th>Cómo usarlo</th></tr>
<tr><td><code>t</code></td><td>Estadístico observado</td><td>Comparar con el crítico <code>qt()</code> si te piden región de rechazo</td></tr>
<tr><td><code>df</code></td><td>Grados de libertad</td><td>n−1 (una muestra) · n₁+n₂−2 (pooled) · decimal ⟹ es <strong>Welch</strong></td></tr>
<tr><td><code>p-value</code></td><td>p-valor</td><td><strong>p ≤ α → rechazar H₀</strong></td></tr>
<tr><td><code>alternative hypothesis</code></td><td>Confirma qué H₁ se probó</td><td>Verifica que sea la que pedía el enunciado</td></tr>
<tr><td><code>confidence interval</code></td><td>IC para el parámetro</td><td>Si <strong>NO contiene μ₀ (o D₀) → se rechaza</strong>. Si contiene → no se rechaza</td></tr>
<tr><td><code>sample estimates</code></td><td>Estimación puntual</td><td>Da la magnitud y la <strong>dirección</strong> del efecto</td></tr>
</table>
<div class="note tip"><span class="nh">✅ Truco de lectura rápida</span>
<p>En una prueba unilateral el IC tiene un extremo <strong>Inf</strong> o <strong>−Inf</strong>. Si ves <code class="inl">[10.189, Inf)</code> es una prueba de cola derecha, y como 10 queda fuera del intervalo, se rechaza H₀.</p></div>

<h3><code class="inl">t.test()</code> — dos muestras</h3>
<div class="console">	Welch Two Sample t-test
<b>t = -7.781</b>, <b>df = 18.55</b>, <b>p-value &lt; 0.0001</b>
alternative hypothesis: true difference in means is less than 0
sample estimates:
mean of x  mean of y
  <b>14.408</b>    <b>16.470</b></div>
<ul class="tight">
  <li><strong>«Welch Two Sample t-test»</strong> en el encabezado ⟹ se usó <code class="inl">var.equal = FALSE</code>. Si dijera <strong>«Two Sample t-test»</strong> a secas, es <strong>pooled</strong>. Si dice <strong>«Paired t-test»</strong>, son datos pareados.</li>
  <li><strong>df decimal</strong> (18.55) es la firma inconfundible de Welch.</li>
  <li>El <strong>signo de t</strong> depende del orden de los argumentos: <code class="inl">t.test(A, B)</code> mira A − B.</li>
</ul>

<h3><code class="inl">var.test()</code></h3>
<div class="console">	F test to compare two variances
<b>F = 8.924</b>, num df = 11, denom df = 9, <b>p-value = 0.001388</b>
95 percent confidence interval:
 <b>2.876    Inf</b>
sample estimates:
ratio of variances
      <b>8.924</b></div>
<p>Lectura: la varianza de A es ~8.9 veces la de B. p = 0.0014 &lt; 0.05 → se rechaza H₀: σ₁² = σ₂² → hay que usar <strong>Welch</strong> para comparar las medias. El IC de la razón <strong>no contiene el 1</strong>, lo que confirma el rechazo.</p>
<div class="note info"><span class="nh">📌 El «1» es el valor de referencia</span>
<p>En <code class="inl">var.test</code> el parámetro es un <strong>cociente</strong>, así que la hipótesis nula es «razón = 1». Por eso el criterio del IC es el 1, no el 0.</p></div>

<h3><code class="inl">prop.test()</code></h3>
<div class="console">	1-sample proportions test without continuity correction
data:  78 out of 120, null probability 0.6
<b>X-squared = 1.25</b>, df = 1, <b>p-value = 0.1318</b>
alternative hypothesis: true p is greater than 0.6
95 percent confidence interval:
 <b>0.5757906 1.0000000</b></div>
<p>X-squared = z² (1.118² = 1.25). p = 0.1318 &gt; 0.05 → no se rechaza H₀: p̂ = 0.65 no difiere significativamente de 0.60. El IC unilateral llega hasta 1.0000 y contiene 0.6.</p>

<h3><code class="inl">summary(pca)</code></h3>
<div class="console">Importance of components:
                          PC1     PC2      PC3      PC4
Standard deviation     1.4617  0.9909   0.8623  0.37143
Proportion of Variance 0.5341  0.2455   0.1859  0.03449
Cumulative Proportion  0.5341  0.7796   0.9655  1.00000</div>
<ul class="tight">
  <li><strong>Standard deviation = √λ.</strong> Kaiser se aplica sobre λ = sd², no sobre la sd.</li>
  <li><strong>Proportion of Variance</strong>: cuánto explica cada componente por separado.</li>
  <li><strong>Cumulative Proportion</strong>: dónde se cruza el 80% te dice cuántos componentes retener por ese criterio.</li>
</ul>

<h3><code class="inl">KMO()</code> y <code class="inl">cortest.bartlett()</code></h3>
<div class="console">Kaiser-Meyer-Olkin factor adequacy
<b>Overall MSA =  0.82</b>
MSA for each item =
  Matematicas  Fisica  Quimica  Historia  Lenguaje  Ingles
         0.79    0.85     0.88      0.81      0.83    0.80

$chisq  [1] 152.4    $p.value [1] 2.3e-24    $df [1] 15</div>
<ul class="tight">
  <li><strong>Overall MSA = 0.82</strong> &gt; 0.6 → muy adecuado para AF (categoría <em>meritorious</em>).</li>
  <li><strong>MSA por ítem</strong>: una variable con MSA bajo (ej. UrbanPop = 0.49 en USArrests) es candidata a eliminarse.</li>
  <li>Bartlett con <strong>p muy pequeño</strong> → se rechaza H₀: R = I → sí hay correlaciones → AF apropiado.</li>
</ul>

<h3><code class="inl">fa()</code> — cabecera de la salida</h3>
<div class="console">                ML1   ML2    h2     u2  com
Matematicas    0.12  0.49  0.26  0.737  1.1
Quimica        0.55  0.83  1.00  0.005  2.0
Historia       0.96  0.15  0.95  0.050  1.0
...
                        ML1   ML2
SS loadings            2.57  1.24
Proportion Var         0.43  0.21
Proportion Explained   0.67  0.33

Mean item complexity =  1.5
Likelihood Chi Square =  1.21   with prob &lt;  0.88
RMSR = 0.02   RMSEA = 0.00   TLI = 1.114</div>
<p>Ver el <a href="#/aprender/m12">módulo 12</a> para la tabla completa de interpretación. El resumen: cargas ≥0.5 moderadas / ≥0.7 fuertes; <strong>h²</strong> comunalidad; <strong>u²</strong> unicidad; <strong>com</strong> complejidad (ideal ≈1); <strong>prob &gt; 0.05</strong> en el χ² significa que ese número de factores <em>basta</em>.</p>

<div class="src">Fuentes: salidas reproducidas de los PPT del curso, de «2. Pruebas de Hipótesis. Ejemplos R» y de «Ayudantia 3 2026-20 Pauta R.R».</div>
`},

/* ─────────────────────────────────────────────────────────────────────── */
{
id:'r5', title:'ACP y Análisis Factorial en R', icon:'🧬',
desc:'Los dos flujos completos, de la adecuación de datos a la interpretación.',
html:String.raw`
<h3>Flujo completo de ACP</h3>
<pre class="r"><span class="c"># ── 1. Datos y chequeo previo ──────────────────────────────</span>
datos &lt;- mtcars
R &lt;- cor(datos)
library(psych)
cortest.bartlett(R, n = nrow(datos))    <span class="c"># queremos RECHAZAR H0: R = I</span>

<span class="c"># ── 2. Ajuste ──────────────────────────────────────────────</span>
pca &lt;- prcomp(datos, scale. = TRUE)     <span class="c"># scale.=TRUE → matriz de CORRELACIÓN</span>

<span class="c"># ── 3. ¿Cuántos componentes? ───────────────────────────────</span>
summary(pca)                            <span class="c"># varianza explicada y acumulada (regla del 80%)</span>
autovalores &lt;- pca$sdev^2               <span class="c"># regla de Kaiser: cuáles son &gt; 1</span>
autovalores
screeplot(pca, type = "lines")          <span class="c"># criterio del codo</span>
screeplot(pca, type = "barplot"); abline(h = 1, col = "red", lty = 2)

<span class="c"># ── 4. Interpretación ──────────────────────────────────────</span>
pca$rotation                            <span class="c"># loadings completos</span>
round(pca$rotation[, 1:2], 3)           <span class="c"># solo PC1 y PC2, redondeados</span>

<span class="c"># ── 5. Proyección y visualización ──────────────────────────</span>
pca$x[, 1:2]                            <span class="c"># scores</span>
biplot(pca, scale = 0)

<span class="c"># ── 6. Puntuar una observación NUEVA ───────────────────────</span>
predict(pca, newdata = nuevo)[, 1]      <span class="c"># forma correcta: reaplica center y scale</span>
<span class="c"># equivalente manual:</span>
z &lt;- (as.numeric(nuevo) - pca$center) / pca$scale
sum(z * pca$rotation[, 1])</pre>

<div class="note memo"><span class="nh">⚠️ prcomp vs princomp</span>
<table class="tbl">
<tr><th></th><th><code>prcomp()</code></th><th><code>princomp()</code></th></tr>
<tr><td>Método</td><td>Descomposición en <strong>valores singulares (SVD)</strong> de la matriz de datos</td><td>Descomposición <strong>espectral</strong> de la matriz de covarianza</td></tr>
<tr><td>Estandarizar</td><td><code>scale. = TRUE</code></td><td><code>cor = TRUE</code></td></tr>
<tr><td>Loadings</td><td><code>$rotation</code></td><td><code>$loadings</code></td></tr>
<tr><td>Scores</td><td><code>$x</code></td><td><code>$scores</code></td></tr>
<tr><td>Divisor de la varianza</td><td>n − 1</td><td>n</td></tr>
<tr><td>Caso n &lt; p</td><td>Lo maneja</td><td>Falla</td></tr>
</table>
<p><strong>Usa <code class="inl">prcomp</code></strong>: mejor precisión numérica y es el que usan los scripts del curso.</p>
<div class="src">Complemento: <a href="https://www.sthda.com/english/articles/31-principal-component-methods-in-r-practical-guide/118-principal-component-analysis-in-r-prcomp-vs-princomp/" target="_blank" rel="noopener">STHDA, «PCA in R: prcomp vs princomp»</a> (búsqueda en internet).</div></div>

<h3>Flujo completo de Análisis Factorial</h3>
<pre class="r">library(psych)

<span class="c"># ── 1. Datos estandarizados ────────────────────────────────</span>
data("USArrests")
datos &lt;- scale(USArrests)               <span class="c"># media 0, varianza 1</span>

<span class="c"># ── 2. ¿Los datos sirven para AF? ──────────────────────────</span>
KMO(datos)                              <span class="c"># Overall MSA &gt; 0.6 → adecuado</span>
                                        <span class="c"># revisar también el MSA por variable</span>
cortest.bartlett(datos)                 <span class="c"># p &lt; 0.05 → hay correlaciones → OK</span>

<span class="c"># ── 3. ¿Cuántos factores? ──────────────────────────────────</span>
fa.parallel(datos, fa = "fa")           <span class="c"># azul = eigenvalores reales</span>
                                        <span class="c"># rojo = simulados; conservar los reales &gt; simulados</span>

<span class="c"># ── 4. Extracción con rotación ORTOGONAL ───────────────────</span>
fa_modelo &lt;- fa(datos, nfactors = 2, rotate = "varimax")
fa_modelo
fa_modelo$communality                   <span class="c"># h2 por variable</span>

<span class="c"># Con método de estimación explícito (el de la pauta de ayudantía)</span>
fa_model &lt;- fa(notas, nfactors = 2, rotate = "varimax", fm = "ml")

<span class="c"># ── 5. Rotación OBLICUA (factores correlacionados) ─────────</span>
fa_promax &lt;- fa(datos, nfactors = 2, rotate = "promax")
fa_promax</pre>

<table class="tbl">
<tr><th>Argumento de <code>fa()</code></th><th>Opciones</th><th>Qué significa</th></tr>
<tr><td><code>nfactors</code></td><td>1, 2, 3…</td><td>Número de factores a extraer</td></tr>
<tr><td><code>rotate</code></td><td><code>"varimax"</code>, <code>"quartimax"</code>, <code>"equamax"</code></td><td>Rotaciones <strong>ortogonales</strong> (factores no correlacionados)</td></tr>
<tr><td><code>rotate</code></td><td><code>"oblimin"</code>, <code>"promax"</code></td><td>Rotaciones <strong>oblicuas</strong> (factores correlacionados)</td></tr>
<tr><td><code>rotate</code></td><td><code>"none"</code></td><td>Sin rotar (solución de extracción cruda)</td></tr>
<tr><td><code>fm</code></td><td><code>"ml"</code></td><td>Máxima verosimilitud (asume normalidad; da el χ² de ajuste)</td></tr>
<tr><td><code>fm</code></td><td><code>"pa"</code></td><td>Ejes principales</td></tr>
<tr><td><code>fm</code></td><td><code>"minres"</code></td><td>Residuo mínimo (default de psych)</td></tr>
</table>

<h3>Objetos útiles del resultado</h3>
<pre class="r">fa_modelo$loadings      <span class="c"># matriz de cargas factoriales</span>
fa_modelo$communality   <span class="c"># h2</span>
fa_modelo$uniquenesses  <span class="c"># u2</span>
fa_modelo$scores        <span class="c"># puntajes factoriales por observación</span>
fa_modelo$Phi           <span class="c"># correlaciones entre factores (solo rotación oblicua)</span>

pca$sdev                <span class="c"># raíces de los autovalores</span>
pca$rotation            <span class="c"># loadings</span>
pca$x                   <span class="c"># scores</span>
pca$center; pca$scale   <span class="c"># medias y sd usadas al estandarizar</span></pre>

<div class="src">Fuentes: scripts «3. ACP», «4.1» y «4.2 Análisis Factorial. Ejemplos R»; «Ayudantia 3 2026-20 Pauta R.R»; PPT capítulos 3 y 4.</div>
`},

/* ─────────────────────────────────────────────────────────────────────── */
{
id:'r6', title:'Errores frecuentes en R', icon:'🐞',
desc:'Los mensajes que te van a aparecer y qué significan realmente.',
html:String.raw`
<table class="tbl">
<tr><th>Síntoma / mensaje</th><th>Causa</th><th>Solución</th></tr>
<tr><td><code>could not find function "KMO"</code></td><td>Paquete instalado pero <strong>no cargado</strong></td><td><code>library(psych)</code> al inicio de la sesión</td></tr>
<tr><td><code>there is no package called 'BSDA'</code></td><td>Nunca se instaló</td><td><code>install.packages("BSDA")</code> (una sola vez)</td></tr>
<tr><td><code>cannot open file 'cork.csv'</code></td><td>Directorio de trabajo incorrecto</td><td><code>getwd()</code> para ver dónde estás; en RStudio: <em>Session &gt; Set Working Directory &gt; To Source File Location</em></td></tr>
<tr><td>El ACP da resultados absurdos (PC1 = una sola variable)</td><td>Falta estandarizar: la variable de mayor varianza absoluta domina</td><td><code>prcomp(datos, scale. = TRUE)</code></td></tr>
<tr><td><code>NA/NaN/Inf in foreign function call</code> en <code>fa()</code></td><td>Hay <strong>NA</strong> en los datos, o columnas de texto</td><td><code>lapply(df, as.numeric)</code>; revisar con <code>sum(is.na(df))</code>; usar <code>na.omit(df)</code></td></tr>
<tr><td><code>x must be numeric</code></td><td>La columna se leyó como texto o factor</td><td><code>df[] &lt;- lapply(df, as.numeric)</code></td></tr>
<tr><td>El p-valor de <code>prop.test</code> no coincide con el manual</td><td>Corrección de continuidad activada por defecto</td><td>Agregar <code>correct = FALSE</code></td></tr>
<tr><td><code>t.test</code> da un signo t distinto al esperado</td><td>El orden de los argumentos define la resta (A − B)</td><td>Invertir el orden o ajustar <code>alternative</code></td></tr>
<tr><td>El <code>df</code> de <code>t.test</code> es decimal</td><td>Es la prueba de <strong>Welch</strong> (default)</td><td>Si querías pooled: <code>var.equal = TRUE</code></td></tr>
<tr><td><code>system is computationally singular</code> en <code>solve()</code></td><td>Matriz con variables perfectamente colineales o n &lt; p</td><td>Eliminar variables redundantes; verificar <code>det()</code></td></tr>
<tr><td>Los resultados cambian cada vez que ejecuto</td><td>Simulación sin semilla</td><td><code>set.seed(123)</code> antes de <code>rnorm()</code> u otras funciones aleatorias</td></tr>
<tr><td><code>barplot</code> no muestra nada útil</td><td>Se pasaron datos crudos en vez de frecuencias</td><td><code>barplot(table(x))</code></td></tr>
</table>

<h3>Buenas prácticas para la prueba</h3>
<ul class="tight">
  <li><strong>Comenta tus decisiones.</strong> Las pautas dan puntaje por «usa el código correcto de R»: un comentario que explique <em>por qué</em> elegiste <code class="inl">alternative = "greater"</code> demuestra que entendiste la hipótesis.</li>
  <li><strong>Fija la semilla</strong> con <code class="inl">set.seed()</code> si simulas, para que tus números sean reproducibles.</li>
  <li><strong>Redondea al presentar</strong>: <code class="inl">round(x, 4)</code>, pero <strong>calcula con todos los decimales</strong>.</li>
  <li><strong>Verifica el resultado por dos vías</strong> cuando puedas: p-valor <em>y</em> valor crítico; función directa <em>y</em> cálculo manual. Las pautas del curso hacen exactamente eso.</li>
  <li><strong>Nombra objetos con sentido</strong>: <code class="inl">chi_obs</code>, <code class="inl">F_crit</code>, <code class="inl">p_value</code> se leen solos.</li>
</ul>

<div class="note tip"><span class="nh">✅ Estructura de respuesta cuando piden «interprete la salida de R»</span>
<ol class="tight">
  <li><strong>Qué prueba/modelo es</strong> (lo dice el encabezado de la salida).</li>
  <li><strong>Las hipótesis</strong> que se están contrastando.</li>
  <li><strong>El número clave</strong>, citado literalmente (p-value = 0.0014, Overall MSA = 0.82, PC1 explica 53.41%…).</li>
  <li><strong>La decisión</strong>, comparando con α o con el umbral que corresponda.</li>
  <li><strong>La conclusión en el contexto del problema</strong>, en una frase.</li>
</ol></div>
`}

];
