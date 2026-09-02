# ==============================================================================
# CLASE 2: PRUEBAS DE HIPÓTESIS — Ejemplos en R
# Métodos Estadísticos para la Gestión (ICI3104) — Universidad de los Andes
# ------------------------------------------------------------------------------
# Paquetes necesarios (instalar una sola vez, luego dejar comentado):
#   install.packages(c("BSDA", "ICSNP"))
# ==============================================================================


############################################################
# 1. PRUEBA T BILATERAL PARA LA MEDIA (UNA MUESTRA)
############################################################

set.seed(123)
x <- rnorm(25, mean = 10.8, sd = 1.9)   # 25 tiempos simulados
mu0   <- 10
alpha <- 0.05

# H0: mu = 10  vs  H1: mu != 10
res_t <- t.test(x, mu = mu0, alternative = "two.sided",
                conf.level = 1 - alpha)
res_t


############################################################
# 2. PRUEBAS UNILATERALES PARA LA MEDIA
############################################################

t.test(x, mu = mu0, alternative = "greater", conf.level = 0.95)  # H1: mu > mu0
t.test(x, mu = mu0, alternative = "less",    conf.level = 0.95)  # H1: mu < mu0


############################################################
# 3. PRUEBA Z PARA LA MEDIA (VARIANZA CONOCIDA)
############################################################

# install.packages("BSDA")
library(BSDA)

x <- c(12.1, 8.9, 10.5, 11.3, 9.7, 13.0, 10.8, 11.6,
       7.9, 12.4, 9.8, 10.9, 11.1, 10.2, 12.0, 9.3,
       10.6, 13.2, 8.7, 11.4, 10.0, 12.6, 9.5, 10.7,
       11.8, 10.1, 12.3, 9.9, 11.0, 10.4)
length(x)

sigma <- 2.0; mu0 <- 10; alpha <- 0.05
# H0: mu <= 10  vs  H1: mu > 10
res_z <- z.test(x = x, mu = mu0, sigma.x = sigma,
                alternative = "greater", conf.level = 1 - alpha)
res_z


############################################################
# 4. PRUEBA DE PROPORCIONES (manual y con prop.test)
############################################################

X <- 78; n <- 120; phat <- X / n; p0 <- 0.60; alpha <- 0.05
n * p0; n * (1 - p0)                       # requisito de normalidad (>= 5)

# Estadístico Z manual: H0: p <= 0.60  vs  H1: p > 0.60
z_obs <- (phat - p0) / sqrt(p0 * (1 - p0) / n)
z_obs
p_value <- 1 - pnorm(z_obs)                # p-valor cola derecha
p_value

# Misma prueba con la función directa
prop.test(78, 120, 0.6, "greater", correct = FALSE)


############################################################
# 5. PRUEBA CHI-CUADRADO PARA VARIANZAS
############################################################

x <- c(10.2, 9.8, 11.1, 10.7, 9.5, 10.0, 10.8, 11.3,
       9.7, 10.4, 10.9, 9.6, 10.5, 11.0, 10.1)
sigma2_0 <- 4; alpha <- 0.05

n <- length(x); s2 <- var(x)
chi_obs  <- (n - 1) * s2 / sigma2_0        # H0: sigma^2 <= 4  vs  H1: >
chi_crit <- qchisq(1 - alpha, df = n - 1)
p_value  <- 1 - pchisq(chi_obs, df = n - 1)
cat("s2 =", round(s2, 4), " chi_obs =", round(chi_obs, 4),
    " chi_crit =", round(chi_crit, 4), " p =", round(p_value, 4), "\n")


############################################################
# 6. PRUEBA F PARA COCIENTE DE VARIANZAS (manual y var.test)
############################################################

A <- c(10.2, 11.0, 9.8, 10.7, 11.4, 10.9, 9.6, 12.2, 10.5, 11.3, 10.1, 11.6)
B <- c(9.9, 10.1, 10.4, 9.7, 10.3, 9.8, 10.0, 9.6, 10.2, 9.9)
alpha <- 0.05

nA <- length(A); nB <- length(B); s2A <- var(A); s2B <- var(B)
F_obs  <- s2A / s2B                         # H0: s1^2 = s2^2  vs  H1: >
F_crit <- qf(1 - alpha, df1 = nA - 1, df2 = nB - 1)
p_value <- 1 - pf(F_obs, df1 = nA - 1, df2 = nB - 1)
cat("F_obs =", round(F_obs, 4), " F_crit =", round(F_crit, 4),
    " p =", round(p_value, 6), "\n")

var.test(A, B, alternative = "greater")


############################################################
# 7. DIFERENCIA DE MEDIAS: WELCH, POOLED Y PAREADA
############################################################

A <- c(14.2, 13.5, 15.1, 14.7, 13.9, 14.0, 15.4, 14.8, 13.8, 14.1, 15.0, 14.4)
B <- c(16.0, 15.7, 17.3, 16.5, 15.9, 17.1, 16.8, 16.2, 17.4, 15.8)

# Welch (varianzas diferentes): H0: muA >= muB  vs  H1: muA < muB
t.test(A, B, alternative = "less", var.equal = FALSE)

# Pooled (varianzas iguales)
t.test(A, B, alternative = "less", var.equal = TRUE)

# Datos pareados (colesterol antes/después)
antes   <- c(135, 140, 152, 150, 140, 157, 153, 154, 141, 130, 136)
despues <- c(110, 125, 132, 143, 120, 124, 137, 130, 128, 115, 115)
diferencias <- antes - despues
mean(diferencias); sd(diferencias)
t.test(antes, despues, paired = TRUE, alternative = "two.sided", conf.level = 0.95)


############################################################
# 8. INFERENCIA MULTIVARIADA: T² DE HOTELLING E IC SIMULTÁNEOS
############################################################
# Datos "cork": depósito de corteza en 28 árboles, 4 direcciones (N,E,S,W).
# NOTA: deja el archivo cork.csv en tu directorio de trabajo.

cork <- read.csv("cork.csv")
n <- nrow(cork)

# H0: el depósito es igual en las 4 direcciones (3 contrastes ortogonales)
Rc <- rbind(c(1, -1,  1, -1),   # (N+S) - (E+W)
            c(1,  0, -1,  0),   # N - S
            c(0,  1,  0, -1))   # E - W
Y <- as.matrix(cork) %*% t(Rc)
q <- ncol(Y)

# install.packages("ICSNP")
library(ICSNP)

# T² de Hotelling de una muestra:  H0: E(Y) = 0
HotellingsT2(Y, mu = c(0, 0, 0))

# Intervalos de confianza simultáneos 95% (método T²) por contraste
yb <- colMeans(Y); S <- cov(Y)
cr <- sqrt(q * (n - 1) / (n - q) * qf(0.95, q, n - q))
se <- sqrt(diag(S) / n)
cbind(inferior = yb - cr * se, superior = yb + cr * se)

# Nota: la normalidad multivariada (test de Mardia) se revisa con el paquete MVN:
#   install.packages("MVN"); library(MVN); mvn(cork, mvnTest = "mardia")
