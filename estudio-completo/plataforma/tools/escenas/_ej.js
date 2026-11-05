/* ============================================================================
   escenas/_ej.js — Constructores de pizarras para los ejercicios del libro guía.
   Usan nombres de marca fijos por tipo de ejercicio (ver tools/guiones/m2*-lg-*.txt):
   DBCA:      inicio enun clave1.. dis [dis-r] modelo h0t h0b tot tot-i tot-j tot-g corr sct sctr [sctr-div]
              scb sce gl cm ft ftc conc-t fb conc-b [lsd lsd-n medias pares mejor] [r] fin
   Factorial: inicio enun clave1.. dis [dis-r] modelo h0a h0b h0ab … (cada ejercicio arma el resto)
   ========================================================================== */
"use strict";
const L = require("./_lib");
const { n, nt, at, $, formula, nota, clave, kicker, titulo, tabla, lista, paso, div, p, span, dbca, factorial, grafica, COL } = L;

const c = (v, m, extra = {}) => Object.assign({ v, en: m }, extra);

/* Portada del ejercicio */
function portada(ej, tit, sub) {
  return { en: "inicio", html: `<div class="pz-centro">${kicker(ej)}<h3 class="pz-t" style="font-size:2.1em">${tit}</h3>` +
    p({ clase: "pz-st" }, sub) + "</div>" };
}
/* Enunciado: texto (con clave({en, hl}, …) ya puesto) + tabla de datos opcional */
function enunciado(ej, html, datos) {
  return { en: "enun", html: kicker(ej + " · enunciado") +
    `<p class="pz-enun">${html}</p>` + (datos ? `<div class="pz-datos">${datos}</div>` : "") };
}
/* Resalta una frase clave del enunciado desde la marca m hasta el final de la escena */
const k = (m, html) => clave({ hl: [m] }, html);

/* ── DBCA ─────────────────────────────────────────────────────────────── */
/* Con ctx (tiempos del audio) cada número se arma a la vista: sumas término a término,
   fórmulas que se resuelven y resultados que vuelan a su celda. */
function dbcaEj(cfg, ctx) {
  const A = require("./_anim");
  const R = dbca(cfg.Y), dd = cfg.decSC || 3;
  const { trat, bloq } = cfg, a = R.a, b = R.b;
  const nb = (x) => n(x, 2);
  const esc = [];
  esc.push(portada(cfg.ej, cfg.titulo, "Diseño en bloques completos al azar (DBCA)"));
  esc.push(enunciado(cfg.ej, cfg.enun, tabla([""].concat(bloq), cfg.Y.map((f, i) => [{ v: trat[i], th: true }].concat(f.map(nb))), cfg.datosChica ? "pz-chica" : "")));
  esc.push({ en: "dis", html: kicker("Identificar el diseño") + titulo(cfg.disTitulo || "¿Qué es tratamiento y qué es bloque?") +
    `<div class="pz-cols">` +
    lista([
      [cfg.disR ? "dis-r" : "dis", `Tratamiento: <span class="pz-am">${cfg.nomTrat}</span> · ${$("k=" + a)}`],
      [cfg.disR ? "dis-r" : "dis", `Bloque: <span class="pz-ce">${cfg.nomBloque}</span> · ${$("b=" + b)}`],
      [cfg.disR ? "dis-r" : "dis", `${$("N=k\\cdot b=" + R.N)} datos`]
    ]) +
    div({}, formula({ en: "modelo" }, "Y_{ij}=\\mu+\\tau_i+\\gamma_j+\\varepsilon_{ij}") +
      formula({ en: "h0t" }, `H_0:\\tau_1=\\dots=\\tau_{${a}}=0`) +
      formula({ en: "h0b" }, `H_0:\\gamma_1=\\dots=\\gamma_{${b}}=0`)) + "</div>" });

  /* ── Paso 1: totales que se arman sumando ── */
  const slots = (m1, m2, k) => { const t1 = ctx.T(m1), t2 = ctx.T(m2), len = Math.max((t2 - t1 - 0.6) / k, 1.2); return Array.from({ length: k }, (_, i) => ({ ini: 0.3 + i * len, len })); };
  const filas = slots("tot-i", "tot-j", a), cols = slots("tot-j", "tot-g", b);
  const sumas = [];
  const tTi = [], tBj = [];
  filas.forEach((sl, i) => {
    const paso = Math.min(0.45, (sl.len * 0.55) / b);
    const tiempos = cfg.Y[i].map((_, j) => `tot-i@${(sl.ini + j * paso).toFixed(2)}`);
    const tRes = `tot-i@${(sl.ini + b * paso + 0.1).toFixed(2)}`;
    tTi[i] = A.mas(tRes, 0.35);
    sumas.push(A.sumaVuela({ etiqueta: `${$(`Y_{${i + 1}\\cdot}`)} <span class="pz-tenue">(${trat[i]})</span>`, terms: cfg.Y[i].map((v, j) => ({ v, desde: `d${i}-${j}` })), tiempos, tRes, idRes: `sti${i}`,
      hasta: i < a - 1 ? `tot-i@${filas[i + 1].ini.toFixed(2)}` : "tot-j@0.2" }));
  });
  cols.forEach((sl, j) => {
    const paso = Math.min(0.4, (sl.len * 0.55) / a);
    const tiempos = cfg.Y.map((_, i) => `tot-j@${(sl.ini + i * paso).toFixed(2)}`);
    const tRes = `tot-j@${(sl.ini + a * paso + 0.1).toFixed(2)}`;
    tBj[j] = A.mas(tRes, 0.35);
    sumas.push(A.sumaVuela({ etiqueta: `${$(`Y_{\\cdot ${j + 1}}`)} <span class="pz-tenue">(${bloq[j]})</span>`, terms: cfg.Y.map((f, i) => ({ v: f[j], desde: `d${i}-${j}` })), tiempos, tRes, idRes: `sbj${j}`,
      hasta: j < b - 1 ? `tot-j@${cols[j + 1].ini.toFixed(2)}` : "tot-g@0.2" }));
  });
  const gPaso = Math.min(0.45, Math.max(ctx.T("corr") - ctx.T("tot-g") - 1.5, 1) / a);
  sumas.push(A.sumaVuela({ etiqueta: $("Y_{\\cdot\\cdot}"), terms: R.Ti.map((v, i) => ({ v, desde: `ti${i}` })), tiempos: R.Ti.map((_, i) => `tot-g@${(0.3 + i * gPaso).toFixed(2)}`),
    tRes: `tot-g@${(0.4 + a * gPaso).toFixed(2)}`, idRes: "sg" }));
  const tG = `tot-g@${(0.75 + a * gPaso).toFixed(2)}`;
  esc.push({ en: "tot", html: kicker("Paso 1 · Totales") + titulo("Sumar cada fila, cada columna y todo") +
    tabla([""].concat(bloq, [{ v: $("Y_{i\\cdot}"), tot: true }]),
      cfg.Y.map((f, i) => [{ v: trat[i], th: true }].concat(f.map((x, j) => ({ v: nb(x), id: `d${i}-${j}` })),
        [{ v: nb(R.Ti[i]), tot: true, en: tTi[i], desde: `sti${i}`, id: `ti${i}` }]))
        .concat([[{ v: $("Y_{\\cdot j}"), th: true }].concat(R.Bj.map((x, j) => ({ v: nb(x), tot: true, en: tBj[j], desde: `sbj${j}` })),
          [{ v: nb(R.G), tot: true, en: tG, desde: "sg" }])]), cfg.datosChica ? "pz-chica" : "") +
    `<div class="pz-caja-calc"><span class="pz-etq">suma</span><div class="pz-pila">${sumas.join("")}</div></div>` });

  /* ── Paso 2: sumas de cuadrados ── */
  const fin2 = (m, sig) => Math.max(ctx.T(sig) - ctx.T(m), 1.5);
  const tSctrDiv = cfg.sctrDiv ? "sctr-div" : null;
  const lenTr = fin2("sctr", tSctrDiv || "scb"), lenB = fin2("scb", "sce");
  const tiTr = R.Ti.map((_, i) => `sctr@${(0.4 + i * Math.min(0.5, lenTr * 0.5 / a)).toFixed(2)}`);
  const tiB = R.Bj.map((_, j) => `scb@${(0.4 + j * Math.min(0.5, lenB * 0.5 / b)).toFixed(2)}`);
  const resTr = tSctrDiv ? "sctr-div@1.2" : `sctr@${(0.6 + a * Math.min(0.5, lenTr * 0.5 / a) + 0.8).toFixed(2)}`;
  const resB = `scb@${(0.6 + b * Math.min(0.5, lenB * 0.5 / b) + 0.8).toFixed(2)}`;
  const sumTr = `sctr@${(0.5 + a * Math.min(0.5, lenTr * 0.5 / a)).toFixed(2)}`, sumB = `scb@${(0.5 + b * Math.min(0.5, lenB * 0.5 / b)).toFixed(2)}`;
  const chips = (vals, pref, lab) => `<div class="pz-suma"><span class="pz-tenue">${lab}</span> ` + vals.map((v, i) => `<span class="pz-chip" data-id="${pref}${i}">${nb(v)}</span>`).join("") + "</div>";
  const scTab = tabla(["Fuente", "SC"], [
    [cfg.NomTrat, { v: n(R.SStr, dd), en: A.mas(resTr, 0.8), desde: "rs-tr" }], [cfg.NomBloque, { v: n(R.SSb, dd), en: A.mas(resB, 0.8), desde: "rs-b" }],
    ["Error", { v: n(R.SSE, dd), en: "sce@2.4", desde: "rs-e" }], ["Total", { v: n(R.SST, dd), en: "sct@2.4", desde: "rs-t" }]], "pz-chica");
  esc.push({ en: "corr", html: kicker("Paso 2 · Sumas de cuadrados") + titulo("Cada SC sale de los totales") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col" style="gap:1.2cqh;font-size:.92em">` +
    chips(R.Ti, "ci", $("Y_{i\\cdot}:")) + chips(R.Bj, "cj", $("Y_{\\cdot j}:")) +
    A.calc({ partes: [["corr", "\\dfrac{Y_{\\cdot\\cdot}^2}{N}="], ["corr@0.8", `\\dfrac{${nt(R.G, 2)}^2}{${R.N}}`]], tRes: "corr@1.8", res: n(R.C, dd), idRes: "rs-c" }) +
    A.calc({ partes: [["sct", "SC_T=\\sum Y_{ij}^2-\\tfrac{Y_{\\cdot\\cdot}^2}{N}="], ["sct@0.9", `${nt(R.ssy, dd)}-${nt(R.C, dd)}`]], tRes: "sct@1.6", res: n(R.SST, dd), idRes: "rs-t" }) +
    A.sumaVuela({ etiqueta: $("\\sum Y_{i\\cdot}^2"), terms: R.Ti.map((v, i) => ({ v, desde: `ci${i}` })), cuadrado: true, tiempos: tiTr, tRes: sumTr, idRes: "q-tr" }) +
    A.calc({ partes: [[A.mas(sumTr, 0.4), `SC_{TRAT}=\\dfrac{${nt(R.sTi2, dd)}}{\\color{#ffd166}{b=${b}}}-${nt(R.C, dd)}`]], tRes: resTr, res: n(R.SStr, dd), idRes: "rs-tr" }) +
    A.sumaVuela({ etiqueta: $("\\sum Y_{\\cdot j}^2"), terms: R.Bj.map((v, j) => ({ v, desde: `cj${j}` })), cuadrado: true, tiempos: tiB, tRes: sumB, idRes: "q-b" }) +
    A.calc({ partes: [[A.mas(sumB, 0.4), `SC_B=\\dfrac{${nt(R.sBj2, dd)}}{\\color{#7cc6fe}{k=${a}}}-${nt(R.C, dd)}`]], tRes: resB, res: n(R.SSb, dd), idRes: "rs-b" }) +
    A.calc({ partes: [["sce", "SC_E=SC_T-SC_{TRAT}-SC_B="], ["sce@0.8", `${nt(R.SST, dd)}-${nt(R.SStr, dd)}-${nt(R.SSb, dd)}`]], tRes: "sce@1.6", res: n(R.SSE, dd), idRes: "rs-e" }) +
    `</div><div class="pz-col">${scTab}` + p({ en: "sctr", clase: "pz-tenue" }, `÷ ${b}: cada total de ${cfg.nomTrat} junta ${b} datos (uno por ${cfg.nomBloque})`) + "</div></div>" });

  /* ── Paso 3: tabla ANOVA que se llena ── */
  const crit = cfg.crit, pv = cfg.p;
  const tcm = A.reparto(ctx, "cm", "ft", 3, 0.2);
  const AN = A.anovaAnimada({ ctx, pref: "an", dec: dd, filas: [
    { nombre: cfg.NomTrat, sc: R.SStr, gl: R.gT, tGl: "gl", tCM: tcm[0], tF: "ft", p: pv.t, tP: "ftc@0.8", hlF: ["ft", "fb"] },
    { nombre: cfg.NomBloque, sc: R.SSb, gl: R.gB, tGl: "gl@0.8", tCM: tcm[1], tF: "fb", p: pv.b, tP: "fb@2.6", hlF: ["fb", "fin"] },
    { nombre: "E", sc: R.SSE, gl: R.gE, tGl: "gl@1.6", tCM: tcm[2], error: true }], total: { sc: R.SST, gl: R.N - 1, tGl: "gl@2.4" } });
  esc.push({ en: "gl", html: kicker("Paso 3 · Tabla ANOVA") + titulo("CM = SC / gl · F = CM / CM<sub>E</sub>") +
    AN.tabla.replace(">E<", ">Error<") + AN.calcs +
    `<div class="pz-cols">` +
    nota({ en: "conc-t" }, `${cfg.NomTrat}: ${n(R.Ft, 2)} ${R.Ft > crit.t ? "&gt;" : "&lt;"} F(${R.gT},${R.gE}) = ${n(crit.t, 2)} ⇒ ${R.Ft > crit.t ? "<strong>se rechaza</strong> H₀" : "<strong>no se rechaza</strong> H₀"}`, R.Ft > crit.t ? "ok" : "mal") +
    nota({ en: "conc-b" }, `${cfg.NomBloque}: ${n(R.Fb, 2)} ${R.Fb > crit.b ? "&gt;" : "&lt;"} F(${R.gB},${R.gE}) = ${n(crit.b, 2)} ⇒ ${R.Fb > crit.b ? "el bloque <strong>sí</strong> influye" : "el bloque <strong>no</strong> influye"}`, R.Fb > crit.b ? "ok" : "mal") +
    "</div>" });

  /* ── Paso 4: LSD y diferencias calculadas ── */
  if (cfg.lsd) {
    const s = cfg.lsd, ord = R.mT.map((m, i) => [trat[i], m, i]).sort((x, y) => y[1] - x[1]);
    const npar = s.pares.length, tp = A.reparto(ctx, "pares", "mejor", npar, 0.2);
    const idx = (nombre) => trat.findIndex((t) => t === nombre.trim() || t.endsWith(" " + nombre.trim()));
    const calcs = s.pares.map(([par, dif, si], k) => {
      const [u, v] = par.split("−").map((x) => idx(x));
      const tt = tp[k], nxt = k < npar - 1 ? tp[k + 1] : "mejor";
      return A.calc({ partes: [[tt, `|\\bar Y_{${trat[u]}}-\\bar Y_{${trat[v]}}|=|${nt(R.mT[u])}-${nt(R.mT[v])}|`]], tRes: A.mas(tt, 0.5), res: n(Math.abs(R.mT[u] - R.mT[v]), 3), idRes: `dp${k}`, hasta: nxt });
    });
    esc.push({ en: "lsd", html: kicker("Paso 4 · Comparaciones") + titulo(cfg.lsdTitulo || "¿Qué " + cfg.nomTrat + "s difieren?") +
      A.calc({ partes: [["lsd", "LSD=t_{0{,}025;\\,gl_E}\\sqrt{\\tfrac{2\\,CM_E}{b}}="], ["lsd-n", `${nt(s.t, 3)}\\sqrt{\\tfrac{2\\cdot${nt(R.CME, 4)}}{${b}}}`]], tRes: "lsd-n@1.2", res: n(s.valor, 3), idRes: "lsdv" }) +
      `<div class="pz-cols">` +
      tabla([cfg.NomTrat, `Media = ${$("Y_{i\\cdot}/b")}`], ord.map(([t, m, i]) => [c(t, "medias"), c(`<span class="pz-tenue">${nb(R.Ti[i])}/${b} =</span> ${n(m, 3)}`, "medias")]), "pz-chica") +
      tabla(["Par", "|dif.|", "LSD", "¿Difieren?"], s.pares.map(([par, dif, si], k) => [c(par, tp[k]), { v: dif, en: A.mas(tp[k], 1.2), desde: `dp${k}` },
        { v: n(s.valor, 3), en: A.mas(tp[k], 1.2) }, c(si ? "Sí" : "No", A.mas(tp[k], 1.5), { clase: si ? "pz-ve" : "pz-ro" })]), "pz-chica") +
      "</div>" + `<div class="pz-caja-calc"><span class="pz-etq">diferencia</span><div class="pz-pila">${calcs.join("")}</div></div>` +
      nota({ en: "mejor" }, s.mejor, s.mejorTipo || "ok") });
  }
  (cfg.extras || []).forEach((e) => esc.push(e));
  esc.push({ en: cfg.r ? "r" : "fin", html: kicker("Cierre") + titulo("Resumen") +
    (cfg.r ? `<pre class="pz-code"${at("r")}><code>${cfg.r}</code></pre>` : "") +
    nota({ en: "fin" }, cfg.cierre, "ok") });
  return esc;
}

/* ── Factorial a × b ─────────────────────────────────────────────────── */
/* Tabla ANOVA de factorial: filas [nombre, SC, gl, CM, F, p, marcaF, marcaHL] */
function anovaFact(filas, dd = 3) {
  return tabla(["Fuente", "SC", "gl", "CM", "F₀", "Valor-p"], filas.map((f) => {
    const [nom, sc, gl, cm, F, pv, m, hlm] = f;
    return [nom, c(typeof sc === "number" ? n(sc, dd) : sc, m || "tabla"), c(gl, m || "tabla"), c(cm == null ? "" : n(cm, dd), m || "tabla"),
      c(F == null ? "" : `<strong>${n(F, 2)}</strong>`, m || "tabla", hlm ? { hl: hlm } : {}), c(pv || "", m || "tabla")];
  }));
}
/* Escenas de diseño + modelo para factorial */
function factDis(A, B, a, b, r, disR) {
  const m = disR ? "dis-r" : "dis";
  return { en: "dis", html: kicker("Identificar el diseño") + titulo(`Factorial ${a} × ${b} con ${r} réplicas`) +
    `<div class="pz-cols">` +
    lista([
      [m, `Factor A: <span class="pz-am">${A}</span> · ${$("a=" + a)}`],
      [m, `Factor B: <span class="pz-ce">${B}</span> · ${$("b=" + b)}`],
      [m, `Réplicas: ${$("n=" + r)} · ${$("N=abn=" + a * b * r)} corridas`]
    ]) +
    div({}, formula({ en: "modelo" }, "Y_{ijk}=\\mu+\\alpha_i+\\beta_j+(\\alpha\\beta)_{ij}+\\varepsilon_{ijk}") +
      formula({ en: "h0a" }, "H_0:\\alpha_i=0\\;\\forall i") + formula({ en: "h0b" }, "H_0:\\beta_j=0\\;\\forall j") +
      formula({ en: "h0ab" }, "H_0:(\\alpha\\beta)_{ij}=0\\;\\forall ij")) + "</div>" };
}

module.exports = Object.assign({}, L, { c, portada, enunciado, k, dbcaEj, anovaFact, factDis });
