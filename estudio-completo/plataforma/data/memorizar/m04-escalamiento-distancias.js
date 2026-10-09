/* Memorizar · M04 Escalamiento, distancias y similitud (P1) */
PLATAFORMA.registrar("memorizar", [
  { id: "m04-mem-01", modulo: "m04-escalamiento-distancias", categoria: "umbral", titulo: "Cuándo estandarizar",
    contenido: "Unidades distintas · se usan distancias · PCA o clustering. La elección depende del método posterior y de los outliers.",
    fuente: [{ id: "C1", loc: "slides 40 y 45" }] },
  { id: "m04-mem-02", modulo: "m04-escalamiento-distancias", categoria: "formula", titulo: "Min–max e inversa",
    contenido: String.raw`$w=\dfrac{x-\min}{\max-\min}\in[0,1]$ · inversa $x=w(\max-\min)+\min$. <strong>No</strong> da media 0 ni varianza 1.`,
    fuente: [{ id: "C1", loc: "slide 41" }, { id: "PR-P1-Q1", loc: "afirmación 5" }, { id: "PR-P2-Q12", loc: "pregunta 1d" }] },
  { id: "m04-mem-03", modulo: "m04-escalamiento-distancias", categoria: "formula", titulo: "Z-score",
    contenido: String.raw`$z=\dfrac{x-\bar x}{s}$ → media 0 y desviación 1 · <code>scale(x)</code>.`,
    fuente: [{ id: "C1", loc: "slide 42" }] },
  { id: "m04-mem-04", modulo: "m04-escalamiento-distancias", categoria: "formula", titulo: "Robusto y L2",
    contenido: String.raw`Robusto: $(x-\text{mediana})/\text{IQR}$ (menos sensible a outliers). L2: $x/\sqrt{\sum x_i^2}$ (dirección).`,
    fuente: [{ id: "C1", loc: "slides 43–44" }] },
  { id: "m04-mem-05", modulo: "m04-escalamiento-distancias", categoria: "formula", titulo: "Euclídea y Manhattan",
    contenido: String.raw`$d_E=\sqrt{\sum(a_j-b_j)^2}$ · $d_M=\sum|a_j-b_j|$ · A=(2,3), B=(6,8): $6{,}403$ y $9$.`,
    fuente: [{ id: "C1", loc: "slide 47" }] },
  { id: "m04-mem-06", modulo: "m04-escalamiento-distancias", categoria: "funcion-R", titulo: "<code>dist(rbind(A,B), method = …)</code>",
    contenido: "<code>\"euclidean\"</code> (línea recta) o <code>\"manhattan\"</code> (suma de diferencias absolutas). Estandarizar antes si hay escalas distintas.",
    fuente: [{ id: "C1", loc: "slide 47" }] },
  { id: "m04-mem-07", modulo: "m04-escalamiento-distancias", categoria: "flashcard", frente: "Coseno vs. correlación",
    reverso: "El coseno mide similitud angular; la correlación es el coseno de los vectores centrados (similitud lineal tras centrar).",
    fuente: [{ id: "C1", loc: "slide 49" }] }
]);
