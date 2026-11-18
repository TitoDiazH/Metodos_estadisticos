"use strict";
/* Pizarra de M26 · Regresión lineal (clase del módulo). Marcas en tools/guiones/m26-regresion-lineal.txt.
   Ejemplo de clase: óxido nitroso (C8.1 s19–34), recalculado en R con p4calc. */
const P = require("./_p4");
const D = require("./_datos_modulos");
const { n, $, kicker, titulo, formula, nota, lista, p, div, s, C, COL } = P;

const r = C.ajustar({ datos: D.oxido, formula: "y ~ Hum + Temp + Pres", vif: true });
const nt = (x, d) => s(x, d || 4).replace(",", "{,}").replace("−", "-");
const iH = r.hat.indexOf(Math.max(...r.hat)), iC = r.cook.indexOf(Math.max(...r.cook));
const nom = { Hum: "Humedad", Temp: "Temperatura", Pres: "Presion" };

/* Recta con puntos y residuos (dibujo ilustrativo) */
function recta() {
  const pts = [[40, 150], [80, 118], [120, 128], [160, 92], [200, 96], [240, 62], [280, 70]];
  const yl = (x) => 160 - 0.36 * (x - 20);
  let h = `<svg viewBox="0 0 320 190" role="img"><path class="ejes" d="M20,10 V175 H310"/>` +
    `<path class="trazo" pathLength="1" data-en="modelo" d="M20,${yl(20)} L305,${yl(305)}" stroke="${COL.ce}" stroke-width="3" fill="none"/>`;
  pts.forEach(([x, y]) => {
    h += `<line data-en="error-r" x1="${x}" x2="${x}" y1="${y}" y2="${yl(x)}" stroke="${COL.ro}" stroke-width="2" stroke-dasharray="3 3"/>` +
      `<circle cx="${x}" cy="${y}" r="5" fill="${COL.am}"/>`;
  });
  return h + `<text data-en="error-r" x="168" y="86" style="font-size:13px;fill:${COL.ro}">eᵢ = yᵢ − ŷᵢ</text>` +
    `<text x="250" y="${yl(250) + 22}" style="font-size:13px;fill:${COL.ce}">ŷ = b₀ + b₁x</text></svg>`;
}

/* Tres patrones de residuos */
function patron(tipo, en) {
  const xs = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200];
  const ys = tipo === "ok" ? [8, -12, 5, -6, 14, -9, 3, -13, 10, -4]
    : tipo === "u" ? [-30, -14, -2, 8, 14, 12, 6, -4, -16, -30].map((v) => -v)
    : [2, -3, 6, -8, 12, -14, 18, -22, 26, -30];
  const col = tipo === "ok" ? COL.ve : COL.ro;
  return `<svg viewBox="0 0 220 110" data-en="${en}" style="width:100%"><line x1="10" x2="210" y1="55" y2="55" stroke="${COL.ce}" stroke-dasharray="4 4" opacity=".6"/>` +
    xs.map((x, i) => `<circle cx="${x}" cy="${55 + ys[i]}" r="4.5" fill="${col}"/>`).join("") + "</svg>";
}

/* Parábola del fertilizante (Ayudantía 10, P4) */
function fertil() {
  const f = (d) => 3.121 + 0.03268 * d - 0.0001118 * d * d;
  const X = (d) => 40 + (d / 300) * 300, Y = (v) => 190 - ((v - 2.8) / (5.9 - 2.8)) * 170;
  const curva = Array.from({ length: 61 }, (_, i) => i * 5).map((d, i) => `${i ? "L" : "M"}${X(d).toFixed(1)},${Y(f(d)).toFixed(1)}`).join(" ");
  const tg = (d0, en, txt) => {
    const sl = 0.03268 - 0.0002236 * d0, a = d0 - 45, b = d0 + 45;
    return `<g data-en="${en}"><path class="trazo" pathLength="1" data-en="${en}" d="M${X(a)},${Y(f(d0) + sl * (a - d0))} L${X(b)},${Y(f(d0) + sl * (b - d0))}" stroke="${COL.ro}" stroke-width="2.5" fill="none"/>` +
      `<circle cx="${X(d0)}" cy="${Y(f(d0))}" r="5" fill="${COL.ro}"/><text x="${X(d0) + 6}" y="${Y(f(d0)) + 20}" style="font-size:12px;fill:${COL.ro}">${txt}</text></g>`;
  };
  return `<svg viewBox="0 0 360 220" role="img"><path class="ejes" d="M40,10 V190 H350"/>` +
    `<text x="195" y="214" text-anchor="middle" style="font-size:12px;opacity:.75">dosis d (kg/ha)</text>` +
    `<text x="14" y="100" transform="rotate(-90 14 100)" text-anchor="middle" style="font-size:12px;opacity:.75">rendimiento</text>` +
    `<path class="trazo" pathLength="1" data-en="fert" d="${curva}" fill="none" stroke="${COL.ce}" stroke-width="3"/>` +
    tg(40, "fert-d", "pendiente 0,024") +
    `<g data-en="fert-0"><line x1="${X(146.15)}" x2="${X(146.15)}" y1="20" y2="190" stroke="${COL.ve}" stroke-dasharray="4 4"/>` +
    `<circle cx="${X(146.15)}" cy="${Y(f(146.15))}" r="6" fill="${COL.ve}"/><text x="${X(146.15) + 8}" y="${Y(f(146.15)) - 8}" style="font-size:13px;fill:${COL.ve}">d* ≈ 146 · 5,51 t/ha</text></g></svg>`;
}

module.exports = { escenas: [
  { en: "inicio", html: `<div class="pz-centro">${kicker("Módulo 23 · Prueba 4")}` +
    `<h3 class="pz-t" style="font-size:2.3em">Regresión lineal</h3>` + p({ clase: "pz-st" }, "Simple, múltiple y polinomial · la base de la superficie de respuesta") + "</div>" },

  { en: "idea", html: kicker("La idea") + titulo("Explicar una respuesta y con una o varias x") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "modelo" }, "Y=\\beta_0+\\beta_1x+\\varepsilon") +
    lista([["modelo-p", `${$("\\beta_0")} intercepto · ${$("\\beta_1")} pendiente · ${$("\\varepsilon")} error: media 0, varianza ${$("\\sigma^2")}`]]) +
    p({ en: "error" }, "<strong>Error y residuo no son lo mismo</strong>") +
    nota({ en: "error-e" }, `Error ${$("\\varepsilon_i")}: respecto de la recta <strong>verdadera</strong> ⇒ no se observa`) +
    nota({ en: "error-r" }, `Residuo ${$("e_i=y_i-\\hat y_i")}: respecto de la recta <strong>estimada</strong> ⇒ sí se calcula`, "ok") +
    `</div><div class="pz-col" data-en="modelo">${recta()}</div></div>` },

  { en: "mc", html: kicker("Mínimos cuadrados y R²") + titulo("La recta que minimiza Σ eᵢ²") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "mc" }, "\\min\\sum e_i^2=\\min\\sum(y_i-b_0-b_1x_i)^2") +
    formula({ en: "mc-f" }, "b_1=\\frac{\\sum(x_i-\\bar x)(y_i-\\bar y)}{\\sum(x_i-\\bar x)^2}") + formula({ en: "mc-f" }, "b_0=\\bar y-b_1\\bar x") +
    `</div><div class="pz-col">` + p({ en: "r2" }, "<strong>¿Qué tan bien ajusta?</strong>") +
    formula({ en: "r2-sc" }, "STC=SCR+SCE") +
    formula({ en: "r2-f" }, "R^2=\\frac{SCR}{STC}=1-\\frac{SCE}{STC}") +
    nota({ en: "r2-l" }, "Entre 0 y 1: fracción de la variación de y que <strong>explica el modelo</strong>", "ok") + "</div></div>" },

  { en: "mult", html: kicker("Regresión múltiple") + titulo("Un plano (o hiperplano)") +
    formula({ en: "mult" }, "y=\\beta_0+\\beta_1x_1+\\dots+\\beta_kx_k+\\varepsilon") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "mat" }, "\\mathbf Y=\\mathbf X\\beta+\\varepsilon") +
    formula({ en: "mat-b" }, "\\hat\\beta=(\\mathbf X'\\mathbf X)^{-1}\\mathbf X'\\mathbf Y") +
    formula({ en: "s2" }, "s^2=\\frac{SCE}{n-k-1}") + `</div><div class="pz-col">` +
    p({ en: "sup" }, "<strong>Supuestos</strong> (sobre los errores):") +
    lista([["sup-1", "Relación lineal"], ["sup-2", "Media 0 y varianza constante σ²"], ["sup-3", "Independientes"], ["sup-4", "Normales (para las pruebas)"]]) +
    nota({ en: "s2" }, `${$("k")} = n.º de regresores · ${$("n-k-1")} = gl del error`) + "</div></div>" },

  { en: "ox", html: kicker("Ejemplo de clase · 20 camiones diésel") + titulo("Óxido nitroso según humedad, temperatura y presión") +
    P.tablaCoef(r, { nombres: nom, enFilas: "oxsal", filas: { Hum: { en: "oxsal", hl: ["hum", "tno"] } } }) +
    formula({ en: "ec" }, `\\hat y=${nt(r.est[0])}${nt(r.est[1], 3)}\\,Hum+${nt(r.est[2], 3)}\\,Temp+${nt(r.est[3], 3)}\\,Pres`) +
    `<div class="pz-cols"><div class="pz-col">` +
    nota({ en: "hum" }, "Humedad: +1 punto ⇒ la emisión baja en promedio <strong>0,0026 ppm</strong>") +
    nota({ en: "fijos" }, "… <strong>manteniendo fijas</strong> temperatura y presión", "ok") + `</div><div class="pz-col">` +
    formula({ en: "deriv" }, "b_j=\\frac{\\partial\\hat y}{\\partial x_j}") +
    nota({ en: "b0" }, "Intercepto: x = 0 fuera del rango ⇒ no se interpreta", "mal") + "</div></div>" },

  { en: "t", html: kicker("Pruebas t") + titulo("¿Aporta cada variable?") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "t" }, "H_0:\\beta_j=0\\qquad t=\\frac{b_j}{ee(b_j)}\\sim t_{n-k-1}") +
    P.calc({ partes: [["thum", `t_{Hum}=\\dfrac{${nt(r.est[1])}}{${nt(r.se[1], 3)}}`]], tRes: "thum@5", res: n(r.t[1], 2) }) +
    nota({ en: "thum-c" }, `${$("p=" + nt(r.p[1], 2))} &lt; 0,05 ⇒ se rechaza ${$("H_0")}: <strong>la humedad explica la emisión</strong>`, "ok") +
    nota({ en: "tno" }, `Temperatura ${$("p=" + nt(r.p[2], 2))} · Presión ${$("p=" + nt(r.p[3], 2))} ⇒ no significativas al 5 %`, "mal") +
    `</div><div class="pz-col">` +
    nota({ en: "alfa" }, "R <strong>siempre</strong> prueba β = 0. Si preguntan por otro valor:") +
    formula({ en: "alfa-f" }, "H_0:\\beta_j=\\alpha\\qquad t=\\frac{b_j-\\alpha}{ee(b_j)}") +
    p({ en: "alfa-ej" }, "Walpole 12.1: ¿cada unidad de temperatura agrega 2 min?") +
    formula({ en: "alfa-ej" }, "t=\\frac{2{,}0497-2}{0{,}0481}=1{,}03") +
    nota({ en: "alfa-dec" }, `${$("1{,}03\\lt t_{0{,}975;7}=2{,}365")} ⇒ no se rechaza: compatible con 2 min`, "ok") + "</div></div>" },

  { en: "f", html: kicker("F global y R² ajustado") + titulo("¿Sirve el modelo en su conjunto?") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "f" }, "H_0:\\beta_1=\\dots=\\beta_k=0") + formula({ en: "f" }, "H_1:\\text{algún }\\beta_j\\neq0") +
    formula({ en: "fv" }, `F=${nt(r.F, 3)}\\ (3;\\ 16\\text{ gl}),\\quad p=${nt(r.pF * 1e6, 2)}\\cdot10^{-6}`) +
    nota({ en: "fv@6" }, "Se rechaza: al menos una variable explica la emisión", "ok") +
    formula({ en: "r2v" }, `R^2=${nt(r.r2, 3)}\\ \\Rightarrow\\ 80\\,\\%\\text{ explicado}`) +
    `</div><div class="pz-col">` +
    nota({ en: "r2aj" }, "R² <strong>siempre sube</strong> al agregar variables") +
    formula({ en: "r2aj" }, "R^2_{aj}=1-(1-R^2)\\frac{n-1}{n-k-1}") +
    formula({ en: "r2aj-v" }, `=1-(1-${nt(r.r2, 4)})\\tfrac{19}{16}=${nt(r.r2a, 3)}`) +
    p({ en: "comp" }, "<strong>Completar una salida:</strong>") +
    lista([["comp-1", `${$("t=b/ee")}`], ["comp-2", `${$("R^2=SCR/STC")}`], ["comp-3", `${$("F=\\dfrac{SCR/k}{SCE/(n-k-1)}")}`]]) + "</div></div>" },

  { en: "poli", html: kicker("Regresión polinomial") + titulo("x² es un regresor más") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "poli" }, "y=\\beta_0+\\beta_1x+\\beta_2x^2+\\varepsilon") +
    P.codigo("poli-r", "lm(y ~ x + I(x^2))   # sin I() no agrega el cuadrado") +
    nota({ en: "pend" }, `${$("b_1")} ya <strong>no</strong> es la pendiente`, "mal") +
    formula({ en: "pend-f" }, "\\frac{\\partial\\hat y}{\\partial x}=b_1+2b_2x") +
    formula({ en: "pend-0" }, "x^*=-\\frac{b_1}{2b_2}") + nota({ en: "pend-0" }, "Ahí la pendiente es 0 · si b₂ &lt; 0 es un <strong>máximo</strong>", "ok") +
    formula({ en: "inter" }, "\\text{interacción: }\\frac{\\partial\\hat y}{\\partial x_1}=b_1+b_{12}x_2") +
    `</div><div class="pz-col">` +
    formula({ en: "fert" }, "\\hat r=3{,}121+0{,}03268\\,d-0{,}0001118\\,d^2") +
    formula({ en: "fert-d" }, "\\frac{\\partial\\hat r}{\\partial d}=0{,}03268-0{,}0002236\\,d") +
    fertil() + "</div></div>" },

  { en: "diag", html: kicker("Supuestos y diagnóstico") + titulo("Se revisan con los residuos: plot(modelo)") +
    `<div class="pz-cols pz-cols-3" style="text-align:center">` +
    div({}, patron("ok", "rva-ok") + p({ en: "rva-ok" }, "Nube sin forma ✓")) +
    div({}, patron("u", "rva-u") + p({ en: "rva-u" }, "Curva ⇒ falta x²")) +
    div({}, patron("emb", "rva-emb") + p({ en: "rva-emb" }, "Embudo ⇒ transformar y (log)")) + "</div>" +
    `<div class="pz-cols"><div class="pz-col">` + p({ en: "rva" }, "<strong>Óxido nitroso:</strong> residuos vs ajustados") +
    P.residuos(r, { en: "rva", ancho: 330, alto: 180 }) + `</div><div class="pz-col">` +
    P.qq(r, { en: "qq", enLinea: "qq", ancho: 300, alto: 180 }) +
    nota({ en: "sw" }, `Shapiro-Wilk ${$("p=" + nt(r.sw, 3))} ⇒ no se rechaza la normalidad`, "ok") + "</div></div>" },

  { en: "infl", html: kicker("Puntos influyentes y multicolinealidad") + titulo("¿Algún punto o variable distorsiona el ajuste?") +
    `<div class="pz-cols pz-cols-3"><div class="pz-col">` +
    formula({ en: "hat" }, "h_{ii}>\\tfrac{2(k+1)}{n}=0{,}40") +
    P.barras({ valores: r.hat, etiquetas: r.hat.map((_, i) => ((i + 1) % 2 ? i + 1 : "")), corte: 0.4, etqCorte: "0,40", en: "hat-v", ancho: 260, alto: 150 }) +
    p({ en: "hat-v" }, `Máx. ${n(r.hat[iH], 3)} (obs. ${iH + 1}) ✓`) +
    `</div><div class="pz-col">` +
    formula({ en: "cook" }, "D_i>1") +
    P.barras({ valores: r.cook, etiquetas: r.cook.map((_, i) => ((i + 1) % 2 ? i + 1 : "")), corte: 1, etqCorte: "1", en: "cook-v", ancho: 260, alto: 150, max: 1.15 }) +
    p({ en: "cook-v" }, `Máx. ${n(r.cook[iC], 2)} (obs. ${iC + 1}) ✓`) +
    nota({ en: "noelim" }, "No se borra solo: ¿error de registro o caso real?", "mal") +
    `</div><div class="pz-col">` +
    formula({ en: "vif-f" }, "VIF_j=\\frac{1}{1-R_j^2}") +
    nota({ en: "vif-c" }, "VIF &gt; 5 (o 10) ⇒ preocupante") +
    P.barras({ valores: r.vif, etiquetas: ["Hum", "Temp", "Pres"], corte: 5, etqCorte: "5", en: "vif-v", ancho: 240, alto: 150, mostrar: true, max: 6 }) +
    p({ en: "vif" }, "Correlación alta ⇒ errores estándar inflados") + "</div></div>" },

  { en: "resp", html: kicker("Cerrar una respuesta") + titulo("Lo que exige el instructivo") +
    lista([["resp-1", "<strong>Estadístico</strong> o valor-p"], ["resp-2", "<strong>Decisión</strong>: se rechaza / no se rechaza H₀"], ["resp-3", "<strong>Conclusión en el contexto</strong>: «la humedad explica la emisión de óxido nitroso»"]]) +
    nota({ en: "resp-3@3" }, "«Se rechaza H₀» solo, no basta", "mal") },

  { en: "cierre", html: kicker("Para cerrar") + titulo("Lo que hay que llevarse") +
    lista([["c1", "bⱼ = cambio esperado en y por unidad de xⱼ, <strong>con las demás fijas</strong>"], ["c2", "t = (b − α)/ee · R prueba α = 0"], ["c3", "F global: el modelo completo · R² ajustado: comparar modelos"],
      ["c4", "Polinomio: efecto = derivada b₁ + 2b₂x"], ["c5", "Residuos · apalancamiento 2(k+1)/n · Cook &gt; 1 · VIF &gt; 5"]]) +
    p({ en: "fin" }, "Módulo 23 · Regresión lineal") }
] };
