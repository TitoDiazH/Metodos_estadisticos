/* ============================================================================
   M26 · Regresión lineal simple, múltiple y polinomial (P3)
   Fuentes abiertas para redactar: C8.1 slides 1–40 (renderizadas: casi todas las
   fórmulas están en imagen). Salidas recalculadas en R 4.6.1 (car 3.x).
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m26-regresion-lineal",
  orden: 23,
  titulo: "Regresión lineal simple, múltiple y polinomial",
  descripcion: "Explicar una respuesta cuantitativa con uno o varios regresores: estimar, interpretar, probar, verificar supuestos y elegir el modelo. Es la base de la superficie de respuesta.",
  pruebas: ["P3"],
  prioridad: "alta",
  fuentes: [{ id: "C8.1", loc: "slides 1–40" }],

  conceptos: [
    {
      id: "m26-c01",
      titulo: "Modelo de regresión lineal simple: error y residuo",
      cubre: ["M26.1"],
      simple: String.raw`<p>Suponemos que $Y$ sigue, en promedio, una recta en $x$, más un ruido aleatorio. La recta verdadera no se conoce: solo podemos estimarla con los datos.</p>`,
      formal: String.raw`$$Y=\beta_0+\beta_1x+\varepsilon,\qquad E(\varepsilon)=0,\ \operatorname{Var}(\varepsilon)=\sigma^2$$
<p>$\beta_0+\beta_1x$ es la <strong>esperanza condicional de $Y$ dado $x$</strong>; $\beta_0$ (intercepto) y $\beta_1$ (pendiente) son parámetros desconocidos; $\sigma^2$ es la varianza del error o varianza residual.</p>
<p>Recta estimada: $\hat y=b_0+b_1x$. <strong>Residuo:</strong> $e_i=y_i-\hat y_i$, de modo que $y_i=b_0+b_1x_i+e_i$. Los errores $\varepsilon_i$ (respecto de la recta verdadera) <strong>no se observan</strong>; los residuos $e_i$ (respecto de la recta estimada) sí.</p>`,
      memoriza: String.raw`<p>Error $\varepsilon_i$: recta verdadera, no observable. Residuo $e_i=y_i-\hat y_i$: recta estimada, observable.</p>`,
      comprueba: {
        enunciado: "¿Cuál es la diferencia entre el error εᵢ y el residuo eᵢ?",
        opciones: ["εᵢ se mide respecto de la recta verdadera y no se observa; eᵢ = yᵢ − ŷᵢ se mide respecto de la recta estimada y sí se observa", "Son lo mismo", "eᵢ no se puede calcular", "εᵢ = yᵢ − ŷᵢ"],
        correcta: 0,
        explicacion: "C8.1 s7–8."
      },
      fuente: [{ id: "C8.1", loc: "slides 2–8" }]
    },

    {
      id: "m26-c02",
      titulo: "Mínimos cuadrados: fórmulas de b₀ y b₁",
      cubre: ["M26.2"],
      simple: String.raw`<p>La mejor recta es la que hace <strong>lo más pequeña posible la suma de los residuos al cuadrado</strong>.</p>`,
      formal: String.raw`$$\min_{b_0,b_1}\sum(b_0+b_1x_i-y_i)^2$$
$$b_1=\frac{n\sum x_iy_i-\sum x_i\sum y_i}{n\sum x_i^2-\left(\sum x_i\right)^2}=\frac{\sum(x_i-\bar x)(y_i-\bar y)}{\sum(x_i-\bar x)^2},\qquad b_0=\frac{\sum y_i-b_1\sum x_i}{n}=\bar y-b_1\bar x$$`,
      ejemplo: String.raw`<p>Ejemplo 11.1 (reducción de sólidos $x$ y de demanda de oxígeno $y$, $n=33$): $\sum x=1104$, $\sum y=1124$, $\sum xy=41\,355$, $\sum x^2=41\,086$.</p>
<p>$b_1=\dfrac{33(41\,355)-1104(1124)}{33(41\,086)-1104^2}=0{,}903643$; $b_0=\dfrac{1124-0{,}903643(1104)}{33}=3{,}829633$ ⇒ $\hat y=3{,}8296+0{,}9036x$.</p>`,
      memoriza: String.raw`<p>$b_1=S_{xy}/S_{xx}$ · $b_0=\bar y-b_1\bar x$.</p>`,
      comprueba: {
        enunciado: "¿Qué minimiza el método de mínimos cuadrados?",
        opciones: ["La suma de los residuos al cuadrado", "La suma de los residuos", "El R²", "La pendiente"],
        correcta: 0,
        explicacion: "C8.1 s9."
      },
      verifica: [
        { que: "b1 ej 11.1", js: "(33*41355-1104*1124)/(33*41086-1104*1104)", esperado: 0.903643, tol: 1e-6 },
        { que: "b0 ej 11.1", js: "(1124-((33*41355-1104*1124)/(33*41086-1104*1104))*1104)/33", esperado: 3.829633, tol: 1e-6 }
      ],
      fuente: [{ id: "C8.1", loc: "slides 9–11" }]
    },

    {
      id: "m26-c03",
      titulo: "Coeficiente de determinación R²",
      cubre: ["M26.3"],
      simple: String.raw`<p>$R^2$ es la <strong>fracción de la variación de $Y$ que explica el modelo</strong>. Va de 0 a 1.</p>`,
      formal: String.raw`<p>$SEC=\sum(\hat y_i-\bar y)^2$ (explicada), $SRC=\sum e_i^2$ (residual), $STC=\sum(y_i-\bar y)^2$ (total), con $STC=SEC+SRC$.</p>
$$R^2=\frac{SEC}{STC}=1-\frac{SRC}{STC}$$
<p><strong>Qué es y qué no es</strong> (C8.1 s13): está entre 0 y 1; con una sola $x$, $R^2=r^2$; un $R^2$ bajo no significa que la regresión sea «mala»; no se compara entre muestras distintas ni entre modelos con distinta variable dependiente; tiene sentido solo si $\operatorname{Var}(Y|X)=\sigma^2$ es constante.</p>
<p>Relación con $\operatorname{Var}(Y)=\operatorname{Var}[E(Y|X)]+E[\operatorname{Var}(Y|X)]$: si $\operatorname{Var}(Y|X)=0$ los puntos caen sobre la recta ($R^2=1$); si $E(Y|X)$ es constante, $R^2\approx0$.</p>`,
      errores: ["Comparar el $R^2$ de un modelo para $y$ con el de un modelo para $\\log y$."],
      memoriza: String.raw`<p>$R^2=1-SRC/STC$ · con una $x$, $R^2=r^2$.</p>`,
      comprueba: {
        enunciado: "Una regresión simple tiene r = −0,9. ¿Cuánto vale R²?",
        opciones: ["0,81", "−0,81", "0,9", "−0,9"],
        correcta: 0,
        explicacion: "Con una sola variable independiente R² = r² = 0,81."
      },
      fuente: [{ id: "C8.1", loc: "slides 12–14" }]
    },

    {
      id: "m26-c04",
      titulo: "Regresión múltiple: forma matricial, supuestos e inferencia",
      cubre: ["M26.4"],
      simple: String.raw`<p>Con varios regresores se ajusta un plano (o hiperplano). La estimación es la misma idea de mínimos cuadrados, escrita con matrices.</p>`,
      formal: String.raw`$$y_i=\beta_0+\beta_1x_{1i}+\dots+\beta_kx_{ki}+\varepsilon_i\quad\Longleftrightarrow\quad \mathbf Y=\mathbf X\beta+\varepsilon,\qquad \hat\beta=(\mathbf X^{t}\mathbf X)^{-1}\mathbf X^{t}\mathbf Y$$
<p><strong>Supuestos</strong> (s16): $E(y|X)=X\beta$; $E(\varepsilon|X)=0$; las columnas de $X$ son linealmente independientes (rango completo); $\operatorname{Var}(\varepsilon|X)=\sigma^2I$. Si además $\varepsilon\sim N(0,\sigma^2)$ (o la muestra es grande), los $b_j$ son normales conjuntamente con varianza $\sigma^2(X^TX)^{-1}$.</p>
<p><strong>Inferencia:</strong> $s^2=\dfrac{SCE}{n-k-1}$ estima $\sigma^2$; al reemplazar $\sigma^2$ por $s^2$ se obtiene el <strong>error estándar</strong> $ee(b_i)$ y</p>
$$t=\frac{b_i-\beta_i}{ee(b_i)}\quad(\text{con }H_0:\beta_i=0,\ t=b_i/ee(b_i))$$`,
      memoriza: String.raw`<p>$\hat\beta=(X'X)^{-1}X'y$ · $s^2=SCE/(n-k-1)$ · $t=b_i/ee(b_i)$ con $n-k-1$ gl.</p>`,
      comprueba: {
        enunciado: "Con n = 20 observaciones y k = 3 regresores, ¿con cuántos gl se estima σ²?",
        opciones: ["16", "17", "19", "3"],
        correcta: 0,
        explicacion: "n − k − 1 = 20 − 3 − 1 = 16 (coincide con «on 16 degrees of freedom» del ejemplo)."
      },
      fuente: [{ id: "C8.1", loc: "slides 15–18" }]
    },

    {
      id: "m26-c05",
      titulo: "Ejemplo óxido nitroso: lm, summary e interpretación de coeficientes",
      cubre: ["M26.5"],
      simple: String.raw`<p>Cada pendiente $b_j$ se lee como el cambio esperado en $y$ cuando $x_j$ sube una unidad <strong>manteniendo fijos los demás regresores</strong>.</p>`,
      formal: String.raw`<p>$\beta_0$: valor esperado de $y$ cuando todos los $x$ valen 0; muchas veces no tiene interpretación práctica (fuera del rango). $\beta_j=\partial E(y)/\partial x_j$: el signo da la dirección; la magnitud depende de las unidades de $x_j$. Casa: si $b_2=-15$ (antigüedad), entre dos casas <em>del mismo tamaño</em> cada año adicional reduce el precio esperado en 15 UF.</p>`,
      ejemplo: String.raw`<p>20 camiones diésel: óxido nitroso (ppm) según humedad, temperatura y presión. $\hat y=-3{,}508-0{,}00263\,Hum+0{,}00080\,Temp+0{,}154\,Pres$.</p>
<ul><li>Humedad: por cada punto más, la emisión baja en promedio 0,0026 ppm con temperatura y presión fijas. $t=-0{,}002625/0{,}000655=-4{,}01$, $p=0{,}001$ ⇒ significativa.</li>
<li>Temperatura ($p=0{,}701$) y presión ($p=0{,}148$): no significativas al 5 %.</li>
<li>Intercepto: fuera del rango de los datos, no se interpreta.</li></ul>`,
      r: {
        nota: "C8.1 s20 (los datos son la tabla de s19; se escribe Presion sin tilde).",
        codigo: `modelo1 <- lm(Oxido_Nitroso ~ Humedad + Temperatura + Presion, data = ejemplo1)
summary(modelo1)`,
        rlab: "r-m26-oxido"
      },
      lectura: String.raw`<ul><li><code>Estimate</code>: $b_j$. <code>Std. Error</code>: $ee(b_j)$. <code>t value</code> $=b_j/ee(b_j)$. <code>Pr(&gt;|t|)</code>: p de $H_0:\beta_j=0$.</li><li><code>Residual standard error: 0.05617 on 16</code>: $s$ con $n-k-1=16$ gl.</li></ul>`,
      errores: ["Interpretar $b_j$ sin «manteniendo constantes los demás $x$».", "Interpretar el intercepto cuando $x=0$ está fuera del rango de los datos."],
      memoriza: String.raw`<p>$b_j$: cambio esperado en $y$ por unidad de $x_j$, <em>ceteris paribus</em>. $t=b_j/ee(b_j)$.</p>`,
      comprueba: {
        enunciado: "En el ejemplo, b(Humedad) = −0,002625 y ee = 0,000655. ¿Cuánto vale t?",
        opciones: ["−4,01", "−0,25", "4,01", "−0,0017"],
        correcta: 0,
        explicacion: "t = −0,002625/0,000655 ≈ −4,01."
      },
      verifica: [
        { que: "t humedad", js: "-0.002625/0.000655", esperado: -4.008, tol: 0.001 }
      ],
      fuente: [{ id: "C8.1", loc: "slides 19–22" }]
    },

    {
      id: "m26-c06",
      titulo: "Prueba F global, R² y R² ajustado",
      cubre: ["M26.6"],
      simple: String.raw`<p>La <strong>F global</strong> pregunta si el modelo sirve en su conjunto. El <strong>$R^2$ ajustado</strong> castiga por cada variable: sirve para comparar modelos con distinto número de regresores.</p>`,
      formal: String.raw`<p>$H_0:\beta_1=\dots=\beta_k=0$ contra $H_1$: al menos un $\beta_j\ne0$. Si la F no es significativa, no tiene sentido mirar los coeficientes uno a uno.</p>
$$R^2_{aj}=1-(1-R^2)\frac{n-1}{n-k-1}$$
<p>$R^2$ siempre sube al agregar variables; el ajustado puede bajar.</p>`,
      ejemplo: String.raw`<p>Óxido nitroso: $F=21{,}4$ con 3 y 16 gl, $p=7{,}6\cdot10^{-6}$ ⇒ al menos una variable explica la emisión. $R^2=0{,}8005$ (80 % de la variación); $R^2_{aj}=1-0{,}1995\cdot\tfrac{19}{16}=0{,}763$.</p>`,
      memoriza: String.raw`<p>F global: $H_0$ todos los $\beta_j=0$ (salvo $\beta_0$). $R^2_{aj}=1-(1-R^2)\frac{n-1}{n-k-1}$.</p>`,
      comprueba: {
        enunciado: "¿Para qué sirve el R² ajustado?",
        opciones: ["Para comparar modelos con distinto número de variables", "Para probar H0: βj = 0", "Para medir la normalidad", "Siempre es mayor que R²"],
        correcta: 0,
        explicacion: "C8.1 s23."
      },
      verifica: [
        { que: "R2 aj", js: "1-(1-0.8005)*19/16", esperado: 0.763, tol: 0.0005 }
      ],
      fuente: [{ id: "C8.1", loc: "slide 23" }]
    },

    {
      id: "m26-c07",
      titulo: "Regresión polinomial: x² como un regresor más",
      cubre: ["M26.7"],
      simple: String.raw`<p>La regresión es lineal <strong>en los parámetros</strong>, no necesariamente en las variables: $x$ y $x^2$ son dos regresores distintos y se estima igual que una regresión múltiple. Así se ajustan curvas.</p>`,
      formal: String.raw`$$y=\beta_0+\beta_1x+\beta_2x^2+\varepsilon$$
<p>Se usa cuando el gráfico de $y$ vs $x$, o el de residuos, muestra <strong>curvatura</strong>. En R: <code>lm(y ~ x + I(x^2))</code> (sin <code>I()</code>, R interpreta el <code>^</code> de otra forma).</p>
<p>Ojo: $b_1$ ya no es «la pendiente». La pendiente cambia con $x$:</p>
$$\frac{\partial y}{\partial x}=b_1+2b_2x$$
<p>Si $b_2>0$ la curva es convexa (el efecto de $x$ crece); si $b_2<0$, cóncava (tiene un máximo). No conviene subir mucho el grado ni <strong>extrapolar</strong> fuera del rango observado.</p>`,
      ejemplo: String.raw`<p>Datos simulados con $E(y)=10+2x+0{,}5x^2$, $x=1,\dots,9$ y <code>set.seed(32)</code>: $b_0=10{,}20$, $b_1=1{,}98$, $b_2=0{,}504$ ($p<0{,}001$ ⇒ hay curvatura). $R^2$ pasa de $0{,}973$ (recta) a $0{,}999$. Pendiente: $1{,}975+2(0{,}504)x$ = 2,98 en $x=1$ … 11,05 en $x=9$.</p>`,
      r: {
        nota: "Código de C8.1 s25–26.",
        codigo: `set.seed(32)
x <- 1:9
Ey <- 10 + 2*x + 0.5*x^2
e <- rnorm(9, mean = 0, sd = 1)
y <- Ey + e
poli <- lm(y ~ x + I(x^2))
summary(poli)
b <- coef(poli)
b["x"] + 2*b["I(x^2)"]*x`,
        rlab: "r-m26-polinomial"
      },
      errores: ["Escribir <code>lm(y ~ x + x^2)</code>: sin <code>I()</code> no se agrega el término cuadrático.", "Leer $b_1$ como la pendiente en un modelo con $x^2$."],
      memoriza: String.raw`<p><code>I(x^2)</code> · pendiente $b_1+2b_2x$ · punto donde la pendiente es 0: $x^*=-b_1/(2b_2)$.</p>`,
      comprueba: {
        enunciado: "En ŷ = 10,2 + 1,98x + 0,504x², ¿cuál es la pendiente en x = 5?",
        opciones: ["≈ 7,02", "1,98", "0,504", "≈ 12,6"],
        correcta: 0,
        explicacion: "1,975 + 2(0,504)(5) ≈ 7,02 (la salida de R da 7,019)."
      },
      verifica: [
        { que: "pendiente x=5", js: "1.97546+2*0.50438*5", esperado: 7.019, tol: 0.001 }
      ],
      fuente: [{ id: "C8.1", loc: "slides 24–26" }]
    },

    {
      id: "m26-c08",
      titulo: "Diagnóstico de residuos: los 4 supuestos y plot(modelo)",
      cubre: ["M26.8"],
      figura: { tipo: "residuos",
        pie: "Patrones de residuos: lo que se busca es una nube sin forma; una U indica que falta un término (p. ej. x²) y un embudo, varianza no constante." },
      simple: String.raw`<p>Los supuestos son sobre los errores, que no vemos; por eso se revisan con los <strong>residuos</strong>. <code>plot(modelo)</code> entrega los cuatro gráficos de diagnóstico de una vez.</p>`,
      formal: String.raw`<table class="tabla"><tr><th>Supuesto</th><th>Gráfico</th><th>Si se cumple</th><th>Si no</th></tr>
<tr><td>Linealidad $E(\varepsilon)=0$</td><td>Residuos vs ajustados</td><td>Nube sin forma, centrada en 0</td><td>Curvatura ⇒ agregar $x^2$</td></tr>
<tr><td>Varianza constante</td><td>Residuos vs ajustados / Escala-ubicación</td><td>Ancho parejo</td><td>Embudo ⇒ transformar $y$ (p. ej. $\log y$)</td></tr>
<tr><td>Normalidad</td><td>Q-Q normal de los residuos</td><td>Puntos sobre la diagonal</td><td>Curva o colas separadas</td></tr>
<tr><td>Independencia</td><td>Residuos vs orden de los datos</td><td>Sin rachas ni tendencias</td><td>Patrón en el tiempo</td></tr></table>
<p>Prueba formal de normalidad: <code>shapiro.test(residuals(modelo))</code>, $H_0$: los residuos son normales. Con muestras grandes la normalidad pesa menos.</p>`,
      ejemplo: String.raw`<p>Óxido nitroso (<code>par(mfrow = c(2, 2)); plot(modelo1)</code>): residuos vs ajustados sin patrón claro; Q-Q cerca de la diagonal (obs. 5, 9 y 4 algo abajo); Shapiro-Wilk $p=0{,}195$ ⇒ no se rechaza la normalidad; escala-ubicación casi plana; ningún punto cruza la distancia de Cook $=1$. Conclusión: se puede confiar en las pruebas t y F.</p>`,
      r: {
        nota: "C8.1 s30–31.",
        codigo: `par(mfrow = c(2, 2)); plot(modelo1)
shapiro.test(residuals(modelo1))`,
        rlab: "r-m26-oxido"
      },
      memoriza: String.raw`<p>4 gráficos: residuos vs ajustados · Q-Q · escala-ubicación · residuos vs apalancamiento. Shapiro: $H_0$ normalidad.</p>`,
      comprueba: {
        enunciado: "El gráfico de residuos vs ajustados tiene forma de embudo. ¿Qué supuesto falla y qué se sugiere?",
        opciones: ["Varianza constante; transformar y (p. ej. log y)", "Normalidad; agregar x²", "Independencia; cambiar el orden", "Linealidad; quitar el intercepto"],
        correcta: 0,
        explicacion: "C8.1 s29."
      },
      fuente: [{ id: "C8.1", loc: "slides 28–31" }]
    },

    {
      id: "m26-c09",
      titulo: "Puntos influyentes: apalancamiento y distancia de Cook",
      cubre: ["M26.9"],
      simple: String.raw`<p>Un punto es <strong>influyente</strong> si al sacarlo la recta cambia mucho. Se mide con el apalancamiento (qué tan raro es su $x$) y la distancia de Cook (apalancamiento + tamaño del residuo).</p>`,
      formal: String.raw`<p>$\hat y=Hy$ con $H=X(X^TX)^{-1}X^T$; el apalancamiento $h_{ii}$ es la diagonal de $H$. Promedio $(k+1)/n$; alto si $h_{ii}>2(k+1)/n$. Distancia de Cook $D_i>1$ ⇒ muy influyente. Un punto influyente <strong>no se elimina automáticamente</strong>: primero se revisa si es un error de registro o un caso real.</p>`,
      ejemplo: String.raw`<p>Óxido nitroso: <code>hatvalues</code> máximo $0{,}354$ (obs. 19) $<2\cdot4/20=0{,}40$; <code>cooks.distance</code> máximo $0{,}71$ (obs. 5) $<1$. Ningún punto domina el ajuste.</p>`,
      memoriza: String.raw`<p>$h_{ii}>2(k+1)/n$ · $D_i>1$.</p>`,
      comprueba: {
        enunciado: "Con n = 20 y k = 3, ¿desde qué valor de hᵢᵢ se considera alto el apalancamiento?",
        opciones: ["0,40", "0,20", "1", "0,15"],
        correcta: 0,
        explicacion: "2(k + 1)/n = 8/20 = 0,40."
      },
      fuente: [{ id: "C8.1", loc: "slide 32" }]
    },

    {
      id: "m26-c10",
      titulo: "Multicolinealidad y VIF",
      cubre: ["M26.10"],
      simple: String.raw`<p>Si dos regresores están muy correlacionados, el modelo no logra separar el efecto de cada uno: los errores estándar se inflan y los coeficientes se vuelven inestables, aunque el $R^2$ siga alto.</p>`,
      formal: String.raw`$$VIF_j=\frac{1}{1-R_j^2}$$
<p>$R_j^2$: de la regresión de $x_j$ contra los demás $x$. Sin relación, $VIF\approx1$. $VIF>5$ a $10$ ⇒ preocupante. Qué hacer: sacar una variable redundante, combinarlas en un índice (p. ej. con componentes principales) o conseguir más datos.</p>`,
      ejemplo: String.raw`<p>Simulado (C8.1 s33): $y=5+2x_1+2x_2+\varepsilon$ con $r(x_1,x_2)=0{,}997$: solo con $x_1$, $b_1=4{,}18$ (ee 0,13); con ambas, $b_1=1{,}56$ (ee 1,61, $p=0{,}342$) y $b_2=2{,}65$ ($p=0{,}114$); VIF $=160$. Óxido nitroso: humedad y presión con $r=-0{,}755$, pero VIF $=2{,}40;\ 1{,}07;\ 2{,}33$ ($<5$): sin problema serio.</p>`,
      r: {
        nota: "C8.1 s34.",
        codigo: `round(cor(ejemplo1[, 2:4]), 3)
library(car)
vif(modelo1)`,
        rlab: "r-m26-oxido"
      },
      memoriza: String.raw`<p>$VIF=1/(1-R_j^2)$ · $>5$–$10$ preocupante · <code>car::vif(modelo)</code>.</p>`,
      comprueba: {
        enunciado: "Si Rⱼ² = 0,9, ¿cuánto vale el VIF?",
        opciones: ["10", "0,1", "1,11", "9"],
        correcta: 0,
        explicacion: "1/(1 − 0,9) = 10."
      },
      fuente: [{ id: "C8.1", loc: "slides 33–34" }]
    },

    {
      id: "m26-c11",
      titulo: "Variables indicadoras (regresores categóricos)",
      cubre: ["M26.11"],
      simple: String.raw`<p>Un regresor cualitativo con $\ell$ categorías se representa con $\ell-1$ variables 0/1. La categoría que queda fuera es la <strong>referencia</strong>.</p>`,
      formal: String.raw`<p>¿Por qué no $\ell$ indicadoras? Porque sumarían siempre 1: serían colineales con el intercepto (multicolinealidad perfecta). En R, <code>factor()</code> crea las indicadoras sola.</p>
$$mpg=\beta_0+\beta_1\,wt+\beta_2z_6+\beta_3z_8+\varepsilon$$`,
      ejemplo: String.raw`<p><code>lm(mpg ~ wt + factor(cyl), data = mtcars)</code>: $b_0=33{,}99$, $wt=-3{,}21$, $z_6=-4{,}26$, $z_8=-6{,}07$; $R^2=0{,}8374$. Misma pendiente para todos (−3,21 mpg por 1000 lb); a igual peso, 6 cilindros rinde 4,26 mpg menos y 8 cilindros 6,07 menos que 4 cilindros. Tres rectas paralelas con interceptos 33,99; 29,74; 27,92.</p>`,
      r: {
        nota: "C8.1 s36.",
        codigo: `modelo2 <- lm(mpg ~ wt + factor(cyl), data = mtcars)
summary(modelo2)`,
        rlab: "r-m26-indicadoras"
      },
      memoriza: String.raw`<p>$\ell$ categorías ⇒ $\ell-1$ indicadoras · cada coeficiente se compara contra la referencia.</p>`,
      comprueba: {
        enunciado: "Un factor «turno» tiene 3 categorías. ¿Cuántas indicadoras entran al modelo con intercepto?",
        opciones: ["2", "3", "1", "4"],
        correcta: 0,
        explicacion: "ℓ − 1 = 2."
      },
      verifica: [
        { que: "intercepto 6 cil", js: "33.9908-4.2556", esperado: 29.7352, tol: 1e-6 }
      ],
      fuente: [{ id: "C8.1", loc: "slides 35–36" }]
    },

    {
      id: "m26-c12",
      titulo: "Selección de modelos: AIC, Cp, PRESS y step",
      cubre: ["M26.12"],
      simple: String.raw`<p>Buscamos un modelo simple que explique bien. Agregar variables siempre sube el $R^2$, pero no siempre mejora el modelo; los criterios castigan por cada parámetro.</p>`,
      formal: String.raw`<table class="tabla"><tr><th>Criterio</th><th>Idea</th><th>Mejor</th></tr>
<tr><td>$R^2$ ajustado</td><td>$R^2$ penalizado</td><td>el mayor</td></tr>
<tr><td>AIC</td><td>$n\ln(SCE/n)+2p$</td><td>el menor</td></tr>
<tr><td>Cp de Mallows</td><td>error del submodelo vs modelo completo</td><td>$Cp\approx p$</td></tr>
<tr><td>PRESS</td><td>error de predicción dejando fuera cada dato</td><td>el menor</td></tr></table>
<p>Métodos secuenciales: hacia adelante (<em>forward</em>), hacia atrás (<em>backward</em>) y paso a paso (<em>both</em>). En R: <code>step(modelo, direction = "both")</code> compara con AIC. Pueden llegar a modelos distintos: el resultado es un candidato, no una verdad.</p>`,
      ejemplo: String.raw`<p>Óxido nitroso: <code>step(modelo1, direction = "both")</code> parte con AIC $=-111{,}64$; sacar temperatura lo baja a $-113{,}45$; luego ningún cambio lo mejora (<code>&lt;none&gt;</code> queda primero). Modelo final $\hat y=-3{,}44-0{,}00258\,Hum+0{,}154\,Pres$; $R^2_{aj}$ sube de 0,763 a 0,775. Presión se queda aunque su $p=0{,}14$: el AIC es menos exigente que la prueba t al 5 %.</p>`,
      r: {
        nota: "C8.1 s39.",
        codigo: `step(modelo1, direction = "both")`,
        rlab: "r-m26-oxido"
      },
      lectura: String.raw`<p>En cada paso la tabla se ordena por AIC: la primera fila es el cambio que más lo baja. <code>- Temperatura</code> = sacarla; <code>+ Temperatura</code> = volver a ponerla; si <code>&lt;none&gt;</code> está primero, se detiene.</p>`,
      memoriza: String.raw`<p>AIC: menor es mejor · <code>step(…, direction = "both")</code> · el AIC puede retener variables con $p>0{,}05$.</p>`,
      comprueba: {
        enunciado: "En la salida de step, la fila «<none>» aparece primera. ¿Qué significa?",
        opciones: ["Ningún cambio baja el AIC: el procedimiento se detiene", "Hay que sacar todas las variables", "El modelo no tiene variables", "El AIC es positivo"],
        correcta: 0,
        explicacion: "C8.1 s39, paso 2."
      },
      fuente: [{ id: "C8.1", loc: "slides 37–39" }]
    },

    {
      id: "m26-c13",
      titulo: "Flujo de trabajo de una regresión en R",
      cubre: ["M26.13"],
      simple: String.raw`<p>Siempre en este orden: ajustar e interpretar → verificar supuestos → puntos influyentes → multicolinealidad → seleccionar variables.</p>`,
      formal: String.raw`<ol><li><code>modelo &lt;- lm(y ~ x1 + factor(g), data = d); summary(modelo)</code>: F global, pruebas t, $R^2$ ajustado.</li>
<li><code>par(mfrow = c(2, 2)); plot(modelo)</code>: residuos sin patrón, Q-Q sobre la diagonal.</li>
<li><code>hatvalues(modelo); cooks.distance(modelo)</code>: $h_{ii}>2(k+1)/n$ o $D_i>1$.</li>
<li><code>library(car); vif(modelo)</code>: VIF $>5$ a $10$.</li>
<li><code>step(modelo, direction = "both")</code>: menor AIC, mayor $R^2$ ajustado.</li></ol>`,
      memoriza: String.raw`<p>lm/summary → plot → hatvalues/cooks.distance → vif → step.</p>`,
      comprueba: {
        enunciado: "¿Qué función entrega los cuatro gráficos de diagnóstico de un modelo lm?",
        opciones: ["plot(modelo)", "summary(modelo)", "vif(modelo)", "step(modelo)"],
        correcta: 0,
        explicacion: "C8.1 s28 y s40."
      },
      fuente: [{ id: "C8.1", loc: "slide 40" }]
    }
  ]
});
