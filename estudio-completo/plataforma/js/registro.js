/* ============================================================================
   registro.js — Registro central de datos.
   Cada archivo de data/ llama a PLATAFORMA.registrar(tipo, objeto | [objetos]).
   Nada de listas "quemadas": menús, filtros, conteos y cobertura se derivan de
   lo que haya registrado. Este archivo también lo usan los verificadores de
   tools/ (corre en Node, por eso no toca el DOM salvo con guardas).
   ========================================================================== */
(function () {
  "use strict";
  var P = (typeof window !== "undefined" ? window : globalThis).PLATAFORMA;

  var TIPOS = ["prueba", "fuente", "modulo", "pregunta", "memorizar", "rlab", "diferencia"];
  /* Tipos de pregunta que la app sabe mostrar y corregir. */
  P.TIPOS_PREGUNTA = {
    "alternativas":     { nombre: "Alternativas",            icono: "🔘" },
    "vf":               { nombre: "Verdadero / Falso",       icono: "⚖️" },
    "multiple":         { nombre: "Selección múltiple",      icono: "☑️" },
    "calculo":          { nombre: "Cálculo",                 icono: "🧮" },
    "interpretacion-R": { nombre: "Interpretar salida de R", icono: "📟" },
    "codigo-R":         { nombre: "Leer / corregir código R", icono: "🔍" },
    "completar-R":      { nombre: "Completar código R",      icono: "✏️" },
    "desarrollo":       { nombre: "Desarrollo",              icono: "✍️" }
  };
  P.ORIGENES = { curso: "Del curso", variacion: "Variación", nueva: "Nueva (IA)" };
  P.PRIORIDADES = ["alta", "media", "baja"];

  var datos = {};
  TIPOS.forEach(function (t) { datos[t] = []; });
  P.datos = datos;
  P.erroresRegistro = [];

  function archivoActual() {
    try { return document.currentScript ? document.currentScript.getAttribute("src") : null; }
    catch (e) { return P._archivoActual || null; }
  }

  /* Registra uno o varios objetos. "desarrollo" es un atajo de pregunta con tipo "desarrollo". */
  P.registrar = function (tipo, obj) {
    var lista = Array.isArray(obj) ? obj : [obj];
    var archivo = archivoActual();
    lista.forEach(function (o) {
      if (!o || typeof o !== "object") { P.erroresRegistro.push("Objeto vacío en " + archivo); return; }
      var t = tipo;
      if (t === "desarrollo") { t = "pregunta"; o.tipo = "desarrollo"; }
      if (!datos[t]) { P.erroresRegistro.push("Tipo desconocido «" + tipo + "» en " + archivo); return; }
      o._archivo = archivo;
      datos[t].push(o);
    });
  };

  /* ── Índices (se construyen una vez, al terminar de cargar) ─────────── */
  var idx = null;
  P.indexar = function () {
    idx = { modulo: {}, pregunta: {}, fuente: {}, prueba: {}, rlab: {}, memorizar: {},
            pregPorModulo: {}, conceptos: {} };
    datos.modulo.sort(function (a, b) { return (a.orden || 0) - (b.orden || 0); });
    datos.prueba.forEach(function (x) { idx.prueba[x.id] = x; });
    datos.fuente.forEach(function (x) { idx.fuente[x.id] = x; });
    datos.rlab.forEach(function (x) { idx.rlab[x.id] = x; });
    datos.memorizar.forEach(function (x) { idx.memorizar[x.id] = x; });
    datos.modulo.forEach(function (m) {
      idx.modulo[m.id] = m;
      (m.conceptos || []).forEach(function (c) { idx.conceptos[c.id] = { concepto: c, modulo: m }; });
    });
    datos.pregunta.forEach(function (q) {
      idx.pregunta[q.id] = q;
      (idx.pregPorModulo[q.modulo] = idx.pregPorModulo[q.modulo] || []).push(q);
    });
    P.idx = idx;
  };

  /* ── Consultas ──────────────────────────────────────────────────────── */
  P.modulo = function (id) { return idx.modulo[id] || null; };
  P.pregunta = function (id) { return idx.pregunta[id] || null; };
  P.fuente = function (id) { return idx.fuente[id] || null; };
  P.prueba = function (id) { return idx.prueba[id] || null; };

  /* Temario de una prueba: sus módulos + (si es acumulativa) los de las anteriores. */
  P.temario = function (pruebaId) {
    var pr = idx.prueba[pruebaId];
    if (!pr) return [];
    var lista = [];
    if (pr.acumulativa === true) {
      datos.prueba.forEach(function (ant) {
        if (ant.orden < pr.orden) lista = lista.concat(ant.modulos || []);
      });
    }
    lista = lista.concat(pr.modulos || []);
    var vistos = {};
    return lista.filter(function (t) { if (vistos[t.id]) return false; vistos[t.id] = 1; return true; });
  };

  /* Conjunto {id:true} de módulos que entran en la selección ("todo" o un id de prueba). */
  P.idsModulos = function (sel) {
    var set = {};
    if (!sel || sel === "todo") {
      datos.prueba.forEach(function (pr) { (pr.modulos || []).forEach(function (t) { set[t.id] = true; }); });
      datos.modulo.forEach(function (m) { set[m.id] = true; });
    } else {
      P.temario(sel).forEach(function (t) { set[t.id] = true; });
    }
    return set;
  };

  /* Módulos con contenido redactado dentro de la selección. */
  P.modulosDe = function (sel) {
    var set = P.idsModulos(sel);
    return datos.modulo.filter(function (m) { return set[m.id]; });
  };

  /* Entradas del temario sin archivo de módulo todavía (para mostrarlas como «pendiente»). */
  P.temarioPendiente = function (sel) {
    var vistos = {}, out = [];
    var pruebas = (!sel || sel === "todo") ? datos.prueba.map(function (p) { return p.id; }) : [sel];
    pruebas.forEach(function (pid) {
      P.temario(pid).forEach(function (t) {
        if (!idx.modulo[t.id] && !vistos[t.id]) { vistos[t.id] = 1; out.push(t); }
      });
    });
    return out;
  };

  P.prioridadDe = function (q) {
    if (q.prioridad) return q.prioridad;
    var m = idx.modulo[q.modulo];
    return (m && m.prioridad) || "media";
  };

  /* Filtro general de preguntas. f = {prueba, modulo, tipos[], prioridad, dificultad, origen,
     desafio, incluirDesarrollo, soloDesarrollo, ids{}}. Las retiradas nunca se sirven. */
  P.preguntas = function (f) {
    f = f || {};
    var set = P.idsModulos(f.prueba);
    return datos.pregunta.filter(function (q) {
      if (q.retirada) return false;
      if (!set[q.modulo]) return false;
      if (f.modulo && q.modulo !== f.modulo) return false;
      if (f.soloDesarrollo) { if (q.tipo !== "desarrollo") return false; }
      else if (!f.incluirDesarrollo && q.tipo === "desarrollo") return false;
      if (f.tipos && f.tipos.length && f.tipos.indexOf(q.tipo) < 0) return false;
      if (f.prioridad && P.prioridadDe(q) !== f.prioridad) return false;
      if (f.dificultad && q.dificultad !== f.dificultad) return false;
      if (f.origen && q.origen !== f.origen) return false;
      if (f.desafio && !(q.desafio || q.dificultad === 3)) return false;
      if (f.ids && !f.ids[q.id]) return false;
      return true;
    });
  };

  P.preguntasDeModulo = function (mid, conDesarrollo) {
    return (idx.pregPorModulo[mid] || []).filter(function (q) {
      return !q.retirada && (conDesarrollo || q.tipo !== "desarrollo");
    });
  };
})();
