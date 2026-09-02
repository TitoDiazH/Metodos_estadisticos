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
PATH_TO_DATASET <- "C:/Users/famil/Downloads/AfluentesHistoricosChile-1.xlsx"   # Cambiar por donde esté en su pc
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

### Reestructuración

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

### Ordenar columnas temporalmente (Lo hicimos antes que era más fácil)

### Caudal anual medio
ds_anual <- group_by(ds_mensual, nodo, ano)
ds_anual <- summarize(ds_anual, caudal_anual=mean(caudal), .groups="drop")
head(ds_anual)

### Encontrar fallas (rios sin cambios de caudal en los meses)
ds_varianza_anual_por_nodo <- group_by(ds_anual, nodo)
ds_varianza_anual_por_nodo <- summarize(ds_varianza_anual_por_nodo, varianza_anual=var(caudal_anual), .groups="drop")
head(ds_varianza_anual_por_nodo)

nodos_inutiles <- filter(ds_varianza_anual_por_nodo, varianza_anual<0.000001)
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
### el trienio inicial y el final del periodo.

ds_30_nodos <- sample(unique(ds_anual_util$nodo), 30, replace=FALSE)
head(ds_30_nodos)

caudal_inicial <- filter(ds_anual_util, ano %in% c(2008, 2009, 2010))
caudal_inicial <- group_by(caudal_inicial, nodo)
caudal_inicial <- filter(caudal_inicial, nodo %in% ds_30_nodos)
caudal_inicial <- summarize(caudal_inicial, caudal_anual=mean(caudal_anual), .groups="drop")
head(caudal_inicial)

caudal_final <- filter(ds_anual_util, ano %in% c(2016, 2017, 2018))
caudal_final <- group_by(caudal_final, nodo)
caudal_final <- filter(caudal_final, nodo %in% ds_30_nodos)
caudal_final <- summarize(caudal_final, caudal_anual=mean(caudal_anual), .groups="drop")
head(caudal_final)

# d = 100 * ( C*(2016-2018) - C*(2008-2010) ) / C*(2008-2010)
cambio_porcentual <- 100 * (caudal_final$caudal_anual - caudal_inicial$caudal_anual) / caudal_inicial$caudal_anual
cambio_porcentual_por_nodo <- data.frame(nodo=caudal_inicial$nodo, cambio_porcentual=cambio_porcentual)
head(cambio_porcentual_por_nodo)

### Plantear H_0 y H_1
# H_0: El cambio porcentual medio es distinto a 0
# H_1: El cambio porcentual medio es igual a 0
# Como es de igualdad, es de dos colas

### Verificar supuestos

# Histograma
hist(cambio_porcentual_por_nodo$cambio_porcentual, main="Histograma del Cambio Porcentual", xlab="Cambio Porcentual", ylab="Frecuencia", col="lightblue", border="black")

# Grafico cuantil cuantil
qqnorm(cambio_porcentual_por_nodo$cambio_porcentual, main="Q-Q Plot del Cambio Porcentual")
qqline(cambio_porcentual_por_nodo$cambio_porcentual, col="red", lty=2)

# Evidencia numerica (MVN)
psych::mardia(cambio_porcentual_por_nodo$cambio_porcentual)

### Aplicar el test de hipotesis. Reportar estadistico,
### grados de libertad, p-valor e intervalo de confianza,
### e interpretar la desicion en terminos hidrológicos.


### PREGUNTA OBLIGATORIA: Se hizo con cambio porcentual,
### hacerlo con diferencia absoluta, comparar e indicar
### cuál hay que usar y por qué

##############################################
### 2. Análisis de correlación y factorial ###
##############################################

### a) Matriz de correlación

# Matriz entre las 20 centrales

### b) Análisis de componentes principales

### c) Análisis factorial

