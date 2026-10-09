#!/usr/bin/env node
/* ============================================================================
   generar_desarrollos.js — Genera el «lote B» de preguntas de desarrollo:
   variantes con otros datos/casos de los ejercicios tipo del curso, con la
   solución paso a paso calculada (JS + R) y comprobada después en «verifica».

     node tools/generar_desarrollos.js      → reescribe data/desarrollo/*-b.js
     node tools/generar_manifiesto.js && node tools/verificar_todo.js

   Para agregar más práctica: sumar llamadas AL FINAL de la función mNN() del
   módulo (tools/generadores/*.js). Los IDs se numeran en orden, así que
   insertar en medio o borrar cambiaría los IDs y se perdería el progreso.
   ========================================================================== */
"use strict";
const path = require("path");
const L = require("./generadores/lib");

/* clave, archivo (slug del módulo), título, primer número de ID libre */
[
  ["m01", "m01-covarianza-correlacion", "Covarianza, correlación y regresión simple (P1)", 2],
  ["m02", "m02-matrices-bartlett", "Matrices de covarianza/correlación y Bartlett (P1)", 1],
  ["m03", "m03-normal-multivariada", "Distribución normal multivariada (P1)", 1],
  ["m04", "m04-escalamiento-distancias", "Escalamiento, distancias y similitud (P1)", 1],
  ["m05", "m05-hipotesis-una-poblacion", "Pruebas de hipótesis: una población (P1)", 3],
  ["m06", "m06-hipotesis-dos-poblaciones", "Pruebas de hipótesis: dos poblaciones (P1)", 2],
  ["m07", "m07-errores-potencia", "Errores tipo I/II y potencia (P1)", 2],
  ["m08", "m08-t2-hotelling", "T² de Hotelling (P1)", 1],
  ["m09", "m09-pca", "Análisis de componentes principales (P1)", 2],
  ["m10", "m10-analisis-factorial", "Análisis factorial (P1)", 1],
  ["m11", "m11-conglomerados-distancias", "Conglomerados: distancias y estandarización (P2)", 1],
  ["m12", "m12-jerarquico-aglomerativo", "Clustering jerárquico aglomerativo (P2)", 2],
  ["m13", "m13-k-medias", "K-medias y elección de k (P2)", 3],
  ["m14", "m14-diana", "DIANA (P2)", 1],
  ["m15", "m15-lda", "Clasificación supervisada: LDA (P2)", 2],
  ["m16", "m16-qda-nb-validacion", "QDA, Naive Bayes y validación (P2)", 1],
  ["m17", "m17-diseno-experimentos", "Diseño de experimentos: introducción (P2)", 1],
  ["m18", "m18-anova-un-factor", "ANOVA de un factor (P2)", 2],
  ["m19", "m19-manova", "MANOVA (P2)", 1]
].forEach((m) => L.modulo(...m));

const gens = Object.assign({}, require("./generadores/p1a"), require("./generadores/p1b"), require("./generadores/p2a"), require("./generadores/p2b"));
Object.keys(gens).sort().forEach((k) => gens[k]());

const escritos = L.emitir(path.join(__dirname, "..", "data", "desarrollo"));
const total = Object.values(L.MODULOS).reduce((a, m) => a + m.items.length, 0);
console.log(`Desarrollos generados: ${total}\n  ` + escritos.join("\n  "));
