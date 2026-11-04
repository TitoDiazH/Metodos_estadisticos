/* Desarrollo · M20 DBCA (P3) */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m20-d001", modulo: "m20-dbca", concepto: "m20-c07", dificultad: 2, origen: "variacion",
    base: [{ id: "C7.3", loc: "slides 16–17" }, { id: "PR-P3-Q1" }],
    titulo: "DBCA completo a mano: 3 tratamientos en 3 bloques",
    enunciado: String.raw`<p>Se comparan tres tratamientos (T1, T2, T3) en tres lotes de materia prima, que se usan como bloques. Resultados:</p>
<table class="tabla"><tr><th></th><th>Lote 1</th><th>Lote 2</th><th>Lote 3</th></tr>
<tr><td>T1</td><td>10</td><td>12</td><td>14</td></tr><tr><td>T2</td><td>12</td><td>15</td><td>15</td></tr><tr><td>T3</td><td>15</td><td>17</td><td>19</td></tr></table>
<p>Con $\alpha=5\,\%$ ($F_{0{,}05;2,4}=6{,}94$; $F_{0{,}05;2,6}=5{,}14$; $t_{0{,}025;4}=2{,}776$):</p>
<ol type="a"><li>Identifica el diseño, escribe el modelo y las hipótesis de tratamientos y de bloques.</li><li>Calcula las sumas de cuadrados y arma la tabla ANOVA.</li><li>Concluye sobre los tratamientos y sobre el bloqueo.</li><li>Aplica la LSD y recomienda un tratamiento (se quiere maximizar).</li><li>¿Qué habría pasado si se hubiera analizado como DCA?</li></ol>`,
    partes: [
      { titulo: "a) Diseño, modelo e hipótesis", puntos: 1,
        solucion: String.raw`<p>DBCA: cada lote (bloque) recibe los 3 tratamientos. $Y_{ij}=\mu+\tau_i+\gamma_j+\varepsilon_{ij}$, $\varepsilon\sim N(0,\sigma^2)$, sin interacción. $H_0:\tau_1=\tau_2=\tau_3=0$; para el bloque $H_0:\gamma_1=\gamma_2=\gamma_3=0$.</p>` },
      { titulo: "b) Sumas de cuadrados y tabla", puntos: 1.5,
        solucion: String.raw`<p>Totales: tratamientos $36, 42, 51$; bloques $37, 44, 48$; $Y_{\cdot\cdot}=129$; $Y_{\cdot\cdot}^2/N=1849$.</p>
<p>$SC_T=1909-1849=60$; $SC_{TRAT}=5661/3-1849=38$; $SC_B=5609/3-1849=20{,}67$; $SC_E=1{,}33$.</p>
<table class="tabla"><tr><th>FV</th><th>SC</th><th>gl</th><th>CM</th><th>$F_0$</th></tr><tr><td>Tratamiento</td><td>38</td><td>2</td><td>19</td><td>57</td></tr><tr><td>Lote</td><td>20,67</td><td>2</td><td>10,33</td><td>31</td></tr><tr><td>Error</td><td>1,33</td><td>4</td><td>0,333</td><td></td></tr><tr><td>Total</td><td>60</td><td>8</td><td></td><td></td></tr></table>` },
      { titulo: "c) Conclusiones", puntos: 1,
        solucion: String.raw`<p>Tratamiento: $57>6{,}94$ ⇒ se rechaza $H_0$ (R: $p=0{,}0012$). Lote: $31>6{,}94$ ⇒ el bloqueo fue efectivo ($p=0{,}0037$): los lotes sí influyen.</p>` },
      { titulo: "d) LSD y recomendación", puntos: 1.5,
        solucion: String.raw`<p>$LSD=2{,}776\sqrt{2\cdot0{,}333/3}=1{,}31$. Medias $12, 14, 17$: T2−T1 $=2$, T3−T1 $=5$, T3−T2 $=3$, todas $>1{,}31$ ⇒ los tres difieren. Se recomienda <strong>T3</strong>.</p>` },
      { titulo: "e) Comparación con DCA", puntos: 1,
        solucion: String.raw`<p>Sin bloque, $SC_E=1{,}33+20{,}67=22$ con 6 gl ⇒ $CME=3{,}67$ y $F=19/3{,}67=5{,}18$, apenas sobre $5{,}14$ ($p=0{,}049$). El bloqueo redujo el CME de 3,67 a 0,33 y aumentó mucho la potencia.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes (la fuente no trae puntajes para esta variante).",
    verifica: [
      { que: "F trat", r: `trat <- factor(rep(1:3, each = 3)); bl <- factor(rep(1:3, 3)); y <- c(10,12,14,12,15,15,15,17,19); cat(summary(aov(y ~ trat + bl))[[1]][1, 4])`, esperado: 57, tol: 0.001 },
      { que: "F bloque", r: `trat <- factor(rep(1:3, each = 3)); bl <- factor(rep(1:3, 3)); y <- c(10,12,14,12,15,15,15,17,19); cat(summary(aov(y ~ trat + bl))[[1]][2, 4])`, esperado: 31, tol: 0.001 },
      { que: "LSD", r: `cat(round(qt(0.975, 4) * sqrt(2 * (4/3/4) / 3), 2))`, esperado: 1.31, tol: 0.005 },
      { que: "F DCA", r: `trat <- factor(rep(1:3, each = 3)); y <- c(10,12,14,12,15,15,15,17,19); cat(round(summary(aov(y ~ trat))[[1]][1, 4], 2))`, esperado: 5.18, tol: 0.005 }
    ],
    fuente: [{ id: "C7.3", loc: "slides 9–17" }]
  }
]);
