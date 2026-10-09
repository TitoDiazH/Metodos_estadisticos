/* ============================================================================
   Desarrollo · M13 K-medias y elección de k (P2)
   ========================================================================== */
(function () {
  var DATOS_CLIENTES = `datos <- data.frame(
  ingreso   = c(1.22, 1.5, 1.3, 4.5, 5.0, 4.8),
  gasto     = c(0.8, 1.0, 0.9, 3.5, 3.8, 3.2),
  productos = c(2, 3, 2, 6, 7, 6))
rownames(datos) <- c("C1", "C2", "C3", "C4", "C5", "C6")
datos_norm <- as.data.frame(scale(datos,
                                  center = apply(datos, 2, min),
                                  scale = apply(datos, 2, max) - apply(datos, 2, min)))
`;

  PLATAFORMA.registrar("desarrollo", [
    {
      id: "m13-d001", modulo: "m13-k-medias", concepto: "m13-c02", dificultad: 2, origen: "curso",
      titulo: "Una iteración de K-medias a mano",
      enunciado: String.raw`<p>Considere los puntos $(1,1)$, $(2,1)$, $(4,3)$, $(5,4)$ y suponga que los centroides iniciales son $\mu_1=(1,1)$ y $\mu_2=(5,4)$.</p>
<ol type="a">
<li>Determine a qué clúster pertenece cada punto en la primera iteración de K-means.</li>
<li>Calcule los nuevos centroides después de la primera asignación.</li>
<li>Mencione dos ventajas y dos desventajas del algoritmo K-means.</li>
</ol>`,
      partes: [
        {
          titulo: "a) Distancias de cada punto a los dos centroides", puntos: 1.5,
          solucion: String.raw`<div class="tabla-scroll"><table class="tabla tabla-datos">
<thead><tr><th>Punto</th><th>$d(\cdot,\mu_1)$</th><th>$d(\cdot,\mu_2)$</th></tr></thead>
<tbody>
<tr><td>(1,1)</td><td>0</td><td>5</td></tr>
<tr><td>(2,1)</td><td>1</td><td>4,24</td></tr>
<tr><td>(4,3)</td><td>3,61</td><td>1,41</td></tr>
<tr><td>(5,4)</td><td>5</td><td>0</td></tr>
</tbody></table></div>
<p>Distancia euclídea; por ejemplo $d\big((4,3),\mu_1\big)=\sqrt{3^2+2^2}=3{,}61$.</p>`
        },
        {
          titulo: "a) Asignación a clústeres", puntos: 1,
          solucion: String.raw`<p>Cada punto va al centroide más cercano: clúster 1 $=\{(1,1),(2,1)\}$; clúster 2 $=\{(4,3),(5,4)\}$.</p>`
        },
        {
          titulo: "b) Nuevo centroide del clúster 1", puntos: 0.75,
          solucion: String.raw`<p>Media de sus puntos: $\mu_1=\left(\tfrac{1+2}{2};\tfrac{1+1}{2}\right)=(1{,}5;\ 1)$.</p>`
        },
        {
          titulo: "b) Nuevo centroide del clúster 2", puntos: 0.75,
          solucion: String.raw`<p>Media de sus puntos: $\mu_2=\left(\tfrac{4+5}{2};\tfrac{3+4}{2}\right)=(4{,}5;\ 3{,}5)$.</p>`
        },
        {
          titulo: "c) Dos ventajas", puntos: 1,
          solucion: String.raw`<p>Dos de: rápido y escalable a grandes datasets; fácil de implementar e interpretar; funciona bien con clústeres esféricos y de tamaño similar; entrega $k$ grupos directamente, sin cortar un dendrograma.</p>`
        },
        {
          titulo: "c) Dos desventajas", puntos: 1,
          solucion: String.raw`<p>Dos de: requiere especificar $k$ de antemano; sensible a la inicialización; asume clústeres esféricos de tamaño similar; sensible a outliers; no produce dendrograma.</p>`
        }
      ],
      escala: "El ejercicio de preparación no trae pauta ni puntajes: la respuesta se calculó y los 6 puntos son una regla de la plataforma.",
      verifica: [
        { que: "d((1,1),mu2)", js: "dist([1,1],[5,4])", esperado: 5, tol: 0.0001 },
        { que: "d((2,1),mu2)", js: "dist([2,1],[5,4])", esperado: 4.24, tol: 0.005 },
        { que: "d((4,3),mu1)", js: "dist([4,3],[1,1])", esperado: 3.61, tol: 0.005 },
        { que: "d((4,3),mu2)", js: "dist([4,3],[5,4])", esperado: 1.41, tol: 0.005 }
      ],
      fuente: [{ id: "EJ-P2", loc: "P11" }, { id: "C5.2", loc: "slides 4–6 y 8" }]
    },
    {
      id: "m13-d002", modulo: "m13-k-medias", concepto: "m13-c07", dificultad: 2, origen: "curso",
      titulo: "K-medias, codo y silueta para 6 clientes (lectura de salidas de R)",
      enunciado: String.raw`<p>Un banco tiene 6 clientes (C1–C6) con ingreso, gasto y número de productos. Los datos se normalizaron con min–máx (<code>datos_norm</code>) y se ejecutó el código siguiente. A partir de las salidas:</p>
<ol type="a">
<li>Interprete el resultado de K-means con $k=2$.</li>
<li>Use el método del codo para determinar el número óptimo de clústeres. Interprete.</li>
<li>Evalúe la calidad del clustering con el coeficiente de silueta y comente si la elección de $k=2$ es adecuada.</li>
</ol>`,
      codigoR: `set.seed(123)
km <- kmeans(datos_norm, centers = 2, nstart = 25)
km$cluster
km$centers

wss <- numeric(5)
for (k in 1:5) {
  km <- kmeans(datos_norm, centers = k, nstart = 25)
  wss[k] <- km$tot.withinss}
round(wss, 4)

library(cluster)
km2 <- kmeans(datos_norm, centers = 2, nstart = 25)
sil <- silhouette(km2$cluster, dist(datos_norm))
round(sil[, 1:3], 4)
mean(sil[, 3])`,
      salidaR: `C1 C2 C3 C4 C5 C6
 1  1  1  2  2  2
     ingreso      gasto  productos
1 0.03174603 0.03333333 0.06666667
2 0.93827160 0.90000000 0.86666667
[1] 3.4067 0.0873 0.0399 0.0089 0.0008
     cluster neighbor sil_width
[1,]       1        2    0.9159
[2,]       1        2    0.8426
[3,]       1        2    0.9187
[4,]       2        1    0.8627
[5,]       2        1    0.8348
[6,]       2        1    0.8519
[1] 0.8711103`,
      salidaDe: DATOS_CLIENTES + `set.seed(123)
km <- kmeans(datos_norm, centers = 2, nstart = 25)
km$cluster
km$centers

wss <- numeric(5)
for (k in 1:5) {
  km <- kmeans(datos_norm, centers = k, nstart = 25)
  wss[k] <- km$tot.withinss}
round(wss, 4)

library(cluster)
km2 <- kmeans(datos_norm, centers = 2, nstart = 25)
sil <- silhouette(km2$cluster, dist(datos_norm))
round(sil[, 1:3], 4)
mean(sil[, 3])`,
      paquetes: ["cluster"],
      partes: [
        {
          titulo: "a) Qué clústeres se formaron", puntos: 1,
          solucion: String.raw`<p>Dos clústeres: $\{$C1, C2, C3$\}$ y $\{$C4, C5, C6$\}$ (primer bloque de la salida).</p>`
        },
        {
          titulo: "a) Interpretación de los centroides", puntos: 1,
          solucion: String.raw`<p>El centroide del primero tiene valores bajos en las tres variables normalizadas ($\approx0{,}03$–$0{,}07$); el del segundo, valores altos ($\approx0{,}87$–$0{,}94$) en ingreso, gasto y número de productos. Son dos segmentos: clientes de bajo ingreso, gasto y pocos productos, y clientes de alto ingreso, gasto y muchos productos; permite diseñar estrategias diferenciadas según el perfil.</p>`
        },
        {
          titulo: "b) Lectura de la WSS", puntos: 1,
          solucion: String.raw`<p>La WSS cae de $3{,}41$ a $0{,}09$ al pasar de $k=1$ a $k=2$, y después la reducción es mucho menor ($0{,}04$; $0{,}009$; $0{,}0008$).</p>`
        },
        {
          titulo: "b) Número óptimo de clústeres", puntos: 1,
          solucion: String.raw`<p>Hay un codo en $k=2$: el óptimo son 2 clústeres, que capturan la mayor parte de la estructura de los datos sin sobreajustar.</p>`
        },
        {
          titulo: "c) Cómo se lee la silueta", puntos: 1,
          solucion: String.raw`<p>El coeficiente está acotado en $[-1,1]$: cerca de 1 = buena asignación, cerca de 0 = borde entre clústeres, negativo = posible mala asignación.</p>`
        },
        {
          titulo: "c) ¿Es adecuado k = 2?", puntos: 1,
          solucion: String.raw`<p>El promedio es $\approx0{,}87$ y los valores individuales van de $0{,}83$ a $0{,}92$: todos cercanos a 1, ninguno cercano a 0 ni negativo, así que no hay observaciones mal asignadas. Ambos clústeres tienen tamaños equilibrados (3 y 3). La elección de $k=2$ es adecuada, y coincide con el codo.</p>`
        }
      ],
      escala: "La ayudantía no trae puntajes: los 6 puntos repartidos por parte son una regla de la plataforma.",
      fuente: [{ id: "AY5-E", loc: "P4 e–g" }, { id: "AY5-R", loc: "líneas 201–251" }]
    }
  ]);
})();
