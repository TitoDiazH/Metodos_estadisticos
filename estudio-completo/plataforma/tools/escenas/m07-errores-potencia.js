/* Pizarra de M07 · Errores y potencia. Marcas en tools/guiones/m07-errores-potencia.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, portada, cierre, cod, COL } = M;
const c = (v, en, extra = {}) => Object.assign({ v, en }, extra);

/* Dos campanas: H0 (μ = 1) y verdadera (μ = 1,005), con la zona de no rechazo y β sombreado */
function dosCampanas() {
  const se = 0.02 / Math.sqrt(20), X = (v) => 20 + ((v - 0.982) / (1.025 - 0.982)) * 300;
  const curva = (mu, k) => { let d = ""; for (let v = 0.982; v <= 1.025; v += 0.0004) { const z = (v - mu) / se; d += `${d ? "L" : "M"}${X(v).toFixed(1)},${(160 - 120 * k * Math.exp(-z * z / 2)).toFixed(1)} `; } return d; };
  const li = 0.9912, ls = 1.0088;
  let beta = `M${X(li)},160`;
  for (let v = li; v <= ls; v += 0.0004) { const z = (v - 1.005) / se; beta += ` L${X(v).toFixed(1)},${(160 - 120 * Math.exp(-z * z / 2)).toFixed(1)}`; }
  beta += ` L${X(ls)},160 Z`;
  return `<svg viewBox="0 0 340 200"><path class="ejes" d="M10,160 H330"/>` +
    `<path d="${curva(1, 1)}" fill="none" stroke="${COL.ce}" stroke-width="2.5"/><text x="${X(1) - 10}" y="30" style="font-size:12px;fill:${COL.ce}">H₀: μ = 1</text>` +
    `<g data-en="lim-r"><line x1="${X(li)}" x2="${X(li)}" y1="20" y2="160" stroke="${COL.am}" stroke-dasharray="5 4"/><line x1="${X(ls)}" x2="${X(ls)}" y1="20" y2="160" stroke="${COL.am}" stroke-dasharray="5 4"/>` +
    `<text x="${X(li)}" y="178" text-anchor="middle" style="font-size:11px;fill:${COL.am}">0,9912</text><text x="${X(ls)}" y="178" text-anchor="middle" style="font-size:11px;fill:${COL.am}">1,0088</text></g>` +
    `<g data-en="b-mu"><path d="${curva(1.005, 1)}" fill="none" stroke="${COL.ro}" stroke-width="2.5"/><text x="${X(1.012)}" y="50" style="font-size:12px;fill:${COL.ro}">real: 1,005</text></g>` +
    `<g data-en="b-r"><path d="${beta}" fill="${COL.ro}" opacity=".35"/></g><text data-en="b-r" x="${X(1.002)}" y="140" style="font-size:13px;fill:#fff">β ≈ 0,80</text></svg>`;
}

const escenas = [
  portada(7, "Prueba 1", "Errores tipo I, tipo II y potencia", "Las dos formas de equivocarse al decidir"),

  { en: "idea", html: kicker("Una alarma de incendio") + titulo("Falsa alarma o fuego sin alarma") +
    tabla(["", "H₀ verdadera", "H₀ falsa"], [
      [{ v: "Se rechaza H₀", th: true }, c("<span class=\"pz-ro\"><strong>Error tipo I</strong></span> · α", "t1"), c("<span class=\"pz-ve\">Correcto</span> · potencia 1 − β", "pot")],
      [{ v: "No se rechaza H₀", th: true }, c("<span class=\"pz-ve\">Correcto</span>", "t1"), c("<span class=\"pz-ro\"><strong>Error tipo II</strong></span> · β", "t2")]]) +
    nota({ en: "balance-r" }, "Bajar α ⇒ prueba más exigente ⇒ <strong>sube β</strong>") +
    `<div class="pz-cols">` +
    nota({ en: "pauta-1r" }, "«Más muestra baja el error tipo I»: <strong>falso</strong>, es α", "mal") +
    nota({ en: "pauta-2r" }, "«No rechazo ⇒ H₀ verdadera»: <strong>falso</strong>, puede ser error tipo II", "mal") + "</div>" },

  { en: "beta", html: kicker("De qué depende β") + titulo("Hace falta un valor verdadero concreto") +
    nota({ en: "beta-r" }, "Sin un valor verdadero (p. ej. μ = 1,005), β <strong>no se puede calcular</strong>") +
    tabla(["Si…", "β"], [[c("aumenta n", "dep-n"), c("baja ↓", "dep-n")], [c("baja α", "dep-a"), c("sube ↑", "dep-a")], [c("la diferencia real es mayor", "dep-d"), c("baja ↓", "dep-d")], [c("hay más variabilidad", "dep-s"), c("sube ↑", "dep-s")]]) },

  { en: "ej", html: kicker("Ayudantía 2 · bolsas de 1 kg") + titulo("Límites con H₀, probabilidad con el valor real") +
    `<div class="pz-cols"><div style="height:44cqh">${dosCampanas()}</div><div class="pz-col">` +
    p({ en: "ej-d", clase: "pz-tenue" }, "σ = 0,02 · n = 20 · H₀: μ = 1 · α = 5 %") +
    `<div class="pz-caja-calc"><span class="pz-etq">1 · límites (con μ₀)</span><div class="pz-col">` +
    calc({ partes: [["lim-se", "\\frac{0{,}02}{\\sqrt{20}}"]], tRes: "lim-se@2", res: "0,0045" }) +
    calc({ partes: [["lim-f", "1\\pm1{,}96\\cdot0{,}0045"]], tRes: "lim-r", res: "[0,9912; 1,0088]" }) + "</div></div>" +
    p({ en: "lim-ojo", clase: "pz-tenue" }, "Límites siempre con <strong>H₀</strong>") +
    `<div class="pz-caja-calc"${M.at({ en: "b-f" })}><span class="pz-etq">2 · β (con μ = 1,005)</span>` +
    calc({ partes: [["b-f", "P(\\text{entre límites}\\mid\\mu=1{,}005)"]], tRes: "b-r", res: "≈ 0,80" }) + "</div>" +
    p({ en: "b-lee", clase: "pz-ro" }, "8 de cada 10 veces no lo detectaría") + "</div></div>" },

  { en: "b-qr", html: kicker("¿Cómo bajar β?") + titulo("Más datos o más diferencia") +
    tabla(["Escenario", "β"], [[c("n = 20, μ = 1,005", "b-qr"), c("0,80", "b-qr")], [c("n = <strong>80</strong>, μ = 1,005", "b-qr"), c("<strong>0,39</strong>", "b-qr@1", { hl: ["b-qr@1"] })], [c("n = 20, μ = <strong>1,01</strong>", "b-dif"), c("<strong>0,39</strong>", "b-dif", { hl: ["b-dif"] })]]) +
    `<div class="pz-cols"><div class="pz-col">` +
    p({ en: "var" }, "<strong>Lo mismo con varianzas</strong> (n = 10, H₀: σ² = 4)") +
    tabla(["Se rechaza si s² &lt;", "o s² &gt;", "β si σ² = 5"], [[c("1,20", "var-ej"), c("8,46", "var-ej"), c("<strong>0,90</strong>", "var-b")]], "pz-chica") +
    `</div><div class="pz-col">` +
    cod("r", `li <- 1 + qnorm(0.025) * se;  ls <- 1 + qnorm(0.975) * se
pnorm(ls, 1.005, se) - pnorm(li, 1.005, se)`, [["pnorm(ls, 1.005, se) - pnorm(li, 1.005, se)", "r-resta"]]) + "</div></div>" },

  cierre(7, [["c1", "Tipo I: rechazar H₀ verdadera (α)"], ["c2", "Tipo II: no rechazar H₀ falsa (β); potencia = 1 − β"], ["c3", "β baja con más n, α mayor, más diferencia y menos variabilidad"], ["c4", "Límites con H₀; probabilidad con el valor verdadero"]])
];
module.exports = { escenas };
