/* ============================================================================
   M14 · DIANA (desagregativo) (P2)
   Fuentes abiertas para redactar: C5.2 slides 19–29 · S5.2 líneas 49–72 · AY5-E P3.
   Los números se recalculan en tools/verificar_numeros.js (matriz de distancias de la slide 22).
   ========================================================================== */
PLATAFORMA.registrar("modulo", {
  id: "m14-diana",
  orden: 14,
  titulo: "DIANA (desagregativo)",
  descripcion: "Clustering jerárquico de arriba hacia abajo: partir de un solo grupo y dividirlo, sacando primero a quien más se aleja del resto.",
  pruebas: ["P2"],
  prioridad: "alta",
  fuentes: [{ id: "C5.2", loc: "slides 19–29" }, { id: "S5.2", loc: "líneas 49–72" }, { id: "AY5-E", loc: "P3" }],

  conceptos: [
    {
      id: "m14-c01",
      titulo: "Algoritmo DIANA: disparidad, escisión y reasignación",
      figura: { tipo: "agrupacion", donde: "ejemplo", ejes: ["inversión (estandarizada)", "ventas (estandarizadas)"], puntos: { E1: [-0.79, -1.29], E2: [-1.02, -0.68], E5: [0.85, -1.29], E7: [0.85, 0.99], E8: [1.13, 1.29] },
        pasos: [
          { grupos: [["E1", "E2", "E5", "E7", "E8"]], texto: "<strong>Inicio:</strong> todas las empresas en un solo clúster." },
          { grupos: [["E1", "E2", "E5", "E7"], ["E8"]], mueve: "E8", texto: "<strong>Escisión:</strong> E8 tiene la mayor disparidad promedio (2,29) y sale a formar un clúster nuevo." },
          { grupos: [["E1", "E2", "E5"], ["E7", "E8"]], mueve: "E7", texto: "<strong>Reasignación:</strong> E7 está más cerca de E8 que de su grupo (dif = +2,11 &gt; 0) y se cambia. Para E1, E2 y E5 la diferencia es negativa: se quedan." },
          { grupos: [["E1", "E2"], ["E7", "E8"], ["E5"]], mueve: "E5", texto: "<strong>Segunda división:</strong> se divide el clúster más heterogéneo, {E1, E2, E5} (disparidad 1,42 contra 0,42). Sale E5, la de mayor disparidad (1,80), y nadie la sigue." }
        ],
        pie: "DIANA con las 5 empresas de la clase: de un solo clúster hacia abajo, al revés que los métodos aglomerativos." },
      cubre: ["M14.1"],
      simple: String.raw`<p>DIANA (<em>Divisive Analysis</em>) empieza con todos los datos en un solo clúster y los va dividiendo. En cada paso divide el clúster <strong>más heterogéneo</strong>: saca a la observación más «diferente» del resto y luego deja que se le unan las que quedan más cerca de ella que de su grupo original.</p>`,
      formal: String.raw`<p>Entrada: matriz de distancias $D$ ($n\times n$) (C5.2 s21).</p>
<ol start="0">
  <li>$C_0=\{1,\dots,n\}$ (un solo clúster).</li>
  <li><strong>Escisión:</strong> $C_1=\{$el elemento con mayor <em>disparidad promedio</em> (distancia promedio a los demás)$\}$; $C_2=C\setminus C_1$.</li>
  <li><strong>Reasignación:</strong> para cada $i\in C_2$ calcular $\text{dif}=d(i,\,C_2\setminus\{i\})-d(i,\,C_1)$ (promedios de distancias). Si $\text{dif}>0$, $i$ pasa a $C_1$.</li>
  <li>Repetir 2 hasta que no se mueva nadie.</li>
  <li>Repetir desde 1 sobre el clúster más heterogéneo hasta que todos los clústeres tengan un elemento.</li>
</ol>
<p>El dendrograma es equivalente al aglomerativo, pero se lee de arriba (raíz) hacia abajo. En R: <code>cluster::diana(datos_norm, metric = "euclidean")</code>, <code>cutree()</code>.</p>`,
      ejemplo: String.raw`<p>Las 5 empresas de la clase (matriz de distancias de C5.2 s22).</p>
<ol>
  <li><strong>Disparidades</strong> (promedio de distancias a los otros 4): E1 $2{,}08$; E2 $2{,}01$; E5 $2{,}12$; E7 $2{,}00$; E8 $2{,}29$ ← máxima. Parten $C_1=\{E_8\}$ y $C_2=\{E_1,E_2,E_5,E_7\}$.</li>
  <li><strong>Reasignación, ronda 1:</strong> dif $=-1{,}52$ (E1), $-1{,}21$ (E2), $-0{,}64$ (E5), $+2{,}11$ (E7) ⇒ <strong>E7 se mueve</strong>: $C_1=\{E_7,E_8\}$, $C_2=\{E_1,E_2,E_5\}$.</li>
  <li><strong>Ronda 2:</strong> dif $=-1{,}87;\ -1{,}40;\ -0{,}64$, todas negativas ⇒ división estable.</li>
  <li><strong>Segunda división:</strong> la disparidad de $\{E_7,E_8\}$ es $0{,}42$ y la de $\{E_1,E_2,E_5\}$ es $1{,}42$ ⇒ se divide el segundo. E5 tiene la mayor ($1{,}80$) y sale: $\{E_5\}$ y $\{E_1,E_2\}$ (dif $-0{,}99$ y $-1{,}32$ ⇒ nadie se mueve).</li>
</ol>
<p>Con 3 clústeres: $\{E_7,E_8\}$, $\{E_1,E_2\}$ y $\{E_5\}$ (E5, de alta inversión y bajas ventas, queda aislada).</p>`,
      r: {
        nota: "Código de C5.2 slide 28 / S5.2 líneas 55–61. Se usa la matriz de distancias de la slide 22 para reproducir el ejemplo.",
        codigo: `library(cluster)
n <- c("E1", "E2", "E5", "E7", "E8")
D <- matrix(c(0, .65, 1.64, 2.81, 3.22,  .65, 0, 1.97, 2.51, 2.92,
              1.64, 1.97, 0, 2.28, 2.60, 2.81, 2.51, 2.28, 0, .42,
              3.22, 2.92, 2.60, .42, 0), 5, dimnames = list(n, n))
dd <- diana(as.dist(D), diss = TRUE)
cutree(as.hclust(dd), k = 3)`,
        rlab: "r-m14-diana"
      },
      errores: ["Dividir el clúster de mayor tamaño en vez del <strong>más heterogéneo</strong>.", "Olvidar la fase de reasignación (dif > 0 ⇒ mover)."],
      memoriza: String.raw`<p>DIANA: top-down. Escindir al de mayor disparidad promedio; mover $i$ si $d(i,C_2\setminus i)-d(i,C_1)>0$; dividir siempre el clúster más heterogéneo.</p>`,
      comprueba: {
        enunciado: "En DIANA, ¿qué elemento inicia el grupo escindido?",
        opciones: ["El de mayor distancia promedio a los demás", "El más cercano al centroide", "El primero de la lista", "El de menor disparidad"],
        correcta: 0,
        explicacion: "Se escinde el elemento con máxima disparidad promedio (C5.2 s21 y s23)."
      },
      verifica: [
        { que: "disparidad de E8", js: "(3.22+2.92+2.60+0.42)/4", esperado: 2.29, tol: 0.001 },
        { que: "dif de E7 (ronda 1)", js: "(2.81+2.51+2.28)/3 - 0.42", esperado: 2.1133, tol: 0.001 },
        { que: "disparidad de {E1,E2,E5}", js: "(0.65+1.64+1.97)/3", esperado: 1.42, tol: 0.001 }
      ],
      fuente: [{ id: "C5.2", loc: "slides 20–28" }, { id: "S5.2", loc: "líneas 49–72" }]
    },

    {
      id: "m14-c02",
      titulo: "Comparación de métodos y resumen del capítulo",
      cubre: ["M14.2"],
      simple: String.raw`<p>Con los mismos datos, distintos métodos pueden coincidir en lo esencial. Aquí, todos agrupan a {E7,E8}; con $k=2$ single, complete y K-medias dan $\{E_1,E_2,E_5\}$ vs $\{E_7,E_8\}$; con $k=3$ DIANA separa además a E5.</p>`,
      formal: String.raw`<table class="tabla"><thead><tr><th>Método</th><th>Cuándo conviene</th></tr></thead><tbody>
<tr><td>Jerárquicos</td><td>Datos pequeños/medianos; explorar distintos $k$ con el dendrograma; formas irregulares</td></tr>
<tr><td>K-medias</td><td>Datos grandes, se tiene idea de $k$, clústeres esféricos, eficiencia</td></tr>
<tr><td>DIANA</td><td>Enfoque top-down; detecta primero las separaciones grandes (aísla perfiles atípicos)</td></tr></tbody></table>
<p><strong>Pasos prácticos (C5.2 s29):</strong> preparar datos (limpiar, estandarizar) → elegir la distancia según el tipo de datos → aplicar el algoritmo (Ward para jerárquico, K-medias para datos grandes) → determinar $k$ (codo + silueta) → interpretar y validar → documentar el perfil de cada clúster.</p>`,
      errores: ["Esperar que todos los métodos den exactamente los mismos grupos: coinciden en lo muy marcado y difieren en lo ambiguo (p. ej. E5)."],
      memoriza: String.raw`<p>Resumen: Ward para jerárquico, K-medias para datos grandes; elegir $k$ con codo + silueta; DIANA parte del todo y es lo contrario de un aglomerativo.</p>`,
      comprueba: {
        enunciado: "En las 5 empresas con k = 3, ¿qué detecta DIANA que k = 2 no mostraba?",
        opciones: ["Que E5 es un perfil atípico separado de {E1,E2}", "Que E7 y E8 no se parecen", "Que hay un solo grupo", "Que E1 es un outlier"],
        correcta: 0,
        explicacion: "C5.2 s26: DIANA (k=3) separa además E5 de {E1,E2}."
      },
      fuente: [{ id: "C5.2", loc: "slides 26 y 29" }]
    }
  ],

  errores: [
    { texto: "En el dendrograma de DIANA las alturas son diámetros de los clústeres (en R: 0,65; 1,97; 3,22; 0,42), no distancias de fusión de un aglomerativo.", fuente: [{ id: "C5.2", loc: "slide 27" }] }
  ]
});
