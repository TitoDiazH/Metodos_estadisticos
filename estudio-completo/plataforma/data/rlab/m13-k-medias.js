/* ============================================================================
   Laboratorio R · K-medias, codo y silueta (M13, P2)
   ========================================================================== */
(function () {
  var CLIENTES = `datos <- data.frame(
  ingreso   = c(1.22, 1.5, 1.3, 4.5, 5.0, 4.8),
  gasto     = c(0.8, 1.0, 0.9, 3.5, 3.8, 3.2),
  productos = c(2, 3, 2, 6, 7, 6))
rownames(datos) <- c("C1", "C2", "C3", "C4", "C5", "C6")

datos_norm <- as.data.frame(scale(datos,
                                  center = apply(datos, 2, min),
                                  scale = apply(datos, 2, max) - apply(datos, 2, min)))
`;

  PLATAFORMA.registrar("rlab", [
    {
      id: "r-m13-kmeans", modulo: "m13-k-medias", tema: "Conglomerados: K-medias",
      titulo: "kmeans() con las 8 empresas (k = 3)",
      descripcion: "Código del script de la clase 5.2. Se agregó <code>set.seed(123)</code>: el script no fija semilla, así que la numeración de los clústeres puede salir permutada en tu computador (los grupos son los mismos).",
      funciones: ["scale", "kmeans", "$cluster", "$centers", "$tot.withinss"],
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
      ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
      lectura: String.raw`<ul>
<li><strong>Primer bloque (<code>km$cluster</code>):</strong> bajo cada empresa, su clúster. Grupos: $\{$E1–E4$\}$, $\{$E5, E6$\}$, $\{$E7, E8$\}$.</li>
<li><strong>Segundo bloque (<code>km$centers</code>):</strong> una fila por clúster, en unidades estandarizadas. Clúster 3: inversión baja ($-0{,}93$). Clústeres 1 y 2: inversión alta ($0{,}93$) con ventas bajas ($-0{,}85$) y altas ($1{,}07$).</li>
<li><strong>Tercer bloque:</strong> WSS total $=3{,}35$; sirve para comparar entre valores de $k$.</li>
</ul>`,
      fuente: [{ id: "S5.2", loc: "líneas 14–32" }, { id: "C5.2", loc: "slide 9" }]
    },
    {
      id: "r-m13-codo", modulo: "m13-k-medias", tema: "Conglomerados: K-medias",
      titulo: "Método del codo con un ciclo for",
      descripcion: "Pauta de la ayudantía 5 (6 clientes, normalización min–máx). Se reemplazó el <code>plot()</code> por <code>round(wss, 4)</code> para ver los números que el gráfico dibuja.",
      aviso: "El codo no está en el script de la clase 5.2; este código viene de la ayudantía 5.",
      funciones: ["scale", "apply", "numeric", "for", "kmeans", "$tot.withinss"],
      codigo: CLIENTES + `
set.seed(123)
wss <- numeric(5)
for (k in 1:5) {
  km <- kmeans(datos_norm, centers = k, nstart = 25)
  wss[k] <- km$tot.withinss}
round(wss, 4)`,
      salida: `[1] 3.4067 0.0873 0.0399 0.0089 0.0008`,
      ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
      lectura: String.raw`<p>Cada número es la WSS para $k=1,2,3,4,5$. Disminución pronunciada al pasar de $k=1$ a $k=2$ ($3{,}41\to0{,}09$) y mucho menor después ⇒ <strong>codo en $k=2$</strong>. En la ayudantía se grafica con <code>plot(1:5, wss, type = "b")</code>.</p>
<p>La forma <code>scale(datos, center = mínimos, scale = máx − mín)</code> es la manera de la pauta de calcular la normalización min–máx.</p>`,
      fuente: [{ id: "AY5-R", loc: "líneas 155–228" }, { id: "C5.2", loc: "slides 10–13" }]
    },
    {
      id: "r-m13-silueta", modulo: "m13-k-medias", tema: "Conglomerados: K-medias",
      titulo: "Coeficiente de silueta con silhouette()",
      descripcion: "Pauta de la ayudantía 5: calidad del K-medias con k = 2. Se muestran los valores en vez del gráfico <code>plot(sil)</code>.",
      aviso: "<code>silhouette()</code> (paquete <code>cluster</code>) aparece en la ayudantía 5, no en el script de la clase.",
      funciones: ["library(cluster)", "kmeans", "silhouette", "dist"],
      paquetes: ["cluster"],
      codigo: CLIENTES + `
library(cluster)
set.seed(123)
km2 <- kmeans(datos_norm, centers = 2, nstart = 25)
sil <- silhouette(km2$cluster, dist(datos_norm))
round(sil[, 1:3], 4)
mean(sil[, 3])`,
      salida: `     cluster neighbor sil_width
[1,]       1        2    0.9159
[2,]       1        2    0.8426
[3,]       1        2    0.9187
[4,]       2        1    0.8627
[5,]       2        1    0.8348
[6,]       2        1    0.8519
[1] 0.8711103`,
      ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
      lectura: String.raw`<ul>
<li>Una fila por cliente (C1…C6): <code>cluster</code> = su clúster, <code>neighbor</code> = el clúster vecino más cercano, <code>sil_width</code> = $s(i)$.</li>
<li>Todos los $s(i)$ están entre $0{,}83$ y $0{,}92$: cercanos a 1, ninguno cercano a 0 ni negativo ⇒ no hay observaciones mal asignadas.</li>
<li>Promedio $\approx0{,}87$: la elección de $k=2$ es adecuada (y coincide con el codo).</li>
</ul>`,
      fuente: [{ id: "AY5-R", loc: "líneas 230–251" }, { id: "C5.2", loc: "slide 14" }]
    }
  ]);
})();
