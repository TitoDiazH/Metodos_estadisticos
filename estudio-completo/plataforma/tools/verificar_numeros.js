#!/usr/bin/env node
/* ============================================================================
   verificar_numeros.js — Ningún número ni salida de R "de memoria".
   1) Recalcula cada entrada «verifica» (expresión JS o código R) y la compara
      con «esperado» ± «tol».
   2) Toda pregunta de cálculo debe traer una verificación que reproduzca su
      «respuesta».
   3) Ejecuta en R cada receta del Laboratorio (ejecutable:true) y cada
      «salidaDe» de pregunta, y compara con la salida escrita, línea por línea.
   4) Toda salida mostrada debe tener respaldo: ejecutada aquí o declarada como
      tomada del curso (origenSalida/salidaFuente: "curso").
     node tools/verificar_numeros.js            (usa caché de R)
     node tools/verificar_numeros.js --sin-cache
   ========================================================================== */
"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { spawnSync } = require("child_process");
const { cargar, informe } = require("./lib/cargar");

const { P, errores: errCarga } = cargar();
const E = [...errCarga], A = [];
const D = P.datos;
const SIN_CACHE = process.argv.includes("--sin-cache");
const cuenta = { js: 0, r: 0, salidas: 0, cache: 0 };

/* ── Ayudantes disponibles dentro de las expresiones «js» ───────────── */
const H = {
  suma: (v) => v.reduce((a, b) => a + b, 0),
  media: (v) => H.suma(v) / v.length,
  cov: (x, y) => { const mx = H.media(x), my = H.media(y); return H.suma(x.map((xi, i) => (xi - mx) * (y[i] - my))) / (x.length - 1); },
  varianza: (v) => H.cov(v, v),
  desv: (v) => Math.sqrt(H.varianza(v)),
  cor: (x, y) => H.cov(x, y) / (H.desv(x) * H.desv(y)),
  dist: (a, b) => Math.sqrt(H.suma(a.map((ai, i) => (ai - b[i]) ** 2))),
  manhattan: (a, b) => H.suma(a.map((ai, i) => Math.abs(ai - b[i])))
};
function evaluarJS(expr) {
  return Function(...Object.keys(H), `"use strict"; return (${expr});`)(...Object.values(H));
}

/* ── R: ejecución con caché (clave = versión de R + código) ─────────── */
const versionR = (() => {
  const r = spawnSync("Rscript", ["-e", "cat(R.version.string)"], { encoding: "utf8" });
  return r.status === 0 ? r.stdout.trim() : null;
})();
const RUTA_CACHE = path.join(__dirname, ".cache_r.json");
let cache = {};
if (!SIN_CACHE) { try { cache = JSON.parse(fs.readFileSync(RUTA_CACHE, "utf8")); } catch (e) { cache = {}; } }

function correrR(codigo) {
  if (!versionR) return { falta: "Rscript no está instalado" };
  const clave = crypto.createHash("sha1").update(versionR + "\n" + codigo).digest("hex");
  if (cache[clave] != null) { cuenta.cache++; return { salida: cache[clave] }; }
  const tmp = path.join(os.tmpdir(), `me-verif-${process.pid}-${clave.slice(0, 8)}.R`);
  fs.writeFileSync(tmp, codigo + "\n");
  const r = spawnSync("Rscript", ["--vanilla", tmp], { encoding: "utf8", timeout: 120000, env: { ...process.env, R_LIBS_USER: process.env.R_LIBS_USER || path.join(os.homedir(), "R", "library") } });
  fs.unlinkSync(tmp);
  if (r.status !== 0) {
    const msg = (r.stderr || "").trim().split("\n").slice(-3).join(" ");
    if (/there is no package called|no hay paquete/.test(msg)) return { falta: msg };
    return { error: msg || "R terminó con error" };
  }
  cache[clave] = r.stdout;
  return { salida: r.stdout };
}
const normal = (s) => String(s).replace(/\r/g, "").split("\n").map((l) => l.replace(/\s+$/, "")).join("\n").replace(/^\n+|\n+$/g, "");

function compararSalida(id, que, codigo, escrita) {
  const r = correrR(codigo);
  if (r.falta) return A.push(`[${id}] ${que}: no se pudo ejecutar (${r.falta}); queda SIN verificar.`);
  if (r.error) return E.push(`[${id}] ${que}: R falló → ${r.error}`);
  cuenta.salidas++;
  const real = normal(r.salida), esc = normal(escrita);
  if (real !== esc) {
    const a = real.split("\n"), b = esc.split("\n");
    let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++;
    E.push(`[${id}] ${que}: la salida escrita NO coincide con R (línea ${i + 1}).\n       R dice:    «${a[i] ?? "(fin)"}»\n       escrito:   «${b[i] ?? "(fin)"}»`);
  }
}

/* ── 1) Entradas «verifica» ─────────────────────────────────────────── */
function revisarVerifica(obj) {
  const valores = [];
  (obj.verifica || []).forEach((v, i) => {
    const que = v.que || `verificación ${i + 1}`;
    if (typeof v.esperado !== "number") return E.push(`[${obj.id}] ${que}: falta «esperado» numérico`);
    const tol = v.tol == null ? 1e-6 : v.tol;
    let valor;
    try {
      if (v.js) { valor = evaluarJS(v.js); cuenta.js++; }
      else if (v.r) {
        const r = correrR(v.r);
        if (r.falta) return A.push(`[${obj.id}] ${que}: ${r.falta}; queda SIN verificar.`);
        if (r.error) return E.push(`[${obj.id}] ${que}: R falló → ${r.error}`);
        valor = Number(r.salida.trim()); cuenta.r++;
      } else return E.push(`[${obj.id}] ${que}: necesita «js» o «r»`);
    } catch (e) { return E.push(`[${obj.id}] ${que}: no se pudo evaluar → ${e.message}`); }
    if (!isFinite(valor)) return E.push(`[${obj.id}] ${que}: el cálculo no dio un número (${valor})`);
    valores.push(valor);
    if (Math.abs(valor - v.esperado) > tol + 1e-12) E.push(`[${obj.id}] ${que}: calculado ${valor} ≠ esperado ${v.esperado} (tol ${tol})`);
  });
  return valores;
}

D.pregunta.forEach((q) => {
  const valores = revisarVerifica(q);
  /* 2) Cálculo: la respuesta debe estar respaldada por una verificación. */
  if (q.tipo !== "desarrollo" && typeof q.respuesta === "number" && !q.retirada) {
    const tol = q.tolerancia == null ? 0.01 : q.tolerancia;
    if (!(q.verifica || []).length) E.push(`[${q.id}] pregunta de cálculo sin «verifica»: la respuesta no está recalculada`);
    else if (!valores.some((v) => Math.abs(v - q.respuesta) <= tol + 1e-12)) E.push(`[${q.id}] ninguna verificación reproduce la «respuesta» ${q.respuesta} (± ${tol})`);
  }
  /* 3–4) Salidas de R mostradas en preguntas. */
  if (q.salidaR) {
    if (q.salidaDe) compararSalida(q.id, "salidaR", q.salidaDe, q.salidaR);
    else if (q.salidaFuente !== "curso") E.push(`[${q.id}] muestra una salida de R sin respaldo: agrega «salidaDe» (código que la produce) o salidaFuente:"curso"`);
  }
});
D.memorizar.forEach(revisarVerifica);
D.modulo.forEach((m) => (m.conceptos || []).forEach((c) => {
  revisarVerifica(c);
  if (c.r && c.r.salida) {
    const receta = c.r.rlab && P.idx.rlab[c.r.rlab];
    if (!receta) E.push(`[${c.id}] el bloque R muestra una salida sin receta de respaldo (r.rlab)`);
    else if (!normal(receta.salida || "").includes(normal(c.r.salida))) E.push(`[${c.id}] la salida del bloque R no coincide con la de la receta ${c.r.rlab}`);
  }
}));

/* 3) Recetas del Laboratorio R. */
D.rlab.forEach((x) => {
  revisarVerifica(x);
  if (!x.salida) return;
  if (x.ejecutable) compararSalida(x.id, "salida", x.codigo, x.salida);
  else if (x.origenSalida !== "curso") E.push(`[${x.id}] salida sin respaldo: marca ejecutable:true o origenSalida:"curso"`);
});

if (!SIN_CACHE || Object.keys(cache).length) { try { fs.writeFileSync(RUTA_CACHE, JSON.stringify(cache)); } catch (e) { /* sin caché */ } }
if (!versionR) A.push("Rscript no está disponible: las salidas de R quedaron SIN verificar en esta máquina.");

informe("verificar_numeros", E, A,
  `${cuenta.js} cálculos JS · ${cuenta.r} cálculos R · ${cuenta.salidas} salidas de R comparadas (${cuenta.cache} desde caché) · ${versionR || "sin R"}`);
