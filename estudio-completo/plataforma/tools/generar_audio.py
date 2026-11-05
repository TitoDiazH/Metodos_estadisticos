#!/usr/bin/env python3
# ============================================================================
# generar_audio.py — Convierte los guiones de tools/guiones/*.txt en clases de
# audio (mp3) con VoiceStudio, el TTS local que corre en Windows.
#   audio/<id>.mp3        lo que reproduce la sección 🎧 Clases en audio
#   data/audio/<id>.js    GENERADO: duración y capítulos (se registra solo)
#
# Se genera FRASE A FRASE (cortando en . ? !) y luego se unen. Cada frase se
# revisa: su duración debe calzar con su largo y, transcrita con el propio
# VoiceStudio, debe contener las palabras del guion. Si falla se regenera con
# otra semilla (hasta INTENTOS veces). Las frases buenas quedan en
# tools/.cache-tts/, así que al cambiar una frase solo se regenera esa y un
# corte a medio camino se retoma donde quedó.
#
# Requisitos: VoiceStudio abierto (backend en 127.0.0.1:3900), ffmpeg y python3
# (solo biblioteca estándar). Desde WSL el localhost de Windows no se ve con el
# curl de Linux, así que se usa curl.exe (corre del lado de Windows).
# Generar:
#   python3 tools/generar_audio.py                 # solo los guiones que cambiaron
#   python3 tools/generar_audio.py m19 m20 --forzar
#   python3 tools/generar_audio.py m20 --sin-verificar   # más rápido, sin transcribir
#   node tools/generar_manifiesto.js               # si apareció un audio nuevo
#
# Formato del guion (texto plano, el nombre del archivo es el id del módulo):
#   # Título de la clase            (primera línea)
#   ## Título de un capítulo        (para saltar entre capítulos en el reproductor)
#   Párrafos separados por una línea en blanco. Se escriben COMO SE DICEN:
#   «equis barra», «ji cuadrado», «pe valor»… nada de símbolos ni fórmulas.
#   [pausa 3]                       silencio de 3 segundos (para pensar la respuesta)
# ============================================================================
import hashlib
import io
import json
import os
import re
import shutil
import subprocess
import sys
import time
import unicodedata
import wave
from pathlib import Path

TOOLS = Path(__file__).resolve().parent
RAIZ = TOOLS.parent
GUIONES = TOOLS / "guiones"
CACHE = TOOLS / ".cache-tts"

URL = os.environ.get("VOICESTUDIO_URL", "http://127.0.0.1:3900")
VOZ = "narrador-es"         # perfil de VoiceStudio (voz diseñada, no clonada: hombre adulto, tono bajo)
VELOCIDAD = 0.95            # < 1 habla más lento
IDIOMA = "Spanish"          # como lo nombra VoiceStudio
FREC = 24000                # VoiceStudio entrega pcm a 24 kHz, 16 bits, mono
PAUSA_FRASE = 0.35          # segundos entre frases de un mismo párrafo
PAUSA_PARRAFO = 0.8         # segundos entre párrafos
PAUSA_CAPITULO = 1.5        # segundos antes de cada capítulo
BITRATE = "48k"             # mp3 mono; ~0,36 MB por minuto
INTENTOS = 3                # generaciones por frase antes de rendirse
COBERTURA_MIN = 0.75        # fracción de palabras del guion que deben oírse

CURL = shutil.which("curl.exe") or shutil.which("curl")
EN_WSL = CURL and CURL.endswith(".exe")

# Lo que el TTS leería mal: obliga a escribirlo con palabras.
SOSPECHOSOS = re.compile(r"[$\\`_^=<>≤≥≠×√αβμσχρλΣ²−]|\b[A-Za-z]+\.[a-z]+\(")
# Palabras de números: Whisper las transcribe como dígitos, así que no se exigen.
NUMEROS = set("""cero uno una dos tres cuatro cinco seis siete ocho nueve diez once doce trece catorce quince
dieciseis diecisiete dieciocho diecinueve veinte veintiuno veintiuna veintidos veintitres veinticuatro
veinticinco veintiseis veintisiete veintiocho veintinueve treinta cuarenta cincuenta sesenta setenta ochenta
noventa cien ciento doscientos trescientos cuatrocientos quinientos seiscientos setecientos ochocientos
novecientos mil coma medio media""".split())
# Letras, símbolos y nombres de R dichos con palabras: Whisper los escribe como «R», «W», «*», «.»…
HABLADAS = set("""erre doble tilde punto asterisco bind elevado cuadrado cubo summary tables
interaction plot design type effects agricolae""".split())


# ---------------------------------------------------------------- guion
MARCA = re.compile(r"\{([a-z0-9][a-z0-9-]*)\}\s*")


def leer_guion(ruta):
    """Devuelve (título, partes, meta). partes: ("capitulo", txt) | ("texto", txt) | ("pausa", seg) | ("marca", id).
    meta: líneas «@clave valor» (modulo, ejercicio, pregunta, orden). Las marcas {id} dentro del texto
    no se leen: guardan el instante en que se dicen, para sincronizar las animaciones."""
    titulo, partes, parrafo, meta, vistas = None, [], [], {}, set()

    def cerrar():
        if parrafo:
            partes.append(("texto", " ".join(parrafo)))
            parrafo.clear()

    def anotar(n, ids):
        for i in ids:
            if i in vistas:
                sys.exit(f"{ruta.name}:{n}: la marca {{{i}}} está repetida")
            vistas.add(i)

    for n, linea in enumerate(ruta.read_text(encoding="utf-8").splitlines(), 1):
        linea = linea.strip()
        pausa = re.fullmatch(r"\[pausa\s+([\d.]+)\]", linea)
        suelta = re.fullmatch(r"\[ver\s+([a-z0-9][a-z0-9-]*)\]", linea)
        if not linea:
            cerrar()
        elif linea.startswith("@"):
            clave, _, valor = linea[1:].partition(" ")
            meta[clave.strip()] = valor.strip()
        elif linea.startswith("## "):
            cerrar()
            partes.append(("capitulo", linea[3:].strip()))
        elif linea.startswith("# "):
            titulo = linea[2:].strip()
        elif pausa:
            cerrar()
            partes.append(("pausa", float(pausa.group(1))))
        elif suelta:
            cerrar()
            anotar(n, [suelta.group(1)])
            partes.append(("marca", suelta.group(1)))
        elif linea.startswith("["):
            sys.exit(f"{ruta.name}:{n}: marca desconocida {linea}")
        else:
            limpio = MARCA.sub("", linea)
            raro = SOSPECHOSOS.search(limpio) or re.search(r"[{}]", limpio)
            if raro:
                sys.exit(f"{ruta.name}:{n}: «{raro.group(0)}» no se puede leer en voz alta; escríbelo con palabras.")
            anotar(n, MARCA.findall(linea))
            parrafo.append(linea)
    cerrar()
    if not titulo:
        sys.exit(f"{ruta.name}: falta la primera línea «# Título»")
    for tipo, valor in partes:
        if tipo == "texto" and any(len(MARCA.sub("", f)) > 3000 for f in frases(valor)):
            sys.exit(f"{ruta.name}: una frase es demasiado larga para VoiceStudio. Divídela.")
    return titulo, partes, meta


def separar_marcas(frase):
    """(texto sin marcas, [(id, fracción de la frase en que aparece)])."""
    texto, marcas, pos = "", [], 0
    for m in MARCA.finditer(frase):
        texto += frase[pos:m.start()]
        marcas.append((m.group(1), len(texto)))
        pos = m.end()
    texto = (texto + frase[pos:]).strip()
    largo = max(len(texto), 1)
    return texto, [(i, min(c / largo, 1.0)) for i, c in marcas]


def frases(parrafo):
    """Corta un párrafo en frases por punto, signo de interrogación o exclamación (no por coma)."""
    return [f.strip() for f in re.split(r"(?<=[.?!])\s+", parrafo) if f.strip()]


# ---------------------------------------------------------------- VoiceStudio
def pedir(ruta, campos=None, archivo=None):
    """GET, o POST multipart con campos de texto (campos) y/o un archivo; devuelve bytes."""
    cmd = [CURL, "-sS", "--fail-with-body", "-m", "600", URL + ruta]
    for k, v in (campos or {}).items():
        cmd += ["--form-string", f"{k}={v}"]
    if archivo is not None:
        ruta_archivo = subprocess.run(["wslpath", "-w", str(archivo)], capture_output=True,
                                      text=True, check=True).stdout.strip() if EN_WSL else str(archivo)
        cmd += ["-F", f"file=@{ruta_archivo}", "-F", "model=whisper-1", "-F", "language=es"]
    r = subprocess.run(cmd, capture_output=True)
    if r.returncode:
        raise RuntimeError((r.stdout[:300] + r.stderr[:300]).decode("utf-8", "replace").strip())
    return r.stdout


def resolver_voz():
    """Devuelve (id, semilla) del perfil VOZ; falla si no existe o el nombre está repetido."""
    perfiles = [p for p in json.loads(pedir("/profiles")) if p["name"].lower() == VOZ.lower()]
    if not perfiles:
        sys.exit(f"VoiceStudio no tiene un perfil llamado «{VOZ}». Créalo o cambia VOZ.")
    if len(perfiles) > 1:
        sys.exit(f"Hay {len(perfiles)} perfiles llamados «{VOZ}» ({', '.join(p['id'] for p in perfiles)}); deja uno.")
    return perfiles[0]["id"], perfiles[0].get("seed") or 0


def sintetizar(texto, voz_id, semilla):
    """pcm de un texto. Usa /generate, el mismo endpoint de la interfaz de VoiceStudio:
    con /v1/audio/speech el idioma no se respetaba y salía acento inglés."""
    campos = {"text": texto, "language": IDIOMA, "profile_id": voz_id, "seed": semilla, "speed": VELOCIDAD}
    for intento in range(3):
        try:
            datos = pedir("/generate", campos)
            if datos[:4] == b"RIFF":
                with wave.open(io.BytesIO(datos)) as w:
                    if w.getframerate() != FREC or w.getnchannels() != 1 or w.getsampwidth() != 2:
                        sys.exit(f"VoiceStudio entregó {w.getframerate()} Hz, {w.getnchannels()} canales; se esperaba {FREC} Hz mono.")
                    pcm = w.readframes(w.getnframes())
                if len(pcm) > FREC // 10:
                    return pcm
            error = datos[:200].decode("utf-8", "replace")
        except Exception as e:
            error = str(e)
        print(f"\n  … VoiceStudio respondió «{error}»; espero y reintento", flush=True)
        time.sleep(10)
    sys.exit("VoiceStudio no responde. ¿Está abierto y con el modelo cargado?")


def normalizar(texto):
    t = unicodedata.normalize("NFD", texto.lower())
    t = "".join(c for c in t if unicodedata.category(c) != "Mn")
    return re.findall(r"[a-zñ]+", t)


def duracion_ok(texto, pcm):
    seg = len(pcm) / 2 / FREC
    letras = len(re.sub(r"\W", "", texto))
    if seg < letras / 30 or seg > letras / 6 + 2:
        return f"duración rara: {seg:.1f} s para {letras} letras"
    return ""


def transcribir(pcm):
    tmp = CACHE / "_revision.wav"
    with wave.open(str(tmp), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(FREC); w.writeframes(pcm)
    return json.loads(pedir("/v1/audio/transcriptions", archivo=tmp)).get("text", "")


def cobertura_ok(texto, oido_txt):
    """Compara el guion con lo transcrito; números y letras habladas no se exigen."""
    clave = [w for w in normalizar(texto) if len(w) >= 4 and w not in NUMEROS and w not in HABLADAS]
    if not clave:
        return ""
    oido = set(normalizar(oido_txt))
    # una palabra cuenta como oída si coincide o comparte sus primeras 4 letras (plural, género)
    raices = {w[:4] for w in oido}
    cobertura = sum(w in oido or w[:4] in raices for w in clave) / len(clave)
    if cobertura < COBERTURA_MIN:
        return f"se oyó {cobertura:.0%} de las palabras: «{oido_txt[:120]}»"
    return ""


def frase_audio(texto, voz_id, semilla_base, verificar, avisos, mid):
    """pcm de una frase, desde la caché o generado y revisado.
    Cada intento fallido queda guardado (<clave>.iN.pcm + .txt con lo transcrito): si después
    cambian las reglas de revisión, se reevalúa sin volver a generar ni transcribir."""
    clave = hashlib.sha1(f"generate|{IDIOMA}|{voz_id}|{VELOCIDAD}|{texto}".encode()).hexdigest()[:16]
    cache = CACHE / f"{clave}.pcm"
    if cache.exists():
        return cache.read_bytes()
    intentos = []
    for i in range(INTENTOS):
        ipcm, itxt = CACHE / f"{clave}.i{i}.pcm", CACHE / f"{clave}.i{i}.txt"
        if ipcm.exists():
            pcm, oido = ipcm.read_bytes(), itxt.read_text(encoding="utf-8") if itxt.exists() else None
        else:
            pcm = sintetizar(texto, voz_id, semilla_base + i)
            oido = None
        motivo = duracion_ok(texto, pcm)
        if not motivo and verificar:
            if oido is None:
                oido = transcribir(pcm)
            motivo = cobertura_ok(texto, oido)
        if not motivo:
            cache.write_bytes(pcm)
            for f in CACHE.glob(f"{clave}.i*"):
                f.unlink()
            return pcm
        if not ipcm.exists():
            ipcm.write_bytes(pcm)
            if oido is not None:
                itxt.write_text(oido, encoding="utf-8")
            print(f"\n  ✗ intento {i + 1}: {motivo}\n    «{texto[:90]}»", flush=True)
        intentos.append(pcm)
    avisos.append(f"{mid}: «{texto}» — no pasó la revisión; quedó el primer intento")
    return intentos[0]


# ---------------------------------------------------------------- módulo
def generar(ruta, voz_id, semilla, verificar):
    mid = ruta.stem
    titulo, partes, meta = leer_guion(ruta)
    pcm, capitulos, avisos, marcas, subtitulos = bytearray(), [], [], {}, []
    total = sum(len(frases(v)) for t, v in partes if t == "texto")
    hechas, inicio = 0, time.time()

    def silencio(seg):
        pcm.extend(b"\x00\x00" * int(FREC * seg))

    def ahora():
        return round(len(pcm) / 2 / FREC, 1)

    for tipo, valor in partes:
        if tipo == "pausa":
            silencio(valor)
        elif tipo == "capitulo":
            if pcm:
                silencio(PAUSA_CAPITULO)
            capitulos.append({"t": ahora(), "titulo": valor})
        elif tipo == "marca":
            marcas[valor] = ahora()
        else:
            lista = frases(valor)
            for j, f in enumerate(lista):
                texto, internas = separar_marcas(f)
                inicio_frase = len(pcm) / 2 / FREC
                trozo = frase_audio(texto, voz_id, semilla, verificar, avisos, mid)
                dur = len(trozo) / 2 / FREC
                for i, frac in internas:
                    marcas[i] = round(inicio_frase + frac * dur, 2)
                subtitulos.append([round(inicio_frase, 2), texto])
                pcm.extend(trozo)
                silencio(PAUSA_FRASE if j < len(lista) - 1 else PAUSA_PARRAFO)
                hechas += 1
                print(f"\r  {mid}: frase {hechas}/{total} ({time.time() - inicio:.0f} s)", end="", flush=True)
    print()

    destino = RAIZ / "audio" / f"{mid}.mp3"
    destino.parent.mkdir(exist_ok=True)
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "s16le", "-ar", str(FREC), "-ac", "1", "-i", "-",
         "-codec:a", "libmp3lame", "-b:a", BITRATE, str(destino)],
        input=bytes(pcm), check=True)

    # con avisos no se escribe la huella, para que la próxima corrida reintente esas frases
    datos = {"id": f"audio-{mid}", "modulo": meta.get("modulo", mid), "titulo": titulo, "archivo": f"audio/{mid}.mp3",
             "duracion": round(ahora()), "capitulos": capitulos}
    for clave in ("ejercicio", "pregunta"):
        if clave in meta:
            datos[clave] = meta[clave]
    if "orden" in meta:
        datos["orden"] = float(meta["orden"])
    datos.update({"marcas": marcas, "frases": subtitulos, "huella": "pendiente" if avisos else huella(ruta, voz_id)})
    salida = RAIZ / "data" / "audio" / f"{mid}.js"
    salida.parent.mkdir(exist_ok=True)
    salida.write_text(
        "/* GENERADO por tools/generar_audio.py desde tools/guiones/" + ruta.name + " — no editar a mano. */\n"
        'PLATAFORMA.registrar("audio", ' + json.dumps(datos, ensure_ascii=False, indent=2) + ");\n",
        encoding="utf-8")
    print(f"✔ {mid}: {datos['duracion'] // 60} min {datos['duracion'] % 60} s, {total} frases, "
          f"{len(capitulos)} capítulos, {destino.stat().st_size / 1e6:.1f} MB")
    return avisos


def huella(ruta, voz_id):
    """Cambia si cambia el guion o cualquier ajuste que altere el audio."""
    ajustes = f"voicestudio-generate|{IDIOMA}|{voz_id}|{VELOCIDAD}|{PAUSA_FRASE}|{PAUSA_PARRAFO}|{PAUSA_CAPITULO}|{BITRATE}|"
    return hashlib.sha1(ajustes.encode() + ruta.read_bytes()).hexdigest()[:12]


def al_dia(ruta, voz_id):
    js, mp3 = RAIZ / "data" / "audio" / f"{ruta.stem}.js", RAIZ / "audio" / f"{ruta.stem}.mp3"
    return js.exists() and mp3.exists() and f'"huella": "{huella(ruta, voz_id)}"' in js.read_text(encoding="utf-8")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    forzar, verificar = "--forzar" in sys.argv, "--sin-verificar" not in sys.argv
    guiones = sorted(g for g in GUIONES.glob("*.txt") if not args or any(g.stem.startswith(a) for a in args))
    if not guiones:
        sys.exit("No hay guiones que coincidan en tools/guiones/.")
    for g in guiones:
        leer_guion(g)  # valida todos antes de llamar al TTS
    if not shutil.which("ffmpeg") or not CURL:
        sys.exit("Faltan ffmpeg o curl.")
    try:
        voz_id, semilla = resolver_voz()
    except RuntimeError as e:
        sys.exit(f"No se pudo conectar con VoiceStudio en {URL} ({e}). ¿Está abierto?")
    pendientes = [g for g in guiones if forzar or not al_dia(g, voz_id)]
    for g in guiones:
        if g not in pendientes:
            print(f"· {g.stem}: sin cambios")
    CACHE.mkdir(exist_ok=True)
    avisos = []
    for g in pendientes:
        avisos += generar(g, voz_id, semilla, verificar)
    (CACHE / "_revision.wav").unlink(missing_ok=True)
    if avisos:
        print(f"\n⚠ {len(avisos)} frase(s) para revisar a oído (o reescribir y volver a correr):")
        for a in avisos:
            print("  - " + a)


if __name__ == "__main__":
    main()
