#!/usr/bin/env bash
# Sirve la plataforma de repaso en http://localhost:5173
# Envía cabeceras anti-caché para que los cambios se vean al recargar.
#
# Uso:  ./serve.sh          (primer plano, Ctrl+C para detener)
#       ./serve.sh &        (segundo plano)
#       PORT=8080 ./serve.sh

set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec python3 "$DIR/serve.py"
