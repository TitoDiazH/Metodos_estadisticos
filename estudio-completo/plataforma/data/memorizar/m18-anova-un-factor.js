/* Memorizar · M18 ANOVA de un factor (P2, por confirmar) */
PLATAFORMA.registrar("memorizar", [
  { id: "m18-mem-01", modulo: "m18-anova-un-factor", categoria: "formula", titulo: "Modelo e hipótesis",
    contenido: String.raw`$H_0:\mu_1=\dots=\mu_k$ · $y_{ij}=\mu+\tau_i+\varepsilon_{ij}$, $\varepsilon\sim N(0,\sigma^2)$, $\tau_i=\mu_i-\mu$ · efectos fijos / aleatorios / mixtos.`,
    fuente: [{ id: "C7.1", loc: "páginas 26–34" }] },
  { id: "m18-mem-02", modulo: "m18-anova-un-factor", categoria: "formula", titulo: "Tabla ANOVA",
    contenido: String.raw`$SC_T=SC_{TRAT}+SC_E$ · gl: $k-1,\ N-k,\ N-1$ · $CM=SC/gl$ · $F_0=CM_{TRAT}/CM_E\sim F(k-1,N-k)$ · rechazar si $F_0>F_\alpha$ o $p<\alpha$.`,
    fuente: [{ id: "C7.1", loc: "páginas 36–41" }] },
  { id: "m18-mem-03", modulo: "m18-anova-un-factor", categoria: "salida", titulo: "Ejemplos numéricos",
    contenido: "3 métodos: medias 81,5 / 46,5 / 71,5 · media general 66,5 · SCT 3007 · SCTrat 2600 · SCE 407 · F = 28,75. 4 métodos de ensamble: SC 69,5 / 29,5 / 99 · gl 3, 12, 15 · F = 9,42 · p = 0,00177.",
    fuente: [{ id: "C7.1", loc: "páginas 43–51" }, { id: "C7.2", loc: "slide 7" }] },
  { id: "m18-mem-04", modulo: "m18-anova-un-factor", categoria: "umbral", titulo: "Supuestos",
    contenido: "Independencia · homogeneidad de varianzas (Levene) · normalidad. Se verifican con residuos: Q-Q (normalidad), vs. predichos (varianza constante), vs. orden (independencia).",
    fuente: [{ id: "C7.2", loc: "slides 22–24" }] },
  { id: "m18-mem-05", modulo: "m18-anova-un-factor", categoria: "formula", titulo: "LSD de Fisher",
    contenido: String.raw`$\text{LSD}=t_{\alpha/2,N-k}\sqrt{2CM_E/n}$ · se declara diferente un par si $|\bar y_i-\bar y_j|>\text{LSD}$ · $k(k-1)/2$ pares · confianza individual · muy potente/sensible. Ensamble: LSD = 2,42.`,
    fuente: [{ id: "C7.2", loc: "slides 10, 13 y 16" }] },
  { id: "m18-mem-06", modulo: "m18-anova-un-factor", categoria: "decision", titulo: "Tukey vs LSD",
    contenido: "Tukey: rango estudentizado, confianza grupal (tasa de error por experimento), menos potente que LSD. Si la diferencia es clara, coinciden. <code>TukeyHSD(modelo)</code>.",
    fuente: [{ id: "C7.2", loc: "slides 10, 18 y 19" }] },
  { id: "m18-mem-07", modulo: "m18-anova-un-factor", categoria: "formula", titulo: "Tamaño de muestra",
    contenido: String.raw`$n=\dfrac{2t^2\sigma^2}{d_T^2}$ (σ=1,5; $d_T$=2 ⇒ 5,1 ⇒ $n=5$) · recomendación: 5–30 por tratamiento.`,
    fuente: [{ id: "C7.2", loc: "slides 20–21" }, { id: "C7.1", loc: "página 31" }] },
  { id: "m18-mem-08", modulo: "m18-anova-un-factor", categoria: "funcion-R", titulo: "<code>aov</code> · <code>summary</code> · <code>TukeyHSD</code>",
    contenido: "<code>modelo &lt;- aov(y ~ factor, data)</code> · <code>summary(modelo)</code> (Df, Sum Sq, Mean Sq, F, Pr(&gt;F)) · <code>TukeyHSD(modelo)</code> · <code>resid(modelo)</code>.",
    fuente: [{ id: "C7.2", loc: "slides 9 y 19" }] },
  { id: "m18-mem-09", modulo: "m18-anova-un-factor", categoria: "tabla", titulo: String.raw`Notación de puntos: $Y_{ij}$, $Y_{i\cdot}$, $Y_{\cdot\cdot}$ y sus medias`,
    contenido: String.raw`<div class="tz"><table class="matriz">
<tr><th></th><th>rep. 1</th><th>rep. 2</th><th>…</th><th>rep. $n$</th><th class="f">Total</th><th class="f">Media</th></tr>
<tr><th class="f">Trat. 1</th><td>$Y_{11}$</td><td>$Y_{12}$</td><td>…</td><td>$Y_{1n}$</td><td class="f">$Y_{1\cdot}$</td><td class="f">$\bar Y_{1\cdot}$</td></tr>
<tr><th class="f">Trat. 2</th><td>$Y_{21}$</td><td>$Y_{22}$</td><td>…</td><td>$Y_{2n}$</td><td class="f">$Y_{2\cdot}$</td><td class="f">$\bar Y_{2\cdot}$</td></tr>
<tr><th class="f">⋮</th><td>⋮</td><td>⋮</td><td></td><td>⋮</td><td class="f">⋮</td><td class="f">⋮</td></tr>
<tr><th class="f">Trat. $k$</th><td>$Y_{k1}$</td><td>$Y_{k2}$</td><td>…</td><td>$Y_{kn}$</td><td class="f">$Y_{k\cdot}$</td><td class="f">$\bar Y_{k\cdot}$</td></tr>
<tr><th class="g" colspan="5">Todo junto ($N$ datos) →</th><td class="g">$Y_{\cdot\cdot}$</td><td class="g">$\bar Y_{\cdot\cdot}$</td></tr>
</table></div>
<ul class="claves">
<li><span class="mk mk-d">$Y_{ij}$</span> un dato: tratamiento $i$ (fila), repetición $j$ (columna).</li>
<li><span class="mk mk-f">$Y_{i\cdot}$</span> el punto ocupa el lugar de $j$: <strong>sumé toda la fila $i$</strong> ⇒ total del tratamiento $i$: $Y_{i\cdot}=\sum_j Y_{ij}$.</li>
<li><span class="mk mk-g">$Y_{\cdot\cdot}$</span> dos puntos: sumé sobre $i$ <em>y</em> sobre $j$ ⇒ <strong>gran total</strong>: $Y_{\cdot\cdot}=\sum_i\sum_j Y_{ij}$.</li>
<li><span class="mk mk-f">$\bar Y_{i\cdot}$</span> <span class="mk mk-g">$\bar Y_{\cdot\cdot}$</span> la barra divide por cuántos datos se sumaron: $\bar Y_{i\cdot}=Y_{i\cdot}/n_i$ (media del tratamiento) y $\bar Y_{\cdot\cdot}=Y_{\cdot\cdot}/N$ (media global).</li>
</ul>
<p class="regla">🧠 <strong>Punto</strong> = «sumé sobre el índice que estaba ahí». <strong>Barra</strong> = «y después dividí por cuántos datos sumé». Lo mismo vale con más índices: $Y_{\cdot j}$ (total de la columna $j$), $Y_{ij\cdot}$ (total de la celda $ij$), $Y_{\cdots}$ (gran total).</p>`,
    fuente: [{ id: "C7.1", loc: "página 39" }] },
  { id: "m18-mem-10", modulo: "m18-anova-un-factor", categoria: "tabla", titulo: "Armar la tabla ANOVA de un factor (DCA), columna por columna",
    contenido: String.raw`<div class="tz"><table class="armar">
<tr><th><span class="paso">1</span> FV</th><th><span class="paso">2</span> gl</th><th><span class="paso">3</span> SC</th><th><span class="paso">4</span> CM = SC ÷ gl</th><th><span class="paso">5</span> $F_0$</th></tr>
<tr class="r-f"><td>Tratamientos<br><small>(entre grupos)</small></td><td>$k-1$</td><td>$\sum_i n_i(\bar Y_{i\cdot}-\bar Y_{\cdot\cdot})^2$</td><td>$CM_{TRAT}=\dfrac{SC_{TRAT}}{k-1}$</td><td>$\dfrac{CM_{TRAT}}{CM_E}$</td></tr>
<tr class="r-e"><td>Error<br><small>(dentro de grupos)</small></td><td>$N-k$</td><td>$\sum_i\sum_j(Y_{ij}-\bar Y_{i\cdot})^2$</td><td>$CM_E=\dfrac{SC_E}{N-k}$</td><td class="vacio">—</td></tr>
<tr class="r-t"><td>Total</td><td>$N-1$</td><td>$\sum_i\sum_j(Y_{ij}-\bar Y_{\cdot\cdot})^2$</td><td class="vacio">—</td><td class="vacio">—</td></tr>
</table></div>
<ol class="pasos">
<li><b>FV</b>: una fila por el factor, una por el Error y una por el Total.</li>
<li><b>gl</b>: factor = niveles − 1 = $k-1$; Total = $N-1$; Error = lo que sobra: $(N-1)-(k-1)=N-k$.</li>
<li><b>SC</b>: calcula Total y Tratamientos; el Error sale <em>por diferencia</em>: $SC_E=SC_T-SC_{TRAT}$.</li>
<li><b>CM</b>: cada SC dividida por sus gl (el Total no lleva CM).</li>
<li><b>F</b>: CM de la fila ÷ $CM_E$. Se rechaza $H_0$ si $F_0>F_{\alpha;\,k-1,\,N-k}$ (o si $p<\alpha$).</li>
</ol>
<p class="regla">🧠 Las columnas <strong>SC y gl suman</strong> hacia abajo (la fila Total = suma de las de arriba). <strong>CM y F no suman.</strong> Tratamientos compara cada media con la global ($\bar Y_{i\cdot}$ vs $\bar Y_{\cdot\cdot}$); el Error compara cada dato con la media de <em>su</em> grupo ($Y_{ij}$ vs $\bar Y_{i\cdot}$).</p>`,
    fuente: [{ id: "C7.1", loc: "páginas 39–41" }] }
]);
