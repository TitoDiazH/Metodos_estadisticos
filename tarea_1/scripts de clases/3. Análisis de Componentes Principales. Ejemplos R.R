# ==============================================================================
# CLASE 3: ANÁLISIS DE COMPONENTES PRINCIPALES (ACP) — Ejemplos en R
# Métodos Estadísticos para la Gestión (ICI3104) — Universidad de los Andes
# Script companion de las láminas de la clase 3.
# ------------------------------------------------------------------------------
# No requiere paquetes externos: prcomp() es parte de R base.
# ==============================================================================


############################################################
# 1. DATOS, PCA Y VARIANZA EXPLICADA
############################################################

# mtcars: 32 automóviles, 11 variables numéricas (incluido en R)
data(mtcars)
head(mtcars)
str(mtcars)

datos <- mtcars

# scale. = TRUE estandariza automáticamente
# (resta la media y divide por la desviación estándar)
pca <- prcomp(datos, scale. = TRUE)

# Resumen de varianza explicada por cada componente
summary(pca)

# Scree plot (gráfico de autovalores / codo)
screeplot(pca, type = "lines")

# Loadings: pesos de cada variable en cada componente
pca$rotation


############################################################
# 2. COORDENADAS Y BIPLOT
############################################################

# Coordenadas de cada observación en los 2 primeros componentes
pca$x[, 1:2]

# Biplot: observaciones (puntos) y variables (flechas) en PC1-PC2
biplot(pca, scale = 0)


############################################################
# 3. RESUMEN DE FUNCIONES CLAVE (referencia)
############################################################

# pca <- prcomp(datos, scale. = TRUE)
# summary(pca)    -> varianza explicada
# screeplot(pca)  -> gráfico de codo
# pca$rotation    -> loadings (pesos)
# pca$x           -> coordenadas transformadas
# biplot(pca)     -> visualización conjunta
