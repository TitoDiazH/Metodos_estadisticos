"use strict";
const P = require("./_p4"), { kicker, titulo, formula, nota, lista, p } = P;
module.exports = { escenas: [
  P.portada("Consejos para la prueba", "Superficie de respuesta", "Resumen y receta paso a paso · Prueba 4"),
  { en: "inst", html: kicker("Qué te van a preguntar") + titulo("Tres partes") +
    lista([["i1", "Interpretar el modelo de 2.º orden: lineales, cuadráticos, interacciones; ¿curvatura? ¿interacción?"], ["i2", "Leer la salida de R: p, términos significativos, F, R², ¿es adecuado?"], ["i3", "Punto estacionario <strong>a mano</strong> y clasificarlo con la <strong>hessiana</strong>"]]) +
    nota({ en: "i3@6" }, "Datos: libro guía cap. 12, ej. 22–29 (todos en Desarrollo con video)") },
  { en: "dis", html: kicker("Reconocer el diseño") + titulo("¿Qué diseño es?") +
    lista([["d1", "<strong>2^k + centro</strong>: esquinas ±1 y centro repetido · explora, no estima curvatura"], ["d2", "<strong>Central compuesto</strong>: esquinas + axiales (±α) + centro · rotable si α = (2^k)^¼ (k = 2: 1,414)"], ["d3", "<strong>Box-Behnken</strong>: medio de las aristas + centro, 3 niveles"]]) +
    formula({ en: "cod" }, "x=\\dfrac{X-\\text{centro}}{\\text{semirrango}}\\qquad X=\\text{centro}+x\\cdot\\text{semirrango}") },
  { en: "sal", html: kicker("Leer la salida") + titulo("Términos y adecuación") +
    lista([["s1", "Cuadrático significativo ⇒ <strong>curvatura</strong> (− hacia abajo, + hacia arriba)"], ["s2", "Interacción significativa ⇒ el efecto de un factor depende del otro"], ["s3", "F global · R² · R² ajustado"], ["s4", "Falta de ajuste (réplicas del centro): p alto es lo deseado"]]) +
    nota({ en: "pista" }, "Pista: cuadráticos del mismo signo ⇒ máx. o mín.; de signos opuestos ⇒ silla", "ok") },
  { en: "pe", html: kicker("Punto estacionario") + titulo("Derivar · igualar a 0 · resolver") +
    formula({ en: "pe1" }, "\\frac{\\partial\\hat y}{\\partial x_1}=b_1+2b_{11}x_1+b_{12}x_2=0\\qquad\\frac{\\partial\\hat y}{\\partial x_2}=b_2+b_{12}x_1+2b_{22}x_2=0") +
    formula({ en: "cramer" }, "D=4b_{11}b_{22}-b_{12}^2=\\det H") +
    formula({ en: "cr1" }, "x_1^*=\\dfrac{b_{12}b_2-2b_{22}b_1}{D}\\qquad x_2^*=\\dfrac{b_{12}b_1-2b_{11}b_2}{D}") +
    formula({ en: "sinint" }, "\\text{sin interacción: }x_i^*=-\\dfrac{b_i}{2b_{ii}}") +
    formula({ en: "yest" }, "\\hat y_s=b_0+\\tfrac12\\sum_i b_ix_i^*") },
  { en: "hes", html: kicker("Clasificar") + titulo("La hessiana") +
    formula({ en: "hes" }, "H=\\begin{pmatrix}2b_{11}&b_{12}\\\\b_{12}&2b_{22}\\end{pmatrix}=2B,\\qquad B=\\begin{pmatrix}b_{11}&b_{12}/2\\\\b_{12}/2&b_{22}\\end{pmatrix}") +
    lista([["h2", "det H &gt; 0 y h₁₁ &lt; 0 ⇒ <strong>máximo</strong> · det H &gt; 0 y h₁₁ &gt; 0 ⇒ <strong>mínimo</strong> · det H &lt; 0 ⇒ <strong>silla</strong>"], ["h3", "k = 3: valores propios — todos &lt; 0 máx · todos &gt; 0 mín · mezclados silla"]]) +
    nota({ en: "ojob" }, "B lleva b₁₂/2 fuera de la diagonal; H = 2B lleva b₁₂ completo", "mal") },
  { en: "opt", html: kicker("¿Es el óptimo?") + titulo("Dos preguntas antes de recomendar") +
    lista([["o1", "¿Es del tipo buscado? (máximo si se maximiza)"], ["o2", "¿Está dentro de la región? Si algo falla ⇒ <strong>frontera</strong> (esquinas y bordes), sin extrapolar"], ["o3", "Confirmar con corridas reales"]]) },
  { en: "err", html: kicker("Errores típicos") + titulo("Lo que más resta puntaje") +
    lista([["e1", "Olvidar el 2 al derivar x²"], ["e2", "Dar el punto en codificado cuando piden condiciones de operación"], ["e3", "Recomendar una silla o un punto fuera de la región"], ["e4", "Descartar el modelo porque un lineal no es significativo (jerarquía)"]]) },
  { en: "fin", html: kicker("Para cerrar") + titulo("La receta") +
    lista([["fin", "Diseño y codificación"], ["fin@3", "Términos y significancia · F · R² · falta de ajuste"], ["fin@6", "Derivar → igualar a 0 → resolver"], ["fin@8", "Hessiana / valores propios"], ["fin@9", "Unidades reales · ¿tipo buscado y dentro?"]]) }
] };
