/* ============================================================================
   figuras-vivas.js — Figuras interactivas y animadas de Aprender (deslizadores,
   botones y «paso a paso»). Usan el núcleo y los ayudantes de figuras.js.
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA, F = P.figuras, A = F.a;
  var QUIETO = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Controles ─────────────────────────────────────────────────────── */
  function rango(k, rotulo, min, max, paso, v) {
    return '<label class="fig-rango"><span>' + rotulo + ' <output data-o="' + k + '"></output></span>' +
      '<input type="range" data-k="' + k + '" min="' + min + '" max="' + max + '" step="' + paso + '" value="' + v + '"></label>';
  }
  function seg(k, rotulo, ops, v) {
    return '<div class="fig-seg" role="group" aria-label="' + A.esc(rotulo) + '">' + (rotulo ? "<span>" + rotulo + "</span>" : "") + ops.map(function (o) {
      return '<button type="button" data-k="' + k + '" data-v="' + o[0] + '" aria-pressed="' + (String(o[0]) === String(v)) + '">' + o[1] + "</button>";
    }).join("") + "</div>";
  }
  function boton(k, txt) { return '<button type="button" class="fig-btn" data-b="' + k + '">' + txt + "</button>"; }
  /* Estructura común: dibujo + controles + lectura. */
  function armar(el, controles) {
    el.innerHTML = '<div class="fig-svg"></div><div class="fig-ctrl">' + controles + '</div><div class="fig-lectura" aria-live="polite"></div>';
    return { svg: el.children[0], ctrl: el.children[1], lect: el.children[2] };
  }
  function marcar(el, e) {
    Array.prototype.forEach.call(el.querySelectorAll("button[data-k]"), function (b) {
      b.setAttribute("aria-pressed", String(e[b.getAttribute("data-k")]) === b.getAttribute("data-v"));
    });
    Array.prototype.forEach.call(el.querySelectorAll("input[data-k]"), function (i) { i.value = e[i.getAttribute("data-k")]; });
  }
  /* Conecta los controles con el estado y redibuja. acciones = { nombreBotón: función }. */
  function enlazar(el, e, pintar, acciones) {
    el.addEventListener("input", function (ev) {
      var k = ev.target.getAttribute("data-k");
      if (!k) return;
      e[k] = +ev.target.value; e._anim = 0; pintar();
    });
    el.addEventListener("click", function (ev) {
      var b = ev.target.closest("button");
      if (!b || !el.contains(b)) return;
      if (b.hasAttribute("data-k")) {
        var v = b.getAttribute("data-v");
        e[b.getAttribute("data-k")] = isNaN(+v) ? v : +v; e._anim = 0;
        marcar(el, e); pintar();
      } else if (b.hasAttribute("data-b") && acciones && acciones[b.getAttribute("data-b")]) acciones[b.getAttribute("data-b")](b);
    });
  }
  function salida(el, k, txt) { var o = el.querySelector('[data-o="' + k + '"]'); if (o) o.textContent = txt; }
  /* Interpola de 0 a 1 en «ms» milisegundos; se corta si la figura ya no está en pantalla o si el usuario mueve algo. */
  function animar(el, e, ms, paso, fin) {
    if (QUIETO) { paso(1); if (fin) fin(); return; }
    var t0 = null, turno = e._anim = (e._anim || 0) + 1;
    function cuadro(t) {
      if (!document.contains(el) || e._anim !== turno) return;
      if (t0 === null) t0 = t;
      var u = Math.min(1, (t - t0) / ms);
      paso(u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);
      if (u < 1) window.requestAnimationFrame(cuadro); else if (fin) fin();
    }
    window.requestAnimationFrame(cuadro);
  }
  /* Controles de «paso a paso»: ◀ ▶ y reproducir. Devuelve HTML y las acciones para enlazar(). */
  function pasos(el, e, total, pintar) {
    var reloj = null;
    function parar() { if (reloj) { clearInterval(reloj); reloj = null; } var b = el.querySelector('[data-b="auto"]'); if (b) b.textContent = "▶ Reproducir"; }
    function ir(k) { e.paso = Math.max(0, Math.min(total(), k)); pintar(true); }
    return {
      html: boton("ant", "◀ Anterior") + boton("sig", "Siguiente ▶") + boton("auto", "▶ Reproducir") + '<span class="fig-paso" data-o="paso"></span>',
      acciones: {
        ant: function () { parar(); ir(e.paso - 1); },
        sig: function () { parar(); ir(e.paso + 1); },
        auto: function (b) {
          if (reloj) { parar(); return; }
          if (e.paso >= total()) ir(0);
          b.textContent = "⏸ Pausar";
          reloj = setInterval(function () {
            if (!document.contains(el)) { clearInterval(reloj); return; }
            if (e.paso >= total()) { parar(); return; }
            ir(e.paso + 1);
          }, 1900);
        }
      },
      parar: parar
    };
  }

  /* Escala común para dispersiones con la misma unidad en ambos ejes. */
  function cajaIgual(pts, c, margen) {
    var xs = pts.map(function (q) { return q[0]; }), ys = pts.map(function (q) { return q[1]; });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var m = margen == null ? 0.18 : margen, dx = (x1 - x0) || 1, dy = (y1 - y0) || 1;
    x0 -= dx * m; x1 += dx * m; y0 -= dy * m; y1 += dy * m;
    var u = Math.min((c.r - c.l) / (x1 - x0), (c.b - c.t) / (y1 - y0));
    var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, px = (c.l + c.r) / 2, py = (c.t + c.b) / 2;
    c.u = u;
    c.sx = function (v) { return px + (v - cx) * u; };
    c.sy = function (v) { return py - (v - cy) * u; };
    c.x0 = cx - (px - c.l) / u; c.x1 = cx + (c.r - px) / u; c.y0 = cy - (c.b - py) / u; c.y1 = cy + (py - c.t) / u;
    return c;
  }

  /* ═══════════════ Covarianza: productos de desviaciones ═══════════════
     { x, y, ejes:[..], unidad:"persona" } */
  F.tipo("cuadrantes", function (el, p, e) {
    var s = A.cov2(p.x, p.y), n = s.n, i;
    if (e.sel == null) e.sel = 0;
    var ops = [[0, "Todas"]];
    for (i = 1; i <= n; i++) ops.push([i, String(i)]);
    var z = armar(el, seg("sel", (p.unidad || "Dato") + ":", ops, e.sel));
    var c = { l: 58, r: 426, t: 14, b: 262 };
    var dx = Math.max.apply(null, p.x) - Math.min.apply(null, p.x), dy = Math.max.apply(null, p.y) - Math.min.apply(null, p.y);
    c.sx = A.lin(Math.min.apply(null, p.x) - dx * 0.15, Math.max.apply(null, p.x) + dx * 0.15, c.l, c.r);
    c.sy = A.lin(Math.min.apply(null, p.y) - dy * 0.15, Math.max.apply(null, p.y) + dy * 0.15, c.b, c.t);
    var prod = p.x.map(function (x, k) { return (x - s.mx) * (p.y[k] - s.my); }), suma = prod.reduce(function (a, b) { return a + b; }, 0);
    function pintar() {
      var X = c.sx(s.mx), Y = c.sy(s.my), h = "";
      h += A.rect(X, c.t, c.r - X, Y - c.t, "zona5") + A.rect(c.l, Y, X - c.l, c.b - Y, "zona5") + A.rect(c.l, c.t, X - c.l, Y - c.t, "zona2") + A.rect(X, Y, c.r - X, c.b - Y, "zona2");
      h += A.tx(c.r - 8, c.t + 16, "(+)(+) → producto +", "t5", "end", 10.5) + A.tx(c.l + 8, c.b - 8, "(−)(−) → producto +", "t5", "start", 10.5) +
        A.tx(c.l + 8, c.t + 16, "(−)(+) → producto −", "t2", "start", 10.5) + A.tx(c.r - 8, c.b - 8, "(+)(−) → producto −", "t2", "end", 10.5);
      h += A.ejes({ l: c.l, r: c.r, t: c.t, b: c.b, sx: c.sx, sy: c.sy, xt: A.marcas(Math.min.apply(null, p.x), Math.max.apply(null, p.x), 5),
        yt: A.marcas(Math.min.apply(null, p.y), Math.max.apply(null, p.y), 5), xl: p.ejes[0], yl: p.ejes[1] });
      h += A.ln(X, c.t, X, c.b, "guia0") + A.ln(c.l, Y, c.r, Y, "guia0") + A.tx(X + 4, c.b - 24, "x̄ = " + A.nn(s.mx), "ten", "start", 10.5) + A.tx(c.r - 4, Y - 5, "ȳ = " + A.nn(s.my), "ten", "end", 10.5);
      p.x.forEach(function (x, k) {
        if (e.sel && e.sel !== k + 1) return;
        h += A.rect(X, Y, c.sx(x) - X, c.sy(p.y[k]) - Y, prod[k] >= 0 ? "s5" : "s2", e.sel ? "" : ' opacity=".55"');
      });
      p.x.forEach(function (x, k) {
        h += A.ci(c.sx(x), c.sy(p.y[k]), e.sel === k + 1 ? 6.5 : 5, e.sel === k + 1 ? "destacado" : "punto") + A.tx(c.sx(x) + 8, c.sy(p.y[k]) - 7, String(k + 1), "", "start", 10.5);
      });
      z.svg.innerHTML = A.svg(440, 300, h, "Dispersión con las medias y el rectángulo de cada producto de desviaciones");
      if (e.sel) {
        var k = e.sel - 1, a = p.x[k] - s.mx, b = p.y[k] - s.my;
        z.lect.innerHTML = (p.unidad || "Dato") + " " + e.sel + ": (" + A.nn(p.x[k]) + " − " + A.nn(s.mx) + ") · (" + A.nn(p.y[k]) + " − " + A.nn(s.my) + ") = (" + A.nn(a) + ") · (" + A.nn(b) + ") = <strong>" + A.nn(prod[k]) +
          "</strong>. El área del rectángulo es ese producto; " + (prod[k] >= 0 ? "está del mismo lado de ambas medias ⇒ suma a la covarianza." : "está en lados opuestos ⇒ resta a la covarianza.");
      } else {
        z.lect.innerHTML = "Suma de los " + n + " productos = " + A.nn(suma) + " ⇒ covarianza = " + A.nn(suma) + " / " + (n - 1) + " = <strong>" + A.nn(suma / (n - 1)) +
          "</strong>. Elige un número para ver su rectángulo.";
      }
    }
    enlazar(el, e, pintar); pintar();
  });

  /* ═══════════ Nube de puntos: correlación y normal bivariada ══════════
     { modo:"correlacion"|"normal", r } */
  F.tipo("nube", function (el, p, e) {
    var normal = p.modo === "normal", N = 90, g = A.azar(2026), z1 = [], z2 = [], i;
    /* Pares simétricos (z, −z) y z2 ortogonal a z1: la correlación muestral es exactamente la elegida. */
    for (i = 0; i < N / 2; i++) { var a = g.normal(); z1.push(a, -a); }
    for (i = 0; i < N; i++) z2.push(g.normal());
    var s1 = Math.sqrt(z1.reduce(function (s, v) { return s + v * v; }, 0) / (N - 1));
    z1 = z1.map(function (v) { return v / s1; });
    var m2 = A.media(z2), b12 = z1.reduce(function (s, v, k) { return s + v * (z2[k] - m2); }, 0) / (N - 1);
    z2 = z2.map(function (v, k) { return v - m2 - b12 * z1[k]; });
    var s2 = Math.sqrt(z2.reduce(function (s, v) { return s + v * v; }, 0) / (N - 1));
    z2 = z2.map(function (v) { return v / s2; });
    if (e.r == null) { e.r = p.r == null ? 0.8 : p.r; e.s1 = 1; e.s2 = 1; e.forma = "lineal"; }
    var ctrl = rango("r", normal ? "ρ =" : "r =", -1, 1, 0.05, e.r);
    if (normal) ctrl += rango("s1", "σ₁ =", 0.5, 2, 0.1, e.s1) + rango("s2", "σ₂ =", 0.5, 2, 0.1, e.s2);
    else ctrl += seg("forma", "Relación:", [["lineal", "lineal"], ["curva", "curva (parábola)"]], e.forma);
    var z = armar(el, ctrl), L = normal ? 5 : 3.4, c = { l: 44, r: 364, t: 12, b: 332 };
    c.sx = A.lin(-L, L, c.l, c.r); c.sy = A.lin(-L, L, c.b, c.t);
    function pintar() {
      var r = Math.max(-0.999, Math.min(0.999, e.r)), curva = !normal && e.forma === "curva", h = "", dentro = "", k;
      var xs = [], ys = [];
      for (k = 0; k < N; k++) {
        if (curva) { xs.push(z1[k] * 1.25); ys.push(1.05 * z1[k] * z1[k] - 1.4 + 0.22 * z2[k]); }
        else { xs.push(e.s1 * z1[k]); ys.push(e.s2 * (e.r * z1[k] + Math.sqrt(Math.max(1 - e.r * e.r, 0)) * z2[k])); }
      }
      h += A.ln(c.l, c.sy(0), c.r, c.sy(0), "reja") + A.ln(c.sx(0), c.t, c.sx(0), c.b, "reja");
      h += A.ejes({ l: c.l, r: c.r, t: c.t, b: c.b, sx: c.sx, sy: c.sy, xt: A.marcas(-L + 0.4, L - 0.4, 6), yt: A.marcas(-L + 0.4, L - 0.4, 6), xl: normal ? "X₁" : "X", yl: normal ? "X₂" : "Y" });
      if (normal) [2.45, 1.6, 0.8].forEach(function (rad) {
        dentro += A.camino(A.elipse([0, 0], e.s1 * e.s1, r * e.s1 * e.s2, e.s2 * e.s2, rad).map(function (q) { return [c.sx(q[0]), c.sy(q[1])]; }), "s1", true, ' stroke-width="1.6"');
      });
      for (k = 0; k < N; k++) dentro += A.ci(c.sx(xs[k]), c.sy(ys[k]), 3.3, normal ? "k4" : "punto", ' opacity=".8"');
      h += A.recorte(c, dentro);
      z.svg.innerHTML = A.svg(380, 366, h, normal ? "Nube y contornos de una normal bivariada" : "Nube de puntos con la correlación elegida");
      salida(el, "r", A.n(e.r)); salida(el, "s1", A.n(e.s1, 1)); salida(el, "s2", A.n(e.s2, 1));
      var rg = el.querySelector('input[data-k="r"]'); if (rg) rg.disabled = curva;
      if (normal) {
        var cv = e.r * e.s1 * e.s2;
        z.lect.innerHTML = '<span class="fig-matriz">Σ = <table><tr><td>' + A.n(e.s1 * e.s1) + "</td><td>" + A.n(cv) + "</td></tr><tr><td>" + A.n(cv) + "</td><td>" + A.n(e.s2 * e.s2) + "</td></tr></table></span> " +
          (Math.abs(e.r) < 0.025 ? "Con ρ = 0 la elipse queda derecha (sin inclinación): en la normal bivariada eso significa <strong>independencia</strong>."
            : "La covarianza " + (e.r > 0 ? "positiva inclina la elipse hacia arriba" : "negativa inclina la elipse hacia abajo") + "; las varianzas la estiran en cada eje.");
      } else if (curva) {
        var q = A.cov2(xs, ys), rr = q.sxy / Math.sqrt(q.sxx * q.syy);
        z.lect.innerHTML = "r = <strong>" + A.n(rr) + "</strong>: prácticamente cero, y sin embargo Y depende claramente de X. La relación existe, pero <strong>no es lineal</strong>: correlación 0 no implica independencia.";
      } else {
        z.lect.innerHTML = "r = <strong>" + A.n(e.r) + "</strong>: " + (Math.abs(e.r) < 0.025 ? "nube sin dirección, no se observa relación lineal."
          : "nube " + (e.r > 0 ? "creciente (dirección positiva)" : "decreciente (dirección negativa)") + (Math.abs(e.r) > 0.975 ? "; relación lineal perfecta: todos los puntos sobre una recta." : "; mientras más cerca de ±1, más alineados los puntos."));
      }
    }
    enlazar(el, e, pintar); pintar();
  });

  /* ════════ Región de rechazo y p-valor (estadístico Z) ════════════════
     { cola:"derecha"|"izquierda"|"bilateral", alfa, z } */
  F.tipo("regionRechazo", function (el, p, e) {
    if (e.cola == null) { e.cola = p.cola || "derecha"; e.alfa = p.alfa || 0.05; e.z = p.z == null ? 2.02 : p.z; }
    var zf = armar(el, seg("cola", "H₁:", [["izquierda", "&lt; (cola izquierda)"], ["bilateral", "≠ (bilateral)"], ["derecha", "&gt; (cola derecha)"]], e.cola) +
      seg("alfa", "α =", [[0.01, "0,01"], [0.05, "0,05"], [0.1, "0,10"]], e.alfa) + rango("z", "Estadístico observado z =", -3.6, 3.6, 0.02, e.z));
    var c = { l: 20, r: 440, t: 20, b: 200 };
    c.sx = A.lin(-4, 4, c.l, c.r); c.sy = A.lin(0, 0.43, c.b, c.t);
    function pintar() {
      var a = e.alfa, zo = e.z, h = "", crit, pv, rechaza;
      if (e.cola === "derecha") { crit = A.inversa(A.Fi, 1 - a, 0, 5); pv = 1 - A.Fi(zo); h += A.area(A.fi, crit, 4, c.sx, c.sy, "a2") + A.area(A.fi, Math.max(zo, -4), 4, c.sx, c.sy, "a1"); }
      else if (e.cola === "izquierda") { crit = A.inversa(A.Fi, a, -5, 0); pv = A.Fi(zo); h += A.area(A.fi, -4, crit, c.sx, c.sy, "a2") + A.area(A.fi, -4, Math.min(zo, 4), c.sx, c.sy, "a1"); }
      else {
        crit = A.inversa(A.Fi, 1 - a / 2, 0, 5); pv = 2 * (1 - A.Fi(Math.abs(zo)));
        h += A.area(A.fi, crit, 4, c.sx, c.sy, "a2") + A.area(A.fi, -4, -crit, c.sx, c.sy, "a2") + A.area(A.fi, Math.abs(zo), 4, c.sx, c.sy, "a1") + A.area(A.fi, -4, -Math.abs(zo), c.sx, c.sy, "a1");
      }
      rechaza = pv <= a;
      h += A.camino(A.curva(A.fi, -4, 4, c.sx, c.sy), "serie") + A.ln(c.l, c.b, c.r, c.b, "eje");
      [-3, -2, -1, 0, 1, 2, 3].forEach(function (v) { h += A.ln(c.sx(v), c.b, c.sx(v), c.b + 4) + A.tx(c.sx(v), c.b + 16, String(v).replace("-", "−"), "ten", "middle", 10); });
      (e.cola === "bilateral" ? [-crit, crit] : [crit]).forEach(function (v) {
        h += A.ln(c.sx(v), c.b, c.sx(v), c.sy(0.25), "guia") + A.tx(c.sx(v) + (v > 0 ? -5 : 5), c.sy(0.25) + 8, "crítico " + A.n(v, 3).replace("-", "−"), "t2", v > 0 ? "end" : "start", 10.5);
      });
      h += A.ln(c.sx(zo), c.b, c.sx(zo), c.sy(0.41), "l1", ' stroke-width="2.5"') + A.tx(c.sx(zo), c.sy(0.41) - 4, "z obs = " + A.n(zo).replace("-", "−"), "t1", zo > 2.6 ? "end" : zo < -2.6 ? "start" : "middle", 11);
      zf.svg.innerHTML = A.svg(460, 226, h, "Distribución del estadístico bajo H0 con la región de rechazo y el p-valor");
      salida(el, "z", A.n(e.z).replace("-", "−"));
      zf.lect.innerHTML = A.chip(2, "región de rechazo (área = α = " + A.nn(a) + ")") + A.chip(1, "p-valor (área tan extrema o más que lo observado)") +
        "<br>p-valor = <strong>" + A.n(pv, 4) + "</strong> " + (rechaza ? "≤" : "&gt;") + " " + A.nn(a) + " ⇒ <strong>" + (rechaza ? "se rechaza H₀" : "no se rechaza H₀") + "</strong>" +
        " (el estadístico " + (rechaza ? "cae dentro" : "queda fuera") + " de la región de rechazo: es la misma decisión).";
    }
    enlazar(el, e, pintar); pintar();
  });

  /* ═════════════ t de Student vs. normal ═══════════════════════════════
     { gl } */
  function lgamma(x) {
    var co = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
    var y = x, t = x + 5.5, s = 1.000000000190015;
    t -= (x + 0.5) * Math.log(t);
    for (var j = 0; j < 6; j++) s += co[j] / ++y;
    return -t + Math.log(2.5066282746310005 * s / x);
  }
  function densT(gl) {
    var k = Math.exp(lgamma((gl + 1) / 2) - lgamma(gl / 2)) / Math.sqrt(gl * Math.PI);
    return function (x) { return k * Math.pow(1 + x * x / gl, -(gl + 1) / 2); };
  }
  /* Cuantil superior de la t por integración de Simpson + bisección. */
  function criticoT(gl, alfa) {
    var f = densT(gl);
    var acum = function (x) { var n = 400, h = x / n, s = f(0) + f(x); for (var i = 1; i < n; i++) s += f(i * h) * (i % 2 ? 4 : 2); return 0.5 + s * h / 3; };
    return A.inversa(acum, 1 - alfa, 0, 80);
  }
  F.tipo("tStudent", function (el, p, e) {
    if (e.gl == null) e.gl = p.gl || 5;
    var z = armar(el, rango("gl", "Grados de libertad (n − 1) =", 1, 30, 1, e.gl));
    var c = { l: 20, r: 440, t: 16, b: 200 };
    c.sx = A.lin(-4.5, 4.5, c.l, c.r); c.sy = A.lin(0, 0.43, c.b, c.t);
    function pintar() {
      var f = densT(e.gl), ct = criticoT(e.gl, 0.05), cz = 1.645, h = "";
      h += A.area(f, Math.min(ct, 4.5), 4.5, c.sx, c.sy, "a1");
      h += A.camino(A.curva(A.fi, -4.5, 4.5, c.sx, c.sy), "l0", false, ' stroke-dasharray="5 4" stroke-width="1.8"') + A.camino(A.curva(f, -4.5, 4.5, c.sx, c.sy), "serie");
      h += A.ln(c.l, c.b, c.r, c.b, "eje");
      [-4, -3, -2, -1, 0, 1, 2, 3, 4].forEach(function (v) { h += A.ln(c.sx(v), c.b, c.sx(v), c.b + 4) + A.tx(c.sx(v), c.b + 16, String(v).replace("-", "−"), "ten", "middle", 10); });
      h += A.ln(c.sx(cz), c.b, c.sx(cz), c.sy(0.36), "guia0") + A.tx(c.sx(cz) + 4, c.sy(0.36) + 9, "z = 1,645 (normal)", "ten", "start", 10.5);
      if (ct < 4.5) h += A.ln(c.sx(ct), c.b, c.sx(ct), c.sy(0.27), "l1", ' stroke-width="2"') + A.tx(c.sx(ct) + 4, c.sy(0.27) - 4, "t = " + A.n(ct, 3), "t1", "start", 11);
      h += A.tx(c.sx(-2.6), c.sy(0.33), "normal (línea punteada)", "ten", "middle", 10.5) + A.tx(c.sx(-2.6), c.sy(0.29), "t de Student (línea continua)", "t1", "middle", 10.5);
      z.svg.innerHTML = A.svg(460, 224, h, "Densidad de la t de Student comparada con la normal");
      salida(el, "gl", String(e.gl));
      z.lect.innerHTML = "Con " + e.gl + " grados de libertad, el valor crítico de cola derecha al 5 % es <strong>t = " + A.n(ct, 3) + "</strong> (la normal daría 1,645). " +
        (e.gl <= 5 ? "Pocos datos ⇒ colas pesadas ⇒ hay que alejarse más para rechazar." : e.gl >= 25 ? "Con muchos datos la t casi coincide con la normal." : "Al crecer n las colas se adelgazan y la t se acerca a la normal.");
    }
    enlazar(el, e, pintar); pintar();
  });

  /* ══════════════ α, β y potencia (media, σ conocida, bilateral) ═══════
     { mu0, mu1, sigma, n, alfa, rango:[a,b], rmu1:[min,max,paso], rsigma:[..], dec } */
  F.tipo("potencia", function (el, p, e) {
    if (e.mu1 == null) { e.mu1 = p.mu1; e.n = p.n; e.sigma = p.sigma; e.alfa = p.alfa || 0.05; }
    var d = p.dec == null ? 3 : p.dec;
    var z = armar(el, rango("mu1", "Media verdadera μ =", p.rmu1[0], p.rmu1[1], p.rmu1[2], e.mu1) + rango("n", "n =", 5, 100, 1, e.n) +
      rango("sigma", "σ =", p.rsigma[0], p.rsigma[1], p.rsigma[2], e.sigma) + seg("alfa", "α =", [[0.01, "0,01"], [0.05, "0,05"], [0.1, "0,10"]], e.alfa));
    var c = { l: 20, r: 450, t: 34, b: 210 };
    c.sx = A.lin(p.rango[0], p.rango[1], c.l, c.r);
    function pintar() {
      var se = e.sigma / Math.sqrt(e.n), zc = A.inversa(A.Fi, 1 - e.alfa / 2, 0, 5), li = p.mu0 - zc * se, ls = p.mu0 + zc * se;
      var f0 = function (x) { return A.fi((x - p.mu0) / se) / se; }, f1 = function (x) { return A.fi((x - e.mu1) / se) / se; };
      var sy = A.lin(0, f0(p.mu0) * 1.06, c.b, c.t), a = p.rango[0], b = p.rango[1], h = "";
      var beta = A.Fi((ls - e.mu1) / se) - A.Fi((li - e.mu1) / se);
      var dentro = A.area(f1, a, li, c.sx, sy, "a5") + A.area(f1, ls, b, c.sx, sy, "a5") + A.area(f1, li, ls, c.sx, sy, "a3") +
        A.area(f0, a, li, c.sx, sy, "a2") + A.area(f0, ls, b, c.sx, sy, "a2") +
        A.camino(A.curva(f0, a, b, c.sx, sy, 200), "l1", false, ' stroke-width="2.2"') + A.camino(A.curva(f1, a, b, c.sx, sy, 200), "l4", false, ' stroke-width="2.2"');
      h += A.recorte({ l: c.l, r: c.r, t: 0, b: c.b }, dentro) + A.ln(c.l, c.b, c.r, c.b, "eje");
      A.marcas(a, b, 6).forEach(function (v) { h += A.ln(c.sx(v), c.b, c.sx(v), c.b + 4) + A.tx(c.sx(v), c.b + 16, A.nn(v, 4), "ten", "middle", 10); });
      [li, ls].forEach(function (v) { h += A.ln(c.sx(v), c.b, c.sx(v), c.t - 6, "guia"); });
      h += A.tx(c.sx(p.mu0), c.b + 34, "← rechazo │ no se rechaza H₀ │ rechazo →", "ten", "middle", 10.5);
      var izq = e.mu1 >= p.mu0;
      h += A.tx(c.sx(p.mu0) + (izq ? -8 : 8), c.t - 16, "si H₀ es cierta (μ = " + A.nn(p.mu0, d) + ")", "t1", izq ? "end" : "start", 11);
      h += A.tx(c.sx(e.mu1) + (izq ? 8 : -8), c.t - 16, "si la media real es " + A.n(e.mu1, d), "t4", izq ? "start" : "end", 11);
      z.svg.innerHTML = A.svg(470, 250, h, "Distribución de la media muestral bajo H0 y bajo el valor verdadero, con alfa, beta y potencia");
      salida(el, "mu1", A.n(e.mu1, d)); salida(el, "n", String(e.n)); salida(el, "sigma", A.nn(e.sigma, 3));
      z.lect.innerHTML = A.chip(2, "α = " + A.nn(e.alfa) + " (rechazar H₀ siendo cierta)") + A.chip(3, "β = " + A.n(beta) + " (no rechazar siendo falsa)") + A.chip(5, "potencia = " + A.n(1 - beta)) +
        "<br>Límites de no rechazo: " + A.n(li, 4) + " y " + A.n(ls, 4) + " (error estándar σ/√n = " + A.n(se, 4) + "). " +
        (Math.abs(e.mu1 - p.mu0) < 1e-9 ? "Si la media real <em>es</em> la de H₀ no hay error tipo II que cometer: β solo existe para un valor verdadero distinto."
          : "Mueve un control a la vez: β baja al subir n, al alejar la media real, al bajar σ o al subir α.");
    }
    enlazar(el, e, pintar); pintar();
  });

  /* ═════════ Proyección sobre una dirección: PCA y Fisher ══════════════
     { modo:"varianza"|"fisher", x, y, grupos:[0/1…], nombres:[g0,g1], ejes, dec, atajos:[[ángulo, texto]] } */
  F.tipo("proyeccion", function (el, p, e) {
    var fisher = p.modo === "fisher", n = p.x.length, s = A.cov2(p.x, p.y), dec = p.dec == null ? 2 : p.dec, i;
    var pts = p.x.map(function (x, k) { return [x, p.y[k]]; });
    /* Dirección óptima. */
    var opt, W, B, mg;
    if (fisher) {
      W = [0, 0, 0]; mg = [[0, 0, 0], [0, 0, 0]];
      pts.forEach(function (q, k) { var g = mg[p.grupos[k]]; g[0] += q[0]; g[1] += q[1]; g[2]++; });
      mg.forEach(function (g) { g[0] /= g[2]; g[1] /= g[2]; });
      pts.forEach(function (q, k) { var g = mg[p.grupos[k]], a = q[0] - g[0], b = q[1] - g[1]; W[0] += a * a; W[1] += a * b; W[2] += b * b; });
      B = [0, 0, 0];
      mg.forEach(function (g) { var a = g[0] - s.mx, b = g[1] - s.my; B[0] += g[2] * a * a; B[1] += g[2] * a * b; B[2] += g[2] * b * b; });
      var det = W[0] * W[2] - W[1] * W[1], d0 = mg[0][0] - mg[1][0], d1 = mg[0][1] - mg[1][1];
      opt = Math.atan2((-W[1] * d0 + W[0] * d1) / det, (W[2] * d0 - W[1] * d1) / det) * 180 / Math.PI;
    } else opt = 0.5 * Math.atan2(2 * s.sxy, s.sxx - s.syy) * 180 / Math.PI;
    opt = ((opt % 180) + 180) % 180;
    function medida(ang) {
      var t = ang * Math.PI / 180, c = Math.cos(t), sn = Math.sin(t);
      if (fisher) return (c * c * B[0] + 2 * c * sn * B[1] + sn * sn * B[2]) / (c * c * W[0] + 2 * c * sn * W[1] + sn * sn * W[2]);
      return c * c * s.sxx + 2 * c * sn * s.sxy + sn * sn * s.syy;
    }
    var maximo = medida(opt);
    if (e.ang == null) e.ang = p.ang == null ? 0 : p.ang;
    var ctrl = rango("ang", "Dirección de la recta:", 0, 180, 1, Math.round(e.ang));
    (p.atajos || []).forEach(function (a, k) { ctrl += boton("atajo" + k, a[1]); });
    ctrl += boton("opt", fisher ? "▶ Girar hasta la dirección de Fisher" : "▶ Girar hasta la máxima varianza");
    var z = armar(el, ctrl), c = cajaIgual(pts, { l: 44, r: 446, t: 12, b: 318 }, fisher ? 0.16 : 0.3);
    function pintar() {
      var t = e.ang * Math.PI / 180, ux = Math.cos(t), uy = Math.sin(t), h = "", dentro = "", L = 100, k;
      var enOpt = Math.abs(e.ang - opt) < 0.75 || Math.abs(Math.abs(e.ang - opt) - 180) < 0.75;
      h += A.ejes({ l: c.l, r: c.r, t: c.t, b: c.b, sx: c.sx, sy: c.sy, xt: A.marcas(c.x0, c.x1, 6), yt: A.marcas(c.y0, c.y1, 5), xl: (p.ejes || ["X₁", "X₂"])[0], yl: (p.ejes || ["X₁", "X₂"])[1] });
      var P0 = [c.sx(s.mx), c.sy(s.my)];
      if (!fisher && enOpt) dentro += A.ln(c.sx(s.mx + L * uy), c.sy(s.my - L * ux), c.sx(s.mx - L * uy), c.sy(s.my + L * ux), "l4", ' stroke-width="1.6" stroke-dasharray="6 4"');
      dentro += A.ln(c.sx(s.mx - L * ux), c.sy(s.my - L * uy), c.sx(s.mx + L * ux), c.sy(s.my + L * uy), "l0", ' stroke-width="2.2"');
      var proy = pts.map(function (q) { return (q[0] - s.mx) * ux + (q[1] - s.my) * uy; });
      var color = function (k) { return fisher ? (p.grupos[k] ? 2 : 1) : 1; };
      pts.forEach(function (q, k) {
        var fx = c.sx(s.mx + proy[k] * ux), fy = c.sy(s.my + proy[k] * uy);
        dentro += A.ln(c.sx(q[0]), c.sy(q[1]), fx, fy, "l" + color(k), ' stroke-width="1" opacity=".45"');
      });
      var corte = 0, m0 = 0, m1 = 0, bien = 0;
      if (fisher) {
        m0 = (mg[0][0] - s.mx) * ux + (mg[0][1] - s.my) * uy; m1 = (mg[1][0] - s.mx) * ux + (mg[1][1] - s.my) * uy; corte = (m0 + m1) / 2;
        proy.forEach(function (v, k) { if (((v - corte) * (m0 - corte) > 0 ? 0 : 1) === p.grupos[k]) bien++; });
        var qx = s.mx + corte * ux, qy = s.my + corte * uy;
        dentro += A.ln(c.sx(qx + L * uy), c.sy(qy - L * ux), c.sx(qx - L * uy), c.sy(qy + L * ux), "guia0", ' stroke-width="1.8"');
      }
      pts.forEach(function (q, k) {
        dentro += A.ci(c.sx(s.mx + proy[k] * ux), c.sy(s.my + proy[k] * uy), 3.4, "hueco" + color(k)) + A.ci(c.sx(q[0]), c.sy(q[1]), 4.6, "k" + color(k));
      });
      if (!fisher) dentro += A.ci(P0[0], P0[1], 3, "tinta");
      h += A.recorte(c, dentro);
      if (!fisher && enOpt) h += A.tx(c.r - 6, c.t + 14, "PC1 (continua) y PC2 (punteada, perpendicular)", "ten", "end", 10.5);
      z.svg.innerHTML = A.svg(460, 352, h, fisher ? "Los dos grupos proyectados sobre una dirección" : "Puntos proyectados sobre una dirección que pasa por la media");
      salida(el, "ang", Math.round(e.ang) + "°");
      var rg = el.querySelector('input[data-k="ang"]'); if (rg && +rg.value !== Math.round(e.ang)) rg.value = Math.round(e.ang);
      var v = medida(e.ang), barra = '<span class="fig-barra"><i style="width:' + Math.max(1, Math.min(100, 100 * v / maximo)).toFixed(1) + '%"></i></span>';
      if (fisher) {
        z.lect.innerHTML = A.chip(1, p.nombres[0]) + A.chip(2, p.nombres[1]) + "línea punteada = frontera (corte en el punto medio de las medias proyectadas)<br>" +
          "Señal/ruido (entre grupos ÷ dentro de los grupos) = <strong>" + A.n(v, 2) + "</strong> de un máximo de " + A.n(maximo, 2) + " " + barra +
          "<br>Aciertos al clasificar con esta dirección: <strong>" + bien + " de " + n + "</strong> (" + A.nn(100 * bien / n, 2) + " %)." +
          (enOpt ? " Esta es la dirección de Fisher: la que mejor separa las proyecciones de ambos grupos." : "");
      } else {
        z.lect.innerHTML = "Varianza de las proyecciones (círculos huecos) = <strong>" + A.n(v, dec) + "</strong> de un máximo de " + A.n(maximo, dec) + " " + barra +
          (enOpt ? "<br>Esta dirección es <strong>PC1</strong>: su varianza es el mayor autovalor λ₁ = " + A.n(maximo, dec) + ". La perpendicular es PC2, con λ₂ = " + A.n(s.sxx + s.syy - maximo, dec) + "."
            : "<br>Gira la recta: PC1 es la dirección donde los puntos proyectados quedan más esparcidos.");
      }
    }
    function girar(hasta) {
      var desde = e.ang, dif = hasta - desde;
      animar(el, e, 1100, function (u) { e.ang = desde + dif * u; pintar(); });
    }
    var acciones = { opt: function () { girar(opt); } };
    (p.atajos || []).forEach(function (a, k) { acciones["atajo" + k] = function () { girar(a[0]); }; });
    enlazar(el, e, pintar, acciones); pintar();
  });

  /* ══════════════ Rotación de factores ═════════════════════════════════
     { variables:[{n, a:[f1,f2]}], ang } */
  F.tipo("rotacion", function (el, p, e) {
    if (e.ang == null) e.ang = p.ang || 0;
    var z = armar(el, rango("ang", "Giro de los ejes θ =", 0, 90, 1, e.ang) + boton("clase", "θ = 45° (la matriz T de la clase)") + boton("cero", "Sin rotar"));
    var c0x = 140, c0y = 200, R = 150;
    function pintar() {
      var t = e.ang * Math.PI / 180, c = Math.cos(t), s = Math.sin(t), h = A.flecha;
      h += A.ln(c0x - 100, c0y, c0x + 190, c0y, "eje") + A.ln(c0x, c0y + 100, c0x, c0y - 178, "eje") + A.tx(c0x + 190, c0y + 15, "F₁", "ten", "end", 11.5) + A.tx(c0x - 7, c0y - 170, "F₂", "ten", "end", 11.5);
      [0.5, 1].forEach(function (v) { h += A.ln(c0x + v * R, c0y - 3, c0x + v * R, c0y + 3) + A.ln(c0x - 3, c0y - v * R, c0x + 3, c0y - v * R) + A.tx(c0x + v * R, c0y + 15, A.nn(v), "ten", "middle", 9.5) + A.tx(c0x - 7, c0y - v * R + 3, A.nn(v), "ten", "end", 9.5); });
      /* Ejes rotados: F1' = (cos θ, −sin θ), F2' = (sin θ, cos θ). */
      h += A.ln(c0x - 0.6 * R * c, c0y - 0.6 * R * s, c0x + 1.12 * R * c, c0y + 1.12 * R * s, "l2", ' stroke-width="2" marker-end="url(#fig-fl)"') +
        A.ln(c0x - 0.6 * R * s, c0y + 0.6 * R * c, c0x + 1.12 * R * s, c0y - 1.12 * R * c, "l2", ' stroke-width="2" marker-end="url(#fig-fl)"');
      h += A.tx(c0x + 1.2 * R * c, c0y + 1.2 * R * s + 4, "F₁′", "t2 fuerte", "middle", 12.5) + A.tx(c0x + 1.2 * R * s, c0y - 1.2 * R * c + 4, "F₂′", "t2 fuerte", "middle", 12.5);
      var filas = "";
      p.variables.forEach(function (v) {
        var x = c0x + v.a[0] * R, y = c0y - v.a[1] * R, n1 = v.a[0] * c - v.a[1] * s, n2 = v.a[0] * s + v.a[1] * c;
        /* Proyección del punto sobre F1' (su nueva carga en ese factor). */
        h += A.ln(x, y, c0x + n1 * R * c, c0y + n1 * R * s, "l2", ' stroke-width="1" opacity=".5" stroke-dasharray="3 3"');
        var et = { izq: [-8, -6, "end"], der: [8, -6, "start"], abajo: [0, 17, "middle"], arriba: [0, -9, "middle"] }[v.pos || "der"];
        h += A.ci(x, y, 5, "k1") + A.tx(x + et[0], y + et[1], v.n, "", et[2], 11.5);
        var fuerte = function (q) { return Math.abs(q) >= 0.5 ? "<strong>" + A.n(q).replace("-", "−") + "</strong>" : A.n(q).replace("-", "−"); };
        filas += "<tr><th>" + A.esc(v.n) + "</th><td>" + fuerte(n1) + "</td><td>" + fuerte(n2) + "</td><td>" + A.nn(n1 * n1 + n2 * n2, 4) + "</td></tr>";
      });
      z.svg.innerHTML = A.svg(400, 400, h, "Las variables como puntos en el plano de los factores y los ejes rotados");
      salida(el, "ang", e.ang + "°");
      z.lect.innerHTML = '<table class="fig-tabla"><thead><tr><th></th><th>carga en F₁′</th><th>carga en F₂′</th><th>h²</th></tr></thead><tbody>' + filas + "</tbody></table>" +
        "Los puntos (las variables) no se mueven: solo giran los ejes. Por eso cambian las cargas pero <strong>la comunalidad h² no cambia</strong>. " +
        "En negrita, las cargas ≥ 0,5: la rotación busca que cada variable tenga una sola.";
    }
    enlazar(el, e, pintar, { clase: function () { e.ang = 45; marcar(el, e); pintar(); }, cero: function () { e.ang = 0; marcar(el, e); pintar(); } });
    pintar();
  });

  /* ══════════ Dendrograma: construcción paso a paso y corte ════════════
     { hojas:[..], fusiones:[[a,b,altura]] (a/b = nombre de hoja o n.º de fusión previa), puntos:{nombre:[x,y]},
       enlace:"single"|"complete", pasos:true, textos:[..], corte:true, ejeMax } */
  F.tipo("dendrograma", function (el, p, e) {
    var nf = p.fusiones.length, conPuntos = !!p.puntos;
    if (e.paso == null) { e.paso = p.pasos ? 0 : nf; e.corte = p.corteInicial || 1; }
    var max = p.ejeMax || p.fusiones[nf - 1][2] * 1.15, ctl = p.pasos ? pasos(el, e, function () { return nf; }, function () { pintar(); }) : null;
    var z = armar(el, (ctl ? ctl.html : "") + (p.corte ? rango("corte", "Altura del corte =", 0.05, Math.floor(max * 20) / 20, 0.05, e.corte) : ""));
    var d = { l: 58, r: 350, t: 18, b: 240 }, sy = A.lin(0, max, d.b, d.t);
    var hx = {}; p.hojas.forEach(function (n, i) { hx[n] = d.l + 26 + i * (d.r - d.l - 44) / (p.hojas.length - 1); });
    /* Nodos de cada fusión: posición y miembros. */
    var nodos = p.fusiones.map(function () { return null; });
    function ref(a) { return typeof a === "number" ? nodos[a - 1] : { x: hx[a], y: sy(0), m: [a] }; }
    p.fusiones.forEach(function (f, i) { var a = ref(f[0]), b = ref(f[1]); nodos[i] = { x: (a.x + b.x) / 2, y: sy(f[2]), m: a.m.concat(b.m), a: a, b: b, h: f[2] }; });
    var cs = conPuntos ? cajaIgual(p.hojas.map(function (n) { return p.puntos[n]; }), { l: 10, r: 310, t: 18, b: 240 }, 0.22) : null;
    function grupos(activa) {
      /* Clústeres vigentes: cada hoja queda en la fusión activa más alta que la contiene. */
      var de = {}; p.hojas.forEach(function (n) { de[n] = n; });
      var lista = {}; p.hojas.forEach(function (n) { lista[n] = [n]; });
      p.fusiones.forEach(function (f, i) {
        if (!activa(f, i)) return;
        var m = nodos[i].m, clave = "f" + i;
        m.forEach(function (n) { delete lista[de[n]]; de[n] = clave; });
        lista[clave] = m;
      });
      return Object.keys(lista).map(function (k) { return lista[k]; });
    }
    function pintar() {
      var activa = p.pasos ? function (f, i) { return i < e.paso; } : p.corte ? function (f) { return f[2] <= e.corte; } : function () { return false; };
      var gs = grupos(activa), h = "", colorDe = {}, k = 0;
      gs.sort(function (a, b) { return p.hojas.indexOf(a[0]) - p.hojas.indexOf(b[0]); }).forEach(function (g) { k++; g.forEach(function (n) { colorDe[n] = ((k - 1) % 5) + 1; }); });
      /* Dendrograma. */
      h += '<path class="eje" d="M' + d.l + " " + d.t + "V" + d.b + '"/>';
      A.marcas(0, max, 5).forEach(function (v) { h += A.ln(d.l - 4, sy(v), d.l, sy(v)) + A.tx(d.l - 7, sy(v) + 3.5, A.nn(v), "ten", "end", 10); });
      h += '<text x="' + (d.l - 36) + '" y="' + ((d.t + d.b) / 2) + '" text-anchor="middle" font-size="11" class="ten" transform="rotate(-90 ' + (d.l - 36) + " " + ((d.t + d.b) / 2) + ')">altura = distancia de fusión</text>';
      p.fusiones.forEach(function (f, i) {
        var visible = p.pasos ? i < e.paso : true, nueva = p.pasos && i === e.paso - 1, nd = nodos[i];
        if (!visible) return;
        h += '<path class="' + (nueva ? "l2" : "l0") + '" stroke-width="' + (nueva ? 3 : 2) + '" d="M' + nd.a.x.toFixed(1) + " " + nd.a.y.toFixed(1) + "V" + nd.y.toFixed(1) + "H" + nd.b.x.toFixed(1) + "V" + nd.b.y.toFixed(1) + '"/>';
        h += A.tx(nd.x, nd.y - 5, A.n(f[2]), nueva ? "t2 fuerte" : "ten", "middle", 10.5);
      });
      p.hojas.forEach(function (n) { h += A.ci(hx[n], sy(0), 4, "k" + colorDe[n]) + A.tx(hx[n], d.b + 18, n, "t" + colorDe[n], "middle", 11.5); });
      if (p.corte) h += A.ln(d.l, sy(e.corte), d.r, sy(e.corte), "guia", ' stroke-width="2"') + A.tx(d.r, sy(e.corte) - 5, "corte", "t2", "end", 10.5);
      var panel = [A.svg(360, 270, h, "Dendrograma")];
      /* Dispersión con los clústeres vigentes. */
      if (conPuntos) {
        h = "";
        var px = function (n) { return [cs.sx(p.puntos[n][0]), cs.sy(p.puntos[n][1])]; };
        h += A.rect(cs.l, cs.t, cs.r - cs.l, cs.b - cs.t, "marco", ' rx="6"');
        gs.slice().sort(function (a, b) { return b.length - a.length; }).forEach(function (g) { if (g.length > 1) h += A.mancha(g.map(px), colorDe[g[0]], 26 + 5 * g.length); });
        if (p.pasos && e.paso > 0 && p.enlace) {
          var nd = nodos[e.paso - 1], mejor = null;
          nd.a.m.forEach(function (a) { nd.b.m.forEach(function (b) {
            var dd = A.dist(p.puntos[a], p.puntos[b]);
            if (!mejor || (p.enlace === "single" ? dd < mejor[2] : dd > mejor[2])) mejor = [a, b, dd];
          }); });
          var q1 = px(mejor[0]), q2 = px(mejor[1]);
          h += A.ln(q1[0], q1[1], q2[0], q2[1], "l2", ' stroke-width="2.5"') + A.tx((q1[0] + q2[0]) / 2 + 6, (q1[1] + q2[1]) / 2 - 6, A.n(nd.h), "t2 fuerte", "start", 11);
        }
        p.hojas.forEach(function (n) { var q = px(n); h += A.ci(q[0], q[1], 5, "k" + colorDe[n]) + A.tx(q[0] + 8, q[1] - 7, n, "", "start", 11); });
        h += A.tx((cs.l + cs.r) / 2, cs.b + 18, p.ejePuntos || "las observaciones", "ten", "middle", 10.5);
        panel.unshift(A.svg(320, 270, h, "Dispersión de las observaciones con los clústeres vigentes"));
      }
      z.svg.innerHTML = '<div class="fig-paneles fig-paneles-2">' + panel.join("") + "</div>";
      var txt = "";
      if (p.pasos) {
        salida(el, "paso", "Paso " + e.paso + " de " + nf);
        txt = (p.textos || [])[e.paso] || "";
      }
      if (p.corte) {
        salida(el, "corte", A.n(e.corte));
        txt += (txt ? "<br>" : "") + "Cortando a la altura " + A.n(e.corte) + " quedan <strong>" + gs.length + " clúster" + (gs.length === 1 ? "" : "es") + "</strong>: " +
          gs.map(function (g) { return "{" + g.join(", ") + "}"; }).join(" ") + ". Cada rama vertical que cruza la línea es un clúster.";
      }
      z.lect.innerHTML = txt;
    }
    enlazar(el, e, pintar, ctl ? ctl.acciones : null); pintar();
  });

  /* ═════════════ K-medias paso a paso ══════════════════════════════════
     { puntos:{nombre:[x,y]}, iniciales:[[n1,n2], …], ejes } */
  F.tipo("kmedias", function (el, p, e) {
    var nombres = Object.keys(p.puntos), pts = nombres.map(function (n) { return p.puntos[n]; });
    if (e.paso == null) { e.paso = 0; e.ini = 0; }
    var estados = [];
    function calcular() {
      var cen = p.iniciales[e.ini].map(function (n) { return p.puntos[n].slice(); }), previa = null, it = 0;
      estados = [{ tipo: "inicio", cen: cen }];
      while (it < 20) {
        it++;
        var asg = pts.map(function (q) { var m = 0; cen.forEach(function (c, k) { if (A.dist(q, c) < A.dist(q, cen[m])) m = k; }); return m; });
        var igual = previa && asg.every(function (a, i) { return a === previa[i]; });
        estados.push({ tipo: "asignar", it: it, cen: cen, asg: asg, igual: igual });
        if (igual) break;
        var nuevo = cen.map(function (c, k) {
          var mios = pts.filter(function (q, i) { return asg[i] === k; });
          return mios.length ? [A.media(mios.map(function (q) { return q[0]; })), A.media(mios.map(function (q) { return q[1]; }))] : c;
        });
        estados.push({ tipo: "mover", it: it, cen: nuevo, antes: cen, asg: asg });
        cen = nuevo; previa = asg;
      }
    }
    calcular();
    var ctl = pasos(el, e, function () { return estados.length - 1; }, function (anim) { pintar(anim); });
    var z = armar(el, (p.iniciales.length > 1 ? seg("ini", "Centroides iniciales:", p.iniciales.map(function (v, i) { return [i, v.join(" y ")]; }), e.ini) : "") + ctl.html);
    var c = cajaIgual(pts, { l: 48, r: 440, t: 12, b: 300 }, 0.2);
    var gr = function (k) { return "{" + nombres.filter(function (n, i) { return k.asg[i] === k.g; }).join(", ") + "}"; };
    function dibujar(st, u) {
      var h = A.ejes({ l: c.l, r: c.r, t: c.t, b: c.b, sx: c.sx, sy: c.sy, xt: A.marcas(c.x0, c.x1, 6), yt: A.marcas(c.y0, c.y1, 5), xl: (p.ejes || ["X₁", "X₂"])[0], yl: (p.ejes || ["X₁", "X₂"])[1] });
      var cen = st.cen.map(function (q, k) { return st.tipo === "mover" ? [st.antes[k][0] + (q[0] - st.antes[k][0]) * u, st.antes[k][1] + (q[1] - st.antes[k][1]) * u] : q; });
      if (st.asg) {
        cen.forEach(function (q, k) {
          var mios = pts.filter(function (w, i) { return st.asg[i] === k; });
          if (mios.length) h += A.mancha(mios.map(function (w) { return [c.sx(w[0]), c.sy(w[1])]; }), k ? 2 : 1, 34);
        });
        pts.forEach(function (q, i) { var m = cen[st.asg[i]]; h += A.ln(c.sx(q[0]), c.sy(q[1]), c.sx(m[0]), c.sy(m[1]), "l" + (st.asg[i] ? 2 : 1), ' stroke-width="1.3" opacity=".6"'); });
      }
      if (st.tipo === "mover") st.antes.forEach(function (q, k) {
        h += A.ci(c.sx(q[0]), c.sy(q[1]), 7, "hueco" + (k ? 2 : 1), ' stroke-dasharray="3 2"') + A.ln(c.sx(q[0]), c.sy(q[1]), c.sx(cen[k][0]), c.sy(cen[k][1]), "l" + (k ? 2 : 1), ' stroke-width="1.5" stroke-dasharray="4 3"');
      });
      pts.forEach(function (q, i) { h += A.ci(c.sx(q[0]), c.sy(q[1]), 5, st.asg ? "k" + (st.asg[i] ? 2 : 1) : "tinta") + A.tx(c.sx(q[0]) + 8, c.sy(q[1]) - 8, nombres[i], "", "start", 11.5); });
      cen.forEach(function (q, k) {
        var x = c.sx(q[0]), y = c.sy(q[1]);
        h += '<path class="l' + (k ? 2 : 1) + '" stroke-width="4" stroke-linecap="round" d="M' + (x - 7).toFixed(1) + " " + (y - 7).toFixed(1) + "l14 14m0 -14l-14 14" + '"/>' + A.tx(x - 11, y + 18, "μ" + (k ? "₂" : "₁"), "t" + (k ? 2 : 1) + " fuerte", "end", 12.5);
      });
      z.svg.innerHTML = A.svg(460, 334, h, "K-medias: observaciones, centroides (cruces) y asignación del paso actual");
    }
    function pintar(anim) {
      e.paso = Math.min(e.paso, estados.length - 1);
      var st = estados[e.paso], t = "";
      var co = function (q) { return "(" + A.n(q[0]) + "; " + A.n(q[1]) + ")"; };
      if (st.tipo === "inicio") t = "<strong>Inicialización:</strong> se eligen k = 2 centroides iniciales, μ₁ = " + p.iniciales[e.ini][0] + " y μ₂ = " + p.iniciales[e.ini][1] + " (las cruces).";
      else if (st.tipo === "asignar") t = "<strong>Iteración " + st.it + " · asignación:</strong> cada observación va al centroide más cercano → " + gr({ asg: st.asg, g: 0 }) + " y " + gr({ asg: st.asg, g: 1 }) + "." +
        (st.igual ? " Nadie cambió de clúster ⇒ <strong>convergencia</strong>." : "");
      else t = "<strong>Iteración " + st.it + " · actualización:</strong> cada centroide se mueve a la media de su clúster: μ₁ = " + co(st.cen[0]) + " y μ₂ = " + co(st.cen[1]) + ".";
      z.lect.innerHTML = t;
      salida(el, "paso", "Paso " + e.paso + " de " + (estados.length - 1));
      if (anim && st.tipo === "mover") animar(el, e, 900, function (u) { dibujar(st, u); }); else { e._anim = 0; dibujar(st, 1); }
    }
    el.addEventListener("click", function (ev) {
      var b = ev.target.closest('button[data-k="ini"]');
      if (b) { ctl.parar(); e.ini = +b.getAttribute("data-v"); e.paso = 0; calcular(); }
    }, true);
    enlazar(el, e, function () { pintar(); }, ctl.acciones); pintar();
  });

  /* ═════════ Agrupación paso a paso con grupos dados (DIANA) ═══════════
     { puntos:{nombre:[x,y]}, pasos:[{ grupos:[[..],[..]], texto, mueve:"E7" }], ejes } */
  F.tipo("agrupacion", function (el, p, e) {
    var nombres = Object.keys(p.puntos), pts = nombres.map(function (n) { return p.puntos[n]; });
    if (e.paso == null) e.paso = 0;
    var ctl = pasos(el, e, function () { return p.pasos.length - 1; }, function () { pintar(); }), z = armar(el, ctl.html);
    var c = cajaIgual(pts, { l: 48, r: 440, t: 12, b: 300 }, 0.2);
    function pintar() {
      var st = p.pasos[e.paso], h = A.ejes({ l: c.l, r: c.r, t: c.t, b: c.b, sx: c.sx, sy: c.sy, xt: A.marcas(c.x0, c.x1, 6), yt: A.marcas(c.y0, c.y1, 5), xl: (p.ejes || ["X₁", "X₂"])[0], yl: (p.ejes || ["X₁", "X₂"])[1] });
      var color = {};
      st.grupos.forEach(function (g, k) {
        g.forEach(function (n) { color[n] = k + 1; });
        h += A.mancha(g.map(function (n) { return [c.sx(p.puntos[n][0]), c.sy(p.puntos[n][1])]; }), k + 1, 36);
      });
      nombres.forEach(function (n) {
        var q = p.puntos[n], x = c.sx(q[0]), y = c.sy(q[1]);
        if (st.mueve === n) h += A.ci(x, y, 11, "hueco" + color[n], ' stroke-width="2.5"');
        h += A.ci(x, y, 5, "k" + color[n]) + A.tx(x + 9, y - 9, n, "", "start", 11.5);
      });
      z.svg.innerHTML = A.svg(460, 334, h, "Observaciones y los clústeres vigentes en este paso");
      z.lect.innerHTML = st.texto;
      salida(el, "paso", "Paso " + e.paso + " de " + (p.pasos.length - 1));
    }
    enlazar(el, e, pintar, ctl.acciones); pintar();
  });

  /* ══════════════════ Silueta de una observación ═══════════════════════ */
  F.tipo("silueta", function (el, p, e) {
    if (e.t == null) e.t = 0.1;
    var z = armar(el, rango("t", "Posición de la observación i:", 0, 1, 0.01, e.t));
    var Ga = [[70, 108], [88, 178], [128, 96], [140, 170], [58, 146]], Gb = [[292, 112], [338, 132], [300, 182], [346, 176], [322, 96]], Gc = [[196, 28], [236, 44], [214, 16]];
    var u = 40, desde = [100, 142], hasta = [318, 142];
    function prom(q, g) { return A.media(g.map(function (w) { return A.dist(q, w); })) / u; }
    function pintar() {
      var q = [desde[0] + (hasta[0] - desde[0]) * e.t, desde[1] + (hasta[1] - desde[1]) * e.t], h = "";
      var a = prom(q, Ga), b = Math.min(prom(q, Gb), prom(q, Gc)), s = (b - a) / Math.max(a, b);
      h += A.mancha(Ga, 1, 44) + A.mancha(Gb, 4, 44) + A.mancha(Gc, 0, 36);
      Ga.forEach(function (w) { h += A.ln(q[0], q[1], w[0], w[1], "l1", ' stroke-width="1.4"'); });
      Gb.forEach(function (w) { h += A.ln(q[0], q[1], w[0], w[1], "l4", ' stroke-width="1.4" stroke-dasharray="4 3"'); });
      Ga.forEach(function (w) { h += A.ci(w[0], w[1], 4.5, "k1"); });
      Gb.forEach(function (w) { h += A.ci(w[0], w[1], 4.5, "k4"); });
      Gc.forEach(function (w) { h += A.ci(w[0], w[1], 4.5, "gris"); });
      h += A.ci(q[0], q[1], 7.5, "k1", ' stroke="var(--tinta)" stroke-width="2"') + A.tx(q[0], q[1] + 24, "i", "fuerte", "middle", 13);
      h += A.tx(60, 222, "su clúster (asignado)", "t1", "start", 11) + A.tx(360, 222, "clúster vecino más cercano", "t4", "end", 11) + A.tx(262, 34, "otro clúster, más lejano: no cuenta", "ten", "start", 10.5);
      z.svg.innerHTML = A.svg(450, 232, h, "Una observación, las distancias a su clúster y al clúster vecino");
      salida(el, "t", "");
      z.lect.innerHTML = A.chip(1, "a(i) = " + A.n(a) + " (promedio a los suyos)") + A.chip(4, "b(i) = " + A.n(b) + " (promedio al vecino)") +
        "<br>s(i) = (" + A.n(b) + " − " + A.n(a) + ") / " + A.n(Math.max(a, b)) + " = <strong>" + A.n(s).replace("-", "−") + "</strong> ⇒ " +
        (s > 0.5 ? "cerca de 1: muy bien asignada." : s > 0.12 ? "positiva: bien asignada, pero ya no tan lejos del vecino." : s >= -0.12 ? "cerca de 0: está en el borde entre dos clústeres." : "negativa: está más cerca del clúster vecino, probablemente mal asignada.");
    }
    enlazar(el, e, pintar); pintar();
  });

  /* ═══════════════ Matriz de confusión y métricas ══════════════════════
     { pos, neg, vp, fn, fp, vn } */
  F.tipo("confusion", function (el, p, e) {
    if (e.m == null) e.m = "exactitud";
    var M = {
      exactitud: ["Exactitud", ["vp", "vn"], ["vp", "vn", "fp", "fn"], "(VP + VN) / Total", "¿qué proporción de todos los casos se clasificó bien?"],
      sensibilidad: ["Sensibilidad", ["vp"], ["vp", "fn"], "VP / (VP + FN)", "de los positivos reales, ¿cuántos detectamos?"],
      especificidad: ["Especificidad", ["vn"], ["vn", "fp"], "VN / (VN + FP)", "de los negativos reales, ¿cuántos detectamos?"],
      precision: ["Precisión (VPP)", ["vp"], ["vp", "fp"], "VP / (VP + FP)", "de los predichos positivos, ¿cuántos lo son?"],
      vpn: ["VPN", ["vn"], ["vn", "fn"], "VN / (VN + FN)", "de los predichos negativos, ¿cuántos lo son?"]
    };
    var z = armar(el, seg("m", "", Object.keys(M).map(function (k) { return [k, M[k][0]]; }), e.m));
    function pintar() {
      var m = M[e.m], suma = function (l) { return l.reduce(function (s, k) { return s + p[k]; }, 0); };
      var celda = function (k, rot) {
        return '<td class="' + (m[1].indexOf(k) >= 0 ? "cf-num" : m[2].indexOf(k) >= 0 ? "cf-den" : "cf-no") + '"><small>' + rot + "</small><b>" + p[k] + "</b></td>";
      };
      z.svg.innerHTML = '<table class="fig-confusion"><thead><tr><th></th><th>Predicho: ' + A.esc(p.pos) + "</th><th>Predicho: " + A.esc(p.neg) + "</th></tr></thead><tbody>" +
        "<tr><th>Real: " + A.esc(p.pos) + "<small>(positivo)</small></th>" + celda("vp", "VP") + celda("fn", "FN") + "</tr>" +
        "<tr><th>Real: " + A.esc(p.neg) + "<small>(negativo)</small></th>" + celda("fp", "FP") + celda("vn", "VN") + "</tr></tbody></table>";
      var num = suma(m[1]), den = suma(m[2]);
      z.lect.innerHTML = '<span class="fig-chip"><i class="cf-num"></i>numerador</span><span class="fig-chip"><i class="cf-den"></i>se suma en el denominador</span><br>' +
        "<strong>" + m[0] + "</strong> = " + m[3] + " = " + num + " / " + den + " = <strong>" + A.nn(100 * num / den, 2) + " %</strong>. Responde: " + m[4];
    }
    enlazar(el, e, pintar); pintar();
  });

  /* ═════════════ ANOVA: de dónde sale cada suma de cuadrados ═══════════
     { grupos:[{n, y:[..]}], ejeY } */
  F.tipo("anova", function (el, p, e) {
    if (e.ver == null) e.ver = "total";
    var z = armar(el, seg("ver", "Mostrar:", [["total", "Variación total"], ["entre", "Entre tratamientos"], ["dentro", "Dentro (error)"]], e.ver));
    var todos = [], k = p.grupos.length;
    p.grupos.forEach(function (g) { todos = todos.concat(g.y); });
    var N = todos.length, gm = A.media(todos), y0 = Math.min.apply(null, todos), y1 = Math.max.apply(null, todos), m = (y1 - y0) * 0.12;
    var c = { l: 56, r: 446, t: 14, b: 262 }, sy = A.lin(y0 - m, y1 + m, c.b, c.t), ancho = (c.r - c.l) / k;
    var sct = 0, sctr = 0, sce = 0;
    p.grupos.forEach(function (g) { g.m = A.media(g.y); g.y.forEach(function (v) { sct += (v - gm) * (v - gm); sce += (v - g.m) * (v - g.m); sctr += (g.m - gm) * (g.m - gm); }); });
    function pintar() {
      var h = A.ejes({ l: c.l, r: c.r, t: c.t, b: c.b, sx: function (v) { return v; }, sy: sy, yt: A.marcas(y0 - m, y1 + m, 6), yl: p.ejeY || "respuesta" });
      h += A.ln(c.l, sy(gm), c.r, sy(gm), "guia0", ' stroke-width="1.6"') + A.tx(c.l + 6, sy(gm) + 13, "media general = " + A.nn(gm), "ten", "start", 10.5);
      p.grupos.forEach(function (g, j) {
        var x0 = c.l + j * ancho + ancho / 2, paso = Math.min(26, (ancho - 40) / g.y.length);
        if (e.ver !== "total") h += A.ln(x0 - ancho / 2 + 12, sy(g.m), x0 + ancho / 2 - 12, sy(g.m), "l1", ' stroke-width="2.5"') + A.tx(x0 + ancho / 2 - 12, sy(g.m) - 5, A.nn(g.m), "t1", "end", 10.5);
        g.y.forEach(function (v, i) {
          var x = x0 + (i - (g.y.length - 1) / 2) * paso;
          if (e.ver === "total") h += A.ln(x, sy(v), x, sy(gm), "l4", ' stroke-width="2.5"');
          else if (e.ver === "entre") h += A.ln(x, sy(g.m), x, sy(gm), "l2", ' stroke-width="2.5"');
          else h += A.ln(x, sy(v), x, sy(g.m), "l3", ' stroke-width="2.5"');
          h += A.ci(x, sy(v), 4.6, "tinta");
        });
        h += A.tx(x0, c.b + 18, g.n, "", "middle", 12);
      });
      z.svg.innerHTML = A.svg(460, 292, h, "Datos por tratamiento con la media general y las medias de cada tratamiento");
      var pe = 100 * sctr / sct;
      z.lect.innerHTML = (e.ver === "total" ? "<strong>SC<sub>T</sub> = " + A.nn(sct) + "</strong>: suma de los cuadrados de la distancia de cada dato a la media general."
        : e.ver === "entre" ? "<strong>SC<sub>TRAT</sub> = " + A.nn(sctr) + "</strong>: distancia de la media de cada tratamiento a la media general, al cuadrado y contada una vez por dato. Grande ⇒ los tratamientos difieren."
          : "<strong>SC<sub>E</sub> = " + A.nn(sce) + "</strong>: distancia de cada dato a la media de su propio tratamiento. Es el «ruido» que ningún tratamiento explica.") +
        '<span class="fig-pila"><i class="c2" style="width:' + pe.toFixed(1) + '%">SC TRAT ' + A.nn(sctr) + '</i><i class="c3" style="width:' + (100 - pe).toFixed(1) + '%">SC E ' + A.nn(sce) + "</i></span>" +
        "SC<sub>T</sub> = SC<sub>TRAT</sub> + SC<sub>E</sub>: " + A.nn(sct) + " = " + A.nn(sctr) + " + " + A.nn(sce) + ". Con k − 1 = " + (k - 1) + " y N − k = " + (N - k) + " grados de libertad, F₀ = " +
        A.nn(sctr / (k - 1), 1) + " / " + A.nn(sce / (N - k), 1) + " = " + A.n((sctr / (k - 1)) / (sce / (N - k))) + ".";
    }
    enlazar(el, e, pintar); pintar();
  });
})();
