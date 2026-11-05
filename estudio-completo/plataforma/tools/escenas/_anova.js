/* Pizarras de ANOVA de un factor (ejercicios del cap. 3 del libro guía), con cada número a la vista. */
"use strict";
const E = require("./_ej");
const A = require("./_anim");
const { n, nt, $, c, kicker, titulo, tabla, formula, nota, p, lista, div, anova1, portada, enunciado } = E;

function anovaEj(cfg, ctx) {
  const R = anova1(cfg.Y), T = cfg.trat, k = R.k, r = R.n;
  const LSD = cfg.tc * Math.sqrt(2 * R.CME / r);
  const nb = (x) => n(x, 2);
  const esc = [
    portada(cfg.ej, cfg.titulo, "ANOVA de un factor · pregunta adicional de P3"),
    enunciado(cfg.ej, cfg.enun, tabla([cfg.nomTrat].concat(cfg.Y[0].map((_, j) => "R" + (j + 1))), cfg.Y.map((f, i) => [{ v: T[i], th: true }].concat(f.map(nb))), "pz-chica")),
    { en: "dis", html: kicker("Identificar el diseño") + titulo("Un factor, completamente al azar") +
      `<div class="pz-cols">` + lista([["dis", `Factor: <span class="pz-am">${cfg.nomFactor}</span> · ${$("k=" + k)}`], ["dis", `Réplicas: ${$("n=" + r)} · ${$("N=" + R.N)}`]]) +
      div({}, formula({ en: "modelo" }, "Y_{ij}=\\mu+\\tau_i+\\varepsilon_{ij}") + formula({ en: "h0" }, `H_0:\\mu_1=\\dots=\\mu_{${k}}`)) + "</div>" }
  ];
  /* Totales: cada fila se suma término a término y su total vuela a la tabla */
  const t1 = ctx.T("tot-i"), t2 = ctx.T("tot-g"), len = Math.max((t2 - t1 - 0.5) / k, 1.3);
  const sumas = [], tTi = [];
  for (let i = 0; i < k; i++) {
    const ini = 0.3 + i * len, paso = Math.min(0.4, (len * 0.55) / r);
    const tiempos = cfg.Y[i].map((_, j) => `tot-i@${(ini + j * paso).toFixed(2)}`), tRes = `tot-i@${(ini + r * paso + 0.1).toFixed(2)}`;
    tTi[i] = A.mas(tRes, 0.35);
    sumas.push(A.sumaVuela({ etiqueta: `${$(`Y_{${i + 1}\\cdot}`)} <span class="pz-tenue">(${T[i]})</span>`, terms: cfg.Y[i].map((v, j) => ({ v, desde: `d${i}-${j}` })), tiempos, tRes, idRes: `sti${i}`,
      hasta: i < k - 1 ? `tot-i@${(0.3 + (i + 1) * len).toFixed(2)}` : "tot-g@0.2" }));
  }
  const gp = Math.min(0.45, Math.max(ctx.T("corr") - ctx.T("tot-g") - 1.4, 1) / k);
  sumas.push(A.sumaVuela({ etiqueta: $("Y_{\\cdot\\cdot}"), terms: R.Ti.map((v, i) => ({ v, desde: `ti${i}` })), tiempos: R.Ti.map((_, i) => `tot-g@${(0.3 + i * gp).toFixed(2)}`), tRes: `tot-g@${(0.4 + k * gp).toFixed(2)}`, idRes: "sg" }));
  const tG = `tot-g@${(0.75 + k * gp).toFixed(2)}`;
  esc.push({ en: "tot", html: kicker("Paso 1 · Totales") + titulo("Sumar cada tratamiento y todo") +
    tabla([cfg.nomTrat].concat(cfg.Y[0].map((_, j) => "R" + (j + 1)), [{ v: $("Y_{i\\cdot}"), tot: true }]),
      cfg.Y.map((f, i) => [{ v: T[i], th: true }].concat(f.map((x, j) => ({ v: nb(x), id: `d${i}-${j}` })), [{ v: nb(R.Ti[i]), tot: true, en: tTi[i], desde: `sti${i}`, id: `ti${i}` }]))
        .concat([[{ v: "Total", th: true }].concat(cfg.Y[0].map(() => ""), [{ v: nb(R.G), tot: true, en: tG, desde: "sg" }])]), "pz-chica") +
    `<div class="pz-caja-calc"><span class="pz-etq">suma</span><div class="pz-pila">${sumas.join("")}</div></div>` });
  /* Sumas de cuadrados */
  const lenTr = Math.max(ctx.T("sce") - ctx.T("sctr"), 1.5), pTr = Math.min(0.5, (lenTr * 0.45) / k);
  const tiTr = R.Ti.map((_, i) => `sctr@${(0.4 + i * pTr).toFixed(2)}`), sumTr = `sctr@${(0.5 + k * pTr).toFixed(2)}`, resTr = A.mas(sumTr, 1.1);
  esc.push({ en: "corr", html: kicker("Paso 2 · Sumas de cuadrados") + titulo("Todo sale de los totales") +
    `<div class="pz-cols pz-cols-64"><div class="pz-col" style="gap:1.4cqh">` +
    `<div class="pz-suma"><span class="pz-tenue">${$("Y_{i\\cdot}:")}</span> ` + R.Ti.map((v, i) => `<span class="pz-chip" data-id="ci${i}">${nb(v)}</span>`).join("") +
      ` &nbsp;<span class="pz-tenue">${$("Y_{\\cdot\\cdot}=")}</span> <span class="pz-chip" data-id="cg">${nb(R.G)}</span></div>` +
    A.calc({ partes: [["corr", "\\dfrac{Y_{\\cdot\\cdot}^2}{N}="], ["corr@0.8", `\\dfrac{${nt(R.G, 2)}^2}{${R.N}}`]], tRes: "corr@1.7", res: n(R.C), idRes: "rs-c" }) +
    A.calc({ partes: [["sct", "SC_T=\\sum Y_{ij}^2-\\tfrac{Y_{\\cdot\\cdot}^2}{N}="], ["sct@0.9", `${nt(R.ssy)}-${nt(R.C)}`]], tRes: "sct@1.7", res: n(R.SST), idRes: "rs-t" }) +
    A.sumaVuela({ etiqueta: $("\\sum Y_{i\\cdot}^2"), terms: R.Ti.map((v, i) => ({ v, desde: `ci${i}` })), cuadrado: true, tiempos: tiTr, tRes: sumTr, idRes: "q-tr" }) +
    A.calc({ partes: [[A.mas(sumTr, 0.4), `SC_{TRAT}=\\dfrac{${nt(R.sTi2)}}{\\color{#ffd166}{n=${r}}}-${nt(R.C)}`]], tRes: resTr, res: n(R.SStr), idRes: "rs-tr" }) +
    A.calc({ partes: [["sce", "SC_E=SC_T-SC_{TRAT}="], ["sce@0.8", `${nt(R.SST)}-${nt(R.SStr)}`]], tRes: "sce@1.6", res: n(R.SSE), idRes: "rs-e" }) +
    `</div><div class="pz-col">` + tabla(["Fuente", "SC"], [[cfg.NomFactor, { v: n(R.SStr), en: A.mas(resTr, 0.8), desde: "rs-tr" }], ["Error", { v: n(R.SSE), en: "sce@2.4", desde: "rs-e" }],
      ["Total", { v: n(R.SST), en: "sct@2.5", desde: "rs-t" }]], "pz-chica") + "</div></div>" });
  /* Tabla ANOVA */
  const tcm = A.reparto(ctx, "cm", "f", 2, 0.2);
  const AN = A.anovaAnimada({ ctx, pref: "an", filas: [
    { nombre: cfg.NomFactor, sc: R.SStr, gl: R.gT, tGl: "gl", tCM: tcm[0], tF: "f", p: cfg.pv, tP: "fc@0.6", hlF: ["f", "lsd"] },
    { nombre: "E", sc: R.SSE, gl: R.gE, tGl: "gl@1", tCM: tcm[1], error: true }], total: { sc: R.SST, gl: R.N - 1, tGl: "gl@1.8" } });
  esc.push({ en: "gl", html: kicker("Paso 3 · Tabla ANOVA") + titulo("CM = SC / gl · F = CM / CM<sub>E</sub>") + AN.tabla.replace(">E<", ">Error<") + AN.calcs +
    p({ en: "fc", clase: "pz-tenue" }, `F crítico (${R.gT}, ${R.gE}) = ${n(cfg.crit, 2)}`) +
    nota({ en: "conc" }, `${n(R.F, 2)} &gt; ${n(cfg.crit, 2)} ⇒ <strong>se rechaza H₀</strong>: ${cfg.concTxt}`, "ok") });
  /* LSD: cada diferencia se calcula y vuela a la tabla */
  const np = cfg.pares.length, tp = A.reparto(ctx, "pares", cfg.finPares, np, 0.2);
  const calcs = cfg.pares.map(([i, j], q) => A.calc({ partes: [[tp[q], `|\\bar Y_{${i + 1}}-\\bar Y_{${j + 1}}|=|${nt(R.m[i])}-${nt(R.m[j])}|`]], tRes: A.mas(tp[q], 0.5), res: n(Math.abs(R.m[i] - R.m[j]), 3), idRes: `dp${q}`,
    hasta: q < np - 1 ? tp[q + 1] : cfg.finPares }));
  esc.push({ en: "lsd", html: kicker("Paso 4 · Comparaciones") + titulo(cfg.lsdTitulo || "¿Qué niveles difieren?") +
    A.calc({ partes: [["lsd", "LSD=t_{0{,}025;\\,gl_E}\\sqrt{\\tfrac{2\\,CM_E}{n}}="], ["lsd-n", `${nt(cfg.tc)}\\sqrt{\\tfrac{2\\cdot${nt(R.CME, 4)}}{${r}}}`]], tRes: "lsd-n@1.2", res: n(LSD), idRes: "lsdv" }) +
    `<div class="pz-cols">` +
    tabla([cfg.NomFactor, `Media = ${$("Y_{i\\cdot}/n")}`], R.m.map((m, i) => [T[i], m, i]).sort((a, b) => b[1] - a[1]).map(([t, m, i]) => [c(t, "medias"), c(`<span class="pz-tenue">${nb(R.Ti[i])}/${r} =</span> ${n(m, 3)}`, "medias")]), "pz-chica") +
    tabla(["Par", "|dif.|", "¿&gt; LSD?"], cfg.pares.map(([i, j, mk], q) => {
      const d = Math.abs(R.m[i] - R.m[j]), si = d > LSD;
      return [c(`${T[i]} − ${T[j]}`, tp[q], si ? {} : { hl: [mk || tp[q]] }), { v: n(d, 3), en: A.mas(tp[q], 1.2), desde: `dp${q}` }, c(si ? "Sí" : "No", A.mas(tp[q], 1.5), { clase: si ? "pz-ve" : "pz-ro" })];
    }), "pz-chica") + "</div>" +
    `<div class="pz-caja-calc"><span class="pz-etq">diferencia</span><div class="pz-pila">${calcs.join("")}</div></div>` +
    (cfg.notasLSD || []).map(([m, h, t]) => nota({ en: m }, h, t)).join("") });
  esc.push({ en: "sup", html: kicker("Supuestos y cierre") + titulo("Residuos") +
    tabla(["Prueba", "Valor-p", ""], cfg.sup.map(([pr, pv, m]) => [c(pr, m), c(pv, m), c("✓", m, { clase: "pz-ve" })]), "pz-chica") +
    nota({ en: "fin" }, cfg.cierre, "ok") });
  return esc;
}
module.exports = Object.assign({}, E, { anovaEj });
