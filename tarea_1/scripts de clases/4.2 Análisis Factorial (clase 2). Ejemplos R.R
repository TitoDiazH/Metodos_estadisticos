# ==============================================================================
# CLASE 4.2: ANÁLISIS FACTORIAL (parte 2) — Ejemplos en R
# Flujo completo con USArrests: adecuación, nº de factores, extracción y rotación
# Métodos Estadísticos para la Gestión (ICI3104) — Universidad de los Andes
# ------------------------------------------------------------------------------
# Paquetes necesarios (instalar una sola vez, luego dejar comentado):
#   install.packages("psych")
# ==============================================================================

# install.packages("psych")
library(psych)


############################################################
# 1. DATOS Y ESTANDARIZACIÓN
############################################################

# USArrests: 50 estados de EEUU (1973), 4 variables (incluido en R)
data("USArrests")
head(USArrests)

# El AF se hace con variables estandarizadas (media 0, varianza 1)
datos <- scale(USArrests)
head(datos)


############################################################
# 2. ADECUACIÓN: KMO Y TEST DE BARTLETT
############################################################

# KMO: correlaciones adecuadas para AF (>= 0.5)
KMO(datos)

# Bartlett: contrasta H0: R = I (queremos rechazar, p < 0.05)
cortest.bartlett(datos)


############################################################
# 3. NÚMERO DE FACTORES (ANÁLISIS PARALELO)
############################################################

# Compara los eigenvalores reales con los de datos aleatorios
fa.parallel(datos, fa = "fa")


############################################################
# 4. EXTRACCIÓN CON ROTACIÓN VARIMAX (ortogonal)
############################################################

fa_modelo <- fa(datos, nfactors = 2, rotate = "varimax")
fa_modelo


############################################################
# 5. COMUNALIDADES Y ROTACIÓN PROMAX (oblicua)
############################################################

# Comunalidad: varianza de cada variable explicada por los factores
fa_modelo$communality

# Rotación oblicua: permite que los factores estén correlacionados
fa_promax <- fa(datos, nfactors = 2, rotate = "promax")
fa_promax
