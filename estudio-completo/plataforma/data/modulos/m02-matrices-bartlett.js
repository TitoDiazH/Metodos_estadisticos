/* ============================================================================
   M02 · Matriz de covarianza, matriz de correlación y test de Bartlett (P1)
   Fuentes abiertas para redactar: C1 slides 22–31 · AY1-E Parte II P1, P3, P4, P5 ·
   AY1-R líneas 96–160 (P2–P3) · C4.1 s18 · C4.2 s16.
   Las fórmulas de C1 s22–23 y s27–30 están como imagen: aquí se escriben las
   versiones estándar y los números se recalculan en tools/verificar_numeros.js.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m02-matrices-bartlett",
  orden: 2,
  titulo: "Matriz de covarianza, matriz de correlación y test de Bartlett",
  descripcion: "Resumir todas las relaciones lineales entre varias variables en una matriz, saber cuándo una matriz es válida y decidir con Bartlett si vale la pena aplicar PCA o análisis factorial.",
  pruebas: ["P1"],
  prioridad: "alta",
  fuentes: [{ id: "C1", loc: "slides 22–31" }, { id: "AY1-E", loc: "Parte II, P1, P3, P4, P5" }, { id: "AY1-R", loc: "líneas 96–160" }],

  conceptos: [
    {
      id: "m02-c01",
      titulo: "Matriz de covarianza Σ y sus propiedades",
      cubre: ["M02.1", "M02.3"],
      simple: String.raw`<p>Con $p$ variables hay muchas covarianzas posibles; la <strong>matriz de covarianza</strong> las ordena todas en una tabla cuadrada.</p>
<ul>
  <li><strong>Diagonal:</strong> la varianza de cada variable.</li>
  <li><strong>Fuera de la diagonal:</strong> la covarianza de cada par de variables.</li>
  <li>Es <strong>simétrica</strong>: la covarianza de $X_1$ con $X_2$ es la misma que la de $X_2$ con $X_1$.</li>
</ul>`,
      formal: String.raw`<p>Sea $X=(X_1,\dots,X_p)$ un vector aleatorio con media $\mu$. Su matriz de covarianza es $\Sigma=\operatorname{Cov}(X)$, con $\Sigma_{ii}=\operatorname{Var}(X_i)$ y $\Sigma_{ij}=\operatorname{Cov}(X_i,X_j)$.</p>
<p>Propiedades (C1 s23: «los valores propios son no negativos; $\Sigma$ es semidefinida positiva»):</p>
<ul>
  <li>Simétrica: $\Sigma=\Sigma^{\top}$.</li>
  <li>Semidefinida positiva: $z^{\top}\Sigma z\ge 0$ para todo vector $z$, y todos sus valores propios son $\ge 0$.</li>
  <li>Si $z^{\top}\Sigma z>0$ para todo $z\ne 0$, es <em>definida positiva</em> (valores propios todos $>0$, determinante $>0$).</li>
</ul>
<p><strong>¿Puede ser una matriz de covarianza?</strong> Se revisa: (1) simétrica, (2) varianzas $\ge 0$ en la diagonal, (3) semidefinida positiva. Si es de <em>correlación</em>, además: unos en la diagonal y $|r_{ij}|\le 1$.</p>`,
      ejemplo: String.raw`<p>Ayudantía 1, ejercicio 4: $\Sigma=\begin{pmatrix}4&1\\1&3\end{pmatrix}$ y $z=(z_1,z_2)^{\top}\neq 0$.</p>
<ol>
  <li>Forma cuadrática: $Q=z^{\top}\Sigma z=4z_1^2+2z_1z_2+3z_2^2$.</li>
  <li>Se reordena: $Q=(z_1+z_2)^2+3z_1^2+2z_2^2$, que es suma de cuadrados y solo vale $0$ si $z_1=z_2=0$.</li>
  <li>Luego $z^{\top}\Sigma z>0$ para todo $z\ne0$ y $\Sigma$ es definida positiva.</li>
</ol>
<p>Comprobación con los valores propios: son $4{,}618$ y $2{,}382$, ambos positivos.</p>`,
      r: {
        nota: "Los valores propios de una matriz simétrica se obtienen con eigen() (C1 s24). Todos positivos ⇒ definida positiva.",
        codigo: `Sigma <- matrix(c(4, 1,
                  1, 3), 2, byrow = TRUE)
eigen(Sigma)$values`
      },
      errores: [
        "Creer que cualquier tabla simétrica es una matriz de covarianza: además debe ser semidefinida positiva (valores propios ≥ 0).",
        "Olvidar que la diagonal de una matriz de covarianza son varianzas (nunca negativas)."
      ],
      quepasa: [
        {
          si: "…una matriz tiene un valor propio negativo?",
          entonces: String.raw`<p>No puede ser una matriz de covarianza: habría una combinación lineal de las variables con varianza negativa, lo cual es imposible. Es la forma rápida de descartar una matriz «candidata» en un ejercicio.</p>`
        }
      ],
      memoriza: String.raw`<p>$\Sigma$: simétrica, diagonal = varianzas, <strong>semidefinida positiva</strong> (autovalores $\ge0$).</p>`,
      comprueba: {
        enunciado: "¿Cuál de estas condiciones NO es necesaria para que una matriz sea una matriz de covarianza?",
        opciones: ["Tener unos en la diagonal", "Ser simétrica", "Ser semidefinida positiva", "Tener varianzas ≥ 0 en la diagonal"],
        correcta: 0,
        explicacion: "Los unos en la diagonal son propios de la matriz de correlación; la de covarianza tiene las varianzas en la diagonal."
      },
      verifica: [{ que: "menor valor propio de Σ = [[4,1],[1,3]]", r: `cat(round(min(eigen(matrix(c(4,1,1,3),2))$values), 3))`, esperado: 2.382, tol: 0.0005 }],
      fuente: [{ id: "C1", loc: "slides 22–23" }, { id: "AY1-E", loc: "Parte II, P4" }, { id: "PR-P1-Q1", loc: "afirmación 1" }]
    },

    {
      id: "m02-c02",
      titulo: "cov(datos) y eigen(S)",
      cubre: ["M02.2"],
      simple: String.raw`<p>En R, <code>cov(datos)</code> entrega la matriz de covarianza muestral de un data frame. Después, <code>eigen()</code> descompone esa matriz en <strong>valores propios</strong> (cuánta variación hay en cada dirección) y <strong>vectores propios</strong> (las direcciones). Esa descomposición es la base del PCA.</p>`,
      formal: String.raw`<p>La matriz muestral es $S=\dfrac{1}{n-1}\tilde X^{\top}\tilde X$, con $\tilde X$ la matriz de datos centrada (se divide por $n-1$). La descomposición espectral resuelve $Sv=\lambda v$.</p>`,
      ejemplo: String.raw`<p>Datos de la clase (C1 s24), $n=10$ y $p=4$ variables $X_1,\dots,X_4$. La matriz $S$ tiene varianzas $2{,}445;\ 0{,}719;\ 1{,}766;\ 0{,}245$ en la diagonal y covarianzas todas positivas. Sus valores propios son $4{,}350;\ 0{,}527;\ 0{,}276;\ 0{,}023$: el primero concentra casi toda la variación.</p>
<p>La suma de los valores propios es la suma de las varianzas ($\operatorname{tr}S=5{,}176$).</p>`,
      r: {
        nota: "Código de C1 slide 24. El resultado completo está en el Laboratorio R.",
        codigo: `X1 <- c(12.0, 14.5, 13.1, 15.3, 16.2, 11.8, 14.0, 13.7, 15.9, 12.6)
X2 <- c(8.2, 7.9, 9.1, 10.5, 9.7, 8.8, 9.3, 10.1, 9.9, 8.6)
X3 <- c(21.0, 20.5, 19.8, 22.1, 23.4, 20.2, 21.7, 22.5, 23.1, 19.9)
X4 <- c(5.5, 6.1, 5.8, 6.7, 6.4, 5.2, 5.9, 6.3, 6.6, 5.6)
datos <- data.frame(X1, X2, X3, X4)
S <- cov(datos)       # cov usa n-1
eigen(S)$values`,
        rlab: "r-m02-cov-eigen"
      },
      lectura: String.raw`<ul>
  <li><code>cov(datos)</code>: matriz $4\times4$ simétrica; la diagonal son varianzas.</li>
  <li><code>eigen(S)$values</code>: valores propios ordenados de mayor a menor, todos $\ge0$; su suma es la varianza total.</li>
</ul>`,
      errores: ["Pensar que <code>cov()</code> divide por $n$: usa $n-1$."],
      memoriza: String.raw`<p><code>cov</code> divide por $n-1$. <code>eigen(S)$values</code> $\ge0$ y suman $\operatorname{tr}(S)$ (puente a PCA).</p>`,
      comprueba: {
        enunciado: "¿Qué valor debe tener la suma de los valores propios de S?",
        opciones: ["La suma de las varianzas (traza de S)", "Siempre 1", "El determinante de S", "La suma de las covarianzas"],
        correcta: 0,
        explicacion: "La suma de los valores propios es la traza de la matriz, es decir, la suma de las varianzas de la diagonal."
      },
      verifica: [{ que: "traza de S = suma de valores propios", r: `X1 <- c(12.0, 14.5, 13.1, 15.3, 16.2, 11.8, 14.0, 13.7, 15.9, 12.6)
X2 <- c(8.2, 7.9, 9.1, 10.5, 9.7, 8.8, 9.3, 10.1, 9.9, 8.6)
X3 <- c(21.0, 20.5, 19.8, 22.1, 23.4, 20.2, 21.7, 22.5, 23.1, 19.9)
X4 <- c(5.5, 6.1, 5.8, 6.7, 6.4, 5.2, 5.9, 6.3, 6.6, 5.6)
S <- cov(data.frame(X1, X2, X3, X4))
cat(round(sum(diag(S)), 3))`, esperado: 5.176, tol: 0.0005 }],
      fuente: [{ id: "C1", loc: "slide 24" }, { id: "AY1-E", loc: "Parte II, P5d" }]
    },

    {
      id: "m02-c03",
      titulo: "Matriz de correlación de Pearson",
      cubre: ["M02.4"],
      simple: String.raw`<p>La matriz de correlación es la matriz de covarianza <strong>sin unidades</strong>: cada covarianza se divide por las desviaciones de sus dos variables. Así todas las relaciones quedan en la misma escala y se pueden comparar.</p>`,
      formal: String.raw`<p>$$r_{ij}=\frac{s_{ij}}{\sqrt{s_{ii}\,s_{jj}}}$$</p>
<p>Diagonal $=1$; fuera de la diagonal, valores entre $-1$ y $1$ (C1 s25–26). En R: <code>cor(datos)</code> o <code>cov2cor(S)</code>.</p>`,
      ejemplo: String.raw`<p>Ayudantía 1, ejercicio 1: tiempo, costo y distancia con $\Sigma=\begin{pmatrix}16&6&8\\6&9&1\\8&1&25\end{pmatrix}$.</p>
<ol>
  <li>Desviaciones estándar (diagonal$^{1/2}$): $4;\ 3;\ 5$.</li>
  <li>$r_{12}=6/\sqrt{16\cdot9}=0{,}5$; $r_{13}=8/\sqrt{16\cdot25}=0{,}4$; $r_{23}=1/\sqrt{9\cdot25}=0{,}0667$.</li>
  <li>Más fuerte: variables 1 y 2 ($0{,}5$, moderada positiva). La más débil: 2 y 3 ($0{,}07$).</li>
</ol>`,
      r: {
        nota: "cor(datos) sobre el data frame de C1 s26, o cov2cor(Sigma) si solo se tiene la matriz de covarianza (como en la Ayudantía 1).",
        codigo: `Sigma <- matrix(c(16, 6, 8,
                  6, 9, 1,
                  8, 1, 25), 3, byrow = TRUE)
cov2cor(Sigma)`,
        rlab: "r-m02-cor"
      },
      errores: ["Dar interpretaciones causales («X1 causa X2»): la correlación solo mide asociación lineal."],
      memoriza: String.raw`<p>$r_{ij}=s_{ij}/\sqrt{s_{ii}s_{jj}}$ · diagonal $=1$ · $|r_{ij}|\le1$ · quita el efecto de las unidades.</p>`,
      comprueba: {
        enunciado: "Con Σ = [[16,6,8],[6,9,1],[8,1,25]], ¿cuál es la correlación entre X1 y X3?",
        opciones: ["0,4", "0,5", "0,32", "8"],
        correcta: 0,
        explicacion: "r13 = 8/√(16·25) = 8/20 = 0,4."
      },
      verifica: [{ que: "r13", js: "8/Math.sqrt(16*25)", esperado: 0.4, tol: 1e-9 }, { que: "r12", js: "6/Math.sqrt(16*9)", esperado: 0.5, tol: 1e-9 }],
      fuente: [{ id: "C1", loc: "slides 25–26" }, { id: "AY1-E", loc: "Parte II, P1" }, { id: "AY1-R", loc: "líneas 96–120" }]
    },

    {
      id: "m02-c04",
      titulo: "Test de esfericidad de Bartlett",
      cubre: ["M02.5", "M02.6"],
      simple: String.raw`<p>Antes de aplicar PCA o análisis factorial hay que preguntarse: ¿las variables están correlacionadas entre sí? Si no lo estuvieran, no habría nada que resumir. El test de Bartlett responde eso: compara la matriz de correlación con la <strong>identidad</strong> (todas las correlaciones cero).</p>`,
      formal: String.raw`<p>$H_0: R=I_p$ (no hay correlación) frente a $H_1: R\ne I_p$ (C1 s27–28). Requiere normalidad multivariante (C4.1 s18).</p>
<p>Estadístico (el de la Ayudantía 1, ejercicio 3):</p>
$$\chi^2_{B}=-\Bigl(n-1-\frac{2p+5}{6}\Bigr)\ln|R|,\qquad \text{gl}=\frac{p(p-1)}{2}$$
<p>Decisión: $p<\alpha$ (o $\chi^2_B>\chi^2_{\alpha,\text{gl}}$) ⇒ se rechaza $H_0$ ⇒ hay correlaciones aprovechables (C1 s29–30). $p\ge\alpha$ ⇒ no hay evidencia suficiente de correlación global. Si $|R|=1$ (identidad), $\ln|R|=0$ y el estadístico es $0$.</p>`,
      ejemplo: String.raw`<p>Ayudantía 1, ejercicio 3: $n=10$ y $p=3$ con la matriz de correlación del ejercicio 1.</p>
<ol>
  <li>$|R|=0{,}6122$, así que $\ln|R|=-0{,}4906$.</li>
  <li>Coeficiente: $n-1-\dfrac{2p+5}{6}=9-\dfrac{11}{6}=7{,}1667$.</li>
  <li>$\chi^2_B=7{,}1667\times0{,}4906=3{,}516$, con $\text{gl}=3$.</li>
  <li>Valor crítico $\chi^2_{0{,}95;3}=7{,}815$. Como $3{,}516<7{,}815$, <strong>no se rechaza</strong> $H_0$ (p-valor $\approx0{,}319$): con $n=10$ no hay evidencia de que exista correlación entre al menos dos variables.</li>
</ol>`,
      r: {
        nota: "A mano (AY1-R líneas 131–137) y con psych::cortest.bartlett (C1 slide 31).",
        codigo: `Sigma <- matrix(c(16, 6, 8, 6, 9, 1, 8, 1, 25), 3, byrow = TRUE)
Rmat <- cov2cor(Sigma)
n <- 10; p <- 3
bart <- -(n - 1 - (2*p + 5)/6) * log(det(Rmat))
bart
qchisq(0.95, p*(p - 1)/2)`,
        rlab: "r-m02-bartlett"
      },
      lectura: String.raw`<ul>
  <li><code>bart</code> es el estadístico $\chi^2_B$; se compara con <code>qchisq(0.95, gl)</code>.</li>
  <li>Con <code>psych::cortest.bartlett(R, n = nrow(datos))</code> la salida trae <code>$chisq</code>, <code>$p.value</code> y <code>$df</code>: se decide con el p-valor.</li>
  <li><strong>Cuidado:</strong> hay que pasar <code>n</code>; sin él la función no sabe cuántas observaciones hay.</li>
</ul>`,
      errores: [
        "Pasar la matriz de covarianza en vez de la de correlación al estadístico (usa el determinante de <strong>R</strong>).",
        "Concluir «no hay correlación» cuando no se rechaza: solo falta evidencia (puede ser un $n$ pequeño).",
        "Olvidar los grados de libertad $p(p-1)/2$."
      ],
      quepasa: [
        {
          si: "…las variables estuvieran muy correlacionadas (|R| cerca de 0)?",
          entonces: String.raw`<p>$\ln|R|$ es muy negativo, el estadístico crece y se rechaza $H_0$. En la clase (C1 s24–31), con las cuatro variables correlacionadas entre $0{,}59$ y $0{,}92$, $\chi^2=26{,}97$ con $6$ gl y $p=0{,}000147$: se rechaza.</p>`
        }
      ],
      memoriza: String.raw`<p>$H_0:R=I$ · $\chi^2_B=-(n-1-\frac{2p+5}{6})\ln|R|$ · gl $=p(p-1)/2$ · $p<\alpha$ ⇒ hay correlación útil para PCA/AF.</p>`,
      comprueba: {
        enunciado: "En un test de Bartlett el p-valor resulta 0,0001 con α = 0,05. ¿Qué se concluye?",
        opciones: ["Se rechaza H0: la matriz de correlación no es la identidad", "No se rechaza H0: las variables no están correlacionadas", "Las variables son independientes", "El test no se puede interpretar"],
        correcta: 0,
        explicacion: "p < α ⇒ se rechaza H0: R ≠ I, o sea, hay correlaciones y tiene sentido aplicar PCA o análisis factorial."
      },
      verifica: [
        { que: "χ² de Bartlett (AY1 P3)", r: `Sigma <- matrix(c(16, 6, 8, 6, 9, 1, 8, 1, 25), 3, byrow = TRUE)
Rmat <- cov2cor(Sigma)
cat(round(-(10 - 1 - (2*3 + 5)/6) * log(det(Rmat)), 3))`, esperado: 3.516, tol: 0.0005 },
        { que: "χ² crítico gl=3", r: `cat(round(qchisq(0.95, 3), 3))`, esperado: 7.815, tol: 0.0005 }
      ],
      fuente: [{ id: "C1", loc: "slides 27–31" }, { id: "AY1-E", loc: "Parte II, P3" }, { id: "AY1-R", loc: "líneas 131–137" }, { id: "C4.1", loc: "slide 18" }]
    }
  ],

  cuando: String.raw`<div class="tabla-scroll"><table class="tabla">
<thead><tr><th>Quiero…</th><th>Uso</th><th>En R</th></tr></thead>
<tbody>
<tr><td>Todas las covarianzas de un data frame</td><td>Matriz $S$</td><td><code>cov(datos)</code></td></tr>
<tr><td>Todas las correlaciones, sin unidades</td><td>Matriz $R$</td><td><code>cor(datos)</code> · <code>cov2cor(S)</code></td></tr>
<tr><td>Saber si $S$ es válida / definida positiva</td><td>Valores propios $>0$</td><td><code>eigen(S)$values</code></td></tr>
<tr><td>Saber si vale la pena PCA/AF</td><td>Test de Bartlett</td><td><code>psych::cortest.bartlett(R, n = nrow(datos))</code></td></tr>
</tbody></table></div>`,

  errores: [
    { texto: "Una matriz simétrica con unos en la diagonal no siempre es una matriz de correlación: debe ser también semidefinida positiva.", fuente: [{ id: "PR-P1-Q1", loc: "afirmación 1" }] },
    { texto: "El estadístico t de la pauta en R de la Ayudantía 1 tiene un paréntesis mal puesto (ver «Diferencias entre fuentes»).", fuente: [{ id: "AY1-R", loc: "línea 121" }] }
  ]
});
