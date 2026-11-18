/* GENERADO por tools/generar_escenas.js desde tools/escenas/m09-consejos.js — no editar a mano. */
PLATAFORMA.registrar("escena", {
 "audio": "audio-m09-consejos",
 "escenas": [
  {
   "en": "inicio",
   "html": "<div class=\"pz-centro\"><p class=\"pz-kicker\">Consejos para la prueba</p><h3 class=\"pz-t\" style=\"font-size:2.1em\">Componentes principales</h3><p class=\"pz-st\">Pregunta adicional de la P4 · se promedia con P1</p></div>"
  },
  {
   "en": "tipo",
   "html": "<p class=\"pz-kicker\">La pregunta adicional</p><h3 class=\"pz-t\">Leer summary(pca) y pca&#36;rotation</h3><ul class=\"pz-lista\"><li data-en=\"tipo\">¿Cuántos componentes?</li><li data-en=\"tipo@3\">¿Qué significa cada uno?</li><li data-en=\"tipo@5\">¿Cómo se calcula el puntaje de una persona?</li></ul><pre class=\"pz-code\" data-en=\"tipo\"><code>pca &lt;- prcomp(datos, scale. = TRUE)\nsummary(pca)      # Standard deviation, Proportion, Cumulative\npca&#36;rotation      # loadings</code></pre>"
  },
  {
   "en": "est",
   "html": "<p class=\"pz-kicker\">Paso 1</p><h3 class=\"pz-t\">¿Se estandarizó?</h3><p class=\"pz-nota\" data-en=\"est\">Unidades distintas ⇒ <code>scale. = TRUE</code>; si no, la variable de números grandes domina PC1</p><div class=\"pz-f\" data-en=\"estr\">$$\\text{estandarizadas: cada variable aporta varianza }1;\\Rightarrow;\\sum\\lambda_i=p$$</div>"
  },
  {
   "en": "sd",
   "html": "<p class=\"pz-kicker\">Paso 2</p><h3 class=\"pz-t\">Autovalores y varianza</h3><p class=\"pz-nota pz-mal\" data-en=\"sd\"><code>summary</code> entrega la <strong>desviación estándar</strong>, no el autovalor</p><div class=\"pz-f\" data-en=\"lam\">$$\\lambda=\\text{sd}^2\\qquad 1{,}25^2=1{,}5625$$</div><div class=\"pz-f\" data-en=\"prop\">$$\\text{proporción}_k=\\dfrac{\\lambda_k}{\\sum\\lambda_i}$$</div><p data-en=\"acum\">Acumulada: se va sumando</p>"
  },
  {
   "en": "crit",
   "html": "<p class=\"pz-kicker\">Paso 3</p><h3 class=\"pz-t\">¿Cuántos componentes?</h3><ul class=\"pz-lista\"><li data-en=\"c1\"><strong>Kaiser</strong>: λ &gt; 1 (datos estandarizados) — sobre λ, no sobre sd</li><li data-en=\"c2\"><strong>80 %</strong> de varianza acumulada</li><li data-en=\"c3\"><strong>Codo</strong> del gráfico de sedimentación</li></ul><p class=\"pz-nota\" data-en=\"cdif\">Si no coinciden: dilo y justifica cuál usas</p>"
  },
  {
   "en": "load",
   "html": "<p class=\"pz-kicker\">Paso 4</p><h3 class=\"pz-t\">Interpretar con los loadings</h3><ul class=\"pz-lista\"><li data-en=\"load\">Loadings grandes en valor absoluto (≥ 0,4)</li><li data-en=\"sig\">Mismo signo: se mueven juntas · signo opuesto: en sentido contrario</li><li data-en=\"nombre\">Ponerle nombre: p. ej. «intensidad de compra» (frecuencia, gasto, categorías + ; cupones −)</li></ul>"
  },
  {
   "en": "score",
   "html": "<p class=\"pz-kicker\">Paso 5</p><h3 class=\"pz-t\">El puntaje (score)</h3><div class=\"pz-f\" data-en=\"score\">$$PC_1=\\sum_j a_{j1}Z_j$$</div><div class=\"pz-f\" data-en=\"z\">$$Z_j=\\dfrac{X_j-\\bar X_j}{s_j}$$</div><p class=\"pz-nota pz-mal\" data-en=\"zno\">No reemplazar los valores originales · sin medias y sd: explicar el procedimiento</p>"
  },
  {
   "en": "err",
   "html": "<p class=\"pz-kicker\">Errores típicos</p><h3 class=\"pz-t\">Lo que más resta puntaje</h3><ul class=\"pz-lista\"><li data-en=\"e1\">Usar sd como si fuera λ</li><li data-en=\"e2\">Olvidar estandarizar</li><li data-en=\"e3\">Interpretar loadings chicos</li><li data-en=\"e4\">«PCA elimina variables»: cada componente usa todas</li></ul>"
  },
  {
   "en": "fin",
   "html": "<p class=\"pz-kicker\">Para cerrar</p><h3 class=\"pz-t\">La receta</h3><ul class=\"pz-lista\"><li data-en=\"fin\">Estandarizar</li><li data-en=\"fin@2\">λ = sd² · proporción y acumulada</li><li data-en=\"fin@4\">Kaiser · 80 % · codo</li><li data-en=\"fin@6\">Loadings grandes y signos ⇒ nombre</li><li data-en=\"fin@8\">Score con variables estandarizadas</li></ul>"
  }
 ]
});
