/* ============================================================================
   M04 · Escalamiento, distancias y similitud (P1)
   Fuentes abiertas para redactar: C1 slides 40–49 · PR-P1-Q1 afirmación 5 ·
   PR-P1-Q3 (b) · PR-P2-Q12 (1d) · AY5-E P1, P2, P4.
   Los números de los ejemplos se recalculan en tools/verificar_numeros.js.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m04-escalamiento-distancias",
  orden: 4,
  titulo: "Escalamiento, distancias y similitud",
  descripcion: "Poner las variables en una escala comparable antes de medir distancias, y distinguir qué mide cada distancia o similitud.",
  pruebas: ["P1"],
  prioridad: "alta",
  fuentes: [{ id: "C1", loc: "slides 40–49" }, { id: "PR-P1-Q1", loc: "afirmación 5" }, { id: "PR-P1-Q3", loc: "pregunta (b)" }, { id: "PR-P2-Q12", loc: "pregunta 1 (d)" }],

  conceptos: [
    {
      id: "m04-c01",
      titulo: "Cuándo estandarizar",
      cubre: ["M04.1"],
      simple: String.raw`<p>Si una variable está en miles y otra en decenas, la de números grandes «manda» al medir distancias o varianzas. Estandarizar pone todas las variables en una escala comparable para que ninguna domine por sus unidades.</p>`,
      formal: String.raw`<p>Se recomienda escalar (C1 s40) cuando:</p>
<ul>
  <li>las variables están en <strong>unidades distintas</strong>;</li>
  <li>se van a usar <strong>distancias</strong>;</li>
  <li>se va a aplicar <strong>PCA</strong> o <strong>clustering</strong>.</li>
</ul>
<p>La elección del método depende del análisis posterior y de la presencia de <em>outliers</em> (C1 s45).</p>`,
      ejemplo: String.raw`<p>Con edad (años) e ingreso (pesos), la distancia entre dos personas casi no depende de la edad: una diferencia de $1\,000\,000$ de pesos pesa mucho más que una de $30$ años. Tras estandarizar, ambas variables contribuyen de forma comparable.</p>`,
      errores: ["Estandarizar siempre «porque sí»: depende del método posterior y de los outliers."],
      memoriza: String.raw`<p>Estandarizar cuando: unidades distintas · se usan distancias · PCA o clustering.</p>`,
      comprueba: {
        enunciado: "¿En cuál situación es MÁS importante estandarizar antes de calcular distancias?",
        opciones: ["Variables en unidades muy distintas", "Todas las variables en las mismas unidades y rangos similares", "Una sola variable", "Cuando no se usará ningún método posterior"],
        correcta: 0,
        explicacion: "Con unidades distintas, la variable de números grandes domina la distancia."
      },
      fuente: [{ id: "C1", loc: "slides 40 y 45" }]
    },

    {
      id: "m04-c02",
      titulo: "Normalización min–max y su inversa",
      cubre: ["M04.2", "M04.4"],
      simple: String.raw`<p>Min–max aprieta los datos al intervalo $[0,1]$: el mínimo pasa a $0$, el máximo a $1$ y el resto queda proporcional. Sirve para comparar magnitudes relativas.</p>`,
      formal: String.raw`$$w=\frac{x-x_{\min}}{x_{\max}-x_{\min}}\qquad\text{(inversa: } x=w\,(x_{\max}-x_{\min})+x_{\min}\text{)}$$
<p>La inversa permite volver a las unidades originales, por ejemplo para interpretar un centroide calculado con datos normalizados (PR-P2-Q12, pregunta 1d). <strong>No</strong> da media $0$ ni varianza $1$ (PR-P1-Q1, afirmación 5).</p>`,
      ejemplo: String.raw`<p>C1 s41: $x=(10,12,15,20,25)$, $x_{\min}=10$, $x_{\max}=25$.</p>
<ol>
  <li>$w=(0;\ 2/15;\ 5/15;\ 10/15;\ 1)=(0;\ 0{,}133;\ 0{,}333;\ 0{,}667;\ 1)$.</li>
  <li>Inversa: un valor normalizado de $0{,}5$ corresponde a $x=0{,}5\cdot15+10=17{,}5$.</li>
</ol>`,
      r: {
        nota: "Código de C1 slide 41; el último paso (inversa) se agregó.",
        codigo: `x <- c(10, 12, 15, 20, 25)
xmin <- min(x); xmax <- max(x)
w <- (x - xmin) / (xmax - xmin)
w
0.5 * (xmax - xmin) + xmin     # inversa de w = 0.5`,
        rlab: "r-m04-escalas"
      },
      errores: ["Creer que min–max deja media 0 y varianza 1: eso lo hace la estandarización z."],
      memoriza: String.raw`<p>$w=\dfrac{x-\min}{\max-\min}\in[0,1]$ · inversa $x=w(\max-\min)+\min$.</p>`,
      comprueba: {
        enunciado: "Con x entre 10 y 25, ¿a qué valor original corresponde un dato normalizado min–max de 0,5?",
        opciones: ["17,5", "12,5", "15", "20"],
        correcta: 0,
        explicacion: "x = 0,5·(25−10) + 10 = 17,5."
      },
      verifica: [{ que: "inversa de w=0,5", js: "0.5*(25-10)+10", esperado: 17.5, tol: 1e-9 }],
      fuente: [{ id: "C1", loc: "slide 41" }, { id: "PR-P1-Q1", loc: "afirmación 5" }, { id: "PR-P2-Q12", loc: "pregunta 1d" }]
    },

    {
      id: "m04-c03",
      titulo: "Estandarización z-score y scale()",
      cubre: ["M04.3"],
      simple: String.raw`<p>El z-score expresa cada dato como «cuántas desviaciones estándar está de la media». Tras estandarizar, la variable queda con <strong>media 0 y desviación 1</strong>.</p>`,
      formal: String.raw`$$z_i=\frac{x_i-\bar x}{s}$$
<p>con $s$ la desviación estándar muestral (divisor $n-1$). En R: <code>scale(x)</code> hace todo automáticamente (C1 s42).</p>`,
      ejemplo: String.raw`<p>Con $x=(10,12,15,20,25)$: $\bar x=16{,}4$ y $s=6{,}107$. Entonces $z=(-1{,}048;\ -0{,}720;\ -0{,}229;\ 0{,}589;\ 1{,}408)$; su suma es $0$.</p>`,
      r: {
        nota: "Código de C1 slide 42.",
        codigo: `x <- c(10, 12, 15, 20, 25)
z <- (x - mean(x)) / sd(x)
z
scale(x)[, 1]`,
        rlab: "r-m04-escalas"
      },
      errores: ["Olvidar que <code>scale()</code> devuelve una matriz (por eso <code>scale(x)[,1]</code> para un vector)."],
      memoriza: String.raw`<p>$z=(x-\bar x)/s$ → media 0, sd 1 · <code>scale()</code>.</p>`,
      comprueba: {
        enunciado: "¿Qué media y desviación estándar tienen los datos tras aplicar scale()?",
        opciones: ["Media 0 y desviación 1", "Media 1 y desviación 0", "Mínimo 0 y máximo 1", "Mediana 0 e IQR 1"],
        correcta: 0,
        explicacion: "El z-score centra en la media y divide por la desviación."
      },
      verifica: [{ que: "primer z", r: `x <- c(10, 12, 15, 20, 25); cat(round((x[1]-mean(x))/sd(x), 3))`, esperado: -1.048, tol: 0.0005 }],
      fuente: [{ id: "C1", loc: "slide 42" }]
    },

    {
      id: "m04-c04",
      titulo: "Escalamiento robusto y normalización L2",
      cubre: ["M04.5", "M04.6"],
      simple: String.raw`<p><strong>Robusto:</strong> en vez de media y desviación (que los valores extremos distorsionan), usa mediana e IQR. <strong>L2:</strong> divide cada dato por el largo (norma) del vector, útil cuando importa la dirección más que la magnitud.</p>`,
      formal: String.raw`$$w_i=\frac{x_i-\operatorname{mediana}(x)}{\operatorname{IQR}(x)}\qquad\qquad w_i=\frac{x_i}{\lVert x\rVert_2},\ \ \lVert x\rVert_2=\sqrt{\textstyle\sum x_i^2}$$`,
      ejemplo: String.raw`<p>C1 s43 (20 datos con un valor extremo, $100$): mediana $=26$, IQR $=32$; el dato $5$ queda en $-0{,}656$ y el $100$ en $2{,}31$. C1 s44: $x=(10,12,15,20,25)$ tiene norma $\sqrt{1494}=38{,}65$ y $w=(0{,}259;\ 0{,}310;\ 0{,}388;\ 0{,}517;\ 0{,}647)$.</p>`,
      r: {
        nota: "Códigos de C1 slides 43 y 44.",
        codigo: `x <- c(10, 12, 15, 20, 25)
x / sqrt(sum(x^2))            # L2`,
        rlab: "r-m04-escalas"
      },
      errores: ["Usar z-score con muchos outliers: la media y la desviación se distorsionan; ahí conviene el escalamiento robusto."],
      memoriza: String.raw`<p>Robusto: $(x-\text{mediana})/\text{IQR}$ (menos sensible a outliers). L2: $x/\lVert x\rVert$ (dirección).</p>`,
      comprueba: {
        enunciado: "¿Qué escalamiento es menos sensible a los outliers?",
        opciones: ["Robusto (mediana e IQR)", "Z-score", "Min–max", "Ninguno se ve afectado"],
        correcta: 0,
        explicacion: "Mediana e IQR casi no cambian por valores extremos; media, desviación, mínimo y máximo sí."
      },
      verifica: [{ que: "norma L2", js: "Math.sqrt(10*10+12*12+15*15+20*20+25*25)", esperado: 38.6523, tol: 0.0005 }],
      fuente: [{ id: "C1", loc: "slides 43–44" }, { id: "PR-P1-Q3", loc: "pregunta (b)" }]
    },

    {
      id: "m04-c05",
      titulo: "Distancias euclídea y Manhattan",
      figura: { tipo: "distancias", donde: "ejemplo", a: [2, 3], b: [6, 8],
        pie: "Los puntos A y B de la clase: la euclídea va en línea recta; Manhattan suma los tramos horizontal y vertical." },
      cubre: ["M04.7"],
      simple: String.raw`<p>Euclídea: la línea recta entre dos puntos. Manhattan: lo que recorrerías por calles en cuadrícula, sumando las diferencias en cada variable (sin signo).</p>`,
      formal: String.raw`$$d_E(a,b)=\sqrt{\sum_j (a_j-b_j)^2},\qquad d_M(a,b)=\sum_j |a_j-b_j|$$`,
      ejemplo: String.raw`<p>C1 s47: $A=(2,3)$ y $B=(6,8)$.</p>
<ol>
  <li>Euclídea: $\sqrt{4^2+5^2}=\sqrt{41}=6{,}403$.</li>
  <li>Manhattan: $4+5=9$.</li>
</ol>`,
      r: {
        nota: "Código de C1 slide 47.",
        codigo: `A <- c(2, 3); B <- c(6, 8)
dist(rbind(A, B), method = "euclidean")
dist(rbind(A, B), method = "manhattan")`,
        rlab: "r-m04-distancias"
      },
      errores: ["Calcular Manhattan con diferencias con signo (pueden cancelarse): son valores absolutos."],
      memoriza: String.raw`<p>Euclídea: $\sqrt{\sum(a_j-b_j)^2}$. Manhattan: $\sum|a_j-b_j|$. R: <code>dist(rbind(A,B), method = …)</code>. Estandarizar antes si hay escalas distintas.</p>`,
      comprueba: {
        enunciado: "A = (2,3) y B = (6,8). ¿Cuál es la distancia Manhattan?",
        opciones: ["9", "6,40", "5", "41"],
        correcta: 0,
        explicacion: "|2−6| + |3−8| = 4 + 5 = 9."
      },
      verifica: [{ que: "euclídea", js: "dist([2,3],[6,8])", esperado: 6.4031, tol: 0.0001 }, { que: "Manhattan", js: "manhattan([2,3],[6,8])", esperado: 9, tol: 1e-9 }],
      fuente: [{ id: "C1", loc: "slides 46–47" }]
    },

    {
      id: "m04-c06",
      titulo: "Similitud: coseno vs. correlación",
      cubre: ["M04.8"],
      simple: String.raw`<p>La similitud compara <strong>dirección o patrón</strong>, no solo qué tan lejos están los puntos. Dos vectores de magnitudes distintas pueden apuntar hacia el mismo lado.</p>`,
      formal: String.raw`$$\cos\theta=\frac{x\cdot y}{\lVert x\rVert\,\lVert y\rVert}\qquad r=\frac{\tilde x\cdot\tilde y}{\lVert\tilde x\rVert\,\lVert\tilde y\rVert}$$
<p>El coseno mide similitud angular; la correlación es el coseno de los vectores <strong>centrados</strong> (C1 s49).</p>`,
      ejemplo: String.raw`<p>C1 s49: $X=(1,2,3,4)$ y $Y=(2,8,6,8)$. Centrando, el coseno de $\tilde X,\tilde Y$ da $0{,}730$, igual que <code>cor(X,Y)</code>. Sin centrar, el coseno de $X$ e $Y$ vale $0{,}958$: los vectores originales apuntan casi igual, pero su patrón lineal es más débil.</p>`,
      r: {
        nota: "Código de C1 slide 49 (el coseno de los vectores sin centrar se agregó para contrastar).",
        codigo: `X <- c(1, 2, 3, 4); Y <- c(2, 8, 6, 8)
Xc <- X - mean(X); Yc <- Y - mean(Y)
sum(Xc*Yc) / (sqrt(sum(Xc^2)) * sqrt(sum(Yc^2)))   # coseno centrado
cor(X, Y)
sum(X*Y) / (sqrt(sum(X^2)) * sqrt(sum(Y^2)))       # coseno sin centrar`,
        rlab: "r-m04-distancias"
      },
      errores: ["Decir que coseno y correlación son lo mismo: solo coinciden si los vectores están centrados."],
      memoriza: String.raw`<p>Coseno = similitud angular. Correlación = coseno de los vectores centrados.</p>`,
      comprueba: {
        enunciado: "¿Qué relación hay entre el coseno y la correlación?",
        opciones: ["La correlación es el coseno de los vectores centrados", "Son siempre iguales", "El coseno mide distancia y la correlación, ángulo", "No tienen relación"],
        correcta: 0,
        explicacion: "Al restar la media a cada vector, el coseno coincide con r."
      },
      verifica: [{ que: "coseno sin centrar", r: `X <- c(1,2,3,4); Y <- c(2,8,6,8); cat(round(sum(X*Y)/(sqrt(sum(X^2))*sqrt(sum(Y^2))), 4))`, esperado: 0.9578, tol: 0.00005 }, { que: "correlación", js: "cor([1,2,3,4],[2,8,6,8])", esperado: 0.7303, tol: 0.0001 }],
      fuente: [{ id: "C1", loc: "slides 48–49" }]
    }
  ],

  cuando: String.raw`<div class="tabla-scroll"><table class="tabla">
<thead><tr><th>Situación</th><th>Escalamiento</th><th>En R</th></tr></thead>
<tbody>
<tr><td>Quiero datos en $[0,1]$</td><td>Min–max</td><td><code>(x - min(x)) / (max(x) - min(x))</code></td></tr>
<tr><td>Media 0 y sd 1 (PCA, clustering)</td><td>Z-score</td><td><code>scale(x)</code></td></tr>
<tr><td>Hay outliers</td><td>Robusto</td><td><code>(x - median(x)) / IQR(x)</code></td></tr>
<tr><td>Importa la dirección</td><td>L2</td><td><code>x / sqrt(sum(x^2))</code></td></tr>
</tbody></table></div>`,

  errores: [
    { texto: "Min–max no deja media 0 y varianza 1.", fuente: [{ id: "PR-P1-Q1", loc: "afirmación 5" }] }
  ]
});
