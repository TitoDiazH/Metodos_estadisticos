# Pregunta 1

# Crear los datos
puntos <- data.frame(
  nombre = c("A","B","C","D","E"),
  x = c(1,2,4,7,5),
  y = c(1,6,3,4,1))

# Ver datos
print(puntos)

# Calcular matriz de distancias Manhattan
dist_manhattan <- dist(puntos[, c("x","y")], method = "manhattan")

# Convertir a matriz
matriz_dist <- as.matrix(dist_manhattan)

# Mostrar matriz
print(matriz_dist)

# Clustering jerárquico (Vecino mas cercano)
hc <- hclust(dist_manhattan, method = "single")

# Dibujar dendrograma
plot(hc, labels = puntos$nombre, main = "Clustering con distancia Manhattan", las=2)

# Cortar en 2 grupos
grupos <- cutree(hc, k = 2)

# Mostrar agrupaciones
resultado <- data.frame(punto = puntos$nombre, grupo = grupos)
print(resultado)

#------------------------------------------------------------------------------

# Clustering jerárquico (Vecino mas lejano)
hc <- hclust(dist_manhattan, method = "complete")

# Dibujar dendrograma
plot(hc, labels = puntos$nombre, main = "Clustering con distancia Manhattan", las=2)

# Cortar en 2 grupos
grupos <- cutree(hc, k = 2)

# Mostrar agrupaciones
resultado <- data.frame(punto = puntos$nombre, grupo = grupos)
print(resultado)

#------------------------------------------------------------------------------

# Clustering jerárquico (Promedio)
hc <- hclust(dist_manhattan, method = "average")

# Dibujar dendrograma
plot(hc, labels = puntos$nombre, main = "Clustering con distancia Manhattan")

# Cortar en 2 grupos
grupos <- cutree(hc, k = 2)

# Mostrar agrupaciones
resultado <- data.frame(punto = puntos$nombre, grupo = grupos)
print(resultado)

#------------------------------------------------------------------------------

# Pregunta 2

proveedores <- data.frame(
  precio = c(130,120,90,200,180),
  calidad = c(8,9,6,7,8),
  tiempo = c(5,6,4,10,9))

proveedores

datos_norm <- as.data.frame(
  scale(proveedores,
        center = apply(proveedores, 2, min),
        scale = apply(proveedores, 2, max) - apply(proveedores, 2, min)))

datos_norm
d <- dist(datos_norm) # Se calcula la matriz de distancias
d

# Se desarrolla el clustering jerarquico con el metodo del centroide
hc <- hclust(d, method="centroid")
plot(hc, las=2)

#------------------------------------------------------------------------------

# Problema 3

# Crear los datos

productos <- data.frame(
  producto = c("P1","P2","P3","P4","P5"),
  X1 = c(1,1,0,0,1),
  X2 = c(0,0,1,1,0),
  X3 = c(1,1,0,0,0),
  X4 = c(1,0,0,1,1))
rownames(productos) <- productos$producto
datos <- productos[,2:5] # se eliminan los nombres para los calculos

# Distancia de Hamming
dist_hamming <- dist(datos, method = "manhattan")
dist_hamming
# Mostrar matriz de distancias
matriz_dist <- as.matrix(dist_hamming)
matriz_dist

# DIANA (cluster divisivo)

install.packages("cluster")
library(cluster)
diana_res <- diana(dist_hamming)

# Dendrograma
plot(diana_res, main = "Dendrograma con metodo DIANA")

# Resultado con k = 3
clusters <- cutree(as.hclust(diana_res), k = 3)
resultado_3 <- data.frame(cluster = clusters)
print("Clusters (k=3):")
resultado_3

# Resultado considerando k = 4
clusters_4 <- cutree(as.hclust(diana_res), k = 4)
resultado_4 <- data.frame(cluster = clusters_4)
print("Clusters (k=4):")
print(resultado_4)

# Aqui R escoge P2 en vez de P5 simplemente por el orden, y obtiene una
# combinacion ligeramente distinta pero equivalente.
# Se obtiene que los clusters son
# P3 - P4: Importados no ecologicos sin garantia.
# P1 - P2: Son ligeramente diferentes, pero ambos comparten que son ecologicos,
# no importados con garantia y de bajo nivel tecnologico.
# P5: Ecologico de alta tecnologia, y no encaja con ningun otro producto.

#------------------------------------------------------------------------------

# Pregunta 4:

# a) Definicion de Analisis de Clusters

# El analisis de clustering es una tecnica no supervisada que busca agrupar,
# observaciones en subconjuntos disjuntos, tal que la similutd dentro de cada
# grupo sea alta y entre grupos sea baja.
# En otras palabras, minimizar la varianza dentro de los grupos, y maximizar la
# varianza entre los grupos.
# Finalmente, en este contexto, el analisis de clusters permite segmentar clientes
# con comportamientos financieros similares.

# b) Creacion de datos en R y justificacion de escalamiento

datos <- data.frame(
  ingreso   = c(1.22, 1.5, 1.3, 4.5, 5.0, 4.8),
  gasto     = c(0.8, 1.0, 0.9, 3.5, 3.8, 3.2),
  productos = c(2, 3, 2, 6, 7, 6))
rownames(datos) <- c("C1", "C2", "C3", "C4", "C5", "C6")
datos

# Es necesario estandarizar los datos, debido que estan en unidades y escalas
# diferentes. Si no se escalan, aquellas variables con valores muy altos seran
# predominantes, afectando seriamente los calculos e invalidando las similitudes.
# El escalamiento min-max es el mejor en este caso, porque compara los valores
# con el maximo, de forma que esten entre 0 y 1 (uniforme).

datos_norm <- as.data.frame(scale(datos,
                                  center = apply(datos, 2, min),
                                 scale = apply(datos, 2, max) - apply(datos, 2, min)))
# Esta es una forma conveniente de calcular el escalamiento min-max
datos_norm

# c) Distancia Euclideana

dist_matrix <- dist(datos, method = "euclidean")
as.matrix(dist_matrix)

# Se puede observar distancias relativamente pequeñas entre C1, C2 y C3, lo que
# indica comportamientos financieros similares (bajo ingreso, bajo gasto y
# pocos productos).
# De forma analoga, los clientes C4, C5 y C6 presentan distancias pequeñas entre
# si, evidenciando un segundo grupo homogeneo con mayores niveles de ingreso,
# gasto y numero de productos.
# Las distancias entre ambos grupos son considerablemente mayores, lo que
# sugiere una clara separacion entre dos segmentos de clientes.


# d) Clustering Jerarquico (Single Linkage)

hc_single <- hclust(dist_matrix, method = "single")
plot(hc_single)
cutree(hc_single, k = 2)

# Se puede observar que en las primeras iteraciones se agrupa C1 y C3, y
# posteriormente se incorpora C2, formando el cluster {C1}, C2, C3}.
# De forma paralela, los clientes C4 y C6 se agrupan primero, y luego se añade
# C2, formando un segundo grupo {C4, C5, C6}.
# De esta manera, el metodo identifica 2 clusters principales:
# {C1, C2, C3}: Clientes de bajo ingreso, gasto y pocos productos.
# {C4, C5, C6}: Clientes de alto ingreso, gasto y muchos productos.

# e) Metodo K-Means con K=2

set.seed(123)
km <- kmeans(datos_norm, centers = 2, nstart = 25)
km$cluster
km$centers

# Al aplicar este metodo, se obtienen resultados similares. Ademas, permite ver
# que los centroides del primer cluster presentan valores bajos en las 3
# variables normalizadas; mientras que en el segundo cluster kis valores son
# altos en ingreso, gasto y numero de productos.
# Este analisis permite diseñar estrategias diferenciadas segun el perfil
# del cliente.

# f) Metodo del Codo

wss <- numeric(5)
for (k in 1:5) {
  km <- kmeans(datos_norm, centers = k, nstart = 25)
  wss[k] <- km$tot.withinss}

plot(1:5, wss, type = "b",
     xlab = "Numero de clusters",
     ylab = "WSS")

# El grafico muestra una disminucion pronunciada del WSS al pasar de K=1 a K=2,
# seguida de una reduccion mucho menor para valores mayores de K.
# Esto indica la presencia de un codo en K=2. De esta manera el optimo son 2,
# ya que caputra la mayor parte de la estructura de datos sin sobreajustar el modelo.

# g) Coeficiente de Silhouette

# El coeficiente de Silhuoette esta acotado en [-1, 1] y mide que tan bien
# asignada esta cada observacion a su cluster.
# Valores cercanos a 1 indican una buena asignacion.
# Valores cercanos a 0 estan en el borde entre clusters.
# Valores negativos sugieren mala asignacion.

library(cluster)
km2 <- kmeans(datos_norm, centers = 2, nstart = 25)
sil <- silhouette(km2$cluster, dist(datos_norm))
plot(sil)

# El coeficiente promedio es aproximadamente 0.87, lo que indica una calidad de
# clustering excelente. Los valores individuales se encuentran cercanos a 1,
# lo que indica que las obs estan bien asignadas. No se observan valores
# cercanos a 0 ni negativos, lo que implica que no existen observaciones mal
# asignadas. Ambos clusters presentan tamaños equilibrados y valores promedio
# de silueta elevados, lo que refuerza la calidad de la segmentacion.

#------------------------------------------------------------------------------

