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

#================================================================
# 2.1 Distribución de la variable de clase y clasificador trivial
#================================================================

#4 niveles de la variable que queremos predecir (estado_t2)
niveles_estado <- c(
  "Inactivo",
  "Bajo Gasto",
  "Medio Gasto",
  "Alto Gasto"
)

#Convertimos estado_t2 a factor 
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

# La clase más frecuente es "Medio Gasto" (35,25 %), 
# seguida de "Alto Gasto" (23,62 %), "Bajo Gasto" (23,12 %)
# e "Inactivo" (18 %). Por lo tanto, el clasificador trivial
# es la categoría "Medio Gasto".

#===================================================
#2.2 Separar los datos en entrenamiento y validación
#===================================================

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

#verificamos que la partición sea correcta
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

# El desempeño no puede evaluarse con los mismos datos con los 
# que se entrenó, ya que el modelo podría sobreajustarse a esos datos
# porque ya los ha visto. Es por eso que se usa una partición
# de validación, para evaluar el desempeño con datos que el modelo
# no ha visto antes, lo que refleja una situacion más realista
# y permite medir la capacidad de generalizar del modelo.

#==========================================
#2.3 Verificar los supuestos de los métodos
#=========================================

library(MVN)

# Predictores que evaluaremos
VARS_CONT <- c(
  "dias_ultima_sesion",
  "pedidos_12m",
  "ticket_promedio",
  "pct_restaurantes"
)

evaluar_normalidad <- function(clase) {
  # Seleccionar los cuatro predictores de esa clase
  x <- entrenamiento[
    entrenamiento$estado_t2 == clase,
    VARS_CONT
  ]

  resultado <- MVN::mvn(x, mvn_test = "mardia")

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

# La prueba de Mardia rechaza la hipótesis nula de normalidad multivariante
# en las cuatro clases, ya que la prueba de asimetría presenta p < 0.001
# en todas ellas. La prueba de curtosis también rechaza su hipótesis
# nula en Inactivo, Bajo Gasto y Alto Gasto. En Medio Gasto no se rechaza
# la curtosis al 5% (p = 0.058), pero sí la asimetría. Esto indica que no
# se cumple el supuesto de normalidad multivariante dentro de cada clase,
# lo que representa una limitación para el uso de LDA y QDA, ya que ambos
# métodos requieren este supuesto.

# H0: las matrices de covarianza son iguales entre clases
# H1: al menos una matriz es distinta

#install.packages("biotools")
prueba_box <- biotools::boxM(
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
# Varianza "dias_ultima_sesion": 2708.85
# Varianza "ticket_promedio":  465.49

round(cov_bajo, 2) 
# Varianza "dias_ultima_sesion":  890.83
# Varianza "ticket_promedio":  519.92

round(cov_medio, 2) 
# Varianza "dias_ultima_sesion":  377.19
# Varianza "ticket_promedio":  529.07

round(cov_alto, 2) 
# Varianza "dias_ultima_sesion": 417.06
# Varianza "ticket_promedio":  1031.60

# La prueba de box M rechaza la hipótesis nula de igualdad de matrices
# de covarianza entre clases (p < 2.2e-16), lo que indica que al menos 
# una de las matrices es diferente. Ademas las matrices muestran diferencias
# importantes en las varianzas de "dias_ultima_sesion" y "ticket_promedio" 
# entre clases. Por esto elegimos QDA, ya que permite una matriz de covarianza
# distinta para cada clase, a diferencia de LDA que supone una matriz común 
# entre todas las clases. Sin embargo, la falta de normalidad detectada 
# por Mardia exige interpretar Box M con cautela y sigue siendo una limitación
# para QDA.

#====================================
# 2.4 Ajuste de clasificadores
#====================================

# QDA: elegido a partir de paso anterior
modelo_qda <- MASS::qda(
  estado_t2 ~ dias_ultima_sesion + pedidos_12m +
    ticket_promedio + pct_restaurantes,
  data = entrenamiento
)

modelo_qda

# Las medias por clase muestran que los clientes que son Inactivos en t2
# presentaron, en promedio, más días sin sesión y menores valores de pedidos
# y ticket promedio en t1. En cambio, quienes tienen Alto Gasto en t2 
# presentaron mayor actividad y ticket promedio. Bajo y Medio Gasto muestran
# valores intermedios. 

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

# Naive Bayes supone independencia entre los predictores dentro de cada
# clase. Sin embargo las correlaciones entre "pedidos_12m" y
# "ticket_promedio" (0.74 a 0.92) indican que este supuesto no se cumple
# adecuadamente. Esto limita el modelo, lo que puede afectar el desempeño
# en validación.

modelo_nb <- e1071::naiveBayes(
  estado_t2 ~ dias_ultima_sesion + pedidos_12m +
    ticket_promedio + pct_restaurantes,
  data = entrenamiento
)

modelo_nb

# Naive Bayes supone normalidad de cada predictor numérico dentro de cada
# clase. La normalidad de cada variable por separado no se ha verificado, 
# ya que Mardia evalúa la normalidad conjunta. Por ello su rechazo no 
# permite concluir que todos los predictores sean individualmente no 
# normales. Esto limita la justificación de los supuestos del modelo
# y debe considerarse al evaluar su desempeño.

#===========================================
# 2.5 Matriz de confusión
#===========================================

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

# QDA y Naive Bayes superan la exactitud del clasificador trivial
# (35.56%), con valores de 59.00% y 57.74%, respectivamente.
# QDA presenta mayor sensibilidad para Medio Gasto (74.12%), mientras
# que Naive Bayes detecta mejor Alto Gasto (73.21%) y Bajo Gasto (40.35%).
# Sin embargo, ambos presentan baja sensibilidad para Inactivo y Bajo
# Gasto, por lo que la exactitud global no es suficiente para concluir
# que identifican adecuadamente a los clientes de menor gasto.
# El clasificador trivial solo identifica Medio Gasto y tiene sensibilidad
# nula para las demás clases. Su precisión en esas clases no está definida
# (NA), ya que nunca las predice.

#============================================
# 2.6 Análisis de errores y predictores por clase
#============================================

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

# Los errores se concentran principalmente entre Medio Gasto y las
# otras clases. En QDA destacan Bajo Gasto clasificado como Medio Gasto
# (22 clientes) y Alto Gasto como Medio Gasto (16). En Naive Bayes destaca
# la confusión entre Bajo y Medio Gasto, con 18 y 16 errores en cada sentido.
# Este patrón es compatible con el solapamiento de los perfiles en T1:
# clientes con características similares pueden presentar distintos
# niveles de gasto en T2. Además, clasificar a un futuro Inactivo como
# Medio Gasto podría dejarlo fuera de una campaña de retención.

# Las medias de entrenamiento sugieren que "dias_ultima_sesion" distingue
# principalmente a Inactivo, mientras que "ticket_promedio" y "pedidos_12m"
# distinguen a Alto Gasto. Bajo y Medio Gasto presentan perfiles intermedios,
# lo que dificulta su separación. Los boxplots permiten revisar la dispersión
# y el solapamiento para complementar esta interpretación; las diferencias
# de medias no constituyen un ranking formal de importancia de variables.

#####################################
### 3. Integración de ambos (P3)  ###
#####################################

# (por completar)























