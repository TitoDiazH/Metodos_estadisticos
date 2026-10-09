/* ============================================================================
   Desarrollo · M10 Análisis factorial (P1) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m10-d001",
    modulo: "m10-analisis-factorial",
    concepto: "m10-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C4.1", loc: "slides 9–14" },
      { id: "PR-P2-Q3", loc: "pregunta 3.2" }
    ],
    titulo: "Comunalidades, especificidades y varianza explicada (encuesta de servicio)",
    enunciado: `<p>Una encuesta de satisfacción mide 5 ítems. Un análisis factorial con 2 factores (variables estandarizadas, rotación Varimax) entrega estas cargas:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable</th><th>$F_1$</th><th>$F_2$</th></tr></thead><tbody><tr><td>Rapidez</td><td>$0{,}85$</td><td>$0{,}1$</td></tr><tr><td>Amabilidad</td><td>$0{,}8$</td><td>$0{,}2$</td></tr><tr><td>Limpieza</td><td>$0{,}7$</td><td>$0{,}15$</td></tr><tr><td>Precio</td><td>$0{,}15$</td><td>$0{,}9$</td></tr><tr><td>Promociones</td><td>$0{,}25$</td><td>$0{,}6$</td></tr></tbody></table></div><ol type="a"><li>Calcula la comunalidad y la especificidad de cada variable.</li><li>Calcula la varianza explicada por cada factor y la total.</li><li>Interpreta los factores. ¿Qué variable queda peor representada?</li></ol>`,
    partes: [
      { titulo: "a) Comunalidades y especificidades", puntos: 2.5, solucion: String.raw`<p>$h_i^2=a_{i1}^2+a_{i2}^2$ y $\psi_i=1-h_i^2$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable</th><th>$h^2$</th><th>$\psi$</th></tr></thead><tbody><tr><td>Rapidez</td><td>$(0{,}85)^2+(0{,}1)^2=0{,}7325$</td><td>$0{,}2675$</td></tr><tr><td>Amabilidad</td><td>$(0{,}8)^2+(0{,}2)^2=0{,}68$</td><td>$0{,}32$</td></tr><tr><td>Limpieza</td><td>$(0{,}7)^2+(0{,}15)^2=0{,}5125$</td><td>$0{,}4875$</td></tr><tr><td>Precio</td><td>$(0{,}15)^2+(0{,}9)^2=0{,}8325$</td><td>$0{,}1675$</td></tr><tr><td>Promociones</td><td>$(0{,}25)^2+(0{,}6)^2=0{,}4225$</td><td>$0{,}5775$</td></tr></tbody></table></div><p>La comunalidad es la parte de la varianza de la variable explicada por los factores comunes; $h^2+\psi=1$.</p>` },
      { titulo: "b) Varianza explicada por factor y total", puntos: 2, solucion: String.raw`<p>Suma de cargas al cuadrado por columna (SS loadings): $F_1=1{,}9375$ y $F_2=1{,}2425$.</p><p>Proporción (se divide por $p=5$): $F_1=38{,}8\,\%$, $F_2=24{,}9\,\%$; acumulada $=63{,}6\,\%$.</p><p>Comprobación: la suma de las comunalidades también es $3{,}18$.</p>` },
      { titulo: "c) Interpretación de los factores", puntos: 1.5, solucion: "<p>Con el criterio de carga significativa $>|0{,}5|$: $F_1$ agrupa Rapidez, Amabilidad, Limpieza ⇒ «calidad de la atención»; $F_2$ agrupa Precio, Promociones ⇒ «conveniencia económica».</p><p>La peor representada es Promociones ($h^2=0{,}423$, especificidad $0{,}578$): más de la mitad de su varianza es específica. La rotación no cambia las comunalidades ni la varianza total explicada.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "comunalidad de Rapidez", js: "0.85**2 + (0.1)**2", esperado: 0.7325, tol: 0.000050001 },
      { que: "SS loadings F1", js: "suma([0.85,0.8,0.7,0.15,0.25].map(a => a*a))", esperado: 1.9375, tol: 0.000050001 },
      { que: "varianza acumulada (%)", js: "100*suma([0.85,0.1,0.8,0.2,0.7,0.15,0.15,0.9,0.25,0.6].map(a => a*a))/5", esperado: 63.6, tol: 0.050000001 }
    ],
    fuente: [
      { id: "C4.1", loc: "slides 9–14" },
      { id: "PR-P2-Q3", loc: "pregunta 3.2" }
    ]
  },
  {
    id: "m10-d002",
    modulo: "m10-analisis-factorial",
    concepto: "m10-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C4.1", loc: "slides 9–14" },
      { id: "PR-P2-Q3", loc: "pregunta 3.2" }
    ],
    titulo: "Comunalidades y factores (rendimiento escolar)",
    enunciado: `<p>Se analizan las notas de 6 asignaturas. Un análisis factorial con 2 factores (variables estandarizadas, rotación Varimax) entrega estas cargas:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable</th><th>$F_1$</th><th>$F_2$</th></tr></thead><tbody><tr><td>Matemática</td><td>$0{,}9$</td><td>$0{,}15$</td></tr><tr><td>Física</td><td>$0{,}85$</td><td>$0{,}2$</td></tr><tr><td>Química</td><td>$0{,}75$</td><td>$0{,}3$</td></tr><tr><td>Lenguaje</td><td>$0{,}2$</td><td>$0{,}85$</td></tr><tr><td>Historia</td><td>$0{,}1$</td><td>$0{,}8$</td></tr><tr><td>Inglés</td><td>$0{,}35$</td><td>$0{,}55$</td></tr></tbody></table></div><ol type="a"><li>Calcula la comunalidad y la especificidad de cada variable.</li><li>Calcula la varianza explicada por cada factor y la total.</li><li>Interpreta los factores. ¿Qué variable queda peor representada?</li></ol>`,
    partes: [
      { titulo: "a) Comunalidades y especificidades", puntos: 2.5, solucion: String.raw`<p>$h_i^2=a_{i1}^2+a_{i2}^2$ y $\psi_i=1-h_i^2$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable</th><th>$h^2$</th><th>$\psi$</th></tr></thead><tbody><tr><td>Matemática</td><td>$(0{,}9)^2+(0{,}15)^2=0{,}8325$</td><td>$0{,}1675$</td></tr><tr><td>Física</td><td>$(0{,}85)^2+(0{,}2)^2=0{,}7625$</td><td>$0{,}2375$</td></tr><tr><td>Química</td><td>$(0{,}75)^2+(0{,}3)^2=0{,}6525$</td><td>$0{,}3475$</td></tr><tr><td>Lenguaje</td><td>$(0{,}2)^2+(0{,}85)^2=0{,}7625$</td><td>$0{,}2375$</td></tr><tr><td>Historia</td><td>$(0{,}1)^2+(0{,}8)^2=0{,}65$</td><td>$0{,}35$</td></tr><tr><td>Inglés</td><td>$(0{,}35)^2+(0{,}55)^2=0{,}425$</td><td>$0{,}575$</td></tr></tbody></table></div><p>La comunalidad es la parte de la varianza de la variable explicada por los factores comunes; $h^2+\psi=1$.</p>` },
      { titulo: "b) Varianza explicada por factor y total", puntos: 2, solucion: String.raw`<p>Suma de cargas al cuadrado por columna (SS loadings): $F_1=2{,}2675$ y $F_2=1{,}8175$.</p><p>Proporción (se divide por $p=6$): $F_1=37{,}8\,\%$, $F_2=30{,}3\,\%$; acumulada $=68{,}1\,\%$.</p><p>Comprobación: la suma de las comunalidades también es $4{,}085$.</p>` },
      { titulo: "c) Interpretación de los factores", puntos: 1.5, solucion: "<p>Con el criterio de carga significativa $>|0{,}5|$: $F_1$ agrupa Matemática, Física, Química ⇒ «habilidad científico-matemática»; $F_2$ agrupa Lenguaje, Historia, Inglés ⇒ «habilidad verbal-humanista».</p><p>La peor representada es Inglés ($h^2=0{,}425$, especificidad $0{,}575$): más de la mitad de su varianza es específica. La rotación no cambia las comunalidades ni la varianza total explicada.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "comunalidad de Matemática", js: "0.9**2 + (0.15)**2", esperado: 0.8325, tol: 0.000050001 },
      { que: "SS loadings F1", js: "suma([0.9,0.85,0.75,0.2,0.1,0.35].map(a => a*a))", esperado: 2.2675, tol: 0.000050001 },
      { que: "varianza acumulada (%)", js: "100*suma([0.9,0.15,0.85,0.2,0.75,0.3,0.2,0.85,0.1,0.8,0.35,0.55].map(a => a*a))/6", esperado: 68.1, tol: 0.050000001 }
    ],
    fuente: [
      { id: "C4.1", loc: "slides 9–14" },
      { id: "PR-P2-Q3", loc: "pregunta 3.2" }
    ]
  },
  {
    id: "m10-d003",
    modulo: "m10-analisis-factorial",
    concepto: "m10-c03",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C4.1", loc: "slides 9–14" },
      { id: "PR-P2-Q3", loc: "pregunta 3.2" }
    ],
    titulo: "Comunalidades con cargas negativas (bienestar laboral)",
    enunciado: `<p>Un cuestionario de clima laboral mide 5 escalas. Un análisis factorial con 2 factores (variables estandarizadas, rotación Varimax) entrega estas cargas:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable</th><th>$F_1$</th><th>$F_2$</th></tr></thead><tbody><tr><td>Autonomía</td><td>$0{,}8$</td><td>$-0{,}1$</td></tr><tr><td>Reconocimiento</td><td>$0{,}75$</td><td>$-0{,}2$</td></tr><tr><td>Estrés</td><td>$-0{,}15$</td><td>$0{,}85$</td></tr><tr><td>Carga horaria</td><td>$-0{,}05$</td><td>$0{,}7$</td></tr><tr><td>Compañerismo</td><td>$0{,}6$</td><td>$-0{,}3$</td></tr></tbody></table></div><ol type="a"><li>Calcula la comunalidad y la especificidad de cada variable.</li><li>Calcula la varianza explicada por cada factor y la total.</li><li>Interpreta los factores. ¿Qué variable queda peor representada?</li></ol>`,
    partes: [
      { titulo: "a) Comunalidades y especificidades", puntos: 2.5, solucion: String.raw`<p>$h_i^2=a_{i1}^2+a_{i2}^2$ y $\psi_i=1-h_i^2$:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Variable</th><th>$h^2$</th><th>$\psi$</th></tr></thead><tbody><tr><td>Autonomía</td><td>$(0{,}8)^2+(-0{,}1)^2=0{,}65$</td><td>$0{,}35$</td></tr><tr><td>Reconocimiento</td><td>$(0{,}75)^2+(-0{,}2)^2=0{,}6025$</td><td>$0{,}3975$</td></tr><tr><td>Estrés</td><td>$(-0{,}15)^2+(0{,}85)^2=0{,}745$</td><td>$0{,}255$</td></tr><tr><td>Carga horaria</td><td>$(-0{,}05)^2+(0{,}7)^2=0{,}4925$</td><td>$0{,}5075$</td></tr><tr><td>Compañerismo</td><td>$(0{,}6)^2+(-0{,}3)^2=0{,}45$</td><td>$0{,}55$</td></tr></tbody></table></div><p>La comunalidad es la parte de la varianza de la variable explicada por los factores comunes; $h^2+\psi=1$.</p>` },
      { titulo: "b) Varianza explicada por factor y total", puntos: 2, solucion: String.raw`<p>Suma de cargas al cuadrado por columna (SS loadings): $F_1=1{,}5875$ y $F_2=1{,}3525$.</p><p>Proporción (se divide por $p=5$): $F_1=31{,}8\,\%$, $F_2=27{,}1\,\%$; acumulada $=58{,}8\,\%$.</p><p>Comprobación: la suma de las comunalidades también es $2{,}94$.</p>` },
      { titulo: "c) Interpretación de los factores", puntos: 1.5, solucion: "<p>Con el criterio de carga significativa $>|0{,}5|$: $F_1$ agrupa Autonomía, Reconocimiento, Compañerismo ⇒ «satisfacción con el entorno»; $F_2$ agrupa Estrés, Carga horaria ⇒ «presión del trabajo».</p><p>La peor representada es Compañerismo ($h^2=0{,}45$, especificidad $0{,}55$): más de la mitad de su varianza es específica. La rotación no cambia las comunalidades ni la varianza total explicada.</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "comunalidad de Autonomía", js: "0.8**2 + (-0.1)**2", esperado: 0.65, tol: 0.000050001 },
      { que: "SS loadings F1", js: "suma([0.8,0.75,-0.15,-0.05,0.6].map(a => a*a))", esperado: 1.5875, tol: 0.000050001 },
      { que: "varianza acumulada (%)", js: "100*suma([0.8,-0.1,0.75,-0.2,-0.15,0.85,-0.05,0.7,0.6,-0.3].map(a => a*a))/5", esperado: 58.8, tol: 0.050000001 }
    ],
    fuente: [
      { id: "C4.1", loc: "slides 9–14" },
      { id: "PR-P2-Q3", loc: "pregunta 3.2" }
    ]
  },
  {
    id: "m10-d004",
    modulo: "m10-analisis-factorial",
    concepto: "m10-c06",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C4.2", loc: "slides 3–5 y 16" },
      { id: "C4.1", loc: "slide 22" },
      { id: "PR-P2-Q3", loc: "pregunta 3.1" }
    ],
    titulo: "¿Cuántos factores? Kaiser, varianza y límite del modelo (p = 7)",
    enunciado: String.raw`<p>La matriz de correlación de 7 variables tiene estos autovalores:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Factor</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></thead><tbody><tr><td>Autovalor</td><td>$2{,}8$</td><td>$1{,}6$</td><td>$1{,}1$</td><td>$0{,}6$</td><td>$0{,}45$</td><td>$0{,}3$</td><td>$0{,}15$</td></tr></tbody></table></div><ol type="a"><li>¿Cuántos factores sugiere el criterio de Kaiser?</li><li>¿Cuántos sugiere el criterio del porcentaje de varianza ($75$–$80\,\%$)?</li><li>¿Cuál es el máximo de factores que admite el modelo con este número de variables? ¿Qué decides?</li></ol>`,
    partes: [
      { titulo: "a) Criterio de Kaiser", puntos: 1.5, solucion: "<p>Se conservan los factores con autovalor $>1$: $2{,}8$, $1{,}6$, $1{,}1$ ⇒ <strong>3</strong> factores. (Kaiser tiende a subestimar el número de factores.)</p>" },
      { titulo: "b) Porcentaje de varianza acumulada", puntos: 2.5, solucion: String.raw`<p>Varianza total $=p=7$ (variables estandarizadas).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Factor</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></thead><tbody><tr><td>% varianza</td><td>$40$</td><td>$22{,}9$</td><td>$15{,}7$</td><td>$8{,}6$</td><td>$6{,}4$</td><td>$4{,}3$</td><td>$2{,}1$</td></tr><tr><td>% acumulado</td><td>$40$</td><td>$62{,}9$</td><td>$78{,}6$</td><td>$87{,}1$</td><td>$93{,}6$</td><td>$97{,}9$</td><td>$100$</td></tr></tbody></table></div><p>Se llega al rango $75$–$80\,\%$ con <strong>3</strong> factores ($78{,}6\,\%$). Es un criterio arbitrario.</p>` },
      { titulo: "c) Máximo de factores y decisión", puntos: 2, solucion: String.raw`<p>$k\le\dfrac{p-1}{2}=\dfrac{7-1}{2}=3$ ⇒ a lo más <strong>3</strong> factores.</p><p>Kaiser y el porcentaje de varianza coinciden en 3, y respeta el máximo: se extraen 3 factores.</p><p>Otros criterios de la clase: a priori, scree plot (subjetivo) y análisis paralelo (autovalor real $>$ simulado).</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "% acumulado en el corte", js: "100*suma([2.8,1.6,1.1,0.6,0.45,0.3,0.15].slice(0, 3))/suma([2.8,1.6,1.1,0.6,0.45,0.3,0.15])", esperado: 78.6, tol: 0.050000001 },
      { que: "máximo de factores", js: "Math.floor((7 - 1)/2)", esperado: 3, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C4.2", loc: "slides 3–5 y 16" },
      { id: "C4.1", loc: "slide 22" },
      { id: "PR-P2-Q3", loc: "pregunta 3.1" }
    ]
  },
  {
    id: "m10-d005",
    modulo: "m10-analisis-factorial",
    concepto: "m10-c06",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C4.2", loc: "slides 3–5 y 16" },
      { id: "C4.1", loc: "slide 22" },
      { id: "PR-P2-Q3", loc: "pregunta 3.1" }
    ],
    titulo: "¿Cuántos factores? (p = 8)",
    enunciado: String.raw`<p>Un cuestionario de 8 ítems tiene estos autovalores en su matriz de correlación:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Factor</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr></thead><tbody><tr><td>Autovalor</td><td>$3{,}6$</td><td>$1{,}9$</td><td>$0{,}8$</td><td>$0{,}6$</td><td>$0{,}5$</td><td>$0{,}3$</td><td>$0{,}2$</td><td>$0{,}1$</td></tr></tbody></table></div><ol type="a"><li>¿Cuántos factores sugiere el criterio de Kaiser?</li><li>¿Cuántos sugiere el criterio del porcentaje de varianza ($75$–$80\,\%$)?</li><li>¿Cuál es el máximo de factores que admite el modelo con este número de variables? ¿Qué decides?</li></ol>`,
    partes: [
      { titulo: "a) Criterio de Kaiser", puntos: 1.5, solucion: "<p>Se conservan los factores con autovalor $>1$: $3{,}6$, $1{,}9$ ⇒ <strong>2</strong> factores. (Kaiser tiende a subestimar el número de factores.)</p>" },
      { titulo: "b) Porcentaje de varianza acumulada", puntos: 2.5, solucion: String.raw`<p>Varianza total $=p=8$ (variables estandarizadas).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Factor</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr></thead><tbody><tr><td>% varianza</td><td>$45$</td><td>$23{,}8$</td><td>$10$</td><td>$7{,}5$</td><td>$6{,}3$</td><td>$3{,}8$</td><td>$2{,}5$</td><td>$1{,}3$</td></tr><tr><td>% acumulado</td><td>$45$</td><td>$68{,}8$</td><td>$78{,}8$</td><td>$86{,}3$</td><td>$92{,}5$</td><td>$96{,}3$</td><td>$98{,}8$</td><td>$100$</td></tr></tbody></table></div><p>Se llega al rango $75$–$80\,\%$ con <strong>3</strong> factores ($78{,}8\,\%$). Es un criterio arbitrario.</p>` },
      { titulo: "c) Máximo de factores y decisión", puntos: 2, solucion: String.raw`<p>$k\le\dfrac{p-1}{2}=\dfrac{8-1}{2}=3{,}5$ ⇒ a lo más <strong>3</strong> factores.</p><p>Kaiser da 2 y el porcentaje da 3. Ambos respetan el máximo. Se revisa además el scree plot y el análisis paralelo, y se elige la solución más interpretable; como Kaiser subestima, 3 es una elección razonable.</p><p>Otros criterios de la clase: a priori, scree plot (subjetivo) y análisis paralelo (autovalor real $>$ simulado).</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "% acumulado en el corte", js: "100*suma([3.6,1.9,0.8,0.6,0.5,0.3,0.2,0.1].slice(0, 3))/suma([3.6,1.9,0.8,0.6,0.5,0.3,0.2,0.1])", esperado: 78.8, tol: 0.050000001 },
      { que: "máximo de factores", js: "Math.floor((8 - 1)/2)", esperado: 3, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C4.2", loc: "slides 3–5 y 16" },
      { id: "C4.1", loc: "slide 22" },
      { id: "PR-P2-Q3", loc: "pregunta 3.1" }
    ]
  },
  {
    id: "m10-d006",
    modulo: "m10-analisis-factorial",
    concepto: "m10-c06",
    dificultad: 2,
    origen: "variacion",
    base: [
      { id: "C4.2", loc: "slides 3–5 y 16" },
      { id: "C4.1", loc: "slide 22" },
      { id: "PR-P2-Q3", loc: "pregunta 3.1" }
    ],
    titulo: "¿Cuántos factores? Cuando el máximo del modelo manda (p = 5)",
    enunciado: String.raw`<p>La matriz de correlación de 5 variables tiene estos autovalores:</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Factor</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><td>Autovalor</td><td>$2{,}1$</td><td>$1{,}25$</td><td>$1{,}05$</td><td>$0{,}4$</td><td>$0{,}2$</td></tr></tbody></table></div><ol type="a"><li>¿Cuántos factores sugiere el criterio de Kaiser?</li><li>¿Cuántos sugiere el criterio del porcentaje de varianza ($75$–$80\,\%$)?</li><li>¿Cuál es el máximo de factores que admite el modelo con este número de variables? ¿Qué decides?</li></ol>`,
    partes: [
      { titulo: "a) Criterio de Kaiser", puntos: 1.5, solucion: "<p>Se conservan los factores con autovalor $>1$: $2{,}1$, $1{,}25$, $1{,}05$ ⇒ <strong>3</strong> factores. (Kaiser tiende a subestimar el número de factores.)</p>" },
      { titulo: "b) Porcentaje de varianza acumulada", puntos: 2.5, solucion: String.raw`<p>Varianza total $=p=5$ (variables estandarizadas).</p><div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr><th>Factor</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><td>% varianza</td><td>$42$</td><td>$25$</td><td>$21$</td><td>$8$</td><td>$4$</td></tr><tr><td>% acumulado</td><td>$42$</td><td>$67$</td><td>$88$</td><td>$96$</td><td>$100$</td></tr></tbody></table></div><p>Se llega al rango $75$–$80\,\%$ con <strong>3</strong> factores ($88\,\%$). Es un criterio arbitrario.</p>` },
      { titulo: "c) Máximo de factores y decisión", puntos: 2, solucion: String.raw`<p>$k\le\dfrac{p-1}{2}=\dfrac{5-1}{2}=2$ ⇒ a lo más <strong>2</strong> factores.</p><p>Kaiser y el porcentaje de varianza sugieren 3, pero el modelo admite a lo más 2: se extraen <strong>2</strong> (para extraer más habría que agregar variables).</p><p>Otros criterios de la clase: a priori, scree plot (subjetivo) y análisis paralelo (autovalor real $>$ simulado).</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "% acumulado en el corte", js: "100*suma([2.1,1.25,1.05,0.4,0.2].slice(0, 3))/suma([2.1,1.25,1.05,0.4,0.2])", esperado: 88, tol: 0.050000001 },
      { que: "máximo de factores", js: "Math.floor((5 - 1)/2)", esperado: 2, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C4.2", loc: "slides 3–5 y 16" },
      { id: "C4.1", loc: "slide 22" },
      { id: "PR-P2-Q3", loc: "pregunta 3.1" }
    ]
  },
  {
    id: "m10-d007",
    modulo: "m10-analisis-factorial",
    concepto: "m10-c04",
    dificultad: 2,
    origen: "nueva",
    titulo: "¿Son adecuados los datos para un análisis factorial?",
    enunciado: String.raw`<p>Antes de un análisis factorial con 6 variables y $n=120$ se obtuvo: test de Bartlett $\chi^2=312{,}4$ con p-valor $<0{,}001$; KMO global $=0{,}78$; MSA por variable: $X_1=0{,}82$, $X_2=0{,}80$, $X_3=0{,}79$, $X_4=0{,}76$, $X_5=0{,}74$, $X_6=0{,}41$.</p><ol type="a"><li>¿Cuántos grados de libertad tiene el test de Bartlett y qué concluye?</li><li>Interpreta el KMO global.</li><li>¿Qué harías con $X_6$? ¿Cuántos factores como máximo admite el modelo?</li></ol>`,
    partes: [
      { titulo: "a) Test de Bartlett", puntos: 2, solucion: String.raw`<p>gl $=p(p-1)/2=6\cdot5/2=15$. $H_0:R=I$. Como p-valor $<0{,}05$ se rechaza $H_0$: las variables están correlacionadas y tiene sentido buscar factores comunes.</p>` },
      { titulo: "b) KMO global", puntos: 2, solucion: String.raw`<p>Regla de la clase: KMO $\ge0{,}75$ bien; $\ge0{,}5$ aceptable; $<0{,}5$ inaceptable. Con $0{,}78$ la adecuación muestral es <strong>buena</strong>: las correlaciones parciales son pequeñas frente a las correlaciones simples.</p>` },
      { titulo: "c) Variable X₆ y máximo de factores", puntos: 2, solucion: String.raw`<p>$X_6$ tiene MSA $=0{,}41<0{,}5$ (inaceptable): comparte poca varianza con el resto; conviene <strong>eliminarla</strong> y repetir KMO y Bartlett con las otras 5.</p><p>Máximo de factores: $k\le(p-1)/2$. Con $p=6$: $2{,}5$ ⇒ $2$ factores; si se elimina $X_6$ ($p=5$): también $2$.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "gl de Bartlett", js: "6*5/2", esperado: 15, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C4.1", loc: "slides 17–20 y 22" },
      { id: "C4.2", loc: "slides 15–16" }
    ]
  }
]);
