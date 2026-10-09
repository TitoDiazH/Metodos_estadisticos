/* ============================================================================
   Laboratorio R · Correlación (M01, P1)
   Regla: la "salida" es REAL. ejecutable:true → tools/verificar_numeros.js corre
   "codigo" con Rscript y compara con "salida". origenSalida: "ejecutada" | "curso".
   ========================================================================== */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m01-cov", modulo: "m01-covarianza-correlacion", tema: "Correlación y covarianza",
    titulo: "Matriz de covarianza y de correlación con datos simulados",
    descripcion: "El código de la clase simula altura y peso con una relación positiva y calcula <code>cov(datos)</code>. Se agregó <code>cor(datos)</code> para comparar.",
    funciones: ["set.seed", "rnorm", "data.frame", "cov", "cor"],
    codigo: `set.seed(123)
n <- 30
altura <- rnorm(n, mean = 170, sd = 10)
peso <- 0.5 * altura - 15 + rnorm(n, mean = 0, sd = 5)

datos <- data.frame(Altura_cm = altura, Peso_kg = peso)
covarianza <- cov(datos)
covarianza
cor(datos)`,
    salida: `          Altura_cm  Peso_kg
Altura_cm  96.24212 41.67119
Peso_kg    41.67119 35.04662
          Altura_cm   Peso_kg
Altura_cm 1.0000000 0.7175137
Peso_kg   0.7175137 1.0000000`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul>
<li><strong>Primera matriz (<code>cov</code>):</strong> la diagonal son las varianzas ($96{,}24$ cm² y $35{,}05$ kg²); fuera de la diagonal, la covarianza ($41{,}67$ cm·kg). Es simétrica.</li>
<li>El signo positivo de $41{,}67$ dice que altura y peso se mueven en el mismo sentido; su magnitud depende de las unidades.</li>
<li><strong>Segunda matriz (<code>cor</code>):</strong> unos en la diagonal y $r=0{,}72$ fuera. Se comprueba la fórmula: $41{,}67/\sqrt{96{,}24\times35{,}05}=0{,}72$.</li>
</ul>`,
    fuente: [{ id: "C1", loc: "slides 12–13" }]
  },
  {
    id: "r-m01-cor-test", modulo: "m01-covarianza-correlacion", tema: "Correlación y covarianza",
    titulo: "cor.test(): ¿es significativa la correlación?",
    descripcion: "Ejemplo de la clase con 6 pares altura–peso. Devuelve el coeficiente de correlación, su intervalo de confianza y el p-valor para H0: ρ = 0.",
    funciones: ["c", "cor.test"],
    codigo: `x <- c(161, 170, 180, 175, 165, 187)
y <- c(50, 65, 78, 82, 60, 76)

cor.test(x, y, method = "pearson")`,
    salida: `	Pearson's product-moment correlation

data:  x and y
t = 3.1087, df = 4, p-value = 0.03592
alternative hypothesis: true correlation is not equal to 0
95 percent confidence interval:
 0.0926901 0.9821910
sample estimates:
      cor 
0.8409891 `,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ol>
<li><code>t = 3.1087, df = 4</code>: estadístico $t=r\sqrt{(n-2)/(1-r^2)}$ con $n-2=4$ grados de libertad.</li>
<li><code>p-value = 0.03592</code>: como es menor que $\alpha=0{,}05$, se rechaza $H_0:\rho=0$.</li>
<li><code>alternative hypothesis: true correlation is not equal to 0</code>: prueba bilateral.</li>
<li><code>95 percent confidence interval</code>: de $0{,}093$ a $0{,}982$. No contiene el 0; es ancho porque solo hay 6 datos.</li>
<li><code>cor 0.8409891</code>: el coeficiente muestral $r$.</li>
</ol>
<p><strong>Conclusión tipo pauta:</strong> con un nivel de significancia del 5 %, existe evidencia estadística suficiente para afirmar que hay correlación lineal entre altura y peso.</p>`,
    fuente: [{ id: "C1", loc: "slide 19" }]
  }
]);
