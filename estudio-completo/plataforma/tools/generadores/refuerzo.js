/* ============================================================================
   generadores/refuerzo.js — Ejercicios para las preguntas adicionales que
   anunció el equipo docente (2026-11-05):
     · P3 incluye una pregunta de ANOVA (reemplaza la peor pregunta de P2)
       ⇒ M18: ejercicios del cap. 3 del libro guía (ORIGINAL / MODIFICADA).
     · P4 incluye una pregunta de análisis factorial y componentes principales
       (se promedia con P1) ⇒ M09 y M10: preguntas de la Prueba 1 2026-20
       (pauta oficial) y variantes.
   Las funciones se llaman m09x, m10x y m18x para ejecutarse DESPUÉS de m09,
   m10 y m18 (orden alfabético en generar_desarrollos.js): así los IDs nuevos
   se agregan al final y no cambian los existentes.
   ========================================================================== */
"use strict";
const L = require("./lib");
const { Rn, Rv, Rtxt, N, M, suma, media, tabla, incisos, p, rvec, vr, vjs, agregar, afirmar } = L;

const ORIG = "ORIGINAL-LIBRO GUIA", MOD = "MODIFICADA-LIBRO GUIA";
const fp = (pv) => (pv < 0.0001 ? "\\lt 0{,}0001" : "=" + N(pv, 4));
const pTxt = (pv) => "$p" + fp(pv) + "$";
function conR(q) { if (q.codigoR && !q.salidaR) { q.salidaR = Rtxt(q.codigoR).replace(/\s+$/, ""); q.salidaDe = q.codigoR; } return q; }

/* ═════════════════════ M18 · ANOVA de un factor (libro guía cap. 3) ═════════════════════ */
function lgAnova(o) {
  const nom = o.trat, Y = o.Y, k = nom.length, ni = Y.map((g) => g.length), Nt = suma(ni), al = o.alfa || 0.05;
  const bal = ni.every((v) => v === ni[0]);
  const Ti = Y.map(suma), G = suma(Ti), C = (G * G) / Nt, ssy = suma(Y.flat().map((x) => x * x));
  const SST = ssy - C, SStr = suma(Ti.map((t, i) => (t * t) / ni[i])) - C, SSE = SST - SStr;
  const glT = k - 1, glE = Nt - k, CMt = SStr / glT, CME = SSE / glE, F = CMt / CME;
  const mi = Ti.map((t, i) => t / ni[i]);
  const datR = `y <- ${rvec(Y.flat())}; trat <- factor(rep(${rvec(nom.map((t) => JSON.stringify(t)))}, ${rvec(ni)}), levels = ${rvec(nom.map((t) => JSON.stringify(t)))})`;
  const [pv, Fc, tc] = Rv(`c(pf(${F}, ${glT}, ${glE}, lower.tail = FALSE), qf(${1 - al}, ${glT}, ${glE}), qt(${1 - al / 2}, ${glE}))`);
  const pSW = Rn(`{${datR}; shapiro.test(resid(aov(y ~ trat)))$p.value}`);
  const pBar = Rn(`{${datR}; bartlett.test(y ~ trat)$p.value}`);
  const pLev = Rn(`{${datR}; car::leveneTest(y ~ trat)[1, 3]}`);
  afirmar(Math.abs(F - Fc) > 0.1, "F cerca del crítico");
  const rech = F > Fc;
  const LSD = tc * Math.sqrt(2 * CME / ni[0]);
  const pares = [];
  for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++) {
    const lsd = bal ? LSD : tc * Math.sqrt(CME * (1 / ni[i] + 1 / ni[j]));
    pares.push([`${nom[i]} − ${nom[j]}`, Math.abs(mi[i] - mi[j]), lsd]);
  }
  const orden = mi.map((m, i) => [nom[i], m]).sort((a, b) => (o.maximizar ? b[1] - a[1] : a[1] - b[1]));
  const ej = o.mod ? `${MOD} · ${o.ej}` : `${ORIG} · ${o.ej}`;
  const aviso = o.mod ? `<p><strong>${MOD}</strong> — variante del ${o.ej} del libro guía. Cambio respecto del original: ${o.mod}.</p>`
    : `<p><strong>${ORIG}</strong> — ${o.ej} del libro guía (Gutiérrez y de la Vara, 2.ª ed.), con los datos del libro.</p>`;
  const tabDatos = tabla([o.factor].concat(nom), Array.from({ length: Math.max(...ni) }, (_, r) => [""].concat(Y.map((g) => (g[r] == null ? "" : M(g[r]))))).map((f, r) => { f[0] = String(r + 1); return f; }));
  const tAnova = tabla(["Fuente", "SC", "gl", "CM", "$F_0$", "Valor-p"], [
    [o.Factor, M(SStr, 3), glT, M(CMt, 3), M(F, 2), "$" + fp(pv).replace(/^=/, "") + "$"],
    ["Error", M(SSE, 3), glE, M(CME, 3), "", ""], ["Total", M(SST, 3), Nt - 1, "", "", ""]]);
  const tPares = tabla(["Par", "$|\\bar Y_i-\\bar Y_j|$", "LSD", "¿Difieren?"], pares.map(([par, d, l]) => [par, M(d, 3), M(l, 3), d > l ? "Sí" : "No"]));
  const q = {
    concepto: "m18-c03", dificultad: 2, origen: o.mod ? "variacion" : "curso", titulo: `${ej} · ${o.titulo}`,
    enunciado: aviso + p(o.intro) + tabDatos + p(`Use $\\alpha=${N(al, 2)}$.`) + incisos(o.incisos),
    partes: [
      { titulo: "a) " + (o.tituloA || "Modelo e hipótesis"), puntos: 1, solucion: p(
        (o.notaA ? o.notaA + " " : "") + String.raw`Diseño completamente al azar con un factor (${o.factorMin}, $k=${k}$ niveles${bal ? `, $n=${ni[0]}$ réplicas` : ""}). Modelo: $Y_{ij}=\mu+\tau_i+\varepsilon_{ij}$, $\varepsilon_{ij}\sim N(0,\sigma^2)$ independientes.`,
        String.raw`$H_0:\mu_1=\dots=\mu_${k}$ (el ${o.factorMin} no influye en la media de ${o.respuesta}) contra $H_1:\mu_i\neq\mu_j$ para algún par.`) },
      { titulo: "b) Sumas de cuadrados con totales", puntos: 1.5, solucion:
        tabla([""].concat(nom, ["Total"]), [["$Y_{i\\cdot}$"].concat(Ti.map((t) => M(t, 3)), [M(G, 3)]), ["$\\bar Y_{i\\cdot}$"].concat(mi.map((m) => M(m, 3)), [M(G / Nt, 3)])]) +
        p(String.raw`$N=${Nt}$, $\;Y_{\cdot\cdot}^2/N=${N(G, 3)}^2/${Nt}=${N(C, 3)}$, $\;\sum Y_{ij}^2=${N(ssy, 3)}$.`,
          String.raw`$SC_T=${N(ssy, 3)}-${N(C, 3)}=${N(SST, 3)}$`,
          bal ? String.raw`$SC_{TRAT}=\dfrac{\sum Y_{i\cdot}^2}{n}-\dfrac{Y_{\cdot\cdot}^2}{N}=\dfrac{${N(suma(Ti.map((t) => t * t)), 3)}}{${ni[0]}}-${N(C, 3)}=${N(SStr, 3)}$`
            : String.raw`$SC_{TRAT}=\sum\dfrac{Y_{i\cdot}^2}{n_i}-\dfrac{Y_{\cdot\cdot}^2}{N}=${N(SStr, 3)}$`,
          String.raw`$SC_E=SC_T-SC_{TRAT}=${N(SSE, 3)}$`) },
      { titulo: "c) Tabla ANOVA y decisión", puntos: 1.5, solucion: tAnova + p(
        String.raw`$F_0=${N(F, 2)}$ ${rech ? "&gt;" : "&lt;"} $F_{${N(al, 2)};${glT},${glE}}=${N(Fc, 2)}$ (${pTxt(pv)}) ⇒ ${rech ? "se <strong>rechaza</strong> $H_0$" : "<strong>no se rechaza</strong> $H_0$"}. ` +
        (rech ? o.siRechaza : o.siNoRechaza)) },
      { titulo: "d) " + (o.tituloD || "Comparaciones y mejor tratamiento"), puntos: 1, solucion: rech ? p(
        bal ? String.raw`$LSD=t_{${N(al / 2, 3)};\,${glE}}\sqrt{\dfrac{2\,CM_E}{n}}=${N(tc, 3)}\sqrt{\dfrac{2\cdot${N(CME, 4)}}{${ni[0]}}}=${N(LSD, 3)}$.`
          : String.raw`Con tamaños distintos: $LSD_{ij}=t_{${N(al / 2, 3)};\,${glE}}\sqrt{CM_E\left(\tfrac{1}{n_i}+\tfrac{1}{n_j}\right)}$.`) + tPares + p(o.notaD || "")
        : p(String.raw`Como el ANOVA no rechazó $H_0$, no corresponde declarar un tratamiento mejor: las diferencias entre medias son compatibles con el azar. ` + (o.notaD || "")) },
      { titulo: "e) " + (o.tituloE || "Supuestos"), puntos: 1, solucion: p(
        String.raw`Normalidad de los residuos (Shapiro–Wilk): ${pTxt(pSW)} ⇒ ${pSW < al ? "se rechaza la normalidad" : "no se rechaza la normalidad"}.`,
        String.raw`Varianza constante: Bartlett ${pTxt(pBar)} y Levene ${pTxt(pLev)} ⇒ ${pBar < al || pLev < al ? "hay evidencia de varianzas distintas" : "no hay evidencia de varianzas distintas"}.`,
        o.notaE || "Gráficamente: QQ-plot de residuos, residuos contra predichos (sin forma de embudo) y residuos contra el orden de corrida (independencia).") }
    ],
    codigoR: `${datR}
modelo <- aov(y ~ trat)
summary(modelo)
agricolae::LSD.test(modelo, "trat", console = TRUE)
shapiro.test(resid(modelo))
bartlett.test(y ~ trat)`,
    verifica: [vr("F (aov)", `{${datR}; summary(aov(y ~ trat))[[1]][1, 4]}`, F, 3), vr("SC error (aov)", `{${datR}; summary(aov(y ~ trat))[[1]][2, 2]}`, SSE, 3)],
    fuente: [{ id: "LG", loc: o.loc }].concat([{ id: "C7.1", loc: "páginas 36–51" }, { id: "C7.2", loc: "slides 2–19" }])
  };
  if (o.mod) q.base = [{ id: "LG", loc: o.loc }];
  agregar("m18", conR(q));
}

function m18x() {
  /* Cap. 3, ej. 5: completar la tabla */
  const k = 5, n = 4, scT = 800, scE = 400, glT = k - 1, glE = k * (n - 1), F = (scT / glT) / (scE / glE);
  const [pv, Fc] = Rv(`c(pf(${F}, ${glT}, ${glE}, lower.tail = FALSE), qf(0.95, ${glT}, ${glE}))`);
  agregar("m18", {
    concepto: "m18-c02", dificultad: 1, origen: "curso", titulo: `${ORIG} · Cap. 3, ej. 5 · Completar la tabla ANOVA`,
    enunciado: `<p><strong>${ORIG}</strong> — Cap. 3, ej. 5 del libro guía (Gutiérrez y de la Vara, 2.ª ed.).</p>` +
      p("A continuación se muestra parte del ANOVA para comparar cinco tratamientos con cuatro réplicas cada uno.") +
      tabla(["Fuente", "SC", "gl", "CM", "$F_0$", "Valor-p"], [["Tratamiento", "$800$", "", "", "", ""], ["Error", "$400$", "", "", "", ""], ["Total", "", "", "", "", ""]]) +
      incisos(["Agregue los grados de libertad, el cuadrado medio y la razón F.", "Explique de manera esquemática cómo calcularía el valor-p.",
        "¿Con la información disponible se puede concluir si hay diferencias significativas entre tratamientos? Argumente.", "Anote el modelo estadístico y formule la hipótesis pertinente."]),
    partes: [
      { titulo: "a) Completar la tabla", puntos: 2, solucion: tabla(["Fuente", "SC", "gl", "CM", "$F_0$"], [["Tratamiento", "$800$", `$${glT}$`, `$${N(scT / glT, 3)}$`, `$${N(F, 3)}$`],
        ["Error", "$400$", `$${glE}$`, `$${N(scE / glE, 3)}$`, ""], ["Total", "$1200$", `$${k * n - 1}$`, "", ""]]) +
        p(String.raw`gl: tratamientos $k-1=${glT}$; error $N-k=${k * n}-${k}=${glE}$; total $N-1=${k * n - 1}$. $CM=SC/\text{gl}$ y $F_0=CM_{TRAT}/CM_E=200/26{,}667=${N(F, 2)}$.`) },
      { titulo: "b) Valor-p, esquemáticamente", puntos: 1.5, solucion: p(String.raw`Bajo $H_0$, $F_0\sim F_{${glT},${glE}}$. Se dibuja esa distribución, se marca $F_0=${N(F, 2)}$ y el valor-p es el área a su derecha: $P(F_{${glT},${glE}}>${N(F, 2)})${fp(pv)}$. En R: pf(7.5, 4, 15, lower.tail = FALSE) .`) },
      { titulo: "c) ¿Hay diferencias?", puntos: 1.5, solucion: p(String.raw`Sí: $F_0=${N(F, 2)}$ supera al crítico $F_{0{,}05;${glT},${glE}}=${N(Fc, 2)}$ (${pTxt(pv)}), así que al 5 % se rechaza la igualdad de medias. Con la tabla no se puede decir <strong>cuáles</strong> difieren: para eso hacen falta las medias y una comparación múltiple (LSD, Tukey).`) },
      { titulo: "d) Modelo e hipótesis", puntos: 1, solucion: p(String.raw`$Y_{ij}=\mu+\tau_i+\varepsilon_{ij}$, $i=1,\dots,5$, $j=1,\dots,4$, $\varepsilon_{ij}\sim N(0,\sigma^2)$. $H_0:\mu_1=\dots=\mu_5$ contra $H_1:\mu_i\neq\mu_j$ para algún par.`) }
    ],
    verifica: [vjs("F", "(800/4)/(400/15)", F, 3), vr("valor-p", `pf(7.5, 4, 15, lower.tail = FALSE)`, pv, 4)],
    fuente: [{ id: "LG", loc: "cap. 3, ej. 5" }, { id: "C7.1", loc: "páginas 36–41" }]
  });
  /* Cap. 3, ej. 10: interpretar un ANOVA parcial */
  agregar("m18", {
    concepto: "m18-c06", dificultad: 2, origen: "curso", titulo: `${ORIG} · Cap. 3, ej. 10 · Mezclas y peso molecular`,
    enunciado: `<p><strong>${ORIG}</strong> — Cap. 3, ej. 10 del libro guía.</p>` +
      p("En una industria química se prueban cuatro mezclas, con cinco repeticiones cada una, para ver si difieren en el peso molecular final. El ANOVA da para el factor mezcla un valor-p de 0,01, y los promedios son: A = 10 000, B = 7 000, C = 8 000, D = 7 500.") +
      incisos(["¿Las mezclas difieren de manera significativa en cuanto a su peso molecular?", "Con el ANOVA y los promedios, ¿se puede asegurar que con la mezcla B se logra un menor peso molecular? Argumente.",
        "Si no se cumple el supuesto de varianza constante entre las mezclas, ¿qué significa eso? ¿Se puede seguir apoyando la conclusión de a)?"]),
    partes: [
      { titulo: "a) ¿Difieren?", puntos: 2, solucion: p("Sí, al 5 %: el valor-p (0,01) es menor que α = 0,05, así que se rechaza la igualdad de las cuatro medias. (Al 1 % quedaría justo en el límite.)") },
      { titulo: "b) ¿B es la menor?", puntos: 2, solucion: p("No se puede asegurar solo con el ANOVA y los promedios. El ANOVA dice que <strong>al menos</strong> un par difiere, no cuál. Que B tenga el promedio más bajo no basta: B (7 000), D (7 500) y C (8 000) podrían no diferir entre sí. Hay que hacer una comparación múltiple (LSD o Tukey) con el CM del error; lo más probable es que A sea la que se separa.") },
      { titulo: "c) Si falla la varianza constante", puntos: 2, solucion: p("Significa que las mezclas no solo afectan el peso medio, sino también su dispersión: algunas producen pesos más variables. El ANOVA supone varianza común, así que su valor-p ya no es confiable y la conclusión de a) queda en duda. Se corrige transformando la respuesta (logaritmo, raíz) o con un método robusto, y se repite el análisis.") }
    ],
    fuente: [{ id: "LG", loc: "cap. 3, ej. 10" }, { id: "C7.2", loc: "slides 10–19" }]
  });
  lgAnova({ ej: "Cap. 3, ej. 12", loc: "cap. 3, ej. 12", titulo: "Tiempo de cocción de frijoles", factor: "Réplica", Factor: "Tratamiento", factorMin: "tratamiento", respuesta: "tiempo de cocción",
    trat: ["Control", "T2", "T3", "T4"], Y: [[213, 214, 204, 208, 212, 200, 207], [76, 85, 74, 78, 82, 75, 82], [57, 67, 55, 64, 61, 63, 63], [84, 82, 85, 92, 87, 79, 90]],
    intro: "Se comparan tratamientos que reducen el tiempo de cocción de frijoles crudos: Control (sin tratamiento), T2 (remojo con bicarbonato), T3 (remojo con sal común) y T4 (ambos en partes iguales). Respuesta: tiempo de cocción en minutos.",
    incisos: ["¿Cómo debe aleatorizar el experimentador? Formule el modelo y la hipótesis.", "Calcule las sumas de cuadrados.", "Construya la tabla ANOVA y pruebe la igualdad de medias.", "¿Hay algún tratamiento mejor? ¿Cuál es el tiempo de cocción esperado con él?", "¿Se cumplen los supuestos? Pruebe la igualdad de varianzas."],
    notaA: "Se asigna al azar cada porción de frijoles a un tratamiento y se cocinan en orden aleatorio, con todo lo demás fijo (tipo y cantidad de frijol, volumen de agua, temperatura, olla).",
    siRechaza: "Los tratamientos no dan todos el mismo tiempo de cocción.", tituloD: "Mejor tratamiento", maximizar: false,
    notaD: "Se busca el menor tiempo: <strong>T3</strong> (remojo con sal) es significativamente más rápido que los demás; el tiempo esperado es su media, $\\approx 61{,}4$ min. Antes de adoptarlo hay que revisar efectos colaterales (sabor, textura, sodio)." });
  lgAnova({ ej: "Cap. 3, ej. 13", loc: "cap. 3, ej. 13", titulo: "Temperatura y deterioro de tableros", factor: "Réplica", Factor: "Temperatura", factorMin: "temperatura", respuesta: "intensidad de corriente",
    trat: ["20 °C", "40 °C", "60 °C", "80 °C", "100 °C"], Y: [[15, 18, 13, 12], [17, 21, 11, 16], [23, 19, 25, 22], [28, 32, 34, 31], [45, 51, 57, 48]],
    intro: "Tableros electrónicos sometidos a envejecimiento acelerado durante 100 horas a distintas temperaturas; se mide la intensidad de corriente entre dos puntos (aumenta con el deterioro). 20 módulos repartidos en 5 temperaturas.",
    incisos: ["Formule la hipótesis y el modelo.", "Calcule las sumas de cuadrados.", "Realice el ANOVA: ¿la temperatura afecta la intensidad promedio?", "¿Qué temperaturas difieren?", "¿La temperatura afecta la variabilidad de las intensidades?"],
    siRechaza: "La temperatura sí afecta la intensidad promedio: a mayor temperatura, mayor deterioro.", maximizar: false, tituloD: "Comparaciones",
    notaD: "Las medias crecen con la temperatura. Todas las temperaturas difieren entre sí, salvo 20 °C y 40 °C; 100 °C se separa claramente de todas.", tituloE: "¿Afecta la variabilidad?",
    notaE: "Las pruebas de igualdad de varianzas responden directamente esta pregunta: si se rechazara, la temperatura afectaría también la dispersión del deterioro, no solo su media." });
  lgAnova({ ej: "Cap. 3, ej. 15", loc: "cap. 3, ej. 15", titulo: "Almidón y dureza de tabletas", factor: "Réplica", Factor: "Almidón", factorMin: "porcentaje de almidón", respuesta: "dureza",
    trat: ["2 %", "5 %", "10 %"], Y: [[4.3, 5.2, 4.8, 4.5], [6.5, 7.3, 6.9, 6.1], [9.0, 7.8, 8.5, 8.1]],
    intro: "Una farmacéutica evalúa el efecto de la cantidad de almidón (2 %, 5 % y 10 %) en la dureza de las tabletas. Respuesta: dureza promedio de 20 tabletas de cada lote; 4 réplicas por tratamiento.",
    incisos: ["Formule el modelo y la hipótesis.", "Calcule las sumas de cuadrados.", "¿Hay evidencia de que el almidón influye en la dureza? Halle el ANOVA.", "Realice los análisis complementarios. Si se desea maximizar la dureza, ¿qué recomendaría?", "Verifique los supuestos."],
    siRechaza: "El porcentaje de almidón influye en la dureza.", maximizar: true, tituloD: "Comparaciones y recomendación",
    notaD: "Los tres niveles difieren entre sí. Para maximizar la dureza se recomienda <strong>10 %</strong> de almidón (media $\\approx 8{,}35$)." });
  lgAnova({ ej: "Cap. 3, ej. 18", loc: "cap. 3, ej. 18", titulo: "Clonas de agave", factor: "Réplica", Factor: "Clona", factorMin: "tipo de clona", respuesta: "% de azúcares reductores",
    trat: ["Clona 1", "Clona 2", "Clona 3", "Clona 4"], Y: [[8.69, 6.68, 6.83, 6.43, 10.30], [8.00, 16.41, 12.43, 10.99, 15.53], [17.39, 13.73, 15.62, 17.05, 15.42], [10.37, 9.16, 8.13, 4.40, 10.38]],
    intro: "Se cultivaron cuatro clonas de agave tequilana bajo un mismo manejo; se mide el porcentaje de azúcares reductores totales (mayor es mejor).",
    incisos: ["Formule el modelo y la hipótesis.", "Calcule las sumas de cuadrados.", "Compare las medias de las clonas mediante ANOVA.", "¿Hay una clona que respondió mejor? Si hay un empate estadístico, ¿qué propondría para desempatar?", "Verifique los residuos."],
    siRechaza: "Las clonas no responden igual al manejo.", maximizar: true, tituloD: "¿Hay una clona mejor?",
    notaD: "La clona 3 tiene la media más alta y difiere de las clonas 1 y 4, pero <strong>no</strong> de la clona 2: hay un empate estadístico entre 3 y 2. Para desempatar: más réplicas, otros criterios (costo, rendimiento en campo, variabilidad) o un segundo experimento solo con esas dos." });
  /* Variantes */
  lgAnova({ ej: "Cap. 3, ej. 15", loc: "cap. 3, ej. 15", mod: "otros valores de dureza, con el 5 % y el 10 % más cercanos", titulo: "Almidón y dureza (variante)", factor: "Réplica", Factor: "Almidón",
    factorMin: "porcentaje de almidón", respuesta: "dureza", trat: ["2 %", "5 %", "10 %"], Y: [[4.6, 5.3, 4.9, 5.0], [7.4, 7.9, 6.8, 7.5], [7.9, 7.6, 8.0, 7.7]],
    intro: "Misma situación del ejercicio 15: dureza promedio de tabletas con 2 %, 5 % y 10 % de almidón, 4 réplicas por nivel.",
    incisos: ["Formule el modelo y la hipótesis.", "Calcule las sumas de cuadrados.", "Halle el ANOVA.", "Compare con LSD. Si se desea maximizar la dureza, ¿qué recomendaría?", "Verifique los supuestos."],
    siRechaza: "El porcentaje de almidón influye en la dureza.", maximizar: true, tituloD: "Comparaciones y recomendación",
    notaD: "El 5 % y el 10 % <strong>no</strong> difieren: conviene el <strong>5 %</strong>, misma dureza estadística con menos almidón (más barato). Elegir el promedio más alto (10 %) sin mirar la LSD sería un error típico." });
  lgAnova({ ej: "Cap. 3, ej. 12", loc: "cap. 3, ej. 12", mod: "solo 5 réplicas por tratamiento y otros tiempos", titulo: "Cocción de frijoles (variante)", factor: "Réplica", Factor: "Tratamiento",
    factorMin: "tratamiento", respuesta: "tiempo de cocción", trat: ["Control", "T2", "T3", "T4"], Y: [[205, 198, 210, 202, 207], [80, 72, 77, 84, 79], [70, 75, 66, 73, 71], [83, 88, 80, 86, 82]],
    intro: "Misma situación del ejercicio 12 (tiempo de cocción de frijoles en minutos), ahora con 5 réplicas por tratamiento.",
    incisos: ["Formule el modelo y la hipótesis.", "Calcule las sumas de cuadrados.", "Construya la tabla ANOVA.", "¿Hay algún tratamiento mejor?", "Verifique los supuestos."],
    siRechaza: "Los tratamientos no dan todos el mismo tiempo de cocción.", maximizar: false, tituloD: "Mejor tratamiento",
    notaD: "Se busca el menor tiempo: <strong>T3</strong> es el más rápido y difiere de todos (la diferencia más chica, con T2, es 7,4 &gt; LSD). Tiempo esperado: su media, 71 min." });
}

/* ═════════════════════ M09 · Componentes principales (Prueba 1 2026-20) ═════════════════════ */
const P126 = (q) => [{ id: "PR-P1-26-" + q }];
function pcaRetail(o) {
  const sd = o.sd, lam = sd.map((s) => s * s), tot = suma(lam), prop = lam.map((l) => l / tot);
  const acum = prop.map((_, i) => suma(prop.slice(0, i + 1)));
  const kaiser = lam.filter((l) => l > 1).length, k80 = acum.findIndex((a) => a >= 0.8) + 1;
  const vars = o.vars, rot = o.rot, pc1 = rot.map((f) => f[0]);
  const expr = pc1.map((c, i) => `${i ? (c < 0 ? "-" : "+") : c < 0 ? "-" : ""}${N(Math.abs(c), 4)}\\,Z_{\\text{${vars[i]}}}`).join("");
  const tit = o.mod ? `MODIFICADA-PRUEBA 1 (2026-20) · Pregunta 3.1 · ${o.titulo}` : `ORIGINAL-PRUEBA 1 (2026-20) · Pregunta 3.1 · ${o.titulo}`;
  const nuevo = o.nuevo;
  let parteD;
  if (o.medias) {
    const z = nuevo.map((x, i) => (x - o.medias[i]) / o.sds[i]), score = suma(z.map((v, i) => v * pc1[i]));
    parteD = p(`Primero se estandariza cada valor con la media y la desviación de la muestra: $Z=(X-\\bar X)/s$.`) +
      tabla(["Variable", "X", "$\\bar X$", "s", "Z", "loading PC1", "Z × loading"], vars.map((v, i) => [v, M(nuevo[i]), M(o.medias[i]), M(o.sds[i]), M(z[i], 3), M(pc1[i], 3), M(z[i] * pc1[i], 3)])) +
      p(`Score: $PC_1=${N(score, 3)}$. ${score > 0 ? "Positivo: cliente más activo que el promedio." : "Negativo: cliente menos activo que el promedio."}`);
  } else {
    parteD = p("<strong>No</strong> se puede reemplazar directamente: el PCA se hizo con variables estandarizadas, así que primero hay que calcular $Z=(X-\\bar X)/s$ para cada variable con la media y la desviación estándar de la muestra. Como el enunciado no las entrega, el score no se puede calcular numéricamente; solo se puede describir el procedimiento.");
  }
  agregar("m09", {
    concepto: "m09-c06", dificultad: 2, origen: o.mod ? "variacion" : "curso", titulo: tit,
    enunciado: `<p><strong>${o.mod ? "MODIFICADA" : "ORIGINAL"}-PRUEBA 1 (2026-20)</strong> — ${o.mod ? "variante de la pregunta 3.1 de la Prueba 1 de este semestre. Cambio: " + o.mod + "." : "pregunta 3.1 de la Prueba 1 de este semestre (pauta oficial)."}</p>` +
      p(o.intro) + p("Salida de R (<code>summary(pca)</code> y <code>pca$rotation</code>):") +
      tabla([""].concat(sd.map((_, i) => "PC" + (i + 1))), [["Standard deviation"].concat(sd.map((s) => M(s, 4)))]) +
      tabla([""].concat(sd.map((_, i) => "PC" + (i + 1))), vars.map((v, i) => [v].concat(rot[i].map((x) => M(x, 4))))) +
      incisos(["¿Cuántos componentes retener según Kaiser y según el 80 % de varianza acumulada? Justifique.", "Escriba explícitamente la expresión de PC1.", "Interprete conceptualmente el primer componente.",
        `Un nuevo cliente presenta ${vars.map((v, i) => `${v} = ${N(nuevo[i])}`).join(", ")}. ¿Se puede obtener su score en PC1 reemplazando estos valores en la expresión de b)? Explique cómo proceder${o.medias ? ` y calcule el score (medias: ${o.medias.map((m) => N(m)).join("; ")}; desviaciones: ${o.sds.map((s) => N(s)).join("; ")})` : ""}.`]),
    partes: [
      { titulo: "a) Kaiser y 80 %", puntos: 1.8, solucion: p(`Autovalor = varianza = sd²: ${lam.map((l, i) => `$\\lambda_${i + 1}=${N(sd[i], 2)}^2=${N(l, 4)}$`).join(", ")}. Total: $${N(tot, 4)}$.`) +
        tabla(["", ...lam.map((_, i) => "PC" + (i + 1))], [["Autovalor"].concat(lam.map((l) => M(l, 4))), ["% varianza"].concat(prop.map((x) => M(x * 100, 2))), ["% acumulado"].concat(acum.map((x) => M(x * 100, 2)))]) +
        p(`Kaiser (autovalor &gt; 1): se retiene${kaiser === 1 ? "" : "n"} <strong>${kaiser}</strong>. Varianza acumulada ≥ 80 %: se necesitan <strong>${k80}</strong> componentes. Los criterios no coinciden; se informa ambos y se decide con la interpretación.`) },
      { titulo: "b) Expresión de PC1", puntos: 1.4, solucion: p(`Con variables estandarizadas: $$PC_1=${expr}$$ donde $Z=(X-\\bar X)/s$.`) },
      { titulo: "c) Interpretación de PC1", puntos: 1.4, solucion: p(o.interp) },
      { titulo: "d) Score de un cliente nuevo", puntos: 1.4, solucion: parteD }
    ],
    verifica: [vjs("varianza total", `[${sd.join(",")}].reduce((a,s)=>a+s*s,0)`, tot, 4)],
    fuente: P126("Q3").map((f) => Object.assign(f, { loc: "pregunta 3.1" })).concat([{ id: "C3", loc: "slides 13–15" }])
  });
}
function m09x() {
  const vars = ["Frecuencia", "Gasto", "Categorias", "Cupones"];
  pcaRetail({ titulo: "PCA de clientes de retail", vars, sd: [1.25, 0.98, 0.90, 0.80],
    rot: [[0.621, -0.281, -0.041, -0.731], [0.452, 0.541, -0.612, 0.359], [0.538, -0.474, 0.372, 0.592], [-0.349, -0.637, -0.696, 0.021]],
    intro: "Una empresa de retail analiza a 50 clientes con cuatro variables: frecuencia de compra (veces al mes), gasto promedio (en pesos), número de categorías compradas y uso de cupones (veces). Se hizo un PCA con las variables estandarizadas.",
    nuevo: [10, 58000, 5, 3],
    interp: "PC1 es un índice de <strong>intensidad de compra</strong>: crece con la frecuencia, el gasto y las categorías (loadings positivos) y baja con el uso de cupones (loading negativo). Un PC1 alto = cliente activo y de alto gasto; un PC1 bajo = menos actividad y más cupones." });
  pcaRetail({ mod: "otras desviaciones estándar y se entregan las medias y desviaciones de la muestra, para calcular el score", titulo: "PCA de clientes (con score calculable)", vars,
    sd: [1.40, 1.05, 0.70, 0.55], rot: [[0.58, -0.30, 0.10, -0.75], [0.50, 0.48, -0.70, 0.17], [0.55, -0.40, 0.30, 0.67], [-0.33, -0.72, -0.64, 0.01]],
    intro: "La misma empresa repite el análisis con otra muestra de 50 clientes (variables estandarizadas).",
    nuevo: [10, 58000, 5, 3], medias: [7, 45000, 4, 4], sds: [2, 10000, 1.5, 2],
    interp: "PC1 sigue siendo un índice de intensidad de compra: pesos positivos en frecuencia, gasto y categorías, y negativo en cupones." });
  /* Pregunta 2 (conceptos de la lectura) */
  agregar("m09", {
    concepto: "m09-c03", dificultad: 1, origen: "curso", titulo: "ORIGINAL-PRUEBA 1 (2026-20) · Pregunta 2.1–2.3 · Conceptos de ACP (lectura)",
    enunciado: "<p><strong>ORIGINAL-PRUEBA 1 (2026-20)</strong> — preguntas 2.1 a 2.3 de la Prueba 1 de este semestre, basadas en la lectura de ACP.</p>" +
      incisos(["Explique los conceptos de <strong>loadings</strong> y <strong>scores</strong> en el ACP: qué información aporta cada uno y cómo ayudan a interpretar las componentes.",
        "¿Qué papel cumplen los vectores y valores propios de la matriz de correlación? Explique qué representa $\\pi_j=\\lambda_j/\\sum_{j=1}^p\\lambda_j$ y cómo se usa para decidir cuántas componentes conservar.",
        "¿Qué es un biplot y cuáles son sus ventajas? Explique la reflexión de los autores sobre aplicar ACP cuando $p>n$: ¿qué dificultades aparecen?"]),
    partes: [
      { titulo: "a) Loadings y scores", puntos: 2, solucion: p("<strong>Loadings</strong> (cargas): la importancia y dirección de la relación de cada variable original con cada componente. Un loading alto en valor absoluto indica que la variable contribuye mucho; el signo indica la dirección (mismos signos ⇒ las variables se mueven juntas; signos opuestos ⇒ en sentidos contrarios).",
        "<strong>Scores</strong>: el valor de cada individuo en cada componente; se calculan combinando sus valores estandarizados con los loadings. Sirven para ubicar y comparar observaciones en el nuevo espacio.") },
      { titulo: "b) Vectores y valores propios; π_j", puntos: 2, solucion: p("Los <strong>vectores propios</strong> dan los pesos de las variables en cada componente (componentes no correlacionadas entre sí). Los <strong>valores propios</strong> son la varianza que explica cada componente: el primero explica la máxima variabilidad posible, el segundo la mayor restante siendo ortogonal al primero, etc.",
        "$\\pi_j$ es la <strong>proporción de varianza explicada</strong> por la componente $j$. Como $\\pi_1\\ge\\pi_2\\ge\\dots$, se suman en orden hasta superar un umbral (≈ 80 %) para decidir cuántas conservar.") },
      { titulo: "c) Biplot y el caso p > n", puntos: 2, solucion: p("El <strong>biplot</strong> representa a la vez observaciones (puntos) y variables (flechas) en el plano de las dos primeras componentes. Permite ver relaciones entre variables (ángulos entre flechas), su asociación con las componentes y similitudes entre observaciones.",
        "Con $p>n$ el ACP se puede aplicar (no hay impedimento matemático), pero el rango de la matriz lo fija $n$: solo hay pocos autovalores no nulos, que explican toda la variabilidad. La dificultad es que las componentes muestrales pueden parecerse poco a las poblacionales.") }
    ],
    fuente: [{ id: "PR-P1-26-Q2", loc: "preguntas 2.1–2.3" }]
  });
}

/* ═════════════════════ M10 · Análisis factorial (Prueba 1 2026-20) ═════════════════════ */
function m10x() {
  const vars = ["precio", "descuentos", "cond_pago", "calidad_prod", "confiabilidad", "certificaciones", "tiempo_entrega", "soporte_tecnico", "comunicacion", "flexibilidad"];
  const msa = [0.88, 0.93, 0.94, 0.68, 0.78, 0.97, 0.55, 0.17, 0.23, 0.42];
  const car = [[0.91, "", ""], [0.92, "", ""], [0.91, "", ""], ["", "", 0.95], [0.53, "", 0.81], [0.89, "", ""], [0.85, "", ""], ["", 0.80, ""], ["", 0.89, ""], ["", 0.89, ""]];
  const h2 = [0.89, 0.85, 0.85, 0.96, 0.93, 0.91, 0.83, 0.65, 0.80, 0.97], u2 = [0.105, 0.145, 0.154, 0.039, 0.068, 0.091, 0.165, 0.355, 0.197, 0.028];
  const com = [1.1, 1.0, 1.1, 1.1, 1.7, 1.3, 1.3, 1.0, 1.0, 1.5];
  const mic = suma(com) / com.length;
  agregar("m10", {
    concepto: "m10-c03", dificultad: 2, origen: "curso", titulo: "ORIGINAL-PRUEBA 1 (2026-20) · Pregunta 3.2 · KMO, comunalidades y Varimax (servicio de entrega)",
    enunciado: "<p><strong>ORIGINAL-PRUEBA 1 (2026-20)</strong> — pregunta 3.2 de la Prueba 1 de este semestre (pauta oficial).</p>" +
      p("Una empresa de comercio electrónico encuestó a 300 clientes sobre 10 criterios del servicio de entrega (precio, descuentos, condiciones de pago, calidad del producto, confiabilidad, certificaciones, tiempo de entrega, soporte técnico, comunicación y flexibilidad). Salidas de R:") +
      p("<code>KMO(cor_mat)</code>: Overall MSA = 0,64. MSA por variable:") + tabla(vars, [msa.map((x) => M(x, 2))]) +
      p("<code>principal(r = datos, nfactors = 3, rotate = \"varimax\")</code>, cargas &gt; 0,4:") +
      tabla(["", "RC1", "RC2", "RC3", "h2", "u2", "com"], vars.map((v, i) => [v].concat(car[i].map((x) => (x === "" ? "" : M(x, 2))), [M(h2[i], 2), M(u2[i], 3), M(com[i], 1)]))) +
      p("SS loadings: 4,50; 2,24; 1,91 · Proportion Var: 0,45; 0,22; 0,19.") +
      incisos(["¿Qué representa la prueba KMO? Explique los resultados usando el concepto de correlación parcial.", "¿Qué variable está mejor representada por la solución factorial? ¿Y peor?",
        "¿Los factores están correlacionados? Explique.", "¿Cuál es el valor y qué representa el «Mean item complexity»?"]),
    partes: [
      { titulo: "a) KMO", puntos: 1.5, solucion: p("El KMO compara las correlaciones simples con las <strong>parciales</strong> (la correlación entre dos variables controlando las demás). Si las parciales son chicas respecto de las simples, las variables comparten estructura común y el análisis factorial tiene sentido.",
        "KMO global = 0,64: adecuación aceptable (≥ 0,5). Pero soporte técnico (0,17) y comunicación (0,23) tienen MSA muy bajos: se relacionan poco con el resto y podrían perjudicar la solución.") },
      { titulo: "b) Mejor y peor representada", puntos: 1.5, solucion: p("Se mira la <strong>comunalidad</strong> $h^2$ (varianza de la variable explicada por los factores). Mejor: <strong>flexibilidad</strong>, $h^2=0{,}97$ (97 %). Peor: <strong>soporte técnico</strong>, $h^2=0{,}65$: los factores explican el 65 % de su varianza y queda un 35,5 % específico ($u^2=0{,}355$).",
        "⚠ La pauta oficial dice «comunalidad ≈ 0,35» para soporte técnico: ese número es su especificidad $u^2$, no $h^2$ (ver Diferencias entre fuentes). La variable peor representada es la misma.") },
      { titulo: "c) ¿Factores correlacionados?", puntos: 1.5, solucion: p("No: se usó <strong>Varimax</strong>, una rotación <strong>ortogonal</strong>, que mantiene los factores no correlacionados. Con una rotación oblicua (Oblimin, Promax) sí podrían estarlo.") },
      { titulo: "d) Mean item complexity", puntos: 1.5, solucion: p(`Es el promedio de la columna <code>com</code>: $(${com.map((c) => N(c, 1)).join("+")})/10=${N(mic, 2)}$. Indica en cuántos factores carga, en promedio, cada variable: cerca de 1 ⇒ cada variable carga principalmente en un solo factor (estructura simple, fácil de interpretar). La más compleja es confiabilidad (1,7), que carga en RC1 y RC3.`) }
    ],
    verifica: [vjs("mean item complexity", `[${com.join(",")}].reduce((a,b)=>a+b,0)/10`, mic, 2)],
    fuente: [{ id: "PR-P1-26-Q3", loc: "pregunta 3.2" }, { id: "C4.1", loc: "slides 9–22" }]
  });
  agregar("m10", {
    concepto: "m10-c01", dificultad: 1, origen: "curso", titulo: "ORIGINAL-PRUEBA 1 (2026-20) · Pregunta 2.4–2.5 · Objetivos y etapas del AFE (lectura)",
    enunciado: "<p><strong>ORIGINAL-PRUEBA 1 (2026-20)</strong> — preguntas 2.4 y 2.5 de la Prueba 1 de este semestre, basadas en la lectura de análisis factorial exploratorio.</p>" +
      incisos(["Mencione y describa brevemente cinco objetivos del análisis factorial exploratorio (AFE).", "Explique el propósito y las principales características de cada una de las cinco etapas del análisis factorial."]),
    partes: [
      { titulo: "a) Cinco objetivos del AFE", puntos: 2, solucion: "<ol><li><strong>Reducir el número de variables</strong> a unos pocos factores que resuman las dimensiones principales.</li><li><strong>Examinar la estructura</strong> de relaciones entre variables (qué grupos de variables van juntas).</li><li><strong>Evaluar la unidimensionalidad</strong> de un constructo.</li><li><strong>Evaluar la validez de constructo</strong> de una escala o instrumento.</li><li><strong>Lograr una interpretación parsimoniosa</strong> con pocos factores.</li></ol>" + p("También: abordar la multicolinealidad y desarrollar o contrastar teorías.") },
      { titulo: "b) Las cinco etapas", puntos: 4, solucion: "<ol><li><strong>¿Los datos son adecuados?</strong> Tamaño de muestra, razón N:p, matriz de correlaciones; KMO ≥ 0,5 y Bartlett significativo (p &lt; 0,05).</li>" +
        "<li><strong>Método de extracción:</strong> PCA, ejes principales (PAF), máxima verosimilitud, mínimos cuadrados, etc., según el objetivo y los datos.</li>" +
        "<li><strong>Número de factores:</strong> combinar criterios — Kaiser (autovalor &gt; 1), gráfico de sedimentación, % de varianza acumulada y análisis paralelo — y el juicio del investigador.</li>" +
        "<li><strong>Rotación:</strong> simplificar la estructura (cargas altas más altas, bajas más bajas). Ortogonal (Varimax, Quartimax: factores no correlacionados) u oblicua (Oblimin, Promax). Revisar variables sin cargas claras o que cargan en varios factores.</li>" +
        "<li><strong>Interpretación:</strong> nombrar cada factor según las variables que cargan en él (idealmente 2–3 o más); es un proceso teórico y subjetivo que requiere criterio.</li></ol>" }
    ],
    fuente: [{ id: "PR-P1-26-Q2", loc: "preguntas 2.4–2.5" }]
  });
}

module.exports = { m09x, m10x, m18x };
