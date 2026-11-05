/* ============================================================================
   siglas.js — Glosario de siglas con tooltip.
   Después de cada render (U.tex llama a P.siglas.marcar), recorre el texto de la
   vista y envuelve cada sigla conocida en <abbr class="sigla">. En fórmulas
   KaTeX lee el TeX original (annotation) y marca la fórmula entera.
   Escritorio: aparece al pasar el mouse. Celular: al tocar, se muestra ~4 s.
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA;

  /* Sigla → significado. Distingue mayúsculas (gl ≠ GL no importa: ambas están). */
  var G = {
    "ANOVA": "Análisis de varianza (ANalysis Of VAriance)",
    "MANOVA": "Análisis multivariado de varianza (varias respuestas a la vez)",
    "DDE": "Diseño de experimentos",
    "DCA": "Diseño completamente al azar (un factor, sin bloques)",
    "DBCA": "Diseño en bloques completos al azar",
    "SC": "Suma de cuadrados",
    "SCT": "Suma de cuadrados total",
    "SCE": "Suma de cuadrados del error (residual)",
    "SCTrat": "Suma de cuadrados de tratamientos",
    "CM": "Cuadrado medio = SC / gl (una varianza)",
    "CME": "Cuadrado medio del error = SC_E / gl del error (estima σ²)",
    "TRAT": "Tratamientos",
    "FV": "Fuente de variación (fila de la tabla ANOVA)",
    "GL": "Grados de libertad",
    "gl": "Grados de libertad",
    "df": "Degrees of freedom: grados de libertad (así los llama R)",
    "LSD": "Diferencia mínima significativa de Fisher (Least Significant Difference)",
    "HSD": "Diferencia honestamente significativa de Tukey (Honestly Significant Difference)",
    "PCA": "Análisis de componentes principales (Principal Component Analysis)",
    "PC": "Componente principal (PC1 = la 1.ª, PC2 = la 2.ª…)",
    "AF": "Análisis factorial",
    "KMO": "Índice de Kaiser-Meyer-Olkin: adecuación muestral global para el AF",
    "MSA": "Measure of Sampling Adequacy: medida de adecuación muestral (por variable o global)",
    "MSAi": "MSA individual de la variable i",
    "LDA": "Análisis discriminante lineal (Linear Discriminant Analysis)",
    "QDA": "Análisis discriminante cuadrático (Quadratic Discriminant Analysis)",
    "NB": "Naive Bayes (clasificador bayesiano ingenuo)",
    "DIANA": "DIvisive ANAlysis: conglomerado jerárquico divisivo (de arriba hacia abajo)",
    "WSS": "Within-cluster Sum of Squares: suma de cuadrados dentro de los conglomerados",
    "SM": "Simple Matching: coeficiente de emparejamiento simple",
    "VP": "Verdaderos positivos",
    "VN": "Verdaderos negativos",
    "FP": "Falsos positivos",
    "FN": "Falsos negativos",
    "VPP": "Valor predictivo positivo = VP / (VP + FP)",
    "VPN": "Valor predictivo negativo = VN / (VN + FN)",
    "LOO": "Leave-one-out: validación cruzada dejando un dato fuera cada vez",
    "CV": "Validación cruzada (Cross-Validation)",
    "IC": "Intervalo de confianza",
    "IQR": "Rango intercuartílico = Q3 − Q1",
    "AIC": "Criterio de información de Akaike (menor es mejor)",
    "Cp": "Cp de Mallows (criterio para elegir modelo; bueno si Cp ≈ p)",
    "VIF": "Factor de inflación de la varianza (multicolinealidad)",
    "PRESS": "Suma de cuadrados de los errores de predicción, dejando fuera cada dato",
    "RSS": "Residual Sum of Squares: suma de cuadrados de los residuos (así la llama R)",
    "SS": "Sum of Squares: suma de cuadrados",
    "SEC": "Suma explicada de cuadrados (por la regresión)",
    "SRC": "Suma de residuos al cuadrado",
    "STC": "Suma total de cuadrados",
    "QQ": "Gráfico cuantil-cuantil (compara con la normal)",
    "EE": "Error estándar",
    "ee": "Error estándar",
    "ABP": "Aprendizaje Basado en Proyectos (ejemplo MANOVA)",
    "ABPr": "Aprendizaje Basado en Problemas (ejemplo MANOVA)",
    "MASS": "Paquete de R (trae lda y qda)",
    "BSDA": "Paquete de R (trae z.test)",
    "ICSNP": "Paquete de R (trae la T² de Hotelling)",
    "MVN": "Paquete de R para probar normalidad multivariada"
  };
  /* Subíndices de SC_x / CM_x en las fórmulas. */
  var SUB = {
    T: "total", E: "del error", B: "de bloques", TRAT: "de tratamientos", Trat: "de tratamientos",
    trat: "de tratamientos", bloque: "de bloques", A: "del factor A", C: "del factor C",
    AB: "de la interacción AB", AC: "de la interacción AC", BC: "de la interacción BC", ABC: "de la interacción ABC",
    R: "de la regresión", X: "del efecto X"
  };
  var NOMBRE = { SC: "suma de cuadrados", CM: "cuadrado medio" };

  var claves = Object.keys(G).sort(function (a, b) { return b.length - a.length; });
  var L = "A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9_";
  var RE = new RegExp("(^|[^" + L + "])(" + claves.join("|") + ")(?![" + L + "])", "g");
  /* PC1, PC2… y MSAi también cuentan */
  var RE_PC = /(^|[^A-Za-z0-9_])(PC\d+)(?![A-Za-z0-9_])/g;
  var SALTAR = { A: 1, BUTTON: 1, SELECT: 1, OPTION: 1, TEXTAREA: 1, INPUT: 1, CODE: 1, PRE: 1, SCRIPT: 1, STYLE: 1, ABBR: 1, SVG: 1, TITLE: 1 };

  function esc(s) { return P.util.esc(s); }

  function textoPlano(nodo) {
    var t = nodo.nodeValue;
    RE.lastIndex = 0; RE_PC.lastIndex = 0;
    if (!RE.test(t) && !RE_PC.test(t)) return;
    var frag = document.createDocumentFragment(), ult = 0, m, hits = [];
    RE.lastIndex = 0;
    while ((m = RE.exec(t))) hits.push({ i: m.index + m[1].length, s: m[2], d: G[m[2]] });
    RE_PC.lastIndex = 0;
    while ((m = RE_PC.exec(t))) hits.push({ i: m.index + m[1].length, s: m[2], d: "Componente principal n.º " + m[2].slice(2) });
    hits.sort(function (a, b) { return a.i - b.i; });
    hits.forEach(function (h) {
      if (h.i < ult) return;
      if (h.i > ult) frag.appendChild(document.createTextNode(t.slice(ult, h.i)));
      var ab = document.createElement("abbr");
      ab.className = "sigla"; ab.textContent = h.s; ab.setAttribute("data-sigla", h.s + ": " + h.d);
      ab.tabIndex = 0;
      frag.appendChild(ab);
      ult = h.i + h.s.length;
    });
    if (ult < t.length) frag.appendChild(document.createTextNode(t.slice(ult)));
    nodo.parentNode.replaceChild(frag, nodo);
  }

  /* Qué siglas/notación contiene una fórmula (lee el TeX original). */
  function explicarTeX(tex) {
    var out = [], visto = {};
    function add(s) { if (!visto[s]) { visto[s] = 1; out.push(s); } }
    var t = tex.replace(/\\(?:mathrm|text|textrm|operatorname)\s*\{([^}]*)\}/g, "$1");
    var m, re = /\b(SC|CM)\s*_\s*\{?\s*([A-Za-z]+)\s*\}?/g;
    while ((m = re.exec(t))) {
      var sub = SUB[m[2]] || ("de " + m[2]);
      add(m[1] + "_" + m[2] + ": " + NOMBRE[m[1]] + " " + sub);
    }
    /* Notación de puntos: Y_{i\cdot}, Y_{\cdot j}, Y_{\cdot\cdot}, Y_{\cdots}, Y_{ij\cdot}… */
    if (/[YyX]\s*_\s*\{[^}]*\\c?dots?/.test(t) || /[YyX]\s*_\s*\{[^}]*\\bullet/.test(t)) {
      add("Punto (·) en un subíndice: se sumó sobre ese índice. Y_{i·} = total de la fila/tratamiento i · Y_{·j} = total de la columna/bloque j · Y_{··} = gran total. Con barra (Ȳ) es el promedio.");
    }
    var limpio = t.replace(/\b(SC|CM)\s*_\s*\{?\s*[A-Za-z]+\s*\}?/g, " ").replace(/\\[A-Za-z]+/g, " ");
    var re2 = new RegExp("(^|[^A-Za-z])(" + claves.join("|") + ")(?![A-Za-z])", "g");
    while ((m = re2.exec(limpio))) add(m[2] + ": " + G[m[2]]);
    return out;
  }

  function marcarKatex(raiz) {
    Array.prototype.forEach.call(raiz.querySelectorAll(".katex:not([data-sigla-ok])"), function (k) {
      k.setAttribute("data-sigla-ok", "1");
      if (k.closest("a, button, label, .no-sigla")) return;
      var ann = k.querySelector("annotation");
      if (!ann) return;
      var lista = explicarTeX(ann.textContent || "");
      if (!lista.length) return;
      k.classList.add("sigla-formula");
      k.setAttribute("data-sigla", lista.join("\n"));
      k.tabIndex = 0;
    });
  }

  function marcar(raiz) {
    if (!raiz || !raiz.querySelectorAll) return;
    try {
      var nodos = [], w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          for (var p = n.parentNode; p && p !== raiz; p = p.parentNode) {
            if (p.nodeType === 1 && (SALTAR[p.tagName.toUpperCase()] || (p.classList && (p.classList.contains("katex") || p.classList.contains("no-sigla"))))) return NodeFilter.FILTER_REJECT;
          }
          return n.nodeValue && /[A-Za-z]{2}/.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
      });
      while (w.nextNode()) nodos.push(w.currentNode);
      nodos.forEach(textoPlano);
      marcarKatex(raiz);
    } catch (e) { /* el glosario nunca debe romper la vista */ }
  }

  /* ── Burbuja flotante ─────────────────────────────────────────────── */
  var tip = null, timer = null, actual = null;
  function burbuja() {
    if (!tip) {
      tip = document.createElement("div");
      tip.id = "tipSigla"; tip.setAttribute("role", "tooltip");
      document.body.appendChild(tip);
    }
    return tip;
  }
  function mostrar(el, ms) {
    var b = burbuja();
    actual = el;
    b.innerHTML = el.getAttribute("data-sigla").split("\n").map(function (l) { return "<div>" + esc(l) + "</div>"; }).join("");
    b.style.display = "block";
    b.style.left = "0px"; b.style.top = "0px";
    var r = el.getBoundingClientRect(), bw = b.offsetWidth, bh = b.offsetHeight;
    var x = Math.min(Math.max(8, r.left + r.width / 2 - bw / 2), window.innerWidth - bw - 8);
    var y = r.top - bh - 8;
    if (y < 8) y = r.bottom + 8;
    b.style.left = (x + window.scrollX) + "px"; b.style.top = (y + window.scrollY) + "px";
    clearTimeout(timer);
    if (ms) timer = setTimeout(ocultar, ms);
  }
  function ocultar() { if (tip) tip.style.display = "none"; actual = null; clearTimeout(timer); }

  var tactil = window.matchMedia && window.matchMedia("(hover: none)").matches;
  document.addEventListener("mouseover", function (ev) {
    if (tactil) return;
    var el = ev.target.closest && ev.target.closest("[data-sigla]");
    if (el) { if (el !== actual) mostrar(el, 0); }
    else if (actual) ocultar();
  });
  document.addEventListener("click", function (ev) {
    var el = ev.target.closest && ev.target.closest("[data-sigla]");
    if (el) mostrar(el, 4000); else if (actual && tactil) ocultar();
  });
  document.addEventListener("focusin", function (ev) {
    var el = ev.target.closest && ev.target.closest("[data-sigla]");
    if (el && !tactil) mostrar(el, 0);
  });
  document.addEventListener("focusout", function () { if (!tactil) ocultar(); });
  window.addEventListener("scroll", function () { if (actual && !tactil) ocultar(); }, { passive: true });
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") ocultar(); });

  P.siglas = { marcar: marcar, glosario: G, explicarTeX: explicarTeX, ocultar: ocultar };
})();
