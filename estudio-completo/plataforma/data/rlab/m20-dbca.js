/* Laboratorio R · DBCA (M20, P3) */
PLATAFORMA.registrar("rlab", [
  {
    id: "r-m20-dbca", modulo: "m20-dbca", tema: "DBCA",
    titulo: "DBCA métodos de ensamble: aov + bloque y LSD.test (métodos y operadores)",
    descripcion: "Código de S7.3 / C7.3 s13. Se agrega el LSD de los operadores (C7.3 s14) y el valor t que usa la LSD a mano (s15).",
    funciones: ["factor", "rep", "data.frame", "aov", "summary", "agricolae::LSD.test", "qt"],
    paquetes: ["agricolae"],
    codigo: `metodo   <- factor(rep(c("A", "B", "C", "D"), each = 4))
operador <- factor(rep(c(1, 2, 3, 4), times = 4))
y <- c(6, 9, 7, 8,  7, 10, 11, 8,  10, 16, 11, 14,  10, 13, 11, 9)
datos <- data.frame(metodo, operador, y)

modelo <- aov(y ~ metodo + operador, data = datos)
summary(modelo)

library(agricolae)
lsd <- LSD.test(modelo, "metodo")
lsd$groups
LSD.test(modelo, "operador")$groups
qt(0.975, 9) * sqrt(2 * 2 / 4)     # LSD a mano: t(0,025; 9) * raiz(2*CME/b)`,
    salida: `            Df Sum Sq Mean Sq F value  Pr(>F)
metodo       3   61.5    20.5   10.25 0.00292 **
operador     3   28.5     9.5    4.75 0.02985 *
Residuals    9   18.0     2.0
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
      y groups
C 12.75      a
D 10.75     ab
B  9.00     bc
A  7.50      c
      y groups
2 12.00      a
3 10.00     ab
4  9.75     ab
1  8.25      b
[1] 2.262157`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul>
<li><code>metodo</code>: $F=10{,}25$, $p=0{,}00292$ ⇒ los métodos difieren. <code>operador</code>: $F=4{,}75$, $p=0{,}02985$ ⇒ el bloque también influye.</li>
<li><code>Residuals 9 18 2</code>: $CME=2$ con $(k-1)(b-1)=9$ gl.</li>
<li>Grupos de métodos: C <code>a</code>, D <code>ab</code>, B <code>bc</code>, A <code>c</code>. Dos medias con una letra en común no difieren: C≠A, C≠B, D≠A.</li>
<li>Operadores: 2 <code>a</code> y 1 <code>b</code> (difieren); 3 y 4 <code>ab</code>.</li>
<li>LSD a mano $=2{,}262$: coincide con la tabla de pares de C7.3 s15.</li></ul>`,
    fuente: [{ id: "S7.3", loc: "líneas 14–34" }, { id: "C7.3", loc: "slides 13–15" }]
  },
  {
    id: "r-m20-fertilizantes", modulo: "m20-dbca", tema: "DBCA",
    titulo: "Ejercicio de la Prueba 3: fertilizantes (DBCA vs DCA) y valores críticos",
    descripcion: "Datos de C7.3 s16 (Prueba 3, P1). Se ajusta el DBCA, el DCA sin bloque y se obtienen los F críticos y la LSD que usa la pauta.",
    funciones: ["aov", "summary", "qf", "qt"],
    codigo: `fert   <- factor(rep(c("F1", "F2", "F3"), each = 4))
sector <- factor(rep(1:4, times = 3))
rend   <- c(21, 20, 24, 23,  21, 26, 24, 29,  24, 26, 30, 32)

summary(aov(rend ~ fert + sector))   # DBCA
summary(aov(rend ~ fert))            # DCA: el bloque se va al error

qf(0.95, 2, 6); qf(0.95, 3, 6); qf(0.95, 2, 9)
qt(0.975, 6) * sqrt(2 * 4 / 4)       # LSD con CME = 4 y b = 4`,
    salida: `            Df Sum Sq Mean Sq F value Pr(>F)
fert         2     72      36       9 0.0156 *
sector       3     60      20       5 0.0452 *
Residuals    6     24       4
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
            Df Sum Sq Mean Sq F value Pr(>F)
fert         2     72   36.00   3.857 0.0617 .
Residuals    9     84    9.33
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
[1] 5.143253
[1] 4.757063
[1] 4.256495
[1] 3.460456`,
    ejecutable: true, origenSalida: "ejecutada", version: "R 4.6.1",
    lectura: String.raw`<ul>
<li>DBCA: fertilizante $F=9$ ($p=0{,}0156$), sector $F=5$ ($p=0{,}0452$), $CME=4$.</li>
<li>DCA: $F=3{,}857$ ($p=0{,}0617$) y $CME=9{,}33$: sin bloque ya no se rechaza $H_0$ al 5 %.</li>
<li>Críticos: $F_{2,6}=5{,}14$; $F_{3,6}=4{,}76$; $F_{2,9}=4{,}26$. LSD $=3{,}46$.</li></ul>`,
    fuente: [{ id: "C7.3", loc: "slides 16–17" }, { id: "PR-P3-Q1" }]
  }
]);
