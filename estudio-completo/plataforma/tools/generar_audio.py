#!/usr/bin/env python3
# ============================================================================
# generar_audio.py — Convierte los guiones de tools/guiones/*.txt en clases de
# audio (mp3) con Piper, un TTS local: no usa internet ni GPU.
#   audio/<id>.mp3        lo que reproduce la sección 🎧 Clases en audio
#   data/audio/<id>.js    GENERADO: duración y capítulos (se registra solo)
#
# Preparar (una sola vez):
#   python3 -m venv tools/.venv-tts
#   tools/.venv-tts/bin/pip install piper-tts
#   tools/.venv-tts/bin/python -m piper.download_voices --data-dir tools/voces es_MX-claude-high
# Generar:
#   tools/.venv-tts/bin/python tools/generar_audio.py            # solo los guiones que cambiaron
#   tools/.venv-tts/bin/python tools/generar_audio.py m05 --forzar
#   node tools/generar_manifiesto.js                             # si apareció un audio nuevo
# También necesita ffmpeg.
#
# Formato del guion (texto plano, el nombre del archivo es el id del módulo):
#   # Título de la clase            (primera línea)
#   ## Título de un capítulo        (para saltar entre capítulos en el reproductor)
#   Párrafos separados por una línea en blanco. Se escriben COMO SE DICEN:
#   «equis barra», «ji cuadrado», «pe valor»… nada de símbolos ni fórmulas.
#   [pausa 3]                       silencio de 3 segundos (para pensar la respuesta)
# ============================================================================
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

TOOLS = Path(__file__).resolve().parent
RAIZ = TOOLS.parent
GUIONES = TOOLS / "guiones"
VOCES = TOOLS / "voces"

VOZ = "es_MX-claude-high"   # otras: es_MX-ald-medium, es_AR-daniela-high, es_ES-davefx-medium
RITMO = 1.0                 # > 1 habla más lento (length_scale de Piper)
PAUSA_PARRAFO = 0.7         # segundos de silencio entre párrafos
PAUSA_CAPITULO = 1.5        # segundos antes de cada capítulo
BITRATE = "32k"             # mp3 mono; ~0,24 MB por minuto

# Lo que el TTS leería mal: obliga a escribirlo con palabras.
SOSPECHOSOS = re.compile(r"[$\\`_^=<>≤≥≠×√αβμσχρλΣ²−]|\b[A-Za-z]+\.[a-z]+\(")


def leer_guion(ruta):
    """Devuelve (título, [("capitulo", txt) | ("texto", txt) | ("pausa", seg)])."""
    titulo, partes, parrafo = None, [], []

    def cerrar():
        if parrafo:
            partes.append(("texto", " ".join(parrafo)))
            parrafo.clear()

    for n, linea in enumerate(ruta.read_text(encoding="utf-8").splitlines(), 1):
        linea = linea.strip()
        pausa = re.fullmatch(r"\[pausa\s+([\d.]+)\]", linea)
        if not linea:
            cerrar()
        elif linea.startswith("## "):
            cerrar()
            partes.append(("capitulo", linea[3:].strip()))
        elif linea.startswith("# "):
            titulo = linea[2:].strip()
        elif pausa:
            cerrar()
            partes.append(("pausa", float(pausa.group(1))))
        elif linea.startswith("["):
            sys.exit(f"{ruta.name}:{n}: marca desconocida {linea}")
        else:
            raro = SOSPECHOSOS.search(linea)
            if raro:
                sys.exit(f"{ruta.name}:{n}: «{raro.group(0)}» no se puede leer en voz alta; escríbelo con palabras.")
            parrafo.append(linea)
    cerrar()
    if not titulo:
        sys.exit(f"{ruta.name}: falta la primera línea «# Título»")
    return titulo, partes


def generar(ruta, voz, config):
    mid = ruta.stem
    titulo, partes = leer_guion(ruta)
    frec = voz.config.sample_rate
    pcm, capitulos = bytearray(), []

    def silencio(seg):
        pcm.extend(b"\x00\x00" * int(frec * seg))

    def ahora():
        return round(len(pcm) / 2 / frec, 1)

    for tipo, valor in partes:
        if tipo == "pausa":
            silencio(valor)
        elif tipo == "capitulo":
            if pcm:
                silencio(PAUSA_CAPITULO)
            capitulos.append({"t": ahora(), "titulo": valor})
        else:
            for trozo in voz.synthesize(valor, config):
                pcm.extend(trozo.audio_int16_bytes)
            silencio(PAUSA_PARRAFO)

    destino = RAIZ / "audio" / f"{mid}.mp3"
    destino.parent.mkdir(exist_ok=True)
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "s16le", "-ar", str(frec), "-ac", "1", "-i", "-",
         "-codec:a", "libmp3lame", "-b:a", BITRATE, str(destino)],
        input=bytes(pcm), check=True)

    datos = {"id": f"audio-{mid}", "modulo": mid, "titulo": titulo, "archivo": f"audio/{mid}.mp3",
             "duracion": round(ahora()), "capitulos": capitulos, "huella": huella(ruta)}
    salida = RAIZ / "data" / "audio" / f"{mid}.js"
    salida.parent.mkdir(exist_ok=True)
    salida.write_text(
        "/* GENERADO por tools/generar_audio.py desde tools/guiones/" + ruta.name + " — no editar a mano. */\n"
        'PLATAFORMA.registrar("audio", ' + json.dumps(datos, ensure_ascii=False, indent=2) + ");\n",
        encoding="utf-8")
    print(f"✔ {mid}: {datos['duracion'] // 60} min {datos['duracion'] % 60} s, "
          f"{len(capitulos)} capítulos, {destino.stat().st_size / 1e6:.1f} MB")


def huella(ruta):
    """Cambia si cambia el guion o cualquier ajuste que altere el audio."""
    ajustes = f"{VOZ}|{RITMO}|{PAUSA_PARRAFO}|{PAUSA_CAPITULO}|{BITRATE}|"
    return hashlib.sha1(ajustes.encode() + ruta.read_bytes()).hexdigest()[:12]


def al_dia(ruta):
    js, mp3 = RAIZ / "data" / "audio" / f"{ruta.stem}.js", RAIZ / "audio" / f"{ruta.stem}.mp3"
    return js.exists() and mp3.exists() and f'"huella": "{huella(ruta)}"' in js.read_text(encoding="utf-8")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    forzar = "--forzar" in sys.argv
    guiones = sorted(g for g in GUIONES.glob("*.txt") if not args or any(g.stem.startswith(a) for a in args))
    if not guiones:
        sys.exit("No hay guiones que coincidan en tools/guiones/.")
    pendientes = [g for g in guiones if forzar or not al_dia(g)]
    for g in guiones:
        if g not in pendientes:
            print(f"· {g.stem}: sin cambios")
    if not pendientes:
        return

    modelo = VOCES / f"{VOZ}.onnx"
    if not modelo.exists():
        sys.exit(f"Falta la voz {VOZ}. Descárgala con:\n  tools/.venv-tts/bin/python -m piper.download_voices --data-dir tools/voces {VOZ}")
    try:
        from piper import PiperVoice, SynthesisConfig
    except ImportError:
        sys.exit("Falta piper-tts. Corre este script con tools/.venv-tts/bin/python (ver la cabecera).")
    voz = PiperVoice.load(str(modelo))
    config = SynthesisConfig(length_scale=RITMO)
    for g in pendientes:
        generar(g, voz, config)


if __name__ == "__main__":
    main()
