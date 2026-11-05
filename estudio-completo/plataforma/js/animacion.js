/* ============================================================================
   animacion.js — Pizarra animada sincronizada con una clase en audio.

   Una animación (data/escenas/<id>.js, generada por tools/generar_escenas.js)
   es una lista de escenas { en, html }. Cada escena empieza en una marca del
   guion ({marca} en tools/guiones/<id>.txt; su instante lo calcula
   tools/generar_audio.py en audio.marcas). Un instante se escribe como
   «marca» o «marca@1.5» (1,5 s después de la marca). Dentro del HTML:
     data-en="t"         el elemento aparece en el instante t
     data-fuera="t"      … se atenúa desde t
     data-hasta="t"      … desaparece desde t (para reemplazar sumas parciales)
     data-hl="t1 t2"     se resalta entre t1 y t2 (sin t2: hasta el fin de la escena)
     data-desde="id"     al aparecer, una copia del elemento data-id="id" vuela
                         hasta este lugar (de dónde sale cada número)
     data-contar         al aparecer, el número cuenta desde 0 (solo texto plano)
     class="trazo"       en un <path pathLength="1">: se dibuja al aparecer
   El estado es función pura del tiempo: adelantar o retroceder siempre deja la
   pizarra igual que si se hubiera escuchado de corrido (los vuelos solo se ven
   mientras suena).
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA;

  var VUELO_MS = 750;

  function numeroDe(txt) {
    var m = /^(\D*?)(-?[\d.]*\d(?:,\d+)?)(\D*)$/.exec(txt.trim());
    if (!m) return null;
    var dec = (m[2].split(",")[1] || "").length;
    return { pre: m[1], suf: m[3], valor: Number(m[2].replace(/\./g, "").replace(",", ".")), dec: dec };
  }
  function formato(v, dec) {
    var s = v.toFixed(dec).split("."), ent = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return ent + (dec ? "," + s[1] : "");
  }

  /* KaTeX sin el marcado de siglas de U.tex (en la pizarra ensucia). */
  function tex(raiz) {
    if (typeof window.renderMathInElement !== "function") return;
    try {
      window.renderMathInElement(raiz, {
        delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"], throwOnError: false
      });
    } catch (e) { /* una fórmula mala no bota la pizarra */ }
  }

  P.animacion = {
    /* Crea una pizarra dentro de «caja» para la clase «audio» con la animación «anim». */
    crear: function (caja, audio, anim) {
      var marcas = audio.marcas || {};
      /* «marca» o «marca@segundos» → instante en el audio */
      var T = function (id) {
        var i = String(id).indexOf("@"), base = i < 0 ? id : id.slice(0, i), off = i < 0 ? 0 : Number(id.slice(i + 1)) || 0;
        return base in marcas ? marcas[base] + off : Infinity;
      };
      var escenas = anim.escenas.map(function (e, i) { return { i: i, t: e.en ? T(e.en) : 0, html: e.html, clase: e.clase || "" }; })
        .sort(function (a, b) { return a.t - b.t || a.i - b.i; });
      var actual = -1, nodos = [], subt = null, ultimoSub = -1, vuelos = [];

      caja.innerHTML = '<div class="pz-escena" aria-live="off"></div><p class="pz-sub" hidden></p>';
      var lienzo = caja.firstChild;
      subt = caja.lastChild;

      function limpiarVuelos() {
        vuelos.forEach(function (v) { clearTimeout(v.timer); if (v.clon.parentNode) v.clon.parentNode.removeChild(v.clon); v.x.n.classList.remove("pz-espera"); });
        vuelos = [];
      }

      function montarEscena(k) {
        limpiarVuelos();
        actual = k;
        var e = escenas[k];
        lienzo.className = "pz-escena " + e.clase;
        lienzo.innerHTML = e ? e.html : "";
        tex(lienzo);
        nodos = Array.prototype.map.call(lienzo.querySelectorAll("[data-en],[data-hl],[data-fuera],[data-hasta]"), function (n) {
          var hl = (n.getAttribute("data-hl") || "").split(/\s+/).filter(Boolean);
          if (n.hasAttribute("data-en")) n.classList.add("pz-anim");
          return { n: n, en: n.hasAttribute("data-en") ? T(n.getAttribute("data-en")) : null,
                   fuera: n.hasAttribute("data-fuera") ? T(n.getAttribute("data-fuera")) : null,
                   hasta: n.hasAttribute("data-hasta") ? T(n.getAttribute("data-hasta")) : null,
                   hl: hl.length ? [T(hl[0]), hl[1] ? T(hl[1]) : Infinity] : null,
                   desde: n.getAttribute("data-desde"),
                   on: null, contar: n.hasAttribute("data-contar") ? numeroDe(n.textContent) : null, txt: n.textContent };
        });
        /* Al entrar a una escena (o saltar a la mitad) nada se anima: se pone el estado directo. */
        lienzo.classList.add("pz-quieto");
        return true;
      }

      function contar(x) {
        var c = x.contar, t0 = performance.now(), dur = 700;
        (function paso(ahora) {
          var f = Math.min(1, (ahora - t0) / dur), v = c.valor * (1 - Math.pow(1 - f, 3));
          x.n.textContent = c.pre + formato(v, c.dec) + c.suf;
          if (f < 1 && x.on) requestAnimationFrame(paso); else x.n.textContent = x.txt;
        })(t0);
      }

      /* Una copia del origen viaja hasta el elemento x; x se muestra al aterrizar. */
      function volar(x) {
        var src = lienzo.querySelector('[data-id="' + x.desde + '"]');
        if (!src) return;
        var cr = caja.getBoundingClientRect(), sr = src.getBoundingClientRect(), tr = x.n.getBoundingClientRect();
        if (!sr.width || !tr.width) return;
        var clon = document.createElement("div"), cs = getComputedStyle(src);
        clon.className = "pz-vuelo";
        clon.innerHTML = src.innerHTML;
        clon.style.fontSize = cs.fontSize;
        clon.style.fontWeight = cs.fontWeight;
        caja.appendChild(clon);
        /* La copia es del tamaño del número y parte centrada sobre el origen. */
        var w = clon.offsetWidth, h = clon.offsetHeight;
        var sx = sr.left - cr.left + sr.width / 2, sy = sr.top - cr.top + sr.height / 2;
        clon.style.left = (sx - w / 2) + "px";
        clon.style.top = (sy - h / 2) + "px";
        src.classList.add("pz-origen");
        x.n.classList.add("pz-espera");
        var dx = (tr.left + tr.width / 2) - (sr.left + sr.width / 2), dy = (tr.top + tr.height / 2) - (sr.top + sr.height / 2);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { clon.style.transform = "translate(" + dx + "px," + dy + "px)"; });
        });
        var v = { x: x, clon: clon };
        v.timer = setTimeout(function () {
          if (clon.parentNode) clon.parentNode.removeChild(clon);
          src.classList.remove("pz-origen");
          x.n.classList.remove("pz-espera");
          x.n.classList.add("pz-aterriza");
          setTimeout(function () { x.n.classList.remove("pz-aterriza"); }, 600);
          vuelos = vuelos.filter(function (w) { return w !== v; });
        }, VUELO_MS);
        vuelos.push(v);
      }

      function actualizar(t, animar) {
        var k = 0;
        for (var i = 0; i < escenas.length; i++) if (escenas[i].t <= t + 0.05) k = i;
        var nueva = k !== actual && montarEscena(k);
        if (!animar && vuelos.length) limpiarVuelos();
        nodos.forEach(function (x) {
          var on = x.en == null || t >= x.en - 0.05;
          var fuera = x.fuera != null && t >= x.fuera - 0.05;
          var oculto = x.hasta != null && t >= x.hasta - 0.05;
          var hl = x.hl && t >= x.hl[0] - 0.05 && t < x.hl[1] - 0.05;
          if (x.en != null) {
            if (on && x.on === false && animar && !nueva) {
              if (x.contar) contar(x);
              /* Solo vuela si se cruza el instante «en vivo» (no al saltar lejos). */
              if (x.desde && t - x.en < 0.6) volar(x);
            }
            x.n.classList.toggle("pz-on", on);
            x.on = on;
          }
          x.n.classList.toggle("pz-fuera", fuera);
          x.n.classList.toggle("pz-oculto", oculto);
          x.n.classList.toggle("pz-hl", !!hl);
        });
        if (nueva) { void lienzo.offsetWidth; lienzo.classList.remove("pz-quieto"); }
        /* Subtítulos */
        if (audio.frases && !subt.hidden) {
          var s = -1;
          for (var j = 0; j < audio.frases.length; j++) if (audio.frases[j][0] <= t + 0.05) s = j;
          if (s !== ultimoSub) { ultimoSub = s; subt.textContent = s >= 0 ? audio.frases[s][1] : ""; }
        }
      }

      return {
        actualizar: actualizar,
        subtitulos: function (si) { subt.hidden = !si; ultimoSub = -1; }
      };
    }
  };
})();
