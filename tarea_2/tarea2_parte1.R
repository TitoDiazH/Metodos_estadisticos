# == Librerías ========================================================================================
# Paquetes necesarios (instalar una sola vez, luego dejar comentado):
# install.packages(c("psych", "dplyr", "cluster"))   # cluster viene con la instalación de R
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
cor(datos[, VARS_CONT])
cor(datos[!datos$sin_pedidos_t1, VARS_CONT])

### Truncamiento

# dias_ultima_sesion está truncada en 180: quien lleva más de eso se registra con 180
sum(datos$dias_ultima_sesion >= 180)  # Ninguno
max(datos$dias_ultima_sesion) # 179
max(ds_clientes_completo$dias_ultima_sesion) # 179, incluso en todo el dataset original no hay

### Escalamiento

# Las variables están en unidades muy distintas (días, n de pedidos, miles de pesos, proporción).
sapply(datos[, VARS_CONT], sd)
# Para conglomerados (Parte 1) SÍ se estandarizan: las distancias dependen de la escala y
# ticket_promedio (sd ~31) y dias_ultima_sesion (sd ~36) dominarían sobre pct_restaurantes (sd ~0,2).
datos_z <- as.data.frame(scale(datos[, VARS_CONT]))
colMeans(datos_z)
sapply(datos_z, sd)
# Para clasificación (Parte 2) LDA, QDA y Naive Bayes son invariantes a cambios de escala
# (la función discriminante se ajusta sola), por lo que se usan las variables originales,
# lo que además deja los coeficientes interpretables en unidades originales.

### Correlación

matriz_cor <- cor(datos[, VARS_CONT])
matriz_cor

# Comentario: pedidos_12m y ticket_promedio están muy correlacionadas (~0,85), y ambas se
# relacionan con dias_ultima_sesion (~-0,59) y pct_restaurantes (~0,6).
# - Parte 1: con distancia euclídea sin corregir, las variables correlacionadas cuentan
#   "doble" (la dimensión actividad/gasto pesa más que las demás). Estandarizar iguala
#   varianzas pero NO elimina la correlación.
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
pca <- prcomp(datos[, VARS_CONT], scale. = TRUE)   # muestra completa (la usa la Parte 1)
scores <- as.data.frame(pca$x)
summary(pca)
round(pca$rotation, 2)   # cargas de cada variable en cada componente
round(pca$sdev^2, 2)     # autovalores (criterio de Kaiser: > 1)

screeplot(pca, type = "lines", main = "Scree plot")

# Biplot (PC1 vs PC2)
biplot(pca, scale = 0, cex = 0.5, main = "Biplot PC1 vs PC2")

# Scores PC1 vs PC2 sin colorear (¿se ven grupos separados?) y coloreados por estado
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

# Solo se usan las 4 variables continuas estandarizadas (datos_z).
# estado_t1 y estado_t2 NO participan en esta parte.
library(cluster)

### Medida de distancia

# Vamos a usar euclideana porque no hace sentido usar otra,
# las variables son continuas y es mejor para ward y kmeans
dist_z <- dist(datos_z, method = "euclidean")
as.matrix(dist_z)[1:5, 1:5] # muestra chica de la matriz de distancias

# Efecto de la correlación (pedidos_12m y ticket_promedio ~0,85): la euclídea cuenta "doble"
# la dimensión actividad/gasto, porque ambas variables miden en parte lo mismo. Estandarizar
# iguala las varianzas pero no elimina la correlación; se deja como limitación del análisis.

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
# Se ve más ordenado, aunque visualmente podría pensar k=4 o k=5
table(ward = cutree(hc_ward, k = 4))

### Dendrograma y corte

# Alturas de las últimas fusiones: un salto grande indica que se unen grupos muy distintos
round(tail(hc_ward$height, 8), 2)
plot(hc_ward, labels = FALSE, main = "Dendrograma (Ward, distancia euclídea)",
     xlab = "Clientes", ylab = "Distancia (altura de fusión)")
abline(h = 20, col = "red", lty = 2)   # línea de corte: entre las alturas 12,9 y 28,6 (4 grupos)
# Cómo se lee: cada rama final es un cliente; la altura a la que se unen dos ramas es la
# distancia entre los grupos. Se corta con una línea horizontal donde hay un salto grande
# antes de la siguiente fusión. Las últimas fusiones (~8,1; 8,5; 9,7; 10,3; 12,9; 28,6; 30,7; 57,1)
# muestran un salto fuerte entre la fusión que pasa de 5 a 4 grupos (12,9) y la que pasa de 4 a 3 (28,6):
# unir cualquiera de los 4 grupos cuesta mucho más que las fusiones anteriores. Luego 3 -> 2 (30,7) y
# 2 -> 1 (57,1). Un corte en k = 4 (línea entre 12,9 y 28,6) deja grupos bien separados; cortar más
# abajo (k > 4) solo subdivide grupos que se unen a alturas similares (8,1 a 12,9).
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

# - Codo: la caída del WSS es fuerte hasta k = 4 y después se suaviza (el codo está en 4).
# - Silueta: máximo en k = 4 (0,446), apenas sobre k = 2 (0,442); k >= 5 empeora claramente.
# Discrepancia: la silueta casi no distingue k = 2 de k = 4 (0,442 vs 0,446). k = 2 separa solo
# "inactivos vs activos" (útil pero poco accionable), mientras que el codo muestra que pasar a 4
# grupos reduce mucho el WSS. Se elige k = 4 por coincidir codo y silueta, y por ser el más
# interpretable para gestión.

### K-medias con k final

set.seed(GROUP)
km <- kmeans(datos_z, centers = 4, nstart = 25)
km$size
km$centers                                  # centroides estandarizados
round(km$tot.withinss, 1)
round(100 * (1 - km$tot.withinss / wss[1]), 1)   # % de variabilidad explicada (igual que en el codo)

# Silueta de la solución final
sil_km <- silhouette(km$cluster, dist_z)
plot(sil_km, main = "Silueta k-medias (k = 4)")

# Guardar las asignaciones en la base (la Parte 3 las usa)
# Ojo: los números de cluster los entrega kmeans y dependen de la semilla (set.seed(GROUP)).
datos$cluster_km <- km$cluster
datos$cluster_hc <- grupos_hc

### Comparación jerárquico vs k-medias

tabla_hc_km <- table(jerarquico = datos$cluster_hc, kmedias = datos$cluster_km)
tabla_hc_km
# Los números de cada método son arbitrarios: se compara qué columna concentra cada fila.
# Cada grupo jerárquico cae casi entero en un solo grupo de k-medias: 301 + 174 + 228 + 74 = 777 de
# 800 clientes (~97%) coinciden. El grupo de 74 inactivos es idéntico en ambos métodos; las
# diferencias (23 clientes) están en la frontera entre los grupos de actividad media y alta,
# que forman un continuo.

# Estabilidad: ¿cambia la solución con otra semilla?
set.seed(GROUP + 1)
km_otra_semilla <- kmeans(datos_z, centers = 4, nstart = 25)
table(original = datos$cluster_km, otra_semilla = km_otra_semilla$cluster)
# Si cada fila tiene un solo valor distinto de cero, la partición es la misma (solo cambia la
# numeración) y la segmentación es estable respecto de la inicialización de k-medias.

### Caracterización de los conglomerados

# Nombres según los centroides (ver abajo), en el orden de numeración que entrega kmeans
# con set.seed(GROUP): 1 = 249 clientes, 2 = 74, 3 = 303, 4 = 174.
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

# Clientes con ticket_promedio = 0 (ceros estructurales) en cada segmento
table(datos$cluster, datos$sin_pedidos_t1)

# Puntos coloreados por el cluster de k-medias
# Mismos colores que el gráfico de PCA por estado_t1 (colores_estado), en el orden de nombres_cluster:
# Regulares = Medio Gasto, Inactivos = Inactivo, Ocasionales = Bajo Gasto, Frecuentes = Alto Gasto
colores_cluster <- unname(colores_estado[c("Medio Gasto", "Inactivo", "Bajo Gasto", "Alto Gasto")])

# (a) Sobre las dos primeras componentes principales (scores del PCA de arriba)
plot(scores$PC1, scores$PC2, pch = 19, col = colores_cluster[datos$cluster_km],
     xlab = "PC1", ylab = "PC2", main = "Clusters de k-medias sobre PC1 vs PC2")
legend("topright", legend = nombres_cluster, col = colores_cluster, pch = 19)

# (b) Sobre variables originales
plot(datos$pedidos_12m, datos$ticket_promedio, pch = 19, col = colores_cluster[datos$cluster_km],
     xlab = "pedidos_12m", ylab = "ticket_promedio", main = "Clusters de k-medias: pedidos vs ticket")
legend("topleft", legend = nombres_cluster, col = colores_cluster, pch = 19)

plot(datos$dias_ultima_sesion, datos$pedidos_12m, pch = 19, col = colores_cluster[datos$cluster_km],
     xlab = "dias_ultima_sesion", ylab = "pedidos_12m", main = "Clusters de k-medias: días sin sesión vs pedidos")
legend("topright", legend = nombres_cluster, col = colores_cluster, pch = 19)

# Alternativa de la clase 5.2 (requiere install.packages("factoextra")):
# library(factoextra)
# fviz_cluster(km, data = datos_z, palette = "Set2", ggtheme = theme_minimal())

# Interpretación (centroides en unidades originales):
# 1. Inactivos (74; 9,2%): ~134 días sin sesión, ~1 pedido en 12 meses, ticket 0, 24% restaurantes.
#    Son los clientes que ya se fueron (el 100% tiene ticket_promedio = 0 en T1).
# 2. Ocasionales de bajo gasto (303; 37,9%): ~46 días sin sesión, ~9 pedidos, ticket ~19 mil, 23%
#    restaurantes. Compran poco, con tickets bajos y orientados a supermercado/farmacia/conveniencia.
# 3. Regulares de gasto medio (249; 31,1%): ~32 días, ~23 pedidos, ticket ~36 mil, 60% restaurantes.
# 4. Frecuentes de alto gasto (174; 21,8%): ~15 días, ~43 pedidos, ticket ~88 mil, 60% restaurantes.
#    Son los clientes más valiosos y más recientes.
# La silueta (gráfico de arriba) muestra el ancho promedio de cada segmento.

### Acciones comerciales por segmento

# 1. Inactivos (~9% de la base; ~134 días sin abrir la app, ~1 pedido/año)
#    Acción: campaña de reactivación de bajo costo y acotada (1 correo/push mensual por 2-3 meses)
#    con un cupón de primer pedido de monto fijo, sin descuentos porcentuales altos.
#    Evidencia: el costo de recuperar crece más rápido que el ingreso (enunciado) y su ticket
#    histórico es 0; conviene un tope de presupuesto y cortar el contacto si no responden.
# 2. Ocasionales de bajo gasto (~38% de la base; ~9 pedidos/año, ticket ~19 mil)
#    Acción: incentivos para subir frecuencia y ticket (envío gratis sobre un monto mínimo,
#    "pide X veces este mes y obtén un beneficio"), contacto quincenal.
#    Evidencia: ~46 días sin sesión (a riesgo de pasar a inactivos) y el ticket más bajo entre
#    los activos; son el mayor segmento y el donde un aumento pequeño del ticket pesa más.
# 3. Regulares de gasto medio (~31% de la base; ~23 pedidos/año, ticket ~36 mil)
#    Acción: programa de fidelización y recomendaciones por categoría (60% restaurantes);
#    contacto semanal y solo incentivos no monetarios (puntos, acceso anticipado).
#    Evidencia: recurrencia alta y ticket cercano al umbral de Alto Gasto: el objetivo es
#    mantenerlos y empujar a algunos al segmento 4 sin gastar cupones en quienes ya compran.
# 4. Frecuentes de alto gasto (~22% de la base; ~43 pedidos/año, ticket ~88 mil)
#    Acción: retención preventiva con beneficios exclusivos (membresía, atención prioritaria),
#    sin descuentos generales. Contacto solo ante señales de alerta (p. ej. más de 30 días sin sesión).
#    Evidencia: concentran el ingreso por comisión (mayor frecuencia y ticket, el más reciente);
#    un cupón masivo sería gasto innecesario porque ya compran.
# (Los porcentajes y valores de los comentarios son los de la corrida con GROUP = 24;
#  verificar con las tablas de arriba si se cambia la semilla o la muestra.)

#########################################
### 2. Clasificación supervisada (P2) ###
#########################################

# (por completar)

#####################################
### 3. Integración de ambos (P3)  ###
#####################################

# (por completar)
