/* ============================================================================
   M17 · Diseño de experimentos: introducción (P2, por confirmar)
   Fuentes abiertas para redactar: C7.1 (PDF) · texto base: Gutiérrez Pulido y De la
   Vara (2008), citado en la propia clase. No hay código R en esta clase.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m17-diseno-experimentos",
  orden: 17,
  titulo: "Diseño de experimentos: introducción",
  descripcion: "Qué es experimentar en lugar de solo observar, el vocabulario del diseño de experimentos y los principios básicos (aleatorizar, repetir, bloquear).",
  pruebas: ["P2"],
  prioridad: "baja",
  aviso: "Por confirmar: no se sabe si el diseño de experimentos entra en la Prueba 2 (CONTENIDOS.md §4.2). En pruebas pasadas, el diseño de experimentos aparece en la Prueba 3.",
  fuentes: [{ id: "C7.1", loc: "páginas 2–22" }],

  conceptos: [
    {
      id: "m17-c01",
      titulo: "Observar vs. experimentar; definición de DDE",
      cubre: ["M17.1"],
      simple: String.raw`<p>Para mejorar un proceso hay dos caminos: <strong>observar</strong> (monitorear y esperar señales útiles; estrategia pasiva) o <strong>experimentar</strong> (hacer cambios deliberados para provocar esas señales; estrategia activa). El diseño de experimentos (DDE) es la segunda.</p>`,
      formal: String.raw`<ul>
  <li>DDE: conjunto de técnicas <strong>activas</strong> que manipulan el proceso para que entregue la información necesaria. Consiste en planear y realizar pruebas para generar datos que, analizados estadísticamente, den evidencia objetiva para responder las preguntas del experimentador.</li>
  <li>Estudia el efecto de distintas situaciones experimentales sobre respuestas cuantitativas.</li>
  <li><strong>Problemas típicos:</strong> comparar materiales o instrumentos de medición; determinar factores que impactan el producto final; encontrar condiciones de operación que reduzcan defectos; apoyar el diseño de productos o procesos; caracterizar nuevos materiales.</li>
  <li><strong>Historia:</strong> Fisher (1935; métodos para muestras pequeñas y varios factores a la vez, agricultura); Box y Wilson (1951; superficie de respuesta y experimentación secuencial); Deming e Ishikawa (década de 1980; estadística en calidad, industria japonesa).</li>
</ul>`,
      errores: ["Hacer pruebas «sobre la marcha» por ensayo y error: el DDE es un plan experimental."],
      memoriza: String.raw`<p>Observar = pasivo; experimentar = activo. Fisher (1935) · Box y Wilson (1951) · Deming e Ishikawa (1980).</p>`,
      comprueba: {
        enunciado: "¿Cuál es la diferencia entre observar y experimentar un proceso?",
        opciones: ["Experimentar provoca señales mediante cambios deliberados; observar espera señales", "Observar usa ANOVA y experimentar no", "Experimentar es más barato", "Son sinónimos"],
        correcta: 0,
        explicacion: "Observar es una estrategia pasiva; experimentar, una activa."
      },
      fuente: [{ id: "C7.1", loc: "páginas 4–9" }]
    },

    {
      id: "m17-c02",
      titulo: "Terminología básica",
      cubre: ["M17.2"],
      simple: String.raw`<p>El diseño de experimentos tiene un vocabulario propio que hay que manejar con precisión.</p>`,
      formal: String.raw`<table class="tabla"><thead><tr><th>Término</th><th>Significado</th></tr></thead><tbody>
<tr><td>Experimento</td><td>Cambio en las condiciones de operación para medir su efecto sobre una o varias propiedades del resultado</td></tr>
<tr><td>Unidad experimental</td><td>Pieza(s) o muestra(s) que generan un valor representativo del resultado (p. ej., un lote de piezas, no una sola)</td></tr>
<tr><td>Variable de respuesta</td><td>Mide el efecto de cada prueba (calidad del producto, desempeño del proceso)</td></tr>
<tr><td>Factor controlable</td><td>Variable que se puede fijar en un nivel dado (variables de entrada, de diseño, parámetros)</td></tr>
<tr><td>Factor no controlable (ruido)</td><td>No se controla durante el experimento: luz, humedad, ánimo de operadores, calidad del material del proveedor</td></tr>
<tr><td>Niveles</td><td>Valores asignados a cada factor</td></tr>
<tr><td>Tratamiento</td><td>Combinación de niveles de todos los factores (p. ej., velocidad × temperatura, cada uno en 2 niveles ⇒ 4 tratamientos)</td></tr>
<tr><td>Error aleatorio</td><td>Variabilidad no explicada por los factores: causas comunes, efecto pequeño de factores no estudiados, variabilidad de la medición</td></tr>
<tr><td>Error experimental</td><td>Error aleatorio más los errores graves cometidos por el experimentador</td></tr></tbody></table>`,
      ejemplo: String.raw`<p>Envase de plástico (C7.1): respuesta = dureza; factores controlables = condiciones de operación del proceso; se prueban combinaciones de niveles elegidas con un diseño adecuado para ver qué factores afectan la dureza y cómo.</p>`,
      errores: ["Confundir nivel con tratamiento: el tratamiento es una combinación de niveles de todos los factores."],
      memoriza: String.raw`<p>Tratamiento = combinación de niveles. Con factores de $a$ y $b$ niveles hay $a\cdot b$ tratamientos. Ruido = no controlable.</p>`,
      comprueba: {
        enunciado: "Se estudian velocidad (2 niveles) y temperatura (2 niveles). ¿Cuántos tratamientos hay?",
        opciones: ["4", "2", "3", "8"],
        correcta: 0,
        explicacion: "Cada combinación de niveles es un tratamiento: 2 × 2 = 4."
      },
      verifica: [{ que: "tratamientos 2×2", js: "2*2", esperado: 4, tol: 1e-9 }],
      fuente: [{ id: "C7.1", loc: "páginas 10–14" }]
    },

    {
      id: "m17-c03",
      titulo: "Aleatorización, repetición y bloqueo",
      figura: { tipo: "bloques", donde: "ejemplo", bloques: ["Operador 1", "Operador 2", "Operador 3", "Operador 4"],
        tratamientos: ["Máquina A", "Máquina B", "Máquina C", "Máquina D"],
        ordenes: [["Máquina C", "Máquina A", "Máquina D", "Máquina B"], ["Máquina B", "Máquina D", "Máquina A", "Máquina C"],
          ["Máquina A", "Máquina C", "Máquina B", "Máquina D"], ["Máquina D", "Máquina B", "Máquina C", "Máquina A"]],
        pie: "Estrategia 2 del ejemplo: cada operador (bloque) prueba las 4 máquinas, en un orden sorteado. El orden dibujado es solo ilustrativo." },
      cubre: ["M17.3"],
      simple: String.raw`<p>Tres principios básicos: <strong>aleatorizar</strong> el orden de las corridas, <strong>repetir</strong> los tratamientos y <strong>bloquear</strong> los factores que pueden alterar la respuesta pero no son el objeto de estudio.</p>`,
      formal: String.raw`<ul>
  <li><strong>Aleatorización:</strong> correr los experimentos en orden aleatorio; aumenta la posibilidad de que se cumpla el supuesto de independencia de los errores.</li>
  <li><strong>Repetición:</strong> correr más de una vez un tratamiento.</li>
  <li><strong>Bloqueo:</strong> nulificar o tomar en cuenta los factores que pueden afectar la respuesta.</li>
</ul>`,
      ejemplo: String.raw`<p>Comparar 4 máquinas teniendo en cuenta al operador. Estrategia 1: un mismo operador hace todas las pruebas. Estrategia 2: 4 operadores (4 bloques), cada uno prueba las 4 máquinas en orden aleatorio. Cada operador es un bloque porque sus mediciones se parecen más entre sí que las de operadores distintos.</p>`,
      errores: ["Creer que bloquear es lo mismo que aleatorizar: se aleatoriza dentro de cada bloque."],
      memoriza: String.raw`<p>Aleatorización → independencia de errores. Repetición → varias corridas por tratamiento. Bloqueo → neutraliza un factor de molestia (operador, día…).</p>`,
      comprueba: {
        enunciado: "¿Para qué sirve aleatorizar el orden de las corridas?",
        opciones: ["Para favorecer el supuesto de independencia de los errores", "Para reducir el número de tratamientos", "Para eliminar el error aleatorio", "Para aumentar el número de niveles"],
        correcta: 0,
        explicacion: "Reparte los efectos ambientales y temporales entre los tratamientos."
      },
      fuente: [{ id: "C7.1", loc: "página 17" }]
    },

    {
      id: "m17-c04",
      titulo: "Etapas, matriz de diseño y selección del diseño",
      cubre: ["M17.4"],
      simple: String.raw`<p>Un experimento tiene tres etapas: planear, analizar e interpretar. La <strong>matriz de diseño</strong> es el arreglo de tratamientos (con sus repeticiones) que se van a correr.</p>`,
      formal: String.raw`<ul>
  <li><strong>Planeación:</strong> entender y delimitar el problema, elegir variables de respuesta y factores; termina con la especificación de los tratamientos y la organización del trabajo.</li>
  <li><strong>Análisis:</strong> los resultados son observaciones muestrales; se usa inferencia para ver si las diferencias son suficientes para garantizar diferencias poblacionales. Técnica central: <strong>ANOVA</strong>.</li>
  <li><strong>Interpretación:</strong> contrastar las hipótesis iniciales con los resultados, verificar supuestos y elegir el tratamiento ganador.</li>
</ul>
<p><strong>Cinco aspectos que más influyen en elegir el diseño:</strong> (1) el objetivo del experimento; (2) el número de factores; (3) el número de niveles por factor; (4) los efectos que interesa investigar; (5) costo, tiempo y precisión deseada.</p>
<p><strong>Según el objetivo:</strong> comparar dos o más tratamientos · estudiar el efecto de varios factores · hallar el punto óptimo · optimizar una mezcla · hacer el producto insensible a factores no controlables.</p>`,
      errores: ["Olvidar que los resultados experimentales son muestrales y requieren inferencia."],
      memoriza: String.raw`<p>Etapas: planeación → análisis (ANOVA) → interpretación. 5 criterios de elección: objetivo, nº de factores, nº de niveles, efectos de interés, costo/tiempo/precisión.</p>`,
      comprueba: {
        enunciado: "¿Cuál es la técnica estadística central en el análisis de los experimentos?",
        opciones: ["ANOVA", "PCA", "Clustering", "Regresión logística"],
        correcta: 0,
        explicacion: "C7.1: el análisis de varianza (ANOVA)."
      },
      fuente: [{ id: "C7.1", loc: "páginas 18–22" }]
    }
  ]
});
