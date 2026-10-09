/* Laboratorio R · QDA, Naive Bayes y validación (M16, P2) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m16-qda-boxm", modulo: "m16-qda-nb-validacion", tema: "QDA",
    titulo: "Box's M (a mano) y QDA con el Banco de Ademuz",
    descripcion: "C6.2 slides 4–5. El paquete biotools no está instalado aquí, así que Box's M se calcula con su fórmula y se compara con la salida de la slide (χ² = 0,8035; gl = 3; p = 0,8486).",
    funciones: ["cov", "det", "log", "qda", "predict", "table"],
    codigo: `library(MASS)
datos <- data.frame(
  patrimonio = c(1.3,3.7,5,5.9,7.1,4,7.9,5.1, 5.2,9.8,9,12,6.3,8.7,11.1,9.9),
  deuda      = c(4.1,6.9,3,6.5,5.4,2.7,7.6,3.8, 1,4.2,4.8,2,5.2,1.1,4.1,1.6),
  grupo      = factor(c(rep("Fallido", 8), rep("Cumplidor", 8))))
g <- split(datos[, 1:2], datos$grupo)
n <- sapply(g, nrow); S <- lapply(g, cov); p <- 2; K <- 2
Sp <- Reduce("+", Map(function(s, ni) (ni - 1) * s, S, n)) / (sum(n) - K)
M <- (sum(n) - K) * log(det(Sp)) - sum(sapply(1:K, function(i) (n[i] - 1) * log(det(S[[i]]))))
corr <- 1 - (sum(1 / (n - 1)) - 1 / (sum(n) - K)) * (2*p^2 + 3*p - 1) / (6 * (p + 1) * (K - 1))
chi <- M * corr; gl <- p * (p + 1) * (K - 1) / 2
c(chisq = chi, gl = gl, p_valor = 1 - pchisq(chi, gl))

modelo_qda <- qda(grupo ~ patrimonio + deuda, data = datos)
pred_qda <- predict(modelo_qda, datos)
tabla_qda <- table(Real = datos$grupo, Predicho = pred_qda$class)
tabla_qda
sum(diag(tabla_qda)) / sum(tabla_qda)`,
    salida: `    chisq        gl   p_valor
0.8034966 3.0000000 0.8486305
           Predicho
Real        Cumplidor Fallido
  Cumplidor         7       1
  Fallido           0       8
[1] 0.9375`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>Box's M da $\chi^2=0{,}8035$, $3$ gl y $p=0{,}8486$ (igual que la slide 4): no se rechaza ⇒ LDA. El QDA clasifica igual que el LDA: confusión $7,1,0,8$ y accuracy $0{,}9375$.</p>`,
    fuente: [{ id: "C6.2", loc: "slides 4–5" }]
  },
  {
    id: "r-m16-nb", modulo: "m16-qda-nb-validacion", tema: "Naive Bayes",
    titulo: "Naive Bayes gaussiano (Ademuz) y categórico (AY6 P1) con e1071",
    descripcion: "C6.2 slide 14 y Ayudantía 6 P1: priors, tablas de verosimilitud y posterior del cliente nuevo.",
    funciones: ["naiveBayes", "predict", "factor"],
    codigo: `library(e1071)
datos <- data.frame(
  patrimonio = c(1.3,3.7,5,5.9,7.1,4,7.9,5.1, 5.2,9.8,9,12,6.3,8.7,11.1,9.9),
  deuda      = c(4.1,6.9,3,6.5,5.4,2.7,7.6,3.8, 1,4.2,4.8,2,5.2,1.1,4.1,1.6),
  grupo      = factor(c(rep("Fallido", 8), rep("Cumplidor", 8))))
modelo_nb <- naiveBayes(grupo ~ patrimonio + deuda, data = datos)
modelo_nb$apriori
table(Real = datos$grupo, Predicho = predict(modelo_nb, datos))
predict(modelo_nb, data.frame(patrimonio = 7, deuda = 4), type = "raw")

clientes <- data.frame(
  plan = c("Basico","Basico","Basico","Premium","Basico","Basico","Premium","Premium","Premium","Basico","Premium","Premium","Basico","Premium"),
  reclamo = c("Si","Si","No","Si","Si","No","No","No","Si","No","No","No","No","Si"),
  antig = c("Nuevo","Nuevo","Nuevo","Nuevo","Antiguo","Antiguo","Antiguo","Nuevo","Antiguo","Antiguo","Antiguo","Nuevo","Antiguo","Antiguo"),
  abandona = c(rep("Si", 5), rep("No", 9)), stringsAsFactors = TRUE)
m2 <- naiveBayes(abandona ~ plan + reclamo + antig, data = clientes)
nuevo <- data.frame(plan = factor("Basico", levels = levels(clientes$plan)),
                    reclamo = factor("Si", levels = levels(clientes$reclamo)),
                    antig = factor("Antiguo", levels = levels(clientes$antig)))
predict(m2, nuevo, type = "raw")`,
    salida: `Y
Cumplidor   Fallido
        8         8
           Predicho
Real        Cumplidor Fallido
  Cumplidor         7       1
  Fallido           0       8
     Cumplidor   Fallido
[1,] 0.5075953 0.4924047
            No        Si
[1,] 0.4475703 0.5524297`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul><li>Ademuz: priors $0{,}5/0{,}5$ y confusión $7,1,0,8$ (accuracy $0{,}9375$). El cliente $(7,4)$ queda como <strong>Cumplidor</strong>, tal como en la slide 11.</li><li>AY6 P1: $P(\text{Sí}\mid x)=0{,}5524$ (la pauta a mano da $0{,}554$ por redondear los scores).</li></ul>`,
    fuente: [{ id: "C6.2", loc: "slide 14" }, { id: "AY6-P", loc: "P1" }]
  },
  {
    id: "r-m16-loo", modulo: "m16-qda-nb-validacion", tema: "Validación",
    titulo: "Validación cruzada Leave-One-Out con lda(CV = TRUE)",
    descripcion: "C6.2 slide 20: la exactitud LOO es menor que la de entrenamiento.",
    funciones: ["lda", "table", "which"],
    codigo: `library(MASS)
datos <- data.frame(
  patrimonio = c(1.3,3.7,5,5.9,7.1,4,7.9,5.1, 5.2,9.8,9,12,6.3,8.7,11.1,9.9),
  deuda      = c(4.1,6.9,3,6.5,5.4,2.7,7.6,3.8, 1,4.2,4.8,2,5.2,1.1,4.1,1.6),
  grupo      = factor(c(rep("Fallido", 8), rep("Cumplidor", 8))))
modelo_loo <- lda(grupo ~ patrimonio + deuda, data = datos, CV = TRUE)
tabla_loo <- table(Real = datos$grupo, Predicho = modelo_loo$class)
tabla_loo
sum(diag(tabla_loo)) / sum(tabla_loo)
which(modelo_loo$class != datos$grupo)`,
    salida: `           Predicho
Real        Cumplidor Fallido
  Cumplidor         6       2
  Fallido           0       8
[1] 0.875
[1]  9 13`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>LOO: $14/16=0{,}875$ (vs. $0{,}9375$ de entrenamiento). Los clientes mal clasificados son el 9 y el 13.</p>`,
    fuente: [{ id: "C6.2", loc: "slide 20" }]
  }
]);
