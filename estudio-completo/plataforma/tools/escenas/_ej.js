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
function dbcaEj(cfg) {
  const R = dbca(cfg.Y), d = cfg.dec || 0, dd = cfg.decSC || 3;
  const { trat, bloq } = cfg;
  const datosTabla = (conTot) => tabla([""].concat(bloq, conTot ? [{ v: $("Y_{i\\cdot}"), tot: true }] : []),
    cfg.Y.map((f, i) => [{ v: trat[i], th: true }].concat(f.map((x) => n(x, 2)), conTot ? [c(n(R.Ti[i], 2), "tot-i", { tot: true, hl: ["sctr", "scb"] })] : []))
      .concat(conTot ? [[{ v: $("Y_{\\cdot j}"), th: true }].concat(R.Bj.map((x) => c(n(x, 2), "tot-j", { tot: true, hl: ["scb", "sce"] })),
        [c(n(R.G, 2), "tot-g", { tot: true, hl: ["corr", "sct"] })])] : []), cfg.datosChica ? "pz-chica" : "");
  const esc = [];
  esc.push(portada(cfg.ej, cfg.titulo, "Diseño en bloques completos al azar (DBCA)"));
  esc.push(enunciado(cfg.ej, cfg.enun, datosTabla(false)));
  esc.push({ en: "dis", html: kicker("Identificar el diseño") + titulo(cfg.disTitulo || "¿Qué es tratamiento y qué es bloque?") +
    `<div class="pz-cols">` +
    lista([
      [cfg.disR ? "dis-r" : "dis", `Tratamiento: <span class="pz-am">${cfg.nomTrat}</span> · ${$("k=" + R.a)}`],
      [cfg.disR ? "dis-r" : "dis", `Bloque: <span class="pz-ce">${cfg.nomBloque}</span> · ${$("b=" + R.b)}`],
      [cfg.disR ? "dis-r" : "dis", `${$("N=k\\cdot b=" + R.N)} datos`]
    ]) +
    div({}, formula({ en: "modelo" }, "Y_{ij}=\\mu+\\tau_i+\\gamma_j+\\varepsilon_{ij}") +
      formula({ en: "h0t" }, `H_0:\\tau_1=\\dots=\\tau_{${R.a}}=0`) +
      formula({ en: "h0b" }, `H_0:\\gamma_1=\\dots=\\gamma_{${R.b}}=0`)) + "</div>" });
  esc.push({ en: "tot", html: kicker("Paso 1 · Totales") + titulo("Totales por " + cfg.nomTrat + ", por " + cfg.nomBloque + " y global") + datosTabla(true) });
  const sumaCuad = (m, html) => paso("", m, html).replace('<span class="pz-n"></span>', "");
  esc.push({ en: "corr", html: kicker("Paso 2 · Sumas de cuadrados") + titulo("Corrección, total, " + cfg.nomTrat + ", " + cfg.nomBloque + " y error") +
    `<div class="pz-col" style="font-size:1.05em">` +
    paso(1, "corr", $(`\\dfrac{Y_{\\cdot\\cdot}^2}{N}=\\dfrac{${nt(R.G, 2)}^2}{${R.N}}=${nt(R.C, dd)}`)) +
    paso(2, "sct", $(`SC_T=\\sum Y_{ij}^2-\\tfrac{Y_{\\cdot\\cdot}^2}{N}=${nt(R.ssy, dd)}-${nt(R.C, dd)}=\\mathbf{${nt(R.SST, dd)}}`)) +
    paso(3, "sctr", $(`SC_{TRAT}=\\dfrac{${nt(R.sTi2, dd)}}{\\color{#ffd166}{${R.b}}}-${nt(R.C, dd)}=\\mathbf{${nt(R.SStr, dd)}}`) +
      span({ en: cfg.sctrDiv ? "sctr-div" : "sctr", clase: "pz-tenue" }, ` &nbsp;÷ ${R.b} = n.º de ${cfg.nomBloque}s`)) +
    paso(4, "scb", $(`SC_B=\\dfrac{${nt(R.sBj2, dd)}}{\\color{#7cc6fe}{${R.a}}}-${nt(R.C, dd)}=\\mathbf{${nt(R.SSb, dd)}}`) +
      span({ en: "scb", clase: "pz-tenue" }, ` &nbsp;÷ ${R.a} = n.º de ${cfg.nomTrat}s`)) +
    paso(5, "sce", $(`SC_E=SC_T-SC_{TRAT}-SC_B=\\mathbf{${nt(R.SSE, dd)}}`)) + "</div>" });
  const crit = cfg.crit, pv = cfg.p;
  esc.push({ en: "gl", html: kicker("Paso 3 · Tabla ANOVA") + titulo("¿Hay diferencias?") +
    tabla(["Fuente", "SC", "gl", "CM", "F₀", "Valor-p"], [
      [cfg.NomTrat, n(R.SStr, dd), c(R.gT, "gl"), c(n(R.CMt, dd), "cm"), c(`<strong>${n(R.Ft, 2)}</strong>`, "ft", { hl: ["ft", "fb"] }), c(pv.t, "ftc")],
      [cfg.NomBloque, n(R.SSb, dd), c(R.gB, "gl"), c(n(R.CMb, dd), "cm"), c(`<strong>${n(R.Fb, 2)}</strong>`, "fb", { hl: ["fb", "fin"] }), c(pv.b, "fb")],
      ["Error", n(R.SSE, dd), c(R.gE, "gl", { hl: ["gl", "cm"] }), c(n(R.CME, dd), "cm", { hl: ["ft", "conc-b"] }), "", ""],
      ["Total", n(R.SST, dd), R.N - 1, "", "", ""]
    ]) +
    `<div class="pz-cols">` +
    nota({ en: "conc-t" }, `${cfg.NomTrat}: ${n(R.Ft, 2)} ${R.Ft > crit.t ? "&gt;" : "&lt;"} F(${R.gT},${R.gE}) = ${n(crit.t, 2)} ⇒ ${R.Ft > crit.t ? "<strong>se rechaza</strong> H₀" : "<strong>no se rechaza</strong> H₀"}`, R.Ft > crit.t ? "ok" : "mal") +
    nota({ en: "conc-b" }, `${cfg.NomBloque}: ${n(R.Fb, 2)} ${R.Fb > crit.b ? "&gt;" : "&lt;"} F(${R.gB},${R.gE}) = ${n(crit.b, 2)} ⇒ ${R.Fb > crit.b ? "el bloque <strong>sí</strong> influye" : "el bloque <strong>no</strong> influye"}`, R.Fb > crit.b ? "ok" : "mal") +
    "</div>" + p({ en: "ftc", clase: "pz-tenue" }, cfg.notaTabla || "") });
  if (cfg.lsd) {
    const s = cfg.lsd;
    esc.push({ en: "lsd", html: kicker("Paso 4 · Comparaciones") + titulo(cfg.lsdTitulo || "¿Qué " + cfg.nomTrat + "s difieren?") +
      formula({ en: "lsd-n" }, `LSD=t_{0{,}025;\\,${R.gE}}\\sqrt{\\frac{2\\,CM_E}{b}}=${nt(s.t, 3)}\\sqrt{\\frac{2\\cdot${nt(R.CME, 4)}}{${R.b}}}=\\mathbf{${nt(s.valor, 3)}}`) +
      `<div class="pz-cols">` +
      tabla([cfg.NomTrat, "Media"], R.mT.map((m, i) => [trat[i], n(m, 3)]).sort((a, b) => b[1].replace(",", ".") - a[1].replace(",", "."))
        .map((f) => f.map((v) => c(v, "medias"))), "pz-chica") +
      tabla(["Par", "|dif.|", "¿Difieren?"], s.pares.map(([par, dif, si]) => [c(par, "pares"), c(dif, "pares"), c(si ? "Sí" : "No", "pares", { clase: si ? "pz-ve" : "pz-ro" })]), "pz-chica") +
      "</div>" + nota({ en: "mejor" }, s.mejor, s.mejorTipo || "ok") });
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
