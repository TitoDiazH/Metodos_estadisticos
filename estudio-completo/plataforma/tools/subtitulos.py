#!/usr/bin/env python3
# ============================================================================
# subtitulos.py — Convierte el texto HABLADO de los guiones («ye gorro igual a
# cero coma cinco ocho, más dos coma siete uno por equis uno») en texto ESCRITO
# para los subtítulos de la pizarra («ŷ = 0,58 + 2,71 · x₁»). El audio no cambia.
#   · generar_audio.py lo usa al escribir data/audio/<id>.js (campo «frases»).
#   · python3 tools/subtitulos.py            reescribe las frases de todos los data/audio/*.js
#   · python3 tools/subtitulos.py --probar "texto hablado"
# Si una frase necesita otra forma escrita, en el guion se escribe [[escrito|hablado]]:
# se lee «hablado» y el subtítulo muestra «escrito».
# ============================================================================
import json
import re
import sys
from pathlib import Path

UNI = {"cero": 0, "un": 1, "uno": 1, "una": 1, "dos": 2, "tres": 3, "cuatro": 4, "cinco": 5, "seis": 6, "siete": 7,
       "ocho": 8, "nueve": 9, "diez": 10, "once": 11, "doce": 12, "trece": 13, "catorce": 14, "quince": 15,
       "dieciséis": 16, "dieciseis": 16, "diecisiete": 17, "dieciocho": 18, "diecinueve": 19, "veinte": 20,
       "veintiuno": 21, "veintiuna": 21, "veintidós": 22, "veintidos": 22, "veintitrés": 23, "veintitres": 23,
       "veinticuatro": 24, "veinticinco": 25, "veintiséis": 26, "veintiseis": 26, "veintisiete": 27,
       "veintiocho": 28, "veintinueve": 29}
DEC = {"treinta": 30, "cuarenta": 40, "cincuenta": 50, "sesenta": 60, "setenta": 70, "ochenta": 80, "noventa": 90}
CEN = {"cien": 100, "ciento": 100, "doscientos": 200, "doscientas": 200, "trescientos": 300, "trescientas": 300,
       "cuatrocientos": 400, "cuatrocientas": 400, "quinientos": 500, "quinientas": 500, "seiscientos": 600,
       "seiscientas": 600, "setecientos": 700, "setecientas": 700, "ochocientos": 800, "ochocientas": 800,
       "novecientos": 900, "novecientas": 900}
SUB = str.maketrans("0123456789ij", "₀₁₂₃₄₅₆₇₈₉ᵢⱼ")
DIG = {"cero": "0", "uno": "1", "dos": "2", "tres": "3", "cuatro": "4", "cinco": "5", "i": "i", "j": "j"}

def clase(w):
    if w in CEN: return 3
    if w in DEC: return 2
    if w in UNI: return 1 if UNI[w] < 10 else 2
    if w == "mil": return 4
    return 0

# ── Frases fijas (en orden: las largas primero). \b no sirve con tildes: se usan límites propios.
B = r"(?<![\wáéíóúñ])"
E = r"(?![\wáéíóúñ])"
def sub_(m):
    return "".join(DIG[w] for w in m.split()).translate(SUB)
REGLAS = [
    (r"ye gorro", "ŷ"), (r"de gorro", "d̂"), (r"equis prima equis", "X'X"), (r"equis prima ye", "X'y"),
    (r"equis barra", "x̄"), (r"ye barra", "ȳ"),
    (r"equis (uno|dos|tres|cuatro|cinco|i)", lambda m: "x" + sub_(m.group(1))),
    (r"be mayúscula", "B"),
    (r"be (uno uno|dos dos|tres tres|uno dos|uno tres|dos tres|i i|i j|cero|uno|dos|tres|i)", lambda m: "b" + sub_(m.group(1))),
    (r"beta (cero|uno|dos|tres|i)", lambda m: "β" + sub_(m.group(1))),
    (r"hache (cero|uno)", lambda m: "H" + sub_(m.group(1))), (r"hache dos", "h²"), (r"u dos", "u²"),
    (r"por ciento", "%"), (r"erre cuadrado ajustado", "R² ajustado"), (r"erre cuadrado", "R²"), (r"ji cuadrado", "χ²"), (r"sigma cuadrado", "σ²"),
    (r"ve i efe", "VIF"), (r"ele ese de", "LSD"), (r"a o ve", "aov"), (r"k m o", "KMO"), (r"de be ce a", "DBCA"),
    (r"pe ce a", "PCA"), (r"pe valor", "valor p"), (r"te de student", "t de Student"),
    (r"a be ce", "abc"), (r"a be", "ab"), (r"a ce", "ac"), (r"be ce", "bc"), (r"ce", "c"),
    (r"erre", "R"), (r"efe", "F"), (r"beta", "β"), (r"alfa", "α"), (r"mu", "μ"), (r"sigma", "σ"), (r"lambda", "λ"),
    (r"zeta", "Z"), (r"pe", "p"), (r"ene", "n"), (r"ka", "k"), (r"hache", "h"), (r"be", "b"),
]
REGLAS = [(re.compile(B + a + E, re.I), b) for a, b in REGLAS]
SIMBOLO = re.compile(r"^(?:[xbβαμσλχŷȳρ][₀-₉ᵢⱼ²³']*|x̄|d̂|X'X|X'y|R²|σ²|χ²|VIF|LSD|KMO|[pnktFBRhHZ]|h²|u²|H[₀₁])$")
OPS = {"más": "+", "menos": "−", "por": "·", "sobre": "/", "igual": "=", "dividido": "/"}

def es_math(tok):
    t = tok.strip(",.;:¿?¡!«»()")
    return bool(re.search(r"\d", t)) or bool(SIMBOLO.match(t))

def numeros(palabras):
    """Agrupa secuencias de palabras numéricas en dígitos («cero coma cinco ocho» → 0,58)."""
    base = [p.strip("¿¡«").rstrip(",.;:?!»") for p in palabras]
    cola = lambda k: palabras[k][len(re.match(r"^[¿¡«]*", palabras[k]).group(0)) + len(base[k]):]
    out, i = [], 0
    while i < len(palabras):
        val, k = entero_desde(base, i, corte=[bool(cola(q)) for q in range(len(base))]) if clase(base[i].lower()) and base[i].lower() not in ("un", "una") else (None, i)
        if val is None:
            out.append({"t": palabras[i], "num": False}); i += 1; continue
        txt, dec, fin = str(val), False, cola(k - 1)
        if not fin and k + 1 < len(base) and base[k].lower() == "coma" and not cola(k) and clase(base[k + 1].lower()) in (1, 2, 3):
            digs, m = "", k + 1
            while m < len(base) and clase(base[m].lower()) in (1, 2, 3):
                v, m2 = entero_desde(base, m, una=True, corte=[bool(cola(q)) for q in range(len(base))])
                if v is None: break
                digs += str(v); m = m2; fin = cola(m - 1)
                if fin: break
            if digs:
                txt += "," + digs; dec = True; k = m
        pre = re.match(r"^[¿¡«]*", palabras[i]).group(0)
        out.append({"t": pre + txt + fin, "num": True, "val": val, "dec": dec, "orig": " ".join(palabras[i:k])})
        i = k
    return out

def entero_desde(base, j, una=False, corte=None):
    total, cur, ult, k = 0, 0, 9, j
    while k < len(base):
        w = base[k].lower()
        c = clase(w)
        if w == "y" and ult == 2 and k + 1 < len(base) and clase(base[k + 1].lower()) == 1 and k > j:
            k += 1; continue
        if c == 0: break
        if c == 4:
            if k == j and una: break
            cur = (cur or 1) * 1000; total += cur; cur = 0; ult = 4; k += 1
            if corte and corte[k - 1]: break
            continue
        if c >= ult and ult != 4: break
        if ult == 4 and c > 3: break
        cur += UNI.get(w) if w in UNI else DEC.get(w) if w in DEC else CEN.get(w); ult = c
        k += 1
        if corte and corte[k - 1]: break
        if una and c == 1: break          # decimales: «cinco ocho» = 5, 8 (dígito a dígito)
    if k == j: return None, j
    return total + cur, k

def escribir(texto):
    t = texto
    for rx, rep in REGLAS:
        t = rx.sub(rep, t)
    pal = t.split()
    toks = numeros(pal)
    # «al cuadrado» / «al cubo» solo tras un término matemático
    j = 1
    while j + 1 < len(toks):
        if toks[j]["t"].lower() == "al" and toks[j + 1]["t"].lower().rstrip(",.;:") in ("cuadrado", "cubo") and (toks[j - 1]["num"] or es_math(toks[j - 1]["t"])) and not toks[j - 1]["t"].endswith((",", ".", ":")):
            fin = toks[j + 1]["t"][len(toks[j + 1]["t"].rstrip(",.;:")):]
            toks[j - 1]["t"] += ("²" if toks[j + 1]["t"].lower().startswith("cuadrado") else "³") + fin
            toks[j - 1]["sup"] = True
            del toks[j:j + 2]; continue
        j += 1
    # «te» como estadístico: tras artículo o antes de número/igual/crítico
    for j, x in enumerate(toks):
        w = x["t"].lower().strip(",.;:")
        if w == "te" and not x["num"]:
            prev = toks[j - 1]["t"].lower() if j else ""
            nxt = toks[j + 1] if j + 1 < len(toks) else None
            if prev in ("el", "un", "del", "cada", "ese", "este", "los", "un", "su") or (nxt and (nxt["num"] or nxt["t"].lower().startswith(("igual", "crítico", "²")))):
                x["t"] = x["t"].replace("te", "t").replace("Te", "t")
    # números pequeños sin contexto matemático: vuelven a palabras
    def math(j):
        return 0 <= j < len(toks) and (es_math(toks[j]["t"]) or toks[j]["t"].lower().strip(",.") in OPS or toks[j]["t"].lower() in ("coma", "a"))
    for j, x in enumerate(toks):
        if x["num"] and not x["dec"] and x["val"] <= 10 and not (j + 1 < len(toks) and toks[j + 1]["t"].startswith("%")) and not (j and toks[j - 1]["t"].lower() in ("menos", "más") and not (j > 1 and toks[j - 2]["t"].lower() in ("al", "lo", "por", "mucho", "un"))) and not x.get("sup"):
            adv = j > 1 and toks[j - 2]["t"].lower() in ("al", "lo", "por", "mucho", "un")
            vecino = (j > 0 and (es_math(toks[j - 1]["t"]) or (toks[j - 1]["t"].lower().strip(",") in OPS and not adv)) and not toks[j - 1]["t"].endswith((".", ":"))) or \
                     (j + 1 < len(toks) and (toks[j + 1]["t"].lower() in OPS or toks[j + 1]["t"].lower() in ("por",)) and j + 2 < len(toks) and es_math(toks[j + 2]["t"]))
            if not vecino:
                x["t"] = x["orig"]
                x["num"] = False
    # operadores entre dos términos matemáticos
    res = []
    j = 0
    while j < len(toks):
        x = toks[j]
        w = x["t"].lower()
        if not x["num"] and w.rstrip(",") in OPS and res and j + 1 < len(toks):
            prev = res[-1]
            k = j + 1
            if w == "igual" and k < len(toks) and toks[k]["t"].lower() == "a": k += 1
            if w == "dividido" and k < len(toks) and toks[k]["t"].lower() in ("en", "por"): k += 1
            if k < len(toks) and es_math(prev.rstrip(",")) and not prev.endswith((".", ":", ";")) and es_math(toks[k]["t"]):
                res[-1] = prev.rstrip(",")
                res.append(OPS[w.rstrip(",")])
                j = k; continue
            if w in ("menos", "más") and k < len(toks) and toks[k]["num"] and res[-1].lower() not in ("al", "lo", "por", "mucho", "poco", "un", "algo", "nada", "cada", "más", "menos") and not (res[-1].endswith(",") and not toks[k]["dec"] and not es_math(res[-1].rstrip(","))):
                res.append(("−" if w == "menos" else "+") + toks[k]["t"]); j = k + 1; continue
        res.append(x["t"])
        j += 1
    s = " ".join(res)
    s = re.sub(r"(\d) %", r"\1 %", s)
    pal = {str(v): w for w, v in UNI.items() if w in ("cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez")}
    s = re.sub(r"(?<![\wáéíóú])(menos|más) (10|[0-9])(?=[ ,.;:]|$)(?! *[+−·=/])", lambda m: m.group(1) + " " + pal[m.group(2)], s)
    if s and not es_math(s.split()[0]):
        s = s[:1].upper() + s[1:]
    return s

def main():
    if len(sys.argv) > 2 and sys.argv[1] == "--probar":
        print(escribir(sys.argv[2])); return
    raiz = Path(__file__).resolve().parent.parent / "data" / "audio"
    guiones = Path(__file__).resolve().parent / "guiones"
    n = 0
    for ruta in sorted(raiz.glob("*.js")):
        txt = ruta.read_text(encoding="utf-8")
        i, f = txt.index("{"), txt.rindex("}") + 1
        datos = json.loads(txt[i:f])
        hablado = datos.get("frasesHabladas") or [x[1] for x in datos.get("frases", [])]
        datos["frasesHabladas"] = hablado
        datos["frases"] = [[x[0], escribir(h)] for x, h in zip(datos["frases"], hablado)]
        ruta.write_text(txt[:i] + json.dumps(datos, ensure_ascii=False, indent=2) + txt[f:], encoding="utf-8")
        n += 1
    print(f"✔ subtítulos escritos en {n} clases")

if __name__ == "__main__":
    main()
