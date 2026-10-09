/* Generadores de desarrollo · M05–M10 (P1) */
"use strict";
const L = require("./lib");
const { Rn, Rv, Rtxt, rd, N, M, pct, suma, media, varianza, desv, det2, inv2, mv2, dot, afirmar, tabla, pm, vec, incisos, p, rvec, rmat, vjs, vr, agregar } = L;

const SIGNO = { der: [String.raw`\le`, ">"], izq: [String.raw`\ge`, "<"], bil: ["=", String.raw`\neq`] };
const NOMBRE_COLA = { der: "cola derecha", izq: "cola izquierda", bil: "bilateral (dos colas)" };
const hip = (par, v0, cola) => `$H_0:${par}${SIGNO[cola][0]}${v0}$ contra $H_1:${par}${SIGNO[cola][1]}${v0}$`;
const dec = (rech) => (rech ? "se <strong>rechaza</strong> $H_0$" : "<strong>no se rechaza</strong> $H_0$");
const pvTxt = (pv) => (pv < 0.0001 ? "<0{,}0001" : "=" + N(pv, 4));

/* ══ M05 · Una población: t, Z, proporción y varianza ══════════════════ */
function unaPoblacion(o) {
  const { tipo, cola, alfa, n } = o;
  let par, v0, est, estTxt, crit, critTxt, pv, rech, hipExtra = "", nombreEst, verif = [], concepto, fuente, enR;
  const q = cola === "bil" ? 1 - alfa / 2 : 1 - alfa;
  if (tipo === "t" || tipo === "z") {
    par = "\\mu"; v0 = N(o.mu0, 4);
    const sd = tipo === "t" ? o.s : o.sigma, ee = sd / Math.sqrt(n);
    est = (o.xbar - o.mu0) / ee; nombreEst = tipo;
    const dist = tipo === "t" ? `t(${est}, ${n - 1})` : `norm(${est})`;
    const c0 = tipo === "t" ? Rn(`qt(${q}, ${n - 1})`) : Rn(`qnorm(${q})`);
    crit = c0;
    pv = cola === "der" ? Rn(`1 - p${dist}`) : cola === "izq" ? Rn(`p${dist}`) : Rn(`2 * (1 - p${tipo === "t" ? `t(${Math.abs(est)}, ${n - 1})` : `norm(${Math.abs(est)})`})`);
    estTxt = String.raw`$${tipo}=\dfrac{\bar x-\mu_0}{${tipo === "t" ? "s" : "\\sigma"}/\sqrt n}=\dfrac{${N(o.xbar, 4)}-${N(o.mu0, 4)}}{${N(sd, 4)}/\sqrt{${n}}}=\dfrac{${N(o.xbar - o.mu0, 4)}}{${N(ee, 4)}}=${N(est, 3)}$` + (tipo === "t" ? ` con $n-1=${n - 1}$ gl (σ desconocida ⇒ $t$ de Student).` : " (σ conocida ⇒ normal estándar).");
    const nomCrit = tipo === "t" ? `t_{${N(q, 3)};${n - 1}}` : `z_{${N(q, 3)}}`;
    critTxt = cola === "bil" ? `Bilateral: se rechaza si $|${tipo}|>${nomCrit}=${N(c0, 3)}$.` : cola === "der" ? `Cola derecha: se rechaza si $${tipo}>${nomCrit}=${N(c0, 3)}$.` : `Cola izquierda: se rechaza si $${tipo}<-${nomCrit}=-${N(c0, 3)}$.`;
    rech = cola === "bil" ? Math.abs(est) > c0 : cola === "der" ? est > c0 : est < -c0;
    afirmar(Math.abs(Math.abs(est) - c0) > 0.04, o.titulo + ": estadístico muy cerca del crítico");
    concepto = tipo === "t" ? "m05-c02" : "m05-c03"; fuente = [{ id: "C2", loc: tipo === "t" ? "slides 5–9" : "slides 10–11" }];
    enR = tipo === "t" ? "Con los datos originales: <code>t.test(x, mu = …, alternative = …)</code>." : "Con los datos originales: <code>BSDA::z.test(x, mu = …, sigma.x = …)</code>.";
    verif = [vjs(nombreEst, `(${o.xbar} - ${o.mu0})/(${sd}/Math.sqrt(${n}))`, est, 3), vr("crítico", tipo === "t" ? `qt(${q}, ${n - 1})` : `qnorm(${q})`, c0, 3)];
  } else if (tipo === "prop") {
    par = "p"; v0 = N(o.p0, 4);
    const ph = o.x / n, ee = Math.sqrt(o.p0 * (1 - o.p0) / n);
    est = (ph - o.p0) / ee; nombreEst = "z";
    afirmar(n * o.p0 >= 5 && n * (1 - o.p0) >= 5, "no cumple el requisito");
    hipExtra = String.raw`Requisito: $np_0=${n}\cdot${N(o.p0)}=${N(n * o.p0)}\ge5$ y $n(1-p_0)=${N(n * (1 - o.p0))}\ge5$ ⇒ vale la aproximación normal.`;
    const c0 = Rn(`qnorm(${q})`); crit = c0;
    pv = cola === "der" ? Rn(`1 - pnorm(${est})`) : cola === "izq" ? Rn(`pnorm(${est})`) : Rn(`2 * (1 - pnorm(${Math.abs(est)}))`);
    estTxt = String.raw`$\hat p=${o.x}/${n}=${N(ph, 4)}$. $z=\dfrac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}=\dfrac{${N(ph, 4)}-${N(o.p0)}}{\sqrt{${N(o.p0)}\cdot${N(1 - o.p0)}/${n}}}=\dfrac{${N(ph - o.p0, 4)}}{${N(ee, 5)}}=${N(est, 3)}$. En el denominador va $p_0$, no $\hat p$.`;
    critTxt = cola === "bil" ? `Bilateral: se rechaza si $|z|>z_{${N(q, 3)}}=${N(c0, 3)}$; p-valor $=2P(Z>|z|)$.` : cola === "der" ? `Cola derecha: se rechaza si $z>z_{${N(q, 3)}}=${N(c0, 3)}$.` : `Cola izquierda: se rechaza si $z<-z_{${N(q, 3)}}=-${N(c0, 3)}$.`;
    rech = cola === "bil" ? Math.abs(est) > c0 : cola === "der" ? est > c0 : est < -c0;
    afirmar(Math.abs(Math.abs(est) - c0) > 0.04, o.titulo + ": estadístico muy cerca del crítico");
    concepto = "m05-c04"; fuente = [{ id: "C2", loc: "slides 12–16" }, { id: "AY2-E", loc: "P1" }];
    const alt = { der: "greater", izq: "less", bil: "two.sided" }[cola];
    enR = `En R: <code>prop.test(${o.x}, ${n}, ${o.p0}, "${alt}", correct = FALSE)</code> da $X^2=z^2=${N(est * est, 3)}$.`;
    verif = [vr("z² (prop.test)", `prop.test(${o.x}, ${n}, ${o.p0}, "${alt}", correct = FALSE)$statistic`, est * est, 3), vr("p-valor (prop.test)", `prop.test(${o.x}, ${n}, ${o.p0}, "${alt}", correct = FALSE)$p.value`, pv, 4)];
  } else {
    par = "\\sigma^2"; v0 = N(o.var0, 4);
    est = (n - 1) * o.s2 / o.var0; nombreEst = "\\chi^2";
    const gl = n - 1;
    estTxt = String.raw`$\chi^2=\dfrac{(n-1)s^2}{\sigma_0^2}=\dfrac{${gl}\cdot${N(o.s2, 4)}}{${N(o.var0, 4)}}=${N(est, 3)}$ con $n-1=${gl}$ gl.` + (o.notaDesv ? " " + o.notaDesv : "");
    if (cola === "bil") {
      const [ci, cs] = Rv(`qchisq(c(${alfa / 2}, ${1 - alfa / 2}), ${gl})`);
      crit = cs; critTxt = String.raw`Bilateral: se rechaza si $\chi^2<\chi^2_{${N(alfa / 2, 3)};${gl}}=${N(ci, 3)}$ o $\chi^2>\chi^2_{${N(1 - alfa / 2, 3)};${gl}}=${N(cs, 3)}$.`;
      rech = est < ci || est > cs; pv = Rn(`2 * min(pchisq(${est}, ${gl}), 1 - pchisq(${est}, ${gl}))`);
      afirmar(Math.abs(est - ci) > 0.3 && Math.abs(est - cs) > 0.3, "muy cerca del crítico");
    } else if (cola === "der") {
      crit = Rn(`qchisq(${1 - alfa}, ${gl})`); critTxt = String.raw`Cola derecha: se rechaza si $\chi^2>\chi^2_{${N(1 - alfa, 3)};${gl}}=${N(crit, 3)}$.`;
      rech = est > crit; pv = Rn(`1 - pchisq(${est}, ${gl})`);
    } else {
      crit = Rn(`qchisq(${alfa}, ${gl})`); critTxt = String.raw`Cola izquierda: se rechaza si $\chi^2<\chi^2_{${N(alfa, 3)};${gl}}=${N(crit, 3)}$ (el cuantil <strong>inferior</strong>: <code>qchisq(${alfa}, ${gl})</code>).`;
      rech = est < crit; pv = Rn(`pchisq(${est}, ${gl})`);
    }
    concepto = "m05-c05"; fuente = [{ id: "C2", loc: "slides 17–20" }, { id: "AY2-E", loc: "P3(a)" }];
    enR = "La prueba supone población normal. En R se calcula a mano con <code>qchisq()</code> y <code>pchisq()</code>.";
    verif = [vjs("χ²", `(${n} - 1)*${o.s2}/${o.var0}`, est, 3), vr("crítico", `qchisq(${cola === "izq" ? alfa : cola === "der" ? 1 - alfa : 1 - alfa / 2}, ${gl})`, crit, 3)];
  }
  agregar("m05", {
    concepto, dificultad: o.dificultad || 2, titulo: o.titulo,
    enunciado: p(o.intro + String.raw` Usa $\alpha=${pct(alfa)}$.`) + incisos(["Plantea las hipótesis" + (tipo === "prop" ? " y verifica el requisito de la prueba." : " e indica qué prueba corresponde."), "Calcula el estadístico de prueba.", "Indica la región de rechazo (valor crítico).", "Decide y concluye en el contexto del problema."]),
    partes: [
      { titulo: "a) Hipótesis" + (tipo === "prop" ? " y requisito" : " y tipo de prueba"), puntos: 1.5,
        solucion: p(`${hip(par, v0, cola)} — prueba ${NOMBRE_COLA[cola]}. ${o.porque}`, hipExtra || { t: "Media con σ desconocida y se usa $s$ ⇒ prueba $t$.", z: "Media con σ poblacional conocida ⇒ prueba $Z$.", chi: "Parámetro de dispersión ⇒ prueba $\\chi^2$ para la varianza." }[tipo]) },
      { titulo: "b) Estadístico de prueba", puntos: 2, solucion: p(estTxt) },
      { titulo: "c) Región de rechazo", puntos: 1, solucion: p(critTxt) },
      { titulo: "d) Decisión y conclusión en contexto", puntos: 1.5,
        solucion: p(String.raw`Estadístico $=${N(est, 3)}$; p-valor $${pvTxt(pv)}$, ${pv <= alfa ? "menor o igual" : "mayor"} que $\alpha=${N(alfa)}$ ⇒ ${dec(rech)}.`, rech ? o.siRechaza : o.siNoRechaza + " (No rechazar no prueba que $H_0$ sea verdadera.)", enR) }
    ],
    verifica: verif, fuente
  });
  afirmar(rech === (pv <= alfa), o.titulo + ": crítico y p-valor no coinciden");
}
function m05() {
  unaPoblacion({ tipo: "t", cola: "bil", alfa: 0.05, n: 16, xbar: 496.5, s: 6.2, mu0: 500, titulo: "Llenado de botellas (prueba t bilateral)",
    intro: "Una máquina debe llenar botellas con $500$ ml en promedio. En una muestra de $n=16$ botellas se obtuvo $\\bar x=496{,}5$ ml y $s=6{,}2$ ml (población normal). ¿Está descalibrada la máquina?",
    porque: "«Descalibrada» es desviarse hacia cualquier lado.", siRechaza: "Al $5\\,\\%$ hay evidencia de que el llenado medio difiere de $500$ ml: la máquina está descalibrada.", siNoRechaza: "No hay evidencia de que la máquina esté descalibrada." });
  unaPoblacion({ tipo: "t", cola: "der", alfa: 0.05, n: 25, xbar: 8.6, s: 1.9, mu0: 8, titulo: "Tiempo de atención (prueba t de cola derecha)",
    intro: "Un banco declara que el tiempo medio de atención es a lo más $8$ minutos. Una muestra de $n=25$ clientes dio $\\bar x=8{,}6$ y $s=1{,}9$ minutos. ¿Hay evidencia de que el tiempo medio supera lo declarado?",
    porque: "Lo que se quiere demostrar (superar los 8 minutos) va en $H_1$.", siRechaza: "Hay evidencia de que el tiempo medio de atención supera los $8$ minutos.", siNoRechaza: "Con un $5\\,\\%$ de significancia no hay evidencia de que el tiempo medio supere los $8$ minutos declarados." });
  unaPoblacion({ tipo: "t", cola: "izq", alfa: 0.01, n: 10, xbar: 38.2, s: 2.5, mu0: 40, titulo: "Duración de baterías con α = 1 % (cola izquierda)",
    intro: "Un fabricante asegura que sus baterías duran al menos $40$ horas en promedio. En $n=10$ baterías se midió $\\bar x=38{,}2$ y $s=2{,}5$ horas. ¿Hay evidencia de que duran menos?",
    porque: "La sospecha (duran menos) va en $H_1$.", siRechaza: "Hay evidencia de que la duración media es menor que $40$ horas.", siNoRechaza: "Al $1\\,\\%$ no hay evidencia suficiente de que la duración media sea menor que $40$ horas (al $5\\,\\%$ sí se rechazaría: la conclusión depende de $\\alpha$)." });
  unaPoblacion({ tipo: "t", cola: "der", alfa: 0.05, n: 9, xbar: 73.4, s: 4.8, mu0: 70, titulo: "Rendimiento de un proceso (prueba t, muestra pequeña)",
    intro: "Un proceso químico rinde históricamente $70\\,\\%$. Tras un ajuste, $n=9$ corridas dan $\\bar x=73{,}4$ y $s=4{,}8$. ¿Aumentó el rendimiento medio?",
    porque: "Se busca evidencia de aumento.", siRechaza: "Hay evidencia de que el ajuste aumentó el rendimiento medio por sobre $70\\,\\%$.", siNoRechaza: "No hay evidencia de que el rendimiento medio haya aumentado." });
  unaPoblacion({ tipo: "z", cola: "bil", alfa: 0.05, n: 36, xbar: 10.21, sigma: 0.5, mu0: 10, titulo: "Diámetro de piezas con σ conocida (prueba Z bilateral)",
    intro: "El diámetro de una pieza debe ser $10$ mm; se sabe que $\\sigma=0{,}5$ mm. Una muestra de $n=36$ piezas da $\\bar x=10{,}21$ mm. ¿Se ha desajustado el proceso?",
    porque: "Interesa un desajuste en cualquier dirección.", siRechaza: "Hay evidencia de que el diámetro medio difiere de $10$ mm: el proceso está desajustado.", siNoRechaza: "No hay evidencia de desajuste." });
  unaPoblacion({ tipo: "z", cola: "izq", alfa: 0.05, n: 49, xbar: 246.4, sigma: 12, mu0: 250, titulo: "Contenido neto con σ conocida (prueba Z de cola izquierda)",
    intro: "Un envase declara $250$ g. Se sabe que $\\sigma=12$ g. En $n=49$ envases se obtiene $\\bar x=246{,}4$ g. ¿Hay evidencia de que el contenido medio es menor que el declarado?",
    porque: "La sospecha (menos contenido) va en $H_1$.", siRechaza: "Hay evidencia de que el contenido medio es menor que los $250$ g declarados.", siNoRechaza: "No hay evidencia de que el contenido medio sea menor que $250$ g." });
  unaPoblacion({ tipo: "z", cola: "der", alfa: 0.01, n: 64, xbar: 102.5, sigma: 9.6, mu0: 100, titulo: "Consumo eléctrico con σ conocida y α = 1 %",
    intro: "El consumo medio histórico de un equipo es $100$ kWh, con $\\sigma=9{,}6$ kWh. Tras un cambio de proveedor, $n=64$ mediciones dan $\\bar x=102{,}5$ kWh. ¿Aumentó el consumo medio?",
    porque: "Se busca evidencia de aumento.", siRechaza: "Hay evidencia de que el consumo medio aumentó.", siNoRechaza: "Al $1\\,\\%$ no hay evidencia suficiente de que el consumo medio haya aumentado (el p-valor es menor que $0{,}05$, pero mayor que $0{,}01$)." });
  unaPoblacion({ tipo: "prop", cola: "bil", alfa: 0.05, n: 150, x: 51, p0: 0.4, titulo: "Preferencia por una marca (proporción, bilateral)",
    intro: "Se afirma que el $40\\,\\%$ de los consumidores prefiere cierta marca. En una encuesta a $150$ personas, $51$ la prefieren. ¿Es compatible con lo afirmado?",
    porque: "Se contrasta si la proporción cambió, sin dirección.", siRechaza: "Hay evidencia de que la proporción difiere de $40\\,\\%$.", siNoRechaza: "No hay evidencia de que la proporción difiera del $40\\,\\%$ afirmado." });
  unaPoblacion({ tipo: "prop", cola: "izq", alfa: 0.01, n: 200, x: 168, p0: 0.9, titulo: "Entregas a tiempo (proporción, cola izquierda, α = 1 %)",
    intro: "Una empresa de despacho promete que al menos el $90\\,\\%$ de sus entregas llega a tiempo. De $200$ entregas revisadas, $168$ llegaron a tiempo. ¿Hay evidencia de que no cumple?",
    porque: "No cumplir significa $p<0{,}90$, que va en $H_1$.", siRechaza: "Al $1\\,\\%$ hay evidencia de que la proporción de entregas a tiempo es menor que $90\\,\\%$: la empresa no cumple lo prometido.", siNoRechaza: "No hay evidencia de incumplimiento." });
  unaPoblacion({ tipo: "prop", cola: "der", alfa: 0.05, n: 80, x: 14, p0: 0.1, titulo: "Clientes que reclaman (proporción, muestra chica)",
    intro: "Históricamente reclama a lo más el $10\\,\\%$ de los clientes. Este mes, de $80$ clientes reclamaron $14$. ¿Aumentó la proporción de reclamos?",
    porque: "Se busca evidencia de aumento.", siRechaza: "Hay evidencia de que la proporción de reclamos supera el $10\\,\\%$.", siNoRechaza: "No hay evidencia de que la proporción de reclamos haya aumentado." });
  unaPoblacion({ tipo: "chi", cola: "izq", alfa: 0.05, n: 20, s2: 14.2, var0: 25, titulo: "¿Se redujo la variabilidad? (χ² de cola izquierda)",
    intro: "Un proceso tenía varianza $25$. Tras una mejora, una muestra de $n=20$ da $s^2=14{,}2$ (población normal). ¿Hay evidencia de que la varianza disminuyó?",
    porque: "La disminución va en $H_1$.", siRechaza: "Hay evidencia de que la varianza disminuyó.", siNoRechaza: "Al $5\\,\\%$ no hay evidencia suficiente de que la varianza haya disminuido, aunque $s^2<25$ en la muestra." });
  unaPoblacion({ tipo: "chi", cola: "bil", alfa: 0.05, n: 12, s2: 9.61, var0: 4, titulo: "Desviación estándar de un instrumento (χ² bilateral)", dificultad: 3,
    intro: "Un instrumento debe tener una desviación estándar de $\\sigma=2$ unidades. En $n=12$ mediciones se obtuvo $s=3{,}1$ (población normal). ¿Difiere la variabilidad de la especificada?",
    notaDesv: "Ojo: la hipótesis se plantea sobre la varianza, $\\sigma_0^2=2^2=4$ y $s^2=3{,}1^2=9{,}61$.",
    porque: "«Difiere» ⇒ dos colas.", siRechaza: "Hay evidencia de que la variabilidad del instrumento difiere de la especificada (es mayor).", siNoRechaza: "No hay evidencia de que la variabilidad difiera de la especificada." });
  unaPoblacion({ tipo: "chi", cola: "der", alfa: 0.01, n: 25, s2: 0.0196, var0: 0.01, titulo: "Variabilidad del espesor con α = 1 % (χ² de cola derecha)",
    intro: "El espesor de una lámina debe tener varianza a lo más $0{,}01$ mm². En $n=25$ láminas se obtiene $s=0{,}14$ mm, es decir $s^2=0{,}0196$ (población normal). ¿Hay evidencia de que la varianza excede lo permitido?",
    porque: "Exceder lo permitido va en $H_1$.", siRechaza: "Al $1\\,\\%$ hay evidencia de que la varianza del espesor excede $0{,}01$ mm².", siNoRechaza: "Al $1\\,\\%$ no hay evidencia de que la varianza exceda lo permitido." });
}

/* ══ M06 · Dos poblaciones ═════════════════════════════════════════════ */
function fVarianzas(o) {
  const { n1, n2, s21, s22, alfa, cola } = o, F = s21 / s22, g1 = n1 - 1, g2 = n2 - 1;
  let critTxt, rech, pv, verif;
  if (cola === "bil") {
    const [ci, cs] = Rv(`qf(c(${alfa / 2}, ${1 - alfa / 2}), ${g1}, ${g2})`);
    critTxt = String.raw`Bilateral: se rechaza si $F\lt F_{${N(alfa / 2, 3)};${g1},${g2}}=${N(ci, 3)}$ o $F>F_{${N(1 - alfa / 2, 3)};${g1},${g2}}=${N(cs, 3)}$ (<code>qf(c(${alfa / 2}, ${1 - alfa / 2}), ${g1}, ${g2})</code>).`;
    rech = F < ci || F > cs; pv = Rn(`2 * min(pf(${F}, ${g1}, ${g2}), 1 - pf(${F}, ${g1}, ${g2}))`);
    verif = [vr("crítico superior", `qf(${1 - alfa / 2}, ${g1}, ${g2})`, cs, 3), vr("crítico inferior", `qf(${alfa / 2}, ${g1}, ${g2})`, ci, 3)];
  } else {
    afirmar(F > 1, "en unilateral derecha la varianza mayor va arriba");
    const cs = Rn(`qf(${1 - alfa}, ${g1}, ${g2})`);
    critTxt = String.raw`Cola derecha (la varianza mayor va en el numerador): se rechaza si $F>F_{${N(1 - alfa, 3)};${g1},${g2}}=${N(cs, 3)}$.`;
    rech = F > cs; pv = Rn(`1 - pf(${F}, ${g1}, ${g2})`);
    verif = [vr("crítico", `qf(${1 - alfa}, ${g1}, ${g2})`, cs, 3)];
  }
  afirmar(rech === (pv <= alfa), "F: incoherencia");
  agregar("m06", {
    concepto: "m06-c02", dificultad: 2, titulo: o.titulo,
    enunciado: p(o.intro + String.raw` Usa $\alpha=${pct(alfa)}$ y supón poblaciones normales.`) + incisos(["Plantea las hipótesis.", "Calcula el estadístico $F$ y sus grados de libertad.", "Indica la región de rechazo, decide y concluye. ¿Qué prueba de medias usarías después?"]),
    partes: [
      { titulo: "a) Hipótesis", puntos: 1.5, solucion: p(cola === "bil" ? "$H_0:\\sigma_1^2=\\sigma_2^2$ contra $H_1:\\sigma_1^2\\neq\\sigma_2^2$." : "$H_0:\\sigma_1^2\\le\\sigma_2^2$ contra $H_1:\\sigma_1^2>\\sigma_2^2$.", "Equivale a contrastar el cociente $\\sigma_1^2/\\sigma_2^2$ contra $1$.") },
      { titulo: "b) Estadístico F y grados de libertad", puntos: 2,
        solucion: p(String.raw`$F=\dfrac{s_1^2}{s_2^2}=\dfrac{${N(s21, 4)}}{${N(s22, 4)}}=${N(F, 3)}$, con gl $(n_1-1,\ n_2-1)=(${g1},\ ${g2})$.`, o.notaS || "Se usan las <strong>varianzas</strong>: si dan desviaciones estándar hay que elevarlas al cuadrado.") },
      { titulo: "c) Región de rechazo, decisión y conclusión", puntos: 2.5,
        solucion: p(critTxt, String.raw`$F=${N(F, 3)}$; p-valor $${pvTxt(pv)}$ ⇒ ${dec(rech)}.`, rech ? o.siRechaza + " Para comparar las medias corresponde <strong>Welch</strong> (<code>var.equal = FALSE</code>)." : o.siNoRechaza + " Aun así, la recomendación de la clase es usar <strong>Welch</strong> por defecto; el pooled solo con certeza o fuerte evidencia de varianzas iguales.", "En R: <code>var.test(A, B)</code>.") }
    ],
    verifica: [vjs("F", `${s21}/${s22}`, F, 3), ...verif],
    fuente: [{ id: "C2", loc: "slides 22–25" }, { id: "AY2-E", loc: "P4" }]
  });
}
function dosMedias(o) {
  const { metodo, n1, n2, x1, x2, s1, s2, D0, cola, alfa } = o;
  const dif = x2 - x1 - D0;
  let ee, gl, glTxt, pasoPrevio = "", concepto, fuente, enR;
  if (metodo === "welch") {
    const a = s1 * s1 / n1, b = s2 * s2 / n2;
    ee = Math.sqrt(a + b); const glw = (a + b) ** 2 / (a * a / (n1 - 1) + b * b / (n2 - 1)); gl = Math.round(glw);
    glTxt = String.raw`gl de Welch $=\dfrac{(s_1^2/n_1+s_2^2/n_2)^2}{\frac{(s_1^2/n_1)^2}{n_1-1}+\frac{(s_2^2/n_2)^2}{n_2-1}}=\dfrac{(${N(a, 4)}+${N(b, 4)})^2}{\frac{${N(a, 4)}^2}{${n1 - 1}}+\frac{${N(b, 4)}^2}{${n2 - 1}}}=${N(glw, 2)}\approx${gl}$.`;
    concepto = "m06-c03"; fuente = [{ id: "C2", loc: "slides 26–27 y 32" }]; enR = "<code>t.test(A, B, var.equal = FALSE)</code> (R usa los gl sin redondear).";
    o._est = String.raw`$t=\dfrac{(\bar x_2-\bar x_1)-D_0}{\sqrt{s_1^2/n_1+s_2^2/n_2}}=\dfrac{(${N(x2, 4)}-${N(x1, 4)})-${N(D0, 4)}}{\sqrt{${N(s1, 4)}^2/${n1}+${N(s2, 4)}^2/${n2}}}=\dfrac{${N(dif, 4)}}{${N(ee, 4)}}`;
    o._v = [vjs("gl de Welch", `(${a}+${b})**2/((${a})**2/${n1 - 1}+(${b})**2/${n2 - 1})`, glw, 2)];
  } else {
    const sp2 = ((n1 - 1) * s1 * s1 + (n2 - 1) * s2 * s2) / (n1 + n2 - 2);
    ee = Math.sqrt(sp2 * (1 / n1 + 1 / n2)); gl = n1 + n2 - 2;
    pasoPrevio = String.raw`$S_p^2=\dfrac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}=\dfrac{${n1 - 1}\cdot${N(s1, 4)}^2+${n2 - 1}\cdot${N(s2, 4)}^2}{${gl}}=${N(sp2, 4)}$.`;
    glTxt = String.raw`gl $=n_1+n_2-2=${gl}$.`;
    concepto = "m06-c04"; fuente = [{ id: "C2", loc: "slides 28–29" }]; enR = "<code>t.test(A, B, var.equal = TRUE)</code>.";
    o._est = String.raw`$t=\dfrac{(\bar x_2-\bar x_1)-D_0}{\sqrt{S_p^2\left(\frac1{n_1}+\frac1{n_2}\right)}}=\dfrac{(${N(x2, 4)}-${N(x1, 4)})-${N(D0, 4)}}{\sqrt{${N(sp2, 4)}\left(\frac1{${n1}}+\frac1{${n2}}\right)}}=\dfrac{${N(dif, 4)}}{${N(ee, 4)}}`;
    o._v = [vjs("Sp²", `((${n1}-1)*${s1}**2+(${n2}-1)*${s2}**2)/(${n1}+${n2}-2)`, sp2, 4)];
  }
  const t = dif / ee, q = cola === "bil" ? 1 - alfa / 2 : 1 - alfa, tc = Rn(`qt(${q}, ${gl})`);
  const rech = cola === "bil" ? Math.abs(t) > tc : cola === "der" ? t > tc : t < -tc;
  const pv = cola === "der" ? Rn(`1 - pt(${t}, ${gl})`) : cola === "izq" ? Rn(`pt(${t}, ${gl})`) : Rn(`2 * (1 - pt(${Math.abs(t)}, ${gl}))`);
  afirmar(Math.abs(Math.abs(t) - tc) > 0.08, o.titulo + ": t muy cerca del crítico");
  const critTxt = cola === "bil" ? `se rechaza si $|t|>t_{${N(q, 3)};${gl}}=${N(tc, 3)}$` : cola === "der" ? `se rechaza si $t>t_{${N(q, 3)};${gl}}=${N(tc, 3)}$` : `se rechaza si $t<-t_{${N(q, 3)};${gl}}=-${N(tc, 3)}$`;
  agregar("m06", {
    concepto, dificultad: metodo === "welch" ? 3 : 2, titulo: o.titulo,
    enunciado: p(o.intro) + tabla(["Grupo", "$n$", "$\\bar x$", "$s$"], [[`1: ${o.g1}`, M(n1), M(x1, 4), M(s1, 4)], [`2: ${o.g2}`, M(n2), M(x2, 4), M(s2, 4)]]) +
      p(String.raw`${o.pregunta} Usa $\alpha=${pct(alfa)}$ y ${metodo === "welch" ? "<strong>no</strong> supongas varianzas iguales" : "supón varianzas poblacionales <strong>iguales</strong>"}.`) +
      incisos(["Plantea las hipótesis sobre $\\mu_2-\\mu_1$.", metodo === "welch" ? "Calcula el estadístico $t$ de Welch." : "Calcula la varianza combinada $S_p^2$ y el estadístico $t$.", "Calcula los grados de libertad y el valor crítico.", "Decide y concluye."]),
    partes: [
      { titulo: "a) Hipótesis", puntos: 1, solucion: p(`${hip("\\mu_2-\\mu_1", N(D0, 4), cola)} (${NOMBRE_COLA[cola]}). ${o.porque}`) },
      { titulo: metodo === "welch" ? "b) Estadístico t de Welch" : "b) Varianza combinada y estadístico t", puntos: 2.5, solucion: p(...(pasoPrevio ? [pasoPrevio] : []), o._est + `=${N(t, 3)}$.`) },
      { titulo: "c) Grados de libertad y valor crítico", puntos: 1.5, solucion: p(glTxt, `Prueba ${NOMBRE_COLA[cola]}: ${critTxt}.`) },
      { titulo: "d) Decisión y conclusión", puntos: 1, solucion: p(String.raw`$t=${N(t, 3)}$; p-valor $\approx${N(pv, 4)}$ ⇒ ${dec(rech)}.`, rech ? o.siRechaza : o.siNoRechaza, "En R: " + enR) }
    ],
    verifica: [vjs("t", `(${x2} - ${x1} - ${D0})/${ee}`, t, 3), vr("crítico", `qt(${q}, ${gl})`, tc, 3), ...o._v],
    fuente
  });
}
function pareadas(o) {
  const { antes, despues, alfa, cola } = o, n = antes.length, d = antes.map((a, i) => a - despues[i]);
  const md = media(d), sd = desv(d), t = md / (sd / Math.sqrt(n)), gl = n - 1, q = cola === "bil" ? 1 - alfa / 2 : 1 - alfa, tc = Rn(`qt(${q}, ${gl})`);
  const rech = cola === "bil" ? Math.abs(t) > tc : cola === "der" ? t > tc : t < -tc;
  const alt = { der: "greater", izq: "less", bil: "two.sided" }[cola];
  const pv = Rn(`t.test(${rvec(antes)}, ${rvec(despues)}, paired = TRUE, alternative = "${alt}")$p.value`);
  afirmar(rech === (pv <= alfa) && Math.abs(Math.abs(t) - tc) > 0.08, o.titulo + ": pareadas incoherente o muy cerca");
  agregar("m06", {
    concepto: "m06-c05", dificultad: 2, titulo: o.titulo,
    enunciado: p(o.intro) + tabla([o.unidad, ...antes.map((_, i) => i + 1)], [[o.nAntes, ...antes.map((v) => M(v))], [o.nDespues, ...despues.map((v) => M(v))]]) +
      p(String.raw`${o.pregunta} Usa $\alpha=${pct(alfa)}$.`) + incisos(["¿Por qué las muestras son dependientes? Plantea las hipótesis con $d_i=$ antes $-$ después.", "Calcula las diferencias, $\\bar d$ y $s_d$.", "Calcula el estadístico, el valor crítico, decide y concluye."]),
    partes: [
      { titulo: "a) Por qué es pareada, e hipótesis", puntos: 1.5, solucion: p(`${o.porquePareada} ⇒ muestras dependientes: se trabaja con las diferencias y <strong>no</strong> con una prueba de dos muestras independientes.`, `${hip("\\mu_d", "0", cola)}, con $d=$ antes $-$ después. ${o.porque}`) },
      { titulo: "b) Diferencias, media y desviación", puntos: 2,
        solucion: tabla(["", ...d.map((_, i) => i + 1)], [["$d_i$", ...d.map((v) => M(v))]]) + p(String.raw`$\bar d=\dfrac{${N(suma(d), 4)}}{${n}}=${N(md, 4)}$; $s_d=\sqrt{\dfrac{\sum(d_i-\bar d)^2}{n-1}}=\sqrt{\dfrac{${N(varianza(d) * (n - 1), 4)}}{${gl}}}=${N(sd, 4)}$.`) },
      { titulo: "c) Estadístico, crítico, decisión y conclusión", puntos: 2.5,
        solucion: p(String.raw`$t=\dfrac{\bar d}{s_d/\sqrt n}=\dfrac{${N(md, 4)}}{${N(sd, 4)}/\sqrt{${n}}}=${N(t, 3)}$ con $n-1=${gl}$ gl.`,
          `Crítico (${NOMBRE_COLA[cola]}): $t_{${N(q, 3)};${gl}}=${N(tc, 3)}$; p-valor $=${N(pv, 4)}$ ⇒ ${dec(rech)}.`, rech ? o.siRechaza : o.siNoRechaza, `En R: <code>t.test(antes, despues, paired = TRUE${cola === "bil" ? "" : `, alternative = "${alt}"`})</code>. El orden importa: $\\bar d>0$ significa que «antes» es mayor.`) }
    ],
    verifica: [vr("t (t.test pareado)", `t.test(${rvec(antes)}, ${rvec(despues)}, paired = TRUE)$statistic`, t, 3), vr("sd de d", `sd(${rvec(antes)} - ${rvec(despues)})`, sd, 4), vr("crítico", `qt(${q}, ${gl})`, tc, 3)],
    fuente: [{ id: "C2", loc: "slides 30–31 y 34" }]
  });
}
function m06() {
  fVarianzas({ titulo: "¿Varianzas iguales? Prueba F bilateral", cola: "bil", alfa: 0.05, n1: 16, s21: 42.3, n2: 21, s22: 18.9,
    intro: "Se comparan los tiempos de dos líneas de producción. Línea 1: $n_1=16$, $s_1^2=42{,}3$. Línea 2: $n_2=21$, $s_2^2=18{,}9$. ¿Difieren las varianzas?",
    siRechaza: "Hay evidencia de que las varianzas de las dos líneas difieren.", siNoRechaza: "No hay evidencia de que las varianzas de las dos líneas difieran." });
  fVarianzas({ titulo: "¿Es más variable el proveedor A? Prueba F de cola derecha", cola: "der", alfa: 0.05, n1: 13, s21: 33.64, n2: 11, s22: 9.61,
    intro: "Proveedor A: $n_1=13$ entregas con $s_1=5{,}8$ días. Proveedor B: $n_2=11$ entregas con $s_2=3{,}1$ días. ¿Hay evidencia de que A es más variable que B?",
    notaS: "Se dan desviaciones: $s_1^2=5{,}8^2=33{,}64$ y $s_2^2=3{,}1^2=9{,}61$.",
    siRechaza: "Hay evidencia de que los tiempos del proveedor A son más variables que los de B.", siNoRechaza: "No hay evidencia de que A sea más variable que B." });
  fVarianzas({ titulo: "Dos máquinas llenadoras: prueba F con α = 10 %", cola: "bil", alfa: 0.1, n1: 10, s21: 2.9, n2: 10, s22: 1.6,
    intro: "Máquina 1: $n_1=10$, $s_1^2=2{,}9$. Máquina 2: $n_2=10$, $s_2^2=1{,}6$. ¿Difieren las varianzas del llenado?",
    siRechaza: "Hay evidencia de que las varianzas difieren.", siNoRechaza: "No hay evidencia de que las varianzas de las dos máquinas difieran: un cociente de $1{,}8$ no es raro con muestras de tamaño 10." });
  dosMedias({ metodo: "welch", titulo: "Diferencia de medias con varianzas distintas (Welch)", cola: "der", alfa: 0.05, D0: 0, n1: 12, x1: 24.1, s1: 2.2, n2: 15, x2: 27.3, s2: 4.9,
    intro: "Se compara el rendimiento (km/l) de dos tipos de combustible:", g1: "estándar", g2: "aditivado", pregunta: "¿Rinde más, en promedio, el combustible aditivado?",
    porque: "Lo que se quiere demostrar es $\\mu_2>\\mu_1$.", siRechaza: "Hay evidencia de que el combustible aditivado rinde más en promedio.", siNoRechaza: "No hay evidencia de que el aditivado rinda más." });
  dosMedias({ metodo: "welch", titulo: "Welch con diferencia hipotética distinta de cero", cola: "der", alfa: 0.05, D0: 100, n1: 14, x1: 820, s1: 60, n2: 10, x2: 965, s2: 110,
    intro: "Sueldos (miles de pesos) antes y después de una negociación, en dos muestras independientes de trabajadores:", g1: "antes", g2: "después", pregunta: "¿Hay evidencia de que el sueldo medio subió <strong>más de</strong> $100$ mil pesos?",
    porque: "$D_0=100$: se contrasta si el aumento supera 100.", siRechaza: "Hay evidencia de que el aumento medio supera los $100$ mil pesos.", siNoRechaza: "No se puede afirmar que el aumento medio supere los $100$ mil pesos (aunque la diferencia muestral es $145$)." });
  dosMedias({ metodo: "welch", titulo: "Welch bilateral: dos turnos", cola: "bil", alfa: 0.05, D0: 0, n1: 9, x1: 51.2, s1: 3.1, n2: 16, x2: 46.8, s2: 6.4,
    intro: "Unidades producidas por hora en dos turnos:", g1: "turno día", g2: "turno noche", pregunta: "¿Difiere la producción media entre turnos?",
    porque: "«Difiere» ⇒ dos colas.", siRechaza: "Hay evidencia de que la producción media difiere entre turnos (es menor de noche).", siNoRechaza: "No hay evidencia de diferencia entre turnos." });
  dosMedias({ metodo: "pooled", titulo: "Diferencia de medias con varianzas iguales (pooled)", cola: "bil", alfa: 0.05, D0: 0, n1: 10, x1: 72.4, s1: 5.1, n2: 12, x2: 77.9, s2: 4.6,
    intro: "Puntajes de dos secciones de un curso:", g1: "sección A", g2: "sección B", pregunta: "¿Difieren los puntajes medios?",
    porque: "«Difieren» ⇒ dos colas.", siRechaza: "Hay evidencia de que los puntajes medios de las secciones difieren.", siNoRechaza: "No hay evidencia de diferencia entre secciones." });
  dosMedias({ metodo: "pooled", titulo: "Pooled de cola izquierda: ¿reduce el tiempo el método nuevo?", cola: "izq", alfa: 0.05, D0: 0, n1: 8, x1: 34.5, s1: 3.9, n2: 8, x2: 31.8, s2: 3.3,
    intro: "Tiempo de armado (minutos) con dos métodos, en muestras independientes:", g1: "método actual", g2: "método nuevo", pregunta: "¿Hay evidencia de que el método nuevo toma menos tiempo en promedio?",
    porque: "Menos tiempo con el nuevo significa $\\mu_2-\\mu_1<0$.", siRechaza: "Hay evidencia de que el método nuevo reduce el tiempo medio.", siNoRechaza: "Con estas muestras no hay evidencia de que el método nuevo reduzca el tiempo medio (la diferencia de $2{,}7$ minutos puede deberse al azar)." });
  dosMedias({ metodo: "pooled", titulo: "Pooled con D₀ ≠ 0 y α = 10 %", cola: "bil", alfa: 0.1, D0: 5, n1: 15, x1: 48, s1: 6, n2: 11, x2: 58.5, s2: 7,
    intro: "Ventas diarias (unidades) antes y después de una campaña, en días distintos elegidos al azar:", g1: "antes", g2: "después", pregunta: "La gerencia afirma que la campaña sube las ventas medias en exactamente $5$ unidades. ¿Es compatible con los datos?",
    porque: "Se contrasta la afirmación $\\mu_2-\\mu_1=5$.", siRechaza: "Hay evidencia de que el aumento medio no es $5$ unidades (la muestra sugiere un aumento mayor).", siNoRechaza: "Los datos son compatibles con un aumento medio de $5$ unidades." });
  pareadas({ titulo: "Antes y después de una capacitación (pareada)", cola: "izq", alfa: 0.05, antes: [62, 70, 58, 75, 66, 71, 60, 68], despues: [68, 74, 57, 82, 70, 78, 65, 69],
    intro: "Ocho vendedores rinden una prueba antes y después de una capacitación:", unidad: "Vendedor", nAntes: "Antes", nDespues: "Después", pregunta: "¿Mejoró el puntaje medio?",
    porquePareada: "Cada vendedor aporta dos mediciones", porque: "Mejorar significa después $>$ antes, es decir $\\mu_d<0$.",
    siRechaza: "Hay evidencia de que la capacitación aumentó el puntaje medio.", siNoRechaza: "No hay evidencia de mejora." });
  pareadas({ titulo: "Dos balanzas sobre las mismas muestras (pareada bilateral)", cola: "bil", alfa: 0.05, antes: [10.2, 11.5, 9.8, 12.1, 10.9, 11.3], despues: [10.0, 11.6, 9.9, 11.8, 11.0, 11.1],
    intro: "Seis muestras se pesan en dos balanzas (A y B):", unidad: "Muestra", nAntes: "Balanza A", nDespues: "Balanza B", pregunta: "¿Miden distinto, en promedio, las dos balanzas? (toma $d=$ A $-$ B).",
    porquePareada: "La misma muestra se pesa en ambas balanzas", porque: "«Distinto» ⇒ dos colas.",
    siRechaza: "Hay evidencia de que las balanzas miden distinto.", siNoRechaza: "No hay evidencia de que las balanzas midan distinto en promedio." });
  pareadas({ titulo: "Efecto de una dieta (pareada de cola derecha)", cola: "der", alfa: 0.01, antes: [82, 91, 77, 88, 95, 84, 79], despues: [78, 86, 76, 83, 89, 81, 77],
    intro: "Peso (kg) de siete personas antes y después de un programa de 3 meses:", unidad: "Persona", nAntes: "Antes", nDespues: "Después", pregunta: "¿Hay evidencia, al nivel indicado, de que el programa reduce el peso medio?",
    porquePareada: "Cada persona se mide dos veces", porque: "Reducir el peso significa antes $>$ después, es decir $\\mu_d>0$.",
    siRechaza: "Al $1\\,\\%$ hay evidencia de que el programa reduce el peso medio.", siNoRechaza: "No hay evidencia de reducción." });
}

/* ══ M07 · Errores y potencia ══════════════════════════════════════════ */
function betaMedia(o) {
  const { mu0, sigma, n, alfa, mu1 } = o, ee = sigma / Math.sqrt(n), z = Rn(`qnorm(${1 - alfa / 2})`);
  const li = mu0 - z * ee, ls = mu0 + z * ee, zs = (ls - mu1) / ee, zi = (li - mu1) / ee;
  const beta = Rn(`pnorm(${zs}) - pnorm(${zi})`), pot = 1 - beta;
  agregar("m07", {
    concepto: "m07-c03", dificultad: 3, titulo: o.titulo,
    enunciado: p(String.raw`${o.intro} Se contrasta $H_0:\mu=${N(mu0, 4)}$ contra $H_1:\mu\neq${N(mu0, 4)}$ con $\sigma=${N(sigma, 4)}$ conocida, $n=${n}$ y $\alpha=${pct(alfa)}$.`) +
      incisos(["Calcula los límites de $\\bar X$ entre los cuales <strong>no</strong> se rechaza $H_0$.", String.raw`Si en realidad $\mu=${N(mu1, 4)}$, calcula la probabilidad de no rechazar $H_0$. ¿Qué tipo de error es?`, "Calcula la potencia e indica dos formas de aumentarla."]),
    partes: [
      { titulo: "a) Límites de no rechazo", puntos: 2,
        solucion: p(String.raw`Error estándar: $\sigma/\sqrt n=${N(sigma, 4)}/\sqrt{${n}}=${N(ee, 4)}$; $z_{${N(1 - alfa / 2, 3)}}=${N(z, 3)}$.`,
          String.raw`$\mu_0\pm z\,\dfrac{\sigma}{\sqrt n}=${N(mu0, 4)}\pm${N(z, 3)}\cdot${N(ee, 4)}$ ⇒ no se rechaza si $${N(li, 4)}\le\bar X\le${N(ls, 4)}$.`) },
      { titulo: "b) Probabilidad de no rechazar con la media verdadera", puntos: 2.5,
        solucion: p(String.raw`Ahora $\bar X\sim N(${N(mu1, 4)};\ ${N(ee, 4)}^2)$. Se estandariza con $\mu_1$:`,
          String.raw`$\beta=\Phi\!\left(\dfrac{${N(ls, 4)}-${N(mu1, 4)}}{${N(ee, 4)}}\right)-\Phi\!\left(\dfrac{${N(li, 4)}-${N(mu1, 4)}}{${N(ee, 4)}}\right)=\Phi(${N(zs, 3)})-\Phi(${N(zi, 3)})=${N(beta, 4)}$.`,
          "Es la probabilidad de <strong>error tipo II</strong>: no rechazar $H_0$ siendo falsa.") },
      { titulo: "c) Potencia y cómo aumentarla", puntos: 1.5,
        solucion: p(String.raw`Potencia $=1-\beta=${N(pot, 4)}$: probabilidad de detectar que $\mu=${N(mu1, 4)}$.`, `${pot < 0.5 ? "Es baja: el test casi no detecta esa diferencia." : pot < 0.8 ? "Es moderada." : "Es alta."} Aumenta con: mayor $n$, mayor $\\alpha$, menor $\\sigma$ o una diferencia real $|\\mu_1-\\mu_0|$ más grande.`) }
    ],
    verifica: [vr("β", `pnorm(${mu0} + qnorm(${1 - alfa / 2})*${sigma}/sqrt(${n}), ${mu1}, ${sigma}/sqrt(${n})) - pnorm(${mu0} - qnorm(${1 - alfa / 2})*${sigma}/sqrt(${n}), ${mu1}, ${sigma}/sqrt(${n}))`, beta, 4),
      vr("límite superior", `${mu0} + qnorm(${1 - alfa / 2})*${sigma}/sqrt(${n})`, ls, 4)],
    fuente: [{ id: "C2", loc: "slides 37–38" }, { id: "AY2-E", loc: "P2(b)(c)" }]
  });
}
function betaVar(o) {
  const { var0, n, alfa, var1 } = o, gl = n - 1, [ci, cs] = Rv(`qchisq(c(${alfa / 2}, ${1 - alfa / 2}), ${gl})`);
  const li = var0 * ci / gl, ls = var0 * cs / gl, k = var0 / var1, beta = Rn(`pchisq(${cs * k}, ${gl}) - pchisq(${ci * k}, ${gl})`);
  agregar("m07", {
    concepto: "m07-c03", dificultad: 3, titulo: o.titulo,
    enunciado: p(String.raw`${o.intro} Se contrasta $H_0:\sigma^2=${N(var0, 4)}$ contra $H_1:\sigma^2\neq${N(var0, 4)}$ con $n=${n}$ y $\alpha=${pct(alfa)}$ (población normal).`) +
      incisos(["¿Para qué valores de $S^2$ no se rechaza $H_0$?", String.raw`Si la varianza verdadera es $\sigma^2=${N(var1, 4)}$, calcula la probabilidad de no rechazar $H_0$.`, "Interpreta el resultado."]),
    partes: [
      { titulo: "a) Límites de S² para no rechazar", puntos: 2.5,
        solucion: p(String.raw`Con $${gl}$ gl: $\chi^2_{${N(alfa / 2, 3)}}=${N(ci, 3)}$ y $\chi^2_{${N(1 - alfa / 2, 3)}}=${N(cs, 3)}$.`,
          String.raw`De $\chi^2=\dfrac{(n-1)S^2}{\sigma_0^2}$: $S^2_{inf}=\dfrac{${N(var0, 4)}\cdot${N(ci, 3)}}{${gl}}=${N(li, 4)}$ y $S^2_{sup}=\dfrac{${N(var0, 4)}\cdot${N(cs, 3)}}{${gl}}=${N(ls, 4)}$. No se rechaza si $${N(li, 4)}\le S^2\le${N(ls, 4)}$.`) },
      { titulo: "b) Probabilidad de no rechazar con la varianza verdadera", puntos: 2.5,
        solucion: p(String.raw`Con $\sigma_1^2=${N(var1, 4)}$, quien sigue una $\chi^2_{${gl}}$ es $\dfrac{(n-1)S^2}{\sigma_1^2}$: los límites del $\chi^2$ se multiplican por $\sigma_0^2/\sigma_1^2=${N(k, 4)}$.`,
          String.raw`$\beta=P\!\left(${N(ci * k, 3)}\le\chi^2_{${gl}}\le${N(cs * k, 3)}\right)=${N(beta, 4)}$ (<code>pchisq(${N(cs * k, 3).replace("{,}", ".")}, ${gl}) - pchisq(${N(ci * k, 3).replace("{,}", ".")}, ${gl})</code>).`) },
      { titulo: "c) Interpretación", puntos: 1,
        solucion: p(String.raw`$\beta=${N(beta, 4)}$ es la probabilidad de error tipo II; la potencia es $${N(1 - beta, 4)}$. ${beta > 0.5 ? "El test casi no detecta esa diferencia con este tamaño de muestra: no rechazar $H_0$ no prueba que sea verdadera." : "El test detecta esa diferencia con probabilidad razonable."}`) }
    ],
    verifica: [vr("β", `pchisq(qchisq(${1 - alfa / 2}, ${gl})*${var0}/${var1}, ${gl}) - pchisq(qchisq(${alfa / 2}, ${gl})*${var0}/${var1}, ${gl})`, beta, 4), vr("límite superior de S²", `${var0}*qchisq(${1 - alfa / 2}, ${gl})/${gl}`, ls, 4)],
    fuente: [{ id: "C2", loc: "slides 37–38" }, { id: "AY2-E", loc: "P3(b)(c)" }]
  });
}
function m07() {
  betaMedia({ titulo: "Límites de no rechazo y β para una media (peso de un producto)", intro: "Una envasadora debe entregar $50$ g por unidad.", mu0: 50, sigma: 4, n: 25, alfa: 0.05, mu1: 52 });
  betaMedia({ titulo: "β y potencia con α = 1 % (puntaje medio)", intro: "Un test estandarizado tiene media $100$.", mu0: 100, sigma: 15, n: 36, alfa: 0.01, mu1: 108 });
  betaMedia({ titulo: "β y potencia con α = 10 % (concentración)", intro: "La concentración de un reactivo debe ser $1{,}5$ g/l.", mu0: 1.5, sigma: 0.2, n: 16, alfa: 0.1, mu1: 1.4 });
  betaMedia({ titulo: "El mismo test con una muestra más grande", intro: "Una envasadora debe entregar $50$ g por unidad (mismo caso que antes, ahora con cuatro veces más datos).", mu0: 50, sigma: 4, n: 100, alfa: 0.05, mu1: 52 });
  betaVar({ titulo: "Límites de no rechazo y β para una varianza", intro: "La varianza de un proceso debe ser $9$.", var0: 9, n: 15, alfa: 0.05, var1: 16 });
  betaVar({ titulo: "β para una varianza con α = 10 %", intro: "La varianza del diámetro de un perno debe ser $0{,}25$ mm².", var0: 0.25, n: 25, alfa: 0.1, var1: 0.5 });
  agregar("m07", {
    concepto: "m07-c01", dificultad: 1, origen: "nueva", titulo: "Identificar los errores tipo I y II en contexto",
    enunciado: p("Un laboratorio controla que el contenido medio de un jarabe sea $120$ ml. Cada hora toma una muestra y contrasta $H_0:\\mu=120$ contra $H_1:\\mu\\neq120$ con $\\alpha=5\\,\\%$; si rechaza, detiene la línea.") +
      incisos(["Describe en palabras del problema el error tipo I y el error tipo II.", "¿Cuál es la probabilidad de cada uno? ¿Qué pasa con $\\beta$ si se baja $\\alpha$ a $1\\,\\%$?", "El supervisor dice: «no se rechazó $H_0$, así que la línea está perfectamente calibrada». Comenta."]),
    partes: [
      { titulo: "a) Error tipo I en este problema", puntos: 1, solucion: p("Rechazar $H_0$ siendo verdadera: <strong>detener la línea</strong> cuando en realidad el contenido medio sí es $120$ ml (falsa alarma).") },
      { titulo: "a) Error tipo II en este problema", puntos: 1, solucion: p("No rechazar $H_0$ siendo falsa: <strong>seguir produciendo</strong> cuando el contenido medio ya no es $120$ ml (no se detecta el desajuste).") },
      { titulo: "b) Probabilidades y relación entre α y β", puntos: 2, solucion: p("$P(\\text{error I})=\\alpha=0{,}05$, lo fija el analista y no depende de $n$. $P(\\text{error II})=\\beta$, que depende del valor verdadero de $\\mu$, de $n$, de $\\sigma$ y de $\\alpha$; no se puede calcular sin fijar un valor verdadero concreto.", "Si $\\alpha$ baja a $1\\,\\%$ (con el mismo $n$), la región de no rechazo se ensancha y $\\beta$ <strong>aumenta</strong> (la potencia $1-\\beta$ baja).") },
      { titulo: "c) Comentario a la afirmación del supervisor", puntos: 2, solucion: p("Es incorrecta: no rechazar $H_0$ <strong>no prueba</strong> que sea verdadera; solo indica que la muestra no dio evidencia suficiente en contra. Puede haberse cometido un error tipo II, sobre todo si $n$ es pequeño o el desajuste es leve (potencia baja).") }
    ],
    fuente: [{ id: "C2", loc: "slides 35–37" }, { id: "PR-P1-Q1", loc: "afirmaciones 4 y 6" }]
  });
}

/* ══ M08 · T² de Hotelling ═════════════════════════════════════════════ */
function t2(o) {
  const { n, xb, S, mu0, alfa, nombres } = o, pv = 2, d = [rd(xb[0] - mu0[0], 6), rd(xb[1] - mu0[1], 6)], dI = o.dInv || 4;
  const D = det2(S), Si = inv2(S), q = dot(d, mv2(Si, d)), T2 = n * q;
  const F = Rn(`qf(${1 - alfa}, ${pv}, ${n - pv})`), c = (n - 1) * pv / (n - pv), crit = c * F, rech = T2 > crit;
  const rS = `${rmat(S)}`, rT2 = `${n} * t(${rvec(d)}) %*% solve(${rS}) %*% ${rvec(d)}`;
  afirmar(Math.abs(T2 - crit) > 0.3, "T² cerca del crítico");
  const datos = String.raw`$n=${n}$, $\bar x=${pm([[xb[0]], [xb[1]]], 4)}$, $S=${pm(S, 4)}$`;
  agregar("m08", {
    concepto: "m08-c02", dificultad: 3, titulo: o.titulo,
    enunciado: p(String.raw`${o.intro} Se miden ${nombres[0]} ($X_1$) y ${nombres[1]} ($X_2$): ${datos}. Los valores de referencia son $\mu_0=${pm([[mu0[0]], [mu0[1]]], 4)}$. Usa $\alpha=${pct(alfa)}$ y supón normalidad bivariada.`) +
      incisos(["Plantea las hipótesis y calcula $S^{-1}$.", "Calcula $T^2$.", "Calcula el valor crítico, decide y concluye."]),
    partes: [
      { titulo: "a) Hipótesis e inversa de S", puntos: 2,
        solucion: p(String.raw`$H_0:\mu=\mu_0$ contra $H_1:\mu\neq\mu_0$ (contraste conjunto de las dos medias).`,
          String.raw`$|S|=${N(S[0][0], 4)}\cdot${N(S[1][1], 4)}-${N(S[0][1], 4)}^2=${N(D, 4)}$ ⇒ $S^{-1}=\dfrac{1}{${N(D, 4)}}${pm([[S[1][1], -S[0][1]], [-S[0][1], S[0][0]]], 4)}=${pm(Si, dI)}$.`) },
      { titulo: "b) Estadístico T²", puntos: 2,
        solucion: p(String.raw`$\bar x-\mu_0=${pm([[d[0]], [d[1]]], 4)}$.`,
          String.raw`$(\bar x-\mu_0)'S^{-1}(\bar x-\mu_0)=${N(Si[0][0], dI)}(${N(d[0], 4)})^2+2(${N(Si[0][1], dI)})(${N(d[0], 4)})(${N(d[1], 4)})+${N(Si[1][1], dI)}(${N(d[1], 4)})^2=${N(q, 4)}$.`,
          String.raw`$T^2=n\cdot${N(q, 4)}=${n}\cdot${N(q, 4)}=${N(T2, 3)}$.`) },
      { titulo: "c) Valor crítico, decisión y conclusión", puntos: 2,
        solucion: p(String.raw`Se rechaza si $T^2>\dfrac{(n-1)p}{n-p}F_{\alpha}(p,\,n-p)=\dfrac{${n - 1}\cdot2}{${n - 2}}\cdot F_{${N(alfa)}}(2,${n - 2})=${N(c, 4)}\cdot${N(F, 3)}=${N(crit, 3)}$.`,
          String.raw`$${N(T2, 3)}${rech ? ">" : "<"}${N(crit, 3)}$ ⇒ ${dec(rech)}.`, rech ? o.siRechaza + " Para saber qué variable es responsable se miran los intervalos simultáneos." : o.siNoRechaza + " Equivale a que $\\mu_0$ cae dentro de la región de confianza elíptica.") }
    ],
    verifica: [vr("T²", `(${rT2})[1, 1]`, T2, 3), vr("crítico", `${n - 1}*2/${n - 2}*qf(${1 - alfa}, 2, ${n - 2})`, crit, 3)],
    fuente: [{ id: "C2", loc: "slides 43–44 y 48" }]
  });
  /* Intervalos simultáneos con los mismos datos */
  const cT = Math.sqrt(crit), tB = Rn(`qt(${1 - alfa / (2 * pv)}, ${n - 1})`);
  const ee = [Math.sqrt(S[0][0] / n), Math.sqrt(S[1][1] / n)];
  const icT = ee.map((e, k) => [xb[k] - cT * e, xb[k] + cT * e]), icB = ee.map((e, k) => [xb[k] - tB * e, xb[k] + tB * e]);
  const fuera = (ic, k) => mu0[k] < ic[k][0] || mu0[k] > ic[k][1];
  agregar("m08", {
    concepto: "m08-c04", dificultad: 3, titulo: o.titulo.replace(/^[^:]+:/, "Intervalos simultáneos y Bonferroni:"),
    enunciado: p(String.raw`${o.intro} Se miden ${nombres[0]} ($X_1$) y ${nombres[1]} ($X_2$): ${datos}; referencia $\mu_0=${pm([[mu0[0]], [mu0[1]]], 4)}$ y $\alpha=${pct(alfa)}$.`) +
      incisos(["Calcula los intervalos de confianza simultáneos $T^2$ para $\\mu_1$ y $\\mu_2$.", "Calcula los intervalos de Bonferroni.", "Compara ambos métodos e indica qué intervalos contienen el valor de referencia."]),
    partes: [
      { titulo: "a) Intervalos simultáneos T²", puntos: 2.5,
        solucion: p(String.raw`Factor: $\sqrt{\dfrac{p(n-1)}{n-p}F_\alpha(p,n-p)}=\sqrt{${N(crit, 3)}}=${N(cT, 3)}$. Errores estándar: $\sqrt{s_{11}/n}=${N(ee[0], 4)}$ y $\sqrt{s_{22}/n}=${N(ee[1], 4)}$.`,
          ...[0, 1].map((k) => String.raw`$\mu_${k + 1}$: $${N(xb[k], 4)}\pm${N(cT, 3)}\cdot${N(ee[k], 4)}=[${N(icT[k][0], 3)};\ ${N(icT[k][1], 3)}]$`)) },
      { titulo: "b) Intervalos de Bonferroni", puntos: 2,
        solucion: p(String.raw`$t_{n-1;\,\alpha/(2p)}=t_{${n - 1};\,${N(alfa / (2 * pv), 4)}}=${N(tB, 3)}$ (<code>qt(${1 - alfa / (2 * pv)}, ${n - 1})</code>).`,
          ...[0, 1].map((k) => String.raw`$\mu_${k + 1}$: $${N(xb[k], 4)}\pm${N(tB, 3)}\cdot${N(ee[k], 4)}=[${N(icB[k][0], 3)};\ ${N(icB[k][1], 3)}]$`)) },
      { titulo: "c) Comparación y lectura", puntos: 1.5,
        solucion: p(`Bonferroni es más angosto ($${N(tB, 3)}<${N(cT, 3)}$): conviene cuando solo interesan las $p$ medias por separado. Los de $T^2$ valen para todas las combinaciones lineales a la vez.`,
          ...[0, 1].map((k) => `$\\mu_{0${k + 1}}=${N(mu0[k], 4)}$: ${fuera(icT, k) ? "fuera" : "dentro"} del intervalo $T^2$ y ${fuera(icB, k) ? "fuera" : "dentro"} del de Bonferroni.`),
          rech ? ([0, 1].some((k) => fuera(icT, k)) ? `El test conjunto rechaza $H_0$ y la variable responsable es ${[0, 1].filter((k) => fuera(icT, k)).map((k) => nombres[k]).join(" y ")}: su intervalo simultáneo no contiene el valor de referencia.` : "El test conjunto rechaza $H_0$, pero ningún intervalo individual excluye su referencia: la diferencia está en una combinación de las variables (por su correlación), no en una sola.") : "Coherente con no rechazar $H_0$ en el test conjunto.") }
    ],
    verifica: [vr("factor T²", `sqrt(${n - 1}*2/${n - 2}*qf(${1 - alfa}, 2, ${n - 2}))`, cT, 3), vr("t de Bonferroni", `qt(${1 - alfa / (2 * pv)}, ${n - 1})`, tB, 3),
      vjs("IC T² μ1 inferior", `${xb[0]} - ${cT}*Math.sqrt(${S[0][0]}/${n})`, icT[0][0], 3), vjs("IC Bonferroni μ2 superior", `${xb[1]} + ${tB}*Math.sqrt(${S[1][1]}/${n})`, icB[1][1], 3)],
    fuente: [{ id: "C2", loc: "slides 46–49" }]
  });
}
function m08() {
  t2({ titulo: "T² de Hotelling: dos características de un producto", intro: "Control de calidad de un envase.", nombres: ["peso (g)", "altura (mm)"], n: 20, xb: [52, 28], S: [[16, 6], [6, 9]], mu0: [50, 30], alfa: 0.05,
    siRechaza: "Hay evidencia de que el vector de medias difiere del de referencia.", siNoRechaza: "No hay evidencia de que el vector de medias difiera del de referencia." });
  t2({ titulo: "T² de Hotelling: dos indicadores de un proceso", intro: "Seguimiento de un proceso químico.", nombres: ["pH", "viscosidad"], n: 15, xb: [10.4, 6.9], S: [[1.2, 0.4], [0.4, 0.8]], mu0: [10, 7], alfa: 0.05,
    siRechaza: "Hay evidencia de que el proceso se desvió de los valores de referencia.", siNoRechaza: "No hay evidencia de que el proceso se haya desviado de los valores de referencia." });
  t2({ titulo: "T² de Hotelling: puntajes de dos pruebas con α = 1 %", intro: "Un colegio compara sus resultados con los promedios nacionales.", nombres: ["Lenguaje", "Matemática"], n: 30, xb: [63, 58], S: [[100, 48], [48, 144]], mu0: [57, 55.5], alfa: 0.01, dInv: 5,
    siRechaza: "Hay evidencia de que el colegio difiere de los promedios nacionales.", siNoRechaza: "No hay evidencia de que el colegio difiera de los promedios nacionales." });
}

/* ══ M09 · PCA ═════════════════════════════════════════════════════════ */
function pca2(o) {
  const { S, nombres, esCor } = o, a = S[0][0], b = S[0][1], c = S[1][1], tr = a + c, D = a * c - b * b;
  const disc = Math.sqrt(tr * tr - 4 * D), l1 = (tr + disc) / 2, l2 = (tr - disc) / 2;
  let v = [b, l1 - a]; const nv = Math.hypot(...v); v = v.map((x) => x / nv); if (v[0] < 0) v = v.map((x) => -x);
  const mat = esCor ? "R" : "S";
  agregar("m09", {
    concepto: "m09-c02", dificultad: 2, titulo: o.titulo,
    enunciado: p(String.raw`${o.intro} La matriz de ${esCor ? "correlación" : "covarianza"} de ${nombres[0]} ($X_1$) y ${nombres[1]} ($X_2$) es $$${mat}=${pm(S)}.$$`) +
      incisos(["Calcula los autovalores.", "¿Qué porcentaje de la varianza total explica cada componente?", "Calcula el autovector (loadings) del primer componente, normalizado, e interprétalo."]),
    partes: [
      { titulo: "a) Ecuación característica y autovalores", puntos: 2.5,
        solucion: p(String.raw`$|${mat}-\lambda I|=0$ ⇒ $(${N(a)}-\lambda)(${N(c)}-\lambda)-${N(b)}^2=0$ ⇒ $\lambda^2-${N(tr)}\lambda+${N(D, 4)}=0$.`,
          String.raw`$\lambda=\dfrac{${N(tr)}\pm\sqrt{${N(tr)}^2-4\cdot${N(D, 4)}}}{2}=\dfrac{${N(tr)}\pm${N(disc, 4)}}{2}$ ⇒ $\lambda_1=${N(l1, 4)}$ y $\lambda_2=${N(l2, 4)}$.`,
          String.raw`Comprobación: $\lambda_1+\lambda_2=${N(tr)}$ = traza (varianza total) y $\lambda_1\lambda_2=${N(D, 4)}=|${mat}|$.`) },
      { titulo: "b) Varianza explicada", puntos: 1.5,
        solucion: p(String.raw`PC1: $\dfrac{\lambda_1}{\lambda_1+\lambda_2}=\dfrac{${N(l1, 4)}}{${N(tr)}}=${N(100 * l1 / tr, 1)}\,\%$; PC2: $${N(100 * l2 / tr, 1)}\,\%$.`,
          esCor ? `Con datos estandarizados la varianza total es $p=2$. Kaiser: se conserva PC1 ($\\lambda_1>1$) y no PC2 ($\\lambda_2<1$).` : `${l1 / tr >= 0.8 ? "Con PC1 ya se supera el $80\\,\\%$: basta un componente." : "PC1 no alcanza el $80\\,\\%$: con ese criterio se conservarían los dos."}`) },
      { titulo: "c) Autovector de λ₁ e interpretación", puntos: 2,
        solucion: p(String.raw`$(${mat}-\lambda_1I)v=0$ ⇒ primera fila: $(${N(a)}-${N(l1, 4)})v_1+${N(b)}v_2=0$ ⇒ $v\propto(${N(b)};\ ${N(l1 - a, 4)})$.`,
          String.raw`Normalizando (norma $${N(nv, 4)}$): $v_1=(${N(v[0], 3)};\ ${N(v[1], 3)})$, así $PC_1=${N(v[0], 3)}\,X_1${v[1] < 0 ? "-" : "+"}${N(Math.abs(v[1]), 3)}\,X_2$ (con las variables centradas).`,
          `${v[1] > 0 ? "Ambos loadings tienen el mismo signo: PC1 es un índice de «tamaño» que crece con las dos variables" : "Los loadings tienen signo opuesto: PC1 contrasta una variable con la otra"}; pesa más ${Math.abs(v[0]) > Math.abs(v[1]) + 1e-9 ? nombres[0] : Math.abs(v[1]) > Math.abs(v[0]) + 1e-9 ? nombres[1] : "ninguna (pesan igual)"}. El signo global del autovector es arbitrario. En R: <code>eigen(${mat})</code>.`) }
    ],
    verifica: [vr("λ1", `eigen(${rmat(S)})$values[1]`, l1, 4), vr("λ2", `eigen(${rmat(S)})$values[2]`, l2, 4), vr("|v11|", `abs(eigen(${rmat(S)})$vectors[1, 1])`, Math.abs(v[0]), 3), vr("|v21|", `abs(eigen(${rmat(S)})$vectors[2, 1])`, Math.abs(v[1]), 3)],
    fuente: [{ id: "C3", loc: "slides 8–12 y 16–18" }]
  });
}
function cuantos(o) {
  const lam = o.sdev ? o.sdev.map((s) => s * s) : o.lam, tot = suma(lam), prop = lam.map((l) => l / tot);
  const acum = prop.map((_, i) => suma(prop.slice(0, i + 1))), k80 = acum.findIndex((a) => a >= 0.8) + 1, kK = lam.filter((l) => l > 1).length;
  afirmar(acum.every((a) => Math.abs(a - 0.8) > 0.01) && lam.every((l) => Math.abs(l - 1) > 0.03), "autovalores en el borde de un criterio");
  agregar("m09", {
    concepto: "m09-c04", dificultad: 2, titulo: o.titulo,
    enunciado: p(o.intro) + tabla(["", ...lam.map((_, i) => `PC${i + 1}`)], [[o.sdev ? "Standard deviation" : "Autovalor $\\lambda$", ...(o.sdev || lam).map((v) => M(v, 4))]]) +
      incisos([(o.sdev ? "Obtén los autovalores y calcula" : "Calcula") + " la proporción de varianza explicada y la acumulada.", "¿Cuántos componentes se conservan con el criterio del $80\\,\\%$ y con el de Kaiser?", "¿Qué decisión tomarías y qué se pierde?"]),
    partes: [
      { titulo: "a) Proporción de varianza y acumulada", puntos: 2.5,
        solucion: p((o.sdev ? "En <code>summary(prcomp())</code> el autovalor es la desviación al cuadrado: $\\lambda=\\text{sd}^2$. " : "") + String.raw`Varianza total $=\sum\lambda_i=${N(tot, 3)}$ (${lam.length} variables estandarizadas ⇒ $\approx p=${lam.length}$). Proporción $=\lambda_k/\sum\lambda_i$:`) +
          tabla(["", ...lam.map((_, i) => `PC${i + 1}`)], [["$\\lambda$", ...lam.map((v) => M(v, 3))], ["Proporción", ...prop.map((v) => M(v, 3))], ["Acumulada", ...acum.map((v) => M(v, 3))]]) },
      { titulo: "b) Criterio del 80 % y criterio de Kaiser", puntos: 2,
        solucion: p(String.raw`<strong>80 %:</strong> la acumulada supera $0{,}80$ recién en PC${k80} ($${N(acum[k80 - 1], 3)}$) ⇒ ${k80} componente${k80 > 1 ? "s" : ""}.`, `<strong>Kaiser</strong> (autovalor $>1$, datos estandarizados): ${kK} componente${kK > 1 ? "s" : ""} (${lam.slice(0, kK).map((v) => M(v, 3)).join(", ")}).`) },
      { titulo: "c) Decisión", puntos: 1.5,
        solucion: p(k80 === kK ? `Ambos criterios coinciden en ${kK}. Se conservan ${kK} componentes, que explican el $${N(100 * acum[kK - 1], 1)}\\,\\%$ de la varianza; se pierde el $${N(100 * (1 - acum[kK - 1]), 1)}\\,\\%$ restante.` : `No coinciden (${k80} vs. ${kK}): Kaiser deja solo el $${N(100 * acum[kK - 1], 1)}\\,\\%$ de la varianza y el criterio del 80 % pide ${k80}. Se complementa con el codo del scree plot y con la interpretabilidad; una opción defendible es conservar ${Math.max(k80, kK)} ($${N(100 * acum[Math.max(k80, kK) - 1], 1)}\\,\\%$).`,
          "Los componentes descartados son los de menor varianza; PCA no elimina variables: cada componente combina todas.") }
    ],
    verifica: [vjs("acumulada en el corte del 80 %", `suma(${JSON.stringify(lam)}.slice(0, ${k80}))/suma(${JSON.stringify(lam)})`, acum[k80 - 1], 3), vjs("proporción PC1", `${lam[0]}/suma(${JSON.stringify(lam)})`, prop[0], 3)],
    fuente: [{ id: "C3", loc: "slide 15" }, { id: "C4.2", loc: "slides 4–5" }]
  });
}
function score(o) {
  const { datos, vars, nuevo, nombreNuevo } = o;
  const base = `pc <- prcomp(${datos}[, c(${vars.map((v) => `"${v}"`).join(", ")})], scale. = TRUE)`;
  const cen = Rv(`{${base}; pc$center}`).map((v) => rd(v, 2)), esc = Rv(`{${base}; pc$scale}`).map((v) => rd(v, 2));
  const rot = Rv(`{${base}; as.vector(pc$rotation[, 1:2])}`).map((v) => rd(v, 3)), k = vars.length;
  const l1 = rot.slice(0, k), l2 = rot.slice(k, 2 * k), z = nuevo.map((v, i) => (v - cen[i]) / esc[i]);
  const s1 = dot(l1, z), s2 = dot(l2, z);
  const lin = (l) => l.map((v, i) => `(${N(v, 3)})(${N(z[i], 3)})`).join("+");
  agregar("m09", {
    concepto: "m09-c03", dificultad: 2, titulo: o.titulo,
    enunciado: p(`${o.intro} Se hizo un PCA con datos estandarizados (<code>prcomp(…, scale. = TRUE)</code>) y se obtuvo:`) +
      tabla(["Variable", "Media", "Desv. estándar", "Loading PC1", "Loading PC2"], vars.map((v, i) => [v, M(cen[i]), M(esc[i]), M(l1[i], 3), M(l2[i], 3)])) +
      p(`${nombreNuevo}: ${vars.map((v, i) => `${v} $=${N(nuevo[i])}$`).join(", ")}.`) + incisos(["Estandariza la observación nueva.", "Calcula su score en PC1 y en PC2.", "Interpreta PC1 según los loadings y ubica la observación."]),
    partes: [
      { titulo: "a) Estandarizar con la media y desviación de la muestra", puntos: 2,
        solucion: p("$z_j=\\dfrac{x_j-\\bar x_j}{s_j}$ (con la media y desviación <strong>de la muestra original</strong>, no de la observación nueva):", ...vars.map((v, i) => String.raw`${v}: $\dfrac{${N(nuevo[i])}-${N(cen[i])}}{${N(esc[i])}}=${N(z[i], 3)}$`)) },
      { titulo: "b) Scores en PC1 y PC2", puntos: 2.5,
        solucion: p("Score $=$ suma de loading $\\times$ valor estandarizado:", String.raw`$PC_1=${lin(l1)}=${N(s1, 3)}$`, String.raw`$PC_2=${lin(l2)}=${N(s2, 3)}$`, "En R: <code>predict(pc, newdata = nuevo)</code>.") },
      { titulo: "c) Interpretación", puntos: 1.5, solucion: p(o.interp(l1, l2, s1, s2), "Un loading con $|v|\\ge0{,}30$ se considera relevante y $\\ge0{,}40$ fuerte; el signo indica la dirección. El signo global de un componente es arbitrario.") }
    ],
    verifica: [Object.assign(vr("score PC1 (predict)", `{${base}; predict(pc, data.frame(${vars.map((v, i) => `${v} = ${nuevo[i]}`).join(", ")}))[1]}`, s1, 2), { tol: 0.03 }), Object.assign(vr("score PC2 (predict)", `{${base}; predict(pc, data.frame(${vars.map((v, i) => `${v} = ${nuevo[i]}`).join(", ")}))[2]}`, s2, 2), { tol: 0.03 }),
      vjs("score PC1 con valores redondeados", `${JSON.stringify(l1)}.map((l, i) => l*(${JSON.stringify(nuevo)}[i] - ${JSON.stringify(cen)}[i])/${JSON.stringify(esc)}[i]).reduce((a, b) => a + b)`, s1, 3)],
    fuente: [{ id: "C3", loc: "slides 13–14 y 19–26" }, { id: "AY2-E", loc: "P5(d)" }]
  });
}
function m09() {
  pca2({ titulo: "PCA a mano con una matriz de covarianza 2 × 2", intro: "Se estudian dos variables de un grupo de empresas.", nombres: ["ventas", "utilidad"], S: [[5, 2], [2, 2]] });
  pca2({ titulo: "Autovalores y loadings de una matriz 2 × 2 (otro caso)", intro: "Se miden dos dimensiones de una pieza.", nombres: ["largo", "ancho"], S: [[10, 6], [6, 5]] });
  pca2({ titulo: "PCA sobre una matriz de correlación 2 × 2", intro: "Dos variables estandarizadas con correlación $0{,}6$.", nombres: ["la primera variable", "la segunda variable"], S: [[1, 0.6], [0.6, 1]], esCor: true });
  pca2({ titulo: "PCA con covarianza negativa", intro: "Se registran dos variables de un producto.", nombres: ["precio", "demanda"], S: [[8, -3], [-3, 4]] });
  cuantos({ titulo: "¿Cuántos componentes conservar? (autovalores dados)", intro: "Un PCA sobre 5 variables estandarizadas entrega estos autovalores:", lam: [2.9, 1.3, 0.45, 0.25, 0.1] });
  cuantos({ titulo: "¿Cuántos componentes? Lectura de summary(prcomp())", intro: "La salida <code>summary(pca)</code> de un PCA con 6 variables estandarizadas muestra estas desviaciones estándar:", sdev: [1.75, 1.2, 0.85, 0.7, 0.45, 0.3] });
  cuantos({ titulo: "Criterios que no coinciden (7 variables)", intro: "Un PCA sobre 7 indicadores estandarizados entrega estos autovalores:", lam: [3.2, 1.2, 0.9, 0.8, 0.5, 0.3, 0.1] });
  score({ titulo: "Score de un auto nuevo en los dos primeros componentes", intro: "Con el conjunto <code>mtcars</code> (32 autos) y las variables mpg (rendimiento), hp (potencia) y wt (peso).", datos: "mtcars", vars: ["mpg", "hp", "wt"], nuevo: [25, 100, 2.5], nombreNuevo: "Auto nuevo",
    interp: (l1, l2, s1) => `En PC1, mpg tiene signo ${l1[0] < 0 ? "negativo" : "positivo"} y hp y wt signo ${l1[1] < 0 ? "negativo" : "positivo"}: PC1 contrasta rendimiento contra potencia y peso (autos grandes y potentes en un extremo, livianos y eficientes en el otro). El auto nuevo tiene $PC_1=${N(s1, 2)}$: queda del lado de ${Math.sign(s1) === Math.sign(l1[0]) ? "los autos livianos y eficientes" : "los autos pesados y potentes"}.` });
  score({ titulo: "Score de un estado nuevo (USArrests)", intro: "Con <code>USArrests</code> (50 estados) y las variables Murder, Assault y UrbanPop.", datos: "USArrests", vars: ["Murder", "Assault", "UrbanPop"], nuevo: [12, 250, 60], nombreNuevo: "Estado nuevo",
    interp: (l1, l2, s1, s2) => `En PC1 las tres variables tienen el mismo signo, con Murder y Assault como las más fuertes: PC1 es un índice de criminalidad violenta. PC2 está dominado por UrbanPop (loading $${N(l2[2], 3)}$): grado de urbanización. El estado nuevo tiene $PC_1=${N(s1, 2)}$ (${Math.sign(s1) === Math.sign(l1[0]) ? "criminalidad sobre el promedio" : "criminalidad bajo el promedio"}) y $PC_2=${N(s2, 2)}$.` });
}

/* ══ M10 · Análisis factorial ══════════════════════════════════════════ */
function comunal(o) {
  const { vars, A } = o, pN = vars.length, h = A.map((f) => f[0] ** 2 + f[1] ** 2), ss = [0, 1].map((j) => suma(A.map((f) => f[j] ** 2)));
  const baja = h.indexOf(Math.min(...h));
  const grupo = (j) => vars.filter((_, i) => Math.abs(A[i][j]) >= 0.5 && Math.abs(A[i][j]) > Math.abs(A[i][1 - j]));
  agregar("m10", {
    concepto: "m10-c03", dificultad: 2, titulo: o.titulo,
    enunciado: p(`${o.intro} Un análisis factorial con 2 factores (variables estandarizadas, rotación Varimax) entrega estas cargas:`) + tabla(["Variable", "$F_1$", "$F_2$"], vars.map((v, i) => [v, M(A[i][0]), M(A[i][1])])) +
      incisos(["Calcula la comunalidad y la especificidad de cada variable.", "Calcula la varianza explicada por cada factor y la total.", "Interpreta los factores. ¿Qué variable queda peor representada?"]),
    partes: [
      { titulo: "a) Comunalidades y especificidades", puntos: 2.5,
        solucion: p("$h_i^2=a_{i1}^2+a_{i2}^2$ y $\\psi_i=1-h_i^2$:") + tabla(["Variable", "$h^2$", "$\\psi$"], vars.map((v, i) => [v, `$(${N(A[i][0])})^2+(${N(A[i][1])})^2=${N(h[i], 4)}$`, M(1 - h[i], 4)])) + p("La comunalidad es la parte de la varianza de la variable explicada por los factores comunes; $h^2+\\psi=1$.") },
      { titulo: "b) Varianza explicada por factor y total", puntos: 2,
        solucion: p(String.raw`Suma de cargas al cuadrado por columna (SS loadings): $F_1=${N(ss[0], 4)}$ y $F_2=${N(ss[1], 4)}$.`,
          String.raw`Proporción (se divide por $p=${pN}$): $F_1=${N(100 * ss[0] / pN, 1)}\,\%$, $F_2=${N(100 * ss[1] / pN, 1)}\,\%$; acumulada $=${N(100 * (ss[0] + ss[1]) / pN, 1)}\,\%$.`,
          String.raw`Comprobación: la suma de las comunalidades también es $${N(suma(h), 4)}$.`) },
      { titulo: "c) Interpretación de los factores", puntos: 1.5,
        solucion: p(`Con el criterio de carga significativa $>|0{,}5|$: $F_1$ agrupa ${grupo(0).join(", ")} ⇒ ${o.nombreF[0]}; $F_2$ agrupa ${grupo(1).join(", ")} ⇒ ${o.nombreF[1]}.`,
          `La peor representada es ${vars[baja]} ($h^2=${N(h[baja], 3)}$, especificidad $${N(1 - h[baja], 3)}$): ${h[baja] < 0.5 ? "más de la mitad de su varianza es específica" : "es la que tiene mayor varianza específica"}. La rotación no cambia las comunalidades ni la varianza total explicada.`) }
    ],
    verifica: [vjs(`comunalidad de ${vars[0]}`, `${A[0][0]}**2 + (${A[0][1]})**2`, h[0], 4), vjs("SS loadings F1", `suma(${JSON.stringify(A.map((f) => f[0]))}.map(a => a*a))`, ss[0], 4), vjs("varianza acumulada (%)", `100*suma(${JSON.stringify(A.flat())}.map(a => a*a))/${pN}`, 100 * (ss[0] + ss[1]) / pN, 1)],
    fuente: [{ id: "C4.1", loc: "slides 9–14" }, { id: "PR-P2-Q3", loc: "pregunta 3.2" }]
  });
}
function numFactores(o) {
  const { lam } = o, pN = lam.length, tot = suma(lam), acum = lam.map((_, i) => suma(lam.slice(0, i + 1)) / tot);
  const kK = lam.filter((l) => l > 1).length, k75 = acum.findIndex((a) => a >= 0.75) + 1, kmax = Math.floor((pN - 1) / 2);
  afirmar(lam.every((l) => Math.abs(l - 1) > 0.03) && acum.every((a) => Math.abs(a - 0.75) > 0.01 && Math.abs(a - 0.8) > 0.005), "autovalores en el borde");
  agregar("m10", {
    concepto: "m10-c06", dificultad: 2, titulo: o.titulo,
    enunciado: p(o.intro) + tabla(["Factor", ...lam.map((_, i) => i + 1)], [["Autovalor", ...lam.map((v) => M(v))]]) +
      incisos(["¿Cuántos factores sugiere el criterio de Kaiser?", "¿Cuántos sugiere el criterio del porcentaje de varianza ($75$–$80\\,\\%$)?", "¿Cuál es el máximo de factores que admite el modelo con este número de variables? ¿Qué decides?"]),
    partes: [
      { titulo: "a) Criterio de Kaiser", puntos: 1.5, solucion: p(`Se conservan los factores con autovalor $>1$: ${lam.slice(0, kK).map((v) => M(v)).join(", ")} ⇒ <strong>${kK}</strong> factor${kK > 1 ? "es" : ""}. (Kaiser tiende a subestimar el número de factores.)`) },
      { titulo: "b) Porcentaje de varianza acumulada", puntos: 2.5,
        solucion: p(`Varianza total $=p=${N(tot)}$ (variables estandarizadas).`) + tabla(["Factor", ...lam.map((_, i) => i + 1)], [["% varianza", ...lam.map((v) => M(100 * v / tot, 1))], ["% acumulado", ...acum.map((v) => M(100 * v, 1))]]) +
          p(`Se llega al rango $75$–$80\\,\\%$ con <strong>${k75}</strong> factor${k75 > 1 ? "es" : ""} ($${N(100 * acum[k75 - 1], 1)}\\,\\%$). Es un criterio arbitrario.`) },
      { titulo: "c) Máximo de factores y decisión", puntos: 2,
        solucion: p(String.raw`$k\le\dfrac{p-1}{2}=\dfrac{${pN}-1}{2}=${N((pN - 1) / 2)}$ ⇒ a lo más <strong>${kmax}</strong> factores.`,
          kK === k75 && kK > kmax ? `Kaiser y el porcentaje de varianza sugieren ${kK}, pero el modelo admite a lo más ${kmax}: se extraen <strong>${kmax}</strong> (para extraer más habría que agregar variables).` : kK === k75 ? `Kaiser y el porcentaje de varianza coinciden en ${kK}, y respeta el máximo: se extraen ${kK} factores.` : `Kaiser da ${kK} y el porcentaje da ${k75}. ${Math.max(kK, k75) <= kmax ? `Ambos respetan el máximo. Se revisa además el scree plot y el análisis paralelo, y se elige la solución más interpretable; como Kaiser subestima, ${Math.max(kK, k75)} es una elección razonable.` : `${Math.max(kK, k75)} supera el máximo, así que se extraen ${Math.min(kK, k75, kmax)}.`}`,
          "Otros criterios de la clase: a priori, scree plot (subjetivo) y análisis paralelo (autovalor real $>$ simulado).") }
    ],
    verifica: [vjs("% acumulado en el corte", `100*suma(${JSON.stringify(lam)}.slice(0, ${k75}))/suma(${JSON.stringify(lam)})`, 100 * acum[k75 - 1], 1), vjs("máximo de factores", `Math.floor((${pN} - 1)/2)`, kmax, 4)],
    fuente: [{ id: "C4.2", loc: "slides 3–5 y 16" }, { id: "C4.1", loc: "slide 22" }, { id: "PR-P2-Q3", loc: "pregunta 3.1" }]
  });
}
function m10() {
  comunal({ titulo: "Comunalidades, especificidades y varianza explicada (encuesta de servicio)", intro: "Una encuesta de satisfacción mide 5 ítems.", vars: ["Rapidez", "Amabilidad", "Limpieza", "Precio", "Promociones"],
    A: [[0.85, 0.1], [0.8, 0.2], [0.7, 0.15], [0.15, 0.9], [0.25, 0.6]], nombreF: ["«calidad de la atención»", "«conveniencia económica»"] });
  comunal({ titulo: "Comunalidades y factores (rendimiento escolar)", intro: "Se analizan las notas de 6 asignaturas.", vars: ["Matemática", "Física", "Química", "Lenguaje", "Historia", "Inglés"],
    A: [[0.9, 0.15], [0.85, 0.2], [0.75, 0.3], [0.2, 0.85], [0.1, 0.8], [0.35, 0.55]], nombreF: ["«habilidad científico-matemática»", "«habilidad verbal-humanista»"] });
  comunal({ titulo: "Comunalidades con cargas negativas (bienestar laboral)", intro: "Un cuestionario de clima laboral mide 5 escalas.", vars: ["Autonomía", "Reconocimiento", "Estrés", "Carga horaria", "Compañerismo"],
    A: [[0.8, -0.1], [0.75, -0.2], [-0.15, 0.85], [-0.05, 0.7], [0.6, -0.3]], nombreF: ["«satisfacción con el entorno»", "«presión del trabajo»"] });
  numFactores({ titulo: "¿Cuántos factores? Kaiser, varianza y límite del modelo (p = 7)", intro: "La matriz de correlación de 7 variables tiene estos autovalores:", lam: [2.8, 1.6, 1.1, 0.6, 0.45, 0.3, 0.15] });
  numFactores({ titulo: "¿Cuántos factores? (p = 8)", intro: "Un cuestionario de 8 ítems tiene estos autovalores en su matriz de correlación:", lam: [3.6, 1.9, 0.8, 0.6, 0.5, 0.3, 0.2, 0.1] });
  numFactores({ titulo: "¿Cuántos factores? Cuando el máximo del modelo manda (p = 5)", intro: "La matriz de correlación de 5 variables tiene estos autovalores:", lam: [2.1, 1.25, 1.05, 0.4, 0.2] });
  agregar("m10", {
    concepto: "m10-c04", dificultad: 2, origen: "nueva", titulo: "¿Son adecuados los datos para un análisis factorial?",
    enunciado: p("Antes de un análisis factorial con 6 variables y $n=120$ se obtuvo: test de Bartlett $\\chi^2=312{,}4$ con p-valor $<0{,}001$; KMO global $=0{,}78$; MSA por variable: $X_1=0{,}82$, $X_2=0{,}80$, $X_3=0{,}79$, $X_4=0{,}76$, $X_5=0{,}74$, $X_6=0{,}41$.") +
      incisos(["¿Cuántos grados de libertad tiene el test de Bartlett y qué concluye?", "Interpreta el KMO global.", "¿Qué harías con $X_6$? ¿Cuántos factores como máximo admite el modelo?"]),
    partes: [
      { titulo: "a) Test de Bartlett", puntos: 2, solucion: p("gl $=p(p-1)/2=6\\cdot5/2=15$. $H_0:R=I$. Como p-valor $<0{,}05$ se rechaza $H_0$: las variables están correlacionadas y tiene sentido buscar factores comunes.") },
      { titulo: "b) KMO global", puntos: 2, solucion: p("Regla de la clase: KMO $\\ge0{,}75$ bien; $\\ge0{,}5$ aceptable; $<0{,}5$ inaceptable. Con $0{,}78$ la adecuación muestral es <strong>buena</strong>: las correlaciones parciales son pequeñas frente a las correlaciones simples.") },
      { titulo: "c) Variable X₆ y máximo de factores", puntos: 2, solucion: p("$X_6$ tiene MSA $=0{,}41<0{,}5$ (inaceptable): comparte poca varianza con el resto; conviene <strong>eliminarla</strong> y repetir KMO y Bartlett con las otras 5.", "Máximo de factores: $k\\le(p-1)/2$. Con $p=6$: $2{,}5$ ⇒ $2$ factores; si se elimina $X_6$ ($p=5$): también $2$.") }
    ],
    verifica: [vjs("gl de Bartlett", "6*5/2", 15, 4)],
    fuente: [{ id: "C4.1", loc: "slides 17–20 y 22" }, { id: "C4.2", loc: "slides 15–16" }]
  });
}

module.exports = { m05, m06, m07, m08, m09, m10 };
