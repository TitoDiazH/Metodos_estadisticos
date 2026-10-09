# ==============================================================================
# CLASE 5.1: ANÁLISIS DE CONGLOMERADOS (parte 1) — Ejemplos en R
# Distancias, estandarización y métodos jerárquicos aglomerativos
# Métodos Estadísticos para la Gestión (ICI3104) — Universidad de los Andes
# ------------------------------------------------------------------------------
# Paquetes necesarios (instalar una sola vez, luego dejar comentado):
#   install.packages("ade4")
# ==============================================================================


############################################################
# 1. DATOS: 8 EMPRESAS, 2 VARIABLES
############################################################

datos <- data.frame(
  Inversion = c(16, 12, 10, 12, 45, 50, 45, 50),
  Ventas    = c(10, 14, 22, 25, 10, 15, 25, 27))
rownames(datos) <- c("E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8")

# Distancias: Euclídea, Manhattan y Chebyshev (máximo)
dist_eucl <- dist(datos, method = "euclidean")
dist_manh <- dist(datos, method = "manhattan")
dist_cheb <- dist(datos, method = "maximum")

# Euclídea al cuadrado (útil para Ward)
dist_eucl_sq <- dist(datos, method = "euclidean")^2

round(as.matrix(dist_eucl), 2)


############################################################
# 2. DISTANCIAS PARA DATOS BINARIOS (JACCARD)
############################################################

# Datos binarios (presencia/ausencia): 5 obs, 4 variables
datos_bin <- matrix(c(
  1, 1, 0, 0,
  0, 1, 1, 1,
  1, 1, 0, 1,
  0, 0, 0, 1,
  1, 1, 1, 0), nrow = 5, byrow = TRUE)
rownames(datos_bin) <- c("E1", "E2", "E3", "E4", "E5")

# install.packages("ade4")
library(ade4)

# Jaccard (method = 1): ignora coincidencias de ceros
dist.binary(datos_bin, method = 1)


############################################################
# 3. ESTANDARIZACIÓN Y MATRIZ DE DISTANCIAS
############################################################

# Z-score de las 8 empresas
datos_norm <- scale(datos)
dist_matriz <- dist(datos_norm, method = "euclidean")
round(as.matrix(dist_matriz), 2)


############################################################
# 4. SINGLE LINKAGE (VECINO MÁS CERCANO)
############################################################

hc_single <- hclust(dist_matriz, method = "single")
plot(hc_single, main = "Single Linkage",
     xlab = "Observación", ylab = "Distancia")
clusters <- cutree(hc_single, k = 2)
print(clusters)


############################################################
# 5. COMPLETE LINKAGE (VECINO MÁS LEJANO)
############################################################

hc_complete <- hclust(dist_matriz, method = "complete")
plot(hc_complete, main = "Complete Linkage",
     xlab = "Observación", ylab = "Distancia")
clusters <- cutree(hc_complete, k = 2)
print(clusters)

# Comparar Single vs Complete
par(mfrow = c(1, 2))
plot(hc_single,   main = "Single Linkage")
plot(hc_complete, main = "Complete Linkage")
par(mfrow = c(1, 1))


############################################################
# 6. MÉTODO DEL CENTROIDE
############################################################

hc_centroid <- hclust(dist_matriz, method = "centroid")
plot(hc_centroid, main = "Centroide",
     xlab = "Observación", ylab = "Distancia")
clusters <- cutree(hc_centroid, k = 2)
print(clusters)

# Centroides de los clústeres finales
aggregate(datos, by = list(cluster = clusters), FUN = mean)


############################################################
# 7. MÉTODO DE WARD
############################################################

# ward.D2 usa la suma de cuadrados euclídea
hc_ward <- hclust(dist_matriz, method = "ward.D2")
plot(hc_ward, main = "Ward",
     xlab = "Observación", ylab = "Distancia")
clusters <- cutree(hc_ward, k = 2)
print(clusters)

# Suma de cuadrados within (aproximación con las alturas de fusión)
within_SS <- sum(hc_ward$height)
print(paste("Suma de cuadrados within:", within_SS))
