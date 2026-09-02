#!/usr/bin/env python3
"""
Servidor de desarrollo para la plataforma de repaso.

Dos cosas que `python3 -m http.server` no hace y aquí sí:

1. Cabeceras anti-caché para HTML/CSS/JS. Sin ellas el navegador aplica
   "caché heurística" y sigue mostrando la versión antigua aunque el archivo
   haya cambiado en disco (Safari en iOS es especialmente insistente).

2. Cache-busting automático: al servir index.html se reescriben al vuelo las
   URLs de los assets propios como  archivo.js?v=<hash del contenido>.
   Si el archivo cambia, cambia el hash, cambia la URL y el navegador está
   obligado a pedirlo de nuevo. No hay que acordarse de nada.

Uso:  ./serve.py            -> http://localhost:5173
      PORT=8080 ./serve.py  -> otro puerto
"""
import hashlib
import http.server
import os
import re
import socketserver
import sys

PORT = int(os.environ.get("PORT", 5173))
DIR = os.path.dirname(os.path.abspath(__file__))

# Las fuentes de KaTeX no cambian nunca: se cachean a propósito.
CACHEABLE = (".woff2", ".woff", ".ttf")

ASSET_RE = re.compile(r'(href|src)="((?:js|css|vendor)/[^"?]+\.(?:js|css))(?:\?[^"]*)?"')


def stamp_versions(html: str) -> str:
    """Reescribe  src="js/app.js"  ->  src="js/app.js?v=<hash>"."""
    def repl(m):
        attr, rel = m.group(1), m.group(2)
        full = os.path.join(DIR, rel)
        try:
            with open(full, "rb") as fh:
                h = hashlib.md5(fh.read()).hexdigest()[:8]
        except OSError:
            return m.group(0)
        return f'{attr}="{rel}?v={h}"'
    return ASSET_RE.sub(repl, html)


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    # --- cabeceras -------------------------------------------------------
    def end_headers(self):
        path = self.path.split("?")[0]
        if path.endswith(CACHEABLE):
            self.send_header("Cache-Control", "public, max-age=31536000, immutable")
        else:
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
        super().end_headers()

    # --- index.html con versiones frescas --------------------------------
    def _index(self):
        try:
            with open(os.path.join(DIR, "index.html"), encoding="utf-8") as fh:
                body = stamp_versions(fh.read()).encode("utf-8")
        except OSError:
            self.send_error(404, "index.html no encontrado")
            return None
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        return body

    def do_GET(self):
        if self.path.split("?")[0] in ("/", "/index.html"):
            body = self._index()
            if body:
                self.wfile.write(body)
            return
        super().do_GET()

    def do_HEAD(self):
        if self.path.split("?")[0] in ("/", "/index.html"):
            self._index()
            return
        super().do_HEAD()

    def log_message(self, fmt, *args):
        # Solo errores 4xx/5xx, no cada 200 OK.
        if len(args) > 1 and str(args[1]).startswith(("4", "5")):
            super().log_message(fmt, *args)


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == "__main__":
    try:
        with Server(("0.0.0.0", PORT), Handler) as httpd:
            print(f"Sirviendo {DIR}")
            print(f"  local  : http://localhost:{PORT}")
            print(f"  en red : http://<ip-de-esta-maquina>:{PORT}")
            print("  sin cache + versionado automatico de assets")
            print("  Ctrl+C para detener")
            sys.stdout.flush()
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nDetenido.")
    except OSError as e:
        print(f"No se pudo abrir el puerto {PORT}: {e}", file=sys.stderr)
        sys.exit(1)
