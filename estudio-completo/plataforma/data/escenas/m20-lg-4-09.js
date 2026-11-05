/* GENERADO por tools/generar_escenas.js desde tools/escenas/m20-lg-4-09.js — no editar a mano. */
PLATAFORMA.registrar("escena", {
 "audio": "audio-m20-lg-4-09",
 "escenas": [
  {
   "en": "inicio",
   "html": "<div class=\"pz-centro\"><p class=\"pz-kicker\">Libro guía · Cap. 4, ej. 9</p><h3 class=\"pz-t\" style=\"font-size:2.1em\">Bloques con tres tratamientos</h3><p class=\"pz-st\">Diseño en bloques completos al azar (DBCA)</p></div>"
  },
  {
   "en": "enun",
   "html": "<p class=\"pz-kicker\">Libro guía · Cap. 4, ej. 9 · enunciado</p><p class=\"pz-enun\">Datos de un <span class=\"pz-clave\" data-hl=\"clave1\">diseño en bloques al azar</span> (3 tratamientos, 4 bloques). <span class=\"pz-clave\" data-hl=\"clave3\">Use α = 0,05</span>.<br><br><span class=\"pz-clave\" data-hl=\"clave2\">a) Totales · b) Sumas de cuadrados · c) Tabla ANOVA y conclusiones · d) LSD</span></p><div class=\"pz-datos\"><table class=\"pz-tabla \"><thead><tr><th></th><th>Bloque 1</th><th>Bloque 2</th><th>Bloque 3</th><th>Bloque 4</th></tr></thead><tbody><tr><th>A</th><td>3</td><td>4</td><td>2</td><td>6</td></tr><tr><th>B</th><td>7</td><td>9</td><td>3</td><td>10</td></tr><tr><th>C</th><td>4</td><td>6</td><td>3</td><td>7</td></tr></tbody></table></div>"
  },
  {
   "en": "dis",
   "html": "<p class=\"pz-kicker\">Identificar el diseño</p><h3 class=\"pz-t\">¿Qué es tratamiento y qué es bloque?</h3><div class=\"pz-cols\"><ul class=\"pz-lista\"><li data-en=\"dis\">Tratamiento: <span class=\"pz-am\">tratamiento</span> · $k=3$</li><li data-en=\"dis\">Bloque: <span class=\"pz-ce\">bloque</span> · $b=4$</li><li data-en=\"dis\">$N=k\\cdot b=12$ datos</li></ul><div><div class=\"pz-f\" data-en=\"modelo\">$$Y_{ij}=\\mu+\\tau_i+\\gamma_j+\\varepsilon_{ij}$$</div><div class=\"pz-f\" data-en=\"h0t\">$$H_0:\\tau_1=\\dots=\\tau_{3}=0$$</div><div class=\"pz-f\" data-en=\"h0b\">$$H_0:\\gamma_1=\\dots=\\gamma_{4}=0$$</div></div></div>"
  },
  {
   "en": "tot",
   "html": "<p class=\"pz-kicker\">Paso 1 · Totales</p><h3 class=\"pz-t\">Totales por tratamiento, por bloque y global</h3><table class=\"pz-tabla \"><thead><tr><th></th><th>Bloque 1</th><th>Bloque 2</th><th>Bloque 3</th><th>Bloque 4</th><th class=\"pz-tot\">$Y_{i\\cdot}$</th></tr></thead><tbody><tr><th>A</th><td>3</td><td>4</td><td>2</td><td>6</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">15</td></tr><tr><th>B</th><td>7</td><td>9</td><td>3</td><td>10</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">29</td></tr><tr><th>C</th><td>4</td><td>6</td><td>3</td><td>7</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">20</td></tr><tr><th>$Y_{\\cdot j}$</th><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">14</td><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">19</td><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">8</td><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">23</td><td class=\"pz-tot\" data-en=\"tot-g\" data-hl=\"corr sct\">64</td></tr></tbody></table>"
  },
  {
   "en": "corr",
   "html": "<p class=\"pz-kicker\">Paso 2 · Sumas de cuadrados</p><h3 class=\"pz-t\">Corrección, total, tratamiento, bloque y error</h3><div class=\"pz-col\" style=\"font-size:1.05em\"><div class=\"pz-paso\" data-en=\"corr\"><span class=\"pz-n\">1</span><div>$\\dfrac{Y_{\\cdot\\cdot}^2}{N}=\\dfrac{64^2}{12}=341{,}333$</div></div><div class=\"pz-paso\" data-en=\"sct\"><span class=\"pz-n\">2</span><div>$SC_T=\\sum Y_{ij}^2-\\tfrac{Y_{\\cdot\\cdot}^2}{N}=414-341{,}333=\\mathbf{72{,}667}$</div></div><div class=\"pz-paso\" data-en=\"sctr\"><span class=\"pz-n\">3</span><div>$SC_{TRAT}=\\dfrac{1466}{\\color{#ffd166}{4}}-341{,}333=\\mathbf{25{,}167}$<span data-en=\"sctr-div\" class=\"pz-tenue\"> &nbsp;÷ 4 = n.º de bloques</span></div></div><div class=\"pz-paso\" data-en=\"scb\"><span class=\"pz-n\">4</span><div>$SC_B=\\dfrac{1150}{\\color{#7cc6fe}{3}}-341{,}333=\\mathbf{42}$<span data-en=\"scb\" class=\"pz-tenue\"> &nbsp;÷ 3 = n.º de tratamientos</span></div></div><div class=\"pz-paso\" data-en=\"sce\"><span class=\"pz-n\">5</span><div>$SC_E=SC_T-SC_{TRAT}-SC_B=\\mathbf{5{,}5}$</div></div></div>"
  },
  {
   "en": "gl",
   "html": "<p class=\"pz-kicker\">Paso 3 · Tabla ANOVA</p><h3 class=\"pz-t\">¿Hay diferencias?</h3><table class=\"pz-tabla \"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>F₀</th><th>Valor-p</th></tr></thead><tbody><tr><td>Tratamiento</td><td>25,167</td><td data-en=\"gl\">2</td><td data-en=\"cm\">12,583</td><td data-en=\"ft\" data-hl=\"ft fb\"><strong>13,73</strong></td><td data-en=\"ftc\">0,0058</td></tr><tr><td>Bloque</td><td>42</td><td data-en=\"gl\">3</td><td data-en=\"cm\">14</td><td data-en=\"fb\" data-hl=\"fb fin\"><strong>15,27</strong></td><td data-en=\"fb\">0,0032</td></tr><tr><td>Error</td><td>5,5</td><td data-en=\"gl\" data-hl=\"gl cm\">6</td><td data-en=\"cm\" data-hl=\"ft conc-b\">0,917</td><td></td><td></td></tr><tr><td>Total</td><td>72,667</td><td>11</td><td></td><td></td><td></td></tr></tbody></table><div class=\"pz-cols\"><p class=\"pz-nota pz-ok\" data-en=\"conc-t\">Tratamiento: 13,73 &gt; F(2,6) = 5,14 ⇒ <strong>se rechaza</strong> H₀</p><p class=\"pz-nota pz-ok\" data-en=\"conc-b\">Bloque: 15,27 &gt; F(3,6) = 4,76 ⇒ el bloque <strong>sí</strong> influye</p></div><p data-en=\"ftc\" class=\"pz-tenue\"></p>"
  },
  {
   "en": "lsd",
   "html": "<p class=\"pz-kicker\">Paso 4 · Comparaciones</p><h3 class=\"pz-t\">¿Qué tratamientos difieren?</h3><div class=\"pz-f\" data-en=\"lsd-n\">$$LSD=t_{0{,}025;\\,6}\\sqrt{\\frac{2\\,CM_E}{b}}=2{,}447\\sqrt{\\frac{2\\cdot0{,}9167}{4}}=\\mathbf{1{,}657}$$</div><div class=\"pz-cols\"><table class=\"pz-tabla pz-chica\"><thead><tr><th>Tratamiento</th><th>Media</th></tr></thead><tbody><tr><td data-en=\"medias\">B</td><td data-en=\"medias\">7,25</td></tr><tr><td data-en=\"medias\">C</td><td data-en=\"medias\">5</td></tr><tr><td data-en=\"medias\">A</td><td data-en=\"medias\">3,75</td></tr></tbody></table><table class=\"pz-tabla pz-chica\"><thead><tr><th>Par</th><th>|dif.|</th><th>¿Difieren?</th></tr></thead><tbody><tr><td data-en=\"pares\">A − B</td><td data-en=\"pares\">3,5</td><td class=\"pz-ve\" data-en=\"pares\">Sí</td></tr><tr><td data-en=\"pares\">A − C</td><td data-en=\"pares\">1,25</td><td class=\"pz-ro\" data-en=\"pares\">No</td></tr><tr><td data-en=\"pares\">B − C</td><td data-en=\"pares\">2,25</td><td class=\"pz-ve\" data-en=\"pares\">Sí</td></tr></tbody></table></div><p class=\"pz-nota pz-ok\" data-en=\"mejor\">Si mayor es mejor (el enunciado no lo dice): <strong>B</strong> supera a A y a C</p>"
  },
  {
   "en": "r",
   "html": "<p class=\"pz-kicker\">Cierre</p><h3 class=\"pz-t\">Resumen</h3><pre class=\"pz-code\" data-en=\"r\"><code>modelo &lt;- aov(y ~ trat + bloque)   # ambos como factor\nsummary(modelo)\nagricolae::LSD.test(modelo, \"trat\")$groups</code></pre><p class=\"pz-nota pz-ok\" data-en=\"fin\">Totales → corrección → SC (con el divisor correcto) → error por diferencia → tabla → LSD</p>"
  }
 ]
});
