/* ============================================================================
   M21 · Factorial 2^k (2³) y bloqueo en 2^k (P3)
   Fuentes abiertas para redactar: C7.4 slides 1–26 (s13 y s14 vistas como imagen) · S7.4.
   Todos los números se recalcularon en R 4.6.1.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m21-factorial-2k",
  orden: 22,
  titulo: "Factorial 2^k (2³) y bloqueo en 2^k",
  descripcion: "Factoriales con todos los factores a dos niveles: tabla de signos, contrastes, efectos, ANOVA con 1 gl por efecto, gráficas y bloques.",
  pruebas: ["P3"],
  prioridad: "alta",
  fuentes: [{ id: "C7.4", loc: "slides 1–26" }, { id: "S7.4" }],

  conceptos: [
    {
      id: "m21-c01",
      titulo: "El diseño 2³: 8 tratamientos y notación de Yates",
      cubre: ["M21.1"],
      simple: String.raw`<p>Tres factores, cada uno con nivel bajo ($-1$) y alto ($+1$): $2^3=8$ tratamientos, que son los vértices de un cubo.</p>`,
      formal: String.raw`<p>Notación de Yates: se escribe la letra minúscula de los factores que están en nivel alto; $(1)$ = todos bajos.</p>
<table class="tabla"><tr><th>A</th><th>B</th><th>C</th><th>Yates</th></tr>
<tr><td>−</td><td>−</td><td>−</td><td>(1)</td></tr><tr><td>+</td><td>−</td><td>−</td><td>a</td></tr>
<tr><td>−</td><td>+</td><td>−</td><td>b</td></tr><tr><td>+</td><td>+</td><td>−</td><td>ab</td></tr>
<tr><td>−</td><td>−</td><td>+</td><td>c</td></tr><tr><td>+</td><td>−</td><td>+</td><td>ac</td></tr>
<tr><td>−</td><td>+</td><td>+</td><td>bc</td></tr><tr><td>+</td><td>+</td><td>+</td><td>abc</td></tr></table>
<p>Cada eje del cubo es un factor; cada vértice, una combinación; el centro es $(0,0,0)$.</p>`,
      memoriza: String.raw`<p>$2^3=8$ tratamientos: (1), a, b, ab, c, ac, bc, abc.</p>`,
      comprueba: {
        enunciado: "En notación de Yates, ¿qué tratamiento es «ac»?",
        opciones: ["A alto, B bajo, C alto", "A bajo, B alto, C bajo", "Todos altos", "A alto y C bajo"],
        correcta: 0,
        explicacion: "Aparecen las letras de los factores en nivel alto."
      },
      fuente: [{ id: "C7.4", loc: "slide 4" }]
    },

    {
      id: "m21-c02",
      titulo: "Tabla de signos y contrastes",
      cubre: ["M21.2"],
      simple: String.raw`<p>Para cada efecto hay una columna de signos. El <strong>contraste</strong> es sumar los totales con signo $+$ y restar los de signo $-$. Las columnas de interacción se obtienen multiplicando los signos de los factores.</p>`,
      formal: String.raw`<table class="tabla"><tr><th>Total</th><th>A</th><th>B</th><th>C</th><th>AB</th><th>AC</th><th>BC</th><th>ABC</th></tr>
<tr><td>(1)</td><td>−</td><td>−</td><td>−</td><td>+</td><td>+</td><td>+</td><td>−</td></tr>
<tr><td>a</td><td>+</td><td>−</td><td>−</td><td>−</td><td>−</td><td>+</td><td>+</td></tr>
<tr><td>b</td><td>−</td><td>+</td><td>−</td><td>−</td><td>+</td><td>−</td><td>+</td></tr>
<tr><td>ab</td><td>+</td><td>+</td><td>−</td><td>+</td><td>−</td><td>−</td><td>−</td></tr>
<tr><td>c</td><td>−</td><td>−</td><td>+</td><td>+</td><td>−</td><td>−</td><td>+</td></tr>
<tr><td>ac</td><td>+</td><td>−</td><td>+</td><td>−</td><td>+</td><td>−</td><td>−</td></tr>
<tr><td>bc</td><td>−</td><td>+</td><td>+</td><td>−</td><td>−</td><td>+</td><td>−</td></tr>
<tr><td>abc</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td></tr></table>
<p>Ejemplos: Contraste A $=a+ab+ac+abc-(1)-b-c-bc$; Contraste B $=b+ab+bc+abc-(1)-a-c-ac$; Contraste AB $=ab-b-a+abc+(1)-bc-ac+c$.</p>
<p>Interacción doble: el efecto de un factor depende del nivel de otro. Interacción triple: las interacciones entre dos factores cambian según un tercer factor.</p>`,
      errores: ["Inventar los signos de una interacción: se obtienen multiplicando los signos de sus factores (AB = A × B)."],
      memoriza: String.raw`<p>Signo de AB = signo de A × signo de B. Contraste = suma de totales con su signo.</p>`,
      comprueba: {
        enunciado: "¿Qué signo tiene el tratamiento «a» en la columna AB?",
        opciones: ["−", "+", "0", "Depende de C"],
        correcta: 0,
        explicacion: "En «a», A = + y B = −; (+)(−) = −."
      },
      fuente: [{ id: "C7.4", loc: "slides 5 y 7" }]
    },

    {
      id: "m21-c03",
      titulo: "Efectos, sumas de cuadrados y ANOVA del 2^k",
      cubre: ["M21.3"],
      simple: String.raw`<p>Del contraste salen dos cosas: el <strong>efecto</strong> (dividiendo por $n\cdot2^{k-1}$) y su <strong>suma de cuadrados</strong> (elevando al cuadrado y dividiendo por $n\cdot2^k$). Cada efecto tiene 1 grado de libertad.</p>`,
      formal: String.raw`$$\text{Efecto } X=\frac{\text{Contraste } X}{n\,2^{k-1}}\qquad SC_X=\frac{(\text{Contraste } X)^2}{n\,2^{k}}$$
<p>Para $k=3$: Efecto $=$ Contraste$/(4n)$ y $SC=$ Contraste$^2/(8n)$. Para $k=2$: Efecto $=$ Contraste$/(2n)$ y $SC=$ Contraste$^2/(4n)$.</p>
<p>ANOVA de un $2^3$: 7 efectos (A, B, C, AB, AC, BC, ABC) con 1 gl cada uno; error con $2^3(n-1)$ gl; total $n\,2^3-1$. Cada efecto se prueba con $F_0=CM_{\text{efecto}}/CME$. $SC_E$ se obtiene por diferencia.</p>`,
      ejemplo: String.raw`<p>Ejercicio 2² de la Prueba 3 (viscosidad; $n=2$): totales $(1)=292$, $a=304$, $b=269$, $ab=301$.</p>
<ul><li>A $=[a+ab-(1)-b]/4=44/4=11{,}0$; $SC_A=44^2/8=242$.</li>
<li>B $=[b+ab-(1)-a]/4=-26/4=-6{,}5$; $SC_B=(-26)^2/8=84{,}5$.</li>
<li>AB $=[(1)+ab-a-b]/4=20/4=5{,}0$; $SC_{AB}=20^2/8=50$.</li></ul>`,
      errores: ["Confundir los divisores: efecto con $n2^{k-1}$, SC con $n2^k$.", "Dar a un efecto de un 2^k más de 1 gl."],
      memoriza: String.raw`<p>Efecto $=C/(n2^{k-1})$ · $SC=C^2/(n2^k)$ · 1 gl por efecto · gl error $2^k(n-1)$.</p>`,
      comprueba: {
        enunciado: "En un 2² con n = 2, el contraste de A vale 44. ¿Cuánto vale SC_A?",
        opciones: ["242", "11", "484", "121"],
        correcta: 0,
        explicacion: "SC = 44²/(2 · 4) = 1936/8 = 242."
      },
      verifica: [
        { que: "efecto A visc", js: "(304+301-292-269)/4", esperado: 11, tol: 1e-9 },
        { que: "efecto B visc", js: "(269+301-292-304)/4", esperado: -6.5, tol: 1e-9 },
        { que: "efecto AB visc", js: "(292+301-304-269)/4", esperado: 5, tol: 1e-9 },
        { que: "SC_A visc", js: "44*44/8", esperado: 242, tol: 1e-9 }
      ],
      fuente: [{ id: "C7.4", loc: "slides 7–8 y 25–26" }]
    },

    {
      id: "m21-c04",
      titulo: "Ejemplo 2³: resistencia de un material compuesto (aov en R)",
      cubre: ["M21.4"],
      simple: String.raw`<p>Temperatura (A), presión (B) y aditivo (C), cada uno bajo/alto, con 2 réplicas: 16 corridas. En R: <code>aov(Y ~ A * B * C)</code>, con los factores como <code>factor</code>.</p>`,
      formal: String.raw`<p>El operador <code>*</code> genera el modelo completo A + B + C + A:B + A:C + B:C + A:B:C. Si solo se quisieran los efectos principales: <code>A + B + C</code>.</p>`,
      ejemplo: String.raw`<table class="tabla"><tr><th>FV</th><th>SC</th><th>gl</th><th>$F_0$</th><th>p</th></tr>
<tr><td>A (temperatura)</td><td>2047,6</td><td>1</td><td>595,66</td><td>$8{,}48\cdot10^{-9}$</td></tr>
<tr><td>B (presión)</td><td>115,6</td><td>1</td><td>33,62</td><td>0,000406</td></tr>
<tr><td>C (aditivo)</td><td>3,1</td><td>1</td><td>0,89</td><td>0,373</td></tr>
<tr><td>A:B</td><td>14,1</td><td>1</td><td>4,09</td><td>0,078</td></tr>
<tr><td>A:C</td><td>410,1</td><td>1</td><td>119,29</td><td>$4{,}38\cdot10^{-6}$</td></tr>
<tr><td>B:C</td><td>1,6</td><td>1</td><td>0,46</td><td>0,519</td></tr>
<tr><td>A:B:C</td><td>0,6</td><td>1</td><td>0,16</td><td>0,696</td></tr>
<tr><td>Error</td><td>27,5</td><td>8</td><td></td><td></td></tr></table>
<p>A es el efecto mayor; B también es significativo; C no lo es por sí solo, pero la interacción A×C sí: el efecto de la temperatura depende del aditivo. El error tiene $2^3(2-1)=8$ gl.</p>`,
      r: {
        nota: "Código de S7.4 (líneas 12–30).",
        codigo: `datos <- data.frame(
  A = factor(c(-1,-1,-1,-1,-1,-1,-1,-1, 1, 1, 1, 1, 1, 1, 1, 1)),
  B = factor(c(-1,-1,-1,-1, 1, 1, 1, 1,-1,-1,-1,-1, 1, 1, 1, 1)),
  C = factor(c(-1,-1, 1, 1,-1,-1, 1, 1,-1,-1, 1, 1,-1,-1, 1, 1)),
  replica = rep(c(1, 2), 8),
  Y = c(60, 65, 52, 54, 54, 56, 45, 47, 72, 75, 83, 84, 68, 70, 80, 82))
modelo <- aov(Y ~ A * B * C, data = datos)
summary(modelo)`,
        rlab: "r-m21-resistencia"
      },
      memoriza: String.raw`<p>Resistencia: significativos A, B y A:C; error 27,5 con 8 gl ($CME=3{,}4$).</p>`,
      comprueba: {
        enunciado: "¿Qué genera la fórmula Y ~ A * B * C en R?",
        opciones: ["Los 3 efectos principales y todas sus interacciones (dobles y triple)", "Solo los efectos principales", "Solo la interacción triple", "El producto de las tres variables"],
        correcta: 0,
        explicacion: "C7.4 s10."
      },
      fuente: [{ id: "C7.4", loc: "slides 9–11" }, { id: "S7.4", loc: "líneas 12–30" }]
    },

    {
      id: "m21-c05",
      titulo: "Efectos estimados con model.tables y gráfica de efectos principales",
      cubre: ["M21.5"],
      simple: String.raw`<p><code>model.tables(modelo, type = "effects")</code> muestra, para cada nivel, cuánto se aleja su media de la media general. En un 2^k ese número es <strong>la mitad</strong> del efecto definido como $\bar Y_+-\bar Y_-$.</p>`,
      formal: String.raw`<p>Resistencia (C7.4 s12): A $\pm11{,}313$, B $\pm2{,}688$, C $\pm0{,}438$, A×B $\pm0{,}938$, A×C $\pm5{,}062$, B×C $\pm0{,}313$, A×B×C $\pm0{,}188$. Con la definición de s7, el efecto de A es $2\times11{,}3125=22{,}625$ (media con A alto $76{,}75$ menos media con A bajo $54{,}125$).</p>
<p>La <strong>gráfica de efectos principales</strong> (<code>plot.design</code>) muestra la media de Y en cada nivel: A tiene el mayor recorrido; con B alto la resistencia <strong>baja</strong> (media 62,75 vs 68,125); C casi no cambia.</p>`,
      r: {
        nota: "S7.4 línea 33.",
        codigo: `model.tables(modelo, type = "effects")`,
        rlab: "r-m21-resistencia"
      },
      lectura: String.raw`<p>En <code>$B</code>: <code>-1  2.6875</code> y <code>1  -2.6875</code> ⇒ con B alto la media queda 2,69 bajo la media general: la presión <strong>reduce</strong> la resistencia (C7.4 s12 escribe «efecto positivo»: ver ⚠️ Diferencias entre fuentes).</p>`,
      errores: ["Tomar el número de <code>model.tables</code> como el efecto $\\bar Y_+-\\bar Y_-$: es la mitad en un 2^k."],
      memoriza: String.raw`<p><code>model.tables(…, "effects")</code> = desviación de cada nivel respecto de la media general ($=\tfrac12$ efecto en un 2^k).</p>`,
      comprueba: {
        enunciado: "model.tables da A: −1 → −11,313; 1 → 11,313. ¿Cuál es el efecto de A como ȳ₊ − ȳ₋?",
        opciones: ["22,625", "11,313", "5,656", "0"],
        correcta: 0,
        explicacion: "11,3125 − (−11,3125) = 22,625."
      },
      verifica: [
        { que: "efecto A resistencia", js: "media([72,75,83,84,68,70,80,82]) - media([60,65,52,54,54,56,45,47])", esperado: 22.625, tol: 1e-9 },
        { que: "media B alto", js: "media([54,56,45,47,68,70,80,82])", esperado: 62.75, tol: 1e-9 }
      ],
      fuente: [{ id: "C7.4", loc: "slides 7, 12–13" }]
    },

    {
      id: "m21-c06",
      titulo: "Gráficas de interacción con interaction.plot",
      cubre: ["M21.6"],
      simple: String.raw`<p><code>interaction.plot(x, linea, y)</code> dibuja la media de y en cada nivel de x, con una línea por nivel del otro factor. Paralelas ⇒ sin interacción.</p>`,
      formal: String.raw`<p>Resistencia (C7.4 s15): A×B casi paralelas (no significativa, $p=0{,}078$); A×C con pendientes distintas (significativa, $p=4{,}38\cdot10^{-6}$): con temperatura alta el aditivo marca una gran diferencia; B×C casi paralelas ($p=0{,}519$). Para ver todas a la vez el curso menciona <code>library(FrF2); IAPlot(modelo)</code>.</p>`,
      r: {
        nota: "S7.4 líneas 39–45.",
        codigo: `par(mfrow = c(1, 3))
interaction.plot(datos$A, datos$B, datos$Y)   # A x B
interaction.plot(datos$A, datos$C, datos$Y)   # A x C
interaction.plot(datos$B, datos$C, datos$Y)   # B x C
par(mfrow = c(1, 1))`
      },
      memoriza: String.raw`<p><code>interaction.plot(eje_x, una_línea_por, respuesta)</code>; <code>par(mfrow = c(1, 3))</code> para ponerlas lado a lado.</p>`,
      comprueba: {
        enunciado: "En interaction.plot(A, C, Y), ¿qué representa cada línea?",
        opciones: ["Un nivel de C", "Un nivel de A", "Una réplica", "Una observación"],
        correcta: 0,
        explicacion: "El primer argumento va en el eje x; el segundo define las líneas."
      },
      fuente: [{ id: "C7.4", loc: "slides 14–15" }, { id: "S7.4", loc: "líneas 39–45" }]
    },

    {
      id: "m21-c07",
      titulo: "Bloqueo en diseños 2^k",
      cubre: ["M21.7"],
      simple: String.raw`<p>Si no se pueden correr todos los tratamientos en las mismas condiciones (días, turnos, lotes, operadores), se reparten en <strong>bloques</strong>. Lo ideal es que cada bloque tenga una réplica completa.</p>`,
      formal: String.raw`<p>Objetivo: distribuir los $2^k$ tratamientos en $b$ bloques sin afectar la estimación de los efectos importantes. Jerarquía de efectos que se busca preservar: (1) efectos principales, (2) interacciones dobles, (3) triples y de mayor orden (se pueden sacrificar). <strong>Caso ideal:</strong> si cada bloque contiene una réplica completa, ningún efecto queda confundido con los bloques.</p>
<p>Beneficios: más precisión, menos variabilidad no controlada, conclusiones válidas en distintas condiciones.</p>`,
      memoriza: String.raw`<p>Bloque = réplica completa ⇒ nada confundido. Si hay que sacrificar, se sacrifican las interacciones de mayor orden.</p>`,
      comprueba: {
        enunciado: "Al bloquear un 2^k, ¿qué efectos se sacrifican primero si es necesario?",
        opciones: ["Las interacciones triples y de mayor orden", "Los efectos principales", "Las interacciones dobles", "El bloque"],
        correcta: 0,
        explicacion: "C7.4 s18: jerarquía de efectos."
      },
      fuente: [{ id: "C7.4", loc: "slides 17–18" }]
    },

    {
      id: "m21-c08",
      titulo: "Ejemplo 2² con bloques (días)",
      cubre: ["M21.8"],
      simple: String.raw`<p>Temperatura y presión en un 2²; cada día (bloque) contiene una réplica completa. En R: <code>aov(respuesta ~ A * B + bloque)</code>.</p>`,
      formal: String.raw`<p>Resultados (C7.4 s20): A $F=1681$ ($p=3{,}19\cdot10^{-5}$), B $F=361$ ($p=0{,}000318$), bloque $F=81$ ($p=0{,}0029$), A:B $F=1$ ($p=0{,}391$); error $0{,}38$ con 3 gl.</p>
<ul><li>A y B afectan la respuesta; A domina.</li><li>Sin interacción ⇒ efectos aditivos (líneas paralelas).</li><li>El bloqueo fue útil: los días difieren.</li></ul>`,
      r: {
        nota: "S7.4 líneas 49–65. plot.design deja fuera la columna de bloques.",
        codigo: `bloque <- factor(rep(1:2, each = 4))
A <- factor(rep(c(-1, 1, -1, 1), times = 2))
B <- factor(rep(c(-1, -1, 1, 1), times = 2))
respuesta <- c(20, 30, 25, 35,  22, 33, 27, 37)
datos <- data.frame(bloque, A, B, respuesta)
modelo <- aov(respuesta ~ A * B + bloque, data = datos)
summary(modelo)
interaction.plot(datos$A, datos$B, datos$respuesta, col = c("red", "blue"), lwd = 2)
plot.design(datos[, 2:4])`,
        rlab: "r-m21-bloques"
      },
      memoriza: String.raw`<p>Bloques en un factorial: <code>aov(y ~ A * B + bloque)</code> (el bloque se suma, no se multiplica).</p>`,
      comprueba: {
        enunciado: "¿Cómo se incluye el bloque en el modelo de un 2² con bloques?",
        opciones: ["respuesta ~ A * B + bloque", "respuesta ~ A * B * bloque", "respuesta ~ bloque", "respuesta ~ A + B"],
        correcta: 0,
        explicacion: "El bloque entra sumado, sin interacciones con los factores."
      },
      fuente: [{ id: "C7.4", loc: "slides 19–22" }, { id: "S7.4", loc: "líneas 49–65" }]
    },

    {
      id: "m21-c09",
      titulo: "Ejercicio de la Prueba 3: viscosidad (2² con 2 réplicas)",
      cubre: ["M21.9"],
      simple: String.raw`<p>El ejercicio tipo: calcular efectos con los totales de Yates, armar el ANOVA con $SC=$ contraste$^2/(n2^k)$ y concluir con el F crítico.</p>`,
      formal: String.raw`<p>A = concentración del reactivo (15 % / 25 %), B = tasa de alimentación (20 / 30 lb/h). Totales $(1)=292$, $a=304$, $b=269$, $ab=301$. Medias de celda: $146{,}0;\ 152{,}0;\ 134{,}5;\ 150{,}5$.</p>`,
      ejemplo: String.raw`<ol><li>Efectos: A $=+11{,}0$; B $=-6{,}5$; AB $=+5{,}0$. A es el mayor y aumenta la viscosidad; B la disminuye.</li>
<li>$SC_A=242$, $SC_B=84{,}5$, $SC_{AB}=50$; $SC_T=403{,}5$ ⇒ $SC_E=27$ (4 gl, $CME=6{,}75$).</li>
<li>$F_A=35{,}85$ ($p=0{,}0039$), $F_B=12{,}52$ ($p=0{,}0241$), $F_{AB}=7{,}41$ ($p=0{,}0529$).</li>
<li>Con $F_{0{,}05;1,4}=7{,}71$: A y B significativos; AB no al 5 % (marginal).</li></ol>`,
      memoriza: String.raw`<p>Viscosidad: efectos 11 / −6,5 / 5; SC 242 / 84,5 / 50; error 27 (4 gl); crítico 7,71.</p>`,
      comprueba: {
        enunciado: "Con F_AB = 7,41 y F crítico (1, 4) = 7,71, ¿qué se concluye?",
        opciones: ["La interacción no es significativa al 5 %", "La interacción es significativa", "Hay que rechazar todas las H0", "Faltan réplicas"],
        correcta: 0,
        explicacion: "7,41 < 7,71 (p = 0,053)."
      },
      verifica: [
        { que: "SC_E visc", js: "403.5-242-84.5-50", esperado: 27, tol: 1e-9 },
        { que: "F_A visc", js: "242/(27/4)", esperado: 35.85, tol: 0.005 },
        { que: "F crít 1,4", r: `cat(round(qf(0.95, 1, 4), 2))`, esperado: 7.71, tol: 0.005 },
        { que: "p AB", r: `cat(round(1 - pf(50/6.75, 1, 4), 4))`, esperado: 0.0529, tol: 0.0001 }
      ],
      fuente: [{ id: "C7.4", loc: "slides 25–26" }, { id: "PR-P3-Q2" }]
    }
  ]
});
