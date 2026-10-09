#!/usr/bin/env node
/* ============================================================================
   verificar_fuentes.js — Citas: todo id citado existe en data/fuentes.js, todo
   concepto/pregunta/ítem tiene ≥1 fuente, las externas traen título+URL+fecha,
   y cada archivo de fuentes.js existe en disco con ese nombre EXACTO.
     node tools/verificar_fuentes.js
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const { RAIZ, cargar, informe } = require("./lib/cargar");

const { P, errores: errCarga } = cargar();
const E = [...errCarga], A = [];
const D = P.datos;
const existe = {};
D.fuente.forEach((f) => { existe[f.id] = f; });
let citas = 0;
const usadas = {};

function revisar(lista, dueno, que, obligatoria) {
  if (!Array.isArray(lista) || !lista.length) {
    if (obligatoria) E.push(`[${dueno}] ${que}: sin fuente`);
    return;
  }
  lista.forEach((f) => {
    citas++;
    if (!f || !f.id) return E.push(`[${dueno}] ${que}: cita sin id`);
    if (f.id === "EXT") {
      if (!f.titulo || !f.url || !f.consultado) E.push(`[${dueno}] ${que}: fuente externa sin titulo/url/consultado`);
      return;
    }
    if (!existe[f.id]) E.push(`[${dueno}] ${que}: cita «${f.id}», que no está en data/fuentes.js`);
    else usadas[f.id] = true;
    if (f.loc != null && typeof f.loc !== "string") E.push(`[${dueno}] ${que}: «loc» debe ser texto`);
  });
}

D.modulo.forEach((m) => {
  revisar(m.fuentes, m.id, "módulo", true);
  (m.conceptos || []).forEach((c) => revisar(c.fuente, c.id, "concepto", true));
  (m.errores || []).forEach((x, i) => revisar(x.fuente, m.id, `error frecuente ${i + 1}`, false));
});
D.pregunta.forEach((q) => {
  revisar(q.fuente, q.id, "pregunta", true);
  if (q.origen === "variacion") revisar(q.base, q.id, "base de la variación", true);
});
D.memorizar.forEach((x) => revisar(x.fuente, x.id, "memorizar", true));
D.rlab.forEach((x) => revisar(x.fuente, x.id, "rlab", true));
D.diferencia.forEach((x) => revisar(x.fuentes, x.id, "diferencia", true));
D.prueba.forEach((p) => (p.observado || []).forEach((t) => revisar(t.fuente, p.id, `observado ${t.codigo}`, true)));

/* ── Archivos en disco (nombre exacto, sin normalizar tildes) ───────── */
D.fuente.forEach((f) => {
  if (!f.ruta) return E.push(`[${f.id}] fuente sin ruta`);
  const abs = path.resolve(RAIZ, f.ruta), dir = path.dirname(abs), base = path.basename(abs);
  let nombres = [];
  try { nombres = fs.readdirSync(dir); } catch (e) { return E.push(`[${f.id}] no existe la carpeta ${path.dirname(f.ruta)}`); }
  if (nombres.includes(base)) return;
  const parecido = nombres.find((n) => n.normalize("NFC") === base.normalize("NFC"));
  E.push(parecido
    ? `[${f.id}] el archivo existe pero con otra codificación de tildes; copia el nombre exacto con «ls» en data/fuentes.js`
    : `[${f.id}] no existe el archivo ${f.ruta}`);
});

const sinUso = D.fuente.filter((f) => !usadas[f.id]).length;
informe("verificar_fuentes", E, A, `${citas} citas revisadas · ${D.fuente.length} fuentes inventariadas (${sinUso} aún sin citar)`);
