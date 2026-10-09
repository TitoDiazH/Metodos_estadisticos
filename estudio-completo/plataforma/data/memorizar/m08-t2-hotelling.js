/* Memorizar · M08 T² de Hotelling (P1, por confirmar) */
PLATAFORMA.registrar("memorizar", [
  { id: "m08-mem-01", modulo: "m08-t2-hotelling", categoria: "formula", titulo: "T² de Hotelling",
    contenido: String.raw`$T^2=n(\bar x-\mu_0)'S^{-1}(\bar x-\mu_0)$ · $\dfrac{n-p}{(n-1)p}T^2\sim F(p,\,n-p)$ · rechazar si $T^2>\dfrac{(n-1)p}{n-p}F_\alpha(p,n-p)$ · con $p=1$: $T^2=t^2$.`,
    fuente: [{ id: "C2", loc: "slides 43–44" }] },
  { id: "m08-mem-02", modulo: "m08-t2-hotelling", categoria: "umbral", titulo: "Supuesto y verificación",
    contenido: "Normalidad multivariada; se revisa con el test de Mardia: <code>MVN::mvn(X, mvnTest = \"mardia\")</code> o <code>psych::mardia(X)</code>.",
    fuente: [{ id: "C2", loc: "slide 42" }] },
  { id: "m08-mem-03", modulo: "m08-t2-hotelling", categoria: "decision", titulo: "Región de confianza y test",
    contenido: "Elipse centrada en x̄. μ0 dentro de la región ⇔ no se rechaza H0. Si se rechaza, los IC simultáneos que no contienen μ0 indican la variable (o combinación) responsable.",
    fuente: [{ id: "C2", loc: "slides 45–46" }] },
  { id: "m08-mem-04", modulo: "m08-t2-hotelling", categoria: "formula", titulo: "IC simultáneos y Bonferroni",
    contenido: String.raw`T²: $\bar x_k\pm\sqrt{\tfrac{p(n-1)}{n-p}F_\alpha(p,n-p)}\sqrt{s_{kk}/n}$ · Bonferroni: $\bar x_k\pm t_{n-1;\alpha/2p}\sqrt{s_{kk}/n}$ (más angosto si solo interesan las $p$ medias).`,
    fuente: [{ id: "C2", loc: "slides 46–47" }] },
  { id: "m08-mem-05", modulo: "m08-t2-hotelling", categoria: "funcion-R", titulo: "<code>ICSNP::HotellingsT2(X, mu = mu0)</code>",
    contenido: "Entrega T², F, gl y p-valor. <code>car::ellipse</code> dibuja la región (p = 2). Críticos: <code>qf</code> (T²) y <code>qt(1 - alpha/(2*p), n-1)</code> (Bonferroni).",
    fuente: [{ id: "C2", loc: "slide 48" }] }
]);
