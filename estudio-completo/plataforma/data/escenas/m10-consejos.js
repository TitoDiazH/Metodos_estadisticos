/* GENERADO por tools/generar_escenas.js desde tools/escenas/m10-consejos.js — no editar a mano. */
PLATAFORMA.registrar("escena", {
 "audio": "audio-m10-consejos",
 "escenas": [
  {
   "en": "inicio",
   "html": "<div class=\"pz-centro\"><p class=\"pz-kicker\">Consejos para la prueba</p><h3 class=\"pz-t\" style=\"font-size:2.1em\">Análisis factorial</h3><p class=\"pz-st\">Pregunta adicional de la P4 · se promedia con P1</p></div>"
  },
  {
   "en": "idea",
   "html": "<p class=\"pz-kicker\">La idea</p><h3 class=\"pz-t\">Factores latentes que explican las correlaciones</h3><div class=\"pz-f\" data-en=\"idea\">$$X=AF+u$$</div><p class=\"pz-nota\" data-en=\"idea@6\">PCA: toda la varianza · AF: solo la varianza <strong>común</strong></p>"
  },
  {
   "en": "adec",
   "html": "<p class=\"pz-kicker\">Paso 1</p><h3 class=\"pz-t\">¿Sirven los datos?</h3><ul class=\"pz-lista\"><li data-en=\"bart\"><strong>Bartlett</strong> (H₀: R = I, sin correlación): queremos p &lt; 0,05</li><li data-en=\"kmo\"><strong>KMO</strong>: ≥ 0,75 bueno · ≥ 0,5 aceptable · &lt; 0,5 inaceptable · revisar también el de cada variable</li></ul><pre class=\"pz-code\" data-en=\"bart\"><code>cortest.bartlett(cor(datos), n = nrow(datos))\nKMO(datos)</code></pre>"
  },
  {
   "en": "nf",
   "html": "<p class=\"pz-kicker\">Paso 2</p><h3 class=\"pz-t\">¿Cuántos factores?</h3><ul class=\"pz-lista\"><li data-en=\"nf\">Kaiser (λ &gt; 1) · % de varianza · codo · análisis paralelo</li></ul><div class=\"pz-f\" data-en=\"lim\">$$k\\le\\dfrac{p-1}{2}$$</div>"
  },
  {
   "en": "sal",
   "html": "<p class=\"pz-kicker\">Paso 3</p><h3 class=\"pz-t\">Leer la salida: h2 y u2</h3><div class=\"pz-f\" data-en=\"h2\">$$h_i^2=\\sum_j a_{ij}^2\\quad(\\text{comunalidad: lo que explican los factores})$$</div><div class=\"pz-f\" data-en=\"u2\">$$u_i^2=1-h_i^2\\quad(\\text{unicidad})$$</div><table class=\"pz-tabla \"><thead><tr><th>Variable</th><th>F1</th><th>F2</th><th>h2</th><th>u2</th></tr></thead><tbody><tr><th>ejemplo</th><td>0,8</td><td>0,3</td><td data-en=\"ej\">0,73</td><td data-en=\"ej\">0,27</td></tr></tbody></table><p class=\"pz-nota pz-mal\" data-en=\"trampa\">La pauta P1 2026-20 confundió h2 con u2: la peor representada es la de <strong>menor h2</strong></p>"
  },
  {
   "en": "rot",
   "html": "<p class=\"pz-kicker\">Paso 4</p><h3 class=\"pz-t\">Rotar e interpretar</h3><ul class=\"pz-lista\"><li data-en=\"rot\">Varimax: cada variable carga fuerte en un solo factor</li><li data-en=\"rotno\">No cambian: comunalidades, unicidades ni varianza total</li><li data-en=\"interp\">Nombrar con cargas &gt; |0,4|–|0,5|</li></ul><pre class=\"pz-code\" data-en=\"rot\"><code>fa(datos, nfactors = 2, rotate = \"varimax\")</code></pre>"
  },
  {
   "en": "err",
   "html": "<p class=\"pz-kicker\">Errores típicos</p><h3 class=\"pz-t\">Lo que más resta puntaje</h3><ul class=\"pz-lista\"><li data-en=\"e1\">Confundir h2 con u2</li><li data-en=\"e2\">No revisar Bartlett y KMO</li><li data-en=\"e3\">Interpretar sin rotar cuando dan las rotadas</li><li data-en=\"e4\">«La rotación cambia la varianza total»: no</li></ul>"
  },
  {
   "en": "fin",
   "html": "<p class=\"pz-kicker\">Para cerrar</p><h3 class=\"pz-t\">La receta</h3><ul class=\"pz-lista\"><li data-en=\"fin\">Bartlett y KMO</li><li data-en=\"fin@2\">Número de factores (k ≤ (p−1)/2)</li><li data-en=\"fin@4\">h2 = Σ cargas² · u2 = 1 − h2</li><li data-en=\"fin@7\">Rotar e interpretar con cargas grandes</li></ul>"
  }
 ]
});
