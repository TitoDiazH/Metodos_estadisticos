# ==============================================================================
# CLASE 4.1: ANÁLISIS FACTORIAL (parte 1) — Ejemplos en R
# Adecuación de los datos: test KMO (Kaiser-Meyer-Olkin)
# Métodos Estadísticos para la Gestión (ICI3104) — Universidad de los Andes
# ------------------------------------------------------------------------------
# Paquetes necesarios (instalar una sola vez, luego dejar comentado):
#   install.packages(c("readxl", "psych"))
# ==============================================================================


############################################################
# 1. LECTURA DE DATOS Y TEST KMO
############################################################

# NOTA: deja el archivo notas.xlsx en tu directorio de trabajo
#       (en RStudio: Session > Set Working Directory > To Source File Location).

# install.packages(c("readxl", "psych"))
library(readxl)
library(psych)

# notas.xlsx: 30 estudiantes, 6 asignaturas
datos <- read_excel("notas.xlsx")
head(datos)

# Test KMO: evalúa si las correlaciones son adecuadas para el AF
# Interpretación del KMO global:
#   >= 0.75 bien   |   >= 0.50 aceptable   |   < 0.50 inaceptable
KMO(datos)
