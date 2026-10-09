/* ============================================================================
   Desarrollo · M02 Matrices de covarianza/correlación y Bartlett (P1) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m02-d001",
    modulo: "m02-matrices-bartlett",
    concepto: "m02-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 22–26" }
    ],
    titulo: "De la matriz de covarianza a la de correlación",
    enunciado: String.raw`<p>En una muestra de clientes se midieron tres variables. La matriz de covarianza muestral de $X_1$ = ingreso, $X_2$ = gasto, $X_3$ = antigüedad es</p><p>$$S=\begin{pmatrix}4&3&-1\\3&9&2\\-1&2&16\end{pmatrix}$$</p><ol type="a"><li>Indica la varianza y la desviación estándar de cada variable y verifica que $S$ tiene la forma de una matriz de covarianza.</li><li>Calcula las tres correlaciones y escribe la matriz $R$.</li><li>¿Qué par de variables está más relacionado linealmente? ¿Cambiaría $R$ si una variable se midiera en otra unidad?</li></ol>`,
    partes: [
      { titulo: "a) Varianzas, desviaciones y forma de S", puntos: 1.5, solucion: String.raw`<p>Las varianzas están en la diagonal: $s_{11}=4$ ⇒ $s_1=2$; $s_{22}=9$ ⇒ $s_2=3$; $s_{33}=16$ ⇒ $s_3=4$.</p><p>$S$ es simétrica ($s_{ij}=s_{ji}$) y su diagonal es no negativa. Además debe ser semidefinida positiva: sus valores propios son $16{,}535$; $10{,}1$; $2{,}365$, todos $\ge0$ (<code>eigen(S)</code>).</p>` },
      { titulo: "b) Las tres correlaciones", puntos: 2.5, solucion: String.raw`<p>$r_{ij}=\dfrac{s_{ij}}{\sqrt{s_{ii}\,s_{jj}}}$:</p><p>$r_{12}=\dfrac{3}{\sqrt{4\cdot9}}=0{,}5$</p><p>$r_{13}=\dfrac{-1}{\sqrt{4\cdot16}}=-0{,}125$</p><p>$r_{23}=\dfrac{2}{\sqrt{9\cdot16}}=0{,}1667$</p>` },
      { titulo: "b) Matriz de correlación R", puntos: 0.5, solucion: String.raw`<p>$$R=\begin{pmatrix}1&0{,}5&-0{,}125\\0{,}5&1&0{,}167\\-0{,}125&0{,}167&1\end{pmatrix}$$</p><p>Diagonal de unos y simétrica. En R: <code>cov2cor(S)</code>.</p>` },
      { titulo: "c) Par más relacionado y efecto de las unidades", puntos: 1.5, solucion: "<p>El par con $|r|$ mayor es ingreso – gasto ($r=0{,}5$, relación directa). No se decide mirando la covarianza más grande: las covarianzas dependen de las unidades.</p><p>$R$ <strong>no cambia</strong> con un cambio de unidades (la correlación es adimensional); $S$ sí cambia.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "r12", r: "cat(cov2cor(matrix(c(4, 3, -1, 3, 9, 2, -1, 2, 16), 3, byrow = TRUE))[1, 2])", esperado: 0.5, tol: 0.000050001 },
      { que: "r13", r: "cat(cov2cor(matrix(c(4, 3, -1, 3, 9, 2, -1, 2, 16), 3, byrow = TRUE))[1, 3])", esperado: -0.125, tol: 0.000050001 },
      { que: "r23", r: "cat(cov2cor(matrix(c(4, 3, -1, 3, 9, 2, -1, 2, 16), 3, byrow = TRUE))[2, 3])", esperado: 0.1667, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 22–26" }
    ]
  },
  {
    id: "m02-d002",
    modulo: "m02-matrices-bartlett",
    concepto: "m02-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 22–26" }
    ],
    titulo: "Correlaciones a partir de S (tres indicadores de producción)",
    enunciado: String.raw`<p>En una planta se registran tres indicadores diarios. La matriz de covarianza muestral de $X_1$ = producción, $X_2$ = consumo de energía, $X_3$ = piezas defectuosas es</p><p>$$S=\begin{pmatrix}25&12&8\\12&16&-3\\8&-3&9\end{pmatrix}$$</p><ol type="a"><li>Indica la varianza y la desviación estándar de cada variable y verifica que $S$ tiene la forma de una matriz de covarianza.</li><li>Calcula las tres correlaciones y escribe la matriz $R$.</li><li>¿Qué par de variables está más relacionado linealmente? ¿Cambiaría $R$ si una variable se midiera en otra unidad?</li></ol>`,
    partes: [
      { titulo: "a) Varianzas, desviaciones y forma de S", puntos: 1.5, solucion: String.raw`<p>Las varianzas están en la diagonal: $s_{11}=25$ ⇒ $s_1=5$; $s_{22}=16$ ⇒ $s_2=4$; $s_{33}=9$ ⇒ $s_3=3$.</p><p>$S$ es simétrica ($s_{ij}=s_{ji}$) y su diagonal es no negativa. Además debe ser semidefinida positiva: sus valores propios son $34{,}325$; $14{,}728$; $0{,}948$, todos $\ge0$ (<code>eigen(S)</code>).</p>` },
      { titulo: "b) Las tres correlaciones", puntos: 2.5, solucion: String.raw`<p>$r_{ij}=\dfrac{s_{ij}}{\sqrt{s_{ii}\,s_{jj}}}$:</p><p>$r_{12}=\dfrac{12}{\sqrt{25\cdot16}}=0{,}6$</p><p>$r_{13}=\dfrac{8}{\sqrt{25\cdot9}}=0{,}5333$</p><p>$r_{23}=\dfrac{-3}{\sqrt{16\cdot9}}=-0{,}25$</p>` },
      { titulo: "b) Matriz de correlación R", puntos: 0.5, solucion: String.raw`<p>$$R=\begin{pmatrix}1&0{,}6&0{,}533\\0{,}6&1&-0{,}25\\0{,}533&-0{,}25&1\end{pmatrix}$$</p><p>Diagonal de unos y simétrica. En R: <code>cov2cor(S)</code>.</p>` },
      { titulo: "c) Par más relacionado y efecto de las unidades", puntos: 1.5, solucion: "<p>El par con $|r|$ mayor es producción – consumo de energía ($r=0{,}6$, relación directa). No se decide mirando la covarianza más grande: las covarianzas dependen de las unidades.</p><p>$R$ <strong>no cambia</strong> con un cambio de unidades (la correlación es adimensional); $S$ sí cambia.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "r12", r: "cat(cov2cor(matrix(c(25, 12, 8, 12, 16, -3, 8, -3, 9), 3, byrow = TRUE))[1, 2])", esperado: 0.6, tol: 0.000050001 },
      { que: "r13", r: "cat(cov2cor(matrix(c(25, 12, 8, 12, 16, -3, 8, -3, 9), 3, byrow = TRUE))[1, 3])", esperado: 0.5333, tol: 0.000050001 },
      { que: "r23", r: "cat(cov2cor(matrix(c(25, 12, 8, 12, 16, -3, 8, -3, 9), 3, byrow = TRUE))[2, 3])", esperado: -0.25, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 22–26" }
    ]
  },
  {
    id: "m02-d003",
    modulo: "m02-matrices-bartlett",
    concepto: "m02-c04",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 27–31" },
      { id: "C4.1", loc: "slide 18" }
    ],
    titulo: "Test de Bartlett a mano con p = 3",
    enunciado: String.raw`<p>Con $n=50$ observaciones de tres variables se obtuvo la matriz de correlación $$R=\begin{pmatrix}1&0{,}6&0{,}5\\0{,}6&1&0{,}4\\0{,}5&0{,}4&1\end{pmatrix}$$</p><ol type="a"><li>Plantea las hipótesis del test de esfericidad de Bartlett y calcula $|R|$.</li><li>Calcula el estadístico y sus grados de libertad.</li><li>Con $\alpha=5\,\%$, decide y concluye: ¿tiene sentido aplicar PCA o análisis factorial?</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y determinante", puntos: 1.5, solucion: String.raw`<p>$H_0:R=I$ (las variables no están correlacionadas) contra $H_1:R\neq I$ (hay correlaciones).</p><p>Para $p=3$: $|R|=1+2r_{12}r_{13}r_{23}-r_{12}^2-r_{13}^2-r_{23}^2=1+2(0{,}6)(0{,}5)(0{,}4)-0{,}36-0{,}25-0{,}16=0{,}47$.</p>` },
      { titulo: "b) Estadístico de Bartlett y grados de libertad", puntos: 2.5, solucion: String.raw`<p>$\chi^2_B=-\left(n-1-\dfrac{2p+5}{6}\right)\ln|R|=-\left(50-1-\dfrac{11}{6}\right)\ln(0{,}47)$.</p><p>$=-(47{,}1667)\cdot(-0{,}755)=35{,}61$.</p><p>gl $=\dfrac{p(p-1)}{2}=\dfrac{3\cdot2}{2}=3$.</p>` },
      { titulo: "c) Valor crítico, decisión y conclusión", puntos: 2, solucion: String.raw`<p>Crítico: $\chi^2_{0{,}95;3}=7{,}815$ (<code>qchisq(0.95, 3)</code>). $35{,}61>7{,}815$ (p-valor $=<0{,}0001$) ⇒ se <strong>rechaza</strong> $H_0$.</p><p>La matriz de correlación no es la identidad: hay correlaciones entre las variables, así que PCA o análisis factorial <strong>tienen sentido</strong>.</p><p>El test supone normalidad multivariante.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "χ² (psych)", r: "cat(psych::cortest.bartlett(matrix(c(1, 0.6, 0.5, 0.6, 1, 0.4, 0.5, 0.4, 1), 3, byrow = TRUE), n = 50)$chisq)", esperado: 35.61, tol: 0.0050000010000000004 },
      { que: "crítico", r: "cat(qchisq(0.95, 3))", esperado: 7.815, tol: 0.000500001 },
      { que: "|R|", r: "cat(det(matrix(c(1, 0.6, 0.5, 0.6, 1, 0.4, 0.5, 0.4, 1), 3, byrow = TRUE)))", esperado: 0.47, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 27–31" },
      { id: "C4.1", loc: "slide 18" }
    ]
  },
  {
    id: "m02-d004",
    modulo: "m02-matrices-bartlett",
    concepto: "m02-c04",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 27–31" },
      { id: "C4.1", loc: "slide 18" }
    ],
    titulo: "Bartlett con correlaciones bajas: ¿conviene un PCA?",
    enunciado: String.raw`<p>Con $n=20$ observaciones de tres variables se obtuvo la matriz de correlación $$R=\begin{pmatrix}1&0{,}1&0{,}15\\0{,}1&1&-0{,}05\\0{,}15&-0{,}05&1\end{pmatrix}$$</p><ol type="a"><li>Plantea las hipótesis del test de esfericidad de Bartlett y calcula $|R|$.</li><li>Calcula el estadístico y sus grados de libertad.</li><li>Con $\alpha=5\,\%$, decide y concluye: ¿tiene sentido aplicar PCA o análisis factorial?</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y determinante", puntos: 1.5, solucion: String.raw`<p>$H_0:R=I$ (las variables no están correlacionadas) contra $H_1:R\neq I$ (hay correlaciones).</p><p>Para $p=3$: $|R|=1+2r_{12}r_{13}r_{23}-r_{12}^2-r_{13}^2-r_{23}^2=1+2(0{,}1)(0{,}15)(-0{,}05)-0{,}01-0{,}0225-0{,}0025=0{,}9635$.</p>` },
      { titulo: "b) Estadístico de Bartlett y grados de libertad", puntos: 2.5, solucion: String.raw`<p>$\chi^2_B=-\left(n-1-\dfrac{2p+5}{6}\right)\ln|R|=-\left(20-1-\dfrac{11}{6}\right)\ln(0{,}9635)$.</p><p>$=-(17{,}1667)\cdot(-0{,}0372)=0{,}64$.</p><p>gl $=\dfrac{p(p-1)}{2}=\dfrac{3\cdot2}{2}=3$.</p>` },
      { titulo: "c) Valor crítico, decisión y conclusión", puntos: 2, solucion: String.raw`<p>Crítico: $\chi^2_{0{,}95;3}=7{,}815$ (<code>qchisq(0.95, 3)</code>). $0{,}64<7{,}815$ (p-valor $=0{,}8876$) ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>No hay evidencia de correlación global entre las variables: reducir dimensión con PCA o análisis factorial <strong>no se justifica</strong> (cada variable aporta información propia).</p><p>El test supone normalidad multivariante.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "χ² (psych)", r: "cat(psych::cortest.bartlett(matrix(c(1, 0.1, 0.15, 0.1, 1, -0.05, 0.15, -0.05, 1), 3, byrow = TRUE), n = 20)$chisq)", esperado: 0.64, tol: 0.0050000010000000004 },
      { que: "crítico", r: "cat(qchisq(0.95, 3))", esperado: 7.815, tol: 0.000500001 },
      { que: "|R|", r: "cat(det(matrix(c(1, 0.1, 0.15, 0.1, 1, -0.05, 0.15, -0.05, 1), 3, byrow = TRUE)))", esperado: 0.9635, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 27–31" },
      { id: "C4.1", loc: "slide 18" }
    ]
  },
  {
    id: "m02-d005",
    modulo: "m02-matrices-bartlett",
    concepto: "m02-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 27–31" },
      { id: "C4.1", loc: "slide 18" }
    ],
    titulo: "Bartlett con el determinante dado (p = 4)",
    enunciado: String.raw`<p>Se quiere aplicar un análisis factorial a $p=4$ variables medidas en $n=100$ personas. El determinante de la matriz de correlación es $|R|=0{,}35$.</p><ol type="a"><li>Plantea las hipótesis del test de esfericidad de Bartlett.</li><li>Calcula el estadístico y sus grados de libertad.</li><li>Con $\alpha=5\,\%$, decide y concluye: ¿tiene sentido aplicar PCA o análisis factorial?</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis", puntos: 1.5, solucion: String.raw`<p>$H_0:R=I$ (las variables no están correlacionadas) contra $H_1:R\neq I$ (hay correlaciones).</p><p>El determinante viene dado: $|R|=0{,}35$ (si fuera $1$, $R$ sería la identidad; cuanto más cerca de $0$, más correlación).</p>` },
      { titulo: "b) Estadístico de Bartlett y grados de libertad", puntos: 2.5, solucion: String.raw`<p>$\chi^2_B=-\left(n-1-\dfrac{2p+5}{6}\right)\ln|R|=-\left(100-1-\dfrac{13}{6}\right)\ln(0{,}35)$.</p><p>$=-(96{,}8333)\cdot(-1{,}0498)=101{,}66$.</p><p>gl $=\dfrac{p(p-1)}{2}=\dfrac{4\cdot3}{2}=6$.</p>` },
      { titulo: "c) Valor crítico, decisión y conclusión", puntos: 2, solucion: String.raw`<p>Crítico: $\chi^2_{0{,}95;6}=12{,}592$ (<code>qchisq(0.95, 6)</code>). $101{,}66>12{,}592$ (p-valor $=<0{,}0001$) ⇒ se <strong>rechaza</strong> $H_0$.</p><p>La matriz de correlación no es la identidad: hay correlaciones entre las variables, así que PCA o análisis factorial <strong>tienen sentido</strong>.</p><p>El test supone normalidad multivariante.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "χ²", js: "-(100 - 1 - (2*4 + 5)/6) * Math.log(0.35)", esperado: 101.66, tol: 0.0050000010000000004 },
      { que: "crítico", r: "cat(qchisq(0.95, 6))", esperado: 12.592, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 27–31" },
      { id: "C4.1", loc: "slide 18" }
    ]
  },
  {
    id: "m02-d006",
    modulo: "m02-matrices-bartlett",
    concepto: "m02-c04",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C1", loc: "slides 27–31" },
      { id: "C4.1", loc: "slide 18" }
    ],
    titulo: "Bartlett con p = 6 y α = 1 %",
    enunciado: String.raw`<p>Una encuesta de $p=6$ ítems se aplicó a $n=40$ personas; el determinante de la matriz de correlación es $|R|=0{,}62$.</p><ol type="a"><li>Plantea las hipótesis del test de esfericidad de Bartlett.</li><li>Calcula el estadístico y sus grados de libertad.</li><li>Con $\alpha=1\,\%$, decide y concluye: ¿tiene sentido aplicar PCA o análisis factorial?</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis", puntos: 1.5, solucion: String.raw`<p>$H_0:R=I$ (las variables no están correlacionadas) contra $H_1:R\neq I$ (hay correlaciones).</p><p>El determinante viene dado: $|R|=0{,}62$ (si fuera $1$, $R$ sería la identidad; cuanto más cerca de $0$, más correlación).</p>` },
      { titulo: "b) Estadístico de Bartlett y grados de libertad", puntos: 2.5, solucion: String.raw`<p>$\chi^2_B=-\left(n-1-\dfrac{2p+5}{6}\right)\ln|R|=-\left(40-1-\dfrac{17}{6}\right)\ln(0{,}62)$.</p><p>$=-(36{,}1667)\cdot(-0{,}478)=17{,}29$.</p><p>gl $=\dfrac{p(p-1)}{2}=\dfrac{6\cdot5}{2}=15$.</p>` },
      { titulo: "c) Valor crítico, decisión y conclusión", puntos: 2, solucion: String.raw`<p>Crítico: $\chi^2_{0{,}99;15}=30{,}578$ (<code>qchisq(0.99, 15)</code>). $17{,}29<30{,}578$ (p-valor $=0{,}3019$) ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>No hay evidencia de correlación global entre las variables: reducir dimensión con PCA o análisis factorial <strong>no se justifica</strong> (cada variable aporta información propia).</p><p>El test supone normalidad multivariante.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "χ²", js: "-(40 - 1 - (2*6 + 5)/6) * Math.log(0.62)", esperado: 17.29, tol: 0.0050000010000000004 },
      { que: "crítico", r: "cat(qchisq(0.99, 15))", esperado: 30.578, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C1", loc: "slides 27–31" },
      { id: "C4.1", loc: "slide 18" }
    ]
  },
  {
    id: "m02-d007",
    modulo: "m02-matrices-bartlett",
    concepto: "m02-c03",
    dificultad: 2,
    origen: "nueva",
    titulo: "¿Puede ser una matriz de correlación?",
    enunciado: String.raw`<p>Indica, justificando, si cada matriz puede ser una matriz de correlación:</p><p>$$A=\begin{pmatrix}1&0{,}5\\0{,}5&1\end{pmatrix}\qquad B=\begin{pmatrix}1&1{,}2\\1{,}2&1\end{pmatrix}\qquad C=\begin{pmatrix}1&0{,}9&-0{,}9\\0{,}9&1&0{,}9\\-0{,}9&0{,}9&1\end{pmatrix}$$</p>`,
    partes: [
      { titulo: "Las tres condiciones que hay que revisar", puntos: 1.5, solucion: String.raw`<p>Una matriz de correlación debe: (1) ser simétrica con <strong>unos en la diagonal</strong>; (2) tener todos sus elementos <strong>entre $-1$ y $1$</strong>; (3) ser <strong>semidefinida positiva</strong> (valores propios $\ge0$; en $2\times2$ equivale a determinante $\ge0$).</p>` },
      { titulo: "Matriz A", puntos: 1, solucion: String.raw`<p>Diagonal de unos, $|0{,}5|\le1$ y $|A|=1-0{,}25=0{,}75\ge0$ ⇒ <strong>sí</strong> puede serlo.</p>` },
      { titulo: "Matriz B", puntos: 1.5, solucion: "<p>Tiene un elemento $1{,}2>1$: una correlación no puede superar $1$ ⇒ <strong>no</strong> puede serlo. (Además $|B|=1-1{,}44=-0{,}44<0$.)</p>" },
      { titulo: "Matriz C", puntos: 2, solucion: "<p>Cumple (1) y (2), pero $|C|=1+2(0{,}9)(-0{,}9)(0{,}9)-3(0{,}81)=-2{,}888<0$: tiene un valor propio negativo ($1{,}9$; $1{,}9$; $-0{,}8$) ⇒ no es semidefinida positiva ⇒ <strong>no</strong> puede serlo.</p><p>Intuición: si $X_1$ se correlaciona $0{,}9$ con $X_2$ y $X_2$ $0{,}9$ con $X_3$, no es posible que $X_1$ y $X_3$ tengan correlación $-0{,}9$.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "|C|", r: "cat(det(matrix(c(1, 0.9, -0.9, 0.9, 1, 0.9, -0.9, 0.9, 1), 3, byrow = TRUE)))", esperado: -2.888, tol: 0.000500001 },
      { que: "menor valor propio de C", r: "cat(min(eigen(matrix(c(1, 0.9, -0.9, 0.9, 1, 0.9, -0.9, 0.9, 1), 3, byrow = TRUE))$values))", esperado: -0.8, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C1", loc: "slides 22–26" },
      { id: "PR-P1-Q1", loc: "afirmación 1" }
    ]
  }
]);
