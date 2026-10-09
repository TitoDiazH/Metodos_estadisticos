#!/usr/bin/env node
/* ============================================================================
   verificar_todo.js — Corre todos los verificadores en orden y resume.
     node tools/verificar_todo.js
   Termina con código ≠ 0 si alguno falla.
   ========================================================================== */
"use strict";
const path = require("path");
const { spawnSync } = require("child_process");

const PASOS = ["generar_manifiesto", "verificar_datos", "verificar_fuentes", "verificar_latex", "verificar_numeros", "cobertura"];
const extra = process.argv.slice(2);
const fallidos = [];

PASOS.forEach((p) => {
  console.log(`\n━━ ${p} ━━`);
  const r = spawnSync(process.execPath, [path.join(__dirname, p + ".js"), ...extra], { stdio: "inherit" });
  if (r.status !== 0) fallidos.push(p);
});

console.log("\n" + "━".repeat(40));
if (fallidos.length) { console.log(`✘ Fallaron: ${fallidos.join(", ")}`); process.exit(1); }
console.log("✔ Todos los verificadores pasan.");
