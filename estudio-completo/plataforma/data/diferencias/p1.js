/* Diferencias entre fuentes · módulos de P1 (Fase 5). Todas verificadas en R 4.6.1. */
PLATAFORMA.registrar("diferencia", [
  {
    id: "dif-ay2-p5-prcomp", tipo: "error", modulos: ["m09-pca"],
    tema: "Ayudantía 2, P5: la salida de <code>prcomp</code> no corresponde a la tabla de datos",
    fuentes: [{ id: "AY2-E", loc: "P5", dice: "Tabla de 5 clientes y un <code>summary</code> con desviaciones 1,4617; 0,9909; 0,8623; 0,3714." }],
    verificacion: "Ejecutando <code>prcomp(clientes, scale. = TRUE)</code> con esos 5 clientes salen desviaciones 1,6139; 1,0706; 0,4830; 0,1262 y otros loadings. Los valores z de la pauta tampoco coinciden con esos datos.",
    convencion: "Lo evaluable es el método (autovalor = sd², tres criterios, estandarizar antes de calcular un score), no los números de ese ejercicio."
  },
  {
    id: "dif-c3-scores", tipo: "error", modulos: ["m09-pca"],
    tema: "C3 slide 18 y slide 21: redondeos",
    fuentes: [
      { id: "C3", loc: "slide 18", dice: "Scores (−0,95; 1,41), (−0,95; −1,41), (1,90; 0)." },
      { id: "C3", loc: "slide 21", dice: "«En mtcars, PC1 y PC2 juntos suelen explicar ~80 %»." }
    ],
    verificacion: "En R los scores son ±0,94, ±1,41 y 1,89, y el signo de PC2 depende del autovector. En mtcars PC1 + PC2 = 84,2 %.",
    convencion: "Se usan los valores calculados; los de la slide son aproximaciones."
  },
  {
    id: "dif-kmo-umbral", tipo: "criterio", modulos: ["m10-analisis-factorial"],
    tema: "KMO: umbral de adecuación",
    fuentes: [
      { id: "C4.1", loc: "slide 19", dice: "≥ 0,75 bien; ≥ 0,5 aceptable; &lt; 0,5 inaceptable." },
      { id: "C4.2", loc: "slide 15", dice: "«KMO global &gt; 0,6 → adecuado»." }
    ],
    convencion: "No se concilian. Con el KMO global de USArrests (0,65) ambos criterios dan «adecuado». Si el enunciado da el umbral, se usa ese."
  },
  {
    id: "dif-usarrests-urbanpop", tipo: "error", modulos: ["m10-analisis-factorial"],
    tema: "USArrests: MSA de UrbanPop y número de factores",
    fuentes: [{ id: "C4.2", loc: "slides 15–17", dice: "UrbanPop MSA = 0,49; se ajustan 2 factores con 4 variables." }],
    verificacion: "En R el MSA de UrbanPop es 0,502 (0,49 no se reproduce). Con p = 4, la regla k ≤ (p−1)/2 permite 1 factor; R avisa <code>df of the model are -1</code> al pedir 2.",
    convencion: "El ejemplo sirve para el procedimiento; no para tomarlo como ajuste válido."
  },
  {
    id: "dif-c2-pareadas-critico", tipo: "error", modulos: ["m06-hipotesis-dos-poblaciones"],
    tema: "Muestras pareadas (colesterol): valor crítico de una cola en una prueba bilateral",
    fuentes: [{ id: "C2", loc: "slide 31", dice: "H1: μd ≠ 0 y crítico t(0,05; 10) = 1,8125." }],
    verificacion: "1,8125 = qt(0,95; 10) (una cola). El crítico bilateral al 5 % es qt(0,975; 10) = 2,228. Con t = 9,06 la decisión es la misma.",
    convencion: "Bilateral al 5 % ⇒ comparar con ±2,228."
  },
  {
    id: "dif-c2-p-energia", tipo: "error", modulos: ["m05-hipotesis-una-poblacion"],
    tema: "Consumo de energía: 2,5 % vs. 2,188 %",
    fuentes: [{ id: "C2", loc: "slide 6", dice: "Valor p = 0,02188 y, en la misma slide, «P ≤ α → 2,5 % ≤ 5 %»." }],
    convencion: "El p-valor es 0,02188 (2,2 %); la decisión no cambia."
  },
  {
    id: "dif-ay2-beta-redondeo", tipo: "error", modulos: ["m07-errores-potencia"],
    tema: "Ayudantía 2, P2(c): 0,8012 vs. 0,7990",
    fuentes: [{ id: "AY2-P", loc: "P2 (c)", dice: "Probabilidad de no rechazar con μ = 1,005: 0,8012, usando límites redondeados a 4 decimales." }],
    verificacion: "Con los límites sin redondear (0,99123 y 1,00877) el resultado es 0,7990.",
    convencion: "Se acepta ≈ 0,80."
  },
  {
    id: "dif-pr-p2-q3-suma", tipo: "error", modulos: ["m10-analisis-factorial"],
    tema: "Pauta de la Prueba 2 (3.1): suma de autovalores",
    fuentes: [{ id: "PR-P2-Q3", loc: "pregunta 3.1", dice: "2,51349 + 1,73952 = 4,25201." }],
    verificacion: "La suma es 4,25301; el porcentaje sigue siendo ≈ 70,9 %.",
    convencion: "Sin efecto en la conclusión."
  },
  {
    id: "dif-c51-binarias", tipo: "error", modulos: ["m11-conglomerados-distancias"],
    tema: "C5.1 slide 11: conteos del ejemplo de Simple Matching",
    fuentes: [{ id: "C5.1", loc: "slide 11", dice: "Para E1 = (1,1,0,0) y E2 = (0,1,1,1): «a=1, b=1, c=1, d=1; d = (1+1)/(1+1+1+1) = 0,5»." }],
    verificacion: "Contando en R con esos mismos vectores: a=1, b=1, c=2, d=0 ⇒ Simple Matching = 3/4 = 0,75 (y Jaccard 0,75).",
    convencion: "La fórmula de la slide es correcta; el ejemplo numérico no. Se usan los conteos calculados."
  },
  {
    id: "dif-c61-cliente-error", tipo: "error", modulos: ["m15-lda"],
    tema: "C6.1 slide 19: ¿qué cliente es el error del LDA?",
    fuentes: [
      { id: "C6.1", loc: "slide 19", dice: "«Solo 1 error: cliente 7»." },
      { id: "C6.2", loc: "slide 17", dice: "«El cliente 13 (cumplidor con patrimonio 6,3 y deuda 5,2) queda clasificado como fallido»." }
    ],
    verificacion: "En R el único dato mal clasificado es el 13; el cliente 7 (D = −0,0784 > −0,251) es Fallido y acierta.",
    convencion: "Se usa el cliente 13."
  },
  {
    id: "dif-c61-accuracy-deuda", tipo: "error", modulos: ["m15-lda"],
    tema: "C6.1 slide 8: accuracy de la clasificación por deuda",
    fuentes: [{ id: "C6.1", loc: "slide 8", dice: "Tabla con 5 y 4 aciertos pero «Accuracy global = 10/16 = 56,3 %»." }],
    verificacion: "5 + 4 = 9 aciertos; 9/16 = 56,25 %. (10/16 sería 62,5 %.)",
    convencion: "56,3 % = 9/16."
  },
  {
    id: "dif-c62-boxm", tipo: "error", modulos: ["m16-qda-nb-validacion"],
    tema: "C6.2: p-valor de Box's M (0,8486 vs. 0,544)",
    fuentes: [
      { id: "C6.2", loc: "slide 4", dice: "Box's M: χ² = 0,8035, gl = 3, p = 0,8486." },
      { id: "C6.2", loc: "slide 5", dice: "«…las covarianzas son similares (Box's M p = 0.544)»." }
    ],
    verificacion: "Calculado en R: χ² = 0,8035, 3 gl, p = 0,8486.",
    convencion: "Se usa 0,8486; la conclusión (no rechazar ⇒ LDA) es la misma."
  },
  {
    id: "dif-c62-sd-nb", tipo: "error", modulos: ["m16-qda-nb-validacion"],
    tema: "C6.2 slide 10: desviación estándar usada en el ejemplo de Naive Bayes",
    fuentes: [{ id: "C6.2", loc: "slide 10", dice: "La tabla da σ = 2,07 para el patrimonio de los fallidos, pero el texto dice «μ = 5 y σ = 1,51»." }],
    verificacion: "sd(patrimonio, fallidos) = 2,071 (R); con ese valor dnorm(7, 5, 2,07) = 0,1208, el de la slide 11.",
    convencion: "Se usa σ = 2,07."
  }
]);
