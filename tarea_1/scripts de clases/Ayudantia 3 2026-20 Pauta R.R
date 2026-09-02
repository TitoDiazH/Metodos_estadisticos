# Problema 2

notas <- data.frame(
  Matematicas = c(8,12,15,10,16,11,13,15,17,14,12,13,15,11,10,8,14,12,13,9,9,11,14,16,12,13,10,15,17,9),
  Fisica      = c(13,17,14,9,10,10,12,8,16,13,11,9,14,10,9,15,13,11,12,14,8,10,13,15,18,12,9,14,13,11),
  Quimica     = c(12,10,13,9,14,10,11,8,15,12,10,11,13,9,9,14,12,10,11,13,8,10,12,14,10,11,9,13,12,10),
  Historia    = c(15,14,13,12,16,13,14,11,15,14,13,14,15,12,12,16,15,13,14,15,11,12,15,16,13,14,12,15,14,13),
  Lenguaje    = c(16,16,17,13,17,14,15,12,16,18,14,15,16,13,13,17,16,14,15,16,18,13,16,17,14,15,13,16,15,14),
  Ingles      = c(15,14,13,12,16,13,16,11,15,14,9,14,15,12,7,16,15,13,14,15,11,12,15,16,13,14,12,15,14,13)
)
notas

############################################################
# 1. RESUMEN DE PCA EN R
############################################################

# prcomp() es la función principal de PCA en R
# scale. = TRUE estandariza automáticamente
# (resta la media y divide por la desviación estándar)
# Esto es fundamental cuando las variables tienen distintas unidades
pca <- prcomp(notas, scale. = TRUE)


############################################################
# 2. RESUMEN DE VARIANZA EXPLICADA
############################################################

# Muestra: desviación estándar, proporción de varianza
# y proporción acumulada de cada componente
summary(pca)

# Los autovalores son el cuadrado de las desviaciones estándar
autovalores <- pca$sdev^2
autovalores

# Proporción de varianza explicada por cada componente
prop_var <- autovalores / sum(autovalores)
round(prop_var, 4)

# Proporción acumulada
cumsum(prop_var)


############################################################
# 3. SCREE PLOT (GRÁFICO DE CODO)
############################################################

# Graficar los autovalores para decidir cuántos
# componentes conservar
screeplot(pca, type = "lines",
          main = "Scree Plot - notas")

# El screeplot se utiliza para decidir cuántos componentes principales conviene
# conservar. En el eje horizontal aparecen los Componentes Principales,
# y en el eje vertical aparece la varianza (valores propios) asociada a cada
# componente principal.

# Existen varios criterios para interpretar este gráfico. El primero es deter-
# minar qué componentes poseen la mayor varianza. En este caso, PC1 tiene una
# varianza igual a 3.87, y asimismo, PC2 tiene una varianza menor, pero es la
# segunda más grande con 0.84. Posteriormente, PC3 tiene una varianza menor, por
# lo que deja de ser un componente significativo.

# Otro criterio, es el criterio del codo. Se busca el punto del grafico en el que
# cambia bruscamente la pendiente. En este grafico, el codo aparece entre PC1 y PC2.


# Versión alternativa con barras
screeplot(pca, type = "barplot",
          main = "Varianza por componente")

# Línea de referencia Kaiser (autovalor = 1)
abline(h = 1, col = "red", lty = 2)



############################################################
# 4. LOADINGS (PESOS DE CADA VARIABLE)
############################################################

# Los loadings indican cuánto contribuye cada variable
# original a cada componente principal
pca$rotation

# Regla de interpretación:
# |loading| >= 0.30 → variable relevante
# |loading| >= 0.40 → variable fuerte
# El signo indica dirección (positiva o negativa)

# Ver solo los primeros 2 componentes
round(pca$rotation[, 1:2], 3)


############################################################
# 5. INTERPRETACIÓN DE PC1
############################################################

# Loadings de PC1
round(pca$rotation[, 1], 3)


############################################################
# 6. INTERPRETACIÓN DE PC2
############################################################

# Loadings de PC2
round(pca$rotation[, 2], 3)

############################################################
# 9. COORDENADAS EN EL NUEVO ESPACIO
############################################################

# pca$x contiene las coordenadas de cada observación
# en el espacio de componentes principales
head(pca$x)

# Coordenadas en los primeros 2 componentes
pca$x[, 1:2]
# En terminos muy simples, se puede interpretar la "nota general" de un alumno
# en cierta categoria. Como en un CV al colocar Excel Avanzado, Python Moderado,
# Ingles nativo, etc.

##########################################################

# Problema 3

# Antes de partir, se debe verificar si es apropiado hacer análisis factorial.
# En primer lugar, se revisa con test de Bartlett

library(psych)
cortest.bartlett(cor(notas), n = 30) # si se rechaza Ho, entonces hay correlacion
KMO(notas)
# se espera que Overall MSA sea mayor a 0.6 para que sea aceptable para hacer FA.
# En este caso, se obtiene un Overall MSA = 0.82, por lo que es muy adecuado.

############################################################
# 7. ANÁLISIS FACTORIAL
############################################################

fa_model <- fa(notas,
               nfactors = 2, # Cantidad de factores
               rotate = "varimax", # Estandariza los datos para facilitar la comprension
               fm = "ml") # Metodo de estimacion "Maximum Likelihood" para asumir supuesto de normalidad
fa_model

# Los resultados de este modelo indican que se analizaron las notas de varios
# cursos. Se extrajeron 2 factores, y se usó la rotación Varimax (ortogonal).
# La matriz de cargas factoriales (pattern matrix) muestra las correlaciones entre
# cada variable y el factor.

# Valores:
# ≈ 0.30 → débiles
# ≥ 0.50 → moderadas
# ≥ 0.70 → fuertes

# En este caso, se observa que el factor 1 ML1 tiene una carga fuerte en todos
# los cursos excepto Matematicas. Mientras que el factor 2 ML2 destaca solo en
# Química y Matemáticas, por lo que podría decirse que es una asignatura transversal.

# El h2 indica la proporción de la varianza explicada por los factores. Por ej:
# Historia: 0.95 quiere qdecir que el 95% de su variación está explicada.
# Química: 1.00, practicamente toda su varianza está explicada.
# Matemáticas: 0.26, tiene muy baja explicación (mal representada)

# Unicidad (u2): Varianza especifica + error (u2=1-h2)
# Matemáticas: u2 = 0.737 (mucha información no explicada)
# Química: u2 = 0.005 (casi todo explicado por los factores)

# Complejidad (com): Indica cuántos factores influyen en una variable. Valor ideal cercano a 1.
# Química = 2.0, depende de ambos factores.
# Inglés = 1.2, depende principalmente de un factor solamente.

# Varianza Explicada:
#                        ML1  ML2
# SS loadings           2.57 1.24
# Proportion Var        0.43 0.21
# Factor 1 explica el 43%, Factor 2 el 21%, por lo que se explica solo el 64%.

# Proportion Explained (solo varianza común):
# ML1: 67% de la varianza común.
# ML2: 33%.
# El factor 1 claramente es el dominante.

# Mean Complexity: cuántos factores necesita una variable para explicarse.
# ML Complexity = 1.5, las variables están en promedio influenciadas por más de
# 1 factor, pero no de forma excesiva.
# Complejidad	Interpretación
# ≈ 1	Estructura simple (ideal)
# 1 – 2	Moderada (aceptable)
# > 2	Compleja (difícil de interpretar)

# Son suficientes 2 factores? Revisar la linea anterior a Tucker Lewis Index:
# The total n.obs was  30  with Likelihood Chi Square =  1.21  with prob <  0.88 
# Esto quiere decir que el Chi2obt fue de 1.21, con un pvalue de 0.88,
# entonces no es posible rechazar la hipótesis de que 2 factores son suficientes.

# Ajuste global del modelo:
# RMSR = 0.02 (Ideal < 0.05)
# RMSEA = 0.00 (IC 90% 0-0.139)
# TLI = 1.114 (puede ser >1 en muestras pequeñas)
# Esto quiere decir que hay un ajuste excelente.

# Finalmente, la ultima tabla se refiere a las correlaciones y el R2
# Se puede concluir que los puntajes factoriales son fiables y pueden usarse en
# análisis posteriores como regresión, clustering, etc.


# Pregunta 4 (cargar el archivo Restaurant.csv)
restaurant1 <- Restaurant[-1, ] # Esto elimina la fila de headers
head(restaurant1)
restaurant1[] <- lapply(restaurant1, as.numeric) # convertir a numerico
colnames(restaurant1) <- c(
  "empleados_amigables",     # x12
  "lugar_entretenido",       # x13
  "porciones_grandes",       # x14
  "comida_fresca",           # x15
  "precios_razonables",      # x16
  "interior_atractivo",      # x17
  "sabor_excelente",         # x18
  "empleados_conocimiento",  # x19
  "temperatura_apropiada",   # x20
  "servicio_rapido"          # x21
)

# KMO
KMO(restaurant1)

library(psych)
# Test de Bartlett
cortest.bartlett(cor(restaurant1), n=10)

fa_model <- fa(restaurant1,
               nfactors = 4,
               rotate = "varimax",
               fm = "ml")
fa_model

# El modelo de 4 factores explicó en conjunto el 76% de la varianza total, lo
# cual representa un nivel alto de explicación para estudios de percepción y
# satisfacción. La contribución individual de cada factor fue relativamente
# equilibrada: Factor 1 = 21%, Factor 2 = 20%, Factor 3 = 19%, Factor 4 = 15%

# Interpretación por factor:

# Factor 1: Calidad del servicio
# Empleados amigables (0.98), Servicio Rápido (0.82), Empleados con conocimiento (0.58)

# Factor 2: Calidad de la comida
# Excelente sabor de la comida (0.96), Comida Fresca (0.76), T° apropiada (0.64)

# Factor 3: Valor económico percibido
# Porciones grandes (0.98), Precios Razonables (0.94)

# Factor 4: Ambiente del restaurant
# Interior atractivo (0.99), lugar entretenido para comer (0.65)


# Calidad del modelo y puntajes factoriales:
# Mean Item complexitiy = 1.2, por lo que en general basta con 1 factor para
# explicar cada item en promedio.

# Problema 5

antes <- c(52, 47, 50, 46, 49,53,48,51)
despues <-c(49,46,48,44,47,50,46,48)
list(antes, despues)

# Ho: antes - despues <= 2
# Ha: antes - despues > 2

# Forma 1:

t.test(antes-2, despues, alternative="greater", paired = T)
# Conclusion: no es posible rechazar H0, por lo que no existe evidencia
# estadistica para afirmar que el entrenamiento mejora el tiempo en al menos
# 2 segundos.

# Forma 2:

dbarra <- mean(antes-despues)
s <- sd(antes-despues)
tobt <- (dbarra-2)/(s/sqrt(8))
1-pt(tobt, 7)





