/* GENERADO por tools/generar_escenas.js desde tools/escenas/m23-consejos.js — no editar a mano. */
PLATAFORMA.registrar("escena", {
 "audio": "audio-m23-consejos",
 "escenas": [
  {
   "en": "inicio",
   "html": "<div class=\"pz-centro\"><p class=\"pz-kicker\">Consejos para la prueba</p><h3 class=\"pz-t\" style=\"font-size:2.1em\">Superficie de respuesta</h3><p class=\"pz-st\">Resumen y receta paso a paso · Prueba 4</p></div>"
  },
  {
   "en": "inst",
   "html": "<p class=\"pz-kicker\">Qué te van a preguntar</p><h3 class=\"pz-t\">Tres partes</h3><ul class=\"pz-lista\"><li data-en=\"i1\">Interpretar el modelo de 2.º orden: lineales, cuadráticos, interacciones; ¿curvatura? ¿interacción?</li><li data-en=\"i2\">Leer la salida de R: p, términos significativos, F, R², ¿es adecuado?</li><li data-en=\"i3\">Punto estacionario <strong>a mano</strong> y clasificarlo con la <strong>hessiana</strong></li></ul><p class=\"pz-nota\" data-en=\"i3@6\">Datos: libro guía cap. 12, ej. 22–29 (todos en Desarrollo con video)</p>"
  },
  {
   "en": "dis",
   "html": "<p class=\"pz-kicker\">Reconocer el diseño</p><h3 class=\"pz-t\">¿Qué diseño es?</h3><ul class=\"pz-lista\"><li data-en=\"d1\"><strong>2^k + centro</strong>: esquinas ±1 y centro repetido · explora, no estima curvatura</li><li data-en=\"d2\"><strong>Central compuesto</strong>: esquinas + axiales (±α) + centro · rotable si α = (2^k)^¼ (k = 2: 1,414)</li><li data-en=\"d3\"><strong>Box-Behnken</strong>: medio de las aristas + centro, 3 niveles</li></ul><div class=\"pz-f\" data-en=\"cod\">$$x=\\dfrac{X-\\text{centro}}{\\text{semirrango}}\\qquad X=\\text{centro}+x\\cdot\\text{semirrango}$$</div>"
  },
  {
   "en": "sal",
   "html": "<p class=\"pz-kicker\">Leer la salida</p><h3 class=\"pz-t\">Términos y adecuación</h3><ul class=\"pz-lista\"><li data-en=\"s1\">Cuadrático significativo ⇒ <strong>curvatura</strong> (− hacia abajo, + hacia arriba)</li><li data-en=\"s2\">Interacción significativa ⇒ el efecto de un factor depende del otro</li><li data-en=\"s3\">F global · R² · R² ajustado</li><li data-en=\"s4\">Falta de ajuste (réplicas del centro): p alto es lo deseado</li></ul><p class=\"pz-nota pz-ok\" data-en=\"pista\">Pista: cuadráticos del mismo signo ⇒ máx. o mín.; de signos opuestos ⇒ silla</p>"
  },
  {
   "en": "pe",
   "html": "<p class=\"pz-kicker\">Punto estacionario</p><h3 class=\"pz-t\">Derivar · igualar a 0 · resolver</h3><div class=\"pz-f\" data-en=\"pe1\">$$\\frac{\\partial\\hat y}{\\partial x_1}=b_1+2b_{11}x_1+b_{12}x_2=0\\qquad\\frac{\\partial\\hat y}{\\partial x_2}=b_2+b_{12}x_1+2b_{22}x_2=0$$</div><div class=\"pz-f\" data-en=\"cramer\">$$D=4b_{11}b_{22}-b_{12}^2=\\det H$$</div><div class=\"pz-f\" data-en=\"cr1\">$$x_1^*=\\dfrac{b_{12}b_2-2b_{22}b_1}{D}\\qquad x_2^*=\\dfrac{b_{12}b_1-2b_{11}b_2}{D}$$</div><div class=\"pz-f\" data-en=\"sinint\">$$\\text{sin interacción: }x_i^*=-\\dfrac{b_i}{2b_{ii}}$$</div><div class=\"pz-f\" data-en=\"yest\">$$\\hat y_s=b_0+\\tfrac12\\sum_i b_ix_i^*$$</div>"
  },
  {
   "en": "hes",
   "html": "<p class=\"pz-kicker\">Clasificar</p><h3 class=\"pz-t\">La hessiana</h3><div class=\"pz-f\" data-en=\"hes\">$$H=\\begin{pmatrix}2b_{11}&b_{12}\\\\b_{12}&2b_{22}\\end{pmatrix}=2B,\\qquad B=\\begin{pmatrix}b_{11}&b_{12}/2\\\\b_{12}/2&b_{22}\\end{pmatrix}$$</div><ul class=\"pz-lista\"><li data-en=\"h2\">det H &gt; 0 y h₁₁ &lt; 0 ⇒ <strong>máximo</strong> · det H &gt; 0 y h₁₁ &gt; 0 ⇒ <strong>mínimo</strong> · det H &lt; 0 ⇒ <strong>silla</strong></li><li data-en=\"h3\">k = 3: valores propios — todos &lt; 0 máx · todos &gt; 0 mín · mezclados silla</li></ul><p class=\"pz-nota pz-mal\" data-en=\"ojob\">B lleva b₁₂/2 fuera de la diagonal; H = 2B lleva b₁₂ completo</p>"
  },
  {
   "en": "opt",
   "html": "<p class=\"pz-kicker\">¿Es el óptimo?</p><h3 class=\"pz-t\">Dos preguntas antes de recomendar</h3><ul class=\"pz-lista\"><li data-en=\"o1\">¿Es del tipo buscado? (máximo si se maximiza)</li><li data-en=\"o2\">¿Está dentro de la región? Si algo falla ⇒ <strong>frontera</strong> (esquinas y bordes), sin extrapolar</li><li data-en=\"o3\">Confirmar con corridas reales</li></ul>"
  },
  {
   "en": "err",
   "html": "<p class=\"pz-kicker\">Errores típicos</p><h3 class=\"pz-t\">Lo que más resta puntaje</h3><ul class=\"pz-lista\"><li data-en=\"e1\">Olvidar el 2 al derivar x²</li><li data-en=\"e2\">Dar el punto en codificado cuando piden condiciones de operación</li><li data-en=\"e3\">Recomendar una silla o un punto fuera de la región</li><li data-en=\"e4\">Descartar el modelo porque un lineal no es significativo (jerarquía)</li></ul>"
  },
  {
   "en": "fin",
   "html": "<p class=\"pz-kicker\">Para cerrar</p><h3 class=\"pz-t\">La receta</h3><ul class=\"pz-lista\"><li data-en=\"fin\">Diseño y codificación</li><li data-en=\"fin@3\">Términos y significancia · F · R² · falta de ajuste</li><li data-en=\"fin@6\">Derivar → igualar a 0 → resolver</li><li data-en=\"fin@8\">Hessiana / valores propios</li><li data-en=\"fin@9\">Unidades reales · ¿tipo buscado y dentro?</li></ul>"
  }
 ]
});
