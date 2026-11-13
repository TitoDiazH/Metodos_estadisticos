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

# Figura 3: distancia por tratamiento (etiqueta = altura.plataforma.ángulo)
boxplot(distancia ~ altura * plataforma * angulo, data = datos, las = 2,
        col = rep(c("lightblue", "orange"), each = 6),
        xlab = "", ylab = "Distancia (cm)")

# Figura 4: efectos principales (media de la distancia en cada nivel)
par(mfrow = c(1, 3))
plot.design(distancia ~ angulo, data = datos, xlab = "", ylab = "Distancia media (cm)")
plot.design(distancia ~ plataforma, data = datos, xlab = "", ylab = "Distancia media (cm)")
plot.design(distancia ~ altura, data = datos, xlab = "", ylab = "Distancia media (cm)")
par(mfrow = c(1, 1))

# Figura 5: interacciones dobles
par(mfrow = c(1, 3))
interaction.plot(
  datos$altura, datos$angulo, datos$distancia,   # C x A
  xlab = "Altura lanzamiento (cm)", ylab = "Distancia media (cm)",
  trace.label = "Ángulo", col = c("blue", "red")
)
interaction.plot(
  datos$altura, datos$plataforma, datos$distancia,   # C x B
  xlab = "Altura lanzamiento (cm)", ylab = "Distancia media (cm)",
  trace.label = "Plataf.", col = c("blue", "red")
)
interaction.plot(
  datos$plataforma, datos$angulo, datos$distancia,   # B x A
  xlab = "Altura plataforma (cm)", ylab = "Distancia media (cm)",
  trace.label = "Ángulo", col = c("blue", "red")
)
par(mfrow = c(1, 1))


############################################################
# 3. ANOVA FACTORIAL 2 x 2 x 3
############################################################

modelo <- aov(distancia ~ angulo * plataforma * altura, data = datos)
summary(modelo)

# Medias de cada nivel y de cada combinación
# (efecto principal = diferencia entre las medias de los niveles)
model.tables(modelo, type = "means")


############################################################
# 4. SUPUESTOS DEL ANOVA
############################################################

# Normalidad
shapiro.test(residuals(modelo))
# p = 0.0016 -> se rechaza, los residuos no son normales

# Homocedasticidad
leveneTest(distancia ~ angulo * plataforma * altura, data = datos)
# p = 0.6193 -> no se rechaza, varianzas homogéneas

par(mfrow = c(1, 3))
plot(modelo, which = 1)
plot(modelo, which = 2)
plot(datos$orden, residuals(modelo), pch = 19,
     xlab = "Orden de ejecución", ylab = "Residuos", main = "Residuos vs orden")
abline(h = 0, lty = 2)
par(mfrow = c(1, 1))
# residuos vs ajustados -> mayor dispersión con 30° y plataforma a 0 cm
# Q-Q -> el centro sigue la diagonal, pero las colas se separan
# residuos vs orden -> sin tendencias ni rachas, se cumple la independencia

# Observación atípica
max(cooks.distance(modelo))
cooks.distance(modelo)[datos$orden == 22]
# D = 0.51 < 1 -> no es un punto influyente, se mantiene

# Como hay embudo y falta de normalidad, se transforma y con log
modelo_log <- aov(log(distancia) ~ angulo * plataforma * altura, data = datos)
summary(modelo_log)
shapiro.test(residuals(modelo_log))
leveneTest(log(distancia) ~ angulo * plataforma * altura, data = datos)
# Con log se cumplen normalidad (p = 0.385) y homocedasticidad (p = 0.851).
# Siguen significativos A, B, C y A x B; A x C deja de serlo (p = 0.150).


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
# R^2 ajustado: 0.855 (completo) -> 0.862 (reducido), se usaría el reducido


############################################################
# 7. OPTIMIZACIÓN
############################################################

# Distancia predicha en las 12 combinaciones de la región experimental
datos$prediccion <- predict(sr2, datos)
datos[seq(1, 36, by = 3), c("angulo", "plataforma", "altura", "prediccion")]

# Pendiente respecto de la altura (x3) en el óptimo, con el modelo completo
# (el que tiene curvatura): b_3 + b_13*x1 + b_23*x2 + 2*b_33*x3
b <- coef(sr)
b["x3"] + b["x1x3"] * (-1) + b["x2x3"] * 1 + 2 * b["I(x3^2)"] * 1
# Pendiente positiva en x3 = 1: la distancia sigue subiendo al llegar a 30 cm,
# por lo que el máximo dentro de la región está en el borde.

par(mfrow = c(1, 2))
d30 <- datos[datos$angulo == 30, ]
interaction.plot(
  d30$altura, d30$plataforma,
  d30$prediccion, main = "Ángulo 30°",
  xlab = "Altura lanzamiento (cm)", ylab = "Distancia predicha (cm)",
  trace.label = "Plataf.", col = c("blue", "red"), ylim = c(4, 26)
)
d45 <- datos[datos$angulo == 45, ]
interaction.plot(
  d45$altura, d45$plataforma,
  d45$prediccion, main = "Ángulo 45°",
  xlab = "Altura lanzamiento (cm)", ylab = "Distancia predicha (cm)",
  trace.label = "Plataf.", col = c("blue", "red"), ylim = c(4, 26)
)
par(mfrow = c(1, 1))

# Combinación óptima (30°, 5 cm, 30 cm)
optimo <- data.frame(x1 = -1, x2 = 1, x3 = 1, x1x2 = -1, x1x3 = -1, x2x3 = 1)
predict(sr, optimo)
predict(sr2, optimo)

# Intervalos al 95 % (de la media y de una corrida nueva)
predict(sr, optimo, interval = "confidence")
predict(sr, optimo, interval = "prediction")
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
