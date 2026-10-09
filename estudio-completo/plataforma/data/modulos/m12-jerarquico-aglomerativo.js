/* ============================================================================
   M12 · Clustering jerárquico aglomerativo (P2)
   Fuentes abiertas para redactar: C5.1 slides 19–32 · S5.1 líneas 61–116 ·
   AY5-E P1 y AY5-R l.51–62 (average linkage, que no tiene slide propia).
   Los números se recalculan en tools/verificar_numeros.js.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m12-jerarquico-aglomerativo",
  orden: 12,
  titulo: "Clustering jerárquico aglomerativo",
  descripcion: "Ir uniendo los clústeres más cercanos, de abajo hacia arriba, y dibujarlo como dendrograma. Qué cambia según cómo se mide la distancia entre clústeres.",
  pruebas: ["P2"],
  prioridad: "alta",
  fuentes: [{ id: "C5.1", loc: "slides 19–32" }, { id: "S5.1", loc: "líneas 61–116" }, { id: "AY5-E", loc: "P1" }],

  conceptos: [
    {
      id: "m12-c01",
      titulo: "Aglomerativo vs. desagregativo y el dendrograma",
      figura: { tipo: "dendrograma", ancha: true, corte: true, corteInicial: 1, ejeMax: 3.6, ejePuntos: "las 5 empresas de la clase",
        hojas: ["E1", "E2", "E5", "E7", "E8"], puntos: { E1: [-0.79, -1.29], E2: [-1.02, -0.68], E5: [0.85, -1.29], E7: [0.85, 0.99], E8: [1.13, 1.29] },
        fusiones: [["E7", "E8", 0.42], ["E1", "E2", 0.65], [2, "E5", 1.97], [3, 1, 3.22]],
        pie: "Dendrograma (complete linkage) de las 5 empresas. Mueve la altura del corte: el número de ramas que cruza la línea es el número de clústeres." },
      cubre: ["M12.1"],
      simple: String.raw`<p>Los métodos jerárquicos construyen un árbol de fusiones o divisiones. Si parten de $n$ clústeres de un dato y los van uniendo, son <strong>aglomerativos</strong> (de abajo hacia arriba). Si parten de un solo clúster y lo van dividiendo, son <strong>desagregativos</strong> (de arriba hacia abajo, como DIANA).</p>`,
      formal: String.raw`<ul>
  <li><strong>Aglomerativo:</strong> inicio $n$ clústeres; en cada iteración se unen los dos más similares; fin: un solo clúster.</li>
  <li><strong>Desagregativo:</strong> inicio 1 clúster; se divide el más heterogéneo; fin: $n$ clústeres.</li>
  <li>Ambos producen un <strong>dendrograma</strong>: árbol binario que muestra la jerarquía; la altura de cada fusión es la distancia entre los clústeres unidos. Cortarlo a una altura (o con <code>cutree(hc, k)</code>) da los clústeres.</li>
</ul>`,
      errores: ["Creer que hay que fijar $k$ antes de construir el dendrograma: se decide al cortarlo."],
      memoriza: String.raw`<p>Aglomerativo = bottom-up ($n\to1$). Desagregativo = top-down ($1\to n$). Dendrograma + corte = clústeres.</p>`,
      comprueba: {
        enunciado: "¿Cómo comienza un método jerárquico aglomerativo?",
        opciones: ["Con cada observación como un clúster individual", "Con todas las observaciones en un clúster", "Con k centroides aleatorios", "Con la matriz de covarianza"],
        correcta: 0,
        explicacion: "Parte con n clústeres y los une de a pares."
      },
      fuente: [{ id: "C5.1", loc: "slide 19" }]
    },

    {
      id: "m12-c02",
      titulo: "Single linkage (vecino más cercano)",
      figura: { tipo: "dendrograma", ancha: true, donde: "ejemplo", pasos: true, enlace: "single", ejeMax: 3.6, ejePuntos: "línea roja = el par más cercano",
        hojas: ["E1", "E2", "E5", "E7", "E8"], puntos: { E1: [-0.79, -1.29], E2: [-1.02, -0.68], E5: [0.85, -1.29], E7: [0.85, 0.99], E8: [1.13, 1.29] },
        fusiones: [["E7", "E8", 0.42], ["E1", "E2", 0.65], [2, "E5", 1.64], [3, 1, 2.28]],
        textos: ["Inicio: cada empresa es su propio clúster.",
          "Se unen E7 y E8: son el par más cercano (0,42).",
          "Se unen E1 y E2 (0,65).",
          "E5 se une a {E1, E2}: la distancia es el mínimo entre 1,64 (a E1) y 1,97 (a E2) = 1,64.",
          "Última fusión: la menor distancia cruzada entre los dos clústeres es 2,28."],
        pie: "Single linkage paso a paso: el dendrograma se construye de abajo hacia arriba y la altura de cada unión es la distancia de fusión." },
      cubre: ["M12.2"],
      simple: String.raw`<p>La distancia entre dos clústeres es la de sus dos puntos <strong>más cercanos</strong>. Tiende a formar clústeres largos y filamentosos (<strong>efecto cadena</strong>).</p>`,
      formal: String.raw`$$d(A,B)=\min_{i\in A,\ j\in B}d(i,j)$$
<p>Algoritmo: cada observación es un clúster; unir los dos con $d$ mínima; recalcular (mínimo); repetir hasta tener uno. En R: <code>hclust(dist_matriz, method = "single")</code>, <code>cutree(hc, k = 2)</code>.</p>`,
      ejemplo: String.raw`<p>5 empresas estandarizadas (C5.1 s22–24): $d(E_7,E_8)=0{,}42$, $d(E_1,E_2)=0{,}65$, $d(E_5,E_1)=1{,}64$, ….</p>
<ol>
  <li>Se unen $\{E_7,E_8\}$ a $0{,}42$.</li>
  <li>Se unen $\{E_1,E_2\}$ a $0{,}65$.</li>
  <li>$d(\{E_1,E_2\},E_5)=\min(1{,}64;1{,}97)=1{,}64$ ⇒ se une $E_5$ a $\{E_1,E_2\}$.</li>
  <li>Último paso: $\min$ de las distancias cruzadas $=2{,}28$.</li>
</ol>
<p>Alturas: $0{,}42\to0{,}65\to1{,}64\to2{,}28$. $E_5$ se pegó por cercanía a $E_1$: efecto cadena.</p>`,
      r: {
        nota: "Código de C5.1 slide 25 (con datos estandarizados con n − 1; ver Laboratorio R para reproducir las alturas de la slide).",
        codigo: `hc_single <- hclust(dist_matriz, method = "single")
cutree(hc_single, k = 2)`,
        rlab: "r-m12-linkage"
      },
      errores: ["Olvidar que al recalcular se toma el <strong>mínimo</strong> entre los miembros."],
      memoriza: String.raw`<p>Single = mínimo. Fusiones agresivas, clústeres alargados (efecto cadena).</p>`,
      comprueba: {
        enunciado: "¿Qué efecto característico tiene el single linkage?",
        opciones: ["Efecto cadena: clústeres largos y filamentosos", "Clústeres esféricos y compactos", "Inversiones en el dendrograma", "Clústeres de igual tamaño"],
        correcta: 0,
        explicacion: "Al usar la distancia mínima, basta un punto cercano para unir dos clústeres."
      },
      verifica: [{ que: "d({E1,E2},E5) single", js: "Math.min(1.64,1.97)", esperado: 1.64, tol: 1e-9 }],
      fuente: [{ id: "C5.1", loc: "slides 21–25" }]
    },

    {
      id: "m12-c03",
      titulo: "Complete linkage (vecino más lejano)",
      figura: { tipo: "dendrograma", ancha: true, donde: "ejemplo", pasos: true, enlace: "complete", ejeMax: 3.6, ejePuntos: "línea roja = el par más lejano",
        hojas: ["E1", "E2", "E5", "E7", "E8"], puntos: { E1: [-0.79, -1.29], E2: [-1.02, -0.68], E5: [0.85, -1.29], E7: [0.85, 0.99], E8: [1.13, 1.29] },
        fusiones: [["E7", "E8", 0.42], ["E1", "E2", 0.65], [2, "E5", 1.97], [3, 1, 3.22]],
        textos: ["Inicio: cada empresa es su propio clúster.",
          "Se unen E7 y E8 (0,42): con clústeres de un solo elemento, single y complete coinciden.",
          "Se unen E1 y E2 (0,65).",
          "E5 se une a {E1, E2}: ahora la distancia es el máximo entre 1,64 y 1,97 = 1,97.",
          "Última fusión a 3,22: la mayor distancia cruzada (E1–E8). Las mismas uniones que single, pero a mayor altura."],
        pie: "Complete linkage con las mismas empresas: compara las alturas con las de single (1,64 y 2,28)." },
      cubre: ["M12.3"],
      simple: String.raw`<p>La distancia entre clústeres es la de sus dos puntos <strong>más lejanos</strong>. Es más conservador: forma clústeres compactos y evita el efecto cadena.</p>`,
      formal: String.raw`$$d(A,B)=\max_{i\in A,\ j\in B}d(i,j)$$
<p>En R: <code>hclust(dist_matriz, method = "complete")</code>.</p>`,
      ejemplo: String.raw`<p>Mismas 5 empresas (C5.1 s27): $\{E_7,E_8\}$ a $0{,}42$; $\{E_1,E_2\}$ a $0{,}65$; $d(\{E_1,E_2\},E_5)=\max(1{,}64;1{,}97)=1{,}97$ ⇒ se une $E_5$; último paso $\max(3{,}22;2{,}92;2{,}60)=3{,}22$. Alturas $0{,}42\to0{,}65\to1{,}97\to3{,}22$ (contra single: $\dots1{,}64\to2{,}28$). Complete da distancias de fusión mayores.</p>`,
      errores: ["Confundir complete con single: complete usa el máximo."],
      memoriza: String.raw`<p>Complete = máximo. Fusiones conservadoras, clústeres compactos.</p>`,
      comprueba: {
        enunciado: "d(E1,E5) = 1,64 y d(E2,E5) = 1,97. ¿Cuál es d({E1,E2}, E5) con complete linkage?",
        opciones: ["1,97", "1,64", "1,80", "0,65"],
        correcta: 0,
        explicacion: "Complete toma el máximo de las distancias entre miembros."
      },
      verifica: [{ que: "d({E1,E2},E5) complete", js: "Math.max(1.64,1.97)", esperado: 1.97, tol: 1e-9 }],
      fuente: [{ id: "C5.1", loc: "slides 26–28" }]
    },

    {
      id: "m12-c04",
      titulo: "Promedio (average linkage)",
      figura: { tipo: "enlaces",
        pie: "Los cuatro criterios miden lo mismo (la distancia entre dos clústeres) de formas distintas." },
      cubre: ["M12.4"],
      simple: String.raw`<p>La distancia entre dos clústeres es el <strong>promedio de todas las distancias entre pares</strong> (uno de cada clúster). Queda entre single y complete.</p>`,
      formal: String.raw`$$d(A,B)=\frac1{|A||B|}\sum_{i\in A}\sum_{j\in B}d(i,j)$$
<p class="ayuda">La clase lista este método entre los «5 métodos» de la figura de C5.1 slide 20, pero no le dedica slide, ejemplo ni código; aparece en la Ayudantía 5 (<code>hclust(method = "average")</code>) y en pruebas pasadas.</p>`,
      ejemplo: String.raw`<p>Ayudantía 5, P1 (tiendas A(1,1), B(2,6), C(4,3), D(7,4), E(5,1), distancia Manhattan): lo más cercano es $C$–$E$ ($3$) en los tres métodos. Después de unirlos, las distancias al clúster $\{C,E\}$ son:</p>
<table class="tabla"><thead><tr><th></th><th>A</th><th>B</th><th>D</th></tr></thead><tbody>
<tr><td>Single (mín.)</td><td>$\min(5,4)=4$</td><td>$\min(5,8)=5$</td><td>$\min(4,5)=4$</td></tr>
<tr><td>Complete (máx.)</td><td>$5$</td><td>$8$</td><td>$5$</td></tr>
<tr><td>Average (prom.)</td><td>$4{,}5$</td><td>$6{,}5$</td><td>$4{,}5$</td></tr></tbody></table>
<p>Hay <strong>empates</strong> (A y D están igual de cerca de $\{C,E\}$): el orden de la siguiente fusión depende del desempate del programa.</p>`,
      r: {
        nota: "Alturas de fusión de la Ayudantía 5, P1, en los tres métodos.",
        codigo: `P <- data.frame(X = c(1, 2, 4, 7, 5), Y = c(1, 6, 3, 4, 1), row.names = LETTERS[1:5])
d <- dist(P, "manhattan")
sapply(c("single", "complete", "average"), function(m) hclust(d, method = m)$height)`,
        rlab: "r-m12-linkage"
      },
      errores: ["Promediar las distancias a los centroides en vez de todas las distancias entre pares (eso es otro método)."],
      memoriza: String.raw`<p>Average = promedio de todas las distancias entre pares de miembros de ambos clústeres.</p>`,
      comprueba: {
        enunciado: "d(A,C)=5 y d(A,E)=4. ¿Cuánto es d(A, {C,E}) con average linkage?",
        opciones: ["4,5", "4", "5", "9"],
        correcta: 0,
        explicacion: "Promedio de 5 y 4 = 4,5."
      },
      verifica: [{ que: "average A–{C,E}", js: "(5+4)/2", esperado: 4.5, tol: 1e-9 }, { que: "average B–{C,E}", js: "(5+8)/2", esperado: 6.5, tol: 1e-9 }],
      fuente: [{ id: "C5.1", loc: "slide 20 (figura)" }, { id: "AY5-E", loc: "P1" }, { id: "AY5-R", loc: "líneas 51–62" }]
    },

    {
      id: "m12-c05",
      titulo: "Centroide y Ward",
      cubre: ["M12.5", "M12.6"],
      simple: String.raw`<p><strong>Centroide:</strong> mide la distancia entre los puntos medios de los clústeres; puede producir <em>inversiones</em> en el dendrograma. <strong>Ward:</strong> une los clústeres cuya fusión aumenta lo menos posible la variabilidad interna; da clústeres compactos y de tamaño parecido.</p>`,
      formal: String.raw`<ul>
  <li><strong>Centroide:</strong> $d(A,B)=d(\mu_A,\mu_B)$. No es una métrica (puede violar la desigualdad triangular). El dendrograma puede mostrar <strong>inversiones</strong> (ramas que se cruzan): una fusión posterior ocurre a menor altura que una anterior. Barato de calcular. En R: <code>method = "centroid"</code> y <code>aggregate(datos, by = list(cluster = clusters), FUN = mean)</code> para los centroides finales.</li>
  <li><strong>Ward:</strong> busca clústeres de tamaño similar (penaliza fusiones desiguales), compactos y bien definidos; estable y muy usado. No es una métrica. En R: <code>method = "ward.D2"</code> (suma de cuadrados euclídea; se usa con distancias euclídeas).</li>
</ul>`,
      ejemplo: String.raw`<p>Con las 8 empresas estandarizadas (<code>scale</code>), las alturas del método del centroide son $\dots;\,1{,}385;\,1{,}510;\,1{,}383$: la última es <strong>menor</strong> que la anterior, es decir, una inversión. Ward da alturas siempre crecientes ($\dots;\,2{,}324;\,2{,}716;\,3{,}733$).</p>`,
      r: {
        nota: "Códigos de C5.1 slides 30 y 32 aplicados a las 8 empresas.",
        codigo: `hc_centroid <- hclust(dist_matriz, method = "centroid")
hc_ward <- hclust(dist_matriz, method = "ward.D2")
hc_centroid$height
hc_ward$height`,
        rlab: "r-m12-linkage"
      },
      errores: ["Decir que el centroide siempre da dendrogramas monótonos: puede tener inversiones."],
      memoriza: String.raw`<p>Centroide: distancia entre centroides, no métrica, puede dar inversiones. Ward (<code>ward.D2</code>): compactos y de tamaño similar, no métrica.</p>`,
      comprueba: {
        enunciado: "¿Qué método jerárquico puede producir inversiones en el dendrograma?",
        opciones: ["Centroide", "Ward", "Single", "Complete"],
        correcta: 0,
        explicacion: "Con centroides, una fusión posterior puede ocurrir a menor altura que una anterior."
      },
      fuente: [{ id: "C5.1", loc: "slides 29–32" }]
    }
  ],

  cuando: String.raw`<div class="tabla-scroll"><table class="tabla">
<thead><tr><th>Método</th><th>Distancia entre clústeres</th><th>Rasgo</th></tr></thead>
<tbody>
<tr><td>Single</td><td>mínima</td><td>Efecto cadena</td></tr>
<tr><td>Complete</td><td>máxima</td><td>Compactos</td></tr>
<tr><td>Average</td><td>promedio de pares</td><td>Intermedio</td></tr>
<tr><td>Centroide</td><td>entre centroides</td><td>No métrica; inversiones</td></tr>
<tr><td>Ward</td><td>aumento de la suma de cuadrados</td><td>Tamaños similares, compactos</td></tr>
</tbody></table></div>`,

  errores: [
    { texto: "El centroide puede mostrar inversiones; single, complete y Ward no.", fuente: [{ id: "C5.1", loc: "slide 29" }] }
  ]
});
