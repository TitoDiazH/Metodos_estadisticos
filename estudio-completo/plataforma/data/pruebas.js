/* ============================================================================
   pruebas.js — Definición de las pruebas y su TEMARIO (viene de CONTENIDOS.md §2).
   · "modulos" es la lista que manda para el selector "Estudiando para":
     un módulo entra en una prueba si su id está aquí (o si la prueba es
     acumulativa y está en una anterior). Para reutilizar un módulo en otra
     prueba se agrega su id aquí: NO se duplica el archivo del módulo.
   · Un id de "modulos" puede no tener archivo todavía: la app lo muestra como
     «pendiente de redactar».
   · estado: "definida" | "parcial" | "sin definir".  acumulativa: true | false | null (= no se sabe).
   ========================================================================== */
PLATAFORMA.registrar("prueba", [
  {
    id: "P1", orden: 1, nombre: "Prueba 1", estado: "definida", acumulativa: false,
    nota: "Reparto declarado por el estudiante (clases 1 a 4.2); PCA y análisis factorial confirmados en P1 (2026-10-08). T² de Hotelling (M08) confirmado en P1 (2026-10-08).",
    modulos: [
      { id: "m01-covarianza-correlacion", codigo: "M01", titulo: "Covarianza, correlación y regresión simple", prioridad: "alta" },
      { id: "m02-matrices-bartlett", codigo: "M02", titulo: "Matriz de covarianza, matriz de correlación y test de Bartlett", prioridad: "alta" },
      { id: "m03-normal-multivariada", codigo: "M03", titulo: "Distribución normal multivariada", prioridad: "baja" },
      { id: "m04-escalamiento-distancias", codigo: "M04", titulo: "Escalamiento, distancias y similitud", prioridad: "alta" },
      { id: "m05-hipotesis-una-poblacion", codigo: "M05", titulo: "Pruebas de hipótesis: marco general y una población", prioridad: "alta" },
      { id: "m06-hipotesis-dos-poblaciones", codigo: "M06", titulo: "Pruebas de hipótesis: dos poblaciones", prioridad: "alta" },
      { id: "m07-errores-potencia", codigo: "M07", titulo: "Errores tipo I/II y potencia", prioridad: "alta" },
      { id: "m08-t2-hotelling", codigo: "M08", titulo: "Inferencia sobre el vector de medias: T² de Hotelling", prioridad: "media" },
      { id: "m09-pca", codigo: "M09", titulo: "Análisis de componentes principales", prioridad: "alta" },
      { id: "m10-analisis-factorial", codigo: "M10", titulo: "Análisis factorial", prioridad: "alta" }
    ]
  },
  {
    id: "P2", orden: 2, nombre: "Prueba 2", estado: "definida", acumulativa: false,
    nota: "Reparto declarado por el estudiante (clases 5.1 a 7.2 y MANOVA.pdf). ANOVA de un factor (M18) confirmado en P2 (2026-10-08). <strong>Por confirmar:</strong> si la introducción al diseño de experimentos (M17) entra en P2.",
    modulos: [
      { id: "m11-conglomerados-distancias", codigo: "M11", titulo: "Análisis de conglomerados: definición, pasos, distancias y estandarización", prioridad: "alta" },
      { id: "m12-jerarquico-aglomerativo", codigo: "M12", titulo: "Clustering jerárquico aglomerativo", prioridad: "alta" },
      { id: "m13-k-medias", codigo: "M13", titulo: "K-medias y elección de k", prioridad: "alta" },
      { id: "m14-diana", codigo: "M14", titulo: "DIANA (desagregativo)", prioridad: "alta" },
      { id: "m15-lda", codigo: "M15", titulo: "Clasificación supervisada: LDA", prioridad: "alta" },
      { id: "m16-qda-nb-validacion", codigo: "M16", titulo: "QDA, Naive Bayes y validación", prioridad: "alta" },
      { id: "m17-diseno-experimentos", codigo: "M17", titulo: "Diseño de experimentos: introducción", prioridad: "baja", nota: "por confirmar si entra en P2" },
      { id: "m18-anova-un-factor", codigo: "M18", titulo: "ANOVA de un factor, comparaciones múltiples y supuestos", prioridad: "alta" },
      { id: "m19-manova", codigo: "M19", titulo: "MANOVA", prioridad: "baja" }
    ]
  },
  {
    id: "P3", orden: 3, nombre: "Prueba 3", estado: "sin definir", acumulativa: null,
    nota: "Las clases de P3 aún no están subidas. No se muestra contenido de estudio: solo se registra qué se evaluó en la Prueba 3 y el Examen anteriores (CONTENIDOS.md §6).",
    modulos: [],
    /* Temas que aparecieron en pruebas pasadas pero NO tienen clase en clases/.
       No son temario: cuando se suban las clases (Fase 7) pasan a "modulos". */
    observado: [
      { codigo: "M20", titulo: "Diseño en bloques completos al azar (DBCA)", fuente: [{ id: "PR-P3-E", loc: "pregunta 1" }, { id: "PR-P3-Q1" }] },
      { codigo: "M21", titulo: "Experimentos factoriales 2^k completos", fuente: [{ id: "PR-P3-E", loc: "pregunta 2" }, { id: "PR-P3-Q2" }] },
      { codigo: "M22", titulo: "Factorial fraccionado 2^(k−p)", fuente: [{ id: "PR-EX-E", loc: "pregunta 3.1" }, { id: "PR-EX-Q3" }] },
      { codigo: "M23", titulo: "Metodología de superficie de respuesta (Box–Behnken)", fuente: [{ id: "PR-EX-E", loc: "pregunta 3.2" }, { id: "PR-EX-Q3" }] },
      { codigo: "M24", titulo: "Árboles de regresión y bosques aleatorios", fuente: [{ id: "PR-P3-E", loc: "pregunta 3" }, { id: "PR-P3-Q3" }] }
    ]
  }
]);
