/* ============================================================================
   Desarrollo · M17 Diseño de experimentos: introducción (P2) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m17-d001",
    modulo: "m17-diseno-experimentos",
    concepto: "m17-c02",
    dificultad: 1,
    origen: "nueva",
    titulo: "Identificar los elementos de un experimento (horneado)",
    enunciado: `<p>Una panadería quiere mejorar el volumen de su pan. Decide probar <strong>dos temperaturas</strong> de horno ($180$ y $200$ °C) y <strong>tres tiempos</strong> de fermentación ($30$, $45$ y $60$ minutos). Hornea $4$ panes con cada combinación, en orden aleatorio, y mide el volumen de cada pan. La humedad ambiente varía durante el día y no se puede controlar.</p><ol type="a"><li>Identifica la variable de respuesta, los factores controlables y sus niveles.</li><li>¿Cuántos tratamientos hay y cuántas corridas en total? ¿Cuál es la unidad experimental?</li><li>Identifica un factor de ruido y explica qué principios básicos del diseño se aplican (o podrían aplicarse).</li></ol>`,
    partes: [
      { titulo: "a) Respuesta, factores y niveles", puntos: 2, solucion: "<p>Variable de respuesta: <strong>volumen del pan</strong>.</p><p>Factores controlables: temperatura (2 niveles: $180$ y $200$ °C) y tiempo de fermentación (3 niveles: $30$, $45$ y $60$ min).</p>" },
      { titulo: "b) Tratamientos, corridas y unidad experimental", puntos: 2, solucion: String.raw`<p>Tratamiento = combinación de niveles: $2\times3=6$ tratamientos.</p><p>Con $4$ repeticiones: $6\times4=24$ corridas.</p><p>Unidad experimental: cada pan (la pieza a la que se aplica el tratamiento y sobre la que se mide la respuesta).</p>` },
      { titulo: "c) Factor de ruido y principios básicos", puntos: 2, solucion: "<p>Factor no controlable (ruido): la <strong>humedad ambiente</strong>.</p><p><strong>Repetición:</strong> 4 panes por tratamiento, lo que permite estimar el error aleatorio. <strong>Aleatorización:</strong> el orden aleatorio de horneado reparte el efecto de la humedad y asegura independencia de los errores. <strong>Bloqueo:</strong> podría hacerse por jornada (mañana/tarde) para neutralizar la humedad.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    fuente: [
      { id: "C7.1", loc: "páginas 10–17" }
    ]
  },
  {
    id: "m17-d002",
    modulo: "m17-diseno-experimentos",
    concepto: "m17-c04",
    dificultad: 1,
    origen: "nueva",
    titulo: "Observar vs. experimentar y matriz de diseño (campaña de correo)",
    enunciado: `<p>Un equipo de marketing quiere saber qué asunto de correo genera más aperturas. El analista A propone revisar los correos enviados el último año y comparar las tasas de apertura según el asunto usado. El analista B propone elegir $3$ asuntos, enviar cada uno a $5$ grupos de clientes escogidos al azar y medir la tasa de apertura.</p><ol type="a"><li>¿Cuál propuesta es observar y cuál experimentar? ¿Qué ventaja tiene la segunda?</li><li>Para la propuesta B: factor, niveles, tratamientos, repeticiones y tamaño de la matriz de diseño.</li><li>¿Qué diseño es y con qué técnica se analizan los datos? Indica las etapas del experimento.</li></ol>`,
    partes: [
      { titulo: "a) Observar vs. experimentar", puntos: 2, solucion: "<p>A es <strong>observar</strong> (estrategia pasiva: se monitorea lo que ya ocurrió). B es <strong>experimentar</strong> (estrategia activa: se hacen cambios deliberados y se mide su efecto).</p><p>Ventaja de B: al asignar los asuntos al azar, las diferencias pueden atribuirse al asunto y no a otros factores (época del año, tipo de cliente) que en los datos históricos están mezclados.</p>" },
      { titulo: "b) Elementos del diseño de la propuesta B", puntos: 2, solucion: String.raw`<p>Un factor (asunto del correo) con $3$ niveles ⇒ $3$ tratamientos. $5$ repeticiones por tratamiento ⇒ matriz de diseño de $3\times5=15$ corridas, en orden aleatorio.</p><p>Respuesta: tasa de apertura. Unidad experimental: cada grupo de clientes.</p>` },
      { titulo: "c) Tipo de diseño, análisis y etapas", puntos: 2, solucion: String.raw`<p>Un solo factor, sin bloques: <strong>diseño completamente al azar</strong>; se analiza con <strong>ANOVA de un factor</strong> ($H_0:\mu_1=\mu_2=\mu_3$).</p><p>Etapas: planeación (objetivo, factores, niveles, respuesta, diseño) → análisis (ANOVA y verificación de supuestos) → interpretación y conclusiones.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    fuente: [
      { id: "C7.1", loc: "páginas 4–9 y 18–22" }
    ]
  }
]);
