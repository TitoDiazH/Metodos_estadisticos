/* Generadores de desarrollo · M01–M04 (P1) */
"use strict";
const L = require("./lib");
const { Rn, Rv, rd, N, M, pct, suma, media, varianza, desv, cov, euclid, manhattan, afirmar, tabla, pm, incisos, p, rvec, rmat, vjs, vr, agregar } = L;

/* ══ M01 · Covarianza, correlación y test de ρ ═════════════════════════ */
function covCor(o) {
  const { x, y, nx, ny, alfa } = o, n = x.length;
  const mx = media(x), my = media(y);
  const dx = x.map((v) => v - mx), dy = y.map((v) => v - my);
  const pr = dx.map((v, i) => v * dy[i]);
  const sxy = suma(pr) / (n - 1), sx2 = varianza(x), sy2 = varianza(y);
  const r = sxy / Math.sqrt(sx2 * sy2);
  const t = r * Math.sqrt((n - 2) / (1 - r * r)), gl = n - 2;
  const tc = Rn(`qt(${1 - alfa / 2}, ${gl})`), pv = Rn(`2 * (1 - pt(${Math.abs(t)}, ${gl}))`);
  const rech = Math.abs(t) > tc;
  afirmar(Math.abs(Math.abs(t) - tc) > 0.05, "t demasiado cerca del crítico");
  const fuerza = Math.abs(r) >= 0.7 ? "fuerte" : Math.abs(r) >= 0.4 ? "moderada" : "débil";
  const sentido = r > 0 ? "positiva (cuando una sube, la otra tiende a subir)" : "negativa (cuando una sube, la otra tiende a bajar)";
  agregar("m01", {
    concepto: "m01-c02", dificultad: 2, titulo: o.titulo,
    enunciado: p(o.intro) + tabla(["", ...x.map((_, i) => i + 1)], [[nx, ...x.map((v) => M(v))], [ny, ...y.map((v) => M(v))]]) +
      incisos(["Calcula las medias y la covarianza muestral.", "Calcula las varianzas y el coeficiente de correlación $r$. Interprétalo.", String.raw`Con $\alpha=${pct(alfa)}$, contrasta $H_0:\rho=0$ contra $H_1:\rho\neq0$.`]),
    partes: [
      { titulo: "a) Medias y tabla de desviaciones", puntos: 1.5,
        solucion: p(String.raw`$\bar x=${N(mx, 3)}$ y $\bar y=${N(my, 3)}$.`) +
          tabla(["$x_i-\\bar x$", "$y_i-\\bar y$", "producto"], x.map((_, i) => [M(dx[i], 3), M(dy[i], 3), M(pr[i], 3)])) +
          p(String.raw`Suma de productos: $${N(suma(pr), 3)}$.`) },
      { titulo: "a) Covarianza muestral", puntos: 1,
        solucion: p(String.raw`$s_{xy}=\dfrac{1}{n-1}\sum(x_i-\bar x)(y_i-\bar y)=\dfrac{${N(suma(pr), 3)}}{${n - 1}}=${N(sxy, 4)}$.`, `Se divide por $n-1=${n - 1}$, no por $n$. El signo ${sxy > 0 ? "positivo" : "negativo"} indica la dirección; la magnitud depende de las unidades.`) },
      { titulo: "b) Varianzas y coeficiente r, con interpretación", puntos: 1.5,
        solucion: p(String.raw`$s_x^2=\dfrac{\sum(x_i-\bar x)^2}{n-1}=${N(sx2, 4)}$ y $s_y^2=${N(sy2, 4)}$.`,
          String.raw`$r=\dfrac{s_{xy}}{\sqrt{s_x^2\,s_y^2}}=\dfrac{${N(sxy, 4)}}{\sqrt{${N(sx2, 4)}\cdot${N(sy2, 4)}}}=${N(r, 4)}$.`,
          `Relación lineal ${fuerza} y ${sentido}. $r$ no tiene unidades y no prueba causalidad.`) },
      { titulo: "c) Estadístico t, valor crítico y decisión", puntos: 2,
        solucion: p(String.raw`$t=r\sqrt{\dfrac{n-2}{1-r^2}}=${N(r, 4)}\sqrt{\dfrac{${gl}}{1-${N(r * r, 4)}}}=${N(t, 3)}$ con $n-2=${gl}$ gl.`,
          String.raw`Crítico bilateral: $t_{${N(1 - alfa / 2, 3)};${gl}}=${N(tc, 3)}$. Como $|${N(t, 3)}|${rech ? ">" : "<"}${N(tc, 3)}$ (p-valor $=${N(pv, 4)}$), ${rech ? "se <strong>rechaza</strong> $H_0$" : "<strong>no se rechaza</strong> $H_0$"}.`,
          rech ? o.siRechaza : o.siNoRechaza, `En R: <code>cor.test(x, y)</code> entrega este mismo $t$, los gl y el p-valor.`) }
    ],
    verifica: [
      vjs("covarianza", `cov(${JSON.stringify(x)}, ${JSON.stringify(y)})`, sxy, 4),
      vjs("r", `cor(${JSON.stringify(x)}, ${JSON.stringify(y)})`, r, 4),
      vr("t de cor.test", `cor.test(${rvec(x)}, ${rvec(y)})$statistic`, t, 3),
      vr("p-valor de cor.test", `cor.test(${rvec(x)}, ${rvec(y)})$p.value`, pv, 4),
      vr("t crítico", `qt(${1 - alfa / 2}, ${gl})`, tc, 3)
    ],
    fuente: [{ id: "C1", loc: "slides 9–19" }]
  });
}
function m01() {
  covCor({ titulo: "Horas de estudio y nota: covarianza, r y test (a mano)",
    intro: "Se registran las horas de estudio semanales ($x$) y la nota final ($y$) de 5 estudiantes:", nx: "Horas ($x$)", ny: "Nota ($y$)",
    x: [2, 4, 5, 7, 9], y: [3.5, 4.2, 5.0, 5.8, 6.5], alfa: 0.05,
    siRechaza: "Hay evidencia de correlación lineal entre las horas de estudio y la nota.", siNoRechaza: "No hay evidencia de correlación lineal entre horas y nota." });
  covCor({ titulo: "Precio y unidades vendidas: correlación negativa",
    intro: "Una tienda prueba 6 precios (en miles de pesos, $x$) y anota las unidades vendidas en la semana ($y$):", nx: "Precio ($x$)", ny: "Unidades ($y$)",
    x: [10, 12, 14, 16, 18, 20], y: [48, 45, 40, 41, 33, 30], alfa: 0.05,
    siRechaza: "Hay evidencia de que el precio y las unidades vendidas están correlacionados linealmente (a mayor precio, menos ventas).", siNoRechaza: "No hay evidencia de correlación lineal entre precio y ventas." });
  covCor({ titulo: "Antigüedad y errores: ¿es significativa una correlación débil?",
    intro: "Para 6 operarios se registran los años de antigüedad ($x$) y el número de errores del mes ($y$):", nx: "Antigüedad ($x$)", ny: "Errores ($y$)",
    x: [1, 2, 3, 4, 5, 6], y: [5, 3, 6, 2, 7, 4], alfa: 0.05,
    siRechaza: "Hay evidencia de correlación lineal entre antigüedad y errores.", siNoRechaza: "Con estos datos no hay evidencia de correlación lineal entre antigüedad y errores: un $r$ distinto de cero en la muestra no basta, y menos con $n=6$." });
  covCor({ titulo: "Publicidad y ventas con α = 1 %",
    intro: "Una empresa registra durante 7 meses el gasto en publicidad (millones, $x$) y las ventas (millones, $y$):", nx: "Publicidad ($x$)", ny: "Ventas ($y$)",
    x: [1, 2, 3, 4, 5, 6, 7], y: [12, 15, 14, 19, 21, 20, 26], alfa: 0.01,
    siRechaza: "Al $1\\,\\%$ hay evidencia de correlación lineal entre publicidad y ventas.", siNoRechaza: "Al $1\\,\\%$ no hay evidencia de correlación lineal entre publicidad y ventas." });
}

/* ══ M02 · Matrices de covarianza/correlación y Bartlett ════════════════ */
function covACor(o) {
  const { S, nombres } = o;
  const ev = Rv(`eigen(${rmat(S)})$values`);
  afirmar(ev.every((v) => v > 0), "S no es definida positiva");
  const r = (i, j) => S[i][j] / Math.sqrt(S[i][i] * S[j][j]);
  const pares = [[0, 1], [0, 2], [1, 2]];
  const fuerte = pares.slice().sort((a, b) => Math.abs(r(...b)) - Math.abs(r(...a)))[0];
  agregar("m02", {
    concepto: "m02-c03", dificultad: 2, titulo: o.titulo,
    enunciado: p(`${o.intro} La matriz de covarianza muestral de ${nombres.map((v, i) => `$X_${i + 1}$ = ${v}`).join(", ")} es`, String.raw`$$S=${pm(S)}$$`) +
      incisos(["Indica la varianza y la desviación estándar de cada variable y verifica que $S$ tiene la forma de una matriz de covarianza.", "Calcula las tres correlaciones y escribe la matriz $R$.", "¿Qué par de variables está más relacionado linealmente? ¿Cambiaría $R$ si una variable se midiera en otra unidad?"]),
    partes: [
      { titulo: "a) Varianzas, desviaciones y forma de S", puntos: 1.5,
        solucion: p(`Las varianzas están en la diagonal: ${S.map((f, i) => String.raw`$s_{${i + 1}${i + 1}}=${N(f[i])}$ ⇒ $s_${i + 1}=${N(Math.sqrt(f[i]), 3)}$`).join("; ")}.`,
          `$S$ es simétrica ($s_{ij}=s_{ji}$) y su diagonal es no negativa. Además debe ser semidefinida positiva: sus valores propios son ${ev.map((v) => M(v, 3)).join("; ")}, todos $\\ge0$ (<code>eigen(S)</code>).`) },
      { titulo: "b) Las tres correlaciones", puntos: 2.5,
        solucion: p(String.raw`$r_{ij}=\dfrac{s_{ij}}{\sqrt{s_{ii}\,s_{jj}}}$:`) +
          p(...pares.map(([i, j]) => String.raw`$r_{${i + 1}${j + 1}}=\dfrac{${N(S[i][j])}}{\sqrt{${N(S[i][i])}\cdot${N(S[j][j])}}}=${N(r(i, j), 4)}$`)) },
      { titulo: "b) Matriz de correlación R", puntos: 0.5,
        solucion: p(String.raw`$$R=${pm([[1, r(0, 1), r(0, 2)], [r(0, 1), 1, r(1, 2)], [r(0, 2), r(1, 2), 1]], 3)}$$`, "Diagonal de unos y simétrica. En R: <code>cov2cor(S)</code>.") },
      { titulo: "c) Par más relacionado y efecto de las unidades", puntos: 1.5,
        solucion: p(`El par con $|r|$ mayor es ${nombres[fuerte[0]]} – ${nombres[fuerte[1]]} ($r=${N(r(...fuerte), 3)}$, relación ${r(...fuerte) > 0 ? "directa" : "inversa"}). No se decide mirando la covarianza más grande: las covarianzas dependen de las unidades.`,
          "$R$ <strong>no cambia</strong> con un cambio de unidades (la correlación es adimensional); $S$ sí cambia.") }
    ],
    verifica: pares.map(([i, j]) => vr(`r${i + 1}${j + 1}`, `cov2cor(${rmat(S)})[${i + 1}, ${j + 1}]`, r(i, j), 4)),
    fuente: [{ id: "C1", loc: "slides 22–26" }]
  });
}
function bartlett(o) {
  const { n, alfa } = o;
  let pv, detR, pasoDet, Rm = null;
  if (o.r) {
    const [a, b, c] = o.r; pv = 3;
    Rm = [[1, a, b], [a, 1, c], [b, c, 1]];
    detR = 1 + 2 * a * b * c - a * a - b * b - c * c;
    afirmar(detR > 0, "|R| ≤ 0");
    pasoDet = String.raw`Para $p=3$: $|R|=1+2r_{12}r_{13}r_{23}-r_{12}^2-r_{13}^2-r_{23}^2=1+2(${N(a)})(${N(b)})(${N(c)})-${N(a * a, 4)}-${N(b * b, 4)}-${N(c * c, 4)}=${N(detR, 4)}$.`;
  } else { pv = o.p; detR = o.detR; pasoDet = String.raw`El determinante viene dado: $|R|=${N(detR, 4)}$ (si fuera $1$, $R$ sería la identidad; cuanto más cerca de $0$, más correlación).`; }
  const k = n - 1 - (2 * pv + 5) / 6, chi = -k * Math.log(detR), gl = pv * (pv - 1) / 2;
  const crit = Rn(`qchisq(${1 - alfa}, ${gl})`), pval = Rn(`1 - pchisq(${chi}, ${gl})`);
  const rech = chi > crit;
  agregar("m02", {
    concepto: "m02-c04", dificultad: o.r ? 3 : 2, titulo: o.titulo,
    enunciado: p(o.intro + (Rm ? String.raw` $$R=${pm(Rm)}$$` : "")) +
      incisos(["Plantea las hipótesis del test de esfericidad de Bartlett" + (Rm ? " y calcula $|R|$." : "."), "Calcula el estadístico y sus grados de libertad.", String.raw`Con $\alpha=${pct(alfa)}$, decide y concluye: ¿tiene sentido aplicar PCA o análisis factorial?`]),
    partes: [
      { titulo: "a) Hipótesis" + (Rm ? " y determinante" : ""), puntos: 1.5,
        solucion: p("$H_0:R=I$ (las variables no están correlacionadas) contra $H_1:R\\neq I$ (hay correlaciones).", pasoDet) },
      { titulo: "b) Estadístico de Bartlett y grados de libertad", puntos: 2.5,
        solucion: p(String.raw`$\chi^2_B=-\left(n-1-\dfrac{2p+5}{6}\right)\ln|R|=-\left(${n}-1-\dfrac{${2 * pv + 5}}{6}\right)\ln(${N(detR, 4)})$.`,
          String.raw`$=-(${N(k, 4)})\cdot(${N(Math.log(detR), 4)})=${N(chi, 2)}$.`, String.raw`gl $=\dfrac{p(p-1)}{2}=\dfrac{${pv}\cdot${pv - 1}}{2}=${gl}$.`) },
      { titulo: "c) Valor crítico, decisión y conclusión", puntos: 2,
        solucion: p(String.raw`Crítico: $\chi^2_{${N(1 - alfa)};${gl}}=${N(crit, 3)}$ (<code>qchisq(${1 - alfa}, ${gl})</code>). $${N(chi, 2)}${rech ? ">" : "<"}${N(crit, 3)}$ (p-valor $=${pval < 0.0001 ? "<0{,}0001" : N(pval, 4)}$) ⇒ ${rech ? "se <strong>rechaza</strong> $H_0$" : "<strong>no se rechaza</strong> $H_0$"}.`,
          rech ? "La matriz de correlación no es la identidad: hay correlaciones entre las variables, así que PCA o análisis factorial <strong>tienen sentido</strong>." : "No hay evidencia de correlación global entre las variables: reducir dimensión con PCA o análisis factorial <strong>no se justifica</strong> (cada variable aporta información propia).",
          "El test supone normalidad multivariante.") }
    ],
    verifica: [
      Rm ? vr("χ² (psych)", `psych::cortest.bartlett(${rmat(Rm)}, n = ${n})$chisq`, chi, 2) : vjs("χ²", `-(${n} - 1 - (2*${pv} + 5)/6) * Math.log(${detR})`, chi, 2),
      vr("crítico", `qchisq(${1 - alfa}, ${gl})`, crit, 3)
    ].concat(Rm ? [vr("|R|", `det(${rmat(Rm)})`, detR, 4)] : []),
    fuente: [{ id: "C1", loc: "slides 27–31" }, { id: "C4.1", loc: "slide 18" }]
  });
}
function esCorrelacion() {
  const C = [[1, 0.9, -0.9], [0.9, 1, 0.9], [-0.9, 0.9, 1]];
  const detC = 1 + 2 * 0.9 * -0.9 * 0.9 - 3 * 0.81;
  const evC = Rv(`eigen(${rmat(C)})$values`);
  agregar("m02", {
    concepto: "m02-c03", dificultad: 2, origen: "nueva", titulo: "¿Puede ser una matriz de correlación?",
    enunciado: p("Indica, justificando, si cada matriz puede ser una matriz de correlación:", String.raw`$$A=${pm([[1, 0.5], [0.5, 1]])}\qquad B=${pm([[1, 1.2], [1.2, 1]])}\qquad C=${pm(C)}$$`),
    partes: [
      { titulo: "Las tres condiciones que hay que revisar", puntos: 1.5,
        solucion: p("Una matriz de correlación debe: (1) ser simétrica con <strong>unos en la diagonal</strong>; (2) tener todos sus elementos <strong>entre $-1$ y $1$</strong>; (3) ser <strong>semidefinida positiva</strong> (valores propios $\\ge0$; en $2\\times2$ equivale a determinante $\\ge0$).") },
      { titulo: "Matriz A", puntos: 1, solucion: p("Diagonal de unos, $|0{,}5|\\le1$ y $|A|=1-0{,}25=0{,}75\\ge0$ ⇒ <strong>sí</strong> puede serlo.") },
      { titulo: "Matriz B", puntos: 1.5, solucion: p("Tiene un elemento $1{,}2>1$: una correlación no puede superar $1$ ⇒ <strong>no</strong> puede serlo. (Además $|B|=1-1{,}44=-0{,}44<0$.)") },
      { titulo: "Matriz C", puntos: 2,
        solucion: p(String.raw`Cumple (1) y (2), pero $|C|=1+2(0{,}9)(-0{,}9)(0{,}9)-3(0{,}81)=${N(detC, 3)}<0$: tiene un valor propio negativo (${evC.map((v) => M(v, 2)).join("; ")}) ⇒ no es semidefinida positiva ⇒ <strong>no</strong> puede serlo.`,
          "Intuición: si $X_1$ se correlaciona $0{,}9$ con $X_2$ y $X_2$ $0{,}9$ con $X_3$, no es posible que $X_1$ y $X_3$ tengan correlación $-0{,}9$.") }
    ],
    verifica: [vr("|C|", `det(${rmat(C)})`, detC, 3), vr("menor valor propio de C", `min(eigen(${rmat(C)})$values)`, Math.min(...evC), 2)],
    fuente: [{ id: "C1", loc: "slides 22–26" }, { id: "PR-P1-Q1", loc: "afirmación 1" }]
  });
}
function m02() {
  covACor({ titulo: "De la matriz de covarianza a la de correlación", intro: "En una muestra de clientes se midieron tres variables.", nombres: ["ingreso", "gasto", "antigüedad"], S: [[4, 3, -1], [3, 9, 2], [-1, 2, 16]] });
  covACor({ titulo: "Correlaciones a partir de S (tres indicadores de producción)", intro: "En una planta se registran tres indicadores diarios.", nombres: ["producción", "consumo de energía", "piezas defectuosas"], S: [[25, 12, 8], [12, 16, -3], [8, -3, 9]] });
  bartlett({ titulo: "Test de Bartlett a mano con p = 3", intro: "Con $n=50$ observaciones de tres variables se obtuvo la matriz de correlación", n: 50, r: [0.6, 0.5, 0.4], alfa: 0.05 });
  bartlett({ titulo: "Bartlett con correlaciones bajas: ¿conviene un PCA?", intro: "Con $n=20$ observaciones de tres variables se obtuvo la matriz de correlación", n: 20, r: [0.1, 0.15, -0.05], alfa: 0.05 });
  bartlett({ titulo: "Bartlett con el determinante dado (p = 4)", intro: "Se quiere aplicar un análisis factorial a $p=4$ variables medidas en $n=100$ personas. El determinante de la matriz de correlación es $|R|=0{,}35$.", n: 100, p: 4, detR: 0.35, alfa: 0.05 });
  bartlett({ titulo: "Bartlett con p = 6 y α = 1 %", intro: "Una encuesta de $p=6$ ítems se aplicó a $n=40$ personas; el determinante de la matriz de correlación es $|R|=0{,}62$.", n: 40, p: 6, detR: 0.62, alfa: 0.01 });
  esCorrelacion();
}

/* ══ M03 · Normal multivariada: suma de dos variables ══════════════════ */
function sumaNormal(o) {
  const { mu, S, c, mayor } = o;
  const EY = mu[0] + mu[1], VY = S[0][0] + S[1][1] + 2 * S[0][1], sd = Math.sqrt(VY), z = (c - EY) / sd;
  const phi = Rn(`pnorm(${z})`), prob = mayor ? 1 - phi : phi, rho = S[0][1] / Math.sqrt(S[0][0] * S[1][1]);
  afirmar(det2ok(S), "Σ no es definida positiva");
  agregar("m03", {
    concepto: "m03-c03", dificultad: 2, titulo: o.titulo,
    enunciado: p(String.raw`${o.intro} Suponga que $(X_1,X_2)$ sigue una normal bivariada con $$\mu=${pm([[mu[0]], [mu[1]]])},\qquad \Sigma=${pm(S)}.$$ Sea $Y=X_1+X_2$ (${o.queEsY}).`) +
      incisos(["Calcula la correlación $\\rho$ entre $X_1$ y $X_2$ y $E(Y)$.", "Calcula $\\operatorname{Var}(Y)$ y $\\sigma_Y$.", String.raw`Calcula $P(Y${mayor ? ">" : "\\le"}${N(c)})$.`]),
    partes: [
      { titulo: "a) Correlación y media de Y", puntos: 2,
        solucion: p(String.raw`$\rho=\dfrac{\sigma_{12}}{\sigma_1\sigma_2}=\dfrac{${N(S[0][1])}}{\sqrt{${N(S[0][0])}\cdot${N(S[1][1])}}}=${N(rho, 3)}$.`, String.raw`$E(Y)=\mu_1+\mu_2=${N(mu[0])}+${N(mu[1])}=${N(EY)}$.`) },
      { titulo: "b) Varianza y desviación de Y", puntos: 2,
        solucion: p(String.raw`$\operatorname{Var}(Y)=\sigma_1^2+\sigma_2^2+2\sigma_{12}=${N(S[0][0])}+${N(S[1][1])}+2(${N(S[0][1])})=${N(VY)}$ ⇒ $\sigma_Y=${N(sd, 3)}$.`,
          `La covarianza se suma <strong>dos veces</strong>${S[0][1] < 0 ? " (aquí es negativa, por eso la varianza de la suma es menor que la suma de las varianzas)" : ""}. Olvidarla daría $${N(S[0][0] + S[1][1])}$.`) },
      { titulo: "c) Probabilidad con la normal univariada", puntos: 2,
        solucion: p(String.raw`Una combinación lineal de normales conjuntas es normal: $Y\sim N(${N(EY)};\ ${N(VY)})$.`,
          String.raw`$z=\dfrac{${N(c)}-${N(EY)}}{${N(sd, 3)}}=${N(z, 3)}$ ⇒ $P(Y\le${N(c)})=\Phi(${N(z, 3)})=${N(phi, 4)}$` + (mayor ? String.raw` ⇒ $P(Y>${N(c)})=1-${N(phi, 4)}=${N(prob, 4)}$.` : "."),
          `En R: <code>${mayor ? "1 - " : ""}pnorm(${c}, ${EY}, sqrt(${VY}))</code>.`) }
    ],
    verifica: [vr("probabilidad", `${mayor ? "1 - " : ""}pnorm(${c}, ${EY}, sqrt(${VY}))`, prob, 4), vjs("Var(Y)", `${S[0][0]} + ${S[1][1]} + 2*(${S[0][1]})`, VY, 4)],
    fuente: [{ id: "C1", loc: "slides 38–39" }]
  });
  function det2ok(A) { return A[0][0] * A[1][1] - A[0][1] ** 2 > 0; }
}
function m03() {
  sumaNormal({ titulo: "Tiempo total de dos etapas (covarianza negativa)", intro: "Un pedido pasa por dos etapas: preparación ($X_1$) y despacho ($X_2$), en minutos.", queEsY: "tiempo total", mu: [10, 20], S: [[9, -2], [-2, 11]], c: 34, mayor: true });
  sumaNormal({ titulo: "Puntaje total de dos pruebas", intro: "Un postulante rinde dos pruebas con puntajes $X_1$ y $X_2$.", queEsY: "puntaje total", mu: [50, 30], S: [[16, 6], [6, 9]], c: 90, mayor: false });
  sumaNormal({ titulo: "Costo total: materiales más mano de obra", intro: "El costo de un trabajo (en miles de pesos) se compone de materiales ($X_1$) y mano de obra ($X_2$).", queEsY: "costo total", mu: [120, 80], S: [[100, 30], [30, 64]], c: 225, mayor: true });
}

/* ══ M04 · Escalamiento, distancias y similitud ════════════════════════ */
function escalar(o) {
  const { x, w, nombre } = o, n = x.length, mn = Math.min(...x), mx = Math.max(...x), m = media(x), s = desv(x);
  const mm = x.map((v) => (v - mn) / (mx - mn)), z = x.map((v) => (v - m) / s), inv = w * (mx - mn) + mn;
  agregar("m04", {
    concepto: "m04-c02", dificultad: 2, titulo: o.titulo,
    enunciado: p(`${o.intro} Los datos de ${nombre} son: ${x.map((v) => M(v)).join("; ")}.`) +
      incisos(["Aplica la normalización min–max a los datos.", "Aplica la estandarización z-score (indica $\\bar x$ y $s$).", String.raw`Un dato nuevo tiene valor min–max $w=${N(w)}$. ¿A qué valor original corresponde? ¿Qué propiedades tiene cada transformación?`]),
    partes: [
      { titulo: "a) Normalización min–max", puntos: 2,
        solucion: p(String.raw`$\min=${N(mn)}$, $\max=${N(mx)}$, rango $=${N(mx - mn)}$. $w_i=\dfrac{x_i-\min}{\max-\min}$:`) + tabla(["$x_i$", ...x.map((v) => M(v))], [["$w_i$", ...mm.map((v) => M(v, 3))]]) + p(String.raw`Ejemplo: $\dfrac{${N(x[1])}-${N(mn)}}{${N(mx - mn)}}=${N(mm[1], 3)}$. El mínimo queda en $0$ y el máximo en $1$.`) },
      { titulo: "b) Media, desviación y z-score", puntos: 2.5,
        solucion: p(String.raw`$\bar x=${N(m, 3)}$; $s=\sqrt{\dfrac{\sum(x_i-\bar x)^2}{n-1}}=\sqrt{\dfrac{${N(varianza(x) * (n - 1), 3)}}{${n - 1}}}=${N(s, 3)}$. $z_i=\dfrac{x_i-\bar x}{s}$:`) + tabla(["$x_i$", ...x.map((v) => M(v))], [["$z_i$", ...z.map((v) => M(v, 3))]]) + p("Los $z_i$ tienen media $0$ y desviación $1$. Es lo que calcula <code>scale(x)</code> (divide con $n-1$).") },
      { titulo: "c) Inversa de min–max y propiedades", puntos: 1.5,
        solucion: p(String.raw`$x=w(\max-\min)+\min=${N(w)}\cdot${N(mx - mn)}+${N(mn)}=${N(inv, 3)}$.`, "Min–max deja los datos en $[0,1]$ pero <strong>no</strong> da media $0$ ni varianza $1$, y es muy sensible a outliers (fijan el mínimo o el máximo). El z-score da media $0$ y desviación $1$, sin acotar el rango.") }
    ],
    verifica: [vr("z del 2.º dato", `scale(${rvec(x)})[2]`, z[1], 3), vjs("min–max del 2.º dato", `(${x[1]} - ${mn})/(${mx} - ${mn})`, mm[1], 3), vjs("inversa", `${w}*(${mx} - ${mn}) + ${mn}`, inv, 3), vr("s", `sd(${rvec(x)})`, s, 3)],
    fuente: [{ id: "C1", loc: "slides 41–42" }]
  });
}
function robusto(o) {
  const x = o.x.slice().sort((a, b) => a - b);
  afirmar(x.length === 5, "se esperan 5 datos");
  const med = x[2], q1 = x[1], q3 = x[3], iqr = q3 - q1, w = x.map((v) => (v - med) / iqr);
  const m = media(x), s = desv(x), z = x.map((v) => (v - m) / s);
  const norma = Math.sqrt(suma(x.map((v) => v * v))), l2 = x.map((v) => v / norma);
  agregar("m04", {
    concepto: "m04-c04", dificultad: 2, titulo: o.titulo,
    enunciado: p(`${o.intro} Datos: ${x.map((v) => M(v)).join("; ")} (el último es un valor extremo).`) +
      incisos(["Calcula la mediana y el rango intercuartil (IQR) y aplica el escalamiento robusto.", "Compara con el z-score: ¿por qué conviene el robusto aquí?", "Aplica la normalización L2 al vector de datos."]),
    partes: [
      { titulo: "a) Mediana, cuartiles e IQR", puntos: 1.5,
        solucion: p(String.raw`Datos ordenados: con $n=5$ la mediana es el 3.º ($${N(med)}$), $Q_1$ el 2.º ($${N(q1)}$) y $Q_3$ el 4.º ($${N(q3)}$), como los calcula <code>quantile()</code> en R. $\text{IQR}=Q_3-Q_1=${N(iqr)}$.`) },
      { titulo: "a) Escalamiento robusto", puntos: 1.5,
        solucion: p(String.raw`$w_i=\dfrac{x_i-\text{mediana}}{\text{IQR}}$:`) + tabla(["$x_i$", ...x.map((v) => M(v))], [["$w_i$", ...w.map((v) => M(v, 3))]]) + p(String.raw`Ejemplo: $\dfrac{${N(x[4])}-${N(med)}}{${N(iqr)}}=${N(w[4], 3)}$.`) },
      { titulo: "b) Comparación con el z-score", puntos: 1.5,
        solucion: p(String.raw`Con z-score: $\bar x=${N(m, 2)}$ y $s=${N(s, 2)}$ (ambos inflados por el valor extremo), y $z=(${z.map((v) => N(v, 2)).join(";\ ")})$: los cuatro datos «normales» quedan apretados entre $${N(z[0], 2)}$ y $${N(z[3], 2)}$.`,
          "La mediana y el IQR casi no se ven afectados por el outlier, así que el escalamiento robusto conserva la separación entre los datos normales y deja al extremo claramente lejos.") },
      { titulo: "c) Normalización L2", puntos: 1.5,
        solucion: p(String.raw`$\lVert x\rVert_2=\sqrt{\sum x_i^2}=\sqrt{${N(norma * norma)}}=${N(norma, 3)}$. $w_i=x_i/\lVert x\rVert_2$: $(${l2.map((v) => N(v, 3)).join(";\ ")})$.`, "El vector resultante tiene norma $1$: se conserva la dirección, no la magnitud.") }
    ],
    verifica: [vr("IQR", `IQR(${rvec(x)})`, iqr, 4), vr("mediana", `median(${rvec(x)})`, med, 4), vjs("robusto del extremo", `(${x[4]} - ${med})/${iqr}`, w[4], 3), vr("z del extremo", `scale(${rvec(x)})[5]`, z[4], 2), vjs("norma", `Math.sqrt(suma(${JSON.stringify(x)}.map(v => v*v)))`, norma, 3)],
    fuente: [{ id: "C1", loc: "slides 43–44" }]
  });
}
function distancias(o) {
  const { pts, vars } = o, et = Object.keys(pts), pares = [[0, 1], [0, 2], [1, 2]];
  const dE = pares.map(([i, j]) => euclid(pts[et[i]], pts[et[j]])), dM = pares.map(([i, j]) => manhattan(pts[et[i]], pts[et[j]]));
  const minE = dE.indexOf(Math.min(...dE)), minM = dM.indexOf(Math.min(...dM));
  const nom = (k) => et[pares[k][0]] + "–" + et[pares[k][1]];
  agregar("m04", {
    concepto: "m04-c05", dificultad: 1, titulo: o.titulo,
    enunciado: p(o.intro) + tabla(["", ...vars], et.map((e) => [e, ...pts[e].map((v) => M(v))])) +
      incisos(["Calcula la distancia euclídea entre cada par.", "Calcula la distancia Manhattan entre cada par.", "¿Qué par es el más parecido según cada distancia? ¿Qué habría que hacer antes si las variables tuvieran unidades muy distintas?"]),
    partes: [
      { titulo: "a) Distancias euclídeas", puntos: 2.5,
        solucion: p(String.raw`$d_E=\sqrt{\sum_j(a_j-b_j)^2}$:`) + p(...pares.map(([i, j], k) => String.raw`$d_E(${et[i]},${et[j]})=\sqrt{${pts[et[i]].map((v, q) => `(${N(v - pts[et[j]][q])})^2`).join("+")}}=\sqrt{${N(dE[k] ** 2)}}=${N(dE[k], 3)}$`)) },
      { titulo: "b) Distancias Manhattan", puntos: 2,
        solucion: p(String.raw`$d_M=\sum_j|a_j-b_j|$:`) + p(...pares.map(([i, j], k) => String.raw`$d_M(${et[i]},${et[j]})=${pts[et[i]].map((v, q) => `|${N(v - pts[et[j]][q])}|`).join("+")}=${N(dM[k])}$`)) },
      { titulo: "c) Par más parecido y escalamiento", puntos: 1.5,
        solucion: p(`Euclídea: el par más cercano es ${nom(minE)} ($${N(dE[minE], 3)}$). Manhattan: ${nom(minM)} ($${N(dM[minM])}$).${minE === minM ? " Ambas coinciden." : " No coinciden: la euclídea castiga más las diferencias grandes en una sola variable (las eleva al cuadrado)."}`,
          "Siempre $d_M\\ge d_E$. Si las unidades son muy distintas hay que estandarizar antes (z-score o min–max), o la variable de mayor escala domina la distancia.") }
    ],
    verifica: pares.map(([i, j], k) => vjs(`euclídea ${nom(k)}`, `dist(${JSON.stringify(pts[et[i]])}, ${JSON.stringify(pts[et[j]])})`, dE[k], 3)).concat(pares.map(([i, j], k) => vjs(`Manhattan ${nom(k)}`, `manhattan(${JSON.stringify(pts[et[i]])}, ${JSON.stringify(pts[et[j]])})`, dM[k], 4))),
    fuente: [{ id: "C1", loc: "slides 46–47" }]
  });
}
function coseno(o) {
  const { x, y } = o, mx = media(x), my = media(y), xc = x.map((v) => v - mx), yc = y.map((v) => v - my);
  const nr = (v) => Math.sqrt(suma(v.map((a) => a * a))), pe = (a, b) => suma(a.map((v, i) => v * b[i]));
  const cs = pe(x, y) / (nr(x) * nr(y)), r = pe(xc, yc) / (nr(xc) * nr(yc));
  agregar("m04", {
    concepto: "m04-c06", dificultad: 2, titulo: o.titulo,
    enunciado: p(String.raw`${o.intro} $X=(${x.join(",")})$ e $Y=(${y.join(",")})$.`) +
      incisos(["Calcula la similitud coseno entre $X$ e $Y$.", "Centra ambos vectores y calcula el coseno de los vectores centrados.", "¿Qué mide cada resultado y por qué difieren?"]),
    partes: [
      { titulo: "a) Similitud coseno", puntos: 2,
        solucion: p(String.raw`$x\cdot y=${x.map((v, i) => `${v}\\cdot${y[i]}`).join("+")}=${N(pe(x, y))}$; $\lVert x\rVert=\sqrt{${N(pe(x, x))}}=${N(nr(x), 3)}$; $\lVert y\rVert=\sqrt{${N(pe(y, y))}}=${N(nr(y), 3)}$.`,
          String.raw`$\cos\theta=\dfrac{x\cdot y}{\lVert x\rVert\,\lVert y\rVert}=\dfrac{${N(pe(x, y))}}{${N(nr(x), 3)}\cdot${N(nr(y), 3)}}=${N(cs, 3)}$.`) },
      { titulo: "b) Coseno de los vectores centrados", puntos: 2.5,
        solucion: p(String.raw`$\bar x=${N(mx)}$, $\bar y=${N(my)}$ ⇒ $\tilde x=(${xc.map((v) => N(v)).join(";\ ")})$, $\tilde y=(${yc.map((v) => N(v)).join(";\ ")})$.`,
          String.raw`$\tilde x\cdot\tilde y=${N(pe(xc, yc))}$; $\lVert\tilde x\rVert=${N(nr(xc), 3)}$; $\lVert\tilde y\rVert=${N(nr(yc), 3)}$ ⇒ $\dfrac{${N(pe(xc, yc))}}{${N(nr(xc), 3)}\cdot${N(nr(yc), 3)}}=${N(r, 3)}$.`) },
      { titulo: "c) Interpretación", puntos: 1.5,
        solucion: p(`El coseno sin centrar ($${N(cs, 3)}$) mide la similitud <strong>angular</strong> de los vectores originales. El coseno de los centrados ($${N(r, 3)}$) es exactamente la <strong>correlación de Pearson</strong> (<code>cor(X, Y)</code>): mide el patrón lineal alrededor de las medias.`,
          "Difieren porque con valores todos positivos los vectores apuntan en direcciones parecidas aunque su patrón lineal sea más débil.") }
    ],
    verifica: [vjs("correlación", `cor(${JSON.stringify(x)}, ${JSON.stringify(y)})`, r, 3), vr("coseno", `sum(${rvec(x)}*${rvec(y)})/sqrt(sum(${rvec(x)}^2)*sum(${rvec(y)}^2))`, cs, 3)],
    fuente: [{ id: "C1", loc: "slides 48–49" }]
  });
}
function m04() {
  escalar({ titulo: "Min–max, z-score e inversa (sueldos)", intro: "Se quiere escalar una variable antes de calcular distancias.", nombre: "sueldo (miles de pesos)", x: [450, 520, 610, 700, 980], w: 0.4 });
  escalar({ titulo: "Min–max, z-score e inversa (tiempos de entrega)", intro: "Una empresa de reparto quiere comparar repartidores con variables en la misma escala.", nombre: "tiempo de entrega (minutos)", x: [12, 15, 18, 20, 35], w: 0.75 });
  escalar({ titulo: "Min–max, z-score e inversa (puntajes)", intro: "Se desea llevar un puntaje a una escala común.", nombre: "puntaje", x: [40, 55, 60, 70, 75], w: 0.2 });
  robusto({ titulo: "Escalamiento robusto con un outlier (y norma L2)", intro: "Se mide el tiempo de respuesta (segundos) de un servidor en 5 consultas.", x: [8, 10, 12, 15, 60] });
  robusto({ titulo: "Robusto vs. z-score: ventas con un día atípico", intro: "Ventas diarias (millones) de una tienda durante 5 días.", x: [3, 4, 6, 7, 40] });
  distancias({ titulo: "Euclídea y Manhattan entre tres clientes", intro: "Tres clientes descritos por tres variables ya estandarizadas a escalas comparables:", vars: ["Compras", "Visitas", "Reclamos"], pts: { A: [2, 5, 1], B: [6, 2, 3], C: [3, 7, 4] } });
  distancias({ titulo: "Distancias entre tres sucursales (¿coinciden las métricas?)", intro: "Tres sucursales evaluadas en tres indicadores (puntajes de 0 a 10):", vars: ["Ventas", "Servicio", "Costos"], pts: { A: [1, 1, 1], B: [5, 2, 1], C: [3, 3, 3] } });
  coseno({ titulo: "Coseno vs. correlación (dos productos)", intro: "Dos productos reciben evaluaciones de 4 clientes:", x: [2, 4, 6, 8], y: [1, 3, 2, 6] });
  coseno({ titulo: "Coseno vs. correlación (perfiles de consumo)", intro: "Consumo de dos hogares en 4 categorías:", x: [3, 1, 4, 2], y: [6, 3, 9, 2] });
}

module.exports = { m01, m02, m03, m04 };
