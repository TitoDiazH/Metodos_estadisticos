/* ============================================================================
   Desarrollo · M07 Errores tipo I/II y potencia (P1)
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m07-d001", modulo: "m07-errores-potencia", concepto: "m07-c03", dificultad: 3, origen: "curso",
    titulo: "Límites de rechazo y probabilidad de no rechazar (Ayudantía 2, P2 b–c)",
    enunciado: String.raw`<p>El peso de un envase tiene desviación estándar conocida $\sigma=0{,}02$ kg. Se toma una muestra de $n=20$ envases para probar $H_0:\mu=1$ contra $H_1:\mu\neq1$ con $\alpha=5\,\%$.</p>
<ol type="a"><li>¿Para qué valores de $\bar X$ se rechaza $H_0$?</li><li>Si la media verdadera fuera $\mu=1{,}005$ kg, ¿cuál es la probabilidad de no rechazar $H_0$ (error tipo II)? ¿Y la potencia?</li><li>¿Qué pasaría con $\beta$ si $n$ aumentara a $80$? Justifica.</li></ol>`,
    partes: [
      { titulo: "a) Región de rechazo para X̄", puntos: 2,
        solucion: String.raw`<p>Error estándar: $\sigma/\sqrt n=0{,}02/\sqrt{20}=0{,}004472$. Límites con $\mu_0=1$: $1\pm1{,}96\cdot0{,}004472=(0{,}9912;\ 1{,}0088)$.</p><p>Se rechaza $H_0$ si $\bar X<0{,}9912$ o $\bar X>1{,}0088$.</p>` },
      { titulo: "b) β y potencia con μ = 1,005", puntos: 2.5,
        solucion: String.raw`<p>$\beta=P(0{,}9912\le\bar X\le1{,}0088\mid\mu=1{,}005)=\Phi\!\left(\tfrac{1{,}0088-1{,}005}{0{,}004472}\right)-\Phi\!\left(\tfrac{0{,}9912-1{,}005}{0{,}004472}\right)\approx0{,}80$ (la pauta con límites redondeados da $0{,}8012$; sin redondear, $0{,}799$).</p><p>Potencia $=1-\beta\approx0{,}20$: la prueba detecta esa diferencia solo en 1 de cada 5 casos.</p>` },
      { titulo: "c) Efecto de n = 80", puntos: 1.5,
        solucion: String.raw`<p>El error estándar baja a $0{,}02/\sqrt{80}=0{,}002236$ y la región de no rechazo se estrecha: $\beta=0{,}391$ (potencia $0{,}609$). A mayor $n$, menor $\beta$; $\alpha$ no cambia.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes (la fuente no trae puntajes).",
    verifica: [
      { que: "límite superior", r: `cat(round(1 + qnorm(0.975) * 0.02 / sqrt(20), 4))`, esperado: 1.0088, tol: 0.00005 },
      { que: "β n=20", r: `s <- 0.02/sqrt(20); cat(round(pnorm(1+qnorm(.975)*s, 1.005, s) - pnorm(1+qnorm(.025)*s, 1.005, s), 3))`, esperado: 0.799, tol: 0.0005 },
      { que: "β n=80", r: `s <- 0.02/sqrt(80); cat(round(pnorm(1+qnorm(.975)*s, 1.005, s) - pnorm(1+qnorm(.025)*s, 1.005, s), 3))`, esperado: 0.391, tol: 0.0005 }
    ],
    fuente: [{ id: "AY2-E", loc: "P2(b)(c)" }, { id: "AY2-P", loc: "P2" }]
  }
]);
