# Prompt maestro general — Plataforma de estudio interactiva sobre cualquier tema

> **Cómo usar este prompt:** copia todo el texto de abajo, completa la sección "0. DATOS DEL PROYECTO" con tu tema y lo que tengas disponible (puede ser solo el tema, tema + PDFs, tema + información pegada en el prompt, o cualquier combinación), pégalo en una conversación nueva junto con los PDFs que quieras adjuntar (si los tienes), y listo. Sirve tanto para exámenes/certificaciones formales como para aprender cualquier cosa por curiosidad o necesidad ("quiero aprender sobre fotografía analógica", "quiero prepararme para la PSU de matemáticas", "quiero entender cómo funciona el sistema previsional chileno", etc.).

---

Quiero que construyas una **plataforma web interactiva de estudio en HTML, CSS y JavaScript**, completamente funcional y autocontenida, para que pueda aprender/prepararme sobre **[TEMA]**.

## 0. DATOS DEL PROYECTO (completar antes de enviar)

- **Tema general:** [ej: caza menor SAG, fotografía analógica, examen de admisión de historia, sistema previsional chileno, AWS Cloud Practitioner, etc.]
- **Objetivo concreto que quiero lograr:** [ej: aprobar el examen X, dominar la materia Y, entender Z lo suficientemente bien para explicárselo a alguien, prepararme para una entrevista, etc. Si es solo curiosidad/aprendizaje general, dilo también.]
- **¿Es para un examen formal con criterio de aprobación?** [Sí/No. Si es sí, indica el % o nota mínima si lo sabes, y el número de preguntas del examen real si lo sabes. Si no lo sabes, dime que asuma 70% y 30 preguntas por defecto. Si no es un examen formal, la plataforma igual incluirá autoevaluaciones con un criterio de referencia (70% por defecto) solo como indicador de dominio, no como aprobación oficial de nada.]
- **Documentos que voy a adjuntar (opcional):** [lista los PDFs/archivos, con su nombre, año/edición y una frase de qué contiene cada uno. Si no vas a adjuntar ninguno, escribe "Ninguno".]
- **Información que quiero darte directamente en este prompt (opcional):** [pega aquí cualquier texto, apuntes, resúmenes, listas, notas de clase, etc. que quieras que uses como fuente. Puede quedar vacío.]
- **¿Quieres que busques información adicional en internet?** [Sí/No. Por defecto asume que Sí, salvo que el tema sea muy personal/específico a un documento tuyo, en cuyo caso dilo explícitamente.]
- **Idioma de la plataforma:** [ej: español]

---

# 1. JERARQUÍA DE FUENTES — REGLA FUNDAMENTAL

Este prompt está diseñado para funcionar con **cualquier combinación** de fuentes disponibles: puede que tengas PDFs, puede que solo tengas texto pegado en el prompt, puede que no tengas nada más que el nombre del tema. La plataforma debe construirse usando **todo lo que esté disponible**, respetando siempre esta jerarquía de autoridad cuando dos fuentes se contradigan:

**1º PDFs/documentos adjuntos > 2º Información que te di directamente en el prompt > 3º Información obtenida buscando en internet**

Esto significa:

- Si un dato aparece en un PDF que adjunté, ese dato manda, incluso si en internet encuentras algo distinto o más "estándar". No lo reemplaces ni lo "corrijas" con lo que encuentres en la web.
- Si no adjunté PDFs pero te di información directamente en el prompt, esa información tiene prioridad sobre lo que encuentres buscando.
- Usa la búsqueda en internet para **completar, contextualizar y rellenar los vacíos** que ni los PDFs ni el texto del prompt cubran — y también, si no adjunté ningún documento, como fuente principal de contenido.
- Si tengo PDFs, esos documentos son la base de conocimiento principal para todo contenido crítico (definiciones, cifras, fechas, categorías, procedimientos, restricciones, sanciones, etc.). No completes vacíos de los PDFs usando conocimiento general "porque suena correcto" — para eso está el paso de búsqueda en internet, que debe hacerse explícitamente y quedar identificado como tal.
- **NO inventes información** bajo ninguna circunstancia. Si un dato no aparece en ninguna fuente disponible (PDF, prompt, ni resultado de búsqueda), indícalo explícitamente en vez de rellenar el vacío o asumir que es correcto por conocimiento previo tuyo sin verificar.

### Modo de trabajo según lo que tenga disponible

- **Si tengo PDFs:** úsalos como columna vertebral del curso. Complementa con búsquedas en internet donde haga falta profundidad, contexto, ejemplos actuales o información que los PDFs no cubran, siempre marcando qué viene de dónde.
- **Si NO tengo PDFs pero te di texto en el prompt:** usa ese texto como columna vertebral, y complementa con búsquedas en internet de la misma forma.
- **Si NO tengo ni PDFs ni texto, solo el nombre del tema:** construye todo el curso investigando en internet. Antes de generar el contenido final, haz una investigación real y variada (varias búsquedas, fuentes distintas, no te quedes con la primera página que encuentres) para asegurar que el contenido sea correcto, actual y completo. Prioriza fuentes serias, oficiales o reconocidas en el tema por sobre blogs genéricos o contenido de baja calidad.

### Diferencias o contradicciones entre fuentes

Si detectas que dos fuentes se contradicen (dos PDFs entre sí, un PDF vs. lo que dije en el prompt, o cualquier fuente vs. lo que encuentres en internet):

- Identifica la diferencia explícitamente.
- Aplica la jerarquía de arriba para decidir qué mostrar como correcto.
- Si corresponde, prioriza la información más reciente dentro de un mismo nivel de la jerarquía (ej. entre dos PDFs, el más nuevo; entre dos resultados web, el más actualizado).
- NO ocultes la diferencia ni inventes una conciliación entre fuentes que dicen cosas distintas.

Quiero que la plataforma tenga una sección pequeña llamada:

**"⚠️ Información que puede haber cambiado o ser incierta"**

donde señales cualquier dato que requiera especial cuidado, ya sea porque las fuentes se contradicen, porque proviene solo de una búsqueda en internet sin respaldo documental, o porque es un tema que cambia con frecuencia (normativa, precios, versiones de software, etc.).

### Referencias y trazabilidad

Cada concepto importante del curso debe poder indicar su fuente, y de qué nivel de la jerarquía proviene. Por ejemplo:

> Fuente: [Nombre del PDF], pág. 10.

> Fuente: información proporcionada directamente en el prompt.

> Fuente: búsqueda en internet — [nombre del sitio/artículo], [fecha si está disponible].

En las preguntas del examen también quiero saber de qué fuente salió la respuesta, incluyendo si viene de un PDF, del prompt, o de una búsqueda web.

---

# 2. ESTRUCTURA GENERAL DE LA PÁGINA

Quiero una interfaz moderna, limpia y agradable, con una identidad visual coherente con el tema **[TEMA]**, pero sin caer en clichés forzados ni verse genérica.

La página debe tener un menú principal con estas secciones:

### 🏠 Inicio
### 📚 Aprender
### 🎯 Practicar
### 📝 Examen
### 📊 Mi progreso
### 📖 Fuentes

En desktop debe verse muy bien y también debe ser usable desde celular.

No uses frameworks externos si no son necesarios.

Idealmente quiero que todo funcione en **un solo archivo HTML**, incluyendo CSS y JavaScript.

---

# 3. PÁGINA DE INICIO

Crear un dashboard inicial.

Debe mostrar algo como:

## "Aprende [TEMA]"

Subtítulo:

> Aprende la materia, practica con preguntas y sigue tu progreso hasta dominar el tema.

Mostrar tarjetas con:

- Progreso general.
- Último resultado.
- Mejor resultado.
- Preguntas respondidas.
- Módulos completados.

También incluir un botón grande:

**"▶ Continuar estudiando"**

que lleve automáticamente al último módulo que estaba estudiando.

Y otro:

**"📝 Hacer un examen"**

---

# 4. SECCIÓN "APRENDER"

Esta es la parte MÁS IMPORTANTE.

No quiero un resumen plano de texto.

Quiero que conviertas el contenido (de PDFs, del prompt, y/o de tu investigación en internet, según lo que esté disponible) en un curso fácil de estudiar, dividido en módulos.

**Analiza todo lo disponible y define tú mismo la lista de módulos** que mejor organice la materia de **[TEMA]**, agrupando por bloques temáticos lógicos (conceptos fundamentales primero, luego reglas/normativa/teoría según aplique, luego procedimientos o aplicación práctica, luego categorías/elementos específicos del dominio, luego casos, errores comunes o consecuencias si aplica, etc.). Muéstrame la lista de módulos propuesta antes o al inicio del contenido.

## Módulo 1 — Conceptos fundamentales (ejemplo de tratamiento, aplica a todos los módulos)

Para cada concepto clave del tema:

**Definición sencilla → definición formal/técnica (si aplica) → ejemplo → pregunta rápida**

Ejemplo:

> ### ¿Qué es [concepto]?
>
> 🧠 En simple:
> ...
>
> 📖 En profundidad:
> ...
>
> 💡 Ejemplo:
> ...
>
> ❓ Comprueba:
> ...

Para los módulos siguientes, adapta el enfoque a la naturaleza del contenido de cada uno (por ejemplo: reglas y comparativas en tablas, procedimientos como pasos numerados, elementos/categorías del dominio como tarjetas con ficha técnica, casos prácticos como situaciones tipo "¿qué pasa si...?"). Utiliza cuadros comparativos, tablas y tarjetas visuales cuando ayuden a la comprensión.

Si el tema tiene un módulo que naturalmente se presta a fichas individuales de estudio (elementos, categorías, casos, tipos, componentes, vocabulario, etc.), agrega también un **MODO FLASHCARD** para ese módulo:

> ¿Qué es / cuál es?

→ botón **"Mostrar respuesta"** → mostrar nombre/identificación, características clave, datos relevantes, fuente.

Si el tema incluye consecuencias, errores comunes, riesgos o situaciones de "qué pasa si...", dedica un módulo aparte con tarjetas tipo:

> 🚨 **Situación**
>
> ¿Qué ocurre si...?

y explica la respuesta con su fuente.

Si el tema incluye datos que deben memorizarse literalmente (cifras, fechas, plazos, porcentajes, fórmulas, nombres, artículos), destácalos visualmente, por ejemplo:

> ⚠️ **Memoriza este dato:** [cifra/dato clave]

No simplifiques ni alteres los datos exactos que aparecen en las fuentes.

---

# 5. SECCIÓN "LO QUE TENGO QUE MEMORIZAR"

Quiero una página especial con solamente los datos que requieren memoria, organizados en categorías relevantes para el tema (por ejemplo, según corresponda: números clave, fechas, plazos, categorías/tipos, límites, cifras, términos importantes, fórmulas, procedimientos críticos, nombres, etc. — define tú las categorías según lo que encuentres en las fuentes disponibles).

Esto debe funcionar como un "resumen de última hora" antes de un examen o antes de necesitar aplicar lo aprendido.

---

# 6. SECCIÓN "PRACTICAR"

Aquí no quiero exámenes completos todavía.

Quiero preguntas individuales para aprender.

Tipos de preguntas (usa los tipos que tengan sentido para el tema; no todos son obligatorios):

- Alternativas (A, B, C, D).
- Verdadero / falso.
- Identificación de elementos/categorías (si el tema tiene componentes visuales o clasificables).
- "¿Cuál de estas opciones es correcta?"
- "Selecciona todas las correctas".

Después de responder:

- Mostrar inmediatamente si acerté.
- Mostrar la respuesta correcta.
- Explicar por qué.
- Mostrar la fuente (PDF, prompt o búsqueda en internet).
- Mostrar una pequeña explicación de las alternativas incorrectas cuando sea útil.

Registrar si acerté o fallé.

---

# 7. BANCO DE PREGUNTAS

Crear un banco grande de preguntas basado en las fuentes disponibles, respetando la jerarquía PDFs > prompt > internet.

Quiero que las preguntas sean:

- Claras.
- Realistas.
- Variadas.
- No repetitivas.
- Basadas en información verificable, no en suposiciones.

Evita preguntas absurdamente fáciles.

Evita preguntas ambiguas.

### MUY IMPORTANTE

No hagas preguntas cuya respuesta dependa de un dato que no pudiste verificar en ninguna fuente disponible.

Cada pregunta debe tener esta estructura:

```javascript
{
  question: "...",
  options: ["...", "...", "...", "..."],
  correct: 2,
  explanation: "...",
  source: "[Nombre del PDF / 'Información del prompt' / 'Búsqueda en internet: nombre del sitio'], detalle si aplica"
}
```

---

# 8. SECCIÓN "EXAMEN"

Crear un simulador de examen.

Por defecto:

### [N PREGUNTAS — usa el número indicado en "Datos del proyecto", o 30 por defecto]

Todas de alternativas (salvo que el examen real tenga otro formato conocido; si es así, indícamelo en los datos del proyecto).

No mostrar las respuestas durante el examen.

Las preguntas deben seleccionarse aleatoriamente del banco.

Mezclar las alternativas para que la correcta no quede siempre en la misma posición.

Mostrar:

**Pregunta 1 / N**

y una barra de progreso.

Permitir:

- Anterior.
- Siguiente.
- Marcar pregunta.
- Revisar preguntas pendientes.

Al terminar:

## RESULTADO

Mostrar:

**26 / 30**

**86,7%**

### 🟢 APROBADO

o

### 🔴 NO APROBADO

El criterio debe ser el indicado en "Datos del proyecto" (o **70%** por defecto). Si el tema no corresponde a un examen formal, muestra este resultado igualmente como indicador de dominio, aclarando que no es una aprobación oficial de nada.

No redondear de una manera que permita aprobar con menos del mínimo.

Mostrar también:

- Correctas.
- Incorrectas.
- Porcentaje.
- Tiempo utilizado.
- Preguntas que fallé.

---

# 9. MODO EXAMEN DIFÍCIL

Agregar un segundo modo:

### 🔥 "Desafío"

Generar preguntas más difíciles, priorizando:

- Excepciones.
- Diferencias entre conceptos parecidos.
- Cifras y límites específicos.
- Plazos y fechas.
- Casos y situaciones prácticas.
- Preguntas que mezclen dos conceptos.

---

# 10. MODO "SIMULACRO REAL"

Crear un botón:

**🎓 Simulacro oficial**

Este modo debe intentar parecerse lo máximo posible a una evaluación real (si el tema tiene una; si no, a una autoevaluación exigente):

- Mismo número de preguntas que el examen real (definido en "Datos del proyecto").
- Sin pistas.
- Sin explicaciones hasta terminar.
- Preguntas aleatorias.
- Tiempo opcional.
- Resultado final.
- Corrección detallada.

Al terminar mostrar:

> "Si este fuera el examen real con el criterio de aprobación indicado, habrías aprobado/reprobado."

---

# 11. SISTEMA DE PROGRESO

Guardar el progreso utilizando `localStorage`.

Guardar:

- Módulos completados.
- Preguntas respondidas.
- Preguntas acertadas.
- Preguntas falladas.
- Mejor porcentaje.
- Últimos exámenes.
- Fecha de cada examen.
- Tiempo.
- Temas en los que más fallo.

Crear una sección:

## "Mis debilidades"

Por ejemplo:

> ⚠️ Estás fallando mucho en:
>
> 1. [Módulo/tema 1] — 62%
> 2. [Módulo/tema 2] — 68%
> 3. [Módulo/tema 3] — 71%

Y recomendar qué módulo estudiar a continuación.

---

# 12. REPASO INTELIGENTE

Crear un botón:

### 🧠 "Repasar mis errores"

Este modo debe seleccionar principalmente preguntas que anteriormente respondí mal.

También puede priorizar temas con menor porcentaje de aciertos.

---

# 13. SISTEMA DE DOMINIO

Cada módulo debería tener una barra:

**Dominio: 0% → 100%**

El dominio debe calcularse según las preguntas respondidas de ese tema/módulo.

Por ejemplo:

> [Nombre del módulo]: ███████░░░ 72%

Cuando llegue a 90%:

> 🟢 Tema dominado

---

# 14. DISEÑO

Quiero un diseño:

- Moderno.
- Limpio.
- Profesional.
- Muy fácil de leer.
- Responsive.
- Buen uso de tarjetas.
- Buen uso de iconos.
- Tipografía clara.
- Excelente contraste.
- Animaciones suaves, sin exagerar.

Usar una estética visual coherente con el tema **[TEMA]**, sin caer en lo genérico ni en lo excesivamente literal.

No utilizar imágenes externas si no son necesarias.

Si utilizas imágenes de los PDFs (cuando estén disponibles), respeta las imágenes proporcionadas en ellos.

---

# 15. EXPERIENCIA DE USUARIO

Quiero que sea posible estudiar sin perderse.

En cada módulo debe existir:

**← Anterior**

**Siguiente →**

y una barra de progreso.

Al terminar un módulo:

> 🎉 ¡Módulo completado!

y ofrecer:

**Practicar este módulo**

---

# 16. "EXAMEN DE DIAGNÓSTICO"

Al abrir la plataforma por primera vez, ofrecer:

> ¿Quieres saber cuánto sabes?

**Hacer examen diagnóstico**

Mismo número de preguntas que el examen real (o 30 por defecto).

Después:

> Tu nivel inicial es: 63%

Y mostrar las áreas débiles.

---

# 17. CONTROL DE CALIDAD DE LAS PREGUNTAS

Antes de generar el HTML final:

- Revisa todas las preguntas.
- Asegúrate de que exista una sola respuesta claramente correcta.
- No generes alternativas ambiguas.
- No inventes datos.
- Verifica que cada dato provenga de una fuente identificable (PDF, prompt o búsqueda), respetando la jerarquía.
- Incluye la fuente de cada pregunta.

Si una pregunta no puede ser respaldada por ninguna fuente disponible, NO la incluyas.

---

# 18. IMPORTANTE SOBRE LA VIGENCIA DEL CONTENIDO

La plataforma debe dejar claramente visible:

> ⚠️ Esta plataforma es una herramienta de estudio generada a partir de los documentos proporcionados, información entregada directamente y/o búsquedas en internet, y no reemplaza fuentes oficiales o especializadas sobre [TEMA] cuando estas existan.

Además, si detectas que la información de una fuente puede estar desactualizada respecto de otra, o que un dato obtenido solo por internet no tiene suficiente respaldo, marcarlo claramente.

NO presentes como cierto o vigente algo que las fuentes disponibles no permitan afirmar con seguridad.

---

# 19. RESULTADO FINAL

Quiero que me entregues:

### 1. Un único archivo HTML funcional.

Debe abrirse directamente en Chrome sin instalar nada.

### 2. Todo incluido en el mismo archivo:

- HTML
- CSS
- JavaScript
- Banco de preguntas
- Contenido de estudio
- Sistema de progreso
- LocalStorage

No quiero dependencias que requieran instalar Node, Python, npm, etc.

### 3. El código debe estar organizado y comentado.

### 4. Antes de terminar, prueba mentalmente todas las funciones:

- Navegación.
- Botones.
- Preguntas.
- Corrección.
- Puntaje.
- Porcentaje.
- Aprobación.
- LocalStorage.
- Progreso.
- Repaso de errores.
- Examen aleatorio.
- Responsive.

---

# PRIORIDAD

Si tienes que elegir entre hacer una página visualmente espectacular y hacer una herramienta de estudio realmente útil, **prioriza la herramienta de estudio**.

Quiero que después de usar esta plataforma durante unas horas pueda decir:

> "Sé la materia necesaria sobre [TEMA]."

La plataforma debe estar diseñada para **INVESTIGAR → APRENDER → PRACTICAR → FALLAR → REPASAR → VOLVER A INTENTAR → DOMINAR**.

No quiero un simple resumen. Quiero una **verdadera aplicación de aprendizaje**, que use lo mejor de cada fuente disponible respetando siempre la jerarquía PDFs > información del prompt > internet.
