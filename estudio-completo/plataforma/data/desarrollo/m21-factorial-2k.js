/* Desarrollo · M21 Factorial 2^k (P3) */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m21-d001", modulo: "m21-factorial-2k", concepto: "m21-c09", dificultad: 2, origen: "variacion",
    base: [{ id: "C7.4", loc: "slides 25–26" }, { id: "PR-P3-Q2" }],
    titulo: "Factorial 2² con 2 réplicas: efectos, gráficos y ANOVA",
    enunciado: String.raw`<p>Se estudia el rendimiento de un proceso según A (temperatura: baja/alta) y B (catalizador: poco/mucho), con 2 réplicas por tratamiento:</p>
<table class="tabla"><tr><th>Tratamiento</th><th>Réplica 1</th><th>Réplica 2</th></tr><tr><td>(1)</td><td>38</td><td>42</td></tr><tr><td>a</td><td>49</td><td>51</td></tr><tr><td>b</td><td>44</td><td>46</td></tr><tr><td>ab</td><td>63</td><td>67</td></tr></table>
<p>Con $\alpha=5\,\%$ ($F_{0{,}05;1,4}=7{,}71$):</p>
<ol type="a"><li>Calcula los efectos A, B y AB con los contrastes e interprétalos.</li><li>Describe la gráfica de interacción.</li><li>Calcula las SC y arma la tabla ANOVA. Concluye.</li></ol>`,
    partes: [
      { titulo: "a) Efectos", puntos: 2,
        solucion: String.raw`<p>Totales: $(1)=80$, $a=100$, $b=90$, $ab=130$; efecto $=$ contraste$/(2n)=$ contraste$/4$.</p>
<p>A $=(100+130-80-90)/4=15$; B $=(90+130-80-100)/4=10$; AB $=(80+130-100-90)/4=5$. Ambos factores aumentan el rendimiento; A es el mayor.</p>` },
      { titulo: "b) Gráfica de interacción", puntos: 1,
        solucion: String.raw`<p>Medias por celda: $(1)=40$, $a=50$, $b=45$, $ab=65$. Con B bajo, A sube 10; con B alto, A sube 20: las líneas no son paralelas (divergen) ⇒ hay indicio de interacción.</p>` },
      { titulo: "c) ANOVA y conclusión", puntos: 3,
        solucion: String.raw`<p>$SC=$ contraste$^2/(4n)$: $SC_A=60^2/8=450$; $SC_B=40^2/8=200$; $SC_{AB}=20^2/8=50$. $SC_T=\sum(y-50)^2=720$ ⇒ $SC_E=20$ con $2^2(2-1)=4$ gl, $CME=5$.</p>
<table class="tabla"><tr><th>FV</th><th>SC</th><th>gl</th><th>$F_0$</th></tr><tr><td>A</td><td>450</td><td>1</td><td>90</td></tr><tr><td>B</td><td>200</td><td>1</td><td>40</td></tr><tr><td>AB</td><td>50</td><td>1</td><td>10</td></tr><tr><td>Error</td><td>20</td><td>4</td><td></td></tr></table>
<p>Los tres $F_0>7{,}71$ ⇒ A, B y AB son significativos (R: $p=0{,}0007;\ 0{,}0032;\ 0{,}0341$). Mejor tratamiento: A alto y B alto (media 65).</p>` }
    ],
    escala: "Reparto de 6 puntos (inspirado en la rúbrica de PR-P3-Q2: cálculo + interpretación).",
    verifica: [
      { que: "F_A", r: `v <- c(38,42,49,51,44,46,63,67); A <- factor(rep(c(-1,1,-1,1), each = 2)); B <- factor(rep(c(-1,-1,1,1), each = 2)); cat(summary(aov(v ~ A * B))[[1]][1, 4])`, esperado: 90, tol: 1e-6 },
      { que: "F_AB", r: `v <- c(38,42,49,51,44,46,63,67); A <- factor(rep(c(-1,1,-1,1), each = 2)); B <- factor(rep(c(-1,-1,1,1), each = 2)); cat(summary(aov(v ~ A * B))[[1]][3, 4])`, esperado: 10, tol: 1e-6 },
      { que: "SC_T", js: "suma([38,42,49,51,44,46,63,67].map(v=>(v-50)**2))", esperado: 720, tol: 1e-9 }
    ],
    fuente: [{ id: "C7.4", loc: "slides 7–8 y 25–26" }]
  }
]);
