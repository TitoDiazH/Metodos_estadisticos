/* ============================================================================
   Preguntas · M13 K-medias y elección de k (P2)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   "salidaDe" = código R cuya salida real debe coincidir con "salidaR"
   (lo comprueba tools/verificar_numeros.js ejecutando R).
   ========================================================================== */
(function () {
  var DATOS_EMPRESAS = `datos <- data.frame(
  Inversion = c(16, 12, 10, 12, 45, 50, 45, 50),
  Ventas    = c(10, 14, 22, 25, 10, 15, 25, 27))
rownames(datos) <- c("E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8")
datos_norm <- scale(datos)
`;
  var DATOS_CLIENTES = `datos <- data.frame(
  ingreso   = c(1.22, 1.5, 1.3, 4.5, 5.0, 4.8),
  gasto     = c(0.8, 1.0, 0.9, 3.5, 3.8, 3.2),
  productos = c(2, 3, 2, 6, 7, 6))
rownames(datos) <- c("C1", "C2", "C3", "C4", "C5", "C6")
datos_norm <- as.data.frame(scale(datos,
                                  center = apply(datos, 2, min),
                                  scale = apply(datos, 2, max) - apply(datos, 2, min)))
`;

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m13-q001", modulo: "m13-k-medias", concepto: "m13-c02", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: String.raw`Considera los puntos $(1,1)$, $(2,1)$, $(4,3)$ y $(5,4)$ con centroides iniciales $\mu_1=(1,1)$ y $\mu_2=(5,4)$. ¿A qué clúster pertenece cada punto en la primera iteración de K-medias?`,
      opciones: [
        "Clúster 1: (1,1) y (2,1) · Clúster 2: (4,3) y (5,4)",
        "Clúster 1: (1,1) · Clúster 2: (2,1), (4,3) y (5,4)",
        "Clúster 1: (1,1), (2,1) y (4,3) · Clúster 2: (5,4)",
        "Clúster 1: (1,1) y (4,3) · Clúster 2: (2,1) y (5,4)"
      ],
      correcta: 0,
      explicacion: String.raw`Cada punto va al centroide más cercano (distancia euclídea). $(2,1)$: $d(\mu_1)=1$ y $d(\mu_2)=\sqrt{9+9}=4{,}24$ ⇒ clúster 1. $(4,3)$: $d(\mu_1)=\sqrt{9+4}=3{,}61$ y $d(\mu_2)=\sqrt{1+1}=1{,}41$ ⇒ clúster 2.`,
      verifica: [
        { que: "d((2,1),mu2)", js: "dist([2,1],[5,4])", esperado: 4.2426, tol: 0.001 },
        { que: "d((4,3),mu1)", js: "dist([4,3],[1,1])", esperado: 3.6056, tol: 0.001 },
        { que: "d((4,3),mu2)", js: "dist([4,3],[5,4])", esperado: 1.4142, tol: 0.001 }
      ],
      fuente: [{ id: "EJ-P2", loc: "P11" }, { id: "C5.2", loc: "slides 4–5" }]
    },
    {
      id: "m13-q002", modulo: "m13-k-medias", concepto: "m13-c02", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Tras la primera asignación del problema anterior (clúster 2 $=\{(4,3),(5,4)\}$), calcula la <strong>segunda coordenada</strong> del nuevo centroide $\mu_2$.`,
      respuesta: 3.5, tolerancia: 0.01,
      explicacion: String.raw`El nuevo centroide es la media de los puntos asignados: $\mu_2=\left(\tfrac{4+5}{2};\tfrac{3+4}{2}\right)=(4{,}5;\ 3{,}5)$. Del mismo modo, $\mu_1=(1{,}5;\ 1)$.`,
      verifica: [{ que: "media de 3 y 4", js: "media([3,4])", esperado: 3.5, tol: 0.0001 }],
      fuente: [{ id: "EJ-P2", loc: "P11" }, { id: "C5.2", loc: "slide 6" }]
    },
    {
      id: "m13-q003", modulo: "m13-k-medias", concepto: "m13-c04", tipo: "multiple", dificultad: 1, origen: "nueva",
      enunciado: "¿Cuáles son limitaciones de K-medias?",
      opciones: [
        "Requiere especificar k de antemano",
        "Es sensible a outliers, porque afectan los centroides",
        "Asume clústeres esféricos de tamaño similar",
        "No escala a conjuntos de datos grandes",
        "Obliga a cortar un dendrograma para obtener los grupos"
      ],
      correcta: [0, 1, 2],
      explicacion: "Limitaciones de la clase: requiere k de antemano, sensible a la inicialización, asume clústeres esféricos de tamaño similar, sensible a outliers y no produce dendrograma. Al revés de la opción D, su ventaja es ser rápido y escalable; y no hay dendrograma que cortar.",
      fuente: [{ id: "C5.2", loc: "slide 8" }]
    },
    {
      id: "m13-q004", modulo: "m13-k-medias", concepto: "m13-c02", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "K-medias siempre converge, y lo hace al agrupamiento con la menor WSS posible para ese k.",
      correcta: false,
      explicacion: "La primera parte es cierta (la WSS decrece en cada iteración y está acotada por 0), pero puede converger a un óptimo LOCAL, no necesariamente global: depende de la inicialización. Por eso se usa nstart o K-Means++.",
      fuente: [{ id: "C5.2", loc: "slides 3–4" }]
    },
    {
      id: "m13-q005", modulo: "m13-k-medias", concepto: "m13-c06", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "¿Qué ocurre con la WSS a medida que aumenta el número de clústeres k?",
      opciones: [
        "Decrece (o se mantiene) y llega a 0 cuando k = n",
        "Decrece hasta el k óptimo y luego vuelve a aumentar",
        "Aumenta, porque hay más clústeres que sumar",
        "No depende de k, solo de los datos"
      ],
      correcta: 0,
      explicacion: "WSS es monótonamente decreciente en k: WSS(1) ≥ WSS(2) ≥ … ≥ WSS(n) = 0. Por eso no se elige el k de menor WSS, sino el codo.",
      distractores: ["", "Si tuviera un mínimo interior bastaría con buscarlo; justamente no lo tiene.", "Subdividir más siempre reduce la varianza dentro de los grupos.", "Depende de k por definición."],
      fuente: [{ id: "C5.2", loc: "slides 11–12" }]
    },
    {
      id: "m13-q006", modulo: "m13-k-medias", concepto: "m13-c07", tipo: "calculo", dificultad: 2, origen: "nueva",
      enunciado: String.raw`Para una observación, la distancia promedio a las demás de su clúster es $a(i)=3$ y la distancia promedio al clúster vecino más cercano es $b(i)=2$. Calcula $s(i)$.`,
      respuesta: -0.3333, tolerancia: 0.01,
      explicacion: String.raw`$s(i)=\dfrac{b(i)-a(i)}{\max\{a(i),b(i)\}}=\dfrac{2-3}{3}=-0{,}33$. Es negativa: la observación está más cerca del clúster vecino que del propio, podría estar mejor en otro clúster.`,
      verifica: [{ que: "silueta", js: "(2-3)/Math.max(3,2)", esperado: -0.3333, tol: 0.0001 }],
      fuente: [{ id: "C5.2", loc: "slide 14" }]
    },
    {
      id: "m13-q007", modulo: "m13-k-medias", concepto: "m13-c06", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Para 6 clientes (datos normalizados min–máx) se calculó la WSS de K-medias con k = 1, …, 5. Según el método del codo, ¿cuántos clústeres conviene usar?",
      codigoR: `wss <- numeric(5)
for (k in 1:5) {
  km <- kmeans(datos_norm, centers = k, nstart = 25)
  wss[k] <- km$tot.withinss}
round(wss, 4)`,
      salidaR: `[1] 3.4067 0.0873 0.0399 0.0089 0.0008`,
      salidaDe: DATOS_CLIENTES + `set.seed(123)
wss <- numeric(5)
for (k in 1:5) {
  km <- kmeans(datos_norm, centers = k, nstart = 25)
  wss[k] <- km$tot.withinss}
round(wss, 4)`,
      opciones: ["k = 2", "k = 5", "k = 1", "k = 4"],
      correcta: 0,
      explicacion: "La WSS cae de 3,41 a 0,09 al pasar de k = 1 a k = 2 y después la reducción es mucho menor: el codo está en k = 2, que captura la mayor parte de la estructura sin sobreajustar.",
      distractores: ["", "Tiene la menor WSS, pero la WSS siempre baja al aumentar k: no es el criterio.", "Con un solo clúster no hay segmentación y la WSS es máxima.", "De 3 a 4 la mejora ya es marginal."],
      fuente: [{ id: "AY5-E", loc: "P4 f" }, { id: "AY5-R", loc: "líneas 211–228" }]
    },
    {
      id: "m13-q008", modulo: "m13-k-medias", concepto: "m13-c05", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Salida de K-medias (k = 3) sobre 8 empresas con Inversión y Ventas estandarizadas. ¿Qué afirmación es correcta?",
      salidaR: `E1 E2 E3 E4 E5 E6 E7 E8
 3  3  3  3  1  1  2  2
   Inversion     Ventas
1  0.9271262 -0.8534188
2  0.9271262  1.0667735
3 -0.9271262 -0.1066774
[1] 3.345317`,
      salidaDe: DATOS_EMPRESAS + `set.seed(123)
km <- kmeans(datos_norm, centers = 3, nstart = 25)
print(km$cluster)
print(km$centers)
print(km$tot.withinss)`,
      opciones: [
        "E5 y E6 forman un clúster de inversión sobre la media y ventas bajo la media",
        "El clúster 3 agrupa a las empresas de mayor inversión",
        "Las empresas del clúster 2 invierten en promedio 0,93 millones",
        "La WSS de 3,35 indica que k = 3 es el número óptimo de clústeres"
      ],
      correcta: 0,
      explicacion: "E5 y E6 están en el clúster 1, cuyo centroide es (0,93; −0,85) en unidades estandarizadas: inversión sobre la media, ventas bajo la media.",
      distractores: ["", "El centroide 3 tiene inversión −0,93: bajo la media.", "0,93 está en unidades estandarizadas (desviaciones estándar), no en millones.", "Una WSS aislada no dice nada sobre el k óptimo: hay que compararla con otros k (codo)."],
      fuente: [{ id: "S5.2", loc: "líneas 14–32" }, { id: "C5.2", loc: "slide 9" }]
    },
    {
      id: "m13-q009", modulo: "m13-k-medias", concepto: "m13-c05", tipo: "codigo-R", dificultad: 2, origen: "nueva",
      enunciado: "Las variables de <code>datos</code> están en escalas muy distintas (ingreso en millones, número de productos en unidades). ¿Qué le falta a este código según lo visto en clases?",
      codigoR: `km <- kmeans(datos, centers = 3, nstart = 25)
print(km$cluster)`,
      opciones: [
        "Estandarizar antes: datos_norm <- scale(datos) y aplicar kmeans() sobre datos_norm",
        "Agregar method = \"ward.D2\"",
        "Reemplazar centers por k",
        "Calcular antes la matriz de distancias con dist() y pasársela a kmeans()"
      ],
      correcta: 0,
      explicacion: "La slide lo indica como comentario: «Siempre estandarizar». Sin escalar, la variable de valores más grandes domina las distancias.",
      distractores: ["", "method = \"ward.D2\" es de hclust(), no de kmeans().", "El argumento se llama centers.", "kmeans() recibe los datos, no una matriz de distancias."],
      fuente: [{ id: "C5.2", loc: "slide 9" }]
    },
    {
      id: "m13-q010", modulo: "m13-k-medias", concepto: "m13-c05", tipo: "completar-R", dificultad: 2, origen: "curso",
      enunciado: "Completa el código de la clase: K-medias con 3 clústeres, 25 inicializaciones, y mostrar la WSS total.",
      codigoR: `datos_norm <- scale(datos)
km <- kmeans(datos_norm, centers = 3, ___ = 25)
print(km$___)   # WSS total`,
      huecos: [["nstart"], ["tot.withinss"]],
      explicacion: "<code>nstart = 25</code> ejecuta 25 inicializaciones y retorna la mejor; <code>km$tot.withinss</code> es la WSS total.",
      fuente: [{ id: "C5.2", loc: "slide 9" }, { id: "S5.2", loc: "líneas 27–32" }]
    },
    {
      id: "m13-q011", modulo: "m13-k-medias", concepto: "m13-c05", tipo: "calculo", dificultad: 3, desafio: true, origen: "curso",
      enunciado: String.raw`Se aplicó K-medias sobre datos normalizados con $y=\dfrac{x-\min}{\max-\min}$. Para la presión arterial, mín $=100$ y máx $=200$ mmHg. Un centroide tiene presión normalizada $0{,}85$. ¿A cuántos mmHg corresponde?`,
      respuesta: 185, tolerancia: 0.5, unidad: "mmHg",
      explicacion: String.raw`Transformación inversa: $x=y(\max-\min)+\min=0{,}85\cdot100+100=185$ mmHg. Los centroides se interpretan en las unidades originales deshaciendo la normalización.`,
      verifica: [{ que: "inversa min-max", js: "0.85*(200-100)+100", esperado: 185, tol: 0.0001 }],
      fuente: [{ id: "PR-P2-Q12", loc: "pregunta 1 d" }]
    },
    {
      id: "m13-q012", modulo: "m13-k-medias", concepto: "m13-c07", tipo: "vf", dificultad: 3, desafio: true, origen: "curso",
      enunciado: "Si todos los coeficientes de silueta individuales son mayores que 0, no hay ninguna observación mal asignada.",
      correcta: true,
      explicacion: "Es la respuesta de la pauta de la Prueba 2: «Todos los valores del coeficiente de silhouette son > 0, por lo que no hay ninguna que esté mal asignada». La mala asignación se sugiere con s(i) < 0; valores cercanos a 0 solo indican que la observación está en el borde.",
      fuente: [{ id: "PR-P2-Q12", loc: "pregunta 1 e" }, { id: "C5.2", loc: "slide 14" }]
    }
  ]);
})();
