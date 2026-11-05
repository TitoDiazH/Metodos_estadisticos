"use strict";
const { n, $, c, k, kicker, titulo, tabla, formula, nota, p, paso, lista, portada, enunciado, COL } = require("./_ej");
/* Elipse de datos con los ejes de los componentes */
const svg = `<svg viewBox="0 0 300 220"><path class="ejes" d="M30,200 H290 M30,200 V10"/>` +
  `<ellipse cx="160" cy="110" rx="105" ry="38" transform="rotate(-26.57 160 110)" fill="${COL.ce}" opacity=".15" stroke="${COL.ce}"/>` +
  `<line class="trazo" pathLength="1" data-en="vec-norm" x1="66" y1="157" x2="254" y2="63" stroke="${COL.am}" stroke-width="3"/>` +
  `<text x="258" y="58" data-en="vec-norm" style="fill:${COL.am}">PC1</text>` +
  `<line class="trazo" pathLength="1" data-en="var-2" x1="145" y1="80" x2="175" y2="140" stroke="${COL.ro}" stroke-width="2.5"/>` +
  `<text x="180" y="150" data-en="var-2" style="fill:${COL.ro}">PC2</text><text x="160" y="216" text-anchor="middle">ventas</text>` +
  `<text x="16" y="110" transform="rotate(-90 16 110)" text-anchor="middle">utilidad</text></svg>`;
module.exports = { escenas: [
  portada("Ejercicio tipo prueba · PCA a mano", "Componentes principales con una matriz 2 × 2", "Pregunta adicional de P4 · se promedia con P1"),
  enunciado("Ejercicio tipo prueba", `Ventas (X₁) y utilidad (X₂) de un grupo de empresas. ${k("clave1", "Matriz de covarianza:")} $$S=\\begin{pmatrix}5&2\\\\2&2\\end{pmatrix}$$ ` +
    `${k("clave2", "Pide: autovalores, % de varianza y autovector de PC1")}.`),
  { en: "car", html: kicker("Paso 1 · Autovalores") + titulo("Ecuación característica") +
    `<div class="pz-col" style="font-size:1.05em">` +
    paso(1, "car", $("|S-\\lambda I|=0")) + paso(2, "det", $("(5-\\lambda)(2-\\lambda)-2^2=0")) + paso(3, "cuad", $("\\lambda^2-7\\lambda+6=0")) +
    paso(4, "raices", $("\\lambda=\\dfrac{7\\pm\\sqrt{49-24}}{2}=\\dfrac{7\\pm5}{2}")) +
    paso(5, "raices-r", $("\\lambda_1=\\mathbf{6},\\qquad \\lambda_2=\\mathbf{1}")) + "</div>" +
    nota({ en: "chequeo" }, `Chequeo: ${$("\\lambda_1+\\lambda_2=7=\\text{traza}")} · ${$("\\lambda_1\\lambda_2=6=|S|")}`, "ok") },
  { en: "var", html: kicker("Paso 2 · Varianza explicada") + titulo("Total = traza = 7") +
    `<div class="pz-cols"><div class="pz-col">` +
    formula({ en: "var-1" }, "PC_1:\\ \\frac{6}{7}=\\mathbf{85{,}7\\,\\%}") + formula({ en: "var-2" }, "PC_2:\\ \\frac{1}{7}=14{,}3\\,\\%") +
    nota({ en: "var-r" }, "Con 1 componente ya se supera el 80 %", "ok") + `</div><div style="height:52cqh">${svg}</div></div>` },
  { en: "vec", html: kicker("Paso 3 · Autovector de λ₁ = 6") + titulo("(S − 6I) v = 0") +
    `<div class="pz-col" style="font-size:1.05em">` +
    paso(1, "vec-fila", $("(5-6)v_1+2v_2=0\;\\Rightarrow\;v_1=2v_2")) + paso(2, "vec-prop", $("v\\propto(2;\\ 1)")) +
    paso(3, "vec-norm", $("\\|v\\|=\\sqrt{4+1}=2{,}236\;\\Rightarrow\;v_1=(\\mathbf{0{,}894};\\ \\mathbf{0{,}447})")) + "</div>" +
    formula({ en: "interp" }, "PC_1=0{,}894\\,X_1+0{,}447\\,X_2") +
    nota({ en: "interp-r" }, "Mismo signo ⇒ índice de <strong>tamaño</strong>; pesa más ventas (más varianza)", "ok") +
    nota({ en: "signo" }, "El signo del autovector es arbitrario: (−0,894; −0,447) es el mismo componente") },
  { en: "fin", html: kicker("Cierre") + titulo("Esquema para la prueba") +
    lista([["fin", "Ecuación característica y raíces"], ["fin", "Chequeo: traza y determinante"], ["fin", "% de varianza = λ / traza"], ["fin", "Autovector normalizado e interpretación por signos"]]) }
] };
