/* ============================================================================
   M20 · Diseño en bloques completos al azar (DBCA) (P3)
   Fuentes abiertas para redactar: C7.3 slides 1–17 · S7.3 · PR-P3-Q1 (vía C7.3 s16–17).
   Todos los números se recalcularon en R 4.6.1 (agricolae 1.3).
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m20-dbca",
  orden: 20,
  titulo: "Diseño en bloques completos al azar (DBCA)",
  descripcion: "Comparar tratamientos cuando hay un factor perturbador (operador, sector, día) que no interesa pero mueve la respuesta: se controla como bloque.",
  pruebas: ["P3"],
  prioridad: "alta",
  fuentes: [{ id: "C7.3", loc: "slides 3–17" }, { id: "S7.3" }],

  conceptos: [
    {
      id: "m20-c01",
      titulo: "Factores de bloque: qué son y para qué sirven",
      cubre: ["M20.1"],
      simple: String.raw`<p>Un <strong>bloque</strong> es una variable que <em>no</em> nos interesa estudiar, pero que sabemos que afecta la respuesta. La incluimos en el diseño solo para que su efecto no se confunda con el del factor que sí nos interesa.</p>`,
      formal: String.raw`<p><strong>Factores de bloque</strong> (C7.3 s5): factores adicionales al factor de interés que se incorporan de manera explícita en un experimento comparativo. No se incluyen porque interese analizar su efecto, sino como un medio para estudiar de manera adecuada y eficaz al factor de interés. Entran con <strong>importancia secundaria</strong>: se controlan para <strong>reducir el error experimental</strong>.</p>
<p>Idea clave (s4): el bloqueo separa la variabilidad debida a un factor perturbador (el bloque) de la del factor de interés.</p>`,
      ejemplo: String.raw`<p>Se quieren comparar varias máquinas y cada máquina la maneja un operador distinto. Si el operador influye en el resultado, un mal diseño <strong>confundiría</strong> el efecto de la máquina con el del operador. Solución: que cada operador pruebe todas las máquinas (el operador es el bloque).</p>`,
      errores: ["Creer que el objetivo del bloque es elegir «el mejor bloque»: con los operadores no se trata de elegir uno (C7.3 s14)."],
      memoriza: String.raw`<p>Bloque = factor perturbador que se controla, no se estudia. Objetivo: sacar su variabilidad del error.</p>`,
      comprueba: {
        enunciado: "¿Por qué se incluye un factor de bloque en un experimento?",
        opciones: ["Para controlar una fuente de variabilidad que no interesa y reducir el error experimental", "Porque interesa estimar su efecto tanto como el del tratamiento", "Para aumentar el número de tratamientos", "Para poder aleatorizar el orden de los bloques"],
        correcta: 0,
        explicacion: "C7.3 s5: se incluyen como un medio para estudiar bien al factor de interés, no porque interese su efecto."
      },
      fuente: [{ id: "C7.3", loc: "slides 4–5" }]
    },

    {
      id: "m20-c02",
      titulo: "El DBCA: completo, aleatorizado dentro del bloque, modelo y supuestos",
      figura: { tipo: "bloques", donde: "formal", bloques: ["Operador 1", "Operador 2", "Operador 3", "Operador 4"],
        tratamientos: ["A", "B", "C", "D"],
        ordenes: [["C", "A", "D", "B"], ["B", "D", "A", "C"], ["A", "C", "B", "D"], ["D", "B", "C", "A"]],
        pie: "DBCA de los métodos de ensamble: cada operador (bloque) prueba los 4 métodos; el orden se sortea dentro de cada bloque. El orden dibujado es solo ilustrativo." },
      cubre: ["M20.2"],
      simple: String.raw`<p>En un DBCA <strong>cada bloque recibe todos los tratamientos</strong>, y el orden se sortea <em>dentro</em> de cada bloque. Hay tres fuentes de variabilidad: tratamientos, bloques y error.</p>`,
      formal: String.raw`<ul>
<li><strong>Completo:</strong> en cada bloque se prueban <em>todos</em> los tratamientos.</li>
<li><strong>Aleatorización:</strong> dentro de cada bloque, no total como en el DCA.</li>
<li><strong>Restricción:</strong> no se puede aleatorizar de bloque a bloque (p. ej., no se cambia el orden de los bloques).</li>
</ul>
<p><strong>Modelo</strong> (C7.3 s8):</p>
$$Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij},\qquad i=1,\dots,k;\ j=1,\dots,b$$
<p>$Y_{ij}$: medición del tratamiento $i$ en el bloque $j$; $\mu$: media global; $\tau_i$: efecto del tratamiento $i$; $\gamma_j$: efecto del bloque $j$; $\varepsilon_{ij}$: error aleatorio.</p>
<p><strong>Supuestos:</strong> los $\varepsilon_{ij}$ son independientes con distribución $N(0,\sigma^2)$, y el modelo es <strong>aditivo</strong>: no hay interacción tratamiento × bloque.</p>
<p><strong>Hipótesis</strong> del tratamiento: $H_0:\tau_1=\tau_2=\dots=\tau_k=0$ (no hay diferencia entre tratamientos). En la Prueba 3 también se pide la del bloque: $H_0:\gamma_1=\dots=\gamma_b=0$.</p>`,
      errores: ["Aleatorizar todas las corridas juntas (eso es un DCA): en el DBCA se sortea dentro de cada bloque.", "Olvidar el supuesto de aditividad (sin interacción tratamiento × bloque)."],
      memoriza: String.raw`<p>$Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij}$ · completo · aleatorización dentro del bloque · sin interacción trat × bloque.</p>`,
      comprueba: {
        enunciado: "En un DBCA, ¿dónde se aplica la aleatorización?",
        opciones: ["Dentro de cada bloque", "Entre bloques, cambiando su orden", "Sobre todas las corridas a la vez, como en el DCA", "No se aleatoriza"],
        correcta: 0,
        explicacion: "C7.3 s7: la aleatorización se hace dentro de cada bloque; no se puede aleatorizar de bloque a bloque."
      },
      fuente: [{ id: "C7.3", loc: "slides 7–8" }, { id: "PR-P3-Q1", loc: "a" }]
    },

    {
      id: "m20-c03",
      titulo: "ANOVA del DBCA: sumas de cuadrados con totales y ejemplo de ensamble",
      cubre: ["M20.3"],
      simple: String.raw`<p>La tabla ANOVA tiene una fila más que la del DCA: la del <strong>bloque</strong>. La suma de cuadrados del error se obtiene por diferencia.</p>`,
      formal: String.raw`<p>Notación de puntos: $Y_{i\cdot}$ total del tratamiento $i$; $Y_{\cdot j}$ total del bloque $j$; $Y_{\cdot\cdot}$ gran total; $N=k\cdot b$.</p>
$$SC_T=\sum_j\sum_i Y_{ij}^2-\frac{Y_{\cdot\cdot}^2}{N}\qquad SC_{TRAT}=\sum_i\frac{Y_{i\cdot}^2}{b}-\frac{Y_{\cdot\cdot}^2}{N}\qquad SC_B=\sum_j\frac{Y_{\cdot j}^2}{k}-\frac{Y_{\cdot\cdot}^2}{N}$$
$$SC_E=SC_T-SC_{TRAT}-SC_B$$
<table class="tabla"><tr><th>FV</th><th>SC</th><th>GL</th><th>CM</th><th>$F_0$</th></tr>
<tr><td>Tratamientos</td><td>$SC_{TRAT}$</td><td>$k-1$</td><td>$CM_{TRAT}$</td><td>$CM_{TRAT}/CME$</td></tr>
<tr><td>Bloques</td><td>$SC_B$</td><td>$b-1$</td><td>$CM_B$</td><td>$CM_B/CME$</td></tr>
<tr><td>Error</td><td>$SC_E$</td><td>$(k-1)(b-1)$</td><td>$CME$</td><td></td></tr>
<tr><td>Total</td><td>$SC_T$</td><td>$N-1$</td><td></td><td></td></tr></table>
<p>Se rechaza $H_0$ de tratamientos si $F_0>F_{\alpha;\,k-1,\,(k-1)(b-1)}$ (o si el valor-p $<\alpha$).</p>`,
      ejemplo: String.raw`<p>Cuatro métodos de ensamble (A, B, C, D) y 4 operadores como bloques; respuesta: minutos (C7.3 s11).</p>
<table class="tabla"><tr><th>Método</th><th>Op. 1</th><th>Op. 2</th><th>Op. 3</th><th>Op. 4</th><th>$Y_{i\cdot}$</th></tr>
<tr><td>A</td><td>6</td><td>9</td><td>7</td><td>8</td><td>30</td></tr>
<tr><td>B</td><td>7</td><td>10</td><td>11</td><td>8</td><td>36</td></tr>
<tr><td>C</td><td>10</td><td>16</td><td>11</td><td>14</td><td>51</td></tr>
<tr><td>D</td><td>10</td><td>13</td><td>11</td><td>9</td><td>43</td></tr>
<tr><td>$Y_{\cdot j}$</td><td>33</td><td>48</td><td>40</td><td>39</td><td>160</td></tr></table>
<ol>
<li>$Y_{\cdot\cdot}^2/N=160^2/16=1600$.</li>
<li>$SC_T=1708-1600=108$.</li>
<li>$SC_{TRAT}=(30^2+36^2+51^2+43^2)/4-1600=61{,}5$.</li>
<li>$SC_B=(33^2+48^2+40^2+39^2)/4-1600=28{,}5$.</li>
<li>$SC_E=108-61{,}5-28{,}5=18$ con $(3)(3)=9$ gl ⇒ $CME=2$.</li>
<li>$F_{\text{métodos}}=20{,}5/2=10{,}25$ ($p=0{,}003$); $F_{\text{operadores}}=9{,}5/2=4{,}75$ ($p=0{,}030$).</li>
</ol>
<p>Conclusión: ambos efectos son significativos; los métodos difieren y el operador (bloque) también influye en el tiempo.</p>`,
      errores: ["Usar $N-k$ como gl del error: en el DBCA son $(k-1)(b-1)$.", "Dividir los totales de tratamiento por $k$ en vez de por $b$ (cada total de tratamiento suma $b$ datos)."],
      memoriza: String.raw`<p>$SC_{TRAT}$: totales de tratamiento$^2/b$ · $SC_B$: totales de bloque$^2/k$ · restar siempre $Y_{\cdot\cdot}^2/N$ · $SC_E$ por diferencia · gl error $(k-1)(b-1)$.</p>`,
      comprueba: {
        enunciado: "Con k = 4 tratamientos y b = 4 bloques, ¿cuántos gl tiene el error de un DBCA?",
        opciones: ["9", "12", "15", "3"],
        correcta: 0,
        explicacion: "(k − 1)(b − 1) = 3 · 3 = 9."
      },
      verifica: [
        { que: "SC_T", js: "suma([6,9,7,8,7,10,11,8,10,16,11,14,10,13,11,9].map(v=>v*v)) - 160*160/16", esperado: 108, tol: 1e-9 },
        { que: "SC_TRAT", js: "(30*30+36*36+51*51+43*43)/4 - 1600", esperado: 61.5, tol: 1e-9 },
        { que: "SC_B", js: "(33*33+48*48+40*40+39*39)/4 - 1600", esperado: 28.5, tol: 1e-9 },
        { que: "F métodos", js: "(61.5/3)/(18/9)", esperado: 10.25, tol: 1e-9 }
      ],
      fuente: [{ id: "C7.3", loc: "slides 9–12" }]
    },

    {
      id: "m20-c04",
      titulo: "DBCA en R: aov con tratamiento + bloque y LSD.test",
      cubre: ["M20.4"],
      simple: String.raw`<p>En R basta con <strong>sumar el bloque</strong> en la fórmula: <code>aov(y ~ tratamiento + bloque)</code>. Sin <code>*</code>, porque el modelo no tiene interacción.</p>`,
      formal: String.raw`<p>Pasos (C7.3 s13 y S7.3):</p>
<ol><li>Crear el tratamiento y el bloque como <code>factor</code> (si el bloque es un número, sin <code>factor()</code> R lo trataría como variable numérica con 1 gl).</li>
<li><code>aov(y ~ metodo + operador, data = datos)</code> y <code>summary()</code>: tabla ANOVA con los valores-p de ambos factores.</li>
<li><code>library(agricolae)</code>; <code>LSD.test(modelo, "metodo")</code>: comparaciones múltiples LSD; <code>$groups</code> asigna letras (misma letra = no difieren).</li></ol>`,
      r: {
        nota: "Código de S7.3 (líneas 14–34).",
        codigo: `metodo   <- factor(rep(c("A", "B", "C", "D"), each = 4))
operador <- factor(rep(c(1, 2, 3, 4), times = 4))
y <- c(6, 9, 7, 8,  7, 10, 11, 8,  10, 16, 11, 14,  10, 13, 11, 9)
datos <- data.frame(metodo, operador, y)
modelo <- aov(y ~ metodo + operador, data = datos)
summary(modelo)
library(agricolae)
lsd <- LSD.test(modelo, "metodo")
lsd$groups`,
        rlab: "r-m20-dbca"
      },
      lectura: String.raw`<ul><li><code>metodo 3 61.5 20.5 10.25 0.00292</code>: los métodos difieren ($p<0{,}05$).</li><li><code>operador 3 28.5 9.5 4.75 0.02985</code>: el bloque también es significativo.</li><li><code>Residuals 9 18.0 2.0</code>: $CME=2$ con 9 gl.</li><li><code>$groups</code>: C (12,75) <code>a</code>; D (10,75) <code>ab</code>; B (9,00) <code>bc</code>; A (7,50) <code>c</code>. C difiere de A y de B; D difiere de A.</li></ul>`,
      errores: ["Escribir <code>y ~ metodo * operador</code>: con una observación por celda no queda error para estimar y además el DBCA supone que no hay interacción."],
      memoriza: String.raw`<p><code>aov(y ~ trat + bloque)</code> · <code>LSD.test(modelo, "trat")$groups</code> (paquete <code>agricolae</code>).</p>`,
      comprueba: {
        enunciado: "¿Qué fórmula ajusta un DBCA con tratamiento «metodo» y bloque «operador»?",
        opciones: ["y ~ metodo + operador", "y ~ metodo * operador", "y ~ metodo", "y ~ operador"],
        correcta: 0,
        explicacion: "C7.3 s13: aov(y ~ metodo + operador) ajusta el modelo con el tratamiento y el bloque, sin interacción."
      },
      fuente: [{ id: "C7.3", loc: "slide 13" }, { id: "S7.3", loc: "líneas 14–34" }]
    },

    {
      id: "m20-c05",
      titulo: "Interpretar el efecto de bloque",
      cubre: ["M20.5"],
      simple: String.raw`<p>Si el bloque sale significativo, el bloqueo <strong>valió la pena</strong>: ese factor sí mueve la respuesta. Si no sale, es un argumento para no controlarlo la próxima vez.</p>`,
      formal: String.raw`<ul><li><strong>Significativo:</strong> el factor de bloque influye sobre $Y$; debe tomarse en cuenta para mejorar la calidad de la respuesta.</li>
<li><strong>No significativo:</strong> los bloques son iguales ⇒ argumento a favor de no controlar este factor en futuros experimentos.</li></ul>
<p>Los <em>tratamientos</em> se comparan para elegir el mejor; con los <em>bloques</em> no se trata de elegir uno, sino de tomar decisiones (p. ej., dar más entrenamiento a un operador).</p>`,
      ejemplo: String.raw`<p>Ensamble: operador con $p=0{,}030$ ⇒ los operadores sí tienen efecto. Con LSD, el operador 1 difiere del operador 2; los demás son iguales (R: grupos <code>2 a</code>, <code>3 ab</code>, <code>4 ab</code>, <code>1 b</code>).</p>`,
      memoriza: String.raw`<p>Bloque significativo ⇒ el bloqueo fue efectivo. No significativo ⇒ se podría dejar de controlar.</p>`,
      comprueba: {
        enunciado: "Si el F del bloque no es significativo, ¿qué sugiere C7.3?",
        opciones: ["Que los bloques son iguales y hay un argumento para no controlar ese factor en el futuro", "Que el experimento es inválido", "Que hay que elegir el mejor bloque", "Que los tratamientos no difieren"],
        correcta: 0,
        explicacion: "C7.3 s14."
      },
      fuente: [{ id: "C7.3", loc: "slide 14" }]
    },

    {
      id: "m20-c06",
      titulo: "Comparaciones LSD en el DBCA",
      cubre: ["M20.6"],
      simple: String.raw`<p>La LSD es la diferencia mínima entre dos medias para declararlas distintas. En el DBCA se usa el $CME$ y los gl del error del DBCA, y el número de bloques $b$ hace las veces de réplicas.</p>`,
      formal: String.raw`$$\text{DCA: } LSD=t_{\alpha/2,\,N-k}\sqrt{\frac{2\,CME}{n}}\qquad\text{DBCA: } LSD=t_{\alpha/2,\,(k-1)(b-1)}\sqrt{\frac{2\,CME}{b}}$$
<p>Dos tratamientos difieren si $|\bar Y_i-\bar Y_j|>LSD$.</p>`,
      ejemplo: String.raw`<p>Ensamble: $CME=2$, $b=4$, gl $=9$, $t_{0{,}025;9}=2{,}262$ ⇒ $LSD=2{,}262\sqrt{2\cdot2/4}=2{,}262$.</p>
<table class="tabla"><tr><th>Par</th><th>$|\bar Y_i-\bar Y_j|$</th><th>¿&gt; LSD?</th></tr>
<tr><td>A vs B</td><td>1,5</td><td>No</td></tr><tr><td>A vs C</td><td>5,25</td><td>Sí</td></tr><tr><td>A vs D</td><td>3,25</td><td>Sí</td></tr>
<tr><td>B vs C</td><td>3,75</td><td>Sí</td></tr><tr><td>B vs D</td><td>1,75</td><td>No</td></tr><tr><td>C vs D</td><td>2,0</td><td>No</td></tr></table>`,
      errores: ["Usar los gl del DCA ($N-k=12$) en vez de $(k-1)(b-1)=9$.", "Dividir por $n$ cuando la réplica en el DBCA es el número de bloques $b$."],
      memoriza: String.raw`<p>$LSD_{DBCA}=t_{\alpha/2,(k-1)(b-1)}\sqrt{2\,CME/b}$.</p>`,
      comprueba: {
        enunciado: "En el ejemplo de ensamble (LSD = 2,262), ¿qué par NO difiere?",
        opciones: ["B vs D (1,75)", "A vs C (5,25)", "A vs D (3,25)", "B vs C (3,75)"],
        correcta: 0,
        explicacion: "1,75 < 2,262."
      },
      verifica: [
        { que: "t 0,025;9", r: `cat(round(qt(0.975, 9), 3))`, esperado: 2.262, tol: 0.0005 },
        { que: "LSD ensamble", r: `cat(round(qt(0.975, 9) * sqrt(2 * 2 / 4), 3))`, esperado: 2.262, tol: 0.0005 }
      ],
      fuente: [{ id: "C7.3", loc: "slide 15" }]
    },

    {
      id: "m20-c07",
      titulo: "Ejercicio de la Prueba 3: fertilizantes en 4 sectores",
      cubre: ["M20.7"],
      simple: String.raw`<p>El ejercicio tipo de prueba: identificar el DBCA, hacer la tabla ANOVA con totales, decidir sobre tratamientos y bloque, aplicar LSD y comparar con lo que pasaría sin bloquear.</p>`,
      formal: String.raw`<p>Tres fertilizantes (F1, F2, F3), rendimiento en kg/parcela; la fertilidad del suelo no es homogénea, así que 4 sectores son bloques. Modelo $y_{ij}=\mu+\tau_i+\beta_j+\varepsilon_{ij}$; $H_0:\tau_1=\tau_2=\tau_3=0$.</p>
<table class="tabla"><tr><th></th><th>S1</th><th>S2</th><th>S3</th><th>S4</th><th>$Y_{i\cdot}$</th></tr>
<tr><td>F1</td><td>21</td><td>20</td><td>24</td><td>23</td><td>88</td></tr>
<tr><td>F2</td><td>21</td><td>26</td><td>24</td><td>29</td><td>100</td></tr>
<tr><td>F3</td><td>24</td><td>26</td><td>30</td><td>32</td><td>112</td></tr>
<tr><td>$Y_{\cdot j}$</td><td>66</td><td>72</td><td>78</td><td>84</td><td>300</td></tr></table>`,
      ejemplo: String.raw`<ol>
<li>$SC_T=156$, $SC_{trat}=72$, $SC_{bloque}=60$ ⇒ $SC_E=24$.</li>
<li>Tabla: fertilizante $72$ (2 gl, CM 36, $F_0=9{,}00$); sector $60$ (3 gl, CM 20, $F_0=5{,}00$); error $24$ (6 gl, CM 4); total 156 (11 gl).</li>
<li>Fertilizante: $9{,}00>F_{0{,}05;2,6}=5{,}14$ ⇒ se rechaza $H_0$ (R: $p=0{,}0156$).</li>
<li>Bloque: $5{,}00>F_{0{,}05;3,6}=4{,}76$ ⇒ el bloqueo fue efectivo (R: $p=0{,}0452$).</li>
<li>$LSD=t_{0{,}025;6}\sqrt{2\cdot4/4}=2{,}447\sqrt2=3{,}46$. Medias 22, 25, 28: solo $F3-F1=6>3{,}46$ ⇒ se recomienda F3.</li>
<li><strong>¿Y si no se bloquea (DCA)?</strong> La $SC_{bloque}=60$ pasa al error: $CME=(24+60)/9\approx9{,}33$ y $F=36/9{,}33=3{,}86<F_{0{,}05;2,9}=4{,}26$ ⇒ ya no se detectaría la diferencia. El bloqueo aumentó la potencia.</li></ol>`,
      errores: ["Concluir que el bloqueo «no sirvió» porque el F del bloque apenas supera el crítico: igual mejoró la potencia (sin él, el fertilizante no sale significativo)."],
      memoriza: String.raw`<p>Fertilizantes: $F=9{,}00$; bloque $F=5{,}00$; $LSD=3{,}46$; sin bloque $F=3{,}86<4{,}26$.</p>`,
      comprueba: {
        enunciado: "En el ejercicio de fertilizantes, ¿qué pasa con el CME si se analiza como DCA (sin bloque)?",
        opciones: ["Sube de 4 a ≈ 9,3 porque la SC del bloque pasa al error", "Baja a 2", "No cambia", "Sube a 60"],
        correcta: 0,
        explicacion: "(24 + 60)/9 ≈ 9,33 (C7.3 s17)."
      },
      verifica: [
        { que: "SC_T fert", js: "suma([21,20,24,23,21,26,24,29,24,26,30,32].map(v=>v*v)) - 300*300/12", esperado: 156, tol: 1e-9 },
        { que: "SC_trat fert", js: "(88*88+100*100+112*112)/4 - 7500", esperado: 72, tol: 1e-9 },
        { que: "SC_bloque fert", js: "(66*66+72*72+78*78+84*84)/3 - 7500", esperado: 60, tol: 1e-9 },
        { que: "LSD fert", r: `cat(round(qt(0.975, 6) * sqrt(2 * 4 / 4), 2))`, esperado: 3.46, tol: 0.005 },
        { que: "F DCA", js: "36/(84/9)", esperado: 3.857, tol: 0.001 },
        { que: "F crít 2,9", r: `cat(round(qf(0.95, 2, 9), 2))`, esperado: 4.26, tol: 0.005 }
      ],
      fuente: [{ id: "C7.3", loc: "slides 16–17" }, { id: "PR-P3-Q1", loc: "a–h" }]
    }
  ],

  cuando: String.raw`<table class="tabla"><tr><th>Situación</th><th>Diseño</th><th>En R</th></tr>
<tr><td>Un factor, unidades homogéneas</td><td>DCA (ANOVA de un factor, M18)</td><td><code>aov(y ~ trat)</code></td></tr>
<tr><td>Un factor + un factor perturbador conocido (operador, día, lote, sector)</td><td>DBCA</td><td><code>aov(y ~ trat + bloque)</code></td></tr>
<tr><td>Varios factores, todos de interés</td><td>Factorial (M25, M21)</td><td><code>aov(y ~ A * B)</code></td></tr></table>`
});
