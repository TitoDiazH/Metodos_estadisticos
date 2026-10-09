/* ============================================================================
   config.js — ÚNICO lugar con los valores configurables de la plataforma.
   Los marcados como SUPUESTO no están confirmados por ningún archivo del curso
   (ver CONTENIDOS.md §4.2 y §5). Se cambian aquí y la app entera los respeta.
   ========================================================================== */
window.PLATAFORMA = window.PLATAFORMA || {};

PLATAFORMA.config = {
  VERSION_APP: "1.0.0",
  CURSO: "Métodos Estadísticos para la Gestión · UAndes · 2026-20",

  /* ── Almacenamiento ─────────────────────────────────────────────────── */
  PREFIJO_STORAGE: "me-estudio:",
  VERSION_ESQUEMA: 2,            // subir al cambiar la forma del estado + agregar migración en store.js

  /* ── Escala de notas ────────────────────────────────────────────────
     Nota 4,0 con 50 % de exigencia: confirmado por el estudiante (2026-10-08).
     SUPUESTO que queda: la forma de la escala entre esos puntos (lineal por tramos). */
  NOTA_MIN: 1.0,
  NOTA_MAX: 7.0,
  NOTA_APROBACION: 4.0,          // confirmado por el estudiante
  PORCENTAJE_APROBACION: 50,     // confirmado por el estudiante: % de logro que equivale a la nota de aprobación

  /* ── Tamaños de las evaluaciones ────────────────────────────────────── */
  N_PREGUNTAS_EXAMEN: 30,        // SUPUESTO
  N_PREGUNTAS_DESAFIO: 10,
  N_PREGUNTAS_DIAGNOSTICO: 10,
  MINUTOS_SIMULACRO: 60,         // SUPUESTO (cronómetro opcional)
  PUNTAJE_DESARROLLO: 6,         // Observado: cada pregunta documentada vale 6 puntos (CONTENIDOS.md §5)

  /* ── Selección de preguntas ─────────────────────────────────────────── */
  PESO_PRIORIDAD: { alta: 3, media: 2, baja: 1 },

  /* ── Dominio por módulo ─────────────────────────────────────────────── */
  DOMINIO_MIN_PREGUNTAS: 8,      // preguntas DISTINTAS mínimas (o todo el banco del módulo si es menor)
  DOMINIO_UMBRAL: 90,            // % desde el cual el módulo se considera dominado
  DOMINIO_PESOS: [3, 2, 1],      // peso del intento más reciente, del anterior, etc.

  /* ── Repaso espaciado simple (cajas de Leitner) ─────────────────────── */
  REPASO_INTERVALOS_DIAS: [0, 1, 3, 7],

  /* ── Interfaz ───────────────────────────────────────────────────────── */
  TAM_PAGINA: 20,                // elementos por página en listas largas

  /* Texto que la app muestra en Inicio para dejar claros los supuestos. */
  SUPUESTOS: [
    "Nota 4,0 con 50 % de exigencia: indicado por el estudiante. La forma de la escala 1–7 (lineal por tramos) es un supuesto: no figura en ningún archivo del curso.",
    "Examen de práctica de 30 preguntas y simulacro de 60 minutos: valores por defecto.",
    "Reparto de módulos por prueba: declarado por el estudiante; PCA y AF confirmados en P1; T² de Hotelling y ANOVA/MANOVA siguen «por confirmar» (CONTENIDOS.md §4.2).",
    "La prueba real es de desarrollo con lectura de salidas de R; las preguntas cerradas de la app son entrenamiento, no el formato real."
  ]
};
