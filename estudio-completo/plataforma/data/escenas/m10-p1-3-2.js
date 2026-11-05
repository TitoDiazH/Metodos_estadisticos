/* GENERADO por tools/generar_escenas.js desde tools/escenas/m10-p1-3-2.js — no editar a mano. */
PLATAFORMA.registrar("escena", {
 "audio": "audio-m10-p1-3-2",
 "escenas": [
  {
   "en": "inicio",
   "html": "<div class=\"pz-centro\"><p class=\"pz-kicker\">Prueba 1 (2026-20) · Pregunta 3.2</p><h3 class=\"pz-t\" style=\"font-size:2.1em\">Leer un análisis factorial en R</h3><p class=\"pz-st\">Pregunta adicional de P4 · se promedia con P1</p></div>"
  },
  {
   "en": "enun",
   "html": "<p class=\"pz-kicker\">Prueba 1 (2026-20) · Pregunta 3.2 · enunciado</p><p class=\"pz-enun\">300 clientes evalúan 10 criterios del servicio de entrega. <span class=\"pz-clave\" data-hl=\"clave1\">KMO(cor_mat)</span> y <span class=\"pz-clave\" data-hl=\"clave2\">principal(…, nfactors = 3, rotate = \"varimax\")</span>. <span class=\"pz-clave\" data-hl=\"clave3\">4 preguntas: KMO · comunalidades · ¿factores correlacionados? · Mean item complexity</span>.</p>"
  },
  {
   "en": "kmo",
   "html": "<p class=\"pz-kicker\">La prueba KMO</p><h3 class=\"pz-t\">Correlaciones simples vs. parciales</h3><div class=\"pz-f\" data-en=\"kmo-parcial\">$$KMO=\\frac{\\sum r_{ij}^2}{\\sum r_{ij}^2+\\sum a_{ij}^2}\\qquad a_{ij}:\\text{ correlación parcial}$$</div><p class=\"pz-nota\" data-en=\"kmo-idea\">Parciales chicas frente a las simples ⇒ estructura común ⇒ tiene sentido buscar factores</p><p data-en=\"kmo-global\">Overall MSA = <strong class=\"pz-ve\">0,64</strong> &nbsp;(≥ 0,5: aceptable)</p><table class=\"pz-tabla pz-chica\"><thead><tr><th>precio</th><th>descuentos</th><th>cond pago</th><th>calidad prod</th><th>confiabilidad</th><th>certificaciones</th><th>tiempo entrega</th><th>soporte tecnico</th><th>comunicacion</th><th>flexibilidad</th></tr></thead><tbody><tr><td data-en=\"kmo-bajos\">0,88</td><td data-en=\"kmo-bajos\">0,93</td><td data-en=\"kmo-bajos\">0,94</td><td data-en=\"kmo-bajos\">0,68</td><td data-en=\"kmo-bajos\">0,78</td><td data-en=\"kmo-bajos\">0,97</td><td data-en=\"kmo-bajos\">0,55</td><td class=\"pz-ro\" data-en=\"kmo-bajos\" data-hl=\"kmo-st\">0,17</td><td class=\"pz-ro\" data-en=\"kmo-bajos\" data-hl=\"kmo-com\">0,23</td><td class=\"pz-ro\" data-en=\"kmo-bajos\">0,42</td></tr></tbody></table>"
  },
  {
   "en": "h2",
   "html": "<p class=\"pz-kicker\">Comunalidades</p><h3 class=\"pz-t\">h2: varianza explicada por los factores</h3><table class=\"pz-tabla pz-chica pz-mini\"><thead><tr><th></th><th>RC1</th><th>RC2</th><th>RC3</th><th>h2</th><th>u2</th><th>com</th></tr></thead><tbody><tr><th>precio</th><td>0,91</td><td></td><td></td><td class=\"pz-am\">0,89</td><td>0,105</td><td>1,1</td></tr><tr><th>descuentos</th><td>0,92</td><td></td><td></td><td class=\"pz-am\">0,85</td><td>0,145</td><td>1</td></tr><tr><th>cond_pago</th><td>0,91</td><td></td><td></td><td class=\"pz-am\">0,85</td><td>0,154</td><td>1,1</td></tr><tr><th>calidad_prod</th><td></td><td></td><td>0,95</td><td class=\"pz-am\">0,96</td><td>0,039</td><td>1,1</td></tr><tr><th>confiabilidad</th><td>0,53</td><td></td><td>0,81</td><td class=\"pz-am\">0,93</td><td>0,068</td><td>1,7</td></tr><tr><th>certificaciones</th><td>0,89</td><td></td><td></td><td class=\"pz-am\">0,91</td><td>0,091</td><td>1,3</td></tr><tr><th>tiempo_entrega</th><td>0,85</td><td></td><td></td><td class=\"pz-am\">0,83</td><td>0,165</td><td>1,3</td></tr><tr><th>soporte_tecnico</th><td></td><td>0,8</td><td></td><td class=\"pz-am\" data-hl=\"peor\">0,65</td><td data-hl=\"pauta rot\">0,355</td><td>1</td></tr><tr><th>comunicacion</th><td></td><td>0,89</td><td></td><td class=\"pz-am\">0,8</td><td>0,197</td><td>1</td></tr><tr><th>flexibilidad</th><td></td><td>0,89</td><td></td><td class=\"pz-am\" data-hl=\"mejor\">0,97</td><td>0,028</td><td>1,5</td></tr></tbody></table><div class=\"pz-cols\"><p class=\"pz-nota pz-ok\" data-en=\"mejor\">Mejor: <strong>flexibilidad</strong>, h2 = 0,97</p><p class=\"pz-nota pz-mal\" data-en=\"peor\">Peor: <strong>soporte técnico</strong>, h2 = 0,65</p></div><p class=\"pz-nota\" data-en=\"pauta\">⚠ La pauta dice «comunalidad ≈ 0,35»: eso es u2 (especificidad), no h2</p>"
  },
  {
   "en": "rot",
   "html": "<p class=\"pz-kicker\">Rotación y complejidad</p><h3 class=\"pz-t\">Varimax y Mean item complexity</h3><p class=\"pz-nota pz-ok\" data-en=\"rot-r\">Varimax es <strong>ortogonal</strong> ⇒ los factores <strong>no</strong> están correlacionados</p><p data-en=\"rot-obl\" class=\"pz-tenue\">Oblimin o Promax (oblicuas) sí permitirían correlación</p><div class=\"pz-f\" data-en=\"com-n\">$$\\overline{com}=\\frac{1{,}1+1+1{,}1+1{,}1+1{,}7+1{,}3+1{,}3+1+1+1{,}5}{10}=1{,}21$$</div><p class=\"pz-nota\" data-en=\"com-idea\">≈ 1 ⇒ cada variable carga en un solo factor: estructura simple</p><p data-en=\"com-conf\" class=\"pz-tenue\">Más compleja: confiabilidad (1,7), carga en RC1 y RC3</p><ul class=\"pz-lista\"><li data-en=\"fin\">Qué columna mirar: MSA por variable · h2 · tipo de rotación · com</li></ul>"
  }
 ]
});
