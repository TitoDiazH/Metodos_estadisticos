"use strict";
const P = require("./_p4"), { kicker, titulo, formula, nota, lista, p, div } = P;
module.exports = { escenas: [
  P.portada("Consejos para la prueba", "Regresión lineal múltiple", "Resumen y receta paso a paso · Prueba 4"),
  { en: "inst", html: kicker("Qué te van a preguntar") + titulo("Leer salidas de R, no ajustar modelos") +
    lista([["temas", "1 · Interpretar el modelo (coeficientes y ∂y/∂xᵢ)"], ["temas@2", "2 · Pruebas t (también H₀: βᵢ = αᵢ)"], ["temas@4", "3 · F global"], ["temas@5", "4 · R² y R² ajustado"], ["temas@7", "5 · Supuestos"], ["temas@9", "6 · VIF, apalancamiento y Cook"]]) },
  { en: "plant", html: kicker("La plantilla") + titulo("Cada respuesta: tres partes") +
    `<div class="pz-cols pz-cols-3" style="text-align:center">` + p({ en: "p1" }, `<span class="pz-big">1</span><br>Estadístico o valor-p`) + p({ en: "p2" }, `<span class="pz-big">2</span><br>Decisión`) + p({ en: "p3" }, `<span class="pz-big">3</span><br>Conclusión en el contexto`) + "</div>" +
    nota({ en: "ejemplo" }, "«t = 4,96; p = 0,0008 &lt; 0,05 ⇒ se rechaza H₀: la nota del examen influye significativamente en la nota de química.»", "ok") },
  { en: "interp", html: kicker("Paso 1") + titulo("Interpretar") +
    lista([["interp", "bⱼ: cambio promedio en y por +1 en xⱼ, <strong>manteniendo constantes las demás</strong>"], ["unidades", "Siempre con unidades: «+2,7 min por cm»"], ["icpt", "b₀ solo si x = 0 tiene sentido y está en el rango (casi nunca)"],
      ["indic", "Indicadora: diferencia promedio con la categoría de referencia"]]) +
    `<div class="pz-cols pz-cols-3">` + formula({ en: "deriv" }, "\\tfrac{\\partial\\hat y}{\\partial x}=b_1") + formula({ en: "derivp" }, "\\tfrac{\\partial\\hat y}{\\partial x}=b_1+2b_2x") + formula({ en: "derivi" }, "\\tfrac{\\partial\\hat y}{\\partial x_1}=b_1+b_{12}x_2") + "</div>" },
  { en: "tt", html: kicker("Paso 2") + titulo("Pruebas t") +
    formula({ en: "tt" }, "t=\\dfrac{b_i-0}{ee(b_i)}\\sim t_{n-k-1}") +
    formula({ en: "ta" }, "H_0:\\beta_i=\\alpha_i\;\\Rightarrow\;t=\\dfrac{b_i-\\alpha_i}{ee(b_i)}\\qquad p=2\\,[1-P(t_{gl}\\le|t|)]") +
    nota({ en: "ta@4" }, "El <code>t value</code> de R compara con 0: con αᵢ ≠ 0 se calcula a mano", "mal") +
    nota({ en: "rc" }, "Región crítica: |t| &gt; t<sub>0,975; gl</sub> (si te dan <code>qt</code>) · o valor-p &lt; 0,05") },
  { en: "f", html: kicker("Paso 3") + titulo("F global, R² y R² ajustado") +
    formula({ en: "f" }, "H_0:\\beta_1=\\dots=\\beta_k=0") +
    formula({ en: "fs" }, "STC=SCR+SCE\\qquad F=\\dfrac{SCR/k}{SCE/(n-k-1)}") +
    formula({ en: "r2" }, "R^2=\\dfrac{SCR}{STC}") + formula({ en: "r2a" }, "R^2_{aj}=1-(1-R^2)\\dfrac{n-1}{n-k-1}") +
    nota({ en: "compl" }, "Completar una salida: t = b/ee · R² = 1 − SCE/STC · R² ajustado", "ok") },
  { en: "sup", html: kicker("Paso 4") + titulo("Supuestos") +
    lista([["sl", "<strong>Linealidad</strong>: residuos vs ajustados sin curva (U ⇒ falta x²)"], ["sh", "<strong>Varianza constante</strong>: sin embudo"], ["sn", "<strong>Normalidad</strong>: Q-Q sobre la diagonal · Shapiro p &gt; 0,05 (H₀: normalidad)"], ["si", "<strong>Independencia</strong>: sin rachas en el orden de las corridas"]]) },
  { en: "vif", html: kicker("Paso 5") + titulo("Problemas del modelo") +
    lista([["vif", "<strong>VIF</strong> &gt; 5 moderado · &gt; 10 severo · pista: F enorme y t chicos, o signos absurdos ⇒ sacar una variable redundante"], ["hat", "<strong>Apalancamiento</strong> hᵢᵢ &gt; 2(k+1)/n: x raras"], ["cook", "<strong>Cook</strong> Dᵢ &gt; 1: influyente · se revisa y se informa, no se borra"]]) },
  { en: "err", html: kicker("Errores típicos") + titulo("Lo que más resta puntaje") +
    lista([["e1", "Interpretar un coeficiente no significativo"], ["e2", "«Se acepta H₀» ⇒ se dice «no se rechaza»"], ["e3", "Extrapolar (sobre todo con polinomios)"], ["e4", "Olvidar «con lo demás constante»"], ["e5", "Confundir IC de la media con intervalo de predicción (más ancho)"]]) },
  { en: "fin", html: kicker("Para cerrar") + titulo("El orden de siempre") +
    lista([["fin", "Modelo e interpretación"], ["fin@3", "Pruebas t"], ["fin@4", "F, R² y R² ajustado"], ["fin@5", "Supuestos"], ["fin@7", "VIF · apalancamiento · Cook"]]) + nota({ en: "fin@10" }, "Estadístico · decisión · contexto, en cada respuesta", "ok") }
] };
