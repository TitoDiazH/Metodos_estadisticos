/* Pizarras de ANOVA de un factor (ejercicios del cap. 3 del libro guía). */
"use strict";
const E = require("./_ej");
const { n, nt, $, c, k, kicker, titulo, tabla, formula, nota, paso, p, lista, div, anova1, portada, enunciado } = E;

/* cfg: { ej, titulo, Y, trat, nomTrat, enun, crit, pv, tc, lsdMarcas: {pares:[[par, sig, marca]]}, mejor, extrasLSD, sup } */
function anovaEj(cfg) {
  const R = anova1(cfg.Y), T = cfg.trat;
  const LSD = cfg.tc * Math.sqrt(2 * R.CME / R.n);
  const datos = (conTot) => tabla([cfg.nomTrat].concat(cfg.Y[0].map((_, j) => "R" + (j + 1)), conTot ? [{ v: $("Y_{i\\cdot}"), tot: true }, { v: $("\\bar Y_{i\\cdot}"), tot: true }] : []),
    cfg.Y.map((f, i) => [{ v: T[i], th: true }].concat(f.map((x) => n(x, 2)), conTot ? [c(n(R.Ti[i], 2), "tot-i", { tot: true, hl: ["sctr", "sce"] }), c(n(R.m[i], 3), "medias", { tot: true })] : []))
      .concat(conTot ? [[{ v: "Total", th: true }].concat(cfg.Y[0].map(() => ""), [c(n(R.G, 2), "tot-g", { tot: true, hl: ["corr", "sct"] }), ""])] : []), "pz-chica");
  const esc = [
    portada(cfg.ej, cfg.titulo, "ANOVA de un factor · pregunta adicional de P3"),
    enunciado(cfg.ej, cfg.enun, datos(false)),
    { en: "dis", html: kicker("Identificar el diseño") + titulo("Un factor, completamente al azar") +
      `<div class="pz-cols">` + lista([["dis", `Factor: <span class="pz-am">${cfg.nomFactor}</span> · ${$("k=" + R.k)}`], ["dis", `Réplicas: ${$("n=" + R.n)} · ${$("N=" + R.N)}`]]) +
      div({}, formula({ en: "modelo" }, "Y_{ij}=\\mu+\\tau_i+\\varepsilon_{ij}") + formula({ en: "h0" }, `H_0:\\mu_1=\\dots=\\mu_{${R.k}}`)) + "</div>" },
    { en: "tot", html: kicker("Totales y sumas de cuadrados") + titulo("Del gran total al error") +
      `<div class="pz-cols"><div class="pz-col">${datos(true)}</div><div class="pz-col">` +
      paso(1, "corr", $(`\\tfrac{Y_{\\cdot\\cdot}^2}{N}=\\tfrac{${nt(R.G, 2)}^2}{${R.N}}=${nt(R.C)}`)) +
      paso(2, "sct", $(`SC_T=${nt(R.ssy)}-${nt(R.C)}=\\mathbf{${nt(R.SST)}}`)) +
      paso(3, "sctr", $(`SC_{TRAT}=\\tfrac{${nt(R.sTi2)}}{\\color{#ffd166}{n=${R.n}}}-${nt(R.C)}=\\mathbf{${nt(R.SStr)}}`)) +
      paso(4, "sce", $(`SC_E=SC_T-SC_{TRAT}=\\mathbf{${nt(R.SSE)}}`)) + "</div></div>" },
    { en: "gl", html: kicker("Tabla ANOVA") + titulo("¿El factor influye?") +
      tabla(["Fuente", "SC", "gl", "CM", "F₀", "Valor-p"], [
        [cfg.NomFactor, n(R.SStr), c(R.gT, "gl"), c(n(R.CMt), "cm"), c(`<strong>${n(R.F, 2)}</strong>`, "f", { hl: ["f", "lsd"] }), c(cfg.pv, "fc")],
        ["Error", n(R.SSE), c(R.gE, "gl"), c(n(R.CME), "cm", { hl: ["f", "fc"] }), "", ""], ["Total", n(R.SST), R.N - 1, "", "", ""]]) +
      p({ en: "fc", clase: "pz-tenue" }, `F crítico (${R.gT}, ${R.gE}) = ${n(cfg.crit, 2)}`) +
      nota({ en: "conc" }, `${n(R.F, 2)} &gt; ${n(cfg.crit, 2)} ⇒ <strong>se rechaza H₀</strong>: ${cfg.concTxt}`, "ok") },
    { en: "lsd", html: kicker("Comparaciones") + titulo(cfg.lsdTitulo || "¿Qué niveles difieren?") +
      formula({ en: "lsd-n" }, `LSD=t_{0{,}025;\\,${R.gE}}\\sqrt{\\frac{2\\,CM_E}{n}}=${nt(cfg.tc)}\\sqrt{\\frac{2\\cdot${nt(R.CME, 4)}}{${R.n}}}=\\mathbf{${nt(LSD)}}`) +
      `<div class="pz-cols">` +
      tabla([cfg.NomFactor, "Media"], R.m.map((m, i) => [T[i], m]).sort((a, b) => b[1] - a[1]).map(([t, m]) => [c(t, "medias"), c(n(m, 3), "medias")]), "pz-chica") +
      tabla(["Par", "|dif.|", "¿Difieren?"], cfg.pares.map(([i, j, mk]) => {
        const d = Math.abs(R.m[i] - R.m[j]), si = d > LSD;
        return [c(`${T[i]} − ${T[j]}`, mk || "pares", si ? {} : { hl: [mk || "pares"] }), c(n(d, 3), mk || "pares"), c(si ? "Sí" : "No", mk || "pares", { clase: si ? "pz-ve" : "pz-ro" })];
      }), "pz-chica") + "</div>" + (cfg.notasLSD || []).map(([m, h, t]) => nota({ en: m }, h, t)).join("") },
    { en: "sup", html: kicker("Supuestos y cierre") + titulo("Residuos") +
      tabla(["Prueba", "Valor-p", ""], cfg.sup.map(([pr, pv, m]) => [c(pr, m), c(pv, m), c("✓", m, { clase: "pz-ve" })]), "pz-chica") +
      nota({ en: "fin" }, cfg.cierre, "ok") }
  ];
  return esc;
}
module.exports = Object.assign({}, E, { anovaEj });
