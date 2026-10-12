# == Librerías ======================================================
# Paquetes necesarios (instalar una sola vez, luego dejar comentado):
# install.packages(c("psych", "dplyr", "cluster", "MASS", "e1071", "MVN", "biotools"))
# cluster y MASS vienen con la instalación de R
library(dplyr)
library(psych)
library(cluster)
library(MASS)
library(e1071)
library(MVN)
library(biotools)
# ===================================================================

# == Variables de entorno ===========================================
# i = ((GROUP - 1) %% 5) + 1 = 4
PATH_TO_DATASET <- "tarea_2/grupo_4_clientes.csv"
GROUP <- 24   # Somos el grupo 24 en canvas
# ===================================================================

# == Cargar datos iniciales ===============
ds_clientes_completo <- read.csv(PATH_TO_DATASET)
head(ds_clientes_completo)
str(ds_clientes_completo)
# =========================================

#######################################
### 0. Preprocesamiento Obligatorio ###
#######################################

### Base asignada y submuestra

# Muestra aleatoria de 800 de los 1.000 clientes, sin reemplazo.
set.seed(GROUP)
idx_muestra <- sample(nrow(ds_clientes_completo), 800, replace = FALSE)
datos <- ds_clientes_completo[idx_muestra, ]
head(datos)
summary(datos)
sum(is.na(datos)) # si hay nulos?
sum(duplicated(datos$id_cliente)) # si hay duplicados?

# Variables continuas (las 4 de la segmentación y de los predictores)
VARS_CONT <- c(
  "dias_ultima_sesion",
  "pedidos_12m",
  "ticket_promedio",
  "pct_restaurantes"
)

### Descriptivos

# Estadísticos descriptivos de las cuatro variables numericas/continuas
describe(datos[, "dias_ultima_sesion"])
summary(datos[, "dias_ultima_sesion"])

describe(datos[, "pedidos_12m"])
summary(datos[, "pedidos_12m"])

describe(datos[, "ticket_promedio"])
summary(datos[, "ticket_promedio"])

describe(datos[, "pct_restaurantes"])
summary(datos[, "pct_restaurantes"])

# Histogramas + boxplots de cada variable continua
graficar_hist <- function(x) {
  hist(
    datos[, x],
    main = paste("Histograma de", x),
    xlab = x,
    ylab = "Frecuencia"
  )
}
graficar_boxplot <- function(x) {
  boxplot(
    datos[, x],
    main = paste("Boxplot de", x),
    ylab = x
  )
}


graficar_hist("dias_ultima_sesion")
graficar_boxplot("dias_ultima_sesion")
# Mostrar el valor en días de los outliers
# (puntos fuera de los bigotes del boxplot)
outliers_dias <- boxplot.stats(datos$dias_ultima_sesion)$out
min(outliers_dias)
sum(outliers_dias > 113)
# eliminar outliers
datos_2 <- datos[datos$dias_ultima_sesion < 113, ]

graficar_hist("pedidos_12m")
graficar_boxplot("pedidos_12m")
outliers_pedidos <- boxplot.stats(datos$pedidos_12m)$out
min(outliers_pedidos)
sum(outliers_pedidos > 59)
datos_2 <- datos_2[datos_2$pedidos_12m < 59, ]

graficar_hist("ticket_promedio")
graficar_boxplot("ticket_promedio")
outliers_ticket <- boxplot.stats(datos$ticket_promedio)$out
min(outliers_ticket)
sum(outliers_ticket > 99.07)
datos_2 <- datos_2[datos_2$ticket_promedio < 150, ]

graficar_hist("pct_restaurantes")
graficar_boxplot("pct_restaurantes")
outliers_pct <- boxplot.stats(datos$pct_restaurantes)$out
min(outliers_pct)
sum(outliers_pct > 0.9)

# Distribución de frecuencias de estado_t1 y estado_t2
tabla_t1 <- table(datos$estado_t1)
tabla_t2 <- table(datos$estado_t2)
tabla_t1
tabla_t2

barplot(
  tabla_t1,
  main = "estado_t1",
  xlab = "Nivel de gasto",
  ylab = "Frecuencia",
  col = "lightblue"
)
barplot(
  tabla_t2,
  main = "estado_t2",
  xlab = "Nivel de gasto",
  ylab = "Frecuencia",
  col = "lightblue"
)

# Transiciones T1 -> T2
table(estado_t1 = datos$estado_t1, estado_t2 = datos$estado_t2)

### Ceros estructurales

# ticket_promedio = 0 NO es dato faltante
# (son clientes que no hicieron pedidos en T1)
sum(datos$ticket_promedio == 0)
table(ticket_cero = datos$ticket_promedio == 0, estado_t1 = datos$estado_t1)
# Los ceros coinciden exactamente con estado_t1 = "Inactivo"
# (la recodificación es determinística)

# Tratamiento: SE MANTIENEN en la base. Son clientes reales
# y eliminarlos quitaría a los clientes inactivos que
# también son parte del negocio.
datos$sin_pedidos_t1 <- datos$ticket_promedio == 0

# Efecto sobre los análisis posteriores: el bloque de ceros baja la media de ticket_promedio
# y crea una masa en 0 (no normal). Además refuerza la correlación con pedidos_12m.
# Comparación con y sin ceros:
ticket_con_ceros <- mean(datos$ticket_promedio)
ticket_sin_ceros <- mean(datos$ticket_promedio[!datos$sin_pedidos_t1])
c(con_ceros = ticket_con_ceros, sin_ceros = ticket_sin_ceros)
cor(datos[, VARS_CONT])
cor(datos[!datos$sin_pedidos_t1, VARS_CONT])

### Truncamiento

# dias_ultima_sesion está truncada en 180
sum(datos$dias_ultima_sesion >= 180)  # Ninguno
max(datos$dias_ultima_sesion) # 179
max(ds_clientes_completo$dias_ultima_sesion)
# 179, incluso en todo el dataset original no hay

### Escalamiento

sapply(datos[, VARS_CONT], sd)
datos_z <- as.data.frame(scale(datos[, VARS_CONT]))
colMeans(datos_z)
sapply(datos_z, sd)
### Correlación

matriz_cor <- cor(datos[, VARS_CONT])
matriz_cor

# **Esto no lo piden pero puede ayudar
# PCA rápido para ver las variables en 2 dimensiones

# PCA sobre las 4 variables continuas estandarizadas (solo exploratorio, no es parte del enunciado)
pca <- prcomp(datos[, VARS_CONT], scale. = TRUE)   # muestra completa (la usa la Parte 1)
scores <- as.data.frame(pca$x)
summary(pca)
round(pca$rotation, 2)   # cargas de cada variable en cada componente
round(pca$sdev^2, 2)     # autovalores (criterio de Kaiser: > 1)

screeplot(pca, type = "lines", main = "Scree plot")

colores_estado <- c("Inactivo" = "gray40", "Bajo Gasto" = "orange", "Medio Gasto" = "green3", "Alto Gasto" = "blue")

plot(
  scores$PC1, scores$PC2,
  pch = 19, col = rgb(0, 0, 0, 0.4),
  xlab = "PC1", ylab = "PC2", main = "Scores PCA (sin colorear)"
)
plot(scores$PC1, scores$PC2, pch = 19, col = colores_estado[as.character(datos$estado_t1)],
  xlab = "PC1", ylab = "PC2", main = "Scores PCA coloreados por estado_t1")
niveles_estado <- names(colores_estado)
legend("topright", legend = niveles_estado, col = colores_estado[niveles_estado], pch = 19)

#########################################
### 1. Análisis de conglomerados (P1) ###
#########################################

### Medida de distancia

# Vamos a usar euclideana porque no hace sentido usar otra,
# las variables son continuas y es mejor para ward y kmeans
dist_z <- dist(datos_z, method = "euclidean")
as.matrix(dist_z)[1:5, 1:5] # muestra chica de la matriz de distancias

### Método jerárquico: comparación de criterios de enlace

hc_single <- hclust(dist_z, method = "single")
plot(hc_single, labels = FALSE, main = "Single Linkage", xlab = "Clientes", ylab = "Distancia")
# Se ve tremendamente desordenado, se ve un grupo grande y muchos puntos sueltos, probablemente no sea util en este caso
table(single = cutree(hc_single, k = 4))
# Se confirma lo anterior

hc_complete <- hclust(dist_z, method = "complete")
plot(hc_complete, labels = FALSE, main = "Complete Linkage", xlab = "Clientes", ylab = "Distancia")
# Se ve más ordenado, aunque está dificil decidir el mejor k visualmente
table(complete = cutree(hc_complete, k = 4))


hc_centroid <- hclust(dist_z, method = "centroid")
plot(hc_centroid, labels = FALSE, main = "Centroide", xlab = "Clientes", ylab = "Distancia")
# Se ve desordenado, con cruces entre ramas (el método del centroide puede fusionar a una altura menor que la fusión anterior),
# y con k = 4 deja un grupo de 546 clientes y uno de un solo cliente: no sirve para segmentar
table(centroide = cutree(hc_centroid, k = 4))

hc_ward <- hclust(dist_z, method = "ward.D2")
plot(hc_ward, labels = FALSE, main = "Ward (ward.D2)", xlab = "Clientes", ylab = "Distancia")
# Se ve más ordenado
table(ward = cutree(hc_ward, k = 4))

### Dendrograma y corte

# Alturas de las últimas fusiones: un salto grande indica que se unen grupos muy distintos
round(tail(hc_ward$height, 8), 2)
plot(hc_ward, labels = FALSE, main = "Dendrograma (Ward, distancia euclídea)",
     xlab = "Clientes", ylab = "Distancia (altura de fusión)")
abline(h = 20, col = "red", lty = 2)
grupos_hc <- cutree(hc_ward, k = 4)
table(grupos_hc)

### K-medias: número de conglomerados

# Criterio 1: método del codo (WSS)
wss <- numeric(10)
for (k in 1:10) {
  set.seed(GROUP)
  km_k <- kmeans(datos_z, centers = k, nstart = 25)
  wss[k] <- km_k$tot.withinss
}
wss
round(100 * (1 - wss / wss[1]), 1) # CLAUDE: Esto da el porcentaje de variabilidad explicada para cada k
plot(1:10, wss, type = "b", pch = 19, xlab = "Número de clusters", ylab = "WSS", main = "Método del codo")

# Criterio 2: coeficiente de silueta promedio
sil_prom <- numeric(10)
for (k in 2:10) {
  set.seed(GROUP)
  km_k <- kmeans(datos_z, centers = k, nstart = 25)
  sil_prom[k] <- mean(silhouette(km_k$cluster, dist_z)[, 3])
}
sil_prom
plot(2:10, sil_prom[2:10], type = "b", pch = 19, xlab = "Número de clusters",
     ylab = "Silueta promedio", main = "Silueta")

### K-medias con k final

set.seed(GROUP)
km <- kmeans(datos_z, centers = 4, nstart = 25)
km$size
km$centers                                  # centroides estandarizados
round(km$tot.withinss, 1)
round(100 * (1 - km$tot.withinss / wss[1]), 1)   # % de variabilidad explicada (igual que en el codo)

colores_cluster <- unname(colores_estado[c("Medio Gasto", "Inactivo", "Bajo Gasto", "Alto Gasto")])

# Silueta de la solución final
sil_km <- silhouette(km$cluster, dist_z)
plot(sil_km, main = "Silueta k-medias (k = 4)", col = colores_cluster, border = NA)

# Guardar las asignaciones en la base (la Parte 3 las usa)
datos$cluster_km <- km$cluster
datos$cluster_hc <- grupos_hc

### Comparación jerárquico vs k-medias

tabla_hc_km <- table(jerarquico = datos$cluster_hc, kmedias = datos$cluster_km)
tabla_hc_km

# Estabilidad. Se prueba con otra semilla para ver que tanto cambiaría
set.seed(GROUP + 1)
km_otra_semilla <- kmeans(datos_z, centers = 4, nstart = 25)
table(original = datos$cluster_km, otra_semilla = km_otra_semilla$cluster)
# Si cada fila tiene un solo valor distinto de cero, la partición es la misma (solo cambia la
# numeración) y la segmentación es estable respecto de la inicialización de k-medias.

### Caracterización de los conglomerados

nombres_cluster <- c("Regulares de gasto medio", "Inactivos", "Ocasionales de bajo gasto", "Frecuentes de alto gasto")
datos$cluster <- factor(datos$cluster_km, levels = 1:4, labels = nombres_cluster)

# Centroides en unidades originales (no estandarizadas)
centroides <- aggregate(datos[, VARS_CONT], by = list(cluster = datos$cluster), FUN = mean)
centroides[, -1] <- round(centroides[, -1], 2)
centroides

# Tamaño y proporción de cada segmento
tabla_cluster <- table(datos$cluster)
tabla_cluster
round(100 * tabla_cluster / sum(tabla_cluster), 1)

# Dispersión dentro de cada segmento (desviación estándar, unidades originales)
aggregate(datos[, VARS_CONT], by = list(cluster = datos$cluster), FUN = sd)

# Sobre las dos primeras componentes principales (scores del PCA de arriba)
plot(scores$PC1, scores$PC2, pch = 19, col = colores_cluster[datos$cluster_km],
     xlab = "PC1", ylab = "PC2", main = "Clusters de k-medias sobre PC1 vs PC2")
legend("topright", legend = nombres_cluster, col = colores_cluster, pch = 19)

#########################################
### 2. Clasificación supervisada (P2) ###
#########################################

### Distribución de la variable de clase y clasificador trivial

# Convertimos estado_t2 a factor, con sus 4 niveles ordenados
# (niveles_estado ya se definió en la exploración con PCA)
datos$estado_t2 <- factor(
  datos$estado_t2,
  levels = niveles_estado
)

frecuencias_t2 <- table(datos$estado_t2) #frecuencias de cada nivel

distribucion_t2 <- data.frame(
  Clase = names(frecuencias_t2),
  Frecuencia = as.numeric(frecuencias_t2),
  Porcentaje = round(100 * as.numeric(frecuencias_t2) / sum(frecuencias_t2), 2)
)

distribucion_t2

clase_mayoritaria_muestra <- names(which.max(frecuencias_t2))
clase_mayoritaria_muestra

### Separación en entrenamiento y validación

set.seed(GROUP)

seleccionar_entrenamiento <- function(clase) {

  idx_clase <- which(datos$estado_t2 == clase)

  # Cuántos clientes seleccionar
  n_clase <- length(idx_clase)
  n_entrenamiento <- round(0.70 * n_clase)

  # Seleccionar filas al azar sin repetir
  seleccionados <- sample(
    idx_clase,
    size = n_entrenamiento,
    replace = FALSE
  )

  return(seleccionados)
}

ent_inactivo <- seleccionar_entrenamiento("Inactivo")
ent_bajo <- seleccionar_entrenamiento("Bajo Gasto")
ent_medio <- seleccionar_entrenamiento("Medio Gasto")
ent_alto <- seleccionar_entrenamiento("Alto Gasto")

idx_entrenamiento <- c(ent_inactivo, ent_bajo, ent_medio, ent_alto)
entrenamiento <- datos[idx_entrenamiento, ]
validacion <- datos[-idx_entrenamiento, ]

# Verificamos que la partición sea correcta
nrow(entrenamiento)
nrow(validacion)

particion <- data.frame(
  Clase = niveles_estado,
  Entrenamiento = as.numeric(table(entrenamiento$estado_t2)),
  Validacion = as.numeric(table(validacion$estado_t2))
)

print(particion)

# Comprobar que no hay clientes compartidos
any(entrenamiento$id_cliente %in% validacion$id_cliente)

### Verificación de los supuestos de los métodos

# Predictores que evaluaremos: las 4 variables continuas (VARS_CONT)

evaluar_normalidad <- function(clase) {
  # Seleccionar los cuatro predictores de esa clase
  x <- entrenamiento[
    entrenamiento$estado_t2 == clase,
    VARS_CONT
  ]

  resultado <- mvn(x, mvn_test = "mardia")

  return(resultado$multivariate_normality)
}

normalidad_inactivo <- evaluar_normalidad("Inactivo")
normalidad_bajo <- evaluar_normalidad("Bajo Gasto")
normalidad_medio <- evaluar_normalidad("Medio Gasto")
normalidad_alto <- evaluar_normalidad("Alto Gasto")

normalidad_inactivo
normalidad_bajo
normalidad_medio
normalidad_alto

# H0: las matrices de covarianza son iguales entre clases
# H1: al menos una matriz es distinta

prueba_box <- boxM(
  entrenamiento[, VARS_CONT],
  entrenamiento$estado_t2
)

prueba_box

# p-value < 2.2e-16 < 0.05

covarianza_clase <- function(clase) {
  x <- entrenamiento[
    entrenamiento$estado_t2 == clase,
    VARS_CONT
  ]

  return(cov(x))
}

cov_inactivo <- covarianza_clase("Inactivo")
cov_bajo <- covarianza_clase("Bajo Gasto")
cov_medio <- covarianza_clase("Medio Gasto")
cov_alto <- covarianza_clase("Alto Gasto")

round(cov_inactivo, 2)
# varianza "dias_ultima_sesion": 2708.85
# varnza "ticket_promedio":  465.49

round(cov_bajo, 2)
# var "dias_ultima_sesion":  890.83
# var "ticket_promedio":  519.92

round(cov_medio, 2)
# var "dias_ultima_sesion":  377.19
# var "ticket_promedio":  529.07

round(cov_alto, 2)
# var "dias_ultima_sesion": 417.06
# var "ticket_promedio":  1031.60

### Ajuste de clasificadores

# QDA: elegido a partir de paso anterior
modelo_qda <- qda(
  estado_t2 ~ dias_ultima_sesion + pedidos_12m +
    ticket_promedio + pct_restaurantes,
  data = entrenamiento
)

modelo_qda

# Naive Bayes

# Evaluar independencia entre los predictores dentro de la clase
correlacion_clase <- function(clase) {
  x <- entrenamiento[
    entrenamiento$estado_t2 == clase,
    VARS_CONT
  ]

  return(round(cor(x), 2))
}

correlacion_clase("Inactivo")
correlacion_clase("Bajo Gasto")
correlacion_clase("Medio Gasto")
correlacion_clase("Alto Gasto")

modelo_nb <- naiveBayes(
  estado_t2 ~ dias_ultima_sesion + pedidos_12m +
    ticket_promedio + pct_restaurantes,
  data = entrenamiento
)

modelo_nb

### Matriz de confusión y métricas por clase

pred_qda <- predict(modelo_qda, validacion)$class # Predicciones de QDA


pred_nb <- predict(modelo_nb, validacion) # Predicciones de Naive Bayes

clase_mayoritaria <- names(
  which.max(table(entrenamiento$estado_t2))
)

pred_trivial <- factor(
  rep(clase_mayoritaria, nrow(validacion)),
  levels = niveles_estado
)

matriz_qda <- table(
  Real = validacion$estado_t2,
  Predicho = pred_qda
)

matriz_nb <- table(
  Real = validacion$estado_t2,
  Predicho = pred_nb
)

matriz_trivial <- table(
  Real = validacion$estado_t2,
  Predicho = pred_trivial
)

matriz_qda
matriz_nb
matriz_trivial

# Accuracy (proporción de aciertos) de cada clasificador
sum(diag(matriz_qda)) / sum(matriz_qda)
sum(diag(matriz_nb)) / sum(matriz_nb)
sum(diag(matriz_trivial)) / sum(matriz_trivial)

metricas_clasificador <- function(matriz) {
  # Aciertos de cada clase
  aciertos <- diag(matriz)

  # Cantidad real de clientes de cada clase
  total_real <- rowSums(matriz)

  # Cantidad de clientes predichos como cada clase
  total_predicho <- colSums(matriz)

  sensibilidad <- aciertos / total_real
  precision <- aciertos / total_predicho

  # Si nunca se predice una clase, su precisión no está definida
  precision[total_predicho == 0] <- NA

  resultado <- data.frame(
    Clase = rownames(matriz),
    Sensibilidad = round(100 * sensibilidad, 2),
    Precision = round(100 * precision, 2)
  )

  return(resultado)
}

metricas_clasificador(matriz_qda)
metricas_clasificador(matriz_nb)
metricas_clasificador(matriz_trivial)

### Análisis de errores y predictores por clase

graficar_por_clase <- function(variable) {
  boxplot(
    entrenamiento[[variable]] ~ entrenamiento$estado_t2,
    main = paste(variable, "por clase"),
    xlab = "Clase en T2",
    ylab = variable,
    col = "lightblue"
  )
}

graficar_por_clase("dias_ultima_sesion")
graficar_por_clase("pedidos_12m")
graficar_por_clase("ticket_promedio")
graficar_por_clase("pct_restaurantes")

#####################################
### 3. Integración de ambos (P3)  ###
#####################################

### Tabla de contingencia: conglomerados vs estado_t2

# Conglomerados de k-medias de la Parte 1 (datos$cluster) contra la clase de la Parte 2
tabla_cluster_t2 <- table(cluster = datos$cluster, estado_t2 = datos$estado_t2)
tabla_cluster_t2

# Porcentaje por fila: de cada segmento, qué % termina en cada nivel de gasto en T2
pct_cluster_t2 <- round(100 * tabla_cluster_t2 / rowSums(tabla_cluster_t2), 1)
pct_cluster_t2

barplot(
  t(pct_cluster_t2),
  beside = TRUE,
  col = colores_estado[niveles_estado],
  main = "estado_t2 dentro de cada conglomerado",
  xlab = "Conglomerado (k-medias)",
  ylab = "% de clientes del conglomerado",
  ylim = c(0, 100),
  cex.names = 0.7
)
legend("topright", legend = niveles_estado, col = colores_estado[niveles_estado], pch = 15)

apply(tabla_cluster_t2, 1, max)
sum(apply(tabla_cluster_t2, 1, max)) / sum(tabla_cluster_t2)
max(frecuencias_t2) / sum(frecuencias_t2)

# Comparación con estado_t1
table(cluster = datos$cluster, estado_t1 = datos$estado_t1)

### Conglomerado como variable predictora adicional

table(entrenamiento$cluster)
table(validacion$cluster)

# QDA con el conglomerado como predictor adicional
modelo_qda_cl <- qda(
  estado_t2 ~ dias_ultima_sesion + pedidos_12m +
    ticket_promedio + pct_restaurantes + cluster,
  data = entrenamiento
)

pred_qda_cl <- predict(modelo_qda_cl, validacion)$class

matriz_qda_cl <- table(
  Real = validacion$estado_t2,
  Predicho = pred_qda_cl
)

# Naive Bayes con el conglomerado como predictor adicional
modelo_nb_cl <- naiveBayes(
  estado_t2 ~ dias_ultima_sesion + pedidos_12m +
    ticket_promedio + pct_restaurantes + cluster,
  data = entrenamiento
)

modelo_nb_cl$tables$cluster

pred_nb_cl <- predict(modelo_nb_cl, validacion)

matriz_nb_cl <- table(
  Real = validacion$estado_t2,
  Predicho = pred_nb_cl
)

# sin conglomerado vs con conglomerado
matriz_qda
matriz_qda_cl
sum(diag(matriz_qda)) / sum(matriz_qda)
sum(diag(matriz_qda_cl)) / sum(matriz_qda_cl)
metricas_clasificador(matriz_qda)
metricas_clasificador(matriz_qda_cl)

matriz_nb
matriz_nb_cl
sum(diag(matriz_nb)) / sum(matriz_nb)
sum(diag(matriz_nb_cl)) / sum(matriz_nb_cl)
metricas_clasificador(matriz_nb)
metricas_clasificador(matriz_nb_cl)
