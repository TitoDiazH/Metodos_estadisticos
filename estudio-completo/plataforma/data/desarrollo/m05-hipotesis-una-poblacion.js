/* ============================================================================
   Desarrollo · M05 Pruebas de hipótesis: una población (P1)
   Se resuelve en papel; la app desbloquea las partes una a una.
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m05-d001", modulo: "m05-hipotesis-una-poblacion", concepto: "m05-c04", dificultad: 2, origen: "curso",
    titulo: "Proporción de parabrisas defectuosos (Ayudantía 2, P1)",
    enunciado: String.raw`<p>Una empresa afirma que a lo más el $15\,\%$ de sus parabrisas es defectuoso. En una muestra de $200$ parabrisas se encuentran $40$ defectuosos. Con $\alpha=5\,\%$:</p>
<ol type="a"><li>Plantea las hipótesis y verifica el requisito de la prueba.</li><li>Calcula el estadístico de prueba.</li><li>Decide y concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y requisito", puntos: 2,
        solucion: String.raw`<p>$H_0:p\le0{,}15$ contra $H_1:p>0{,}15$ (lo que se quiere demostrar es que hay más defectuosos que lo declarado).</p><p>Requisito: $np_0=200\cdot0{,}15=30\ge5$ y $n(1-p_0)=170\ge5$ ⇒ se puede usar la aproximación normal.</p>` },
      { titulo: "b) Estadístico de prueba", puntos: 2,
        solucion: String.raw`<p>$\hat p=40/200=0{,}20$.</p><p>$z=\dfrac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}=\dfrac{0{,}20-0{,}15}{\sqrt{0{,}15\cdot0{,}85/200}}=\dfrac{0{,}05}{0{,}02525}=1{,}98$.</p><p>(En R: <code>prop.test(40, 200, 0.15, "greater", correct = FALSE)</code> da $X^2=3{,}92=z^2$.)</p>` },
      { titulo: "c) Decisión y conclusión", puntos: 2,
        solucion: String.raw`<p>Cola derecha, $\alpha=5\,\%$: $z_{crit}=1{,}645$. Como $1{,}98>1{,}645$ (p-valor $\approx0{,}024<0{,}05$) se <strong>rechaza</strong> $H_0$.</p><p>Con un $5\,\%$ de significancia hay evidencia de que la proporción de parabrisas defectuosos supera el $15\,\%$: la muestra no respalda la afirmación de la empresa.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes (la fuente no trae puntajes).",
    verifica: [
      { que: "z", js: "(0.2-0.15)/Math.sqrt(0.15*0.85/200)", esperado: 1.9803, tol: 0.0001 },
      { que: "p-valor", r: `cat(round(1 - pnorm((0.2-0.15)/sqrt(0.15*0.85/200)), 4))`, esperado: 0.0238, tol: 0.00005 }
    ],
    fuente: [{ id: "AY2-E", loc: "P1" }, { id: "C2", loc: "slides 12–16" }]
  },
  {
    id: "m05-d002", modulo: "m05-hipotesis-una-poblacion", concepto: "m05-c05", dificultad: 3, origen: "variacion",
    base: [{ id: "C2", loc: "slides 17–20" }],
    titulo: "Variabilidad de un proceso (prueba χ²)",
    enunciado: String.raw`<p>Un proceso debe tener una varianza de a lo más $4$ unidades$^2$. En una muestra de $n=16$ se obtiene $s^2=9$. Usa $\alpha=5\,\%$ (población normal).</p>
<ol type="a"><li>Plantea las hipótesis.</li><li>Calcula el estadístico y el valor crítico.</li><li>Decide y concluye.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis", puntos: 1.5,
        solucion: String.raw`<p>$H_0:\sigma^2\le4$ contra $H_1:\sigma^2>4$ (cola derecha).</p>` },
      { titulo: "b) Estadístico y valor crítico", puntos: 2.5,
        solucion: String.raw`<p>$\chi^2=\dfrac{(n-1)s^2}{\sigma_0^2}=\dfrac{15\cdot9}{4}=33{,}75$ con $15$ gl.</p><p>Crítico: $\chi^2_{0{,}95;15}=24{,}996$ (<code>qchisq(0.95, 15)</code>).</p>` },
      { titulo: "c) Decisión y conclusión", puntos: 2,
        solucion: String.raw`<p>$33{,}75>24{,}996$ (p-valor $=1-\texttt{pchisq}(33{,}75;15)=0{,}0037<0{,}05$) ⇒ se <strong>rechaza</strong> $H_0$.</p><p>Hay evidencia, al $5\,\%$, de que la varianza del proceso supera $4$: el proceso es más variable de lo permitido.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes (la fuente no trae puntajes).",
    verifica: [
      { que: "χ²", js: "15*9/4", esperado: 33.75, tol: 1e-9 },
      { que: "crítico", r: `cat(round(qchisq(0.95, 15), 3))`, esperado: 24.996, tol: 0.0005 }
    ],
    fuente: [{ id: "C2", loc: "slides 17–20" }]
  }
]);
