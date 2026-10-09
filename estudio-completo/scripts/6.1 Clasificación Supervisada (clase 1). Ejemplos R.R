# ==============================================================================
# CLASE 6.1: CLASIFICACIÓN SUPERVISADA (parte 1) — Ejemplos en R
# Análisis discriminante lineal (LDA)
# Métodos Estadísticos para la Gestión (ICI3104) — Universidad de los Andes
# ------------------------------------------------------------------------------
# Paquetes necesarios: MASS (viene con la instalación base de R).
# ==============================================================================


############################################################
# 1. DATOS DEL BANCO DE ADEMUZ (16 clientes, 2 variables)
############################################################

# X1 = patrimonio, X2 = deuda, Y = grupo (Fallido / Cumplidor)
datos <- data.frame(
  patrimonio = c(1.3, 3.7, 5, 5.9, 7.1, 4, 7.9, 5.1,
                 5.2, 9.8, 9, 12, 6.3, 8.7, 11.1, 9.9),
  deuda      = c(4.1, 6.9, 3, 6.5, 5.4, 2.7, 7.6, 3.8,
                 1, 4.2, 4.8, 2, 5.2, 1.1, 4.1, 1.6),
  grupo      = factor(c(rep("Fallido", 8), rep("Cumplidor", 8)))
)


############################################################
# 2. AJUSTE DEL MODELO LDA
############################################################

library(MASS)
modelo_lda <- lda(grupo ~ patrimonio + deuda, data = datos)
modelo_lda


############################################################
# 3. PREDICCIÓN, MATRIZ DE CONFUSIÓN Y ACCURACY
############################################################

pred_lda <- predict(modelo_lda, datos)
tabla <- table(Real = datos$grupo, Predicho = pred_lda$class)
tabla

# Accuracy (proporción de aciertos)
sum(diag(tabla)) / sum(tabla)
