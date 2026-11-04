/* Memorizar · M20 DBCA (P3) */
PLATAFORMA.registrar("memorizar", [
  { id: "m20-mem-01", modulo: "m20-dbca", categoria: "decision", titulo: "Factor de bloque",
    contenido: "Factor perturbador que se incluye explícitamente, no porque interese su efecto, sino para controlarlo y reducir el error experimental. Importancia secundaria.",
    fuente: [{ id: "C7.3", loc: "slides 4–5" }] },
  { id: "m20-mem-02", modulo: "m20-dbca", categoria: "formula", titulo: "Modelo y supuestos del DBCA",
    contenido: String.raw`$Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij}$ · $\varepsilon\sim N(0,\sigma^2)$ independientes · aditivo (sin interacción trat × bloque) · completo · aleatorización dentro de cada bloque.`,
    fuente: [{ id: "C7.3", loc: "slides 7–8" }] },
  { id: "m20-mem-03", modulo: "m20-dbca", categoria: "formula", titulo: "Sumas de cuadrados",
    contenido: String.raw`$SC_{TRAT}=\sum Y_{i\cdot}^2/b-Y_{\cdot\cdot}^2/N$ · $SC_B=\sum Y_{\cdot j}^2/k-Y_{\cdot\cdot}^2/N$ · $SC_E=SC_T-SC_{TRAT}-SC_B$ · gl: $k-1$, $b-1$, $(k-1)(b-1)$, $N-1$.`,
    fuente: [{ id: "C7.3", loc: "slides 9–10" }] },
  { id: "m20-mem-04", modulo: "m20-dbca", categoria: "formula", titulo: "LSD en DBCA",
    contenido: String.raw`$LSD=t_{\alpha/2,(k-1)(b-1)}\sqrt{2\,CME/b}$ (DCA: $t_{\alpha/2,N-k}\sqrt{2\,CME/n}$).`,
    fuente: [{ id: "C7.3", loc: "slide 15" }] },
  { id: "m20-mem-05", modulo: "m20-dbca", categoria: "decision", titulo: "Leer el bloque",
    contenido: "Bloque significativo ⇒ el bloqueo fue efectivo (influye en Y). No significativo ⇒ argumento para no controlarlo en el futuro. Sin bloque, su SC pasa al error y se pierde potencia.",
    fuente: [{ id: "C7.3", loc: "slides 14 y 17" }] },
  { id: "m20-mem-06", modulo: "m20-dbca", categoria: "salida", titulo: "Ejemplos",
    contenido: "Ensamble: SC 61,5 / 28,5 / 18; F 10,25 (p 0,003) y 4,75 (p 0,030); LSD 2,262. Fertilizantes: SC 72 / 60 / 24; F 9,00 y 5,00; LSD 3,46; sin bloque F = 3,86 < 4,26.",
    fuente: [{ id: "C7.3", loc: "slides 12, 15 y 17" }] },
  { id: "m20-mem-07", modulo: "m20-dbca", categoria: "funcion-R", titulo: "<code>aov(y ~ trat + bloque)</code> · <code>LSD.test</code>",
    contenido: "<code>modelo &lt;- aov(y ~ metodo + operador, data = datos)</code> · <code>summary(modelo)</code> · <code>library(agricolae)</code> · <code>LSD.test(modelo, \"metodo\")$groups</code>. Tratamiento y bloque como <code>factor()</code>.",
    fuente: [{ id: "S7.3" }] }
]);
