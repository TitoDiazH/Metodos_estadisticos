/* ============================================================================
   Preguntas · M07 Errores tipo I/II y potencia (P1)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m07-errores-potencia";
  // β para la media con σ conocida, bilateral: argumentos (mu0, sigma, n, alfa, mu1)
  var BETA = `beta_media <- function(mu0, sigma, n, alfa, mu1) {
  se <- sigma / sqrt(n)
  li <- mu0 + qnorm(alfa / 2) * se
  ls <- mu0 + qnorm(1 - alfa / 2) * se
  pnorm(ls, mu1, se) - pnorm(li, mu1, se)
}
`;

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m07-q001", modulo: MOD, concepto: "m07-c01", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: "Un laboratorio no rechaza H₀ aunque la media real es distinta de la hipotetizada. ¿Qué error cometió?",
      opciones: ["Error tipo II", "Error tipo I", "Ninguno: no rechazar nunca es un error", "Error de muestreo, que no es un error de decisión"],
      correcta: 0,
      explicacion: "No rechazar una H₀ falsa es el error tipo II (probabilidad β). El tipo I es rechazar una H₀ verdadera (probabilidad α).",
      distractores: ["", "El tipo I sería rechazar siendo H₀ verdadera.", "Sí puede serlo: si H₀ es falsa, no rechazar es un error tipo II.", "Es un error de decisión, clasificado como tipo II."],
      fuente: [{ id: "C2", loc: "slides 35–36" }]
    },
    {
      id: "m07-q002", modulo: MOD, concepto: "m07-c01", tipo: "vf", dificultad: 2, origen: "curso",
      enunciado: "Con α = 0,01, a mayor tamaño de muestra menor es la probabilidad de cometer un error tipo I.",
      correcta: false,
      explicacion: "Falso. La probabilidad de error tipo I es α = 0,01 y la fija el investigador; no depende de n. Lo que disminuye al aumentar n es β (error tipo II), por lo que aumenta la potencia.",
      fuente: [{ id: "PR-P1-Q1", loc: "afirmación 6" }]
    },
    {
      id: "m07-q003", modulo: MOD, concepto: "m07-c01", tipo: "vf", dificultad: 2, origen: "curso",
      enunciado: "Si no rechazo H₀, puedo estar seguro de que H₀ es verdadera.",
      correcta: false,
      explicacion: "Falso. Solo se concluye que no hay evidencia suficiente en su contra; podría ser un error tipo II (H₀ falsa que no se detectó).",
      fuente: [{ id: "PR-P1-Q1", loc: "afirmación 4" }]
    },
    {
      id: "m07-q004", modulo: MOD, concepto: "m07-c01", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: "¿Cómo se define la potencia de una prueba?",
      opciones: [
        "La probabilidad de rechazar H₀ cuando H₀ es falsa (1 − β)",
        "La probabilidad de rechazar H₀ cuando H₀ es verdadera (α)",
        "La probabilidad de no rechazar H₀ cuando es falsa (β)",
        "El p-valor de la prueba"
      ],
      correcta: 0,
      explicacion: "Potencia = 1 − β: capacidad de detectar un efecto que sí existe.",
      distractores: ["", "Eso es α.", "Eso es β, el complemento de la potencia.", "El p-valor sale de los datos; la potencia es una propiedad de la prueba."],
      fuente: [{ id: "C2", loc: "slide 35" }]
    },
    {
      id: "m07-q005", modulo: MOD, concepto: "m07-c01", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "Si se disminuye α (por ejemplo de 0,05 a 0,01) manteniendo n y todo lo demás fijo, ¿qué ocurre con β?",
      opciones: ["Aumenta", "Disminuye", "No cambia", "Se hace igual a α"],
      correcta: 0,
      explicacion: "Exigir más evidencia para rechazar (α menor) hace más difícil detectar un efecto real: β aumenta y la potencia baja. Es el equilibrio entre ambos errores.",
      verifica: [
        { que: "β con α=0,05", r: BETA + `cat(round(beta_media(1, 0.02, 20, 0.05, 1.005), 4))`, esperado: 0.799, tol: 0.00005 },
        { que: "β con α=0,01", r: BETA + `cat(round(beta_media(1, 0.02, 20, 0.01, 1.005), 4))`, esperado: 0.9274, tol: 0.00005 }
      ],
      fuente: [{ id: "C2", loc: "slides 35–37" }]
    },
    {
      id: "m07-q006", modulo: MOD, concepto: "m07-c01", tipo: "multiple", dificultad: 2, origen: "nueva",
      enunciado: "¿Cuáles de estas afirmaciones sobre los errores en una prueba de hipótesis son correctas?",
      opciones: [
        "P(error tipo I) = α",
        "Potencia = 1 − β",
        "β = 1 − α",
        "Rechazar una H₀ verdadera es un error tipo I"
      ],
      correcta: [0, 1, 3],
      explicacion: "α, β y la potencia se refieren a situaciones distintas: α se calcula suponiendo H₀ verdadera y β suponiendo un valor verdadero específico bajo H₁. Por eso β ≠ 1 − α.",
      fuente: [{ id: "C2", loc: "slides 35–36" }]
    },
    {
      id: "m07-q007", modulo: MOD, concepto: "m07-c02", tipo: "multiple", dificultad: 2, origen: "nueva",
      enunciado: "Todo lo demás constante, ¿cuáles de estos cambios DISMINUYEN β (aumentan la potencia)?",
      opciones: [
        "Aumentar el tamaño de muestra n",
        "Aumentar α",
        "Que el valor verdadero esté más lejos del valor de H₀",
        "Que la variabilidad σ sea mayor"
      ],
      correcta: [0, 1, 2],
      explicacion: "β disminuye con mayor n, mayor α, mayor diferencia real y menor σ. Una σ mayor hace más difícil detectar la diferencia: β aumenta.",
      fuente: [{ id: "C2", loc: "slide 37" }]
    },
    {
      id: "m07-q008", modulo: MOD, concepto: "m07-c02", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "Se puede calcular β sin especificar ningún valor concreto del parámetro bajo H₁.",
      correcta: false,
      explicacion: "Falso. β depende del valor verdadero del parámetro (por ejemplo μ = 1,005). Bajo «H₁: μ ≠ 1» hay infinitos valores posibles; hay que fijar uno para obtener una probabilidad.",
      fuente: [{ id: "C2", loc: "slide 37" }, { id: "AY2-E", loc: "P2(c)" }]
    },
    {
      id: "m07-q009", modulo: MOD, concepto: "m07-c02", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "AY2-E", loc: "P2(c)" }],
      enunciado: String.raw`Con $\sigma=0{,}02$, $H_0:\mu=1$, $\alpha=5\,\%$ y $\mu=1{,}005$, ¿cuánto vale $\beta$ si el tamaño de muestra aumenta de $n=20$ a $n=40$? (La pauta con $n=20$ da $\approx0{,}80$.)`,
      respuesta: 0.6474, tolerancia: 0.002,
      explicacion: String.raw`Con $n=40$: $\sigma/\sqrt n=0{,}003162$; límites $1\pm1{,}96\cdot0{,}003162=(0{,}9938;\ 1{,}0062)$. $\beta=\Phi\!\left(\tfrac{1{,}0062-1{,}005}{0{,}003162}\right)-\Phi\!\left(\tfrac{0{,}9938-1{,}005}{0{,}003162}\right)=\Phi(0{,}38)-\Phi(-3{,}54)=0{,}6474$. Al duplicar $n$, $\beta$ baja de $0{,}80$ a $0{,}65$.`,
      verifica: [{ que: "β n=40", r: BETA + `cat(round(beta_media(1, 0.02, 40, 0.05, 1.005), 4))`, esperado: 0.6474, tol: 0.00005 }],
      fuente: [{ id: "C2", loc: "slide 37" }, { id: "AY2-E", loc: "P2(c)" }]
    },
    {
      id: "m07-q010", modulo: MOD, concepto: "m07-c03", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Ayudantía 2, P2(b): $\sigma=0{,}02$ kg, $n=20$, $H_0:\mu=1$, $\alpha=5\,\%$. Calcula el <strong>límite superior</strong> de $\bar X$ a partir del cual se rechaza $H_0$ (3 decimales).`,
      respuesta: 1.009, tolerancia: 0.0006,
      explicacion: String.raw`$\bar X_{sup}=\mu_0+z_{0{,}975}\dfrac{\sigma}{\sqrt n}=1+1{,}96\cdot\dfrac{0{,}02}{\sqrt{20}}=1+0{,}00877=1{,}0088$. Se rechaza $H_0$ si $\bar X<0{,}9912$ o $\bar X>1{,}0088$.`,
      verifica: [{ que: "límite superior", r: `cat(round(1 + qnorm(0.975) * 0.02 / sqrt(20), 4))`, esperado: 1.0088, tol: 0.00005 }],
      fuente: [{ id: "AY2-E", loc: "P2(b)" }, { id: "AY2-P", loc: "P2" }]
    },
    {
      id: "m07-q011", modulo: MOD, concepto: "m07-c03", tipo: "calculo", dificultad: 3, origen: "curso",
      enunciado: String.raw`Con los mismos datos (límites de no rechazo $0{,}9912$ y $1{,}0088$), si la media verdadera es $\mu=1{,}005$, ¿cuál es la probabilidad de <strong>no rechazar</strong> $H_0$? (usa los límites sin redondear)`,
      respuesta: 0.799, tolerancia: 0.003,
      explicacion: String.raw`$\beta=P(\bar X_{inf}\le\bar X\le\bar X_{sup}\mid\mu=1{,}005)=\Phi\!\left(\tfrac{1{,}00877-1{,}005}{0{,}004472}\right)-\Phi\!\left(\tfrac{0{,}99123-1{,}005}{0{,}004472}\right)=\Phi(0{,}84)-\Phi(-3{,}08)=0{,}799$. Con los límites redondeados a 4 decimales la pauta obtiene $0{,}8012$; la diferencia es solo redondeo. La potencia es $1-\beta\approx0{,}20$.`,
      verifica: [
        { que: "β sin redondear", r: BETA + `cat(round(beta_media(1, 0.02, 20, 0.05, 1.005), 4))`, esperado: 0.799, tol: 0.00005 },
        { que: "β con límites redondeados (pauta)", r: `s <- 0.02/sqrt(20); cat(round(pnorm(1.0088, 1.005, s) - pnorm(0.9912, 1.005, s), 4))`, esperado: 0.8012, tol: 0.00005 }
      ],
      fuente: [{ id: "AY2-E", loc: "P2(c)" }, { id: "AY2-P", loc: "P2" }]
    },
    {
      id: "m07-q012", modulo: MOD, concepto: "m07-c03", tipo: "calculo", dificultad: 3, origen: "variacion",
      base: [{ id: "AY2-E", loc: "P2(c)" }],
      enunciado: String.raw`Una máquina llena frascos con $\sigma=4$ g (conocida). Con $n=16$, $H_0:\mu=50$ vs $H_1:\mu\ne50$ y $\alpha=5\,\%$, calcula $\beta$ cuando la media verdadera es $\mu=53$.`,
      respuesta: 0.1492, tolerancia: 0.002,
      explicacion: String.raw`$\sigma/\sqrt n=1$. Límites de no rechazo: $50\pm1{,}96=(48{,}04;\ 51{,}96)$. $\beta=\Phi(51{,}96-53)-\Phi(48{,}04-53)=\Phi(-1{,}04)-\Phi(-4{,}96)=0{,}1492$. Potencia $=0{,}851$.`,
      verifica: [{ que: "β", r: BETA + `cat(round(beta_media(50, 4, 16, 0.05, 53), 4))`, esperado: 0.1492, tol: 0.00005 }],
      fuente: [{ id: "C2", loc: "slides 37–38" }, { id: "AY2-E", loc: "P2(b)(c)" }]
    },
    {
      id: "m07-q013", modulo: MOD, concepto: "m07-c03", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Ayudantía 2, P3(b): $n=10$, $H_0:\sigma^2=4$, $\alpha=5\,\%$ bilateral. Calcula el <strong>límite superior</strong> de $S^2$ a partir del cual se rechaza $H_0$.`,
      respuesta: 8.455, tolerancia: 0.01,
      explicacion: String.raw`$S^2_{sup}=\dfrac{\sigma_0^2\,\chi^2_{0{,}975;9}}{n-1}=\dfrac{4\cdot19{,}023}{9}=8{,}455$. El inferior es $\dfrac{4\cdot2{,}700}{9}=1{,}200$.`,
      verifica: [
        { que: "límite superior", r: `cat(round(4 * qchisq(0.975, 9) / 9, 3))`, esperado: 8.455, tol: 0.0005 },
        { que: "límite inferior", r: `cat(round(4 * qchisq(0.025, 9) / 9, 3))`, esperado: 1.2, tol: 0.0005 }
      ],
      fuente: [{ id: "AY2-E", loc: "P3(b)" }, { id: "AY2-P", loc: "P3" }]
    },
    {
      id: "m07-q014", modulo: MOD, concepto: "m07-c03", tipo: "calculo", dificultad: 3, origen: "curso",
      enunciado: String.raw`Con $n=10$ y $H_0:\sigma^2=4$ ($\alpha=5\,\%$ bilateral), si la varianza verdadera es $\sigma^2=5$, ¿cuál es la probabilidad de <strong>no rechazar</strong> $H_0$?`,
      respuesta: 0.9036, tolerancia: 0.003,
      explicacion: String.raw`$\beta=P\!\left(\chi^2_{inf}\tfrac{4}{5}\le\chi^2_9\le\chi^2_{sup}\tfrac{4}{5}\right)=\texttt{pchisq}(19{,}023\cdot0{,}8;9)-\texttt{pchisq}(2{,}700\cdot0{,}8;9)=0{,}9036$. La prueba casi no detecta que la varianza pasó de $4$ a $5$.`,
      verifica: [{ que: "β varianza", r: `ci <- qchisq(0.025, 9); cs <- qchisq(0.975, 9); cat(round(pchisq(cs*4/5, 9) - pchisq(ci*4/5, 9), 4))`, esperado: 0.9036, tol: 0.00005 }],
      fuente: [{ id: "AY2-E", loc: "P3(c)" }, { id: "AY2-P", loc: "P3" }]
    },
    {
      id: "m07-q015", modulo: MOD, concepto: "m07-c03", tipo: "calculo", dificultad: 3, origen: "variacion",
      base: [{ id: "AY2-E", loc: "P3(c)" }],
      enunciado: String.raw`Con $n=10$ y $H_0:\sigma^2=4$ ($\alpha=5\,\%$ bilateral), ¿cuál es la probabilidad de no rechazar $H_0$ si la varianza verdadera es $\sigma^2=6$?`,
      respuesta: 0.8167, tolerancia: 0.003,
      explicacion: String.raw`$\beta=\texttt{pchisq}(\chi^2_{0{,}975;9}\cdot\tfrac46;9)-\texttt{pchisq}(\chi^2_{0{,}025;9}\cdot\tfrac46;9)=0{,}8167$. Menor que $0{,}9036$ ($\sigma^2=5$): cuanto más lejos del valor de $H_0$, más fácil detectarlo.`,
      verifica: [{ que: "β σ²=6", r: `ci <- qchisq(0.025, 9); cs <- qchisq(0.975, 9); cat(round(pchisq(cs*4/6, 9) - pchisq(ci*4/6, 9), 4))`, esperado: 0.8167, tol: 0.00005 }],
      fuente: [{ id: "AY2-E", loc: "P3(c)" }]
    },
    {
      id: "m07-q016", modulo: MOD, concepto: "m07-c03", tipo: "interpretacion-R", dificultad: 2, origen: "nueva",
      enunciado: "Se calculó β para la media (σ = 0,02, H₀: μ = 1, α = 0,05) con n = 20 y n = 80 cuando la media verdadera es 1,005. ¿Qué muestra la salida?",
      codigoR: `beta_n <- function(n) {
  se <- 0.02 / sqrt(n)
  li <- 1 + qnorm(0.025) * se; ls <- 1 + qnorm(0.975) * se
  pnorm(ls, 1.005, se) - pnorm(li, 1.005, se)
}
round(c(n20 = beta_n(20), n80 = beta_n(80)), 4)`,
      salidaR: `   n20    n80 
0.7990 0.3912 `,
      salidaDe: `beta_n <- function(n) {
  se <- 0.02 / sqrt(n)
  li <- 1 + qnorm(0.025) * se; ls <- 1 + qnorm(0.975) * se
  pnorm(ls, 1.005, se) - pnorm(li, 1.005, se)
}
round(c(n20 = beta_n(20), n80 = beta_n(80)), 4)`,
      opciones: [
        "Con más muestra β baja (0,80 → 0,39) y la potencia sube de 0,20 a 0,61",
        "Con más muestra α baja de 0,80 a 0,39",
        "Con más muestra β sube, porque hay más variabilidad",
        "El tamaño de muestra no afecta a β"
      ],
      correcta: 0,
      explicacion: "β = 0,799 con n = 20 y 0,391 con n = 80: tamaños de muestra mayores detectan mejor la diferencia 0,005 (potencia 1 − β = 0,20 → 0,61). α no cambia: sigue en 0,05.",
      distractores: ["", "α se fija en 0,05 y no depende de n.", "Más datos reducen el error estándar y por tanto β.", "β depende de n."],
      fuente: [{ id: "C2", loc: "slide 37" }, { id: "AY2-P", loc: "P2" }]
    },
    {
      id: "m07-q017", modulo: MOD, concepto: "m07-c03", tipo: "completar-R", dificultad: 2, origen: "curso",
      enunciado: "Completa el cálculo de β para la media con σ conocida (límites de no rechazo calculados con μ₀ = 1; media verdadera 1,005).",
      codigoR: `se <- 0.02 / sqrt(20)
li <- 1 + qnorm(0.025) * se
ls <- 1 + qnorm(0.975) * se
beta <- ___(ls, 1.005, se) - ___(li, 1.005, se)`,
      huecos: [["pnorm"], ["pnorm"]],
      explicacion: String.raw`Los límites se arman con $\mu_0$ (<code>qnorm</code>) y la probabilidad entre ellos se evalúa con la media verdadera $1{,}005$ (<code>pnorm(…, media, se)</code>): $\beta=P(\bar X\le ls)-P(\bar X\le li)$.`,
      fuente: [{ id: "AY2-P", loc: "P2 (b)(c)" }]
    }
  ]);
})();
