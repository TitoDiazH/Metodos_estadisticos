# ==============================================================================
# CLASE 6.2: CLASIFICACIÓN SUPERVISADA (parte 2) — Ejemplos en R
# Box's M, QDA, Naive Bayes y validación cruzada LOO
# Métodos Estadísticos para la Gestión (ICI3104) — Universidad de los Andes
# ------------------------------------------------------------------------------
# Paquetes necesarios (instalar una sola vez, luego dejar comentado):
#   install.packages(c("biotools", "e1071"))    # MASS viene con R base
# ==============================================================================


############################################################
# 0. DATOS (Banco de Ademuz, mismos de la clase 6.1)
############################################################

datos <- data.frame(
  patrimonio = c(1.3, 3.7, 5, 5.9, 7.1, 4, 7.9, 5.1,
                 5.2, 9.8, 9, 12, 6.3, 8.7, 11.1, 9.9),
  deuda      = c(4.1, 6.9, 3, 6.5, 5.4, 2.7, 7.6, 3.8,
                 1, 4.2, 4.8, 2, 5.2, 1.1, 4.1, 1.6),
  grupo      = factor(c(rep("Fallido", 8), rep("Cumplidor", 8)))
)

library(MASS)


############################################################
# 1. TEST DE BOX'S M (homogeneidad de covarianzas)
############################################################

# install.packages("biotools")
library(biotools)
boxM(datos[, c("patrimonio", "deuda")], datos$grupo)
# p > 0.05  -> covarianzas homogéneas -> usar LDA
# p <= 0.05 -> covarianzas distintas  -> considerar QDA


############################################################
# 2. ANÁLISIS DISCRIMINANTE CUADRÁTICO (QDA)
############################################################

modelo_qda <- qda(grupo ~ patrimonio + deuda, data = datos)
modelo_qda

pred_qda <- predict(modelo_qda, datos)
tabla_qda <- table(Real = datos$grupo, Predicho = pred_qda$class)
tabla_qda
sum(diag(tabla_qda)) / sum(tabla_qda)     # accuracy QDA


############################################################
# 3. CLASIFICADOR NAIVE BAYES
############################################################

# install.packages("e1071")
library(e1071)
modelo_nb <- naiveBayes(grupo ~ patrimonio + deuda, data = datos)
modelo_nb

pred_nb <- predict(modelo_nb, datos)
tabla_nb <- table(Real = datos$grupo, Predicho = pred_nb)
tabla_nb
sum(diag(tabla_nb)) / sum(tabla_nb)       # accuracy NB

# Probabilidades a priori y parámetros estimados
modelo_nb$apriori
modelo_nb$tables

# Probabilidades posteriores
predict(modelo_nb, datos, type = "raw")


############################################################
# 4. VALIDACIÓN CRUZADA LEAVE-ONE-OUT (LDA)
############################################################

modelo_loo <- lda(grupo ~ patrimonio + deuda, data = datos, CV = TRUE)
tabla_loo <- table(Real = datos$grupo, Predicho = modelo_loo$class)
tabla_loo
sum(diag(tabla_loo)) / sum(tabla_loo)     # accuracy LOO-CV
