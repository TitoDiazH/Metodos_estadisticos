/* Generadores de desarrollo · M15–M19 (P2: clasificación, DDE, ANOVA, MANOVA) */
"use strict";
const L = require("./lib");
const { Rn, Rv, Rtxt, rd, N, M, pct, suma, media, det2, inv2, mv2, dot, afirmar, tabla, pm, incisos, p, rvec, rmat, vjs, vr, agregar } = L;

/* ══ M15 · LDA: función discriminante de Fisher ════════════════════════ */
function pasosFisher(x1, x2, W, g, nuevos) {
  const dif = [x1[0] - x2[0], x1[1] - x2[1]], D = det2(W), Wi = inv2(W), u = mv2(Wi, dif);
  const D1 = dot(u, x1), D2 = dot(u, x2), C = (D1 + D2) / 2;
  const lin = (x) => `${N(u[0], 4)}\\cdot${N(x[0])}${u[1] < 0 ? "-" : "+"}${N(Math.abs(u[1]), 4)}\\cdot${N(x[1])}`;
  const clas = nuevos.map((x) => { const d = dot(u, x); afirmar(Math.abs(d - C) > 0.02, "punto nuevo en la frontera"); return { x, d, g: d > C ? 0 : 1 }; });
  return { dif, D, Wi, u, D1, D2, C, clas,
    inv: p(String.raw`$|W|=${N(W[0][0])}\cdot${N(W[1][1])}-(${N(W[0][1])})^2=${N(D, 4)}$ ⇒ $W^{-1}=\dfrac{1}{${N(D, 4)}}${pm([[W[1][1], -W[0][1]], [-W[0][1], W[0][0]]])}=${pm(Wi, 4)}$.`, "(Inversa $2\\times2$: se intercambia la diagonal, se cambia el signo de los otros dos y se divide por el determinante.)"),
    pesos: p(String.raw`$\bar x_1-\bar x_2=${pm([[dif[0]], [dif[1]]])}$ ⇒ $u=W^{-1}(\bar x_1-\bar x_2)=${pm([[u[0]], [u[1]]], 4)}$.`, String.raw`Función discriminante: $D=${N(u[0], 4)}\,X_1${u[1] < 0 ? "-" : "+"}${N(Math.abs(u[1]), 4)}\,X_2$. Solo importa la dirección de $u$: R entrega un múltiplo.`),
    corte: p(String.raw`$\bar D_1=${lin(x1)}=${N(D1, 4)}$ y $\bar D_2=${lin(x2)}=${N(D2, 4)}$.`, String.raw`Corte: $C=\dfrac{\bar D_1+\bar D_2}{2}=${N(C, 4)}$. Regla: $D>${N(C, 4)}$ ⇒ grupo 1 (${g[0]}); $D<${N(C, 4)}$ ⇒ grupo 2 (${g[1]}).`),
    clasif: p(...clas.map((c) => String.raw`$X=(${N(c.x[0])};\ ${N(c.x[1])})$: $D=${lin(c.x)}=${N(c.d, 4)}${c.g === 0 ? ">" : "<"}${N(C, 4)}$ ⇒ <strong>${g[c.g]}</strong>.`)) };
}
function fisher(o) {
  const { x1, x2, W, g, nuevos } = o, f = pasosFisher(x1, x2, W, g, nuevos);
  agregar("m15", {
    concepto: "m15-c02", dificultad: 2, titulo: o.titulo,
    enunciado: p(String.raw`${o.intro} Grupo 1 = «${g[0]}», grupo 2 = «${g[1]}». Medias de grupo: $\bar x_1=(${N(x1[0])};\ ${N(x1[1])})$ y $\bar x_2=(${N(x2[0])};\ ${N(x2[1])})$. Matriz de dispersión dentro de grupos: $W=${pm(W)}$.`) +
      incisos(["Calcula $W^{-1}$.", "Calcula el vector de pesos de Fisher $u=W^{-1}(\\bar x_1-\\bar x_2)$ y escribe la función discriminante.", "Calcula el puntaje promedio de cada grupo y el punto de corte.", `Clasifica ${nuevos.map((x) => `$X=(${N(x[0])};\\ ${N(x[1])})$`).join(" y ")}.`]),
    partes: [
      { titulo: "a) Inversa de W", puntos: 1.5, solucion: f.inv },
      { titulo: "b) Pesos de Fisher y función discriminante", puntos: 1.5, solucion: f.pesos },
      { titulo: "c) Puntajes promedio y punto de corte", puntos: 1.5, solucion: f.corte },
      { titulo: "d) Clasificar las observaciones nuevas", puntos: 1.5, solucion: f.clasif }
    ],
    verifica: [vr("u1", `solve(${rmat(W)}, ${rvec(f.dif)})[1]`, f.u[0], 4), vr("u2", `solve(${rmat(W)}, ${rvec(f.dif)})[2]`, f.u[1], 4), vjs("corte", `(${f.D1} + ${f.D2})/2`, f.C, 4)],
    fuente: [{ id: "C6.1", loc: "slides 13–19" }]
  });
}
function fisherDatos(o) {
  const { G1, G2, g, vars, nuevo } = o;
  const m = (G) => [media(G.map((x) => x[0])), media(G.map((x) => x[1]))];
  const disp = (G, mu) => { const a = suma(G.map((x) => (x[0] - mu[0]) ** 2)), b = suma(G.map((x) => (x[0] - mu[0]) * (x[1] - mu[1]))), c = suma(G.map((x) => (x[1] - mu[1]) ** 2)); return [[a, b], [b, c]]; };
  const x1 = m(G1), x2 = m(G2), W1 = disp(G1, x1), W2 = disp(G2, x2), W = W1.map((f, i) => f.map((v, j) => v + W2[i][j]));
  const f = pasosFisher(x1, x2, W, g, [nuevo]);
  const todos = G1.map((x) => ({ x, r: 0 })).concat(G2.map((x) => ({ x, r: 1 }))).map((q) => ({ ...q, d: dot(f.u, q.x) }));
  todos.forEach((q) => afirmar(Math.abs(q.d - f.C) > 1e-6, "observación en la frontera"));
  const ok = todos.filter((q) => (q.d > f.C ? 0 : 1) === q.r).length;
  const rDatos = `d <- data.frame(x1 = ${rvec(G1.concat(G2).map((x) => x[0]))}, x2 = ${rvec(G1.concat(G2).map((x) => x[1]))}, g = rep(c("a", "b"), c(${G1.length}, ${G2.length})))`;
  agregar("m15", {
    concepto: "m15-c02", dificultad: 3, titulo: o.titulo,
    enunciado: p(o.intro) + tabla(["Grupo", vars[0], vars[1]], G1.map((x) => [g[0], M(x[0]), M(x[1])]).concat(G2.map((x) => [g[1], M(x[0]), M(x[1])]))) +
      incisos(["Calcula las medias de cada grupo y la matriz $W$ (suma de las matrices de dispersión de cada grupo).", "Calcula los pesos de Fisher $u=W^{-1}(\\bar x_1-\\bar x_2)$.", "Calcula el punto de corte y la regla de decisión.", `Clasifica la observación nueva $(${N(nuevo[0])};\\ ${N(nuevo[1])})$ y calcula el porcentaje de aciertos en los datos de entrenamiento.`]),
    partes: [
      { titulo: "a) Medias de grupo y matriz W", puntos: 2.5,
        solucion: p(String.raw`$\bar x_1=(${N(x1[0], 3)};\ ${N(x1[1], 3)})$ (${g[0]}) y $\bar x_2=(${N(x2[0], 3)};\ ${N(x2[1], 3)})$ (${g[1]}).`,
          String.raw`Dispersión de cada grupo: $W_g=\sum(x_i-\bar x_g)(x_i-\bar x_g)'$, es decir $\begin{pmatrix}\sum d_1^2&\sum d_1d_2\\\sum d_1d_2&\sum d_2^2\end{pmatrix}$ con $d$ = desviaciones respecto de la media del grupo.`,
          String.raw`$W_1=${pm(W1, 3)}$, $W_2=${pm(W2, 3)}$ ⇒ $W=W_1+W_2=${pm(W, 3)}$.`) },
      { titulo: "b) Pesos de Fisher", puntos: 1.5, solucion: f.inv + f.pesos },
      { titulo: "c) Punto de corte y regla", puntos: 1, solucion: f.corte },
      { titulo: "d) Clasificación y porcentaje de aciertos", puntos: 1,
        solucion: f.clasif + tabla(["Grupo real", vars[0], vars[1], "$D$", "Predicho"], todos.map((q) => [g[q.r], M(q.x[0]), M(q.x[1]), M(q.d, 3), g[q.d > f.C ? 0 : 1]])) +
          p(`Aciertos: $${ok}/${todos.length}=${N(100 * ok / todos.length, 1)}\\,\\%$. Es un porcentaje optimista: se evalúa con los mismos datos con que se construyó la regla; lo correcto es validar con datos de prueba.`) }
    ],
    verifica: [vr("razón u2/u1 (MASS::lda)", `{${rDatos}; m <- MASS::lda(g ~ x1 + x2, d); m$scaling[2]/m$scaling[1]}`, f.u[1] / f.u[0], 3), vr("aciertos (MASS::lda, priors iguales)", `{${rDatos}; m <- MASS::lda(g ~ x1 + x2, d, prior = c(0.5, 0.5)); sum(predict(m)$class == d$g)}`, ok, 4), vjs("corte", `(${f.D1} + ${f.D2})/2`, f.C, 4)],
    fuente: [{ id: "C6.1", loc: "slides 10–19" }]
  });
}
function m15() {
  fisher({ titulo: "Discriminante de Fisher con W no diagonal", intro: "Un banco clasifica solicitudes con ingreso ($X_1$) y deuda ($X_2$), ambos en millones.", g: ["Aprobado", "Rechazado"], x1: [6, 3], x2: [4, 5], W: [[4, 1], [1, 2]], nuevos: [[5, 3], [4.5, 5]] });
  fisher({ titulo: "Discriminante de Fisher: clientes fieles y fugados", intro: "Una empresa clasifica clientes con antigüedad en años ($X_1$) y reclamos del último año ($X_2$).", g: ["Fiel", "Fugado"], x1: [12, 7], x2: [9, 8], W: [[10, 4], [4, 8]], nuevos: [[11, 9], [10, 6]] });
  fisher({ titulo: "Discriminante de Fisher con covarianza negativa", intro: "Control de calidad con dos mediciones $X_1$ y $X_2$.", g: ["Conforme", "Defectuosa"], x1: [8, 5], x2: [6, 6], W: [[5, -2], [-2, 3]], nuevos: [[7, 6], [6.5, 4.5]] });
  fisher({ titulo: "Discriminante de Fisher: pymes que pagan y que no pagan", intro: "Se clasifican pymes con liquidez ($X_1$) y endeudamiento ($X_2$).", g: ["Paga", "No paga"], x1: [2.4, 1.1], x2: [1.6, 1.9], W: [[1.5, 0.3], [0.3, 0.9]], nuevos: [[2, 1.6], [1.8, 1.2]] });
  fisherDatos({ titulo: "LDA completo desde los datos (dos grupos de 4)", intro: "Ocho productos clasificados como «Éxito» o «Fracaso» según dos indicadores:", vars: ["$X_1$", "$X_2$"], g: ["Éxito", "Fracaso"], G1: [[2, 3], [3, 5], [4, 4], [3, 4]], G2: [[6, 1], [7, 3], [9, 2], [6, 2]], nuevo: [5, 4] });
  fisherDatos({ titulo: "LDA desde los datos con un caso mal clasificado", intro: "Ocho postulantes, «Contratado» o «No contratado», con puntaje técnico y de entrevista:", vars: ["Técnico", "Entrevista"], g: ["Contratado", "No contratado"], G1: [[7, 6], [8, 8], [6, 7], [5, 4]], G2: [[4, 5], [3, 3], [5, 2], [6, 6]], nuevo: [6, 5] });
}

/* ══ M16 · Naive Bayes, matriz de confusión, LDA vs QDA ════════════════ */
function nbCat(o) {
  const { clases, vars, laplace } = o, nom = Object.keys(clases), n = suma(Object.values(clases));
  const prior = nom.map((c) => clases[c] / n);
  const ver = vars.map((v) => nom.map((c) => (laplace ? (v.conteos[c] + 1) / (clases[c] + v.m) : v.conteos[c] / clases[c])));
  const score = nom.map((_, k) => prior[k] * ver.reduce((a, f) => a * f[k], 1)), tot = suma(score), post = score.map((s) => s / tot);
  const gana = score[0] > score[1] ? 0 : 1, hayCero = vars.some((v) => nom.some((c) => v.conteos[c] === 0));
  afirmar(!!laplace === hayCero, "Laplace se usa solo cuando hay una frecuencia cero");
  const fr = (v, c) => (laplace ? String.raw`\dfrac{${v.conteos[c]}+1}{${clases[c]}+${v.m}}` : String.raw`\dfrac{${v.conteos[c]}}{${clases[c]}}`);
  agregar("m16", {
    concepto: laplace ? "m16-c03" : "m16-c02", dificultad: 2, titulo: o.titulo,
    enunciado: p(`${o.intro} De ${n} casos, ${nom.map((c) => `${clases[c]} son «${c}»`).join(" y ")}. La tabla indica cuántos casos de cada clase tienen el valor que presenta el caso nuevo:`) +
      tabla(["Variable = valor del caso nuevo", ...nom.map((c) => `«${c}» (de ${clases[c]})`), ...(laplace ? ["N.º de categorías"] : [])], vars.map((v) => [`${v.nombre} = ${v.valor}`, ...nom.map((c) => v.conteos[c]), ...(laplace ? [v.m] : [])])) +
      incisos(["Calcula las probabilidades a priori.", laplace ? "Calcula las verosimilitudes. ¿Qué problema aparece y cómo lo resuelve el suavizado de Laplace?" : "Calcula las verosimilitudes de cada variable por clase.", "Calcula el score de cada clase.", "Calcula la probabilidad posterior y clasifica el caso nuevo."]),
    partes: [
      { titulo: "a) Probabilidades a priori", puntos: 1, solucion: p(nom.map((c, k) => String.raw`$P(\text{${c}})=\dfrac{${clases[c]}}{${n}}=${N(prior[k], 4)}$`).join("; ") + ".") },
      { titulo: laplace ? "b) Verosimilitudes, frecuencia cero y Laplace" : "b) Verosimilitudes", puntos: 2,
        solucion: (laplace ? p(`Sin corrección hay una frecuencia $0$ (${vars.filter((v) => nom.some((c) => v.conteos[c] === 0)).map((v) => `${v.nombre} = ${v.valor}`).join(", ")}): el producto de esa clase sería $0$ sin importar las demás variables.`, String.raw`Laplace: $P(x_j=v\mid C_k)=\dfrac{n_{jkv}+1}{n_k+m_j}$, con $m_j$ = número de categorías de la variable.`) : p("Frecuencia relativa dentro de cada clase, $n_{jkv}/n_k$:")) +
          tabla(["Variable", ...nom.map((c) => `$P(\\cdot\\mid\\text{${c}})$`)], vars.map((v, j) => [`${v.nombre} = ${v.valor}`, ...nom.map((c, k) => `$${fr(v, c)}=${N(ver[j][k], 4)}$`)])) },
      { titulo: "c) Score de cada clase", puntos: 1.5,
        solucion: p("Score $=P(C_k)\\prod_jP(x_j\\mid C_k)$ (supuesto «naive»: variables independientes dentro de cada clase):", ...nom.map((c, k) => String.raw`${c}: $${N(prior[k], 4)}\cdot${ver.map((f) => N(f[k], 4)).join("\\cdot")}=${N(score[k], 5)}$`)) },
      { titulo: "d) Posterior y clasificación", puntos: 1.5,
        solucion: p(String.raw`$P(\text{${nom[gana]}}\mid x)=\dfrac{${N(score[gana], 5)}}{${N(score[0], 5)}+${N(score[1], 5)}}=${N(post[gana], 3)}$.`, `Mayor score ⇒ el caso nuevo se clasifica como <strong>«${nom[gana]}»</strong> (${post[gana] > 0.8 ? "con bastante seguridad" : post[gana] > 0.6 ? "con seguridad moderada" : "sin mucha contundencia"}).`,
          laplace ? "En R: <code>naiveBayes(…, laplace = 1)</code>. Los priors no se suavizan." : "En R: <code>e1071::naiveBayes()</code> y <code>predict(…, type = \"raw\")</code> para las posteriores.") }
    ],
    verifica: [vjs(`posterior de ${nom[gana]}`, `(function(){ var s = [${nom.map((c, k) => `${clases[c]}/${n}` + vars.map((v) => (laplace ? `*(${v.conteos[c]}+1)/(${clases[c]}+${v.m})` : `*${v.conteos[c]}/${clases[c]}`)).join("")).join(", ")}]; return s[${gana}]/(s[0]+s[1]); })()`, post[gana], 3)],
    fuente: laplace ? [{ id: "AY6-E", loc: "P1(d)" }, { id: "C6.2", loc: "slides 7–9" }] : [{ id: "C6.2", loc: "slides 7–11" }, { id: "AY6-E", loc: "P1" }]
  });
}
function nbGauss(o) {
  const { clases, vars, x, priors2 } = o;
  const dn = (v, mu, sd) => Math.exp(-((v - mu) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI));
  const den = clases.map((c) => vars.map((_, j) => dn(x[j], c.mu[j], c.sd[j])));
  const sc = (pr) => clases.map((c, k) => pr[k] * den[k].reduce((a, b) => a * b, 1));
  const s1 = sc(clases.map((c) => c.prior)), s2 = sc(priors2), g1 = s1[0] > s1[1] ? 0 : 1, g2 = s2[0] > s2[1] ? 0 : 1;
  const post1 = s1[g1] / suma(s1), post2 = s2[g2] / suma(s2);
  agregar("m16", {
    concepto: "m16-c02", dificultad: 3, titulo: o.titulo,
    enunciado: p(o.intro) + tabla(["Clase", "Prior", ...vars.flatMap((v) => [`Media ${v}`, `Desv. ${v}`])], clases.map((c) => [c.nombre, M(c.prior), ...vars.flatMap((_, j) => [M(c.mu[j]), M(c.sd[j])])])) +
      p(`Caso nuevo: ${vars.map((v, j) => `${v} $=${N(x[j])}$`).join(", ")}.`) + incisos(["Calcula las densidades normales de cada variable en cada clase.", "Calcula los scores y clasifica.", "Calcula la probabilidad posterior de la clase elegida.", String.raw`Repite la clasificación con priors $(${priors2.map((v) => N(v)).join(";\ ")})$. ¿Cambia la decisión?`]),
    partes: [
      { titulo: "a) Densidades gaussianas", puntos: 2.5,
        solucion: p(String.raw`$f(x)=\dfrac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\dfrac{(x-\mu)^2}{2\sigma^2}\right)$ (en R: <code>dnorm(x, media, sd)</code>).`) +
          tabla(["Clase", ...vars], clases.map((c, k) => [c.nombre, ...vars.map((_, j) => `$\\texttt{dnorm}(${N(x[j])};\\,${N(c.mu[j])};\\,${N(c.sd[j])})=${N(den[k][j], 5)}$`)])) +
          p(String.raw`Ejemplo: $\dfrac{1}{${N(clases[0].sd[0])}\sqrt{2\pi}}\exp\!\left(-\dfrac{(${N(x[0])}-${N(clases[0].mu[0])})^2}{2\cdot${N(clases[0].sd[0])}^2}\right)=${N(den[0][0], 5)}$. Es una <strong>densidad</strong>, no una probabilidad: puede ser mayor que $1$.`) },
      { titulo: "b) Scores y clasificación", puntos: 1.5,
        solucion: p(...clases.map((c, k) => String.raw`${c.nombre}: $${N(c.prior)}\cdot${den[k].map((v) => N(v, 5)).join("\\cdot")}=${N(s1[k], 6)}$`), `Mayor score ⇒ <strong>${clases[g1].nombre}</strong>.`) },
      { titulo: "c) Probabilidad posterior", puntos: 1, solucion: p(String.raw`$P(\text{${clases[g1].nombre}}\mid x)=\dfrac{${N(s1[g1], 6)}}{${N(s1[0], 6)}+${N(s1[1], 6)}}=${N(post1, 3)}$.`) },
      { titulo: "d) Efecto de cambiar los priors", puntos: 1,
        solucion: p(...clases.map((c, k) => String.raw`${c.nombre}: $${N(priors2[k])}\cdot${den[k].map((v) => N(v, 5)).join("\\cdot")}=${N(s2[k], 6)}$`),
          `Ahora gana <strong>${clases[g2].nombre}</strong> (posterior $${N(post2, 3)}$). ${g1 !== g2 ? "<strong>La decisión cambia</strong>: el prior empuja la clasificación hacia la clase que se supone más frecuente." : "La decisión no cambia, pero la posterior sí: el prior favorece a la clase que se supone más frecuente."} Las densidades (verosimilitudes) no dependen del prior.`) }
    ],
    verifica: [vr("densidad de ejemplo (dnorm)", `dnorm(${x[0]}, ${clases[0].mu[0]}, ${clases[0].sd[0]})`, den[0][0], 5),
      vr("posterior con los priors originales", `{s <- c(${clases.map((c) => `${c.prior}*${vars.map((_, j) => `dnorm(${x[j]}, ${c.mu[j]}, ${c.sd[j]})`).join("*")}`).join(", ")}); s[${g1 + 1}]/sum(s)}`, post1, 3),
      vr("posterior con los priors nuevos", `{s <- c(${clases.map((c, k) => `${priors2[k]}*${vars.map((_, j) => `dnorm(${x[j]}, ${c.mu[j]}, ${c.sd[j]})`).join("*")}`).join(", ")}); s[${g2 + 1}]/sum(s)}`, post2, 3)],
    fuente: [{ id: "C6.2", loc: "slides 7–11" }, { id: "AY6-E", loc: "P2" }]
  });
}
function confusion(o) {
  const { VP, FN, FP, VN, pos, neg } = o, n = VP + FN + FP + VN;
  const ex = (VP + VN) / n, se = VP / (VP + FN), es = VN / (VN + FP), pr = VP / (VP + FP), vpn = VN / (VN + FN);
  agregar("m16", {
    concepto: "m16-c05", dificultad: 1, titulo: o.titulo,
    enunciado: p(`${o.intro} La clase positiva es «${pos}». Matriz de confusión sobre los datos de prueba:`) + tabla(["", `Predicho: ${pos}`, `Predicho: ${neg}`], [[`<strong>Real: ${pos}</strong>`, VP, FN], [`<strong>Real: ${neg}</strong>`, FP, VN]]) +
      incisos(["Identifica VP, FN, FP y VN y calcula la exactitud y la tasa de error.", "Calcula la sensibilidad y la especificidad.", "Calcula la precisión y el valor predictivo negativo.", "¿Qué error es más costoso en este problema y qué métrica mirarías?"]),
    partes: [
      { titulo: "a) Celdas, exactitud y tasa de error", puntos: 1.5,
        solucion: p(`$VP=${VP}$ (reales «${pos}» bien clasificados), $FN=${FN}$ («${pos}» clasificados como «${neg}»), $FP=${FP}$ («${neg}» clasificados como «${pos}»), $VN=${VN}$.`,
          String.raw`Exactitud $=\dfrac{VP+VN}{n}=\dfrac{${VP}+${VN}}{${n}}=${N(100 * ex, 2)}\,\%$; tasa de error $=${N(100 * (1 - ex), 2)}\,\%$.`) },
      { titulo: "b) Sensibilidad y especificidad", puntos: 2,
        solucion: p(String.raw`Sensibilidad $=\dfrac{VP}{VP+FN}=\dfrac{${VP}}{${VP + FN}}=${N(100 * se, 2)}\,\%$: de los realmente «${pos}», cuántos detecta.`, String.raw`Especificidad $=\dfrac{VN}{VN+FP}=\dfrac{${VN}}{${VN + FP}}=${N(100 * es, 2)}\,\%$: de los realmente «${neg}», cuántos reconoce.`, "Ambas se calculan por <strong>fila</strong> (sobre los reales).") },
      { titulo: "c) Precisión y valor predictivo negativo", puntos: 1.5,
        solucion: p(String.raw`Precisión $=\dfrac{VP}{VP+FP}=\dfrac{${VP}}{${VP + FP}}=${N(100 * pr, 2)}\,\%$: de los predichos «${pos}», cuántos lo son.`, String.raw`VPN $=\dfrac{VN}{VN+FN}=\dfrac{${VN}}{${VN + FN}}=${N(100 * vpn, 2)}\,\%$.`, "Ambas se calculan por <strong>columna</strong> (sobre los predichos).") },
      { titulo: "d) Error más costoso y métrica relevante", puntos: 1, solucion: p(o.interp(ex, se, es, pr)) }
    ],
    verifica: [vjs("exactitud (%)", `100*(${VP}+${VN})/${n}`, 100 * ex, 2), vjs("sensibilidad (%)", `100*${VP}/(${VP}+${FN})`, 100 * se, 2), vjs("especificidad (%)", `100*${VN}/(${VN}+${FP})`, 100 * es, 2), vjs("precisión (%)", `100*${VP}/(${VP}+${FP})`, 100 * pr, 2), vjs("VPN (%)", `100*${VN}/(${VN}+${FN})`, 100 * vpn, 2)],
    fuente: [{ id: "C6.2", loc: "slides 16–17" }, { id: "AY6-E", loc: "P3(b)" }]
  });
}
function m16() {
  nbCat({ titulo: "Naive Bayes con variables categóricas: ¿compra o no compra?", intro: "Una tienda en línea quiere predecir si un visitante compra.", clases: { "Compra": 6, "No compra": 4 },
    vars: [{ nombre: "Edad", valor: "Joven", conteos: { "Compra": 2, "No compra": 3 } }, { nombre: "Ingreso", valor: "Alto", conteos: { "Compra": 3, "No compra": 1 } }, { nombre: "Crédito", valor: "Bueno", conteos: { "Compra": 4, "No compra": 1 } }] });
  nbCat({ titulo: "Naive Bayes: filtro de correo no deseado", intro: "Un filtro clasifica correos como spam o no spam.", clases: { "Spam": 8, "No spam": 12 },
    vars: [{ nombre: "Contiene «oferta»", valor: "sí", conteos: { "Spam": 6, "No spam": 3 } }, { nombre: "Contiene enlace", valor: "sí", conteos: { "Spam": 5, "No spam": 2 } }, { nombre: "Trae adjunto", valor: "no", conteos: { "Spam": 6, "No spam": 6 } }] });
  nbCat({ titulo: "Naive Bayes con priors desbalanceados: fuga de clientes", intro: "Una compañía quiere anticipar la fuga de clientes.", clases: { "Se fuga": 5, "Se queda": 15 },
    vars: [{ nombre: "Plan", valor: "Básico", conteos: { "Se fuga": 4, "Se queda": 6 } }, { nombre: "Reclamó", valor: "sí", conteos: { "Se fuga": 4, "Se queda": 3 } }] });
  nbCat({ titulo: "Frecuencia cero y suavizado de Laplace", intro: "Un banco clasifica clientes en morosos y no morosos.", laplace: true, clases: { "Moroso": 5, "No moroso": 10 },
    vars: [{ nombre: "Vivienda", valor: "Propia", m: 3, conteos: { "Moroso": 0, "No moroso": 6 } }, { nombre: "Empleo", valor: "Independiente", m: 2, conteos: { "Moroso": 3, "No moroso": 3 } }] });
  nbCat({ titulo: "Laplace cuando la frecuencia cero está en la otra clase", intro: "Se clasifica si un pedido llega con atraso.", laplace: true, clases: { "Atraso": 4, "A tiempo": 8 },
    vars: [{ nombre: "Zona", valor: "Rural", m: 3, conteos: { "Atraso": 3, "A tiempo": 0 } }, { nombre: "Clima", valor: "Lluvia", m: 2, conteos: { "Atraso": 3, "A tiempo": 2 } }] });
  nbGauss({ titulo: "Naive Bayes gaussiano: ¿aprueba o reprueba?", intro: "Con datos de años anteriores se estimaron medias y desviaciones por clase:", vars: ["horas de estudio", "asistencia (%)"], x: [8, 75], priors2: [0.5, 0.5],
    clases: [{ nombre: "Aprueba", prior: 0.6, mu: [10, 85], sd: [2, 8] }, { nombre: "Reprueba", prior: 0.4, mu: [6, 70], sd: [2.5, 10] }] });
  nbGauss({ titulo: "Naive Bayes gaussiano con una clase rara (fraude)", intro: "Un sistema antifraude usa el monto (miles de pesos) y el número de transacciones del día:", vars: ["monto", "transacciones"], x: [220, 4], priors2: [0.5, 0.5],
    clases: [{ nombre: "Fraude", prior: 0.1, mu: [300, 6], sd: [80, 2] }, { nombre: "Legítima", prior: 0.9, mu: [120, 2], sd: [60, 1.5] }] });
  nbGauss({ titulo: "Naive Bayes gaussiano con desviaciones pequeñas", intro: "Se clasifican piezas según dos mediciones (mm):", vars: ["diámetro", "espesor"], x: [10.1, 2.05], priors2: [0.5, 0.5],
    clases: [{ nombre: "Conforme", prior: 0.8, mu: [10, 2], sd: [0.1, 0.05] }, { nombre: "Defectuosa", prior: 0.2, mu: [10.3, 2.1], sd: [0.2, 0.08] }] });
  confusion({ titulo: "Matriz de confusión: detección de fraude", intro: "Un clasificador marca transacciones como fraude.", pos: "Fraude", neg: "Legítima", VP: 30, FN: 20, FP: 10, VN: 440,
    interp: (ex, se) => `La exactitud ($${N(100 * ex, 1)}\\,\\%$) es alta solo porque casi todas las transacciones son legítimas (datos desbalanceados). El error más costoso es el falso negativo (un fraude que pasa): hay que mirar la <strong>sensibilidad</strong>, que es de apenas $${N(100 * se, 1)}\\,\\%$.` });
  confusion({ titulo: "Matriz de confusión: diagnóstico médico", intro: "Un test clasifica pacientes como enfermos o sanos.", pos: "Enfermo", neg: "Sano", VP: 45, FN: 5, FP: 30, VN: 120,
    interp: (ex, se, es, pr) => `El error más grave es el falso negativo (un enfermo que se va sin tratamiento): importa la <strong>sensibilidad</strong> ($${N(100 * se, 1)}\\,\\%$, alta). El costo es una precisión baja ($${N(100 * pr, 1)}\\,\\%$): muchos sanos reciben una alarma falsa y necesitan un examen confirmatorio.` });
  confusion({ titulo: "Matriz de confusión: aprobación de créditos", intro: "Un modelo predice si un cliente será «Cumplidor».", pos: "Cumplidor", neg: "Fallido", VP: 70, FN: 10, FP: 12, VN: 8,
    interp: (ex, se, es) => `Para el banco el error más costoso es el falso positivo (prestar a un cliente que no paga): hay que mirar la <strong>especificidad</strong>, que es de solo $${N(100 * es, 1)}\\,\\%$: el modelo detecta mal a los fallidos, aunque la exactitud sea $${N(100 * ex, 1)}\\,\\%$.` });
  confusion({ titulo: "Matriz de confusión: control de calidad", intro: "Un sistema de visión rechaza piezas defectuosas.", pos: "Defectuosa", neg: "Buena", VP: 18, FN: 2, FP: 15, VN: 165,
    interp: (ex, se, es, pr) => `Si lo más costoso es que una pieza defectuosa llegue al cliente (falso negativo), se mira la <strong>sensibilidad</strong> ($${N(100 * se, 1)}\\,\\%$). La precisión es baja ($${N(100 * pr, 1)}\\,\\%$): casi la mitad de las piezas rechazadas eran buenas, lo que tiene un costo de reproceso.` });
  agregar("m16", {
    concepto: "m16-c01", dificultad: 2, origen: "nueva", titulo: "¿LDA o QDA? Box's M y validación",
    enunciado: p("Se quiere clasificar clientes en $K=3$ segmentos usando $p=4$ variables numéricas, con $n=150$ clientes ($50$ por segmento). El test de Box's M entrega un p-valor de $0{,}012$.") +
      incisos(["Plantea las hipótesis de Box's M y calcula sus grados de libertad.", "¿Qué método corresponde, LDA o QDA? ¿Cambiaría tu recomendación con $n=30$?", "Se valida con 5-fold. ¿Cuántos clientes hay en cada conjunto de entrenamiento y de prueba? ¿Y con leave-one-out?", "El error de entrenamiento es $4\\,\\%$ y el de validación $18\\,\\%$. ¿Qué indica?"]),
    partes: [
      { titulo: "a) Hipótesis y grados de libertad de Box's M", puntos: 1.5, solucion: p("$H_0:\\Sigma_1=\\Sigma_2=\\Sigma_3$ (covarianzas iguales) contra $H_1$: al menos una difiere.", "gl $=\\dfrac{p(p+1)(K-1)}{2}=\\dfrac{4\\cdot5\\cdot2}{2}=20$.") },
      { titulo: "b) Elección entre LDA y QDA", puntos: 1.5, solucion: p("p-valor $=0{,}012\\le0{,}05$ ⇒ se rechaza la igualdad de covarianzas ⇒ corresponde <strong>QDA</strong> (una matriz de covarianza por grupo).", "Con $n=30$ ($10$ por grupo) conviene <strong>LDA</strong> igualmente: QDA estima muchos más parámetros y necesita muchos datos; con muestras pequeñas sobreajusta.") },
      { titulo: "c) Tamaños en 5-fold y leave-one-out", puntos: 1.5, solucion: p("5-fold: $150/5=30$ clientes por pliegue. En cada una de las 5 rondas se entrena con $120$ y se prueba con $30$; el error es el promedio de las 5.", "Leave-one-out: $150$ rondas; en cada una se entrena con $149$ y se prueba con $1$.") },
      { titulo: "d) Diagnóstico con los dos errores", puntos: 1.5, solucion: p("Un error de entrenamiento muy bajo junto a un error de validación mucho mayor indica <strong>sobreajuste</strong>: el modelo aprendió particularidades de la muestra de entrenamiento y no generaliza. El error que se informa es el de validación; convendría un modelo más simple (LDA o Naive Bayes) o más datos.") }
    ],
    verifica: [vjs("gl Box's M", "4*5*2/2", 20, 4)],
    fuente: [{ id: "C6.2", loc: "slides 3–5 y 18–20" }]
  });
}

/* ══ M17 · Diseño de experimentos (conceptual) ═════════════════════════ */
function m17() {
  agregar("m17", {
    concepto: "m17-c02", dificultad: 1, origen: "nueva", titulo: "Identificar los elementos de un experimento (horneado)",
    enunciado: p("Una panadería quiere mejorar el volumen de su pan. Decide probar <strong>dos temperaturas</strong> de horno ($180$ y $200$ °C) y <strong>tres tiempos</strong> de fermentación ($30$, $45$ y $60$ minutos). Hornea $4$ panes con cada combinación, en orden aleatorio, y mide el volumen de cada pan. La humedad ambiente varía durante el día y no se puede controlar.") +
      incisos(["Identifica la variable de respuesta, los factores controlables y sus niveles.", "¿Cuántos tratamientos hay y cuántas corridas en total? ¿Cuál es la unidad experimental?", "Identifica un factor de ruido y explica qué principios básicos del diseño se aplican (o podrían aplicarse)."]),
    partes: [
      { titulo: "a) Respuesta, factores y niveles", puntos: 2, solucion: p("Variable de respuesta: <strong>volumen del pan</strong>.", "Factores controlables: temperatura (2 niveles: $180$ y $200$ °C) y tiempo de fermentación (3 niveles: $30$, $45$ y $60$ min).") },
      { titulo: "b) Tratamientos, corridas y unidad experimental", puntos: 2, solucion: p("Tratamiento = combinación de niveles: $2\\times3=6$ tratamientos.", "Con $4$ repeticiones: $6\\times4=24$ corridas.", "Unidad experimental: cada pan (la pieza a la que se aplica el tratamiento y sobre la que se mide la respuesta).") },
      { titulo: "c) Factor de ruido y principios básicos", puntos: 2, solucion: p("Factor no controlable (ruido): la <strong>humedad ambiente</strong>.", "<strong>Repetición:</strong> 4 panes por tratamiento, lo que permite estimar el error aleatorio. <strong>Aleatorización:</strong> el orden aleatorio de horneado reparte el efecto de la humedad y asegura independencia de los errores. <strong>Bloqueo:</strong> podría hacerse por jornada (mañana/tarde) para neutralizar la humedad.") }
    ],
    fuente: [{ id: "C7.1", loc: "páginas 10–17" }]
  });
  agregar("m17", {
    concepto: "m17-c04", dificultad: 1, origen: "nueva", titulo: "Observar vs. experimentar y matriz de diseño (campaña de correo)",
    enunciado: p("Un equipo de marketing quiere saber qué asunto de correo genera más aperturas. El analista A propone revisar los correos enviados el último año y comparar las tasas de apertura según el asunto usado. El analista B propone elegir $3$ asuntos, enviar cada uno a $5$ grupos de clientes escogidos al azar y medir la tasa de apertura.") +
      incisos(["¿Cuál propuesta es observar y cuál experimentar? ¿Qué ventaja tiene la segunda?", "Para la propuesta B: factor, niveles, tratamientos, repeticiones y tamaño de la matriz de diseño.", "¿Qué diseño es y con qué técnica se analizan los datos? Indica las etapas del experimento."]),
    partes: [
      { titulo: "a) Observar vs. experimentar", puntos: 2, solucion: p("A es <strong>observar</strong> (estrategia pasiva: se monitorea lo que ya ocurrió). B es <strong>experimentar</strong> (estrategia activa: se hacen cambios deliberados y se mide su efecto).", "Ventaja de B: al asignar los asuntos al azar, las diferencias pueden atribuirse al asunto y no a otros factores (época del año, tipo de cliente) que en los datos históricos están mezclados.") },
      { titulo: "b) Elementos del diseño de la propuesta B", puntos: 2, solucion: p("Un factor (asunto del correo) con $3$ niveles ⇒ $3$ tratamientos. $5$ repeticiones por tratamiento ⇒ matriz de diseño de $3\\times5=15$ corridas, en orden aleatorio.", "Respuesta: tasa de apertura. Unidad experimental: cada grupo de clientes.") },
      { titulo: "c) Tipo de diseño, análisis y etapas", puntos: 2, solucion: p("Un solo factor, sin bloques: <strong>diseño completamente al azar</strong>; se analiza con <strong>ANOVA de un factor</strong> ($H_0:\\mu_1=\\mu_2=\\mu_3$).", "Etapas: planeación (objetivo, factores, niveles, respuesta, diseño) → análisis (ANOVA y verificación de supuestos) → interpretación y conclusiones.") }
    ],
    fuente: [{ id: "C7.1", loc: "páginas 4–9 y 18–22" }]
  });
}

/* ══ M18 · ANOVA de un factor ══════════════════════════════════════════ */
function calcAnova(grupos) {
  const nom = Object.keys(grupos), k = nom.length, todos = nom.flatMap((g) => grupos[g]), Nt = todos.length, mg = media(todos);
  const m = nom.map((g) => media(grupos[g])), ni = nom.map((g) => grupos[g].length);
  const scT = suma(m.map((v, i) => ni[i] * (v - mg) ** 2)), scEg = nom.map((g, i) => suma(grupos[g].map((y) => (y - m[i]) ** 2))), scE = suma(scEg);
  const cmT = scT / (k - 1), cmE = scE / (Nt - k), F = cmT / cmE;
  const rDatos = `d <- data.frame(y = ${rvec(todos)}, g = factor(rep(c(${nom.map((g) => `"${g}"`).join(", ")}), c(${ni.join(", ")}))))`;
  return { nom, k, Nt, mg, m, ni, scT, scEg, scE, cmT, cmE, F, rDatos };
}
const tablaAov = (a) => tabla(["Fuente", "SC", "gl", "CM", "$F_0$"], [["Tratamientos", M(a.scT, 3), a.k - 1, M(a.cmT, 3), M(a.F, 3)], ["Error", M(a.scE, 3), a.Nt - a.k, M(a.cmE, 3), ""], ["Total", M(a.scT + a.scE, 3), a.Nt - 1, "", ""]]);
function anova(o) {
  const { grupos, alfa } = o, a = calcAnova(grupos), { nom, k, Nt } = a;
  const crit = Rn(`qf(${1 - alfa}, ${k - 1}, ${Nt - k})`), pv = Rn(`1 - pf(${a.F}, ${k - 1}, ${Nt - k})`), rech = a.F > crit;
  afirmar(Math.abs(a.F - crit) > 0.15, o.titulo + ": F muy cerca del crítico");
  const bal = a.ni.every((v) => v === a.ni[0]);
  agregar("m18", {
    concepto: "m18-c03", dificultad: 2, titulo: o.titulo,
    enunciado: p(o.intro) + tabla([o.factor, "Observaciones"], nom.map((g) => [g, grupos[g].map((v) => M(v)).join("; ")])) +
      p(String.raw`Usa $\alpha=${pct(alfa)}$.`) + incisos(["Plantea las hipótesis y calcula las medias.", "Calcula $SC_{TRAT}$ y $SC_E$.", "Arma la tabla ANOVA.", "Decide y concluye. ¿Qué harías a continuación?"]),
    partes: [
      { titulo: "a) Hipótesis y medias", puntos: 1,
        solucion: p(String.raw`$H_0:${nom.map((_, i) => `\\mu_${i + 1}`).join("=")}$ contra $H_1$: al menos dos medias son distintas.`, `Medias: ${nom.map((g, i) => `$\\bar y_{${g}}=${N(a.m[i], 3)}$`).join(", ")}; media general $\\bar y=${N(a.mg, 3)}$ ($N=${Nt}$).`) },
      { titulo: "b) Sumas de cuadrados", puntos: 2,
        solucion: p(String.raw`$SC_{TRAT}=\sum n_i(\bar y_i-\bar y)^2=${nom.map((_, i) => `${a.ni[i]}(${N(a.m[i], 3)}-${N(a.mg, 3)})^2`).join("+")}=${N(a.scT, 3)}$.`,
          String.raw`$SC_E=\sum_i\sum_j(y_{ij}-\bar y_i)^2=${a.scEg.map((v) => N(v, 3)).join("+")}=${N(a.scE, 3)}$ (suma, grupo por grupo, de las desviaciones al cuadrado respecto de la media del grupo).`,
          String.raw`Comprobación: $SC_T=SC_{TRAT}+SC_E=${N(a.scT + a.scE, 3)}$.`) },
      { titulo: "c) Tabla ANOVA", puntos: 1.5, solucion: tablaAov(a) + p(String.raw`gl: $k-1=${k - 1}$, $N-k=${Nt - k}$, $N-1=${Nt - 1}$. $CM=SC/\text{gl}$ y $F_0=CM_{TRAT}/CM_E=${N(a.cmT, 3)}/${N(a.cmE, 3)}=${N(a.F, 3)}$.`) },
      { titulo: "d) Decisión, conclusión y pasos siguientes", puntos: 1.5,
        solucion: p(String.raw`Crítico: $F_{${N(alfa)};${k - 1},${Nt - k}}=${N(crit, 3)}$. $F_0=${N(a.F, 3)}${rech ? ">" : "<"}${N(crit, 3)}$ (p-valor $${pv < 0.0001 ? "<0{,}0001" : "=" + N(pv, 4)}$) ⇒ ${rech ? "se <strong>rechaza</strong> $H_0$" : "<strong>no se rechaza</strong> $H_0$"}.`,
          rech ? o.siRechaza + " El F global no dice cuáles difieren: sigue una comparación múltiple (LSD o Tukey)." : o.siNoRechaza + " No corresponde hacer comparaciones múltiples.",
          "En ambos casos se verifican los supuestos con los residuos: normalidad (Q-Q), varianza constante (residuos vs. predichos) e independencia (residuos vs. orden)." + (bal ? "" : " (Diseño desbalanceado: cada grupo pesa según su $n_i$.)")) }
    ],
    verifica: [vr("F (aov)", `{${a.rDatos}; summary(aov(y ~ g, d))[[1]][1, 4]}`, a.F, 3), vr("SC error (aov)", `{${a.rDatos}; summary(aov(y ~ g, d))[[1]][2, 2]}`, a.scE, 3), vr("crítico", `qf(${1 - alfa}, ${k - 1}, ${Nt - k})`, crit, 3)],
    fuente: [{ id: "C7.1", loc: "páginas 36–51" }, { id: "C7.2", loc: "slides 2–9" }]
  });
  return a;
}
function tablaIncompleta(o) {
  const { k, n, scT, scTot, alfa } = o, Nt = k * n, scE = scTot - scT, cmT = scT / (k - 1), cmE = scE / (Nt - k), F = cmT / cmE;
  const crit = Rn(`qf(${1 - alfa}, ${k - 1}, ${Nt - k})`), pv = Rn(`1 - pf(${F}, ${k - 1}, ${Nt - k})`), rech = F > crit;
  afirmar(Math.abs(F - crit) > 0.15, "F cerca del crítico");
  agregar("m18", {
    concepto: "m18-c02", dificultad: 2, titulo: o.titulo,
    enunciado: p(`${o.intro} Se compararon $k=${k}$ tratamientos con $n=${n}$ observaciones cada uno. Completa la tabla:`) +
      tabla(["Fuente", "SC", "gl", "CM", "$F_0$"], [["Tratamientos", M(scT), "?", "?", "?"], ["Error", "?", "?", "?", ""], ["Total", M(scTot), "?", "", ""]]) +
      incisos(["Completa los grados de libertad.", "Completa $SC_E$ y los cuadrados medios.", String.raw`Calcula $F_0$ y decide con $\alpha=${pct(alfa)}$.`]),
    partes: [
      { titulo: "a) Grados de libertad", puntos: 1.5, solucion: p(String.raw`$N=k\cdot n=${Nt}$. Tratamientos: $k-1=${k - 1}$; error: $N-k=${Nt - k}$; total: $N-1=${Nt - 1}$ (y $${k - 1}+${Nt - k}=${Nt - 1}$).`) },
      { titulo: "b) Suma de cuadrados del error y cuadrados medios", puntos: 2,
        solucion: p(String.raw`$SC_E=SC_T-SC_{TRAT}=${N(scTot)}-${N(scT)}=${N(scE)}$.`, String.raw`$CM_{TRAT}=\dfrac{${N(scT)}}{${k - 1}}=${N(cmT, 3)}$; $CM_E=\dfrac{${N(scE)}}{${Nt - k}}=${N(cmE, 3)}$ (estimador de $\sigma^2$).`) },
      { titulo: "c) Estadístico F, valor crítico y decisión", puntos: 2.5,
        solucion: p(String.raw`$F_0=\dfrac{CM_{TRAT}}{CM_E}=\dfrac{${N(cmT, 3)}}{${N(cmE, 3)}}=${N(F, 3)}$.`, String.raw`Crítico: $F_{${N(alfa)};${k - 1},${Nt - k}}=${N(crit, 3)}$ ⇒ $${N(F, 3)}${rech ? ">" : "<"}${N(crit, 3)}$ (p-valor $=${N(pv, 4)}$) ⇒ ${rech ? "se <strong>rechaza</strong> $H_0$: al menos un tratamiento tiene media distinta." : "<strong>no se rechaza</strong> $H_0$: no hay evidencia de diferencias entre las medias de los tratamientos."}`) +
          tabla(["Fuente", "SC", "gl", "CM", "$F_0$"], [["Tratamientos", M(scT), k - 1, M(cmT, 3), M(F, 3)], ["Error", M(scE), Nt - k, M(cmE, 3), ""], ["Total", M(scTot), Nt - 1, "", ""]]) }
    ],
    verifica: [vjs("F", `(${scT}/${k - 1})/((${scTot} - ${scT})/${Nt - k})`, F, 3), vr("crítico", `qf(${1 - alfa}, ${k - 1}, ${Nt - k})`, crit, 3), vr("p-valor", `1 - pf((${scT}/${k - 1})/((${scTot} - ${scT})/${Nt - k}), ${k - 1}, ${Nt - k})`, pv, 4)],
    fuente: [{ id: "C7.1", loc: "páginas 36–41" }, { id: "C7.2", loc: "slides 2–6" }]
  });
}
function lsd(o) {
  const { medias, n, cmE, alfa } = o, nom = Object.keys(medias), k = nom.length, gl = k * n - k;
  const t = Rn(`qt(${1 - alfa / 2}, ${gl})`), L0 = t * Math.sqrt(2 * cmE / n), pares = [];
  for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++) pares.push({ a: nom[i], b: nom[j], d: Math.abs(medias[nom[i]] - medias[nom[j]]) });
  pares.forEach((x) => afirmar(Math.abs(x.d - L0) > 0.03 * L0, `${o.titulo}: diferencia ${x.a}-${x.b} muy cerca del LSD`));
  const sig = pares.filter((x) => x.d > L0), orden = nom.slice().sort((a, b) => medias[b] - medias[a]);
  agregar("m18", {
    concepto: "m18-c06", dificultad: 2, titulo: o.titulo,
    enunciado: p(`${o.intro} El ANOVA resultó significativo, con $CM_E=${N(cmE, 3)}$ y $n=${n}$ observaciones por tratamiento. Medias: ${nom.map((g) => `$\\bar y_{${g}}=${N(medias[g])}$`).join(", ")}.`) +
      incisos(["¿Cuántas comparaciones de pares hay y con cuántos gl se busca el valor $t$?", String.raw`Calcula la diferencia mínima significativa (LSD) con $\alpha=${pct(alfa)}$.`, "Indica qué pares difieren y resume la conclusión. ¿En qué se diferencia Tukey?"]),
    partes: [
      { titulo: "a) Número de pares y valor t", puntos: 1.5, solucion: p(String.raw`Pares: $\dfrac{k(k-1)}{2}=\dfrac{${k}\cdot${k - 1}}{2}=${pares.length}$.`, String.raw`gl del error: $N-k=${k * n}-${k}=${gl}$ ⇒ $t_{\alpha/2;\,N-k}=t_{${N(alfa / 2, 3)};${gl}}=${N(t, 3)}$ (<code>qt(${1 - alfa / 2}, ${gl})</code>).`) },
      { titulo: "b) LSD", puntos: 2, solucion: p(String.raw`$\text{LSD}=t_{\alpha/2,N-k}\sqrt{\dfrac{2\,CM_E}{n}}=${N(t, 3)}\sqrt{\dfrac{2\cdot${N(cmE, 3)}}{${n}}}=${N(t, 3)}\cdot${N(Math.sqrt(2 * cmE / n), 4)}=${N(L0, 3)}$.`, `Se declaran distintas las medias cuya diferencia absoluta supere $${N(L0, 3)}$.`) },
      { titulo: "c) Pares que difieren y conclusión", puntos: 2.5,
        solucion: tabla(["Par", "$|\\bar y_i-\\bar y_j|$", "¿$>$ LSD?"], pares.map((x) => [`${x.a} – ${x.b}`, M(x.d, 3), x.d > L0 ? "<strong>sí</strong>" : "no"])) +
          p(sig.length ? `Difieren: ${sig.map((x) => `${x.a}–${x.b}`).join(", ")}. Orden de las medias: ${orden.join(" > ")}.` : "Ningún par difiere.", o.conclusion || "",
            "LSD usa la $t$ de Student con confianza <strong>individual</strong> (por comparación): es muy sensible/potente. <strong>Tukey</strong> usa el rango estudentizado y controla el error <strong>grupal</strong> (por experimento): es más conservador y puede dejar de declarar significativas las diferencias pequeñas. Si la diferencia es clara, coinciden.") }
    ],
    verifica: [vr("LSD", `qt(${1 - alfa / 2}, ${gl})*sqrt(2*${cmE}/${n})`, L0, 3), vjs("nº de pares", `${k}*(${k}-1)/2`, pares.length, 4)],
    fuente: [{ id: "C7.2", loc: "slides 10–19" }]
  });
}
function tamMuestra(o) {
  const { sigma, dT, k, alfa, n0 } = o, its = []; let n = n0;
  for (let i = 0; i < 6; i++) {
    const gl = k * (n - 1), t = Rn(`qt(${1 - alfa / 2}, ${gl})`), bruto = 2 * t * t * sigma * sigma / (dT * dT), nn = Math.round(bruto);
    its.push({ n, gl, t, bruto, nn });
    if (nn === n) break; n = nn;
  }
  const fin = its[its.length - 1];
  afirmar(fin.nn === fin.n && its.length >= 2 && its.length <= 4 && its.every((x) => Math.abs(x.bruto - Math.round(x.bruto)) < 0.4), `${o.titulo}: no converge limpio (${its.map((x) => x.bruto.toFixed(2)).join(", ")})`);
  const linea = (x) => String.raw`Con $n=${x.n}$: gl $=k(n-1)=${k}\cdot${x.n - 1}=${x.gl}$ ⇒ $t_{${N(1 - alfa / 2, 3)};${x.gl}}=${N(x.t, 3)}$ ⇒ $n=\dfrac{2\cdot${N(x.t, 3)}^2\cdot${N(sigma)}^2}{${N(dT)}^2}=${N(x.bruto, 2)}\approx${x.nn}$.`;
  agregar("m18", {
    concepto: "m18-c07", dificultad: 2, titulo: o.titulo,
    enunciado: p(String.raw`${o.intro} Se compararán $k=${k}$ tratamientos. Se estima $\sigma=${N(sigma)}$ y se quiere detectar una diferencia mínima entre tratamientos de $d_T=${N(dT)}$, con $\alpha=${pct(alfa)}$.`) +
      incisos([String.raw`Escribe la fórmula del número de réplicas por tratamiento y aplícala partiendo de un valor tentativo $n=${n0}$.`, "Itera hasta que el valor se estabilice.", "¿Cuántas corridas se necesitan en total? ¿Es coherente con la recomendación general de la clase?"]),
    partes: [
      { titulo: "a) Fórmula y primera iteración", puntos: 2.5, solucion: p(String.raw`$n=\dfrac{2\,t^2\,\sigma^2}{d_T^2}$, con $t=t_{\alpha/2}$ de los gl del error, $k(n-1)$. Como $t$ depende de $n$, se parte de un valor tentativo y se itera.`, linea(its[0])) },
      { titulo: "b) Iteraciones siguientes", puntos: 2.5, solucion: p(...its.slice(1).map(linea), `El valor se repite ⇒ <strong>$n=${fin.n}$ réplicas por tratamiento</strong>.`) },
      { titulo: "c) Corridas totales y recomendación general", puntos: 1,
        solucion: p(String.raw`Total: $N=k\cdot n=${k}\cdot${fin.n}=${k * fin.n}$ corridas.`, `Recomendación de la clase: entre 5 y 30 mediciones por tratamiento (≈10 con datos consistentes, ≈30 con mucha dispersión). ${fin.n >= 5 && fin.n <= 30 ? "El resultado cae dentro de ese rango." : fin.n < 5 ? "El resultado queda por debajo: conviene usar al menos 5." : "El resultado supera el rango: la diferencia que se quiere detectar es pequeña frente a la variabilidad."}`,
          "A mayor $\\sigma$ o menor $d_T$, más réplicas se necesitan. Aquí se redondea al entero más cercano, como en el ejemplo de la clase ($5{,}1\\Rightarrow5$); un criterio más conservador es redondear hacia arriba.") }
    ],
    verifica: [vr("n de la última iteración", `2*qt(${1 - alfa / 2}, ${fin.gl})^2*${sigma}^2/${dT}^2`, fin.bruto, 2), vr("n de la primera iteración", `2*qt(${1 - alfa / 2}, ${its[0].gl})^2*${sigma}^2/${dT}^2`, its[0].bruto, 2)],
    fuente: [{ id: "C7.2", loc: "slides 20–21" }, { id: "C7.1", loc: "página 31" }]
  });
}
function tukeyLectura(o) {
  const { grupos, alfa } = o, a = calcAnova(grupos), nom = a.nom;
  const codigo = `datos <- data.frame(
  respuesta = ${rvec(nom.flatMap((g) => grupos[g]))},
  ${o.factorR} = factor(rep(c(${nom.map((g) => `"${g}"`).join(", ")}), each = ${a.ni[0]})))
modelo <- aov(respuesta ~ ${o.factorR}, data = datos)
TukeyHSD(modelo)`;
  const salida = Rtxt(codigo).replace(/\s+$/, "");
  const filas = salida.split("\n").map((l) => l.match(/^(\S+)-(\S+)\s+(-?[\d.]+)\s+(-?[\d.]+)\s+(-?[\d.]+)\s+([\d.]+)$/)).filter(Boolean).map((m) => ({ par: `${m[1]}–${m[2]}`, dif: +m[3], li: +m[4], ls: +m[5], padj: +m[6] }));
  afirmar(filas.length === nom.length * (nom.length - 1) / 2 && filas.every((f) => Math.abs(f.padj - alfa) > 0.01), "no se pudo leer la salida de TukeyHSD o hay un p-valor en el borde");
  const sig = filas.filter((f) => f.padj < alfa), nosig = filas.filter((f) => f.padj >= alfa);
  agregar("m18", {
    concepto: "m18-c06", dificultad: 2, origen: "nueva", titulo: o.titulo,
    enunciado: p(`${o.intro} Tras un ANOVA significativo se ejecutó la prueba de Tukey:`) + incisos(["¿Cuántas comparaciones se hacen y qué significa cada columna?", String.raw`¿Qué pares difieren con $\alpha=${pct(alfa)}$? Indica dos formas de verlo en la salida.`, "Resume la conclusión y explica por qué se usa Tukey y no varias pruebas t."]),
    codigoR: codigo, salidaR: salida, salidaDe: codigo,
    partes: [
      { titulo: "a) Número de comparaciones y columnas", puntos: 1.5, solucion: p(String.raw`$k(k-1)/2=${nom.length}\cdot${nom.length - 1}/2=${filas.length}$ comparaciones.`, `<code>diff</code>: diferencia de medias, el primero del nombre de la fila menos el segundo (p. ej. <code>${filas[0].par.replace("–", "-")}</code> es $\\bar y_{${filas[0].par.split("–")[0]}}-\\bar y_{${filas[0].par.split("–")[1]}}$); <code>lwr</code> y <code>upr</code>: intervalo de confianza simultáneo de la diferencia; <code>p adj</code>: p-valor ajustado por comparaciones múltiples.`) },
      { titulo: "b) Pares que difieren", puntos: 2.5,
        solucion: p(`Un par difiere si <code>p adj</code> $<${N(alfa)}$ o, equivalentemente, si su intervalo <strong>no contiene el 0</strong>.`, sig.length ? `Difieren: ${sig.map((f) => `${f.par} (dif $=${N(f.dif, 3)}$, p adj $=${N(f.padj, 4)}$)`).join("; ")}.` : "Ningún par difiere.",
          nosig.length ? `No difieren: ${nosig.map((f) => `${f.par} (p adj $=${N(f.padj, 4)}$, IC $[${N(f.li, 2)};\\ ${N(f.ls, 2)}]$ contiene el 0)`).join("; ")}.` : "Todos los pares difieren.") },
      { titulo: "c) Conclusión y por qué Tukey", puntos: 2,
        solucion: p(o.conclusion, "Hacer varias pruebas t por separado infla la probabilidad de error tipo I global; Tukey controla la tasa de error <strong>por experimento</strong> (confianza grupal). El LSD de Fisher, con confianza individual, es más potente pero declara más diferencias falsas.") }
    ],
    fuente: [{ id: "C7.2", loc: "slides 10–19" }, { id: "S7.2", loc: "líneas 14–27" }]
  });
}
function m18() {
  const aF = anova({ titulo: "ANOVA a mano: tres fertilizantes", intro: "Se mide el rendimiento (kg por parcela) con tres fertilizantes, 4 parcelas cada uno:", factor: "Fertilizante", alfa: 0.05,
    grupos: { A: [20, 22, 19, 23], B: [25, 27, 26, 30], C: [21, 20, 24, 23] }, siRechaza: "El fertilizante influye en el rendimiento medio.", siNoRechaza: "No hay evidencia de que el fertilizante influya en el rendimiento medio." });
  const aM = anova({ titulo: "ANOVA a mano: cuatro máquinas", intro: "Se registra la producción por hora de cuatro máquinas, 3 mediciones cada una:", factor: "Máquina", alfa: 0.05,
    grupos: { M1: [50, 52, 51], M2: [55, 57, 56], M3: [49, 50, 48], M4: [54, 53, 55] }, siRechaza: "Al menos una máquina tiene una producción media distinta.", siNoRechaza: "No hay evidencia de diferencias entre máquinas." });
  anova({ titulo: "ANOVA a mano: tres turnos (¿hay diferencias?)", intro: "Unidades defectuosas por lote en tres turnos, 5 lotes cada uno:", factor: "Turno", alfa: 0.05,
    grupos: { Mañana: [30, 34, 29, 35, 32], Tarde: [33, 31, 36, 30, 35], Noche: [28, 33, 31, 34, 29] }, siRechaza: "El turno influye en el número medio de defectuosos.", siNoRechaza: "No hay evidencia de que el turno influya en el número medio de defectuosos: las diferencias entre medias son pequeñas frente a la variabilidad dentro de cada turno." });
  anova({ titulo: "ANOVA con tamaños de muestra distintos", intro: "Tiempo de respuesta (segundos) de tres servidores, con distinto número de pruebas:", factor: "Servidor", alfa: 0.05,
    grupos: { S1: [8, 10, 9], S2: [12, 11, 14, 13], S3: [9, 11, 10, 12, 8] }, siRechaza: "El tiempo medio de respuesta difiere entre servidores.", siNoRechaza: "No hay evidencia de diferencias entre servidores." });
  anova({ titulo: "ANOVA a mano con α = 1 %: tres métodos de capacitación", intro: "Puntaje final de 12 trabajadores asignados al azar a tres métodos de capacitación:", factor: "Método", alfa: 0.01,
    grupos: { Presencial: [78, 82, 80, 84], Online: [72, 75, 70, 71], Mixto: [80, 79, 83, 86] }, siRechaza: "Al $1\\,\\%$ hay evidencia de que el método de capacitación influye en el puntaje medio.", siNoRechaza: "Al $1\\,\\%$ no hay evidencia de diferencias entre métodos." });
  tablaIncompleta({ titulo: "Completar una tabla ANOVA (k = 4, n = 6)", intro: "De un experimento se conserva solo parte de la tabla ANOVA.", k: 4, n: 6, scT: 84, scTot: 244, alfa: 0.05 });
  tablaIncompleta({ titulo: "Completar una tabla ANOVA (k = 3, n = 8)", intro: "Un informe trae la tabla ANOVA incompleta.", k: 3, n: 8, scT: 30, scTot: 240, alfa: 0.05 });
  tablaIncompleta({ titulo: "Completar una tabla ANOVA (k = 5, n = 4, α = 1 %)", intro: "Se compararon cinco proveedores y la tabla quedó incompleta.", k: 5, n: 4, scT: 152, scTot: 242, alfa: 0.01 });
  lsd({ titulo: "LSD de Fisher con tres fertilizantes", intro: "Experimento con tres fertilizantes (rendimiento en kg por parcela).", n: 4, cmE: aF.cmE, alfa: 0.05, medias: Object.fromEntries(aF.nom.map((g, i) => [g, aF.m[i]])), conclusion: "B rinde más que A y que C; entre A y C no hay diferencia: conviene B." });
  lsd({ titulo: "LSD de Fisher con cuatro máquinas", intro: "Experimento con cuatro máquinas (producción por hora).", n: 3, cmE: aM.cmE, alfa: 0.05, medias: Object.fromEntries(aM.nom.map((g, i) => [g, aM.m[i]])), conclusion: "Todas las máquinas difieren entre sí: M2 es la de mayor producción y M3 la de menor." });
  lsd({ titulo: "LSD de Fisher con cuatro dietas (grupos que se traslapan)", intro: "Se compara la ganancia de peso con cuatro dietas.", n: 5, cmE: 6.4, alfa: 0.05, medias: { D1: 40.2, D2: 44.9, D3: 41.8, D4: 47.6 }, conclusion: "Se forman grupos: D1 y D3 no difieren entre sí, D2 y D4 tampoco; D4 supera a D1 y D3, y D2 supera a D1." });
  tamMuestra({ titulo: "Tamaño de muestra por tratamiento (k = 4)", intro: "Se planifica un experimento para comparar métodos de ensamble.", sigma: 2, dT: 2.4, k: 4, alfa: 0.05, n0: 5 });
  tamMuestra({ titulo: "Tamaño de muestra por tratamiento (k = 3)", intro: "Se planifica un experimento para comparar tres proveedores.", sigma: 3, dT: 3.3, k: 3, alfa: 0.05, n0: 5 });
  tukeyLectura({ titulo: "Leer la salida de TukeyHSD (cuatro máquinas)", intro: "Producción por hora de cuatro máquinas (3 mediciones cada una).", factorR: "maquina", alfa: 0.05, grupos: { M1: [50, 52, 51], M2: [55, 57, 56], M3: [49, 50, 48], M4: [54, 53, 55] },
    conclusion: "M2 y M4 producen más que M1 y M3. Dentro de cada pareja (M2 con M4, M1 con M3) Tukey no detecta diferencia, aunque el LSD sí lo haría: Tukey es más conservador." });
  tukeyLectura({ titulo: "Leer la salida de TukeyHSD (tres fertilizantes)", intro: "Rendimiento (kg por parcela) con tres fertilizantes, 4 parcelas cada uno.", factorR: "fertilizante", alfa: 0.05, grupos: { A: [20, 22, 19, 23], B: [25, 27, 26, 30], C: [21, 20, 24, 23] },
    conclusion: "El fertilizante B rinde más que A y que C; A y C no se distinguen. Se recomienda B." });
}

/* ══ M19 · MANOVA ══════════════════════════════════════════════════════ */
function wilks(o) {
  const { W, B, g, Nt, vars } = o, T = W.map((f, i) => f.map((v, j) => v + B[i][j])), dW = det2(W), dT = det2(T), lam = dW / dT;
  afirmar(dW > 0 && det2(B) >= -1e-9 && B[0][0] >= 0, "W o B no válidas");
  const F = (1 - Math.sqrt(lam)) / Math.sqrt(lam) * (Nt - g - 1) / (g - 1), n1 = 2 * (g - 1), n2 = 2 * (Nt - g - 1), pv = Rn(`1 - pf(${F}, ${n1}, ${n2})`), rech = pv < 0.05;
  afirmar(Math.abs(pv - 0.05) > 0.01, "p-valor en el borde");
  agregar("m19", {
    concepto: "m19-c03", dificultad: 3, titulo: o.titulo,
    enunciado: p(String.raw`${o.intro} Se comparan $g=${g}$ grupos ($N=${Nt}$ observaciones en total) en $p=2$ respuestas: ${vars.join(" y ")}. Las matrices de sumas de cuadrados y productos son $$W=${pm(W)}\quad(\text{dentro}),\qquad B=${pm(B)}\quad(\text{entre}).$$`) +
      incisos(["Plantea las hipótesis del MANOVA y calcula $T$, $|W|$ y $|T|$.", "Calcula la $\\Lambda$ de Wilks e interprétala.", String.raw`R entrega <code>approx F = ${rd(F, 3)}</code> con <code>num Df = ${n1}</code> y <code>den Df = ${n2}</code>, p-valor $${pv < 0.0001 ? "<0{,}0001" : "=" + N(pv, 4)}$. Verifica <code>num Df</code>, decide con $\alpha=5\,\%$ y concluye.`]),
    partes: [
      { titulo: "a) Hipótesis, matriz T y determinantes", puntos: 2,
        solucion: p(String.raw`$H_0:\mu_1=\dots=\mu_${g}$ (vectores de medias iguales) contra $H_1$: al menos un grupo difiere en alguna respuesta.`, String.raw`$T=W+B=${pm(T)}$.`,
          String.raw`$|W|=${N(W[0][0])}\cdot${N(W[1][1])}-(${N(W[0][1])})^2=${N(dW, 3)}$; $|T|=${N(T[0][0])}\cdot${N(T[1][1])}-(${N(T[0][1])})^2=${N(dT, 3)}$.`) },
      { titulo: "b) Λ de Wilks e interpretación", puntos: 2,
        solucion: p(String.raw`$\Lambda=\dfrac{|W|}{|W+B|}=\dfrac{${N(dW, 3)}}{${N(dT, 3)}}=${N(lam, 4)}$.`, `$\\Lambda$ está entre $0$ y $1$: cerca de $1$ ⇒ los grupos casi no difieren ($B\\approx0$); cerca de $0$ ⇒ grupos muy distintos. Aquí aproximadamente el $${N(100 * lam, 1)}\\,\\%$ de la variabilidad multivariada queda <strong>sin explicar</strong> por el factor. Se rechaza $H_0$ cuando $\\Lambda$ es pequeña.`) },
      { titulo: "c) Grados de libertad, decisión y conclusión", puntos: 2,
        solucion: p(String.raw`<code>num Df</code> $=p(g-1)=2\cdot${g - 1}=${n1}$ ✓.`, `p-valor $${pv < 0.0001 ? "<0{,}0001" : "=" + N(pv, 4)}$, ${rech ? "menor que $0{,}05$ ⇒ se <strong>rechaza</strong> $H_0$" : "mayor que $0{,}05$ ⇒ <strong>no se rechaza</strong> $H_0$"}.`, rech ? o.siRechaza + " Como seguimiento se hacen los ANOVA univariados (<code>summary.aov</code>) y comparaciones múltiples para ver en qué respuesta y entre qué grupos está la diferencia." : o.siNoRechaza,
          "Supuestos: normalidad multivariada (Mardia), covarianzas iguales (Box's M) e independencia. En R: <code>summary(manova(cbind(y1, y2) ~ grupo), test = \"Wilks\")</code>.") }
    ],
    verifica: [vr("Λ", `det(${rmat(W)})/det(${rmat(W)} + ${rmat(B)})`, lam, 4), vjs("num Df", `2*(${g}-1)`, n1, 4), vjs("|T|", `${T[0][0]}*${T[1][1]} - (${T[0][1]})**2`, dT, 3)],
    fuente: [{ id: "C7.2", loc: "slides 29–30" }, { id: "CMAN", loc: "páginas 5–6" }]
  });
}
function m19() {
  wilks({ titulo: "Λ de Wilks a mano: tres metodologías y dos notas", intro: "Se evalúan tres metodologías de enseñanza.", vars: ["nota de Matemática", "nota de Lenguaje"], g: 3, Nt: 30, W: [[40, 10], [10, 30]], B: [[60, 20], [20, 15]],
    siRechaza: "La metodología afecta el rendimiento conjunto en Matemática y Lenguaje.", siNoRechaza: "No hay evidencia de que la metodología afecte el rendimiento conjunto." });
  wilks({ titulo: "Λ de Wilks cuando los grupos se parecen", intro: "Se comparan cuatro sucursales.", vars: ["satisfacción del cliente", "tiempo de atención"], g: 4, Nt: 40, W: [[120, 30], [30, 90]], B: [[9, 3], [3, 8]],
    siRechaza: "Las sucursales difieren en el perfil conjunto de satisfacción y tiempo.", siNoRechaza: "No hay evidencia de que las sucursales difieran en el perfil conjunto de satisfacción y tiempo de atención." });
  wilks({ titulo: "Λ de Wilks con dos grupos", intro: "Se comparan dos procesos de fabricación.", vars: ["resistencia", "peso"], g: 2, Nt: 24, W: [[50, -12], [-12, 36]], B: [[18, -9], [-9, 4.5]],
    siRechaza: "Los dos procesos difieren en el vector de medias de resistencia y peso (con dos grupos el MANOVA equivale al $T^2$ de Hotelling de dos muestras).", siNoRechaza: "No hay evidencia de que los procesos difieran." });
  agregar("m19", {
    concepto: "m19-c04", dificultad: 2, origen: "nueva", titulo: "MANOVA: supuestos y elección del estadístico",
    enunciado: p("Se quiere comparar $g=3$ dietas en $p=3$ respuestas (peso, colesterol y presión) con $15$ personas por dieta. Antes del MANOVA se obtuvo: test de Mardia, asimetría p-valor $=0{,}31$ y curtosis p-valor $=0{,}47$; Box's M, p-valor $=0{,}02$.") +
      incisos(["¿Por qué un MANOVA y no tres ANOVA separados?", "Interpreta el test de Mardia.", "Calcula los gl de Box's M e interpreta su resultado. ¿Qué estadístico conviene informar?"]),
    partes: [
      { titulo: "a) Por qué MANOVA", puntos: 2, solucion: p("Tres ANOVA separados <strong>inflan el error tipo I</strong> global (con $\\alpha=0{,}05$ en cada uno, la probabilidad de al menos un falso rechazo es mayor que $0{,}05$) e ignoran la <strong>correlación</strong> entre las respuestas. El MANOVA contrasta de una vez $H_0:\\mu_1=\\mu_2=\\mu_3$ (vectores de medias) y puede detectar diferencias en combinaciones de las variables.") },
      { titulo: "b) Normalidad multivariada (Mardia)", puntos: 1.5, solucion: p("$H_0$: los datos siguen una normal multivariada. Ambos p-valores ($0{,}31$ y $0{,}47$) son mayores que $0{,}05$ ⇒ no se rechaza: el supuesto de normalidad multivariada es razonable. En R: <code>MVN::mvn(X, mvnTest = \"mardia\")</code>.") },
      { titulo: "c) Box's M y estadístico recomendado", puntos: 2.5, solucion: p("gl $=\\dfrac{p(p+1)}{2}(g-1)=\\dfrac{3\\cdot4}{2}\\cdot2=12$.", "$H_0$: las matrices de covarianza son iguales en los tres grupos. p-valor $=0{,}02<0{,}05$ ⇒ se rechaza: hay evidencia de covarianzas distintas.", "Como los tamaños de grupo son <strong>iguales</strong>, el MANOVA es relativamente robusto a esta violación; conviene informar la <strong>traza de Pillai</strong>, que es el estadístico más robusto cuando falla la homogeneidad (<code>summary(fit, test = \"Pillai\")</code>).") }
    ],
    verifica: [vjs("gl Box's M", "3*4/2*2", 12, 4)],
    fuente: [{ id: "C7.2", loc: "slides 26–31" }, { id: "CMAN", loc: "páginas 8–9 y 13" }]
  });
}

module.exports = { m15, m16, m17, m18, m19 };
