#!/usr/bin/env bash
# Descarga las fuentes variables (Archivo + Inter) desde Google Fonts y las
# deja autoalojadas en assets/fonts, junto con assets/css/fonts.css.
# Ejecutar sólo si hay que regenerarlas: el repositorio ya las incluye.
set -euo pipefail
cd "$(dirname "$0")/.."
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
URL='https://fonts.googleapis.com/css2?family=Archivo:wght@400..900&family=Inter:wght@300..500&display=swap'
mkdir -p assets/fonts
curl -sS -A "$UA" "$URL" -o /tmp/gf.css
python3 - "$UA" <<'PY'
import re, subprocess, sys, pathlib
ua = sys.argv[1]
css = pathlib.Path('/tmp/gf.css').read_text()
blocks = re.findall(r"/\* (\w[\w-]*) \*/\s*(@font-face\s*\{.*?\})", css, re.S)
out = ["/* Fuentes autoalojadas (Google Fonts, licencia SIL OFL 1.1).",
       "   Subconjuntos latin + latin-ext, variables. Regenerar con tools/fetch_fonts.sh */", ""]
seen = set()
for subset, block in blocks:
    if subset not in {"latin", "latin-ext"}:
        continue
    fam = re.search(r"font-family:\s*'([^']+)'", block).group(1)
    src = re.search(r"url\((https://[^)]+\.woff2)\)", block).group(1)
    name = f"{fam.lower()}-{subset}.woff2"
    if name not in seen:
        subprocess.run(["curl", "-sS", "-A", ua, src, "-o", f"assets/fonts/{name}"], check=True)
        seen.add(name)
    out += [f"/* {fam} — {subset} */", block.replace(src, f"../fonts/{name}"), ""]
pathlib.Path("assets/css/fonts.css").write_text("\n".join(out))
print("fuentes:", ", ".join(sorted(seen)))
PY
