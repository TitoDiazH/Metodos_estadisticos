/* Memorizar · M06 Pruebas de hipótesis: dos poblaciones (P1) */
PLATAFORMA.registrar("memorizar", [
  { id: "m06-mem-01", modulo: "m06-hipotesis-dos-poblaciones", categoria: "decision", titulo: "Qué prueba usar",
    contenido: "Pareadas ⇒ <code>paired = TRUE</code>. Independientes ⇒ Welch por defecto (<code>var.equal = FALSE</code>); pooled solo si hay certeza o fuerte evidencia de varianzas iguales (Zimmerman, 2004).",
    fuente: [{ id: "C2", loc: "slide 33" }] },
  { id: "m06-mem-02", modulo: "m06-hipotesis-dos-poblaciones", categoria: "formula", titulo: "Cociente de varianzas",
    contenido: String.raw`$F=\dfrac{s_1^2}{s_2^2}\sim F_{(n_1-1,\,n_2-1)}$ · $F\approx1$ ⇒ similares · varianza mayor arriba si es unilateral derecha.`,
    fuente: [{ id: "C2", loc: "slides 22 y 25" }] },
  { id: "m06-mem-03", modulo: "m06-hipotesis-dos-poblaciones", categoria: "formula", titulo: "Welch",
    contenido: String.raw`$t=\dfrac{\bar x_2-\bar x_1-D_0}{\sqrt{s_1^2/n_1+s_2^2/n_2}}$ · gl de Welch (no entero).`,
    fuente: [{ id: "C2", loc: "slides 26–27" }] },
  { id: "m06-mem-04", modulo: "m06-hipotesis-dos-poblaciones", categoria: "formula", titulo: "Pooled",
    contenido: String.raw`$S_p^2=\dfrac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}$ · $t=\dfrac{\bar x_2-\bar x_1-D_0}{\sqrt{S_p^2(1/n_1+1/n_2)}}$ · gl $=n_1+n_2-2$.`,
    fuente: [{ id: "C2", loc: "slides 28–29" }] },
  { id: "m06-mem-05", modulo: "m06-hipotesis-dos-poblaciones", categoria: "formula", titulo: "Pareadas",
    contenido: String.raw`$d_i=\text{antes}_i-\text{después}_i$ · $t=\dfrac{\bar d}{s_d/\sqrt n}$ · $n-1$ gl · el orden importa.`,
    fuente: [{ id: "C2", loc: "slides 30–31 y 34" }] },
  { id: "m06-mem-06", modulo: "m06-hipotesis-dos-poblaciones", categoria: "funcion-R", titulo: "<code>var.test(A, B)</code> · <code>t.test(A, B, …)</code>",
    contenido: "<code>var.test</code>: prueba F. <code>t.test(A, B, var.equal = FALSE/TRUE)</code>: Welch/pooled. <code>paired = TRUE</code>: pareadas. <code>mu =</code> fija la diferencia bajo H0.",
    fuente: [{ id: "C2", loc: "slides 33–34" }] },
  { id: "m06-mem-07", modulo: "m06-hipotesis-dos-poblaciones", categoria: "flashcard", frente: "t.test(antes, despues, paired = TRUE) equivale a…",
    reverso: "t.test(antes - despues, mu = 0): prueba t de una muestra sobre las diferencias.",
    fuente: [{ id: "C2", loc: "slide 34" }] }
]);
