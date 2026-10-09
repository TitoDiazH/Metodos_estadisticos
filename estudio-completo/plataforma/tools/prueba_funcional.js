#!/usr/bin/env node
/* ============================================================================
   prueba_funcional.js — Abre la app en Chrome sin interfaz (file://) y la usa de
   punta a punta: navegación, selector de prueba, todos los tipos de pregunta,
   examen y umbral exacto, desarrollo, progreso/localStorage, tema, móvil,
   impresión, enlaces de fuente y "agregar un módulo sin tocar js/".
   No necesita instalar nada: habla con Chrome por DevTools (WebSocket de Node 22).
     node tools/prueba_funcional.js [--capturas carpeta]
   Chrome: variable CHROME, o un Chromium de ~/.cache/ms-playwright, o el del sistema.
   Si no hay Chrome, avisa y termina sin error (hay que revisar a mano).
   ========================================================================== */
"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { spawn, spawnSync } = require("child_process");
const { pathToFileURL } = require("url");

const RAIZ = path.resolve(__dirname, "..");
const URL_APP = pathToFileURL(path.join(RAIZ, "index.html")).href;
const iCap = process.argv.indexOf("--capturas");
const DIR_CAP = iCap >= 0 ? path.resolve(process.argv[iCap + 1]) : null;

function buscarChrome() {
  const cand = [process.env.CHROME];
  const pw = path.join(os.homedir(), ".cache", "ms-playwright");
  try {
    fs.readdirSync(pw).sort().reverse().forEach((d) => {
      cand.push(path.join(pw, d, "chrome-headless-shell-linux64", "chrome-headless-shell"), path.join(pw, d, "chrome-linux64", "chrome"));
    });
  } catch (e) { /* sin playwright */ }
  ["google-chrome", "chromium", "chromium-browser"].forEach((n) => {
    const r = spawnSync("which", [n], { encoding: "utf8" });
    if (r.status === 0) cand.push(r.stdout.trim());
  });
  return cand.find((c) => c && fs.existsSync(c));
}

/* ── Cliente DevTools mínimo ────────────────────────────────────────── */
async function abrirChrome(bin) {
  const perfil = fs.mkdtempSync(path.join(os.tmpdir(), "me-chrome-"));
  const proc = spawn(bin, ["--headless=new", "--remote-debugging-port=0", "--no-sandbox", "--disable-gpu", "--user-data-dir=" + perfil, "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
  const wsUrl = await new Promise((ok, mal) => {
    let buf = "";
    const t = setTimeout(() => mal(new Error("Chrome no respondió")), 20000);
    proc.stderr.on("data", (d) => {
      buf += d;
      const m = /DevTools listening on (ws:\/\/\S+)/.exec(buf);
      if (m) { clearTimeout(t); ok(m[1]); }
    });
    proc.on("exit", () => mal(new Error("Chrome se cerró al iniciar: " + buf.slice(-300))));
  });
  const ws = new WebSocket(wsUrl);
  await new Promise((ok, mal) => { ws.onopen = ok; ws.onerror = () => mal(new Error("No se pudo conectar a DevTools")); });
  let n = 0;
  const pend = new Map(), oyentes = [];
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pend.has(msg.id)) {
      const { ok, mal } = pend.get(msg.id); pend.delete(msg.id);
      msg.error ? mal(new Error(msg.error.message)) : ok(msg.result);
    } else if (msg.method) oyentes.forEach((f) => f(msg));
  };
  const enviar = (method, params, sessionId) => new Promise((ok, mal) => {
    const id = ++n; pend.set(id, { ok, mal });
    ws.send(JSON.stringify({ id, method, params: params || {}, sessionId }));
  });
  const { targetId } = await enviar("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await enviar("Target.attachToTarget", { targetId, flatten: true });
  const cdp = (method, params) => enviar(method, params, sessionId);
  return {
    cdp, alEvento: (f) => oyentes.push(f),
    cerrar: () => { try { ws.close(); } catch (e) { /* ya cerrado */ } proc.kill(); try { fs.rmSync(perfil, { recursive: true, force: true }); } catch (e) { /* queda en tmp */ } }
  };
}

/* ── Marco de pruebas ───────────────────────────────────────────────── */
const resultados = [];
let seccion = "";
function ok(cond, nombre, detalle) {
  resultados.push({ ok: !!cond, nombre: seccion + " › " + nombre, detalle });
  console.log(`  ${cond ? "✔" : "✘"} ${nombre}${!cond && detalle !== undefined ? "  → " + JSON.stringify(detalle) : ""}`);
}
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const hashJs = () => {
  const h = crypto.createHash("sha1");
  fs.readdirSync(path.join(RAIZ, "js")).sort().forEach((f) => h.update(f).update(fs.readFileSync(path.join(RAIZ, "js", f))));
  h.update(fs.readFileSync(path.join(RAIZ, "index.html")));
  return h.digest("hex");
};

(async () => {
  const bin = buscarChrome();
  if (!bin) { console.log("⚠ No se encontró Chrome/Chromium: la prueba funcional NO se ejecutó. Define CHROME=/ruta/a/chrome."); return; }
  const nav = await abrirChrome(bin);
  const { cdp } = nav;
  const erroresPagina = [], pedidos = [];
  nav.alEvento((m) => {
    if (m.method === "Runtime.exceptionThrown") erroresPagina.push(m.params.exceptionDetails.exception ? m.params.exceptionDetails.exception.description : m.params.exceptionDetails.text);
    if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") erroresPagina.push("console.error: " + m.params.args.map((a) => a.value || a.description).join(" "));
    if (m.method === "Network.requestWillBeSent") pedidos.push(m.params.request.url);
    if (m.method === "Page.javascriptDialogOpening") cdp("Page.handleJavaScriptDialog", { accept: true });
  });
  await cdp("Page.enable"); await cdp("Runtime.enable"); await cdp("Network.enable");

  /* Evalúa una expresión en la página y devuelve su valor. */
  const js = async (expr) => {
    const r = await cdp("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error("En la página: " + (r.exceptionDetails.exception ? r.exceptionDetails.exception.description : r.exceptionDetails.text));
    return r.result.value;
  };
  const esperar = async (expr, ms) => {
    const fin = Date.now() + (ms || 8000);
    while (Date.now() < fin) { if (await js(expr)) return true; await dormir(40); }
    return false;
  };
  const cargar = async () => { await cdp("Page.navigate", { url: URL_APP }); return esperar("document.body && document.body.classList.contains('lista')"); };
  const ir = async (ruta) => { await js(`location.hash = ${JSON.stringify("#/" + ruta)}`); await dormir(90); };
  const clic = (sel) => js(`(function(){var e=document.querySelector(${JSON.stringify(sel)}); if(!e) return false; e.click(); return true;})()`);
  const captura = async (nombre) => {
    if (!DIR_CAP) return;
    fs.mkdirSync(DIR_CAP, { recursive: true });
    const r = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    fs.writeFileSync(path.join(DIR_CAP, nombre + ".png"), Buffer.from(r.data, "base64"));
  };
  /* Rellena en pantalla la respuesta correcta (o una incorrecta) de la pregunta visible, usando los datos. */
  const responder = (bien) => js(`(function(){
    var P = PLATAFORMA, c = document.querySelector(".pregunta"), q = P.pregunta(c.getAttribute("data-qid")), f = P.motor.forma(q);
    function marca(v, on){ var i = c.querySelector('input[name="resp"][value="'+v+'"]'); if (i) i.checked = on; }
    if (f === "vf") marca((${bien} ? q.correcta : !q.correcta) ? "V" : "F", true);
    else if (f === "unica") marca(${bien} ? q.correcta : (q.correcta + 1) % q.opciones.length, true);
    else if (f === "multi") q.opciones.forEach(function(_, i){ var es = q.correcta.indexOf(i) >= 0; marca(i, ${bien} ? es : !es); });
    else if (f === "numero") c.querySelector('input[name="resp"]').value = ${bien} ? String(q.respuesta).replace(".", ",") : "123456";
    else if (f === "huecos") q.huecos.forEach(function(h, i){ c.querySelector('input[name="hueco'+i+'"]').value = ${bien} ? " " + h[0] + " " : "zzz"; });
    return q.tipo;
  })()`);

  try {
    /* ═══ 1. Carga ═══ */
    seccion = "Carga";
    console.log("\n" + seccion);
    await cdp("Emulation.setDeviceMetricsOverride", { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
    ok(await cargar(), "la app arranca desde file://");
    await js("localStorage.clear()"); await cargar();
    ok((await js("document.querySelectorAll('#menu a').length")) === 10, "menú con 10 secciones");
    ok((await js("Array.from(document.querySelectorAll('#selectorPrueba button')).map(b=>b.textContent).join(',')")) === "P1,P2,P3,Todo", "selector P1 · P2 · P3 · Todo (derivado de los datos)");
    ok((await js("PLATAFORMA.datos.modulo.length")) >= 2 && (await js("PLATAFORMA.datos.pregunta.length")) > 0, "datos registrados por el cargador");
    ok((await js("document.querySelector('.pie').textContent.indexOf('No reemplaza') > 0")), "pie de advertencia visible");
    await captura("01-inicio");

    /* ═══ 2. Navegación y LaTeX en todas las vistas ═══ */
    seccion = "Navegación";
    console.log("\n" + seccion);
    /* Solo módulos con preguntas: los redactados en la Fase 5 aún no tienen banco (Fase 6). */
    const mods = await js("PLATAFORMA.datos.modulo.map(m => m.id).filter(id => PLATAFORMA.preguntasDeModulo(id, false).length > 0)");
    const rutas = ["inicio", "aprender", "aprender/" + mods[0], "aprender/" + mods[mods.length - 1], "memorizar", "memorizar/tarjetas", "rlab",
      "rlab/" + (await js("PLATAFORMA.datos.rlab[0].id")), "practicar", "desarrollo", "desarrollo/" + (await js("PLATAFORMA.preguntas({soloDesarrollo:true})[0].id")),
      "examen", "progreso", "fuentes", "fuentes/C1", "diferencias", "buscar/correlaci%C3%B3n", "ruta-que-no-existe"];
    for (const r of rutas) {
      await ir(r);
      const e = await js(`({h1: !!document.querySelector('#app h1'), malo: !!document.querySelector('#app .aviso-mal'), kerr: document.querySelectorAll('#app .katex-error').length,
        crudo: /\\$[^$<]{1,60}\\$|\\\\(frac|dfrac|bar|sqrt|operatorname)/.test(Array.from(document.querySelectorAll('#app *:not(pre):not(code):not(script):not(.katex):not(.katex *)')).filter(n=>n.children.length===0).map(n=>n.textContent).join(' ')),
        activo: (document.querySelector('#menu a.activo')||{}).textContent || ''})`);
      ok(e.h1 && !e.malo && !e.kerr && !e.crudo, "#/" + decodeURIComponent(r), e);
    }
    ok((await js("location.hash")) === "#/ruta-que-no-existe" && (await js("document.querySelector('#app h1').textContent.indexOf('Estudiando') === 0")), "una ruta desconocida muestra Inicio");
    await ir("aprender/" + mods[0]);
    ok((await js("document.querySelectorAll('#app .katex').length")) > 10, "KaTeX renderiza en Aprender");
    ok((await js("getComputedStyle(document.querySelector('.katex')).fontFamily.indexOf('KaTeX') >= 0")), "fuentes de KaTeX locales aplicadas");
    await captura("02-modulo");
    /* Figuras de Aprender: todas se dibujan y responden a sus controles sin errores. */
    const conFigura = await js("PLATAFORMA.datos.modulo.filter(function(m){return m.conceptos.some(function(c){return c.figura;});}).map(function(m){return m.id;})");
    let nFig = 0; const malas = [];
    for (const id of conFigura) {
      await ir("aprender/" + id);
      const r = await js(`(function(){
        var malas = [], figs = document.querySelectorAll('#app figure.figura');
        Array.prototype.forEach.call(figs, function(f){
          var k = f.getAttribute('data-figura') || 'svg a mano';
          if (f.hasAttribute('data-error') || !f.querySelector('svg, table')) { malas.push(k + ': ' + (f.getAttribute('data-error') || 'vacía')); return; }
          Array.prototype.forEach.call(f.querySelectorAll('input[type=range]'), function(i){
            [i.min, i.max].forEach(function(v){ i.value = v; i.dispatchEvent(new Event('input', { bubbles: true })); });
          });
          Array.prototype.forEach.call(f.querySelectorAll('.fig-ctrl button'), function(b){ if (b.getAttribute('data-b') !== 'auto') b.click(); });
          if (!f.querySelector('svg, table') || /NaN|undefined|Infinity/.test(f.querySelector('.fig-lienzo') ? f.querySelector('.fig-lienzo').innerHTML : '')) malas.push(k + ': se rompe al usar los controles');
        });
        return { n: figs.length, malas: malas };
      })()`);
      nFig += r.n; malas.push(...r.malas);
    }
    ok(nFig > 0 && malas.length === 0, nFig + " figuras de Aprender se dibujan y responden a sus controles", malas);
    await ir("aprender/" + conFigura[0]);
    const figAntes = await js("(function(){var b=document.querySelector('.fig-ctrl button[aria-pressed=false]'); if(!b) return null; b.click(); return b.getAttribute('data-v');})()");
    await clic(".bloque-comprueba input"); await clic('[data-accion="revisarComprueba"]'); await dormir(60);
    ok(figAntes === null || (await js(`!!document.querySelector('.fig-ctrl button[aria-pressed=true][data-v="${figAntes}"]')`)), "una figura conserva su estado cuando la página se redibuja");
    await ir("memorizar");
    ok((await js("document.querySelectorAll('#app .katex').length")) > 3, "KaTeX renderiza en Memorizar");
    await ir("buscar/silueta");
    ok((await js("document.querySelectorAll('.resultados li').length")) > 0, "el buscador encuentra «silueta»");

    /* ═══ 3. Selector de prueba ═══ */
    seccion = "Selector de prueba";
    console.log("\n" + seccion);
    const titulos = async () => js("Array.from(document.querySelectorAll('.tarjeta-modulo h3')).map(x=>x.textContent).join('|')");
    await ir("aprender");
    await clic('#selectorPrueba [data-prueba="P1"]'); await dormir(80);
    const t1 = await titulos();
    await clic('#selectorPrueba [data-prueba="P2"]'); await dormir(80);
    const t2 = await titulos();
    ok(/Covarianza/.test(t1) && !/K-medias/.test(t1), "P1 muestra solo módulos de P1", t1);
    ok(/K-medias/.test(t2) && !/Covarianza/.test(t2), "P2 muestra solo módulos de P2", t2);
    ok((await js("PLATAFORMA.preguntas({prueba:'P1'}).every(q => /^m(0[1-9]|10)-/.test(q.modulo))")), "el banco de P1 no mezcla preguntas de P2");
    await clic('#selectorPrueba [data-prueba="P3"]'); await dormir(80);
    ok((await js("document.querySelectorAll('.tarjeta-modulo').length")) === 0 && (await js("/sin definir/.test(document.querySelector('#app').textContent)")), "P3: dice «sin definir» y no muestra contenido");
    await ir("examen");
    ok((await js("!document.querySelector('[data-accion=empezarExamen]')")), "P3: no deja armar un examen sin banco");
    await cargar();
    ok((await js("PLATAFORMA.app.sel()")) === "P3", "la prueba elegida persiste al recargar");
    await clic('#selectorPrueba [data-prueba="todo"]'); await dormir(80);

    /* ═══ 4. Practicar: todos los tipos, bien y mal ═══ */
    seccion = "Practicar";
    console.log("\n" + seccion);
    const vistos = {}, cuentaTipo = {};
    for (const m of mods) {
      await ir("practicar/modulo/" + m);
      const total = await js(`PLATAFORMA.preguntasDeModulo(${JSON.stringify(m)}, false).length`);
      for (let k = 0; k < total; k++) {
        /* Por tipo: la 1.ª se responde bien, la 2.ª mal a propósito y el resto bien (no depende del orden barajado). */
        const tipoQ = await js("PLATAFORMA.pregunta(document.querySelector('.pregunta').getAttribute('data-qid')).tipo");
        cuentaTipo[tipoQ] = (cuentaTipo[tipoQ] || 0) + 1;
        const bien = cuentaTipo[tipoQ] !== 2;
        const tipo = await responder(bien);
        await clic('[data-accion="revisar"]'); await dormir(30);
        const r = await js("({ok: !!document.querySelector('.retro-ok'), mal: !!document.querySelector('.retro-mal'), fuente: !!document.querySelector('.retro .fuente .cita'), origen: !!document.querySelector('.retro .q-origen .chip'), kerr: document.querySelectorAll('.katex-error').length})");
        vistos[tipo] = vistos[tipo] || { bien: 0, mal: 0, fallos: [] };
        const correcto = (bien ? r.ok : r.mal) && r.fuente && r.origen && !r.kerr;
        if (correcto) vistos[tipo][bien ? "bien" : "mal"]++; else vistos[tipo].fallos.push(await js("document.querySelector('.pregunta').getAttribute('data-qid')"));
        await clic('[data-accion="siguiente"]'); await dormir(30);
      }
    }
    for (const t of ["alternativas", "vf", "multiple", "calculo", "interpretacion-R", "codigo-R", "completar-R"]) {
      const v = vistos[t] || { bien: 0, mal: 0, fallos: ["no apareció"] };
      ok(v.bien > 0 && !v.fallos.length, `tipo ${t}: corrige y muestra fuente + origen (${v.bien} bien, ${v.mal} mal)`, v.fallos);
    }
    ok(Object.values(vistos).some((v) => v.mal > 0), "una respuesta incorrecta se marca como incorrecta");
    ok((await js("/\\d+ \\/ \\d+/.test(document.querySelector('.gran-numero').textContent)")), "al terminar muestra el resumen de la práctica");
    const respondidas = await js("Object.keys(PLATAFORMA.store.e.q).length");
    ok(respondidas === (await js("PLATAFORMA.preguntas({}).length")), "el progreso registra cada pregunta respondida", respondidas);
    await ir("practicar/repaso");
    ok((await js("!!document.querySelector('.pregunta')")), "«Repasar mis errores» arma una cola con las falladas");
    await ir("practicar");
    await js("(function(){var s=document.querySelector('select[name=modulo]'); s.value=PLATAFORMA.datos.modulo[0].id; s.dispatchEvent(new Event('change',{bubbles:true}));})()"); await dormir(60);
    ok((await js("/de 12 disponibles|de \\d+ disponibles/.test(document.querySelector('.filtros button[type=submit]').textContent)")), "los filtros recalculan cuántas preguntas hay");
    await js("document.querySelector('.filtros').requestSubmit()"); await dormir(90);
    ok((await js("location.hash")) === "#/practicar/sesion" && (await js("!!document.querySelector('.pregunta')")), "práctica personalizada con filtros");
    await captura("03-pregunta");

    /* ═══ 5. Examen y umbral exacto ═══ */
    seccion = "Examen";
    console.log("\n" + seccion);
    const u = await js(`(function(){var U=PLATAFORMA.util; return {exig: PLATAFORMA.config.PORCENTAJE_APROBACION, a15:U.aprueba(15,30), a14:U.aprueba(14,30), n15:U.notaTxt(15,30), n14:U.notaTxt(14,30), n30:U.notaTxt(30,30), n0:U.notaTxt(0,30),
      borde:U.aprueba(4999,10000), nBorde:U.notaTxt(4999,10000), justo:U.aprueba(5000,10000), nJusto:U.notaTxt(5000,10000)};})()`);
    ok(u.exig === 50 && u.a15 && !u.a14 && u.n15 === "4,0" && u.n14 === "3,8" && u.n30 === "7,0" && u.n0 === "1,0", "50 % exacto aprueba con 4,0; 14/30 no (3,8)", u);
    ok(!u.borde && u.nBorde === "3,9" && u.justo && u.nJusto === "4,0", "49,99 % no aprueba y nunca se muestra 4,0 por redondeo", u);
    await ir("examen");
    await js("(function(){var s=document.querySelector('[data-cambio=ajusteN]'); s.value='10'; s.dispatchEvent(new Event('change',{bubbles:true}));})()"); await dormir(50);
    await clic('[data-accion="empezarExamen"][data-modo="examen"]'); await dormir(120);
    ok((await js("location.hash")) === "#/examen/curso", "el examen empieza");
    const nEx = await js("document.querySelectorAll('.mapa-preguntas button').length");
    const idsEx = [];
    let sinRetro = true;
    for (let k = 0; k < nEx; k++) {
      idsEx.push(await js("document.querySelector('.pregunta').getAttribute('data-qid')"));
      await responder(k !== 0);                        // la primera se responde mal
      if (await js("!!document.querySelector('.retro')")) sinRetro = false;
      if (k < nEx - 1) { await clic('[data-accion="mover"][data-paso="1"]'); await dormir(30); }
    }
    ok(nEx === 10 && new Set(idsEx).size === nEx, "10 preguntas sin repetir", idsEx);
    ok(sinRetro, "no muestra respuestas durante el examen");
    await clic('[data-accion="saltar"][data-k="0"]'); await dormir(40);
    ok((await js("!!document.querySelector('.pregunta input:checked, .pregunta input[type=text]:not([value=\"\"])')")), "al volver a una pregunta conserva lo respondido");
    await clic('[data-accion="terminarExamen"]'); await dormir(150);
    const res = await js("({hash: location.hash, nota: (document.querySelector('.resultado .gran-numero')||{}).textContent, txt: (document.querySelector('.resultado')||{}).textContent, falladas: document.querySelectorAll('.revision .retro-mal').length, tablas: document.querySelectorAll('#app table').length})");
    ok(res.hash === "#/examen/resultado" && /9 de 10 correctas \(90,0 %\)/.test(res.txt) && /Aprobado/.test(res.txt), "resultado: 9 de 10, 90 %, aprobado", res.txt);
    ok(res.nota === "6,4", "nota 1–7 = 6,4 con 90 % de logro (exigencia 50 %)", res.nota);
    ok(res.falladas === 1 && res.tablas >= 2, "muestra la fallada con explicación y el desglose por módulo y prioridad", res);
    ok((await js("PLATAFORMA.store.e.examenes.length")) === 1, "el examen queda en el historial");
    await captura("04-resultado");
    for (const modo of ["desafio", "simulacro", "diagnostico"]) {
      await ir("examen"); await clic(`[data-accion="empezarExamen"][data-modo="${modo}"]`); await dormir(120);
      const info = await js("({hash: location.hash, n: document.querySelectorAll('.mapa-preguntas button').length, reloj: !!document.getElementById('reloj'), dif: Array.from(document.querySelectorAll('.mapa-preguntas button')).length})");
      await clic('[data-accion="terminarExamen"]'); await dormir(150);
      ok(info.hash === "#/examen/curso" && info.n > 0 && (await js("location.hash")) === "#/examen/resultado", `modo ${modo}: empieza (${info.n} preguntas) y entrega resultado`, info);
    }
    ok((await js("PLATAFORMA.preguntas({desafio:true}).every(q => q.desafio || q.dificultad === 3)")), "desafío usa solo preguntas difíciles");

    /* ═══ 6. Desarrollo ═══ */
    seccion = "Desarrollo";
    console.log("\n" + seccion);
    const idDes = await js("PLATAFORMA.preguntas({soloDesarrollo:true})[0].id");
    const nPartes = await js(`PLATAFORMA.pregunta(${JSON.stringify(idDes)}).partes.length`);
    await ir("desarrollo/" + idDes);
    const partes = () => js("({total: document.querySelectorAll('.parte').length, bloq: document.querySelectorAll('.parte-bloqueada').length, sol: document.querySelectorAll('.parte-solucion').length, abrir: document.querySelectorAll('[data-accion=abrirParte]').length, texto: !!document.querySelector('#app textarea'), nota: (document.querySelector('#notaDesarrollo .gran-numero')||{}).textContent, kerr: document.querySelectorAll('.katex-error').length})");
    let e0 = await partes();
    ok(!e0.texto, "ya no hay cuadro de texto: se resuelve en papel");
    ok(e0.total === nPartes && e0.sol === 0 && e0.abrir === 1 && e0.bloq === nPartes - 1, "al inicio todas las soluciones están ocultas y solo la parte 1 se puede abrir", e0);
    await clic('[data-accion="abrirParte"]'); await dormir(60);
    let e1 = await partes();
    ok(e1.sol === 1 && e1.bloq === nPartes - 1 && e1.abrir === 0 && (await js("document.querySelectorAll('.parte-abierta [data-accion=juzgarParte]').length")) === 2, "abrir la parte 1 muestra su solución y pregunta si estuvo correcta; la 2 sigue bloqueada", e1);
    ok((await js("document.querySelectorAll('.parte-solucion .katex').length")) > 0 && !e1.kerr, "la solución renderiza LaTeX");
    await clic('.parte-abierta [data-accion="juzgarParte"][data-ok="1"]'); await dormir(60);
    let e2 = await partes();
    ok(e2.bloq === nPartes - 2 && e2.abrir === 1 && (await js("!!document.querySelector('.parte-ok')")), "al corregir la parte 1 se desbloquea la parte 2", e2);
    await cargar(); await ir("desarrollo/" + idDes);
    ok((await partes()).bloq === nPartes - 2 && (await js("!!document.querySelector('.parte-ok')")), "el avance por partes se conserva al recargar");
    ok((await js("/aparece al corregir todas/.test(document.getElementById('notaDesarrollo').textContent)")), "la nota no se muestra hasta corregir todas las partes");
    /* Resto de las partes: la 2 se marca incorrecta, las demás correctas. */
    for (let k = 1; k < nPartes; k++) {
      await clic(`[data-accion="abrirParte"][data-k="${k}"]`); await dormir(40);
      await clic(`.parte[data-k="${k}"] [data-accion="juzgarParte"][data-ok="${k === 1 ? 0 : 1}"]`); await dormir(40);
    }
    const fin = await js(`(function(){var q=PLATAFORMA.pregunta(${JSON.stringify(idDes)}), tot=0, got=0; q.partes.forEach(function(p,k){tot+=p.puntos; if(k!==1) got+=p.puntos;});
      return {esperada: PLATAFORMA.util.notaTxt(Math.round(got*100), Math.round(tot*100)), nota: document.querySelector('#notaDesarrollo .gran-numero').textContent, mal: document.querySelectorAll('.parte-mal').length, ok: document.querySelectorAll('.parte-ok').length, fuente: !!document.querySelector('.partes .fuente')};})()`);
    ok(fin.nota === fin.esperada && fin.mal === 1 && fin.ok === nPartes - 1 && fin.fuente, "con todas corregidas calcula la nota por puntaje de partes y muestra la fuente", fin);
    await clic('.parte[data-k="1"] [data-accion="juzgarParte"][data-ok="1"]'); await dormir(60);
    ok((await js("document.querySelector('#notaDesarrollo .gran-numero').textContent")) === "7,0", "se puede cambiar una corrección; con todo correcto la nota es 7,0");
    await ir("desarrollo");
    ok((await js("/Corregida: 7,0/.test(document.querySelector('#app').textContent)")), "la lista muestra la pregunta como corregida con su nota");
    await ir("desarrollo/" + idDes); await clic('[data-accion="reiniciarDesarrollo"]'); await dormir(80);
    e0 = await partes();
    ok(e0.sol === 0 && e0.bloq === nPartes - 1, "«empezar de nuevo» vuelve a ocultar todo", e0);
    await clic('[data-accion="abrirParte"]'); await dormir(60); await clic('.parte-abierta [data-accion="juzgarParte"][data-ok="1"]'); await dormir(60);
    await clic('[data-accion="abrirParte"]'); await dormir(60);
    /* Un estado guardado con el formato antiguo (v1: texto + casillas) se migra sin romper. */
    const antesMigr = await js("PLATAFORMA.store.exportar()");
    const migr = await js(`(function(){var S=PLATAFORMA.store, viejo={app:"me-estudio",estado:{v:1,q:{},desarrollo:{"${idDes}":{texto:"x",checks:[true],evaluada:true}}}}; S.importar(JSON.stringify(viejo)); return {v:S.e.v, d:Object.keys(S.e.desarrollo).length};})()`);
    await ir("desarrollo"); await ir("desarrollo/" + idDes);
    ok(migr.v === 2 && migr.d === 0 && (await js("!document.querySelector('#app .aviso-mal') && document.querySelectorAll('.parte').length")) === nPartes, "un progreso guardado con el formato anterior se migra sin errores", migr);
    await js(`PLATAFORMA.store.importar(${JSON.stringify(antesMigr)})`); await ir("desarrollo"); await ir("desarrollo/" + idDes);
    await clic('[data-accion="abrirParte"]'); await dormir(60); await clic('.parte-abierta [data-accion="juzgarParte"][data-ok="1"]'); await dormir(60);
    await clic('[data-accion="abrirParte"]'); await dormir(60);
    await captura("05-desarrollo");

    /* ═══ 7. Progreso, respaldo y reinicio ═══ */
    seccion = "Progreso";
    console.log("\n" + seccion);
    await ir("progreso");
    ok((await js("document.querySelectorAll('#app table tbody tr').length")) >= 3, "tabla de dominio e historial de evaluaciones");
    const dom = await js("PLATAFORMA.datos.modulo.filter(m => PLATAFORMA.preguntasDeModulo(m.id, false).length > 0).map(m => PLATAFORMA.progreso.dominio(m.id).valor)");
    ok(dom.every((d) => d > 0 && d <= 100), "dominio por módulo entre 0 y 100", dom);
    const respaldo = await js("PLATAFORMA.store.exportar()");
    ok(JSON.parse(respaldo).app === "me-estudio" && Object.keys(JSON.parse(respaldo).estado.q).length === respondidas, "exportar entrega un JSON con todo el progreso");
    await cargar();
    ok((await js("Object.keys(PLATAFORMA.store.e.q).length")) === respondidas && (await js("PLATAFORMA.store.e.examenes.length")) === 4, "el progreso sobrevive a recargar la página");
    await ir("progreso"); await clic('[data-accion="reiniciar"]'); await dormir(100);
    ok((await js("Object.keys(PLATAFORMA.store.e.q).length")) === 0 && (await js("PLATAFORMA.store.e.examenes.length")) === 0, "reiniciar borra el progreso (con confirmación)");
    await js(`PLATAFORMA.store.importar(${JSON.stringify(respaldo)})`);
    ok((await js("Object.keys(PLATAFORMA.store.e.q).length")) === respondidas, "importar restaura el respaldo");
    ok((await js("(function(){try{PLATAFORMA.store.importar('{\"otra\":1}');return false;}catch(e){return true;}})()")), "importar rechaza un archivo que no es un respaldo");
    /* Una pregunta retirada o inexistente en el historial no rompe nada. */
    await js("PLATAFORMA.store.anotar('pregunta-que-ya-no-existe', true)");
    await ir("progreso"); ok((await js("!!document.querySelector('#app h1') && !document.querySelector('#app .aviso-mal')")), "un id antiguo en el historial no corrompe el progreso");
    /* Sin localStorage la app igual funciona. */
    await js("localStorage.setItem('me-estudio:estado', '{esto no es json')"); await cargar();
    ok((await js("!!document.querySelector('#app h1')")), "un estado guardado corrupto no impide abrir la app");
    await js("localStorage.clear()");

    /* ═══ 8. Tema, móvil e impresión ═══ */
    seccion = "Diseño";
    console.log("\n" + seccion);
    await cargar();
    const fondo = () => js("getComputedStyle(document.body).backgroundColor");
    const f0 = await fondo();
    await clic("#btnTema"); await dormir(40); const tA = await js("document.documentElement.getAttribute('data-tema')"); const fA = await fondo();
    await clic("#btnTema"); await dormir(40); const tB = await js("document.documentElement.getAttribute('data-tema')"); const fB = await fondo();
    ok(tA === "claro" && tB === "oscuro" && fA !== fB, "el botón alterna tema claro y oscuro", { f0, fA, fB });
    await ir("aprender/" + mods[0]); await captura("06-oscuro");
    await cdp("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "dark" }] });
    await clic("#btnTema"); await dormir(40);
    ok((await js("document.documentElement.getAttribute('data-tema')")) === null && (await fondo()) === fB, "en «auto» sigue a prefers-color-scheme del sistema");
    await cdp("Emulation.setEmulatedMedia", { features: [] });
    await cdp("Emulation.setDeviceMetricsOverride", { width: 380, height: 760, deviceScaleFactor: 2, mobile: true });
    for (const r of ["inicio", "aprender/" + mods[mods.length - 1], "memorizar", "practicar/modulo/" + mods[0], "examen", "progreso", "fuentes", "rlab/" + (await js("PLATAFORMA.datos.rlab[0].id"))]) {
      await ir(r);
      const d = await js("({w: document.documentElement.scrollWidth, v: window.innerWidth})");
      ok(d.w <= d.v + 1, `móvil 380 px sin desborde horizontal: #/${r}`, d);
    }
    await ir("aprender/" + mods[mods.length - 1]); await captura("07-movil");
    ok((await js("getComputedStyle(document.querySelector('.menu')).transform !== 'none'")), "móvil: el menú parte oculto");
    await clic('[data-accion="alternarMenu"]'); await dormir(300);
    ok((await js("document.body.classList.contains('menu-abierto')")), "móvil: ☰ abre el menú");
    await cdp("Emulation.setDeviceMetricsOverride", { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
    for (const r of ["inicio", "aprender/" + mods[mods.length - 1], "fuentes", "progreso"]) {
      await ir(r);
      const d = await js("({w: document.documentElement.scrollWidth, v: window.innerWidth, menu: getComputedStyle(document.querySelector('.menu')).position})");
      ok(d.w <= d.v + 1 && d.menu === "sticky", `escritorio 1280 px: menú lateral fijo y sin desborde: #/${r}`, d);
    }
    await ir("aprender/" + mods[0] + "/" + (await js("PLATAFORMA.datos.modulo[0].conceptos[1].id"))); await dormir(150);
    ok((await js("window.scrollY > 200")), "enlace directo a un concepto (#/aprender/módulo/concepto) baja hasta él");
    await ir("memorizar");
    await cdp("Emulation.setEmulatedMedia", { media: "print" });
    ok((await js("getComputedStyle(document.querySelector('.menu')).display")) === "none" && (await js("getComputedStyle(document.querySelector('.barra-superior')).display")) === "none", "impresión: sin menú ni barra");
    ok((await js("getComputedStyle(document.body).backgroundColor")) === "rgb(255, 255, 255)", "impresión: fondo blanco");
    await cdp("Emulation.setEmulatedMedia", { media: "" });

    /* ═══ 9. Fuentes y enlaces ═══ */
    seccion = "Fuentes";
    console.log("\n" + seccion);
    await ir("aprender/" + mods[0]);
    const citas = await js("Array.from(document.querySelectorAll('a.cita')).map(a => decodeURIComponent(a.getAttribute('href').replace('#/fuentes/','')))");
    ok(citas.length > 0 && (await js(`${JSON.stringify(citas)}.every(id => !!PLATAFORMA.fuente(id))`)), "cada cita 📎 lleva a una fuente registrada");
    const enlaces = await js("PLATAFORMA.datos.fuente.map(f => PLATAFORMA.util.enlaceArchivo(f))");
    const rotos = enlaces.filter((h) => !fs.existsSync(path.resolve(RAIZ, decodeURIComponent(h.split("#")[0]))));
    ok(rotos.length === 0, `los ${enlaces.length} enlaces «Abrir archivo» apuntan a archivos que existen`, rotos);
    ok((await js("PLATAFORMA.util.enlaceArchivo(PLATAFORMA.fuente('C7.1'), 'pág. 17')")).endsWith("#page=17"), "un PDF citado con página abre en esa página");

    /* ═══ 10. Agregar un módulo y preguntas SIN tocar js/ ═══ */
    seccion = "Extensibilidad";
    console.log("\n" + seccion);
    const antes = hashJs();
    const fMod = path.join(RAIZ, "data", "modulos", "m99-prueba-funcional.js"), fPreg = path.join(RAIZ, "data", "preguntas", "m99-prueba-funcional.js");
    const gen = () => spawnSync(process.execPath, [path.join(__dirname, "generar_manifiesto.js")], { encoding: "utf8" });
    try {
      fs.writeFileSync(fMod, `PLATAFORMA.registrar("modulo", { id: "m99-prueba-funcional", orden: 99, titulo: "Módulo temporal de prueba", pruebas: [], prioridad: "baja",
        fuentes: [{ id: "C1" }], conceptos: [{ id: "m99-c01", titulo: "Concepto temporal", simple: "<p>Texto $a^2+b^2$.</p>", fuente: [{ id: "C1" }] }] });`);
      fs.writeFileSync(fPreg, `PLATAFORMA.registrar("pregunta", { id: "m99-q001", modulo: "m99-prueba-funcional", tipo: "vf", dificultad: 1, origen: "nueva",
        enunciado: "Pregunta temporal.", correcta: true, explicacion: "Temporal.", fuente: [{ id: "C1" }] });`);
      gen(); await cargar();
      await ir("aprender");
      ok(/Módulo temporal de prueba/.test(await titulos()), "el módulo nuevo aparece en Aprender");
      await ir("practicar");
      ok((await js("Array.from(document.querySelectorAll('select[name=modulo] option')).some(o => o.value === 'm99-prueba-funcional')")), "aparece en los filtros de Practicar");
      await ir("practicar/modulo/m99-prueba-funcional"); await responder(true); await clic('[data-accion="revisar"]'); await dormir(40);
      ok((await js("!!document.querySelector('.retro-ok')")), "su pregunta se puede practicar y corrige bien");
      await ir("progreso");
      ok((await js("/Módulo temporal de prueba/.test(document.querySelector('#app').textContent)")), "entra en el dominio de Mi progreso");
    } finally {
      [fMod, fPreg].forEach((f) => { try { fs.unlinkSync(f); } catch (e) { /* no existía */ } });
      gen();
    }
    await cargar();
    ok((await js("!PLATAFORMA.modulo('m99-prueba-funcional')")) && (await js("!!document.querySelector('#app h1')")), "al quitarlo, la app sigue bien aunque quede historial de esa pregunta");
    ok(hashJs() === antes, "ningún archivo de js/ ni index.html cambió");
    await js("localStorage.clear()");

    /* ═══ 11. Offline y errores ═══ */
    seccion = "Offline";
    console.log("\n" + seccion);
    const fuera = pedidos.filter((p) => !/^(file:|data:|about:|blob:)/.test(p));
    ok(fuera.length === 0, `${pedidos.length} recursos cargados, ninguno desde la red`, fuera.slice(0, 5));
    ok(erroresPagina.length === 0, "sin errores de JavaScript en toda la sesión", erroresPagina.slice(0, 5));
  } catch (e) {
    ok(false, "la prueba se interrumpió", e.message);
  } finally {
    nav.cerrar();
  }

  const malas = resultados.filter((r) => !r.ok);
  console.log("\n" + "━".repeat(40));
  console.log(`${malas.length ? "✘" : "✔"} prueba_funcional: ${resultados.length - malas.length} de ${resultados.length} comprobaciones pasan.`);
  malas.forEach((m) => console.log("   ✘ " + m.nombre));
  if (malas.length) process.exitCode = 1;
})();
