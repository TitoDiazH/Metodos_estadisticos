/* ============================================================================
   Preguntas · M10 Análisis factorial (P1)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m10-analisis-factorial";
  var A_MAT = `A <- matrix(c(.8, .2,   .7, .3,   .6, .3,
              .2, .8,   .15, .82, .25, .85), 6, byrow = TRUE)
rownames(A) <- c("Ma", "Fi", "Qu", "In", "Hi", "Di")
`;

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m10-q001", modulo: MOD, concepto: "m10-c01", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: "En el análisis factorial, ¿qué papel cumplen las variables observadas?",
      opciones: [
        "Todas cumplen el mismo papel: no hay una variable dependiente",
        "Una es la dependiente y las demás explicativas",
        "Solo se usan las variables con mayor varianza",
        "Las variables se descartan si no pertenecen al primer factor"
      ],
      correcta: 0,
      explicacion: "C4.1 s3: no existe a priori una dependencia conceptual de unas variables sobre otras; el AF busca factores latentes que expliquen las correlaciones entre todas.",
      fuente: [{ id: "C4.1", loc: "slides 2–3" }]
    },
    {
      id: "m10-q002", modulo: MOD, concepto: "m10-c01", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Los factores del análisis factorial son variables que existen y se miden directamente, igual que las variables originales.",
      correcta: false,
      explicacion: "Falso. Los factores son latentes (no observados): lo que existe es una combinación lineal de las variables observadas que se interpreta como una dimensión subyacente.",
      fuente: [{ id: "C4.1", loc: "slides 2, 9" }]
    },
    {
      id: "m10-q003", modulo: MOD, concepto: "m10-c02", tipo: "calculo", dificultad: 1, origen: "variacion",
      base: [{ id: "C4.1", loc: "slide 6" }],
      enunciado: String.raw`Dos ítems tienen correlación $r=0{,}70$. ¿Qué proporción de su varianza comparten?`,
      respuesta: 0.49, tolerancia: 0.005,
      explicacion: String.raw`La varianza compartida es $r^2=0{,}70^2=0{,}49$ ($49\,\%$); el $51\,\%$ restante no es compartido.`,
      verifica: [{ que: "r²", js: "0.7*0.7", esperado: 0.49, tol: 1e-9 }],
      fuente: [{ id: "C4.1", loc: "slide 6" }]
    },
    {
      id: "m10-q004", modulo: MOD, concepto: "m10-c02", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "¿Qué se coloca en la diagonal de la matriz de correlaciones en cada enfoque de extracción?",
      opciones: [
        "Componentes principales: unos · Factores comunes: comunalidades",
        "Componentes principales: comunalidades · Factores comunes: unos",
        "Ambos: unos",
        "Ambos: ceros"
      ],
      correcta: 0,
      explicacion: "Componentes principales analiza TODA la varianza (unos en la diagonal); factores comunes analiza solo la varianza común, así que reemplaza los unos por comunalidades.",
      fuente: [{ id: "C4.1", loc: "slide 8" }]
    },
    {
      id: "m10-q005", modulo: MOD, concepto: "m10-c03", tipo: "calculo", dificultad: 1, origen: "variacion",
      base: [{ id: "C4.1", loc: "slides 13–14" }],
      enunciado: String.raw`Una variable estandarizada tiene cargas $0{,}7$ y $0{,}4$ en dos factores ortogonales. Calcula su comunalidad $h^2$.`,
      respuesta: 0.65, tolerancia: 0.005,
      explicacion: String.raw`$h^2=0{,}7^2+0{,}4^2=0{,}49+0{,}16=0{,}65$. Su especificidad es $\psi=1-0{,}65=0{,}35$.`,
      verifica: [{ que: "h²", js: "0.7*0.7+0.4*0.4", esperado: 0.65, tol: 1e-9 }],
      fuente: [{ id: "C4.1", loc: "slides 13–14" }]
    },
    {
      id: "m10-q006", modulo: MOD, concepto: "m10-c03", tipo: "calculo", dificultad: 1, origen: "curso",
      enunciado: String.raw`Pauta de la Prueba 2 (3.2): la comunalidad de «Imagen del fabricante» es $0{,}88$. ¿Cuál es su especificidad?`,
      respuesta: 0.12, tolerancia: 0.002,
      explicacion: String.raw`$\psi=1-h^2=1-0{,}88=0{,}12$: los factores explican el $88\,\%$ de su varianza y el $12\,\%$ es específica.`,
      verifica: [{ que: "ψ", js: "1-0.88", esperado: 0.12, tol: 1e-9 }],
      fuente: [{ id: "PR-P2-Q3", loc: "pregunta 3.2" }]
    },
    {
      id: "m10-q007", modulo: MOD, concepto: "m10-c03", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`C4.1 s13–14: Dibujo tiene cargas $0{,}25$ y $0{,}85$. ¿Qué porcentaje de su varianza explican los dos factores?`,
      respuesta: 78.5, tolerancia: 0.1, unidad: "%",
      explicacion: String.raw`$h^2=0{,}25^2+0{,}85^2=0{,}0625+0{,}7225=0{,}785$: $78{,}5\,\%$. El $21{,}5\,\%$ restante es específica.`,
      verifica: [{ que: "h²", js: "(0.25*0.25+0.85*0.85)*100", esperado: 78.5, tol: 1e-9 }],
      fuente: [{ id: "C4.1", loc: "slides 13–14" }]
    },
    {
      id: "m10-q008", modulo: MOD, concepto: "m10-c03", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Con la matriz de cargas A de 6 materias y 2 factores se calcularon comunalidad y especificidad. ¿Qué materia es la que MENOS explican los factores comunes?",
      codigoR: `h2 <- rowSums(A^2)
round(cbind(h2, psi = 1 - h2), 4)`,
      salidaR: `       h2    psi
Ma 0.6800 0.3200
Fi 0.5800 0.4200
Qu 0.4500 0.5500
In 0.6800 0.3200
Hi 0.6949 0.3051
Di 0.7850 0.2150`,
      salidaDe: A_MAT + `h2 <- rowSums(A^2)
round(cbind(h2, psi = 1 - h2), 4)`,
      opciones: ["Química (h² = 0,45; la mayor parte de su varianza es específica)", "Dibujo (h² = 0,785)", "Matemáticas (ψ = 0,32)", "Todas por igual"],
      correcta: 0,
      explicacion: "La comunalidad más baja es la de Química (0,45): los factores explican solo el 45 % de su varianza y el 55 % es específica. Dibujo es la mejor explicada (0,785).",
      distractores: ["", "Es la mejor explicada.", "Su ψ = 0,32 es de las más bajas.", "Las comunalidades son distintas."],
      fuente: [{ id: "C4.1", loc: "slides 13–14" }]
    },
    {
      id: "m10-q009", modulo: MOD, concepto: "m10-c04", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "Al aplicar KMO a los datos se obtiene «Overall MSA = 0,35». ¿Qué se concluye?",
      opciones: [
        "Los datos no son adecuados para un análisis factorial (KMO < 0,5)",
        "Los datos son excelentes para un análisis factorial",
        "Hay que usar rotación oblicua",
        "Hay que aumentar el número de factores"
      ],
      correcta: 0,
      explicacion: "KMO ≥ 0,75 bien; ≥ 0,5 aceptable; < 0,5 inaceptable. Con 0,35 se deben revisar/eliminar variables poco correlacionadas (en la clase, al quitarlas el KMO subió a 0,61).",
      fuente: [{ id: "C4.1", loc: "slides 19–20" }]
    },
    {
      id: "m10-q010", modulo: MOD, concepto: "m10-c04", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Se aplicó KMO a USArrests estandarizado. ¿Qué se concluye sobre la adecuación para AF y sobre qué variable?",
      codigoR: `library(psych)
datos <- scale(USArrests)
KMO(datos)`,
      salidaR: `Kaiser-Meyer-Olkin factor adequacy
Call: KMO(r = datos)
Overall MSA =  0.65
MSA for each item = 
  Murder  Assault UrbanPop     Rape 
    0.62     0.64     0.50     0.78 `,
      salidaDe: `library(psych)
datos <- scale(USArrests)
print(KMO(datos))`,
      opciones: [
        "El KMO global 0,65 es aceptable (≥ 0,5); UrbanPop (0,50) es la variable más débil y Rape (0,78) la mejor",
        "El KMO global 0,65 es inaceptable (< 0,75)",
        "Los datos no sirven porque UrbanPop tiene MSA 0,50",
        "Rape debe eliminarse por tener el MSA más alto"
      ],
      correcta: 0,
      explicacion: "Overall MSA = 0,65 ≥ 0,5 (y > 0,6, criterio de C4.2): adecuado. Los MSA individuales van de 0,50 (UrbanPop, límite) a 0,78 (Rape). No se elimina una variable por tener MSA alto.",
      distractores: ["", "El umbral de inaceptable es < 0,5, no < 0,75.", "Un MSA individual de 0,50 está en el límite, pero lo que decide es el global.", "Un MSA alto es bueno."],
      fuente: [{ id: "C4.2", loc: "slides 15–16" }]
    },
    {
      id: "m10-q011", modulo: MOD, concepto: "m10-c04", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Test de Bartlett sobre USArrests estandarizado (n = 50). Con α = 0,05, ¿qué se concluye?",
      codigoR: `cortest.bartlett(cor(datos), n = nrow(datos))`,
      salidaR: `$chisq
[1] 88.28815

$p.value
[1] 6.868423e-17

$df
[1] 6
`,
      salidaDe: `datos <- scale(USArrests)
print(psych::cortest.bartlett(cor(datos), n = nrow(datos)))`,
      opciones: [
        "Se rechaza H₀: R no es la identidad; hay correlación suficiente para un AF",
        "No se rechaza H₀: las variables no están correlacionadas",
        "Se rechaza H₀: las variables son independientes",
        "El test es inválido porque falta el KMO"
      ],
      correcta: 0,
      explicacion: "p ≈ 7·10⁻¹⁷ < 0,05 ⇒ se rechaza H₀: R = I. Hay correlaciones y el AF tiene sentido. Se usa junto con el KMO, pero cada uno se interpreta por separado.",
      fuente: [{ id: "C4.2", loc: "slide 16" }, { id: "C4.1", loc: "slide 18" }]
    },
    {
      id: "m10-q012", modulo: MOD, concepto: "m10-c05", tipo: "calculo", dificultad: 1, origen: "variacion",
      base: [{ id: "C4.1", loc: "slide 22" }],
      enunciado: String.raw`Con $p=9$ variables, ¿cuál es el máximo número de factores $k$ según la restricción de grados de libertad $k\le(p-1)/2$?`,
      respuesta: 4, tolerancia: 0,
      explicacion: String.raw`$k\le(9-1)/2=4$. Con $p=4$ la regla da $k\le1{,}5$ (máximo 1 factor): pedir 2 factores genera el aviso <code>df of the model are -1</code>.`,
      verifica: [{ que: "k máx", js: "(9-1)/2", esperado: 4, tol: 0 }],
      fuente: [{ id: "C4.1", loc: "slide 22" }]
    },
    {
      id: "m10-q013", modulo: MOD, concepto: "m10-c05", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "La matriz de cargas A que resuelve el modelo factorial es única: no existe otra matriz que reproduzca igual la matriz de correlaciones.",
      correcta: false,
      explicacion: String.raw`Falso. Si $T$ es una matriz ortogonal ($TT'=I$), $A^*=AT$ también es solución, pues $A^*A^{*\prime}=AA'$. Esa no unicidad es lo que permite rotar los factores para facilitar la interpretación.`,
      fuente: [{ id: "C4.1", loc: "slide 24" }]
    },
    {
      id: "m10-q014", modulo: MOD, concepto: "m10-c05", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "En la extracción por máxima verosimilitud, la prueba χ² de bondad de ajuste contrasta H₀: Σ = AA′ + Ψ. Un p-valor de 0,40 indica que…",
      opciones: [
        "No se rechaza H₀: el modelo con ese número de factores se ajusta bien a los datos",
        "Se rechaza H₀: el modelo se ajusta mal",
        "Hay que agregar más factores obligatoriamente",
        "La rotación debe ser oblicua"
      ],
      correcta: 0,
      explicacion: "Aquí el buen resultado es NO rechazar: p > 0,05 ⇒ el modelo factorial con k factores es compatible con los datos. (Requiere normalidad multivariada.)",
      fuente: [{ id: "C4.1", loc: "slides 26–27" }]
    },
    {
      id: "m10-q015", modulo: MOD, concepto: "m10-c05", tipo: "multiple", dificultad: 2, origen: "nueva",
      enunciado: "¿Cuáles afirmaciones sobre los métodos de extracción son correctas?",
      opciones: [
        "Componentes principales siempre da solución y analiza toda la varianza",
        "Ejes principales reemplaza los unos por comunalidades y es iterativo",
        "Máxima verosimilitud supone normalidad multivariada",
        "Componentes principales está basado en el modelo factorial con factores únicos"
      ],
      correcta: [0, 1, 2],
      explicacion: "Componentes principales NO está basado en el modelo de AF (no modela la parte específica); los otros tres enunciados son ciertos.",
      fuente: [{ id: "C4.1", loc: "slides 25–27" }]
    },
    {
      id: "m10-q016", modulo: MOD, concepto: "m10-c06", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Pauta de la Prueba 2 (3.1): con 6 variables estandarizadas los dos primeros autovalores son $2{,}51349$ y $1{,}73952$. ¿Qué proporción de la varianza total explican los dos factores?`,
      respuesta: 0.7088, tolerancia: 0.003,
      explicacion: String.raw`Con datos estandarizados la varianza total es $p=6$. $\dfrac{2{,}51349+1{,}73952}{6}=0{,}7088\approx70{,}9\,\%$.`,
      verifica: [{ que: "proporción", js: "(2.51349+1.73952)/6", esperado: 0.7088, tol: 0.0001 }],
      fuente: [{ id: "PR-P2-Q3", loc: "pregunta 3.1" }]
    },
    {
      id: "m10-q017", modulo: MOD, concepto: "m10-c06", tipo: "multiple", dificultad: 1, origen: "curso",
      enunciado: "¿Cuáles son criterios para decidir cuántos factores conservar?",
      opciones: [
        "Criterio a priori (según la teoría)",
        "Kaiser: valores propios mayores que 1",
        "Porcentaje de varianza explicada (75–80 %)",
        "Análisis paralelo y scree plot",
        "Siempre tantos factores como variables"
      ],
      correcta: [0, 1, 2, 3],
      explicacion: "C4.2 s3–5: a priori, Kaiser, % de varianza, scree plot y análisis paralelo. Tantos factores como variables no reduce la dimensión.",
      fuente: [{ id: "C4.2", loc: "slides 3–5" }]
    },
    {
      id: "m10-q018", modulo: MOD, concepto: "m10-c06", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "¿Qué crítica se le hace a la regla de Kaiser para elegir el número de factores?",
      opciones: [
        "Tiende a subestimar el número real de factores",
        "Es demasiado subjetiva (interpretación visual)",
        "Depende de un porcentaje arbitrario",
        "Solo sirve con rotación oblicua"
      ],
      correcta: 0,
      explicacion: "C4.2 s4: Kaiser tiende a subestimar. La subjetividad es del scree plot y la arbitrariedad es del criterio de porcentaje de varianza.",
      fuente: [{ id: "C4.2", loc: "slide 4" }]
    },
    {
      id: "m10-q019", modulo: MOD, concepto: "m10-c06", tipo: "completar-R", dificultad: 1, origen: "curso",
      enunciado: "Completa el código para decidir el número de factores con análisis paralelo.",
      codigoR: `library(psych)
___(datos, fa = "fa")`,
      huecos: [["fa.parallel"]],
      explicacion: String.raw`<code>fa.parallel(datos, fa = "fa")</code> grafica los valores propios reales contra los simulados: se conservan los factores cuyo valor propio real supera al simulado.`,
      fuente: [{ id: "C4.2", loc: "slides 5, 16" }]
    },
    {
      id: "m10-q020", modulo: MOD, concepto: "m10-c07", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Qué NO cambia al aplicar una rotación a los factores?",
      opciones: [
        "Las comunalidades y la varianza total explicada",
        "La matriz de cargas",
        "La interpretabilidad de los factores",
        "El reparto de la varianza entre los factores"
      ],
      correcta: 0,
      explicacion: "La rotación solo redistribuye la varianza entre factores y cambia las cargas para facilitar la interpretación; las comunalidades, las especificidades y la varianza total explicada se mantienen.",
      fuente: [{ id: "C4.2", loc: "slide 10" }, { id: "C4.1", loc: "slide 23" }]
    },
    {
      id: "m10-q021", modulo: MOD, concepto: "m10-c07", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "Se sospecha que los factores latentes están correlacionados entre sí. ¿Qué tipo de rotación conviene?",
      opciones: [
        "Oblicua (Oblimin o Promax)",
        "Ortogonal (Varimax)",
        "Ninguna: las rotaciones solo son para factores incorrelados",
        "Quartimax, porque siempre crea un factor general"
      ],
      correcta: 0,
      explicacion: "Las rotaciones oblicuas (Oblimin, Promax) permiten factores correlacionados; las ortogonales (Varimax, Quartimax, Equamax) los mantienen independientes.",
      fuente: [{ id: "C4.2", loc: "slides 11–12" }]
    },
    {
      id: "m10-q022", modulo: MOD, concepto: "m10-c07", tipo: "calculo", dificultad: 3, origen: "curso",
      enunciado: String.raw`C4.1 s23: se rota con $T=\begin{pmatrix}1/\sqrt2&1/\sqrt2\\-1/\sqrt2&1/\sqrt2\end{pmatrix}$. Matemáticas tenía cargas $(0{,}8;\ 0{,}2)$. Calcula su <strong>primera carga rotada</strong> ($A^*=AT$).`,
      respuesta: 0.4243, tolerancia: 0.002,
      explicacion: String.raw`$a^*_1=0{,}8\cdot\tfrac1{\sqrt2}+0{,}2\cdot\bigl(-\tfrac1{\sqrt2}\bigr)=\tfrac{0{,}6}{\sqrt2}=0{,}424$; $a^*_2=\tfrac{0{,}8+0{,}2}{\sqrt2}=0{,}707$. La comunalidad no cambia: $0{,}424^2+0{,}707^2=0{,}68$.`,
      verifica: [
        { que: "carga rotada 1", js: "(0.8-0.2)/Math.sqrt(2)", esperado: 0.4243, tol: 0.0001 },
        { que: "comunalidad", js: "Math.pow((0.8-0.2)/Math.sqrt(2),2)+Math.pow((0.8+0.2)/Math.sqrt(2),2)", esperado: 0.68, tol: 1e-9 }
      ],
      fuente: [{ id: "C4.1", loc: "slide 23" }]
    },
    {
      id: "m10-q023", modulo: MOD, concepto: "m10-c07", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "Un factor tiene cargas altas en Matemáticas (0,8), Física (0,7) y Química (0,6), y casi cero en las demás materias. ¿Cómo se interpreta?",
      opciones: [
        "Como una dimensión de «aptitud científica»: las variables con carga alta definen el factor",
        "Como un error de medición",
        "No se puede interpretar sin rotar",
        "Como una variable dependiente"
      ],
      correcta: 0,
      explicacion: "Se nombra un factor a partir de las variables con carga significativa (> |0,4| o |0,5|). Aquí las tres materias científicas agrupan el factor.",
      fuente: [{ id: "C4.2", loc: "slides 7–8" }]
    },
    {
      id: "m10-q024", modulo: MOD, concepto: "m10-c08", tipo: "interpretacion-R", dificultad: 3, origen: "nueva",
      enunciado: "Se extrajeron 2 factores (Varimax) de USArrests estandarizado. ¿Qué variable es la peor explicada por los factores comunes?",
      codigoR: `fa_modelo <- fa(datos, nfactors = 2, rotate = "varimax")
round(fa_modelo$communality, 3)`,
      salidaR: `  Murder  Assault UrbanPop     Rape 
   0.899    0.802    0.451    0.657 `,
      salidaDe: `library(psych)
datos <- scale(USArrests)
fa_modelo <- suppressWarnings(fa(datos, nfactors = 2, rotate = "varimax"))
round(fa_modelo$communality, 3)`,
      opciones: [
        "UrbanPop (h² = 0,451; más de la mitad de su varianza es específica)",
        "Murder (h² = 0,899)",
        "Assault (h² = 0,802)",
        "Rape (h² = 0,657)"
      ],
      correcta: 0,
      explicacion: "La comunalidad más baja es la de UrbanPop: los factores explican 45,1 % de su varianza y su especificidad es 0,549. Murder, la mejor explicada, tiene h² = 0,899.",
      fuente: [{ id: "C4.2", loc: "slides 17–19" }]
    },
    {
      id: "m10-q025", modulo: MOD, concepto: "m10-c08", tipo: "completar-R", dificultad: 2, origen: "curso",
      enunciado: "Completa el código para estandarizar los datos y extraer 2 factores con rotación Varimax.",
      codigoR: `library(psych)
datos <- ___(USArrests)
modelo <- fa(datos, nfactors = ___, rotate = "___")`,
      huecos: [["scale"], ["2"], ["varimax"]],
      explicacion: String.raw`<code>scale()</code> estandariza; <code>fa(…, nfactors = 2, rotate = "varimax")</code> extrae 2 factores con rotación ortogonal (para oblicua: <code>"promax"</code> u <code>"oblimin"</code>).`,
      fuente: [{ id: "C4.2", loc: "slides 15–18" }]
    },
    {
      id: "m10-q026", modulo: MOD, concepto: "m10-c09", tipo: "vf", dificultad: 2, origen: "curso",
      enunciado: "Si entre dos submuestras las cargas del Factor 1 cambian de signo pero las mismas variables cargan alto en cada factor, la estructura factorial no es estable.",
      correcta: false,
      explicacion: "Falso. El signo de un factor es arbitrario; lo relevante es qué variables pesan en cada factor y cuáles se oponen entre sí. Si las mismas variables se agrupan en ambas submuestras, la estructura es esencialmente la misma.",
      fuente: [{ id: "PR-P2-Q3", loc: "pregunta 3.4" }]
    },
    {
      id: "m10-q027", modulo: MOD, concepto: "m10-c09", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "Para comprobar si un análisis factorial es estable, ¿qué estrategia se puede seguir?",
      opciones: [
        "Dividir la muestra en dos mitades, repetir el AF y comparar las agrupaciones de variables por factor",
        "Repetir el AF con el mismo conjunto de datos completo",
        "Eliminar el factor con menor autovalor",
        "Cambiar el signo de todos los factores"
      ],
      correcta: 0,
      explicacion: "La validación con dos submuestras (pauta de la Prueba 2, 3.4) verifica que las mismas variables se agrupan en los mismos factores.",
      fuente: [{ id: "PR-P2-Q3", loc: "pregunta 3.4" }]
    }
  ]);
})();
