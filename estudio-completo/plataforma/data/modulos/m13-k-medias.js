/* ============================================================================
   M13 · K-medias y elección de k (P2)
   Fuentes abiertas para redactar: C5.2 slides 3–18 · S5.2 líneas 14–36 ·
   AY5-E P4 (e–g) · AY5-R líneas 155–251 · EJ-P2 P11–P12 · PR-P2-Q12 pregunta 1.
   Los números se recalculan en tools/verificar_numeros.js.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m13-k-medias",
  orden: 13,
  titulo: "K-medias y elección de k",
  descripcion: "Partir los datos directamente en k grupos, iterando entre asignar y recalcular centroides; y cómo elegir k con el método del codo y el coeficiente de silueta.",
  pruebas: ["P2"],
  prioridad: "alta",
  fuentes: [{ id: "C5.2", loc: "slides 3–18" }, { id: "S5.2", loc: "líneas 14–36" }, { id: "AY5-E", loc: "P4 e–g" }, { id: "EJ-P2", loc: "P11–P12" }, { id: "PR-P2-Q12", loc: "pregunta 1" }],

  conceptos: [
    {
      id: "m13-c01",
      titulo: "Qué hace K-medias: método de partición",
      cubre: ["M13.1"],
      simple: String.raw`<p>A diferencia de los métodos jerárquicos, K-medias <strong>particiona directamente</strong> los datos en $k$ grupos que tú defines de antemano, buscando que cada grupo sea lo más compacto posible alrededor de su centro (centroide).</p>`,
      formal: String.raw`<p>Busca la partición $C_1,\dots,C_k$ que minimiza la variabilidad interna total:</p>
$$\min \sum_{j=1}^{k}\ \sum_{i\in C_j}\lVert x_i-\mu_j\rVert^{2}$$
<p>donde $\mu_j$ es el <strong>centroide</strong> (la media) del clúster $C_j$. Características principales:</p>
<ul>
  <li><strong>Requiere especificar $k$ de antemano.</strong></li>
  <li>Es <strong>iterativo</strong>: alterna entre asignar puntos y recalcular centroides.</li>
  <li>Converge a un <strong>óptimo local</strong> (depende de la inicialización).</li>
  <li>Muy eficiente computacionalmente: $O(n\cdot k\cdot t\cdot p)$, con $t$ = iteraciones.</li>
</ul>`,
      memoriza: String.raw`<p>K-medias minimiza la suma de distancias <em>al cuadrado</em> de cada punto a su centroide (la WSS). Hay que darle $k$.</p>`,
      comprueba: {
        enunciado: "¿Qué cantidad minimiza K-medias?",
        opciones: [
          "La suma de las distancias al cuadrado de cada observación al centroide de su clúster",
          "La distancia mínima entre dos clústeres",
          "El número de clústeres k",
          "La distancia promedio entre centroides"
        ],
        correcta: 0,
        explicacion: "El objetivo es la variabilidad interna total: Σ_j Σ_{i∈C_j} ‖x_i − μ_j‖². El número k se entrega; no se optimiza."
      },
      fuente: [{ id: "C5.2", loc: "slide 3" }]
    },

    {
      id: "m13-c02",
      titulo: "El algoritmo paso a paso (ejemplo con 5 empresas, k = 2)",
      cubre: ["M13.1", "M13.2"],
      simple: String.raw`<ol>
  <li><strong>Inicialización:</strong> elegir $k$ centroides iniciales (aleatorios o con K-Means++).</li>
  <li><strong>Asignación:</strong> cada observación se asigna al centroide más cercano (distancia euclídea).</li>
  <li><strong>Actualización:</strong> recalcular cada centroide como la media de las observaciones de su clúster.</li>
  <li><strong>Convergencia:</strong> repetir 2–3 hasta que las asignaciones no cambien (o el cambio en WSS sea menor que $\varepsilon$).</li>
</ol>`,
      formal: String.raw`<p><strong>Convergencia garantizada:</strong> K-medias siempre converge porque la WSS decrece en cada iteración y está acotada inferiormente por 0. Pero puede converger a un óptimo <strong>local</strong>, no necesariamente global.</p>`,
      ejemplo: String.raw`<p>Datos estandarizados de la slide: E1 $=(-0{,}79;\,-1{,}29)$, E2 $=(-1{,}02;\,-0{,}68)$, E5 $=(0{,}85;\,-1{,}29)$, E7 $=(0{,}85;\,0{,}99)$, E8 $=(1{,}13;\,1{,}29)$. Centroides iniciales: $\mu_1=$ E1 y $\mu_2=$ E8.</p>
<p><strong>Iteración 1 — asignar al centroide más cercano</strong></p>
<div class="tabla-scroll"><table class="tabla tabla-datos">
<thead><tr><th>Empresa</th><th>$d(\cdot,\mu_1)$</th><th>$d(\cdot,\mu_2)$</th><th>Clúster</th></tr></thead>
<tbody>
<tr><td>E1</td><td>0,00</td><td>3,22</td><td>1</td></tr>
<tr><td>E2</td><td>0,65</td><td>2,92</td><td>1</td></tr>
<tr><td>E5</td><td>1,64</td><td>2,60</td><td>1</td></tr>
<tr><td>E7</td><td>2,81</td><td>0,42</td><td>2</td></tr>
<tr><td>E8</td><td>3,22</td><td>0,00</td><td>2</td></tr>
</tbody></table></div>
<p>Por ejemplo $d(\text{E2},\mu_1)=\sqrt{(-1{,}02+0{,}79)^2+(-0{,}68+1{,}29)^2}=0{,}65$. Resultado: clúster 1 $=\{$E1, E2, E5$\}$, clúster 2 $=\{$E7, E8$\}$.</p>
<p><strong>Recalcular centroides (media de cada clúster)</strong></p>
$$\mu_1=\left(\tfrac{-0{,}79-1{,}02+0{,}85}{3};\ \tfrac{-1{,}29-0{,}68-1{,}29}{3}\right)=(-0{,}32;\,-1{,}09)\qquad \mu_2=\left(\tfrac{0{,}85+1{,}13}{2};\ \tfrac{0{,}99+1{,}29}{2}\right)=(0{,}99;\,1{,}14)$$
<p><strong>Iteración 2 — reasignar con los nuevos centroides</strong></p>
<div class="tabla-scroll"><table class="tabla tabla-datos">
<thead><tr><th>Empresa</th><th>$d(\cdot,\mu_1)$</th><th>$d(\cdot,\mu_2)$</th><th>Clúster</th></tr></thead>
<tbody>
<tr><td>E1</td><td>0,51</td><td>3,02</td><td>1 (sin cambio)</td></tr>
<tr><td>E2</td><td>0,81</td><td>2,72</td><td>1 (sin cambio)</td></tr>
<tr><td>E5</td><td>1,19</td><td>2,44</td><td>1 (sin cambio)</td></tr>
<tr><td>E7</td><td>2,39</td><td>0,21</td><td>2 (sin cambio)</td></tr>
<tr><td>E8</td><td>2,79</td><td>0,21</td><td>2 (sin cambio)</td></tr>
</tbody></table></div>
<p>Las asignaciones no cambiaron ⇒ <strong>convergencia en 2 iteraciones</strong>. Resultado final: $\{$E1, E2, E5$\}$ y $\{$E7, E8$\}$ (alta inversión, altas ventas); coincide con lo que encontraron Single y Complete Linkage.</p>
<p class="ayuda">Estos valores estandarizados son los de la slide (dividen por la desviación con divisor $n$). <code>scale()</code> en R divide por la desviación con $n-1$ y da E1 $=(-0{,}74;\,-1{,}21)$: ver ⚠️ Diferencias entre fuentes.</p>`,
      figura: { tipo: "kmedias", donde: "ejemplo", ejes: ["inversión (estandarizada)", "ventas (estandarizadas)"],
        puntos: { E1: [-0.79, -1.29], E2: [-1.02, -0.68], E5: [0.85, -1.29], E7: [0.85, 0.99], E8: [1.13, 1.29] },
        iniciales: [["E1", "E8"], ["E1", "E2"]],
        pie: "El ejemplo de la clase, paso a paso. Con otra inicialización (E1 y E2) el algoritmo necesita una iteración más para llegar al mismo resultado." },
      errores: [
        "Recalcular el centroide con todos los puntos en vez de solo los asignados a ese clúster.",
        "Detenerse tras la primera asignación: hay que reasignar con los centroides nuevos y comprobar que nada cambia.",
        "Afirmar que K-medias encuentra «el mejor» agrupamiento: converge siempre, pero a un óptimo local."
      ],
      memoriza: String.raw`<p>Asignar → recalcular → repetir hasta que las asignaciones no cambien. Converge siempre, pero a un óptimo <strong>local</strong>.</p>`,
      comprueba: {
        enunciado: "En K-medias, ¿cuándo se detiene el algoritmo?",
        opciones: [
          "Cuando las asignaciones de las observaciones ya no cambian entre una iteración y la siguiente",
          "Cuando la WSS llega a 0",
          "Cuando todos los clústeres tienen el mismo tamaño",
          "Después de exactamente k iteraciones"
        ],
        correcta: 0,
        explicacion: "El criterio de convergencia es que las asignaciones no cambien (o que el cambio en WSS sea menor que ε). La WSS solo llega a 0 cuando k = n."
      },
      fuente: [{ id: "C5.2", loc: "slides 4–6" }]
    },

    {
      id: "m13-c03",
      titulo: "Inicialización: K-Means++ y nstart",
      cubre: ["M13.3"],
      simple: String.raw`<p><strong>Problema:</strong> la inicialización aleatoria puede converger a óptimos locales malos si los centroides iniciales quedan muy juntos. Dos remedios: elegir centroides iniciales bien dispersos (<strong>K-Means++</strong>) o probar muchas inicializaciones y quedarse con la mejor (<code>nstart</code>).</p>`,
      formal: String.raw`<p><strong>K-Means++</strong> (Arthur &amp; Vassilvitskii, 2007):</p>
<ol>
  <li>Elegir el primer centroide aleatoriamente entre las observaciones.</li>
  <li>Para cada punto $x$, calcular $D(x)$ = distancia al centroide más cercano ya elegido.</li>
  <li>Elegir el siguiente centroide con probabilidad proporcional a $D(x)^2$.</li>
  <li>Repetir 2–3 hasta tener $k$ centroides.</li>
  <li>Ejecutar K-medias estándar con esos centroides iniciales.</li>
</ol>
<p>Resultado: centroides iniciales bien dispersos ⇒ convergencia más rápida y mejores resultados.</p>`,
      r: {
        nota: "<code>nstart = 25</code> ejecuta 25 inicializaciones distintas y retorna la mejor. K-Means++ explícito está en el paquete <code>ClusterR</code>.",
        codigo: `km <- kmeans(datos_norm, centers = 3, nstart = 25)

# K-Means++ explícito (paquete ClusterR)
library(ClusterR)
km_pp <- KMeans_rcpp(datos_norm, clusters = 3, initializer = "kmeans++")
print(km_pp$clusters)`
      },
      errores: [
        "Repetir que «<code>kmeans()</code> usa K-Means++ por defecto» (lo dice la slide 7): la ayuda de <code>kmeans</code> en R indica que, si <code>centers</code> es un número, se eligen filas distintas <strong>al azar</strong> como centros iniciales. Ver ⚠️ Diferencias entre fuentes."
      ],
      comprueba: {
        enunciado: "¿Qué hace el argumento nstart = 25 en kmeans()?",
        opciones: [
          "Ejecuta 25 inicializaciones distintas y retorna la mejor",
          "Limita el algoritmo a 25 iteraciones",
          "Forma 25 clústeres",
          "Usa 25 observaciones como muestra"
        ],
        correcta: 0,
        explicacion: "nstart controla cuántas veces se parte desde centroides iniciales distintos; se queda con la solución de menor WSS. El número de clústeres es centers."
      },
      fuente: [{ id: "C5.2", loc: "slide 7" }, { id: "S5.2", loc: "líneas 39–45" }]
    },

    {
      id: "m13-c04",
      titulo: "K-medias vs. jerárquicos: ventajas, limitaciones y cuándo usar",
      cubre: ["M13.4"],
      simple: String.raw`<div class="tabla-scroll"><table class="tabla">
<thead><tr><th>K-medias — ventajas</th><th>K-medias — limitaciones</th></tr></thead>
<tbody><tr>
<td><ul>
  <li>Rápido y escalable a grandes datasets (millones de observaciones).</li>
  <li>Fácil de implementar e interpretar.</li>
  <li>Funciona bien con clústeres esféricos y de tamaño similar.</li>
  <li>Resultado directo: $k$ grupos sin necesidad de cortar un dendrograma.</li>
</ul></td>
<td><ul>
  <li>Requiere especificar $k$ de antemano.</li>
  <li>Sensible a la inicialización (se mitiga con K-Means++ o <code>nstart</code>).</li>
  <li>Asume clústeres esféricos de tamaño similar.</li>
  <li>Sensible a outliers (afectan los centroides).</li>
  <li>No produce dendrograma (no hay jerarquía).</li>
</ul></td>
</tr></tbody></table></div>`,
      formal: String.raw`<p><strong>¿Cuándo usar cada uno?</strong></p>
<ul>
  <li><strong>Jerárquicos:</strong> datos pequeños o medianos, se quiere explorar distintos $k$ visualmente (dendrograma), clústeres de forma irregular.</li>
  <li><strong>K-medias:</strong> datos grandes, se tiene idea del $k$, clústeres esféricos, se busca eficiencia computacional.</li>
</ul>`,
      memoriza: String.raw`<p>Para «mencione dos ventajas y dos desventajas» (ejercicios de preparación P2, problema 11): rápido/escalable y simple de interpretar; requiere $k$ de antemano y es sensible a outliers y a la inicialización.</p>`,
      comprueba: {
        tipo: "vf",
        enunciado: "K-medias entrega un dendrograma que permite elegir k después de ejecutar el algoritmo.",
        correcta: false,
        explicacion: "No hay jerarquía ni dendrograma: k se fija antes de ejecutar. Explorar distintos k cortando un dendrograma es propio de los métodos jerárquicos."
      },
      fuente: [{ id: "C5.2", loc: "slide 8" }, { id: "EJ-P2", loc: "P11" }]
    },

    {
      id: "m13-c05",
      titulo: "K-medias en R: kmeans() y sus resultados",
      cubre: ["M13.5"],
      simple: String.raw`<p>Tres pasos: <strong>estandarizar siempre</strong> (<code>scale</code>), ejecutar <code>kmeans</code> con <code>centers</code> = $k$ y <code>nstart = 25</code>, y leer tres componentes del resultado.</p>`,
      formal: String.raw`<div class="tabla-scroll"><table class="tabla">
<thead><tr><th>Componente</th><th>Qué devuelve</th></tr></thead>
<tbody>
<tr><td><code>km$cluster</code></td><td>Asignación de cada observación (número de clúster)</td></tr>
<tr><td><code>km$centers</code></td><td>Centroides finales (en la escala en que se entregaron los datos)</td></tr>
<tr><td><code>km$tot.withinss</code></td><td>WSS total</td></tr>
</tbody></table></div>
<p><code>fviz_cluster()</code> (paquete <code>factoextra</code>) grafica los clústeres; usa PCA automáticamente si hay más de 2 variables.</p>`,
      r: {
        nota: "Código del script de la clase 5.2 con las 8 empresas. Se agregó <code>set.seed(123)</code> para que la numeración de los clústeres sea reproducible (el script no fija semilla).",
        codigo: `datos <- data.frame(
  Inversion = c(16, 12, 10, 12, 45, 50, 45, 50),
  Ventas    = c(10, 14, 22, 25, 10, 15, 25, 27))
rownames(datos) <- c("E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8")

datos_norm <- scale(datos)          # siempre estandarizar

set.seed(123)
km <- kmeans(datos_norm, centers = 3, nstart = 25)
print(km$cluster)                   # asignación de cada observación
print(km$centers)                   # centroides finales
print(km$tot.withinss)              # WSS total`,
        salida: `E1 E2 E3 E4 E5 E6 E7 E8
 3  3  3  3  1  1  2  2
   Inversion     Ventas
1  0.9271262 -0.8534188
2  0.9271262  1.0667735
3 -0.9271262 -0.1066774
[1] 3.345317`,
        rlab: "r-m13-kmeans"
      },
      lectura: String.raw`<ul>
  <li><strong>Asignación:</strong> $\{$E1, E2, E3, E4$\}$, $\{$E5, E6$\}$ y $\{$E7, E8$\}$.</li>
  <li><strong>Centroides</strong> (en unidades estandarizadas): el clúster 3 tiene inversión bajo la media ($-0{,}93$); los clústeres 1 y 2 tienen inversión alta ($0{,}93$) y se separan por ventas: bajas ($-0{,}85$) y altas ($1{,}07$).</li>
  <li><strong>WSS total</strong> $=3{,}35$: sirve para comparar con otros valores de $k$ (método del codo), no se interpreta sola.</li>
  <li>El <em>número</em> de cada clúster (1, 2, 3) es arbitrario: con otra semilla pueden salir permutados; lo que importa es qué observaciones quedan juntas.</li>
</ul>
<p><strong>Volver a las unidades originales</strong> (pauta Prueba 2): si se normalizó con min–máx, $y=\dfrac{x-\min}{\max-\min}$, la transformación inversa es $x=y(\max-\min)+\min$. Por ejemplo, con mín $=100$ y máx $=200$, un centroide de $0{,}2$ corresponde a $0{,}2\cdot100+100=120$.</p>`,
      errores: [
        "Interpretar los centroides estandarizados como si estuvieran en las unidades originales.",
        "Olvidar estandarizar: sin escala domina la variable de valores más grandes."
      ],
      comprueba: {
        enunciado: "¿Qué componente del resultado de kmeans() se usa para construir el gráfico del codo?",
        opciones: ["<code>km$tot.withinss</code>", "<code>km$cluster</code>", "<code>km$centers</code>", "<code>km$size</code>"],
        correcta: 0,
        explicacion: "El codo grafica la WSS total contra k, y la WSS total está en <code>km$tot.withinss</code>."
      },
      fuente: [{ id: "C5.2", loc: "slide 9" }, { id: "S5.2", loc: "líneas 14–36" }, { id: "PR-P2-Q12", loc: "pregunta 1 d" }]
    },

    {
      id: "m13-c06",
      titulo: "Elegir k: método del codo y WSS",
      cubre: ["M13.6"],
      simple: String.raw`<p>Se busca el $k$ que equilibra dos criterios: <strong>compactación interna</strong> (clústeres cohesivos, baja varianza dentro) y <strong>simplicidad</strong> (evitar demasiados clústeres: parsimonia). Al aumentar $k$ la varianza intra-clúster siempre baja, porque subdividimos más; el <strong>«codo»</strong> es donde la mejoría se estabiliza.</p>`,
      formal: String.raw`<p>La WSS (<em>within-cluster sum of squares</em>) mide compactación: valores bajos = clústeres cohesivos. Es <strong>monótonamente decreciente</strong> en $k$:</p>
$$WSS(1)\ \ge\ WSS(2)\ \ge\ \dots\ \ge\ WSS(n)=0,\qquad \Delta WSS(k)=WSS(k)-WSS(k+1)$$
<ul>
  <li>$k$ bajo: $\Delta WSS$ grande (mejoría sustancial).</li>
  <li>$k$ mediano: $\Delta WSS$ moderado.</li>
  <li>$k$ alto: $\Delta WSS$ pequeño (mejora marginal, clústeres mínimos).</li>
</ul>
<p><strong>Método:</strong> graficar $WSS(k)$ contra $k$ y buscar el punto donde la curva pasa de pendiente pronunciada a plana.</p>`,
      figura: `<svg viewBox="0 0 420 250" role="img" aria-label="Gráfico del codo con WSS 100, 60, 45, 42 y 41 para k de 1 a 5">
<path class="eje" d="M50 20V205H400"/>
<text x="225" y="242" text-anchor="middle" font-size="12">k (número de clústeres)</text>
<text x="16" y="112" text-anchor="middle" font-size="12" transform="rotate(-90 16 112)">WSS(k)</text>
<g font-size="11" text-anchor="middle"><text x="80" y="222">1</text><text x="155" y="222">2</text><text x="230" y="222">3</text><text x="305" y="222">4</text><text x="380" y="222">5</text></g>
<path class="guia" d="M230 205V124"/>
<path class="serie" d="M80 25L155 97L230 124L305 129.4L380 131.2"/>
<circle class="punto" cx="80" cy="25" r="4.5"/><circle class="punto" cx="155" cy="97" r="4.5"/><circle class="destacado" cx="230" cy="124" r="5.5"/><circle class="punto" cx="305" cy="129.4" r="4.5"/><circle class="punto" cx="380" cy="131.2" r="4.5"/>
<g font-size="11"><text x="90" y="24">100</text><text x="163" y="92">60</text><text x="236" y="116">45</text><text x="297" y="120">42</text><text x="372" y="122">41</text></g>
</svg><figcaption>Ejemplo numérico de la clase: desde k = 3 la WSS casi no baja (45 → 42 → 41).</figcaption>`,
      ejemplo: String.raw`<p><strong>Ejemplo de la clase:</strong></p>
<div class="tabla-scroll"><table class="tabla tabla-datos">
<thead><tr><th>Paso</th><th>WSS</th><th>$\Delta WSS$</th><th>Lectura</th></tr></thead>
<tbody>
<tr><td>$k=1\to2$</td><td>$100\to60$</td><td>40</td><td>cambio grande</td></tr>
<tr><td>$k=2\to3$</td><td>$60\to45$</td><td>15</td><td>cambio moderado</td></tr>
<tr><td>$k=3\to4$</td><td>$45\to42$</td><td>3</td><td>cambio pequeño ← la slide marca el codo aquí</td></tr>
<tr><td>$k=4\to5$</td><td>$42\to41$</td><td>1</td><td>mejora marginal</td></tr>
</tbody></table></div>
<p><strong>Ayudantía 5 (6 clientes):</strong> las WSS para $k=1,\dots,5$ son $3{,}4067;\ 0{,}0873;\ 0{,}0399;\ 0{,}0089;\ 0{,}0008$. Disminución pronunciada al pasar de $k=1$ a $k=2$ y mucho menor después ⇒ codo en $k=2$.</p>`,
      r: {
        nota: "El script de la clase 5.2 no incluye el codo; este ciclo es el de la pauta de la ayudantía 5.",
        codigo: `wss <- numeric(5)
for (k in 1:5) {
  km <- kmeans(datos_norm, centers = k, nstart = 25)
  wss[k] <- km$tot.withinss}

plot(1:5, wss, type = "b",
     xlab = "Numero de clusters",
     ylab = "WSS")`,
        rlab: "r-m13-codo"
      },
      errores: [
        "Elegir el k con la WSS más baja: la WSS siempre baja al aumentar k (llega a 0 con k = n). Se busca el codo, no el mínimo.",
        "No justificar: la respuesta esperada explica que antes del codo la mejora es grande y después es marginal."
      ],
      memoriza: String.raw`<p>La WSS <strong>siempre decrece</strong> con $k$ y $WSS(n)=0$. Se elige el $k$ donde $\Delta WSS$ deja de ser grande.</p>`,
      comprueba: {
        tipo: "vf",
        enunciado: "Si al pasar de k = 4 a k = 5 la WSS aumenta, eso indica que k = 4 es el número óptimo de clústeres.",
        correcta: false,
        explicacion: "La WSS de la solución óptima es monótonamente decreciente en k: no puede aumentar. Un aumento solo indicaría una mala inicialización (óptimo local), no un criterio para elegir k."
      },
      fuente: [{ id: "C5.2", loc: "slides 10–13" }, { id: "AY5-R", loc: "líneas 211–228" }, { id: "EJ-P2", loc: "P12" }]
    },

    {
      id: "m13-c07",
      titulo: "Coeficiente de silueta (silhouette)",
      figura: { tipo: "silueta",
        pie: "Esquema: mueve la observación i desde el centro de su clúster hacia el clúster vecino y mira cómo s(i) baja de casi 1 a 0 y luego se vuelve negativa." },
      cubre: ["M13.7"],
      simple: String.raw`<p>Mide <strong>qué tan bien se ajusta una observación a su clúster</strong> respecto de los demás clústeres. Combina cohesión (qué tan cerca está de los suyos) y separación (qué tan lejos está del clúster vecino).</p>`,
      formal: String.raw`<ul>
  <li>$a(i)$: distancia promedio de $i$ a las otras observaciones del <strong>mismo</strong> clúster (cohesión interna). Solo considera distancias dentro del clúster asignado.</li>
  <li>$b(i)$: distancia promedio de $i$ al clúster <strong>vecino más cercano</strong> (separación).</li>
</ul>
$$s(i)=\frac{b(i)-a(i)}{\max\{a(i),\,b(i)\}},\qquad s(i)\in[-1,\,1]$$
<ul>
  <li>$s(i)\approx 1$: observación muy bien asignada.</li>
  <li>$s(i)\approx 0$: está cerca del borde entre dos clústeres.</li>
  <li>$s(i)<0$: podría estar mejor en otro clúster.</li>
</ul>
<div class="tabla-scroll"><table class="tabla">
<thead><tr><th>Ventajas</th><th>Limitaciones</th></tr></thead>
<tbody><tr>
<td><ol><li>Métrica única en $[-1,1]$, fácil de interpretar.</li><li>Considera cohesión <em>y</em> separación.</li><li>Permite identificar observaciones mal clasificadas.</li><li>Gráfico visual (silhouette plot).</li><li>Aplicable a cualquier algoritmo de clustering.</li></ol></td>
<td><ol><li>Computacionalmente costoso: $O(n^2)$.</li><li>Sesgado hacia clústeres convexos y de tamaño similar.</li><li>No funciona bien con clústeres alargados o no esféricos.</li><li>Depende de la métrica de distancia elegida.</li><li>Puede ser inestable con outliers.</li></ol></td>
</tr></tbody></table></div>
<p><strong>Regla práctica:</strong> combinar con el método del codo. Si ambos coinciden, hay confianza; si difieren, investigar la estructura de los clústeres (pueden ser no convexos).</p>`,
      ejemplo: String.raw`<p><strong>Ayudantía 5</strong> (6 clientes, K-medias con $k=2$): las siluetas individuales van de $0{,}83$ a $0{,}92$ y el promedio es $\approx 0{,}87$. Todas cercanas a 1, ninguna cercana a 0 ni negativa ⇒ no hay observaciones mal asignadas y $k=2$ es adecuado.</p>
<p><strong>Pauta Prueba 2:</strong> «Todos los valores del coeficiente de silhouette son &gt; 0, por lo que no hay ninguna que esté mal asignada.»</p>`,
      r: {
        nota: "<code>silhouette()</code> (paquete <code>cluster</code>) aparece en la pauta de la ayudantía 5, no en el script de la clase.",
        codigo: `library(cluster)
km2 <- kmeans(datos_norm, centers = 2, nstart = 25)
sil <- silhouette(km2$cluster, dist(datos_norm))
plot(sil)`,
        rlab: "r-m13-silueta"
      },
      errores: [
        "Confundir a(i) con b(i): a es «dentro» (cohesión), b es «fuera» (separación).",
        "Decir que s(i) = 0 es «mala asignación»: 0 es estar en el borde; lo que sugiere mala asignación es s(i) < 0."
      ],
      memoriza: String.raw`<p>$s(i)=\dfrac{b-a}{\max(a,b)}\in[-1,1]$: $\approx1$ bien asignada · $\approx0$ en el borde · $<0$ mejor en otro clúster.</p>`,
      comprueba: {
        enunciado: "Para una observación se obtiene a(i) = 2 y b(i) = 8. ¿Cuánto vale su silueta?",
        opciones: ["0,75", "0,25", "−0,75", "4"],
        correcta: 0,
        explicacion: "s(i) = (8 − 2) / máx(2, 8) = 6/8 = 0,75: bien asignada (mucho más cerca de los suyos que del clúster vecino)."
      },
      fuente: [{ id: "C5.2", loc: "slides 14–18" }, { id: "AY5-R", loc: "líneas 230–251" }, { id: "PR-P2-Q12", loc: "pregunta 1 e" }]
    }
  ],

  cuando: String.raw`<div class="tabla-scroll"><table class="tabla">
<thead><tr><th>Situación</th><th>Conviene</th></tr></thead>
<tbody>
<tr><td>Datos grandes, se tiene idea del $k$, clústeres esféricos, se busca eficiencia</td><td><strong>K-medias</strong></td></tr>
<tr><td>Datos pequeños o medianos, se quiere explorar distintos $k$ visualmente, clústeres de forma irregular</td><td><strong>Jerárquicos</strong> (dendrograma)</td></tr>
<tr><td>No sé qué $k$ usar</td><td>Método del <strong>codo</strong> (WSS vs. $k$) y <strong>silueta</strong>; si coinciden, hay confianza</td></tr>
<tr><td>Quiero saber si alguna observación quedó mal asignada</td><td><strong>Silueta</strong> individual: $s(i)<0$</td></tr>
</tbody></table></div>`,

  errores: [
    { texto: "Elegir k por la WSS mínima en vez de buscar el codo.", fuente: [{ id: "C5.2", loc: "slides 11–13" }] },
    { texto: "No estandarizar antes de <code>kmeans()</code>.", fuente: [{ id: "C5.2", loc: "slide 9" }] }
  ]
});
