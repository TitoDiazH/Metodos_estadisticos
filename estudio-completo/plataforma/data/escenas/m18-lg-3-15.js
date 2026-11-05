/* GENERADO por tools/generar_escenas.js desde tools/escenas/m18-lg-3-15.js — no editar a mano. */
PLATAFORMA.registrar("escena", {
 "audio": "audio-m18-lg-3-15",
 "escenas": [
  {
   "en": "inicio",
   "html": "<div class=\"pz-centro\"><p class=\"pz-kicker\">Libro guía · Cap. 3, ej. 15</p><h3 class=\"pz-t\" style=\"font-size:2.1em\">Almidón y dureza de tabletas</h3><p class=\"pz-st\">ANOVA de un factor · pregunta adicional de P3</p></div>"
  },
  {
   "en": "enun",
   "html": "<p class=\"pz-kicker\">Libro guía · Cap. 3, ej. 15 · enunciado</p><p class=\"pz-enun\">Una farmacéutica evalúa si la cantidad de almidón influye en la dureza de las tabletas: <span class=\"pz-clave\" data-hl=\"clave1\">2 %, 5 % y 10 % de almidón</span>, <span class=\"pz-clave\" data-hl=\"clave2\">4 réplicas por nivel</span>. <span class=\"pz-clave\" data-hl=\"clave3\">Si se desea maximizar la dureza, ¿qué recomendaría?</span></p><div class=\"pz-datos\"><table class=\"pz-tabla pz-chica\"><thead><tr><th>% almidón</th><th>R1</th><th>R2</th><th>R3</th><th>R4</th></tr></thead><tbody><tr><th>2 %</th><td>4,3</td><td>5,2</td><td>4,8</td><td>4,5</td></tr><tr><th>5 %</th><td>6,5</td><td>7,3</td><td>6,9</td><td>6,1</td></tr><tr><th>10 %</th><td>9</td><td>7,8</td><td>8,5</td><td>8,1</td></tr></tbody></table></div>"
  },
  {
   "en": "dis",
   "html": "<p class=\"pz-kicker\">Identificar el diseño</p><h3 class=\"pz-t\">Un factor, completamente al azar</h3><div class=\"pz-cols\"><ul class=\"pz-lista\"><li data-en=\"dis\">Factor: <span class=\"pz-am\">% de almidón</span> · $k=3$</li><li data-en=\"dis\">Réplicas: $n=4$ · $N=12$</li></ul><div><div class=\"pz-f\" data-en=\"modelo\">$$Y_{ij}=\\mu+\\tau_i+\\varepsilon_{ij}$$</div><div class=\"pz-f\" data-en=\"h0\">$$H_0:\\mu_1=\\dots=\\mu_{3}$$</div></div></div>"
  },
  {
   "en": "tot",
   "html": "<p class=\"pz-kicker\">Totales y sumas de cuadrados</p><h3 class=\"pz-t\">Del gran total al error</h3><div class=\"pz-cols\"><div class=\"pz-col\"><table class=\"pz-tabla pz-chica\"><thead><tr><th>% almidón</th><th>R1</th><th>R2</th><th>R3</th><th>R4</th><th class=\"pz-tot\">$Y_{i\\cdot}$</th><th class=\"pz-tot\">$\\bar Y_{i\\cdot}$</th></tr></thead><tbody><tr><th>2 %</th><td>4,3</td><td>5,2</td><td>4,8</td><td>4,5</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr sce\">18,8</td><td class=\"pz-tot\" data-en=\"medias\">4,7</td></tr><tr><th>5 %</th><td>6,5</td><td>7,3</td><td>6,9</td><td>6,1</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr sce\">26,8</td><td class=\"pz-tot\" data-en=\"medias\">6,7</td></tr><tr><th>10 %</th><td>9</td><td>7,8</td><td>8,5</td><td>8,1</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr sce\">33,4</td><td class=\"pz-tot\" data-en=\"medias\">8,35</td></tr><tr><th>Total</th><td></td><td></td><td></td><td></td><td class=\"pz-tot\" data-en=\"tot-g\" data-hl=\"corr sct\">79</td><td></td></tr></tbody></table></div><div class=\"pz-col\"><div class=\"pz-paso\" data-en=\"corr\"><span class=\"pz-n\">1</span><div>$\\tfrac{Y_{\\cdot\\cdot}^2}{N}=\\tfrac{79^2}{12}=520{,}083$</div></div><div class=\"pz-paso\" data-en=\"sct\"><span class=\"pz-n\">2</span><div>$SC_T=548{,}88-520{,}083=\\mathbf{28{,}797}$</div></div><div class=\"pz-paso\" data-en=\"sctr\"><span class=\"pz-n\">3</span><div>$SC_{TRAT}=\\tfrac{2187{,}24}{\\color{#ffd166}{n=4}}-520{,}083=\\mathbf{26{,}727}$</div></div><div class=\"pz-paso\" data-en=\"sce\"><span class=\"pz-n\">4</span><div>$SC_E=SC_T-SC_{TRAT}=\\mathbf{2{,}07}$</div></div></div></div>"
  },
  {
   "en": "gl",
   "html": "<p class=\"pz-kicker\">Tabla ANOVA</p><h3 class=\"pz-t\">¿El factor influye?</h3><table class=\"pz-tabla \"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>F₀</th><th>Valor-p</th></tr></thead><tbody><tr><td>Almidón</td><td>26,727</td><td data-en=\"gl\">2</td><td data-en=\"cm\">13,363</td><td data-en=\"f\" data-hl=\"f lsd\"><strong>58,1</strong></td><td data-en=\"fc\">&lt; 0,0001</td></tr><tr><td>Error</td><td>2,07</td><td data-en=\"gl\">9</td><td data-en=\"cm\" data-hl=\"f fc\">0,23</td><td></td><td></td></tr><tr><td>Total</td><td>28,797</td><td>11</td><td></td><td></td><td></td></tr></tbody></table><p data-en=\"fc\" class=\"pz-tenue\">F crítico (2, 9) = 4,26</p><p class=\"pz-nota pz-ok\" data-en=\"conc\">58,1 &gt; 4,26 ⇒ <strong>se rechaza H₀</strong>: el almidón influye en la dureza</p>"
  },
  {
   "en": "lsd",
   "html": "<p class=\"pz-kicker\">Comparaciones</p><h3 class=\"pz-t\">¿Qué nivel conviene?</h3><div class=\"pz-f\" data-en=\"lsd-n\">$$LSD=t_{0{,}025;\\,9}\\sqrt{\\frac{2\\,CM_E}{n}}=2{,}262\\sqrt{\\frac{2\\cdot0{,}23}{4}}=\\mathbf{0{,}767}$$</div><div class=\"pz-cols\"><table class=\"pz-tabla pz-chica\"><thead><tr><th>Almidón</th><th>Media</th></tr></thead><tbody><tr><td data-en=\"medias\">10 %</td><td data-en=\"medias\">8,35</td></tr><tr><td data-en=\"medias\">5 %</td><td data-en=\"medias\">6,7</td></tr><tr><td data-en=\"medias\">2 %</td><td data-en=\"medias\">4,7</td></tr></tbody></table><table class=\"pz-tabla pz-chica\"><thead><tr><th>Par</th><th>|dif.|</th><th>¿Difieren?</th></tr></thead><tbody><tr><td data-en=\"pares\">2 % − 5 %</td><td data-en=\"pares\">2</td><td class=\"pz-ve\" data-en=\"pares\">Sí</td></tr><tr><td data-en=\"pares\">2 % − 10 %</td><td data-en=\"pares\">3,65</td><td class=\"pz-ve\" data-en=\"pares\">Sí</td></tr><tr><td data-en=\"pares\">5 % − 10 %</td><td data-en=\"pares\">1,65</td><td class=\"pz-ve\" data-en=\"pares\">Sí</td></tr></tbody></table></div><p class=\"pz-nota pz-ok\" data-en=\"mejor\">Los tres difieren ⇒ máxima dureza con <strong>10 %</strong></p><p class=\"pz-nota\" data-en=\"ojo\">Si 5 % y 10 % no difirieran, convendría el 5 % (menos almidón)</p>"
  },
  {
   "en": "sup",
   "html": "<p class=\"pz-kicker\">Supuestos y cierre</p><h3 class=\"pz-t\">Residuos</h3><table class=\"pz-tabla pz-chica\"><thead><tr><th>Prueba</th><th>Valor-p</th><th></th></tr></thead><tbody><tr><td data-en=\"sup-sw\">Shapiro–Wilk</td><td data-en=\"sup-sw\">0,430</td><td class=\"pz-ve\" data-en=\"sup-sw\">✓</td></tr><tr><td data-en=\"sup-var\">Bartlett</td><td data-en=\"sup-var\">0,881</td><td class=\"pz-ve\" data-en=\"sup-var\">✓</td></tr><tr><td data-en=\"sup-var\">Levene</td><td data-en=\"sup-var\">0,772</td><td class=\"pz-ve\" data-en=\"sup-var\">✓</td></tr></tbody></table><p class=\"pz-nota pz-ok\" data-en=\"fin\">Modelo e hipótesis → totales → SC → tabla → decisión → LSD → supuestos</p>"
  }
 ]
});
