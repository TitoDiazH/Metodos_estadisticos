/* Memorizar · M07 Errores tipo I/II y potencia (P1) */
PLATAFORMA.registrar("memorizar", [
  { id: "m07-mem-01", modulo: "m07-errores-potencia", categoria: "formula", titulo: "Errores y potencia",
    contenido: String.raw`Tipo I (rechazar $H_0$ verdadera): $\alpha$. Tipo II (no rechazar $H_0$ falsa): $\beta$. Potencia $=1-\beta$. Si $\alpha\downarrow$ entonces $\beta\uparrow$.`,
    fuente: [{ id: "C2", loc: "slide 35" }] },
  { id: "m07-mem-02", modulo: "m07-errores-potencia", categoria: "umbral", titulo: "De qué depende β",
    contenido: "Baja con: más n · mayor α · mayor diferencia real · menor σ. Requiere un valor verdadero concreto del parámetro.",
    fuente: [{ id: "C2", loc: "slide 37" }] },
  { id: "m07-mem-03", modulo: "m07-errores-potencia", categoria: "decision", titulo: "No rechazar H0",
    contenido: "No significa que H0 sea verdadera: puede haber error tipo II. El tamaño de muestra no cambia la probabilidad de error tipo I (es α).",
    fuente: [{ id: "PR-P1-Q1", loc: "afirmaciones 4 y 6" }] },
  { id: "m07-mem-04", modulo: "m07-errores-potencia", categoria: "formula", titulo: "Límites de no rechazo (media, σ conocida)",
    contenido: String.raw`$\mu_0\pm z_{1-\alpha/2}\,\sigma/\sqrt n$ · $\beta=\Phi\!\left(\tfrac{L_{sup}-\mu_1}{\sigma/\sqrt n}\right)-\Phi\!\left(\tfrac{L_{inf}-\mu_1}{\sigma/\sqrt n}\right)$.`,
    fuente: [{ id: "AY2-P", loc: "P2 (b)(c)" }] },
  { id: "m07-mem-05", modulo: "m07-errores-potencia", categoria: "formula", titulo: "Límites de no rechazo (varianza)",
    contenido: String.raw`$S^2\in\left[\dfrac{\sigma_0^2\chi^2_{\alpha/2}}{n-1},\ \dfrac{\sigma_0^2\chi^2_{1-\alpha/2}}{n-1}\right]$ · con $\sigma_1^2$ verdadera se multiplican los límites del $\chi^2$ por $\sigma_0^2/\sigma_1^2$.`,
    fuente: [{ id: "AY2-P", loc: "P3 (b)(c)" }] },
  { id: "m07-mem-06", modulo: "m07-errores-potencia", categoria: "funcion-R", titulo: "<code>qnorm</code> · <code>pnorm</code> · <code>qchisq</code> · <code>pchisq</code>",
    contenido: "<code>q…</code> entrega el límite (cuantil); <code>p…</code> la probabilidad acumulada. β = <code>pnorm(L_sup, mu1, se) - pnorm(L_inf, mu1, se)</code>.",
    fuente: [{ id: "AY2-P", loc: "P2 y P3" }] }
]);
