# CONTENIDOS — Mapa de contenidos de Métodos Estadísticos (P1 · P2 · P3)

> **Generado en la Fase 3 del `ROADMAP.md` (2026-10-08).** Todo lo que aparece aquí salió de abrir y leer los archivos de `clases/`, `ayudantias/`, `scripts/` y `pruebas-y-ejercicios/`. `../capitulo-1/` solo se listó (nombres de archivo) para contrastar el alcance de P1; no se modificó.
> Lo que **no se pudo determinar** está en §4 y §6; no se rellenó con suposiciones.

**Cómo se leyó:** PPT → texto de cada slide con `python-pptx` (texto, tablas y notas del orador; las **imágenes no se leen**, salvo las páginas/slides que se renderizaron para mirarlas: C7.1 págs. 29–30, 33, 38–40, 42, 45–49; C7.2 slides 6, 8, 13–21, 23; C5.1 slide 20). PDF → `pdftotext -layout`. R → lectura directa. Números clave de las pautas se **recalcularon con R 4.6.1** (marcados «verificado con R»).

**Leyenda de prioridad (peso en pruebas pasadas):** **Alta** = el concepto aparece en una pauta/enunciado de prueba o examen pasado (`PR-*`) o en los ejercicios oficiales de preparación (`EJ-*`); **Media** = aparece solo en ayudantías (`AY-*`); **Baja** = solo en clases/scripts, sin registro fuera de ellas. Es un criterio de lectura de los archivos, no una predicción.

## Índice
§1 Inventario con IDs · §2 Contenidos por módulo · §3 Convenciones y contradicciones · §4 Hallazgos y preguntas · §5 Formato de evaluación observado · §6 Alcance de P3

---

## §1 Inventario con IDs

**Esquema de IDs:** `C<nº>` clases · `CMAN` = `MANOVA.pdf` · `AY<n>-E` enunciado, `AY<n>-P` pauta, `AY<n>-PPT` presentación, `AY<n>-R` pauta en R · `S<nº clase>` scripts de clase · `PR-<prueba>-<pregunta>` pautas/enunciados de pruebas · `EJ-<prueba>` ejercicios de preparación. `loc` = slide (`s`), página (`p`), pregunta (`P`/`Q`) o líneas (`l.`).
**Tipo/estado:** *núcleo* = fuente principal de teoría o de evaluación; *complemento* = práctica/apoyo; *duplicado*; *parcial* = contiene partes en imagen no legibles como texto.
> Los nombres de archivo en disco usan acentos descompuestos (NFD); si se buscan con `grep`/`glob`, usar comodines.

### Clases (`clases/`)
| ID | Archivo | Tipo | Prueba | Tamaño | Estado |
|---|---|---|---|---|---|
| C1 | `1. Correlación.pptx` | clase | P1 | 50 slides | núcleo; varias slides con fórmulas/figuras como imagen (no legibles como texto) |
| C2 | `2. Pruebas de Hipótesis.pptx` | clase | P1 (s40–49 T² de Hotelling: P1 por reparto declarado, ver §4) | 49 slides + 7 notas del orador (en las slides 8, 11, 16, 20, 26, 36 y 53) | núcleo; fórmulas e imágenes de resultados parciales |
| C3 | `3. Análisis de Componentes Principales.pptx` | clase | P1 (ver §4: pregunta de PCA en el Examen) | 26 slides | núcleo |
| C4.1 | `4.1 Análisis Factorial (clase 1).pptx` | clase | P1 (ver §4) | 27 slides | núcleo |
| C4.2 | `4.2 Análisis Factorial (clase 2).pptx` | clase | P1 (ver §4) | 19 slides | núcleo |
| C5.1 | `5.1 Análisis de Conglomerados (clase 1)(1).pptx` | clase | P2 | 32 slides | núcleo; s20 es una figura (5 métodos de enlace) |
| C5.2 | `5.2 Análisis de Conglomerados (clase 2)(1).pptx` | clase | P2 | 29 slides | núcleo |
| C6.1 | `6.1 Clasificación Supervisada (clase 1)(1).pptx` | clase | P2 | 21 slides | núcleo |
| C6.2 | `6.2 Clasificación Supervisada (clase 2)(1).pptx` | clase | P2 | 22 slides | núcleo |
| C7.1 | `7.1 Diseño de Experimentos - Introducción y ANOVA (parte 1).pptx.pdf` | clase (PDF de un PPT) | P2 (por confirmar) / P3 | 54 págs. | núcleo; **parcial**: ~15 págs. son solo fórmulas/tablas en imagen (se miraron p29–30, 33, 38–40, 42, 45–49) |
| C7.2 | `7.2 ANOVA de un factor (parte 2) y MANOVA.pptx` | clase | P2 (ANOVA: por confirmar; MANOVA: P2) | 34 slides | núcleo; **parcial**: fórmulas LSD/Tukey en imagen (leídas al renderizar) |
| CMAN | `MANOVA.pdf` | complemento de C7.2 | P2 | 16 págs. | núcleo (ejemplo resuelto); págs. 14–16 («Anexo») casi sin texto |

### Ayudantías (`ayudantias/`)
| ID | Archivo | Tipo | Prueba | Tamaño | Estado |
|---|---|---|---|---|---|
| AY1-E | `Ayudantía 1 2026-20 Enunciado.pdf` (13-ago-2026) | enunciado | P1 | 4 págs. | complemento |
| AY1-R | `Ayudantia 1 2026-20 Pauta.R` | pauta R | P1 | 172 l. | complemento (única pauta de la ayudantía 1; no hay PDF de pauta) |
| AY2-E | `Ayudantía 2 2026-20 Enunciado.pdf` | enunciado | P1 | 2 págs. | complemento |
| AY2-PPT | `Ayudantía 2 2026-20 PPT.pdf` | presentación | P1 | 39 págs. | complemento (tests de hipótesis, T²/Mardia, PCA) |
| AY2-P | `Ayudantía 2 2026-20 Pauta.pdf` | pauta | P1 | 9 págs. | complemento |
| AY3-E | `Ayudantía 3 2026-20 Enunciado.pdf` (cabecera dice «Ayudantía 4», 27-ago-2026) | enunciado | P1 | 3 págs. | complemento; ver §3 (numeración) |
| AY3-P | `Ayudantía 3 2026-20 Pauta.pdf` | pauta | P1 | 7 págs. | complemento: solo pauta de P1 (V/F de PCA); problemas 2–5 remiten a `AY3-R` |
| AY3-R | `Ayudantia 3 2026-20 Pauta R(1).R` | pauta R | P1 | 288 l. | complemento; **duplicado exacto** de `scripts/Ayudantia 3 2026-20 Pauta R.R` (md5 idéntico) |
| AY4-E | `Ayudantía 4 2026-20 Enunciado.pdf` | enunciado | P1 | 3 págs. | complemento |
| AY4-PPT | `Ayudantía 4 2026-20 PPT.pdf` | presentación | P1 | 55 págs. | complemento (teoría de AF + 41 V/F con respuesta) |
| AY4-P | `Ayudantía 4 2026-20 Pauta.pdf` | pauta | P1 | 13 págs. | complemento |
| AY5-E | `Ayudantía 5 2026-20 Enunciado.pdf` (24-sep-2026) | enunciado | P2 | 3 págs. | complemento |
| AY5-P | `Ayudantía 5 2026-20 Pauta.pdf` | pauta | P2 | 22 págs. | complemento; gráficos/matrices de P4 son imagen |
| AY5-R | `Ayudantia 5 2026-20 Pauta R(1).R` | pauta R | P2 | 254 l. | complemento; **duplicado exacto** de `scripts/Ayudantia 5 2026-20 Pauta R.R` |
| AY6-E | `Ayudantía 6 2026-20 Enunciado.pdf` | enunciado | P2 | 4 págs. | complemento |
| AY6-P | `Ayudantía 6 2026-20 Pauta.pdf` | pauta | P2 | 15 págs. | complemento |

### Scripts R (`scripts/`)
| ID | Archivo | Prueba | Tamaño | Estado |
|---|---|---|---|---|
| S5.1 | `5.1 Análisis de Conglomerados (clase 1). Ejemplos R.R` | P2 | 116 l. | núcleo; **duplicado exacto** `…Ejemplos R(1).R` |
| S5.2 | `5.2 Análisis de Conglomerados (clase 2). Ejemplos R.R` | P2 | 73 l. | núcleo |
| S6.1 | `6.1 Clasificación Supervisada (clase 1). Ejemplos R.R` | P2 | 42 l. | núcleo |
| S6.2 | `6.2 Clasificación Supervisada (clase 2). Ejemplos R.R` | P2 | 79 l. | núcleo |
| S7.2 | `7.2 ANOVA de un factor (parte 2) y MANOVA. Ejemplos R.R` | P2 | 47 l. | núcleo |
| (dup.) | `Ayudantia 3 2026-20 Pauta R.R`, `Ayudantia 5 2026-20 Pauta R.R` | — | 288 / 254 l. | duplicados de AY3-R y AY5-R (se citan con esos IDs) |

> **No hay scripts de las clases 1, 2, 3, 4.1 ni 4.2 en `scripts/`.** Existen en `../capitulo-1/r-codes-for-study/` (no se leyeron ni se inventariaron: regla 5 del ROADMAP). Ver §4.

### Pruebas y ejercicios (`pruebas-y-ejercicios/`)
| ID | Archivo | Contenido | Prueba | Págs. | Estado |
|---|---|---|---|---|---|
| EJ-P1 | `Ejercicios preparación - Prueba 1.pdf` | 14 problemas (pruebas de hipótesis, correlación, matrices de covarianza) | P1 | 7 | núcleo |
| EJ-P1b | `Ejercicios preparación - Prueba 1 - Parte 2.pdf` | Lista de ejercicios 10.35–10.78 de Walpole et al. (9.ª ed.), sin enunciados | P1 | 1 | complemento; **tema no inferible del archivo** (solo números) |
| EJ-P2 | `Ejercicios preparación - Prueba 2.pdf` | 20 problemas de análisis de conglomerados | P2 | 9 | núcleo |
| EJ-P3 | `Ejercicios preparación - Prueba 3 .docx.pdf` | Lista de ejercicios de Walpole (13.38–13.47, 14.1–14.5, 15.6) y Gutiérrez Pulido & De la Vara (caps. 3–6), sin enunciados | P3 | 1 | complemento; solo referencias |
| PR-P1-Q1 | `Pauta Pregunta 1 - Prueba 1.docx.pdf` | 6 afirmaciones V/F con justificación | P1 | 2 | núcleo |
| PR-P1-Q2 | `Pauta Pregunta 2 - Prueba 1.docx.pdf` | χ² de varianza + t pooled + conclusión | P1 | 2 | núcleo |
| PR-P1-Q3 | `Pauta Pregunta 3 - Prueba 1.docx.pdf` | Notas mat./fís.: dispersión, escalamiento robusto, r y Bartlett, t, límites, potencia, dif. de medias | P1 | 7 | núcleo; **parcial** (boxplot, matriz y anexos 1–2 en imagen) |
| PR-P2-Q12 | `PAUTA P1 y P2 PRUEBA 2.docx.pdf` | Preg. 1 clustering (average + k-medias + silueta); Preg. 2 clasificación (matriz de confusión, LDA/QDA/NB) | P2 | 2 | núcleo; sin enunciado en el archivo |
| PR-P2-Q3 | `Pauta Pregunta 3 - Prueba 2.docx.pdf` | Análisis factorial (3.1–3.6) sobre un ejemplo de libro | P2 (ver §4: AF) | 5 | núcleo; **parcial** (gráfico y tablas del libro en imagen) |
| PR-P3-E | `Enunciado Prueba 3.pdf` (16-jun-2026) | 3 preguntas de 6 pts: DBCA, factorial 2², árboles/bosque | P3 | 6 | núcleo; **parcial** (datos del 2² y tabla ANOVA en imagen) |
| PR-P3-Q1 | `Pauta Pregunta 1 - Prueba 3.pdf` | DBCA | P3 | 2 | núcleo |
| PR-P3-Q2 | `Pauta Pregunta 2 - Prueba 3.pdf` | Factorial 2² | P3 | 6 | núcleo; **parcial** (gráficos en imagen) |
| PR-P3-Q3 | `Pauta Pregunta 3 - Prueba 3.pdf` | Árbol de regresión / bosque | P3 | 1 | núcleo |
| PR-EX-E | `ExamenMEG.docx.pdf` (1-jul-2026) | Examen: Q1 clustering, Q2 PCA, Q3 fraccionado + Box–Behnken | P1+P2+P3 (acumulativo) | 4 | núcleo; Q3.2 sin los datos del data frame en el texto |
| PR-EX-Q1 | `Examen_Clustering_Pauta.docx.pdf` | Pauta de Q1 del examen | P2 | 2 | núcleo |
| PR-EX-Q2 | `Pauta P2 examen.docx.pdf` | Pauta de Q2 del examen (PCA) | P1 (ver §4) | 2 | núcleo; **duplica** el enunciado de Q2 de `PR-EX-E` |
| PR-EX-Q3 | `ExamenMEGpregunta3 (1).pdf` | Pauta de Q3 del examen | P3 | 7 | núcleo; **parcial** (salida de R del modelo en imagen) |

**Archivos sin enunciado en la carpeta:** Prueba 1 y Prueba 2 (solo pautas). **Datos mencionados pero ausentes:** `cork.csv` (C2 s49, «se entrega»), `notas.xlsx` (C4.1 s20), `Restaurant.csv` (AY3), `datosayudantiafactorial.xlsx` (AY4-P), `maquinas.csv` (PR-EX-E Q2).

**Archivos en `capitulo-1/` que no están en esta carpeta (solo nombres):** `r-codes-for-study/` con scripts de las clases 2, 3, 4.1, 4.2 y de AY1 y AY3.

### Casillas por archivo (3.6 — todos asociados a ≥1 contenido)
- [x] C1 → M01–M04 · [x] C2 → M05–M08 · [x] C3 → M09 · [x] C4.1 → M10 (+M02) · [x] C4.2 → M10 (+M09) · [x] C5.1 → M11–M12 · [x] C5.2 → M13–M14 · [x] C6.1 → M15 · [x] C6.2 → M16 · [x] C7.1 → M17, M18 (+M20) · [x] C7.2 → M18, M19 · [x] CMAN → M19
- [x] AY1-E/AY1-R → M01, M02, M04 · [x] AY2-E/PPT/P → M05, M06, M07, M08, M09 · [x] AY3-E/P/R → M09, M10, M06 · [x] AY4-E/P/PPT → M05, M07, M06, M10 · [x] AY5-E/P/R → M04, M11–M14 · [x] AY6-E/P → M15, M16, M18
- [x] S5.1 → M11, M12 · [x] S5.2 → M13, M14 · [x] S6.1 → M15 · [x] S6.2 → M16 · [x] S7.2 → M18, M19 · [x] duplicados → AY3-R, AY5-R
- [x] EJ-P1 → M01–M07 · [x] EJ-P1b → M05 (tema por confirmar) · [x] EJ-P2 → M11–M14 · [x] EJ-P3 → M18, M20, M21 (solo referencias)
- [x] PR-P1-Q1/Q2/Q3 → M01–M07 · [x] PR-P2-Q12 → M04, M12, M13, M15, M16 · [x] PR-P2-Q3 → M09, M10 · [x] PR-P3-E/Q1 → M20 · [x] PR-P3-Q2 → M21 · [x] PR-P3-Q3 → M24 · [x] PR-EX-E → M04, M09, M12, M22, M23 · [x] PR-EX-Q1 → M04, M11, M12 · [x] PR-EX-Q2 → M09 · [x] PR-EX-Q3 → M22, M23

---

## §2 Contenidos

**Módulos y prueba asignada (reparto provisional):** P1 = M01–M10 (según lo declarado por el estudiante; pero ver §4 por PCA/AF y T²) · P2 = M11–M19 (M17–M19: por confirmar) · P3/por confirmar = M20–M24 (solo en pruebas pasadas; sin clase subida).

**Prioridad por módulo (resumen):**
| Módulo | Prioridad | Módulo | Prioridad |
|---|---|---|---|
| M01 Covarianza/correlación | Alta | M13 K-medias y elección de k | Alta |
| M02 Matrices y Bartlett | Alta | M14 DIANA | Alta |
| M03 Normal multivariada | Baja (solo idea ρ=0) | M15 LDA | Alta |
| M04 Escalamiento y distancias | Alta | M16 QDA, NB, validación | Alta |
| M05 Pruebas de hipótesis (1 pob.) | Alta | M17 Introducción DDE | Baja/Media |
| M06 Pruebas de hipótesis (2 pob.) | Alta | M18 ANOVA 1 factor | Alta |
| M07 Errores y potencia | Alta | M19 MANOVA | Baja (sin registro) |
| M08 T² de Hotelling | Media | M20 DBCA | Alta (P3) |
| M09 PCA | Alta | M21 Factorial 2^k | Alta (P3) |
| M10 Análisis factorial | Alta | M22 Fraccionado | Alta (Examen) |
| M11 Distancias y estandarización (clustering) | Alta | M23 Superficie de respuesta | Alta (Examen) |
| M12 Jerárquico aglomerativo | Alta | M24 Árboles / bosque | Alta (P3) |

### P1 — módulos (clases 1–4.2)

> Prueba asignada: **P1** según declaración del estudiante (`PROMPT_MAESTRO` §0) y contraste con los nombres de archivo de `../capitulo-1/` (ver §4 y §5). Columnas: **Ej.** = ejemplo numérico resuelto en la fuente; **R** = hay código R; **Prioridad — evidencia** = peso del concepto según su presencia fuera de clases (leyenda arriba; IDs en §1). Las fórmulas de varias slides están como **imagen** (no extraíble como texto); se indica «fórmula en imagen» cuando el texto de la slide no la reproduce.

#### M01 · Covarianza, correlación y regresión simple (P1)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios exactos |
|---|---|---|---|---|---|
| Motivación del curso (datos multivariados, qué se verá) | C1 s1–7 | – | – | – | Solo contexto |
| Covarianza: definición, signo (+, −, ≈0), depende de unidades | C1 s9–11 | – | `cov()` (C1 s13) | **Alta** — AY1-E P1; EJ-P1 P10–13; PR-P1-Q3 c | Cov(X,Y)=0 ⇒ sin relación *lineal*; Var(X)=Cov(X,X) (s14); fórmula en imagen |
| Coeficiente de correlación r: propiedades | C1 s14–16, 20–21 | – | `cor.test` (s19) | **Alta** — PR-P1-Q1 afirm. 1–3; PR-P1-Q3 c; AY1-E P1c | −1≤r≤1, adimensional, r=0 no implica independencia en general (s16); correlación alta no prueba causalidad (s20) |
| Regresión lineal simple vs correlación; r muestral vs ρ poblacional | C1 s17–18 | – | – | **Baja** — sin registro fuera de clases | «correlación y regresión están relacionadas, pero no son lo mismo» (s17) |
| `cor.test(x, y, method="pearson")` | C1 s19 | sí (altura/peso, n=6) | sí | **Alta** — PR-P1-Q3 c; EJ-P1 P5, P10.3, P14; AY1-E P2; AY1-R l.120–126 | Devuelve r, IC y p-valor para H0: ρ=0 |

#### M02 · Matriz de covarianza, matriz de correlación, test de Bartlett (P1)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Matriz de covarianza Σ=Cov(X): diagonal=varianzas; propiedades (semidefinida positiva, autovalores ≥0) | C1 s22–23 | – | – | **Alta** — EJ-P1 P10–13; PR-P1-Q1 afirm. 1; AY1-E P4 | fórmulas en imagen |
| `cov(datos)` y `eigen(S)` (puente a PCA) | C1 s24 | sí (X1..X4, n=10) | sí | **Media** — AY1-E P5d (solo `cov`); `eigen` sin registro | `cov` usa n−1 |
| Validar si una matriz puede ser de covarianza/correlación (simétrica, semidefinida positiva, diagonal 1 y \|r\|≤1); forma cuadrática z′Σz>0; hallar un σ² desconocido dada ρ y det(Σ) | *no está como diapositiva propia* (solo C1 s22–23 en general) | sí (EJ-P1 P12: σ1²=16, ρ=−0,75, det=7) | – | **Alta** — EJ-P1 P10–13; PR-P1-Q1 afirm. 1; AY1-E P4 | Condiciones del enunciado de PR-P1-Q1 afirm. 1 |
| Matriz de correlación de Pearson, `cor(datos)` | C1 s25–26 | sí | sí | **Alta** — PR-P1-Q3 c; AY1-E P1b, P5d | diagonal=1; elementos en [−1,1] |
| Test de esfericidad de Bartlett: H0 R=I; decisión p<α | C1 s27–31; C4.1 s18; C4.2 s16 | sí (R en s31) | `psych::cortest.bartlett(R, n=nrow(datos))` | **Alta** — PR-P1-Q3 c (Bartlett 2×2); PR-EX-Q2 e; AY1-E P3, P5e; AY3-E P1l; AY4-E P4a; PR-P2-Q3 3.6D | Requiere normalidad multivariante (C4.1 s18); p<α ⇒ matriz no identidad ⇒ hay correlación útil |
| Estadístico de Bartlett con fórmula χ²=−(n−1−(2p+5)/6)·ln\|R\|, gl=p(p−1)/2, usado a mano | **no aparece en las slides** (fórmula en imagen en C1 s28–30 no verificada); sí en AY1-E P3 y AY1-R l.131–137 | sí (AY1-E P3, P5e; PR-P1-Q3 c con R 2×2) | `det`, `log`, `qchisq` | **Alta** — AY1-E P3, P5e; PR-P1-Q3 c | Para R 2×2 Bartlett sirve para probar correlación entre dos variables (PR-P1-Q3 c) |

#### M03 · Distribución normal multivariada (P1)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Definición: vector de medias μ + matriz de covarianza Σ; contornos elípticos en 2D | C1 s32–34 | – | – | **Baja** — sin registro fuera de clases | fórmula de densidad en imagen |
| Caso bivariado; ρ=0 ⇒ independencia **solo** en normal | C1 s35–36 | – | `dmvnorm`, `persp3D` (s37) | **Alta** — PR-P1-Q1 afirm. 2–3 (solo la idea ρ=0 ⇒ independencia únicamente en normal conjunta) | «Correlación cero NO implica independencia en general; aquí sí por normalidad» |
| Combinación lineal / suma: media y varianza de Y=X1+X2 y cálculo con `pnorm` | C1 s38–39 | sí (μ=(1,2), Σ=[[4,1],[1,3]]; Y=X1+X2: media 3, var 4+3+2·1) | sí | **Baja** — sin registro fuera de clases | Var(X1+X2)=σ1²+σ2²+2σ12 |

#### M04 · Escalamiento, distancias y similitud (P1)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Cuándo estandarizar (unidades distintas, distancias, PCA, clustering) | C1 s40, 45 | – | – | **Alta** — PR-EX-Q1 a; PR-EX-E Q1a; EJ-P2 P8; AY5-E P4b | La elección depende del método posterior y de los outliers |
| Normalización min–max a [0,1] | C1 s41 | sí | sí | **Alta** — PR-P1-Q1 afirm. 5; PR-P2-Q12 Q1d (transformación inversa); EJ-P2 P7; AY5-E P2, P4b | w=(x−min)/(max−min) |
| Estandarización z-score, `scale()` | C1 s42 | sí | sí | **Alta** — PR-EX-Q1 a.ii; EJ-P2 P6, P19 | media 0, sd 1 |
| Transformación inversa de min–max (x=y(máx−mín)+mín), p. ej. para interpretar centroides | sin diapositiva (solo fórmula min–max en C1 s41) | sí (PR-P2-Q12 Q1d) | – | **Alta** — PR-P2-Q12 Q1d | |
| Escalamiento robusto (mediana e IQR) | C1 s43 | sí | `median`, `IQR` | **Alta** — PR-P1-Q3 b (única aparición) | menos sensible a outliers |
| Normalización L2 | C1 s44 | sí | sí | **Baja** — sin registro fuera de clases | divide por la norma del vector |
| Distancias euclídea y Manhattan, `dist(rbind(A,B), method=…)` | C1 s46–47 | sí (A=(2,3), B=(6,8)) | sí | **Alta** — EJ-P2 P13–16, P20; PR-EX-E Q1b; AY5-E P1, P4c | euclídea=línea recta; Manhattan=suma de diferencias absolutas |
| Similitud: coseno vs correlación | C1 s48–49 | sí (X=(1,2,3,4), Y=(2,8,6,8)) | sí | **Baja** — sin registro fuera de clases | coseno=similitud angular; correlación=coseno de vectores centrados |

#### M05 · Pruebas de hipótesis: marco general y una población (P1)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| H0/H1, significancia α, error tipo I, regla p≤α | C2 s2–4 | sí (μ>70, media 71.8, n=100, p=2,17 %) | – | **Alta** — PR-P1-Q1 afirm. 4 y 6; todos los problemas de EJ-P1, AY2-E y AY4-E | **Regla de la slide: p ≤ α ⇒ rechazar** (s4, s14); en s31/s20 «p < α» (ver §3) |
| Media, σ desconocida (t) | C2 s5–6 | sí (consumo energía, n=20, vs 721 kWh; t crít 1,73; p=0,02188) | – | **Alta** — PR-P1-Q3 d–f; EJ-P1 P8; AY4-E P3; AY2-PPT p5–6 | t con n−1 gl; colas más anchas que la normal |
| `t.test` bilateral y unilaterales (`alternative = "two.sided"/"greater"/"less"`) | C2 s7–9 | sí (simulado; t=2,048, p=0,0517) | sí | **Alta** — PR-P1-Q3 d (p-valor desde salida R de un «anexo»); AY2-PPT p6 | IC contiene μ0 ⇒ no se rechaza |
| Media, σ conocida (Z) con `BSDA::z.test` | C2 s10–11 | sí (n=30, σ=2, z=2,164, p=0,0153) | sí | **Alta** — EJ-P1 P8; AY2-E P2; AY4-E P1; AY2-PPT p3–4 | σ conocida ⇒ normal estándar |
| Proporción: planteamiento, requisito, Z, p-valor bilateral | C2 s12–14 | sí (43/120, p0=0,40, α=10 %) | – | **Alta** — EJ-P1 P6–7 y P-Walpole 10.x (EJ-P1b); AY2-E P1; AY2-PPT p7–8 | **np0 ≥ 5 y n(1−p0) ≥ 5** (s12, s39); Z crít ±1,64; si falla ⇒ método exacto (binomial) (s39) |
| Proporción en R (manual y `prop.test(…, correct=FALSE)`) | C2 s15–16 | sí (78/120, p0=0,6; X²=1,25; p=0,1318) | sí | **Media** — AY2-E P1; AY2-PPT p8 (uso de `prop.test`) | `prop.test` entrega X² (=z²) |
| Varianza: χ²=(n−1)s²/σ0², gl n−1 | C2 s17–18 | sí (n=24, s²=4,9, σ0²=4; χ²=28,175 < 35,172) | – | **Alta** — PR-P1-Q2 a; EJ-P1 P8–9; AY2-E P3; AY4-E P2 | Hipótesis sobre σ² (ej. σ ≤ 2 ⇒ σ² ≤ 4) |
| Varianza en R (`qchisq`, `pchisq`; sin función específica) | C2 s19–20 | sí (χ²=1,187; crít 23,685; gl 14) | sí | **Media** — AY2-E P3 (`qchisq`/`pchisq` manual) | Valor crítico y p-valor llevan a la misma decisión |

#### M06 · Pruebas de hipótesis: dos poblaciones (P1)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Esquema: cociente de varianzas, dif. de medias (pooled / Welch), pareadas | C2 s21, 33 | – | – | **Alta** — EJ-P1 P1–4 (hay que elegir la prueba); AY2-PPT p11–20 | Árbol de decisión en s33 |
| Cociente de varianzas F=s1²/s2², gl (n1−1, n2−1) | C2 s22–23 | sí (Santiago n=23 s=120; Concepción n=28 s=99,3; gl 22 y 27) | – | **Media** — AY2-E P4; AY2-PPT p11–12 | Supone normalidad; F≈1 ⇒ varianzas similares |
| `var.test` y cálculo manual (`qf`, `pf`) | C2 s24–25 | sí (F=8,924, gl (11,9), p=0,001388) | sí | **Media** — AY2-E P4; AY2-PPT p11–12 | |
| Dif. de medias, varianzas **distintas** (Welch) | C2 s26–27, 32 | sí (limón: t=0,928; gl=21,56; p=0,1817; D0=1500) | `t.test(A,B,var.equal=FALSE)` | **Alta** — PR-P1-Q3 g (anexo 2); EJ-P1 P1–4; AY2-PPT p17–18 | gl de Welch no entero; fórmula de gl en imagen |
| Dif. de medias, varianzas **iguales** (pooled) | C2 s28–29 | sí (Sp²=22 819,23; t=1,4602; crít 1,7056; p=0,1562; gl 26; D0=1000) | `var.equal=TRUE` | **Alta** — PR-P1-Q2 b; EJ-P1 P1–4; AY2-PPT p15–16 | Se usa si la F previa no rechazó H0 |
| Elección de prueba: «se recomienda Welch salvo certeza de igualdad» (Zimmerman 2004) | C2 s33 | – | – | **Alta** — EJ-P1 P1–4; PR-P1-Q2 b (enunciado indica «suponga varianzas iguales») | |
| Muestras dependientes (pareadas): t sobre d=antes−después | C2 s30–31, 34 | sí (colesterol n=11; t0=9,06; crít 1,8125; gl 10) | `t.test(antes, despues, paired=TRUE)` | **Alta** — EJ-P1 P5, P14; AY3-E P5; AY4-E P3; AY2-PPT p19–20 | Equivale a `t.test(antes-despues, mu=0)`; el orden importa |

#### M07 · Errores tipo I/II y potencia (P1)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Error tipo I (α), tipo II (β), potencia 1−β; relación α↔β | C2 s35–36 | – | – | **Alta** — PR-P1-Q1 afirm. 4 y 6; AY2-E P2c, P3c; AY4-E P1c, P2b–c, P3b | A menor α, mayor β |
| Cálculo de β para un valor del parámetro bajo H1; β depende de n, α, diferencia real y σ | C2 s37–38 | ejemplo en imagen (no extraíble como texto) | – | **Alta** — PR-P1-Q3 e–f; EJ-P1 P6–9; AY2-E P2–3; AY4-E P1–3 | A mayor n ⇒ menor β ⇒ mayor potencia |
| Límites de no rechazo expresados en x̄, p̂ o s² («¿qué valores de la media muestral rechazan H0?») y probabilidad de no rechazar para un parámetro verdadero dado | C2 s37–38 (ejemplo en imagen) | sí (AY2-E P2b–c, P3b–c; AY4-E P1b–c, P2c, P3b; EJ-P1 P6–9; PR-P1-Q3 e–f) | `qnorm`, `qchisq`, `pnorm`, `pchisq`, `pt` | **Alta** — PR-P1-Q3 e–f; EJ-P1 P6–9; AY2-E; AY4-E | Patrón repetido en pruebas y ayudantías |

#### M08 · Inferencia sobre el vector de medias: T² de Hotelling (P1; ver «por confirmar» en §4)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Por qué el contraste conjunto (región elíptica) y no p pruebas t | C2 s40–41 | – | – | **Media** — AY2-PPT p23–28 | |
| Supuesto: normalidad multivariada; test de Mardia | C2 s42 | – | `MVN::mvn(X, mvnTest="mardia")`, `psych::mardia` | **Media** — AY2-PPT p22, p26 | |
| T² de una muestra: T²=n(x̄−μ0)′S⁻¹(x̄−μ0); [(n−p)/((n−1)p)]T² ~ F(p, n−p); con p=1, T²=t² | C2 s43–44 | – | `ICSNP::HotellingsT2` (s48) | **Media** — AY2-PPT p24, p27 | Rechazar si T² > [(n−1)p/(n−p)]F_α(p,n−p) |
| Región de confianza elíptica para μ; equivalencia con el test | C2 s45 | – | `car::ellipse` | **Baja** — sin registro fuera de clases | μ0 dentro ⇔ no se rechaza |
| IC simultáneos (T²) para a′μ y por variable; alternativa de Bonferroni | C2 s46–47 | sí (corteza: 3 contrastes, F=6,40, p=0,0023; solo (N+S)−(E+W) excluye 0) | sí (s48–49) | **Media** — AY2-PPT p25, p28 (Bonferroni) | Bonferroni: más angostos si solo interesan las p medias; T²: válidos para toda combinación lineal |

#### M09 · Análisis de Componentes Principales (P1)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Qué es PCA, para qué sirve, ventajas y limitaciones | C3 s2–7 | – | – | **Alta** — PR-EX-Q2 f; AY3-E P1 (V/F a–m); AY2-E P5c | PCA crea combinaciones lineales; no elimina variables; no apto si relaciones no lineales (s6) |
| Pasos: centrar; matriz S=(1/(n−1))X̃ᵀX̃; propiedades de S | C3 s8–9 | – | – | **Media** — AY2-PPT p35–36 | S simétrica, semidefinida positiva |
| Problema de autovalores Sv=λv; PC1 por maximización con restricción ‖w‖=1; PC2 ortogonal; λ1≥λ2≥…≥0 | C3 s10–12 | – | – | **Alta** — PR-P2-Q3 3.6C; AY3-E P1 c, d, i; AY2-PPT p37 | λ=varianza explicada |
| Proyección Z=X̃V_m; loadings y scores | C3 s13–14 | – | – | **Alta** — PR-EX-Q2 d (interpretar puntaje en PC1); AY2-E P5d (score con datos estandarizados); AY2-PPT p39 | |
| Varianza explicada λk/Σλ; criterios 80 %, Kaiser (λ>1, datos estandarizados), scree plot | C3 s15; C4.2 s4–5 | – | – | **Alta** — PR-EX-Q2 b; PR-P2-Q3 3.1; AY2-E P5a; AY3-R l.32–74 | |
| Ejemplo numérico 3×2 (centrado, S, λ1=2,666, λ2=2, Z) | C3 s16–18 | sí | – | **Baja** — sin registro fuera de clases | v1=(1,1)/√2, v2=(1,−1)/√2 |
| `prcomp(datos, scale.=TRUE)`, `summary`, `screeplot`, `pca$rotation`, `pca$x`, `biplot` | C3 s19–26 | sí (mtcars) | sí | **Alta** — PR-EX-Q2 a; AY3-R l.21–118; AY2-E P5 | sdev = √autovalor; PC1+PC2≈80 % |
| Interpretación de loadings: \|l\|≥0,30 relevante; ≥0,40 fuerte; signo = dirección | C3 s22–24 | sí (PC1 tamaño/potencia vs eficiencia; PC2 configuración vs aceleración) | – | **Alta** — PR-EX-Q2 d; AY2-E P5b–c; AY3-R l.85–107 | Umbrales de la slide (ver §3 vs AF) |

#### M10 · Análisis factorial (P1)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Qué es el AF; factores latentes; todas las variables cumplen el mismo papel | C4.1 s2–3 | – | – | **Alta** — PR-P2-Q3 3.5; AY4-PPT p3–5; V/F AY4-PPT 1-1…1-3 | |
| Varianza de ítems; varianza compartida r²; descomposición total = común + específica + error | C4.1 s5–7 | sí (r=0,90 ⇒ 81 %) | – | **Media** — AY4-PPT p7 | El AF analiza la varianza común |
| AF por componentes principales (1s en la diagonal) vs factores comunes (comunalidades en la diagonal) | C4.1 s8 | – | – | **Alta** — PR-P2-Q3 3.5, 3.6A; AY4-PPT V/F (1-7, 1-50, 1-51) | |
| Modelo X=AF+u; supuestos (E(F)=0, Var(F)=1, incorrelación); ortogonal vs oblicuo | C4.1 s9–12 | – | – | **Alta** — AY4-PPT p5–6 y V/F (1-4, 1-34, 1-47); AY3-R l.140–205 | |
| Comunalidad h²=Σa²ij, especificidad ψ=1−h² | C4.1 s12–14 | sí (6 materias; h²Ma=0,68; h²Di=0,785) | – | **Alta** — PR-P2-Q3 3.2; AY4-P f; AY3-R l.160–170; AY4-PPT p8–9 y V/F (1-5, 1-6, 1-43, 1-44) | h²+ψ=1 |
| Adecuación: correlaciones altas; Bartlett; correlación parcial; **KMO** (≥0,75 bien; ≥0,5 aceptable; <0,5 inaceptable) | C4.1 s17–20; C4.2 s15 | sí (notas: MSA 0,35→0,61; USArrests) | `psych::KMO` | **Alta** — PR-EX-Q2 e; PR-P2-Q3 3.6D; AY3-E P3; AY4-E P4a; AY4-PPT p10 | Umbrales de la slide C4.1 s19; en C4.2 s15 «KMO global > 0,6 → adecuado» (ver §3) |
| Problemas de extracción: gl `k ≤ (p−1)/2`; no unicidad (A*=AT) | C4.1 s22 | – | – | **Media** — AY4-PPT V/F 1-37 | |
| Rotación: propiedades (no cambia comunalidades ni varianza total) | C4.1 s23; C4.2 s10 | sí (T ortogonal) | – | **Alta** — PR-P2-Q3 3.3; AY4-PPT V/F (1-23, 1-28, 1-38, 1-42, 1-54) | |
| Métodos de extracción: componentes principales, ejes principales, máxima verosimilitud (χ² de ajuste: H0 Σ=AA′+Ψ; p>0,05 ⇒ buen ajuste) | C4.1 s24–27 | – | `fa(...)` | **Alta** — AY4-E P4c; AY4-P (c); AY4-PPT p11 | |
| Número de factores: a priori, Kaiser, % varianza (75–80 %), scree, análisis paralelo | C4.2 s3–5, 16 | – | `fa.parallel(datos, fa="fa")` | **Alta** — PR-P2-Q3 3.1; AY4-E P4b; AY4-PPT p12 | Kaiser tiende a subestimar; % arbitrario; scree subjetivo |
| Interpretación de factores; cargas significativas > \|0,5\| o > \|0,4\| | C4.2 s7–8 | sí (6 materias: F1 científica, F2 humanística) | – | **Alta** — PR-P2-Q3 3.2; AY3-E P4; AY4-E P4e | |
| Rotación: estructura simple (Thurstone); ortogonal (Varimax, Quartimax, Equamax) y oblicua (Oblimin, Promax) | C4.2 s10–12 | – | `fa(..., rotate="varimax"/"promax")` | **Alta** — PR-P2-Q3 3.3, 3.6B; AY4-E P4d; AY4-PPT p13 | |
| Ejemplo completo USArrests (scale, KMO, Bartlett, paralelo, varimax, comunalidades, promax) | C4.2 s13–18 | sí | sí | **Baja** — sin registro fuera de clases (las ayudantías usan otros datos) | UrbanPop MSA=0,49 |
| Validación de un AF dividiendo la muestra en dos submuestras; el signo de un factor es arbitrario (cambio de signo no cambia la interpretación) | **sin clase subida**; solo PR-P2-Q3 3.4 | – | – | **Alta** — PR-P2-Q3 3.4 | Fuente de la prueba es un ejemplo de libro (no identificado en el archivo) |

### P2 — módulos (clases 5.1–7.2 y MANOVA.pdf)

> Prueba asignada: **P2** por declaración del estudiante (`PROMPT_MAESTRO` §0); la inclusión de 7.1 (diseño de experimentos) es supuesto pendiente (§4). Muchas fórmulas de 7.1/7.2 están como imagen; donde se pudo, se leyó la imagen renderizada de la página (7.1 págs. 29–30, 33, 38–40, 42, 45–49).

#### M11 · Análisis de conglomerados: definición, pasos, distancias y estandarización (P2)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Clustering = aprendizaje no supervisado; definición formal (cobertura, disjuntividad, no vacío); cohesión vs separación | C5.1 s2–3 | – | – | **Alta** — EJ-P2 P1–3; PR-P2-Q12 Q1; AY5-P P4a | |
| 5 pasos del análisis (preparar, distancia, algoritmo, nº óptimo de k, validar) | C5.1 s4 | – | – | **Media** — AY5-P P4 | |
| Distancias numéricas: euclídea, euclídea², Minkowski (λ=1 Manhattan, 2 euclídea, ∞ Chebyshev) | C5.1 s6–8 | sí (8 empresas) | `dist(method="euclidean"/"manhattan"/"maximum")` | **Alta** — EJ-P2 P13–16, P20; AY5-E P1, P4c | Euclídea² se usa en Ward |
| Distancia basada en correlación d=1−cor, d∈[0,2] | C5.1 s9 | – | `1 - cor(t(datos))` | **Alta** — EJ-P2 P4 | invariante a escala |
| Distancias binarias: Jaccard (b+c)/(a+b+c) y Simple Matching (b+c)/(a+b+c+d) | C5.1 s10–11 | sí (SM=0,5) | `ade4::dist.binary(method=1)` | **Alta** — EJ-P2 P5, P17–18; AY5-E P3 | Jaccard ignora doble ausencia |
| Distancia de Hamming (nº de variables distintas) para datos binarios, calculada con `dist(…, "manhattan")` | sin diapositiva (en clases solo Jaccard y Simple Matching, C5.1 s10–11) | sí (AY5-E P3) | `dist(method="manhattan")` en AY5-R l.104 | **Alta** — AY5-E P3 | Con 0/1 coincide con Manhattan |
| Estandarización para clustering: z, rango [0,máx], min–max; cuándo usar cada una | C5.1 s13–17 | – | `scale()` | **Alta** — PR-EX-Q1 a; EJ-P2 P6–8, P19; AY5-E P4b | min–max muy sensible a outliers; sin escala domina la variable grande |

#### M12 · Clustering jerárquico aglomerativo (P2)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Aglomerativo vs desagregativo; dendrograma | C5.1 s19 | – | – | **Alta** — EJ-P2 P10 | |
| Single linkage (mínimo): efecto cadena | C5.1 s21–25 | sí (5 empresas; fusiones 0,42→0,65→1,64→2,28) | `hclust(method="single")`, `cutree` | **Alta** — EJ-P2 P9, P13–17; AY5-E P1, P4d | |
| Complete linkage (máximo): clústeres compactos | C5.1 s26–28 | sí (0,42→0,65→1,97→3,22) | `hclust(method="complete")` | **Alta** — EJ-P2 P9, P13–17; AY5-E P1 | |
| Promedio (average linkage): una de las «5 métodos» de la figura de C5.1 s20; **no tiene slide propia, ejemplo ni código en las clases** (sí en AY5-R l.52 y pruebas) | C5.1 s20 (imagen) | – | `hclust(method="average")` solo en AY5-R | **Alta** — PR-P2-Q12 Q1a; AY5-E P1; AY5-R l.51–62 | distancia promedio entre todos los pares |
| Centroide: puede dar inversiones en el dendrograma; no es métrica | C5.1 s29–30 | – | `hclust(method="centroid")`, `aggregate` | **Alta** — PR-EX-Q1 b; EJ-P2 P15; AY5-E P2 | |
| Ward (`ward.D2`): clústeres de tamaño similar y compactos | C5.1 s31–32 | – | `hclust(method="ward.D2")` | **Alta** — EJ-P2 P13, P16, P19 | |

#### M13 · K-medias y elección de k (P2)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| K-medias: objetivo (minimiza suma de ‖x−μ‖²), algoritmo, convergencia a óptimo local | C5.2 s3–4 | – | – | **Alta** — PR-P2-Q12 Q1a; EJ-P2 P11 | requiere k de antemano |
| Ejemplo numérico k=2 con 5 empresas (2 iteraciones) | C5.2 s5–6 | sí | – | **Alta** — EJ-P2 P11 (asignación y nuevos centroides) | centroides iniciales E1 y E8 |
| K-means++ y `nstart` | C5.2 s7 | – | `kmeans(…, nstart=25)` | **Baja** — sin registro fuera de clases | |
| K-medias vs jerárquicos: ventajas, limitaciones, cuándo usar | C5.2 s8 | – | – | **Alta** — EJ-P2 P11 (2 ventajas y 2 desventajas) | sensible a outliers; asume clústeres esféricos |
| `kmeans`, `km$cluster/centers/tot.withinss`, `fviz_cluster` | C5.2 s9 | – | sí | **Alta** — PR-P2-Q12 Q1a; AY5-E P4e | |
| Método del codo, WSS (monótono decreciente) | C5.2 s10–13 | sí (WSS 100→60→45→42→41) | – | **Alta** — EJ-P2 P12; AY5-E P4f | |
| Silhouette: a(i), b(i), s(i)=(b−a)/máx(a,b)∈[−1,1]; ventajas/limitaciones | C5.2 s14–18 | – | – | **Alta** — PR-P2-Q12 Q1e; AY5-E P4g | combinar con codo |

#### M14 · DIANA (desagregativo) (P2)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Algoritmo DIANA (disparidad promedio, escisión, reasignación si dif>0) | C5.2 s19–27 | sí (5 empresas: E8 escinde, luego E7; luego E5) | `cluster::diana`, `cutree` | **Alta** — EJ-P2 P13e, P15f, P16e, P17e, P18d, P19f; AY5-E P3 | |
| Comparación de métodos y resumen del capítulo | C5.2 s26, 29 | – | – | **Alta** — EJ-P2 P15f–P20 (comparar con k-means/DIANA) | |

#### M15 · Clasificación supervisada: LDA (P2)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Supervisado vs no supervisado; problema de clasificación | C6.1 s2–3 | – | – | **Alta** — EJ-P2 P1; PR-P2-Q12 Q2b | |
| Ejemplo Banco de Ademuz (16 clientes) y clasificación univariada (75 % y 56,3 %) | C6.1 s4–9 | sí | – | **Baja** — sin registro fuera de clases | punto de corte = promedio de medias |
| Función discriminante de Fisher: señal/ruido λ=u′Fu/u′Wu; u=W⁻¹(x̄1−x̄2) | C6.1 s10–13 | – | – | **Media** — AY6-E P3b (interpretar LDA) | «no necesitan memorizar» la fórmula (s13) |
| Cálculo numérico: medias, W, u=(−0,074; 0,067), corte −0,251, 15/16 correctos | C6.1 s14–19 | sí | – | **Baja** — sin registro fuera de clases | |
| Supuestos LDA: normalidad multivariada, covarianzas iguales (Box's M), independencia | C6.1 s20 | – | – | **Alta** — PR-P2-Q12 Q2b; AY6-E P3a | LDA robusto a desviaciones leves |
| `MASS::lda`, `predict` ($class, $posterior, $x), matriz de confusión, accuracy | C6.1 s21 | sí (0,9375) | sí | **Media** — AY6-E P3b | |

#### M16 · QDA, Naive Bayes, validación (P2)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| LDA vs QDA; Box's M (p>0,05 ⇒ LDA; p≤0,05 ⇒ QDA); con muestras pequeñas preferir LDA | C6.2 s3–5 | sí (p=0,8486) | `biotools::boxM`, `qda` | **Alta** — PR-P2-Q12 Q2b; AY6-E P3a | |
| Efecto de las probabilidades a priori desiguales sobre la decisión; densidad gaussiana puede ser >1 | C6.2 s7, s9 (prior = n_k/n) | sí (AY6-E P2: priors 0,5/0,5 vs 0,2/0,8; posterior de Éxito 0,6179) | `dnorm` | **Media** — AY6-E P2 | |
| Naive Bayes con variables categóricas (tablas de verosimilitud, priors, posterior normalizada) y problema de frecuencia cero con suavizado de Laplace (`laplace=1`) | C6.2 s9 (solo mención de frecuencias relativas); **Laplace no está en las clases** | sí (AY6-E P1: 14 clientes; scores 0,046 vs 0,037; P(Sí\|x)=0,554) | `naiveBayes(…, laplace=1)` en AY6-P | **Media** — AY6-E P1; PR-P2-Q12 Q2b (NB combina categóricas y numéricas) | Laplace: conteo+1 sobre n_k+m_j |
| Naive Bayes: Bayes, prior, independencia condicional, verosimilitud gaussiana/categórica | C6.2 s7–10 | sí (scores 0,0112 vs 0,0115 ⇒ Cumplidor) | `e1071::naiveBayes` | **Alta** — PR-P2-Q12 Q2b; AY6-E P1, P2, P3c | |
| Comparación LDA/QDA/NB; ventajas y desventajas | C6.2 s12–13 | – | – | **Alta** — PR-P2-Q12 Q2b; AY6-E P3d | LDA caso particular de QDA; NB = covarianza diagonal |
| Matriz de confusión: accuracy, sensibilidad, especificidad, precisión, VPN | C6.2 s16–17 | sí (7/1/0/8) | – | **Alta** — PR-P2-Q12 Q2a; AY6-E P3b | accuracy engañoso con clases desbalanceadas |
| Sobreajuste, train/test, k-fold, LOO (`lda(..., CV=TRUE)`) | C6.2 s18–20 | sí (LOO 0,875) | sí | **Media** — AY6-E P3d | accuracy de entrenamiento sobreestima |

#### M17 · Diseño de experimentos: introducción (P2, por confirmar)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Observar vs experimentar; definición de DDE; problemas típicos; historia (Fisher, Box, Deming/Ishikawa) | C7.1 p4–9 | – | – | **Baja** — sin registro fuera de clases | |
| Términos: experimento, unidad experimental, variable de respuesta, factores controlables / no controlables, niveles, tratamiento, error aleatorio/experimental | C7.1 p10–16 | – | – | **Media** — AY6-E P4a | |
| Aleatorización, repetición, bloqueo (ej. 4 máquinas, 4 operadores) | C7.1 p17 | – | – | **Alta** — bloqueo en PR-P3-Q1 a (DBCA, prueba 3); aleatorización: AY6-E P4 (enunciado) | |
| Etapas (planeación, análisis, interpretación); matriz de diseño; criterios para seleccionar el diseño | C7.1 p18–22 | – | – | **Baja** — sin registro fuera de clases | |

#### M18 · ANOVA de un factor, comparaciones múltiples y supuestos (P2)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Diseño completamente al azar (DCA); H0: μ1=…=μk; efectos τi=μi−μ | C7.1 p26–33; C7.2 s2–3 | – | – | **Media** — AY6-E P4a; AY6-P P4 | diseño balanceado si ni=n |
| Modelo yij=μ+τi+εij, εij~N(0,σ²); efectos fijos / aleatorios / mixtos | C7.1 p32, 34–35, 46 | – | – | **Media** — PR-P3-Q1 a (modelo análogo para DBCA) | |
| Descomposición SCT=SCTRAT+SCE; gl: k−1, N−k, N−1; CM; F0=CMTRAT/CME ~ F(k−1,N−k); rechazar si F0>Fα o p<α | C7.1 p36–42, 51 | – | – | **Alta** — AY6-E P4b–d; PR-P3-Q1 c–d (tabla análoga con bloque) | |
| Ejemplo a mano: 3 métodos de enseñanza (medias 81,5/46,5/71,5; gran media 66,5; SCT=3007; SCTrat=2600) | C7.1 p43–53 | sí | – | **Alta** — AY6-E P4b (SC con totales) | ver nota §3 sobre «Hipótesis» |
| Ejemplo 4 métodos de ensamble (SC 69,5; 29,5; total 99; F=9,42; p=0,00177) | C7.1 p28; C7.2 s4–9 | sí | `aov(tiempo ~ metodo)`, `summary` | **Media** — AY6-E P5a | Se rechaza H0 |
| Supuestos: independencia, homogeneidad de varianzas (Levene), normalidad | C7.1 p44, 54; C7.2 s22 | – | – | **Media** — AY6-P P4e | |
| Verificación vía residuos: normalidad, independencia (vs orden), varianza constante (vs predichos) | C7.2 s22–24 | – | – | **Baja** — sin registro fuera de clases | modelo ajustado: predicho = media del tratamiento |
| Comparaciones múltiples tras rechazar H0: **LSD** (LSD=t(α/2,N−k)·√(2·CME/n); k(k−1)/2 pares; confianza individual; «muy potente», declara significativas pequeñas diferencias) y **Tukey** (T_α=q_α(k,N−k)·√(CME/n), rango estudentizado; confianza grupal; menos potente); boxplot y gráfico de medias | C7.2 s10–19 (fórmulas leídas en la imagen renderizada) | sí (4 métodos: LSD=2,18·√(2·2,46/4)=2,42; Tukey=4,20·√(2,46/4)=3,27; con Tukey solo C–A y C–B resultan significativas (LSD agrega A–D); R: p adj C–A=0,0016, C–B=0,0110, D–A=0,0533) | `TukeyHSD(modelo)` | **Alta** — PR-P3-Q1 g (LSD); AY6-E P5b (Tukey) | Tukey y LSD coinciden cuando la diferencia es clara |
| Tamaño de muestra por tratamiento: n=2·(t)²·σ²/d_T² (ejemplo σ=1,5; d=2 ⇒ n=5,1 ⇒ n=5); recomendación 5–30 por tratamiento | C7.2 s20–21; C7.1 p31 | sí | – | **Baja** — sin registro fuera de clases | |

#### M19 · MANOVA (P2)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia fuera de clases | Supuestos / criterios |
|---|---|---|---|---|---|
| Qué es; por qué no p ANOVA separados (infla error tipo I; ignora correlación) | C7.2 s26–27 | – | – | **Baja** — sin registro fuera de clases | |
| Modelo, H0: μ1=…=μg; supuestos (normalidad multivariada, Σ común, independencia) | C7.2 s28; MANOVA p3–4 | – | – | **Baja** — sin registro fuera de clases | |
| W, B, T=W+B; Λ de Wilks=\|W\|/\|W+B\|; Λ pequeño ⇒ rechazar; Pillai, Lawley–Hotelling, Roy | C7.2 s29–30; MANOVA p5–6 | – | `summary(fit, test="Wilks")` | **Baja** — sin registro fuera de clases | Pillai más robusto si falla homogeneidad |
| Verificación: Mardia, Box's M (gl = p(p+1)(g−1)/2) | C7.2 s31; MANOVA p8, 13 | sí (χ²=43,038, gl 12) | `mvn(…,"mardia")`, `boxM` | **Baja** — sin registro fuera de clases | con n iguales, MANOVA relativamente robusto, interpretar con cautela |
| Relación con discriminante (autovectores de W⁻¹B; Roy = mayor autovalor) | C7.2 s32 | – | – | **Baja** — sin registro fuera de clases | |
| Ejemplo iris (Λ=0,0234; F≈199; gl 8,288) | C7.2 s33–34 | sí | `manova`, `summary.aov` | **Baja** — sin registro fuera de clases | |
| Ejemplo metodologías (Λ=0,048958; F=29,329; numDf=p(g−1)=6) y post hoc ANOVA + Tukey | MANOVA p1–13 | sí | `manova`, `summary.aov`, `TukeyHSD` | **Baja** — sin registro fuera de clases | |

### P3 / por confirmar — módulos que aparecen **solo** en pruebas pasadas (sin clase subida)

> Estos temas aparecen en `Enunciado Prueba 3` / pautas de P3 y en el Examen del 1 de julio de 2026, pero **no hay clase ni slide en `clases/` que los desarrolle** (solo menciones en C1 s4 —«Diseños factoriales, Bloqueo, Superficies de respuesta, Optimización de procesos», «Árboles de clasificación»— y la definición de bloqueo en C7.1 p17). El estudiante dijo que las clases de P3 aún no están subidas (`PROMPT_MAESTRO` §0). **No se redacta teoría desde aquí**: solo se registra qué se evaluó. Cuando se suban las clases, esto se completa con la Fase 7.

#### M20 · Diseño en bloques completos al azar (DBCA) (P3, por confirmar)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia | Detalle observado |
|---|---|---|---|---|---|
| Identificar el diseño, modelo Yij=μ+τi+βj+εij e hipótesis (tratamiento y bloque) | PR-P3-E P1a; PR-P3-Q1 a | sí | – | **Alta** (única pregunta de DBCA vista) | H0 trat: τ1=τ2=τ3=0; H0 bloque: β1=…=β4=0 |
| Totales por bloque y gran total; FC=Y..²/N; SCtrat, SCbloque, SCerror por diferencia | PR-P3-E P1b–c; PR-P3-Q1 b–c | sí (3 fertilizantes × 4 sectores: SCtrat=72, SCbloq=60, SCerror=24, SCT=156) | – | **Alta** | Verificado con R: F tratamiento=9,00 (p=0,0156); F bloque=5,00 (p=0,0452); F crít (2,6)=5,143; (3,6)=4,757 |
| Tabla ANOVA con bloque; gl: a−1, b−1, (a−1)(b−1), N−1 | PR-P3-Q1 d | sí | – | **Alta** | «En el valor p basta que comparen el valor crítico que les damos» |
| Decisión sobre tratamientos y sobre el efecto del bloqueo | PR-P3-Q1 e–f | sí | – | **Alta** | Bloqueo «efectivo apenas» (F=5,00 vs 4,76) |
| LSD en DBCA: LSD=t(0,025;6)·√(2·CME/b)=3,46 | PR-P3-Q1 g | sí | – | **Alta** | Recomendación F3 (28 kg) significativamente superior a F1 |
| Comparar con DCA (sumar SCbloque al error): F=3,86 < 4,26 | PR-P3-Q1 h | sí | – | **Alta** | Muestra el valor del bloqueo |
| Teoría de bloqueo (definición, ejemplo operadores/máquinas) | C7.1 p17 | – | – | Media | Solo una página en clases |

#### M21 · Experimentos factoriales 2^k completos (P3, por confirmar)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia | Detalle observado |
|---|---|---|---|---|---|
| Efectos principales e interacción en 2² con réplicas (por promedios o por contrastes, notación de Yates (1), a, b, ab) | PR-P3-E P2a; PR-P3-Q2 a | sí (A=11; B=−6,5; AB=5) | – | **Alta** | Rúbrica: cálculo 1,2 pts + interpretación 0,8 pts |
| Gráficos de efectos principales y de interacción (eje y con valores; líneas no paralelas ⇒ interacción) | PR-P3-E P2b; PR-P3-Q2 b | sí | – | **Alta** | Rúbrica: 0,5 por gráfico + 0,5 conclusión |
| ANOVA factorial: SS=(contraste)²/(4·r), modelo Yijk=μ+Ai+Bj+(AB)ij+εijk, hipótesis por efecto | PR-P3-E P2c; PR-P3-Q2 c | sí (SSA=242; SSB=84,5; SSAB=50) | – | **Alta** | Verificado con R: F_A=35,85 (p=0,0039); F_B=12,52 (p=0,024); F_AB=7,41 (p=0,0529 ⇒ no significativa al 5 %); SSE=27 con 4 gl |

#### M22 · Factorial fraccionado 2^(k−p) (P3 / Examen, por confirmar)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia | Detalle observado |
|---|---|---|---|---|---|
| Reconocer 2^(4−1), generador D=ABC, relación definitoria I=ABCD, resolución IV y su significado | PR-EX-E Q3.1a; PR-EX-Q3 3.1a | sí | – | **Alta** (examen) | «Efectos principales no confundidos con interacciones de 2 factores; interacciones de 2 factores confundidas entre sí» |
| Estimar efectos principales como ȳ+ − ȳ− suponiendo interacciones nulas; elegir el mayor \|efecto\| | PR-EX-Q3 3.1b | sí (A=−2,25; B=0,55; C=1,55; D=−0,15) | – | **Alta** | Rúbrica 0,4 por efecto + 0,4 conclusión |

#### M23 · Metodología de superficie de respuesta (Box–Behnken) (Examen, por confirmar)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia | Detalle observado |
|---|---|---|---|---|---|
| Adecuación del modelo cuadrático (términos significativos, R²=0,9871) | PR-EX-E Q3.2a; PR-EX-Q3 3.2a | sí | salida de `lm` en data frame (no incluida en el enunciado leído) | **Alta** | |
| Punto estacionario (derivadas parciales, Hessiana definida positiva ⇒ mínimo), conversión de unidades codificadas a reales | PR-EX-Q3 3.2b–c | sí (x*=(−0,445; −0,776; −0,388) ⇒ 133,9 °C; 27,2 %; 861 rpm) | – | **Alta** | Solo términos significativos |

#### M24 · Árboles de regresión y bosques aleatorios (P3, por confirmar)
| Concepto | Fuentes | Ej. | R | Prioridad — evidencia | Detalle observado |
|---|---|---|---|---|---|
| Leer un árbol (`rpart`) para predecir | PR-P3-E P3a; PR-P3-Q3 a | sí (nota 5,8) | `rpart`, `print(árbol)`, `rpart.plot` | **Alta** | |
| Poda con `printcp` y regla 1-SE (xerror mín + xstd) y `plotcp` | PR-P3-E P3b–d; PR-P3-Q3 b–d | sí (0,76782+0,035251=0,803071 ⇒ 4 divisiones; nota 5,4) | `printcp`, `plotcp` | **Alta** | |
| Bosque aleatorio y predicción; comparación de modelos con RSS en muestra de validación | PR-P3-E P3e–f; PR-P3-Q3 e–f | sí (5,96) | `randomForest(ntree=500, importance=TRUE)`, `predict` | **Alta** | |


### Scripts y ayudantías: qué hace cada bloque de código

| ID | Bloques | Funciones usadas | Clase/slide que ejercita |
|---|---|---|---|
| S5.1 (`5.1 …Ejemplos R.R`, 116 líneas; duplicado exacto `…R(1).R`) | 1 datos 8 empresas (l.15–28); 2 binarios Jaccard (l.36–48); 3 `scale` + `dist` (l.56–58); 4 single (l.65–69); 5 complete (l.76–86); 6 centroide + `aggregate` (l.93–100); 7 Ward (l.108–116) | `data.frame`, `dist(method=euclidean/manhattan/maximum)`, `ade4::dist.binary`, `scale`, `hclust(single/complete/centroid/ward.D2)`, `plot`, `cutree`, `aggregate`, `par(mfrow)` | C5.1 s8, s11, s14, s25, s28, s30, s32 |
| S5.2 (73 l.) | 0 datos; 1 `kmeans(centers=3, nstart=25)`, `fviz_cluster` (l.25–36); 2 `ClusterR::KMeans_rcpp(initializer="kmeans++")` (l.43–45); 3 `cluster::diana` + `cutree(k=3)` (l.52–62); 4 Ward vs DIANA (l.69–73) | `kmeans`, `factoextra::fviz_cluster`, `ClusterR`, `diana` | C5.2 s9, s28 (no contiene codo ni silueta) |
| S6.1 (42 l.) | datos Ademuz (l.15–21); `MASS::lda` (l.28–30); `predict`, `table`, accuracy (l.37–42) | `lda`, `predict`, `table`, `diag` | C6.1 s21 (no contiene LOO) |
| S6.2 (79 l.) | 1 `biotools::boxM` (l.31–34); 2 `qda` (l.41–47); 3 `e1071::naiveBayes` + `$apriori`, `$tables`, `type="raw"` (l.55–69); 4 LOO `lda(CV=TRUE)` (l.76–79) | `boxM`, `qda`, `naiveBayes`, `predict(type="raw")` | C6.2 s4, s5, s14, s20 |
| S7.2 (47 l.) | 1 ANOVA 4 métodos `aov` + `summary` (l.15–27); 2 MANOVA iris `manova`, `summary(test="Wilks")`, `boxM`, `summary.aov` (l.35–47) | `aov`, `manova`, `summary.aov` | C7.2 s9, s33 (no contiene `TukeyHSD`) |
| AY3-R (`Ayudantia 3 2026-20 Pauta R.R`, 288 l.; copia exacta en `ayudantias/`) | Problema 2: `prcomp(scale.=TRUE)`, `summary`, `sdev^2`, `screeplot`, `abline(h=1)`, `rotation`, `pca$x` (l.21–118); Problema 3: `cortest.bartlett`, `KMO`, `fa(nfactors=2, rotate="varimax", fm="ml")` (l.130–205); P4 restaurant `fa` 4 factores (l.208–259); P5 `t.test(antes-2, despues, alternative="greater", paired=T)` y manual (l.264–283) | `prcomp`, `psych::fa`, `KMO`, `cortest.bartlett`, `t.test(paired)`, `pt` | C3 s20–25; C4.1 s18–20; C4.2 s15–18; C2 s34 |
| AY5-R (`Ayudantia 5 2026-20 Pauta R.R`, 254 l.; copia exacta en `ayudantias/`) | P1 Manhattan + single/complete/**average** (l.13–62); P2 min–max con `scale(center=min, scale=rango)` + centroide (l.75–86); P3 binarios con `dist(manhattan)` (=Hamming) + `diana` (l.104–129); P4 clientes: min–max, euclídea, single, `kmeans`+`set.seed`, codo con `for`, `silhouette` (l.155–251) | `hclust(average)`, `scale(center, scale)`, `apply`, `diana`, `as.hclust`, `silhouette` (paquete `cluster`) | C5.1 s8, s20–32; C5.2 s9–18, 20–28 |
| AY1-R (`Ayudantia 1 2026-20 Pauta.R`, 172 l.; solo en `ayudantias/`) | Parte I intro R (l.6–87); Parte II: matriz de correlación desde Σ (l.97–111), t de correlación (l.120–126), Bartlett manual (l.131–137), covarianza/correlación/`scale` de datos de viaje (l.143–172) | `summary`, `plot`, `barplot`, `hist`, `psych::describe`, `qt`, `qchisq`, `det`, `log`, `cov`, `cor`, `scale` | C1 s9–26, s27–31, s40–42 |

> **Nota de calidad en AY1-R (l.121):** `tval <- r23*sqrt((n-2)/1-r23^2)` tiene el paréntesis distinto de la fórmula del enunciado `t = r·√((n−2)/(1−r²))` (el código resta r² dentro de la raíz en vez de dividir por 1−r²); numéricamente da casi lo mismo (verificado con R: n=100 → 0,6600 vs 0,6614; n=1000 → 2,1061 vs 2,1108; t crítico con 998 gl = 1,962), y la conclusión del comentario (no rechaza con n=100; rechaza con n=1000) es correcta. Ver §3.

---

## §3 Convenciones y contradicciones entre fuentes

> No se concilian: se registran. Regla del `PROMPT_MAESTRO` §1.6: **pautas > slides > scripts** salvo indicación del estudiante.

### 3.1 Umbrales y criterios que difieren
| Tema | Qué dice cada fuente | Observación |
|---|---|---|
| **KMO** | C4.1 s19: ≥0,75 bien, ≥0,5 aceptable, <0,5 inaceptable · C4.2 s15: «KMO global > 0,6 → adecuado» · AY3-R l.133: «se espera Overall MSA > 0,6» · AY4-PPT p10 y AY4-P (a): ≥0,5 aceptable (0,64 «aceptable») · C4.1 s20: 0,61 «adecuado» | Dos umbrales de «aceptable» (0,5 y 0,6) conviven |
| **Cargas «relevantes»** | C3 s22: ≥0,30 relevante, ≥0,40 fuerte · C4.2 s7: > \|0,5\| o > \|0,4\| · AY3-R l.151–154: ≈0,30 débiles, ≥0,5 moderadas, ≥0,7 fuertes · AY4-P: `cutoff = 0.3` | Umbral distinto en PCA y AF |
| **Regla de Kaiser** | C3 s15, C4.2 s4, AY4-PPT p12: λ **>** 1 · AY2-P (a), AY4-P (b): λ **≥** 1 · AY4-PPT p38: válido solo con matriz de correlación · AY3-P (m): con matriz de correlación no todos los λ son >1 | `>` vs `≥` |
| **% de varianza acumulada** | C3 s15: 80 % · C4.2 s5: 75–80 % · AY4-PPT p38: 80–95 % · AY3-P (j): «90–95 %» | |
| **Regla de decisión** | C2 s4 y s14: «p ≤ α → rechaza» · C1 s30, AY2-PPT, AY2-P: «p < α → rechaza» · C4.1 s18 «p < 0,05» | Irrelevante en la práctica salvo p=α exacto |
| **Codo (scree)** | AY2-P (a): «codo en k=2 ⇒ retener 1 componente» · AY4-P (b): «codo en torno a k=4 … retener entre 3 factores» (texto inconsistente) · C4.2 s5: «conservar factores antes del codo» | Criterio de lectura del codo no es uniforme |
| **Qué es H1 / qué se «demuestra»** | C2 s2: H1 = lo que se quiere demostrar · AY2-E P2a/AY2-P: «comprará si se demuestra que la media está centrada en 1 kg» y la pauta pone H0: μ=1 y concluye «puede adquirir» cuando **no** rechaza | La pauta usa «no rechazar H0» como respaldo a la compra; choca con la regla de C2 s2/s3 y con PR-P1-Q1 afirm. 4 (no rechazar ≠ H0 verdadera) |
| **Elección pooled vs Welch** | C2 s33: se recomienda Welch salvo certeza de igualdad (Zimmerman 2004) · C2 s28: pooled si la F previa no rechaza · PR-P1-Q2: pooled porque «el enunciado indica suponga varianzas iguales» | Depende del enunciado |
| **Box's M y elección LDA/QDA** | C6.2 s3: «con muestras pequeñas, preferir LDA aunque Box's M sugiera covarianzas distintas» · AY6-P P3a: Box's M p=0,0494 ⇒ «correspondería QDA»; luego LOO favorece NB/LDA · PR-P2-Q12 Q2b: LDA si covarianzas iguales, QDA si distintas | La pauta de AY6 sigue la regla del test y corrige con LOO |
| **LSD vs Tukey** | C7.2 s10: LSD = confianza individual, Tukey = grupal; C7.2 s18: Tukey menos potente | consistente; PR-P3-Q1 g usa LSD |

### 3.2 Errores internos de una fuente (verificados)
| Fuente | Problema | Verificación |
|---|---|---|
| C6.1 s19 | Dice «Solo 1 error: cliente 7»; la tabla de la misma slide (y s17, y la salida de R en s21) marcan el **cliente 13** | Verificado con R (`lda`): el único error es un Cumplidor clasificado Fallido (fila 13) |
| C6.2 s4 vs s5 | Box's M del Banco de Ademuz: p=**0,8486** (s4) vs «p = **0,544**» (s5) | Calculado con R a mano (χ²=0,8035, gl=3): **p=0,8486**; el 0,544 no se reproduce |
| C6.2 s10 | Texto: «μ=5 y σ=**1,51**» para patrimonio de fallidos; la tabla de la misma slide da σ=2,07 | `dnorm(7,5,2.07)=0,1208` coincide con s11; con 1,51 daría 0,1099 |
| C5.2 s7 | «`kmeans()` usa K-Means++ por defecto (R ≥ 4.x)» | La ayuda de `kmeans` en R 4.6.1 dice que, si `centers` es un número, se eligen **filas distintas al azar** como centros; K-means++ solo aparece en `ClusterR::KMeans_rcpp` (S5.2) |
| C5.1 s32 / S5.1 l.115 | `sum(hc_ward$height)` se presenta como «suma de cuadrados within» (el script lo llama «aproximación») | No es la WSS de `kmeans` |
| C5.1 s20 | Muestra **5** métodos de enlace (incl. **Promedio**) pero no hay slide, ejemplo ni código de Promedio; sí se evalúa (PR-P2-Q12 Q1a, AY5-E P1) | |
| AY1-R l.121 | `tval <- r23*sqrt((n-2)/1-r23^2)`: paréntesis distinto de `t = r√((n−2)/(1−r²))` | Verificado: n=100 → 0,6600 vs 0,6614; n=1000 → 2,1061 vs 2,1108 (crítico 1,962); la conclusión no cambia |
| AY2-PPT p10 y AY4-PPT p10 | «p-value < **0,5**: aceptable» (debería ser 0,05) | |
| AY2-PPT p27 | «H0: μ = **8,3**» pero el código usa `mu0 <- c(8.0, 3.0)` | |
| AY3 | Los archivos se llaman «Ayudantía 3» pero su cabecera dice «**Ayudantía 4** … 27 de agosto de 2026»; `Ayudantía 4` también se titula «Enunciado Ayudantía 4» | Numeración por nombre de archivo en esta tabla |
| AY5-R l.176 | En P4(c) la matriz euclídea se calcula con `dist(datos)` (sin normalizar) aunque (b) construye `datos_norm`; (e)–(g) sí usan `datos_norm` | |
| AY5-P (a) comentario | «C4 y C6 se agrupan primero, y luego se añade C2» (debería ser C5) | |
| AY5-P P2 «Iteración 1» | Las líneas de d(P1,P3) y d(P1,P4) repiten la misma expresión numérica | |
| PR-P3-Q2 | En la fórmula de SSAB figura «(304 + **1269**)» (typo de 269) | Verificado con R: SSA=242, SSB=84,5, SSAB=50; SSE=27 (4 gl); AB p=0,0529 |
| AY4-P (d) | Código `promax_sol <- fa(datos, nfactors = nfac, …)`: `nfac` no está definido en la pauta | |

### 3.3 Notación y código
- **Hipótesis con alternativa**: C2 usa `alternative = "greater"/"less"/"two.sided"`; AY2-PPT repite la tabla (H0 `≥/≤/=`).
- **Matriz de dispersión**: C6.1 s13 usa F (entre) y W (dentro); C7.2 s29 y MANOVA.pdf usan **B** (entre) y **W** (dentro).
- **Tipificación**: C6.1 s14 `x̄_F − x̄_C = (−4, 2)`; el signo de `u` en R (`lda`) difiere del de la slide (C6.1 s16 lo advierte: solo importa la dirección).
- **Funciones de R fuera de las clases** (aparecen solo en ayudantías/pruebas): `psych::describe`, `psych::principal`, `psych::scree`, `GPArotation` (oblimin), `corrplot`, `readxl::read_excel`, `tapply`, `lapply`, `sapply`, `naiveBayes(laplace=)`, `silhouette`, `rpart`, `randomForest`. **Regla de memoria del proyecto:** en las tareas del estudiante solo se usa lo visto en scripts/slides; para la app, estas funciones deben marcarse «de ayudantía/prueba, no de clase».
- **Origen del curso:** las slides de C1 dicen «ING 202610» y los scripts «ICI3104»; las ayudantías dicen «2026-20». Las pruebas pasadas (16-jun-2026 y 1-jul-2026) preceden a las ayudantías de agosto–septiembre 2026.

---

## §4 Hallazgos y preguntas para el estudiante

### 4.1 Herramientas disponibles (paso 3.0)
`pdftotext` y `pdftoppm` (poppler 24.02), `python3` con `python-pptx` y `PIL` (sin `python-docx` ni `PyMuPDF`), `Rscript` (R 4.6.1), `soffice` (LibreOffice, se usó para renderizar C7.2). `psych`, `biotools`, `MASS`, `e1071` **no se instalaron** (no hizo falta): los números críticos se verificaron con base R.

### 4.2 Preguntas que solo puede responder el estudiante
1. **¿PCA y análisis factorial son de P1 o de P2?** El estudiante declaró que son de P1. Pero (a) en pruebas pasadas el **análisis factorial** apareció en la «Prueba 2» (PR-P2-Q3) y el **PCA** en el Examen (PR-EX-Q2); (b) `EJ-P1` y las tres preguntas de `PR-P1-Q*` cubren solo correlación, covarianza y pruebas de hipótesis (**sin PCA/AF**); (c) en las ayudantías de 2026-20, PCA y AF están en AY3 y AY4. *(Mientras no se responda se mantienen en P1 y la prioridad sale de la evidencia.)*
2. **¿T² de Hotelling / Mardia / IC simultáneos (C2 s40–49, AY2-PPT)** son de P1? Están dentro del PPT de pruebas de hipótesis y en la ayudantía 2, pero no en ninguna prueba pasada.
3. **¿La clase 7.1/7.2 (diseño de experimentos, ANOVA de un factor, LSD, Tukey) y MANOVA son de P2?** Supuesto actual: sí (la ayudantía 6 los junta con clasificación). En 2026-10 la «Prueba 3» ya incluía DBCA y factoriales.
4. **P3:** ¿acumulativa o contenido nuevo? Ver §6. ¿Hay que esperar clases de DBCA, factoriales 2^k, fraccionados, superficies de respuesta y árboles?
5. **Condiciones de la prueba:** ¿se puede usar R? ¿hoja de fórmulas? ¿tablas estadísticas? ¿calculadora? (ver §5: los archivos no lo dicen).
6. **Escala 1–7:** ¿cuál es la fórmula de nota, la exigencia y la ponderación P1/P2/P3/Examen? (ningún archivo la contiene).
7. **Material faltante:** enunciados de Prueba 1 y 2; datos `cork.csv`, `notas.xlsx`, `Restaurant.csv`, `datosayudantiafactorial.xlsx`, `maquinas.csv`; scripts de clases 1–4.2 (solo existen en `capitulo-1/`: ¿se copian a `scripts/`?).
8. **`EJ-P1b` y `EJ-P3`** solo listan números de ejercicios de libros: ¿tienes los enunciados?
9. **Naive Bayes con suavizado de Laplace** y `psych::principal`/`rpart`/`randomForest` aparecen en ayudantías/pruebas pero no en clases: ¿entran como contenido evaluable?

### 4.3 Hallazgos
- **Cobertura de pruebas pasadas:** P1 evalúa casi solo M01, M02, M04–M07; P2 (2026-10) evalúa clustering, clasificación (conceptual) y AF; el Examen mezcla clustering, PCA, fraccionado y Box–Behnken; P3 evalúa DBCA, 2², árboles.
- **Contenidos evaluados sin clase subida:** M20–M24 y «validación de un AF por submuestras» (M10). Solo hay menciones en C1 s4 y C7.1 p17.
- **Contenidos de clase sin ninguna evaluación registrada:** M03 (casi todo), L2 y coseno (M04), región de confianza del T² (M08), M19 (MANOVA), tamaño de muestra y residuos (M18), ejemplo numérico de PCA/Ademuz.
- **Notas del orador de C2** (7) explican el código de R de s8, 11, 16, 20, 26, 36 y 53; no contienen contenido nuevo.
- **MANOVA.pdf** reproduce un ejemplo con 30 estudiantes (3 metodologías × 3 notas) y un segundo con datos modificados que viola Box's M (χ²=43,038, gl=12, p<0,001); concluye «MANOVA relativamente robusto con n iguales, interpretar con cautela».
- **Scripts de clase incompletos:** S5.2 no incluye codo ni silueta (sí C5.2 s10–18 y AY5-R); S6.1 no incluye LOO (sí C6.2/S6.2); S7.2 no incluye `TukeyHSD` (sí C7.2 s19).
- **Promedio (average linkage)** se evalúa pero no tiene ejemplo en clases (§3).

---

## §5 Formato de evaluación observado (solo hechos)

**Documentos de prueba disponibles:** pautas de P1 (3 preguntas) y de «Prueba 2» (3 preguntas, sin enunciado); enunciado + pautas de P3 (16-jun-2026); enunciado + pautas del Examen (1-jul-2026). No hay enunciados de P1 ni de P2.

| Prueba | Pregunta | Puntaje observado | Tipo |
|---|---|---|---|
| P1 | Q1 | 6 afirmaciones V/F; «solo la justificación tiene puntaje» (puntos por afirmación no indicados) | V/F con justificación (conceptos de correlación, independencia, error tipo I/II, min–máx) |
| P1 | Q2 | a=2, b=3, c=1 → **6** | Desarrollo con pasos y rúbrica por paso (planteo 0,4; estadístico 0,7–0,8; valor crítico/decisión 0,5–0,6; conclusión 0,4) |
| P1 | Q3 | 0,5+0,5+1+1+1+1+1 → **6** | Interpretación de salidas de R en anexos («use los resultados presentados en el anexo 1/2»; «el código correcto de R (del anexo 2)»); cálculos con valores críticos dados; «dejar expresada la respuesta» (f) |
| «P2» | Q3 | 3.1–3.6, 1 pt c/u → **6** | Interpretación de tablas de un ejemplo de libro (gráfico de sedimentación, cargas rotadas, comunalidad, validación), explicaciones conceptuales y 4 V/F con justificación (0,25 c/u) |
| «P2» | Q1, Q2 | no indicado en la pauta | Q1: clustering (jerárquico average + k-medias k=2, dendrograma, transformación inversa de min–máx, silueta); Q2: argumentación sobre clasificación (matriz de confusión, elegir LDA/QDA/NB) |
| P3 | Q1, Q2, Q3 | **6 + 6 + 6** (enunciado) | Q1 DBCA con tabla ANOVA a completar, valores críticos dados (F0,05(2,6)=5,14; F0,05(3,6)=4,76; t0,025,6=2,447); Q2 efectos e interacción 2², gráficos, ANOVA (2 pts por ítem); Q3 lectura de árbol/`printcp`/bosque desde salida de R en anexo |
| Examen | Q1 | 1,5 + 3 + 1,5 → 6 | Estandarización conceptual, 2 iteraciones de centroide **a mano** con matriz de distancias dada («Fórmulas de referencia» incluidas en el enunciado), interpretación de negocio |
| Examen | Q2 | 6 × 1 pt | PCA: efecto de `center/scale.`, nº de componentes (3 criterios), dibujar scree, interpretar PC1, análisis previo (Bartlett y KMO), ganancia/pérdida |
| Examen | Q3 | 3.1: 1+2; 3.2: 1+1+1 → 6 | Fraccionado 2^(4−1) y Box–Behnken desde salida de R |

**Observaciones sobre el estilo:**
- Las preguntas combinan **desarrollo manual** (fórmulas, tablas, iteraciones de algoritmo) con **lectura de salidas de R** entregadas en el enunciado. Los archivos **no muestran** que se ejecute R durante la prueba ni que se entregue una hoja de fórmulas completa; sí muestran que se entregan **valores críticos** (P3 Q1; `qchisq`, `qf`… como «hint» en ayudantías 4 y 6), **fórmulas de referencia** (Examen Q1) y **anexos con código/salida de R** (P1 Q3, P3 Q3, Examen Q2–Q3).
- Redacción esperada de conclusiones: «Con un nivel de significancia del X %, existe/no existe evidencia estadística suficiente para afirmar que …» + interpretación en el contexto (P1 Q2c, P3 Q1e–f, Examen Q1c).
- Las pautas piden **justificación** incluso en V/F, y suelen puntuar por pasos (hipótesis, estadístico, decisión, conclusión) y por interpretación contextual (p. ej., P3 Q2a: cálculo 1,2 + interpretación 0,8).
- Otros patrones recurrentes: «¿qué valores de la media muestral (o de s²) rechazan H0?» y «probabilidad de no rechazar si el parámetro verdadero es …» (P1 Q3 e–f, EJ-P1 P6–9, AY2-E, AY4-E); decidir «si usar LDA/QDA/NB» (P2 Q2); proponer estrategia de negocio a partir de clústeres (Examen Q1c).
- **Escala 1–7, nota mínima, ponderación entre pruebas/examen y nº de preguntas:** no figuran en ningún archivo (ver §4). Cada pregunta documentada vale **6 puntos**.

---

## §6 Alcance de P3

**Lo que muestran los archivos (sin especular):**
1. `Enunciado Prueba 3` (16-jun-2026) tiene 3 preguntas de 6 pts: **(1)** diseño en bloques completos al azar con ANOVA y LSD, y comparación con un DCA; **(2)** factorial **2²** con 2 réplicas (efectos, interacción, gráficos, ANOVA); **(3)** **árbol de regresión** (`rpart`, poda 1-SE, `printcp`) y **bosque aleatorio** (`randomForest`) sobre calidad de vinos.
2. Las pautas `Pauta Pregunta 1/2/3 - Prueba 3` desarrollan exactamente esas tres preguntas (resultados recalculados con R: DBCA F=9,00 y F_bloque=5,00; 2²: SSA=242, SSB=84,5, SSAB=50; árbol: 1-SE ⇒ 4 divisiones).
3. `Ejercicios preparación - Prueba 3` solo lista ejercicios: **Walpole** 13.38, 13.39, 13.40, 13.46 a, 13.47, 14.1–14.5, 15.6 y **Gutiérrez Pulido & De la Vara, *Análisis y diseño de experimentos*, 2.ª ed.**, cap. 3 (ej. 11 y 12), cap. 4 (10 y 12), cap. 5 (19, 20, 21), cap. 6 (3). El mismo libro es citado en C7.1 (págs. 6, 7, 11, 13, 15), pero **el archivo no dice qué temas cubren esos capítulos**: no se infiere.
4. El **Examen** (1-jul-2026) repite tipos de P3 y añade: fraccionado 2^(4−1) de resolución IV y **Box–Behnken**/punto estacionario, junto con clustering (Q1) y PCA (Q2).

**¿Contenido nuevo o P1+P2?** Por lo observado, las preguntas de P3 evalúan **contenido que no está desarrollado en ninguna clase de `clases/`**: DBCA, factoriales 2^k, fraccionados, superficies de respuesta y árboles/bosques. Lo único relacionado en clases es: el ANOVA de un factor (C7.1/C7.2) como base de la tabla de DBCA y de la comparación con DCA; la prueba LSD (C7.2 s10–17); la definición de bloqueo (C7.1 p17); y menciones de temario en C1 s4 («Diseños factoriales, Bloqueo, Superficies de respuesta, Optimización de procesos», «Árboles de clasificación»).
**Lo que no se puede afirmar:** si la P3 de este semestre es acumulativa; qué clases la cubrirán; el reparto exacto con el Examen. Queda como pregunta §4.2 (4).

**Implicancia para el ROADMAP (Fase 7):** cuando se suban las clases de P3, los módulos M20–M24 de §2 ya tienen la lista de lo que se evaluó antes; la Fase 7 debe completar teoría y fuentes, y decidir si `data/pruebas.js` marca P3 como acumulativa (**preguntar**).
