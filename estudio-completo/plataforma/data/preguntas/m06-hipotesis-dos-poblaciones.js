/* ============================================================================
   Preguntas · M06 Pruebas de hipótesis: dos poblaciones (P1)
   IDs ESTABLES: nunca se renumeran ni se reutilizan.
   ========================================================================== */
(function () {
  var MOD = "m06-hipotesis-dos-poblaciones";
  var DATOS_WELCH = `A <- c(14.2, 13.5, 15.1, 14.7, 13.9, 14.0, 15.4, 14.8, 13.8, 14.1, 15.0, 14.4)
B <- c(16.0, 15.7, 17.3, 16.5, 15.9, 17.1, 16.8, 16.2, 17.4, 15.8)
`;
  var DATOS_PAR = `antes   <- c(135, 140, 152, 150, 140, 157, 153, 154, 141, 130, 136)
despues <- c(110, 125, 132, 143, 120, 124, 137, 130, 128, 115, 115)
`;
  var DATOS_F = `A <- c(10.2, 11.0, 9.8, 10.7, 11.4, 10.9, 9.6, 12.2, 10.5, 11.3, 10.1, 11.6)
B <- c(9.9, 10.1, 10.4, 9.7, 10.3, 9.8, 10.0, 9.6, 10.2, 9.9)
`;

  PLATAFORMA.registrar("pregunta", [
    {
      id: "m06-q001", modulo: MOD, concepto: "m06-c01", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: "Se mide la presión arterial de los mismos 30 pacientes antes y después de un tratamiento. ¿Qué prueba corresponde para comparar las medias?",
      opciones: ["t pareada (paired = TRUE)", "t de Welch", "t pooled (var.equal = TRUE)", "Prueba F de varianzas"],
      correcta: 0,
      explicacion: "Las observaciones están emparejadas (mismo paciente). Se trabaja con las diferencias de cada par: t de una muestra sobre d = antes − después.",
      distractores: ["", "Welch y pooled suponen dos muestras independientes.", "Pooled también supone independencia (y varianzas iguales).", "La F compara varianzas, no medias."],
      fuente: [{ id: "C2", loc: "slides 21, 33" }]
    },
    {
      id: "m06-q002", modulo: MOD, concepto: "m06-c01", tipo: "alternativas", dificultad: 2, origen: "nueva",
      enunciado: "Dos muestras independientes, sin información sobre si las varianzas son iguales. ¿Qué prueba t recomienda la clase?",
      opciones: [
        "Welch (varianzas diferentes), salvo certeza o evidencia fuerte de varianzas iguales",
        "Pooled siempre",
        "Pareada",
        "Ninguna: hay que usar F primero obligatoriamente"
      ],
      correcta: 0,
      explicacion: "C2 s33: se usa la prueba de varianzas diferentes (Welch) a menos que se tenga certeza o fuerte evidencia de que son iguales.",
      fuente: [{ id: "C2", loc: "slide 33" }]
    },
    {
      id: "m06-q003", modulo: MOD, concepto: "m06-c02", tipo: "calculo", dificultad: 1, origen: "curso",
      enunciado: String.raw`C2 s23: Santiago ($n=23$, $s=120$ MM) y Concepción ($n=28$, $s=99{,}3$ MM). Calcula $F=s_1^2/s_2^2$.`,
      respuesta: 1.46, tolerancia: 0.01,
      explicacion: String.raw`$F=\dfrac{120^2}{99{,}3^2}=\dfrac{14\,400}{9\,860{,}5}=1{,}46$ con gl $(22,27)$. Los críticos bilaterales ($\alpha=5\,\%$) son $0{,}435$ y $2{,}222$; $1{,}46$ queda dentro ⇒ no se rechaza $H_0:\sigma_1^2=\sigma_2^2$.`,
      verifica: [{ que: "F", js: "120*120/(99.3*99.3)", esperado: 1.4604, tol: 0.0001 }],
      fuente: [{ id: "C2", loc: "slide 23" }]
    },
    {
      id: "m06-q004", modulo: MOD, concepto: "m06-c02", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "AY2-E", loc: "P4" }],
      enunciado: String.raw`Dos muestras de $n_1=10$ y $n_2=15$ tienen $s_1^2=25$ y $s_2^2=16$. Para $H_0:\sigma_1^2=\sigma_2^2$ contra $H_1:\sigma_1^2\neq\sigma_2^2$ ($\alpha=5\,\%$), ¿cuál es el <strong>valor crítico superior</strong> de la F?`,
      respuesta: 3.209, tolerancia: 0.005,
      explicacion: String.raw`$F_{obs}=25/16=1{,}5625$ con gl $(9,14)$. Críticos: $F_{0{,}975;9,14}=3{,}209$ y $F_{0{,}025;9,14}=0{,}263$. Como $0{,}263<1{,}5625<3{,}209$, no se rechaza $H_0$. En R: <code>qf(0.975, 9, 14)</code>.`,
      verifica: [
        { que: "F obs", js: "25/16", esperado: 1.5625, tol: 1e-9 },
        { que: "crítico superior", r: `cat(round(qf(0.975, 9, 14), 3))`, esperado: 3.209, tol: 0.0005 },
        { que: "crítico inferior", r: `cat(round(qf(0.025, 9, 14), 3))`, esperado: 0.263, tol: 0.0005 }
      ],
      fuente: [{ id: "C2", loc: "slides 22–25" }]
    },
    {
      id: "m06-q005", modulo: MOD, concepto: "m06-c02", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Se compararon las varianzas de dos grupos (A: 12 datos, B: 10 datos) con H₁: σ²_A > σ²_B y α = 0,05. ¿Qué se concluye?",
      codigoR: `var.test(A, B, alternative = "greater")`,
      salidaR: `
	F test to compare two variances

data:  A and B
F = 8.9241, num df = 11, denom df = 9, p-value = 0.001388
alternative hypothesis: true ratio of variances is greater than 1
95 percent confidence interval:
 2.876434      Inf
sample estimates:
ratio of variances 
          8.924093 
`,
      salidaDe: DATOS_F + `var.test(A, B, alternative = "greater")`,
      opciones: [
        "Se rechaza H₀: hay evidencia de que A tiene mayor varianza que B",
        "No se rechaza H₀: las varianzas son iguales",
        "Se rechaza H₀: B tiene mayor varianza",
        "No se puede concluir porque el IC llega hasta infinito"
      ],
      correcta: 0,
      explicacion: "p = 0,001388 < 0,05 ⇒ se rechaza H₀. El cociente estimado es 8,92 (A casi 9 veces más variable) y el IC [2,88; ∞) no contiene al 1. Los gl (11, 9) indican n_A = 12 y n_B = 10.",
      distractores: ["", "El p-valor es muy pequeño: se rechaza.", "La alternativa y el cociente > 1 indican que A es la más variable.", "Un IC unilateral con límite infinito es normal."],
      fuente: [{ id: "C2", loc: "slide 25" }]
    },
    {
      id: "m06-q006", modulo: MOD, concepto: "m06-c02", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`Ayudantía 2, P4: dos máquinas con $n=10$ cada una y varianzas muestrales $s_A^2=2{,}233$ y $s_B^2=1{,}067$. Calcula el p-valor de la prueba F con $H_1:\sigma_A^2>\sigma_B^2$.`,
      respuesta: 0.143, tolerancia: 0.003,
      explicacion: String.raw`$F=2{,}233/1{,}067=2{,}094$ con gl $(9,9)$. p-valor $=P(F_{9,9}>2{,}094)=0{,}143>0{,}05$ ⇒ no se rechaza: no hay evidencia de que A sea más variable que B (el crítico es $F_{0{,}95;9,9}=3{,}179$).`,
      verifica: [
        { que: "p-valor", r: `cat(round(pf(2.094, 9, 9, lower.tail = FALSE), 3))`, esperado: 0.143, tol: 0.0006 },
        { que: "crítico", r: `cat(round(qf(0.95, 9, 9), 3))`, esperado: 3.179, tol: 0.0005 }
      ],
      fuente: [{ id: "AY2-E", loc: "P4" }]
    },
    {
      id: "m06-q007", modulo: MOD, concepto: "m06-c02", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "En una prueba F unilateral derecha (H₁: σ₁² > σ₂²), se debe poner la varianza mayor en el numerador, y por tanto el cociente observado siempre es ≥ 1.",
      correcta: false,
      explicacion: "Falso. En la unilateral derecha se calcula F = s₁²/s₂² con el grupo 1 en el numerador, que es el grupo cuya varianza se sospecha MAYOR (según H₁); el cociente observado puede ser menor que 1, y entonces simplemente no se rechaza H₀. Lo que no se puede es invertir el orden después de ver los datos.",
      fuente: [{ id: "C2", loc: "slide 25" }]
    },
    {
      id: "m06-q008", modulo: MOD, concepto: "m06-c03", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`C2 s26: precio del limón en enero ($\bar x_1=1938$, $s_1=230$, $n_1=13$) y abril ($\bar x_2=3560$, $s_2=445$, $n_2=15$). Para $H_0:\mu_2-\mu_1\le1500$, calcula el estadístico $t$ de Welch.`,
      respuesta: 0.928, tolerancia: 0.005,
      explicacion: String.raw`$t=\dfrac{(3560-1938)-1500}{\sqrt{230^2/13+445^2/15}}=\dfrac{122}{131{,}4}=0{,}928$, con $21{,}57\approx22$ gl. $0{,}928<t_{0{,}05;22}=1{,}72$ ⇒ no se rechaza $H_0$ (p-valor $=0{,}182$).`,
      verifica: [{ que: "t", js: "(3560-1938-1500)/Math.sqrt(230*230/13+445*445/15)", esperado: 0.9283, tol: 0.0001 }],
      fuente: [{ id: "C2", loc: "slides 26–27" }]
    },
    {
      id: "m06-q009", modulo: MOD, concepto: "m06-c03", tipo: "calculo", dificultad: 3, origen: "variacion",
      base: [{ id: "C2", loc: "slide 27" }],
      enunciado: String.raw`Dos muestras: $n_1=25$, $s_1=4$ y $n_2=30$, $s_2=6$. Calcula los grados de libertad de Welch (redondea a un decimal).`,
      respuesta: 50.7, tolerancia: 0.1,
      explicacion: String.raw`$v_1=s_1^2/n_1=0{,}64$ y $v_2=s_2^2/n_2=1{,}2$. $\text{gl}=\dfrac{(v_1+v_2)^2}{\frac{v_1^2}{n_1-1}+\frac{v_2^2}{n_2-1}}=\dfrac{3{,}385}{0{,}01707+0{,}04966}=50{,}74$. No es entero: R usa el valor exacto.`,
      verifica: [{ que: "gl Welch", js: "Math.pow(16/25+36/30,2)/(Math.pow(16/25,2)/24+Math.pow(36/30,2)/29)", esperado: 50.742, tol: 0.005 }],
      fuente: [{ id: "C2", loc: "slides 26–27" }]
    },
    {
      id: "m06-q010", modulo: MOD, concepto: "m06-c03", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Se comparan dos grupos (A: 12 datos, B: 10 datos) con H₁: μ_A < μ_B y α = 0,05, sin suponer varianzas iguales. ¿Qué se concluye?",
      codigoR: `t.test(A, B, alternative = "less", var.equal = FALSE)`,
      salidaR: `
	Welch Two Sample t-test

data:  A and B
t = -7.7812, df = 18.553, p-value = 1.481e-07
alternative hypothesis: true difference in means is less than 0
95 percent confidence interval:
      -Inf -1.602957
sample estimates:
mean of x mean of y 
 14.40833  16.47000 
`,
      salidaDe: DATOS_WELCH + `t.test(A, B, alternative = "less", var.equal = FALSE)`,
      opciones: [
        "Se rechaza H₀: hay evidencia de que la media de A es menor que la de B",
        "No se rechaza H₀: las medias son iguales",
        "Se rechaza H₀: la media de A es mayor que la de B",
        "No se puede concluir: los gl de Welch no son enteros"
      ],
      correcta: 0,
      explicacion: "p ≈ 1,5·10⁻⁷ < 0,05 ⇒ se rechaza H₀. El IC (−∞; −1,60] no contiene 0, y las medias muestrales (14,41 < 16,47) van en el sentido de H₁. Los gl no enteros (18,553) son normales en Welch.",
      distractores: ["", "El p-valor es diminuto.", "H₁ y las medias apuntan a lo contrario.", "R usa el gl exacto sin redondear."],
      fuente: [{ id: "C2", loc: "slides 32" }]
    },
    {
      id: "m06-q011", modulo: MOD, concepto: "m06-c03", tipo: "completar-R", dificultad: 1, origen: "curso",
      enunciado: "Completa el código para comparar las medias de A y B suponiendo varianzas distintas (Welch) y bilateral.",
      codigoR: `t.test(A, B, alternative = "___", var.equal = ___)`,
      huecos: [["two.sided"], ["FALSE", "F"]],
      explicacion: String.raw`Welch ⇒ <code>var.equal = FALSE</code>. Para $H_1:\mu_A\ne\mu_B$ la alternativa es <code>"two.sided"</code>.`,
      fuente: [{ id: "C2", loc: "slides 26, 32" }]
    },
    {
      id: "m06-q012", modulo: MOD, concepto: "m06-c04", tipo: "calculo", dificultad: 2, origen: "curso",
      enunciado: String.raw`C2 s28: enero ($s_1=140$, $n_1=18$) y abril ($s_2=170$, $n_2=10$). Calcula la varianza combinada $S_p^2$.`,
      respuesta: 22819.23, tolerancia: 0.5,
      explicacion: String.raw`$S_p^2=\dfrac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}=\dfrac{17\cdot19\,600+9\cdot28\,900}{26}=22\,819{,}2$, con $26$ gl.`,
      verifica: [{ que: "Sp²", js: "(17*140*140+9*170*170)/26", esperado: 22819.23, tol: 0.01 }],
      fuente: [{ id: "C2", loc: "slides 28–29" }]
    },
    {
      id: "m06-q013", modulo: MOD, concepto: "m06-c04", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C2", loc: "slides 28–29" }],
      enunciado: String.raw`Dos grupos con varianzas iguales: $n_1=9$, $\bar x_1=17$, $s_1^2=4$ y $n_2=11$, $\bar x_2=20$, $s_2^2=9$. Para $H_0:\mu_2-\mu_1=0$, calcula el estadístico $t$ pooled.`,
      respuesta: 2.564, tolerancia: 0.005,
      explicacion: String.raw`$S_p^2=\dfrac{8\cdot4+10\cdot9}{18}=6{,}778$. $t=\dfrac{20-17}{\sqrt{6{,}778\,(1/9+1/11)}}=\dfrac{3}{1{,}170}=2{,}564$ con $18$ gl. El crítico bilateral ($\alpha=5\,\%$) es $2{,}101$ ⇒ se rechaza $H_0$.`,
      verifica: [
        { que: "t pooled", r: `sp <- (8*4 + 10*9)/18; cat(round((20-17)/sqrt(sp*(1/9+1/11)), 3))`, esperado: 2.564, tol: 0.0005 },
        { que: "crítico", r: `cat(round(qt(0.975, 18), 3))`, esperado: 2.101, tol: 0.0005 }
      ],
      fuente: [{ id: "C2", loc: "slides 28–29" }]
    },
    {
      id: "m06-q014", modulo: MOD, concepto: "m06-c04", tipo: "alternativas", dificultad: 1, origen: "nueva",
      enunciado: "En una prueba t pooled con n₁ = 18 y n₂ = 10, ¿cuántos grados de libertad tiene?",
      opciones: ["26", "28", "17", "9"],
      correcta: 0,
      explicacion: "gl = n₁ + n₂ − 2 = 18 + 10 − 2 = 26.",
      fuente: [{ id: "C2", loc: "slide 28" }]
    },
    {
      id: "m06-q015", modulo: MOD, concepto: "m06-c04", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "La prueba pooled y la de Welch siempre llevan a la misma decisión; la diferencia está solo en los cálculos.",
      correcta: false,
      explicacion: "Falso. Pooled usa una varianza combinada y n₁ + n₂ − 2 gl; Welch usa varianzas separadas y gl ajustados (menores). Pueden dar p-valores distintos y, en casos límite, decisiones distintas, sobre todo con tamaños muestrales y varianzas muy diferentes. Por eso la regla es usar Welch salvo certeza de varianzas iguales.",
      fuente: [{ id: "C2", loc: "slides 28, 33" }]
    },
    {
      id: "m06-q016", modulo: MOD, concepto: "m06-c05", tipo: "calculo", dificultad: 2, origen: "variacion",
      base: [{ id: "C2", loc: "slides 30–31" }],
      enunciado: String.raw`Para $n=8$ pares se calcularon las diferencias $d=(3,5,2,6,4,4,5,3)$. Calcula el estadístico $t=\bar d/(s_d/\sqrt n)$.`,
      respuesta: 8.641, tolerancia: 0.01,
      explicacion: String.raw`$\bar d=4$, $s_d=1{,}309$. $t=\dfrac{4}{1{,}309/\sqrt8}=8{,}641$ con $7$ gl (crítico bilateral $2{,}365$) ⇒ se rechaza $H_0:\mu_d=0$.`,
      verifica: [
        { que: "t", r: `d <- c(3,5,2,6,4,4,5,3); cat(round(mean(d)/(sd(d)/sqrt(8)), 3))`, esperado: 8.641, tol: 0.0005 },
        { que: "crítico", r: `cat(round(qt(0.975, 7), 3))`, esperado: 2.365, tol: 0.0005 }
      ],
      fuente: [{ id: "C2", loc: "slides 30–31" }]
    },
    {
      id: "m06-q017", modulo: MOD, concepto: "m06-c05", tipo: "interpretacion-R", dificultad: 2, origen: "curso",
      enunciado: "Se midió el colesterol de 11 pacientes antes y después de un medicamento. ¿Qué se concluye con α = 0,05?",
      codigoR: `t.test(antes, despues, paired = TRUE, alternative = "two.sided", conf.level = 0.95)`,
      salidaR: `
	Paired t-test

data:  antes and despues
t = 9.0579, df = 10, p-value = 3.906e-06
alternative hypothesis: true mean difference is not equal to 0
95 percent confidence interval:
 14.32622 23.67378
sample estimates:
mean difference 
             19 
`,
      salidaDe: DATOS_PAR + `t.test(antes, despues, paired = TRUE, alternative = "two.sided", conf.level = 0.95)`,
      opciones: [
        "Se rechaza H₀: el colesterol bajó en promedio unos 19 puntos (antes − después > 0)",
        "No se rechaza H₀: no hay cambio",
        "Se rechaza H₀: el colesterol subió 19 puntos",
        "El test no sirve: había 10 pacientes, no 11"
      ],
      correcta: 0,
      explicacion: "p ≈ 4·10⁻⁶ < 0,05 y el IC [14,3; 23,7] no contiene 0. La diferencia se calcula antes − después; es positiva ⇒ antes > después, o sea el colesterol disminuyó. df = 10 corresponde a 11 pares (n − 1).",
      distractores: ["", "El p-valor es muy pequeño.", "El orden es antes − después: positivo significa que bajó.", "df = n − 1 = 10 ⇒ n = 11."],
      fuente: [{ id: "C2", loc: "slides 30–31, 34" }]
    },
    {
      id: "m06-q018", modulo: MOD, concepto: "m06-c05", tipo: "vf", dificultad: 2, origen: "nueva",
      enunciado: "t.test(antes, despues, paired = TRUE) es equivalente a t.test(antes - despues, mu = 0).",
      correcta: true,
      explicacion: "Verdadero. La prueba pareada es una prueba t de una muestra sobre las diferencias d = antes − después contra μ_d = 0. Por eso el orden de las variables solo cambia el signo de t, no la decisión bilateral.",
      verifica: [{ que: "mismos t", r: `antes <- c(135, 140, 152, 150, 140, 157, 153, 154, 141, 130, 136); despues <- c(110, 125, 132, 143, 120, 124, 137, 130, 128, 115, 115); cat(round(t.test(antes - despues, mu = 0)$statistic - t.test(antes, despues, paired = TRUE)$statistic, 10))`, esperado: 0, tol: 1e-9 }],
      fuente: [{ id: "C2", loc: "slide 34" }]
    },
    {
      id: "m06-q019", modulo: MOD, concepto: "m06-c05", tipo: "codigo-R", dificultad: 2, origen: "nueva",
      enunciado: "Un analista compara las notas de los mismos 20 estudiantes en dos controles (control1, control2). ¿Qué problema tiene este código?",
      codigoR: `t.test(control1, control2, var.equal = TRUE)`,
      opciones: [
        "Trata las notas como dos muestras independientes; falta paired = TRUE porque son los mismos estudiantes",
        "Falta indicar mu = 0",
        "var.equal debería ser FALSE siempre",
        "No hay problema: pooled es la prueba correcta para dos controles"
      ],
      correcta: 0,
      explicacion: "Los datos son dependientes (cada estudiante aparece en ambos controles). Ignorar el emparejamiento pierde información y viola el supuesto de independencia: corresponde paired = TRUE.",
      fuente: [{ id: "C2", loc: "slides 30, 33" }]
    }
  ]);
})();
