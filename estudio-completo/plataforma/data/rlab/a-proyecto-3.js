/* ============================================================================
   Laboratorio R · Proyecto computacional 3 (P3) — paso a paso
   Enunciado: PC3. Experimento factorial 2 × 2 × 3 (factor de 3 niveles
   cuantitativo y equiespaciado), ≥ 3 réplicas, orden aleatorio con
   set.seed(<grupo>), ANOVA + supuestos + gráficos, superficie de respuesta de
   2.º orden, óptimo dentro de la región y 3 corridas de confirmación.
   El ejemplo (avión de papel) usa DATOS SIMULADOS solo para que el código
   corra: cada grupo reemplaza los factores y la columna de respuesta por los
   suyos. Todas las salidas se ejecutaron en R 4.6.1.
   El archivo se llama «a-…» para que estas recetas salgan primero.
   ========================================================================== */
(function () {
  /* Bloque común: diseño + valores anotados (se repite al inicio de cada receta
     para que cada una se pueda correr sola). */
  var BASE = `# ---- Diseño y datos (paso 1 y 2) ----
set.seed(24)                                   # <- tu número de grupo
papel   <- rep(c("Bond", "Reciclado"), each = 18)                  # A: 2 niveles
diseno  <- rep(rep(c("Dardo", "Planeador"), each = 9), times = 2)  # B: 2 niveles
masa    <- rep(rep(c(0, 1, 2), each = 3), times = 4)               # C: 0, 1, 2 g
replica <- rep(1:3, times = 12)
plan <- data.frame(papel, diseno, masa, replica)
plan$orden <- sample(1:36)                     # orden aleatorio de las corridas
datos <- plan[order(plan$orden), ]             # planilla en el orden de ejecución
datos$distancia <- c(8.2, 5.6, 7.1, 7.4, 8.1, 7.7, 6.7, 5.3, 5.7, 6.6, 4.3, 4.2,
                     8.2, 5.4, 7.4, 3.4, 8.3, 3.5, 5.5, 5.6, 5.5, 5.5, 5.7, 6.8,
                     7.8, 6.0, 5.5, 5.8, 7.1, 4.9, 3.9, 5.7, 7.3, 8.3, 5.9, 5.0)
datos$papel  <- factor(datos$papel)
datos$diseno <- factor(datos$diseno)
datos$masaF  <- factor(datos$masa)             # masa como factor (para el ANOVA)
`;
  var CODIF = `datos$x1 <- ifelse(datos$papel  == "Bond",  -1, 1)   # A codificado
datos$x2 <- ifelse(datos$diseno == "Dardo", -1, 1)   # B codificado
datos$x3 <- (datos$masa - 1) / 1                     # C: (valor - centro) / paso
`;
  var T = "Proyecto 3 · paso a paso";
  var M = "m25-factorial-general", R = "m26-regresion-lineal";
  var SIM = " <strong>Los datos son simulados</strong> (avión de papel: A = papel Bond/Reciclado, B = diseño Dardo/Planeador, C = masa en la nariz 0, 1 y 2 g; Y = distancia en m): reemplázalos por los tuyos.";

  PLATAFORMA.registrar("rlab", [
    {
      id: "r-p3-00-mapa", modulo: M, tema: T,
      titulo: "0 · Mapa del proyecto y plantilla del script único",
      descripcion: "Qué pide el enunciado (PC3), con qué receta se resuelve cada criterio de la rúbrica y el esqueleto del único script R ordenado y comentado que se entrega.",
      funciones: ["set.seed", "write.csv", "read.csv"],
      codigo: `# ==============================================================================
# PROYECTO COMPUTACIONAL 3 — Grupo <N>
# Experimento: <pregunta>      Respuesta: <Y (unidad)>      Objetivo: maximizar/minimizar
# Factores: A (2 niveles) · B (2 niveles) · C (3 niveles, cuantitativo, equiespaciado)
# ==============================================================================
# install.packages(c("agricolae", "car"))   # una sola vez, luego dejar comentado
library(agricolae)   # LSD.test
library(car)         # leveneTest, vif

############################################################
# 1. DISEÑO Y ALEATORIZACIÓN (set.seed = número de grupo)      -> receta 1
############################################################
############################################################
# 2. DATOS: lectura de la base con los valores medidos           -> receta 2
############################################################
############################################################
# 3. GRÁFICOS DESCRIPTIVOS (boxplot, efectos, interacciones)     -> receta 3
############################################################
############################################################
# 4. ANOVA FACTORIAL 2 x 2 x 3 Y EFECTOS                        -> receta 4
############################################################
############################################################
# 5. SUPUESTOS: normalidad, homocedasticidad, independencia     -> recetas 5 y 6
############################################################
############################################################
# 6. COMPARACIONES MÚLTIPLES (LSD / Tukey)                      -> receta 7
############################################################
############################################################
# 7. SUPERFICIE DE RESPUESTA (modelo de 2.º orden)              -> receta 8
############################################################
############################################################
# 8. OPTIMIZACIÓN DENTRO DE LA REGIÓN EXPERIMENTAL             -> recetas 9 y 10
############################################################
############################################################
# 9. CORRIDAS DE CONFIRMACIÓN (3 en el punto óptimo)            -> receta 11
############################################################`,
      lectura: String.raw`<table class="tabla"><tr><th>Criterio (pts.)</th><th>Qué debe quedar en el informe / script</th><th>Receta</th></tr>
<tr><td>Diseño estadístico (15)</td><td>2 × 2 × 3; factor de 3 niveles cuantitativo y equiespaciado; ≥ 3 réplicas (≥ 36 corridas); respuesta cuantitativa y aleatoria; unidad experimental; aleatorización con <code>set.seed(&lt;grupo&gt;)</code></td><td>1, 2</td></tr>
<tr><td>Análisis del diseño factorial (20)</td><td>Efectos principales e interacciones, ANOVA correcto, supuestos (normalidad, homocedasticidad, independencia) y gráficos apropiados</td><td>3–7</td></tr>
<tr><td>Superficie de respuesta y optimización (20)</td><td>Modelo de 2.º orden coherente con el diseño, combinación óptima <em>dentro</em> de la región experimental, verificación con las 3 corridas de confirmación</td><td>8–11</td></tr>
<tr><td>Reproducibilidad (5)</td><td>Base de datos + un único script R ordenado, comentado, con la semilla fijada, que corra de principio a fin</td><td>0, 2</td></tr></table>
<p>Fechas: propuesta de una página hasta el lunes 2 de noviembre (23:59); entrega el 13 de noviembre de 2026 (23:59). Informe de 12 a 18 páginas sin anexos; 100 puntos con 60 % de exigencia; 15 % de la nota final.</p>
<p><strong>Antes de entregar:</strong> reinicia R (<em>Session → Restart R</em>) y corre el script completo de arriba abajo: si funciona así, es reproducible. Usa rutas relativas (<code>read.csv("datos_grupo24.csv")</code>), no <code>C:/Users/…</code>.</p>`,
      aviso: "Las recetas 1–11 usan, además de lo visto en clases, algunas funciones básicas que el proyecto necesita y que no aparecen en los scripts del curso: <code>sample</code>, <code>order</code>, <code>write.csv</code>/<code>read.csv</code>, <code>table</code>, <code>ifelse</code>, <code>abline</code>, <code>lines</code>, <code>legend</code> y <code>predict(…, interval = )</code>. Cada receta lo indica. Aún no hay clase de superficie de respuesta: las recetas 8–11 se apoyan en la regresión polinomial de C8.1 y se revisarán cuando se suba esa clase.",
      fuente: [{ id: "PC3", loc: "págs. 1–2" }]
    },

    {
      id: "r-p3-01-diseno", modulo: M, tema: T,
      titulo: "1 · Armar el diseño 2 × 2 × 3 con 3 réplicas y aleatorizar el orden con set.seed",
      descripcion: "Se generan las 36 corridas (12 tratamientos × 3 réplicas) con rep(), como en los scripts del curso, y se sortea el orden de ejecución con sample() después de set.seed(<número de grupo>)." + SIM,
      aviso: "<code>sample</code>, <code>order</code>, <code>table</code> y <code>write.csv</code> no aparecen en los scripts de clase; son funciones básicas de R necesarias para aleatorizar y guardar la planilla.",
      funciones: ["set.seed", "rep", "data.frame", "sample", "order", "table", "write.csv"],
      codigo: `set.seed(24)                                   # <- tu número de grupo
papel   <- rep(c("Bond", "Reciclado"), each = 18)                  # A: 2 niveles
diseno  <- rep(rep(c("Dardo", "Planeador"), each = 9), times = 2)  # B: 2 niveles
masa    <- rep(rep(c(0, 1, 2), each = 3), times = 4)               # C: 0, 1, 2 g
replica <- rep(1:3, times = 12)
plan <- data.frame(papel, diseno, masa, replica)
nrow(plan)                                     # 2 x 2 x 3 x 3 = 36 corridas
table(plan$papel, plan$diseno, plan$masa)      # 3 réplicas en cada tratamiento

plan$orden <- sample(1:36)                     # orden aleatorio de las corridas
planilla <- plan[order(plan$orden), ]          # ordenada como se ejecutará
planilla$distancia <- NA                       # columna vacía para anotar Y
print(planilla, row.names = FALSE)

# write.csv(planilla, "planilla_grupo24.csv", row.names = FALSE)   # para imprimir / llenar`,
      salida: `[1] 36
, ,  = 0


            Dardo Planeador
  Bond          3         3
  Reciclado     3         3

, ,  = 1


            Dardo Planeador
  Bond          3         3
  Reciclado     3         3

, ,  = 2


            Dardo Planeador
  Bond          3         3
  Reciclado     3         3

     papel    diseno masa replica orden distancia
      Bond Planeador    2       2     1        NA
 Reciclado     Dardo    1       2     2        NA
 Reciclado Planeador    2       1     3        NA
 Reciclado Planeador    1       1     4        NA
      Bond Planeador    2       3     5        NA
 Reciclado Planeador    1       2     6        NA
 Reciclado Planeador    2       2     7        NA
      Bond     Dardo    0       2     8        NA
      Bond     Dardo    2       3     9        NA
      Bond     Dardo    1       2    10        NA
 Reciclado     Dardo    2       2    11        NA
 Reciclado     Dardo    0       2    12        NA
      Bond Planeador    2       1    13        NA
 Reciclado Planeador    0       1    14        NA
 Reciclado Planeador    2       3    15        NA
 Reciclado     Dardo    0       1    16        NA
      Bond Planeador    1       2    17        NA
 Reciclado     Dardo    2       3    18        NA
      Bond     Dardo    0       1    19        NA
      Bond Planeador    0       1    20        NA
 Reciclado Planeador    0       2    21        NA
      Bond     Dardo    2       1    22        NA
      Bond     Dardo    0       3    23        NA
      Bond     Dardo    1       3    24        NA
      Bond Planeador    1       3    25        NA
      Bond     Dardo    2       2    26        NA
 Reciclado     Dardo    1       3    27        NA
      Bond Planeador    0       2    28        NA
      Bond     Dardo    1       1    29        NA
 Reciclado     Dardo    1       1    30        NA
 Reciclado     Dardo    2       1    31        NA
 Reciclado Planeador    0       3    32        NA
 Reciclado Planeador    1       3    33        NA
      Bond Planeador    1       1    34        NA
      Bond Planeador    0       3    35        NA
 Reciclado     Dardo    0       3    36        NA`,
      ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
      lectura: String.raw`<ul>
<li><code>rep(…, each = 18)</code> repite cada nivel 18 veces seguidas; <code>times = 2</code> repite el bloque completo. Combinando <code>each</code> y <code>times</code> se obtienen las 12 combinaciones, cada una 3 veces.</li>
<li><code>table</code> confirma el diseño balanceado: 3 en cada una de las 12 celdas.</li>
<li><code>sample(1:36)</code> es una permutación al azar: la corrida con <code>orden = 1</code> se hace primero. Con la misma semilla se obtiene siempre el mismo orden (reproducible). <strong>Corre <code>set.seed</code> justo antes de <code>sample</code></strong>: si hay otro sorteo entre medio, cambia el orden.</li>
<li>La planilla impresa es la hoja de terreno: se ejecuta de arriba abajo y se anota Y en cada fila. Es un diseño <strong>completamente aleatorizado</strong> (no hay bloques); si las corridas se hacen en días distintos, el día podría tratarse como bloque (M20, M21).</li>
<li>En el informe: unidad experimental (un lanzamiento/una pieza), factores y niveles en unidades reales y codificadas, n.º de réplicas y cómo se aleatorizó.</li></ul>`,
      fuente: [{ id: "PC3", loc: "pág. 1" }, { id: "S7.4", loc: "líneas 49–55 (rep)" }, { id: "C7.3", loc: "slide 19" }]
    },

    {
      id: "r-p3-02-datos", modulo: M, tema: T,
      titulo: "2 · Anotar los valores medidos y dejar la base lista (factores y codificación)",
      descripcion: "Dos formas de cargar la respuesta: escribirla en R en el orden de ejecución de la planilla, o llenar el CSV en Excel y leerlo con read.csv. Luego los factores pasan a factor() y se crean las variables codificadas (−1, 0, 1) que usará la superficie de respuesta." + SIM,
      aviso: "<code>read.csv</code>, <code>write.csv</code> e <code>ifelse</code> no están en los scripts de clase.",
      funciones: ["factor", "ifelse", "str", "head", "read.csv", "write.csv"],
      codigo: BASE.replace(/datos\$papel  <- factor[\s\S]*$/, "") + `# Opción B (en vez de escribir el vector): llenar la columna en Excel y leer
# datos <- read.csv("planilla_grupo24_con_datos.csv")   # mismo orden y columnas

datos$papel  <- factor(datos$papel)            # factores cualitativos
datos$diseno <- factor(datos$diseno)
datos$masaF  <- factor(datos$masa)             # C como factor para el ANOVA
` + CODIF + `str(datos)
head(datos, 4)
# write.csv(datos, "datos_grupo24.csv", row.names = FALSE)   # base que se entrega`,
      salida: `'data.frame':	36 obs. of  10 variables:
 $ papel    : Factor w/ 2 levels "Bond","Reciclado": 1 2 2 2 1 2 2 1 1 1 ...
 $ diseno   : Factor w/ 2 levels "Dardo","Planeador": 2 1 2 2 2 2 2 1 1 1 ...
 $ masa     : num  2 1 2 1 2 1 2 0 2 1 ...
 $ replica  : int  2 2 1 1 3 2 2 2 3 2 ...
 $ orden    : int  1 2 3 4 5 6 7 8 9 10 ...
 $ distancia: num  8.2 5.6 7.1 7.4 8.1 7.7 6.7 5.3 5.7 6.6 ...
 $ masaF    : Factor w/ 3 levels "0","1","2": 3 2 3 2 3 2 3 1 3 2 ...
 $ x1       : num  -1 1 1 1 -1 1 1 -1 -1 -1 ...
 $ x2       : num  1 -1 1 1 1 1 1 -1 -1 -1 ...
 $ x3       : num  1 0 1 0 1 0 1 -1 1 0 ...
       papel    diseno masa replica orden distancia masaF x1 x2 x3
17      Bond Planeador    2       2     1       8.2     2 -1  1  1
23 Reciclado     Dardo    1       2     2       5.6     1  1 -1  0
34 Reciclado Planeador    2       1     3       7.1     2  1  1  1
31 Reciclado Planeador    1       1     4       7.4     1  1  1  0`,
      ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
      lectura: String.raw`<ul>
<li><strong>Cómo anotar:</strong> el vector <code>distancia</code> se escribe en el <em>orden de ejecución</em> (fila 1 de la planilla = corrida 1). Así cada valor queda pegado a su tratamiento sin errores de transcripción. Cuenta que sean 36 (<code>length(datos$distancia)</code>).</li>
<li>Usa punto decimal (<code>8.2</code>), no coma. Si lees un CSV guardado por Excel en español, puede venir con <code>;</code> y coma decimal: entonces <code>read.csv2()</code>.</li>
<li><code>str</code>: <code>papel</code>, <code>diseno</code> y <code>masaF</code> deben ser <code>Factor</code>; <code>masa</code> y <code>x3</code> numéricas. Si <code>masa</code> quedara numérica en el ANOVA, R le daría 1 gl (recta) en vez de 2.</li>
<li>Codificación: $x=(\text{valor}-\text{centro})/\text{paso}$. Masa 0, 1, 2 g ⇒ $x_3=-1, 0, 1$. Los factores de 2 niveles quedan en $\pm1$ (como en C7.4).</li>
<li>Requisito del enunciado: la respuesta debe variar entre réplicas de un mismo tratamiento (si no, el CME sería 0 y no hay ANOVA).</li></ul>`,
      fuente: [{ id: "PC3", loc: "pág. 1" }, { id: "C7.4", loc: "slides 4 y 10" }]
    },

    {
      id: "r-p3-03-graficos", modulo: M, tema: T,
      titulo: "3 · Gráficos del diseño: boxplot por tratamiento, efectos principales e interacciones",
      descripcion: "Gráficos que pide la rúbrica para el análisis factorial. Solo gráficos (sin salida de texto). Antes, corre el bloque de datos de la receta 2.",
      aviso: "Ponle título y nombre a los ejes a cada gráfico del informe (argumentos <code>main</code>, <code>xlab</code>, <code>ylab</code>): la rúbrica evalúa «tablas y gráficos rotulados».",
      funciones: ["boxplot", "plot.design", "interaction.plot", "par"],
      codigo: `# Distribución por tratamiento (12 cajas de 3 datos)
boxplot(distancia ~ papel * diseno * masaF, data = datos, las = 2,
        main = "Distancia por tratamiento", ylab = "Distancia (m)", xlab = "")

# Efectos principales (media de Y en cada nivel)
plot.design(datos[, c("papel", "diseno", "masaF", "distancia")],
            main = "Efectos principales", ylab = "Distancia media (m)")

# Interacciones dobles: una línea por nivel del segundo factor
par(mfrow = c(1, 3))
interaction.plot(datos$masaF, datos$diseno, datos$distancia,
                 xlab = "Masa (g)", ylab = "Distancia media (m)", trace.label = "Diseño")
interaction.plot(datos$masaF, datos$papel, datos$distancia,
                 xlab = "Masa (g)", ylab = "Distancia media (m)", trace.label = "Papel")
interaction.plot(datos$papel, datos$diseno, datos$distancia,
                 xlab = "Papel", ylab = "Distancia media (m)", trace.label = "Diseño")
par(mfrow = c(1, 1))

# Interacción triple: interacción masa x diseño, por separado para cada papel
par(mfrow = c(1, 2))
for (p in levels(datos$papel)) {
  d <- datos[datos$papel == p, ]
  interaction.plot(d$masaF, d$diseno, d$distancia, main = paste("Papel", p),
                   xlab = "Masa (g)", ylab = "Distancia media (m)", trace.label = "Diseño")
}
par(mfrow = c(1, 1))`,
      lectura: String.raw`<ul>
<li><strong>Boxplot:</strong> cajas muy distintas en ancho anticipan problemas de homocedasticidad; un punto muy separado puede ser un error de anotación (revisa la planilla antes de borrarlo).</li>
<li><strong>plot.design:</strong> cuanto más largo el recorrido vertical de un factor, mayor su efecto. Con un factor de 3 niveles mira también si la media del nivel central queda arriba o abajo de la recta entre los extremos: eso es <strong>curvatura</strong> y justifica el término $x_3^2$ de la superficie.</li>
<li><strong>interaction.plot:</strong> líneas paralelas ⇒ sin interacción; pendientes distintas o cruces ⇒ interacción (C7.3 s22–23). En el ejemplo, con el Dardo la distancia cae al pasar de 1 a 2 g, pero con el Planeador casi no: interacción masa × diseño.</li>
<li>La gráfica de la interacción triple compara los dos paneles: si el patrón masa × diseño es el mismo con ambos papeles, la triple no es importante.</li></ul>`,
      fuente: [{ id: "S7.4", loc: "líneas 39–45 y 62–65" }, { id: "C7.3", loc: "slides 20–23 y 29" }, { id: "C7.2", loc: "slide 19 (boxplot)" }]
    },

    {
      id: "r-p3-04-anova", modulo: M, tema: T,
      titulo: "4 · ANOVA factorial 2 × 2 × 3 y tablas de medias",
      descripcion: "aov con el modelo completo (A * B * C, con C como factor) y model.tables para las medias de cada efecto. Es la tabla central del análisis del diseño factorial." + SIM,
      funciones: ["aov", "summary", "model.tables"],
      codigo: BASE + `
modelo <- aov(distancia ~ papel * diseno * masaF, data = datos)
summary(modelo)
model.tables(modelo, type = "means")`,
      salida: `                   Df Sum Sq Mean Sq F value   Pr(>F)
papel               1 11.000  11.000  93.619 9.32e-10 ***
diseno              1 28.267  28.267 240.570 5.23e-14 ***
masaF               2 17.287   8.644  73.563 5.79e-11 ***
papel:diseno        1  1.734   1.734  14.754 0.000786 ***
papel:masaF         2  0.737   0.369   3.137 0.061611 .
diseno:masaF        2  6.014   3.007  25.591 1.12e-06 ***
papel:diseno:masaF  2  0.044   0.022   0.187 0.830836
Residuals          24  2.820   0.118
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
Tables of means
Grand mean

6.136111

 papel
papel
     Bond Reciclado
    6.689     5.583

 diseno
diseno
    Dardo Planeador
    5.250     7.022

 masaF
masaF
    0     1     2
5.250 6.942 6.217

 papel:diseno
           diseno
papel       Dardo Planeador
  Bond      6.022 7.356
  Reciclado 4.478 6.689

 papel:masaF
           masaF
papel       0     1     2
  Bond      5.633 7.483 6.950
  Reciclado 4.867 6.400 5.483

 diseno:masaF
           masaF
diseno      0     1     2
  Dardo     4.850 6.083 4.817
  Planeador 5.650 7.800 7.617

 papel:diseno:masaF
, , masaF = 0

           diseno
papel       Dardo Planeador
  Bond      5.500 5.767
  Reciclado 4.200 5.533

, , masaF = 1

           diseno
papel       Dardo Planeador
  Bond      6.833 8.133
  Reciclado 5.333 7.467

, , masaF = 2

           diseno
papel       Dardo Planeador
  Bond      5.733 8.167
  Reciclado 3.900 7.067`,
      ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
      lectura: String.raw`<ul>
<li><strong>gl:</strong> papel 1, diseño 1, masa 2, papel:diseño 1, papel:masa 2, diseño:masa 2, triple 2 y error $abc(n-1)=12\cdot2=24$; total 35. Si tus gl no son estos, algún factor quedó numérico.</li>
<li><strong>Hipótesis</strong> (una por fila): $H_0$: el efecto es nulo. Se rechaza si <code>Pr(&gt;F)</code> $<0{,}05$.</li>
<li>Ejemplo: significativos papel, diseño, masa, papel:diseño ($p=0{,}0008$) y diseño:masa ($p=1{,}1\cdot10^{-6}$); papel:masa marginal ($p=0{,}062$); la triple no ($p=0{,}83$).</li>
<li><strong>Lectura en orden:</strong> primero la interacción de mayor orden significativa; los efectos principales involucrados en una interacción significativa se interpretan con la gráfica de interacción, no solos (C7.3 s29–31).</li>
<li><code>model.tables(type = "means")</code>: media general (6,136) y medias por nivel y por celda. Con 2 niveles, el efecto principal es $\bar Y_+-\bar Y_-$: diseño $=7{,}022-5{,}250=1{,}77$ m; papel $=5{,}583-6{,}689=-1{,}11$ m. (<code>type = "effects"</code> da la mitad: ver M21.)</li>
<li>Términos no significativos (aquí la triple) pueden mandarse al error y reajustar (C7.3 s35); decláralo en el informe.</li></ul>`,
      fuente: [{ id: "C7.3", loc: "slides 34–36" }, { id: "C7.4", loc: "slides 10–12" }, { id: "PC3", loc: "pág. 2 (rúbrica)" }]
    },

    {
      id: "r-p3-05-supuestos", modulo: M, tema: T,
      titulo: "5 · Supuestos con pruebas: normalidad (Shapiro), homocedasticidad (Levene/Bartlett), independencia",
      descripcion: "Pruebas formales sobre los residuos del ANOVA. Los gráficos correspondientes están en la receta 6." + SIM,
      aviso: "<code>bartlett.test</code> (varianzas) no se vio en clases; el curso usa Levene (<code>car::leveneTest</code>, C7.2). Se deja como alternativa.",
      funciones: ["residuals", "shapiro.test", "car::leveneTest", "bartlett.test", "interaction", "cor"],
      paquetes: ["car"],
      codigo: BASE + `modelo <- aov(distancia ~ papel * diseno * masaF, data = datos)
res <- residuals(modelo)

# Normalidad   H0: los residuos son normales
shapiro.test(res)

# Homocedasticidad   H0: las 12 varianzas (tratamientos) son iguales
library(car)
leveneTest(distancia ~ papel * diseno * masaF, data = datos)
bartlett.test(distancia ~ interaction(papel, diseno, masaF), data = datos)

# Independencia: residuos vs orden de ejecución (datos está en ese orden)
round(cor(res[-1], res[-36]), 3)     # correlación entre residuos consecutivos`,
      salida: `	Shapiro-Wilk normality test

data:  res
W = 0.9667, p-value = 0.3424

Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group 11  0.9563 0.5083
      24

	Bartlett test of homogeneity of variances

data:  distancia by interaction(papel, diseno, masaF)
Bartlett's K-squared = 13.891, df = 11, p-value = 0.2391

[1] -0.285`,
      ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
      lectura: String.raw`<ul>
<li><strong>Shapiro-Wilk</strong> $W=0{,}967$, $p=0{,}342>0{,}05$ ⇒ no se rechaza la normalidad.</li>
<li><strong>Levene</strong> $p=0{,}508$ y <strong>Bartlett</strong> $p=0{,}239$ ⇒ no se rechaza la igualdad de varianzas entre tratamientos. (Levene es menos sensible a la falta de normalidad.)</li>
<li><strong>Independencia:</strong> no hay prueba en el curso; se revisa el gráfico de residuos vs orden (receta 6). La correlación entre residuos consecutivos (aquí $-0{,}29$, débil) ayuda a detectar arrastre de una corrida a la siguiente: un valor alto y positivo sería señal de dependencia. Lo que manda es el gráfico. La aleatorización del orden es lo que protege este supuesto.</li>
<li>Si fallara: normalidad o varianza ⇒ probar transformar Y (p. ej. <code>log</code>), como sugiere C8.1 s29; reportar el problema en «alcances y limitaciones».</li>
<li><code>residuals(modelo)</code> = dato − media de su tratamiento (C7.2 s23).</li></ul>`,
      fuente: [{ id: "C7.2", loc: "slides 22–24" }, { id: "C8.1", loc: "slides 28–30" }, { id: "PC3", loc: "pág. 2 (rúbrica)" }]
    },

    {
      id: "r-p3-06-residuos", modulo: M, tema: T,
      titulo: "6 · Gráficos de residuos: Q-Q, vs ajustados y vs orden de ejecución",
      descripcion: "Los cuatro gráficos de plot(modelo) y el gráfico de residuos contra el orden de las corridas (independencia). Solo gráficos. Antes, corre el bloque de datos y el modelo de la receta 4.",
      aviso: "<code>abline</code> no aparece en los scripts de clase (dibuja la línea en 0).",
      funciones: ["plot", "residuals", "fitted", "abline", "par"],
      codigo: `modelo <- aov(distancia ~ papel * diseno * masaF, data = datos)

par(mfrow = c(2, 2))
plot(modelo)                       # residuos vs ajustados, Q-Q, escala-ubicación, ...
par(mfrow = c(1, 1))

# Independencia: residuos en el orden en que se hicieron las corridas
plot(datos$orden, residuals(modelo), type = "b",
     xlab = "Orden de ejecución", ylab = "Residuo", main = "Residuos vs orden")
abline(h = 0, lty = 2)

# Varianza constante: residuos vs valores ajustados (medias de tratamiento)
plot(fitted(modelo), residuals(modelo),
     xlab = "Valor ajustado", ylab = "Residuo", main = "Residuos vs ajustados")
abline(h = 0, lty = 2)`,
      lectura: String.raw`<ul>
<li><strong>Q-Q:</strong> puntos cerca de la diagonal ⇒ normalidad razonable (C8.1 s30).</li>
<li><strong>Residuos vs ajustados:</strong> nube de ancho parejo ⇒ varianza constante; embudo ⇒ varianza que crece con la media (C8.1 s29). En un ANOVA hay 12 columnas de puntos (una por tratamiento).</li>
<li><strong>Residuos vs orden:</strong> sin rachas ni tendencia ⇒ independencia. Una tendencia indicaría que algo cambió durante el experimento (desgaste, cansancio, clima).</li>
<li>Para un modelo <code>aov</code> con factores, el cuarto gráfico de <code>plot(modelo)</code> («Constant Leverage») muestra los residuos por nivel del factor.</li></ul>`,
      fuente: [{ id: "C8.1", loc: "slides 28–31" }, { id: "C7.2", loc: "slides 22–24" }]
    },

    {
      id: "r-p3-07-comparaciones", modulo: M, tema: T,
      titulo: "7 · Comparaciones múltiples: LSD de la interacción significativa y de un efecto principal",
      descripcion: "Con interacción significativa se comparan las combinaciones (aquí diseño × masa); el factor que no interactúa fuertemente se compara solo. LSD.test de agricolae como en C7.3; Tukey como alternativa (C7.2)." + SIM,
      funciones: ["agricolae::LSD.test", "TukeyHSD"],
      paquetes: ["agricolae"],
      codigo: BASE + `modelo <- aov(distancia ~ papel * diseno * masaF, data = datos)
library(agricolae)
LSD.test(modelo, c("diseno", "masaF"))$groups   # combinaciones diseño x masa
LSD.test(modelo, "papel")$groups
TukeyHSD(modelo, "masaF")                       # alternativa más conservadora`,
      salida: `            distancia groups
Planeador:1  7.800000      a
Planeador:2  7.616667      a
Dardo:1      6.083333      b
Planeador:0  5.650000      c
Dardo:0      4.850000      d
Dardo:2      4.816667      d
          distancia groups
Bond       6.688889      a
Reciclado  5.583333      b
  Tukey multiple comparisons of means
    95% family-wise confidence level

Fit: aov(formula = distancia ~ papel * diseno * masaF, data = datos)

$masaF
          diff        lwr        upr    p adj
1-0  1.6916667  1.3421951  2.0411382 0.00e+00
2-0  0.9666667  0.6171951  1.3161382 1.10e-06
2-1 -0.7250000 -1.0744715 -0.3755285 7.57e-05`,
      ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
      lectura: String.raw`<ul>
<li>Misma letra = no difieren. Mejor combinación: <code>Planeador:1</code> y <code>Planeador:2</code> (grupo <code>a</code>, no difieren entre sí); el resto es peor.</li>
<li>Papel: Bond (6,69) <code>a</code> &gt; Reciclado (5,58) <code>b</code>.</li>
<li>Tukey de la masa (promediando lo demás): 1 g supera a 0 g y a 2 g. Pero como masa interactúa con diseño, la conclusión útil es la de la combinación (C7.3 s31: «las comparaciones cambian dependiendo del nivel del otro factor»).</li>
<li>LSD es más potente; Tukey controla el error global (C7.2). Indica en el informe cuál usaste.</li></ul>`,
      fuente: [{ id: "C7.3", loc: "slides 13, 30–31" }, { id: "S7.3", loc: "líneas 31–34" }, { id: "C7.2", loc: "slides 10–19" }]
    },

    {
      id: "r-p3-08-superficie", modulo: R, tema: T,
      titulo: "8 · Superficie de respuesta: modelo de 2.º orden con variables codificadas (lm)",
      descripcion: "Se ajusta por regresión (C8.1) el modelo de segundo orden que el diseño permite: lineales, interacciones dobles y el cuadrático del factor de 3 niveles. Luego se compara con el modelo reducido por step()." + SIM,
      aviso: "Aún no hay clase de superficie de respuesta: se usa la regresión polinomial de C8.1 (<code>I(x^2)</code>). Revisa esta receta cuando se suba esa clase.",
      funciones: ["lm", "I", "summary", "step", "anova"],
      codigo: BASE + CODIF + `
# Modelo de 2.º orden coherente con el diseño 2 x 2 x 3:
#  - x1 y x2 tienen 2 niveles: solo términos lineales (x1^2 = x2^2 = 1, no se estiman)
#  - x3 tiene 3 niveles: se puede estimar la curvatura I(x3^2)
sr <- lm(distancia ~ x1 + x2 + x3 + x1:x2 + x1:x3 + x2:x3 + I(x3^2), data = datos)
summary(sr)

sr2 <- step(sr, direction = "both", trace = 0)   # selección por AIC
formula(sr2)
anova(sr)`,
      salida: `Call:
lm(formula = distancia ~ x1 + x2 + x3 + x1:x2 + x1:x3 + x2:x3 +
    I(x3^2), data = datos)

Residuals:
     Min       1Q   Median       3Q      Max
-0.86667 -0.16944  0.01111  0.20833  0.73333

Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept)  6.94167    0.09258  74.979  < 2e-16 ***
x1          -0.55278    0.05345 -10.342 4.56e-11 ***
x2           0.88611    0.05345  16.578 5.22e-16 ***
x3           0.48333    0.06547   7.383 4.86e-08 ***
I(x3^2)     -1.20833    0.11339 -10.656 2.32e-11 ***
x1:x2        0.21944    0.05345   4.105 0.000317 ***
x1:x3       -0.17500    0.06547  -2.673 0.012391 *
x2:x3        0.50000    0.06547   7.638 2.55e-08 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.3207 on 28 degrees of freedom
Multiple R-squared:  0.9576,	Adjusted R-squared:  0.947
F-statistic: 90.31 on 7 and 28 DF,  p-value: < 2.2e-16

distancia ~ x1 + x2 + x3 + x1:x2 + x1:x3 + x2:x3 + I(x3^2)
Analysis of Variance Table

Response: distancia
          Df  Sum Sq Mean Sq  F value    Pr(>F)
x1         1 11.0003 11.0003 106.9471 4.562e-11 ***
x2         1 28.2669 28.2669 274.8175 5.221e-16 ***
x3         1  5.6067  5.6067  54.5093 4.859e-08 ***
I(x3^2)    1 11.6806 11.6806 113.5610 2.322e-11 ***
x1:x2      1  1.7336  1.7336  16.8546 0.0003165 ***
x1:x3      1  0.7350  0.7350   7.1458 0.0123915 *
x2:x3      1  6.0000  6.0000  58.3333 2.550e-08 ***
Residuals 28  2.8800  0.1029
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1`,
      ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
      lectura: String.raw`<ul>
<li><strong>Modelo ajustado</strong> (codificado): $\hat y=6{,}942-0{,}553x_1+0{,}886x_2+0{,}483x_3-1{,}208x_3^2+0{,}219x_1x_2-0{,}175x_1x_3+0{,}500x_2x_3$.</li>
<li><code>I(x3^2) = -1.208</code> ($p=2{,}3\cdot10^{-11}$): curvatura significativa y negativa ⇒ la respuesta tiene un <strong>máximo</strong> en $x_3$ dentro de la región (si fuera positiva sería un mínimo).</li>
<li>F global $=90{,}3$ ($p<2{,}2\cdot10^{-16}$); $R^2_{aj}=0{,}947$: el modelo explica casi toda la variación. Compara con el $R^2$ del ANOVA completo: la superficie usa 7 términos en vez de 11.</li>
<li><code>step</code> deja los 7 términos (ninguno sobra según AIC). Si un término no fuera significativo puedes quitarlo, pero respeta la jerarquía: si dejas $x_2x_3$, deja $x_2$ y $x_3$.</li>
<li><code>anova(sr)</code>: SC secuencial de cada término (orden importa poco aquí porque el diseño es ortogonal).</li>
<li>Con unidades codificadas los coeficientes son comparables entre sí: el diseño (0,886) y la curvatura (−1,208) son los más grandes.</li>
<li>Verifica también los supuestos de este modelo: <code>par(mfrow = c(2, 2)); plot(sr)</code> y <code>shapiro.test(residuals(sr))</code> (receta 6).</li></ul>`,
      fuente: [{ id: "C8.1", loc: "slides 24–26, 37–39" }, { id: "PC3", loc: "pág. 2 (rúbrica)" }]
    },

    {
      id: "r-p3-09-optimo", modulo: R, tema: T,
      titulo: "9 · Encontrar la combinación óptima dentro de la región (derivada y grilla)",
      descripcion: "Dos formas que deben coincidir: (a) derivar el modelo respecto de x3 para cada combinación de A y B (pendiente b1 + 2 b2 x, C8.1 s26) y (b) evaluar el modelo en una grilla fina de x3 ∈ [−1, 1] con predict y quedarse con el máximo. Al final se vuelve a unidades reales." + SIM,
      aviso: "<code>predict(…, newdata = )</code> se usó en clases (6.1–6.2); <code>seq</code>, <code>which.max</code>, <code>max</code>/<code>min</code> no aparecen en los scripts del curso.",
      funciones: ["coef", "predict", "seq", "rep", "which.max"],
      codigo: BASE + CODIF + `sr <- lm(distancia ~ x1 + x2 + x3 + x1:x2 + x1:x3 + x2:x3 + I(x3^2), data = datos)
b <- coef(sr)

# (a) Derivada respecto de x3 = 0  ->  x3* = -(pendiente lineal) / (2 * b33)
for (a1 in c(-1, 1)) for (a2 in c(-1, 1)) {
  lineal <- b["x3"] + b["x1:x3"] * a1 + b["x2:x3"] * a2
  x3opt  <- -lineal / (2 * b["I(x3^2)"])
  x3opt  <- max(-1, min(1, x3opt))             # no salir de la región [-1, 1]
  cat("x1 =", a1, " x2 =", a2, " x3* =", round(x3opt, 3), "\\n")
}

# (b) Grilla: 4 combinaciones de A y B x 201 valores de x3
grilla <- data.frame(x1 = rep(c(-1, 1), each = 402),
                     x2 = rep(rep(c(-1, 1), each = 201), times = 2),
                     x3 = rep(seq(-1, 1, by = 0.01), times = 4))
grilla$pred <- predict(sr, newdata = grilla)
grilla[which.max(grilla$pred), ]

# Volver a unidades reales: valor = centro + x * paso
1 + 0.48 * 1                                    # masa óptima en gramos`,
      salida: `x1 = -1  x2 = -1  x3* = 0.066
x1 = -1  x2 = 1  x3* = 0.479
x1 = 1  x2 = -1  x3* = -0.079
x1 = 1  x2 = 1  x3* = 0.334
    x1 x2   x3     pred
350 -1  1 0.48 8.438711
[1] 1.48`,
      ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
      lectura: String.raw`<ul>
<li>Para cada combinación de papel y diseño el modelo es una parábola en $x_3$: $\hat y=\text{cte}+(b_3+b_{13}x_1+b_{23}x_2)\,x_3+b_{33}x_3^2$. Su vértice está en $x_3^*=-\dfrac{b_3+b_{13}x_1+b_{23}x_2}{2\,b_{33}}$ (pendiente $=0$, como en C8.1 s26).</li>
<li>Como $b_{33}<0$, el vértice es un <strong>máximo</strong>. Si $x_3^*$ cae fuera de $[-1,1]$, el óptimo está en el borde (no se extrapola: C8.1 s26).</li>
<li>Mejor combinación: $x_1=-1$ (Bond), $x_2=1$ (Planeador), $x_3^*=0{,}479$ ⇒ <strong>masa $\approx1{,}48$ g</strong>, con distancia predicha $8{,}44$ m. La grilla confirma el mismo punto.</li>
<li>Para <strong>minimizar</strong> usa <code>which.min</code> (y el vértice será mínimo si $b_{33}>0$).</li>
<li>Si en tu experimento C tiene niveles 10, 20 y 30, el centro es 20 y el paso 10: $\text{real}=20+10\,x_3$.</li></ul>`,
      fuente: [{ id: "C8.1", loc: "slides 24–26" }, { id: "PC3", loc: "pág. 1" }]
    },

    {
      id: "r-p3-10-grafico-superficie", modulo: R, tema: T,
      titulo: "10 · Gráfico de la superficie de respuesta (curvas por combinación) y del óptimo",
      descripcion: "Como dos factores son cualitativos de 2 niveles, la «superficie» son 4 curvas de Y vs el factor cuantitativo, una por combinación de A y B, con las medias observadas encima. Solo gráfico. Antes, corre la receta 9 (crea sr y grilla).",
      aviso: "<code>lines</code>, <code>points</code> con colores y <code>legend</code> no aparecen en los scripts de clase; sirven para rotular el gráfico del informe.",
      funciones: ["plot", "lines", "points", "legend", "abline"],
      codigo: `colores <- c("red", "blue", "darkgreen", "orange")
etiq <- c("Bond-Dardo", "Bond-Planeador", "Reciclado-Dardo", "Reciclado-Planeador")
combos <- list(c(-1, -1), c(-1, 1), c(1, -1), c(1, 1))

plot(NA, xlim = c(0, 2), ylim = range(datos$distancia),
     xlab = "Masa en la nariz (g)", ylab = "Distancia (m)",
     main = "Superficie de respuesta ajustada")
for (i in 1:4) {
  g <- grilla[grilla$x1 == combos[[i]][1] & grilla$x2 == combos[[i]][2], ]
  lines(1 + g$x3, g$pred, col = colores[i], lwd = 2)          # curva del modelo
  d <- datos[datos$x1 == combos[[i]][1] & datos$x2 == combos[[i]][2], ]
  points(d$masa, d$distancia, col = colores[i], pch = 19)      # datos observados
}
abline(v = 1.48, lty = 2)                                      # masa óptima
legend("bottomright", legend = etiq, col = colores, lwd = 2, cex = 0.8)`,
      lectura: String.raw`<ul>
<li>Cada curva es la parábola ajustada para una combinación de papel y diseño; los puntos son los datos. Si los puntos quedan lejos de su curva, el modelo no ajusta bien esa combinación.</li>
<li>Las curvas no son paralelas: eso es la interacción $x_2x_3$ (y $x_1x_3$) en lenguaje de superficie.</li>
<li>La línea punteada marca el óptimo dentro de la región ($1{,}48$ g); el máximo global es el de la curva Bond-Planeador.</li>
<li>Si el factor cuantitativo fueran <em>dos</em> (por ejemplo, en otro diseño), la superficie se dibuja con curvas de nivel; con un solo factor cuantitativo bastan estas curvas.</li></ul>`,
      fuente: [{ id: "C8.1", loc: "slides 24–26" }]
    },

    {
      id: "r-p3-11-confirmacion", modulo: R, tema: T,
      titulo: "11 · Corridas de confirmación en el punto óptimo: predicción vs lo observado",
      descripcion: "Se hacen 3 corridas adicionales en la combinación óptima (en unidades reales) y se comparan con lo que predice el modelo: intervalo de predicción e intervalo de confianza para la media, y una prueba t de una muestra contra el valor predicho (M05). Los 3 valores de confirmación también son simulados." + SIM,
      aviso: "<code>predict(…, interval = \"prediction\" | \"confidence\")</code> no se vio en clases (sí <code>predict</code> y <code>t.test</code>).",
      funciones: ["predict", "t.test", "mean"],
      codigo: BASE + CODIF + `sr <- lm(distancia ~ x1 + x2 + x3 + x1:x2 + x1:x3 + x2:x3 + I(x3^2), data = datos)

optimo <- data.frame(x1 = -1, x2 = 1, x3 = 0.48)      # Bond, Planeador, 1,48 g
predict(sr, newdata = optimo, interval = "prediction") # dónde debería caer 1 corrida
predict(sr, newdata = optimo, interval = "confidence") # dónde debería estar la media

confirmacion <- c(8.6, 8.2, 8.5)                      # 3 corridas medidas en el óptimo
mean(confirmacion)
t.test(confirmacion, mu = 8.4387)                     # H0: media real = valor predicho`,
      salida: `       fit      lwr      upr
1 8.438711 7.730024 9.147398
       fit      lwr      upr
1 8.438711 8.172908 8.704515
[1] 8.433333

	One Sample t-test

data:  confirmacion
t = -0.044653, df = 2, p-value = 0.9684
alternative hypothesis: true mean is not equal to 8.4387
95 percent confidence interval:
 7.916219 8.950448
sample estimates:
mean of x
 8.433333`,
      ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
      lectura: String.raw`<ul>
<li><code>fit 8.44</code>: distancia predicha en el óptimo. Intervalo de <strong>predicción</strong> $[7{,}73;\ 9{,}15]$: rango para <em>una</em> corrida nueva. Intervalo de <strong>confianza</strong> $[8{,}17;\ 8{,}70]$: rango para la respuesta media.</li>
<li>Las 3 corridas (8,6; 8,2; 8,5) caen dentro del intervalo de predicción y su media (8,43) dentro del de confianza ⇒ <strong>el óptimo se confirma</strong>.</li>
<li><code>t.test</code>: $t=-0{,}045$, $p=0{,}968>0{,}05$ ⇒ no hay evidencia de que la media real en el óptimo difiera de la predicha. (Con solo 3 datos la prueba tiene poca potencia: apóyate sobre todo en los intervalos.)</li>
<li>Si las corridas caen fuera, el modelo no predice bien en esa zona: repórtalo como limitación (posible falta de ajuste, factor no controlado, cambio de condiciones).</li>
<li>Recuerda hacer las 3 corridas en orden aleatorio intercaladas o en un mismo momento, y documentarlas con foto/video como el resto.</li></ul>`,
      fuente: [{ id: "PC3", loc: "pág. 1" }, { id: "C8.1", loc: "slides 17–18" }, { id: "C2", loc: "prueba t de una muestra" }]
    }
  ]);
})();
