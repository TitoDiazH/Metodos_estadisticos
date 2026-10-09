#!/usr/bin/env node
/* ============================================================================
   cobertura.js — Cruza la plataforma con el mapa del curso (../CONTENIDOS.md §2).
   · Cada fila de las tablas «#### Mnn · …» es un concepto del curso: Mnn.k
     (k = número de fila). Los conceptos de la app declaran cubre:["M13.2"].
   · ERROR si un módulo YA redactado deja filas sin cubrir (y sin justificar en
     «sinCobertura»), si «cubre» apunta a una fila inexistente, o si falta algún
     tipo de pregunta en el banco.
   · AVISO (no falla) por los módulos del temario aún sin redactar y por los
     conceptos con menos de 2 preguntas (metas de las Fases 5 y 6).
     node tools/cobertura.js              informe
     node tools/cobertura.js --estricto   además falla si queda algo pendiente
     node tools/cobertura.js --filas M13  lista las filas de un módulo con su código
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const { RAIZ, cargar, informe } = require("./lib/cargar");

const ESTRICTO = process.argv.includes("--estricto");
const iFilas = process.argv.indexOf("--filas");
const { P, errores: errCarga } = cargar();
const E = [...errCarga], A = [];
const D = P.datos;

/* ── Leer CONTENIDOS.md §2 ──────────────────────────────────────────── */
const rutaCont = path.resolve(RAIZ, "..", "CONTENIDOS.md");
const curso = {};   // "M13" → { titulo, filas: ["texto del concepto", …] }
try {
  let actual = null, enTabla = 0;
  fs.readFileSync(rutaCont, "utf8").split("\n").forEach((linea) => {
    const h = /^####\s+(M\d{2})\s+·\s+(.*)$/.exec(linea);
    if (h) { actual = curso[h[1]] = { titulo: h[2].replace(/\s*\([^)]*\)\s*$/, ""), filas: [] }; enTabla = 0; return; }
    if (/^#{1,4}\s/.test(linea)) { actual = null; return; }
    if (!actual) return;
    if (linea.startsWith("|")) {
      enTabla++;
      if (enTabla > 2) actual.filas.push(linea.split("|")[1].trim());   // 1 = encabezado, 2 = separador
    } else if (linea.trim() === "") { if (enTabla) actual = null; }
  });
} catch (e) { E.push(`No se pudo leer ${rutaCont}: ${e.message}`); }

if (iFilas >= 0) {
  const cod = (process.argv[iFilas + 1] || "").toUpperCase();
  if (!curso[cod]) { console.log(`No existe ${cod} en CONTENIDOS.md §2.`); process.exit(1); }
  console.log(`${cod} · ${curso[cod].titulo}`);
  curso[cod].filas.forEach((f, i) => console.log(`  ${cod}.${i + 1}  ${f}`));
  process.exit(0);
}

/* ── Qué cubre la plataforma ────────────────────────────────────────── */
const codigoDe = (id) => id.split("-")[0].toUpperCase();          // "m13-k-medias" → "M13"
const cubierto = {};                                             // "M13.2" → [ids de concepto]
const pregPorConcepto = {};
D.pregunta.forEach((q) => { if (!q.retirada && q.concepto) pregPorConcepto[q.concepto] = (pregPorConcepto[q.concepto] || 0) + 1; });

const filas = [];
let pendientesTemario = 0, conceptosFlojos = 0;
const temario = {};
D.prueba.forEach((pr) => (pr.modulos || []).forEach((t) => { temario[t.id] = temario[t.id] || { t, pruebas: [] }; temario[t.id].pruebas.push(pr.id); }));

Object.keys(temario).sort().forEach((id) => {
  const { t, pruebas } = temario[id], m = P.modulo(id), cod = t.codigo || codigoDe(id), mapa = curso[cod];
  if (!mapa) A.push(`[${id}] su código ${cod} no existe en CONTENIDOS.md §2.`);
  const total = mapa ? mapa.filas.length : 0;
  if (!m) {
    pendientesTemario++;
    filas.push([cod, pruebas.join("+"), t.prioridad || "", "—", `0/${total}`, "—", "—", "—", "pendiente"]);
    return;
  }
  const justificadas = {};
  (m.sinCobertura || []).forEach((x) => { justificadas[x.ref] = x.motivo; if (!x.motivo) E.push(`[${id}] sinCobertura ${x.ref} sin motivo`); });
  (m.conceptos || []).forEach((c) => {
    (c.cubre || []).forEach((ref) => {
      const mm = /^(M\d{2})\.(\d+)$/.exec(ref);
      if (!mm || !curso[mm[1]] || Number(mm[2]) < 1 || Number(mm[2]) > curso[mm[1]].filas.length) E.push(`[${c.id}] «cubre» apunta a ${ref}, que no existe en CONTENIDOS.md §2`);
      else (cubierto[ref] = cubierto[ref] || []).push(c.id);
    });
    if (!(c.cubre || []).length) A.push(`[${c.id}] no declara «cubre»: no se sabe a qué fila de CONTENIDOS.md corresponde.`);
    const n = pregPorConcepto[c.id] || 0;
    if (n < 2) { conceptosFlojos++; A.push(`[${c.id}] «${c.titulo}» tiene ${n} pregunta(s) asociada(s) (meta Fase 6: ≥ 2).`); }
  });
  let ok = 0;
  for (let k = 1; k <= total; k++) {
    const ref = `${cod}.${k}`;
    if (cubierto[ref] || justificadas[ref]) ok++;
    else E.push(`[${id}] fila ${ref} de CONTENIDOS.md sin cobertura: «${mapa.filas[k - 1].slice(0, 90)}»`);
  }
  const preg = P.preguntasDeModulo(id, true);
  filas.push([cod, pruebas.join("+"), m.prioridad, (m.conceptos || []).length, `${ok}/${total}`,
    preg.filter((q) => q.tipo !== "desarrollo").length, preg.filter((q) => q.tipo === "desarrollo").length,
    D.memorizar.filter((x) => x.modulo === id).length + " / " + D.rlab.filter((x) => x.modulo === id).length, "redactado"]);
});

/* ── Tipos de pregunta presentes ────────────────────────────────────── */
const porTipo = {};
D.pregunta.forEach((q) => { if (!q.retirada) porTipo[q.tipo] = (porTipo[q.tipo] || 0) + 1; });
Object.keys(P.TIPOS_PREGUNTA).forEach((t) => { if (!porTipo[t]) E.push(`No hay ninguna pregunta de tipo «${t}» en el banco.`); });

/* ── Citas por fuente (clases y ayudantías) ─────────────────────────── */
const porFuente = {};
const sumar = (lista, k) => (lista || []).forEach((f) => { const o = porFuente[f.id] = porFuente[f.id] || { c: 0, q: 0 }; o[k]++; });
D.modulo.forEach((m) => (m.conceptos || []).forEach((c) => sumar(c.fuente, "c")));
D.pregunta.forEach((q) => { if (!q.retirada) sumar(q.fuente, "q"); });

/* ── Informe ────────────────────────────────────────────────────────── */
const tabla = (cab, datos) => {
  const anchos = cab.map((c, i) => Math.max(String(c).length, ...datos.map((f) => String(f[i]).length)));
  const fila = (f) => "  " + f.map((x, i) => String(x).padEnd(anchos[i])).join("  ");
  console.log(fila(cab)); console.log("  " + anchos.map((a) => "─".repeat(a)).join("  ")); datos.forEach((f) => console.log(fila(f)));
};
console.log("\nCobertura por módulo del temario (filas = conceptos de CONTENIDOS.md §2 cubiertos)");
tabla(["Mód.", "Prueba", "Prioridad", "Conceptos", "Filas", "Preg.", "Desarr.", "Mem/Rlab", "Estado"], filas);
console.log("\nPreguntas por tipo: " + Object.keys(P.TIPOS_PREGUNTA).map((t) => `${t} ${porTipo[t] || 0}`).join(" · "));
console.log("\nCitas por fuente de clase/ayudantía (conceptos · preguntas)");
tabla(["Fuente", "Conceptos", "Preguntas"], D.fuente.filter((f) => f.tipo === "clase" || f.tipo === "ayudantia")
  .map((f) => [f.id, (porFuente[f.id] || {}).c || 0, (porFuente[f.id] || {}).q || 0]));
console.log("");

if (pendientesTemario) A.unshift(`${pendientesTemario} módulo(s) del temario aún sin redactar (Fase 5).`);
if (ESTRICTO && (pendientesTemario || conceptosFlojos)) E.push(`--estricto: quedan ${pendientesTemario} módulo(s) sin redactar y ${conceptosFlojos} concepto(s) con menos de 2 preguntas.`);
const redactados = filas.filter((f) => f[8] === "redactado").length;
informe("cobertura", E, A, `${redactados} de ${filas.length} módulos del temario redactados; en ellos, ninguna fila de CONTENIDOS.md sin cubrir`.replace(/; en ellos.*/, E.length ? "" : "; en ellos, ninguna fila de CONTENIDOS.md sin cubrir"));
