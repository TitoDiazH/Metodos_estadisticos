#!/usr/bin/env node
/* ============================================================================
   verificar_datos.js — Estructura de los datos: ids únicos, campos
   obligatorios, "correcta" en rango, módulos y pruebas existentes, origen
   válido, manifiesto al día y nada cargado desde internet.
     node tools/verificar_datos.js
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const { RAIZ, cargar, listarDatos, cadenas, informe } = require("./lib/cargar");

const { P, archivos, errores: errCarga } = cargar();
const E = [...errCarga], A = [];
const D = P.datos;
const err = (obj, msg) => E.push(`[${obj.id || "sin id"}] ${msg}  (${obj._archivo || "?"})`);

/* ── Manifiesto al día ──────────────────────────────────────────────── */
const enDisco = listarDatos();
enDisco.filter((f) => !archivos.includes(f)).forEach((f) => E.push(`${f} existe pero no está en el manifiesto: corre node tools/generar_manifiesto.js`));
archivos.filter((f) => !enDisco.includes(f)).forEach((f) => E.push(`El manifiesto lista ${f}, que no existe: corre node tools/generar_manifiesto.js`));

/* ── IDs únicos (por tipo y globales entre conceptos/preguntas) ─────── */
function unicos(lista, que) {
  const visto = {};
  lista.forEach((o) => {
    if (!o.id || typeof o.id !== "string") return err(o, `${que} sin id`);
    if (!/^[A-Za-z0-9._-]+$/.test(o.id)) err(o, `${que}: id con caracteres no permitidos`);
    if (visto[o.id]) err(o, `${que}: id duplicado (también en ${visto[o.id]})`);
    visto[o.id] = o._archivo || "?";
  });
  return visto;
}
const idPrueba = unicos(D.prueba, "prueba");
unicos(D.fuente, "fuente");
const idModulo = unicos(D.modulo, "módulo");
unicos(D.pregunta, "pregunta");
unicos(D.memorizar, "memorizar");
const idRlab = unicos(D.rlab, "rlab");
unicos(D.diferencia, "diferencia");

const req = (o, campos) => campos.forEach((c) => { if (o[c] === undefined || o[c] === null || o[c] === "" || (Array.isArray(o[c]) && !o[c].length)) err(o, `falta el campo «${c}»`); });
const fuenteOk = (o) => { if (!Array.isArray(o.fuente) || !o.fuente.length) err(o, "sin fuente"); };

/* ── Pruebas y temario ──────────────────────────────────────────────── */
const enTemario = {};
D.prueba.forEach((p) => {
  req(p, ["id", "nombre", "estado", "orden"]);
  if (!["definida", "parcial", "sin definir"].includes(p.estado)) err(p, `estado inválido «${p.estado}»`);
  if (![true, false, null].includes(p.acumulativa)) err(p, "acumulativa debe ser true, false o null");
  if (!Array.isArray(p.modulos)) err(p, "modulos debe ser un arreglo");
  (p.modulos || []).forEach((t) => {
    if (!t.id || !t.titulo) err(p, `entrada de temario incompleta: ${JSON.stringify(t)}`);
    (enTemario[t.id] = enTemario[t.id] || []).push(p.id);
  });
});

/* ── Módulos y conceptos ────────────────────────────────────────────── */
const idConcepto = {};
/* Tipos de figura que sabe dibujar la app: se leen de js/figuras*.js para no repetir la lista. */
const TIPOS_FIGURA = ["figuras.js", "figuras-vivas.js"].flatMap((a) =>
  [...fs.readFileSync(path.join(RAIZ, "js", a), "utf8").matchAll(/F\.tipo\("([^"]+)"/g)].map((x) => x[1]));
D.modulo.forEach((m) => {
  req(m, ["id", "orden", "titulo", "pruebas", "prioridad", "fuentes", "conceptos"]);
  if (!P.PRIORIDADES.includes(m.prioridad)) err(m, `prioridad inválida «${m.prioridad}»`);
  (m.pruebas || []).forEach((p) => {
    if (!idPrueba[p]) err(m, `prueba inexistente «${p}»`);
    else if (!(enTemario[m.id] || []).includes(p)) err(m, `declara pruebas:["${p}"] pero no está en el temario de ${p} (data/pruebas.js)`);
  });
  if (!enTemario[m.id]) A.push(`[${m.id}] no figura en el temario de ninguna prueba: solo se verá con «Todo».`);
  (m.conceptos || []).forEach((c) => {
    c._archivo = m._archivo;
    req(c, ["id", "titulo", "simple", "fuente"]);
    if (idConcepto[c.id]) err(c, "concepto: id duplicado");
    idConcepto[c.id] = m.id;
    if (!c.id.startsWith(m.id.split("-")[0] + "-")) A.push(`[${c.id}] el id del concepto no empieza con el prefijo del módulo (${m.id.split("-")[0]}-).`);
    if (c.comprueba) revisarCerrada(Object.assign({ id: c.id + "-cmp", _archivo: m._archivo, tipo: "alternativas" }, c.comprueba));
    if (c.r && !c.r.codigo) err(c, "bloque r sin codigo");
    [].concat(c.figura || []).forEach((f) => {
      if (typeof f === "string") { if (!/<svg[\s>]/.test(f)) err(c, "figura escrita a mano sin <svg>"); return; }
      if (!TIPOS_FIGURA.includes(f.tipo)) err(c, `figura de tipo desconocido «${f.tipo}» (tipos: ${TIPOS_FIGURA.join(", ")})`);
      if (!f.pie) err(c, "figura sin pie: toda figura lleva una frase que diga qué mirar");
      if (f.donde && !["formal", "ejemplo"].includes(f.donde)) err(c, `figura: donde debe ser "formal" o "ejemplo" (no «${f.donde}»)`);
    });
    if (c.r && c.r.rlab && !idRlab[c.r.rlab]) err(c, `r.rlab apunta a una receta inexistente «${c.r.rlab}»`);
    (c.externo || []).forEach((x) => { if (!x.titulo || !x.url || !x.consultado) err(c, "nota externa sin titulo/url/consultado"); });
  });
});

/* ── Preguntas ──────────────────────────────────────────────────────── */
function revisarCerrada(q) {
  const forma = q.tipo === "vf" ? "vf" : Array.isArray(q.huecos) ? "huecos" : typeof q.respuesta === "number" ? "numero" : Array.isArray(q.correcta) ? "multi" : "unica";
  if (!q.enunciado) err(q, "sin enunciado");
  if (!q.explicacion) err(q, "sin explicación");
  if (forma === "vf") {
    if (typeof q.correcta !== "boolean") err(q, "V/F: «correcta» debe ser true o false");
  } else if (forma === "numero") {
    if (!isFinite(q.respuesta)) err(q, "cálculo: «respuesta» no es un número");
    if (q.tolerancia != null && !(q.tolerancia >= 0)) err(q, "cálculo: tolerancia inválida");
  } else if (forma === "huecos") {
    const n = ((q.codigoR || "").match(/_{3,}/g) || []).length;
    if (!q.codigoR) err(q, "completar: falta codigoR con ___");
    if (n !== q.huecos.length) err(q, `completar: el código tiene ${n} hueco(s) y «huecos» define ${q.huecos.length}`);
    q.huecos.forEach((h, i) => { if (!Array.isArray(h) || !h.length || h.some((x) => typeof x !== "string" || !x)) err(q, `completar: hueco ${i + 1} sin respuestas aceptadas`); });
  } else {
    if (!Array.isArray(q.opciones) || q.opciones.length < 2) return err(q, "faltan opciones (mínimo 2)");
    if (new Set(q.opciones).size !== q.opciones.length) err(q, "opciones repetidas");
    const n = q.opciones.length;
    if (forma === "multi") {
      if (!q.correcta.length) err(q, "múltiple: «correcta» vacío");
      if (new Set(q.correcta).size !== q.correcta.length) err(q, "múltiple: índices repetidos en «correcta»");
      q.correcta.forEach((c) => { if (!Number.isInteger(c) || c < 0 || c >= n) err(q, `«correcta» fuera de rango: ${c}`); });
      if (q.correcta.length === n) A.push(`[${q.id}] múltiple con todas las opciones correctas.`);
    } else if (!Number.isInteger(q.correcta) || q.correcta < 0 || q.correcta >= n) err(q, `«correcta» fuera de rango: ${q.correcta}`);
    if (q.distractores && q.distractores.length !== n) err(q, "«distractores» debe tener un texto por opción (puede ser \"\")");
  }
}

D.pregunta.forEach((q) => {
  req(q, ["id", "modulo", "tipo", "dificultad", "origen", "enunciado"]);
  fuenteOk(q);
  if (!P.TIPOS_PREGUNTA[q.tipo]) err(q, `tipo inválido «${q.tipo}»`);
  if (![1, 2, 3].includes(q.dificultad)) err(q, "dificultad debe ser 1, 2 o 3");
  if (!P.ORIGENES[q.origen]) err(q, `origen inválido «${q.origen}»`);
  if (q.origen === "variacion" && !(Array.isArray(q.base) && q.base.length)) err(q, "origen «variacion» exige «base» con la cita del ejercicio original");
  if (!idModulo[q.modulo]) err(q, `módulo inexistente «${q.modulo}»`);
  else if (!q.id.startsWith(q.modulo.split("-")[0] + "-")) A.push(`[${q.id}] el id no empieza con el prefijo de su módulo.`);
  if (q.prioridad && !P.PRIORIDADES.includes(q.prioridad)) err(q, `prioridad inválida «${q.prioridad}»`);
  if (q.concepto && idConcepto[q.concepto] !== q.modulo) err(q, `«concepto» ${q.concepto} no pertenece al módulo ${q.modulo}`);
  (q.pruebas || []).forEach((p) => { if (!idPrueba[p]) err(q, `prueba inexistente «${p}»`); });
  if (q.tipo === "desarrollo") {
    req(q, ["titulo", "partes"]);
    if (q.modelo || q.rubrica) err(q, "formato antiguo (modelo/rubrica): Desarrollo ahora usa «partes»");
    (q.partes || []).forEach((pt, i) => { if (!pt.titulo || !pt.solucion || !(pt.puntos > 0)) err(q, `parte ${i + 1}: necesita titulo, solucion y puntos > 0`); });
    if ((q.partes || []).length < 2) err(q, "una pregunta de desarrollo necesita al menos 2 partes");
  } else {
    revisarCerrada(q);
    if (q.tipo === "interpretacion-R" && !q.salidaR) err(q, "interpretación de R sin «salidaR»");
    if ((q.tipo === "codigo-R" || q.tipo === "completar-R") && !q.codigoR) err(q, `${q.tipo} sin «codigoR»`);
  }
});

/* ── Memorizar, Laboratorio R, diferencias ──────────────────────────── */
const CATS = ["formula", "umbral", "decision", "funcion-R", "salida", "flashcard"];
D.memorizar.forEach((x) => {
  req(x, ["id", "modulo", "categoria"]); fuenteOk(x);
  if (!CATS.includes(x.categoria)) err(x, `categoría inválida «${x.categoria}»`);
  if (!idModulo[x.modulo]) err(x, `módulo inexistente «${x.modulo}»`);
  req(x, x.categoria === "flashcard" ? ["frente", "reverso"] : ["titulo", "contenido"]);
});
D.rlab.forEach((x) => {
  req(x, ["id", "modulo", "tema", "titulo", "codigo"]); fuenteOk(x);
  if (!idModulo[x.modulo]) err(x, `módulo inexistente «${x.modulo}»`);
  if (x.salida && !["ejecutada", "curso"].includes(x.origenSalida)) err(x, "tiene salida pero no declara origenSalida: \"ejecutada\" | \"curso\"");
});
D.diferencia.forEach((x) => {
  req(x, ["id", "tipo", "tema", "fuentes"]);
  if (!["criterio", "error", "notacion"].includes(x.tipo)) err(x, `tipo inválido «${x.tipo}»`);
  (x.fuentes || []).forEach((f) => { if (!f.id || !f.dice) err(x, "cada fuente necesita id y «dice»"); });
  (x.modulos || []).forEach((m) => { if (!idModulo[m] && !enTemario[m]) err(x, `módulo inexistente «${m}»`); });
});

/* ── Offline: nada se carga desde internet ──────────────────────────── */
const RE_RECURSO = /(?:src|href)\s*=\s*["']?\s*(?:https?:)?\/\/|url\(\s*["']?\s*(?:https?:)?\/\/|@import/i;
["index.html", ...fs.readdirSync(path.join(RAIZ, "css")).map((f) => "css/" + f), ...fs.readdirSync(path.join(RAIZ, "js")).map((f) => "js/" + f)].forEach((rel) => {
  const txt = fs.readFileSync(path.join(RAIZ, rel), "utf8");
  if (RE_RECURSO.test(txt)) E.push(`${rel}: carga un recurso externo (la app debe ser 100 % offline)`);
  if (/\bfetch\s*\(|XMLHttpRequest|type\s*=\s*["']module["']|^\s*import\s/m.test(txt)) E.push(`${rel}: usa fetch/XHR/módulos ES, prohibidos en file://`);
});
Object.keys(D).forEach((t) => D[t].forEach((o) => cadenas(o, (s) => { if (RE_RECURSO.test(s)) err(o, "el contenido carga un recurso externo (src/href http)"); })));

informe("verificar_datos", E, A,
  `${D.prueba.length} pruebas · ${D.modulo.length} módulos · ${Object.keys(idConcepto).length} conceptos · ${D.pregunta.length} preguntas · ${D.memorizar.length} memorizar · ${D.rlab.length} rlab · ${D.diferencia.length} diferencias`);
