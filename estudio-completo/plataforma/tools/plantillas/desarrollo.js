/* ============================================================================
   PLANTILLA · Preguntas de desarrollo  →  copiar a  data/desarrollo/mNN-slug.js
   El estudiante la resuelve EN PAPEL. En la app la pregunta se divide en "partes"
   que se desbloquean una a una: cada parte está oculta; al abrirla se ve su
   solución y se marca «correcta / incorrecta»; recién ahí se habilita la siguiente.
   Nota estimada = puntos de las partes correctas / puntos totales.

   Cómo partir una pregunta:
   · una parte = un paso que la pauta puntúa por separado (hipótesis, estadístico,
     decisión, conclusión…) o un inciso (a, b, c);
   · el «titulo» se ve ANTES de abrirla: debe decir qué hay que hacer, sin revelar
     el resultado ("Estadístico con n = 100", no "t = 0,66");
   · la «solucion» debe bastar para que el estudiante decida si su parte está bien;
   · mínimo 2 partes. Si los puntajes vienen de una pauta, dilo en «escala»; si no,
     son una regla de la plataforma y también hay que decirlo.
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "mNN-d001", modulo: "mNN-slug", concepto: "mNN-c01", dificultad: 2, origen: "curso",
    titulo: "Título corto de la pregunta",
    enunciado: String.raw`<p>Enunciado completo, como en la prueba. Puede llevar incisos:</p>
<ol type="a"><li>Primer inciso.</li><li>Segundo inciso.</li></ol>`,
    // codigoR: `…`,  salidaR: `…`,  salidaDe: `…`  (o salidaFuente: "curso")
    partes: [
      { titulo: "a) Hipótesis", puntos: 2,
        solucion: String.raw`<p>$H_0:\mu=\mu_0$ contra $H_1:\mu\neq\mu_0$.</p>` },
      { titulo: "a) Estadístico de prueba", puntos: 2,
        solucion: String.raw`<p>Cálculo paso a paso con el resultado.</p>` },
      { titulo: "b) Decisión y conclusión en contexto", puntos: 2,
        solucion: String.raw`<p>Comparación con el valor crítico y conclusión redactada como en las pautas.</p>` }
    ],
    // comentario: "Nota opcional que se muestra al terminar de corregir todas las partes.",
    escala: "Puntajes de la pauta (P1, pregunta 2).",
    // verifica: [{ que: "t", js: "…", esperado: 0, tol: 0.01 }],
    fuente: [{ id: "PR-P1-Q2", loc: "a–c" }]
  }
]);
