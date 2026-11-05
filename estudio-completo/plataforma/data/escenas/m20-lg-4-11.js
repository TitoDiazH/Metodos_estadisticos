/* GENERADO por tools/generar_escenas.js desde tools/escenas/m20-lg-4-11.js — no editar a mano. */
PLATAFORMA.registrar("escena", {
 "audio": "audio-m20-lg-4-11",
 "escenas": [
  {
   "en": "inicio",
   "html": "<div class=\"pz-centro\"><p class=\"pz-kicker\">Libro guía · Cap. 4, ej. 11</p><h3 class=\"pz-t\" style=\"font-size:2.1em\">Temperatura de los silos de leche</h3><p class=\"pz-st\">Diseño en bloques completos al azar (DBCA)</p></div>"
  },
  {
   "en": "enun",
   "html": "<p class=\"pz-kicker\">Libro guía · Cap. 4, ej. 11 · enunciado</p><p class=\"pz-enun\">Se sospecha que algunos silos tienen problemas de temperatura; durante 5 días se registra la temperatura de cada silo a una hora crítica. <span class=\"pz-clave\" data-hl=\"clave1\">¿Hay diferencia entre los silos?</span> <span class=\"pz-clave\" data-hl=\"clave2\">La temperatura de un día a otro es una fuente de variabilidad que podría impactar la variabilidad total</span>.</p><div class=\"pz-datos\"><table class=\"pz-tabla pz-chica\"><thead><tr><th></th><th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th></tr></thead><tbody><tr><th>A</th><td>4</td><td>4</td><td>5</td><td>0,5</td><td>3</td></tr><tr><th>B</th><td>5</td><td>6</td><td>2</td><td>4</td><td>4</td></tr><tr><th>C</th><td>4,5</td><td>4</td><td>3,5</td><td>2</td><td>3</td></tr><tr><th>D</th><td>2,5</td><td>4</td><td>6,5</td><td>4,5</td><td>4</td></tr><tr><th>E</th><td>4</td><td>4</td><td>3,5</td><td>2</td><td>4</td></tr></tbody></table></div>"
  },
  {
   "en": "dis",
   "html": "<p class=\"pz-kicker\">Identificar el diseño</p><h3 class=\"pz-t\">¿Cuál es el tratamiento y cuál el bloque?</h3><div class=\"pz-cols\"><ul class=\"pz-lista\"><li data-en=\"dis-r\">Tratamiento: <span class=\"pz-am\">silo</span> · $k=5$</li><li data-en=\"dis-r\">Bloque: <span class=\"pz-ce\">día</span> · $b=5$</li><li data-en=\"dis-r\">$N=k\\cdot b=25$ datos</li></ul><div><div class=\"pz-f\" data-en=\"modelo\">$$Y_{ij}=\\mu+\\tau_i+\\gamma_j+\\varepsilon_{ij}$$</div><div class=\"pz-f\" data-en=\"h0t\">$$H_0:\\tau_1=\\dots=\\tau_{5}=0$$</div><div class=\"pz-f\" data-en=\"h0b\">$$H_0:\\gamma_1=\\dots=\\gamma_{5}=0$$</div></div></div>"
  },
  {
   "en": "tot",
   "html": "<p class=\"pz-kicker\">Paso 1 · Totales</p><h3 class=\"pz-t\">Totales por silo, por día y global</h3><table class=\"pz-tabla pz-chica\"><thead><tr><th></th><th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th class=\"pz-tot\">$Y_{i\\cdot}$</th></tr></thead><tbody><tr><th>A</th><td>4</td><td>4</td><td>5</td><td>0,5</td><td>3</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">16,5</td></tr><tr><th>B</th><td>5</td><td>6</td><td>2</td><td>4</td><td>4</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">21</td></tr><tr><th>C</th><td>4,5</td><td>4</td><td>3,5</td><td>2</td><td>3</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">17</td></tr><tr><th>D</th><td>2,5</td><td>4</td><td>6,5</td><td>4,5</td><td>4</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">21,5</td></tr><tr><th>E</th><td>4</td><td>4</td><td>3,5</td><td>2</td><td>4</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">17,5</td></tr><tr><th>$Y_{\\cdot j}$</th><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">20</td><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">22</td><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">20,5</td><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">13</td><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">18</td><td class=\"pz-tot\" data-en=\"tot-g\" data-hl=\"corr sct\">93,5</td></tr></tbody></table>"
  },
  {
   "en": "corr",
   "html": "<p class=\"pz-kicker\">Paso 2 · Sumas de cuadrados</p><h3 class=\"pz-t\">Corrección, total, silo, día y error</h3><div class=\"pz-col\" style=\"font-size:1.05em\"><div class=\"pz-paso\" data-en=\"corr\"><span class=\"pz-n\">1</span><div>$\\dfrac{Y_{\\cdot\\cdot}^2}{N}=\\dfrac{93{,}5^2}{25}=349{,}69$</div></div><div class=\"pz-paso\" data-en=\"sct\"><span class=\"pz-n\">2</span><div>$SC_T=\\sum Y_{ij}^2-\\tfrac{Y_{\\cdot\\cdot}^2}{N}=389{,}75-349{,}69=\\mathbf{40{,}06}$</div></div><div class=\"pz-paso\" data-en=\"sctr\"><span class=\"pz-n\">3</span><div>$SC_{TRAT}=\\dfrac{1770{,}75}{\\color{#ffd166}{5}}-349{,}69=\\mathbf{4{,}46}$<span data-en=\"sctr\" class=\"pz-tenue\"> &nbsp;÷ 5 = n.º de días</span></div></div><div class=\"pz-paso\" data-en=\"scb\"><span class=\"pz-n\">4</span><div>$SC_B=\\dfrac{1797{,}25}{\\color{#7cc6fe}{5}}-349{,}69=\\mathbf{9{,}76}$<span data-en=\"scb\" class=\"pz-tenue\"> &nbsp;÷ 5 = n.º de silos</span></div></div><div class=\"pz-paso\" data-en=\"sce\"><span class=\"pz-n\">5</span><div>$SC_E=SC_T-SC_{TRAT}-SC_B=\\mathbf{25{,}84}$</div></div></div>"
  },
  {
   "en": "gl",
   "html": "<p class=\"pz-kicker\">Paso 3 · Tabla ANOVA</p><h3 class=\"pz-t\">¿Hay diferencias?</h3><table class=\"pz-tabla \"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>F₀</th><th>Valor-p</th></tr></thead><tbody><tr><td>Silo</td><td>4,46</td><td data-en=\"gl\">4</td><td data-en=\"cm\">1,11</td><td data-en=\"ft\" data-hl=\"ft fb\"><strong>0,69</strong></td><td data-en=\"ftc\">0,6092</td></tr><tr><td>Día</td><td>9,76</td><td data-en=\"gl\">4</td><td data-en=\"cm\">2,44</td><td data-en=\"fb\" data-hl=\"fb fin\"><strong>1,51</strong></td><td data-en=\"fb\">0,246</td></tr><tr><td>Error</td><td>25,84</td><td data-en=\"gl\" data-hl=\"gl cm\">16</td><td data-en=\"cm\" data-hl=\"ft conc-b\">1,62</td><td></td><td></td></tr><tr><td>Total</td><td>40,06</td><td>24</td><td></td><td></td><td></td></tr></tbody></table><div class=\"pz-cols\"><p class=\"pz-nota pz-mal\" data-en=\"conc-t\">Silo: 0,69 &lt; F(4,16) = 3,01 ⇒ <strong>no se rechaza</strong> H₀</p><p class=\"pz-nota pz-mal\" data-en=\"conc-b\">Día: 1,51 &lt; F(4,16) = 3,01 ⇒ el bloque <strong>no</strong> influye</p></div><p data-en=\"ftc\" class=\"pz-tenue\"></p>"
  },
  {
   "en": "res",
   "html": "<p class=\"pz-kicker\">Residuos</p><h3 class=\"pz-t\">¿Hay algún problema evidente?</h3><div class=\"pz-f\" data-en=\"res\">$$e_{ij}=Y_{ij}-\\bar Y_{i\\cdot}-\\bar Y_{\\cdot j}+\\bar Y_{\\cdot\\cdot}$$</div><p class=\"pz-nota\" data-en=\"res-max\">Mayor |residuo|: silo B el miércoles, e = −2,56</p><div class=\"pz-f\" data-en=\"res-d\">$$d=\\frac{e}{\\sqrt{CM_E}}=\\frac{-2{,}56}{\\sqrt{1{,}615}}=-2{,}01\\quad(|d|<2{,}5\\Rightarrow\\text{sin atípicos})$$</div><table class=\"pz-tabla pz-chica\"><thead><tr><th>Prueba</th><th>Valor-p</th><th></th></tr></thead><tbody><tr><td data-en=\"sup-sw\">Shapiro–Wilk</td><td data-en=\"sup-sw\">0,153</td><td class=\"pz-ve\" data-en=\"sup-sw\">normalidad ✓</td></tr><tr><td data-en=\"sup-lev\">Levene (silos)</td><td data-en=\"sup-lev\">0,892</td><td class=\"pz-ve\" data-en=\"sup-lev\">varianzas ✓</td></tr></tbody></table>"
  },
  {
   "en": "fin",
   "html": "<p class=\"pz-kicker\">Cierre</p><h3 class=\"pz-t\">Resumen</h3><p class=\"pz-nota pz-ok\" data-en=\"fin\">Nada salió significativo, y eso también es una conclusión. Identificar el bloque, armar la tabla y revisar residuos.</p>"
  }
 ]
});
