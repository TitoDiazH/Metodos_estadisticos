/* Memorizar · M25 Factorial general (P3) */
PLATAFORMA.registrar("memorizar", [
  { id: "m25-mem-01", modulo: "m25-factorial-general", categoria: "formula", titulo: "Efecto principal e interacción (2 niveles)",
    contenido: String.raw`Efecto $A=\bar Y_{A+}-\bar Y_{A-}$ · $AB=\frac{Y_{--}+Y_{++}}{2}-\frac{Y_{+-}+Y_{-+}}{2}$ · ejemplo levadura/temperatura: A $=-2{,}5$, B $=19{,}5$, AB $=-15{,}5$.`,
    fuente: [{ id: "C7.3", loc: "slides 20–22" }] },
  { id: "m25-mem-02", modulo: "m25-factorial-general", categoria: "decision", titulo: "Gráfica de interacción",
    contenido: "Líneas paralelas ⇒ no hay interacción · se cruzan o tienen pendientes muy distintas ⇒ hay interacción · la significancia la decide el ANOVA.",
    fuente: [{ id: "C7.3", loc: "slides 22–23" }] },
  { id: "m25-mem-03", modulo: "m25-factorial-general", categoria: "formula", titulo: "gl del factorial a × b (n réplicas)",
    contenido: String.raw`A: $a-1$ · B: $b-1$ · AB: $(a-1)(b-1)$ · error: $ab(n-1)$ · total: $abn-1$ · se necesitan $n\ge2$.`,
    fuente: [{ id: "C7.3", loc: "slide 26" }] },
  { id: "m25-mem-04", modulo: "m25-factorial-general", categoria: "formula", titulo: "SC con totales (a × b)",
    contenido: String.raw`$SC_A=\sum Y_{i\cdot\cdot}^2/(bn)-Y^2_{\cdots}/N$ · $SC_B=\sum Y_{\cdot j\cdot}^2/(an)-Y^2_{\cdots}/N$ · $SC_{AB}=\sum\sum Y_{ij\cdot}^2/n-Y^2_{\cdots}/N-SC_A-SC_B$ · $SC_E$ por diferencia.`,
    fuente: [{ id: "C7.3", loc: "slide 26" }] },
  { id: "m25-mem-05", modulo: "m25-factorial-general", categoria: "umbral", titulo: "LSD en factoriales",
    contenido: String.raw`Sin interacción (medias marginales): $\sqrt{2\,CME/r}$ con $r=bn$ (A) o $an$ (B). Con interacción (dentro de cada nivel): $r=n$. Siempre $t_{\alpha/2,\,GL_E}$.`,
    fuente: [{ id: "C7.3", loc: "slides 30–31" }] },
  { id: "m25-mem-06", modulo: "m25-factorial-general", categoria: "salida", titulo: "Ejemplos",
    contenido: "Acabado 4 × 3 (n = 3): F_B = 55,02; F_A = 24,66; F_AB = 3,23 (p = 0,018); CME = 28,72 (24 gl) ⇒ óptimo: profundidad y velocidad bajas. Sedimentación 3 × 2 × 2 (n = 6): significativos B, C, AB, BC ⇒ mejor (A = 0, B = −1, C = 1).",
    fuente: [{ id: "C7.3", loc: "slides 28–36" }] },
  { id: "m25-mem-07", modulo: "m25-factorial-general", categoria: "funcion-R", titulo: "<code>aov(Y ~ A * B * C)</code>",
    contenido: "<code>*</code> = efectos principales + todas las interacciones; <code>+</code> = solo principales. <code>interaction.plot(A, B, Y)</code> para la gráfica de interacción.",
    fuente: [{ id: "C7.3", loc: "slide 35" }, { id: "C7.4", loc: "slide 10" }] },
  { id: "m25-mem-08", modulo: "m25-factorial-general", categoria: "tabla", titulo: String.raw`Factorial $a\times b$ con $n$ réplicas: celdas, totales y tabla`,
    contenido: String.raw`<div class="tz"><table class="matriz">
<tr><th>A \ B</th><th class="c">$B_1$</th><th class="c">…</th><th class="c">$B_b$</th><th class="f">Total de A</th></tr>
<tr><th class="f">$A_1$</th><td class="celda">$Y_{111},\dots,Y_{11n}$<br>→ $Y_{11\cdot}$</td><td>…</td><td class="celda">$Y_{1b1},\dots,Y_{1bn}$<br>→ $Y_{1b\cdot}$</td><td class="f">$Y_{1\cdot\cdot}$</td></tr>
<tr><th class="f">⋮</th><td>⋮</td><td></td><td>⋮</td><td class="f">⋮</td></tr>
<tr><th class="f">$A_a$</th><td class="celda">$Y_{a11},\dots,Y_{a1n}$<br>→ $Y_{a1\cdot}$</td><td>…</td><td class="celda">$Y_{ab1},\dots,Y_{abn}$<br>→ $Y_{ab\cdot}$</td><td class="f">$Y_{a\cdot\cdot}$</td></tr>
<tr><th class="c">Total de B</th><td class="c">$Y_{\cdot1\cdot}$</td><td class="c">…</td><td class="c">$Y_{\cdot b\cdot}$</td><td class="g">$Y_{\cdots}$</td></tr>
</table></div>
<p>$Y_{ijk}$: $i$ = nivel de A, $j$ = nivel de B, $k$ = réplica. Cada <span class="mk mk-d">celda</span> tiene $n$ datos; $N=abn$.</p>
<div class="tz"><table class="armar">
<tr><th>Total</th><th>Qué suma</th><th>N.º de datos ⇒ divisor</th></tr>
<tr class="r-f"><td>$Y_{i\cdot\cdot}$</td><td>fila $i$ completa (nivel $i$ de A)</td><td>$b\,n$</td></tr>
<tr class="r-c"><td>$Y_{\cdot j\cdot}$</td><td>columna $j$ completa (nivel $j$ de B)</td><td>$a\,n$</td></tr>
<tr class="r-d"><td>$Y_{ij\cdot}$</td><td>las $n$ réplicas de la celda $ij$</td><td>$n$</td></tr>
<tr class="r-t"><td>$Y_{\cdots}$</td><td>todo</td><td>$N=abn$</td></tr>
</table></div>
<div class="tz"><table class="armar">
<tr><th>FV</th><th>gl</th><th>SC</th><th>$F_0$</th></tr>
<tr class="r-f"><td>A</td><td>$a-1$</td><td>$\sum Y_{i\cdot\cdot}^2/(bn)-Y_{\cdots}^2/N$</td><td>$CM_A/CME$</td></tr>
<tr class="r-c"><td>B</td><td>$b-1$</td><td>$\sum Y_{\cdot j\cdot}^2/(an)-Y_{\cdots}^2/N$</td><td>$CM_B/CME$</td></tr>
<tr class="r-d"><td>AB</td><td>$(a-1)(b-1)$</td><td>$\sum\sum Y_{ij\cdot}^2/n-Y_{\cdots}^2/N-SC_A-SC_B$</td><td>$CM_{AB}/CME$</td></tr>
<tr class="r-e"><td>Error</td><td>$ab(n-1)$</td><td>$SC_T-SC_A-SC_B-SC_{AB}$</td><td class="vacio">—</td></tr>
<tr class="r-t"><td>Total</td><td>$abn-1$</td><td>$\sum Y_{ijk}^2-Y_{\cdots}^2/N$</td><td class="vacio">—</td></tr>
</table></div>
<p class="regla">🧠 Misma receta del DBCA: (total)² ÷ n.º de datos que suma, menos $Y_{\cdots}^2/N$. La interacción es «lo que las celdas explican de más» sobre A y B por separado, y sus gl son el <strong>producto</strong> de los gl de A y B. Con $n=1$ el error tendría 0 gl: hacen falta al menos 2 réplicas.</p>`,
    fuente: [{ id: "C7.3", loc: "slides 25–26" }] }
]);
