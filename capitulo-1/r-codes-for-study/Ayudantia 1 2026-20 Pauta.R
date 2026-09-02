# Ayudantia 1 Metodos Estadisticos Pauta
# Ayudante: Jose Ignacio Costa, Cristobal Van Der Meer
# Esto es un comentario en R. No se ejecuta.
# Para ejecutar un comando, se debe usar Ctrl+Enter (o Command+Enter en Mac)

# 2.
library(datasets) # Libreria preinstalada de R con Datasets de practica
head(iris)
summary(iris)

# 3.
plot(iris$Species) # Para seleccionar una variable se usa $
plot(iris$Petal.Length)

# 4.
plot(iris$Species, iris$Petal.Width)
plot(iris$Petal.Length, iris$Petal.Width)

# 5.
barplot(mtcars$cyl)
# al hacer este grafico no se puede desprender informacion util, por lo que
# hay que transformar la variable

# 6.
cilindros <- table(mtcars$cyl) # Creamos una tabla para la cantidad de cilindros
barplot(cilindros) # el operador <- sirve para definir un objeto
# si su teclado no tiene ><, pueden usar ALT+60 (<) y ALT+62 (>)

# 7.
hist(mtcars$wt [mtcars$cyl==8],
     main="Peso de vehiculos con 8 cilindros",
     col="red",
     breaks=9) # numero de barras)

# 8.
plot(mtcars$wt, mtcars$mpg,
     pch=19, # para rellenar los circulos
     col="red",
     main="Scatter plot entre el peso y consumo de camionetas")

# 9.
install.packages("psych")
# ejecutar solo una vez. Queda instalado en el PC y luego se pueden utilizar sus funciones.
install.packages("pacman")
# paquete de funciones adicionales que se recomienda usar
library(pacman) # para usar las funciones de pacman, hay que cargarlo como "from numpy import random"
library(psych) # lo mismo con psych. Si no cargan las librerias, por mas instalado que este no funcionaran.
describe(mtcars)

# 10.
a1 <- 5
a2 <- "a"
a3 <- c(1,2,3,4,5)
a1 # para llamar o "printear" una variable, simplemente se escribe y ejecuta
a2
a3
typeof(a1)
typeof(a2)
typeof(a3)

# 11.

matriz <- matrix(c("a", "b", # R no necesita definir la estructura, pero
                   "c", "d"),# se puede leer mejor la estructura
                 nrow=2, # numero de filas
                 byrow=T)# forma de mostrar
matriz

# 12.
v1 = c(1,2,3)
v2 = c("a","b","c")
v3 = c(T,T,F)
df1 = data.frame(v1, v2, v3)
df1

# 13.
sec1 <- c(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
sec2 <- scan() # Permite ingresar la secuencia de numeros de forma iterativa
sec1
sec2

# 14.
# Si tienen dudas sobre como usar un comando, pueden escribir en consola ??help
# Por ejemplo, si no saben como usar la distribucion T, escriben: ??help y en
# la pestaña buscan "distribution"

qt(0.95, 100) # Valor de una T al 95% de confianza y 100 GL.
qchisq(0.95, 100) # Valor de una Chi2 al 95% y 100 GL.


####################################################
# Parte 2
####################################################

# 1 a) La desviacion estandar corresponde a la raiz
# cuadrada de numero en la diagonal
s1 <- sqrt(16)
s2 <- sqrt(9)
s3 <- sqrt(25)

# 1 b) Para obtener la matriz de correlaciones, es necesario calcular cada
# una de las correlaciones tal que:
r12 <- 6/sqrt(16*9)
r13 <- 8/sqrt(16*25)
r23 <- 1/sqrt(9*25)
Rmat <- matrix(c(1,r12,r13, # Recordar que la r11 = r22 = r33 = 1
              r12,1,r23,
              r13,r23,1),
            nrow=3,
            byrow=T)
Rmat # mostrar la matriz de correlaciones

# 1 c) Se puede ver que las variables 1 y 2 poseen una correlacion positiva
# moderada, seguida de la correlacion entre las variables 1 y 3. En cambio,
# la variable 2 y 3 poseen una correlacion muy baja.


# 2) Para esto, calculamos el estadistico con la informacion entregada:

n <- 100
tval <- r23*sqrt((n-2)/1-r23^2)
tval
qt(0.975, n-2)
# Cuando n=100 no es posible rechazar Ho, por lo que no existe correlacion entre
# las variables. En cambio, cuando n = 1000, tval es mayor que tcrit, por lo que
# se rechaza Ho, entonces existe correlacion entre las variables.


# 3)

n <- 10
p <- 3
df <- p*(p-1)/2

bart <- (-(n-1-((2*p+5)/6))*log(det(Rmat)))
bart
qchisq(0.95,df)

# 4) Esta es una pregunta teorica para demostrar de forma escrita


# 5 a) 
trip_time <- c(27,36,30,48,53,31,42,42,35,33,44,41,53,53,31,47,33,45,60,33,35,41)
trip_cost <- c(952,1022,1709,1275,1543,753,1257,993,1192,1350,1333,1983,1322,1315,1045,1107,1000,1215,1628,818,926,3100)
trip_dist <- c(2218,2244,1581,2755,3478,2300,2644,2408,2860,2226,2982,2300,2849,2815,2364,3642,2549,3100,3362,1878,2188,2300)

# 5 b)
df1 <- data.frame(trip_time, trip_cost, trip_dist)
df1

# 5 c) R puede identificar automaticamente cual seria el mejor grafico en ciertos casos
plot(df1) # en este caso, identifico directamente un scatter plot para la relacion entre variables

# 5 d)
covmat <- cov(df1)
corrmat <- cor(df1)
covmat
corrmat

# 5 e) Calculamos manualmente al igual que en el otro ejercicio.

n <- nrow(df1)
p <- 3
df <- p*(p-1)/2
bart2 <- (-(n-1-(2*p+5)/6)*log(det(corrmat)))
bart2
qchisq(0.95,df) # Se puede ver que el estadistico es mayor que el chi critico,
# por lo que se rechaza Ho, entonces si existe correlacion entre las variables.

# 6)
datos_std <- scale(df1)
datos_std
