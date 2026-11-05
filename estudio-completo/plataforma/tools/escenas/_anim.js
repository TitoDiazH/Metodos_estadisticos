/* ============================================================================
   escenas/_anim.js — Patrones de animación «de dónde sale cada número».
   Los instantes son cadenas «marca@segundos» (ver js/animacion.js); mas()
   suma segundos a un instante. Cada número que se calcula aparece en una
   expresión y su resultado (data-id) vuela después a la celda donde se usa
   (data-desde).
   ========================================================================== */
"use strict";
const L = require("./_lib");
const { n, nt, $ } = L;

/* Suma segundos a un instante «marca» o «marca@x». */
function mas(t, s) { const [m, o] = String(t).split("@"); return `${m}@${((Number(o) || 0) + s).toFixed(2)}`; }
/* n instantes repartidos entre t1 y t2 (segundos reales vía ctx). */
function reparto(ctx, a, b, k, margen = 0.3) {
  const ta = ctx.T(a), tb = ctx.T(b), ini = margen, fin = Math.max(ini + 0.35 * k, tb - ta - 0.25);
  return Array.from({ length: k }, (_, i) => `${a}@${(ini + ((fin - ini) * i) / Math.max(k - 1, 1)).toFixed(2)}`);
}
const at = (o) => (o.en ? ` data-en="${o.en}"` : "") + (o.hasta ? ` data-hasta="${o.hasta}"` : "") + (o.id ? ` data-id="${o.id}"` : "") +
  (o.desde ? ` data-desde="${o.desde}"` : "") + (o.hl ? ` data-hl="${o.hl.join(" ")}"` : "") + (o.clase ? ` class="${o.clase}"` : "");
const sp = (o, html) => `<span${at(o)}>${html}</span>`;

/* Suma que se arma término a término.
   terms: [{ v, desde }] · tiempos: instante de cada término · tRes: instante del resultado
   idRes: data-id del resultado (para que vuele a la tabla) · hasta: cuándo se oculta todo · etiqueta: html a la izquierda */
function sumaVuela({ etiqueta = "", terms, tiempos, tRes, idRes, hasta, dec = 2, cuadrado = false }) {
  let h = `<div class="pz-suma"${at({ en: tiempos[0], hasta })}>${etiqueta}${etiqueta ? " = " : ""}`;
  let parcial = 0;
  const parciales = [];
  terms.forEach((t, i) => {
    const sg = t.signo || 1;
    parcial += sg * (cuadrado ? t.v * t.v : t.v);
    parciales.push(parcial);
    if (i || sg < 0) h += sp({ en: tiempos[i], clase: "pz-t-op" + (sg < 0 ? " pz-ro" : "") }, sg < 0 ? "−" : "+");
    h += sp({ en: tiempos[i], desde: t.desde, clase: t.clase }, cuadrado ? `${n(t.v, dec)}²` : n(t.v, dec));
  });
  h += sp({ en: tiempos[1] || tRes, clase: "pz-t-op" }, "=") + `<span class="pz-pila">`;
  parciales.forEach((v, i) => {
    if (i === 0 || i === parciales.length - 1) return;
    h += sp({ en: tiempos[i], hasta: tiempos[i + 1] }, `<span class="pz-tenue">${n(v, dec)}…</span>`);
  });
  h += sp({ en: tRes, id: idRes, clase: "pz-res" }, n(parcial, dec)) + "</span></div>";
  return h;
}

/* Fórmula que aparece por partes. partes: [[instante, latex]]; luego el resultado (chip con data-id). */
function calc({ partes, tRes, res, idRes, hasta, etiqueta = "", clase = "" }) {
  return `<div class="pz-suma ${clase}"${at({ en: partes[0][0], hasta })}>${etiqueta}` +
    partes.map(([t, tx]) => sp({ en: t }, $(tx))).join(" ") +
    (res != null ? ` ${sp({ en: tRes, clase: "pz-t-op" }, "=")} ` + sp({ en: tRes, id: idRes, clase: "pz-res" }, res) : "") + "</div>";
}

/* Tabla ANOVA que se llena: SC conocidas (o que vuelan desde idSC), gl, y CM/F calculados abajo.
   filas: [{ nombre, sc, gl, error?, idSC?, tSC?, tGl, tCM, tF, p?, tP?, hlF? }] (la fila de error no lleva tF).
   Los cálculos se muestran de a uno en una caja; cada uno dura al menos GAP s (si dos caen muy juntos,
   el siguiente se corre) para que su resultado alcance a volar a la tabla. */
function anovaAnimada({ ctx, filas, pref, dec = 3, total, gap = 2.3 }) {
  const E = filas.find((f) => f.error), CME = E.sc / E.gl;
  const seg = (t) => { const [m, o] = String(t).split("@"); return ctx.T(m) + (Number(o) || 0); };
  const tareas = [];
  filas.forEach((f, i) => {
    tareas.push({ tipo: "cm", f, i, t: f.tCM });
    if (!f.error) tareas.push({ tipo: "f", f, i, t: f.tF });
  });
  /* El CM del error siempre antes que cualquier F. */
  tareas.sort((x, y) => (x.tipo === "cm" && x.f.error ? -1 : 0) - (y.tipo === "cm" && y.f.error ? -1 : 0) || seg(x.t) - seg(y.t));
  const errCM = tareas.find((x) => x.tipo === "cm" && x.f.error), primF = tareas.find((x) => x.tipo === "f");
  if (primF && seg(errCM.t) > seg(primF.t) - gap) errCM.t = mas(primF.t, -gap);
  tareas.sort((x, y) => seg(x.t) - seg(y.t));
  let prev = -Infinity;
  tareas.forEach((x) => {
    const s0 = seg(x.t);
    if (s0 < prev + gap) { const [m] = String(x.t).split("@"); x.t = `${m}@${(prev + gap - ctx.T(m)).toFixed(2)}`; }
    prev = seg(x.t);
  });
  const tiempo = {};
  const html = tareas.map((x, k) => {
    const f = x.f, cm = f.sc / f.gl, id = `${pref}-${x.tipo}${x.i}`;
    tiempo[id] = x.t;
    const hasta = k < tareas.length - 1 ? tareas[k + 1].t : null;
    const h = x.tipo === "cm"
      ? calc({ partes: [[x.t, `CM_{\\text{${f.nombre}}}=\\dfrac{SC}{gl}=\\dfrac{${nt(f.sc, dec)}}{${f.gl}}`]], tRes: mas(x.t, 1.1), res: n(cm, dec), idRes: id, hasta })
      : calc({ partes: [[x.t, `F_0=\\dfrac{CM_{\\text{${f.nombre}}}}{CM_E}=\\dfrac{${nt(cm, dec)}}{${nt(CME, dec)}}`]], tRes: mas(x.t, 1.1), res: n(cm / CME, 2), idRes: id, hasta });
    return h;
  }).join("");
  const celdas = filas.map((f, i) => {
    const cm = f.sc / f.gl, tC = tiempo[`${pref}-cm${i}`], tF = tiempo[`${pref}-f${i}`];
    return [f.nombre,
      f.idSC ? { v: n(f.sc, dec), en: f.tSC, desde: f.idSC } : n(f.sc, dec),
      { v: String(f.gl), en: f.tGl },
      { v: n(cm, dec), en: mas(tC, 1.9), desde: `${pref}-cm${i}`, hl: f.error ? [mas(tC, 1.9)] : null },
      f.error ? "" : { v: `<strong>${n(cm / CME, 2)}</strong>`, en: mas(tF, 1.9), desde: `${pref}-f${i}`, hl: f.hlF || null },
      f.p ? { v: f.p, en: f.tP && seg(f.tP) > seg(tF) + 1.9 ? f.tP : mas(tF, 2.4) } : ""];
  });
  if (total) celdas.push(["Total", n(total.sc, dec), { v: String(total.gl), en: total.tGl }, "", "", ""]);
  return { tabla: L.tabla(["Fuente", "SC", "gl", "CM", "F₀", "Valor-p"], celdas), calcs: `<div class="pz-caja-calc"><span class="pz-etq">cálculo</span><div class="pz-pila">${html}</div></div>`, CME };
}

/* Muestra bloques de cálculo uno tras otro en la misma caja: cada uno se oculta cuando empieza el siguiente.
   items: [{ t, html }] (html con data-en propio); termina: instante en que se oculta el último (opcional). */
function secuencia(items, etiqueta = "cálculo", termina) {
  const h = items.map((it, i) => {
    const hasta = i < items.length - 1 ? items[i + 1].t : termina;
    return hasta ? it.html.replace(/^<div class="pz-suma([^"]*)"/, `<div class="pz-suma$1" data-hasta="${hasta}"`) : it.html;
  }).join("");
  return `<div class="pz-caja-calc"><span class="pz-etq">${etiqueta}</span><div class="pz-pila">${h}</div></div>`;
}
/* Varias sumas en serie dentro de [a, b]: cada una arma su resultado y lo manda (vuela) a su celda.
   items: [{ etiqueta, terms: [{ v, desde, signo? }], idRes }] → { sumas (html para una pila), llegada: [instante en que aterriza cada resultado] } */
function serieSumas(ctx, a, b, items, { dec = 2, finUltima } = {}) {
  const t1 = ctx.T(a), t2 = ctx.T(b), k = items.length, len = Math.max((t2 - t1 - 0.5) / k, 1.2);
  const sumas = [], llegada = [];
  items.forEach((it, i) => {
    const ini = 0.3 + i * len, nt_ = it.terms.length, paso = Math.min(0.42, (len * 0.55) / nt_);
    const tiempos = it.terms.map((_, j) => `${a}@${(ini + j * paso).toFixed(2)}`), tRes = `${a}@${(ini + nt_ * paso + 0.1).toFixed(2)}`;
    llegada.push(mas(tRes, 0.35));
    sumas.push(sumaVuela({ etiqueta: it.etiqueta, terms: it.terms, tiempos, tRes, idRes: it.idRes, dec,
      hasta: i < k - 1 ? `${a}@${(0.3 + (i + 1) * len).toFixed(2)}` : (finUltima || `${b}@0.2`) }));
  });
  return { sumas: sumas.join(""), llegada };
}
/* Corre instantes para que entre dos consecutivos haya al menos «gap» segundos (mantiene el orden). */
function espaciar(ctx, tiempos, gap = 2.2) {
  const seg = (t) => { const [m, o] = String(t).split("@"); return ctx.T(m) + (Number(o) || 0); };
  let prev = -Infinity;
  return tiempos.map((t) => {
    let s0 = seg(t);
    if (s0 < prev + gap) { const [m] = String(t).split("@"); s0 = prev + gap; t = `${m}@${(s0 - ctx.T(m)).toFixed(2)}`; }
    prev = s0;
    return t;
  });
}
/* Instante en segundos (para ordenar o comparar). */
const segundos = (ctx, t) => { const [m, o] = String(t).split("@"); return ctx.T(m) + (Number(o) || 0); };
module.exports = Object.assign({}, L, { mas, reparto, sumaVuela, calc, anovaAnimada, sp, segundos, secuencia, serieSumas, espaciar });
