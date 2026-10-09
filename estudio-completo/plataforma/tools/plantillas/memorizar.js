/* ============================================================================
   PLANTILLA · Memorizar  →  copiar a  data/memorizar/mNN-slug.js
   categoria: "formula" | "umbral" | "decision" | "funcion-R" | "salida" | "flashcard"
   Las cinco primeras usan titulo + contenido; "flashcard" usa frente + reverso.
   ========================================================================== */
PLATAFORMA.registrar("memorizar", [
  {
    id: "mNN-mem-01", modulo: "mNN-slug", categoria: "formula",
    titulo: "Nombre de la fórmula",
    contenido: String.raw`$\bar x=\dfrac{1}{n}\sum x_i$ · condiciones de uso.`,
    fuente: [{ id: "C1", loc: "slide 3" }]
  },
  {
    id: "mNN-mem-02", modulo: "mNN-slug", categoria: "funcion-R",
    titulo: "<code>mean(x)</code>",
    contenido: "Qué recibe y qué devuelve.",
    fuente: [{ id: "C1", loc: "slide 3" }]
  },
  {
    id: "mNN-fc-01", modulo: "mNN-slug", categoria: "flashcard",
    frente: "Pregunta de la tarjeta",
    reverso: "Respuesta de la tarjeta.",
    fuente: [{ id: "C1", loc: "slide 3" }]
  }
]);
