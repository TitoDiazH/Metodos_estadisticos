/* GENERADO por tools/generar_audio.py desde tools/guiones/m26-wal-12-03.txt — no editar a mano. */
PLATAFORMA.registrar("audio", {
  "id": "audio-m26-wal-12-03",
  "modulo": "m26-regresion-lineal",
  "titulo": "Ejercicio 12.3: calificación en química",
  "archivo": "audio/m26-wal-12-03.mp3",
  "duracion": 205,
  "capitulos": [
    {
      "t": 0.0,
      "titulo": "Qué pide el ejercicio"
    },
    {
      "t": 23.1,
      "titulo": "El modelo ajustado"
    },
    {
      "t": 66.3,
      "titulo": "Pruebas te"
    },
    {
      "t": 96.2,
      "titulo": "Efe y erre cuadrado"
    },
    {
      "t": 121.6,
      "titulo": "Supuestos y problemas"
    },
    {
      "t": 151.0,
      "titulo": "Predicción"
    },
    {
      "t": 190.0,
      "titulo": "Cierre"
    }
  ],
  "ejercicio": "Walpole · Ej. 12.3",
  "pregunta": "m26-d008",
  "orden": 3.0,
  "marcas": {
    "inicio": 0.0,
    "enun": 4.63,
    "clave1": 6.37,
    "clave2": 8.55,
    "clave3": 15.47,
    "sal": 23.14,
    "ecuacion": 24.55,
    "interp": 35.85,
    "i1": 37.2,
    "i2": 44.58,
    "i3": 55.19,
    "pt": 66.32,
    "t1": 70.68,
    "t2": 78.89,
    "f": 96.24,
    "fcalc": 97.38,
    "rcuad": 106.08,
    "r2aj": 111.05,
    "sup": 121.57,
    "lin": 122.81,
    "sw": 124.85,
    "vif": 129.79,
    "vifv": 130.35,
    "hat": 134.79,
    "cook": 144.65,
    "pred": 151.04,
    "predcalc": 152.9,
    "predint": 161.87,
    "fin": 190.0
  },
  "frases": [
    [
      0.0,
      "Ejercicio 12 punto tres de Walpole: calificaciones de química."
    ],
    [
      4.63,
      "Hay 12 estudiantes."
    ],
    [
      6.37,
      "La respuesta es la nota de química."
    ],
    [
      8.55,
      "Los regresores son el puntaje en un examen de inteligencia, x₁, y el número de clases perdidas, x₂."
    ],
    [
      15.47,
      "Además se pide estimar la nota de alguien que sacó 60 en el examen y perdió cuatro clases."
    ],
    [
      23.14,
      "La salida de R."
    ],
    [
      24.55,
      "El modelo: ŷ = 27,55 + 0,92 por el examen, +0,28 por las clases perdidas."
    ],
    [
      33.39,
      "Igual que la respuesta del libro."
    ],
    [
      35.85,
      "Interpretación."
    ],
    [
      37.2,
      "Cada punto más en el examen sube la nota de química en 0,92 puntos en promedio, con las clases perdidas fijas."
    ],
    [
      44.58,
      "Y cada clase perdida sube la nota en 0,28."
    ],
    [
      47.97,
      "¿Te suena raro?"
    ],
    [
      49.18,
      "Debería: perder clases no debería mejorar la nota."
    ],
    [
      52.63,
      "Guárdalo, porque la prueba te lo explica."
    ],
    [
      55.19,
      "El intercepto sería la nota de alguien con cero en el examen y cero clases perdidas."
    ],
    [
      60.23,
      "Nadie sacó menos de 50 en el examen, así que no se interpreta."
    ],
    [
      66.32,
      "Hay nueve grados de libertad y el crítico es 2,262."
    ],
    [
      70.68,
      "Examen: t 4,96, p 0,0008."
    ],
    [
      75.0,
      "Se rechaza: la nota del examen explica la nota de química."
    ],
    [
      78.89,
      "Clases perdidas: t 0,38, p 0,72."
    ],
    [
      83.05,
      "No se rechaza."
    ],
    [
      84.75,
      "No hay evidencia de que las clases perdidas influyan, una vez considerado el examen."
    ],
    [
      89.74,
      "Por eso el signo raro no preocupa: ese coeficiente no se distingue de cero."
    ],
    [
      96.24,
      "F global."
    ],
    [
      97.38,
      "13,34, contra un crítico de 4,26, p 0,002."
    ],
    [
      103.3,
      "Se rechaza: el modelo sirve."
    ],
    [
      106.08,
      "R²: 0,75, explica el 75 %."
    ],
    [
      111.05,
      "El ajustado, 0,69."
    ],
    [
      113.47,
      "La diferencia se nota porque una de las dos variables no aporta: el ajustado castiga ese parámetro inútil."
    ],
    [
      121.57,
      "Supuestos."
    ],
    [
      122.81,
      "Los residuos no muestran forma."
    ],
    [
      124.85,
      "Shapiro Wilk da 0,47: no se rechaza la normalidad."
    ],
    [
      129.79,
      "VIF: 1,14 para ambas."
    ],
    [
      132.43,
      "Sin multicolinealidad."
    ],
    [
      134.79,
      "El corte de apalancamiento es 0,5; el estudiante 11 lo pasa con 0,58, porque combina el examen más bajo con muy pocas clases perdidas."
    ],
    [
      144.65,
      "Pero ninguna distancia de Cook pasa de uno: no hay datos influyentes."
    ],
    [
      151.04,
      "Ahora la predicción."
    ],
    [
      152.9,
      "Reemplazamos: 27,55 + 0,92 · 60 + 0,28 · 4."
    ],
    [
      160.28,
      "Da 84."
    ],
    [
      161.87,
      "Si queremos la nota promedio de todos los estudiantes con ese perfil, el intervalo de confianza va de 81 a 87."
    ],
    [
      170.02,
      "Si queremos la nota de un estudiante en particular, el intervalo de predicción es mucho más ancho: de 73 a 95, porque suma la variabilidad propia de una persona."
    ],
    [
      181.06,
      "Un examen de 64 clases perdidas están dentro del rango de los datos, así que la predicción es confiable."
    ],
    [
      190.0,
      "Lo importante de este ejercicio: un signo raro en un coeficiente no significativo no se interpreta, el R² ajustado castiga las variables que no aportan, y el intervalo de predicción siempre es más ancho que el de la media."
    ]
  ],
  "frasesHabladas": [
    "Ejercicio doce punto tres de Walpole: calificaciones de química.",
    "Hay doce estudiantes.",
    "La respuesta es la nota de química.",
    "Los regresores son el puntaje en un examen de inteligencia, equis uno, y el número de clases perdidas, equis dos.",
    "Además se pide estimar la nota de alguien que sacó sesenta en el examen y perdió cuatro clases.",
    "La salida de erre.",
    "El modelo: ye gorro igual a veintisiete coma cinco cinco, más cero coma nueve dos por el examen, más cero coma dos ocho por las clases perdidas.",
    "Igual que la respuesta del libro.",
    "Interpretación.",
    "Cada punto más en el examen sube la nota de química en cero coma nueve dos puntos en promedio, con las clases perdidas fijas.",
    "Y cada clase perdida sube la nota en cero coma dos ocho.",
    "¿Te suena raro?",
    "Debería: perder clases no debería mejorar la nota.",
    "Guárdalo, porque la prueba te lo explica.",
    "El intercepto sería la nota de alguien con cero en el examen y cero clases perdidas.",
    "Nadie sacó menos de cincuenta en el examen, así que no se interpreta.",
    "Hay nueve grados de libertad y el crítico es dos coma dos seis dos.",
    "Examen: te cuatro coma nueve seis, pe cero coma cero cero cero ocho.",
    "Se rechaza: la nota del examen explica la nota de química.",
    "Clases perdidas: te cero coma tres ocho, pe cero coma siete dos.",
    "No se rechaza.",
    "No hay evidencia de que las clases perdidas influyan, una vez considerado el examen.",
    "Por eso el signo raro no preocupa: ese coeficiente no se distingue de cero.",
    "Efe global.",
    "Trece coma tres cuatro, contra un crítico de cuatro coma dos seis, pe cero coma cero cero dos.",
    "Se rechaza: el modelo sirve.",
    "Erre cuadrado: cero coma siete cinco, explica el setenta y cinco por ciento.",
    "El ajustado, cero coma seis nueve.",
    "La diferencia se nota porque una de las dos variables no aporta: el ajustado castiga ese parámetro inútil.",
    "Supuestos.",
    "Los residuos no muestran forma.",
    "Shapiro Wilk da cero coma cuatro siete: no se rechaza la normalidad.",
    "Ve i efe: uno coma uno cuatro para ambas.",
    "Sin multicolinealidad.",
    "El corte de apalancamiento es cero coma cinco; el estudiante once lo pasa con cero coma cinco ocho, porque combina el examen más bajo con muy pocas clases perdidas.",
    "Pero ninguna distancia de Cook pasa de uno: no hay datos influyentes.",
    "Ahora la predicción.",
    "Reemplazamos: veintisiete coma cinco cinco, más cero coma nueve dos por sesenta, más cero coma dos ocho por cuatro.",
    "Da ochenta y cuatro.",
    "Si queremos la nota promedio de todos los estudiantes con ese perfil, el intervalo de confianza va de ochenta y uno a ochenta y siete.",
    "Si queremos la nota de un estudiante en particular, el intervalo de predicción es mucho más ancho: de setenta y tres a noventa y cinco, porque suma la variabilidad propia de una persona.",
    "Un examen de sesenta y cuatro clases perdidas están dentro del rango de los datos, así que la predicción es confiable.",
    "Lo importante de este ejercicio: un signo raro en un coeficiente no significativo no se interpreta, el erre cuadrado ajustado castiga las variables que no aportan, y el intervalo de predicción siempre es más ancho que el de la media."
  ],
  "huella": "cae237908e98"
});
