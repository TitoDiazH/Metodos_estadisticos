/* ============================================================================
   Desarrollo · M01 Covarianza, correlación y regresión simple (P1)
   registrar("desarrollo", …) = pregunta con tipo "desarrollo".
   Se resuelve en papel; "partes" = pasos que se desbloquean uno a uno, cada uno
   con su solución y su puntaje (la suma es el total de la pregunta).
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m01-d001", modulo: "m01-covarianza-correlacion", concepto: "m01-c04", dificultad: 2, origen: "curso",
    titulo: "¿Existe correlación entre costo y distancia? (n = 100 y n = 1000)",
    enunciado: String.raw`<p>Considere tres variables: $X_1$ = tiempo de viaje (minutos), $X_2$ = costo de transporte (miles de pesos) y $X_3$ = distancia recorrida (km), con matriz de varianza-covarianza</p>
$$\Sigma=\begin{pmatrix}16&6&8\\6&9&1\\8&1&25\end{pmatrix}$$
<p>Suponga que la matriz corresponde a 100 observaciones. ¿Se puede asegurar que existe correlación lineal entre costo de transporte y distancia recorrida? ¿Qué pasaría si hubiese 1000 observaciones?</p>
<p><em>Hint:</em> utilice $t=r\sqrt{\dfrac{n-2}{1-r^{2}}}$ con $r=\dfrac{\operatorname{Cov}(X,Y)}{\sqrt{\operatorname{Var}(X)\operatorname{Var}(Y)}}$. Valores críticos (α = 0,05 bilateral): $t_{0{,}025;\,98}=1{,}984$ y $t_{0{,}025;\,998}=1{,}962$.</p>`,
    partes: [
      {
        titulo: "Hipótesis", puntos: 1,
        solucion: String.raw`<p>$H_0:\rho_{23}=0$ (no hay correlación lineal entre costo y distancia) contra $H_1:\rho_{23}\neq0$. Se plantean sobre el parámetro poblacional $\rho$, no sobre $r$.</p>`
      },
      {
        titulo: "Correlación muestral entre costo y distancia", puntos: 1,
        solucion: String.raw`<p>$r_{23}=\dfrac{\operatorname{Cov}(X_2,X_3)}{\sqrt{\operatorname{Var}(X_2)\operatorname{Var}(X_3)}}=\dfrac{1}{\sqrt{9\cdot25}}=\dfrac{1}{15}=0{,}067$.</p>`
      },
      {
        titulo: "Estadístico con n = 100", puntos: 1,
        solucion: String.raw`<p>$t=\dfrac{1}{15}\sqrt{\dfrac{98}{1-1/225}}=0{,}66$, con $n-2=98$ grados de libertad.</p>`
      },
      {
        titulo: "Decisión y conclusión con n = 100", puntos: 1,
        solucion: String.raw`<p>Como $|0{,}66|<1{,}984$, <strong>no se rechaza</strong> $H_0$: con un nivel de significancia del 5 % no existe evidencia estadística suficiente para afirmar que hay correlación lineal entre costo de transporte y distancia recorrida.</p>
<p class="ayuda">Cuenta como correcta si comparaste con el valor crítico y concluiste en el contexto. Ojo con escribir «no existe correlación»: no rechazar $H_0$ no prueba que sea verdadera.</p>`
      },
      {
        titulo: "¿Y con n = 1000?", puntos: 1,
        solucion: String.raw`<p>$t=\dfrac{1}{15}\sqrt{\dfrac{998}{1-1/225}}=2{,}11$. Como $2{,}11>1{,}962$, <strong>se rechaza</strong> $H_0$: existe evidencia de correlación lineal.</p>`
      },
      {
        titulo: "Interpretación del cambio", puntos: 1,
        solucion: String.raw`<p>El mismo $r$ (muy bajo) pasa a ser significativo al aumentar la muestra. <strong>Significativa no quiere decir fuerte</strong>: la correlación sigue siendo $0{,}067$.</p>`
      }
    ],
    comentario: String.raw`El comentario de la pauta en R dice «no existe correlación» para $n=100$; la redacción cuidadosa es «no hay evidencia suficiente» (pauta Prueba 1, pregunta 1, afirmación 4). Además, la línea 121 de esa pauta tiene un paréntesis mal puesto; el resultado casi no cambia (ver ⚠️ Diferencias entre fuentes).`,
    escala: "La ayudantía no trae puntajes: los 6 puntos repartidos por parte son una regla de la plataforma.",
    verifica: [
      { que: "t n=100", js: "(1/15)*Math.sqrt(98/(1-1/225))", esperado: 0.66, tol: 0.005 },
      { que: "t n=1000", js: "(1/15)*Math.sqrt(998/(1-1/225))", esperado: 2.11, tol: 0.005 }
    ],
    fuente: [{ id: "AY1-E", loc: "Parte II, P1–P2" }, { id: "AY1-R", loc: "líneas 118–126" }]
  }
]);
