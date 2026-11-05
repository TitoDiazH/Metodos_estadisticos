/* ============================================================================
   generadores/p3lg.js — Ejercicios del LIBRO GUÍA (Gutiérrez y de la Vara,
   «Análisis y diseño de experimentos», 2.ª ed.) que el profesor recomendó para
   la Prueba 3: cap. 4 ej. 9–12 (bloques), cap. 5 ej. 18–22 (factoriales) y
   cap. 6 ej. 3, 5, 8 y 10 (factoriales 2^k).

   Cada ejercicio sale una vez como «ORIGINAL-LIBRO GUIA» (datos del libro) y
   2–3 veces como «MODIFICADA-LIBRO GUIA» (cambios ligeros en los datos o en el
   tamaño del diseño). Todos los números se calculan aquí (JS) o en R y se
   vuelven a comprobar en «verifica».

   IDs: se asignan en orden de llamada dentro de m20(), m21() y m25(). Para
   agregar más, sumar llamadas AL FINAL de esas funciones.
   ========================================================================== */
"use strict";
const L = require("./lib");
const { Rn, Rv, rd, N, suma, media, tabla, incisos, p, rvec, vr, agregar, afirmar } = L;

const ORIG = "ORIGINAL-LIBRO GUIA";
const MOD = "MODIFICADA-LIBRO GUIA";
const rango = (n) => Array.from({ length: n }, (_, i) => i);
const fp = (pv) => (pv < 0.0001 ? "\\lt 0{,}0001" : "=" + N(pv, 4));
const pTxt = (pv) => "$p" + fp(pv) + "$";
const decide = (pv, a) => (pv < a ? "se <strong>rechaza</strong> $H_0$" : "<strong>no se rechaza</strong> $H_0$");
const etiqueta = (o) => `${o.mod ? MOD : ORIG} · ${o.ej}`;
const aviso = (o) => o.mod
  ? `<p><strong>${MOD}</strong> — variante del ${o.ej} del libro guía. Cambio respecto del original: ${o.mod}.</p>`
  : `<p><strong>${ORIG}</strong> — ${o.ej} del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro.</p>`;
const fuenteLG = (o, curso) => [{ id: "LG", loc: o.loc }].concat(curso);
const comun = (o, clave, concepto, dificultad, curso) => ({
  concepto, dificultad, origen: o.mod ? "variacion" : "curso",
  base: o.mod ? [{ id: "LG", loc: o.loc }] : undefined,
  fuente: fuenteLG(o, curso)
});
function reg(clave, base, q) {
  /* Como en las pruebas: el código va acompañado de su salida real de R. */
  if (q.codigoR && !q.salidaR) { q.salidaR = L.Rtxt(q.codigoR).replace(/\s+$/, ""); q.salidaDe = q.codigoR; }
  const o = Object.assign({}, q, { concepto: base.concepto, dificultad: base.dificultad, origen: base.origen, fuente: base.fuente });
  if (base.base) o.base = base.base;
  agregar(clave, o);
}
const tAnova = (filas) => tabla(["Fuente", "SC", "gl", "CM", "$F_0$", "Valor-p"], filas.map((f) =>
  [f[0], "$" + N(f[1], 3) + "$", "$" + f[2] + "$", f[3] == null ? "" : "$" + N(f[3], 3) + "$", f[4] == null ? "" : "$" + N(f[4], 2) + "$", f[5] == null ? "" : "$" + fp(f[5]).replace(/^=/, "") + "$"]));
const tDatos = (cab, filasNom, M, fmt) => tabla(cab, M.map((f, i) => [filasNom[i]].concat(f.map(fmt || ((x) => Array.isArray(x) ? x.map((v) => N(v, 2)).join("; ") : N(x, 2))))));

/* ═════════════════════════ DBCA ═════════════════════════════════════════ */
function calcDBCA(o) {
  const Y = o.Y, a = Y.length, b = Y[0].length, Nn = a * b, al = o.alfa || 0.05;
  const Ti = Y.map(suma), Bj = rango(b).map((j) => suma(Y.map((f) => f[j]))), G = suma(Ti), C = G * G / Nn;
  const ssy = suma(Y.flat().map((x) => x * x));
  const SST = ssy - C, SStr = suma(Ti.map((t) => t * t)) / b - C, SSb = suma(Bj.map((t) => t * t)) / a - C, SSE = SST - SStr - SSb;
  const gT = a - 1, gB = b - 1, gE = (a - 1) * (b - 1), CMt = SStr / gT, CMb = SSb / gB, CME = SSE / gE, Ft = CMt / CME, Fb = CMb / CME;
  const datR = `y <- ${rvec(Y.flat())}; trat <- factor(rep(${rvec(o.trat.map((t) => JSON.stringify(t)))}, each = ${b})); bloque <- factor(rep(1:${b}, ${a}))`;
  const [pT, pB] = Rv(`pf(c(${Ft}, ${Fb}), c(${gT}, ${gB}), ${gE}, lower.tail = FALSE)`);
  const [FcT, FcB, tc] = Rv(`c(qf(${1 - al}, ${gT}, ${gE}), qf(${1 - al}, ${gB}, ${gE}), qt(${1 - al / 2}, ${gE}))`);
  const pSW = Rn(`{${datR}; shapiro.test(resid(aov(y ~ trat + bloque)))$p.value}`);
  const pLev = Rn(`{${datR}; car::leveneTest(y ~ trat)[1, 3]}`);
  const mT = Ti.map((t) => t / b), mB = Bj.map((t) => t / a), mG = G / Nn;
  const res = Y.map((f, i) => f.map((y, j) => y - mT[i] - mB[j] + mG));
  const dres = res.map((f) => f.map((e) => e / Math.sqrt(CME)));
  let imax = 0, jmax = 0; dres.forEach((f, i) => f.forEach((d, j) => { if (Math.abs(d) > Math.abs(dres[imax][jmax])) { imax = i; jmax = j; } }));
  const LSD = tc * Math.sqrt(2 * CME / b);
  return { Y, a, b, Nn, al, Ti, Bj, G, C, ssy, SST, SStr, SSb, SSE, gT, gB, gE, CMt, CMb, CME, Ft, Fb, pT, pB, FcT, FcB, tc, pSW, pLev, mT, mB, mG, res, dres, imax, jmax, LSD, datR };
}
function snDBCA(o, R) {
  const t = o.trat, bl = o.bloq, A = R.al;
  const s = {};
  s.modelo = p(String.raw`Diseño en bloques completos al azar (DBCA): cada ${o.nomBloque} (bloque) recibe los ${R.a} ${o.nomTrat}s en orden aleatorio. Modelo: $Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij}$, $i=1,\dots,${R.a}$ (${o.nomTrat}), $j=1,\dots,${R.b}$ (${o.nomBloque}), $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes y sin interacción ${o.nomTrat} × ${o.nomBloque}.`,
    String.raw`Tratamientos: $H_0:\tau_1=\dots=\tau_${R.a}=0$ (las ${R.a} medias son iguales) contra $H_1:\tau_i\neq0$ para algún $i$. Bloques: $H_0:\gamma_1=\dots=\gamma_${R.b}=0$ contra $H_1:\gamma_j\neq0$ para algún $j$.`);
  s.totales = tabla([""].concat(bl, ["Total $Y_{i\\cdot}$", "Media"]),
    R.Y.map((f, i) => [t[i]].concat(f.map((x) => "$" + N(x, 2) + "$"), ["$" + N(R.Ti[i], 2) + "$", "$" + N(R.mT[i], 3) + "$"]))
      .concat([["Total $Y_{\\cdot j}$"].concat(R.Bj.map((x) => "$" + N(x, 2) + "$"), ["$Y_{\\cdot\\cdot}=" + N(R.G, 2) + "$", "$" + N(R.mG, 3) + "$"])]));
  s.sc = p(String.raw`$N=${R.a}\cdot${R.b}=${R.Nn}$, $\;Y_{\cdot\cdot}^2/N=${N(R.G, 2)}^2/${R.Nn}=${N(R.C, 3)}$, $\;\sum\sum Y_{ij}^2=${N(R.ssy, 3)}$.`,
    String.raw`$SC_T=${N(R.ssy, 3)}-${N(R.C, 3)}=${N(R.SST, 3)}$`,
    String.raw`$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{b}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{${N(suma(R.Ti.map((x) => x * x)), 3)}}{${R.b}}-${N(R.C, 3)}=${N(R.SStr, 3)}$`,
    String.raw`$SC_B=\dfrac{\sum Y_{\cdot j}^2}{a}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{${N(suma(R.Bj.map((x) => x * x)), 3)}}{${R.a}}-${N(R.C, 3)}=${N(R.SSb, 3)}$`,
    String.raw`$SC_E=SC_T-SC_{TRAT}-SC_B=${N(R.SSE, 3)}$`);
  s.tabla = tAnova([[o.NomTrat, R.SStr, R.gT, R.CMt, R.Ft, R.pT], [o.NomBloque, R.SSb, R.gB, R.CMb, R.Fb, R.pB], ["Error", R.SSE, R.gE, R.CME], ["Total", R.SST, R.Nn - 1]]);
  s.concT = p(String.raw`${o.NomTrat}: $F_0=${N(R.Ft, 2)}$ ${R.Ft > R.FcT ? "&gt;" : "&lt;"} $F_{${N(A, 2)};${R.gT},${R.gE}}=${N(R.FcT, 2)}$ (${pTxt(R.pT)}) ⇒ ${decide(R.pT, A)}. ${R.pT < A ? `Hay diferencias entre ${o.nomTrat}s: al menos uno tiene una ${o.respuesta} media distinta.` : `No hay evidencia de diferencias entre las ${o.respuesta}s medias de los ${o.nomTrat}s.`}`);
  s.concB = p(String.raw`${o.NomBloque}: $F_0=${N(R.Fb, 2)}$ ${R.Fb > R.FcB ? "&gt;" : "&lt;"} $F_{${N(A, 2)};${R.gB},${R.gE}}=${N(R.FcB, 2)}$ (${pTxt(R.pB)}) ⇒ ${decide(R.pB, A)}. ${R.pB < A ? `El ${o.nomBloque} sí influye: bloquear fue útil porque sacó esa variabilidad del error.` : `No se detecta efecto del ${o.nomBloque}; el bloqueo no era indispensable (aunque no perjudica mucho: solo cuesta ${R.gB} gl del error).`}`);
  const pares = [];
  for (let i = 0; i < R.a; i++) for (let j = i + 1; j < R.a; j++) { const d = R.mT[i] - R.mT[j]; pares.push([`${t[i]} − ${t[j]}`, "$" + N(Math.abs(d), 3) + "$", Math.abs(d) > R.LSD ? "Sí" : "No"]); }
  const orden = rango(R.a).sort((x, y) => (o.objetivo === "min" ? R.mT[x] - R.mT[y] : R.mT[y] - R.mT[x]));
  const mejor = orden[0], empatan = orden.slice(1).filter((i) => Math.abs(R.mT[i] - R.mT[mejor]) <= R.LSD);
  s.lsd = p(String.raw`$LSD=t_{${N(A / 2, 3)};\,${R.gE}}\sqrt{\dfrac{2\,CM_E}{b}}=${N(R.tc, 3)}\sqrt{\dfrac{2\cdot${N(R.CME, 4)}}{${R.b}}}=${N(R.LSD, 3)}$`) +
    tabla(["Diferencia", "$|\\bar Y_{i\\cdot}-\\bar Y_{j\\cdot}|$", "¿Significativa?"], pares) +
    p(`Medias: ${orden.map((i) => `${t[i]} $=${N(R.mT[i], 3)}$`).join(", ")}. ` +
      (R.pT >= A ? "Como el ANOVA no rechazó $H_0$, en rigor no hay un " + o.nomTrat + " mejor; el LSD solo se informa como ejercicio." :
        (empatan.length ? `El de mejor media es <strong>${t[mejor]}</strong>, pero no difiere significativamente de ${empatan.map((i) => t[i]).join(" y ")}: estadísticamente empatan; se elige entre ellos por costo u otro criterio.` : `<strong>${t[mejor]}</strong> es significativamente ${o.objetivo === "min" ? "menor" : "mejor"} que todos los demás.`)) +
      ` (Objetivo${o.objSupuesto ? " supuesto, el enunciado no lo dice" : ""}: ${o.objetivo === "min" ? "minimizar" : "maximizar"} la ${o.respuesta}.) En R: <code>agricolae::LSD.test(modelo, "trat")</code>.`);
  s.supuestos = p(String.raw`Normalidad (Shapiro–Wilk sobre los residuos del modelo con bloque): ${pTxt(R.pSW)} ⇒ ${R.pSW < A ? "se rechaza la normalidad" : "no se rechaza la normalidad"}.`,
    String.raw`Varianza constante entre ${o.nomTrat}s (Levene, <code>car::leveneTest(y ~ trat)</code>): ${pTxt(R.pLev)} ⇒ ${R.pLev < A ? "las varianzas difieren" : "no hay evidencia de varianzas distintas"}.`,
    "Gráficamente: QQ-plot de residuos (puntos sobre la recta) y residuos contra predichos y contra " + o.nomTrat + " (banda horizontal sin forma de embudo).");
  s.residuos = p(String.raw`Residuo del DBCA: $e_{ij}=Y_{ij}-\bar Y_{i\cdot}-\bar Y_{\cdot j}+\bar Y_{\cdot\cdot}$. El mayor en valor absoluto es el de ${t[R.imax]} en ${bl[R.jmax]}: $e=${N(R.res[R.imax][R.jmax], 3)}$, estandarizado $d=e/\sqrt{CM_E}=${N(R.dres[R.imax][R.jmax], 2)}$.`,
    Math.abs(R.dres[R.imax][R.jmax]) > 2.5 ? `Ese residuo es grande ($|d|>2{,}5$; cerca de 3 se considera posible <strong>dato atípico</strong>): conviene revisar esa medición, porque infla el $CM_E$ y le quita potencia al ANOVA.` : "Ningún residuo estandarizado supera 2,5 en valor absoluto: no hay datos atípicos evidentes.",
    String.raw`Shapiro–Wilk ${pTxt(R.pSW)}; Levene entre ${o.nomTrat}s ${pTxt(R.pLev)}.`);
  return s;
}
const vDBCA = (R) => [
  vr("F tratamiento", `{${R.datR}; summary(aov(y ~ trat + bloque))[[1]][1, 4]}`, R.Ft, 2),
  vr("F bloque", `{${R.datR}; summary(aov(y ~ trat + bloque))[[1]][2, 4]}`, R.Fb, 2),
  vr("CME", `{${R.datR}; summary(aov(y ~ trat + bloque))[[1]][3, 3]}`, R.CME, 3),
  vr("LSD", `qt(${1 - R.al / 2}, ${R.gE}) * sqrt(2 * ${R.CME} / ${R.b})`, R.LSD, 3)
];
const codDBCA = (R) => `${R.datR}\nmodelo <- aov(y ~ trat + bloque)\nsummary(modelo)\nlibrary(agricolae)\nLSD.test(modelo, "trat", console = TRUE)\nshapiro.test(resid(modelo))\ncar::leveneTest(y ~ trat)`;

/* Cap. 4, ej. 9: DBCA a mano con totales */
function ej4_9(o) {
  const R = calcDBCA(o), s = snDBCA(o, R), b = comun(o, "m20", "m20-c03", 2, [{ id: "C7.3", loc: "slides 9–17" }]);
  reg("m20", b, {
    titulo: `${etiqueta(o)} · DBCA a mano: totales, SC, ANOVA y LSD${o.sufijo ? " (" + o.sufijo + ")" : ""}`,
    enunciado: aviso(o) + p(`A continuación se muestran los datos de un diseño en bloques al azar (${R.a} tratamientos, ${R.b} bloques). Use $\\alpha=${N(R.al, 2)}$.`) +
      tDatos([""].concat(o.bloq), o.trat, R.Y) +
      incisos(["Complete los totales por tratamiento $Y_{i\\cdot}$, por bloque $Y_{\\cdot j}$ y el total global $Y_{\\cdot\\cdot}$.", "Calcule las sumas de cuadrados $SC_{TRAT}$, $SC_B$, $SC_T$ y $SC_E$.", "Obtenga la tabla de análisis de varianza y anote las principales conclusiones.", "Obtenga la diferencia mínima significativa (LSD) para comparar tratamientos en este diseño en bloques."]),
    codigoR: codDBCA(R),
    partes: [
      { titulo: "a) Totales", puntos: 1, solucion: s.totales },
      { titulo: "b) Sumas de cuadrados", puntos: 2, solucion: s.sc },
      { titulo: "c) Tabla ANOVA y conclusiones", puntos: 1.5, solucion: s.tabla + s.concT + s.concB },
      { titulo: "d) LSD y comparaciones", puntos: 1.5, solucion: s.lsd }
    ],
    verifica: vDBCA(R).concat([L.vjs("Y..", `${rvec(R.Y.flat())}.reduce((a,b)=>a+b,0)`, R.G, 2)]).map(fixVjs)
  });
}
/* lib.vjs espera código JS; rvec da "c(...)": se traduce a arreglo JS */
function fixVjs(v) { if (v.js) v.js = v.js.replace(/^c\(/, "[").replace(/\)\.reduce/, "].reduce"); return v; }

/* Cap. 4, ej. 10: atomizadores */
function ej4_10(o) {
  const R = calcDBCA(o), s = snDBCA(o, R), b = comun(o, "m20", "m20-c03", 2, [{ id: "C7.3", loc: "slides 9–17" }, { id: "C7.3", loc: "slides 18–24" }]);
  reg("m20", b, {
    titulo: `${etiqueta(o)} · DBCA: ${R.a} marcas de atomizador en ${R.b} días`,
    enunciado: aviso(o) + p(`Se estudia la efectividad de ${R.a} marcas de atomizador para matar moscas. Cada producto se aplica a un grupo de 100 moscas y se registra el porcentaje de moscas muertas. Se hicieron ${R.b} réplicas en días diferentes, por lo que se sospecha un efecto del día. Use $\\alpha=0{,}05$.`) +
      tDatos(["Marca"].concat(o.bloq), o.trat, R.Y) +
      incisos(["Suponiendo un DBCA, formule las hipótesis adecuadas y el modelo estadístico.", "¿Existe diferencia entre la efectividad promedio de los atomizadores?", "¿Hay algún atomizador mejor? Argumente su respuesta.", "¿Hay diferencias significativas en los resultados de diferentes días en que se realizó el experimento? Argumente su respuesta.", "Verifique los supuestos de normalidad y de igual varianza entre las marcas."]),
    codigoR: codDBCA(R),
    partes: [
      { titulo: "a) Modelo e hipótesis", puntos: 1, solucion: s.modelo },
      { titulo: "b) ANOVA y diferencia entre marcas", puntos: 1.5, solucion: s.sc + s.tabla + s.concT },
      { titulo: "c) ¿Hay un atomizador mejor? (LSD)", puntos: 1.5, solucion: s.lsd },
      { titulo: "d) Efecto del día (bloque)", puntos: 1, solucion: s.concB },
      { titulo: "e) Supuestos", puntos: 1, solucion: s.supuestos }
    ],
    verifica: vDBCA(R).concat([vr("p Shapiro", `{${R.datR}; shapiro.test(resid(aov(y ~ trat + bloque)))$p.value}`, R.pSW, 4)])
  });
}

/* Cap. 4, ej. 11: silos */
function ej4_11(o) {
  const R = calcDBCA(o), s = snDBCA(o, R), b = comun(o, "m20", "m20-c05", 2, [{ id: "C7.3", loc: "slides 9–17" }]);
  reg("m20", b, {
    titulo: `${etiqueta(o)} · DBCA: temperatura de ${R.a} silos en ${R.b} días`,
    enunciado: aviso(o) + p(`En una empresa lechera se tienen varios silos para almacenar leche. Un aspecto crítico es la temperatura de almacenamiento y se sospecha que en algunos silos hay problemas; por ello, durante ${R.b} días se registra la temperatura a cierta hora crítica. La temperatura de un día a otro es una fuente de variabilidad que podría impactar la variabilidad total. Use $\\alpha=0{,}05$.`) +
      tDatos(["Silo"].concat(o.bloq), o.trat, R.Y) +
      incisos(["En este problema, ¿cuál es el factor de tratamiento y cuál el factor de bloque?", "Suponga un DBCA, formule las hipótesis adecuadas y el modelo estadístico.", "¿Hay diferencia entre los silos?", "¿La temperatura de un día a otro es diferente?", "Revise residuos, ¿hay algún problema evidente?"]),
    codigoR: codDBCA(R),
    partes: [
      { titulo: "a) Factor de tratamiento y de bloque", puntos: 0.5, solucion: p("Tratamiento: el <strong>silo</strong> (es lo que se quiere comparar). Bloque: el <strong>día</strong> (fuente de variación conocida que no interesa estudiar, pero que se controla para que no infle el error).") },
      { titulo: "b) Modelo e hipótesis", puntos: 1, solucion: s.modelo },
      { titulo: "c) ¿Hay diferencia entre silos?", puntos: 2, solucion: s.sc + s.tabla + s.concT },
      { titulo: "d) ¿Difiere la temperatura entre días?", puntos: 1, solucion: s.concB },
      { titulo: "e) Revisión de residuos", puntos: 1.5, solucion: s.residuos }
    ],
    verifica: vDBCA(R)
  });
}

/* Cap. 4, ej. 12: detergentes */
function ej4_12(o) {
  const R = calcDBCA(o), s = snDBCA(o, R), b = comun(o, "m20", "m20-c03", 2, [{ id: "C7.3", loc: "slides 9–17" }, { id: "C7.3", loc: "slides 18–24" }]);
  reg("m20", b, {
    titulo: `${etiqueta(o)} · DBCA: ${R.a} detergentes en ${R.b} lavadoras`,
    enunciado: aviso(o) + p(`Se diseñó un experimento para estudiar el rendimiento de ${R.a} detergentes. Las siguientes lecturas de «blancura» se obtuvieron con un equipo especial para ${R.Nn} cargas de lavado, distribuidas en ${R.b} modelos de lavadoras (mayor blancura es mejor). Use $\\alpha=0{,}05$.`) +
      tDatos(["Detergente"].concat(o.bloq), o.trat, R.Y) +
      incisos(["Señale el nombre del diseño experimental utilizado.", "Formule la hipótesis que se quiere probar en este problema.", "Realice el análisis estadístico más apropiado para estos datos y obtenga conclusiones."]),
    codigoR: codDBCA(R),
    partes: [
      { titulo: "a) Nombre del diseño", puntos: 1, solucion: p(`Diseño en <strong>bloques completos al azar</strong> (DBCA): el factor de interés es el detergente (${R.a} niveles) y la lavadora es un factor de bloque (${R.b} niveles); cada lavadora recibe una carga con cada detergente, en orden aleatorio.`) },
      { titulo: "b) Hipótesis", puntos: 1, solucion: s.modelo },
      { titulo: "c) Tabla ANOVA y conclusión", puntos: 2, solucion: s.sc + s.tabla + s.concT + s.concB },
      { titulo: "c) Comparaciones LSD y recomendación", puntos: 2, solucion: s.lsd }
    ],
    verifica: vDBCA(R)
  });
}

/* ═════════════════════════ FACTORIAL a × b ══════════════════════════════ */
function calcFact(o) {
  const Y = o.Y, a = Y.length, b = Y[0].length, n = Y[0][0].length, Nn = a * b * n, al = o.alfa || 0.05;
  const Yij = Y.map((f) => f.map(suma)), Yi = Yij.map(suma), Yj = rango(b).map((j) => suma(Yij.map((f) => f[j]))), G = suma(Yi), C = G * G / Nn;
  const ssy = suma(Y.flat(2).map((x) => x * x));
  const SST = ssy - C, SSA = suma(Yi.map((x) => x * x)) / (b * n) - C, SSB = suma(Yj.map((x) => x * x)) / (a * n) - C;
  const SSsub = suma(Yij.flat().map((x) => x * x)) / n - C, SSAB = SSsub - SSA - SSB, SSE = SST - SSsub;
  const gA = a - 1, gB = b - 1, gAB = gA * gB, gE = a * b * (n - 1);
  const CMA = SSA / gA, CMB = SSB / gB, CMAB = SSAB / gAB, CME = SSE / gE, FA = CMA / CME, FB = CMB / CME, FAB = CMAB / CME;
  const datR = `y <- ${rvec(Y.flat(2))}; A <- factor(rep(1:${a}, each = ${b * n})); B <- factor(rep(rep(1:${b}, each = ${n}), ${a}))`;
  const [pA, pB, pAB] = Rv(`pf(c(${FA}, ${FB}, ${FAB}), c(${gA}, ${gB}, ${gAB}), ${gE}, lower.tail = FALSE)`);
  const [FcA, FcB, FcAB, tc, qA, qB] = Rv(`c(qf(${1 - al}, ${gA}, ${gE}), qf(${1 - al}, ${gB}, ${gE}), qf(${1 - al}, ${gAB}, ${gE}), qt(${1 - al / 2}, ${gE}), qtukey(${1 - al}, ${a}, ${gE}), qtukey(${1 - al}, ${b}, ${gE}))`);
  const pSW = Rn(`{${datR}; shapiro.test(resid(aov(y ~ A * B)))$p.value}`);
  const pLev = Rn(`{${datR}; car::leveneTest(y ~ A:B)[1, 3]}`);
  const mij = Yij.map((f) => f.map((x) => x / n)), mi = Yi.map((x) => x / (b * n)), mj = Yj.map((x) => x / (a * n)), mG = G / Nn;
  const LA = tc * Math.sqrt(2 * CME / (b * n)), LB = tc * Math.sqrt(2 * CME / (a * n)), LAB = tc * Math.sqrt(2 * CME / n);
  const HA = qA * Math.sqrt(CME / (b * n)), HB = qB * Math.sqrt(CME / (a * n));
  const resA = rango(a).map((i) => { const e = Y[i].flatMap((f, j) => f.map((y) => y - mij[i][j])); return Math.sqrt(suma(e.map((x) => x * x)) / (e.length - 1)); });
  return { Y, a, b, n, Nn, al, Yij, Yi, Yj, G, C, ssy, SST, SSA, SSB, SSsub, SSAB, SSE, gA, gB, gAB, gE, CMA, CMB, CMAB, CME, FA, FB, FAB, pA, pB, pAB, FcA, FcB, FcAB, tc, qA, qB, pSW, pLev, mij, mi, mj, mG, LA, LB, LAB, HA, HB, resA, datR };
}
function snFact(o, R) {
  const A = R.al, s = {}, nA = o.nomA, nB = o.nomB, la = o.nivA, lb = o.nivB;
  s.modelo = p(String.raw`Diseño factorial ${R.a} × ${R.b} con $n=${R.n}$ réplicas (${R.Nn} corridas en orden aleatorio). Modelo de efectos fijos: $Y_{ijk}=\mu+\alpha_i+\beta_j+(\alpha\beta)_{ij}+\varepsilon_{ijk}$, $i=1,\dots,${R.a}$ (${nA}), $j=1,\dots,${R.b}$ (${nB}), $k=1,\dots,${R.n}$, $\varepsilon_{ijk}\sim N(0,\sigma^2)$ independientes.`,
    String.raw`$H_0:\alpha_1=\dots=\alpha_${R.a}=0$ (${nA} no influye); $\;H_0:\beta_1=\dots=\beta_${R.b}=0$ (${nB} no influye); $\;H_0:(\alpha\beta)_{ij}=0\ \forall i,j$ (no hay interacción). Cada una contra $H_1$: al menos un efecto $\neq0$.`);
  s.totales = tabla([`${nA} \\ ${nB}`].concat(lb, ["$Y_{i\\cdot\\cdot}$"]),
    R.Yij.map((f, i) => [la[i]].concat(f.map((x, j) => `$Y_{${i + 1}${j + 1}\\cdot}=${N(x, 2)}$`), ["$" + N(R.Yi[i], 2) + "$"]))
      .concat([["$Y_{\\cdot j\\cdot}$"].concat(R.Yj.map((x) => "$" + N(x, 2) + "$"), ["$Y_{\\cdot\\cdot\\cdot}=" + N(R.G, 2) + "$"])]));
  s.sc = p(String.raw`$N=abn=${R.Nn}$, $\;Y_{\cdot\cdot\cdot}^2/N=${N(R.C, 3)}$, $\;\sum Y_{ijk}^2=${N(R.ssy, 3)}$.`,
    String.raw`$SC_T=${N(R.ssy, 3)}-${N(R.C, 3)}=${N(R.SST, 3)}$`,
    String.raw`$SC_A=\dfrac{\sum Y_{i\cdot\cdot}^2}{bn}-\dfrac{Y_{\cdot\cdot\cdot}^2}{N}=\dfrac{${N(suma(R.Yi.map((x) => x * x)), 3)}}{${R.b * R.n}}-${N(R.C, 3)}=${N(R.SSA, 3)}$`,
    String.raw`$SC_B=\dfrac{\sum Y_{\cdot j\cdot}^2}{an}-\dfrac{Y_{\cdot\cdot\cdot}^2}{N}=\dfrac{${N(suma(R.Yj.map((x) => x * x)), 3)}}{${R.a * R.n}}-${N(R.C, 3)}=${N(R.SSB, 3)}$`,
    String.raw`$SC_{AB}=\dfrac{\sum\sum Y_{ij\cdot}^2}{n}-\dfrac{Y_{\cdot\cdot\cdot}^2}{N}-SC_A-SC_B=${N(R.SSsub, 3)}-${N(R.SSA, 3)}-${N(R.SSB, 3)}=${N(R.SSAB, 3)}$`,
    String.raw`$SC_E=SC_T-SC_A-SC_B-SC_{AB}=${N(R.SSE, 3)}$`);
  s.tabla = tAnova([[nA + " (A)", R.SSA, R.gA, R.CMA, R.FA, R.pA], [nB + " (B)", R.SSB, R.gB, R.CMB, R.FB, R.pB], ["AB", R.SSAB, R.gAB, R.CMAB, R.FAB, R.pAB], ["Error", R.SSE, R.gE, R.CME], ["Total", R.SST, R.Nn - 1]]);
  const lin = (nom, F, Fc, g1, pv) => String.raw`${nom}: $F_0=${N(F, 2)}$ ${F > Fc ? "&gt;" : "&lt;"} $F_{${N(A, 2)};${g1},${R.gE}}=${N(Fc, 2)}$ (${pTxt(pv)}) ⇒ ${pv < A ? "<strong>activo</strong> (significativo)" : "no significativo"}.`;
  s.conc = p(lin(nA, R.FA, R.FcA, R.gA, R.pA), lin(nB, R.FB, R.FcB, R.gB, R.pB), lin("Interacción " + nA + " × " + nB, R.FAB, R.FcAB, R.gAB, R.pAB),
    R.pAB < A ? `Como la interacción es significativa, el efecto de un factor depende del nivel del otro: las conclusiones se sacan mirando las ${R.a * R.b} medias de tratamiento (gráfica de interacción), no los efectos principales por separado.` :
      "Como la interacción no es significativa, los efectos principales se interpretan por separado (gráficas de efectos principales).");
  s.medias = tabla([`Medias ${nA} \\ ${nB}`].concat(lb, ["$\\bar Y_{i\\cdot\\cdot}$"]),
    R.mij.map((f, i) => [la[i]].concat(f.map((x) => "$" + N(x, 3) + "$"), ["$" + N(R.mi[i], 3) + "$"]))
      .concat([["$\\bar Y_{\\cdot j\\cdot}$"].concat(R.mj.map((x) => "$" + N(x, 3) + "$"), ["$" + N(R.mG, 3) + "$"])]));
  s.lsdSin = p(String.raw`Sin interacción, cada media de A promedia $bn=${R.b * R.n}$ datos y cada media de B, $an=${R.a * R.n}$:`,
    String.raw`$LSD_A=t_{${N(A / 2, 3)};${R.gE}}\sqrt{\dfrac{2\,CM_E}{bn}}=${N(R.tc, 3)}\sqrt{\dfrac{2\cdot${N(R.CME, 4)}}{${R.b * R.n}}}=${N(R.LA, 3)}$`,
    String.raw`$LSD_B=t_{${N(A / 2, 3)};${R.gE}}\sqrt{\dfrac{2\,CM_E}{an}}=${N(R.tc, 3)}\sqrt{\dfrac{2\cdot${N(R.CME, 4)}}{${R.a * R.n}}}=${N(R.LB, 3)}$`,
    `Medias de A: ${la.map((l, i) => `${l} $=${N(R.mi[i], 3)}$`).join(", ")}. Medias de B: ${lb.map((l, j) => `${l} $=${N(R.mj[j], 3)}$`).join(", ")}. Dos medias difieren si su distancia supera el LSD correspondiente.`);
  s.lsdCon = p(String.raw`Con interacción se comparan las medias de las celdas ($n=${R.n}$ datos cada una): $LSD_{AB}=t_{${N(A / 2, 3)};${R.gE}}\sqrt{\dfrac{2\,CM_E}{n}}=${N(R.tc, 3)}\sqrt{\dfrac{2\cdot${N(R.CME, 4)}}{${R.n}}}=${N(R.LAB, 3)}$.`,
    "Es mayor que los LSD de efectos principales porque cada media de celda se basa en menos datos.");
  s.tukey = p(String.raw`Tukey: $HSD=q_{${N(A, 2)}}(k,${R.gE})\sqrt{CM_E/r}$. Para A: $q(${R.a},${R.gE})=${N(R.qA, 3)}$, $HSD_A=${N(R.HA, 3)}$ (LSD $=${N(R.LA, 3)}$). Para B: $q(${R.b},${R.gE})=${N(R.qB, 3)}$, $HSD_B=${N(R.HB, 3)}$ (LSD $=${N(R.LB, 3)}$).`,
    "Tukey da un umbral mayor (es más conservador: controla el error tipo I de todas las comparaciones a la vez); si una diferencia es significativa con Tukey, también lo es con LSD.");
  // mejor tratamiento
  const sgn = o.objetivo === "min" ? 1 : -1;
  let bi = 0, bj = 0, pred, txt;
  if (R.pAB < A) {
    R.mij.forEach((f, i) => f.forEach((m, j) => { if (sgn * (m - R.mij[bi][bj]) < 0) { bi = i; bj = j; } }));
    pred = R.mij[bi][bj];
    txt = String.raw`Como la interacción es activa, se elige la mejor celda: <strong>${nA} ${la[bi]} con ${nB} ${lb[bj]}</strong>, con predicción igual a su media: $\hat Y=\bar Y_{${bi + 1}${bj + 1}\cdot}=${N(pred, 3)}$.`;
  } else {
    bi = rango(R.a).reduce((x, y) => (sgn * (R.mi[y] - R.mi[x]) < 0 ? y : x), 0);
    bj = rango(R.b).reduce((x, y) => (sgn * (R.mj[y] - R.mj[x]) < 0 ? y : x), 0);
    const dA = R.pA < A ? R.mi[bi] - R.mG : 0, dB = R.pB < A ? R.mj[bj] - R.mG : 0;
    pred = R.mG + dA + dB;
    txt = String.raw`Sin interacción, el modelo aditivo predice $\hat Y=\bar Y_{\cdot\cdot\cdot}${R.pA < A ? "+(\\bar Y_{i\\cdot\\cdot}-\\bar Y_{\\cdot\\cdot\\cdot})" : ""}${R.pB < A ? "+(\\bar Y_{\\cdot j\\cdot}-\\bar Y_{\\cdot\\cdot\\cdot})" : ""}$ (solo con los efectos activos). ` +
      `${R.pA < A ? `${nA}: conviene <strong>${la[bi]}</strong>.` : `${nA} no influye: se puede usar el nivel más barato.`} ${R.pB < A ? `${nB}: conviene <strong>${lb[bj]}</strong>.` : `${nB} no influye: se puede usar el nivel más barato.`} ` +
      String.raw`Predicción: $\hat Y=${N(R.mG, 3)}${R.pA < A ? (dA >= 0 ? "+" : "") + N(dA, 3) : ""}${R.pB < A ? (dB >= 0 ? "+" : "") + N(dB, 3) : ""}=${N(pred, 3)}$.`;
  }
  s.mejor = p(`Objetivo: ${o.objetivo === "min" ? "minimizar" : "maximizar"} ${/^(hinchamiento|color)$/.test(o.respuesta) ? "el" : "la"} ${o.respuesta}. ` + txt);
  s.mejorDatos = { bi, bj, pred };
  s.supuestos = p(String.raw`Normalidad de residuos ($e_{ijk}=Y_{ijk}-\bar Y_{ij\cdot}$), Shapiro–Wilk: ${pTxt(R.pSW)} ⇒ ${R.pSW < A ? "se rechaza la normalidad" : "no se rechaza la normalidad"}.`,
    String.raw`Varianza constante entre los ${R.a * R.b} tratamientos (Levene, <code>car::leveneTest(y ~ A:B)</code>): ${pTxt(R.pLev)} ⇒ ${R.pLev < A ? "hay evidencia de varianzas distintas" : "no hay evidencia de varianzas distintas"}.`,
    "Gráficas: QQ-plot de residuos, residuos contra predichos (sin embudo) y residuos contra cada factor.");
  return s;
}
const vFact = (R) => [
  vr("F A", `{${R.datR}; summary(aov(y ~ A * B))[[1]][1, 4]}`, R.FA, 2),
  vr("F B", `{${R.datR}; summary(aov(y ~ A * B))[[1]][2, 4]}`, R.FB, 2),
  vr("F AB", `{${R.datR}; summary(aov(y ~ A * B))[[1]][3, 4]}`, R.FAB, 2),
  vr("CME", `format({${R.datR}; summary(aov(y ~ A * B))[[1]][4, 3]}, digits = 15)`, R.CME, 3)
];
const codFact = (R, nA, nB) => `${R.datR}   # A = ${nA}, B = ${nB}\nmodelo <- aov(y ~ A * B)\nsummary(modelo)\ninteraction.plot(A, B, y)\nmodel.tables(modelo, "means")\nshapiro.test(resid(modelo))\ncar::leveneTest(y ~ A:B)`;
const celdas = (o, R) => tabla([`${o.nomA} \\ ${o.nomB}`].concat(o.nivB), R.Y.map((f, i) => [o.nivA[i]].concat(f.map((c) => c.map((v) => N(v, 2)).join("; ")))));

/* Cap. 5, ej. 18: factorial 2×3 a mano */
function ej5_18(o) {
  const R = calcFact(o), s = snFact(o, R), b = comun(o, "m25", "m25-c04", 2, [{ id: "C7.3", loc: "slides 25–40" }]);
  reg("m25", b, {
    titulo: `${etiqueta(o)} · Factorial ${R.a}×${R.b} a mano: totales, SC, ANOVA y LSD${o.sufijo ? " (" + o.sufijo + ")" : ""}`,
    enunciado: aviso(o) + p(`En la siguiente tabla están los datos de un diseño factorial ${R.a} × ${R.b} con ${R.n} réplicas. Use $\\alpha=0{,}05$.`) + celdas(o, R) +
      incisos(["Complete los totales $Y_{ij\\cdot}$, $Y_{i\\cdot\\cdot}$, $Y_{\\cdot j\\cdot}$ y $Y_{\\cdot\\cdot\\cdot}$.", "Calcule las sumas de cuadrados $SC_A$, $SC_B$, $SC_{AB}$, $SC_T$ y $SC_E$.", "Obtenga la tabla de análisis de varianza y anote las principales conclusiones.", "Sin tomar en cuenta el posible efecto de interacción, obtenga la LSD para comparar las medias de los niveles del factor A y la LSD para los niveles del factor B.", "¿Cuál sería la LSD exacta tomando en cuenta la interacción?"]),
    codigoR: codFact(R, "A", "B"),
    partes: [
      { titulo: "a) Totales", puntos: 1, solucion: s.totales },
      { titulo: "b) Sumas de cuadrados", puntos: 1.5, solucion: s.sc },
      { titulo: "c) Tabla ANOVA y conclusiones", puntos: 1.5, solucion: s.tabla + s.conc },
      { titulo: "d) LSD para A y para B (sin interacción)", puntos: 1, solucion: s.lsdSin },
      { titulo: "e) LSD con interacción", puntos: 1, solucion: s.lsdCon }
    ],
    verifica: vFact(R).concat([vr("LSD A", `qt(0.975, ${R.gE}) * sqrt(2 * ${R.CME} / ${R.b * R.n})`, R.LA, 3), vr("LSD AB", `qt(0.975, ${R.gE}) * sqrt(2 * ${R.CME} / ${R.n})`, R.LAB, 3)])
  });
}

/* Cap. 5, ej. 19: hinchamiento, molde × catalizador */
function ej5_19(o) {
  const R = calcFact(o), s = snFact(o, R), b = comun(o, "m25", "m25-c06", 3, [{ id: "C7.3", loc: "slides 25–40" }]);
  const sdA = o.nivA.map((l, i) => `${l}: $s=${N(R.resA[i], 3)}$`).join("; "), menor = R.resA[0] < R.resA[1] ? 0 : 1;
  reg("m25", b, {
    titulo: `${etiqueta(o)} · Factorial ${R.b}×${R.a} con ${R.n} réplicas: hinchamiento del catalizador`,
    enunciado: aviso(o) + p(`Se corre un diseño factorial con ${R.n} réplicas para investigar el hinchamiento del catalizador después de la extrusión en la fabricación de botellas de polietileno de alta densidad. Los factores son A: molde (${R.a} niveles) y B: catalizador (${R.b} niveles). Se desea un hinchamiento bajo. Use $\\alpha=0{,}05$.`) + celdas(o, R) +
      incisos(["Plantee las hipótesis de interés y el modelo estadístico correspondiente.", "Construya la tabla de análisis de varianza y determine cuáles efectos están activos.", "Compare las medias de los efectos principales con los métodos LSD y de Tukey.", "Describa la gráfica de interacción.", "Determine cuál es el mejor tratamiento. ¿Cuál es el hinchamiento predicho en el mejor tratamiento?", "Verifique los supuestos de normalidad y varianza constante.", "Con los residuos por factor, ¿en cuál molde parece que es menor la dispersión?"]),
    codigoR: codFact(R, "molde", "catalizador"),
    partes: [
      { titulo: "a) Hipótesis y modelo", puntos: 1, solucion: s.modelo },
      { titulo: "b) ANOVA y efectos activos", puntos: 1.5, solucion: s.tabla + s.conc },
      { titulo: "c) LSD y Tukey en efectos principales", puntos: 1, solucion: s.medias + s.lsdSin + s.tukey },
      { titulo: "d) Gráfica de interacción", puntos: 0.5, solucion: p(`Se grafican las medias de celda (tabla de la parte c) uniendo los niveles de catalizador para cada molde, con intervalos $\\bar Y_{ij\\cdot}\\pm t\\sqrt{CM_E/n}=\\bar Y_{ij\\cdot}\\pm${N(R.tc * Math.sqrt(R.CME / R.n), 3)}$.`, R.pAB < R.al ? "Las líneas no son paralelas (interacción activa): la diferencia entre moldes cambia según el catalizador." : "Las líneas son aproximadamente paralelas (interacción no activa): la diferencia entre moldes es parecida con todos los catalizadores.") },
      { titulo: "e) Mejor tratamiento y predicción", puntos: 1, solucion: s.mejor },
      { titulo: "f) Supuestos", puntos: 0.5, solucion: s.supuestos },
      { titulo: "g) Dispersión por molde", puntos: 0.5, solucion: p(`Desviación estándar de los residuos por molde: ${sdA}. La dispersión es menor en el molde <strong>${o.nivA[menor]}</strong> (en la gráfica de residuos contra molde, la nube es más angosta).`) }
    ],
    verifica: vFact(R).concat([vr("HSD B", `qtukey(0.95, ${R.b}, ${R.gE}) * sqrt(${R.CME} / ${R.a * R.n})`, R.HB, 3)])
  });
}

/* Cap. 5, ej. 20: pegamento × curado */
function ej5_20(o) {
  const R = calcFact(o), s = snFact(o, R), b = comun(o, "m25", "m25-c04", 2, [{ id: "C7.3", loc: "slides 25–40" }]);
  reg("m25", b, {
    titulo: `${etiqueta(o)} · Factorial ${R.a}×${R.b}: resistencia a la torsión (pegamento × curado)`,
    enunciado: aviso(o) + p(`Para mejorar la resistencia a la torsión de las adhesiones de componentes electrónicos sobre placas se estudiaron ${R.a} tipos de pegamento y ${R.b} temperaturas de curado. En cada combinación se analizaron ${R.n} componentes. Se busca la mayor resistencia. Use $\\alpha=0{,}05$.`) + celdas(o, R) +
      incisos(["Plantee las hipótesis de interés y el modelo estadístico correspondiente.", "Construya el ANOVA y decida cuáles efectos están activos.", "Con las gráficas de efectos, determine el mejor tratamiento.", "Estime la resistencia a la torsión en el mejor tratamiento.", "Verifique residuos."]),
    codigoR: codFact(R, "pegamento", "curado"),
    partes: [
      { titulo: "a) Hipótesis y modelo", puntos: 1, solucion: s.modelo },
      { titulo: "b) ANOVA y efectos activos", puntos: 2, solucion: s.sc + s.tabla + s.conc },
      { titulo: "c) Gráficas de efectos y mejor tratamiento", puntos: 1.5, solucion: s.medias + p(`Gráfica de efectos de curado: la resistencia media pasa de $${N(R.mj[0], 3)}$ a $${N(R.mj[R.b - 1], 3)}$ al subir la temperatura de ${o.nivB[0]} a ${o.nivB[R.b - 1]}. Gráfica de pegamento: ${o.nivA.map((l, i) => `${l} $=${N(R.mi[i], 3)}$`).join(" y ")}.`) + s.mejor },
      { titulo: "d) Resistencia estimada en el mejor tratamiento", puntos: 0.75, solucion: p(`$\\hat Y=${N(s.mejorDatos.pred, 3)}$ (ver parte c). Un intervalo aproximado para la media de esa celda: $\\bar Y_{ij\\cdot}\\pm t_{0{,}025;${R.gE}}\\sqrt{CM_E/n}$ con semiancho $${N(R.tc * Math.sqrt(R.CME / R.n), 3)}$.`) },
      { titulo: "e) Residuos", puntos: 0.75, solucion: s.supuestos }
    ],
    verifica: vFact(R)
  });
}

/* Cap. 5, ej. 21: tiempo de cura × acelerante */
function ej5_21(o) {
  const R = calcFact(o), s = snFact(o, R), b = comun(o, "m25", "m25-c04", 2, [{ id: "C7.3", loc: "slides 25–40" }]);
  const sig = (pv) => pv < R.al;
  reg("m25", b, {
    titulo: `${etiqueta(o)} · Factorial ${R.a}×${R.b}: resistencia del caucho (tiempo × acelerante)`,
    enunciado: aviso(o) + p(`Se desea investigar cómo afectan el tiempo de curado (minutos, a 14 °C) y el tipo de acelerante a la resistencia del caucho vulcanizado (se busca la mayor resistencia). Use $\\alpha=0{,}05$.`) + celdas(o, R) +
      incisos(["Señale el nombre del diseño utilizado y su modelo estadístico.", "Formule claramente todas las hipótesis que se pueden probar.", "Realice el análisis estadístico apropiado para probar las hipótesis.", "¿Hay algún tiempo de cura que sea mejor para aumentar la resistencia?", "¿Algún acelerante es mejor?", "¿Hay alguna combinación de tiempo y acelerante que sea mejor?", "Explique de manera gráfica cómo se obtiene el valor-p para el tiempo de cura.", "Verifique los supuestos. Si no se cumpliera la varianza constante para el tiempo de cura, ¿qué significaría y cómo podría corregirse?"]),
    codigoR: codFact(R, "tiempo", "acelerante"),
    partes: [
      { titulo: "a) Nombre del diseño y modelo", puntos: 0.75, solucion: p(`Diseño <strong>factorial ${R.a} × ${R.b}</strong> con ${R.n} réplicas (efectos fijos), completamente al azar.`) + s.modelo.replace(/^<p>[^<]*?Modelo/, "<p>Modelo") },
      { titulo: "b) Hipótesis", puntos: 0.75, solucion: p(String.raw`Tiempo: $H_0:\alpha_i=0\ \forall i$; acelerante: $H_0:\beta_j=0\ \forall j$; interacción: $H_0:(\alpha\beta)_{ij}=0\ \forall i,j$; cada una contra «al menos uno distinto de 0».`) },
      { titulo: "c) ANOVA", puntos: 1.5, solucion: s.sc + s.tabla + s.conc },
      { titulo: "d) ¿Un tiempo de cura mejor?", puntos: 0.5, solucion: p(sig(R.pA) ? `Sí: el tiempo es significativo. Medias: ${o.nivA.map((l, i) => `${l} $=${N(R.mi[i], 1)}$`).join(", ")}; con $LSD_A=${N(R.LA, 1)}$ se ve cuáles difieren.` : `No: el tiempo no es significativo (${pTxt(R.pA)}); medias ${o.nivA.map((l, i) => `${l} $=${N(R.mi[i], 1)}$`).join(", ")} difieren solo por azar. Se puede usar el tiempo más corto (más barato).`) },
      { titulo: "e) ¿Un acelerante mejor?", puntos: 0.5, solucion: p(sig(R.pB) ? `Sí: el acelerante es significativo. Medias: ${o.nivB.map((l, j) => `${l} $=${N(R.mj[j], 1)}$`).join(", ")}; con $LSD_B=${N(R.LB, 1)}$ ${o.nivB[rango(R.b).reduce((x, y) => (R.mj[y] > R.mj[x] ? y : x), 0)]} es el de mayor media.` : `No: el acelerante no es significativo (${pTxt(R.pB)}); medias ${o.nivB.map((l, j) => `${l} $=${N(R.mj[j], 1)}$`).join(", ")}.`) },
      { titulo: "f) ¿Una combinación mejor?", puntos: 0.5, solucion: p(sig(R.pAB) ? "La interacción es significativa: hay combinaciones que destacan; se elige la celda de mayor media." : `La interacción no es significativa (${pTxt(R.pAB)}): ninguna combinación destaca más allá de lo que explican los efectos principales.`) + s.mejor },
      { titulo: "g) Valor-p de forma gráfica", puntos: 0.5, solucion: p(String.raw`Bajo $H_0$, $F_0=CM_A/CM_E$ sigue una distribución $F$ con $(${R.gA},${R.gE})$ gl. Se dibuja esa curva, se marca $F_0=${N(R.FA, 2)}$ en el eje y el valor-p es el <strong>área bajo la curva a la derecha de $F_0$</strong>: $P(F_{${R.gA},${R.gE}}>${N(R.FA, 2)})${fp(R.pA)}$. En R: <code>pf(F0, ${R.gA}, ${R.gE}, lower.tail = FALSE)</code>.`) },
      { titulo: "h) Supuestos", puntos: 1, solucion: s.supuestos + p("Si la varianza no fuera constante entre tiempos de cura, el tiempo influiría en la <strong>dispersión</strong> de la resistencia (no solo en la media): convendría elegir el tiempo con menor variabilidad. Se corrige con una transformación de la respuesta que estabilice la varianza (logaritmo, raíz cuadrada) y repitiendo el ANOVA.") }
    ],
    verifica: vFact(R)
  });
}

/* Cap. 5, ej. 22: temperatura × % de arcilla (color del aceite) */
function ej5_22(o) {
  const R = calcFact(o), s = snFact(o, R), b = comun(o, "m25", "m25-c03", 3, [{ id: "C7.3", loc: "slides 25–40" }]);
  const lim = o.limite, cumplen = [];
  R.mij.forEach((f, i) => f.forEach((m, j) => { if (m <= lim) cumplen.push([i, j, m]); }));
  const recom = cumplen.length ? cumplen.sort((x, y) => (x[1] - y[1]) || (x[0] - y[0]))[0] : null;
  const sube = R.mj[R.b - 1] < R.mj[0], baja = R.mi[R.a - 1] < R.mi[0];
  const difs = R.mij.map((f) => f[0] - f[R.b - 1]);
  reg("m25", b, {
    titulo: `${etiqueta(o)} · Factorial ${R.a}×${R.b}: color del aceite (temperatura × arcilla)`,
    enunciado: aviso(o) + p(`En una fábrica de aceites vegetales comestibles la calidad se ve afectada por las impurezas, que se eliminan en el proceso de «blanqueo»; su eficacia se mide con el color del aceite (un valor menor indica un aceite más claro). Se estudia, a nivel laboratorio, el efecto de la temperatura y del porcentaje de arcilla en el color. Use $\\alpha=0{,}05$.`) + celdas(o, R) +
      incisos(["Construya el modelo estadístico y formule las hipótesis pertinentes.", "¿Cuál es el nombre del diseño utilizado?", "En condiciones reales se usa 1,1 % de arcilla y 100 grados. ¿Por qué cree que se eligieron esos niveles de prueba?", "Realice un análisis de varianza para probar las hipótesis y obtenga conclusiones.", "Con las gráficas de efectos, ¿cuál es la relación general entre el color y los factores en el rango estudiado?", "A partir de la gráfica de interacción, ¿cree que haya un efecto no lineal?", `Considerando que el nivel mínimo aceptable de blancura es ${N(lim, 1).replace("{,}", ",")} (es decir, color de a lo más ${N(lim, 1).replace("{,}", ",")}), ¿qué tratamiento utilizaría?`, "¿Vale la pena plantear el estudio en condiciones reales? ¿Qué cambio le haría al experimento?"]),
    codigoR: codFact(R, "temperatura", "arcilla"),
    partes: [
      { titulo: "a) Modelo e hipótesis", puntos: 0.75, solucion: s.modelo },
      { titulo: "b) Nombre del diseño", puntos: 0.5, solucion: p(`Factorial <strong>${R.a} × ${R.b}</strong> (${R.a} temperaturas, ${R.b} porcentajes de arcilla) con ${R.n} réplicas, completamente al azar.`) },
      { titulo: "c) Elección de los niveles", puntos: 0.5, solucion: p("Se tomaron niveles alrededor de las condiciones actuales (100 °C y 1,1 %), explorando hacia ambos lados en temperatura y hacia abajo en arcilla (que cuesta dinero), para ver si se puede mejorar el color o ahorrar arcilla sin perder calidad.") },
      { titulo: "d) ANOVA y conclusiones", puntos: 1.5, solucion: s.tabla + s.conc },
      { titulo: "e) Relación general (efectos principales)", puntos: 0.75, solucion: s.medias + p(`Al aumentar el % de arcilla el color medio ${sube ? "baja" : "sube"} (de $${N(R.mj[0], 3)}$ a $${N(R.mj[R.b - 1], 3)}$); al aumentar la temperatura el color medio ${baja ? "baja" : "sube"} (de $${N(R.mi[0], 3)}$ a $${N(R.mi[R.a - 1], 3)}$). En el rango estudiado la relación es aproximadamente monótona${sube && baja ? ": más arcilla y más temperatura dan un aceite más claro" : ""}.`) },
      { titulo: "f) Interacción y posible no linealidad", puntos: 0.5, solucion: p(`Caída del color entre el menor y el mayor % de arcilla en cada temperatura: ${o.nivA.map((l, i) => `${l} $\\to ${N(difs[i], 2)}$`).join(", ")}. ${R.pAB < R.al ? "Las líneas no son paralelas (interacción significativa): el efecto de la arcilla depende de la temperatura." : "Las líneas son casi paralelas (interacción no significativa)."} Para hablar de efecto no lineal (curvatura) se mira si los puntos de cada línea se alinean: con ${R.b} niveles se puede apreciar curvatura si los saltos entre niveles consecutivos no son parecidos.`) },
      { titulo: "g) Tratamiento recomendado", puntos: 1, solucion: p(recom ? `Cumplen color $\\le ${N(lim, 1)}$ (media de celda): ${cumplen.map((c) => `${o.nivA[c[0]]} / ${o.nivB[c[1]]} ($${N(c[2], 2)}$)`).join(", ")}. Entre ellos conviene el que use <strong>menos arcilla</strong> y, a igualdad, menos temperatura: <strong>${o.nivA[recom[0]]} con ${o.nivB[recom[1]]} de arcilla</strong>.` : "Ningún tratamiento cumple el límite en promedio.") },
      { titulo: "h–i) Condiciones reales y cambios", puntos: 0.5, solucion: p("Sí vale la pena: el laboratorio muestra que temperatura y arcilla mueven el color de forma clara, así que se debe confirmar a escala real, donde hay más fuentes de variación. Cambios: usar pocos niveles alrededor del tratamiento elegido, incluir réplicas en distintos lotes/días (bloques) y medir también el costo (arcilla) y otras respuestas de calidad.") }
    ],
    verifica: vFact(R)
  });
}

/* ═════════════════════════ 2^k ══════════════════════════════════════════ */
const LETRAS = ["a", "b", "c", "d"];
function yates(r, k) { let s = ""; for (let f = 0; f < k; f++) if ((r >> f) & 1) s += LETRAS[f]; return s || "(1)"; }
function efectosNombres(k) { const out = []; for (let m = 1; m < 1 << k; m++) { let s = ""; for (let f = 0; f < k; f++) if ((m >> f) & 1) s += "ABCD"[f]; out.push({ m, s }); } return out; }
const signo = (r, m, k) => { let s = 1; for (let f = 0; f < k; f++) if ((m >> f) & 1) s *= ((r >> f) & 1) ? 1 : -1; return s; };
function calc2k(o) {
  const k = o.k, n = o.Y[0].length, nr = 1 << k, al = o.alfa || 0.05;
  const T = o.Y.map(suma), G = suma(T), Nn = n * nr, C = G * G / Nn;
  const ef = efectosNombres(k).map((e) => { const c = suma(T.map((t, r) => signo(r, e.m, k) * t)); return Object.assign(e, { contraste: c, efecto: c / (n * nr / 2), sc: c * c / (n * nr) }); });
  const ssy = suma(o.Y.flat().map((x) => x * x)), SST = ssy - C;
  const R = { k, n, nr, al, T, G, Nn, C, ef, ssy, SST, mG: G / Nn, Y: o.Y };
  const fac = rango(k).map((f) => `${"ABCD"[f]} <- factor(rep(rep(c(-1, 1), each = ${1 << f}), ${nr >> (f + 1)})[rep(1:${nr}, each = ${n})])`).join("; ");
  R.datR = `y <- ${rvec(o.Y.flat())}; ${fac}`;
  if (n > 1) {
    R.SSE = SST - suma(ef.map((e) => e.sc)); R.gE = nr * (n - 1); R.CME = R.SSE / R.gE;
    ef.forEach((e) => { e.F = e.sc / R.CME; });
    const pv = Rv(`pf(${rvec(ef.map((e) => e.F))}, 1, ${R.gE}, lower.tail = FALSE)`); ef.forEach((e, i) => { e.p = pv[i]; });
    R.Fc = Rn(`qf(${1 - al}, 1, ${R.gE})`);
    const form = "y ~ " + rango(k).map((f) => "ABCD"[f]).join(" * ");
    R.form = form;
    R.pSW = Rn(`{${R.datR}; shapiro.test(resid(aov(${form})))$p.value}`);
    R.R2 = 1 - R.SSE / SST;
  }
  return R;
}
function snEfectos(o, R) {
  const s = {};
  s.signos = tabla(["Trat."].concat(R.ef.map((e) => e.s), ["Total"]), rango(R.nr).map((r) => [yates(r, R.k)].concat(R.ef.map((e) => (signo(r, e.m, R.k) > 0 ? "+" : "−")), ["$" + N(R.T[r], 2) + "$"])));
  s.contrastes = p(...R.ef.map((e) => `$\\text{Contraste}_{${e.s}}=${rango(R.nr).map((r, i) => (signo(r, e.m, R.k) > 0 ? (i ? "+" : "") : "-") + yates(r, R.k).replace("(1)", "(1)")).join("")}=${N(e.contraste, 2)}$`));
  s.efectos = p(String.raw`$\text{Efecto}=\dfrac{\text{Contraste}}{n\,2^{k-1}}=\dfrac{\text{Contraste}}{${R.n * R.nr / 2}}$ y $SC=\dfrac{\text{Contraste}^2}{n\,2^k}=\dfrac{\text{Contraste}^2}{${R.n * R.nr}}$:`) +
    tabla(["Efecto", "Contraste", "Efecto estimado", "SC"], R.ef.map((e) => [e.s, "$" + N(e.contraste, 2) + "$", "$" + N(e.efecto, 4) + "$", "$" + N(e.sc, 4) + "$"]));
  if (R.n > 1) {
    s.tabla = tAnova(R.ef.map((e) => [e.s, e.sc, 1, e.sc, e.F, e.p]).concat([["Error", R.SSE, R.gE, R.CME], ["Total", R.SST, R.Nn - 1]])) +
      p(`$F_{${N(R.al, 2)};1,${R.gE}}=${N(R.Fc, 2)}$. Efectos activos ($p\\lt ${N(R.al, 2)}$): <strong>${R.ef.filter((e) => e.p < R.al).map((e) => e.s).join(", ") || "ninguno"}</strong>. $R^2=SC_{\\text{modelo}}/SC_T=${N(R.R2 * 100, 1)}\\,\\%$.`);
    const ord = R.ef.slice().sort((x, y) => Math.abs(y.efecto) - Math.abs(x.efecto));
    s.pareto = p(`Pareto de efectos (de mayor a menor $|\\text{efecto}|$): ${ord.map((e) => `${e.s} $(${N(e.efecto, 3)})$`).join(", ")}.`);
  }
  return s;
}
/* efectos activos + jerarquía (si AB activo, A y B entran) */
function modeloActivo(R) {
  const act = new Set(R.ef.filter((e) => e.p < R.al).map((e) => e.m));
  [...act].forEach((m) => { for (let f = 0; f < R.k; f++) if ((m >> f) & 1) act.add(1 << f); });
  return R.ef.filter((e) => act.has(e.m));
}
function mejor2k(o, R) {
  const ac = modeloActivo(R), sg = o.objetivo === "min" ? 1 : -1;
  const pred = rango(R.nr).map((r) => R.mG + suma(ac.map((e) => e.efecto / 2 * signo(r, e.m, R.k))));
  const best = rango(R.nr).reduce((x, y) => (sg * (pred[y] - pred[x]) < 0 ? y : x), 0);
  const niveles = rango(R.k).map((f) => `${o.nombres[f]} ${((best >> f) & 1) ? "+" : "−"}`).join(", ");
  const usados = new Set(ac.flatMap((e) => rango(R.k).filter((f) => (e.m >> f) & 1)));
  const libres = rango(R.k).filter((f) => !usados.has(f)).map((f) => o.nombres[f]);
  return { pred, best, txt: p(String.raw`Modelo con los efectos activos${ac.length ? " (y los principales que contienen, por jerarquía)" : ""}: $\hat Y=${N(R.mG, 4)}${ac.map((e) => (e.efecto >= 0 ? "+" : "") + N(e.efecto / 2, 4) + "\\,x_{" + e.s + "}").join("")}$, con $x=\pm1$ (el coeficiente es la mitad del efecto).`,
    `Para ${o.objetivo === "min" ? "minimizar" : "maximizar"}: tratamiento <strong>${yates(best, R.k)}</strong> (${niveles}), con $\\hat Y=${N(pred[best], 3)}$ (media observada de esa celda: $${N(R.T[best] / R.n, 3)}$).` + (libres.length ? ` ${libres.join(" y ")} no ${libres.length > 1 ? "influyen" : "influye"}: se ${libres.length > 1 ? "fijan" : "fija"} en el nivel más económico.` : "")) };
}
const tabla2k = (o, R) => tabla(o.nombres.map((x, f) => x).concat(["Código", R.n > 1 ? "Respuesta (réplicas)" : "Y"]),
  rango(R.nr).map((r) => rango(R.k).map((f) => (((r >> f) & 1) ? "+" : "−")).concat([yates(r, R.k), R.Y[r].map((v) => N(v, 2)).join("; ")])));
const v2k = (R) => R.ef.filter((e, i) => i < 4 || e.s.length === R.k).map((e) => vr("F " + e.s, `{${R.datR}; s <- summary(aov(${R.form}))[[1]]; s[trimws(rownames(s)) == "${e.s.split("").join(":")}", 4]}`, e.F, 2))
  .concat([vr("CME", `{${R.datR}; s <- summary(aov(${R.form}))[[1]]; s[nrow(s), 3]}`, R.CME, 4)]);
const cod2k = (R) => `${R.datR}\nmodelo <- aov(${R.form})\nsummary(modelo)\nmodel.tables(modelo, "effects")   # cada efecto aparece como ±efecto/2\ninteraction.plot(A, B, y)\nshapiro.test(resid(modelo))`;

/* Cap. 6, ej. 3: 2² con réplicas, a mano */
function ej6_3(o) {
  const R = calc2k(Object.assign({ k: 2 }, o)), s = snEfectos(o, R), b = comun(o, "m21", "m21-c02", 2, [{ id: "C7.4", loc: "slides 4–20" }]);
  const [A, B, AB] = R.ef, m = rango(4).map((r) => R.T[r] / R.n);
  const reps = rango(R.n).map((i) => ["I", "II", "III", "IV"][i]);
  reg("m21", b, {
    titulo: `${etiqueta(o)} · Factorial 2² con ${R.n} réplicas a mano: contrastes, efectos y gráficas${o.sufijo ? " (" + o.sufijo + ")" : ""}`,
    enunciado: aviso(o) + p("A continuación se muestran los resultados de un diseño factorial. Conteste sin usar software, haciendo las operaciones a mano.") +
      tabla(["A", "B"].concat(reps, ["Total"]), rango(4).map((r) => [((r & 1) ? "+" : "−"), ((r & 2) ? "+" : "−")].concat(R.Y[r].map((v) => "$" + N(v, 2) + "$"), [`${yates(r, 2)} $=${N(R.T[r], 2)}$`]))) +
      incisos(["¿Qué nombre recibe este diseño y por qué?", "¿Cuántos tratamientos tiene y cuántas réplicas?", `En total son ${R.Nn} corridas. ¿En qué orden debieron correrse? ¿Por qué?`, "Explique los efectos que se pueden estudiar con este diseño.", "Obtenga los contrastes de A, B y AB.", "Calcule los efectos principales y el efecto de interacción.", "Haga (describa) las gráficas de efectos principales de A y B e interprételas.", "Haga (describa) la gráfica de interacción e interprétela con detalle.", "¿El factor B parece tener influencia sobre Y? Argumente."]),
    partes: [
      { titulo: "a–b) Nombre, tratamientos y réplicas", puntos: 1, solucion: p(`Factorial <strong>2²</strong>: 2 factores con 2 niveles cada uno ⇒ $2^2=4$ tratamientos: (1), a, b, ab; con <strong>${R.n} réplicas</strong> cada uno.`) },
      { titulo: "c–d) Orden de las corridas y efectos estudiables", puntos: 1, solucion: p(`Las ${R.Nn} corridas deben hacerse en <strong>orden aleatorio</strong> (sortear las ${R.Nn}), para que factores no controlados (desgaste, temperatura ambiente, operador, hora) se repartan al azar y no se confundan con los efectos de A, B o AB; además garantiza la independencia de los errores.`, "Se pueden estudiar dos efectos principales (A y B) y la interacción AB; con las réplicas se estima además el error puro.") },
      { titulo: "e) Contrastes", puntos: 1, solucion: s.signos + p(String.raw`$\text{Contraste}_A=a+ab-b-(1)=${N(A.contraste, 2)}$; $\;\text{Contraste}_B=b+ab-a-(1)=${N(B.contraste, 2)}$; $\;\text{Contraste}_{AB}=(1)+ab-a-b=${N(AB.contraste, 2)}$.`) },
      { titulo: "f) Efectos", puntos: 1, solucion: p(String.raw`Efecto $=\text{Contraste}/(2n)=\text{Contraste}/${2 * R.n}$: $\;A=${N(A.efecto, 3)}$, $\;B=${N(B.efecto, 3)}$, $\;AB=${N(AB.efecto, 3)}$.`) },
      { titulo: "g) Gráficas de efectos principales", puntos: 0.75, solucion: p(`Medias de celda: (1) $=${N(m[0], 3)}$, a $=${N(m[1], 3)}$, b $=${N(m[2], 3)}$, ab $=${N(m[3], 3)}$.`, `A: de $${N((m[0] + m[2]) / 2, 3)}$ (A−) a $${N((m[1] + m[3]) / 2, 3)}$ (A+), la recta ${A.efecto >= 0 ? "sube" : "baja"} $${N(Math.abs(A.efecto), 3)}$. B: de $${N((m[0] + m[1]) / 2, 3)}$ (B−) a $${N((m[2] + m[3]) / 2, 3)}$ (B+), ${B.efecto >= 0 ? "sube" : "baja"} $${N(Math.abs(B.efecto), 3)}$. Una pendiente grande sugiere efecto importante, pero no se puede interpretar sola si hay interacción.`) },
      { titulo: "h) Gráfica de interacción", puntos: 0.75, solucion: p(`Con B−: A pasa de $${N(m[0], 3)}$ a $${N(m[1], 3)}$ (cambio $${N(m[1] - m[0], 3)}$). Con B+: de $${N(m[2], 3)}$ a $${N(m[3], 3)}$ (cambio $${N(m[3] - m[2], 3)}$).`, Math.abs(AB.efecto) > Math.max(Math.abs(A.efecto), Math.abs(B.efecto)) / 2 ? `Las líneas ${Math.sign(m[1] - m[0]) !== Math.sign(m[3] - m[2]) ? "se cruzan" : "no son paralelas"}: el efecto de A depende del nivel de B (interacción fuerte, $AB=${N(AB.efecto, 3)}$).` : "Las líneas son casi paralelas: interacción pequeña.") },
      { titulo: "i) ¿B influye?", puntos: 0.5, solucion: p(Math.abs(B.efecto) < Math.abs(AB.efecto) ? `Aunque el efecto principal de B es pequeño ($${N(B.efecto, 3)}$), B <strong>sí influye</strong> a través de la interacción: su efecto cambia de signo o magnitud según el nivel de A (con A− el cambio por B es $${N(m[2] - m[0], 3)}$; con A+ es $${N(m[3] - m[1], 3)}$). Mirar solo el efecto principal llevaría a una conclusión equivocada.` : `Sí: el efecto principal de B es $${N(B.efecto, 3)}$, grande frente a la variación entre réplicas; con A− el cambio por B es $${N(m[2] - m[0], 3)}$ y con A+ es $${N(m[3] - m[1], 3)}$.`) }
    ],
    verifica: [
      L.vjs("Efecto A", `(${R.T[1]}+${R.T[3]}-${R.T[2]}-${R.T[0]})/(2*${R.n})`, A.efecto, 3),
      L.vjs("Efecto B", `(${R.T[2]}+${R.T[3]}-${R.T[1]}-${R.T[0]})/(2*${R.n})`, B.efecto, 3),
      L.vjs("Efecto AB", `(${R.T[0]}+${R.T[3]}-${R.T[1]}-${R.T[2]})/(2*${R.n})`, AB.efecto, 3),
      vr("F AB (R)", `{${R.datR}; summary(aov(y ~ A * B))[[1]][3, 4]}`, AB.F, 2)
    ]
  });
}

/* Cap. 6, ej. 5: 2³ no replicado, filas desordenadas */
function ej6_5(o) {
  const filas = o.filas; // [A, B, C, y] con ±1
  const Y = rango(8).map(() => null);
  filas.forEach((f) => { const r = (f[0] > 0 ? 1 : 0) + (f[1] > 0 ? 2 : 0) + (f[2] > 0 ? 4 : 0); Y[r] = [f[3]]; });
  afirmar(Y.every((x) => x), "faltan tratamientos");
  const R = calc2k({ k: 3, Y }), b = comun(o, "m21", "m21-c02", 2, [{ id: "C7.4", loc: "slides 4–20" }]);
  const e = (s) => R.ef.find((x) => x.s === s), A = e("A"), B = e("B"), AB = e("AB");
  const mAB = [[0, 1], [2, 3]].map((par) => par.map((r) => (R.T[r] + R.T[r + 4]) / 2)); // mAB[b][a]
  const cod = (f) => yates((f[0] > 0 ? 1 : 0) + (f[1] > 0 ? 2 : 0) + (f[2] > 0 ? 4 : 0), 3);
  const sgn = (x) => (x > 0 ? "+" : "−");
  reg("m21", b, {
    titulo: `${etiqueta(o)} · Factorial 2³ sin réplicas a mano: Yates, efectos y SC`,
    enunciado: aviso(o) + p("A continuación se muestran los resultados de un diseño factorial 2³ no replicado (las filas no están en orden estándar). Conteste sin usar software.") +
      tabla(["¿Código?", "A", "B", "C", "Y"], filas.map((f) => ["", sgn(f[0]), sgn(f[1]), sgn(f[2]), "$" + N(f[3], 2) + "$"])) +
      incisos(["Especifique el código de cada tratamiento según la notación de Yates.", "Calcule los efectos principales de A y B.", "Haga (describa) la gráfica de efectos principales de A y B e interprétela.", "Calcule el efecto de la interacción AB.", "Haga (describa) la gráfica de la interacción AB e interprétela.", "¿Qué tendría que hacer para saber si esos efectos son significativos?", "Calcule la suma de cuadrados del efecto principal de A y de la interacción AB."]),
    partes: [
      { titulo: "a) Códigos de Yates", puntos: 1, solucion: p("Se escribe la letra minúscula de cada factor que está en su nivel alto; (1) si todos están en el bajo.") + tabla(["Código", "A", "B", "C", "Y"], filas.map((f) => [cod(f), sgn(f[0]), sgn(f[1]), sgn(f[2]), "$" + N(f[3], 2) + "$"])) },
      { titulo: "b) Efectos de A y B", puntos: 1, solucion: p(String.raw`Con $n=1$, efecto $=\text{Contraste}/4$.`, String.raw`$\text{Contraste}_A=a+ab+ac+abc-(1)-b-c-bc=${N(A.contraste, 2)}$ ⇒ $A=${N(A.efecto, 3)}$.`, String.raw`$\text{Contraste}_B=b+ab+bc+abc-(1)-a-c-ac=${N(B.contraste, 2)}$ ⇒ $B=${N(B.efecto, 3)}$.`) },
      { titulo: "c) Gráfica de efectos principales", puntos: 0.75, solucion: p(`A: media con A− $=${N((R.T[0] + R.T[2] + R.T[4] + R.T[6]) / 4, 3)}$ y con A+ $=${N((R.T[1] + R.T[3] + R.T[5] + R.T[7]) / 4, 3)}$ (la recta ${A.efecto >= 0 ? "sube" : "baja"}). B: media con B− $=${N((R.T[0] + R.T[1] + R.T[4] + R.T[5]) / 4, 3)}$ y con B+ $=${N((R.T[2] + R.T[3] + R.T[6] + R.T[7]) / 4, 3)}$. ${Math.abs(A.efecto) > Math.abs(B.efecto) ? "A tiene una pendiente mucho mayor que B." : "B tiene una pendiente mayor que A."}`) },
      { titulo: "d) Efecto AB", puntos: 1, solucion: p(String.raw`$\text{Contraste}_{AB}=(1)+ab+c+abc-a-b-ac-bc=${N(AB.contraste, 2)}$ ⇒ $AB=${N(AB.efecto, 3)}$.`) },
      { titulo: "e) Gráfica de interacción AB", puntos: 0.75, solucion: p(`Medias (promediando C): A−B− $=${N(mAB[0][0], 2)}$, A+B− $=${N(mAB[0][1], 2)}$, A−B+ $=${N(mAB[1][0], 2)}$, A+B+ $=${N(mAB[1][1], 2)}$. Efecto de A con B− $=${N(mAB[0][1] - mAB[0][0], 2)}$ y con B+ $=${N(mAB[1][1] - mAB[1][0], 2)}$.`, Math.abs(AB.efecto) > 2 ? "Las pendientes son distintas: hay indicios de interacción (el efecto de A depende de B)." : "Las líneas son casi paralelas: la interacción AB es pequeña.") },
      { titulo: "f) ¿Cómo saber si son significativos?", puntos: 0.5, solucion: p("Sin réplicas no hay grados de libertad para el error puro. Opciones: (1) gráfica de efectos en papel normal (o Pareto/Daniel): los efectos que se alejan de la recta son los activos; (2) suponer despreciables las interacciones de orden alto (p. ej. ABC y las dobles pequeñas) y usarlas como error para el ANOVA; (3) replicar el experimento o agregar puntos centrales.") },
      { titulo: "g) Sumas de cuadrados de A y AB", puntos: 1, solucion: p(String.raw`$SC=\text{Contraste}^2/(n\,2^3)=\text{Contraste}^2/8$: $\;SC_A=(${N(A.contraste, 2)})^2/8=${N(A.sc, 3)}$, $\;SC_{AB}=(${N(AB.contraste, 2)})^2/8=${N(AB.sc, 3)}$.`) }
    ],
    verifica: [L.vjs("Efecto A", `(${R.T[1]}+${R.T[3]}+${R.T[5]}+${R.T[7]}-${R.T[0]}-${R.T[2]}-${R.T[4]}-${R.T[6]})/4`, A.efecto, 3),
      L.vjs("Efecto B", `(${R.T[2]}+${R.T[3]}+${R.T[6]}+${R.T[7]}-${R.T[0]}-${R.T[1]}-${R.T[4]}-${R.T[5]})/4`, B.efecto, 3),
      vr("SC AB (R)", `{${R.datR}; s <- summary(aov(y ~ A * B * C))[[1]]; s[4, 2]}`, AB.sc, 3)]
  });
}

/* Cap. 6, ej. 8: viscosidad, 2³ con réplicas */
function ej6_8(o) {
  const R = calc2k(Object.assign({ k: 3 }, o)), s = snEfectos(o, R), b = comun(o, "m21", "m21-c03", 2, [{ id: "C7.4", loc: "slides 4–30" }]);
  const M = mejor2k(o, R), act = R.ef.filter((e) => e.p < R.al);
  const interp = act.map((e) => e.s.length === 1 ? `<strong>${e.s}</strong> (${o.nombres["ABC".indexOf(e.s)]}): al pasar de − a + la viscosidad media cambia $${N(e.efecto, 3)}$.` :
    `<strong>${e.s}</strong>: el efecto de ${e.s[0]} depende del nivel de ${e.s.slice(1)}; se interpreta con la gráfica de interacción (efecto $${N(e.efecto, 3)}$).`).join(" ");
  reg("m21", b, {
    titulo: `${etiqueta(o)} · Factorial 2³ con ${R.n} réplicas: viscosidad de una bebida`,
    enunciado: aviso(o) + p(`En una empresa lechera hay problemas con la viscosidad de una bebida de chocolate. Se cree que tres ingredientes que se agregan en pequeñas cantidades pueden resolverlo, y se corre un experimento 2³ con ${R.n} réplicas. Se desea <strong>minimizar</strong> la viscosidad. Use $\\alpha=0{,}05$.`) + tabla2k(o, R) +
      incisos(["Estime todos los posibles efectos y diga cuáles son significativos.", "Realice un análisis de varianza y obtenga conclusiones generales.", "Interprete a detalle los efectos significativos.", "¿Hay un tratamiento ganador para minimizar?", "Verifique residuos."]),
    codigoR: cod2k(R),
    partes: [
      { titulo: "a) Efectos estimados", puntos: 1.5, solucion: s.signos + s.efectos + s.pareto },
      { titulo: "b) ANOVA y conclusiones", puntos: 1.5, solucion: p(String.raw`$SC_T=${N(R.SST, 4)}$, $SC_E=SC_T-\sum SC_{\text{efectos}}=${N(R.SSE, 4)}$ con $2^3(n-1)=${R.gE}$ gl.`) + s.tabla },
      { titulo: "c) Interpretación de los efectos activos", puntos: 1.5, solucion: p(interp || "No hay efectos activos.") },
      { titulo: "d) Tratamiento ganador", puntos: 1, solucion: M.txt },
      { titulo: "e) Residuos", puntos: 0.5, solucion: p(`Shapiro–Wilk sobre los residuos ($e=Y-\\bar Y_{\\text{celda}}$): ${pTxt(R.pSW)} ⇒ ${R.pSW < R.al ? "se rechaza normalidad" : "no se rechaza normalidad"}. Revisar además residuos contra predichos y contra cada factor (que la dispersión no cambie según el nivel).`) }
    ],
    verifica: v2k(R)
  });
}

/* Cap. 6, ej. 10: bolsas de papel, 2³ con réplicas */
function ej6_10(o) {
  const R = calc2k(Object.assign({ k: 3 }, o)), s = snEfectos(o, R), b = comun(o, "m21", "m21-c03", 2, [{ id: "C7.4", loc: "slides 4–30" }]);
  const M = mejor2k(o, R), act = R.ef.filter((e) => e.p < R.al);
  reg("m21", b, {
    titulo: `${etiqueta(o)} · Factorial 2³ con ${R.n} réplicas: resistencia al rasgado`,
    enunciado: aviso(o) + p(`Un fabricante de bolsas de papel analiza la resistencia al rasgamiento (Y, mayor es mejor). Examina tres factores con dos niveles: A = papel, B = humedad, C = dirección del rasguño, con ${R.n} réplicas por combinación. Use $\\alpha=0{,}05$.`) + tabla2k(o, R) +
      incisos(["Haga el análisis de varianza.", "Interprete los efectos significativos y encuentre el mejor tratamiento.", "Verifique los supuestos del modelo."]),
    codigoR: cod2k(R),
    partes: [
      { titulo: "a) Efectos y tabla ANOVA", puntos: 2.5, solucion: s.efectos + p(String.raw`$SC_T=${N(R.SST, 4)}$; $SC_E=${N(R.SSE, 4)}$ con ${R.gE} gl.`) + s.tabla },
      { titulo: "b) Interpretación y mejor tratamiento", puntos: 2.5, solucion: p(act.map((e) => `${e.s}: efecto $${N(e.efecto, 3)}$.`).join(" ") + " " + (act.some((e) => e.s === "A") ? "El tipo de papel (A) es el efecto dominante." : "")) + M.txt },
      { titulo: "c) Supuestos", puntos: 1, solucion: p(`Normalidad de residuos (Shapiro–Wilk): ${pTxt(R.pSW)} ⇒ ${R.pSW < R.al ? "se rechaza" : "no se rechaza"}. Varianza constante: comparar la dispersión de residuos entre tratamientos y contra predichos; independencia: residuos contra el orden de corrida. $R^2=${N(R.R2 * 100, 1)}\\,\\%$.`) }
    ],
    verifica: v2k(R)
  });
}

/* ═════════════════════════ Datos y llamadas ═════════════════════════════ */
const D = (n) => rango(n).map((j) => "Día " + (j + 1));
const B = (n) => rango(n).map((j) => "Bloque " + (j + 1));
const TRAT = { nomTrat: "tratamiento", NomTrat: "Tratamiento", nomBloque: "bloque", NomBloque: "Bloque", respuesta: "respuesta", objetivo: "max", objSupuesto: true };
const ATOM = { nomTrat: "atomizador", NomTrat: "Marca", nomBloque: "día", NomBloque: "Día", respuesta: "mortalidad", objetivo: "max" };
const SILO = { nomTrat: "silo", NomTrat: "Silo", nomBloque: "día", NomBloque: "Día", respuesta: "temperatura", objetivo: "min" };
const DET = { nomTrat: "detergente", NomTrat: "Detergente", nomBloque: "lavadora", NomBloque: "Lavadora", respuesta: "blancura", objetivo: "max" };
const dias5 = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const lav = (n) => rango(n).map((j) => "Lavadora " + (j + 1));

function m20() {
  const L49 = "cap. 4, ej. 9 (p. 119)", L410 = "cap. 4, ej. 10 (p. 119)", L411 = "cap. 4, ej. 11 (pp. 119–120)", L412 = "cap. 4, ej. 12 (p. 120)";
  ej4_9(Object.assign({}, TRAT, { ej: "Cap. 4, ej. 9", loc: L49, trat: ["A", "B", "C"], bloq: B(4), Y: [[3, 4, 2, 6], [7, 9, 3, 10], [4, 6, 3, 7]] }));
  ej4_9(Object.assign({}, TRAT, { ej: "Cap. 4, ej. 9", loc: L49, mod: "se cambiaron 4 datos (A en bloque 2, B en bloques 1 y 3, C en bloque 4)", sufijo: "datos cambiados", trat: ["A", "B", "C"], bloq: B(4), Y: [[3, 5, 2, 6], [8, 9, 4, 10], [4, 6, 3, 8]] }));
  ej4_9(Object.assign({}, TRAT, { ej: "Cap. 4, ej. 9", loc: L49, mod: "se agregó un cuarto tratamiento D", sufijo: "4 tratamientos", trat: ["A", "B", "C", "D"], bloq: B(4), Y: [[3, 4, 2, 6], [7, 9, 3, 10], [4, 6, 3, 7], [5, 7, 4, 8]] }));
  ej4_9(Object.assign({}, TRAT, { ej: "Cap. 4, ej. 9", loc: L49, mod: "se agregó un quinto bloque", sufijo: "5 bloques", trat: ["A", "B", "C"], bloq: B(5), Y: [[3, 4, 2, 6, 5], [7, 9, 3, 10, 8], [4, 6, 3, 7, 6]] }));

  ej4_10(Object.assign({}, ATOM, { ej: "Cap. 4, ej. 10", loc: L410, trat: ["1", "2", "3"], bloq: D(6), Y: [[72, 65, 67, 75, 62, 73], [55, 59, 68, 70, 53, 50], [64, 74, 61, 58, 51, 69]] }));
  ej4_10(Object.assign({}, ATOM, { ej: "Cap. 4, ej. 10", loc: L410, mod: "se agregó una cuarta marca de atomizador", trat: ["1", "2", "3", "4"], bloq: D(6), Y: [[72, 65, 67, 75, 62, 73], [55, 59, 68, 70, 53, 50], [64, 74, 61, 58, 51, 69], [70, 68, 72, 77, 66, 71]] }));
  ej4_10(Object.assign({}, ATOM, { ej: "Cap. 4, ej. 10", loc: L410, mod: "solo 5 días (se eliminó el día 6) y la marca 2 en el día 3 dio 60 en vez de 68", trat: ["1", "2", "3"], bloq: D(5), Y: [[72, 65, 67, 75, 62], [55, 59, 60, 70, 53], [64, 74, 61, 58, 51]] }));

  ej4_11(Object.assign({}, SILO, { ej: "Cap. 4, ej. 11", loc: L411, trat: ["A", "B", "C", "D", "E"], bloq: dias5, Y: [[4.0, 4.0, 5.0, 0.5, 3.0], [5.0, 6.0, 2.0, 4.0, 4.0], [4.5, 4.0, 3.5, 2.0, 3.0], [2.5, 4.0, 6.5, 4.5, 4.0], [4.0, 4.0, 3.5, 2.0, 4.0]] }));
  ej4_11(Object.assign({}, SILO, { ej: "Cap. 4, ej. 11", loc: L411, mod: "se corrigió la lectura del silo A el jueves (3,5 en vez de 0,5) y la del silo D el miércoles (3,5 en vez de 6,5)", trat: ["A", "B", "C", "D", "E"], bloq: dias5, Y: [[4.0, 4.0, 5.0, 3.5, 3.0], [5.0, 6.0, 2.0, 4.0, 4.0], [4.5, 4.0, 3.5, 2.0, 3.0], [2.5, 4.0, 3.5, 4.5, 4.0], [4.0, 4.0, 3.5, 2.0, 4.0]] }));
  ej4_11(Object.assign({}, SILO, { ej: "Cap. 4, ej. 11", loc: L411, mod: "solo 4 silos (A–D) y 4 días (lunes a jueves), con el silo B 1 grado más caliente cada día", trat: ["A", "B", "C", "D"], bloq: dias5.slice(0, 4), Y: [[4.0, 4.0, 5.0, 0.5], [6.0, 7.0, 3.0, 5.0], [4.5, 4.0, 3.5, 2.0], [2.5, 4.0, 6.5, 4.5]] }));

  ej4_12(Object.assign({}, DET, { ej: "Cap. 4, ej. 12", loc: L412, trat: ["A", "B", "C", "D"], bloq: lav(3), Y: [[45, 43, 51], [47, 44, 52], [50, 49, 57], [42, 37, 49]] }));
  ej4_12(Object.assign({}, DET, { ej: "Cap. 4, ej. 12", loc: L412, mod: "el detergente B tuvo lecturas 2, 2 y 1 puntos más altas", trat: ["A", "B", "C", "D"], bloq: lav(3), Y: [[45, 43, 51], [49, 46, 53], [50, 49, 57], [42, 37, 49]] }));
  ej4_12(Object.assign({}, DET, { ej: "Cap. 4, ej. 12", loc: L412, mod: "se agregó una cuarta lavadora (16 cargas)", trat: ["A", "B", "C", "D"], bloq: lav(4), Y: [[45, 43, 51, 46], [47, 44, 52, 48], [50, 49, 57, 52], [42, 37, 49, 41]] }));
}

const F18 = { nomA: "A", nomB: "B", nivA: ["A1", "A2"], respuesta: "respuesta", objetivo: "max" };
function m25() {
  const L518 = "cap. 5, ej. 18 (pp. 159–160)", L519 = "cap. 5, ej. 19 (p. 160)", L520 = "cap. 5, ej. 20 (pp. 160–161)", L521 = "cap. 5, ej. 21 (p. 161)", L522 = "cap. 5, ej. 22 (pp. 161–162)";
  const y18 = [[[44, 34, 30], [49, 48, 43], [52, 58, 62]], [[62, 56, 58], [68, 70, 58], [69, 75, 65]]];
  ej5_18(Object.assign({}, F18, { ej: "Cap. 5, ej. 18", loc: L518, nivB: ["B1", "B2", "B3"], Y: y18 }));
  ej5_18(Object.assign({}, F18, { ej: "Cap. 5, ej. 18", loc: L518, mod: "la celda A2B3 dio 60, 58 y 62 (en vez de 69, 75 y 65)", sufijo: "otra celda A2B3", nivB: ["B1", "B2", "B3"], Y: [y18[0], [[62, 56, 58], [68, 70, 58], [60, 58, 62]]] }));
  ej5_18(Object.assign({}, F18, { ej: "Cap. 5, ej. 18", loc: L518, mod: "solo 2 réplicas (se eliminó la tercera de cada celda)", sufijo: "2 réplicas", nivB: ["B1", "B2", "B3"], Y: y18.map((f) => f.map((c) => c.slice(0, 2))) }));
  ej5_18(Object.assign({}, F18, { ej: "Cap. 5, ej. 18", loc: L518, mod: "se eliminó el nivel B3: factorial 2 × 2 con 3 réplicas", sufijo: "2×2", nivB: ["B1", "B2"], Y: y18.map((f) => f.slice(0, 2)) }));

  const y19 = [[[93, 92, 93, 92, 91, 90, 90, 90, 91, 91], [92, 90, 92, 94, 91, 91, 90, 92, 91, 92], [95, 94, 94, 94, 97, 96, 94, 95, 94, 96]],
    [[88, 88, 87, 88, 87, 88, 87, 87, 87, 87], [90, 89, 88, 88, 90, 89, 88, 89, 88, 88], [91, 97, 91, 90, 89, 91, 92, 90, 90, 91]]];
  const H = { nomA: "Molde", nomB: "Catalizador", nivA: ["A1", "A2"], nivB: ["B1", "B2", "B3"], respuesta: "hinchamiento", objetivo: "min" };
  ej5_19(Object.assign({}, H, { ej: "Cap. 5, ej. 19", loc: L519, Y: y19 }));
  ej5_19(Object.assign({}, H, { ej: "Cap. 5, ej. 19", loc: L519, mod: "solo las 5 primeras réplicas de cada celda", Y: y19.map((f) => f.map((c) => c.slice(0, 5))) }));
  ej5_19(Object.assign({}, H, { ej: "Cap. 5, ej. 19", loc: L519, mod: "la celda A2B3 sin los valores extremos 97 y 89 (se midieron 92 y 91)", Y: [y19[0], [y19[1][0], y19[1][1], [91, 92, 91, 90, 91, 91, 92, 90, 90, 91]]] }));

  const P = { nomA: "Pegamento", nomB: "Curado", nivA: ["A1", "A2"], nivB: ["60 °C", "80 °C", "100 °C"], respuesta: "resistencia", objetivo: "max" };
  ej5_20(Object.assign({}, P, { ej: "Cap. 5, ej. 20", loc: L520, Y: [[[2.5, 2.8], [3.8, 3.4], [4.0, 4.2]], [[1.6, 1.22], [3.2, 2.8], [4.3, 4.7]]] }));
  ej5_20(Object.assign({}, P, { ej: "Cap. 5, ej. 20", loc: L520, mod: "el dato 1,22 se leyó como 1,2 y A2 a 100 °C dio 4,6 y 4,9", Y: [[[2.5, 2.8], [3.8, 3.4], [4.0, 4.2]], [[1.6, 1.2], [3.2, 2.8], [4.6, 4.9]]] }));
  ej5_20(Object.assign({}, P, { ej: "Cap. 5, ej. 20", loc: L520, mod: "se analizó un tercer componente en cada combinación", Y: [[[2.5, 2.8, 2.6], [3.8, 3.4, 3.6], [4.0, 4.2, 4.1]], [[1.6, 1.22, 1.4], [3.2, 2.8, 3.0], [4.3, 4.7, 4.5]]] }));

  const T = { nomA: "Tiempo", nomB: "Acelerante", nivB: ["A", "B", "C"], respuesta: "resistencia", objetivo: "max" };
  const y21 = [[[3900, 3600], [4300, 3700], [3700, 4100]], [[4100, 3500], [4200, 3900], [3900, 4000]], [[4000, 3800], [4300, 3600], [3600, 3800]]];
  ej5_21(Object.assign({}, T, { ej: "Cap. 5, ej. 21", loc: L521, nivA: ["40 min", "60 min", "80 min"], Y: y21 }));
  ej5_21(Object.assign({}, T, { ej: "Cap. 5, ej. 21", loc: L521, mod: "el acelerante B dio resistencias más altas y parejas (4400/4200, 4500/4300, 4400/4300)", nivA: ["40 min", "60 min", "80 min"], Y: y21.map((f, i) => [f[0], [[4400, 4200], [4500, 4300], [4400, 4300]][i], f[2]]) }));
  ej5_21(Object.assign({}, T, { ej: "Cap. 5, ej. 21", loc: L521, mod: "solo dos tiempos de cura (40 y 80 min)", nivA: ["40 min", "80 min"], Y: [y21[0], y21[2]] }));

  const C = { nomA: "Temperatura", nomB: "Arcilla", nivA: ["90", "100", "110"], respuesta: "color", objetivo: "min", limite: 4.8 };
  const y22 = [[[5.8, 5.9], [5.4, 5.5], [4.9, 5.1], [4.5, 4.4]], [[5.0, 4.9], [4.8, 4.7], [4.6, 4.4], [4.1, 4.3]], [[4.7, 4.6], [4.4, 4.4], [4.1, 4.0], [3.7, 3.6]]];
  ej5_22(Object.assign({}, C, { ej: "Cap. 5, ej. 22", loc: L522, nivB: ["0,8 %", "0,9 %", "1,0 %", "1,1 %"], Y: y22 }));
  ej5_22(Object.assign({}, C, { ej: "Cap. 5, ej. 22", loc: L522, mod: "se eliminó el nivel 0,8 % de arcilla (factorial 3 × 3)", nivB: ["0,9 %", "1,0 %", "1,1 %"], Y: y22.map((f) => f.slice(1)) }));
  ej5_22(Object.assign({}, C, { ej: "Cap. 5, ej. 22", loc: L522, mod: "a 110 grados el color salió 0,1–0,3 unidades más alto", nivB: ["0,8 %", "0,9 %", "1,0 %", "1,1 %"], Y: [y22[0], y22[1], [[4.8, 4.7], [4.6, 4.5], [4.3, 4.2], [4.0, 3.9]]] }));
}

function m21() {
  const L63 = "cap. 6, ej. 3 (p. 222)", L65 = "cap. 6, ej. 5 (pp. 222–223)", L68 = "cap. 6, ej. 8 (p. 224)", L610 = "cap. 6, ej. 10 (pp. 225–226)";
  const y3 = [[82, 80, 84], [78, 82, 79], [71, 70, 66], [89, 88, 93]];
  ej6_3({ ej: "Cap. 6, ej. 3", loc: L63, Y: y3 });
  ej6_3({ ej: "Cap. 6, ej. 3", loc: L63, mod: "b dio 74, 72, 70 y ab dio 85, 84, 88", sufijo: "datos cambiados", Y: [y3[0], y3[1], [74, 72, 70], [85, 84, 88]] });
  ej6_3({ ej: "Cap. 6, ej. 3", loc: L63, mod: "solo 2 réplicas (I y II)", sufijo: "2 réplicas", Y: y3.map((f) => f.slice(0, 2)) });
  ej6_3({ ej: "Cap. 6, ej. 3", loc: L63, mod: "el tratamiento a dio 86, 85 y 88", sufijo: "a más alto", Y: [y3[0], [86, 85, 88], y3[2], y3[3]] });

  const f5 = [[-1, 1, -1, 25], [1, 1, 1, 12], [-1, -1, -1, 30], [1, -1, 1, 10], [-1, -1, 1, 10], [1, 1, -1, 14], [-1, 1, 1, 31], [1, -1, -1, 17]];
  ej6_5({ ej: "Cap. 6, ej. 5", loc: L65, filas: f5 });
  ej6_5({ ej: "Cap. 6, ej. 5", loc: L65, mod: "mismo orden de filas, con respuestas 27, 15, 28, 11, 12, 18, 29 y 16", filas: f5.map((f, i) => [f[0], f[1], f[2], [27, 15, 28, 11, 12, 18, 29, 16][i]]) });
  ej6_5({ ej: "Cap. 6, ej. 5", loc: L65, mod: "filas en otro orden y respuestas distintas", filas: [[1, -1, 1, 22], [-1, -1, -1, 18], [1, 1, -1, 30], [-1, 1, 1, 15], [-1, 1, -1, 20], [1, 1, 1, 34], [-1, -1, 1, 16], [1, -1, -1, 21]] });

  const V = { nombres: ["Ingrediente A", "Ingrediente B", "Ingrediente C"], objetivo: "min" };
  const y8 = [[13.3, 13.9], [14.7, 14.4], [14.6, 14.9], [14.3, 14.1], [16.9, 17.2], [15.5, 15.1], [17.4, 17.1], [18.9, 19.2]];
  ej6_8(Object.assign({}, V, { ej: "Cap. 6, ej. 8", loc: L68, Y: y8 }));
  ej6_8(Object.assign({}, V, { ej: "Cap. 6, ej. 8", loc: L68, mod: "el tratamiento ac dio 16,0 y 15,6 y el abc dio 17,9 y 18,2", Y: [y8[0], y8[1], y8[2], y8[3], y8[4], [16.0, 15.6], y8[6], [17.9, 18.2]] }));
  ej6_8(Object.assign({}, V, { ej: "Cap. 6, ej. 8", loc: L68, mod: "se agregó una tercera réplica", Y: y8.map((f, i) => f.concat([13.6, 14.6, 14.8, 14.2, 17.0, 15.3, 17.3, 19.0][i])) }));

  const Bp = { nombres: ["x1 (papel)", "x2 (humedad)", "x3 (dirección)"], objetivo: "max" };
  const y10 = [[3.8, 3.1, 2.2], [6.6, 8.0, 6.8], [3.4, 1.7, 3.8], [6.8, 8.2, 6.0], [2.3, 3.1, 0.7], [4.7, 3.5, 4.4], [2.1, 1.1, 3.6], [4.2, 4.7, 2.9]];
  ej6_10(Object.assign({}, Bp, { ej: "Cap. 6, ej. 10", loc: L610, Y: y10 }));
  ej6_10(Object.assign({}, Bp, { ej: "Cap. 6, ej. 10", loc: L610, mod: "solo las dos primeras réplicas", Y: y10.map((f) => f.slice(0, 2)) }));
  ej6_10(Object.assign({}, Bp, { ej: "Cap. 6, ej. 10", loc: L610, mod: "con x1 en + y x2, x3 en − se midió 6,1; 7,5; 6,9 y con x1, x3 en + y x2 en − se midió 5,2; 4,0; 4,9", Y: [y10[0], [6.1, 7.5, 6.9], y10[2], y10[3], y10[4], [5.2, 4.0, 4.9], y10[6], y10[7]] }));
}

module.exports = { m20, m21, m25 };
