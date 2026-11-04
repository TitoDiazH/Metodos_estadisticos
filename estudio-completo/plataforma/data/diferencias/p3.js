/* Diferencias entre fuentes · P3 (clases 7.3, 7.4 y 8.1). Verificadas con R 4.6.1. */
PLATAFORMA.registrar("diferencia", [
  {
    id: "dif-c74-presion-signo", tipo: "error", modulos: ["m21-factorial-2k"],
    tema: "2³ resistencia: ¿el efecto de la presión (B) es positivo?",
    fuentes: [
      { id: "C7.4", loc: "slide 12", dice: "«B (presión): ±2.688 → Efecto positivo pero menor»." },
      { id: "C7.4", loc: "slide 13", dice: "La gráfica de efectos principales muestra el nivel −1 de B arriba (≈ 68) y el +1 abajo (≈ 63)." }
    ],
    verificacion: "Con los datos de s9, la media con B alto es 62,75 y con B bajo 68,125; <code>model.tables(modelo, type = \"effects\")</code> da <code>B: -1 → 2.6875; 1 → -2.6875</code>. La presión alta <strong>reduce</strong> la resistencia (efecto ȳ₊ − ȳ₋ = −5,375).",
    convencion: "En la app se dice que B es significativo y reduce la resistencia. Lo que sí es correcto en s12: es un efecto menor que el de A."
  },
  {
    id: "dif-c74-efecto-modeltables", tipo: "notacion", modulos: ["m21-factorial-2k"],
    tema: "«Efecto» en un 2^k: contraste/(n·2^(k−1)) vs lo que imprime <code>model.tables</code>",
    fuentes: [
      { id: "C7.4", loc: "slide 7", dice: "Efecto X = Contraste X / (n · 2^(k−1)) (= ȳ₊ − ȳ₋)." },
      { id: "C7.4", loc: "slide 12", dice: "Llama «efectos» a los valores de <code>model.tables(modelo, type = \"effects\")</code>: A ±11,313, A×C ±5,062…" }
    ],
    verificacion: "<code>model.tables</code> entrega la desviación de la media de cada nivel respecto de la media general. En un 2^k eso es la mitad del efecto de s7: A = 76,75 − 54,125 = 22,625 = 2 × 11,3125.",
    convencion: "En cálculos a mano (pruebas) se usa la definición de s7. Al leer <code>model.tables</code> se multiplica por 2 para obtener ȳ₊ − ȳ₋. Ambas ordenan los efectos igual."
  }
]);
