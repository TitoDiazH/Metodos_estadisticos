/* Desarrollo · M26 Regresión lineal (P3) */
PLATAFORMA.registrar("desarrollo", [
  {
    id: "m26-d001", modulo: "m26-regresion-lineal", concepto: "m26-c05", dificultad: 2, origen: "nueva",
    titulo: "Leer una regresión múltiple completa (óxido nitroso)",
    enunciado: String.raw`<p>Con los datos de emisiones de 20 camiones se ajustó <code>lm(Oxido_Nitroso ~ Humedad + Temperatura + Presion)</code>. Resultados: Humedad $b=-0{,}002625$ (ee $0{,}000655$); Temperatura $b=0{,}000799$ ($p=0{,}701$); Presión $b=0{,}154$ ($p=0{,}148$); $R^2=0{,}8005$; $F=21{,}4$ con 3 y 16 gl ($p=7{,}6\cdot10^{-6}$); Shapiro de residuos $p=0{,}195$; VIF $2{,}40;\ 1{,}07;\ 2{,}33$; máximo $h_{ii}=0{,}354$; máxima Cook $0{,}71$.</p>
<ol type="a"><li>¿Sirve el modelo en su conjunto? Calcula el $R^2$ ajustado.</li><li>Prueba si la humedad influye e interpreta su coeficiente.</li><li>Evalúa supuestos, puntos influyentes y multicolinealidad.</li><li>¿Qué modelo propondrías y con qué criterio?</li></ol>`,
    partes: [
      { titulo: "a) F global y R² ajustado", puntos: 1.5,
        solucion: String.raw`<p>$H_0:\beta_1=\beta_2=\beta_3=0$; $F=21{,}4$, $p=7{,}6\cdot10^{-6}$ ⇒ se rechaza: al menos una variable explica la emisión. $R^2_{aj}=1-(1-0{,}8005)\tfrac{19}{16}=0{,}763$.</p>` },
      { titulo: "b) Humedad", puntos: 1.5,
        solucion: String.raw`<p>$t=-0{,}002625/0{,}000655=-4{,}01$ con 16 gl, $p=0{,}001$ ⇒ se rechaza $H_0:\beta_{Hum}=0$. Con temperatura y presión fijas, cada punto más de humedad reduce la emisión esperada en 0,0026 ppm.</p>` },
      { titulo: "c) Supuestos, influyentes y VIF", puntos: 1.5,
        solucion: String.raw`<p>Shapiro $p=0{,}195$ ⇒ no se rechaza la normalidad. $h_{ii}$ máx. $0{,}354<2(4)/20=0{,}40$ y Cook máx. $0{,}71<1$ ⇒ ningún punto domina. VIF $<5$ ⇒ sin multicolinealidad seria (aunque Hum y Pres tienen $r=-0{,}76$). Faltaría mirar los gráficos de <code>plot(modelo)</code>.</p>` },
      { titulo: "d) Selección", puntos: 1.5,
        solucion: String.raw`<p>Con <code>step(modelo1, direction = "both")</code> (AIC) se elimina Temperatura (AIC $-111{,}64\to-113{,}45$) y se detiene: $\hat y=-3{,}44-0{,}00258\,Hum+0{,}154\,Pres$, con $R^2_{aj}=0{,}775$ (sube con una variable menos). Presión se queda aunque $p=0{,}14$: el AIC es menos exigente que la prueba t al 5 %.</p>` }
    ],
    escala: "Reparto de 6 puntos entre las partes (la fuente no trae puntajes).",
    verifica: [
      { que: "R2aj", js: "1-(1-0.8005)*19/16", esperado: 0.763, tol: 0.0005 },
      { que: "t", js: "-0.002625/0.000655", esperado: -4.008, tol: 0.001 }
    ],
    fuente: [{ id: "C8.1", loc: "slides 19–39" }]
  }
]);
