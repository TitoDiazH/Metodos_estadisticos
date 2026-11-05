#!/usr/bin/env python3
"""Cuenta, por guion, cuántas frases todavía no están en la caché del TTS (sin llamar a VoiceStudio)."""
import hashlib, sys
sys.path.insert(0, __import__("os").path.dirname(__file__))
import generar_audio as g
VOZ_ID = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("m") else "827160a6"
filtro = [a for a in sys.argv[1:] if a.startswith("m")]
for ruta in sorted(g.GUIONES.glob("*.txt")):
    if filtro and not any(ruta.stem.startswith(f) for f in filtro):
        continue
    _, partes, _ = g.leer_guion(ruta)
    tot = falt = 0
    for t, v in partes:
        if t != "texto":
            continue
        for f in g.frases(v):
            texto, _ = g.separar_marcas(f)
            clave = hashlib.sha1(f"generate|{g.IDIOMA}|{VOZ_ID}|{g.VELOCIDAD}|{texto}".encode()).hexdigest()[:16]
            tot += 1
            falt += not (g.CACHE / f"{clave}.pcm").exists()
    print(f"{ruta.stem}: {tot} frases, faltan {falt}")
