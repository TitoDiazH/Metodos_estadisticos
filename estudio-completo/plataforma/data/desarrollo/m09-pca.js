/* ============================================================================
   Desarrollo · M09 PCA (P1)
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m09-d001", modulo: "m09-pca", concepto: "m09-c04", dificultad: 2, origen: "variacion",
    base: [{ id: "AY2-E", loc: "P5(a)" }],
    titulo: "¿Cuántos componentes conservar? (USArrests)",
    enunciado: String.raw`<p>Se aplicó PCA con variables estandarizadas a las 4 variables de USArrests (Murder, Assault, UrbanPop, Rape). La salida es:</p>
<pre>Importance of components:
                          PC1    PC2     PC3     PC4
Standard deviation     1.5749 0.9949 0.59713 0.41645
Proportion of Variance 0.6201 0.2474 0.08914 0.04336
Cumulative Proportion  0.6201 0.8675 0.95664 1.00000</pre>
<ol type="a"><li>Calcula los autovalores y decide cuántos componentes conservar con el criterio de Kaiser.</li><li>Decide con la regla del 80 % acumulado.</li><li>Si las dos reglas difieren, ¿con cuántos te quedarías? Justifica.</li></ol>`,
    partes: [
      { titulo: "a) Autovalores y criterio de Kaiser", puntos: 2,
        solucion: String.raw`<p>$\lambda_k=\text{sd}_k^2$: $2{,}480;\ 0{,}990;\ 0{,}357;\ 0{,}173$ (suman $4=p$, por estar estandarizado).</p><p>Kaiser (λ &gt; 1): solo PC1 ⇒ <strong>1 componente</strong> (PC2, con $0{,}990$, queda justo bajo 1).</p>` },
      { titulo: "b) Regla del 80 %", puntos: 2,
        solucion: String.raw`<p>Acumulado: $62{,}0\,\%$ (PC1), $86{,}8\,\%$ (PC2), $95{,}7\,\%$ (PC3). El $80\,\%$ se alcanza con PC2 ⇒ <strong>2 componentes</strong>.</p>` },
      { titulo: "c) Decisión justificada", puntos: 2,
        solucion: String.raw`<p>Las reglas difieren (1 vs. 2), pero el λ₂ = 0,990 es prácticamente 1, y con PC1 solo se explica $62\,\%$. Una respuesta razonable es conservar <strong>2 componentes</strong> ($86{,}8\,\%$ de la varianza) —que además permiten un gráfico en 2D (biplot)— aclarando que Kaiser sugería 1. Lo importante es justificar la elección con los criterios.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes (la fuente no trae puntajes).",
    verifica: [
      { que: "λ1", r: `cat(round(prcomp(USArrests, scale. = TRUE)$sdev[1]^2, 3))`, esperado: 2.48, tol: 0.0005 },
      { que: "acumulado 2 PC", r: `cat(round(summary(prcomp(USArrests, scale. = TRUE))$importance[3, 2], 4))`, esperado: 0.8675, tol: 0.00005 }
    ],
    fuente: [{ id: "AY2-E", loc: "P5(a)" }, { id: "C3", loc: "slide 15" }]
  }
]);
