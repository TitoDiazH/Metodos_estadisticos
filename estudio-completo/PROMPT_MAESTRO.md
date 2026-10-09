# PROMPT MAESTRO — Plataforma de estudio de Métodos Estadísticos (Pruebas 1, 2 y 3)

> **Cómo se usa:** este archivo es la **especificación estable** de la app. No se ejecuta entero de una vez.
> El trabajo avanza por **fases** definidas en `ROADMAP.md`. En un chat nuevo, di
> *"ejecuta la Fase N del ROADMAP.md"*; el agente lee `ROADMAP.md`, este prompt y solo lo que esa fase pide.
> Reglas de convivencia: si `ROADMAP.md` y este prompt discrepan en **cómo trabajar** (orden, tamaño de pasos), manda `ROADMAP.md`;
> si discrepan en **cómo debe ser la app o el contenido**, manda este prompt.

---

## 0. DATOS DEL PROYECTO

- **Curso:** Métodos Estadísticos para la Gestión, Universidad de los Andes, semestre 2026-20. Idioma de la app: español (de Chile).
- **Objetivo:** una única plataforma web de estudio **100 % offline** para preparar las **Pruebas 1, 2 y 3**, que crece a medida que se suben más clases.
- **Reparto de la materia (declarado por el estudiante):**
  - **P1:** lo que cubre `capitulo-1/` (según los PPT: correlación, pruebas de hipótesis, componentes principales, análisis factorial; el detalle exacto lo fija `CONTENIDOS.md`).
  - **P2:** análisis de conglomerados (clustering), clasificación supervisada y ANOVA/MANOVA (incluye la introducción a diseño de experimentos si `CONTENIDOS.md` lo confirma).
  - **P3:** **no definido todavía.** Puede ser acumulativa (P1 + P2) o contenido nuevo. Las clases de P3 aún no están subidas. No supongas nada: en `CONTENIDOS.md` se registra lo que las pautas/enunciados de P3 permitan *demostrar*, y el resto queda "por confirmar".
- **Formato de las pruebas reales:** de **desarrollo con R**, nota en **escala 1–7** (dato del estudiante; los tipos de pregunta exactos, puntajes y si se usa R en el computador los debe documentar `CONTENIDOS.md` §5 a partir de las pautas, sin inventar).
- **Criterio de aprobación y N° de preguntas del simulacro:** *no confirmados.* Valores por defecto **configurables en un único lugar** (`js/config.js`): `NOTA_APROBACION = 4,0` (escala 1–7), `PORCENTAJE_APROBACION = 50` (confirmado por el estudiante el 2026-10-08, junto con la nota 4,0), `N_PREGUNTAS_EXAMEN = 30`. Documenta que son supuestos.
- **Carpetas (ruta base `estudio-completo/`):**

| Carpeta / archivo | Qué es |
|---|---|
| `clases/` | PPT/PDF de las clases (fuente principal de teoría) |
| `ayudantias/` | Enunciados, pautas, PPT y scripts R de ayudantías |
| `scripts/` | Scripts R de clases y ayudantías |
| `pruebas-y-ejercicios/` | Pautas de pruebas pasadas y ejercicios de preparación (definen el *estilo* de evaluación) |
| `ROADMAP.md` | Fases, estado y registro de avance |
| `CONTENIDOS.md` | **Mapa de contenidos** (lo genera la Fase 3): inventario de fuentes con ID, contenidos, prueba a la que pertenece, convenciones, hallazgos |
| `plataforma/` | La app (la crea la Fase 4; la puebla con contenido la Fase 5 y con preguntas la Fase 6) |

- **Referencia, no fuente de verdad:** `../capitulo-1/repaso/` es la app anterior (solo P1). Sirve de **inspiración** (secciones, UX, laboratorio R, contenido ya redactado para P1), pero se rediseña (ver §2). **No se modifica ni se borra.** Si se reutiliza contenido de ahí, se **re-verifica contra las fuentes** y se re-etiqueta con el esquema de este prompt.
- Los archivos `*Zone.Identifier` y los duplicados exactos (p. ej. `…(1).R`) se ignoran como fuentes independientes; `CONTENIDOS.md` anota los duplicados.

---

## 1. REGLAS DE FUENTES Y HONESTIDAD (prevalecen sobre cualquier otra cosa)

1. **El material del curso manda.** Los contenidos de cada prueba son los de `CONTENIDOS.md`, construido solo con `clases/`, `ayudantias/`, `scripts/` y `pruebas-y-ejercicios/`.
2. **Internet está permitido, con etiqueta:**
   - para **aclarar o enriquecer** la explicación de un tema que **ya está** en el curso;
   - para **verificar** una fórmula o resultado;
   - para **descargar librerías** (KaTeX) una sola vez durante el desarrollo.
   Todo lo que venga de afuera se marca visiblemente "🌐 fuente externa" y se cita con título, URL y fecha de consulta. **No se amplía el temario**: si algo no está en el curso, no entra como contenido de estudio (puede ir como nota "🌐 para saber más", claramente aparte y sin preguntas que dependan de eso).
3. **Preguntas y ejercicios nuevos: SÍ permitidos** (el estudiante lo autorizó). Se pueden crear **variaciones** de ejercicios existentes (otros datos, otro contexto, otra pregunta sobre la misma salida de R) y preguntas **nuevas** sobre conceptos del curso. Reglas:
   - Todo ítem lleva `origen`: `"curso"` (tomado de una pauta/ejercicio/slide), `"variacion"` (derivado de uno existente; campo `base` con su cita) o `"nueva"` (creada por IA sobre un concepto del curso).
   - Los **números** de variaciones y preguntas nuevas se **calculan** (con R si está instalado —verifícalo con `which Rscript`— o con Python/Node) y el script de verificación queda en `tools/`. **Nunca** inventes una salida de R: o la ejecutas o la tomas de un archivo del curso.
   - Deben poder resolverse **con lo que enseña el curso**; una pregunta que solo se resuelve con material externo no entra al banco.
4. **No inventes ni rellenes vacíos.** Si algo no está claro en ninguna fuente, dilo explícitamente y regístralo en `CONTENIDOS.md` §4 (hallazgos/preguntas para el estudiante). Si necesitas un dato del estudiante, **pregunta**; no asumas.
5. **Conserva las condiciones exactas** (supuestos de cada prueba, requisitos como $np\ge5$, umbrales, criterios de decisión, "bajo la hipótesis de…"). Eso es lo que se evalúa.
6. **Contradicciones entre fuentes** (slide vs. pauta vs. script; convenciones de signo, nomenclatura, umbrales como KMO/cargas/silueta): no las ocultes ni las concilies por tu cuenta; muéstralas en una sección **"⚠️ Diferencias entre fuentes"** y usa la convención del **material de la prueba correspondiente** (pautas > slides > scripts si no hay otra indicación; si hay duda, pregunta).
7. **Código R de la app:** primero lo que aparece en los scripts/slides del curso. Si un ejemplo usa algo que no está en el curso, se marca "🌐" y no se presenta como lo esperado en la prueba.
8. **Trabajo por pasos pequeños** (anti-alucinación): abre y lee **cada fuente** antes de afirmar algo de ella; trabaja un módulo/archivo a la vez; cita solo lo que abriste y verificaste (si no confirmaste la página/slide, cita el documento sin inventar el número).

---

## 2. ARQUITECTURA (diseñada para crecer: más pruebas, más módulos, miles de preguntas)

### 2.1 Restricciones técnicas

- `plataforma/index.html` debe abrirse con **doble clic (`file://`) en Chrome**, sin servidor, internet ni instalación.
- **Prohibido** `fetch()`/XHR de archivos locales y `<script type="module">`/`import`. Sí se permiten `<script src>` clásicos y la **inyección dinámica de `<script>`** (funciona en `file://`).
- Rutas relativas; fuentes tipográficas del sistema; iconos emoji/SVG inline; sin frameworks (solo KaTeX local en `vendor/katex/`).
- Código en español comentado, ordenado, sin duplicación. `localStorage` con prefijo `me-estudio:`, todo en `try/catch`, esquema **versionado** y migraciones; la app funciona aunque no haya `localStorage`.

### 2.2 Estructura de carpetas (un archivo por módulo → agregar contenido = agregar archivos)

```
plataforma/
  index.html                 ← entrada; carga núcleo + loader
  LEEME.md                   ← qué es, cómo abrir, cómo agregar un módulo/clase/preguntas
  css/                       ← base, layout, componentes, tema, impresion
  js/                        ← config, registro, loader, store, router, render-*, quiz, examen, progreso, latex, fuentes-ui, rlab-ui, app
  data/
    manifiesto.js            ← GENERADO por tools/generar_manifiesto.js (lista de archivos de datos)
    pruebas.js               ← definición de P1/P2/P3 (id, nombre, módulos, acumulativa, estado)
    fuentes.js               ← inventario de fuentes por ID (ruta relativa, tipo, página/slide)
    modulos/mNN-slug.js      ← contenido de Aprender de UN módulo
    preguntas/mNN-slug.js    ← banco de preguntas de UN módulo (puede partirse en mNN-slug-b.js…)
    memorizar/mNN-slug.js    ← fórmulas, umbrales, tablas, flashcards del módulo
    rlab/…                   ← recetario R y lectura de salidas (por tema)
    desarrollo/mNN-slug.js   ← preguntas de desarrollo con rúbrica
  vendor/katex/              ← KaTeX local (anota la versión en LEEME.md)
  tools/                     ← generar_manifiesto, verificar_datos, verificar_latex, verificar_fuentes, verificar_numeros, cobertura
```

- Cada archivo de `data/` **se auto-registra** en un espacio global (`window.PLATAFORMA.registrar("pregunta", {...})` o equivalente). El **loader** lee `manifiesto.js` e inyecta los scripts en orden. **Agregar contenido nuevo no debe exigir tocar `js/`**: se crea el archivo en `data/…`, se corre `node tools/generar_manifiesto.js` y listo.
- Nada de conteos ni listas de módulos "quemados" en el código: todo (menús, filtros, conteos, dominio, cobertura) se deriva de los datos registrados.

### 2.3 Modelo de datos (esquema mínimo; el agente puede ampliarlo, pero no romper estos campos)

**Módulo (Aprender):**
```javascript
{ id: "m07-anova-un-factor", orden: 7, titulo: "ANOVA de un factor",
  pruebas: ["P2"],                 // puede ser varias; "P3" si se reutiliza
  prioridad: "alta",               // alta | media | baja  (criterio documentado en CONTENIDOS.md)
  fuentes: [ {id:"C7.1", loc:"slides 3–20"} ],
  conceptos: [ /* ver §4 */ ] }
```
**Pregunta:**
```javascript
{ id: "m07-q012",                  // ÚNICO y ESTABLE: el progreso depende de él. Nunca se reutiliza ni se renumera.
  modulo: "m07-anova-un-factor",
  pruebas: ["P2"],
  prioridad: "alta",
  tipo: "alternativas",            // alternativas | vf | multiple | calculo | interpretacion-R | codigo-R | completar-R | desarrollo
  dificultad: 2,                   // 1 fácil · 2 media · 3 difícil
  desafio: false,
  origen: "curso",                 // curso | variacion | nueva   (+ base: [{id,loc}] si es variacion)
  enunciado: "…con LaTeX…",
  salidaR: "…texto monoespaciado de la salida real…",   // opcional
  codigoR: "…",                                          // opcional
  opciones: ["…","…","…","…"], correcta: 2,              // índice o arreglo (multiple)
  explicacion: "…paso a paso…",
  distractores: ["","","",""],     // por qué cada incorrecta lo es (opcional por opción)
  fuente: [ {id:"C7.2", loc:"slide 14"}, {id:"AY5", loc:"P2b"} ],
  retirada: false }                // true = ya no se sirve pero se conserva el id
```
**Pruebas (`data/pruebas.js`):** `{ id:"P3", nombre:"Prueba 3", estado:"sin definir"|"parcial"|"definida", acumulativa:null|true|false, modulos:[…] }`. Una prueba "acumulativa" hereda los módulos de las anteriores sin duplicar contenido.

### 2.4 Selector global de prueba

La app tiene un selector **"Estudiando para: P1 · P2 · P3 · Todo"** (persistente). Filtra módulos, preguntas, examen, progreso, dominio y debilidades. Si P3 aún está "sin definir", la app lo dice claramente y no muestra contenido inventado.

### 2.5 Rendimiento y escala

- Diseñada para **cientos de módulos-conceptos y miles de preguntas**: selección, filtrado y barajado sin recorrer el DOM; render por vistas; listas largas paginadas.
- Los IDs de pregunta jamás cambian (si una se corrige, se edita; si se elimina, se marca `retirada`).

---

## 3. LaTeX (offline) — igual que antes, aplicado a estadística

- Fórmulas en LaTeX con **KaTeX local** (`katex.min.js`, `katex.min.css`, `contrib/auto-render.min.js`, `fonts/` con rutas relativas). Descargar una sola vez; anotar versión.
- Delimitadores `$…$` / `$$…$$` (o `\(…\)`); en strings JS escapar `\\` o usar `String.raw`. Renderizar al montar **y** tras cada cambio dinámico. Las **opciones** y las **explicaciones** también pueden llevar LaTeX.
- `tools/verificar_latex.js` compila todas las fórmulas de `data/` con `throwOnError:true`; debe terminar sin errores. Notación **consistente con las slides** (p. ej. $\bar x$, $\mu_0$, $S_p^2$, $\lambda_i$, $\Lambda$ de Wilks…).

## 4. CITAS (cada cosa dice de dónde sale)

- Todo concepto, fórmula, ejemplo, tabla y **toda pregunta** muestra su fuente ("📎 Fuente: …"); en preguntas, **después de responder**.
- IDs de fuente: los define `CONTENIDOS.md` §1 (esquema sugerido: `C<nº clase>` clases, `AY<n>` ayudantías, `S<…>` scripts R, `PR<…>` pruebas/pautas, `EJ<…>` ejercicios de preparación). Formato de cita: `{id, loc}` con `loc` = slide / página / pregunta / líneas del script. Externas: `{id:"EXT", titulo, url, consultado}`.
- `data/fuentes.js` mapea cada ID a su archivo **relativo** (`../clases/…`) para enlaces "abrir fuente" (`…pdf#page=N`; para PPT/R/docx: nombre + slide/líneas). La sección **📖 Fuentes** lista todo con ID, tipo, prueba(s) y estado.
- `tools/verificar_fuentes.js`: todo `id` citado existe en `fuentes.js`; toda pregunta/concepto tiene ≥1 fuente (las `origen:"nueva"` citan la fuente del *concepto*).

---

## 5. SECCIONES DE LA APP

Menú: **🏠 Inicio · 📚 Aprender · 🧾 Memorizar · 💻 Laboratorio R · 🎯 Practicar · ✍️ Desarrollo · 📝 Examen · 📊 Mi progreso · 📖 Fuentes** (+ "⚠️ Diferencias entre fuentes", buscador, modo claro/oscuro con `prefers-color-scheme`, tema accesible, usable en celular, imprimible en Memorizar).

### 5.1 Inicio
Dashboard por prueba seleccionada: progreso general, último/mejor resultado, preguntas respondidas, módulos completados, **"▶ Continuar estudiando"**, **"📝 Hacer un examen"**, **debilidades** y siguiente módulo sugerido. Aviso visible de alcance y de qué pruebas están definidas (P3 pendiente) y de qué supuestos son configurables.

### 5.2 Aprender (lo más importante: un curso, no un PDF pegado)
Módulos derivados de `CONTENIDOS.md` (cada módulo indica a qué clases/ayudantías corresponde, su prueba y prioridad). Por concepto:

> **En simple → Definición formal (LaTeX, símbolos definidos) → Ejemplo (idealmente el de la clase/ayudantía, paso a paso) → Cómo se hace en R → Cómo se lee la salida → Comprueba (mini-pregunta) → 📎 Fuente**

Además: supuestos y cuándo usar cada método (árboles de decisión: qué prueba/técnica elegir), **errores frecuentes** (extraídos de pautas), tablas comparativas, diagramas SVG inline donde aporten (scree plot, dendrograma, matriz de confusión, ROC…), flashcards en módulos que se presten, casos "¿Qué pasa si…?", y "⚠️ Memoriza este dato". Navegación anterior/siguiente, índice interno, barra de avance, "Practicar este módulo".

### 5.3 Memorizar
Resumen de última hora por prueba: **fórmulas, umbrales/criterios de decisión, tablas de decisión, funciones de R clave y qué devuelven, interpretación de salidas**. Cada ítem con fuente; CSS de impresión limpio.

### 5.4 Laboratorio R
Recetario y **lectura de salidas**: fragmentos de código de los scripts del curso con su **salida real** (ejecutada o tomada del curso, nunca inventada) y guía de interpretación. No ejecuta R en el navegador. Reutiliza la idea de `capitulo-1/repaso/js/rlab.js`, reorganizada por tema y prueba.

### 5.5 Practicar
Filtros: prueba, módulo, prioridad, tipo, dificultad, origen, "marcadas", "falladas". Tipos: alternativas, V/F con justificación, selección múltiple, **cálculo**, **interpretación de salida de R**, **lectura/corrección de código R**, completar código. Retroalimentación inmediata: correcta, por qué, por qué las otras no, fuente. Marcar para repasar.

### 5.6 Desarrollo (formato de la prueba real)
Preguntas abiertas al estilo de las pautas. **El estudiante las resuelve en papel** (decisión del estudiante, 2026-10-08): la app no tiene cuadro de texto. Cada pregunta se divide en **partes** (los pasos o incisos que la pauta puntúa), cada una con su solución y su puntaje. Todas parten **ocultas** y se **desbloquean una a una**: al abrir una parte se muestra su solución y se pregunta «¿la tuviste correcta?» (sí/no); recién entonces se habilita la siguiente. El avance se guarda en `localStorage`. Al corregir todas las partes muestra una **nota estimada 1–7** con los puntos de las partes correctas (los puntajes salen de las pautas; si no se conocen, la app usa una regla simple y lo indica). Esquema: `partes: [{titulo, solucion, puntos}]`; el título se ve antes de abrir y no debe revelar el resultado.

### 5.7 Examen / Desafío / Simulacro / Diagnóstico
- **Examen:** `N_PREGUNTAS_EXAMEN` aleatorias del banco de la prueba elegida, ponderadas por prioridad, sin repetir, alternativas barajadas (reajustando `correcta`), sin mostrar respuestas hasta el final, navegación, marcar/revisar. Resultado con aciertos, porcentaje, **nota 1–7**, aprobado/no según `config.js` (comparar con números exactos, sin redondeo que permita aprobar de más), tiempo, falladas con explicación y fuente, desglose por módulo/prioridad.
- **🔥 Desafío:** `dificultad 3`/`desafio:true`: supuestos y excepciones, diferencias entre conceptos parecidos, mezcla de dos temas, interpretación de salidas de R ambiguas.
- **🎓 Simulacro:** cronómetro opcional; aclara que la prueba real es de desarrollo y sugiere ✍️ Desarrollo.
- **Diagnóstico** al primer uso (por prueba): nivel inicial y áreas débiles con enlaces a módulos.

### 5.8 Progreso, repaso y dominio
`localStorage`: respondidas/aciertos/fallos por `id`, mejores resultados, exámenes con fecha y tiempo, desempeño por módulo/prioridad/prueba, respuestas de desarrollo y autoevaluación, último módulo, preferencias (tema, prueba, N, cronómetro). **Exportar/importar JSON** y reiniciar (con confirmación). **Mis debilidades**, **🧠 Repasar mis errores** (prioriza falladas, módulos más flojos, repetición espaciada simple) y **Dominio 0–100 %** por módulo (pondera recientes, exige mínimo de preguntas distintas; ≥90 % = 🟢 dominado). Las preguntas `retirada` no cuentan. Si se agregan preguntas, el dominio se recalcula sin corromper el historial.

### 5.9 Diseño y UX
Moderno, limpio, legible, contraste excelente, responsive (fórmulas anchas con scroll propio), accesible por teclado, hash-routing (`#/aprender/m07-…`) que funciona en `file://`, identidad visual propia del tema estadístico (sin clichés). Pie fijo:

> ⚠️ Herramienta de estudio basada en el material del curso (clases, ayudantías, scripts y pruebas pasadas) y, donde se indica, en fuentes externas o en ejercicios generados por IA. No reemplaza las indicaciones del docente ni confirma el temario real de cada prueba.

---

## 6. CONTROL DE CALIDAD (obligatorio; los verificadores viven en `tools/` y se ejecutan antes de dar algo por terminado)

1. **Contra las fuentes:** cada afirmación/pregunta se comprobó contra el curso (o está marcada externa/nueva).
2. **Una sola respuesta correcta** y sin ambigüedad (cuidado con "siempre", "nunca", "garantiza").
3. `verificar_numeros` (recalcula cálculos y salidas), `verificar_datos` (ids únicos, `correcta` en rango, campos obligatorios, `modulo` y `pruebas` existentes, fuente no vacía, origen válido), `verificar_fuentes`, `verificar_latex`, `cobertura` (por módulo y por clase/ayudantía: conceptos y preguntas; **ningún concepto de `CONTENIDOS.md` sin cobertura**).
4. **Offline:** ningún `http(s)://` cargando recursos fuera de `vendor/`.
5. **No amplía el temario** ni mezcla pruebas: lo que no está en el curso no entra como estudio.
6. **Prueba funcional** (navegador headless si existe; si no, revisión cuidadosa): navegación y hash, selector de prueba, todos los tipos de pregunta, examen, umbral exacto, progreso, `localStorage` y reinicio, LaTeX en todas las vistas, enlaces de fuente, tema claro/oscuro, impresión, móvil y escritorio, **agregar un módulo y preguntas de prueba sin tocar `js/`**.

## 7. PRIORIDAD

Entre una app vistosa y una herramienta **correcta y útil**, gana la segunda: ninguna fórmula, salida de R ni cita inventada. El estudiante debe poder decir, tras usarla: *"sé qué técnica corresponde a cada problema, la aplico en R, leo la salida y la interpreto como lo pide la pauta."*

Ciclo: **APRENDER → PRACTICAR → FALLAR → REPASAR → DOMINAR → APROBAR.**
