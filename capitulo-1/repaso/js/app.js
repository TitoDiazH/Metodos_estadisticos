/* ============================================================================
   app.js — Router, sistema de progreso (localStorage), práctica y exámenes.
   ========================================================================== */

/* ───────────────────────── Estado persistente ───────────────────────── */
const KEY = 'metodos-estadisticos-repaso-v1';
const PASS = 70;          // % de aprobación
const EXAM_N = 30;        // preguntas del examen por defecto

const blank = () => ({
  v: 1,
  done: {},        // moduleId -> true
  last: null,      // último módulo abierto
  qstat: {},       // qid -> {a: intentos, c: aciertos}
  mstat: {},       // moduleId -> {a: intentos, c: aciertos}
  exams: [],       // historial
  best: 0,         // mejor % (redondeado, para mostrar)
  bestRaw: 0,      // mejor % exacto (para comparar)
  diag: false,
  seenFlash: 0
});

let S = load();

function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(!raw) return blank();
    const p = JSON.parse(raw);
    return Object.assign(blank(), p);
  }catch(e){ return blank(); }
}
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){}
}
function resetAll(){
  if(confirm('¿Borrar todo tu progreso? Esta acción no se puede deshacer.')){
    S = blank(); save(); location.hash = '#/inicio'; render();
  }
}

/* ───────────────────────── Utilidades ───────────────────────── */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const pct = (c, a) => a > 0 ? Math.round(1000*c/a)/10 : 0;
const fmtTime = s => {
  const m = Math.floor(s/60), r = s%60;
  return m + ':' + String(r).padStart(2,'0');
};
const fmtDate = ts => new Date(ts).toLocaleDateString('es-CL',
  {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'});

function shuffle(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const MOD  = () => window.MODULES;
const modById = id => MOD().find(m => m.id === id);
const qsOf = mid => window.QUESTIONS.filter(q => q.m === mid);

/* Estadísticas por módulo */
function mstat(mid){ return S.mstat[mid] || {a:0, c:0}; }
function mastery(mid){
  const st = mstat(mid);
  return st.a >= 3 ? pct(st.c, st.a) : (st.a > 0 ? pct(st.c, st.a) : 0);
}
function totalAnswered(){ return Object.values(S.qstat).reduce((s,x)=>s+x.a, 0); }
function totalCorrect(){  return Object.values(S.qstat).reduce((s,x)=>s+x.c, 0); }
function modulesDone(){   return Object.keys(S.done).length; }

function recordAnswer(q, ok){
  const qs = S.qstat[q.id] || {a:0, c:0};
  qs.a++; if(ok) qs.c++;
  S.qstat[q.id] = qs;
  const ms = S.mstat[q.m] || {a:0, c:0};
  ms.a++; if(ok) ms.c++;
  S.mstat[q.m] = ms;
  save();
}

/* Preguntas falladas (más fallos que aciertos, o al menos un fallo) */
function wrongPool(){
  return window.QUESTIONS.filter(q => {
    const st = S.qstat[q.id];
    return st && st.a > st.c;
  });
}

/* ───────────────────────── Renderizado de LaTeX (KaTeX) ─────────────────────
   Delimitadores: $$...$$ y \[...\] para display, \(...\) para math en línea.
   NO se usa $...$ porque el contenido está lleno de precios en pesos ($1.500).
   Se ignoran <pre> y <code> para no tocar el código de R.
   -------------------------------------------------------------------------*/
function renderTex(root){
  if(typeof renderMathInElement !== 'function') return;   // KaTeX no disponible
  try{
    renderMathInElement(root, {
      delimiters: [
        {left:'$$',  right:'$$',  display:true},
        {left:'\\[', right:'\\]', display:true},
        {left:'\\(', right:'\\)', display:false}
      ],
      ignoredTags: ['script','noscript','style','textarea','pre','code','option'],
      throwOnError: false,
      errorColor: '#b3261e',
      strict: false,
      trust: false
    });
  }catch(e){ console.warn('KaTeX:', e); }
}

/* ───────────────────────── Resaltado de código R ───────────────────────── */
function highlightR(root){
  $$('pre.r', root).forEach(pre => {
    if(pre.querySelector('span')) return;      // ya viene resaltado a mano
    let h = pre.innerHTML;
    h = h.replace(/(#[^\n]*)/g, '<span class="c">$1</span>');
    h = h.replace(/(&quot;[^&]*?&quot;|"[^"\n]*")/g, '<span class="s">$1</span>');
    pre.innerHTML = h;
  });
}

/* ═══════════════════════════ VISTAS ═══════════════════════════ */

/* ---------------------------- INICIO ---------------------------- */
function viewInicio(){
  const nMod = MOD().length;
  const ans = totalAnswered(), cor = totalCorrect();
  const lastExam = S.exams[S.exams.length-1];
  const progGeneral = Math.round(100 * modulesDone() / nMod);

  const cont = S.last || MOD()[0].id;
  const contTitle = (modById(cont) || MOD()[0]).title;

  return `
  <h1>Métodos Estadísticos — Prueba 1</h1>
  <p class="lead">Aprende la materia, practica con preguntas y sigue tu progreso hasta dominar el capítulo 1:
  correlación, pruebas de hipótesis, ACP y análisis factorial.</p>

  <div class="tags">
    <span class="chip">📐 Correlación y matrices</span>
    <span class="chip">🧪 Pruebas de hipótesis</span>
    <span class="chip">🧬 ACP</span>
    <span class="chip purple">🔮 Análisis Factorial</span>
    <span class="chip amber">💻 R</span>
  </div>

  ${!S.diag ? `
  <div class="card" style="border-color:var(--accent)">
    <h3 style="margin-top:0">¿Quieres saber cuánto sabes?</h3>
    <p class="muted">Haz un examen diagnóstico de ${EXAM_N} preguntas para conocer tu nivel inicial y qué áreas necesitas reforzar. No cuenta como examen oficial.</p>
    <a class="btn amber" href="#/examen/diagnostico">🎯 Hacer examen diagnóstico</a>
  </div>` : ''}

  <div class="grid g4" style="margin:20px 0">
    <div class="stat"><div class="k">Progreso general</div><div class="v">${progGeneral}%</div>
      <div class="bar" style="margin-top:8px"><i style="width:${progGeneral}%"></i></div>
      <div class="s" style="margin-top:5px">${modulesDone()} de ${nMod} módulos</div></div>
    <div class="stat"><div class="k">Último resultado</div>
      <div class="v">${lastExam ? lastExam.pct + '%' : '—'}</div>
      <div class="s">${lastExam ? lastExam.correct + '/' + lastExam.n + ' · ' + fmtDate(lastExam.ts) : 'Sin exámenes aún'}</div></div>
    <div class="stat"><div class="k">Mejor resultado</div><div class="v">${S.best ? S.best + '%' : '—'}</div>
      <div class="s">${S.exams.length} examen${S.exams.length===1?'':'es'} rendido${S.exams.length===1?'':'s'}</div></div>
    <div class="stat"><div class="k">Preguntas respondidas</div><div class="v">${ans}</div>
      <div class="s">${ans ? pct(cor,ans) + '% de acierto' : 'Empieza a practicar'}</div></div>
  </div>

  <div class="btnrow" style="margin-bottom:22px">
    <a class="btn big" href="#/aprender/${cont}">▶ Continuar estudiando</a>
    <a class="btn big ghost" href="#/examen">📝 Hacer un examen</a>
    ${wrongPool().length ? `<a class="btn big purple" href="#/examen/errores">🧠 Repasar mis errores (${wrongPool().length})</a>` : ''}
  </div>

  <h2>Ruta de estudio recomendada</h2>
  <div class="grid g2">
    <div class="card">
      <h3 style="margin-top:0">1 · Entiende</h3>
      <p class="muted small">Recorre los ${nMod} módulos de <b>Aprender</b>. Cada uno tiene definición simple → formal → ejemplo resuelto de las pautas → trampas típicas.</p>
      <a class="btn ghost" href="#/aprender">📚 Ir a Aprender</a>
    </div>
    <div class="card">
      <h3 style="margin-top:0">2 · Memoriza</h3>
      <p class="muted small">Fórmulas, umbrales, valores críticos que aparecen en las pautas y tablas de decisión. Más ${window.FLASHCARDS.length} flashcards.</p>
      <a class="btn ghost" href="#/memoria">🧾 Ir a Memorizar</a>
    </div>
    <div class="card">
      <h3 style="margin-top:0">3 · Programa</h3>
      <p class="muted small">Fundamentos de R, recetario de todas las pruebas, y cómo leer línea por línea cada salida (la pregunta 3 de la prueba).</p>
      <a class="btn ghost" href="#/rlab">💻 Ir a R</a>
    </div>
    <div class="card">
      <h3 style="margin-top:0">4 · Practica y falla</h3>
      <p class="muted small">${window.QUESTIONS.length} preguntas con explicación y fuente. Luego simulacro cronometrado y repaso de errores.</p>
      <a class="btn ghost" href="#/practicar">🎯 Ir a Practicar</a>
    </div>
  </div>

  <div class="card" style="border-color:var(--amber)">
    <h3 style="margin-top:0">🎯 ¿Te cuesta elegir el test correcto?</h3>
    <p class="muted small">El módulo 15 es un taller dedicado: árbol maestro de decisión, diccionario «enunciado → símbolo» (qué número es μ₀, cuál es s, cuándo σ² y no σ), tabla de grados de libertad y 6 casos resueltos de identificación. Es el módulo con más preguntas del banco.</p>
    <div class="btnrow">
      <a class="btn amber" href="#/aprender/m15">📚 Ir al taller</a>
      <a class="btn ghost" href="#/practicar/m15">🎯 Practicar solo esto</a>
    </div>
  </div>

  <h2>Temario de la prueba</h2>
  <table class="tbl">
    <tr><th>Pregunta</th><th>Contenido</th><th>Dónde estudiarlo</th></tr>
    <tr><td><b>1.</b> Resolución y test de hipótesis</td><td>Ejercicios y aplicación de pruebas de hipótesis</td>
        <td><a href="#/aprender/m4">M4</a>, <a href="#/aprender/m5">M5</a>, <a href="#/aprender/m6">M6</a>, <a href="#/aprender/m7">M7</a>, <a href="#/aprender/m8">M8</a>, <a href="#/aprender/m15"><b>M15</b></a></td></tr>
    <tr><td><b>2.</b> Lecturas</td><td>Lecturas de ACP y análisis factorial</td>
        <td><a href="#/aprender/m9">M9</a>, <a href="#/aprender/m11">M11</a>, <a href="#/aprender/m13">M13</a></td></tr>
    <tr><td><b>3.</b> Ayudantías y modelos vistos en clase</td><td>Contenidos de clases y ayudantías, con interpretación de resultados de R</td>
        <td><a href="#/aprender/m10">M10</a>, <a href="#/aprender/m12">M12</a>, <a href="#/rlab">💻 R</a></td></tr>
  </table>
  `;
}

/* ---------------------------- APRENDER: índice ---------------------------- */
function viewAprender(){
  const rows = MOD().map(m => {
    const st = mstat(m.id), mv = mastery(m.id);
    const done = S.done[m.id];
    const cls = mv >= 90 ? 'green' : mv >= 60 ? '' : mv > 0 ? 'amber' : '';
    return `
    <div class="modrow ${done ? 'done' : ''}" onclick="location.hash='#/aprender/${m.id}'">
      <div class="modnum">${done ? '✓' : m.num}</div>
      <div class="modbody">
        <div class="modttl">${m.title} <span class="chip plain">${m.tag}</span></div>
        <div class="moddesc">${m.desc}</div>
        <div class="modmeta">
          <div class="bar ${cls}"><i style="width:${mv}%"></i></div>
          <span>Dominio ${mv}%${mv>=90?' 🟢 dominado':''}</span>
          <span>·</span>
          <span>${qsOf(m.id).length} preguntas${st.a?` · ${st.c}/${st.a} correctas`:''}</span>
        </div>
      </div>
    </div>`;
  }).join('');

  return `
  <h1>📚 Aprender</h1>
  <p class="lead">${MOD().length} módulos construidos a partir de los PPT de clases, los enunciados y pautas de ayudantías, las pautas de pruebas pasadas y los scripts de R del curso. Cada módulo termina con la fuente exacta de su contenido.</p>
  ${rows}
  <div class="note info" style="margin-top:22px"><span class="nh">📌 Cómo usar esta sección</span>
  <p>No leas de corrido. Al terminar cada módulo, márcalo como completado y usa <b>«Practicar este módulo»</b>: la barra de dominio se calcula con las preguntas de ese módulo que hayas respondido, y llega a 🟢 <b>dominado</b> al 90%.</p></div>
  `;
}

/* ---------------------------- APRENDER: módulo ---------------------------- */
function viewModulo(mid){
  const m = modById(mid);
  if(!m) return '<h1>Módulo no encontrado</h1><a class="btn" href="#/aprender">Volver</a>';
  S.last = mid; save();

  const i = MOD().findIndex(x => x.id === mid);
  const prev = i > 0 ? MOD()[i-1] : null;
  const next = i < MOD().length-1 ? MOD()[i+1] : null;
  const progress = Math.round(100*(i+1)/MOD().length);
  const done = !!S.done[mid];
  const mv = mastery(mid);

  return `
  <div class="small muted" style="margin-bottom:6px">
    <a href="#/aprender">📚 Aprender</a> › Módulo ${m.num} de ${MOD().length}
  </div>
  <div class="bar" style="margin-bottom:16px"><i style="width:${progress}%"></i></div>

  <h1>${m.title}</h1>
  <div class="tags"><span class="chip">${m.tag}</span>
    <span class="chip ${mv>=90?'green':'plain'}">Dominio ${mv}%${mv>=90?' 🟢':''}</span>
    <span class="chip plain">${qsOf(mid).length} preguntas</span></div>
  <p class="lead">${m.desc}</p>

  <div class="card">${m.html}</div>

  <div class="card" style="text-align:center;border-color:${done?'var(--green)':'var(--line)'}">
    ${done ? '<h3 style="margin-top:0;color:var(--green)">🎉 ¡Módulo completado!</h3>'
           : '<h3 style="margin-top:0">¿Terminaste este módulo?</h3>'}
    <div class="btnrow" style="justify-content:center">
      <button class="btn ${done?'ghost':'green'}" onclick="toggleDone('${mid}')">
        ${done ? '↺ Marcar como pendiente' : '✓ Marcar como completado'}</button>
      <a class="btn" href="#/practicar/${mid}">🎯 Practicar este módulo</a>
    </div>
  </div>

  <div class="pager">
    ${prev ? `<a class="btn ghost" href="#/aprender/${prev.id}">← ${prev.title}</a>` : '<span></span>'}
    ${next ? `<a class="btn" href="#/aprender/${next.id}">${next.title} →</a>`
           : `<a class="btn green" href="#/examen">📝 Terminaste: hacer examen</a>`}
  </div>
  `;
}

function toggleDone(mid){
  if(S.done[mid]) delete S.done[mid]; else S.done[mid] = true;
  save(); render();
}

/* ---------------------------- MEMORIZAR ---------------------------- */
function viewMemoria(){
  const toc = window.MEMORIA.map((s,i)=>`<a href="#mem${i}">${s.icon} ${s.title}</a>`).join('');
  const secs = window.MEMORIA.map((s,i)=>`
    <div class="card" id="mem${i}">
      <h3 style="margin-top:0">${s.icon} ${s.title}</h3>
      <table class="tbl">
        ${s.rows.map(r=>`<tr><td style="width:34%"><b>${r[0]}</b></td><td>${r[1]}</td></tr>`).join('')}
      </table>
    </div>`).join('');

  return `
  <h1>🧾 Lo que tengo que memorizar</h1>
  <p class="lead">Resumen de última hora: fórmulas, umbrales, valores críticos que ya aparecieron en las pautas y tablas de decisión. Todo lo que no se deduce y hay que tener en la cabeza.</p>
  <div class="btnrow" style="margin-bottom:14px">
    <a class="btn amber" href="#/flash">🃏 Modo flashcards (${window.FLASHCARDS.length})</a>
    <button class="btn ghost" onclick="window.print()">🖨 Imprimir</button>
  </div>
  <div class="toc">${toc}</div>
  ${secs}
  `;
}

/* ---------------------------- FLASHCARDS ---------------------------- */
let FC = {i:0, shown:false, order:[]};
function viewFlash(){
  if(!FC.order.length) FC.order = shuffle(window.FLASHCARDS.map((_,i)=>i));
  const card = window.FLASHCARDS[FC.order[FC.i]];
  return `
  <div class="small muted" style="margin-bottom:6px"><a href="#/memoria">🧾 Memorizar</a> › Flashcards</div>
  <h1>🃏 Flashcards</h1>
  <div class="qhead">
    <span class="chip plain">${FC.i+1} / ${FC.order.length}</span>
    <button class="btn ghost small" onclick="fcShuffle()">🔀 Barajar</button>
  </div>
  <div class="bar" style="margin-bottom:16px"><i style="width:${Math.round(100*(FC.i+1)/FC.order.length)}%"></i></div>

  <div class="flash">
    <div class="fq">${card.q}</div>
    ${FC.shown
      ? `<div class="fa"><div class="note tip"><span class="nh">Respuesta</span><p>${card.a}</p></div></div>`
      : `<button class="btn big" onclick="fcShow()">Mostrar respuesta</button>`}
  </div>

  <div class="pager">
    <button class="btn ghost" onclick="fcNav(-1)" ${FC.i===0?'disabled':''}>← Anterior</button>
    <button class="btn" onclick="fcNav(1)" ${FC.i===FC.order.length-1?'disabled':''}>Siguiente →</button>
  </div>
  `;
}
function fcShow(){ FC.shown = true; render(); }
function fcNav(d){ FC.i = Math.max(0, Math.min(FC.order.length-1, FC.i+d)); FC.shown = false; render(); }
function fcShuffle(){ FC.order = shuffle(window.FLASHCARDS.map((_,i)=>i)); FC.i=0; FC.shown=false; render(); }

/* ---------------------------- R LAB ---------------------------- */
function viewRlab(id){
  if(id){
    const s = window.RLAB.find(x => x.id === id);
    if(!s) return viewRlab();
    const i = window.RLAB.findIndex(x => x.id === id);
    const prev = i>0 ? window.RLAB[i-1] : null, next = i<window.RLAB.length-1 ? window.RLAB[i+1] : null;
    return `
    <div class="small muted" style="margin-bottom:6px"><a href="#/rlab">💻 R</a> › ${s.title}</div>
    <h1>${s.icon} ${s.title}</h1>
    <p class="lead">${s.desc}</p>
    <div class="card">${s.html}</div>
    <div class="pager">
      ${prev?`<a class="btn ghost" href="#/rlab/${prev.id}">← ${prev.title}</a>`:'<a class="btn ghost" href="#/rlab">← Índice</a>'}
      ${next?`<a class="btn" href="#/rlab/${next.id}">${next.title} →</a>`:'<a class="btn" href="#/practicar">🎯 Practicar</a>'}
    </div>`;
  }
  return `
  <h1>💻 R para Métodos Estadísticos</h1>
  <p class="lead">Del lenguaje base al recetario de cada prueba, y cómo leer línea por línea las salidas que la prueba 3 pide interpretar.</p>
  ${window.RLAB.map(s=>`
    <div class="modrow" onclick="location.hash='#/rlab/${s.id}'">
      <div class="modnum">${s.icon}</div>
      <div class="modbody"><div class="modttl">${s.title}</div><div class="moddesc">${s.desc}</div></div>
    </div>`).join('')}
  <div class="note tip" style="margin-top:20px"><span class="nh">✅ Para la pregunta 3</span>
  <p>La sección <b>«Leer las salidas de R»</b> es la que más se parece a lo que te van a pedir: te dan un bloque de consola y tienes que decir qué prueba es, qué hipótesis contrasta, qué número es el relevante y qué se concluye.</p></div>
  `;
}

/* ---------------------------- PRACTICAR ---------------------------- */
let PR = null;   // {pool, i, sel, checked}

function viewPracticarIndex(){
  const rows = MOD().map(m=>{
    const st = mstat(m.id), mv = mastery(m.id);
    const cls = mv>=90?'green':mv>=60?'':mv>0?'amber':'';
    return `<div class="modrow" onclick="location.hash='#/practicar/${m.id}'">
      <div class="modnum">${m.num}</div>
      <div class="modbody">
        <div class="modttl">${m.title}</div>
        <div class="modmeta">
          <div class="bar ${cls}"><i style="width:${mv}%"></i></div>
          <span>${mv}%${mv>=90?' 🟢':''}</span><span>·</span>
          <span>${qsOf(m.id).length} preguntas${st.a?` · respondidas ${st.a}`:''}</span>
        </div>
      </div></div>`;
  }).join('');

  return `
  <h1>🎯 Practicar</h1>
  <p class="lead">Preguntas de a una, con corrección inmediata, explicación del porqué y la fuente exacta. Sin cronómetro y sin nota: aquí se aprende fallando.</p>
  <div class="btnrow" style="margin-bottom:18px">
    <button class="btn" onclick="startPractice('all')">🎲 Todas las preguntas (${window.QUESTIONS.length})</button>
    <button class="btn amber" onclick="startPractice('hard')">🔥 Solo difíciles (${window.QUESTIONS.filter(q=>q.d==='h').length})</button>
    ${wrongPool().length?`<button class="btn purple" onclick="startPractice('wrong')">🧠 Mis errores (${wrongPool().length})</button>`:''}
    ${totalAnswered()?`<button class="btn ghost" onclick="startPractice('new')">✨ No respondidas</button>`:''}
  </div>
  <h2>Por módulo</h2>
  ${rows}
  `;
}

function startPractice(kind, mid){
  let pool;
  if(kind === 'module')      pool = qsOf(mid);
  else if(kind === 'hard')   pool = window.QUESTIONS.filter(q => q.d === 'h');
  else if(kind === 'wrong')  pool = wrongPool();
  else if(kind === 'new')    pool = window.QUESTIONS.filter(q => !S.qstat[q.id]);
  else                       pool = window.QUESTIONS.slice();

  if(!pool.length){ alert('No hay preguntas disponibles en esta selección.'); return; }
  PR = {pool: shuffle(pool).map(prep), i:0, sel:null, checked:false,
        label:labelOf(kind, mid), mid: kind === 'module' ? mid : null};
  location.hash = '#/practicar/run';
  render();
}
function labelOf(kind, mid){
  if(kind==='module') return modById(mid).title;
  if(kind==='hard')   return 'Preguntas difíciles';
  if(kind==='wrong')  return 'Repaso de errores';
  if(kind==='new')    return 'Preguntas no respondidas';
  return 'Todas las preguntas';
}

/* Prepara una pregunta: baraja alternativas (excepto V/F) */
function prep(q){
  const n = q.o.length;
  const order = (q.t === 'vf') ? q.o.map((_,i)=>i) : shuffle(q.o.map((_,i)=>i));
  return {q, order};
}
function isCorrect(item, sel){
  const {q, order} = item;
  if(q.t === 'multi'){
    const chosen = (sel||[]).map(i => order[i]).sort((a,b)=>a-b);
    const right  = q.c.slice().sort((a,b)=>a-b);
    return chosen.length === right.length && chosen.every((v,i)=>v===right[i]);
  }
  return sel !== null && sel !== undefined && order[sel] === q.c;
}

function viewPracticarRun(){
  if(!PR) { location.hash = '#/practicar'; return viewPracticarIndex(); }
  const item = PR.pool[PR.i];
  const {q, order} = item;
  const m = modById(q.m);
  const ok = PR.checked ? isCorrect(item, PR.sel) : null;

  const optHtml = order.map((oi, di) => {
    const letter = String.fromCharCode(65+di);
    let cls = '';
    if(PR.checked){
      cls = 'locked';
      const isRight = q.t === 'multi' ? q.c.includes(oi) : oi === q.c;
      const isSel   = q.t === 'multi' ? (PR.sel||[]).includes(di) : PR.sel === di;
      if(isRight) cls += ' ok';
      else if(isSel) cls += ' bad';
    } else {
      const isSel = q.t === 'multi' ? (PR.sel||[]).includes(di) : PR.sel === di;
      if(isSel) cls += ' sel';
    }
    return `<button class="opt ${cls}" ${PR.checked?'disabled':''} onclick="prSelect(${di})">
      <span class="lt">${letter}</span><span>${q.o[oi]}</span></button>`;
  }).join('');

  const canCheck = q.t === 'multi' ? (PR.sel||[]).length > 0 : PR.sel !== null;

  return `
  <div class="small muted" style="margin-bottom:6px"><a href="#/practicar">🎯 Practicar</a> › ${PR.label}</div>
  <div class="qhead">
    <span class="chip plain">Pregunta ${PR.i+1} de ${PR.pool.length}</span>
    <div class="tags" style="margin:0">
      <span class="chip">${m ? 'M'+m.num+' · '+m.tag : q.m}</span>
      ${q.d==='h'?'<span class="chip amber">🔥 difícil</span>':''}
      ${q.t==='multi'?'<span class="chip purple">selecciona todas</span>':''}
      ${q.t==='vf'?'<span class="chip purple">V / F</span>':''}
    </div>
  </div>
  <div class="bar" style="margin-bottom:14px"><i style="width:${Math.round(100*(PR.i+1)/PR.pool.length)}%"></i></div>

  <div class="qcard">
    <div class="qtext">${q.q}</div>
    <div class="opts">${optHtml}</div>

    ${PR.checked ? `
    <div class="fb ${ok?'ok':'bad'}">
      <div class="fbh">${ok?'✅ Correcto':'❌ Incorrecto'}</div>
      <div class="why"><b>Respuesta correcta:</b> ${
        q.t==='multi' ? q.c.map(i=>q.o[i]).join(' · ') : q.o[q.c]}</div>
      <div class="why">${q.e}</div>
      <div class="src">Fuente: ${q.s}</div>
    </div>` : ''}

    <div class="pager">
      <button class="btn ghost" onclick="prNav(-1)" ${PR.i===0?'disabled':''}>← Anterior</button>
      ${PR.checked
        ? (PR.i < PR.pool.length-1
            ? `<button class="btn" onclick="prNav(1)">Siguiente →</button>`
            : `<a class="btn green" href="#/practicar">✓ Terminar sesión</a>`)
        : `<button class="btn" onclick="prCheck()" ${canCheck?'':'disabled'}>Comprobar</button>`}
    </div>
  </div>
  `;
}

function prSelect(di){
  const item = PR.pool[PR.i];
  if(PR.checked) return;
  if(item.q.t === 'multi'){
    PR.sel = PR.sel || [];
    const k = PR.sel.indexOf(di);
    if(k >= 0) PR.sel.splice(k,1); else PR.sel.push(di);
  } else {
    PR.sel = di;
  }
  render();
}
function prCheck(){
  const item = PR.pool[PR.i];
  PR.checked = true;
  recordAnswer(item.q, isCorrect(item, PR.sel));
  render();
}
function prNav(d){
  const ni = PR.i + d;
  if(ni < 0 || ni >= PR.pool.length) return;
  PR.i = ni; PR.sel = null; PR.checked = false;
  render();
}

/* ---------------------------- EXAMEN ---------------------------- */
let EX = null;  // {mode, items, ans, flags, i, t0, done, elapsed}

const MODES = {
  normal:      {n: EXAM_N, label:'Examen',            icon:'📝', timed:false, desc:`${EXAM_N} preguntas aleatorias de todo el temario.`},
  desafio:     {n: 20,     label:'Desafío',           icon:'🔥', timed:false, desc:'20 preguntas priorizando excepciones, cifras, casos límite y conceptos parecidos.'},
  simulacro:   {n: EXAM_N, label:'Simulacro oficial', icon:'🎓', timed:true,  desc:`${EXAM_N} preguntas cronometradas, sin pistas ni explicaciones hasta terminar.`},
  diagnostico: {n: EXAM_N, label:'Diagnóstico',       icon:'🎯', timed:false, desc:'Mide tu nivel inicial y detecta tus áreas débiles.'},
  errores:     {n: 20,     label:'Repasar errores',   icon:'🧠', timed:false, desc:'Preguntas que ya fallaste antes, para cerrar los huecos.'}
};

function viewExamenIndex(){
  const hist = S.exams.slice().reverse().slice(0,8);
  return `
  <h1>📝 Examen</h1>
  <p class="lead">Criterio de referencia: <b>${PASS}%</b>. No es una aprobación oficial de nada — es un indicador de dominio para saber si estás listo.</p>

  <div class="grid g2">
    ${Object.entries(MODES).filter(([k])=> k!=='errores' || wrongPool().length).map(([k,c])=>`
      <div class="card">
        <h3 style="margin-top:0">${c.icon} ${c.label}</h3>
        <p class="muted small">${c.desc}${c.timed?' <b>Con cronómetro.</b>':''}</p>
        <button class="btn ${k==='simulacro'?'green':k==='desafio'?'amber':k==='errores'?'purple':''}"
          onclick="startExam('${k}')">Comenzar</button>
      </div>`).join('')}
  </div>

  <div class="note info"><span class="nh">📌 Reglas del examen</span>
  <ul class="tight">
    <li>Las preguntas se eligen al azar del banco de ${window.QUESTIONS.length}.</li>
    <li>Las alternativas se mezclan, así que la correcta no queda siempre en la misma posición.</li>
    <li>No se muestran respuestas durante el examen: puedes navegar, marcar preguntas y revisar las pendientes.</li>
    <li>Al terminar verás la corrección detallada de cada pregunta que fallaste, con su explicación y fuente.</li>
  </ul></div>

  ${hist.length ? `
  <h2>Historial</h2>
  <table class="tbl">
    <tr><th>Fecha</th><th>Modo</th><th>Resultado</th><th>%</th><th>Tiempo</th><th>Veredicto</th></tr>
    ${hist.map(e=>`<tr>
      <td>${fmtDate(e.ts)}</td><td>${MODES[e.mode]?MODES[e.mode].label:e.mode}</td>
      <td>${e.correct}/${e.n}</td><td><b>${e.pct}%</b></td><td>${fmtTime(e.secs)}</td>
      <td>${(e.raw!==undefined?e.raw:e.pct)>=PASS?'<span class="chip green">🟢 Aprobado</span>':'<span class="chip red">🔴 No aprobado</span>'}</td>
    </tr>`).join('')}
  </table>` : ''}
  `;
}

function pickQuestions(mode, n){
  let pool;
  if(mode === 'desafio'){
    const hard = window.QUESTIONS.filter(q => q.d === 'h');
    const rest = shuffle(window.QUESTIONS.filter(q => q.d !== 'h'));
    pool = shuffle(hard).concat(rest);
  } else if(mode === 'errores'){
    const w = shuffle(wrongPool());
    const weakMods = MOD().map(m=>({m, p: mastery(m.id), a: mstat(m.id).a}))
      .filter(x => x.a >= 2 && x.p < 80).map(x => x.m.id);
    const weak = shuffle(window.QUESTIONS.filter(q => weakMods.includes(q.m) && !w.includes(q)));
    pool = w.concat(weak, shuffle(window.QUESTIONS));
  } else {
    pool = shuffle(window.QUESTIONS);
  }
  const seen = new Set(); const out = [];
  for(const q of pool){
    if(seen.has(q.id)) continue;
    seen.add(q.id); out.push(q);
    if(out.length >= n) break;
  }
  return out;
}

function startExam(mode){
  const cfg = MODES[mode];
  const qs = pickQuestions(mode, cfg.n);
  if(!qs.length){ alert('No hay preguntas disponibles.'); return; }
  EX = {mode, items: qs.map(prep), ans: new Array(qs.length).fill(null),
        flags: new Array(qs.length).fill(false), i:0, t0: Date.now(), done:false, elapsed:0};
  location.hash = '#/examen/run';
  render();
  if(cfg.timed) tick();
}

let timer = null;
function tick(){
  clearInterval(timer);
  timer = setInterval(() => {
    if(!EX || EX.done){ clearInterval(timer); return; }
    const el = $('#clock');
    if(el) el.textContent = '⏱ ' + fmtTime(Math.floor((Date.now()-EX.t0)/1000));
    else { clearInterval(timer); }
  }, 1000);
}

function viewExamenRun(){
  if(!EX){ location.hash = '#/examen'; return viewExamenIndex(); }
  if(EX.done) return viewExamenResult();

  const cfg = MODES[EX.mode];
  const item = EX.items[EX.i];
  const {q, order} = item;
  const sel = EX.ans[EX.i];
  const answered = EX.ans.filter(a => a !== null && !(Array.isArray(a) && !a.length)).length;

  const optHtml = order.map((oi, di) => {
    const letter = String.fromCharCode(65+di);
    const isSel = q.t === 'multi' ? (sel||[]).includes(di) : sel === di;
    return `<button class="opt ${isSel?'sel':''}" onclick="exSelect(${di})">
      <span class="lt">${letter}</span><span>${q.o[oi]}</span></button>`;
  }).join('');

  const nav = EX.items.map((_,k)=>{
    let c = '';
    const a = EX.ans[k];
    if(a !== null && !(Array.isArray(a) && !a.length)) c = 'ans';
    if(EX.flags[k]) c = 'flag';
    if(k === EX.i) c += ' cur';
    return `<button class="${c}" onclick="exGo(${k})">${k+1}</button>`;
  }).join('');

  return `
  <div class="qhead">
    <div><span class="chip">${cfg.icon} ${cfg.label}</span>
      <span class="chip plain">Pregunta ${EX.i+1} / ${EX.items.length}</span>
      ${q.t==='multi'?'<span class="chip purple">selecciona todas</span>':''}</div>
    <div class="tags" style="margin:0">
      ${cfg.timed?`<span class="chip amber" id="clock">⏱ 0:00</span>`:''}
      <span class="chip plain">${answered} respondidas</span>
    </div>
  </div>
  <div class="bar" style="margin-bottom:14px"><i style="width:${Math.round(100*(EX.i+1)/EX.items.length)}%"></i></div>

  <div class="qcard">
    <div class="qtext">${q.q}</div>
    <div class="opts">${optHtml}</div>
    <div class="pager">
      <div class="btnrow">
        <button class="btn ghost" onclick="exNav(-1)" ${EX.i===0?'disabled':''}>← Anterior</button>
        <button class="btn ghost" onclick="exFlag()">${EX.flags[EX.i]?'🚩 Desmarcar':'🏳 Marcar'}</button>
        <button class="btn ghost" onclick="exClear()">Limpiar</button>
      </div>
      ${EX.i < EX.items.length-1
        ? `<button class="btn" onclick="exNav(1)">Siguiente →</button>`
        : `<button class="btn green" onclick="exFinish()">✓ Terminar examen</button>`}
    </div>
  </div>

  <h4>Navegador de preguntas</h4>
  <div class="qnav">${nav}</div>
  <div class="btnrow">
    <button class="btn ghost" onclick="exPending()">Ir a la primera pendiente</button>
    <button class="btn green" onclick="exFinish()">✓ Terminar y corregir</button>
  </div>
  <p class="small muted">Azul = respondida · Ámbar = marcada para revisar</p>
  `;
}

function exSelect(di){
  const item = EX.items[EX.i];
  if(item.q.t === 'multi'){
    const cur = EX.ans[EX.i] || [];
    const k = cur.indexOf(di);
    if(k >= 0) cur.splice(k,1); else cur.push(di);
    EX.ans[EX.i] = cur;
  } else {
    EX.ans[EX.i] = di;
  }
  render();
}
function exNav(d){ EX.i = Math.max(0, Math.min(EX.items.length-1, EX.i+d)); render(); }
function exGo(k){ EX.i = k; render(); }
function exFlag(){ EX.flags[EX.i] = !EX.flags[EX.i]; render(); }
function exClear(){ EX.ans[EX.i] = null; render(); }
function exPending(){
  const k = EX.ans.findIndex(a => a === null || (Array.isArray(a) && !a.length));
  if(k < 0){ alert('No quedan preguntas pendientes. Puedes terminar el examen.'); return; }
  EX.i = k; render();
}
function exFinish(){
  const pend = EX.ans.filter(a => a === null || (Array.isArray(a) && !a.length)).length;
  if(pend && !confirm(`Quedan ${pend} pregunta(s) sin responder y se contarán como incorrectas. ¿Terminar de todas formas?`)) return;

  EX.done = true;
  EX.elapsed = Math.floor((Date.now() - EX.t0)/1000);
  clearInterval(timer);

  let correct = 0; const wrong = [];
  EX.items.forEach((item, k) => {
    const ok = isCorrect(item, EX.ans[k]);
    if(ok) correct++; else wrong.push(item.q.id);
    recordAnswer(item.q, ok);
  });

  // El veredicto usa el valor EXACTO (no el redondeado), para que nunca
  // se apruebe con menos del mínimo por efecto del redondeo de la vista.
  const raw = 100*correct/EX.items.length;
  const p = Math.round(raw*10)/10;
  S.exams.push({ts: Date.now(), mode: EX.mode, n: EX.items.length,
                correct, pct: p, raw, secs: EX.elapsed, wrong});
  if(raw > (S.bestRaw || 0)){ S.bestRaw = raw; S.best = p; }
  if(EX.mode === 'diagnostico') S.diag = true;
  save();
  render();
}

function viewExamenResult(){
  const total = EX.items.length;
  let correct = 0;
  EX.items.forEach((item,k)=>{ if(isCorrect(item, EX.ans[k])) correct++; });
  const raw = 100*correct/total;
  const p = Math.round(raw*10)/10;
  const pass = raw >= PASS;      // se compara el valor exacto, no el redondeado
  const cfg = MODES[EX.mode];

  // desglose por módulo
  const byMod = {};
  EX.items.forEach((item,k)=>{
    const id = item.q.m;
    byMod[id] = byMod[id] || {a:0, c:0};
    byMod[id].a++;
    if(isCorrect(item, EX.ans[k])) byMod[id].c++;
  });
  const modRows = Object.entries(byMod).sort((a,b)=> pct(a[1].c,a[1].a) - pct(b[1].c,b[1].a))
    .map(([id,st])=>{
      const m = modById(id); const v = pct(st.c, st.a);
      const cls = v>=80?'green':v>=60?'amber':'red';
      return `<tr><td><a href="#/aprender/${id}">M${m.num} · ${m.title}</a></td>
        <td>${st.c}/${st.a}</td>
        <td style="min-width:120px"><div class="bar ${cls}"><i style="width:${v}%"></i></div></td>
        <td><b>${v}%</b></td></tr>`;
    }).join('');

  const wrongItems = EX.items.map((item,k)=>({item, k, ok: isCorrect(item, EX.ans[k])}))
    .filter(x => !x.ok);

  return `
  <h1>${cfg.icon} Resultado — ${cfg.label}</h1>

  <div class="card" style="text-align:center;border-color:${pass?'var(--green)':'var(--red)'}">
    <div class="result-big">${correct} / ${total}</div>
    <div style="font-size:30px;font-weight:750;margin:4px 0">${p}%</div>
    <div class="verdict ${pass?'pass':'fail'}">${pass?'🟢 APROBADO':'🔴 NO APROBADO'}</div>
    <p class="muted small">Criterio de referencia: ${PASS}%. ${
      EX.mode==='simulacro'
        ? `<b>Si este fuera el examen real con criterio de ${PASS}%, habrías ${pass?'aprobado':'reprobado'}.</b>`
        : 'Es un indicador de dominio, no una aprobación oficial.'}</p>
  </div>

  <div class="grid g4">
    <div class="stat"><div class="k">Correctas</div><div class="v" style="color:var(--green)">${correct}</div></div>
    <div class="stat"><div class="k">Incorrectas</div><div class="v" style="color:var(--red)">${total-correct}</div></div>
    <div class="stat"><div class="k">Porcentaje</div><div class="v">${p}%</div></div>
    <div class="stat"><div class="k">Tiempo</div><div class="v">${fmtTime(EX.elapsed)}</div>
      <div class="s">${Math.round(EX.elapsed/total)} s por pregunta</div></div>
  </div>

  <h2>Desempeño por módulo</h2>
  <table class="tbl">
    <tr><th>Módulo</th><th>Acierto</th><th></th><th>%</th></tr>
    ${modRows}
  </table>

  ${wrongItems.length ? `
  <h2>Preguntas que fallaste (${wrongItems.length})</h2>
  ${wrongItems.map(({item,k})=>{
    const {q, order} = item;
    const sel = EX.ans[k];
    const yours = q.t==='multi'
      ? ((sel||[]).length ? sel.map(d=>q.o[order[d]]).join(' · ') : '<i>sin responder</i>')
      : (sel===null ? '<i>sin responder</i>' : q.o[order[sel]]);
    const right = q.t==='multi' ? q.c.map(i=>q.o[i]).join(' · ') : q.o[q.c];
    const m = modById(q.m);
    return `<div class="card">
      <div class="tags"><span class="chip">M${m.num} · ${m.tag}</span>${q.d==='h'?'<span class="chip amber">🔥 difícil</span>':''}</div>
      <div class="qtext" style="font-size:15.5px">${q.q}</div>
      <div class="fb bad" style="margin-top:0"><div class="why"><b>Tu respuesta:</b> ${yours}</div></div>
      <div class="fb ok"><div class="why"><b>Respuesta correcta:</b> ${right}</div>
        <div class="why">${q.e}</div><div class="src">Fuente: ${q.s}</div></div>
      <a class="btn ghost small" href="#/aprender/${q.m}">📚 Repasar el módulo</a>
    </div>`;
  }).join('')}` : `<div class="note tip"><span class="nh">🎉 Perfecto</span><p>No fallaste ninguna pregunta. Prueba el modo 🔥 Desafío o el 🎓 Simulacro oficial cronometrado.</p></div>`}

  <div class="btnrow" style="margin-top:20px">
    <a class="btn" href="#/examen">📝 Otro examen</a>
    <a class="btn ghost" href="#/progreso">📊 Ver mi progreso</a>
    ${wrongPool().length?`<button class="btn purple" onclick="startExam('errores')">🧠 Repasar mis errores</button>`:''}
  </div>
  `;
}

/* ---------------------------- PROGRESO ---------------------------- */
function viewProgreso(){
  const ans = totalAnswered(), cor = totalCorrect();
  const nMod = MOD().length;

  const weak = MOD().map(m => ({m, p: mastery(m.id), st: mstat(m.id)}))
    .filter(x => x.st.a >= 2)
    .sort((a,b) => a.p - b.p);
  const weakTop = weak.filter(x => x.p < 90).slice(0,5);

  const rows = MOD().map(m => {
    const st = mstat(m.id), v = mastery(m.id);
    const cls = v>=90?'green':v>=70?'':v>=50?'amber':'red';
    return `<tr>
      <td><a href="#/aprender/${m.id}">M${m.num} · ${m.title}</a>
        ${S.done[m.id]?'<span class="chip green">✓</span>':''}</td>
      <td>${st.a ? st.c+'/'+st.a : '—'}</td>
      <td style="min-width:130px"><div class="bar ${cls}"><i style="width:${v}%"></i></div></td>
      <td><b>${st.a?v+'%':'—'}</b>${v>=90?' 🟢':''}</td>
      <td><a class="btn ghost small" href="#/practicar/${m.id}">Practicar</a></td>
    </tr>`;
  }).join('');

  const hist = S.exams.slice().reverse();

  return `
  <h1>📊 Mi progreso</h1>

  <div class="grid g4" style="margin-bottom:20px">
    <div class="stat"><div class="k">Módulos completados</div><div class="v">${modulesDone()}/${nMod}</div>
      <div class="bar" style="margin-top:8px"><i style="width:${Math.round(100*modulesDone()/nMod)}%"></i></div></div>
    <div class="stat"><div class="k">Preguntas respondidas</div><div class="v">${ans}</div>
      <div class="s">de ${window.QUESTIONS.length} en el banco</div></div>
    <div class="stat"><div class="k">Acierto global</div><div class="v">${ans?pct(cor,ans)+'%':'—'}</div>
      <div class="s">${cor} correctas · ${ans-cor} falladas</div></div>
    <div class="stat"><div class="k">Mejor examen</div><div class="v">${S.best?S.best+'%':'—'}</div>
      <div class="s">${S.exams.length} rendido${S.exams.length===1?'':'s'}</div></div>
  </div>

  ${weakTop.length ? `
  <div class="card" style="border-color:var(--amber)">
    <h3 style="margin-top:0">⚠️ Mis debilidades</h3>
    <p class="muted small">Estás fallando más en:</p>
    <ol class="tight">
      ${weakTop.map(x=>`<li><a href="#/aprender/${x.m.id}"><b>${x.m.title}</b></a> — ${x.p}% (${x.st.c}/${x.st.a})</li>`).join('')}
    </ol>
    <div class="btnrow">
      <a class="btn amber" href="#/aprender/${weakTop[0].m.id}">📚 Estudiar «${weakTop[0].m.title}»</a>
      <a class="btn ghost" href="#/practicar/${weakTop[0].m.id}">🎯 Practicar ese módulo</a>
      ${wrongPool().length?`<button class="btn purple" onclick="startExam('errores')">🧠 Repasar mis errores</button>`:''}
    </div>
  </div>` : `<div class="note info"><span class="nh">📌 Aún sin datos suficientes</span>
    <p>Responde algunas preguntas en <a href="#/practicar">Practicar</a> o haz un examen para que aparezcan aquí tus áreas débiles y una recomendación de qué estudiar.</p></div>`}

  <h2>Dominio por módulo</h2>
  <table class="tbl">
    <tr><th>Módulo</th><th>Acierto</th><th>Dominio</th><th>%</th><th></th></tr>
    ${rows}
  </table>
  <p class="small muted">El dominio se calcula con las preguntas respondidas de ese módulo. Al llegar a 90% se marca 🟢 <b>tema dominado</b>.</p>

  ${hist.length ? `
  <h2>Historial de exámenes</h2>
  <table class="tbl">
    <tr><th>Fecha</th><th>Modo</th><th>Resultado</th><th>%</th><th>Tiempo</th><th>Veredicto</th></tr>
    ${hist.map(e=>`<tr>
      <td>${fmtDate(e.ts)}</td><td>${MODES[e.mode]?MODES[e.mode].label:e.mode}</td>
      <td>${e.correct}/${e.n}</td><td><b>${e.pct}%</b></td><td>${fmtTime(e.secs)}</td>
      <td>${(e.raw!==undefined?e.raw:e.pct)>=PASS?'<span class="chip green">🟢</span>':'<span class="chip red">🔴</span>'}</td>
    </tr>`).join('')}
  </table>` : ''}

  <div class="hr"></div>
  <button class="btn ghost" onclick="resetAll()">🗑 Borrar todo mi progreso</button>
  <p class="small muted">El progreso se guarda en <code class="inl">localStorage</code> de este navegador. No se envía a ninguna parte.</p>
  `;
}

/* ---------------------------- FUENTES ---------------------------- */
function viewFuentes(){
  return `
  <h1>📖 Fuentes</h1>
  <p class="lead">Todo el contenido de esta plataforma proviene de las fuentes listadas abajo, con esta jerarquía de autoridad: <b>1º</b> material del curso (PPT, enunciados, pautas, scripts) &gt; <b>2º</b> temario e indicaciones entregadas &gt; <b>3º</b> búsquedas complementarias en internet.</p>

  <h2>1. Material del curso (fuente principal)</h2>
  <h4>Presentaciones de clases — <code class="inl">classes/</code></h4>
  <table class="tbl">
    <tr><th>Archivo</th><th>Contenido</th><th>Módulos</th></tr>
    <tr><td>1. Correlación.pptx <span class="chip plain">50 diap.</span></td>
      <td>Covarianza, correlación, matrices Σ y R, Bartlett, normal multivariada, escalamiento, distancias y similitud</td>
      <td>M1, M2, M3</td></tr>
    <tr><td>2. Pruebas de Hipótesis.pptx <span class="chip plain">57 diap.</span></td>
      <td>Lógica de las pruebas, media (t/z), proporciones, varianza (χ²), dos poblaciones (F, pooled, Welch, pareadas), errores I/II, T² de Hotelling</td>
      <td>M4, M5, M6, M7, M8</td></tr>
    <tr><td>3. Análisis de Componentes Principales.pptx <span class="chip plain">26 diap.</span></td>
      <td>Teoría del ACP, ejemplo numérico, criterios de selección, ACP en R con mtcars</td>
      <td>M9, M10</td></tr>
    <tr><td>4.2 Análisis Factorial (clase 2).pptx <span class="chip plain">diap. 28–45</span></td>
      <td>Nº de factores, interpretación, rotaciones, ejemplo con USArrests</td>
      <td>M11, M12</td></tr>
    <tr><td>Ayudantía 1, 2 y 3 — Enunciados (PDF)</td>
      <td>Ejercicios de matrices, correlación, Bartlett, pruebas de hipótesis, ACP de clientes de retail, V/F de ACP</td>
      <td>Todos</td></tr>
  </table>

  <h4>Pautas de pruebas pasadas — <code class="inl">past-tests/</code></h4>
  <table class="tbl">
    <tr><th>Archivo</th><th>Contenido usado</th></tr>
    <tr><td>Pauta Pregunta 1 - Prueba 1</td><td>6 afirmaciones V/F con justificación oficial (matrices, independencia, error tipo II, min-máx, α y n)</td></tr>
    <tr><td>Pauta Pregunta 2 - Prueba 1</td><td>Prueba χ² para la varianza y t pooled resueltas paso a paso, con rúbrica de puntaje</td></tr>
    <tr><td>Pauta Pregunta 3 - Prueba 1</td><td>Dispersión, escalamiento robusto, correlación y su test, hipótesis disyuntivas, valores límite de x̄ y expresión de β</td></tr>
    <tr><td>PAUTA P1 y P2 PRUEBA 2</td><td>Transformación inversa de la normalización min-máx (usada en M2)</td></tr>
    <tr><td>Ejercicios preparación - Prueba 1 (partes 1 y 2)</td><td>14 problemas de pruebas de hipótesis, valores límite, potencia y matrices de covarianza; referencias a Walpole, Myers &amp; Myers (2012), 9ª ed., ejercicios 10.35–10.78</td></tr>
  </table>

  <h4>Scripts de R — <code class="inl">r-codes-for-study/</code></h4>
  <table class="tbl">
    <tr><th>Archivo</th><th>Contenido</th></tr>
    <tr><td>2. Pruebas de Hipótesis. Ejemplos R(1).R</td><td>t, z, proporciones, χ², F, Welch/pooled/pareadas y T² de Hotelling con datos «cork»</td></tr>
    <tr><td>3. Análisis de Componentes Principales. Ejemplos R.R</td><td>prcomp, summary, screeplot, rotation, biplot con mtcars</td></tr>
    <tr><td>4.1 Análisis Factorial (clase 1). Ejemplos R.R</td><td>Test KMO y sus umbrales de interpretación</td></tr>
    <tr><td>4.2 Análisis Factorial (clase 2). Ejemplos R.R</td><td>Flujo completo con USArrests: KMO, Bartlett, fa.parallel, Varimax, Promax</td></tr>
    <tr><td>Ayudantia 1 2026-20 Pauta.R</td><td>Introducción a R, gráficos, matrices de correlación, Bartlett manual, estandarización</td></tr>
    <tr><td>Ayudantia 3 2026-20 Pauta R.R</td><td>ACP y AF de notas con interpretación comentada línea por línea; AF de la encuesta de restaurantes; prueba pareada con D₀ = 2</td></tr>
  </table>

  <h2>2. Bibliografía citada dentro del material</h2>
  <ul class="tight">
    <li><b>Mardia, K. V., Kent, J. T. &amp; Bibby, J. M. (1979).</b> <i>Multivariate Analysis</i>. Citado en las láminas de T² de Hotelling: §5.1, §5.2.1b, §5.3.1, §5.5.1, §5.7, Tabla 1.4.1 (datos «cork» de Rao, 1948).</li>
    <li><b>Walpole, R. E., Myers, R. H. &amp; Myers, S. L. (2012).</b> <i>Probabilidad y estadística para ingenieros</i>, 9ª ed., Pearson. Ejercicios propuestos para la prueba.</li>
    <li><b>Thurstone, L. L. (1935).</b> Principio de Estructura Simple, citado en la lámina de rotación factorial.</li>
    <li><b>Zimmerman, D. W. (2004).</b> Citado como fundamento de la recomendación de usar Welch por defecto.</li>
    <li><b>Manual de R, F. Hernández.</b> Citado en las láminas de T² de Hotelling y regiones de confianza.</li>
  </ul>

  <h2>3. Búsquedas complementarias en internet</h2>
  <p class="small muted">Usadas solo para <b>completar vacíos</b> (sobre todo el módulo 13, comparativa ACP vs AF) y para dar contexto adicional sobre R. Están marcadas como tales dentro de los módulos.</p>
  <ul class="tight">
    <li><a href="https://www.uv.es/ceaces/multivari/factorial/versus.htm" target="_blank" rel="noopener">Universitat de València — «Análisis Factorial vs Componentes Principales»</a></li>
    <li><a href="https://support.minitab.com/es-mx/minitab/help-and-how-to/statistical-modeling/multivariate/supporting-topics/principal-components-and-factor-analysis/differences-between-pca-and-factor-analysis/" target="_blank" rel="noopener">Minitab — «Diferencias entre ACP y análisis factorial»</a></li>
    <li><a href="https://en.wikipedia.org/wiki/Kaiser%E2%80%93Meyer%E2%80%93Olkin_test" target="_blank" rel="noopener">Kaiser–Meyer–Olkin test</a> — escala de interpretación del KMO (marvelous / meritorious / middling / mediocre / miserable / unacceptable)</li>
    <li><a href="https://m-clark.github.io/posts/2020-04-10-psych-explained/" target="_blank" rel="noopener">Michael Clark — «Factor Analysis with the psych package»</a> — significado de h2, u2, com, SS loadings</li>
    <li><a href="https://www.sthda.com/english/articles/31-principal-component-methods-in-r-practical-guide/118-principal-component-analysis-in-r-prcomp-vs-princomp/" target="_blank" rel="noopener">STHDA — «PCA in R: prcomp vs princomp»</a></li>
  </ul>

  <div class="card" style="border-color:var(--amber)">
    <h2 style="margin-top:0;border:0;padding:0">⚠️ Información que puede haber cambiado o ser incierta</h2>

    <h4>1. Las lecturas de ACP y análisis factorial NO estaban en los archivos</h4>
    <p>El temario indica que la pregunta 2 se basa en «lecturas correspondientes entregadas por el profesor (lecturas de ACP y análisis factorial)». <b>Esos PDF no están en ninguno de los tres directorios entregados.</b> El <a href="#/aprender/m13">módulo 13</a> reconstruye la comparación ACP vs AF a partir de los PPT del curso más bibliografía estándar buscada en internet. <b>Si tienes las lecturas del profesor, esas mandan sobre ese módulo</b> — revísalas para confirmar terminología, énfasis y cualquier dato numérico.</p>

    <h4>2. Falta la primera parte del Análisis Factorial</h4>
    <p>El archivo <code class="inl">4.2 Análisis Factorial (clase 2).pptx</code> contiene <b>solo las diapositivas 1 y 28–45</b> (verificado abriendo el paquete: las diapositivas 2–27 no existen en el archivo). Tampoco está el PPT de la <b>clase 4.1</b>, del que solo existe el script de R (que cubre únicamente el test KMO). Por eso el modelo factorial formal (X = ΛF + e) y la extracción se reconstruyeron desde el script, las pautas de ayudantía y bibliografía complementaria. <b>Posible vacío: notación exacta del profesor para el modelo factorial y ejemplos de la clase 4.1.</b></p>

    <h4>3. Umbrales de KMO: dos criterios distintos dentro del propio curso</h4>
    <p>El script <code class="inl">4.1</code> dice «≥ 0.75 bien | ≥ 0.50 aceptable | &lt; 0.50 inaceptable». El PPT 4.2 y la pauta de la Ayudantía 3 usan «<b>Overall MSA &gt; 0.6</b> para que sea aceptable». No es contradictorio en la práctica, pero si la prueba pide un umbral exacto, <b>usa 0.6</b> (es el más reciente y el que aparece en la pauta de ayudantía).</p>

    <h4>4. Discrepancia menor en el MSA de UrbanPop</h4>
    <p>El texto de la diapositiva 41 del PPT 4.2 dice «UrbanPop muestra adecuación baja (MSA = <b>0.49</b>)», pero la <b>salida de consola</b> incluida en esa misma diapositiva muestra <b>MSA = 0.50</b>. Esta plataforma usa el valor de la salida (0.50) por ser el dato primario. La conclusión no cambia: en ambos casos UrbanPop está en el límite de lo aceptable.</p>

    <h4>5. Diapositivas ausentes en el PPT de hipótesis</h4>
    <p>Verificado: al PPT «2. Pruebas de Hipótesis» le faltan las diapositivas <b>23–24, 28–29, 31–32 y 34–35</b> (no están en el archivo). Los desarrollos correspondientes se recuperaron de las láminas de resolución (54–57), que sí están completas, y de las tablas resumen.</p>

    <h4>6. Gran parte del contenido matemático estaba en imágenes</h4>
    <p>Los cuatro PPT contienen <b>85 imágenes</b> con fórmulas, enunciados y salidas de consola que no son texto extraíble. Se revisaron una a una y de ahí provienen, entre otros: los dos métodos de escalamiento adicionales (<b>cuantiles y Softmax</b>), la tabla de <b>diferencia de proporciones</b>, el ejemplo completo de <b>β con la máquina de 200 ml</b>, la segunda definición del p-valor, y las salidas reales de <code class="inl">summary(pca)</code> de mtcars, <code class="inl">KMO</code>, <code class="inl">cortest.bartlett</code> y <code class="inl">fa()</code> de USArrests. Lo mismo con los <b>anexos de la Pauta Pregunta 3</b>, que también eran imágenes dentro del PDF.</p>

    <h4>7. Contenidos del curso posteriores a esta prueba</h4>
    <p>Los PPT anuncian también clustering, análisis discriminante, árboles y diseño de experimentos, y la «PAUTA P1 y P2 PRUEBA 2» los cubre. <b>Están fuera del temario de esta prueba</b> y no se incluyen aquí, salvo el ejercicio de normalización inversa que sí es materia del capítulo 1.</p>

    <h4>8. Valores críticos</h4>
    <p>Los valores críticos listados en <a href="#/memoria">Memorizar</a> son los que aparecen textualmente en los PPT y pautas. <b>Verifica siempre contra la tabla o el R que te den en la prueba</b>: dependen del α y de los gl exactos del enunciado.</p>
  </div>

  <div class="note info"><span class="nh">📌 Sobre las preguntas del banco</span>
  <p>Cada una de las ${window.QUESTIONS.length} preguntas indica su fuente al corregirse. No se incluyó ninguna pregunta cuya respuesta no pudiera respaldarse en el material del curso o en una fuente identificable.</p></div>
  `;
}

/* ═══════════════════════════ ROUTER ═══════════════════════════ */
function route(){
  const h = (location.hash || '#/inicio').replace(/^#\/?/, '');
  return h.split('/').filter(Boolean);
}

function render(){
  const r = route();
  const app = $('#app');
  let html = '';

  switch(r[0]){
    case undefined:
    case 'inicio':    html = viewInicio(); break;
    case 'aprender':  html = r[1] ? viewModulo(r[1]) : viewAprender(); break;
    case 'memoria':   html = viewMemoria(); break;
    case 'flash':     html = viewFlash(); break;
    case 'rlab':      html = viewRlab(r[1]); break;
    case 'practicar':
      if(r[1] === 'run') html = viewPracticarRun();
      else if(r[1]){ if(!PR || PR.mid !== r[1]){ const m = modById(r[1]); if(m){ startPractice('module', r[1]); return; } } html = viewPracticarIndex(); }
      else html = viewPracticarIndex();
      break;
    case 'examen':
      if(r[1] === 'run') html = viewExamenRun();
      else if(r[1] && MODES[r[1]]){ startExam(r[1]); return; }
      else html = viewExamenIndex();
      break;
    case 'progreso':  html = viewProgreso(); break;
    case 'fuentes':   html = viewFuentes(); break;
    default:          html = viewInicio();
  }

  app.innerHTML = html;
  highlightR(app);
  renderTex(app);

  // nav activa
  const sec = r[0] || 'inicio';
  const alias = {flash:'memoria'};
  $$('.mainnav a').forEach(a => a.classList.toggle('on', a.dataset.nav === (alias[sec] || sec)));
  $('#mainnav').classList.remove('open');
}

window.addEventListener('hashchange', () => { render(); window.scrollTo(0,0); });
window.addEventListener('DOMContentLoaded', () => {
  $('#menuToggle').addEventListener('click', () => $('#mainnav').classList.toggle('open'));
  render();
});

/* Navegación con teclado en práctica y examen */
document.addEventListener('keydown', e => {
  if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  const r = route();
  if(r[0] === 'practicar' && r[1] === 'run' && PR){
    if(e.key === 'ArrowRight' && PR.checked && PR.i < PR.pool.length-1){ prNav(1); }
    if(e.key === 'ArrowLeft'  && PR.i > 0){ prNav(-1); }
    if(e.key === 'Enter' && !PR.checked && PR.sel !== null){ prCheck(); }
    const n = parseInt(e.key, 10);
    if(n >= 1 && n <= PR.pool[PR.i].q.o.length && !PR.checked){ prSelect(n-1); }
  }
  if(r[0] === 'examen' && r[1] === 'run' && EX && !EX.done){
    if(e.key === 'ArrowRight') exNav(1);
    if(e.key === 'ArrowLeft')  exNav(-1);
    const n = parseInt(e.key, 10);
    if(n >= 1 && n <= EX.items[EX.i].q.o.length) exSelect(n-1);
  }
  if(r[0] === 'flash'){
    if(e.key === ' ' || e.key === 'Enter'){ e.preventDefault(); FC.shown ? fcNav(1) : fcShow(); }
    if(e.key === 'ArrowRight') fcNav(1);
    if(e.key === 'ArrowLeft')  fcNav(-1);
  }
});
