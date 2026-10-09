/* ============================================================================
   loader.js — Carga los archivos de data/ listados en data/manifiesto.js
   inyectando <script> clásicos, en orden (funciona en file://; no usa fetch).
   Agregar contenido = crear el archivo en data/ y correr
   `node tools/generar_manifiesto.js`. Nunca hay que tocar js/.
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA;
  var lista = (P.manifiesto && P.manifiesto.archivos) || [];
  var fallos = [], i = 0;

  function siguiente() {
    if (i >= lista.length) { P.iniciar(fallos); return; }
    var ruta = lista[i++], s = document.createElement("script");
    s.src = ruta;
    s.async = false;
    s.onload = siguiente;
    s.onerror = function () { fallos.push(ruta); siguiente(); };
    document.head.appendChild(s);
  }

  if (!P.manifiesto) fallos.push("data/manifiesto.js (ejecuta: node tools/generar_manifiesto.js)");
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", siguiente);
  else siguiente();
})();
