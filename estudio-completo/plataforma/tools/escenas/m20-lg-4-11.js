"use strict";
const { dbcaEj, k, kicker, titulo, nota, tabla, c, p, formula } = require("./_ej");
module.exports = (ctx) => ({ escenas: dbcaEj({
  ej: "Libro guía · Cap. 4, ej. 11", titulo: "Temperatura de los silos de leche",
  Y: [[4, 4, 5, 0.5, 3], [5, 6, 2, 4, 4], [4.5, 4, 3.5, 2, 3], [2.5, 4, 6.5, 4.5, 4], [4, 4, 3.5, 2, 4]],
  trat: ["A", "B", "C", "D", "E"], bloq: ["Lun", "Mar", "Mié", "Jue", "Vie"], datosChica: true, decSC: 2,
  nomTrat: "silo", NomTrat: "Silo", nomBloque: "día", NomBloque: "Día", disR: true,
  disTitulo: "¿Cuál es el tratamiento y cuál el bloque?",
  enun: `Se sospecha que algunos silos tienen problemas de temperatura; durante 5 días se registra la temperatura de cada silo a una hora crítica. ` +
    `${k("clave1", "¿Hay diferencia entre los silos?")} ` +
    `${k("clave2", "La temperatura de un día a otro es una fuente de variabilidad que podría impactar la variabilidad total")}.`,
  crit: { t: 3.01, b: 3.01 }, p: { t: "0,6092", b: "0,246" },
  extras: [{ en: "res", html: kicker("Residuos") + titulo("¿Hay algún problema evidente?") +
    formula({ en: "res" }, "e_{ij}=Y_{ij}-\\bar Y_{i\\cdot}-\\bar Y_{\\cdot j}+\\bar Y_{\\cdot\\cdot}") +
    nota({ en: "res-max" }, "Mayor |residuo|: silo B el miércoles, e = −2,56") +
    formula({ en: "res-d" }, "d=\\frac{e}{\\sqrt{CM_E}}=\\frac{-2{,}56}{\\sqrt{1{,}615}}=-2{,}01\\quad(|d|<2{,}5\\Rightarrow\\text{sin atípicos})") +
    tabla(["Prueba", "Valor-p", ""], [[c("Shapiro–Wilk", "sup-sw"), c("0,153", "sup-sw"), c("normalidad ✓", "sup-sw", { clase: "pz-ve" })],
      [c("Levene (silos)", "sup-lev"), c("0,892", "sup-lev"), c("varianzas ✓", "sup-lev", { clase: "pz-ve" })]], "pz-chica") }],
  cierre: "Nada salió significativo, y eso también es una conclusión. Identificar el bloque, armar la tabla y revisar residuos."
}, ctx) });
