/* ============================================================================
   Preguntas · M14 DIANA (desagregativo) (P2)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m14-diana";
  var DIST5 = `library(cluster)
n <- c("E1", "E2", "E5", "E7", "E8")
D <- matrix(c(0, .65, 1.64, 2.81, 3.22,  .65, 0, 1.97, 2.51, 2.92,
              1.64, 1.97, 0, 2.28, 2.60, 2.81, 2.51, 2.28, 0, .42,
              3.22, 2.92, 2.60, .42, 0), 5, dimnames = list(n, n))
`;
  var PUNTOS4 = `library(cluster)
x <- c(a = 1, b = 2, c = 4, d = 10)
d1 <- dist(x)
`;

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m14-q001", modulo: MOD, concepto: "m14-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "¿Cómo comienza el algoritmo DIANA?",
      opciones: [
        "Con todas las observaciones en un único clúster, que se va dividiendo",
        "Con cada observación en su propio clúster",
        "Con k centroides al azar",
        "Con el par de observaciones más cercano"
      ],
      correcta: 0,
      explicacion: "DIANA (Divisive Analysis) es desagregativo (top-down): parte de 1 clúster y divide hasta que cada observación quede sola. Lo contrario de los métodos aglomerativos.",
      fuente: [{ id: "C5.2", loc: "slides 19–21" }]
    },
    {
      id: "m14-q002", modulo: MOD, concepto: "m14-c01", tipo: "alternativas", dificultad: 1, origen: "curso",
      enunciado: "En DIANA, ¿qué elemento inicia el grupo escindido (C₁)?",
      opciones: [
        "El de mayor disparidad promedio (distancia promedio a todos los demás)",
        "El más cercano al centro de todos los datos",
        "El primero de la lista",
        "El de menor disparidad"
      ],
      correcta: 0,
      explicacion: "Se escinde el elemento más «diferente» del resto: el de máxima distancia promedio a los demás. Después se reasignan al nuevo grupo los que queden más cerca de él que de su grupo original.",
      fuente: [{ id: "C5.2", loc: "slides 21, 23" }]
    },
    {
      id: "m14-q003", modulo: MOD, concepto: "m14-c01", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`C5.2 s22: las distancias de E8 a E1, E2, E5 y E7 son $3{,}22;\ 2{,}92;\ 2{,}60$ y $0{,}42$. Calcula la disparidad promedio de E8.`,
      respuesta: 2.29, tolerancia: 0.005,
      explicacion: String.raw`$\dfrac{3{,}22+2{,}92+2{,}60+0{,}42}{4}=\dfrac{9{,}16}{4}=2{,}29$. Es la mayor de las cinco empresas (E1 $2{,}08$, E2 $2{,}01$, E5 $2{,}12$, E7 $2{,}00$) ⇒ E8 inicia el grupo escindido.`,
      verifica: [{ que: "disparidad E8", js: "(3.22+2.92+2.60+0.42)/4", esperado: 2.29, tol: 0.001 }],
      fuente: [{ id: "C5.2", loc: "slides 22–23" }]
    },
    {
      id: "m14-q004", modulo: MOD, concepto: "m14-c01", tipo: "calculo", dificultad: 3, origen: "curso",
      enunciado: String.raw`Con $C_1=\{E_8\}$ y $C_2=\{E_1,E_2,E_5,E_7\}$, calcula $\text{dif}$ de E7: $d(E_7,C_2\setminus E_7)-d(E_7,C_1)$. Distancias de E7: a E1 $2{,}81$, a E2 $2{,}51$, a E5 $2{,}28$, a E8 $0{,}42$.`,
      respuesta: 2.11, tolerancia: 0.01,
      explicacion: String.raw`$d(E_7,C_2\setminus E_7)=\dfrac{2{,}81+2{,}51+2{,}28}{3}=2{,}533$ y $d(E_7,C_1)=0{,}42$ ⇒ $\text{dif}=2{,}11>0$ ⇒ E7 pasa a $C_1$. Las otras tres dif son negativas (E1 $-1{,}52$, E2 $-1{,}21$, E5 $-0{,}64$): se quedan.`,
      verifica: [{ que: "dif E7", js: "(2.81+2.51+2.28)/3-0.42", esperado: 2.1133, tol: 0.001 }],
      fuente: [{ id: "C5.2", loc: "slides 24–25" }]
    },
    {
      id: "m14-q005", modulo: MOD, concepto: "m14-c01", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "En la fase de reasignación de DIANA, una observación i del clúster que queda se mueve al grupo escindido cuando dif = d(i, resto de su clúster) − d(i, grupo escindido) es mayor que 0.",
      correcta: true,
      explicacion: "dif > 0 significa que i está más cerca (en promedio) del grupo escindido que del resto de su propio clúster, así que cambia de grupo. Se repite hasta que nadie se mueva.",
      fuente: [{ id: "C5.2", loc: "slides 24–25" }]
    },
    {
      id: "m14-q006", modulo: MOD, concepto: "m14-c01", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "Tras la primera división, ¿qué clúster se divide a continuación en DIANA?",
      opciones: [
        "El más heterogéneo (mayor disparidad interna o diámetro)",
        "El que tiene más observaciones",
        "El que tiene menos observaciones",
        "El primero que se formó"
      ],
      correcta: 0,
      explicacion: "Se divide siempre el clúster más heterogéneo, no el más grande. En el ejemplo, {E7,E8} tiene disparidad 0,42 y {E1,E2,E5} 1,42: se divide el segundo.",
      distractores: ["", "El tamaño no es el criterio: se mide la heterogeneidad.", "Tampoco el tamaño pequeño.", "El orden no importa."],
      fuente: [{ id: "C5.2", loc: "slides 26–27" }]
    },
    {
      id: "m14-q007", modulo: MOD, concepto: "m14-c01", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Para decidir qué clúster dividir, se calcula la disparidad de $\{E_1,E_2,E_5\}$ con $d(E_1,E_2)=0{,}65$, $d(E_1,E_5)=1{,}64$ y $d(E_2,E_5)=1{,}97$. ¿Cuánto es el promedio de sus distancias?`,
      respuesta: 1.42, tolerancia: 0.005,
      explicacion: String.raw`$\dfrac{0{,}65+1{,}64+1{,}97}{3}=1{,}42$, mayor que $0{,}42$ (de $\{E_7,E_8\}$): se divide $\{E_1,E_2,E_5\}$, y E5 (mayor disparidad, $1{,}80$) sale primero.`,
      verifica: [{ que: "disparidad", js: "(0.65+1.64+1.97)/3", esperado: 1.42, tol: 0.001 }],
      fuente: [{ id: "C5.2", loc: "slide 26" }]
    },
    {
      id: "m14-q008", modulo: MOD, concepto: "m14-c01", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C5.2", loc: "slides 22–23" }],
      enunciado: String.raw`Cuatro puntos en una recta: $a=1,\ b=2,\ c=4,\ d=10$. Calcula la disparidad promedio del punto $d$ (distancia euclídea).`,
      respuesta: 7.667, tolerancia: 0.01,
      explicacion: String.raw`$d(d,a)=9$, $d(d,b)=8$, $d(d,c)=6$ ⇒ promedio $23/3=7{,}667$. Las otras disparidades son $a$: $4{,}33$; $b$: $3{,}67$; $c$: $3{,}67$. DIANA escinde primero a $d$.`,
      verifica: [
        { que: "disparidad de d", r: PUNTOS4 + `cat(round(mean(as.matrix(d1)["d", c("a","b","c")]), 4))`, esperado: 7.6667, tol: 0.0001 },
        { que: "disparidad de a", r: PUNTOS4 + `cat(round(mean(as.matrix(d1)["a", c("b","c","d")]), 4))`, esperado: 4.3333, tol: 0.0001 }
      ],
      fuente: [{ id: "C5.2", loc: "slides 22–23" }]
    },
    {
      id: "m14-q009", modulo: MOD, concepto: "m14-c01", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Se aplicó DIANA a la matriz de distancias de las 5 empresas y se cortó el dendrograma en 3 clústeres. ¿Cómo quedan los grupos?",
      codigoR: `dd <- diana(as.dist(D), diss = TRUE)
cutree(as.hclust(dd), k = 3)`,
      salidaR: `E1 E2 E5 E7 E8 
 1  1  2  3  3 `,
      salidaDe: DIST5 + `dd <- diana(as.dist(D), diss = TRUE)
cutree(as.hclust(dd), k = 3)`,
      opciones: [
        "{E1, E2}, {E5} y {E7, E8}",
        "{E1, E2, E5}, {E7} y {E8}",
        "{E1}, {E2, E5} y {E7, E8}",
        "{E1, E2}, {E5, E7} y {E8}"
      ],
      correcta: 0,
      explicacion: "La salida indica el número de clúster de cada empresa: E1 y E2 → 1; E5 → 2; E7 y E8 → 3. E5 (alta inversión y bajas ventas) queda aislada.",
      fuente: [{ id: "C5.2", loc: "slides 26–28" }]
    },
    {
      id: "m14-q010", modulo: MOD, concepto: "m14-c01", tipo: "interpretacion-R", dificultad: 3, origen: "nueva",
      enunciado: "Con DIANA sobre cuatro puntos (a = 1, b = 2, c = 4, d = 10) se obtuvieron las alturas del dendrograma. ¿Qué indican?",
      codigoR: `dd <- diana(d1, diss = TRUE)
round(dd$height, 2)`,
      salidaR: `[1] 1 3 9`,
      salidaDe: PUNTOS4 + `dd <- diana(d1, diss = TRUE)
round(dd$height, 2)`,
      opciones: [
        "Son los diámetros de los clústeres que se dividen: {a,b}=1, {a,b,c}=3 y todos=9",
        "Son las distancias entre centroides",
        "Son los valores de k",
        "Son las disparidades promedio de cada punto"
      ],
      correcta: 0,
      explicacion: "En diana las alturas son los diámetros (mayor distancia interna) de los clústeres que se dividen: {a,b} → 1; {a,b,c} → 3 (d(a,c)=3); y el conjunto completo → 9 (d(a,d)=9). Se divide primero d, luego c, y queda {a,b}.",
      fuente: [{ id: "C5.2", loc: "slide 27" }]
    },
    {
      id: "m14-q011", modulo: MOD, concepto: "m14-c01", tipo: "completar-R", dificultad: 1, origen: "curso",
      enunciado: "Completa el código para aplicar DIANA sobre datos normalizados y cortar en 3 clústeres.",
      codigoR: `library(cluster)
dd <- ___(datos_norm, metric = "euclidean")
grupos <- ___(as.hclust(dd), k = 3)`,
      huecos: [["diana"], ["cutree"]],
      explicacion: String.raw`<code>cluster::diana()</code> hace el clustering divisivo; el resultado se pasa con <code>as.hclust()</code> a <code>cutree()</code> para obtener los grupos.`,
      fuente: [{ id: "C5.2", loc: "slide 28" }, { id: "S5.2", loc: "líneas 55–61" }]
    },
    {
      id: "m14-q012", modulo: MOD, concepto: "m14-c01", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "DIANA divide siempre el clúster con más observaciones.",
      correcta: false,
      explicacion: "Falso. DIANA divide el clúster más HETEROGÉNEO (mayor disparidad o diámetro), que no necesariamente es el más numeroso.",
      fuente: [{ id: "C5.2", loc: "slides 26–27" }]
    },
    {
      id: "m14-q013", modulo: MOD, concepto: "m14-c02", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "Con las 5 empresas, k = 2 agrupa {E1, E2, E5} y {E7, E8} en varios métodos, pero con k = 3 DIANA separa además a E5. ¿Qué indica esto?",
      opciones: [
        "E5 es un perfil atípico respecto de {E1, E2}; DIANA detecta primero las separaciones grandes",
        "E5 pertenece a {E7, E8}",
        "Los métodos jerárquicos siempre fallan con 5 datos",
        "Que k = 3 es incorrecto"
      ],
      correcta: 0,
      explicacion: "C5.2 s26 y s29: DIANA (top-down) destaca los perfiles atípicos; con k = 3 aísla a E5 (alta inversión y bajas ventas).",
      fuente: [{ id: "C5.2", loc: "slides 26, 29" }]
    },
    {
      id: "m14-q014", modulo: MOD, concepto: "m14-c02", tipo: "multiple", dificultad: 2, origen: "curso",
      enunciado: "¿Cuáles son pasos prácticos recomendados en la clase de clustering?",
      opciones: [
        "Preparar los datos (limpiar y estandarizar)",
        "Elegir la distancia según el tipo de datos",
        "Determinar k con codo y silueta",
        "Interpretar y validar documentando el perfil de cada clúster",
        "Asignar etiquetas conocidas a los datos antes de empezar"
      ],
      correcta: [0, 1, 2, 3],
      explicacion: "Resumen de C5.2 s29. El clustering es no supervisado: no se parte de etiquetas conocidas.",
      fuente: [{ id: "C5.2", loc: "slide 29" }]
    },
    {
      id: "m14-q015", modulo: MOD, concepto: "m14-c02", tipo: "alternativas", dificultad: 2, origen: "curso",
      enunciado: "Para un conjunto de datos grande, con idea del número de clústeres y grupos aproximadamente esféricos, ¿qué método suele ser más conveniente?",
      opciones: ["K-medias", "DIANA", "Ward jerárquico siempre", "Single linkage"],
      correcta: 0,
      explicacion: "K-medias es eficiente y escala a datos grandes cuando se tiene idea de k y los clústeres son esféricos. Los jerárquicos (y DIANA) se prefieren con datos pequeños/medianos y para explorar distintos k con el dendrograma.",
      fuente: [{ id: "C5.2", loc: "slide 29" }]
    },
    {
      id: "m14-q016", modulo: MOD, concepto: "m14-c01", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "Con a = 1, b = 2, c = 4, d = 10, DIANA primero escinde a d. En la segunda división del clúster {a, b, c}, ¿quién sale primero?",
      opciones: ["c", "a", "b", "Ninguno: el clúster ya es homogéneo"],
      correcta: 0,
      explicacion: "Disparidades dentro de {a,b,c}: a: (1+3)/2 = 2; b: (1+2)/2 = 1,5; c: (3+2)/2 = 2,5 ⇒ c es la mayor y sale. No hay reasignación (dif de a = 1−3 < 0 y de b = 1−2 < 0). Queda {a,b} con altura 1.",
      verifica: [
        { que: "disp c", js: "(3+2)/2", esperado: 2.5, tol: 1e-9 },
        { que: "dif a", js: "1-3", esperado: -2, tol: 1e-9 }
      ],
      fuente: [{ id: "C5.2", loc: "slides 23–26" }]
    }
  ]);
})();
