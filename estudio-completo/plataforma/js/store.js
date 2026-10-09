/* ============================================================================
   store.js — Estado del estudiante en localStorage (prefijo me-estudio:).
   · Esquema versionado con migraciones.
   · Todo en try/catch: si no hay localStorage la app sigue funcionando en memoria.
   · El progreso se guarda por ID de pregunta: agregar o retirar preguntas no lo corrompe.
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA, C = P.config;
  var CLAVE = C.PREFIJO_STORAGE + "estado";
  var S = {};
  P.store = S;

  function vacio() {
    return {
      v: C.VERSION_ESQUEMA,
      prefs: { tema: "auto", prueba: "todo", nExamen: C.N_PREGUNTAS_EXAMEN, crono: true },
      q: {},            // id pregunta → {n, ok, h:[1|0 más reciente primero, máx 5], t: último intento, caja}
      marcadas: {},     // id pregunta → true
      hechos: {},       // id módulo → timestamp de "completado"
      examenes: [],     // {ts, modo, prueba, n, ok, seg, mod:{id:{n,ok}}, pri:{alta:{n,ok}}}
      desarrollo: {},   // id pregunta → {partes:[true|false|undefined por parte], vista: nº de partes ya mostradas, ts}
      diag: {},         // id prueba → timestamp del diagnóstico
      ultimo: null      // id del último módulo abierto
    };
  }

  /* Migraciones: MIGRACIONES[n] lleva el estado de la versión n a la n+1. */
  var MIGRACIONES = {
    /* v1 → v2: Desarrollo dejó de ser texto + rúbrica y pasó a "partes" que se desbloquean;
       las autoevaluaciones antiguas no son convertibles y se descartan. */
    1: function (e) { e.desarrollo = {}; return e; }
  };
  function migrar(e) {
    var v = e.v || 1;
    while (v < C.VERSION_ESQUEMA) {
      if (MIGRACIONES[v]) e = MIGRACIONES[v](e);
      v++;
    }
    e.v = C.VERSION_ESQUEMA;
    /* Completa campos faltantes sin pisar lo existente. */
    var base = vacio();
    Object.keys(base).forEach(function (k) { if (e[k] == null) e[k] = base[k]; });
    Object.keys(base.prefs).forEach(function (k) { if (e.prefs[k] == null) e.prefs[k] = base.prefs[k]; });
    return e;
  }

  var estado = vacio();
  S.persistente = true;

  S.cargar = function () {
    try {
      var crudo = window.localStorage.getItem(CLAVE);
      if (crudo) {
        var e = JSON.parse(crudo);
        if (e && typeof e === "object") estado = migrar(e);
      }
    } catch (err) { S.persistente = false; estado = vacio(); }
    S.e = estado;
    return estado;
  };
  S.guardar = function () {
    try { window.localStorage.setItem(CLAVE, JSON.stringify(estado)); }
    catch (err) { S.persistente = false; }
  };
  S.reiniciar = function () {
    var prefs = estado.prefs;
    estado = vacio();
    estado.prefs.tema = prefs.tema;
    S.e = estado;
    try { window.localStorage.removeItem(CLAVE); } catch (err) { /* sin storage */ }
    S.guardar();
  };
  S.exportar = function () {
    return JSON.stringify({ app: "me-estudio", exportado: new Date().toISOString(), estado: estado }, null, 2);
  };
  S.importar = function (texto) {
    var obj = JSON.parse(texto);
    if (!obj || obj.app !== "me-estudio" || !obj.estado || typeof obj.estado.q !== "object") {
      throw new Error("El archivo no es un respaldo de esta plataforma.");
    }
    estado = migrar(obj.estado);
    S.e = estado;
    S.guardar();
  };

  S.pref = function (k, v) {
    if (arguments.length > 1) { estado.prefs[k] = v; S.guardar(); }
    return estado.prefs[k];
  };

  /* ── Respuestas ────────────────────────────────────────────────────── */
  S.anotar = function (id, ok) {
    var r = estado.q[id] || { n: 0, ok: 0, h: [], t: 0, caja: 0 };
    r.n++; if (ok) r.ok++;
    r.h.unshift(ok ? 1 : 0); if (r.h.length > 5) r.h.length = 5;
    r.t = Date.now();
    r.caja = ok ? Math.min((r.caja || 0) + 1, C.REPASO_INTERVALOS_DIAS.length - 1) : 0;
    estado.q[id] = r;
    S.guardar();
  };
  S.stat = function (id) { return estado.q[id] || null; };
  S.marcar = function (id) {
    if (estado.marcadas[id]) delete estado.marcadas[id]; else estado.marcadas[id] = true;
    S.guardar();
    return !!estado.marcadas[id];
  };
  S.marcada = function (id) { return !!estado.marcadas[id]; };
})();
