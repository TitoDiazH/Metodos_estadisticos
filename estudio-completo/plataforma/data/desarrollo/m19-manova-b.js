/* ============================================================================
   Desarrollo · M19 MANOVA (P2) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m19-d001",
    modulo: "m19-manova",
    concepto: "m19-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C7.2", loc: "slides 29–30" },
      { id: "CMAN", loc: "páginas 5–6" }
    ],
    titulo: "Λ de Wilks a mano: tres metodologías y dos notas",
    enunciado: String.raw`<p>Se evalúan tres metodologías de enseñanza. Se comparan $g=3$ grupos ($N=30$ observaciones en total) en $p=2$ respuestas: nota de Matemática y nota de Lenguaje. Las matrices de sumas de cuadrados y productos son $$W=\begin{pmatrix}40&10\\10&30\end{pmatrix}\quad(\text{dentro}),\qquad B=\begin{pmatrix}60&20\\20&15\end{pmatrix}\quad(\text{entre}).$$</p><ol type="a"><li>Plantea las hipótesis del MANOVA y calcula $T$, $|W|$ y $|T|$.</li><li>Calcula la $\Lambda$ de Wilks e interprétala.</li><li>R entrega <code>approx F = 10.518</code> con <code>num Df = 4</code> y <code>den Df = 52</code>, p-valor $<0{,}0001$. Verifica <code>num Df</code>, decide con $\alpha=5\,\%$ y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis, matriz T y determinantes", puntos: 2, solucion: String.raw`<p>$H_0:\mu_1=\dots=\mu_3$ (vectores de medias iguales) contra $H_1$: al menos un grupo difiere en alguna respuesta.</p><p>$T=W+B=\begin{pmatrix}100&30\\30&45\end{pmatrix}$.</p><p>$|W|=40\cdot30-(10)^2=1100$; $|T|=100\cdot45-(30)^2=3600$.</p>` },
      { titulo: "b) Λ de Wilks e interpretación", puntos: 2, solucion: String.raw`<p>$\Lambda=\dfrac{|W|}{|W+B|}=\dfrac{1100}{3600}=0{,}3056$.</p><p>$\Lambda$ está entre $0$ y $1$: cerca de $1$ ⇒ los grupos casi no difieren ($B\approx0$); cerca de $0$ ⇒ grupos muy distintos. Aquí aproximadamente el $30{,}6\,\%$ de la variabilidad multivariada queda <strong>sin explicar</strong> por el factor. Se rechaza $H_0$ cuando $\Lambda$ es pequeña.</p>` },
      { titulo: "c) Grados de libertad, decisión y conclusión", puntos: 2, solucion: String.raw`<p><code>num Df</code> $=p(g-1)=2\cdot2=4$ ✓.</p><p>p-valor $<0{,}0001$, menor que $0{,}05$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>La metodología afecta el rendimiento conjunto en Matemática y Lenguaje. Como seguimiento se hacen los ANOVA univariados (<code>summary.aov</code>) y comparaciones múltiples para ver en qué respuesta y entre qué grupos está la diferencia.</p><p>Supuestos: normalidad multivariada (Mardia), covarianzas iguales (Box's M) e independencia. En R: <code>summary(manova(cbind(y1, y2) ~ grupo), test = "Wilks")</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "Λ", r: "cat(det(matrix(c(40, 10, 10, 30), 2, byrow = TRUE))/det(matrix(c(40, 10, 10, 30), 2, byrow = TRUE) + matrix(c(60, 20, 20, 15), 2, byrow = TRUE)))", esperado: 0.3056, tol: 0.000050001 },
      { que: "num Df", js: "2*(3-1)", esperado: 4, tol: 0.000050001 },
      { que: "|T|", js: "100*45 - (30)**2", esperado: 3600, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C7.2", loc: "slides 29–30" },
      { id: "CMAN", loc: "páginas 5–6" }
    ]
  },
  {
    id: "m19-d002",
    modulo: "m19-manova",
    concepto: "m19-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C7.2", loc: "slides 29–30" },
      { id: "CMAN", loc: "páginas 5–6" }
    ],
    titulo: "Λ de Wilks cuando los grupos se parecen",
    enunciado: String.raw`<p>Se comparan cuatro sucursales. Se comparan $g=4$ grupos ($N=40$ observaciones en total) en $p=2$ respuestas: satisfacción del cliente y tiempo de atención. Las matrices de sumas de cuadrados y productos son $$W=\begin{pmatrix}120&30\\30&90\end{pmatrix}\quad(\text{dentro}),\qquad B=\begin{pmatrix}9&3\\3&8\end{pmatrix}\quad(\text{entre}).$$</p><ol type="a"><li>Plantea las hipótesis del MANOVA y calcula $T$, $|W|$ y $|T|$.</li><li>Calcula la $\Lambda$ de Wilks e interprétala.</li><li>R entrega <code>approx F = 0.936</code> con <code>num Df = 6</code> y <code>den Df = 70</code>, p-valor $=0{,}4747$. Verifica <code>num Df</code>, decide con $\alpha=5\,\%$ y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis, matriz T y determinantes", puntos: 2, solucion: String.raw`<p>$H_0:\mu_1=\dots=\mu_4$ (vectores de medias iguales) contra $H_1$: al menos un grupo difiere en alguna respuesta.</p><p>$T=W+B=\begin{pmatrix}129&33\\33&98\end{pmatrix}$.</p><p>$|W|=120\cdot90-(30)^2=9900$; $|T|=129\cdot98-(33)^2=11553$.</p>` },
      { titulo: "b) Λ de Wilks e interpretación", puntos: 2, solucion: String.raw`<p>$\Lambda=\dfrac{|W|}{|W+B|}=\dfrac{9900}{11553}=0{,}8569$.</p><p>$\Lambda$ está entre $0$ y $1$: cerca de $1$ ⇒ los grupos casi no difieren ($B\approx0$); cerca de $0$ ⇒ grupos muy distintos. Aquí aproximadamente el $85{,}7\,\%$ de la variabilidad multivariada queda <strong>sin explicar</strong> por el factor. Se rechaza $H_0$ cuando $\Lambda$ es pequeña.</p>` },
      { titulo: "c) Grados de libertad, decisión y conclusión", puntos: 2, solucion: String.raw`<p><code>num Df</code> $=p(g-1)=2\cdot3=6$ ✓.</p><p>p-valor $=0{,}4747$, mayor que $0{,}05$ ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>No hay evidencia de que las sucursales difieran en el perfil conjunto de satisfacción y tiempo de atención.</p><p>Supuestos: normalidad multivariada (Mardia), covarianzas iguales (Box's M) e independencia. En R: <code>summary(manova(cbind(y1, y2) ~ grupo), test = "Wilks")</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "Λ", r: "cat(det(matrix(c(120, 30, 30, 90), 2, byrow = TRUE))/det(matrix(c(120, 30, 30, 90), 2, byrow = TRUE) + matrix(c(9, 3, 3, 8), 2, byrow = TRUE)))", esperado: 0.8569, tol: 0.000050001 },
      { que: "num Df", js: "2*(4-1)", esperado: 6, tol: 0.000050001 },
      { que: "|T|", js: "129*98 - (33)**2", esperado: 11553, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C7.2", loc: "slides 29–30" },
      { id: "CMAN", loc: "páginas 5–6" }
    ]
  },
  {
    id: "m19-d003",
    modulo: "m19-manova",
    concepto: "m19-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C7.2", loc: "slides 29–30" },
      { id: "CMAN", loc: "páginas 5–6" }
    ],
    titulo: "Λ de Wilks con dos grupos",
    enunciado: String.raw`<p>Se comparan dos procesos de fabricación. Se comparan $g=2$ grupos ($N=24$ observaciones en total) en $p=2$ respuestas: resistencia y peso. Las matrices de sumas de cuadrados y productos son $$W=\begin{pmatrix}50&-12\\-12&36\end{pmatrix}\quad(\text{dentro}),\qquad B=\begin{pmatrix}18&-9\\-9&4{,}5\end{pmatrix}\quad(\text{entre}).$$</p><ol type="a"><li>Plantea las hipótesis del MANOVA y calcula $T$, $|W|$ y $|T|$.</li><li>Calcula la $\Lambda$ de Wilks e interprétala.</li><li>R entrega <code>approx F = 3.819</code> con <code>num Df = 2</code> y <code>den Df = 42</code>, p-valor $=0{,}0299$. Verifica <code>num Df</code>, decide con $\alpha=5\,\%$ y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis, matriz T y determinantes", puntos: 2, solucion: String.raw`<p>$H_0:\mu_1=\dots=\mu_2$ (vectores de medias iguales) contra $H_1$: al menos un grupo difiere en alguna respuesta.</p><p>$T=W+B=\begin{pmatrix}68&-21\\-21&40{,}5\end{pmatrix}$.</p><p>$|W|=50\cdot36-(-12)^2=1656$; $|T|=68\cdot40{,}5-(-21)^2=2313$.</p>` },
      { titulo: "b) Λ de Wilks e interpretación", puntos: 2, solucion: String.raw`<p>$\Lambda=\dfrac{|W|}{|W+B|}=\dfrac{1656}{2313}=0{,}716$.</p><p>$\Lambda$ está entre $0$ y $1$: cerca de $1$ ⇒ los grupos casi no difieren ($B\approx0$); cerca de $0$ ⇒ grupos muy distintos. Aquí aproximadamente el $71{,}6\,\%$ de la variabilidad multivariada queda <strong>sin explicar</strong> por el factor. Se rechaza $H_0$ cuando $\Lambda$ es pequeña.</p>` },
      { titulo: "c) Grados de libertad, decisión y conclusión", puntos: 2, solucion: String.raw`<p><code>num Df</code> $=p(g-1)=2\cdot1=2$ ✓.</p><p>p-valor $=0{,}0299$, menor que $0{,}05$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Los dos procesos difieren en el vector de medias de resistencia y peso (con dos grupos el MANOVA equivale al $T^2$ de Hotelling de dos muestras). Como seguimiento se hacen los ANOVA univariados (<code>summary.aov</code>) y comparaciones múltiples para ver en qué respuesta y entre qué grupos está la diferencia.</p><p>Supuestos: normalidad multivariada (Mardia), covarianzas iguales (Box's M) e independencia. En R: <code>summary(manova(cbind(y1, y2) ~ grupo), test = "Wilks")</code>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "Λ", r: "cat(det(matrix(c(50, -12, -12, 36), 2, byrow = TRUE))/det(matrix(c(50, -12, -12, 36), 2, byrow = TRUE) + matrix(c(18, -9, -9, 4.5), 2, byrow = TRUE)))", esperado: 0.716, tol: 0.000050001 },
      { que: "num Df", js: "2*(2-1)", esperado: 2, tol: 0.000050001 },
      { que: "|T|", js: "68*40.5 - (-21)**2", esperado: 2313, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C7.2", loc: "slides 29–30" },
      { id: "CMAN", loc: "páginas 5–6" }
    ]
  },
  {
    id: "m19-d004",
    modulo: "m19-manova",
    concepto: "m19-c04",
    dificultad: 2,
    origen: "nueva",
    titulo: "MANOVA: supuestos y elección del estadístico",
    enunciado: `<p>Se quiere comparar $g=3$ dietas en $p=3$ respuestas (peso, colesterol y presión) con $15$ personas por dieta. Antes del MANOVA se obtuvo: test de Mardia, asimetría p-valor $=0{,}31$ y curtosis p-valor $=0{,}47$; Box's M, p-valor $=0{,}02$.</p><ol type="a"><li>¿Por qué un MANOVA y no tres ANOVA separados?</li><li>Interpreta el test de Mardia.</li><li>Calcula los gl de Box's M e interpreta su resultado. ¿Qué estadístico conviene informar?</li></ol>`,
    partes: [
      { titulo: "a) Por qué MANOVA", puntos: 2, solucion: String.raw`<p>Tres ANOVA separados <strong>inflan el error tipo I</strong> global (con $\alpha=0{,}05$ en cada uno, la probabilidad de al menos un falso rechazo es mayor que $0{,}05$) e ignoran la <strong>correlación</strong> entre las respuestas. El MANOVA contrasta de una vez $H_0:\mu_1=\mu_2=\mu_3$ (vectores de medias) y puede detectar diferencias en combinaciones de las variables.</p>` },
      { titulo: "b) Normalidad multivariada (Mardia)", puntos: 1.5, solucion: `<p>$H_0$: los datos siguen una normal multivariada. Ambos p-valores ($0{,}31$ y $0{,}47$) son mayores que $0{,}05$ ⇒ no se rechaza: el supuesto de normalidad multivariada es razonable. En R: <code>MVN::mvn(X, mvnTest = "mardia")</code>.</p>` },
      { titulo: "c) Box's M y estadístico recomendado", puntos: 2.5, solucion: String.raw`<p>gl $=\dfrac{p(p+1)}{2}(g-1)=\dfrac{3\cdot4}{2}\cdot2=12$.</p><p>$H_0$: las matrices de covarianza son iguales en los tres grupos. p-valor $=0{,}02<0{,}05$ ⇒ se rechaza: hay evidencia de covarianzas distintas.</p><p>Como los tamaños de grupo son <strong>iguales</strong>, el MANOVA es relativamente robusto a esta violación; conviene informar la <strong>traza de Pillai</strong>, que es el estadístico más robusto cuando falla la homogeneidad (<code>summary(fit, test = "Pillai")</code>).</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "gl Box's M", js: "3*4/2*2", esperado: 12, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C7.2", loc: "slides 26–31" },
      { id: "CMAN", loc: "páginas 8–9 y 13" }
    ]
  }
]);
