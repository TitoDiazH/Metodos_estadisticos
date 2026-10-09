/* ============================================================================
   M01 · Covarianza, correlación y regresión simple (P1)
   Fuentes abiertas para redactar: C1 slides 9–21 · AY1-E Parte II P1–P2 ·
   AY1-R líneas 96–126 · PR-P1-Q1 afirmaciones 2–3.
   Los números de los ejemplos se recalculan en tools/verificar_numeros.js.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m01-covarianza-correlacion",
  orden: 1,
  titulo: "Covarianza, correlación y regresión simple",
  descripcion: "Cuando una variable sube, ¿qué suele pasar con la otra? Dirección (covarianza), fuerza (correlación) y si esa relación es significativa (cor.test).",
  pruebas: ["P1"],
  prioridad: "alta",
  fuentes: [{ id: "C1", loc: "slides 9–21" }, { id: "AY1-E", loc: "Parte II, P1–P2" }, { id: "PR-P1-Q1", loc: "afirmaciones 2–3" }],
  /* Filas de CONTENIDOS.md §2 que este módulo no desarrolla, con el motivo. */
  sinCobertura: [{ ref: "M01.1", motivo: "Motivación del curso: solo contexto, sin contenido evaluable." }],

  conceptos: [
    {
      id: "m01-c01",
      titulo: "Covarianza",
      cubre: ["M01.2"],
      simple: String.raw`<p>La covarianza mide <strong>cómo se mueven dos variables juntas</strong>.</p>
<ul>
  <li><strong>Positiva:</strong> tienden a aumentar o disminuir al mismo tiempo.</li>
  <li><strong>Negativa:</strong> cuando una sube, la otra tiende a bajar.</li>
  <li><strong>Cercana a cero:</strong> no se observa relación <em>lineal</em> clara.</li>
</ul>
<p>La pregunta que responde: cuando $X$ sube, ¿qué suele pasar con $Y$?</p>`,
      formal: String.raw`<p>Para $n$ pares $(x_i, y_i)$, con medias $\bar x$ e $\bar y$, la covarianza muestral es</p>
$$s_{xy}=\operatorname{Cov}(X,Y)=\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar x)(y_i-\bar y)$$
<ul>
  <li>$\operatorname{Cov}(X,Y)>0$: $X$ e $Y$ tienden a estar <em>simultáneamente</em> por encima o por debajo de sus medias.</li>
  <li>$\operatorname{Cov}(X,Y)<0$: cuando una está sobre su media, la otra tiende a estar bajo la suya.</li>
  <li>$\operatorname{Cov}(X,Y)=0$: no se observa relación lineal.</li>
  <li>La varianza es un caso particular: $\operatorname{Var}(X)=\operatorname{Cov}(X,X)$.</li>
</ul>
<p class="ayuda">En la slide 10 la fórmula está como imagen. Aquí se escribe la versión muestral (divisor $n-1$), que es la que calcula <code>cov()</code> en R; el ejemplo de abajo lo comprueba.</p>`,
      ejemplo: String.raw`<p>Datos de la clase (altura en cm y peso en kg de 6 personas): $x=(161,170,180,175,165,187)$, $y=(50,65,78,82,60,76)$.</p>
<ol>
  <li>Medias: $\bar x = 173$ y $\bar y = 68{,}5$.</li>
  <li>Productos de desviaciones $(x_i-\bar x)(y_i-\bar y)$: $222;\ 10{,}5;\ 66{,}5;\ 27;\ 68;\ 105$. Todos positivos: cada persona está del mismo lado de ambas medias.</li>
  <li>Suma: $499$. Covarianza: $s_{xy}=\dfrac{499}{6-1}=99{,}8$ (cm·kg).</li>
</ol>
<p>Signo positivo: a mayor altura, mayor peso. El número $99{,}8$ por sí solo no dice si la relación es «fuerte».</p>`,
      figura: { tipo: "cuadrantes", donde: "ejemplo", unidad: "Persona", ejes: ["altura (cm)", "peso (kg)"],
        x: [161, 170, 180, 175, 165, 187], y: [50, 65, 78, 82, 60, 76],
        pie: "Cada rectángulo es un producto de desviaciones: su área es lo que esa persona aporta a la covarianza." },
      r: {
        nota: "En la clase se usa <code>cov()</code> sobre un data frame: devuelve la matriz de covarianza (varianzas en la diagonal, covarianzas fuera).",
        codigo: `x <- c(161, 170, 180, 175, 165, 187)
y <- c(50, 65, 78, 82, 60, 76)
cov(x, y)                  # 99.8
cov(data.frame(x, y))      # matriz: diagonal = varianzas`,
        rlab: "r-m01-cov"
      },
      errores: [
        "Decir que covarianza 0 significa «no hay relación». Lo correcto: no se observa relación <strong>lineal</strong>.",
        "Comparar la magnitud de dos covarianzas medidas en unidades distintas."
      ],
      quepasa: [
        {
          si: "…mido la altura en metros en vez de centímetros?",
          entonces: String.raw`<p>La covarianza pasa de $99{,}8$ a $0{,}998$ (se divide por 100) aunque la relación entre altura y peso es exactamente la misma. Por eso al comienzo <strong>importa más el signo que la magnitud</strong>, y por eso existe la correlación.</p>`
        }
      ],
      memoriza: String.raw`<p>El <strong>signo</strong> indica la dirección; la <strong>magnitud depende de las unidades</strong>. $\operatorname{Var}(X)=\operatorname{Cov}(X,X)$.</p>`,
      comprueba: {
        enunciado: "La covarianza entre dos variables resulta negativa. ¿Qué describe mejor a los datos?",
        opciones: [
          "Cuando una variable está sobre su media, la otra tiende a estar bajo la suya.",
          "Las variables son independientes.",
          "La relación entre las variables es débil.",
          "Ambas variables tienen media negativa."
        ],
        correcta: 0,
        explicacion: "El signo de la covarianza indica dirección, no fuerza: negativa significa que se mueven en sentidos opuestos respecto de sus medias."
      },
      fuente: [{ id: "C1", loc: "slides 9–14" }]
    },

    {
      id: "m01-c02",
      titulo: "Coeficiente de correlación r: qué es y propiedades",
      cubre: ["M01.3"],
      simple: String.raw`<p>La covarianza depende de las unidades de medida. La <strong>correlación es la versión estandarizada de la covarianza</strong>: siempre está entre $-1$ y $1$, así que permite comparar relaciones entre variables medidas en escalas distintas.</p>`,
      formal: String.raw`$$r=\frac{s_{xy}}{s_x\,s_y}=\frac{\operatorname{Cov}(X,Y)}{\sqrt{\operatorname{Var}(X)\,\operatorname{Var}(Y)}}$$
<p>donde $s_x$ y $s_y$ son las desviaciones estándar. Propiedades de $r$:</p>
<ul>
  <li>Es <strong>adimensional</strong>.</li>
  <li>$-1\le r\le 1$; una relación lineal perfecta da $\pm1$.</li>
  <li>El <strong>signo</strong> indica la dirección.</li>
  <li>$|r|$ grande implica relación lineal más fuerte.</li>
  <li>$r=0$ <strong>no implica independencia</strong> en general.</li>
</ul>
<p>Cómo interpretarlo: cerca de $1$, relación positiva fuerte; cerca de $-1$, negativa fuerte; cerca de $0$, poca relación lineal. Una correlación alta <strong>no prueba causalidad</strong>.</p>`,
      ejemplo: String.raw`<p>Con los datos de altura y peso: $s_{xy}=99{,}8$, $s_x=\sqrt{93{,}2}=9{,}654$ y $s_y=\sqrt{151{,}1}=12{,}292$.</p>
$$r=\frac{99{,}8}{9{,}654\times 12{,}292}=0{,}841$$
<p>Relación lineal positiva y fuerte. Si la altura se midiera en metros, $r$ seguiría siendo $0{,}841$.</p>
<p><strong>Desde una matriz de covarianza</strong> (ayudantía 1): con $\operatorname{Var}(X_2)=9$, $\operatorname{Var}(X_3)=25$ y $\operatorname{Cov}(X_2,X_3)=1$, $r_{23}=\dfrac{1}{\sqrt{9\cdot 25}}=\dfrac{1}{15}=0{,}067$: correlación muy baja.</p>`,
      figura: { tipo: "nube", modo: "correlacion", r: 0.84,
        pie: "Mueve r para ver cómo cambia la nube. Con «curva» se ve una relación fuerte con r casi 0." },
      lectura: String.raw`<p>Antes de calcular $r$ conviene leer la nube de puntos. En el gráfico se mira: la <strong>dirección</strong> de la nube, <strong>qué tan alineados</strong> están los puntos y la <strong>presencia de outliers</strong>.</p>`,
      errores: [
        "«Si la correlación es 0, las variables son independientes». <strong>Falso</strong> (pauta P1): pueden estar relacionadas de forma no lineal; la equivalencia solo vale si tienen distribución normal conjunta (normal bivariada); o una puede influir en la distribución de la otra (p. ej. en su varianza) sin cambiar su media.",
        "Olvidar el sentido que sí vale: si son independientes, $E(XY)=E(X)E(Y)$, entonces $\\operatorname{Cov}(X,Y)=E(XY)-E(X)E(Y)=0$ y la correlación es 0 (pauta P1).",
        "Concluir causalidad a partir de una correlación alta."
      ],
      memoriza: String.raw`<p>Independencia $\Rightarrow \rho=0$, pero $\rho=0 \not\Rightarrow$ independencia (salvo normal bivariada).</p>`,
      comprueba: {
        tipo: "vf",
        enunciado: "Si cambio las unidades de una de las variables (por ejemplo de cm a m), el coeficiente de correlación cambia.",
        correcta: false,
        explicacion: "r es adimensional: al dividir la covarianza por las desviaciones estándar se cancelan las unidades. Lo que cambia es la covarianza."
      },
      fuente: [{ id: "C1", loc: "slides 14–16 y 20–21" }, { id: "PR-P1-Q1", loc: "afirmaciones 2 y 3" }, { id: "AY1-E", loc: "Parte II, P1" }]
    },

    {
      id: "m01-c03",
      titulo: "Correlación vs. regresión lineal simple; r muestral y ρ poblacional",
      cubre: ["M01.4"],
      simple: String.raw`<p>Cuando existe una relación lineal entre dos variables se puede representar con una <strong>recta de regresión</strong>. La <strong>correlación</strong> mide qué tan fuerte es esa relación lineal. Están relacionadas, <strong>pero no son lo mismo</strong>.</p>`,
      formal: String.raw`<ul>
  <li>$r$ es el coeficiente de correlación <strong>muestral</strong> (se calcula con los datos).</li>
  <li>$\rho$ es el coeficiente de correlación <strong>poblacional</strong> (el parámetro desconocido sobre el que se plantean las hipótesis).</li>
</ul>
<p>Si la nube de puntos muestra tendencia creciente o decreciente, existe correlación; si los puntos están dispersos sin patrón, la correlación será cercana a cero.</p>`,
      memoriza: String.raw`<p>Las hipótesis se escriben sobre $\rho$ (población), nunca sobre $r$ (muestra).</p>`,
      comprueba: {
        enunciado: "¿Sobre qué cantidad se plantea la hipótesis nula al probar si existe correlación lineal?",
        opciones: ["Sobre ρ, la correlación poblacional", "Sobre r, la correlación muestral", "Sobre la pendiente muestral de la recta", "Sobre la covarianza muestral"],
        correcta: 0,
        explicacion: "r se calcula con la muestra y se conoce; lo desconocido es ρ. Por eso cor.test() prueba H0: ρ = 0."
      },
      fuente: [{ id: "C1", loc: "slides 17–18" }]
    },

    {
      id: "m01-c04",
      titulo: "¿Es significativa la correlación? cor.test()",
      cubre: ["M01.5"],
      simple: String.raw`<p>Un $r$ distinto de cero en la muestra puede aparecer por azar. <code>cor.test()</code> responde si hay evidencia de que la correlación <em>poblacional</em> es distinta de cero. Devuelve tres cosas: el coeficiente de correlación, un intervalo de confianza y el p-valor para probar $H_0:\rho=0$.</p>`,
      formal: String.raw`<p>Hipótesis: $H_0:\rho=0$ contra $H_1:\rho\neq 0$. Estadístico (el «test visto en clase» que entrega la ayudantía 1):</p>
$$t=r\sqrt{\frac{n-2}{1-r^{2}}}\qquad\text{con } n-2 \text{ grados de libertad}$$
<p>Se rechaza $H_0$ si $|t|$ supera el valor crítico $t_{\alpha/2,\,n-2}$, o equivalentemente si el p-valor es menor que $\alpha$.</p>`,
      ejemplo: String.raw`<p>Altura y peso, $n=6$, $r=0{,}841$:</p>
$$t=0{,}841\sqrt{\frac{6-2}{1-0{,}841^{2}}}=3{,}109,\qquad t_{0{,}025;\,4}=2{,}776$$
<p>Como $3{,}109>2{,}776$ se rechaza $H_0$. <strong>Conclusión:</strong> con un nivel de significancia del 5 %, existe evidencia estadística suficiente para afirmar que hay correlación lineal entre altura y peso.</p>`,
      r: {
        codigo: `x <- c(161, 170, 180, 175, 165, 187)
y <- c(50, 65, 78, 82, 60, 76)

cor.test(x, y, method = "pearson")`,
        salida: `	Pearson's product-moment correlation

data:  x and y
t = 3.1087, df = 4, p-value = 0.03592
alternative hypothesis: true correlation is not equal to 0
95 percent confidence interval:
 0.0926901 0.9821910
sample estimates:
      cor
0.8409891 `,
        rlab: "r-m01-cor-test"
      },
      lectura: String.raw`<ul>
  <li><code>t = 3.1087, df = 4</code>: el estadístico y sus grados de libertad ($n-2=4$).</li>
  <li><code>p-value = 0.03592</code>: menor que $0{,}05$ ⇒ se rechaza $H_0:\rho=0$.</li>
  <li><code>alternative hypothesis: … not equal to 0</code>: la prueba es bilateral.</li>
  <li><code>95 percent confidence interval: 0.093 a 0.982</code>: no contiene el 0 (coherente con rechazar), pero es muy ancho porque $n=6$.</li>
  <li><code>cor 0.8409891</code>: el $r$ muestral.</li>
</ul>`,
      quepasa: [
        {
          si: "…la correlación es muy baja pero la muestra es enorme?",
          entonces: String.raw`<p>Ayudantía 1: con $r_{23}=1/15=0{,}067$ y $n=100$, $t=0{,}66<1{,}984$ ⇒ no se rechaza $H_0$. Con el mismo $r$ y $n=1000$, $t=2{,}11>1{,}962$ ⇒ se rechaza. <strong>Significativa no es lo mismo que fuerte</strong>: con muchas observaciones hasta una correlación mínima resulta significativa.</p>`
        }
      ],
      errores: [
        "Leer «no se rechaza H0» como «no existe correlación»: solo significa que la evidencia no alcanza para afirmar que ρ ≠ 0.",
        "Confundir significancia con fuerza: el p-valor depende de n; la fuerza la da |r|."
      ],
      memoriza: String.raw`<p>$t=r\sqrt{\dfrac{n-2}{1-r^{2}}}$ con $n-2$ gl. <code>cor.test()</code> devuelve $r$, IC y p-valor para $H_0:\rho=0$.</p>`,
      comprueba: {
        enunciado: "En la salida de cor.test() aparece «df = 4». ¿Cuántos pares de observaciones había?",
        opciones: ["6", "4", "5", "8"],
        correcta: 0,
        explicacion: "Los grados de libertad del test de correlación son n − 2, así que n = 4 + 2 = 6."
      },
      fuente: [{ id: "C1", loc: "slide 19" }, { id: "AY1-E", loc: "Parte II, P2" }, { id: "AY1-R", loc: "líneas 118–126" }]
    }
  ],

  cuando: String.raw`<div class="tabla-scroll"><table class="tabla">
<thead><tr><th>Quiero saber…</th><th>Uso</th><th>En R</th></tr></thead>
<tbody>
<tr><td>Si dos variables se mueven en el mismo sentido o en sentido opuesto</td><td>Signo de la covarianza</td><td><code>cov(x, y)</code></td></tr>
<tr><td>Qué tan fuerte es la relación lineal, comparable entre escalas</td><td>Coeficiente de correlación $r$</td><td><code>cor(x, y)</code></td></tr>
<tr><td>Si esa correlación es estadísticamente distinta de 0</td><td>Test $t$ de correlación ($H_0:\rho=0$)</td><td><code>cor.test(x, y, method = "pearson")</code></td></tr>
<tr><td>Representar la relación con una recta</td><td>Regresión lineal simple</td><td>—</td></tr>
</tbody></table></div>`,

  errores: [
    { texto: "«Correlación 0 ⇒ independencia»: falso en general.", fuente: [{ id: "PR-P1-Q1", loc: "afirmación 3" }] },
    { texto: "Una correlación alta no prueba causalidad.", fuente: [{ id: "C1", loc: "slide 20" }] }
  ]
});
