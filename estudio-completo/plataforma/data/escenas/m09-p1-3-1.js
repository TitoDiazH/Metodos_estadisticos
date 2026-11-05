/* GENERADO por tools/generar_escenas.js desde tools/escenas/m09-p1-3-1.js — no editar a mano. */
PLATAFORMA.registrar("escena", {
 "audio": "audio-m09-p1-3-1",
 "escenas": [
  {
   "en": "inicio",
   "html": "<div class=\"pz-centro\"><p class=\"pz-kicker\">Prueba 1 (2026-20) · Pregunta 3.1</p><h3 class=\"pz-t\" style=\"font-size:2.1em\">Componentes principales en retail</h3><p class=\"pz-st\">Pregunta adicional de P4 · se promedia con P1</p></div>"
  },
  {
   "en": "enun",
   "html": "<p class=\"pz-kicker\">Prueba 1 (2026-20) · Pregunta 3.1 · enunciado</p><p class=\"pz-enun\">50 clientes, 4 variables: frecuencia, gasto, categorías y cupones. <span class=\"pz-clave\" data-hl=\"clave1\">summary(pca): desviaciones estándar</span> y <span class=\"pz-clave\" data-hl=\"clave2\">pca&#36;rotation: loadings</span>. <span class=\"pz-clave\" data-hl=\"clave3\">Variables estandarizadas</span>.</p><div class=\"pz-datos\"><table class=\"pz-tabla pz-chica\"><thead><tr><th></th><th>PC1</th><th>PC2</th><th>PC3</th><th>PC4</th></tr></thead><tbody><tr><th>Std. dev.</th><td>1,25</td><td>0,98</td><td>0,9</td><td>0,8</td></tr><tr><th>Frecuencia</th><td>0,621</td><td>−0,281</td><td>−0,041</td><td>−0,731</td></tr><tr><th>Gasto</th><td>0,452</td><td>0,541</td><td>−0,612</td><td>0,359</td></tr><tr><th>Categorías</th><td>0,538</td><td>−0,474</td><td>0,372</td><td>0,592</td></tr><tr><th>Cupones</th><td>−0,349</td><td>−0,637</td><td>−0,696</td><td>0,021</td></tr></tbody></table></div>"
  },
  {
   "en": "autovalor",
   "html": "<p class=\"pz-kicker\">¿Cuántos componentes?</p><h3 class=\"pz-t\">Autovalor = desviación estándar²</h3><table class=\"pz-tabla \"><thead><tr><th></th><th>PC1</th><th>PC2</th><th>PC3</th><th>PC4</th></tr></thead><tbody><tr><th>sd</th><td>1,25</td><td>0,98</td><td>0,9</td><td>0,8</td></tr><tr><th>λ = sd²</th><td class=\"pz-ve\" data-en=\"lam\" data-hl=\"kaiser prop\">1,5625</td><td data-en=\"lam\">0,9604</td><td data-en=\"lam\">0,81</td><td data-en=\"lam\">0,64</td></tr><tr><th>% acumulado</th><td data-en=\"acum\">39,3 %</td><td data-en=\"acum\">63,5 %</td><td data-en=\"acum\" data-hl=\"k80 nocoinciden\">83,9 %</td><td data-en=\"acum\">100 %</td></tr></tbody></table><div class=\"pz-cols\"><p class=\"pz-nota pz-ok\" data-en=\"kaiser-r\">Kaiser (λ &gt; 1): <strong>1 componente</strong></p><p class=\"pz-nota pz-ok\" data-en=\"k80\">≥ 80 % acumulado: <strong>3 componentes</strong></p></div><p data-en=\"prop\" class=\"pz-tenue\">Total = 3,9729 · % = λ / total</p><p class=\"pz-nota\" data-en=\"nocoinciden\">Los criterios no coinciden: se aplican ambos y se justifica</p>"
  },
  {
   "en": "pc1",
   "html": "<p class=\"pz-kicker\">Expresión e interpretación</p><h3 class=\"pz-t\">PC1 con variables estandarizadas</h3><div class=\"pz-f\" data-en=\"pc1-f\">$$PC_1=0{,}621\\,Z_{\\text{Frec}}+0{,}452\\,Z_{\\text{Gasto}}+0{,}538\\,Z_{\\text{Categ}}-0{,}349\\,Z_{\\text{Cupones}}$$</div><p class=\"pz-nota\" data-en=\"zeta\">Con $Z=(X-\\bar X)/s$, no con las variables originales</p><table class=\"pz-tabla pz-chica\"><thead><tr><th>Variable</th><th>Loading PC1</th><th>Signo</th></tr></thead><tbody><tr><td data-en=\"interp-pos\">Frecuencia</td><td data-en=\"interp-pos\">0,621</td><td class=\"pz-ve\" data-en=\"interp-pos\">+</td></tr><tr><td data-en=\"interp-pos\">Gasto</td><td data-en=\"interp-pos\">0,452</td><td class=\"pz-ve\" data-en=\"interp-pos\">+</td></tr><tr><td data-en=\"interp-pos\">Categorías</td><td data-en=\"interp-pos\">0,538</td><td class=\"pz-ve\" data-en=\"interp-pos\">+</td></tr><tr><td data-en=\"interp-neg\">Cupones</td><td data-en=\"interp-neg\">−0,349</td><td class=\"pz-ro\" data-en=\"interp-neg\">−</td></tr></tbody></table><p class=\"pz-nota pz-ok\" data-en=\"interp-r\">PC1 = índice de <strong>intensidad de compra</strong>: alto si compra seguido, gasta más y lleva más categorías; bajo si usa más cupones</p>"
  },
  {
   "en": "nuevo",
   "html": "<p class=\"pz-kicker\">El cliente nuevo</p><h3 class=\"pz-t\">¿Se reemplaza directo en la fórmula?</h3><p data-en=\"nuevo\">Frecuencia = 10 · Gasto = 58 000 · Categorías = 5 · Cupones = 3</p><p class=\"pz-nota pz-mal\" data-en=\"nuevo-r\"><strong>No</strong>: la fórmula usa variables estandarizadas</p><div class=\"pz-f\" data-en=\"nuevo-z\">$$Z_j=\\frac{X_j-\\bar X_j}{s_j}\\quad\\Rightarrow\\quad PC_1=\\sum_j a_{j1}\\,Z_j$$</div><p class=\"pz-nota\" data-en=\"nuevo-falta\">Sin las medias y desviaciones de la muestra, el score no se puede calcular: se explica el procedimiento</p><ul class=\"pz-lista\"><li data-en=\"fin\">sd² = autovalor · Kaiser y 80 % · PC1 con Z · interpretar por signos · estandarizar antes del score</li></ul>"
  }
 ]
});
