/* Generadores de desarrollo · M11–M14 (P2: conglomerados) */
"use strict";
const L = require("./lib");
const { Rn, Rv, Rtxt, rd, N, M, suma, media, desv, euclid, manhattan, afirmar, tabla, incisos, p, rvec, rmat, vjs, vr, agregar } = L;

const pto = (v) => (v.length === 1 ? N(v[0]) : "(" + v.map((x) => N(x)).join(";\\ ") + ")");
const triangular = (et, D, d) => tabla(["", ...et.slice(0, -1)], et.slice(1).map((e, i) => [`<strong>${e}</strong>`, ...et.slice(0, -1).map((_, j) => (j <= i ? M(D[i + 1][j], d) : ""))]));
const rdist = (D) => `as.dist(${rmat(D)})`;

/* ══ M11 · Distancias para clustering ══════════════════════════════════ */
function minkowski(o) {
  const { pts, vars } = o, et = Object.keys(pts), pares = [[0, 1], [0, 2], [1, 2]];
  const cheb = (a, b) => Math.max(...a.map((v, i) => Math.abs(v - b[i])));
  const d = pares.map(([i, j]) => ({ n: `${et[i]}–${et[j]}`, a: pts[et[i]], b: pts[et[j]], m: manhattan(pts[et[i]], pts[et[j]]), e: euclid(pts[et[i]], pts[et[j]]), c: cheb(pts[et[i]], pts[et[j]]) }));
  const cerca = (k) => d.slice().sort((x, y) => x[k] - y[k])[0].n;
  const d0 = d[0], difs = d0.a.map((v, i) => Math.abs(v - d0.b[i]));
  agregar("m11", {
    concepto: "m11-c02", dificultad: 2, titulo: o.titulo,
    enunciado: p(o.intro) + tabla(["", ...vars], et.map((e) => [e, ...pts[e].map((v) => M(v))])) +
      incisos(["Escribe la distancia de Minkowski e indica qué distancia resulta con $\\lambda=1$, $2$ e $\\infty$.", `Calcula las tres distancias entre ${et[0]} y ${et[1]}.`, "Completa las distancias para los otros pares. ¿Qué par se uniría primero en un clustering según cada distancia?"]),
    partes: [
      { titulo: "a) Familia de Minkowski", puntos: 1.5,
        solucion: p(String.raw`$d(i,j)=\left[\sum_p|x_{ip}-x_{jp}|^{\lambda}\right]^{1/\lambda}$. Con $\lambda=1$: <strong>Manhattan</strong> (suma de diferencias absolutas); $\lambda=2$: <strong>euclídea</strong>; $\lambda=\infty$: <strong>Chebyshev</strong> (la mayor diferencia absoluta).`) },
      { titulo: `b) Las tres distancias entre ${et[0]} y ${et[1]}`, puntos: 2.5,
        solucion: p(`Diferencias absolutas por variable: ${difs.map((v) => M(v)).join("; ")}.`, String.raw`Manhattan: $${difs.map((v) => N(v)).join("+")}=${N(d0.m)}$.`,
          String.raw`Euclídea: $\sqrt{${difs.map((v) => N(v) + "^2").join("+")}}=\sqrt{${N(d0.e ** 2)}}=${N(d0.e, 3)}$.`, String.raw`Chebyshev: $\max(${difs.map((v) => N(v)).join(";\ ")})=${N(d0.c)}$.`, "Siempre Chebyshev $\\le$ euclídea $\\le$ Manhattan.") },
      { titulo: "c) Resto de los pares y primera fusión", puntos: 2,
        solucion: tabla(["Par", "Manhattan", "Euclídea", "Chebyshev"], d.map((x) => [x.n, M(x.m), M(x.e, 3), M(x.c)])) +
          p(`Se une primero el par de menor distancia: Manhattan ⇒ ${cerca("m")}; euclídea ⇒ ${cerca("e")}; Chebyshev ⇒ ${cerca("c")}.${new Set([cerca("m"), cerca("e"), cerca("c")]).size > 1 ? " <strong>La elección de la distancia cambia el resultado.</strong>" : " Aquí las tres coinciden."}`, "En R: <code>dist(datos, method = \"manhattan\" | \"euclidean\" | \"maximum\")</code>.") }
    ],
    verifica: d.flatMap((x) => [vr(`euclídea ${x.n}`, `dist(rbind(${rvec(x.a)}, ${rvec(x.b)}))`, x.e, 3), vr(`Chebyshev ${x.n}`, `dist(rbind(${rvec(x.a)}, ${rvec(x.b)}), "maximum")`, x.c, 4), vr(`Manhattan ${x.n}`, `dist(rbind(${rvec(x.a)}, ${rvec(x.b)}), "manhattan")`, x.m, 4)]),
    fuente: [{ id: "C5.1", loc: "slides 6–9" }]
  });
}
function binarias(o) {
  const { objs, attrs } = o, et = Object.keys(objs), pares = [[0, 1], [0, 2], [1, 2]];
  const r = pares.map(([i, j]) => {
    const x = objs[et[i]], y = objs[et[j]]; let a = 0, b = 0, c = 0, d = 0;
    x.forEach((v, k) => { if (v && y[k]) a++; else if (v && !y[k]) b++; else if (!v && y[k]) c++; else d++; });
    return { n: `${et[i]}–${et[j]}`, x, y, a, b, c, d, J: (b + c) / (a + b + c), SM: (b + c) / (a + b + c + d), H: b + c };
  });
  const r0 = r[0], mJ = r.slice().sort((x, y) => x.J - y.J)[0], mS = r.slice().sort((x, y) => x.SM - y.SM)[0];
  agregar("m11", {
    concepto: "m11-c03", dificultad: 2, titulo: o.titulo,
    enunciado: p(o.intro) + tabla(["", ...attrs], et.map((e) => [e, ...objs[e].map((v) => M(v))])) +
      incisos([`Para ${et[0]} y ${et[1]}, cuenta $a$, $b$, $c$ y $d$.`, `Calcula las distancias de Jaccard, Simple Matching y Hamming entre ${et[0]} y ${et[1]}.`, "Calcula Jaccard y Simple Matching para los otros pares. ¿Cuándo conviene Jaccard?"]),
    partes: [
      { titulo: "a) Conteos a, b, c y d", puntos: 1.5,
        solucion: p(String.raw`$a$ = ambos 1 (presencia conjunta) $=${r0.a}$; $b$ = 1 en ${et[0]} y 0 en ${et[1]} $=${r0.b}$; $c$ = 0 en ${et[0]} y 1 en ${et[1]} $=${r0.c}$; $d$ = ambos 0 (doble ausencia) $=${r0.d}$.`, `Comprobación: $a+b+c+d=${attrs.length}$ atributos.`) },
      { titulo: "b) Jaccard, Simple Matching y Hamming", puntos: 2.5,
        solucion: p(String.raw`Jaccard $=\dfrac{b+c}{a+b+c}=\dfrac{${r0.b + r0.c}}{${r0.a + r0.b + r0.c}}=${N(r0.J, 3)}$ (ignora la doble ausencia $d$).`,
          String.raw`Simple Matching $=\dfrac{b+c}{a+b+c+d}=\dfrac{${r0.b + r0.c}}{${attrs.length}}=${N(r0.SM, 3)}$.`, String.raw`Hamming $=b+c=${r0.H}$ (número de atributos en que difieren; igual a Manhattan con datos 0/1).`) },
      { titulo: "c) Otros pares y cuándo usar Jaccard", puntos: 2,
        solucion: tabla(["Par", "$a$", "$b$", "$c$", "$d$", "Jaccard", "Simple Matching"], r.map((x) => [x.n, x.a, x.b, x.c, x.d, M(x.J, 3), M(x.SM, 3)])) +
          p(`Par más parecido: ${mJ.n} según Jaccard y ${mS.n} según Simple Matching.`, "Jaccard conviene cuando la doble ausencia <strong>no</strong> indica parecido (atributos poco frecuentes: que dos clientes no compren un producto no los hace similares). En R: <code>dist(datos, method = \"binary\")</code> entrega la distancia de Jaccard.") }
    ],
    verifica: r.map((x) => vr(`Jaccard ${x.n}`, `dist(rbind(${rvec(x.x)}, ${rvec(x.y)}), "binary")`, x.J, 3)).concat(r.map((x) => vjs(`SM ${x.n}`, `(${x.b}+${x.c})/${attrs.length}`, x.SM, 3))),
    fuente: [{ id: "C5.1", loc: "slides 10–11" }, { id: "AY5-E", loc: "P3" }]
  });
}
function distCor(o) {
  const { objs, vars } = o, et = Object.keys(objs), [A, B, C] = et.map((e) => objs[e]);
  const cor = (x, y) => { const mx = media(x), my = media(y); return suma(x.map((v, i) => (v - mx) * (y[i] - my))) / Math.sqrt(suma(x.map((v) => (v - mx) ** 2)) * suma(y.map((v) => (v - my) ** 2))); };
  const rAB = cor(A, B), rAC = cor(A, C), eAB = euclid(A, B), eAC = euclid(A, C);
  const det = (x, y) => { const mx = media(x), my = media(y); return String.raw`$\dfrac{${N(suma(x.map((v, i) => (v - mx) * (y[i] - my))), 3)}}{\sqrt{${N(suma(x.map((v) => (v - mx) ** 2)), 3)}\cdot${N(suma(y.map((v) => (v - my) ** 2)), 3)}}}$`; };
  afirmar((1 - rAB < 1 - rAC) !== (eAB < eAC), "se busca un caso donde las dos distancias discrepen");
  agregar("m11", {
    concepto: "m11-c02", dificultad: 3, titulo: o.titulo,
    enunciado: p(o.intro) + tabla(["", ...vars], et.map((e) => [e, ...objs[e].map((v) => M(v))])) +
      incisos([`Calcula la correlación entre los perfiles de ${et[0]} y ${et[1]}, y entre ${et[0]} y ${et[2]}.`, "Calcula las distancias basadas en correlación $d=1-r$.", `Calcula las distancias euclídeas. ¿A quién se parece más ${et[0]} según cada criterio y por qué difieren?`]),
    partes: [
      { titulo: "a) Correlaciones entre perfiles", puntos: 2.5,
        solucion: p(`Medias de los perfiles: ${et.map((e) => `${e} $=${N(media(objs[e]), 3)}$`).join("; ")}.`, String.raw`$r=\dfrac{\sum(x_i-\bar x)(y_i-\bar y)}{\sqrt{\sum(x_i-\bar x)^2\sum(y_i-\bar y)^2}}$ (se correlacionan <strong>filas</strong>, no columnas).`,
          `$r_{${et[0]}${et[1]}}=$ ${det(A, B)} $=${N(rAB, 3)}$`, `$r_{${et[0]}${et[2]}}=$ ${det(A, C)} $=${N(rAC, 3)}$`) },
      { titulo: "b) Distancias por correlación", puntos: 1.5,
        solucion: p(String.raw`$d=1-r\in[0,2]$: $d(${et[0]},${et[1]})=1-(${N(rAB, 3)})=${N(1 - rAB, 3)}$ y $d(${et[0]},${et[2]})=1-(${N(rAC, 3)})=${N(1 - rAC, 3)}$.`, "$0$ = perfiles con correlación $+1$; $1$ = sin correlación; $2$ = correlación $-1$. En R: <code>as.dist(1 - cor(t(datos)))</code>.") },
      { titulo: "c) Distancias euclídeas y comparación", puntos: 2,
        solucion: p(String.raw`$d_E(${et[0]},${et[1]})=${N(eAB, 3)}$ y $d_E(${et[0]},${et[2]})=${N(eAC, 3)}$.`,
          `Por correlación, ${et[0]} se parece más a ${1 - rAB < 1 - rAC ? et[1] : et[2]} (mismo <strong>patrón</strong> de subidas y bajadas, aunque a otro nivel); por distancia euclídea, a ${eAB < eAC ? et[1] : et[2]} (valores de <strong>magnitud</strong> parecida).`,
          "La distancia por correlación agrupa por forma del perfil e ignora el nivel; la euclídea agrupa por cercanía en magnitud. Se elige según lo que interese al negocio.") }
    ],
    verifica: [vr(`r ${et[0]}${et[1]}`, `cor(${rvec(A)}, ${rvec(B)})`, rAB, 3), vr(`r ${et[0]}${et[2]}`, `cor(${rvec(A)}, ${rvec(C)})`, rAC, 3), vjs(`euclídea ${et[0]}${et[1]}`, `dist(${JSON.stringify(A)}, ${JSON.stringify(B)})`, eAB, 3), vjs(`euclídea ${et[0]}${et[2]}`, `dist(${JSON.stringify(A)}, ${JSON.stringify(C)})`, eAC, 3)],
    fuente: [{ id: "C5.1", loc: "slides 6–9" }]
  });
}
function estandarizarDist(o) {
  const { objs, vars } = o, et = Object.keys(objs), pares = [];
  for (let i = 0; i < et.length; i++) for (let j = i + 1; j < et.length; j++) pares.push([i, j]);
  const col = (j) => et.map((e) => objs[e][j]), m = [0, 1].map((j) => media(col(j))), s = [0, 1].map((j) => desv(col(j)));
  const z = {}; et.forEach((e) => { z[e] = objs[e].map((v, j) => (v - m[j]) / s[j]); });
  const d0 = pares.map(([i, j]) => euclid(objs[et[i]], objs[et[j]])), d1 = pares.map(([i, j]) => euclid(z[et[i]], z[et[j]]));
  const nom = (k) => `${et[pares[k][0]]}–${et[pares[k][1]]}`, c0 = d0.indexOf(Math.min(...d0)), c1 = d1.indexOf(Math.min(...d1));
  afirmar(c0 !== c1, "se busca un caso donde estandarizar cambie el par más cercano");
  agregar("m11", {
    concepto: "m11-c04", dificultad: 2, titulo: o.titulo,
    enunciado: p(o.intro) + tabla(["", ...vars], et.map((e) => [e, ...objs[e].map((v) => M(v))])) +
      incisos(["Calcula las distancias euclídeas con los datos originales. ¿Qué par se uniría primero?", "Estandariza cada variable con z-score.", "Recalcula las distancias con los datos estandarizados y comenta."]),
    partes: [
      { titulo: "a) Distancias sin estandarizar", puntos: 1.5,
        solucion: p(...pares.map(([i, j], k) => String.raw`$d(${et[i]},${et[j]})=\sqrt{(${N(objs[et[i]][0] - objs[et[j]][0])})^2+(${N(objs[et[i]][1] - objs[et[j]][1])})^2}=${N(d0[k], 3)}$`), `Se uniría primero ${nom(c0)}. La distancia queda dominada por «${vars[0]}», la variable de mayor escala.`) },
      { titulo: "b) Estandarización z-score", puntos: 2.5,
        solucion: p(String.raw`${vars[0]}: $\bar x=${N(m[0], 3)}$, $s=${N(s[0], 3)}$. ${vars[1]}: $\bar x=${N(m[1], 3)}$, $s=${N(s[1], 3)}$ (con $n-1$, como <code>scale()</code>).`) + tabla(["", ...vars.map((v) => "z " + v)], et.map((e) => [e, ...z[e].map((v) => M(v, 3))])) },
      { titulo: "c) Distancias estandarizadas y comentario", puntos: 2,
        solucion: p(...pares.map(([i, j], k) => String.raw`$d_z(${et[i]},${et[j]})=${N(d1[k], 3)}$`), `Ahora el par más cercano es ${nom(c1)}, no ${nom(c0)}: al estandarizar, las dos variables pesan lo mismo.`, "Regla: con unidades distintas se estandariza antes de calcular distancias; si no, la variable de mayor varianza decide los clústeres.") }
    ],
    verifica: pares.map(([i, j], k) => vr(`distancia estandarizada ${nom(k)}`, `as.matrix(dist(scale(cbind(${rvec(col(0))}, ${rvec(col(1))}))))[${i + 1}, ${j + 1}]`, d1[k], 3)).concat(pares.map(([i, j], k) => vjs(`distancia original ${nom(k)}`, `dist(${JSON.stringify(objs[et[i]])}, ${JSON.stringify(objs[et[j]])})`, d0[k], 3))),
    fuente: [{ id: "C5.1", loc: "slides 13–17" }]
  });
}
function m11() {
  minkowski({ titulo: "Minkowski: Manhattan, euclídea y Chebyshev entre tres tiendas", intro: "Tres tiendas evaluadas en cuatro indicadores (escala 1–10):", vars: ["Ventas", "Margen", "Servicio", "Rotación"], pts: { T1: [7, 3, 8, 5], T2: [4, 6, 6, 9], T3: [8, 8, 7, 6] } });
  minkowski({ titulo: "Minkowski con tres clientes: ¿cambia la primera fusión?", intro: "Tres clientes con tres variables ya estandarizadas a una escala común:", vars: ["Frecuencia", "Monto", "Antigüedad"], pts: { C1: [0, 0, 0], C2: [4, 1, 0], C3: [3, 3, 2] } });
  binarias({ titulo: "Distancias binarias entre tres clientes (Jaccard y Simple Matching)", intro: "Tres clientes y los productos que tienen contratados (1 = sí, 0 = no):", attrs: ["Cuenta", "Tarjeta", "Seguro", "Crédito", "Inversión", "Hipotecario"], objs: { Ana: [1, 1, 0, 1, 0, 0], Luis: [1, 0, 0, 1, 1, 0], Eva: [1, 1, 1, 0, 0, 0] } });
  binarias({ titulo: "Jaccard vs. Simple Matching con muchos ceros", intro: "Tres canastas de compra y si incluyen cada producto (1 = sí):", attrs: ["Pan", "Leche", "Vino", "Queso", "Café", "Té", "Arroz", "Atún"], objs: { K1: [1, 1, 0, 0, 0, 0, 0, 0], K2: [1, 0, 1, 0, 0, 0, 0, 0], K3: [1, 1, 0, 1, 1, 0, 0, 0] } });
  distCor({ titulo: "Distancia por correlación vs. euclídea (perfiles de venta)", intro: "Ventas trimestrales (millones) de tres productos:", vars: ["T1", "T2", "T3", "T4"], objs: { A: [2, 4, 3, 5], B: [12, 14, 13, 15], C: [3, 3, 4, 3] } });
  distCor({ titulo: "¿Mismo patrón o misma magnitud? (consumo por franja)", intro: "Consumo eléctrico promedio de tres hogares en cuatro franjas horarias:", vars: ["Mañana", "Tarde", "Noche", "Madrugada"], objs: { H1: [5, 8, 12, 3], H2: [10, 16, 25, 7], H3: [7, 6, 9, 6] } });
  estandarizarDist({ titulo: "El efecto de estandarizar antes de calcular distancias", intro: "Cuatro clientes con ingreso mensual (miles de pesos) y número de productos:", vars: ["Ingreso", "Productos"], objs: { A: [800, 1], B: [830, 6], C: [900, 2], D: [1200, 5] } });
  estandarizarDist({ titulo: "Estandarizar cambia quién es vecino de quién", intro: "Cuatro sucursales con ventas anuales (millones) y nota de servicio (1–7):", vars: ["Ventas", "Nota"], objs: { S1: [1200, 6.5], S2: [1230, 3], S3: [1320, 6], S4: [1800, 4] } });
}

/* ══ M12 · Jerárquico aglomerativo a mano ══════════════════════════════ */
const NOMBRE_METODO = { single: "single linkage (vecino más cercano)", complete: "complete linkage (vecino más lejano)", average: "average linkage (promedio)" };
function jerarquico(o) {
  const { et, metodo, k } = o, n = et.length;
  const metrica = o.metrica === "euclidea" ? euclid : manhattan;
  const D = o.D || et.map((_, i) => et.map((_, j) => metrica(o.puntos[i], o.puntos[j])));
  const dec = o.D ? 2 : o.metrica === "euclidea" ? 3 : 2;
  const pares = (A, B) => A.flatMap((i) => B.map((j) => D[i][j]));
  const dc = (A, B) => { const v = pares(A, B); return metodo === "single" ? Math.min(...v) : metodo === "complete" ? Math.max(...v) : media(v); };
  const nom = (c) => (c.length > 1 ? "{" + c.map((i) => et[i]).join(", ") + "}" : et[c[0]]);
  const nomM = (c) => (c.length > 1 ? "\\{" + c.map((i) => et[i]).join(",") + "\\}" : et[c[0]]);
  const calc = (A, B) => { const v = pares(A, B).map((x) => N(x, dec)); return v.length === 1 ? "" : metodo === "average" ? String.raw`\dfrac{${v.join("+")}}{${v.length}}=` : `\\${metodo === "single" ? "min" : "max"}(${v.join(";\\ ")})=`; };
  let cl = et.map((_, i) => [i]); const pasos = [];
  while (cl.length > 1) {
    const cand = [];
    for (let i = 0; i < cl.length; i++) for (let j = i + 1; j < cl.length; j++) cand.push({ i, j, d: dc(cl[i], cl[j]) });
    cand.sort((a, b) => a.d - b.d);
    afirmar(cand.length === 1 || cand[1].d - cand[0].d > 1e-9, `${o.titulo}: empate en la fusión ${pasos.length + 1}`);
    const { i, j, d } = cand[0], nuevo = cl[i].concat(cl[j]).sort((a, b) => a - b);
    pasos.push({ antes: cl, a: cl[i], b: cl[j], d, nuevo });
    cl = cl.filter((_, q) => q !== i && q !== j).concat([nuevo]);
  }
  /* Texto de la fusión s (s ≥ 1): distancias del clúster recién formado a los demás. */
  const explica = (s) => {
    const previo = pasos[s - 1].nuevo, estado = pasos[s].antes, otros = estado.filter((c) => c !== previo);
    const lineas = otros.map((c) => String.raw`$d(${nomM(c)},${nomM(previo)})=${calc(c, previo)}${N(dc(c, previo), dec)}$`);
    const resto = []; for (let i = 0; i < otros.length; i++) for (let j = i + 1; j < otros.length; j++) resto.push(String.raw`$d(${nomM(otros[i])},${nomM(otros[j])})=${N(dc(otros[i], otros[j]), dec)}$`);
    return p(`Distancias al clúster recién formado ${nom(previo)}: ` + lineas.join("; ") + ".", resto.length ? "Las demás no cambian: " + resto.join("; ") + "." : "",
      `La menor es $${N(pasos[s].d, dec)}$ ⇒ se unen <strong>${nom(pasos[s].a)}</strong> y <strong>${nom(pasos[s].b)}</strong> a altura $${N(pasos[s].d, dec)}$.`);
  };
  const regla = { single: "la <strong>mínima</strong> distancia entre un elemento de cada clúster", complete: "la <strong>máxima</strong> distancia entre un elemento de cada clúster", average: "el <strong>promedio</strong> de todas las distancias entre pares (uno de cada clúster)" }[metodo];
  const corte = pasos[n - k].antes, hInf = pasos[n - k - 1].d, hSup = pasos[n - k].d;
  const datosTxt = o.D ? p(`${o.intro} La matriz de distancias entre ${n} objetos es:`) + triangular(et, D, 2) : p(`${o.intro} ${et.map((e, i) => `${e}$${pto(o.puntos[i])}$`).join(", ")}. Usa distancia ${o.metrica === "euclidea" ? "euclídea" : "Manhattan"}.`);
  agregar("m12", {
    concepto: { single: "m12-c02", complete: "m12-c03", average: "m12-c04" }[metodo], dificultad: 3, titulo: o.titulo,
    enunciado: datosTxt + p(`Aplica clustering jerárquico aglomerativo con <strong>${NOMBRE_METODO[metodo]}</strong>.`) +
      incisos([(o.D ? "Indica" : "Calcula la matriz de distancias e indica") + " la primera fusión.", "Actualiza las distancias y determina la segunda fusión.", "Completa las fusiones restantes.", `Indica las alturas del dendrograma y los grupos al cortar en ${k} clústeres.`]),
    partes: [
      { titulo: (o.D ? "a) Primera fusión" : "a) Matriz de distancias y primera fusión"), puntos: 1.5,
        solucion: (o.D ? "" : triangular(et, D, dec)) + p(`Cada objeto parte como un clúster. La menor distancia de la matriz es $d(${et[pasos[0].a[0]]},${et[pasos[0].b[0]]})=${N(pasos[0].d, dec)}$ ⇒ primera fusión: <strong>${nom(pasos[0].nuevo)}</strong> a altura $${N(pasos[0].d, dec)}$.`) },
      { titulo: "b) Distancias actualizadas y segunda fusión", puntos: 2, solucion: p(`Con ${metodo} linkage la distancia entre clústeres es ${regla}.`) + explica(1) },
      { titulo: "c) Fusiones restantes", puntos: 1.5, solucion: pasos.slice(2).map((_, q) => p(`<strong>Fusión ${q + 3}.</strong>`) + explica(q + 2)).join("") },
      { titulo: `d) Alturas del dendrograma y corte en ${k} clústeres`, puntos: 1,
        solucion: p(`Alturas de fusión: ${pasos.map((s) => M(s.d, dec)).join("; ")}.`, `Cortar en ${k} clústeres equivale a cortar el dendrograma entre las alturas $${N(hInf, dec)}$ y $${N(hSup, dec)}$: quedan ${corte.map((c) => "<strong>" + nom(c) + "</strong>").join(", ")}.`,
          `En R: <code>hc <- hclust(d, method = "${metodo}"); cutree(hc, k = ${k})</code>.` + (o.nota ? " " + o.nota : "")) }
    ],
    verifica: pasos.map((s, q) => vr(`altura ${q + 1} (hclust)`, `hclust(${o.D ? rdist(D) : `dist(rbind(${o.puntos.map(rvec).join(", ")}), "${o.metrica === "euclidea" ? "euclidean" : "manhattan"}")`}, "${metodo}")$height[${q + 1}]`, s.d, dec)),
    fuente: [{ id: "C5.1", loc: { single: "slides 21–25", complete: "slides 26–28", average: "slide 20" }[metodo] }, { id: "AY5-E", loc: "P1" }]
  });
}
const D1 = [[0, 2, 6, 10, 9], [2, 0, 5, 8, 7], [6, 5, 0, 4, 3], [10, 8, 4, 0, 11], [9, 7, 3, 11, 0]];
const D2 = [[0, 3, 7, 12, 10], [3, 0, 6, 11, 9], [7, 6, 0, 5, 8], [12, 11, 5, 0, 4], [10, 9, 8, 4, 0]];
function m12() {
  const et = ["A", "B", "C", "D", "E"];
  jerarquico({ titulo: "Jerárquico a mano con single linkage (matriz dada)", intro: "Se quiere agrupar cinco sucursales.", et, D: D1, metodo: "single", k: 2, nota: "Con single aparece el <strong>efecto cadena</strong>: los objetos se van enganchando de a uno." });
  jerarquico({ titulo: "La misma matriz con complete linkage", intro: "Se quiere agrupar cinco sucursales.", et, D: D1, metodo: "complete", k: 2, nota: "Compara con single sobre la misma matriz: el objeto D ya no se engancha temprano; complete forma grupos compactos." });
  jerarquico({ titulo: "La misma matriz con average linkage", intro: "Se quiere agrupar cinco sucursales.", et, D: D1, metodo: "average", k: 3 });
  jerarquico({ titulo: "Complete linkage con otra matriz de distancias", intro: "Cinco productos se comparan según su perfil de ventas.", et, D: D2, metodo: "complete", k: 2 });
  jerarquico({ titulo: "Average linkage a partir de coordenadas (Manhattan)", intro: "Cinco locales con coordenadas (X, Y):", et, puntos: [[1, 2], [2, 2], [5, 6], [6, 5], [9, 1]], metrica: "manhattan", metodo: "average", k: 3 });
  jerarquico({ titulo: "Single linkage a partir de coordenadas (Manhattan)", intro: "Cinco bodegas con coordenadas (X, Y):", et, puntos: [[0, 0], [1, 2], [4, 1], [5, 5], [10, 3]], metrica: "manhattan", metodo: "single", k: 2, nota: "Resultado típico de single: un clúster grande y un objeto aislado." });
  jerarquico({ titulo: "Complete linkage con distancia euclídea", intro: "Cinco clientes con dos variables estandarizadas:", et, puntos: [[0, 0], [3, 4], [1, 1], [7, 8], [8, 5]], metrica: "euclidea", metodo: "complete", k: 2 });
}

/* ══ M13 · K-medias, silueta y WSS ═════════════════════════════════════ */
function kmedias(o) {
  const { pts, et, init } = o, dim = pts[0].length;
  let cen = init.map((c) => c.slice()), asig = null; const iters = [];
  for (let t = 0; t < 8; t++) {
    const d = pts.map((x) => cen.map((c) => euclid(x, c)));
    d.forEach((f, i) => afirmar(Math.abs(f[0] - f[1]) > 1e-6, `${o.titulo}: empate en ${et[i]}`));
    const nueva = d.map((f) => (f[0] < f[1] ? 0 : 1));
    const cambio = !asig || nueva.some((v, i) => v !== asig[i]);
    const nc = [0, 1].map((g) => { const m = pts.filter((_, i) => nueva[i] === g); afirmar(m.length > 0, "clúster vacío"); return Array.from({ length: dim }, (_, j) => media(m.map((x) => x[j]))); });
    iters.push({ cen, d, asig: nueva, cambio, nc });
    if (!cambio) break;
    asig = nueva; cen = nc;
  }
  afirmar(!iters[iters.length - 1].cambio && iters.length >= 2 && iters.length <= 4, "no convergió en 2–4 iteraciones");
  const fin = iters[iters.length - 1], grupos = [0, 1].map((g) => et.filter((_, i) => fin.asig[i] === g));
  const wssG = [0, 1].map((g) => suma(pts.map((x, i) => (fin.asig[i] === g ? euclid(x, fin.cen[g]) ** 2 : 0)))), wss = suma(wssG);
  const tablaIter = (it) => tabla(["Punto", "$d(\\cdot,\\mu_1)$", "$d(\\cdot,\\mu_2)$", "Clúster"], pts.map((x, i) => [`${et[i]} $${pto(x)}$`, M(it.d[i][0], 2), M(it.d[i][1], 2), it.asig[i] + 1]));
  const cenTxt = (it) => [0, 1].map((g) => { const m = pts.filter((_, i) => it.asig[i] === g); return String.raw`$\mu_${g + 1}=${dim === 1 ? `\\dfrac{${m.map((x) => N(x[0])).join("+")}}{${m.length}}=${N(it.nc[g][0], 3)}` : `\\left(${Array.from({ length: dim }, (_, j) => `\\tfrac{${m.map((x) => N(x[j])).join("+")}}{${m.length}}`).join(";\\ ")}\\right)=${pto(it.nc[g].map((v) => rd(v, 3)))}`}$`; });
  const rX = `matrix(c(${pts.map((x) => x.join(", ")).join(", ")}), ncol = ${dim}, byrow = TRUE)`, rC = `matrix(c(${init.map((x) => x.join(", ")).join(", ")}), ncol = ${dim}, byrow = TRUE)`;
  agregar("m13", {
    concepto: "m13-c02", dificultad: 2, titulo: o.titulo,
    enunciado: p(`${o.intro} ${et.map((e, i) => `${e}${dim === 1 ? " = " : ""}$${pto(pts[i])}$`).join(", ")}. Se aplica K-medias con $k=2$ y centroides iniciales $\\mu_1=${pto(init[0])}$ y $\\mu_2=${pto(init[1])}$ (distancia euclídea).`) +
      incisos(["Realiza la primera asignación.", "Recalcula los centroides.", "Continúa iterando hasta que el algoritmo converja.", "Calcula la suma de cuadrados dentro de los clústeres (WSS) de la solución final."]),
    partes: [
      { titulo: "a) Iteración 1: distancias y asignación", puntos: 2, solucion: tablaIter(iters[0]) + p(`Cada punto va al centroide más cercano. Ejemplo: $d(${et[pts.length - 1]},\\mu_1)=${dim === 1 ? `|${N(pts[pts.length - 1][0])}-${N(init[0][0])}|` : `\\sqrt{${pts[pts.length - 1].map((v, j) => `(${N(v - init[0][j])})^2`).join("+")}}`}=${N(iters[0].d[pts.length - 1][0], 2)}$.`) },
      { titulo: "b) Nuevos centroides", puntos: 1, solucion: p("Cada centroide es la <strong>media</strong> de los puntos de su clúster:", ...cenTxt(iters[0])) },
      { titulo: "c) Iteraciones siguientes hasta converger", puntos: 2,
        solucion: iters.slice(1).map((it, q) => p(`<strong>Iteración ${q + 2}</strong> (centroides $\\mu_1=${pto(it.cen[0].map((v) => rd(v, 3)))}$, $\\mu_2=${pto(it.cen[1].map((v) => rd(v, 3)))}$):`) + tablaIter(it) +
          (it.cambio ? p(`Cambia la asignación de ${et.filter((_, i) => it.asig[i] !== iters[q].asig[i]).join(", ")}. Nuevos centroides:`, ...cenTxt(it)) : p("Ninguna asignación cambia ⇒ <strong>el algoritmo converge</strong>."))).join("") +
          p(`Solución: clúster 1 = {${grupos[0].join(", ")}}; clúster 2 = {${grupos[1].join(", ")}}.`) },
      { titulo: "d) WSS de la solución final", puntos: 1,
        solucion: p(String.raw`$WSS=\sum_j\sum_{i\in C_j}\lVert x_i-\mu_j\rVert^2$ (distancias al cuadrado de cada punto a <strong>su</strong> centroide).`, String.raw`Clúster 1: $${N(wssG[0], 3)}$; clúster 2: $${N(wssG[1], 3)}$ ⇒ $WSS=${N(wss, 3)}$.`, "En R: <code>km$tot.withinss</code>. El resultado depende de los centroides iniciales; por eso se usa <code>nstart</code>.") }
    ],
    verifica: [vr("WSS (kmeans con esos centroides)", `kmeans(${rX}, centers = ${rC}, algorithm = "Lloyd")$tot.withinss`, wss, 3), vr("tamaño del clúster 1", `kmeans(${rX}, centers = ${rC}, algorithm = "Lloyd")$size[1]`, grupos[0].length, 4)],
    fuente: [{ id: "C5.2", loc: "slides 4–6" }, { id: "EJ-P2", loc: "P11" }]
  });
}
function silueta(o) {
  const { pts, et, cl, obj } = o, K = Math.max(...cl), dim = pts[0].length;
  const prom = (i, g) => { const v = pts.map((x, j) => (cl[j] === g && j !== i ? euclid(pts[i], x) : null)).filter((x) => x != null); return { v, m: media(v) }; };
  const s = pts.map((_, i) => {
    const a = prom(i, cl[i]), otros = []; for (let g = 1; g <= K; g++) if (g !== cl[i]) otros.push({ g, ...prom(i, g) });
    otros.sort((x, y) => x.m - y.m); afirmar(a.v.length > 0, "clúster de un solo elemento");
    return { a, otros, b: otros[0], s: (otros[0].m - a.m) / Math.max(a.m, otros[0].m) };
  });
  const sm = media(s.map((x) => x.s));
  const frac = (x) => (x.v.length === 1 ? N(x.m, 3) : String.raw`\dfrac{${x.v.map((v) => N(v, 3)).join("+")}}{${x.v.length}}=${N(x.m, 3)}`);
  const lee = (v) => (v > 0.5 ? "bien asignado (cerca de $1$)" : v > 0.1 ? "asignación débil" : v > -0.1 ? "en el borde entre dos clústeres (cerca de $0$)" : "probablemente <strong>mal asignado</strong> (negativo): está más cerca del clúster vecino");
  const detalle = (i) => p(String.raw`$a(${et[i]})$ = distancia promedio a los demás puntos de <strong>su</strong> clúster $=${frac(s[i].a)}$.`,
    ...s[i].otros.map((x) => String.raw`Distancia promedio al clúster ${x.g}: $${frac(x)}$.`), String.raw`$b(${et[i]})$ = la menor de las distancias promedio a los otros clústeres $=${N(s[i].b.m, 3)}$${K > 2 ? ` (clúster vecino: ${s[i].b.g})` : ""}.`,
    String.raw`$s(${et[i]})=\dfrac{b-a}{\max(a,b)}=\dfrac{${N(s[i].b.m, 3)}-${N(s[i].a.m, 3)}}{${N(Math.max(s[i].a.m, s[i].b.m), 3)}}=${N(s[i].s, 3)}$ ⇒ ${lee(s[i].s)}.`);
  const rX = `matrix(c(${pts.map((x) => x.join(", ")).join(", ")}), ncol = ${dim}, byrow = TRUE)`, rS = `cluster::silhouette(${rvec(cl)}, dist(${rX}))`;
  agregar("m13", {
    concepto: "m13-c07", dificultad: 3, titulo: o.titulo,
    enunciado: p(o.intro) + tabla(["Punto", dim === 1 ? "Valor" : "Coordenadas", "Clúster"], pts.map((x, i) => [et[i], `$${pto(x)}$`, cl[i]])) +
      incisos([`Calcula el coeficiente de silueta de ${et[obj[0]]}.`, `Calcula el coeficiente de silueta de ${et[obj[1]]}.`, "Con las siluetas de todos los puntos, calcula el promedio y evalúa el agrupamiento."]),
    partes: [
      { titulo: `a) Silueta de ${et[obj[0]]}: a(i), b(i) y s(i)`, puntos: 2, solucion: detalle(obj[0]) },
      { titulo: `b) Silueta de ${et[obj[1]]}`, puntos: 2, solucion: detalle(obj[1]) },
      { titulo: "c) Silueta promedio y evaluación", puntos: 2,
        solucion: tabla(["Punto", ...et], [["$a(i)$", ...s.map((x) => M(x.a.m, 3))], ["$b(i)$", ...s.map((x) => M(x.b.m, 3))], ["$s(i)$", ...s.map((x) => M(x.s, 3))]]) +
          p(String.raw`Silueta promedio $=${N(sm, 3)}$.`, `${sm > 0.7 ? "Estructura fuerte: clústeres compactos y bien separados." : sm > 0.5 ? "Estructura razonable." : "Estructura débil."}${s.some((x) => x.s < 0) ? ` Hay siluetas negativas (${et.filter((_, i) => s[i].s < 0).join(", ")}): conviene revisar esa asignación o probar otro $k$.` : " Ninguna silueta es negativa ni cercana a $0$."}`,
            "Para elegir $k$ se prefiere el que maximiza la silueta promedio. En R: <code>silhouette(km$cluster, dist(datos))</code>.") }
    ],
    verifica: [vr(`s(${et[obj[0]]})`, `${rS}[${obj[0] + 1}, 3]`, s[obj[0]].s, 3), vr(`s(${et[obj[1]]})`, `${rS}[${obj[1] + 1}, 3]`, s[obj[1]].s, 3), vr("silueta promedio", `mean(${rS}[, 3])`, sm, 3)],
    fuente: [{ id: "C5.2", loc: "slides 14–18" }, { id: "PR-P2-Q12", loc: "pregunta 1 e" }]
  });
}
function wssCodo(o) {
  const { pts, et, cl } = o, K = Math.max(...cl), dim = pts[0].length;
  const cent = (m) => Array.from({ length: dim }, (_, j) => media(m.map((x) => x[j])));
  const c1 = cent(pts), w1 = suma(pts.map((x) => euclid(x, c1) ** 2));
  const gr = Array.from({ length: K }, (_, g) => pts.map((x, i) => ({ x, e: et[i] })).filter((_, i) => cl[i] === g + 1));
  const cg = gr.map((g) => cent(g.map((q) => q.x))), wg = gr.map((g, k) => suma(g.map((q) => euclid(q.x, cg[k]) ** 2))), wK = suma(wg);
  const rX = `matrix(c(${pts.map((x) => x.join(", ")).join(", ")}), ncol = ${dim}, byrow = TRUE)`;
  const kmax = Math.min(5, pts.length - 1);
  const W = Rv(`{set.seed(1); X <- ${rX}; sapply(1:${kmax}, function(k) kmeans(X, centers = k, nstart = 50)$tot.withinss)}`);
  afirmar(Math.abs(W[K - 1] - wK) < 1e-6, `${o.titulo}: la partición dada no es la óptima de kmeans (R: ${W[K - 1]}, dada: ${wK})`);
  const caida = W.slice(1).map((w, i) => W[i] - w);
  afirmar(caida[K - 2] > 4 * (caida[K - 1] || 0), "el codo no es claro");
  const sq = (x, c) => (dim === 1 ? `(${N(x[0] - c[0], 3)})^2` : `[${x.map((v, j) => `(${N(v - c[j], 3)})^2`).join("+")}]`);
  agregar("m13", {
    concepto: "m13-c06", dificultad: 2, titulo: o.titulo,
    enunciado: p(`${o.intro} ${et.map((e, i) => `${e}${dim === 1 ? " = " : ""}$${pto(pts[i])}$`).join(", ")}.`) +
      incisos(["Calcula la WSS con $k=1$.", `Calcula la WSS con $k=${K}$ para la partición ${gr.map((g) => "{" + g.map((q) => q.e).join(", ") + "}").join(", ")}.`, `En R se obtuvo la WSS para $k=1,\\dots,${kmax}$: ${W.map((w) => M(w, 2)).join("; ")}. Aplica el método del codo.`]),
    partes: [
      { titulo: "a) WSS con un solo clúster", puntos: 2,
        solucion: p(String.raw`Con $k=1$ el centroide es la media global: $\mu=${pto(c1.map((v) => rd(v, 3)))}$.`, String.raw`$WSS(1)=\sum\lVert x_i-\mu\rVert^2=${pts.map((x) => sq(x, c1)).join("+")}=${N(w1, 3)}$.`, "Es la suma de cuadrados total.") },
      { titulo: `b) WSS con ${K} clústeres`, puntos: 2,
        solucion: p(...gr.map((g, k) => String.raw`{${g.map((q) => q.e).join(", ")}}: centroide $${pto(cg[k].map((v) => rd(v, 3)))}$; suma de cuadrados $=${g.map((q) => sq(q.x, cg[k])).join("+")}=${N(wg[k], 3)}$.`),
          String.raw`$WSS(${K})=${wg.map((w) => N(w, 3)).join("+")}=${N(wK, 3)}$: una reducción de $${N(100 * (1 - wK / w1), 1)}\,\%$ respecto de $k=1$.`) },
      { titulo: "c) Método del codo", puntos: 2,
        solucion: tabla(["$k$", ...W.map((_, i) => i + 1)], [["WSS", ...W.map((w) => M(w, 2))], ["Reducción", "—", ...caida.map((c) => M(c, 2))]]) +
          p(`La WSS siempre decrece al aumentar $k$ (llega a $0$ con $k=n$), así que <strong>no</strong> se elige el $k$ de menor WSS. La caída es grande hasta $k=${K}$ y después la curva se aplana ⇒ el codo está en <strong>$k=${K}$</strong>.`, "Conviene confirmar con el coeficiente de silueta.") }
    ],
    verifica: [vr("WSS(1)", `kmeans(${rX}, centers = 1)$tot.withinss`, w1, 3), vr(`WSS(${K})`, `{set.seed(1); kmeans(${rX}, centers = ${K}, nstart = 50)$tot.withinss}`, wK, 3)],
    fuente: [{ id: "C5.2", loc: "slides 10–13" }, { id: "EJ-P2", loc: "P12" }]
  });
}
function m13() {
  kmedias({ titulo: "K-medias a mano hasta converger (6 puntos)", intro: "Seis clientes con dos variables estandarizadas:", et: ["P1", "P2", "P3", "P4", "P5", "P6"], pts: [[1, 2], [2, 1], [2, 3], [6, 5], [7, 7], [8, 6]], init: [[1, 2], [2, 3]] });
  kmedias({ titulo: "K-medias a mano: cinco puntos y centroides iniciales dados", intro: "Cinco locales con coordenadas:", et: ["A", "B", "C", "D", "E"], pts: [[2, 10], [2, 5], [8, 4], [5, 8], [7, 5]], init: [[2, 10], [5, 8]] });
  kmedias({ titulo: "K-medias en una dimensión (gasto mensual)", intro: "Gasto mensual (en decenas de miles de pesos) de seis clientes:", et: ["C1", "C2", "C3", "C4", "C5", "C6"], pts: [[2], [4], [5], [10], [12], [20]], init: [[2], [5]] });
  kmedias({ titulo: "K-medias con una mala inicialización", intro: "Seis tiendas con dos indicadores:", et: ["T1", "T2", "T3", "T4", "T5", "T6"], pts: [[1, 1], [1, 3], [2, 1], [8, 8], [9, 7], [9, 9]], init: [[1, 1], [1, 3]] });
  silueta({ titulo: "Coeficiente de silueta a mano (datos en una dimensión)", intro: "Cinco observaciones agrupadas en 2 clústeres:", et: ["A", "B", "C", "D", "E"], pts: [[1], [2], [4], [8], [10]], cl: [1, 1, 1, 2, 2], obj: [2, 3] });
  silueta({ titulo: "Silueta de un punto mal asignado", intro: "Cinco observaciones agrupadas en 2 clústeres (revisa la asignación de C):", et: ["A", "B", "C", "D", "E"], pts: [[1], [2], [6], [8], [10]], cl: [1, 1, 1, 2, 2], obj: [2, 0] });
  silueta({ titulo: "Silueta con tres clústeres: ¿cuál es el vecino?", intro: "Seis observaciones agrupadas en 3 clústeres:", et: ["A", "B", "C", "D", "E", "F"], pts: [[1], [3], [6], [7], [12], [14]], cl: [1, 1, 2, 2, 3, 3], obj: [2, 1] });
  silueta({ titulo: "Silueta a mano en dos dimensiones", intro: "Cinco puntos agrupados en 2 clústeres (distancia euclídea):", et: ["A", "B", "C", "D", "E"], pts: [[1, 1], [2, 1], [1, 3], [5, 4], [6, 5]], cl: [1, 1, 1, 2, 2], obj: [2, 3] });
  wssCodo({ titulo: "WSS a mano y método del codo (una dimensión)", intro: "Tiempos de entrega (días) de siete pedidos:", et: ["P1", "P2", "P3", "P4", "P5", "P6", "P7"], pts: [[2], [3], [4], [10], [11], [12], [13]], cl: [1, 1, 1, 2, 2, 2, 2] });
  wssCodo({ titulo: "WSS a mano y codo con tres grupos (dos dimensiones)", intro: "Seis locales con coordenadas:", et: ["A", "B", "C", "D", "E", "F"], pts: [[1, 1], [2, 2], [8, 1], [9, 2], [5, 8], [6, 9]], cl: [1, 1, 2, 2, 3, 3] });
}

/* ══ M14 · DIANA ═══════════════════════════════════════════════════════ */
function diana(o) {
  const { et, D } = o, n = et.length, todos = et.map((_, i) => i);
  const prom = (i, S) => media(S.map((j) => D[i][j]));
  const nom = (c) => "{" + c.map((i) => et[i]).join(", ") + "}";
  const lista = (i, S) => (S.length === 1 ? N(D[i][S[0]]) : String.raw`\tfrac{${S.map((j) => N(D[i][j])).join("+")}}{${S.length}}`);
  function dividir(C) {
    const disp = C.map((i) => ({ i, v: prom(i, C.filter((j) => j !== i)) })).sort((a, b) => b.v - a.v);
    afirmar(disp.length < 2 || disp[0].v - disp[1].v > 1e-9, `${o.titulo}: empate en la disparidad`);
    let C1 = [disp[0].i], C2 = C.filter((j) => j !== disp[0].i); const rondas = [];
    while (C2.length > 1) {
      const difs = C2.map((i) => { const r = C2.filter((j) => j !== i); return { i, r, a: prom(i, r), b: prom(i, C1), dif: prom(i, r) - prom(i, C1) }; });
      const c1 = C1.slice(); const pos = difs.filter((x) => x.dif > 1e-9);
      afirmar(pos.length <= 1 && difs.every((x) => Math.abs(x.dif) > 1e-9), `${o.titulo}: más de un candidato a moverse en una ronda`);
      rondas.push({ difs, C1: c1, mueve: pos[0] || null });
      if (!pos.length) break;
      C1 = C1.concat([pos[0].i]).sort((a, b) => a - b); C2 = C2.filter((j) => j !== pos[0].i);
    }
    return { disp, sale: disp[0].i, rondas, C1, C2 };
  }
  const tablaRonda = (r) => tabla(["$i$", "$d(i,\\,C_2\\setminus\\{i\\})$", "$d(i,\\,C_1)$", "dif"], r.difs.map((x) => [et[x.i], x.r.length === 1 ? M(x.a, 2) : `$${lista(x.i, x.r)}=${N(x.a, 2)}$`, r.C1.length === 1 ? M(x.b, 2) : `$${lista(x.i, r.C1)}=${N(x.b, 2)}$`, M(x.dif, 2)]));
  const d1 = dividir(todos);
  const grupos = [d1.C1, d1.C2], hetero = grupos.map((g) => (g.length < 2 ? 0 : media(g.flatMap((i, a) => g.slice(a + 1).map((j) => D[i][j])))));
  const diam = grupos.map((g) => Math.max(0, ...g.flatMap((i) => g.map((j) => D[i][j]))));
  const q = hetero[0] > hetero[1] ? 0 : 1;
  afirmar((diam[q] > diam[1 - q]) && Math.abs(hetero[0] - hetero[1]) > 1e-9, `${o.titulo}: el promedio y el diámetro no eligen el mismo clúster`);
  const d2 = dividir(grupos[q]), final = [grupos[1 - q], d2.C1, d2.C2];
  const etiquetar = (cls) => { const lab = Array(n).fill(0); let sig = 1; for (let i = 0; i < n; i++) if (!lab[i]) { const c = cls.find((g) => g.includes(i)); c.forEach((j) => { lab[j] = sig; }); sig++; } return Number(lab.join("")); };
  const rD = `cluster::diana(${rdist(D)})`;
  agregar("m14", {
    concepto: "m14-c01", dificultad: 3, titulo: o.titulo,
    enunciado: p(`${o.intro} La matriz de distancias entre ${n} objetos es:`) + triangular(et, D, 2) + p("Aplica el algoritmo desagregativo <strong>DIANA</strong>.") +
      incisos(["Calcula la disparidad promedio de cada objeto e indica cuál se escinde primero.", "Realiza la primera ronda de reasignación.", "Continúa hasta que nadie se mueva e indica la primera división.", "¿Qué clúster se divide a continuación y cómo? Indica la solución con 3 clústeres."]),
    partes: [
      { titulo: "a) Disparidades promedio y objeto que se escinde", puntos: 1.5,
        solucion: p("Disparidad = distancia promedio a los demás objetos del clúster:") + tabla(["Objeto", "Cálculo", "Disparidad"], todos.map((i) => [et[i], `$${lista(i, todos.filter((j) => j !== i))}$`, M(prom(i, todos.filter((j) => j !== i)), 2)])) +
          p(`La mayor es la de <strong>${et[d1.sale]}</strong> ($${N(d1.disp[0].v, 2)}$) ⇒ $C_1=\\{${et[d1.sale]}\\}$ y $C_2$ = ${nom(todos.filter((j) => j !== d1.sale))}.`) },
      { titulo: "b) Primera ronda de reasignación", puntos: 2,
        solucion: p("Para cada $i\\in C_2$: $\\text{dif}=d(i,\\,C_2\\setminus\\{i\\})-d(i,\\,C_1)$ (promedios). Si $\\text{dif}>0$, $i$ está más cerca de $C_1$ y se mueve.") + tablaRonda(d1.rondas[0]) +
          p(d1.rondas[0].mueve ? `Solo ${et[d1.rondas[0].mueve.i]} tiene dif positiva ⇒ <strong>${et[d1.rondas[0].mueve.i]} pasa a $C_1$</strong>.` : "Todas las diferencias son negativas ⇒ <strong>nadie se mueve</strong>.") },
      { titulo: "c) Rondas siguientes y primera división", puntos: 1,
        solucion: d1.rondas.slice(1).map((r, k) => p(`<strong>Ronda ${k + 2}</strong>, con $C_1$ = ${nom(r.C1)}:`) + tablaRonda(r) + p(r.mueve ? `${et[r.mueve.i]} tiene dif positiva ⇒ pasa a $C_1$.` : "Todas negativas ⇒ la división es estable.")).join("") +
          p((d1.rondas.length === 1 ? "No hay más rondas: la ronda 1 ya fue estable. " : "") + `Primera división: <strong>${nom(d1.C1)}</strong> y <strong>${nom(d1.C2)}</strong>.`) },
      { titulo: "d) Segunda división y solución con 3 clústeres", puntos: 1.5,
        solucion: p(`Se divide el clúster más heterogéneo. Distancia promedio interna: ${grupos.map((g, k) => `${nom(g)} $=${N(hetero[k], 2)}$`).join("; ")} ⇒ se divide <strong>${nom(grupos[q])}</strong>.`,
          `Disparidades dentro de ${nom(grupos[q])}: ${d2.disp.map((x) => `${et[x.i]} $=${N(x.v, 2)}$`).join("; ")} ⇒ sale <strong>${et[d2.sale]}</strong>.`,
          d2.rondas.length ? `Reasignación: ${d2.rondas.map((r) => r.difs.map((x) => `dif(${et[x.i]}) $=${N(x.dif, 2)}$`).join("; ") + (r.mueve ? ` ⇒ ${et[r.mueve.i]} se mueve` : " ⇒ nadie se mueve")).join(". Luego: ")}.` : "",
          `Con 3 clústeres: ${final.map((g) => "<strong>" + nom(g) + "</strong>").join(", ")}. En R: <code>cutree(as.hclust(diana(d)), k = 3)</code>.`) }
    ],
    verifica: [vr("partición en 2 (diana)", `as.numeric(paste(cutree(as.hclust(${rD}), 2), collapse = ""))`, etiquetar([d1.C1, d1.C2]), 4), vr("partición en 3 (diana)", `as.numeric(paste(cutree(as.hclust(${rD}), 3), collapse = ""))`, etiquetar(final), 4),
      vjs(`disparidad de ${et[d1.sale]}`, `media(${JSON.stringify(todos.filter((j) => j !== d1.sale).map((j) => D[d1.sale][j]))})`, d1.disp[0].v, 2)],
    fuente: [{ id: "C5.2", loc: "slides 20–28" }]
  });
}
function m14() {
  const et = ["A", "B", "C", "D", "E"];
  diana({ titulo: "DIANA a mano: escisión y dos rondas de reasignación", intro: "Se quiere dividir un grupo de cinco sucursales.", et, D: D1 });
  diana({ titulo: "DIANA a mano con otra matriz de distancias", intro: "Cinco productos comparados según su perfil de ventas.", et, D: [[0, 3, 8, 12, 10], [3, 0, 6, 11, 9], [8, 6, 0, 5, 8], [12, 11, 5, 0, 4], [10, 9, 8, 4, 0]] });
  const pos = [1, 2, 4, 7, 20];
  diana({ titulo: "DIANA cuando hay un objeto atípico", intro: "Cinco clientes; uno de ellos es muy distinto al resto.", et, D: pos.map((a) => pos.map((b) => Math.abs(a - b))) });
}

module.exports = { m11, m12, m13, m14 };
