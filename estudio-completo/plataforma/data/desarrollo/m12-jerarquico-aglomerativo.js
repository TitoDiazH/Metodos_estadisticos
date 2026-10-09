/* ============================================================================
   Desarrollo · M12 Clustering jerárquico aglomerativo (P2)
   ========================================================================== */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m12-d001", modulo: "m12-jerarquico-aglomerativo", concepto: "m12-c04", dificultad: 3, origen: "curso",
    titulo: "Jerárquico a mano con complete linkage (Ayudantía 5, P1)",
    enunciado: String.raw`<p>Cinco tiendas con coordenadas (X, Y): A(1,1), B(2,6), C(4,3), D(7,4), E(5,1). Usa distancia Manhattan y clustering aglomerativo con <strong>complete linkage</strong>.</p>
<ol type="a"><li>Calcula la matriz de distancias e indica la primera fusión.</li><li>Calcula las distancias al nuevo clúster e indica la segunda fusión.</li><li>Completa el dendrograma (alturas) y corta en 2 grupos.</li></ol>`,
    partes: [
      { titulo: "a) Matriz de distancias y primera fusión", puntos: 2,
        solucion: String.raw`<p>Distancias Manhattan: $AB=6$, $AC=5$, $AD=9$, $AE=4$, $BC=5$, $BD=7$, $BE=8$, $CD=4$, $CE=3$, $DE=5$.</p><p>La mínima es $CE=3$ ⇒ primera fusión: $\{C,E\}$ a altura $3$.</p>` },
      { titulo: "b) Distancias a {C,E} y segunda fusión", puntos: 2,
        solucion: String.raw`<p>Complete = máximo: $d(A,\{C,E\})=\max(5,4)=5$; $d(B,\{C,E\})=\max(5,8)=8$; $d(D,\{C,E\})=\max(4,5)=5$.</p><p>Entre las distancias restantes: $AB=6$, $AD=9$, $BD=7$. La mínima es $5$ (A–{C,E} y D–{C,E} empatan). Se une A a {C,E} a altura $5$ (R desempata así; con D sería equivalente en altura).</p>` },
      { titulo: "c) Dendrograma completo y corte en 2 grupos", puntos: 2,
        solucion: String.raw`<p>Alturas con complete (R): $3;\ 5;\ 7;\ 9$. Tras {C,E} y {A,C,E}: $d(B,D)=7$ es la menor entre los restantes (B–{A,C,E}$=8$, D–{A,C,E}$=9$) ⇒ {B,D} a $7$. Última fusión: $\max$ entre {A,C,E} y {B,D} $=9$.</p><p>Corte en 2 grupos (entre $7$ y $9$): <strong>{A, C, E}</strong> y <strong>{B, D}</strong>.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes (la fuente no trae puntajes).",
    verifica: [
      { que: "alturas complete", r: `P <- data.frame(X = c(1, 2, 4, 7, 5), Y = c(1, 6, 3, 4, 1)); cat(hclust(dist(P, "manhattan"), "complete")$height[4])`, esperado: 9, tol: 1e-9 },
      { que: "altura 3", r: `P <- data.frame(X = c(1, 2, 4, 7, 5), Y = c(1, 6, 3, 4, 1)); cat(hclust(dist(P, "manhattan"), "complete")$height[3])`, esperado: 7, tol: 1e-9 }
    ],
    fuente: [{ id: "AY5-E", loc: "P1" }, { id: "AY5-R", loc: "líneas 51–62" }]
  }
]);
