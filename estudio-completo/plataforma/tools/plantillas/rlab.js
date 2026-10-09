/* ============================================================================
   PLANTILLA · Laboratorio R  →  copiar a  data/rlab/mNN-tema.js
   La salida NUNCA se inventa:
     ejecutable: true + origenSalida: "ejecutada" → el verificador corre «codigo»
        en R y exige que «salida» coincida línea por línea (usa set.seed si hay azar);
     origenSalida: "curso" → copiada textualmente de un archivo del curso (cítalo).
   Si el código necesita paquetes, decláralos en «paquetes».
   ========================================================================== */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-mNN-algo", modulo: "mNN-slug", tema: "Nombre del tema (agrupa las recetas)",
    titulo: "Qué hace esta receta",
    descripcion: "De qué script sale y qué se cambió, si algo.",
    // aviso: "Esta función aparece en la ayudantía, no en clases.",
    funciones: ["mean"],
    // paquetes: ["cluster"],
    codigo: `x <- c(2, 4, 9)
mean(x)`,
    salida: `[1] 5`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<p>Cómo se lee cada parte de la salida.</p>`,
    fuente: [{ id: "C1", loc: "slide 3" }]
  }
]);
