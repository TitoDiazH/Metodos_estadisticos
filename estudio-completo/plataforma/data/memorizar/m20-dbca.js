/* Memorizar · M20 DBCA (P3) */
PLATAFORMA.registrar("memorizar", [
  { id: "m20-mem-01", modulo: "m20-dbca", categoria: "decision", titulo: "Factor de bloque",
    contenido: "Factor perturbador que se incluye explícitamente, no porque interese su efecto, sino para controlarlo y reducir el error experimental. Importancia secundaria.",
    fuente: [{ id: "C7.3", loc: "slides 4–5" }] },
  { id: "m20-mem-02", modulo: "m20-dbca", categoria: "formula", titulo: "Modelo y supuestos del DBCA",
    contenido: String.raw`$Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij}$ · $\varepsilon\sim N(0,\sigma^2)$ independientes · aditivo (sin interacción trat × bloque) · completo · aleatorización dentro de cada bloque.`,
    fuente: [{ id: "C7.3", loc: "slides 7–8" }] },
  { id: "m20-mem-03", modulo: "m20-dbca", categoria: "formula", titulo: "Sumas de cuadrados",
    contenido: String.raw`$SC_{TRAT}=\sum Y_{i\cdot}^2/b-Y_{\cdot\cdot}^2/N$ · $SC_B=\sum Y_{\cdot j}^2/k-Y_{\cdot\cdot}^2/N$ · $SC_E=SC_T-SC_{TRAT}-SC_B$ · gl: $k-1$, $b-1$, $(k-1)(b-1)$, $N-1$.`,
    fuente: [{ id: "C7.3", loc: "slides 9–10" }] },
  { id: "m20-mem-04", modulo: "m20-dbca", categoria: "formula", titulo: "LSD en DBCA",
    contenido: String.raw`$LSD=t_{\alpha/2,(k-1)(b-1)}\sqrt{2\,CME/b}$ (DCA: $t_{\alpha/2,N-k}\sqrt{2\,CME/n}$).`,
    fuente: [{ id: "C7.3", loc: "slide 15" }] },
  { id: "m20-mem-05", modulo: "m20-dbca", categoria: "decision", titulo: "Leer el bloque",
    contenido: "Bloque significativo ⇒ el bloqueo fue efectivo (influye en Y). No significativo ⇒ argumento para no controlarlo en el futuro. Sin bloque, su SC pasa al error y se pierde potencia.",
    fuente: [{ id: "C7.3", loc: "slides 14 y 17" }] },
  { id: "m20-mem-06", modulo: "m20-dbca", categoria: "salida", titulo: "Ejemplos",
    contenido: "Ensamble: SC 61,5 / 28,5 / 18; F 10,25 (p 0,003) y 4,75 (p 0,030); LSD 2,262. Fertilizantes: SC 72 / 60 / 24; F 9,00 y 5,00; LSD 3,46; sin bloque F = 3,86 < 4,26.",
    fuente: [{ id: "C7.3", loc: "slides 12, 15 y 17" }] },
  { id: "m20-mem-07", modulo: "m20-dbca", categoria: "funcion-R", titulo: "<code>aov(y ~ trat + bloque)</code> · <code>LSD.test</code>",
    contenido: "<code>modelo &lt;- aov(y ~ metodo + operador, data = datos)</code> · <code>summary(modelo)</code> · <code>library(agricolae)</code> · <code>LSD.test(modelo, \"metodo\")$groups</code>. Tratamiento y bloque como <code>factor()</code>.",
    fuente: [{ id: "S7.3" }] },
  { id: "m20-mem-08", modulo: "m20-dbca", categoria: "tabla", titulo: "DBCA: totales de fila y columna → tabla ANOVA (ejemplo ensamble)",
    contenido: String.raw`<div class="tz"><table class="matriz">
<tr><th>Método \ Operador</th><th class="c">Op. 1</th><th class="c">Op. 2</th><th class="c">Op. 3</th><th class="c">Op. 4</th><th class="f">$Y_{i\cdot}$</th></tr>
<tr><th class="f">A</th><td>6</td><td>9</td><td>7</td><td>8</td><td class="f">30</td></tr>
<tr><th class="f">B</th><td>7</td><td>10</td><td>11</td><td>8</td><td class="f">36</td></tr>
<tr><th class="f">C</th><td>10</td><td>16</td><td>11</td><td>14</td><td class="f">51</td></tr>
<tr><th class="f">D</th><td>10</td><td>13</td><td>11</td><td>9</td><td class="f">43</td></tr>
<tr><th class="c">$Y_{\cdot j}$</th><td class="c">33</td><td class="c">48</td><td class="c">40</td><td class="c">39</td><td class="g">$Y_{\cdot\cdot}=160$</td></tr>
</table></div>
<p>Filas = <span class="mk mk-f">tratamientos</span> ($k=4$) · columnas = <span class="mk mk-c">bloques</span> ($b=4$) · $N=k\,b=16$ · término de corrección $Y_{\cdot\cdot}^2/N=160^2/16=1600$.</p>
<p class="regla">🧠 <strong>Receta única para cualquier SC:</strong> $\dfrac{\sum(\text{total})^2}{\text{n.º de datos que suma cada total}}-\dfrac{Y_{\cdot\cdot}^2}{N}$</p>
<ul class="claves">
<li><span class="mk mk-f">Tratamientos</span> totales de fila; cada uno suma $b$ datos ⇒ $SC_{TRAT}=\frac{30^2+36^2+51^2+43^2}{4}-1600=61{,}5$</li>
<li><span class="mk mk-c">Bloques</span> totales de columna; cada uno suma $k$ datos ⇒ $SC_B=\frac{33^2+48^2+40^2+39^2}{4}-1600=28{,}5$</li>
<li><span class="mk mk-d">Total</span> cada dato es su propio «total» (suma 1 dato) ⇒ $SC_T=\sum\sum Y_{ij}^2-1600=108$</li>
<li><span class="mk mk-e">Error</span> por diferencia ⇒ $SC_E=108-61{,}5-28{,}5=18$</li>
</ul>
<div class="tz"><table class="armar">
<tr><th>FV</th><th>gl</th><th>SC</th><th>CM</th><th>$F_0$</th></tr>
<tr class="r-f"><td>Tratamientos</td><td>$k-1=3$</td><td>61,5</td><td>20,5</td><td>$20{,}5/2=10{,}25$</td></tr>
<tr class="r-c"><td>Bloques</td><td>$b-1=3$</td><td>28,5</td><td>9,5</td><td>$9{,}5/2=4{,}75$</td></tr>
<tr class="r-e"><td>Error</td><td>$(k-1)(b-1)=9$</td><td>18</td><td>$CME=2$</td><td class="vacio">—</td></tr>
<tr class="r-t"><td>Total</td><td>$N-1=15$</td><td>108</td><td class="vacio">—</td><td class="vacio">—</td></tr>
</table></div>
<p class="regla">🧠 Es la tabla del DCA con <strong>una fila más (Bloques)</strong>. gl del Error = producto de los gl de las dos filas de arriba: $(k-1)(b-1)$, no $N-k$.</p>`,
    verifica: [
      { que: "SC_TRAT ensamble", js: "(30*30+36*36+51*51+43*43)/4 - 160*160/16", esperado: 61.5, tol: 1e-9 },
      { que: "SC_B ensamble", js: "(33*33+48*48+40*40+39*39)/4 - 160*160/16", esperado: 28.5, tol: 1e-9 },
      { que: "SC_T ensamble", js: "suma([6,9,7,8,7,10,11,8,10,16,11,14,10,13,11,9].map(v=>v*v)) - 1600", esperado: 108, tol: 1e-9 },
      { que: "F trat", js: "(61.5/3)/(18/9)", esperado: 10.25, tol: 1e-9 },
      { que: "F bloque", js: "(28.5/3)/(18/9)", esperado: 4.75, tol: 1e-9 }
    ],
    fuente: [{ id: "C7.3", loc: "slides 9–12" }] }
]);
