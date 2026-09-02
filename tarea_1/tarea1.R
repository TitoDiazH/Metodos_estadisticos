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
str(ds_afluentes)
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
# media -2 - desviacion 5.36 - Rango intercuartil 1.41 - kurtosis 0.98

t.test(
  cambio_absoluto_por_nodo$cambio_absoluto,
  alternative = "less",
  mu = 0,
  conf.level = 0.95
)
# p-value = 0.025 => También rechaza H_0

# Aunque el p-valor igualmente permite rechazar H_0,
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
# Se ve bien feo pero al menos se ve que todo va entre -1 y 1 asique está estandardizado

# ver las mayores y menores correlaciones
correlaciones <- data.frame(
  nodo1 = character(),
  nodo2 = character(),
  correlacion = numeric()
)
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
# Angostura y Las Lajas tienen una correlación de -0.68,
# No hemos podido encontrar alguna explicación que nos haga
# sentido porque están en zonas, aunque no tan alejadas, pero
# sin haber algo claro.

## Evaluar si la matriz es adecuada para análisis factorial (KMO y test de esfericidad de Bartlett)
# KMO
KMO(matriz_caudal_20_centrales)
# MSA = 0.88

# Test Bartlett
bartlett.test(matriz_caudal_20_centrales)

## Disctutir limitación de test de Bartlett

### b) Análisis de componentes principales

## El porcentaje de varianza explicada por cada componente y la acumulada


## Scree Plot

## Loadings de primeros componentes y scores

## representación de las centrales en el plano de los dos primeros componentes

### c) Análisis factorial

# Realizar analisis factorial mediante componentes principales

# Determinar cuántos factores conviene retener (usar todos los criterio)

# Interpretar y asignar nombre a cada uno

### Validación de la interpretación

# Calcular el mes en que alcanza su máximo caudal cada central
