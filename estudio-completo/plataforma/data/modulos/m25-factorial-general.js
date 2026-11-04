/* ============================================================================
   M25 · Diseño factorial: efectos, interacción, a × b y a × b × c (P3)
   Fuentes abiertas para redactar: C7.3 slides 18–38 (s33 leída como imagen).
   Todos los números se recalcularon en R 4.6.1.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m25-factorial-general",
  orden: 21,
  titulo: "Diseño factorial: efectos, interacción, a × b y a × b × c",
  descripcion: "Estudiar varios factores a la vez corriendo todas las combinaciones de niveles: efectos principales, interacciones y su ANOVA.",
  pruebas: ["P3"],
  prioridad: "alta",
  fuentes: [{ id: "C7.3", loc: "slides 18–38" }],

  conceptos: [
    {
      id: "m25-c01",
      titulo: "Qué es un diseño factorial",
      cubre: ["M25.1"],
      simple: String.raw`<p>En un factorial <strong>todos los factores interesan por igual</strong> y se prueban <strong>todas</strong> las combinaciones de sus niveles, en orden aleatorio. El objetivo típico es encontrar la combinación de niveles en la que el proceso funciona mejor.</p>`,
      formal: String.raw`<p>Objetivo (C7.3 s19): estudiar el efecto de varios factores sobre una o varias respuestas, cuando se tiene el mismo interés sobre todos. Factores <strong>cualitativos</strong> (máquinas, tipos de material, operadores, presencia/ausencia de una operación) o <strong>cuantitativos</strong> (temperatura, humedad, velocidad, presión, concentración). Cada factor necesita <strong>al menos dos niveles</strong>. Con el factorial completo se corren aleatoriamente <em>todas</em> las combinaciones.</p>
<p>Diferencia con el bloqueo (M20): en el DBCA el bloque no interesa; en el factorial todos los factores son de interés.</p>`,
      memoriza: String.raw`<p>Factorial = todas las combinaciones, todos los factores de interés, ≥ 2 niveles por factor, orden aleatorio.</p>`,
      comprueba: {
        enunciado: "¿Qué distingue un diseño factorial de un DBCA?",
        opciones: ["En el factorial interesan todos los factores; en el DBCA el bloque solo se controla", "El factorial no se aleatoriza", "El DBCA tiene más factores de interés", "El factorial usa un solo nivel por factor"],
        correcta: 0,
        explicacion: "C7.3 s5 y s19."
      },
      fuente: [{ id: "C7.3", loc: "slide 19" }]
    },

    {
      id: "m25-c02",
      titulo: "Efecto principal",
      cubre: ["M25.2"],
      simple: String.raw`<p>El <strong>efecto principal</strong> de un factor es cuánto cambia, en promedio, la respuesta al pasar ese factor de su nivel bajo a su nivel alto.</p>`,
      formal: String.raw`<p>El efecto de un factor es el cambio observado en $Y$ debido a un cambio de nivel de ese factor. Con dos niveles codificados $-1$ y $+1$:</p>
$$\text{Efecto } A=\bar Y_{A+}-\bar Y_{A-}$$
<p>La <strong>gráfica de efectos principales</strong> muestra la media de $Y$ en cada nivel: una pendiente pronunciada indica un efecto grande.</p>`,
      ejemplo: String.raw`<p>A = levadura (1 o 2), B = temperatura (22 o 30), Y = rendimiento: $(A-,B-)=28$, $(A+,B-)=41$, $(A-,B+)=63$, $(A+,B+)=45$.</p>
<ul><li>Efecto A $=\dfrac{41+45}{2}-\dfrac{28+63}{2}=43-45{,}5=-2{,}5$.</li>
<li>Efecto B $=\dfrac{63+45}{2}-\dfrac{28+41}{2}=54-34{,}5=19{,}5$.</li></ul>
<p>En valor absoluto, la temperatura (B) tiene un efecto mucho mayor que la levadura (A).</p>`,
      errores: ["Comparar efectos por su signo en vez de su valor absoluto para decidir cuál es más importante."],
      memoriza: String.raw`<p>Efecto $=\bar Y_{+}-\bar Y_{-}$. Levadura/temperatura: A $=-2{,}5$; B $=19{,}5$.</p>`,
      comprueba: {
        enunciado: "Con (1)=28, a=41, b=63, ab=45, ¿cuál es el efecto de B?",
        opciones: ["19,5", "−2,5", "−15,5", "39"],
        correcta: 0,
        explicacion: "(63 + 45)/2 − (28 + 41)/2 = 54 − 34,5 = 19,5."
      },
      verifica: [
        { que: "efecto A", js: "(41+45)/2-(28+63)/2", esperado: -2.5, tol: 1e-9 },
        { que: "efecto B", js: "(63+45)/2-(28+41)/2", esperado: 19.5, tol: 1e-9 }
      ],
      fuente: [{ id: "C7.3", loc: "slide 20" }]
    },

    {
      id: "m25-c03",
      titulo: "Interacción y gráfica de interacción",
      cubre: ["M25.3"],
      simple: String.raw`<p>Dos factores <strong>interactúan</strong> cuando el efecto de uno depende del nivel del otro. En la gráfica de interacción se ve como líneas que <strong>no son paralelas</strong> (se cruzan o divergen).</p>`,
      formal: String.raw`<p>Con dos factores a dos niveles, se calcula el efecto de A en cada nivel de B. Si son muy distintos, hay evidencia de interacción. El efecto de interacción:</p>
$$AB=\frac{Y_{(--)}+Y_{(++)}}{2}-\frac{Y_{(+-)}+Y_{(-+)}}{2}$$
<ul><li>Líneas <strong>paralelas</strong> ⇒ no hay interacción; basta analizar cada factor por separado.</li>
<li>Líneas que se <strong>cruzan</strong> o con pendientes muy diferentes ⇒ sí hay interacción; la mejor elección de A depende de B.</li></ul>
<p>Los valores absolutos de los efectos miden su importancia, pero para saber si son <strong>estadísticamente significativos</strong> se requiere el ANOVA.</p>`,
      ejemplo: String.raw`<p>Mismo ejemplo: efecto de A con B bajo $=41-28=13$; con B alto $=45-63=-18$. Muy distintos ⇒ interacción. $AB=\dfrac{28+45}{2}-\dfrac{41+63}{2}=36{,}5-52=-15{,}5$. El máximo de Y se logra con A $=-1$, B $=+1$.</p>`,
      r: {
        nota: "Gráfica de interacción en R (función usada en S7.4).",
        codigo: `A <- factor(c(-1, 1, -1, 1)); B <- factor(c(-1, -1, 1, 1))
Y <- c(28, 41, 63, 45)
interaction.plot(A, B, Y)   # una línea por nivel de B`
      },
      errores: ["Interpretar los efectos principales por separado cuando la interacción es importante: la mejor A depende de B."],
      memoriza: String.raw`<p>Interacción = el efecto de un factor depende del otro. Paralelas ⇒ no; cruzadas/divergentes ⇒ sí. La significancia la da el ANOVA.</p>`,
      comprueba: {
        enunciado: "En una gráfica de interacción las líneas son prácticamente paralelas. ¿Qué indica?",
        opciones: ["Que no hay interacción: el efecto de A no depende del nivel de B", "Que A no tiene efecto", "Que hay una interacción fuerte", "Que el experimento no tiene réplicas"],
        correcta: 0,
        explicacion: "C7.3 s22–23."
      },
      verifica: [
        { que: "AB", js: "(28+45)/2-(41+63)/2", esperado: -15.5, tol: 1e-9 }
      ],
      fuente: [{ id: "C7.3", loc: "slides 21–23" }]
    },

    {
      id: "m25-c04",
      titulo: "Factorial a × b con n réplicas: modelo, hipótesis y ANOVA",
      cubre: ["M25.4"],
      simple: String.raw`<p>Con dos factores A ($a$ niveles) y B ($b$ niveles) hay $a\cdot b$ tratamientos. Si se repite todo el arreglo $n$ veces, hay $n\,a\,b$ corridas. El ANOVA separa la variabilidad en A, B, AB y error.</p>`,
      formal: String.raw`$$Y_{ijk}=\mu+\alpha_i+\beta_j+(\alpha\beta)_{ij}+\varepsilon_{ijk}$$
<p>Tres pares de hipótesis: $H_0:\alpha_1=\dots=\alpha_a=0$; $H_0:\beta_1=\dots=\beta_b=0$; $H_0:(\alpha\beta)_{ij}=0\ \forall ij$.</p>
<table class="tabla"><tr><th>FV</th><th>SC</th><th>GL</th><th>$F_0$</th></tr>
<tr><td>A</td><td>$\sum Y_{i\cdot\cdot}^2/(bn)-Y_{\cdots}^2/N$</td><td>$a-1$</td><td>$CM_A/CME$</td></tr>
<tr><td>B</td><td>$\sum Y_{\cdot j\cdot}^2/(an)-Y_{\cdots}^2/N$</td><td>$b-1$</td><td>$CM_B/CME$</td></tr>
<tr><td>AB</td><td>$\sum\sum Y_{ij\cdot}^2/n-Y_{\cdots}^2/N-SC_A-SC_B$</td><td>$(a-1)(b-1)$</td><td>$CM_{AB}/CME$</td></tr>
<tr><td>Error</td><td>$SC_T-SC_A-SC_B-SC_{AB}$</td><td>$ab(n-1)$</td><td></td></tr>
<tr><td>Total</td><td>$\sum Y_{ijk}^2-Y_{\cdots}^2/N$</td><td>$abn-1$</td><td></td></tr></table>
<p><strong>Réplica</strong> = cada corrida completa del arreglo. Como el error tiene $ab(n-1)$ gl, se necesitan <strong>al menos 2 réplicas</strong> para calcular $SC_E$.</p>`,
      errores: ["Hacer un factorial sin réplicas y pretender una tabla ANOVA completa con interacción: con $n=1$ el error tiene 0 gl."],
      memoriza: String.raw`<p>gl: $a-1$, $b-1$, $(a-1)(b-1)$, $ab(n-1)$, $abn-1$. $n\ge2$.</p>`,
      comprueba: {
        enunciado: "Un factorial 4 × 3 con 3 réplicas, ¿cuántos gl tiene el error?",
        opciones: ["24", "35", "6", "12"],
        correcta: 0,
        explicacion: "ab(n − 1) = 12 · 2 = 24."
      },
      fuente: [{ id: "C7.3", loc: "slides 25–26" }]
    },

    {
      id: "m25-c05",
      titulo: "Ejemplo 4 × 3: acabado de metal",
      cubre: ["M25.5"],
      simple: String.raw`<p>Profundidad de corte (4 niveles) × velocidad de alimentación (3 niveles), 3 réplicas, 36 pruebas. Se quiere <strong>minimizar</strong> el acabado.</p>`,
      formal: String.raw`<p>Totales: filas (profundidad) $763, 808, 881, 944$; columnas (velocidad) $979, 1171, 1246$; gran total $3396$.</p>
<ul><li>$SC_A=(763^2+808^2+881^2+944^2)/9-3396^2/36=2125{,}1$</li>
<li>$SC_B=(979^2+1171^2+1246^2)/12-3396^2/36=3160{,}5$</li>
<li>$SC_{AB}=557{,}07$; $SC_T=6532{,}0$; $SC_E=689{,}33$.</li></ul>
<table class="tabla"><tr><th>FV</th><th>SC</th><th>GL</th><th>CM</th><th>$F_0$</th><th>p</th></tr>
<tr><td>B: velocidad</td><td>3160,5</td><td>2</td><td>1580,25</td><td>55,02</td><td>0,0000</td></tr>
<tr><td>A: profundidad</td><td>2125,1</td><td>3</td><td>708,37</td><td>24,66</td><td>0,0000</td></tr>
<tr><td>AB</td><td>557,07</td><td>6</td><td>92,84</td><td>3,23</td><td>0,018</td></tr>
<tr><td>Error</td><td>689,33</td><td>24</td><td>28,72</td><td></td><td></td></tr></table>`,
      ejemplo: String.raw`<p>Los tres efectos son significativos. A mayor velocidad y profundidad, peor acabado. Las condiciones óptimas son profundidad baja y velocidad baja. La interacción se ve en que las líneas de la gráfica tienen pendientes distintas (aparecen tantas líneas como niveles tenga el factor dibujado arriba).</p>`,
      r: {
        nota: "El ejemplo en R (datos de C7.3 s27; el curso muestra la tabla, aquí se reproduce con aov).",
        codigo: `prof <- factor(rep(c(0.15, 0.18, 0.21, 0.24), each = 9))
vel  <- factor(rep(rep(c(0.20, 0.25, 0.30), each = 3), times = 4))
acab <- c(74, 64, 60,  92, 86, 88,  99, 98, 102,
          79, 68, 73,  98, 104, 88, 104, 99, 95,
          82, 88, 92,  99, 108, 95, 108, 110, 99,
          99, 104, 96, 104, 110, 99, 114, 111, 107)
summary(aov(acab ~ prof * vel))`,
        rlab: "r-m25-acabado"
      },
      memoriza: String.raw`<p>4 × 3 acabado: $F_B=55{,}02$; $F_A=24{,}66$; $F_{AB}=3{,}23$ ($p=0{,}018$); $CME=28{,}72$ con 24 gl.</p>`,
      comprueba: {
        enunciado: "En el ejemplo del acabado (minimizar), ¿qué condición se recomienda?",
        opciones: ["Profundidad baja y velocidad baja", "Profundidad alta y velocidad alta", "Profundidad baja y velocidad alta", "Cualquiera: la interacción no es significativa"],
        correcta: 0,
        explicacion: "C7.3 s29: A mayor velocidad y profundidad, peores acabados."
      },
      verifica: [
        { que: "SC_A", js: "(763**2+808**2+881**2+944**2)/9-3396**2/36", esperado: 2125.11, tol: 0.01 },
        { que: "SC_B", js: "(979**2+1171**2+1246**2)/12-3396**2/36", esperado: 3160.5, tol: 0.01 },
        { que: "F_AB", r: `prof <- factor(rep(1:4, each = 9)); vel <- factor(rep(rep(1:3, each = 3), 4)); acab <- c(74,64,60,92,86,88,99,98,102,79,68,73,98,104,88,104,99,95,82,88,92,99,108,95,108,110,99,99,104,96,104,110,99,114,111,107); cat(round(summary(aov(acab ~ prof * vel))[[1]][3, 4], 2))`, esperado: 3.23, tol: 0.005 }
      ],
      fuente: [{ id: "C7.3", loc: "slides 27–29" }]
    },

    {
      id: "m25-c06",
      titulo: "Comparaciones LSD sin y con interacción",
      cubre: ["M25.6"],
      simple: String.raw`<p>Si la interacción <strong>no</strong> importa, se comparan las medias de cada factor (medias marginales). Si la interacción <strong>es significativa</strong>, hay que comparar los tratamientos dentro de cada nivel del otro factor.</p>`,
      formal: String.raw`<ul><li><strong>Sin interacción:</strong> $LSD=t_{\alpha/2,\,GL_E}\sqrt{2\,CME/r}$, con $r$ = n.º de observaciones de cada media marginal ($r=bn$ para A; $r=an$ para B).</li>
<li><strong>Con interacción:</strong> $LSD=t_{\alpha/2,\,GL_E}\sqrt{2\,CME/n}$, comparando medias de tratamientos dentro de cada nivel del otro factor ($n$ = réplicas).</li></ul>`,
      ejemplo: String.raw`<p>Acabado: medias de A $84{,}8;\ 89{,}8;\ 97{,}9;\ 104{,}9$ ($r=9$); de B $81{,}6;\ 97{,}6;\ 103{,}8$ ($r=12$). Sin interacción: A1 y A2 no difieren, el resto sí; en velocidad todos difieren. Considerando la interacción, en la velocidad media (B₂) solo A1–A3 y A1–A4 son significativas: las comparaciones cambian según el nivel del otro factor.</p>`,
      memoriza: String.raw`<p>Marginal: $r=bn$ o $an$. Con interacción: dentro de cada nivel, $r=n$.</p>`,
      comprueba: {
        enunciado: "En un factorial 4 × 3 con n = 3, sin considerar interacción, ¿cuántas observaciones tiene cada media marginal del factor A (4 niveles)?",
        opciones: ["9", "3", "12", "36"],
        correcta: 0,
        explicacion: "r = b × n = 3 × 3 = 9."
      },
      fuente: [{ id: "C7.3", loc: "slides 30–31" }]
    },

    {
      id: "m25-c07",
      titulo: "Factorial con tres factores: sedimentación 3 × 2 × 2",
      cubre: ["M25.7"],
      simple: String.raw`<p>Con tres factores aparecen 3 efectos principales, 3 interacciones dobles y 1 triple. Se leen igual: primero el ANOVA, luego las gráficas de los efectos significativos para elegir el mejor tratamiento.</p>`,
      formal: String.raw`$$Y_{ijkl}=\mu+\alpha_i+\beta_j+\gamma_k+(\alpha\beta)_{ij}+(\alpha\gamma)_{ik}+(\beta\gamma)_{jk}+(\alpha\beta\gamma)_{ijk}+\varepsilon_{ijkl}$$
<p>gl: A $a-1$, B $b-1$, C $c-1$, AB $(a-1)(b-1)$, AC $(a-1)(c-1)$, BC $(b-1)(c-1)$, ABC $(a-1)(b-1)(c-1)$, error $abc(n-1)$, total $abcn-1$. En R: <code>aov(Y ~ A * B * C)</code>.</p>`,
      ejemplo: String.raw`<p>Tipo de suspensión (A, 3 niveles), abertura de malla (B, 40/60) y temperatura de ciclaje (C, 0/30); 6 réplicas, 72 corridas; minimizar el % de sedimentación.</p>
<ul><li>Significativos: B ($p=2{,}16\cdot10^{-7}$), C ($p<2\cdot10^{-16}$), AB ($p=2{,}45\cdot10^{-9}$) y, en menor medida, BC ($p=0{,}0485$).</li>
<li>No influyen: A ($p=0{,}61$), AC ($p=0{,}24$), ABC ($p=0{,}34$): pueden eliminarse del modelo y enviarse al error.</li>
<li>Mejor tratamiento: suspensión intermedia, abertura baja, temperatura alta ($A=0$, $B=-1$, $C=1$).</li></ul>
<p>A no es significativo por sí solo, pero sí a través de AB: por eso igual importa elegir su nivel.</p>`,
      r: {
        nota: "Datos de la tabla de C7.3 s33 (imagen) cargados en R; la tabla ANOVA coincide con s35.",
        codigo: `summary(aov(Y ~ A * B * C))`,
        rlab: "r-m25-sedimentacion"
      },
      errores: ["Descartar un factor porque su efecto principal no es significativo cuando participa en una interacción significativa (A en el ejemplo)."],
      memoriza: String.raw`<p>3 factores: 7 efectos. Sedimentación: significativos B, C, AB (y BC); mejor $(A=0, B=-1, C=1)$.</p>`,
      comprueba: {
        enunciado: "Factorial 3 × 2 × 2 con 6 réplicas: ¿gl del error?",
        opciones: ["60", "71", "12", "66"],
        correcta: 0,
        explicacion: "abc(n − 1) = 12 · 5 = 60."
      },
      fuente: [{ id: "C7.3", loc: "slides 33–36" }]
    },

    {
      id: "m25-c08",
      titulo: "Factorial general con K factores y escasez de efectos",
      cubre: ["M25.8"],
      simple: String.raw`<p>Con más factores el número de interacciones crece muy rápido, pero en la práctica las interacciones de orden alto casi nunca importan.</p>`,
      formal: String.raw`<p>Para K factores el ANOVA incluye todos los efectos principales, todas las interacciones de 2, de 3, … hasta la de K factores; error con $abc\cdots k\,(n-1)$ gl. El <strong>principio de escasez de efectos</strong> (sparsity) sugiere que las interacciones de orden alto suelen ser despreciables, lo que motiva los diseños fraccionados $2^{k-p}$.</p>`,
      memoriza: String.raw`<p>Escasez de efectos: interacciones altas ≈ 0 ⇒ fraccionados $2^{k-p}$.</p>`,
      comprueba: {
        enunciado: "¿Qué dice el principio de escasez de efectos?",
        opciones: ["Que las interacciones de orden alto suelen ser despreciables", "Que los efectos principales nunca son significativos", "Que basta una réplica siempre", "Que no hay que aleatorizar"],
        correcta: 0,
        explicacion: "C7.3 s37."
      },
      fuente: [{ id: "C7.3", loc: "slide 37" }]
    }
  ],

  cuando: String.raw`<p><strong>Cómo leer un factorial:</strong> (1) ANOVA: mirar primero la interacción de mayor orden significativa; (2) si hay interacción, elegir niveles con la gráfica de interacción y comparar dentro de cada nivel; (3) si no hay, analizar cada factor con su gráfica de efectos principales y las medias marginales; (4) los términos no significativos pueden mandarse al error.</p>`
});
