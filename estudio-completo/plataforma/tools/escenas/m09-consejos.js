"use strict";
const P = require("./_p4"), { kicker, titulo, formula, nota, lista, p, tabla } = P;
module.exports = { escenas: [
  P.portada("Consejos para la prueba", "Componentes principales", "Pregunta adicional de la P4 · se promedia con P1"),
  { en: "tipo", html: kicker("La pregunta adicional") + titulo("Leer summary(pca) y pca&#36;rotation") +
    lista([["tipo", "¿Cuántos componentes?"], ["tipo@3", "¿Qué significa cada uno?"], ["tipo@5", "¿Cómo se calcula el puntaje de una persona?"]]) +
    P.codigo("tipo", "pca <- prcomp(datos, scale. = TRUE)\nsummary(pca)      # Standard deviation, Proportion, Cumulative\npca$rotation      # loadings") },
  { en: "est", html: kicker("Paso 1") + titulo("¿Se estandarizó?") +
    nota({ en: "est" }, "Unidades distintas ⇒ <code>scale. = TRUE</code>; si no, la variable de números grandes domina PC1") +
    formula({ en: "estr" }, "\\text{estandarizadas: cada variable aporta varianza }1\;\\Rightarrow\;\\sum\\lambda_i=p") },
  { en: "sd", html: kicker("Paso 2") + titulo("Autovalores y varianza") +
    nota({ en: "sd" }, "<code>summary</code> entrega la <strong>desviación estándar</strong>, no el autovalor", "mal") +
    formula({ en: "lam" }, "\\lambda=\\text{sd}^2\\qquad 1{,}25^2=1{,}5625") +
    formula({ en: "prop" }, "\\text{proporción}_k=\\dfrac{\\lambda_k}{\\sum\\lambda_i}") + p({ en: "acum" }, "Acumulada: se va sumando") },
  { en: "crit", html: kicker("Paso 3") + titulo("¿Cuántos componentes?") +
    lista([["c1", "<strong>Kaiser</strong>: λ &gt; 1 (datos estandarizados) — sobre λ, no sobre sd"], ["c2", "<strong>80 %</strong> de varianza acumulada"], ["c3", "<strong>Codo</strong> del gráfico de sedimentación"]]) +
    nota({ en: "cdif" }, "Si no coinciden: dilo y justifica cuál usas") },
  { en: "load", html: kicker("Paso 4") + titulo("Interpretar con los loadings") +
    lista([["load", "Loadings grandes en valor absoluto (≥ 0,4)"], ["sig", "Mismo signo: se mueven juntas · signo opuesto: en sentido contrario"], ["nombre", "Ponerle nombre: p. ej. «intensidad de compra» (frecuencia, gasto, categorías + ; cupones −)"]]) },
  { en: "score", html: kicker("Paso 5") + titulo("El puntaje (score)") +
    formula({ en: "score" }, "PC_1=\\sum_j a_{j1}Z_j") + formula({ en: "z" }, "Z_j=\\dfrac{X_j-\\bar X_j}{s_j}") +
    nota({ en: "zno" }, "No reemplazar los valores originales · sin medias y sd: explicar el procedimiento", "mal") },
  { en: "err", html: kicker("Errores típicos") + titulo("Lo que más resta puntaje") +
    lista([["e1", "Usar sd como si fuera λ"], ["e2", "Olvidar estandarizar"], ["e3", "Interpretar loadings chicos"], ["e4", "«PCA elimina variables»: cada componente usa todas"]]) },
  { en: "fin", html: kicker("Para cerrar") + titulo("La receta") +
    lista([["fin", "Estandarizar"], ["fin@2", "λ = sd² · proporción y acumulada"], ["fin@4", "Kaiser · 80 % · codo"], ["fin@6", "Loadings grandes y signos ⇒ nombre"], ["fin@8", "Score con variables estandarizadas"]]) }
] };
