/* ============================================================================
   Desarrollo · M16 QDA, Naive Bayes y validación (P2) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m16-d001",
    modulo: "m16-qda-nb-validacion",
    concepto: "m16-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C6.2", loc: "slides 7–11" },
      { id: "AY6-E", loc: "P1" }
    ],
    titulo: "Naive Bayes con variables categóricas: ¿compra o no compra?",
    enunciado: `<p>Una tienda en línea quiere predecir si un visitante compra. De 10 casos, 6 son «Compra» y 4 son «No compra». La tabla indica cuántos casos de cada clase tienen el valor que presenta el caso nuevo:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable = valor del caso nuevo</th><th>«Compra» (de 6)</th><th>«No compra» (de 4)</th></tr></thead><tbody><tr><td>Edad = Joven</td><td>2</td><td>3</td></tr><tr><td>Ingreso = Alto</td><td>3</td><td>1</td></tr><tr><td>Crédito = Bueno</td><td>4</td><td>1</td></tr></tbody></table></div><ol type="a"><li>Calcula las probabilidades a priori.</li><li>Calcula las verosimilitudes de cada variable por clase.</li><li>Calcula el score de cada clase.</li><li>Calcula la probabilidad posterior y clasifica el caso nuevo.</li></ol>`,
    partes: [
      { titulo: "a) Probabilidades a priori", puntos: 1, solucion: String.raw`<p>$P(\text{Compra})=\dfrac{6}{10}=0{,}6$; $P(\text{No compra})=\dfrac{4}{10}=0{,}4$.</p>` },
      { titulo: "b) Verosimilitudes", puntos: 2, solucion: String.raw`<p>Frecuencia relativa dentro de cada clase, $n_{jkv}/n_k$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable</th><th>$P(\cdot\mid\text{Compra})$</th><th>$P(\cdot\mid\text{No compra})$</th></tr></thead><tbody><tr><td>Edad = Joven</td><td>$\dfrac{2}{6}=0{,}3333$</td><td>$\dfrac{3}{4}=0{,}75$</td></tr><tr><td>Ingreso = Alto</td><td>$\dfrac{3}{6}=0{,}5$</td><td>$\dfrac{1}{4}=0{,}25$</td></tr><tr><td>Crédito = Bueno</td><td>$\dfrac{4}{6}=0{,}6667$</td><td>$\dfrac{1}{4}=0{,}25$</td></tr></tbody></table></div>` },
      { titulo: "c) Score de cada clase", puntos: 1.5, solucion: String.raw`<p>Score $=P(C_k)\prod_jP(x_j\mid C_k)$ (supuesto «naive»: variables independientes dentro de cada clase):</p><p>Compra: $0{,}6\cdot0{,}3333\cdot0{,}5\cdot0{,}6667=0{,}06667$</p><p>No compra: $0{,}4\cdot0{,}75\cdot0{,}25\cdot0{,}25=0{,}01875$</p>` },
      { titulo: "d) Posterior y clasificación", puntos: 1.5, solucion: String.raw`<p>$P(\text{Compra}\mid x)=\dfrac{0{,}06667}{0{,}06667+0{,}01875}=0{,}78$.</p><p>Mayor score ⇒ el caso nuevo se clasifica como <strong>«Compra»</strong> (con seguridad moderada).</p><p>En R: <code>e1071::naiveBayes()</code> y <code>predict(…, type = "raw")</code> para las posteriores.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "posterior de Compra", js: "(function(){ var s = [6/10*2/6*3/6*4/6, 4/10*3/4*1/4*1/4]; return s[0]/(s[0]+s[1]); })()", esperado: 0.78, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C6.2", loc: "slides 7–11" },
      { id: "AY6-E", loc: "P1" }
    ]
  },
  {
    id: "m16-d002",
    modulo: "m16-qda-nb-validacion",
    concepto: "m16-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C6.2", loc: "slides 7–11" },
      { id: "AY6-E", loc: "P1" }
    ],
    titulo: "Naive Bayes: filtro de correo no deseado",
    enunciado: `<p>Un filtro clasifica correos como spam o no spam. De 20 casos, 8 son «Spam» y 12 son «No spam». La tabla indica cuántos casos de cada clase tienen el valor que presenta el caso nuevo:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable = valor del caso nuevo</th><th>«Spam» (de 8)</th><th>«No spam» (de 12)</th></tr></thead><tbody><tr><td>Contiene «oferta» = sí</td><td>6</td><td>3</td></tr><tr><td>Contiene enlace = sí</td><td>5</td><td>2</td></tr><tr><td>Trae adjunto = no</td><td>6</td><td>6</td></tr></tbody></table></div><ol type="a"><li>Calcula las probabilidades a priori.</li><li>Calcula las verosimilitudes de cada variable por clase.</li><li>Calcula el score de cada clase.</li><li>Calcula la probabilidad posterior y clasifica el caso nuevo.</li></ol>`,
    partes: [
      { titulo: "a) Probabilidades a priori", puntos: 1, solucion: String.raw`<p>$P(\text{Spam})=\dfrac{8}{20}=0{,}4$; $P(\text{No spam})=\dfrac{12}{20}=0{,}6$.</p>` },
      { titulo: "b) Verosimilitudes", puntos: 2, solucion: String.raw`<p>Frecuencia relativa dentro de cada clase, $n_{jkv}/n_k$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable</th><th>$P(\cdot\mid\text{Spam})$</th><th>$P(\cdot\mid\text{No spam})$</th></tr></thead><tbody><tr><td>Contiene «oferta» = sí</td><td>$\dfrac{6}{8}=0{,}75$</td><td>$\dfrac{3}{12}=0{,}25$</td></tr><tr><td>Contiene enlace = sí</td><td>$\dfrac{5}{8}=0{,}625$</td><td>$\dfrac{2}{12}=0{,}1667$</td></tr><tr><td>Trae adjunto = no</td><td>$\dfrac{6}{8}=0{,}75$</td><td>$\dfrac{6}{12}=0{,}5$</td></tr></tbody></table></div>` },
      { titulo: "c) Score de cada clase", puntos: 1.5, solucion: String.raw`<p>Score $=P(C_k)\prod_jP(x_j\mid C_k)$ (supuesto «naive»: variables independientes dentro de cada clase):</p><p>Spam: $0{,}4\cdot0{,}75\cdot0{,}625\cdot0{,}75=0{,}14063$</p><p>No spam: $0{,}6\cdot0{,}25\cdot0{,}1667\cdot0{,}5=0{,}0125$</p>` },
      { titulo: "d) Posterior y clasificación", puntos: 1.5, solucion: String.raw`<p>$P(\text{Spam}\mid x)=\dfrac{0{,}14063}{0{,}14063+0{,}0125}=0{,}918$.</p><p>Mayor score ⇒ el caso nuevo se clasifica como <strong>«Spam»</strong> (con bastante seguridad).</p><p>En R: <code>e1071::naiveBayes()</code> y <code>predict(…, type = "raw")</code> para las posteriores.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "posterior de Spam", js: "(function(){ var s = [8/20*6/8*5/8*6/8, 12/20*3/12*2/12*6/12]; return s[0]/(s[0]+s[1]); })()", esperado: 0.918, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C6.2", loc: "slides 7–11" },
      { id: "AY6-E", loc: "P1" }
    ]
  },
  {
    id: "m16-d003",
    modulo: "m16-qda-nb-validacion",
    concepto: "m16-c02",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C6.2", loc: "slides 7–11" },
      { id: "AY6-E", loc: "P1" }
    ],
    titulo: "Naive Bayes con priors desbalanceados: fuga de clientes",
    enunciado: `<p>Una compañía quiere anticipar la fuga de clientes. De 20 casos, 5 son «Se fuga» y 15 son «Se queda». La tabla indica cuántos casos de cada clase tienen el valor que presenta el caso nuevo:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable = valor del caso nuevo</th><th>«Se fuga» (de 5)</th><th>«Se queda» (de 15)</th></tr></thead><tbody><tr><td>Plan = Básico</td><td>4</td><td>6</td></tr><tr><td>Reclamó = sí</td><td>4</td><td>3</td></tr></tbody></table></div><ol type="a"><li>Calcula las probabilidades a priori.</li><li>Calcula las verosimilitudes de cada variable por clase.</li><li>Calcula el score de cada clase.</li><li>Calcula la probabilidad posterior y clasifica el caso nuevo.</li></ol>`,
    partes: [
      { titulo: "a) Probabilidades a priori", puntos: 1, solucion: String.raw`<p>$P(\text{Se fuga})=\dfrac{5}{20}=0{,}25$; $P(\text{Se queda})=\dfrac{15}{20}=0{,}75$.</p>` },
      { titulo: "b) Verosimilitudes", puntos: 2, solucion: String.raw`<p>Frecuencia relativa dentro de cada clase, $n_{jkv}/n_k$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable</th><th>$P(\cdot\mid\text{Se fuga})$</th><th>$P(\cdot\mid\text{Se queda})$</th></tr></thead><tbody><tr><td>Plan = Básico</td><td>$\dfrac{4}{5}=0{,}8$</td><td>$\dfrac{6}{15}=0{,}4$</td></tr><tr><td>Reclamó = sí</td><td>$\dfrac{4}{5}=0{,}8$</td><td>$\dfrac{3}{15}=0{,}2$</td></tr></tbody></table></div>` },
      { titulo: "c) Score de cada clase", puntos: 1.5, solucion: String.raw`<p>Score $=P(C_k)\prod_jP(x_j\mid C_k)$ (supuesto «naive»: variables independientes dentro de cada clase):</p><p>Se fuga: $0{,}25\cdot0{,}8\cdot0{,}8=0{,}16$</p><p>Se queda: $0{,}75\cdot0{,}4\cdot0{,}2=0{,}06$</p>` },
      { titulo: "d) Posterior y clasificación", puntos: 1.5, solucion: String.raw`<p>$P(\text{Se fuga}\mid x)=\dfrac{0{,}16}{0{,}16+0{,}06}=0{,}727$.</p><p>Mayor score ⇒ el caso nuevo se clasifica como <strong>«Se fuga»</strong> (con seguridad moderada).</p><p>En R: <code>e1071::naiveBayes()</code> y <code>predict(…, type = "raw")</code> para las posteriores.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "posterior de Se fuga", js: "(function(){ var s = [5/20*4/5*4/5, 15/20*6/15*3/15]; return s[0]/(s[0]+s[1]); })()", esperado: 0.727, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C6.2", loc: "slides 7–11" },
      { id: "AY6-E", loc: "P1" }
    ]
  },
  {
    id: "m16-d004",
    modulo: "m16-qda-nb-validacion",
    concepto: "m16-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "AY6-E", loc: "P1(d)" },
      { id: "C6.2", loc: "slides 7–9" }
    ],
    titulo: "Frecuencia cero y suavizado de Laplace",
    enunciado: `<p>Un banco clasifica clientes en morosos y no morosos. De 15 casos, 5 son «Moroso» y 10 son «No moroso». La tabla indica cuántos casos de cada clase tienen el valor que presenta el caso nuevo:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable = valor del caso nuevo</th><th>«Moroso» (de 5)</th><th>«No moroso» (de 10)</th><th>N.º de categorías</th></tr></thead><tbody><tr><td>Vivienda = Propia</td><td>0</td><td>6</td><td>3</td></tr><tr><td>Empleo = Independiente</td><td>3</td><td>3</td><td>2</td></tr></tbody></table></div><ol type="a"><li>Calcula las probabilidades a priori.</li><li>Calcula las verosimilitudes. ¿Qué problema aparece y cómo lo resuelve el suavizado de Laplace?</li><li>Calcula el score de cada clase.</li><li>Calcula la probabilidad posterior y clasifica el caso nuevo.</li></ol>`,
    partes: [
      { titulo: "a) Probabilidades a priori", puntos: 1, solucion: String.raw`<p>$P(\text{Moroso})=\dfrac{5}{15}=0{,}3333$; $P(\text{No moroso})=\dfrac{10}{15}=0{,}6667$.</p>` },
      { titulo: "b) Verosimilitudes, frecuencia cero y Laplace", puntos: 2, solucion: String.raw`<p>Sin corrección hay una frecuencia $0$ (Vivienda = Propia): el producto de esa clase sería $0$ sin importar las demás variables.</p><p>Laplace: $P(x_j=v\mid C_k)=\dfrac{n_{jkv}+1}{n_k+m_j}$, con $m_j$ = número de categorías de la variable.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable</th><th>$P(\cdot\mid\text{Moroso})$</th><th>$P(\cdot\mid\text{No moroso})$</th></tr></thead><tbody><tr><td>Vivienda = Propia</td><td>$\dfrac{0+1}{5+3}=0{,}125$</td><td>$\dfrac{6+1}{10+3}=0{,}5385$</td></tr><tr><td>Empleo = Independiente</td><td>$\dfrac{3+1}{5+2}=0{,}5714$</td><td>$\dfrac{3+1}{10+2}=0{,}3333$</td></tr></tbody></table></div>` },
      { titulo: "c) Score de cada clase", puntos: 1.5, solucion: String.raw`<p>Score $=P(C_k)\prod_jP(x_j\mid C_k)$ (supuesto «naive»: variables independientes dentro de cada clase):</p><p>Moroso: $0{,}3333\cdot0{,}125\cdot0{,}5714=0{,}02381$</p><p>No moroso: $0{,}6667\cdot0{,}5385\cdot0{,}3333=0{,}11966$</p>` },
      { titulo: "d) Posterior y clasificación", puntos: 1.5, solucion: String.raw`<p>$P(\text{No moroso}\mid x)=\dfrac{0{,}11966}{0{,}02381+0{,}11966}=0{,}834$.</p><p>Mayor score ⇒ el caso nuevo se clasifica como <strong>«No moroso»</strong> (con bastante seguridad).</p><p>En R: <code>naiveBayes(…, laplace = 1)</code>. Los priors no se suavizan.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "posterior de No moroso", js: "(function(){ var s = [5/15*(0+1)/(5+3)*(3+1)/(5+2), 10/15*(6+1)/(10+3)*(3+1)/(10+2)]; return s[1]/(s[0]+s[1]); })()", esperado: 0.834, tol: 0.000500001 }
    ],
    fuente: [
      { id: "AY6-E", loc: "P1(d)" },
      { id: "C6.2", loc: "slides 7–9" }
    ]
  },
  {
    id: "m16-d005",
    modulo: "m16-qda-nb-validacion",
    concepto: "m16-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "AY6-E", loc: "P1(d)" },
      { id: "C6.2", loc: "slides 7–9" }
    ],
    titulo: "Laplace cuando la frecuencia cero está en la otra clase",
    enunciado: `<p>Se clasifica si un pedido llega con atraso. De 12 casos, 4 son «Atraso» y 8 son «A tiempo». La tabla indica cuántos casos de cada clase tienen el valor que presenta el caso nuevo:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable = valor del caso nuevo</th><th>«Atraso» (de 4)</th><th>«A tiempo» (de 8)</th><th>N.º de categorías</th></tr></thead><tbody><tr><td>Zona = Rural</td><td>3</td><td>0</td><td>3</td></tr><tr><td>Clima = Lluvia</td><td>3</td><td>2</td><td>2</td></tr></tbody></table></div><ol type="a"><li>Calcula las probabilidades a priori.</li><li>Calcula las verosimilitudes. ¿Qué problema aparece y cómo lo resuelve el suavizado de Laplace?</li><li>Calcula el score de cada clase.</li><li>Calcula la probabilidad posterior y clasifica el caso nuevo.</li></ol>`,
    partes: [
      { titulo: "a) Probabilidades a priori", puntos: 1, solucion: String.raw`<p>$P(\text{Atraso})=\dfrac{4}{12}=0{,}3333$; $P(\text{A tiempo})=\dfrac{8}{12}=0{,}6667$.</p>` },
      { titulo: "b) Verosimilitudes, frecuencia cero y Laplace", puntos: 2, solucion: String.raw`<p>Sin corrección hay una frecuencia $0$ (Zona = Rural): el producto de esa clase sería $0$ sin importar las demás variables.</p><p>Laplace: $P(x_j=v\mid C_k)=\dfrac{n_{jkv}+1}{n_k+m_j}$, con $m_j$ = número de categorías de la variable.</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable</th><th>$P(\cdot\mid\text{Atraso})$</th><th>$P(\cdot\mid\text{A tiempo})$</th></tr></thead><tbody><tr><td>Zona = Rural</td><td>$\dfrac{3+1}{4+3}=0{,}5714$</td><td>$\dfrac{0+1}{8+3}=0{,}0909$</td></tr><tr><td>Clima = Lluvia</td><td>$\dfrac{3+1}{4+2}=0{,}6667$</td><td>$\dfrac{2+1}{8+2}=0{,}3$</td></tr></tbody></table></div>` },
      { titulo: "c) Score de cada clase", puntos: 1.5, solucion: String.raw`<p>Score $=P(C_k)\prod_jP(x_j\mid C_k)$ (supuesto «naive»: variables independientes dentro de cada clase):</p><p>Atraso: $0{,}3333\cdot0{,}5714\cdot0{,}6667=0{,}12698$</p><p>A tiempo: $0{,}6667\cdot0{,}0909\cdot0{,}3=0{,}01818$</p>` },
      { titulo: "d) Posterior y clasificación", puntos: 1.5, solucion: String.raw`<p>$P(\text{Atraso}\mid x)=\dfrac{0{,}12698}{0{,}12698+0{,}01818}=0{,}875$.</p><p>Mayor score ⇒ el caso nuevo se clasifica como <strong>«Atraso»</strong> (con bastante seguridad).</p><p>En R: <code>naiveBayes(…, laplace = 1)</code>. Los priors no se suavizan.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "posterior de Atraso", js: "(function(){ var s = [4/12*(3+1)/(4+3)*(3+1)/(4+2), 8/12*(0+1)/(8+3)*(2+1)/(8+2)]; return s[0]/(s[0]+s[1]); })()", esperado: 0.875, tol: 0.000500001 }
    ],
    fuente: [
      { id: "AY6-E", loc: "P1(d)" },
      { id: "C6.2", loc: "slides 7–9" }
    ]
  },
  {
    id: "m16-d006",
    modulo: "m16-qda-nb-validacion",
    concepto: "m16-c02",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C6.2", loc: "slides 7–11" },
      { id: "AY6-E", loc: "P2" }
    ],
    titulo: "Naive Bayes gaussiano: ¿aprueba o reprueba?",
    enunciado: `<p>Con datos de años anteriores se estimaron medias y desviaciones por clase:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Clase</th><th>Prior</th><th>Media horas de estudio</th><th>Desv. horas de estudio</th><th>Media asistencia (%)</th><th>Desv. asistencia (%)</th></tr></thead><tbody><tr><td>Aprueba</td><td>$0{,}6$</td><td>$10$</td><td>$2$</td><td>$85$</td><td>$8$</td></tr><tr><td>Reprueba</td><td>$0{,}4$</td><td>$6$</td><td>$2{,}5$</td><td>$70$</td><td>$10$</td></tr></tbody></table></div><p>Caso nuevo: horas de estudio $=8$, asistencia (%) $=75$.</p><ol type="a"><li>Calcula las densidades normales de cada variable en cada clase.</li><li>Calcula los scores y clasifica.</li><li>Calcula la probabilidad posterior de la clase elegida.</li><li>Repite la clasificación con priors $(0{,}5; 0{,}5)$. ¿Cambia la decisión?</li></ol>`,
    partes: [
      { titulo: "a) Densidades gaussianas", puntos: 2.5, solucion: String.raw`<p>$f(x)=\dfrac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\dfrac{(x-\mu)^2}{2\sigma^2}\right)$ (en R: <code>dnorm(x, media, sd)</code>).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Clase</th><th>horas de estudio</th><th>asistencia (%)</th></tr></thead><tbody><tr><td>Aprueba</td><td>$\texttt{dnorm}(8;\,10;\,2)=0{,}12099$</td><td>$\texttt{dnorm}(75;\,85;\,8)=0{,}02283$</td></tr><tr><td>Reprueba</td><td>$\texttt{dnorm}(8;\,6;\,2{,}5)=0{,}11588$</td><td>$\texttt{dnorm}(75;\,70;\,10)=0{,}03521$</td></tr></tbody></table></div><p>Ejemplo: $\dfrac{1}{2\sqrt{2\pi}}\exp\!\left(-\dfrac{(8-10)^2}{2\cdot2^2}\right)=0{,}12099$. Es una <strong>densidad</strong>, no una probabilidad: puede ser mayor que $1$.</p>` },
      { titulo: "b) Scores y clasificación", puntos: 1.5, solucion: String.raw`<p>Aprueba: $0{,}6\cdot0{,}12099\cdot0{,}02283=0{,}001657$</p><p>Reprueba: $0{,}4\cdot0{,}11588\cdot0{,}03521=0{,}001632$</p><p>Mayor score ⇒ <strong>Aprueba</strong>.</p>` },
      { titulo: "c) Probabilidad posterior", puntos: 1, solucion: String.raw`<p>$P(\text{Aprueba}\mid x)=\dfrac{0{,}001657}{0{,}001657+0{,}001632}=0{,}504$.</p>` },
      { titulo: "d) Efecto de cambiar los priors", puntos: 1, solucion: String.raw`<p>Aprueba: $0{,}5\cdot0{,}12099\cdot0{,}02283=0{,}001381$</p><p>Reprueba: $0{,}5\cdot0{,}11588\cdot0{,}03521=0{,}00204$</p><p>Ahora gana <strong>Reprueba</strong> (posterior $0{,}596$). <strong>La decisión cambia</strong>: el prior empuja la clasificación hacia la clase que se supone más frecuente. Las densidades (verosimilitudes) no dependen del prior.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "densidad de ejemplo (dnorm)", r: "cat(dnorm(8, 10, 2))", esperado: 0.12099, tol: 0.000005000999999999999 },
      { que: "posterior con los priors originales", r: "cat({s <- c(0.6*dnorm(8, 10, 2)*dnorm(75, 85, 8), 0.4*dnorm(8, 6, 2.5)*dnorm(75, 70, 10)); s[1]/sum(s)})", esperado: 0.504, tol: 0.000500001 },
      { que: "posterior con los priors nuevos", r: "cat({s <- c(0.5*dnorm(8, 10, 2)*dnorm(75, 85, 8), 0.5*dnorm(8, 6, 2.5)*dnorm(75, 70, 10)); s[2]/sum(s)})", esperado: 0.596, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C6.2", loc: "slides 7–11" },
      { id: "AY6-E", loc: "P2" }
    ]
  },
  {
    id: "m16-d007",
    modulo: "m16-qda-nb-validacion",
    concepto: "m16-c02",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C6.2", loc: "slides 7–11" },
      { id: "AY6-E", loc: "P2" }
    ],
    titulo: "Naive Bayes gaussiano con una clase rara (fraude)",
    enunciado: `<p>Un sistema antifraude usa el monto (miles de pesos) y el número de transacciones del día:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Clase</th><th>Prior</th><th>Media monto</th><th>Desv. monto</th><th>Media transacciones</th><th>Desv. transacciones</th></tr></thead><tbody><tr><td>Fraude</td><td>$0{,}1$</td><td>$300$</td><td>$80$</td><td>$6$</td><td>$2$</td></tr><tr><td>Legítima</td><td>$0{,}9$</td><td>$120$</td><td>$60$</td><td>$2$</td><td>$1{,}5$</td></tr></tbody></table></div><p>Caso nuevo: monto $=220$, transacciones $=4$.</p><ol type="a"><li>Calcula las densidades normales de cada variable en cada clase.</li><li>Calcula los scores y clasifica.</li><li>Calcula la probabilidad posterior de la clase elegida.</li><li>Repite la clasificación con priors $(0{,}5; 0{,}5)$. ¿Cambia la decisión?</li></ol>`,
    partes: [
      { titulo: "a) Densidades gaussianas", puntos: 2.5, solucion: String.raw`<p>$f(x)=\dfrac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\dfrac{(x-\mu)^2}{2\sigma^2}\right)$ (en R: <code>dnorm(x, media, sd)</code>).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Clase</th><th>monto</th><th>transacciones</th></tr></thead><tbody><tr><td>Fraude</td><td>$\texttt{dnorm}(220;\,300;\,80)=0{,}00302$</td><td>$\texttt{dnorm}(4;\,6;\,2)=0{,}12099$</td></tr><tr><td>Legítima</td><td>$\texttt{dnorm}(220;\,120;\,60)=0{,}00166$</td><td>$\texttt{dnorm}(4;\,2;\,1{,}5)=0{,}10934$</td></tr></tbody></table></div><p>Ejemplo: $\dfrac{1}{80\sqrt{2\pi}}\exp\!\left(-\dfrac{(220-300)^2}{2\cdot80^2}\right)=0{,}00302$. Es una <strong>densidad</strong>, no una probabilidad: puede ser mayor que $1$.</p>` },
      { titulo: "b) Scores y clasificación", puntos: 1.5, solucion: String.raw`<p>Fraude: $0{,}1\cdot0{,}00302\cdot0{,}12099=0{,}000037$</p><p>Legítima: $0{,}9\cdot0{,}00166\cdot0{,}10934=0{,}000163$</p><p>Mayor score ⇒ <strong>Legítima</strong>.</p>` },
      { titulo: "c) Probabilidad posterior", puntos: 1, solucion: String.raw`<p>$P(\text{Legítima}\mid x)=\dfrac{0{,}000163}{0{,}000037+0{,}000163}=0{,}817$.</p>` },
      { titulo: "d) Efecto de cambiar los priors", puntos: 1, solucion: String.raw`<p>Fraude: $0{,}5\cdot0{,}00302\cdot0{,}12099=0{,}000183$</p><p>Legítima: $0{,}5\cdot0{,}00166\cdot0{,}10934=0{,}000091$</p><p>Ahora gana <strong>Fraude</strong> (posterior $0{,}669$). <strong>La decisión cambia</strong>: el prior empuja la clasificación hacia la clase que se supone más frecuente. Las densidades (verosimilitudes) no dependen del prior.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "densidad de ejemplo (dnorm)", r: "cat(dnorm(220, 300, 80))", esperado: 0.00302, tol: 0.000005000999999999999 },
      { que: "posterior con los priors originales", r: "cat({s <- c(0.1*dnorm(220, 300, 80)*dnorm(4, 6, 2), 0.9*dnorm(220, 120, 60)*dnorm(4, 2, 1.5)); s[2]/sum(s)})", esperado: 0.817, tol: 0.000500001 },
      { que: "posterior con los priors nuevos", r: "cat({s <- c(0.5*dnorm(220, 300, 80)*dnorm(4, 6, 2), 0.5*dnorm(220, 120, 60)*dnorm(4, 2, 1.5)); s[1]/sum(s)})", esperado: 0.669, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C6.2", loc: "slides 7–11" },
      { id: "AY6-E", loc: "P2" }
    ]
  },
  {
    id: "m16-d008",
    modulo: "m16-qda-nb-validacion",
    concepto: "m16-c02",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C6.2", loc: "slides 7–11" },
      { id: "AY6-E", loc: "P2" }
    ],
    titulo: "Naive Bayes gaussiano con desviaciones pequeñas",
    enunciado: `<p>Se clasifican piezas según dos mediciones (mm):</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Clase</th><th>Prior</th><th>Media diámetro</th><th>Desv. diámetro</th><th>Media espesor</th><th>Desv. espesor</th></tr></thead><tbody><tr><td>Conforme</td><td>$0{,}8$</td><td>$10$</td><td>$0{,}1$</td><td>$2$</td><td>$0{,}05$</td></tr><tr><td>Defectuosa</td><td>$0{,}2$</td><td>$10{,}3$</td><td>$0{,}2$</td><td>$2{,}1$</td><td>$0{,}08$</td></tr></tbody></table></div><p>Caso nuevo: diámetro $=10{,}1$, espesor $=2{,}05$.</p><ol type="a"><li>Calcula las densidades normales de cada variable en cada clase.</li><li>Calcula los scores y clasifica.</li><li>Calcula la probabilidad posterior de la clase elegida.</li><li>Repite la clasificación con priors $(0{,}5; 0{,}5)$. ¿Cambia la decisión?</li></ol>`,
    partes: [
      { titulo: "a) Densidades gaussianas", puntos: 2.5, solucion: String.raw`<p>$f(x)=\dfrac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\dfrac{(x-\mu)^2}{2\sigma^2}\right)$ (en R: <code>dnorm(x, media, sd)</code>).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Clase</th><th>diámetro</th><th>espesor</th></tr></thead><tbody><tr><td>Conforme</td><td>$\texttt{dnorm}(10{,}1;\,10;\,0{,}1)=2{,}41971$</td><td>$\texttt{dnorm}(2{,}05;\,2;\,0{,}05)=4{,}83941$</td></tr><tr><td>Defectuosa</td><td>$\texttt{dnorm}(10{,}1;\,10{,}3;\,0{,}2)=1{,}20985$</td><td>$\texttt{dnorm}(2{,}05;\,2{,}1;\,0{,}08)=4{,}10201$</td></tr></tbody></table></div><p>Ejemplo: $\dfrac{1}{0{,}1\sqrt{2\pi}}\exp\!\left(-\dfrac{(10{,}1-10)^2}{2\cdot0{,}1^2}\right)=2{,}41971$. Es una <strong>densidad</strong>, no una probabilidad: puede ser mayor que $1$.</p>` },
      { titulo: "b) Scores y clasificación", puntos: 1.5, solucion: String.raw`<p>Conforme: $0{,}8\cdot2{,}41971\cdot4{,}83941=9{,}367973$</p><p>Defectuosa: $0{,}2\cdot1{,}20985\cdot4{,}10201=0{,}992567$</p><p>Mayor score ⇒ <strong>Conforme</strong>.</p>` },
      { titulo: "c) Probabilidad posterior", puntos: 1, solucion: String.raw`<p>$P(\text{Conforme}\mid x)=\dfrac{9{,}367973}{9{,}367973+0{,}992567}=0{,}904$.</p>` },
      { titulo: "d) Efecto de cambiar los priors", puntos: 1, solucion: String.raw`<p>Conforme: $0{,}5\cdot2{,}41971\cdot4{,}83941=5{,}854983$</p><p>Defectuosa: $0{,}5\cdot1{,}20985\cdot4{,}10201=2{,}481417$</p><p>Ahora gana <strong>Conforme</strong> (posterior $0{,}702$). La decisión no cambia, pero la posterior sí: el prior favorece a la clase que se supone más frecuente. Las densidades (verosimilitudes) no dependen del prior.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "densidad de ejemplo (dnorm)", r: "cat(dnorm(10.1, 10, 0.1))", esperado: 2.41971, tol: 0.000005000999999999999 },
      { que: "posterior con los priors originales", r: "cat({s <- c(0.8*dnorm(10.1, 10, 0.1)*dnorm(2.05, 2, 0.05), 0.2*dnorm(10.1, 10.3, 0.2)*dnorm(2.05, 2.1, 0.08)); s[1]/sum(s)})", esperado: 0.904, tol: 0.000500001 },
      { que: "posterior con los priors nuevos", r: "cat({s <- c(0.5*dnorm(10.1, 10, 0.1)*dnorm(2.05, 2, 0.05), 0.5*dnorm(10.1, 10.3, 0.2)*dnorm(2.05, 2.1, 0.08)); s[1]/sum(s)})", esperado: 0.702, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C6.2", loc: "slides 7–11" },
      { id: "AY6-E", loc: "P2" }
    ]
  },
  {
    id: "m16-d009",
    modulo: "m16-qda-nb-validacion",
    concepto: "m16-c05",
    dificultad: 1,
    origen: "variacion",
    base: [
      { id: "C6.2", loc: "slides 16–17" },
      { id: "AY6-E", loc: "P3(b)" }
    ],
    titulo: "Matriz de confusión: detección de fraude",
    enunciado: `<p>Un clasificador marca transacciones como fraude. La clase positiva es «Fraude». Matriz de confusión sobre los datos de prueba:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Predicho: Fraude</th><th>Predicho: Legítima</th></tr></thead><tbody><tr><td><strong>Real: Fraude</strong></td><td>30</td><td>20</td></tr><tr><td><strong>Real: Legítima</strong></td><td>10</td><td>440</td></tr></tbody></table></div><ol type="a"><li>Identifica VP, FN, FP y VN y calcula la exactitud y la tasa de error.</li><li>Calcula la sensibilidad y la especificidad.</li><li>Calcula la precisión y el valor predictivo negativo.</li><li>¿Qué error es más costoso en este problema y qué métrica mirarías?</li></ol>`,
    partes: [
      { titulo: "a) Celdas, exactitud y tasa de error", puntos: 1.5, solucion: String.raw`<p>$VP=30$ (reales «Fraude» bien clasificados), $FN=20$ («Fraude» clasificados como «Legítima»), $FP=10$ («Legítima» clasificados como «Fraude»), $VN=440$.</p><p>Exactitud $=\dfrac{VP+VN}{n}=\dfrac{30+440}{500}=94\,\%$; tasa de error $=6\,\%$.</p>` },
      { titulo: "b) Sensibilidad y especificidad", puntos: 2, solucion: String.raw`<p>Sensibilidad $=\dfrac{VP}{VP+FN}=\dfrac{30}{50}=60\,\%$: de los realmente «Fraude», cuántos detecta.</p><p>Especificidad $=\dfrac{VN}{VN+FP}=\dfrac{440}{450}=97{,}78\,\%$: de los realmente «Legítima», cuántos reconoce.</p><p>Ambas se calculan por <strong>fila</strong> (sobre los reales).</p>` },
      { titulo: "c) Precisión y valor predictivo negativo", puntos: 1.5, solucion: String.raw`<p>Precisión $=\dfrac{VP}{VP+FP}=\dfrac{30}{40}=75\,\%$: de los predichos «Fraude», cuántos lo son.</p><p>VPN $=\dfrac{VN}{VN+FN}=\dfrac{440}{460}=95{,}65\,\%$.</p><p>Ambas se calculan por <strong>columna</strong> (sobre los predichos).</p>` },
      { titulo: "d) Error más costoso y métrica relevante", puntos: 1, solucion: String.raw`<p>La exactitud ($94\,\%$) es alta solo porque casi todas las transacciones son legítimas (datos desbalanceados). El error más costoso es el falso negativo (un fraude que pasa): hay que mirar la <strong>sensibilidad</strong>, que es de apenas $60\,\%$.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "exactitud (%)", js: "100*(30+440)/500", esperado: 94, tol: 0.0050000010000000004 },
      { que: "sensibilidad (%)", js: "100*30/(30+20)", esperado: 60, tol: 0.0050000010000000004 },
      { que: "especificidad (%)", js: "100*440/(440+10)", esperado: 97.78, tol: 0.0050000010000000004 },
      { que: "precisión (%)", js: "100*30/(30+10)", esperado: 75, tol: 0.0050000010000000004 },
      { que: "VPN (%)", js: "100*440/(440+20)", esperado: 95.65, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C6.2", loc: "slides 16–17" },
      { id: "AY6-E", loc: "P3(b)" }
    ]
  },
  {
    id: "m16-d010",
    modulo: "m16-qda-nb-validacion",
    concepto: "m16-c05",
    dificultad: 1,
    origen: "variacion",
    base: [
      { id: "C6.2", loc: "slides 16–17" },
      { id: "AY6-E", loc: "P3(b)" }
    ],
    titulo: "Matriz de confusión: diagnóstico médico",
    enunciado: `<p>Un test clasifica pacientes como enfermos o sanos. La clase positiva es «Enfermo». Matriz de confusión sobre los datos de prueba:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Predicho: Enfermo</th><th>Predicho: Sano</th></tr></thead><tbody><tr><td><strong>Real: Enfermo</strong></td><td>45</td><td>5</td></tr><tr><td><strong>Real: Sano</strong></td><td>30</td><td>120</td></tr></tbody></table></div><ol type="a"><li>Identifica VP, FN, FP y VN y calcula la exactitud y la tasa de error.</li><li>Calcula la sensibilidad y la especificidad.</li><li>Calcula la precisión y el valor predictivo negativo.</li><li>¿Qué error es más costoso en este problema y qué métrica mirarías?</li></ol>`,
    partes: [
      { titulo: "a) Celdas, exactitud y tasa de error", puntos: 1.5, solucion: String.raw`<p>$VP=45$ (reales «Enfermo» bien clasificados), $FN=5$ («Enfermo» clasificados como «Sano»), $FP=30$ («Sano» clasificados como «Enfermo»), $VN=120$.</p><p>Exactitud $=\dfrac{VP+VN}{n}=\dfrac{45+120}{200}=82{,}5\,\%$; tasa de error $=17{,}5\,\%$.</p>` },
      { titulo: "b) Sensibilidad y especificidad", puntos: 2, solucion: String.raw`<p>Sensibilidad $=\dfrac{VP}{VP+FN}=\dfrac{45}{50}=90\,\%$: de los realmente «Enfermo», cuántos detecta.</p><p>Especificidad $=\dfrac{VN}{VN+FP}=\dfrac{120}{150}=80\,\%$: de los realmente «Sano», cuántos reconoce.</p><p>Ambas se calculan por <strong>fila</strong> (sobre los reales).</p>` },
      { titulo: "c) Precisión y valor predictivo negativo", puntos: 1.5, solucion: String.raw`<p>Precisión $=\dfrac{VP}{VP+FP}=\dfrac{45}{75}=60\,\%$: de los predichos «Enfermo», cuántos lo son.</p><p>VPN $=\dfrac{VN}{VN+FN}=\dfrac{120}{125}=96\,\%$.</p><p>Ambas se calculan por <strong>columna</strong> (sobre los predichos).</p>` },
      { titulo: "d) Error más costoso y métrica relevante", puntos: 1, solucion: String.raw`<p>El error más grave es el falso negativo (un enfermo que se va sin tratamiento): importa la <strong>sensibilidad</strong> ($90\,\%$, alta). El costo es una precisión baja ($60\,\%$): muchos sanos reciben una alarma falsa y necesitan un examen confirmatorio.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "exactitud (%)", js: "100*(45+120)/200", esperado: 82.5, tol: 0.0050000010000000004 },
      { que: "sensibilidad (%)", js: "100*45/(45+5)", esperado: 90, tol: 0.0050000010000000004 },
      { que: "especificidad (%)", js: "100*120/(120+30)", esperado: 80, tol: 0.0050000010000000004 },
      { que: "precisión (%)", js: "100*45/(45+30)", esperado: 60, tol: 0.0050000010000000004 },
      { que: "VPN (%)", js: "100*120/(120+5)", esperado: 96, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C6.2", loc: "slides 16–17" },
      { id: "AY6-E", loc: "P3(b)" }
    ]
  },
  {
    id: "m16-d011",
    modulo: "m16-qda-nb-validacion",
    concepto: "m16-c05",
    dificultad: 1,
    origen: "variacion",
    base: [
      { id: "C6.2", loc: "slides 16–17" },
      { id: "AY6-E", loc: "P3(b)" }
    ],
    titulo: "Matriz de confusión: aprobación de créditos",
    enunciado: `<p>Un modelo predice si un cliente será «Cumplidor». La clase positiva es «Cumplidor». Matriz de confusión sobre los datos de prueba:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Predicho: Cumplidor</th><th>Predicho: Fallido</th></tr></thead><tbody><tr><td><strong>Real: Cumplidor</strong></td><td>70</td><td>10</td></tr><tr><td><strong>Real: Fallido</strong></td><td>12</td><td>8</td></tr></tbody></table></div><ol type="a"><li>Identifica VP, FN, FP y VN y calcula la exactitud y la tasa de error.</li><li>Calcula la sensibilidad y la especificidad.</li><li>Calcula la precisión y el valor predictivo negativo.</li><li>¿Qué error es más costoso en este problema y qué métrica mirarías?</li></ol>`,
    partes: [
      { titulo: "a) Celdas, exactitud y tasa de error", puntos: 1.5, solucion: String.raw`<p>$VP=70$ (reales «Cumplidor» bien clasificados), $FN=10$ («Cumplidor» clasificados como «Fallido»), $FP=12$ («Fallido» clasificados como «Cumplidor»), $VN=8$.</p><p>Exactitud $=\dfrac{VP+VN}{n}=\dfrac{70+8}{100}=78\,\%$; tasa de error $=22\,\%$.</p>` },
      { titulo: "b) Sensibilidad y especificidad", puntos: 2, solucion: String.raw`<p>Sensibilidad $=\dfrac{VP}{VP+FN}=\dfrac{70}{80}=87{,}5\,\%$: de los realmente «Cumplidor», cuántos detecta.</p><p>Especificidad $=\dfrac{VN}{VN+FP}=\dfrac{8}{20}=40\,\%$: de los realmente «Fallido», cuántos reconoce.</p><p>Ambas se calculan por <strong>fila</strong> (sobre los reales).</p>` },
      { titulo: "c) Precisión y valor predictivo negativo", puntos: 1.5, solucion: String.raw`<p>Precisión $=\dfrac{VP}{VP+FP}=\dfrac{70}{82}=85{,}37\,\%$: de los predichos «Cumplidor», cuántos lo son.</p><p>VPN $=\dfrac{VN}{VN+FN}=\dfrac{8}{18}=44{,}44\,\%$.</p><p>Ambas se calculan por <strong>columna</strong> (sobre los predichos).</p>` },
      { titulo: "d) Error más costoso y métrica relevante", puntos: 1, solucion: String.raw`<p>Para el banco el error más costoso es el falso positivo (prestar a un cliente que no paga): hay que mirar la <strong>especificidad</strong>, que es de solo $40\,\%$: el modelo detecta mal a los fallidos, aunque la exactitud sea $78\,\%$.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "exactitud (%)", js: "100*(70+8)/100", esperado: 78, tol: 0.0050000010000000004 },
      { que: "sensibilidad (%)", js: "100*70/(70+10)", esperado: 87.5, tol: 0.0050000010000000004 },
      { que: "especificidad (%)", js: "100*8/(8+12)", esperado: 40, tol: 0.0050000010000000004 },
      { que: "precisión (%)", js: "100*70/(70+12)", esperado: 85.37, tol: 0.0050000010000000004 },
      { que: "VPN (%)", js: "100*8/(8+10)", esperado: 44.44, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C6.2", loc: "slides 16–17" },
      { id: "AY6-E", loc: "P3(b)" }
    ]
  },
  {
    id: "m16-d012",
    modulo: "m16-qda-nb-validacion",
    concepto: "m16-c05",
    dificultad: 1,
    origen: "variacion",
    base: [
      { id: "C6.2", loc: "slides 16–17" },
      { id: "AY6-E", loc: "P3(b)" }
    ],
    titulo: "Matriz de confusión: control de calidad",
    enunciado: `<p>Un sistema de visión rechaza piezas defectuosas. La clase positiva es «Defectuosa». Matriz de confusión sobre los datos de prueba:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th></th><th>Predicho: Defectuosa</th><th>Predicho: Buena</th></tr></thead><tbody><tr><td><strong>Real: Defectuosa</strong></td><td>18</td><td>2</td></tr><tr><td><strong>Real: Buena</strong></td><td>15</td><td>165</td></tr></tbody></table></div><ol type="a"><li>Identifica VP, FN, FP y VN y calcula la exactitud y la tasa de error.</li><li>Calcula la sensibilidad y la especificidad.</li><li>Calcula la precisión y el valor predictivo negativo.</li><li>¿Qué error es más costoso en este problema y qué métrica mirarías?</li></ol>`,
    partes: [
      { titulo: "a) Celdas, exactitud y tasa de error", puntos: 1.5, solucion: String.raw`<p>$VP=18$ (reales «Defectuosa» bien clasificados), $FN=2$ («Defectuosa» clasificados como «Buena»), $FP=15$ («Buena» clasificados como «Defectuosa»), $VN=165$.</p><p>Exactitud $=\dfrac{VP+VN}{n}=\dfrac{18+165}{200}=91{,}5\,\%$; tasa de error $=8{,}5\,\%$.</p>` },
      { titulo: "b) Sensibilidad y especificidad", puntos: 2, solucion: String.raw`<p>Sensibilidad $=\dfrac{VP}{VP+FN}=\dfrac{18}{20}=90\,\%$: de los realmente «Defectuosa», cuántos detecta.</p><p>Especificidad $=\dfrac{VN}{VN+FP}=\dfrac{165}{180}=91{,}67\,\%$: de los realmente «Buena», cuántos reconoce.</p><p>Ambas se calculan por <strong>fila</strong> (sobre los reales).</p>` },
      { titulo: "c) Precisión y valor predictivo negativo", puntos: 1.5, solucion: String.raw`<p>Precisión $=\dfrac{VP}{VP+FP}=\dfrac{18}{33}=54{,}55\,\%$: de los predichos «Defectuosa», cuántos lo son.</p><p>VPN $=\dfrac{VN}{VN+FN}=\dfrac{165}{167}=98{,}8\,\%$.</p><p>Ambas se calculan por <strong>columna</strong> (sobre los predichos).</p>` },
      { titulo: "d) Error más costoso y métrica relevante", puntos: 1, solucion: String.raw`<p>Si lo más costoso es que una pieza defectuosa llegue al cliente (falso negativo), se mira la <strong>sensibilidad</strong> ($90\,\%$). La precisión es baja ($54{,}5\,\%$): casi la mitad de las piezas rechazadas eran buenas, lo que tiene un costo de reproceso.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "exactitud (%)", js: "100*(18+165)/200", esperado: 91.5, tol: 0.0050000010000000004 },
      { que: "sensibilidad (%)", js: "100*18/(18+2)", esperado: 90, tol: 0.0050000010000000004 },
      { que: "especificidad (%)", js: "100*165/(165+15)", esperado: 91.67, tol: 0.0050000010000000004 },
      { que: "precisión (%)", js: "100*18/(18+15)", esperado: 54.55, tol: 0.0050000010000000004 },
      { que: "VPN (%)", js: "100*165/(165+2)", esperado: 98.8, tol: 0.0050000010000000004 }
    ],
    fuente: [
      { id: "C6.2", loc: "slides 16–17" },
      { id: "AY6-E", loc: "P3(b)" }
    ]
  },
  {
    id: "m16-d013",
    modulo: "m16-qda-nb-validacion",
    concepto: "m16-c01",
    dificultad: 2,
    origen: "nueva",
    titulo: "¿LDA o QDA? Box's M y validación",
    enunciado: String.raw`<p>Se quiere clasificar clientes en $K=3$ segmentos usando $p=4$ variables numéricas, con $n=150$ clientes ($50$ por segmento). El test de Box's M entrega un p-valor de $0{,}012$.</p><ol type="a"><li>Plantea las hipótesis de Box's M y calcula sus grados de libertad.</li><li>¿Qué método corresponde, LDA o QDA? ¿Cambiaría tu recomendación con $n=30$?</li><li>Se valida con 5-fold. ¿Cuántos clientes hay en cada conjunto de entrenamiento y de prueba? ¿Y con leave-one-out?</li><li>El error de entrenamiento es $4\,\%$ y el de validación $18\,\%$. ¿Qué indica?</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y grados de libertad de Box's M", puntos: 1.5, solucion: String.raw`<p>$H_0:\Sigma_1=\Sigma_2=\Sigma_3$ (covarianzas iguales) contra $H_1$: al menos una difiere.</p><p>gl $=\dfrac{p(p+1)(K-1)}{2}=\dfrac{4\cdot5\cdot2}{2}=20$.</p>` },
      { titulo: "b) Elección entre LDA y QDA", puntos: 1.5, solucion: String.raw`<p>p-valor $=0{,}012\le0{,}05$ ⇒ se rechaza la igualdad de covarianzas ⇒ corresponde <strong>QDA</strong> (una matriz de covarianza por grupo).</p><p>Con $n=30$ ($10$ por grupo) conviene <strong>LDA</strong> igualmente: QDA estima muchos más parámetros y necesita muchos datos; con muestras pequeñas sobreajusta.</p>` },
      { titulo: "c) Tamaños en 5-fold y leave-one-out", puntos: 1.5, solucion: "<p>5-fold: $150/5=30$ clientes por pliegue. En cada una de las 5 rondas se entrena con $120$ y se prueba con $30$; el error es el promedio de las 5.</p><p>Leave-one-out: $150$ rondas; en cada una se entrena con $149$ y se prueba con $1$.</p>" },
      { titulo: "d) Diagnóstico con los dos errores", puntos: 1.5, solucion: "<p>Un error de entrenamiento muy bajo junto a un error de validación mucho mayor indica <strong>sobreajuste</strong>: el modelo aprendió particularidades de la muestra de entrenamiento y no generaliza. El error que se informa es el de validación; convendría un modelo más simple (LDA o Naive Bayes) o más datos.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "gl Box's M", js: "4*5*2/2", esperado: 20, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C6.2", loc: "slides 3–5 y 18–20" }
    ]
  }
]);
