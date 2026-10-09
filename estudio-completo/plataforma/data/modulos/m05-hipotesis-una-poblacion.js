/* ============================================================================
   M05 · Pruebas de hipótesis: marco general y una población (P1)
   Fuentes abiertas para redactar: C2 slides 2–20 · AY2-E P1–P3 y AY2-P (pauta) ·
   PR-P1-Q1 afirmaciones 4 y 6.
   Los números se recalculan en tools/verificar_numeros.js.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m05-hipotesis-una-poblacion",
  orden: 5,
  titulo: "Pruebas de hipótesis: marco general y una población",
  descripcion: "Cómo decidir con datos si se rechaza una afirmación sobre un parámetro: media (t y Z), proporción y varianza, a mano y en R.",
  pruebas: ["P1"],
  prioridad: "alta",
  fuentes: [{ id: "C2", loc: "slides 2–20" }, { id: "AY2-E", loc: "P1–P3" }, { id: "PR-P1-Q1", loc: "afirmaciones 4 y 6" }],

  conceptos: [
    {
      id: "m05-c01",
      titulo: "H₀, H₁, significancia α y regla de decisión",
      figura: { tipo: "regionRechazo", cola: "derecha", alfa: 0.05, z: 2.02,
        pie: "Parte en el ejemplo de la esperanza de vida (p-valor 2,17 % en cola derecha). Mueve el estadístico y cambia α o la cola: comparar el p-valor con α equivale a ver si el estadístico cae en la región de rechazo." },
      cubre: ["M05.1"],
      simple: String.raw`<p>Una prueba de hipótesis parte de una suposición («status quo», $H_0$) y pregunta si los datos dan <strong>suficiente evidencia para rechazarla</strong> a favor de lo que queremos demostrar ($H_1$). La prueba nunca demuestra que $H_0$ sea verdadera: si no hay evidencia, simplemente <em>no se rechaza</em>.</p>`,
      formal: String.raw`<ul>
  <li>$H_0$: suposición inicial (p. ej. $\mu\le70$). $H_1$: lo que se quiere demostrar (p. ej. $\mu>70$).</li>
  <li>$\alpha$ (significancia): probabilidad máxima de cometer error tipo I, es decir, rechazar $H_0$ siendo verdadera. Valores comunes: $0{,}01$; $0{,}05$; $0{,}10$.</li>
  <li><strong>Regla de la clase (C2 s4 y s14):</strong> si p-valor $\le\alpha$ ⇒ se rechaza $H_0$; si p-valor $>\alpha$ ⇒ no se rechaza.</li>
  <li>El p-valor es la probabilidad de un resultado tan extremo o más que el observado, asumiendo $H_0$ verdadera.</li>
</ul>`,
      ejemplo: String.raw`<p>C2 s3–4: ¿viven las personas más de 70 años en promedio? $H_0:\mu\le70$ y $H_1:\mu>70$; muestra de $n=100$ con media $71{,}8$. El p-valor es $2{,}17\,\%$. Como $2{,}17\,\%\le5\,\%$, se rechaza $H_0$: hay evidencia de que la esperanza de vida supera los 70 años.</p>`,
      errores: [
        "«No rechazo H₀, entonces H₀ es verdadera»: solo falta evidencia; puede haber un error tipo II.",
        "Creer que al aumentar el tamaño de muestra baja la probabilidad de error tipo I: esa probabilidad es α, que fija quien hace la prueba."
      ],
      quepasa: [
        {
          si: "…el p-valor es exactamente igual a α?",
          entonces: String.raw`<p>La clase dice «p $\le\alpha$ ⇒ rechazar» (s4 y s14), pero otras slides escriben «p $<\alpha$» (ver «Diferencias entre fuentes»). Es un caso que casi nunca ocurre; si aparece, sigue la regla del enunciado.</p>`
        }
      ],
      memoriza: String.raw`<p>p-valor $\le\alpha$ ⇒ rechazar $H_0$. No rechazar $\ne$ probar que $H_0$ es cierta. $P(\text{error tipo I})=\alpha$.</p>`,
      comprueba: {
        enunciado: "Con α = 0,01 y p-valor = 0,03, ¿qué se concluye?",
        opciones: ["No se rechaza H0", "Se rechaza H0", "Se acepta H1 con certeza", "Hay que bajar α a 0,001"],
        correcta: 0,
        explicacion: "0,03 > 0,01, así que no se rechaza H0 (no hay evidencia suficiente a ese nivel)."
      },
      fuente: [{ id: "C2", loc: "slides 2–4" }, { id: "PR-P1-Q1", loc: "afirmaciones 4 y 6" }]
    },

    {
      id: "m05-c02",
      titulo: "Media con σ desconocida: prueba t y t.test()",
      figura: { tipo: "tStudent", gl: 19,
        pie: "Con 19 grados de libertad (los 20 hogares del ejemplo) el crítico es 1,729. Baja los grados de libertad para ver cómo engordan las colas." },
      cubre: ["M05.2", "M05.3"],
      simple: String.raw`<p>Cuando no se conoce la desviación estándar de la población (lo habitual), se usa la distribución $t$ de Student, que tiene <strong>colas más anchas</strong> que la normal para compensar esa incertidumbre extra. En R, <code>t.test()</code> hace todo.</p>`,
      formal: String.raw`$$t=\frac{\bar x-\mu_0}{s/\sqrt n}\sim t_{n-1}\ \text{bajo }H_0$$
<p>En <code>t.test(x, mu = mu0, alternative = …)</code>:</p>
<ul>
  <li><code>"two.sided"</code>: $H_1:\mu\ne\mu_0$ (bilateral).</li>
  <li><code>"greater"</code>: $H_1:\mu>\mu_0$ (cola derecha). <code>"less"</code>: $H_1:\mu<\mu_0$ (cola izquierda).</li>
</ul>`,
      ejemplo: String.raw`<p>C2 s5–6: consumo eléctrico de un barrio ($n=20$ hogares) contra la media de la ciudad, $721$ kWh. $H_0:\mu\le721$, $H_1:\mu>721$, $\alpha=5\,\%$.</p>
<ol>
  <li>Valor crítico: $t_{0{,}05;19}=1{,}73$ (se verifica abajo).</li>
  <li>p-valor $=0{,}02188\le0{,}05$ ⇒ se rechaza $H_0$.</li>
  <li>Conclusión: con 5 % de significancia hay evidencia de que el consumo promedio del barrio es superior a 721 kWh.</li>
</ol>`,
      r: {
        nota: "Código de C2 slide 8 (datos simulados con semilla 123).",
        codigo: `set.seed(123)
x <- rnorm(25, mean = 10.8, sd = 1.9)
t.test(x, mu = 10, alternative = "two.sided", conf.level = 0.95)`,
        rlab: "r-m05-ttest"
      },
      lectura: String.raw`<ul>
  <li><code>t = 2.0477, df = 24</code>: estadístico y $n-1$ grados de libertad (⇒ $n=25$).</li>
  <li><code>p-value = 0.05169</code>: mayor que $0{,}05$ ⇒ <strong>no</strong> se rechaza $H_0$ (caso límite).</li>
  <li><code>95 percent confidence interval: 9.994 11.479</code>: contiene $\mu_0=10$, coherente con no rechazar.</li>
  <li><code>mean of x 10.73667</code>: estimación de la media.</li>
</ul>
<p class="ayuda">La slide 8 escribe «mean of x = 10.737» y la salida real da 10.73667: es el mismo número redondeado.</p>`,
      errores: ["Usar una unilateral cuando el enunciado pregunta «distinta de» (bilateral).", "Mirar solo el p-valor y olvidar que el IC debe ser coherente: si contiene $\\mu_0$, no se rechaza (bilateral)."],
      quepasa: [
        {
          si: "…cambio a alternative = \"greater\" con los mismos datos?",
          entonces: String.raw`<p>El p-valor pasa de $0{,}0517$ a $0{,}0258$ (la mitad): con la unilateral derecha sí se rechaza a $\alpha=5\,\%$. Por eso la elección de $H_1$ se hace <em>antes</em> de mirar los datos.</p>`
        }
      ],
      memoriza: String.raw`<p>σ desconocida ⇒ $t=\dfrac{\bar x-\mu_0}{s/\sqrt n}$, $n-1$ gl. IC contiene $\mu_0$ ⇒ no se rechaza. <code>alternative</code>: <code>"two.sided"</code> · <code>"greater"</code> · <code>"less"</code>.</p>`,
      comprueba: {
        enunciado: "En t.test() aparece «df = 24». ¿Cuántas observaciones había?",
        opciones: ["25", "24", "23", "26"],
        correcta: 0,
        explicacion: "En una muestra los grados de libertad son n − 1, entonces n = 25."
      },
      verifica: [
        { que: "t crítico (19 gl, α=0,05)", r: `cat(round(qt(0.95, 19), 2))`, esperado: 1.73, tol: 0.005 },
        { que: "p-valor unilateral derecho del ejemplo simulado", r: `set.seed(123); x <- rnorm(25, 10.8, 1.9); cat(round(t.test(x, mu = 10, alternative = "greater")$p.value, 4))`, esperado: 0.0258, tol: 0.00005 }
      ],
      fuente: [{ id: "C2", loc: "slides 5–9" }]
    },

    {
      id: "m05-c03",
      titulo: "Media con σ conocida: prueba Z y BSDA::z.test()",
      cubre: ["M05.4"],
      simple: String.raw`<p>Si la desviación estándar de la población es <strong>conocida</strong> (por ejemplo, por información histórica), se usa la normal estándar en vez de la $t$. Es menos común en la práctica.</p>`,
      formal: String.raw`$$z=\frac{\bar x-\mu_0}{\sigma/\sqrt n}\sim N(0,1)\ \text{bajo }H_0$$
<p>En R: <code>BSDA::z.test(x, mu, sigma.x, alternative, conf.level)</code>. Regla: σ conocida ⇒ Z; σ desconocida ⇒ $t$.</p>`,
      ejemplo: String.raw`<p>C2 s11: $n=30$ datos, $\sigma=2$, $H_0:\mu\le10$ vs $H_1:\mu>10$, $\alpha=5\,\%$. La media muestral es $10{,}79$; $z=\dfrac{10{,}79-10}{2/\sqrt{30}}=2{,}164$ y p-valor $=0{,}0153<0{,}05$ ⇒ se rechaza $H_0$: hay evidencia de que $\mu>10$.</p>
<p>Ayudantía 2, P2(a): $\sigma=0{,}02$ kg conocida, $n=20$, $H_0:\mu=1$; $z=-1{,}90$, p-valor $=0{,}0573>0{,}05$ ⇒ no se rechaza.</p>`,
      r: {
        nota: "Código de C2 slide 11 (requiere el paquete BSDA).",
        codigo: `library(BSDA)
x <- c(12.1, 8.9, 10.5, 11.3, 9.7, 13.0, 10.8, 11.6, 7.9, 12.4,
       9.8, 10.9, 11.1, 10.2, 12.0, 9.3, 10.6, 13.2, 8.7, 11.4,
       10.0, 12.6, 9.5, 10.7, 11.8, 10.1, 12.3, 9.9, 11.0, 10.4)
z.test(x = x, mu = 10, sigma.x = 2.0, alternative = "greater", conf.level = 0.95)`,
        rlab: "r-m05-ztest"
      },
      lectura: String.raw`<ul><li><code>z = 2.1635, p-value = 0.01525</code>: $<0{,}05$ ⇒ se rechaza $H_0$.</li><li>El IC de cola derecha tiene límite inferior $10{,}189$ y el superior no existe (<code>NA</code>; la slide escribe «Inf»).</li></ul>`,
      errores: ["Usar Z cuando el enunciado no entrega σ: sin σ conocida corresponde t.", "Olvidar el argumento <code>sigma.x</code> en <code>z.test</code>."],
      memoriza: String.raw`<p>σ conocida ⇒ $z=\dfrac{\bar x-\mu_0}{\sigma/\sqrt n}$ ⇒ <code>BSDA::z.test(x, mu, sigma.x)</code>.</p>`,
      comprueba: {
        enunciado: "¿Cuándo corresponde usar la prueba Z para una media?",
        opciones: ["Cuando la desviación estándar poblacional es conocida", "Cuando la muestra es pequeña", "Cuando no se conoce σ", "Siempre que hay una sola muestra"],
        correcta: 0,
        explicacion: "Con σ conocida se usa la normal estándar; con σ desconocida, la t de Student."
      },
      verifica: [{ que: "z de C2 s11", r: `x <- c(12.1, 8.9, 10.5, 11.3, 9.7, 13.0, 10.8, 11.6, 7.9, 12.4, 9.8, 10.9, 11.1, 10.2, 12.0, 9.3, 10.6, 13.2, 8.7, 11.4, 10.0, 12.6, 9.5, 10.7, 11.8, 10.1, 12.3, 9.9, 11.0, 10.4); cat(round((mean(x)-10)/(2/sqrt(30)), 3))`, esperado: 2.164, tol: 0.0005 }],
      fuente: [{ id: "C2", loc: "slides 10–11" }, { id: "AY2-E", loc: "P2(a)" }]
    },

    {
      id: "m05-c04",
      titulo: "Proporción: requisito, estadístico Z y prop.test()",
      cubre: ["M05.5", "M05.6"],
      simple: String.raw`<p>Para decidir si la proporción de una población es un valor dado, se compara la proporción de la muestra con ese valor y se mide la distancia en errores estándar. La aproximación normal solo vale si hay suficientes «éxitos» y «fracasos» esperados.</p>`,
      formal: String.raw`<p><strong>Requisito:</strong> $np_0\ge5$ y $n(1-p_0)\ge5$ (C2 s12 y s39); si falla, usar método exacto (binomial).</p>
$$Z=\frac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}$$
<p>P-valor bilateral: $2P(Z<z)$ si $z<0$; $2P(Z>z)$ si $z>0$ (s14). En R: <code>prop.test(x, n, p0, alternative, correct = FALSE)</code> entrega $X^2=z^2$.</p>`,
      ejemplo: String.raw`<p><strong>C2 s12–14:</strong> $43$ de $120$ estudiantes trabajan; $H_0:p=0{,}40$ vs $H_1:p\ne0{,}40$, $\alpha=10\,\%$. $\hat p=0{,}358$; requisito: $48\ge5$ y $72\ge5$. $z=-0{,}932$, $|z|<1{,}64$ ⇒ no se rechaza (p-valor $=0{,}351$).</p>
<p><strong>Ayudantía 2, P1:</strong> $40$ de $200$ parabrisas defectuosos; $H_0:p\le0{,}15$ vs $H_1:p>0{,}15$. $z=1{,}98>1{,}64$ ⇒ se rechaza: la muestra no respalda a la empresa. Con <code>prop.test</code>, $X^2=3{,}9216=z^2$.</p>`,
      r: {
        nota: "Código de C2 slide 16 (cálculo manual y prop.test).",
        codigo: `X <- 78; n <- 120; p0 <- 0.60
phat <- X / n
z_obs <- (phat - p0) / sqrt(p0 * (1 - p0) / n)
z_obs
1 - pnorm(z_obs)
prop.test(78, 120, 0.6, "greater", correct = FALSE)`,
        rlab: "r-m05-prop"
      },
      lectura: String.raw`<ul><li><code>X-squared = 1.25</code> es $z^2$ ($1{,}118^2$).</li><li><code>p-value = 0.1318 &gt; 0.05</code> ⇒ no se rechaza $H_0:p\le0{,}60$ ($\hat p=0{,}65$).</li><li>IC unilateral: de $0{,}576$ a $1$.</li></ul>`,
      errores: ["No verificar $np_0\\ge5$ y $n(1-p_0)\\ge5$ antes de usar Z.", "Usar $\\hat p$ en el denominador del estadístico: en la prueba va $p_0$."],
      memoriza: String.raw`<p>$Z=\dfrac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}$ · requisito $np_0\ge5$ y $n(1-p_0)\ge5$ · <code>prop.test(…, correct = FALSE)</code> da $X^2=z^2$.</p>`,
      comprueba: {
        enunciado: "Para H0: p = 0,40 con n = 120, ¿se cumple el requisito de la aproximación normal?",
        opciones: ["Sí: 48 ≥ 5 y 72 ≥ 5", "No: n es muy grande", "No: 0,40 es muy bajo", "No se puede saber sin p-hat"],
        correcta: 0,
        explicacion: "np0 = 48 y n(1 − p0) = 72, ambos ≥ 5."
      },
      verifica: [
        { que: "z de 43/120 vs 0,40", js: "(43/120-0.4)/Math.sqrt(0.4*0.6/120)", esperado: -0.9317, tol: 0.0001 },
        { que: "z parabrisas", js: "(0.2-0.15)/Math.sqrt(0.15*0.85/200)", esperado: 1.9803, tol: 0.0001 },
        { que: "X² de prop.test(78,120,0.6)", r: `cat(round(prop.test(78, 120, 0.6, "greater", correct = FALSE)$statistic, 3))`, esperado: 1.25, tol: 0.0005 }
      ],
      fuente: [{ id: "C2", loc: "slides 12–16, 39" }, { id: "AY2-E", loc: "P1" }]
    },

    {
      id: "m05-c05",
      titulo: "Varianza: prueba χ² y cálculo en R",
      cubre: ["M05.7", "M05.8"],
      simple: String.raw`<p>Para decidir si la variabilidad de una población es igual, mayor o menor que un valor de referencia se compara la varianza de la muestra con ese valor usando la distribución $\chi^2$. R <strong>no</strong> tiene una función específica (como <code>t.test</code>); se calcula con <code>qchisq()</code> y <code>pchisq()</code>.</p>`,
      formal: String.raw`$$\chi^2=\frac{(n-1)s^2}{\sigma_0^2}\sim\chi^2_{n-1}\ \text{bajo }H_0$$
<p>Hipótesis sobre $\sigma^2$ (si el enunciado habla de desviación, se eleva al cuadrado: $\sigma\le2\Rightarrow\sigma^2\le4$). Con $H_1:\sigma^2>\sigma_0^2$ se rechaza si $\chi^2_{obs}>\chi^2_{1-\alpha;n-1}$ (o p-valor $<\alpha$): ambos métodos llevan siempre a la misma decisión (C2 s20).</p>`,
      ejemplo: String.raw`<p>C2 s18: la desviación estándar del tiempo de conexión sería a lo más $2$ min. $n=24$, $s^2=4{,}9$. $H_0:\sigma^2\le4$ vs $H_1:\sigma^2>4$, $\alpha=5\,\%$.</p>
<ol>
  <li>$\chi^2=\dfrac{23\times4{,}9}{4}=28{,}175$.</li>
  <li>Crítico: $\chi^2_{0{,}95;23}=35{,}172$.</li>
  <li>$28{,}175<35{,}172$ ⇒ no se rechaza $H_0$ (p-valor $\approx0{,}209$): no hay evidencia de que $\sigma>2$ min.</li>
</ol>
<p>Ayudantía 2, P3(a): $\chi^2=11{,}1$ está entre $2{,}70$ y $19{,}02$ (bilateral, $\alpha=5\,\%$, 9 gl) ⇒ no se rechaza $H_0:\sigma^2=4$.</p>`,
      r: {
        nota: "Código de C2 slide 20.",
        codigo: `x <- c(10.2, 9.8, 11.1, 10.7, 9.5, 10.0, 10.8, 11.3,
       9.7, 10.4, 10.9, 9.6, 10.5, 11.0, 10.1)
n <- length(x); s2 <- var(x)
chi_obs <- (n - 1) * s2 / 4
chi_crit <- qchisq(0.95, df = n - 1)
p_value <- 1 - pchisq(chi_obs, df = n - 1)
c(s2, chi_obs, chi_crit, p_value)`,
        rlab: "r-m05-varianza"
      },
      lectura: String.raw`<p>$s^2=0{,}339$, $\chi^2_{obs}=1{,}187$ y crítico $23{,}685$ (14 gl). Como $1{,}187<23{,}685$ (y p $\approx1$), no se rechaza $H_0:\sigma^2\le4$.</p>`,
      errores: ["Plantear la hipótesis con la desviación estándar y usar el valor sin elevar al cuadrado.", "Buscar en R una función tipo <code>t.test</code> para varianzas: no existe, se calcula a mano."],
      memoriza: String.raw`<p>$\chi^2=\dfrac{(n-1)s^2}{\sigma_0^2}$ con $n-1$ gl · <code>qchisq</code> (crítico) · <code>1 - pchisq</code> (p-valor cola derecha).</p>`,
      comprueba: {
        enunciado: "Se afirma que σ ≤ 2 minutos. ¿Qué H0 corresponde para una prueba sobre la varianza?",
        opciones: ["σ² ≤ 4", "σ² ≤ 2", "σ² ≥ 4", "σ² = 2"],
        correcta: 0,
        explicacion: "Se trabaja con la varianza: σ ≤ 2 equivale a σ² ≤ 4."
      },
      verifica: [
        { que: "χ² de C2 s18", js: "23*4.9/4", esperado: 28.175, tol: 1e-9 },
        { que: "crítico χ²(0,95;23)", r: `cat(round(qchisq(0.95, 23), 3))`, esperado: 35.172, tol: 0.0005 }
      ],
      fuente: [{ id: "C2", loc: "slides 17–20" }, { id: "AY2-E", loc: "P3(a)" }]
    }
  ],

  cuando: String.raw`<div class="tabla-scroll"><table class="tabla">
<thead><tr><th>Parámetro</th><th>Condición</th><th>Estadístico</th><th>En R</th></tr></thead>
<tbody>
<tr><td>Media</td><td>σ desconocida</td><td>$t$, $n-1$ gl</td><td><code>t.test(x, mu =, alternative =)</code></td></tr>
<tr><td>Media</td><td>σ conocida</td><td>$Z$</td><td><code>BSDA::z.test(x, mu =, sigma.x =)</code></td></tr>
<tr><td>Proporción</td><td>$np_0\ge5$ y $n(1-p_0)\ge5$</td><td>$Z$</td><td><code>prop.test(x, n, p0, correct = FALSE)</code></td></tr>
<tr><td>Varianza</td><td>población normal</td><td>$\chi^2_{n-1}$</td><td><code>qchisq</code> · <code>pchisq</code> (a mano)</td></tr>
</tbody></table></div>`,

  errores: [
    { texto: "No rechazar H₀ no prueba que sea verdadera.", fuente: [{ id: "PR-P1-Q1", loc: "afirmación 4" }] },
    { texto: "El tamaño de muestra no cambia la probabilidad de error tipo I (es α).", fuente: [{ id: "PR-P1-Q1", loc: "afirmación 6" }] }
  ]
});
