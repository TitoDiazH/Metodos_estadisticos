"use strict";
const { n, $, c, k, kicker, titulo, tabla, formula, nota, p, lista, portada, enunciado } = require("./_ej");
const vars = ["precio", "descuentos", "cond_pago", "calidad_prod", "confiabilidad", "certificaciones", "tiempo_entrega", "soporte_tecnico", "comunicacion", "flexibilidad"];
const msa = [0.88, 0.93, 0.94, 0.68, 0.78, 0.97, 0.55, 0.17, 0.23, 0.42];
const car = [[0.91, "", ""], [0.92, "", ""], [0.91, "", ""], ["", "", 0.95], [0.53, "", 0.81], [0.89, "", ""], [0.85, "", ""], ["", 0.80, ""], ["", 0.89, ""], ["", 0.89, ""]];
const h2 = [0.89, 0.85, 0.85, 0.96, 0.93, 0.91, 0.83, 0.65, 0.80, 0.97], u2 = [0.105, 0.145, 0.154, 0.039, 0.068, 0.091, 0.165, 0.355, 0.197, 0.028];
const com = [1.1, 1.0, 1.1, 1.1, 1.7, 1.3, 1.3, 1.0, 1.0, 1.5];
module.exports = { escenas: [
  portada("Prueba 1 (2026-20) · Pregunta 3.2", "Leer un análisis factorial en R", "Pregunta adicional de P4 · se promedia con P1"),
  enunciado("Prueba 1 (2026-20) · Pregunta 3.2", `300 clientes evalúan 10 criterios del servicio de entrega. ${k("clave1", "KMO(cor_mat)")} y ` +
    `${k("clave2", "principal(…, nfactors = 3, rotate = \"varimax\")")}. ${k("clave3", "4 preguntas: KMO · comunalidades · ¿factores correlacionados? · Mean item complexity")}.`),
  { en: "kmo", html: kicker("La prueba KMO") + titulo("Correlaciones simples vs. parciales") +
    formula({ en: "kmo-parcial" }, "KMO=\\frac{\\sum r_{ij}^2}{\\sum r_{ij}^2+\\sum a_{ij}^2}\\qquad a_{ij}:\\text{ correlación parcial}") +
    nota({ en: "kmo-idea" }, "Parciales chicas frente a las simples ⇒ estructura común ⇒ tiene sentido buscar factores") +
    p({ en: "kmo-global" }, `Overall MSA = <strong class="pz-ve">0,64</strong> &nbsp;(≥ 0,5: aceptable)`) +
    tabla(vars.map((v) => v.replace("_", " ")), [msa.map((x, i) => c(n(x, 2), "kmo-bajos", { clase: x < 0.5 ? "pz-ro" : "", hl: i === 7 ? ["kmo-st"] : i === 8 ? ["kmo-com"] : null }))], "pz-chica") },
  { en: "h2", html: kicker("Comunalidades") + titulo("h2: varianza explicada por los factores") +
    tabla(["", "RC1", "RC2", "RC3", "h2", "u2", "com"], vars.map((v, i) => [{ v, th: true }].concat(car[i].map((x) => (x === "" ? "" : n(x, 2))),
      [{ v: n(h2[i], 2), hl: i === 9 ? ["mejor"] : i === 7 ? ["peor"] : null, clase: "pz-am" }, { v: n(u2[i], 3), hl: i === 7 ? ["pauta", "rot"] : null }, n(com[i], 1)])), "pz-chica pz-mini") +
    `<div class="pz-cols">` + nota({ en: "mejor" }, "Mejor: <strong>flexibilidad</strong>, h2 = 0,97", "ok") + nota({ en: "peor" }, "Peor: <strong>soporte técnico</strong>, h2 = 0,65", "mal") + "</div>" +
    nota({ en: "pauta" }, "⚠ La pauta dice «comunalidad ≈ 0,35»: eso es u2 (especificidad), no h2") },
  { en: "rot", html: kicker("Rotación y complejidad") + titulo("Varimax y Mean item complexity") +
    nota({ en: "rot-r" }, "Varimax es <strong>ortogonal</strong> ⇒ los factores <strong>no</strong> están correlacionados", "ok") +
    p({ en: "rot-obl", clase: "pz-tenue" }, "Oblimin o Promax (oblicuas) sí permitirían correlación") +
    formula({ en: "com-n" }, `\\overline{com}=\\frac{${com.map((x) => n(x, 1).replace(",", "{,}")).join("+")}}{10}=1{,}21`) +
    nota({ en: "com-idea" }, "≈ 1 ⇒ cada variable carga en un solo factor: estructura simple") +
    p({ en: "com-conf", clase: "pz-tenue" }, "Más compleja: confiabilidad (1,7), carga en RC1 y RC3") +
    lista([["fin", "Qué columna mirar: MSA por variable · h2 · tipo de rotación · com"]]) }
] };
