/* ============================================================================
   lib/cargar.js — Carga los datos de la plataforma en Node tal como lo hace el
   navegador (config → registro → archivos del manifiesto), para que los
   verificadores trabajen sobre lo mismo que ve la app.
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const RAIZ = path.resolve(__dirname, "..", "..");          // plataforma/
const DATA = path.join(RAIZ, "data");

/* Lista ordenada de archivos de datos: primero pruebas y fuentes, luego el resto por ruta. */
function listarDatos() {
  const out = [];
  (function andar(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) andar(p);
      else if (e.name.endsWith(".js") && e.name !== "manifiesto.js") out.push(path.relative(RAIZ, p).split(path.sep).join("/"));
    });
  })(DATA);
  const primero = ["data/pruebas.js", "data/fuentes.js"];
  return out.sort((a, b) => {
    const ia = primero.indexOf(a), ib = primero.indexOf(b);
    if (ia >= 0 || ib >= 0) return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    return a < b ? -1 : a > b ? 1 : 0;
  });
}

/* Ejecuta los archivos y devuelve { P, archivos, errores }. usarManifiesto=true carga
   exactamente lo que cargará el navegador; false carga todo lo que hay en data/. */
function cargar(opciones) {
  const usarManifiesto = !opciones || opciones.usarManifiesto !== false;
  const ctx = { console };
  ctx.window = ctx; ctx.globalThis = ctx;
  vm.createContext(ctx);
  const errores = [];
  const correr = (rel) => {
    const abs = path.join(RAIZ, rel);
    try {
      if (ctx.PLATAFORMA) ctx.PLATAFORMA._archivoActual = rel;
      vm.runInContext(fs.readFileSync(abs, "utf8"), ctx, { filename: rel });
    } catch (e) { errores.push(`${rel}: ${e.message}`); }
  };
  correr("js/config.js");
  correr("js/registro.js");
  let archivos = listarDatos();
  if (usarManifiesto) {
    correr("data/manifiesto.js");
    const m = ctx.PLATAFORMA.manifiesto;
    if (!m) errores.push("data/manifiesto.js no existe o no define PLATAFORMA.manifiesto (corre: node tools/generar_manifiesto.js)");
    else archivos = m.archivos;
  }
  archivos.forEach(correr);
  ctx.PLATAFORMA.erroresRegistro.forEach((e) => errores.push(e));
  ctx.PLATAFORMA.indexar();
  return { P: ctx.PLATAFORMA, archivos, errores };
}

/* Recorre todas las cadenas de un objeto (para LaTeX, enlaces http, etc.). */
function cadenas(obj, visita, ruta) {
  if (typeof obj === "string") visita(obj, ruta || "");
  else if (Array.isArray(obj)) obj.forEach((x, i) => cadenas(x, visita, `${ruta || ""}[${i}]`));
  else if (obj && typeof obj === "object") Object.keys(obj).forEach((k) => { if (k[0] !== "_") cadenas(obj[k], visita, ruta ? `${ruta}.${k}` : k); });
}

/* Informe uniforme: imprime y fija el código de salida. */
function informe(nombre, errores, avisos, resumen) {
  (avisos || []).forEach((a) => console.log(`  ⚠  ${a}`));
  errores.forEach((e) => console.log(`  ✗  ${e}`));
  const ok = errores.length === 0;
  console.log(`${ok ? "✔" : "✘"} ${nombre}: ${ok ? "OK" : errores.length + " error(es)"}${resumen ? " — " + resumen : ""}`);
  if (!ok) process.exitCode = 1;
  return ok;
}

module.exports = { RAIZ, DATA, listarDatos, cargar, cadenas, informe };
