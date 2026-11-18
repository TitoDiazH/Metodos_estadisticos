/* ============================================================================
   generadores/p4.js — Ejercicios recomendados para la PRUEBA 4 (Instructivo P4):
     · Regresión lineal múltiple: Walpole 9.ª ed., ej. 12.1 a 12.11 y 12.36 → M26
     · Superficie de respuesta: Gutiérrez y de la Vara 2.ª ed., cap. 12, ej. 22–29 → M23
   Cada ejercicio sale una vez «ORIGINAL» (datos del libro) y dos veces
   «MODIFICADA» (cambios ligeros en los datos o en lo que se pide). Además de lo
   que pide el libro, cada uno trae las preguntas del Instructivo P4: interpretar
   coeficientes y ∂y/∂xᵢ, prueba t, F global, R² y R² ajustado, supuestos, VIF,
   apalancamiento y Cook (regresión) · términos, curvatura, interacción, punto
   estacionario a mano y hessiana (superficie). Cada respuesta lleva estadístico
   o valor-p, decisión y conclusión en el contexto del problema.
   IDs: en orden de llamada dentro de m26() y m23(); agregar SIEMPRE al final.
   ========================================================================== */
"use strict";
const L = require("./lib");
const C = require("./p4calc");
const { W, G } = require("./p4datos");
const { N, tabla, incisos, p, agregar, vr } = L;

const ORIG_W = "ORIGINAL-LIBRO WALPOLE", MOD_W = "MODIFICADA-LIBRO WALPOLE";
const ORIG_G = "ORIGINAL-LIBRO GUIA", MOD_G = "MODIFICADA-LIBRO GUIA";
const AL = 0.05;
const fp = (pv) => (pv < 0.0001 ? "\\lt 0{,}0001" : "=" + N(pv, 4));
const pT = (pv) => "$p" + fp(pv) + "$";
const signo = (x) => (x < 0 ? "-" : "+");
/* Número para TEXTO (fuera de $…$): coma normal y signo menos tipográfico */
const Tx = (x, d) => N(x, d).replace(/\{,\}/g, ",").replace(/^-/, "−");
const abs = Math.abs;
const decide = (pv) => (pv < AL ? "se <strong>rechaza</strong> $H_0$" : "<strong>no se rechaza</strong> $H_0$");
/* Número «humano» para el texto: 4 cifras significativas */
const St = (x, c = 4) => S(x, c).replace(/\{,\}/g, ",");
const S = (x, c = 4) => { if (x === 0) return "0"; const d = Math.max(0, c - 1 - Math.floor(Math.log10(abs(x)))); return N(x, Math.min(d, 8)); };

/* Nombre de término de R → LaTeX */
function termTex(t, nombres) {
  const nv = (v) => (nombres && nombres[v]) || v.replace(/^x(\d)$/, "x_$1");
  if (t === "(Intercept)") return "";
  let m = /^I\((\w+)\^(\d)\)$/.exec(t); if (m) return `${nv(m[1])}^${m[2]}`;
  if (t.includes(":")) return t.split(":").map(nv).join("");
  return nv(t);
}
function ecuacion(r, yTex, nombres, d = 4) {
  return `\\hat{${yTex}}=` + r.nom.map((t, i) => {
    const b = r.est[i], s = i === 0 ? (b < 0 ? "-" : "") : (b < 0 ? "-" : "+");
    return `${s}${S(abs(b), d)}${termTex(t, nombres) ? "\\," + termTex(t, nombres) : ""}`;
  }).join("");
}
const coefNom = (t, nombres) => (t === "(Intercept)" ? "\\beta_0" : `\\beta_{${termTex(t, nombres)}}`);

/* Tabla de datos genérica */
const tDatos = (cols, cab, d = 4) => tabla(cab, cols[0].map((_, i) => cols.map((c) => "$" + (typeof c[i] === "number" ? S(c[i], d).replace(/^-/, "−") : c[i]) + "$")));

/* ── Bloques de solución de regresión ─────────────────────────────────── */
function solT(r, o) {
  const filas = r.nom.map((t, i) => [`$${coefNom(t, o.nombres)}$`, "$" + S(r.est[i]) + "$", "$" + S(r.se[i]) + "$", "$" + N(r.t[i], 3) + "$", "$" + fp(r.p[i]).replace(/^=/, "") + "$", r.p[i] < AL ? "Sí" : "No"]);
  const txt = [String.raw`Para cada coeficiente: $H_0:\beta_i=0$ vs $H_1:\beta_i\neq0$, con $t=\dfrac{b_i-0}{ee(b_i)}\sim t_{${r.gl}}$ ($n-k-1=${r.n}-${r.k}-1=${r.gl}$ gl). Región crítica: $|t|>t_{0{,}975;${r.gl}}=${N(r.tcrit, 4)}$, o bien $p<0{,}05$.`];
  r.nom.forEach((t, i) => {
    if (t === "(Intercept)" && !o.verIntercepto) return;
    const x = o.desc[t];
    txt.push(`$${coefNom(t, o.nombres)}$: $t=${N(r.est[i], 4)}/${N(r.se[i], 4)}=${N(r.t[i], 3)}$, ${pT(r.p[i])} ⇒ ${decide(r.p[i])}: ${r.p[i] < AL ? `${x ? x.sig : "el término es significativo"}` : `${x ? x.nosig : "el término no es significativo"}`}.`);
  });
  return tabla(["Coef.", "Estimación", "ee", "$t$", "Valor-p", "¿Signif. 5 %?"], filas) + p(...txt);
}
/* pt de Student vía R (cacheado) para la prueba con valor hipotético ≠ 0 */
function tcdf(t, gl) { return L.Rn(`pt(${t}, ${gl})`); }

function solAlfa(r, o) {
  return Object.keys(o.alfa).map((t) => {
    const a0 = o.alfa[t], b = r.coef(t), se = r.se[r.idx(t)], tt = (b - a0) / se, pv = 2 * (1 - tcdf(abs(tt), r.gl));
    return p(String.raw`$H_0:${coefNom(t, o.nombres)}=${N(a0, 4)}$ vs $H_1:${coefNom(t, o.nombres)}\neq${N(a0, 4)}$. Ojo: R prueba siempre contra 0, así que este $t$ se calcula a mano: $t=\dfrac{b-${N(a0, 4)}}{ee(b)}=\dfrac{${N(b, 4)}-${N(a0, 4)}}{${N(se, 4)}}=${N(tt, 3)}$.`,
      String.raw`Con ${r.gl} gl: $|t|=${N(abs(tt), 3)}$ ${abs(tt) > r.tcrit ? "&gt;" : "&lt;"} $t_{0{,}975;${r.gl}}=${N(r.tcrit, 4)}$; valor-$p=2P(t_{${r.gl}}>${N(abs(tt), 3)})=${N(pv, 4)}$ ⇒ ${decide(pv)}. ${pv < AL ? o.alfaTxt.si : o.alfaTxt.no}`);
  }).join("");
}

function solF(r, o) {
  const k = r.k;
  return p(String.raw`$H_0:${r.nom.slice(1).map((t) => coefNom(t, o.nombres)).join("=")}=0$ (ningún regresor sirve) vs $H_1$: al menos un $\beta_j\neq0$.`,
    String.raw`$F_0=\dfrac{SCR/k}{SCE/(n-k-1)}=\dfrac{${S(r.scr)}/${k}}{${S(r.sce)}/${r.gl}}=${N(r.F, 2)}$ con $(${k},${r.gl})$ gl; $F_{0{,}95;${k},${r.gl}}=${N(r.Fcrit, 3)}$ y ${pT(r.pF)} ⇒ ${decide(r.pF)}. ${r.pF < AL ? o.fSi : o.fNo}`,
    String.raw`$R^2=\dfrac{SCR}{STC}=\dfrac{${S(r.scr)}}{${S(r.sct)}}=${N(r.r2, 4)}$: el modelo explica el <strong>${Tx(100 * r.r2, r.r2 > 0.99 ? 2 : 1)} %</strong> de la variabilidad de ${o.yTxt}.`,
    String.raw`$R^2_{aj}=1-(1-R^2)\dfrac{n-1}{n-k-1}=1-(1-${N(r.r2, 4)})\dfrac{${r.n - 1}}{${r.gl}}=${N(r.r2a, 4)}$. ${r.r2 - r.r2a > 0.08 ? `Baja bastante respecto del $R^2$: con $n=${r.n}$ y ${k} regresores, parte del $R^2$ se debe solo a haber agregado variables.` : `Está cerca del $R^2$: los ${k} regresores no inflan artificialmente el ajuste.`} (El $R^2$ siempre sube al agregar variables; el ajustado penaliza por cada parámetro y sirve para comparar modelos con distinto número de términos.)`);
}

function solSupuestos(r, o) {
  const t = [];
  t.push(String.raw`<strong>Normalidad</strong> (Shapiro–Wilk sobre los residuos, $H_0$: los residuos son normales): ${pT(r.sw)} ⇒ ${r.sw < AL ? "se rechaza: los residuos no parecen normales (revisar el Q-Q; con $n$ pequeño la prueba es poco confiable)" : "no se rechaza: no hay evidencia contra la normalidad (en el Q-Q los puntos deberían seguir la recta)"}.`);
  t.push(String.raw`<strong>Linealidad, homocedasticidad e independencia</strong> se miran en los gráficos de <code>plot(modelo)</code>: residuos contra ajustados sin patrón (sin curva ⇒ linealidad; banda de ancho parejo, sin embudo ⇒ varianza constante) y residuos contra el orden de las corridas sin rachas ⇒ independencia.`);
  if (r.vif) {
    const mx = Math.max(...r.vif);
    t.push(String.raw`<strong>Multicolinealidad</strong>: VIF $=${r.vif.map((v, i) => `${N(v, 2)}\\ (${termTex(r.vifNom[i], o.nombres)})`).join(";\\ ")}$. ${mx > 10 ? `Hay VIF mayores que 10: <strong>multicolinealidad severa</strong>. Los regresores comparten casi la misma información, los errores estándar se inflan y por eso pueden salir coeficientes no significativos (o con signo raro) aunque el $F$ global sea enorme.` : mx > 5 ? "Hay VIF entre 5 y 10: multicolinealidad moderada, que infla algo los errores estándar; conviene tenerla presente al interpretar los $t$." : "Todos bajo 5: no hay problema de multicolinealidad."}`);
  } else if (o.polinomio) t.push(String.raw`(En un polinomio $x$ y $x^2$ están muy correlacionados por construcción, así que el VIF sale alto sin que sea un problema de diseño; no se usa para decidir.)`);
  const hc = r.hcorte;
  const altos = r.hat.map((h, i) => [h, i]).filter(([h]) => h > hc).map(([, i]) => i + 1);
  t.push(String.raw`<strong>Apalancamiento</strong>: corte $2(k+1)/n=2\cdot${r.k + 1}/${r.n}=${N(hc, 3)}$; el mayor es $h_{${r.iHMax + 1}}=${N(r.hMax, 3)}$ ⇒ ${altos.length ? `observación${altos.length > 1 ? "es" : ""} ${altos.join(", ")} con alto apalancamiento (valores de $x$ alejados del resto)` : "ninguna supera el corte"}.`);
  const cookA = r.cook.map((c, i) => [c, i]).filter(([c]) => c > 1).map(([, i]) => i + 1);
  t.push(String.raw`<strong>Distancia de Cook</strong> (influyente si $D_i>1$): la mayor es $D_{${r.iCookMax + 1}}=${N(r.cookMax, 3)}$ ⇒ ${cookA.length ? `la${cookA.length > 1 ? "s" : ""} observación${cookA.length > 1 ? "es" : ""} ${cookA.join(", ")} ${cookA.length > 1 ? "son influyentes" : "es influyente"}: si se quitara, los coeficientes cambiarían bastante. No se elimina automáticamente; primero se revisa si es un error de registro.` : "ningún punto es influyente."}`);
  return p(...t);
}

function solPred(r, o) {
  const pc = r.pc, pp = r.pp;
  const sust = r.nom.map((t, i) => (i === 0 ? N(r.est[0], 4) : `${r.est[i] < 0 ? "-" : "+"}${N(abs(r.est[i]), 6)}\\cdot${o.sust[t]}`)).join("");
  return p(String.raw`$\hat y=${sust}=${N(pc[0], 3)}$ ${o.yUni}.`,
    String.raw`Intervalo de confianza del 95 % para la <strong>respuesta media</strong>: $[${N(pc[1], 3)};\ ${N(pc[2], 3)}]$. Intervalo de <strong>predicción</strong> para un caso individual: $[${N(pp[1], 3)};\ ${N(pp[2], 3)}]$ (más ancho, porque suma la variabilidad propia de una observación nueva). En R: <code>predict(modelo, nuevo, interval = "confidence")</code> y <code>interval = "prediction"</code>.`,
    o.predNota || "");
}

/* ── Registro común ───────────────────────────────────────────────────── */
const gram = (h) => h.replace(/\bde el\b/g, "del").replace(/\ba el\b/g, "al");
function reg(clave, o, q) {
  q.enunciado = gram(q.enunciado);
  q.partes.forEach((x) => { x.solucion = gram(x.solucion); });
  if (q.codigoR && !q.salidaR) { q.salidaR = L.Rtxt(q.codigoR).replace(/\s+$/, ""); q.salidaDe = q.codigoR; }
  const libro = o.libro === "G" ? "LG" : "WAL";
  q.origen = o.mod ? "variacion" : "curso";
  if (o.mod) q.base = [{ id: libro, loc: o.loc }];
  q.fuente = [{ id: libro, loc: o.loc }].concat(o.curso || []);
  agregar(clave, q);
}
const etiqueta = (o) => `${o.mod ? (o.libro === "G" ? MOD_G : MOD_W) : (o.libro === "G" ? ORIG_G : ORIG_W)} · ${o.ej}`;
const aviso = (o) => {
  const libro = o.libro === "G" ? "del libro guía (Gutiérrez y de la Vara, 2.ª ed.)" : "del libro de Walpole (9.ª ed.)";
  return o.mod ? `<p><strong>${o.libro === "G" ? MOD_G : MOD_W}</strong> — variante del ${o.ej} ${libro}. Cambio respecto del original: ${o.mod}.</p>`
    : `<p><strong>${o.libro === "G" ? ORIG_G : ORIG_W}</strong> — ${o.ej} ${libro}, con los datos del libro. Además de lo que pide el libro se agregan las preguntas del Instructivo P4.</p>`;
};
const vCoef = (r, cod, i, d = 4) => vr(`coef ${r.nom[i]}`, `{${cod}; coef(m)[${i + 1}]}`, r.est[i], d);
const rmod = (o) => `d <- ${C.rdatos(o.datos)}; m <- lm(${o.formula}, data = d)`;

/* ═════════════════ REGRESIÓN (Walpole) → M26 ═══════════════════════════ */
/* o: { ej, loc, mod, datos, formula, nombres, desc{término:{sig,nosig,interp}}, yTxt, yUni, contexto,
        tablaCab, cols, incLibro[], nuevo, sust, alfa, alfaTxt, polinomio{col, x0}, extra("lof"|"scr"), concepto, dif } */
function ejReg(o) {
  const r = C.ajustar({ datos: o.datos, formula: o.formula, vif: !o.polinomio && !o.sinVif, nuevo: o.nuevo, falta: o.extra === "lof" ? [o.polinomio.col] : null });
  const yT = o.yTex || "y";
  const partes = [];
  const extraR = ["shapiro.test(residuals(modelo))"];
  if (!o.polinomio && !o.sinVif) extraR.push("vif(modelo)");
  extraR.push("round(hatvalues(modelo), 3)", "round(cooks.distance(modelo), 3)");
  if (o.nuevo) extraR.push(`nuevo <- data.frame(${Object.keys(o.nuevo).map((k) => `${k} = ${o.nuevo[k]}`).join(", ")})`, `predict(modelo, nuevo, interval = "confidence")`, `predict(modelo, nuevo, interval = "prediction")`);
  if (o.extra === "lof") extraR.push(`completo <- lm(y ~ factor(${o.polinomio.col}), data = datos)   # una media por nivel: error puro`, "anova(modelo, completo)");
  if (o.extra === "scr") extraR.push("anova(modelo)");
  const cod = C.codigoR({ datos: o.datos, formula: o.formula, vif: !o.polinomio && !o.sinVif }, extraR);

  /* a) ecuación */
  partes.push({ titulo: "a) Modelo ajustado", puntos: 1, solucion: p(String.raw`Por mínimos cuadrados ($\mathbf b=(X'X)^{-1}X'\mathbf y$, lo que hace <code>lm</code>): $$${ecuacion(r, yT, o.nombres)}$$`,
    `${o.notaLibro || ""}`) });
  /* b) interpretación */
  const it = [];
  r.nom.forEach((t) => { const x = o.desc[t]; if (x && x.interp) it.push(x.interp(r)); });
  if (o.polinomio) {
    const c = o.polinomio, b1 = r.coef(c.col), b2 = r.coef(`I(${c.col}^2)`), b3 = r.nom.includes(`I(${c.col}^3)`) ? r.coef(`I(${c.col}^3)`) : 0;
    const der = (x) => b1 + 2 * b2 * x + 3 * b3 * x * x;
    it.push(String.raw`En un polinomio el efecto de $${c.tex}$ <strong>no es un solo número</strong>: la pendiente cambia con $${c.tex}$. Derivando: $\dfrac{\partial\hat ${yT}}{\partial ${c.tex}}=${N(b1, 6)}${b2 < 0 ? "-" : "+"}2(${N(abs(b2), 8)})${c.tex}${b3 ? `${b3 < 0 ? "-" : "+"}3(${N(abs(b3), 6)})${c.tex}^2` : ""}$.`);
    c.en.forEach((x0) => it.push(String.raw`En $${c.tex}=${N(x0, 4)}$: $\dfrac{\partial\hat ${yT}}{\partial ${c.tex}}=${N(der(x0), 4)}$ ⇒ ahí, un aumento de una unidad en ${c.nom} ${der(x0) >= 0 ? "aumenta" : "disminuye"} ${o.yTxt} en unas ${Tx(abs(der(x0)), 3)} ${o.yUni}.`));
    if (!b3) {
      const xv = -b1 / (2 * b2), dentro = xv >= Math.min(...o.datos[c.col]) && xv <= Math.max(...o.datos[c.col]);
      it.push(String.raw`El signo de $b_2=${N(b2, 8)}$ dice la forma: ${b2 < 0 ? "negativo ⇒ parábola cóncava (rendimientos decrecientes, con un máximo)" : "positivo ⇒ parábola convexa (con un mínimo)"}; igualando la derivada a 0, el vértice está en $${c.tex}^*=-\dfrac{b_1}{2b_2}=${N(xv, 3)}$, ${dentro ? "dentro del rango observado" : "fuera del rango observado (no se extrapola)"}.`);
    }
  }
  partes.push({ titulo: "b) Interpretación de los coeficientes" + (o.polinomio ? " y de ∂y/∂x" : ""), puntos: 1, solucion: p(...it) });
  /* c) pruebas t (+ valor hipotético) */
  partes.push({ titulo: "c) Pruebas t sobre los coeficientes", puntos: 1, solucion: solT(r, o) + (o.alfa ? solAlfa(r, o) : "") });
  /* d) F y R² */
  partes.push({ titulo: "d) Prueba F global, R² y R² ajustado", puntos: 1, solucion: solF(r, o) });
  /* e) supuestos y problemas */
  partes.push({ titulo: "e) Supuestos, multicolinealidad e influyentes", puntos: 1, solucion: solSupuestos(r, o) });
  /* f) lo propio del libro */
  if (o.extra === "lof") {
    const f = r.lof;
    partes.push({ titulo: "f) Falta de ajuste", puntos: 1, solucion: p(String.raw`Como hay réplicas en cada ${o.polinomio.nom}, el error se separa en <strong>error puro</strong> (variación entre réplicas del mismo nivel) y <strong>falta de ajuste</strong> (lo que el modelo no captura de las medias).`,
      String.raw`$SC_{puro}=\sum(y_{ij}-\bar y_i)^2=${S(f.scPuro)}$ con $n-m=${r.n}-${f.ncel}=${f.glPuro}$ gl; $SC_{FA}=SCE-SC_{puro}=${S(r.sce)}-${S(f.scPuro)}=${S(f.scLof)}$ con $${r.gl}-${f.glPuro}=${f.glLof}$ gl.`,
      String.raw`$H_0$: el modelo ${o.polinomio.grado === 2 ? "cuadrático" : "propuesto"} es adecuado. $F_{FA}=\dfrac{${S(f.scLof)}/${f.glLof}}{${S(f.scPuro)}/${f.glPuro}}=${N(f.F, 3)}$, ${pT(f.p)} ⇒ ${decide(f.p)}: ${f.p < AL ? "hay falta de ajuste, el modelo no describe bien la forma de la relación (probar otro término o transformación)." : "no hay evidencia de falta de ajuste; el modelo describe bien la forma de la relación."}`) });
  } else if (o.extra === "scr") {
    const a = L.Rtxt(`${rmod(o)}; cat(anova(m)[[2]], sep = " ")`).trim().split(/\s+/).map(Number);
    partes.push({ titulo: "f) SCR en componentes de 1 gl", puntos: 1, solucion: p(String.raw`Con el diseño codificado ortogonal, <code>anova(modelo)</code> reparte la $SCR=${S(r.scr)}$ en una parte por variable (cada una con 1 gl): $R(\beta_1)=${S(a[0])}$, $R(\beta_2)=${S(a[1])}$, $R(\beta_3)=${S(a[2])}$, que suman $${S(a[0] + a[1] + a[2])}=SCR$. Como las columnas son ortogonales, el orden de entrada no cambia estas sumas.`,
      String.raw`$CME=${S(r.sce)}/${r.gl}=${S(r.sce / r.gl)}$ y cada $F=R(\beta_j)/CME$: $${a.slice(0, 3).map((s, j) => `F_${j + 1}=${N(s / (r.sce / r.gl), 2)}`).join(",\\ ")}$, con $F_{0{,}95;1,${r.gl}}=${N(L.Rn(`qf(0.95, 1, ${r.gl})`), 3)}$. Equivale a las pruebas $t$ (aquí $F=t^2$): ${o.scrConc}`) });
  } else if (o.nuevo) {
    partes.push({ titulo: "f) Predicción", puntos: 1, solucion: solPred(r, o) });
  } else {
    partes[partes.length - 1].puntos = 2;
  }
  const inc = (o.incLibro || []).concat(["Interprete el intercepto y cada coeficiente en el contexto del problema" + (o.polinomio ? ", incluyendo $\\partial y/\\partial x$" : "") + ".",
    "Para cada coeficiente plantee $H_0:\\beta_i=0$, calcule el estadístico $t$ y concluya con el valor-p." + (o.alfa ? " " + o.alfaInc : ""),
    "¿Es significativo el modelo? Use la prueba $F$ global. Interprete $R^2$ y $R^2$ ajustado.",
    "Verifique los supuestos (normalidad con Shapiro–Wilk; linealidad, homocedasticidad e independencia con los gráficos) y comente " + (o.polinomio ? "" : "la multicolinealidad (VIF), ") + "el apalancamiento y la distancia de Cook."]);
  reg("m26", o, {
    concepto: o.concepto || "m26-c05", dificultad: o.dif || 2,
    titulo: `${etiqueta(o)} · ${o.titulo}${o.sufijo ? " (" + o.sufijo + ")" : ""}`,
    enunciado: aviso(o) + p(o.contexto) + tDatos(o.cols.map((c) => o.datos[c]), o.tablaCab) + incisos(inc) + p("Use $\\alpha=0{,}05$. Abajo está el código de R y su salida, como en la prueba."),
    codigoR: cod, partes,
    verifica: [vCoef(r, rmod(o), 1), vr("R2", `{${rmod(o)}; summary(m)$r.squared}`, r.r2, 4), vr("F", `{${rmod(o)}; summary(m)$fstatistic[1]}`, r.F, 2)]
      .concat(o.nuevo ? [vr("pred", `{${rmod(o)}; predict(m, data.frame(${Object.keys(o.nuevo).map((k) => `${k} = ${o.nuevo[k]}`).join(", ")}))}`, r.pc[0], 3)] : [])
  });
  return r;
}

/* Variables y textos de cada ejercicio de Walpole */
const cambia = (v, cambios) => v.map((x, i) => (cambios[i + 1] != null ? cambios[i + 1] : x));
const sinFila = (d, fila) => { const o = {}; Object.keys(d).forEach((k) => { o[k] = d[k].filter((_, i) => i !== fila - 1); }); return o; };
function descLin(vars, nomY, uniY) {
  const d = {};
  vars.forEach(([col, nom, uni]) => {
    d[col] = { sig: `${nom} influye significativamente en ${nomY}`, nosig: `no hay evidencia de que ${nom} influya en ${nomY} una vez consideradas las demás variables`,
      interp: (r) => { const b = r.coef(col); return `$b_{${col.replace(/^x(\d)$/, "x_$1")}}=${S(b)}$: por cada ${uni} adicional de ${nom}, ${nomY} ${b >= 0 ? "aumenta" : "disminuye"} en promedio ${St(abs(b))} ${uniY}, <strong>manteniendo constantes las demás variables</strong>.`; } };
  });
  return d;
}
const icp = (txt) => ({ "(Intercept)": { sig: "", nosig: "", interp: (r) => `$b_0=${S(r.est[0])}$: ${txt}` } });

function m26() {
  const CUR = [{ id: "C8.1", loc: "slides 15–34" }, { id: "AY10-P", loc: "P2–P4" }, { id: "INST-P4" }];
  /* ── 12.1 horno ── */
  const H = (mod, datos, extra) => ejReg(Object.assign({ libro: "W", ej: "Ej. 12.1", loc: "ej. 12.1 (p. 450)", mod, curso: CUR, titulo: "Horno: tiempo de cocción", datos, formula: "y ~ x1 + x2",
    contexto: "Se hicieron ensayos con un horno para predecir el tiempo de cocción $y$ (min) a partir del ancho del horno $x_1$ y de la temperatura $x_2$. Estime $\\mu_{Y|x_1,x_2}=\\beta_0+\\beta_1x_1+\\beta_2x_2$.",
    cols: ["y", "x1", "x2"], tablaCab: ["$y$", "$x_1$", "$x_2$"], yTxt: "el tiempo de cocción", yUni: "min",
    desc: Object.assign(icp("tiempo de cocción esperado con ancho 0 y temperatura 0; no tiene sentido práctico (ningún horno tiene ancho 0) y además no es significativo."), descLin([["x1", "el ancho del horno", "unidad"], ["x2", "la temperatura", "unidad"]], "el tiempo de cocción", "min")),
    incLibro: ["Estime la ecuación de regresión lineal múltiple $\\hat y=b_0+b_1x_1+b_2x_2$."],
    alfa: { x2: 2 }, alfaInc: "Además pruebe $H_0:\\beta_2=2$ (¿cada unidad de temperatura agrega exactamente 2 minutos?).",
    alfaTxt: { si: "El efecto de la temperatura es distinto de 2 min por unidad.", no: "Los datos son compatibles con que cada unidad de temperatura agregue 2 minutos de cocción." },
    fSi: "El modelo sirve: al menos una de las dos variables explica el tiempo de cocción.", fNo: "El modelo no explica el tiempo de cocción.",
    notaLibro: "Coincide con la respuesta del libro: $\\hat y=0{,}5800+2{,}7122x_1+2{,}0497x_2$.", concepto: "m26-c05", dif: 2 }, extra || {}));
  H(null, W.e12_1);
  H("la corrida 9 dio 96,20 min (en vez de 100,44) y la 3 dio 19,40 (en vez de 18,75)", { y: cambia(W.e12_1.y, { 9: 96.20, 3: 19.40 }), x1: W.e12_1.x1, x2: W.e12_1.x2 }, { notaLibro: "", sufijo: "datos cambiados" });
  H("se eliminó la corrida 10 (la del horno más ancho), n = 9", sinFila(W.e12_1, 10), { notaLibro: "", sufijo: "sin la corrida 10" });

  /* ── 12.2 espectroscopía ── */
  const E = (mod, datos, extra) => ejReg(Object.assign({ libro: "W", ej: "Ej. 12.2", loc: "ej. 12.2 (p. 450)", mod, curso: CUR, titulo: "Densidad óptica de un lubricante", datos, formula: "y ~ x1 + x2",
    contexto: "En <strong>Applied Spectroscopy</strong> se estudió la densidad óptica $y$ de un lubricante en función de la frecuencia de banda $x_1$ y del espesor de película $x_2$ (mm).",
    cols: ["y", "x1", "x2"], tablaCab: ["$y$", "$x_1$", "$x_2$"], yTxt: "la densidad óptica", yUni: "unidades",
    desc: Object.assign(icp("densidad óptica esperada con frecuencia 0 y espesor 0: fuera del rango de los datos, no se interpreta (de hecho es negativa, lo que es imposible)."), descLin([["x1", "la frecuencia de banda", "unidad"], ["x2", "el espesor de película", "mm"]], "la densidad óptica", "unidades")),
    incLibro: ["Estime la ecuación de regresión lineal múltiple $\\hat y=b_0+b_1x_1+b_2x_2$."],
    fSi: "El modelo es útil para explicar la densidad óptica.", fNo: "El modelo no explica la densidad óptica.", concepto: "m26-c05", dif: 2 }, extra || {}));
  E(null, W.e12_2);
  E("la medición a 1235 y 1,10 mm dio 2,648 y la de 740 y 0,31 mm dio 0,045", { y: cambia(W.e12_2.y, { 10: 2.648, 3: 0.045 }), x1: W.e12_2.x1, x2: W.e12_2.x2 }, { sufijo: "datos cambiados" });
  E("solo las frecuencias 805, 980 y 1235 (sin las 3 mediciones a 740)", { y: W.e12_2.y.slice(3), x1: W.e12_2.x1.slice(3), x2: W.e12_2.x2.slice(3) }, { sufijo: "9 mediciones" });

  /* ── 12.3 química ── */
  const Q = (mod, datos, nuevo, extra) => ejReg(Object.assign({ libro: "W", ej: "Ej. 12.3", loc: "ej. 12.3 (p. 450)", mod, curso: CUR, titulo: "Calificación en química", datos, formula: "y ~ x1 + x2",
    contexto: "Para 12 estudiantes se registró la calificación en química $y$, la calificación en un examen de inteligencia $x_1$ y el número de clases perdidas $x_2$.",
    cols: ["y", "x1", "x2"], tablaCab: ["Química $y$", "Examen $x_1$", "Clases perdidas $x_2$"], yTxt: "la calificación en química", yUni: "puntos",
    desc: Object.assign(icp("calificación esperada de un estudiante con 0 en el examen y 0 clases perdidas; nadie sacó 0 en el examen (rango 50–70), así que no tiene interpretación práctica."), descLin([["x1", "la calificación en el examen", "punto"], ["x2", "las clases perdidas", "clase"]], "la calificación en química", "puntos")),
    incLibro: ["Ajuste $\\hat y=b_0+b_1x_1+b_2x_2$.", `Estime la calificación de química de un estudiante que obtuvo ${nuevo.x1} en el examen y perdió ${nuevo.x2} clases.`],
    nuevo, sust: { x1: String(nuevo.x1), x2: String(nuevo.x2) },
    fSi: "El modelo sirve para explicar la calificación en química.", fNo: "El modelo no explica la calificación.",
    notaLibro: "Coincide con el libro: $\\hat y=27{,}547+0{,}922x_1+0{,}284x_2$. Ojo: el signo positivo de las clases perdidas es contraintuitivo, pero ese coeficiente no es significativo (ver c).", concepto: "m26-c05", dif: 2 }, extra || {}));
  Q(null, W.e12_3, { x1: 60, x2: 4 }, { predNota: "El libro (apéndice) da $\\hat y=84$; $x_1=60$ y $x_2=4$ están dentro del rango de los datos, así que la predicción es confiable." });
  Q("el estudiante 8 sacó 93 en química (en vez de 98) y se pide predecir para examen 68 y 2 clases perdidas", { y: cambia(W.e12_3.y, { 8: 93 }), x1: W.e12_3.x1, x2: W.e12_3.x2 }, { x1: 68, x2: 2 }, { notaLibro: "", sufijo: "otra predicción" });
  Q("se agregó un estudiante 13 con examen 60, 6 clases perdidas y 80 en química", { y: W.e12_3.y.concat([80]), x1: W.e12_3.x1.concat([60]), x2: W.e12_3.x2.concat([6]) }, { x1: 60, x2: 4 }, { notaLibro: "", sufijo: "13 estudiantes" });

  /* ── 12.4 peso de animales ── */
  const P = (mod, datos, nuevo, extra) => ejReg(Object.assign({ libro: "W", ej: "Ej. 12.4", loc: "ej. 12.4 (p. 450)", mod, curso: CUR, titulo: "Peso final de un animal", datos, formula: "y ~ x1 + x2",
    contexto: "Se quiere predecir el peso final $y$ (kg) de un animal a partir de su peso inicial $x_1$ (kg) y de la cantidad de alimento consumido $x_2$ (kg).",
    cols: ["y", "x1", "x2"], tablaCab: ["Peso final $y$", "Peso inicial $x_1$", "Alimento $x_2$"], yTxt: "el peso final", yUni: "kg",
    desc: Object.assign(icp("peso final esperado de un animal que parte pesando 0 kg y no come: no tiene sentido físico (y es negativo); solo ajusta la altura del plano."), descLin([["x1", "el peso inicial", "kg"], ["x2", "el alimento consumido", "kg"]], "el peso final", "kg")),
    incLibro: ["Ajuste $\\mu_{Y|x_1,x_2}=\\beta_0+\\beta_1x_1+\\beta_2x_2$.", `Prediga el peso final de un animal que comienza pesando ${nuevo.x1} kg y consume ${nuevo.x2} kg de alimento.`],
    nuevo, sust: { x1: String(nuevo.x1), x2: String(nuevo.x2) },
    alfa: { x1: 1 }, alfaInc: "Además pruebe $H_0:\\beta_1=1$ (¿cada kg inicial se traduce en exactamente un kg final?).",
    alfaTxt: { si: "Cada kg de peso inicial no se traduce en exactamente un kg final.", no: "Es compatible con que cada kg de peso inicial se traduzca en un kg de peso final (con el alimento fijo)." },
    fSi: "El modelo sirve para predecir el peso final.", fNo: "El modelo no explica el peso final.", concepto: "m26-c05", dif: 2 }, extra || {}));
  P(null, W.e12_4, { x1: 35, x2: 250 });
  P("el animal 7 terminó pesando 62 kg (en vez de 50) y se predice para 40 kg iniciales y 280 kg de alimento", { y: cambia(W.e12_4.y, { 7: 62 }), x1: W.e12_4.x1, x2: W.e12_4.x2 }, { x1: 40, x2: 280 }, { sufijo: "otra predicción" });
  P("se eliminó el animal 6 (n = 9)", sinFila(W.e12_4, 6), { x1: 35, x2: 250 }, { sufijo: "9 animales" });

  /* ── 12.5 energía ── */
  const EN = (mod, datos, formula, cols, nuevo, extra) => ejReg(Object.assign({ libro: "W", ej: "Ej. 12.5", loc: "ej. 12.5 (pp. 450–451)", mod, curso: CUR, titulo: "Consumo de energía de una planta química", datos, formula,
    contexto: "El consumo mensual de energía eléctrica $y$ de una planta química se relaciona con la temperatura ambiente promedio $x_1$ (°F), los días del mes $x_2$, la pureza promedio del producto $x_3$ (%) y las toneladas fabricadas $x_4$.",
    cols, tablaCab: cols.map((c) => "$" + c.replace(/^x(\d)$/, "x_$1") + "$"), yTxt: "el consumo de energía", yUni: "unidades de energía",
    desc: Object.assign(icp("consumo esperado con temperatura 0 °F, 0 días, pureza 0 % y 0 toneladas: completamente fuera del rango, no se interpreta."), descLin([["x1", "la temperatura", "°F"], ["x2", "los días del mes", "día"], ["x3", "la pureza", "punto porcentual"], ["x4", "la producción", "tonelada"]], "el consumo", "unidades")),
    incLibro: ["Ajuste un modelo de regresión lineal múltiple.", `Prediga el consumo para un mes con ${Object.keys(nuevo).map((k) => `$${k.replace(/^x(\d)$/, "x_$1")}=${nuevo[k]}$`).join(", ")}.`],
    nuevo, sust: Object.fromEntries(Object.keys(nuevo).map((k) => [k, String(nuevo[k])])),
    fSi: "El modelo en su conjunto sirve, aunque varias variables no sean significativas por separado (con $n=12$ y 4 regresores hay poca información para separar los efectos).", fNo: "El modelo no explica el consumo.", concepto: "m26-c06", dif: 3 }, extra || {}));
  EN(null, W.e12_5, "y ~ x1 + x2 + x3 + x4", ["y", "x1", "x2", "x3", "x4"], { x1: 75, x2: 24, x3: 90, x4: 98 }, { notaLibro: "Coincide con el libro: $\\hat y=-102{,}7132+0{,}6054x_1+8{,}9236x_2+1{,}4374x_3+0{,}0136x_4$.", predNota: "El libro da $\\hat y=287{,}6$." });
  EN("el consumo de los meses 3 y 6 fue 280 y 306 (en vez de 290 y 316)", { y: cambia(W.e12_5.y, { 3: 280, 6: 306 }), x1: W.e12_5.x1, x2: W.e12_5.x2, x3: W.e12_5.x3, x4: W.e12_5.x4 }, "y ~ x1 + x2 + x3 + x4", ["y", "x1", "x2", "x3", "x4"], { x1: 75, x2: 24, x3: 90, x4: 98 }, { sufijo: "datos cambiados" });
  EN("se ajusta el modelo sin las toneladas fabricadas ($x_4$, la de mayor valor-p en el original)", { y: W.e12_5.y, x1: W.e12_5.x1, x2: W.e12_5.x2, x3: W.e12_5.x3 }, "y ~ x1 + x2 + x3", ["y", "x1", "x2", "x3"], { x1: 75, x2: 24, x3: 90 }, { sufijo: "sin x4" });

  /* ── 12.6 frenado (polinomio) ── */
  const FR = (mod, datos, nuevo, extra) => ejReg(Object.assign({ libro: "W", ej: "Ej. 12.6", loc: "ej. 12.6 (p. 451)", mod, curso: CUR, titulo: "Distancia de frenado: modelo cuadrático", datos, formula: "d ~ v + I(v^2)", yTex: "d",
    nombres: { v: "v" }, contexto: "Para un modelo de automóvil se midió la distancia de frenado $d$ (m) a distintas velocidades $v$ (km/h).",
    cols: ["v", "d"], tablaCab: ["Velocidad $v$ (km/h)", "Distancia $d$ (m)"], yTxt: "la distancia de frenado", yUni: "m",
    polinomio: { col: "v", tex: "v", nom: "la velocidad", grado: 2, en: [50, 100] },
    desc: { "(Intercept)": { interp: (r) => `$b_0=${S(r.est[0])}$: distancia predicha a 0 km/h; está fuera del rango (35–110 km/h) y físicamente debería ser 0, así que no se interpreta.` },
      v: { sig: "el término lineal es significativo", nosig: "el término lineal no es significativo" }, "I(v^2)": { sig: "<strong>hay curvatura</strong>: la distancia crece más que proporcionalmente con la velocidad", nosig: "no hay evidencia de curvatura" } },
    incLibro: ["Ajuste $\\mu_{D|v}=\\beta_0+\\beta_1v+\\beta_2v^2$.", `Estime la distancia de frenado a ${nuevo.v} km/h.`],
    nuevo, sust: { v: String(nuevo.v), "I(v^2)": `${nuevo.v}^2` },
    fSi: "El modelo cuadrático explica la distancia de frenado.", fNo: "El modelo no explica la distancia de frenado.", concepto: "m26-c07", dif: 2 }, extra || {}));
  FR(null, W.e12_6, { v: 70 });
  FR("las distancias medidas fueron 16, 27, 42, 63, 90 y 121 m y se pide estimar a 85 km/h", { v: W.e12_6.v, d: [16, 27, 42, 63, 90, 121] }, { v: 85 }, { sufijo: "otras distancias" });
  FR("se agregó una prueba a 125 km/h con 154 m de frenado", { v: W.e12_6.v.concat([125]), d: W.e12_6.d.concat([154]) }, { v: 70 }, { sufijo: "7 velocidades" });

  /* ── 12.7 flujo sanguíneo (polinomio) ── */
  const FS = (mod, datos, extra) => ejReg(Object.assign({ libro: "W", ej: "Ej. 12.7", loc: "ej. 12.7 (p. 451)", mod, curso: CUR, titulo: "Flujo sanguíneo cerebral: modelo cuadrático", datos, formula: "y ~ x + I(x^2)",
    nombres: { x: "x" }, contexto: "En 15 pacientes se midió el flujo sanguíneo cerebral $y$ y la tensión arterial del oxígeno $x$ (mm de Hg). Estime $\\mu_{Y|x}=\\beta_0+\\beta_1x+\\beta_2x^2$.",
    cols: ["y", "x"], tablaCab: ["Flujo $y$", "Tensión $x$"], yTxt: "el flujo sanguíneo", yUni: "unidades de flujo",
    polinomio: { col: "x", tex: "x", nom: "la tensión del oxígeno", grado: 2, en: [400, 550] },
    desc: { "(Intercept)": { interp: (r) => `$b_0=${S(r.est[0])}$: flujo predicho con tensión 0, muy lejos del rango (320–600 mm Hg); no se interpreta.` },
      x: { sig: "el término lineal es significativo", nosig: "el término lineal no es significativo" }, "I(x^2)": { sig: "<strong>hay curvatura</strong>: la relación no es una recta", nosig: "no hay evidencia de curvatura" } },
    incLibro: ["Estime la ecuación de regresión cuadrática."],
    fSi: "El modelo cuadrático explica parte del flujo sanguíneo, aunque con un $R^2$ modesto.", fNo: "El modelo no explica el flujo sanguíneo.",
    notaLibro: "Coincide con el libro: $\\hat y=141{,}6118-0{,}2819x+0{,}0003x^2$.", concepto: "m26-c07", dif: 2 }, extra || {}));
  FS(null, W.e12_7);
  FS("el paciente 14 tuvo un flujo de 82,60 (en vez de 86,60)", { y: cambia(W.e12_7.y, { 14: 82.60 }), x: W.e12_7.x }, { notaLibro: "", sufijo: "paciente 14 corregido" });
  FS("se eliminaron los 3 últimos pacientes (n = 12)", { y: W.e12_7.y.slice(0, 12), x: W.e12_7.x.slice(0, 12) }, { notaLibro: "", sufijo: "12 pacientes" });

  /* ── 12.8 resistencia y concentración (falta de ajuste) ── */
  const RC = (mod, datos, extra) => ejReg(Object.assign({ libro: "W", ej: "Ej. 12.8", loc: "ej. 12.8 (p. 451)", mod, curso: CUR.concat([{ id: "C8.2", loc: "slide 15" }]), titulo: "Resistencia de una aleación: cuadrático y falta de ajuste", datos, formula: "y ~ x + I(x^2)",
    nombres: { x: "x" }, contexto: "Datos codificados de la resistencia a la compresión $y$ de una aleación para distintas concentraciones $x$ de un aditivo (3 réplicas por concentración).",
    cols: ["x", "y"], tablaCab: ["Concentración $x$", "Resistencia $y$"], yTxt: "la resistencia a la compresión", yUni: "unidades",
    polinomio: { col: "x", tex: "x", nom: "la concentración", grado: 2, en: [15, 25] }, extra: "lof",
    desc: { "(Intercept)": { interp: (r) => `$b_0=${S(r.est[0])}$: resistencia predicha sin aditivo; $x=0$ está fuera del rango (10–30), no se interpreta.` },
      x: { sig: "el término lineal es significativo", nosig: "el término lineal no es significativo" }, "I(x^2)": { sig: "<strong>hay curvatura</strong>: la resistencia sube y luego baja con la concentración", nosig: "no hay evidencia de curvatura" } },
    incLibro: ["Estime la ecuación de regresión cuadrática.", "Pruebe la falta de ajuste del modelo."],
    fSi: "El modelo explica la resistencia.", fNo: "El modelo no explica la resistencia.", concepto: "m26-c07", dif: 3 }, extra || {}));
  RC(null, W.e12_8);
  RC("a concentración 30 la resistencia fue 28,1; 29,5 y 30,2", { y: W.e12_8.y.slice(0, 12).concat([28.1, 29.5, 30.2]), x: W.e12_8.x }, { sufijo: "otra respuesta a 30" });
  RC("solo 2 réplicas por concentración (se eliminó la tercera)", { y: W.e12_8.y.filter((_, i) => i % 3 !== 2), x: W.e12_8.x.filter((_, i) => i % 3 !== 2) }, { sufijo: "2 réplicas" });

  /* ── 12.9 producto vs temperatura (ejemplo 11.8) ── */
  const PT = (mod, datos, nuevo, extra) => ejReg(Object.assign({ libro: "W", ej: "Ej. 12.9", loc: "ej. 12.9 (p. 451) con datos del ejemplo 11.8 (p. 421)", mod, curso: CUR, titulo: "Producto de una reacción: cuadrático", datos, formula: "y ~ x + I(x^2)",
    nombres: { x: "x" }, contexto: "Producto $y$ (%) de una reacción química a distintas temperaturas $x$ (°C), 3 observaciones por temperatura (datos del ejemplo 11.8).",
    cols: ["x", "y"], tablaCab: ["Temperatura $x$ (°C)", "Producto $y$ (%)"], yTxt: "el producto de la reacción", yUni: "puntos porcentuales",
    polinomio: { col: "x", tex: "x", nom: "la temperatura", grado: 2, en: [200, 275] }, extra: "lof",
    desc: { "(Intercept)": { interp: (r) => `$b_0=${S(r.est[0])}$: producto predicho a 0 °C; fuera del rango (150–${Math.max(...datos.x)} °C), no se interpreta.` },
      x: { sig: "el término lineal es significativo", nosig: "el término lineal no es significativo" }, "I(x^2)": { sig: "<strong>hay curvatura</strong>", nosig: "<strong>no hay evidencia de curvatura</strong>: el término cuadrático sobra y bastaría la recta (como concluye el ejemplo 11.8)" } },
    incLibro: ["Ajuste $\\mu_{Y|x}=\\beta_0+\\beta_1x+\\beta_2x^2$.", `Estime el producto para una temperatura de ${nuevo.x} °C.`],
    nuevo, sust: { x: String(nuevo.x), "I(x^2)": `${nuevo.x}^2` },
    fSi: "El modelo explica el producto de la reacción.", fNo: "El modelo no explica el producto.", concepto: "m26-c07", dif: 2 }, extra || {}));
  const r129 = PT(null, W.e12_9, { x: 225 }, { notaLibro: "Coincide con el libro: $\\hat y=56{,}4633+0{,}1525x-0{,}00008x^2$ y $\\hat y(225)=86{,}7\\,\\%$.", extra: null });
  PT("se agregó la temperatura 350 °C con productos 97,0; 96,5 y 97,6", { y: W.e12_9.y.concat([97.0, 96.5, 97.6]), x: W.e12_9.x.concat([350, 350, 350]) }, { x: 225 }, { extra: null, sufijo: "con 350 °C" });
  PT("a 300 °C el producto fue 93,8; 94,0 y 94,9 (en vez de 94,8; 94,7 y 95,9)", { y: W.e12_9.y.slice(0, 9).concat([93.8, 94.0, 94.9]), x: W.e12_9.x }, { x: 250 }, { extra: null, sufijo: "300 °C corregido" });

  /* ── 12.10 cúbico ── */
  const CU = (mod, datos, nuevo, extra) => ejReg(Object.assign({ libro: "W", ej: "Ej. 12.10", loc: "ej. 12.10 (p. 451)", mod, curso: CUR, titulo: "Modelo cúbico", datos, formula: "y ~ x + I(x^2) + I(x^3)",
    nombres: { x: "x" }, contexto: "Para los datos siguientes ajuste el modelo cúbico $\\mu_{Y|x}=\\beta_0+\\beta_1x+\\beta_2x^2+\\beta_3x^3$.",
    cols: ["x", "y"], tablaCab: ["$x$", "$y$"], yTxt: "$y$", yUni: "unidades",
    polinomio: { col: "x", tex: "x", nom: "$x$", grado: 3, en: [1, 5] },
    desc: { "(Intercept)": { interp: (r) => `$b_0=${S(r.est[0])}$: valor predicho en $x=0$ (sí está en el rango de los datos).` },
      x: { sig: "el término lineal es significativo", nosig: "el término lineal no es significativo" }, "I(x^2)": { sig: "el término cuadrático es significativo", nosig: "el término cuadrático no es significativo" }, "I(x^3)": { sig: "el término cúbico es significativo: la curva cambia de concavidad", nosig: "el término cúbico no es significativo" } },
    incLibro: ["Ajuste el modelo cúbico.", `Prediga el valor de $Y$ cuando $x=${nuevo.x}$.`],
    nuevo, sust: { x: String(nuevo.x), "I(x^2)": `${nuevo.x}^2`, "I(x^3)": `${nuevo.x}^3` },
    fSi: "El modelo cúbico explica $y$.", fNo: "Con $n=7$ y 4 parámetros, el $F$ global no alcanza a ser significativo al 5 %, aunque cada término lo sea por separado: hay muy pocos grados de libertad para el error.", concepto: "m26-c07", dif: 3 }, extra || {}));
  CU(null, W.e12_10, { x: 2 });
  CU("el último dato es $y=5$ (en vez de 4)", { x: W.e12_10.x, y: [1, 4, 5, 3, 2, 3, 5] }, { x: 2 }, { sufijo: "y₇ = 5" });
  CU("los datos son y = 2, 4, 6, 4, 2, 3, 5 y se predice en x = 4", { x: W.e12_10.x, y: [2, 4, 6, 4, 2, 3, 5] }, { x: 4 }, { sufijo: "otros datos" });

  /* ── 12.11 calamares (multicolinealidad) ── */
  const CA = (mod, datos, formula, cols, extra) => ejReg(Object.assign({ libro: "W", ej: "Ej. 12.11", loc: "ej. 12.11 (pp. 451–452)", mod, curso: CUR, titulo: "Peso de calamares: multicolinealidad", datos, formula,
    contexto: "Se estudió el peso $y$ (lb) de calamares a partir de medidas de la boca: $x_1$ longitud del rostral, $x_2$ longitud de la aleta, $x_3$ rostral a la cola, $x_4$ cola a la aleta y $x_5$ ancho (todas en pulgadas).",
    cols, tablaCab: cols.map((c) => "$" + c.replace(/^x(\d)$/, "x_$1") + "$"), yTxt: "el peso del calamar", yUni: "lb",
    desc: Object.assign(icp("peso esperado de un calamar con todas las medidas en 0: fuera del rango, no se interpreta (es negativo)."), descLin([["x1", "la longitud del rostral", "pulgada"], ["x2", "la longitud de la aleta", "pulgada"], ["x3", "la longitud rostral–cola", "pulgada"], ["x4", "la longitud cola–aleta", "pulgada"], ["x5", "el ancho", "pulgada"]], "el peso", "lb")),
    incLibro: ["Estime la ecuación de regresión lineal múltiple."],
    fSi: "El modelo explica muy bien el peso. Pero ojo con la contradicción: el $F$ es enorme y casi ningún $t$ es significativo. Esa es la huella típica de la multicolinealidad (ver e).", fNo: "El modelo no explica el peso.", concepto: "m26-c10", dif: 3 }, extra || {}));
  CA(null, W.e12_11, "y ~ x1 + x2 + x3 + x4 + x5", ["x1", "x2", "x3", "x4", "x5", "y"], { notaLibro: "El apéndice del libro da $\\hat y=-6{,}5122+1{,}9994x_1-3{,}6751x_2+2{,}5245x_3+5{,}1581x_4+14{,}4012x_5$; con los datos impresos en la tabla R obtiene los valores de arriba (diferencias pequeñas, probablemente por algún dato distinto en la edición original)." });
  CA("con los mismos datos se ajusta un modelo reducido solo con la longitud de la aleta $x_2$ y el ancho $x_5$", { x2: W.e12_11.x2, x5: W.e12_11.x5, y: W.e12_11.y }, "y ~ x2 + x5", ["x2", "x5", "y"], { sufijo: "modelo reducido", fSi: "El modelo reducido explica casi lo mismo que el completo con solo dos variables." });
  CA("dos calamares pesaron distinto: el 13 pesó 7,80 lb (en vez de 8,56) y el 21 pesó 9,50 (en vez de 10,15)", { x1: W.e12_11.x1, x2: W.e12_11.x2, x3: W.e12_11.x3, x4: W.e12_11.x4, x5: W.e12_11.x5, y: cambia(W.e12_11.y, { 13: 7.80, 21: 9.50 }) }, "y ~ x1 + x2 + x3 + x4 + x5", ["x1", "x2", "x3", "x4", "x5", "y"], { sufijo: "datos cambiados" });

  /* ── 12.36 2³ codificado ── */
  const DK = (mod, datos, extra) => ejReg(Object.assign({ libro: "W", ej: "Ej. 12.36", loc: "ej. 12.36 (p. 471)", mod, curso: CUR.concat([{ id: "C8.2", loc: "slides 23–26" }]), titulo: "Factorial 2³ como regresión codificada", datos, formula: "y ~ x1 + x2 + x3",
    contexto: "Se ajusta una regresión múltiple del producto $y$ en función de la temperatura $x_1$, el tiempo de reacción $x_2$ y la concentración de un reactante $x_3$, cada una a dos niveles codificados ($-1$, $+1$).",
    cols: ["y", "x1", "x2", "x3"], tablaCab: ["$y$", "$x_1$", "$x_2$", "$x_3$"], yTxt: "el producto", yUni: "unidades", extra: "scr",
    desc: Object.assign({ "(Intercept)": { interp: (r) => `$b_0=${S(r.est[0])}$: con variables codificadas, el 0 es el <strong>centro del diseño</strong>; $b_0$ es el producto medio predicho en el centro (aquí, el promedio de las 8 corridas). A diferencia de las unidades reales, sí tiene interpretación.` } },
      descLin([["x1", "la temperatura", "unidad codificada"], ["x2", "el tiempo de reacción", "unidad codificada"], ["x3", "la concentración", "unidad codificada"]], "el producto", "unidades")),
    incLibro: ["Use las variables codificadas para estimar $\\mu_{Y|x_1,x_2,x_3}=\\beta_0+\\beta_1x_1+\\beta_2x_2+\\beta_3x_3$.", "Divida la SCR en tres componentes de 1 gl atribuibles a $x_1$, $x_2$ y $x_3$ y construya la tabla ANOVA con las pruebas de significancia."],
    scrConc: "",
    fSi: "El modelo explica el producto.", fNo: "El modelo no explica el producto.", concepto: "m26-c06", dif: 2 }, extra || {}));
  const r36 = C.ajustar({ datos: W.e12_36, formula: "y ~ x1 + x2 + x3" });
  const conc36 = (r) => r.nom.slice(1).map((t, j) => `$x_${j + 1}$ ${r.p[j + 1] < AL ? "significativa" : "no significativa"} (${pT(r.p[j + 1])})`).join(", ") + ". Cada coeficiente es la <strong>mitad del efecto</strong> del factorial: pasar de −1 a +1 cambia el producto en $2b_j$.";
  DK(null, W.e12_36, { scrConc: conc36(r36) });
  const d36a = { y: cambia(W.e12_36.y, { 1: 7.0, 8: 13.1 }), x1: W.e12_36.x1, x2: W.e12_36.x2, x3: W.e12_36.x3 };
  DK("la corrida (−1, −1, −1) dio 7,0 y la (1, 1, 1) dio 13,1", d36a, { sufijo: "datos cambiados", scrConc: conc36(C.ajustar({ datos: d36a, formula: "y ~ x1 + x2 + x3" })) });
  const d36b = { y: W.e12_36.y.map((v, i) => [9.2, 8.9, 9.6, 11.0, 10.1, 11.4, 10.6, 12.2][i]), x1: W.e12_36.x1, x2: W.e12_36.x2, x3: W.e12_36.x3 };
  DK("se repitió el experimento y se obtuvieron y = 9,2; 8,9; 9,6; 11,0; 10,1; 11,4; 10,6; 12,2", d36b, { sufijo: "réplica", scrConc: conc36(C.ajustar({ datos: d36b, formula: "y ~ x1 + x2 + x3" })) });
  return r129;
}

/* ═════════════════ SUPERFICIE DE RESPUESTA (Gutiérrez cap. 12) → M23 ═══ */
const so = (v) => v.join(" + ") + " + " + v.map((x) => `I(${x}^2)`).join(" + ") + " + " + v.flatMap((a, i) => v.slice(i + 1).map((b) => a + ":" + b)).join(" + ");
const xi = (i) => `x_${i + 1}`;
/* Derivadas parciales en LaTeX: ∂ŷ/∂x_i = b_i + 2 b_ii x_i + Σ b_ij x_j */
function derivadas(r, k) {
  const b = r.b, B = r.B;
  return Array.from({ length: k }, (_, i) => {
    let s = `\\dfrac{\\partial\\hat y}{\\partial ${xi(i)}}=${N(b[i], 4)}`;
    for (let j = 0; j < k; j++) {
      const c = j === i ? 2 * B[i][i] : 2 * B[i][j];
      if (abs(c) < 1e-12) continue;
      s += `${c < 0 ? "-" : "+"}${N(abs(c), 4)}${xi(j)}`;
    }
    return s + "=0";
  });
}
function clasifica(ev) {
  if (ev.every((l) => l < 0)) return { tipo: "máximo", txt: "todos negativos ⇒ <strong>máximo</strong> (la superficie es una «loma»)" };
  if (ev.every((l) => l > 0)) return { tipo: "mínimo", txt: "todos positivos ⇒ <strong>mínimo</strong> (la superficie es un «valle»)" };
  return { tipo: "silla", txt: "de signos mezclados ⇒ <strong>punto silla</strong>: sube en una dirección y baja en otra" };
}
/* Solución completa de superficie: o = { ej, loc, mod, libro:"G", datos{y, x1..}, k, cod:[{nom, centro, semi, uni}], objetivo, region (1 o α), titulo, contexto, tablaCab, cols, diseño, incLibro, extraParte } */
function ejRSM(o) {
  const vars = Array.from({ length: o.k }, (_, i) => "x" + (i + 1));
  const formula = "y ~ " + so(vars);
  const r = C.ajustar({ datos: o.datos, formula, falta: vars, rsm: vars });
  const k = o.k, cl = clasifica(r.ev), reg_ = o.region || 1;
  const dentro = r.xs.every((x) => abs(x) <= reg_ + 1e-9);
  const real = (i, x) => o.cod[i].centro + o.cod[i].semi * x;
  const partes = [];
  /* a) diseño */
  partes.push({ titulo: "a) Diseño y codificación", puntos: 1, solucion: p(o.diseno,
    o.yaCod ? "Los datos ya vienen en <strong>unidades codificadas</strong> (−1, 0, +1 y los axiales), así que se trabaja directo con ellas: todos los factores quedan en la misma escala y sus coeficientes se pueden comparar." :
    `Codificación: ${o.cod.map((c, i) => `$${xi(i)}=\\dfrac{${c.tex}-${N(c.centro, 4)}}{${N(c.semi, 4)}}$`).join(", ")}. Así todos los factores van en la misma escala y los coeficientes se pueden comparar; para volver a unidades reales: valor = centro + $x$·semirrango.`) });
  /* b) modelo y significancia */
  const sig = r.nom.slice(1).filter((t, j) => r.p[j + 1] < AL).map((t) => `$${termTex(t)}$`);
  const lofTxt = r.lof ? String.raw` Falta de ajuste (con las ${r.lof.glPuro + 1 > 1 ? "réplicas" : "réplica"} del centro como error puro): $F=${N(r.lof.F, 3)}$, ${pT(r.lof.p)} ⇒ ${r.lof.p < AL ? "hay falta de ajuste: el modelo de segundo orden se queda corto para describir la superficie" : "no hay evidencia de falta de ajuste"}.` : "";
  partes.push({ titulo: "b) Modelo de segundo orden: términos, F, R²", puntos: 1.5, solucion: p(String.raw`$$${ecuacion(r, "y", null, 4)}$$`,
    String.raw`Términos: lineales $${vars.map((_, i) => xi(i)).join(",")}$; cuadráticos $${vars.map((_, i) => xi(i) + "^2").join(",")}$ (curvatura); interacciones $${vars.flatMap((_, i) => vars.slice(i + 1).map((__, j) => xi(i) + xi(i + j + 1))).join(",")}$. Significativos al 5 %: ${sig.length ? sig.join(", ") : "ninguno"}. ${(() => { const cu = vars.filter((v) => r.p[r.idx(`I(${v}^2)`)] < AL).length; const inte = r.nom.filter((t, j) => t.includes(":") && r.p[j] < AL).length; return `${cu ? "Hay <strong>curvatura</strong> (algún cuadrático significativo)" : "Ningún cuadrático es significativo (sin evidencia clara de curvatura)"}; ${inte ? "hay <strong>interacción</strong>: el efecto de un factor depende del nivel del otro" : "ninguna interacción es significativa: cada factor actúa por separado"}.`; })()}`,
    String.raw`$F$ global $=${N(r.F, 2)}$ con $(${r.gl1},${r.gl2})$ gl, ${pT(r.pF)} ⇒ ${decide(r.pF)}: ${r.pF < AL ? "el modelo explica la respuesta." : "el modelo en su conjunto no es significativo (con pocos grados de libertad para el error)."} $R^2=${N(r.r2, 4)}$ (explica el ${Tx(100 * r.r2, r.r2 > 0.99 ? 2 : 1)} % de la variabilidad) y $R^2_{aj}=${N(r.r2a, 4)}$${r.r2 - r.r2a > 0.1 ? ", bastante menor: hay términos que no aportan" : ""}.${lofTxt}`) });
  /* c) punto estacionario a mano */
  const sist = derivadas(r, k);
  partes.push({ titulo: "c) Punto estacionario a mano", puntos: 1.5, solucion: p("Se deriva respecto de cada variable y se iguala a cero:",
    "$$\\begin{cases}" + sist.map((s) => s.replace("\\dfrac", "\\frac")).join("\\\\") + "\\end{cases}$$",
    String.raw`En forma matricial $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$, con $\mathbf b=(${r.b.map((v) => N(v, 4)).join(";\\ ")})$ y $B=${L.pm(r.B, 4)}$ (los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera).`,
    String.raw`Resolviendo: $${r.xs.map((x, i) => `${xi(i)}^*=${N(x, 3)}`).join(",\\ ")}$${o.yaCod ? "" : " ⇒ en unidades reales "}${o.yaCod ? "" : o.cod.map((c, i) => `${c.nom} $=${N(c.centro, 4)}+${N(c.semi, 4)}(${N(r.xs[i], 3)})=${N(real(i, r.xs[i]), 3)}$ ${c.uni}`).join("; ")}. Valor predicho: $\hat y(\mathbf x_s)=${N(r.yxs, 3)}$.`) });
  /* d) clasificación */
  const H = r.B.map((f) => f.map((v) => 2 * v));
  const detH = k === 2 ? H[0][0] * H[1][1] - H[0][1] * H[1][0] : null;
  partes.push({ titulo: "d) ¿Máximo, mínimo o silla? (hessiana)", puntos: 1, solucion: p(String.raw`Hessiana (matriz de segundas derivadas): $H=2B=${L.pm(H, 4)}$.`,
    k === 2 ? String.raw`$\det H=(${N(H[0][0], 4)})(${N(H[1][1], 4)})-(${N(H[0][1], 4)})^2=${N(detH, 4)}$ ${detH > 0 ? `&gt; 0 y $h_{11}=${N(H[0][0], 4)}$ ${H[0][0] < 0 ? "&lt; 0 ⇒ definida negativa ⇒ <strong>máximo</strong>" : "&gt; 0 ⇒ definida positiva ⇒ <strong>mínimo</strong>"}` : "&lt; 0 ⇒ indefinida ⇒ <strong>punto silla</strong>"}.` : "",
    String.raw`Con los valores propios de $B$ (lo que entrega <code>rsm</code>): $\lambda=${r.ev.map((v) => N(v, 4)).join(";\\ ")}$, ${cl.txt}.${r.ev.some((l) => abs(l) < 0.05 * Math.max(...r.ev.map(abs))) ? " Un valor propio es casi 0: en esa dirección la superficie es casi plana (una «cordillera»), así que hay muchas combinaciones con respuesta parecida." : ""}`) });
  /* e) óptimo */
  const obj = o.objetivo, bueno = (obj === "max" && cl.tipo === "máximo") || (obj === "min" && cl.tipo === "mínimo");
  const meta = `${obj === "max" ? "maximizar" : "minimizar"}${o.objSupuesto ? " (supuesto: el enunciado no lo dice explícitamente)" : ""}`;
  const zona = o.circulo ? "el hexágono que forman los puntos del diseño" : `la región del factorial, $[-1;\\ 1]^${k}$`;
  let opt;
  if (bueno && dentro) {
    opt = p(String.raw`Se busca ${meta} y el punto estacionario es un ${cl.tipo} que cae <strong>dentro</strong> de la región experimental (todas las $|x_i^*|\le${N(reg_, 3)}$): es el óptimo. ${o.cod.map((c, i) => `${c.nom} ≈ ${Tx(real(i, r.xs[i]), 3)} ${c.uni}`).join(", ")}, con $\hat y\approx${N(r.yxs, 3)}$.`, "Siguiente paso: confirmar con corridas reales en ese punto.");
  } else {
    const fallas = [];
    if (!bueno) fallas.push(`es un <strong>${cl.tipo === "silla" ? "punto silla" : cl.tipo}</strong>, no un ${obj === "max" ? "máximo" : "mínimo"}`);
    if (!dentro) fallas.push(`cae <strong>fuera</strong> de la región experimental (${r.xs.map((x, i) => `$${xi(i)}^*=${N(x, 2)}$`).filter((_, i) => abs(r.xs[i]) > reg_).join(", ")})`);
    const g = C.grilla(r, vars, obj, -1, 1, 0.05, o.circulo ? (pt) => Math.abs(pt.x2) <= 0.8661 && Math.sqrt(3) * Math.abs(pt.x1) + Math.abs(pt.x2) <= Math.sqrt(3) + 1e-9 : null);
    opt = p(String.raw`Se busca ${meta}, pero el punto estacionario ${fallas.join(" y además ")}. Como dice la clase, entonces el óptimo está en la <strong>frontera</strong> de la región: se evalúa $\hat y$ en las esquinas y bordes (o en una grilla fina, que es la idea del análisis de cordillera del libro), sin salir de la zona estudiada.`,
      String.raw`Evaluando $\hat y$ en una grilla sobre ${zona}: el ${obj === "max" ? "mayor" : "menor"} valor está en $${vars.map((v, i) => `${xi(i)}=${N(g.punto[v], 2)}`).join(",\\ ")}$, es decir ${o.cod.map((c, i) => `${c.nom} ≈ ${Tx(real(i, g.punto["x" + (i + 1)]), 3)} ${c.uni}`).join(", ")}, con $\hat y\approx${N(g.y, 3)}$. Si se quiere ir más allá, se hace un nuevo experimento en esa dirección y se confirma con corridas reales.`);
  }
  partes.push({ titulo: "e) Condición óptima", puntos: 1, solucion: opt });
  const cod = [`library(rsm)`, `datos <- ${C.rdatos(o.datos)}`, `modelo <- lm(${formula}, data = datos)`, "summary(modelo)",
    `modelo_rsm <- rsm(y ~ SO(${vars.join(", ")}), data = datos)`, "summary(modelo_rsm)   # falta de ajuste, punto estacionario y valores propios"].join("\n");
  reg("m23", o, {
    concepto: o.concepto || "m23-c05", dificultad: o.dif || 3,
    titulo: `${etiqueta(o)} · ${o.titulo}${o.sufijo ? " (" + o.sufijo + ")" : ""}`,
    enunciado: aviso(o) + p(o.contexto) + tDatos(o.cols.map((c) => o.tabla[c]), o.tablaCab) +
      incisos((o.incLibro || []).concat(["Identifique los términos lineales, cuadráticos y de interacción; ¿cuáles son significativos? ¿Hay curvatura e interacción? Interprete la prueba $F$ global, $R^2$ y $R^2$ ajustado.",
        "Encuentre <strong>a mano</strong> el punto estacionario: derive respecto de cada variable, iguale a cero y resuelva el sistema.",
        "Clasifique el punto estacionario (máximo, mínimo o silla) con la hessiana.",
        `Indique la condición de operación recomendada para ${o.objetivo === "max" ? "maximizar" : "minimizar"} la respuesta, en unidades reales.`])) +
      p("Use $\\alpha=0{,}05$ y las variables codificadas. Abajo está el código de R y su salida."),
    codigoR: cod, paquetes: ["rsm"], partes,
    verifica: [vr("xs1", `{${rmod({ datos: o.datos, formula })}; B <- matrix(0, ${k}, ${k}); co <- coef(m); vs <- ${C.rvec(vars)}; for (i in 1:${k}) { B[i, i] <- co[paste0("I(", vs[i], "^2)")]; if (i < ${k}) for (j in (i + 1):${k}) { B[i, j] <- B[j, i] <- co[paste0(vs[i], ":", vs[j])] / 2 } }; (-0.5 * solve(B, co[vs]))[1]}`, r.xs[0], 3),
      vr("R2", `{${rmod({ datos: o.datos, formula })}; summary(m)$r.squared}`, r.r2, 4)]
  });
  return r;
}

const cambiaY = (d, cambios) => Object.assign({}, d, { y: cambia(d.y, cambios) });
function m23() {
  const CUR = [{ id: "C8.2", loc: "slides 7–39" }, { id: "INST-P4" }];
  /* 22 · anodizado: primer orden con centro, interacción y máximo ascenso (primer ejercicio: se explica la materia) */
  const ej22 = (mod, Y, extra) => {
    const d = G.e22, x1 = d.pH.map((v) => Math.round(((v - 1.5) / 0.3) * 1e6) / 1e6), x2 = d.temp.map((t) => t / 8);
    const datos = { y: Y, x1, x2 };
    const r1 = C.ajustar({ datos, formula: "y ~ x1 + x2", falta: ["x1", "x2"] });
    const r2 = C.ajustar({ datos, formula: "y ~ x1 * x2", falta: ["x1", "x2"] });
    const useInt = r2.p[3] < AL;
    const rf = useInt ? r2 : r1;
    const yC = [Y[8], Y[9]], yF = Y.slice(0, 8), mC = (yC[0] + yC[1]) / 2, mF = yF.reduce((a, b) => a + b, 0) / 8;
    const dir = [r1.coef("x1"), r1.coef("x2")], paso = dir.map((b) => b / dir[0]);
    const pts = [1, 2, 3, 4, 5].map((s) => [s * paso[0], s * paso[1]]);
    const o = Object.assign({ libro: "G", ej: "Cap. 12, ej. 22", loc: "cap. 12, ej. 22 (pp. 422–423)", mod, curso: CUR }, extra || {});
    const cod = ["datos <- " + C.rdatos(datos) + "   # x1 = (pH − 1,5)/0,3 ; x2 = temperatura/8", "m1 <- lm(y ~ x1 + x2, data = datos); summary(m1)", "m2 <- lm(y ~ x1 * x2, data = datos); summary(m2)", "library(rsm)", "summary(rsm(y ~ FO(x1, x2), data = datos))   # falta de ajuste del primer orden"].join("\n");
    const partes = [
      { titulo: "a) Diseño", puntos: 1, solucion: p(String.raw`Es un <strong>factorial $2^2$ con 2 réplicas más 2 puntos al centro</strong> (10 corridas): pH en 1,2 y 1,8, temperatura en −8 y 8, centro en (1,5; 0). Codificado: $x_1=(pH-1{,}5)/0{,}3$ y $x_2=T/8$, así cada factor va de −1 a +1.`,
        String.raw`Es el diseño típico para una <strong>primera exploración</strong>: con dos niveles solo se estiman efectos lineales e interacciones; el centro permite ver si hay curvatura.`) },
      { titulo: "b) ¿Qué se gana con el centro?", puntos: 1, solucion: p(String.raw`Dos cosas: (1) las réplicas dan una estimación del <strong>error puro</strong> que no depende del modelo; (2) comparar la media del centro con la de las esquinas detecta <strong>curvatura</strong> sin agregar niveles a cada factor.`,
        String.raw`Aquí $\bar y_{centro}=${N(mC, 2)}$ y $\bar y_{esquinas}=${N(mF, 3)}$: diferencia ${Tx(mC - mF, 3)}. Si la superficie fuera un plano, ambas medias coincidirían.`,
        String.raw`Falta de ajuste del modelo de primer orden (sin interacción): $F=${N(r1.lof.F, 3)}$, ${pT(r1.lof.p)} ⇒ ${decide(r1.lof.p)}. ${r1.lof.p < AL ? "El plano no basta." : "El plano es suficiente."}`) },
      { titulo: "c) Mejor modelo", puntos: 2, solucion: p(String.raw`Primer orden: $${ecuacion(r1, "y")}$, $R^2=${N(r1.r2, 4)}$.`,
        String.raw`Agregando la interacción: $${ecuacion(r2, "y")}$; $t_{x_1x_2}=${N(r2.t[3], 3)}$, ${pT(r2.p[3])} ⇒ ${decide(r2.p[3])}. $R^2=${N(r2.r2, 4)}$, $R^2_{aj}=${N(r2.r2a, 4)}$; falta de ajuste $F=${N(r2.lof.F, 3)}$, ${pT(r2.lof.p)}.`,
        useInt ? String.raw`Mejor modelo: <strong>con interacción</strong>. Interpretación: $b_1=${N(r2.coef("x1"), 3)}$ ⇒ subir el pH de 1,2 a 1,8 (de −1 a +1) aumenta el espesor en $2b_1=${N(2 * r2.coef("x1"), 3)}$ con la temperatura en su nivel medio; $b_{12}>0$ ⇒ ese efecto es mayor con temperatura alta: $\partial\hat y/\partial x_1=${N(r2.coef("x1"), 3)}+${N(r2.coef("x1:x2"), 3)}x_2$.` : "Mejor modelo: el de <strong>primer orden</strong>; la interacción no aporta.") },
      { titulo: "d) Dirección de máximo ascenso (libro)", puntos: 1.5, solucion: p(String.raw`<strong>Esto viene del libro; la clase 8.2 no lo trabaja.</strong> En un modelo de primer orden, la dirección en que la respuesta sube más rápido es la del gradiente $(b_1,b_2)=(${N(dir[0], 3)};\ ${N(dir[1], 3)})$. Se avanza en el factor de mayor efecto ($x_1$, el pH) con paso $\Delta x_1=1$ (0,3 de pH) y el otro en proporción: $\Delta x_2=b_2/b_1=${N(paso[1], 4)}$ (${Tx(paso[1] * 8, 3)} grados).`,
        `Cinco puntos: ${pts.map(([a, b]) => `pH $=${N(1.5 + 0.3 * a, 2)}$, T $=${N(8 * b, 2)}$`).join("; ")}.`) },
      { titulo: "e) ¿Qué se hace después?", puntos: 0.5, solucion: p("Se corren experimentos en esos puntos hasta que la respuesta deje de subir; alrededor del mejor se hace un nuevo diseño (central compuesto) para ajustar un modelo de segundo orden y encontrar el óptimo.") }
    ];
    reg("m23", o, { concepto: "m23-c02", dificultad: 2, titulo: `${etiqueta(o)} · Anodizado: factorial con centro y primer orden${o.sufijo ? " (" + o.sufijo + ")" : ""}`,
      enunciado: aviso(o) + p("En una empresa que anodiza artículos de aluminio se estudia cómo el pH y la temperatura afectan el espesor del anodizado.") +
        tDatos([d.pH, d.temp, Y], ["pH", "Temperatura", "Espesor"]) +
        incisos(["¿Cómo se llama el diseño empleado?", "¿Qué se gana con las repeticiones al centro?", "Encuentre el mejor modelo que describe el espesor (interprete coeficientes, $t$, $R^2$).", "Con ese modelo liste cinco puntos en la dirección de máximo ascenso, con un paso de 0,3 en el factor de mayor influencia.", "Explique qué se hace después con esos puntos."]),
      codigoR: cod, paquetes: ["rsm"], partes, verifica: [vr("b1", `{d <- ${C.rdatos(datos)}; coef(lm(y ~ x1 * x2, data = d))[2]}`, r2.est[1], 4), vr("LOF p", `{d <- ${C.rdatos(datos)}; m <- lm(y ~ x1 + x2, data = d); ce <- factor(paste(d$x1, d$x2)); sp <- sum((d$y - ave(d$y, ce))^2); gp <- nrow(d) - nlevels(ce); sl <- sum(resid(m)^2) - sp; gl <- m$df.residual - gp; pf((sl / gl) / (sp / gp), gl, gp, lower.tail = FALSE)}`, r1.lof.p, 4)] });
    return { r1, r2 };
  };
  ej22(null, G.e22.y);
  ej22("las dos corridas al centro dieron 16 y 15 (en vez de 14 y 13)", cambia(G.e22.y, { 9: 16, 10: 15 }), { sufijo: "otro centro" });
  ej22("la combinación pH 1,8 y temperatura 8 dio 21 y 22 (en vez de 19 y 20)", cambia(G.e22.y, { 4: 21, 8: 22 }), { sufijo: "esquina alta" });

  /* 23 · filtración, central compuesto */
  const C23 = { libro: "G", ej: "Cap. 12, ej. 23", loc: "cap. 12, ej. 23 (p. 423)", curso: CUR, k: 2, yaCod: true, region: 1.414, titulo: "Tiempo de filtración: central compuesto",
    contexto: "Un ingeniero químico midió el tiempo de filtración $Y$ en función de la temperatura ($x_1$) y la presión ($x_2$), en unidades codificadas.",
    cod: [{ nom: "temperatura (codificada)", tex: "x_1", centro: 0, semi: 1, uni: "" }, { nom: "presión (codificada)", tex: "x_2", centro: 0, semi: 1, uni: "" }],
    objetivo: "min", objSupuesto: true, cols: ["x1", "x2", "y"], tablaCab: ["$x_1$", "$x_2$", "$Y$"],
    diseno: "<strong>Diseño central compuesto</strong> para $k=2$: 4 esquinas del $2^2$, 4 puntos axiales a $\\alpha=1{,}414=\\sqrt[4]{4}$ (rotable: la varianza de la predicción depende solo de la distancia al centro) y 5 réplicas del centro (error puro). 5 niveles por factor ⇒ permite estimar curvatura.",
    incLibro: ["Represente el diseño y diga qué diseño es y qué propiedades tiene.", "Ajuste un modelo de segundo orden y compruebe si es adecuado.", "¿Qué tipo de superficie describe el modelo?", "¿Cuál es el mejor punto posible de operación?"], concepto: "m23-c05", dif: 3 };
  const g23 = (mod, Y, ex) => ejRSM(Object.assign({}, C23, { mod, datos: { y: Y, x1: G.e23.x1, x2: G.e23.x2 }, tabla: { x1: G.e23.x1, x2: G.e23.x2, y: Y } }, ex || {}));
  g23(null, G.e23.y);
  g23("las 5 réplicas del centro dieron 37, 35, 38, 36 y 39", G.e23.y.slice(0, 8).concat([37, 35, 38, 36, 39]), { sufijo: "otro centro" });
  g23("el punto axial (1,414; 0) dio 58 y la esquina (1, −1) dio 36", cambia(G.e23.y, { 6: 58, 3: 36 }), { sufijo: "dos datos cambiados" });

  /* 24 · ISA, Box-Behnken */
  const C24 = { libro: "G", ej: "Cap. 12, ej. 24", loc: "cap. 12, ej. 24 (pp. 423–424)", curso: CUR, k: 3, yaCod: true, titulo: "Índice de solubilidad en agua: Box-Behnken",
    contexto: "En un proceso de extrusión de harina de amaranto interesa <strong>minimizar</strong> el índice de solubilidad en agua (ISA). Factores (codificados): temperatura $x_1$, humedad $x_2$ y velocidad de tornillo $x_3$.",
    cod: [{ nom: "temperatura", tex: "x_1", centro: 0, semi: 1, uni: "(cod.)" }, { nom: "humedad", tex: "x_2", centro: 0, semi: 1, uni: "(cod.)" }, { nom: "velocidad", tex: "x_3", centro: 0, semi: 1, uni: "(cod.)" }],
    objetivo: "min", cols: ["x1", "x2", "x3", "y"], tablaCab: ["$x_1$", "$x_2$", "$x_3$", "ISA"],
    diseno: "<strong>Diseño de Box-Behnken</strong> para $k=3$: tres factores a tres niveles (−1, 0, +1); 12 puntos en el medio de las aristas del cubo (un $2^2$ por cada par de factores con el tercero en 0) y 3 centros. Nunca pone todos los factores en un extremo a la vez; se recomienda cuando las esquinas son caras o riesgosas.",
    incLibro: ["Represente el diseño, nómbrelo y diga cuándo se recomienda.", "Ajuste un modelo de segundo orden y verifique su calidad.", "¿Qué tipo de superficie describe el modelo?", "Determine el mejor punto posible dentro de la región experimental."], concepto: "m23-c06", dif: 3 };
  const g24 = (mod, Y, ex) => ejRSM(Object.assign({}, C24, { mod, datos: { y: Y, x1: G.e24.x1, x2: G.e24.x2, x3: G.e24.x3 }, tabla: { x1: G.e24.x1, x2: G.e24.x2, x3: G.e24.x3, y: Y } }, ex || {}));
  g24(null, G.e24.y);
  g24("los 3 centros dieron 13,25; 13,33 y 13,17", G.e24.y.slice(0, 12).concat([13.25, 13.33, 13.17]), { sufijo: "otro centro" });
  g24("las corridas (−1, 0, 1) y (0, −1, −1) dieron 12,37 y 16,20", cambia(G.e24.y, { 7: 12.37, 9: 16.20 }), { sufijo: "dos datos cambiados" });

  /* 25 · colorante, unidades reales */
  const d25 = G.e25, x25 = { x1: d25.carbono.map((c) => Math.round(((c - 11) / 2) * 1000) / 1000), x2: d25.temp.map((t) => Math.round(((t - 21) / 4) * 1000) / 1000) };
  const C25 = { libro: "G", ej: "Cap. 12, ej. 25", loc: "cap. 12, ej. 25 (p. 424)", curso: CUR, k: 2, region: 1.414, titulo: "Producción de colorante: central compuesto en unidades reales",
    contexto: "Se busca maximizar la producción de un colorante natural en función de la concentración de carbono y la temperatura (°C). Las corridas están en unidades reales.",
    cod: [{ nom: "carbono", tex: "C", centro: 11, semi: 2, uni: "" }, { nom: "temperatura", tex: "T", centro: 21, semi: 4, uni: "°C" }],
    objetivo: "max", cols: ["carbono", "temp", "y"], tablaCab: ["Carbono", "Temperatura (°C)", "Producción"],
    diseno: "<strong>Central compuesto</strong> ($k=2$): esquinas en carbono 9/13 y temperatura 17/25; puntos axiales en 8,17/13,8 y 15,34/26,66, que codificados quedan en $\\pm1{,}414$ (rotable); 4 réplicas del centro (11; 21).",
    incLibro: ["Represente el diseño en el plano (condiciones reales) y nómbrelo.", "Ajuste un modelo de segundo orden y depúrelo.", "¿El modelo describe adecuadamente la variación observada?", "Encuentre las condiciones que maximizan la producción del colorante."], concepto: "m23-c05", dif: 3 };
  const g25 = (mod, Y, ex) => ejRSM(Object.assign({}, C25, { mod, datos: { y: Y, x1: x25.x1, x2: x25.x2 }, tabla: { carbono: d25.carbono, temp: d25.temp, y: Y } }, ex || {}));
  g25(null, d25.y);
  g25("el axial de temperatura alta (26,66 °C) produjo 1 925 (en vez de 725)", cambia(d25.y, { 8: 1925 }), { sufijo: "otro axial" });
  g25("las corridas a 13 de carbono produjeron 6 240 (a 17 °C) y 3 073 (a 25 °C)", cambia(d25.y, { 2: 6240, 4: 3073 }), { sufijo: "más carbono" });

  /* 26 · rendimiento: secuencial; se analiza el central compuesto final (diseño 2 + axiales) */
  const e26 = G.e26;
  const C26 = { libro: "G", ej: "Cap. 12, ej. 26", loc: "cap. 12, ej. 26 (pp. 425–426)", curso: CUR, k: 2, region: 1.41, titulo: "Rendimiento: del primer orden al central compuesto",
    contexto: "Se buscan el tiempo $W_1$ (min) y la temperatura $W_2$ (°C) que maximizan el rendimiento. Tras un primer diseño en (75; 130) y la trayectoria de máximo ascenso, se corrió un $2^2$ con 2 centros en torno a (90; 145) y se agregaron 6 corridas (axiales y centros) para completar un central compuesto. Se analiza ese diseño final de 12 corridas.",
    cod: [{ nom: "tiempo", tex: "W_1", centro: 90, semi: 10, uni: "min" }, { nom: "temperatura", tex: "W_2", centro: 145, semi: 5, uni: "°C" }],
    objetivo: "max", cols: ["W1", "W2", "y"], tablaCab: ["$W_1$ (min)", "$W_2$ (°C)", "Rendimiento"],
    diseno: "El segundo diseño ($2^2$ + 2 centros) no permite estimar curvatura; al agregar 4 puntos axiales ($\\pm1{,}41$) y 2 centros más queda un <strong>central compuesto</strong> de 12 corridas con 4 réplicas del centro.",
    incLibro: ["A los datos del segundo diseño (6 corridas) ajuste un modelo de primer orden: ¿describe la superficie?", "Con las 12 corridas del central compuesto ajuste un modelo de segundo orden: ¿ahora sí describe la superficie?", "Verifique supuestos para el modelo de segundo orden.", "Encuentre las condiciones que maximizan el rendimiento."], concepto: "m23-c05", dif: 3 };
  const g26 = (mod, Y2, Y3, ex) => ejRSM(Object.assign({}, C26, { mod, datos: { y: Y2.concat(Y3), x1: e26.d2.x1.concat(e26.d3.x1), x2: e26.d2.x2.concat(e26.d3.x2) },
    tabla: { W1: e26.d2.W1.concat(e26.d3.W1), W2: e26.d2.W2.concat(e26.d3.W2), y: Y2.concat(Y3) } }, ex || {}));
  g26(null, e26.d2.y, e26.d3.y);
  g26("la esquina (100; 150) rindió 82,4 (en vez de 77,4)", cambia(e26.d2.y, { 4: 82.4 }), e26.d3.y, { sufijo: "otra esquina" });
  g26("los axiales de tiempo rindieron 85,1 (76 min) y 79,0 (104 min)", e26.d2.y, cambia(e26.d3.y, { 1: 85.1, 2: 79.0 }), { sufijo: "otros axiales" });

  /* 27 · hojuelas de soya, Box-Behnken */
  const C27 = { libro: "G", ej: "Cap. 12, ej. 27", loc: "cap. 12, ej. 27 (p. 426)", curso: CUR.concat([{ id: "C8.2", loc: "slides 19–22, 38–39" }]), k: 3, titulo: "Hojuelas de soya: Box-Behnken",
    contexto: "Aguilera y Kosikowski estudiaron la elaboración de hojuelas de soya por extrusión con un Box-Behnken: temperatura (120/145/170 °C), humedad (25/35/45 %) y velocidad de tornillo (800/900/1000 rpm). Interesa <strong>minimizar</strong> la respuesta.",
    cod: [{ nom: "temperatura", tex: "T", centro: 145, semi: 25, uni: "°C" }, { nom: "humedad", tex: "H", centro: 35, semi: 10, uni: "%" }, { nom: "velocidad", tex: "V", centro: 900, semi: 100, uni: "rpm" }],
    objetivo: "min", cols: ["x1", "x2", "x3", "y"], tablaCab: ["$x_1$", "$x_2$", "$x_3$", "$Y$"],
    diseno: "<strong>Box-Behnken</strong> con $k=3$: 12 puntos de arista + 3 centros = 15 corridas (el central compuesto necesitaría 20). Tres niveles por factor.",
    incLibro: ["Ajuste un modelo de segundo orden.", "Verifique que el modelo sea adecuado. ¿Es útil para predecir?", "Encuentre la ecuación canónica (valores propios).", "¿Qué tipo de superficie describe el modelo?", "Si interesa minimizar, ¿es el tipo de superficie deseado? Si no, ¿qué se debe hacer?", "De ser necesario, determine el mejor punto posible dentro de la región experimental."], concepto: "m23-c06", dif: 3 };
  const g27 = (mod, Y, ex) => ejRSM(Object.assign({}, C27, { mod, datos: { y: Y, x1: G.e27.x1, x2: G.e27.x2, x3: G.e27.x3 }, tabla: { x1: G.e27.x1, x2: G.e27.x2, x3: G.e27.x3, y: Y } }, ex || {}));
  g27(null, G.e27.y);
  g27("la corrida (−1, 1, 0) dio 25,4 (en vez de 33,4)", cambia(G.e27.y, { 3: 25.4 }), { sufijo: "un dato cambiado" });
  g27("los centros dieron 4,0; 4,2 y 4,4", G.e27.y.slice(0, 12).concat([4.0, 4.2, 4.4]), { sufijo: "otro centro" });

  /* 28 · soldadura: 2³ + centros + axiales ±1,28 (32 corridas) */
  const e28 = G.e28, rep2 = (a) => a.flatMap((v) => [v, v]);
  const x28 = { x1: rep2(e28.fact.T).concat(rep2(e28.ax.T)), x2: rep2(e28.fact.P).concat(rep2(e28.ax.P)), x3: rep2(e28.fact.F).concat(rep2(e28.ax.F)) };
  const C28 = { libro: "G", ej: "Cap. 12, ej. 28", loc: "cap. 12, ej. 28 (pp. 426–428)", curso: CUR, k: 3, region: 1.28, titulo: "Fuerza de arrastre de una soldadura: central compuesto ortogonal",
    contexto: "Para maximizar la fuerza de arrastre de una soldadura se corrió un $2^3$ con dos centros (2 réplicas) en tiempo $T$ (3/5/7 ms), potencia $P$ (3,0/4,3/5,6 W) y fuerza $F$ (700/750/800 g); al detectar curvatura se agregaron puntos axiales en $\\pm1{,}28$ (2 réplicas). Se analizan las 32 corridas (codificadas; en la tabla, cada fila trae sus 2 réplicas). Nota: en la tabla del libro la fila (−1, 1, 1) dice fuerza «80»; por la codificación es 800 g.",
    cod: [{ nom: "tiempo", tex: "T", centro: 5, semi: 2, uni: "ms" }, { nom: "potencia", tex: "P", centro: 4.3, semi: 1.3, uni: "W" }, { nom: "fuerza", tex: "F", centro: 750, semi: 50, uni: "g" }],
    objetivo: "max", cols: ["x1", "x2", "x3", "y"], tablaCab: ["$x_1$ (T)", "$x_2$ (P)", "$x_3$ (F)", "Fuerza de arrastre"],
    diseno: "Primero un $2^3$ + centro (sirve para el error puro y para detectar curvatura); luego se agregan 6 puntos axiales a $\\pm1{,}28$ ⇒ <strong>central compuesto ortogonal</strong> (no rotable: el equipo no permite abrir más los niveles).",
    incLibro: ["¿Qué utilidad tienen los puntos al centro?", "Ajuste un modelo de segundo orden completo.", "Caracterice la superficie: ¿qué tipo de superficie es?", "Determine las condiciones de operación que maximizan la fuerza de arrastre.", "Verifique residuos."], concepto: "m23-c05", dif: 3 };
  const tab28 = (Y) => ({ x1: e28.fact.T.concat(e28.ax.T), x2: e28.fact.P.concat(e28.ax.P), x3: e28.fact.F.concat(e28.ax.F), y: Y.map((par) => par.map((v) => S(v, 5)).join("; ")) });
  const g28 = (mod, Yf, Ya, ex) => { const Y = Yf.concat(Ya); return ejRSM(Object.assign({}, C28, { mod, datos: Object.assign({ y: Y.flat() }, x28), tabla: tab28(Y) }, ex || {})); };
  g28(null, e28.fact.y, e28.ax.y);
  g28("el axial de potencia baja (−1,28) dio 940 y 956 (en vez de 740 y 756)", e28.fact.y, e28.ax.y.map((v, i) => (i === 1 ? [940, 956] : v)), { sufijo: "otro axial" });
  g28("los centros dieron 1 881/1 745 y 1 692/1 848", e28.fact.y.map((v, i) => (i === 0 ? [1881, 1745] : i === 8 ? [1692, 1848] : v)), e28.ax.y, { sufijo: "otro centro" });

  /* 29 · queso panela: diseño hexagonal */
  const d29 = G.e29, x29 = { x1: d29.sal.map((s) => s - 5), x2: d29.cuajo.map((c) => Math.round(((c - 0.3) / 0.1) * 1000) / 1000) };
  const C29 = { libro: "G", ej: "Cap. 12, ej. 29", loc: "cap. 12, ej. 29 (p. 428)", curso: CUR, k: 2, circulo: true, titulo: "Sabor del queso panela: sal y cuajo",
    contexto: "Se estudia el sabor del queso panela (promedio de cinco jueces, escala hedónica) en función de la sal y el cuajo. Se busca el <strong>mejor sabor</strong> (maximizar).",
    cod: [{ nom: "sal", tex: "S", centro: 5, semi: 1, uni: "" }, { nom: "cuajo", tex: "Cu", centro: 0.3, semi: 0.1, uni: "" }],
    objetivo: "max", cols: ["sal", "cuajo", "y"], tablaCab: ["Sal", "Cuajo", "Sabor"],
    diseno: "Codificando $x_1=\\text{sal}-5$ y $x_2=(\\text{cuajo}-0{,}3)/0{,}1$, los 6 puntos externos quedan sobre un círculo de radio 1, como un <strong>hexágono</strong> (por ejemplo (0,5; 0,87)), más 2 centros: un diseño de superficie de respuesta con 8 corridas para 6 parámetros (solo 2 gl para el error).",
    incLibro: ["Ajuste un modelo de segundo orden. ¿Qué porcentaje de la variación explica?", "Escriba el modelo de segundo orden; describa la superficie y los contornos.", "Encuentre la combinación de sal y cuajo que da el mejor sabor."], concepto: "m23-c05", dif: 3 };
  const g29 = (mod, Y, ex) => ejRSM(Object.assign({}, C29, { mod, datos: { y: Y, x1: x29.x1, x2: x29.x2 }, tabla: { sal: d29.sal, cuajo: d29.cuajo, y: Y } }, ex || {}));
  g29(null, d29.y);
  g29("los centros dieron 7,10 y 7,30 (en vez de 6,33 y 6,66)", cambia(d29.y, { 7: 7.10, 8: 7.30 }), { sufijo: "otro centro" });
  g29("el queso con sal 6 obtuvo 6,40 y el de sal 4 obtuvo 6,90", cambia(d29.y, { 1: 6.40, 4: 6.90 }), { sufijo: "extremos de sal" });
}

module.exports = { m23, m26, ejReg, ejRSM };
