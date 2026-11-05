/* GENERADO por tools/generar_escenas.js desde tools/escenas/m08-t2-hotelling.js — no editar a mano. */
PLATAFORMA.registrar("escena", {
 "audio": "audio-m08-t2-hotelling",
 "escenas": [
  {
   "en": "inicio",
   "html": "<div class=\"pz-centro\"><p class=\"pz-kicker\">Módulo 8 · Prueba 1</p><h3 class=\"pz-t\" style=\"font-size:2.2em\">T² de Hotelling</h3><p data-en=\"inicio\" class=\"pz-st\">Probar varias medias a la vez</p></div>"
  },
  {
   "en": "idea",
   "html": "<p class=\"pz-kicker\">Un vector de medias</p><h3 class=\"pz-t\">¿Por qué no varias pruebas t?</h3><div class=\"pz-cols\"><div class=\"pz-col\"><p data-en=\"idea-ej\">Ej.: largo <em>y</em> ancho de una pieza, juntos</p><ul class=\"pz-lista\"><li data-en=\"tes-r2\">Varias pruebas acumulan el <strong>error global</strong></li><li data-en=\"tes-r3\">Ignoran la <strong>correlación</strong> entre variables</li><li data-en=\"tes-r4\">Pueden no rechazar una a una y rechazar en conjunto (o al revés)</li></ul><p class=\"pz-nota\" data-en=\"sup\">Supuesto: normal multivariada · verificar con <strong>Mardia</strong></p></div><div style=\"height:48cqh\"><svg viewBox=\"0 0 300 230\"><path class=\"ejes\" d=\"M20,215 H290 M20,215 V10\"/><g data-en=\"elipse\"><rect x=\"70\" y=\"40\" width=\"160\" height=\"150\" fill=\"#ffd166\" opacity=\".1\" stroke=\"#ffd166\" stroke-dasharray=\"6 4\" stroke-width=\"2\"/></g><text data-en=\"elipse\" x=\"75\" y=\"34\" style=\"font-size:12px;fill:#ffd166\">t separadas</text><g data-en=\"elipse-2\"><ellipse cx=\"150\" cy=\"115\" rx=\"105\" ry=\"38\" transform=\"rotate(-40 150 115)\" fill=\"#7cc6fe\" opacity=\".2\" stroke=\"#7cc6fe\" stroke-width=\"2.5\"/></g><text data-en=\"elipse-2\" x=\"205\" y=\"205\" style=\"font-size:12px;fill:#7cc6fe\">T² conjunta</text><g data-en=\"elipse-3\"><circle cx=\"80\" cy=\"52\" r=\"6\" fill=\"#ff8fab\"/><text x=\"88\" y=\"48\" style=\"font-size:12px;fill:#ff8fab\">μ₀</text></g></svg></div></div>"
  },
  {
   "en": "t2",
   "html": "<p class=\"pz-kicker\">El estadístico</p><h3 class=\"pz-t\">La t de Student en varias dimensiones</h3><div class=\"pz-f\" data-en=\"t2-f\">$$T^2=n\\,(\\bar x-\\mu_0)'\\,S^{-1}\\,(\\bar x-\\mu_0)$$</div><p data-en=\"t2-int\" class=\"pz-tenue\">Distancia de x̄ a μ₀, pesando cada dirección con S</p><p class=\"pz-nota\" data-en=\"t2-uno\">Con una sola variable: T² = t²</p><div class=\"pz-f\" data-en=\"t2-f3\">$$\\color{#ffd166}{\\frac{n-p}{(n-1)\\,p}}\\,T^2\\sim F_{(p,\\ n-p)}$$</div><p class=\"pz-nota pz-mal\" data-en=\"t2-ojo\">Error típico: olvidar la constante y comparar T² directo con F</p>"
  },
  {
   "en": "ej",
   "html": "<p class=\"pz-kicker\">Ejemplo · n = 10, p = 2</p><h3 class=\"pz-t\">H₀: μ = (13; 9)</h3><div class=\"pz-cols\"><div class=\"pz-col\"><table class=\"pz-tabla pz-chica\"><thead><tr><th></th><th>X₁</th><th>X₂</th></tr></thead><tbody><tr><th>x̄</th><td data-en=\"ej-xbar\">13,91</td><td data-en=\"ej-xbar\">9,21</td></tr><tr><th>μ₀</th><td data-en=\"ej-mu\">13</td><td data-en=\"ej-mu\">9</td></tr></tbody></table><div class=\"pz-caja-calc\"><span class=\"pz-etq\">cálculo</span><div class=\"pz-col\"><div class=\"pz-suma \" data-en=\"ej-t2\"><span data-en=\"ej-t2\">$T^2$</span> <span data-en=\"ej-t2@0.8\" class=\"pz-t-op\">=</span> <span data-en=\"ej-t2@0.8\" data-id=\"t2\" class=\"pz-res\">3,52</span></div><div class=\"pz-suma\"><span data-en=\"ej-f\">F = </span><span data-en=\"ej-f\" class=\"pz-am\">8/18</span> <span data-en=\"ej-f@0.6\" class=\"pz-t-op\">×</span> <span data-en=\"ej-f@0.6\" data-desde=\"t2\">3,52</span> <span data-en=\"ej-f@1.8\" class=\"pz-t-op\">=</span> <span data-en=\"ej-f@1.8\" class=\"pz-res\">1,57</span></div></div></div></div><div class=\"pz-col\"><table class=\"pz-tabla \"><thead><tr><th>gl</th><th>p-valor</th><th>Decisión</th></tr></thead><tbody><tr><td data-en=\"ej-f@2.5\">(2, 8)</td><td data-en=\"ej-p\">0,27</td><td data-en=\"ej-r\">No se rechaza</td></tr></tbody></table><p class=\"pz-nota\" data-en=\"ej-crit\">Crítico de T²: 10,03 &gt; 3,52</p><p class=\"pz-nota pz-ok\" data-en=\"ej-el\">μ₀ cae <strong>dentro</strong> de la elipse de confianza</p><pre class=\"pz-code\" data-en=\"r\"><code>ICSNP::HotellingsT2(X, mu = c(13, 9))</code></pre></div></div>"
  },
  {
   "en": "reg",
   "html": "<p class=\"pz-kicker\">Región de confianza</p><h3 class=\"pz-t\">Una elipse centrada en x̄</h3><p class=\"pz-nota\" data-en=\"reg-ej\">Ejes e inclinación: valores y vectores propios de S</p><p class=\"pz-nota pz-ok\" data-en=\"reg-r\">μ₀ dentro ⇒ no se rechaza · μ₀ fuera ⇒ se rechaza</p><p data-en=\"sim\"><strong>Si se rechaza: ¿qué variable lo explica?</strong></p><p class=\"pz-nota\" data-en=\"sim-def\"><strong>Intervalos simultáneos</strong>: confianza global del 95 % para todas las combinaciones</p><p data-en=\"sim-lee\" class=\"pz-tenue\">El intervalo que no contiene el valor de H₀ señala la diferencia</p>"
  },
  {
   "en": "corteza",
   "html": "<p class=\"pz-kicker\">Ejemplo de clase</p><h3 class=\"pz-t\">Corcho en 28 árboles, 4 direcciones</h3><p data-en=\"corteza-t2\">T² = 20,74 · p = 0,002 ⇒ <strong>se rechaza</strong></p><table class=\"pz-tabla pz-chica\"><thead><tr><th>Contraste</th><th>IC simultáneo 95 %</th><th>¿Contiene 0?</th></tr></thead><tbody><tr><td data-en=\"corteza-int\" data-hl=\"corteza-int bonf\">(N + S) − (E + W)</td><td data-en=\"corteza-int\" data-hl=\"corteza-int bonf\">[2,18; 15,53]</td><td data-en=\"corteza-int\" data-hl=\"corteza-int bonf\"><strong>No</strong></td></tr><tr><td data-en=\"corteza-otros\">N − S</td><td data-en=\"corteza-otros\">[−3,83; 5,55]</td><td data-en=\"corteza-otros\">Sí</td></tr><tr><td data-en=\"corteza-otros\">E − W</td><td data-en=\"corteza-otros\">[−4,98; 6,98]</td><td data-en=\"corteza-otros\">Sí</td></tr></tbody></table><p data-en=\"corteza-r\" class=\"pz-ve\">La diferencia: eje norte–sur vs. eje este–oeste</p><table class=\"pz-tabla pz-mini\"><thead><tr><th>Intervalos</th><th>Factor (n = 10, p = 2)</th><th>Ancho</th></tr></thead><tbody><tr><td data-en=\"bonf-r2\">T²</td><td data-en=\"bonf-ej\">3,17</td><td data-en=\"bonf-r2\">más anchos (cualquier combinación)</td></tr><tr><td data-en=\"bonf-r\">Bonferroni</td><td data-en=\"bonf-ej\">2,69</td><td data-en=\"bonf-r\">más angostos (solo las medias)</td></tr></tbody></table>"
  },
  {
   "en": "c",
   "html": "<p class=\"pz-kicker\">Para cerrar</p><h3 class=\"pz-t\">Lo esencial del módulo 8</h3><ul class=\"pz-lista\"><li data-en=\"c1\">Prueba conjunta, no varias t separadas</li><li data-en=\"c2\">(n − p)/((n − 1)p) · T² ~ F(p, n − p)</li><li data-en=\"c3\">Región de confianza: una elipse</li><li data-en=\"c4\">Intervalos simultáneos para saber qué explica el rechazo</li></ul><p data-en=\"fin\" class=\"pz-tenue\">Fin del módulo 8</p>"
  }
 ]
});
