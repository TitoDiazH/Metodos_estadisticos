# == Librerías ========================================================================================
# Paquetes necesarios (instalar una sola vez, luego dejar comentado):
# install.packages(c("psych", "plot3D", "mvtnorm", "readxl", "BSDA", "ICSNP", "dplyr", "tidyr", "MVN"))
library(readxl)
library(dplyr)
library(tidyr)
library(psych)
library(mvtnorm)
library(MVN)
# =====================================================================================================

# == Variables de entorno =======================================================================================
PATH_TO_DATASET <- "tarea_1/AfluentesHistoricosChile-1.xlsx"   # Cambiar por donde esté en su pc
GROUP <- 24   # Somos el grupo 24 en canvas
# ===============================================================================================================

# == Cargar datos iniciales ===============
set.seed(GROUP)
ds_afluentes <- read_excel(PATH_TO_DATASET)
head(ds_afluentes)
# =========================================

#######################################
### 0. Preprocesamiento Obligatorio ###
#######################################

### Reestructuración✅

# Cambiar "hydro_node_name" a "nodo"
ds_afluentes <- rename(ds_afluentes, nodo=hydro_node_name)
head(ds_afluentes)

# pivotear de ancho a largo
ds_mensual <- pivot_longer(
  ds_afluentes,
  cols = -nodo,
  names_to = "fecha",
  values_to = "caudal"
)
head(ds_mensual)

# Transformar fecha a date
ds_mensual$fecha <- as.Date(
  as.numeric(ds_mensual$fecha),   # En el head de antes se puede ver que ahora es un <chr>
  origin="1899-12-30"   # ARREGLO DE CLAUDE: sin esto los años se ponían como por el 2078 por un tema de estándares
)
head(ds_mensual)

# (Ordenamos acá que es más fácil solo por fecha)
ds_mensual <- arrange(ds_mensual, nodo, fecha)

# Separar fecha a año y mes
ds_mensual$ano <- as.integer(format(ds_mensual$fecha, "%Y"))
ds_mensual$mes <- as.integer(format(ds_mensual$fecha, "%m"))
ds_mensual <- select(ds_mensual, nodo, ano, mes, caudal)
head(ds_mensual)

### Ordenar columnas temporalmente (Lo hicimos antes que era más fácil)✅

### Caudal anual medio
ds_anual <- group_by(ds_mensual, nodo, ano)
ds_anual <- summarize(ds_anual, caudal_anual=mean(caudal), .groups="drop")
head(ds_anual)

### Encontrar fallas (rios sin cambios de caudal en los meses)
ds_varianza_anual_por_nodo <- group_by(ds_anual, nodo)
ds_varianza_anual_por_nodo <- summarize(
  ds_varianza_anual_por_nodo,
  varianza_anual = var(caudal_anual),
  .groups = "drop"
)
head(ds_varianza_anual_por_nodo)

nodos_inutiles <- filter(ds_varianza_anual_por_nodo, varianza_anual < 0.000001)
head(nodos_inutiles)

ds_mensual_util <- filter(ds_mensual, !(nodo %in% nodos_inutiles$nodo))
ds_anual_util <- filter(ds_anual, !(nodo %in% nodos_inutiles$nodo))
head(ds_mensual_util)
head(ds_anual_util)

### Semilla (Está puesto arriba)

####################################
### 1. Inferencia sobre la media ###
####################################

### Tomar muestra aleatoria de 30 nodos. Para cada nodo,
### calcular el cambio porcentual del medio anual entre
### el trienio inicial y el final del periodo.✅

ds_30_nodos <- sample(unique(ds_anual_util$nodo), 30, replace = FALSE)
head(ds_30_nodos)

caudal_inicial <- filter(ds_anual_util, ano %in% c(2008, 2009, 2010))
caudal_inicial <- group_by(caudal_inicial, nodo)
caudal_inicial <- filter(caudal_inicial, nodo %in% ds_30_nodos)
caudal_inicial <- summarize(
  caudal_inicial, caudal_anual = mean(caudal_anual), .groups = "drop"
)
head(caudal_inicial)

caudal_final <- filter(ds_anual_util, ano %in% c(2016, 2017, 2018))
caudal_final <- group_by(caudal_final, nodo)
caudal_final <- filter(caudal_final, nodo %in% ds_30_nodos)
caudal_final <- summarize(
  caudal_final, caudal_anual = mean(caudal_anual), .groups = "drop"
)
head(caudal_final)

# d = 100 * ( C*(2016-2018) - C*(2008-2010) ) / C*(2008-2010)✅
cambio_porcentual <- 100 * (caudal_final$caudal_anual - caudal_inicial$caudal_anual) / caudal_inicial$caudal_anual
cambio_porcentual_por_nodo <- data.frame(
  nodo = caudal_inicial$nodo,
  cambio_porcentual = cambio_porcentual
)
head(cambio_porcentual_por_nodo)

### Plantear H_0 y H_1✅
# H_0: El cambio porcentual medio >= 0
# H_1: El cambio porcentual medio < 0

### Verificar supuestos

## Histograma✅
hist(
  cambio_porcentual_por_nodo$cambio_porcentual,
  xlab = "Cambio Porcentual", ylab = "Frecuencia",
  col = "green"
)
# Se ve una tendencia de que bajan, hay más nodos con cambio porcentual negativo

# *Un gráfico de barra porque se ve una tendencia a la baja✅
cambio_porcentual_por_nodo <- cambio_porcentual_por_nodo[
  order(cambio_porcentual_por_nodo$cambio_porcentual),
]
barplot(
  cambio_porcentual_por_nodo$cambio_porcentual,
  names = cambio_porcentual_por_nodo$nodo,
  xlab = "Nodo", ylab = "Cambio Porcentual",
  col = "blue"
)

## Grafico cuantil cuantil✅
qqnorm(
  cambio_porcentual_por_nodo$cambio_porcentual,
  main = "Q-Q Plot del cambio porcentual",
)
qqline(cambio_porcentual_por_nodo$cambio_porcentual, col = "red")
# Se ve que los datos están cerca a la linea, se asume normalidad

## Evidencia numerica✅?
describe(cambio_porcentual_por_nodo$cambio_porcentual, IQR = TRUE)
# media -6.63% - desviacion 17.07 - Rango intercuartil 18.38 - kurtosis -0.33
# n = 30 justo el limite

### Aplicar el test de hipotesis. Reportar estadistico,
### grados de libertad, p-valor e intervalo de confianza,
### e interpretar la desicion en terminos hidrológicos.

# Una población
# desviación poblacional desconocida
# intervalo de confianza del 95% (alpha = 0.05)
# unilateral (una cola)
# grados de libertad = n - 1 = 29
# ==> test T Student✅
t.test(
  cambio_porcentual_por_nodo$cambio_porcentual,
  alternative = "less",
  mu = 0,
  conf.level = 0.95
)
# p-value = 0.021 => rechazo H_0 (p-value < alpha=0.05)
# => hay evidencia para afirmar que ha bajado el caudal

### PREGUNTA OBLIGATORIA: Se hizo con cambio porcentual,
### hacerlo con diferencia absoluta, comparar e indicar
### cuál hay que usar y por qué✅

cambio_absoluto <- caudal_final$caudal_anual - caudal_inicial$caudal_anual
cambio_absoluto_por_nodo <- data.frame(
  nodo = caudal_inicial$nodo,
  cambio_absoluto = cambio_absoluto
)
head(cambio_absoluto_por_nodo)

hist(
  cambio_absoluto_por_nodo$cambio_absoluto,
  xlab = "Cambio Absoluto", ylab = "Frecuencia",
  col = "green"
)
# También se ve más cargado para los negativos, pero más centrado

cambio_absoluto_por_nodo <- cambio_absoluto_por_nodo[
  order(cambio_absoluto_por_nodo$cambio_absoluto),
]
barplot(
  cambio_absoluto_por_nodo$cambio_absoluto,
  names = cambio_absoluto_por_nodo$nodo,
  xlab = "Nodo", ylab = "Cambio Absoluto",
  col = "blue"
)
# Se ve que hay un nodo con un cambio muy grande,
# porque ese nodo suele tener más caudal

qqnorm(
  cambio_absoluto_por_nodo$cambio_absoluto,
  main = "Q-Q Plot del cambio absoluto",
)
qqline(cambio_absoluto_por_nodo$cambio_absoluto, col = "red")
# Aquí los nodos no siguen una linea recta, no hay normalidad

describe(cambio_absoluto_por_nodo$cambio_absoluto, IQR = TRUE)
# media -3.9 - desviacion 10.98 - Rango intercuartil 3.22 - kurtosis 15.41

t.test(
  cambio_absoluto_por_nodo$cambio_absoluto,
  alternative = "less",
  mu = 0,
  conf.level = 0.95
)
# p-value = 0.03 => También rechaza H_0

# Aunque el p-valor igualmente permite rechazar H_0 (0.03 < 0.05),
# el cambio porcentual es más adecuado porque permite comparar
# entre nodos con caudales muy distintos, manteniendo la misma magnitud relativa

##############################################
### 2. Análisis de correlación y factorial ###
##############################################

# Ordenar los 151 nodos segun su caudal medio del periodo 2008-2018✅
caudal_medio_periodo_completo <- group_by(ds_anual_util, nodo)
caudal_medio_periodo_completo <- summarize(
  caudal_medio_periodo_completo,
  caudal_medio = mean(caudal_anual), .groups = "drop"
)
caudal_medio_periodo_completo <- arrange(
  caudal_medio_periodo_completo, desc(caudal_medio)
)
head(caudal_medio_periodo_completo)

# Tomar los 20 primeros✅
caudal_medio_periodo_completo <- caudal_medio_periodo_completo[1:20, ]
caudal_medio_periodo_completo

# Construir matriz con columnas las 20 centrales y filas los 132 meses✅
caudal_mensual_20_centrales <- filter(
  ds_mensual, nodo %in% caudal_medio_periodo_completo$nodo
)
head(caudal_mensual_20_centrales)
matriz_caudal_20_centrales <- pivot_wider(
  caudal_mensual_20_centrales,
  names_from = nodo, values_from = caudal
)
head(matriz_caudal_20_centrales)

# Estandarizar valores de cada nodo✅
matriz_caudal_20_centrales <- scale(
  select(matriz_caudal_20_centrales, -ano, -mes)
)
head(matriz_caudal_20_centrales)

### a) Matriz de correlación de cada nodo con los otros 19

## Matriz entre las 20 centrales✅
matriz_correlacion <- cor(matriz_caudal_20_centrales)
matriz_correlacion
# Se ve bien feo pero al menos se ve que todo va entre -1 y 1,
# y la diagonal es 1, asique está estandardizado

# ver las mayores y menores correlaciones
correlaciones <- data.frame(
  nodo1 = character(),
  nodo2 = character(),
  correlacion = numeric()
)
# Probablemente haya un metodo mejor en R pero fue lo que se nos ocurrió nomas
for (i in 1:20) {
  for (j in i:20) {
    if (i != j) {
      correlaciones <- rbind(correlaciones, data.frame(
        nodo1 = colnames(matriz_correlacion)[i],
        nodo2 = colnames(matriz_correlacion)[j],
        correlacion = matriz_correlacion[i, j]
      ))
    }
  }
}
# mayores
correlaciones_mayores <- correlaciones[order(-correlaciones$correlacion), ]
head(correlaciones_mayores, 5)
# La laguna del Laja y Ralco están cerca geográficamente
# ambas en zona cordilleral en la región del Biobío
# es el par de mayor correlación
# en general, muchos de los pares más correlacionados son del sur y cordillera

# menores
correlaciones_menores <- correlaciones[order(correlaciones$correlacion), ]
head(correlaciones_menores, 5)
# Las Lajas y San Pedro tienen una correlación de -0.68,
# No hemos podido encontrar alguna explicación que nos haga
# sentido porque están en zonas, aunque no tan alejadas, pero
# sin haber algo claro.

## Evaluar si la matriz es adecuada para análisis factorial (KMO y test de esfericidad de Bartlett)
# KMO
KMO(matriz_caudal_20_centrales)
# MSA = 0.88 > 0.6 => Esta perfecto

# Test Bartlett
cortest.bartlett(matriz_correlacion, n = nrow(matriz_caudal_20_centrales))
# p-value = 0 => no es (Ni de cerca) la matriz identidad => se puede hacer AF

## Disctutir limitación de test de Bartlett
# Un valor 0 es poco probable porque si, algo raro debe haber.
# Nuestra teoría es que el problema tiene asociada una correlación inevitable.
# Como todos los nodos son de un país, las estaciones del año afectan casi igual
# (invierno llueve más, verano las nieves se derriten, etc), entonces
# salen patrones que afectan a todos los nodos y hacen que el
# estadistico esté muy inflado. Aunque KMO sigue sirviendo

### b) Análisis de componentes principales

# Realizar análisis de componentes principales (PCA) sobre la matriz de correlación

PCA <- prcomp(matriz_caudal_20_centrales, scale = TRUE)

## El porcentaje de varianza explicada por cada componente y la acumulada
summary(PCA)

## Scree Plot
screeplot(PCA, type = "line")
# El codo se ve entre 2 y 3

## Loadings de primeros componentes y scores
round(PCA$rotation[, 1:3], 3)

## representación de las 20 centrales en el plano de los dos primeros componentes, con sus nombres
plot(PCA$rotation[, 1], PCA$rotation[, 2], xlab = "Componente 1", ylab = "Componente 2")
text(PCA$rotation[, 1], PCA$rotation[, 2], labels = rownames(PCA$rotation), pos = 4, cex = 0.7)

### c) Análisis factorial

## Realizar analisis factorial mediante componentes principales
# (se va a hacer abajo para seguir el orden del enunciado)

## Determinar cuántos factores conviene retener (usar todos los criterio)
# Determinación a priori:
# Son rios (o similares), creemos que probablemente haya que tomar 2 o 3:
# 1. Norte/Sur
# 2. Cordillera/Costa
# 3. Tamaño: Si es un gran embalse o un pequeño canal

# Regla de Kaiser
autovalores <- PCA$sdev^2
autovalores
# Habría que quedarse con 3 que son los que tienen > 1

# % de varianza explicada
prop_var <- autovalores / sum(autovalores)
cumsum(prop_var)
# Con esto habría que dejar 4 que es ahí donde se llega al 80% (83%)

# Scree plot
screeplot(PCA, type = "lines")
abline(h = 1)
# De nuevo son 2-3 los que hay que dejar,
# básicamente es el mismo gráfico que el de pca

# Análisis paralelo
fa.parallel(matriz_caudal_20_centrales, fm = "pa")
# Parallel analysis suggests that the number of factors = 3

## Retener 2 factores y aplicar varimax,
## reportar matriz de carga rotada y comunalidades de cada nodo
factores <- principal(
  matriz_caudal_20_centrales,
  nfactors = 2,
  rotate = "varimax"
)

factores$loadings
# RC1: 0.94 lago laja, 0.94 ñuble, 0.95 ralco, -0.4 las lajas
# RC2: 0.81 La invernada, 0.85 Sauzal, 0.76 Queltehues, -0.6 Canutillar

factores$communality
# 0.9 Ralco, 0.88 Lago Laja, 0.88 Peuchen, 0.3 Tucapel/Rapel

## Interpretar y asignar nombre a cada uno

### Validación de la interpretación

## Calcular el mes en que alcanza su máximo caudal cada central
