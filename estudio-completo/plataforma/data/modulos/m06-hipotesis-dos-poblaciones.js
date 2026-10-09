/* ============================================================================
   M06 · Pruebas de hipótesis: dos poblaciones (P1)
   Fuentes abiertas para redactar: C2 slides 21–34 · AY2-E P4 y AY2-P (pauta).
   Los números se recalculan en tools/verificar_numeros.js.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m06-hipotesis-dos-poblaciones",
  orden: 6,
  titulo: "Pruebas de hipótesis: dos poblaciones",
  descripcion: "Comparar dos grupos: primero las varianzas (F), luego las medias (Welch, pooled o pareadas). Cuál elegir y cómo se hace en R.",
  pruebas: ["P1"],
  prioridad: "alta",
  fuentes: [{ id: "C2", loc: "slides 21–34" }, { id: "AY2-E", loc: "P4" }],

  conceptos: [
    {
      id: "m06-c01",
      titulo: "Panorama: qué prueba usar con dos poblaciones",
      figura: { tipo: "arbol", ancho: 520, alto: 340, rotulo: "Árbol de decisión para comparar dos poblaciones",
        nodos: [
          { id: "a", x: 240, y: 30, w: 250, t: ["¿Qué se quiere comparar?"] },
          { id: "v", x: 80, y: 120, w: 150, fin: true, t: ["Prueba F", "var.test()"] },
          { id: "m", x: 320, y: 120, w: 230, t: ["¿Son los mismos sujetos", "medidos dos veces?"] },
          { id: "p", x: 180, y: 215, w: 130, fin: true, t: ["t pareada", "paired = TRUE"] },
          { id: "i", x: 390, y: 215, w: 170, t: ["¿Varianzas iguales?"] },
          { id: "w", x: 300, y: 305, w: 120, fin: true, t: ["Welch", "(por defecto)"] },
          { id: "o", x: 440, y: 305, w: 136, fin: true, t: ["Pooled", "var.equal = TRUE"] }
        ],
        aristas: [["a", "v", "variabilidad"], ["a", "m", "medias"], ["m", "p", "sí"], ["m", "i", "no"], ["i", "w", "no / no se sabe"], ["i", "o", "sí"]],
        pie: "El árbol de la clase. Si el enunciado no dice nada sobre las varianzas, la recomendación actual es Welch." },
      cubre: ["M06.1", "M06.6"],
      simple: String.raw`<p>Con dos grupos hay tres preguntas posibles: ¿tienen la misma <strong>variabilidad</strong>? (prueba F), ¿tienen la misma <strong>media</strong>? (t, con varianzas iguales o distintas) y, si son los mismos sujetos medidos dos veces, ¿cambió la media? (<strong>pareadas</strong>).</p>`,
      formal: String.raw`<p>Árbol de decisión (C2 s33):</p>
<ol>
  <li>¿Las muestras son <strong>dependientes</strong> (pareadas)? ⇒ <code>paired = TRUE</code>.</li>
  <li>Si son independientes: ¿varianzas iguales o diferentes? Hoy se recomienda usar la prueba de <strong>varianzas diferentes (Welch)</strong> a menos que se tenga certeza o fuerte evidencia de que son iguales (Zimmerman, 2004).</li>
</ol>
<p>La prueba F de cociente de varianzas era el paso previo clásico para decidir entre pooled y Welch (C2 s22 y s28).</p>`,
      ejemplo: String.raw`<p>Un enunciado que dice «suponga varianzas iguales» pide pooled. Si no dice nada, la regla actual es Welch. Si dice «mismo grupo de pacientes antes y después», es pareada.</p>`,
      errores: ["Tratar como independientes datos pareados (antes/después del mismo sujeto).", "Decidir pooled solo porque las varianzas «se parecen» sin prueba ni enunciado que lo indique."],
      memoriza: String.raw`<p>Pareadas ⇒ <code>paired = TRUE</code>. Independientes ⇒ Welch por defecto (<code>var.equal = FALSE</code>); pooled solo con certeza de varianzas iguales.</p>`,
      comprueba: {
        enunciado: "Se mide el colesterol de los mismos pacientes antes y después de un tratamiento. ¿Qué prueba corresponde?",
        opciones: ["t pareada", "t de Welch", "t pooled", "Prueba F"],
        correcta: 0,
        explicacion: "Los datos están vinculados paciente a paciente: se trabaja con las diferencias."
      },
      fuente: [{ id: "C2", loc: "slides 21 y 33" }]
    },

    {
      id: "m06-c02",
      titulo: "Cociente de varianzas: prueba F y var.test()",
      cubre: ["M06.2", "M06.3"],
      simple: String.raw`<p>La prueba F compara la variabilidad de dos grupos con un cociente de varianzas. Si el cociente es cercano a $1$, las varianzas son parecidas; si es muy grande o muy chico, difieren.</p>`,
      formal: String.raw`$$F=\frac{s_1^2}{s_2^2}\sim F_{(n_1-1,\ n_2-1)}\ \text{bajo }H_0:\sigma_1^2=\sigma_2^2$$
<p>Supone normalidad. En R: <code>var.test(A, B)</code>, o a mano con <code>qf()</code> y <code>pf()</code>. Para una unilateral derecha, la varianza mayor va en el numerador (C2 s25).</p>`,
      ejemplo: String.raw`<p><strong>C2 s23</strong> (viviendas): Santiago $n=23$, $s=120$ MM; Concepción $n=28$, $s=99{,}3$ MM; $H_1:\sigma_1^2\ne\sigma_2^2$, $\alpha=5\,\%$. $F=120^2/99{,}3^2=1{,}46$ con gl $(22,27)$. Los críticos son $0{,}435$ y $2{,}222$; como $1{,}46$ está dentro, <strong>no se rechaza</strong> $H_0$: no hay evidencia de que las variabilidades difieran.</p>
<p><strong>C2 s25</strong> (R, $n_A=12$, $n_B=10$): $F=8{,}924$, gl $(11,9)$, p-valor $=0{,}001388<0{,}05$ ⇒ se rechaza: $\sigma_A^2>\sigma_B^2$.</p>
<p><strong>Ayudantía 2, P4</strong> (máquinas A y B, $n=10$ cada una): $s_A^2=2{,}233$, $s_B^2=1{,}067$; $F=2{,}094$ con gl $(9,9)$; crítico $3{,}179$; p-valor $=0{,}143>0{,}05$ ⇒ no se rechaza: no hay evidencia de que A tenga mayor varianza.</p>`,
      r: {
        nota: "var.test de C2 slide 25 (unilateral derecha).",
        codigo: `A <- c(10.2, 11.0, 9.8, 10.7, 11.4, 10.9, 9.6, 12.2, 10.5, 11.3, 10.1, 11.6)
B <- c(9.9, 10.1, 10.4, 9.7, 10.3, 9.8, 10.0, 9.6, 10.2, 9.9)
var.test(A, B, alternative = "greater")`,
        rlab: "r-m06-vartest"
      },
      lectura: String.raw`<ul><li><code>F = 8.9241, num df = 11, denom df = 9</code>: estadístico y grados de libertad ($n_A-1$, $n_B-1$).</li><li><code>p-value = 0.001388</code> $<0{,}05$ ⇒ se rechaza $H_0$.</li><li><code>ratio of variances 8.924</code>: la varianza de A es casi 9 veces la de B.</li></ul>`,
      errores: ["Poner la varianza menor en el numerador en una unilateral derecha.", "Olvidar los dos grados de libertad (cambian según cuál grupo va arriba)."],
      memoriza: String.raw`<p>$F=s_1^2/s_2^2$, gl $(n_1-1,\ n_2-1)$ · $F\approx1$ ⇒ varianzas similares · <code>var.test(A, B)</code>.</p>`,
      comprueba: {
        enunciado: "En var.test aparece «num df = 11, denom df = 9». ¿Cuántos datos tiene cada muestra?",
        opciones: ["12 y 10", "11 y 9", "10 y 8", "13 y 11"],
        correcta: 0,
        explicacion: "Los grados de libertad son n − 1 en cada grupo."
      },
      verifica: [
        { que: "F Santiago/Concepción", js: "120*120/(99.3*99.3)", esperado: 1.4604, tol: 0.0001 },
        { que: "F de AY2 P4", r: `A <- c(15,16,14,18,17,16,15,19,17,16); B <- c(12,14,13,15,12,14,13,12,14,13); cat(round(var(A)/var(B), 4))`, esperado: 2.0938, tol: 0.0001 }
      ],
      fuente: [{ id: "C2", loc: "slides 22–25" }, { id: "AY2-E", loc: "P4" }]
    },

    {
      id: "m06-c03",
      titulo: "Diferencia de medias con varianzas distintas (Welch)",
      cubre: ["M06.4"],
      simple: String.raw`<p>Welch compara dos medias sin suponer varianzas iguales. Ajusta los grados de libertad para compensar la desigualdad; por eso son más cautelosos (y más seguros).</p>`,
      formal: String.raw`$$t=\frac{(\bar x_2-\bar x_1)-D_0}{\sqrt{s_1^2/n_1+s_2^2/n_2}},\qquad \text{gl}=\frac{\left(s_1^2/n_1+s_2^2/n_2\right)^2}{\frac{(s_1^2/n_1)^2}{n_1-1}+\frac{(s_2^2/n_2)^2}{n_2-1}}$$
<p>Los gl de Welch no son enteros en general. En R: <code>t.test(A, B, var.equal = FALSE)</code> (C2 s26–27, s32). <code>D_0</code> es la diferencia bajo $H_0$ (por defecto $0$; se cambia con <code>mu =</code>).</p>`,
      ejemplo: String.raw`<p>C2 s26–27 (precio del limón): enero $\bar x_1=1938$, $s_1=230$, $n_1=13$; abril $\bar x_2=3560$, $s_2=445$, $n_2=15$. $H_0:\mu_2-\mu_1\le1500$ vs $H_1:\mu_2-\mu_1>1500$, $\alpha=5\,\%$.</p>
<ol>
  <li>$t=\dfrac{3560-1938-1500}{\sqrt{230^2/13+445^2/15}}=0{,}928$.</li>
  <li>gl de Welch $=21{,}57\approx22$; crítico $t_{0{,}05;22}=1{,}72$.</li>
  <li>$0{,}928<1{,}72$ y p-valor $=0{,}1817>0{,}05$ ⇒ no se rechaza $H_0$: no se puede afirmar que el aumento supere los \$1.500.</li>
</ol>`,
      r: {
        nota: "Welch con datos de C2 slide 32 (alternative = \"less\" porque H1: μ_A < μ_B).",
        codigo: `A <- c(14.2, 13.5, 15.1, 14.7, 13.9, 14.0, 15.4, 14.8, 13.8, 14.1, 15.0, 14.4)
B <- c(16.0, 15.7, 17.3, 16.5, 15.9, 17.1, 16.8, 16.2, 17.4, 15.8)
t.test(A, B, alternative = "less", var.equal = FALSE)`,
        rlab: "r-m06-welch"
      },
      lectura: String.raw`<ul><li><code>t = -7.7812, df = 18.553</code>: gl no entero (Welch).</li><li><code>p-value = 1.481e-07</code> ⇒ se rechaza $H_0$: $\mu_A<\mu_B$.</li><li>El IC es $(-\infty;\,-1{,}603]$: no contiene $0$.</li><li>Medias: $14{,}408$ y $16{,}470$.</li></ul>`,
      errores: ["Redondear los gl a entero al usar <code>t.test</code>: R usa el valor exacto.", "Olvidar $D_0$ cuando la hipótesis no es «igual a 0» (usar <code>mu =</code>)."],
      memoriza: String.raw`<p>Welch: $t=\dfrac{\bar x_2-\bar x_1-D_0}{\sqrt{s_1^2/n_1+s_2^2/n_2}}$, gl de Welch (no entero) · <code>var.equal = FALSE</code>.</p>`,
      comprueba: {
        enunciado: "¿Qué distingue a la prueba de Welch de la pooled?",
        opciones: ["No supone varianzas iguales y ajusta los grados de libertad", "Usa datos pareados", "Solo sirve con muestras grandes", "Compara varianzas"],
        correcta: 0,
        explicacion: "Welch usa varianzas separadas y gl ajustados; pooled combina las varianzas."
      },
      verifica: [
        { que: "t de Welch (limón)", js: "(3560-1938-1500)/Math.sqrt(230*230/13+445*445/15)", esperado: 0.9283, tol: 0.0001 },
        { que: "gl de Welch (limón)", js: "Math.pow(230*230/13+445*445/15,2)/(Math.pow(230*230/13,2)/12+Math.pow(445*445/15,2)/14)", esperado: 21.57, tol: 0.005 }
      ],
      fuente: [{ id: "C2", loc: "slides 26–27 y 32" }]
    },

    {
      id: "m06-c04",
      titulo: "Diferencia de medias con varianzas iguales (pooled)",
      cubre: ["M06.5"],
      simple: String.raw`<p>Si se puede suponer que ambas poblaciones tienen la misma varianza (la prueba F no rechazó, o el enunciado lo dice), se «juntan» las varianzas en una sola estimación y la prueba tiene más grados de libertad.</p>`,
      formal: String.raw`$$S_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2},\qquad t=\frac{(\bar x_2-\bar x_1)-D_0}{\sqrt{S_p^2\left(\frac1{n_1}+\frac1{n_2}\right)}}$$
<p>con $n_1+n_2-2$ gl. En R: <code>t.test(A, B, var.equal = TRUE)</code>. En bilateral se compara $|t|$ con $t_{\alpha/2;\,\text{gl}}$.</p>`,
      ejemplo: String.raw`<p>C2 s28–29: enero $\bar x_1=1520$, $s_1=140$, $n_1=18$; abril $\bar x_2=2607$, $s_2=170$, $n_2=10$. $H_0:\mu_2-\mu_1=1000$ vs $H_1:\ne$, $\alpha=10\,\%$.</p>
<ol>
  <li>$S_p^2=\dfrac{17\cdot140^2+9\cdot170^2}{26}=22\,819{,}23$.</li>
  <li>$t=\dfrac{1087-1000}{\sqrt{22\,819{,}23\,(1/18+1/10)}}=1{,}4602$, gl $=26$.</li>
  <li>Crítico $\pm t_{0{,}05;26}=\pm1{,}7056$; $|1{,}46|<1{,}7056$ y p-valor $=0{,}1562>0{,}10$ ⇒ no se rechaza $H_0$.</li>
</ol>`,
      errores: ["Usar pooled sin sustento de que las varianzas son iguales."],
      memoriza: String.raw`<p>Pooled: $S_p^2=\dfrac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}$ y $t$ con $n_1+n_2-2$ gl · <code>var.equal = TRUE</code>.</p>`,
      comprueba: {
        enunciado: "Con n1 = 18 y n2 = 10 en una prueba t pooled, ¿cuántos grados de libertad hay?",
        opciones: ["26", "28", "17", "9"],
        correcta: 0,
        explicacion: "n1 + n2 − 2 = 18 + 10 − 2 = 26."
      },
      verifica: [
        { que: "Sp²", js: "(17*140*140+9*170*170)/26", esperado: 22819.23, tol: 0.01 },
        { que: "t pooled", js: "(2607-1520-1000)/Math.sqrt(((17*140*140+9*170*170)/26)*(1/18+1/10))", esperado: 1.4602, tol: 0.0001 }
      ],
      fuente: [{ id: "C2", loc: "slides 28–29" }]
    },

    {
      id: "m06-c05",
      titulo: "Muestras dependientes (pareadas)",
      cubre: ["M06.7"],
      simple: String.raw`<p>Cuando cada dato de un grupo está unido a uno del otro (el mismo paciente antes y después), se calcula la <strong>diferencia de cada par</strong> y se hace una prueba t de una muestra sobre esas diferencias.</p>`,
      formal: String.raw`<p>$d_i=\text{antes}_i-\text{después}_i$; $H_0:\mu_d=0$.</p>
$$t=\frac{\bar d}{s_d/\sqrt n},\qquad n-1\ \text{gl}$$
<p><code>t.test(antes, despues, paired = TRUE)</code> equivale a <code>t.test(antes - despues, mu = 0)</code>. <strong>El orden importa:</strong> si $\bar d>0$, «antes» es mayor que «después».</p>`,
      ejemplo: String.raw`<p>C2 s30–31: colesterol de $11$ pacientes. $\bar d=19$, $t=9{,}06$ con $10$ gl. Se rechaza $H_0$ (la slide compara con $1{,}8125=t_{0{,}05;10}$): el medicamento reduce el colesterol (la media de $d$ es positiva ⇒ después < antes).</p>`,
      r: {
        nota: "Código de C2 slide 34.",
        codigo: `antes   <- c(135, 140, 152, 150, 140, 157, 153, 154, 141, 130, 136)
despues <- c(110, 125, 132, 143, 120, 124, 137, 130, 128, 115, 115)
t.test(antes, despues, paired = TRUE, alternative = "two.sided", conf.level = 0.95)`,
        rlab: "r-m06-pareadas"
      },
      lectura: String.raw`<ul><li><code>t = 9.0579, df = 10</code>: $n-1=10$ ⇒ 11 pares.</li><li><code>p-value = 3.906e-06</code> ⇒ se rechaza $H_0$.</li><li><code>mean difference 19</code>: antes − después. IC $[14{,}33;\ 23{,}67]$ no contiene $0$.</li></ul>
<p class="ayuda">La slide 31 compara con $t_{0{,}05;10}=1{,}8125$ (valor de una cola) aunque la prueba es bilateral (el crítico bilateral sería $2{,}228$). La decisión es la misma. Ver «Diferencias entre fuentes».</p>`,
      errores: ["Usar Welch/pooled con datos pareados.", "Invertir el orden (antes − después vs. después − antes) y leer mal el signo."],
      memoriza: String.raw`<p>Pareadas: $d=\text{antes}-\text{después}$, $t=\bar d/(s_d/\sqrt n)$, $n-1$ gl. El orden fija el signo.</p>`,
      comprueba: {
        enunciado: "t.test(antes, despues, paired = TRUE) da «mean difference 19». ¿Qué significa?",
        opciones: ["El valor promedio de antes − después es 19", "Después es 19 unidades mayor que antes", "No hay diferencia", "19 es el p-valor"],
        correcta: 0,
        explicacion: "La diferencia se calcula antes − después; positiva ⇒ antes mayor."
      },
      verifica: [{ que: "t pareada", r: `antes <- c(135, 140, 152, 150, 140, 157, 153, 154, 141, 130, 136); despues <- c(110, 125, 132, 143, 120, 124, 137, 130, 128, 115, 115); cat(round(t.test(antes, despues, paired = TRUE)$statistic, 2))`, esperado: 9.06, tol: 0.005 }],
      fuente: [{ id: "C2", loc: "slides 30–31 y 34" }]
    }
  ],

  cuando: String.raw`<div class="tabla-scroll"><table class="tabla">
<thead><tr><th>Situación</th><th>Prueba</th><th>En R</th></tr></thead>
<tbody>
<tr><td>Comparar variabilidades</td><td>F, gl $(n_1-1,n_2-1)$</td><td><code>var.test(A, B)</code></td></tr>
<tr><td>Medias, independientes, varianzas distintas (o sin certeza)</td><td>Welch</td><td><code>t.test(A, B, var.equal = FALSE)</code></td></tr>
<tr><td>Medias, independientes, varianzas iguales</td><td>Pooled</td><td><code>t.test(A, B, var.equal = TRUE)</code></td></tr>
<tr><td>Mismos sujetos medidos dos veces</td><td>t sobre diferencias</td><td><code>t.test(A, B, paired = TRUE)</code></td></tr>
</tbody></table></div>`,

  errores: [
    { texto: "Con pareadas, el orden de las diferencias determina el signo de la conclusión.", fuente: [{ id: "C2", loc: "slide 34" }] }
  ]
});
