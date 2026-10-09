/* ============================================================================
   Desarrollo · M06 Pruebas de hipótesis: dos poblaciones (P1)
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m06-d001", modulo: "m06-hipotesis-dos-poblaciones", concepto: "m06-c02", dificultad: 2, origen: "curso",
    titulo: "Variabilidad de dos máquinas (Ayudantía 2, P4)",
    enunciado: String.raw`<p>Dos máquinas llenan envases. Se tomaron $10$ envases de cada una y se obtuvieron varianzas muestrales $s_A^2=2{,}233$ y $s_B^2=1{,}067$. Con $\alpha=5\,\%$, ¿hay evidencia de que la máquina A es más variable que la B? (supón poblaciones normales)</p>
<ol type="a"><li>Plantea las hipótesis.</li><li>Calcula el estadístico y compáralo con el valor crítico.</li><li>Concluye en el contexto del problema.</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis", puntos: 1.5,
        solucion: String.raw`<p>$H_0:\sigma_A^2\le\sigma_B^2$ contra $H_1:\sigma_A^2>\sigma_B^2$ (unilateral derecha: A en el numerador).</p>` },
      { titulo: "b) Estadístico y valor crítico", puntos: 2.5,
        solucion: String.raw`<p>$F=\dfrac{s_A^2}{s_B^2}=\dfrac{2{,}233}{1{,}067}=2{,}094$ con gl $(n_A-1,\,n_B-1)=(9,9)$.</p><p>Crítico: $F_{0{,}95;9,9}=3{,}179$ (<code>qf(0.95, 9, 9)</code>). p-valor $=0{,}143$.</p>` },
      { titulo: "c) Decisión y conclusión", puntos: 2,
        solucion: String.raw`<p>$2{,}094<3{,}179$ (p-valor $0{,}143>0{,}05$) ⇒ <strong>no se rechaza</strong> $H_0$.</p><p>Con $5\,\%$ de significancia no hay evidencia de que la máquina A tenga mayor variabilidad que la B.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes (la fuente no trae puntajes).",
    verifica: [
      { que: "F", js: "2.233/1.067", esperado: 2.0928, tol: 0.001 },
      { que: "crítico", r: `cat(round(qf(0.95, 9, 9), 3))`, esperado: 3.179, tol: 0.0005 }
    ],
    fuente: [{ id: "AY2-E", loc: "P4" }, { id: "C2", loc: "slides 22–25" }]
  }
]);
