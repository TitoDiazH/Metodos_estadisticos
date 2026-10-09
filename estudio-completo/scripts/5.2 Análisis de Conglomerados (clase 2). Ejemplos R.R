# ==============================================================================
# CLASE 5.2: ANÁLISIS DE CONGLOMERADOS (parte 2) — Ejemplos en R
# K-medias, K-means++ y método divisivo (DIANA)
# Métodos Estadísticos para la Gestión (ICI3104) — Universidad de los Andes
# ------------------------------------------------------------------------------
# Paquetes necesarios (instalar una sola vez, luego dejar comentado):
#   install.packages(c("factoextra", "ClusterR"))   # cluster viene con R base
# ==============================================================================


############################################################
# 0. DATOS (8 empresas, mismos de la clase 5.1)
############################################################

datos <- data.frame(
  Inversion = c(16, 12, 10, 12, 45, 50, 45, 50),
  Ventas    = c(10, 14, 22, 25, 10, 15, 25, 27))
rownames(datos) <- c("E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8")


############################################################
# 1. K-MEDIAS
############################################################

datos_norm <- scale(datos)          # siempre estandarizar

# nstart = 25 ejecuta 25 inicializaciones y retorna la mejor
km <- kmeans(datos_norm, centers = 3, nstart = 25)
print(km$cluster)                   # asignación de cada observación
print(km$centers)                   # centroides finales
print(km$tot.withinss)              # WSS total

# Visualizar los clústeres
library(factoextra)
fviz_cluster(km, data = datos_norm,
             palette = "Set2", ggtheme = theme_minimal())


############################################################
# 2. K-MEANS++ (inicialización inteligente, paquete ClusterR)
############################################################

library(ClusterR)
km_pp <- KMeans_rcpp(datos_norm, clusters = 3, initializer = "kmeans++")
print(km_pp$clusters)


############################################################
# 3. DIANA (MÉTODO DIVISIVO / DESAGREGATIVO)
############################################################

library(cluster)
dist_matriz <- dist(datos_norm, method = "euclidean")

# DIANA (acepta datos o matriz de distancias)
diana_result <- diana(datos_norm, metric = "euclidean")

plot(diana_result, main = "DIANA - Divisive Analysis",
     xlab = "Observación", ylab = "Distancia")

clusters <- cutree(diana_result, k = 3)
print(clusters)


############################################################
# 4. COMPARACIÓN AGLOMERATIVO vs DIVISIVO
############################################################

hc_ward <- hclust(dist_matriz, method = "ward.D2")
par(mfrow = c(1, 2))
plot(hc_ward,      main = "Ward (aglomerativo)")
plot(diana_result, main = "DIANA (desagregativo)")
par(mfrow = c(1, 1))
