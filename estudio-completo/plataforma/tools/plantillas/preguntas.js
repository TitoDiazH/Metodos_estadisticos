/* ============================================================================
   PLANTILLA · Banco de preguntas  →  copiar a  data/preguntas/mNN-slug.js
   (si crece mucho: mNN-slug-b.js, mNN-slug-c.js… y volver a generar el manifiesto)

   REGLAS
   · id ÚNICO y ESTABLE (mNN-q001…): jamás se renumera ni se reutiliza. Para
     eliminar una pregunta: retirada: true.
   · origen: "curso" (de pauta/ejercicio/slide) | "variacion" (+ base:[cita])
     | "nueva" (creada sobre un concepto del curso; la fuente es la del concepto).
   · Todo número se recalcula en «verifica»; toda salida de R mostrada lleva
     «salidaDe» (código que la produce) o salidaFuente:"curso".
   · Las opciones se barajan solas: deja la correcta donde quieras e indica su índice.
   · pruebas y prioridad se heredan del módulo; solo escríbelas para cambiarlas.
   ========================================================================== */
PLATAFORMA.registrar("pregunta", [
  { // ── Alternativas (una correcta)
    id: "mNN-q001", modulo: "mNN-slug", concepto: "mNN-c01", tipo: "alternativas", dificultad: 1, origen: "nueva",
    enunciado: "Enunciado con LaTeX si hace falta.",
    opciones: ["Opción correcta", "Distractor", "Distractor", "Distractor"],
    correcta: 0,
    explicacion: "Paso a paso de por qué.",
    distractores: ["", "Por qué esta no.", "Por qué esta no.", "Por qué esta no."],   // opcional
    fuente: [{ id: "C1", loc: "slide 3" }]
  },
  { // ── Verdadero / Falso con justificación
    id: "mNN-q002", modulo: "mNN-slug", concepto: "mNN-c01", tipo: "vf", dificultad: 1, origen: "curso",
    enunciado: "Afirmación a evaluar.",
    correcta: false,
    explicacion: "La justificación (es lo que tiene puntaje en la prueba).",
    fuente: [{ id: "PR-P1-Q1", loc: "afirmación 1" }]
  },
  { // ── Selección múltiple (varias correctas)
    id: "mNN-q003", modulo: "mNN-slug", tipo: "multiple", dificultad: 2, origen: "nueva",
    enunciado: "¿Cuáles son correctas?",
    opciones: ["Correcta", "Correcta", "Incorrecta", "Incorrecta"],
    correcta: [0, 1],
    explicacion: "Por qué.",
    fuente: [{ id: "C1", loc: "slide 3" }]
  },
  { // ── Cálculo (respuesta numérica con tolerancia)
    id: "mNN-q004", modulo: "mNN-slug", tipo: "calculo", dificultad: 2, origen: "variacion",
    base: [{ id: "EJ-P1", loc: "P5" }],
    enunciado: String.raw`Calcula la media de $x=(2,4,9)$.`,
    respuesta: 5, tolerancia: 0.01, unidad: "",
    explicacion: String.raw`$(2+4+9)/3=5$.`,
    /* js: expresión con media, suma, varianza, desv, cov, cor, dist, manhattan, Math.*  ·  r: código que imprime UN número con cat() */
    verifica: [{ que: "media", js: "media([2,4,9])", esperado: 5, tol: 0.0001 }],
    fuente: [{ id: "C1", loc: "slide 3" }]
  },
  { // ── Interpretación de salida de R
    id: "mNN-q005", modulo: "mNN-slug", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
    enunciado: "¿Qué se concluye de esta salida?",
    salidaR: `[1] 5`,
    salidaDe: `mean(c(2, 4, 9))`,          // el verificador ejecuta esto y lo compara con salidaR
    opciones: ["Lectura correcta", "Lectura incorrecta", "Lectura incorrecta", "Lectura incorrecta"],
    correcta: 0,
    explicacion: "Cómo se lee.",
    fuente: [{ id: "C1", loc: "slide 3" }]
  },
  { // ── Lectura / corrección de código R
    id: "mNN-q006", modulo: "mNN-slug", tipo: "codigo-R", dificultad: 2, origen: "nueva",
    enunciado: "¿Qué hace (o qué le falta a) este código?",
    codigoR: `x <- c(2, 4, 9)
mean(x)`,
    opciones: ["Respuesta correcta", "Distractor", "Distractor", "Distractor"],
    correcta: 0,
    explicacion: "Por qué.",
    fuente: [{ id: "C1", loc: "slide 3" }]
  },
  { // ── Completar código R (un texto por cada ___; cada hueco acepta varias formas)
    id: "mNN-q007", modulo: "mNN-slug", tipo: "completar-R", dificultad: 1, origen: "curso",
    enunciado: "Completa el código.",
    codigoR: `x <- c(2, 4, 9)
___(x)   # promedio`,
    huecos: [["mean"]],
    explicacion: "<code>mean()</code> calcula el promedio.",
    fuente: [{ id: "C1", loc: "slide 3" }]
  }
  /* Campos opcionales en cualquier pregunta:
     desafio: true            → entra al modo 🔥 Desafío (también las de dificultad 3)
     prioridad: "media"       → cambia el peso en el examen
     ordenFijo: true          → no barajar las opciones
     retirada: true           → deja de servirse; el id se conserva */
]);
