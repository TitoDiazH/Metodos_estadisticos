/* ============================================================================
   vistas-progreso.js — 📊 Mi progreso: resumen, dominio por módulo,
   debilidades, historial de exámenes, respaldo (exportar/importar) y reinicio.
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA, U = P.util, S = P.store, G = P.progreso, C = P.config;
  var V = P.vistas = P.vistas || {};
  function sel() { return P.app.sel(); }
  var MODO_TXT = { examen: "📝 Examen", desafio: "🔥 Desafío", simulacro: "🎓 Simulacro", diagnostico: "🧭 Diagnóstico" };
  var mensaje = "";

  V.progreso = {
    titulo: "Mi progreso",
    render: function (args) {
      var s = sel(), r = G.resumen(s), mods = P.modulosDe(s), pag = Number(args[0]) || 1;
      var h = "<h1>📊 Mi progreso</h1>" + P.avisoPrueba() + (mensaje ? '<div class="aviso" role="status">' + U.esc(mensaje) + "</div>" : "");
      mensaje = "";

      h += '<section class="fichas">' +
        '<div class="ficha"><span class="ficha-rotulo">Dominio medio</span><span class="ficha-valor">' + r.dominioMedio + " %</span>" + U.barra(r.dominioMedio) + "</div>" +
        '<div class="ficha"><span class="ficha-rotulo">Preguntas distintas</span><span class="ficha-valor">' + r.distintas + " / " + r.banco + "</span></div>" +
        '<div class="ficha"><span class="ficha-rotulo">Acierto global</span><span class="ficha-valor">' + U.num(U.pct(r.aciertos, r.respondidas), 1) + " %</span><small>" + r.respondidas + " intentos</small></div>" +
        '<div class="ficha"><span class="ficha-rotulo">Evaluaciones rendidas</span><span class="ficha-valor">' + r.examenes + "</span></div></section>";

      h += '<div class="fila-botones"><a class="btn btn-pri" href="#/practicar/repaso">🧠 Repasar mis errores (' + G.colaRepaso(s, 99).length + ")</a>" +
        '<a class="btn btn-sec" href="#/practicar/marcadas">🔖 Mis marcadas</a></div>';

      h += "<h2>Dominio por módulo</h2>";
      if (!mods.length) h += '<p class="tenue">No hay módulos en esta selección.</p>';
      else {
        h += '<p class="tenue">Pondera más tus intentos recientes y exige al menos ' + C.DOMINIO_MIN_PREGUNTAS + " preguntas distintas por módulo (o todo su banco si es menor). " +
          "≥ " + C.DOMINIO_UMBRAL + ' % = 🟢 dominado. Las preguntas retiradas no cuentan.</p><div class="tabla-scroll"><table class="tabla"><thead><tr><th>Módulo</th><th>Prioridad</th><th>Dominio</th><th>Distintas</th><th>Acierto</th><th></th></tr></thead><tbody>' +
          mods.map(function (m) {
            var d = G.dominio(m.id), e = G.estadoDominio(d);
            return '<tr><td><a href="#/aprender/' + m.id + '">' + U.esc(m.titulo) + "</a></td><td>" + U.chipPrioridad(m.prioridad) + "</td><td>" + e.icono + " " + d.valor + " %" +
              U.barra(d.valor, "barra-" + e.clase) + "</td><td>" + d.distintas + " / " + d.banco + (d.distintas < d.minimo ? ' <small class="tenue">(mín. ' + d.minimo + ")</small>" : "") +
              "</td><td>" + (d.n ? U.num(U.pct(d.ok, d.n), 1) + " %" : "—") + '</td><td><a class="btn btn-sec btn-chico" href="#/practicar/modulo/' + m.id + '">Practicar</a></td></tr>';
          }).join("") + "</tbody></table></div>";
      }

      var exs = S.e.examenes.filter(function (x) { return s === "todo" || x.prueba === s; }).slice().reverse();
      h += "<h2>Historial de evaluaciones</h2>";
      if (!exs.length) h += '<p class="tenue">Aún no rindes ninguna.</p>';
      else {
        var pg = U.paginar(exs, pag);
        h += '<div class="tabla-scroll"><table class="tabla"><thead><tr><th>Fecha</th><th>Tipo</th><th>Prueba</th><th>Resultado</th><th>Nota</th><th>Tiempo</th></tr></thead><tbody>' +
          pg.items.map(function (x) {
            return "<tr><td>" + U.fecha(x.ts) + "</td><td>" + (MODO_TXT[x.modo] || x.modo) + "</td><td>" + U.esc(x.prueba === "todo" ? "Todo" : x.prueba) + "</td><td>" + x.ok + " / " + x.n +
              " (" + U.num(U.pct(x.ok, x.n), 1) + " %)</td><td>" + (U.aprueba(x.ok, x.n) ? "✅ " : "❌ ") + U.notaTxt(x.ok, x.n) + "</td><td>" + U.tiempo(x.seg) + "</td></tr>";
          }).join("") + "</tbody></table></div>" + U.paginador(pg, "paginaHistorial");
      }

      h += '<section class="tarjeta no-imprimir"><h2>Respaldo de mi progreso</h2><p class="tenue">Tu avance vive solo en este navegador' +
        (S.persistente ? "" : " <strong>(y ahora mismo no se puede guardar: se perderá al cerrar)</strong>") + ". Expórtalo para no perderlo o para llevarlo a otro computador.</p>" +
        '<div class="fila-botones"><button class="btn btn-sec" data-accion="exportar">⬇ Exportar JSON</button>' +
        '<label class="btn btn-sec">⬆ Importar JSON<input type="file" accept="application/json,.json" class="oculto" data-cambio="importar"></label>' +
        '<button class="btn btn-peligro" data-accion="reiniciar">Reiniciar todo mi progreso</button></div></section>';
      return h;
    },
    acciones: {
      paginaHistorial: function (el) { P.app.ir("progreso/" + el.getAttribute("data-pagina")); },
      exportar: function () {
        var texto = S.exportar();
        try {
          var url = URL.createObjectURL(new Blob([texto], { type: "application/json" }));
          var a = document.createElement("a");
          a.href = url; a.download = "me-estudio-progreso-" + new Date().toISOString().slice(0, 10) + ".json";
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
          mensaje = "Respaldo descargado.";
        } catch (e) { mensaje = "No se pudo descargar el respaldo en este navegador."; }
        P.app.pintar(true);
      },
      importar: function (el) {
        var archivo = el.files && el.files[0];
        if (!archivo) return;
        var lector = new FileReader();
        lector.onload = function () {
          try {
            if (!window.confirm("Importar reemplaza tu progreso actual por el del archivo. ¿Continuar?")) return;
            S.importar(String(lector.result));
            mensaje = "Progreso importado correctamente.";
          } catch (e) { mensaje = "No se pudo importar: " + e.message; }
          P.app.pintar(true);
        };
        lector.readAsText(archivo);
      },
      reiniciar: function () {
        if (!window.confirm("Esto borra respuestas, exámenes, desarrollos y marcas. No se puede deshacer. ¿Reiniciar?")) return;
        S.reiniciar();
        mensaje = "Progreso reiniciado.";
        P.app.pintar();
      }
    }
  };
})();
