"use strict";
const E = require("./_2k");
const A = require("./_anim");
const { n, nt, $, c, k, kicker, titulo, tabla, formula, nota, p, lista, grafica, COL, dosK, portada, enunciado } = E;
const tot = [246, 239, 207, 270], ef = dosK(tot, 2, 3), m = tot.map((t) => t / 3);
const cod = ["(1)", "a", "b", "ab"];
module.exports = (ctx) => {
  /* Contrastes: cada total vuela con su signo desde la tabla */
  const sumaC = (efe, mk, sig, id) => {
    const orden = [1, 3, 2, 0].filter(() => true);
    const terms = [0, 1, 2, 3].map((i) => ({ v: tot[i], desde: `tt${i}`, signo: ef[efe].signos[i] })).sort((x, y) => y.signo - x.signo);
    const tt = A.reparto(ctx, mk, sig, 5, 0.4);
    return A.sumaVuela({ etiqueta: $(`C_{${efe}}`), terms, tiempos: tt.slice(0, 4), tRes: tt[4], idRes: id, dec: 0 });
  };
  const tC = { A: A.reparto(ctx, "ca", "cb", 5, 0.4)[4], B: A.reparto(ctx, "cb", "cab", 5, 0.4)[4], AB: A.reparto(ctx, "cab", "ef", 5, 0.4)[4] };
  const signos = tabla(["Trat.", "A", "B", "AB", "Total"], tot.map((t, i) => [{ v: cod[i], th: true }].concat(["A", "B", "AB"].map((s) => {
    const sg = ef[s].signos[i];
    return { v: sg > 0 ? "+" : "−", en: s === "AB" ? "signos-ab" : "signos", clase: sg > 0 ? "pz-ve" : "pz-ro", hl: s === "A" ? ["ca", "cb"] : s === "B" ? ["cb", "cab"] : ["cab", "ef"] };
  }), [{ v: String(t), en: "tot", tot: true, id: `tt${i}` }])));
  const tEf = A.espaciar(ctx, ["ef-a", "ef-b", "ef-ab"], 2.4);
  return { escenas: [
    portada("Libro guía · Cap. 6, ej. 3", "Un 2² sin software", "Contrastes, efectos e interacción a mano"),
    enunciado("Libro guía · Cap. 6, ej. 3", `Resultados de un diseño factorial. ${k("clave1", "Conteste sin usar software, haciendo las operaciones a mano")}. ` +
      `${k("clave2", "Los totales de cada tratamiento vienen dados")}.`,
      tabla(["A", "B", "I", "II", "III", "Total"], [["−", "−", 82, 80, 84, "(1) = 246"], ["+", "−", 78, 82, 79, "a = 239"], ["−", "+", 71, 70, 66, "b = 207"], ["+", "+", 89, 88, 93, "ab = 270"]]
        .map((f) => f.map((v, j) => (j === 5 ? c(v, "clave2", { hl: ["clave2"] }) : v))), "pz-chica")),
    { en: "dis", html: kicker("El diseño") + titulo("¿Qué nombre recibe?") +
      lista([["dis-r", "Factorial <strong>2²</strong>: 2 factores con 2 niveles cada uno"], ["dis-r", "4 tratamientos: (1), a, b, ab"],
        ["rep", "3 réplicas ⇒ 12 corridas"], ["orden", "Orden <strong>aleatorio</strong> de las 12: los factores no controlados se reparten al azar"],
        ["estudia", "Efectos: A, B y la interacción AB · con réplicas se estima el error"]]) },
    { en: "signos", html: kicker("Contrastes") + titulo("Suma con el signo de cada fila") +
      `<div class="pz-cols"><div class="pz-col">${signos}</div><div class="pz-col">` +
      tabla(["Efecto", "Contraste"], ["A", "B", "AB"].map((s) => [s, { v: String(ef[s].contraste).replace("-", "−"), en: A.mas(tC[s], 0.35), desde: `cc${s}` }]), "pz-chica") +
      nota({ en: "signos-ab" }, "Signo de AB = signo de A × signo de B") + "</div></div>" +
      A.secuencia([{ t: "ca", html: sumaC("A", "ca", "cb", "ccA") }, { t: "cb", html: sumaC("B", "cb", "cab", "ccB") }, { t: "cab", html: sumaC("AB", "cab", "ef", "ccAB") }], "contraste") },
    { en: "ef", html: kicker("Efectos") + titulo("Efecto = contraste / (n · 2<sup>k−1</sup>) = contraste / 6") +
      `<div class="pz-suma">` + ["A", "B", "AB"].map((s) => `<span class="pz-tenue">${$(`C_{${s}}=`)}</span><span class="pz-chip" data-id="ce${s}">${String(ef[s].contraste).replace("-", "−")}</span>`).join(" &nbsp; ") + "</div>" +
      tabla(["Efecto", "Contraste", "Efecto"], ["A", "B", "AB"].map((s, i) => [s, String(ef[s].contraste).replace("-", "−"),
        { v: `<strong>${n(ef[s].efecto)}</strong>`, en: A.mas(tEf[i], 1.9), desde: `e${s}`, hl: s === "AB" ? ["ef-mira"] : null }])) +
      A.secuencia(["A", "B", "AB"].map((s, i) => ({ t: tEf[i], html: A.calc({ partes: [[tEf[i], `\\text{Efecto}_{${s}}=\\dfrac{C_{${s}}}{3\\cdot 2}=\\dfrac{${ef[s].contraste}}{6}`]], tRes: A.mas(tEf[i], 1.1), res: n(ef[s].efecto), idRes: `e${s}` }) }))) +
      nota({ en: "ef-mira" }, "¡La interacción es el efecto más grande!", "mal") },
    { en: "medias", html: kicker("Gráficas") + titulo("Efectos principales vs. interacción") +
      `<div class="pz-cols"><div class="pz-col">` +
      p({ en: "medias" }, `Medias = total / 3: (1) = ${n(m[0], 2)} · a = ${n(m[1], 2)} · b = ${n(m[2], 2)} · ab = ${n(m[3], 2)}`) +
      `<div style="height:40cqh">` + grafica({ xs: ["−", "+"], ymin: 65, ymax: 92, etiquetaY: "efectos principales", dec: 0,
        series: [{ nombre: "A", ys: [(m[0] + m[2]) / 2, (m[1] + m[3]) / 2], color: COL.am, en: "gef", valores: true },
          { nombre: "B", ys: [(m[0] + m[1]) / 2, (m[2] + m[3]) / 2], color: COL.ce, en: "gef", valores: true }] }) + "</div></div>" +
      `<div class="pz-col"><div style="height:46cqh">` + grafica({ xs: ["A−", "A+"], ymin: 65, ymax: 92, etiquetaY: "interacción AB", dec: 1,
        series: [{ nombre: "B−", ys: [m[0], m[1]], color: COL.ro, en: "gint", valores: true }, { nombre: "B+", ys: [m[2], m[3]], color: COL.ve, en: "gint", valores: true }] }) + "</div>" +
      nota({ en: "gint-cruce" }, "Se cruzan: el efecto de A depende de B", "mal") + "</div></div>" },
    { en: "binf", html: kicker("¿B influye?") + titulo("Sí, a través de la interacción") +
      tabla(["", "Cambio al subir B"], [[c("Con A bajo", "binf-r"), c("82 → 69: −13", "binf-r", { clase: "pz-ro" })], [c("Con A alto", "binf-r"), c("79,67 → 90: +10,33", "binf-r", { clase: "pz-ve" })]]) +
      nota({ en: "binf-r" }, "Los cambios se cancelan en el promedio ⇒ efecto principal de B ≈ −1,33") +
      nota({ en: "fin" }, "Un efecto principal pequeño no significa que el factor no importe", "ok") }
  ] };
};
