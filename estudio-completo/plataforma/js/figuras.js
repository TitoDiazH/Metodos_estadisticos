/* ============================================================================
   figuras.js — Motor de figuras de Aprender. Un concepto declara
     figura: { tipo: "…", pie: "…", donde: "formal" | "ejemplo", …parámetros }
   (o una lista de ellas, o un <svg> escrito a mano como texto) y aquí se dibuja.
   Cada tipo es una función (lienzo, parámetros, estado): el estado se conserva
   mientras dure la sesión para que la figura no se reinicie al redibujar.
   Este archivo trae el núcleo, los ayudantes y las figuras estáticas; las
   interactivas están en figuras-vivas.js. Todo es SVG/HTML local, sin internet.
   ========================================================================== */
(function () {
  "use strict";
  var P = window.PLATAFORMA, U = P.util;
  var F = P.figuras = { tipos: {}, estados: {}, a: {} };
  var A = F.a; // ayudantes compartidos con figuras-vivas.js

  F.tipo = function (nombre, fn) { F.tipos[nombre] = fn; };
  F.lista = function (c) { return c && c.figura ? [].concat(c.figura) : []; };

  /* HTML de las figuras de un concepto que van después del bloque «donde». */
  F.html = function (c, donde) {
    return F.lista(c).map(function (f, i) {
      var esTexto = typeof f === "string";
      if (((!esTexto && f.donde) || "formal") !== donde) return "";
      if (esTexto) return '<figure class="figura">' + f + "</figure>";
      return '<figure class="figura figura-viva' + (f.ancha ? " figura-ancha" : "") + '" data-figura="' + c.id + ":" + i + '">' +
        '<div class="fig-lienzo"></div>' + (f.pie ? "<figcaption>" + f.pie + "</figcaption>" : "") + "</figure>";
    }).join("");
  };

  /* Dibuja las figuras de un módulo ya insertado en la página. */
  F.montar = function (raiz, m) {
    var porId = {};
    (m.conceptos || []).forEach(function (c) { porId[c.id] = c; });
    Array.prototype.forEach.call(raiz.querySelectorAll("[data-figura]"), function (fig) {
      var clave = fig.getAttribute("data-figura"), k = clave.lastIndexOf(":");
      var f = F.lista(porId[clave.slice(0, k)])[+clave.slice(k + 1)], fn = f && F.tipos[f.tipo], lienzo = fig.firstChild;
      if (!fn) { lienzo.innerHTML = '<p class="tenue">Figura no disponible.</p>'; return; }
      try { fn(lienzo, f, F.estados[clave] || (F.estados[clave] = {})); }
      catch (e) { lienzo.innerHTML = '<p class="tenue">No se pudo dibujar esta figura.</p>'; fig.setAttribute("data-error", e && e.message); }
    });
  };

  /* ── Números ───────────────────────────────────────────────────────── */
  /* Decimales fijos con coma y sin separador de miles (3007, no 3.007). */
  A.n = function (v, d) {
    var s = Number(v).toFixed(d == null ? 2 : d);
    if (/^-0[.]?0*$/.test(s)) s = s.slice(1);
    return s.replace(".", ",");
  };
  /* Hasta d decimales, sin ceros de relleno. */
  A.nn = function (v, d) { return String(parseFloat(Number(v).toFixed(d == null ? 2 : d))).replace(".", ","); };
  A.media = function (a) { return a.reduce(function (s, x) { return s + x; }, 0) / a.length; };
  A.dist = function (p, q) { return Math.sqrt((p[0] - q[0]) * (p[0] - q[0]) + (p[1] - q[1]) * (p[1] - q[1])); };
  /* Varianzas y covarianza muestral (divisor n − 1) de dos listas. */
  A.cov2 = function (x, y) {
    var mx = A.media(x), my = A.media(y), sxx = 0, syy = 0, sxy = 0, n = x.length;
    for (var i = 0; i < n; i++) { sxx += (x[i] - mx) * (x[i] - mx); syy += (y[i] - my) * (y[i] - my); sxy += (x[i] - mx) * (y[i] - my); }
    return { mx: mx, my: my, sxx: sxx / (n - 1), syy: syy / (n - 1), sxy: sxy / (n - 1), n: n };
  };
  /* Generador con semilla: las nubes de puntos son siempre las mismas. */
  A.azar = function (semilla) {
    var a = semilla >>> 0;
    var u = function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    u.normal = function () { return Math.sqrt(-2 * Math.log(u() || 1e-9)) * Math.cos(2 * Math.PI * u()); };
    return u;
  };
  A.fi = function (z) { return Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI); };
  /* Φ(z): aproximación de Abramowitz y Stegun 26.2.17 (error < 7,5e-8). */
  A.Fi = function (z) {
    var t = 1 / (1 + 0.2316419 * Math.abs(z));
    var p = A.fi(z) * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    return z > 0 ? 1 - p : p;
  };
  /* Inversa de una función creciente por bisección. */
  A.inversa = function (f, y, a, b) {
    for (var i = 0; i < 60; i++) { var m = (a + b) / 2; if (f(m) < y) a = m; else b = m; }
    return (a + b) / 2;
  };

  /* ── SVG ───────────────────────────────────────────────────────────── */
  var r1 = function (v) { return Math.round(v * 10) / 10; };
  A.esc = U.esc;
  A.lin = function (d0, d1, p0, p1) { return function (v) { return p0 + (v - d0) * (p1 - p0) / (d1 - d0); }; };
  A.svg = function (w, h, cuerpo, rotulo) {
    return '<svg viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + U.esc(rotulo || "Figura") + '">' + cuerpo + "</svg>";
  };
  A.ln = function (x1, y1, x2, y2, cls, extra) {
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" class="' + (cls || "eje") + '"' + (extra || "") + "/>";
  };
  A.ci = function (x, y, r, cls, extra) { return '<circle cx="' + r1(x) + '" cy="' + r1(y) + '" r="' + r + '" class="' + (cls || "k1") + '"' + (extra || "") + "/>"; };
  A.tx = function (x, y, s, cls, ancla, tam) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '"' + (cls ? ' class="' + cls + '"' : "") + ' text-anchor="' + (ancla || "middle") + '" font-size="' + (tam || 11) + '">' + U.esc(s) + "</text>";
  };
  A.camino = function (pts, cls, cerrar, extra) {
    return '<path d="' + pts.map(function (p, i) { return (i ? "L" : "M") + r1(p[0]) + " " + r1(p[1]); }).join("") + (cerrar ? "Z" : "") + '" class="' + (cls || "l1") + '"' + (extra || "") + "/>";
  };
  A.rect = function (x, y, w, h, cls, extra) {
    return '<rect x="' + r1(Math.min(x, x + w)) + '" y="' + r1(Math.min(y, y + h)) + '" width="' + r1(Math.abs(w)) + '" height="' + r1(Math.abs(h)) + '" class="' + (cls || "caja") + '"' + (extra || "") + "/>";
  };
  /* Ejes en L con marcas. c = { l, r, t, b, sx, sy, xt, yt, xl, yl, dx, dy } (dx/dy = decimales). */
  A.ejes = function (c) {
    var h = '<path class="eje" d="M' + c.l + " " + c.t + "V" + c.b + "H" + c.r + '"/>';
    (c.xt || []).forEach(function (v) {
      h += A.ln(c.sx(v), c.b, c.sx(v), c.b + 4) + A.tx(c.sx(v), c.b + 16, A.nn(v, c.dx == null ? 2 : c.dx), "ten", "middle", 10);
    });
    (c.yt || []).forEach(function (v) {
      h += A.ln(c.l - 4, c.sy(v), c.l, c.sy(v)) + A.tx(c.l - 7, c.sy(v) + 3.5, A.nn(v, c.dy == null ? 2 : c.dy), "ten", "end", 10);
    });
    if (c.xl) h += A.tx((c.l + c.r) / 2, c.b + 32, c.xl, "", "middle", 11.5);
    if (c.yl) h += '<text x="' + (c.l - 34) + '" y="' + r1((c.t + c.b) / 2) + '" text-anchor="middle" font-size="11.5" transform="rotate(-90 ' + (c.l - 34) + " " + r1((c.t + c.b) / 2) + ')">' + U.esc(c.yl) + "</text>";
    return h;
  };
  /* Marcas «redondas» entre a y b. */
  A.marcas = function (a, b, cuantas) {
    var paso = Math.pow(10, Math.floor(Math.log10((b - a) / (cuantas || 5)))), err = (b - a) / (cuantas || 5) / paso;
    paso *= err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1;
    var out = [];
    for (var v = Math.ceil(a / paso - 1e-9) * paso; v <= b + 1e-9; v += paso) out.push(Math.round(v / paso) * paso);
    return out;
  };
  /* Puntos de la curva y = f(x) y del área bajo ella entre a y b. */
  A.curva = function (f, a, b, sx, sy, pasos) {
    var pts = [];
    for (var i = 0, n = pasos || 120; i <= n; i++) { var x = a + (b - a) * i / n; pts.push([sx(x), sy(f(x))]); }
    return pts;
  };
  A.area = function (f, a, b, sx, sy, cls) {
    if (!(b > a)) return "";
    var pts = A.curva(f, a, b, sx, sy, 60);
    pts.push([sx(b), sy(0)]); pts.push([sx(a), sy(0)]);
    return A.camino(pts, cls, true);
  };
  /* Envolvente convexa (cadena monótona). */
  A.envolvente = function (pts) {
    var p = pts.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    if (p.length < 3) return p;
    var cruz = function (o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); };
    var inf = [], sup = [], i;
    for (i = 0; i < p.length; i++) { while (inf.length >= 2 && cruz(inf[inf.length - 2], inf[inf.length - 1], p[i]) <= 0) inf.pop(); inf.push(p[i]); }
    for (i = p.length - 1; i >= 0; i--) { while (sup.length >= 2 && cruz(sup[sup.length - 2], sup[sup.length - 1], p[i]) <= 0) sup.pop(); sup.push(p[i]); }
    inf.pop(); sup.pop();
    return inf.concat(sup);
  };
  /* «Mancha» que envuelve un grupo de puntos (en píxeles): así se dibuja un clúster. */
  A.mancha = function (pts, k, ancho) {
    var w = ancho || 34, cls = "m" + k;
    if (pts.length === 1) return A.ci(pts[0][0], pts[0][1], w / 2, cls);
    var e = A.envolvente(pts);
    return A.camino(e, cls, e.length > 2, ' stroke-width="' + w + '"');
  };
  /* Elipse de una normal/región: centro c, matriz 2×2 simétrica (a, b, d) y radio k. Devuelve puntos en datos. */
  A.elipse = function (c, a, b, d, k) {
    var l11 = Math.sqrt(a), l21 = b / l11, l22 = Math.sqrt(Math.max(d - l21 * l21, 0)), pts = [];
    for (var i = 0; i < 72; i++) {
      var t = 2 * Math.PI * i / 72, u = Math.cos(t), v = Math.sin(t);
      pts.push([c[0] + k * l11 * u, c[1] + k * (l21 * u + l22 * v)]);
    }
    return pts;
  };
  var nClip = 0;
  /* Recorta el contenido al rectángulo del gráfico. */
  A.recorte = function (c, cuerpo) {
    var id = "fig-rec-" + (++nClip);
    return '<clipPath id="' + id + '"><rect x="' + c.l + '" y="' + c.t + '" width="' + (c.r - c.l) + '" height="' + (c.b - c.t) + '"/></clipPath><g clip-path="url(#' + id + ')">' + cuerpo + "</g>";
  };
  A.flecha = '<defs><marker id="fig-fl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="punta"/></marker></defs>';
  A.paneles = function (lista) { return '<div class="fig-paneles">' + lista.join("") + "</div>"; };
  A.chip = function (k, txt) { return '<span class="fig-chip"><i class="c' + k + '"></i>' + txt + "</span>"; };

  /* ══════════════════════ FIGURAS ESTÁTICAS ══════════════════════════ */

  /* Distancia euclídea vs. Manhattan entre dos puntos. { a:[x,y], b:[x,y] } */
  F.tipo("distancias", function (el, p) {
    var a = p.a, b = p.b, mx = Math.max(a[0], b[0]) + 2, my = Math.max(a[1], b[1]) + 1, u = Math.min(300 / mx, 250 / my);
    var c = { l: 40, b: 280, r: 40 + mx * u, t: 280 - my * u };
    c.sx = A.lin(0, mx, c.l, c.r); c.sy = A.lin(0, my, c.b, c.t);
    var h = "", i;
    for (i = 1; i <= mx; i++) h += A.ln(c.sx(i), c.t, c.sx(i), c.b, "reja");
    for (i = 1; i <= my; i++) h += A.ln(c.l, c.sy(i), c.r, c.sy(i), "reja");
    var xs = [], ys = [];
    for (i = 0; i <= mx; i += 2) xs.push(i);
    for (i = 0; i <= my; i += 2) ys.push(i);
    h += A.ejes({ l: c.l, r: c.r, t: c.t, b: c.b, sx: c.sx, sy: c.sy, xt: xs, yt: ys });
    var dx = Math.abs(b[0] - a[0]), dy = Math.abs(b[1] - a[1]);
    h += A.camino([[c.sx(a[0]), c.sy(a[1])], [c.sx(b[0]), c.sy(a[1])], [c.sx(b[0]), c.sy(b[1])]], "l2", false, ' stroke-width="3"');
    h += A.ln(c.sx(a[0]), c.sy(a[1]), c.sx(b[0]), c.sy(b[1]), "l1", ' stroke-width="3"');
    h += A.tx(c.sx((a[0] + b[0]) / 2), c.sy(a[1]) + 16, "|" + A.nn(b[0]) + " − " + A.nn(a[0]) + "| = " + A.nn(dx), "t2", "middle", 12);
    h += A.tx(c.sx(b[0]) + 8, c.sy((a[1] + b[1]) / 2) + 4, "|" + A.nn(b[1]) + " − " + A.nn(a[1]) + "| = " + A.nn(dy), "t2", "start", 12);
    h += A.tx(c.sx((a[0] + b[0]) / 2) - 10, c.sy((a[1] + b[1]) / 2) - 8, "euclídea = " + A.n(Math.sqrt(dx * dx + dy * dy)), "t1", "end", 12);
    h += A.ci(c.sx(a[0]), c.sy(a[1]), 5, "tinta") + A.ci(c.sx(b[0]), c.sy(b[1]), 5, "tinta");
    h += A.tx(c.sx(a[0]) - 8, c.sy(a[1]) + 4, "A", "", "end", 13) + A.tx(c.sx(b[0]) + 2, c.sy(b[1]) - 9, "B", "", "middle", 13);
    h += A.tx(c.sx(b[0]) + 8, c.sy(a[1]) + 16, "Manhattan = " + A.nn(dx) + " + " + A.nn(dy) + " = " + A.nn(dx + dy), "t2", "start", 12);
    el.innerHTML = A.svg(Math.max(c.r + 130, 420), 300, h, "Distancia euclídea (recta) y Manhattan (por la cuadrícula) entre A y B");
  });

  /* Árbol de decisión. { ancho, alto, nodos:[{id,x,y,w,t:[líneas],fin}], aristas:[[de,a,rótulo]] } */
  F.tipo("arbol", function (el, p) {
    var N = {}, h = A.flecha;
    p.nodos.forEach(function (n) { n._h = 16 + 15 * n.t.length; n._w = n.w || 150; N[n.id] = n; });
    p.aristas.forEach(function (a) {
      var d = N[a[0]], o = N[a[1]], y1 = d.y + d._h / 2, y2 = o.y - o._h / 2, ym = (y1 + y2) / 2;
      h += '<path class="eje" marker-end="url(#fig-fl)" d="M' + d.x + " " + y1 + "V" + ym + "H" + o.x + "V" + (y2 - 2) + '"/>';
      if (a[2]) h += A.tx(o.x === d.x ? o.x + 6 : o.x, ym - 5, a[2], "ten", o.x === d.x ? "start" : "middle", 11);
    });
    p.nodos.forEach(function (n) {
      h += A.rect(n.x - n._w / 2, n.y - n._h / 2, n._w, n._h, n.fin ? "caja caja-fin" : "caja", ' rx="8"');
      n.t.forEach(function (s, i) { h += A.tx(n.x, n.y - n._h / 2 + 19 + 15 * i, s, i === 0 && n.fin ? "fuerte" : "", "middle", 11.5); });
    });
    el.innerHTML = A.svg(p.ancho, p.alto, h, p.rotulo || "Árbol de decisión");
  });

  /* Bloqueo y aleatorización. { bloques:[nombres], tratamientos:[..], ordenes:[[..]], fila } */
  F.tipo("bloques", function (el, p) {
    var nb = p.bloques.length, nt = p.tratamientos.length, cw = 96, ch = 30, l = 70, h = "";
    for (var i = 0; i < nt; i++) h += A.tx(l - 8, 52 + i * (ch + 6) + 19, (p.fila || "Corrida") + " " + (i + 1), "ten", "end", 10.5);
    p.bloques.forEach(function (b, j) {
      var x = l + j * (cw + 8);
      h += A.rect(x - 3, 28, cw + 6, 24 + nt * (ch + 6), "marco", ' rx="8"');
      h += A.tx(x + cw / 2, 20, b, "fuerte", "middle", 11.5);
      p.ordenes[j].forEach(function (t, i) {
        var k = p.tratamientos.indexOf(t) + 1;
        h += A.rect(x + 4, 52 + i * (ch + 6), cw - 8, ch, "s" + k, ' rx="6"') + A.tx(x + cw / 2, 52 + i * (ch + 6) + 20, t, "", "middle", 12);
      });
    });
    el.innerHTML = A.svg(l + nb * (cw + 8) + 6, 66 + nt * (ch + 6), h, "Cada bloque recibe todos los tratamientos en orden aleatorio");
  });

  /* Los cuatro criterios de enlace entre dos clústeres. */
  F.tipo("enlaces", function (el) {
    var Ca = [[38, 58], [58, 100], [80, 64]], Cb = [[150, 42], [182, 82], [146, 104], [190, 46]];
    var pares = [];
    Ca.forEach(function (a) { Cb.forEach(function (b) { pares.push([a, b, A.dist(a, b)]); }); });
    pares.sort(function (x, y) { return x[2] - y[2]; });
    var cen = function (c) { return [A.media(c.map(function (q) { return q[0]; })), A.media(c.map(function (q) { return q[1]; }))]; };
    function panel(titulo, sub, lineas, extra) {
      var h = A.mancha(Ca, 1, 30) + A.mancha(Cb, 4, 30);
      lineas.forEach(function (q) { h += A.ln(q[0][0], q[0][1], q[1][0], q[1][1], q[2] || "l2", ' stroke-width="' + (q[3] || 2.5) + '"'); });
      Ca.forEach(function (q) { h += A.ci(q[0], q[1], 4.5, "k1"); });
      Cb.forEach(function (q) { h += A.ci(q[0], q[1], 4.5, "k4"); });
      h += (extra || "") + A.tx(115, 140, titulo, "fuerte", "middle", 12.5) + A.tx(115, 156, sub, "ten", "middle", 10.5);
      return A.svg(230, 166, h, titulo + ": " + sub);
    }
    var ca = cen(Ca), cb = cen(Cb);
    el.innerHTML = A.paneles([
      panel("Single", "el par más cercano (mínimo)", [pares[0].slice(0, 2)]),
      panel("Complete", "el par más lejano (máximo)", [pares[pares.length - 1].slice(0, 2)]),
      panel("Average", "promedio de todos los pares", pares.map(function (q) { return [q[0], q[1], "l2", 1.1]; })),
      panel("Centroide", "entre los puntos medios", [[ca, cb]],
        A.ci(ca[0], ca[1], 5, "hueco") + A.ci(cb[0], cb[1], 5, "hueco"))
    ]);
  });

  /* Frontera recta (LDA) vs. curva (QDA). */
  F.tipo("fronteras", function (el) {
    function nube(g, cx, cy, rx, ry, ang, k, n) {
      var c = Math.cos(ang), s = Math.sin(ang), h = "";
      for (var i = 0; i < n; i++) {
        var a = g.normal() * rx / 2.1, b = g.normal() * ry / 2.1;
        h += A.ci(cx + a * c - b * s, cy + a * s + b * c, 3.2, "k" + k);
      }
      return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" class="s' + k + '" transform="rotate(' + (ang * 180 / Math.PI) + " " + cx + " " + cy + ')"/>' + h;
    }
    var g = A.azar(11);
    var lda = nube(g, 96, 56, 50, 19, -0.6, 1, 16) + nube(g, 134, 112, 50, 19, -0.6, 2, 16) +
      A.ln(36, 137, 194, 31, "l0", ' stroke-width="2.5"') +
      A.tx(115, 178, "LDA: misma forma", "fuerte", "middle", 12) + A.tx(115, 194, "Σ₁ = Σ₂ ⇒ frontera recta", "ten", "middle", 11);
    var qda = nube(g, 70, 96, 26, 20, 0, 1, 14) + nube(g, 158, 84, 30, 68, 0.25, 2, 20) +
      '<path class="l0" stroke-width="2.5" d="M92 8Q128 92 78 160"/>' +
      A.tx(115, 178, "QDA: formas distintas", "fuerte", "middle", 12) + A.tx(115, 194, "Σ₁ ≠ Σ₂ ⇒ frontera curva", "ten", "middle", 11);
    el.innerHTML = A.paneles([A.svg(230, 200, lda, "LDA: dos grupos con la misma dispersión separados por una recta"),
      A.svg(230, 200, qda, "QDA: dos grupos con dispersión distinta separados por una curva")]);
  });

  /* Validación cruzada K-fold. { k } */
  F.tipo("kfold", function (el, p) {
    var k = p.k || 5, l = 74, w = 300 / k, h = "";
    for (var i = 0; i < k; i++) {
      var y = 26 + i * 32;
      h += A.tx(l - 8, y + 17, "Vuelta " + (i + 1), "ten", "end", 11);
      for (var j = 0; j < k; j++) {
        var prueba = j === i;
        h += A.rect(l + j * w + 2, y, w - 4, 24, prueba ? "s2" : "s1", ' rx="5"') +
          A.tx(l + j * w + w / 2, y + 16, prueba ? "prueba" : "entrena", prueba ? "t2" : "ten", "middle", 10);
      }
      h += A.tx(l + 300 + 10, y + 17, "→ accuracy " + (i + 1), "", "start", 11);
    }
    h += A.tx(l + 150, 16, "los datos, partidos en K = " + k + " partes", "ten", "middle", 11);
    h += A.tx(235, 26 + k * 32 + 16, "Resultado = promedio de los " + k + " accuracy", "fuerte", "middle", 11.5) +
      A.tx(235, 26 + k * 32 + 32, "Con K = n (una observación por parte) es Leave-One-Out.", "ten", "middle", 11);
    el.innerHTML = A.svg(470, 26 + k * 32 + 42, h, "Validación cruzada: cada parte es conjunto de prueba una vez");
  });

  /* Qué se busca en los gráficos de residuos del ANOVA. */
  F.tipo("residuos", function (el) {
    var g = A.azar(7);
    function panel(titulo, sub, ejeX, f, bien) {
      var c = { l: 22, r: 216, t: 12, b: 122 }, sx = A.lin(0, 1, c.l + 8, c.r - 8), sy = A.lin(-3.2, 3.2, c.b, c.t), h = "";
      h += '<path class="eje" d="M' + c.l + " " + c.t + "V" + c.b + "H" + c.r + '"/>' + A.ln(c.l, sy(0), c.r, sy(0), "guia0");
      for (var i = 0; i < 34; i++) { var x = (i + 0.5) / 34, y = Math.max(-3, Math.min(3, f(x, g.normal()))); h += A.ci(sx(x), sy(y), 3, bien ? "k1" : "k2"); }
      h += A.tx(c.l - 6, sy(0) + 3, "0", "ten", "end", 10) + A.tx((c.l + c.r) / 2, c.b + 14, ejeX, "ten", "middle", 10.5);
      h += A.tx(119, 156, (bien ? "✔ " : "✘ ") + titulo, bien ? "t5 fuerte" : "t2 fuerte", "middle", 12) + A.tx(119, 172, sub, "ten", "middle", 10.5);
      return A.svg(230, 180, h, titulo + ": " + sub);
    }
    el.innerHTML = A.paneles([
      panel("Banda pareja", "supuestos razonables", "valor predicho (media del tratamiento)", function (x, z) { return z * 0.95; }, true),
      panel("Embudo", "la varianza no es constante", "valor predicho (media del tratamiento)", function (x, z) { return z * (0.2 + 1.6 * x); }, false),
      panel("Tendencia", "los errores no son independientes", "orden de las corridas", function (x, z) { return -2.1 + 4.2 * x + z * 0.5; }, false)
    ]);
  });

  /* Por qué MANOVA: los grupos se traslapan en cada variable pero se separan en conjunto. */
  F.tipo("manovaIdea", function (el) {
    var g = A.azar(23), ang = -40 * Math.PI / 180, c = Math.cos(ang), s = Math.sin(ang), h = "";
    var C = [[176, 127], [220, 179]], rx = 92, ry = 20;
    h += '<path class="eje" d="M96 16V242H400"/>';
    C.forEach(function (q, k) {
      h += '<ellipse cx="' + q[0] + '" cy="' + q[1] + '" rx="' + rx + '" ry="' + ry + '" class="s' + (k ? 2 : 1) + '" transform="rotate(-40 ' + q[0] + " " + q[1] + ')"/>';
      for (var i = 0; i < 22; i++) {
        var a = g.normal() * rx / 2.2, b = g.normal() * ry / 2.2;
        h += A.ci(q[0] + a * c - b * s, q[1] + a * s + b * c, 3, "k" + (k ? 2 : 1));
      }
      /* Marginales: campanas bajo el eje X y a la izquierda del eje Y. */
      var dx = Math.sqrt(Math.pow(rx * c, 2) + Math.pow(ry * s, 2)) / 2, dy = Math.sqrt(Math.pow(rx * s, 2) + Math.pow(ry * c, 2)) / 2;
      var bx = [], by = [];
      for (var t = -3; t <= 3.001; t += 0.15) {
        bx.push([q[0] + t * dx, 290 - 40 * Math.exp(-t * t / 2)]);
        by.push([86 - 40 * Math.exp(-t * t / 2), q[1] + t * dy]);
      }
      h += A.camino(bx, "l" + (k ? 2 : 1), false, ' stroke-width="2"') + A.camino(by, "l" + (k ? 2 : 1), false, ' stroke-width="2"');
    });
    h += A.ln(96, 290, 400, 290, "eje") + A.ln(86, 16, 86, 242, "eje");
    h += A.tx(248, 308, "solo Y₁: los grupos se traslapan", "ten", "middle", 11);
    h += '<text x="26" y="129" text-anchor="middle" font-size="11" class="ten" transform="rotate(-90 26 129)">solo Y₂: se traslapan</text>';
    h += A.tx(398, 28, "en conjunto (Y₁, Y₂):", "fuerte", "end", 11.5) + A.tx(398, 43, "se separan con claridad", "fuerte", "end", 11.5);
    h += A.tx(132, 84, "grupo 1", "t1", "middle", 11.5) + A.tx(312, 226, "grupo 2", "t2", "middle", 11.5);
    el.innerHTML = A.svg(420, 316, h, "Dos grupos que se traslapan en cada variable por separado y se separan al mirarlas en conjunto");
  });

  /* Diagrama del modelo factorial. { factores:[..], variables:[{n, a:[..]}] } */
  F.tipo("diagramaFactorial", function (el, p) {
    var nv = p.variables.length, nf = p.factores.length, alto = 44 + nv * 42, h = A.flecha, fx = 56, vx = 226, bx = 300, bw = 150;
    var fy = function (j) { return 44 + (j + 0.5) * (alto - 54) / nf; }, vy = function (i) { return 54 + i * 42; };
    p.variables.forEach(function (v, i) {
      v.a.forEach(function (a, j) {
        var m = Math.abs(a);
        h += A.ln(fx + 26, fy(j), vx - 34, vy(i), "l" + (j ? 4 : 1), ' stroke-width="' + (0.5 + 4.5 * m).toFixed(1) + '" opacity="' + (0.22 + 0.78 * m).toFixed(2) + '"');
        if (m >= 0.5) h += A.tx(vx - 74, vy(i) + (fy(j) - vy(i)) * 0.24 - 4, A.nn(a), "t" + (j ? 4 : 1), "middle", 10.5);
      });
    });
    p.factores.forEach(function (f, j) { h += A.ci(fx, fy(j), 26, "s" + (j ? 4 : 1)) + A.tx(fx, fy(j) + 5, f, "fuerte", "middle", 14); });
    p.variables.forEach(function (v, i) {
      var h2 = v.a.reduce(function (s, a) { return s + a * a; }, 0);
      h += A.rect(vx - 32, vy(i) - 14, 64, 28, "caja", ' rx="6"') + A.tx(vx, vy(i) + 4.5, v.n, "", "middle", 12.5);
      h += A.rect(bx, vy(i) - 9, bw * h2, 18, "k5") + A.rect(bx + bw * h2, vy(i) - 9, bw * (1 - h2), 18, "gris");
      h += A.tx(bx + 5, vy(i) + 4, "h² = " + A.nn(h2, 3), "sobre", "start", 10.5) + A.tx(bx + bw + 6, vy(i) + 4, "ψ = " + A.nn(1 - h2, 3), "ten", "start", 10.5);
    });
    h += A.tx(fx, 22, "factores comunes", "ten", "middle", 11) + A.tx(vx, 22, "variables", "ten", "middle", 11) +
      A.tx(bx + bw / 2, 22, "varianza: comunalidad + especificidad", "ten", "middle", 11);
    el.innerHTML = A.svg(520, alto, h, "Modelo factorial: cada variable recibe cargas de los factores; la barra muestra su comunalidad y su especificidad");
  });

  /* Gráfico de sedimentación. { valores, etiquetas, acumulado:[textos], kaiser, ejeY } */
  F.tipo("sedimentacion", function (el, p) {
    var v = p.valores, n = v.length, c = { l: 56, r: 410, t: 18, b: 196 }, max = Math.max.apply(null, v) * 1.12;
    c.sx = A.lin(0, n - 1, c.l + 40, c.r - 40); c.sy = A.lin(0, max, c.b, c.t);
    var h = A.ejes({ l: c.l, r: c.r, t: c.t, b: c.b, sx: c.sx, sy: c.sy, yt: A.marcas(0, max, 4), yl: p.ejeY || "autovalor λ" });
    if (p.kaiser) h += A.ln(c.l, c.sy(1), c.r, c.sy(1), "guia") + A.tx(c.r - 2, c.sy(1) - 5, "Kaiser: λ = 1", "t2", "end", 10.5);
    h += A.camino(v.map(function (x, i) { return [c.sx(i), c.sy(x)]; }), "serie");
    v.forEach(function (x, i) {
      h += A.ci(c.sx(i), c.sy(x), 4.5, p.kaiser && x > 1 ? "destacado" : "punto") + A.tx(c.sx(i) + 8, c.sy(x) - 8, A.nn(x, 3), "", "start", 11);
      h += A.tx(c.sx(i), c.b + 16, (p.etiquetas || [])[i] || "PC" + (i + 1), "", "middle", 11);
      if (p.acumulado) h += A.tx(c.sx(i), c.b + 46, p.acumulado[i], "ten", "middle", 10.5);
    });
    if (p.acumulado) h += A.tx(c.l - 6, c.b + 46, "acum.", "ten", "end", 10.5) + A.ln(c.l, c.b + 28, c.r, c.b + 28, "reja");
    el.innerHTML = A.svg(430, p.acumulado ? 252 : 224, h, "Gráfico de sedimentación: autovalores " + v.map(function (x) { return A.nn(x, 3); }).join("; "));
  });

  /* Elipse de confianza para μ (p = 2) y, opcionalmente, los intervalos simultáneos.
     { x1, x2, mu0, critT2, cT2, cBonf, intervalos, ejes:[..] } */
  F.tipo("elipseConfianza", function (el, p) {
    var s = A.cov2(p.x1, p.x2), n = s.n, cx = s.mx, cy = s.my;
    var ax = p.cT2 * Math.sqrt(s.sxx / n), ay = p.cT2 * Math.sqrt(s.syy / n), m = 1.45;
    var c = { l: 56, r: 420, t: 16, b: 270 };
    c.sx = A.lin(cx - ax * m, cx + ax * m, c.l, c.r); c.sy = A.lin(cy - ay * m, cy + ay * m, c.b, c.t);
    var h = A.ejes({ l: c.l, r: c.r, t: c.t, b: c.b, sx: c.sx, sy: c.sy, xt: A.marcas(cx - ax * m, cx + ax * m, 5), yt: A.marcas(cy - ay * m, cy + ay * m, 5),
      xl: (p.ejes || ["μ₁", "μ₂"])[0], yl: (p.ejes || ["μ₁", "μ₂"])[1] });
    var pts = A.elipse([cx, cy], s.sxx / n, s.sxy / n, s.syy / n, Math.sqrt(p.critT2)).map(function (q) { return [c.sx(q[0]), c.sy(q[1])]; });
    h += A.camino(pts, "s1", true, ' stroke-width="2"');
    if (p.intervalos) {
      var bx = p.cBonf * Math.sqrt(s.sxx / n), by = p.cBonf * Math.sqrt(s.syy / n);
      h += A.rect(c.sx(cx - ax), c.sy(cy + ay), c.sx(cx + ax) - c.sx(cx - ax), c.sy(cy - ay) - c.sy(cy + ay), "l4", ' stroke-width="2" stroke-dasharray="7 4"');
      h += A.rect(c.sx(cx - bx), c.sy(cy + by), c.sx(cx + bx) - c.sx(cx - bx), c.sy(cy - by) - c.sy(cy + by), "l3", ' stroke-width="2" stroke-dasharray="3 3"');
      h += A.tx(c.sx(cx - ax) + 5, c.sy(cy + ay) - 5, "intervalos simultáneos T² (c = " + A.nn(p.cT2, 3) + ")", "t4", "start", 10.5);
      h += A.tx(c.sx(cx + ax), c.sy(cy - ay) + 14, "Bonferroni (c = " + A.nn(p.cBonf, 3) + ")", "t3", "end", 10.5);
    }
    h += A.ci(c.sx(cx), c.sy(cy), 4.5, "k1") + A.tx(c.sx(cx) + 8, c.sy(cy) - 7, "x̄ = (" + A.n(cx) + "; " + A.n(cy) + ")", "t1", "start", 11);
    if (p.mu0) {
      h += A.ci(c.sx(p.mu0[0]), c.sy(p.mu0[1]), 5, "k2") + A.tx(c.sx(p.mu0[0]) + 8, c.sy(p.mu0[1]) + 14, "μ₀ = (" + A.nn(p.mu0[0]) + "; " + A.nn(p.mu0[1]) + ")", "t2", "start", 11);
    }
    el.innerHTML = A.svg(440, 304, h, "Región de confianza elíptica para el vector de medias, centrada en la media muestral");
  });

  /* Cargas de las variables en dos componentes (flechas). { variables:[{n, a:[x,y]}], ejes, max } */
  F.tipo("planoCargas", function (el, p) {
    var c0 = 200, R = 168 / (p.max || 1), h = A.flecha;
    var marcas = A.marcas(-(p.max || 1), p.max || 1, 4);
    marcas.forEach(function (v) {
      if (!v) return;
      h += A.ln(c0 + v * R, 24, c0 + v * R, 376, "reja") + A.ln(24, c0 - v * R, 376, c0 - v * R, "reja") + A.tx(c0 + v * R, c0 + 14, A.nn(v), "ten", "middle", 9.5) + A.tx(c0 - 5, c0 - v * R + 3, A.nn(v), "ten", "end", 9.5);
    });
    h += A.ln(24, c0, 376, c0, "eje") + A.ln(c0, 24, c0, 376, "eje");
    h += A.tx(374, c0 - 7, (p.ejes || ["PC1", "PC2"])[0], "fuerte", "end", 12) + A.tx(c0 + 7, 32, (p.ejes || ["PC1", "PC2"])[1], "fuerte", "start", 12);
    p.variables.forEach(function (v) {
      var x = c0 + v.a[0] * R, y = c0 - v.a[1] * R, m = Math.sqrt(v.a[0] * v.a[0] + v.a[1] * v.a[1]) || 1;
      h += A.ln(c0, c0, x, y, "l1", ' stroke-width="2" marker-end="url(#fig-fl)"');
      h += A.tx(x + 13 * v.a[0] / m, y - 13 * v.a[1] / m + 4, v.n, "", v.a[0] > 0.08 ? "start" : v.a[0] < -0.08 ? "end" : "middle", 11.5);
    });
    el.innerHTML = A.svg(400, 400, h, "Cargas de cada variable en los dos primeros componentes");
  });
})();
