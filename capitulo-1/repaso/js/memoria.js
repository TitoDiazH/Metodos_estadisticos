/* ============================================================================
   memoria.js — "Lo que tengo que memorizar": fórmulas, umbrales, criterios,
   tablas de decisión y flashcards. Resumen de última hora.
   ========================================================================== */

window.MEMORIA = [

{
  title: 'Fórmulas — estadísticos de prueba',
  icon: '📐',
  rows: [
    ['t, media, σ desconocida', String.raw`\(t=\dfrac{\bar{x}-\mu_0}{s/\sqrt{n}}\)&nbsp;&nbsp; gl = <b>n − 1</b>`],
    ['z, media, σ conocida', String.raw`\(z=\dfrac{\bar{x}-\mu_0}{\sigma/\sqrt{n}}\)&nbsp;&nbsp; \(N(0,1)\)`],
    ['z, proporción', String.raw`\(z=\dfrac{\hat{p}-p_0}{\sqrt{p_0(1-p_0)/n}}\)&nbsp;&nbsp; requisito: <b>\(np_0\ge 5\)</b> y <b>\(n(1-p_0)\ge 5\)</b>`],
    ['χ², varianza', String.raw`\(\chi^{2}=\dfrac{(n-1)s^{2}}{\sigma_0^{2}}\)&nbsp;&nbsp; gl = <b>n − 1</b>`],
    ['F, cociente de varianzas', String.raw`\(F=\dfrac{s_1^{2}}{s_2^{2}}\)&nbsp;&nbsp; gl = <b>(n₁−1, n₂−1)</b>`],
    ['t pooled (var. iguales)', String.raw`\(S_p^{2}=\dfrac{(n_1-1)s_1^{2}+(n_2-1)s_2^{2}}{n_1+n_2-2}\)<br>\(t=\dfrac{\bar{x}_2-\bar{x}_1-D_0}{\sqrt{S_p^{2}\left(\frac{1}{n_1}+\frac{1}{n_2}\right)}}\)&nbsp;&nbsp; gl = <b>n₁+n₂−2</b>`],
    ['t de Welch (var. distintas)', String.raw`\(t=\dfrac{\bar{x}_2-\bar{x}_1-D_0}{\sqrt{\frac{s_1^{2}}{n_1}+\frac{s_2^{2}}{n_2}}}\)&nbsp;&nbsp; gl de Welch (puede no ser entero)`],
    ['t pareada', String.raw`\(t=\dfrac{\bar{d}-D_0}{s_d/\sqrt{n}}\)&nbsp;&nbsp; gl = <b>n − 1</b>, con \(d=\text{Antes}-\text{Después}\)`],
    ['z, diferencia de proporciones<br><span class="small muted">H₀: p₁ = p₂ (pooled)</span>', String.raw`\(Z=\dfrac{\hat{p}_1-\hat{p}_2}{\sqrt{\hat{p}\hat{q}\left(\frac{1}{n_1}+\frac{1}{n_2}\right)}}\)<br>con <b>\(\hat{p}=\dfrac{x_1+x_2}{n_1+n_2}\)</b> · requisitos: \(n_1\hat{p}_1, n_1\hat{q}_1, n_2\hat{p}_2, n_2\hat{q}_2 \ge 5\)`],
    ['z, diferencia de proporciones<br><span class="small muted">H₀: p₁ − p₂ = D₀ ≠ 0 (sin combinar)</span>', String.raw`\(Z=\dfrac{(\hat{p}_1-\hat{p}_2)-D_0}{\sqrt{\frac{\hat{p}_1\hat{q}_1}{n_1}+\frac{\hat{p}_2\hat{q}_2}{n_2}}}\)`],
    ['t de correlación', String.raw`\(t=r\sqrt{\dfrac{n-2}{1-r^{2}}}\)&nbsp;&nbsp; gl = <b>n − 2</b>`],
    ['χ² de Bartlett', String.raw`\(\chi^{2}=-\left(n-1-\dfrac{2p+5}{6}\right)\ln|R|\)&nbsp;&nbsp; gl = <b>p(p−1)/2</b>`],
    ['T² de Hotelling', String.raw`\(T^{2}=n(\bar{x}-\mu_0)'S^{-1}(\bar{x}-\mu_0)\)<br>Rechazar si \(T^{2}\gt \dfrac{(n-1)p}{n-p}F_{\alpha}(p,\,n-p)\)`]
  ]
},

{
  title: 'Fórmulas — descriptivas y transformaciones',
  icon: '🔢',
  rows: [
    ['Covarianza muestral', String.raw`\(\operatorname{Cov}(X,Y)=\dfrac{1}{n-1}\sum_i (x_i-\bar{x})(y_i-\bar{y})\)`],
    ['Correlación de Pearson', String.raw`\(r=\dfrac{\operatorname{Cov}(X,Y)}{\sqrt{\operatorname{Var}(X)\operatorname{Var}(Y)}}\)`],
    ['Varianza como covarianza', String.raw`\(\operatorname{Var}(X)=\operatorname{Cov}(X,X)\)`],
    ['Estandarización (z-score)', String.raw`\(z=\dfrac{x-\bar{x}}{s}\)&nbsp;→&nbsp; media <b>0</b>, sd <b>1</b>`],
    ['Normalización min-máx', String.raw`\(w=\dfrac{x-x_{\min}}{x_{\max}-x_{\min}}\)&nbsp;→&nbsp; rango <b>[0,1]</b><br>Inversa: <b>\(x=w(x_{\max}-x_{\min})+x_{\min}\)</b>`],
    ['Escalamiento robusto', String.raw`\(w=\dfrac{x-\operatorname{Mediana}(x)}{\operatorname{IQR}(x)}\)&nbsp;→&nbsp; resistente a outliers`],
    ['Normalización L2', String.raw`\(w=\dfrac{x}{\sqrt{\sum x_i^{2}}}\)&nbsp;→&nbsp; la <b>norma</b> queda en 1`],
    ['Escalamiento por cuantiles', String.raw`\(w_i=\dfrac{i}{n}\)&nbsp; (i = posición al ordenar de menor a mayor)`],
    ['Softmax', String.raw`\(w_i=\dfrac{e^{x_i}}{\sum_j e^{x_j}}\)&nbsp;→&nbsp; los pesos <b>suman</b> 1`],
    ['Distancia euclídea', String.raw`\(d=\sqrt{\sum_j (a_j-b_j)^{2}}\)`],
    ['Distancia Manhattan', String.raw`\(d=\sum_j |a_j-b_j|\)`],
    ['Distancia de Mahalanobis', String.raw`\(d^{2}=(x-\mu)'\Sigma^{-1}(x-\mu)\)`],
    ['Similitud coseno', String.raw`\(\cos\theta=\dfrac{X\cdot Y}{\lVert X\rVert\,\lVert Y\rVert}\)&nbsp;· con datos <b>centrados</b> = correlación`],
    ['Combinación lineal normal', String.raw`\(Y=a'X \sim N(a'\mu,\ a'\Sigma a)\)<br>\(\operatorname{Var}(X_1\pm X_2)=\sigma_1^{2}+\sigma_2^{2}\pm 2\sigma_{12}\)`]
  ]
},

{
  title: 'Umbrales y criterios numéricos',
  icon: '🎯',
  rows: [
    ['Regla de decisión', '<b>p ≤ α → rechazar H₀</b> &nbsp;·&nbsp; p &gt; α → no rechazar H₀'],
    ['Niveles de α comunes', '0.01 · 0.05 · 0.10 &nbsp;&nbsp;(confianza 90% ⟹ α = 0.10)'],
    ['Requisito de proporciones', 'np₀ ≥ 5 &nbsp;y&nbsp; n(1−p₀) ≥ 5'],
    ['Loadings ACP', '|loading| ≥ <b>0.30</b> relevante · ≥ <b>0.40</b> fuerte'],
    ['Cargas factoriales (AF)', '&gt; |0.4| o &gt; |0.5| significativas<br>≈0.30 débil · ≥0.50 moderada · ≥0.70 fuerte'],
    ['Regla de Kaiser', 'conservar componentes/factores con <b>autovalor &gt; 1</b> (solo con datos estandarizados)'],
    ['% varianza — ACP', 'conservar hasta acumular al menos <b>80%</b>'],
    ['% varianza — AF', 'conservar hasta <b>75–80%</b>'],
    ['KMO (curso)', 'Overall MSA &gt; <b>0.6</b> aceptable · script 4.1: ≥0.75 bien, ≥0.50 aceptable, &lt;0.50 inaceptable'],
    ['KMO (escala de Kaiser)', '0.90+ marvelous · 0.80+ meritorious · 0.70+ middling · 0.60+ mediocre · 0.50+ miserable · &lt;0.50 unacceptable'],
    ['Ajuste del modelo factorial', 'RMSR ideal &lt; 0.05 · RMSEA ideal &lt; 0.05 · TLI cerca de 1 (puede ser &gt;1 con n pequeño)'],
    ['Complejidad (com) en fa()', '≈1 estructura simple (ideal) · 1–2 moderada · &gt;2 compleja'],
    ['Comunalidad h² + unicidad u²', '<b>h² + u² = 1</b> (variables estandarizadas)']
  ]
},

{
  title: 'Valores críticos que aparecen en las pautas',
  icon: '📊',
  rows: [
    ['t(0.05, 19)', '<b>1.73</b> &nbsp;<span class="muted">(consumo eléctrico, PPT)</span>'],
    ['t(0.025, 20)', '<b>2.086</b> &nbsp;<span class="muted">(pooled líneas A/B, Pauta P2)</span>'],
    ['t(0.05, 10)', '<b>1.8125</b> &nbsp;<span class="muted">(colesterol pareado, PPT)</span>'],
    ['t(0.1, 9)', '<b>1.383029</b> &nbsp;<span class="muted">(notas de física, Pauta P3)</span>'],
    ['t(0.05, 26)', '<b>1.7056</b> &nbsp;<span class="muted">(dif. de medias pooled, PPT)</span>'],
    ['t(0.05, 22)', '<b>1.72</b> &nbsp;<span class="muted">(Welch limón, PPT)</span>'],
    ['χ²(0.05, 11)', '<b>19.6751</b> &nbsp;<span class="muted">(varianza Línea B, Pauta P2)</span>'],
    ['χ²(0.05, 23)', '<b>35.172</b> &nbsp;<span class="muted">(tiempos de conexión, PPT)</span>'],
    ['χ²(0.05, 14)', '<b>23.685</b> &nbsp;<span class="muted">(varianza en R, PPT)</span>'],
    ['z(0.05) bilateral', '<b>±1.64</b> &nbsp;<span class="muted">(α = 0.10 bilateral, proporciones)</span>'],
    ['z(0.025) bilateral', '<b>±1.96</b> &nbsp;<span class="muted">(α = 0.05 bilateral)</span>'],
    ['z(0.05) unilateral', '<b>1.645</b> &nbsp;<span class="muted">(esperanza de vida: z<sub>obs</sub>=2.02 &gt; 1.64 → rechazar)</span>'],
    ['<b>Tabla qt del anexo (Pauta P3)</b>', 'qt(0.8, 9)=0.8834 · qt(0.9, 9)=<b>1.383029</b> · qt(0.95, 9)=1.833113 · qt(0.99, 9)=2.821438<br>qt(0.8, 10)=0.8791 · qt(0.9, 10)=1.372184 · qt(0.95, 10)=1.812461 · qt(0.99, 10)=2.763769']
  ]
},

{
  title: 'Salidas de R del curso — números exactos',
  icon: '🖥️',
  rows: [
    ['<b>PCA mtcars</b> — sd', 'PC1 = 2.5707 · PC2 = 1.6280 · PC3 = 0.79196'],
    ['<b>PCA mtcars</b> — autovalores', 'λ₁ = <b>6.608</b> · λ₂ = <b>2.650</b> · λ₃ = 0.627 &nbsp;→ Kaiser retiene <b>2</b>'],
    ['<b>PCA mtcars</b> — varianza', 'PC1 = 60.08% · acumulada PC1+PC2 = <b>84.17%</b> &nbsp;→ los 3 criterios coinciden en 2'],
    ['<b>PCA clientes</b> (Ayudantía 2)', 'sd: 1.4617 / 0.9909 → λ = 2.137 / <b>0.982</b> · acumulada 53.41% / <b>77.96%</b><br>Kaiser y codo → 1 componente; 80% → 3. <b>Los criterios discrepan.</b>'],
    ['<b>KMO USArrests</b>', 'Overall MSA = <b>0.65</b> · Murder 0.62 · Assault 0.64 · UrbanPop <b>0.50</b> · Rape 0.78'],
    ['<b>Bartlett USArrests</b>', 'chisq = <b>88.28815</b> · p = <b>6.87e−17</b> · df = <b>6</b> &nbsp;(= 4·3/2)'],
    ['<b>fa USArrests, varimax</b>', 'Murder .95/.02 · Assault .84/.31 · UrbanPop .06/.67 · Rape .59/.56<br>h² = .90/.80/.45/.66 · SS 1.95/0.86 · Cumulative Var <b>0.70</b>'],
    ['<b>fa USArrests, promax</b>', 'Murder 1.04/−.25 · Assault .84/.10 · UrbanPop −.12/.72 · Rape .49/.45<br>h² = <b>idénticas</b> · SS 2.03/0.78 · Cumulative Var <b>0.70</b> · corr(MR1,MR2) = <b>0.47</b>'],
    ['<b>fa notas</b> (Ayudantía 3)', 'SS 2.57/1.24 · Prop Var .43/.21 (total <b>64%</b>) · Prop Explained .67/.33<br>χ² = 1.21, p = 0.88 → 2 factores bastan · RMSR .02 · RMSEA 0 · TLI 1.114'],
    ['<b>Anexo 1 Pauta P3</b>', 't.test(matematicas, mu=4, "greater") → t = <b>1.5546</b>, df = 9, p = <b>0.07723</b><br>t.test(fisica, mu=5.8, "greater") → t = <b>−0.74765</b>, df = 9, p = <b>0.7631</b>'],
    ['<b>Anexo 2 Pauta P3</b>', 't.test(fisica−0.5, matematicas, paired=TRUE, "greater") → t = <b>1.7281</b>, df = 9, p = <b>0.05902</b>'],
    ['<b>Descriptivas Pauta P3</b>', 'Mat: mín 2.8 · Q1 4.050 · Med 4.550 · media 4.530 · Q3 4.775 · máx 6.8<br>Fís: mín 5.1 · Q1 5.325 · Med 5.550 · media 5.670 · Q3 5.850 · máx 7.0<br>cov: Var(mat)=1.162 · Var(fis)=0.302 · Cov=0.047'],
    ['<b>β máquina 200 ml</b>', 'σ=15, n=9 → se=5 · zona (191, 209) · α = <b>0.0719</b> · β(μ=215) = <b>0.1151</b> · potencia = <b>0.8849</b>']
  ]
},

{
  title: 'Tabla de decisión: ¿qué prueba uso?',
  icon: '🌳',
  rows: [
    ['Media, 1 muestra, σ conocida', 'prueba <b>z</b> &nbsp;·&nbsp; <code>BSDA::z.test(x, mu, sigma.x)</code>'],
    ['Media, 1 muestra, σ desconocida', 'prueba <b>t</b>, gl = n−1 &nbsp;·&nbsp; <code>t.test(x, mu)</code>'],
    ['Proporción, 1 muestra', 'prueba <b>z</b> (verificar np₀≥5) &nbsp;·&nbsp; <code>prop.test(x, n, p, correct=FALSE)</code>'],
    ['Varianza, 1 muestra', '<b>χ²</b>, gl = n−1 &nbsp;·&nbsp; manual con <code>qchisq()</code> / <code>pchisq()</code>'],
    ['Comparar 2 varianzas', '<b>F</b> &nbsp;·&nbsp; <code>var.test(A, B)</code>'],
    ['2 medias, independientes, var. iguales', '<b>t pooled</b> &nbsp;·&nbsp; <code>t.test(A, B, var.equal = TRUE)</code>'],
    ['2 medias, independientes, var. distintas', '<b>t de Welch</b> &nbsp;·&nbsp; <code>t.test(A, B, var.equal = FALSE)</code> ← <i>default y recomendado</i>'],
    ['2 medias, muestras pareadas', '<b>t pareada</b> &nbsp;·&nbsp; <code>t.test(A, B, paired = TRUE)</code>'],
    ['Diferencia bajo H₀ ≠ 0', 'agregar <code>mu = D0</code>, o desplazar una serie: <code>t.test(antes - 2, despues, paired = TRUE)</code>'],
    ['¿Existe correlación entre 2 variables?', 't = r√((n−2)/(1−r²)) &nbsp;·&nbsp; <code>cor.test(x, y)</code>'],
    ['¿Hay correlación global entre p variables?', '<b>Bartlett</b> &nbsp;·&nbsp; <code>psych::cortest.bartlett(R, n)</code>'],
    ['Vector de medias (p variables a la vez)', '<b>T² de Hotelling</b> &nbsp;·&nbsp; <code>ICSNP::HotellingsT2(X, mu)</code>'],
    ['¿Los datos sirven para AF?', '<b>KMO</b> (<code>psych::KMO</code>) + <b>Bartlett</b>']
  ]
},

{
  title: 'Errores tipo I / II y potencia',
  icon: '⚖️',
  rows: [
    ['Error Tipo I', 'Rechazar H₀ siendo verdadera («falsa alarma»). P = <b>α</b>'],
    ['Error Tipo II', 'No rechazar H₀ siendo falsa («no detectar»). P = <b>β</b>'],
    ['Potencia', '<b>1 − β</b> = capacidad de detectar un efecto real'],
    ['Relación α ↔ β', 'Si <b>disminuyo α, aumenta β</b> (y baja la potencia)'],
    ['Efecto de n', 'A mayor <b>n → menor β → mayor potencia</b>. <b>α NO cambia con n</b>'],
    ['De qué depende β', 'de <b>n</b>, de <b>α</b>, de la <b>diferencia real</b> (μ<sub>real</sub> − μ₀) y de la <b>variabilidad σ</b>'],
    ['Cálculo de β en 2 pasos', '(1) hallar x̄<sub>lím</sub> con μ₀ &nbsp;→&nbsp; (2) P(zona de no rechazo | <b>μ<sub>real</sub></b>) &nbsp;<i>recentrar</i>']
  ]
},

{
  title: 'Valores límite (despejar x̄ y s²)',
  icon: '📏',
  rows: [
    ['H₁: μ > μ₀ — no se rechaza si', String.raw`\(\bar{x}\le \mu_0+t_{\alpha,n-1}\dfrac{s}{\sqrt{n}}\)`],
    ['H₁: μ < μ₀ — no se rechaza si', String.raw`\(\bar{x}\ge \mu_0-t_{\alpha,n-1}\dfrac{s}{\sqrt{n}}\)`],
    ['H₁: μ ≠ μ₀ — no se rechaza si', String.raw`\(\mu_0-t_{\alpha/2}\dfrac{s}{\sqrt{n}}\ \le\ \bar{x}\ \le\ \mu_0+t_{\alpha/2}\dfrac{s}{\sqrt{n}}\)`],
    ['H₁: σ² > σ₀² — se rechaza si', String.raw`\(s^{2}\gt \dfrac{\sigma_0^{2}\,\chi^{2}_{1-\alpha,n-1}}{n-1}\)`],
    ['H₁: σ² < σ₀² — se rechaza si', String.raw`\(s^{2}\lt \dfrac{\sigma_0^{2}\,\chi^{2}_{\alpha,n-1}}{n-1}\)`],
    ['H₁: p ≠ p₀ — no se rechaza si', String.raw`\(p_0-z_{\alpha/2}\sqrt{\dfrac{p_0(1-p_0)}{n}}\ \le\ \hat{p}\ \le\ p_0+z_{\alpha/2}\sqrt{\dfrac{p_0(1-p_0)}{n}}\)`]
  ]
},

{
  title: 'ACP y AF — vocabulario exacto',
  icon: '🧬',
  rows: [
    ['Loadings (ACP)', 'pesos v<sub>jℓ</sub> de cada variable en el componente · <code>pca$rotation</code>'],
    ['Scores (ACP)', 'coordenadas ẑ<sub>iℓ</sub> de cada observación · <code>pca$x</code>'],
    ['Autovalor λ<sub>k</sub>', 'varianza explicada por PC<sub>k</sub> · <code>pca$sdev^2</code>'],
    ['Standard deviation (summary)', '<b>√λ</b> — hay que elevar al cuadrado para aplicar Kaiser'],
    ['Comunalidad h²', 'varianza de la variable explicada por los factores comunes'],
    ['Unicidad / especificidad u²', '1 − h². Varianza específica + error'],
    ['Cargas factoriales λ<sub>jk</sub>', 'correlación entre la variable j y el factor k'],
    ['Rotación NO cambia', '<b>comunalidades · especificidades · varianza total explicada</b>'],
    ['Rotación SÍ cambia', 'cómo se reparte la varianza entre factores y la interpretabilidad'],
    ['Rotaciones ortogonales', '<b>Varimax</b> (más usado, simplifica columnas) · Quartimax (filas) · Equamax (mixto)'],
    ['Rotaciones oblicuas', '<b>Oblimin</b> (factores correlacionados) · <b>Promax</b> (Varimax + correlación)'],
    ['Estructura simple (Thurstone, 1935)', 'pocas cargas altas por factor · cada variable en un solo factor · patrones distintos'],
    ['Métodos de extracción (AF)', 'Componentes Principales · Ejes Principales · Máxima Verosimilitud'],
    ['Diferencia de fondo ACP/AF', 'ACP explica la <b>varianza</b>; AF explica las <b>covarianzas/correlaciones</b>'],
    ['Análisis paralelo', 'conservar factores con eigenvalor real &gt; eigenvalor simulado · <code>fa.parallel()</code>']
  ]
},

{
  title: 'R — funciones de distribución',
  icon: '💻',
  rows: [
    ['Valor crítico (cuantil)', '<code>qnorm(1−α)</code> · <code>qt(1−α, gl)</code> · <code>qchisq(1−α, gl)</code> · <code>qf(1−α, gl1, gl2)</code>'],
    ['p-valor cola derecha', '<code>1−pnorm(z)</code> · <code>1−pt(t, gl)</code> · <code>1−pchisq(x, gl)</code> · <code>1−pf(f, gl1, gl2)</code>'],
    ['p-valor cola izquierda', '<code>pnorm(z)</code> · <code>pt(t, gl)</code> · <code>pchisq(x, gl)</code> · <code>pf(f, gl1, gl2)</code>'],
    ['Mnemotecnia', '<b>q</b>uantile → valor crítico · <b>p</b>robability → área a la izquierda · <b>d</b>ensidad · <b>r</b>andom']
  ]
}

];

/* ---------------------------------------------------------------------------
   FLASHCARDS — pregunta → respuesta
   -------------------------------------------------------------------------*/
window.FLASHCARDS = [
  {q:'¿Cuál es la regla de decisión de una prueba de hipótesis?', a:'Si <b>p-valor ≤ α</b> se <b>rechaza H₀</b>. Si p-valor &gt; α, <b>no se rechaza</b> H₀ (nunca "se acepta").'},
  {q:'¿Cuándo uso t y cuándo z para la media?', a:'<b>σ conocida → z</b> (Normal estándar). <b>σ desconocida → t</b> de Student con n−1 gl. La t tiene colas más anchas, lo que compensa la incertidumbre de estimar σ con s.'},
  {q:'¿Qué requisito hay que verificar antes de la prueba z para proporciones?', a:'<b>n·p₀ ≥ 5</b> y <b>n·(1−p₀) ≥ 5</b>. Si no se cumple, la aproximación normal no vale y hay que usar la prueba binomial exacta.'},
  {q:'Estadístico de la prueba χ² para la varianza y sus grados de libertad', a:'<b>χ² = (n−1)·s²/σ₀²</b>, con <b>gl = n−1</b>. Ojo: si el enunciado da la desviación estándar, hay que elevarla al cuadrado.'},
  {q:'¿Cómo se decide entre t pooled y t de Welch?', a:'Prueba F previa (<code>var.test</code>): si NO rechaza H₀: σ₁²=σ₂², se usa <b>pooled</b> (var.equal=TRUE). Si rechaza, o no hay certeza, se usa <b>Welch</b> (var.equal=FALSE). El curso recomienda Welch por defecto (Zimmerman, 2004).'},
  {q:'¿Qué es un error tipo II y qué es la potencia?', a:'<b>Error tipo II (β)</b>: no rechazar H₀ cuando es falsa (no detectar un efecto real). <b>Potencia = 1 − β</b>: capacidad de detectar ese efecto. A mayor n, menor β y mayor potencia.'},
  {q:'¿Cambia α al aumentar el tamaño de muestra?', a:'<b>No.</b> La probabilidad de error tipo I <i>es</i> α, fijada por el investigador. Lo que disminuye al aumentar n es β.'},
  {q:'Hipótesis del test de esfericidad de Bartlett y qué queremos que pase', a:'<b>H₀: R = I</b> (variables no correlacionadas). <b>Queremos RECHAZAR</b> H₀ (p &lt; α) para concluir que sí hay correlaciones aprovechables y tiene sentido aplicar ACP o AF.'},
  {q:'Estadístico de Bartlett y sus grados de libertad', a:'<b>χ² = −(n − 1 − (2p+5)/6)·ln|R|</b>, con <b>gl = p(p−1)/2</b>, donde |R| es el determinante de la matriz de correlaciones.'},
  {q:'¿Correlación cero implica independencia?', a:'<b>No en general</b> (puede haber relación no lineal). <b>Sí</b> bajo normalidad conjunta (normal bivariada). La implicación inversa —independencia ⟹ r = 0— sí vale siempre.'},
  {q:'¿Qué condiciones debe cumplir una matriz para ser matriz de correlación?', a:'(1) Diagonal toda igual a <b>1</b>; (2) elementos entre <b>−1 y 1</b>; (3) <b>semidefinida positiva</b> (todos los valores propios ≥ 0).'},
  {q:'Var(X₁ + X₂) y Var(X₁ − X₂) en la normal multivariada', a:'Var(X₁ + X₂) = σ₁² + σ₂² <b>+ 2σ₁₂</b>. Var(X₁ − X₂) = σ₁² + σ₂² <b>− 2σ₁₂</b>. En general, Y = a′X ~ N(a′μ, <b>a′Σa</b>).'},
  {q:'¿Qué hace exactamente el ACP?', a:'Crea <b>nuevas variables</b> (componentes) que son <b>combinaciones lineales</b> de las originales, ordenadas por varianza explicada y <b>ortogonales</b> entre sí. <b>No elimina variables.</b>'},
  {q:'¿Qué es un loading y qué es un score?', a:'<b>Loading</b> = peso v<sub>jℓ</sub> de la variable j en el componente ℓ (<code>pca$rotation</code>). <b>Score</b> = coordenada de una observación en el nuevo espacio (<code>pca$x</code>).'},
  {q:'Los tres criterios para elegir cuántos componentes conservar', a:'(1) <b>Kaiser</b>: autovalor &gt; 1 (solo con datos estandarizados). (2) <b>% varianza acumulada</b>: ≥ 80% (75–80% en AF). (3) <b>Scree plot</b>: conservar los anteriores al "codo".'},
  {q:'En summary(pca), ¿qué es "Standard deviation"?', a:'Es <b>√λ</b>, la raíz del autovalor. Para aplicar Kaiser hay que <b>elevarla al cuadrado</b>: 1.4617² = 2.137 &gt; 1 ✓, pero 0.9909² = 0.982 &lt; 1 ✗.'},
  {q:'¿Cómo calculo el score en PC1 de un cliente nuevo?', a:'<b>Primero estandarizarlo</b> con la media y sd de la muestra original (<code>pca$center</code>, <code>pca$scale</code>), y luego aplicar los loadings. En R: <code>predict(pca, newdata = nuevo)</code>. Nunca con valores crudos.'},
  {q:'¿Qué NO cambia al rotar los factores?', a:'<b>Comunalidades, especificidades y varianza total explicada.</b> Solo cambia cómo se reparte la varianza entre factores y la interpretabilidad.'},
  {q:'Varimax vs Promax', a:'<b>Varimax</b>: rotación <b>ortogonal</b>, factores independientes; cada factor con pocas cargas altas (simplifica columnas). <b>Promax</b>: <b>oblicua</b>; hace Varimax y luego permite correlación entre factores.'},
  {q:'¿Qué son h² y u² en la salida de fa()?', a:'<b>h² = comunalidad</b>: proporción de varianza de la variable explicada por los factores. <b>u² = unicidad = 1 − h²</b>: varianza específica + error. Ej.: Matemáticas con h²=0.26 está mal representada.'},
  {q:'¿Qué umbral de KMO exige el curso?', a:'<b>Overall MSA &gt; 0.6</b> para que sea aceptable (PPT 4.2 y pauta Ayudantía 3). El script 4.1 usa: ≥0.75 bien, ≥0.50 aceptable, &lt;0.50 inaceptable.'},
  {q:'Diferencia de fondo entre ACP y Análisis Factorial', a:'El <b>ACP explica la VARIANZA</b> de las variables observadas (componentes = variables observadas, sin modelo). El <b>AF explica las COVARIANZAS</b> mediante <b>factores latentes</b>, con un modelo estadístico y descomposición en varianza común (h²) y única (u²).'},
  {q:'¿Qué es el T² de Hotelling y con qué se relaciona?', a:'Contraste conjunto del vector de medias: <b>T² = n(x̄−μ₀)′S⁻¹(x̄−μ₀)</b>. Es la extensión multivariada de la t de Student: con <b>p = 1, T² = t²</b>. Se rechaza si T² &gt; [(n−1)p/(n−p)]·F<sub>α</sub>(p, n−p).'},
  {q:'¿Por qué no hacer p pruebas t en lugar de un T²?', a:'Porque no es equivalente: se puede aceptar cada hipótesis por separado y rechazar la conjunta (y viceversa). El contraste conjunto <b>controla el error global</b> y <b>aprovecha la correlación</b> entre variables (región elíptica).'},
  {q:'IC simultáneos T² vs Bonferroni', a:'<b>T² (Roy)</b>: válidos para toda combinación lineal a′μ → más <b>anchos</b>. <b>Bonferroni</b>: solo para las p medias originales, reparte α entre componentes → más <b>angostos/precisos</b>.'},
  {q:'¿Cómo despejo los valores de x̄ que no rechazan H₀: μ ≤ μ₀?', a:'De t<sub>obs</sub> ≤ t<sub>α,n−1</sub> se obtiene <b>x̄ ≤ μ₀ + t<sub>α,n−1</sub>·s/√n</b>. Ese es el valor límite; por encima se rechaza.'},
  {q:'Los dos pasos para calcular β', a:'(1) Hallar el <b>valor límite</b> de x̄ usando <b>μ₀</b>. (2) Calcular la probabilidad de caer en la zona de <b>no rechazo</b> pero <b>bajo la distribución centrada en μ<sub>real</sub></b>. El error clásico es no recentrar.'},
  {q:'Diferencia entre estandarización y normalización min-máx', a:'<b>Estandarización</b> (z = (x−x̄)/s): media 0, sd 1. <b>Min-máx</b> (w = (x−mín)/(máx−mín)): rango [0,1]. La min-máx <b>NO</b> da media 0 ni varianza 1.'},
  {q:'¿Qué mide la similitud coseno y cómo se conecta con la correlación?', a:'Mide <b>similitud angular</b> (dirección/patrón, no magnitud). Si los vectores se <b>centran</b> primero, el coseno <b>es exactamente</b> la correlación de Pearson.'},
  {q:'¿El ACP es supervisado o no supervisado?', a:'<b>No supervisado</b>: construye los componentes usando solo la estructura de covarianza de las variables, sin ninguna variable objetivo.'},
  {q:'¿Cuántos componentes principales puede haber como máximo?', a:'Tantos como <b>variables originales (p)</b>, porque S es p×p y tiene p autovalores. Y <b>Σλ<sub>k</sub> = traza(S)</b>: conservándolos todos no se pierde información.'},
  {q:'En el χ² de bondad de ajuste de fa(), ¿queremos rechazar o no rechazar?', a:'<b>NO rechazar.</b> H₀ dice que el modelo con m factores reproduce bien la matriz de correlaciones, así que un <b>p-valor grande es buena noticia</b> (ej.: χ²=1.21, p=0.88 → 2 factores bastan). Es al revés que en Bartlett.'},
  {q:'¿Qué prueba uso si mido a los mismos sujetos antes y después?', a:'<b>t pareada</b>: <code>t.test(antes, despues, paired = TRUE)</code>. Internamente calcula d = antes − después y prueba si la media de las diferencias es distinta de cero. Es equivalente a <code>t.test(antes - despues, mu = 0)</code>.'},
  {q:'¿Qué pasa con un p-valor de 0.0517 y α = 0.05?', a:'<b>NO se rechaza H₀</b>, aunque sea un caso límite. Y el IC de 95% contendrá μ₀, confirmándolo. La regla es estricta: p ≤ α para rechazar.'}
];
