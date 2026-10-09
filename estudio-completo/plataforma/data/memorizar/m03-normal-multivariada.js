/* Memorizar · M03 Distribución normal multivariada (P1) */
PLATAFORMA.registrar("memorizar", [
  {
    id: "m03-mem-01", modulo: "m03-normal-multivariada", categoria: "formula",
    titulo: "Normal multivariada",
    contenido: String.raw`$X\sim N_p(\mu,\Sigma)$ · $\mu$ = centro · $\Sigma$ = forma e inclinación · contornos elípticos en 2D.`,
    fuente: [{ id: "C1", loc: "slides 32–34" }]
  },
  {
    id: "m03-mem-02", modulo: "m03-normal-multivariada", categoria: "umbral",
    titulo: "Independencia y correlación",
    contenido: String.raw`Independientes $\Rightarrow\rho=0$. $\rho=0\Rightarrow$ independientes <strong>solo si hay normal conjunta</strong>.`,
    fuente: [{ id: "C1", loc: "slide 36" }, { id: "PR-P1-Q1", loc: "afirmaciones 2–3" }]
  },
  {
    id: "m03-mem-03", modulo: "m03-normal-multivariada", categoria: "formula",
    titulo: "Suma de dos variables",
    contenido: String.raw`$E(X_1+X_2)=\mu_1+\mu_2$ · $\operatorname{Var}(X_1+X_2)=\sigma_1^2+\sigma_2^2+2\sigma_{12}$.`,
    fuente: [{ id: "C1", loc: "slide 38" }]
  },
  {
    id: "m03-mem-04", modulo: "m03-normal-multivariada", categoria: "funcion-R",
    titulo: "<code>mvtnorm::dmvnorm</code> · <code>pnorm</code>",
    contenido: "<code>dmvnorm(x, mean, sigma)</code> da la densidad normal multivariada. Para una suma o combinación lineal se calcula media y varianza y se usa <code>pnorm(q, mean, sd)</code>.",
    fuente: [{ id: "C1", loc: "slides 37 y 39" }]
  }
]);
