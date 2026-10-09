/* ============================================================================
   PLANTILLA · Módulo de Aprender  →  copiar a  data/modulos/mNN-slug.js
   1) Reemplaza NN, slug y los textos. 2) El id debe estar en el temario de su
   prueba (data/pruebas.js). 3) node tools/verificar_todo.js
   Texto: HTML simple + LaTeX entre $…$ o $$…$$. Usa String.raw`…` para no tener
   que duplicar las barras de LaTeX (dentro NO puede aparecer la secuencia "${").
   Ver filas de CONTENIDOS.md:  node tools/cobertura.js --filas MNN
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "mNN-slug",                    // único y estable; prefijo mNN = código MNN de CONTENIDOS.md
  orden: NN,
  titulo: "Título del módulo",
  descripcion: "Una o dos frases: qué problema resuelve.",
  pruebas: ["P1"],                   // debe coincidir con data/pruebas.js
  prioridad: "alta",                 // alta | media | baja (criterio: CONTENIDOS.md)
  fuentes: [{ id: "C1", loc: "slides 1–10" }],
  // aviso: "Texto opcional destacado al inicio (p. ej. «por confirmar si entra en P2»).",
  // sinCobertura: [{ ref: "MNN.1", motivo: "Solo contexto." }],   // filas de CONTENIDOS.md que no se desarrollan

  conceptos: [
    {
      id: "mNN-c01",                 // único; las preguntas lo referencian con «concepto»
      titulo: "Nombre del concepto",
      cubre: ["MNN.1"],              // fila(s) de CONTENIDOS.md §2 que desarrolla
      simple: String.raw`<p>En simple: la idea en una o dos frases, sin fórmulas.</p>`,
      formal: String.raw`<p>Definición formal con símbolos definidos: $\bar x=\dfrac{1}{n}\sum x_i$.</p>`,
      ejemplo: String.raw`<p>Ejemplo paso a paso (idealmente el de la clase o ayudantía).</p>`,
      // Figura (solo si ayuda a entender): un tipo de js/figuras*.js con sus datos, o varios en una lista [ {…}, {…} ].
      // «donde» la ubica tras la definición formal (por defecto) o tras el ejemplo. Tipos y parámetros: LEEME.md.
      // figura: { tipo: "distancias", donde: "ejemplo", a: [2, 3], b: [6, 8], pie: "Qué hay que mirar en la figura." },
      // También sirve un SVG escrito a mano: figura: `<svg viewBox="0 0 420 250" role="img" aria-label="…">…</svg><figcaption>…</figcaption>`,
      r: {
        nota: "Qué hace el código y de qué script sale.",
        codigo: `x <- c(1, 2, 3)
mean(x)`,
        // salida: `[1] 2`,          // solo si existe una receta en data/rlab con esa misma salida:
        // rlab: "r-mNN-algo"
      },
      lectura: String.raw`<p>Cómo se lee la salida de R, línea por línea.</p>`,
      errores: ["Error frecuente 1 (ojalá tomado de una pauta)."],
      quepasa: [{ si: "…cambia tal condición?", entonces: "<p>Entonces ocurre tal cosa.</p>" }],
      memoriza: String.raw`<p>El dato que hay que saber de memoria.</p>`,
      // externo: [{ titulo: "Título", url: "https://…", consultado: "2026-10-08", html: "<p>Nota 🌐 no evaluable.</p>" }],
      comprueba: {                   // mini-pregunta (no cuenta en el progreso). tipo: "vf" con correcta true/false también sirve
        enunciado: "Pregunta corta de comprobación.",
        opciones: ["Correcta", "Distractor 1", "Distractor 2", "Distractor 3"],
        correcta: 0,                 // la app baraja las opciones
        explicacion: "Por qué."
      },
      fuente: [{ id: "C1", loc: "slide 3" }]
    }
  ],

  // cuando: String.raw`<p>HTML: tabla o árbol «¿cuándo usar qué?».</p>`,
  // errores: [{ texto: "Error frecuente del módulo.", fuente: [{ id: "PR-P1-Q1", loc: "afirmación 1" }] }]
});
