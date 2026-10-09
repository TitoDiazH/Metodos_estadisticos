/* ============================================================================
   M18 · ANOVA de un factor, comparaciones múltiples y supuestos (P2)
   Fuentes abiertas para redactar: C7.1 págs. 23–54 · C7.2 slides 2–24 · S7.2 líneas 11–27.
   Las fórmulas y tablas de varias slides son imagen; los datos del ejemplo de 3 métodos
   se leyeron de la imagen de C7.1 pág. 45 y sus resultados se recalculan en R.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m18-anova-un-factor",
  orden: 18,
  titulo: "ANOVA de un factor, comparaciones múltiples y supuestos",
  descripcion: "Comparar las medias de más de dos grupos con un solo test (F), saber cuáles difieren (LSD y Tukey), comprobar los supuestos con los residuos y decidir cuántas observaciones usar.",
  pruebas: ["P2"],
  prioridad: "alta",
  fuentes: [{ id: "C7.1", loc: "páginas 23–54" }, { id: "C7.2", loc: "slides 2–24" }, { id: "S7.2", loc: "líneas 11–27" }],

  conceptos: [
    {
      id: "m18-c01",
      titulo: "Diseño completamente al azar y el modelo",
      cubre: ["M18.1", "M18.2"],
      simple: String.raw`<p>Cuando se comparan <strong>más de dos</strong> tratamientos (máquinas, proveedores, dosis…), se quiere saber si todas las medias son iguales o si al menos dos difieren. El ANOVA lo prueba con un único estadístico. En el <strong>diseño completamente al azar (DCA)</strong> todas las corridas se hacen en orden aleatorio.</p>`,
      formal: String.raw`<p>$H_0:\mu_1=\mu_2=\dots=\mu_k$ frente a $H_1:$ al menos dos medias distintas.</p>
$$y_{ij}=\mu+\tau_i+\varepsilon_{ij},\qquad \varepsilon_{ij}\sim N(0,\sigma^2),\quad \tau_i=\mu_i-\mu$$
<ul>
  <li>Aleatorizar reparte los efectos ambientales y temporales entre los tratamientos.</li>
  <li>El DCA supone que, además del factor estudiado, <strong>ningún otro factor</strong> influye significativamente en la respuesta: solo actúan dos fuentes de variabilidad, los tratamientos y el error aleatorio.</li>
  <li><strong>Efectos fijos:</strong> se estudian todos los tratamientos posibles. <strong>Aleatorios:</strong> los tratamientos son una muestra de una población de tratamientos. <strong>Mixtos:</strong> hay factores fijos y aleatorios.</li>
</ul>`,
      errores: ["Usar varias pruebas t en vez de ANOVA cuando hay más de dos grupos.", "Olvidar que el DCA exige que no haya otro factor influyente (si lo hay, hay que bloquear)."],
      memoriza: String.raw`<p>$H_0:\mu_1=\dots=\mu_k$ · $y_{ij}=\mu+\tau_i+\varepsilon_{ij}$, $\varepsilon\sim N(0,\sigma^2)$ · DCA = todo aleatorio, solo tratamiento y error.</p>`,
      comprueba: {
        enunciado: "¿Qué hipótesis alternativa se plantea en el ANOVA de un factor?",
        opciones: ["Al menos dos medias son distintas", "Todas las medias son distintas entre sí", "Todas las varianzas son distintas", "La media del primer grupo es mayor"],
        correcta: 0,
        explicacion: "H1 solo dice que no todas las medias son iguales."
      },
      fuente: [{ id: "C7.1", loc: "páginas 25–34" }]
    },

    {
      id: "m18-c02",
      titulo: "Descomposición de la variabilidad y tabla ANOVA",
      cubre: ["M18.3"],
      simple: String.raw`<p>El ANOVA separa la variación total en la que se debe a los tratamientos (<strong>entre</strong> grupos) y la que se debe al error (<strong>dentro</strong> de los grupos). Si la primera predomina claramente sobre la segunda, las medias son distintas.</p>`,
      formal: String.raw`$$SC_T=SC_{TRAT}+SC_E$$
<table class="tabla"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th></tr></thead><tbody>
<tr><td>Tratamientos</td><td>$SC_{TRAT}$</td><td>$k-1$</td><td>$CM_{TRAT}=SC_{TRAT}/(k-1)$</td><td>$CM_{TRAT}/CM_E$</td></tr>
<tr><td>Error</td><td>$SC_E$</td><td>$N-k$</td><td>$CM_E=SC_E/(N-k)$</td><td></td></tr>
<tr><td>Total</td><td>$SC_T$</td><td>$N-1$</td><td></td><td></td></tr></tbody></table>
<p>$F_0\sim F_{(k-1,\ N-k)}$ bajo $H_0$. <strong>Se rechaza $H_0$ si $F_0>F_\alpha$ o si p-valor $<\alpha$.</strong> Las sumas de cuadrados divididas por sus grados de libertad son los cuadrados medios.</p>`,
      errores: ["Confundir los grados de libertad del error ($N-k$) con los del total ($N-1$).", "Dividir mal: $F_0=CM_{TRAT}/CM_E$ (no al revés)."],
      memoriza: String.raw`<p>$SC_T=SC_{TRAT}+SC_E$ · gl: $k-1,\ N-k,\ N-1$ · $F_0=CM_{TRAT}/CM_E\sim F(k-1,N-k)$ · rechazar si $F_0>F_\alpha$ o $p<\alpha$.</p>`,
      comprueba: {
        enunciado: "Con k = 4 tratamientos y N = 16 observaciones, ¿cuáles son los grados de libertad del error?",
        opciones: ["12", "3", "15", "4"],
        correcta: 0,
        explicacion: "N − k = 16 − 4 = 12."
      },
      verifica: [{ que: "gl error", js: "16-4", esperado: 12, tol: 1e-9 }],
      fuente: [{ id: "C7.1", loc: "páginas 36–41" }, { id: "C7.2", loc: "slides 2–6" }]
    },

    {
      id: "m18-c03",
      titulo: "Ejemplo a mano: 3 métodos de enseñanza",
      figura: { tipo: "anova", donde: "ejemplo", ejeY: "nota",
        grupos: [{ n: "Lecture", y: [80, 85, 78, 83] }, { n: "Workshop", y: [55, 34, 43, 54] }, { n: "Online", y: [70, 65, 74, 77] }],
        pie: "Las 12 notas del ejemplo. Cambia la vista para ver qué distancias se elevan al cuadrado en cada suma de cuadrados." },
      cubre: ["M18.4"],
      simple: String.raw`<p>Un ANOVA completo con $12$ notas: cuatro alumnos en cada método (Conferencia, Taller, En línea).</p>`,
      formal: String.raw`<p>Datos (C7.1 p. 45): Lecture $80,85,78,83$ · Workshop $55,34,43,54$ · Online $70,65,74,77$. $k=3$, $N=12$.</p>`,
      ejemplo: String.raw`<ol>
  <li>Medias: $81{,}5;\ 46{,}5;\ 71{,}5$. Media general $\bar y=66{,}5$.</li>
  <li>$SC_T=\sum(y_{ij}-66{,}5)^2=929+1897+181=3007$.</li>
  <li>$SC_{TRAT}=4\,[(81{,}5-66{,}5)^2+(46{,}5-66{,}5)^2+(71{,}5-66{,}5)^2]=4(225+400+25)=2600$.</li>
  <li>$SC_E=3007-2600=407$.</li>
  <li>gl: $2$ (trat), $9$ (error), $11$ (total). $CM_{TRAT}=1300$, $CM_E=45{,}2$.</li>
  <li>$F_0=1300/45{,}2=28{,}75$ (p-valor $=0{,}000123$) ⇒ se rechaza $H_0$: el método de enseñanza influye en el rendimiento.</li>
</ol>`,
      r: {
        nota: "Verificación en R del ejemplo a mano (los datos están en una imagen de C7.1).",
        codigo: `x <- c(80, 85, 78, 83,  55, 34, 43, 54,  70, 65, 74, 77)
g <- factor(rep(c("Lecture", "Workshop", "Online"), each = 4))
summary(aov(x ~ g))`,
        rlab: "r-m18-anova"
      },
      errores: ["Olvidar multiplicar por $n$ (observaciones por grupo) en $SC_{TRAT}$."],
      memoriza: String.raw`<p>Ejemplo 3 métodos: $SC_T=3007$, $SC_{TRAT}=2600$, $SC_E=407$, $F=28{,}75$ con $(2,9)$ gl.</p>`,
      comprueba: {
        enunciado: "SC_T = 3007 y SC_TRAT = 2600. ¿Cuánto es SC_E?",
        opciones: ["407", "5607", "1300", "45,2"],
        correcta: 0,
        explicacion: "SC_E = SC_T − SC_TRAT = 3007 − 2600 = 407."
      },
      verifica: [
        { que: "SC_TRAT", js: "4*((81.5-66.5)**2+(46.5-66.5)**2+(71.5-66.5)**2)", esperado: 2600, tol: 1e-9 },
        { que: "F0", js: "(2600/2)/(407/9)", esperado: 28.75, tol: 0.005 }
      ],
      fuente: [{ id: "C7.1", loc: "páginas 43–51" }]
    },

    {
      id: "m18-c04",
      titulo: "Ejemplo con 4 métodos de ensamble y aov() en R",
      cubre: ["M18.5"],
      simple: String.raw`<p>Cuatro métodos de ensamble (A, B, C, D), cuatro tiempos por método, $16$ pruebas en orden aleatorio. ¿Hay diferencias en el tiempo promedio?</p>`,
      formal: String.raw`<p>En R: <code>aov(tiempo ~ metodo, data = datos)</code> y <code>summary(modelo)</code> (también en Excel: Análisis de varianza de un factor).</p>`,
      ejemplo: String.raw`<p>C7.2 s7: medias $A=7{,}25$; $B=8{,}5$; $C=12{,}75$; $D=10{,}5$. $SC_{TRAT}=69{,}5$ (3 gl), $SC_E=29{,}5$ (12 gl), $SC_T=99$ (15 gl). $CM_{TRAT}=23{,}17$, $CM_E=2{,}458$ ⇒ $F=9{,}42$, p-valor $=0{,}00177$, valor crítico $F_{0{,}05;3,12}=3{,}49$. Se rechaza $H_0$: hay efecto del método sobre el tiempo promedio.</p>`,
      r: {
        nota: "Código de C7.2 slide 9 / S7.2 líneas 14–27.",
        codigo: `A <- c(6, 8, 7, 8); B <- c(7, 9, 10, 8); C <- c(11, 16, 11, 13); D <- c(10, 12, 11, 9)
tiempo <- c(A, B, C, D)
metodo <- factor(c(rep("A", 4), rep("B", 4), rep("C", 4), rep("D", 4)))
datos <- data.frame(metodo, tiempo)
modelo <- aov(tiempo ~ metodo, data = datos)
summary(modelo)`,
        rlab: "r-m18-anova"
      },
      lectura: String.raw`<ul><li><code>Df</code>: $3$ (método) y $12$ (residuales).</li><li><code>Sum Sq</code>: $69{,}5$ y $29{,}5$; <code>Mean Sq</code>: $23{,}167$ y $2{,}458$.</li><li><code>F value 9.424</code> y <code>Pr(&gt;F) 0.00177</code> $<0{,}05$ ⇒ se rechaza $H_0$.</li><li>El ANOVA solo dice que <em>alguna</em> media difiere; no dice cuáles (ver LSD y Tukey).</li></ul>`,
      errores: ["Concluir qué pares difieren solo con el F global."],
      memoriza: String.raw`<p>4 métodos: $SC=69{,}5;\ 29{,}5;\ 99$ · $F=9{,}42$ · $p=0{,}00177$ · rechazo.</p>`,
      comprueba: {
        enunciado: "En summary(aov(...)) aparece Pr(>F) = 0.00177 con α = 0,05. ¿Qué se concluye?",
        opciones: ["Hay diferencias entre las medias de al menos dos métodos", "Todas las medias son iguales", "Las varianzas son distintas", "Falta un factor"],
        correcta: 0,
        explicacion: "p < α ⇒ se rechaza H0 de igualdad de medias."
      },
      verifica: [
        { que: "F de 4 métodos", js: "(69.5/3)/(29.5/12)", esperado: 9.4237, tol: 0.001 },
        { que: "p-valor", r: `cat(signif(1 - pf(9.423729, 3, 12), 3))`, esperado: 0.00177, tol: 0.000005 }
      ],
      fuente: [{ id: "C7.2", loc: "slides 4–9" }, { id: "S7.2", loc: "líneas 14–27" }]
    },

    {
      id: "m18-c05",
      titulo: "Supuestos del ANOVA y verificación con residuos",
      figura: { tipo: "residuos",
        pie: "Esquema con datos simulados: qué patrón se espera si los supuestos se cumplen y qué patrones delatan un problema." },
      cubre: ["M18.6", "M18.7"],
      simple: String.raw`<p>La validez del ANOVA depende de tres supuestos. Como se violan a menudo, se comprueban con los <strong>residuos</strong> (lo que queda del dato tras restar la media de su tratamiento).</p>`,
      formal: String.raw`<table class="tabla"><thead><tr><th>Supuesto</th><th>Cómo se revisa</th></tr></thead><tbody>
<tr><td>Normalidad</td><td>Gráfico de normalidad de los residuos (Q-Q); Shapiro-Wilk</td></tr>
<tr><td>Varianza constante (homogeneidad)</td><td>Residuos vs. valores predichos (medias de tratamiento); prueba de Levene</td></tr>
<tr><td>Independencia</td><td>Residuos vs. el orden de las corridas</td></tr></tbody></table>
<p>Modelo ajustado: la predicción de cada observación es la media de su tratamiento, $\hat y_{ij}=\bar y_{i\cdot}$, y el residuo es $e_{ij}=y_{ij}-\bar y_{i\cdot}$. Si los supuestos se cumplen, los residuos se ven como una muestra aleatoria normal con media $0$ y varianza constante. Las pruebas gráficas no son exactas, pero suelen dar evidencia suficiente. <strong>Prevenir:</strong> repetición, aleatorización y bloqueo; p. ej., no aleatorizar el orden puede romper la independencia.</p>`,
      ejemplo: String.raw`<p>Con los 4 métodos de ensamble: Levene $p=0{,}4485$ (no se rechaza homogeneidad) y Shapiro-Wilk de los residuos $p=0{,}281$ (no se rechaza normalidad).</p>`,
      r: {
        nota: "Los residuos de aov() y las pruebas de Levene (paquete car) y Shapiro-Wilk. La clase pide gráficos; aquí se usan las pruebas analíticas equivalentes.",
        codigo: `r <- resid(modelo)
shapiro.test(r)$p.value
car::leveneTest(tiempo ~ metodo, data = datos)`,
        rlab: "r-m18-anova"
      },
      errores: ["Revisar la normalidad de los datos crudos en vez de la de los residuos (en ANOVA se usan los residuos).", "Verificar los supuestos antes de interpretar el ANOVA, no después."],
      memoriza: String.raw`<p>Normalidad (Q-Q residuos) · varianza constante (residuos vs. predichos; Levene) · independencia (residuos vs. orden). Residuo $=y_{ij}-\bar y_{i\cdot}$.</p>`,
      comprueba: {
        enunciado: "¿Con qué gráfico se verifica la varianza constante entre tratamientos?",
        opciones: ["Residuos vs. valores predichos", "Histograma de la respuesta cruda", "Residuos vs. orden de corridas", "Gráfico de cajas de un solo tratamiento"],
        correcta: 0,
        explicacion: "La homogeneidad se ve en residuos vs. predichos; la independencia, en residuos vs. orden."
      },
      fuente: [{ id: "C7.1", loc: "páginas 44 y 54" }, { id: "C7.2", loc: "slides 22–24" }]
    },

    {
      id: "m18-c06",
      titulo: "Comparaciones múltiples: LSD de Fisher y Tukey",
      cubre: ["M18.8"],
      simple: String.raw`<p>Si el ANOVA rechaza $H_0$, falta saber <strong>qué pares</strong> de medias difieren. Hay que comparar los $k(k-1)/2$ pares. LSD es muy sensible; Tukey es más conservador.</p>`,
      formal: String.raw`<ul>
  <li><strong>Pares:</strong> $k(k-1)/2$ (con $k=4$: $6$).</li>
  <li><strong>LSD de Fisher:</strong> usa la $t$ de Student; difiere un par si $|\bar y_i-\bar y_j|>\text{LSD}=t_{\alpha/2,\,N-k}\sqrt{\dfrac{2\,CM_E}{n}}$. Fácil de calcular; muy sensible a pequeñas variaciones; <strong>confianza individual</strong> y no grupal.</li>
  <li><strong>Tukey (HSD):</strong> distribución del rango estudentizado; <strong>confianza grupal</strong> (tasa de error por experimento); evidencia más fuerte. Es <em>menos potente</em> que LSD: el riesgo de detectar una diferencia que no existe es menor. Cuando la diferencia es clara, ambos coinciden. En R: <code>TukeyHSD(modelo)</code>.</li>
  <li>Hay otros métodos (Duncan, Scheffé, contrastes); en la clase se ven solo estos dos.</li>
</ul>
<p>Gráficos: si los diagramas de cajas no se traslapan, probablemente los tratamientos difieren; en el gráfico de medias con IC de LSD, intervalos que no se traslapan indican medias distintas.</p>`,
      ejemplo: String.raw`<p>4 métodos de ensamble ($n=4$, $CM_E=2{,}458$, $t_{0{,}025;12}=2{,}179$): $\text{LSD}=2{,}179\sqrt{2\cdot2{,}458/4}=2{,}42$ (la slide 16: «se declaran significativas las diferencias mayores a 2,42»).</p>
<p>Con LSD, los pares significativos son los de diferencia $>2{,}42$: $C-A=5{,}5$; $C-B=4{,}25$; $D-A=3{,}25$ y $D-C=2{,}25$ no (menor que $2{,}42$). Con <strong>Tukey</strong> ($\alpha=5\,\%$) solo son significativos <strong>C–A</strong> ($p=0{,}0016$) y <strong>C–B</strong> ($p=0{,}011$); D–A ($p=0{,}053$) deja de serlo: menos potencia que LSD.</p>`,
      r: {
        nota: "TukeyHSD de C7.2 slide 19 y LSD calculado a mano.",
        codigo: `TukeyHSD(modelo)
cme <- sum(resid(modelo)^2) / 12
qt(0.975, 12) * sqrt(2 * cme / 4)`,
        rlab: "r-m18-anova"
      },
      errores: ["Usar LSD sin ANOVA significativo previo.", "Creer que LSD y Tukey siempre coinciden: Tukey es más conservador (D–A)."],
      memoriza: String.raw`<p>LSD $=t_{\alpha/2,N-k}\sqrt{2CM_E/n}$: individual, potente, sensible. Tukey: grupal, conservador, menos potente. $k(k-1)/2$ pares.</p>`,
      comprueba: {
        enunciado: "¿Cuál afirmación sobre Tukey vs. LSD es correcta?",
        opciones: ["Tukey es menos potente y controla el error por experimento", "Tukey detecta más diferencias que LSD", "LSD tiene confianza grupal", "No se pueden usar tras un ANOVA significativo"],
        correcta: 0,
        explicacion: "Tukey trabaja con confianza grupal; es más conservador (menos potente) que LSD."
      },
      verifica: [
        { que: "LSD de 4 métodos", r: `cat(round(qt(0.975, 12) * sqrt(2 * (29.5/12) / 4), 2))`, esperado: 2.42, tol: 0.005 },
        { que: "pares con k=4", js: "4*3/2", esperado: 6, tol: 1e-9 }
      ],
      fuente: [{ id: "C7.2", loc: "slides 10–19" }]
    },

    {
      id: "m18-c07",
      titulo: "Tamaño de muestra por tratamiento",
      cubre: ["M18.9"],
      simple: String.raw`<p>¿Cuántas observaciones por tratamiento? Depende de la variabilidad esperada y de la diferencia mínima que se quiere detectar. Si las pruebas son caras, se puede reducir $n$, pero solo se detectarán diferencias grandes.</p>`,
      formal: String.raw`<p>Número de tratamientos $k$: lo fija el investigador. Observaciones por tratamiento $n$:</p>
$$n=\frac{2\,t^2\,\sigma^2}{d_T^2}$$
<p>con $d_T$ la diferencia mínima importante y $t$ el valor de la $t$ de Student (que depende de $n$: se itera). Recomendación general: <strong>entre 5 y 30</strong> mediciones por tratamiento (≈10 con datos consistentes; ≈30 con mucha dispersión).</p>`,
      ejemplo: String.raw`<p>C7.2 s21: $\sigma=1{,}5$ y $d_T=2$ ⇒ $n\approx5{,}1$ ⇒ <strong>$n=5$</strong>. Comprobación con $t_{0{,}975}$ de $4(n-1)=16$ gl: $n=2\cdot2{,}12^2\cdot1{,}5^2/2^2=5{,}06\approx5$.</p>`,
      errores: ["Redondear hacia abajo sin iterar el valor de $t$ (depende de $n$)."],
      memoriza: String.raw`<p>$n=2t^2\sigma^2/d_T^2$ · σ=1,5 y $d_T$=2 ⇒ $n\approx5$ · recomendación 5–30 por tratamiento.</p>`,
      comprueba: {
        enunciado: "¿Qué rango de mediciones por tratamiento se recomienda en general?",
        opciones: ["Entre 5 y 30", "Entre 1 y 3", "Más de 100", "Exactamente 12"],
        correcta: 0,
        explicacion: "C7.1: por lo general se recomiendan entre 5 y 30."
      },
      verifica: [{ que: "n con t de 16 gl", r: `cat(round(2 * qt(0.975, 16)^2 * 1.5^2 / 2^2, 2))`, esperado: 5.06, tol: 0.005 }],
      fuente: [{ id: "C7.1", loc: "página 31" }, { id: "C7.2", loc: "slides 20–21" }]
    }
  ],

  cuando: String.raw`<div class="tabla-scroll"><table class="tabla">
<thead><tr><th>Quiero…</th><th>Uso</th><th>En R</th></tr></thead>
<tbody>
<tr><td>¿Difieren las medias de $k>2$ grupos?</td><td>ANOVA de un factor</td><td><code>summary(aov(y ~ g, data))</code></td></tr>
<tr><td>¿Qué pares difieren?</td><td>LSD (potente) o Tukey (conservador)</td><td><code>TukeyHSD(modelo)</code></td></tr>
<tr><td>¿Se cumplen los supuestos?</td><td>Residuos: Q-Q, residuos vs. predichos/orden, Levene</td><td><code>resid(modelo)</code></td></tr>
</tbody></table></div>`,

  errores: [
    { texto: "El ANOVA no dice qué medias difieren: hace falta una comparación múltiple.", fuente: [{ id: "C7.2", loc: "slide 8" }] }
  ]
});
