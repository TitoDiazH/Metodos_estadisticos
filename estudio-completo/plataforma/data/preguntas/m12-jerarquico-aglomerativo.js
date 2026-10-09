/* ============================================================================
   Preguntas · M12 Clustering jerárquico aglomerativo (P2)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m12-jerarquico-aglomerativo";
  var TIENDAS = `P <- data.frame(X = c(1, 2, 4, 7, 5), Y = c(1, 6, 3, 4, 1), row.names = LETTERS[1:5])
d <- dist(P, "manhattan")
`;
  var UNIDIM = `x <- c(a = 1, b = 2, c = 5, d = 10, e = 11)
d1 <- dist(x)
`;

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m12-q001", modulo: MOD, concepto: "m12-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Cómo comienza un método jerárquico aglomerativo?",
      opciones: [
        "Con cada observación como un clúster individual (n clústeres), que se van uniendo",
        "Con todas las observaciones en un único clúster, que se va dividiendo",
        "Con k centroides elegidos al azar",
        "Con la matriz de covarianza de las variables"
      ],
      correcta: 0,
      explicacion: "Aglomerativo = de abajo hacia arriba: parte con n clústeres de un dato y une en cada paso los dos más similares hasta quedar uno. El que parte de un clúster y divide es el desagregativo (DIANA).",
      distractores: ["", "Eso describe el desagregativo.", "Eso es K-medias.", "No usa la covarianza."],
      fuente: [{ id: "C5.1", loc: "slide 19" }]
    },
    {
      id: "m12-q002", modulo: MOD, concepto: "m12-c01", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "En un método jerárquico hay que fijar el número de clústeres k antes de construir el dendrograma.",
      correcta: false,
      explicacion: "Falso. El dendrograma se construye completo y k se decide después, al cortarlo a cierta altura (o con cutree(hc, k)). Esa es una ventaja frente a K-medias, que requiere k de antemano.",
      fuente: [{ id: "C5.1", loc: "slides 19, 21" }]
    },
    {
      id: "m12-q003", modulo: MOD, concepto: "m12-c01", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: "En un dendrograma, ¿qué representa la altura a la que se unen dos ramas?",
      opciones: [
        "La distancia (según el método de enlace) entre los clústeres que se fusionan",
        "El número de observaciones del clúster",
        "El número de variables",
        "El valor de k óptimo"
      ],
      correcta: 0,
      explicacion: "Cuanto más alta la fusión, más distintos eran los clústeres unidos. Los saltos grandes entre alturas sugieren dónde cortar.",
      fuente: [{ id: "C5.1", loc: "slide 19" }]
    },
    {
      id: "m12-q004", modulo: MOD, concepto: "m12-c02", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Qué efecto característico tiene el single linkage?",
      opciones: [
        "Efecto cadena: clústeres largos y filamentosos",
        "Clústeres esféricos y compactos",
        "Inversiones en el dendrograma",
        "Clústeres de tamaño igual"
      ],
      correcta: 0,
      explicacion: "Con la distancia mínima basta un punto cercano para unir dos clústeres, y los grupos se alargan encadenando observaciones.",
      fuente: [{ id: "C5.1", loc: "slides 21–25" }]
    },
    {
      id: "m12-q005", modulo: MOD, concepto: "m12-c02", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`C5.1 s24: $d(E_5,E_1)=1{,}64$ y $d(E_5,E_2)=1{,}97$. Con single linkage, ¿cuánto vale $d(\{E_1,E_2\},E_5)$?`,
      respuesta: 1.64, tolerancia: 0.005,
      explicacion: String.raw`Single toma el <strong>mínimo</strong> entre miembros: $\min(1{,}64;\,1{,}97)=1{,}64$. Con complete sería $1{,}97$.`,
      verifica: [{ que: "mín", js: "Math.min(1.64,1.97)", esperado: 1.64, tol: 1e-9 }],
      fuente: [{ id: "C5.1", loc: "slides 23–25" }]
    },
    {
      id: "m12-q006", modulo: MOD, concepto: "m12-c02", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C5.1", loc: "slides 22–25" }],
      enunciado: String.raw`Cinco puntos en una recta: $a=1,\ b=2,\ c=5,\ d=10,\ e=11$ (distancia euclídea). Con single linkage, ¿a qué altura se une $c$ al clúster $\{a,b\}$?`,
      respuesta: 3, tolerancia: 0.001,
      explicacion: String.raw`Primero se forman $\{a,b\}$ y $\{d,e\}$ a altura $1$. Luego $d(\{a,b\},c)=\min(|1-5|,|2-5|)=\min(4,3)=3$ y $d(c,\{d,e\})=\min(5,6)=5$: se une $c$ a $\{a,b\}$ a altura $3$. La última fusión (single) es a $5$.`,
      verifica: [{ que: "altura", r: UNIDIM + `cat(hclust(d1, "single")$height[3])`, esperado: 3, tol: 1e-9 }, { que: "última", r: UNIDIM + `cat(hclust(d1, "single")$height[4])`, esperado: 5, tol: 1e-9 }],
      fuente: [{ id: "C5.1", loc: "slides 22–25" }]
    },
    {
      id: "m12-q007", modulo: MOD, concepto: "m12-c03", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C5.1", loc: "slide 27" }],
      enunciado: String.raw`Con los mismos cinco puntos ($a=1,b=2,c=5,d=10,e=11$) y <strong>complete linkage</strong>, ¿cuál es la altura de la última fusión (todos los puntos en un clúster)?`,
      respuesta: 10, tolerancia: 0.001,
      explicacion: String.raw`Complete usa el máximo entre miembros. Se forman $\{a,b\}$ y $\{d,e\}$ a $1$; $c$ se une a $\{a,b\}$ a $\max(4,3)=4$ (a $\{d,e\}$ habría sido $\max(5,6)=6$). La última altura es $\max$ de las distancias entre $\{a,b,c\}$ y $\{d,e\}$ $=d(a,e)=10$.`,
      verifica: [{ que: "última", r: UNIDIM + `cat(hclust(d1, "complete")$height[4])`, esperado: 10, tol: 1e-9 }, { que: "c se une", r: UNIDIM + `cat(hclust(d1, "complete")$height[3])`, esperado: 4, tol: 1e-9 }],
      fuente: [{ id: "C5.1", loc: "slides 26–28" }]
    },
    {
      id: "m12-q008", modulo: MOD, concepto: "m12-c03", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "d(E1, E5) = 1,64 y d(E2, E5) = 1,97. ¿Cuál es d({E1, E2}, E5) con complete linkage?",
      opciones: ["1,97", "1,64", "1,80", "0,65"],
      correcta: 0,
      explicacion: "Complete toma el máximo entre miembros: max(1,64; 1,97) = 1,97. 1,80 sería el promedio aproximado (average) y 1,64 el single.",
      distractores: ["", "Eso es single (mínimo).", "Eso se parece a average (1,805).", "Es la distancia entre E1 y E2."],
      fuente: [{ id: "C5.1", loc: "slide 27" }]
    },
    {
      id: "m12-q009", modulo: MOD, concepto: "m12-c04", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Ayudantía 5, P1 (distancia Manhattan): tras unir $C$ y $E$, se tiene $d(B,C)=5$ y $d(B,E)=8$. Con <strong>average linkage</strong>, ¿cuánto vale $d(B,\{C,E\})$?`,
      respuesta: 6.5, tolerancia: 0.005,
      explicacion: String.raw`Average = promedio de todas las distancias entre pares: $(5+8)/2=6{,}5$. Single daría $5$ y complete $8$.`,
      verifica: [{ que: "promedio", js: "(5+8)/2", esperado: 6.5, tol: 1e-9 }],
      fuente: [{ id: "AY5-E", loc: "P1" }, { id: "AY5-R", loc: "líneas 51–62" }]
    },
    {
      id: "m12-q010", modulo: MOD, concepto: "m12-c04", tipo: "calculo", dificultad: 3, origen: "variacion",
      base: [{ id: "AY5-E", loc: "P1" }],
      enunciado: String.raw`Con los cinco puntos en recta ($a=1,b=2,c=5,d=10,e=11$) y average linkage, ¿a qué altura se fusionan $\{a,b,c\}$ y $\{d,e\}$ (última fusión)? Redondea a 2 decimales.`,
      respuesta: 7.83, tolerancia: 0.01,
      explicacion: String.raw`Promedio de las 6 distancias entre pares: $d(a,d)=9$, $d(a,e)=10$, $d(b,d)=8$, $d(b,e)=9$, $d(c,d)=5$, $d(c,e)=6$. Suma $=47$ ⇒ $47/6=7{,}83$.`,
      verifica: [{ que: "última", r: UNIDIM + `cat(round(hclust(d1, "average")$height[4], 4))`, esperado: 7.8333, tol: 0.0001 }, { que: "suma", js: "9+10+8+9+5+6", esperado: 47, tol: 0 }],
      fuente: [{ id: "AY5-E", loc: "P1" }]
    },
    {
      id: "m12-q011", modulo: MOD, concepto: "m12-c04", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Cinco tiendas A–E con distancia Manhattan. Se compararon las alturas de fusión de tres métodos. ¿Cuál es la altura de la ÚLTIMA fusión con cada método?",
      codigoR: `sapply(c("single", "complete", "average"),
       function(m) hclust(d, method = m)$height)`,
      salidaR: `     single complete average
[1,]      3        3     3.0
[2,]      4        5     4.5
[3,]      4        7     6.0
[4,]      5        9     6.5`,
      salidaDe: TIENDAS + `sapply(c("single", "complete", "average"),
       function(m) hclust(d, method = m)$height)`,
      opciones: [
        "Single 5, complete 9, average 6,5: complete es el más conservador y single el que fusiona antes",
        "Single 9, complete 5, average 6,5",
        "Las tres 3, porque la primera fusión es igual",
        "Single 3, complete 3, average 3"
      ],
      correcta: 0,
      explicacion: "Última fila (cuarta fusión): 5, 9 y 6,5. Siempre single ≤ average ≤ complete, porque mínimo ≤ promedio ≤ máximo. La primera fusión (C–E a 3) coincide en los tres.",
      fuente: [{ id: "AY5-E", loc: "P1" }, { id: "AY5-R", loc: "líneas 51–62" }]
    },
    {
      id: "m12-q012", modulo: MOD, concepto: "m12-c04", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Para los mismos datos, la altura de cada fusión con single linkage nunca es mayor que con average ni con complete, al fusionar los mismos clústeres.",
      correcta: true,
      explicacion: "Verdadero: para los mismos dos clústeres, mínimo ≤ promedio ≤ máximo de las distancias entre pares. (Las secuencias de fusiones pueden diferir entre métodos, pero la comparación para un par dado de clústeres se mantiene.)",
      fuente: [{ id: "C5.1", loc: "slides 21–28" }]
    },
    {
      id: "m12-q013", modulo: MOD, concepto: "m12-c05", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Qué método de enlace puede producir inversiones en el dendrograma (una fusión posterior a menor altura que una anterior)?",
      opciones: ["Centroide", "Ward", "Single", "Complete"],
      correcta: 0,
      explicacion: "Con centroides la distancia entre clústeres no es una métrica y puede disminuir tras una fusión. Single, complete y Ward dan alturas crecientes.",
      fuente: [{ id: "C5.1", loc: "slides 29–30" }]
    },
    {
      id: "m12-q014", modulo: MOD, concepto: "m12-c05", tipo: "multiple", dificultad: 2, origen: "curso",
      enunciado: "¿Cuáles afirmaciones sobre el método de Ward son correctas?",
      opciones: [
        "Une los clústeres cuya fusión aumenta lo menos posible la variabilidad interna",
        "Tiende a formar clústeres compactos y de tamaño parecido",
        "En R se usa method = \"ward.D2\" con distancias euclídeas",
        "Tiende a formar clústeres alargados por efecto cadena"
      ],
      correcta: [0, 1, 2],
      explicacion: "Ward minimiza el aumento de la suma de cuadrados intra-clúster; produce clústeres compactos y balanceados. El efecto cadena es de single linkage.",
      fuente: [{ id: "C5.1", loc: "slides 31–32" }]
    },
    {
      id: "m12-q015", modulo: MOD, concepto: "m12-c05", tipo: "completar-R", dificultad: 1, origen: "curso",
      enunciado: "Completa el código para hacer un clustering jerárquico con Ward y obtener 3 grupos.",
      codigoR: `dist_matriz <- dist(datos_norm, method = "euclidean")
hc <- ___(dist_matriz, method = "___")
grupos <- ___(hc, k = 3)`,
      huecos: [["hclust"], ["ward.D2"], ["cutree"]],
      explicacion: String.raw`<code>hclust(d, method = "ward.D2")</code> construye el dendrograma; <code>cutree(hc, k = 3)</code> lo corta en 3 clústeres.`,
      fuente: [{ id: "C5.1", loc: "slides 25, 32" }, { id: "S5.1", loc: "líneas 61–116" }]
    },
    {
      id: "m12-q016", modulo: MOD, concepto: "m12-c02", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Se aplicó single linkage a cinco puntos en una recta (a=1, b=2, c=5, d=10, e=11) y se cortó en 2 grupos. ¿Cómo quedan?",
      codigoR: `hc <- hclust(d1, method = "single")
cutree(hc, k = 2)`,
      salidaR: `a b c d e 
1 1 1 2 2 `,
      salidaDe: UNIDIM + `hc <- hclust(d1, method = "single")
cutree(hc, k = 2)`,
      opciones: [
        "Grupo 1: {a, b, c} · Grupo 2: {d, e}",
        "Grupo 1: {a, b} · Grupo 2: {c, d, e}",
        "Grupo 1: {a} · Grupo 2: {b, c, d, e}",
        "Todos en el grupo 1"
      ],
      correcta: 0,
      explicacion: "La salida de cutree asigna el número de clúster a cada punto: a, b y c → 1; d y e → 2. Coincide con el dendrograma: la última fusión (5) junta {a,b,c} con {d,e}.",
      fuente: [{ id: "C5.1", loc: "slide 25" }]
    },
    {
      id: "m12-q017", modulo: MOD, concepto: "m12-c03", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Complete linkage es el método más susceptible al efecto cadena, porque une clústeres si basta un par de puntos cercanos.",
      correcta: false,
      explicacion: "Falso: eso describe a single linkage (distancia mínima). Complete usa la distancia máxima (puntos más lejanos), forma clústeres compactos y evita el efecto cadena.",
      fuente: [{ id: "C5.1", loc: "slides 21, 26" }]
    },
    {
      id: "m12-q018", modulo: MOD, concepto: "m12-c04", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "En el ejercicio de las tiendas, tras unir C y E las distancias de A y de D al clúster {C, E} son iguales (single: 4 y 4). ¿Qué implica ese empate?",
      opciones: [
        "El orden de la siguiente fusión depende del criterio de desempate del programa; se debe indicar",
        "El método falló y no se puede continuar",
        "Se unen A y D entre sí",
        "Se debe descartar una de las dos tiendas"
      ],
      correcta: 0,
      explicacion: "Con empates el dendrograma puede no ser único; R y otro software pueden elegir distinto. En una respuesta se debe mencionar el empate y justificar la elección.",
      fuente: [{ id: "AY5-E", loc: "P1" }]
    }
  ]);
})();
