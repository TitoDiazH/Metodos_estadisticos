/* ============================================================================
   Desarrollo · M07 Errores tipo I/II y potencia (P1) — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m07-d002",
    modulo: "m07-errores-potencia",
    concepto: "m07-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 37–38" },
      { id: "AY2-E", loc: "P2(b)(c)" }
    ],
    titulo: "Límites de no rechazo y β para una media (peso de un producto)",
    enunciado: String.raw`<p>Una envasadora debe entregar $50$ g por unidad. Se contrasta $H_0:\mu=50$ contra $H_1:\mu\neq50$ con $\sigma=4$ conocida, $n=25$ y $\alpha=5\,\%$.</p><ol type="a"><li>Calcula los límites de $\bar X$ entre los cuales <strong>no</strong> se rechaza $H_0$.</li><li>Si en realidad $\mu=52$, calcula la probabilidad de no rechazar $H_0$. ¿Qué tipo de error es?</li><li>Calcula la potencia e indica dos formas de aumentarla.</li></ol>`,
    partes: [
      { titulo: "a) Límites de no rechazo", puntos: 2, solucion: String.raw`<p>Error estándar: $\sigma/\sqrt n=4/\sqrt{25}=0{,}8$; $z_{0{,}975}=1{,}96$.</p><p>$\mu_0\pm z\,\dfrac{\sigma}{\sqrt n}=50\pm1{,}96\cdot0{,}8$ ⇒ no se rechaza si $48{,}432\le\bar X\le51{,}568$.</p>` },
      { titulo: "b) Probabilidad de no rechazar con la media verdadera", puntos: 2.5, solucion: String.raw`<p>Ahora $\bar X\sim N(52;\ 0{,}8^2)$. Se estandariza con $\mu_1$:</p><p>$\beta=\Phi\!\left(\dfrac{51{,}568-52}{0{,}8}\right)-\Phi\!\left(\dfrac{48{,}432-52}{0{,}8}\right)=\Phi(-0{,}54)-\Phi(-4{,}46)=0{,}2946$.</p><p>Es la probabilidad de <strong>error tipo II</strong>: no rechazar $H_0$ siendo falsa.</p>` },
      { titulo: "c) Potencia y cómo aumentarla", puntos: 1.5, solucion: String.raw`<p>Potencia $=1-\beta=0{,}7054$: probabilidad de detectar que $\mu=52$.</p><p>Es moderada. Aumenta con: mayor $n$, mayor $\alpha$, menor $\sigma$ o una diferencia real $|\mu_1-\mu_0|$ más grande.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "β", r: "cat(pnorm(50 + qnorm(0.975)*4/sqrt(25), 52, 4/sqrt(25)) - pnorm(50 - qnorm(0.975)*4/sqrt(25), 52, 4/sqrt(25)))", esperado: 0.2946, tol: 0.000050001 },
      { que: "límite superior", r: "cat(50 + qnorm(0.975)*4/sqrt(25))", esperado: 51.568, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 37–38" },
      { id: "AY2-E", loc: "P2(b)(c)" }
    ]
  },
  {
    id: "m07-d003",
    modulo: "m07-errores-potencia",
    concepto: "m07-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 37–38" },
      { id: "AY2-E", loc: "P2(b)(c)" }
    ],
    titulo: "β y potencia con α = 1 % (puntaje medio)",
    enunciado: String.raw`<p>Un test estandarizado tiene media $100$. Se contrasta $H_0:\mu=100$ contra $H_1:\mu\neq100$ con $\sigma=15$ conocida, $n=36$ y $\alpha=1\,\%$.</p><ol type="a"><li>Calcula los límites de $\bar X$ entre los cuales <strong>no</strong> se rechaza $H_0$.</li><li>Si en realidad $\mu=108$, calcula la probabilidad de no rechazar $H_0$. ¿Qué tipo de error es?</li><li>Calcula la potencia e indica dos formas de aumentarla.</li></ol>`,
    partes: [
      { titulo: "a) Límites de no rechazo", puntos: 2, solucion: String.raw`<p>Error estándar: $\sigma/\sqrt n=15/\sqrt{36}=2{,}5$; $z_{0{,}995}=2{,}576$.</p><p>$\mu_0\pm z\,\dfrac{\sigma}{\sqrt n}=100\pm2{,}576\cdot2{,}5$ ⇒ no se rechaza si $93{,}5604\le\bar X\le106{,}4396$.</p>` },
      { titulo: "b) Probabilidad de no rechazar con la media verdadera", puntos: 2.5, solucion: String.raw`<p>Ahora $\bar X\sim N(108;\ 2{,}5^2)$. Se estandariza con $\mu_1$:</p><p>$\beta=\Phi\!\left(\dfrac{106{,}4396-108}{2{,}5}\right)-\Phi\!\left(\dfrac{93{,}5604-108}{2{,}5}\right)=\Phi(-0{,}624)-\Phi(-5{,}776)=0{,}2663$.</p><p>Es la probabilidad de <strong>error tipo II</strong>: no rechazar $H_0$ siendo falsa.</p>` },
      { titulo: "c) Potencia y cómo aumentarla", puntos: 1.5, solucion: String.raw`<p>Potencia $=1-\beta=0{,}7337$: probabilidad de detectar que $\mu=108$.</p><p>Es moderada. Aumenta con: mayor $n$, mayor $\alpha$, menor $\sigma$ o una diferencia real $|\mu_1-\mu_0|$ más grande.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "β", r: "cat(pnorm(100 + qnorm(0.995)*15/sqrt(36), 108, 15/sqrt(36)) - pnorm(100 - qnorm(0.995)*15/sqrt(36), 108, 15/sqrt(36)))", esperado: 0.2663, tol: 0.000050001 },
      { que: "límite superior", r: "cat(100 + qnorm(0.995)*15/sqrt(36))", esperado: 106.4396, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 37–38" },
      { id: "AY2-E", loc: "P2(b)(c)" }
    ]
  },
  {
    id: "m07-d004",
    modulo: "m07-errores-potencia",
    concepto: "m07-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 37–38" },
      { id: "AY2-E", loc: "P2(b)(c)" }
    ],
    titulo: "β y potencia con α = 10 % (concentración)",
    enunciado: String.raw`<p>La concentración de un reactivo debe ser $1{,}5$ g/l. Se contrasta $H_0:\mu=1{,}5$ contra $H_1:\mu\neq1{,}5$ con $\sigma=0{,}2$ conocida, $n=16$ y $\alpha=10\,\%$.</p><ol type="a"><li>Calcula los límites de $\bar X$ entre los cuales <strong>no</strong> se rechaza $H_0$.</li><li>Si en realidad $\mu=1{,}4$, calcula la probabilidad de no rechazar $H_0$. ¿Qué tipo de error es?</li><li>Calcula la potencia e indica dos formas de aumentarla.</li></ol>`,
    partes: [
      { titulo: "a) Límites de no rechazo", puntos: 2, solucion: String.raw`<p>Error estándar: $\sigma/\sqrt n=0{,}2/\sqrt{16}=0{,}05$; $z_{0{,}95}=1{,}645$.</p><p>$\mu_0\pm z\,\dfrac{\sigma}{\sqrt n}=1{,}5\pm1{,}645\cdot0{,}05$ ⇒ no se rechaza si $1{,}4178\le\bar X\le1{,}5822$.</p>` },
      { titulo: "b) Probabilidad de no rechazar con la media verdadera", puntos: 2.5, solucion: String.raw`<p>Ahora $\bar X\sim N(1{,}4;\ 0{,}05^2)$. Se estandariza con $\mu_1$:</p><p>$\beta=\Phi\!\left(\dfrac{1{,}5822-1{,}4}{0{,}05}\right)-\Phi\!\left(\dfrac{1{,}4178-1{,}4}{0{,}05}\right)=\Phi(3{,}645)-\Phi(0{,}355)=0{,}3611$.</p><p>Es la probabilidad de <strong>error tipo II</strong>: no rechazar $H_0$ siendo falsa.</p>` },
      { titulo: "c) Potencia y cómo aumentarla", puntos: 1.5, solucion: String.raw`<p>Potencia $=1-\beta=0{,}6389$: probabilidad de detectar que $\mu=1{,}4$.</p><p>Es moderada. Aumenta con: mayor $n$, mayor $\alpha$, menor $\sigma$ o una diferencia real $|\mu_1-\mu_0|$ más grande.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "β", r: "cat(pnorm(1.5 + qnorm(0.95)*0.2/sqrt(16), 1.4, 0.2/sqrt(16)) - pnorm(1.5 - qnorm(0.95)*0.2/sqrt(16), 1.4, 0.2/sqrt(16)))", esperado: 0.3611, tol: 0.000050001 },
      { que: "límite superior", r: "cat(1.5 + qnorm(0.95)*0.2/sqrt(16))", esperado: 1.5822, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 37–38" },
      { id: "AY2-E", loc: "P2(b)(c)" }
    ]
  },
  {
    id: "m07-d005",
    modulo: "m07-errores-potencia",
    concepto: "m07-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 37–38" },
      { id: "AY2-E", loc: "P2(b)(c)" }
    ],
    titulo: "El mismo test con una muestra más grande",
    enunciado: String.raw`<p>Una envasadora debe entregar $50$ g por unidad (mismo caso que antes, ahora con cuatro veces más datos). Se contrasta $H_0:\mu=50$ contra $H_1:\mu\neq50$ con $\sigma=4$ conocida, $n=100$ y $\alpha=5\,\%$.</p><ol type="a"><li>Calcula los límites de $\bar X$ entre los cuales <strong>no</strong> se rechaza $H_0$.</li><li>Si en realidad $\mu=52$, calcula la probabilidad de no rechazar $H_0$. ¿Qué tipo de error es?</li><li>Calcula la potencia e indica dos formas de aumentarla.</li></ol>`,
    partes: [
      { titulo: "a) Límites de no rechazo", puntos: 2, solucion: String.raw`<p>Error estándar: $\sigma/\sqrt n=4/\sqrt{100}=0{,}4$; $z_{0{,}975}=1{,}96$.</p><p>$\mu_0\pm z\,\dfrac{\sigma}{\sqrt n}=50\pm1{,}96\cdot0{,}4$ ⇒ no se rechaza si $49{,}216\le\bar X\le50{,}784$.</p>` },
      { titulo: "b) Probabilidad de no rechazar con la media verdadera", puntos: 2.5, solucion: String.raw`<p>Ahora $\bar X\sim N(52;\ 0{,}4^2)$. Se estandariza con $\mu_1$:</p><p>$\beta=\Phi\!\left(\dfrac{50{,}784-52}{0{,}4}\right)-\Phi\!\left(\dfrac{49{,}216-52}{0{,}4}\right)=\Phi(-3{,}04)-\Phi(-6{,}96)=0{,}0012$.</p><p>Es la probabilidad de <strong>error tipo II</strong>: no rechazar $H_0$ siendo falsa.</p>` },
      { titulo: "c) Potencia y cómo aumentarla", puntos: 1.5, solucion: String.raw`<p>Potencia $=1-\beta=0{,}9988$: probabilidad de detectar que $\mu=52$.</p><p>Es alta. Aumenta con: mayor $n$, mayor $\alpha$, menor $\sigma$ o una diferencia real $|\mu_1-\mu_0|$ más grande.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "β", r: "cat(pnorm(50 + qnorm(0.975)*4/sqrt(100), 52, 4/sqrt(100)) - pnorm(50 - qnorm(0.975)*4/sqrt(100), 52, 4/sqrt(100)))", esperado: 0.0012, tol: 0.000050001 },
      { que: "límite superior", r: "cat(50 + qnorm(0.975)*4/sqrt(100))", esperado: 50.784, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 37–38" },
      { id: "AY2-E", loc: "P2(b)(c)" }
    ]
  },
  {
    id: "m07-d006",
    modulo: "m07-errores-potencia",
    concepto: "m07-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 37–38" },
      { id: "AY2-E", loc: "P3(b)(c)" }
    ],
    titulo: "Límites de no rechazo y β para una varianza",
    enunciado: String.raw`<p>La varianza de un proceso debe ser $9$. Se contrasta $H_0:\sigma^2=9$ contra $H_1:\sigma^2\neq9$ con $n=15$ y $\alpha=5\,\%$ (población normal).</p><ol type="a"><li>¿Para qué valores de $S^2$ no se rechaza $H_0$?</li><li>Si la varianza verdadera es $\sigma^2=16$, calcula la probabilidad de no rechazar $H_0$.</li><li>Interpreta el resultado.</li></ol>`,
    partes: [
      { titulo: "a) Límites de S² para no rechazar", puntos: 2.5, solucion: String.raw`<p>Con $14$ gl: $\chi^2_{0{,}025}=5{,}629$ y $\chi^2_{0{,}975}=26{,}119$.</p><p>De $\chi^2=\dfrac{(n-1)S^2}{\sigma_0^2}$: $S^2_{inf}=\dfrac{9\cdot5{,}629}{14}=3{,}6185$ y $S^2_{sup}=\dfrac{9\cdot26{,}119}{14}=16{,}7908$. No se rechaza si $3{,}6185\le S^2\le16{,}7908$.</p>` },
      { titulo: "b) Probabilidad de no rechazar con la varianza verdadera", puntos: 2.5, solucion: String.raw`<p>Con $\sigma_1^2=16$, quien sigue una $\chi^2_{14}$ es $\dfrac{(n-1)S^2}{\sigma_1^2}$: los límites del $\chi^2$ se multiplican por $\sigma_0^2/\sigma_1^2=0{,}5625$.</p><p>$\beta=P\!\left(3{,}166\le\chi^2_{14}\le14{,}692\right)=0{,}5992$ (<code>pchisq(14.692, 14) - pchisq(3.166, 14)</code>).</p>` },
      { titulo: "c) Interpretación", puntos: 1, solucion: String.raw`<p>$\beta=0{,}5992$ es la probabilidad de error tipo II; la potencia es $0{,}4008$. El test casi no detecta esa diferencia con este tamaño de muestra: no rechazar $H_0$ no prueba que sea verdadera.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "β", r: "cat(pchisq(qchisq(0.975, 14)*9/16, 14) - pchisq(qchisq(0.025, 14)*9/16, 14))", esperado: 0.5992, tol: 0.000050001 },
      { que: "límite superior de S²", r: "cat(9*qchisq(0.975, 14)/14)", esperado: 16.7908, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 37–38" },
      { id: "AY2-E", loc: "P3(b)(c)" }
    ]
  },
  {
    id: "m07-d007",
    modulo: "m07-errores-potencia",
    concepto: "m07-c03",
    dificultad: 3,
    origen: "variacion",
    base: [
      { id: "C2", loc: "slides 37–38" },
      { id: "AY2-E", loc: "P3(b)(c)" }
    ],
    titulo: "β para una varianza con α = 10 %",
    enunciado: String.raw`<p>La varianza del diámetro de un perno debe ser $0{,}25$ mm². Se contrasta $H_0:\sigma^2=0{,}25$ contra $H_1:\sigma^2\neq0{,}25$ con $n=25$ y $\alpha=10\,\%$ (población normal).</p><ol type="a"><li>¿Para qué valores de $S^2$ no se rechaza $H_0$?</li><li>Si la varianza verdadera es $\sigma^2=0{,}5$, calcula la probabilidad de no rechazar $H_0$.</li><li>Interpreta el resultado.</li></ol>`,
    partes: [
      { titulo: "a) Límites de S² para no rechazar", puntos: 2.5, solucion: String.raw`<p>Con $24$ gl: $\chi^2_{0{,}05}=13{,}848$ y $\chi^2_{0{,}95}=36{,}415$.</p><p>De $\chi^2=\dfrac{(n-1)S^2}{\sigma_0^2}$: $S^2_{inf}=\dfrac{0{,}25\cdot13{,}848}{24}=0{,}1443$ y $S^2_{sup}=\dfrac{0{,}25\cdot36{,}415}{24}=0{,}3793$. No se rechaza si $0{,}1443\le S^2\le0{,}3793$.</p>` },
      { titulo: "b) Probabilidad de no rechazar con la varianza verdadera", puntos: 2.5, solucion: String.raw`<p>Con $\sigma_1^2=0{,}5$, quien sigue una $\chi^2_{24}$ es $\dfrac{(n-1)S^2}{\sigma_1^2}$: los límites del $\chi^2$ se multiplican por $\sigma_0^2/\sigma_1^2=0{,}5$.</p><p>$\beta=P\!\left(6{,}924\le\chi^2_{24}\le18{,}208\right)=0{,}2069$ (<code>pchisq(18.208, 24) - pchisq(6.924, 24)</code>).</p>` },
      { titulo: "c) Interpretación", puntos: 1, solucion: String.raw`<p>$\beta=0{,}2069$ es la probabilidad de error tipo II; la potencia es $0{,}7931$. El test detecta esa diferencia con probabilidad razonable.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    verifica: [
      { que: "β", r: "cat(pchisq(qchisq(0.95, 24)*0.25/0.5, 24) - pchisq(qchisq(0.05, 24)*0.25/0.5, 24))", esperado: 0.2069, tol: 0.000050001 },
      { que: "límite superior de S²", r: "cat(0.25*qchisq(0.95, 24)/24)", esperado: 0.3793, tol: 0.000050001 }
    ],
    fuente: [
      { id: "C2", loc: "slides 37–38" },
      { id: "AY2-E", loc: "P3(b)(c)" }
    ]
  },
  {
    id: "m07-d008",
    modulo: "m07-errores-potencia",
    concepto: "m07-c01",
    dificultad: 1,
    origen: "nueva",
    titulo: "Identificar los errores tipo I y II en contexto",
    enunciado: String.raw`<p>Un laboratorio controla que el contenido medio de un jarabe sea $120$ ml. Cada hora toma una muestra y contrasta $H_0:\mu=120$ contra $H_1:\mu\neq120$ con $\alpha=5\,\%$; si rechaza, detiene la línea.</p><ol type="a"><li>Describe en palabras del problema el error tipo I y el error tipo II.</li><li>¿Cuál es la probabilidad de cada uno? ¿Qué pasa con $\beta$ si se baja $\alpha$ a $1\,\%$?</li><li>El supervisor dice: «no se rechazó $H_0$, así que la línea está perfectamente calibrada». Comenta.</li></ol>`,
    partes: [
      { titulo: "a) Error tipo I en este problema", puntos: 1, solucion: "<p>Rechazar $H_0$ siendo verdadera: <strong>detener la línea</strong> cuando en realidad el contenido medio sí es $120$ ml (falsa alarma).</p>" },
      { titulo: "a) Error tipo II en este problema", puntos: 1, solucion: "<p>No rechazar $H_0$ siendo falsa: <strong>seguir produciendo</strong> cuando el contenido medio ya no es $120$ ml (no se detecta el desajuste).</p>" },
      { titulo: "b) Probabilidades y relación entre α y β", puntos: 2, solucion: String.raw`<p>$P(\text{error I})=\alpha=0{,}05$, lo fija el analista y no depende de $n$. $P(\text{error II})=\beta$, que depende del valor verdadero de $\mu$, de $n$, de $\sigma$ y de $\alpha$; no se puede calcular sin fijar un valor verdadero concreto.</p><p>Si $\alpha$ baja a $1\,\%$ (con el mismo $n$), la región de no rechazo se ensancha y $\beta$ <strong>aumenta</strong> (la potencia $1-\beta$ baja).</p>` },
      { titulo: "c) Comentario a la afirmación del supervisor", puntos: 2, solucion: "<p>Es incorrecta: no rechazar $H_0$ <strong>no prueba</strong> que sea verdadera; solo indica que la muestra no dio evidencia suficiente en contra. Puede haberse cometido un error tipo II, sobre todo si $n$ es pequeño o el desajuste es leve (potencia baja).</p>" }
    ],
    escala: "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.",
    fuente: [
      { id: "C2", loc: "slides 35–37" },
      { id: "PR-P1-Q1", loc: "afirmaciones 4 y 6" }
    ]
  }
]);
