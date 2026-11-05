/* GENERADO por tools/generar_escenas.js desde tools/escenas/m20-lg-4-12.js — no editar a mano. */
PLATAFORMA.registrar("escena", {
 "audio": "audio-m20-lg-4-12",
 "escenas": [
  {
   "en": "inicio",
   "html": "<div class=\"pz-centro\"><p class=\"pz-kicker\">Libro guía · Cap. 4, ej. 12</p><h3 class=\"pz-t\" style=\"font-size:2.1em\">Detergentes y lavadoras</h3><p class=\"pz-st\">Diseño en bloques completos al azar (DBCA)</p></div>"
  },
  {
   "en": "enun",
   "html": "<p class=\"pz-kicker\">Libro guía · Cap. 4, ej. 12 · enunciado</p><p class=\"pz-enun\">Rendimiento de 4 detergentes: lecturas de blancura de 12 cargas de lavado, distribuidas en 3 modelos de lavadoras. <span class=\"pz-clave\" data-hl=\"clave1\">a) Señale el nombre del diseño</span>. <span class=\"pz-clave\" data-hl=\"clave2\">Cada lavadora lava una carga con cada detergente</span>. <span class=\"pz-clave\" data-hl=\"clave3\">Mayor blancura es mejor</span>.</p><div class=\"pz-datos\"><table class=\"pz-tabla \"><thead><tr><th></th><th>Lavadora 1</th><th>Lavadora 2</th><th>Lavadora 3</th></tr></thead><tbody><tr><th>A</th><td>45</td><td>43</td><td>51</td></tr><tr><th>B</th><td>47</td><td>44</td><td>52</td></tr><tr><th>C</th><td>50</td><td>49</td><td>57</td></tr><tr><th>D</th><td>42</td><td>37</td><td>49</td></tr></tbody></table></div>"
  },
  {
   "en": "dis",
   "html": "<p class=\"pz-kicker\">Identificar el diseño</p><h3 class=\"pz-t\">¿Qué diseño es?</h3><div class=\"pz-cols\"><ul class=\"pz-lista\"><li data-en=\"dis-r\">Tratamiento: <span class=\"pz-am\">detergente</span> · $k=4$</li><li data-en=\"dis-r\">Bloque: <span class=\"pz-ce\">lavadora</span> · $b=3$</li><li data-en=\"dis-r\">$N=k\\cdot b=12$ datos</li></ul><div><div class=\"pz-f\" data-en=\"modelo\">$$Y_{ij}=\\mu+\\tau_i+\\gamma_j+\\varepsilon_{ij}$$</div><div class=\"pz-f\" data-en=\"h0t\">$$H_0:\\tau_1=\\dots=\\tau_{4}=0$$</div><div class=\"pz-f\" data-en=\"h0b\">$$H_0:\\gamma_1=\\dots=\\gamma_{3}=0$$</div></div></div>"
  },
  {
   "en": "tot",
   "html": "<p class=\"pz-kicker\">Paso 1 · Totales</p><h3 class=\"pz-t\">Totales por detergente, por lavadora y global</h3><table class=\"pz-tabla \"><thead><tr><th></th><th>Lavadora 1</th><th>Lavadora 2</th><th>Lavadora 3</th><th class=\"pz-tot\">$Y_{i\\cdot}$</th></tr></thead><tbody><tr><th>A</th><td>45</td><td>43</td><td>51</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">139</td></tr><tr><th>B</th><td>47</td><td>44</td><td>52</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">143</td></tr><tr><th>C</th><td>50</td><td>49</td><td>57</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">156</td></tr><tr><th>D</th><td>42</td><td>37</td><td>49</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">128</td></tr><tr><th>$Y_{\\cdot j}$</th><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">184</td><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">173</td><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">209</td><td class=\"pz-tot\" data-en=\"tot-g\" data-hl=\"corr sct\">566</td></tr></tbody></table>"
  },
  {
   "en": "corr",
   "html": "<p class=\"pz-kicker\">Paso 2 · Sumas de cuadrados</p><h3 class=\"pz-t\">Corrección, total, detergente, lavadora y error</h3><div class=\"pz-col\" style=\"font-size:1.05em\"><div class=\"pz-paso\" data-en=\"corr\"><span class=\"pz-n\">1</span><div>$\\dfrac{Y_{\\cdot\\cdot}^2}{N}=\\dfrac{566^2}{12}=26696{,}333$</div></div><div class=\"pz-paso\" data-en=\"sct\"><span class=\"pz-n\">2</span><div>$SC_T=\\sum Y_{ij}^2-\\tfrac{Y_{\\cdot\\cdot}^2}{N}=27008-26696{,}333=\\mathbf{311{,}667}$</div></div><div class=\"pz-paso\" data-en=\"sctr\"><span class=\"pz-n\">3</span><div>$SC_{TRAT}=\\dfrac{80490}{\\color{#ffd166}{3}}-26696{,}333=\\mathbf{133{,}667}$<span data-en=\"sctr\" class=\"pz-tenue\"> &nbsp;÷ 3 = n.º de lavadoras</span></div></div><div class=\"pz-paso\" data-en=\"scb\"><span class=\"pz-n\">4</span><div>$SC_B=\\dfrac{107466}{\\color{#7cc6fe}{4}}-26696{,}333=\\mathbf{170{,}167}$<span data-en=\"scb\" class=\"pz-tenue\"> &nbsp;÷ 4 = n.º de detergentes</span></div></div><div class=\"pz-paso\" data-en=\"sce\"><span class=\"pz-n\">5</span><div>$SC_E=SC_T-SC_{TRAT}-SC_B=\\mathbf{7{,}833}$</div></div></div>"
  },
  {
   "en": "gl",
   "html": "<p class=\"pz-kicker\">Paso 3 · Tabla ANOVA</p><h3 class=\"pz-t\">¿Hay diferencias?</h3><table class=\"pz-tabla \"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>F₀</th><th>Valor-p</th></tr></thead><tbody><tr><td>Detergente</td><td>133,667</td><td data-en=\"gl\">3</td><td data-en=\"cm\">44,556</td><td data-en=\"ft\" data-hl=\"ft fb\"><strong>34,13</strong></td><td data-en=\"ftc\">0,0004</td></tr><tr><td>Lavadora</td><td>170,167</td><td data-en=\"gl\">2</td><td data-en=\"cm\">85,083</td><td data-en=\"fb\" data-hl=\"fb fin\"><strong>65,17</strong></td><td data-en=\"fb\">&lt; 0,0001</td></tr><tr><td>Error</td><td>7,833</td><td data-en=\"gl\" data-hl=\"gl cm\">6</td><td data-en=\"cm\" data-hl=\"ft conc-b\">1,306</td><td></td><td></td></tr><tr><td>Total</td><td>311,667</td><td>11</td><td></td><td></td><td></td></tr></tbody></table><div class=\"pz-cols\"><p class=\"pz-nota pz-ok\" data-en=\"conc-t\">Detergente: 34,13 &gt; F(3,6) = 4,76 ⇒ <strong>se rechaza</strong> H₀</p><p class=\"pz-nota pz-ok\" data-en=\"conc-b\">Lavadora: 65,17 &gt; F(2,6) = 5,14 ⇒ el bloque <strong>sí</strong> influye</p></div><p data-en=\"ftc\" class=\"pz-tenue\"></p>"
  },
  {
   "en": "lsd",
   "html": "<p class=\"pz-kicker\">Paso 4 · Comparaciones</p><h3 class=\"pz-t\">¿Qué detergentes difieren?</h3><div class=\"pz-f\" data-en=\"lsd-n\">$$LSD=t_{0{,}025;\\,6}\\sqrt{\\frac{2\\,CM_E}{b}}=2{,}447\\sqrt{\\frac{2\\cdot1{,}3056}{3}}=\\mathbf{2{,}283}$$</div><div class=\"pz-cols\"><table class=\"pz-tabla pz-chica\"><thead><tr><th>Detergente</th><th>Media</th></tr></thead><tbody><tr><td data-en=\"medias\">C</td><td data-en=\"medias\">52</td></tr><tr><td data-en=\"medias\">B</td><td data-en=\"medias\">47,667</td></tr><tr><td data-en=\"medias\">A</td><td data-en=\"medias\">46,333</td></tr><tr><td data-en=\"medias\">D</td><td data-en=\"medias\">42,667</td></tr></tbody></table><table class=\"pz-tabla pz-chica\"><thead><tr><th>Par</th><th>|dif.|</th><th>¿Difieren?</th></tr></thead><tbody><tr><td data-en=\"pares\">A − B</td><td data-en=\"pares\">1,33</td><td class=\"pz-ro\" data-en=\"pares\">No</td></tr><tr><td data-en=\"pares\">A − C</td><td data-en=\"pares\">5,67</td><td class=\"pz-ve\" data-en=\"pares\">Sí</td></tr><tr><td data-en=\"pares\">A − D</td><td data-en=\"pares\">3,67</td><td class=\"pz-ve\" data-en=\"pares\">Sí</td></tr><tr><td data-en=\"pares\">B − C</td><td data-en=\"pares\">4,33</td><td class=\"pz-ve\" data-en=\"pares\">Sí</td></tr><tr><td data-en=\"pares\">B − D</td><td data-en=\"pares\">5,00</td><td class=\"pz-ve\" data-en=\"pares\">Sí</td></tr><tr><td data-en=\"pares\">C − D</td><td data-en=\"pares\">9,33</td><td class=\"pz-ve\" data-en=\"pares\">Sí</td></tr></tbody></table></div><p class=\"pz-nota pz-ok\" data-en=\"mejor\">Mayor blancura es mejor ⇒ <strong>C</strong> es significativamente superior a todos; D es el peor</p>"
  },
  {
   "en": "r",
   "html": "<p class=\"pz-kicker\">Cierre</p><h3 class=\"pz-t\">Resumen</h3><pre class=\"pz-code\" data-en=\"r\"><code>modelo &lt;- aov(blancura ~ detergente + lavadora)\nsummary(modelo)\nagricolae::LSD.test(modelo, \"detergente\")$groups</code></pre><p class=\"pz-nota pz-ok\" data-en=\"fin\">El bloque (lavadora) se llevó más variabilidad que el propio tratamiento: sin bloquear, el error habría sido enorme</p>"
  }
 ]
});
