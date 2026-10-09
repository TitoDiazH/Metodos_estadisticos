/* ============================================================================
   M11 · Análisis de conglomerados: definición, pasos, distancias y estandarización (P2)
   Fuentes abiertas para redactar: C5.1 slides 2–17 · S5.1 líneas 11–58 ·
   AY5-E P3 (Hamming) · AY5-R. Los números se recalculan en tools/verificar_numeros.js.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m11-conglomerados-distancias",
  orden: 11,
  titulo: "Análisis de conglomerados: definición, pasos, distancias y estandarización",
  descripcion: "Agrupar observaciones sin etiquetas previas: qué es un clúster, los pasos del análisis y cómo medir qué tan parecidas son dos observaciones.",
  pruebas: ["P2"],
  prioridad: "alta",
  fuentes: [{ id: "C5.1", loc: "slides 2–17" }, { id: "S5.1", loc: "líneas 11–58" }, { id: "AY5-E", loc: "P3" }],

  conceptos: [
    {
      id: "m11-c01",
      titulo: "Qué es el clustering y sus pasos",
      cubre: ["M11.1", "M11.2"],
      simple: String.raw`<p>El análisis de conglomerados agrupa observaciones en <strong>clústeres</strong> de modo que las de un mismo grupo se parezcan entre sí (homogeneidad interna) y las de grupos distintos se diferencien (separación). Es <strong>aprendizaje no supervisado</strong>: no hay etiquetas previas, los grupos salen de los datos.</p>`,
      formal: String.raw`<p>Dado $X=\{x_1,\dots,x_n\}\subset\mathbb R^p$, se busca una partición $C=\{C_1,\dots,C_k\}$ tal que:</p>
<ol>
  <li><strong>Cobertura:</strong> $\bigcup_j C_j=X$ (toda observación está en algún clúster).</li>
  <li><strong>Disjuntividad:</strong> $C_i\cap C_j=\varnothing$ para $i\ne j$.</li>
  <li><strong>No vacío:</strong> $C_j\ne\varnothing$.</li>
</ol>
<p>Objetivo: minimizar la variabilidad interna (<em>cohesión</em>) y maximizar la externa (<em>separación</em>).</p>
<p><strong>Cinco pasos</strong> (C5.1 s4): (1) preparar los datos (limpiar, estandarizar); (2) definir la distancia; (3) elegir el algoritmo (jerárquico o particionado); (4) determinar el número óptimo de clústeres (codo, silueta, dendrograma); (5) validar e interpretar.</p>`,
      errores: ["Confundir clustering con clasificación: en clasificación hay etiquetas conocidas.", "Olvidar estandarizar en el paso 1 cuando las escalas difieren."],
      memoriza: String.raw`<p>No supervisado. Partición: cobertura, disjuntividad, no vacío. Pasos: datos → distancia → algoritmo → $k$ → validar.</p>`,
      comprueba: {
        enunciado: "¿Qué distingue al clustering de la clasificación supervisada?",
        opciones: ["No hay etiquetas previas: los grupos emergen de los datos", "Usa siempre K-medias", "Requiere conocer el número de clases", "Solo funciona con datos binarios"],
        correcta: 0,
        explicacion: "C5.1 s2: a diferencia de la supervisada, no se cuenta con etiquetas previas."
      },
      fuente: [{ id: "C5.1", loc: "slides 2–4" }]
    },

    {
      id: "m11-c02",
      titulo: "Distancias numéricas: euclídea, Minkowski y correlación",
      cubre: ["M11.3", "M11.4"],
      simple: String.raw`<p>La distancia más usada es la euclídea (línea recta). Manhattan, Euclídea y Chebyshev son casos de una misma familia, la de Minkowski. Si interesa el <em>patrón</em> y no el nivel, se usa una distancia basada en la correlación.</p>`,
      formal: String.raw`$$d(i,j)=\Bigl[\sum_p |x_{ip}-x_{jp}|^{\lambda}\Bigr]^{1/\lambda}$$
<ul>
  <li>$\lambda=1$: Manhattan · $\lambda=2$: euclídea · $\lambda=\infty$: Chebyshev (máxima diferencia en una variable).</li>
  <li>Euclídea al cuadrado $d^2$: la usa Ward (amplifica las distancias grandes).</li>
  <li><strong>Correlación:</strong> $d(i,j)=1-\operatorname{cor}(X_i,X_j)\in[0,2]$: $0$ correlación perfecta positiva, $1$ sin correlación, $2$ perfecta negativa. Invariante a cambios de escala (perfiles de genes, consumo…). En R: <code>1 - cor(t(datos))</code>.</li>
</ul>`,
      ejemplo: String.raw`<p>8 empresas con inversión y ventas (C5.1 s8). Entre E1 $=(16,10)$ y E2 $=(12,14)$: euclídea $\sqrt{16+16}=5{,}66$; Manhattan $4+4=8$; Chebyshev $4$.</p>`,
      r: {
        nota: "Código de C5.1 slide 8 (S5.1 líneas 15–28).",
        codigo: `datos <- data.frame(Inversion = c(16, 12, 10, 12, 45, 50, 45, 50),
                    Ventas    = c(10, 14, 22, 25, 10, 15, 25, 27))
rownames(datos) <- paste0("E", 1:8)
as.matrix(dist(datos, "euclidean"))["E1", "E2"]
as.matrix(dist(datos, "manhattan"))["E1", "E2"]
as.matrix(dist(datos, "maximum"))["E1", "E2"]`,
        rlab: "r-m11-distancias"
      },
      errores: ["Olvidar que la distancia por correlación se calcula entre filas (<code>t(datos)</code>)."],
      memoriza: String.raw`<p>Minkowski: $\lambda=1$ Manhattan, $2$ euclídea, $\infty$ Chebyshev (<code>"maximum"</code>). Correlación: $d=1-r\in[0,2]$.</p>`,
      comprueba: {
        enunciado: "Dos observaciones con correlación −1 tienen distancia basada en correlación…",
        opciones: ["2", "0", "1", "−1"],
        correcta: 0,
        explicacion: "d = 1 − (−1) = 2, el máximo."
      },
      verifica: [{ que: "euclídea E1–E2", js: "dist([16,10],[12,14])", esperado: 5.6569, tol: 0.0001 }, { que: "Manhattan E1–E2", js: "manhattan([16,10],[12,14])", esperado: 8, tol: 1e-9 }],
      fuente: [{ id: "C5.1", loc: "slides 6–9" }]
    },

    {
      id: "m11-c03",
      titulo: "Distancias binarias: Jaccard, Simple Matching y Hamming",
      cubre: ["M11.5", "M11.6"],
      simple: String.raw`<p>Para variables 0/1 se cuentan coincidencias y diferencias. La pregunta clave: ¿que dos observaciones tengan un 0 en común dice algo de su parecido? Si <strong>no</strong>, Jaccard; si <strong>sí</strong>, Simple Matching.</p>`,
      formal: String.raw`<p>Con $a$ = ambas 1, $b$ = (1,0), $c$ = (0,1), $d$ = ambas 0:</p>
$$d_{Jaccard}=\frac{b+c}{a+b+c}\qquad d_{SM}=\frac{b+c}{a+b+c+d}$$
<p>Jaccard ignora las coincidencias de ceros. La distancia de <strong>Hamming</strong> es el número de variables en que difieren ($b+c$); con 0/1 coincide con la Manhattan: <code>dist(x, "manhattan")</code> (AY5-R l.104).</p>`,
      ejemplo: String.raw`<p>C5.1 s11 compara E1 $=(1,1,0,0)$ y E2 $=(0,1,1,1)$. Contando posición por posición: $a=1$ (ambos 1 en la 2.ª), $b=1$ (E1=1, E2=0 en la 1.ª), $c=2$ (E1=0, E2=1 en la 3.ª y 4.ª), $d=0$. Entonces $d_{SM}=3/4=0{,}75$ y $d_{Jaccard}=3/4=0{,}75$.</p>
<p class="ayuda">La slide escribe «$a=1,b=1,c=1,d=1\Rightarrow d=0{,}5$», que no coincide con esos datos (ver «Diferencias entre fuentes»). Con $a=b=c=d=1$ la cuenta sí daría $0{,}5$ (SM) y $0{,}667$ (Jaccard).</p>
<p>Ayudantía 5, P3 (5 productos con 4 variables binarias): $P_1=(1,0,1,1)$ y $P_3=(0,1,0,0)$ difieren en las 4 variables ⇒ Hamming $=4$; $P_1$ y $P_2$ difieren en 1 ⇒ $1$.</p>`,
      r: {
        nota: "La slide usa ade4::dist.binary(method = 1) (Jaccard); aquí se calculan los mismos conteos en R base.",
        codigo: `x <- c(1, 1, 0, 0); y <- c(0, 1, 1, 1)
a <- sum(x & y); b <- sum(x & !y); c <- sum(!x & y); d <- sum(!x & !y)
c(a = a, b = b, c = c, d = d)
c(jaccard = (b + c) / (a + b + c), simple_matching = (b + c) / (a + b + c + d))`,
        rlab: "r-m11-binarias"
      },
      errores: ["Usar Simple Matching cuando la ausencia mutua no significa parecido (ahí corresponde Jaccard)."],
      memoriza: String.raw`<p>Jaccard $=\dfrac{b+c}{a+b+c}$ (ignora doble ausencia). SM $=\dfrac{b+c}{a+b+c+d}$. Hamming = número de diferencias = Manhattan con 0/1.</p>`,
      comprueba: {
        enunciado: "a=1, b=1, c=1, d=1. ¿Cuál es la distancia de Simple Matching?",
        opciones: ["0,5", "0,667", "0,25", "1"],
        correcta: 0,
        explicacion: "(1+1)/(1+1+1+1) = 0,5 (Jaccard daría 2/3)."
      },
      verifica: [{ que: "SM con a=b=c=d=1", js: "(1+1)/(1+1+1+1)", esperado: 0.5, tol: 1e-9 }, { que: "SM de E1 y E2 (a=1,b=1,c=2,d=0)", js: "(1+2)/(1+1+2+0)", esperado: 0.75, tol: 1e-9 }, { que: "Jaccard con a=b=c=1", js: "(1+1)/(1+1+1)", esperado: 0.6667, tol: 0.0001 }, { que: "Hamming P1–P3", js: "manhattan([1,0,1,1],[0,1,0,0])", esperado: 4, tol: 1e-9 }],
      fuente: [{ id: "C5.1", loc: "slides 10–11" }, { id: "AY5-E", loc: "P3" }, { id: "AY5-R", loc: "línea 104" }]
    },

    {
      id: "m11-c04",
      titulo: "Estandarización para clustering",
      cubre: ["M11.7"],
      simple: String.raw`<p>Sin estandarizar, la variable de números grandes domina las distancias. Estandarizando, todas contribuyen de forma comparable. Hay tres formas (repaso de M04).</p>`,
      formal: String.raw`<table class="tabla"><thead><tr><th>Método</th><th>Fórmula</th><th>Cuándo / nota</th></tr></thead><tbody>
<tr><td>Z-score</td><td>$(x-\bar x)/s$</td><td>Unidades o rangos distintos; media 0, sd 1; <code>scale(datos)</code></td></tr>
<tr><td>Rango $[0,\text{máx}]$</td><td>$x/\max$</td><td>Datos positivos; preserva el cero como origen</td></tr>
<tr><td>Min–max</td><td>$(x-\min)/(\max-\min)$</td><td>Extremos fijos en 0 y 1; <strong>muy sensible a outliers</strong></td></tr>
<tr><td>Sin escala</td><td>—</td><td>Solo si las variables ya están en unidades comparables; domina la variable grande</td></tr></tbody></table>`,
      ejemplo: String.raw`<p>C5.1 s13: empresas con activos (10–20) y trabajadores (40–350). Sin estandarizar, los trabajadores dominan la distancia por tener valores mayores; con estandarización ambas aportan por igual.</p>`,
      errores: ["Usar min–max con outliers: un valor extremo comprime al resto."],
      memoriza: String.raw`<p>Z: media 0, sd 1 (unidades distintas). $[0,\text{máx}]$: positivos. Min–max: extremos fijos, sensible a outliers. Sin escala: domina la variable grande.</p>`,
      comprueba: {
        enunciado: "¿Qué método de escalamiento es el más sensible a los outliers?",
        opciones: ["Min–max", "Z-score", "Ninguno", "Sin escala"],
        correcta: 0,
        explicacion: "Con min–max, un valor extremo fija el máximo o mínimo y comprime al resto (C5.1 s17)."
      },
      fuente: [{ id: "C5.1", loc: "slides 13–17" }]
    }
  ],

  errores: [
    { texto: "Sin estandarizar, la variable con valores más grandes domina las distancias.", fuente: [{ id: "C5.1", loc: "slide 13" }] }
  ]
});
