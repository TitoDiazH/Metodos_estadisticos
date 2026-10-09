#!/usr/bin/env node
/* ============================================================================
   verificar_latex.js — Compila TODAS las fórmulas de data/ con el KaTeX local
   y throwOnError:true. Usa los mismos delimitadores que la app:
   $$…$$, \[…\], $…$ y \(…\).
     node tools/verificar_latex.js
   ========================================================================== */
"use strict";
const path = require("path");
const { RAIZ, cargar, cadenas, informe } = require("./lib/cargar");
const katex = require(path.join(RAIZ, "vendor", "katex", "katex.min.js"));

const { P, errores: errCarga } = cargar();
const E = [...errCarga];
let total = 0;

/* Extrae fórmulas en el mismo orden de prioridad que auto-render. No mira dentro de <pre>/<code>. */
function formulas(texto) {
  const limpio = texto.replace(/<(pre|code)\b[^>]*>[\s\S]*?<\/\1>/gi, " ");
  const out = [];
  const re = /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$((?:\\.|[^$\\])+?)\$/g;
  let m;
  while ((m = re.exec(limpio))) {
    const display = m[1] != null || m[2] != null;
    out.push({ tex: m[1] ?? m[2] ?? m[3] ?? m[4], display });
  }
  /* Un $ suelto (impar) casi siempre es un error de tipeo. */
  const sueltos = limpio.replace(re, "").match(/(^|[^\\])\$/g);
  return { out, impar: !!sueltos };
}

/* Campos que NO son HTML/LaTeX (código y salidas de R, rutas, verificaciones): no se analizan. */
const CLAVES_OMITIR = ["codigo", "codigoR", "salida", "salidaR", "salidaDe", "ruta", "url", "funciones", "paquetes", "huecos", "verifica"];
function omitir(ruta) {
  return ruta.replace(/\[\d+\]/g, "").split(".").some((k) => CLAVES_OMITIR.includes(k));
}

Object.keys(P.datos).forEach((tipo) => P.datos[tipo].forEach((obj) => {
  cadenas(obj, (s, ruta) => {
    if (omitir(ruta)) return;
    const { out, impar } = formulas(s);
    if (impar) E.push(`[${obj.id}] ${ruta}: hay un «$» sin pareja`);
    out.forEach((f) => {
      total++;
      try { katex.renderToString(f.tex, { displayMode: f.display, throwOnError: true, strict: "ignore" }); }
      catch (e) { E.push(`[${obj.id}] ${ruta}: ${e.message.replace(/\n/g, " ")}  →  ${f.tex.slice(0, 70)}`); }
    });
  });
}));

informe("verificar_latex", E, [], `${total} fórmulas compiladas con KaTeX ${katex.version}`);
