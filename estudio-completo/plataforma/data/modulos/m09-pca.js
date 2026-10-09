/* ============================================================================
   M09 · Análisis de Componentes Principales (P1)
   Fuentes abiertas para redactar: C3 slides 2–26 · AY2-E P5 y AY2-P (pauta) ·
   C4.2 slides 4–5 (Kaiser). Las fórmulas de C3 están como texto en las slides.
   Los números se recalculan en tools/verificar_numeros.js.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m09-pca",
  orden: 9,
  titulo: "Análisis de Componentes Principales (PCA)",
  descripcion: "Resumir muchas variables correlacionadas en pocas combinaciones nuevas que conservan la mayor variación posible: cómo se construyen, cuántas conservar y cómo leerlas.",
  pruebas: ["P1"],
  prioridad: "alta",
  fuentes: [{ id: "C3", loc: "slides 2–26" }, { id: "AY2-E", loc: "P5" }, { id: "C4.2", loc: "slides 4–5" }],

  conceptos: [
    {
      id: "m09-c01",
      titulo: "Qué es PCA, para qué sirve, ventajas y limitaciones",
      cubre: ["M09.1"],
      simple: String.raw`<p>PCA reduce la dimensión: pasa de muchas variables correlacionadas a pocas variables nuevas (los <strong>componentes principales</strong>) que resumen la mayor parte de la información. <strong>No elimina variables:</strong> crea combinaciones lineales de todas ellas.</p>`,
      formal: String.raw`<ul>
  <li>Cada componente es una <strong>combinación lineal</strong> de las variables originales.</li>
  <li>Se ordenan por variabilidad: PC1 explica lo máximo posible; PC2 explica lo máximo de lo que queda y es <strong>ortogonal</strong> a PC1; y así sucesivamente.</li>
  <li><strong>Ventajas:</strong> reduce dimensionalidad, elimina redundancia, simplifica modelos, permite visualizar en 2D o 3D.</li>
  <li><strong>No hace:</strong> no distingue variables importantes por sí misma; no garantiza que cada componente sea interpretable; no es adecuada si las relaciones no son lineales (C3 s6).</li>
</ul>`,
      errores: ["Decir que PCA «elimina variables»: crea nuevas variables, y cada una usa todas las originales.", "Aplicar PCA a relaciones claramente no lineales."],
      memoriza: String.raw`<p>PCA = combinaciones lineales ortogonales ordenadas por varianza. No elimina variables, solo lineal, no es un modelo predictivo.</p>`,
      comprueba: {
        enunciado: "¿Cuál afirmación sobre PCA es correcta?",
        opciones: ["Crea nuevas variables que son combinaciones lineales de las originales", "Elimina las variables menos importantes", "Es un modelo predictivo", "Funciona igual de bien con relaciones no lineales"],
        correcta: 0,
        explicacion: "PCA no elimina variables ni predice: reorganiza la información en componentes lineales."
      },
      fuente: [{ id: "C3", loc: "slides 2–7" }]
    },

    {
      id: "m09-c02",
      titulo: "Cómo se construye: centrar, S y autovalores",
      figura: { tipo: "proyeccion", modo: "varianza", x: [12.0, 14.5, 13.1, 15.3, 16.2, 11.8, 14.0, 13.7, 15.9, 12.6], y: [8.2, 7.9, 9.1, 10.5, 9.7, 8.8, 9.3, 10.1, 9.9, 8.6], ejes: ["X₁", "X₂"], ang: 90,
        pie: "Las variables X₁ y X₂ de la clase 1. Cada punto se proyecta sobre la recta; PCA elige la dirección donde esas proyecciones tienen la mayor varianza." },
      cubre: ["M09.2", "M09.3"],
      simple: String.raw`<p>Se centran los datos, se calcula la matriz de covarianza $S$ y se buscan sus <strong>direcciones principales</strong>: los autovectores. Cada autovalor dice cuánta variabilidad hay en su dirección.</p>`,
      formal: String.raw`<ol>
  <li><strong>Centrar:</strong> $\tilde X=X-\mathbf 1\bar x^{\top}$ (si no se centra, PC1 apuntaría hacia la media y no hacia la máxima variación).</li>
  <li><strong>Covarianza:</strong> $S=\dfrac1{n-1}\tilde X^{\top}\tilde X$; simétrica, semidefinida positiva, autovectores ortogonales.</li>
  <li><strong>Autovalores:</strong> $Sv=\lambda v$. $v$ = dirección de variación; $\lambda$ = varianza explicada en esa dirección; $\lambda_1\ge\lambda_2\ge\dots\ge\lambda_p\ge0$.</li>
</ol>
<p>PC1 resuelve $\max\ w^{\top}Sw$ sujeto a $\lVert w\rVert=1$ (multiplicadores de Lagrange ⇒ $Sw=\lambda w$): es el autovector del mayor $\lambda_1$ y su varianza es exactamente $\lambda_1$. PC2 es el siguiente autovector, ortogonal a PC1 porque $S$ es simétrica.</p>`,
      errores: ["Confundir autovalor (varianza explicada) con autovector (dirección).", "Olvidar centrar (o estandarizar) antes de calcular."],
      memoriza: String.raw`<p>$Sv=\lambda v$: $v$ = dirección, $\lambda$ = varianza explicada. $\lambda_1\ge\dots\ge\lambda_p\ge0$. PC1: max $w^{\top}Sw$ con $\lVert w\rVert=1$.</p>`,
      comprueba: {
        enunciado: "En PCA, ¿qué representa el autovalor de un componente?",
        opciones: ["La varianza de los datos en la dirección de ese componente", "El número de variables que lo componen", "El signo del componente", "La media de los datos"],
        correcta: 0,
        explicacion: "λ es la varianza explicada por esa dirección (C3 s10)."
      },
      fuente: [{ id: "C3", loc: "slides 8–12" }]
    },

    {
      id: "m09-c03",
      titulo: "Proyección: loadings y scores",
      cubre: ["M09.4"],
      simple: String.raw`<p>Los <strong>loadings</strong> son los pesos con que cada variable entra en un componente; los <strong>scores</strong> son los valores que toma cada observación en los componentes (sus nuevas coordenadas).</p>`,
      formal: String.raw`$$Z=\tilde X\,V_m\qquad \hat z_{i\ell}=\sum_{j=1}^{p}\tilde x_{ij}\,v_{j\ell}$$
<p>$V_m=[v_1,\dots,v_m]$ son los primeros $m$ autovectores; $Z$ tiene $n$ filas y $m$ columnas. Un loading con valor absoluto grande indica una variable importante para ese componente; el signo indica la dirección de la relación.</p>
<p><strong>Para obtener el score de una observación nueva</strong> hay que usar los valores <em>centrados y estandarizados</em> con la media y desviación de la muestra original, no los valores crudos (Ayudantía 2, P5d): si no, la variable de mayor escala domina el resultado.</p>`,
      errores: ["Reemplazar los valores originales directamente en la expresión de PC1 cuando esta se definió con variables estandarizadas."],
      memoriza: String.raw`<p>Loadings = pesos $v_{j\ell}$ (<code>pca$rotation</code>); scores = $Z=\tilde XV$ (<code>pca$x</code>). Score de un dato nuevo: primero estandarizar con media y sd de la muestra.</p>`,
      comprueba: {
        enunciado: "PC1 se definió con variables estandarizadas. Para calcular el score de un cliente nuevo, ¿qué hay que hacer?",
        opciones: ["Estandarizar sus valores con la media y sd de la muestra y luego usar los loadings", "Usar sus valores originales directamente", "Dividir por el número de variables", "Restar solo el máximo"],
        correcta: 0,
        explicacion: "La expresión está en variables estandarizadas; usar valores crudos distorsionaría el score."
      },
      fuente: [{ id: "C3", loc: "slides 13–14" }, { id: "AY2-E", loc: "P5(d)" }, { id: "AY2-P", loc: "P5(d)" }]
    },

    {
      id: "m09-c04",
      titulo: "Varianza explicada y cuántos componentes conservar",
      figura: { tipo: "sedimentacion", donde: "ejemplo", valores: [2.137, 0.982, 0.744, 0.138], kaiser: true,
        acumulado: ["53,4 %", "77,96 %", "96,55 %", "100 %"],
        pie: "Ayudantía 2, P5(a): Kaiser y el codo sugieren 1 componente; la regla del 80 % pide 3." },
      cubre: ["M09.5"],
      simple: String.raw`<p>Para decidir cuántos componentes quedarse hay tres reglas: acumular al menos el $80\,\%$ de la varianza, quedarse con los de autovalor mayor que $1$ (Kaiser) o mirar el «codo» del gráfico de sedimentación (scree plot).</p>`,
      formal: String.raw`$$\text{Varianza explicada por PC}_k=\frac{\lambda_k}{\sum_{i=1}^{p}\lambda_i}$$
<ul>
  <li><strong>Regla del 80 %:</strong> conservar los componentes que acumulen al menos 80 %.</li>
  <li><strong>Kaiser:</strong> conservar los de $\lambda>1$ (si los datos están estandarizados).</li>
  <li><strong>Scree plot:</strong> buscar el codo donde los autovalores dejan de decrecer rápido.</li>
</ul>
<p>En <code>summary(prcomp(…))</code>, <em>Standard deviation</em> es la raíz del autovalor: $\lambda_k=\text{sd}_k^{\,2}$.</p>`,
      ejemplo: String.raw`<p>Ayudantía 2, P5(a) con el <code>summary</code> entregado (sd $=1{,}4617;\ 0{,}9909;\ 0{,}8623;\ 0{,}3714$): $\lambda=2{,}137;\ 0{,}982;\ 0{,}744;\ 0{,}138$.</p>
<ol>
  <li><strong>Kaiser:</strong> solo $\lambda_1>1$ ⇒ 1 componente.</li>
  <li><strong>Codo:</strong> la mayor caída es entre PC1 y PC2 ⇒ 1 componente (según la pauta).</li>
  <li><strong>80 %:</strong> acumulado $53{,}4\,\%$; $77{,}96\,\%$; $96{,}55\,\%$ ⇒ 3 componentes.</li>
</ol>
<p>Los tres criterios pueden dar respuestas distintas: hay que justificar la elección.</p>`,
      errores: ["Aplicar Kaiser a datos sin estandarizar (el umbral $1$ vale para la matriz de correlación).", "Olvidar que sd es la raíz del autovalor."],
      memoriza: String.raw`<p>$\lambda_k/\sum\lambda$ · 80 % acumulado · Kaiser $\lambda>1$ (datos estandarizados) · codo del scree plot · $\lambda=\text{sd}^2$.</p>`,
      comprueba: {
        enunciado: "Un summary(prcomp) muestra sd de PC1 = 1,4617. ¿Cuál es el autovalor de PC1?",
        opciones: ["Aprox. 2,137", "Aprox. 1,209", "1,4617", "0,7308"],
        correcta: 0,
        explicacion: "El autovalor es el cuadrado de la desviación estándar: 1,4617² ≈ 2,137."
      },
      verifica: [
        { que: "λ1 de AY2 P5", js: "1.4617*1.4617", esperado: 2.1366, tol: 0.0001 },
        { que: "varianza acumulada con 3 PC", js: "0.5341+0.2455+0.1859", esperado: 0.9655, tol: 0.00005 }
      ],
      fuente: [{ id: "C3", loc: "slide 15" }, { id: "C4.2", loc: "slides 4–5" }, { id: "AY2-E", loc: "P5(a)" }]
    },

    {
      id: "m09-c05",
      titulo: "Ejemplo numérico 3 × 2",
      figura: { tipo: "proyeccion", modo: "varianza", donde: "ejemplo", x: [2, 0, 3], y: [0, 2, 3], dec: 3, ang: 0,
        atajos: [[45, "45° (v₁)"], [135, "135° (v₂)"]],
        pie: "Los tres puntos del ejemplo: a 45° la varianza de las proyecciones es 2,667 (λ₁) y a 135° es 2 (λ₂)." },
      cubre: ["M09.6"],
      simple: String.raw`<p>Un ejemplo pequeño que se puede hacer a mano: tres observaciones y dos variables.</p>`,
      formal: String.raw`<p>$X=\begin{pmatrix}2&0\\0&2\\3&3\end{pmatrix}$, medias $\bar x_1=\bar x_2=1{,}67$.</p>`,
      ejemplo: String.raw`<ol>
  <li>Centrado: $\tilde X=\begin{pmatrix}0{,}33&-1{,}67\\-1{,}67&0{,}33\\1{,}33&1{,}33\end{pmatrix}$.</li>
  <li>$S=\tfrac12\tilde X^{\top}\tilde X=\begin{pmatrix}2{,}333&0{,}333\\0{,}333&2{,}333\end{pmatrix}$.</li>
  <li>Autovalores: $\lambda_1=2{,}667$ (PC1), $\lambda_2=2$ (PC2). Autovectores $v_1=\tfrac1{\sqrt2}(1,1)$ y $v_2=\tfrac1{\sqrt2}(1,-1)$.</li>
  <li>$v_1$: ambas variables pesan igual y suman; $v_2$: contraste (una resta a la otra).</li>
  <li>Scores $Z=\tilde XV$: aproximadamente $(-0{,}94;\ \pm1{,}41)$, $(-0{,}94;\ \mp1{,}41)$ y $(1{,}89;\ 0)$. Los signos de PC2 dependen del signo elegido para $v_2$.</li>
</ol>
<p class="ayuda">La slide 18 muestra $-0{,}95$ y $1{,}90$; el valor exacto es $-0{,}943$ y $1{,}886$ (ver «Diferencias entre fuentes»).</p>`,
      r: {
        nota: "Verificación del ejemplo de C3 s16–18 con eigen().",
        codigo: `X <- matrix(c(2, 0, 0, 2, 3, 3), 3, byrow = TRUE)
S <- cov(X)
e <- eigen(S)
e$values
round(scale(X, scale = FALSE) %*% e$vectors, 2)`,
        rlab: "r-m09-ejemplo"
      },
      errores: ["Dividir por $n$ en vez de $n-1$ al calcular $S$."],
      memoriza: String.raw`<p>Ejemplo 3×2: $S=\begin{pmatrix}2{,}333&0{,}333\\0{,}333&2{,}333\end{pmatrix}$, $\lambda_1=2{,}667$, $\lambda_2=2$.</p>`,
      comprueba: {
        enunciado: "En el ejemplo 3×2, ¿qué variabilidad explica PC1 respecto del total?",
        opciones: ["Aprox. 57 % (2,667 de 4,667)", "50 %", "100 %", "Aprox. 43 %"],
        correcta: 0,
        explicacion: "2,667 / (2,667 + 2) = 0,571."
      },
      verifica: [{ que: "proporción de PC1", js: "(8/3)/(8/3+2)", esperado: 0.5714, tol: 0.0001 }],
      fuente: [{ id: "C3", loc: "slides 16–18" }]
    },

    {
      id: "m09-c06",
      titulo: "PCA en R e interpretación de loadings",
      figura: { tipo: "planoCargas", donde: "ejemplo", max: 0.6, ejes: ["PC1", "PC2"],
        variables: [{ n: "mpg", a: [-0.363, 0.016] }, { n: "cyl", a: [0.374, 0.044] }, { n: "disp", a: [0.368, -0.049] }, { n: "hp", a: [0.330, 0.249] },
          { n: "drat", a: [-0.294, 0.275] }, { n: "wt", a: [0.346, -0.143] }, { n: "qsec", a: [-0.200, -0.463] }, { n: "vs", a: [-0.307, -0.232] },
          { n: "am", a: [-0.235, 0.429] }, { n: "gear", a: [-0.207, 0.462] }, { n: "carb", a: [0.214, 0.414] }],
        pie: "Loadings de mtcars (<code>pca$rotation</code>). A la derecha en PC1: tamaño y potencia; a la izquierda: eficiencia. Arriba en PC2: gear, am y carb; abajo: qsec. Flechas cercanas = variables correlacionadas." },
      cubre: ["M09.7", "M09.8"],
      simple: String.raw`<p><code>prcomp(datos, scale. = TRUE)</code> hace todo el PCA (estandariza antes). Después se lee cuánta varianza explica cada componente y qué variables pesan en cada uno.</p>`,
      formal: String.raw`<table class="tabla"><thead><tr><th>Función</th><th>Qué entrega</th></tr></thead><tbody>
<tr><td><code>prcomp(datos, scale. = TRUE)</code></td><td>PCA con variables estandarizadas (fundamental si hay unidades distintas)</td></tr>
<tr><td><code>summary(pca)</code></td><td>Standard deviation (= √autovalor), Proportion of Variance, Cumulative Proportion</td></tr>
<tr><td><code>screeplot(pca, type = "lines")</code></td><td>Gráfico de autovalores (buscar el codo)</td></tr>
<tr><td><code>pca$rotation</code></td><td>Loadings</td></tr>
<tr><td><code>pca$x</code></td><td>Scores</td></tr>
<tr><td><code>biplot(pca, scale = 0)</code></td><td>Observaciones y variables juntas; flechas cercanas = variables correlacionadas</td></tr></tbody></table>
<p><strong>Regla de interpretación (C3 s22):</strong> $|\text{loading}|\ge0{,}30$ ⇒ variable relevante; $\ge0{,}40$ ⇒ variable fuerte. El signo es la dirección.</p>`,
      ejemplo: String.raw`<p>mtcars (C3 s19–24; 32 autos, 11 variables): PC1 explica $60{,}1\,\%$ y PC2 $24{,}1\,\%$ (acumulado $84{,}2\,\%$; la slide dice «~80 %»).</p>
<ul>
  <li><strong>PC1:</strong> positivos <code>cyl</code> ($0{,}37$), <code>disp</code>, <code>hp</code>, <code>wt</code>; negativos <code>mpg</code> ($-0{,}36$), <code>drat</code> ⇒ «tamaño y potencia vs. eficiencia».</li>
  <li><strong>PC2:</strong> positivos <code>gear</code> ($0{,}46$), <code>am</code>, <code>carb</code>; negativo <code>qsec</code> ($-0{,}46$) ⇒ «configuración deportiva vs. desempeño en aceleración».</li>
</ul>`,
      r: {
        nota: "Código de C3 slide 20 y 25 (se omiten head/str y los gráficos).",
        codigo: `pca <- prcomp(mtcars, scale. = TRUE)
summary(pca)
round(pca$rotation[, 1:2], 3)`,
        rlab: "r-m09-mtcars"
      },
      lectura: String.raw`<ul>
  <li><code>Standard deviation</code> de PC1: $2{,}5707$ ⇒ $\lambda_1=6{,}61$ (de $11$ en total).</li>
  <li><code>Cumulative Proportion</code>: con 2 componentes $84{,}2\,\%$; con 3, $89{,}9\,\%$.</li>
  <li><code>pca$rotation</code>: cada columna es un componente; el <em>signo</em> de un componente completo es arbitrario (se puede invertir sin cambiar nada).</li>
</ul>`,
      errores: ["Olvidar <code>scale. = TRUE</code> cuando las variables tienen unidades distintas.", "Interpretar un loading de 0,05 como «importante»."],
      memoriza: String.raw`<p><code>prcomp(datos, scale. = TRUE)</code> · <code>summary</code> · <code>screeplot</code> · <code>$rotation</code> (loadings) · <code>$x</code> (scores) · <code>biplot</code>. $|l|\ge0{,}30$ relevante, $\ge0{,}40$ fuerte.</p>`,
      comprueba: {
        enunciado: "Un loading de −0,45 en PC1 para la variable mpg, ¿cómo se interpreta?",
        opciones: ["mpg es una variable fuerte en PC1, con relación negativa", "mpg no es relevante", "mpg tiene varianza negativa", "Hay un error: los loadings no pueden ser negativos"],
        correcta: 0,
        explicacion: "|−0,45| ≥ 0,40 ⇒ fuerte; el signo negativo indica la dirección."
      },
      verifica: [
        { que: "% PC1 mtcars", r: `cat(round(summary(prcomp(mtcars, scale. = TRUE))$importance[2, 1], 4))`, esperado: 0.6008, tol: 0.00005 },
        { que: "% acumulado 2 PC mtcars", r: `cat(round(summary(prcomp(mtcars, scale. = TRUE))$importance[3, 2], 4))`, esperado: 0.8417, tol: 0.00005 }
      ],
      fuente: [{ id: "C3", loc: "slides 19–26" }, { id: "AY3-R", loc: "líneas 21–118" }]
    }
  ],

  cuando: String.raw`<div class="tabla-scroll"><table class="tabla">
<thead><tr><th>Pregunta</th><th>Criterio / herramienta</th></tr></thead>
<tbody>
<tr><td>¿Cuántos componentes conservar?</td><td>80 % acumulado · Kaiser ($\lambda>1$) · codo del scree plot</td></tr>
<tr><td>¿Qué variables definen un componente?</td><td>Loadings: $|l|\ge0{,}30$ relevante, $\ge0{,}40$ fuerte</td></tr>
<tr><td>¿Dónde queda cada observación?</td><td>Scores: <code>pca$x</code></td></tr>
<tr><td>¿Vale la pena hacer PCA?</td><td>Bartlett (M02): hay correlación entre variables</td></tr>
</tbody></table></div>`,

  errores: [
    { texto: "Aplicar PCA sin estandarizar cuando las variables tienen unidades distintas.", fuente: [{ id: "C3", loc: "slide 20" }] }
  ]
});
