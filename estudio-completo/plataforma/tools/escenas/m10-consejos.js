"use strict";
const P = require("./_p4"), { kicker, titulo, formula, nota, lista, p, tabla } = P;
module.exports = { escenas: [
  P.portada("Consejos para la prueba", "Análisis factorial", "Pregunta adicional de la P4 · se promedia con P1"),
  { en: "idea", html: kicker("La idea") + titulo("Factores latentes que explican las correlaciones") +
    formula({ en: "idea" }, "X=AF+u") + nota({ en: "idea@6" }, "PCA: toda la varianza · AF: solo la varianza <strong>común</strong>") },
  { en: "adec", html: kicker("Paso 1") + titulo("¿Sirven los datos?") +
    lista([["bart", "<strong>Bartlett</strong> (H₀: R = I, sin correlación): queremos p &lt; 0,05"], ["kmo", "<strong>KMO</strong>: ≥ 0,75 bueno · ≥ 0,5 aceptable · &lt; 0,5 inaceptable · revisar también el de cada variable"]]) +
    P.codigo("bart", "cortest.bartlett(cor(datos), n = nrow(datos))\nKMO(datos)") },
  { en: "nf", html: kicker("Paso 2") + titulo("¿Cuántos factores?") +
    lista([["nf", "Kaiser (λ &gt; 1) · % de varianza · codo · análisis paralelo"]]) + formula({ en: "lim" }, "k\\le\\dfrac{p-1}{2}") },
  { en: "sal", html: kicker("Paso 3") + titulo("Leer la salida: h2 y u2") +
    formula({ en: "h2" }, "h_i^2=\\sum_j a_{ij}^2\\quad(\\text{comunalidad: lo que explican los factores})") +
    formula({ en: "u2" }, "u_i^2=1-h_i^2\\quad(\\text{unicidad})") +
    tabla(["Variable", "F1", "F2", "h2", "u2"], [["ejemplo", "0,8", "0,3", { v: "0,73", en: "ej" }, { v: "0,27", en: "ej" }]].map((f) => [{ v: f[0], th: true }].concat(f.slice(1))), "") +
    nota({ en: "trampa" }, "La pauta P1 2026-20 confundió h2 con u2: la peor representada es la de <strong>menor h2</strong>", "mal") },
  { en: "rot", html: kicker("Paso 4") + titulo("Rotar e interpretar") +
    lista([["rot", "Varimax: cada variable carga fuerte en un solo factor"], ["rotno", "No cambian: comunalidades, unicidades ni varianza total"], ["interp", "Nombrar con cargas &gt; |0,4|–|0,5|"]]) +
    P.codigo("rot", "fa(datos, nfactors = 2, rotate = \"varimax\")") },
  { en: "err", html: kicker("Errores típicos") + titulo("Lo que más resta puntaje") +
    lista([["e1", "Confundir h2 con u2"], ["e2", "No revisar Bartlett y KMO"], ["e3", "Interpretar sin rotar cuando dan las rotadas"], ["e4", "«La rotación cambia la varianza total»: no"]]) },
  { en: "fin", html: kicker("Para cerrar") + titulo("La receta") +
    lista([["fin", "Bartlett y KMO"], ["fin@2", "Número de factores (k ≤ (p−1)/2)"], ["fin@4", "h2 = Σ cargas² · u2 = 1 − h2"], ["fin@7", "Rotar e interpretar con cargas grandes"]]) }
] };
