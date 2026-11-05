/* Pizarra de M17 · Diseño de experimentos. Marcas en tools/guiones/m17-diseno-experimentos.txt. */
"use strict";
const M = require("./_mod");
const { kicker, titulo, tabla, lista, formula, nota, paso, div, p, portada, cierre } = M;

const escenas = [
  portada(17, "Prueba 2", "Diseño de experimentos", "Experimentar en vez de solo observar: vocabulario y principios"),

  { en: "dos", html: kicker("Dos caminos para mejorar un proceso") + titulo("Observar o experimentar") +
    `<div class="pz-cols">` +
    nota({ en: "obs" }, "<strong>Observar</strong>: mirar y esperar señales · <span class=\"pz-tenue\">pasivo</span>") +
    nota({ en: "exp" }, "<strong>Experimentar</strong>: cambios a propósito para provocarlas · <span class=\"pz-am\">activo</span>", "ok") + "</div>" +
    nota({ en: "def" }, "DDE: <strong>planear</strong> pruebas para generar datos que, analizados con estadística, respondan una pregunta") +
    p({ en: "def-no", clase: "pz-tenue" }, "No es probar sobre la marcha por ensayo y error") +
    tabla(["Año", "Quién", "Aporte"], [[{ v: "1935", en: "hist-f" }, { v: "Fisher", en: "hist-f" }, { v: "agricultura, varios factores, muestras chicas", en: "hist-f" }],
      [{ v: "1951", en: "hist-b" }, { v: "Box y Wilson", en: "hist-b" }, { v: "superficie de respuesta, por etapas", en: "hist-b" }],
      [{ v: "1980s", en: "hist-d" }, { v: "Deming e Ishikawa", en: "hist-d" }, { v: "calidad en la industria japonesa", en: "hist-d" }]], "pz-chica") },

  { en: "voc", html: kicker("Vocabulario · envases de plástico") + titulo("Cada palabra en su lugar") +
    tabla(["Término", "En el ejemplo"], [
      [{ v: "Variable de respuesta", en: "v-resp" }, { v: "dureza del envase", en: "v-resp" }],
      [{ v: "Unidad experimental", en: "v-unidad" }, { v: "un lote de envases", en: "v-unidad" }],
      [{ v: "Factor controlable", en: "v-ctrl" }, { v: "temperatura, velocidad", en: "v-ctrl" }],
      [{ v: "Factor no controlable (ruido)", en: "v-ruido" }, { v: "humedad, ánimo, material del proveedor", en: "v-ruido" }],
      [{ v: "Niveles", en: "v-nivel" }, { v: "valores de cada factor", en: "v-nivel" }],
      [{ v: "<strong>Tratamiento</strong>", en: "v-trat", hl: ["v-trat", "v-error"] }, { v: "combinación de niveles de <em>todos</em> los factores", en: "v-trat", hl: ["v-trat", "v-error"] }]], "pz-chica") +
    `<div class="pz-cols">` +
    `<div${M.at({ en: "v-trat-q" })}>` + tabla(["", "Vel. baja", "Vel. alta"], [[{ v: "Temp. baja", th: true }, { v: "T1", en: "v-trat-r" }, { v: "T2", en: "v-trat-r" }], [{ v: "Temp. alta", th: true }, { v: "T3", en: "v-trat-r" }, { v: "T4", en: "v-trat-r" }]], "pz-chica") + "</div>" +
    `<div class="pz-col">` + nota({ en: "v-ea" }, "<strong>Error aleatorio</strong>: lo que los factores no explican") + nota({ en: "v-ee" }, "<strong>Error experimental</strong>: aleatorio + errores del experimentador") + "</div></div>" },

  { en: "princ", html: kicker("Tres principios") + titulo("Aleatorizar · repetir · bloquear") +
    `<div class="pz-cols pz-cols-3">` +
    div({ en: "aleat" }, `<p class="pz-am"><strong>Aleatorizar</strong></p>` + p({}, "Orden de las corridas al azar") + p({ en: "aleat-r", clase: "pz-tenue" }, "⇒ errores independientes")) +
    div({ en: "rep" }, `<p class="pz-ce"><strong>Repetir</strong></p>` + p({}, "Cada tratamiento más de una vez") + p({ clase: "pz-tenue" }, "⇒ se puede estimar el error")) +
    div({ en: "bloq" }, `<p class="pz-ve"><strong>Bloquear</strong></p>` + p({}, "Controlar factores que molestan") + p({ clase: "pz-tenue" }, "⇒ no inflan el error")) + "</div>" +
    `<div class="pz-cols"${M.at({ en: "maq" })}>` +
    div({ en: "maq-2" }, tabla(["Operador 1", "Operador 2", "Operador 3", "Operador 4"], [["C", "B", "A", "D"], ["A", "D", "C", "B"], ["D", "A", "B", "C"], ["B", "C", "D", "A"]].map((f) => f.map((v) => ({ v, hl: ["maq-r"] }))), "pz-chica")) +
    `<div class="pz-col">` + nota({ en: "maq-b" }, "Cada operador es un <strong>bloque</strong>") +
    nota({ en: "maq-r" }, "Se bloquea por operador y, <strong>dentro</strong> de cada uno, se sortea el orden", "ok") + "</div></div>" },

  { en: "etapas", html: kicker("Las etapas") + titulo("Planear, analizar, interpretar") +
    `<div class="pz-col">` +
    paso(1, "et-plan", "<strong>Planeación</strong>: problema, respuesta, factores, tratamientos <span class=\"pz-tenue\">(la más importante)</span>") +
    paso(2, "et-anal", "<strong>Análisis</strong>: inferencia, con el <span class=\"pz-am\">ANOVA</span>") +
    paso(3, "et-int", "<strong>Interpretación</strong>: volver a la pregunta, supuestos, mejor tratamiento") + "</div>" +
    p({ en: "elegir" }, "<strong>Para elegir el diseño:</strong>") +
    `<p>${[["el-1", "el objetivo"], ["el-2", "cuántos factores"], ["el-3", "cuántos niveles"], ["el-4", "qué efectos interesan"], ["el-5", "costo, tiempo y precisión"]].map(([m, t]) => `<span class="pz-chip pz-ce" data-en="${m}">${t}</span>`).join(" ")}</p>` },

  cierre(17, [["c1", "Experimentar es activo; observar, pasivo"], ["c2", "Tratamiento = combinación de niveles"], ["c3", "Aleatorizar, repetir y bloquear"], ["c4", "El análisis central es el ANOVA (módulo 18)"]])
];
module.exports = { escenas };
