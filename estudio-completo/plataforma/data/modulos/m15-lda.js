/* ============================================================================
   M15 · Clasificación supervisada: LDA (P2)
   Fuentes abiertas para redactar: C6.1 slides 2–21 · S6.1 líneas 11–42 · AY6-E P3.
   Los números se recalculan en tools/verificar_numeros.js.
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m15-lda",
  orden: 15,
  titulo: "Clasificación supervisada: LDA",
  descripcion: "Construir una regla para clasificar clientes nuevos a partir de datos con grupo conocido, combinando variables en una función discriminante de Fisher.",
  pruebas: ["P2"],
  prioridad: "alta",
  fuentes: [{ id: "C6.1", loc: "slides 2–21" }, { id: "S6.1", loc: "líneas 11–42" }, { id: "AY6-E", loc: "P3" }],

  conceptos: [
    {
      id: "m15-c01",
      titulo: "Clasificación supervisada y el ejemplo del Banco de Ademuz",
      cubre: ["M15.1", "M15.2"],
      simple: String.raw`<p>En clasificación <strong>supervisada</strong> se conoce a qué grupo pertenece cada observación histórica y se construye una regla para clasificar observaciones nuevas. En el <strong>no supervisado</strong> (clustering) no hay grupos conocidos.</p>`,
      formal: String.raw`<p>Datos: $n$ observaciones con $p$ predictores $X_1,\dots,X_p$ y una respuesta categórica $Y$ con $K$ grupos. Objetivo: una función $f(x)\to$ grupo correcto. Métodos del capítulo: LDA, QDA y Naive Bayes.</p>`,
      ejemplo: String.raw`<p><strong>Banco de Ademuz</strong> (C6.1 s4–8): 16 clientes con patrimonio ($X_1$) y deuda ($X_2$) y grupo Fallido (8) o Cumplidor (8). Medias: Fallidos $(5,5)$; Cumplidores $(9,3)$. Un cliente nuevo tiene patrimonio $7$ y deuda $4$.</p>
<p><strong>Clasificar con una sola variable</strong> (corte en el promedio de las medias):</p>
<ul>
  <li>Patrimonio: $C=(5+9)/2=7$ (Fallido si $<7$). Acierta $12/16=75\,\%$.</li>
  <li>Deuda: $C=(5+3)/2=4$ (Fallido si $>4$). Acierta $9/16=56{,}3\,\%$ (por la tabla de la slide: 5 fallidos y 4 cumplidores bien clasificados).</li>
</ul>
<p>Una sola variable no captura toda la información ⇒ se combinan con el discriminante de Fisher.</p>`,
      errores: ["Confundir clasificación supervisada con clustering: aquí las etiquetas son conocidas."],
      memoriza: String.raw`<p>Supervisado = grupos conocidos y regla de decisión. Univariado en Ademuz: patrimonio 75 %, deuda 56,3 %.</p>`,
      comprueba: {
        enunciado: "¿Qué distingue a la clasificación supervisada?",
        opciones: ["Los grupos de las observaciones de entrenamiento son conocidos", "Los grupos se descubren con dendrogramas", "No hay variable respuesta", "Solo usa una variable"],
        correcta: 0,
        explicacion: "Se dispone de etiquetas y se construye una regla para clasificar nuevos casos."
      },
      fuente: [{ id: "C6.1", loc: "slides 2–9" }]
    },

    {
      id: "m15-c02",
      titulo: "La función discriminante de Fisher",
      figura: { tipo: "proyeccion", modo: "fisher", donde: "ejemplo", ejes: ["patrimonio", "deuda"], nombres: ["Fallido", "Cumplidor"], ang: 0,
        x: [1.3, 3.7, 5, 5.9, 7.1, 4, 7.9, 5.1, 5.2, 9.8, 9, 12, 6.3, 8.7, 11.1, 9.9],
        y: [4.1, 6.9, 3, 6.5, 5.4, 2.7, 7.6, 3.8, 1, 4.2, 4.8, 2, 5.2, 1.1, 4.1, 1.6],
        grupos: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        atajos: [[0, "Solo patrimonio"], [90, "Solo deuda"]],
        pie: "Los 16 clientes del Banco de Ademuz. Con una sola variable se aciertan 12 o 9 de 16; la dirección de Fisher combina ambas y acierta 15 de 16." },
      cubre: ["M15.3", "M15.4"],
      simple: String.raw`<p>Fisher combina las variables en <strong>un solo puntaje</strong> $D=u_1X_1+u_2X_2$ eligiendo los pesos que mejor separan los grupos: medias de grupo lo más lejos posible (<strong>señal</strong>) y datos dentro de cada grupo lo más juntos posible (<strong>ruido</strong>).</p>`,
      formal: String.raw`$$\max_u\ \lambda=\frac{u'Fu}{u'Wu}\ \ (\text{señal/ruido}),\qquad \text{con 2 grupos:}\ \ u=W^{-1}(\bar x_1-\bar x_2)$$
<p>$F$: dispersión entre grupos (factor); $W$: dispersión dentro de los grupos (suma de las matrices de dispersión de cada grupo). Es análogo al ANOVA (entre vs. dentro), pero con matrices. La clase indica que no hay que memorizar la fórmula (C6.1 s13); sí entender qué hace. Solo importa la <em>dirección</em> de $u$: puede multiplicarse por cualquier escalar (incluso negativo), por eso R da otros valores.</p>
<p><strong>Regla:</strong> corte $C=(\bar D_1+\bar D_2)/2$, con $\bar D_g$ el puntaje promedio de cada grupo.</p>`,
      ejemplo: String.raw`<p>Banco de Ademuz (C6.1 s14–19):</p>
<ol>
  <li>Diferencia de medias $\bar x_F-\bar x_C=(-4,\ 2)$.</li>
  <li>$W=\begin{pmatrix}66{,}70&14{,}01\\14{,}01&45{,}62\end{pmatrix}$.</li>
  <li>$u=W^{-1}(-4,2)'=(-0{,}074;\ 0{,}067)$ ⇒ $D=-0{,}074\,\text{Patrim.}+0{,}067\,\text{Deuda}$.</li>
  <li>Promedios: $\bar D_F=-0{,}037$ y $\bar D_C=-0{,}466$; corte $C=-0{,}251$. Si $D>-0{,}251$ ⇒ Fallido; si $D<-0{,}251$ ⇒ Cumplidor.</li>
  <li>El cliente nuevo $(7,4)$: $D=-0{,}074\cdot7+0{,}067\cdot4=-0{,}251$: <strong>justo en la frontera</strong>.</li>
  <li>Resultado en los 16: $15/16=93{,}75\,\%$ (vs. $75\,\%$ univariado). El único error es el <strong>cliente 13</strong> (cumplidor con patrimonio $6{,}3$ y deuda $5{,}2$ clasificado como fallido).</li>
</ol>
<p class="ayuda">La slide 19 dice «solo 1 error: cliente 7», pero su propia tabla (y la slide 17 de la clase 6.2) muestran que el error es el cliente 13. Ver «Diferencias entre fuentes».</p>`,
      r: {
        nota: "El álgebra de C6.1 s14–19 hecha a mano en R (la clase lo deja en la sección 6 del script).",
        codigo: `X <- cbind(patrimonio = c(1.3,3.7,5,5.9,7.1,4,7.9,5.1,5.2,9.8,9,12,6.3,8.7,11.1,9.9),
           deuda      = c(4.1,6.9,3,6.5,5.4,2.7,7.6,3.8,1,4.2,4.8,2,5.2,1.1,4.1,1.6))
F <- X[1:8, ]; C <- X[9:16, ]
W <- cov(F) * 7 + cov(C) * 7
u <- solve(W, colMeans(F) - colMeans(C))
D <- X %*% u
corte <- (mean(D[1:8]) + mean(D[9:16])) / 2
round(W, 2); round(u, 4); round(corte, 3)`,
        rlab: "r-m15-lda"
      },
      errores: ["Usar $W$ (dentro) con $B$ (entre) cambiados.", "Interpretar el signo de $u$ como «importancia»: solo la dirección es relevante."],
      memoriza: String.raw`<p>Fisher: $\max u'Fu/u'Wu$; con 2 grupos $u=W^{-1}(\bar x_1-\bar x_2)$; corte = promedio de los $\bar D$. Ademuz: $u=(-0{,}074;0{,}067)$, corte $-0{,}251$, 15/16.</p>`,
      comprueba: {
        enunciado: "¿Qué busca maximizar el criterio de Fisher?",
        opciones: ["La separación entre grupos relativa a la dispersión dentro de cada grupo", "La dispersión dentro de cada grupo", "El número de variables", "La media global"],
        correcta: 0,
        explicacion: "Señal (entre grupos) sobre ruido (dentro de grupos): λ = u'Fu / u'Wu."
      },
      verifica: [
        { que: "peso u1", r: `X <- cbind(c(1.3,3.7,5,5.9,7.1,4,7.9,5.1,5.2,9.8,9,12,6.3,8.7,11.1,9.9), c(4.1,6.9,3,6.5,5.4,2.7,7.6,3.8,1,4.2,4.8,2,5.2,1.1,4.1,1.6)); F <- X[1:8,]; C <- X[9:16,]; W <- cov(F)*7+cov(C)*7; cat(round(solve(W, colMeans(F)-colMeans(C))[1], 3))`, esperado: -0.074, tol: 0.0005 },
        { que: "punto de corte", r: `X <- cbind(c(1.3,3.7,5,5.9,7.1,4,7.9,5.1,5.2,9.8,9,12,6.3,8.7,11.1,9.9), c(4.1,6.9,3,6.5,5.4,2.7,7.6,3.8,1,4.2,4.8,2,5.2,1.1,4.1,1.6)); F <- X[1:8,]; C <- X[9:16,]; W <- cov(F)*7+cov(C)*7; u <- solve(W, colMeans(F)-colMeans(C)); D <- X %*% u; cat(round((mean(D[1:8])+mean(D[9:16]))/2, 3))`, esperado: -0.251, tol: 0.0005 },
        { que: "accuracy univariada con patrimonio", js: "12/16", esperado: 0.75, tol: 1e-9 }
      ],
      fuente: [{ id: "C6.1", loc: "slides 10–19" }]
    },

    {
      id: "m15-c03",
      titulo: "Supuestos de LDA y lda() en R",
      cubre: ["M15.5", "M15.6"],
      simple: String.raw`<p>LDA funciona bien si dentro de cada grupo los datos son aproximadamente normales, los grupos tienen la misma dispersión y las observaciones son independientes. En R, <code>MASS::lda()</code> calcula todo.</p>`,
      formal: String.raw`<ol>
  <li><strong>Normalidad multivariada</strong> dentro de cada grupo (QQ-plots o Shapiro). LDA es bastante robusto a desviaciones leves.</li>
  <li><strong>Covarianzas iguales</strong> entre grupos ($\Sigma_1=\dots=\Sigma_K$): se contrasta con el test de <strong>Box's M</strong>; si no se cumple, se usa QDA (M16).</li>
  <li><strong>Observaciones independientes</strong>: depende del diseño del estudio; no hay test específico.</li>
</ol>
<p>En R: <code>lda(grupo ~ x1 + x2, data)</code>; <code>predict(modelo, datos)</code> devuelve <code>$class</code> (clasificación), <code>$posterior</code> (probabilidades) y <code>$x</code> (puntajes discriminantes). Matriz de confusión: <code>table(Real, Predicho)</code>; accuracy $=\text{sum(diag(t))/sum(t)}$.</p>`,
      ejemplo: String.raw`<p>Ademuz: matriz de confusión del LDA (filas = real): Cumplidor $7$ bien y $1$ mal; Fallido $8$ bien. Accuracy $=15/16=0{,}9375$. Los coeficientes <code>LD1</code> de R son $(-0{,}422;\ 0{,}380)$: distintos de $(-0{,}074;0{,}067)$ pero con la misma dirección (están escalados de otro modo).</p>`,
      r: {
        nota: "Código de C6.1 slide 21.",
        codigo: `library(MASS)
modelo_lda <- lda(grupo ~ patrimonio + deuda, data = datos)
pred_lda <- predict(modelo_lda, datos)
tabla <- table(Real = datos$grupo, Predicho = pred_lda$class)
tabla
sum(diag(tabla)) / sum(tabla)`,
        rlab: "r-m15-lda"
      },
      lectura: String.raw`<ul><li><code>Prior probabilities</code>: proporción de cada grupo (aquí $0{,}5$ y $0{,}5$).</li><li><code>Group means</code>: medias por grupo (Cumplidor $(9,3)$; Fallido $(5,5)$).</li><li><code>Coefficients of linear discriminants</code>: los pesos $u$ (otra escala).</li><li>Un cliente nuevo $(7,4)$ da posterior $0{,}5$/$0{,}5$ (justo en la frontera); en ese empate exacto <code>predict</code> devuelve <code>Cumplidor</code> (R lo verifica; la decisión en el borde es arbitraria).</li></ul>`,
      errores: ["Creer que no se puede usar LDA si la normalidad no es perfecta: es robusto a desviaciones leves."],
      memoriza: String.raw`<p>Supuestos: normalidad multivariada · $\Sigma$ iguales (Box's M) · independencia. <code>predict()</code>: <code>$class</code>, <code>$posterior</code>, <code>$x</code>.</p>`,
      comprueba: {
        enunciado: "¿Qué test se usa para verificar que los grupos tienen la misma matriz de covarianza?",
        opciones: ["Box's M", "Bartlett de esfericidad", "Shapiro-Wilk", "t de Student"],
        correcta: 0,
        explicacion: "Box's M contrasta H0: Σ1 = … = ΣK; si se rechaza, se usa QDA."
      },
      fuente: [{ id: "C6.1", loc: "slides 20–21" }, { id: "S6.1", loc: "líneas 28–42" }]
    }
  ],

  cuando: String.raw`<div class="tabla-scroll"><table class="tabla">
<thead><tr><th>Situación</th><th>Método</th></tr></thead>
<tbody>
<tr><td>Grupos conocidos, Σ iguales (Box's M no rechaza), muestras pequeñas</td><td>LDA</td></tr>
<tr><td>Σ distintas (Box's M rechaza) y datos suficientes</td><td>QDA (M16)</td></tr>
<tr><td>Muchas variables, pocos datos o categóricas</td><td>Naive Bayes (M16)</td></tr>
</tbody></table></div>`,

  errores: [
    { texto: "La slide 19 de C6.1 atribuye el único error al cliente 7; es el cliente 13.", fuente: [{ id: "C6.1", loc: "slides 17–19" }] }
  ]
});
