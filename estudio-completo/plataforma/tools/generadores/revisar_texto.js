/* Revisa los desarrollos generados: números con «{,}» o «\» fuera de $…$ (se verían mal). */
"use strict";
const f = process.argv.slice(2);
let malos = 0;
global.PLATAFORMA = { registrar: (t, a) => { a.forEach((q) => {
  const html = q.enunciado + q.partes.map((x) => x.solucion).join("");
  const fuera = html.replace(/\$\$[\s\S]*?\$\$/g, "").replace(/\$[^$]*\$/g, "");
  const m = fuera.match(/.{0,40}(\{,\}|\\[a-z]+).{0,20}/);
  if (m) { malos++; console.log(q.id, "→", m[0]); }
}); } };
f.forEach((x) => require(require("path").resolve(x)));
console.log(malos ? `${malos} con problemas` : "OK");
