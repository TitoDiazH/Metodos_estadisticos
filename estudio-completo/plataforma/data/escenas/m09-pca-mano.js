/* GENERADO por tools/generar_escenas.js desde tools/escenas/m09-pca-mano.js — no editar a mano. */
PLATAFORMA.registrar("escena", {
 "audio": "audio-m09-pca-mano",
 "escenas": [
  {
   "en": "inicio",
   "html": "<div class=\"pz-centro\"><p class=\"pz-kicker\">Ejercicio tipo prueba · PCA a mano</p><h3 class=\"pz-t\" style=\"font-size:2.1em\">Componentes principales con una matriz 2 × 2</h3><p class=\"pz-st\">Pregunta adicional de P4 · se promedia con P1</p></div>"
  },
  {
   "en": "enun",
   "html": "<p class=\"pz-kicker\">Ejercicio tipo prueba · enunciado</p><p class=\"pz-enun\">Ventas (X₁) y utilidad (X₂) de un grupo de empresas. <span class=\"pz-clave\" data-hl=\"clave1\">Matriz de covarianza:</span> $$S=\\begin{pmatrix}5&2\\\\2&2\\end{pmatrix}$$ <span class=\"pz-clave\" data-hl=\"clave2\">Pide: autovalores, % de varianza y autovector de PC1</span>.</p>"
  },
  {
   "en": "car",
   "html": "<p class=\"pz-kicker\">Paso 1 · Autovalores</p><h3 class=\"pz-t\">Ecuación característica</h3><div class=\"pz-col\" style=\"font-size:1.05em\"><div class=\"pz-paso\" data-en=\"car\"><span class=\"pz-n\">1</span><div>$|S-\\lambda I|=0$</div></div><div class=\"pz-paso\" data-en=\"det\"><span class=\"pz-n\">2</span><div>$(5-\\lambda)(2-\\lambda)-2^2=0$</div></div><div class=\"pz-paso\" data-en=\"cuad\"><span class=\"pz-n\">3</span><div>$\\lambda^2-7\\lambda+6=0$</div></div><div class=\"pz-paso\" data-en=\"raices\"><span class=\"pz-n\">4</span><div>$\\lambda=\\dfrac{7\\pm\\sqrt{49-24}}{2}=\\dfrac{7\\pm5}{2}$</div></div><div class=\"pz-paso\" data-en=\"raices-r\"><span class=\"pz-n\">5</span><div>$\\lambda_1=\\mathbf{6},\\qquad \\lambda_2=\\mathbf{1}$</div></div></div><div class=\"pz-cols\"><div class=\"pz-suma \" data-en=\"chequeo@0.5\"><span data-en=\"chequeo@0.5\">$\\lambda_1+\\lambda_2=6+1$</span> <span data-en=\"chequeo@1.5\">$\\text{traza}=5+2$</span> <span data-en=\"chequeo@2.5\" class=\"pz-t-op\">=</span> <span data-en=\"chequeo@2.5\" class=\"pz-res\">7 ✓</span></div><div class=\"pz-suma \" data-en=\"chequeo@3.5\"><span data-en=\"chequeo@3.5\">$\\lambda_1\\lambda_2=6\\cdot1$</span> <span data-en=\"chequeo@4.5\">$|S|=5\\cdot2-2^2$</span> <span data-en=\"chequeo@5.5\" class=\"pz-t-op\">=</span> <span data-en=\"chequeo@5.5\" class=\"pz-res\">6 ✓</span></div></div>"
  },
  {
   "en": "var",
   "html": "<p class=\"pz-kicker\">Paso 2 · Varianza explicada</p><h3 class=\"pz-t\">Total = traza = 7</h3><div class=\"pz-cols\"><div class=\"pz-col\"><div class=\"pz-f\" data-en=\"var-1\">$$PC_1:\\ \\frac{6}{7}=\\mathbf{85{,}7\\,\\%}$$</div><div class=\"pz-f\" data-en=\"var-2\">$$PC_2:\\ \\frac{1}{7}=14{,}3\\,\\%$$</div><p class=\"pz-nota pz-ok\" data-en=\"var-r\">Con 1 componente ya se supera el 80 %</p></div><div style=\"height:52cqh\"><svg viewBox=\"0 0 300 220\"><path class=\"ejes\" d=\"M30,200 H290 M30,200 V10\"/><ellipse cx=\"160\" cy=\"110\" rx=\"105\" ry=\"38\" transform=\"rotate(-26.57 160 110)\" fill=\"#7cc6fe\" opacity=\".15\" stroke=\"#7cc6fe\"/><line class=\"trazo\" pathLength=\"1\" data-en=\"var-1\" x1=\"66\" y1=\"157\" x2=\"254\" y2=\"63\" stroke=\"#ffd166\" stroke-width=\"3\"/><text x=\"258\" y=\"58\" data-en=\"var-1\" style=\"fill:#ffd166\">PC1</text><line class=\"trazo\" pathLength=\"1\" data-en=\"var-2\" x1=\"145\" y1=\"80\" x2=\"175\" y2=\"140\" stroke=\"#ff8fab\" stroke-width=\"2.5\"/><text x=\"180\" y=\"150\" data-en=\"var-2\" style=\"fill:#ff8fab\">PC2</text><text x=\"160\" y=\"216\" text-anchor=\"middle\">ventas</text><text x=\"16\" y=\"110\" transform=\"rotate(-90 16 110)\" text-anchor=\"middle\">utilidad</text></svg></div></div>"
  },
  {
   "en": "vec",
   "html": "<p class=\"pz-kicker\">Paso 3 · Autovector de λ₁ = 6</p><h3 class=\"pz-t\">(S − 6I) v = 0</h3><div class=\"pz-col\" style=\"font-size:1.05em\"><div class=\"pz-paso\" data-en=\"vec-fila\"><span class=\"pz-n\">1</span><div>$(5-6)v_1+2v_2=0;\\Rightarrow;v_1=2v_2$</div></div><div class=\"pz-paso\" data-en=\"vec-prop\"><span class=\"pz-n\">2</span><div>$v\\propto(2;\\ 1)$</div></div><div class=\"pz-paso\" data-en=\"vec-norm\"><span class=\"pz-n\">3</span><div>$\\|v\\|=\\sqrt{4+1}=2{,}236;\\Rightarrow;v_1=(\\mathbf{0{,}894};\\ \\mathbf{0{,}447})$</div></div></div><div class=\"pz-f\" data-en=\"interp\">$$PC_1=0{,}894\\,X_1+0{,}447\\,X_2$$</div><p class=\"pz-nota pz-ok\" data-en=\"interp-r\">Mismo signo ⇒ índice de <strong>tamaño</strong>; pesa más ventas (más varianza)</p><p class=\"pz-nota\" data-en=\"signo\">El signo del autovector es arbitrario: (−0,894; −0,447) es el mismo componente</p>"
  },
  {
   "en": "fin",
   "html": "<p class=\"pz-kicker\">Cierre</p><h3 class=\"pz-t\">Esquema para la prueba</h3><ul class=\"pz-lista\"><li data-en=\"fin\">Ecuación característica y raíces</li><li data-en=\"fin\">Chequeo: traza y determinante</li><li data-en=\"fin\">% de varianza = λ / traza</li><li data-en=\"fin\">Autovector normalizado e interpretación por signos</li></ul>"
  }
 ]
});
