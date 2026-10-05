# == Librerías ========================================================================================
# Paquetes necesarios (instalar una sola vez, luego dejar comentado):
# install.packages(c("psych", "dplyr", "cluster", "MASS", "e1071", "MVN"))
library(dplyr)
library(psych)
# =====================================================================================================

# == Variables de entorno =======================================================================================
# i = ((GROUP - 1) %% 5) + 1 = 4
PATH_TO_DATASET <- "tarea_2/grupo_4_clientes.csv"
GROUP <- 24   # Somos el grupo 24 en canvas
# ===============================================================================================================

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
VARS_CONT <- c("dias_ultima_sesion", "pedidos_12m", "ticket_promedio", "pct_restaurantes")

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
# Mostrar el valor en días de los outliers (puntos fuera de los bigotes del boxplot)
outliers_dias <- boxplot.stats(datos$dias_ultima_sesion)$out
min(outliers_dias)
sum(outliers_dias >= 118)
# eliminar outliers
datos_2 <- datos[datos$dias_ultima_sesion < 118, ]

graficar_hist("pedidos_12m")
graficar_boxplot("pedidos_12m")

graficar_hist("ticket_promedio")
graficar_boxplot("ticket_promedio")

graficar_hist("pct_restaurantes")
graficar_boxplot("pct_restaurantes")

# Distribución de frecuencias de estado_t1 y estado_t2
tabla_t1 <- table(datos$estado_t1)
tabla_t2 <- table(datos$estado_t2)
tabla_t1
tabla_t2

barplot(tabla_t1, main = "estado_t1", xlab = "Nivel de gasto", ylab = "Frecuencia", col = "blue")
barplot(tabla_t2, main = "estado_t2", xlab = "Nivel de gasto", ylab = "Frecuencia", col = "blue")

# Transiciones T1 -> T2 (útil para la discusión de la Parte 2)
table(estado_t1 = datos$estado_t1, estado_t2 = datos$estado_t2)

### Ceros estructurales

# ticket_promedio = 0 NO es dato faltante: son clientes que no hicieron pedidos en T1.
sum(datos$ticket_promedio == 0)
table(ticket_cero = datos$ticket_promedio == 0, estado_t1 = datos$estado_t1)
# Los ceros coinciden exactamente con estado_t1 = "Inactivo" (la recodificación es determinística)

# Tratamiento: SE MANTIENEN en la base. Son clientes reales y el segmento inactivo es
# justamente de interés para retención; eliminarlos dejaría fuera a los más críticos y
# sesgaría hacia arriba el ticket promedio. Se marcan con un indicador para poder
# analizarlos por separado y hacer análisis de sensibilidad.
datos$sin_pedidos_t1 <- datos$ticket_promedio == 0

# Efecto sobre los análisis posteriores: el bloque de ceros baja la media de ticket_promedio
# y crea una masa en 0 (no normal). Además refuerza la correlación con pedidos_12m.
# Comparación con y sin ceros:
ticket_con_ceros <- mean(datos$ticket_promedio)
ticket_sin_ceros <- mean(datos$ticket_promedio[!datos$sin_pedidos_t1])
c(con_ceros = ticket_con_ceros, sin_ceros = ticket_sin_ceros)
round(cor(datos[, VARS_CONT]), 2)
round(cor(datos[!datos$sin_pedidos_t1, VARS_CONT]), 2)

### Truncamiento

# dias_ultima_sesion está truncada en 180: quien lleva más de eso se registra con 180
sum(datos$dias_ultima_sesion >= 180)  # Ninguno
max(datos$dias_ultima_sesion) # 179
max(ds_clientes_completo$dias_ultima_sesion) # 179, incluso en todo el dataset original no hay

### Escalamiento

# Las variables están en unidades muy distintas (días, nº de pedidos, miles de pesos, proporción).
round(sapply(datos[, VARS_CONT], sd), 2)
# Para conglomerados (Parte 1) SÍ se estandarizan: las distancias dependen de la escala y
# ticket_promedio (sd ~31) y dias_ultima_sesion (sd ~36) dominarían sobre pct_restaurantes (sd ~0,2).
datos_z <- as.data.frame(scale(datos[, VARS_CONT]))
round(colMeans(datos_z), 10)
round(sapply(datos_z, sd), 10)
# Para clasificación (Parte 2) LDA, QDA y Naive Bayes son invariantes a cambios de escala
# (la función discriminante se ajusta sola), por lo que se usan las variables originales,
# lo que además deja los coeficientes interpretables en unidades originales.

### Correlación

matriz_cor <- cor(datos[, VARS_CONT])
round(matriz_cor, 2)

png(file.path(PATH_FIGURAS, "matriz_correlacion.png"), width = 900, height = 900)
pairs.panels(datos[, VARS_CONT], method = "pearson", hist.col = "green", main = "Matriz de correlación")
dev.off()

# Comentario: pedidos_12m y ticket_promedio están muy correlacionadas (~0,85), y ambas se
# relacionan con dias_ultima_sesion (~-0,59) y pct_restaurantes (~0,6).
# - Parte 1: con distancia euclídea sin corregir, las variables correlacionadas cuentan
#   "doble" (la dimensión actividad/gasto pesa más que las demás). Estandarizar iguala
#   varianzas pero NO elimina la correlación; la distancia de Mahalanobis sí la corrige.
# - Parte 2: Naive Bayes supone independencia condicional entre predictores dentro de cada
#   clase; con estas correlaciones (aún dentro de clase) ese supuesto no se cumple bien.
#   LDA/QDA no lo requieren, pero la multicolinealidad entre pedidos_12m y ticket_promedio
#   vuelve inestables los coeficientes individuales.

#####################################
### Fin del preprocesamiento      ###
### Objetos para las Partes 1 y 2 ###
#####################################
# datos      : submuestra de 800 clientes (originales + sin_pedidos_t1)
# datos_z    : las 4 variables continuas estandarizadas (para Parte 1)
# VARS_CONT  : nombres de las 4 variables continuas
# niveles_estado : niveles ordenados de estado_t1/estado_t2
# PATH_FIGURAS / GROUP : carpeta de figuras y número de grupo (semilla)

##########################################################
### Exploración visual: PCA (¿hay clusters claros?)    ###
##########################################################

# PCA sobre las 4 variables continuas estandarizadas (solo exploratorio, no es parte del enunciado)
pca_2 <- prcomp(datos_2[, VARS_CONT], scale. = TRUE)
summary(pca)
round(pca$rotation, 2)   # cargas de cada variable en cada componente
round(pca$sdev^2, 2)     # autovalores (criterio de Kaiser: > 1)

png(file.path(PATH_FIGURAS, "pca_screeplot.png"), width = 700, height = 500)
screeplot(pca, type = "lines", main = "Scree plot")
dev.off()

scores_2 <- as.data.frame(pca_2$x)

# Biplot (PC1 vs PC2)
png(file.path(PATH_FIGURAS, "pca_biplot.png"), width = 900, height = 900)
biplot(pca, scale = 0, cex = 0.5, main = "Biplot PC1 vs PC2")
dev.off()

# Scores PC1 vs PC2 sin colorear (¿se ven grupos separados?) y coloreados por estado
colores_estado <- c("Inactivo" = "gray40", "Bajo Gasto" = "orange", "Medio Gasto" = "green3", "Alto Gasto" = "blue")

png(file.path(PATH_FIGURAS, "pca_scores.png"), width = 1400, height = 700)
par(mfrow = c(1, 2))
plot(scores$PC1, scores$PC2, pch = 19, col = rgb(0, 0, 0, 0.4),
     xlab = "PC1", ylab = "PC2", main = "Scores PCA (sin colorear)")
plot(scores_2$PC1, scores_2$PC2, pch = 19, col = colores_estado[as.character(datos_2$estado_t1)],
     xlab = "PC1", ylab = "PC2", main = "Scores PCA coloreados por estado_t1")
legend("topright", legend = niveles_estado, col = colores_estado[niveles_estado], pch = 19)
dev.off()
par(mfrow = c(1, 1))

# Densidad 2D: si hubiera clusters claros se verían varios "cerros" separados
png(file.path(PATH_FIGURAS, "pca_densidad.png"), width = 800, height = 700)
smoothScatter(scores$PC1, scores$PC2, xlab = "PC1", ylab = "PC2", main = "Densidad de scores (PC1 vs PC2)")
dev.off()

#########################################
### 1. Análisis de conglomerados (P1) ###
#########################################

# (por completar)

#########################################
### 2. Clasificación supervisada (P2) ###
#########################################

# (por completar)

#####################################
### 3. Integración de ambos (P3)  ###
#####################################

# (por completar)
