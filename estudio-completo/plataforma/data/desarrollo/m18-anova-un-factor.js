/* ============================================================================
   Desarrollo · M18 ANOVA de un factor (P2)
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m18-d001", modulo: "m18-anova-un-factor", concepto: "m18-c03", dificultad: 2, origen: "variacion",
    base: [{ id: "C7.1", loc: "páginas 43–51" }],
    titulo: "ANOVA completo a mano: tres tratamientos",
    enunciado: String.raw`<p>Se prueban tres tratamientos X, Y y Z con 5 observaciones cada uno: X $=(12,14,13,15,11)$, Y $=(18,17,19,16,20)$, Z $=(13,15,14,12,16)$. Con $\alpha=5\,\%$:</p>
<ol type="a"><li>Plantea las hipótesis y calcula las medias.</li><li>Calcula $SC_{TRAT}$, $SC_E$ y arma la tabla ANOVA.</li><li>Decide y concluye. ¿Qué haría falta para saber cuáles tratamientos difieren?</li></ol>`,
    partes: [
      { titulo: "a) Hipótesis y medias", puntos: 1.5,
        solucion: String.raw`<p>$H_0:\mu_X=\mu_Y=\mu_Z$ contra $H_1:$ al menos dos medias distintas.</p><p>Medias: $\bar y_X=13$, $\bar y_Y=18$, $\bar y_Z=14$; media general $\bar y=15$.</p>` },
      { titulo: "b) Sumas de cuadrados y tabla ANOVA", puntos: 2.5,
        solucion: String.raw`<p>$SC_{TRAT}=5[(13-15)^2+(18-15)^2+(14-15)^2]=70$ (gl $=2$) ⇒ $CM_{TRAT}=35$.</p><p>$SC_E=\sum(y_{ij}-\bar y_i)^2=10+10+10=30$ (gl $=15-3=12$) ⇒ $CM_E=2{,}5$.</p><p>$SC_T=100$ (gl $=14$). $F_0=35/2{,}5=14$.</p>` },
      { titulo: "c) Decisión y pasos siguientes", puntos: 2,
        solucion: String.raw`<p>Crítico $F_{0{,}05;2,12}=3{,}89$; $14>3{,}89$ (p-valor $=0{,}0007$) ⇒ se <strong>rechaza</strong> $H_0$: el tratamiento influye en la respuesta media.</p><p>El F global no indica cuáles difieren: hay que aplicar una comparación múltiple (Tukey): resultan significativas Y–X y Y–Z; X–Z no. Antes de interpretar se verifican los supuestos con los residuos (normalidad, varianza constante, independencia).</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes (la fuente no trae puntajes).",
    verifica: [
      { que: "F0", js: "(70/2)/(30/12)", esperado: 14, tol: 1e-9 },
      { que: "p-valor", r: `cat(round(1 - pf(14, 2, 12), 4))`, esperado: 7e-04, tol: 0.00005 }
    ],
    fuente: [{ id: "C7.1", loc: "páginas 43–51" }, { id: "C7.2", loc: "slides 4–19" }]
  }
]);
