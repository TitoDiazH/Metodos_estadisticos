/* ============================================================================
   Desarrollo · M15 LDA (P2)
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m15-d001", modulo: "m15-lda", concepto: "m15-c02", dificultad: 2, origen: "variacion",
    base: [{ id: "C6.1", loc: "slides 13–19" }],
    titulo: "Regla de decisión de Fisher con dos grupos",
    enunciado: String.raw`<p>Se quiere clasificar piezas como «Aprobada» (grupo 1) o «Rechazada» (grupo 2) con dos medidas $X_1$ y $X_2$. Se tienen las medias de grupo $\bar x_1=(5,\,4)$ y $\bar x_2=(3,\,3)$ y la matriz de dispersión dentro de grupos $W=\begin{pmatrix}2&0\\0&1\end{pmatrix}$.</p>
<ol type="a"><li>Calcula el vector de pesos de Fisher $u=W^{-1}(\bar x_1-\bar x_2)$.</li><li>Calcula el puntaje promedio de cada grupo y el punto de corte.</li><li>Clasifica una pieza nueva con $X=(4,\,4)$ y otra con $X=(3,\,4)$.</li></ol>`,
    partes: [
      { titulo: "a) Pesos de Fisher", puntos: 2,
        solucion: String.raw`<p>$\bar x_1-\bar x_2=(2,\,1)$. $W^{-1}=\begin{pmatrix}1/2&0\\0&1\end{pmatrix}$ ⇒ $u=(1,\ 1)$. Función discriminante: $D=X_1+X_2$.</p>` },
      { titulo: "b) Puntajes de grupo y corte", puntos: 2,
        solucion: String.raw`<p>$\bar D_1=5+4=9$ y $\bar D_2=3+3=6$. Corte: $C=(9+6)/2=7{,}5$. Regla: $D>7{,}5$ ⇒ grupo 1 (Aprobada); $D<7{,}5$ ⇒ grupo 2 (Rechazada).</p>` },
      { titulo: "c) Clasificar dos piezas nuevas", puntos: 2,
        solucion: String.raw`<p>$X=(4,4)$: $D=8>7{,}5$ ⇒ <strong>Aprobada</strong>. $X=(3,4)$: $D=7<7{,}5$ ⇒ <strong>Rechazada</strong>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes (la fuente no trae puntajes).",
    verifica: [
      { que: "u1", r: `cat(solve(diag(c(2, 1)), c(5,4) - c(3,3))[1])`, esperado: 1, tol: 1e-9 },
      { que: "u2", r: `cat(solve(diag(c(2, 1)), c(5,4) - c(3,3))[2])`, esperado: 1, tol: 1e-9 },
      { que: "corte", js: "(9+6)/2", esperado: 7.5, tol: 1e-9 }
    ],
    fuente: [{ id: "C6.1", loc: "slides 13–19" }]
  }
]);
