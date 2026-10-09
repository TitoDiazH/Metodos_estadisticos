# Plataforma de estudio — Métodos Estadísticos (P1 · P2 · P3)

App web **100 % offline** para preparar las pruebas del curso. Se abre con doble clic en `index.html` (Chrome, `file://`): sin servidor, sin internet, sin instalar nada.

> Especificación: `../PROMPT_MAESTRO.md` · Plan de trabajo: `../ROADMAP.md` · Mapa del curso: `../CONTENIDOS.md`.

## Qué trae hoy (Fase 6, primera pasada)

Contenido de estudio completo para P1 y P2: **19 módulos** (M01–M19), 93 conceptos, 138 ítems de Memorizar, 35 recetas del Laboratorio R y 18 diferencias entre fuentes. **Banco de preguntas:** 370 preguntas (cálculo, interpretación y completar/leer código R, alternativas, V/F, múltiple) y 156 desarrollos por partes con solución paso a paso, todos con cálculos y salidas de R verificados. Aún no se alcanzan las metas de cantidad en 12 módulos de prioridad alta (ver `../ROADMAP.md`, Fase 6). Los módulos M08 (T²), M17 y M18 (DDE/ANOVA) llevan un aviso «por confirmar» y P3 figura «sin definir».

## Cómo está armada

```
plataforma/
  index.html        entrada: carga núcleo → data/manifiesto.js → js/loader.js
  css/              base (tema), layout, componentes, impresion
  js/               config · registro · util · store · progreso · motor · vistas-* · app · loader
  data/             ← TODO el contenido vive aquí (un archivo por módulo)
    manifiesto.js   GENERADO: lista de archivos de data/
    pruebas.js      P1/P2/P3 y su temario        fuentes.js   inventario de fuentes por ID
    modulos/  preguntas/  desarrollo/  memorizar/  rlab/  diferencias/
  vendor/katex/     KaTeX 0.16.11 local (fórmulas)
  tools/            generador, verificadores, prueba funcional y plantillas
```

- Cada archivo de `data/` **se registra solo**: `PLATAFORMA.registrar("modulo" | "pregunta" | "desarrollo" | "memorizar" | "rlab" | "diferencia" | "prueba" | "fuente", {…})`.
- Menús, filtros, conteos, dominio y cobertura **se derivan de lo registrado**. Agregar contenido **nunca** exige tocar `js/`.
- Los valores configurables (nota de aprobación 4,0, exigencia 50 %, 30 preguntas por examen, minutos del simulacro, pesos por prioridad, reglas de dominio) están en **un solo lugar**: `js/config.js`. Los marcados «SUPUESTO» no están confirmados por ningún archivo del curso.
- El progreso se guarda en `localStorage` (clave `me-estudio:estado`, esquema versionado) **por ID de pregunta**. Por eso los IDs no se cambian jamás.

## Verificar (siempre, antes de dar algo por terminado)

Requiere Node 22 y, para comprobar las salidas de R, `Rscript`.

```bash
cd estudio-completo/plataforma
node tools/verificar_todo.js        # manifiesto + datos + fuentes + latex + números + cobertura
node tools/prueba_funcional.js      # usa la app completa en Chrome sin interfaz (114 comprobaciones)
```

| Herramienta | Qué garantiza |
|---|---|
| `generar_manifiesto.js` | Reescribe `data/manifiesto.js`. **Correr al agregar, renombrar o borrar** un archivo de `data/`. |
| `verificar_datos.js` | IDs únicos, campos obligatorios, `correcta` en rango, huecos = `___` del código, módulo/prueba/origen válidos, manifiesto al día, nada cargado desde internet. |
| `verificar_fuentes.js` | Toda cita apunta a un ID de `fuentes.js`; todo concepto/pregunta/ítem tiene fuente; cada archivo existe en disco con ese nombre exacto. |
| `verificar_latex.js` | Compila todas las fórmulas con KaTeX y `throwOnError`. Detecta `$` sin pareja. |
| `verificar_numeros.js` | Recalcula cada `verifica`; exige que toda pregunta de cálculo esté recalculada; **ejecuta en R** cada receta y cada `salidaDe` y compara con la salida escrita. Guarda un caché en `tools/.cache_r.json` (`--sin-cache` lo ignora). |
| `cobertura.js` | Cruza con `CONTENIDOS.md` §2: falla si un módulo redactado deja filas sin cubrir. `--filas M13` lista las filas con su código. `--estricto` falla mientras quede temario pendiente. |
| `prueba_funcional.js` | Navegación, figuras de Aprender, selector de prueba, todos los tipos de pregunta, examen y umbral exacto, desarrollo, progreso, tema, móvil, impresión, enlaces y «agregar un módulo sin tocar `js/`». Busca Chrome en `CHROME`, `~/.cache/ms-playwright` o el sistema; si no hay, avisa y no falla. |

## Cómo agregar contenido

Regla de oro: **abrir la fuente antes de escribir**, un módulo a la vez, y verificar al terminar. Nada de fórmulas, salidas de R ni citas de memoria.

### Más preguntas de desarrollo (variantes para practicar)

Los archivos `data/desarrollo/*-b.js` los escribe `tools/generar_desarrollos.js` a partir de plantillas (`tools/generadores/`): una plantilla por tipo de ejercicio (prueba t, Welch, Bartlett, jerárquico a mano, K-medias, DIANA, Fisher, Naive Bayes, ANOVA, LSD…) que calcula todos los pasos con los datos que se le pasan. Para sumar otra variante, agrega una llamada **al final** de la función `mNN()` del módulo (cambiar el orden cambiaría los IDs y se perdería el progreso) y corre:

```bash
node tools/generar_desarrollos.js && node tools/generar_manifiesto.js && node tools/verificar_todo.js
```

El generador se detiene si los datos son malos para practicar (empates, estadístico pegado al valor crítico, etc.).

### Un módulo nuevo (Fase 5)

1. Mira qué debe cubrir: `node tools/cobertura.js --filas M12`.
2. Copia `tools/plantillas/modulo.js` a `data/modulos/m12-jerarquico-aglomerativo.js`. El `id` debe ser **el mismo** que ya figura en el temario de `data/pruebas.js`.
3. Redacta cada concepto (en simple → formal → ejemplo → R → lectura → comprueba → fuente) y declara en `cubre` las filas de `CONTENIDOS.md` que desarrolla. Las filas que no se desarrollan van en `sinCobertura` con su motivo.
4. Copia `tools/plantillas/memorizar.js` y `rlab.js` a `data/memorizar/` y `data/rlab/` con el mismo nombre.
5. Si hay contradicciones entre fuentes para ese módulo (`CONTENIDOS.md` §3), agrégalas en `data/diferencias/` (un archivo nuevo o en `base.js`).
6. `node tools/verificar_todo.js` y corrige hasta que pase.

### Figuras de Aprender

Un concepto puede llevar `figura: { tipo, pie, donde, …datos }` (o una lista). `donde` es `"formal"` (por defecto, tras la definición) o `"ejemplo"`. La figura se dibuja en el navegador con `js/figuras.js` (estáticas) y `js/figuras-vivas.js` (interactivas), a partir de **los mismos datos del ejemplo**, así que no hay imágenes que mantener. Regla: solo donde ayude a entender, y siempre con `pie`.

| Tipo | Qué muestra | Datos |
|---|---|---|
| `cuadrantes` | Covarianza como rectángulos de desviaciones | `x`, `y`, `ejes`, `unidad` |
| `nube` | Nube con deslizador de r (`modo: "correlacion"`) o normal bivariada con ρ, σ₁, σ₂ (`modo: "normal"`) | `r` |
| `distancias` | Euclídea vs. Manhattan | `a`, `b` |
| `regionRechazo` | Región de rechazo y p-valor (Z) | `cola`, `alfa`, `z` |
| `tStudent` | t vs. normal según grados de libertad | `gl` |
| `potencia` | α, β y potencia (media, σ conocida, bilateral) | `mu0`, `mu1`, `sigma`, `n`, `rango`, `rmu1`, `rsigma` |
| `arbol` | Árbol de decisión | `nodos`, `aristas`, `ancho`, `alto` |
| `elipseConfianza` | Región de confianza de μ (p = 2) e intervalos simultáneos | `x1`, `x2`, `mu0`, `critT2`, `cT2`, `cBonf`, `intervalos` |
| `proyeccion` | Proyección sobre una dirección: PCA (`modo: "varianza"`) o Fisher (`modo: "fisher"`, con `grupos`, `nombres`) | `x`, `y`, `ejes`, `atajos` |
| `sedimentacion` | Scree plot con línea de Kaiser | `valores`, `acumulado`, `kaiser` |
| `planoCargas` | Loadings como flechas | `variables`, `max`, `ejes` |
| `diagramaFactorial` · `rotacion` | Modelo factorial con h²/ψ · giro de los ejes | `factores`, `variables` |
| `dendrograma` | Dendrograma paso a paso (`pasos`, `enlace`, `textos`) o con corte (`corte`) | `hojas`, `fusiones`, `puntos` |
| `enlaces` · `fronteras` · `residuos` · `manovaIdea` · `silueta` | Esquemas sin datos | — |
| `kmedias` | K-medias paso a paso (calcula el algoritmo) | `puntos`, `iniciales` |
| `agrupacion` | Clústeres dados paso a paso (DIANA) | `puntos`, `pasos` |
| `confusion` | Matriz de confusión y métricas | `pos`, `neg`, `vp`, `fn`, `fp`, `vn` |
| `kfold` · `bloques` | K-fold · bloqueo y aleatorización | `k` · `bloques`, `tratamientos`, `ordenes` |
| `anova` | SC total, entre y dentro | `grupos`, `ejeY` |

Para un tipo nuevo: `F.tipo("nombre", function (lienzo, parámetros, estado) { … })` en `js/figuras*.js`. `verificar_datos.js` rechaza tipos desconocidos y figuras sin pie; `prueba_funcional.js` dibuja todas y mueve sus controles.

### Preguntas (Fase 6)

1. Copia `tools/plantillas/preguntas.js` a `data/preguntas/mNN-slug.js` (lotes de 10–15; si el archivo crece, `mNN-slug-b.js`). Desarrollo: `tools/plantillas/desarrollo.js` → `data/desarrollo/`; se resuelve en papel y se escribe como `partes` (título + solución + puntos) que la app desbloquea una a una, así que cada parte debe ser un paso que la pauta puntúe por separado.
2. IDs `mNN-q001`, `mNN-d001`… **únicos y estables**. Para eliminar una pregunta se marca `retirada: true`; no se borra ni se reutiliza su id.
3. `origen`: `"curso"` (de pauta/ejercicio/slide), `"variacion"` (con `base`) o `"nueva"`.
4. Todo cálculo lleva `verifica`; toda salida de R mostrada lleva `salidaDe` (el código que la produce) o `salidaFuente: "curso"` si se copió textual de un archivo del curso.
5. `node tools/verificar_todo.js`.

### Una clase o prueba nueva (Fase 7, p. ej. P3)

1. Sube los archivos a `../clases/`, `../ayudantias/`, etc. y actualiza `../CONTENIDOS.md` (§1 IDs, §2 conceptos, §6).
2. Agrega cada archivo a `data/fuentes.js`. **Copia el nombre con `ls`**: varios usan tildes descompuestas y un nombre tipeado a mano no abre.
3. En `data/pruebas.js`: cambia `estado`, define `acumulativa` (**preguntar al estudiante**) y pasa los temas de `observado` a `modulos`. Para que un módulo de P1/P2 entre también en P3, agrega su id a `modulos` de P3: **no se duplica el archivo**.
4. Crea módulos y preguntas como arriba y corre los verificadores.

### Cosas que NO hay que hacer

- No editar `data/manifiesto.js` a mano (se genera).
- No cambiar ni reciclar un `id` de pregunta, concepto o módulo ya publicado.
- No escribir `${` dentro de un `String.raw\`…\`` (JavaScript lo interpreta); ni un `$` suelto fuera de `<code>`.
- No usar `fetch`, módulos ES ni recursos `http(s)`: en `file://` no funcionan y el verificador los rechaza.

## Librerías

- **KaTeX 0.16.11** (MIT) en `vendor/katex/`: `katex.min.js`, `katex.min.css`, `contrib/auto-render.min.js` y `fonts/*.woff2`. Copiado desde `../../capitulo-1/repaso/vendor/katex/`; no se descargó nada.
- Sin frameworks ni otras dependencias. Fuentes tipográficas del sistema.
