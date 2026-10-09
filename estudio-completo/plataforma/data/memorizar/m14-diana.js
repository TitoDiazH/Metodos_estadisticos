/* Memorizar · M14 DIANA (P2) */
PLATAFORMA.registrar("memorizar", [
  { id: "m14-mem-01", modulo: "m14-diana", categoria: "decision", titulo: "Algoritmo DIANA",
    contenido: "Top-down. 1) Todo en un clúster. 2) Escindir al de mayor disparidad promedio. 3) Mover i a C₁ si dif = d(i, C₂∖i) − d(i, C₁) &gt; 0. 4) Repetir hasta que no haya cambios. 5) Dividir el clúster más heterogéneo hasta n clústeres.",
    fuente: [{ id: "C5.2", loc: "slides 20–21" }] },
  { id: "m14-mem-02", modulo: "m14-diana", categoria: "salida", titulo: "Ejemplo de 5 empresas",
    contenido: "Disparidades: E8 2,29 (máx). E7 se mueve (dif +2,11): {E7,E8} | {E1,E2,E5}. Luego sale E5: {E5} y {E1,E2}.",
    fuente: [{ id: "C5.2", loc: "slides 23–26" }] },
  { id: "m14-mem-03", modulo: "m14-diana", categoria: "funcion-R", titulo: "<code>cluster::diana(datos, metric = \"euclidean\")</code>",
    contenido: "Acepta datos o matriz de distancias (<code>diss = TRUE</code>). <code>cutree(…, k)</code> asigna clústeres; <code>plot()</code> dibuja el dendrograma.",
    fuente: [{ id: "C5.2", loc: "slide 28" }, { id: "S5.2", loc: "líneas 55–61" }] },
  { id: "m14-mem-04", modulo: "m14-diana", categoria: "decision", titulo: "Pasos prácticos de clustering",
    contenido: "Preparar/estandarizar → elegir distancia → algoritmo (Ward jerárquico; K-medias en datos grandes) → k con codo + silueta → interpretar y validar → documentar perfiles.",
    fuente: [{ id: "C5.2", loc: "slide 29" }] }
]);
