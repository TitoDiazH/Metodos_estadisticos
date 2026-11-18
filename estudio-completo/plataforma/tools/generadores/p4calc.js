/* ============================================================================
   generadores/p4calc.js — Cálculos de la Prueba 4 (regresión lineal múltiple y
   superficie de respuesta). Un solo ajuste en R por ejercicio devuelve todo lo
   que la solución y la pizarra necesitan: coeficientes, t, F, R², Shapiro, VIF,
   apalancamiento, Cook, predicción, falta de ajuste y punto estacionario.
   Lo usan tools/generadores/p4.js (desarrollos) y tools/escenas/_p4.js (videos),
   así los números de la pizarra y de la pauta salen del mismo cálculo.
   ========================================================================== */
"use strict";
const L = require("./lib");

const rvec = (v) => "c(" + v.map((x) => (typeof x === "string" ? JSON.stringify(x) : String(x))).join(", ") + ")";
/* data.frame de R con las columnas en el orden dado */
const rdatos = (datos) => "data.frame(" + Object.keys(datos).map((k) => `${k} = ${rvec(datos[k])}`).join(", ") + ")";

/* cfg: { datos:{y:[…], x1:[…]}, formula:"y ~ x1 + x2", nuevo:{x1:…}|null, vif:bool,
          falta:["x1","x2"] (columnas que definen las celdas para el error puro),
          rsm:["x1","x2"] (variables codificadas del modelo de 2.º orden) } */
function ajustar(cfg) {
  const lineas = [
    "suppressMessages(library(car))",
    `d <- ${rdatos(cfg.datos)}`,
    `m <- lm(${cfg.formula}, data = d)`,
    "s <- summary(m); cf <- coef(s); r <- list()",
    "r$nom <- rownames(cf); r$est <- unname(cf[, 1]); r$se <- unname(cf[, 2]); r$t <- unname(cf[, 3]); r$p <- unname(cf[, 4])",
    "r$sigma <- s$sigma; r$gl <- m$df.residual; r$n <- nrow(d); r$r2 <- s$r.squared; r$r2a <- s$adj.r.squared",
    "f <- s$fstatistic; r$F <- unname(f[1]); r$gl1 <- unname(f[2]); r$gl2 <- unname(f[3]); r$pF <- unname(pf(f[1], f[2], f[3], lower.tail = FALSE))",
    `yy <- model.response(model.frame(m)); r$sce <- sum(resid(m)^2); r$sct <- sum((yy - mean(yy))^2); r$scr <- r$sct - r$sce; r$ybar <- mean(yy)`,
    "r$sw <- if (r$n >= 3 && r$gl > 0) shapiro.test(resid(m))$p.value else NA",
    "r$hat <- unname(hatvalues(m)); r$cook <- unname(cooks.distance(m)); r$fit <- unname(fitted(m)); r$res <- unname(resid(m))",
    "r$tcrit <- qt(0.975, r$gl); r$Fcrit <- qf(0.95, r$gl1, r$gl2)"
  ];
  if (cfg.vif) lineas.push("v <- vif(m); if (is.matrix(v)) v <- v[, 1]; r$vif <- unname(v); r$vifNom <- names(v)");
  if (cfg.nuevo) lineas.push(`nd <- data.frame(${Object.keys(cfg.nuevo).map((k) => `${k} = ${cfg.nuevo[k]}`).join(", ")})`,
    "r$pc <- unname(c(predict(m, nd, interval = 'confidence'))); r$pp <- unname(c(predict(m, nd, interval = 'prediction')))");
  if (cfg.falta) lineas.push(`celda <- factor(paste(${cfg.falta.map((v) => "d$" + v).join(", ")}))`,
    "if (nlevels(celda) < r$n) { scP <- sum((yy - ave(yy, celda))^2); glP <- r$n - nlevels(celda); scL <- r$sce - scP; glL <- r$gl - glP; FL <- (scL / glL) / (scP / glP); r$lof <- list(scPuro = scP, glPuro = glP, scLof = scL, glLof = glL, F = FL, p = pf(FL, glL, glP, lower.tail = FALSE), ncel = nlevels(celda)) }");
  if (cfg.rsm) {
    const v = cfg.rsm, k = v.length;
    lineas.push(`vs <- ${rvec(v)}; k <- ${k}; co <- coef(m); g <- function(n) if (n %in% names(co)) unname(co[n]) else 0`,
      "b <- sapply(vs, g); B <- matrix(0, k, k)",
      "for (i in 1:k) { B[i, i] <- g(paste0('I(', vs[i], '^2)')); if (i < k) for (j in (i + 1):k) { bij <- g(paste0(vs[i], ':', vs[j])) + g(paste0(vs[j], ':', vs[i])); B[i, j] <- bij / 2; B[j, i] <- bij / 2 } }",
      "r$b <- unname(b); r$B <- unname(B); r$b0 <- g('(Intercept)')",
      "if (abs(det(B)) > 1e-12) { xs <- -0.5 * solve(B, b); names(xs) <- vs; r$xs <- unname(xs); r$ev <- eigen(B, symmetric = TRUE)$values; r$yxs <- unname(predict(m, as.data.frame(t(xs)))) }");
  }
  lineas.push("cat(jsonlite::toJSON(r, digits = NA, auto_unbox = TRUE, na = 'null'))");
  const out = L.Rtxt(lineas.join("\n"));
  const r = JSON.parse(out.slice(out.indexOf("{")));
  /* Accesos cómodos por nombre de término */
  r.idx = (nombre) => { const i = r.nom.indexOf(nombre); if (i < 0) throw new Error("término no está en el modelo: " + nombre); return i; };
  r.coef = (nombre) => r.est[r.idx(nombre)];
  r.k = r.nom.length - 1;
  r.hcorte = (2 * (r.k + 1)) / r.n;
  r.hMax = Math.max(...r.hat); r.iHMax = r.hat.indexOf(r.hMax);
  r.cookMax = Math.max(...r.cook); r.iCookMax = r.cook.indexOf(r.cookMax);
  r.cfg = cfg;
  return r;
}

/* Código R «limpio» que ve el estudiante (y cuya salida real se muestra). */
function codigoR(cfg, extra = []) {
  const l = [];
  if (cfg.vif) l.push("library(car)");
  l.push(`datos <- ${rdatos(cfg.datos)}`, `modelo <- lm(${cfg.formula}, data = datos)`, "summary(modelo)");
  l.push(...extra);
  return l.join("\n");
}

/* ── Álgebra pequeña en JS (para evaluar la superficie en una grilla) ── */
function evalModelo(r, punto) {
  /* punto: { x1: …, x2: … } — evalúa ŷ con los nombres de término de R */
  let y = 0;
  r.nom.forEach((t, i) => {
    let v;
    if (t === "(Intercept)") v = 1;
    else if (/^I\((\w+)\^(\d)\)$/.test(t)) { const m = /^I\((\w+)\^(\d)\)$/.exec(t); v = punto[m[1]] ** Number(m[2]); }
    else if (t.includes(":")) v = t.split(":").reduce((a, s) => a * punto[s], 1);
    else if (/^I\((\w+) \* (\w+)\)$/.test(t)) { const m = /^I\((\w+) \* (\w+)\)$/.exec(t); v = punto[m[1]] * punto[m[2]]; }
    else v = punto[t];
    if (v == null || Number.isNaN(v)) throw new Error("no sé evaluar el término " + t);
    y += r.est[i] * v;
  });
  return y;
}
/* Mejor punto en la grilla [lo, hi]^k (paso h) para max o min */
function grilla(r, vars, objetivo, lo = -1, hi = 1, h = 0.05, filtro = null) {
  const pasos = Math.round((hi - lo) / h);
  let mejor = null;
  const rec = (i, punto) => {
    if (i === vars.length) {
      if (filtro && !filtro(punto)) return;
      const y = evalModelo(r, punto);
      if (!mejor || (objetivo === "max" ? y > mejor.y : y < mejor.y)) mejor = { y, punto: Object.assign({}, punto) };
      return;
    }
    for (let s = 0; s <= pasos; s++) { punto[vars[i]] = Number((lo + s * h).toFixed(6)); rec(i + 1, punto); }
  };
  rec(0, {});
  return mejor;
}
/* Esquinas del cubo [−1, 1]^k con su ŷ, ordenadas según el objetivo */
function esquinas(r, vars, objetivo) {
  const out = [];
  for (let m = 0; m < 1 << vars.length; m++) {
    const punto = {};
    vars.forEach((v, i) => { punto[v] = (m >> i) & 1 ? 1 : -1; });
    out.push({ punto, y: evalModelo(r, punto) });
  }
  return out.sort((a, b) => (objetivo === "max" ? b.y - a.y : a.y - b.y));
}

module.exports = { ajustar, codigoR, rdatos, rvec, evalModelo, grilla, esquinas };
