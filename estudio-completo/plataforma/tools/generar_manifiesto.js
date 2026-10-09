#!/usr/bin/env node
/* ============================================================================
   generar_manifiesto.js — Escribe data/manifiesto.js con la lista de archivos
   de data/. Hay que correrlo cada vez que se AGREGA, RENOMBRA o BORRA un archivo
   de datos (no hace falta si solo se edita su contenido).
     node tools/generar_manifiesto.js
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const { DATA, listarDatos } = require("./lib/cargar");

const archivos = listarDatos();
const texto = `/* GENERADO por tools/generar_manifiesto.js — no editar a mano. */
window.PLATAFORMA = window.PLATAFORMA || {};
PLATAFORMA.manifiesto = {
  archivos: ${JSON.stringify(archivos, null, 4).replace(/\n\]$/, "\n  ]")}
};
`;
fs.writeFileSync(path.join(DATA, "manifiesto.js"), texto);
console.log(`✔ data/manifiesto.js: ${archivos.length} archivos de datos.`);
