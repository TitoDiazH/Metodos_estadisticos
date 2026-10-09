/* ============================================================================
   Desarrollo · M08 T² de Hotelling (P1) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m08-d001",
    modulo: "m08-t2-hotelling",
    concepto: "m08-c02",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 43–44 y 48" }
    ],
    titulo: "T² de Hotelling: dos características de un producto",
    enunciado: String.raw`<p>Control de calidad de un envase. Se miden peso (g) ($X_1$) y altura (mm) ($X_2$): $n=20$, $\bar x=\begin{pmatrix}52\\28\end{pmatrix}$, $S=\begin{pmatrix}16&6\\6&9\end{pmatrix}$. Los valores de referencia son $\mu_0=\begin{pmatrix}50\\30\end{pmatrix}$. Usa $\alpha=5\,\%$ y supón normalidad bivariada.</p><ol type="a"><li>Plantea las hipótesis y calcula $S^{-1}$.</li><li>Calcula $T^2$.</li><li>Calcula el valor crítico, decide y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis e inversa de S", puntos: 2, solucion: String.raw`<p>$H_0:\mu=\mu_0$ contra $H_1:\mu\neq\mu_0$ (contraste conjunto de las dos medias).</p><p>$|S|=16\cdot9-6^2=108$ ⇒ $S^{-1}=\dfrac{1}{108}\begin{pmatrix}9&-6\\-6&16\end{pmatrix}=\begin{pmatrix}0{,}0833&-0{,}0556\\-0{,}0556&0{,}1481\end{pmatrix}$.</p>` },
      { titulo: "b) Estadístico T²", puntos: 2, solucion: String.raw`<p>$\bar x-\mu_0=\begin{pmatrix}2\\-2\end{pmatrix}$.</p><p>$(\bar x-\mu_0)'S^{-1}(\bar x-\mu_0)=0{,}0833(2)^2+2(-0{,}0556)(2)(-2)+0{,}1481(-2)^2=1{,}3704$.</p><p>$T^2=n\cdot1{,}3704=20\cdot1{,}3704=27{,}407$.</p>` },
      { titulo: "c) Valor crítico, decisión y conclusión", puntos: 2, solucion: String.raw`<p>Se rechaza si $T^2>\dfrac{(n-1)p}{n-p}F_{\alpha}(p,\,n-p)=\dfrac{19\cdot2}{18}\cdot F_{0{,}05}(2,18)=2{,}1111\cdot3{,}555=7{,}504$.</p><p>$27{,}407>7{,}504$ ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia de que el vector de medias difiere del de referencia. Para saber qué variable es responsable se miran los intervalos simultáneos.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "T²", r: "cat((20 * t(c(2, -2)) %*% solve(matrix(c(16, 6, 6, 9), 2, byrow = TRUE)) %*% c(2, -2))[1, 1])", esperado: 27.407, tol: 0.000500001 },
      { que: "crítico", r: "cat(19*2/18*qf(0.95, 2, 18))", esperado: 7.504, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 43–44 y 48" }
    ]
  },
  {
    id: "m08-d002",
    modulo: "m08-t2-hotelling",
    concepto: "m08-c04",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 46–49" }
    ],
    titulo: "Intervalos simultáneos y Bonferroni: dos características de un producto",
    enunciado: String.raw`<p>Control de calidad de un envase. Se miden peso (g) ($X_1$) y altura (mm) ($X_2$): $n=20$, $\bar x=\begin{pmatrix}52\\28\end{pmatrix}$, $S=\begin{pmatrix}16&6\\6&9\end{pmatrix}$; referencia $\mu_0=\begin{pmatrix}50\\30\end{pmatrix}$ y $\alpha=5\,\%$.</p><ol type="a"><li>Calcula los intervalos de confianza simultáneos $T^2$ para $\mu_1$ y $\mu_2$.</li><li>Calcula los intervalos de Bonferroni.</li><li>Compara ambos métodos e indica qué intervalos contienen el valor de referencia.</li></ol>`,
    partes: [
      { titulo: "a) Intervalos simultáneos T²", puntos: 2.5, solucion: String.raw`<p>Factor: $\sqrt{\dfrac{p(n-1)}{n-p}F_\alpha(p,n-p)}=\sqrt{7{,}504}=2{,}739$. Errores estándar: $\sqrt{s_{11}/n}=0{,}8944$ y $\sqrt{s_{22}/n}=0{,}6708$.</p><p>$\mu_1$: $52\pm2{,}739\cdot0{,}8944=[49{,}55;\ 54{,}45]$</p><p>$\mu_2$: $28\pm2{,}739\cdot0{,}6708=[26{,}162;\ 29{,}838]$</p>` },
      { titulo: "b) Intervalos de Bonferroni", puntos: 2, solucion: String.raw`<p>$t_{n-1;\,\alpha/(2p)}=t_{19;\,0{,}0125}=2{,}433$ (<code>qt(0.9875, 19)</code>).</p><p>$\mu_1$: $52\pm2{,}433\cdot0{,}8944=[49{,}823;\ 54{,}177]$</p><p>$\mu_2$: $28\pm2{,}433\cdot0{,}6708=[26{,}368;\ 29{,}632]$</p>` },
      { titulo: "c) Comparación y lectura", puntos: 1.5, solucion: String.raw`<p>Bonferroni es más angosto ($2{,}433<2{,}739$): conviene cuando solo interesan las $p$ medias por separado. Los de $T^2$ valen para todas las combinaciones lineales a la vez.</p><p>$\mu_{01}=50$: dentro del intervalo $T^2$ y dentro del de Bonferroni.</p><p>$\mu_{02}=30$: fuera del intervalo $T^2$ y fuera del de Bonferroni.</p><p>El test conjunto rechaza $H_0$ y la variable responsable es altura (mm): su intervalo simultáneo no contiene el valor de referencia.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "factor T²", r: "cat(sqrt(19*2/18*qf(0.95, 2, 18)))", esperado: 2.739, tol: 0.000500001 },
      { que: "t de Bonferroni", r: "cat(qt(0.9875, 19))", esperado: 2.433, tol: 0.000500001 },
      { que: "IC T² μ1 inferior", js: "52 - 2.739354866622067*Math.sqrt(16/20)", esperado: 49.55, tol: 0.000500001 },
      { que: "IC Bonferroni μ2 superior", js: "28 + 2.43344021137497*Math.sqrt(9/20)", esperado: 29.632, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 46–49" }
    ]
  },
  {
    id: "m08-d003",
    modulo: "m08-t2-hotelling",
    concepto: "m08-c02",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 43–44 y 48" }
    ],
    titulo: "T² de Hotelling: dos indicadores de un proceso",
    enunciado: String.raw`<p>Seguimiento de un proceso químico. Se miden pH ($X_1$) y viscosidad ($X_2$): $n=15$, $\bar x=\begin{pmatrix}10{,}4\\6{,}9\end{pmatrix}$, $S=\begin{pmatrix}1{,}2&0{,}4\\0{,}4&0{,}8\end{pmatrix}$. Los valores de referencia son $\mu_0=\begin{pmatrix}10\\7\end{pmatrix}$. Usa $\alpha=5\,\%$ y supón normalidad bivariada.</p><ol type="a"><li>Plantea las hipótesis y calcula $S^{-1}$.</li><li>Calcula $T^2$.</li><li>Calcula el valor crítico, decide y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis e inversa de S", puntos: 2, solucion: String.raw`<p>$H_0:\mu=\mu_0$ contra $H_1:\mu\neq\mu_0$ (contraste conjunto de las dos medias).</p><p>$|S|=1{,}2\cdot0{,}8-0{,}4^2=0{,}8$ ⇒ $S^{-1}=\dfrac{1}{0{,}8}\begin{pmatrix}0{,}8&-0{,}4\\-0{,}4&1{,}2\end{pmatrix}=\begin{pmatrix}1&-0{,}5\\-0{,}5&1{,}5\end{pmatrix}$.</p>` },
      { titulo: "b) Estadístico T²", puntos: 2, solucion: String.raw`<p>$\bar x-\mu_0=\begin{pmatrix}0{,}4\\-0{,}1\end{pmatrix}$.</p><p>$(\bar x-\mu_0)'S^{-1}(\bar x-\mu_0)=1(0{,}4)^2+2(-0{,}5)(0{,}4)(-0{,}1)+1{,}5(-0{,}1)^2=0{,}215$.</p><p>$T^2=n\cdot0{,}215=15\cdot0{,}215=3{,}225$.</p>` },
      { titulo: "c) Valor crítico, decisión y conclusión", puntos: 2, solucion: String.raw`<p>Se rechaza si $T^2>\dfrac{(n-1)p}{n-p}F_{\alpha}(p,\,n-p)=\dfrac{14\cdot2}{13}\cdot F_{0{,}05}(2,13)=2{,}1538\cdot3{,}806=8{,}197$.</p><p>$3{,}225<8{,}197$ ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>No hay evidencia de que el proceso se haya desviado de los valores de referencia. Equivale a que $\mu_0$ cae dentro de la región de confianza elíptica.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "T²", r: "cat((15 * t(c(0.4, -0.1)) %*% solve(matrix(c(1.2, 0.4, 0.4, 0.8), 2, byrow = TRUE)) %*% c(0.4, -0.1))[1, 1])", esperado: 3.225, tol: 0.000500001 },
      { que: "crítico", r: "cat(14*2/13*qf(0.95, 2, 13))", esperado: 8.197, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 43–44 y 48" }
    ]
  },
  {
    id: "m08-d004",
    modulo: "m08-t2-hotelling",
    concepto: "m08-c04",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 46–49" }
    ],
    titulo: "Intervalos simultáneos y Bonferroni: dos indicadores de un proceso",
    enunciado: String.raw`<p>Seguimiento de un proceso químico. Se miden pH ($X_1$) y viscosidad ($X_2$): $n=15$, $\bar x=\begin{pmatrix}10{,}4\\6{,}9\end{pmatrix}$, $S=\begin{pmatrix}1{,}2&0{,}4\\0{,}4&0{,}8\end{pmatrix}$; referencia $\mu_0=\begin{pmatrix}10\\7\end{pmatrix}$ y $\alpha=5\,\%$.</p><ol type="a"><li>Calcula los intervalos de confianza simultáneos $T^2$ para $\mu_1$ y $\mu_2$.</li><li>Calcula los intervalos de Bonferroni.</li><li>Compara ambos métodos e indica qué intervalos contienen el valor de referencia.</li></ol>`,
    partes: [
      { titulo: "a) Intervalos simultáneos T²", puntos: 2.5, solucion: String.raw`<p>Factor: $\sqrt{\dfrac{p(n-1)}{n-p}F_\alpha(p,n-p)}=\sqrt{8{,}197}=2{,}863$. Errores estándar: $\sqrt{s_{11}/n}=0{,}2828$ y $\sqrt{s_{22}/n}=0{,}2309$.</p><p>$\mu_1$: $10{,}4\pm2{,}863\cdot0{,}2828=[9{,}59;\ 11{,}21]$</p><p>$\mu_2$: $6{,}9\pm2{,}863\cdot0{,}2309=[6{,}239;\ 7{,}561]$</p>` },
      { titulo: "b) Intervalos de Bonferroni", puntos: 2, solucion: String.raw`<p>$t_{n-1;\,\alpha/(2p)}=t_{14;\,0{,}0125}=2{,}51$ (<code>qt(0.9875, 14)</code>).</p><p>$\mu_1$: $10{,}4\pm2{,}51\cdot0{,}2828=[9{,}69;\ 11{,}11]$</p><p>$\mu_2$: $6{,}9\pm2{,}51\cdot0{,}2309=[6{,}32;\ 7{,}48]$</p>` },
      { titulo: "c) Comparación y lectura", puntos: 1.5, solucion: String.raw`<p>Bonferroni es más angosto ($2{,}51<2{,}863$): conviene cuando solo interesan las $p$ medias por separado. Los de $T^2$ valen para todas las combinaciones lineales a la vez.</p><p>$\mu_{01}=10$: dentro del intervalo $T^2$ y dentro del de Bonferroni.</p><p>$\mu_{02}=7$: dentro del intervalo $T^2$ y dentro del de Bonferroni.</p><p>Coherente con no rechazar $H_0$ en el test conjunto.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "factor T²", r: "cat(sqrt(14*2/13*qf(0.95, 2, 13)))", esperado: 2.863, tol: 0.000500001 },
      { que: "t de Bonferroni", r: "cat(qt(0.9875, 14))", esperado: 2.51, tol: 0.000500001 },
      { que: "IC T² μ1 inferior", js: "10.4 - 2.8629708491944794*Math.sqrt(1.2/15)", esperado: 9.59, tol: 0.000500001 },
      { que: "IC Bonferroni μ2 superior", js: "6.9 + 2.50956941149333*Math.sqrt(0.8/15)", esperado: 7.48, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 46–49" }
    ]
  },
  {
    id: "m08-d005",
    modulo: "m08-t2-hotelling",
    concepto: "m08-c02",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 43–44 y 48" }
    ],
    titulo: "T² de Hotelling: puntajes de dos pruebas con α = 1 %",
    enunciado: String.raw`<p>Un colegio compara sus resultados con los promedios nacionales. Se miden Lenguaje ($X_1$) y Matemática ($X_2$): $n=30$, $\bar x=\begin{pmatrix}63\\58\end{pmatrix}$, $S=\begin{pmatrix}100&48\\48&144\end{pmatrix}$. Los valores de referencia son $\mu_0=\begin{pmatrix}57\\55{,}5\end{pmatrix}$. Usa $\alpha=1\,\%$ y supón normalidad bivariada.</p><ol type="a"><li>Plantea las hipótesis y calcula $S^{-1}$.</li><li>Calcula $T^2$.</li><li>Calcula el valor crítico, decide y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis e inversa de S", puntos: 2, solucion: String.raw`<p>$H_0:\mu=\mu_0$ contra $H_1:\mu\neq\mu_0$ (contraste conjunto de las dos medias).</p><p>$|S|=100\cdot144-48^2=12096$ ⇒ $S^{-1}=\dfrac{1}{12096}\begin{pmatrix}144&-48\\-48&100\end{pmatrix}=\begin{pmatrix}0{,}0119&-0{,}00397\\-0{,}00397&0{,}00827\end{pmatrix}$.</p>` },
      { titulo: "b) Estadístico T²", puntos: 2, solucion: String.raw`<p>$\bar x-\mu_0=\begin{pmatrix}6\\2{,}5\end{pmatrix}$.</p><p>$(\bar x-\mu_0)'S^{-1}(\bar x-\mu_0)=0{,}0119(6)^2+2(-0{,}00397)(6)(2{,}5)+0{,}00827(2{,}5)^2=0{,}3612$.</p><p>$T^2=n\cdot0{,}3612=30\cdot0{,}3612=10{,}836$.</p>` },
      { titulo: "c) Valor crítico, decisión y conclusión", puntos: 2, solucion: String.raw`<p>Se rechaza si $T^2>\dfrac{(n-1)p}{n-p}F_{\alpha}(p,\,n-p)=\dfrac{29\cdot2}{28}\cdot F_{0{,}01}(2,28)=2{,}0714\cdot5{,}453=11{,}295$.</p><p>$10{,}836<11{,}295$ ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>No hay evidencia de que el colegio difiera de los promedios nacionales. Equivale a que $\mu_0$ cae dentro de la región de confianza elíptica.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "T²", r: "cat((30 * t(c(6, 2.5)) %*% solve(matrix(c(100, 48, 48, 144), 2, byrow = TRUE)) %*% c(6, 2.5))[1, 1])", esperado: 10.836, tol: 0.000500001 },
      { que: "crítico", r: "cat(29*2/28*qf(0.99, 2, 28))", esperado: 11.295, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 43–44 y 48" }
    ]
  },
  {
    id: "m08-d006",
    modulo: "m08-t2-hotelling",
    concepto: "m08-c04",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 46–49" }
    ],
    titulo: "Intervalos simultáneos y Bonferroni: puntajes de dos pruebas con α = 1 %",
    enunciado: String.raw`<p>Un colegio compara sus resultados con los promedios nacionales. Se miden Lenguaje ($X_1$) y Matemática ($X_2$): $n=30$, $\bar x=\begin{pmatrix}63\\58\end{pmatrix}$, $S=\begin{pmatrix}100&48\\48&144\end{pmatrix}$; referencia $\mu_0=\begin{pmatrix}57\\55{,}5\end{pmatrix}$ y $\alpha=1\,\%$.</p><ol type="a"><li>Calcula los intervalos de confianza simultáneos $T^2$ para $\mu_1$ y $\mu_2$.</li><li>Calcula los intervalos de Bonferroni.</li><li>Compara ambos métodos e indica qué intervalos contienen el valor de referencia.</li></ol>`,
    partes: [
      { titulo: "a) Intervalos simultáneos T²", puntos: 2.5, solucion: String.raw`<p>Factor: $\sqrt{\dfrac{p(n-1)}{n-p}F_\alpha(p,n-p)}=\sqrt{11{,}295}=3{,}361$. Errores estándar: $\sqrt{s_{11}/n}=1{,}8257$ y $\sqrt{s_{22}/n}=2{,}1909$.</p><p>$\mu_1$: $63\pm3{,}361\cdot1{,}8257=[56{,}864;\ 69{,}136]$</p><p>$\mu_2$: $58\pm3{,}361\cdot2{,}1909=[50{,}637;\ 65{,}363]$</p>` },
      { titulo: "b) Intervalos de Bonferroni", puntos: 2, solucion: String.raw`<p>$t_{n-1;\,\alpha/(2p)}=t_{29;\,0{,}0025}=3{,}038$ (<code>qt(0.9975, 29)</code>).</p><p>$\mu_1$: $63\pm3{,}038\cdot1{,}8257=[57{,}453;\ 68{,}547]$</p><p>$\mu_2$: $58\pm3{,}038\cdot2{,}1909=[51{,}344;\ 64{,}656]$</p>` },
      { titulo: "c) Comparación y lectura", puntos: 1.5, solucion: String.raw`<p>Bonferroni es más angosto ($3{,}038<3{,}361$): conviene cuando solo interesan las $p$ medias por separado. Los de $T^2$ valen para todas las combinaciones lineales a la vez.</p><p>$\mu_{01}=57$: dentro del intervalo $T^2$ y fuera del de Bonferroni.</p><p>$\mu_{02}=55{,}5$: dentro del intervalo $T^2$ y dentro del de Bonferroni.</p><p>Coherente con no rechazar $H_0$ en el test conjunto.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "factor T²", r: "cat(sqrt(29*2/28*qf(0.99, 2, 28)))", esperado: 3.361, tol: 0.000500001 },
      { que: "t de Bonferroni", r: "cat(qt(0.9975, 29))", esperado: 3.038, tol: 0.000500001 },
      { que: "IC T² μ1 inferior", js: "63 - 3.3608584226088727*Math.sqrt(100/30)", esperado: 56.864, tol: 0.000500001 },
      { que: "IC Bonferroni μ2 superior", js: "58 + 3.03804674484918*Math.sqrt(144/30)", esperado: 64.656, tol: 0.000500001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 46–49" }
    ]
  }
]);
