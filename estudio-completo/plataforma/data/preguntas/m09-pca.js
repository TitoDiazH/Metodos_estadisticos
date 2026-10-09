/* ============================================================================
   Preguntas · M09 Análisis de Componentes Principales (P1)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m09-pca";

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m09-q001", modulo: MOD, concepto: "m09-c01", tipo: "vf", dificultad: 1, origen: "nueva",
      enunciado: "PCA reduce la dimensión eliminando las variables menos importantes y conservando las originales más relevantes.",
      correcta: false,
      explicacion: "Falso. PCA no elimina variables: crea componentes nuevos, cada uno una combinación lineal de TODAS las variables originales. Se reduce la dimensión al quedarse con pocos componentes, no con pocas variables.",
      fuente: [{ id: "C3", loc: "slides 2–7" }]
    },
    {
      id: "m09-q002", modulo: MOD, concepto: "m09-c01", tipo: "multiple", dificultad: 2, origen: "nueva",
      enunciado: "¿Cuáles afirmaciones sobre las limitaciones de PCA son correctas?",
      opciones: [
        "No garantiza que cada componente sea interpretable",
        "Solo captura relaciones lineales",
        "Es un modelo predictivo de una variable respuesta",
        "Los componentes están ordenados por varianza explicada y son ortogonales entre sí"
      ],
      correcta: [0, 1, 3],
      explicacion: "PCA es lineal, no siempre interpretable, y sus componentes son ortogonales y ordenados por varianza. No es un modelo predictivo: no tiene variable respuesta.",
      fuente: [{ id: "C3", loc: "slides 6–7" }]
    },
    {
      id: "m09-q003", modulo: MOD, concepto: "m09-c02", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: "En PCA, ¿qué representa el autovalor λ de un componente?",
      opciones: [
        "La varianza de los datos en la dirección de ese componente",
        "El número de variables que lo forman",
        "La media de los datos proyectados",
        "El signo del componente"
      ],
      correcta: 0,
      explicacion: "Sv = λv: el autovector v es la dirección y el autovalor λ la varianza explicada en esa dirección.",
      fuente: [{ id: "C3", loc: "slides 8–12" }]
    },
    {
      id: "m09-q004", modulo: MOD, concepto: "m09-c02", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "¿Por qué hay que centrar los datos antes de calcular los componentes principales?",
      opciones: [
        "Si no se centran, el primer componente tiende a apuntar hacia la media y no hacia la dirección de máxima variación",
        "Para que los autovalores sean enteros",
        "Para que las variables queden con varianza 1",
        "Para que los componentes no sean ortogonales"
      ],
      correcta: 0,
      explicacion: "PCA busca la dirección de máxima VARIACIÓN alrededor de la media; sin centrar, la nube lejos del origen hace que PC1 apunte hacia ella. Centrar no cambia varianzas (eso lo hace estandarizar).",
      distractores: ["", "No tiene que ver con enteros.", "Eso es estandarizar, no centrar.", "La ortogonalidad viene de que S es simétrica."],
      fuente: [{ id: "C3", loc: "slides 9–10" }]
    },
    {
      id: "m09-q005", modulo: MOD, concepto: "m09-c02", tipo: "calculo", dificultad: 2, origen: "nueva",
      enunciado: String.raw`Una matriz de correlación de dos variables es $R=\begin{pmatrix}1&0{,}8\\0{,}8&1\end{pmatrix}$. Calcula su mayor autovalor $\lambda_1$.`,
      respuesta: 1.8, tolerancia: 0.005,
      explicacion: String.raw`$|R-\lambda I|=(1-\lambda)^2-0{,}64=0\Rightarrow\lambda=1\pm0{,}8$, o sea $\lambda_1=1{,}8$ y $\lambda_2=0{,}2$. Su suma es $2=p$ (traza de $R$). PC1 explica $1{,}8/2=90\,\%$ de la variación.`,
      verifica: [{ que: "λ1", r: `cat(max(eigen(matrix(c(1,.8,.8,1),2))$values))`, esperado: 1.8, tol: 1e-9 }],
      fuente: [{ id: "C3", loc: "slides 10–12" }]
    },
    {
      id: "m09-q006", modulo: MOD, concepto: "m09-c02", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "El segundo componente principal es ortogonal al primero porque la matriz de covarianza S es simétrica.",
      correcta: true,
      explicacion: "Verdadero. Los autovectores de una matriz simétrica asociados a autovalores distintos son ortogonales; por eso los componentes no están correlacionados entre sí.",
      fuente: [{ id: "C3", loc: "slides 10–12" }]
    },
    {
      id: "m09-q007", modulo: MOD, concepto: "m09-c03", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: "En la salida de prcomp, ¿qué es pca$x y qué es pca$rotation?",
      opciones: [
        "x son los scores (coordenadas de las observaciones) y rotation los loadings (pesos de las variables)",
        "x son los loadings y rotation los scores",
        "Ambos son las desviaciones estándar",
        "x es la varianza explicada y rotation el número de componentes"
      ],
      correcta: 0,
      explicacion: "pca$rotation: matriz de loadings (cada columna es un componente). pca$x: scores = datos centrados × loadings.",
      fuente: [{ id: "C3", loc: "slides 13–14, 25" }]
    },
    {
      id: "m09-q008", modulo: MOD, concepto: "m09-c03", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C3", loc: "slide 14" }],
      enunciado: String.raw`PC1 $=0{,}6\,z_1+0{,}8\,z_2$ está definido con variables estandarizadas. Una observación tiene $z_1=1{,}2$ y $z_2=-0{,}4$. Calcula su score en PC1.`,
      respuesta: 0.4, tolerancia: 0.005,
      explicacion: String.raw`$0{,}6\cdot1{,}2+0{,}8\cdot(-0{,}4)=0{,}72-0{,}32=0{,}40$. Si la observación viene en unidades originales, primero hay que estandarizar con la media y la sd de la muestra original.`,
      verifica: [{ que: "score", js: "0.6*1.2+0.8*(-0.4)", esperado: 0.4, tol: 1e-9 }],
      fuente: [{ id: "C3", loc: "slides 13–14" }]
    },
    {
      id: "m09-q009", modulo: MOD, concepto: "m09-c03", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "PC1 se definió con variables estandarizadas. Para calcular el score de un cliente nuevo, ¿qué se debe hacer?",
      opciones: [
        "Estandarizar sus valores con la media y la desviación de la muestra original y luego aplicar los loadings",
        "Reemplazar directamente sus valores originales en la expresión de PC1",
        "Dividir sus valores por el número de variables",
        "Restarle solo el valor máximo de cada variable"
      ],
      correcta: 0,
      explicacion: "La expresión de PC1 está en variables estandarizadas; usar valores crudos haría que dominara la variable de mayor escala.",
      fuente: [{ id: "AY2-E", loc: "P5(d)" }, { id: "AY2-P", loc: "P5(d)" }]
    },
    {
      id: "m09-q010", modulo: MOD, concepto: "m09-c04", tipo: "calculo", dificultad: 1, origen: "curso",
      enunciado: String.raw`<code>summary(prcomp(…))</code> muestra una desviación estándar de PC1 igual a $1{,}4617$. ¿Cuál es el autovalor de PC1?`,
      respuesta: 2.137, tolerancia: 0.005,
      explicacion: String.raw`El autovalor es el cuadrado de la desviación estándar: $\lambda_1=1{,}4617^2=2{,}137$.`,
      verifica: [{ que: "λ1", js: "1.4617*1.4617", esperado: 2.1366, tol: 0.0001 }],
      fuente: [{ id: "AY2-E", loc: "P5(a)" }, { id: "C3", loc: "slide 15" }]
    },
    {
      id: "m09-q011", modulo: MOD, concepto: "m09-c04", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C3", loc: "slide 15" }],
      enunciado: String.raw`Un PCA con 4 componentes tiene desviaciones estándar $2;\ 1{,}2;\ 0{,}8;\ 0{,}4$. ¿Qué proporción de la varianza total explica PC1?`,
      respuesta: 0.641, tolerancia: 0.003,
      explicacion: String.raw`Autovalores: $4;\ 1{,}44;\ 0{,}64;\ 0{,}16$; total $=6{,}24$. PC1 explica $4/6{,}24=0{,}641$ ($64{,}1\,\%$). Acumulado con 2 PC: $87{,}2\,\%$.`,
      verifica: [{ que: "proporción PC1", r: `l <- c(2,1.2,.8,.4)^2; cat(round(l[1]/sum(l), 4))`, esperado: 0.641, tol: 0.0005 }],
      fuente: [{ id: "C3", loc: "slide 15" }]
    },
    {
      id: "m09-q012", modulo: MOD, concepto: "m09-c04", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Se aplicó PCA estandarizado a 4 variables de delitos y población de los estados de EE. UU. (USArrests). Según la regla del 80 % acumulado, ¿cuántos componentes se conservan?",
      codigoR: `pca <- prcomp(USArrests, scale. = TRUE)
summary(pca)`,
      salidaR: `Importance of components:
                          PC1    PC2     PC3     PC4
Standard deviation     1.5749 0.9949 0.59713 0.41645
Proportion of Variance 0.6201 0.2474 0.08914 0.04336
Cumulative Proportion  0.6201 0.8675 0.95664 1.00000`,
      salidaDe: `pca <- prcomp(USArrests, scale. = TRUE)
print(summary(pca))`,
      opciones: ["2 componentes (acumulan 86,8 %)", "1 componente (62,0 %)", "3 componentes (95,7 %)", "4 componentes"],
      correcta: 0,
      explicacion: "El 80 % se supera por primera vez con PC2 (acumulado 0,8675); con solo PC1 se tiene 62,0 %. Para elegir el mínimo que alcance 80 %, son 2.",
      distractores: ["", "62 % no llega al 80 %.", "Con 2 ya se supera el 80 %; el tercero sobra bajo esa regla.", "Conservar todos no reduce la dimensión."],
      fuente: [{ id: "C3", loc: "slides 15, 20" }]
    },
    {
      id: "m09-q013", modulo: MOD, concepto: "m09-c04", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "En el mismo PCA de USArrests las desviaciones estándar son 1,5749; 0,9949; 0,5971 y 0,4165. Según el criterio de Kaiser (autovalor > 1), ¿cuántos componentes se conservan?",
      opciones: ["1", "2", "3", "4"],
      correcta: 0,
      explicacion: "Autovalores = sd²: 2,480; 0,990; 0,357; 0,173. Solo λ1 > 1 (λ2 = 0,990 queda justo bajo 1) ⇒ 1 componente. Nótese que Kaiser (1) y la regla del 80 % (2) pueden diferir: hay que justificar la elección.",
      verifica: [
        { que: "λ1", r: `cat(round(prcomp(USArrests, scale. = TRUE)$sdev[1]^2, 3))`, esperado: 2.48, tol: 0.0005 },
        { que: "λ2", r: `cat(round(prcomp(USArrests, scale. = TRUE)$sdev[2]^2, 3))`, esperado: 0.99, tol: 0.0005 }
      ],
      fuente: [{ id: "C3", loc: "slide 15" }, { id: "AY2-E", loc: "P5(a)" }]
    },
    {
      id: "m09-q014", modulo: MOD, concepto: "m09-c04", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "El criterio de Kaiser (conservar componentes con autovalor > 1) es válido aunque las variables no se hayan estandarizado.",
      correcta: false,
      explicacion: "Falso. El umbral 1 corresponde a la matriz de correlación (datos estandarizados, donde cada variable aporta varianza 1). Con datos sin estandarizar, los autovalores dependen de las unidades y comparar con 1 no tiene sentido.",
      fuente: [{ id: "C3", loc: "slide 15" }]
    },
    {
      id: "m09-q015", modulo: MOD, concepto: "m09-c04", tipo: "multiple", dificultad: 1, origen: "curso",
      enunciado: "¿Cuáles son criterios para decidir cuántos componentes conservar?",
      opciones: [
        "Varianza acumulada de al menos 80 %",
        "Autovalor mayor que 1 (Kaiser) con datos estandarizados",
        "Codo del scree plot",
        "Elegir siempre los dos primeros"
      ],
      correcta: [0, 1, 2],
      explicacion: "La clase presenta tres criterios: 80 % acumulado, Kaiser y el codo del gráfico de sedimentación. No hay una regla fija de «siempre dos».",
      fuente: [{ id: "C3", loc: "slide 15" }, { id: "C4.2", loc: "slides 4–5" }]
    },
    {
      id: "m09-q016", modulo: MOD, concepto: "m09-c05", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Ejemplo de la clase: $X=\begin{pmatrix}2&0\\0&2\\3&3\end{pmatrix}$. La matriz de covarianza es $S=\begin{pmatrix}2{,}333&0{,}333\\0{,}333&2{,}333\end{pmatrix}$. ¿Cuál es el mayor autovalor?`,
      respuesta: 2.667, tolerancia: 0.005,
      explicacion: String.raw`Para una matriz $\begin{pmatrix}a&b\\b&a\end{pmatrix}$ los autovalores son $a\pm b$: $2{,}333+0{,}333=2{,}667$ (PC1, dirección $(1,1)/\sqrt2$) y $2{,}333-0{,}333=2$ (PC2).`,
      verifica: [{ que: "λ1", r: `cat(round(eigen(cov(matrix(c(2,0,0,2,3,3),3,byrow=TRUE)))$values[1], 4))`, esperado: 2.6667, tol: 0.00005 }],
      fuente: [{ id: "C3", loc: "slides 16–18" }]
    },
    {
      id: "m09-q017", modulo: MOD, concepto: "m09-c05", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`En el mismo ejemplo ($\lambda_1=2{,}667$ y $\lambda_2=2$), ¿qué proporción de la variabilidad total explica PC1?`,
      respuesta: 0.5714, tolerancia: 0.002,
      explicacion: String.raw`$\dfrac{2{,}667}{2{,}667+2}=0{,}571$ ($57\,\%$). Los dos autovalores son parecidos: PCA no logra una reducción fuerte porque las variables casi no están correlacionadas (cor $=0{,}14$).`,
      verifica: [{ que: "proporción", js: "(8/3)/(8/3+2)", esperado: 0.5714, tol: 0.0001 }],
      fuente: [{ id: "C3", loc: "slides 16–18" }]
    },
    {
      id: "m09-q018", modulo: MOD, concepto: "m09-c05", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C3", loc: "slide 16" }],
      enunciado: String.raw`Dos variables tienen $n=5$ observaciones: $x=(4,2,3,6,5)$. Al centrar, ¿cuál es el valor centrado del cuarto dato ($6$)?`,
      respuesta: 2, tolerancia: 0.001,
      explicacion: String.raw`$\bar x=20/5=4$, así que los datos centrados son $(0,-2,-1,2,1)$ y el cuarto vale $2$. Centrar resta la media; no cambia la varianza.`,
      verifica: [{ que: "dato centrado", r: `x <- c(4,2,3,6,5); cat(x[4] - mean(x))`, esperado: 2, tol: 1e-9 }],
      fuente: [{ id: "C3", loc: "slides 9, 16" }]
    },
    {
      id: "m09-q019", modulo: MOD, concepto: "m09-c06", tipo: "completar-R", dificultad: 1, origen: "curso",
      enunciado: "Completa el código para hacer PCA con variables estandarizadas y ver la varianza explicada.",
      codigoR: `pca <- ___(mtcars, scale. = ___)
___(pca)`,
      huecos: [["prcomp"], ["TRUE", "T"], ["summary"]],
      explicacion: String.raw`<code>prcomp(datos, scale. = TRUE)</code> centra y estandariza; <code>summary(pca)</code> entrega desviaciones estándar, proporción de varianza y proporción acumulada.`,
      fuente: [{ id: "C3", loc: "slides 19–20" }]
    },
    {
      id: "m09-q020", modulo: MOD, concepto: "m09-c06", tipo: "interpretacion-R", dificultad: 3, origen: "nueva",
      enunciado: "Loadings de los dos primeros componentes de USArrests (estandarizado). ¿Cómo se interpreta PC2?",
      codigoR: `round(pca$rotation[, 1:2], 3)`,
      salidaR: `            PC1    PC2
Murder   -0.536 -0.418
Assault  -0.583 -0.188
UrbanPop -0.278  0.873
Rape     -0.543  0.167`,
      salidaDe: `pca <- prcomp(USArrests, scale. = TRUE)
round(pca$rotation[, 1:2], 3)`,
      opciones: [
        "PC2 está dominado por UrbanPop (0,873) en contraste con Murder (−0,418): distingue estados urbanos de estados con más asesinatos",
        "PC2 es un promedio de todas las variables, igual que PC1",
        "PC2 no tiene ninguna variable relevante",
        "UrbanPop no importa porque su loading en PC1 es pequeño"
      ],
      correcta: 0,
      explicacion: "Con la regla |loading| ≥ 0,30 relevante / ≥ 0,40 fuerte: en PC2 UrbanPop (0,873) y Murder (−0,418) son fuertes y de signo contrario. PC1 tiene todos los loadings negativos y parecidos (índice general de criminalidad), pero UrbanPop pesa mucho en PC2.",
      distractores: ["", "Los signos y tamaños de PC2 son distintos de los de PC1.", "UrbanPop y Murder superan 0,40.", "Que sea poco relevante en un componente no implica que no lo sea en otro."],
      fuente: [{ id: "C3", loc: "slides 22–24" }]
    },
    {
      id: "m09-q021", modulo: MOD, concepto: "m09-c06", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "PCA estandarizado de mtcars (11 variables). ¿Qué porcentaje acumulado de la varianza explican los dos primeros componentes?",
      codigoR: `summary(prcomp(mtcars, scale. = TRUE))`,
      salidaR: `Importance of components:
                          PC1    PC2     PC3
Standard deviation     2.5707 1.6280 0.79196
Proportion of Variance 0.6008 0.2409 0.05702
Cumulative Proportion  0.6008 0.8417 0.89873`,
      salidaDe: `x <- summary(prcomp(mtcars, scale. = TRUE))
x$importance <- x$importance[, 1:3]
print(x)`,
      opciones: ["84,2 %", "60,1 %", "24,1 %", "89,9 %"],
      correcta: 0,
      explicacion: "Cumulative Proportion de PC2 = 0,8417: 84,2 % (60,1 % de PC1 + 24,1 % de PC2). El 89,9 % es con tres componentes.",
      distractores: ["", "Es solo PC1.", "Es solo PC2.", "Es con tres componentes."],
      fuente: [{ id: "C3", loc: "slides 20–21" }]
    },
    {
      id: "m09-q022", modulo: MOD, concepto: "m09-c06", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "En PC1 de un PCA, la variable mpg tiene un loading de −0,45. ¿Cómo se interpreta?",
      opciones: [
        "mpg es una variable fuerte en PC1, con relación negativa (en dirección opuesta a las de loading positivo)",
        "mpg no es relevante en PC1",
        "mpg tiene varianza negativa",
        "Es un error: los loadings no pueden ser negativos"
      ],
      correcta: 0,
      explicacion: "|−0,45| ≥ 0,40 ⇒ variable fuerte; el signo indica el sentido. Además el signo global de un componente es arbitrario: lo que importa son los signos relativos entre variables.",
      fuente: [{ id: "C3", loc: "slide 22" }]
    },
    {
      id: "m09-q023", modulo: MOD, concepto: "m09-c06", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Si se invierte el signo de todos los loadings de un componente (y de sus scores), se obtiene un PCA distinto con otra varianza explicada.",
      correcta: false,
      explicacion: "Falso. El signo de un autovector es arbitrario: v y −v describen la misma dirección y la misma varianza explicada. Por eso distintas versiones de R o de software pueden entregar signos opuestos sin que cambie nada esencial.",
      fuente: [{ id: "C3", loc: "slides 22–25" }]
    },
    {
      id: "m09-q024", modulo: MOD, concepto: "m09-c06", tipo: "codigo-R", dificultad: 2, origen: "nueva",
      enunciado: "Un analista aplica PCA a mtcars, cuyas variables tienen unidades y escalas muy distintas (disp en cientos, wt en unidades). ¿Qué problema tiene este código?",
      codigoR: `pca <- prcomp(mtcars)
summary(pca)`,
      opciones: [
        "No usa scale. = TRUE: las variables de mayor escala (disp, hp) dominan los componentes y PC1 explica un 92,7 % engañoso",
        "prcomp no admite data frames",
        "Falta calcular antes la matriz de covarianza con cov()",
        "No hay problema: prcomp siempre estandariza"
      ],
      correcta: 0,
      explicacion: "Por defecto prcomp solo CENTRA (scale. = FALSE). Con unidades distintas hay que usar scale. = TRUE; sin él PC1 explica 92,7 % solo porque disp y hp tienen varianzas enormes, frente a 60,1 % del PCA estandarizado.",
      verifica: [
        { que: "% PC1 sin estandarizar", r: `cat(round(summary(prcomp(mtcars))$importance[2, 1], 3))`, esperado: 0.927, tol: 0.0005 },
        { que: "% PC1 estandarizado", r: `cat(round(summary(prcomp(mtcars, scale. = TRUE))$importance[2, 1], 3))`, esperado: 0.601, tol: 0.0005 }
      ],
      fuente: [{ id: "C3", loc: "slide 20" }]
    }
  ]);
})();
