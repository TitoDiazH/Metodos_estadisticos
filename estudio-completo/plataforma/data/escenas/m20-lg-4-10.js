/* GENERADO por tools/generar_escenas.js desde tools/escenas/m20-lg-4-10.js — no editar a mano. */
PLATAFORMA.registrar("escena", {
 "audio": "audio-m20-lg-4-10",
 "escenas": [
  {
   "en": "inicio",
   "html": "<div class=\"pz-centro\"><p class=\"pz-kicker\">Libro guía · Cap. 4, ej. 10</p><h3 class=\"pz-t\" style=\"font-size:2.1em\">Atomizadores y el efecto del día</h3><p class=\"pz-st\">Diseño en bloques completos al azar (DBCA)</p></div>"
  },
  {
   "en": "enun",
   "html": "<p class=\"pz-kicker\">Libro guía · Cap. 4, ej. 10 · enunciado</p><p class=\"pz-enun\">3 marcas de atomizador; cada una se aplica a 100 moscas y se registra el % de moscas muertas. <span class=\"pz-clave\" data-hl=\"clave1\">Se hicieron 6 réplicas en días diferentes, por lo que se sospecha un efecto del día</span>. <span class=\"pz-clave\" data-hl=\"clave2\">⇒ el día es el bloque</span>. <span class=\"pz-clave\" data-hl=\"clave3\">Objetivo: matar más moscas (mayor es mejor)</span>.</p><div class=\"pz-datos\"><table class=\"pz-tabla pz-chica\"><thead><tr><th></th><th>D1</th><th>D2</th><th>D3</th><th>D4</th><th>D5</th><th>D6</th></tr></thead><tbody><tr><th>Marca 1</th><td>72</td><td>65</td><td>67</td><td>75</td><td>62</td><td>73</td></tr><tr><th>Marca 2</th><td>55</td><td>59</td><td>68</td><td>70</td><td>53</td><td>50</td></tr><tr><th>Marca 3</th><td>64</td><td>74</td><td>61</td><td>58</td><td>51</td><td>69</td></tr></tbody></table></div>"
  },
  {
   "en": "dis",
   "html": "<p class=\"pz-kicker\">Identificar el diseño</p><h3 class=\"pz-t\">¿Qué es tratamiento y qué es bloque?</h3><div class=\"pz-cols\"><ul class=\"pz-lista\"><li data-en=\"dis\">Tratamiento: <span class=\"pz-am\">marca</span> · $k=3$</li><li data-en=\"dis\">Bloque: <span class=\"pz-ce\">día</span> · $b=6$</li><li data-en=\"dis\">$N=k\\cdot b=18$ datos</li></ul><div><div class=\"pz-f\" data-en=\"modelo\">$$Y_{ij}=\\mu+\\tau_i+\\gamma_j+\\varepsilon_{ij}$$</div><div class=\"pz-f\" data-en=\"h0t\">$$H_0:\\tau_1=\\dots=\\tau_{3}=0$$</div><div class=\"pz-f\" data-en=\"h0b\">$$H_0:\\gamma_1=\\dots=\\gamma_{6}=0$$</div></div></div>"
  },
  {
   "en": "tot",
   "html": "<p class=\"pz-kicker\">Paso 1 · Totales</p><h3 class=\"pz-t\">Totales por marca, por día y global</h3><table class=\"pz-tabla pz-chica\"><thead><tr><th></th><th>D1</th><th>D2</th><th>D3</th><th>D4</th><th>D5</th><th>D6</th><th class=\"pz-tot\">$Y_{i\\cdot}$</th></tr></thead><tbody><tr><th>Marca 1</th><td>72</td><td>65</td><td>67</td><td>75</td><td>62</td><td>73</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">414</td></tr><tr><th>Marca 2</th><td>55</td><td>59</td><td>68</td><td>70</td><td>53</td><td>50</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">355</td></tr><tr><th>Marca 3</th><td>64</td><td>74</td><td>61</td><td>58</td><td>51</td><td>69</td><td class=\"pz-tot\" data-en=\"tot-i\" data-hl=\"sctr scb\">377</td></tr><tr><th>$Y_{\\cdot j}$</th><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">191</td><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">198</td><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">196</td><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">203</td><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">166</td><td class=\"pz-tot\" data-en=\"tot-j\" data-hl=\"scb sce\">192</td><td class=\"pz-tot\" data-en=\"tot-g\" data-hl=\"corr sct\">1146</td></tr></tbody></table>"
  },
  {
   "en": "corr",
   "html": "<p class=\"pz-kicker\">Paso 2 · Sumas de cuadrados</p><h3 class=\"pz-t\">Corrección, total, marca, día y error</h3><div class=\"pz-col\" style=\"font-size:1.05em\"><div class=\"pz-paso\" data-en=\"corr\"><span class=\"pz-n\">1</span><div>$\\dfrac{Y_{\\cdot\\cdot}^2}{N}=\\dfrac{1146^2}{18}=72962$</div></div><div class=\"pz-paso\" data-en=\"sct\"><span class=\"pz-n\">2</span><div>$SC_T=\\sum Y_{ij}^2-\\tfrac{Y_{\\cdot\\cdot}^2}{N}=74054-72962=\\mathbf{1092}$</div></div><div class=\"pz-paso\" data-en=\"sctr\"><span class=\"pz-n\">3</span><div>$SC_{TRAT}=\\dfrac{439550}{\\color{#ffd166}{6}}-72962=\\mathbf{296{,}333}$<span data-en=\"sctr\" class=\"pz-tenue\"> &nbsp;÷ 6 = n.º de días</span></div></div><div class=\"pz-paso\" data-en=\"scb\"><span class=\"pz-n\">4</span><div>$SC_B=\\dfrac{219730}{\\color{#7cc6fe}{3}}-72962=\\mathbf{281{,}333}$<span data-en=\"scb\" class=\"pz-tenue\"> &nbsp;÷ 3 = n.º de marcas</span></div></div><div class=\"pz-paso\" data-en=\"sce\"><span class=\"pz-n\">5</span><div>$SC_E=SC_T-SC_{TRAT}-SC_B=\\mathbf{514{,}333}$</div></div></div>"
  },
  {
   "en": "gl",
   "html": "<p class=\"pz-kicker\">Paso 3 · Tabla ANOVA</p><h3 class=\"pz-t\">¿Hay diferencias?</h3><table class=\"pz-tabla \"><thead><tr><th>Fuente</th><th>SC</th><th>gl</th><th>CM</th><th>F₀</th><th>Valor-p</th></tr></thead><tbody><tr><td>Marca</td><td>296,333</td><td data-en=\"gl\">2</td><td data-en=\"cm\">148,167</td><td data-en=\"ft\" data-hl=\"ft fb\"><strong>2,88</strong></td><td data-en=\"ftc\">0,1028</td></tr><tr><td>Día</td><td>281,333</td><td data-en=\"gl\">5</td><td data-en=\"cm\">56,267</td><td data-en=\"fb\" data-hl=\"fb fin\"><strong>1,09</strong></td><td data-en=\"fb\">0,4207</td></tr><tr><td>Error</td><td>514,333</td><td data-en=\"gl\" data-hl=\"gl cm\">10</td><td data-en=\"cm\" data-hl=\"ft conc-b\">51,433</td><td></td><td></td></tr><tr><td>Total</td><td>1092</td><td>17</td><td></td><td></td><td></td></tr></tbody></table><div class=\"pz-cols\"><p class=\"pz-nota pz-mal\" data-en=\"conc-t\">Marca: 2,88 &lt; F(2,10) = 4,1 ⇒ <strong>no se rechaza</strong> H₀</p><p class=\"pz-nota pz-mal\" data-en=\"conc-b\">Día: 1,09 &lt; F(5,10) = 3,33 ⇒ el bloque <strong>no</strong> influye</p></div><p data-en=\"ftc\" class=\"pz-tenue\"></p>"
  },
  {
   "en": "lsd",
   "html": "<p class=\"pz-kicker\">Paso 4 · Comparaciones</p><h3 class=\"pz-t\">¿Hay un atomizador mejor?</h3><div class=\"pz-f\" data-en=\"lsd-n\">$$LSD=t_{0{,}025;\\,10}\\sqrt{\\frac{2\\,CM_E}{b}}=2{,}228\\sqrt{\\frac{2\\cdot51{,}4333}{6}}=\\mathbf{9{,}226}$$</div><div class=\"pz-cols\"><table class=\"pz-tabla pz-chica\"><thead><tr><th>Marca</th><th>Media</th></tr></thead><tbody><tr><td data-en=\"medias\">Marca 1</td><td data-en=\"medias\">69</td></tr><tr><td data-en=\"medias\">Marca 3</td><td data-en=\"medias\">62,833</td></tr><tr><td data-en=\"medias\">Marca 2</td><td data-en=\"medias\">59,167</td></tr></tbody></table><table class=\"pz-tabla pz-chica\"><thead><tr><th>Par</th><th>|dif.|</th><th>¿Difieren?</th></tr></thead><tbody><tr><td data-en=\"pares\">1 − 2</td><td data-en=\"pares\">9,83</td><td class=\"pz-ve\" data-en=\"pares\">Sí</td></tr><tr><td data-en=\"pares\">1 − 3</td><td data-en=\"pares\">6,17</td><td class=\"pz-ro\" data-en=\"pares\">No</td></tr><tr><td data-en=\"pares\">2 − 3</td><td data-en=\"pares\">3,67</td><td class=\"pz-ro\" data-en=\"pares\">No</td></tr></tbody></table></div><p class=\"pz-nota pz-mal\" data-en=\"mejor\">⚠ El ANOVA <strong>no</strong> rechazó: no se puede declarar un atomizador mejor. La LSD solo se mira tras un ANOVA significativo.</p>"
  },
  {
   "en": "sup",
   "html": "<p class=\"pz-kicker\">Supuestos</p><h3 class=\"pz-t\">Normalidad y varianza constante</h3><table class=\"pz-tabla \"><thead><tr><th>Supuesto</th><th>Prueba</th><th>Valor-p</th><th>Conclusión</th></tr></thead><tbody><tr><td data-en=\"sup-sw\">Normalidad de residuos</td><td data-en=\"sup-sw\">Shapiro–Wilk</td><td data-en=\"sup-sw\">0,554</td><td class=\"pz-ve\" data-en=\"sup-sw\">Se cumple</td></tr><tr><td data-en=\"sup-lev\">Igual varianza entre marcas</td><td data-en=\"sup-lev\">Levene</td><td data-en=\"sup-lev\">0,600</td><td class=\"pz-ve\" data-en=\"sup-lev\">Se cumple</td></tr></tbody></table><p data-en=\"sup-sw\" class=\"pz-tenue\">Gráficamente: QQ-plot de residuos y residuos vs. predichos sin forma de embudo</p>"
  },
  {
   "en": "fin",
   "html": "<p class=\"pz-kicker\">Cierre</p><h3 class=\"pz-t\">Resumen</h3><p class=\"pz-nota pz-ok\" data-en=\"fin\">Identificar el bloque en el enunciado, y no buscar «el mejor» si el ANOVA no detectó diferencias</p>"
  }
 ]
});
