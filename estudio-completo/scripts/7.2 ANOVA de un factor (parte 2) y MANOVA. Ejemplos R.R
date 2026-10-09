# ==============================================================================
# CLASE 7.2: ANOVA DE UN FACTOR (parte 2) Y MANOVA — Ejemplos en R
# Métodos Estadísticos para la Gestión (ICI3104) — Universidad de los Andes
# ------------------------------------------------------------------------------
# Paquetes necesarios (instalar una sola vez, luego dejar comentado):
#   install.packages("biotools")    # para el test M de Box (MANOVA)
# ==============================================================================


############################################################
# 1. ANOVA DE UN FACTOR (diseño completamente al azar)
############################################################

# Cuatro métodos, tiempos de ensamble
A <- c(6, 8, 7, 8)
B <- c(7, 9, 10, 8)
C <- c(11, 16, 11, 13)
D <- c(10, 12, 11, 9)

tiempo <- c(A, B, C, D)
metodo <- factor(c(rep("A", 4), rep("B", 4), rep("C", 4), rep("D", 4)))
datos  <- data.frame(metodo, tiempo)
datos

# Modelo ANOVA de un factor
modelo <- aov(tiempo ~ metodo, data = datos)
summary(modelo)


############################################################
# 2. MANOVA (ejemplo con iris)
############################################################

# iris: 3 especies, 4 medidas florales (incluido en R)
fit <- manova(
  cbind(Sepal.Length, Sepal.Width, Petal.Length, Petal.Width) ~ Species,
  data = iris)

# Contraste multivariado (Lambda de Wilks)
summary(fit, test = "Wilks")

# Homogeneidad de covarianzas (M de Box)
library(biotools)
boxM(iris[, 1:4], iris$Species)

# Post hoc: un ANOVA por variable respuesta
summary.aov(fit)
