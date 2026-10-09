/* ============================================================================
   M07 · Errores tipo I/II y potencia (P1)
   Fuentes abiertas para redactar: C2 slides 35–38 (el gráfico y el ejemplo de s36 y
   s38 son imagen) · AY2-E P2(b)(c), P3(b)(c) y AY2-P (pauta) · PR-P1-Q1 afirmaciones 4 y 6.
   Los números se recalculan en tools/verificar_numeros.js.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m07-errores-potencia",
  orden: 7,
  titulo: "Errores tipo I/II y potencia",
  descripcion: "Qué errores se pueden cometer al decidir, cómo calcular la probabilidad de no detectar una diferencia real (β) y de qué depende.",
  pruebas: ["P1"],
  prioridad: "alta",
  fuentes: [{ id: "C2", loc: "slides 35–38" }, { id: "AY2-E", loc: "P2 (b)(c), P3 (b)(c)" }, { id: "PR-P1-Q1", loc: "afirmaciones 4 y 6" }],

  conceptos: [
    {
      id: "m07-c01",
      titulo: "Error tipo I, error tipo II y potencia",
      cubre: ["M07.1"],
      simple: String.raw`<p>Al decidir con datos se puede fallar de dos maneras: dar una <strong>falsa alarma</strong> (rechazar $H_0$ siendo verdadera) o <strong>no detectar</strong> un efecto real (no rechazar $H_0$ siendo falsa). La potencia es la capacidad de detectar un efecto que sí existe.</p>`,
      formal: String.raw`<table class="tabla"><thead><tr><th></th><th>$H_0$ verdadera</th><th>$H_0$ falsa</th></tr></thead><tbody>
<tr><td><strong>Se rechaza $H_0$</strong></td><td>Error tipo I ($\alpha$)</td><td>Decisión correcta (potencia $1-\beta$)</td></tr>
<tr><td><strong>No se rechaza $H_0$</strong></td><td>Decisión correcta</td><td>Error tipo II ($\beta$)</td></tr></tbody></table>
<ul>
  <li>$P(\text{error tipo I})=\alpha$; $P(\text{error tipo II})=\beta$; potencia $=1-\beta$.</li>
  <li><strong>Relación:</strong> si se disminuye $\alpha$, aumenta $\beta$ (C2 s35). El equilibrio depende del contexto.</li>
</ul>`,
      ejemplo: String.raw`<p>Pauta de la Prueba 1, afirmación 6: con $\alpha=0{,}01$, «a mayor tamaño de muestra, menor probabilidad de error tipo I» es <strong>falso</strong>: la probabilidad de error tipo I es justamente $\alpha=0{,}01$ aunque $n$ crezca. Lo que sí baja con $n$ es $\beta$.</p>
<p>Afirmación 4: «si no rechazo $H_0$ puedo estar seguro de que es verdadera» es <strong>falso</strong>: solo sé que la evidencia no alcanza, y puedo estar cometiendo un error tipo II.</p>`,
      errores: ["Decir que β = 1 − α: son probabilidades de situaciones distintas (la primera supone H₀ falsa).", "Creer que más muestra reduce α."],
      memoriza: String.raw`<p>Tipo I: rechazar $H_0$ verdadera ($\alpha$). Tipo II: no rechazar $H_0$ falsa ($\beta$). Potencia $=1-\beta$. $\alpha\downarrow\Rightarrow\beta\uparrow$.</p>`,
      comprueba: {
        enunciado: "Un laboratorio no rechaza H0 aunque la media real es distinta de la hipotetizada. ¿Qué error cometió?",
        opciones: ["Error tipo II", "Error tipo I", "Ninguno", "Un error de muestreo que no es de decisión"],
        correcta: 0,
        explicacion: "No rechazar una H0 falsa es el error tipo II (probabilidad β)."
      },
      fuente: [{ id: "C2", loc: "slides 35–36" }, { id: "PR-P1-Q1", loc: "afirmaciones 4 y 6" }]
    },

    {
      id: "m07-c02",
      titulo: "De qué depende β",
      figura: { tipo: "potencia", donde: "ejemplo", mu0: 1, mu1: 1.005, sigma: 0.02, n: 20, alfa: 0.05,
        rango: [0.975, 1.03], rmu1: [0.99, 1.02, 0.001], rsigma: [0.01, 0.04, 0.005],
        pie: "El caso de la Ayudantía 2: parte con β ≈ 0,80. Prueba μ = 1,010 o n = 80 y verás que β baja a 0,39 en ambos casos." },
      cubre: ["M07.2"],
      simple: String.raw`<p>Para calcular $\beta$ hay que fijar un <strong>valor verdadero concreto</strong> del parámetro bajo $H_1$ (p. ej. «la media real es $1{,}005$»): $\beta$ no existe sin un valor verdadero. Cuanto más distinto del valor de $H_0$, más fácil es detectarlo y menor es $\beta$.</p>`,
      formal: String.raw`<p>$\beta$ depende de cuatro cosas (C2 s37):</p>
<ul>
  <li>el <strong>tamaño de muestra</strong> $n$ (a mayor $n$, menor $\beta$, mayor potencia);</li>
  <li>el nivel de significancia $\alpha$ (a menor $\alpha$, mayor $\beta$);</li>
  <li>la <strong>diferencia real</strong> entre el valor verdadero y el de $H_0$ (más lejos, menor $\beta$);</li>
  <li>la <strong>variabilidad</strong> $\sigma$ (más variabilidad, mayor $\beta$).</li>
</ul>`,
      ejemplo: String.raw`<p>Con el caso de la Ayudantía 2 (P2: $\sigma=0{,}02$, $H_0:\mu=1$, $\alpha=5\,\%$), la probabilidad de <em>no</em> rechazar $H_0$ cuando $\mu=1{,}005$ es $\beta\approx0{,}80$ con $n=20$. Si la media real fuera $1{,}01$, $\beta$ baja a $0{,}39$. Si se mantiene $\mu=1{,}005$ pero $n$ sube a $80$, $\beta$ también baja a $0{,}39$ (el efecto estandarizado $|\mu_1-\mu_0|\sqrt n/\sigma$ vale lo mismo que antes con $\mu=1{,}01$ y $n=20$).</p>`,
      errores: ["Calcular β sin un valor verdadero específico del parámetro.", "Confundir β (no detectar) con la potencia (1 − β)."],
      memoriza: String.raw`<p>$\beta\downarrow$ cuando: $n\uparrow$, $\alpha\uparrow$, diferencia real $\uparrow$, $\sigma\downarrow$.</p>`,
      comprueba: {
        enunciado: "Si se aumenta el tamaño de muestra y todo lo demás se mantiene, ¿qué ocurre con la potencia?",
        opciones: ["Aumenta", "Disminuye", "No cambia", "Depende de α solamente"],
        correcta: 0,
        explicacion: "A mayor n, menor β y por lo tanto mayor potencia (1 − β)."
      },
      verifica: [
        { que: "β con μ=1,01", r: `s <- 0.02/sqrt(20); li <- 1 + qnorm(.025)*s; ls <- 1 + qnorm(.975)*s; cat(round(pnorm(ls, 1.01, s) - pnorm(li, 1.01, s), 4))`, esperado: 0.3912, tol: 0.00005 },
        { que: "β con μ=1,005 y n=80", r: `s <- 0.02/sqrt(80); li <- 1 + qnorm(.025)*s; ls <- 1 + qnorm(.975)*s; cat(round(pnorm(ls, 1.005, s) - pnorm(li, 1.005, s), 4))`, esperado: 0.3912, tol: 0.00005 }
      ],
      fuente: [{ id: "C2", loc: "slides 36–37" }, { id: "AY2-E", loc: "P2(c)" }]
    },

    {
      id: "m07-c03",
      titulo: "Límites de no rechazo y probabilidad de no rechazar (patrón de pruebas)",
      cubre: ["M07.3"],
      simple: String.raw`<p>Un patrón que se repite en ayudantías y pruebas: (1) ¿para qué valores de $\bar x$ (o $\hat p$, o $s^2$) se rechaza $H_0$? (2) Si el parámetro verdadero fuera tal valor, ¿cuál es la probabilidad de <em>no</em> rechazar? Esa segunda probabilidad es $\beta$.</p>`,
      formal: String.raw`<p><strong>Media con σ conocida (bilateral).</strong> No se rechaza si $\mu_0+z_{\alpha/2}\,\dfrac{\sigma}{\sqrt n}\le\bar X\le\mu_0+z_{1-\alpha/2}\,\dfrac{\sigma}{\sqrt n}$. Luego
$$\beta=P\bigl(\bar X_{inf}\le\bar X\le\bar X_{sup}\mid\mu=\mu_1\bigr)=\Phi\!\left(\tfrac{\bar X_{sup}-\mu_1}{\sigma/\sqrt n}\right)-\Phi\!\left(\tfrac{\bar X_{inf}-\mu_1}{\sigma/\sqrt n}\right)$$</p>
<p><strong>Varianza (bilateral).</strong> Límites de $S^2$: $\dfrac{\sigma_0^2\,\chi^2_{\alpha/2}}{n-1}$ y $\dfrac{\sigma_0^2\,\chi^2_{1-\alpha/2}}{n-1}$. Si la varianza verdadera es $\sigma_1^2$: $\beta=P\!\left(\chi^2_{inf}\tfrac{\sigma_0^2}{\sigma_1^2}\le\chi^2_{n-1}\le\chi^2_{sup}\tfrac{\sigma_0^2}{\sigma_1^2}\right)$.</p>
<p>En R: <code>qnorm</code>, <code>qchisq</code> para los límites y <code>pnorm</code>, <code>pchisq</code> para la probabilidad.</p>`,
      ejemplo: String.raw`<p><strong>Ayudantía 2, P2 (b)–(c)</strong> ($\sigma=0{,}02$, $n=20$, $H_0:\mu=1$, $\alpha=5\,\%$):</p>
<ol>
  <li>Límites: $1\pm1{,}96\cdot0{,}02/\sqrt{20}$ ⇒ se rechaza si $\bar X<0{,}9912$ o $\bar X>1{,}0088$.</li>
  <li>Con $\mu=1{,}005$: $P(0{,}9912\le\bar X\le1{,}0088)\approx0{,}80$. La pauta calcula $0{,}8012$ con los límites ya redondeados a 4 decimales; sin redondear sale $0{,}7990$ (ver «Diferencias entre fuentes»).</li>
</ol>
<p><strong>Ayudantía 2, P3 (b)–(c)</strong> ($n=10$, $H_0:\sigma^2=4$): se rechaza si $S^2<1{,}200$ o $S^2>8{,}455$. Si $\sigma^2=5$, la probabilidad de no rechazar es $0{,}9036$: el test casi no detecta esa diferencia.</p>`,
      r: {
        nota: "Código de la pauta de la Ayudantía 2 (P2 b–c y P3 b–c).",
        codigo: `sigma <- 0.02; n <- 20
li <- 1 + qnorm(0.025) * sigma / sqrt(n)
ls <- 1 + qnorm(0.975) * sigma / sqrt(n)
c(li, ls)
se <- sigma / sqrt(n)
pnorm(ls, 1.005, se) - pnorm(li, 1.005, se)`,
        rlab: "r-m07-beta"
      },
      errores: ["Usar los límites de no rechazo calculados con el parámetro verdadero en vez de μ₀.", "Olvidar restar las dos probabilidades (queremos la zona entre los límites)."],
      memoriza: String.raw`<p>Límites de no rechazo siempre con el valor de $H_0$; $\beta$ = probabilidad entre esos límites calculada con el parámetro <strong>verdadero</strong>.</p>`,
      comprueba: {
        enunciado: "Para calcular β de una prueba sobre la media, ¿con qué media se calcula la probabilidad entre los límites de no rechazo?",
        opciones: ["Con la media verdadera supuesta bajo H1", "Con la media de H0", "Con la media muestral", "Con cero"],
        correcta: 0,
        explicacion: "Los límites se fijan con μ0, pero la probabilidad se evalúa con el valor verdadero."
      },
      verifica: [
        { que: "límite inferior X̄", r: `cat(round(1 + qnorm(0.025) * 0.02 / sqrt(20), 4))`, esperado: 0.9912, tol: 0.00005 },
        { que: "β μ=1,005 (límites sin redondear)", r: `s <- 0.02/sqrt(20); cat(round(pnorm(1+qnorm(.975)*s, 1.005, s) - pnorm(1+qnorm(.025)*s, 1.005, s), 4))`, esperado: 0.799, tol: 0.00005 },
        { que: "β con límites redondeados (pauta)", r: `s <- 0.02/sqrt(20); cat(round(pnorm(1.0088, 1.005, s) - pnorm(0.9912, 1.005, s), 4))`, esperado: 0.8012, tol: 0.00005 },
        { que: "β varianza real 5 (AY2 P3c)", r: `n <- 10; ci <- qchisq(0.025, n-1); cs <- qchisq(0.975, n-1); cat(round(pchisq(cs*4/5, n-1) - pchisq(ci*4/5, n-1), 4))`, esperado: 0.9036, tol: 0.00005 }
      ],
      fuente: [{ id: "C2", loc: "slides 37–38" }, { id: "AY2-E", loc: "P2(b)(c), P3(b)(c)" }, { id: "AY2-P", loc: "P2 y P3" }]
    }
  ],

  errores: [
    { texto: "El tamaño de muestra no cambia α, pero sí reduce β.", fuente: [{ id: "PR-P1-Q1", loc: "afirmación 6" }] }
  ]
});
