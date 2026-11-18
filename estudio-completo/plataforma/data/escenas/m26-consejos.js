/* GENERADO por tools/generar_escenas.js desde tools/escenas/m26-consejos.js — no editar a mano. */
PLATAFORMA.registrar("escena", {
 "audio": "audio-m26-consejos",
 "escenas": [
  {
   "en": "inicio",
   "html": "<div class=\"pz-centro\"><p class=\"pz-kicker\">Consejos para la prueba</p><h3 class=\"pz-t\" style=\"font-size:2.1em\">Regresión lineal múltiple</h3><p class=\"pz-st\">Resumen y receta paso a paso · Prueba 4</p></div>"
  },
  {
   "en": "inst",
   "html": "<p class=\"pz-kicker\">Qué te van a preguntar</p><h3 class=\"pz-t\">Leer salidas de R, no ajustar modelos</h3><ul class=\"pz-lista\"><li data-en=\"temas\">1 · Interpretar el modelo (coeficientes y ∂y/∂xᵢ)</li><li data-en=\"temas@2\">2 · Pruebas t (también H₀: βᵢ = αᵢ)</li><li data-en=\"temas@4\">3 · F global</li><li data-en=\"temas@5\">4 · R² y R² ajustado</li><li data-en=\"temas@7\">5 · Supuestos</li><li data-en=\"temas@9\">6 · VIF, apalancamiento y Cook</li></ul>"
  },
  {
   "en": "plant",
   "html": "<p class=\"pz-kicker\">La plantilla</p><h3 class=\"pz-t\">Cada respuesta: tres partes</h3><div class=\"pz-cols pz-cols-3\" style=\"text-align:center\"><p data-en=\"p1\"><span class=\"pz-big\">1</span><br>Estadístico o valor-p</p><p data-en=\"p2\"><span class=\"pz-big\">2</span><br>Decisión</p><p data-en=\"p3\"><span class=\"pz-big\">3</span><br>Conclusión en el contexto</p></div><p class=\"pz-nota pz-ok\" data-en=\"ejemplo\">«t = 4,96; p = 0,0008 &lt; 0,05 ⇒ se rechaza H₀: la nota del examen influye significativamente en la nota de química.»</p>"
  },
  {
   "en": "interp",
   "html": "<p class=\"pz-kicker\">Paso 1</p><h3 class=\"pz-t\">Interpretar</h3><ul class=\"pz-lista\"><li data-en=\"interp\">bⱼ: cambio promedio en y por +1 en xⱼ, <strong>manteniendo constantes las demás</strong></li><li data-en=\"unidades\">Siempre con unidades: «+2,7 min por cm»</li><li data-en=\"icpt\">b₀ solo si x = 0 tiene sentido y está en el rango (casi nunca)</li><li data-en=\"indic\">Indicadora: diferencia promedio con la categoría de referencia</li></ul><div class=\"pz-cols pz-cols-3\"><div class=\"pz-f\" data-en=\"deriv\">$$\\tfrac{\\partial\\hat y}{\\partial x}=b_1$$</div><div class=\"pz-f\" data-en=\"derivp\">$$\\tfrac{\\partial\\hat y}{\\partial x}=b_1+2b_2x$$</div><div class=\"pz-f\" data-en=\"derivi\">$$\\tfrac{\\partial\\hat y}{\\partial x_1}=b_1+b_{12}x_2$$</div></div>"
  },
  {
   "en": "tt",
   "html": "<p class=\"pz-kicker\">Paso 2</p><h3 class=\"pz-t\">Pruebas t</h3><div class=\"pz-f\" data-en=\"tt\">$$t=\\dfrac{b_i-0}{ee(b_i)}\\sim t_{n-k-1}$$</div><div class=\"pz-f\" data-en=\"ta\">$$H_0:\\beta_i=\\alpha_i;\\Rightarrow;t=\\dfrac{b_i-\\alpha_i}{ee(b_i)}\\qquad p=2\\,[1-P(t_{gl}\\le|t|)]$$</div><p class=\"pz-nota pz-mal\" data-en=\"ta@4\">El <code>t value</code> de R compara con 0: con αᵢ ≠ 0 se calcula a mano</p><p class=\"pz-nota\" data-en=\"rc\">Región crítica: |t| &gt; t<sub>0,975; gl</sub> (si te dan <code>qt</code>) · o valor-p &lt; 0,05</p>"
  },
  {
   "en": "f",
   "html": "<p class=\"pz-kicker\">Paso 3</p><h3 class=\"pz-t\">F global, R² y R² ajustado</h3><div class=\"pz-f\" data-en=\"f\">$$H_0:\\beta_1=\\dots=\\beta_k=0$$</div><div class=\"pz-f\" data-en=\"fs\">$$STC=SCR+SCE\\qquad F=\\dfrac{SCR/k}{SCE/(n-k-1)}$$</div><div class=\"pz-f\" data-en=\"r2\">$$R^2=\\dfrac{SCR}{STC}$$</div><div class=\"pz-f\" data-en=\"r2a\">$$R^2_{aj}=1-(1-R^2)\\dfrac{n-1}{n-k-1}$$</div><p class=\"pz-nota pz-ok\" data-en=\"compl\">Completar una salida: t = b/ee · R² = 1 − SCE/STC · R² ajustado</p>"
  },
  {
   "en": "sup",
   "html": "<p class=\"pz-kicker\">Paso 4</p><h3 class=\"pz-t\">Supuestos</h3><ul class=\"pz-lista\"><li data-en=\"sl\"><strong>Linealidad</strong>: residuos vs ajustados sin curva (U ⇒ falta x²)</li><li data-en=\"sh\"><strong>Varianza constante</strong>: sin embudo</li><li data-en=\"sn\"><strong>Normalidad</strong>: Q-Q sobre la diagonal · Shapiro p &gt; 0,05 (H₀: normalidad)</li><li data-en=\"si\"><strong>Independencia</strong>: sin rachas en el orden de las corridas</li></ul>"
  },
  {
   "en": "vif",
   "html": "<p class=\"pz-kicker\">Paso 5</p><h3 class=\"pz-t\">Problemas del modelo</h3><ul class=\"pz-lista\"><li data-en=\"vif\"><strong>VIF</strong> &gt; 5 moderado · &gt; 10 severo · pista: F enorme y t chicos, o signos absurdos ⇒ sacar una variable redundante</li><li data-en=\"hat\"><strong>Apalancamiento</strong> hᵢᵢ &gt; 2(k+1)/n: x raras</li><li data-en=\"cook\"><strong>Cook</strong> Dᵢ &gt; 1: influyente · se revisa y se informa, no se borra</li></ul>"
  },
  {
   "en": "err",
   "html": "<p class=\"pz-kicker\">Errores típicos</p><h3 class=\"pz-t\">Lo que más resta puntaje</h3><ul class=\"pz-lista\"><li data-en=\"e1\">Interpretar un coeficiente no significativo</li><li data-en=\"e2\">«Se acepta H₀» ⇒ se dice «no se rechaza»</li><li data-en=\"e3\">Extrapolar (sobre todo con polinomios)</li><li data-en=\"e4\">Olvidar «con lo demás constante»</li><li data-en=\"e5\">Confundir IC de la media con intervalo de predicción (más ancho)</li></ul>"
  },
  {
   "en": "fin",
   "html": "<p class=\"pz-kicker\">Para cerrar</p><h3 class=\"pz-t\">El orden de siempre</h3><ul class=\"pz-lista\"><li data-en=\"fin\">Modelo e interpretación</li><li data-en=\"fin@3\">Pruebas t</li><li data-en=\"fin@4\">F, R² y R² ajustado</li><li data-en=\"fin@5\">Supuestos</li><li data-en=\"fin@7\">VIF · apalancamiento · Cook</li></ul><p class=\"pz-nota pz-ok\" data-en=\"fin@10\">Estadístico · decisión · contexto, en cada respuesta</p>"
  }
 ]
});
