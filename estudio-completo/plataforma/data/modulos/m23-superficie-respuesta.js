/* ============================================================================
   M23 · Metodología de superficie de respuesta (P4)
   Fuentes abiertas para redactar: C8.2 slides 1–39 (texto extraído; s16 y s29
   con las fórmulas descritas en el texto), INST-P4, S8.2 (datos del ejemplo 2).
   Salidas recalculadas en R 4.6.2 con rsm (coinciden con C8.2 s14–17 y s31).
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m23-superficie-respuesta",
  orden: 24,
  titulo: "Metodología de superficie de respuesta",
  descripcion: "Cuando los factores son continuos, la respuesta es una superficie. Se aproxima con un modelo de segundo orden (una regresión), se busca su punto estacionario y se decide si es máximo, mínimo o silla para encontrar las mejores condiciones de operación.",
  pruebas: ["P4"],
  prioridad: "alta",
  fuentes: [{ id: "C8.2", loc: "slides 1–39" }, { id: "INST-P4" }],

  conceptos: [
    {
      id: "m23-c01",
      titulo: "Qué es una superficie de respuesta y el modelo de segundo orden",
      cubre: ["M23.1"],
      simple: String.raw`<p>Si la temperatura y la concentración pueden tomar <strong>cualquier valor</strong> dentro de un rango, el rendimiento no es una tabla de medias sino una <strong>superficie</strong> sobre el plano (temperatura, concentración). Queremos describirla para saber dónde está su cima (o su fondo).</p>
<p>La superficie real puede ser complicada, pero en una zona acotada casi siempre se parece a una de tres formas: una <strong>loma</strong>, un <strong>valle</strong> o una <strong>silla de montar</strong>. Las tres se describen con un polinomio de segundo grado.</p>`,
      formal: String.raw`<p>Modelo de segundo orden con $k$ factores:</p>
$$y=\beta_0+\sum_{i=1}^k\beta_ix_i+\sum_{i=1}^k\beta_{ii}x_i^2+\sum_{i<j}\beta_{ij}x_ix_j+\varepsilon$$
<p>Tres tipos de términos: <strong>lineales</strong> $\beta_ix_i$ (inclinación), <strong>cuadráticos</strong> $\beta_{ii}x_i^2$ (curvatura en cada dirección) e <strong>interacciones</strong> $\beta_{ij}x_ix_j$ (el efecto de un factor depende del nivel del otro). Con $k=2$ son 6 coeficientes; con $k=3$, 10.</p>
<p>Desde el diseño de experimentos hay dos preguntas: <strong>¿en qué puntos mido?</strong> (diseño central compuesto o Box-Behnken) y <strong>¿cómo analizo los datos?</strong> (regresión múltiple + punto estacionario).</p>`,
      memoriza: String.raw`<p>2.º orden = lineales + cuadráticos + interacciones. $k=2$ ⇒ 6 términos; $k=3$ ⇒ 10.</p>`,
      comprueba: {
        enunciado: "En un modelo de segundo orden con 3 factores, ¿cuántos coeficientes hay que estimar (incluido el intercepto)?",
        opciones: ["10", "7", "9", "6"],
        correcta: 0,
        explicacion: "1 intercepto + 3 lineales + 3 cuadráticos + 3 interacciones = 10 (C8.2 s30)."
      },
      fuente: [{ id: "C8.2", loc: "slides 2–3, 7, 30" }]
    },

    {
      id: "m23-c02",
      titulo: "Del factorial 2^k a la superficie: regresión codificada y curvatura",
      cubre: ["M23.2", "M23.3"],
      simple: String.raw`<p>Un factorial $2^k$ <strong>ya es una regresión</strong>: si se codifican los niveles como −1 y +1, <code>lm(y ~ x1*x2*x3)</code> entrega exactamente los efectos del factorial (cada coeficiente es la <strong>mitad del efecto</strong>, porque ir de −1 a +1 son dos unidades).</p>
<p>Su límite: con dos niveles por factor solo se ven rectas. Por dos puntos pasa una sola recta pero infinitas curvas, así que el $2^k$ <strong>no detecta curvatura</strong> y siempre pone el óptimo en una esquina. Para estimar un $x^2$ hacen falta <strong>al menos tres niveles</strong>.</p>`,
      formal: String.raw`<p><strong>Codificar:</strong> $x=\dfrac{X-\text{centro}}{\text{semirrango}}$, así cada factor va de −1 a +1 y el 0 es el centro del diseño. De vuelta: $X=\text{centro}+x\cdot\text{semirrango}$.</p>
<p><strong>Por qué importa:</strong> con interacciones, la prueba $t$ de $\beta_2$ pregunta por el efecto del factor 2 <em>cuando los demás valen 0</em>. En unidades reales eso es «0 °C y 0 min», que nunca ocurre; en codificado es el centro del diseño. El ajuste ($R^2$, residuos) es idéntico; cambian los valores p de los términos individuales.</p>
<p><strong>Jerarquía:</strong> si una interacción $x_2x_3$ es significativa, se conservan $x_2$ y $x_3$ aunque su valor p individual sea alto.</p>`,
      ejemplo: String.raw`<p>Resistencia de un material, $2^3$ con 3 réplicas (C8.2 s24): $b_1=8{,}7083$ ⇒ subir la temperatura de 150 a 200 °C aumenta la resistencia en $2\times8{,}7\approx17{,}4$. Todos los errores estándar valen 0,2205 porque el diseño es ortogonal.</p>
<p>Con las variables en unidades reales (s25), presión pasa de $p<0{,}001$ a $p=0{,}139$ y tiempo de $p<0{,}001$ a $p=0{,}267$, con el mismo $R^2=0{,}9935$: la presión importa, pero la prueba ahora pregunta por su efecto a 0 °C y 0 min.</p>`,
      r: { nota: "C8.2 s23–26: el factorial como regresión con variables codificadas o centradas.", codigo: `modelo <- lm(y ~ x1*x2*x3, data = datos)   # x en -1 / +1
summary(modelo)
temp_c <- temp - 175   # centrar: mismos valores p que codificar` },
      errores: ["Interpretar el coeficiente codificado como el efecto completo (el efecto es 2·b).", "Sacar un factor no significativo cuando participa en una interacción significativa (rompe la jerarquía).", "Concluir que un factor no importa porque su p es alto en unidades reales con interacciones en el modelo."],
      memoriza: String.raw`<p>Codificado: $x=(X-c)/s$ · coeficiente $=$ efecto$/2$ · $2^k$ no ve curvatura ⇒ ≥ 3 niveles.</p>`,
      comprueba: {
        enunciado: "En un 2³ codificado, b₁ = 4,2. ¿Cuánto cambia la respuesta media al pasar x₁ de su nivel bajo al alto?",
        opciones: ["8,4", "4,2", "2,1", "Depende del intercepto"],
        correcta: 0,
        explicacion: "De −1 a +1 hay 2 unidades codificadas: el efecto es 2·b₁ = 8,4 (C8.2 s24)."
      },
      verifica: [{ que: "efecto 2³", js: "2*8.7083", esperado: 17.4166, tol: 1e-4 }],
      fuente: [{ id: "C8.2", loc: "slides 23–28" }]
    },

    {
      id: "m23-c03",
      titulo: "Diseño central compuesto (CCD)",
      cubre: ["M23.4"],
      simple: String.raw`<p>El diseño central compuesto parte de un factorial $2^k$ (las esquinas), le agrega un <strong>punto central</strong> repetido y <strong>puntos axiales</strong> sobre cada eje, a distancia $\alpha$ del centro. Así cada factor queda con 5 niveles ($-\alpha,-1,0,+1,+\alpha$) y se puede estimar la curvatura.</p>`,
      formal: String.raw`<p>Corridas: $2^k$ vértices + $2k$ axiales + $n_0$ centros. Valores usuales de $\alpha$: $\alpha=1$ (axiales en las caras del cubo) o $\alpha=\sqrt[4]{2^k}$ (diseño <strong>rotable</strong>: la varianza de la predicción depende solo de la distancia al centro). Con $k=2$, $\alpha=\sqrt[4]{4}=1{,}414$.</p>
<p>Las réplicas del centro dan el <strong>error puro</strong>, que permite probar la <strong>falta de ajuste</strong> del modelo.</p>`,
      ejemplo: String.raw`<p>Rendimiento de un proceso químico (C8.2 s8, s37): temperatura 200–250 °C y concentración 15–25 %. Codificación $x_1=(T-225)/25$, $x_2=(C-20)/5$. Diseño: 4 esquinas, 4 axiales a $\pm1{,}414$ (por ejemplo $T=225+25(1{,}414)=260{,}35$ °C) y 4 réplicas del centro (225 °C; 20 %): 12 corridas.</p>`,
      figura: `<svg viewBox="0 0 300 230" role="img" aria-label="Diseño central compuesto para dos factores"><g stroke="currentColor" stroke-opacity=".35" fill="none"><rect x="90" y="55" width="120" height="120"/><circle cx="150" cy="115" r="85"/><line x1="40" y1="115" x2="260" y2="115"/><line x1="150" y1="15" x2="150" y2="215"/></g><g fill="#3b82f6"><circle cx="90" cy="55" r="6"/><circle cx="210" cy="55" r="6"/><circle cx="90" cy="175" r="6"/><circle cx="210" cy="175" r="6"/></g><g fill="#f59e0b"><circle cx="65" cy="115" r="6"/><circle cx="235" cy="115" r="6"/><circle cx="150" cy="30" r="6"/><circle cx="150" cy="200" r="6"/></g><circle cx="150" cy="115" r="7" fill="#10b981"/><g font-size="12" fill="currentColor"><text x="215" y="50">(1, 1)</text><text x="240" y="108">(α, 0)</text><text x="158" y="110">centro × n₀</text><text x="250" y="130">x₁</text><text x="156" y="22">x₂</text></g></svg><figcaption>Central compuesto con k = 2: esquinas del 2² (azul), axiales a α = 1,414 (naranjo) y centro repetido (verde). Todos los puntos externos están a la misma distancia del centro: por eso es rotable.</figcaption>`,
      memoriza: String.raw`<p>CCD: $2^k$ + $2k$ axiales + centros · rotable con $\alpha=(2^k)^{1/4}$ ($k=2$: 1,414; $k=3$: 1,682).</p>`,
      comprueba: {
        enunciado: "¿Cuántas corridas tiene un central compuesto con k = 3 y 6 réplicas del centro?",
        opciones: ["20", "15", "14", "26"],
        correcta: 0,
        explicacion: "2³ = 8 vértices + 2·3 = 6 axiales + 6 centros = 20 (C8.2 s39 menciona 20 para k = 3)."
      },
      verifica: [{ que: "alfa k=2", js: "Math.pow(4,0.25)", esperado: 1.41421, tol: 1e-5 }, { que: "axial T", js: "225+25*1.414", esperado: 260.35, tol: 1e-9 }],
      fuente: [{ id: "C8.2", loc: "slides 4–5, 8, 37" }]
    },

    {
      id: "m23-c04",
      titulo: "Ajustar y leer el modelo de segundo orden en R",
      cubre: ["M23.6"],
      simple: String.raw`<p>El modelo de segundo orden es una <strong>regresión lineal múltiple</strong> (lineal en los parámetros): cada término es una columna más. Se lee igual que cualquier <code>summary</code>: valores p de cada término, $F$ global, $R^2$ y $R^2$ ajustado. Lo nuevo es la <strong>falta de ajuste</strong>, que compara lo que el modelo no explica con la variación entre réplicas.</p>`,
      formal: String.raw`<p>En R: <code>lm(y ~ x1 + x2 + I(x1^2) + I(x2^2) + x1:x2)</code> (el <code>I()</code> hace que <code>^</code> sea potencia) o, con el paquete <code>rsm</code>, <code>rsm(y ~ SO(x1, x2))</code> (SO = segundo orden).</p>
<p>Qué mirar: (1) ¿cuadráticos significativos? ⇒ hay <strong>curvatura</strong>; (2) ¿interacciones significativas? ⇒ el efecto de un factor depende del otro; (3) $F$ global ⇒ ¿sirve el modelo?; (4) $R^2$ y $R^2_{aj}$; (5) falta de ajuste: $H_0$ el modelo de 2.º orden es adecuado. $F_{FA}=\dfrac{SC_{FA}/gl_{FA}}{SC_{puro}/gl_{puro}}$.</p>`,
      ejemplo: String.raw`<p>Ejemplo del rendimiento (C8.2 s14–15), codificado: $\hat y=79{,}75+10{,}18x_1+4{,}22x_2-7{,}75x_1x_2-8{,}50x_1^2-5{,}25x_2^2$. Todos los términos tienen $p<0{,}01$: hay curvatura (cuadráticos negativos) e interacción. $R^2=0{,}979$, $R^2_{aj}=0{,}962$, $F=56{,}6$ ($p=5{,}7\cdot10^{-5}$). Falta de ajuste: $F=0{,}393$, $p=0{,}77$ ⇒ el modelo de 2.º orden no se queda corto.</p>
<p>En codificado el coeficiente de $x_1$ (10,18) es más del doble que el de $x_2$ (4,22): <strong>la temperatura pesa más</strong>. En unidades reales los coeficientes ($7{,}768$ para T, $23{,}19$ para C) no se pueden comparar así.</p>`,
      r: { nota: "C8.2 s14–15. coded.data define la codificación; summary(rsm) trae además la falta de ajuste y el punto estacionario.", codigo: `modelo2 <- lm(y ~ T + C + I(T^2) + I(C^2) + I(T*C), data = ejemplo2)
library(rsm)
datos <- coded.data(ejemplo2, x1 ~ (T - 225)/25, x2 ~ (C - 20)/5)
modelo_rsm <- rsm(y ~ SO(x1, x2), data = datos)
summary(modelo_rsm)` },
      lectura: String.raw`<p>En <code>summary(modelo_rsm)</code>: la tabla de coeficientes (<code>x1^2</code> es el cuadrático), luego una tabla ANOVA con <code>FO</code> (lineales), <code>TWI</code> (interacciones), <code>PQ</code> (cuadráticos puros), <code>Lack of fit</code> y <code>Pure error</code>; al final <code>Stationary point</code> y <code>Eigenanalysis</code>.</p>`,
      errores: ["Escribir y ~ x1 + x1^2 sin I(): R lo interpreta como fórmula y no agrega el cuadrado.", "Concluir que el modelo es malo porque un término lineal no es significativo: lo que importa es la superficie completa (y la jerarquía).", "Confundir falta de ajuste significativa (malo) con F global significativo (bueno)."],
      memoriza: String.raw`<p>Curvatura ⇐ $x_i^2$ significativo · interacción ⇐ $x_ix_j$ significativo · falta de ajuste: $p>0{,}05$ es lo deseado.</p>`,
      comprueba: {
        enunciado: "En la salida de rsm, Lack of fit tiene p = 0,77. ¿Qué significa?",
        opciones: ["No hay evidencia de que el modelo de segundo orden se quede corto", "El modelo no sirve", "Hay curvatura", "Hay que agregar términos cúbicos"],
        correcta: 0,
        explicacion: "H₀ de la falta de ajuste: el modelo es adecuado. p alto ⇒ no se rechaza (C8.2 s15)."
      },
      fuente: [{ id: "C8.2", loc: "slides 7, 14–15" }]
    },

    {
      id: "m23-c05",
      titulo: "Punto estacionario a mano y su clasificación (hessiana)",
      cubre: ["M23.7"],
      simple: String.raw`<p>En la cima de una loma (o en el fondo de un valle) el terreno es <strong>plano</strong>: la pendiente en todas las direcciones es cero. Por eso el punto estacionario se encuentra igual que en cálculo de una variable: <strong>derivar, igualar a cero y resolver</strong>. Después hay que ver si es loma, valle o silla, mirando la curvatura (las segundas derivadas).</p>`,
      formal: String.raw`<p><strong>1) Derivar e igualar a 0.</strong> Con $k=2$: $\hat y=b_0+b_1x_1+b_2x_2+b_{11}x_1^2+b_{22}x_2^2+b_{12}x_1x_2$</p>
$$\frac{\partial\hat y}{\partial x_1}=b_1+2b_{11}x_1+b_{12}x_2=0,\qquad \frac{\partial\hat y}{\partial x_2}=b_2+b_{12}x_1+2b_{22}x_2=0$$
<p>Es un sistema lineal: $x_1$ aparece multiplicado por $2b_{11}$ porque la derivada de $x_1^2$ es $2x_1$; y $x_2$ aparece en la primera ecuación porque la derivada de $x_1x_2$ respecto de $x_1$ es $x_2$.</p>
<p><strong>En forma matricial:</strong> $\hat y=b_0+\mathbf x'\mathbf b+\mathbf x'B\mathbf x$, con $\mathbf b$ los coeficientes lineales y $B$ con los $b_{ii}$ en la diagonal y $b_{ij}/2$ fuera. Derivando: $\mathbf b+2B\mathbf x=\mathbf 0$ ⇒ $\mathbf x_s=-\tfrac12B^{-1}\mathbf b$.</p>
<p><strong>2) Clasificar.</strong> La hessiana es $H=2B$. Con $k=2$: si $\det H>0$ y $h_{11}<0$ ⇒ definida negativa ⇒ <strong>máximo</strong>; $\det H>0$ y $h_{11}>0$ ⇒ <strong>mínimo</strong>; $\det H<0$ ⇒ <strong>punto silla</strong>. Equivalente (y lo que entrega R): valores propios $\lambda$ de $B$: todos negativos ⇒ máximo; todos positivos ⇒ mínimo; signos mezclados ⇒ silla. Sin interacciones $B$ es diagonal y los $\lambda$ son directamente los $b_{ii}$.</p>
<p><strong>3) Volver a unidades reales</strong> ($X=c+x\cdot s$), calcular $\hat y(\mathbf x_s)$ y revisar que $\mathbf x_s$ esté <strong>dentro de la región experimental</strong>.</p>`,
      ejemplo: String.raw`<p>Rendimiento (C8.2 s29): $\partial\hat y/\partial x_1=10{,}179-17{,}003x_1-7{,}75x_2=0$ y $\partial\hat y/\partial x_2=4{,}216-7{,}75x_1-10{,}501x_2=0$ ⇒ $x_1^*=0{,}626$, $x_2^*=-0{,}061$.</p>
<p>$H=\begin{pmatrix}-17{,}00&-7{,}75\\-7{,}75&-10{,}50\end{pmatrix}$: $\det H=178{,}5-60{,}06=118{,}5>0$ y $h_{11}<0$ ⇒ <strong>máximo</strong> (valores propios de $B$: $-2{,}67$ y $-11{,}08$).</p>
<p>Unidades reales: $T^*=225+25(0{,}626)=240{,}7$ °C y $C^*=20+5(-0{,}061)=19{,}7$ %; $\hat y\approx82{,}8$. Está dentro de la región ($\pm1{,}414$): es el óptimo.</p>`,
      r: { nota: "C8.2 s17: rsm entrega el punto estacionario (codificado y real) y los valores propios.", codigo: `summary(modelo_rsm)          # Stationary point + Eigenanalysis
xs <- xs(modelo_rsm)
predict(modelo_rsm, newdata = as.data.frame(t(xs)))` },
      errores: ["Olvidar el 2 al derivar x² (la derivada de b₁₁x₁² es 2b₁₁x₁).", "Poner b₁₂ completo fuera de la diagonal de B (va b₁₂/2; en la hessiana H = 2B sí queda b₁₂).", "Dar el punto en codificado cuando se piden condiciones de operación (hay que pasar a unidades reales).", "Recomendar un punto estacionario que cae fuera de la región o que es del tipo equivocado."],
      memoriza: String.raw`<p>$\mathbf x_s=-\tfrac12B^{-1}\mathbf b$ · $H=2B$ · $\lambda$ todos $<0$ máx · todos $>0$ mín · mezclados silla · $k=2$: $\det H>0$ y $h_{11}<0$ ⇒ máx.</p>`,
      comprueba: {
        enunciado: "Un modelo de 2.º orden tiene valores propios de B iguales a 3,2 y −1,5. ¿Qué es el punto estacionario?",
        opciones: ["Un punto silla", "Un máximo", "Un mínimo", "No se puede saber sin el intercepto"],
        correcta: 0,
        explicacion: "Signos mezclados ⇒ silla (C8.2 s16)."
      },
      verifica: [{ que: "x1* rendimiento", r: `cat(-0.5 * solve(matrix(c(-8.50159, -3.875, -3.875, -5.25060), 2), c(10.17904, 4.21639))[1])`, esperado: 0.626, tol: 0.001 },
        { que: "detH", js: "(-17.0)*(-10.5)-(-7.75)*(-7.75)", esperado: 118.4375, tol: 1e-6 },
        { que: "T*", js: "225+25*0.626", esperado: 240.65, tol: 1e-6 }],
      fuente: [{ id: "C8.2", loc: "slides 16–17, 29" }]
    },

    {
      id: "m23-c06",
      titulo: "Diseño de Box-Behnken y el ejercicio de las hojuelas de soya",
      cubre: ["M23.5", "M23.11"],
      simple: String.raw`<p>El Box-Behnken usa solo <strong>tres niveles</strong> por factor y <strong>nunca pone todos los factores en un extremo a la vez</strong>: sus puntos están en el medio de las aristas del cubo, más el centro. Sirve cuando las esquinas son caras o peligrosas, y necesita menos corridas que el central compuesto.</p>`,
      formal: String.raw`<p>Con $k=3$: un factorial $2^2$ por cada par de factores con el tercero en 0 (3 bloques de 4) ⇒ 12 puntos de arista + 3 centros = <strong>15 corridas</strong> (el CCD necesitaría 20). Con 10 coeficientes quedan 5 gl para el error, 2 de ellos de error puro.</p>
<p>Si <strong>ninguna interacción es significativa</strong>, $B$ es diagonal y cada factor se optimiza por separado: $\partial\hat y/\partial x_i=b_i+2b_{ii}x_i=0$ ⇒ $x_i^*=-\dfrac{b_i}{2b_{ii}}$.</p>`,
      ejemplo: String.raw`<p>Hojuelas de soya rotas (C8.2 s19–22, examen MEG P3.2), minimizar. Términos significativos: $b_1=2{,}375$, $b_2=3{,}75$, $b_3=3{,}625$, $b_{11}=2{,}667$, $b_{22}=2{,}417$, $b_{33}=4{,}667$; interacciones no ($p>0{,}6$). $F=42{,}6$ ($p=0{,}0003$), $R^2=0{,}987$.</p>
<p>$x_1^*=-2{,}375/5{,}334=-0{,}45$ ⇒ $145+25(-0{,}45)\approx134$ °C; $x_2^*=-3{,}75/4{,}834=-0{,}78$ ⇒ $35+10(-0{,}78)\approx27$ %; $x_3^*=-3{,}625/9{,}334=-0{,}39$ ⇒ $900+100(-0{,}39)\approx861$ rpm. Los tres $b_{ii}>0$ ⇒ <strong>mínimo</strong>, dentro de la región: $\hat y\approx21$ % de hojuelas rotas (contra 23,7 % en el centro).</p>`,
      memoriza: String.raw`<p>Box-Behnken $k=3$: 12 aristas + 3 centros = 15 · sin interacciones: $x_i^*=-b_i/(2b_{ii})$.</p>`,
      comprueba: {
        enunciado: "En un Box-Behnken sin interacciones significativas, b₂ = 3,75 y b₂₂ = 2,417. ¿Cuál es x₂*?",
        opciones: ["−0,776", "−1,552", "0,776", "−0,388"],
        correcta: 0,
        explicacion: "x₂* = −b₂/(2b₂₂) = −3,75/4,834 = −0,776 (C8.2 s21)."
      },
      verifica: [{ que: "x1*", js: "-2.375/(2*2.667)", esperado: -0.4453, tol: 1e-4 }, { que: "x2*", js: "-3.75/(2*2.417)", esperado: -0.7757, tol: 1e-4 }, { que: "x3*", js: "-3.625/(2*4.667)", esperado: -0.3884, tol: 1e-4 },
        { que: "ymin", js: "23.667-2.375*2.375/(4*2.667)-3.75*3.75/(4*2.417)-3.625*3.625/(4*4.667)", esperado: 20.98, tol: 0.01 }],
      fuente: [{ id: "C8.2", loc: "slides 19–22, 38–39" }, { id: "PR-EX-Q3", loc: "3.2" }]
    },

    {
      id: "m23-c07",
      titulo: "Gráfico de contornos",
      cubre: ["M23.8"],
      simple: String.raw`<p>El gráfico de contornos es la superficie <strong>vista desde arriba</strong>: cada curva une las combinaciones de factores con la misma respuesta predicha. Elipses cerradas alrededor de un punto ⇒ máximo o mínimo; hipérbolas ⇒ silla.</p>`,
      formal: String.raw`<p>La forma de las elipses dice la <strong>sensibilidad</strong>: si son alargadas en una dirección, moverse en esa dirección cambia poco la respuesta (es la dirección del valor propio de menor magnitud). Útil cuando no se puede operar exactamente en el óptimo.</p>`,
      ejemplo: String.raw`<p>Rendimiento (C8.2 s18): elipses cerradas alrededor de la ★ (máximo), alargadas en diagonal: subir T y bajar C a la vez cambia poco el rendimiento ($\lambda=-2{,}67$, el de menor magnitud).</p>`,
      r: { nota: "C8.2 s18.", codigo: `contour(modelo_rsm, ~ x1 + x2, image = TRUE)` },
      memoriza: String.raw`<p>Contornos = superficie desde arriba · elipses ⇒ máx/mín · hipérbolas ⇒ silla.</p>`,
      comprueba: {
        enunciado: "Los contornos de una superficie ajustada son hipérbolas que se cruzan en el punto estacionario. ¿Qué tipo de punto es?",
        opciones: ["Punto silla", "Máximo", "Mínimo", "No se puede saber"],
        correcta: 0,
        explicacion: "Las elipses rodean máximos o mínimos; las hipérbolas indican silla."
      },
      fuente: [{ id: "C8.2", loc: "slide 18" }]
    },

    {
      id: "m23-c08",
      titulo: "¿Reducir el modelo? F parcial, AIC y jerarquía",
      cubre: ["M23.9"],
      simple: String.raw`<p>En superficie de respuesta es habitual dejar el modelo completo. Si se quiere uno más simple, no se sacan términos mirando valores p sueltos: se comparan <strong>modelos anidados</strong> con una prueba $F$ parcial (o con AIC), respetando la jerarquía.</p>`,
      formal: String.raw`<p><code>anova(modelo_red, modelo)</code>: $H_0$: los términos que se sacaron valen 0. $F=\dfrac{(SCE_{red}-SCE_{comp})/q}{SCE_{comp}/gl_{comp}}$. AIC: menor es mejor; $\Delta AIC<2$ equivalentes, 2–7 evidencia moderada, $>10$ fuerte.</p>`,
      ejemplo: String.raw`<p>Ejemplo 2 (tres factores a tres niveles, 75 corridas; C8.2 s30–32): $x_1x_2$ y $x_2x_3$ no son significativas. Sacarlas: $F=0{,}50$, $p=0{,}61$ ⇒ no empeora; AIC 483,9 (reducido) contra 486,7 ⇒ se prefiere el reducido. Se conserva $x_1x_3$ y por jerarquía $x_1$ y $x_3$.</p>`,
      r: { nota: "C8.2 s32.", codigo: `modelo_red <- lm(y ~ x1 + x2 + x3 + I(x1^2) + I(x2^2) + I(x3^2) + x1:x3, data = datos)
anova(modelo_red, modelo)
AIC(modelo_red, modelo)` },
      memoriza: String.raw`<p>Reducir con $F$ parcial o AIC (no con p sueltos) · jerarquía: interacción significativa ⇒ se quedan sus factores.</p>`,
      comprueba: {
        enunciado: "anova(reducido, completo) da p = 0,61. ¿Qué se concluye?",
        opciones: ["Los términos eliminados no mejoran el ajuste: se puede usar el reducido", "El reducido es significativamente peor", "Hay que agregar más términos", "El modelo completo no es significativo"],
        correcta: 0,
        explicacion: "H₀: los coeficientes extra valen 0; p alto ⇒ no se rechaza (C8.2 s32)."
      },
      fuente: [{ id: "C8.2", loc: "slides 30–32" }, { id: "S8.2" }]
    },

    {
      id: "m23-c09",
      titulo: "Cuando el óptimo no es el punto estacionario: la frontera",
      cubre: ["M23.10"],
      simple: String.raw`<p>El punto estacionario no siempre sirve. Si queremos <strong>maximizar</strong> y resulta un <strong>mínimo</strong> o una <strong>silla</strong>, o si cae <strong>fuera de la región</strong> estudiada, el mejor punto que podemos recomendar está en el <strong>borde</strong> de la región: se evalúa $\hat y$ en las esquinas y caras y se elige la mejor. Nunca se extrapola fuera de lo medido.</p>`,
      formal: String.raw`<p>Regla: (1) calcular $\mathbf x_s$ y los $\lambda$; (2) si es del tipo buscado y está dentro ⇒ es el óptimo; (3) si no ⇒ buscar en la frontera (en el libro: «análisis de cordillera»); (4) si el óptimo parece estar más allá de la región ⇒ nuevo experimento en esa dirección; (5) siempre <strong>confirmar con corridas reales</strong>.</p>
<p>Diseños con factores a dos niveles (como la Entrega 3: $2\times2\times3$): $x_1^2$ y $x_2^2$ no se pueden estimar ($x^2=1$ siempre), así que en esos factores el óptimo es una esquina; solo el factor de tres niveles puede tener óptimo interior.</p>`,
      ejemplo: String.raw`<p>Ejemplo 2 (C8.2 s33–34), maximizar la resistencia: <code>canonical()</code> da $\mathbf x_s=(-0{,}115;\ -0{,}080;\ -1{,}108)$ y $\lambda=17{,}5;\ 15{,}3;\ 3{,}9$ (todos positivos ⇒ <strong>mínimo</strong>), y además $x_3^*=-1{,}11$ cae fuera (tiempo ≈ 28 min &lt; 30). Evaluando las 8 esquinas con el modelo reducido, la mejor es $(-1,+1,+1)$: 150 °C, 20 bar, 60 min con $\hat y\approx64{,}5$.</p>`,
      memoriza: String.raw`<p>Tipo equivocado o fuera de la región ⇒ óptimo en la frontera (esquinas/caras) · confirmar con corridas.</p>`,
      comprueba: {
        enunciado: "Se quiere maximizar y el punto estacionario es un mínimo dentro de la región. ¿Dónde se busca el mejor punto?",
        opciones: ["En la frontera de la región experimental", "En el punto estacionario", "Fuera de la región, extrapolando", "En el centro del diseño"],
        correcta: 0,
        explicacion: "Con un mínimo interior, el máximo de una superficie cuadrática en la región está en el borde (C8.2 s33)."
      },
      fuente: [{ id: "C8.2", loc: "slides 33–36" }]
    },

    {
      id: "m23-c10",
      titulo: "Receta para la pregunta de superficie de respuesta (Instructivo P4)",
      cubre: ["M23.12"],
      simple: String.raw`<p>El instructivo pide dos cosas: <strong>leer una salida de R</strong> del modelo de segundo orden y <strong>encontrar a mano</strong> el punto estacionario y clasificarlo. Los datos vendrán de los ejercicios 22–29 del cap. 12 del libro guía (están resueltos en Desarrollo, con video).</p>`,
      formal: String.raw`<ol><li><strong>Identificar</strong> el diseño, la codificación y los tipos de términos.</li><li><strong>Leer la salida:</strong> qué términos son significativos (curvatura e interacción), $F$ global, $R^2$ y $R^2_{aj}$, falta de ajuste. Siempre: estadístico o valor-p + decisión + conclusión en el contexto.</li><li><strong>Derivar</strong> respecto de cada $x_i$ e <strong>igualar a 0</strong>.</li><li><strong>Resolver</strong> el sistema (2×2 por sustitución o con $-\tfrac12B^{-1}\mathbf b$).</li><li><strong>Clasificar</strong> con la hessiana $H=2B$ ($\det$ y $h_{11}$ si $k=2$) o con los valores propios.</li><li><strong>Unidades reales</strong>, $\hat y$ en el punto, ¿dentro de la región? ¿del tipo buscado? Si no, frontera.</li></ol>`,
      memoriza: String.raw`<p>Términos → significancia → derivar → resolver → hessiana → unidades reales → ¿dentro y del tipo buscado?</p>`,
      comprueba: {
        enunciado: "Con k = 2, la hessiana tiene det H = −12. ¿Qué tipo de punto estacionario es?",
        opciones: ["Punto silla", "Máximo", "Mínimo", "Depende de h₁₁"],
        correcta: 0,
        explicacion: "det H < 0 ⇒ H indefinida ⇒ silla, sin importar h₁₁."
      },
      fuente: [{ id: "INST-P4" }, { id: "LG", loc: "cap. 12, ej. 22–29" }]
    }
  ],

  cuando: String.raw`<table class="tabla"><thead><tr><th>Situación</th><th>Qué hacer</th></tr></thead><tbody>
<tr><td>Factores a 2 niveles ($2^k$)</td><td>Regresión codificada con interacciones; no hay curvatura estimable; óptimo en una esquina.</td></tr>
<tr><td>Se sospecha curvatura</td><td>Agregar niveles: central compuesto (esquinas + axiales + centro) o Box-Behnken (aristas + centro).</td></tr>
<tr><td>Estacionario del tipo buscado y dentro</td><td>Es el óptimo: pasar a unidades reales y confirmar.</td></tr>
<tr><td>Silla, tipo equivocado o fuera</td><td>Buscar en la frontera; no extrapolar; confirmar con corridas.</td></tr></tbody></table>`
});
