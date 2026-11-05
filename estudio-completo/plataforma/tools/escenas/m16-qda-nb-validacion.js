/* Pizarra de M16 · QDA, Naive Bayes y validación. Marcas en tools/guiones/m16-qda-nb-validacion.txt. */
"use strict";
const M = require("./_mod");
const { n, $, kicker, titulo, tabla, lista, formula, nota, paso, div, p, calc, portada, cierre, cod, COL } = M;

/* Esquema de fronteras: recta (LDA) vs curva (QDA) */
const fronteras = `<svg viewBox="0 0 320 200"><ellipse cx="100" cy="110" rx="60" ry="35" transform="rotate(-25 100 110)" fill="${COL.ve}" opacity=".18" stroke="${COL.ve}"/>` +
  `<g data-en="qda"><ellipse cx="225" cy="95" rx="70" ry="22" transform="rotate(30 225 95)" fill="${COL.ro}" opacity=".18" stroke="${COL.ro}"/></g>` +
  `<g data-en="lda" data-hasta="qda"><ellipse cx="225" cy="95" rx="60" ry="35" transform="rotate(-25 225 95)" fill="${COL.ro}" opacity=".18" stroke="${COL.ro}"/></g>` +
  `<path class="trazo" pathLength="1" data-en="lda-f" d="M150,10 L170,190" stroke="${COL.am}" stroke-width="3"/>` +
  `<path class="trazo" pathLength="1" data-en="qda-f" d="M135,10 C190,70 120,130 175,190" stroke="${COL.ce}" stroke-width="3" fill="none"/>` +
  `<text data-en="lda-f" x="178" y="185" style="font-size:12px;fill:${COL.am}">LDA</text><text data-en="qda-f" x="112" y="22" style="font-size:12px;fill:${COL.ce}">QDA</text></svg>`;

const escenas = [
  portada(16, "Prueba 2", "QDA, Naive Bayes y validación", "Otras reglas de clasificación y cómo medir si funcionan"),

  { en: "lda", html: kicker("LDA vs QDA") + titulo("¿Misma covarianza en cada grupo?") +
    `<div class="pz-cols pz-cols-64"><div style="height:44cqh">${fronteras}</div><div class="pz-col">` +
    nota({ en: "lda" }, "<strong>LDA</strong>: misma Σ ⇒ frontera <span class=\"pz-am\">recta</span>") +
    nota({ en: "qda" }, "<strong>QDA</strong>: Σ propia por grupo ⇒ frontera <span class=\"pz-ce\">curva</span>") +
    nota({ en: "costo-r" }, "QDA estima muchos más parámetros ⇒ inestable con pocos datos", "mal") + "</div></div>" },

  { en: "box", html: kicker("Test de Box") + titulo("H₀: Σ₁ = Σ₂ = … = Σₖ") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["p-valor", "Decisión"], [[{ v: "> 0,05", en: "box-si" }, { v: "no se rechaza ⇒ <strong>LDA</strong>", en: "box-si" }], [{ v: "≤ 0,05", en: "box-no" }, { v: "se rechaza ⇒ <strong>QDA</strong>", en: "box-no" }]]) +
    nota({ en: "box-pr" }, "Con muestras pequeñas, preferir LDA igual") + `</div><div class="pz-col">` +
    `<div class="pz-caja-calc"${M.at({ en: "box-ej" })}><span class="pz-etq">Ademuz</span>` +
    calc({ partes: [["box-ej", "\\chi^2=0{,}80,\\ \\ gl=3,\\ \\ p=0{,}85"]], tRes: "box-ej-r", res: "LDA" }) + "</div>" +
    nota({ en: "box-ej-q" }, "QDA da la misma matriz de confusión", "ok") + "</div></div>" },

  { en: "nb", html: kicker("Naive Bayes") + titulo("Probabilidades de pertenecer a cada grupo") +
    formula({ en: "nb-f" }, "P(C_k\\mid x)\\ \\propto\\ \\underbrace{P(C_k)}_{\\text{prior}}\\ \\cdot\\ \\underbrace{\\prod_j P(x_j\\mid C_k)}_{\\text{verosimilitudes}}") +
    nota({ en: "naive" }, "«Ingenuo»: dentro de cada grupo las variables se suponen <strong>independientes</strong> ⇒ se multiplican") +
    `<div class="pz-cols">` +
    nota({ en: "nb-cont" }, "Continua: normal con media y sd del grupo · <code>dnorm</code>") + nota({ en: "nb-cat" }, "Categórica: frecuencia relativa en el grupo") + "</div>" },

  { en: "nb-ej", html: kicker("Ademuz con Naive Bayes") + titulo("Cliente nuevo: patrimonio 7, deuda 4") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["Grupo", "f(pat)", "f(deuda)", "prior"], [
      [{ v: "Fallido", th: true }, { v: "0,121", en: "nb-ej-f", id: "f1" }, { v: "0,185", en: "nb-ej-f", id: "f2" }, { v: "0,5", en: "nb-ej-f", id: "f3" }],
      [{ v: "Cumplidor", th: true }, { v: "0,119", en: "nb-ej-c", id: "c1" }, { v: "0,194", en: "nb-ej-c", id: "c2" }, { v: "0,5", en: "nb-ej-c", id: "c3" }]]) +
    `</div><div class="pz-col"><div class="pz-caja-calc"><span class="pz-etq">puntajes</span><div class="pz-col">` +
    `<div class="pz-suma">F: <span data-en="nb-ej-f@0.3" data-desde="f1">0,121</span> · <span data-en="nb-ej-f@0.9" data-desde="f2">0,185</span> · <span data-en="nb-ej-f@1.5" data-desde="f3">0,5</span> <span data-en="nb-ej-fr" class="pz-t-op">=</span> <span data-en="nb-ej-fr" class="pz-res">0,0112</span></div>` +
    `<div class="pz-suma">C: <span data-en="nb-ej-c@0.3" data-desde="c1">0,119</span> · <span data-en="nb-ej-c@0.9" data-desde="c2">0,194</span> · <span data-en="nb-ej-c@1.5" data-desde="c3">0,5</span> <span data-en="nb-ej-cr" class="pz-t-op">=</span> <span data-en="nb-ej-cr" class="pz-res" data-hl="nb-ej-r">0,0115</span></div>` +
    "</div></div>" +
    nota({ en: "nb-ej-r" }, "0,0115 &gt; 0,0112 ⇒ <strong>Cumplidor</strong> (por muy poco)", "ok") +
    formula({ en: "post" }, "P(C\\mid x)=\\frac{0{,}0115}{0{,}0112+0{,}0115}\\approx0{,}51") + "</div></div>" },

  { en: "prior", html: kicker("Detalles de Naive Bayes") + titulo("El prior, las densidades y los ceros") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["Priors (fracaso; éxito)", "Decisión pyme"], [[{ v: "0,5 ; 0,5", en: "prior-ej" }, { v: "Fracaso", en: "prior-ej" }], [{ v: "0,2 ; 0,8", en: "prior-ej2" }, { v: "<strong>Éxito</strong>", en: "prior-ej2", hl: ["prior-ej2", "prior-r"] }]], "pz-chica") +
    nota({ en: "prior-r" }, "El grupo más frecuente necesita menos evidencia") +
    nota({ en: "dens-r" }, "<code>dnorm</code> = 2,4 no es error: es una <strong>densidad</strong>, no una probabilidad") +
    `</div><div class="pz-col">` +
    nota({ en: "cero-r" }, "Una categoría que nunca aparece en un grupo ⇒ frecuencia 0 ⇒ el producto entero es 0", "mal") +
    formula({ en: "laplace" }, "P(x_j=v\\mid C_k)=\\frac{n_{v}+1}{n_k+m_j}") +
    calc({ etiqueta: "Ayudantía: ", partes: [["laplace-ej", "\\frac{0}{5}\\ \\to\\ \\frac{0+1}{5+2}"]], tRes: "laplace-ej@2", res: "1/7" }) +
    cod("laplace-r", "naiveBayes(grupo ~ ., data = datos, laplace = 1)") + "</div></div>" },

  { en: "comp", html: kicker("Los tres métodos") + titulo("LDA ⊂ QDA · Naive Bayes = QDA diagonal") +
    tabla(["", "LDA", "QDA", "Naive Bayes"], [
      [{ v: "Covarianza", th: true }, { v: "común", en: "comp-1" }, { v: "una por grupo", en: "comp-1" }, { v: "diagonal", en: "comp-2" }],
      [{ v: "Frontera", th: true }, { v: "recta", en: "comp-1" }, { v: "curva", en: "comp-1" }, { v: "no lineal", en: "comp-2" }],
      [{ v: "Conviene", th: true }, { v: "pocos datos, Σ parecidas", en: "comp-3" }, { v: "Σ distintas, muchos datos", en: "comp-3" }, { v: "muchas variables o categóricas", en: "comp-3" }]]) },

  { en: "conf", html: kicker("Evaluar un clasificador") + titulo("Matriz de confusión · positivo = Cumplidor") +
    `<div class="pz-cols"><div class="pz-col">` +
    tabla(["Real \\ Pred.", "Cumplidor", "Fallido"], [
      [{ v: "Cumplidor", th: true }, { v: "VP = 7", en: "conf-v", id: "vp", hl: ["sens", "esp"] }, { v: "FN = 1", en: "conf-v", id: "fn", hl: ["sens", "esp"] }],
      [{ v: "Fallido", th: true }, { v: "FP = 0", en: "conf-v", id: "fp", hl: ["prec"] }, { v: "VN = 8", en: "conf-v", id: "vn", hl: ["esp", "prec"] }]]) +
    nota({ en: "desb" }, "Con clases desbalanceadas la exactitud engaña: «siempre paga» = 95 % y no sirve", "mal") +
    `</div><div class="pz-col"><div class="pz-caja-calc"><span class="pz-etq">métricas</span><div class="pz-col">` +
    calc({ etiqueta: "Exactitud ", partes: [["acc", "\\frac{VP+VN}{n}=\\frac{15}{16}"]], tRes: "acc@1.5", res: "93,75 %" }) +
    calc({ etiqueta: "Sensibilidad ", partes: [["sens", "\\frac{VP}{VP+FN}=\\frac{7}{8}"]], tRes: "sens@2", res: "87,5 %" }) +
    calc({ etiqueta: "Especificidad ", partes: [["esp", "\\frac{VN}{VN+FP}=\\frac{8}{8}"]], tRes: "esp@1.5", res: "100 %" }) +
    calc({ etiqueta: "Precisión ", partes: [["prec", "\\frac{VP}{VP+FP}=\\frac{7}{7}"]], tRes: "prec@2", res: "100 %" }) + "</div></div></div></div>" },

  { en: "sobre", html: kicker("Validación") + titulo("Medir con datos que el modelo no vio") +
    nota({ en: "sobre-def" }, "<strong>Sobreajuste</strong>: memoriza el entrenamiento y falla con datos nuevos", "mal") +
    `<div class="pz-cols pz-cols-3">` +
    nota({ en: "tt" }, "<strong>Train / test</strong>: 70–80 % / 20–30 %") +
    nota({ en: "kfold" }, "<strong>k-fold</strong>: k partes, rotar la de prueba") +
    nota({ en: "loo" }, "<strong>Dejar uno fuera</strong>: k = n, ideal con n chico") + "</div>" +
    cod("loo-r", "lda(grupo ~ patrimonio + deuda, data = datos, CV = TRUE)", [["CV = TRUE", "loo-r"]]) +
    tabla(["Evaluación", "Exactitud"], [[{ v: "Entrenamiento", en: "loo-ej" }, { v: "93,75 %", en: "loo-ej" }], [{ v: "Dejar uno fuera", en: "loo-ej" }, { v: "<strong>87,5 %</strong>", en: "loo-ej", hl: ["loo-qr"] }]], "pz-chica") +
    nota({ en: "loo-qr" }, "La de entrenamiento siempre <strong>sobreestima</strong>", "ok") },

  cierre(16, [["c1", "Box decide entre LDA y QDA"], ["c2", "Naive Bayes: prior × verosimilitudes; con ceros, Laplace"], ["c3", "Confusión: exactitud, sensibilidad, especificidad, precisión"], ["c4", "Medir con datos que el modelo no vio"]])
];
module.exports = { escenas };
