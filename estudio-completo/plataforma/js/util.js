/* ============================================================================
   util.js — Funciones pequeñas compartidas: escape, formato, azar, LaTeX,
   resaltado de R, citas de fuente y cálculo de nota.
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA, C = P.config, U = {};
  P.util = U;

  U.esc = function (s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  /* Texto plano de un fragmento HTML (para el buscador y los resúmenes). */
  U.plano = function (html) {
    return String(html == null ? "" : html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  };
  U.recortar = function (s, n) { s = U.plano(s); return s.length > n ? s.slice(0, n - 1) + "…" : s; };
  U.sinTildes = function (s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  };

  /* ── Formato chileno ───────────────────────────────────────────────── */
  U.num = function (x, dec) {
    return Number(x).toLocaleString("es-CL", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec == null ? 2 : dec });
  };
  U.pct = function (ok, n) { return n > 0 ? Math.round(1000 * ok / n) / 10 : 0; };
  U.tiempo = function (seg) {
    seg = Math.max(0, Math.round(seg));
    var m = Math.floor(seg / 60), s = seg % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  };
  U.fecha = function (ts) {
    try { return new Date(ts).toLocaleDateString("es-CL", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }); }
    catch (e) { return ""; }
  };

  /* ── Azar ──────────────────────────────────────────────────────────── */
  U.barajar = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  /* Muestra ponderada sin reemplazo (Efraimidis–Spirakis): clave = u^(1/peso). */
  U.muestraPonderada = function (items, n, pesoDe) {
    return items.map(function (it) {
      var w = Math.max(pesoDe(it), 1e-6);
      return { it: it, k: Math.pow(Math.random(), 1 / w) };
    }).sort(function (a, b) { return b.k - a.k; }).slice(0, n).map(function (x) { return x.it; });
  };

  /* ── Nota en escala 1–7 ─────────────────────────────────────────────
     Regla (configurable en config.js): lineal por tramos con exigencia; la forma lineal es un supuesto.
     La aprobación se decide con enteros (ok·100 ≥ exigencia·total) y la nota se
     TRUNCA al mostrarla: nunca se aprueba "por redondeo". */
  U.aprueba = function (ok, total) {
    return total > 0 && ok * 100 >= C.PORCENTAJE_APROBACION * total;
  };
  U.nota = function (ok, total) {
    if (!(total > 0)) return C.NOTA_MIN;
    var p = ok / total, e = C.PORCENTAJE_APROBACION / 100, n;
    if (p < e) n = C.NOTA_MIN + (C.NOTA_APROBACION - C.NOTA_MIN) * p / e;
    else n = C.NOTA_APROBACION + (C.NOTA_MAX - C.NOTA_APROBACION) * (p - e) / (1 - e);
    n = Math.floor(n * 10 + 1e-9) / 10;
    if (!U.aprueba(ok, total)) n = Math.min(n, Math.round((C.NOTA_APROBACION - 0.1) * 10) / 10);
    return n;
  };
  U.notaTxt = function (ok, total) { return U.nota(ok, total).toFixed(1).replace(".", ","); };

  /* ── LaTeX: se llama al montar cada vista y tras cada cambio dinámico ── */
  U.tex = function (raiz) {
    if (!raiz || typeof window.renderMathInElement !== "function") return;
    try {
      window.renderMathInElement(raiz, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false }
        ],
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "input"],
        throwOnError: false
      });
    } catch (e) { /* una fórmula mala no debe botar la vista */ }
  };

  /* ── Bloques de código y salida de R ───────────────────────────────── */
  var RE_R = /(#[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(\b(?:function|if|else|for|while|in|TRUE|FALSE|NULL|NA|library|return)\b)|(\b\d+(?:\.\d+)?\b)/g;
  U.codigoR = function (codigo) {
    var h = U.esc(codigo).replace(/&quot;/g, '"').replace(RE_R, function (m, com, str, kw, n) {
      if (com) return '<span class="r-com">' + com + "</span>";
      if (str) return '<span class="r-str">' + str + "</span>";
      if (kw) return '<span class="r-kw">' + kw + "</span>";
      return '<span class="r-num">' + n + "</span>";
    });
    /* Los huecos ___ de las preguntas "completar" se destacan. */
    h = h.replace(/_{3,}/g, '<span class="r-hueco">_____</span>');
    return '<pre class="codigo" tabindex="0" aria-label="Código R"><code>' + h + "</code></pre>";
  };
  U.salidaR = function (salida) {
    return '<pre class="salida" tabindex="0" aria-label="Salida de R"><code>' + U.esc(salida) + "</code></pre>";
  };

  /* ── Citas ─────────────────────────────────────────────────────────── */
  U.cita = function (f) {
    if (f.id === "EXT") {
      return '<span class="cita cita-ext">🌐 ' + U.esc(f.titulo || "Fuente externa") +
        (f.url ? " — <span class=\"url\">" + U.esc(f.url) + "</span>" : "") +
        (f.consultado ? " (consultado " + U.esc(f.consultado) + ")" : "") + "</span>";
    }
    var src = P.fuente(f.id);
    var txt = U.esc(f.id) + (f.loc ? " · " + U.esc(f.loc) : "");
    var tit = src ? U.esc(src.titulo) : "Fuente no registrada";
    return '<a class="cita" href="#/fuentes/' + encodeURIComponent(f.id) + '" title="' + tit + '">' + txt + "</a>";
  };
  U.fuentes = function (lista, etiqueta) {
    if (!lista || !lista.length) return "";
    return '<div class="fuente">📎 ' + (etiqueta || "Fuente") + ": " + lista.map(U.cita).join(" ") + "</div>";
  };
  /* Enlace al archivo real (PDF con #page=N cuando la cita trae página). */
  U.enlaceArchivo = function (src, loc) {
    if (!src || !src.ruta) return "";
    var url = src.ruta.split("/").map(encodeURIComponent).join("/").replace(/%2E%2E/g, "..");
    if (/\.pdf$/i.test(src.ruta) && loc) {
      var m = /p[áa]gs?\.?\s*(\d+)/i.exec(loc);
      if (m) url += "#page=" + m[1];
    }
    return url;
  };

  /* ── Etiquetas reutilizables ───────────────────────────────────────── */
  U.chipPrioridad = function (p) {
    return '<span class="chip chip-' + U.esc(p) + '">prioridad ' + U.esc(p) + "</span>";
  };
  U.chipOrigen = function (o) {
    return '<span class="chip chip-origen-' + U.esc(o) + '">' + U.esc(P.ORIGENES[o] || o) + "</span>";
  };
  U.barra = function (valor, clase) {
    var v = Math.max(0, Math.min(100, valor || 0));
    return '<div class="barra ' + (clase || "") + '" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' +
      Math.round(v) + '"><i style="width:' + v + '%"></i></div>';
  };
  U.paginar = function (lista, pagina) {
    var tam = C.TAM_PAGINA, total = Math.max(1, Math.ceil(lista.length / tam));
    var p = Math.min(Math.max(1, pagina || 1), total);
    return { items: lista.slice((p - 1) * tam, p * tam), pagina: p, paginas: total, total: lista.length };
  };
  U.paginador = function (pg, accion) {
    if (pg.paginas <= 1) return "";
    return '<nav class="paginador" aria-label="Páginas">' +
      '<button class="btn btn-sec" data-accion="' + accion + '" data-pagina="' + (pg.pagina - 1) + '"' + (pg.pagina <= 1 ? " disabled" : "") + ">← Anterior</button>" +
      "<span>Página " + pg.pagina + " de " + pg.paginas + " · " + pg.total + " elementos</span>" +
      '<button class="btn btn-sec" data-accion="' + accion + '" data-pagina="' + (pg.pagina + 1) + '"' + (pg.pagina >= pg.paginas ? " disabled" : "") + ">Siguiente →</button></nav>";
  };
})();
