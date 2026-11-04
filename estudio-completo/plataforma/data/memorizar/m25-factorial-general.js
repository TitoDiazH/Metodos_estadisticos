/* Memorizar · M25 Factorial general (P3) */
PLATAFORMA.registrar("memorizar", [
  { id: "m25-mem-01", modulo: "m25-factorial-general", categoria: "formula", titulo: "Efecto principal e interacción (2 niveles)",
    contenido: String.raw`Efecto $A=\bar Y_{A+}-\bar Y_{A-}$ · $AB=\frac{Y_{--}+Y_{++}}{2}-\frac{Y_{+-}+Y_{-+}}{2}$ · ejemplo levadura/temperatura: A $=-2{,}5$, B $=19{,}5$, AB $=-15{,}5$.`,
    fuente: [{ id: "C7.3", loc: "slides 20–22" }] },
  { id: "m25-mem-02", modulo: "m25-factorial-general", categoria: "decision", titulo: "Gráfica de interacción",
    contenido: "Líneas paralelas ⇒ no hay interacción · se cruzan o tienen pendientes muy distintas ⇒ hay interacción · la significancia la decide el ANOVA.",
    fuente: [{ id: "C7.3", loc: "slides 22–23" }] },
  { id: "m25-mem-03", modulo: "m25-factorial-general", categoria: "formula", titulo: "gl del factorial a × b (n réplicas)",
    contenido: String.raw`A: $a-1$ · B: $b-1$ · AB: $(a-1)(b-1)$ · error: $ab(n-1)$ · total: $abn-1$ · se necesitan $n\ge2$.`,
    fuente: [{ id: "C7.3", loc: "slide 26" }] },
  { id: "m25-mem-04", modulo: "m25-factorial-general", categoria: "formula", titulo: "SC con totales (a × b)",
    contenido: String.raw`$SC_A=\sum Y_{i\cdot\cdot}^2/(bn)-Y^2_{\cdots}/N$ · $SC_B=\sum Y_{\cdot j\cdot}^2/(an)-Y^2_{\cdots}/N$ · $SC_{AB}=\sum\sum Y_{ij\cdot}^2/n-Y^2_{\cdots}/N-SC_A-SC_B$ · $SC_E$ por diferencia.`,
    fuente: [{ id: "C7.3", loc: "slide 26" }] },
  { id: "m25-mem-05", modulo: "m25-factorial-general", categoria: "umbral", titulo: "LSD en factoriales",
    contenido: String.raw`Sin interacción (medias marginales): $\sqrt{2\,CME/r}$ con $r=bn$ (A) o $an$ (B). Con interacción (dentro de cada nivel): $r=n$. Siempre $t_{\alpha/2,\,GL_E}$.`,
    fuente: [{ id: "C7.3", loc: "slides 30–31" }] },
  { id: "m25-mem-06", modulo: "m25-factorial-general", categoria: "salida", titulo: "Ejemplos",
    contenido: "Acabado 4 × 3 (n = 3): F_B = 55,02; F_A = 24,66; F_AB = 3,23 (p = 0,018); CME = 28,72 (24 gl) ⇒ óptimo: profundidad y velocidad bajas. Sedimentación 3 × 2 × 2 (n = 6): significativos B, C, AB, BC ⇒ mejor (A = 0, B = −1, C = 1).",
    fuente: [{ id: "C7.3", loc: "slides 28–36" }] },
  { id: "m25-mem-07", modulo: "m25-factorial-general", categoria: "funcion-R", titulo: "<code>aov(Y ~ A * B * C)</code>",
    contenido: "<code>*</code> = efectos principales + todas las interacciones; <code>+</code> = solo principales. <code>interaction.plot(A, B, Y)</code> para la gráfica de interacción.",
    fuente: [{ id: "C7.3", loc: "slide 35" }, { id: "C7.4", loc: "slide 10" }] }
]);
