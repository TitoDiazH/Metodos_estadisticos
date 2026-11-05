#!/usr/bin/env node
/* ============================================================================
   generar_escenas.js — Compila las pizarras animadas.
     tools/escenas/<guion>.js  →  data/escenas/<guion>.js
   Comprueba que cada marca usada (en, data-en, data-hl, data-fuera) exista en
   tools/guiones/<guion>.txt como {marca} o [ver marca], y avisa de las marcas
   del guion que ninguna escena usa.
     node tools/generar_escenas.js            # todas
     node tools/generar_escenas.js m20        # las que empiezan así
   Después: node tools/generar_manifiesto.js si apareció un archivo nuevo.
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");

const RAIZ = path.resolve(__dirname, "..");
const ESC = path.join(__dirname, "escenas");
const GUIONES = path.join(__dirname, "guiones");
const SALIDA = path.join(RAIZ, "data", "escenas");

const filtro = process.argv.slice(2);
const specs = fs.readdirSync(ESC).filter((f) => f.endsWith(".js") && !f.startsWith("_") &&
  (!filtro.length || filtro.some((x) => f.startsWith(x))));
let errores = 0;

function leerAudio(id) {
  const ruta = path.join(RAIZ, "data", "audio", id + ".js");
  if (!fs.existsSync(ruta)) return null;
  const txt = fs.readFileSync(ruta, "utf8");
  return JSON.parse(txt.slice(txt.indexOf("{"), txt.lastIndexOf("}") + 1));
}
/* ctx.T("m") → segundos; ctx.paso("m1", "m2", i, n, margen) → "m1@x": el i-ésimo de n instantes repartidos entre m1 y m2. */
function contexto(audio) {
  const M = audio.marcas || {};
  const T = (m) => { if (!(m in M)) throw new Error(`marca «${m}» sin tiempo`); return M[m]; };
  const paso = (a, b, i, n, margen = 0.4) => {
    const ini = T(a) + margen, fin = Math.max(ini + 0.3 * n, T(b) - 0.3);
    return `${a}@${(ini - T(a) + ((fin - ini) * i) / Math.max(n, 1)).toFixed(2)}`;
  };
  const tras = (a, seg) => `${a}@${seg.toFixed(2)}`;
  return { T, paso, tras, marcas: M };
}
fs.mkdirSync(SALIDA, { recursive: true });

for (const f of specs) {
  const id = f.replace(/\.js$/, "");
  const guion = path.join(GUIONES, id + ".txt");
  if (!fs.existsSync(guion)) { console.error(`✗ ${id}: no existe tools/guiones/${id}.txt`); errores++; continue; }
  const texto = fs.readFileSync(guion, "utf8");
  const marcas = new Set([...texto.matchAll(/\{([a-z0-9][a-z0-9-]*)\}/g), ...texto.matchAll(/^\[ver\s+([a-z0-9][a-z0-9-]*)\]/gm)].map((m) => m[1]));
  for (const k of Object.keys(require.cache)) if (k.startsWith(ESC)) delete require.cache[k];
  let spec = require(path.join(ESC, f));
  if (typeof spec === "function") {
    /* La especificación puede ser función de los tiempos del audio (para repartir pasos entre marcas). */
    const audio = leerAudio(id);
    if (!audio) { console.error(`✗ ${id}: necesita data/audio/${id}.js (corre tools/generar_audio.py)`); errores++; continue; }
    spec = spec(contexto(audio));
  }
  const usadas = new Set();
  const falta = [];
  spec.escenas.forEach((e, k) => {
    const base = (x) => x.split("@")[0];
    if (e.en) { usadas.add(base(e.en)); if (!marcas.has(base(e.en))) falta.push(`escena ${k + 1}: en="${e.en}"`); }
    for (const m of e.html.matchAll(/data-(?:en|fuera|hl|hasta)="([^"]+)"/g)) {
      m[1].split(/\s+/).forEach((x) => { usadas.add(base(x)); if (!marcas.has(base(x))) falta.push(`escena ${k + 1}: ${x}`); });
    }
    for (const m of e.html.matchAll(/data-desde="([^"]+)"/g)) {
      if (!e.html.includes(`data-id="${m[1]}"`)) falta.push(`escena ${k + 1}: data-desde="${m[1]}" sin data-id de origen`);
    }
    if (/\$\{|undefined|NaN/.test(e.html)) falta.push(`escena ${k + 1}: contiene «undefined», «NaN» o «\${»`);
  });
  if (falta.length) { console.error(`✗ ${id}: marcas que no están en el guion:\n   ` + [...new Set(falta)].join("\n   ")); errores++; continue; }
  const sinUso = [...marcas].filter((m) => !usadas.has(m));
  const datos = { audio: "audio-" + id, escenas: spec.escenas.map((e) => Object.assign({ en: e.en || "" }, e.clase ? { clase: e.clase } : {}, { html: e.html })) };
  fs.writeFileSync(path.join(SALIDA, id + ".js"),
    `/* GENERADO por tools/generar_escenas.js desde tools/escenas/${f} — no editar a mano. */\n` +
    `PLATAFORMA.registrar("escena", ${JSON.stringify(datos, null, 1)});\n`);
  console.log(`✔ ${id}: ${spec.escenas.length} escenas` + (sinUso.length ? ` (marcas sin usar: ${sinUso.join(", ")})` : ""));
}
if (errores) process.exit(1);
