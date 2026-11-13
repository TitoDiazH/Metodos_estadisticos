# == POSIBLE MEJORA (pendiente) =====================================
# Los gráficos de residuos del ANOVA muestran embudo (la varianza crece con
# la distancia y es mayor con 30° que con 45°) y colas pesadas en el Q-Q
# (Shapiro p = 0,0016). La clase 8.1 (slide 29) sugiere transformar y con log.
# Probado: aov(log(distancia) ~ angulo * plataforma * altura) da
# Shapiro p = 0,39 y Levene p = 0,85; las conclusiones se mantienen, salvo
# que angulo:altura deja de ser significativa (p = 0,15).
# Idea: agregarlo como verificación en la sección 4 (supuestos).

# == Librerías ======================================================
# Paquetes necesarios (instalar una sola vez, luego dejar comentado):
# install.packages(c("psych", "dplyr", "cluster", "MASS", "e1071", "MVN", "biotools", "agricolae", "car"))
library(agricolae)
library(car)


############################################################
# 1. DISEÑO Y DATOS
############################################################

angulo     <- factor(rep(c(30, 45), each = 18))
plataforma <- factor(rep(c(0, 5), each = 9, times = 2))
altura     <- factor(rep(c(20, 25, 30), each = 3, times = 4))

# Orden aleatorio de las corridas
set.seed(24)
orden <- sample(1:36)
plan <- data.frame(orden, angulo, plataforma, altura)
plan[order(plan$orden), ]   # <- Ejecutarlas en este orden

distancia <- c(
  # 30°, 0 cm
  12, 12, 13,   # 20 cm
  15, 12, 20,   # 25 cm
  16, 26, 27,   # 30 cm (el 16 es el atípico, corrida 22)

  # 30°, 5 cm
  17, 15, 15,   # 20 cm
  21, 19, 21,   # 25 cm
  22, 28, 23,   # 30 cm

  # 45°, 0 cm
  5, 7, 5,      # 20 cm
  8, 6, 6,      # 25 cm
  6, 7, 8,      # 30 cm

  # 45°, 5 cm
  13, 12, 12,   # 20 cm
  14, 14, 13,   # 25 cm
  18, 17, 16    # 30 cm
)
# Sobre el 16 outlier, pudimos haber repetido el lanzamiento,
# pero solo repetíamos cuando estaba mal hecho (si chocaba con alguna esquina,
# o otros problemas así) pero como salió bien, aunque no sepamos
# por qué salió tan bajo, lo dejamos como está.

datos <- data.frame(angulo, plataforma, altura, orden, distancia)
datos


############################################################
# 2. GRÁFICOS DE EFECTOS E INTERACCIONES
############################################################

# Distancia por tratamiento
boxplot(distancia ~ angulo * plataforma * altura, data = datos, las = 2)

plot.design(datos[, c(1, 2, 3, 5)])

par(mfrow = c(1, 3))
interaction.plot(datos$altura, datos$angulo, datos$distancia)       # C x A
interaction.plot(datos$altura, datos$plataforma, datos$distancia)   # C x B
interaction.plot(datos$angulo, datos$plataforma, datos$distancia)   # A x B
par(mfrow = c(1, 1))


############################################################
# 3. ANOVA FACTORIAL 2 x 2 x 3
############################################################

modelo <- aov(distancia ~ angulo * plataforma * altura, data = datos)
summary(modelo)

# Medias de cada nivel y de cada combinación
model.tables(modelo, type = "means")


############################################################
# 4. SUPUESTOS DEL ANOVA
############################################################

# Normalidad
shapiro.test(residuals(modelo))
# 0.0016 -> se rechaz, resultado malo, no es normal

# Homocedasticidad
leveneTest(distancia ~ angulo * plataforma * altura, data = datos)
# 0.6193 -> no se rechaza, resultado bueno, varianzas homogéneas

# Gráficos AOV
par(mfrow = c(2, 2))
plot(modelo)
par(mfrow = c(1, 1))
# residuos vs predichos -> se ve embudo, mal resultado, no es normal
# QQ plot -> el centro si sigue una diagonal pero los extremos se...
# ...mueven, mal resultado, no es normal
# scale-location -> la linea roja baja y sube, mal resultado, la...
# ...varianza no es constante
# constant leverage -> los puntos al inicio están mas dispersos, mal...
# ...resultado

# Independencia
plot(datos$orden, residuals(modelo))
abline(h = 0, lty = 2)
# Los puntos se mueven al azar, no hay tendencia, resultado bueno...
# ...son independientes


############################################################
# 5. COMPARACIONES MÚLTIPLES
############################################################

# Interacciones significativas: se comparan las combinaciones
lsd <- LSD.test(modelo, c("angulo", "plataforma"))
lsd$groups
lsd <- LSD.test(modelo, c("angulo", "altura"))
lsd$groups

# Tukey para la altura de lanzamiento
TukeyHSD(modelo, "altura")


############################################################
# 6. SUPERFICIE DE RESPUESTA
############################################################

# Variables codificadas: -1 = nivel bajo, 0 = medio, 1 = alto
# ángulo: 30° = -1, 45° = 1
datos$x1 <- rep(c(-1, 1), each = 18)
# plataforma: 0 cm = -1, 5 cm = 1
datos$x2 <- rep(c(-1, 1), each = 9, times = 2)
# altura: 20 = -1, 25 = 0, 30 = 1
datos$x3 <- rep(c(-1, 0, 1), each = 3, times = 4)

# Interacciones dobles
datos$x1x2 <- datos$x1 * datos$x2
datos$x1x3 <- datos$x1 * datos$x3
datos$x2x3 <- datos$x2 * datos$x3

# x1 y x2 tienen 2 niveles: solo términos lineales.
# x3 tiene 3 niveles: se agrega el término cuadrático I(x3^2).
sr <- lm(distancia ~ x1 + x2 + x3 + x1x2 + x1x3 + x2x3 + I(x3^2), data = datos)
summary(sr)

# Supuestos del modelo
par(mfrow = c(2, 2))
plot(sr)
par(mfrow = c(1, 1))
shapiro.test(residuals(sr))

# Selección de variables por AIC
step(sr, direction = "both")
# step elimina x2x3 y I(x3^2) (no significativos) -> modelo reducido
sr2 <- lm(distancia ~ x1 + x2 + x3 + x1x2 + x1x3, data = datos)
summary(sr2)

# ¿Se puede eliminar x2x3 e I(x3^2) a la vez? H0: sus coeficientes son 0
anova(sr2, sr)
# p > 0.05: no empeora el ajuste, se adopta el modelo reducido


############################################################
# 7. OPTIMIZACIÓN
############################################################

# Distancia predicha en las 12 combinaciones de la región experimental
datos$prediccion <- predict(sr2, datos)
datos[seq(1, 36, by = 3), c("angulo", "plataforma", "altura", "prediccion")]

# Pendiente respecto de la altura (x3) en el óptimo, con el modelo completo
# (el que tiene curvatura): b3 + b13*x1 + b23*x2 + 2*b33*x3
b <- coef(sr)
b["x3"] + b["x1x3"] * (-1) + b["x2x3"] * 1 + 2 * b["I(x3^2)"] * 1
# Pendiente positiva en x3 = 1: la distancia sigue subiendo al llegar a 30 cm,
# por lo que el máximo dentro de la región está en el borde.

# Superficie ajustada: distancia predicha vs altura, para cada ángulo
par(mfrow = c(1, 2))
d30 <- datos[datos$angulo == 30, ]
interaction.plot(d30$altura, d30$plataforma, d30$prediccion, main = "Ángulo 30°")
d45 <- datos[datos$angulo == 45, ]
interaction.plot(d45$altura, d45$plataforma, d45$prediccion, main = "Ángulo 45°")
par(mfrow = c(1, 1))

# Combinación óptima: 30°, plataforma a 5 cm, lanzamiento desde 30 cm
optimo <- data.frame(x1 = -1, x2 = 1, x3 = 1, x1x2 = -1, x1x3 = -1, x2x3 = 1)
predict(sr, optimo)    # modelo completo
predict(sr2, optimo)   # modelo reducido (adoptado)

# Intervalos al 95 %: de la media (confidence) y de una corrida nueva (prediction)
predict(sr2, optimo, interval = "confidence")
predict(sr2, optimo, interval = "prediction")


############################################################
# 8. CORRIDAS DE CONFIRMACIÓN
############################################################

# Distancias medidas en 3 lanzamientos nuevos en el óptimo (30°, 5 cm, 30 cm)
confirmacion <- c(27, 25, 27)
mean(confirmacion)
sd(confirmacion)

# Comparación con lo observado en el experimento para ese tratamiento
datos$distancia[datos$angulo == 30 & datos$plataforma == 5 & datos$altura == 30]

# H0: la media real en el óptimo es igual al valor predicho por el modelo
t.test(confirmacion, mu = predict(sr2, optimo))
# p-valor > 0.05: no se rechaza H0, las corridas confirman la predicción...
# ...del modelo y la combinación óptima.
# Además las 3 corridas (27, 25, 27) caen dentro del intervalo de predicción.
