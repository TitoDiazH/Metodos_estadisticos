/* Memorizar · M21 Factorial 2^k (P3) */
PLATAFORMA.registrar("memorizar", [
  { id: "m21-mem-01", modulo: "m21-factorial-2k", categoria: "formula", titulo: "Efecto y SC en un 2^k",
    contenido: String.raw`Efecto $=\dfrac{\text{Contraste}}{n\,2^{k-1}}$ · $SC=\dfrac{\text{Contraste}^2}{n\,2^k}$ · 2²: $/2n$ y $/4n$ · 2³: $/4n$ y $/8n$.`,
    fuente: [{ id: "C7.4", loc: "slide 7" }] },
  { id: "m21-mem-02", modulo: "m21-factorial-2k", categoria: "formula", titulo: "Contrastes en 2²",
    contenido: String.raw`A $=a+ab-(1)-b$ · B $=b+ab-(1)-a$ · AB $=(1)+ab-a-b$. Signo de una interacción = producto de los signos de sus factores.`,
    fuente: [{ id: "C7.4", loc: "slides 5, 7 y 25" }] },
  { id: "m21-mem-03", modulo: "m21-factorial-2k", categoria: "umbral", titulo: "gl en un 2^k",
    contenido: String.raw`Cada efecto 1 gl · 2³: 7 efectos · error $2^k(n-1)$ · total $n2^k-1$. 2³ con $n=2$: error 8 gl. 2² con $n=2$: error 4 gl.`,
    fuente: [{ id: "C7.4", loc: "slide 8" }] },
  { id: "m21-mem-04", modulo: "m21-factorial-2k", categoria: "decision", titulo: "model.tables vs efecto",
    contenido: "model.tables(modelo, type = \"effects\") da la desviación de cada nivel respecto de la media general: en un 2^k es la MITAD del efecto ȳ₊ − ȳ₋ (resistencia: ±11,313 ⇒ efecto de A = 22,625).",
    fuente: [{ id: "C7.4", loc: "slides 7 y 12" }] },
  { id: "m21-mem-05", modulo: "m21-factorial-2k", categoria: "decision", titulo: "Bloques en 2^k",
    contenido: "Bloque = réplica completa ⇒ ningún efecto confundido. Jerarquía a preservar: principales > dobles > triples (se sacrifican). En R: aov(y ~ A * B + bloque).",
    fuente: [{ id: "C7.4", loc: "slides 17–20" }] },
  { id: "m21-mem-06", modulo: "m21-factorial-2k", categoria: "salida", titulo: "Ejemplos",
    contenido: "Resistencia 2³ (n = 2): significativos A, B, A:C; CME = 3,4 (8 gl). Bloques 2²: A F = 1681, B F = 361, bloque p = 0,003, A:B p = 0,39. Viscosidad 2²: efectos 11 / −6,5 / 5; F 35,85 / 12,52 / 7,41; crítico 7,71.",
    fuente: [{ id: "C7.4", loc: "slides 11, 20 y 26" }] },
  { id: "m21-mem-07", modulo: "m21-factorial-2k", categoria: "funcion-R", titulo: "<code>model.tables</code> · <code>interaction.plot</code> · <code>plot.design</code>",
    contenido: "<code>model.tables(modelo, type = \"effects\")</code> (o <code>\"means\"</code>) · <code>interaction.plot(datos$A, datos$B, datos$Y)</code> · <code>par(mfrow = c(1, 3))</code> · <code>plot.design(datos[, 2:4])</code> (sin bloques) · <code>FrF2::IAPlot(modelo)</code>.",
    fuente: [{ id: "S7.4" }, { id: "C7.4", loc: "slides 12–15 y 22" }] },
  { id: "m21-mem-08", modulo: "m21-factorial-2k", categoria: "tabla", titulo: "Construir la tabla de signos del 2³ (y del 2²)",
    contenido: String.raw`<div class="tz"><table class="signos">
<tr><th>Total</th><th class="fa">A</th><th class="fa">B</th><th class="fa">C</th><th class="in">AB</th><th class="in">AC</th><th class="in">BC</th><th class="in">ABC</th></tr>
<tr><th>(1)</th><td class="m">−</td><td class="m">−</td><td class="m">−</td><td class="p">+</td><td class="p">+</td><td class="p">+</td><td class="m">−</td></tr>
<tr><th>a</th><td class="p">+</td><td class="m">−</td><td class="m">−</td><td class="m">−</td><td class="m">−</td><td class="p">+</td><td class="p">+</td></tr>
<tr><th>b</th><td class="m">−</td><td class="p">+</td><td class="m">−</td><td class="m">−</td><td class="p">+</td><td class="m">−</td><td class="p">+</td></tr>
<tr><th>ab</th><td class="p">+</td><td class="p">+</td><td class="m">−</td><td class="p">+</td><td class="m">−</td><td class="m">−</td><td class="m">−</td></tr>
<tr><th>c</th><td class="m">−</td><td class="m">−</td><td class="p">+</td><td class="p">+</td><td class="m">−</td><td class="m">−</td><td class="p">+</td></tr>
<tr><th>ac</th><td class="p">+</td><td class="m">−</td><td class="p">+</td><td class="m">−</td><td class="p">+</td><td class="m">−</td><td class="m">−</td></tr>
<tr><th>bc</th><td class="m">−</td><td class="p">+</td><td class="p">+</td><td class="m">−</td><td class="m">−</td><td class="p">+</td><td class="m">−</td></tr>
<tr><th>abc</th><td class="p">+</td><td class="p">+</td><td class="p">+</td><td class="p">+</td><td class="p">+</td><td class="p">+</td><td class="p">+</td></tr>
</table></div>
<ol class="pasos">
<li><b>Filas en notación de Yates</b>: empieza con (1); cada letra nueva se escribe sola y luego multiplicada por todo lo anterior: (1), a → b, ab → c, ac, bc, abc.</li>
<li><b>Nombre de la fila = factores en nivel alto</b>: si la letra está, ese factor va en +; si no, en −. (1) = todos bajos.</li>
<li><b>Columnas de factores</b> (fíjate en el patrón): A alterna de a 1 (− + − +…), B de a 2 (− − + +…), C de a 4.</li>
<li><b>Columnas de interacción</b>: multiplica los signos de la fila: AB = A × B, ABC = A × B × C.</li>
<li><b>Contraste</b> = suma de los totales con el signo de su columna ⇒ Efecto $=\dfrac{\text{Contraste}}{n\,2^{k-1}}$ · $SC=\dfrac{\text{Contraste}^2}{n\,2^k}$.</li>
</ol>
<p class="regla">🧠 Para un 2² basta con las 4 primeras filas y las columnas A, B, AB. En la tabla ANOVA del $2^k$ cada efecto tiene <strong>1 gl</strong>; el Error tiene $2^k(n-1)$ gl y el Total $n\,2^k-1$.</p>`,
    fuente: [{ id: "C7.4", loc: "slides 4–5 y 7–8" }] }
]);
