/* ============================================================================
   M10 · Análisis factorial (P1)
   Fuentes abiertas para redactar: C4.1 slides 2–27 · C4.2 slides 3–19 ·
   PR-P2-Q3 preguntas 3.1–3.4 (pauta de la Prueba 2) · AY4-PPT (presentación).
   Los números se recalculan en tools/verificar_numeros.js.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m10-analisis-factorial",
  orden: 10,
  titulo: "Análisis factorial",
  descripcion: "Explicar las correlaciones entre muchas variables con pocos factores latentes: modelo, comunalidad, requisitos (Bartlett y KMO), extracción, número de factores, rotación e interpretación.",
  pruebas: ["P1"],
  prioridad: "alta",
  aviso: "El reparto declarado por el estudiante pone PCA y análisis factorial en la Prueba 1; en pruebas pasadas el AF cayó en «Prueba 2» (CONTENIDOS.md §4.2).",
  fuentes: [{ id: "C4.1", loc: "slides 2–27" }, { id: "C4.2", loc: "slides 3–19" }, { id: "PR-P2-Q3", loc: "preguntas 3.1–3.4" }],

  conceptos: [
    {
      id: "m10-c01",
      titulo: "Qué es el análisis factorial",
      cubre: ["M10.1"],
      simple: String.raw`<p>Cuando hay muchas variables que se correlacionan entre sí, el análisis factorial (AF) propone que detrás hay pocos <strong>factores latentes</strong> (no observados) que explican por qué unas variables se parecen más a otras. Ejemplo: las preguntas de un cuestionario de satisfacción laboral se agrupan en dimensiones.</p>`,
      formal: String.raw`<ul>
  <li>Técnica de reducción de dimensionalidad: busca el <strong>número mínimo de dimensiones</strong> que explique el máximo de información.</li>
  <li>Todas las variables cumplen el mismo papel: no hay una dependencia conceptual previa de unas sobre otras (C4.1 s3).</li>
  <li>Simplifica la matriz de correlaciones para interpretarla mejor.</li>
  <li>Los factores no existen como tales: lo que existe es una combinación lineal de variables (s9).</li>
</ul>`,
      errores: ["Decir que el AF distingue variables dependientes e independientes: todas las variables cumplen el mismo papel."],
      memoriza: String.raw`<p>AF: factores latentes que explican las correlaciones. Todas las variables son «iguales» (no hay dependiente).</p>`,
      comprueba: {
        enunciado: "En el análisis factorial, ¿qué papel juegan las variables observadas?",
        opciones: ["Todas cumplen el mismo papel: no hay variable dependiente", "Una es la dependiente", "Solo la primera es relevante", "Se descartan las que no cargan"],
        correcta: 0,
        explicacion: "C4.1 s3: no existe a priori una dependencia conceptual de unas variables sobre otras."
      },
      fuente: [{ id: "C4.1", loc: "slides 2–3 y 9" }]
    },

    {
      id: "m10-c02",
      titulo: "Descomposición de la varianza: común, específica y error",
      cubre: ["M10.2", "M10.3"],
      simple: String.raw`<p>La varianza de cada variable tiene una parte que comparte con otras (<strong>común</strong>), una parte propia (<strong>específica</strong>) y una parte de ruido (<strong>error</strong>). El AF se concentra en la parte común.</p>`,
      formal: String.raw`$$\text{Varianza total}=\text{común}+\text{específica}+\text{error}$$
<p>La varianza compartida entre dos ítems es $r^2$: con $r=0{,}90$, $r^2=0{,}81$ ⇒ $81\,\%$ en común y $19\,\%$ no compartida (C4.1 s6). Dos enfoques (s8):</p>
<ul>
  <li><strong>Componentes principales:</strong> analiza <em>toda</em> la varianza; deja <strong>unos</strong> en la diagonal de la matriz de correlaciones.</li>
  <li><strong>Factores comunes:</strong> analiza <em>solo la varianza común</em>; reemplaza los unos de la diagonal por <strong>comunalidades</strong>.</li>
</ul>`,
      errores: ["Creer que el AF por factores comunes analiza toda la varianza (eso es componentes principales)."],
      memoriza: String.raw`<p>Total = común + específica + error. Componentes principales: unos en la diagonal. Factores comunes: comunalidades en la diagonal. $r^2$ = varianza compartida.</p>`,
      comprueba: {
        enunciado: "En el método de factores comunes, ¿qué se coloca en la diagonal de la matriz de correlaciones?",
        opciones: ["Las comunalidades", "Unos", "Ceros", "Las varianzas"],
        correcta: 0,
        explicacion: "Se sustituyen los unos por estimaciones de las comunalidades, para analizar solo la varianza común."
      },
      verifica: [{ que: "varianza compartida con r=0,9", js: "0.9*0.9", esperado: 0.81, tol: 1e-9 }],
      fuente: [{ id: "C4.1", loc: "slides 5–8" }]
    },

    {
      id: "m10-c03",
      titulo: "Modelo factorial, comunalidad y especificidad",
      figura: { tipo: "diagramaFactorial", donde: "ejemplo", factores: ["F₁", "F₂"],
        variables: [{ n: "Ma", a: [0.8, 0.2], pos: "der" }, { n: "Fi", a: [0.7, 0.3], pos: "arriba" }, { n: "Qu", a: [0.6, 0.3], pos: "izq" },
          { n: "In", a: [0.2, 0.8], pos: "abajo" }, { n: "Hi", a: [0.15, 0.82], pos: "izq" }, { n: "Di", a: [0.25, 0.85], pos: "der" }],
        pie: "Las 6 materias de la clase. El grosor de cada flecha es la carga; la barra muestra cuánto de la varianza explican los factores (h²) y cuánto queda como específica (ψ)." },
      cubre: ["M10.4", "M10.5"],
      simple: String.raw`<p>Cada variable se escribe como una suma ponderada de los factores comunes más un pedacito propio. La <strong>comunalidad</strong> $h^2$ dice qué parte de su varianza explican los factores; la <strong>especificidad</strong> $\psi$ es lo que queda.</p>`,
      formal: String.raw`<p>Con $X_i$ estandarizadas: $X_i=a_{i1}F_1+\dots+a_{ik}F_k+u_i$; en matrices $X=AF+u$ ($A$ = cargas $p\times k$).</p>
<p><strong>Supuestos:</strong> $E(F)=0$, $\operatorname{Var}(F)=1$; factores únicos con media $0$ e incorrelados; factores comunes y únicos incorrelados entre sí. Si los factores comunes son incorrelados ⇒ modelo <strong>ortogonal</strong>; si no ⇒ <strong>oblicuo</strong>.</p>
$$h_i^2=\sum_{j=1}^{k}a_{ij}^2,\qquad \psi_i=\operatorname{Var}(u_i)=1-h_i^2,\qquad h_i^2+\psi_i=1$$`,
      ejemplo: String.raw`<p>C4.1 s13–14 (6 materias, 2 factores): $Ma=0{,}8F_1+0{,}2F_2+u$.</p>
<ul>
  <li>$h^2_{Ma}=0{,}8^2+0{,}2^2=0{,}68$ y $\psi_{Ma}=0{,}32$: el $68\,\%$ de la varianza de Matemáticas lo explican los factores y el $32\,\%$ es específica.</li>
  <li>$h^2_{Di}=0{,}25^2+0{,}85^2=0{,}785$ y $\psi_{Di}=0{,}215$.</li>
</ul>
<p>Pauta de la Prueba 2 (3.2), con otros datos: comunalidad de «Imagen del fabricante» $=0{,}88$ ⇒ especificidad $0{,}12$; «Nivel de precio» $0{,}58$ ⇒ $0{,}42$.</p>`,
      r: {
        nota: "Comunalidad y especificidad desde la matriz de cargas A de C4.1 slide 13.",
        codigo: `A <- matrix(c(.8, .2,   .7, .3,   .6, .3,
              .2, .8,   .15, .82, .25, .85), 6, byrow = TRUE)
rownames(A) <- c("Ma", "Fi", "Qu", "In", "Hi", "Di")
h2 <- rowSums(A^2)
round(cbind(h2, psi = 1 - h2), 4)`,
        rlab: "r-m10-comunalidad"
      },
      errores: ["Calcular la comunalidad con las cargas de un solo factor.", "Confundir especificidad con error de medición: $\\psi$ incluye la varianza específica y el error."],
      memoriza: String.raw`<p>$h^2=\sum_j a_{ij}^2$ (fila de $A$) · $\psi=1-h^2$ · $h^2+\psi=1$ · factores incorrelados ⇒ ortogonal.</p>`,
      comprueba: {
        enunciado: "Una variable tiene cargas 0,6 y 0,3 en dos factores ortogonales. ¿Cuál es su comunalidad?",
        opciones: ["0,45", "0,90", "0,09", "0,36"],
        correcta: 0,
        explicacion: "h² = 0,6² + 0,3² = 0,36 + 0,09 = 0,45."
      },
      verifica: [
        { que: "h² Matemáticas", js: "0.8*0.8+0.2*0.2", esperado: 0.68, tol: 1e-9 },
        { que: "h² Dibujo", js: "0.25*0.25+0.85*0.85", esperado: 0.785, tol: 1e-9 },
        { que: "h² Química", js: "0.6*0.6+0.3*0.3", esperado: 0.45, tol: 1e-9 }
      ],
      fuente: [{ id: "C4.1", loc: "slides 9–14" }, { id: "PR-P2-Q3", loc: "pregunta 3.2" }]
    },

    {
      id: "m10-c04",
      titulo: "¿Son adecuados los datos? Bartlett y KMO",
      cubre: ["M10.6"],
      simple: String.raw`<p>Antes de hacer AF hay que comprobar que las variables están correlacionadas. Con Bartlett se ve si la matriz de correlación es distinta de la identidad; con el <strong>KMO</strong> se ve si las correlaciones simples son grandes frente a las parciales.</p>`,
      formal: String.raw`<ul>
  <li><strong>Bartlett</strong> (ver M02): $H_0:R=I$. $p<0{,}05$ ⇒ se rechaza ⇒ buenos datos para AF.</li>
  <li><strong>Correlación parcial:</strong> relación entre dos variables eliminando la influencia del resto; si comparten factores comunes, las parciales son bajas.</li>
  <li><strong>KMO (MSA)</strong>, de 0 a 1 (C4.1 s19): $\ge0{,}75$ bien · $\ge0{,}5$ aceptable · $<0{,}5$ inaceptable. En C4.2 s15 se dice «KMO global $>0{,}6$ ⇒ adecuado» (ver «Diferencias entre fuentes»).</li>
</ul>`,
      ejemplo: String.raw`<p>C4.1 s20 (notas de materias): <code>KMO(datos)</code> daba <em>Overall MSA</em> $=0{,}35$ ⇒ datos no adecuados. Tras eliminar las variables poco correlacionadas (lenguaje, música, educación física) subió a $0{,}61$ ⇒ adecuados.</p>
<p>USArrests (C4.2 s15–16): KMO global $0{,}65$ (adecuado); Bartlett $\chi^2=88{,}29$, $6$ gl, $p\approx7\times10^{-17}$ ⇒ se rechaza $H_0$.</p>`,
      r: {
        nota: "Código de C4.2 slides 15–16 (psych).",
        codigo: `library(psych)
datos <- scale(USArrests)
KMO(datos)
cortest.bartlett(cor(datos), n = nrow(datos))`,
        rlab: "r-m10-usarrests"
      },
      errores: ["Interpretar un MSA individual de 0,50 como «malo» sin mirar el global.", "Aplicar AF con KMO < 0,5 global."],
      memoriza: String.raw`<p>KMO $\ge0{,}75$ bien · $\ge0{,}5$ aceptable · $<0{,}5$ inaceptable. Bartlett $p<0{,}05$ ⇒ hay correlaciones. Ambos antes del AF.</p>`,
      comprueba: {
        enunciado: "Overall MSA = 0,35. ¿Qué se concluye según C4.1?",
        opciones: ["Los datos no son adecuados para AF", "Los datos son excelentes", "Hay que usar rotación oblicua", "Hay que aumentar el número de factores"],
        correcta: 0,
        explicacion: "KMO < 0,5 es inaceptable: el AF no es apropiado."
      },
      verifica: [{ que: "KMO global USArrests", r: `library(psych); cat(round(KMO(scale(USArrests))$MSA, 2))`, esperado: 0.65, tol: 0.005 }],
      fuente: [{ id: "C4.1", loc: "slides 17–20" }, { id: "C4.2", loc: "slides 15–16" }]
    },

    {
      id: "m10-c05",
      titulo: "Extracción: grados de libertad, no unicidad y métodos",
      cubre: ["M10.7", "M10.9"],
      simple: String.raw`<p>Extraer factores es encontrar la matriz de cargas $A$. Dos advertencias: no se pueden pedir demasiados factores para pocas variables, y la solución no es única (se puede «girar»). Hay tres métodos clásicos.</p>`,
      formal: String.raw`<ul>
  <li><strong>Grados de libertad:</strong> $p(p+1)/2\ge p(k+1)$, es decir $k\le(p-1)/2$.</li>
  <li><strong>No unicidad:</strong> si $T$ es ortogonal ($TT'=I$), $A^*=AT$ también es solución. Es la base de la rotación.</li>
  <li><strong>Componentes principales:</strong> usa las primeras $k$ componentes; siempre da solución; no está basado en el modelo de AF; analiza toda la varianza.</li>
  <li><strong>Ejes principales:</strong> modelo $R-\Psi\approx AA'$; reemplaza los unos por comunalidades; iterativo.</li>
  <li><strong>Máxima verosimilitud:</strong> supone normal multivariada; $\Sigma=AA'+\Psi$; incluye prueba $\chi^2$ de bondad de ajuste con $H_0:\Sigma=AA'+\Psi$ (p-valor $>0{,}05$ ⇒ no se rechaza ⇒ buen ajuste). En R: <code>fa(…, fm = …)</code>.</li>
</ul>`,
      ejemplo: String.raw`<p>Con $p=4$ variables, la regla da $k\le1{,}5$, es decir, como máximo 1 factor. El ejemplo de USArrests (C4.2 s17) pide $2$ factores con $p=4$: R lo calcula, pero informa <code>df of the model are -1</code> (no hay grados de libertad para contrastar el ajuste).</p>`,
      errores: ["Pedir más factores de los que permite $k\\le(p-1)/2$.", "Creer que la solución factorial es única."],
      memoriza: String.raw`<p>$k\le(p-1)/2$ · $A^*=AT$ también es solución (no unicidad) · métodos: componentes principales, ejes principales, máxima verosimilitud (con $\chi^2$ de ajuste).</p>`,
      comprueba: {
        enunciado: "Con p = 9 variables, ¿cuál es el máximo número de factores según k ≤ (p − 1)/2?",
        opciones: ["4", "9", "3", "5"],
        correcta: 0,
        explicacion: "(9 − 1)/2 = 4."
      },
      verifica: [{ que: "k máximo con p=9", js: "(9-1)/2", esperado: 4, tol: 1e-9 }],
      fuente: [{ id: "C4.1", loc: "slides 22 y 24–27" }]
    },

    {
      id: "m10-c06",
      titulo: "Cuántos factores conservar",
      cubre: ["M10.10"],
      simple: String.raw`<p>Se busca el menor número de factores que explique bien los datos (principio de parsimonia). Hay cinco caminos y ninguno es perfecto.</p>`,
      formal: String.raw`<table class="tabla"><thead><tr><th>Criterio</th><th>Regla</th><th>Problema</th></tr></thead><tbody>
<tr><td>A priori</td><td>Según la teoría del problema</td><td>Depende de que la base teórica sea clara</td></tr>
<tr><td>Kaiser</td><td>Valor propio $>1$</td><td>Tiende a subestimar el número real</td></tr>
<tr><td>% de varianza</td><td>Explicar 75–80 % del total</td><td>El porcentaje es arbitrario</td></tr>
<tr><td>Scree plot</td><td>Factores antes del codo</td><td>Subjetivo (interpretación visual)</td></tr>
<tr><td>Análisis paralelo</td><td>Valor propio real $>$ simulado</td><td>—</td></tr></tbody></table>
<p>En R: <code>fa.parallel(datos, fa = "fa")</code> grafica los valores propios reales (línea azul) contra los simulados (línea roja).</p>`,
      ejemplo: String.raw`<p>Pauta de la Prueba 2 (3.1): se seleccionan dos factores porque (1) solo dos autovalores son $>1$ (Kaiser); (2) el scree plot tiene un codo después del factor 2; (3) los dos primeros explican $(2{,}51349+1{,}73952)/6\approx70{,}9\,\%$ de la varianza total (con 6 variables la varianza total es 6).</p>`,
      errores: ["Usar la suma de autovalores sin dividir por el total (el total es $p$ si los datos están estandarizados)."],
      memoriza: String.raw`<p>Criterios: a priori · Kaiser ($\lambda>1$, subestima) · 75–80 % (arbitrario) · scree (subjetivo) · análisis paralelo.</p>`,
      comprueba: {
        enunciado: "¿Qué crítica se le hace a la regla de Kaiser?",
        opciones: ["Tiende a subestimar el número real de factores", "Es demasiado subjetiva", "Depende de un porcentaje arbitrario", "Solo sirve con rotación oblicua"],
        correcta: 0,
        explicacion: "C4.2 s4: la regla de Kaiser tiende a subestimar. Lo subjetivo es el scree plot y lo arbitrario, el porcentaje de varianza."
      },
      verifica: [{ que: "% varianza de 2 factores (pauta 3.1)", js: "(2.51349+1.73952)/6", esperado: 0.7088, tol: 0.0001 }],
      fuente: [{ id: "C4.2", loc: "slides 3–5 y 16" }, { id: "PR-P2-Q3", loc: "pregunta 3.1" }]
    },

    {
      id: "m10-c07",
      titulo: "Interpretar y rotar los factores",
      figura: { tipo: "rotacion", donde: "ejemplo",
        variables: [{ n: "Ma", a: [0.8, 0.2], pos: "der" }, { n: "Fi", a: [0.7, 0.3], pos: "arriba" }, { n: "Qu", a: [0.6, 0.3], pos: "izq" },
          { n: "In", a: [0.2, 0.8], pos: "abajo" }, { n: "Hi", a: [0.15, 0.82], pos: "izq" }, { n: "Di", a: [0.25, 0.85], pos: "der" }],
        pie: "Rotar es girar los ejes de los factores. Con θ = 45° se obtiene la matriz de la clase: Matemáticas pasa de (0,8; 0,2) a (0,42; 0,71) y su comunalidad sigue en 0,68." },
      cubre: ["M10.8", "M10.11", "M10.12"],
      simple: String.raw`<p>Un factor se interpreta mirando qué variables tienen cargas altas en él y poniéndole un nombre. Como la solución inicial a veces es confusa, se <strong>rota</strong>: se gira para que cada variable quede asociada sobre todo a un factor (estructura simple).</p>`,
      formal: String.raw`<ul>
  <li><strong>Cargas significativas:</strong> generalmente $>|0{,}5|$ o $>|0{,}4|$ (C4.2 s7). Las variables con carga alta definen el factor.</li>
  <li><strong>Estructura simple (Thurstone, 1935):</strong> cada factor con pocas cargas altas y el resto cerca de cero; cada variable asociada principalmente a un factor.</li>
  <li>La rotación <strong>no cambia</strong> las comunalidades, las especificidades ni la varianza total explicada: solo cómo se reparte entre factores y la interpretabilidad.</li>
  <li><strong>Ortogonales</strong> (factores independientes): <em>Varimax</em> (el más usado; columnas simples), <em>Quartimax</em> (simplifica filas; puede producir un factor general), <em>Equamax</em> (mezcla de ambos).</li>
  <li><strong>Oblicuas</strong> (factores correlacionados): <em>Oblimin</em> y <em>Promax</em> (primero Varimax y luego permite correlación; rápido, común con muchas variables).</li>
</ul>`,
      ejemplo: String.raw`<p>6 materias (C4.2 s8): $F_1$ se relaciona con Matemáticas ($0{,}8$), Física ($0{,}7$) y Química ($0{,}6$) ⇒ «Aptitud científica»; $F_2$ con Inglés ($0{,}8$), Historia ($0{,}82$) y Dibujo ($0{,}85$) ⇒ «Aptitud humanística».</p>
<p>Rotación (C4.1 s23): con $T=\begin{pmatrix}1/\sqrt2&1/\sqrt2\\-1/\sqrt2&1/\sqrt2\end{pmatrix}$, las cargas cambian (p. ej. Matemáticas pasa de $(0{,}8;\ 0{,}2)$ a $(0{,}42;\ 0{,}71)$) pero la comunalidad sigue siendo $0{,}68$.</p>
<p>Pauta de la Prueba 2 (3.3): tras Varimax cada variable carga alto en un solo factor (X4 y X5 cerca de $0{,}93$ en el Factor 2), lo que facilita la interpretación.</p>`,
      r: {
        nota: "Rotación ortogonal de C4.1 slide 23 aplicada a la matriz A de C4.1 slide 13.",
        codigo: `A <- matrix(c(.8, .2, .7, .3, .6, .3, .2, .8, .15, .82, .25, .85), 6, byrow = TRUE)
T <- matrix(c(1, -1, 1, 1) / sqrt(2), 2)
T <- matrix(c(1/sqrt(2), 1/sqrt(2), -1/sqrt(2), 1/sqrt(2)), 2, byrow = TRUE)
round(A %*% T, 3)
round(rowSums((A %*% T)^2), 4)    # comunalidades: no cambian`,
        rlab: "r-m10-comunalidad"
      },
      errores: ["Decir que la rotación cambia las comunalidades.", "Usar rotación ortogonal cuando es razonable que los factores estén correlacionados."],
      memoriza: String.raw`<p>Rotación: no cambia $h^2$, $\psi$ ni varianza total. Ortogonal: Varimax, Quartimax, Equamax. Oblicua: Oblimin, Promax. Carga significativa $>|0{,}4|$–$|0{,}5|$.</p>`,
      comprueba: {
        enunciado: "¿Qué NO cambia con una rotación de factores?",
        opciones: ["Las comunalidades", "La matriz de cargas", "La interpretabilidad", "Cómo se reparte la varianza entre factores"],
        correcta: 0,
        explicacion: "La rotación mantiene comunalidades, especificidades y varianza total explicada."
      },
      verifica: [{ que: "Matemáticas rotada, 1ª carga", js: "(0.8*1/Math.sqrt(2))+(0.2*(-1)/Math.sqrt(2))", esperado: 0.4243, tol: 0.0001 }],
      fuente: [{ id: "C4.1", loc: "slide 23" }, { id: "C4.2", loc: "slides 7–8 y 10–12" }, { id: "PR-P2-Q3", loc: "preguntas 3.2–3.3" }]
    },

    {
      id: "m10-c08",
      titulo: "Ejemplo completo en R: USArrests",
      cubre: ["M10.13"],
      simple: String.raw`<p>El recorrido típico de un AF en R: estandarizar, comprobar KMO y Bartlett, decidir el número de factores, extraer con rotación y revisar las comunalidades.</p>`,
      formal: String.raw`<ol>
  <li><code>datos &lt;- scale(USArrests)</code></li>
  <li><code>KMO(datos)</code> y <code>cortest.bartlett(…)</code></li>
  <li><code>fa.parallel(datos, fa = "fa")</code> para el número de factores</li>
  <li><code>fa(datos, nfactors = 2, rotate = "varimax")</code>; <code>$communality</code></li>
  <li><code>fa(datos, nfactors = 2, rotate = "promax")</code> (oblicua)</li>
</ol>`,
      ejemplo: String.raw`<p>Resultados (ejecutados): KMO global $0{,}65$ (MSA por variable: Murder $0{,}62$, Assault $0{,}64$, UrbanPop $0{,}50$, Rape $0{,}78$). Con Varimax, MR1 reúne <code>Murder</code> ($0{,}95$), <code>Assault</code> ($0{,}84$) y en parte <code>Rape</code> ($0{,}59$); MR2 reúne <code>UrbanPop</code> ($0{,}67$) y <code>Rape</code> ($0{,}56$). Comunalidades: $0{,}90;\ 0{,}80;\ 0{,}45;\ 0{,}66$. Con Promax los factores quedan correlacionados ($r=0{,}47$).</p>`,
      r: {
        nota: "Código de C4.2 slides 15–18.",
        codigo: `library(psych)
datos <- scale(USArrests)
fa_modelo <- fa(datos, nfactors = 2, rotate = "varimax")
round(fa_modelo$communality, 3)`,
        rlab: "r-m10-usarrests"
      },
      lectura: String.raw`<ul>
  <li><code>h2</code> = comunalidad; <code>u2</code> = especificidad ($1-h^2$). <code>UrbanPop</code> tiene la comunalidad más baja ($0{,}45$): los factores explican poco de ella.</li>
  <li><code>com</code> (complejidad): cerca de $1$ ⇒ la variable pertenece a un solo factor; <code>Rape</code> ($2{,}0$) carga en ambos.</li>
  <li>El aviso <code>df of the model are -1</code> aparece porque $k=2>(p-1)/2=1{,}5$.</li>
</ul>`,
      errores: ["Olvidar estandarizar con <code>scale()</code> antes del AF."],
      memoriza: String.raw`<p>Flujo en R: <code>scale</code> → <code>KMO</code> → <code>cortest.bartlett</code> → <code>fa.parallel</code> → <code>fa(rotate = "varimax"/"promax")</code> → <code>$communality</code>.</p>`,
      comprueba: {
        enunciado: "En la salida de fa(), la columna u2 representa…",
        opciones: ["La especificidad (1 − comunalidad)", "La comunalidad", "El número de factores", "El p-valor"],
        correcta: 0,
        explicacion: "h2 es la comunalidad y u2 la varianza única (especificidad)."
      },
      verifica: [{ que: "comunalidad de Murder (varimax)", r: `library(psych); cat(round(fa(scale(USArrests), nfactors = 2, rotate = "varimax")$communality[1], 3))`, esperado: 0.899, tol: 0.0006 }],
      fuente: [{ id: "C4.2", loc: "slides 13–19" }]
    },

    {
      id: "m10-c09",
      titulo: "Validar un AF con dos submuestras; el signo de un factor",
      cubre: ["M10.14"],
      simple: String.raw`<p>Una forma de comprobar que un AF es estable es dividir la muestra en dos mitades, repetir el análisis y ver si salen los mismos grupos de variables en cada factor. El <strong>signo</strong> de las cargas de un factor es arbitrario: invertirlo no cambia nada.</p>`,
      formal: String.raw`<p>Pauta de la Prueba 2 (3.4): al comparar las cargas rotadas (Varimax) de las dos submuestras, X1, X2, X3 y X6 se asocian al Factor 1 y X4 y X5 al Factor 2 en ambas, así que la estructura es esencialmente la misma. Un cambio de signo en el Factor 1 entre muestras no afecta la interpretación: lo que importa es qué variables pesan y cuáles se oponen entre sí.</p>
<p class="ayuda">Este tema no tiene clase subida; solo aparece en la pauta de la Prueba 2 (CONTENIDOS.md §2, M10.14). Se redactó a partir de esa pauta.</p>`,
      errores: ["Decir que un cambio de signo entre submuestras invalida la estructura factorial."],
      memoriza: String.raw`<p>Validación: misma agrupación de variables en dos submuestras ⇒ estructura estable. El signo de un factor es arbitrario.</p>`,
      comprueba: {
        enunciado: "Entre dos submuestras, las cargas del Factor 1 cambian de signo pero las mismas variables cargan alto. ¿Qué se concluye?",
        opciones: ["La estructura es la misma; el signo no afecta la interpretación", "El modelo no es válido", "Hay que descartar el factor", "Se debe usar rotación oblicua"],
        correcta: 0,
        explicacion: "El signo de un factor es arbitrario; lo relevante es el patrón de variables."
      },
      fuente: [{ id: "PR-P2-Q3", loc: "pregunta 3.4" }]
    }
  ],

  cuando: String.raw`<div class="tabla-scroll"><table class="tabla">
<thead><tr><th>Quiero…</th><th>Uso</th><th>En R</th></tr></thead>
<tbody>
<tr><td>Saber si hay correlaciones aprovechables</td><td>Bartlett y KMO</td><td><code>cortest.bartlett</code> · <code>KMO</code></td></tr>
<tr><td>Decidir el número de factores</td><td>Kaiser, % varianza, scree, análisis paralelo</td><td><code>fa.parallel(datos, fa = "fa")</code></td></tr>
<tr><td>Extraer y rotar</td><td>Varimax (ortogonal) o Promax/Oblimin (oblicua)</td><td><code>fa(datos, nfactors, rotate)</code></td></tr>
<tr><td>Ver comunalidades</td><td>$h^2$ y $\psi=1-h^2$</td><td><code>fa_modelo$communality</code></td></tr>
</tbody></table></div>`,

  errores: [
    { texto: "La rotación no cambia comunalidades ni varianza total.", fuente: [{ id: "C4.2", loc: "slide 10" }] },
    { texto: "Kaiser tiende a subestimar el número de factores.", fuente: [{ id: "C4.2", loc: "slide 4" }] }
  ]
});
