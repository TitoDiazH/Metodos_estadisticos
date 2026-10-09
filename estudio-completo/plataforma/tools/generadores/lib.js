/* ============================================================================
   generadores/lib.js — Ayudantes para generar preguntas de desarrollo con datos
   variados. Cada número de una solución se CALCULA aquí (JS) o en R (cuantiles,
   p-valores), nunca se escribe a mano. Ver generar_desarrollos.js.
   ========================================================================== */
"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { spawnSync } = require("child_process");

/* ── R con caché en disco (los cuantiles no cambian entre corridas) ──── */
const RUTA_CACHE = path.join(__dirname, ".cache_r.json");
let cache = {};
try { cache = JSON.parse(fs.readFileSync(RUTA_CACHE, "utf8")); } catch (e) { cache = {}; }
function guardarCache() { fs.writeFileSync(RUTA_CACHE, JSON.stringify(cache)); }

function Rtxt(codigo) {
  if (cache[codigo] != null) return cache[codigo];
  const tmp = path.join(os.tmpdir(), `me-gen-${process.pid}-${crypto.createHash("sha1").update(codigo).digest("hex").slice(0, 8)}.R`);
  fs.writeFileSync(tmp, codigo + "\n");
  const r = spawnSync("Rscript", ["--vanilla", tmp], { encoding: "utf8", timeout: 120000, env: { ...process.env, R_LIBS_USER: process.env.R_LIBS_USER || path.join(os.homedir(), "R", "library") } });
  fs.unlinkSync(tmp);
  if (r.status !== 0) throw new Error("R falló: " + codigo + "\n" + r.stderr);
  cache[codigo] = r.stdout;
  return r.stdout;
}
/* Rv("c(qt(0.975, 15), 2)") → [2.1314…, 2] */
function Rv(expr) { return Rtxt(`cat(format(${expr}, digits = 15), sep = " ")`).trim().split(/\s+/).map(Number); }
function Rn(expr) { const v = Rv(expr); if (v.length !== 1 || !isFinite(v[0])) throw new Error("R no dio un número: " + expr); return v[0]; }

/* ── Números ─────────────────────────────────────────────────────────── */
function rd(x, d) {
  d = d == null ? 2 : d;
  const s = x < 0 ? -1 : 1;
  const v = s * Number(Math.round(Number(Math.abs(x).toFixed(10) + "e" + d)) + "e-" + d);
  return v === 0 ? 0 : v;
}
/* N(0.15) → "0{,}15" (para escribir dentro de $…$) */
function N(x, d) {
  let s = rd(x, d).toFixed(d == null ? 2 : d);
  if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
  return s.replace(".", "{,}");
}
const M = (x, d) => "$" + N(x, d) + "$";
const pct = (a) => N(a * 100, 2) + "\\,\\%";
const suma = (v) => v.reduce((a, b) => a + b, 0);
const media = (v) => suma(v) / v.length;
const varianza = (v) => { const m = media(v); return suma(v.map((x) => (x - m) ** 2)) / (v.length - 1); };
const desv = (v) => Math.sqrt(varianza(v));
const cov = (x, y) => { const mx = media(x), my = media(y); return suma(x.map((xi, i) => (xi - mx) * (y[i] - my))) / (x.length - 1); };
const euclid = (a, b) => Math.sqrt(suma(a.map((ai, i) => (ai - b[i]) ** 2)));
const manhattan = (a, b) => suma(a.map((ai, i) => Math.abs(ai - b[i])));
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const inv2 = (A) => { const d = det2(A); return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]]; };
const mv2 = (A, v) => [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
const dot = (a, b) => suma(a.map((ai, i) => ai * b[i]));
const afirmar = (c, msg) => { if (c) return; if (process.env.DEPURAR) console.error("⚠ " + msg); else throw new Error("Dato inadecuado: " + msg); };

/* ── HTML / LaTeX ────────────────────────────────────────────────────── */
function tabla(cab, filas) {
  return `<div class="tabla-scroll"><table class="tabla tabla-datos"><thead><tr>${cab.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${filas.map((f) => `<tr>${f.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
const pm = (filas, d) => "\\begin{pmatrix}" + filas.map((f) => f.map((x) => (typeof x === "number" ? N(x, d) : x)).join("&")).join("\\\\") + "\\end{pmatrix}";
const vec = (v, d) => "(" + v.map((x) => N(x, d)).join(";\\ ") + ")";
const incisos = (lista) => `<ol type="a">${lista.map((x) => `<li>${x}</li>`).join("")}</ol>`;
const p = (...t) => t.map((x) => `<p>${x}</p>`).join("");
const rvec = (v) => "c(" + v.join(", ") + ")";
const rmat = (A) => `matrix(c(${A.map((f) => f.join(", ")).join(", ")}), ${A.length}, byrow = TRUE)`;

/* ── Verificaciones: «esperado» es el número que se muestra, redondeado ── */
const vjs = (que, js, valor, d) => ({ que, js, esperado: rd(valor, d == null ? 2 : d), tol: 0.5 * 10 ** -(d == null ? 2 : d) + 1e-9 });
const vr = (que, r, valor, d) => ({ que, r: `cat(${r})`, esperado: rd(valor, d == null ? 2 : d), tol: 0.5 * 10 ** -(d == null ? 2 : d) + 1e-9 });

const ESCALA = "Reparto de 6 puntos entre las partes: es una regla de la plataforma, no proviene de una pauta.";

/* ── Registro de preguntas: los IDs se asignan en orden y NUNCA se reutilizan.
      Para agregar más variantes, añadir SIEMPRE al final de cada módulo. ── */
const MODULOS = {};
function modulo(clave, slug, titulo, primerId) { MODULOS[clave] = { slug, titulo, sig: primerId, items: [] }; }
function agregar(clave, q) {
  const m = MODULOS[clave];
  if (!m) throw new Error("módulo no declarado: " + clave);
  const id = `${clave}-d${String(m.sig++).padStart(3, "0")}`;
  const total = suma(q.partes.map((x) => x.puntos));
  if (Math.abs(total - 6) > 1e-9) throw new Error(`${id}: las partes suman ${total} puntos, no 6`);
  const html = q.enunciado + q.partes.map((x) => x.solucion).join("");
  const raro = html.match(/<(?!\/?(p|ol|li|strong|code|div|table|thead|tbody|tr|th|td)\b)[A-Za-z\/][^\s>]*/);
  if (raro) throw new Error(`${id}: «${raro[0]}» se leería como etiqueta HTML (usar \\lt dentro de fórmulas)`);
  if (/undefined|NaN|\[object/.test(html)) throw new Error(`${id}: texto con undefined/NaN`);
  const o = { id, modulo: slug(m), concepto: q.concepto, dificultad: q.dificultad, origen: q.origen || "variacion" };
  if (o.origen === "variacion") o.base = q.base || q.fuente;
  Object.assign(o, { titulo: q.titulo, enunciado: q.enunciado });
  ["codigoR", "salidaR", "salidaDe", "paquetes"].forEach((k) => { if (q[k]) o[k] = q[k]; });
  o.partes = q.partes;
  if (q.comentario) o.comentario = q.comentario;
  o.escala = ESCALA;
  if (q.verifica && q.verifica.length) o.verifica = q.verifica;
  o.fuente = q.fuente;
  m.items.push(o);
  function slug(mm) { return mm.slug; }
}

/* ── Serialización al estilo de los archivos de data/ ────────────────── */
function cadena(s) {
  if (!/[\\\n]/.test(s) && !s.includes('"')) return JSON.stringify(s);
  if (s.includes("`") || s.includes("${") || s.endsWith("\\")) return JSON.stringify(s);
  return (s.includes("\\") ? "String.raw`" : "`") + s + "`";
}
function valor(v, sangria) {
  if (typeof v === "string") return cadena(v);
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) {
    if (v.every((x) => typeof x !== "object")) return "[" + v.map((x) => valor(x)).join(", ") + "]";
    return "[\n" + v.map((x) => sangria + "  " + valor(x, sangria + "  ")).join(",\n") + "\n" + sangria + "]";
  }
  const claves = Object.keys(v);
  const plano = claves.every((k) => typeof v[k] !== "object" || k === "fuente");
  if (plano && sangria && sangria.length >= 6) return "{ " + claves.map((k) => `${k}: ${valor(v[k], sangria)}`).join(", ") + " }";
  return "{\n" + claves.map((k) => `${sangria}  ${k}: ${valor(v[k], sangria + "  ")}`).join(",\n") + "\n" + sangria + "}";
}
function emitir(dirSalida) {
  const escritos = [];
  Object.keys(MODULOS).sort().forEach((clave) => {
    const m = MODULOS[clave];
    if (!m.items.length) return;
    const cab = `/* ============================================================================
   Desarrollo · ${clave.toUpperCase()} ${m.titulo} — lote B (variantes para practicar)
   ARCHIVO GENERADO por tools/generar_desarrollos.js: no editar a mano.
   Todos los números salen del generador (JS + R) y se vuelven a comprobar en «verifica».
   ========================================================================== */
`;
    const cuerpo = `PLATAFORMA.registrar("desarrollo", [\n` + m.items.map((q) => "  " + valor(q, "  ")).join(",\n") + "\n]);\n";
    const ruta = path.join(dirSalida, `${m.slug}-b.js`);
    fs.writeFileSync(ruta, cab + cuerpo);
    escritos.push(`${m.slug}-b.js (${m.items.length})`);
  });
  guardarCache();
  return escritos;
}

module.exports = { Rtxt, Rv, Rn, rd, N, M, pct, suma, media, varianza, desv, cov, euclid, manhattan, det2, inv2, mv2, dot, afirmar,
  tabla, pm, vec, incisos, p, rvec, rmat, vjs, vr, modulo, agregar, emitir, MODULOS };
