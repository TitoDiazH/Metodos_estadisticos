# ROADMAP — App de estudio de Métodos Estadísticos (P1 · P2 · P3)

> Este archivo manda sobre **cómo se trabaja** (orden, tamaño de los pasos, qué modelo). `PROMPT_MAESTRO.md` manda sobre **cómo debe ser la app y el contenido**.
> Una fase = uno o más chats nuevos. Al empezar un chat: *"ejecuta la Fase N del ROADMAP.md"*. Al terminar cada paso, el agente **actualiza este archivo** (casilla + registro de avance).

## Reglas de trabajo para todas las fases (anti-alucinación)

1. **Leer antes de afirmar:** se abre cada fuente antes de escribir algo sobre ella. Nada "de memoria".
2. **Pasos pequeños:** un archivo / módulo / lote de preguntas a la vez; guardar a disco al terminar cada uno (no acumular todo en contexto).
3. **Si falta un dato, preguntar.** No asumir (P3, criterio de aprobación, formato de pruebas, etc.).
4. **Verificar siempre:** correr los verificadores de `plataforma/tools/` (desde Fase 4) y reportar el resultado real, también si falla.
5. **No tocar** `capitulo-1/`, `tarea_1/`, `tarea_2/` ni el material fuente (`clases/`, `ayudantias/`, `scripts/`, `pruebas-y-ejercicios/`).
6. **Cada fase termina** con: casillas marcadas, registro de avance, y una lista breve de "pendientes / preguntas para el estudiante".

## Resumen de fases

| # | Fase | Modelo | Estado |
|---|---|---|---|
| 1 | Crear `ROADMAP.md` | — | ✅ hecha |
| 2 | Actualizar `PROMPT_MAESTRO.md` a este propósito | — | ✅ hecha (pendiente tu revisión) |
| 3 | Leer todo el material y crear `CONTENIDOS.md` | **Sonnet** | ✅ hecha (pendiente 3.7: tu revisión) |
| 4 | Crear la base funcional de la app | **Opus** | ✅ hecha (pendiente tu revisión) |
| 5 | Poblar Aprender / Memorizar / Laboratorio R | Sonnet | ✅ hecha (pendiente tu revisión) |
| 6 | Poblar con preguntas | **Sonnet** | 🟡 primera pasada hecha (370 preguntas + 11 desarrollos); faltan metas de cantidad en 12 módulos |
| 7 | *(recurrente)* Incorporar clases nuevas (P3) | Sonnet (+ Opus si cambia la arquitectura) | ⬜ cuando subas material |

> Orden decidido por el estudiante: primero el contenido de estudio (Fase 5) y después las preguntas (Fase 6), para que las preguntas se apoyen en módulos ya redactados.

---

## Fase 1 — Crear ROADMAP.md ✅

- [x] Archivo creado (este documento).

## Fase 2 — Actualizar PROMPT_MAESTRO.md ✅

- [x] Eliminado todo lo de Deep Learning (Resumen, módulos, IDs de cita, PyTorch…).
- [x] Reescrito para Métodos Estadísticos: P1/P2/P3, formato de desarrollo + R, escala 1–7, preguntas nuevas/variaciones permitidas (con campo `origen`), internet permitido con etiqueta.
- [x] Arquitectura escalable: un archivo de datos por módulo, auto-registro, `manifiesto.js` generado, selector de prueba, IDs estables.
- [X] **Tu revisión** y respuesta a las preguntas abiertas (abajo).

---

## Fase 3 — Leer el material y crear `CONTENIDOS.md` (Sonnet)

**Objetivo:** un mapa fiel de *qué se enseña* y *en qué archivo está*, que será la base de todo lo demás.
**Entrada:** `clases/` (12), `ayudantias/` (16), `scripts/` (8), `pruebas-y-ejercicios/` (17). Referencia solo para contraste de P1: `../capitulo-1/`.
**Salida:** `estudio-completo/CONTENIDOS.md`.

**Estructura obligatoria de `CONTENIDOS.md`:**
- **§1 Inventario con IDs:** cada archivo con ID de cita (esquema en PROMPT §4), tipo, prueba(s), nº de slides/páginas, estado (núcleo / complemento / duplicado / ilegible) y duplicados detectados.
- **§2 Contenidos:** módulos → conceptos. Para cada concepto: prueba (P1/P2/P3/por confirmar), archivos y slides/páginas/líneas donde aparece, si tiene ejemplo numérico, si tiene código R, si aparece en pautas/ejercicios de pruebas pasadas (**ese "peso en pruebas pasadas" justifica la prioridad alta/media/baja**), y supuestos/criterios exactos.
- **§3 Convenciones y contradicciones entre fuentes** (notación, umbrales, signos).
- **§4 Hallazgos y preguntas para el estudiante** (qué no se pudo determinar; p. ej. alcance de P3).
- **§5 Formato de evaluación observado:** tipos de pregunta, puntajes, escala, uso de R, estilo de redacción, a partir de las pautas y enunciados. Solo hechos observados.
- **§6 Alcance de P3:** qué muestran `Enunciado Prueba 3`, `Pauta Pregunta 1/2/3 - Prueba 3` y `Ejercicios preparación - Prueba 3`; si apunta a contenido nuevo o a P1+P2. Sin especular.

**Pasos (cada uno = guardar y marcar):**
- [x] 3.0 Revisar herramientas disponibles (`pdftotext`, `pdftoppm`, python `zipfile`/`python-pptx`, `Rscript`) y anotarlas en §4. Crear el esqueleto de `CONTENIDOS.md` con casillas por archivo.
- [x] 3.1 Clases P1 (1, 2, 3, 4.1, 4.2): leer slide por slide; escribir sus conceptos en §2.
- [x] 3.2 Clases P2 (5.1, 5.2, 6.1, 6.2, 7.1, 7.2, MANOVA.pdf).
- [x] 3.3 Scripts R (8): qué hace cada bloque, funciones usadas, a qué clase/slide corresponde.
- [x] 3.4 Ayudantías 1–6 (enunciados, pautas, PPT, R): conceptos que ejercitan y qué clase cubren.
- [x] 3.5 Pruebas y ejercicios: formato (§5), conceptos evaluados, peso por concepto; **§6 alcance de P3**.
- [x] 3.6 Consolidar: reparto por prueba, prioridades, duplicados, contradicciones (§3), lista de preguntas para el estudiante (§4). Verificar que **todo archivo del inventario** aparece asociado a ≥1 contenido (o marcado como no aplicable).
- [X] 3.7 Revisión del estudiante.

**Terminada cuando:** ningún archivo queda sin asociar, cada concepto tiene prueba asignada (o "por confirmar") y fuente concreta, y §4/§6 listan lo no resuelto.

---

## Fase 4 — Base funcional de la app (Opus)

**Objetivo:** la arquitectura completa funcionando, con **contenido mínimo de prueba**, para que las fases siguientes solo agreguen archivos de datos.
**Entrada:** `PROMPT_MAESTRO.md`, `CONTENIDOS.md`, referencia `../capitulo-1/repaso/` (para ver qué conservar y qué mejorar: archivos monolíticos de ~1000+ líneas, listas quemadas, sin selector de prueba).
**Salida:** `estudio-completo/plataforma/` (estructura de PROMPT §2.2).

- [x] 4.0 Análisis breve de `capitulo-1/repaso` (qué reutilizar, qué rediseñar) y **plan de implementación** corto escrito en este ROADMAP (abajo). Decisiones abiertas: se avanzó con los supuestos ya documentados; quedan listadas al cierre.
- [x] 4.1 Núcleo: `index.html`, `config`, registro de datos, loader + `manifiesto.js` + `tools/generar_manifiesto.js`, `store` (localStorage versionado), router por hash, KaTeX local.
- [x] 4.2 Selector de prueba (P1/P2/P3/Todo) y datos `pruebas.js`, `fuentes.js` (con IDs de `CONTENIDOS.md`).
- [x] 4.3 Vistas: Inicio, Aprender, Memorizar, Laboratorio R, Fuentes, Diferencias entre fuentes (+ buscador).
- [x] 4.4 Motor de preguntas con **todos los tipos** (incluye interpretación/lectura/completar R), Practicar con filtros, Desarrollo por partes desbloqueables y nota 1–7.
- [x] 4.5 Examen, Desafío, Simulacro, Diagnóstico; Progreso, debilidades, repaso de errores, dominio, exportar/importar.
- [x] 4.6 Diseño (claro/oscuro, móvil, impresión).
- [x] 4.7 Datos de ejemplo: **1 módulo real por prueba definida** (M01 para P1, M13 para P2; P3 está «sin definir» y no lleva contenido) + ≥1 pregunta de cada tipo.
- [x] 4.8 Verificadores en `tools/` (datos, latex, fuentes, números, cobertura) ejecutados y pasando; prueba funcional completa (PROMPT §6.6) **incluyendo agregar un módulo/preguntas nuevos sin tocar `js/`**.
- [x] 4.9 `LEEME.md` con el procedimiento "cómo agregar un módulo / preguntas / una clase nueva" y **plantillas** (`tools/plantillas/`) de módulo, pregunta, memorizar, desarrollo y rlab.

**4.0 — Análisis de `capitulo-1/repaso` y plan seguido**

| De la app anterior | Decisión |
|---|---|
| Secciones (Inicio, Aprender, Memorizar, R, Practicar, Examen, Progreso, Fuentes), camino «en simple → en profundidad», recetario R, flashcards, KaTeX 0.16.11 local | **Se conserva** la idea y la librería (copiada a `vendor/katex/`). |
| `content.js`/`content2.js`/`questions*.js` monolíticos (880–1255 líneas) con HTML pegado | **Rediseñado:** un archivo por módulo en `data/` que se auto-registra; contenido con campos (simple, formal, ejemplo, r, lectura, comprueba…). |
| Listas de scripts quemadas en `index.html`, `MODULES`/`QUESTIONS` globales | **Rediseñado:** `data/manifiesto.js` generado + `js/loader.js`; menús, filtros y conteos se derivan del registro. |
| Sin selector de prueba; solo 3 tipos de pregunta (mcq, vf, multi); fuente como texto libre | **Nuevo:** selector P1/P2/P3/Todo con temario en `data/pruebas.js`; 8 tipos (incl. cálculo, interpretación/lectura/completar R y desarrollo con rúbrica); citas `{id, loc}` contra `data/fuentes.js`. |
| Aprobación 70 % fija en `app.js`; `localStorage` sin versión; IDs `q001` globales | **Nuevo:** todo en `js/config.js`; estado versionado con migraciones; IDs por módulo (`m13-q007`) estables. |
| `serve.py`/`serve.sh` | **Eliminado:** abre con doble clic (`file://`), sin servidor. |
| Sin verificación automática | **Nuevo:** 5 verificadores + prueba funcional en Chrome sin interfaz. |

**Resultado de la verificación (2026-10-08):** `node tools/verificar_todo.js` → todo en verde (3 pruebas, 2 módulos, 11 conceptos, 27 preguntas, 428 fórmulas compiladas, 21 cálculos recalculados, **9 salidas de R comparadas con una ejecución real** en R 4.6.1, cobertura 5/5 y 7/7 filas de `CONTENIDOS.md` en los módulos redactados). `node tools/prueba_funcional.js` → **112 de 112** comprobaciones (tras los cambios pedidos por el estudiante). Además se sembraron 18 errores a propósito (respuesta alterada, salida de R inventada, id duplicado, cita inexistente, LaTeX roto, fila sin cubrir…): los verificadores detectaron los 18.

**No verificado:** la app se probó en Chromium sin interfaz sobre Linux, no en tu Chrome de Windows (falta tu doble clic real); la impresión se comprobó por reglas CSS, no en papel; los emojis del menú no se pudieron ver (ese Chromium no trae fuente de emojis).

**Terminada cuando:** abre con doble clic offline, los verificadores pasan, y el procedimiento de agregar contenido está probado y documentado.

---

## Fase 5 — Poblar Aprender / Memorizar / Laboratorio R (Sonnet)

**Objetivo:** el contenido de estudio completo y fiel a las fuentes, módulo por módulo.
**Entrada:** `CONTENIDOS.md`, `plataforma/LEEME.md` y plantillas, fuentes de cada módulo. P1 puede apoyarse en `capitulo-1/repaso/js/content*.js`, `memoria.js`, `rlab.js` **solo como borrador**: se re-verifica contra las fuentes y se re-etiqueta (decídelo con el estudiante al iniciar).
**Método (por módulo, nunca todo junto):**
1. Leer en `CONTENIDOS.md` el módulo y abrir **sus** fuentes.
2. Crear `data/modulos/mNN-slug.js` (conceptos con esquema del PROMPT §5.2: en simple, formal, ejemplo, R, lectura de salida, comprueba, fuente), `data/memorizar/mNN-slug.js` y `data/rlab/…` (código del curso con salida real, nunca inventada).
3. Correr verificadores y `cobertura`; corregir; marcar el módulo.

- [x] 5.0 Decidir (2026-10-08: migrar y re-verificar; en la práctica se redactó desde las slides y se usó el borrador solo como guía) con el estudiante: migrar P1 desde `capitulo-1/repaso` o redactar de nuevo.
- [x] 5.1 Módulos P1 (uno por uno, tabla de avance abajo).
- [x] 5.2 Módulos P2.
- [x] 5.3 Memorizar y Laboratorio R por prueba; sección "Diferencias entre fuentes".
- [x] 5.4 Verificadores en verde; todo concepto de `CONTENIDOS.md` cubierto.

| Módulo | Prueba | Aprender | Memorizar | Lab R | Verificado |
|---|---|---|---|---|---|
| M01 Covarianza y correlación | P1 | ✅ | ✅ | ✅ | ✅ |
| M02 Matrices y Bartlett | P1 | ✅ | ✅ | ✅ | ✅ |
| M03 Normal multivariada | P1 | ✅ | ✅ | ✅ | ✅ |
| M04 Escalamiento y distancias | P1 | ✅ | ✅ | ✅ | ✅ |
| M05 Hipótesis: una población | P1 | ✅ | ✅ | ✅ | ✅ |
| M06 Hipótesis: dos poblaciones | P1 | ✅ | ✅ | ✅ | ✅ |
| M07 Errores y potencia | P1 | ✅ | ✅ | ✅ | ✅ |
| M08 T² de Hotelling | P1 (confirmado) | ✅ | ✅ | ✅ | ✅ |
| M09 PCA | P1 | ✅ | ✅ | ✅ | ✅ |
| M10 Análisis factorial | P1 | ✅ | ✅ | ✅ | ✅ |
| M11 Conglomerados: distancias | P2 | ✅ | ✅ | ✅ | ✅ |
| M12 Jerárquico aglomerativo | P2 | ✅ | ✅ | ✅ | ✅ |
| M13 K-medias | P2 | ✅ (Fase 4) | ✅ | ✅ | ✅ |
| M14 DIANA | P2 | ✅ | ✅ | ✅ | ✅ |
| M15 LDA | P2 | ✅ | ✅ | ✅ | ✅ |
| M16 QDA, NB, validación | P2 | ✅ | ✅ | ✅ | ✅ |
| M17 Introducción al DDE | P2 (por confirmar) | ✅ | ✅ | — (la clase no trae código R) | ✅ |
| M18 ANOVA de un factor | P2 (confirmado) | ✅ | ✅ | ✅ | ✅ |
| M19 MANOVA | P2 | ✅ | ✅ | ✅ | ✅ |

**Terminada cuando:** cada concepto de `CONTENIDOS.md` de P1/P2 tiene explicación con fuente, y no hay fórmulas ni salidas sin verificar.

---

## Fase 6 — Poblar con preguntas (Sonnet)

**Objetivo:** banco grande, correcto y bien citado.
**Entrada:** `CONTENIDOS.md`, `plataforma/LEEME.md` y plantillas, los módulos ya redactados en Fase 5 y las fuentes que citan.
**Método (por módulo, nunca todo junto):**
1. Leer en `CONTENIDOS.md` y en `data/modulos/` el módulo ya redactado, y abrir **sus** fuentes.
2. Crear `data/preguntas/mNN-slug.js` en lotes (≈10–15 preguntas por lote), mezclando: preguntas `curso` (de pautas/ejercicios), `variacion` (nuevos datos, **calculados**) y `nueva` (sobre conceptos del curso). Cubrir todos los tipos que apliquen al módulo.
3. Correr los verificadores tras cada lote; corregir; marcar el lote.
4. Actualizar la tabla de avance (abajo).

**Metas orientativas** (se ajustan al peso en pruebas pasadas de `CONTENIDOS.md`): módulos prioridad alta ≥ 25 preguntas, media ≥ 15, baja ≥ 8; ≥ 30 % cálculo/interpretación de R; ≥ 3 desarrollos con rúbrica por módulo alto; cada concepto de `CONTENIDOS.md` con ≥ 2 preguntas.

**Tabla de avance** (estado al 2026-10-08; «Meta» = mínimo orientativo según prioridad; % = preguntas de cálculo/interpretación/código R):

| Módulo | Prueba | Prioridad | Preguntas (meta) | % cálculo/R | Desarrollo (meta ≥3 en alta) | Verificado |
|---|---|---|---|---|---|---|
| M01 Covarianza y correlación | P1 | alta | 25 (25 ✅) | 56 % | 1 | ✅ |
| M02 Matrices y Bartlett | P1 | alta | 20 (25) | 60 % | 0 | ✅ |
| M03 Normal multivariada | P1 | baja | 11 (8 ✅) | 55 % | 0 | ✅ |
| M04 Escalamiento y distancias | P1 | alta | 18 (25) | 56 % | 0 | ✅ |
| M05 Hipótesis: una población | P1 | alta | 23 (25) | 52 % | 2 | ✅ |
| M06 Hipótesis: dos poblaciones | P1 | alta | 19 (25) | 68 % | 1 | ✅ |
| M07 Errores y potencia | P1 | alta | 17 (25) | 53 % | 1 | ✅ |
| M08 T² de Hotelling | P1 | media | 16 (15 ✅) | 44 % | 0 | ✅ |
| M09 PCA | P1 | alta | 24 (25) | 50 % | 1 | ✅ |
| M10 Análisis factorial | P1 | alta | 27 (25 ✅) | 48 % | 0 | ✅ |
| M11 Conglomerados: distancias | P2 | alta | 18 (25) | 56 % | 0 | ✅ |
| M12 Jerárquico aglomerativo | P2 | alta | 18 (25) | 44 % | 1 | ✅ |
| M13 K-medias | P2 | alta | 23 (25) | 43 % | 2 | ✅ |
| M14 DIANA | P2 | alta | 16 (25) | 44 % | 0 | ✅ |
| M15 LDA | P2 | alta | 18 (25) | 56 % | 1 | ✅ |
| M16 QDA, NB, validación | P2 | alta | 25 (25 ✅) | 44 % | 0 | ✅ |
| M17 Introducción al DDE | P2 (por confirmar) | baja | 13 (8 ✅) | 15 % ⚠️ | 0 | ✅ |
| M18 ANOVA de un factor | P2 | alta | 24 (25) | 63 % | 1 | ✅ |
| M19 MANOVA | P2 | baja | 15 (8 ✅) | 40 % | 0 | ✅ |
| **Total** | | | **370 preguntas + 11 desarrollos** | | | ✅ |

Por origen: 189 `curso`, 50 `variacion`, 131 `nueva`. Por tipo: 115 cálculo, 108 alternativas, 52 V/F, 43 interpretación de R, 23 múltiple, 21 completar R, 8 código R.

**Actualización 2026-10-08 (lote B de desarrollos):** se agregaron **145 preguntas de desarrollo** con solución paso a paso (total 156; todos los módulos de prioridad alta tienen ≥ 3: M01 5, M02 7, M03 3, M04 9, M05 15, M06 13, M07 8, M08 6, M09 10, M10 7, M11 8, M12 8, M13 12, M14 3, M15 7, M16 13, M17 2, M18 16, M19 4). Son variantes con otros datos/casos de los ejercicios tipo, generadas por `plataforma/tools/generar_desarrollos.js` (archivos `data/desarrollo/*-b.js`, no editar a mano): cada número lo calcula el generador (JS + R) y se vuelve a comprobar en `verifica`. La columna «Desarrollo» de la tabla de arriba quedó desactualizada; el punto (2) de abajo está resuelto.

**Lo que NO se cumplió (se deja para una segunda pasada):** (1) 12 módulos de prioridad alta quedan entre 16 y 24 preguntas (meta 25: M02, M04, M05, M06, M07, M09, M11, M12, M13, M14, M15, M18); (2) ningún módulo alto llega a **3 desarrollos con rúbrica** (hay 11 en total; 8 módulos altos tienen 0 o 1); (3) M17 tiene solo 15 % de cálculo/R porque la clase no trae código ni cálculos; (4) los enunciados de las pautas en PDF no se volvieron a abrir en esta fase: las preguntas `curso` reutilizan los datos y resultados ya verificados en los módulos de la Fase 5 (que sí los leyeron), citando la fuente original.

**Terminada cuando:** metas cumplidas, cobertura sin huecos, verificadores en verde y lista de "preguntas excluidas por falta de respaldo" entregada.

---

## Fase 7 — Incorporar clases nuevas (recurrente)

Se usa cada vez que subas material (p. ej. clases de P3). Pasos:
- [ ] 7.1 Subir los archivos a `clases/`, `ayudantias/`, etc.
- [ ] 7.2 Actualizar `CONTENIDOS.md` (nuevos IDs en §1, conceptos en §2, §6 alcance de P3) — solo lo nuevo, leyendo solo lo nuevo.
- [ ] 7.3 Actualizar `data/pruebas.js` (estado y módulos de P3; acumulativa sí/no — **preguntar**).
- [ ] 7.4 Crear módulos y preguntas nuevos como en las Fases 5 y 6; correr `generar_manifiesto` y los verificadores.
- [ ] 7.5 Si P3 incluye módulos de P1/P2, **referenciarlos** (campo `pruebas`), no duplicarlos.

---

## Preguntas abiertas para el estudiante

- ¿P2 incluye diseño de experimentos (clase 7.1) o solo ANOVA/MANOVA? (supuesto: sí)
- ~~¿Nota de aprobación y exigencia?~~ **Respondido 2026-10-08: nota 4,0 con 50 % de exigencia.** Sigue abierto: ¿30 preguntas por examen/simulacro?
- ¿Migramos el contenido P1 de `capitulo-1/repaso` (re-verificado) o se redacta de nuevo? (se decide en 5.0)
- ¿Las pruebas permiten usar R durante la prueba, hoja de fórmulas, tablas estadísticas? (la Fase 3 intentará deducirlo de las pautas)

## Registro de avance

| Fecha | Fase/paso | Qué se hizo | Pendientes |
|---|---|---|---|
| 2026-10-08 | 1 y 2 | ROADMAP creado; PROMPT_MAESTRO reescrito para Métodos Estadísticos | Revisión del estudiante; Fase 3 |
| 2026-10-08 | 3 (3.0–3.6) | Leídos los 53 archivos (12 clases, 16 ayudantías, 8 scripts, 17 pruebas/ejercicios; 3 duplicados exactos). Creado `CONTENIDOS.md`: inventario con IDs (§1), 24 módulos M01–M24 con prioridad por evidencia (§2), contradicciones y errores de las fuentes (varios verificados con R) (§3), preguntas y hallazgos (§4), formato de evaluación (§5), alcance de P3 (§6). | 3.7 revisión del estudiante. Preguntas clave abajo. |
| 2026-10-08 | 4 (4.0–4.9) | Creada `plataforma/` completa: núcleo (config, registro, loader, store, router), 10 vistas, motor de 8 tipos de pregunta, examen/desafío/simulacro/diagnóstico, progreso con dominio y repaso, tema claro/oscuro, móvil, impresión. Datos de ejemplo reales: M01 (P1) y M13 (P2). 5 verificadores + prueba funcional (106/106). `LEEME.md` y 5 plantillas. | Tu revisión abriendo `plataforma/index.html`; preguntas de abajo; Fase 5. |
| 2026-10-08 | 4 (ajustes del estudiante) | Exigencia 50 % → 4,0 (`js/config.js`). PCA y AF confirmados en P1 (`data/pruebas.js`). **Desarrollo rediseñado:** se resuelve en papel; sin cuadro de texto; la pregunta se corrige por `partes` que se desbloquean una a una (solución oculta → «¿correcta?» → siguiente), nota al corregir todas. Esquema de guardado v2 con migración. Actualizados plantilla, verificador, `PROMPT_MAESTRO` §5.6 y prueba funcional (112/112). | T² (P1) y DDE/ANOVA/MANOVA (P2) siguen por confirmar. |
| 2026-10-08 | 5 (5.0–5.4) | Redactados los 17 módulos que faltaban (M02–M12 y M14–M19; M01 y M13 venían de la Fase 4): Aprender (93 conceptos con en simple → formal → ejemplo → R → lectura → error → memoriza → comprueba → fuente), Memorizar (138 ítems), Laboratorio R (35 recetas, la mayoría ejecutables) y 18 «Diferencias entre fuentes». Cada cifra se recalculó (JS/R); toda salida de R es la real. `verificar_todo` en verde (79 cálculos JS, 42 cálculos R, 38 salidas de R comparadas, 2128 fórmulas, 19/19 módulos con cobertura completa) y `prueba_funcional` 112/112. Ajustes de herramientas: `verificar_numeros.js` pasa `R_LIBS_USER` a `Rscript --vanilla` (si no, no encontraba `psych`); `prueba_funcional.js` considera solo módulos con preguntas. | Tu revisión; Fase 6 (preguntas); decidir T²/DDE/ANOVA (abajo). |
| 2026-10-08 | 6 (primera pasada) | Escritos 17 bancos de preguntas nuevos (M02–M12, M14–M19) y lotes `-b` para M01 y M13; 370 preguntas (todos los tipos) + 11 desarrollos (M05×2, M06, M07, M09, M12, M15, M18 y los de M01/M13 de la Fase 4). Todo cálculo se recalculó (JS/R) y toda salida de R es la real. `verificar_todo` en verde (164 cálculos JS, 154 cálculos R, 78 salidas de R comparadas, 3216 fórmulas) y `prueba_funcional` 112/112 (se ajustó un assert que suponía que el banco de P1 solo tenía M01). Corregido un error de la Fase 5 en `data/modulos/m15-lda.js` (el cliente (7,4) con 0,5/0,5: R devuelve `Cumplidor`, no `Fallido`). | Completar las metas de cantidad y desarrollos (ver tabla); preguntas abajo. |

### Pendientes / preguntas para el estudiante (cierre de la Fase 3)
1. ~~**PCA y AF: ¿P1 o P2?**~~ **Respondido 2026-10-08: van en P1.** En pruebas pasadas el AF cayó en «Prueba 2» y el PCA en el Examen; `EJ-P1` y las pautas de P1 no los incluyen (`CONTENIDOS.md` §4.2-1).
2. **T² de Hotelling y ANOVA/DDE/MANOVA:** ¿de qué prueba son? (§4.2-2 y 3).
3. **P3:** lo evaluado antes (DBCA, factoriales 2^k, fraccionados, Box–Behnken, árboles/bosque) **no tiene clase subida**; ¿es acumulativa? (§6).
4. **Condiciones de la prueba** (¿R? ¿fórmulas? ¿tablas?), **escala 1–7**, nota de aprobación y ponderaciones: no están en ningún archivo (§5).
5. **Material faltante:** enunciados de Prueba 1 y 2, datos (`cork.csv`, `notas.xlsx`, `Restaurant.csv`, `datosayudantiafactorial.xlsx`, `maquinas.csv`), scripts de clases 1–4.2 (solo en `capitulo-1/`), enunciados de `EJ-P1b` y `EJ-P3`.
6. **Errores en las fuentes** que la app no debe copiar (p. ej. C6.1 s19 «cliente 7», C6.2 s5 «p=0,544», C5.2 s7 «kmeans usa K-means++», AY: «p<0,5»): ver `CONTENIDOS.md` §3.2.
7. ¿Entran como evaluables las funciones/temas vistos solo en ayudantías o pruebas (Laplace en Naive Bayes, `psych::principal`, `rpart`, `randomForest`)?

### Pendientes / preguntas para el estudiante (cierre de la Fase 4)
1. **Abrir `plataforma/index.html` con doble clic en tu Chrome** y decir si algo no se ve o no funciona (lo único no probado en tu equipo).
2. ~~Nota y exigencia~~ → **4,0 con 50 %** (respondido). Quedan como supuestos: 30 preguntas por examen, simulacro de 60 min y la forma lineal de la escala 1–7.
3. ~~PCA y AF~~ → **P1** (respondido). Siguen abiertos: T² de Hotelling en P1; DDE/ANOVA/MANOVA en P2. Se cambia en `data/pruebas.js`.
4. **Puntajes de las partes de desarrollo:** cuando la fuente no trae puntajes se reparten 6 puntos entre las partes (la app lo dice). ¿Sirve ese criterio para la Fase 6?
5. **Hallazgo nuevo (no estaba en `CONTENIDOS.md` §3):** C5.2 slide 5 estandariza las empresas dividiendo por la desviación con *n*; `scale()` divide con *n − 1* (E1 = −0,74 y no −0,79). Verificado en R; quedó en ⚠️ Diferencias entre fuentes. Convendría agregarlo a `CONTENIDOS.md` §3.2.
6. **Fase 5.0:** ¿migrar P1 desde `capitulo-1/repaso` (re-verificando) o redactar de nuevo? M01 se redactó de nuevo desde las slides, como muestra.

### Pendientes / preguntas para el estudiante (cierre de la Fase 5)
1. **Revisar** los módulos (en `plataforma/index.html` → Aprender) y decir si el estilo sirve antes de la Fase 6.
2. ~~T² (M08) en P1 y ANOVA (M18) en P2~~ **Confirmado 2026-10-08.** Sigue por confirmar: introducción al DDE (M17) en P2. Estilo de la Fase 5 aprobado por el estudiante.
3. **Errores de las fuentes hallados al recalcular** (quedaron en «⚠️ Diferencias entre fuentes»; conviene sumarlos a `CONTENIDOS.md` §3.2): AY2 P5 (la salida de `prcomp` no corresponde a la tabla de datos); C5.1 s11 (conteos a,b,c,d del ejemplo Simple Matching: son a=1,b=1,c=2,d=0 ⇒ 0,75, no 0,5); C6.1 s8 (9/16, no 10/16); C6.2 s5 (Box's M p=0,8486, no 0,544) y s10 (σ=2,07, no 1,51); C2 s31 (crítico de una cola en prueba bilateral); C4.2 s15 (UrbanPop MSA 0,50 en R, no 0,49; el ejemplo pide 2 factores con p=4 y viola k ≤ (p−1)/2); AY2 P2(c) (0,8012 vs 0,7990 por redondeo); PR-P2-Q3 3.1 (suma 4,25301, no 4,25201).
4. **Datos que no están en el repositorio:** `cork.csv` (corteza, M08) y `notas.xlsx` (KMO, M10) se citan con la salida de la slide, sin ejecutarse; los 12 datos del ejemplo de 3 métodos (M18) se leyeron de una imagen de C7.1 pág. 45 (verificar contra el PDF). No se pudo instalar `ade4` ni `biotools`: Jaccard y Box's M se calcularon a mano con las mismas fórmulas.
5. **Material sin respaldo en clases usado a propósito:** suavizado de Laplace (M16.3, viene de AY6) y la validación con dos submuestras del AF (M10.14, solo pauta de la Prueba 2).
6. La slide 18 de C6.1 y varias tablas de C7.1 son imagen: sus fórmulas se escribieron en su versión estándar y se recalcularon.

### Pendientes / preguntas para el estudiante (cierre de la Fase 6, primera pasada)
1. **¿Seguimos con la segunda pasada?** Falta llegar a 25 preguntas en 12 módulos altos y a 3 desarrollos por módulo alto (ver tabla). Se puede hacer módulo por módulo.
2. **Revisar por muestreo** algunas preguntas en `plataforma/index.html` → Practicar (en especial las de interpretación de R y los desarrollos) y decir si el nivel de dificultad y la redacción sirven.
3. **Puntajes de los desarrollos:** como ninguna fuente trae puntajes por parte, se repartieron 6 puntos (lo dice la app). ¿Sirve ese criterio?
4. **Material sin respaldo directo en las clases, usado a propósito:** Laplace en Naive Bayes (M16, sale de la Ayudantía 6), validación del AF con dos submuestras (M10, solo pauta de la Prueba 2), cálculo de β con varianza (M07, ayudantía). Las preguntas lo citan. Dime si no quieres que entren en examen/simulacro.
5. **Supuestos míos que conviene que confirmes:** (a) la pregunta m05-q012 es una variación de AY2 P2(a) con x̄ = 0,9915 para que dé z = −1,90 como la pauta (el x̄ original no está en el material); (b) m08-q016 usa intervalos simultáneos redondeados (12,3–15,5 y 8,4–10,1) coherentes con el T² calculado.
6. **Pendientes de las fases anteriores que siguen abiertos:** DDE (M17) en P2 por confirmar; condiciones de la prueba (R, fórmulas, tablas); P3.
